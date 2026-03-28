# Sprint 001 — ICE DRILL MVP

> **Sprint Duration**: 1 week
> **Goal**: Functional idle-clicker prototype playable in browser
> **Status**: In Progress
> **Started**: 2026-03-28

---

## Objective

Deliver a playable ICE DRILL prototype that validates the core loop: **click drill → accumulate ice → ship to Mars → earn credits → upgrade**.

Success criteria:
- Player can click to extract ice
- Ice accumulates automatically (idle)
- Player can ship ice to Mars manually
- Player can spend credits on 3 upgrade trees
- Game state persists across browser sessions
- No critical bugs or crashes

---

## Deliverables

### Core Systems (COMPLETE)
- [x] Drill system (click + idle accumulation)
- [x] Storage system (capacity limits)
- [x] Shipment system (Mars transit, credit rewards)
- [x] Upgrade system (3 trees: Drill, Storage, Logistics)
- [x] Save/Load system (localStorage auto-save)
- [x] Basic UI/HUD

### Polish & Juice (TODO)
- [ ] Visual feedback on click (shake, particles)
- [ ] Animated drill visual
- [ ] Shipment launch animation
- [ ] Number formatting improvements
- [ ] Sound effects (optional for MVP)

### Documentation (TODO)
- [ ] README.md with instructions
- [ ] Game concept docs finalized

---

## Technical Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Rendering**: React + CSS (no canvas yet — DOM-based for speed)
- **State**: React hooks + localStorage
- **Deployment**: Ready for Vercel

---

## File Structure

```
src/app/
├── page.tsx          # Main game (all systems in one file for prototype)
├── layout.tsx        # Root layout
└── globals.css      # Space theme styles
```

---

## Next Steps After Sprint 1

1. **Playtest** — Get feedback on core loop feel
2. **Anomalies System** — Random lunar events (P1)
3. **Contracts System** — Milestone objectives (P1)
4. **Canvas Rendering** — Replace DOM with Canvas for better visuals
5. **Refinery System** — Ice → Water conversion (P2)

---

## Blockers

- None currently

---

## Notes

- MVP is intentionally minimal to test hypothesis fast
- All systems in single file for easy iteration
- Design docs in `design/gdd/` for reference
