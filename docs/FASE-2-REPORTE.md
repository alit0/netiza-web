# Fase 2 — Maquetado de secciones con contenido real

**Fecha:** 2026-07-17
**Lane:** Kilo (DeepSeek 4 Pro) · Build / Volumen
**Commit base:** a61d4dc (Fase 1 — fundación limpia)

## Resumen

Se crearon 9 componentes de sección en `src/components/sections/` y se reemplazaron los stubs de `src/pages/index.astro` por componentes con contenido real. Copy verbatim de `reference/site-index.html`. `npm run build` verde.

## Componentes creados

| Componente | Archivo | UI reutilizados |
|---|---|---|
| Navbar | `Navbar.astro` | Logo, Button, ThemeToggle |
| Hero | `Hero.astro` | Kicker, Button, MediaSlot |
| Qué hacemos | `QueHacemos.astro` | Kicker, Card, Button |
| El problema | `ElProblema.astro` | Kicker, Card |
| Para quién | `ParaQuien.astro` | Kicker |
| Método | `Metodo.astro` | Kicker, Button |
| FAQ | `FAQ.astro` | Kicker |
| CTA final | `CTAFinal.astro` | Kicker, Button |
| Footer | `Footer.astro` | Logo |

## Decisiones técnicas

- **CSS vars only**: cero hex hardcodeado en los componentes. Todos los colores, espaciados, radios y tipografías vienen de `tokens.css`.
- **Palabra de acento**: cada título usa `<span class="accent">` con `font-family: var(--font-display-accent)` (Source Serif 4 italic), coincidiendo con el spec §3.
- **Letter-spacing**: H1 y H2 llevan `-0.04em` (≈ spec: -2.8 / -2.4px). Mobile ajusta a -0.05em.
- **Responsive**: max-width 1072px desktop (spec §2), `@media (max-width: 809px)` mobile (spec §9). Grids colapsan a 1 columna. Gutter: padding-inline var(--space-6) en mobile.
- **Theme**: light/dark funciona por `data-theme` vía `ThemeToggle`. Los colores semánticos invierten automáticamente.
- **CTAs**: todas apuntan a `WHATSAPP_URL` desde `src/data/links.ts`.
- **Accesibilidad**: skip-link, aria-labelledby en secciones, aria-label en media, min-height touch targets (44px), `:focus-visible` ring.
- **FAQ**: HTML nativo `<details>/<summary>` con `+` toggle (rota 45° al abrir). Sin JS.

## Secciones NO tocadas (Fase 3)

Trabajos, Raíces digitales, Con quién trabajamos, Equipo. Esperan media y notas visuales de Agy.

## Build

```
npm run build → ✓ 1 page built in 1.83s
```

- `/dist/index.html` generado con todas las secciones y JSON-LD.
- 1 CSS bundle: `index.CTyLPWpN.css`.

## Pendientes

- Hero video: placeholder `/assets/hero-reel.mp4` + `/assets/hero-poster.webp` (no existen aún).
- Hamburger menu: mobile nav colapsa visualmente pero no tiene menú hamburger (Fase 3).
- Ajuste visual fino: tracking, line-height y pesos pueden necesitar micro-ajustes al verse en vivo contra el Penpot.
- Scroll-padding-top: usa `--size-touch` (2.75rem), no el alto real del navbar fijo (puede necesitar ajuste).
- `prefers-reduced-motion`: desactivado globalmente en BaseLayout. Los reveals/marquee no existen todavía.
