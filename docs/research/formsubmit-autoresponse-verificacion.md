# Verificación de `_autoresponse` en FormSubmit

**Fecha de verificación:** 2026-07-26  
**Alcance:** FormSubmit.co con formulario estático, alias descartable propio y envío AJAX. No se utilizó el endpoint de producción de Netiza.

## Veredicto

**NO SIRVE** para la decisión 8 tal como está planteada: la documentación oficial excluye expresamente `_autoresponse` de los formularios enviados por AJAX, y la prueba con un alias descartable confirmó que el envío llega al propietario pero no genera la respuesta automática al remitente.

## Respuestas 1a-1f

### 1a. ¿Existe `_autoresponse` y sigue soportado en 2026?

**Sí, existe en la documentación oficial vigente consultada el 2026-07-26.** FormSubmit lo presenta como un campo oculto que agrega un mensaje personalizado al cuerpo de una respuesta inmediata y exige que el formulario incluya un campo `email`.

Esto confirma que la función sigue publicada, pero no constituye una garantía contractual ni un SLA: FormSubmit no publica una política de versionado o permanencia de la característica.

**Fuente oficial:** [FormSubmit Documentation — `_autoresponse`](https://formsubmit.co/documentation#autoresponse).

### 1b. ¿Es texto plano, o admite HTML y enlaces clickeables?

**No está especificado oficialmente.** La documentación sólo dice que el valor es un “custom message” agregado al cuerpo del correo. No declara un tipo MIME, una política de sanitización de HTML ni una garantía de conversión de URLs en enlaces.

Por lo tanto:

- no se debe asumir que acepta HTML;
- una URL escrita como texto podría ser convertida en enlace por el cliente de correo, pero eso depende del cliente y no es una capacidad garantizada por FormSubmit;
- para este diseño sólo sería seguro tratar el contenido como texto y escribir la URL completa.

Se intentó verificar el renderizado con un POST tradicional que incluía una URL, una etiqueta `<a>` y una etiqueta `<strong>`. FormSubmit respondió con su desafío reCAPTCHA y no procesó el envío sin intervención humana, por lo que esa prueba no aporta evidencia concluyente sobre el formato. Esta ambigüedad no cambia el veredicto: el modo AJAX requerido está excluido antes de llegar al renderizado.

**Fuente oficial:** [FormSubmit Documentation — `_autoresponse`](https://formsubmit.co/documentation#autoresponse).  
**Evidencia de prueba:** POST tradicional al alias descartable, HTTP 200, página con reCAPTCHA, sin entrega al propietario ni al remitente dentro de 180 segundos.

### 1c. ¿Hay límite de longitud?

**No hay un límite publicado para `_autoresponse`.** La documentación oficial no informa máximo de caracteres o bytes. Tampoco permite inferir que sea ilimitado: siguen aplicando límites internos de request, correo y controles antiabuso no documentados.

No se realizó una prueba de longitud porque el POST tradicional quedó detenido por reCAPTCHA; medir el tamaño en ese estado habría confundido el límite del campo con la falta de validación humana.

**Fuente oficial:** [FormSubmit Documentation](https://formsubmit.co/documentation) — la sección de `_autoresponse` no declara límite; la misma página sí publica límites cuando existen para otras funciones, por ejemplo 10 MB acumulados para archivos y 20 frases recomendadas para `_blacklist`.

### 1d. ¿Se puede adjuntar un archivo, o sólo enlazar a uno?

**`_autoresponse` no tiene soporte documentado para adjuntar archivos; sólo permite agregar contenido al cuerpo, por lo que el PDF debe enlazarse.**

La función “File uploads” documenta el sentido contrario: archivos que el visitante sube al propietario del formulario mediante `multipart/form-data`, con un máximo acumulado de 10 MB. No documenta adjuntos salientes en la autorespuesta ni vincula los uploads con `_autoresponse`.

**Fuente oficial:** [FormSubmit Documentation — `_autoresponse` y “File uploads”](https://formsubmit.co/documentation).

### 1e. ¿Funciona con `/ajax/<alias>`?

**No.** La documentación oficial lo excluye de forma explícita: `_autoresponse` no funciona en formularios enviados por AJAX. También deja de funcionar si se desactiva reCAPTCHA.

La prueba real reprodujo exactamente el caso relevante:

1. se creó y activó un formulario con buzones temporales propios;
2. se utilizó un alias descartable de 32 caracteres, identificado sólo por el hash corto `dcc1b39a2371`;
3. se envió `POST https://formsubmit.co/ajax/<alias>` con `email`, `_autoresponse`, un marcador único y campos de control;
4. FormSubmit respondió HTTP 200 con `success: "true"` y “The form was submitted successfully.”;
5. el propietario recibió el envío y el marcador de control;
6. el remitente no recibió autorespuesta durante la ventana de observación de 180 segundos.

Esto descarta problemas de activación o de entrega del formulario: el envío AJAX funcionó, pero la autorespuesta no se generó, tal como anticipa la documentación.

**Fuentes oficiales:** [FormSubmit Documentation — advertencia de `_autoresponse`](https://formsubmit.co/documentation#autoresponse) y [FormSubmit AJAX Documentation](https://formsubmit.co/ajax-documentation).  
**Evidencia empírica no sensible:** prueba `2026-07-26/dcc1b39a2371`; HTTP 200; éxito AJAX; entrega al propietario confirmada; autorespuesta ausente.

### 1f. ¿Hay límites gratuitos que puedan cortar el flujo?

**No hay una cuota publicada de formularios o envíos:** FormSubmit declara formularios y submissions ilimitados para una dirección de correo.

Sin embargo, “ilimitado” no equivale a entrega garantizada:

- FormSubmit aplica reCAPTCHA y un sistema anti-spam;
- advierte que al desactivar reCAPTCHA puede imponer “technical limitations” de forma ocasional;
- `_autoresponse` deja de funcionar directamente si reCAPTCHA está desactivado;
- los correos pueden caer en spam, especialmente con volumen alto;
- el archivo histórico se conserva 30 días y su API sólo puede consultarse 5 veces por día; ese límite afecta la consulta del archivo, no la recepción de formularios.

No se publica un rate limit numérico para submissions ni autorespuestas. En consecuencia, no hay una cuota gratuita conocida que corte el flujo, pero tampoco existe una garantía suficiente para usar FormSubmit como canal único de entrega de un lead magnet.

**Fuentes oficiales:** [FormSubmit Documentation — “Unlimited forms and submissions” y archivo](https://formsubmit.co/documentation), [FormSubmit Help — spam y entregabilidad](https://formsubmit.co/help).

## Alternativa con cero backend y cero costo

Mantener el POST AJAX actual para registrar el lead y, sólo después de recibir `success: "true"`, mostrar en la página de resultado un botón hacia el PDF estático:

```text
Descargar guía personalizada
```

El PDF se sirve como asset estático del mismo sitio. Este flujo mantiene la experiencia sin navegación, no agrega infraestructura y elimina la dependencia del correo para entregar el material. Conviene mostrar también el enlace como fallback y no iniciar una descarga automática sin una acción clara del usuario.

Si el envío por correo fuera un requisito obligatorio, las restricciones actuales son incompatibles: habría que abandonar AJAX y usar POST tradicional con reCAPTCHA, o incorporar un servicio/backend de email. La primera opción sigue siendo gratuita, pero agrega fricción y cambia el flujo existente.

## Pruebas realizadas

| Prueba | Resultado |
|---|---|
| Activación de formulario descartable | Correcta; HTTP 200 y confirmación recibida |
| POST AJAX mediante alias descartable | HTTP 200; `success: "true"` |
| Entrega AJAX al propietario | Confirmada con marcador único |
| `_autoresponse` al remitente en AJAX | No recibida en 180 segundos |
| POST tradicional con HTML y URL | Detenido por reCAPTCHA; resultado de formato inconcluso |

No se usaron datos reales, secretos ni el endpoint de producción.

## Resumen ejecutivo

`_autoresponse` existe, pero FormSubmit declara que no funciona con AJAX y la prueba lo confirmó.  
El envío AJAX sí llegó al propietario; el remitente no recibió la respuesta automática.  
HTML, clickeabilidad y longitud no tienen contrato documentado.  
Los adjuntos salientes no están soportados; sólo puede incluirse un enlace.  
La entrega más simple y robusta es ofrecer el PDF estático en la pantalla de resultado.

## Pendientes

- Actualizar la decisión 8 para reemplazar “autorespuesta con PDF” por entrega inmediata en la interfaz.
- Definir la URL final y el texto del CTA del PDF.
- Si producto insiste en email, validar explícitamente el cambio a POST tradicional con reCAPTCHA y aceptar su fricción.

## Persistencia en Engram

Se guardó el descubrimiento **“Verificada incompatibilidad de FormSubmit autoresponse con AJAX”** con el veredicto, la evidencia empírica y la alternativa recomendada.
