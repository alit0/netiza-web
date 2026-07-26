/**
 * Invariant checks for diagnosticoScore (no test runner deps).
 * Run: node --experimental-strip-types scripts/verify-diagnostico-score.ts
 */
import {
  projectDimension,
  scoreDiagnostico,
} from '../src/lib/diagnosticoScore.ts';

type Case = {
  name: string;
  answers: number[];
  expect: {
    overall: number;
    traffic: 'rojo' | 'amarillo' | 'verde';
    redCount: number;
    dimScores?: number[];
  };
};

const cases: Case[] = [
  {
    name: 'a) all 3 → overall 100, verde, zero red',
    answers: Array(12).fill(3),
    expect: { overall: 100, traffic: 'verde', redCount: 0, dimScores: [100, 100, 100, 100] },
  },
  {
    name: 'b) all 0 → overall 0, rojo, four red',
    answers: Array(12).fill(0),
    expect: { overall: 0, traffic: 'rojo', redCount: 4, dimScores: [0, 0, 0, 0] },
  },
  {
    name: 'c) three dims raw 9 + one raw 0 → overall 75, VERDE, one red',
    // P1-P9 = 3, P10-P12 = 0 → eligen raw 0
    answers: [...Array(9).fill(3), 0, 0, 0],
    expect: { overall: 75, traffic: 'verde', redCount: 1, dimScores: [100, 100, 100, 0] },
  },
  {
    name: 'd) all dims raw 5 → all 67, overall 67, AMARILLO',
    // each dim: 2+2+1 = 5 or 1+2+2 etc. Use 2,2,1 per dim
    answers: [2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 1],
    expect: { overall: 67, traffic: 'amarillo', redCount: 0, dimScores: [67, 67, 67, 67] },
  },
];

// Projection table spot-checks (corrected model: raw 5 → 67, not 33)
const projectionSpot: Array<[number, number]> = [
  [0, 0],
  [2, 0],
  [3, 33],
  [4, 33],
  [5, 67],
  [7, 67],
  [8, 100],
  [9, 100],
];

let failed = 0;
const lines: string[] = [];

function log(msg: string) {
  lines.push(msg);
  console.log(msg);
}

log('=== projectDimension spot checks ===');
for (const [raw, want] of projectionSpot) {
  const got = projectDimension(raw);
  const ok = got === want;
  if (!ok) failed += 1;
  log(`  raw ${raw} → ${got} (want ${want}) ${ok ? 'OK' : 'FAIL'}`);
}

log('');
log('=== scoreDiagnostico cases ===');
for (const c of cases) {
  const result = scoreDiagnostico(c.answers);
  const dimScores = result.dimensions.map((d) => d.score);
  const checks = [
    ['overall', result.overall, c.expect.overall],
    ['traffic', result.traffic, c.expect.traffic],
    ['redCount', result.redAreas.length, c.expect.redCount],
  ] as const;

  let caseOk = true;
  for (const [label, got, want] of checks) {
    if (got !== want) {
      caseOk = false;
      log(`  FAIL ${c.name}: ${label}=${got} want ${want}`);
    }
  }
  if (c.expect.dimScores) {
    const same =
      dimScores.length === c.expect.dimScores.length &&
      dimScores.every((s, i) => s === c.expect.dimScores![i]);
    if (!same) {
      caseOk = false;
      log(
        `  FAIL ${c.name}: dimScores=${JSON.stringify(dimScores)} want ${JSON.stringify(c.expect.dimScores)}`,
      );
    }
  }
  if (caseOk) {
    log(
      `  OK ${c.name}\n     overall=${result.overall} traffic=${result.traffic} reds=${result.redAreas.map((r) => r.id).join(',') || '—'} dims=${JSON.stringify(dimScores)}`,
    );
  } else {
    failed += 1;
  }
}

log('');
log(failed === 0 ? 'ALL CHECKS PASSED' : `FAILED: ${failed}`);
process.exit(failed === 0 ? 0 : 1);
