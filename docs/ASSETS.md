# Manifiesto de assets — Netiza web

> **Regla única:** ningún componente puede referenciar un asset que NO esté en esta lista.
> Si necesitás uno nuevo, se agrega acá primero (y al archivo real en `public/assets/`).
> Los agentes de terminal no ven Penpot: **esta es su fuente de verdad de qué archivos existen.**

Todos los assets se sirven desde `/assets/…` (carpeta `public/assets/`).

## Marca
| Archivo | Uso |
|---|---|
| `/assets/netiza-logo.svg` | Logo para JSON-LD / metadata |
| `/assets/logo-netiza-dark.svg` | Wordmark para fondos claros |
| `/assets/logo-netiza-light.svg` | Wordmark para fondos oscuros (dark mode) |

## SEO / social
| Archivo | Uso |
|---|---|
| `/assets/og-image.png` | Open Graph 1200×630 (WhatsApp/redes) |
| `/assets/favicon.png` | Favicon |

## Media de secciones
| Archivo | Sección | Tipo |
|---|---|---|
| `/assets/hero-reel.png` | Hero | Imagen estática (placeholder del reel — ver nota) |
| `/assets/reel-producto-local.png` | Trabajos | Imagen estática |
| `/assets/reel-turismo-rural.png` | Trabajos | Imagen estática |
| `/assets/reel-detras-escena.png` | Trabajos | Imagen estática |
| `/assets/foto-emilia.png` | Equipo | Foto (Emilia — Estrategia y UX) |
| `/assets/foto-pamela.png` | Equipo | Foto (Pamela — Negocio y e-commerce) |
| `/assets/foto-alejandro.png` | Equipo | Foto (Alejandro — Tecnología e IA) |

## Notas
- **No hay archivos de video (`.mp4`) ni `.webp` todavía.** Las "reels" son imágenes estáticas
  (generadas en Higgsfield). El Hero usa `<img>`, no `<video>`. Si más adelante se produce el
  video real del reel, se agrega el `.mp4` acá y recién ahí se cambia el `<img>` por `<video>`.
- Las fotos del equipo son placeholders generados; reemplazar por fotos reales cuando estén.
