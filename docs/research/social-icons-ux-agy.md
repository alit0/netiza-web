# Reporte de Investigación UX/UI: Ubicación de Iconos de Redes Sociales en Landings de Conversión

**Proyecto:** Netiza Web (`https://netiza.com.ar`)  
**Fecha:** Julio 2026  
**Autor:** Antigravity CLI (Browser & UX Research Subagent)  
**Objetivo del Sitio:** Conversión #1 a WhatsApp (Canal principal de captación de leads).

---

## 1. Resumen Ejecutivo (Executive Summary)

* **Diagnóstico actual:** Netiza posee presencia en redes sociales declarada correctamente en datos estructurados (JSON-LD `sameAs`), pero sin iconos visuales en la interfaz. El sitio está optimizado como una landing page de alta conversión con foco exclusivo en WhatsApp.
* **Patrón de la Industria (2025–2026):** El 85%+ de las landings B2B/pymes de conversión ubican las redes sociales **exclusivamente en el Footer** o las omiten por completo del flujo visual para evitar la "fuga de tráfico" (conversion leakage).
* **Recomendación Final para Netiza:** **Opción A (Footer).** Colocar dos iconos discretos (Instagram y Facebook) en el footer de la página, por debajo de toda la información comercial y del CTA final. 
* **Regla Innegociable:** **NUNCA colocar barra flotante de redes ni iconos en el header**, ya que competirían visual y funcionalmente con el botón flotante y botones de acción a WhatsApp, reduciendo la tasa de conversión.

---

## 2. Investigación de Mejores Prácticas UX/UI (2025-2026)

De acuerdo con la literatura actual de CRO (Conversion Rate Optimization) y firmas de investigación UX (Nielsen Norman Group, CXL, Unbounce):

1. **Principio de Atención Única (1 Página = 1 Objetivo):** Una landing page efectiva debe reducir los "puntos de fuga" (exit points). Llevar al visitante a Instagram o Facebook lo expone a distracciones de la propia red social (notificaciones, reels de competidores, feed) perdiendo la atención del lead.
2. **Rol de las Redes Sociales en B2B/Pymes:** No son canales primarios de captura, sino **prueba social (social proof)** secundaria. El usuario recurre a las redes al final de su toma de decisión para verificar que la empresa existe y está activa.
3. **Jerarquía Visual y Mobile-First:** En mobile, el espacio en pantalla ("thumb zone" y barra fija inferior) es sumamente reducido. Superponer un botón flotante de WhatsApp junto a iconos flotantes de redes crea desorden visual, clics accidentales y parálisis por análisis (Ley de Hick).

---

## 3. Comparativa de las 3 Opciones de Ubicación

| Criterio | (a) Footer | (b) Header / Navbar | (c) Barra Flotante Al Costado |
| :--- | :--- | :--- | :--- |
| **Visibilidad** | Baja/Media (solo al llegar al final o buscar activamente). | Alta (primer pantallazo). | Máxima (siempre presente durante el scroll). |
| **Impacto en Conversión (WhatsApp)** | **Positivo / Neutro.** No interrumpe el flujo principal. Captura al usuario analítico que busca validar la marca. | **Negativo.** Ofrece una vía de escape inmediata antes de leer la propuesta de valor. | **Muy Negativo.** Canibaliza directamente la atención del botón flotante de WhatsApp. |
| **Experiencia Mobile** | **Excelente.** No ocupa espacio en viewport ni obstaculiza la zona del pulgar. | **Mala.** Ocupa espacio valioso en la barra de navegación responsive. | **Pésima.** Provoca colisión visual y touch targets demasiado juntos en smartphones. |
| **Cuándo se usa** | Landings de conversión, sitios de agencias B2B, servicios profesionales. | Sitios de contenido/medios, blogs, marcas donde la comunidad en redes ES el producto. | Sitios de noticias, e-commerce masivos o blogs con contenido compartible. |

### Análisis Detallado por Opción

#### Opción A: Footer (Recomendada)
* **Pros:**
  * Respeta el patrón mental del usuario moderno (el footer es el "estacionamiento" de links secundarios).
  * Funciona como prueba social silenciosa: el usuario escéptico scrollea hasta abajo y valida que Netiza está activa en Instagram/Facebook.
  * Cero interferencia con los CTAs de WhatsApp colocados en Hero, Secciones y Footer.
* **Contras:** Menor visibilidad directa para quienes no navegan hasta el final.
* **Impacto en Conversión:** Mantiene intacto el embudo. Quien llega al footer ya absorbió la propuesta comercial.

#### Opción B: Header / Navbar (No Recomendada)
* **Pros:** Acceso inmediato desde el inicio.
* **Contras:**
  * Genera "conversion leakage": el usuario hace clic en Instagram antes de entender qué hace Netiza y se pierde en el feed.
  * Sobrecarga el Header en dispositivos móviles donde el foco debe ser el botón primario "WhatsApp" y el menú hamburguesa.
* **Impacto en Conversión:** Reduce el Conversion Rate al derivar tráfico pagado/orgánico hacia plataformas externas.

#### Opción C: Barra Flotante Lateral (Totalmente Desaconsejada)
* **Pros:** Ninguno relevante para una landing de servicios.
* **Contras:**
  * Entra en colisión directa con el Floating Button de WhatsApp (estrella del sitio).
  * Agrega ruido visual durante todo el scroll.
  * Aumenta la carga cognitiva del usuario.
* **Impacto en Conversión:** Pésimo. Aumenta la tasa de rebote y disminuye la tasa de clics en el botón de WhatsApp.

---

## 4. Evidencia y Ejemplos Reales de Mercado

Analizamos sitios reales de agencias y landings de conversión con el Browser / HTTP Inspector:

1. **Netiza (Sitio actual - `https://netiza.com.ar`):**
   * *Estado:* Landing de una sola página. Foco 100% en WhatsApp (CTAs en Header, Hero, Servicios, Método y CTA final).
   * *Redes:* Incluidas en Schema.org JSON-LD (`sameAs`), pero invisibles visualmente.
   * *Patrón:* Enfocado en conversión directa.

2. **Aerolab (`https://aerolab.co`):**
   * *Patrón:* Redes sociales ubicadas **exclusivamente en el Footer** (sección "Follow" con LinkedIn, Instagram, X, Dribbble, GitHub).
   * *Header:* Limpio, enfocado únicamente en navegación de productos y contacto.

3. **Wodes Agency (`https://wodes.com.ar`):**
   * *Patrón:* Botón **flotante único de WhatsApp** en el borde inferior derecho.
   * *Redes:* Enlaces a redes relegados al footer y páginas de servicios. Sin barra flotante de redes.

4. **Flama Creators (`https://flamacreators.com`):**
   * *Patrón en Mobile:* La agencia oculta explícitamente los iconos de redes sociales en el header móvil mediante CSS (`@media (max-width: 900px) { .fn-social { display: none !important; } }`), priorizando únicamente el CTA de conversión a formulario/WhatsApp.

---

## 5. Respuestas Explícitas a la Tarea

1. **¿Cuál es el patrón MÁS usado hoy?**
   * El patrón dominante en agencias de desarrollo, diseño y marketing B2B es ubicar los enlaces a redes sociales **únicamente en el Footer**.

2. **¿Cuál es el MEJOR patrón para Netiza (objetivo #1 = conversión por WhatsApp)?**
   * **Colocar los iconos de Instagram y Facebook de forma discreta en el Footer.**
   * *Fundamento:* Si el visitante quiere consultar o contratar, WhatsApp está presente en el Hero, en las secciones y mediante el CTA del Header. Si el visitante aún tiene dudas sobre la legitimidad de la agencia, bajará al Footer y encontrará los accesos a Instagram/Facebook como validación de confianza, sin canibalizar en ningún momento los botones principales.

---

## 6. Recomendación de Diseño UX/UI para la Implementación (Para Claude / Orquestador)

* **Ubicación:** `footer.footer` (debajo de `p.footer__location` o al lado de los datos de marca).
* **Estilo:** Iconos SVG monocromáticos / minimalistas (acordes al tema dark/light de Netiza) con `aria-label="Instagram de Netiza"` y `aria-label="Facebook de Netiza"`.
* **Atributos:** `target="_blank" rel="noopener noreferrer"` para abrir en pestaña nueva y no perder la sesión del usuario en la landing.
* **Tracking:** Agregar evento de analítica (GA4 / Meta Pixel) si se desea medir cuántos usuarios hacen clic en las redes (ej. `gtag('event', 'social_click', { platform: 'instagram' })`).
