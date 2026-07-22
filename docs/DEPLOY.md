# Deploy y operación de netiza.com.ar

> Guía operativa del sitio en producción. Última revisión: 2026-07-22.

## Dónde vive el sitio

| Qué | Valor |
|---|---|
| Hosting | Hostinger (plan compartido, LiteSpeed + CDN propio) |
| Cuenta / username | `u273722050` |
| Tipo de dominio | **Addon** (no es el dominio principal de la cuenta) |
| Raíz del sitio | `/home/u273722050/domains/netiza.com.ar/public_html` |
| DNS | Gestionado en Hostinger; `@` y `www` apuntan al CDN (`*.cdn.hstgr.net`). El resto de los registros son de mail (DKIM, autoconfig, SPF/DMARC) — **no tocar** |
| Repo | https://github.com/alit0/netiza-web (público) |

## Cómo entrar

- **hPanel**: https://hpanel.hostinger.com → Sitios web → netiza.com.ar → Administrador de archivos.
  - Activar **"Mostrar archivos ocultos"** para ver el `.htaccess`.
- **API / agentes**: los MCPs de Hostinger (dns / hosting / billing) ya están configurados
  en las máquinas del equipo. El username se resuelve automáticamente desde el dominio.

## Build

```bash
npm install        # primera vez
npm run build      # genera dist/
```

El build incluye `dist/.htaccess` (viene de `public/.htaccess`). Si falta, la subida
pierde los headers de seguridad y el cache — verificarlo SIEMPRE antes de subir.

## Deploy (proceso actual: manual)

1. `npm run build`
2. En hPanel → Administrador de archivos → `public_html`:
   **vaciar la carpeta antes de subir** (la subida manual MERGEA, no reemplaza —
   si no se limpia, se acumulan archivos huérfanos de builds viejos).
3. Subir **todo el contenido** de `dist/` (no la carpeta `dist` en sí).
4. Confirmar que `.htaccess` llegó (archivos ocultos visibles).

### Verificación post-deploy (no negociable)

```bash
# La home responde y es el build nuevo
curl -s https://netiza.com.ar/ | grep -c "slide1.mp4"        # debe dar >= 1

# Headers de seguridad y cache activos
curl -sI https://netiza.com.ar/ | grep -i "strict-transport"  # HSTS presente
curl -sI https://netiza.com.ar/assets/slide1.mp4 | grep -i "cache-control"
# → Cache-Control: public, max-age=2592000
```

Regla del equipo: **nada pasa a "hecho" sin evidencia** — correr estos curls y
pegar el resultado en la card de Plane correspondiente.

### Deploy por MCP (estado 2026-07-22: NO funciona)

`hosting_deployStaticWebsite` sube el zip pero la extracción devuelve **HTTP 500**
para este dominio (3 intentos, 2 formatos de zip — probablemente por ser dominio
addon). Reintentar en algún release futuro; si persiste, evaluar deploy por Git
desde hPanel. Detalle en Engram: `deploy/hostinger-mcp-attempt`.

## Headers (`public/.htaccess`)

| Header | Valor | Por qué |
|---|---|---|
| `Strict-Transport-Security` | `max-age=31536000` (sin `includeSubDomains`) | Los subdominios de mail (autoconfig/autodiscover) no deben forzarse a HTTPS |
| `X-Content-Type-Options` | `nosniff` | Evita sniffing de MIME |
| `X-Frame-Options` | `SAMEORIGIN` | Evita clickjacking |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Privacidad de referrers |
| Cache `.mp4` | 30 días | Los videos pesan 0.5–1.7 MB; sin esto se re-descargan en cada visita |
| Cache imágenes/fuentes | 7 días | |
| Cache CSS/JS (`_astro/*`) | 1 año, `immutable` | Astro les pone hash en el nombre: cambian de URL en cada build |

## Pipeline de medios

- **Masters crudos** en `originales/` (gitignoreado, ~120 MB — NUNCA va a `public/`).
- **Compresión de video** (ffmpeg, instalado vía winget):
  H.264 CRF 28, preset slow, sin audio (`-an`), máx. 1280px de alto,
  `-movflags +faststart`, `-pix_fmt yuv420p`. Objetivo: ≤ 3.5 MB por video.
- **Posters**: frame a ~0.5s exportado a WebP q80.
- **Imágenes**: WebP, contenido 900px q82, fondos de sección 1600px q80.

## Trucos y trampas del hosting (aprendidos a los golpes)

### Borrar archivos del servidor sin SSH ni hPanel

Se puede con un **cron job temporal** vía MCP (`hosting_createAccountCronJobV1`),
pero con tres reglas:

1. **Sin shell**: Hostinger ejecuta el cron con `timeout <comando>` directo — no hay
   shell. Los builtins (`cd`), los globs (`*.zip`) y las comillas NO funcionan
   (`sh -c '...'` pierde las comillas al guardarse). Usar solo binarios reales
   (`rm`, `find`) con **rutas absolutas y literales**.
2. **Límite de 255 caracteres** por comando — partir en varios crons si no entra.
3. **Borrar el cron después** (`hosting_deleteAccountCronJobV1`) y verificar con
   `hosting_getCronJobOutputV1` que corrió sin error — un cron fallando en silencio
   cada minuto no avisa.

### El CDN puede "revivir" archivos borrados

Tras borrar un archivo del disco, el CDN de Hostinger (`hcdn`) puede seguir
sirviéndolo desde cache (verificar con `curl -sI ... | grep x-hcdn-cache-status`;
`HIT` = viene del cache). Con nuestro `Cache-Control` de 7 días, un huérfano
"borrado" puede vivir una semana más. Solución: purgar con
`hosting_clearWebsiteCacheV1` y re-verificar hasta ver el 404.

### El deploy por MCP deja el zip en la raíz pública

Los intentos con `hosting_deployStaticWebsite` subieron el zip a `public_html/`
— **públicamente descargable** — aunque la extracción falle con 500. Si se
reintenta ese camino, verificar después que no quede `https://netiza.com.ar/<zip>`
respondiendo 200, y borrarlo si quedó.

## Analítica

- GA4 (`G-JVL2NEB5B8`) y Microsoft Clarity, ambos en `BaseLayout.astro`.
- Las cookies de Clarity/Bing bajan el score de Best Practices en Lighthouse (~77):
  es esperado, no es un bug.

## Referencia rápida de scores (Lighthouse 2026-07-22)

Mobile: Perf 78 · A11y 100 · BP 77 · SEO 100 (LCP 4.2s).
Desktop: Perf ~95 · A11y 100 · BP 77 · SEO 100.
Si un deploy los degrada fuerte, investigar antes de seguir.
