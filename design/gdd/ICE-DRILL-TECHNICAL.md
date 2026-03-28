# ICE DRILL - Technical Architecture Document

## 1. Overview

**Stack technique:**
- **Framework**: Next.js 16 (App Router)
- **Langage**: TypeScript (strict mode)
- **UI**: React 19 + Tailwind CSS v4
- **State Management**: React Context + useReducer
- **Calculations**: Decimal.js pour précision monétaire
- **Persistence**: localStorage avec JSON serialization
- **Rendering**: HTML/CSS pour UI, Canvas API réservé pour effets spéciaux (particules)

**Architecture philosophy**: Systems-over-Objects (SFP). Chaque système est un module pur qui reçoit un état et retourne un nouvel état. Pas de mutation directe. Cette approche facilite le debugging, les tests, et l'immutabilité.

**References:**
- Game Design: `ICE-DRILL-GAME-DESIGN.md`
- Systems Index: `ICE-DRILL-SYSTEMS-INDEX.md`
- Progression: `ICE-DRILL-PROGRESSION.md`
- Art Direction: `ICE-DRILL-ART-DIRECTION.md`

---

## 2. Player Fantasy

Technical decisions serve player experience.

L'architecture doit permettre:
- **Feedback instantané** (<100ms) pour chaque clic
- **Progression visible** avec animations fluides
- **Session fiable** avec sauvegarde automatique et calcul offline correct
- **Performance stable** (60 FPS) même avec 30+ bâtiments

---

## 3. Detailed Rules

### 3.1 Directory Structure

```
src/
├── app/                           # Next.js App Router
│   ├── layout.tsx                 # Root layout avec providers
│   ├── page.tsx                   # Game entry point
│   └── globals.css                # Tailwind + custom properties
├── features/
│   └── game/
│       ├── components/            # React components
│       │   ├── Game.tsx           # Main game container
│       │   ├── Grid.tsx           # 6x6 colony grid renderer
│       │   ├── ResourceNode.tsx  # Clickable Ice/Regolith nodes
│       │   ├── BuildingSlot.tsx  # Building placement slot
│       │   ├── BuildingPanel.tsx # Selected building details
│       │   ├── BuildMenu.tsx     # Building selection menu
│       │   ├── InventoryPanel.tsx# Resource inventory display
│       │   ├── HUD.tsx           # Top status bar
│       │   ├── ProductionTimer.tsx # Building progress indicator
│       │   └── Notifications.tsx # Toast notification system
│       ├── context/
│       │   ├── GameProvider.tsx  # Main game state provider
│       │   ├── DispatchContext.tsx # Action dispatcher
│       │   └── selectors.ts      # Selectors hooks (useGameSelector)
│       ├── systems/               # Pure state transformers
│       │   ├── gameReducer.ts    # Central useReducer handler
│       │   ├── resourceSystem.ts
│       │   ├── buildingSystem.ts
│       │   ├── productionSystem.ts
│       │   ├── currencySystem.ts
│       │   ├── plotSystem.ts
│       │   ├── offlineSystem.ts  # Offline production calculation
│       │   └── saveLoadSystem.ts
│       ├── data/                  # Static game data
│       │   ├── resources.ts      # Resource definitions
│       │   ├── buildings.ts      # Building costs/production
│       │   ├── recipes.ts        # Production chains
│       │   └── constants.ts      # Tuning knobs
│       ├── types/                 # TypeScript interfaces
│       │   ├── game.ts           # GameState, actions
│       │   ├── resource.ts       # ResourceName, Resource
│       │   ├── building.ts       # BuildingName, Building
│       │   └── action.ts         # ActionTypes union
│       └── utils/
│           ├── time.ts           # Time utilities
│           ├── format.ts         # Number formatting
│           ├── validation.ts     # canAfford, canPlace
│           └── migration.ts      # Save schema migrations
├── components/
│   └── ui/                       # Reusable UI primitives
│       ├── Button.tsx
│       ├── Panel.tsx
│       ├── ProgressBar.tsx
│       └── Toast.tsx
└── hooks/
    ├── useGame.ts               # Main game hook (state + dispatch)
    ├── useAutosave.ts           # Autosave hook (30s interval)
    ├── useGameLoop.ts           # 100ms tick for UI, 1s for production
    ├── useNotification.ts       # Toast notification hook
    └── useKeyboard.ts           # Keyboard shortcuts
```

### 3.2 State Architecture

**Single Source of Truth**: Le `GameState` est l'unique source de vérité. Toute modification passe par le reducer central.

```typescript
// src/features/game/types/game.ts

export interface GameState {
  // Meta
  version: string;              // Schema version for migrations
  createdAt: number;            // Timestamp
  lastSavedAt: number;          // Last save timestamp
  lastLoginAt: number;          // For offline calculation

  // Currencies
  helium3: string;              // Decimal string (precision)
  solarPower: string;           // Decimal string
  coins: number;                // Standard number (small values)

  // Resources (Tier 1-3)
  inventory: Record<ResourceName, string>; // Decimal strings

  // Colonist
  colonistLevel: number;
  experience: number;

  // Grid & Buildings
  gridSize: number;             // 6 for 6x6
  plots: Record<PlotId, PlotState>;
  buildings: Record<BuildingId, BuildingState>;

  // Production queues
  production: Record<BuildingId, ProductionState>;

  // Progression
  unlocks: string[];            // Unlocked building types
  achievements: string[];

  // Colony
  colonists: number;
  oxygenLevel: string;
}

export interface PlotState {
  id: PlotId;
  type: 'empty' | 'ice_node' | 'regolith_deposit' | 'mine_shaft';
  position: { x: number; y: number };
  resourceLevel?: number;       // Depletion state (future)
}

export interface BuildingState {
  id: BuildingId;
  type: BuildingName;
  position: { x: number; y: number };
  tier: 1 | 2 | 3;
  producing: boolean;
  startedAt?: number;
  efficiency: number;           // 0.5 to 1.5
  createdAt: number;
}

export interface ProductionState {
  buildingId: BuildingId;
  progress: number;             // 0-100
  currentInput: Partial<Record<ResourceName, number>>;
}
```

### 3.3 Action Types & Reducer

```typescript
// src/features/game/types/action.ts

export type GameAction =
  // Resource actions
  | { type: 'ADD_RESOURCE'; resource: ResourceName; amount: string }
  | { type: 'REMOVE_RESOURCE'; resource: ResourceName; amount: string }
  | { type: 'SET_RESOURCE'; resource: ResourceName; amount: string }

  // Building actions
  | { type: 'PLACE_BUILDING'; building: BuildingName; position: { x: number; y: number } }
  | { type: 'REMOVE_BUILDING'; buildingId: BuildingId }
  | { type: 'TOGGLE_BUILDING'; buildingId: BuildingId }
  | { type: 'UPGRADE_BUILDING'; buildingId: BuildingId }

  // Production actions
  | { type: 'START_PRODUCTION'; buildingId: BuildingId }
  | { type: 'TICK_PRODUCTION'; deltaMs: number }
  | { type: 'COLLECT_OUTPUT'; buildingId: BuildingId }

  // Currency actions
  | { type: 'ADD_CURRENCY'; currency: 'helium3' | 'solarPower' | 'coins'; amount: string | number }
  | { type: 'SPEND_CURRENCY'; currency: 'helium3' | 'solarPower' | 'coins'; amount: string | number }

  // Plot actions
  | { type: 'CLICK_NODE'; plotId: PlotId }

  // Meta actions
  | { type: 'LOAD_GAME'; state: GameState }
  | { type: 'NEW_GAME' }
  | { type: 'TICK'; deltaMs: number }
  | { type: 'CALCULATE_OFFLINE'; currentTime: number };
```

### 3.4 Selector Pattern

```typescript
// src/features/game/context/selectors.ts

// Primitive selectors
export const selectHelium3 = (state: GameState) => state.helium3;
export const selectSolarPower = (state: GameState) => state.solarPower;
export const selectResource = (state: GameState, resource: ResourceName) => state.inventory[resource];
export const selectBuildings = (state: GameState) => Object.values(state.buildings);
export const selectPlots = (state: GameState) => Object.values(state.plots);

// Derived selectors (memorized with useMemo)
export const selectActiveBuildings = (state: GameState) =>
  Object.values(state.buildings).filter(b => b.producing);

export const selectTotalSolarProduction = (state: GameState) => {
  return Object.values(state.buildings)
    .filter(b => b.producing && b.type === 'Solar Array')
    .reduce((sum, b) => sum + SOLAR_ARRAY_OUTPUT * b.tier, 0);
};

export const selectNetEnergyRate = (state: GameState) => {
  const production = selectTotalSolarProduction(state);
  const consumption = Object.values(state.buildings)
    .filter(b => b.producing && b.consumes?.resource === 'Solar Power')
    .reduce((sum, b) => sum + (b.consumes?.amount || 0), 0);
  return production - consumption;
};

export const selectBuildingById = (state: GameState, id: BuildingId) => state.buildings[id];

// Custom hook for selectors
export function useGameSelector<T>(selector: (state: GameState) => T): T {
  return useContext(GameContext).state satisfies T;
}
```

### 3.5 Provider Composition

```typescript
// src/features/game/context/GameProvider.tsx

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, undefined, initGameState);

  // Autosave every 30 seconds
  useAutosave(state);

  // Game loop: 100ms UI tick + 1s production tick
  useGameLoop(dispatch, state);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </GameContext.Provider>
  );
}

// Composition order matters for hook dependencies
// 1. GameContext - provides state
// 2. DispatchContext - provides dispatch
// Consumers can use either or both
```

### 3.6 System Functions

**resourceSystem.ts**
```typescript
export const resourceSystem = {
  add: (state: GameState, resource: ResourceName, amount: string): GameState => {
    const current = state.inventory[resource] || '0';
    return {
      ...state,
      inventory: {
        ...state.inventory,
        [resource]: new Decimal(current).plus(amount).toString(),
      },
    };
  },

  remove: (state: GameState, resource: ResourceName, amount: string): GameState | null => {
    const current = state.inventory[resource] || '0';
    if (new Decimal(current).lt(amount)) return null;
    return {
      ...state,
      inventory: {
        ...state.inventory,
        [resource]: new Decimal(current).minus(amount).toString(),
      },
    };
  },

  canAfford: (state: GameState, cost: Partial<Record<ResourceName, string>>): boolean => {
    return Object.entries(cost).every(([resource, amount]) => {
      const current = state.inventory[resource as ResourceName] || '0';
      return new Decimal(current).gte(amount || '0');
    });
  },
};
```

**productionSystem.ts**
```typescript
const PRODUCTION_TICK_MS = 1000;

export const productionSystem = {
  tick: (state: GameState, deltaMs: number): GameState => {
    // Only process every 1 second
    const newState = { ...state };

    for (const [buildingId, building] of Object.entries(state.buildings)) {
      if (!building.producing) continue;

      const productionConfig = BUILDINGS[building.type]?.produces;
      if (!productionConfig) continue;

      // Calculate progress increment
      const progressPerMs = 100 / (productionConfig.intervalSeconds * 1000);
      const currentProgress = state.production[buildingId]?.progress || 0;
      const newProgress = Math.min(100, currentProgress + progressPerMs * deltaMs);

      // Update production state
      newState.production = {
        ...newState.production,
        [buildingId]: {
          ...newState.production[buildingId],
          buildingId,
          progress: newProgress,
        },
      };

      // If complete, add resource
      if (newProgress >= 100) {
        resourceSystem.add(newState, productionConfig.resource, String(productionConfig.amount));
        // Reset progress
        newState.production[buildingId].progress = 0;
      }
    }

    return newState;
  },
};
```

### 3.7 Game Loop

```typescript
// src/hooks/useGameLoop.ts

const UI_TICK_MS = 100;
const PRODUCTION_TICK_MS = 1000;

export function useGameLoop(dispatch: Dispatch<GameAction>, state: GameState) {
  useEffect(() => {
    let lastTime = performance.now();
    let productionAccumulator = 0;

    const tick = (currentTime: number) => {
      const deltaMs = currentTime - lastTime;
      lastTime = currentTime;

      // Always dispatch UI tick (for animations)
      dispatch({ type: 'TICK', deltaMs });

      // Production tick every 1 second
      productionAccumulator += deltaMs;
      if (productionAccumulator >= PRODUCTION_TICK_MS) {
        dispatch({ type: 'TICK_PRODUCTION', deltaMs: productionAccumulator });
        productionAccumulator = 0;
      }

      requestAnimationFrame(tick);
    };

    const frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [dispatch]);
}
```

---

## 4. Formulas

### 4.1 Production Rate

```typescript
function calculateProduction(
  baseRate: number,
  buildingTier: 1 | 2 | 3,
  efficiency: number,
  powerMultiplier: number
): number {
  const tierMultiplier = buildingTier === 1 ? 1 : buildingTier === 2 ? 2 : 4;
  return baseRate * tierMultiplier * efficiency * powerMultiplier;
}

/*
Example: Tier 2 Water Extractor
- baseRate = 1 Water Ice / 10s
- buildingTier = 2 (2x multiplier)
- efficiency = 1.0 (normal)
- powerMultiplier = 1.0 (powered)
Result: 1 * 2 * 1.0 * 1.0 = 2 Water Ice / 10s
*/
```

### 4.2 Building Cost Scaling

```typescript
const BUILDING_COST_SCALE = 1.15;

function calculateBuildingCost(
  baseCost: Partial<Record<ResourceName, number>>,
  tier: 1 | 2 | 3,
  existingCount: number
): Partial<Record<ResourceName, number>> {
  const scaleFactor = Math.pow(BUILDING_COST_SCALE, existingCount);
  const tierMultiplier = tier === 1 ? 1 : tier === 2 ? 1.5 : 2;

  return Object.fromEntries(
    Object.entries(baseCost).map(([resource, amount]) => [
      resource,
      Math.floor((amount || 0) * scaleFactor * tierMultiplier),
    ])
  );
}

/*
Example: Water Extractor (base: 20 Ice, 10 Regolith)
After 3 built:
- scaleFactor = 1.15^3 = 1.520875
- Ice: floor(20 * 1.520875 * 1.0) = 30
- Regolith: floor(10 * 1.520875 * 1.0) = 15
*/
```

### 4.3 Offline Production

```typescript
const OFFLINE_CAP_HOURS = 8;
const OFFLINE_CAP_MS = OFFLINE_CAP_HOURS * 60 * 60 * 1000;

function calculateOfflineProduction(
  lastLogin: number,
  currentTime: number,
  state: GameState
): Partial<Record<ResourceName, string>> {
  const offlineMs = Math.min(currentTime - lastLogin, OFFLINE_CAP_MS);
  const offlineSeconds = offlineMs / 1000;
  const results: Partial<Record<ResourceName, string>> = {};

  for (const building of Object.values(state.buildings)) {
    if (!building.producing) continue;

    const config = BUILDINGS[building.type];
    if (!config?.produces) continue;

    const rate = calculateProduction(
      config.produces.amount,
      building.tier,
      building.efficiency,
      1 // Always powered for offline
    );

    const consumedPerSecond = config.consumes
      ? config.consumes.amount / config.consumes.intervalSeconds
      : 0;
    const producedPerSecond = rate / config.produces.intervalSeconds;
    const netPerSecond = producedPerSecond - consumedPerSecond;

    if (netPerSecond > 0) {
      const total = new Decimal(netPerSecond * offlineSeconds);
      results[config.produces.resource] = total.toString();
    }
  }

  return results;
}
```

### 4.4 XP and Level

```typescript
const XP_PER_LEVEL: Record<number, number> = {
  1: 0, 2: 100, 3: 250, 4: 500, 5: 1000,
  6: 2000, 7: 4000, 8: 8000, 9: 16000, 10: 32000,
};

function calculateLevel(totalXP: number): number {
  let level = 1;
  for (let i = 2; i <= 10; i++) {
    if (totalXP >= XP_PER_LEVEL[i]) level = i;
    else break;
  }
  return level;
}

function getXPForNextLevel(currentLevel: number): number {
  return XP_PER_LEVEL[currentLevel + 1] || XP_PER_LEVEL[currentLevel] * 2;
}
```

---

## 5. Edge Cases

### 5.1 Save Corruption

**Detection**: JSON.parse throws or version mismatch

**Recovery**:
1. Try to parse saved JSON; if fails, save is corrupted
2. Attempt migration (see 5.2)
3. If migration fails or no migration path, start fresh game
4. Show user: "Save file was corrupted. Starting new game."

```typescript
function loadGame(): GameState | null {
  try {
    const saved = localStorage.getItem(SAVE_KEY);
    if (!saved) return null;

    const parsed = JSON.parse(saved);
    return migrateState(parsed);
  } catch {
    // Corrupted save
    return null;
  }
}
```

### 5.2 Schema Migration

**Version tracking**: `GameState.version` follows semver (e.g., "1.0.0")

**Migration chain**: Each version has a migration function

```typescript
// src/features/game/utils/migration.ts

const MIGRATIONS: Record<string, (state: any) => any> = {
  '0.9.0': (state) => ({
    ...state,
    version: '1.0.0',
    // Add new fields with defaults
    colonists: state.colonists ?? 0,
    oxygenLevel: state.oxygenLevel ?? '100',
  }),
  '1.0.0': (state) => {
    // Future migrations
    return state;
  },
};

export function migrateState(state: any): GameState {
  let current = state;
  const targetVersion = CURRENT_VERSION;

  while (current.version !== targetVersion) {
    const migrator = MIGRATIONS[current.version];
    if (!migrator) {
      console.error(`No migration from ${current.version}`);
      break;
    }
    current = migrator(current);
  }

  return current;
}
```

### 5.3 Offline Time Edge Cases

**Future timestamp**: If `lastLoginAt > currentTime`, assume now (clock manipulation)

**Negative delta**: If `currentTime - lastLoginAt < 0`, use 0

**Large values**: Cap at OFFLINE_CAP_MS (8 hours) to prevent abuse

```typescript
function calculateOfflineTime(lastLogin: number, currentTime: number): number {
  const delta = currentTime - lastLogin;

  if (delta < 0) {
    console.warn('Clock manipulation detected');
    return 0;
  }

  return Math.min(delta, OFFLINE_CAP_MS);
}
```

### 5.4 Number Precision

**Problem**: JavaScript Number loses precision beyond 2^53

**Solution**: Use Decimal.js for all currency/resource calculations; store as string in state

```typescript
// Good: Decimal.js
const helium3 = new Decimal(state.helium3).plus(earned).toString();

// Bad: Native number
const helium3 = state.helium3 + earned; // Precision loss!
```

### 5.5 localStorage Quota

**Detection**: Catch QuotaExceededError

**Handling**:
1. Log warning
2. Try to compress old data (remove action history)
3. If still full, warn user: "Storage full. Some progress may be lost."

```typescript
function saveGame(state: GameState): boolean {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(SAVE_KEY, serialized);
    return true;
  } catch (e) {
    if (e instanceof DOMException && e.name === 'QuotaExceededError') {
      console.warn('localStorage quota exceeded');
    }
    return false;
  }
}
```

### 5.6 Tab Backgrounding

**Problem**: requestAnimationFrame pauses when tab is hidden

**Solution**: Track real time with timestamps, not frame count

```typescript
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Store timestamp when hidden
    hiddenAt = performance.now();
  } else {
    // Calculate missed time on return
    const missedMs = performance.now() - hiddenAt;
    dispatch({ type: 'TICK', deltaMs: missedMs });
  }
});
```

---

## 6. Dependencies

### 6.1 External Libraries

| Library | Version | Purpose | Justification |
|---------|---------|---------|---------------|
| `decimal.js` | ^10.4.0 | Precise calculations | Native JS loses precision; required for idle game economics |
| `react` | 19.x | UI framework | Required by Next.js |
| `next` | 16.x | Framework | User preference |
| `tailwindcss` | ^4.0 | Styling | Rapid UI development |

### 6.2 No Backend

**Architecture**: Pure client-side, no server

**Implications**:
- No multiplayer (future: optional via API)
- No anti-cheat (trust client)
- Save files are plaintext JSON in localStorage
- User can modify save (cheating is their choice)

### 6.3 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 15+
- Edge 90+

**No IE11 support**. localStorage and Decimal.js require modern browsers.

---

## 7. Tuning Knobs

All tunables are centralized in `src/features/game/data/constants.ts`:

```typescript
// src/features/game/data/constants.ts

export const TUNING = {
  // Game loop
  UI_TICK_MS: 100,
  PRODUCTION_TICK_MS: 1000,

  // Offline
  OFFLINE_CAP_HOURS: 8,

  // Autosave
  AUTOSAVE_INTERVAL_MS: 30000,
  AUTOSAVE_DEBOUNCE_MS: 5000,

  // Production
  SOLAR_ARRAY_OUTPUT: 1,
  SOLAR_ARRAY_INTERVAL: 5,
  ICE_DRILL_OUTPUT: 1,
  ICE_DRILL_INTERVAL: 5,
  WATER_EXTRACTOR_RATIO: 1,
  WATER_EXTRACTOR_INTERVAL: 10,

  // Costs
  BUILDING_COST_SCALE: 1.15,
  TIER_2_MULTIPLIER: 1.5,
  TIER_3_MULTIPLIER: 2,

  // Storage
  STORAGE_CAP_BASE: 1000,

  // XP
  XP_PER_LEVEL: {
    1: 0, 2: 100, 3: 250, 4: 500, 5: 1000,
    6: 2000, 7: 4000, 8: 8000, 9: 16000, 10: 32000,
  },

  // Land expansion
  LAND_EXPANSION_COSTS: [
    { size: 6, cost: 0 },
    { size: 8, cost: 10 },
    { size: 10, cost: 25 },
    { size: 12, cost: 50 },
    { size: 14, cost: 100 },
  ],
} as const;
```

**Usage**: Import from constants, never hardcode values in systems.

---

## 8. Acceptance Criteria

### 8.1 Performance Criteria

| Metric | Target | Measurement |
|--------|--------|-------------|
| Initial load | < 3s | Lighthouse |
| Click response | < 100ms | Performance API |
| Production tick | < 50ms | Performance.mark |
| Save/Load | < 500ms | Performance.mark |
| Memory (idle 1h) | < 100MB | Chrome DevTools |
| FPS | 60 stable | requestAnimationFrame |

### 8.2 Functional Criteria

- [ ] Game loads with correct initial state (6x6 grid, 4 Ice nodes, 2 Regolith, 1 Solar Array)
- [ ] Clicking Ice node adds 1 Ice to inventory
- [ ] Clicking Regolith node adds 1 Regolith to inventory
- [ ] Building Solar Array deducts correct resources and places building
- [ ] Solar Array produces 1 Solar Power every 5 seconds
- [ ] Water Extractor consumes Solar Power and produces Water Ice
- [ ] Production progress bar fills over correct interval
- [ ] Game saves to localStorage every 30 seconds
- [ ] Game loads from localStorage on page load
- [ ] Offline production calculates for time away (capped at 8 hours)
- [ ] Currency display updates in real-time with correct formatting
- [ ] No console errors during normal gameplay

### 8.3 Architecture Criteria

- [ ] All state changes go through gameReducer
- [ ] No direct state mutation (use Immer or manual spread)
- [ ] All selectors use useGameSelector hook
- [ ] All systems are pure functions (no side effects)
- [ ] Constants centralized in constants.ts
- [ ] Types defined in types/ directory
- [ ] Migration path exists for version bumps

### 8.4 Code Quality Criteria

- [ ] TypeScript strict mode enabled
- [ ] No `any` types (except migration where schema unknown)
- [ ] All public functions have JSDoc comments
- [ ] Unit tests for system functions (resourceSystem, productionSystem)
- [ ] Integration tests for reducer actions
- [ ] No commented-out code in production files

---

## Appendix A: File Naming Conventions

| Pattern | Example | Usage |
|---------|---------|-------|
| `*.system.ts` | `resourceSystem.ts` | Pure state transformation functions |
| `*.types.ts` | `game.ts` | TypeScript interfaces |
| `*.data.ts` | `buildings.ts` | Static configuration data |
| `use*.ts` | `useGameLoop.ts` | Custom React hooks |
| `select*.ts` | `selectors.ts` | State selection functions |

## Appendix B: Testing Strategy

```typescript
// src/features/game/systems/__tests__/resourceSystem.test.ts

describe('resourceSystem', () => {
  it('adds resource correctly', () => {
    const state = createInitialState();
    const result = resourceSystem.add(state, 'Ice', '10');
    expect(result.inventory.Ice).toBe('10');
  });

  it('removes resource when sufficient', () => {
    const state = createStateWithResources({ Ice: '20' });
    const result = resourceSystem.remove(state, 'Ice', '10');
    expect(result?.inventory.Ice).toBe('10');
  });

  it('returns null when insufficient', () => {
    const state = createStateWithResources({ Ice: '5' });
    const result = resourceSystem.remove(state, 'Ice', '10');
    expect(result).toBeNull();
  });

  it('canAfford returns true when enough', () => {
    const state = createStateWithResources({ Ice: '50', Regolith: '20' });
    expect(resourceSystem.canAfford(state, { Ice: '30', Regolith: '10' })).toBe(true);
  });

  it('canAfford returns false when insufficient', () => {
    const state = createStateWithResources({ Ice: '20', Regolith: '5' });
    expect(resourceSystem.canAfford(state, { Ice: '30', Regolith: '10' })).toBe(false);
  });
});
```

---

*Document Version: 1.0*
*Created: 2026-03-28*
*Status: Initial Draft*
*Author: Technical Director Agent*
