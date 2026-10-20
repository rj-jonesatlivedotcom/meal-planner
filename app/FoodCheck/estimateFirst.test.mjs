import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import ts from 'typescript';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url), cache = new Map(), root = new URL('../../', import.meta.url);
function load(file) {
  if (cache.has(file)) return cache.get(file);
  const exports = {}; cache.set(file, exports);
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(new URL(file, root), 'utf8'), { compilerOptions: { module: 1, target: 7 } }).outputText,
    { exports, require: name => name === 'server-only' ? {} : name.startsWith('.')
      ? load(path.posix.normalize(path.posix.join(path.posix.dirname(file), name + '.ts'))) : require(name) });
  return exports;
}
const search = load('app/FoodCheck/referenceSearch.server.ts'), matching = load('app/FoodCheck/referenceMatching.ts');
const curated = load('app/FoodCheck/curatedMinerals.ts'), categories = load('app/FoodCheck/categoryMinerals.ts');
const portions = load('app/FoodCheck/barcodePortions.ts'), snapshots = load('lib/foodSnacks.ts'), usda = load('app/FoodCheck/usdaData.ts');
const evidence = JSON.parse(fs.readFileSync(new URL('app/FoodCheck/fixtures/estimateFirstReferences.json', root)));
function service(overrides = {}) {
  const calls = [];
  const resolve = search.createReferenceSearch({
    cofid: async term => { calls.push(['CoFID', term]); return evidence.cofid.filter(r => r.food_name.toLowerCase().includes(term.toLowerCase())); },
    usda: async query => {
      calls.push(['USDA', query]);
      const captured = evidence.queries[query];
      assert.ok(captured, 'Uncaptured query: ' + query);
      return { status: captured.status, data: captured.ids.map(id => evidence.usda.find(f => f.fdcId === id)) };
    },
    usdaFood: async id => { calls.push(['detail', id]); assert.ok(evidence.details[id], 'Uncaptured detail: ' + id); return evidence.details[id]; },
    ...overrides,
  });
  return { resolve, calls };
}
async function run(product, barcode = 'unmapped', svc = service(), initial) {
  const portion = portions.barcodePortion(barcode, product), flags = categories.questionableMineralZeros(product);
  const current = initial ?? await curated.resolveCuratedMinerals(barcode, {
    potassium: product.nutriments?.potassium_100g === undefined ? null : product.nutriments.potassium_100g * 1000,
    phosphorus: product.nutriments?.phosphorus_100g === undefined ? null : product.nutriments.phosphorus_100g * 1000,
  }, async () => null, { basis: portion.basis, questionableZero: { potassium: !!flags.potassium, phosphorus: !!flags.phosphorus } });
  const results = await categories.resolveCategoryMinerals(barcode, product, current, async () => null,
    { basis: portion.basis, unit: portion.unit, searchReferences: svc.resolve });
  return { results, portion, svc };
}
for (const { barcode, product } of evidence.products.concat(evidence.holdouts.map((product, i) => ({ barcode: 'holdout-' + i, product })))) {
  test('estimate-first captured product: ' + product.product_name, async () => {
    const { results, portion, svc } = await run(product, barcode);
    for (const key of ['potassium', 'phosphorus']) {
      const n = results[key]; assert.equal(n.provenance, 'estimated'); assert.ok(Number.isFinite(n.valueMg) && n.valueMg >= 0);
      assert.ok(n.estimate.references.length); assert.equal(n.diagnostics.outcome, 'estimated');
      assert.ok(n.diagnostics.attemptedLevels.includes(1));
      const values = n.estimate.references.map(r => r.valueMg);
      assert.equal(n.valueMg, Math.max(...values));
      if (n.rangeMg) { assert.equal(n.rangeMg.lower, Math.min(...values)); assert.equal(n.rangeMg.upper, Math.max(...values)); }
      assert.ok(n.estimate.references.every(r => r.unit === portion.unit && r.basis === portion.basis));
    }
    for (const [, query] of svc.calls.filter(c => c[0] === 'USDA')) assert.ok(evidence.queries[query], 'Uncaptured query: ' + query);
    for (const [, id] of svc.calls.filter(c => c[0] === 'detail')) assert.ok(evidence.details[id], 'Uncaptured detail: ' + id);
    assert.ok(svc.calls.filter(c => c[0] === 'CoFID').length <= 4); assert.ok(svc.calls.filter(c => c[0] === 'USDA').length <= 2);
    assert.ok(svc.calls.filter(c => c[0] === 'detail').length <= 3);
    const snap = snapshots.foodSnapshot({ minerals: results }, portion.unit, portion.basis, 'Captured established references');
    const saved = snapshots.snapshotForQuantity(snap, 45);
    assert.equal(saved.nutrients.potassium.value, results.potassium.valueMg * 45 / 100);
    assert.equal(snapshots.validFoodSnapshot(JSON.parse(JSON.stringify(saved))), true);
    assert.ok(Buffer.byteLength(JSON.stringify(saved)) < 20000);
    const refs = results.potassium.estimate.references.map(r => r.description).join(';');
    if (/grapes/i.test(product.product_name)) assert.doesNotMatch(refs, /soda|leaves|stuffed|seed meal|vegetable/i);
    if (/banana/i.test(product.product_name)) assert.doesNotMatch(refs, /bread|nectar|chips|split|weighed with skin/i);
    if (/cooked ham/i.test(product.product_name)) assert.ok(results.potassium.estimate.references.every(r => /ham/i.test(r.description)));
    if (portion.unit === 'ml') assert.ok(results.potassium.estimate.references.every(r => r.conversion?.evidence && r.conversion.factor > 0));
  });
}
const row = (food_name, potassium_mg, phosphorus_mg, extras = {}) => ({ food_code: food_name, food_name, potassium_mg, phosphorus_mg,
  energy_kcal: null, protein_g: null, fat_g: null, carbohydrate_g: null, ...extras });
const profile = { 'energy-kcal_100g': 195, proteins_100g: 3.4, fat_100g: 8.5, carbohydrates_100g: 26 };
test('each mineral traverses the hierarchy independently; a category reference fills only the unsupported mineral', async () => {
  const product = { product_name: 'Raspberry ripple ice cream', nutriments: profile };
  const svc = service({ cofid: async () => [row('Ice cream, raspberry', 190, null, { energy_kcal: 195, protein_g: 3.4, fat_g: 8.5, carbohydrate_g: 26 }),
    row('Ice cream, dairy, vanilla', 150, 110, { energy_kcal: 195, protein_g: 3.4, fat_g: 8.5, carbohydrate_g: 26 })], usda: async () => ({ status: 'ok', data: [] }) });
  const r = await svc.resolve(product, 'as-sold', 'g');
  assert.equal(r.matches.potassium.description, 'Ice cream, raspberry');
  assert.equal(r.matches.phosphorus.description, 'Ice cream, dairy, vanilla');
  assert.equal(r.diagnostics.phosphorus.selectedLevel, 5); assert.equal(r.diagnostics.potassium.missingMineral, 0);
  assert.equal(r.diagnostics.phosphorus.missingMineral, 1);
  const unsupported = await service({ cofid: async () => [row('Grapes, green', 217, null)], usda: async () => ({ status: 'ok', data: [] }) }).resolve({ product_name: 'Grapes' }, 'as-sold', 'g');
  assert.equal(unsupported.matches.potassium.potassiumMg, 217); assert.equal(unsupported.matches.phosphorus, undefined);
  assert.deepEqual(Array.from(unsupported.diagnostics.phosphorus.attemptedLevels), [2, 3, 4, 5]);
  assert.equal(unsupported.diagnostics.phosphorus.outcome, 'reference-mineral-unavailable');
});
test('missing P triggers broader USDA discovery even when a credible USDA K match already exists', async () => {
  const calls = [];
  const candidate = { fdcId: 1, description: 'Grapes, raw', dataset: 'SR Legacy', unit: 'g', preparation: 'unspecified', macros: {}, potassiumMg: 220, phosphorusMg: null };
  const svc = service({ cofid: async () => [], usda: async q => { calls.push(q); return { status: 'ok', data: [calls.length === 1 ? candidate : { ...candidate, fdcId: 2, potassiumMg: null, phosphorusMg: 22 }] }; } });
  const r = await svc.resolve({ product_name: 'Unseen seedless grapes' }, 'as-sold', 'g');
  assert.equal(calls.length, 2); assert.equal(r.matches.potassium.potassiumMg, 220); assert.equal(r.matches.phosphorus.phosphorusMg, 22);
});
test('ingredient evidence can support a broader dairy-family estimate without manufacturer macros', async () => {
  const r = await service({ cofid: async () => [row('Ice cream, dairy, vanilla', 150, 110)], usda: async () => ({ status: 'ok', data: [] }) })
    .resolve({ product_name: 'Fruit ripple ice cream', ingredients_text: 'Milk, cream, sugar, raspberry puree' }, 'as-sold', 'g');
  assert.equal(r.matches.potassium.potassiumMg, 150); assert.equal(r.diagnostics.phosphorus.selectedLevel, 5);
});
test('a partial result is retried promptly so cached potassium cannot strand phosphorus', async () => {
  let now = 0, reads = 0, available = false;
  const svc = service({ now: () => now, cofid: async () => { reads++; return [row('Grapes, green', 217, available ? 19 : null)]; }, usda: async () => ({ status: 'ok', data: [] }) });
  const product = { product_name: 'Grapes' };
  assert.equal((await svc.resolve(product, 'as-sold', 'g')).matches.phosphorus, undefined);
  const before = reads; available = true; now = 61000;
  const result = await svc.resolve(product, 'as-sold', 'g');
  assert.equal(result.matches.phosphorus.phosphorusMg, 19); assert.ok(reads > before);
});
test('product-specific reported values survive discovery for the other mineral', async () => {
  const product = { product_name: 'Grapes', nutriments: { potassium_100g: 0.123 } };
  const svc = service({ cofid: async () => [row('Grapes, green', 217, 19)], usda: async () => ({ status: 'ok', data: [] }) });
  const { results } = await run(product, 'unseen', svc);
  assert.equal(results.potassium.provenance, 'reported'); assert.equal(results.potassium.valueMg, 123);
  assert.equal(results.phosphorus.provenance, 'estimated'); assert.equal(results.phosphorus.valueMg, 19);
});
test('missing macros do not substitute a different primary food or complete dish', async () => {
  const svc = service({ cofid: async () => [row('Grapes, green', 217, 19), row('Grape leaves, raw', 272, 95), row('Banana bread, homemade', 999, 999),
    row('Beverages, carbonated, grape soda', 999, 999), row('Stuffed grape leaves with beef and rice', 999, 999)], usda: async () => ({ status: 'ok', data: [] }) });
  const r = await svc.resolve({ product_name: 'Seedless mixed grapes', categories_tags: ['en:fruits', 'en:seedless-grapes'] }, 'as-sold', 'g');
  assert.equal(r.comparables.potassium.length, 1); assert.equal(r.matches.potassium.description, 'Grapes, green');
  assert.ok(Object.keys(r.diagnostics.potassium.rejections).length);
});
test('colour additives are incidental; caramel flavour and incompatible recipes remain distinct', async () => {
  const soup = row('Soup, beef and vegetables, canned, ready-to-serve', 200, 40, { energy_kcal: 53, protein_g: 3.3, fat_g: .9, carbohydrate_g: 7.5 });
  const svc = service({ cofid: async () => [soup], usda: async () => ({ status: 'ok', data: [] }) });
  const base = { product_name: 'Beef and vegetable soup', categories: 'Canned soups', nutriments: { 'energy-kcal_100g': 53, proteins_100g: 3.3, fat_100g: .9, carbohydrates_100g: 7.5 } };
  assert.ok((await svc.resolve({ ...base, ingredients_text: 'Water, beef, vegetables, colour: plain caramel, spices' }, 'as-sold', 'g')).matches.phosphorus);
  assert.equal(Object.keys((await svc.resolve({ ...base, product_name: 'Caramel flavour beef soup' }, 'as-sold', 'g')).matches).length, 0);
});
test('explicit raw/cooked, dry/prepared, packing medium and inedible-weight exclusions remain hard', async () => {
  const cases = [
    [{ product_name: 'Raw chicken breast fillet' }, 'as-sold', 'Chicken, breast, meat only, cooked'],
    [{ product_name: 'Chicken breast fillet', categories: 'Cooked chicken' }, 'as-sold', 'Chicken, breast, meat only, raw'],
    [{ product_name: 'Dry noodles' }, 'dry', 'Noodles, cooked'],
    [{ product_name: 'Peach slices in juice' }, 'as-sold', 'Peaches, canned in syrup, whole contents'],
    [{ product_name: 'Fresh banana' }, 'as-sold', 'Bananas, raw, flesh only, weighed with skin'],
    [{ product_name: 'Frozen fried potatoes' }, 'as-sold', 'Potatoes, boiled, flesh only'],
  ];
  for (const [product, basis, description] of cases) {
    const r = await service({ cofid: async () => [row(description, 200, 30)], usda: async () => ({ status: 'ok', data: [] }) }).resolve(product, basis, 'g');
    assert.equal(Object.keys(r.matches).length, 0, description); assert.ok(Object.keys(r.diagnostics.potassium.rejections).length, description);
  }
});
const rawIce = { fdcId: 99, description: 'Frozen novelties, ice type, pop', dataType: 'SR Legacy', foodNutrients: [
  { nutrientId: 1092, unitName: 'mg', value: 10 }, { nutrientId: 1091, unitName: 'mg', value: 4 }],
  foodPortions: [{ gramWeight: 50, amount: 1, modifier: 'serving 100 ml pop', measureUnit: { name: 'undetermined' } }] };
test('volume references convert their own measured portion, preserve provenance and scale snack quantities', async () => {
  const food = usda.parseUsdaFood(rawIce);
  assert.equal(food.volumeBasis.grams, 50); assert.equal(food.volumeBasis.millilitres, 100);
  const svc = service({ cofid: async () => [], usda: async () => ({ status: 'ok', data: [food] }) });
  const { results, portion } = await run({ product_name: 'Ice pops', quantity: '45ml' }, 'unseen', svc);
  assert.equal(portion.unit, 'ml'); assert.equal(results.potassium.valueMg, 5); assert.equal(results.phosphorus.valueMg, 2);
  assert.equal(results.potassium.estimate.references[0].conversion.factor, .5);
  const snap = snapshots.foodSnapshot({ minerals: results }, 'ml', 'as-sold', 'Measured reference portion');
  assert.equal(snapshots.snapshotForQuantity(snap, 45).nutrients.potassium.value, 2.25);
});
test('a valid same-volume reference needs no conversion; unsupported density or ambiguous portions cannot be guessed', async () => {
  for (const portion of [{ gramWeight: 50, amount: 1, measureUnit: { name: 'cup' } }, { gramWeight: 50, modifier: '1 pop' }, { gramWeight: 50, amount: 1, measureUnit: { name: 'oz' } }])
    assert.equal(usda.parseUsdaFood({ ...rawIce, foodPortions: [portion] }).volumeBasis, undefined);
  const base = usda.parseUsdaFood({ ...rawIce, foodPortions: [] });
  const unsupported = await service({ cofid: async () => [], usda: async () => ({ status: 'ok', data: [base] }) }).resolve({ product_name: 'Ice pops' }, 'as-sold', 'ml');
  assert.equal(Object.keys(unsupported.matches).length, 0);
  assert.ok(unsupported.diagnostics.potassium.limitations.includes('reference-mass-volume-conversion-unavailable'));
  const supported = await service({ cofid: async () => [], usda: async () => ({ status: 'ok', data: [{ ...base, unit: 'ml' }] }) }).resolve({ product_name: 'Ice pops' }, 'as-sold', 'ml');
  assert.equal(supported.matches.phosphorus.phosphorusMg, 4); assert.equal(supported.matches.phosphorus.conversion, undefined);
});
test('all empty outcomes distinguish no candidates, rejected candidates, missing minerals and failed services internally', async () => {
  const product = { product_name: 'Grapes' };
  const noRows = await service({ cofid: async () => [], usda: async () => ({ status: 'ok', data: [] }) }).resolve(product, 'as-sold', 'g');
  assert.equal(noRows.diagnostics.potassium.outcome, 'no-reference-candidates');
  const failed = await service({ cofid: async () => { throw Error('offline'); }, usda: async () => ({ status: 'rate-limited', data: null }) }).resolve(product, 'as-sold', 'g');
  assert.ok(failed.diagnostics.phosphorus.limitations.includes('USDA:rate-limited'));
  assert.deepEqual(Array.from(failed.diagnostics.phosphorus.attemptedLevels), [2, 3, 4, 5]);
  for (const code of ['estimate-api-http-401', 'estimate-api-timeout', 'estimate-api-invalid-response']) {
    const failure = categories.referenceSearchFailure(code);
    assert.ok(failure.diagnostics.potassium.limitations.includes(code)); assert.doesNotMatch(failure.reasons.potassium, /401|timeout|invalid-response/);
  }
});
