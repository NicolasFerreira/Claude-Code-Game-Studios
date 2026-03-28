# ICE DRILL — PR-Based Project Plan

## Overview

This document defines the pull-request roadmap for ICE DRILL lunar colony idle game. Each PR is designed to be:
- **Reviewable** in a single sitting (under 2 hours)
- **Deliverable** with complete, testable functionality
- **Independent** with clear dependencies documented

**Total Estimated PRs**: 9
**Current Status**: Sprint 002 in Progress (PR #2 + #4)

---

## PR Status Summary

| PR | Title | Status | Dependencies |
|----|-------|--------|--------------|
| #1 | Core Foundation | DONE | None |
| #2 | Persistence + Trade UI | DONE (Sprint 002) | #1 |
| #3 | Full Resource System + Production Chains | PLANNED (Sprint 003) | #1 |
| #4 | Building Panel + Upgrades UI | IN PROGRESS (Sprint 002) | #2 |
| #5 | Notifications + Feedback | DONE (Sprint 002) | #2 |
| #6 | Main Menu + Settings | PLANNED | #4, #5 |
| #7 | Assets + Visual Polish | PLANNED (en attente images) | #4 |
| #8 | Land Expansion + Advanced Buildings | PLANNED | #3, #6 |
| #9 | Tutorial + Final Polish | PLANNED | #7, #8 |

---

## PR #1 — Core Foundation (COMPLETE)

### Summary
Playable prototype with 7x7 grid, click-to-collect ice, basic buildings, and production tick.

### Files Changed
```
src/types/game.ts
src/systems/ResourceSystem.ts
src/context/GameContext.tsx
src/components/game/HUD.tsx
src/hooks/useGameSelector.ts
src/app/page.tsx
src/app/globals.css
```

### Deliverables
- [x] TypeScript types (ResourceType, BuildingType, GameState, GameAction)
- [x] React Context with useReducer state management
- [x] 7x7 grid with pan/zoom
- [x] Click to collect ice
- [x] Building placement (drill, solar, water, dome)
- [x] Resource HUD (ice, solarEnergy, helium3)
- [x] Building production tick (100ms interval)

---

## PR #2 — Persistence + Trade UI

### Title
`feat: localStorage persistence and trade/sell interface`

### Rationale
**Persistence** is critical — without save/load, players lose progress on refresh. **Trade UI** provides the core feedback loop: collect → sell → buy → expand. These are small, focused, and both enhance the core loop immediately.

### Files Changed
```
src/systems/SaveSystem.ts          (NEW)
src/hooks/useAutosave.ts           (NEW)
src/components/game/TradePanel.tsx (NEW)
src/components/game/HUD.tsx       (MODIFIED — add trade button)
src/context/GameContext.tsx       (MODIFIED — integrate autosave)
```

### Deliverables
- [x] `SaveSystem` with `save()`, `load()`, `deleteSave()`, `hasSave()`
- [x] `useAutosave` hook — auto-save every 30s + on significant actions
- [x] Save on page unload (`beforeunload` event)
- [x] Version migration support in save format
- [x] Trade panel modal with sell buttons
- [x] Price list display (configurable)
- [x] Sell action with confirmation
- [x] Visual feedback when selling

### Dependencies
- **Requires**: PR #1

### Acceptance Criteria
- [ ] Game state persists across page refresh
- [ ] Offline time calculated on return (max 8 hours)
- [ ] Can sell ice for helium3
- [ ] Trade panel opens/closes correctly
- [ ] No console errors on save/load
- [ ] Save completes in < 500ms

---

## PR #3 — Full Resource System + Production Chains

### Title
`feat: complete resource types and production chains`

### Rationale
The current system only has 3 resources (ice, solarEnergy, helium3). We need to add **water, oxygen, iron, gold, regolith** to enable the production chains from the design doc. This also adds **resource consumption** — buildings currently only produce, they don't consume solarEnergy.

### Files Changed
```
src/types/game.ts                 (MODIFIED — add new resource types)
src/systems/ResourceSystem.ts     (MODIFIED — update BUILDINGS data)
src/systems/ProductionSystem.ts   (NEW — consumption logic)
src/systems/BuildingDefinitions.ts (NEW — complete building costs/production)
src/context/GameContext.tsx       (MODIFIED — add consumption to TICK)
src/components/game/HUD.tsx       (MODIFIED — show all resources)
```

### Deliverables
- [x] All 9 resource types: ice, regolith, solarEnergy, water, oxygen, iron, gold, helium3, lunarWheat
- [x] Complete building definitions with costs:
  - Solar Array: 10 regolith → 1 solarPower/5s
  - Water Extractor: 20 ice, 10 regolith → 1 water/10s (consumes 1 solarPower/10s)
  - Ice Drill: 30 regolith, 5 iron → 1 ice/5s (consumes 1 solarPower/5s)
  - Greenhouse: 40 ice, 20 water → 1 lunarWheat/30s (consumes 2 solarPower/30s)
  - Ore Processor: 50 iron → 1 gold/60s (consumes 3 solarPower/60s)
- [x] Production chains visualized:
  - Ice → Water Extractor → Water Ice
  - Water Ice → Greenhouse → Lunar Wheat
  - Regolith + Solar Power → Iron
  - Iron → Ore Processor → Gold
- [x] Building costs display on hover
- [x] Resource caps (base 1000, overflow lost)

### Dependencies
- **Requires**: PR #1

### Acceptance Criteria
- [ ] All 9 resource types display in HUD
- [ ] Building costs shown before placement
- [ ] Production chains function correctly
- [ ] Buildings consume resources when active
- [ ] Insufficient resources prevent building activation
- [ ] Visual indicator when building is "starved" (no power)

---

## PR #4 — Building Panel + Upgrades UI

### Title
`feat: building management panel and upgrade system`

### Rationale
Players need to see building details, upgrade them, and manage their colony. The current building placement is functional but has no UI for **selecting**, **viewing stats**, or **upgrading**. This PR adds the building management layer.

### Files Changed
```
src/components/game/BuildingPanel.tsx  (NEW)
src/components/game/BuildingCard.tsx   (NEW)
src/components/game/BuildingTooltip.tsx (NEW)
src/components/game/Grid.tsx           (MODIFIED — add selection)
src/context/GameContext.tsx            (MODIFIED — add SELECT_BUILDING action)
```

### Deliverables
- [x] Building panel slide-out (right side)
- [x] Building cards showing:
  - Name, level, position
  - Current production rate
  - Upgrade cost (next tier)
  - Upgrade button
- [x] Building selection (tap building on grid)
- [x] Selected building highlighted
- [x] Upgrade action with cost deduction
- [x] Upgrade formula: `cost * level * 1.5`, `production * level * 1.8`
- [x] Max level (3)

### Dependencies
- **Requires**: PR #2 (persistence so upgrades save)

### Acceptance Criteria
- [ ] Tap building on grid → panel shows details
- [ ] Upgrade button disabled when can't afford
- [ ] Upgrade increases level and production
- [ ] Level 3 is max — upgrade button hidden after
- [ ] Upgrades persist across save/load

---

## PR #5 — Notifications + Feedback

### Title
`feat: notification system and tactile feedback`

### Rationale
**Notifications** tell the player what's happening (production complete, can't afford, achievement). **Feedback** makes clicking satisfying (particles, floating numbers). This is pure polish but critical for game feel.

### Files Changed
```
src/systems/NotificationSystem.ts     (NEW)
src/hooks/useNotification.ts          (NEW)
src/components/game/Notifications.tsx (NEW)
src/components/game/Grid.tsx          (MODIFIED — add click feedback)
src/components/game/FloatingNumber.tsx (NEW)
src/hooks/useFloatingText.ts          (NEW)
```

### Deliverables
- [x] Toast notification system (success/error/info/warning)
- [x] Notification queue (max 3 visible)
- [x] Auto-dismiss (3 seconds default)
- [x] Click feedback:
  - Floating "+1 Ice" text
  - Small particle burst
  - Scale animation on grid cell
- [x] Production complete notification
- [x] Insufficient resources warning
- [x] Achievement unlocked toast

### Dependencies
- **Requires**: PR #2

### Acceptance Criteria
- [ ] Click on grid → floating number appears
- [ ] Sell completes → success toast
- [ ] Can't afford → error toast
- [ ] Notifications stack correctly
- [ ] No notification spam (debounced)

---

## PR #6 — Main Menu + Settings

### Title
`feat: main menu, settings, and new game flow`

### Rationale
A proper **main menu** provides entry point, new game option, and settings. This also includes **tutorial hints** for new players. Without this, the game starts directly into gameplay with no onboarding.

### Files Changed
```
src/components/game/MainMenu.tsx      (NEW)
src/components/game/Settings.tsx     (NEW)
src/components/game/TutorialHints.tsx (NEW)
src/app/page.tsx                     (MODIFIED — route to menu or game)
src/systems/SaveSystem.ts             (MODIFIED — add export/import)
```

### Deliverables
- [x] Main menu screen:
  - "Continue" (if save exists) / "New Game"
  - "How to Play" tutorial overlay
  - Settings button
- [x] Settings panel:
  - Sound on/off
  - Music volume slider
  - Reset progress (with confirmation)
- [x] Tutorial hints system (first 5 minutes):
  - "Click ice nodes to collect resources"
  - "Build a Solar Array to generate power"
  - "Connect buildings with Solar Power"
- [x] Export save as JSON
- [x] Import save from JSON
- [x] "Colony Level" display in HUD

### Dependencies
- **Requires**: PR #4, PR #5

### Acceptance Criteria
- [ ] Menu appears on fresh load
- [ ] Continue loads saved game
- [ ] New Game resets state
- [ ] Tutorial hints appear in correct order
- [ ] Settings persist across sessions
- [ ] Export produces valid JSON
- [ ] Import restores from JSON

---

## PR #7 — Assets + Visual Polish

### Title
`feat: replace placeholders with pixel art assets`

### Rationale
The current game uses placeholder visuals (solid colors, basic shapes). This PR replaces them with **MiniMax-generated pixel art** for buildings, resources, and UI elements. Also adds **animations** and **visual polish**.

### Files Changed
```
public/assets/resources/           (NEW — resource sprites)
public/assets/buildings/          (NEW — building sprites)
public/assets/ui/                 (NEW — UI elements)
src/components/game/Grid.tsx      (MODIFIED — use sprites)
src/components/game/Buildings.tsx  (MODIFIED — use sprites)
src/components/game/HUD.tsx       (MODIFIED — use sprites)
src/app/globals.css               (MODIFIED — animations)
```

### Deliverables
- [x] Resource sprites (ice, regolith, solarEnergy, water, oxygen, iron, gold, helium3, lunarWheat)
- [x] Building sprites for all 6 buildings (solar, drill, water, greenhouse, ore, habitat)
- [x] Building animation (idle, working, starved states)
- [x] Grid cell highlight states (selected, hover, invalid)
- [x] Particle system for production
- [x] Background parallax (subtle moon surface)
- [x] Earth-rise in corner (decorative)

### Dependencies
- **Requires**: PR #4

### Acceptance Criteria
- [ ] All resources show correct sprite
- [ ] All buildings show correct sprite
- [ ] Buildings animate when producing
- [ ] Click feedback particles visible
- [ ] No broken image links

---

## PR #8 — Land Expansion + Advanced Buildings

### Title
`feat: land expansion and tier 2-3 content`

### Rationale
By now the player has a working colony. Time to **expand** (larger grid) and unlock **advanced content** (deep core mine, fusion reactor, tier 2-3 buildings). This adds the long-term progression loop.

### Files Changed
```
src/types/game.ts                 (MODIFIED — add ExpansionType)
src/systems/LandExpansion.ts      (NEW)
src/systems/AdvancedBuildings.ts   (NEW — tier 2-3 definitions)
src/components/game/ExpansionPanel.tsx (NEW)
src/components/game/Land.tsx      (MODIFIED — dynamic grid size)
src/app/page.tsx                  (MODIFIED — add expansion button)
```

### Deliverables
- [x] Land expansion system:
  - 6x6 → 8x8 (10 helium3)
  - 8x8 → 10x10 (25 helium3)
  - 10x10 → 12x12 (50 helium3)
- [x] Unlockable building tiers:
  - Tier 2 unlocks at Colony Level 3 (deep core mine, Hydroponic Bay)
  - Tier 3 unlocks at Colony Level 6 (fusion reactor, assembler)
- [x] Deep Core Mine: produces gold from rare deposits
- [x] Fusion Reactor: converts helium3 to massive solarEnergy
- [x] Helium3 extractor (rare, endgame)
- [x] New resource nodes on expanded land (iron, gold)

### Dependencies
- **Requires**: PR #3, PR #6

### Acceptance Criteria
- [ ] Can purchase land expansion
- [ ] Grid grows when expanding
- [ ] Tier 2 buildings unlock at correct level
- [ ] Tier 3 buildings unlock at correct level
- [ ] New resource nodes appear on expanded land
- [ ] Expansion costs helium3 correctly

---

## PR #9 — Tutorial + Final Polish

### Title
`feat: complete tutorial, achievements, and final polish`

### Rationale
The **final polish PR** completes the experience with a proper **tutorial** (guided first 10 minutes), **achievements**, and **endgame goals**. This makes the game feel complete and rewarding.

### Files Changed
```
src/systems/AchievementSystem.ts        (NEW)
src/components/game/AchievementToast.tsx (NEW)
src/components/game/Tutorial.tsx       (NEW — guided tour)
src/components/game/EndgameScreen.tsx  (NEW)
src/systems/ColonyLevel.ts             (NEW — XP and leveling)
src/components/game/ColonyLevelDisplay.tsx (NEW)
```

### Deliverables
- [x] Guided tutorial tour (modal step-by-step):
  - Step 1: Click ice node
  - Step 2: Build Solar Array
  - Step 3: Build Water Extractor
  - Step 4: Build Greenhouse
  - Step 5: Sell crops for helium3
- [x] Achievement system:
  - "First Steps" — Build your first building
  - "Energy Self-Sufficient" — 5 Solar Arrays running
  - "Water World" — Produce 100 water
  - "Green Thumb" — Harvest 10 lunar wheat
  - "Deep Pockets" — Collect 50 gold
  - "Colonist" — Reach Colony Level 5
  - "Lunar Pioneer" — Unlock all land expansions
- [x] Achievement toast (special animation)
- [x] Endgame screen when all achievements complete
- [x] Final balancing pass
- [x] Performance optimization (if needed)
- [x] Mobile touch optimization

### Dependencies
- **Requires**: PR #7, PR #8

### Acceptance Criteria
- [ ] Tutorial completes without errors
- [ ] Achievements trigger correctly
- [ ] Achievement toast shows with fanfare
- [ ] Endgame screen appears at completion
- [ ] Mobile touch works correctly
- [ ] 60 FPS maintained

---

## Implementation Notes

### Sprint Mapping

| Sprint | PRs | Title | Status |
|--------|-----|-------|--------|
| 1 | #1 | Core Foundation | DONE |
| 2 | #2, #4, #5 | Persistence + Trade + Notifications | IN PROGRESS |
| 3 | #3 | Full Resource System + Production Chains | PLANNED |
| 4 | #6 | Main Menu + Settings | PLANNED |
| 5 | #7 | Assets + Visual Polish | PLANNED |
| 6 | #8 | Land Expansion + Advanced Buildings | PLANNED |
| 7 | #9 | Tutorial + Final Polish | PLANNED |

*Note: PR #5 (Notifications) a été implémenté dans Sprint 002 en même temps que #2 et #4*

### Review Checklist for Each PR

- [ ] All acceptance criteria pass
- [ ] No S1/S2 bugs introduced
- [ ] Save/load still works
- [ ] Types updated if needed
- [ ] Design doc updated if mechanics changed
- [ ] Tests added for new logic

### Scope Boundaries

**Out of Scope for MVP** (post-PR #9):
- Multiplayer / visiting colonies
- Trading between players
- Seasonal events
- Mobile push notifications
- Cloud save (beyond localStorage)
- Sound effects / music (nice-to-have in PR #6-#7)

---

## Change Log

| Date | Version | Changes |
|------|---------|---------|
| 2026-03-28 | 1.0 | Initial plan created |
| 2026-03-28 | 1.1 | Updated to reflect actual PR #1 completion state |
| 2026-03-28 | 1.2 | Critical fixes: starting resources (50 ice, 20 solarEnergy), TypeScript null checks in useGameSelector, building costs displayed in UI, HUD/TradePanel use pixel-panel/pixel-btn classes |
