# Plan de QA, Testing y Riesgos — Nuevo Sitio Web Netiza

Este plan define la estrategia de verificación de calidad del nuevo sitio de Netiza: accesibilidad WCAG 2.2, testing funcional/E2E, cobertura cross-browser/device, riesgos técnicos y criterios de deploy. No incluye implementación — solo el qué, cómo y con qué validar.

**Base de accesibilidad:** la especificación de diseño en Penpot (`design-spec-penpot-netiza.md` §7) ya auditó contraste (≥4.5:1 en todos los pares, títulos 13–15:1), touch targets (≥24×24 px), texto alternativo por recurso y naming semántico de capas. Este plan de QA **usa ese estándar como referencia**, no lo redefine.

---

## 1. Accesibilidad WCAG 2.2 — Cómo Testearla

El design spec §7 cubre el nivel de diseño. El plan de QA verifica que el build real respete esos estándares y agregue lo que solo se audita en código.

### 1.1 Verificación automatizada (por build)

| Herramienta | Qué cubre | Cómo integrar |
|---|---|---|
| **axe-core** (via `@axe-core/playwright`) | WCAG 2.2 AA: contraste, roles ARIA, alt, focus order, landmark regions, touch targets, heading hierarchy | Ejecutar `axe.run()` por cada ruta y por cada componente interactivo abierto (FAQ expandido, menú hamburger, theme toggle) |
| **Lighthouse a11y** (via Playwright Lighthouse o Chrome DevTools) | Score agregado + lista de violaciones | Correr en CI para desktop y mobile. Threshold: ≥95 |
| **HTML validation** (W3C validator) | Marcado semántico: headings no salteados, `aria-*` en elementos correctos, `role` no redundante | Validar el HTML servido (no el source) en CI |

### 1.2 Verificación manual (checklist por release)

Lo que solo audita un humano:

- **Foco visible (2.4.7):** todos los interactivos (links, botones, FAQ toggles, hamburger, theme toggle) muestran un anillo visible. Verificar con `Tab` + `Shift+Tab` en desktop y con teclado en mobile.
- **Orden de foco (2.4.3):** tab index sigue el orden visual, sin trampas de foco, con `scroll-padding-top` para el navbar fijo (design spec §7, nota de handoff).
- **Skip link:** verificar que existe un "Saltar al contenido" visible al foco.
- **`prefers-reduced-motion`:** desactivar reveals, marquees y animaciones de scroll. Probar con la flag del SO activada.
- **Alt/ARIA por recurso:** contrastar contra la tabla de design spec §7 (logo, play, hamburger, theme toggle, FAQ toggle, ticks comparativos, fotos de equipo, reels, video hero).
- **Contraste en estados reales:** hover, focus, expanded, active — no solo el estado default. Esto va más allá de la auditoría de diseño.

### 1.3 Umbral de aprobación

- Cero violaciones *critical* o *serious* en axe-core en todas las rutas.
- Lighthouse a11y score ≥95.
- Checklist manual completo sin hallazgos bloqueantes.

---

## 2. Testing Funcional / E2E (Playwright)

### 2.1 Flujos clave a cubrir

| # | Flujo | Validación |
|---|---|---|
| 1 | **Hero → CTA WhatsApp** | Click en "Pedí tu auditoría por WhatsApp" desde Hero: verificar que el link es `https://wa.me/549...` con mensaje pre-cargado correcto. El atributo `target="_blank"` debe incluir `rel="noopener noreferrer"`. |
| 2 | **Cada nivel de servicio → WhatsApp** | Tres botones distintos (Nivel 1, 2, 3) con mensajes pre-cargados diferentes. Verificar que cada uno abre WhatsApp con el texto correcto. |
| 3 | **CTA final → WhatsApp** | Botón "Escribinos por WhatsApp" en sección contacto. |
| 4 | **Navbar WhatsApp (mobile y desktop)** | El ícono de WhatsApp en el navbar debe funcionar en ambos breakpoints. |
| 5 | **Navegación + scroll** | Cada link del navbar y hamburger baja a la sección correcta con `scroll-padding-top` respetando el navbar fijo. |
| 6 | **FAQ accordion** | Cada pregunta expande/colapsa su respuesta. `aria-expanded` cambia correctamente. Solo una pregunta abierta a la vez (o se permite múltiple — definir con diseño). |
| 7 | **Theme toggle** | Cambia `data-theme` en `<html>`. Persiste la elección en `localStorage`. Sin flash de tema incorrecto al cargar (FOUC). El `aria-label` cambia entre "Cambiar entre modo claro y oscuro" / "Cambiar entre modo oscuro y claro". |
| 8 | **Hamburger menu (mobile)** | Abre/cierra el menú. `aria-expanded` en el botón. Foco se mueve al primer item del menú al abrir. Cierra con `Escape`. |
| 9 | **Formulario de contacto** | Enviar con campos válidos → feedback visual. Enviar vacío → errores por campo con `aria-describedby`. |
| 10 | **Footer links** | Cada enlace del footer navega correctamente o abre en pestaña nueva con `rel="noopener noreferrer"`. |

### 2.2 Configuración de Playwright

- **Proyectos:** `Desktop Chrome`, `Desktop Firefox`, `Mobile Chrome` (Pixel 5 emulation, viewport 390×844).
- **Base URL desde variable de entorno** (staging vs. producción).
- **Test IDs:** usar `data-testid` para selectores estables, no depender de clases CSS ni texto (el contenido puede cambiar).
- **Setup global:** inyectar `axe-core` y Lighthouse en el contexto de manera condicional (no en todos los tests, solo en los de a11y).
- **Reporte:** `playwright-report` + `junit.xml` para CI.

### 2.3 WhatsApp — validación sin enviar mensajes reales

- Validar la URL generada (regex contra `https://wa.me/549...` + mensaje codificado).
- Verificar que el número de teléfono es el correcto y está definido como variable de entorno/TEST, no hardcodeado.
- En staging/preview, el número de WhatsApp puede ser un mock o un grupo de prueba.

---

## 3. Cross-Browser, Cross-Device y Responsive

### 3.1 Matriz de cobertura

| Dispositivo | Viewport | Navegadores |
|---|---|---|
| Mobile | 390×844 (iPhone 14 / Pixel 5) | Chrome, Safari (iOS), Firefox |
| Tablet | 810×1080 (iPad) | Chrome, Safari |
| Desktop | 1440×900 (mínimo) + 1920×1080 | Chrome, Firefox, Edge |

### 3.2 Verificaciones por viewport

- **Mobile 390:** todas las secciones apiladas en columna única (342 px de contenido útil). Botones full-width. Tipografía reducida según tabla del design spec §1. Hamburger funcional.
- **Tablet 810–1199:** layout intermedio según lo que defina el build. Verificar que no haya overflow horizontal ni cards cortadas.
- **Desktop ≥1200:** contenedor centrado 1200 px, contenido útil 1072 px. Navbar con links visibles (sin hamburger). Four-column y three-column layouts donde aplique.

### 3.3 Tooling

- **Playwright projects** (mobile + desktop emulation) para cobertura automatizada.
- **BrowserStack o Sauce Labs** (manual/puntual) para Safari en iOS real y Edge en Windows — si el presupuesto lo permite.
- **Responsive testing:** verificar que no hay `overflow-x: hidden` que tape problemas de layout; usar `await page.setViewportSize()` en tests parametrizados.

---

## 4. Riesgos Técnicos y de Contenido

### 4.1 Riesgos identificados

| Riesgo | Severidad | Mitigación en QA |
|---|---|---|
| **Links rotos (internos y WhatsApp)** | Critical | Test automatizado: recorrer todos los `<a href>` del DOM y verificar que anchors internos (`#seccion`) existen en el documento; links externos devuelven 200 (con retry por rate-limit). Incluir en CI. |
| **OG / Meta tags ausentes** | High | Validar en build: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `twitter:card`. El contenido debe matchear el design spec y la estrategia SEO. Usar `page.locator('meta[property="og:title"]')` y verificar `content`. |
| **Performance (Core Web Vitals)** | High | Medir con Lighthouse en CI: LCP < 2.5s, CLS < 0.1, INP < 200ms. Threshold: score ≥90 en performance. Las imágenes del hero deben cargar con `fetchpriority="high"` (design spec §7, nota de handoff). |
| **FOUC de tema (flash of unstyled content)** | Medium | Test automatizado: cargar la página, verificar que el atributo `data-theme` está presente en `<html>` antes del primer paint. Probar con `localStorage` seteado y sin setear. |
| **Contenido invisible para Google (JS-only rendering)** | Critical | Validar que el HTML servido (View Source o `curl`) contiene todo el texto y headings. Si es SPA: verificar SSR/SSG efectivo con `curl` + grep de contenido clave. Si falla, el sitio no existe para Google. |
| **Scroll hijack / animaciones que bloquean UX** | Medium | Verificar que no hay `scroll-behavior` forzado que impida `prefers-reduced-motion`. El scroll nativo debe funcionar sin delays artificiales. |
| **Formulario sin protección anti-spam** | Medium | Aunque no se testea la lógica de backend, verificar que el formulario tiene `honeypot` o rate-limiting visible (headers, tiempos mínimos de submit). No exponer endpoints sin protección. |
| **Imágenes sin width/height explícitos (CLS)** | Medium | Verificar que `<img>` y `<video>` tienen atributos `width` y `height` (design spec §7). Test automatizado: escanear media elements y fallar si falta dimensión explícita. |
| **Schema LocalBusiness / JSON-LD malformado** | High | Validar con Google Rich Results Test programáticamente o validando estructura JSON-LD en el DOM contra el schema esperado. |

### 4.2 Verificación automatizada de links rotos (POC)

```yaml
# Pseudocódigo para test de Playwright
test: "sin links rotos"
  - recolectar todos los <a href>
  - para links internos (#...):
      verificar que el id existe en el DOM
  - para links externos (https://...):
      HEAD request con timeout y retry
      si 404/500 → falla
  - excluir links de WhatsApp (validados en tests separados)
```

---

## 5. Criterios de "Listo para Deploy"

El sitio está listo para producción cuando se cumplen **todos** estos:

### 5.1 Gates bloqueantes

- [ ] axe-core: cero violaciones *critical* o *serious* en todas las rutas.
- [ ] Lighthouse a11y ≥95, performance ≥90.
- [ ] Todos los tests E2E (10 flujos) pasan en Desktop Chrome, Desktop Firefox y Mobile Chrome.
- [ ] Links rotos: cero en internos y externos.
- [ ] HTML servido contiene todo el contenido indexable (`curl` + grep).
- [ ] Meta tags OG presentes y con contenido correcto.
- [ ] Schema `LocalBusiness` JSON-LD válido (Google Rich Results Test).
- [ ] Checklist manual de a11y completado sin bloqueantes.
- [ ] WhatsApp: los 4 CTAs (Hero, Nivel 1, Nivel 2, Nivel 3) generan URLs correctas con el número real.
- [ ] Tema: sin FOUC, `data-theme` persiste en `localStorage`, toggle funcional.
- [ ] `prefers-reduced-motion` respetado (no animaciones, no reveals).
- [ ] Formulario de contacto: validación client-side funcional, campos con `aria-describedby`.

### 5.2 Gates deseables (no bloquean, pero se registran como debt)

- [ ] Lighthouse performance ≥95.
- [ ] Cobertura de tests E2E ≥80% de flujos críticos.
- [ ] BrowserStack manual en Safari iOS y Edge pasó sin regresiones visuales.
- [ ] `sitemap.xml` y `robots.txt` presentes y correctos.

---

## 6. Riesgos del Plan de QA

1. **Falsos negativos en axe-core:** componentes renderizados dinámicamente (FAQ expandido, menú hamburger abierto) requieren que el test espere el estado correcto antes de ejecutar `axe.run()`. Si no, se audita un DOM incompleto y pasan violaciones reales.
2. **WhatsApp no testeable end-to-end en CI:** no se puede verificar que el mensaje realmente llegue, solo la URL generada. Un cambio en el formato de `wa.me` o en el número rompería el flujo sin ser detectado.
3. **CLS en imágenes lazy:** las imágenes con `loading="lazy"` sin `width`/`height` explícitos causan layout shift acumulativo que Lighthouse mide, pero solo en condiciones de red reales, no en localhost. Probar en preview/staging con throttling.
4. **Testing cross-browser limitado a emulación:** Playwright emula viewports pero no motores de renderizado. Safari iOS real puede comportarse distinto con `position: fixed`, `backdrop-filter`, o `100dvh`. Si no hay presupuesto para dispositivos reales, priorizar al menos una verificación manual en iPhone + iPad real antes del deploy final.

---

## 7. Resumen

**Resumen del Plan:** El QA se estructura en 5 pilares: accesibilidad WCAG 2.2 automatizada con axe-core + Lighthouse (umbral ≥95) más checklist manual basado en el design spec §7; 10 flujos E2E con Playwright cubriendo todos los CTAs a WhatsApp, navegación, FAQ, theme toggle y formulario; cobertura cross-browser/device en mobile 390, tablet 810 y desktop 1200+ con proyectos parametrizados; verificación automatizada de riesgos técnicos (links rotos, OG tags, performance ≥90, SSR/HTML indexable, FOUC, CLS, Schema); y 12 gates bloqueantes de deploy más 4 deseables. El plan asume que el estándar de accesibilidad ya está definido en el diseño: QA lo verifica, no lo inventa.

**Pendientes Inmediatos:**
1. Definir el número de WhatsApp de staging/pruebas como variable de entorno para los tests E2E.
2. Configurar los 3 mensajes pre-cargados de WhatsApp (Nivel 1, 2, 3) y validarlos contra el copy del design spec.
3. Instalar `@axe-core/playwright` y `playwright-lighthouse` en el proyecto y crear el script de CI que ejecute ambos.
4. Crear el checklist manual de a11y en base a la tabla de recursos del design spec §7 y asignar responsable de la verificación pre-deploy.
5. Decidir si se cubre Safari iOS real (BrowserStack o dispositivo físico) antes del deploy o se difiere como debt post-launch.

**Nota sobre engram:** no se dispone de la herramienta `mem_save` en esta sesión. Si se requiere persistencia en engram, ejecutar manualmente desde la ruta de trabajo:
```
engram save "Plan de QA y testing para NewNetizaWebsite" "<resumen del plan>" --type discovery
```
