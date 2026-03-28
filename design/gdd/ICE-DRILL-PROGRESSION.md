# ICE DRILL - Progression Design Document

## 1. Overview

ICE DRILL est un jeu idle/incremental de colonisation lunaire structure en quatre phases de jeu distinctes. Chaque phase introduit de nouvelles mecaniques, ressources et objectifs tout en approfondissant les systemes etablis. Le joueur progresse d'une operation d'extraction manuelle rudimentaire vers une colonie lunaire autonome et altamente optimisée.

**Phase 1 - Early Game (0-30 min)**: Tutorial et premiere infrastructure. Le joueur apprend les bases du clicking, construit ses premiers batiments et comprime la boucle de production elementaire (Ice -> Water Ice -> Oxygen).

**Phase 2 - Mid Game (30min-2h)**: Expansion et chains de production. Le joueur diversifie sa production avec les ressources Tier 2 (Iron, Crops), debloque les serres et les habitats, et commence l'optimisation active.

**Phase 3 - Late Game (2-5h)**: Ressources rares et batiments avances. Helium-3 devient central, le Deep Core Mine debloque Gold et Rare Metals, le Fusion Reactor enable l'energie illimitee.

**Phase 4 - End Game (5h+)**: Prestige et meta-progression. La colonie devient autosuffisante, le Landing Pad enable le commerce avec la Terre, et les mecaniques de prestige encouragent la replayability.

---

## 2. Player Fantasy

### Phase 1: "Premier pas sur la Lune"

Le joueur ressent l'excitation du pionnier. Chaque clic sur un node de glace produit un feedback immediat et satisfaisant. La lune est un territoire vierge ou chaque structure construite represente un triomphe contre l'hostilite de l'espace. L'emotion dominante est **la competence naissante** - "Je comprends comment ca marche".

**Emotions cibles:**
- Decouverte (nouveaux nodes, nouveaux batiments)
- Competence (optimiser sa premiere chaine)
- Satisfaction immediate (chaque clic compte)

### Phase 2: "Construire une presence"

Le joueur ressent la satisfaction de l'architecte. Les decisions de placement deviennent strategiques. Voir une chaine de production complete fonctionner en autonomie procure un sentiment de **controverse deléguée** - "Ma colonie travaille pour moi".

**Emotions cibles:**
- Agency (choix de quoi construire, quand)
- Fierté (voir sa colonie s'etendre)
- Leger defi (equilibrer Energie vs Production vs Stockage)

### Phase 3: "Optimiser ou Perir"

Le joueur ressent la complexite comme un puzzle. Les metriques de production deviennent visibles. Le joueur experimenté optimise ses ratios, decoouvre les combos. L'emotion dominante est **la competence approfondie** - "J'ai trouvé le setup optimal".

**Emotions cibles:**
- Mastery (comprendre les systemes en profondeur)
- Strategie (planification a moyen terme)
- Frustration positive (les problemes sont des puzzles, pas des blocus)

### Phase 4: "Legue du Developpement Spatial"

Le joueur ressent la fin de la campagne. La base fonctionne en grande autonomie. Les objectifs restants sont des defis a long terme ou des increments marginaux. L'emotion dominante est **la completion** et **le prestige** - "J'ai fait ma part, maintenant je recommence en mieux".

**Emotions cibles:**
- Accomplissement (objectifs a long terme atteints)
- Nostalgie (revoir le parcours)
- Relancement (nouvelle partie avec avantages)

---

## 3. Detailed Rules

### 3.1 Phase 1: Early Game (0-30 minutes)

#### Ressources disponibles

| Resource | Tier | Source | Usage |
|----------|------|--------|-------|
| Ice | 1 | Click nodes (4 pre-place) | Crafting, Water extraction |
| Regolith | 1 | Click nodes (2 pre-place) | Building construction |
| Solar Power | 1 | Solar Array (1 pre-place) | Energie pour tous les batiments |
| Water Ice | 1 | Water Extractor (Ice + Energy) | Life support, Crops |

#### Batiments debloques

| Building | Unlock | Cost | Production |
|----------|--------|------|------------|
| Solar Array | Start | 10 Regolith | 1 Solar Power/5s |
| Water Extractor | Level 2 | 20 Ice, 10 Regolith | 1 Water Ice/10s, -1 Solar Power/10s |
| Ice Drill | Level 3 | 30 Regolith, 5 Iron | 1 Ice/5s, -1 Solar Power/5s |
| Habitat Module | Level 5 | 50 Iron, 20 Water Ice | +2 Colonist capacity |

#### Boucle de jeu principale

```
[Jouer] -> Click Ice Node -> +1 Ice
[Jouer] -> Click Regolith Node -> +1 Regolith
[Construire] -> Placer Solar Array -> +1 Solar Power/5s
[Construire] -> Placer Water Extractor -> Ice + Energy -> Water Ice
[Progresser] -> Level up -> Debloquer Ice Drill
```

**30-second loop:**
- Click sur Ice Node (1-2 Ice par click)
- Click sur Regolith Node (1 Regolith par click)
- Observer la barre d'energie se remplir

**5-minute loop:**
- Construire un Water Extractor
- Collecter assez de Ice pour le faire tourner
- Construire un Ice Drill pour automer l'extraktion

**Session loop:**
- Completer le tutorial (3 etapes)
- Debloquer Water Extractor
- Construire premiere Ice Drill
- Atteindre Level 3

#### Objectifs et Narrative

- **Tutorial Step 1**: "Extraire 10 Ice" - Bouche auto-explicative
- **Tutorial Step 2**: "Construire un Solar Array" - Introduction construction
- **Tutorial Step 3**: "Produire 5 Water Ice" - Introduction chaines
- **Milestone**: "Premier Ice Drill automatique" - Debut idle

#### Points de friction et solutions

| Friction | Solution |
|----------|----------|
| "Je ne sais pas quoi faire" | UI highlight sur le prochain objectif |
| "Je n'ai pas assez de resources" | Indicateur vert/rouge sur les couts |
| "L'energie s'epuise" | Tutorial sur l'equilibre Solar Power |
| "Je perds mes ressources" | Stock infini Early Game (pas de perte) |

#### Indicateurs de progression

- Level colonist (affiché dans HUD)
- Nombre de batiments places
- Water Ice produit (compteur)
- Premier Ice Drill construit (badge)

---

### 3.2 Phase 2: Mid Game (30min-2h)

#### Ressources disponibles

Toutes les ressources Tier 1 +:

| Resource | Tier | Source | Usage |
|----------|------|--------|-------|
| Oxygen | 2 | Oxygen Generator (Water Ice + Energy) | Colonist survival |
| Lunar Wheat | 2 | Greenhouse (Water Ice + Seeds) | Vente pour Helium-3 |
| Moonroot | 2 | Greenhouse (Water Ice + Seeds) | Health bonus |
| Iron | 2 | Ore Processor (Regolith + Energy) | Batiments avances |

#### Batiments debloques

| Building | Unlock | Cost | Production |
|----------|--------|------|------------|
| Oxygen Generator | Level 6 | 30 Iron, 15 Water Ice | 1 Oxygen/15s, -1 Solar Power/15s |
| Greenhouse | Level 6 | 25 Iron, 10 Regolith | Lunar Wheat/60s, -1 Water Ice/30s |
| Ore Processor | Level 4 | 40 Iron, 20 Regolith | 1 Iron/20s, -2 Solar Power/20s |
| Battery Bank | Level 4 | 35 Iron, 15 Regolith | +500 Solar Power storage |
| Deep Core Mine | Level 5 | 100 Iron, 50 Gold | Gold + Rare Metals |

#### Boucle de jeu principale

```
[Optimiser] -> Chain: Ice Drill -> Water Extractor -> Oxygen Generator
[Construire] -> Greenhouse -> Water Ice + Time -> Lunar Wheat
[Vendre] -> Lunar Wheat -> Helium-3 (premium currency)
[Etendre] -> Land Expansion -> Nouveaux nodes + build slots
```

**30-second loop:**
- Verifier les生产和consommation
- Ajuster les extracteurs selon l'energie
- Click sur Lunar Wheat pret

**5-minute loop:**
- Planifier une nouvelle chain de production
- Construire un batiment critique
- Gerer les goulots d'etranglement

**Session loop:**
- Construire premiere Oxygen Generator
- Lancer premiere culture de Lunar Wheat
- Atteindre Level 6
- Premier Land Expansion (8x8)

#### Objectifs et Narrative

- **Milestone**: "Premier Oxygen genere" - La survie est assuree
- **Milestone**: "Premiere recolte" - La base devient productive
- **Milestone**: "Land Expansion" - La frontiere s'ouvre
- **Milestone**: "100 Iron accumules" - L'ere industrielle commence

#### Points de friction et solutions

| Friction | Solution |
|----------|----------|
| "Je ne sais pas equiliber Energie/Production" | UI Dashboard avec flux d'energie visualise |
| "Mes cultures meurent" | Alerte "Low Oxygen" avec 60s d'avance |
| "Je manque de slots" | Land Expansion guide dans les quetes |
| "Les couts sont trop eleves" | Batch collection avec timer |

#### Indicateurs de progression

- Level colonist
- Land Grid Size (6x6 -> 8x8 -> 10x10)
- Nombre de chaines de production completes
- Helium-3 balance
- Nombre de colonists

---

### 3.3 Phase 3: Late Game (2-5h)

#### Ressources disponibles

Toutes les ressources Tier 1-2 +:

| Resource | Tier | Source | Usage |
|----------|------|--------|-------|
| Gold | 3 | Deep Core Mine | Premium buildings |
| Rare Metal | 3 | Deep Core Mine | Tier 3 upgrades |
| Helium-3 | 3 | Rare extraction, Crop selling | Currency premium |
| Dark Matter | 3 | Fusion Lab (Rare Metal + Gold) | Endgame power |

#### Batiments debloques

| Building | Unlock | Cost | Production |
|----------|--------|------|------------|
| Fusion Reactor | Level 8 | 200 Gold, 100 Rare Metal | Massive energy, -1 Helium-3/30s |
| Deep Core Mine | Level 5 | 100 Iron, 50 Gold | 1 Gold/60s, 1 Rare Metal/120s |
| Hydroponic Bay | Level 7 | 80 Iron, 30 Gold | Crops 2x faster |
| Landing Pad | Level 9 | 300 Gold, 50 Helium-3 | Earth trade |
| Assembler | Level 7 | 150 Iron, 40 Gold | Advanced components |
| Command Center Tier 2 | Level 8 | 100 Gold | Upgrade slots +1 |

#### Boucle de jeu principale

```
[End Game] -> Deep Core Mine -> Gold + Rare Metals
[End Game] -> Fusion Reactor -> Energie illimitee
[End Game] -> Landing Pad -> Earth Trade
[Meta] -> Helium-3 -> Premium upgrades
```

**30-second loop:**
- Monitorer Deep Core Mine
- Collecter Gold/Rare Metals
- Verifier Fusion Reactor fuel

**5-minute loop:**
- Optimiser les chaines avec Tier 3
- Preparer le Landing Pad
- Trader avec la Terre

**Session loop:**
- Construire le Fusion Reactor
- Atteindre Level 9
- Debloquer le Landing Pad
- Premier trade avec la Terre

#### Objectifs et Narrative

- **Milestone**: "Fusion Reactor operational" - Energie illimitee
- **Milestone**: "First Gold extracted" - Richesse lunaire
- **Milestone**: "Landing Pad built" - Le commerce commence
- **Milestone**: "500 Helium-3 earned" - L'objectif final approche

#### Points de friction et solutions

| Friction | Solution |
|----------|----------|
| "Deep Core Mine est trop lent" | Upgrades Tier 2/3 accelerent |
| "Je gaspille des resources" | Auto-collection avec timer configurable |
| "Le Fusion Reactor consume trop" | Optimisation du ratio Energie/Helium-3 |
| "Je ne sais pas quoi faire apres" | Quetes de prestige guidees |

#### Indicateurs de progression

- Level colonist
- Nombre de batiments Tier 3
- Helium-3/minute income
- Fusion Reactor active (Yes/No)
- Landing Pad construit (Yes/No)

---

### 3.4 Phase 4: End Game (5h+)

#### Ressources disponibles

Toutes les ressources des phases precedentes.

| Resource | Tier | Source | Usage |
|----------|------|--------|-------|
| Dark Matter | 3 | Fusion Lab (Rare Metal + Gold + Helium-3) | Prestige currency |

#### Batiments debloques

| Building | Unlock | Cost | Production |
|----------|--------|------|------------|
| Command Center Tier 3 | Level 10 | 500 Gold | Full upgrade potential |
| Prestige Buildings | Post-Level 10 | Variable | Benefits for new game+ |

#### Boucle de jeu principale

```
[Autonomie] -> La base fonctionne sans intervention
[Optimiser] -> Incremental improvements
[Prestige] -> Reset avec bonus permanents
[Collecter] -> Achievements et badges
```

**30-second loop:**
- Collection passive
- Monitoring general

**5-minute loop:**
- Ajustements mineurs
- Achievements a long terme

**Session loop:**
- Atteindre les derniers milestones
- Preparer le prestige
- Nouvelle partie avec bonus

#### Objectifs et Narrative

- **Victory**: "Full Colonization" - Command Center Tier 3 + tous les land expansions
- **Prestige Unlock**: "Colonist Expert" - Level 10 atteint
- **Trade Master**: "Earth's Best Friend" - 10,000 Helium-3 de trade total
- **Efficiency**: "Zero Waste" - 100% de l'energie utilisee pendant 1h

#### Points de friction et solutions

| Friction | Solution |
|----------|----------|
| "Il n'y a plus de defi" | Prestige system - difficult reneouvelle |
| "Tout est trop lent" | Offline production cap raise |
| "Je m'ennuie" | Seasonal events (post-MVP) |
| "Je veux recommencer" | Prestige avec permanent upgrades |

#### Indicateurs de progression

- Command Center Level (1-10)
- Land expansions owned (0-4)
- Prestige count
- Total Helium-3 earned (lifetime)
- Achievements unlocked (X/50)

---

## 4. Formulas

### 4.1 Production Rate Formula

```typescript
function calculateProduction(
  baseRate: number,        // Base production per interval
  buildingTier: 1 | 2 | 3, // Building upgrade level
  efficiency: number,       // 0.5 to 1.5 (affected by power/colonists)
  powerMultiplier: number,  // 0 if no power, 1 if powered
  upgradeMultiplier: number // From building upgrades
): number {
  // Tier 1: 1x, Tier 2: 2x, Tier 3: 4x
  const tierMultiplier = buildingTier === 1 ? 1 : buildingTier === 2 ? 2 : 4;

  return baseRate * tierMultiplier * efficiency * powerMultiplier * upgradeMultiplier;
}

// Example: Tier 2 Water Extractor with good power
// 1 * 2 * 1.0 * 1.0 * 1.0 = 2 Water Ice / 10s
```

### 4.2 Building Cost Formula

```typescript
function calculateBuildingCost(
  baseCost: Partial<Record<ResourceName, number>>,
  tier: 1 | 2 | 3,
  existingCount: number
): Partial<Record<ResourceName, number>> {
  // Exponential scaling: 1.15^existingCount
  const scaleFactor = Math.pow(1.15, existingCount);

  // Tier multipliers: T1=1x, T2=1.5x, T3=2x
  const tierMultiplier = tier === 1 ? 1 : tier === 2 ? 1.5 : 2;

  return Object.fromEntries(
    Object.entries(baseCost).map(([resource, amount]) => [
      resource,
      Math.floor(amount * scaleFactor * tierMultiplier),
    ])
  );
}

// Example: Water Extractor (base: 20 Ice, 10 Regolith)
// After 3 built: 20 * 1.15^3 * 1.0 = 30 Ice, 15 Regolith
```

### 4.3 Offline Production Formula

```typescript
function calculateOfflineProduction(
  lastLogin: number,
  currentTime: number,
  game: GameState
): Partial<Record<ResourceName, Decimal>> {
  const OFFLINE_CAP_SECONDS = 8 * 60 * 60; // 8 hours
  const offlineSeconds = Math.min(
    currentTime - lastLogin,
    OFFLINE_CAP_SECONDS
  );

  const results: Partial<Record<ResourceName, Decimal>> = {};

  for (const [buildingId, building] of Object.entries(game.buildings)) {
    if (!building.producing) continue;

    // Calculate net production
    const productionRate = building.produces
      ? calculateProduction(building.produces.amount, building.tier, building.efficiency, 1)
      : 0;
    const consumptionRate = building.consumes
      ? building.consumes.amount
      : 0;

    const netRate = productionRate - consumptionRate;
    const grossProduction = productionRate * offlineSeconds;
    const grossConsumption = consumptionRate * offlineSeconds;

    // Cap at storage limits
    const netYield = Decimal.max(grossProduction - grossConsumption, 0);

    // Add to results
    const resource = building.produces?.resource;
    if (resource) {
      results[resource] = (results[resource] || new Decimal(0)).plus(netYield);
    }
  }

  return results;
}
```

### 4.4 XP and Level Formula

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
  // Continue: XP[n] = XP[n-1] * 2
};

function calculateLevel(totalXP: number): number {
  let level = 1;
  let xpNeeded = 0;

  while (xpNeeded <= totalXP && level < 100) {
    xpNeeded += XP_PER_LEVEL[level + 1] - XP_PER_LEVEL[level];
    if (xpNeeded <= totalXP) level++;
  }

  return level;
}

function getXPForNextLevel(currentLevel: number): number {
  return XP_PER_LEVEL[currentLevel + 1] || XP_PER_LEVEL[currentLevel] * 2;
}

// Example: At level 5, need 1000 XP total to reach level 6
```

### 4.5 Land Expansion Cost Formula

```typescript
const LAND_EXPANSION_COSTS = [
  { size: 6, cost: 0 },    // Starting
  { size: 8, cost: 10 },  // +28 plots
  { size: 10, cost: 25 }, // +36 plots
  { size: 12, cost: 50 }, // +44 plots
  { size: 14, cost: 100 },// +52 plots
];

function calculateExpansionCost(currentSize: number): number {
  const next = LAND_EXPANSION_COSTS.find(e => e.size > currentSize);
  return next?.cost || Infinity;
}

// Example: 6x6 -> 8x8 costs 10 Helium-3
```

### 4.6 Energy Balance Formula

```typescript
function calculateNetEnergy(
  buildings: Record<string, PlacedBuilding>,
  batteryStorage: number
): { netRate: number; storagePercent: number; isBlackout: boolean } {
  let netRate = 0;

  for (const building of Object.values(buildings)) {
    if (!building.producing) continue;

    if (building.consumes?.resource === 'Solar Power') {
      netRate -= building.consumes.amount;
    }
    if (building.produces?.resource === 'Solar Power') {
      netRate += building.produces.amount;
    }
  }

  // Calculate storage
  const storagePercent = Math.min(100, (netRate + batteryStorage) / (batteryStorage * 2) * 100);
  const isBlackout = netRate < 0; // More consumption than production

  return { netRate, storagePercent, isBlackout };
}

// Example: 2 Solar Arrays (+2/s), 1 Water Extractor (-1/s), 1 Ice Drill (-1/s)
// netRate = 2 - 1 - 1 = 0 (balanced)
```

### 4.7 Prestige Multiplier Formula

```typescript
interface PrestigeBonus {
  helium3Multiplier: number;    // Starting: 1.0, +0.1 per prestige
  productionSpeedMultiplier: number; // Starting: 1.0, +0.05 per prestige
  startingResources: Partial<Record<ResourceName, number>>;
}

function calculatePrestigeBonus(prestigeCount: number): PrestigeBonus {
  return {
    helium3Multiplier: 1 + (prestigeCount * 0.1),
    productionSpeedMultiplier: 1 + (prestigeCount * 0.05),
    startingResources: {
      // More starting resources per prestige
      Ice: 100 + (prestigeCount * 50),
      Regolith: 50 + (prestigeCount * 25),
      SolarPower: 500 + (prestigeCount * 100),
    }
  };
}

// Example: After 5 prestiges:
// helium3Multiplier = 1.5 (50% more Helium-3 from all sources)
// productionSpeedMultiplier = 1.25 (25% faster all production)
```

---

## 5. Edge Cases

### 5.1 Power Outage

**Trigger**: Solar Power drops to 0 (consumption > production)

**Immediate (0-30s)**:
- All production buildings pause
- Visual: Red warning overlay, buildings dim
- Audio: Alarm beep every 5s

**Short-term (30-60s)**:
- Oxygen Generator stops
- Oxygen slowly depletes (-0.1/second if no colonists, -1/second per colonist)
- Notification: "BLACKOUT WARNING - Oxygen depleting"

**Long-term (60s+)**:
- Oxygen reaches 0: Crops stop growing
- Colonist happiness drops (future feature)
- **Mercy mechanic**: No game over, but severe penalty

**Recovery**:
- Build more Solar Arrays
- Disable non-essential buildings
- Battery Bank provides emergency reserve

### 5.2 Oxygen Depletion

**Trigger**: Oxygen level reaches 0

**Effects**:
- Crop production stops immediately
- Colonists unhappy (future: happiness mechanic)
- Warning notification every 30s
- Red "LOW OXYGEN" badge in HUD

**Recovery**:
- Build Oxygen Generator if not present
- Ensure Water Ice supply
- Prioritize Oxygen in production queue

### 5.3 Storage Full

**Trigger**: Resource amount exceeds storage cap

**Default caps**:
| Resource | Base Cap | Expansion |
|----------|----------|-----------|
| Ice | 1000 | +500 per Storage |
| Regolith | 1000 | +500 per Storage |
| Water Ice | 500 | +250 per Storage |
| Solar Power | 500 | +500 per Battery |
| Iron | 500 | +250 per Storage |
| Gold | 100 | Not expandable |

**Behavior**:
- Overflow is **lost** (not stored)
- Visual: Resource icon pulses red
- Notification: "[Resource] storage full! Upgrade storage or use resources."

**Prevention**:
- Build Storage facilities
- Monitor production vs consumption balance
- Use resources before maxing out

### 5.4 Building Without Resources

**Trigger**: Building has resources to consume but inventory runs out mid-cycle

**Behavior**:
- Production pauses (not cancelled)
- Progress is **preserved** for 5 minutes
- After 5 minutes: Production resets to 0

**Example**:
- Water Extractor has 5/10 Ice for current cycle
- Player collects 3 Ice
- Extractor pauses at 50%
- After 5 minutes: Resets to 0%

### 5.5 Invalid Building Placement

**Rules**:
- Cannot overlap existing buildings
- Cannot place on resource nodes
- Must have valid grid position
- Must have adjacent power source (or Battery)

**Invalid placement result**:
- Red highlight on invalid tiles
- "Cannot build here" tooltip
- Placement blocked

**Power connection rule**:
- Building must be within 2 tiles of Solar Array or Battery
- OR battery storage must be > 0

### 5.6 Offline Production Cap

**Trigger**: Player returns after > 8 hours offline

**Behavior**:
- Production calculated for 8 hours maximum
- Notification: "You were away for X hours. Capped at 8 hours production."
- Excess production **lost**

**Balancing rationale**:
- Prevents infinite accumulation
- Encourages regular play
- Maintains server-like daily rhythm

### 5.7 Division by Zero

**Locations where division occurs**:
- `calculateProduction(baseRate, ...)` where baseRate = 0
- Time-based calculations where elapsed = 0

**Prevention**:
- Guard with `Decimal.max(0, value)` before division
- Default production to 0, not error
- Log warnings for unexpected states

### 5.8 Number Overflow

**Danger**: Very large numbers (after long play) can overflow

**Protection**:
- Use Decimal.js for all currency calculations
- Cap at Number.MAX_SAFE_INTEGER for display
- Scientific notation for > 1 trillion

---

## 6. Dependencies

### 6.1 System Dependencies

```
[Game State System]
        |
        +---> [Resource System] ----+
        |                           |
        +---> [Inventory System] ---+---> [Currency System]
        |                           |
        +---> [Building System] -----+---> [Production System]
        |                           |
        +---> [Plot System] --------+
        |
        +---> [Save/Load System]

[UI State System] <---> [Game State System]
```

### 6.2 Cross-Phase Dependencies

| Phase | Requires | Unlocks |
|-------|----------|---------|
| Early -> Mid | Level 4 | Ore Processor, Battery Bank |
| Mid -> Late | Level 7 | Deep Core Mine, Fusion Reactor |
| Late -> End | Level 10 | Command Center Tier 3, Prestige |

### 6.3 Resource Dependencies

```
Tier 1 (Raw):
  Ice <-- Clicking
  Regolith <-- Clicking
  Solar Power <-- Solar Array

Tier 2 (Processed):
  Water Ice <-- Ice + Solar Power (Water Extractor)
  Oxygen <-- Water Ice + Solar Power (Oxygen Generator)
  Iron <-- Regolith + Solar Power (Ore Processor)
  Lunar Wheat <-- Water Ice (Greenhouse)

Tier 3 (Advanced):
  Gold <-- Iron + Solar Power (Deep Core Mine)
  Rare Metal <-- Deep Core Mine
  Helium-3 <-- Crop selling, Rare extraction
  Dark Matter <-- Rare Metal + Gold (Fusion Lab)
```

### 6.4 Building Dependencies

| Building | Requires | Enables |
|----------|----------|---------|
| Water Extractor | Level 2, 20 Ice, 10 Regolith | Oxygen Generator |
| Oxygen Generator | Water Extractor, 30 Iron | Colonist survival |
| Ore Processor | Level 4, 40 Iron, 20 Regolith | Tier 2 metals |
| Deep Core Mine | Ore Processor, Level 5 | Gold, Rare Metals |
| Fusion Reactor | Deep Core Mine, Level 8 | Endgame energy |
| Landing Pad | Fusion Reactor, Level 9 | Earth Trade |

### 6.5 Dependency-Specific Notes

**Water Extractor dependency chain**:
- Ice Drill -> More Ice -> More Water Ice -> More Oxygen
- Battery Bank -> Stabilizes power during expansion

**Greenhouse dependency chain**:
- Water Extractor -> Water Ice -> Lunar Wheat -> Helium-3
- Hydroponic Bay -> 2x crop speed -> More Helium-3

**Deep Core Mine dependency chain**:
- Ore Processor -> Iron -> Deep Core Mine -> Gold -> Rare Metals
- Landing Pad -> Trade Gold for Helium-3

---

## 7. Tuning Knobs

### 7.1 Core Production Rates

| Parameter | Default | Safe Range | Affects | Rationale |
|-----------|---------|------------|---------|-----------|
| `SOLAR_ARRAY_OUTPUT` | 1 | 0.5 - 2 | Energy/5s | Balance early game power |
| `ICE_DRILL_OUTPUT` | 1 | 0.5 - 3 | Ice/5s | Clicking vs auto balance |
| `WATER_EXTRACTOR_RATIO` | 1 | 0.5 - 2 | Ice -> Water Ice | Water Ice scarcity |
| `OXYGEN_GENERATOR_RATE` | 1 | 0.5 - 2 | Oxygen/15s | Colonist capacity |
| `ORE_PROCESSOR_OUTPUT` | 1 | 0.5 - 2 | Iron/20s | Tier 2 progression pace |
| `GREENHOUSE_GROW_TIME` | 60 | 30 - 120 | Seconds per crop | Late game Helium-3 income |
| `DEEP_CORE_GOLD_RATE` | 1 | 0.5 - 3 | Gold/60s | Late game pacing |

### 7.2 Cost Scaling

| Parameter | Default | Safe Range | Affects | Rationale |
|-----------|---------|------------|---------|-----------|
| `BUILDING_COST_SCALE` | 1.15 | 1.05 - 1.3 | Exponential growth | Late game grind |
| `TIER_2_MULTIPLIER` | 1.5 | 1.2 - 2.0 | Tier 2 building cost | Upgrade incentive |
| `TIER_3_MULTIPLIER` | 2.0 | 1.5 - 3.0 | Tier 3 building cost | Late game value |
| `LAND_EXPANSION_BASE` | 10 | 5 - 25 | He-3 cost per expansion | Grid progression |

### 7.3 Time-Based Parameters

| Parameter | Default | Safe Range | Affects | Rationale |
|-----------|---------|------------|---------|-----------|
| `OFFLINE_CAP_HOURS` | 8 | 1 - 24 | Max offline production | Daily engagement |
| `STORAGE_CAP_BASE` | 1000 | 500 - 5000 | Base resource storage | Resource pressure |
| `PRODUCTION_TICK_MS` | 1000 | 100 - 5000 | Game loop precision | Performance |
| `AUTOSAVE_INTERVAL_MS` | 30000 | 10000 - 60000 | Save frequency | Data safety |

### 7.4 Progression Gates

| Parameter | Default | Safe Range | Affects | Rationale |
|-----------|---------|------------|---------|-----------|
| `LEVEL_FOR_TIER2` | 4 | 3 - 6 | When Tier 2 unlocks | Early-mid transition |
| `LEVEL_FOR_TIER3` | 7 | 5 - 9 | When Tier 3 unlocks | Mid-late transition |
| `LEVEL_FOR_FUSION` | 8 | 7 - 10 | Fusion Reactor access | Endgame start |
| `LEVEL_FOR_PRESTIGE` | 10 | 8 - 12 | Prestige unlock | Max level goal |

### 7.5 Energy Balance

| Parameter | Default | Safe Range | Affects | Rationale |
|-----------|---------|------------|---------|-----------|
| `BATTERY_STORAGE` | 500 | 250 - 1000 | Solar Power buffer | Power stability |
| `OXYGEN_DRAIN_COLONIST` | 0.1 | 0.05 - 0.2 | Oxygen/sec/colonist | Colonist pressure |
| `CRITICAL_POWER_THRESHOLD` | 0 | - | When blackout triggers | Warning time |
| `BLACKOUT_DELAY_SEC` | 30 | 15 - 60 | Time before penalty | Recovery window |

### 7.6 Currency and Economy

| Parameter | Default | Safe Range | Affects | Rationale |
|-----------|---------|------------|---------|-----------|
| `HELIUM3_CROP_PRICE` | 5 | 2 - 10 | He-3 per Lunar Wheat | Late game income |
| `HELIUM3_SELL_RATIO` | 0.1 | 0.05 - 0.2 | He-3 gained per sale | Economy balance |
| `STARTING_COINS` | 100 | 50 - 200 | Initial coins | Early flexibility |
| `COIN_SELL_MULTIPLIER` | 1.0 | 0.5 - 2.0 | Resource -> coins | Alternative income |

### 7.7 Prestige Parameters

| Parameter | Default | Safe Range | Affects | Rationale |
|-----------|---------|------------|---------|-----------|
| `PRESTIGE_HE3_MULTIPLIER` | 0.1 | 0.05 - 0.2 | He-3 bonus per prestige | Prestige reward |
| `PRESTIGE_SPEED_MULTIPLIER` | 0.05 | 0.02 - 0.1 | Speed bonus per prestige | Prestige reward |
| `MIN_LEVEL_PRESTIGE` | 10 | 8 - 12 | Minimum level to prestige | Prestige gate |

---

## 8. Acceptance Criteria

### 8.1 Phase 1: Early Game (0-30 min)

#### Functional Criteria

- [ ] Player can click Ice nodes and receive Ice (1 Ice per click)
- [ ] Player can click Regolith nodes and receive Regolith (1 per click)
- [ ] Player can build Solar Array and it produces 1 Solar Power/5s
- [ ] Player can build Water Extractor with correct cost (20 Ice, 10 Regolith)
- [ ] Water Extractor converts Ice to Water Ice (1/10s, consumes 1 Solar Power/10s)
- [ ] Player can build Ice Drill with correct cost (30 Regolith, 5 Iron)
- [ ] Ice Drill auto-harvests Ice when powered (1/5s)
- [ ] Tutorial prompts guide player through first 3 objectives
- [ ] Level increases after XP thresholds (100 XP for Level 2)
- [ ] Game state persists after page refresh

#### Experiential Criteria

- [ ] Clicking feels satisfying (visual feedback, sound optional)
- [ ] First Solar Array placement feels like an achievement
- [ ] First Water Ice produced feels like a milestone
- [ ] UI clearly shows available actions
- [ ] Power balance is introduced but not punishing
- [ ] Player understands "what to do next" without external guides

#### Performance Criteria

- [ ] Page loads in under 3 seconds
- [ ] Click response is instantaneous (<100ms)
- [ ] Production tick is smooth (no jank)
- [ ] No console errors during normal play

### 8.2 Phase 2: Mid Game (30min-2h)

#### Functional Criteria

- [ ] Player can build Oxygen Generator (Tier 2 building)
- [ ] Oxygen Generator converts Water Ice to Oxygen
- [ ] Player can build Greenhouse and grow Lunar Wheat
- [ ] Lunar Wheat can be sold for Helium-3
- [ ] Player can expand land (8x8 grid) with 10 Helium-3
- [ ] Player can build Battery Bank to increase energy storage
- [ ] Player can build Ore Processor to produce Iron
- [ ] Level 6 unlocks Oxygen Generator and Greenhouse
- [ ] Production chains work without manual intervention
- [ ] Offline production calculates correctly on return

#### Experiential Criteria

- [ ] Player feels "building a real colony"
- [ ] Multiple production chains running simultaneously feels powerful
- [ ] Helium-3 income feels rewarding
- [ ] Land expansion feels like a meaningful choice
- [ ] Player，开始思考 optimization rather than just building

#### Performance Criteria

- [ ] 10+ buildings run simultaneously without lag
- [ ] Production calculations complete in <50ms per tick
- [ ] UI remains responsive during complex production states

### 8.3 Phase 3: Late Game (2-5h)

#### Functional Criteria

- [ ] Player can build Deep Core Mine (Tier 3 building)
- [ ] Deep Core Mine extracts Gold and Rare Metals
- [ ] Player can build Fusion Reactor (massive energy production)
- [ ] Fusion Reactor consumes Helium-3 for energy
- [ ] Player can build Landing Pad for Earth trade
- [ ] Level 8 unlocks Fusion Reactor
- [ ] Level 9 unlocks Landing Pad
- [ ] Helium-3 becomes primary currency
- [ ] Tier 3 upgrades available (2x production multiplier)

#### Experiential Criteria

- [ ] Gold extraction feels rare and valuable
- [ ] Fusion Reactor feels like a game-changer (energy abundance)
- [ ] Landing Pad feels like opening a new dimension
- [ ] Player transitions from "builder" to "optimizer"

#### Performance Criteria

- [ ] 30+ buildings run simultaneously
- [ ] Complex chains (10+ steps) calculate correctly
- [ ] Large numbers display correctly (up to 1 trillion)

### 8.4 Phase 4: End Game (5h+)

#### Functional Criteria

- [ ] Player can reach Level 10 (max level)
- [ ] Command Center Tier 3 available at Level 10
- [ ] All 5 land expansions purchasable
- [ ] Prestige system unlocks at Level 10
- [ ] Prestige resets colony but gives permanent bonuses
- [ ] Helium-3 multiplier applies correctly after prestige
- [ ] Production speed bonus applies after prestige
- [ ] Achievements track correctly
- [ ] All buildings remain functional after prestige

#### Experiential Criteria

- [ ] Reaching Level 10 feels like "winning"
- [ ] Prestige feels rewarding, not punishing
- [ ] New game+ feels different from fresh start
- [ ] Player has clear goals beyond Level 10
- [ ] Endgame is about mastery, not grind

#### Performance Criteria

- [ ] Game state handles multiple prestige cycles
- [ ] Cumulative bonuses calculate correctly
- [ ] Save file size remains manageable (<10MB)

---

## Appendix: Phase Transition Checklist

### Early -> Mid Transition (Level 4)

- [ ] At least 1 Water Extractor running
- [ ] At least 1 Ice Drill running
- [ ] Solar Power production >= 3/s
- [ ] 100+ Ice accumulated
- [ ] Land Expansion option available (8x8)

### Mid -> Late Transition (Level 7)

- [ ] At least 1 Oxygen Generator running
- [ ] At least 1 Greenhouse running
- [ ] Helium-3 income established (>1/minute)
- [ ] Deep Core Mine unlocked
- [ ] Battery Bank built for power stability

### Late -> End Transition (Level 10)

- [ ] Fusion Reactor operational
- [ ] Landing Pad built
- [ ] All land expansions purchased
- [ ] 10,000+ lifetime Helium-3 earned
- [ ] Command Center Tier 2 upgraded

---

*Document Version: 1.0*
*Created: 2026-03-28*
*Status: Initial Draft*
*Author: Game Designer Agent*
