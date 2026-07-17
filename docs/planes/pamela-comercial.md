# Plan comercial y de conversión — Netiza

**Decisión rectora:** el sitio debe funcionar como prueba de seriedad y cierre. Su única conversión principal es iniciar una consulta real por WhatsApp; navegación, videos y profundidad de scroll sirven para diagnosticar el recorrido, no para competir con ese KPI.

## 1. Construir un embudo corto hacia WhatsApp

- **Hero:** un solo CTA fuerte: **“Pedí tu Auditoría Netiza”**. Debajo, el enlace secundario **“Mirá cómo trabajamos”** baja al método; no abre otro canal.
- **Navbar:** CTA persistente y descriptivo: **“Hablemos por WhatsApp”**. En mobile debe seguir visible sin competir con el logo o el menú.
- **Oferta:** cada nivel lleva un CTA contextual: **“Quiero ordenar lo básico”**, **“Quiero hacerlo visible”** y **“Quiero acompañamiento para crecer”**. Cada enlace abre WhatsApp con un mensaje precargado diferente.
- **Después del método y la FAQ:** repetir un CTA de decisión, no uno genérico: **“Quiero saber por dónde empezar”**. La persona ya entendió problema, oferta, proceso y objeciones.
- **Cierre:** CTA final **“Contanos qué te está trabando”**, acompañado por “Te respondemos nosotros, no un bot”.

Para reducir fricción, el camino principal no debe exigir formulario, agenda ni elección técnica previa. El mensaje precargado puede pedir solo: “Hola, tengo un/a [tipo de negocio] y quiero consultar por [nivel o problema]”. Las preguntas de diagnóstico se hacen después, en la conversación.

Las señales de confianza deben aparecer antes del último CTA: ubicación real en Mercedes y trabajo federal; caras y roles de Emilia, Pamela y Alejandro; método de cuatro pasos; explicación honesta de para quién es y para quién no; FAQ con alcance y precios; trabajos reales solo si son publicables. Mientras no existan casos sólidos del nicho, el método y el equipo pesan más que testimonios genéricos o cifras sin respaldo.

## 2. Medir clics sin confundirlos con consultas

- Instalar GA4 y emitir el evento personalizado `whatsapp_click` en cada enlace a WhatsApp. Registrarlo como **evento clave**.
- Enviar parámetros sin datos personales: `cta_location` (navbar, hero, offer_1, offer_2, offer_3, method, faq, final), `cta_label`, `offer_level` y `page_path`. Registrar como dimensiones personalizadas solo los parámetros que efectivamente se usarán en reportes.
- Mantener como eventos secundarios `page_view`, `scroll` y vistas de secciones decisivas (`offer_view`, `method_view`, `faq_view`). Sirven para detectar dónde se pierde interés; NO son objetivos comerciales.
- Tablero semanal mínimo: sesiones, usuarios, `whatsapp_click`, tasa clic/sesión, consultas WhatsApp y tasa consulta/clic. Cortes útiles: dispositivo, origen/medio y ubicación del CTA.

**Definición operativa de “consultas/semana”:** cantidad de personas únicas que envían un primer mensaje entrante por WhatsApp durante una semana calendario y expresan una necesidad vinculada con los servicios de Netiza. Un clic sin mensaje no cuenta. Mensajes repetidos de la misma persona por el mismo tema se deduplican durante 30 días; spam, proveedores y búsquedas laborales se excluyen. La atribución se registra en WhatsApp Business mediante etiqueta **“Web”** y, cuando corresponda, etiqueta del nivel de oferta.

**Meta:** medir cuatro semanas completas para establecer la mediana semanal. Para las ocho semanas siguientes, buscar una mejora mínima de **20% sobre esa mediana o una consulta adicional por semana —lo que sea mayor—**, sin cambiar la definición. Si el volumen es muy bajo, evaluar además el total móvil de cuatro semanas para evitar conclusiones por una sola semana.

GA4 permite medir intención; WhatsApp Business confirma la consulta real. Ambos números deben convivir y nunca presentarse como equivalentes.

## 3. Cerrar con copy concreto, federal y sin humo

**Copy comercial de cierre propuesto**

> Tu negocio ya tiene algo valioso. Si hoy lo digital no lo muestra con la misma claridad, podemos ayudarte a ordenarlo. Contanos por WhatsApp qué negocio tenés y qué te está trabando. Te vamos a decir con honestidad si Netiza es el equipo indicado y por dónde conviene empezar.

**Microcopy recomendado**

| Contexto | CTA | Apoyo |
|---|---|---|
| Hero | **Pedí tu Auditoría Netiza** | “Una primera mirada para saber qué ordenar antes de invertir.” |
| Nivel 1 | **Quiero ordenar lo básico** | “Instagram, Google Maps y prioridades claras.” |
| Nivel 2 | **Quiero hacerlo visible** | “Marca, sitio y visibilidad con una base ordenada.” |
| Nivel 3 | **Quiero acompañamiento para crecer** | “Para negocios consolidados que necesitan continuidad.” |
| Método / FAQ | **Quiero saber por dónde empezar** | “Contanos tu situación; no necesitás llegar con la solución.” |
| Cierre | **Contanos qué te está trabando** | “Te respondemos nosotros, no un bot.” |

Evitar “resultados garantizados”, “vendé más en X días”, “explotá tus ventas”, “auditoría gratis” o cualquier plazo/resultado que Netiza no pueda demostrar. También evitar **“Quiero crecer”** como CTA aislado: promete demasiado y no aclara qué conversación inicia.

## 4. Mostrar la escalera de oferta sin cotizar a ciegas

Exponer los tres niveles como caminos según madurez, no como paquetes cerrados:

| Nivel | Exponer en el sitio | Reservar para WhatsApp |
|---|---|---|
| **1. Ordenar lo básico** | Para quién es; Auditoría Netiza; revisión de presencia digital; foco en Instagram, Google Maps y prioridades; entregable concreto; modalidad y precio fijo **solo cuando estén definidos**. | Accesos disponibles, alcance exacto por canal, estado actual y fecha de inicio. |
| **2. Hacerlo visible** | Para quién es; identidad/lavado de cara, landing o sitio simple y puesta en marcha de visibilidad; resultado esperado: presencia profesional y coherente. | Qué piezas necesita, tamaño del sitio, inversión publicitaria, tiempos y presupuesto final. |
| **3. Acompañar el crecimiento** | Para quién es; web o e-commerce, campañas y optimización continua; aclarar que requiere un negocio consolidado y trabajo sostenido. | Objetivos, capacidad operativa, márgenes, inversión, métricas, equipo involucrado y propuesta a medida. |

El nivel 1 debe ser la puerta de entrada destacada: reduce riesgo, permite diagnosticar antes de vender ejecución y filtra a quien está dispuesto a invertir. No publicar precios ficticios ni un “desde” que después no represente el alcance real. Para los niveles 2 y 3 conviene reservar la cotización, pero no esconder qué problema resuelven, para quién son ni cómo se trabaja.

## Riesgos

- **Medir clics como consultas:** infla el KPI y oculta la fricción entre abrir WhatsApp y enviar el mensaje.
- **Repetir demasiados botones:** convierte el CTA en ruido. Debe repetirse en momentos de decisión, con una jerarquía y microcopy coherentes.
- **Prometer una auditoría sin producto definido:** antes de publicar precio, cerrar entregable, duración, modalidad, responsable y límites.
- **Prueba social débil o inventada:** no usar logos, testimonios ni resultados sin permiso y evidencia. Hasta tener 3–5 casos pertinentes, sostener confianza con método, equipo y territorio.
- **Meta sin línea de base:** una cifra absoluta inventada no permite evaluar mejora ni respeta la capacidad real de atención.
- **Atribución manual inconsistente:** si el equipo no etiqueta cada nueva conversación, “consultas/semana” deja de ser comparable.

## Verificación

1. **Recorrido:** revisar desktop y mobile y confirmar que siempre haya un camino claro a WhatsApp, sin más de un CTA primario simultáneo por bloque.
2. **Mensajes:** probar cada CTA y confirmar número correcto, mensaje precargado, nivel/origen identificable y ausencia de datos personales en GA4.
3. **Analítica:** usar GA4 DebugView y Realtime para comprobar un solo `whatsapp_click` por clic y sus parámetros; luego validar que figure como evento clave y en el reporte semanal.
4. **KPI real:** ejecutar una prueba de punta a punta, enviar un mensaje y confirmar que el equipo pueda etiquetarlo como **Web** y asignarle nivel.
5. **Copy y confianza:** checklist editorial contra tono federal/vos, cero promesas mágicas, roles/equipo reales, alcance honesto y casos verificables.
6. **Revisión semanal:** comparar clics, consultas y tasa consulta/clic; cambiar una sola variable comercial por vez y esperar volumen suficiente antes de concluir.

## Resumen

1. WhatsApp es el único destino de conversión; el resto del sitio prepara y confirma la decisión.
2. Los CTAs cambian según el contexto, pero todos abren una conversación simple y trazable.
3. `whatsapp_click` mide intención; la consulta se confirma con un mensaje entrante único y etiquetado.
4. La meta inicial se fija contra cuatro semanas de línea de base, no contra una cifra inventada.
5. La oferta muestra tres caminos claros y reserva diagnóstico, alcance y cotización para conversar.

## Pendientes

- Definir número de WhatsApp Business, responsable y tiempo de respuesta esperado.
- Cerrar el entregable, duración, modalidad y precio fijo de la Auditoría Netiza.
- Confirmar si el formulario del diseño se elimina del camino principal o queda como alternativa secundaria.
- Validar qué trabajos reales tienen permiso y evidencia suficiente para publicarse.
- Acordar quién etiqueta las consultas y quién consolida el reporte semanal.

## Engram

- **Decisión guardada:** `Plan comercial y medición WhatsApp para Netiza`.
- **Alcance:** embudo, jerarquía de CTAs, definición del KPI, meta, copy de cierre y exposición de la oferta de tres niveles.

