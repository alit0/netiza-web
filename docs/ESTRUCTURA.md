# Estructura del repo `netiza-web`

> **Casa única.** Todo —código, documentos, información y assets— vive en este repo.
> Nada de trabajar en `viral` ni en `NewNetizaWebsite`: eso es solo referencia histórica.

## Regla de trabajo (para todos los agentes)
- **Ruta de trabajo SIEMPRE:** `C:\Users\Ale\Proyectos\netiza-web`. Hacé `cd` acá antes de nada.
- **Commit + push:** todo cambio se commitea (conventional commits, sin atribución de IA) y se pushea a `origin main`.
- **Engram:** guardá forzando el proyecto → `engram save "<t>" "<c>" --type <tipo> --project netiza-web` (o corré engram desde dentro de este repo). NO caiga en `viral`.

## Layout
```
netiza-web/
  (app Astro en la RAÍZ: package.json, astro.config.mjs, src/, public/)
  docs/
    ESTRUCTURA.md                     # este archivo
    design-spec-penpot-netiza.md      # spec de diseño (autoritativo)
    media-slots.md                    # inventario de media
    planes/
      PLAN-UNICO-WEB.md               # ← decisiones firmes, MANDA sobre lo demás
      *.md                            # planes por lane (Build/Infra/QA/Research/Comercial)
  design-handoff/
    README.md                         # índice de handoff de diseño
    logo-netiza-dark.svg / -light.svg
    img/                              # 7 fotos reales (referencia; optimizadas → public/)
  reference/
    site-index.html / site-styles.css # copy real + SEO baseline
```

## Orden de lectura para arrancar
1. `docs/planes/PLAN-UNICO-WEB.md` — qué se construye y las decisiones ya tomadas.
2. `design-handoff/README.md` — diseño + assets.
3. `docs/design-spec-penpot-netiza.md` — el detalle.
