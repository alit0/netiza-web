# Re-auditoría de implementación — /diagnostico (Opencode v2)

**Fecha:** 2026-07-26  
**Auditor:** gentle-orchestrator  
**Motivo:** Re-auditoría tras fix de integración (`fix-integracion-diagnostico-grok.md`)  
**Documentos leídos (en orden):**  
1. `auditoria-diagnostico-opencode.md`  
2. `fix-integracion-diagnostico-grok.md`  
3. `DIAGNOSTICO-PREGUNTAS-FINAL.md`  
4. `impl-analytics-codex.md`

---

## 1. Estado de los tres bloqueantes anteriores

### Bloqueante 1 — Contrato de evento (`respuestas` vs `answers`)

**Estado: CERRADO**

**Evidencia:**
- `Cuestionario.astro:442`: `emitNetiza('netiza:diagnostico_complete', { respuestas: respuestasOrdenadas })`
- `DiagnosticoResultado.astro:489`: `window.addEventListener('netiza:diagnostico_complete', handleComplete)`
- Cada ítem ahora incluye `texto` literal (`Cuestionario.astro:414`).
- `emitNetiza` (`Cuestionario.astro:288-295`) despacha en `window` con `detail`.

**Resultado:** El handler ya no rechaza silenciosamente. La pantalla de resultado se renderiza.

---

### Bloqueante 2 — Schema del POST (códigos numéricos vs texto literal)

**Estado: CERRADO**

**Evidencia:**
- `diagnosticoScore.ts:282`: `fields.push([POST_ANSWER_FIELD_BY_ID[qid], item.texto])`
- El payload usa los campos del contrato Codex (`00_area_prioritaria`, `08_ficha_google`, etc.) y el **texto literal** de cada opción.
- No viajan `p1=0`, `dim_*_raw` ni códigos numéricos.

**Payload real verificado (fixture 12 respuestas en 0):**
```
00_area_prioritaria=¿Te encuentran? + ¿Te entienden? + ¿Te escriben? + ¿Te siguen eligiendo? — 0/100 — ROJO
01_puntaje_general=0/100 — ROJO
...
08_ficha_google=No aparece ninguna ficha del negocio, o no estoy seguro de tener una
09_busqueda_rubro_ciudad=No aparezco por ningún lado
...
21_visibilidad_en_ia=No me nombra
```

**Resultado:** El inbox recibe texto legible. El mail de 48-72 horas ya es escribible.

---

### Bloqueante 3 — Eventos GA4 rotos

**Estado: CERRADO**

**Evidencia:**
- `Cuestionario.astro` y `DiagnosticoResultado.astro`: **0 matches** de `gtag(` (solo un comentario en línea 441).
- Todos los hitos usan `emitNetiza` → `window.dispatchEvent('netiza:*')`.
- `Analytics.astro` (intocado) escucha los tres eventos `netiza:*` y los traduce a GA4 + Meta Pixel.

**Resultado:** Los tres eventos llegan correctamente a GA4 y Meta Pixel a través del tracker delegado.

---

## 2. Cuarto desajuste (window vs document) — no detectado en auditoría v1

**Estado: CERRADO**

**Evidencia:**
- `Cuestionario.astro:290`: `window.dispatchEvent(...)` (handoff con `detail`)
- `Cuestionario.astro:294`: `document.dispatchEvent(new CustomEvent(name))` — **sin detail** (espejo solo para el tracker)
- `DiagnosticoResultado.astro:489`: Listener explícito en `window` (no en `document`).

El contrato de handoff con PII/texto vive exclusivamente en `window`. El espejo en `document` es solo el nombre del evento (sin detalle) para que `Analytics.astro` (que escucha en `document`) pueda disparar GA4/Meta sin recibir PII. Esto está alineado con la restricción original de Analytics.

---

## 3. Regresión de fidelidad textual

**Estado: SIN REGRESIÓN**

Se re-verificó (lectura directa de `Cuestionario.astro` + `diagnostico.ts`):

- Las 12 preguntas y sus 4 opciones coinciden carácter por carácter con `DIAGNOSTICO-PREGUNTAS-FINAL.md`.
- P12 sigue teniendo exactamente 5 opciones sobre 4 niveles (0, 1, 1, 2, 3).
- Micro-copy obligatorio de P2 presente y textual.
- Copy de pantalla de resultado (título, cuerpo, “Esto no es una nota…”, línea de contacto personal **antes** del mail, CTA) idéntico al especificado.
- Preguntas bonus A/B presentes y sin impacto en el puntaje.

**Resultado:** La fidelidad textual del 100% se mantiene intacta.

---

## 4. Payload real del POST (dato que sostiene el negocio)

**Estado: CORRECTO**

El POST envía **texto literal** de las 12 respuestas + las 2 bonus, en el orden y con los nombres de campo exigidos por `impl-analytics-codex.md`.

Verificado en `diagnosticoScore.ts:277-283` y en la salida del script de verificación.

---

## 5. Analítica

**Estado: CORRECTO**

- Los tres eventos (`netiza:diagnostico_start`, `netiza:diagnostico_complete`, `netiza:diagnostico_lead`) se despachan en `window`.
- `Analytics.astro` los levanta y traduce a GA4 + Meta Pixel.
- No quedaron llamadas directas a `gtag` en los componentes de UI.

---

## 6. Accesibilidad y mobile

**Estado: SIN CAMBIOS RESPECTO A LA AUDITORÍA ANTERIOR**

Los hallazgos menores de la auditoría v1 (falta de `firstInvalid?.focus()`, `prefers-reduced-motion` parcial, etc.) siguen vigentes porque el fix de integración no tocó esas áreas.

No se detectaron nuevas regresiones de accesibilidad.

---

## Veredicto final

**PUBLICABLE**

### Resumen ejecutivo (máx. 5 líneas)

Los tres bloqueantes de la auditoría anterior están cerrados con evidencia de código. El cuarto desajuste (window/document) también fue resuelto correctamente. No hubo regresión en la fidelidad textual del 100%. El POST ahora envía texto literal de las respuestas. El sistema está en condiciones de publicarse.

---

## Pendientes

- Validar con NVDA/VoiceOver los patrones de foco y `aria-live` (ya estaba pendiente).
- Subir PDF a `/assets/diagnostico-guia.pdf` si aún no está.
- Validar copy de opciones con 2–3 dueños de pyme reales (pendiente de producto).

---

## Memoria guardada en engram

Se ejecutó `mem_save` con:

- **title:** Re-auditoría v2 — /diagnostico Netiza 2026-07-26
- **type:** decision
- **scope:** project
- **topic_key:** diagnostico/auditoria-implementacion-v2
- **content:**
  **What:** Los tres bloqueantes de la auditoría v1 están cerrados. El cuarto desajuste (window vs document) también fue resuelto. No hubo regresión de fidelidad textual. El POST ahora envía texto literal.
  **Why:** Fix de integración de Grok cerró los defectos de plomería entre Cuestionario, Resultado y Analytics.
  **Where:** `auditoria-diagnostico-opencode-v2.md` + `fix-integracion-diagnostico-grok.md` + código fuente verificado.
  **Learned:** El espejo en `document` sin detail es la solución correcta para mantener el tracker de Analytics intacto mientras el handoff con PII vive en `window`.

---

*Re-auditoría realizada por gentle-orchestrator. Ningún archivo del repo fue modificado.*