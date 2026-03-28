# ICE DRILL: Lunar Colony — Project Plan

## Status

**Phase**: Pre-Production — Design Complete, Implementation Pending

## Overview

A Sunflower Land-inspired lunar colony idle/incremental game built with Next.js + React. Players extract lunar resources (Ice, Regolith, Minerals), build survival structures, and develop a self-sufficient colony on the Moon.

## Reference Documents

- [`design/gdd/ICE-DRILL-GAME-DESIGN.md`](design/gdd/ICE-DRILL-GAME-DESIGN.md) — Core gameplay, economy, resources, production chains
- [`design/gdd/ICE-DRILL-ART-DIRECTION.md`](design/gdd/ICE-DRILL-ART-DIRECTION.md) — Visual identity, color palette, asset requirements, MiniMax prompts
- [`design/gdd/ICE-DRILL-SYSTEMS-INDEX.md`](design/gdd/ICE-DRILL-SYSTEMS-INDEX.md) — Architecture, systems breakdown, implementation order

## Game Summary

### Core Loop
```
Click Resource Nodes → Collect Raw Resources → Process into Items → Sell for Currency → Buy Buildings → Expand Colony
```

### Resources (Tier-based)
- **Tier 1**: Ice, Regolith, Solar Power (click nodes)
- **Tier 2**: Water, Oxygen, Iron, Lunar Crops (processed)
- **Tier 3**: Gold, Helium-3, Rare Metals (advanced)

### Production Chains
1. **Water**: Ice + Solar Power → Water Ice
2. **Food**: Water + Lunar Wheat Seed → Lunar Crops
3. **Metals**: Regolith + Energy → Iron → Gold
4. **Energy**: Solar Arrays (passive generation)

### Buildings
- Solar Arrays (energy)
- Ice Drill (ice extraction)
- Water Extractor (water production)
- Greenhouse (crop farming)
- Ore Processor (metal extraction)
- Trade Post (selling)

### Currency
- **Helium-3** — premium currency for expansion
- **Coins** — standard currency for basic purchases

---

## Architecture

### Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + custom CSS
- **State**: React Context + useReducer
- **Persistence**: localStorage (no backend for MVP)
- **Assets**: MiniMax image generation (50/day)

### File Structure
```
src/
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx           # Main game component
│   └── globals.css         # Global styles + Tailwind
├── components/
│   ├── game/
│   │   ├── Game.tsx       # Main game container
│   │   ├── HUD.tsx        # Resource bar, stats
│   │   ├── Land.tsx       # Grid/plot visualization
│   │   ├── Grid.tsx       # Individual plot cells
│   │   ├── Buildings.tsx  # Building visuals
│   │   └── Modals/        # Shop, inventory, etc.
│   ├── ui/                # Reusable UI components
│   └── assets/            # Generated pixel art
├── systems/
│   ├── GameState.ts       # Central game state
│   ├── ResourceSystem.ts   # Resource tracking
│   ├── ProductionSystem.ts # Timed production
│   ├── BuildingSystem.ts   # Building placement
│   ├── PlotSystem.ts      # Land management
│   ├── SaveSystem.ts      # localStorage persistence
│   └── NotificationSystem.ts
├── hooks/
│   ├── useGameState.ts    # Central state hook
│   ├── useAutosave.ts     # Auto-save logic
│   └── useProduction.ts   # Production tick loop
├── types/
│   └── game.ts            # All TypeScript interfaces
└── lib/
    ├── constants.ts       # Game constants
    ├── utils.ts           # Helper functions
    └── balance.ts         # Balance formulas
```

---

## Implementation Phases

### Phase 1: Core Foundation
- [ ] Set up project structure (directories, base files)
- [ ] TypeScript interfaces (GameState, Resources, Buildings, Plots)
- [ ] Game state context with useReducer
- [ ] Basic save/load system
- [ ] Core CSS with Tailwind + custom properties

### Phase 2: Resource System
- [ ] Resource definitions and constants
- [ ] Resource tracking in game state
- [ ] Resource display in HUD
- [ ] Basic inventory

### Phase 3: Land/Grid System
- [ ] Grid layout (4x4 initial plots)
- [ ] Plot states (empty, occupied, locked)
- [ ] Visual grid with zone colors
- [ ] Plot selection

### Phase 4: Building System
- [ ] Building definitions (type, cost, produces, consumes)
- [ ] Building placement on plots
- [ ] Building production (timed)
- [ ] Building visuals (SVG-based for MVP)

### Phase 5: Production System
- [ ] Production tick loop (game loop)
- [ ] Resource consumption logic
- [ ] Resource generation logic
- [ ] Progress bars

### Phase 6: Economy
- [ ] Trade Post / selling interface
- [ ] Currency (coins, Helium-3)
- [ ] Price definitions
- [ ] Sell actions

### Phase 7: Polish & UI
- [ ] Notifications system
- [ ] Modal panels (shop, inventory)
- [ ] Visual feedback (harvest popups, animations)
- [ ] Loading states

### Phase 8: Assets
- [ ] Generate pixel art with MiniMax
- [ ] Replace SVG placeholders with real assets
- [ ] Art polish

---

## Current Sprint

### Sprint 1: Foundation + Resource System + Basic Grid
**Goal**: Playable game with clicking and basic economy

**Deliverables**:
- Project structure in place
- TypeScript interfaces defined
- React Context for game state
- 3 resource types (Ice, Solar Power, Coins)
- 3x3 grid visualization
- Click to collect resources
- Sell interface

**Duration**: TBD

---

## Next Actions

1. Review design documents with user
2. Approve game concept and architecture
3. Start Phase 1 implementation

---

## Open Questions

- [ ] Grid size for MVP? (3x3, 4x4?)
- [ ] Mobile-first approach confirmed?
- [ ] Asset generation order?

---

## Notes

- Reference repo `sunflower-land-reference/` deleted — we only keep the design docs
- Old `page.tsx` and `globals.css` in `src/app/` will be replaced during Phase 1
- All agents have validated the approach (Game Designer, Art Director, Systems Designer)
