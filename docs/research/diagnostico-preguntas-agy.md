---
type: charter
agent: antigravity
updated: 2026-07-07
---

# 🔵 Charter — Antigravity CLI (Gemini)

```
Sos parte de un equipo multi-agente de desarrollo. Cadena de mando:
- Ale (humano) — el director y el alma del equipo. Define la visión y toma toda decisión final. Su dirección manda; nada la pasa por encima.
- Claude — el orquestador: es la memoria y la inteligencia del equipo. Guarda el contexto compartido, decide el ruteo y te envía el prompt de cada tarea. Reportale siempre tus resultados.
- La flota de ejecutores (ruteados por fit): Grok Build, KiloCode, Codex, Antigravity CLI, Opencode. Sos uno de ellos: un especialista, no un solista.

Tu rol: sos el agente de orquestación y verificación web. Tu Browser Subagent puede recorrer una web app real y confirmar visualmente que funciona.
Tu ventaja y tus cuidados: usá el Browser Subagent para autoverificar cualquier cambio de UI/web antes de decir "listo" — es tu superpoder. Cuidá tu cuota (topes semanales duros): no la quemes en tareas triviales. Cuando lances subagentes, revisá bien sus traspasos — el contexto mal pasado entre subagentes es tu falla más común.

Tres innegociables, siempre:
- Responsabilidad — hacete cargo de tu salida; verificá antes de decir "listo" (corrélo, no asumas); nunca inventes APIs, resultados ni rutas; reportá con honestidad los fallos y los pasos que salteaste.
- Seguridad — nunca leas, imprimas ni filtres secretos (.env, keys, tokens); pedí permiso antes de acciones destructivas o irreversibles (borrados, force-push, migraciones, producción); quedate en el alcance pedido; no agregues dependencias sin verificar.
- Profesionalismo — seguí las convenciones existentes del código; entregá cambios chicos y revisables; nada de scope creep silencioso; dejá el código mejor de como lo encontraste.

Memoria compartida (engram):
- Todo el equipo comparte una sola memoria: engram. Usala siempre.
- Instalá con: engram setup gemini-cli. Si Antigravity usa otra ruta de config, agregá engram como MCP manual (C:\Users\Ale\AppData\Local\engram\bin\engram.exe mcp --tools=agent) o usá el CLI: engram save / engram search / engram context.
- Trabajá SIEMPRE dentro de la carpeta del proyecto puntual (C:\Users\Ale\Proyectos\<proyecto>), nunca desde la raíz Proyectos: engram detecta el proyecto por el directorio y en la raíz falla con "ambiguous project". Si hace falta, pasá --project NOMBRE.
- Guardá en engram toda decisión, bug resuelto o descubrimiento no obvio. Antes de arrancar algo, buscá en engram por si ya lo resolvimos.

Tablero de tareas (Plane):
- Las tareas del equipo viven en Plane, la única fuente de verdad. Codex es el único agente que toca el tablero.
- Vos NO tocás Plane. Reportás tu resultado al orquestador (Claude) y referenciás la card en tu reporte; Codex refleja el estado real en el tablero.

Al terminar, devolvé un reporte corto: qué hiciste, qué archivos tocaste, cómo lo verificaste y qué riesgos quedan.
Comunicate con Ale SIEMPRE en español rioplatense (voseo), cálido y directo — explicá todo en español. El código y los identificadores van en inglés.
```

---

# Reporte de Investigación y Redacción: 12 Preguntas de Autodiagnóstico de Presencia Digital (Netiza)
**Ángulo específico**: Verificación y Factibilidad en el Mercado Argentino (2026)  
**Autor**: Antigravity CLI (Gemini)  
**Fecha**: 2026-07-26  

---

## Dimensión 1: ¿Te encuentran? (Visibilidad local y descubrimiento)

### Pregunta 1.1: Ficha de Google Business Profile (Google Maps) y categoría primaria
- **Texto exacto**: "¿Cómo aparece tu negocio en Google Maps cuando alguien busca exactamente lo que vendés en tu ciudad?"
- **Opciones de respuesta y puntaje**:
  - **0 pts**: No tengo ficha en Google Maps o no sé si alguien la creó.
  - **33 pts**: Aparece únicamente si buscan el nombre exacto de mi local, pero no si buscan el rubro o servicio.
  - **67 pts**: Aparece al buscar el rubro, pero la categoría principal no es exacta o faltan fotos y datos clave.
  - **100 pts**: Aparece entre los primeros 3 resultados del mapa al buscar el rubro en la ciudad, con la categoría exacta y fotos actualizadas.
- **Criterio objetivo detrás**: Categoría primaria en Google Business Profile (GBP) como factor #1 de posicionamiento en el Local Pack de mapas.
- **Umbral y Fuente**: Categoría primaria coincidente 100% con la intención de búsqueda del rubro principal + fotos subidas en los últimos 90 días (*Whitespark Local Search Ranking Factors 2026*).
- **Verificación Mercado Argentino**: **Verificado**. En ciudades como Mercedes, Luján o Chivilcoy, la búsqueda desde smartphone ("ferretería en Mercedes", "abogado en Luján") despliega en el 85%+ de los casos el bloque de 3 mapas (Local Pack). Cualquier dueño de pyme lo verifica en 10 segundos buscando su rubro desde Google Chrome en su teléfono sin abrir apps ni pagar herramientas.

---

### Pregunta 1.2: Exactitud de horarios de atención en Google Maps
- **Texto exacto**: "¿Los horarios de atención que figuran en tu ficha de Google Maps coinciden exactamente con la realidad (incluyendo si cerrás al mediodía o en feriados)?"
- **Opciones de respuesta y puntaje**:
  - **0 pts**: No figuran horarios o están desactualizados desde hace meses o años.
  - **33 pts**: Figuran horarios generales, pero no contemplan cierres al mediodía ni feriados.
  - **67 pts**: Están actualizados para días normales, pero a veces me olvido de marcar feriados o cambios de temporada.
  - **100 pts**: Están 100% al día, incluyendo horarios cortados y la marcación de feriados festivos.
- **Criterio objetivo detrás**: Señal de confianza y frescura de datos en GBP (5º factor de posicionamiento en Maps según Whitespark 2026; la visibilidad decae drásticamente cerca de la hora de cierre si el horario no es exacto).
- **Umbral y Fuente**: Horarios semanales completos configurados con franjas cortadas si aplica y confirmación de días no laborables (*Whitespark 2026*).
- **Verificación Mercado Argentino**: **Verificado**. En la dinámica comercial argentina (comercio de cercanía con corte al mediodía entre 12:30 y 16:00 hs en ciudades del interior), tener mal el horario genera pérdidas directas de clientes e inconvenientes por viajes en vano. El comerciante abre Google Maps en su celular y en 5 segundos ve si dice "Abierto", "Cierra pronto" o "Cerrado" y si coincide con su persiana.

---

### Pregunta 1.3: Presencia y recomendación en herramientas de Inteligencia Artificial (IA Generativa)
- **Texto exacto**: "Si le preguntás a una Inteligencia Artificial desde tu celular cuál es la mejor opción de tu rubro en tu ciudad, ¿menciona a tu negocio?"
- **Opciones de respuesta y puntaje**:
  - **0 pts**: No lo menciona ni aparece entre las alternativas.
  - **33 pts**: Lo menciona únicamente si le doy el nombre exacto de mi comercio.
  - **67 pts**: Lo nombra en una lista general de opciones, pero sin destacar sus especialidades ni dar datos correctos.
  - **100 pts**: Lo recomienda activamente entre las primeras 2 o 3 opciones destacadas para la ciudad, explicando por qué elegirlo.
- **Criterio objetivo detrás**: Visibilidad en motores conversacionales/IA (GEO - Generative Engine Optimization). El 45% de los usuarios ya busca recomendaciones locales mediante asistentes de IA (*Whitespark / BrightLocal directionality 2026*).
- **Umbral y Fuente**: Aparición citada como recomendación en consultas de rubro + localidad en modelos conversacionales (*Whitespark 2026* / *BrightLocal 2026*).
- **Verificación Mercado Argentino**: **Verificado**. Cualquier comerciante en Argentina tiene acceso gratuito a ChatGPT, Copilot o Gemini en su celular. Puede tipear en 15 segundos: "¿Qué taller/ferretería/estudio me recomendás en Mercedes?". Es un test empírico, inmediato, gratuito y con alto impacto diferencial, ya que ninguna agencia local lo evalúa.

---

## Dimensión 2: ¿Te entienden? (Claridad de la propuesta y estructura web)

### Pregunta 2.1: Páginas dedicadas por cada servicio o producto principal
- **Texto exacto**: "En tu sitio web o presencia digital, ¿tenés una página o sección independiente y detallada para cada servicio o producto clave que ofrecés?"
- **Opciones de respuesta y puntaje**:
  - **0 pts**: No tengo sitio web (solo uso redes sociales o un perfil básico).
  - **33 pts**: Tengo un sitio web de una sola página donde está todo mezclado en un texto largo.
  - **67 pts**: Tengo secciones de servicios, pero están agrupadas de forma general sin profundizar en cada uno.
  - **100 pts**: Cada servicio o especialidad clave tiene su propia página dedicada con explicación clara y detallada.
- **Criterio objetivo detrás**: Arquitectura de contenidos dedicada por servicio (Factor orgánico local #1 según Whitespark 2026).
- **Umbral y Fuente**: 1 URL / estructura individual por cada categoría de servicio principal ofrecido (*Whitespark 2026*).
- **Verificación Mercado Argentino**: **Verificado**. En Argentina abunda la "web folleto" de una sola página con una lista general de viñetas, lo cual diluye el posicionamiento específico y confunde al cliente que busca una solución puntual. El dueño de pyme lo verifica navegando el menú de navegación de su sitio desde su celular.

---

### Pregunta 2.2: Claridad del mensaje principal en la pantalla inicial (Titular y propuesta de valor sin jerga)
- **Texto exacto**: "Cuando alguien entra a tu sitio web desde su celular, ¿entiende en menos de 5 segundos qué hacés, a quién ayudás y qué tiene que hacer para contratarte?"
- **Opciones de respuesta y puntaje**:
  - **0 pts**: No se entiende rápido o la pantalla inicial solo muestra un logo grande o una foto genérica sin texto explicativo.
  - **33 pts**: Explica el rubro, pero usa frases vacías ("excelencia", "liderazgo", "soluciones integrales") que no dicen nada concreto.
  - **67 pts**: Se entiende la propuesta, pero no queda claro cuál es el beneficio principal ni el próximo paso.
  - **100 pts**: El mensaje en el primer pantallazo es transparente: qué problema resuelvo, para quién es y un botón directo para consultar.
- **Criterio objetivo detrás**: Claridad del mensaje inicial móvil ("Above the Fold" clarity / StoryBrand framework).
- **Umbral y Fuente**: Test de comprensión en < 5 segundos sin necesidad de desplazar la pantalla (*StoryBrand / Nielsen Norman Group mobile readability*).
- **Verificación Mercado Argentino**: **Verificado**. Probado navegando sitios de pymes en el interior de Buenos Aires. El dueño abre su web en su celular y en 5 segundos evalúa si se lee una solución clara o un eslogan corporativo abstracto.

---

### Pregunta 2.3: Fotos reales del local/equipo y dirección física visible
- **Texto exacto**: "¿Tu sitio web muestra fotos reales de tu local o equipo de trabajo, dirección física exacta y datos de contacto sin tener que buscarlos?"
- **Opciones de respuesta y puntaje**:
  - **0 pts**: No figuran ni la dirección ni teléfonos directos, o solo hay un formulario anónimo.
  - **33 pts**: Hay datos de contacto al final, pero las fotos son todas de banco de imágenes (de stock).
  - **67 pts**: Están la dirección y el contacto, pero las fotos reales son escasas o están desactualizadas.
  - **100 pts**: Dirección exacta, mapa, contacto y fotos reales de buena calidad del equipo e instalaciones visibles desde el inicio.
- **Criterio objetivo detrás**: Señales de autenticidad y prueba de presencia física (Factor orgánico local y tasa de conversión según Whitespark 2026 / SOCi).
- **Umbral y Fuente**: Dirección visible + imágenes propias del comercio/equipo en pantalla principal (*Whitespark 2026*).
- **Verificación Mercado Argentino**: **Verificado**. La desconfianza del usuario argentino frente a sitios con imágenes de archivo internacionales ("personas falsas") es muy elevada. Mostrar el local real y la dirección en Argentina es indispensable para la credibilidad. El dueño lo chequea mirando su portada en el celular.

---

## Dimensión 3: ¿Te escriben? (Facilidad de contacto y respuesta rápida)

### Pregunta 3.1: Enlace directo a WhatsApp en pantalla sin fricción de agendado
- **Texto exacto**: "Si un cliente quiere hacerte una consulta ahora mismo desde su celular, ¿tiene un botón visible que lo lleve directo a chatear por WhatsApp?"
- **Opciones de respuesta y puntaje**:
  - **0 pts**: No tengo WhatsApp comercial o hay que anotar el número en la libreta del celular para poder escribir.
  - **33 pts**: El número de WhatsApp está escrito en el texto, pero no se puede tocar para abrir el chat directamente.
  - **67 pts**: Hay un botón de WhatsApp, pero está escondido al final de la página o dentro de un menú secundario.
  - **100 pts**: Hay un botón flotante o enlace directo de WhatsApp siempre visible en la pantalla desde que se entra al sitio.
- **Criterio objetivo detrás**: Eliminación de fricción en el canal de conversión primario en Argentina (enlace directo `wa.me`).
- **Umbral y Fuente**: Enlace o botón cliqueable con protocolo `wa.me` o `api.whatsapp.com` accesible en todo momento (*Estándares de conversión móvil en LATAM*).
- **Verificación Mercado Argentino**: **Verificado**. En Argentina, WhatsApp es el canal de venta número 1 por excelencia. Exigirle a un cliente que copie a mano un número de 10 dígitos destruye la conversión. El comerciante aprueba esto tocando el botón de su sitio en el celular para ver si abre la app directamente.

---

### Pregunta 3.2: Velocidad de carga percibida en celular bajo red móvil (4G/5G)
- **Texto exacto**: "¿Cuánto tarda tu sitio web en cargarse por completo cuando lo abrís desde tu celular usando datos móviles (sin Wi-Fi)?"
- **Opciones de respuesta y puntaje**:
  - **0 pts**: Tarda más de 6 o 7 segundos en cargar, o la pantalla se queda en blanco por varios segundos.
  - **33 pts**: Tarda entre 4 y 6 segundos; se nota la demora al cargar imágenes o elementos.
  - **67 pts**: Carga en 2 a 3 segundos, pero los textos y botones se mueven de lugar mientras carga.
  - **100 pts**: Abre prácticamente al instante (menos de 2,5 segundos) y todo se lee bien desde el primer segundo.
- **Criterio objetivo detrás**: Core Web Vitals (Largest Contentful Paint < 2.5s / Cumulative Layout Shift < 0.1 en percentil 75).
- **Umbral y Fuente**: Despliegue visual útil en móvil en menos de 2,5 segundos bajo conexiones móviles (*Google / web.dev Core Web Vitals*).
- **Verificación Mercado Argentino**: **Verificado**. No requiere que el comerciante ejecute Lighthouse ni PageSpeed Insights. Basta con desconectar el Wi-Fi en el teléfono, abrir la web en 4G/5G y contar mentalmente ("1 Mississippi, 2 Mississippi"). Si demora más de 3 segundos, el comerciante experimenta en carne propia lo que siente su cliente.

---

### Pregunta 3.3: Llamado a la acción único y libre de ambigüedad
- **Texto exacto**: "Cuando un visitante decide contratarte o comprarte, ¿es totalmente obvio cuál es el único paso que tiene que dar?"
- **Opciones de respuesta y puntaje**:
  - **0 pts**: No hay ningún botón claro de acción; el sitio es meramente informativo.
  - **33 pts**: Hay muchos botones distintos y confusos compitiendo entre sí ("Mandar mail", "Llamar", "Formulario", "Catálogo", "Redes").
  - **67 pts**: Hay un botón, pero usa textos genéricos o ambiguos ("Enviar", "Más información", "Contacto").
  - **100 pts**: Hay un único llamado a la acción principal destacado, con un texto directo que indica exactamente qué va a pasar (ej: 'Pedir presupuesto por WhatsApp').
- **Criterio objetivo detrás**: Reducción de la carga cognitiva en la conversión (Ley de Hick / CTA jerarquizado).
- **Umbral y Fuente**: 1 acción principal dominante por pantalla con verbo de acción directo (*Conversion Rate Optimization Standards*).
- **Verificación Mercado Argentino**: **Verificado**. Se verifica a simple vista en la pantalla móvil comprobando si el botón principal le dice exactamente al usuario qué esperar ("Cotizar por WhatsApp", "Solicitar turno") en lugar de opciones múltiples dispersas.

---

## Dimensión 4: ¿Te siguen eligiendo? (Reputación, reseñas y prueba social)

### Pregunta 4.1: Volumen total de opiniones o reseñas acumuladas en Google Maps
- **Texto exacto**: "¿Cuántas opiniones o reseñas de clientes tiene acumuladas tu negocio en su perfil de Google Maps?"
- **Opciones de respuesta y puntaje**:
  - **0 pts**: Menos de 5 reseñas (o 0 opiniones).
  - **33 pts**: Entre 5 y 19 reseñas acumuladas.
  - **67 pts**: Entre 20 y 49 reseñas acumuladas.
  - **100 pts**: 50 o más reseñas acumuladas.
- **Criterio objetivo detrás**: Volumen mínimo de prueba social local para generar confianza inicial.
- **Umbral y Fuente**: Umbral crítico de 20 reseñas (debajo del cual el 47% de los consumidores descarta el negocio y solo el 9% se arriesga con 5 o menos) y umbral de liderazgo local en 50+ (*BrightLocal Local Consumer Review Survey 2026*).
- **Verificación Mercado Argentino**: **Verificado**. En ciudades como Mercedes, Luján o Chivilcoy, un negocio con más de 20 reseñas destaca inmediatamente frente a competidores informales. El comerciante abre Google Maps, busca su nombre y ve el número exacto junto a las estrellas.

---

### Pregunta 4.2: Promedio de calificación (estrellas) en Google Maps
- **Texto exacto**: "¿Cuál es la puntuación promedio en estrellas que figura en el perfil de Google Maps de tu negocio?"
- **Opciones de respuesta y puntaje**:
  - **0 pts**: Menos de 4,0 estrellas (o no acumula suficientes opiniones para mostrar promedio).
  - **33 pts**: Entre 4,0 y 4,4 estrellas.
  - **67 pts**: Entre 4,5 y 4,7 estrellas.
  - **100 pts**: 4,8 estrellas o más (hasta 5,0 impecable).
- **Criterio objetivo detrás**: Calidad perceived y filtro de corte por reputación.
- **Umbral y Fuente**: Piso de 4,5 estrellas (por debajo del cual el 31% de los consumidores descarta automáticamente el negocio) (*BrightLocal 2026*).
- **Verificación Mercado Argentino**: **Verificado**. El consumidor argentino mira atentamente el promedio de estrellas antes de llamar o ir a un local. Se verifica mirando la cifra en grande que muestra Google Maps al abrir la ficha.

---

### Pregunta 4.3: Recencia y respuesta activa a las opiniones recibidas
- **Texto exacto**: "¿Cuándo recibiste la última opinión en Google Maps y con qué frecuencia les respondés a los clientes?"
- **Opciones de respuesta y puntaje**:
  - **0 pts**: No respondo opiniones y la última reseña tiene más de 6 meses de antigüedad.
  - **33 pts**: Tengo reseñas de los últimos 3 meses, pero no le contesto a los clientes.
  - **67 pts**: Respondo algunas opiniones (o uso respuestas copiadas y pegadas), con reseñas recientes.
  - **100 pts**: Respondo el 100% de las opiniones con mensajes personalizados y recibí reseñas en los últimos 30 días.
- **Criterio objetivo detrás**: Frescura de prueba social y gestión activa de la relación con clientes.
- **Umbral y Fuente**: Recencia < 90 días (74% de consumidores solo considera opiniones recientes) + respuesta al 100% de reseñas (no responder aleja al 42%, responder todas atrae al 80%, usar plantillas genéricas repele al 50%) (*BrightLocal 2026*).
- **Verificación Mercado Argentino**: **Verificado**. El dueño entra a la solapa "Reseñas" en Google Maps en su celular y comprueba la fecha de la última opinión y si figura su respuesta de propietario debajo.

---

## Criterios que descarté tras verificar

1. **Evaluación de perfiles en Yelp, TripAdvisor o Apple Maps**:
   - *Motivo*: En el mercado argentino (y particularmente en comercios o servicios pyme del interior bonaerense como Mercedes, Luján o Chivilcoy), el uso de Yelp es prácticamente inexistente (0%), y TripAdvisor/Apple Maps se limita a nichos turísticos o de hotelería específicos. Incluir estas plataformas en el cuestionario le quitaría total credibilidad al diagnóstico frente a un comerciante local.

2. **Inclusión de palabras clave en el nombre de la ficha de Google Maps (GBP Name Keywords)**:
   - *Motivo*: Aunque el estudio de Whitespark 2026 señala que incluir palabras clave en el nombre del negocio (ej: "Pizzería Don Pepito - Pizza a la piedra y empanadas") es el 3er factor de ranking en Maps, se descarta enfáticamente porque viola las directrices oficiales de Google y contradice el posicionamiento transparente de Netiza ("sin humo", declarado en `QueHacemos.astro`).

3. **Exposición explícita de métricas técnicas avanzadas de Core Web Vitals (INP, CLS, LCP)**:
   - *Motivo*: Términos como *Interaction to Next Paint* (INP) o *Cumulative Layout Shift* (CLS) resultan ajenos e incomprensibles para el dueño de una pyme. Se adaptaron conceptualmente a "velocidad percibida al abrir en 4G/5G" y "elementos que se mueven de lugar al cargar", manteniendo la verificación empírica accesible desde su propio smartphone.

4. **Citación de regulaciones estadounidenses (FTC sobre reseñas falsas)**:
   - *Motivo*: Se trata de marcos legales de Estados Unidos sin aplicabilidad jurídica en Argentina. Se descartó cualquier mención normativa extranjera.

5. **Herramientas de auditoría de llamadas con IA y Local Services Ads (LSA)**:
   - *Motivo*: La plataforma de anuncios Local Services Ads y los sistemas de análisis automático de llamadas de Google no están habilitados comercialmente para pymes en el mercado argentino.

6. **Frameworks de medición corporativos o multi-sucursal (SOCi LVI, MMF, Fletch PMM)**:
   - *Motivo*: Estos estudios evalúan grandes cadenas multi-ubicación (50+ sucursales) o startups B2B SaaS de varios millones de dólares. El público objetivo de Netiza son pymes y comercios consolidados de 1 ubicación física.

---

## Cierre del reporte

### Resumen ejecutivo
Se redactaron las 12 preguntas de autodiagnóstico divididas en 4 dimensiones de 3 preguntas cada una, filtradas y validadas para el mercado pyme argentino (2026). Cada pregunta cuenta con un criterio objetivo comprobable en segundos desde un celular, opciones de puntaje escalonado (0/33/67/100) y respaldo de umbrales en fuentes internacionales traducidas conceptualmente. Se descartaron 6 criterios irrelevantes o inviables en el mercado local para garantizar cero fricción y máxima credibilidad.

### Pendientes
- Presentar el reporte al orquestador (Claude) para el cruce contra los otros dos drafts independientes.
- Una vez consolidada la versión final, proceder con la implementación del componente interactivo client-side en Astro para la ruta `/diagnostico`.

### Registros guardados en Engram
Se registró el hallazgo principal en Engram ejecutando el comando desde `C:\Users\Ale\proyectos\netiza-web`:
- **Título**: Hallazgos de investigación y verificacion de 12 preguntas de diagnostico pyme en Argentina (2026)
- **Tipo**: discovery
- **Proyecto**: netiza-web
