# Contrato de analítica y POST del diagnóstico

## Decisión

La UI del diagnóstico emite tres `CustomEvent` sin datos personales. `Analytics.astro`
los escucha de forma delegada, los deduplica durante la vida de la página y traduce cada
hito a GA4 y Meta Pixel. El POST envía primero un resumen legible, luego contacto y
finalmente las 14 respuestas completas; nunca envía códigos de opción al inbox.

## 1. Eventos implementados

| Hito de producto | Evento del navegador | GA4 | Meta Pixel |
|---|---|---|---|
| Primera respuesta confirmada | `netiza:diagnostico_start` | `diagnostico_start` | `DiagnosticoStart` |
| El resultado quedó visible | `netiza:diagnostico_complete` | `diagnostico_complete` | `DiagnosticoComplete` |
| FormSubmit confirmó `success: true` | `netiza:diagnostico_lead` | `diagnostico_lead` | `DiagnosticoLead` |

Implementación agregada:

```ts
const diagnosticoEvents = {
  'netiza:diagnostico_start': {
    ga4: 'diagnostico_start',
    meta: 'DiagnosticoStart',
  },
  'netiza:diagnostico_complete': {
    ga4: 'diagnostico_complete',
    meta: 'DiagnosticoComplete',
  },
  'netiza:diagnostico_lead': {
    ga4: 'diagnostico_lead',
    meta: 'DiagnosticoLead',
  },
} as const;

const trackedDiagnosticoEvents = new Set<string>();

Object.entries(diagnosticoEvents).forEach(([browserEvent, analyticsEvent]) => {
  document.addEventListener(browserEvent, () => {
    if (trackedDiagnosticoEvents.has(browserEvent)) return;
    trackedDiagnosticoEvents.add(browserEvent);

    const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
    if (typeof gtag === 'function') gtag('event', analyticsEvent.ga4);

    const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
    if (typeof fbq === 'function') fbq('trackCustom', analyticsEvent.meta);
  });
});
```

La implementación está en `src/components/Analytics.astro`, junto al tracker existente de
WhatsApp. Cada listener:

1. acepta un evento delegado y burbujeante;
2. descarta repeticiones del mismo hito durante la vida de la página;
3. llama a `gtag('event', <evento GA4>)`;
4. llama a `fbq('trackCustom', <evento Meta>)`;
5. ignora deliberadamente `event.detail`.

### Contrato de disparo para la UI

La UI debe emitir desde el elemento que completa el hito:

```ts
element.dispatchEvent(
  new CustomEvent('netiza:diagnostico_start', { bubbles: true }),
);
```

Debe reemplazar el nombre por `netiza:diagnostico_complete` o
`netiza:diagnostico_lead` cuando corresponda. También puede despachar sobre `document`,
sin necesidad de `bubbles`.

Reglas de integración:

- `start`: después de guardar la primera respuesta válida, no al abrir la página.
- `complete`: después de renderizar el puntaje, no al contestar P12.
- `lead`: únicamente después de validar una respuesta AJAX de FormSubmit con
  `success: true`, no al hacer clic en enviar.
- No incluir `detail`: respuestas, nombre, email y puntajes quedan fuera de GA4 y Meta.
- La UI debería emitir cada hito una sola vez; el tracker incluye una segunda defensa
  contra dobles disparos accidentales.

## 2. Contrato completo del POST

### Orden y campos de resumen

Los controles se agregan al `FormData` en este orden. Los prefijos numéricos vuelven
explícita la secuencia de resumen y respuestas; `email` conserva el nombre estándar que
FormSubmit documenta para la dirección del remitente.

| Orden | Campo | Valor exacto o formato |
|---|---|---|
| Sistema | `_subject` | `Nuevo diagnóstico de presencia digital — Netiza` |
| Sistema | `_template` | `table` |
| 1 | `00_area_prioritaria` | `<área o áreas con el mínimo> — <puntaje>/100 — <ROJO o sin área roja>` |
| 2 | `01_puntaje_general` | `<entero redondeado>/100 — <ROJO, AMARILLO o VERDE>` |
| 3 | `02_puntaje_te_encuentran` | `<0, 33, 67 o 100>/100 — <ROJO, AMARILLO o VERDE>` |
| 4 | `03_puntaje_te_entienden` | `<0, 33, 67 o 100>/100 — <ROJO, AMARILLO o VERDE>` |
| 5 | `04_puntaje_te_escriben` | `<0, 33, 67 o 100>/100 — <ROJO, AMARILLO o VERDE>` |
| 6 | `05_puntaje_te_siguen_eligiendo` | `<0, 33, 67 o 100>/100 — <ROJO, AMARILLO o VERDE>` |
| 7 | `06_nombre` | Nombre escrito por la persona |
| 8 | `email` | Email escrito por la persona |

Reglas de cálculo y formato:

- cada dimensión suma sus tres respuestas (`0..9`) y proyecta: `<=2 → 0`,
  `<=4 → 33`, `<=7 → 67`, `>=8 → 100`;
- el promedio general **exacto** es la suma de las cuatro dimensiones dividida por
  cuatro;
- el semáforo general se calcula sobre ese promedio exacto:
  `<42 → ROJO`, `<75 → AMARILLO`, `>=75 → VERDE`;
- `Math.round` se aplica después y sólo al número que se muestra o envía al inbox;
  nunca se usa el entero redondeado para elegir el semáforo;
- semáforo de dimensión: `0/33 → ROJO`, `67 → AMARILLO`, `100 → VERDE`;
- `00_area_prioritaria` enumera todas las dimensiones empatadas en el mínimo, en el
  orden del diagnóstico. Si el mínimo es mayor que 33, termina con `sin área roja`.

Caso frontera obligatorio: `[0, 0, 67, 100]` promedia `41,75`, por lo que el valor
del POST es `42/100 — ROJO`. Clasificar el `42` ya redondeado como amarillo sería un
error.

Ejemplos válidos de `00_area_prioritaria`:

```text
¿Te encuentran? — 0/100 — ROJO
¿Te encuentran? + ¿Te escriben? — 33/100 — ROJO
¿Te entienden? — 67/100 — sin área roja
```

### Respuestas puntuables

El puntaje de la columna central es sólo la entrada del cálculo client-side. **El valor
POST es siempre el texto literal de la última columna.**

#### P1 — Tu ficha de Google

Campo: `08_ficha_google`

| Puntos | Valor POST |
|---:|---|
| 0 | `No aparece ninguna ficha del negocio, o no estoy seguro de tener una` |
| 1 | `Aparece una ficha, pero el rubro que dice no describe bien lo que hago` |
| 2 | `Aparece con el rubro correcto, aunque falten datos (dirección, teléfono o web)` |
| 3 | `Aparece con el rubro correcto, y el nombre, la dirección y el teléfono coinciden con lo real` |

#### P2 — Búsqueda por rubro y ciudad

Campo: `09_busqueda_rubro_ciudad`

| Puntos | Valor POST |
|---:|---|
| 0 | `No aparezco por ningún lado` |
| 1 | `Aparezco, pero hay que bajar bastante para encontrarme` |
| 2 | `Aparezco en la primera pantalla, entre varios` |
| 3 | `Aparezco entre los tres primeros del mapa` |

#### P3 — Horarios y disponibilidad

Campo: `10_horarios_disponibilidad`

| Puntos | Valor POST |
|---:|---|
| 0 | `No tengo horarios cargados, o no sé qué dice la ficha` |
| 1 | `Están cargados, pero al menos un día de esta semana no coincide` |
| 2 | `Coinciden con la semana habitual, aunque no toco feriados ni excepciones` |
| 3 | `Coinciden, y cuando hay feriado o cambio especial lo actualizo en la ficha` |

#### P5 — Rubro y zona en la primera vista

Campo: `11_rubro_y_zona_primera_vista`

| Puntos | Valor POST |
|---:|---|
| 0 | `No tengo dónde mirar eso` |
| 1 | `Solo se ve el nombre del negocio; no dice a qué se dedica` |
| 2 | `Se ve a qué me dedico, pero no la ciudad ni la zona` |
| 3 | `Se leen las dos cosas: a qué me dedico y en qué ciudad o zona` |

#### P4 — Contenido escrito

Campo: `12_contenido_escrito`

| Puntos | Valor POST |
|---:|---|
| 0 | `No: lo que hay son fotos en Instagram o Facebook, sin explicación escrita` |
| 1 | `Solo la descripción corta de la ficha de Google` |
| 2 | `Tengo sitio web, aunque el texto está viejo o incompleto` |
| 3 | `Tengo sitio web con el texto al día, o una ficha de Google completa y descriptiva` |

#### P6 — Organización de la oferta

Campo: `13_organizacion_oferta`

| Puntos | Valor POST |
|---:|---|
| 0 | `No está explicado en ningún lado` |
| 1 | `Está todo junto, en un solo texto o una sola lista` |
| 2 | `Los principales están separados; el resto está mezclado` |
| 3 | `Cada uno tiene su propio espacio con nombre y explicación, sea en la web, en la ficha de Google o en destacados de Instagram` |

#### P7 — Contacto en uno o dos toques

Campo: `14_contacto_uno_dos_toques`

| Puntos | Valor POST |
|---:|---|
| 0 | `No hay una forma clara de contactarme desde ahí` |
| 1 | `El número está escrito, pero hay que copiarlo a mano` |
| 2 | `Hay botón o enlace, pero a veces falla o cuesta encontrarlo` |
| 3 | `Un toque abre el WhatsApp o el teléfono, sin vueltas` |

#### P8 — Velocidad con datos móviles

Campo: `15_velocidad_datos_moviles`

| Puntos | Valor POST |
|---:|---|
| 0 | `No tengo web, o tarda más de 6 segundos, o queda la pantalla en blanco un rato largo` |
| 1 | `Entre 4 y 6 segundos` |
| 2 | `Entre 2 y 3 segundos, pero los textos y botones se mueven de lugar mientras carga` |
| 3 | `Abre casi al instante y se lee bien desde el primer segundo` |

#### P9 — Responsable y tiempo de respuesta

Campo: `16_responsable_y_tiempo_respuesta`

| Puntos | Valor POST |
|---:|---|
| 0 | `Nadie los mira con regularidad` |
| 1 | `Los miro cuando me acuerdo` |
| 2 | `Los reviso todos los días hábiles, aunque a veces conteste de noche` |
| 3 | `Hay alguien a cargo y se contestan dentro del día hábil, en un horario más o menos fijo` |

#### P10 — Cantidad de reseñas

Campo: `17_cantidad_resenas_google`

| Puntos | Valor POST |
|---:|---|
| 0 | `Ninguna, o no sé` |
| 1 | `Entre 1 y 5` |
| 2 | `Entre 6 y 19` |
| 3 | `20 o más` |

#### P11 — Promedio de estrellas

Campo: `18_promedio_estrellas_google`

| Puntos | Valor POST |
|---:|---|
| 0 | `No tengo reseñas` |
| 1 | `Menos de 4,0` |
| 2 | `Entre 4,0 y 4,4` |
| 3 | `4,5 o más` |

#### P12 — Frescura y respuesta de reseñas

Campo: `19_frescura_y_respuesta_resenas`

| Puntos | Valor POST |
|---:|---|
| 0 | `No tengo reseñas, o no las miro nunca` |
| 1 | `Tengo reseñas, pero la última es de hace más de tres meses` |
| 1 | `Tengo reseñas de los últimos tres meses, pero no las contesto` |
| 2 | `Tengo reseñas recientes y contesto algunas` |
| 3 | `Tengo reseñas recientes y las contesto todas, con un texto distinto cada vez` |

### Respuestas sin puntaje

#### A — Origen de consultas en los últimos 30 días

Campo: `20_origen_consultas_ultimos_30_dias`

| Valor POST |
|---|
| `No, o no me doy cuenta de dónde vienen` |
| `Alguna vez` |
| `Varias veces` |
| `Casi todas las semanas` |

#### B — Visibilidad en asistentes de IA

Campo: `21_visibilidad_en_ia`

| Valor POST |
|---|
| `No me nombra` |
| `Solo si le doy mi nombre exacto` |
| `Me nombra entre varios` |
| `Me recomienda entre los primeros` |

### Campos deliberadamente excluidos

- `_autoresponse`: no funciona en el modo AJAX requerido.
- códigos de respuesta (`p7=2`, `option_c`, etc.): obligarían a decodificar el mail.
- puntajes, respuestas, nombre o email como parámetros de analítica.
- endpoint: pertenece a la integración de producción y no forma parte de este contrato.

## 3. Maqueta del mail

Caso: negocio con `0`, `33`, `67` y `33` por dimensión. El promedio exacto es `33,25`,
primero se clasifica como rojo y luego el número mostrado se redondea a `33/100`.

**Asunto:** Nuevo diagnóstico de presencia digital — Netiza

| Campo | Valor |
|---|---|
| **00_area_prioritaria** | **¿Te encuentran? — 0/100 — ROJO** |
| **01_puntaje_general** | **33/100 — ROJO** |
| 02_puntaje_te_encuentran | 0/100 — ROJO |
| 03_puntaje_te_entienden | 33/100 — ROJO |
| 04_puntaje_te_escriben | 67/100 — AMARILLO |
| 05_puntaje_te_siguen_eligiendo | 33/100 — ROJO |
| 06_nombre | María López |
| email | maria@example.com |
| 08_ficha_google | No aparece ninguna ficha del negocio, o no estoy seguro de tener una |
| 09_busqueda_rubro_ciudad | No aparezco por ningún lado |
| 10_horarios_disponibilidad | No tengo horarios cargados, o no sé qué dice la ficha |
| 11_rubro_y_zona_primera_vista | Solo se ve el nombre del negocio; no dice a qué se dedica |
| 12_contenido_escrito | Solo la descripción corta de la ficha de Google |
| 13_organizacion_oferta | Está todo junto, en un solo texto o una sola lista |
| 14_contacto_uno_dos_toques | Hay botón o enlace, pero a veces falla o cuesta encontrarlo |
| 15_velocidad_datos_moviles | Entre 2 y 3 segundos, pero los textos y botones se mueven de lugar mientras carga |
| 16_responsable_y_tiempo_respuesta | Los reviso todos los días hábiles, aunque a veces conteste de noche |
| 17_cantidad_resenas_google | Entre 1 y 5 |
| 18_promedio_estrellas_google | Menos de 4,0 |
| 19_frescura_y_respuesta_resenas | Tengo reseñas, pero la última es de hace más de tres meses |
| 20_origen_consultas_ultimos_30_dias | No, o no me doy cuenta de dónde vienen |
| 21_visibilidad_en_ia | No me nombra |

**Verificación de lectura móvil:** asunto, área prioritaria y general ocupan las tres
primeras unidades visibles. La peor área se identifica sin sumar respuestas ni conocer la
escala. En menos de 30 segundos se puede leer el resumen, ubicar el contacto y bajar sólo
a las tres respuestas de `¿Te encuentran?` para preparar el seguimiento.

## 4. Tamaño del POST

La medición se ejecutó con `node -` en Node `v24.4.0`. El fixture tiene exactamente
24 campos: los dos campos de sistema, seis de resumen, nombre, email, las opciones más
largas de las 12 preguntas y las opciones más largas de las dos preguntas sin puntaje.
Los puntajes del fixture son coherentes con esas respuestas.

Fixture exacto:

```js
const fields = [
  ['_subject', 'Nuevo diagnóstico de presencia digital — Netiza'],
  ['_template', 'table'],
  ['00_area_prioritaria', '¿Te encuentran? + ¿Te escriben? + ¿Te siguen eligiendo? — 67/100 — sin área roja'],
  ['01_puntaje_general', '75/100 — VERDE'],
  ['02_puntaje_te_encuentran', '67/100 — AMARILLO'],
  ['03_puntaje_te_entienden', '100/100 — VERDE'],
  ['04_puntaje_te_escriben', '67/100 — AMARILLO'],
  ['05_puntaje_te_siguen_eligiendo', '67/100 — AMARILLO'],
  ['06_nombre', 'María de los Ángeles Fernández López'],
  ['email', 'maria.fernandez+diagnostico@example.com'],
  ['08_ficha_google', 'Aparece con el rubro correcto, y el nombre, la dirección y el teléfono coinciden con lo real'],
  ['09_busqueda_rubro_ciudad', 'Aparezco, pero hay que bajar bastante para encontrarme'],
  ['10_horarios_disponibilidad', 'Coinciden, y cuando hay feriado o cambio especial lo actualizo en la ficha'],
  ['11_rubro_y_zona_primera_vista', 'Se leen las dos cosas: a qué me dedico y en qué ciudad o zona'],
  ['12_contenido_escrito', 'Tengo sitio web con el texto al día, o una ficha de Google completa y descriptiva'],
  ['13_organizacion_oferta', 'Cada uno tiene su propio espacio con nombre y explicación, sea en la web, en la ficha de Google o en destacados de Instagram'],
  ['14_contacto_uno_dos_toques', 'Hay botón o enlace, pero a veces falla o cuesta encontrarlo'],
  ['15_velocidad_datos_moviles', 'No tengo web, o tarda más de 6 segundos, o queda la pantalla en blanco un rato largo'],
  ['16_responsable_y_tiempo_respuesta', 'Hay alguien a cargo y se contestan dentro del día hábil, en un horario más o menos fijo'],
  ['17_cantidad_resenas_google', 'Ninguna, o no sé'],
  ['18_promedio_estrellas_google', 'Entre 4,0 y 4,4'],
  ['19_frescura_y_respuesta_resenas', 'Tengo reseñas recientes y las contesto todas, con un texto distinto cada vez'],
  ['20_origen_consultas_ultimos_30_dias', 'No, o no me doy cuenta de dónde vienen'],
  ['21_visibilidad_en_ia', 'Me recomienda entre los primeros'],
];
```

Método reproducible:

```js
async function measure() {
  const urlencoded = new URLSearchParams(fields).toString();

  const formData = new FormData();
  for (const [name, value] of fields) formData.append(name, value);
  const request = new Request('https://example.invalid', {
    method: 'POST',
    body: formData,
  });
  const multipart = Buffer.from(await request.arrayBuffer());
  const boundary = request.headers
    .get('content-type')
    .match(/boundary=(.+)$/)[1];

  console.log({
    node: process.version,
    fields: fields.length,
    urlencodedBytes: Buffer.byteLength(urlencoded),
    multipartBytes: multipart.byteLength,
    multipartBoundaryBytes: Buffer.byteLength(boundary),
  });
}

measure();
```

Resultados reales:

| Serialización | `Content-Type` | Bytes |
|---|---|---:|
| `URLSearchParams` | `application/x-www-form-urlencoded` | **1.994** |
| `FormData` mediante `Request.arrayBuffer()` | `multipart/form-data`, boundary generado de 32 bytes | **3.729** |

No se mezclan ambas cifras: son dos cuerpos alternativos construidos desde el mismo
fixture. El flujo AJAX puede usar `FormData`; en ese caso la evidencia relevante es
3.729 bytes. El boundary de otros runtimes puede cambiar la cifra, pero incluso triplicar
el cuerpo multipart medido lo mantiene por debajo de 12 KB.

**Conclusión:** las 14 respuestas, nombre, email y puntajes entran holgadamente. FormSubmit
no publica un límite global de request, por lo que esto es evidencia cuantitativa del
contrato y un margen conservador, no una afirmación sobre una cuota inexistente.

## 5. Verificación de build

Comando ejecutado desde la raíz:

```text
npm run build
```

Resultado:

```text
> netiza-web@0.0.1 build
> astro build

[build] output: "static"
[build] 2 page(s) built in 858ms
[build] Complete!
```

**Exit code:** `0`. Compilación estática limpia, sin errores.

## Resumen ejecutivo

Los tres hitos ya tienen traducción centralizada a GA4 y Meta Pixel, sin PII.  
El contrato POST prioriza el área peor y envía las 14 respuestas como texto literal.  
El asunto queda fijado en `Nuevo diagnóstico de presencia digital — Netiza`.  
La maqueta permite identificar el peor frente en las primeras filas desde un celular.  
El fixture mide 1.994 bytes URL-encoded o 3.729 multipart; el build termina con exit 0.

## Pendientes

- La UI debe implementar el contrato de `CustomEvent` en los tres momentos definidos.
- La UI debe construir el `FormData` en el orden documentado y mostrar el PDF sólo tras
  el éxito AJAX.
- Validar el copy de opciones con dos o tres dueños de pyme antes de publicar.

## Persistencia en Engram

Se actualizó la decisión **“Definido contrato de analítica y POST del diagnóstico”** con
los eventos, el esquema legible, la clasificación sobre el promedio exacto y las dos
mediciones reproducibles.
