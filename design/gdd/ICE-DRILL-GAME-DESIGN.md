# ICE DRILL: Lunar Colony - Game Design Document

## 1. Overview

ICE DRILL est un jeu idle/incremental de colonisation lunaire inspiré de Sunflower Land. Le joueur extrait des ressources lunaires (Glace, Régolithe, Métaux rares), construit des structures de survie (Habitats, Extracteurs, Serres), et développe une colonie autosuffisante sur la Lune. L'expérience se veut meditative mais engageante, avec des cycles de jeu courts pour les sessions mobiles et un progrès à long terme pour la progression.

---

## 2. Player Fantasy

Le joueur incarne un ingénieur en charge de établir une présence humaine permanente sur la Lune. La lune évoque l'isolement, la beauté sterne, et la survie dans un environnement hostile. L'atmosphère est a la fois contemplative (regarder la Terre se lever a l'horizon) et satisfaisante (voir sa colonie croitre de quelques modules a une base autonome).

**Emotions cibles:**
- **Competence**: La satisfaction de construire, optimiser, et voir sa colonie prosperer
- **Autonomy**: Choix de quoi construire et dans quel ordre
- **Discovery**: Decouvrir de nouvelles ressources et technologies

**MDA Aesthetics principaux:**
- Fantasy (etre un pionnier spatial)
- Challenge (gerer les ressources et la survie)
- Discovery (explorer de nouveaux nodes et technologies)

---

## 3. Core Resources

### 3.1 Resource Hierarchy

| Resource | Tier | Source | Use |
|----------|------|--------|-----|
| **Ice** | 1 | Click nodes | Base crafting, Water extraction |
| **Regolith** | 1 | Click nodes | Building construction |
| **Water Ice** | 1 | Ice + Energy | Life support, Crops |
| **Oxygen** | 2 | Water Ice + Energy | Colonist survival |
| **Solar Power** | 1 | Solar Arrays (passive) | Energy for all buildings |
| **Iron** | 2 | Mine nodes | Advanced buildings |
| **Gold** | 3 | Rare mine nodes | Premium buildings |
| **Helium-3** | 3 | Rare extraction | Currency, fusion reactor |
| **Lunar Crops** | 2 | Greenhouse | Food for colonists, selling |

### 3.2 Resource Definitions

```typescript
type ResourceName =
  // Tier 1 - Basic Extraction
  | "Ice"
  | "Regolith"
  | "Solar Power"

  // Tier 2 - Processed
  | "Water Ice"
  | "Oxygen"
  | "Lunar Wheat"
  | "Moonroot"
  | "Iron"

  // Tier 3 - Advanced
  | "Gold"
  | "Helium-3"
  | "Rare Metal"
  | "Dark Matter";

type Resource = {
  name: ResourceName;
  tier: 1 | 2 | 3;
  sellPrice: number;      // In Helium-3
  harvestSeconds: number; // For nodes
  description: string;
};
```

### 3.3 Production Chains

```
ICE DRILL Game - Production Chains
===================================

Chain 1: Water Production
--------------------------
Ice (click) + Solar Power -> Water Ice (Extractor)
Water Ice + Solar Power -> Oxygen (Life Support)

Chain 2: Food Production
--------------------------
Water Ice + Lunar Wheat Seed -> Lunar Wheat (Greenhouse)
Lunar Wheat -> Sell for Helium-3

Chain 3: Metal Extraction
--------------------------
Regolith (click) + Energy -> Iron (Ore Processor)
Iron + Energy -> Gold (requires Rare Metal deposit)
Rare Metal + Gold -> Dark Matter (Fusion Lab)

Chain 4: Energy Production
---------------------------
Solar Arrays (passive) -> Solar Power
Helium-3 + Solar Power -> Extra Energy (Fusion Reactor)

Chain 5: Building Materials
---------------------------
Ice + Regolith -> Construction Materials (Builder)
Construction Materials + Iron -> Steel (Forge)
```

---

## 4. Currency System

### 4.1 Currencies

| Currency | Type | Use |
|----------|------|-----|
| **Helium-3** | Primary | Premium buildings, upgrades, land expansion |
| **Solar Power** | Energy | Running buildings, instant actions |
| **Coins** | Legacy | Basic purchases, taxes |

### 4.2 Helium-3 Economy

Helium-3 est la ressource premium rare, obtenue principalement par:
- Vente de Lunar Crops (late game)
- Extraction directe (tres rare, endgame)
- Achat avec Solar Power (conversion lente)

```typescript
type Currency = {
  helium3: Decimal;
  solarPower: Decimal;
  coins: number;
};
```

---

## 5. Land & Grid System

### 5.1 Initial Colony Layout

**Starting Grid: 6x6 (36 plots)**
- Pre-placed: 4 Ice Nodes, 2 Regolith Deposits
- Pre-placed: 1 Solar Array (starter energy)
- Empty plots for building placement

```
COLONY GRID (6x6)
=================
[I] [I] [ ] [ ] [ ] [ ]
[I] [R] [ ] [ ] [ ] [ ]
[ ] [ ] [S] [ ] [ ] [ ]
[ ] [ ] [ ] [ ] [ ] [ ]
[ ] [ ] [ ] [ ] [ ] [ ]
[ ] [ ] [ ] [ ] [ ] [ ]

Legend:
I = Ice Node (clickable)
R = Regolith Deposit (clickable)
S = Solar Array (pre-placed)
```

### 5.2 Plot Types

| Plot Type | Size | Content |
|-----------|------|---------|
| **Ice Node** | 1x1 | Clickable, yields Ice |
| **Regolith Deposit** | 1x1 | Clickable, yields Regolith |
| **Building Plot** | 1x1 to 3x3 | Placeable structures |
| **Greenhouse Plot** | 2x2 | Crops cultivation |
| **Mine Shaft** | 2x2 | Iron/Gold extraction |
| **Empty Land** | 1x1 | Awaiting development |

### 5.3 Land Expansion

Land expands via expansion kits purchased with Helium-3:

| Expansion | Cost | Grid Size | New Plots |
|-----------|------|-----------|-----------|
| Initial | - | 6x6 | 36 |
| Expansion 1 | 10 He-3 | 8x8 | 64 (+28) |
| Expansion 2 | 25 He-3 | 10x10 | 100 (+36) |
| Expansion 3 | 50 He-3 | 12x12 | 144 (+44) |
| Expansion 4 | 100 He-3 | 14x14 | 196 (+52) |

Each expansion unlocks:
- New building slots
- New resource nodes (Iron, Gold)
- Access to higher-tier content

---

## 6. Buildings

### 6.1 Building Categories

**Life Support (Survival)**
- Oxygen Generator: Converts Water Ice to Oxygen (continuous drain)
- Water Extractor: Converts Ice to Water Ice
- Life Support Bay: Stores Oxygen, auto-distributes

**Energy Production**
- Solar Array: Generates Solar Power (day cycle)
- Fusion Reactor: Converts Helium-3 to massive Energy
- Battery Bank: Stores excess energy

**Resource Extraction**
- Ice Drill: Auto-harvests Ice from nodes
- Regolith Processor: Auto-harvests Regolith
- Ore Processor: Refines Regolith to Iron
- Deep Core Mine: Extracts Gold and Rare Metals

**Food & Agriculture**
- Greenhouse: Grows Lunar Wheat, Moonroot
- Hydroponic Bay: Faster crop growth
- Food Storage: Preserves crops longer

**Construction & Crafting**
- Builder: Crafts construction materials
- Forge: Creates Steel from Iron
- Assembler: Creates advanced components

**Colony Infrastructure**
- Habitat Module: Increases colonist capacity
- Command Center: Unlocks upgrades
- Landing Pad: Enables trade with Earth

### 6.2 Building Definitions

```typescript
type BuildingName =
  | "Solar Array"
  | "Oxygen Generator"
  | "Water Extractor"
  | "Ice Drill"
  | "Regolith Processor"
  | "Ore Processor"
  | "Deep Core Mine"
  | "Greenhouse"
  | "Hydroponic Bay"
  | "Habitat Module"
  | "Command Center"
  | "Fusion Reactor"
  | "Battery Bank"
  | "Builder"
  | "Forge"
  | "Assembler"
  | "Landing Pad"
  | "Food Storage";

type Building = {
  name: BuildingName;
  tier: 1 | 2 | 3;
  size: { width: number; height: number };
  constructionSeconds: number;
  cost: {
    resources: Partial<Record<ResourceName, number>>;
    helium3?: number;
  };
  produces?: {
    resource: ResourceName;
    amount: number;
    intervalSeconds: number;
  };
  consumes?: {
    resource: ResourceName;
    amount: number;
    intervalSeconds: number;
  };
  unlocksAtLevel: number;
};
```

### 6.3 Starter Buildings (Tier 1)

| Building | Cost | Production | Consumption |
|----------|------|------------|-------------|
| **Solar Array** | 10 Regolith | 1 Solar Power/5s | - |
| **Water Extractor** | 20 Ice, 10 Regolith | 1 Water Ice/10s | 1 Solar Power/10s |
| **Ice Drill** | 30 Regolith, 5 Iron | 1 Ice/5s | 1 Solar Power/5s |

---

## 7. Core Game Loops

### 7.1 30-Second Loop (Moment-to-Moment)

**Primary Action: Resource Extraction**
- Click on resource nodes (Ice, Regolith) for instant yield
- Watch progress bars fill on auto-extractors
- Satisfying feedback: particles, sounds, number popups

**Key Feel:**
- Each click should feel impactful (visual juice, incremental progress)
- Auto-extractors provide ambient satisfaction
- Energy management becomes tactical (brownouts = slowdown)

**Player Agency:**
- Choose which nodes to prioritize
- Activate/deactivate extractors to manage power

### 7.2 5-Minute Loop (Short Sessions)

**Goal Completion Cycle:**
1. Collect accumulated resources (30-60 seconds of clicking)
2. Craft new building materials (Builder, Forge)
3. Construct or upgrade a building (30-60 seconds)
4. Watch new production come online
5. Repeat with scaled resources

**Short-term Milestones:**
- Build first Water Extractor
- Produce first batch of Oxygen
- Grow first Lunar Wheat
- Unlock Tier 2 buildings

**Psychological Hook:**
- "One more building" loop
- Completion satisfaction of watching production chains connect

### 7.3 Session Loop (30-120 Minutes)

**Full Session Structure:**
1. **Daily Login** (2-5 min): Collect offline production, manage inventory
2. **Expansion Phase** (10-20 min): Build new structures, unlock land
3. **Optimization Phase** (10-30 min): Tune production chains, upgrade buildings
4. **Progression Phase** (10-30 min): Reach next tier, unlock new content
5. **Strategic Planning** (5-10 min): Decide next priorities

**Natural Stopping Points:**
- Building construction completes
- Resources reach a milestone
- New tier unlocked
- Offline period begins

### 7.4 Progression Loop (Days/Weeks)

**Long-term Arc:**
1. **Early Game (Day 1-3)**
   - Learn clicking mechanics
   - Build basic infrastructure
   - First production chains online
   - Unlock 2nd tier buildings

2. **Mid Game (Day 4-14)**
   - Optimize production chains
   - Land expansion begins
   - Deep Core Mine unlocks Gold
   - Fusion Reactor enables high-power buildings

3. **Late Game (Day 15+)**
   - Full production chains running
   - Helium-3 becomes primary focus
   - Landing Pad enables Earth trade
   - Colony becomes self-sustaining

**Endgame Goals:**
- Fully upgraded Command Center (Level 10)
- All land expansion tiles purchased
- Fusion Reactor running on Helium-3
- Daily Helium-3 income from crops/trade

---

## 8. Progression System

### 8.1 Colonist Level

Each colonist (Bumpkin equivalent) gains XP through:
- Resource extraction (small XP per action)
- Building construction (medium XP)
- Crop harvesting (small XP)
- Milestone completion (large XP)

**XP Curve:**
```typescript
const XP_PER_LEVEL = {
  1: 0,
  2: 100,
  3: 250,
  4: 500,
  5: 1000,
  6: 2000,
  7: 4000,
  8: 8000,
  9: 16000,
  10: 32000,
  // ... continues
};

// Level unlocks
const LEVEL_UNLOCKS = {
  2: ["Water Extractor", "Regolith Processor"],
  3: ["Greenhouse", "Ice Drill"],
  4: ["Ore Processor", "Battery Bank"],
  5: ["Deep Core Mine", "Habitat Module"],
  6: ["Fusion Reactor", "Hydroponic Bay"],
  7: ["Landing Pad", "Assembler"],
  8: ["Command Center Tier 2"],
  9: ["Command Center Tier 3"],
  10: ["Full Colonization Victory"],
};
```

### 8.2 Building Upgrades

Buildings have 3 upgrade tiers:
- **Tier 1 (Basic)**: Default stats
- **Tier 2 (Enhanced)**: 2x production, 1.5x cost
- **Tier 3 (Advanced)**: 4x production, 2x cost

```typescript
type BuildingUpgrade = {
  tier: 1 | 2 | 3;
  costMultiplier: number;
  productionMultiplier: number;
  requiredLevel: number;
};
```

---

## 9. Game State Structure

```typescript
interface GameState {
  // Identity
  colonistId: number;
  colonistLevel: number;
  experience: number;

  // Currencies
  helium3: Decimal;
  solarPower: Decimal;
  coins: number;

  // Resources
  inventory: Partial<Record<ResourceName, Decimal>>;

  // Land & Buildings
  gridSize: number;
  buildings: Partial<Record<BuildingId, PlacedBuilding>>;
  plots: Record<PlotId, PlotState>;

  // Production State
  productionQueues: Partial<Record<BuildingId, ProductionQueueItem[]>>;

  // Colony
  colonists: number;
  oxygenCapacity: number;
  oxygenLevel: Decimal;

  // Progression
  unlocks: string[];          // Unlocked building types
  achievements: string[];     // Completed achievements
  milestones: Milestone[];    // Major progression points

  // Meta
  lastLoginAt: number;
  totalPlayTime: number;
  createdAt: number;
}

type PlotState = {
  id: PlotId;
  type: "empty" | "ice_node" | "regolith_deposit" | "mine_shaft" | "building";
  buildingId?: BuildingId;
  resourceLevel?: number;     // Depletion/rgeneration state
};

type PlacedBuilding = {
  id: BuildingId;
  name: BuildingName;
  position: { x: number; y: number };
  tier: 1 | 2 | 3;
  efficiency: number;        // 0.5 to 1.5 based on power/status
  createdAt: number;
};
```

---

## 10. Idle Mechanics

### 10.1 Offline Production

When player returns after being away:
- All buildings continue producing
- Maximum offline time: 8 hours
- Visual indicator shows "missed" resources

```typescript
function calculateOfflineProduction(
  lastLogin: number,
  currentTime: number,
  game: GameState
): Partial<Record<ResourceName, Decimal>> {
  const OFFLINE_CAP_SECONDS = 8 * 60 * 60;
  const offlineSeconds = Math.min(
    currentTime - lastLogin,
    OFFLINE_CAP_SECONDS
  );

  // Calculate per-building production
  // Sum all active buildings
  // Return accumulated resources
}
```

### 10.2 Auto-Extraction

Ice Drill and Regolith Processor auto-harvest:
- No click required
- Rate depends on building tier and power supply
- Visual: continuous particle effect when active

---

## 11. UI/UX Overview

### 11.1 Main View

```
+------------------------------------------+
|  [He-3: 1,234]  [Power: 85%]  [Lv.5]     |  <- Status Bar
+------------------------------------------+
|                                          |
|     [6x6 COLONY GRID - Scrollable]       |
|                                          |
|   [Ice Node] [Ice Node] [Building]       |
|   [Regolith] [Building] [Empty]           |
|   [Solar]    [Building] [Empty]           |
|                                          |
+------------------------------------------+
|  [Build]  [Inventory]  [Tech]  [Shop]    |  <- Navigation
+------------------------------------------+
```

### 11.2 Building Panel

When building selected:
- Current production/consumption stats
- Upgrade button (if available)
- Power toggle
- Demolish option

### 11.3 Color Palette (Lunar Theme)

| Element | Color | Hex |
|---------|-------|-----|
| Background (Moon) | Dark Gray | #1a1a2e |
| Surface (UI) | Charcoal | #2d2d44 |
| Primary (Ice) | Cyan | #00d4ff |
| Secondary (Energy) | Yellow | #ffd700 |
| Accent (Helium-3) | Purple | #9d4edd |
| Success | Green | #00ff88 |
| Warning | Orange | #ff8c00 |
| Text Primary | White | #ffffff |
| Text Secondary | Gray | #a0a0a0 |

---

## 12. MVP Scope Definition

### MVP Features (Phase 1)

**Must Have:**
1. Grid-based colony with 6x6 starting size
2. Ice and Regolith resource nodes (clickable)
3. 5 buildings: Solar Array, Water Extractor, Ice Drill, Greenhouse, Habitat Module
4. Basic production chains: Ice -> Water Ice -> Oxygen, Ice + Regolith -> Crops
5. Helium-3 currency and basic economy
6. Building construction with materials
7. Idle production (auto-extractors)
8. Offline progress (8 hour cap)
9. Save/Load game state

**Nice to Have (Post-MVP):**
- Full upgrade system (Tier 2/3)
- Land expansion mechanics
- Deep Core Mine and Gold resources
- Fusion Reactor
- Landing Pad and Earth trade
- Colonist leveling

### MVP Target
- Single HTML page with React
- LocalStorage persistence
- 10-15 minute core session
- Single resource chain demonstration

---

## 13. Technical Notes

### 13.1 State Management
- Use React Context for global game state
- Decimal.js for all currency/resource calculations
- Immutable updates with useReducer

### 13.2 Game Loop
- 1-second tick for production calculations
- 100ms tick for UI animations
- requestAnimationFrame for smooth rendering

### 13.3 Save System
- Auto-save every 30 seconds
- Save on every significant action (building, crafting)
- LocalStorage with JSON serialization

---

## 14. Formulas

### 14.1 Production Rate
```typescript
function calculateProduction(
  baseRate: number,
  buildingTier: number,
  efficiency: number,
  powerMultiplier: number
): number {
  return baseRate * buildingTier * efficiency * powerMultiplier;
}
```

### 14.2 Offline Production
```typescript
function calculateOfflineYield(
  secondsOffline: number,
  productionRate: number,
  consumptionRate: number
): Decimal {
  const netRate = productionRate - consumptionRate;
  const grossProduction = productionRate * secondsOffline;
  const grossConsumption = consumptionRate * secondsOffline;

  // Cap at storage limits
  return Decimal.max(grossProduction - grossConsumption, 0);
}
```

### 14.3 Building Cost Scaling
```typescript
function calculateBuildingCost(
  baseCost: Partial<Record<ResourceName, number>>,
  tier: number,
  existingCount: number
): Partial<Record<ResourceName, number>> {
  const scaleFactor = Math.pow(1.15, existingCount);
  const tierMultiplier = tier === 1 ? 1 : tier === 2 ? 1.5 : 2;

  return Object.fromEntries(
    Object.entries(baseCost).map(([resource, amount]) => [
      resource,
      Math.floor(amount * scaleFactor * tierMultiplier),
    ])
  );
}
```

---

## 15. Edge Cases

### 15.1 Power Outage
If Solar Power drops to 0:
- All production stops immediately
- Oxygen slowly depletes
- After 60 seconds without power: "Blackout" warning
- After 5 minutes: Production queues pause (don't delete)

### 15.2 Oxygen Depletion
If Oxygen reaches 0:
- Crop production stops
- Colonist happiness drops
- No game over (mercy mechanic), but strong penalty

### 15.3 Resource Cap
Each resource has a storage cap:
- Base storage: 1000 units
- Expandable via Food Storage / Battery Bank
- Overflow is lost (incentivizes spending)

### 15.4 Building Placement
- Cannot overlap buildings
- Must have power connection (adjacent to Solar Array or Battery)
- Cannot place on resource nodes

---

## 16. Acceptance Criteria

### 16.1 Functional Criteria
- [ ] Player can click Ice nodes to collect Ice
- [ ] Player can click Regolith nodes to collect Regolith
- [ ] Player can build Solar Array and it produces Solar Power
- [ ] Player can build Water Extractor and convert Ice to Water Ice
- [ ] Player can build Greenhouse and grow Lunar Wheat
- [ ] Helium-3 currency is earned from selling crops
- [ ] Buildings consume Solar Power and produce resources
- [ ] Game state persists across page refreshes
- [ ] Offline production is calculated on return

### 16.2 Experiential Criteria
- [ ] Clicking resource nodes feels satisfying (visual feedback)
- [ ] Production chains are intuitive to understand
- [ ] Player understands what to do next (clear UI hints)
- [ ] Game feels "lunar" and atmospheric
- [ ] Idle mechanics provide passive satisfaction
- [ ] Session has clear beginning, middle, and end

### 16.3 Performance Criteria
- [ ] Page loads in under 3 seconds
- [ ] 60 FPS during normal gameplay
- [ ] No memory leaks from game loop
- [ ] Save/Load completes in under 500ms

---

## 17. Dependencies

### External Libraries
- **Decimal.js**: Precise currency calculations
- **React**: UI framework (MVP scope)
- **Zustand or Context API**: State management

### Internal Systems
- Game state manager (core)
- Resource calculation engine
- Building placement system
- Save/Load persistence
- Production queue manager

---

## 18. Tuning Knobs

### Core Balance Values
| Parameter | Default | Range | Description |
|-----------|---------|-------|-------------|
| `SOLAR_ARRAY_OUTPUT` | 1 | 0.5-2 | Solar Power per tick |
| `ICE_DRILL_OUTPUT` | 1 | 0.5-3 | Ice per tick |
| `EXTRACTOR_CONVERSION_RATIO` | 1 | 0.5-2 | Ice to Water Ice ratio |
| `OXYGEN_CONSUMPTION_RATE` | 0.1 | 0.01-0.5 | Oxygen used per colonist |
| `OFFLINE_CAP_HOURS` | 8 | 1-24 | Max offline production |
| `STORAGE_BASE_CAP` | 1000 | 500-5000 | Base resource storage |
| `BUILDING_COST_SCALE` | 1.15 | 1.05-1.3 | Exponential cost growth |

---

*Document Version: 1.0*
*Created: 2026-03-28*
*Status: Initial Draft*
