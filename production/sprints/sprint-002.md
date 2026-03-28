# Sprint 002 — PR #2 Completion + Building Management

> **Sprint Duration**: 1 week
> **Goal**: Finaliser la persistence + UI de gestion des bâtiments
> **Status**: Planned
> **Start**: 2026-03-28

---

## Sprint Goal

Compléter PR #2 (Persistence + Trade UI) et PR #4 (Building Panel + Upgrades UI) pour avoir un jeu jouable avec sauvegarde, commerce, et gestion des bâtiments.

## Ce qui est DEJA fait (session précédente)

| Fichier | Status |
|---------|--------|
| `src/systems/SaveSystem.ts` | ✅ Complete |
| `src/hooks/useAutosave.ts` | ✅ Complete |
| `src/components/game/TradePanel.tsx` | ✅ Complete |
| `src/systems/NotificationSystem.ts` | ✅ Complete |
| `src/context/NotificationContext.tsx` | ✅ Complete |
| `src/components/game/Notifications.tsx` | ✅ Complete |
| `src/components/game/FloatingNumber.tsx` | ✅ Complete |
| `src/components/game/BuildingInfoPanel.tsx` | ✅ Complete |
| `preview/page.tsx` (BuildingInfoPanel integration) | ✅ Complete |

---

## Tasks

### Must Have (Critical Path)

| ID | Task | Owner | Est. Days | Dependencies | Acceptance Criteria |
|----|------|-------|-----------|-------------|-------------------|
| S2-01 | PR #2 Acceptance Criteria validation | dev | 0.5 | SaveSystem, useAutosave | Save < 500ms, offline time correct, sell flow works |
| S2-02 | Fix autosave lastSaveRef bug (QA-002) | dev | 0.25 | SaveSystem | lastSaveRef only updates on successful save |
| S2-03 | Trade panel slider state reset (QA-003) | dev | 0.25 | TradePanel | Slider resets when changing trade option |
| S2-04 | PR #4: Building selection highlight | dev | 0.5 | BuildingInfoPanel | Clicked building shows visual highlight on grid |
| S2-05 | PR #4: Upgrade formula alignment | dev | 0.5 | GameContext | UPGRADE_BUILDING uses cost*level*1.5, production*level*1.8 |

### Should Have

| ID | Task | Owner | Est. Days | Dependencies | Acceptance Criteria |
|----|------|-------|-----------|-------------|-------------------|
| S2-06 | QA review complet des PR #2 et #4 | qa-tester | 0.5 | Must have done | Aucun S1/S2 bug, criteria passent |
| S2-07 | Tests unitaires pour NotificationSystem | dev | 0.5 | Notifications | 100% coverage sur NotificationSystem |

### Nice to Have

| ID | Task | Owner | Est. Days | Dependencies | Acceptance Criteria |
|----|------|-------|-----------|-------------|-------------------|
| S2-08 | Click particle effect (sma | dev | 0.5 | None | Particules au clic sur grille |
| S2-09 | README.md draft | dev | 0.5 | Game playable | Instructions basiques |

---

## Carryover from Sprint 001

| Task | Reason | New Estimate |
|------|--------|------------|
| None | Sprint 001 a été completé | - |

---

## Risks

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Production chains plus complexes que prévu | Medium | High | Buffer de 1j réservé, option defer vers sprint 003 |
| Bug softlock si resources insuffisantes | Low | High | Tests de non-regression |

---

## Dependencies on External Factors

- Aucune dépendance externe (tout localStorage, pas d'API)

---

## Definition of Done for this Sprint

- [ ] Toutes les tâches Must Have sont complètes
- [ ] PR #2 acceptance criteria passent
- [ ] PR #4 acceptance criteria passent
- [ ] Aucun S1 ou S2 bug dans les features livrées
- [ ] Build passe sans erreur
- [ ] Tests unitaires pour NotificationSystem passent

---

## PR #2 Acceptance Criteria (à valider)

- [ ] Game state persists across page refresh
- [ ] Offline time calculated on return (max 8 hours)
- [ ] Can sell ice for helium3
- [ ] Trade panel opens/closes correctly
- [ ] No console errors on save/load
- [ ] Save completes in < 500ms

## PR #4 Acceptance Criteria (à valider)

- [ ] Tap building on grid → panel shows details
- [ ] Upgrade button disabled when can't afford
- [ ] Upgrade increases level and production
- [ ] Level 3 is max — upgrade button hidden after
- [ ] Upgrades persist across save/load
