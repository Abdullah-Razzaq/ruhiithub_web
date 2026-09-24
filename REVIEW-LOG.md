# Review log

What each installed skill contributed, stage by stage. Direction and structure live in `DESIGN.md`.

## Stage 1 · Direction (tastemaker + web-design-engineer)

- Facts verified first (web-design-engineer Step 0): both Play listings parsed, real icons and screenshots downloaded, real reviews and figures recorded in `src/lib/content.ts`.
- Palette grounded in the shipped app icons (`extract_palette.py`) plus `generate_palette.py --mood elegant --seed 7`, every text pairing checked with `check_contrast.py`.
- Raw app screens cropped out of the store art so the page shows real UI with no fake phone chrome (tastemaker cross-cutting rule).
- No agency logo exists, so a geometric mark was constructed from the eight fold star (tastemaker logo rule). Replace it when an official logo exists.

## Stage 2 · Structure (landing-page-design, Part A)

- One offer, one audience, one primary action (Start a project). Layout type A carried by the Editorial Index chapters macrostructure.
- Mandatory tagline reveal (B11), FAQ with FAQPage JSON-LD, skip link, custom 404, privacy page, favicon and meta (B10).
- Part B rules that conflict with the locked direction (single typeface, no italics, gradient hero text) were not applied, per the brief.

## Stage 3 · Build

Next.js 16, TypeScript, Tailwind v4, shadcn/ui (Radix accordion, input, textarea, label), Motion, Lenis. Solar icons only.

## Stage 4 · Animation (Emil Kowalski: review-animations, animate)

| Before | After | Why |
| --- | --- | --- |
| Hero entrance in Motion with `y`/`rotate` shorthands | CSS keyframes (`hero-rise`, `hero-line`, `hero-arch`, `hero-screen`, `draw-in`) | Runs off the main thread during hydration, and the first frame is complete without JavaScript |
| Primary CTA settled about 1.45s after load | Copy beats at 0, 80 to 220, 320, 400, 480ms | The action should never wait for decoration |
| Playhead animated `left` on scroll | `transform: translateX()` on a full width wrapper | Layout property on every scroll frame |
| Reveal: `y: 24`, 800ms, hidden without JS | `transform: translateY(16px)`, 700ms, `<noscript>` fallback | Hardware accelerated, lighter, robust |
| Qalbify screen crossfade showed two states | 450ms with `blur(4px)` bridge | Blur masks an imperfect crossfade |
| Progress dots animated `width` | `scaleX` inside a fixed track | GPU only |
| Nav faded in on every load | Removed | No purpose, delayed the menu |
| Mobile menu 500ms + 50ms stagger, 300ms morph, bouncy active pill | 350ms + 40ms, 250ms, `bounce: 0` | Drawer budget, crisp UI |
| Press feedback 200ms, chevron 300ms | 150ms, 200ms | Button press 100 to 160ms, UI under 300ms |

Hover motion is already gated: Tailwind v4 wraps `hover:` in `@media (hover: hover)`.

## Stage 5 · High-end polish (Meng To: build-awwwards-quality-sites, no-ai-design-slop)

- Section headings now rise word by word with a 40ms stagger, unsplit text kept as the accessible name (`split-heading.tsx`).
- Hero gained additive pointer depth: spring smoothed, fine pointers only, off under reduced motion (`pointer-parallax.tsx`).
- The empty dome of the Qalbify sticky arch now carries the rosette, tying the chapter to the hero.
- Ayyami's tiny cropped thumbnails became an art directed fan of the three real screens, with annotation pins moved to the card edge so they point at labels instead of covering them.
- Problem track labels restack below 640px so they no longer collide.

## Stage 6 · Final audit (Jakub Krehel: interface-review → better-interface)

Scope: the uncommitted working tree (the whole portfolio), reviewed across the six domain skills in better-interface order. `better-interface`, `better-accessibility`, `better-colors` and `better-writing` were installed for this stage because `interface-review` hands its verdict to them. Verified in the running page where the rule depends on runtime (focus, contrast over night sections, menu containment, 320px reflow).

| Severity | Domain | Location | Before | After |
| --- | --- | --- | --- | --- |
| HIGH | Accessibility | `ui/accordion.tsx`, `ui/input.tsx`, `ui/textarea.tsx` | `outline-none` silently zeroed the focus outline (Tailwind v4 sets the outline style to none) | Removed; FAQ triggers and fields now show the 2px brass focus outline |
| HIGH | Color | `nav.tsx` | Nav pill at 80% over night sections put `ink-soft` links at 4.17:1 | 90% fill, 5.24:1 |
| HIGH | Color | `contact.tsx` | Placeholder 4.14:1, field border 1.43:1 on night | Placeholder 5.04:1, border 3.55:1 |
| HIGH | Writing | `contact.tsx` | Errors did not say how to fix them; the 20 character rule was hidden | Errors say what to enter; the rule is a visible hint under the field |
| HIGH | Accessibility | `nav.tsx` | Current section shown by colour alone | Brass underline added to the active link |
| MEDIUM | Accessibility | `nav.tsx` | Mobile menu claimed `aria-modal` but Tab escaped behind the overlay | Disclosure pattern; `main` and `footer` go `inert` while open |
| MEDIUM | UI | buttons site wide | `transition-[…,transform]` never animated Tailwind v4's `scale` property; three press values | `transition-[…,scale]`, one press value (0.97), Qalbify store button gained press feedback |
| MEDIUM | Typography | `hero.tsx` | Forced lines wrapped into 6 ragged lines on phones and at 1024 to 1041px | One balanced paragraph on phones (accessible name kept), a size tier down at `lg` |
| MEDIUM | Layout | `chapter-ayyami.tsx` | DOM order put the store link before its heading | DOM follows reading order; grid places columns |
| MEDIUM | Layout | `services.tsx`, `proof.tsx` | 12 column rows squeezed body copy to 30 characters at 768px; stats touched their divider | Rows hold until `lg`; stats padded both sides and step down on small phones |
| MEDIUM | UI | `screen.tsx`, `chapter-ayyami.tsx`, icons | Tinted outlines on images; white tiles lost their edge | Neutral `black/10` outlines |
| MEDIUM | Typography | `accordion.tsx`, privacy page | Measures ran about 96 characters | Capped with `max-w-lg` / `max-w-xl` |
| LOW | Polish | various | Outer arch radius not concentric, 112px and 56px off scale, dead Inter font features, Copy button swap, live region inserted with its text, required fields unstated, dates coupled to stats | All corrected |

Mechanical gates after the audit: tastemaker `anti_slop_scan.py` passes, `check_component_coherence.py` passes (one icon family, one motion engine), zero em dashes, `next build` passes. `audit_motion.py` reports three `ease-in` hits that are the `--ease-in-out` token name, not `ease-in` easing.

Verdict after fixes: **Approve**. Not verified: Windows forced colours, real screen readers, Safari on iOS.

## Follow up · Liquid glass nav, screen alignment, stacking services

- **Liquid glass navigation** (`nav.tsx`, `liquid-glass.tsx`, `globals.css`): the pill is now layered glass. It has a saturated backdrop blur, a rim light and top sheen, and in Chromium real edge refraction from an SVG displacement map generated to the pill's exact size. The tint adapts to the ground below (`data-nav-tone="dark"` on the Qalbify chapter, Contact and Footer), so links keep the contrast the Stage 6 audit required. Inactive links use full ink rather than `ink-soft`, and the current section is marked by the pill and underline, not colour. `prefers-reduced-transparency` gets a solid pill.
- **Qalbify sticky screens**: screens were bottom aligned, so the three taller captures rose into the progress bars. Every screen now hangs from the same top line (14% of the arch) and the arch clips the bottom.
- **Services as stacking cards** (`service-stack.tsx`): each service is a sticky card with the real screen from the app it shipped in, grounded in that app's colour. Earlier cards settle back with a transform only `scale()` tied to scroll (off under reduced motion; the sticky stack itself remains).
- **Next 16 images**: the deprecated `priority` prop is replaced by `loading="eager"`, with `fetchPriority="high"` on the hero's LCP screen. This clears the dev overlay warning.

## Follow up · Process rail, review cards, Ayyami on phones

- **Process on phones and tablets** (`process.tsx`): a vertical rail joins the four star nodes. Each segment fills with `scaleY` as it crosses the reading line (62% of the viewport), so the thread draws step by step while you scroll. Desktop keeps its horizontal thread.
- **Reviews** first became stacking cards; that was replaced (see below). The stacking lives in one shared primitive (`stack.tsx`), used by Services.
- **Ayyami on phones** (`ayyami-mobile.tsx`): the three real screens arrive as a closed deck and fan open as they rise into view. The annotation notes are a swipe carousel linked to the calendar pins: the note in view lights its pin, and tapping a pin brings its note into view. Facts became icon tiles. Tablets and desktop keep the annotated fan.
- **Content fix**: pin 3 points at the calendar's Previous control, so note 3 now describes browsing past months ("Your full history") instead of family profiles, which remain listed in the facts.

## Follow up · Reviews as a listening room

- **Review player** (`review-player.tsx`) replaces the stacked review cards. Qalbify is an audio app, so its reviews play like tracks: a playlist of the three reviewers, one large quote that lights up word by word like synced lyrics, and a Qalbify waveform that fills as the playhead runs (linear, since it is constant motion). The next review plays when one ends.
- **Control and restraint**: it plays only while at least 45% of it is on screen and the tab is visible, has play/pause, next, and a clickable playlist, and the equalizer on the playing track animates only while playing. Under reduced motion there is no autoplay and every word shows at full strength.
- **Accessibility**: the full quote is the accessible text (the split words are decorative), playlist buttons carry `aria-current`, and the stars keep their "Rated 5 out of 5" label.

## Follow up · Reviews removed, bigger FAQ

- **Review player removed** on every screen size (and its code, the equalizer keyframes and the `reviews` data). The proof section keeps its real Google Play stat strip, retitled "Proof you can check on Google Play." so the heading matches what remains.
- **FAQ enlarged**: heading `text-5xl md:text-6xl lg:text-7xl` over five columns, questions in Gloock at `text-2xl md:text-3xl` with taller rows, answers at `text-lg` (measure capped at `max-w-xl`), and 48px toggles.
