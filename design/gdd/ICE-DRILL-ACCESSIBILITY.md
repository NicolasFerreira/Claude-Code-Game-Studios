# ICE DRILL - Accessibility Design Document

## 1. Overview

ICE DRILL Accessibility vise a garantir que tous les joueurs, independamment de leurs capacites physiques, cognitives ou sensorielles, puissent profiter pleinement de l'experience de colonisation lunaire. Le jeu suit WCAG 2.1 Level AA comme standard minimum, avec des considerations specifiques pour les jeu idle et incrementaux.

**Principes fondamentaux:**
- **Perceivable**: Contenu visible et audible pour tous, y compris sans couleur seule
- **Operable**: Navigation complete au clavier et aux peripheriques alternatifs
- **Understandable**: Interface intuitive et consistent, tutoriels clairs
- **Robust**: Compatibilite avec les technologies d'assistance

**Portee MVP:**
- Colorblind modes (deuteranopia, protanopia, tritanopia)
- Text scaling (3 tailles: Normal, Large, Extra Large)
- High contrast mode
- Full keyboard navigation
- Touch targets 44x44px minimum
- Reduced motion option
- Auto-save frequent (30s)

---

## 2. Player Fantasy

### Accessibilite comme inclusion

ICE DRILL est un jeu meditative et satisfaisant qui ne devrait exclure personne. L'experience de "pionnier lunaire" doit etre accessible a:

- **Daltoniens**: Modes colorblind distincts pour deuteranopia, protanopia, tritanopia
- **Troubles visuels**: Text scaling jusqu'a 200%, haut contraste
- **Troubles moteur**: Navigation clavier complete, touch targets larges, options hold-vs-click
- **Troubles cognitifs**: Tutoriels step-by-step, indicateurs de but clairs, sauvegardes frequentes
- **Utilisateurs de technologies d'assistance**: Support screen reader, focus visible

### Player Fantasy pour Players avec Disabilities

**"Je suis un ingenieur lunar, capable et autonome"**
- Chaque joueur peut completer le jeu sans assistance externe
- Les mechanics core (clicking, construction, production) sont toutes accessibles
- Les options d'accessibilite ne changent pas la strategie ou l'economie du jeu

---

## 3. Detailed Rules

### 3.1 Standards Compliance

**WCAG 2.1 Level AA Requirements:**

| Criterion | Implementation |
|-----------|----------------|
| 1.4.3 Contrast (Minimum) | Text: 4.5:1, UI elements: 3:1 |
| 1.4.4 Resize text | Up to 200% without loss |
| 1.4.11 Non-text Contrast | UI components: 3:1 minimum |
| 2.1.1 Keyboard | All functions via keyboard |
| 2.4.3 Focus Order | Logical tab order |
| 2.4.7 Focus Visible | Clear focus indicator |
| 3.2.1 On Focus | No unexpected context changes |
| 4.1.2 Name, Role, Value | Proper ARIA labels |

### 3.2 Color System

**Colorblind-Safe Palette (Default):**

| Element | Color | Hex | Notes |
|---------|-------|-----|-------|
| Background | Dark Gray | #1a1a2e | Lunar surface |
| Surface | Charcoal | #2d2d44 | UI panels |
| Primary (Ice) | Cyan | #00d4ff | Distinct from energy |
| Secondary (Energy) | Yellow | #ffd700 | High visibility |
| Accent (Helium-3) | Purple | #9d4edd | Premium currency |
| Success | Green | #00ff88 | Valid actions |
| Warning | Orange | #ff8c00 | Alerts |
| Error | Red | #ff4444 | Errors, critical |
| Text Primary | White | #ffffff | 4.5:1 on dark |
| Text Secondary | Gray | #a0a0a0 | 4.5:1 on dark |

**Colorblind Modes:**

| Mode | Adjustments |
|------|-------------|
| Deuteranopia (Red-Green) | Shift red->orange, green->teal, add icon patterns |
| Protanopia (Red-Green) | Shift red->magenta, green->blue, add icon patterns |
| Tritanopia (Blue-Yellow) | Shift blue->violet, yellow->pink, add icon patterns |
| Monochrome | Grayscale with patterns/icons for differentiation |

**Rule: Color is never the sole indicator**
- Every color-coded information includes shape, icon, or text label
- Resource amounts show +/- icons, not just green/red
- Status indicators use icons + color

### 3.3 Visual Accessibility

**Text Scaling:**

| Setting | Scale | Base Size | Usage |
|---------|-------|-----------|-------|
| Normal | 100% | 16px body | Default |
| Large | 125% | 20px body | Low vision |
| Extra Large | 150% | 24px body | High zoom |

**High Contrast Mode:**
- Background: Pure black (#000000)
- Surface: Dark gray (#1a1a1a)
- Text: Pure white (#ffffff)
- Borders: White 2px
- Focus: Yellow outline 3px

**Subtitles/Text Display:**
- All tutorial text displayed in text panels
- No audio-only information
- Tooltips on all interactive elements

### 3.4 Input Systems

**Keyboard Navigation:**

| Action | Keys | Notes |
|--------|------|-------|
| Navigate grid | Arrow keys | Grid traversal |
| Select building/node | Enter/Space | Activate |
| Open inventory | I | Toggle panel |
| Open build menu | B | Toggle panel |
| Close panel | Escape | Back navigation |
| Confirm action | Enter | Primary action |
| Cancel action | Escape | Secondary action |
| Quick save | Ctrl+S | Manual save |
| Toggle settings | Ctrl+, | Open settings |

**Focus Management:**
- Visible focus ring: 3px solid #00d4ff (cyan)
- Focus trap in modal dialogs
- Return focus to trigger element on close
- Skip links for main regions

**Gamepad Support (Future):**
- D-pad: Grid navigation
- A button: Select/Confirm
- B button: Cancel/Back
- X button: Quick actions
- Y button: Inventory
- Start: Pause menu
- Shoulder buttons: Tab switching

**Touch Adaptations:**
- Minimum touch target: 44x44px (WCAG requirement)
- Grid cells: 48x48px minimum
- Buttons: 48px height minimum
- Spacing between targets: 8px minimum
- Hold-to-click option for tap-and-release issues
- Double-tap to confirm (optional toggle)

### 3.5 Motor Accessibility

**Hold vs Click Options:**
- **Click mode** (default): Tap to action
- **Hold mode**: Press and hold 500ms to action
- **Toggle mode**: Tap to enable, tap again to action
- Configurable hold duration: 300ms - 1000ms

**Auto-save Frequency:**
- Default: Every 30 seconds
- Configurable: 10s, 30s, 60s, 120s
- Also saves on: panel open/close, building placement, resource collection

**Input Timing Adjustables:**
- Hold duration: 300ms - 1000ms (default 500ms)
- Repeat delay: 100ms - 500ms (default 200ms)
- Double-tap threshold: 200ms - 500ms (default 300ms)

### 3.6 Cognitive Accessibility

**Tutorial System:**
- Step-by-step tutorial in Phase 1
- Tutorial prompts: 3 steps before free play
- "Replay Tutorial" option in settings
- Tutorial can be skipped (with confirmation)

**Goal Indicators:**
- Current objective always visible in HUD
- Milestone markers on progression path
- Resource shortage warnings with clear solutions
- Building tooltips explain function

**Consistent UI Patterns:**
- Same button positions across all panels
- Standardized icon meanings
- Color + shape + text for all states
- No hidden interactions

**Simplification Options:**
- "Reduced UI" mode: Hides optional elements
- "Simplified Numbers": Round to nearest 10/100
- "Auto-collect": Automatically collect ready resources

---

## 4. Formulas

### 4.1 Touch Target Size Formula

```typescript
function getTouchTargetSize(baseSize: number, scaleFactor: number): number {
  // Minimum 44px per WCAG, scale with text size preference
  return Math.max(44, baseSize * scaleFactor);
}

// Example: Grid cell at 1.5x text scale
// 32px base * 1.5 = 48px minimum
```

### 4.2 Focus Order Formula

```typescript
function getFocusOrder(elements: HTMLElement[]): number[] {
  // Tab order follows visual layout: left-to-right, top-to-bottom
  // Buildings sorted by position.y, then position.x
  return elements
    .filter(el => el.tabIndex >= 0)
    .sort((a, b) => {
      const aPos = a.getBoundingClientRect();
      const bPos = b.getBoundingClientRect();
      const rowDiff = aPos.top - bPos.top;
      if (Math.abs(rowDiff) > 10) return rowDiff;
      return aPos.left - bPos.left;
    })
    .map(el => elements.indexOf(el));
}
```

---

## 5. Edge Cases

### 5.1 Colorblind User Testing

**Scenario**: Player with deuteranopia cannot distinguish Ice (cyan) from Energy (yellow) when both are low saturation.

**Solution**:
- Add unique shape patterns to resource icons
- Ice: Hexagonal crystal shape
- Energy: Lightning bolt shape
- Show icon-only mode option

**Validation**: Test with colorblind simulation tools (Color Oracle, Stark)

### 5.2 Keyboard-Only Navigation

**Scenario**: Player uses keyboard only, has 20 buildings on grid.

**Solution**:
- Grid navigation with arrow keys
- Tab cycles through panels (Inventory -> Build -> Shop -> Colony)
- Enter activates selected element
- Escape closes panels in reverse order
- Focus returns to last active element

### 5.3 Screen Reader Compatibility

**Scenario**: Blind player uses NVDA/JAWS to play.

**Solution**:
- All interactive elements have aria-labels
- Live regions for resource updates
- Panel state announced on open/close
- Game grid announces cell contents on focus
- Tutorial text available as screen reader text

**Implementation**:
```typescript
// Example ARIA structure
<div role="grid" aria-label="Colony Grid">
  <div role="row">
    <div
      role="gridcell"
      aria-label="Ice Drill, producing 1 Ice per 5 seconds, powered"
      tabIndex={0}
    >
      [Icon]
    </div>
  </div>
</div>
```

### 5.4 Motor Impairment - Tremors

**Scenario**: Player has hand tremors, accidental clicks.

**Solution**:
- Hold mode requires sustained 500ms press
- Large dead zone around clickable areas
- Option to increase hold duration to 1000ms
- Toggle mode: avoid accidental actions

### 5.5 Cognitive Load Reduction

**Scenario**: Player overwhelmed by production chains and many buildings.

**Solution**:
- "Simplified View" hides non-essential info
- One active tutorial at a time
- Clear next-objective indicator
- Queued notifications (not simultaneous)

### 5.6 Text Scaling at Extreme Levels

**Scenario**: Player sets 200% text scale, UI breaks layout.

**Solution**:
- Maximum 200% text scale enforced
- UI panels use scrollable containers
- Grid cells minimum 48px regardless of scale
- Layout tested at all scale levels

### 5.7 Reduced Motion Preference

**Scenario**: Player has vestibular disorders, motion causes nausea.

**Solution**:
- `prefers-reduced-motion` media query respected
- Option in settings: Reduced Motion (ON/OFF)
- When ON: Disable particle effects, smooth scrolling, fade transitions
- When ON: Instant state changes instead of animations

---

## 6. Dependencies

### 6.1 Systems Requiring Accessibility Integration

| System | Accessibility Requirements |
|--------|---------------------------|
| **GameState** | Persist accessibility preferences |
| **UI State** | Focus management, panel states |
| **Notification System** | Screen reader announcements |
| **Tutorial System** | Accessible tutorial flow |
| **Settings System** | Accessibility preference panel |
| **Save/Load System** | Remember accessibility settings |

### 6.2 Cross-System Impacts

```
[Settings System] --> [UI Components] (apply text scale, contrast)
[Settings System] --> [Game Loop] (apply reduced motion)
[Settings System] --> [Color System] (apply colorblind mode)
[Settings System] --> [Input System] (apply hold vs click mode)

[UI State] --> [Focus Manager] (track focus, manage trap)
[Focus Manager] --> [Keyboard Navigation] (arrow key navigation)

[Notification System] --> [Screen Reader] (aria-live regions)
[Screen Reader] --> [Tutorial System] (accessible tutorials)
```

### 6.3 Accessibility State Persistence

```typescript
interface AccessibilitySettings {
  // Visual
  textScale: 'normal' | 'large' | 'extraLarge';
  colorblindMode: 'none' | 'deuteranopia' | 'protanopia' | 'tritanopia' | 'monochrome';
  highContrast: boolean;
  reducedMotion: boolean;

  // Motor
  inputMode: 'click' | 'hold' | 'toggle';
  holdDuration: number; // ms
  gamepadEnabled: boolean;

  // Cognitive
  simplifiedUI: boolean;
  tutorialLevel: 'full' | 'minimal' | 'skipped';
  autoCollect: boolean;
}
```

---

## 7. Tuning Knobs

### 7.1 Visual Accessibility

| Parameter | Default | Range | Affects |
|-----------|---------|-------|---------|
| `TEXT_SCALE` | 1.0 | 1.0, 1.25, 1.5 | Text size multiplier |
| `COLORBLIND_MODE` | 'none' | enum | Color palette |
| `HIGH_CONTRAST` | false | boolean | Contrast ratio |
| `REDUCED_MOTION` | system | boolean | Animation toggle |

### 7.2 Motor Accessibility

| Parameter | Default | Range | Affects |
|-----------|---------|-------|---------|
| `INPUT_MODE` | 'click' | 'click'/'hold'/'toggle' | Click behavior |
| `HOLD_DURATION` | 500 | 300-1000ms | Hold-to-action time |
| `REPEAT_DELAY` | 200 | 100-500ms | Keyboard repeat |
| `TOUCH_TARGET_SCALE` | 1.0 | 1.0-1.5 | Touch area size |

### 7.3 Cognitive Accessibility

| Parameter | Default | Range | Affects |
|-----------|---------|-------|---------|
| `SIMPLIFIED_UI` | false | boolean | Info density |
| `TUTORIAL_LEVEL` | 'full' | 'full'/'minimal'/'skipped' | Tutorial depth |
| `AUTO_COLLECT` | false | boolean | Manual vs auto collection |
| `NOTIFICATION_RATE` | 3 | 1-10 | Max simultaneous notifications |

### 7.4 Auto-save

| Parameter | Default | Range | Affects |
|-----------|---------|-------|---------|
| `AUTOSAVE_INTERVAL` | 30000 | 10000-120000ms | Save frequency |

---

## 8. Acceptance Criteria

### 8.1 Visual Accessibility

#### Colorblind Safety
- [ ] Deuteranopia mode: Ice and Energy visually distinct
- [ ] Protanopia mode: Ice and Energy visually distinct
- [ ] Tritanopia mode: Blue and Yellow visually distinct
- [ ] No information conveyed by color alone
- [ ] All color-coded states have icon/shape backup
- [ ] Color contrast ratio minimum 4.5:1 for text
- [ ] UI element contrast ratio minimum 3:1

#### Text Scaling
- [ ] Normal (100%): All text readable at 1080p
- [ ] Large (125%): No text overflow, no clipping
- [ ] Extra Large (150%): All UI functional, scrollable where needed
- [ ] Maximum 200% enforced
- [ ] Text remains sharp at all scales

#### High Contrast
- [ ] Pure black background (#000000)
- [ ] White text (#ffffff)
- [ ] 2px white borders on interactive elements
- [ ] Yellow focus indicator (3px)
- [ ] All colors meet 7:1 contrast ratio

### 8.2 Motor Accessibility

#### Keyboard Navigation
- [ ] All interactive elements reachable via Tab
- [ ] Arrow keys navigate grid cells
- [ ] Enter/Space activates selected element
- [ ] Escape closes panels
- [ ] Focus order follows visual layout
- [ ] Focus visible with 3px cyan outline
- [ ] Focus trap in modal dialogs

#### Touch Targets
- [ ] Minimum 44x44px touch target size
- [ ] Grid cells minimum 48x48px
- [ ] 8px spacing between targets
- [ ] Hold mode requires 500ms sustained press
- [ ] Hold duration configurable 300-1000ms

#### Gamepad (Future)
- [ ] D-pad navigates grid
- [ ] A button confirms
- [ ] B button cancels
- [ ] All functions accessible

### 8.3 Cognitive Accessibility

#### Tutorial
- [ ] Step-by-step tutorial available
- [ ] Tutorial covers: clicking, building, production
- [ ] "Replay Tutorial" option exists
- [ ] Tutorial skippable (with confirmation)
- [ ] Tutorial text displayed in text (not audio-only)

#### Goal Clarity
- [ ] Current objective always visible
- [ ] Resource warnings include suggested action
- [ ] Building tooltips explain function
- [ ] Clear visual distinction between buildable/occupied/empty plots

#### UI Consistency
- [ ] Same button positions across panels
- [ ] Standardized icon meanings throughout
- [ ] Color + icon + text for all states
- [ ] No hidden or mystery interactions

### 8.4 Screen Reader Support

#### ARIA Implementation
- [ ] All buttons have aria-label or visible text
- [ ] Grid cells announce contents on focus
- [ ] Panel open/close announced
- [ ] Resource changes announced (debounced)
- [ ] Live regions for dynamic content

#### Focus Management
- [ ] Focus moves to new panel on open
- [ ] Focus returns to trigger on close
- [ ] Modal focus trap functional
- [ ] No focus loss during state changes

### 8.5 Reduced Motion

#### Motion Preferences
- [ ] Respects `prefers-reduced-motion` system setting
- [ ] Settings toggle overrides system preference
- [ ] When enabled: no particle effects
- [ ] When enabled: instant transitions (no fade/slide)
- [ ] When enabled: no auto-scrolling

### 8.6 Auto-save

- [ ] Saves every 30 seconds by default
- [ ] Saves on panel open/close
- [ ] Saves on building placement
- [ ] Saves on resource collection (optional)
- [ ] Saves on page unload
- [ ] Accessibility settings persist across sessions

---

## References

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Game Accessibility Guidelines](https://gameaccessibilityguidelines.com/)
- [W3C ARIA Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Color Oracle - Colorblind Simulator](https://colororacle.org/)
