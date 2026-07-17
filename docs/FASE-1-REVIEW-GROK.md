# Fase 1 — Review adversarial (Grok)

| Campo | Valor |
|-------|--------|
| **Auditor** | Grok (lane verificación adversarial) |
| **Diff** | `3597c97` — `feat: establish Astro design system foundation` |
| **Fecha** | 2026-07-17 |
| **Alcance** | Solo review. Sin cambios de código. |
| **Fuentes** | `docs/FASE-1-REPORTE.md`, `docs/planes/PLAN-UNICO-WEB.md`, `docs/design-spec-penpot-netiza.md` §3–§9, commit `3597c97`, `npm run build` |
| **Veredicto** | **con-fixes** — lista para arrancar Fase 2 de contenido, con fixes chicos antes o al inicio de wiring de UI |

---

## Resumen ejecutivo

La fundación Astro de Codex está **bien armada en lo estructural**: tokens 3-tier con cascada correcta, theme anti-FOUC, BaseLayout SEO/JSON-LD fiel al baseline de `site/`, 13 stubs en orden, UI atoms tokenizados, build estático OK.

No hay 🔴 que impida que Kilo empiece secciones con copy. Hay 🟡 que hay que corregir **antes de montar Navbar/ThemeToggle** y al usar tipografía display / texto muted.

---

## Hallazgos

### 🔴 Bloqueante

*Ninguno para el gate “¿se puede empezar Fase 2?”.*

No se encontró rotura de cascada de tokens, FOUC de tema, JSON-LD inválido, build roto, ni stubs incompletos/desordenados.

---

### 🟡 Mejora (arreglar pronto; no reabrir paleta/estrategia)

#### A11y / i18n

1. **`ThemeToggle` y `Logo` tienen label accesible, pero en inglés** mientras el sitio es `lang="es"` y el design spec manda español.
   - Código: `"Switch between light and dark mode"` / `"Netiza — go to homepage"`.
   - Spec §6–§7: `"Cambiar entre modo claro y oscuro"` / `"Netiza — ir al inicio"`.
   - Impacto: al montarlos en Navbar (Fase 2/3) el lector de pantalla en español anuncia mal.
   - Archivos: `src/components/ui/ThemeToggle.astro`, `src/components/ui/Logo.astro`.

2. **Falta skip-link** presente en el baseline SEO (`site/index.html`: “Saltar al contenido”).
   - No es del Penpot de UI, pero sí del baseline de a11y/SEO de la landing actual.
   - Archivo: `src/layouts/BaseLayout.astro` o shell de `index.astro`.

#### Contraste (tokens fieles; claim del spec no cierra en muted)

3. **`--color-text-muted` @ 60% falla AA de texto normal en light.**
   - Cálculo WCAG (mezcla sRGB aproximada del `color-mix`):
     | Par | Ratio | AA normal (≥4.5) |
     |-----|-------|------------------|
     | CTA `#C2410C` / blanco | **5.18:1** | ✅ |
     | ink / paper-light | **13.24:1** | ✅ |
     | ink-light / paper-dark | **15.33:1** | ✅ |
     | secondary 72% / paper-light | **~5.71:1** | ✅ |
     | **muted 60% / paper-light** | **~3.98:1** | ❌ |
     | muted 60% / surface-light | **~4.24:1** | ❌ |
     | secondary/muted dark | ~8.3 / ~6.1 | ✅ |
   - Implementación **copia el design spec** (60%). No reabrir paleta: en Fase 2 **no usar muted para body/caption normal**; usar `secondary` (≥72%) o limitar muted a microcopy grande / no-texto crítico.
   - Archivo: `src/styles/tokens.css` (uso, no valor).

#### Fidelidad de tokens / componentes

4. **Set `viral` (letter-spacing / tracking negativo) no está en CSS.**
   - Spec §5: tokens de tracking (−2.8 … −0.3 según rol).
   - Fase 1 no monta títulos display; **bloquea fidelidad tipográfica en Fase 2** si no se agregan al armar H1/H2.
   - Archivo esperado: `src/styles/tokens.css` (Tier 1 o semantic de type).

5. **Padding del kicker no calza exacto con §6.**
   - Spec: pad ~6/13 px. Código: `--space-2`/`--space-3` → 8/12 px.
   - Menor; corregible cuando se pinte visualmente.

6. **Hover del botón primario no sigue la nota de diseño.**
   - Spec §6: hover = swap de texto (blur + traslación), fondo estable.
   - Código: `filter: brightness(0.92)` + `translateY` en `:active`.
   - Aceptable en fundación; alinear en Fase 2/3 al pulir UI.

7. **`--color-on-accent` dark = blanco**, mientras la tabla §4 anota `paper-dark` en dark.
   - Plan manda CTA `#C2410C` + blanco (5.18:1) → implementación alineada al **PLAN**, no a la nota de inversión del Penpot.
   - No reabrir: dejar blanco en CTAs; documentar que `on-accent` no se usa como tinta de marca en dark.

8. **Dark redeclara tokens no-color** (font/space/radius) en `[data-theme="dark"]`.
   - Hoy son idénticos al light; riesgo de divergencia si se edita solo un bloque.
   - Mejor: solo sobreescribir color en dark (maintainability).

#### SEO / assets (esperado Fase 4, flagueado)

9. **OG image / favicon / logo schema apuntan a URLs de producción** (`/assets/og-image.png`, etc.) que la Fase 4 debe materializar.
   - JSON-LD y meta están bien formados y copiados del baseline; el 404 de assets es deuda de Fase 4, no de scaffold.

10. **Fuentes Google en `<link>` render-blocking** (mitigado con `display=swap`).
    - OK para Fase 1; CWV/self-host es Fase 4.

---

### 🟢 OK

#### 1. Tokens 3-tier

| Check | Resultado |
|-------|-----------|
| Tier 1 primitives con hex de marca | ✅ `#232323`, papers/surfaces/sands, `#F15A24`, `#C2410C`, white |
| Tier 2 semantic referencia **solo** primitives (`var(--color-base-*)` / `color-mix`) | ✅ |
| Tier 3 components referencia **solo** semantics (`var(--color-*)`, `var(--space-*)`, …) | ✅ |
| Light/dark por `data-theme` con mismo naming | ✅ |
| CTA primary = accent-strong + white (Plan) | ✅ |
| UI atoms sin hex sueltos | ✅ (solo `transparent` / `opacity: 0.6` en disabled — aceptable) |
| Component tokens en `:root` que leen semantics themed | ✅ (cascada correcta) |

#### 2. Theme sin FOUC

| Check | Resultado |
|-------|-----------|
| Script `is:inline` al **inicio** de `<head>` (antes de CSS/fonts en build) | ✅ pos ~176 vs first `<link` ~1077 en `dist/index.html` |
| Lee `localStorage('netiza-theme')` con allowlist light/dark | ✅ |
| Fallback `prefers-color-scheme: dark` | ✅ |
| Default SSR `data-theme="light"` + override sync | ✅ |
| `documentElement.style.colorScheme = theme` | ✅ |
| `ThemeToggle` persiste y sincroniza `aria-pressed` | ✅ |
| `prefers-reduced-motion` global | ✅ |

#### 3. SEO / head

| Check | Resultado |
|-------|-----------|
| `title`, `description`, `canonical` | ✅ |
| OG (type, title, description, image 1200×630, alt, locale `es_AR`, url) | ✅ |
| Twitter card large image | ✅ |
| JSON-LD `ProfessionalService` válido | ✅ parse OK; fiel a `site/index.html` |
| JSON-LD `FAQPage` válido, 8 Q&A | ✅ parse OK; copy del baseline, no inventado |
| `lang="es"` | ✅ |

#### 4. A11y base (estructura)

| Check | Resultado |
|-------|-----------|
| Landmarks: `header` + `main` + `footer` | ✅ |
| 11 `<section>` dentro de `main` + navbar/footer = 13 stubs | ✅ |
| IDs/orden alineados al plan (hero → … → cta-final) | ✅ |
| Focus ring global con tokens | ✅ |
| Touch min `--size-touch` 2.75rem (44px) en controles | ✅ |
| Logo: `alt=""` decorativo + `aria-label` en el enlace | ✅ patrón correcto |
| ThemeToggle: `aria-label` + `aria-pressed` + glifos `aria-hidden` | ✅ patrón correcto |
| Contraste primary/secondary/CTA | ✅ (ver 🟡 muted) |

#### 5. Fidelidad al spec (fundación)

| Check | Resultado |
|-------|-----------|
| Familias Inter + Source Serif 4 | ✅ |
| Source Serif **solo italic** (acentos de título) | ✅ URL `ital,wght@1,500;1,600;1,700` |
| Pesos 500/600/700 | ✅ |
| `font-display: swap` | ✅ en URL Google Fonts |
| Escala `xs…5xl` alineada a tabla §3 (sin 2xl; OK) | ✅ |
| Radios: card 16 (`md`), media 20 (`lg`), pill `full` | ✅ |
| Spacing scale + section-y 4rem | ✅ |
| Card pad 28px (`space-7`) dentro de 22–28 | ✅ |
| Button pad 16/28 | ✅ |
| Logos light/dark desde `design-handoff/` con swap por tema | ✅ |
| WhatsApp centralizado `src/data/links.ts` | ✅ `wa.me/5492324533126` |
| `npm run build` static OK | ✅ 1 page, exit 0 |

---

## Checklist de la tarea (respuesta directa)

| # | Pregunta | Estado |
|---|----------|--------|
| 1 | Tokens 3-tier: semantic→primitives, components→semantic only; light/dark; sin valores sueltos de color | 🟢 (🟡 maintainability dark dup + muted usage) |
| 2 | Theme sin FOUC: script head, prefers + localStorage, color-scheme | 🟢 |
| 3 | SEO/head + JSON-LD válido | 🟢 (assets producción = deuda Fase 4) |
| 4 | A11y: labels, landmarks, contraste | 🟡 labels EN; muted light < 4.5; skip-link ausente |
| 5 | Fidelidad tipografía/escala/radios/spacing + `font-display: swap` | 🟢 fundación; 🟡 falta set letter-spacing `viral` |

---

## Veredicto

**Fase 1 lista para Fase 2: `con-fixes`.**

- **Sí** se puede arrancar Fase 2 (copy + secciones) sobre stubs y tokens.
- **Fixes recomendados antes de merge de Navbar / ThemeToggle** (o como primer PR de polish de Fase 2):
  1. aria-labels en español (spec §6–§7).
  2. Skip-link al contenido.
  3. Tokens de letter-spacing al implementar H1/H2.
  4. Regla de uso: no body text en `--color-text-muted` light.
  5. (Opcional) hover botón según spec; kicker pad 6/13; dark solo override de color.

**No reabrir:** paleta, acento `#F15A24` vs CTA `#C2410C`, stack Astro, ni estrategia WhatsApp-only.

---

## Evidencia de verificación

```text
git show 3597c97 --stat
  → 15 files, tokens/layout/UI/stubs

npm run build
  → static OK, dist/index.html

JSON.parse sobre ambos application/ld+json en dist
  → ProfessionalService + FAQPage (8) válidos

Contraste WCAG calculado sobre hex del design/tokens
  → CTA 5.18; muted light ~3.98 (falla AA normal)
```

---

*Reporte adversarial — Grok. Sin parches de código en este lane.*
