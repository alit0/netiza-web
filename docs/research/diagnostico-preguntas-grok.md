# Diagnóstico de presencia digital — Draft Grok (adversarial + cuantitativo)

**Agente:** Grok (ingeniería pesada, verificación)  
**Fecha:** 2026-07-26  
**Fuente de verdad:** `docs/BRIEFING-DIAGNOSTICO.md`  
**Alcance:** diseño y redacción únicamente (sin implementación)

---

## 0. Plan de trabajo (ejecutado)

1. Leer briefing completo, con foco en §2 (decisiones cerradas) y §4 (restricciones de redacción).
2. Fijar la matemática del puntaje (pregunta → dimensión → general → semáforo) antes de enamorar el copy.
3. Redactar 12 preguntas (3 por dimensión) con opciones escalonadas, criterio objetivo y umbral+fuente.
4. Prueba adversarial por pregunta: ¿un negocio objetivamente mal puede auto-asignarse bien sin evidencia?
5. Filtro “opinión disfrazada de dato”: si se contesta favorable sin evidencia, se reformula o se descarta.
6. Simular tres perfiles (bien / regular / mal) y correr el puntaje; si el “bien” no sale bien, romper y corregir.
7. Listar candidatas descartadas y motivos.
8. Guardar decisiones de diseño en engram desde el cwd del proyecto.

### Riesgos vistos

| Riesgo | Mitigación |
|---|---|
| El dueño se autocalifica alto por optimismo | Preguntas ancladas a hechos contables de memoria (conteos, fechas, sí/no de artefactos visibles en el celular) |
| Criterios de lab (CrUX, Schema) que el dueño no puede saber | No van como pregunta de memoria; Schema descartado; velocidad solo con proxy conductual o como excepción final |
| Cifras de EE.UU. citadas como si fueran Argentina | Umbrales usan la **dirección** del hallazgo; en el material al usuario no se inventan % locales |
| Dimensión que promedia y esconde un agujero crítico | Semáforo por dimensión independiente del general; “áreas en rojo” = dim ≤ 33 |
| Google-violating tactics que “funcionan” | Prohibidas (keyword stuffing en nombre de ficha, etc.) |

### Verificación final (checklist)

- [x] Exactamente 12 preguntas, 3 por dimensión  
- [x] Cada una: texto + 3–4 opciones con puntaje + criterio + umbral/fuente  
- [x] Sin jerga (SEO, CTA, engagement, conversión, posicionamiento)  
- [x] Voseo rioplatense neutro-profesional  
- [x] Ninguna táctica contra directrices de Google  
- [x] Matemática de puntaje documentada y cortes justificados  
- [x] Prueba adversarial documentada por pregunta  
- [x] Simulación de 3 perfiles con resultados coherentes  
- [x] Descartadas listadas  

---

## 1. Las 12 preguntas por dimensión

**Convención de puntaje por opción:** cada pregunta aporta `0 | 1 | 2 | 3` puntos crudos.  
La dimensión suma esos tres valores (`dim_raw` ∈ 0…9) y se proyecta a `{0, 33, 67, 100}` (ver §2).

---

### Dimensión A — ¿Te encuentran?

#### A1. Ficha y categoría en Google

**Texto:**  
Si buscás el nombre exacto de tu negocio en Google desde el celular, ¿qué ves hoy?

**Opciones:**

| # | Texto de opción | Puntos |
|---|---|---|
| a | No aparece una ficha de negocio, o no estoy seguro de tenerla | 0 |
| b | Aparece una ficha, pero la categoría o el rubro no describen bien lo que hago | 1 |
| c | Aparece y la categoría principal es correcta, aunque falten datos | 2 |
| d | Aparece, la categoría principal es correcta y coinciden nombre, dirección y teléfono con lo real | 3 |

**Criterio objetivo:** existencia de Google Business Profile (o equivalente en resultados locales) + categoría primaria alineada al rubro real + consistencia NAP básica.  
**Umbral “bien” (3 pts):** categoría primaria correcta **y** nombre/dirección/teléfono coherentes con la realidad del local.  
**Fuente:** Whitespark Local Search Ranking Factors 2026 — categoría primaria como factor #1 del local pack; dirección física visible entre señales de ranking local (briefing §5).  
**Contestabilidad:** memoria + mirar el propio celular (Maps/búsqueda del nombre). Sin Analytics.

**Prueba adversarial A1:**  
¿Un mal objetivamente bien califica? Solo si miente sobre si aparece o no la ficha. La opción (d) exige tres hechos concurrentes (categoría + NAP). Un local sin ficha o con rubro genérico/erróneo no llega a 3 sin falsear. **Pasa.**

---

#### A2. Horarios reales

**Texto:**  
Los horarios que figuran en tu ficha de Google, ¿coinciden con cómo estás atendiendo esta semana?

**Opciones:**

| # | Texto de opción | Puntos |
|---|---|---|
| a | No tengo horarios cargados en la ficha | 0 |
| b | Están cargados, pero al menos un día de esta semana no coincide | 1 |
| c | Coinciden con la semana habitual (sin mirar feriados o excepciones) | 2 |
| d | Coinciden, y cuando hay feriado o cierre especial lo actualizo en la ficha | 3 |

**Criterio objetivo:** paridad entre horarios publicados y operación real de la semana en curso.  
**Umbral “bien” (3 pts):** horarios correctos **y** hábito de actualizar excepciones.  
**Fuente:** Whitespark 2026 — horarios reales al momento de la búsqueda; factor relevante de Maps; degradación de visibilidad cerca del cierre (briefing §5).  
**Contestabilidad:** el dueño sabe si hoy cierra a las 13 o a las 18; no necesita herramienta externa.

**Prueba adversarial A2:**  
El optimista puede marcar (c) sin chequear. Mitigación: el texto ancla a “esta semana” y (d) exige conducta de actualización de excepciones. Quien tiene la ficha abandonada suele recordar el desfase (feriados, cambio de siesta). No es infalsificable, pero no es opinión abstracta (“¿estás al día?”). **Pasa con reserva** — es de las más gameables; se mantiene porque el criterio es fáctico y el umbral es defendible.

---

#### A3. Señal de actividad (fotos / publicaciones en la ficha)

**Texto:**  
¿Cuándo fue la última vez que subiste una foto o una publicación a la ficha de Google de tu negocio?

**Opciones:**

| # | Texto de opción | Puntos |
|---|---|---|
| a | Nunca, o no sé si se puede | 0 |
| b | Hace más de seis meses | 1 |
| c | Entre uno y seis meses | 2 |
| d | En el último mes | 3 |

**Criterio objetivo:** recencia de contenido en la ficha (foto o post de perfil de negocio).  
**Umbral “bien” (3 pts):** actividad en los últimos 30 días.  
**Fuente:** Whitespark 2026 — fotos recientes y señales de actividad (briefing §5). El corte de 30 días es operativo (memoria del dueño), no un % inventado de mercado AR.  
**Contestabilidad:** fecha recordable; opcional mirar la ficha en el celular.

**Prueba adversarial A3:**  
Difícil mentir hacia arriba sin contradicción interna: “el mes pasado” es un hecho. Un perfil muerto cae en (a)/(b). **Pasa.**

---

### Dimensión B — ¿Te entienden?

#### B1. Una página (o sección) por servicio principal

**Texto:**  
En tu web, ¿cada servicio o producto principal tiene su propio espacio (página o sección clara), o está todo mezclado?

**Opciones:**

| # | Texto de opción | Puntos |
|---|---|---|
| a | No tengo web | 0 |
| b | Tengo web, pero todo está en una sola página sin separar lo que ofrezco | 1 |
| c | Algunos servicios tienen su espacio; otros no | 2 |
| d | Cada servicio principal tiene su propia página o sección con nombre propio | 3 |

**Criterio objetivo:** estructura de contenido = un destino dedicado por oferta principal.  
**Umbral “bien” (3 pts):** cobertura completa de servicios principales (no “la mayoría”).  
**Fuente:** Whitespark 2026 — página dedicada por servicio como factor orgánico local #1 (briefing §5).  
**Contestabilidad:** el dueño conoce su web; no mide rankings.

**Prueba adversarial B1:**  
“Servicio principal” podría estirarse. Mitigación: ancla a “cada” + “nombre propio”. Un one-pager honesto marca (b). **Pasa.**

---

#### B2. Rubro y zona visibles en la primera vista

**Texto:**  
En la primera pantalla de tu web (o de tu ficha de Google si no tenés web), ¿aparecen escritos el rubro y la zona o ciudad, sin metáforas ni solo el nombre de fantasía?

**Opciones:**

| # | Texto de opción | Puntos |
|---|---|---|
| a | No tengo web ni ficha usable para mirar eso | 0 |
| b | Solo se ve el nombre del local; no dice el rubro | 1 |
| c | Se ve el rubro, pero no la zona o ciudad | 2 |
| d | En la primera vista se leen rubro y zona/ciudad (o barrio de cobertura) | 3 |

**Criterio objetivo:** presencia literal de (1) categoría de negocio en lenguaje de cliente y (2) ancla geográfica, above the fold / primer viewport móvil.  
**Umbral “bien” (3 pts):** ambos presentes sin scrollear en móvil.  
**Fuente:** dirección de Whitespark/SOCi sobre claridad de entidad local y datos del negocio; frameworks de mensaje solo como traducción a chequeable (decisión 10). No se citan como marca al usuario.  
**Contestabilidad:** “lo leo o no lo leo” en la primera pantalla del celular.

**Prueba adversarial B2:**  
Opinión residual: “primera pantalla” varía por dispositivo. Mitigación: criterio binario de substrings (rubro + zona), no “¿se entiende el mensaje?”. Un slogan tipo “tu mejor aliado” sin rubro cae en (b). **Pasa** (esta es la que más cerca estuvo de opinión; se salvó al prohibir “claridad” y exigir tokens observables).

---

#### B3. Presencia legible fuera de solo fotos en redes

**Texto:**  
Además de fotos en redes, ¿tenés al menos un lugar propio (web o perfil de negocio) donde esté escrito con palabras qué hacés y en qué ciudad?

**Opciones:**

| # | Texto de opción | Puntos |
|---|---|---|
| a | No: solo redes con fotos, o casi nada online | 0 |
| b | Hay texto, pero no dice con claridad el oficio ni la ciudad | 1 |
| c | Está escrito el oficio o la ciudad, pero no ambos en el mismo lugar | 2 |
| d | Hay web o ficha de negocio con oficio y ciudad escritos de forma explícita | 3 |

**Criterio objetivo:** existencia de texto indexable/legible (no solo imagen) con entidad + geo.  
**Umbral “bien” (3 pts):** un activo propio con ambos datos explícitos.  
**Fuente:** oportunidad diferencial del briefing §5 (recomendaciones locales vía IA y solapamiento incompleto con el local pack): las señales textuales de entidad importan; se pregunta el **artefacto**, no “¿aparecés en ChatGPT?”.  
**Contestabilidad:** el dueño sabe si tiene web/ficha con texto o solo Instagram visual.

**Prueba adversarial B3:**  
“Claridad” en (b) es blanda — por eso (b) es el escalón intermedio, no el techo. El techo (d) es checklist. **Pasa.**

---

### Dimensión C — ¿Te escriben?

#### C1. Contacto en uno o dos toques (móvil)

**Texto:**  
Desde el celular, mirando tu web o tu ficha de Google, ¿se puede iniciar un WhatsApp o una llamada en uno o dos toques?

**Opciones:**

| # | Texto de opción | Puntos |
|---|---|---|
| a | No hay forma clara de contactarme desde ahí | 0 |
| b | El número está, pero hay que copiarlo a mano | 1 |
| c | Hay botón o enlace; a veces falla o no se ve bien en el celular | 2 |
| d | Un toque abre WhatsApp o el teléfono de forma confiable | 3 |

**Criterio objetivo:** path de contacto accionable en móvil (tap-to-call / tap-to-WhatsApp).  
**Umbral “bien” (3 pts):** un gesto, estable.  
**Fuente:** no es un factor de ranking; es umbral de usabilidad de conversión a mensaje, alineado a Page Experience en espíritu (Google/web.dev) sin pedir números de laboratorio al dueño.  
**Contestabilidad:** puede probarlo en 10 segundos en su celular (no es “otra herramienta”; es su propio activo).

**Prueba adversarial C1:**  
Quien tiene solo un PDF escaneado del menú sin link cae bajo. Difícil marcar (d) si en la práctica copian el número. **Pasa.**

---

#### C2. Primer contacto real en los últimos 30 días

**Texto:**  
En los últimos 30 días, ¿te escribió o llamó alguien por primera vez diciendo que te encontró por Google, Maps o redes?

**Opciones:**

| # | Texto de opción | Puntos |
|---|---|---|
| a | No, o no me doy cuenta de de dónde vienen | 0 |
| b | Una vez en el mes | 1 |
| c | Varias veces en el mes | 2 |
| d | Casi todas las semanas | 3 |

**Criterio objetivo:** frecuencia de leads nuevos atribuidos por el cliente a canales digitales.  
**Umbral “bien” (3 pts):** ~semanal.  
**Fuente:** outcome de presencia; no hay % AR inventado. Es proxy de “el canal digital genera conversación”, coherente con el objetivo comercial del diagnóstico (2–3 conversaciones/mes para Netiza implica que el prospecto también vive el problema de demanda).  
**Contestabilidad:** memoria de operaciones de 30 días; no Analytics.

**Prueba adversarial C2:**  
Riesgo: atribución mentirosa (“todos vienen de Google”). Mitigación: la pregunta exige **que el cliente lo haya dicho** (“diciendo que…”), no la creencia del dueño. Quien no pregunta de dónde vienen cae en (a). **Pasa.**

---

#### C3. Rutina de respuesta en horario comercial

**Texto:**  
Cuando te llegan mensajes del negocio (WhatsApp, Instagram o formulario), ¿quién y cuándo los contesta en días hábiles?

**Opciones:**

| # | Texto de opción | Puntos |
|---|---|---|
| a | Nadie los mira con regularidad | 0 |
| b | Los miro cuando me acuerdo | 1 |
| c | Los reviso todos los días hábiles, aunque a veces conteste a la noche | 2 |
| d | Hay una persona asignada y se contestan dentro del día hábil, en un horario más o menos fijo | 3 |

**Criterio objetivo:** existencia de ownership + SLA informal de “mismo día hábil”.  
**Umbral “bien” (3 pts):** responsable nombrable + ventana de respuesta intradía.  
**Fuente:** no BrightLocal (eso es reseñas). Criterio operativo de generación de conversación comercial; evita “¿respondés rápido?” (opinión).  
**Contestabilidad:** el dueño sabe si hay encargado o caos.

**Prueba adversarial C3:**  
Gameable por autoimagen (“yo siempre contesto”). Mitigación: (d) exige **persona asignada** + **horario fijo** — dos hechos organizativos. Un “contesto cuando puedo” honesto es (b)/(c). **Pasa con reserva.**

---

### Dimensión D — ¿Te siguen eligiendo?

#### D1. Cantidad de reseñas en Google

**Texto:**  
¿Cuántas reseñas públicas tenés hoy en Google?

**Opciones:**

| # | Texto de opción | Puntos |
|---|---|---|
| a | Ninguna, o no sé | 0 |
| b | Entre 1 y 5 | 1 |
| c | Entre 6 y 19 | 2 |
| d | 20 o más | 3 |

**Criterio objetivo:** conteo entero de reseñas públicas en el perfil.  
**Umbral “bien” (3 pts):** ≥ 20.  
**Fuente:** BrightLocal Local Consumer Review Survey 2026 — piso de 20 reseñas (47% descarta por debajo; 9% se arriesga con ≤5) (briefing §5). Dirección del hallazgo, no se afirma como estadística argentina en el copy al usuario.  
**Contestabilidad:** número visible en la ficha del celular.

**Prueba adversarial D1:**  
Casi no se puede “opinar” el número. **Pasa** (mejor pregunta del set).

---

#### D2. Promedio de estrellas

**Texto:**  
¿Cuál es el promedio de estrellas de tu ficha de Google?

**Opciones:**

| # | Texto de opción | Puntos |
|---|---|---|
| a | No tengo reseñas | 0 |
| b | Menos de 4,0 | 1 |
| c | Entre 4,0 y 4,4 | 2 |
| d | 4,5 o más | 3 |

**Criterio objetivo:** rating medio publicado.  
**Umbral “bien” (3 pts):** ≥ 4,5.  
**Fuente:** BrightLocal 2026 — 4,5 estrellas; 31% descarta por debajo (briefing §5).  
**Contestabilidad:** número en la ficha.

**Prueba adversarial D2:**  
Hecho numérico. **Pasa.**

---

#### D3. Recencia de reseñas + respuesta (compuesta, no opinable)

**Texto:**  
Sobre tus reseñas de Google, ¿cuál te describe mejor hoy?

**Opciones:**

| # | Texto de opción | Puntos |
|---|---|---|
| a | No tengo reseñas, o no las miro | 0 |
| b | La última es de hace más de 3 meses, o no contesto ninguna | 1 |
| c | Tengo al menos una reseña en los últimos 3 meses y contesto algunas | 2 |
| d | Tengo reseña(s) en los últimos 3 meses y contesto todas con un texto distinto cada vez | 3 |

**Criterio objetivo:** (recencia ≤ 90 días) ∧ (tasa de respuesta y no-plantilla en el techo).  
**Umbral “bien” (3 pts):** recencia OK **y** 100% respondidas con texto no genérico.  
**Fuente:** BrightLocal 2026 — recencia &lt; 3 meses (74% solo considera ese período); responder el 100% (ignorar espanta al 42%; responder todas atrae al 80%; plantillas repelen al 50%) (briefing §5).  
**Contestabilidad:** fecha de última reseña + hábito de respuesta, ambos observables en la ficha.

**Prueba adversarial D3:**  
Un negocio con 50 reseñas viejas y sin respuesta no puede marcar (d) sin mentir en dos ejes. La composición evita el falso positivo “respondo todo” con reseñas de 2019. **Pasa.**

---

## 2. Modelo de puntaje (matemática)

### 2.1 Unidades

| Nivel | Símbolo | Rango | Tipo |
|---|---|---|---|
| Opción de respuesta | `p_i` | `{0,1,2,3}` | entero |
| Pregunta | igual a `p_i` | 0…3 | entero |
| Dimensión (crudo) | `dim_raw` | `p1+p2+p3` ∈ 0…9 | entero |
| Dimensión (reportada) | `dim` | `{0, 33, 67, 100}` | discreto |
| General | `overall` | promedio de 4 `dim` | múltiplos de 8,25 |
| Semáforo general | `g ∈ {rojo, amarillo, verde}` | — | categórico |
| Área en rojo (UI muro parcial) | `dim ≤ 33` | — | booleano por dimensión |

### 2.2 Proyección dimensión: `dim_raw → dim`

```
dim_raw  0  1  2  3  4  5  6  7  8  9
dim      0  0  0 33 33 33 67 67 100 100
```

Equivalente implementable:

```js
function dimensionScore(raw /* 0..9 */) {
  if (raw <= 2) return 0;
  if (raw <= 5) return 33;
  if (raw <= 7) return 67;
  return 100;
}
```

**Justificación de cortes de dimensión**

| `dim` | Condición | Lectura honesta |
|---|---|---|
| **0** | ≤ 22% de los puntos posibles (raw ≤ 2) | La dimensión está rota o ausente. No se maquilla con un “regular”. |
| **33** | 33–56% (raw 3–5) | Hay algo, no alcanza. En UI cuenta como **área en rojo** (muro parcial: se muestra el problema sin cobrar). |
| **67** | 67–78% (raw 6–7) | Mayoría de señales bien; falta el techo. Amarillo de dimensión. |
| **100** | 89–100% (raw 8–9) | Solo se llega con casi todo en 2–3. Impide el “me puse el máximo en todo por simpatía” a menos de mentir en cadena. |

La granularidad 0/33/67/100 es decisión cerrada del briefing (§2.11). Esta proyección maximiza **separación**: el tramo medio no salta a verde.

### 2.3 Puntaje general

```js
const overall = (dimA + dimB + dimC + dimD) / 4;
```

Valores posibles: `k * 8.25` para enteros `k` según combinaciones de {0,33,67,100}⁴.

### 2.4 Semáforo general

| Color | Condición | Justificación |
|---|---|---|
| **Rojo** | `overall < 42` | Cuatro dimensiones a 33 dan 33 (sigue rojo). Tres a 33 + una a 67 ≈ 41,5 → aún rojo. Salís de rojo solo si hay **al menos una** dimensión claramente por encima del piso débil **y** el resto no está en cero total. Mensaje: “hay trabajo de base”. |
| **Amarillo** | `42 ≤ overall < 75` | Perfil mixto: convive con agujeros visibles. Es la zona donde el PDF “qué hacer” tiene más valor comercial sin mentir. |
| **Verde** | `overall ≥ 75` | Ejemplos que llegan: `100+100+100+0 = 75`, `100+100+67+33 ≈ 75`, `100+67+67+67 ≈ 75,25`. **Podés ser verde en general y tener un área en rojo** — coherente con el muro parcial y con “quien está bien debe ver que está bien” **sin** ocultar el flanco débil. |

### 2.5 Semáforo por dimensión (para “áreas en rojo”)

| `dim` | Etiqueta UI sugerida | ¿Se lista como área en rojo gratis? |
|---|---|---|
| 0 | Crítico | Sí |
| 33 | Débil | Sí |
| 67 | A mejorar | No (opcional “amarillo” en detalle post-mail) |
| 100 | Bien | No |

### 2.6 Pesos

- **Igual peso entre preguntas** dentro de la dimensión (decisión de granularidad 3).  
- **Igual peso entre dimensiones** en el general (las cuatro preguntas del dueño pesan igual en lenguaje de negocio: encontrar / entender / escribir / elegir).  
- No hay ponderación oculta “SEO > reseñas”: rompería honestidad percibida y el copy de dimensiones.

### 2.7 Invariantes de honestidad (tests de aceptación del modelo)

1. Si las 12 respuestas son la opción máxima, `overall = 100` y cero áreas en rojo.  
2. Si las 12 son la opción mínima, `overall = 0` y cuatro áreas en rojo.  
3. Un perfil con D1–D3 en 0 y el resto perfecto: `dimD = 0`, `overall = 75` → **verde general + área roja en “te siguen eligiendo”**. El sistema no miente ni castiga de más.  
4. Ninguna pregunta otorga puntos por “me siento bien con mi marca”.

### 2.8 Pseudocódigo de cálculo (client-side, referencia)

```js
const POINTS = { /* questionId: selected 0..3 */ };

const DIMS = {
  encuentran: ["A1", "A2", "A3"],
  entienden: ["B1", "B2", "B3"],
  escriben: ["C1", "C2", "C3"],
  eligen: ["D1", "D2", "D3"],
};

function dimensionScore(raw) {
  if (raw <= 2) return 0;
  if (raw <= 5) return 33;
  if (raw <= 7) return 67;
  return 100;
}

function scoreAll(answers) {
  const dims = {};
  for (const [name, qs] of Object.entries(DIMS)) {
    const raw = qs.reduce((s, id) => s + answers[id], 0);
    dims[name] = { raw, score: dimensionScore(raw) };
  }
  const overall =
    Object.values(dims).reduce((s, d) => s + d.score, 0) / 4;
  const traffic =
    overall < 42 ? "rojo" : overall < 75 ? "amarillo" : "verde";
  const redAreas = Object.entries(dims)
    .filter(([, d]) => d.score <= 33)
    .map(([name]) => name);
  return { dims, overall, traffic, redAreas };
}
```

---

## 3. Simulación de tres perfiles

### 3.1 Perfil BIEN — “Ferretería El Tornillo” (establecida, digital cuidada)

| ID | Respuesta elegida | pts |
|---|---|---|
| A1 | d — ficha OK, categoría y NAP | 3 |
| A2 | d — horarios + feriados | 3 |
| A3 | d — foto el último mes | 3 |
| B1 | d — página por servicio | 3 |
| B2 | d — rubro + zona en primera vista | 3 |
| B3 | d — web con oficio y ciudad | 3 |
| C1 | d — un toque WhatsApp | 3 |
| C2 | d — casi todas las semanas | 3 |
| C3 | d — persona + horario fijo | 3 |
| D1 | d — 20+ reseñas | 3 |
| D2 | d — ≥ 4,5 | 3 |
| D3 | d — reseña &lt; 3 meses y responde todas | 3 |

| Dimensión | raw | dim |
|---|---|---|
| Te encuentran | 9 | **100** |
| Te entienden | 9 | **100** |
| Te escriben | 9 | **100** |
| Te siguen eligiendo | 9 | **100** |

- **Overall:** 100  
- **Semáforo:** **VERDE**  
- **Áreas en rojo:** ninguna  

**Chequeo de invariante:** el que está bien **ve que está bien**. Sistema OK.

---

### 3.2 Perfil REGULAR — “Estudio Contable Martínez” (funciona offline, digital a medias)

| ID | Respuesta | pts |
|---|---|---|
| A1 | c — categoría OK, faltan datos | 2 |
| A2 | c — horarios de semana OK | 2 |
| A3 | b — foto hace &gt; 6 meses | 1 |
| B1 | b — todo en una página | 1 |
| B2 | c — rubro sí, zona no | 2 |
| B3 | c — oficio o ciudad, no ambos juntos | 2 |
| C1 | b — número para copiar | 1 |
| C2 | b — una vez en el mes | 1 |
| C3 | b — cuando me acuerdo | 1 |
| D1 | c — 6–19 reseñas | 2 |
| D2 | c — 4,0–4,4 | 2 |
| D3 | b — última &gt; 3 meses o no contesta | 1 |

| Dimensión | raw | dim |
|---|---|---|
| Te encuentran | 5 | **33** |
| Te entienden | 5 | **33** |
| Te escriben | 3 | **33** |
| Te siguen eligiendo | 5 | **33** |

- **Overall:** 33  
- **Semáforo:** **ROJO**  
- **Áreas en rojo:** las cuatro  

**Lectura:** un “regular” de barrio que se cree “más o menos bien” **no** recibe un amarillo complaciente. Overall 33 es duro a propósito: ninguna dimensión cruza el umbral de “mayoría sólida” (raw ≥ 6). Si en validación de producto se prefiere que este perfil salga amarillo, habría que **relajar cortes** (no las preguntas); hoy la matemática prioriza honestidad sobre suavidad comercial.

**Nota de diseño:** si se quisiera amarillo típico para este arquetipo, un ajuste mínimo sería `rojo si overall < 33` y `amarillo si 33 ≤ overall < 75`, pero eso haría “todo 33” amarillo y debilitaría el muro de áreas en rojo. **No se aplica en este draft:** se documenta como tensión consciente.

---

### 3.3 Perfil MAL — “Taller de costura Doña Rosa” (excelente offline, casi invisible online)

| ID | Respuesta | pts |
|---|---|---|
| A1 | a — no aparece ficha | 0 |
| A2 | a — sin horarios | 0 |
| A3 | a — nunca | 0 |
| B1 | a — sin web | 0 |
| B2 | a — sin web ni ficha usable | 0 |
| B3 | a — solo redes con fotos o nada | 0 |
| C1 | a — sin contacto claro | 0 |
| C2 | a — no / no sabe origen | 0 |
| C3 | a — nadie revisa | 0 |
| D1 | a — sin reseñas | 0 |
| D2 | a — sin reseñas | 0 |
| D3 | a — no mira reseñas | 0 |

| Dimensión | raw | dim |
|---|---|---|
| Todas | 0 | **0** |

- **Overall:** 0  
- **Semáforo:** **ROJO**  
- **Áreas en rojo:** las cuatro  

**Chequeo:** no hay camino a verde sin hechos. Sistema OK.

---

### 3.4 Perfil extra de estrés — “Bien en todo salvo reseñas” (invariante 3)

Solo para validar el modelo (no es uno de los tres mandatorios):

- A,B,C = 9 → 100 cada una  
- D = 0 → 0  
- **Overall = 75 → VERDE**  
- **Área en rojo:** te siguen eligiendo  

El dueño ve “estás bien en general” y **un** flanco rojo concreto — ideal para el mail personal a las 48–72 h (decisión 2 y 8).

---

### 3.5 Ajuste fino tras simulación del “regular”

La simulación mostró que el arquetipo “regular honestamente mediocre” cae en rojo global. Eso es **correcto para credibilidad** y **tenso para conversión del lead**.

**Decisión de este draft (Grok):** mantener cortes estrictos. Motivo adversarial: suavizar el general a costa de verdad es el modo de fallo que el briefing prohíbe (“puntaje honesto”). El alivio comercial se logra en el **tono del resultado** (“no es un examen, es un mapa”), no inflando números.

Si al cruzar drafts se prioriza conversión, la única perilla segura es el umbral `42 → 33` en el semáforo general, **sin** tocar el criterio `área en rojo = dim ≤ 33`.

---

## 4. Preguntas candidatas descartadas (y por qué)

| # | Candidata | Motivo de descarte |
|---|---|---|
| 1 | “¿Tu mensaje de marca es claro?” | Opinión disfrazada de dato (§4.1). Nadie se pone un 2. |
| 2 | “¿Tu web es profesional / moderna?” | Estética subjetiva; avergüenza gratis (§4.6). |
| 3 | “¿Hacés SEO local?” | Jerga de agencia (§4.3). |
| 4 | “¿Tu LCP es &lt; 2,5 s / pasás Core Web Vitals?” | Requiere CrUX/Search Console; viola “sin otra pestaña” (§4.2), salvo excepción de última pregunta — aun así la mayoría no tiene el dato y inventaría. |
| 5 | “¿Tenés datos estructurados LocalBusiness?” | Solo auditable con vista de código o Rich Results; el dueño de pyme no lo sabe de memoria. |
| 6 | “¿Aparecés en ChatGPT / Perplexity?” | El dueño no puede verificarlo de forma estable; genera falso negativo/positivo. Se reemplazó por B3 (artefacto textual legible). |
| 7 | “¿Usás palabras clave en el nombre de la ficha de Google?” | Viola directrices de Google y el posicionamiento Netiza (briefing §5). |
| 8 | “¿Estás en Yelp / TripAdvisor / Apple Maps?” | Peso marginal en AR; destruye credibilidad en Mercedes (briefing §5). |
| 9 | “¿Cuál es tu tasa de conversión?” | Jerga + Analytics. |
| 10 | “¿Posteás seguido en Instagram?” | Vanity métrica; no está en criterios con umbral del briefing; confunde redes con “te encuentran”. |
| 11 | “¿Pedís reseñas a todos los clientes?” | Conducta loable pero no es el umbral BrightLocal (cantidad/estrellas/recencia/respuesta). Además se contesta “sí” sin evidencia. |
| 12 | “¿Tu competencia está mejor que vos?” | Comparación sin dato; avergüenza y no es autoevaluación verificable. |
| 13 | “¿Invertís en ads de Google?” | Fuera de alcance del diagnóstico de presencia; empuja a servicio no planteado en dimensiones. |
| 14 | “¿Tu NAP es consistente en 10 directorios?” | No contestable sin auditoría multi-sitio; fatiga. |
| 15 | A2 en versión “¿Tus horarios están al día?” sin anclar a “esta semana” | Demasiado abstracto; reformulada a A2 actual. |
| 16 | C2 en versión “¿Te funciona el marketing digital?” | Opinión total; reemplazada por frecuencia de primer contacto atribuido. |

---

## 5. Matriz adversarial resumida (las 12)

| ID | ¿Mal puede verse bien sin evidencia? | ¿Opinión disfrazada? | Veredicto |
|---|---|---|---|
| A1 | Solo mintiendo sobre ficha/categoría/NAP | No | OK |
| A2 | Parcialmente (optimismo en horarios) | Bajo | OK con reserva |
| A3 | No (fecha de última foto) | No | OK |
| B1 | Difícil si es one-pager | No | OK |
| B2 | Bajo si se exige rubro+zona literales | Evitada a propósito | OK |
| B3 | No (existencia de artefacto) | No | OK |
| C1 | Difícil si hay que copiar el número | No | OK |
| C2 | Mitigado con “el cliente lo dijo” | No | OK |
| C3 | Parcial (autoimagen de “respondo”) | Bajo | OK con reserva |
| D1 | No | No | OK |
| D2 | No | No | OK |
| D3 | No (doble eje recencia+respuesta) | No | OK |

**Modo de fallo más probable del sistema completo:** no es D1/D2 (números duros), sino **A2 + C3** (hábitos). Contención: no son suficientes solas para pintar de verde una dimensión (hacen falta raw ≥ 8 para dim=100). Un mentiroso en A2 y C3 con el resto roto sigue en rojo.

---

## 6. Orden sugerido en el flujo (UX, no reabre decisiones)

Una por pantalla, 12 pasos. Orden que minimiza abandono temprano y deja lo más “de ficha numérica” cuando ya hay commitment:

1. A1 → A2 → A3  
2. B2 → B1 → B3  
3. C1 → C3 → C2  
4. D1 → D2 → D3  

(B2 antes que B1: más fácil y ancla en celular. C2 después de C1/C3: el outcome duele menos si ya contestó el path. D al final: números de reseñas son rápidos y concretos cerca del resultado.)

No es decisión de producto cerrada; es recomendación de implementación.

---

## 7. Cierre

### Resumen ejecutivo

Draft de 12 preguntas ancladas a hechos (ficha, fechas, conteos, artefactos), 3 por dimensión, con opciones 0–3. Matemática: `dim_raw` 0–9 → {0,33,67,100}; overall = promedio; rojo &lt; 42, amarillo &lt; 75, verde ≥ 75; área en rojo si dim ≤ 33. Simulación: bien=100 verde, regular=33 rojo (duro a propósito), mal=0 rojo; el bien no se castiga. Reservas adversarial en A2 y C3; el resto pasa el filtro de evidencia.

### Pendientes

- Cruzar este draft con los otros dos independientes y resolver tensiones (sobre todo umbral 42 del regular→rojo).  
- Validar copy de opciones con 2–3 dueños reales de pyme (comprensión, no “agrado”).  
- En implementación: persistir `p_i` crudos en FormSubmit (no solo el overall) para el mail personal de las 48–72 h.  
- Decidir si dim=67 se muestra en UI gratis o solo post-lead.  
- No implementar todavía (alcance de esta tarea).

### Qué se guardó en engram

- Decisión: modelo de puntaje del diagnóstico (proyección 0–9 → 0/33/67/100, cortes 42/75, área roja ≤33).  
- Decisión: set de 12 preguntas Grok con anclaje anti-opinión y descarte de Schema/CWV/Yelp/keyword-stuffing como ítems de encuesta.  
- Topic keys: `diagnostico/scoring-model`, `diagnostico/preguntas-draft-grok`.

---

*Fin del reporte Grok. Listo para cruce multi-agente.*
