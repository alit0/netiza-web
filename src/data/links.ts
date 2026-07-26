export const WHATSAPP_BASE_URL = 'https://wa.me/5492324533126';

/**
 * FormSubmit AJAX endpoint shared by every form on the site (contacto y
 * diagnóstico). Uses FormSubmit's hashed alias, not the raw email, so the
 * address is never exposed in the page source. Vive acá y no en cada
 * componente: si el alias cambia, se toca un solo lugar.
 */
export const FORM_ENDPOINT = 'https://formsubmit.co/ajax/7cd52732ca929d088a38947334da0adf';

/** Builds a wa.me link with a pre-filled message. */
export function whatsappUrl(message: string): string {
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;
}

/**
 * Per-section pre-filled WhatsApp messages. The section a lead writes from
 * comes through in their first message, so Netiza knows the context.
 */
export const WHATSAPP_MESSAGES = {
  navbar: 'Hola Netiza, quiero hacerles una consulta.',
  hero: 'Hola Netiza, quiero hablar sobre mi proyecto.',
  servicios: 'Hola Netiza, vi lo que hacen y me gustaría que me cuenten más.',
  metodo: 'Hola Netiza, me interesa cómo trabajan y quiero empezar.',
  cta: 'Hola Netiza, quiero dar el siguiente paso con mi negocio.',
  footer: 'Hola Netiza, quiero escribirles para arrancar una conversación.',
} as const;

/** Default generic link (fallback for anything not section-specific). */
export const WHATSAPP_URL = whatsappUrl(WHATSAPP_MESSAGES.hero);

// Social profiles — also declared as sameAs in the structured data.
export const INSTAGRAM_URL = 'https://www.instagram.com/netiza.ar/';
export const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61578894231398';
