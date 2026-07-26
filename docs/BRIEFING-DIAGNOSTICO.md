# Briefing — Diagnóstico interactivo de presencia digital (Netiza)

> Contexto consolidado para agentes. Documento de lectura obligatoria antes de cualquier
> trabajo sobre `/diagnostico`. Última actualización: 2026-07-26.

## 1. Qué estamos construyendo

Netiza es una agencia de estrategia digital, web e IA con base en Mercedes, Buenos Aires
(sitio: netiza.com.ar). Trabaja con pymes, comercios y profesionales independientes.

Vamos a publicar una página nueva, `/diagnostico`: un **autodiagnóstico interactivo de 12
preguntas** que le permite al dueño de una pyme evaluar su propia presencia digital.

Flujo completo:

1. El visitante entra a `/diagnostico` desde la home.
2. Contesta 12 preguntas, una por pantalla, con barra de progreso.
3. Ve **su puntaje y qué áreas le dieron mal**, en pantalla, gratis.
4. Para saber **qué hacer** con cada área en rojo, deja nombre y mail.
5. Recibe automáticamente un PDF con la guía.
6. A las 48-72 horas, el dueño de Netiza le escribe un mail personal comentando **un**
   punto rojo concreto de su resultado y cerrando con **una** pregunta.

El objetivo del sistema no es construir una lista de correo. Es generar 2-3 conversaciones
comerciales reales por mes, con contexto previo sobre el problema del prospecto.

## 2. Las 15 decisiones ya tomadas (NO re-discutir)

**Estrategia**

1. Objetivo: venta directa a corto plazo. Netiza contacta personalmente. No hay newsletter.
2. El mail es el "escalón intermedio" para quien todavía no está listo para hablar por
   WhatsApp. Consecuencia: el primer contacto humano **no puede ser un pitch**.
3. Público: pyme o comercio **establecido** (5+ años, ya factura, funciona bien offline,
   quedó atrás online). Transversal por rubro, angosto por etapa. NO emprendimientos.
4. El material es un **diagnóstico/autoevaluación**, no una guía educativa ni un benchmark.

**Formato**

5. Interactivo en el sitio, **no** un PDF descargable. Un PDF entrega el mail pero no las
   respuestas, y sin las respuestas el primer contacto vuelve a ser un pitch.
6. **Muro parcial**: el puntaje y las áreas en rojo se ven gratis; el mail compra el
   "qué hacer". El puntaje tiene que ser **honesto**: quien está bien debe ver que está bien.
7. Las dimensiones se expresan en el lenguaje del dueño, no en el de la agencia:
   **¿te encuentran?** → **¿te entienden?** → **¿te escriben?** → **¿te siguen eligiendo?**
   No hay dimensión de "IA" como categoría de servicio.

**Ejecución**

8. Seguimiento: autorespuesta inmediata con el PDF + mail personal a las 48-72 hs.
9. Ruta propia `/diagnostico`. El formulario de contacto actual de la home no se toca.
10. Los criterios se apoyan en **estándares verificables**; los frameworks de mensaje
    (StoryBrand, etc.) solo sirven para traducir lo difuso en chequeable, y quedan invisibles.
11. **12 preguntas, 3 por dimensión.** Una por pantalla, con barra de progreso.
12. El PDF premio es único, estructurado por dimensión. Explica **qué** hacer y **por qué**,
    nunca el paso a paso (eso lo convertiría en guía educativa y rompe la decisión 4).
13. Los libros no se citan en el cuerpo del material; los estándares sí. Página final de fuentes.
14. Medición: 3 eventos GA4 (`diagnostico_start`, `diagnostico_complete`, `diagnostico_lead`)
    + grabaciones de Microsoft Clarity.
15. Dos puentes desde la home: después de la sección `ElProblema` y en `CTAFinal` como salida
    suave. Regla dura: **el diagnóstico nunca aparece antes que el CTA de WhatsApp en la
    misma pantalla.**

## 3. Arquitectura técnica

- Astro **estático puro** (sin adapter, sin SSR), desplegado en hosting compartido Hostinger.
  Ver `astro.config.mjs`. **No hay backend y no se va a agregar uno.**
- El único canal de datos es **FormSubmit.co** vía AJAX. Ver `src/components/sections/Contacto.astro`.
  Las respuestas del diagnóstico viajan como campos ocultos en el mismo POST y llegan al inbox
  en formato tabla.
- El cálculo del puntaje corre **100% client-side** en JavaScript.
- `src/components/Analytics.astro` ya centraliza GA4, Microsoft Clarity y Meta Pixel, con un
  patrón de tracker delegado (ver el evento existente `whatsapp_click` con sección de origen).
  Los eventos nuevos siguen esa convención, en ese mismo archivo.
- Restricción: **cero infraestructura nueva, cero servicios nuevos, cero costo adicional.**

## 4. Restricciones para redactar las 12 preguntas

Estas son las reglas que cualquier pregunta tiene que cumplir. Una pregunta que falle
cualquiera de ellas se descarta.

1. **Verificable, no opinable.** "¿Tu mensaje es claro?" es una opinión disfrazada de
   pregunta: nadie se pone un 2. "¿Tu ficha de Google tiene los horarios de hoy?" se
   contesta sí o no. Toda pregunta debe tener un criterio objetivo y un umbral defendible.
2. **Contestable sin abrir otra pestaña.** El dueño responde de memoria o mirando su propio
   celular. Si para contestar necesita entrar a Google Analytics o a una herramienta externa,
   abandona. (Única excepción admitida: la última pregunta del cuestionario, donde el
   abandono ya no cuesta nada porque el resto de las respuestas ya se capturaron.)
3. **En el idioma del dueño, no en el de la agencia.** El dueño de la ferretería no piensa
   "mi posicionamiento de marca está flojo"; piensa "no me llama nadie". Nada de jerga:
   ni "SEO", ni "posicionamiento", ni "conversión", ni "engagement", ni "CTA".
4. **Español rioplatense neutro-profesional, con voseo**, consistente con el copy actual del
   sitio. Sin slang, sin mayúsculas enfáticas, sin signos de admiración.
5. **Cada pregunta necesita 3 a 4 opciones de respuesta escalonadas**, con un puntaje
   asignado a cada una, de forma que la dimensión pueda dar 0 / 33 / 67 / 100.
6. **Nada que avergüence gratis.** El tono es el de un colega que te muestra un espejo,
   no el de un examen que buscás reprobar.

## 5. Filtro de fuentes: qué aplica y qué no

Se investigaron 13 fuentes (Whitespark Local Search Ranking Factors 2026, BrightLocal Local
Consumer Review Survey 2026, SOCi Local Visibility Index y modelo F.A.C.T.S., documentación
de Google sobre Core Web Vitals y Page Experience, comparativa de frameworks de messaging).

### Criterios que SÍ sirven (verificables, con umbral)

| Área | Criterio y umbral | Fuente |
|---|---|---|
| Te encuentran | Categoría primaria de Google Business Profile correcta — factor #1 del local pack | Whitespark 2026 |
| Te encuentran | Horarios reales al momento de la búsqueda — 5º factor de Maps; la visibilidad se degrada en la última hora antes de cerrar | Whitespark 2026 |
| Te encuentran | Dirección física visible; fotos recientes; señales de actividad | Whitespark 2026 |
| Te entienden | Una página dedicada por cada servicio — factor orgánico local #1 | Whitespark 2026 |
| Te entienden | Datos estructurados `LocalBusiness` (Schema.org) | SOCi |
| Te escriben | LCP < 2,5 s · INP < 200 ms · CLS < 0,1, medidos en percentil 75 de usuarios reales (CrUX), no en Lighthouse local | Google / web.dev |
| Te siguen eligiendo | Piso de 20 reseñas — 47% de los consumidores descarta por debajo de eso; solo 9% se arriesga con 5 o menos | BrightLocal 2026 |
| Te siguen eligiendo | 4,5 estrellas — 31% descarta por debajo | BrightLocal 2026 |
| Te siguen eligiendo | Recencia menor a 3 meses — 74% solo considera reseñas de ese período | BrightLocal 2026 |
| Te siguen eligiendo | Responder el 100% de las reseñas — ignorarlas espanta al 42%; responder todas atrae al 80%; las respuestas de plantilla repelen al 50% | BrightLocal 2026 |

### Qué NO aplica (y por qué)

- **Yelp, Apple Maps, TripAdvisor**: peso marginal en Argentina. El conjunto de plataformas
  relevante acá es Google Maps + Facebook + Instagram + web propia. Preguntarle a un comercio
  de Mercedes por su perfil de Yelp destruye la credibilidad del diagnóstico en una pregunta.
- **Regulación FTC sobre reseñas falsas**: es legislación de Estados Unidos.
- **Local Services Ads y el análisis por IA de las llamadas**: ese producto no está
  disponible en el mercado argentino.
- **SOCi Local Visibility Index**: el propio estudio declara que analiza marcas de 50 o más
  sucursales y que **no mide negocios independientes de una sola ubicación** — que es
  exactamente el público de este diagnóstico. Sus cifras no se pueden usar.
- **Frameworks MMF y Fletch PMM**: diseñados para B2B SaaS de USD 5M-75M de facturación.
  Fuera de alcance.
- **Meter palabras clave en el nombre del Google Business Profile**: Whitespark confirma que
  funciona (3er factor de Maps), pero es una violación de las directrices de Google y
  contradice el posicionamiento explícito de Netiza ("sin humo", en `QueHacemos.astro`).
  **No se recomienda bajo ninguna circunstancia.**

### Advertencia de uso de datos

BrightLocal, Whitespark y SOCi encuestan mercado estadounidense. **Se usa la dirección del
hallazgo, nunca la cifra**, en material dirigido a pymes argentinas. Citar "el 97% de los
argentinos lee reseñas" es inventar, y si el lector lo verifica se pierde toda la credibilidad
construida. El dato de descubrimiento vía IA (6% → 45% en doce meses) es un salto de 7x en un
año: tratarlo como señal de dirección, no como número.

### Oportunidad diferencial

El 45% de los consumidores ya pide recomendaciones de negocios locales a herramientas de IA,
y estar en el local pack de Google **no** garantiza aparecer en ChatGPT o Perplexity — las
señales se solaparon pero la visibilidad no es la misma. Ninguna agencia de la zona está
haciendo esa pregunta. Es el mayor diferencial disponible para este diagnóstico.

## 6. Archivos relevantes del repo

- `src/pages/index.astro` — única ruta existente hoy.
- `src/components/sections/Contacto.astro` — formulario actual, endpoint FormSubmit, validación.
- `src/components/sections/ElProblema.astro`, `CTAFinal.astro` — donde van los dos puentes.
- `src/components/sections/QueHacemos.astro`, `ParaQuien.astro`, `Hero.astro` — referencia de
  tono y voz del copy actual.
- `src/components/Analytics.astro` — GA4 + Clarity + Meta Pixel centralizados.
- `astro.config.mjs` — confirma salida estática y sitemap.
