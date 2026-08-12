# Jawai Wild

Cinematic, dark-themed React + Vite site for a fictionalized leopard-safari
brand in Jawai, Rajasthan.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
```

## Architecture

```
src/
  main.jsx              — React root
  App.jsx                — composes Nav + all sections in scroll order
  index.css              — Tailwind layers, cursor rules, reduced-motion, rosette motif
  data/
    packages.js          — 4 safari packages (₹ pricing, inclusions)
    species.js            — 4 species (leopard, jackal, crocodile, crane) + stats + facts
    seasons.js             — 3 seasonal routes (SVG path `d` strings for the map)
  hooks/
    useParallax.js         — 3-layer scroll depth for the hero (bg / text / subject)
    useMagneticButton.js   — cursor-follow pull for the primary CTA
    useCursorTrail.js      — canvas particle trail
    useIsTouchDevice.js    — gates all desktop-only cursor effects
    useReducedMotion.js    — live prefers-reduced-motion flag, read by every animated component
    useLenis.js             — site-wide inertia smooth scrolling
  components/
    CustomCursor.jsx, MagneticButton.jsx, CountUp.jsx, AudioToggle.jsx,
    LiquidTransition.jsx, RosetteDivider.jsx, Nav.jsx
  sections/
    Hero.jsx, Packages.jsx, Gallery.jsx, StatsSection.jsx,
    MigrationMap.jsx, TextMaskSection.jsx, Booking.jsx, Footer.jsx
```

## Design tokens

- **Colour** — `#0A0B0D → #111318` void gradient base, `#F4F1EA` sand text,
  `#D4A24C` safari-gold accent (with `#E8BE6E` bright / `#8A6A32` dim
  variants), `#9C5A34` rust and `#6B7355` sage as secondary earth tones.
- **Type** — Anton (display, condensed uppercase, used sparingly and large)
  paired with Manrope (body) and JetBrains Mono (data: prices, stats, times,
  coordinates) — the mono face is used specifically anywhere a real number
  appears, to read as field-recorded data rather than marketing copy.
- **Signature element** — the leopard-rosette motif (`.rosette-motif` in
  `index.css`): a small cluster of dots built from the same spot pattern
  that identifies an individual leopard, used as the section eyebrow in
  place of generic `01 / 02 / 03` numbering, since these sections aren't a
  sequence.

## Known trade-offs & next steps

- **Liquid warp uses an SVG `feTurbulence`/`feDisplacementMap` filter, not
  a WebGL shader.** It's applied in `LiquidTransition.jsx` as a divider
  between major sections. This keeps the bundle free of `three.js` /
  `ogl` (roughly 150–600kB extra) for an effect that's genuinely subtle at
  this scale. To upgrade: replace `LiquidTransition` with an `ogl` or
  `react-three-fiber` full-screen quad running a ripple fragment shader,
  and drive its uniforms from the same `useInView`/scroll-progress values
  already wired up here.
- **Ambient audio and the leopard video loop use placeholder public CDN
  URLs** (`AudioToggle.jsx`, `TextMaskSection.jsx`) — swap for licensed
  assets before shipping. All image URLs are Unsplash placeholders, clearly
  swappable via `data/species.js` and `Hero.jsx`'s `SEASONS` array.
- **GSAP is scoped to the one place Framer Motion can't reach cleanly** —
  pinning `TextMaskSection` while scrubbing its scale. Everything else
  (parallax, layout animations, path morphing, count-ups, magnetic hover)
  runs on Framer Motion so there's only one animation runtime doing most
  of the work.
- **`prefers-reduced-motion`** is honoured in two layers: a CSS blanket
  rule in `index.css` collapses all transition/animation durations, and
  `useReducedMotion.js` is read directly by the hero parallax, cursor
  trail, magnetic button, liquid transition, GSAP pin, and Lenis smooth
  scroll so those either disable or fall back to instant/opacity-only
  states rather than just running faster.
- **Low-end device fallback**: the canvas cursor trail and Lenis both
  no-op under reduced motion; there's no separate low-power-mode
  detection. A reasonable next step is feature-detecting
  `navigator.deviceMemory` / `navigator.hardwareConcurrency` and applying
  the same reduced-motion code path below a threshold.
- **Content**: all copy, pricing, and species facts are realistic dummy
  content for a fictionalized brand, not the real operator's data.

## License & Copyright

Copyright (C) 2026 H3RI3R. All Rights Reserved.

Licensed under the **GNU General Public License v3.0** (GNU GPLv3). See the [LICENSE](file:///Users/ritiksoni/Documents/jawaiWEb/jawai-wild/LICENSE) file for full details.

