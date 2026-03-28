# ICE DRILL - Economy Design Document

## Table of Contents

1. [Overview](#1-overview)
2. [Player Fantasy](#2-player-fantasy)
3. [Detailed Rules](#3-detailed-rules)
4. [Formulas](#4-formulas)
5. [Edge Cases](#5-edge-cases)
6. [Dependencies](#6-dependencies)
7. [Tuning Knobs](#7-tuning-knobs)
8. [Acceptance Criteria](#8-acceptance-criteria)

---

## 1. Overview

### 1.1 Document Purpose

This document defines the complete economic system of ICE DRILL, an idle/incremental lunar colonization game. It specifies all resource flows, currency mechanics, reward structures, progression curves, and economic health metrics. The economy is designed to support 4 distinct gameplay phases spanning 5+ hours of content with no inflation, no degenerate strategies, and satisfying long-term engagement.

The economy serves as the foundation for all player decisions, from simple "click or wait" choices in early game to complex multi-chain optimizations in late game. Every resource, currency, and building has a defined purpose in the economic ecosystem.

### 1.2 Economic Philosophy

ICE DRILL's economy follows a **leaky bucket model** where resources constantly flow out through consumption, requiring active management to maintain production chains. This creates continuous player engagement without allowing infinite accumulation that would trivialize content.

**Core Principles:**

- **Scarcity-Driven Play**: Every resource has sinks that match or exceed sources
- **Progressive Complexity**: Later phases introduce more currencies and chains
- **Zero-Sum Power**: Energy production must balance consumption
- **Time-Value of Resources**: Stored resources cap to prevent hoarding
- **Prestige Equilibrium**: Prestige resets create economic cycles

**Design Theory Alignment:**

- **Self-Determination Theory (SDT)**: The economy supports competence (optimization), autonomy (strategic choices), and relatedness (colony growth)
- **MDA Framework**: Mechanics create the fantasy of lunar colonization; aesthetics reinforce the isolation and beauty of space
- **Bartle's Player Types**: Achievers (progression), Explorers (discovery), Managers (optimization)

### 1.3 Economy Summary Table

| Element | Description |
|---------|-------------|
| **Primary Currency** | Helium-3 (He-3) - Rare, premium, earned through late-game activities |
| **Energy Currency** | Solar Power - Generated passively, consumed by buildings |
| **Legacy Currency** | Coins - Earned from selling resources, used for early purchases |
| **Resource Tiers** | 3 tiers (Raw, Processed, Advanced) with 12+ resources |
| **Economic Phases** | 4 phases matching gameplay progression |
| **Sink Mechanisms** | Building costs, upgrades, land expansion, consumption |
| **Prestige System** | Reset with permanent multipliers |

### 1.4 Design Goals

**Quantitative Goals:**

- Early game session: 10-15 minutes for meaningful progress
- Mid game session: 30-60 minutes for optimization
- Late game session: 60+ minutes with passive observation
- Total playtime to "complete": 20-30 hours across multiple prestige cycles

**Qualitative Goals:**

- No "dead ends" where player is stuck
- No dominant strategies that invalidate choices
- Clear feedback on economic health
- Satisfying progression curve with milestones

---

## 2. Player Fantasy

### 2.1 Fantasy Archetypes

ICE DRILL's economy supports three primary player fantasies aligned with Bartle's player types and SDT needs:

**Conqueror Fantasy (Achievers)**

- Progression through resource accumulation and building construction
- Satisfaction from optimizing production chains
- Endgame goals: Level 10, all expansions, prestige bonuses
- Economic hook: "I need more Helium-3 to unlock the next tier"

**Explorer Fantasy (Explorers)**

- Discovery of new resource types and building combinations
- Experimentation with different production setups
- Unlocking new game mechanics and content
- Economic hook: "What happens if I chain these buildings differently?"

**Manager Fantasy (Socializers/Economists)**

- Long-term optimization and efficiency mastery
- Planning for offline production and prestige runs
- Trading and resource allocation decisions
- Economic hook: "How do I maximize He-3/minute?"

### 2.2 Emotional Journey Through Economy

**Phase 1 (0-30 min): Abundance and Discovery**

The player starts with free resources from clicking. The economy feels generous - clicking produces instant rewards, and building the first Solar Array feels like unlocking unlimited power. The emotional tone is **abundance** and **competence building**.

Early game rewards are immediate and tangible. Every click gives feedback. Every building constructed is a visible testament to progress. The player learns that resources are valuable but plentiful - the moon is generous to its first pioneers.

**Phase 2 (30min-2h): Scarcity and Strategy**

As buildings consume Solar Power, the player experiences their first energy shortages. The transition from "click for everything" to "manage automated systems" creates mild **tension**. Successfully balancing production chains produces **satisfaction** and **mastery**.

The player discovers that resources are interconnected. Water Ice requires Ice. Oxygen requires Water Ice. Crops require Water Ice. Every chain has dependencies, and managing those dependencies becomes the core challenge. The player begins to think systemically.

**Phase 3 (2-5h): Complexity and Optimization**

Multiple currencies and chains interact. The player must think in ratios and efficiencies. Helium-3 becomes precious. The emotional tone shifts to **strategic planning** and **problem-solving**. Every optimization feels earned.

The player tracks metrics: Ice per minute, Water Ice per minute, Oxygen consumption rate, Solar Power balance. They identify bottlenecks and fix them. They upgrade buildings for efficiency. The game becomes a optimization puzzle with visible metrics.

**Phase 4 (5h+): Mastery and Prestige**

The colony runs largely autonomously. The player becomes a spectator of their own system, making occasional adjustments. The emotional tone is **accomplishment** and **completion**. Prestige provides **renewal** and **progression**.

The player has built something impressive. The colony hums along, producing resources, earning Helium-3, growing. But there's more to do - prestige offers a fresh start with permanent bonuses. The cycle continues, each prestige making the next easier.

### 2.3 Reward Schedule Psychology

ICE DRILL uses variable ratio reinforcement schedules to maintain engagement:

| Activity | Schedule Type | Example | Psychological Effect |
|----------|---------------|---------|----------------------|
| Clicking nodes | Fixed Ratio | Every click gives reward | Consistent satisfaction |
| Building production | Variable Ratio | Random timing within cycle | Anticipation, checking behavior |
| Level up | Step Ladder | Major unlocks at thresholds | Milestone achievement |
| Helium-3 income | Variable Interval | Random He-3 from crops | Checking behavior, surprise bonuses |
| Prestige | Rare Event | Level 10 only | High emotional impact, strategic planning |

**Neurochemistry Alignment:**

- Dopamine (anticipation): Checking production timers, waiting for completions
- Serotonin (accomplishment): Building completion, level ups
- Oxytocin (bonding): Colony growth, visual progress
- Endorphins (pleasure): Satisfying number growth, optimization discoveries

### 2.4 Player Motivation Matrix

| Player Type | Primary Motivation | Economic Hook | Session Length |
|-------------|-------------------|---------------|----------------|
| Casual | Relaxation | Quick resource gains | 5-15 min |
| Achiever | Progression | Efficiency metrics | 30-60 min |
| Optimizer | Mastery | Perfect chains | 60+ min |
| Explorer | Discovery | New content unlocks | Variable |

---

## 3. Detailed Rules

### 3.1 Resource Flow Architecture

#### 3.1.1 Faucet Types (Resource Sources)

**Click-Based Faucets (Manual)**

| Resource | Source | Rate | Click Value | Max Rate |
|----------|--------|------|-------------|----------|
| Ice | Ice Nodes | 1/click | 1 | 60/min (rapid clicking) |
| Regolith | Regolith Nodes | 1/click | 1 | 60/min (rapid clicking) |

Click-based faucets are intentionally limited to prevent botting and keep the game as an idle experience. The "rapid clicking" rate assumes a human player actively clicking, not an automated script.

**Building-Based Faucets (Automated)**

| Building | Resource | Base Rate | Tier Multiplier | Max (T3) |
|----------|----------|-----------|-----------------|----------|
| Solar Array | Solar Power | 1/5s | 1x/2x/4x | 4/5s |
| Ice Drill | Ice | 1/5s | 1x/2x/4x | 4/5s |
| Water Extractor | Water Ice | 1/10s | 1x/2x/4x | 4/10s |
| Oxygen Generator | Oxygen | 1/15s | 1x/2x/4x | 4/15s |
| Ore Processor | Iron | 1/20s | 1x/2x/4x | 4/20s |
| Deep Core Mine | Gold | 1/60s | 1x/2x/4x | 4/60s |
| Deep Core Mine | Rare Metal | 1/120s | 1x/2x/4x | 4/120s |
| Greenhouse | Lunar Wheat | 1/60s | 1x/2x/4x | 4/60s |
| Hydroponic Bay | Crop Speed | 2x | N/A | 2x per crop |
| Fusion Reactor | Solar Power | 10/5s | N/A | Requires He-3 |

**Currency Faucets**

| Currency | Source | Rate Formula |
|----------|--------|--------------|
| Coins | Selling Tier 1 resources | 1-3 per resource |
| Helium-3 | Selling Lunar Wheat | 5 base * prestige multiplier |
| Helium-3 | Deep Core Mine (rare) | 1/300s average |
| Helium-3 | Landing Pad trade | Variable by trade cycle |

#### 3.1.2 Sink Types (Resource Drains)

**Consumption Sinks (Active Drains)**

| Consumer | Input | Rate | Condition |
|----------|-------|------|-----------|
| Water Extractor | Ice | 1/10s | Running |
| Water Extractor | Solar Power | 1/10s | Running |
| Ice Drill | Solar Power | 1/5s | Running |
| Oxygen Generator | Water Ice | 1/15s | Running |
| Oxygen Generator | Solar Power | 1/15s | Running |
| Ore Processor | Regolith | 1/20s | Running |
| Ore Processor | Solar Power | 2/20s | Running |
| Deep Core Mine | Solar Power | 5/60s | Running |
| Fusion Reactor | Helium-3 | 1/30s | Running |
| Colonists | Oxygen | 0.1/s each | Always |

**Cost Sinks (One-Time Drains)**

| Category | Resource Type | Scaling |
|----------|---------------|---------|
| Building Construction | Tier 1-3 resources | 1.15^n per owned |
| Building Upgrades | Same as construction | Tier multiplier |
| Land Expansion | Helium-3 | 10/25/50/100 |
| Colonist Housing | Iron, Water Ice | Per colonist capacity |

**Waste Sinks (Passive Losses)**

| Condition | Waste Type | Rate |
|-----------|-------------|------|
| Storage full | Overflow resources | Lost on next production |
| Blackout | Production halted | Opportunity cost |
| Offline > 8h | Excess production | Capped at 8 hours |
| Oxygen depletion | Crop halt | No production while depleted |

### 3.2 Currency System

#### 3.2.1 Helium-3 (Primary Currency)

Helium-3 is the rarest and most valuable currency, representing the ultimate goal of lunar colonization. It is scarce by design to make every acquisition feel meaningful.

**Acquisition Methods:**

1. **Selling Lunar Wheat** (primary method)
   - Base: 5 He-3 per Lunar Wheat
   - Requires Greenhouse + Water Ice supply
   - Steady income once chain is established

2. **Deep Core Mine** (secondary method)
   - Average: 1 He-3 per 300 seconds
   - Requires Gold extraction chain
   - Passive but very slow

3. **Landing Pad Trades** (endgame method)
   - Variable returns based on trade routes
   - 100-500 He-3 per successful trade
   - 5-minute trade cycle

4. **Prestige Bonus** (multiplier)
   - +0.1 He-3 multiplier per prestige
   - Applies to ALL He-3 sources
   - Permanent bonus after reset

**Usage Sinks:**

| Use | Cost | Priority |
|-----|------|----------|
| Land Expansion 1 | 10 He-3 | Early priority |
| Land Expansion 2 | 25 He-3 | Mid priority |
| Land Expansion 3 | 50 He-3 | Late priority |
| Land Expansion 4 | 100 He-3 | Endgame priority |
| Fusion Reactor fuel | 1 He-3/30s | Optional endgame |
| Prestige reset | Free | Always available |

**Exchange Rate:**

- 1 Helium-3 = 1000 Solar Power (when converting for Fusion Reactor)
- No direct Coin-to-He-3 conversion (prevents pay-to-win)

#### 3.2.2 Solar Power (Energy Currency)

Solar Power is the operational energy that enables all production. It is generated passively and consumed actively. Unlike Helium-3, it is plentiful but requires active management.

**Generation Sources:**

| Source | Rate | Condition |
|--------|------|-----------|
| Solar Array (T1) | 1/5s | Always in daylight |
| Solar Array (T2) | 2/5s | Always |
| Solar Array (T3) | 4/5s | Always |
| Fusion Reactor | 10/5s | Consumes He-3 |

**Consumption Rates:**

| Building | Consumption | Net (with T1 Solar) |
|----------|-------------|---------------------|
| Water Extractor | 1/10s | -0.5/s (net loss) |
| Ice Drill | 1/5s | 0/s (break even) |
| Oxygen Generator | 1/15s | -0.4/s (net loss) |
| Ore Processor | 2/20s | -0.05/s (slight loss) |
| Deep Core Mine | 5/60s | -0.58/s (net loss) |

**Balance Philosophy:**

Early game buildings should break even or slightly lose power, requiring the player to build more Solar Arrays. This creates strategic decisions about power allocation rather than "build one and forget."

**Storage:**

- Base storage: 500 Solar Power
- Battery Bank: +500 per tier
- Overflow is lost (not stored)

#### 3.2.3 Coins (Legacy Currency)

Coins are the entry-level currency, earned from selling raw resources. They provide an accessible income source for new players.

**Acquisition:**

| Resource | Sell Price |
|----------|------------|
| Ice | 1 coin |
| Regolith | 1 coin |
| Water Ice | 3 coins |
| Lunar Wheat | 5 coins |
| Iron | 10 coins |
| Gold | 50 coins |

**Usage:**

- Early game purchases (before Helium-3 economy)
- Cosmetic items (future feature)
- No pay-to-win advantages

### 3.3 Production Chain Economics

#### 3.3.1 Tier 1: Foundation Chain

```
Click Ice Node -> Ice (free, unlimited clicking)
Click Regolith Node -> Regolith (free, unlimited clicking)

Ice + Solar Power -> Water Extractor -> Water Ice
Regolith + Solar Power -> Ore Processor -> Iron
```

**Economic Analysis:**

- Clicking is "free" energy from player
- Water Extractor: 1 Ice -> 0.1 Water Ice/s
- Ore Processor: 1 Regolith -> 0.05 Iron/s
- Early game is about building clicking into automation

#### 3.3.2 Tier 2: Life Support Chain

```
Water Ice + Solar Power -> Oxygen Generator -> Oxygen
Water Ice + Seeds -> Greenhouse -> Lunar Wheat
Lunar Wheat -> Sell -> Helium-3
```

**Economic Analysis:**

- Oxygen Generator: 1 Water Ice -> 0.067 Oxygen/s
- Oxygen consumed by colonists (0.1/s each)
- Net oxygen balance depends on colonist count
- Greenhouse: 1 Water Ice -> 1 Lunar Wheat/60s
- Lunar Wheat: 5 He-3 per sale

**Critical Ratio:**

- 1 Oxygen Generator supports ~0.67 colonists
- 1 Greenhouse requires water ice supply

#### 3.3.3 Tier 3: Premium Economy Chain

```
Iron + Solar Power -> Deep Core Mine -> Gold + Rare Metal
Gold + Rare Metal -> Fusion Lab -> Dark Matter
Dark Matter -> Prestige Multipliers
```

**Economic Analysis:**

- Deep Core Mine: 5/s Solar Power -> 1 Gold/60s
- Gold is primarily for building Tier 3 structures
- Rare Metal is scarce (1/120s)
- Dark Matter enables prestige bonuses

### 3.4 Loot and Reward Tables

#### 3.4.1 Achievement Rewards

| Achievement | Condition | Reward |
|-------------|-----------|--------|
| First Click | Collect 1 Ice | +10 coins |
| Self-Sufficient | Build 3 Solar Arrays | +50 coins |
| Water World | Produce 100 Water Ice | +1 He-3 |
| Breath of Fresh Air | Produce 50 Oxygen | +2 He-3 |
| Green Thumb | Harvest 25 Lunar Wheat | +3 He-3 |
| Iron Will | Produce 100 Iron | +5 He-3 |
| Gold Rush | Extract 25 Gold | +10 He-3 |
| Master Colonist | Reach Level 10 | +50 He-3 |

#### 3.4.2 Milestone Bonuses

| Milestone | Requirement | Bonus |
|-----------|-------------|-------|
| Colony Starter | 5 buildings placed | 1.1x production for 1 hour |
| Power Hog | 10 Solar Arrays | +200 Solar Power storage |
| Land Baron | First expansion | +5 He-3 |
| Trade Master | First Landing Pad trade | 2x He-3 for 1 day |
| Prestige Novice | First prestige | +0.1 permanent He-3 mult |

#### 3.4.3 Random Events (Future Feature)

| Event | Probability | Effect | Duration |
|-------|-------------|--------|----------|
| Solar Flare | 2% per hour | 2x Solar Power | 5 minutes |
| Meteor Shower | 1% per hour | +50 random resources | Instant |
| Trade Ship | Every 30 min | Option to sell for 2x | One-time |

### 3.5 Inflation Prevention

#### 3.5.1 Resource Caps

Every resource has a maximum storage capacity. This creates urgency to use resources rather than hoard them.

| Resource | Base Cap | Expansion Method |
|----------|----------|------------------|
| Ice | 1000 | N/A (early game) |
| Regolith | 1000 | N/A (early game) |
| Water Ice | 500 | +250 per Storage |
| Solar Power | 500 | +500 per Battery |
| Oxygen | 200 | +100 per Life Support |
| Iron | 500 | +250 per Storage |
| Gold | 100 | Not expandable |
| Helium-3 | Unlimited | N/A (endgame goal) |

**Overflow Behavior:**

- When storage is full, production continues but excess is **lost**
- Visual indicator (red pulse) warns player
- Notification: "[Resource] storage full!"

#### 3.5.2 Exponential Cost Scaling

Building costs increase exponentially to prevent "rush strategies" where player builds 50 of one building. This encourages diversification of production chains.

```
cost = baseCost * (1.15 ^ ownedCount) * tierMultiplier
```

| Buildings Owned | Cost Multiplier | Effective Growth |
|----------------|-----------------|------------------|
| 0 | 1.00x | Base |
| 5 | 2.01x | +100% |
| 10 | 4.05x | +300% |
| 15 | 8.18x | +700% |
| 20 | 16.50x | +1550% |

#### 3.5.3 Prestige Reset

At Level 10, player can prestige. This provides a "hard reset" that prevents infinite accumulation while giving permanent bonuses.

**Reset Contents:**

- All resources (except Helium-3 and achievements)
- All buildings
- All colonists
- Grid expansion (keeps base 6x6)

**Kept Contents:**

- Helium-3 (with prestige bonus applied)
- Achievements
- Permanent upgrades
- Colony level (reset to 1, but XP curve unchanged)

**Prestige Bonuses:**

- +0.1 Helium-3 multiplier per prestige
- +5% production speed per prestige
- Starting resources increase slightly

---

## 4. Formulas

### 4.1 Production Rate Formula

```typescript
function calculateProduction(
  baseRate: number,           // Base output per interval
  tier: 1 | 2 | 3,            // Building upgrade tier
  efficiency: number,          // 0.5 to 1.5 (affected by power/colonists)
  powerMultiplier: number,    // 0 if insufficient power, 1 if powered
  upgradeMultiplier: number    // From permanent upgrades
): number {
  // Tier multipliers: T1=1x, T2=2x, T3=4x
  const tierMultiplier = tier === 1 ? 1 : tier === 2 ? 2 : 4;

  // Calculate final rate
  const rate = baseRate * tierMultiplier * efficiency * powerMultiplier * upgradeMultiplier;

  return Math.max(0, rate); // Prevent negative rates
}

// Example: Tier 2 Water Extractor with full power
// baseRate = 0.1 (1 per 10s), tier = 2, efficiency = 1.0, powerMultiplier = 1.0
// rate = 0.1 * 2 * 1.0 * 1.0 = 0.2 Water Ice/s (2 per 10s)
```

**Variable Definitions:**

| Variable | Range | Source |
|----------|-------|--------|
| baseRate | Per building | Building definition |
| tier | 1, 2, 3 | Upgrade level |
| efficiency | 0.5 - 1.5 | Colony conditions |
| powerMultiplier | 0 or 1 | Solar Power balance |
| upgradeMultiplier | 1.0+ | Prestige bonuses |

### 4.2 Net Energy Formula

```typescript
interface EnergyStatus {
  grossProduction: number;    // Total Solar Power/s generated
  grossConsumption: number;   // Total Solar Power/s consumed
  netRate: number;             // Production - Consumption
  storagePercent: number;     // Current / Max capacity
  isBlackout: boolean;        // true if netRate < 0 and storage = 0
}

function calculateNetEnergy(
  buildings: PlacedBuilding[],
  batteryStorage: number,
  currentStored: number
): EnergyStatus {
  let grossProduction = 0;
  let grossConsumption = 0;

  for (const building of buildings) {
    if (!building.producing) continue;

    // Production adds to gross
    if (building.produces?.resource === 'Solar Power') {
      grossProduction += building.produces.amount / building.productionTime;
    }

    // Consumption subtracts from gross
    if (building.consumes?.resource === 'Solar Power') {
      grossConsumption += building.consumes.amount / building.consumptionTime;
    }
  }

  const netRate = grossProduction - grossConsumption;
  const maxStorage = 500 + (batteryStorage * 500);
  const storagePercent = Math.min(100, (currentStored / maxStorage) * 100);
  const isBlackout = netRate < 0 && currentStored <= 0;

  return { grossProduction, grossConsumption, netRate, storagePercent, isBlackout };
}

// Example: 2 Solar Arrays, 1 Water Extractor, 1 Ice Drill
// grossProduction = 2 * (1/5) + 0 = 0.4/s
// grossConsumption = 1 * (1/10) + 1 * (1/5) = 0.1 + 0.2 = 0.3/s
// netRate = 0.4 - 0.3 = 0.1/s (positive = energy surplus)
```

### 4.3 Building Cost Formula

```typescript
function calculateBuildingCost(
  baseCost: Partial<Record<ResourceName, number>>,
  tier: 1 | 2 | 3,
  existingCount: number,
  prestigeMultiplier: number = 1.0
): Partial<Record<ResourceName, number>> {
  // Exponential scaling: 1.15^existingCount
  const scaleFactor = Math.pow(1.15, existingCount);

  // Tier multipliers: T1=1x, T2=1.5x, T3=2x
  const tierMultiplier = tier === 1 ? 1 : tier === 2 ? 1.5 : 2;

  // Apply prestige bonus (reduces costs)
  const prestigeDivisor = 1 + (prestigeMultiplier - 1);

  const result: Partial<Record<ResourceName, number>> = {};

  for (const [resource, amount] of Object.entries(baseCost)) {
    const scaledCost = Math.floor(
      amount * scaleFactor * tierMultiplier / prestigeDivisor
    );
    result[resource as ResourceName] = scaledCost;
  }

  return result;
}

// Example: Water Extractor (base: 20 Ice, 10 Regolith)
// After 3 built, Tier 1
// scaleFactor = 1.15^3 = 1.5209
// tierMultiplier = 1
// cost = 20 * 1.5209 = 31 Ice, 10 * 1.5209 = 16 Regolith
```

### 4.4 Helium-3 Income Formula

```typescript
interface He3Income {
  fromCrops: Decimal;         // Lunar Wheat sales
  fromDeepCore: Decimal;       // Direct extraction
  fromTrades: Decimal;        // Landing Pad trades
  total: Decimal;             // Sum of all sources
  perMinute: Decimal;         // Normalized to /minute
}

function calculateHe3Income(
  gameState: GameState,
  prestigeBonus: number        // 1.0 + (prestigeCount * 0.1)
): He3Income {
  // From crops: 5 He-3 per Lunar Wheat sold
  const wheatCount = gameState.inventory['Lunar Wheat'] || 0;
  const fromCrops = new Decimal(wheatCount).times(5).times(prestigeBonus);

  // From Deep Core Mine: 1/300s average, requires building
  const deepCoreCount = Object.values(gameState.buildings)
    .flat()
    .filter(b => b.type === 'DeepCoreMine' && b.producing).length;
  const fromDeepCore = new Decimal(deepCoreCount)
    .times(1 / 300)
    .times(60)  // Per minute
    .times(prestigeBonus);

  // From trades: Variable, handled separately
  const fromTrades = calculateTradeIncome(gameState);

  const total = fromCrops.plus(fromDeepCore).plus(fromTrades);
  const perMinute = total; // Already normalized

  return { fromCrops, fromDeepCore, fromTrades, total, perMinute };
}

// Example: 10 Lunar Wheat in inventory, prestige count = 3 (1.3x bonus)
// fromCrops = 10 * 5 * 1.3 = 65 He-3
// prestigeBonus = 1.0 + (3 * 0.1) = 1.3
```

### 4.5 XP and Level Formula

```typescript
const XP_PER_LEVEL: Record<number, number> = {
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
  // Formula: XP[n] = XP[n-1] * 2 for n > 10
};

function calculateLevel(totalXP: number): number {
  let level = 1;
  let cumulativeXP = 0;

  while (level < 100) {
    const nextLevelXP = XP_PER_LEVEL[level + 1] || XP_PER_LEVEL[level] * 2;
    if (cumulativeXP + nextLevelXP > totalXP) break;
    cumulativeXP += nextLevelXP;
    level++;
  }

  return level;
}

function getXPForNextLevel(currentLevel: number): number {
  return XP_PER_LEVEL[currentLevel + 1] || XP_PER_LEVEL[currentLevel] * 2;
}

function getXPProgress(totalXP: number): { current: number; needed: number; percent: number } {
  const level = calculateLevel(totalXP);
  const currentLevelXP = XP_PER_LEVEL[level];
  const nextLevelXP = getXPForNextLevel(level);
  const progress = totalXP - currentLevelXP;
  const needed = nextLevelXP - currentLevelXP;

  return {
    current: progress,
    needed: needed,
    percent: Math.min(100, (progress / needed) * 100)
  };
}

// Example: 1500 total XP
// Level 5 requires 1000 XP, Level 6 requires 2000 XP
// Progress: 1500 - 1000 = 500 / (2000 - 1000) = 50%
```

### 4.6 XP Gain Formula

```typescript
interface XPGain {
  source: string;
  amount: number;
  breakdown: Record<string, number>;
}

function calculateXPGain(
  action: string,
  baseAmount: number,
  multipliers: {
    buildingBonus: number;    // From building upgrades
    achievementBonus: number;  // From achievements
    prestigeSpeed: number;     // From prestige
  }
): XPGain {
  const multipliers = Object.values(multipliers).reduce((a, b) => a * b, 1);

  // XP sources with base values
  const XP_TABLE: Record<string, number> = {
    'click_ice': 1,
    'click_regolith': 1,
    'harvest_building': 10,
    'build_building': 25,
    'upgrade_building': 50,
    'harvest_crop': 5,
    'complete_milestone': 100,
    'level_up': 500,
  };

  const baseXP = XP_TABLE[action] || baseAmount;
  const finalXP = Math.floor(baseXP * multipliers);

  return {
    source: action,
    amount: finalXP,
    breakdown: {
      base: baseXP,
      buildingBonus: multipliers.buildingBonus,
      achievementBonus: multipliers.achievementBonus,
      prestigeSpeed: multipliers.prestigeSpeed,
      final: finalXP
    }
  };
}

// Example: Building a Water Extractor with 1.1 building bonus, 1.0 others
// baseXP = 25 (build_building)
// multipliers = 1.1 * 1.0 * 1.0 = 1.1
// finalXP = floor(25 * 1.1) = 27
```

### 4.7 Offline Production Formula

```typescript
interface OfflineYield {
  resources: Partial<Record<ResourceName, Decimal>>;
  missedResources: Partial<Record<ResourceName, Decimal>>;
  capReason: 'time' | 'storage' | 'none';
  cappedHours: number;
}

function calculateOfflineProduction(
  lastLogin: number,
  currentTime: number,
  gameState: GameState
): OfflineYield {
  const MAX_OFFLINE_SECONDS = 8 * 60 * 60; // 8 hours
  const offlineSeconds = Math.min(
    currentTime - lastLogin,
    MAX_OFFLINE_SECONDS
  );

  const capped = currentTime - lastLogin > MAX_OFFLINE_SECONDS;

  const resources: Partial<Record<ResourceName, Decimal>> = {};
  const missedResources: Partial<Record<ResourceName, Decimal>> = {};

  for (const [buildingId, building] of Object.entries(gameState.buildings)) {
    if (!building.producing) continue;

    // Calculate production for offline period
    const productionRate = calculateProduction(
      building.produces?.amount || 0,
      building.tier,
      building.efficiency,
      1, // Assume powered
      gameState.prestigeBonus?.productionSpeed || 1
    ) / building.productionTime;

    const consumptionRate = building.consumes
      ? building.consumes.amount / building.consumptionTime
      : 0;

    const netRate = productionRate - consumptionRate;
    const maxStorage = getStorageCap(building.produces?.resource || 'Unknown');

    // Calculate total production
    const totalProduction = productionRate * offlineSeconds;
    const totalConsumption = consumptionRate * offlineSeconds;
    const netYield = Math.max(0, totalProduction - totalConsumption);

    // Cap at storage
    const actualYield = Decimal.min(netYield, maxStorage);

    // Calculate missed resources (above cap)
    const missed = Decimal.max(netYield - maxStorage, 0);

    // Add to results
    const resource = building.produces?.resource;
    if (resource) {
      resources[resource] = (resources[resource] || new Decimal(0)).plus(actualYield);
      missedResources[resource] = missed;
    }
  }

  return {
    resources,
    missedResources,
    capReason: capped ? 'time' : 'none',
    cappedHours: capped ? 8 : (currentTime - lastLogin) / 3600
  };
}

// Example: 10 hours offline, 2 Ice Drills running
// MAX_OFFLINE_SECONDS = 28800 (8 hours)
// offlineSeconds = 28800
// 2 Ice Drills: 2 * (1/5) * 28800 = 11520 Ice produced
// Storage cap: 1000
// Actual yield: min(11520, 1000) = 1000 Ice
// Missed: 11520 - 1000 = 10520 Ice
```

### 4.8 Prestige Bonus Formula

```typescript
interface PrestigeBonuses {
  helium3Multiplier: number;
  productionSpeedMultiplier: number;
  startingResources: Partial<Record<ResourceName, number>>;
  maxColonistBonus: number;
}

function calculatePrestigeBonus(prestigeCount: number): PrestigeBonuses {
  // Diminishing returns after 10 prestiges
  const effectiveCount = Math.min(prestigeCount, 10);

  return {
    // +0.1 per prestige, caps at 2.0x (10 prestiges)
    helium3Multiplier: 1 + (effectiveCount * 0.1),

    // +5% per prestige, caps at 1.5x (10 prestiges)
    productionSpeedMultiplier: 1 + (effectiveCount * 0.05),

    // More starting resources per prestige
    startingResources: {
      Ice: 100 + (effectiveCount * 50),
      Regolith: 50 + (effectiveCount * 25),
      SolarPower: 500 + (effectiveCount * 100),
    },

    // +1 max colonist per prestige, caps at 10 bonus
    maxColonistBonus: Math.min(effectiveCount, 10)
  };
}

// Example: After 5 prestiges
// helium3Multiplier = 1.5 (50% more He-3)
// productionSpeedMultiplier = 1.25 (25% faster)
// startingResources: Ice=350, Regolith=175, SolarPower=1000
// maxColonistBonus = 5
```

---

## 5. Edge Cases

### 5.1 Power Outage (Blackout)

**Definition:** A blackout occurs when Solar Power storage reaches 0 AND net energy production is negative.

**Timeline:**

| Phase | Time | Effect |
|-------|------|--------|
| Warning | < 100 stored | Yellow warning indicator |
| Critical | < 50 stored | Red warning, alarm sound |
| Blackout | 0 stored | All production pauses |

**Affected Systems:**

- All production buildings pause immediately
- Oxygen Generator pauses (oxygen still depletes)
- Crops stop growing
- Colonists begin to suffocate (happiness drops)

**Recovery Procedure:**

1. Player receives "BLACKOUT WARNING" notification
2. Player must: build more Solar Arrays OR disable consuming buildings
3. When Solar Power > 0, buildings resume automatically
4. Production resumes from where it stopped (no progress lost < 5 min)

**Edge Case: Partial Blackout**

- If net energy is negative but storage > 0, buildings run at reduced efficiency
- Efficiency = currentStorage / 500 (minimum 0.5)
- Visual: Buildings dim but still operate

### 5.2 Oxygen Depletion

**Definition:** Oxygen level reaches 0 due to insufficient production or excessive consumption.

**Immediate Effects:**

- Crop production stops (greenhouse pauses)
- Colonist happiness drops by 50%
- Red "LOW OXYGEN" badge in HUD
- Warning notification every 30 seconds

**Long-term Effects (if not resolved):**

- After 5 minutes: Colonists leave (population decreases)
- After 10 minutes: Game over state (mercy mechanic triggers)

**Recovery:**

- Build Oxygen Generator if none exists
- Ensure Water Ice supply is adequate
- Reduce colonist count (disable habitat)
- Use consumable Oxygen Canisters (future feature)

### 5.3 Resource Storage Overflow

**Definition:** Production exceeds storage capacity, causing overflow.

**Behavior by Resource:**

| Resource | Overflow Behavior | Warning |
|----------|-------------------|---------|
| Ice | Lost | Red pulse at 900+ |
| Regolith | Lost | Red pulse at 900+ |
| Water Ice | Lost | Red pulse at 450+ |
| Solar Power | Lost | Yellow at 400, Red at 450+ |
| Iron | Lost | Red pulse at 450+ |
| Gold | Lost | Red pulse at 90+ |
| Helium-3 | **Stored** (no cap) | N/A |

**Prevention Mechanisms:**

- Visual indicators at 80%, 90%, 100% capacity
- Notification when full: "[Resource] storage full!"
- Sound effect option for critical resources

### 5.4 Building Production Interruption

**Definition:** Building is mid-production when resources run out.

**Behavior:**

- Production pauses at current percentage
- Progress is preserved for 5 minutes
- After 5 minutes: Progress resets to 0%

**Example Scenario:**

1. Water Extractor starts cycle (needs 10 Ice)
2. Player collects 7 Ice
3. Extractor has 7/10 Ice, paused at 70%
4. If Ice not added within 5 minutes: Resets to 0%

**Implementation:**

```typescript
interface ProductionState {
  progress: number;      // 0-100
  pausedAt?: number;    // Timestamp when paused
  resourceDeficit: number; // Amount missing to continue
}
```

### 5.5 Invalid Building Placement

**Validation Rules:**

1. **Grid Bounds**: Must be within colony grid
2. **No Overlap**: Cannot overlap existing buildings
3. **No Resource Nodes**: Cannot place on Ice/Regolith nodes
4. **Power Access**: Must be within 2 tiles of power source OR have battery storage > 0

**Error Handling:**

- Invalid tiles highlight red
- Tooltip shows reason: "No power connection" / "Space occupied"
- Placement blocked until valid

**Power Access Algorithm:**

```typescript
function hasPowerAccess(
  position: { x: number; y: number },
  grid: GridState,
  batteryStorage: number
): boolean {
  // If any battery exists, assume power access
  if (batteryStorage > 0) return true;

  // Check if within 2 tiles of Solar Array
  const solarArrays = getBuildingsOfType('SolarArray');
  for (const solar of solarArrays) {
    const distance = Math.abs(solar.position.x - position.x) +
                     Math.abs(solar.position.y - position.y);
    if (distance <= 2) return true;
  }

  return false;
}
```

### 5.6 Division by Zero Protection

**Locations:**

- Production rate calculations where baseRate = 0
- XP percentage where needed XP = 0
- Energy percentage where max storage = 0

**Safeguards:**

```typescript
function safeDivide(numerator: number, denominator: number, fallback: number = 0): number {
  if (denominator === 0) return fallback;
  return numerator / denominator;
}

function getProductionRate(building: Building): number {
  if (!building.produces) return 0;
  const rate = building.produces.amount / building.productionTime;
  return isFinite(rate) ? rate : 0;
}
```

### 5.7 Number Overflow Protection

**Danger Points:**

- Long offline periods (8+ hours of production)
- Multiple prestige cycles stacking bonuses
- Accidental input exploits

**Protection Mechanisms:**

```typescript
const MAX_RESOURCE_VALUE = new Decimal('1e15'); // 1 quadrillion
const MAX_CURRENCY_VALUE = new Decimal('1e18');  // 1 quintillion

function clampResource(value: Decimal, resource: ResourceName): Decimal {
  if (resource === 'Helium-3') {
    return Decimal.min(value, MAX_CURRENCY_VALUE);
  }
  return Decimal.min(value, MAX_RESOURCE_VALUE);
}

// Display formatting
function formatLargeNumber(value: Decimal): string {
  if (value.gte(1e12)) {
    return value.div(1e12).toFixed(2) + 'T';
  }
  if (value.gte(1e9)) {
    return value.div(1e9).toFixed(2) + 'B';
  }
  if (value.gte(1e6)) {
    return value.div(1e6).toFixed(2) + 'M';
  }
  return value.toFixed(0);
}
```

### 5.8 Race Condition: Simultaneous Production Completion

**Scenario:** Multiple buildings complete production in the same tick.

**Handling:**

1. All completions processed in same frame
2. Each completion triggers individual notification
3. Batch notification if > 3 completions in same tick
4. Resources added sequentially to prevent overflow

**Order of Processing:**

1. Solar Arrays (production first)
2. Extractors (consume after production)
3. Processors (intermediate)
4. Generators (final output)

---

## 6. Dependencies

### 6.1 System Dependency Graph

```
                    [GAME STATE]
                          |
          +---------------+---------------+
          |               |               |
    [RESOURCE]      [CURRENCY]      [PRODUCTION]
      SYSTEM          SYSTEM           SYSTEM
          |               |               |
          +-------+-------+-------+
                  |               |
            [INVENTORY]    [BUILDING]
              SYSTEM          SYSTEM
                  |               |
                  +-------+-------+
                          |
                    [PLOT SYSTEM]
                          |
                  [GRID/TERRAIN]
```

### 6.2 Resource Dependency Matrix

| Resource (Output) | From Building | Requires Input | Phase Unlocked |
|-------------------|---------------|----------------|----------------|
| Ice (click) | N/A | None | Phase 1 |
| Regolith (click) | N/A | None | Phase 1 |
| Solar Power | Solar Array | None | Phase 1 |
| Water Ice | Water Extractor | Ice, Solar Power | Phase 1 |
| Iron | Ore Processor | Regolith, Solar Power | Phase 2 |
| Oxygen | Oxygen Generator | Water Ice, Solar Power | Phase 2 |
| Lunar Wheat | Greenhouse | Water Ice | Phase 2 |
| Gold | Deep Core Mine | Iron, Solar Power | Phase 3 |
| Rare Metal | Deep Core Mine | Iron, Solar Power | Phase 3 |
| Dark Matter | Fusion Lab | Gold, Rare Metal, Helium-3 | Phase 4 |
| Helium-3 | Selling | Lunar Wheat/Gold | Phase 2+ |

### 6.3 Building Dependency Tree

```
Solar Array (Tier 1)
    |
    +---> Ice Drill (Tier 1)
    |         |
    |         +---> Water Extractor (Tier 1)
    |                   |
    |                   +---> Oxygen Generator (Tier 2)
    |                   |         |
    |                   |         +---> Habitat Module (Tier 2)
    |                   |
    |                   +---> Greenhouse (Tier 2)
    |                             |
    |                             +---> Hydroponic Bay (Tier 2)
    |
    +---> Ore Processor (Tier 2)
              |
              +---> Deep Core Mine (Tier 3)
                        |
                        +---> Fusion Reactor (Tier 3)
                        |         |
                        |         +---> Landing Pad (Tier 3)
                        |
                        +---> Fusion Lab (Tier 3)
                                  |
                                  +---> Prestige Buildings (Tier 3)
```

### 6.4 Currency Flow Dependencies

**Helium-3 Economy Flow:**

```
Lunar Wheat --(sell)--> Helium-3 --(buy)--> Land Expansion
                                        +--> Fusion Reactor Fuel
                                        +--> Prestige

Gold --(sell)--> Coins --(buy)--> Early Buildings
     |
     +---> Deep Core Mine (construction)
     +---> Tier 3 Upgrades

Solar Power --(convert)--> Helium-3 (Fusion Reactor)
```

### 6.5 Cross-Phase Dependencies

| Phase Transition | Requirements | Unlocks |
|-----------------|-------------|---------|
| Phase 1 -> 2 | Level 4 | Ore Processor, Battery Bank, Iron |
| Phase 2 -> 3 | Level 7 | Deep Core Mine, Fusion Reactor |
| Phase 3 -> 4 | Level 10 | Command Center T3, Prestige |

### 6.6 Bidirectional Dependencies

For each dependency, both systems document the relationship:

**Water Extractor Example:**

*From Water Extractor's perspective:*

- Input dependency: Ice (from clicking/Ice Drill)
- Input dependency: Solar Power (from Solar Array)
- Output enables: Oxygen Generator, Greenhouse

*From Oxygen Generator's perspective:*

- Input dependency: Water Ice (from Water Extractor)
- Without Water Extractor: Cannot produce Oxygen
- Warning displayed if Water Ice supply is low

---

## 7. Tuning Knobs

### 7.1 Production Rate Tuning

| Parameter | Default | Safe Range | Phase | Effect |
|-----------|---------|------------|-------|--------|
| SOLAR_ARRAY_OUTPUT | 1/5s | 0.5-2/5s | All | Base energy generation |
| ICE_DRILL_OUTPUT | 1/5s | 0.5-3/5s | 1+ | Auto-harvest rate |
| WATER_EXTRACTOR_RATIO | 0.1/s | 0.05-0.2/s | 1+ | Water Ice scarcity |
| OXYGEN_GENERATOR_RATE | 0.067/s | 0.03-0.13/s | 2+ | Colonist capacity |
| ORE_PROCESSOR_OUTPUT | 0.05/s | 0.02-0.1/s | 2+ | Tier 2 metal pacing |
| GREENHOUSE_GROW_TIME | 60s | 30-120s | 2+ | Late game income |
| DEEP_CORE_GOLD_RATE | 1/60s | 0.5-3/60s | 3+ | Gold availability |
| DEEP_CORE_RARE_RATE | 1/120s | 0.5-3/120s | 3+ | Rare Metal scarcity |

### 7.2 Cost Scaling Tuning

| Parameter | Default | Safe Range | Affects |
|-----------|---------|------------|---------|
| BUILDING_COST_SCALE | 1.15 | 1.05-1.30 | Exponential growth rate |
| TIER_2_MULTIPLIER | 1.5x | 1.2-2.0x | Tier 2 upgrade cost |
| TIER_3_MULTIPLIER | 2.0x | 1.5-3.0x | Tier 3 upgrade cost |
| LAND_EXPANSION_BASE | 10 He-3 | 5-25 | Grid progression |
| PRESTIGE_HE3_BONUS | 0.1 | 0.05-0.2 | Prestige reward |

### 7.3 Time-Based Tuning

| Parameter | Default | Safe Range | Rationale |
|-----------|---------|------------|-----------|
| OFFLINE_CAP_HOURS | 8 | 1-24 | Daily engagement cycle |
| STORAGE_CAP_BASE | 1000 | 500-5000 | Resource pressure |
| PRODUCTION_TICK_MS | 1000 | 100-5000 | Precision vs performance |
| AUTOSAVE_INTERVAL_MS | 30000 | 10000-60000 | Data safety |
| BLACKOUT_DELAY_MS | 30000 | 15000-60000 | Recovery window |

### 7.4 Energy Balance Tuning

| Parameter | Default | Safe Range | Effect |
|-----------|---------|------------|--------|
| BATTERY_STORAGE | 500 | 250-1000 | Power buffer |
| OXYGEN_DRAIN_COLONIST | 0.1/s | 0.05-0.2/s | Colonist pressure |
| CRITICAL_POWER_THRESHOLD | 100 | 50-200 | Warning timing |
| POWER_EFFICIENCY_MIN | 0.5 | 0.3-0.7 | Partial blackout floor |

### 7.5 Currency Economy Tuning

| Parameter | Default | Safe Range | Affects |
|-----------|---------|------------|---------|
| HELIUM3_CROP_PRICE | 5 | 2-10 | Late game income |
| LUNAR_WHEAT_GROW_TIME | 60s | 30-120s | He-3 flow rate |
| GOLD_SELL_PRICE | 50 | 25-100 | Gold value |
| DEEP_CORE_HE3_RATE | 1/300s | 1/120-1/600s | Rare He-3 source |
| TRADE_SHIP_VALUE | 100-500 | 50-1000 | Endgame He-3 |

### 7.6 Progression Gates Tuning

| Parameter | Default | Safe Range | Phase Gate |
|-----------|---------|------------|------------|
| LEVEL_FOR_TIER2 | 4 | 3-6 | Phase 1->2 |
| LEVEL_FOR_TIER3 | 7 | 5-9 | Phase 2->3 |
| LEVEL_FOR_FUSION | 8 | 7-10 | Phase 3 |
| LEVEL_FOR_PRESTIGE | 10 | 8-12 | Phase 4 |
| XP_BASE_LEVEL2 | 100 | 50-200 | Early pacing |
| XP_GROWTH_RATE | 2.0x | 1.5-2.5x | Level curve |

### 7.7 XP and Reward Tuning

| Parameter | Default | Safe Range | Affects |
|-----------|---------|------------|---------|
| XP_PER_CLICK | 1 | 0.5-2 | Click value |
| XP_PER_BUILD | 25 | 15-50 | Building incentive |
| XP_PER_HARVEST | 5 | 2-10 | Crop value |
| XP_MILESTONE_MULT | 100 | 50-200 | Major goals |
| ACHIEVEMENT_COIN_REWARD | 10 | 5-25 | Starter coins |
| ACHIEVEMENT_HE3_REWARD | 1 | 0.5-5 | Early He-3 |

---

## 8. Acceptance Criteria

### 8.1 Economic Balance Criteria

#### Phase 1 (Early Game, 0-30 min)

- [ ] **F1.1**: Player can earn coins by selling Ice/Regolith at rate of 1 coin per resource
- [ ] **F1.2**: First Solar Array pays for itself within 5 minutes (50 Solar Power / 1/5s = 250s)
- [ ] **F1.3**: Water Extractor can run continuously with 1 Solar Array and 1 Ice Drill
- [ ] **F1.4**: Building cost scaling reaches 2x at 5 buildings owned
- [ ] **F1.5**: Player can reach Level 2 within 10 minutes (100 XP from clicking)
- [ ] **F1.6**: No resource overflow occurs with default storage (1000 cap)

#### Phase 2 (Mid Game, 30min-2h)

- [ ] **F2.1**: Oxygen Generator can support 1 colonist with 2 Water Extractors running
- [ ] **F2.2**: Greenhouse produces Lunar Wheat at rate of 1/60s when supplied
- [ ] **F2.3**: Helium-3 income from selling Lunar Wheat is achievable (5 He-3/wheat)
- [ ] **F2.4**: Land expansion to 8x8 costs exactly 10 Helium-3
- [ ] **F2.5**: Battery Bank increases Solar Power storage by exactly 500
- [ ] **F2.6**: Player can reach Level 6 within 2 hours
- [ ] **F2.7**: Offline production calculates correctly for up to 8 hours

#### Phase 3 (Late Game, 2-5h)

- [ ] **F3.1**: Deep Core Mine produces 1 Gold per 60 seconds at Tier 1
- [ ] **F3.2**: Fusion Reactor consumes 1 Helium-3 per 30 seconds for massive energy
- [ ] **F3.3**: Landing Pad trade returns 100-500 Helium-3 per cycle
- [ ] **F3.4**: Tier 3 upgrades double production (compared to Tier 2)
- [ ] **F3.5**: Gold becomes the bottleneck for Tier 3 building construction
- [ ] **F3.6**: Player can reach Level 8 within 5 hours
- [ ] **F3.7**: Helium-3 becomes primary currency over coins

#### Phase 4 (End Game, 5h+)

- [ ] **F4.1**: Prestige at Level 10 resets colony correctly
- [ ] **F4.2**: Prestige bonus applies: +0.1 He-3 multiplier per prestige
- [ ] **F4.3**: Starting resources after prestige include bonus from previous prestiges
- [ ] **F4.4**: All 5 land expansions purchasable (10/25/50/100 He-3)
- [ ] **F4.5**: Command Center Tier 3 available at Level 10
- [ ] **F4.6**: Player can reach Level 10 within reasonable time (10+ hours fresh)

### 8.2 Economic Health Criteria

- [ ] **H1**: No degenerate strategies exist (e.g., infinite resource exploits)
- [ ] **H2**: Resource caps prevent infinite accumulation
- [ ] **H3**: Exponential cost scaling creates natural stopping points
- [ ] **H4**: Prestige provides meaningful progression without invalidating progress
- [ ] **H5**: Economy remains balanced across all 4 phases
- [ ] **H6**: No inflation of Helium-3 value relative to game content
- [ ] **H7**: Solar Power economy is always balanced (net positive with enough Solar Arrays)
- [ ] **H8**: Oxygen chain supports colonist count without being impossible

### 8.3 Technical Criteria

- [ ] **T1**: All formulas use Decimal.js for precise calculations
- [ ] **T2**: Number overflow is prevented at 1e15 for resources, 1e18 for currency
- [ ] **T3**: Division by zero returns safe fallback values
- [ ] **T4**: Offline production caps at exactly 8 hours
- [ ] **T5**: Production tick is 1 second (1000ms) for smooth progress bars
- [ ] **T6**: Autosave triggers every 30 seconds and on significant actions

### 8.4 UX/Feedback Criteria

- [ ] **U1**: Resource icons pulse red when storage is full
- [ ] **U2**: Yellow warning appears when Solar Power drops below 100
- [ ] **U3**: Red warning appears when Solar Power drops below 50
- [ ] **U4**: "LOW OXYGEN" badge displays when oxygen is depleted
- [ ] **U5**: Building placement shows red for invalid, green for valid
- [ ] **U6**: Production completion triggers visual feedback (particles, sound)
- [ ] **U7**: Level up triggers celebration animation
- [ ] **U8**: Helium-3 income displays with "+X" floating number

### 8.5 Test Scenarios

#### Scenario 1: Fresh Start to First Water Ice

```
1. Start with 0 resources, 100 coins
2. Click Ice node 20 times -> 20 Ice
3. Build Solar Array (10 Regolith) - need to click Regolith first
4. Wait 250s for Solar Power to accumulate
5. Build Water Extractor (20 Ice, 10 Regolith)
6. Observe Water Ice production
```

**Expected**: First Water Ice within 5 minutes of starting

#### Scenario 2: Power Outage Recovery

```
1. Have 2 Solar Arrays, 3 Water Extractors running
2. Solar Power drops to 0
3. Observe blackout warning
4. Build 3rd Solar Array
5. Observe buildings resume
```

**Expected**: Blackout warning at 50 stored, recovery immediate

#### Scenario 3: 8-Hour Offline Production

```
1. Build optimal colony: 5 Ice Drills, 5 Water Extractors, 3 Solar Arrays
2. Exit game
3. Wait 10 hours (simulated)
4. Return to game
5. Check accumulated resources
```

**Expected**: 8 hours of production counted, 2 hours lost, notification displayed

#### Scenario 4: Prestige Flow

```
1. Reach Level 10 with optimal setup
2. Perform prestige
3. Observe: resources reset, Helium-3 kept, bonuses applied
4. Verify starting resources include prestige bonus
5. Build first building, verify 1.1x production speed bonus
```

**Expected**: Prestige is rewarding, bonuses apply immediately

#### Scenario 5: Maximum Production Chain

```
1. Build Tier 3 Deep Core Mine (costs ~200 Gold, 100 Rare Metal)
2. Verify Gold production is 4/60s (Tier 3 multiplier)
3. Verify Helium-3 income increases with prestige multiplier
4. Build Fusion Reactor, verify 10 Solar Power/s
5. Verify Helium-3 consumption rate is 1/30s
```

**Expected**: Endgame production chains are powerful but expensive

---

## Appendix A: Complete Resource Table

| Resource | Tier | Click | Building | Rate | Storage Cap | Sell Price |
|----------|------|-------|----------|------|-------------|------------|
| Ice | 1 | 1/click | Ice Drill | 1-4/5s | 1000 | 1 coin |
| Regolith | 1 | 1/click | Ore Processor | N/A | 1000 | 1 coin |
| Solar Power | 1 | N/A | Solar Array | 1-4/5s | 500-2000 | N/A |
| Water Ice | 1 | N/A | Water Extractor | 1-4/10s | 500-1000 | 3 coins |
| Oxygen | 2 | N/A | Oxygen Generator | 1-4/15s | 200-400 | N/A |
| Iron | 2 | N/A | Ore Processor | 1-4/20s | 500-1000 | 10 coins |
| Lunar Wheat | 2 | N/A | Greenhouse | 1-4/60s | 100 | 5 He-3 |
| Gold | 3 | N/A | Deep Core Mine | 1-4/60s | 100 | 50 coins |
| Rare Metal | 3 | N/A | Deep Core Mine | 1-4/120s | 50 | N/A |
| Helium-3 | 3 | N/A | Deep Core Mine, Trade | Variable | Unlimited | N/A |
| Dark Matter | 3 | N/A | Fusion Lab | 1/300s | 10 | Prestige |

---

## Appendix B: Building Cost Reference

| Building | Base Cost | Tier 2 Cost | Tier 3 Cost |
|----------|-----------|-------------|-------------|
| Solar Array | 10 Regolith | 15 R, 5 I | 20 R, 10 I |
| Water Extractor | 20 Ice, 10 R | 30 I, 15 R, 5 I | 40 I, 20 R, 10 I |
| Ice Drill | 30 Regolith, 5 Iron | 45 R, 8 I, 3 G | 60 R, 15 I, 8 G |
| Oxygen Generator | 30 Iron, 15 WI | 45 I, 23 WI, 5 G | 60 I, 30 WI, 10 G |
| Ore Processor | 40 Iron, 20 R | 60 I, 30 R, 8 G | 80 I, 40 R, 15 G |
| Greenhouse | 25 Iron, 10 R | 38 I, 15 R, 5 G | 50 I, 20 R, 10 G |
| Deep Core Mine | 100 Iron, 50 Gold | 150 I, 75 G, 20 RM | 200 I, 100 G, 40 RM |
| Fusion Reactor | 200 Gold, 100 RM | N/A | N/A |
| Battery Bank | 35 Iron, 15 R | 53 I, 23 R, 5 G | 70 I, 30 R, 10 G |
| Habitat Module | 50 Iron, 20 WI | 75 I, 30 WI, 8 G | 100 I, 40 WI, 15 G |

*Legend: R=Regolith, I=Iron, WI=Water Ice, G=Gold, RM=Rare Metal*

---

## Appendix C: Economic Health Metrics

Track these metrics during playtesting to ensure economic balance:

| Metric | Healthy Range | Warning | Critical |
|--------|---------------|---------|----------|
| Avg Solar Power | 200-400 | < 100 | < 50 |
| He-3 per hour | 10-50 | < 5 | < 1 |
| Buildings owned | 5-20 | > 25 | > 30 |
| Resource waste % | 0-5% | 5-15% | > 15% |
| Time to Level | 10-30 min | > 45 min | > 60 min |
| Offline return | > 50% cap | 25-50% | < 25% |

---

## Appendix D: Glossary

| Term | Definition |
|------|------------|
| Faucet | A source of resources (production) |
| Sink | A drain of resources (consumption) |
| Tier | Building upgrade level (1, 2, 3) |
| Prestige | Reset with permanent bonuses |
| Blackout | Zero Solar Power with negative net rate |
| Chain | Connected production dependencies |
| Idle | Game progresses without active input |
| Increment | Small numerical progress |

---

*Document Version: 1.0*
*Created: 2026-03-28*
*Status: Initial Draft*
*Author: Economy Designer Agent*
*References: ICE-DRILL-GAME-DESIGN.md, ICE-DRILL-PROGRESSION.md, ICE-DRILL-SYSTEMS-INDEX.md*
