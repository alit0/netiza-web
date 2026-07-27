# Implementación — puntaje, resultado y captura (Grok)

**Fecha:** 2026-07-26  
**Agente:** Grok  
**Spec de modelo:** `docs/DIAGNOSTICO-PREGUNTAS-FINAL.md`  
**Estado:** motor + pantalla de resultado + FormSubmit listos; **quiz UI de Kilo aún no existe en el repo** al momento de implementar.

---

## Plan ejecutado

1. Leer FINAL + intentar UI Kilo + briefing.  
2. Implementar `scoreDiagnostico` puro (proyección cerrada ≤2/≤4/≤7/≥8).  
3. Pantalla de resultado con copy exacto + bonus A/B + FormSubmit AJAX.  
4. Cuatro invariantes en script Node.  
5. `npm run build`.  
6. Documentar schema POST (Codex analytics aún no entregó archivo).

---

## 1. Archivos tocados

| Archivo | Rol |
|---|---|
| `src/lib/diagnosticoScore.ts` | Cálculo puro: proyección, overall, semáforo, áreas rojas, resolución de copy |
| `src/components/diagnostico/DiagnosticoResultado.astro` | UI resultado + formulario lead + POST |
| `src/pages/diagnostico.astro` | Ruta `/diagnostico`; slot `#diagnostico-quiz` para Kilo; monta resultado |
| `scripts/verify-diagnostico-score.ts` | Cuatro casos de invariante (sin deps nuevas) |
| `docs/research/impl-diagnostico-scoring-grok.md` | Este reporte |

**No tocados (restricción):** `Contacto.astro`, `index.astro`, secciones home, `src/data/diagnostico.ts` (no existía).

**Ausentes al arrancar (bloqueo parcial):**

- `docs/research/impl-diagnostico-ui-kilo.md`
- `src/data/diagnostico.ts`
- `docs/research/impl-analytics-codex.md`
- PDF estático de la guía

---

## 2. Casos de prueba — salida real

Comando:

```bash
node --experimental-strip-types scripts/verify-diagnostico-score.ts
```

### Proyección (spot checks)

| raw | → dim | Esperado |
|---|---|---|
| 0 | 0 | OK |
| 2 | 0 | OK |
| 3 | 33 | OK |
| 4 | 33 | OK |
| **5** | **67** | OK (corrección vs draft Grok viejo que mandaba 5→33) |
| 7 | 67 | OK |
| 8 | 100 | OK |
| 9 | 100 | OK |

### Casos mandatorios

#### a) Todo en 3

- answers: doce × `3`
- dims: `[100, 100, 100, 100]`
- **overall = 100**, **traffic = verde**, **reds = 0**

#### b) Todo en 0

- answers: doce × `0`
- dims: `[0, 0, 0, 0]`
- **overall = 0**, **traffic = rojo**, **reds = 4** (`encuentran, entienden, escriben, eligen`)

#### c) Tres dimensiones crudo 9 + una crudo 0

- answers: nueve × `3` + tres × `0` (rompe solo “Te siguen eligiendo”)
- dims: `[100, 100, 100, 0]`
- **overall = 75**, **traffic = verde**, **reds = 1** (`eligen`)
- **Invariante obligatorio cumplido:** verde general + un flanco rojo.

#### d) Todas las dimensiones en crudo 5

- answers: patrón `2,2,1` × 4 dims → raw 5 cada una
- dims: `[67, 67, 67, 67]`
- **overall = 67**, **traffic = amarillo**, **reds = 0**
- Si esto diera rojo, la proyección estaría mal. **No da rojo.**

```
ALL CHECKS PASSED
```

---

## 3. Esquema de campos del POST

`docs/research/impl-analytics-codex.md` **no existía**. Schema propuesto por Grok (FormSubmit table).  
**No se reproduce el alias hasheado del endpoint en este reporte.**

### Controles FormSubmit (igual patrón que Contacto)

| Campo | Valor |
|---|---|
| `_honey` | honeypot vacío |
| `_subject` | `Diagnóstico digital — {nombre}` |
| `_template` | `table` |
| `_captcha` | `false` |

### Lead

| Campo | Contenido |
|---|---|
| `nombre` | texto |
| `email` | email (validación `local@domain.tld` con TLD ≥2) |

### Bonus (sin puntaje) — labels exactos del FINAL

| Campo | Contenido |
|---|---|
| `bonus_a` | texto de la opción elegida (A) |
| `bonus_b` | texto de la opción elegida (B) |

### Respuestas crudas P1–P12

| Campo | Contenido |
|---|---|
| `p1` … `p12` | entero `0`–`3` |

### Dimensiones y general

| Campo | Contenido |
|---|---|
| `dim_encuentran_raw` | 0–9 |
| `dim_encuentran` | 0 \| 33 \| 67 \| 100 |
| `dim_entienden_raw` | 0–9 |
| `dim_entienden` | 0 \| 33 \| 67 \| 100 |
| `dim_escriben_raw` | 0–9 |
| `dim_escriben` | 0 \| 33 \| 67 \| 100 |
| `dim_eligen_raw` | 0–9 |
| `dim_eligen` | 0 \| 33 \| 67 \| 100 |
| `overall` | promedio de las 4 dims |
| `traffic` | `rojo` \| `amarillo` \| `verde` |
| `red_areas` | ids CSV o `none` (ej. `eligen` o `encuentran,escriben`) |

### Eventos DOM (para analytics Codex)

| Evento | Cuándo |
|---|---|
| `diagnostico:complete` | (emitido por Kilo) → Grok escucha y pinta resultado |
| `diagnostico:lead` | tras `success: true` del POST; detail: `{ overall, traffic, red_areas }` |

GA4 `diagnostico_start` / `diagnostico_complete` / `diagnostico_lead` **no** se cablearon acá (lane Codex / Analytics).

### Enganche del quiz (contrato para Kilo)

```js
// Opción 1
window.__netizaDiagnostico.showResult([/* 12 enteros 0..3 en orden P1..P12 */]);

// Opción 2
document.dispatchEvent(
  new CustomEvent('diagnostico:complete', { detail: { answers: [/* 12 */] } }),
);
```

Montar el quiz en `#diagnostico-quiz` dentro de `src/pages/diagnostico.astro`.

---

## 4. Salida de `npm run build`

```
> netiza-web@0.0.1 build
> astro build

[build] output: "static"
 generating static routes
   ├─ /diagnostico/index.html
   ├─ /index.html
[build] 2 page(s) built
[build] Complete!
```

**Exit code: 0.** Compila limpio.

Nota: un primer intento falló con `Cannot read properties of undefined (reading 'setInternals')` en el prerenderer de Astro (estado intermedio del optimizador Vite). Rebuild estable posterior: OK.

---

## 5. Riesgos

| Riesgo | Severidad | Nota |
|---|---|---|
| **Quiz de Kilo no landed** | Alta | La página muestra un placeholder en `#diagnostico-quiz`. Sin `showResult` / `diagnostico:complete` el usuario no ve el resultado. |
| **PDF guía ausente** | Alta | Link post-success apunta a `/assets/diagnostico-guia.pdf` (aún no hay archivo en `public/`). |
| **Bonus hardcodeados en Resultado** | Media | FINAL exige datos desde `diagnostico.ts` (Kilo). Textos se copiaron del FINAL para no bloquear el POST; al aterrizar Kilo, preferir import y borrar duplicado. |
| **Schema POST provisional** | Media | Si Codex define otros nombres, hay que alinear una sola vez. |
| **Copy “mejorar” con 0 áreas rojas** | Baja | Con overall 100 no hay rojas; se rellenan los dos slots con las dos dimensiones “más débiles” (todas 100) para no romper la frase exacta del FINAL. |
| **Analytics GA4** | Media | Solo se emite `diagnostico:lead` en DOM; falta cableado a `Analytics.astro`. |
| **FormSubmit sin autoresponse** | Info | Confirmado: PDF se revela en pantalla tras success; sin `_autoresponse`. |

---

## 6. Modelo implementado (cerrado — no re-discutido)

```
opción: 0|1|2|3
dim_raw: suma 3 preguntas → 0..9
dim: ≤2→0 · ≤4→33 · ≤7→67 · ≥8→100
overall: promedio simple de 4 dims
traffic: <42 rojo · <75 amarillo · ≥75 verde
área roja: dim ≤ 33 (independiente del general)
```

---

## Cierre

### Resumen ejecutivo

Motor de puntaje puro con proyección corregida (raw 5 → 67), cuatro invariantes en verde, pantalla de resultado con copy del FINAL, bonus A/B en el mismo form, FormSubmit AJAX como Contacto, PDF post-success. Build limpio. Falta el cuestionario de Kilo y el PDF estático para cerrar el flujo E2E.

### Pendientes

1. Kilo: `src/data/diagnostico.ts` + UI 12 pasos + llamar `showResult` / `diagnostico:complete`.  
2. Subir PDF a `public/assets/diagnostico-guia.pdf` (o URL definitiva).  
3. Codex: schema POST canónico + eventos GA4 en `Analytics.astro`.  
4. Opcional: importar bonus desde `diagnostico.ts` cuando exista (sin cambiar contrato de scoring).  
5. Puentes home → `/diagnostico` (otro lane; no tocado).

### Engram

Guardado desde `C:\Users\Ale\Proyectos\netiza-web`:

- Decisión: implementación scoring + schema POST + contrato de enganche Kilo.
- Decisión: proyección FINAL (≤4→33, raw 5→67) y cuatro invariantes verificados.

---

*Fin reporte Grok — impl scoring/resultado/captura.*
