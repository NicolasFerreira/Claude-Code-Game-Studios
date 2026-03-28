# ICE DRILL - Art Direction Document

## 1. Overview

Lunar colony idle/incremental game inspired by Sunflower Land. The visual identity blends the cozy, warm pixel art aesthetic of Sunflower Land with a lunar/space industrial theme. The game should feel like a welcoming frontier colony where players build and expand, not a cold sci-fi experience.

**Core Visual Philosophy**: "Cozy Industrial Frontier" - The harshness of space is filtered through warm, inviting pixel art. Think "moon mining town with a community garden."

---

## 2. Visual Concept and Mood Board

### Mood Keywords
- Cozy yet industrious
- Warm despite the cold vacuum of space
- Pixel-perfect nostalgia with sci-fi elements
- Handcrafted, artisanal feel in an automated world

### Visual Vocabulary

| Element | Sunflower Land (Reference) | ICE DRILL (Our Identity) |
|---------|---------------------------|-------------------------|
| Terrain | Grassy fields, dirt paths, wooden fences | Lunar regolith, metal walkways, illuminated dome borders |
| Buildings | Wooden cabins, barns, windmills | Modular habitat pods, drilling rigs, hydroponic domes |
| Vegetation | Crops, fruit trees, flowers | Glowing crystals, alien moss, pressurized gardens |
| Tools | Shovels, pickaxes, watering cans | Plasma drills, terraformers, life support modules |
| Sky/Background | Blue sky, fluffy clouds, sun | Starfield, Earth on horizon, occasional asteroid |
| UI Panels | Wood-grain frames, parchment labels | Metal hull panels, holographic displays, riveted frames |

### Earth vs Lunar Duality
- **Earth elements** (imported goods): Warm browns, greens, organic shapes - represented as precious imports
- **Lunar elements** (local resources): Grays, silvers, crystalline structures - abundant but stark

---

## 3. Color Palette

### Primary Palette

```
LUNAR GRAY (Backgrounds, base terrain)
#1a1a2e - Deep lunar night
#2d3a4a - Moon dust base
#4a5568 - Regolith mid
#6b7280 - Highlighted regolith

COLD STEEL (Buildings, machinery)
#94a3b8 - Steel light
#64748b - Steel mid
#475569 - Steel shadow
#334155 - Steel dark

TERRA WARM (UI, accents, imported Earth goods)
#d4a574 - Warm wood (UI frames)
#c4956a - Weathered copper
#8b5a2b - Industrial bronze
#5c3d2e - Dark umber

CRYSTAL GLOW (Resources, highlights, interactive elements)
#22d3ee - Cyan crystal (water/ice)
#a78bfa - Purple crystal (rare minerals)
#4ade80 - Green crystal (organic growth)
#fbbf24 - Amber crystal (energy)

SIGNAL LIGHTS (Status, alerts, HUD)
#ef4444 - Warning red
#22c55e - Success green
#3b82f6 - Info blue
#f97316 - Energy orange
```

### UI Background Colors

```
PANEL BACKGROUND (Wood/Hull)
#2a1f1a - Dark hull
#3d2e24 - Medium hull
#5c4633 - Light hull accent

INPUT FIELDS (Sunflower Land cream -> Lunar equivalent)
#e8dcc8 - Lunar cream (instead of #EAD4AA)
#d4c4a8 - Pressed state

TEXT
#1f1410 - Primary text (instead of #3e2731)
#5c4a3d - Secondary text
#8b7355 - Muted text
```

### Color Meanings

| Color | Meaning | Usage |
|-------|---------|-------|
| Cyan #22d3ee | Ice/Water | Resource indicators, cooling systems |
| Purple #a78bfa | Rare minerals | Valuable resources, special buildings |
| Green #4ade80 | Growth/Organic | Crops, bio-domes, life support |
| Amber #fbbf24 | Energy | Power indicators, drill heat |
| Orange #f97316 | Alerts | Warnings, active processes |
| Red #ef4444 | Critical | Low resources, breakdowns |
| Blue #3b82f6 | Information | HUD elements, tooltips |

---

## 4. Typography

### Font Stack (Web-safe pixel fonts)

```css
/* Primary - Game titles, important numbers */
font-family: 'Press Start 2P', 'Basic', 'Secondary', monospace;

/* Body text - Descriptions, UI labels */
font-family: 'Basic', 'Ark', sans-serif;

/* Numeric displays - Resource counts, timers */
font-family: 'Teeny', 'Secondary', monospace;

/* Secondary - Chinese character support */
font-family: 'Ark', sans-serif;
```

### Font Sources
- **Press Start 2P**: Google Fonts - 8-bit style for headers
- **Basic**: Sunflower Land uses this (fallback to system)
- **Teeny**: Sunflower Land uses this (fallback to system)

### Type Scale (CSS variables)

```css
--text-xxs: 20px / 12px line-height
--text-xs:  24px / 14px line-height
--text-sm:  30px / 20px line-height
--text-base: 36px / 26px line-height
--text-lg:  42px / 28px line-height
```

---

## 5. Visual Effects and Animations

### Image Rendering
```css
img {
  image-rendering: pixelated; /* Crisp pixels, no blur */
}
```

### Drop Shadows
```css
/* Standard highlight (white outline for dark backgrounds) */
.img-highlight {
  filter: drop-shadow(1px 1px 0px white)
          drop-shadow(-1px 0px 0px white)
          drop-shadow(0px -1px 0px white);
}

/* Heavy highlight for selected items */
.img-highlight-heavy {
  filter: drop-shadow(2px 2px 0px white)
          drop-shadow(-2px 0px 0px white)
          drop-shadow(0px -2px 0px white);
}

/* Object shadow for depth */
.img-shadow {
  filter: drop-shadow(0px 3px 0px rgba(0, 0, 0, 0.3));
}
```

### Animations

| Animation | CSS Class | Usage |
|-----------|-----------|-------|
| Floating | `.float` | Crystals, resources waiting to be collected |
| Pulsate | `.pulse` | Ready-to-harvest indicators |
| Shake | `.shake` | Active drills, warning states |
| Rise-up | `.rise-up` | Resource collection feedback |
| Glow | `.glow` | Active machinery, powered buildings |

```css
@keyframes float {
  0%, 100% { transform: translate(0, 0px); }
  50% { transform: translate(0, 6px); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

@keyframes glow-pulse {
  0%, 100% { filter: brightness(1) drop-shadow(0 0 2px currentColor); }
  50% { filter: brightness(1.2) drop-shadow(0 0 8px currentColor); }
}
```

### Text Shadows
```css
/* Light text on dark backgrounds (HUD numbers) */
.balance-text {
  color: white;
  text-shadow:
    -1px -1px 0 black,
    1px -1px 0 black,
    -1px 1px 0 black,
    1px 1px 0 black,
    -2px 0 0 black,
    2px 0 0 black,
    0 -2px 0 black,
    0 2px 0 black;
}

/* Yield text (small numbers) */
.yield-text {
  font-family: 'Teeny', monospace;
  font-size: 12px;
  /* Same black outline as above */
}
```

---

## 6. Asset Priority List

### MVP Assets (Essential for Alpha)

#### Tier 1: Core Gameplay (Generate First)

| Asset | Filename | Description | Size | Priority |
|-------|----------|-------------|------|----------|
| Drill (idle) | `build_drill_idle_01.png` | Plasma drill in standby | 32x32 | CRITICAL |
| Drill (active) | `build_drill_active_01.png` | Drill spinning/extracting | 32x32 | CRITICAL |
| Ice deposit | `res_ice_lunar_01.png` | Glowing cyan ice block | 16x16 | CRITICAL |
| Water/Ice resource icon | `res_ice_small.png` | Collectible ice chunk | 16x16 | CRITICAL |
| Mineral crystal | `res_crystal_purple.png` | Purple rare mineral | 16x16 | CRITICAL |
| Energy orb | `res_energy_amber.png` | Power/energy resource | 16x16 | CRITICAL |
| Lunar soil tile | `tile_regolith.png` | Base terrain tile | 16x16 | CRITICAL |
| Buildable plot | `tile_plot_empty.png` | Available building spot | 16x16 | CRITICAL |

#### Tier 2: Buildings (Generate Second)

| Asset | Filename | Description | Size | Priority |
|-------|----------|-------------|------|----------|
| Habitat pod | `build_habitat_small_01.png` | Starter dwelling | 32x32 | HIGH |
| Storage depot | `build_storage_01.png` | Resource storage | 32x32 | HIGH |
| Hydroponic bay | `build_hydroponic_01.png` | Grow crops | 32x32 | HIGH |
| Power generator | `build_generator_01.png` | Energy production | 32x32 | HIGH |

#### Tier 3: Crops/Organic (Generate Third)

| Asset | Filename | Description | Size | Priority |
|-------|----------|-------------|------|----------|
| Lunar wheat seed | `crop_lunar_wheat_seed.png` | Seed packet | 16x16 | MEDIUM |
| Lunar wheat growing | `crop_lunar_wheat_grow_01.png` | Mid-growth stage | 16x16 | MEDIUM |
| Lunar wheat ready | `crop_lunar_wheat_ready.png` | Ready to harvest | 16x16 | MEDIUM |
| Glowshroom | `crop_glowshroom_ready.png` | Bioluminescent crop | 16x16 | MEDIUM |

#### Tier 4: UI Elements (Generate Fourth)

| Asset | Filename | Description | Size | Priority |
|-------|----------|-------------|------|----------|
| HUD frame | `ui_hud_frame_01.png` | Resource bar background | 64x16 | HIGH |
| Resource icon water | `ui_icon_water.png` | HUD water indicator | 16x16 | HIGH |
| Resource icon energy | `ui_icon_energy.png` | HUD energy indicator | 16x16 | HIGH |
| Resource icon minerals | `ui_icon_minerals.png` | HUD minerals indicator | 16x16 | HIGH |
| Button normal | `ui_btn_normal.png` | Standard button | 32x16 | MEDIUM |
| Button hover | `ui_btn_hover.png` | Button hover state | 32x16 | MEDIUM |
| Button disabled | `ui_btn_disabled.png` | Button disabled | 32x16 | MEDIUM |

### SVG/CSS Alternatives (Do Not Generate)

These can be created with SVG or CSS instead of pixel art:

| Element | Implementation | Reason |
|---------|----------------|--------|
| Background starfield | CSS radial gradients + keyframes | Infinite variation |
| UI panel borders | CSS with border-image | Resizable |
| Progress bars | CSS + HTML | Dynamic width |
| Tooltips | CSS + HTML | Text-based |
| Modal backgrounds | CSS gradients | Dynamic sizing |
| Resource counters | CSS + HTML | Dynamic numbers |

### Future Assets (Post-MVP)

- Character astronaut sprite (idle, walk, work animations)
- Multiple drill types (different visual styles)
- Rare asteroid events
- Trade ship visuals
- Decorative elements (antenna, cables, pipes)

---

## 7. MiniMax Prompts for Asset Generation

### Guidelines
- Use pixel art style (8-bit, 16-bit aesthetic)
- Limited palette per sprite (4-8 colors)
- Transparent background
- State what to include AND what to avoid
- Specify size when critical

### Drill Assets

**Prompt: `build_drill_idle_01`**
```
Pixel art sprite of a plasma drill on a lunar mining rig. Idle/standby state.
Style: 16-color palette, transparent background, crisp pixels, industrial sci-fi.
Colors: Steel grays (#64748b, #475569), amber accent lights (#fbbf24), cyan indicator (#22d3ee).
Size: 32x32 pixels.
Avoid: Motion blur, gradients, modern sleek designs.
```

**Prompt: `build_drill_active_01`**
```
Pixel art sprite of an active plasma drill on a lunar mining rig, sparks and energy visible.
Style: 16-color palette, transparent background, crisp pixels, industrial sci-fi.
Colors: Steel grays, bright amber energy (#f97316), cyan plasma (#22d3ee), white sparks.
Size: 32x32 pixels.
Include: Animated feel - suggest motion with particle details.
Avoid: gradients, smooth shading.
```

### Resource Assets

**Prompt: `res_ice_lunar_01`**
```
Pixel art sprite of a glowing cyan ice crystal formation on the moon surface.
Style: 8-color palette, transparent background, crisp pixels, magical yet industrial.
Colors: Cyan (#22d3ee), light cyan (#67e8f9), white highlights, dark blue shadows (#1e3a5f).
Size: 16x16 pixels.
Include: Subtle inner glow effect through color placement.
Avoid: Flat appearance, too much white.
```

**Prompt: `res_crystal_purple`**
```
Pixel art sprite of a purple glowing crystal, rare lunar mineral.
Style: 8-color palette, transparent background, crisp pixels, mystical sci-fi.
Colors: Purple (#a78bfa), violet (#8b5cf6), pink highlight (#e879f9), dark purple shadow (#4c1d95).
Size: 16x16 pixels.
Include: Faceted crystal shape with inner light.
Avoid: Realistic crystal look, too many colors.
```

**Prompt: `res_energy_amber`**
```
Pixel art sprite of a floating amber energy orb, concentrated power.
Style: 8-color palette, transparent background, crisp pixels, plasma energy.
Colors: Amber (#fbbf24), orange (#f97316), yellow (#fef08a), dark amber (#92400e).
Size: 16x16 pixels.
Include: Slight glow suggestion through lighter edges.
Avoid: Electric/lightning effects, too chaotic.
```

### Terrain Assets

**Prompt: `tile_regolith`**
```
Pixel art tile of lunar regolith/moon dust with small rocks and craters.
Style: 8-color palette, seamless tile-able, crisp pixels.
Colors: Gray (#4a5568), darker gray (#2d3a4a), lighter gray (#6b7280), subtle brown tint for variety.
Size: 16x16 pixels, tileable.
Include: 2-3 small rock details, subtle surface texture.
Avoid: Too flat, obvious repeating pattern.
```

**Prompt: `tile_plot_empty`**
```
Pixel art tile showing a marked building plot on lunar surface, stakes and rope outline.
Style: 8-color palette, transparent background, crisp pixels, construction site feel.
Colors: Orange safety (#f97316), steel gray (#64748b), white rope (#ffffff), lunar gray base.
Size: 16x16 pixels.
Include: Corner stakes, rope border, slight glow indicating buildable.
Avoid: Too busy, realistic construction markers.
```

### Building Assets

**Prompt: `build_habitat_small_01`**
```
Pixel art sprite of a small pressurized habitat pod on the moon, rounded dome with airlock.
Style: 16-color palette, transparent background, crisp pixels, cozy sci-fi.
Colors: White hull (#f8fafc), gray panels (#94a3b8), cyan window glow (#22d3ee), dark base (#1e293b).
Size: 32x32 pixels.
Include: Round dome, small airlock door, subtle window light.
Avoid: Cold sterile appearance, too many antennas.
```

**Prompt: `build_hydroponic_01`**
```
Pixel art sprite of a small hydroponic growing bay with glowing plants inside.
Style: 16-color palette, transparent background, crisp pixels, green sci-fi.
Colors: Steel frame (#64748b), glass dome (#93c5fd), green plants (#4ade80), cyan grow lights (#22d3ee).
Size: 32x32 pixels.
Include: Transparent dome showing plants, internal glow.
Avoid: Empty appearance, too industrial.
```

### UI Assets

**Prompt: `ui_icon_water`**
```
Pixel art icon of a water/ice droplet, UI resource indicator.
Style: 8-color palette, transparent background, crisp pixels, HUD style.
Colors: Cyan (#22d3ee), light cyan (#67e8f9), white highlight (#ffffff), dark outline (#0e7490).
Size: 16x16 pixels.
Include: Clear droplet shape, glossy highlight.
Avoid: Realistic water, complex shading.
```

**Prompt: `ui_btn_normal`**
```
Pixel art button with beveled edge, normal state - part of a 3-state button set.
Style: 8-color palette, transparent background, crisp pixels, tactile feel.
Colors: Light steel (#94a3b8), medium steel (#64748b), highlight edge (#cbd5e1), shadow edge (#475569).
Size: 32x16 pixels.
Include: 3D beveled look, slight gradient feel through color.
Avoid: Flat appearance, overly detailed.
```

---

## 8. UI/UX Layout

### HUD Layout (Mobile-First)

```
┌─────────────────────────────────────┐
│  [Resources Bar - Top Fixed]       │
│  🧊 125  ⚡ 89  💎 42  🪙 1,250      │
│  (Water) (Energy) (Minerals) (Coins)│
├─────────────────────────────────────┤
│                                     │
│         [Game World View]           │
│                                     │
│    Grid-based lunar surface         │
│    Tap to select, drag to pan       │
│                                     │
│                                     │
├─────────────────────────────────────┤
│  [Action Bar - Bottom]              │
│  [Drill] [Build] [Inventory] [Menu] │
└─────────────────────────────────────┘
```

### Resource Display

- **Position**: Top of screen, always visible
- **Style**: Metal panel frame with glow icons
- **Numbers**: Pixel font with dark outline for readability
- **Animation**: Pulse when resource is gained, shake when depleted

### Building/Plot Grid

- **Grid Size**: 6x6 minimum visible, scrollable world
- **Tile Size**: 16x16 pixel art, rendered at 3x (48x48 screen pixels)
- **Selection**: White 1px highlight with drop shadow
- **Buildable plots**: Orange stake markers

### Bottom Action Bar

- **Position**: Fixed bottom, safe-area aware
- **Buttons**: 4 main actions (Drill, Build, Inventory, Menu)
- **Style**: Metal hull texture with colored icon highlights
- **Feedback**: Scale up on press, glow on active tool

### Modal Panels

- **Background**: Semi-transparent dark overlay (#1a1a2e at 80%)
- **Panel**: Rounded metal frame with rivets
- **Close**: X button in top-right corner
- **Animation**: Scale from 0.8 to 1.0 with fade

### Mobile Considerations

- Touch targets minimum 44x44 pixels
- Safe area insets respected (notch, home indicator)
- Gesture: Tap to select, swipe to pan world
- No hover states relied upon for critical interactions

---

## 9. Asset Naming Convention

All assets follow: `[category]_[name]_[variant]_[size].[ext]`

### Categories

| Prefix | Usage |
|--------|-------|
| `res_` | Resources (collectible items) |
| `build_` | Buildings/Structures |
| `tile_` | Terrain tiles |
| `crop_` | Crops (seeds, growing, ready) |
| `ui_` | User interface elements |
| `char_` | Characters (future) |
| `vfx_` | Visual effects (future) |

### Examples

```
res_ice_lunar_01.png      - Lunar ice resource, variant 1
res_crystal_purple.png    - Purple crystal, no variant
build_drill_idle_01.png   - Drill building, idle state, variant 1
build_drill_active_01.png - Drill building, active state, variant 1
tile_regolith.png         - Terrain tile, regolith type
crop_lunar_wheat_seed.png  - Crop, wheat seeds
ui_btn_normal.png         - UI button, normal state
ui_icon_energy.png        - UI icon, energy type
```

---

## 10. Technical Notes

### Image Format
- **Format**: PNG (lossless, supports transparency)
- **Color Space**: RGB (no CMYK)
- **Bit Depth**: 8-bit per channel (32-bit with alpha)

### Sprite Sheets
For animated sprites, pack into horizontal sprite sheets:
```
[frame1][frame2][frame3][frame4]
```
Label in documentation: `build_drill_sheet_4f.png`

### CSS Implementation Reference

```css
/* Example: Resource icon styling */
.resource-icon {
  width: 16px;
  height: 16px;
  image-rendering: pixelated;
  filter: drop-shadow(0px 2px 0px rgba(0, 0, 0, 0.3));
}

/* Example: Building placement */
.building-slot {
  width: 48px;  /* 16px * 3 scale */
  height: 48px;
  image-rendering: pixelated;
}

/* Example: Pulsing ready state */
.ready-pulse {
  animation: pulse 1s ease-in-out infinite;
}
```

---

## 11. Approval Checklist

Before asset generation, verify:

- [ ] Sprite sizes are powers of 2 or standard (16x16, 32x32)
- [ ] Palette limited to 8-16 colors per sprite
- [ ] Transparent background on all sprites
- [ ] Consistent pixel density across all assets
- [ ] Naming convention followed
- [ ] Animation frames consistent (if sprite sheet)
- [ ] UI icons at same scale as world sprites

---

## Appendix: Sunflower Land Reference Analysis

### Sunflower Land Color Usage
- Green (#63c74d): Growth, nature, positive states
- Brown (#e7a873, #c28669): Earth, wood, building frames
- Red (#e43b44): Alerts, important markers
- Blue (#0099da): Water, cool elements
- Gold (#f09100): Coins, valuable resources

### Sunflower Land Visual Effects
- White drop shadows for sprites on dark backgrounds
- Black text outlines for HUD numbers
- Floating animation for collectible items
- Pulsing for ready-to-harvest crops
- Step-based animations for character movement

### Sunflower Land UI Patterns
- Wood-grain textured panels
- Warm cream (#EAD4AA) for input fields
- Dark brown (#3e2731) for primary text
- Pixel fonts scaled 2-3x for readability

---

*Document Version: 1.0*
*Created: 2026-03-28*
*Author: Art Director Agent*
