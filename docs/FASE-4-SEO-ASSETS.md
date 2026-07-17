# FASE 4 — SEO / Infra assets (groundwork independiente del build)

> Trabajo del lane **infra/ops/SEO** (OpenCode). Estos assets **no tocan las secciones
> ni el deploy**: son piezas listas para que el Layout/`<head>` las referencie cuando
> se conecte el build. Generados en paralelo a la Fase de secciones.

**Dominio final:** `https://netiza.com.ar/`
**Conversion unica:** consulta por WhatsApp → `https://wa.me/5492324533126`
**Stack:** Astro estatico (v7), sitio de una sola pagina (single-page landing).

---

## 1. Assets generados (`public/`)

| Archivo | Tamano | Uso |
|---|---|---|
| `public/og-image.png` | 1200×630 PNG (53 KB) | `og:image` + `twitter:image` (WhatsApp/redes). **PNG obligatorio: WhatsApp no rinde SVG.** |
| `public/favicon-32x32.png` | 32×32 PNG | `<link rel="icon" sizes="32x32">` |
| `public/favicon-180x180.png` | 180×180 PNG | Apple touch icon / high-res |
| `public/favicon.png` | 180×180 PNG (copia) | `<link rel="icon" ...>` generico (matchea `reference/site-index.html`) |
| `public/apple-touch-icon.png` | 180×180 PNG (copia) | `<link rel="apple-touch-icon">` |

### Diseno de los assets
- **OG image:** fondo crema `#f3f0ec`, wordmark **Netiza** (paths vectoriales del logo
  `design-handoff/logo-netiza-light.svg`, recoloreados a off-black `#15130f`), punto
  naranja `#f15a24` del acento de la **i**. Tagline:
  `Estrategia digital, web e IA para pymes` + `Mercedes, Buenos Aires · Argentina` +
  handle `wa.me/5492324533126` + `netiza.com.ar`. Acento naranja superior.
- **Favicon:** tile crema + glifo **N** (off-black) + punto naranja como acento de marca.
  Reconocible a 16px (tab) y 180px (home screen).

### Como se verificaron (no asumido, medido)
Generados con **`sharp`** (ya en `node_modules`, viene con Astro — **cero dependencias
nuevas**), rasterizando SVG → PNG. Validacion programatica pixel-level:
- `og-image.png`: dimensiones exactas `1200×630`; region del tagline con **std=73**
  (fondo plano daria <3) → confirma que el **texto renderizo** (no quedo en blanco).
- favicons: dimensiones exactas; contenido presente (std ~97 → el "N" se ve).
- Todos los PNG validos (channels=4, alpha).

> Nota tecnica: `sharp` usa `resvg`, que a veces no carga fuentes del sistema y deja
> `<text>` en blanco. Se midio la varianza del area de texto para detectarlo; paso OK.

---

## 2. Config SEO estatica (`public/`)

| Archivo | Contenido |
|---|---|
| `public/robots.txt` | `User-agent: * / Allow: /` + `Sitemap: https://netiza.com.ar/sitemap.xml` |
| `public/sitemap.xml` | `<urlset>` con la home `https://netiza.com.ar/`, `lastmod 2026-07-17`, `priority 1.0` |

> Como el sitio es **una sola pagina** y `astro.config.mjs` no tiene integracion
> `@astrojs/sitemap`, se uso un `sitemap.xml` estatico (sin dependencias). Si el sitio
> crece a multipagina, agregar `@astrojs/sitemap` y generar dinamicamente.

---

## 3. Discrepancia de rutas a resolver al conectar el `<head>`

`reference/site-index.html` (baseline) referencia los assets con path `/assets/...`:

```html
<meta property="og:image"  content="https://netiza.com.ar/assets/og-image.png" />
<link rel="icon" href="https://netiza.com.ar/assets/favicon.png" type="image/png" />
<!-- JSON-LD: "image": ".../assets/og-image.png", "logo": ".../assets/netiza-logo.svg" -->
```

Pero esta Fase dejo los assets en la **raiz de `public/`** (`/og-image.png`, `/favicon.png`).
Astro sirve `public/` en la raiz del dominio, asi que cualquiera de los dos funciona.
**Decision pendiente al conectar el Layout** (lane build): una de estas dos —

- **(A) Recomendado:** referenciar desde el `<head>` con path raiz absoluto
  (`/og-image.png`, `/favicon-32x32.png`, etc.) y ajustar el JSON-LD igual. Menos
  carpetas, mas simple.
- **(B)** Mantener `/assets/...`: crear `public/assets/` y mover/copiar ahi los PNGs
  + agregar `public/assets/netiza-logo.svg` (copiar de `design-handoff/logo-netiza-dark.svg`).

**No se modifico ningun `<head>` ni Layout en esta Fase** (fuera de alcance, por
instruccion: "no tocar las secciones ni el deploy").

---

## 4. Pendientes (no cubiertos aqui — requieren decision/accion externa)

- [ ] **GA4 ID real** (`G-XXXXXXXXXX`): hoy esta comentado en `site-index.html`.
      Cuando se consiga, cablear `gtag` + evento `whatsapp_click` en el Layout.
      Recordar politica de privacidad/consentimiento si se trackea.
- [ ] **Deploy del dominio `netiza.com.ar`**: DNS + hosting (plan: Hostinger Fase 0 /
      Cloudflare Pages Fase 2). Hasta que el dominio responda, la OG image no se previsualiza.
- [ ] **Google Business Profile**: alta/claim del negocio en Mercedes, BA. Refuerza SEO
      local + el JSON-LD `ProfessionalService`/`LocalBusiness` (ver `docs/planes/opencode-infra-seo.md`).
- [ ] **Preview real de WhatsApp**: pegar `https://netiza.com.ar/` en WhatsApp y confirmar
      que aparece la OG image (no vacio, no fallback). Tester: `developers.facebook.com/tools/debug/`.
- [ ] **Wiring en el Layout Astro**: `<link rel="icon">`, `apple-touch-icon`,
      `<meta og:image>` / `twitter:image`, `canonical`, JSON-LD (ya en `site-index.html`
      como baseline) — todo apuntando a los paths definidos arriba (seccion 3).
- [ ] **`netiza-logo.svg` servido** si se usa el path `/assets/` en JSON-LD (seccion 3, plan B).
- [ ] **(Opcional) `favicon.ico`**: algunos navegadores viejos piden `/favicon.ico`.
      No critico (los PNG cubren el 99% + apple-touch). Generar con ImageMagick si se quiere.
- [ ] **(Opcional) Web App Manifest** `site.webmanifest` si se quiere PWA-lite / installs.

---

## 5. Archivos tocados en esta Fase

```
public/og-image.png          (nuevo, 1200×630)
public/favicon-32x32.png     (nuevo)
public/favicon-180x180.png   (nuevo)
public/favicon.png           (nuevo, = 180)
public/apple-touch-icon.png  (nuevo, = 180)
public/robots.txt            (nuevo)
public/sitemap.xml           (nuevo)
docs/FASE-4-SEO-ASSETS.md    (nuevo, este doc)
```

Sin tocar: `src/`, `astro.config.mjs`, `reference/`, `design-handoff/`, secciones, deploy.
