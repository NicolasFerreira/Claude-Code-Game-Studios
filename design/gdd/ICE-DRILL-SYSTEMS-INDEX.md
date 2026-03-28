# Lunar Colony Game - Systems Architecture

## Reference Analysis: Sunflower Land

Sunflower Land uses:
- **XState** for game state machine (complex, 2700+ line machine)
- **Server-based autosave** with actions queue
- **Massive GameState interface** (2000+ lines of TypeScript)
- **Event-driven architecture** - every action is an event
- **Decimal.js** for precise currency math

**Our MVP approach** (localStorage-only, Next.js + React):
- **React Context + useReducer** instead of XState (simpler, sufficient)
- **localStorage autosave** with debounced writes
- **Simplified GameState** focused on lunar colony mechanics
- **Action functions** that return new state (not events/machine)

---

## System Dependency Graph

```
                    ┌─────────────────┐
                    │   GAME STATE    │
                    │   (Single ref) │
                    └────────┬────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
┌───────────────┐   ┌─────────────────┐   ┌────────────────┐
│ RESOURCE      │   │  PRODUCTION     │   │  NOTIFICATION  │
│ SYSTEM        │◄──│  SYSTEM         │   │  SYSTEM        │
│ (blocks all)  │   │                 │   │                │
└───────┬───────┘   └────────▲────────┘   └────────────────┘
        │                    │
        │    ┌───────────────┴───────────────┐
        │    │                               │
        ▼    ▼                               ▼
┌───────────────┐   ┌─────────────────┐   ┌────────────────┐
│ INVENTORY     │   │  BUILDING       │   │  CURRENCY/     │
│ SYSTEM        │   │  SYSTEM         │   │  ECONOMY       │
│               │   │                 │   │  SYSTEM        │
└───────┬───────┘   └────────▲────────┘   └────────────────┘
        │                    │
        │                    │
        ▼                    │
┌───────────────┐            │
│ PLOT/GRID     │            │
│ SYSTEM        │◄───────────┘
│               │   (buildings placed on grid)
└───────────────┘
```

---

## Core Systems

### 1. Game State System (BLOCKING)

**Purpose**: Single source of truth for all game data.

**Data Structure**:
```typescript
interface GameState {
  // Meta
  createdAt: number;
  lastSavedAt: number;
  version: string;

  // Currencies
  coins: number;
  energy: number;           // Lunar energy (primary currency)

  // Resources (raw materials)
  resources: {
    ice: number;
    water: number;
    minerals: number;
    oxygen: number;
    fuel: number;
  };

  // Inventory (processed items, tools, buildings)
  inventory: Inventory;

  // Grid/Plots
  plots: Record<string, Plot>;

  // Buildings
  buildings: Record<string, PlacedBuilding[]>;

  // Colony stats
  colony: {
    level: number;
    population: number;
    buildingsCount: number;
  };
}

type Inventory = Partial<Record<ItemName, number>>;

interface Plot {
  id: string;
  position: { x: number; y: number };
  type: 'ice_drill' | 'greenhouse' | 'mining' | 'habitat' | 'empty';
  status: 'empty' | 'planted' | 'growing' | 'ready' | 'harvested';
  plantedAt?: number;
  readyAt?: number;
  crop?: CropData;
}

interface PlacedBuilding {
  id: string;
  type: BuildingType;
  position: { x: number; y: number };
  placedAt: number;
  readyAt?: number;        // For production buildings
  productionProgress?: number; // 0-100
}
```

**Dependencies**: All other systems depend on this.

**Implementation Order**: 1st (must be complete before others)

---

### 2. Resource System (BLOCKING)

**Purpose**: Track and modify all resource quantities.

**Functions**:
```typescript
type ResourceKey = 'ice' | 'water' | 'minerals' | 'oxygen' | 'fuel';

interface ResourceSystem {
  // Add resources (returns new state)
  addResource: (state: GameState, resource: ResourceKey, amount: number) => GameState;

  // Remove resources (returns new state or null if insufficient)
  removeResource: (state: GameState, resource: ResourceKey, amount: number) => GameState | null;

  // Check if has enough
  hasResources: (state: GameState, resources: Partial<Record<ResourceKey, number>>) => boolean;

  // Get all resource values
  getResources: (state: GameState) => Record<ResourceKey, number>;
}
```

**Dependencies**: Game State System (1st)

**Implementation Order**: 2nd

---

### 3. Inventory System

**Purpose**: Manage items stored in inventory (tools, seeds, harvested crops, building materials).

**Functions**:
```typescript
interface InventorySystem {
  // Add item
  addItem: (state: GameState, item: ItemName, count: number) => GameState;

  // Remove item (returns null if insufficient)
  removeItem: (state: GameState, item: ItemName, count: number) => GameState | null;

  // Check ownership
  hasItem: (state: GameState, item: ItemName, count?: number) => boolean;

  // Get item count
  getItemCount: (state: GameState, item: ItemName) => number;

  // Move item to/from grid
  plantItem: (state: GameState, item: ItemName, plotId: string) => GameState | null;
  harvestItem: (state: GameState, plotId: string) => GameState | null;
}
```

**Item Categories**:
- `Tools`: Drill, Pickaxe, Scanner, Oxygen Tank, Fuel Can
- `Resources`: Ice Ore, Water Container, Mineral Crystal, Oxygen Canister, Fuel Cell
- `Seeds`: Ice Seeds, Mineral Seeds, Oxygen Seeds
- `Buildings`: Greenhouse Kit, Habitat Module, Mining Rig, Ice Drill, Water Extractor
- `Consumables`: Food (for energy), Medicine

**Dependencies**: Game State (1st), Resource System (2nd)

**Implementation Order**: 3rd

---

### 4. Plot/Grid System

**Purpose**: Manage the lunar surface grid where colonists plant/grow resources.

**Functions**:
```typescript
interface PlotSystem {
  // Get available plots
  getAvailablePlots: (state: GameState) => Plot[];

  // Plant on plot
  plant: (state: GameState, plotId: string, item: ItemName) => GameState | null;

  // Check/collect harvest
  harvest: (state: GameState, plotId: string) => GameState | null;

  // Get plot status
  getPlotStatus: (plot: Plot) => 'empty' | 'planted' | 'growing' | 'ready';

  // Get time remaining
  getTimeRemaining: (plot: Plot) => number | null;
}
```

**Plot Types**:
| Type | Produces | Base Time | Input |
|------|----------|-----------|-------|
| `ice_drill` | Ice | 30s | Ice Seed |
| `greenhouse` | Water/Oxygen | 60s | Water Seed |
| `mining` | Minerals | 120s | Mineral Seed |
| `habitat` | Population capacity | N/A | Building |
| `empty` | Nothing | - | - |

**Dependencies**: Game State (1st), Inventory (3rd)

**Implementation Order**: 4th

---

### 5. Building System

**Purpose**: Place, upgrade, and manage colony buildings.

**Functions**:
```typescript
interface BuildingSystem {
  // Place building
  placeBuilding: (
    state: GameState,
    building: BuildingType,
    position: { x: number; y: number }
  ) => GameState | null;

  // Start production
  startProduction: (state: GameState, buildingId: string) => GameState | null;

  // Collect output
  collectOutput: (state: GameState, buildingId: string) => GameState | null;

  // Get buildings by type
  getBuildings: (state: GameState, type?: BuildingType) => PlacedBuilding[];

  // Check placement validity
  canPlace: (state: GameState, building: BuildingType, position: { x: number; y: number }) => boolean;
}
```

**Building Types**:
| Building | Function | Size | Cost | Production |
|----------|----------|------|------|------------|
| `IceDrill` | Produces Ice | 2x2 | 50 energy | 5 ice/30s |
| `WaterExtractor` | Produces Water | 2x2 | 75 energy | 3 water/45s |
| `MineralRefinery` | Produces Minerals | 3x3 | 100 energy | 2 minerals/60s |
| `OxygenGenerator` | Produces Oxygen | 2x2 | 80 energy | 4 oxygen/30s |
| `FuelSynthesizer` | Produces Fuel | 3x3 | 150 energy | 1 fuel/90s |
| `Greenhouse` | Grows seeds | 2x3 | 60 energy | Variable |
| `HabitatModule` | Increases population | 3x3 | 200 energy | +4 pop |

**Dependencies**: Game State (1st), Resource System (2nd), Inventory (3rd), Plot (4th)

**Implementation Order**: 5th

---

### 6. Production System

**Purpose**: Handle time-based production for buildings and plots.

**Functions**:
```typescript
interface ProductionSystem {
  // Process all productions (call on game tick)
  processProduction: (state: GameState, now: number) => GameState;

  // Get production progress for a building/plot
  getProgress: (state: GameState, id: string) => number; // 0-100

  // Check if ready
  isReady: (state: GameState, id: string) => boolean;

  // Accelerate production (with items)
  accelerate: (state: GameState, id: string, item: ConsumableName) => GameState | null;
}
```

**Production Formula**:
```
progress = ((now - startedAt) / productionTime) * 100
ready = progress >= 100
```

**Tick Rate**: Process production every 1 second (client-side timer)

**Dependencies**: Game State (1st), Building System (5th), Plot System (4th)

**Implementation Order**: 6th

---

### 7. Currency/Economy System

**Purpose**: Manage coins and energy spending.

**Functions**:
```typescript
interface CurrencySystem {
  // Add/remove coins
  addCoins: (state: GameState, amount: number) => GameState;
  removeCoins: (state: GameState, amount: number) => GameState | null;

  // Add/remove energy
  addEnergy: (state: GameState, amount: number) => GameState;
  removeEnergy: (state: GameState, amount: number) => GameState | null;

  // Buy from shop
  buyItem: (state: GameState, item: ItemName, quantity: number) => GameState | null;

  // Sell to shop
  sellItem: (state: GameState, item: ItemName, quantity: number) => GameState | null;

  // Get balance
  getBalance: (state: GameState) => { coins: number; energy: number };
}
```

**Exchange Rates** (example):
- 1 Energy = 1 Coin
- Ice Ore = 2 Coins
- Water Container = 3 Coins
- Mineral Crystal = 5 Coins
- Oxygen Canister = 4 Coins
- Fuel Cell = 10 Coins

**Dependencies**: Game State (1st), Resource System (2nd), Inventory (3rd)

**Implementation Order**: 7th

---

## Supporting Systems

### 8. Notification System

**Purpose**: Toast notifications and feedback to player.

**Functions**:
```typescript
interface NotificationSystem {
  // Add notification
  notify: (message: string, type: 'success' | 'error' | 'info' | 'warning') => void;

  // Queue notifications
  queueNotification: (notification: Notification) => void;

  // Clear all
  clearAll: () => void;
}

type Notification = {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  timestamp: number;
  duration?: number; // ms, default 3000
};
```

**Dependencies**: None (standalone utility)

**Implementation Order**: 8th (can parallel with others)

---

### 9. Save/Load System

**Purpose**: Persist game state to localStorage.

**Functions**:
```typescript
interface SaveLoadSystem {
  // Save current state
  save: (state: GameState) => void;

  // Load state
  load: () => GameState | null;

  // Delete save
  deleteSave: () => void;

  // Check if save exists
  hasSave: () => boolean;

  // Export save (for backup)
  exportSave: () => string; // JSON string

  // Import save
  importSave: (data: string) => GameState | null;
}
```

**Save Schema Version**: Stored in GameState.version for migrations.

**Autosave Triggers**:
- Every 30 seconds (if dirty)
- On any state-changing action (debounced 5s)
- On page unload (beforeunload event)

**Dependencies**: Game State (1st)

**Implementation Order**: 9th (must be complete for testing)

---

### 10. UI State System

**Purpose**: Manage transient UI state (selected item, open panels, etc.).

**Functions**:
```typescript
interface UIState {
  // Selection
  selectedItem: ItemName | null;
  selectedBuilding: BuildingType | null;
  selectedPlot: string | null;

  // Panels
  activePanel: 'inventory' | 'buildings' | 'shop' | 'colony' | null;

  // Mode
  placementMode: boolean;
  bulldozeMode: boolean;

  // View
  selectedTab: 'resources' | 'buildings' | 'shop';
}
```

**Dependencies**: None (React state via Context)

**Implementation Order**: 10th (parallel with others)

---

## Implementation Priority Order

| Priority | System | Blocking | Notes |
|----------|--------|----------|-------|
| 1 | Game State | Yes | Must be complete first |
| 2 | Resource System | Yes | Other systems depend on it |
| 3 | Inventory System | No | |
| 4 | Plot/Grid System | No | |
| 5 | Building System | No | |
| 6 | Production System | No | Requires 4, 5 |
| 7 | Currency/Economy | No | |
| 8 | Notification System | No | Can parallel |
| 9 | Save/Load System | No | Needed for testing |
| 10 | UI State System | No | Can parallel |

---

## File Structure Recommendation

```
src/
├── features/
│   └── game/
│       ├── components/
│       │   ├── Game.tsx           # Main game component
│       │   ├── Grid.tsx           # Plot grid renderer
│       │   ├── Inventory.tsx      # Inventory panel
│       │   ├── Buildings.tsx       # Building placement UI
│       │   ├── Shop.tsx           # Buy/sell UI
│       │   ├── ProductionTimer.tsx # Progress indicators
│       │   └── Notifications.tsx  # Toast notifications
│       ├── context/
│       │   ├── GameContext.tsx    # Main game state provider
│       │   └── UIContext.tsx      # UI state provider
│       ├── systems/
│       │   ├── resourceSystem.ts
│       │   ├── inventorySystem.ts
│       │   ├── plotSystem.ts
│       │   ├── buildingSystem.ts
│       │   ├── productionSystem.ts
│       │   ├── currencySystem.ts
│       │   └── saveLoadSystem.ts
│       ├── types/
│       │   ├── game.ts            # GameState, ItemName, etc.
│       │   ├── building.ts        # BuildingType, PlacedBuilding
│       │   └── items.ts           # Item definitions
│       ├── data/
│       │   ├── items.ts           # Item definitions & recipes
│       │   ├── buildings.ts       # Building costs & production
│       │   └── crops.ts           # Crop grow times & yields
│       └── utils/
│           ├── time.ts             # Time utilities
│           └── validation.ts       # Can afford / can place checks
├── components/
│   └── ui/                        # Reusable UI components
└── hooks/
    ├── useGameState.ts            # Main game state hook
    ├── useAutosave.ts             # Autosave hook
    └── useNotification.ts         # Notification hook
```

---

## MVP Scope (What NOT to Build Yet)

For MVP, exclude:

1. **Multiplayer/Vising** - No farm visiting
2. **Trading** - No player-to-player trading
3. **NFT/Blockchain** - No wallet connection
4. **Complex Events** - No seasonal events, airdrops
5. **Multiple Islands** - Single colony only
6. **Advanced Buildings** - No upgrading, only placement
7. **Achievements/Quests** - Future feature
8. **Analytics** - No tracking
9. **Mobile Push Notifications** - Future
10. **Export/Import Saves** - Can add later

**MVP Feature Subset**:
- 3 resource types: Ice, Water, Minerals
- 2 building types: Ice Drill, Greenhouse
- 6 plots (3x2 grid)
- Basic inventory (max 20 slots)
- Energy currency only (coins come later)
- Single save slot

---

## Type Definitions (Complete)

```typescript
// src/features/game/types/game.ts

export type ItemName =
  // Tools
  | 'Drill'
  | 'Scanner'
  | 'OxygenTank'
  | 'FuelCan'
  // Resources
  | 'IceOre'
  | 'WaterContainer'
  | 'MineralCrystal'
  | 'OxygenCanister'
  | 'FuelCell'
  // Seeds
  | 'IceSeed'
  | 'WaterSeed'
  | 'MineralSeed'
  // Buildings
  | 'IceDrill'
  | 'WaterExtractor'
  | 'MineralRefinery'
  | 'Greenhouse'
  | 'HabitatModule'
  // Consumables
  | 'EnergyBar'
  | 'WaterBottle';

export type BuildingType =
  | 'IceDrill'
  | 'WaterExtractor'
  | 'MineralRefinery'
  | 'OxygenGenerator'
  | 'FuelSynthesizer'
  | 'Greenhouse'
  | 'HabitatModule';

export type PlotType = 'ice_drill' | 'greenhouse' | 'mining' | 'habitat' | 'empty';
export type PlotStatus = 'empty' | 'planted' | 'growing' | 'ready' | 'harvested';

export interface Position {
  x: number;
  y: number;
}

export interface Plot {
  id: string;
  position: Position;
  type: PlotType;
  status: PlotStatus;
  plantedAt?: number;
  readyAt?: number;
  crop?: CropData;
}

export interface CropData {
  seed: ItemName;
  plantedAt: number;
  growTime: number; // ms
  yield: number;
  resource: 'ice' | 'water' | 'minerals';
}

export interface PlacedBuilding {
  id: string;
  type: BuildingType;
  position: Position;
  placedAt: number;
  producing: boolean;
  startedAt?: number;
  productionTime: number; // ms
  output: number; // amount per cycle
}

export interface GameState {
  // Meta
  version: string;
  createdAt: number;
  lastSavedAt: number;

  // Currencies
  energy: number;
  coins: number;

  // Colony
  colony: {
    level: number;
    population: number;
    maxPopulation: number;
  };

  // Resources (raw)
  resources: {
    ice: number;
    water: number;
    minerals: number;
  };

  // Inventory
  inventory: Partial<Record<ItemName, number>>;

  // Grid
  plots: Record<string, Plot>;
  gridSize: { width: number; height: number };

  // Buildings
  buildings: Record<string, PlacedBuilding[]>;

  // UI State (persisted)
  ui: {
    openedShopAt?: number;
    tutorialStep: number;
  };
}

export interface UIState {
  selectedItem: ItemName | null;
  selectedBuilding: BuildingType | null;
  selectedPlot: string | null;
  activePanel: 'inventory' | 'buildings' | 'shop' | 'colony' | null;
  placementMode: boolean;
  bulldozeMode: boolean;
  notifications: Notification[];
}

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  timestamp: number;
  duration?: number;
}
```

---

## Validation & Formulas

### Can Afford Formula
```typescript
function canAfford(state: GameState, cost: Partial<Record<ItemName | 'energy', number>>): boolean {
  for (const [item, amount] of Object.entries(cost)) {
    if (item === 'energy') {
      if (state.energy < amount) return false;
    } else {
      if ((state.inventory[item as ItemName] ?? 0) < amount) return false;
    }
  }
  return true;
}
```

### Production Progress Formula
```typescript
function getProductionProgress(building: PlacedBuilding, now: number): number {
  if (!building.startedAt || !building.producing) return 0;
  const elapsed = now - building.startedAt;
  return Math.min(100, (elapsed / building.productionTime) * 100);
}
```

### Grid Position Formula
```typescript
function getPlotId(x: number, y: number, gridWidth: number): string {
  return `plot_${y * gridWidth + x}`;
}
```

---

## Testing Checklist

Before marking each system complete:

- [ ] Unit tests for all pure functions
- [ ] Integration test with GameState
- [ ] localStorage save/load roundtrip
- [ ] Handles insufficient resources gracefully
- [ ] Handles invalid positions gracefully
- [ ] Production timer works when tab is backgrounded
- [ ] No console errors during normal gameplay
