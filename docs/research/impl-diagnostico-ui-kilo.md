# Implementación UI del diagnóstico — Kilo

> Fecha: 2026-07-26 · Build: exitoso, cero errores, cero warnings

---

## 1. Archivos creados

| Archivo | Rol |
|---|---|
| `src/data/diagnostico.ts` | Tipos, 12 preguntas puntuadas + 2 bonus sin puntaje. Fuente única de verdad del cuestionario. |
| `src/components/diagnostico/Cuestionario.astro` | Componente del cuestionario: state machine, progreso, opciones, navegación, punto de integración. |
| `src/pages/diagnostico.astro` | Página `/diagnostico` que envuelve el cuestionario en `BaseLayout` + `Navbar` + `Footer`. |

**No se modificó ningún archivo existente.**

---

## 2. Punto de integración para el puntaje y resultado

### Evento `diagnostico:complete`

Al completar las 12 preguntas, el componente dispara un `CustomEvent` en `window`:

```ts
// Firma exacta del evento
window.dispatchEvent(
  new CustomEvent('diagnostico:complete', {
    detail: {
      respuestas: Array<{
        id: string;        // "P1" a "P12"
        dimension: string; // "encuentran" | "entienden" | "escriben" | "eligen"
        puntos: number | null; // 0 | 1 | 2 | 3, o null si no se respondió
      }>
    }
  })
);
```

### Contenedor de resultado

El componente expone un `<div id="diagnostico-resultado" hidden>` vacío. Al dispararse el evento, el div pasa a `hidden = false`. El agente que implemente el resultado debe:

1. Escuchar `window.addEventListener('diagnostico:complete', handler)`.
2. Leer `event.detail.respuestas` para obtener los 12 puntajes crudos.
3. Calcular puntajes por dimensión, general y semáforos según el modelo de `DIAGNOSTICO-PREGUNTAS-FINAL.md`.
4. Renderizar el HTML de resultado dentro de `#diagnostico-resultado`.

### Preguntas bonus

Las 2 preguntas bonus (`src/data/diagnostico.ts`, export `preguntasBonus`) están disponibles para el agente de resultado. Van en la pantalla de resultado junto con el formulario de mail, como indica la especificación. No se renderizan en el cuestionario.

---

## 3. Salida de `npm run build`

```
17:54:27 [types] Generated 2.62s
17:54:29 [build] output: "static"
17:54:29 [build] ✓ Completed in 2.76s.
17:54:32 [build] ✓ Completed in 2.53s.
17:54:32 [build] 2 page(s) built in 5.44s
17:54:32 [build] Complete!
```

- `dist/diagnostico/index.html` — generado
- `dist/index.html` — generado (sin cambios)
- `dist/sitemap-index.xml` — incluye ambas rutas

---

## 4. Decisiones de implementación

### State machine

- **Estado en memoria del cliente**: array `respuestas` de 12 posiciones (`number | null`). Sin `localStorage`.
- **Auto-avance con transición**: al seleccionar una opción, la UI marca la selección visualmente y avanza automáticamente a los 350ms. El lock `transitionLock` previene doble-clic.
- **Navegación hacia atrás**: botón "Anterior" y tecla `ArrowLeft` decrementan `currentIndex` y re-renderizan con la respuesta previamente guardada. El foco se mueve a la opción seleccionada.

### Accesibilidad

- **Opciones**: `<button role="radio" aria-checked="true|false">` con indicador visual circular. Teclado: Tab para moverse entre opciones, Enter/Space para seleccionar.
- **Leyenda oculta**: `<legend>` con clase `sr-only` en cada `<fieldset>` — "Seleccioná una opción".
- **Región viva**: `aria-live="polite"` en contador, dimensión y pantalla de pregunta. `role="status"` en el estado de completado.
- **Progressbar**: `role="progressbar"` con `aria-valuenow`, `aria-valuemin`, `aria-valuemax`.
- **Foco**: al re-renderizar, el foco va a la opción previamente seleccionada o a la primera opción. El botón "Anterior" recibe `focus-visible` con el anillo del sistema de diseño.
- **`prefers-reduced-motion`**: la barra de progreso elimina la transición de ancho.

### Tokens de diseño

Se usan exclusivamente variables del sistema (`--space-*`, `--color-*`, `--radius-*`, `--font-size-*`, `--card-bg`, `--kicker-bg`, `--size-touch`, `--border-width`, `--focus-ring-*`). Cero valores mágicos en CSS. La única excepción es `4px` para la altura de la barra de progreso y `20px` para el indicador circular de opción — valores visuales que no tienen token equivalente.

### GA4

- `diagnostico_start`: se dispara una vez en el primer `render()`.
- `diagnostico_complete`: se dispara en `completar()` cuando se responden las 12.
- Ambos usan el patrón de `window.gtag` delegado, igual que `whatsapp_click` en `Analytics.astro`.
- `diagnostico_lead` queda para el agente de resultado (alcance del formulario de mail).

### Orden de pantallas

Tal cual la especificación: P1, P2, P3, P5, P4, P6, P7, P8, P9, P10, P11, P12. P5 antes que P4 dentro de "¿Te entienden?" por ser la más fácil de contestar primero.

### P12: 5 opciones sobre 4 niveles de puntaje

Las opciones 1 y 2 de P12 comparten `puntos: 1`. El tipo `Opcion` acepta cualquier valor `0 | 1 | 2 | 3`, así que no hay violación del contrato. La especificación justifica esta excepción.

---

## 5. Desvíos o dudas sobre la especificación

- **`ayuda` en P2**: el micro-copy obligatorio de P2 se implementó como `ayuda` en el tipo `Pregunta`. La UI lo renderiza como un bloque con fondo `--kicker-bg` debajo de la pregunta, antes de las opciones. Esto es consistente con el tipo definido pero la especificación no prescribe dónde va visualmente.
- **Sin indicador de dimensión en la especificación**: la barra de progreso muestra la dimensión actual ("¿Te encuentran?", etc.) como referencia para el usuario. La especificación no lo pide ni lo prohíbe; se incluyó como ayuda de contexto.
- **Auto-avance vs. botón "Siguiente"**: la especificación menciona navegación adelante y atrás pero no prescribe cómo se avanza. Se optó por auto-avance al seleccionar para reducir fricción en mobile (12 taps en vez de 24). Si en revisión se prefiere un botón explícito, el cambio es mínimo: remover el `setTimeout` y agregar un botón "Siguiente".

---

## Resumen ejecutivo

La página `/diagnostico` compila sin errores con los 3 archivos creados. El cuestionario muestra 12 preguntas una por pantalla con barra de progreso, conserva respuestas al navegar hacia atrás y expone un punto de integración limpio (`CustomEvent` + `#diagnostico-resultado`) para que el agente de puntaje y resultado enganche sin tocar el código del cuestionario.

## Pendientes

- El agente de puntaje/resultado debe implementar el cálculo, la pantalla de resultado, el formulario de mail y el envío a FormSubmit.
- Agregar los puentes desde la home (sección `ElProblema` y `CTAFinal`), con la restricción de que el CTA de WhatsApp siempre aparezca antes.
- Validar el copy con dueños de pyme reales (pendiente de la especificación).

## Guardado en engram

Decisiones de implementación: state machine, punto de integración, tokens usados, excepciones de diseño.
