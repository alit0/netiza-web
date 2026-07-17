# Fase 3 — Secciones design-only + fixes de Grok

**Fecha:** 2026-07-17
**Lane:** Kilo (DeepSeek 4 Pro) · Build / Volumen
**Commit base:** 50fca70 (Fase 2)
**Commit result:** 58946d8 → pushed to main

## Resumen

Se crearon 4 secciones design-only con media real y se aplicaron todos los fixes de la review adversarial de Grok. Build verde, 13 secciones en orden canónico del design spec.

## Tarea A — Fixes de Grok aplicados

| # | Fix | Archivos | Estado |
|---|---|---|---|
| 1 | Logo `#top` → `#contenido` | Navbar.astro, Footer.astro | ✅ |
| 2 | Microcopy `muted` → `secondary` (contraste AA) | Hero.astro, CTAFinal.astro | ✅ |
| 3 | DRY `.accent` centralizado | `src/styles/utilities.css` | ✅ |
| 3 | DRY `.card-title` / `.card-desc` centralizados | `src/styles/utilities.css` + QueHacemos, ElProblema | ✅ |
| 3 | DRY `.section-container` (1072px wrapper) | `src/styles/utilities.css` | ✅ |
| 3 | CSS duplicado removido | 7 section components | ✅ |

## Tarea B — 4 secciones design-only

### Trabajos.astro
- H2: "Contenido que *trabaja* por tu negocio."
- 3 reels con MediaSlot + play overlay (▶ centrado, 60×60 pill)
- Imágenes: `public/assets/reel-*.png`
- Desktop: grid 3 cols, 336×480 cada reel, radius 20px
- Mobile: stack, 342×400

### RaicesDigitales.astro
- H2: "Raíces digitales para negocios *reales*."
- Card centrada 640px (desktop) con 3 párrafos + logo Netiza
- Radius: 24px desktop / 20px mobile
- Copy: basado en filosofía de marca del design spec

### ConQuienTrabajamos.astro
- H2: "No vendemos magia. Trabajamos *en serio*."
- 2 cards comparativas: "La fórmula de turno" (✕) vs "Netiza" (✓)
- 5 filas por card, íconos circulares 22×22 con aria-label
- Desktop: 2 cols, radius 24px · Mobile: stack, radius 20px

### Equipo.astro
- H2: "Personas *reales* detrás de tu proyecto."
- 3 retratos: Emilia (Estrategia y UX), Pamela (Negocio y e-commerce), Alejandro (Tecnología e IA)
- Imágenes: `public/assets/foto-*.png`
- Desktop: 3 cols, foto 341×420 · Mobile: stack, foto 342×340

## Archivos

| Tipo | Archivos |
|---|---|
| Nuevos | `Trabajos.astro`, `RaicesDigitales.astro`, `ConQuienTrabajamos.astro`, `Equipo.astro`, `utilities.css` |
| Modificados | `Navbar.astro`, `Footer.astro`, `Hero.astro`, `CTAFinal.astro`, `QueHacemos.astro`, `ElProblema.astro`, `ParaQuien.astro`, `Metodo.astro`, `FAQ.astro`, `index.astro`, `BaseLayout.astro` |
| Assets | `public/assets/` — 7 imágenes del handoff |

## Build

```
npm run build → ✓ 1 page built in 739ms
13 secciones verificadas en /dist/index.html
```

## Pendientes

- **Copy Raíces y Con Quién**: el texto de los 3 párrafos de Raíces y las 5 filas comparativas es inferido del tono de marca (no inventa casos/testimonios). Reemplazar cuando Emilia confirme el copy exacto del Penpot.
- **Hamburger menu**: Navbar mobile sin menú (diferido a Fase 4/5).
- **Scroll-padding-top**: `--size-touch` no coincide con el alto real del navbar sticky (85px spec).
- **Imágenes sin optimizar**: los PNG en `public/assets/` pesan 2–5MB c/u. Optimizar a WebP en Fase 4.
