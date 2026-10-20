import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import ts from 'typescript';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url), cache = new Map();
const root = new URL('../../', import.meta.url);
function load(file) {
  const full = new URL(file, root), exports = {};
  if (cache.has(full.href)) return cache.get(full.href);
  cache.set(full.href, exports);
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(full, 'utf8'), { compilerOptions: { module: 1, target: 7 } }).outputText,
    { exports, require: name => name === 'server-only' ? {} : name.startsWith('.')
      ? load(path.posix.normalize(path.posix.join(path.posix.dirname(file), name + '.ts'))) : require(name) });
  return exports;
}
const matching = load('app/FoodCheck/referenceMatching.ts'), search = load('app/FoodCheck/referenceSearch.server.ts');
const curated = load('app/FoodCheck/curatedMinerals.ts'), categories = load('app/FoodCheck/categoryMinerals.ts');
const labels = load('app/FoodCheck/reviewedLabelBasis.ts'), portions = load('app/FoodCheck/barcodePortions.ts');
const snacks = load('lib/foodSnacks.ts'), supplemental = load('app/FoodCheck/supplementalReferences.ts');
const evidence = JSON.parse(fs.readFileSync(new URL('app/FoodCheck/fixtures/supermarketReferences.json', root)));
function service(overrides = {}) {
  const calls = [];
  const resolve = search.createReferenceSearch({
    cofid: async term => { calls.push(['CoFID', term]); return evidence.cofid.filter(r => r.food_name.toLowerCase().includes(term.toLowerCase())); },
    usda: async query => {
      calls.push(['USDA', query]);
      const captured = evidence.queries[query];
      assert.ok(captured, 'Uncaptured query: ' + query);
      return { status: captured.status, data: captured.ids.map(id => evidence.usda.find(f => f.fdcId === id)) };
    }, ...overrides,
  });
  return { resolve, calls };
}
async function run(barcode, svc = service()) {
  const raw = evidence.products.find(p => p.barcode === barcode).product;
  const product = labels.reviewedLabelBasis(barcode, raw), portion = portions.barcodePortion(barcode, raw);
  const zero = categories.questionableMineralZeros(product);
  const initial = await curated.resolveCuratedMinerals(barcode, {
    potassium: raw.nutriments.potassium_100g ?? null, phosphorus: raw.nutriments.phosphorus_100g ?? null,
  }, async () => null, { basis: portion.basis, questionableZero: { potassium: !!zero.potassium, phosphorus: !!zero.phosphorus } });
  const results = await categories.resolveCategoryMinerals(barcode, product, initial,
    async code => evidence.cofid.find(r => r.food_code === code), { basis: portion.basis, unit: portion.unit, searchReferences: svc.resolve });
  return { product, portion, results, svc };
}

for (const { barcode, product } of evidence.products) test('captured supermarket regression: ' + product.product_name, async () => {
  const { results, portion, svc } = await run(barcode);
  for (const key of ['potassium', 'phosphorus']) {
    const n = results[key];
    assert.equal(n.provenance, 'estimated'); assert.ok(n.valueMg > 0); assert.ok(n.estimate.references.length);
    if (n.rangeMg) assert.equal(n.valueMg, n.rangeMg.upper);
  }
  assert.ok(svc.calls.filter(c => c[0] === 'USDA').length <= 2);
  for (const [, query] of svc.calls.filter(c => c[0] === 'USDA')) assert.ok(evidence.queries[query], 'Uncaptured query: ' + query);
  assert.ok(svc.calls.filter(c => c[0] === 'CoFID').length <= 4);
  const snapshot = snacks.foodSnapshot({ minerals: results }, portion.unit, portion.basis, 'Captured CoFID/USDA/AFCD comparisons', portion.naturalUnit);
  const saved = snacks.snapshotForQuantity(snapshot, portion.amount ?? 100);
  assert.equal(saved.nutrients.potassium.value, results.potassium.valueMg * (portion.amount ?? 100) / 100);
  assert.equal(saved.nutrients.potassium.kind, 'estimated');
  assert.equal(snacks.validFoodSnapshot(JSON.parse(JSON.stringify(saved))), true);
  assert.ok(Buffer.byteLength(JSON.stringify(saved)) < 20000, 'Fits existing SQL snapshot size limit');
  console.log(JSON.stringify({ barcode, basis: portion.referenceLabel, K: results.potassium.rangeMg ?? results.potassium.valueMg,
    P: results.phosphorus.rangeMg ?? results.phosphorus.valueMg, quantity: portion.amount }));
});

const holdouts = JSON.parse(fs.readFileSync(new URL('outputs/food-check-kp/holdout-products.json', root)));
const holdoutRows = JSON.parse(fs.readFileSync(new URL('outputs/food-check-kp/holdout-cofid.json', root)));
for (const h of holdouts.products) test('independent holdout, CoFID-only replay: ' + h.name, async () => {
  const svc = service({ cofid: async term => holdoutRows.filter(r => r.food_name.toLowerCase().includes(term.toLowerCase())),
    usda: async () => ({ status: 'unavailable', data: null }) });
  const initial = await curated.resolveCuratedMinerals('unseen-holdout', { potassium: h.manufacturerPotassiumMg ?? null, phosphorus: null }, async () => null, { basis: h.basis });
  const results = await categories.resolveCategoryMinerals('unseen-holdout', h.product, initial, async () => null,
    { basis: h.basis, unit: h.unit, searchReferences: svc.resolve });
  if (/yoghurt/i.test(h.name)) {
    const reference = results.potassium.estimate.references;
    assert.equal(results.potassium.estimate.kind, 'single');
    assert.equal(reference.length, 1); assert.equal(reference[0].foodCode, '12-533');
    assert.equal(results.potassium.valueMg, 247); assert.equal(results.phosphorus.valueMg, 151);
  }
  if (h.unit === 'ml') {
    assert.equal(results.potassium.valueMg, 200);
    assert.equal(results.phosphorus.valueMg, null);
  } else for (const key of ['potassium', 'phosphorus']) {
    assert.equal(results[key].provenance, 'estimated'); assert.ok(results[key].valueMg > 0);
    if (results[key].rangeMg) assert.equal(results[key].valueMg, results[key].rangeMg.upper);
  }
  console.log(JSON.stringify({ holdout: h.name, K: results.potassium.rangeMg ?? results.potassium.valueMg,
    P: results.phosphorus.rangeMg ?? results.phosphorus.valueMg, references: results.phosphorus.estimate?.references }));
});

test('shared admission rejects substantial additions in generic and family paths, but preserves plain variants and trace notices', () => {
  const p = holdouts.products[0].product;
  const c = description => ({ source: 'CoFID 2021', code: description, description, macros: matching.productMacros(p), potassiumMg: 100, phosphorusMg: 100 });
  for (const description of ['Yogurt, fat free, plain', 'Yogurt, fat free, plain, strained'])
    assert.equal(matching.rankReferences(p, matching.identifyFood(p), [c(description)], 'as-sold').length, 1);
  for (const description of ['Yogurt, fat free, hazelnut', 'Yogurt, fat free, chocolate', 'Yogurt, fat free, fruit', 'Yogurt, full fat, plain', 'Yogurt, low fat, plain'])
    assert.equal(matching.rankReferences(p, matching.identifyFood(p), [c(description)], 'as-sold').length, 0);
  const fish = evidence.products.find(p => p.barcode === '5000116111978').product;
  const base = { ...c('Fish fingers, pollock, grilled'), macros: matching.productMacros(fish) };
  const trace = { ...fish, ingredients_text: fish.ingredients_text + '. May contain hazelnuts.' };
  assert.equal(matching.rankReferences(trace, matching.identifyFood(trace), [base], 'as-sold').length, 1);
  for (const addition of ['hazelnut', 'chocolate', 'cheese'])
    assert.equal(matching.rankReferences(fish, matching.identifyFood(fish), [{ ...base, description: base.description + ', with ' + addition }], 'as-sold').length, 0);
});

test('range selection excludes a dominated same-tier candidate in both matching paths, independently of its mineral extremes', () => {
  for (const product of [holdouts.products[0].product, evidence.products.find(p => p.barcode === '5000116111978').product]) {
    const identity = matching.identifyFood(product), macros = matching.productMacros(product);
    const description = identity.family === 'food-name' ? 'Yogurt, fat free, plain' : 'Fish fingers, pollock, grilled';
    const best = { source: 'CoFID 2021', code: 'a', description, macros, potassiumMg: 100, phosphorusMg: 100 };
    const weak = { ...best, code: 'b', potassiumMg: 9999, phosphorusMg: 9999,
      macros: Object.fromEntries(Object.entries(macros).map(([k,v]) => [k,v + 1])) };
    const ranked = matching.rankReferences(product, identity, [weak, best], 'as-sold');
    assert.equal(ranked.length, 2); assert.equal(ranked[0].tier, ranked[1].tier);
    assert.deepEqual(Array.from(matching.selectReferenceGroup(ranked), r => r.candidate.code), ['a']);
  }
});

test('retained preparation yield uses the same generic logic for an unseen product', () => {
  const p = { product_name: 'Instant ramen noodles', categories: 'Instant noodles', preparationYield:
    { dryGrams: 70, preparedGrams: 350, retainsAllContents: true, source: 'https://example.com/label' } };
  const ref = supplemental.supplementalReferences(p, 'prepared')[0];
  assert.equal(ref.original.factor, 0.2); assert.equal(ref.potassiumMg, 227 * 0.2);
  assert.equal(ref.phosphorusMg, 145 * 0.2);
});

test('reviewed drained labels and transcribed nutrition text control mass, not canned category defaults', async () => {
  const chickpeas = await run('4056489903703'), sardines = await run('5606677004959'), carrots = await run('4088600219844');
  assert.match(chickpeas.portion.referenceLabel, /drained/); assert.equal(chickpeas.portion.amount, 120);
  assert.equal(chickpeas.portion.wholePack, undefined); // Never use the 400g undrained pack.
  assert.equal(sardines.portion.amount, 100); assert.match(sardines.portion.referenceLabel, /drained/);
  assert.equal(carrots.portion.wholePack.amount, 160); assert.match(carrots.portion.referenceLabel, /drained/);
  assert.equal(chickpeas.results.potassium.valueMg, 281); assert.equal(chickpeas.results.phosphorus.valueMg, 141);
  const explicit = labels.reviewedLabelBasis('4056489903703', { nutrition_basis: 'whole contents' });
  assert.equal(explicit.nutrition_basis, 'whole contents');
});

test('Bramwells uses a new complete seasoned reference and exact declared yield, never the ambiguous USDA food', async () => {
  const { results, portion } = await run('4061464935198');
  assert.equal(portion.basis, 'prepared'); assert.equal(portion.amount, 435);
  assert.equal(results.potassium.estimate.kind, 'single');
  const reference = results.potassium.estimate.references[0];
  assert.equal(reference.foodCode, 'F006055'); assert.equal(reference.originalValueMg, 227);
  assert.equal(reference.originalBasis, 'dry'); assert.equal(reference.factor, 85 / 435);
  assert.ok(Math.abs(results.potassium.valueMg - 227 * 85 / 435) < 1e-10);
  assert.ok(Math.abs(results.phosphorus.valueMg - 145 * 85 / 435) < 1e-10);
  assert.match(results.potassium.estimate.explanation, /includes|seasoned/);
  assert.match(results.potassium.estimate.explanation, /moisture-adjusted/);
  assert.ok(results.potassium.additiveUncertainty); assert.ok(results.phosphorus.additiveUncertainty);
  const snap = snacks.snapshotForQuantity(snacks.foodSnapshot({ minerals: results }, 'g', 'prepared', 'AFCD'), 435);
  assert.ok(Math.abs(snap.nutrients.potassium.value - 192.95) < 1e-10);
  assert.ok(Math.abs(snap.nutrients.phosphate.value - 123.25) < 1e-10);
  assert.equal(snap.reference.potassium.estimate.references[0].factor, 85 / 435);
});

test('shared families reject incompatible preparation and ingredient-only substitutes', () => {
  const p = labels.reviewedLabelBasis('4056489903703', evidence.products[0].product), id = matching.identifyFood(p);
  const make = description => ({ source: 'CoFID 2021', code: description, description, macros: matching.productMacros(p), potassiumMg: 999, phosphorusMg: 999 });
  for (const description of ['Chickpeas, dry, raw', 'Chickpeas, canned, solids and liquids', 'Hummus, chickpeas with tahini'])
    assert.equal(matching.rankReferences(p, id, [make(description)], 'as-sold').length, 0);
  const fish = evidence.products.find(p => p.barcode === '5000116111978').product;
  assert.equal(matching.rankReferences(fish, matching.identifyFood(fish), [make('Fish, pollock, plain, cooked')], 'as-sold').length, 0);
  const noodle = labels.reviewedLabelBasis('4061464935198', evidence.products[2].product);
  for (const candidate of [{ ...make('Ramen, prepared'), basis: 'prepared', completeProduct: false },
    { ...make('Ramen, seasoned, dry'), basis: 'dry', completeProduct: true }])
    assert.equal(matching.rankReferences(noodle, matching.identifyFood(noodle, 'prepared'), [candidate], 'prepared').length, 0);
});

test('complete-product metadata can establish seasoning coverage without matching title words', () => {
  const p = labels.reviewedLabelBasis('4061464935198', evidence.products[2].product);
  const c = { ...supplemental.supplementalReferences(p, 'prepared')[0], description: 'Instant noodles, prepared' };
  assert.equal(matching.rankReferences(p, matching.identifyFood(p, 'prepared'), [c], 'prepared').length, 1);
  assert.equal(supplemental.supplementalReferences({ ...p, preparationYield: { ...p.preparationYield, retainsAllContents: false } }, 'prepared')[0].code, 'F006054');
});

test('failed searches stay distinguishable and reviewed soup remains a valid fallback', async () => {
  const failed = service({ cofid: async () => { throw Error('query failed'); }, usda: async () => ({ status: 'unavailable', data: null }) });
  const r = await failed.resolve({ product_name: 'Unidentified branded food', nutriments: {} }, 'as-sold', 'g');
  assert.equal(r.matches.potassium, undefined); assert.match(r.reasons.potassium, /unavailable/);
  const soup = evidence.products[1].product;
  const current = await curated.resolveCuratedMinerals('unseen', { potassium: null, phosphorus: null }, async () => null, { basis: 'as-sold' });
  const fallback = await categories.resolveCategoryMinerals('unseen', soup, current, async () => null,
    { basis: 'as-sold', unit: 'g', searchReferences: async () => ({ matches: {}, reasons: { potassium: 'query failed' }, searches: [] }),
      loadUsda: async () => evidence.usda.find(f => f.fdcId === 171546) });
  assert.equal(fallback.potassium.valueMg, 133); assert.equal(fallback.phosphorus.valueMg, 35);
});

test('valid extrema outside the first four references are retained', async () => {
  const p = evidence.products[3].product;
  const rows = Array.from({ length: 9 }, (_, i) => ({ food_code: String(i), food_name: 'Fish fingers, pollock, grilled',
    energy_kcal: 208, protein_g: 12, fat_g: 9.1, carbohydrate_g: 19, potassium_mg: 200 + i, phosphorus_mg: 100 + i }));
  const s = service({ cofid: async () => rows, usda: async () => ({ status: 'ok', data: [] }) });
  const r = await s.resolve(p, 'as-sold', 'g');
  assert.ok(r.comparables.potassium.some(c => c.code === '8'));
});
