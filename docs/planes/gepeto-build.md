# Plan de implementación — lane Build / Copy / Conversión (Gepeto)

**Proyecto:** Netiza Website (repo `NewNetizaWebsite`)  
**Stack candidato:** Astro (SEO-legible, HTML estático por defecto)  
**Alcance:** SOLO plan. Sin scaffold, sin código.  
**Fuentes leídas:** `doc/design-spec-penpot-netiza.md`, `netiza/netiza-contexto.txt`, `site/index.html`, `site/styles.css`  
**Objetivo de conversión:** consultas WhatsApp (`wa.me/5492324533126`).  
**Copy canónico a reutilizar:** textos reales de `site/index.html` (no reescribir estrategia ni inventar casos/testimonios).

---

## Plan de trabajo de este lane (antes del detalle)

1. Mapear las 13 secciones Penpot → componentes Astro + gaps de copy/media.  
2. Definir árbol del proyecto Astro y mapeo tokens 3-tier → CSS variables + `data-theme`.  
3. Definir estrategia de maquetación mantenible (layout, UI atoms, secciones).  
4. Fijar reglas de copy/CTA WhatsApp y SEO mínimo.  
5. Proponer scaffolding + comando de arranque + criterios de verificación.

**Riesgos (de este lane):** media placeholders sin assets reales; orden design ≠ orden del HTML actual; paleta vieja (verde) vs tokens Penpot (crema/naranja); over-JS en FAQ/theme que rompa SEO; inventar copy en secciones vacías.

**Qué verificaría antes de codear:** que cada bloque Penpot tenga dueño de copy; WA URL única centralizada; contraste AA en light/dark con tokens del spec; Lighthouse SEO/a11y en build estático; zero testimonios inventados.

---

## 1. Estructura del proyecto Astro (páginas, componentes, layout, assets, tokens)

Una sola página de conversión: `src/pages/index.astro`. Layout base `src/layouts/BaseLayout.astro` con `<html lang="es" data-theme="light">`, meta/OG/JSON-LD (reutilizar de `site/index.html`), fonts Inter + Source Serif 4, y `scroll-padding-top` del navbar fijo.

Árbol propuesto (app en subcarpeta `web/` para no mezclar con `doc/`, `netiza/`, `site/` fuente):

```text
web/
  package.json
  astro.config.mjs
  public/                 # favicon, robots.txt, sitemap, og-image
  src/
    layouts/BaseLayout.astro
    pages/index.astro     # compone las 13 secciones en orden Penpot
    components/
      ui/                 # Button, Card, Kicker, ThemeToggle, Logo, MediaSlot
      sections/           # una .astro por bloque (Navbar…Footer)
    styles/
      tokens.css          # 3-tier → custom properties
      global.css          # reset, grilla, section spacing
      typography.css      # escala + accent italic
    data/
      copy.ts             # strings canónicos desde site/index.html
      links.ts            # WA base + textos precargados
    assets/               # logo SVG, fotos equipo, reels (cuando existan)
```

**Tokens 3-tier → CSS (light/dark por `data-theme`):**

| Tier Penpot | CSS | Dónde |
|-------------|-----|--------|
| Tier 1 primitives | `--color-base-ink`, `--spacing-4`…, `--font-size-5xl`, `--radius-*` | `:root` (valores crudos siempre) |
| Tier 2 semantic | `--color-bg-canvas`, `--color-text-primary`, `--color-border-subtle`… | `:root, [data-theme="light"]` y `[data-theme="dark"]` (mismo nombre, distinto valor) |
| Tier 3 components | `--button-primary-bg`, `--card-bg`, `--radius-button`, `--spacing-section-y` | `:root` referenciando solo semánticos (`var(--color-text-primary)` etc.) |

Regla del spec: el primary button se invierte solo — `button.primary.bg = text.primary` y `button.primary.text = bg.canvas`. En código: componentes consumen **solo** vars de tier 3/2; nunca hex sueltos en secciones. Theme toggle escribe `data-theme` en `<html>` + `localStorage` + respeta `prefers-color-scheme` en primera visita. `color-scheme: light dark` alineado al tema activo.

**Por qué Astro (vs otra cosa):** HTML final legible para crawlers, CSS global sin runtime, islas de JS solo donde hace falta (theme, hamburger, FAQ opcional). Next/SPA suman JS de hidratación sin beneficio SEO para una landing de una página.

---

## 2. Maquetar las 13 secciones + light/dark de forma mantenible

Orden fijo del artboard (no el del HTML actual):

| # | Sección | Componente | Fuente de copy | Media |
|---|---------|------------|----------------|-------|
| 0 | Navbar | `Navbar.astro` | brand + nav anchors + WA | logo SVG (recolor por tema) |
| 1 | Hero | `Hero.astro` | `site/index.html` hero | slot video 9:16 placeholder |
| 2 | Qué hacemos | `Services.astro` | 4 cards del site | — |
| 3 | Trabajos | `Works.astro` | solo labels/estructura del spec | 3 reels placeholder; **sin casos inventados** |
| 4 | El problema | `Problem.astro` | 3 cards del site | — |
| 5 | Para quién | `Audience.astro` | pills + párrafo + “NO es” del site | — |
| 6 | Método | `Method.astro` | 4 pasos del site | — |
| 7 | Raíces digitales | `Roots.astro` | frase de identidad ya definida en contexto/Brand (“Raíces Digitales…”); sin claims nuevos | card centrada |
| 8 | Con quién trabajamos | `Compare.astro` | ampliar el bloque “NO es” del site a 2 cards comparativas **sin testimonios** | ticks ✓/✕ con alt |
| 9 | Equipo | `Team.astro` | nombres/roles reales (Emilia, Pamela, Alejandro) del contexto; sin bios inventadas largas | 3 fotos reales o placeholder |
| 10 | FAQ | `Faq.astro` | 8 Q&A del site + JSON-LD FAQPage | acordeón a11y |
| 11 | CTA final | `CtaFinal.astro` | copy del site | — |
| 12 | Footer | `Footer.astro` | marca + nav + legal mínimo | — |

**Mantenibilidad:**

- Cada sección = un componente de presentación + props tipadas desde `data/copy.ts`.  
- Layout de sección reutilizable: `.section` (padding Y tokens) + `.container` (max 1200 / contenido útil 1072 desktop; gutter 24 mobile).  
- Breakpoints del spec: `≥1200` desktop, `≤809` mobile; tablet hereda stack-friendly.  
- Grids: CSS Grid/Flex con `gap` tokens; mobile = 1 columna; botones full-width en mobile.  
- Light/dark: cero overrides por sección; solo cambian las semantic vars. Auditar contraste con tokens del design-spec (CTA `#C2410C` + blanco).  
- Accesibilidad handoff: skip-link, `aria-*` del spec, touch ≥24px, `prefers-reduced-motion`, foco visible, `width/height` en media, `fetchpriority="high"` solo hero.

---

## 3. Copy / conversión: reutilizar `site/index.html` + CTAs WhatsApp

**Fuente de verdad de textos superpuestos:** `site/index.html` (hero, problema, audiencia, servicios, método, FAQ ×8, CTA final, microcopy 24 hs, JSON-LD ProfessionalService + FAQPage). No reabrir estrategia ni tono.

**CTA único de conversión (centralizar en `data/links.ts`):**

- Base: `https://wa.me/5492324533126`  
- Default precargado (hoy en site): `Hola Netiza, quiero hablar sobre mi proyecto.`  
- Labels reales a reutilizar: “Hablar sobre mi proyecto”, “WhatsApp”, “Escribinos por WhatsApp”, ghost “Ver qué hacemos” → `#que-hacemos`.  
- Todos los CTAs: `target="_blank"` + `rel="noopener"`.  
- Opcional post-MVP: variantes `?text=` por sección (ya previsto en plan de aceptación como Fase 1); en v1 **un solo mensaje** evita fragmentar tracking.

**Reglas de conversión (sin inventar):**

- Métrica: clicks a WhatsApp, no vanity.  
- Preparar hook `whatsapp_click` (GA4 comentado en site actual; activar cuando haya ID real).  
- Secciones sin copy en el HTML actual (Trabajos, parte de Equipo/Raíces/Comparativa): estructura del design-spec + textos mínimos ya existentes en marca/contexto; **prohibido** inventar casos, métricas o testimonios. Si falta asset o claim aprobado → placeholder visible “media pendiente”, no relleno comercial falso.  
- SEO: title/description/canonical/OG del site como baseline; ajustar solo si el merge de Cloe unifica mensaje, no por gusto del implementador.

---

## 4. Scaffolding del repo y comando de arranque

**Prerrequisitos:** Node 20 LTS, npm o pnpm.

**Pasos de scaffold (cuando se autorice implementar — no ahora):**

```bash
cd C:\Users\Ale\Proyectos\NewNetizaWebsite
npm create astro@latest web -- --template minimal --typescript strict --install --no-git --yes
cd web
npm run dev
```

- **Dev:** `npm run dev` → `http://localhost:4321`  
- **Build estático:** `npm run build` → `web/dist/`  
- **Preview:** `npm run preview`  
- Deploy futuro alineado a plan existente: Cloudflare Pages, output `web/dist` (Fase 2 del plan de aceptación; `site/` HTML queda como referencia de copy/SEO, no como runtime del redesign).

**Checklist de scaffold post-create:** copiar `site/assets/*` útiles a `public/` o `src/assets/`; crear `tokens.css` vacío mapeado al spec; `BaseLayout` + `index.astro` con stubs de 13 secciones; `data/copy.ts` pegando strings del HTML actual; theme toggle mínimo.

**Fuera de este scaffold:** blog multipágina, form 3 campos, landings por rubro, casos reales (fases posteriores del plan de aceptación).

---

## 5. Orden de build sugerido (para el plan único de Cloe)

1. Scaffold Astro + tokens + BaseLayout + theme.  
2. UI atoms (Button primary/ghost, Card, Kicker, MediaSlot).  
3. Secciones con copy ya listo del site (Hero → Problem → Audience → Services → Method → FAQ → CTA → Footer).  
4. Secciones design-only con placeholders honestos (Works, Roots, Compare, Team + Navbar completa).  
5. Media real, Lighthouse, GA4, deploy Cloudflare.

Esto maximiza conversión usable temprano (CTAs + copy probado) y deja media/equipo como swap sin reescribir arquitectura.

---

## Riesgos

| Riesgo | Impacto | Mitigación |
|--------|---------|------------|
| Copy “sitio nuevo por sección” (auditoría $150k) vs copy actual del site (estudio/pymes) | Mensaje inconsistente en merge multi-agente | Este lane fija **canónico de textos UI = `site/index.html`**; Cloe resuelve producto de entrada en el plan único |
| 4 secciones sin copy/media listos | Bloqueo visual o tentación de inventar | Placeholders + sin testimonios; media de `netiza/04` |
| Tokens mal mapeados (hardcode en componentes) | Dark mode roto / contraste | Solo vars; checklist contraste AA light+dark |
| FAQ con `<details>` nativo vs JS acordeón | a11y/SEO | Preferir `<details>`/`<summary>` o botón con `aria-expanded` sin hidratar la página entera |
| Poner Astro en la raíz del monorepo documental | Contamina `doc/` y paths de deploy | App en `web/` |
| JS de theme sin SSR-safe default | Flash de tema incorrecto | Default light o script mínimo en `<head>` antes de paint |

---

## Qué verificaría (criterios de aceptación del lane)

1. Build `astro build` genera HTML de las 13 secciones en orden Penpot, sin errores.  
2. `data-theme="light"|"dark"` cambia canvas/surface/text/buttons sin CSS por sección.  
3. Contraste CTA y texto secundario ≥ 4.5:1 en ambos temas (valores del design-spec).  
4. Todos los CTAs primarios apuntan al mismo WA config; evento click documentado.  
5. Copy de hero/servicios/problema/audiencia/método/FAQ/CTA es el del `site/index.html` (diff de strings).  
6. Cero menciones a clientes/resultados inventados en Trabajos/Equipo.  
7. Lighthouse mobile: SEO y Accessibility sin fallos críticos en preview local.  
8. Navbar sticky no tapa anchors (`scroll-padding-top`); hamburger + theme operables con teclado.

---

## Resumen ejecutivo

Plan de build Astro en `web/`: una `index` de 13 secciones, layout SEO, tokens 3-tier con light/dark vía `data-theme`. Copy y CTAs WhatsApp salen de `site/index.html`; secciones solo-diseño van con placeholders, sin casos inventados. Scaffold con `npm create astro@latest web` y arranque `npm run dev`. Listo para que Cloe fusione con los otros 4 planes en un build único.

---

## Pendientes (fuera de este entregable / para Cloe o implementación)

- [ ] Decisión de producto en el merge: ¿CTA genérico del site o “Auditoría” del briefing Fase 0?  
- [ ] Inventario real de media (`viral/media-slots.md` / `netiza/04`) para hero, reels y equipo.  
- [ ] Copy final mínimo de Trabajos / Raíces / Comparativa / Equipo si el merge exige texto más allá de placeholders.  
- [ ] ID GA4 real y política de privacidad si se trackea WhatsApp.  
- [ ] Confirmación deploy Cloudflare Pages path (`web/dist` vs root).

---

## Memoria (engram)

Guardado desde `C:\Users\Ale\Proyectos\NewNetizaWebsite` (ver ejecución en sesión):

- **decision** — Plan build Netiza Astro (lane Gepeto): estructura `web/`, tokens 3-tier → CSS + `data-theme`, 13 secciones, copy canónico `site/index.html`, WA centralizado, sin implementar.
- **decision** — Copy canónico UI = `site/index.html`; no inventar casos; app Astro en subcarpeta `web/`.
