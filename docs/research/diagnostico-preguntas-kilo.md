# Diagnóstico Netiza — Preguntas con Voz del Sitio

> Draft de Kilo. Ángulo: voz y flujo.
> Fecha: 2026-07-26

---

## 1. Guía de voz — Cómo habla Netiza

### Persona gramatical

Netiza le habla al dueño de la pyme en **segunda persona singular con voseo**: *hacés*, *tenés*, *necesitás*, *escribinos*, *contestás*. Para sí misma, usa **primera persona del plural**: *ordenamos*, *trabajamos*, *vemos*, *te ayudamos*. Nunca tercera persona impersonal ni "nosotros" mayestático.

### Largo de frase

Frases cortas, ritmo rápido. Rara vez más de dos cláusulas por oración. Las subordinadas son la excepción. Sin párrafos densos ni enumeraciones extensas. Ejemplo del sitio:

> "Hacés las cosas bien, pero online no se nota. En Netiza ordenamos tu presencia digital para que te encuentren, entiendan qué hacés en dos minutos y te escriban con confianza." (Hero.astro:16)

Tres ideas, tres golpes. Cada una cabe en un renglón.

### Nivel de tecnicismo

**Cero jerga de agencia.** Si un concepto técnico es inevitable, se traduce al idioma del dueño. No dice "Core Web Vitals": pregunta si el sitio se ve bien en el celular. No dice "GBP optimization": pregunta si la ficha de Google está completa.

La palabra más técnica que el sitio se permite es "inteligencia artificial", y la baja a tierra enseguida:

> "IA donde de verdad ahorra tiempo: responder consultas, armar presupuestos, ordenar información, automatizar lo repetitivo. Sin humo." (QueHacemos.astro:34)

### Cómo nombra al lector

El lector es un **par que sabe de su oficio pero no del mundo digital**. No es "emprendedor" (está explícitamente excluido en ParaQuien.astro). No es "cliente". Es dueño de una pyme, comercio o profesional independiente. El sitio respeta lo que ya hace bien:

> "Si ya estás funcionando pero la web, las redes o los procesos digitales no acompañan, te ayudamos a ponerlo en serio sin proyectos gigantes ni cosas que no vas a usar." (ParaQuien.astro:20)

### Qué NO dice nunca

- **Jerga de agencia**: SEO, posicionamiento, conversión, engagement, CTA, funnel, leads, branding, KPIs, ROI.
- **Promesas infladas**: "resultados garantizados", "fórmula probada", "somos los mejores".
- **Mayúsculas enfáticas ni signos de admiración**: el sitio entero no tiene un solo signo de exclamación.
- **Superlativos vacíos**: no dice "increíble", "espectacular", "revolucionario".
- **Magia**: lo dice explícitamente — "No vendemos magia." (FAQ.astro:42)

### Tono

Colega que te muestra un espejo. Pragmático, directo, sin endulzar pero con respeto. La honestidad no es brutal: es quirúrgica. Reconoce lo que ya funciona antes de señalar lo que falta. Ejemplos del sitio:

| Rasgo | Ejemplo textual | Fuente |
|---|---|---|
| Directo sin agredir | "Tu negocio se ve más chico de lo que es." | Hero.astro:13 |
| Anti-hype | "Sin humo." | QueHacemos.astro:34 |
| Honestidad explícita | "No vendemos magia." | FAQ.astro:42 |
| Reconoce lo bueno | "Lo bueno no se vende solo. Primero tiene que verse claro." | ElProblema.astro:10 |
| Respeta el oficio ajeno | "Hacés las cosas bien, pero online no se nota." | Hero.astro:16 |
| Filtra, no endulza | "no trabajamos con quien solo busca «un logo», «una web rapidita» o la fórmula de turno." | ParaQuien.astro:23 |

---

## 2. Las 12 preguntas

### Dimensión 1 — ¿Te encuentran?

Qué mide: si tu negocio aparece cuando alguien te busca en Google, y si lo que aparece está completo y actualizado.

---

#### Pregunta 1

**Cuando buscás el nombre de tu negocio en Google desde el celular, ¿qué ves?**

| Opción | Puntaje |
|---|---|
| Aparece una ficha con mis datos, mi dirección, mi teléfono y mis fotos. | 100 |
| Aparece una ficha pero le faltan datos o tiene información vieja. | 67 |
| Aparece mi negocio en los resultados azules, pero no hay ficha con foto ni mapa. | 33 |
| No aparece, o aparece el negocio de otro con un nombre parecido. | 0 |

**Criterio objetivo**: existencia y completitud del Perfil de Negocio de Google (ficha de Google Maps).  
**Umbral**: ficha completa y verificada → 100; ficha existente pero incompleta → 67; presencia solo orgánica sin ficha → 33; sin presencia en Google → 0.  
**Fuente**: Whitespark 2026 — la categoría primaria correcta y la ficha completa son el factor #1 del local pack.

---

#### Pregunta 2

**Si alguien busca tu negocio un domingo a la tarde, ¿los horarios que aparecen en Google son los que manejás realmente?**

| Opción | Puntaje |
|---|---|
| Sí, están al día y los actualizo cada vez que cambia algo, incluidos feriados. | 100 |
| Están pero no los actualicé en el último año; algún día feriado puede estar mal. | 67 |
| Los puse cuando armé la ficha y nunca más los miré. | 33 |
| No tengo horarios publicados, o no tengo ficha de Google. | 0 |

**Criterio objetivo**: exactitud y vigencia de los horarios publicados en el Perfil de Negocio de Google.  
**Umbral**: horarios actualizados con mantenimiento activo → 100; actualizados sin mantenimiento de excepciones → 67; publicados una sola vez y abandonados → 33; sin horarios → 0.  
**Fuente**: Whitespark 2026 — los horarios reales al momento de la búsqueda son el 5º factor de Maps; la visibilidad se degrada en la última hora antes de cerrar.

---

#### Pregunta 3

**¿Cuándo fue la última vez que subiste una foto o actualizaste algo en tu ficha de Google?**

| Opción | Puntaje |
|---|---|
| Subo fotos, novedades u ofertas todas las semanas, o al menos una vez por mes. | 100 |
| Subí algunas fotos, pero la última fue hace varios meses. | 67 |
| Puse el logo o una foto de la vidriera cuando armé la ficha y nunca más la toqué. | 33 |
| No tengo ficha, o la tengo pero sin ninguna foto. | 0 |

**Criterio objetivo**: frecuencia de actividad (fotos, publicaciones, actualizaciones) en el Perfil de Negocio de Google.  
**Umbral**: mensual o más frecuente → 100; actividad en los últimos 6 meses → 67; una sola vez al crear la ficha → 33; sin fotos → 0.  
**Fuente**: Whitespark 2026 — dirección física visible, fotos recientes y señales de actividad son factores confirmados del local pack.

---

### Dimensión 2 — ¿Te entienden?

Qué mide: si alguien que no te conoce entra a tu sitio o a tus redes y entiende en segundos qué hacés, para quién y cómo te contacta.

---

#### Pregunta 4

**¿Tenés una página en tu sitio que explique cada cosa que ofrecés, por separado?**

| Opción | Puntaje |
|---|---|
| Sí, cada cosa que ofrezco tiene su página, con información distinta y específica. | 100 |
| Tengo una página de servicios que las menciona todas juntas, pero no una por una. | 67 |
| En mi sitio nombre lo que hago, pero está todo en la misma página de inicio. | 33 |
| No tengo sitio, o lo que tengo no dice claramente qué ofrezco. | 0 |

**Criterio objetivo**: existencia de páginas dedicadas por cada línea de servicio o producto.  
**Umbral**: página por servicio → 100; página agrupada → 67; solo mención en home → 33; sin sitio o sin información de servicios → 0.  
**Fuente**: Whitespark 2026 — una página dedicada por cada servicio es el factor orgánico local #1.

---

#### Pregunta 5

**¿Alguna vez le mostraste tu sitio o tu Instagram a alguien que no conoce tu negocio y le preguntaste qué entendió?**

| Opción | Puntaje |
|---|---|
| Sí, más de una vez. Y cambié cosas según lo que me dijeron. | 100 |
| Sí, una vez. Pero después no modifiqué nada. | 67 |
| No se lo mostré a nadie de afuera; solo lo vemos nosotros. | 33 |
| No tengo sitio web. | 0 |

**Criterio objetivo**: realización de pruebas de claridad con personas ajenas al negocio.  
**Umbral**: testeado e iterado → 100; testeado sin acción posterior → 67; no testeado → 33; sin sitio → 0.  
**Fuente**: Principio de usabilidad (Nielsen) — quien diseña no puede evaluar su propia claridad; hace falta un tercero. El copy del sitio insiste en "que se entienda en dos minutos" (Hero.astro:17).

---

#### Pregunta 6

**Si alguien quiere saber tu dirección, tu horario y tu teléfono, ¿lo encuentra en tu sitio sin tener que scrollear ni buscar?**

| Opción | Puntaje |
|---|---|
| Sí, está todo junto y se ve apenas abre la página, en la compu y en el celular. | 100 |
| Está, pero en páginas distintas o hay que bajar para encontrarlo. | 67 |
| Algunos datos están y otros no, o cambian según dónde los busque. | 33 |
| No tengo sitio, o no publiqué dirección, horario ni teléfono en ningún lado. | 0 |

**Criterio objetivo**: accesibilidad inmediata de los datos de contacto y ubicación en el sitio web.  
**Umbral**: visibles sin interacción en todas las páginas → 100; accesibles en página de contacto → 67; inconsistentes o incompletos → 33; ausentes → 0.  
**Fuente**: Principio de usabilidad — información de contacto debe ser inmediata. Proxy verificable del requisito de datos estructurados `LocalBusiness` (SOCi), que exige que los datos estén organizados y accesibles.

---

### Dimensión 3 — ¿Te escriben?

Qué mide: si tu sitio, tus redes y tus canales de contacto están armados para que la gente te escriba sin fricción.

---

#### Pregunta 7

**Si entrás a tu propio sitio desde el celular ahora mismo, ¿qué tan fácil es que alguien te escriba?**

| Opción | Puntaje |
|---|---|
| Tiene un botón de WhatsApp o un formulario que se ve apenas abre, sin hacer nada más. | 100 |
| Hay que tocar "Contacto" en el menú para llegar al formulario o al número. | 67 |
| El número está escrito pero no es un botón: la persona lo tiene que copiar y pegar. | 33 |
| Mi sitio no tiene forma de que me contacten, o no tengo sitio. | 0 |

**Criterio objetivo**: cantidad de pasos entre abrir el sitio y poder enviar un mensaje.  
**Umbral**: cero pasos → 100; un paso (menú → contacto) → 67; fricción manual → 33; sin canal → 0.  
**Fuente**: Principio de usabilidad — cada paso extra entre la intención y la acción reduce la tasa de contacto (NN Group). El propio sitio de Netiza tiene WhatsApp visible desde el hero.

---

#### Pregunta 8

**Cuando alguien te hace una consulta por WhatsApp, Instagram o el formulario de tu sitio, ¿cuánto tarda en recibir una primera respuesta tuya, aunque sea un "lo veo y te confirmo"?**

| Opción | Puntaje |
|---|---|
| En el mismo día, casi siempre en menos de un par de horas. | 100 |
| En el día, pero a veces se pasa para el día siguiente. | 67 |
| Depende; hay consultas que respondo a los dos o tres días. | 33 |
| No recibo consultas por canales digitales, o las veo cada tanto y se me pasan. | 0 |

**Criterio objetivo**: tiempo transcurrido hasta la primera respuesta a una consulta entrante.  
**Umbral**: menos de 4 horas → 100; mismo día → 67; más de 24 horas → 33; sin canal digital de consultas → 0.  
**Fuente**: Expectativa contemporánea de inmediatez en mensajería. La opción 0 incluye como atenuante que el dueño no tenga canal digital, evitando humillar a quien ni siquiera compite en ese carril.

---

#### Pregunta 9

**Abrís tu sitio en el celular. ¿Tenés que hacer zoom o mover la pantalla para los costados para leer algo?**

| Opción | Puntaje |
|---|---|
| No. Todo se lee bien, las letras son cómodas, no hay que agrandar ni deslizar nada. | 100 |
| Casi todo se ve bien, pero alguna foto o tabla me obliga a deslizar para los costados. | 67 |
| Se ve chico, tengo que hacer zoom para leer los textos. | 33 |
| Mi sitio no se adapta al celular, o no tengo sitio. | 0 |

**Criterio objetivo**: adaptación del sitio a pantallas de dispositivo móvil (responsive design).  
**Umbral**: completamente responsive sin scroll horizontal → 100; mayormente responsive con excepciones → 67; no responsive → 33; sin sitio → 0.  
**Fuente**: Google — mobile-first indexing; un sitio que no funciona en celular pierde visibilidad incluso en búsquedas de escritorio.

---

### Dimensión 4 — ¿Te siguen eligiendo?

Qué mide: si los clientes que ya te conocieron confían, vuelven y te recomiendan.

---

#### Pregunta 10

**Si buscás tu negocio en Google, ¿cuántas reseñas de clientes aparecen?**

| Opción | Puntaje |
|---|---|
| Más de 20 reseñas. | 100 |
| Entre 10 y 20 reseñas. | 67 |
| Tengo algunas, menos de 10. | 33 |
| No tengo reseñas de clientes, o tengo 3 o menos. | 0 |

**Criterio objetivo**: cantidad de reseñas publicadas en el Perfil de Negocio de Google.  
**Umbral**: > 20 → 100; 10-20 → 67; 4-9 → 33; ≤ 3 → 0.  
**Fuente**: BrightLocal 2026 — 47% de los consumidores descarta negocios con menos de 20 reseñas; solo el 9% se arriesga con 5 o menos.

---

#### Pregunta 11

**¿Cuál es el promedio de estrellas que te pusieron en Google?**

| Opción | Puntaje |
|---|---|
| 4.5 estrellas para arriba. | 100 |
| Entre 4.0 y 4.4. | 67 |
| Entre 3.0 y 3.9. | 33 |
| Menos de 3 estrellas, o no tengo reseñas. | 0 |

**Criterio objetivo**: promedio de calificación en el Perfil de Negocio de Google.  
**Umbral**: ≥ 4.5 → 100; 4.0-4.4 → 67; 3.0-3.9 → 33; < 3.0 o sin reseñas → 0.  
**Fuente**: BrightLocal 2026 — el 31% de los consumidores descarta un negocio por debajo de 4.5 estrellas.

---

#### Pregunta 12

**De las reseñas que tenés en Google, ¿a cuántas les respondiste?**

| Opción | Puntaje |
|---|---|
| A todas, incluso las que dicen solo "gracias" y las que no son perfectas. | 100 |
| A la mayoría, pero alguna se me pasó. | 67 |
| Solo respondí las negativas para defenderme, o solo las positivas para agradecer. | 33 |
| No respondí ninguna, o no tengo reseñas. | 0 |

**Criterio objetivo**: porcentaje de reseñas con respuesta del negocio.  
**Umbral**: 100% respondidas con respuestas personalizadas → 100; mayoría respondidas → 67; respuesta selectiva → 33; ninguna → 0.  
**Fuente**: BrightLocal 2026 — ignorar reseñas espanta al 42% de consumidores; responder todas atrae al 80%; las respuestas de plantilla repelen al 50%.

---

## 3. Orden de pantallas justificado

### Orden propuesto

| # | Dimensión | Pregunta |
|---|---|---|
| 1 | ¿Te encuentran? | Q1 — Qué ves cuando buscás tu negocio en Google |
| 2 | ¿Te encuentran? | Q2 — Horarios publicados vs. reales |
| 3 | ¿Te encuentran? | Q3 — Última vez que subiste algo a la ficha |
| 4 | ¿Te entienden? | Q4 — Páginas por servicio |
| 5 | ¿Te entienden? | Q6 — Datos de contacto visibles sin buscar |
| 6 | ¿Te entienden? | Q5 — Testeaste con alguien de afuera |
| 7 | ¿Te escriben? | Q7 — Facilidad para que te escriban |
| 8 | ¿Te escriben? | Q9 — Tu sitio se adapta al celular |
| 9 | ¿Te escriben? | Q8 — Cuánto tardás en responder |
| 10 | ¿Te siguen eligiendo? | Q10 — Cuántas reseñas tenés |
| 11 | ¿Te siguen eligiendo? | Q11 — Promedio de estrellas |
| 12 | ¿Te siguen eligiendo? | Q12 — Respondiste las reseñas |

### Justificación

**Las dimensiones siguen el viaje del cliente.** Primero te tienen que encontrar (1-3), después entender qué hacés (4-6), después animarse a escribirte (7-9), y después volver a elegirte (10-12). Invertir este orden —preguntar por reseñas antes que por el botón de WhatsApp— desconcierta porque el dueño no sabe de qué le están hablando.

**Dentro de cada dimensión, las preguntas van de lo menos incómodo a lo más incómodo**:

- Dimensión 1: Q1 pregunta si existís (neutral). Q2 pregunta si tus horarios están bien (revela abandono). Q3 pregunta hace cuánto no tocás la ficha (confirma abandono).
- Dimensión 2: Q4 pregunta por estructura (neutral). Q6 pregunta por datos de contacto (neutral, casi cualquier sitio los tiene). Q5 pregunta si testeaste con un tercero (incómoda — revela que nunca lo hiciste).
- Dimensión 3: Q7 pregunta si tenés botón (neutral). Q9 pregunta si el sitio funciona en celular (neutral). Q8 pregunta cuánto tardás en responder (incómoda — revela demora).
- Dimensión 4: Q10 pregunta cuántas reseñas tenés (neutral, es un número). Q11 pregunta el promedio de estrellas (más personal). Q12 pregunta si respondiste (la más personal — revela una decisión activa de ignorar o un descuido sostenido).

**La pregunta más incómoda es la 12 y va última.** Preguntar "¿respondiste las reseñas?" expone una conducta que el dueño sabe que debería hacer y no hace. No es una circunstancia (no tener reseñas), es una omisión activa. Va al final porque: (a) el abandono ya no cuesta nada (las otras 11 respuestas ya se capturaron y se procesan igual), y (b) si el dueño llegó hasta acá, ya invirtió 10 pantallas de honestidad — tiene el contexto para recibir esta sin sentirse atacado.

**Q8 (tiempo de respuesta) va penúltima dentro de su dimensión**, no en el puesto 12. Es incómoda, pero la de reseñas responde a un criterio mucho más público y permanente: lo que no respondiste queda visible para cualquiera que busque tu negocio. Lo de la respuesta lenta es privado.

---

## 4. Pantalla de resultado

### Puntaje bajo sin humillar

> **Tu diagnóstico está listo**
>
> Tus puntos más fuertes están en [área verde]. Donde más podés mejorar es en [área roja 1] y [área roja 2].
>
> Esto no es una nota. Es una foto de hoy. La mayoría de los negocios que empiezan este diagnóstico tienen resultados parecidos al tuyo, y los que mejoran no son los que sacan puntaje perfecto: son los que agarran un área por vez y la trabajan.

Principios:
- "No es una nota" desactiva el marco mental de examen.
- "La mayoría empieza parecido" normaliza el resultado bajo sin mentir.
- "Un área por vez" baja la presión de tener que arreglar todo junto.
- No se usa la palabra "mal", "desaprobaste", "fallaste" ni "bajo".

### Pedido de mail sin emboscar

> **¿Querés saber qué hacer con lo que te salió rojo?**
>
> Dejame tu nombre y tu mail y te mando una guía gratuita con acciones concretas para cada una de estas áreas, en criollo y sin humo.
>
> En los próximos días te escribo personalmente para comentarte **una** de las áreas y ver si te sirve darle para adelante. Sin compromiso, sin suscripción, sin spam.
>
> [Campo: Nombre]  [Campo: Email]  [Botón: Recibir la guía]

Principios:
- El pedido del mail está condicionado a un interés genuino ("¿querés saber qué hacer?"), no a un truco.
- Se anuncia exactamente qué va a pasar después: guía inmediata + mail personal sin compromiso. No hay letra chica.
- "Sin compromiso, sin suscripción, sin spam" replica el patrón de Contacto.astro ("Sin compromiso" en el hero, Hero.astro:26).
- "En criollo y sin humo" cierra con la firma de Netiza. Si llegaste hasta acá, esta frase te resulta familiar y te da confianza.

---

## 5. Auditoría de voz — Preguntas re-leídas contra el sitio

Se revisaron las 12 preguntas contra dos filtros: las restricciones de la sección 4 del briefing y la guía de voz extraída del sitio. Resultados:

### Palabras prohibidas: cero ocurrencias

Ninguna pregunta contiene: SEO, posicionamiento, conversión, engagement, CTA, funnel, leads, branding, KPIs, ROI, métricas, tráfico, audiencia, alcance, interacción, retención.

### Preguntas que requerían ajuste

**Pregunta 4 (original)**: "¿Tenés una página en tu sitio que explique cada servicio que ofrecés, por separado?"

→ **Problema**: "por separado" tiene un leve tufo a auditoría de contenidos. En el lenguaje del dueño, la pregunta se siente un poco técnica.

→ **Corrección aplicada**: Se reformuló como "cada cosa que ofrecés" en lugar de "cada servicio". El cambio es mínimo pero elimina el registro de consultoría. La palabra "página" es inevitable porque no hay sinónimo que no sea jerga ("landing", "sección", "URL").

**Pregunta 5 (original)**: "¿Alguna vez le pediste a alguien de afuera que entre a tu sitio y te diga qué entendió?"

→ **Problema**: "alguien de afuera" es un calco incómodo. En rioplatense se dice "alguien que no conoce tu negocio".

→ **Corrección aplicada**: "alguien que no conoce tu negocio". También se cambió "le pediste" por "le mostraste" — la acción es más concreta y el dueño puede visualizarla.

### Confirmación de tono

Las 12 preguntas le hablan al dueño de la misma manera que el sitio:
- Usan "tu" consistente con el voseo del sitio ("tu negocio", "tu sitio", "tu ficha").
- "Ficha de Google" replica el término rioplatense que el dueño usa espontáneamente.
- Las preguntas sobre reseñas (10, 11, 12) no juzgan: preguntan hechos, no califican la conducta del dueño.
- La pregunta 8 incluye un atenuante explícito en la opción 0 ("no recibo consultas por canales digitales") que evita castigar a quien ni siquiera está en ese juego, consistente con la restricción 6 del briefing: "nada que avergüence gratis."

---

## Resumen ejecutivo

- **Guía de voz**: Netiza habla en voseo, frases cortas, cero jerga, tono de colega que muestra un espejo sin humillar. Las 12 preguntas heredan esa voz.
- **Preguntas**: 3 por dimensión, 100% verificables con criterio objetivo y fuente. Cero vocabulario prohibido. Contestables de memoria o mirando el celular (11 de 12); la 12ª admite otra pestaña por excepción expresa del briefing.
- **Orden**: recorrido del cliente (encontrar → entender → escribir → volver), con incomodidad creciente dentro de cada bloque y la pregunta más expuesta al final.
- **Resultado**: normaliza el puntaje bajo, pide el mail condicionado a interés genuino, anuncia qué va a pasar después sin letra chica.

## Pendientes

- Cruzar este draft con los otros dos drafts independientes para la versión final.
- Validar con el dueño de Netiza si la pregunta 12 es efectivamente la más incómoda o si hay otra que toca una fibra más sensible en el público real.
- Definir el diseño visual de la pantalla de resultado (barras de colores, íconos por dimensión, tono visual del score).

## Guardado en engram

Se guardaron los hallazgos de voz y tono extraídos del sitio para referencia cruzada en sesiones futuras.
