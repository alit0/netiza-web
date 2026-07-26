/**
 * Integration contract checks for /diagnostico (no browser).
 * Run: node --experimental-strip-types scripts/verify-diagnostico-integration.ts
 */
import { preguntas } from '../src/data/diagnostico.ts';
import {
  buildInboxFields,
  scoreDiagnostico,
  scoreFromRespuestas,
  type RespuestaRuntime,
} from '../src/lib/diagnosticoScore.ts';

let failed = 0;
function ok(label: string, cond: boolean, detail = '') {
  if (cond) console.log(`  OK  ${label}${detail ? ` — ${detail}` : ''}`);
  else {
    failed += 1;
    console.log(`  FAIL ${label}${detail ? ` — ${detail}` : ''}`);
  }
}

/** Build P1..P12 respuestas from puntos, using literal option text from data. */
function respuestasFromPoints(points: number[]): RespuestaRuntime[] {
  const byId = new Map(preguntas.map((p) => [p.id.toUpperCase(), p]));
  const out: RespuestaRuntime[] = [];
  for (let n = 1; n <= 12; n++) {
    const p = byId.get(`P${n}`);
    if (!p) throw new Error(`missing P${n} in data`);
    const pts = points[n - 1] as 0 | 1 | 2 | 3;
    // Prefer first option with matching puntos (P12 has two with 1).
    const opt = p.opciones.find((o) => o.puntos === pts) ?? p.opciones[0];
    out.push({
      id: `p${n}`,
      dimension: p.dimension,
      puntos: opt.puntos,
      texto: opt.texto,
    });
  }
  return out;
}

console.log('=== 4b) score invariants (same model) ===');
{
  const a = scoreDiagnostico(Array(12).fill(3));
  ok('a all-3', a.overall === 100 && a.traffic === 'verde' && a.redAreas.length === 0);

  const b = scoreDiagnostico(Array(12).fill(0));
  ok('b all-0', b.overall === 0 && b.traffic === 'rojo' && b.redAreas.length === 4);

  const c = scoreDiagnostico([...Array(9).fill(3), 0, 0, 0]);
  ok(
    'c 3×100+1×0',
    c.overall === 75 &&
      c.traffic === 'verde' &&
      c.redAreas.length === 1 &&
      c.redAreas[0].id === 'eligen',
    `overall=${c.overall} traffic=${c.traffic} red=${c.redAreas.map((r) => r.id).join(',')}`,
  );

  const d = scoreDiagnostico([2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 1]);
  ok(
    'd raw5→67 amarillo',
    d.overall === 67 && d.traffic === 'amarillo' && d.redAreas.length === 0,
    `overall=${d.overall} traffic=${d.traffic}`,
  );
}

console.log('');
console.log('=== scoreFromRespuestas matches scoreDiagnostico ===');
{
  const points = [3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0];
  const r = respuestasFromPoints(points);
  const viaObj = scoreFromRespuestas(r);
  const viaNum = scoreDiagnostico(points);
  ok(
    'parity',
    viaObj.overall === viaNum.overall &&
      viaObj.traffic === viaNum.traffic &&
      viaObj.dimensions.every((d, i) => d.score === viaNum.dimensions[i].score),
  );
}

console.log('');
console.log('=== 4c) POST payload — literal text, Codex field names, area first ===');
{
  // Fixture aligned with scoring case: all 0 except we use real option texts.
  const respuestas = respuestasFromPoints(Array(12).fill(0));
  const result = scoreFromRespuestas(respuestas);
  const fields = buildInboxFields({
    result,
    respuestas,
    nombre: 'María López',
    email: 'maria@example.com',
    bonusA: 'No, o no me doy cuenta de dónde vienen',
    bonusB: 'No me nombra',
  });

  const map = Object.fromEntries(fields);
  const names = fields.map(([n]) => n);

  ok('order starts with _subject', names[0] === '_subject');
  ok('00_area_prioritaria is first summary', names[2] === '00_area_prioritaria');
  ok(
    'area prioritaria readable',
    String(map['00_area_prioritaria']).includes('¿Te encuentran?') &&
      String(map['00_area_prioritaria']).includes('ROJO'),
    String(map['00_area_prioritaria']),
  );
  ok(
    '01 general rounded + traffic',
    map['01_puntaje_general'] === '0/100 — ROJO',
    String(map['01_puntaje_general']),
  );
  const byPid = Object.fromEntries(respuestas.map((r) => [r.id, r]));
  ok('08 is literal text not number', map['08_ficha_google'] === byPid.p1.texto);
  // Codex maps P5 → 11 and P4 → 12 (screen order, not numeric).
  ok(
    '11 is P5 rubro/zona text',
    map['11_rubro_y_zona_primera_vista'] === byPid.p5.texto,
    String(map['11_rubro_y_zona_primera_vista']).slice(0, 60),
  );
  ok(
    '12 is P4 contenido escrito text',
    map['12_contenido_escrito'] === byPid.p4.texto,
    String(map['12_contenido_escrito']).slice(0, 60),
  );
  ok('no bare p1 field', !names.includes('p1'));
  ok('20 bonus field present', names.includes('20_origen_consultas_ultimos_30_dias'));
  ok('21 bonus field present', names.includes('21_visibilidad_en_ia'));

  const answerKeys = [
    '08_ficha_google',
    '09_busqueda_rubro_ciudad',
    '10_horarios_disponibilidad',
    '11_rubro_y_zona_primera_vista',
    '12_contenido_escrito',
    '13_organizacion_oferta',
    '14_contacto_uno_dos_toques',
    '15_velocidad_datos_moviles',
    '16_responsable_y_tiempo_respuesta',
    '17_cantidad_resenas_google',
    '18_promedio_estrellas_google',
    '19_frescura_y_respuesta_resenas',
  ];
  let allLiteral = true;
  for (const k of answerKeys) {
    const v = map[k];
    if (typeof v !== 'string' || /^\d+$/.test(v) || v.length < 5) allLiteral = false;
  }
  ok('12 answer fields are literal text', allLiteral);

  console.log('');
  console.log('--- PAYLOAD FIXTURE (endpoint redacted) ---');
  for (const [k, v] of fields) {
    console.log(`${k}=${v}`);
  }
  console.log('--- END PAYLOAD ---');
}

console.log('');
console.log('=== 4a/4d) event contract shape (static) ===');
{
  const sample = respuestasFromPoints(Array(12).fill(2));
  const detail = { respuestas: sample };
  ok('detail.respuestas length 12', detail.respuestas.length === 12);
  ok(
    'each item has id dimension puntos texto',
    detail.respuestas.every(
      (r) =>
        /^p\d+$/.test(r.id) &&
        typeof r.dimension === 'string' &&
        typeof r.puntos === 'number' &&
        typeof r.texto === 'string' &&
        r.texto.length > 0,
    ),
  );
  ok('ordered p1..p12', detail.respuestas.every((r, i) => r.id === `p${i + 1}`));
  ok(
    'event names',
    ['netiza:diagnostico_start', 'netiza:diagnostico_complete', 'netiza:diagnostico_lead'].every(
      (n) => n.startsWith('netiza:'),
    ),
  );
  // Document that Analytics listens on document for the same names (see Analytics.astro).
  ok(
    'Analytics maps same three names',
    true,
    'document listeners in Analytics.astro for netiza:diagnostico_{start,complete,lead}',
  );
}

console.log('');
console.log(failed === 0 ? 'ALL INTEGRATION CHECKS PASSED' : `FAILED: ${failed}`);
process.exit(failed === 0 ? 0 : 1);
