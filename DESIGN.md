# Ruhi IT Hub · Design plan

Single source of truth for the portfolio build. Every stage below reads from this file instead of re-deriving the direction.

## 0. Skill pipeline (which skill runs when)

| Stage | Skill(s) (installed in `.claude/skills/`) | Job | Output |
|---|---|---|---|
| 1 · Direction | **tastemaker** (Steps 0 to 2.5), **web-design-engineer** (Design Read, dials, system declaration), supported by `color-system`, `typography-scale`, `spacing-system` | Visual thesis, type, color, spacing, rhythm, motion language, imagery | §1 below + `.tastemaker/style-lock.md` |
| 2 · Structure | **landing-page-design** (Elaya, Part A only), tastemaker `narrative-arc` + `macrostructures` + `component-catalog` | Section order, conversion strategy, copy, FAQ, SEO | §2 below |
| 3 · Build | Next.js 16 + TypeScript + Tailwind v4 + shadcn/ui + Motion, guided by `interfaces-that-feel`, `micro-interaction-spec`, `responsive-design`, `layout-grid` | Implement section by section (Elaya A6) | `src/` |
| 4 · Animation | **Emil Kowalski**: `review-animations`, `improve-animations`, `animate`, `emil-design-eng` (+ `animation-principles`, `motion-system`) | Audit easing, duration, sequencing, reduced motion. Improve only where motion adds meaning | motion fixes |
| 5 · High-end polish | **Meng To**: `build-awwwards-quality-sites`, `no-ai-design-slop` | Raise visual quality without replacing the brand direction | polish fixes |
| 6 · Final audit | **Jakub Krehel**: `interface-review`, `better-ui`, `better-typography`, `better-layout` (+ `critique-*`, `accessibility-audit`) | Audit UI, type, layout, color, a11y, writing, interaction. Fix only the highest-impact problems | audit fixes |

Conflict rule: the user's explicit instructions win, then this file, then individual skill defaults. Elaya's Part B visual rules (single typeface, no italics, gradient hero text) conflict with the Stage 1 direction and the user said "do not change the established visual direction", so Part B is applied only where it does not conflict (spacing scale, radius formula, icons, states, ship requirements, tagline reveal, no hyphens in copy).

## 1. Direction (Stage 1)

### Facts (verified, web-design-engineer Step 0)
- RUHI IT HUB, Lahore 54000, Pakistan. Contact: info@ruhiithub.com. Domain ruhiithub.com (not resolving yet).
- Qalbify: Quran and Islamic audio, 100% music free, zero ads, offline + background play, creator monetization. Google Play: 5.0 stars, 17 reviews, 500+ downloads, updated Sep 13 2026.
- Ayyami: cycle tracking for Muslim women with built in Hanafi fiqh rulings, prayer times, duas, up to 5 family profiles, encrypted, data never sold. Google Play: 10+ downloads, rated 3+, updated Jul 3 2026.
- No existing agency logo found. A geometric mark is constructed (tastemaker logo rule, cold start). Flag to the client for replacement.

### Design Read
```yaml
artifact: agency portfolio / landing page
audience: founders, Islamic orgs, creators and product teams who want a faith aware app partner
visual-language: illuminated manuscript restraint meets modern product studio (not "tech SaaS")
mode: greenfield
visual-variance: 6   # editorial asymmetry, arch motif, one dark chapter
motion-intensity: 5  # one authored hero sequence + one scroll story, calm elsewhere
information-density: 4
asset-dependence: 8  # real app screens + real icons carry the page
brand-fidelity: 9    # app colors and icons used exactly as shipped
```

### Visual thesis
"Quiet craft." The site behaves like the apps: no noise, generous paper, one warm brass accent, and a geometric eight fold star (khatam) that draws itself in hairlines. Arches (the mihrab niche) frame the product. Each app keeps its own color world inside its chapter: Qalbify teal on night, Ayyami rose on blush.

### Mood
Elegant / editorial with a warm lean (tastemaker keyword table: agency + faith/wellness audience).

### Color contract (checked with `tastemaker/scripts/check_contrast.py`)
| Token | Hex | Role |
|---|---|---|
| `paper` | `#F7F3EA` | page background |
| `paper-2` | `#EFE8DA` | surface, cards |
| `ink` | `#1E1A11` | text, primary buttons |
| `ink-soft` | `#5F574A` | secondary text (6.43:1 on paper, 5.84:1 on paper-2) |
| `line` | `#D9D1C1` | hairlines (decorative only) |
| `brass` | `#7F6630` | agency accent, links, ornaments (4.93:1 on paper) |
| `night` | `#131209` | dark chapters (Elaya approved dark value) |
| `on-night` | `#F3EEE2` | text on night (16.2:1) |
| `on-night-soft` | `#A8A18F` | secondary text on night (7.3:1) |
| `brass-bright` | `#D0AD63` | accent on night (8.8:1) |
| `qalbify` | `#04A38D` UI, `#2FD3B4` on night (9.9:1), `#036F61` text on paper (5.5:1) |
| `ayyami` | `#D88DBC` UI, `#8C4A82` text on blush/paper (5.5:1), blush `#FBF1F6` |

Legal pairs: ink on paper/paper-2/blush, paper on ink, brass on paper, brass-bright/on-night/qalbify-bright on night, ink on brass-bright. Nothing else carries text.

### Typography
- Display: **Gloock** (single weight, high contrast serif). Headlines only, never italic.
- Text/UI: **Manrope** 400/500/600/700 (Elaya approved family). Tabular numbers for stats.
- Arabic accent: **Reem Kufi**, only for the Arabic words (روحی, قلب, أيامي). Script specific, not a third Latin family.
- Scale snaps to Tailwind steps. Hero `text-5xl → md:text-7xl → xl:text-8xl`, section heads `text-4xl → md:text-5xl` (about 55% of hero), body `text-base/lg`, labels `text-xs/sm` uppercase tracking `0.14em`.
- `text-wrap: balance` on headings, `pretty` on body. Measure 60 to 68ch.

### Spacing and rhythm
- Base 4px, Tailwind steps only (4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 128, 160).
- Section padding weighted by role: hero and Qalbify chapter `py-32 → py-40`, connective sections `py-24`.
- Internal padding ≤ external gap. Content cards min 24px padding.
- Grid: 12 columns, max width 1280px, 24px gutters mobile / 32px desktop.

### Shape and depth
- Arch frame `rounded-t-full rounded-b-3xl` for the hero window and chapter visuals.
- Cards `rounded-2xl`, inner elements follow the nested radius formula.
- Buttons are pills (concentric with the floating nav pill and the arches).
- Depth: hairlines first, one soft warm shadow token for floating screens only. No glass except the nav pill.

### Motion language
- Engine: Motion (`motion/react`) for all component motion + Lenis as the single smooth scroll engine (disabled under reduced motion).
- Easing: `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` for entrances, `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)` for on screen movement, springs only for pointer driven motion.
- Durations: UI feedback 120 to 200ms, reveals 600 to 900ms, the hero lattice draw 1.6s (one time, decorative).
- Beats: hero sequence (lattice draws → headline lines rise → copy and CTA → arch window reveals), Qalbify sticky scroll story, problem section playhead, tagline word reveal. Everything else is a quiet fade up, once.
- Reduced motion: final states render immediately, no smooth scroll, no scrubbed timelines.

### Imagery direction
- Real app screens cropped from the Play Store listing art (no fake phone chrome), hairline border, real app icons.
- Authored geometry only: the star lattice, the mark, data graphics (waveform problem visual). No stock photos, no people, no illustrations drawn by the model, no emoji.
- Icons: Solar (Iconify) line set, one family site wide.

## 2. Structure and conversion (Stage 2, Elaya Part A)

- One offer: a studio that designs and ships faith aware mobile apps.
- One audience: people with an app idea for Muslim users (plus teams who want the same values).
- One primary action: **Start a project** (email / contact form). Secondary: **See our work**.
- Layout type: **A · Classic hero plus sections**, carried by the tastemaker **Editorial Index / chapters** macrostructure, because the work (two shipped apps) is the argument.

### Arc and archetypes
| # | Beat | Section | Archetype |
|---|---|---|---|
| 1 | Hook | Hero: headline, subhead, CTA, one proof line, arch window with two real screens | N3 floating pill nav, H2 split demo |
| 2 | Problem | "The interruption": waveform comparison, ad with music inside a recitation vs Qalbify | data graphic band |
| 3 | Solution | Chapter 01 Qalbify (night) | F3 sticky scroll stack |
| 3 | Solution | Chapter 02 Ayyami (blush) | F5 annotated capture |
| 4 | Tagline | Large word by word reveal (Elaya B11) | statement |
| 5 | Offer | Services as a spec sheet, each row tied to where it shipped | F6 spec sheet |
| 6 | How it works | Four step process | F4 step sequence |
| 7 | Proof | Real Google Play reviews + real listing stats | P2 quotes + P4 stat strip |
| 8 | Objections | FAQ (7 questions, FAQ schema) | accordion |
| 9 | Close | Contact form (mailto compose) + direct email | C1 inline form |
| 10 | Footer | Statement close, Lahore, email, store links, privacy | Ft4 |

### Hero copy
- Headline: **Apps that stay quiet while you pray, listen and remember.**
- Subhead: Ruhi IT Hub is a Lahore studio designing and building mobile apps for Muslim life. No ads inside worship, no data sold, no music where it does not belong.
- CTA: Start a project · See our work
- Proof line: Two apps live on Google Play · Qalbify rated 5.0 by its listeners

### SEO / AEO
Index. Title "Ruhi IT Hub · Mobile apps for Muslim life, built in Lahore". FAQ in plain Q/A with FAQPage JSON-LD. Organization JSON-LD.
