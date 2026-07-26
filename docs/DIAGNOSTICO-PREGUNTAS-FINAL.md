# Diagnóstico de presencia digital — versión final

> Set definitivo de preguntas, opciones, puntajes y copy de resultado para `/diagnostico`.
> Consolidado a partir de seis drafts independientes (Grok, Agy, Kilo, Codex, Opencode, Cloe)
> más una auditoría del conjunto. Reemplaza a los drafts de `docs/research/`.
> Contexto y decisiones: `docs/BRIEFING-DIAGNOSTICO.md`. Última actualización: 2026-07-26.

## Estructura

- **12 preguntas puntuadas**, 3 por dimensión, una por pantalla, con barra de progreso.
- **2 preguntas sin puntaje** en la pantalla de resultado, dentro del mismo formulario que
  pide el mail, para que viajen en el mismo POST.
- Cada pregunta puntuada tiene 4 niveles de puntaje: **0, 1, 2, 3**.

---

## Dimensión 1 — ¿Te encuentran?

### P1 · Tu ficha de Google

**Texto:** Buscá el nombre de tu negocio en Google desde el celular. ¿Qué ves?

| Opción | Pts |
|---|---|
| No aparece ninguna ficha del negocio, o no estoy seguro de tener una | 0 |
| Aparece una ficha, pero el rubro que dice no describe bien lo que hago | 1 |
| Aparece con el rubro correcto, aunque falten datos (dirección, teléfono o web) | 2 |
| Aparece con el rubro correcto, y el nombre, la dirección y el teléfono coinciden con lo real | 3 |

**Criterio:** existencia del perfil de negocio + categoría primaria alineada al rubro real + consistencia de nombre, dirección y teléfono.
**Umbral:** categoría correcta **y** datos coherentes con la realidad.
**Fuente:** Whitespark 2026 — categoría primaria como factor #1 del local pack.

---

### P2 · Cuando te busca alguien que no te conoce

**Texto:** Ahora buscá tu rubro más tu ciudad, como lo buscaría alguien que no sabe que existís (por ejemplo: "ferretería Mercedes"). ¿Dónde aparecés?

| Opción | Pts |
|---|---|
| No aparezco por ningún lado | 0 |
| Aparezco, pero hay que bajar bastante para encontrarme | 1 |
| Aparezco en la primera pantalla, entre varios | 2 |
| Aparezco entre los tres primeros del mapa | 3 |

**Criterio:** posición en el local pack para la búsqueda de descubrimiento (rubro + zona), no para la búsqueda de marca.
**Umbral:** aparecer en los tres primeros resultados del mapa.
**Fuente:** Whitespark 2026 — el local pack son los tres primeros resultados del mapa; la proximidad es uno de los factores de mayor peso.

**Micro-copy obligatorio bajo la pregunta:**
> Hacelo desde tu local o tu casa. Ahí Google te favorece por cercanía, así que este es tu mejor escenario posible.

**Por qué ese micro-copy no es opcional:** la proximidad del que busca es un factor de ranking de primer orden. El dueño buscando desde su propio local se ve mejor de lo que lo ve un cliente del otro lado de la ciudad. Decirlo hace dos cosas: mantiene el diagnóstico honesto, y vuelve más contundente el resultado malo — si ni siquiera en el mejor escenario aparece, el problema es serio.

---

### P3 · Horarios y disponibilidad

**Texto:** Los horarios de atención que figuran en tu ficha, ¿coinciden con cómo estás atendiendo esta semana? Si trabajás con turnos, contestá pensando en cómo se piden.

| Opción | Pts |
|---|---|
| No tengo horarios cargados, o no sé qué dice la ficha | 0 |
| Están cargados, pero al menos un día de esta semana no coincide | 1 |
| Coinciden con la semana habitual, aunque no toco feriados ni excepciones | 2 |
| Coinciden, y cuando hay feriado o cambio especial lo actualizo en la ficha | 3 |

**Criterio:** paridad entre lo publicado y la operación real de la semana en curso.
**Umbral:** horarios correctos **y** hábito de actualizar excepciones.
**Fuente:** Whitespark 2026 — horarios reales al momento de la búsqueda; la visibilidad se degrada cerca del horario de cierre.
**Nota de transversalidad:** la coletilla de turnos es lo que evita que la pregunta colapse para estudios profesionales sin atención al público espontánea.

---

## Dimensión 2 — ¿Te entienden?

### P4 · Algo escrito, no solo fotos

**Texto:** Además de fotos en redes, ¿tenés algún lugar propio donde esté escrito con palabras qué hacés y en qué ciudad?

| Opción | Pts |
|---|---|
| No: lo que hay son fotos en Instagram o Facebook, sin explicación escrita | 0 |
| Solo la descripción corta de la ficha de Google | 1 |
| Tengo sitio web, aunque el texto está viejo o incompleto | 2 |
| Tengo sitio web con el texto al día, o una ficha de Google completa y descriptiva | 3 |

**Criterio:** existencia de un artefacto textual legible, propio, fuera de plataformas de imagen.
**Umbral:** contenido escrito, vigente y descriptivo, en web o ficha.
**Fuente:** Whitespark 2026 / SOCi — relevancia semántica y completitud del perfil.
**Por qué existe:** captura al segmento enorme de pymes argentinas cuya única presencia digital es un Instagram con fotos y cero texto.

---

### P5 · Rubro y zona en la primera vista

**Texto:** En la primera pantalla de tu web —o de tu ficha, si no tenés web—, ¿se leen escritos a qué te dedicás y en qué ciudad, sin metáforas ni solo el nombre de fantasía?

| Opción | Pts |
|---|---|
| No tengo dónde mirar eso | 0 |
| Solo se ve el nombre del negocio; no dice a qué se dedica | 1 |
| Se ve a qué me dedico, pero no la ciudad ni la zona | 2 |
| Se leen las dos cosas: a qué me dedico y en qué ciudad o zona | 3 |

**Criterio:** presencia literal de dos elementos observables —categoría en lenguaje de cliente y ancla geográfica— en el primer viewport móvil.
**Umbral:** ambos presentes sin hacer scroll.
**Fuente:** dirección de Whitespark/SOCi sobre claridad de entidad local. Los frameworks de mensaje se usaron solo para traducir a chequeable (decisión 10 del briefing); no se citan al usuario.
**Por qué está redactada así:** *"¿tu mensaje es claro?"* es opinión disfrazada de pregunta — nadie se pone un 2. Al pedir dos cadenas de texto observables, la respuesta pasa a ser un hecho: se lee o no se lee.

---

### P6 · Cómo está organizado lo que ofrecés

**Texto:** Lo que ofrecés —servicios, productos o rubros—, ¿está separado y explicado uno por uno, o está todo junto en el mismo lugar?

| Opción | Pts |
|---|---|
| No está explicado en ningún lado | 0 |
| Está todo junto, en un solo texto o una sola lista | 1 |
| Los principales están separados; el resto está mezclado | 2 |
| Cada uno tiene su propio espacio con nombre y explicación, sea en la web, en la ficha de Google o en destacados de Instagram | 3 |

**Criterio:** estructura de la oferta = un destino dedicado por cada línea principal.
**Umbral:** cobertura completa de las líneas principales, en cualquier soporte propio.
**Fuente:** Whitespark 2026 — página dedicada por servicio como factor orgánico local #1.

**Dos correcciones deliberadas sobre el draft original:**
1. Dice **"servicios, productos o rubros"**. La versión anterior decía solo "servicio", y una ferretería no tiene servicios: tiene productos. Leer "servicio" tres veces le avisa al ferretero que el diagnóstico no es para él.
2. Las opciones (c) y (d) admiten **ficha de Google y destacados de Instagram**, no solo web. Sin eso, quien contesta "no tengo web" en P4 sacaba 0 automático acá también: dos preguntas midiendo la misma carencia y castigando doble al que peor está.

---

## Dimensión 3 — ¿Te escriben?

### P7 · Contacto en uno o dos toques

**Texto:** Desde el celular, mirando tu web o tu ficha, ¿se puede abrir un WhatsApp o llamarte con uno o dos toques?

| Opción | Pts |
|---|---|
| No hay una forma clara de contactarme desde ahí | 0 |
| El número está escrito, pero hay que copiarlo a mano | 1 |
| Hay botón o enlace, pero a veces falla o cuesta encontrarlo | 2 |
| Un toque abre el WhatsApp o el teléfono, sin vueltas | 3 |

**Criterio:** existencia de un camino de contacto accionable en móvil (tap-to-call / tap-to-WhatsApp).
**Umbral:** un gesto, estable.
**Fuente:** umbral de usabilidad de conversión, alineado en espíritu a Page Experience (Google/web.dev). No es factor de ranking y no se presenta como tal.

---

### P8 · Velocidad con datos móviles

**Texto:** Apagá el wifi del celular y abrí tu web con datos. Contá mentalmente mientras carga.

| Opción | Pts |
|---|---|
| No tengo web, o tarda más de 6 segundos, o queda la pantalla en blanco un rato largo | 0 |
| Entre 4 y 6 segundos | 1 |
| Entre 2 y 3 segundos, pero los textos y botones se mueven de lugar mientras carga | 2 |
| Abre casi al instante y se lee bien desde el primer segundo | 3 |

**Criterio:** velocidad de carga percibida y estabilidad visual en condiciones reales de red móvil.
**Umbral:** contenido principal visible en menos de 2,5 segundos, sin desplazamientos de layout.
**Fuente:** Google / web.dev — LCP < 2,5 s y CLS < 0,1, medidos en percentil 75 de usuarios reales.

**Límite declarado:** un conteo mental en el celular del propio dueño **no es** el percentil 75 de usuarios reales. Por eso las bandas son anchas: a esta granularidad, contar alcanza para separar "terrible" de "bien", que es todo lo que este diagnóstico necesita. No se le promete precisión al usuario ni se nombran las métricas técnicas.

---

### P9 · Quién contesta y cuándo

**Texto:** Cuando llega un mensaje al negocio —WhatsApp, Instagram o formulario—, ¿quién lo contesta y cuándo?

| Opción | Pts |
|---|---|
| Nadie los mira con regularidad | 0 |
| Los miro cuando me acuerdo | 1 |
| Los reviso todos los días hábiles, aunque a veces conteste de noche | 2 |
| Hay alguien a cargo y se contestan dentro del día hábil, en un horario más o menos fijo | 3 |

**Criterio:** existencia de un responsable nombrable + ventana de respuesta intradía.
**Umbral:** ambos hechos organizativos presentes.
**Fuente:** criterio operativo de generación de conversación comercial. Evita deliberadamente *"¿respondés rápido?"*, que es autoimagen.
**Reserva conocida:** es de las dos más falseables por optimismo, junto con P3. Contención: sola no alcanza para pintar una dimensión de verde, porque hace falta un crudo ≥ 8 sobre 9.

---

## Dimensión 4 — ¿Te siguen eligiendo?

### P10 · Cantidad de reseñas

**Texto:** ¿Cuántas reseñas públicas tenés hoy en Google?

| Opción | Pts |
|---|---|
| Ninguna, o no sé | 0 |
| Entre 1 y 5 | 1 |
| Entre 6 y 19 | 2 |
| 20 o más | 3 |

**Criterio:** conteo entero de reseñas públicas en el perfil.
**Umbral:** 20 o más.
**Fuente:** BrightLocal 2026 — piso de 20 reseñas. Se usa la dirección del hallazgo, nunca la cifra, porque el estudio es de mercado estadounidense.
**Nota de transversalidad:** el techo está en 20 y no en 50 a propósito. Un estudio profesional puede llegar a 20; a 50 no llega nunca, y ponerle ese techo lo condenaba a rojo permanente por su rubro y no por su desempeño.

---

### P11 · Promedio de estrellas

**Texto:** ¿Cuál es el promedio de estrellas de tu ficha de Google?

| Opción | Pts |
|---|---|
| No tengo reseñas | 0 |
| Menos de 4,0 | 1 |
| Entre 4,0 y 4,4 | 2 |
| 4,5 o más | 3 |

**Criterio:** calificación media publicada.
**Umbral:** 4,5 o más.
**Fuente:** BrightLocal 2026 — umbral de 4,5 estrellas. Dirección del hallazgo, no la cifra.

---

### P12 · Frescura y respuesta

**Texto:** Sobre tus reseñas de Google, ¿cuál te describe mejor hoy?

| Opción | Pts |
|---|---|
| No tengo reseñas, o no las miro nunca | 0 |
| Tengo reseñas, pero la última es de hace más de tres meses | 1 |
| Tengo reseñas de los últimos tres meses, pero no las contesto | 1 |
| Tengo reseñas recientes y contesto algunas | 2 |
| Tengo reseñas recientes y las contesto todas, con un texto distinto cada vez | 3 |

**Criterio:** recencia ≤ 90 días **y** tasa de respuesta con texto no genérico.
**Umbral:** ambos ejes en el techo.
**Fuente:** BrightLocal 2026 — recencia menor a tres meses; responder el 100% de las reseñas; las respuestas de plantilla repelen. Dirección del hallazgo, no las cifras.

**Excepción declarada a la regla de 3-4 opciones:** esta pregunta tiene 5 opciones sobre 4 niveles de puntaje. La versión anterior fusionaba en una sola opción *"hace más de tres meses **o** no las contesto"*, y esa disyunción hacía imposible saber, mirando el mail en el inbox, cuál de las dos mitades estaba rota. Ese es exactamente el dato que se necesita para escribir el mail de las 48-72 horas. Se rompe la regla a conciencia porque el costo de no romperla cae sobre la única acción comercial del sistema.

---

## Las dos preguntas sin puntaje

Van en la **pantalla de resultado**, arriba de los campos de nombre y mail, dentro del mismo
formulario. Así viajan en el mismo POST y no hace falta un segundo envío.

> **Dos últimas, y estas no puntúan.**
>
> **A.** En los últimos 30 días, ¿alguien te escribió o te llamó diciendo que te encontró por Google, Maps o redes?
> · No, o no me doy cuenta de dónde vienen · Alguna vez · Varias veces · Casi todas las semanas
>
> **B.** Preguntale a ChatGPT, Gemini o Copilot quién hace lo tuyo en tu ciudad. ¿Te nombra?
> · No me nombra · Solo si le doy mi nombre exacto · Me nombra entre varios · Me recomienda entre los primeros

**Por qué no puntúan, y es la decisión menos obvia del documento:**

- **La A es un resultado, no una causa.** Si las doce preguntas anteriores dieron mal, esta da mal por consecuencia. Puntuarla no agrega información: amplifica en la dirección que el resto ya marcó. Amplificar hacia abajo es deflar el puntaje, que es lo mismo que inflarlo pero al revés — y la decisión 6 del briefing exige un puntaje honesto en las dos direcciones.
- **La B no es determinista.** Preguntale dos veces a un modelo y te contesta distinto. Un criterio cuya respuesta cambia entre consultas no puede sostener un puntaje que prometimos verificable.

Las dos siguen valiendo oro, pero por otra vía: son el mejor material para abrir el mail personal de las 48-72 horas, porque tocan algo que el dueño no había mirado nunca.

---

## Modelo de puntaje

| Capa | Regla |
|---|---|
| Opción | 0 · 1 · 2 · 3 |
| Crudo por dimensión | suma de sus 3 preguntas → 0 a 9 |
| Dimensión mostrada | ≤2 → **0** · ≤4 → **33** · ≤7 → **67** · ≥8 → **100** |
| Puntaje general | promedio simple de las 4 dimensiones |
| Semáforo general | rojo < 42 · amarillo < 75 · verde ≥ 75 |
| Área en rojo | dimensión ≤ 33, con independencia del general |

**Corrección aplicada sobre la proyección original.** El draft de Grok proyectaba `≤5 → 33`, con lo cual un negocio con 5 sobre 9 —el 56%— se pintaba rojo. Eso es deflación, y la decisión 6 corta para los dos lados: un puntaje deshonesto por castigador es tan malo como uno inflado, y encima destruye la credibilidad frente a quien sabe que no está tan mal.

Grok detectó la tensión pero propuso la perilla equivocada: bajar el corte general de 42 a 33. Con la proyección corregida, el perfil "regular" cae en amarillo por sí solo y **el corte general de 42 no se toca**. Se arregla la proyección, no el umbral.

**Invariante que el sistema debe cumplir:** se puede estar verde en general y tener un flanco rojo. Tres dimensiones en 100 y una en 0 dan un general de 75 —verde— con un área roja marcada. Ese caso es el ideal para el mail personal: el dueño se lleva un reconocimiento y un problema concreto.

---

## Pantalla de resultado

### Cómo se muestra un puntaje bajo

> **Tu diagnóstico está listo**
>
> Tus puntos más fuertes están en **[área verde]**. Donde más podés mejorar es en **[área roja 1]** y **[área roja 2]**.
>
> Esto no es una nota. Es una foto de hoy. La mayoría de los negocios que arrancan este diagnóstico tienen resultados parecidos al tuyo, y los que mejoran no son los que sacan puntaje perfecto: son los que agarran un área por vez y la trabajan.

Principios: "no es una nota" desactiva el marco de examen; "la mayoría arranca parecido" normaliza sin mentir; "un área por vez" baja la presión. No se usan las palabras *mal*, *bajo*, *fallaste* ni *desaprobaste*.

### Cómo se pide el mail

> **¿Querés saber qué hacer con lo que te salió rojo?**
>
> Dejame tu nombre y tu mail y te muestro una guía con acciones concretas para cada una de estas áreas, en criollo y sin humo.
>
> En los próximos días te escribo personalmente para comentarte **una** de las áreas y ver si te sirve darle para adelante. Sin compromiso, sin suscripción, sin spam.

**La línea del medio es la más importante de todo el documento.** Anunciar el contacto personal *antes* de que deje el mail es lo que desactiva el problema de emboscada: cuando lo llames en 48-72 horas no vas a ser un vendedor apareciendo de la nada, vas a ser alguien cumpliendo lo que avisó. Sin esa línea, todo el diseño de la decisión 2 se cae.

---

## Notas de implementación

1. **Orden de pantallas:** P1 → P2 → P3 → P5 → P4 → P6 → P7 → P8 → P9 → P10 → P11 → P12. Dentro de cada dimensión va primero la más fácil de contestar. P1 y P2 quedan juntas porque las dos son búsquedas y se hacen de corrido.
2. **Entrega del PDF:** el link se revela en la pantalla de resultado tras `success: true`. **No** hay autorespuesta por mail — `_autoresponse` de FormSubmit es incompatible con el modo AJAX, verificado empíricamente (ver `docs/research/formsubmit-autoresponse-verificacion.md`). El mail personal de las 48-72 horas vuelve a incluir el link.
3. **Regenerar el PDF:** el archivo `public/assets/diagnostico-guia.pdf` se genera desde `docs/PDF-GUIA-DIAGNOSTICO.md` con `python scripts/build-guia-pdf.py` (requiere `pip install reportlab`). **Correrlo cada vez que cambie el markdown**, o el PDF publicado queda desfasado de su fuente. El script corta el documento en el marcador `## Nota de proceso` y **aborta si no lo encuentra**: esa sección es la autoauditoría interna del agente que redactó la guía y nunca puede llegar al cliente.
3. **Payload:** hay que enviar las **respuestas crudas** de las 12 preguntas más las 2 sin puntaje, no solamente el puntaje general. El mail personal se escribe sobre una respuesta concreta, no sobre un número.
4. **Eventos:** `diagnostico_start`, `diagnostico_complete` y `diagnostico_lead`, siguiendo el patrón de tracker delegado que ya existe en `src/components/Analytics.astro`.
5. **Pendiente antes de publicar:** validar el copy de las opciones con dos o tres dueños de pyme reales. No se les pregunta si les gusta; se les pregunta qué entendieron.
