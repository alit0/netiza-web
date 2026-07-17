# Notas de Diseño Visual por Sección — Netiza (Penpot)

Este documento detalla los aspectos visuales, proporciones, jerarquía, diferencias entre temas (Light/Dark) y adaptabilidad responsiva (Desktop/Mobile) para cada una de las 13 secciones del diseño de Netiza. Complementa al spec escrito agregando las métricas, assets y acentos visuales específicos.

---

## 1. Navbar
*   **Jerarquía y Proporciones:**
    *   **Desktop:** Flex row de `1072px` de ancho útil y `85px` de alto. Alineación vertical centrada. Espaciado implícito mediante Flex layout.
    *   **Mobile:** Se reduce a `342px` de ancho y `56px` de alto. Los links de navegación colapsan en el menú hamburguesa (`26x24px`).
*   **Light vs Dark:**
    *   Fondo transparente (hereda del canvas: `#efebe5` en Light, `#161412` en Dark).
    *   El toggle de tema (`40x40px`, r=pill) tiene un fondo de `#232323` al 4% (Light) y `#efeae1` al 5% (Dark). Muestra el glifo `☾` (Light) y `☀` (Dark) en `18px`.
*   **Acento Naranja:**
    *   El botón de acción principal (`Btn WhatsApp`, `170x37px` en desktop) usa fondo naranja accesible **`#c2410c`** (contraste 5.18:1 con texto blanco).
*   **Tipografía e Itálica:**
    *   Links en **Inter 14px** (peso 500, letterSpacing `-0.56px`, align left). Sin itálicas en esta sección.

---

## 2. Hero
*   **Jerarquía y Proporciones:**
    *   **Desktop:** Altura de `676px`. Organizado en 2 columnas: la izquierda contiene el bloque de copy (`hero-copy`), y la derecha el video vertical en proporción 9:16 (`360x520px`).
    *   **Mobile:** Altura total de `1076px`. Cambia a 1 columna: el copy se apila arriba y el video (`342x440px`) se ubica abajo.
*   **Light vs Dark:**
    *   El video del hero (`Hero`) se muestra como un frame vertical en escala cálida/neutra.
    *   El botón de reproducción (`play` de `72x72px`) cambia su fondo de `#ffffff` (Light) a `#f0ebe2` (Dark).
    *   El kicker/eyebrow superior tiene fondo `#232323` al 4% (Light) y `#efeae1` al 4% (Dark).
*   **Acento Naranja:**
    *   Botón principal (`Btn primary`, `256x59px` en desktop, `full-width` en mobile) usa fondo **`#c2410c`**.
*   **Tipografía e Itálica:**
    *   Título H1: **Inter 56px** (Desktop, tracking `-2.8px`) / **40px** (Mobile, tracking `-1.9px`).
    *   Itálica de acento: la palabra **"chico"** está en **Source Serif 4 56px (italic)** (Desktop) / **40px (italic)** (Mobile).

---

## 3. Qué hacemos
*   **Jerarquía y Proporciones:**
    *   **Desktop:** Bloque de `1492x910px`. Header centrado (`section-header`) con un gap de `56px` hacia la grilla de servicios. 4 servicios distribuidos en una fila horizontal de cards.
    *   **Mobile:** Bloque de `390x1094px`. Las 4 cards se apilan verticalmente con un gap de `32px`.
*   **Light vs Dark:**
    *   Las cards de servicios cambian su fondo de `#f7f2ea` (Light, `surface-light`) a `#211e1a` (Dark, `surface-dark`).
*   **Acento Naranja:**
    *   Botón de cierre de sección (`Btn primary`, `256x59px` en desktop) con fondo naranja accesible **`#c2410c`**.
*   **Tipografía e Itálica:**
    *   Título H2: **Inter 46px** (Desktop, tracking `-2.4px`) / **24px** (Mobile, tracking `-1.4px`).
    *   Itálica de acento: la frase **"en serio"** está en **Source Serif 4 46px (italic)** / **24px (italic)**.
    *   Cards: título en **Inter 20px** (Desktop) / **18px** (Mobile) (tracking `-1px`/`-0.8px`), cuerpo en **Inter 16px** (tracking `-0.4px`).

---

## 4. Trabajos (Design-Only)
*   **Jerarquía y Proporciones:**
    *   **Desktop:** Sección de `1492x936px`. Grilla de 3 reels verticales alineados horizontalmente (`reel-list`, `1072x500px` de contenedor).
        *   Cada reel mide **`336x480px`** con un **borde redondeado de `20px`**.
        *   Contiene un botón de `play` flotante centrado (`60x60px`, r=pill) que aloja el glifo `▶` (Inter 20px).
    *   **Mobile:** Se reestructura a `390x1555px`. Los reels se apilan verticalmente.
        *   Cada reel se ensancha y acorta a **`342x400px`**, manteniendo el radio de **`20px`**.
*   **Light vs Dark:**
    *   El kicker "Trabajos" (`83x35px`) cambia de `#232323` @ 4% (Light) a `#efeae1` @ 4% (Dark).
    *   Los círculos de `play` cambian de `#ffffff` (Light) a `#f0ebe2` (Dark).
*   **Detalle de los Reels (Imágenes):**
    *   `Reel 1` ("Reel — producto local") -> Imagen de producto artesanal/local en tonos cálidos.
    *   `Reel 2` ("Reel — turismo rural") -> Paisaje de campo o exteriores cálido.
    *   `Reel 3` ("Reel — detrás de escena") -> Toma de estudio o producción en Mercedes.
*   **Acento Naranja:**
    *   Sin acentos naranjas directos en la UI para no competir con el contenido de los reels.
*   **Tipografía e Itálica:**
    *   Título H2: "Contenido que *trabaja* por tu negocio."
    *   Itálica de acento: la palabra **"trabaja"** está en **Source Serif 4 46px (italic)** (Desktop) / **24px (italic)** (Mobile).

---

## 5. El problema
*   **Jerarquía y Proporciones:**
    *   **Desktop:** Bloque de `1492x613px`. Fila horizontal de 3 cards (`346x140px`/`166px`).
    *   **Mobile:** Altura de `688px`. Las cards se apilan a ancho completo (`342x126px` cada una, r=16px).
*   **Light vs Dark:**
    *   Las cards cambian su fondo de `#f7f2ea` (Light) a `#211e1a` (Dark).
*   **Tipografía e Itálica:**
    *   Título H2: "Lo bueno no se vende solo. Primero tiene que *verse claro*."
    *   Itálica de acento: la frase **"verse claro"** está en **Source Serif 4 46px (italic)** / **24px (italic)**.

---

## 6. Para quién
*   **Jerarquía y Proporciones:**
    *   **Desktop:** Bloque de `1492x777px`. Incluye 6 chips de tags horizontales, seguidos del copy principal, y en la base una card destacada de exclusión (`Para quién NO es`) de **`720x129px`** (r=16px).
    *   **Mobile:** Altura de `818px`. Los chips se apilan en 4 filas y la card "NO es" se adapta a **`342x194px`** (r=16px).
*   **Light vs Dark:**
    *   Los chips de audiencia cambian de `#232323` al 4% (Light) a `#efeae1` al 5% (Dark).
    *   La card "NO es" cambia su fondo de `#e7d7c1` (Light, `sand-light` para contraste) a `#2c2620` (Dark, `sand-dark`).
*   **Tipografía e Itálica:**
    *   Título H2: "Si tu negocio va bien pero online *quedó atrás*."
    *   Itálica de acento: la frase **"quedó atrás"** en **Source Serif 4 46px (italic)** / **24px (italic)**.

---

## 7. Método
*   **Jerarquía y Proporciones:**
    *   **Desktop:** Sección de `1492x798px`. Fila de 4 pasos numerados (`01` al `04`).
        *   Cada paso tiene un indicador numérico circular (`step-number`, `48x48px`, r=12px).
    *   **Mobile:** Altura de `727px`. Los pasos se apilan verticalmente con un gap de `18px`.
*   **Light vs Dark:**
    *   Los círculos numerados `step-number` cambian su fondo de `#232323` (Light) a `#efeae1` (Dark), invirtiendo el color del texto.
*   **Acento Naranja:**
    *   Botón primario de contacto en la base (`Btn primary`, `256x59px` en desktop) usa fondo **`#c2410c`**.
*   **Tipografía e Itálica:**
    *   Título H2: "Primero entendemos. Después construimos *lo que hace falta*."
    *   Itálica de acento: la frase **"lo que hace falta"** está en **Source Serif 4 46px (italic)** / **24px (italic)**.

---

## 8. Raíces digitales (Design-Only)
*   **Jerarquía y Proporciones:**
    *   **Desktop:** Bloque de `1492x686px` enfocado en una única card central de marca (`Mission card`, **`640x526px`**, **r=24px**).
        *   La card contiene: Kicker superior (`125x35px`), Título H2 (`353x88px`), 3 párrafos de texto (Inter 16px) y el isotipo/logo Netiza en la base (`117x22px`).
    *   **Mobile:** Se reduce a `390x620px`.
        *   La card `Mission card` pasa a ocupar todo el ancho útil (`342x508px`, **r=20px**).
*   **Light vs Dark:**
    *   `Mission card` cambia su fondo de `#f7f2ea` (Light) a `#211e1a` (Dark).
*   **Acento Naranja:**
    *   El isotipo `Netiza logo` contiene el punto de la marca coloreado en naranja puro **`#f15a24`** como firma de identidad decorativa.
*   **Tipografía e Itálica:**
    *   Título H2 de la card: "Raíces digitales para negocios *reales*."
    *   Itálica de acento: la palabra **"reales"** está en **Source Serif 4 40px (italic)** (Desktop) / **24px (italic)** (Mobile).

---

## 9. Con quién trabajamos (Design-Only)
*   **Jerarquía y Proporciones:**
    *   **Desktop:** Sección de `1492x719px`. Presenta 2 cards comparativas alineadas en fila horizontal (`compare-list` de `842x326px` en total).
        *   `La fórmula de turno` (Card Izquierda): **`401x326px`**, **r=24px**. Contiene 5 filas de texto con un icono `✕` (`22x22px`, r=11px).
        *   `Netiza` (Card Derecha): **`401x321px`**, **r=24px**. Contiene 5 filas de texto con un icono `✓` (`22x22px`, r=11px).
    *   **Mobile:** Altura de `808px`. Las cards se apilan verticalmente:
        *   `La fórmula de turno` -> **`342x274px`**, **r=20px**.
        *   `Netiza` -> **`342x267px`**, **r=20px**.
*   **Light vs Dark:**
    *   Ambas cards usan fondo `#f7f2ea` (Light) y `#211e1a` (Dark).
    *   El circulo del icono `✕` cambia su fondo de `#232323` @ 18% (Light) a `#efeae1` @ 18% (Dark).
    *   El circulo del icono `✓` cambia de `#232323` @ 100% (Light) a `#efeae1` @ 100% (Dark).
*   **Tipografía e Itálica:**
    *   Título H2: "No vendemos magia. Trabajamos *en serio*."
    *   Itálica de acento: la frase **"en serio"** está en **Source Serif 4 46px (italic)** (Desktop) / **24px (italic)** (Mobile).

---

## 10. Equipo (Design-Only)
*   **Jerarquía y Proporciones:**
    *   **Desktop:** Sección de `1492x913px`. Distribuye 3 retratos de integrantes en fila horizontal (`member-list`, `1072x520px` total).
        *   Cada miembro mide **`341x504px`** y contiene la foto (`341x420px`, **r=16px**) con el nombre y rol abajo.
    *   **Mobile:** Se amplía a `390x1522px`. Los integrantes se apilan verticalmente.
        *   Cada tarjeta de integrante mide **`342x409px`**.
        *   Las fotos se recortan a formato horizontal/cuadrado de **`342x340px`** (manteniendo **r=16px**).
*   **Detalle de los Retratos (Imágenes):**
    *   `Foto — Emilia` (Estrategia y UX) -> Retrato cálido, primer plano, fondo neutro.
    *   `Foto — Pamela` (Negocio y e-commerce) -> Retrato cálido, primer plano.
    *   `Foto — Alejandro` (Tecnología e IA) -> Retrato cálido, primer plano.
*   **Tipografía e Itálica:**
    *   Título H2: "Personas *reales* detrás de tu proyecto."
    *   Itálica de acento: la palabra **"reales"** está en **Source Serif 4 46px (italic)** (Desktop) / **24px (italic)** (Mobile).
    *   Nombres en **Inter 24px** (tracking `-1.2px` en desktop, `-1px` en mobile). Roles en **Inter 14px** (tracking `-0.5px` en desktop, `-0.4px` en mobile).

---

## 11. FAQ
*   **Jerarquía y Proporciones:**
    *   **Desktop:** Sección de `1492x939px`. Acordeón centrado de **`720px`** de ancho.
        *   Cada uno de los 8 items (`faq-list`) mide `720x66px` (r=12px) y contiene un botón circular `toggle` de `30x30px` (r=15px) con el símbolo `+` (Inter 18px).
    *   **Mobile:** Altura de `814px`. El acordeón se extiende a full-width (`342px` útil) con items de `342x60px` o `342x77px` (según longitud de la pregunta).
*   **Light vs Dark:**
    *   Los items de acordeón cambian su fondo de `#232323` @ 4% (Light) a `#efeae1` @ 4% (Dark).
    *   Los círculos del toggle cambian de `#232323` (Light) a `#efeae1` (Dark), invirtiendo el color del símbolo `+`.
*   **Tipografía e Itálica:**
    *   Título H2: "Preguntas *frecuentes*".
    *   Itálica de acento: la palabra **"frecuentes"** en **Source Serif 4 40px (italic)** / **24px (italic)**.

---

## 12. CTA final
*   **Jerarquía y Proporciones:**
    *   **Desktop:** Bloque de `1492x667px` centrado en una gran card de llamada a la acción (`CTA card`, **`1072x507px`**, **r=24px**).
    *   **Mobile:** Altura de `563px`. La card pasa a medir **`342x443px`** con un radio de **`20px`**.
*   **Light vs Dark:**
    *   La card `CTA card` cambia su fondo de `#f7f2ea` (Light) a `#211e1a` (Dark).
*   **Acento Naranja:**
    *   El botón de acción principal (`Btn primary`, `260x59px` en desktop, `286x56px` en mobile) usa fondo **`#c2410c`**.
*   **Tipografía e Itálica:**
    *   Título H2: "Contonos qué vende tu negocio. Nosotros te decimos *por dónde empezar*."
    *   Itálica de acento: la frase **"por dónde empezar"** en **Source Serif 4 40px (italic)** (Desktop) / **24px (italic)** (Mobile).

---

## 13. Footer
*   **Jerarquía y Proporciones:**
    *   **Desktop:** Bloque de `1492x375px`. Separado por una línea divisoria (`divider`, `1492x1px`). Estructura en 3 columnas de navegación e información marcaria.
    *   **Mobile:** Altura de `308px`. Colapsa a un esquema vertical centrado de una columna de links.
*   **Light vs Dark:**
    *   La línea `divider` cambia de `#232323` al 4% (Light) a `#efeae1` al 8% (Dark).
    *   Todo el texto utiliza el color de tinta base de cada tema.
*   **Tipografía e Itálica:**
    *   Textos informativos y enlaces en **Inter 14px** (Desktop, tracking `-0.56px`/`-0.5px`) / **Inter 14px/12px** (Mobile, tracking `-0.4px`/`-0.3px`). Sin itálicas en esta sección.
