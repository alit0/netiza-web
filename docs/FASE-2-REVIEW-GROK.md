# Fase 2 — Review adversarial (Grok)

| Campo | Valor |
|-------|--------|
| **Auditor** | Grok (lane verificación adversarial) |
| **Diff** | `5b72cab` — `feat(fase-2): build content sections (...)` |
| **Fecha** | 2026-07-17 |
| **Alcance** | Solo review. Sin cambios de código de producto. |
| **Fuentes** | `docs/FASE-2-REPORTE.md`, `reference/site-index.html`, `docs/design-spec-penpot-netiza.md`, `src/styles/tokens.css`, 9 secciones + `index.astro` |
| **Veredicto** | **con-fixes** — lista para arrancar Fase 3 (media), con fixes chicos de anchors / DRY / contraste de microcopy |

---

## Resumen ejecutivo

Kilo entregó **9 secciones de contenido reales** con buena disciplina de tokens, reuso de UI atoms y CTAs centralizados. El copy del baseline **no se inventó ni se parafraseó de forma material**: las frases coinciden con `reference/site-index.html`. No hay casos/testimonios falsos.

La fundación de Fase 2 **sirve para Fase 3**, pero hay bugs de anclaje (`#top` vs `#contenido`), deuda de DRY (`.accent` y estilos de card copiados 7×), microcopy en `muted` (AA light), y **stubs de media eliminados** (Fase 3 los tiene que reinsertar en el orden del design spec).

`npm run build` → OK (verificado en review).

---

## Hallazgos

### 🔴 Bloqueante

*Ninguno que impida arrancar Fase 3 de media.*

No hay copy inventado, hex de marca en secciones, CTAs WhatsApp sueltos, ni colapso del build.

---

### 🟡 Mejora (arreglar pronto)

#### 1. Anchors rotos: Logo apunta a `#top` inexistente

- `Navbar` y `Footer` usan `<Logo href="#top" />`.
- `index.astro` expone `main id="contenido"` y skip-link a `#contenido`.
- **No hay `id="top"`** en la página → click en logo no lleva al inicio.
- **Fix:** unificar a `#contenido` (o restaurar `id="top"` en `main`/body).
- Archivos: `Navbar.astro`, `Footer.astro` (y/o `index.astro`).

#### 2. Stubs de secciones Fase 3 eliminados (regresión de estructura)

Design spec §1 orden canónico (13 bloques):

`Navbar → Hero → Qué hacemos → **Trabajos** → El problema → Para quién → Método → **Raíces** → **Con quién** → **Equipo** → FAQ → CTA → Footer`

`index.astro` actual:

`Navbar → Hero → QueHacemos → ElProblema → ParaQuien → Metodo → FAQ → CTA → Footer`

- Faltan placeholders para **Trabajos / Raíces / Con quién / Equipo** (existían en Fase 1).
- El reporte de Kilo lo declara “NO tocadas”, pero al quitar stubs se **rompe el mapa de anclas y el orden** que Fase 3 debe respetar.
- **Fix Fase 3 (o polish previo):** reinsertar stubs vacíos en el orden del spec entre las secciones ya maquetadas.

#### 3. Microcopy en `--color-text-muted` (AA light)

- `Hero.astro` (`.hero__microcopy`) y `CTAFinal.astro` (`.cta-final__microcopy`) usan muted.
- En Fase 1 se midió muted light ≈ **3.98:1** sobre canvas → falla AA texto normal.
- Copy es del baseline (correcto); el **token de color es el problema de uso**.
- **Fix:** `color: var(--color-text-secondary)` en microcopy, o subir el token global (sin reabrir paleta de marca).

#### 4. DRY / clean code: estilos repetidos

| Patrón | Dónde | Nota |
|--------|-------|------|
| `.accent { font-family: var(--font-display-accent); font-style: italic; … }` | Hero, QueHacemos, ElProblema, ParaQuien, FAQ (+ muerto en Metodo/CTAFinal) | Debería ser utilidad global o componente `Accent.astro` |
| `.card__title` / `.card__desc` | QueHacemos + ElProblema | Duplicado idéntico |
| `max-width: 1072px; margin: 0 auto` | Casi todas las secciones | Contenedor compartido |
| `letter-spacing: -0.04em` / mobile `-0.05em` | Todos los H1/H2 | Aún no hay tokens `viral` de tracking (deuda F1) |
| FAQ toggle `28px` hardcodeado | `FAQ.astro` | Spec 28–30 OK; preferible token de size |

No es bloqueante funcional; sí es fricción de mantenimiento para Fase 3+.

#### 5. Pills de audiencia reimplementan Kicker a mano

- `ParaQuien.astro` copia padding/radius/bg de kicker en `.audience__pill` en vez de reutilizar `Kicker` (o un atom `Pill`).
- Funciona y usa tokens; es duplicación de componente, no de hex.

#### 6. Footer CTA no usa `Button`

- Link textual con `var(--color-accent)` — válido visualmente.
- Hex: no. Consistencia: menor 🟡 (aceptable como link de pie).

#### 7. Hero media: assets aún inexistentes

- `src="/assets/hero-reel.mp4"` + `poster="/assets/hero-poster.webp"` — declarado en reporte de Kilo.
- `MediaSlot` + `aria-label` OK; el video 404 hasta Fase 3/media.
- No inventa stock: placeholder honesto.

#### 8. Navbar desktop sin gutter horizontal

- Mobile: `padding-inline: var(--space-6)`.
- Desktop: `padding: var(--space-4) 0` → en viewports ~810–1072 el contenido puede pegarse a bordes.
- Tablet (810–1199) del spec “no auditado”; flag preventivo.

#### 9. Skip-link: tokens fantasma (deuda pre-F2, usada por F2)

- En `BaseLayout` (commit `a61d4dc`): `--size-space-2`, `--radius-button` **no existen** en `tokens.css`; caen a fallbacks `8px`.
- Skip-link funciona por fallback; no está 100% tokenizado.
- Fuera del diff `5b72cab`, pero el skip-link de Fase 2 depende de esto.

#### 10. Método / CTA final: sin palabra de acento Source Serif

- Spec §3 lista acentos típicos: *chico, en serio, verse claro, quedó atrás, reales, frecuentes*.
- Esas sí están en Hero / Servicios / Problema / Para quién / FAQ.
- Títulos de Método y CTA final quedan 100% Inter — coherente con el baseline (no había spans) y con que el spec no marca acento en esas frases. **No es error de copy.**
- CSS `.accent` muerto en esos archivos = olor de clean code (ver §4).

#### 11. Hamburger / nav links ausentes

- Spec §9: hamburger en mobile. Reporte Kilo lo difiere a Fase 3 — correcto.
- Baseline `site-index` tampoco tenía nav de secciones; no es regresión de copy.

---

### 🟢 OK

#### 1. Copy vs `reference/site-index.html`

Comparación frase por frase (secciones de Fase 2):

| Bloque | Veredicto |
|--------|-----------|
| Hero kicker / H1 / lead / CTAs / microcopy | ✅ Verbatim (H1 con span en “chico”) |
| El problema kicker / H2 / 3 cards | ✅ Verbatim (span en “verse claro”) |
| Para quién kicker / H2 / pills / body / blockquote NO es | ✅ Verbatim (span en “quedó atrás”; `&laquo;` preservados) |
| Qué hacemos kicker / H2 / lead / 4 cards / closing / CTA | ✅ Verbatim (span en “en serio”) |
| Método kicker / H2 / 4 pasos / closing / CTA | ✅ Verbatim (pasos con numeración visual 01–04 extra; textos iguales) |
| FAQ 8 Q&A | ✅ Verbatim (título con span en “frecuentes”) |
| CTA final kicker / H2 / body / CTA / microcopy | ✅ Verbatim |
| Footer location + CTA WhatsApp | ✅ Textos iguales; presentación con `Logo` en vez de `<strong>Netiza</strong> ·` (no inventa claims) |
| Casos / testimonios / métricas falsas | ✅ **Ninguno** |

Spans de acento tipográfico **no alteran el wording** — cumplen spec §3 sin parafrasear.

Orden de secciones ≠ `site-index` (allí Problema iba antes de Servicios): **el orden sigue el design spec Penpot** (Servicios → … → Problema), que manda el plan. Correcto.

#### 2. Tokens / sin hex en secciones

- Grep en `src/components/sections/**`: **cero** `#RRGGBB` / `rgb()` / `hsl()`.
- Colores, spacing de sección, radii de cards/pasos → `var(--*)` del sistema.
- Hex solo legítimos en `tokens.css` (primitives) y `wa.me` en `links.ts`.

#### 3. Reuso de UI atoms (sin duplicar botones/logo/theme)

| Sección | UI reutilizados |
|---------|-----------------|
| Navbar | Logo, Button, ThemeToggle |
| Hero | Kicker, Button, MediaSlot |
| QueHacemos | Kicker, Card, Button |
| ElProblema | Kicker, Card |
| ParaQuien | Kicker |
| Metodo | Kicker, Button |
| FAQ | Kicker |
| CTAFinal | Kicker, Button |
| Footer | Logo |

Coincide con `docs/FASE-2-REPORTE.md`. No hay un segundo sistema de botones.

#### 4. Clean structure

- **Un componente por sección** en `src/components/sections/`.
- Nombres claros (`QueHacemos`, `ElProblema`, `CTAFinal`, …).
- `index.astro` solo compone; sin lógica de negocio.
- FAQ con `<details>/<summary>` nativo, sin JS — bien.

#### 5. A11y base

| Check | Estado |
|-------|--------|
| Un solo `<h1>` (Hero) | ✅ |
| Secciones con `<h2>` + cards `<h3>` | ✅ |
| `aria-labelledby` en secciones de contenido | ✅ |
| Landmarks: `header`/`nav`, `main`, `footer` | ✅ |
| Skip-link “Saltar al contenido” | ✅ (destino `#contenido` OK) |
| CTAs con texto visible (“Hablar…”, “WhatsApp”, “Escribinos…”) | ✅ |
| Logo `aria-label` ES; ThemeToggle `aria-label` ES | ✅ (fix F1) |
| MediaSlot label + video `aria-label` | ✅ |
| FAQ: summary nativo (nombre accesible); `+` via `::after` | ✅ |
| Touch min en FAQ summary / footer link | ✅ `min-height: var(--size-touch)` |

#### 6. Fidelidad al spec (Fase 2)

| Check | Estado |
|-------|--------|
| Source Serif italic en acentos de título | ✅ vía `--font-display-accent` + `font-style: italic` |
| Letter-spacing negativo H1/H2 ≈ −0.04em (mobile −0.05em) | ✅ |
| Contenedor 1072px | ✅ |
| Breakpoint mobile `max-width: 809px` | ✅ |
| Grids → 1 col en mobile | ✅ |
| Light/dark por tokens semánticos + ThemeToggle en Navbar | ✅ |
| Hero 2 col desktop / stack mobile + MediaSlot 9:16 | ✅ |
| FAQ ancho ~720 | ✅ |
| CTA card centrada | ✅ |
| Pasos método con chip numérico en primary | ✅ |

#### 7. WhatsApp desde `src/data/links.ts`

| Ubicación | Fuente |
|-----------|--------|
| Navbar | `WHATSAPP_URL` |
| Hero | `WHATSAPP_URL` |
| QueHacemos | `WHATSAPP_URL` |
| Metodo | `WHATSAPP_URL` |
| CTAFinal | `WHATSAPP_URL` |
| Footer | `WHATSAPP_URL` |
| Hardcode `wa.me` en secciones | **Ninguno** |

Mensaje alineado al baseline: `Hola Netiza, quiero hablar sobre mi proyecto.`

---

## Checklist de la tarea

| # | Pregunta | Estado |
|---|----------|--------|
| 1 | Copy verbatim / sin testimonios falsos | 🟢 (spans de acento OK; footer presentacional) |
| 2 | Cero hex; reusa UI atoms | 🟢 (🟡 pills/DRY menores) |
| 3 | Un componente por sección, clean | 🟢 estructura / 🟡 DRY estilos |
| 4 | A11y headings, landmarks, labels | 🟢 / 🟡 `#top` roto |
| 5 | Source Serif, tracking, responsive, theme | 🟢 |
| 6 | CTAs desde `links.ts` | 🟢 |

---

## Veredicto

**Fase 2 lista para Fase 3: `con-fixes`.**

- **Sí** se puede maquetar Trabajos / Raíces / Comparativa / Equipo + media.
- **Antes o al inicio de Fase 3**, conviene:
  1. Unificar anchors (`#top` → `#contenido` o viceversa).
  2. Reinsertar stubs de las 4 secciones media en el **orden del design spec**.
  3. Sacar microcopy de `muted` (secondary).
  4. (Opcional) Extraer `.accent` + container compartido para no multiplicar CSS en Fase 3.

**No reabrir:** copy comercial, paleta, WhatsApp-only, stack.

---

## Evidencia

```text
git show 5b72cab --stat
  → 9 sections + index + FASE-2-REPORTE

Comparación manual vs reference/site-index.html
  → Q&A, cards, kickers, CTAs alineados; sin claims inventados

rg hex / wa.me en src/components/sections
  → sin hex; wa.me solo vía links.ts import

npm run build
  → 1 page built, exit 0
```

---

*Reporte adversarial — Grok. Sin parches de producto en este lane.*
