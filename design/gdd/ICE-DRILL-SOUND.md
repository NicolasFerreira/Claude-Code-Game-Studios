# ICE DRILL - Sound Design Document

## 1. Overview

**Direction sonore: "Cozy Industrial Frontier"**

L'audio d'ICE DRILL fusionne l'atmosphère lunaire (vacuum, machines, espace) avec la chaleur réconfortante d'un jeu idle cozy. Le joueur doit se sentir comme un pionnier spatial solitaire mais satisfait, pas comme un astronaute en mission sterile.

**Principes directeurs:**
- Timbre chaud pour les SFX UI (bois, métal usé, cloches douces)
- Textures mechanicales lunaires pour les gameplay sounds (drills, extracteurs)
- Ambiance spatiale subtile (vent lunaire, humming de machines, isolément)
- Musique lo-fi/spacy optionnelle en MVP (peut être désactivée)

**Objectifs sonores:**
1. Feedback tactile immediat pour chaque action du joueur
2. Ambiance de fond non-intrusive qui renforce l'immersion lunaire
3. Variations suffisantes pour eviter la repetition
4. Performance optimale sur mobile

---

## 2. Player Fantasy

**Ce que le son doit communiquer:**

| Moment | Emotion cible | Approche sonore |
|--------|-------------|-----------------|
| Click sur node | Satisfaction immediate | Crunch sec + sparkle cristallin |
| Placement building | Accomplissement | Clunk metallique + hiss pneumatique |
| Collection ressource | Gain, progres | Chime positif + movement |
| Production complete | Reward attendu | Fanfare douce, 8-bit inspired |
| Erreur/Restriction | Friction legere | Buzz sourd, pas de son尖锐 |
| Panne electricite | Urgence, menace | Alarme sourde, basse freq |
| Offline return | Bienvenue, renouveau | Swell musical doux |

**Anti-fantasme (eviter):**
- Sons trop realistes ou cinematiques
- Sci-fi steriles (pas de "computer beeps" generiques)
- Trop repetitifs (variations obligatoire)
- Trop forts ou agressifs

---

## 3. Detailed Rules

### 3.1 Categories de Sons

#### A. UI Sounds (User Interface)

| Son | Trigger | Description | Duree | Volume |
|-----|---------|-------------|-------|--------|
| `ui_click` | Click bouton | Click sec, metallique | 50-80ms | 0.6-0.8 |
| `ui_hover` | Hover bouton | Subtle whoosh | 30-50ms | 0.2-0.3 |
| `ui_panel_open` | Ouverture modal | Slide + latch | 150-200ms | 0.5-0.7 |
| `ui_panel_close` | Fermeture modal | Reverse slide | 100-150ms | 0.4-0.6 |
| `ui_tab_switch` | Changement onglet | Click doux | 40-60ms | 0.3-0.5 |
| `ui_drag_start` | Debut drag | Subtle pickup | 50ms | 0.3 |
| `ui_drop_success` | Drop valide | Soft land | 80ms | 0.5 |
| `ui_drop_fail` | Drop invalide | Thud sourd | 100ms | 0.4 |

#### B. Gameplay Sounds (Core Loop)

| Son | Trigger | Description | Duree | Volume |
|-----|---------|-------------|-------|--------|
| `res_ice_click` | Click node glace | Crunch + cristal shatter | 100-150ms | 0.7-0.9 |
| `res_regolith_click` | Click depot | Dirt/grit crunch | 80-120ms | 0.6-0.8 |
| `res_collect` | Pickup ressource | Float + absorb | 150-200ms | 0.5-0.7 |
| `build_place` | Placement building | Metal clunk + hiss | 200-300ms | 0.6-0.8 |
| `build_complete` | Construction finie | Fanfare douce | 400-600ms | 0.5-0.7 |
| `build_upgrade` | Amelioration | Powerup sweep | 300-400ms | 0.6 |
| `sell_success` | Vente ressource | Coin cascade | 200-300ms | 0.5-0.7 |
| `sell_fail` | Vente impossible | Buzz sourd | 150ms | 0.4 |

#### C. Building Sounds (Production)

| Son | Trigger | Description | Duree | Volume |
|-----|---------|-------------|-------|--------|
| `drill_active` | Ice Drill en marche | Motor hum + scraping | Loop | 0.3-0.5 |
| `extractor_active` | Water Extractor | Pump + liquid | Loop | 0.3-0.5 |
| `solar humming` | Solar Array | Gentle buzz | Loop | 0.2-0.3 |
| `greenhouse_loop` | Greenhouse actif | Bubbling + warmth | Loop | 0.25-0.4 |
| `production_complete` | Cycle termine | Ding + whoosh | 200ms | 0.5 |
| `power_off` | Building eteint | Spinning down | 300ms | 0.4 |
| `power_on` | Building allume | Spinning up | 200ms | 0.4 |

#### D. Ambient Sounds (Environment)

| Son | Trigger | Description | Duree | Volume |
|-----|---------|-------------|-------|--------|
| `ambient_wind` | Toujours (fond) | Lunar wind, subtil | Loop | 0.1-0.2 |
| `ambient_hum` | Toujours (fond) | Colony machinery base | Loop | 0.1-0.15 |
| `ambient_starfield` | Toujours (fond) | Space ambience | Loop | 0.05-0.1 |
| `notification_success` | Toast success | Positive chime | 300ms | 0.5 |
| `notification_error` | Toast error | Low buzz | 300ms | 0.4 |
| `notification_warning` | Toast warning | Alert tone | 300ms | 0.45 |
| `notification_info` | Toast info | Soft ding | 300ms | 0.35 |

#### E. Music (Optionnel MVP)

| Son | Trigger | Description | Duree | Volume |
|-----|---------|-------------|-------|--------|
| `music_main` | Menu/Idle | Lo-fi space, mellow | Loop | 0.2-0.4 |
| `music_peaceful` | Gameplay | Subtle, non-intrusif | Loop | 0.15-0.3 |

### 3.2 Triggers et Comportement

```
AudioManager.play(soundId, options?)
  - options.volume: 0.0-1.0
  - options.pitch: 0.5-2.0 (randomized for variety)
  - options.pool: boolean (recycle or new instance)
  - options.loop: boolean

AudioManager.stop(soundId)
AudioManager.stopAll(category)
AudioManager.fadeOut(soundId, duration)

AudioManager.setMasterVolume(0.0-1.0)
AudioManager.setCategoryVolume(category, 0.0-1.0)
```

### 3.3 Concurrence et Cooldowns

| Son | Max instances | Cooldown | Pooling |
|-----|---------------|----------|---------|
| `ui_click` | 3 | 50ms | Yes |
| `res_*_click` | 2 | 30ms | Yes |
| `build_place` | 1 | 200ms | No |
| `ambient_*` | 1 each | N/A | Yes (loop) |
| `notification_*` | 3 | 100ms | Yes |

### 3.4 Variations Requises

Pour eviter la repetition, chaque son majeur necessite 2-4 variants:

| Son | Nombre variants | Pitch range |
|-----|-----------------|-------------|
| `ui_click` | 3 | 0.95-1.05 |
| `res_ice_click` | 4 | 0.9-1.1 |
| `res_regolith_click` | 3 | 0.9-1.1 |
| `res_collect` | 3 | 0.95-1.05 |
| `build_place` | 2 | 0.98-1.02 |
| `drill_active` | 3 | 0.9-1.1 (speed) |

---

## 4. Formulas

### 4.1 Volume Mixing

```
finalVolume = baseVolume * masterVolume * categoryVolume * distanceFactor * urgencyMultiplier

Variables:
- baseVolume: valeur par defaut du son (0.0-1.0)
- masterVolume: global, affecte tout (0.0-1.0, default 0.8)
- categoryVolume: par categorie (0.0-1.0)
  - UI: default 1.0
  - SFX: default 1.0
  - Ambient: default 0.7
  - Music: default 0.5
- distanceFactor: attenuation par distance (1.0 = adjacent, 0.5 = loin)
- urgencyMultiplier: 1.0 normal, 1.2-1.5 pour alerts
```

### 4.2 Ducking Configuration

```
Ducking rules (son reduit quand autre son joue):

Trigger: ui_panel_open
- Target: ambient_wind, ambient_hum
- Reduction: -50%
- Attack: 50ms
- Release: 200ms

Trigger: notification_*
- Target: music, ambient_hum
- Reduction: -70%
- Attack: 20ms
- Release: 300ms

Trigger: production_complete
- Target: ambient_hum
- Reduction: -30%
- Attack: 100ms
- Release: 500ms
```

### 4.3 Pitch Randomization

```
finalPitch = basePitch * random(pitchMin, pitchMax)

Pour res_ice_click (basePitch = 1.0, range = 0.9-1.1):
- Variant 1: 0.92
- Variant 2: 0.97
- Variant 3: 1.03
- Variant 4: 1.08

Selection: Round-robin par defaut, random pour clicks frequents
```

### 4.4 Distance Attenuation (Spatial Audio)

```
distanceFactor = 1.0 / (1.0 + distance * 0.5)

Pour une grille 6x6:
- Cellule adjacente: distance = 1, factor = 0.67
- Cellule opposite: distance = 8, factor = 0.20
```

---

## 5. Edge Cases

### 5.1 Mobile Silent Mode

**Detection:**
```typescript
// Respecter le mute systeme
if (document.hidden) {
  // Ne pas jouer de son si tab cache
}

// Mobile: utiliser AudioContext avec resume()
const resumeAudio = async () => {
  if (audioContext.state === 'suspended') {
    await audioContext.resume();
  }
};
```

**Comportement:**
- Si `prefers-reduced-motion` active: sons UI courts, pas de loops ambiantes
- Si `page-visibility` = hidden: pause all non-essential audio
- Si `mediaSession.metadata` present: peut affecter playback

### 5.2 Low Battery Mode

**Detection:**
```typescript
const isLowPower = navigator.getBattery?.()?.then(b => b.charging === false && b.level < 0.2);
```

**Comportement si active:**
- Desactiver ambient loops
- Reduire volume global de 20%
- Desactiver music
- Garder SFX UI mais reduit a 70%

### 5.3 Performance Budget

| Metrique | Cible | Maximum |
|----------|-------|---------|
| Audio instances simultanees | 8 | 16 |
| Memoire audio | 10MB | 20MB |
| Latence click-to-sound | <50ms | <100ms |
| CPU audio | <5% | <10% |

**Optimisations:**
- Sprite sheet pour SFX similaires
- Pooling强制 pour sons frequents
- Decodage lazy (load on demand)
- Compression (OGG pour volume, AAC pour quality)

### 5.4 Browser Compatibility

| Feature | Fallback |
|---------|----------|
| Web Audio API | Howler.js (abstraction) |
| Howler.js | HTML5 Audio |
| OGG format | MP3 fallback |
| Spatial audio | Pan simple |
| Audio sprites | Full file |

### 5.5 Background Tab Behavior

- Sons UI: silencieux si tab cache (visibilitychange event)
- Ambient loops: pause + resume
- Music: continue si mobile (respecte policy)
- Gameplay sounds: queue si rapid, play on focus

### 5.6 Interruption Handling

| Scenario | Comportement |
|----------|--------------|
| Appel telephone | Pause music + ambient, resume after |
| Notification systeme | Fade temporaire si notification importante |
| Switch app | Pause non-essential, resume on return |
| Lock screen | Pause tout, resume on unlock |

---

## 6. Dependencies

### 6.1 Audio System Architecture

```
AudioManager (singleton)
  ├── WebAudioContext / HowlerEngine
  ├── SoundPool[]
  ├── AmbientChannel[]
  ├── MusicChannel
  └── DuckingController

Fichiers:
  src/features/audio/
    AudioManager.ts       # Singleton facade
    SoundPool.ts         # Object pooling
    categories/
      UISounds.ts         # UI sound definitions
      GameplaySounds.ts   # Core loop sounds
      AmbientSounds.ts    # Environment sounds
      Music.ts            # Background music
    hooks/
      useAudio.ts         # React hook
      useSound.ts         # Individual sound trigger
    utils/
      spriteParser.ts     # Sprite sheet decoder
      volumeCalculator.ts # Formula 4.1
      duckingManager.ts   # Cross-fade logic
```

### 6.2 Integration Points

**GameState (core):**
- Offline return: trigger `offline_return` sound
- Achievement unlock: trigger `achievement` + `fanfare`
- Save/load: no sound (silent)

**BuildingSystem:**
- `build_complete`: trigger `build_complete`
- `building.powerOn/Off`: trigger `power_on/power_off`
- Production cycle end: trigger `production_complete`

**ResourceSystem:**
- `addResource`: trigger `res_collect` variant
- `removeResource`: no sound (silent deduction)

**NotificationSystem:**
- `notify(type)`: trigger `notification_{type}`
- Cooldown: 100ms between same type

**UIController:**
- Panel open/close: trigger `ui_panel_open/close`
- Button interaction: trigger `ui_click`
- Drag operations: `ui_drag_start/drop_success/fail`

### 6.3 External Libraries

| Library | Usage | Fallback |
|---------|-------|----------|
| **Howler.js** | Audio abstraction, spatial, pooling | HTML5 Audio |
| **Web Audio API** | Low-latency, real-time processing | Howler fallback |

### 6.4 Asset Dependencies

```
assets/audio/
  sfx/
    ui/
      click_01.ogg
      click_02.ogg
      click_03.ogg
      hover.ogg
      panel_open.ogg
      panel_close.ogg
      tab_switch.ogg
    gameplay/
      ice_click_01.ogg
      ice_click_02.ogg
      ice_click_03.ogg
      ice_click_04.ogg
      regolith_click_01.ogg
      regolith_click_02.ogg
      regolith_click_03.ogg
      collect_01.ogg
      collect_02.ogg
      collect_03.ogg
      build_place_01.ogg
      build_place_02.ogg
      build_complete.ogg
      build_upgrade.ogg
      sell_success.ogg
      sell_fail.ogg
    buildings/
      drill_active_loop.ogg
      extractor_active_loop.ogg
      solar_hum_loop.ogg
      greenhouse_loop.ogg
      power_off.ogg
      power_on.ogg
      production_complete.ogg
    notifications/
      success.ogg
      error.ogg
      warning.ogg
      info.ogg
  ambient/
    wind_loop.ogg
    colony_hum_loop.ogg
    starfield_ambient.ogg
  music/
    main_theme.ogg
    peaceful_loop.ogg
```

---

## 7. Tuning Knobs

### 7.1 Volume Controls

| Knob | Default | Range | Affecte |
|------|---------|-------|---------|
| `masterVolume` | 0.8 | 0.0-1.0 | Tout |
| `sfxVolume` | 1.0 | 0.0-1.0 | Categories: UI, Gameplay, Buildings |
| `musicVolume` | 0.5 | 0.0-1.0 | Music channel only |
| `ambientVolume` | 0.7 | 0.0-1.0 | Ambient channel only |

### 7.2 SFX Category Split

| Sub-category | Relative Volume | Example |
|--------------|-----------------|---------|
| `sfx.ui` | 1.0 | Clicks, panels |
| `sfx.gameplay` | 0.9 | Resources, collection |
| `sfx.buildings` | 0.8 | Production loops |
| `sfx.notifications` | 1.0 | Toasts |

### 7.3 Mobile-Specific Adjustments

| Knob | Default | Condition |
|------|---------|-----------|
| `mobileLowLatency` | true | Mobile browser |
| `mobileHapticFeedback` | true | Touch device |
| `mobileBackgroundPause` | true | Mobile only |

### 7.4 Performance Limits

| Parameter | Default | Max | Description |
|-----------|---------|-----|-------------|
| `maxSfxInstances` | 8 | 16 | Concurrent sound limit |
| `audioSpriteThreshold` | 100KB | - | Use sprite above this size |
| `predecodeOnHover` | true | - | Decode audio on button hover |

### 7.5 Pitch Variation Controls

| Sound Type | Pitch Range | Variants |
|------------|-------------|----------|
| UI clicks | 0.95-1.05 | 3 |
| Resource clicks | 0.9-1.1 | 4 |
| Placement sounds | 0.98-1.02 | 2 |
| Collection sounds | 0.95-1.05 | 3 |
| Building loops | 0.9-1.1 | 3 |

### 7.6 Ducking Fine-Tuning

| Trigger | Target Reduction | Attack | Release |
|---------|-----------------|--------|---------|
| UI panel open | -50% | 50ms | 200ms |
| Notification | -70% | 20ms | 300ms |
| Production complete | -30% | 100ms | 500ms |
| Achievement | -80% | 50ms | 1000ms |

---

## 8. Acceptance Criteria

### 8.1 Functional Criteria

| ID | Critere | Methode de test |
|----|---------|-----------------|
| AC-01 | Chaque click sur un node de ressource produit un son unique avec variation | Click 10x sur meme node, verifier variation audibile |
| AC-02 | Sons UI joues en moins de 50ms apres interaction | Tester avec audio latency meter |
| AC-03 | Ambient sounds loop seamless sans gap audible | Ecouter 60s de chaque ambient |
| AC-04 | Volume controls affectent les categories correctes | Tester chaque slider independamment |
| AC-05 | Mute global coupe tout son | Activer mute, verifier silence complet |
| AC-06 | Sons ne se chevauchent pas de maniere desagreable | Action rapide repetee, verifier pas de cacophonie |
| AC-07 | Background tab: sons UI silencieux | Switcher tab, cliquer, verifier silence |
| AC-08 | Mobile: audio resume apres interruption | Lock/unlock device |
| AC-09 | Building loops s'arretent/demarrent proprement | Toggle building on/off |
| AC-10 | Sprite sheet charge et joue les variants corrects | Inspecter audio sprite atlas |

### 8.2 Audio Quality Criteria

| ID | Critere | Methode de test |
|----|---------|-----------------|
| QC-01 | Pas de clipping ou distorsion | Monitoring waveform |
| QC-02 | Silence entre loops < 2ms | Oscilloscope检查 |
| QC-03 | Pitch variation naturelle, pas robotique | Ecoute humaine |
| QC-04 | Volumes relatifsen coherence avec la direction | Comparaison croisee |
| QC-05 | Son ne generent pas de fatigue auditive (1h session) | Playtest prolonge |

### 8.3 Performance Criteria

| ID | Critere | Methode de test |
|----|---------|-----------------|
| PF-01 | Memoire audio < 10MB total | Chrome DevTools Memory |
| PF-02 | CPU audio < 5% idle | Profiler |
| PF-03 | Latence click-to-sound < 50ms desktop | Timestamp comparison |
| PF-04 | Latence click-to-sound < 100ms mobile | Timestamp comparison |
| PF-05 | 60 FPS maintenu avec audio actif | Frame rate monitor |

### 8.4 Mobile Criteria

| ID | Critere | Methode de test |
|----|---------|-----------------|
| MB-01 | Respecte le mute systeme iOS/Android | Test manuel sur appareil |
| MB-02 | Audio contexte resume apres user gesture | Tap-to-start implementation |
| MB-03 | Low battery mode active si detecte | Simuler batterie faible |
| MB-04 | Pas de audio playing sans permission | Browser console check |
| MB-05 | Audio neprevent pas sleep mode impropre | Inactivity test |

### 8.5 Compatibility Criteria

| ID | Critere | Methode de test |
|----|---------|-----------------|
| CP-01 | Fonctionne sur Chrome 90+ | Automated test |
| CP-02 | Fonctionne sur Safari 14+ | Manual test |
| CP-03 | Fonctionne sur Firefox 88+ | Automated test |
| CP-04 | Graceful degradation sans Web Audio | Fallback test |
| CP-05 | Audio charge sur connexion lente (3G) | Network throttling |

---

## References

- Art Direction: `design/gdd/ICE-DRILL-ART-DIRECTION.md`
- Game Design: `design/gdd/ICE-DRILL-GAME-DESIGN.md`
- Systems Architecture: `design/gdd/ICE-DRILL-SYSTEMS-INDEX.md`
- Audio implementation: `src/features/audio/AudioManager.ts` (to be created)

---

*Document Version: 1.0*
*Created: 2026-03-28*
*Author: Sound Designer Agent*
*Status: Draft - Pending Audio Director Approval*
