# ICE DRILL: Lunar Colony - Game Pillars

## 1. Overview

ICE DRILL est un jeu idle/incremental de colonisation lunaire inspire de Sunflower Land. Les piliers definescents l'identite du jeu et guident toutes les decisions creatives. Ils expriment ce qu'ICE DRILL EST et ce qu'il n'est PAS, en creant un cadre pour resoudre les conflits entre departments.

**Les 5 piliers:**
1. **Instant Gratification** — Chaque action produit un feedback immediat et satisfaisant
2. **Chain Reaction** — Les chaines de production sont visibles, traceables, et satisfaisantes a regarder fonctionner
3. **Fair Climb** — Aucun avantage pay-to-win, aucun temps d'attente artificiel, aucune ressource bloquee derriere un paywall
4. **Lunar Immersion** — Chaque element du jeu renforce l'atmosphere de colonisation spatiale contemplativa
5. **Meaningful Milestones** — Chaque progression est un accomplishment tangible quiouvre nouveau contenu

**Les 4 anti-pillars:**
- Nous ne sommes PAS un jeu pay-to-win
- Nous ne sommes PAS un jeu avec des "cooldowns" ou " energy gates" qui bloquent le progres
- Nous ne sommes PAS un jeu avec du contenu ferme derriere des temps d'attente de plus de 5 minutes
- Nous ne sommes PAS un jeu qui sacrifie l'atmosphere lunaire pour de la facilite de monetisation

---

## 2. Player Fantasy

Le joueur incarne un ingenieur en charge d'etablir une presence humaine permanente sur la Lune. La lune evoque l'isolement, la beaute sterne, et la survie dans un environnement hostile. L'atmosphere est a la fois contemplative (regarder la Terre se lever a l'horizon) et satisfaisante (voir sa colonie croitre de quelques modules a une base autonome).

**Emotions cibles par phase:**

| Phase | Emotion | Description |
|-------|---------|-------------|
| Early Game | Decouverte | "Je explore un monde nouveau" |
| Mid Game | Agency | "Ma colonie travaille pour moi" |
| Late Game | Mastery | "J'ai trouve le setup optimal" |
| End Game | Prestige | "Je recommence en mieux" |

**Fantasy Archetypes (selon Bartle):**

- **Achievers** (80% cible): Progression through resource accumulation and building construction. Economic hook: "I need more He-3 to unlock the next tier"
- **Explorers** (15% cible): Discovery of new resource types and building combinations. Economic hook: "What happens if I chain these buildings differently?"
- **Managers** (5% cible): Long-term optimization and efficiency mastery. Economic hook: "How do I maximize He-3/minute?"

**MDA Aesthetics Hierarchy:**

1. **Fantasy** (primaire) — Etre un pionnier spatial, construire une colonie sur la Lune
2. **Discovery** (secondaire) — Decouvrir de nouveaux nodes, technologies, chaines de production
3. **Submission** (tertiaire) — Loops idle satisfaisantes, regarder sa colonie fonctionner

---

## 3. Detailed Rules

### 3.1 Pillars

#### PILLAR 1: Instant Gratification

**Definition:** Chaque action du joueur produit un feedback immediat, visible, et satisfaisant. Les clics, constructions, et progressions doivent etre accompagnes de particules, animations, et sons qui renforcent le sentiment de progres.

**Design Test:**
- Q: "On debate entre un feedback simple et rapide (nombre +1) vs une animation complexe de 2 secondes qui delay le progres."
- A: **PILLAR 1 DIT:** Preferez le feedback simple et rapide. L'emotion recherchee est la satisfaction immediate, pas lspectacle. Une animation de 2 secondes qui bloque le joueur viole ce pilier.

**Application:**
- Resource nodes: particules + son + nombre qui pop (100-200ms max)
- Building placement: flash + grow animation (300-500ms)
- Level up: notification + fanfare (1s max, non-blocking)
- Production complete: notification discrete (non-blocking)

**Contre-exemple (violation):**
- Systeme de "rush" qui prend 10 secondes par utilisation
- Animation de construction qui bloque le joueur
- "Loading" pour une action simple

---

#### PILLAR 2: Chain Reaction

**Definition:** Les chaines de production sont visuellement traceables du debut a la fin. Le joueur peut voir Ice devenir Water Ice, puis Oxygen, avec des indices visuels de flux. Chaque maillon de la chaine doit avoir un but clair et etre satisfaisant a observer.

**Design Test:**
- Q: "On debate entre un indicateur de production numerique (X/sec) vs un flux visuel ou les ressources transitent d'un batiment a l'autre."
- A: **PILLAR 2 DIT:** Preferez les indices visuels de flux. Un joueur qui regarde sa chaine Ice -> Water Extractor -> Oxygen Generator doit pouvoir voir le flux physically. Les chiffres seuls ne suffisent pas.

**Application:**
- Ressources avec icons qui " voyagent " entre batiments
- Progress bars sur chaque batiment
- "Flow indicators" reliant les batiments dependants
- Satisfaction auditive quand une chaine complete un cycle

**Contre-exemple (violation):**
- Batiments qui produisent "dans le vide" sans indication visible
- Ressources qui apparaissent sans trajectory visible
- Chaines de production impossibles a tracer visuellement

---

#### PILLAR 3: Fair Climb

**Definition:** Le progres est base sur le temps et les skills du joueur, jamais sur l'argent reel. Aucun avantage pay-to-win, aucun temps d'attente artificiel obligatoire, aucune ressource critique bloquee derriere un paywall.

**Design Test:**
- Q: "On veut ajouter un 'boost' achetable avec de l'argent reel qui double la production pour 1 heure."
- A: **PILLAR 3 DIT:** NON. Tout avantage achetable avec de l'argent reel viole ce pilier. Un joueur gratuit doit pouvoir atteindre le meme endgame qu'un joueur payeur, juste plus lentement.

**Application:**
- Toutes les currencies earnable gratuitement
- Temps d'attente max: 5 minutes pour accelerate (optionnel, pas obligatoire)
- Pas de "energy gates" qui bloquent le jeu
- Pas de "premium currency" exclusive a l'achat reel

**Contre-exemple (violation):**
- "Buy 1000 Helium-3 for $9.99"
- Energy system qui limite les clics
- Content bloque derriere un paywall

---

#### PILLAR 4: Lunar Immersion

**Definition:** Chaque element du jeu — UI, sons, visuels, interactions — renforce l'atmosphere de colonisation spatiale contemplativa. Le joueur doit se sentir sur la Lune, pas dans un ferme standard avec des sprites de lune.

**Design Test:**
- Q: "On debate entre un asset 'green grass' pour le Greenhouse (plus familier) vs un asset 'lunar growth chamber' (plus authentique)."
- A: **PILLAR 4 DIT:** Preferez l'authenticite lunaire. Le joueur vient sur la Lune, pas sur Terre. Les "lunar growth chambers" renforcent le fantasy, les "grass fields" le diluent.

**Application:**
- UI: palette icy/space, pas de verts terreux
- Sons: ambient space, pas de chants d'oiseaux
- Visuels: Structures industrielles spatiales, pas de cottages
- Language: "Solar Array", "Life Support", "Regolith", pas "Farm", "Crop", "Soil"
- Icons: Cryogenic tanks, pas de seaux en bois

**Contre-exemple (violation):**
- "Soil" ou "dirt" dans le jeu
- Bruitages de ferme standard
- UI style "cozy cottage"
- Resource nodes qui ressemblent a des champs de ble

---

#### PILLAR 5: Meaningful Milestones

**Definition:** Chaque progression est un accomplishment tangible qui ouvre nouveau contenu ou appreciables. Les уровни (levels), deblochages, et achievements doivent representer un progres reel, pas juste un compteur qui augmente.

**Design Test:**
- Q: "On debate entre 'Level 5 donne acces a +5% production' (bonus minor) vs 'Level 5 debloque le Deep Core Mine' (nouveau contenu)."
- A: **PILLAR 5 DIT:** Preferez le nouveau contenu. Un bonus de 5% n'est pas un "milestone" — c'est une ajustement. Les milestones doivent etre des moments "wow" qui changent ce que le joueur peut faire.

**Application:**
- Level ups debloquent nouveaux batiments, pas juste des stats
- Achievements avec rewards substantiels
- Land expansion = nouveaux nodes et possibilities
- Pas de "level cap" qui semble arbitraire

**Contre-exemple (violation):**
- "+1% efficiency per level" sans cap
- Level ups qui ne changent rien au gameplay
- Content "endgame" qui est juste plus du meme

---

### 3.2 Anti-Pillars

#### ANTI-PILLAR 1: No Pay-to-Win

**Definition:** Nous ne sommes PAS un jeu pay-to-win. Aucun achat ne peut donner un avantage competitif ou blocker le progres.

**Rationale:** Les jeux idle/incrementaux dependent de la satisfaction du progres. Le pay-to-win detruit cette satisfaction en rendant le progres artificiel.

**Specific Exclusions:**
- No "buy resources" microtransactions
- No "skip wait" buttons for real money
- No "premium buildings" that outperform free buildings
- No "energy refills" purchasable

**Exception:** Cosmetics purchasables sont acceptables car ils n'affectent pas le gameplay.

---

#### ANTI-PILLAR 2: No Artificial Waits

**Definition:** Nous ne sommes PAS un jeu avec des "cooldowns" ou "energy gates" qui bloquent le progres de facon permanente.

**Rationale:** Les attente artificielles (je dois attendre 4 heures pour continuer) sont frustrantes et ne creen pas de satisfaction. Les attentes naturelles (ma ressource va prendre 30 secondes a se remplir) sont acceptables car elles sont liees au progres visible.

**Specific Exclusions:**
- No global energy cap that requires waiting to regenerate
- No daily caps that reset at midnight
- No "lives" system
- No "daily quests" mandatory

**Acceptable Waits:**
- Production times (30-120 seconds) — visible progress
- Building construction times — player chose to build
- Offline cap (8 hours) — player was away

---

#### ANTI-PILLAR 3: No Content Gating

**Definition:** Nous ne sommes PAS un jeu avec du contenu ferme derriere des temps d'attente de plus de 5 minutes.

**Rationale:** Un joueur motive doit pouvoir progresser en continuant a jouer. Les "walls" de temps sont demoralisants.

**Specific Exclusions:**
- No "wait 24 hours to unlock next area"
- No "complete 50 waves to access tier 2" (unless doing waves is fun)
- No "earn X stars to progress" where X > 2x natural rate

**Exception:** Endgame content peut requerir plus de temps car il est destine aux joueurs dedicates.

---

#### ANTI-PILLAR 4: No Atmosphere Compromise

**Definition:** Nous ne sommes PAS un jeu qui sacrifie l'atmosphere lunaire pour de la facilite de monetisation ou du "engagement".

**Rationale:** L'atmosphere est ce qui distingue ICE DRILL des autres idle games. La diluer pour des clicks de plus est une fausse economie.

**Specific Exclusions:**
- No "special events" with Earth themes
- No "holiday" events that break immersion
- No "happy harvest" language that doesn't fit lunar setting
- No monetization that interrupts the fantasy

---

## 4. Formulas

### 4.1 Pillar Compliance Test

Quand une decision creatives est prise, elle doit passer le "Pillar Compliance Test":

```
PILLAR_COMPLIANCE = (
  instant_gratification_score * 0.20 +
  chain_reaction_score * 0.20 +
  fair_climb_score * 0.25 +
  lunar_immersion_score * 0.15 +
  meaningful_milestones_score * 0.20
)

ACCEPTABLE = PILLAR_COMPLIANCE >= 0.70
```

Chaque score est de 0 a 1:
- 1.0 = Decisions strongly supports pillar
- 0.5 = Decision neutral to pillar
- 0.0 = Decision violates pillar

**Seuil:** Une decision avec un score < 0.70 doit etre revisee ou abandonnee.

### 4.2 Feedback Timing Formula

Pour le Pillar 1 (Instant Gratification), les timings maximum sont:

```
FEEDBACK_DELAY(action_complexity) = {
  'click': 100ms,
  'build': 300ms,
  'upgrade': 500ms,
  'level_up': 1000ms
}
```

**Implementation:**
- Feedback doit commencer avant le traitement complet
- "Optimistic UI" — montrer le resultat avant la confirmation serveur
- Jamais bloquer le joueur pendant le feedback

---

## 5. Edge Cases

### 5.1 Pillar Conflicts

Les piliers peuvent entrer en conflit. Voici les regles de resolution:

**CONFLIT 1: Instant Gratification vs Chain Reaction**

Resolution: **Chain Reaction prime sur Instant Gratification**

Exemple: "Je voudrais un son a chaque clic de resource, mais le son doit aussi indiquer ou la resource va dans la chaine."

Solution: Le son de clic est rapide (100ms). Le son de "arrival" dans la chaine est separe et peut etre plus long.

**CONFLIT 2: Fair Climb vs Meaningful Milestones**

Resolution: **Fair Climb prime sur Meaningful Milestones**

Exemple: "On pourrait rendre le Deep Core Mine achetable avec de l'argent reel pour que plus de joueurs y accedent."

Solution: NON. Le Deep Core Mine doit rester earnable gratuitement. Trouvez un autre chemin pour le "meaningful milestone".

**CONFLIT 3: Lunar Immersion vs Meaningful Milestones**

Resolution: Depends on severity

Exemple: "On veut ajouter un 'Easter Egg' event avec des lapins pour April Fools."

- Si le content est opt-in et ne viole pas l'immersion (lunar rabbits?):
  - FAIR CLIMB DIT: Acceptable
- Si le content est obligatoire et detruit l'atmosphere:
  - LUNAR IMMERSION DIT: Reject

**CONFLIT 4: Instant Gratification vs Fair Climb**

Resolution: **Fair Climb prime sur Instant Gratification**

Exemple: "On pourrait ajouter un 'instant boost' achetable qui donne +1000 Ice maintenant."

Solution: NON. Le "instant" est acceptable, le "achetable" ne l'est pas. Un "instant boost" gratuit serait acceptable si le cooldown est raisonable.

---

### 5.2 Anti-Pillar Violation Scenarios

| Scenario | Violates | Solution |
|----------|----------|----------|
| "Buy 500 Solar Power for $0.99" | Anti-Pillar 1 | Remove or make earnable |
| "Wait 24h to expand land" | Anti-Pillar 3 | Reduce to 5min or make optional |
| "Energy caps at 50, refill with ads" | Anti-Pillar 2 | Remove energy cap or make free refill |
| "Christmas event with snow" | Anti-Pillar 4 | Use "lunar snow" or reject |

---

## 6. Dependencies

Les piliers dependent et sont dependants par:

### 6.1 Dependents (Systems that depend on Pillars)

| System | Depends On | How |
|--------|------------|-----|
| **UI/UX** | Pillar 1, 4 | Every interaction must have feedback, must feel lunar |
| **Economy** | Pillar 3, 5 | All currencies earnable, progression meaningful |
| **Production** | Pillar 2 | Chain visualization required |
| **Progression** | Pillar 5 | Level ups must unlock content |
| **Audio** | Pillar 1, 4 | Feedback sounds, lunar ambient |

### 6.2 Cross-References

Quand vous modifiez un systeme, verifiez l'impact sur les piliers:

```
Game Design Changes:
- New building? Check Pillar 2 (Chain Reaction), Pillar 4 (Lunar Immersion)
- New resource? Check Pillar 1 (Instant Gratification), Pillar 2 (Chain Reaction)
- New currency? Check Pillar 3 (Fair Climb)

UI Changes:
- New button? Check Pillar 1 (Instant Gratification)
- New panel? Check Pillar 4 (Lunar Immersion)
- Animation change? Check Pillar 1 (Instant Gratification)

Economy Changes:
- New cost? Check Pillar 3 (Fair Climb), Pillar 5 (Meaningful Milestones)
- New reward? Check Pillar 1 (Instant Gratification)
- Price balancing? Check Pillar 3 (Fair Climb)
```

---

## 7. Tuning Knobs

Les "tuning knobs" sont les parametres que les designers peuvent ajuster pour maintenir l'equilibre. Chaque knob est lie a un ou plusieurs piliers.

### 7.1 Pillar Alignment Matrix

| Knob | Instant Gratification | Chain Reaction | Fair Climb | Lunar Immersion | Meaningful Milestones |
|------|------------------------|----------------|------------|-----------------|----------------------|
| `CLICK_FEEDBACK_DELAY_MS` | +++ | - | - | - | - |
| `PRODUCTION_VISUAL_FLOW` | + | +++ | - | + | - |
| `FREE_CURRENCY_RATE` | + | - | +++ | - | + |
| `SPACE_THEME_ASSETS` | - | + | - | +++ | - |
| `UNLOCK_CONTENT_FREQUENCY` | + | - | + | - | +++ |
| `MAX_OFFLINE_HOURS` | ++ | + | ++ | - | + |

Legend: +++ = strongly affects, ++ = affects, + = minor effect, - = no effect

### 7.2 Tuning Ranges

| Parameter | Default | Min | Max | Affects |
|-----------|---------|-----|-----|---------|
| `CLICK_FEEDBACK_DELAY_MS` | 100 | 50 | 200 | Pillar 1 |
| `PARTICLE_COUNT_PER_CLICK` | 5 | 3 | 15 | Pillar 1 |
| `PRODUCTION_BAR_UPDATE_MS` | 1000 | 500 | 2000 | Pillar 2 |
| `CHAIN_INDICATOR_OPACITY` | 0.7 | 0.5 | 1.0 | Pillar 2 |
| `FREE_ENERGY_PER_MINUTE` | 10 | 5 | 20 | Pillar 3 |
| `MAX_OFFLINE_HOURS` | 8 | 4 | 24 | Pillar 3, 5 |
| `MILESTONE_LEVEL_SPACING` | 5 | 3 | 10 | Pillar 5 |
| `CONTENT_UNLOCK_RATE` | 1/level | 1/2 levels | 1/level | Pillar 5 |

### 7.3 Safe Tuning Boundaries

Some parameters should NEVER be tuned across certain boundaries:

**NEVER CROSS:**
- `FREE_CURRENCY_RATE = 0` (violates Anti-Pillar 1)
- `CONTENT_UNLOCK_LEVEL > 50` without new content (violates Anti-Pillar 3)
- `PRODUCTION_VISUAL = off` (violates Pillar 2)
- `SPACE_THEME_ASSETS = generic_earth` (violates Pillar 4)

---

## 8. Acceptance Criteria

### 8.1 Pillar Compliance Checklist

Chaque feature, avant d'etre implementee, doit passer ce checklist:

#### PILLAR 1: Instant Gratification

- [ ] L'action produit un feedback visuel dans les 100ms?
- [ ] L'action produit un feedback audio (si applicable)?
- [ ] Le feedback est non-blocking (joueur peut continuer)?
- [ ] Le feedback est proportionnel a l'action (plus gros = plus de feedback)?

#### PILLAR 2: Chain Reaction

- [ ] Les chains de production sont visualisables?
- [ ] Le joueur peut tracer une resource de sa source a sa destination?
- [ ] Les batiments dependants montrent leur dependency?
- [ ] Y a-t-il un "flow indicator" entre batiments connectes?

#### PILLAR 3: Fair Climb

- [ ] Toutes les currencies sont earnables gratuitement?
- [ ] Aucun "paywall" sur le contenu critique?
- [ ] Les temps d'attente sont optionnels (accelerate) ou courts (<5min)?
- [ ] Aucun avantage competitif achetable?

#### PILLAR 4: Lunar Immersion

- [ ] Les assets sont theme-compatible (pas de ferme standard)?
- [ ] Les sons sont ambient-space (pas de ferme)?
- [ ] Le language est lunar-appropriate?
- [ ] Les colors/UI reflètent le theme spatial?

#### PILLAR 5: Meaningful Milestones

- [ ] Chaque level up debloque-t-il quelque chose de nouveau?
- [ ] Les milestones sont-ils separes par 3-5 niveaux?
- [ ] Le joueur peut-il voir ce qu'il va debloquer ensuite?
- [ ] Les achievements ont-ils des rewards substantiels?

### 8.2 Test Scenarios

| Test | Expected | Pillar |
|------|----------|--------|
| Click Ice Node | +1 Ice visible in <100ms with particles | Pillar 1 |
| Build Water Extractor | See flow from Ice source to Extractor | Pillar 2 |
| Earn 100 He-3 free | Achievable in <2 hours without paying | Pillar 3 |
| UI screenshot | Feels like lunar colony, not farm | Pillar 4 |
| Reach Level 5 | Unlocks something new | Pillar 5 |

### 8.3 Anti-Pillar Violation Tests

| Scenario | Test | Violation |
|----------|------|-----------|
| Try to buy resources | Not possible via IAP | Anti-Pillar 1 |
| Check all costs | All payable with time | Anti-Pillar 2 |
| Progress to Level 10 | Never blocked >5min | Anti-Pillar 3 |
| See event UI | Still lunar-themed | Anti-Pillar 4 |

### 8.4 Validation Gates

**Avant chaque sprint:**
- Review des nouvelles features contre le Pillar Compliance Checklist
- Sign-off par Creative Director

**Avant chaque release:**
- Full pillar audit
- All anti-pillar violations logged and addressed
- Player feedback review pour pillar satisfaction

**Metrics to track:**
- Player retention par phase ( Early/Mid/Late/End)
- "Click satisfaction" via optional feedback button
- Complaint rate about "pay-to-win" or "waiting"
- Player-reported atmosphere breaks

---

*Document Version: 1.0*
*Created: 2026-03-28*
*Status: Initial Draft*
*Creative Director: Approved for development*
