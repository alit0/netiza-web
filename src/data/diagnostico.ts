export type Opcion = { texto: string; puntos: 0 | 1 | 2 | 3 };
export type Dimension = 'encuentran' | 'entienden' | 'escriben' | 'eligen';
export type Pregunta = {
  id: string;
  dimension: Dimension;
  texto: string;
  ayuda?: string;
  opciones: Opcion[];
};
export type PreguntaBonus = { id: string; texto: string; opciones: string[] };

export const preguntas: Pregunta[] = [
  {
    id: 'P1',
    dimension: 'encuentran',
    texto: 'Buscá el nombre de tu negocio en Google desde el celular. ¿Qué ves?',
    opciones: [
      { texto: 'No aparece ninguna ficha del negocio, o no estoy seguro de tener una', puntos: 0 },
      { texto: 'Aparece una ficha, pero el rubro que dice no describe bien lo que hago', puntos: 1 },
      { texto: 'Aparece con el rubro correcto, aunque falten datos (dirección, teléfono o web)', puntos: 2 },
      { texto: 'Aparece con el rubro correcto, y el nombre, la dirección y el teléfono coinciden con lo real', puntos: 3 },
    ],
  },
  {
    id: 'P2',
    dimension: 'encuentran',
    texto: 'Ahora buscá tu rubro más tu ciudad, como lo buscaría alguien que no sabe que existís (por ejemplo: "ferretería Mercedes"). ¿Dónde aparecés?',
    ayuda:
      'Hacelo desde tu local o tu casa. Ahí Google te favorece por cercanía, así que este es tu mejor escenario posible.',
    opciones: [
      { texto: 'No aparezco por ningún lado', puntos: 0 },
      { texto: 'Aparezco, pero hay que bajar bastante para encontrarme', puntos: 1 },
      { texto: 'Aparezco en la primera pantalla, entre varios', puntos: 2 },
      { texto: 'Aparezco entre los tres primeros del mapa', puntos: 3 },
    ],
  },
  {
    id: 'P3',
    dimension: 'encuentran',
    texto: 'Los horarios de atención que figuran en tu ficha, ¿coinciden con cómo estás atendiendo esta semana? Si trabajás con turnos, contestá pensando en cómo se piden.',
    opciones: [
      { texto: 'No tengo horarios cargados, o no sé qué dice la ficha', puntos: 0 },
      { texto: 'Están cargados, pero al menos un día de esta semana no coincide', puntos: 1 },
      { texto: 'Coinciden con la semana habitual, aunque no toco feriados ni excepciones', puntos: 2 },
      { texto: 'Coinciden, y cuando hay feriado o cambio especial lo actualizo en la ficha', puntos: 3 },
    ],
  },
  {
    id: 'P5',
    dimension: 'entienden',
    texto: 'En la primera pantalla de tu web —o de tu ficha, si no tenés web—, ¿se leen escritos a qué te dedicás y en qué ciudad, sin metáforas ni solo el nombre de fantasía?',
    opciones: [
      { texto: 'No tengo dónde mirar eso', puntos: 0 },
      { texto: 'Solo se ve el nombre del negocio; no dice a qué se dedica', puntos: 1 },
      { texto: 'Se ve a qué me dedico, pero no la ciudad ni la zona', puntos: 2 },
      { texto: 'Se leen las dos cosas: a qué me dedico y en qué ciudad o zona', puntos: 3 },
    ],
  },
  {
    id: 'P4',
    dimension: 'entienden',
    texto: 'Además de fotos en redes, ¿tenés algún lugar propio donde esté escrito con palabras qué hacés y en qué ciudad?',
    opciones: [
      { texto: 'No: lo que hay son fotos en Instagram o Facebook, sin explicación escrita', puntos: 0 },
      { texto: 'Solo la descripción corta de la ficha de Google', puntos: 1 },
      { texto: 'Tengo sitio web, aunque el texto está viejo o incompleto', puntos: 2 },
      { texto: 'Tengo sitio web con el texto al día, o una ficha de Google completa y descriptiva', puntos: 3 },
    ],
  },
  {
    id: 'P6',
    dimension: 'entienden',
    texto: 'Lo que ofrecés —servicios, productos o rubros—, ¿está separado y explicado uno por uno, o está todo junto en el mismo lugar?',
    opciones: [
      { texto: 'No está explicado en ningún lado', puntos: 0 },
      { texto: 'Está todo junto, en un solo texto o una sola lista', puntos: 1 },
      { texto: 'Los principales están separados; el resto está mezclado', puntos: 2 },
      { texto: 'Cada uno tiene su propio espacio con nombre y explicación, sea en la web, en la ficha de Google o en destacados de Instagram', puntos: 3 },
    ],
  },
  {
    id: 'P7',
    dimension: 'escriben',
    texto: 'Desde el celular, mirando tu web o tu ficha, ¿se puede abrir un WhatsApp o llamarte con uno o dos toques?',
    opciones: [
      { texto: 'No hay una forma clara de contactarme desde ahí', puntos: 0 },
      { texto: 'El número está escrito, pero hay que copiarlo a mano', puntos: 1 },
      { texto: 'Hay botón o enlace, pero a veces falla o cuesta encontrarlo', puntos: 2 },
      { texto: 'Un toque abre el WhatsApp o el teléfono, sin vueltas', puntos: 3 },
    ],
  },
  {
    id: 'P8',
    dimension: 'escriben',
    texto: 'Apagá el wifi del celular y abrí tu web con datos. Contá mentalmente mientras carga.',
    opciones: [
      { texto: 'No tengo web, o tarda más de 6 segundos, o queda la pantalla en blanco un rato largo', puntos: 0 },
      { texto: 'Entre 4 y 6 segundos', puntos: 1 },
      { texto: 'Entre 2 y 3 segundos, pero los textos y botones se mueven de lugar mientras carga', puntos: 2 },
      { texto: 'Abre casi al instante y se lee bien desde el primer segundo', puntos: 3 },
    ],
  },
  {
    id: 'P9',
    dimension: 'escriben',
    texto: 'Cuando llega un mensaje al negocio —WhatsApp, Instagram o formulario—, ¿quién lo contesta y cuándo?',
    opciones: [
      { texto: 'Nadie los mira con regularidad', puntos: 0 },
      { texto: 'Los miro cuando me acuerdo', puntos: 1 },
      { texto: 'Los reviso todos los días hábiles, aunque a veces conteste de noche', puntos: 2 },
      { texto: 'Hay alguien a cargo y se contestan dentro del día hábil, en un horario más o menos fijo', puntos: 3 },
    ],
  },
  {
    id: 'P10',
    dimension: 'eligen',
    texto: '¿Cuántas reseñas públicas tenés hoy en Google?',
    opciones: [
      { texto: 'Ninguna, o no sé', puntos: 0 },
      { texto: 'Entre 1 y 5', puntos: 1 },
      { texto: 'Entre 6 y 19', puntos: 2 },
      { texto: '20 o más', puntos: 3 },
    ],
  },
  {
    id: 'P11',
    dimension: 'eligen',
    texto: '¿Cuál es el promedio de estrellas de tu ficha de Google?',
    opciones: [
      { texto: 'No tengo reseñas', puntos: 0 },
      { texto: 'Menos de 4,0', puntos: 1 },
      { texto: 'Entre 4,0 y 4,4', puntos: 2 },
      { texto: '4,5 o más', puntos: 3 },
    ],
  },
  {
    id: 'P12',
    dimension: 'eligen',
    texto: 'Sobre tus reseñas de Google, ¿cuál te describe mejor hoy?',
    opciones: [
      { texto: 'No tengo reseñas, o no las miro nunca', puntos: 0 },
      { texto: 'Tengo reseñas, pero la última es de hace más de tres meses', puntos: 1 },
      { texto: 'Tengo reseñas de los últimos tres meses, pero no las contesto', puntos: 1 },
      { texto: 'Tengo reseñas recientes y contesto algunas', puntos: 2 },
      { texto: 'Tengo reseñas recientes y las contesto todas, con un texto distinto cada vez', puntos: 3 },
    ],
  },
];

export const preguntasBonus: PreguntaBonus[] = [
  {
    id: 'B1',
    texto: 'En los últimos 30 días, ¿alguien te escribió o te llamó diciendo que te encontró por Google, Maps o redes?',
    opciones: ['No, o no me doy cuenta de dónde vienen', 'Alguna vez', 'Varias veces', 'Casi todas las semanas'],
  },
  {
    id: 'B2',
    texto: 'Preguntale a ChatGPT, Gemini o Copilot quién hace lo tuyo en tu ciudad. ¿Te nombra?',
    opciones: [
      'No me nombra',
      'Solo si le doy mi nombre exacto',
      'Me nombra entre varios',
      'Me recomienda entre los primeros',
    ],
  },
];

export const TOTAL_PREGUNTAS = preguntas.length;
