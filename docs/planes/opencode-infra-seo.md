# Plan de infraestructura, deploy y SEO técnico — lane Infra/SEO (opencode)

**Proyecto:** Netiza Website (repo `NewNetizaWebsite`, destino final `netiza-web`, app en `web/`)
**Stack objetivo:** Astro estático, HTML legible por crawlers (prohibido SPA sin SSR)
**Métrica única:** consultas por WhatsApp (`wa.me/5492324533126`)
**Alcance:** SOLO plan. No se crea repo, no se escribe código, no se toca DNS.
**Fuentes leídas:** `netiza/netiza-contexto.txt` (AUDITORÍA SEO + SITIO NUEVO), `doc/design-spec-penpot-netiza.md` (§7 accesibilidad y medidas), `netiza/05 - Sitio web/BRIEFING-MAESTRO.md`, `doc/planes-web/gepeto-build.md` (lane Build, para no pisar).

---

## Plan de este lane (antes del detalle)

1. Reconciliar el prompt (planear Astro) con la decisión vigente del `BRIEFING-MAESTRO.md`: **Fase 0 = HTML plano ya listo en `site/` → Hostinger**; **Fase 2 = Astro**. Cubrir ambas.
2. Comparar 5 hostings para estáticos (Vercel / Netlify / Cloudflare Pages / GitHub Pages / Hostinger) + viabilidad real de CI/CD con GitHub Actions en cada uno.
3. Definir el set de SEO técnico (schema, sitemap, robots, canonical, OG image PNG, Google Business Profile) alineado al re-giro del 07/07 (servicios a cotización, sin "Auditoría", sin foco exclusivo Mercedes).
4. Fijar presupuesto de performance / Core Web Vitals apoyado en el `design-spec` (media con `width/height`, `fetchpriority="high"` en hero, `loading="lazy"`).
5. Definir migración segura de `netiza.com.ar` (SPA React actual) al nuevo sitio: redirects, indexación, apagado.

**Riesgos del lane:** Hostinger shared sin edge CDN empeora LCP/TTFB; CI/CD con GitHub Actions es friccionado en Hostinger (FTP action, sin preview); `LocalBusiness` pierde fuerza si no se expone dirección de Mercedes; reindexación de Google tras reemplazar la SPA puede tardar días/semanas; riesgo de dejar las dos versiones indexables si no se apaga bien la SPA.

**Qué verificaría antes/depués de implementar:** indexación real de `netiza.com.ar` en Google Search Console; `site:netiza.com.ar`; preview de WhatsApp con la OG image; Rich Results Test para los schemas; PageSpeed Insights mobile del dominio final.

---

## Punto 1 — Hosting + deploy + CI/CD (GitHub Actions)

**Fase 0 (respetar decisión vigente):** el `BRIEFING-MAESTRO.md` ya decidió subir el HTML plano de `site/` a **Hostinger** por hPanel (`site/DEPLOY-HOSTINGER.md`). Lo respetamos: es operativo hoy, Ale lo maneja y el HTML ya está listo.

**Fase 2 (Astro, cuando arranque `web/`):** comparativa para estáticos:

| Hosting | Bandwidth (free) | Edge CDN | Redirects/Headers | CI/CD GitHub Actions | Notas para Netiza |
|---|---|---|---|---|---|
| **Cloudflare Pages** | Ilimitado | Sí, global | `_redirects` / `_headers` (archivos) | Nativo (o Actions) | **Recomendado.** Edge gratis, SSL auto, redirects como archivos. |
| Vercel (Hobby) | 100 GB/mes | Sí | `vercel.json` | Nativo | Válido, pero límite de bandwidth y orientado a Next. |
| Netlify | 100 GB/mes | Sí | `_redirects` / `netlify.toml` | Nativo | Válido, paridad casi total con Cloudflare. |
| GitHub Pages | 100 GB/mes (soft), repo ≤1 GB | Parcial (Fastly) | Limitado (sin `_redirects`) | Nativo | Sólo si se quiere todo en GitHub; peor para dominio custom + redirects. |
| **Hostinger** (compartido) | Pagado, sin free real | No edge (LiteSpeed cache) | `.htaccess` (Apache) | Vía action FTP/SFTP | **Decidido para Fase 0.** Funciona, pero sin edge ni atomic deploy. |

**Recomendación firme:** Fase 0 Hostinger (ya decidido); **Fase 2 → Cloudflare Pages** con output `web/dist`. Razones: edge global gratis (mejor LCP desde Argentina y otros), bandwidth ilimitado, redirects/SSL como archivos, build nativo desde GitHub o vía Actions.

**CI/CD con GitHub Actions:** en edge-CDN (Cloudflare/Netlify/Vercel) es trivial y nativo (build-on-push). En Hostinger requiere una action tipo `SamKirkland/FTP-Deploy-Action` con secrets FTP/SFTP: funciona pero sin preview, sin deploy atómico y con fricción de mantenimiento. Para Astro Fase 2, workflow estándar: `actions/checkout` → `setup-node@v20` → `npm ci` → `npm run build` → deploy del `dist/`.

---

## Punto 2 — SEO técnico

El sitio nuevo (`site/`) ya trae: `lang="es"`, meta title/description, canonical, OG, JSON-LD `ProfessionalService` + `FAQPage` (8 preguntas), `robots.txt`, `sitemap.xml`, Lighthouse ~100. **No reescribir**, sumar lo que falta:

- **Schema:** mantener `ProfessionalService` + `FAQPage` (encaja con el giro a "estudio de estrategia/web/IA a cotización"). **Sumar `LocalBusiness`** (anidado o como segundo `@type`) **sólo si** se confirma Google Business Profile activa con dirección real de Mercedes; si no quieren exponer dirección, dejar `areaServed` amplio y omitir `LocalBusiness`. **Decisión para Cloe/Emilia, no la asumo.**
- **`sitemap.xml` + `robots.txt`:** ya existen para Fase 0. En Astro Fase 2, regenerar con `@astrojs/sitemap`; `robots.txt` apunta al sitemap y permite todo (no hay nada que bloquear en una landing de conversión).
- **Canonical:** `<link rel="canonical" href="https://netiza.com.ar/">` en la home (y por página cuando haya multipágina).
- **OG image:** 1200×630 **PNG** (o JPG) con mensaje nuevo **sin "Auditoría"** (ya listado como pendiente de Ale en el briefing). **Crítico:** WhatsApp **no renderiza SVG** como `og:image` — debe ser PNG/JPG. Mismo asset sirve para `twitter:card summary_large_image`.
- **Google Business Profile:** alta + verificación + fotos reales. Requiere dirección/verificación postal o telefónica. Refuerza SEO local de Mercedes y el panel de conocimiento. Pendiente operativo de Ale/Emilia.
- **Title/description (baseline ya en `site/`):** alinearlos al re-giro (sin "turismo rural", sin precio fijo); no reabrir tono — eso es lane Comercial (Pamela).

---

## Punto 3 — Performance / Core Web Vitals

Apoyado en el `design-spec-penpot-netiza.md` §7 (media con `width/height` + `fetchpriority="high"` en hero + `loading="lazy"`, línea 196).

**Presupuesto objetivo (mobile, dominio final):**

- **LCP < 2.5 s:** hero con `fetchpriority="high"` + `preload` de la imagen/video crítico; preconnect de fuentes; self-host o subset de Inter + Source Serif 4 con `font-display: swap`.
- **CLS = 0:** `width`/`height` explícitos en **toda** imagen/video (incluye reels y fotos de equipo) para reservar el espacio.
- **INP < 200 ms:** mínimo JS. Astro por defecto envía cero JS; theme toggle como script inline mínimo en `<head>` (default light, evitar flash); FAQ con `<details>`/`<summary>` nativos (sin hidratar la página). Evitar acordeones con framework.
- **Tamaños:** hero < 150 KB (WebP/AVIF con `<picture>` + fallback), CSS < 50 KB, JS < 100 KB (idealmente ~0 salvo toggle).
- **Imágenes:** `<picture>` WebP/AVIF, `loading="lazy"` en todo salvo hero; `decoding="async"`.
- **Fuentes:** preconnect + preload, o self-host con subsetting (latin) para reducir payload y LCP.

**Verificación:** PageSpeed Insights mobile + Lighthouse local del `dist/` antes de cada deploy; budget dentro del CI de GitHub Actions (fail si LCP modelado > 3 s o JS > budget).

---

## Punto 4 — Migración / transición desde `netiza.com.ar`

La SPA actual (`netiza/05 - Sitio web/netiza-web/`, React client-side) es "SEO 0": Google casi no la lee.

- **Antes de tocar nada:** verificar indexación real en **Google Search Console** + `site:netiza.com.ar`. Si la SPA usaba rutas client-side, lo más probable es que sólo la home esté indexada; si hay URLs indexadas, mapearlas.
- **Redirects:** toda URL vieja indexada → **301** (no 302) a su equivalente. Como el nuevo es una landing de 1 página, la mayoría va a `/`. En Hostinger vía `.htaccess` (`Redirect 301`); en Cloudflare vía `public/_redirects`. Los 301 conservan la autoridad acumulada.
- **Apagado de la SPA:** reemplazar el contenido del document root (backup del viejo primero); **no dejar las dos versiones indexables** en paralelo (generaría duplicación / canibalización, aunque canonical ayuda).
- **Reindexación:** Google puede tardar días/semanas en procesar el nuevo contenido (ahora sí legible). Acelerar: Search Console → "Inspección de URL" → "Solicitar indexación" + reenviar `sitemap.xml`.
- **HTTPS:** forzar HTTPS (Let's Encrypt ya en Hostinger; redirect 301 http→https en `.htaccess`). Mantener `www` vs no-`www` consistente (elegir uno, redirect el otro).
- **DNS/propagación:** si se cambia de hosting en Fase 2 (Hostinger → Cloudflare), planificar ventana de mantenimiento corta; mantener redirect global para no perder tráfico.

---

## Riesgos

| Riesgo | Impacto | Mitigación |
|---|---|---|
| Hostinger shared sin edge CDN | LCP/TTFB más alto desde lejos → peor CWV y ranking | Fase 2 mover a Cloudflare Pages (edge gratis) |
| CI/CD con Actions en Hostinger | Fricción, sin preview, mantenimiento de secrets FTP | Limitar Hostinger a Fase 0; Actions real en Fase 2 con Cloudflare |
| `LocalBusiness` sin dirección expuesta | Schema débil / inconsistente con GBP | Confirmar con Emilia antes de sumar; si no, omitir |
| Reindexación lenta de Google | Tráfico orgánico demora en llegar | Search Console + sitemap; la métrica real es WhatsApp, no SEO inmediato |
| Dejar SPA y nuevo sitio vivos en paralelo | Duplicación / canibalización | Apagar SPA con redirects 301 el mismo día |
| Paleta verde (`site/`) vs crema/naranja (Penpot) | Incoherencia visual entre Fase 0 y Fase 2 | Es de lane Build/Design (Gepeto); coordinar en merge de Cloe |

---

## Qué verificaría (criterios de aceptación del lane)

1. Google Search Console: páginas indexadas de la SPA vieja, errores, sitemap recibido.
2. `site:netiza.com.ar` en Google: qué URLs sobreviven para mapear redirects.
3. Rich Results Test sobre `ProfessionalService` + `FAQPage` (y `LocalBusiness` si se suma): sin errores.
4. Preview real de WhatsApp con el link `netiza.com.ar`: aparece la OG image PNG (no vacío, no SVG).
5. PageSpeed Insights mobile del dominio final: LCP < 2.5 s, CLS < 0.1, INP < 200 ms.
6. Lighthouse local del build: SEO y Accessibility sin fallos críticos.
7. Redirect checker (`httpstatus.com`): todas las URLs viejas devuelven 301 al destino correcto.
8. `robots.txt` tester de Search Console: sin bloqueos indebidos.

---

## Resumen ejecutivo

Plan de infra/deploy/SEO/migración en 4 puntos: (1) **Fase 0 = Hostinger** con el HTML plano ya listo en `site/` (respeta decisión del briefing); **Fase 2 = Cloudflare Pages** para Astro por edge gratis, bandwidth ilimitado y CI/CD nativo (Actions sólo es limpio fuera de Hostinger). (2) SEO: el sitio nuevo ya trae `ProfessionalService + FAQPage + canonical + OG + sitemap`; sumar OG image 1200×630 **PNG** (WhatsApp no renderiza SVG), Google Business Profile y `LocalBusiness` sólo si se expone dirección. (3) Performance: presupuesto LCP<2.5s/CLS=0/INP<200ms, hero con `fetchpriority="high"`, fuentes self-host. (4) Migración: verificar indexación en Search Console primero, redirects **301** de URLs viejas, apagar la SPA el mismo día, forzar HTTPS. **No se implementa nada: sólo plan.**

---

## Pendientes (para Cloe / otros lanes / Ale)

- [ ] **Decisión producto (Cloe/Emilia):** ¿se expone dirección de Mercedes para activar `LocalBusiness` + Google Business Profile, o queda `ProfessionalService` + `areaServed` amplio?
- [ ] **Ale:** OG image 1200×630 PNG (mensaje post-giro, sin "Auditoría"), favicon PNG, GA4 ID (`G-…`), foto de hero opcional — ya listados en el briefing.
- [ ] **Ale:** verificación de Google Business Profile (postal/teléfono).
- [ ] **Coejecución con Gepeto (lane Build):** confirmar paleta final (verde `site/` vs crema/naranja Penpot) para que Fase 0 y Fase 2 no rompan coherencia.
- [ ] **Antes de deploy Fase 0:** exportar backup del document root actual de Hostinger (la SPA vieja) antes de reemplazar.
- [ ] **Antes de apagar SPA:** captura de Search Console (URLs indexadas) para mapear redirects.

---

## Memoria (engram)

Guardado desde `C:\Users\Ale\Proyectos\NewNetizaWebsite` con `project: "NewNetizaWebsite"` (forzado — el cwd del agente era `viral`, por eso se pasa explícito):

- **decision** — Plan infra/SEO Netiza (lane opencode): Fase 0 Hostinger + Fase 2 Cloudflare Pages para Astro; schema, OG image PNG, migración con redirects 301.
- **decision** — Reconciliación briefing maestro (Fase 0 Hostinger / HTML plano ya listo en `site/`) vs prompt (planear Astro): plan cubre ambas fases, no se asume una sola.
