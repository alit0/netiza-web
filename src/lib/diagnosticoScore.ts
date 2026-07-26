/**
 * Pure scoring for /diagnostico.
 * Spec: docs/DIAGNOSTICO-PREGUNTAS-FINAL.md — projection ≤2→0, ≤4→33, ≤7→67, ≥8→100.
 * No DOM. Safe to unit-test in Node.
 */

export type TrafficLight = 'rojo' | 'amarillo' | 'verde';
export type DimensionScore = 0 | 33 | 67 | 100;
export type AnswerPoint = 0 | 1 | 2 | 3;

export type DimensionId =
  | 'encuentran'
  | 'entienden'
  | 'escriben'
  | 'eligen';

export interface DimensionDef {
  id: DimensionId;
  /** Short label for result copy (no leading ¿). */
  label: string;
  /** Indices 0..11 into the 12 raw answers (P1..P12). */
  questionIndexes: readonly [number, number, number];
}

export const DIMENSION_DEFS: readonly DimensionDef[] = [
  {
    id: 'encuentran',
    label: 'Te encuentran',
    questionIndexes: [0, 1, 2],
  },
  {
    id: 'entienden',
    label: 'Te entienden',
    questionIndexes: [3, 4, 5],
  },
  {
    id: 'escriben',
    label: 'Te escriben',
    questionIndexes: [6, 7, 8],
  },
  {
    id: 'eligen',
    label: 'Te siguen eligiendo',
    questionIndexes: [9, 10, 11],
  },
] as const;

export interface DimensionResult {
  id: DimensionId;
  label: string;
  raw: number;
  score: DimensionScore;
  isRed: boolean;
}

export interface ScoreResult {
  /** P1..P12 raw points (0..3 each). */
  answers: AnswerPoint[];
  dimensions: DimensionResult[];
  overall: number;
  traffic: TrafficLight;
  /** Dimensions with score ≤ 33, worst first. */
  redAreas: DimensionResult[];
}

/** Project dimension raw (0..9) to discrete score. Closed model — do not tweak. */
export function projectDimension(raw: number): DimensionScore {
  if (!Number.isFinite(raw) || raw < 0) {
    throw new RangeError(`dimension raw out of range: ${raw}`);
  }
  if (raw > 9) {
    throw new RangeError(`dimension raw out of range: ${raw}`);
  }
  if (raw <= 2) return 0;
  if (raw <= 4) return 33;
  if (raw <= 7) return 67;
  return 100;
}

export function trafficFromOverall(overall: number): TrafficLight {
  if (overall < 42) return 'rojo';
  if (overall < 75) return 'amarillo';
  return 'verde';
}

function assertAnswer(value: number, index: number): AnswerPoint {
  if (value !== 0 && value !== 1 && value !== 2 && value !== 3) {
    throw new RangeError(`answer[${index}] must be 0|1|2|3, got ${value}`);
  }
  return value;
}

/**
 * Score 12 raw answers (P1..P12 order).
 * overall = mean of the four dimension scores (not mean of raw points).
 */
export function scoreDiagnostico(rawAnswers: readonly number[]): ScoreResult {
  if (rawAnswers.length !== 12) {
    throw new RangeError(`expected 12 answers, got ${rawAnswers.length}`);
  }

  const answers = rawAnswers.map((v, i) => assertAnswer(v, i));

  const dimensions: DimensionResult[] = DIMENSION_DEFS.map((def) => {
    const raw =
      answers[def.questionIndexes[0]] +
      answers[def.questionIndexes[1]] +
      answers[def.questionIndexes[2]];
    const score = projectDimension(raw);
    return {
      id: def.id,
      label: def.label,
      raw,
      score,
      isRed: score <= 33,
    };
  });

  const overall =
    dimensions.reduce((sum, d) => sum + d.score, 0) / dimensions.length;

  const redAreas = dimensions
    .filter((d) => d.isRed)
    .slice()
    .sort((a, b) => a.score - b.score || a.label.localeCompare(b.label, 'es'));

  return {
    answers,
    dimensions,
    overall,
    traffic: trafficFromOverall(overall),
    redAreas,
  };
}

/** Runtime payload item from netiza:diagnostico_complete (P1..P12 order). */
export interface RespuestaRuntime {
  id: string;
  dimension: string;
  puntos: number;
  texto: string;
}

/**
 * POST answer fields in Codex order (screen order: P5 before P4).
 * Keys are lowercase question ids (p1..p12).
 */
export const POST_ANSWER_FIELD_BY_ID: Record<string, string> = {
  p1: '08_ficha_google',
  p2: '09_busqueda_rubro_ciudad',
  p3: '10_horarios_disponibilidad',
  p5: '11_rubro_y_zona_primera_vista',
  p4: '12_contenido_escrito',
  p6: '13_organizacion_oferta',
  p7: '14_contacto_uno_dos_toques',
  p8: '15_velocidad_datos_moviles',
  p9: '16_responsable_y_tiempo_respuesta',
  p10: '17_cantidad_resenas_google',
  p11: '18_promedio_estrellas_google',
  p12: '19_frescura_y_respuesta_resenas',
};

/** Emission order of answer rows in the inbox (matches impl-analytics-codex.md). */
export const POST_ANSWER_ORDER = [
  'p1',
  'p2',
  'p3',
  'p5',
  'p4',
  'p6',
  'p7',
  'p8',
  'p9',
  'p10',
  'p11',
  'p12',
] as const;

/** Labels with leading ¿ as required in the inbox summary. */
export const DIMENSION_POST_LABELS: Record<DimensionId, string> = {
  encuentran: '¿Te encuentran?',
  entienden: '¿Te entienden?',
  escriben: '¿Te escriben?',
  eligen: '¿Te siguen eligiendo?',
};

export interface ResultCopySlots {
  /** Fills [área verde] — strongest dimension label(s). */
  areaVerde: string;
  /** Fills [área roja 1]. */
  areaRoja1: string;
  /**
   * `false` cuando no existe una fortaleza real que nombrar: o todas las
   * dimensiones empatan (ninguna se destaca) o hasta la mejor esta en rojo.
   * Sin esto, quien saca 0 en todo lee que sus cuatro areas son sus puntos
   * mas fuertes, incluidas las dos que la misma frase declara las peores.
   */
  hayFortaleza: boolean;
  /** Fills [área roja 2]. */
  areaRoja2: string;
}

/** Score from the runtime contract (12 items, P1..P12). Model unchanged. */
export function scoreFromRespuestas(
  respuestas: readonly RespuestaRuntime[],
): ScoreResult {
  if (respuestas.length !== 12) {
    throw new RangeError(`expected 12 respuestas, got ${respuestas.length}`);
  }
  const byId = new Map(
    respuestas.map((r) => [r.id.toLowerCase(), r] as const),
  );
  const ordered: number[] = [];
  for (let i = 1; i <= 12; i++) {
    const item = byId.get(`p${i}`);
    if (!item) {
      throw new RangeError(`missing respuesta p${i}`);
    }
    ordered.push(item.puntos);
  }
  return scoreDiagnostico(ordered);
}

function trafficUpperFromOverall(overall: number): 'ROJO' | 'AMARILLO' | 'VERDE' {
  const t = trafficFromOverall(overall);
  if (t === 'rojo') return 'ROJO';
  if (t === 'amarillo') return 'AMARILLO';
  return 'VERDE';
}

function trafficUpperFromDim(score: DimensionScore): 'ROJO' | 'AMARILLO' | 'VERDE' {
  if (score <= 33) return 'ROJO';
  if (score === 67) return 'AMARILLO';
  return 'VERDE';
}

/**
 * Build inbox fields in Codex order. Values are literal option text / human summary.
 * Does not include honeypot or captcha (UI adds those).
 */
export function buildInboxFields(input: {
  result: ScoreResult;
  /** P1..P12 with literal texto; any order OK (sorted by id). */
  respuestas: readonly RespuestaRuntime[];
  nombre: string;
  email: string;
  bonusA: string;
  bonusB: string;
}): Array<[string, string]> {
  const { result, respuestas, nombre, email, bonusA, bonusB } = input;
  const byId = new Map(
    respuestas.map((r) => [r.id.toLowerCase(), r] as const),
  );

  const minScore = Math.min(...result.dimensions.map((d) => d.score));
  const tied = result.dimensions.filter((d) => d.score === minScore);
  const areaNames = tied
    .map((d) => DIMENSION_POST_LABELS[d.id])
    .join(' + ');
  const areaFlag = minScore <= 33 ? 'ROJO' : 'sin área roja';
  const areaPrioritaria = `${areaNames} — ${minScore}/100 — ${areaFlag}`;

  // Mismo criterio que la pantalla: piso, para que el mail y la UI digan lo mismo.
  const overallRounded = Math.floor(result.overall);
  const overallLine = `${overallRounded}/100 — ${trafficUpperFromOverall(result.overall)}`;

  const dimLine = (id: DimensionId): string => {
    const dim = result.dimensions.find((d) => d.id === id)!;
    return `${dim.score}/100 — ${trafficUpperFromDim(dim.score)}`;
  };

  const fields: Array<[string, string]> = [
    ['_subject', 'Nuevo diagnóstico de presencia digital — Netiza'],
    ['_template', 'table'],
    ['00_area_prioritaria', areaPrioritaria],
    ['01_puntaje_general', overallLine],
    ['02_puntaje_te_encuentran', dimLine('encuentran')],
    ['03_puntaje_te_entienden', dimLine('entienden')],
    ['04_puntaje_te_escriben', dimLine('escriben')],
    ['05_puntaje_te_siguen_eligiendo', dimLine('eligen')],
    ['06_nombre', nombre],
    ['email', email],
  ];

  for (const qid of POST_ANSWER_ORDER) {
    const item = byId.get(qid);
    if (!item) {
      throw new RangeError(`missing respuesta ${qid} for POST`);
    }
    fields.push([POST_ANSWER_FIELD_BY_ID[qid], item.texto]);
  }

  fields.push(['20_origen_consultas_ultimos_30_dias', bonusA]);
  fields.push(['21_visibilidad_en_ia', bonusB]);

  return fields;
}

function joinLabels(labels: string[]): string {
  if (labels.length === 0) return '';
  if (labels.length === 1) return labels[0];
  if (labels.length === 2) return `${labels[0]} y ${labels[1]}`;
  const head = labels.slice(0, -1).join(', ');
  return `${head} y ${labels[labels.length - 1]}`;
}

/**
 * Resolve copy markers from DIAGNOSTICO-PREGUNTAS-FINAL.md result screen.
 * Prefers true red areas (≤33) for the "mejorar" slots; falls back to weakest
 * dimensions so the exact two-slot sentence always has dimension names.
 */
export function resolveResultCopy(result: ScoreResult): ResultCopySlots {
  const dims = result.dimensions;
  const maxScore = Math.max(...dims.map((d) => d.score));
  const strongest = dims.filter((d) => d.score === maxScore).map((d) => d.label);

  const byWeakest = dims
    .slice()
    .sort((a, b) => a.score - b.score || a.label.localeCompare(b.label, 'es'));

  const reds = result.redAreas;
  let improve: DimensionResult[];
  if (reds.length >= 2) {
    improve = reds.slice(0, 2);
  } else if (reds.length === 1) {
    const second =
      byWeakest.find((d) => d.id !== reds[0].id) ?? byWeakest[0];
    improve = [reds[0], second];
  } else {
    improve = byWeakest.slice(0, 2);
  }

  // Solo hay fortaleza si la mejor dimension sale del rojo Y no empatan todas
  // (si empatan, ninguna se destaca sobre las otras).
  const hayFortaleza = maxScore > 33 && strongest.length < dims.length;

  return {
    areaVerde: joinLabels(strongest),
    hayFortaleza,
    areaRoja1: improve[0]?.label ?? dims[0].label,
    areaRoja2: improve[1]?.label ?? dims[1]?.label ?? dims[0].label,
  };
}
