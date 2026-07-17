# Especificación de Diseño — Netiza (Penpot)

> **Documento de handoff.** Describe el sistema de diseño y la construcción de la landing
> de Netiza en Penpot: estructura, grilla, tipografía, color, design tokens, componentes,
> secciones, accesibilidad (WCAG 2.2) y notas para desarrollo.
> Auditado contra el checklist interno de Penpot (`penpot-checklist-auditoria`) y la
> guía de accesibilidad (`penpot-guia-equivalencias-accesibilidad`).

**Fuente de verdad:** archivo Penpot `5521c00a-9a9c-8183-8008-560f35b7377c`.
**Artboards:** `Viral — Desktop` (light) · `Netiza — Mobile` (light) · `Netiza — Desktop Dark` · `Netiza — Mobile Dark`.
**Tipo de producto:** landing de estudio de estrategia, identidad y tecnología. Objetivo único: consultas por WhatsApp.

---

## 1. Estructura general

Landing de **13 bloques**, en columna, con contenedor centrado. Mismo orden en desktop y mobile.

| # | Sección | Propósito | Layout desktop | Layout mobile |
|---|---------|-----------|----------------|---------------|
| 0 | **Navbar** | Marca + navegación + CTA + tema | Flex row, space-between | Flex row: logo / acciones (WhatsApp + tema + hamburger) |
| 1 | **Hero** | Promesa + CTA + reel | 2 columnas: copy / video vertical | 1 columna: copy → video |
| 2 | **Qué hacemos** | 4 servicios | Header centrado + 4 cards en fila | Header + 4 cards apiladas |
| 3 | **Trabajos** | Prueba (reels producidos) | Header + 3 reels verticales en fila | Header + 3 reels apilados |
| 4 | **El problema** | Dolor del cliente | Header + 3 cards en fila | Header + 3 cards apiladas |
| 5 | **Para quién** | Público objetivo | Header + tags + copy + card "NO es" | Igual, apilado |
| 6 | **Método** | Cómo trabajamos (4 pasos) | Header + 4 pasos en fila | Header + 4 pasos apilados |
| 7 | **Raíces digitales** | Filosofía de marca | Card centrada 640 | Card full-width |
| 8 | **Con quién trabajamos** | Posicionamiento (vs "fórmula de turno") | 2 cards comparativas | 2 cards apiladas |
| 9 | **Equipo** | Emilia · Pamela · Alejandro | 3 retratos en fila | 3 apilados |
| 10 | **FAQ** | 8 preguntas | Acordeón centrado 720 | Acordeón full-width |
| 11 | **CTA final** | Cierre a WhatsApp | Card centrada | Card full-width |
| 12 | **Footer** | Marca + navegación + legal | Marca / 2 columnas nav | Apilado |

**Maquetación:** todos los contenedores usan **Flex Layout** (auto-stack). Cero "cajas invisibles":
espaciados por padding/gap de Flex, no por rectángulos vacíos. El artboard maestro es un Flex column
que apila las secciones automáticamente.

**Breakpoints:** `≥1200px` desktop · `810–1199px` tablet (no auditado, hereda reglas) · `≤809px` mobile.

---

## 2. Grilla y espaciado

| Contexto | Frame | Contenedor | Contenido útil | Gutter |
|----------|-------|-----------|----------------|--------|
| Desktop | 1492 px | 1200 px | **1072 px** | 64 px |
| Mobile | 390 px | — | **342 px** | 24 px |

**Escala base (múltiplos de 8/4):** `4 · 8 · 12 · 16 · 24 · 32 · 48 · 56 · 64 · 80 · 90 · 120`.

- **Padding vertical de sección:** desktop `80–90`, mobile `56–64`.
- **Gap header ↔ contenido:** desktop `56–64`, mobile `30–36`.
- **Gap entre cards / stack:** `16` (desktop en fila), `12–16` (mobile apilado).
- **Padding interno de card:** `24–28` (desktop), `22–24` (mobile).

---

## 3. Tipografía

**Dos familias:**
- **Inter** — todo el sistema (títulos, cuerpo, UI, botones). Pesos 500 / 600 / 700.
- **Source Serif 4 (italic)** — **palabra de acento** en cada título (la firma visual). Ej: *chico*, *en serio*, *verse claro*, *quedó atrás*, *reales*, *frecuentes*.

> Los títulos se componen con **textos separados** (Inter + Source Serif italic) porque el
> `applyToRange` de esta instancia de Penpot no aplica fuentes a un rango. El tracking negativo
> se aplica vía **tokens de letterSpacing** (el setter directo rechaza negativos).

**Escala tipográfica** (racionalizada, bindeada a tokens `font.size.*`):

| Rol | Token | Desktop | Mobile | Peso | Line-height | Tracking |
|-----|-------|---------|--------|------|-------------|----------|
| Hero H1 | `font.size.5xl` / `3xl` | 56 | 40 | 500 | 1.05–1.08 | −2.8 |
| Section H2 | `font.size.4xl` | 46 | 24 (`xl`) | 500 | 1.10–1.12 | −2.4 |
| Sub-H2 (mission/CTA/FAQ) | `font.size.3xl` | 40 | 22→24 | 500 | 1.12–1.15 | −2.0 |
| Card title | `font.size.lg` / `md` | 20 | 18 | 500 | 1.3 | −0.8 a −1.2 |
| Lead / body | `font.size.md` / `lg` | 18–20 | 16 | 500 | 1.5 | −0.5 a −0.72 |
| Body base | `font.size.base` | 16 | 16 | 500 | 1.5 | −0.4 a −0.5 |
| Nav / footer / label | `font.size.sm` | 14 | 14 | 500/600 | 1.5 | −0.56 |
| Micro / caption | `font.size.xs` | 12 | 12 | 500 | 1.4–1.5 | −0.3 |

**Reglas:** sin `text-transform`; tracking negativo proporcional (≈ −0.04em) en display; line-height ajustado
en títulos (1.0–1.15) y cómodo en lectura (1.5); ancho de párrafo ≤ ~65 caracteres.

---

## 4. Color y temas

Paleta monocroma cálida + un solo acento. **Sin negro puro** (`#000000`): la tinta es el off-black de
marca **`#232323`** (el propio wordmark). Un solo acento cálido (naranja de marca), saturación controlada.

### Paleta (primitivos)

| Rol | Token | Light | Dark |
|-----|-------|-------|------|
| Tinta / texto | `color.base.ink` / `ink-light` | `#232323` | `#EFEAE1` |
| Fondo (canvas) | `color.base.paper-*` | `#EFEBE5` | `#161412` |
| Superficie (cards) | `color.base.surface-*` | `#F7F2EA` | `#211E1A` |
| Media / hundido | `color.base.sand-*` | `#E7D7C1` | `#2C2620` |
| Acento (marca / logo) | `color.base.accent` | `#F15A24` | `#F15A24` |
| Acento fuerte (botones) | `color.base.accent-strong` | `#C2410C` | `#C2410C` |
| Blanco | `color.base.white` | `#FFFFFF` | — |

> **CTAs:** fondo `#C2410C` + texto blanco = **5.18:1** (AA holgado). El naranja de marca puro
> `#F15A24` se reserva para el logo y acentos pequeños: con blanco da 3.37:1 (falla), por eso el
> botón usa el tono un punto más profundo. Todos los pares texto/fondo se auditaron con la fórmula
> WCAG (luminancia relativa) y cumplen **≥4.5:1** (títulos 13–15:1, texto secundario 5.7–8.3:1).

### Semántico (Tier 2)

| Token | Light | Dark |
|-------|-------|------|
| `color.bg.canvas` | paper-light | paper-dark |
| `color.bg.surface` | surface-light | surface-dark |
| `color.bg.sunken` | sand-light | sand-dark |
| `color.text.primary` | `#232323` | `#EFEAE1` |
| `color.text.secondary` | `#232323` @ 72% | `#EFEAE1` @ 72% |
| `color.text.muted` | `#232323` @ 60% | `#EFEAE1` @ 60% |
| `color.border.subtle` | `#232323` @ 4% | `#EFEAE1` @ 6% |
| `color.accent` / `on-accent` | accent / white | accent / paper-dark |

**Estados:** botón hover = swap de texto (blur + traslación), fondo estable; foco = anillo accesible (handoff);
el color **nunca** es el único indicador (los ticks ✓/✕ llevan alt "Incluido/No incluido").

---

## 5. Design tokens (arquitectura 3-tier)

Gobernanza en tres niveles, con referencias (`{…}`) para que cambiar un primitivo propague:

- **Tier 1 — `1-primitives`** (44 tokens): valores crudos. `color.base.*`, `spacing.*`, `radius.*`, `font.size.*`, `font.weight.*`, `font.family.*`.
- **Tier 2 — `2-semantic-light` / `2-semantic-dark`** (9 c/u): significado funcional (`bg.*`, `text.*`, `border.*`), referencian primitivos. **Mismo naming** en ambos sets → base del theming.
- **Tier 3 — `3-components`** (14): propiedades de control (`button.primary.bg`, `card.bg`, `eyebrow.bg`, `radius.button/card/media`, `spacing.section-y/card-pad`), referencian a semantic.
- **`viral`** (36): tokens de `letterSpacing` (tracking negativo).

**Inversión automática light/dark:** `color.button.primary.bg = {color.text.primary}` y
`color.button.primary.text = {color.bg.canvas}` → el botón se invierte solo al cambiar de tema.

**Switch de tema:** en este Penpot el API de *themes* nativos (`addSet`) no persiste, así que el cambio
light↔dark se hace **activando/desactivando** `2-semantic-light` ⇄ `2-semantic-dark`. Los 4 artboards
estáticos sirven como preview de ambos modos. En código: un atributo `data-theme` que intercambia las
variables CSS semánticas.

**Vinculación:** los artboards light tienen **657 propiedades de color/radio + 326 de fontSize** vinculadas
a tokens (cero valores hardcodeados en color, radio y tamaño). Los artboards dark quedan con valores dark
directos (preview).

---

## 6. Componentes

| Componente | Anatomía | Medidas | Tokens | Notas |
|------------|----------|---------|--------|-------|
| **Botón primario** | board + label | pad 16/28–32, radio pill | `button.primary.bg/text`, `radius.button` | Full-width en mobile; hover = swap de texto |
| **Botón ghost** | board + borde + label | pad 16/24, radio pill | `button.ghost.border`, `text.primary` | Secundario ("Ver qué hacemos") |
| **Kicker / eyebrow** | pill sutil + label | pad 6/13, radio full | `eyebrow.bg`, `text.primary`, `radius.chip` | 13–14 px |
| **Card** | board + contenido | radio 16, pad 22–28 | `card.bg`, `radius.card` | Auto-height |
| **Paso (método)** | num chip + título + desc | chip 44–48, radio 12 | `button.primary.bg` (chip) | Numerado 01–04 |
| **Tick comparativo** | círculo + ✓/✕ | 20–22 | `text.primary` / subtle | alt "Incluido"/"No incluido" |
| **FAQ item** | pregunta + toggle "+" | fila, radio 12, toggle 28–30 | `border.subtle` | `aria-expanded` |
| **Media slot (video/reel/foto)** | board + play + label | radio 18–24 | `media.bg`, `radius.media` | Placeholder; ver §8 |
| **Logo** | wordmark SVG | alto 22–26, ratio 5.34:1 | recoloreado por tema | `aria-label` "Netiza — ir al inicio" |
| **Theme toggle** | pill + glifo ☾/☀ | 38–40 (touch ≥24) | `border.subtle` | `aria-label` "Cambiar modo" |
| **Hamburger** | 3 líneas | 26×24 (touch ≥24) | `text.primary` | mobile; `aria-label` "Abrir menú" |

---

## 7. Recursos y accesibilidad (WCAG 2.2)

### Clasificación de recursos (alt / ARIA — anotado en `pluginData`, legible en Inspect)

| Recurso | Clasificación | Texto alternativo / aria |
|---------|---------------|--------------------------|
| Video del hero | Informativo | `alt` = "Reel vertical de contenido producido por Netiza" |
| Reels (Trabajos) | Informativo | `alt` = "Reel de contenido para redes producido por Netiza" |
| Fotos de equipo | Informativo | `alt` = retrato de cada integrante (Emilia/Pamela/Alejandro) |
| Logo Netiza | Funcional | `aria-label` = "Netiza — ir al inicio" |
| Play | Funcional | `aria-label` = "Reproducir video" |
| Hamburger | Funcional | `aria-label` = "Abrir menú de navegación" |
| Theme toggle | Funcional | `aria-label` = "Cambiar entre modo claro y oscuro" |
| Toggle FAQ | Funcional | `aria-label` = "Expandir/ocultar respuesta" + `aria-expanded` |
| Tick ✓ / ✕ | Informativo | `alt` = "Incluido" / "No incluido" (no depender del color) |

### Cumplimiento

- **Contraste (1.4.3):** texto secundario subido a 72% de tinta para pasar ≥4.5:1 sobre crema. Títulos y primario ≈13:1.
- **Touch target (2.5.8):** interactivos ≥24×24 (hamburger corregido a 26×24; toggles 28–40).
- **Uso del color (1.4.1):** estados y comparativas acompañados de texto/símbolo, nunca solo color.
- **Naming semántico (§1):** capas nombradas por función (`hero-copy`, `service-list`, `step-number`, `kicker`…), jerarquía con `/`, ≤4 niveles de anidamiento, orden de lectura coherente.

### Notas de handoff para desarrollo

- `scroll-padding-top` en el `html` = alto del navbar fijo (foco no obscurecido, 2.4.11).
- Respetar `prefers-reduced-motion`: desactivar reveals y marquees.
- Enlaces de nav/footer: garantizar min-height ~44px o separación de 24px (target táctil).
- Media: cargar con `width/height` explícitos y `fetchpriority="high"` en el hero; `loading="lazy"` el resto.
- Foco visible propio (anillo) en todos los interactivos.

---

## 8. Media pendiente (placeholders)

Los slots de video/foto son placeholders a reemplazar por material real de Netiza
(`netiza/04 - Fotos y videos`) o generado. Ver inventario en `viral/media-slots.md`.

| Slot | Ratio | Radio | Contenido |
|------|-------|-------|-----------|
| Hero video | vertical 9:16 | 20–24 | Reel del estudio / territorio (Mercedes) |
| Reels ×3 | vertical | 18–20 | Piezas producidas para marcas |
| Fotos equipo ×3 | retrato | 16 | Emilia · Pamela · Alejandro |

---

## 9. Responsive: desktop → mobile

- **Nav:** links visibles → colapsan en **hamburger**; se mantienen logo, WhatsApp y theme toggle.
- **Columnas → stack:** hero, casos, comparativa y equipo pasan a una sola columna.
- **Grids → apilado:** cards de servicios/problema y reels se apilan full-width (342).
- **Botones:** full-width en mobile.
- **Tipografía:** hero 56→40, section H2 46→24, sub-H2 40→22–24; cuerpo 18→16.
- **Gutter:** 64 → 24 px.

---

*Documento generado a partir del estado real del archivo Penpot. Actualizar si cambia el diseño.*
