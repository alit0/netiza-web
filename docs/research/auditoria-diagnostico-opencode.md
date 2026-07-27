# Auditoría de implementación — /diagnostico (Opencode)

**Fecha:** 2026-07-26  
**Auditor:** gentle-orchestrator (3 subagentes en paralelo)  
**Especificación auditada:** `docs/DIAGNOSTICO-PREGUNTAS-FINAL.md` + `docs/BRIEFING-DIAGNOSTICO.md`  
**Implementaciones auditadas:** `impl-diagnostico-ui-kilo.md`, `impl-diagnostico-scoring-grok.md`, `impl-analytics-codex.md`

---

## Frente 1 — Fidelidad a la especificación

**Auditor:** developed-bronze-rooster

### Hallazgos

- Las 12 preguntas, sus opciones y puntajes coinciden **carácter por carácter** con la especificación.
- P12 tiene exactamente 5 opciones sobre 4 niveles de puntaje (0, 1, 1, 2, 3) tal como exige la excepción declarada.
- El micro-copy obligatorio de P2 está presente y textual.
- El copy de la pantalla de resultado (título, cuerpo, "Esto no es una nota…", línea de contacto personal **antes** del mail, CTA) es fiel.
- Las dos preguntas sin puntaje (A y B) están presentes en la pantalla de resultado y no suman al puntaje.
- El modelo de puntaje (proyección, semáforo, promedio) es idéntico al especificado.
- Los nombres de los tres eventos GA4 coinciden con la especificación.

### Desviación encontrada

```
[Cuestionario.astro:411] DEVIATION — expected: CustomEvent('diagnostico:complete', { detail: { answers: [number, ..., number] } }) | found: CustomEvent('diagnostico:complete', { detail: { respuestas: [{id, dimension, puntos}, ...] } })
```

**Impacto:** CRÍTICO. El handler en `DiagnosticoResultado.astro:526` espera `event.detail.answers` (array de 12 números). Recibe `event.detail.respuestas` (array de objetos). La pantalla de resultado nunca se renderiza. El flujo completo está roto.

### Resumen del frente

| Métrica | Valor |
|---------|-------|
| Preguntas y opciones fieles | 12/12 |
| Micro-copy P2 | Presente y exacto |
| Copy pantalla de resultado | Fiel (incluye contacto personal antes del mail) |
| Preguntas bonus A/B | Presentes, no puntúan |
| Modelo de puntaje | Fiel |
| Desviaciones totales | 1 (crítica) |

---

## Frente 2 — Matemática y comportamiento

**Auditor:** communist-teal-weasel

### Recálculo de los cuatro casos mandatorios

| Caso | Resultado | Verificado |
|------|-----------|------------|
| a) Todo en 3 → overall 100, verde, 0 rojas | PASS | ✓ |
| b) Todo en 0 → overall 0, rojo, 4 rojas | PASS | ✓ |
| c) Tres dims crudo 9 + una crudo 0 → overall 75, verde, 1 roja (`eligen`) | PASS | ✓ |
| d) Cuatro dims crudo 5 → overall 67, amarillo, 0 rojas | PASS | ✓ |

### Invariantes críticos

- **Invariante 1 (verde general + flanco rojo):** Cumplido en caso c). El promedio de scores proyectados (no de crudos) es correcto.
- **Invariante 2 (raw 5 no es rojo):** Cumplido. raw 5 → 67; cuatro dimensiones en 67 → overall 67 → amarillo.

### Búsqueda de path a verde sin hechos

No existe. Verde requiere overall ≥ 75 → las cuatro dimensiones deben sumar ≥ 300. Cada dimensión 100 exige raw ≥ 8. No hay combinación de respuestas bajas (0, 1) que produzca verde.

### Preguntas A y B

No afectan el score. `scoreDiagnostico` recibe solo las 12 respuestas crudas. Los radios de bonus solo se leen al construir el FormData del POST.

### Resumen del frente

| Check | Resultado |
|-------|-----------|
| Cuatro casos mandatorios | PASS |
| Invariante verde + flanco rojo | PASS |
| Invariante raw 5 → amarillo | PASS |
| Path a verde sin hechos | No existe |
| A y B no afectan score | PASS |

**No se encontraron defectos bloqueantes ni no bloqueantes en el scoring.** La implementación respeta la especificación al 100%.

---

## Frente 3 — Accesibilidad, mobile y datos

**Auditor:** honest-aquamarine-tarsier

### Bloqueantes (3)

1. **`Cuestionario.astro:336-340` / `Cuestionario.astro:405-408`**  
   Los eventos GA4 se disparan vía `gtag()` directo, ignorando el contrato delegado de `Analytics.astro`.  
   - `diagnostico_start` se dispara una sola vez (solo por gtag directo).  
   - `diagnostico_complete` se dispara dos veces (gtag directo + listener de Analytics con nombre incorrecto).  
   - `diagnostico_lead` jamás llega a Analytics (usa `diagnostico:lead` en vez de `netiza:diagnostico_lead`).  
   **Tres eventos, tres rotos.**

2. **`DiagnosticoResultado.astro:525-532`**  
   El listener `diagnostico:complete` espera `event.detail.answers` (array de 12 números), pero `Cuestionario.astro` emite `event.detail.respuestas` (array de objetos).  
   **Mismo contrato roto que el Frente 1.** La pantalla de resultado nunca se muestra.

3. **`DiagnosticoResultado.astro:462-477`**  
   El POST envía `p1`…`p12` (enteros 0-3), `dim_*_raw`, `dim_*`, `overall`, `traffic`, `red_areas`.  
   El contrato de Codex exige `00_area_prioritaria`, `01_puntaje_general`, …, `21_visibilidad_en_ia` con **texto literal** de las opciones.  
   El inbox recibe números crudos en vez de texto legible. El mail de las 48-72 horas es imposible de escribir.

### Mayores (4)

4. Falta `firstInvalid?.focus()` tras validación fallida del formulario de mail (patrón presente en `Contacto.astro`).
5. `overall` no se redondea con `Math.round` antes del POST (contrato exige redondeo).
6. Auto-avance de 350 ms ignora `prefers-reduced-motion`.
7. `<legend>` con `sr-only` sin respaldo `aria-live` robusto para cambio de pantalla.

### Menores (5)

8. `scrollIntoView({ behavior: 'smooth' })` sin verificar `prefers-reduced-motion`.
9. Bloque `prefers-reduced-motion` solo cubre la barra de progreso; transiciones de opciones persisten.
10. Dos elementos con `id="diagnostico-resultado"` (choque de ID, aunque hoy no hay conflicto en producción).
11. Badge de traffic (`rojo`/`amarillo`/`verde`) sin `aria-label` contextual para lectores de pantalla.
12. Botón PDF sin `aria-label` descriptiva para screen readers.

### Resumen del frente

| Área | Estado |
|------|--------|
| Keyboard navigation | Parcial (falta focus post-error) |
| aria-live / role="alert" | Presente pero pendiente verificación NVDA |
| prefers-reduced-motion | Parcial (CSS + JS inconsistente) |
| POST envía 12 crudas + 2 bonus | Envía pero como códigos numéricos, no texto literal |
| GA4 events | Tres eventos rotos |
| PDF tras success + sin _autoresponse | Correcto |

---

## Veredicto final

**NO PUBLICABLE**

### Bloqueantes ordenados por gravedad

1. **Contrato de evento roto entre Cuestionario y Resultado** (`respuestas` vs `answers`, objetos vs números) — la pantalla de resultado nunca se renderiza. (Frentes 1 y 3)
2. **Esquema de POST completamente equivocado** — envía códigos numéricos en vez de texto literal de las opciones. El mail de seguimiento de 48-72 horas es imposible de escribir. (Frente 3)
3. **Tres eventos GA4 rotos** — `diagnostico_start`, `diagnostico_complete` y `diagnostico_lead` no se disparan (o se disparan dos veces) según el contrato delegado de `Analytics.astro`. (Frente 3)

### Resumen ejecutivo (máx. 5 líneas)

La especificación textual (preguntas, opciones, copy, modelo de puntaje) fue implementada con fidelidad excepcional. Sin embargo, tres defectos de integración entre los tres componentes desarrollados en paralelo rompen el flujo completo: el resultado nunca se muestra, el POST envía datos inutilizables para el mail de seguimiento, y los tres eventos de analítica están rotos. El sistema no puede publicarse en este estado.

---

## Pendientes

- Validar con NVDA / VoiceOver los patrones de `aria-live` y foco post-error.
- Unificar el contrato de evento (`answers` numérico vs `respuestas` de objetos) antes de re-integrar.
- Alinear el schema del POST con el contrato de Codex (texto literal, campos numerados, redondeo de overall).
- Verificar viewport 360 px sin scroll horizontal (no fue ejecutable en esta auditoría sin render real).

---

## Memoria guardada en engram

Se ejecutó `mem_save` con:

- **title:** Veredicto de auditoría — /diagnostico Netiza 2026-07-26
- **type:** decision
- **scope:** project
- **topic_key:** diagnostico/auditoria-implementacion
- **content:**
  **What:** La implementación del diagnóstico tiene tres defectos bloqueantes de integración entre los tres componentes desarrollados en paralelo: contrato de evento roto (respuestas vs answers), schema de POST equivocado (números en vez de texto literal), y tres eventos GA4 rotos.
  **Why:** Tres agentes implementaron UI, scoring y analítica sin coordinación. El resultado es un sistema que no puede publicarse: el resultado nunca se muestra, el mail de seguimiento es imposible de escribir, y la analítica no funciona.
  **Where:** docs/research/auditoria-diagnostico-opencode.md + los tres reportes de implementación.
  **Learned:** La fidelidad textual del contenido es excelente, pero la integración de componentes desarrollados en paralelo sin contrato explícito de eventos y payload es el punto de falla estructural.

---

*Auditoría realizada por gentle-orchestrator con tres subagentes. Ningún archivo del repo fue modificado.*