# ICE DRILL - UI/UX Design Document

## 1. Overview

### Design Philosophy: "Cozy Industrial Frontier"
L'interface utilisateur d'ICE DRILL incarne le mélange entre le pratique lunaire et le chaleureux Sunflower Land. Chaque interaction doit être immédiatement satisfaisante tout en restant fonctionnelle.

### Screens Principaux
1. **MainGame** - Vue principale avec HUD, grille, building selector
2. **MainMenu** - Menu principal avec Continue/New Game/How to Play/Settings
3. **Settings** - Volume, accessibilité, reset progress
4. **TradeModal** - Panel d'échange resources → Helium-3
5. **BuildingInfo** - Panel coulissant pour détails bâtiment/upgrade

### Objectifs UI
- Feedback immédiat sur chaque action
- Informations toujours visibles (ressources dans HUD)
- Navigation minimale (tout accessible en < 2 clicks)
- Mobile-first avec touch targets 44x44 minimum

---

## 2. Player Fantasy

### Early Game (0-30 min)
- **Feedback**: Chaque click montre "+1 Ice" qui flotte
- **Satisfaction**: Construcción rápida, rewards visibles
- **Indicator**: "Your first drill is producing!"

### Mid Game (30min-2h)
- **Feedback**: Production chains visibles, toasts de complétion
- **Satisfaction**: Optimisation des flux, upgrade disponibles
- **Indicator**: "Colony Level X" appears

### Late Game (2-5h)
- **Feedback**: Animations de bâtiments en parallel, particules
- **Satisfaction**: Grande base, production massive
- **Indicator**: Expansion available notification

### End Game (5h+)
- **Feedback**: Accomplishments, milestones atteinte
- **Satisfaction**: Prestige, collection complète
- **Indicator**: "Lunar Pioneer" achievement unlocked

---

## 3. Detailed Rules

### 3.1 Screen Layouts

#### MainGame Layout
```
┌─────────────────────────────────────────────┐
│              [RESOURCE HUD - FIXED TOP]     │
│   🧊 Ice: 150   ⚡ Solar: 45   💜 He-3: 12  │
├─────────────────────────────────────────────┤
│                                             │
│         [BUILDING SELECTOR - BELOW HUD]     │
│    [Collect] [Drill] [Solar] [Water] [Dome]│
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│              [GAME GRID - ZOOMABLE]         │
│                  7x7 plots                  │
│                                             │
│                                             │
└─────────────────────────────────────────────┤
│           [INSTRUCTIONS BAR - BOTTOM]       │
│   Click=Collect • Select building=Place     │
└─────────────────────────────────────────────┘
```

#### MainMenu Layout
```
┌─────────────────────────────────────────────┐
│                                             │
│              🌙 ICE DRILL 🌙                │
│           Lunar Colony Game                 │
│                                             │
│          [ CONTINUE ] (if save)             │
│          [ NEW GAME ]                       │
│          [ HOW TO PLAY ]                    │
│          [ SETTINGS ]                       │
│                                             │
└─────────────────────────────────────────────┘
```

### 3.2 Composants UI

#### HUD (Heads-Up Display)
- **Position**: Top center, fixed
- **Style**: pixel-panel avec accent colors par ressource
- **Content**: Ice (cyan), Solar Energy (amber), Helium-3 (purple)
- **Trade Button**: Bouton violet à droite du HUD
- **Update**: Floats numbers animate when resources change

#### BuildingSelector
- **Position**: Below HUD, centered
- **Style**: Horizontal row, pixel-btn par batiment
- **States**:
  - Default: dark background, border #334155
  - Selected: glowing border #22d3ee, slight scale
  - Disabled (can't afford): grayed out, no hover
- **Collect Tool**: Premier bouton avec icone ⛏️

#### TradePanel (Modal)
- **Trigger**: Click "Trade" button dans HUD
- **Style**: Centered modal avec pixel-panel, overlay dark
- **Content**:
  - Liste des resources vendables
  - Slider pour quantité
  - Prix en Helium-3 affiché
  - Bouton Sell
- **Close**: Click X ou click outside

#### Notifications/Toasts
- **Position**: Top-right, stacked
- **Types**:
  - Success (green border): "Sold! +2.5 He-3"
  - Error (red border): "Not enough resources"
  - Info (blue border): "Drill complete!"
- **Animation**: Slide in from right, fade out after 3s

#### BuildingInfoPanel
- **Trigger**: Click sur bâtiment posé
- **Position**: Slide-in depuis droite
- **Content**:
  - Nom + Level
  - Production rate
  - Upgrade cost
  - Upgrade button (si level < 3)

### 3.3 Interactions

#### Click sur Grid Cell
1. Si aucun outil/bâtiment sélectionné → Collect resource
   - Animation: floating "+X Resource" monte et fade
   - Sound: click feedback (si audio enabled)
2. Si bâtiment sélectionné ET plot vide → Place building
   - Animation: building appear avec petit bounce
   - Sound: construction complete
3. Si plot occupé → Select building (ouvre BuildingInfoPanel)

#### Pan & Zoom
- **Pan**: Click + drag sur grille (cursor: grab → grabbing)
- **Zoom**: Scroll wheel ou pinch (0.5x - 2x range)
- **Bounce-back**: Si zoom au max, scroll rebounce légèrement

#### Hover States
- Grid cells: Background highlight rgba(34, 211, 238, 0.2)
- Buttons: translateY(-2px), shadow increase
- Buildings: Subtle glow outline

#### Selection Feedback
- Selected building dans selector: Border glowing cyan
- Selected plot sur grid: Pulsing border

---

## 4. Formulas

### Animation Timings
```typescript
const ANIM = {
  // Toasts
  toastEnter: 200,      // ms, slide in
  toastDisplay: 3000,   // ms, visible
  toastExit: 200,       // ms, fade out

  // Panels
  panelSlide: 300,      // ms, side panel slide
  modalFade: 200,       // ms, overlay fade

  // Feedback
  floatingNum: 800,     // ms, float up and fade
  cellPulse: 150,       // ms, click feedback
  buildingPlace: 300,   // ms, bounce animation

  // Hover
  hoverScale: 100,      // ms, button hover
  hoverGlow: 200,       // ms, glow appear
};
```

### Panel Transitions
```css
.panel-enter {
  transform: translateX(100%);
  transition: transform 300ms ease-out;
}
.panel-enter-active {
  transform: translateX(0);
}
```

### Toast Positioning
```typescript
// Stack from top-right
const toastOffset = (index: number) => ({
  top: `${80 + index * 60}px`,
  right: '20px',
});
// Max 3 visible, oldest auto-dismissed
```

---

## 5. Edge Cases

### Empty States
- **No buildings**: "Click Collect, then click a plot to gather ice"
- **No resources to sell**: Trade panel shows "Not enough resources to sell"
- **Grid full**: "Colony at capacity! Expand land in Settings"

### Loading States
- **Initial load**: Spinner with "Loading colony..." text
- **Save/Load**: Brief pulse on HUD, no blocking

### Error States
- **Save failed**: Toast error "Could not save. Storage full?"
- **Load failed**: "Corrupted save. Start new game?"
- **Network error**: N/A (offline-first)

### Offline Return
- On return: Modal "Welcome back! Your colony produced X while away"
- Production calculated for offline time (max 8 hours)
- Floating numbers show what was produced

### Border Cases
- **Resource cap (1000)**: Visual indicator when near cap
- **Max buildings**: Grid shows all plots occupied
- **Level 3 building**: No upgrade button, shows "MAX"

---

## 6. Dependencies

### Component → System Dependencies
| Component | Depends On |
|-----------|------------|
| HUD | ResourceSystem, GameContext |
| BuildingSelector | ResourceSystem (canAfford), BuildingDefinitions |
| Grid | PlotSystem, BuildingSystem, GameContext |
| TradePanel | ResourceSystem, GameContext |
| BuildingInfoPanel | BuildingSystem, GameContext |
| Notifications | NotificationSystem |

### Data Flow
```
User Action → GameContext.dispatch() → Reducer → State Update → Components re-render
                                      ↓
                              NotificationSystem (toasts)
```

### Shared State
- Resources: Single source of truth in GameContext
- Selected building: Local state (useState)
- Open panels: Local state (useState)
- Notifications: NotificationContext

---

## 7. Tuning Knobs

### Animation Speeds
| Parameter | Default | Range | Affecte |
|-----------|---------|-------|---------|
| `toastDuration` | 3000ms | 2000-5000ms | How long notifications visible |
| `floatDuration` | 800ms | 500-1200ms | Floating number animation |
| `panelSlideSpeed` | 300ms | 200-500ms | Panel open/close |
| `hoverScaleAmount` | -2px | -1 to -4px | Button lift on hover |

### Colors (CSS Variables)
| Variable | Default | Usage |
|----------|---------|-------|
| `--color-ice` | #22d3ee | Ice resource, highlights |
| `--color-solar` | #fbbf24 | Solar energy, warnings |
| `--color-helium` | #a78bfa | Helium-3, premium elements |
| `--color-success` | #22c55e | Success toasts |
| `--color-error` | #ef4444 | Error toasts |

### Touch Targets
| Parameter | Default | Min | Platform |
|-----------|---------|-----|----------|
| `minTouchTarget` | 44px | 44px | Mobile |
| `buttonPadding` | 10px 16px | 8px 12px | All |
| `gridCellSize` | 64px | 48px | Desktop zoomed |

### Layout
| Parameter | Default | Adjustable | Notes |
|-----------|---------|------------|-------|
| `hudTop` | 16px | 8-24px | From top edge |
| `hudPadding` | 12px 20px | 8-16px | Internal HUD padding |
| `gridGap` | 12px | 8-16px | Between selector elements |
| `panelWidth` | 320px | 280-400px | Side panels |

### Accessibility Overrides
| Setting | Default | Options |
|---------|---------|---------|
| `highContrastMode` | false | true/false |
| `reduceMotion` | system | always/never |
| `textScale` | 1.0 | 0.8-1.5 |

---

## 8. Acceptance Criteria

### Functional Tests
- [ ] HUD displays all 3 resources with correct icons
- [ ] Clicking empty plot with Collect tool adds 1 ice
- [ ] Building placement deducts correct cost
- [ ] Cannot place building without sufficient resources
- [ ] Trade modal opens and closes correctly
- [ ] Selling resources updates Helium-3 correctly
- [ ] Building info panel shows on building click
- [ ] Upgrade increases building level and production
- [ ] Pan and zoom work smoothly (0.5x - 2x)
- [ ] Notifications appear and auto-dismiss after 3s

### Usability Tests
- [ ] All buttons have visible hover state
- [ ] Selected building clearly indicated
- [ ] Touch targets minimum 44px on mobile
- [ ] No horizontal scroll on 375px width (iPhone SE)
- [ ] Text readable at 0.8x scale
- [ ] Empty states show helpful text
- [ ] Loading states prevent double-actions

### Accessibility Tests
- [ ] Tab navigates through all interactive elements
- [ ] Focus visible on all focusable elements
- [ ] Screen reader announces resource changes
- [ ] High contrast mode increases border visibility
- [ ] Reduce motion disables floating numbers
- [ ] Colorblind mode (deuteranopia) still usable

### Performance Tests
- [ ] Initial load under 2 seconds
- [ ] 60 FPS during pan/zoom
- [ ] No jank with 20+ buildings
- [ ] Toast animation smooth (no flicker)
- [ ] Panel slide 60fps

### Visual Checkpoints
- [ ] Pixel-art aesthetic consistent (no anti-aliasing blur)
- [ ] Colors match Art Direction palette
- [ ] GameFrame border visible
- [ ] Pixel corners on panels
- [ ] No white flash on page load
- [ ] Dark background (#0d0d1a) fills viewport

---

## Appendix: Component File Map

```
src/
├── components/
│   └── game/
│       ├── HUD.tsx           # Resource display + Trade button
│       ├── BuildingSelector.tsx # Building tool palette
│       ├── Grid.tsx          # 7x7 interactive grid
│       ├── BuildingCell.tsx   # Individual plot renderer
│       ├── TradePanel.tsx     # Sell resources modal
│       ├── BuildingInfoPanel.tsx # Upgrade/details panel
│       ├── Notifications.tsx  # Toast container
│       ├── FloatingNumber.tsx  # +1 ice animation
│       ├── GameFrame.tsx      # Main container
│       └── MainMenu.tsx       # Start menu
├── context/
│   └── GameContext.tsx        # State + dispatch
├── hooks/
│   ├── useGameSelector.ts     # Memoized selectors
│   ├── useNotifications.ts    # Toast queue
│   └── useFloatingText.ts     # Floating numbers
└── app/
    ├── page.tsx               # Main menu route
    ├── preview/page.tsx       # Game route
    └── globals.css            # CSS variables + animations
```
