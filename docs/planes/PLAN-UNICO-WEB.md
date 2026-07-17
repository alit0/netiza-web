# PLAN ÚNICO — Sitio web Netiza (aprobado 2026-07-17)

> Fusión de los 5 planes de lane (Build/Codex, Infra-SEO/OpenCode, QA/Kilo, Research/Agy, Comercial/Codex).
> **Este archivo manda sobre los planes sueltos** cuando haya tensión. Todo agente lo lee antes de ejecutar.

## Objetivo
Llevar el diseño Penpot a producción como sitio **Astro estático**. Repo `netiza-web` (público, GitHub alit0),
clonado en `C:\Users\Ale\Proyectos\netiza-web`. **Métrica única: consultas por WhatsApp** (`wa.me/5492324533126`).

## Decisiones resueltas (NO re-discutir)
1. **Stack:** Astro estático, HTML legible por crawlers. **App en la RAÍZ del repo `netiza-web`** (repo dedicado; no `web/`).
2. **Deploy:** **Cloudflare Pages** (edge gratis, CWV). Se descarta Hostinger (eslabón débil confirmado).
3. **Visual:** el **diseño Penpot** manda — crema/off-black + naranja. Se retira el verde del `site/`.
   Tokens 3-tier → CSS custom properties, light/dark por `data-theme`. Botón primario `#C2410C` + texto blanco (5.18:1); acento de marca/logo `#F15A24`. Valores exactos en `doc/design-spec-penpot-netiza.md` §4/§5.
4. **Copy v1:** el copy real de `site/index.html` + **un solo CTA WhatsApp**. Prohibido inventar casos/testimonios/métricas.
   La "Auditoría Netiza" + CTAs por nivel = **Fase 1.1** (cuando Emilia/Pamela cierren el entregable).
5. **Sin formulario en v1** (WhatsApp only, como el diseño).
6. **Métrica:** GA4 `whatsapp_click` (intención) ≠ consulta real (mensaje entrante en WhatsApp Business, etiqueta "Web", dedup 30d). Meta tras **4 semanas de línea base**.
7. **Media + copy de las 13 secciones ya existen** en el archivo Penpot (imágenes Higgsfield + copy). Se extraen, no se inventan.

## Decisión pendiente (Emilia/Ale — bloquea SEO local, NO el build)
¿Exponer dirección de Mercedes → `LocalBusiness` + Google Business Profile, o quedar con `ProfessionalService` + `areaServed` amplio (ya en `site/`)?

## Fases y lanes (roster: Claude/Codex/Grok/Agy/Kilo/OpenCode)
| Fase | Qué | Lane |
|---|---|---|
| 0. Research (paralelo) | referentes, SEO local, micro-copy, funnel → evidencia para copy/CTA/Mercedes | **Agy** |
| 1. Fundación | scaffold Astro (raíz), tokens→CSS vars (light/dark), BaseLayout (SEO/OG/JSON-LD de `site/`), fonts, UI atoms, stubs 13 secciones | **Codex** |
| 2. Secciones con copy listo | Hero, Problema, Para quién, Qué hacemos, Método, FAQ, CTA, Footer, Navbar | **Kilo** |
| 3. Design-only + media | Trabajos, Raíces, Comparativa, Equipo + media del Penpot; theme toggle + hamburger | **Kilo** |
| 4. SEO técnico + CWV | schema, sitemap/robots/canonical, OG image PNG 1200×630, budget LCP<2.5/CLS=0/INP<200 | **OpenCode** |
| 5. QA + Testing | axe-core + Lighthouse (a11y≥95, perf≥90) + Playwright (9 flujos, 4 CTAs WhatsApp) + cross-device + links + HTML indexable; **verificación visual vs Penpot** | **Kilo** + **Agy** (visual), **verifica Grok** (código) |
| 6. Deploy + migración | Cloudflare Pages, dominio, 301 desde la SPA vieja (backup + Search Console primero), HTTPS, GA4; **verificación en navegador real** (WhatsApp OG, Rich Results, PageSpeed) | **OpenCode** + **Agy** |
| 1.1 (fast-follow) | CTAs por nivel + `?text=` + `cta_location`, copy comercial de cierre | **Codex** |

**Verificación cruzada:** quien construye no verifica — Grok revisa el código antes de cada merge; Claude aprueba gates.

## Fuentes canónicas (rutas absolutas)
- Diseño: `C:\Users\Ale\Proyectos\NewNetizaWebsite\doc\design-spec-penpot-netiza.md`
- Copy + SEO baseline: `C:\Users\Ale\Proyectos\NewNetizaWebsite\site\index.html` y `site\styles.css`
- Logo SVG (dark, naranja): `C:\Users\Ale\Proyectos\NewNetizaWebsite\netiza\03 - Marca\Logo\SVG\logo-dark_naranja.svg`
- Media (fotos/reels): `viral\media-slots.md` + `netiza\04 - Fotos y videos` (o exportar del Penpot)
- Planes de lane: `doc\planes-web\*.md`
