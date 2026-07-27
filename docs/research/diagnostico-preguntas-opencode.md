# Diagnóstico Netiza — Prueba de transversalidad por rubro (Opencode)

**Fecha:** 2026-07-26  
**Agente:** gentle-orchestrator (subagentes: general ×3)  
**Contexto:** Netiza — pymes establecidas del interior de Buenos Aires (Mercedes y zona). Decisión 3 del briefing (transversalidad por rubro) puesta a prueba.

---

## 1. Los tres sets por perfil

### Perfil A — Ferretería con local a la calle (convincing-olive-lemming)
**Negocio modelado:** Ferretería en Mercedes. Vende presencia física, stock y vidriera. Cliente camina o busca "ferretería cerca de mí".

**Dimensión 1 — ¿Te encuentran?**
- P1: Cuando alguien busca "ferretería" en Google Maps desde Mercedes, ¿tu negocio aparece entre los primeros resultados?
- P2: Los horarios que figuran en tu ficha de Google, ¿coinciden con los horarios reales de tu negocio?
- P3: ¿Tenés fotos de tu negocio en la ficha de Google? (fachada, vidriera, productos)

**Dimensión 2 — ¿Te entienden?**
- P4: Alguien que no conoce tu negocio, ¿puede ver en internet qué productos vendés antes de ir al local?
- P5: En tu ficha de Google o redes sociales, ¿hay una descripción clara de qué vende tu negocio y a quién atiende?
- P6: ¿Tenés cargados los productos o categorías principales en tu ficha de Google?

**Dimensión 3 — ¿Te escriben?**
- P7: Alguien que te encuentra en Google Maps, ¿te puede escribir por WhatsApp directamente desde la ficha?
- P8: ¿Cuánto tardás en contestar un mensaje de WhatsApp de alguien que te escribe por primera vez?
- P9: Si tenés sitio web, abrilo en el celular. ¿Se carga bien y se puede navegar sin esperar? (última — proxy Core Web Vitals)

**Dimensión 4 — ¿Te siguen eligiendo?**
- P10: ¿Cuántas reseñas tenés en Google?
- P11: ¿Cuál es tu puntaje promedio en Google?
- P12: ¿Cuándo fue la última reseña que recibiste en Google?

**Fricciones reportadas por el subagente:**
- Todas las dimensiones fueron NATURALES para el perfil.
- P4, P6 y P3 colapsan para B (estudio sin local a la calle) y pierden especificidad en C.
- P9 (rendimiento web) es útil pero muchas ferreterías no tienen sitio web.

---

### Perfil B — Escribano público (faint-moccasin-basilisk)
**Negocio modelado:** Escribano en Mercedes. Sin local a la calle. Clientes por recomendación y turno. No hay vidriera ni tránsito peatonal.

**Dimensión 1 — ¿Te encuentran?**
- 1.1: Si alguien busca "escribano en Mercedes" en Google Maps, ¿aparecés en los resultados?
- 1.2: Tu ficha de Google, ¿dice que sos escribano? (categoría correcta + datos completos)
- 1.3: ¿Cuándo fue la última vez que actualizaste tu ficha de Google?

**Dimensión 2 — ¿Te entienden?**
- 2.1: ¿Tenés página web con información sobre tu estudio? (páginas por servicio)
- 2.2: En tu ficha de Google, ¿detallás los servicios que ofrecés?
- 2.3: En tu ficha de Google, ¿aparece tu nombre completo y tu matrícula profesional?

**Dimensión 3 — ¿Te escriben?**
- 3.1: En tu ficha de Google, ¿aparece un número de WhatsApp o teléfono para contactarte?
- 3.2: Cuando alguien te escribe por WhatsApp, ¿suele decirte qué necesita o solo te saluda?
- 3.3: ¿Desde tu web se puede iniciar una consulta directamente?

**Dimensión 4 — ¿Te siguen eligiendo?**
- 4.1: ¿Cuántas reseñas tenés en Google?
- 4.2: ¿Cuándo recibiste tu última reseña en Google?
- 4.3: Si alguien te deja una reseña negativa en Google, ¿qué hacés? (responderlas)

**Fricciones reportadas por el subagente:**
- Dimensión 1: NATURAL (la ficha de Google es su "frente" digital).
- Dimensión 2: NATURAL (servicios diferenciados + matrícula como señal de confianza).
- Dimensión 3: LIGERAMENTE FORZADA (P3.2 es más opinable; el tiempo de respuesta importa menos que en A/C).
- Dimensión 4: NATURAL (reseñas = boca a boca digital).
- Preguntas que colapsan para otros perfiles: 2.1 (páginas por servicio), 2.3 (matrícula), 3.2 (aclarar trámite).

---

### Perfil C — Parrilla / Restaurante con alta rotación (entitled-amaranth-worm)
**Negocio modelado:** Parrilla de barrio en Mercedes (8 años). Vive de reseñas, horarios y estar abierto. Competencia alta los fines de semana.

**Dimensión 1 — ¿Te encuentran?**
- P1: Tu restaurante tiene una ficha en Google Maps. ¿Los horarios que figuran ahí coinciden con los horarios reales de tu restaurante?
- P2: Las fotos de tu restaurante en Google Maps, ¿son fotos recientes de tu comida, tu salón o tu carta?
- P3: La categoría principal de tu ficha de Google, ¿dice lo que realmente hacés? (Parrilla, Restaurante, etc.)

**Dimensión 2 — ¿Te entienden?**
- P4: ¿Tenés una página web donde la gente pueda ver tu carta o menú antes de ir?
- P5: En tu ficha de Google o en tu web, ¿hay una descripción que diga qué tipo de comida hacés?
- P6: ¿Tu carta o menú online muestra los precios?

**Dimensión 3 — ¿Te escriben?**
- P7: ¿Tu ficha de Google tiene un botón de WhatsApp o un número de teléfono visible para que te contacten?
- P8: Cuando alguien te escribe por WhatsApp para hacer una reserva o una pregunta, ¿en cuánto tiempo contestás?
- P9: ¿Tenés una forma de que la gente reserve mesa o haga un pedido desde el celular, sin tener que llamar?

**Dimensión 4 — ¿Te siguen eligiendo?**
- P10: ¿Cuándo fue la última reseña que recibiste en Google Maps?
- P11: ¿Tu promedio de calificación en Google Maps es de 4,5 estrellas o más?
- P12: ¿Respondés a las reseñas que te dejan en Google Maps?

**Fricciones reportadas por el subagente:**
- Todas las dimensiones NATURALES (con matiz en Dimensión 2: la carta es el corazón; las preguntas 5 y 6 son útiles pero menos críticas que la carta misma).
- P4, P6, P8, P9 colapsan para B (estudio sin carta ni reservas de mesa) y pierden especificidad en A.
- P8 (tiempo de respuesta) es crítico para gastronomía; para un estudio con agenda es menos urgente.

---

## 2. Las 12 preguntas consolidadas

Se presenta la versión que maximiza la supervivencia transversal. Se indica explícitamente dónde hubo compromiso.

### Dimensión 1 — ¿Te encuentran?

**Pregunta 1**  
Si alguien busca tu rubro + tu ciudad en Google Maps, ¿aparecés entre los primeros resultados?

| Opción | Puntaje |
|---|---|
| No tengo ficha de Google o no aparezco | 0 |
| Aparezo, pero después de los primeros cinco resultados | 1 |
| Aparezco entre los primeros cinco | 2 |
| Aparezco entre los primeros cinco con toda la información completa | 3 |

**Criterio objetivo:** Posición en el local pack para la búsqueda relevante de rubro + ciudad.  
**Umbral y fuente:** Categoría primaria correcta = factor #1 del local pack (Whitespark 2026).

**Pregunta 2**  
Los horarios que figuran en tu ficha de Google, ¿coinciden con los horarios reales de tu negocio?

| Opción | Puntaje |
|---|---|
| No tengo horarios cargados o no sé qué figuran | 0 |
| Están cargados pero no coinciden con los reales | 1 |
| Coinciden pero a veces me olvido de actualizarlos (feriados, cambios puntuales) | 2 |
| Siempre están al día, incluyendo feriados y cambios puntuales | 3 |

**Criterio objetivo:** Precisión y vigencia de los horarios publicados.  
**Umbral y fuente:** Horarios reales al momento de la búsqueda = 5º factor de Maps (Whitespark 2026).  
**Nota de fricción:** Menos crítica para perfil B (estudio por turno, sin walk-in). Se mantiene porque sigue siendo verificable.

**Pregunta 3**  
La categoría principal de tu ficha de Google, ¿es la correcta para lo que hacés?

| Opción | Puntaje |
|---|---|
| No tengo ficha de Google | 0 |
| Tengo ficha pero la categoría no es la correcta | 1 |
| Tengo categoría correcta pero me faltan datos (dirección, teléfono, horarios) | 2 |
| Tengo categoría correcta y todos los datos actualizados | 3 |

**Criterio objetivo:** Coincidencia entre la categoría primaria del GBP y la actividad real del negocio.  
**Umbral y fuente:** Categoría primaria correcta = factor #1 del local pack (Whitespark 2026).

---

### Dimensión 2 — ¿Te entienden?

**Pregunta 4**  
¿Tenés una página web o sección donde se vean tus servicios, productos o carta de forma clara y actualizada?

| Opción | Puntaje |
|---|---|
| No tengo web ni sección visible | 0 |
| Tengo algo pero está desactualizado o incompleto | 1 |
| Tengo una página o sección dedicada por servicio/categoría/carta | 2 |
| Tengo páginas/secciones por servicio + datos del profesional o precios | 3 |

**Criterio objetivo:** Existencia de contenido estructurado por servicio/categoría/carta.  
**Umbral y fuente:** Una página dedicada por cada servicio = factor orgánico local #1 (Whitespark 2026).  
**Nota:** Esta es la pregunta más transversal de las 12.

**Pregunta 5**  
¿Hay una descripción clara que explique qué ofrecés y a quién?

| Opción | Puntaje |
|---|---|
| No hay descripción en ningún lado | 0 |
| Hay algo pero solo dice el nombre y el rubro | 1 |
| La descripción menciona qué ofrecés y a quién | 2 |
| La descripción es completa (servicios/productos, zona, horarios o credenciales) | 3 |

**Criterio objetivo:** Completitud de la descripción (datos concretos vs genéricos).  
**Umbral y fuente:** Señales de actividad y completitud del perfil (Whitespark 2026).

**Pregunta 6**  
¿Tenés los servicios, productos o categorías detallados en tu ficha de Google o en tu web?

| Opción | Puntaje |
|---|---|
| No tengo nada detallado | 0 |
| Tengo algo pero está desactualizado | 1 |
| Tengo las categorías o servicios principales listados | 2 |
| Cada servicio/producto tiene descripción, requisitos o precios | 3 |

**Criterio objetivo:** Nivel de detalle de la oferta en GBP o web.  
**Umbral y fuente:** Información detallada por servicio mejora relevancia local (Whitespark 2026).

---

### Dimensión 3 — ¿Te escriben?

**Pregunta 7**  
¿Tenés WhatsApp o teléfono visible en tu ficha de Google para que te contacten directamente?

| Opción | Puntaje |
|---|---|
| No tengo ficha o no hay número visible | 0 |
| Tengo número fijo o de línea pero no WhatsApp | 1 |
| Tengo WhatsApp pero es mi número personal (no Business) | 2 |
| Tengo WhatsApp Business vinculado a la ficha de Google | 3 |

**Criterio objetivo:** Disponibilidad de canal de contacto directo desde el GBP.  
**Umbral y fuente:** Señales de actividad y completitud del perfil (Whitespark 2026).  
**Nota de fricción:** Crítico para A y C; para B el primer contacto suele ser por recomendación. Se mantiene porque sigue siendo verificable.

**Pregunta 8**  
¿Cuánto tardás en contestar un mensaje de alguien que te escribe por primera vez?

| Opción | Puntaje |
|---|---|
| No contesto mensajes de desconocidos o no tengo WhatsApp | 0 |
| Tardo más de 24 horas | 1 |
| Contesto dentro del día hábil | 2 |
| Contesto dentro de 2 horas | 3 |

**Criterio objetivo:** Tiempo de respuesta a consultas nuevas (observable en historial de WhatsApp).  
**Umbral y fuente:** Pendiente de validar (no hay fuente permitida con umbral específico para pymes argentinas).  
**Nota de fricción:** Colapsa para B (estudio por turno). Se mantiene como proxy de "canal activo".

**Pregunta 9**  
Si tenés sitio web, ¿se puede iniciar una consulta o ver la información de contacto sin tener que buscarla?

| Opción | Puntaje |
|---|---|
| No tengo sitio web | 0 |
| Tengo web pero el contacto o formulario no es visible de inmediato | 1 |
| Hay formulario o canales directos visibles sin tener que buscarlos | 2 |
| Hay formulario + WhatsApp + teléfono, todos visibles sin buscar | 3 |

**Criterio objetivo:** Cantidad y visibilidad de canales de contacto accesibles desde la web.  
**Umbral y fuente:** Proxy conductual de Core Web Vitals + completitud (Google/web.dev + Whitespark 2026).

---

### Dimensión 4 — ¿Te siguen eligiendo?

**Pregunta 10**  
¿Cuántas reseñas tenés en Google?

| Opción | Puntaje |
|---|---|
| Menos de 5 o no tengo reseñas | 0 |
| Entre 5 y 19 | 1 |
| Entre 20 y 49 | 2 |
| 50 o más | 3 |

**Criterio objetivo:** Cantidad de reseñas públicas en el GBP.  
**Umbral y fuente:** Piso de 20 reseñas — la mayoría de consumidores descarta por debajo de ese umbral (BrightLocal 2026). Se usa la dirección del hallazgo, no la cifra exacta.

**Pregunta 11**  
¿Cuál es tu promedio de calificación en Google?

| Opción | Puntaje |
|---|---|
| Menos de 3,5 estrellas | 0 |
| Entre 3,5 y 4,0 | 1 |
| Entre 4,0 y 4,5 | 2 |
| 4,5 o más | 3 |

**Criterio objetivo:** Calificación promedio visible en el GBP.  
**Umbral y fuente:** 4,5 estrellas — una proporción significativa de consumidores descarta por debajo de ese puntaje (BrightLocal 2026). Se usa la dirección del hallazgo, no la cifra exacta.

**Pregunta 12**  
¿Cuándo fue la última reseña que recibiste en Google?

| Opción | Puntaje |
|---|---|
| Nunca recibí una reseña o hace más de 6 meses | 0 |
| Hace entre 3 y 6 meses | 1 |
| Hace menos de 3 meses | 2 |
| En los últimos 30 días | 3 |

**Criterio objetivo:** Recencia de la última reseña publicada.  
**Umbral y fuente:** Recencia menor a 3 meses — el 74% de los consumidores solo considera reseñas de ese período (BrightLocal 2026). Se usa la dirección del hallazgo, no la cifra exacta.

---

## 3. Tabla de supervivencia

| Dimensión | Pregunta consolidada | Sobrevivió en A | Sobrevivió en B | Sobrevivió en C | Observación |
|---|---|---|---|---|---|
| ¿Te encuentran? | P1 — Aparecer en primeros resultados | Sí | Sí | Sí | Transversal |
| ¿Te encuentran? | P2 — Horarios coinciden | Sí | Parcial | Sí | Colapsa en B (sin walk-in) |
| ¿Te encuentran? | P3 — Categoría correcta | Parcial | Sí | Sí | A no la tenía explícita |
| ¿Te entienden? | P4 — Página/sección por servicio/categoría/carta | Sí | Sí | Sí | **Más transversal de las 12** |
| ¿Te entienden? | P5 — Descripción clara de qué ofrecés | Sí | Sí | Sí | Transversal |
| ¿Te entienden? | P6 — Servicios/productos detallados | Sí | Sí | Sí | Transversal |
| ¿Te escriben? | P7 — WhatsApp/teléfono visible | Sí | Sí | Sí | Transversal |
| ¿Te escriben? | P8 — Tiempo de respuesta | Sí | Parcial | Sí | Colapsa en B (estudio por turno) |
| ¿Te escriben? | P9 — Canales de contacto visibles en web | Sí | Sí | Sí | Transversal |
| ¿Te siguen eligiendo? | P10 — Cantidad de reseñas | Sí | Sí | Parcial | C no la tenía (tenía recencia) |
| ¿Te siguen eligiendo? | P11 — Promedio de calificación | Sí | Parcial | Sí | B no la tenía explícita |
| ¿Te siguen eligiendo? | P12 — Recencia de última reseña | Sí | Sí | Sí | Transversal |

**Resumen de colapsos:**
- Dimensión 1: P2 (horarios) pierde relevancia en B.
- Dimensión 3: P8 (tiempo de respuesta) pierde relevancia en B.
- Dimensión 4: P10 y P11 tienen cobertura parcial (C no tenía cantidad; B no tenía promedio).
- Dimensión 2: 3/3 transversales.

---

## 4. Veredicto explícito sobre transversalidad

**La transversalidad por rubro NO se sostiene** para un diagnóstico de 12 preguntas idénticas.

### Evidencia
- Las dimensiones 1 ("¿Te encuentran?") y 3 ("¿Te escriben?") tienen fricción estructural para el perfil B (estudio profesional sin local a la calle, por turno, sin vidriera). Los criterios de "horarios de atención", "fotos de fachada/vidriera" y "tiempo de respuesta por WhatsApp" son críticos para A y C, pero pierden sentido o urgencia para B.
- La dimensión 2 ("¿Te entienden?") es la más transversal: la idea de "una página dedicada por servicio/categoría/carta" funciona para los tres perfiles con mínima traducción de lenguaje.
- La dimensión 4 ("¿Te siguen eligiendo?") es mayoritariamente transversal (reseñas como boca a boca digital), aunque la cobertura de "cantidad" y "promedio" no fue uniforme en los tres subagentes.

### Corte mínimo que arreglaría la transversalidad
Si se quiere preservar la integridad del diagnóstico manteniendo 12 preguntas:

1. Mantener las 3 preguntas de la dimensión 2 y las 3 de la dimensión 4 idénticas para los tres perfiles.
2. Para las dimensiones 1 y 3, crear **dos versiones** de cada pregunta:
   - Versión "Comercio / Alta rotación" (A + C): horarios, fotos de fachada, WhatsApp como canal principal, tiempo de respuesta.
   - Versión "Estudio profesional" (B): categoría correcta, matrícula visible, calidad del primer mensaje, canales de contacto en web.
3. El formulario pregunta primero el tipo de negocio (o lo infiere de la categoría del GBP) y presenta la versión correspondiente.

Este corte rompe la "12 preguntas idénticas" pero preserva la validez del diagnóstico para los tres perfiles. Forzar las mismas preguntas para los tres perfiles degrada la utilidad del resultado para el perfil B y, en menor medida, para C.

---

## Resumen ejecutivo

La prueba de transversalidad falló. Las dimensiones 1 y 3 colapsan para estudios profesionales sin local a la calle. La dimensión 2 es la única plenamente transversal. El corte mínimo es tener dos versiones de las preguntas de las dimensiones 1 y 3 según tipo de negocio. El set consolidado de 12 preguntas maximiza la supervivencia pero con compromisos explícitos en P2 y P8.

---

## Pendientes

- Validar umbrales de P8 (tiempo de respuesta) con datos locales argentinos (BrightLocal/Whitespark son mercado estadounidense).
- Validar si la opción de "dos versiones" según tipo de negocio es aceptable para el equipo de Netiza (decisión de UX).
- Cruzar este draft con los de kilo, grok y agy (no se leyeron para preservar independencia).

---

## Memoria guardada en engram

Se ejecutó `mem_save` con:

- **title:** Veredicto de transversalidad — Diagnóstico Netiza 2026-07-26
- **type:** decision
- **scope:** project
- **topic_key:** diagnostico/transversalidad-rubro
- **content:**
  **What:** La transversalidad por rubro NO se sostiene para un diagnóstico de 12 preguntas idénticas. Dimensión 1 y 3 colapsan para perfil B (estudio profesional sin local a la calle).
  **Why:** El briefing pedía verificar explícitamente si las mismas 12 preguntas funcionan para ferretería, escribano y parrilla. La evidencia de los tres subagentes muestra fricción estructural en "horarios", "fotos de fachada" y "tiempo de respuesta por WhatsApp" para el perfil B.
  **Where:** docs/research/diagnostico-preguntas-opencode.md (reporte completo) + briefing sección 2 decisión 3.
  **Learned:** La dimensión 2 ("¿Te entienden?") es la más transversal; la idea de "una página dedicada por servicio/categoría/carta" funciona para los tres perfiles. El corte mínimo es dos versiones de las preguntas de las dimensiones 1 y 3 según tipo de negocio.

---

*Reporte generado por gentle-orchestrator. No se leyeron los drafts de kilo/grok/agy para preservar independencia del cruce posterior.*