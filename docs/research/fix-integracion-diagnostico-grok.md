# Fix de integración — /diagnostico (Grok)

**Fecha:** 2026-07-26  
**Motivo:** auditoría `auditoria-diagnostico-opencode.md` → **NO PUBLICABLE** por 3 bloqueantes de plomería entre Cuestionario, Resultado y Analytics.  
**Contrato canónico:** runtime en `window` + POST de `impl-analytics-codex.md`.

---

## Plan ejecutado

1. Leer auditoría, FINAL y schema Codex.  
2. Unificar evento `netiza:diagnostico_complete` con `detail.respuestas` (id, dimension, puntos, **texto**).  
3. Cuestionario: start en primera respuesta, complete canónico, **sin gtag directo**.  
4. Resultado: escuchar en `window`, score desde respuestas, POST con texto literal y orden Codex.  
5. Lead: `netiza:diagnostico_lead` en `window` tras `success: true`.  
6. Verificar invariantes, payload real, build.  

### Riesgos vistos

| Riesgo | Mitigación |
|---|---|
| Analytics escucha en `document`, el contrato de handoff en `window` | Handoff con `detail` solo en `window`; espejo **sin detail** en `document` para el tracker (Analytics intocable) |
| Orden P5/P4 en POST vs numérico | Mapa `POST_ANSWER_ORDER` del schema Codex (pantalla) |
| Doble id `diagnostico-resultado` | Eliminado el div vacío del Cuestionario |

---

## 1. Archivos tocados

| Archivo | Cambio |
|---|---|
| `src/components/diagnostico/Cuestionario.astro` | `emitNetiza`; `netiza:diagnostico_start` en **primera respuesta**; `netiza:diagnostico_complete` con 12 ítems P1..P12 + `texto` literal; **eliminados** `gtag` directos; removido div `#diagnostico-resultado` fantasma |
| `src/components/diagnostico/DiagnosticoResultado.astro` | Listener `window` → `netiza:diagnostico_complete` / `detail.respuestas`; `scoreFromRespuestas`; POST vía `buildInboxFields` (texto + orden Codex); `netiza:diagnostico_lead` tras success; bonus desde `preguntasBonus` de `diagnostico.ts` |
| `src/lib/diagnosticoScore.ts` | +`scoreFromRespuestas`, +`buildInboxFields`, +mapa POST P5→11 / P4→12 (**modelo de puntaje intacto**) |
| `src/pages/diagnostico.astro` | Monta `Cuestionario` + `DiagnosticoResultado` (ya no hay placeholder) |
| `scripts/verify-diagnostico-integration.ts` | Evidencia de invariantes + payload + forma del contrato |
| `docs/research/fix-integracion-diagnostico-grok.md` | Este reporte |

### No tocados (a propósito)

| Archivo | Por qué |
|---|---|
| `src/components/Analytics.astro` | Restricción explícita; el tracker ya mapea los tres `netiza:*` |
| `Contacto.astro`, `index.astro`, secciones home | Fuera de alcance |
| Textos de preguntas/opciones/copy de resultado | Auditoría: fidelidad 100%; no se reescribió contenido |
| Modelo de puntaje (proyección ≤2/≤4/≤7/≥8, cortes 42/75, roja ≤33) | Cerrado y ya verificado |

---

## 2. Verificaciones (evidencia real)

Comandos:

```bash
node --experimental-strip-types scripts/verify-diagnostico-score.ts
node --experimental-strip-types scripts/verify-diagnostico-integration.ts
npm run build
```

### 4a) El evento cruza: cuestionario → resultado

**Emisor** (`Cuestionario.astro`):

```text
emitNetiza('netiza:diagnostico_complete', { respuestas: respuestasOrdenadas });
// → window.dispatchEvent(new CustomEvent(name, { detail }))
```

Cada ítem: `{ id: 'p1'..'p12', dimension, puntos, texto }` con `texto` copiado de `opciones[].texto` en `diagnostico.ts`, orden **P1..P12** (no orden de pantalla).

**Receptor** (`DiagnosticoResultado.astro`):

```text
window.addEventListener('netiza:diagnostico_complete', handleComplete);
// handleComplete → scoreFromRespuestas(respuestas) → renderResult (root.hidden = false)
```

**Página:** ambos componentes montados en `src/pages/diagnostico.astro` (`<Cuestionario />` + `<DiagnosticoResultado />`).

**Forma del detail verificada en script:**

```text
OK  detail.respuestas length 12
OK  each item has id dimension puntos texto
OK  ordered p1..p12
```

Contrato viejo roto (`diagnostico:complete` + `answers: number[]` vs `respuestas` sin `texto`) **eliminado**.

### 4b) Cuatro casos de puntaje (modelo intacto)

Salida real de `verify-diagnostico-score.ts` + integración:

| Caso | overall | traffic | rojas | Resultado |
|---|---|---|---|---|
| a) todo 3 | 100 | verde | 0 | OK |
| b) todo 0 | 0 | rojo | 4 | OK |
| c) tres dims crudo 9 + una 0 | **75** | **verde** | **1 (`eligen`)** | OK — invariante verde + flanco rojo |
| d) dims crudo 5 | **67** | **amarillo** | 0 | OK — raw 5 no es rojo |

```text
ALL CHECKS PASSED
OK  parity  (scoreFromRespuestas ≡ scoreDiagnostico)
```

### 4c) POST con texto literal — payload real de una corrida

Fixture: 12 respuestas en 0, nombre `María López`, email `maria@example.com`, bonus “no”.  
**Endpoint de FormSubmit redactado** (no se imprime).

```text
_subject=Nuevo diagnóstico de presencia digital — Netiza
_template=table
00_area_prioritaria=¿Te encuentran? + ¿Te entienden? + ¿Te escriben? + ¿Te siguen eligiendo? — 0/100 — ROJO
01_puntaje_general=0/100 — ROJO
02_puntaje_te_encuentran=0/100 — ROJO
03_puntaje_te_entienden=0/100 — ROJO
04_puntaje_te_escriben=0/100 — ROJO
05_puntaje_te_siguen_eligiendo=0/100 — ROJO
06_nombre=María López
email=maria@example.com
08_ficha_google=No aparece ninguna ficha del negocio, o no estoy seguro de tener una
09_busqueda_rubro_ciudad=No aparezco por ningún lado
10_horarios_disponibilidad=No tengo horarios cargados, o no sé qué dice la ficha
11_rubro_y_zona_primera_vista=No tengo dónde mirar eso
12_contenido_escrito=No: lo que hay son fotos en Instagram o Facebook, sin explicación escrita
13_organizacion_oferta=No está explicado en ningún lado
14_contacto_uno_dos_toques=No hay una forma clara de contactarme desde ahí
15_velocidad_datos_moviles=No tengo web, o tarda más de 6 segundos, o queda la pantalla en blanco un rato largo
16_responsable_y_tiempo_respuesta=Nadie los mira con regularidad
17_cantidad_resenas_google=Ninguna, o no sé
18_promedio_estrellas_google=No tengo reseñas
19_frescura_y_respuesta_resenas=No tengo reseñas, o no las miro nunca
20_origen_consultas_ultimos_30_dias=No, o no me doy cuenta de dónde vienen
21_visibilidad_en_ia=No me nombra
```

Checks del script:

```text
OK  00_area_prioritaria is first summary
OK  08 is literal text not number
OK  11 is P5 rubro/zona text
OK  12 is P4 contenido escrito text
OK  no bare p1 field
OK  12 answer fields are literal text
```

No viajan `p1=0`, `dim_*_raw`, ni códigos de opción.

### 4d) Tres eventos `netiza:*` y el tracker de Analytics

| Hito | Quién despacha | Dónde (detail) | Tracker |
|---|---|---|---|
| `netiza:diagnostico_start` | Cuestionario, **primera respuesta** | `window` (+ espejo `document` sin detail) | `Analytics.astro` escucha `document` → GA4 `diagnostico_start` + Meta `DiagnosticoStart` |
| `netiza:diagnostico_complete` | Cuestionario al terminar P12 | `window` **con** `detail.respuestas`; espejo `document` sin detail | → GA4 `diagnostico_complete` + Meta `DiagnosticoComplete` |
| `netiza:diagnostico_lead` | Resultado tras FormSubmit `success: true` | `window` + espejo `document` sin detail | → GA4 `diagnostico_lead` + Meta `DiagnosticoLead` |

**Evidencia de código (sin gtag en UI):**

```text
Cuestionario.astro — gtag: 0 matches
DiagnosticoResultado.astro — gtag: 0 matches
emitNetiza / netiza:diagnostico_*: presentes
Analytics.astro — document.addEventListener for the three netiza:* names (untouched)
```

**Nota de plomería (no es renegociación del contrato de handoff):** un evento disparado solo en `window` **no** llega a listeners de `document`. El handoff con PII/`texto` vive en `window` como exige el contrato. El espejo en `document` es **solo el nombre del hito**, sin `detail`, para que el tracker delegado (intocable) dispare GA4/Meta sin PII — alineado a “Analytics no lee detail”.

---

## 3. Salida de `npm run build`

```text
> netiza-web@0.0.1 build
> astro build

[build] output: "static"
 generating static routes
   ├─ /diagnostico/index.html
   ├─ /index.html
[build] 2 page(s) built in 893ms
[build] Complete!
```

**Exit code: 0.**

---

## 4. Lo que decidí no tocar y por qué

1. **Analytics.astro** — restricción de tarea; ya implementa el mapa correcto.  
2. **Textos de preguntas/opciones/copy** — la auditoría los dio por fieles; este fix es plomería.  
3. **Proyección y cortes del puntaje** — cerrados; solo cambió de dónde salen los puntos (`respuestas[].puntos`).  
4. **Home / Contacto** — fuera de scope.  
5. **No se reabrió el debate “window vs document” para el detail** — el handoff es `window` + `respuestas`; el espejo document es un adaptador hacia un listener ya existente, sin PII.

---

## Cierre

### Resumen ejecutivo

Los tres bloqueantes de la auditoría quedan cerrados: el complete unifica emisor/receptor en `window` con `texto` literal, el POST sigue el schema Codex (área prioritaria primero, 12 textos, sin códigos), y los tres `netiza:*` alimentan el tracker delegado sin gtag en la UI. El modelo de puntaje no se tocó; los cuatro invariantes siguen en verde. Build limpio.

### Pendientes

- Re-auditoría independiente (Opencode u otro) del flujo E2E en browser real.  
- PDF en `/assets/diagnostico-guia.pdf` si aún no está en `public/`.  
- Validar copy de opciones con 2–3 dueños de pyme (pendiente de producto).  
- Smoke manual: DevTools → confirmar un solo fire por hito en Network/gtag debug.

### Engram

Desde `C:\Users\Ale\Proyectos\netiza-web`:

- Decisión: contrato runtime `netiza:diagnostico_*` en window + espejo document sin detail; POST literal Codex; scoreFromRespuestas.

---

*Fin fix integración Grok.*
