# Technical Preferences

<!-- Populated by /setup-engine. Updated as the user makes decisions throughout development. -->
<!-- All agents reference this file for project-specific standards and conventions. -->

## Engine & Language

- **Engine**: Next.js + Canvas API
- **Language**: TypeScript (strict mode)
- **Rendering**: HTML5 Canvas (game view) + React (UI overlay)
- **Physics**: N/A (idle game, no physics)

## Naming Conventions

- **Classes**: PascalCase (e.g., `GameState`, `BuildingState`, `ProductionState`)
- **Variables**: camelCase (e.g., `helium3`, `solarPower`, `colonistLevel`)
- **Signals/Events**: N/A (React/Canvas stack — use callbacks and event handlers)
- **Files**: kebab-case with functional suffixes:
  - `*.system.ts` — Pure state transformers (e.g., `resource-system.ts`)
  - `*.types.ts` — TypeScript interfaces (e.g., `game.types.ts`)
  - `*.data.ts` — Static configuration (e.g., `buildings.data.ts`)
  - `*.hooks.ts` — Custom React hooks (e.g., `use-game-loop.hooks.ts`)
  - `select*.ts` — State selectors (e.g., `selectors.ts`)
- **Scenes/Prefabs**: N/A (no game engine — React components replace scenes)
- **Constants**: SCREAMING_SNAKE_CASE (e.g., `BUILDING_COST_SCALE`, `OFFLINE_CAP_HOURS`, `PRODUCTION_TICK_MS`)

## Performance Budgets

- **Target Framerate**: 60 FPS stable (Canvas animations + React UI)
- **Frame Budget**: 16.67ms (100ms UI tick for React state, 1000ms production tick)
- **Draw Calls**: Minimal (Canvas reserved for particle effects only; React handles UI)
- **Memory Ceiling**: < 100MB after 1 hour of idle gameplay
- **Initial Load**: < 3s (Lighthouse target)
- **Click Response**: < 100ms (Performance API target)
- **Production Tick**: < 50ms (Performance.mark target)
- **Save/Load**: < 500ms (localStorage serialization)

## Testing

- **Framework**: Vitest (Jest-compatible, standard for Next.js/React)
- **Minimum Coverage**:
  - `resourceSystem`: 100% (core economy)
  - `productionSystem`: 100% (core loop)
  - `currencySystem`: 100% (core economy)
  - `buildingSystem`: 90% (placement, upgrades, costs)
  - `offlineSystem`: 100% (offline calculation accuracy)
  - Reducer actions: 90% (all action types)
- **Required Tests**:
  - Balance formulas (from ECONOMY doc — production rates, cost scaling, XP curves)
  - Gameplay systems (click reward, building placement, production cycles)
  - Save/load with migration (schema versioning)
  - Offline production calculation (8-hour cap verification)
- **Test Utilities**: `@testing-library/react` for component tests, `decimal.js` for precise assertion helpers

## Forbidden Patterns

<!-- Add patterns that should never appear in this project's codebase -->
- **Direct state mutation** — All state changes must use spread operators or Immer; no `state.foo = bar`
- **Native JavaScript numbers for currency/resources** — Must use `Decimal.js` string storage; precision loss is a game-breaking bug
- **Hardcoded tuning values** — All gameplay values must live in `constants.ts`; never `Math.floor(1.15 ** n)` inline
- **Synchronous localStorage in render path** — Save/load must be async to avoid blocking UI
- **Side effects in system functions** — Systems are pure: `(state, action) => newState`; no API calls, no timers, no DOM access
- **`any` types** — TypeScript strict mode; only allowed in migration code where schema is unknown
- **Commented-out code in production** — Remove dead code instead of commenting it
- **Blocking `requestAnimationFrame`** — Keep frame callbacks under 1ms; defer heavy work to Web Workers if needed

## Allowed Libraries / Addons

<!-- Add approved third-party dependencies here -->
- `decimal.js` ^10.4.0 — Precise monetary calculations (required for idle game economics)
- `react` 19.x — UI framework (required by Next.js)
- `next` 16.x — Framework (user preference)
- `tailwindcss` ^4.0 — Styling (rapid UI development)
- `vitest` — Testing framework (standard for Next.js)

## Architecture Decisions Log

<!-- Quick reference linking to full ADRs in docs/architecture/ -->
- **ADR-001**: Systems-over-Objects (SFP) architecture — Pure functions transform immutable state; no mutations
- **ADR-002**: Single source of truth via `GameState` + `useReducer` — All state flows through central reducer
- **ADR-003**: Decimal.js for all monetary calculations — Native JS Number loses precision beyond 2^53
- **ADR-004**: 100ms UI tick / 1000ms production tick — Balances responsiveness with performance
- **ADR-005**: localStorage persistence with JSON serialization — No backend; client-only save system
- **ADR-006**: No backend / pure client-side — No multiplayer, no anti-cheat, trust client model
- **ADR-007**: React Context + useReducer for state management — No external state library needed
- **ADR-008**: Offline production capped at 8 hours — Prevents abuse while rewarding daily play

---

*Last updated: 2026-03-28*
*Reasoning: Initial configuration based on ICE-DRILL-TECHNICAL.md and ICE-DRILL-ECONOMY.md*
