# Plan de Research — Nuevo Sitio Web Netiza

Este plan de investigación establece las preguntas de negocio, fuentes de datos y metodologías necesarias para dotar de evidencia al diseño y copy del nuevo sitio web de Netiza. El objetivo es estructurar una landing page que no solo represente la identidad de "Raíces Digitales", sino que optimice la conversión a consultas calificadas por WhatsApp y consolide el SEO local en Mercedes, Buenos Aires.

---

## 1. Plan de Research (4 Puntos Clave)

### Punto 1: Análisis de Referentes Reales y Conversión por WhatsApp (AR/LatAm)
* **Objetivo de Investigación:** Identificar cómo estructuran la landing y el flujo de contacto los estudios boutique de diseño, branding y tecnología en Argentina y Latinoamérica que orientan su conversión principal a WhatsApp, justificando el valor de servicios profesionales sin competir por precio.
* **Qué investigar:**
  - **Ubicación y estilo del CTA:** Evaluar el rendimiento y visibilidad de los botones de WhatsApp (flotantes, fijos en navbar, o al final de secciones de alto valor).
  - **Ganchos de entrada:** Analizar si ofrecen un diagnóstico inicial (ej. "Auditoría Express"), cotizadores en línea interactivos, o si el click inicia una conversación directa sin filtro previo.
  - **Estructura de copy para pymes:** Cómo comunican tarifas y alcance a un cliente que "hace todo solo" y teme la complejidad técnica.
* **Fuentes y Herramientas:**
  - Benchmarking de 5 estudios boutique con posicionamiento regional o slow-business en Argentina (ej. agencias en Mendoza, Tandil, Luján o Córdoba con fuerte impronta local).
  - Auditoría de "Cliente Incógnito" (Mystery Shopping): Interactuar con el flujo de WhatsApp de estos referentes para cronometrar tiempos de respuesta y analizar plantillas/scripts de bienvenida.
* **Cómo verificar:** Mapear la arquitectura de información de los referentes en un diagrama de flujo y documentar sus hooks de conversión y objeciones resueltas antes del click.

### Punto 2: SEO Local Argentina, Google Business Profile (GBP) y Schema para Servicios Profesionales
* **Objetivo de Investigación:** Definir la estructura semántica y la configuración técnica óptima para posicionar a Netiza en búsquedas geolocalizadas de Mercedes (Buenos Aires) y alrededores, atrayendo al nicho de turismo rural y producción regional.
* **Qué investigar:**
  - **Esquema de datos estructurados:** Determinar si corresponde implementar un Schema tipo `LocalBusiness` o refinar a `ProfessionalService` / `ConsultingService` para el perfil híbrido de Netiza.
  - **Factores de ranking local en Argentina:** Atributos de GBP que más pesan en búsquedas como "diseño web Mercedes" o "Google Maps cabañas".
  - **Nodos locales de búsqueda:** Palabras clave secundarias con volumen de búsqueda regional y baja competencia en el interior de la provincia de Buenos Aires.
* **Fuentes y Herramientas:**
  - Directrices oficiales de Google Search Central y Schema.org.
  - Herramientas de análisis de competidores locales (ej. Google Maps Search Finder, Local Falcon o búsquedas geolocalizadas mediante VPN/simulador de ubicación).
* **Cómo verificar:** Crear un mock del JSON-LD para datos estructurados de Netiza y validar la presencia de competidores orgánicos directos en el "Local Pack" de Google para el nodo Mercedes-Luján.

### Punto 3: Patrones de Conversión UX y Micro-copy hacia WhatsApp
* **Objetivo de Investigación:** Determinar el micro-copy y las señales de confianza específicas que reducen la fricción psicológica de un usuario antes de hacer click para iniciar un chat privado.
* **Qué investigar:**
  - **Personalización vs. Abstracción:** Comparar clicks en CTAs genéricos ("Escribinos") versus CTAs personalizados con el nombre del equipo ("Hablá con Emilia").
  - **Expectativa de respuesta:** Evaluar el impacto de indicar tiempos de respuesta (ej. "Respondemos en menos de 1 hora" o "Atención de lunes a viernes").
  - **Fricción de salida:** Analizar qué información mínima necesita ver el cliente (testimonios visuales cercanos, método transparente) para dar el paso de salir de la web hacia su aplicación móvil personal.
* **Fuentes y Herramientas:**
  - Reportes de Conversion Rate Optimization (CRO) y heurísticas de usabilidad móvil de fuentes autoritativas (Nielsen Norman Group, CXL Institute).
  - Casos de estudio de optimización de conversión móvil a WhatsApp en mercados de habla hispana.
* **Cómo verificar:** Diseñar pruebas A/B teóricas de micro-copy para el Hero y contrastar la claridad de los mensajes pre-cargados que el usuario envía al hacer click (ej. "Hola Netiza, quiero ordenar lo básico..." vs. "Hola, quiero info...").

### Punto 4: Métricas y Benchmarks para el Objetivo de Consultas Semanales
* **Objetivo de Investigación:** Establecer los valores de referencia del funnel para estimar el volumen de tráfico mensual necesario que asegure un flujo constante de 3 a 5 consultas calificadas por semana.
* **Qué investigar:**
  - **Tasas de conversión estándar:** Benchmarks de conversión (visita-a-click en WhatsApp) para landings de servicios profesionales con tráfico templado (orgánico o pauta local).
  - **Calificación del Lead:** Definir la proporción promedio de consultas que son spam o clientes fuera de perfil frente a leads reales alineados con el nivel 1 o 2 de servicios.
  - **Capacidad de respuesta:** Tasa de cierre típica de consultas de WhatsApp a presupuestos aceptados para estudios boutique de servicios.
* **Fuentes y Herramientas:**
  - Datos agregados de plataformas de conversión locales y reportes sectoriales de marketing de servicios en LatAm (Doppler, Tiendanube, consultores de CRO).
* **Cómo verificar:** Modelar un funnel de conversión inverso (Bottom-Up) partiendo de la meta de 3 consultas/semana para deducir el volumen de tráfico mínimo y la tasa de conversión requerida en la landing.

---

## 2. Riesgos del Research

1. **Datos Sesgados por Tráfico Irreal:** Investigar referentes sin considerar de dónde proviene su tráfico (orgánico consolidado vs. pauta publicitaria agresiva) puede llevar a copiar patrones de conversión que solo funcionan con presupuestos altos de Ads.
2. **Exceso de Automatización:** Investigar flujos de WhatsApp y proponer bots complejos puede ahuyentar al cliente slow/rural de Netiza, el cual valora la cercanía humana y el trato personalizado ("nosotros, no un bot").
3. **Métricas Vanidosas vs. Conversión Real:** Confundir clics en el botón de WhatsApp (evento en la web) con conversaciones reales iniciadas y calificadas. Esto puede generar reportes optimistas pero cajas vacías.

---

## 3. Qué Verificar (Hipótesis Clave)

* **Hipótesis 1:** Un CTA personalizado con nombre propio (ej. *"Pedí tu auditoría con Emilia por WhatsApp"*) tiene una tasa de conversión superior a un CTA corporativo (*"Contactar con el estudio"*), al resonar mejor con la búsqueda de cercanía del cliente del interior.
* **Hipótesis 2:** La inclusión de una sección que explicite "Cómo trabajamos" de manera visual y metodológica neutraliza la falta de casos de éxito publicados al inicio, generando un nivel de confianza equivalente.
* **Hipótesis 3:** El uso de un JSON-LD tipo `LocalBusiness` con coordenadas físicas en Mercedes (BA) incrementará en un 30% la visibilidad en el "Local Pack" de Google para búsquedas de turismo rural de la zona frente a un sitio puramente global.

---

## 4. Resumen y Cierre

**Resumen del Plan:** Este plan estructura la investigación en cuatro pilares críticos: benchmarking de referentes boutique en LatAm que convierten a WhatsApp, optimización de SEO local/Schema para el nodo de Mercedes, análisis de patrones de conversión CRO en WhatsApp móvil, y modelado matemático del funnel para fijar la meta de 3-5 consultas semanales. Se busca basar el diseño de la landing en datos reales del mercado local, evitando corazonadas de diseño.

**Pendientes Inmediatos:**
1. Seleccionar los 5 sitios web de referentes regionales en Argentina para el análisis de Mystery Shopping.
2. Armar el prototipo del JSON-LD para los datos estructurados locales de Netiza.
3. Crear el borrador de los 3 mensajes pre-cargados de WhatsApp según el nivel de servicio elegido por el usuario en la landing.

---

```json
{
  "title": "Diseñado plan de research para NewNetizaWebsite",
  "type": "discovery",
  "scope": "project",
  "topic_key": "research/plan-landing-netiza",
  "content": {
    "What": "Se elaboró el plan de research de 4 puntos clave enfocado en referentes de conversión, SEO local, micro-copy UX de WhatsApp y benchmarks del funnel para el sitio web de Netiza.",
    "Why": "Para proporcionar un plan de investigación estructurado que guíe el handoff de diseño y garantice que el sitio convierta bajo evidencia empírica en lugar de corazonadas.",
    "Where": "C:\\Users\\Ale\\Proyectos\\NewNetizaWebsite\\doc\\planes-web\\geni-research.md",
    "Learned": "Es crítico balancear el deseo de conversión a WhatsApp con el tono 'slow' de Netiza para no espantar al cliente rural con flujos excesivamente automatizados o de venta agresiva."
  }
}
```
