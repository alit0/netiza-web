# Handoff de diseño → desarrollo (Netiza web)

> Los agentes **no pueden abrir Penpot**. Este README + el design spec + los assets de esta carpeta
> son la fuente de verdad del diseño. Todo vive dentro de este repo (`netiza-web`).

## Diseño (fuente de verdad)
- **Spec escrito (autoritativo):** [`../docs/design-spec-penpot-netiza.md`](../docs/design-spec-penpot-netiza.md) — 13 secciones, tokens 3-tier (§4/§5), tipografía (§3), componentes (§6), responsive (§9), accesibilidad (§7). Construir contra este spec.
- **Referencia visual:** las medidas exactas están en el spec. Si necesitás **ver** una sección del Penpot, pedísela a Claude (tiene acceso y la exporta). **Agy** valida fidelidad visual (construido vs Penpot) en la Fase 5.
- **Slots de media:** [`../docs/media-slots.md`](../docs/media-slots.md).

## Assets reales (esta carpeta)
Logo (SVG, punto naranja `#f15a24`): `logo-netiza-dark.svg` (fondo claro) · `logo-netiza-light.svg` (fondo oscuro / dark mode).

Imágenes (`img/`, Higgsfield, paleta cálida). **Optimizar a WebP/AVIF + resize** antes de servir (hoy 2-5MB c/u) → van a `public/`:
| Archivo | Sección |
|---|---|
| `img/hero-reel.png` | Hero (reel vertical 9:16) |
| `img/reel-producto-local.png` · `img/reel-turismo-rural.png` · `img/reel-detras-escena.png` | Trabajos (3 reels) |
| `img/foto-emilia.png` | Equipo · Emilia (Estrategia y UX) |
| `img/foto-pamela.png` | Equipo · Pamela (Negocio y e-commerce) |
| `img/foto-alejandro.png` | Equipo · Alejandro (Tecnología e IA) |

## Copy
Copy real en [`../reference/site-index.html`](../reference/site-index.html). Secciones design-only (Trabajos, Raíces, Comparativa, Equipo): copy en el design spec. **Prohibido inventar casos/testimonios/métricas.**

## Regla de oro
El diseño Penpot manda sobre cualquier interpretación. Ante duda visual → se consulta (Claude exporta), no se improvisa.
