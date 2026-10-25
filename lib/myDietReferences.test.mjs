import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const modules = new Map();
function load(file) {
  if (modules.has(file)) return modules.get(file);
  const exports = {}; modules.set(file, exports);
  const code = ts.transpileModule(fs.readFileSync(new URL(file, import.meta.url), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  vm.runInNewContext(code, { exports, require: name => load(name + '.ts') });
  return exports;
}
const diet = load('./myDiet.ts'), refs = load('./myDietReferences.ts'), flow = load('./myDietOnboarding.ts');
const plain = value => JSON.parse(JSON.stringify(value));

for (const [stage, potassium, phosphorus] of [['stage3', null, null], ['stage4', 2737, 1000], ['stage5', 2737, 1000], ['dialysis', 2737, 1000]]) {
  test(`${stage} direct selection fills exact existing figures and makes their fields visible without the wizard`, () => {
    const initial = { ...diet.defaultRequirements, monitoredNutrients: [] }, before = JSON.stringify(initial);
    const next = refs.applyStageReferences(initial, stage);
    assert.equal(next.ckdStage, stage); assert.equal(flow.targetDisplayValue(next, 'sodiumLimit'), 5);
    assert.equal(next.sodiumLimit, 2000); assert.equal(next.potassiumLimitMg, potassium); assert.equal(next.phosphateLimitMg, phosphorus);
    assert.deepEqual(plain(diet.visibleMonitoredNutrients(next)), potassium == null ? ['sodium'] : ['sodium', 'potassium', 'phosphate']);
    assert.equal(next.nutrientTargetSettings.sources.sodium, 'reference');
    for (const key of ['proteinMinG', 'proteinMaxG', 'carbohydrateMin', 'carbohydrateMax', 'fluidLimitMl']) assert.equal(next[key], null);
    assert.equal(JSON.stringify(initial), before); assert.equal(next.onboardingStatus, undefined);
  });
}

test('direct stage buttons preserve personal targets, preferences, allergies and selected nutrients', () => {
  const initial = { ...diet.defaultRequirements, ckdStage: 'stage3', sodiumLimit: 1600, potassiumLimitMg: 2200, phosphateLimitMg: 850,
    proteinMinG: 51.5, proteinMaxG: 70, carbohydrateMin: 100, carbohydrateMax: 250, fluidLimitMl: 1500,
    monitoredNutrients: ['protein', 'calories', 'fluid'], foodAllergies: ['Egg'], dislikedFoods: ['Olives'], preferredName: 'Alex',
    dietaryAdvice: 'Existing advice', potassium: 'Moderate', phosphate: 'Low', onboardingStatus: 'in_progress', onboardingStep: 2,
    nutrientTargetSettings: { energyMinKcal: 1800, energyMaxKcal: 2200, sources: { sodium: 'personal', potassium: 'personal' } } };
  const next = refs.applyStageReferences(initial, 'stage4');
  for (const key of ['sodiumLimit', 'potassiumLimitMg', 'phosphateLimitMg', 'proteinMinG', 'proteinMaxG', 'carbohydrateMin', 'carbohydrateMax',
    'fluidLimitMl', 'preferredName', 'dietaryAdvice', 'potassium', 'phosphate', 'onboardingStatus', 'onboardingStep']) assert.equal(next[key], initial[key]);
  assert.deepEqual(plain(next.foodAllergies), ['Egg']); assert.deepEqual(plain(next.dislikedFoods), ['Olives']);
  assert.deepEqual(plain(next.monitoredNutrients), ['sodium', 'protein', 'potassium', 'phosphate', 'calories', 'fluid']);
  assert.equal(next.nutrientTargetSettings.energyMinKcal, 1800); assert.equal(flow.targetSource(next, 'sodium'), 'personal');
});

test('stage changes remove only reference-owned figures that do not apply to the new stage', () => {
  const stage4 = refs.applyStageReferences({ ...diet.defaultRequirements, monitoredNutrients: [] }, 'stage4');
  const personalPotassium = flow.withTarget(stage4, 'potassiumLimitMg', '2200');
  const stage3 = refs.applyStageReferences(personalPotassium, 'stage3');
  assert.equal(stage3.sodiumLimit, 2000); assert.equal(stage3.potassiumLimitMg, 2200); assert.equal(stage3.phosphateLimitMg, null);
  assert.equal(stage3.nutrientTargetSettings.sources.potassium, 'personal');
  assert.equal(stage3.nutrientTargetSettings.sources.phosphate, undefined);
  assert.equal(personalPotassium.phosphateLimitMg, 1000);
  const stage5 = refs.applyStageReferences(stage3, 'stage5');
  assert.equal(stage5.potassiumLimitMg, 2200); assert.equal(stage5.phosphateLimitMg, 1000);
});

test('ambiguous legacy figures and zero values are preserved, even with a stale reference marker', () => {
  for (const target of [0, 1800, 2000]) {
    const initial = { ...diet.defaultRequirements, ckdStage: 'stage3', sodiumLimit: target };
    assert.equal(refs.applyStageReferences(initial, 'stage4').sodiumLimit, target);
  }
  const stale = { ...diet.defaultRequirements, ckdStage: 'stage4', potassiumLimitMg: 2100, nutrientTargetSettings: { sources: { potassium: 'reference' } } };
  assert.equal(refs.applyStageReferences(stale, 'stage3').potassiumLimitMg, 2100);
});

test('a cleared field accepts the reference on an explicit direct stage click, and repeated clicks are stable', () => {
  const initial = { ...diet.defaultRequirements, nutrientTargetSettings: { sources: { sodium: 'personal' } } };
  const once = refs.applyStageReferences(initial, 'stage4');
  assert.equal(once.sodiumLimit, 2000); assert.equal(once.nutrientTargetSettings.sources.sodium, 'reference');
  assert.deepEqual(plain(refs.applyStageReferences(once, 'stage4')), plain(once));
});

for (const choice of ['nonrenal', 'unsure']) test(`${choice} applies no CKD references and keeps personal figures`, () => {
  const initial = refs.applyStageReferences(diet.defaultRequirements, 'stage4');
  const personal = flow.withTarget(initial, 'potassiumLimitMg', '2200');
  const next = refs.applyStageReferences(personal, choice);
  assert.equal(next.ckdStage, 'custom'); assert.equal(next.nutrientTargetSettings.kidneyCategory, choice);
  assert.equal(next.sodiumLimit, null); assert.equal(next.phosphateLimitMg, null); assert.equal(next.potassiumLimitMg, 2200);
});

test('the wizard stage choice continues to preserve all figures until explicit reference acceptance', () => {
  const initial = { ...diet.defaultRequirements, sodiumLimit: 1600, proteinMinG: 55, monitoredNutrients: ['protein'] };
  const next = refs.withKidneyStage(initial, 'stage4');
  assert.equal(next.sodiumLimit, 1600); assert.equal(next.proteinMinG, 55); assert.equal(next.potassiumLimitMg, null);
  assert.deepEqual(plain(next.monitoredNutrients), ['protein']);
});

test('direct stage figures round-trip through the existing account row and feed shared assessment', () => {
  const next = refs.applyStageReferences({ ...diet.defaultRequirements, foodAllergies: ['Milk'] }, 'stage4');
  const restored = diet.requirementsFromRow(diet.requirementsToRow(next, 'test-owner'));
  assert.equal(restored.sodiumLimit, 2000); assert.equal(restored.potassiumLimitMg, 2737);
  assert.deepEqual(plain(restored.monitoredNutrients), ['sodium', 'potassium', 'phosphate']);
  assert.equal(restored.nutrientTargetSettings.sources.potassium, 'reference');
  assert.deepEqual(plain(restored.foodAllergies), ['Milk']);
  const targets = load('./nutrientTargets.ts');
  assert.equal(targets.evaluateNutrientTarget(2738, restored, 'potassium'), 'red');
});

test('the actual direct stage handler updates displayed values, browser cache and the account save together', () => {
  const source = fs.readFileSync(new URL('../app/requirements/page.tsx', import.meta.url), 'utf8');
  const ast = ts.createSourceFile('page.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  let handler;
  function visit(node) { if (ts.isFunctionDeclaration(node) && node.name?.text === 'applyStage') handler = node.getText(ast); ts.forEachChild(node, visit); }
  visit(ast); assert.ok(handler);
  for (const [ready, loadError] of [[true, false], [false, false], [true, true]]) {
    const exports = {}, displayed = [], cached = [], saved = [];
    vm.runInNewContext(ts.transpileModule(handler + '\nexports.applyStage=applyStage;', { compilerOptions: { target: ts.ScriptTarget.ES2020 } }).outputText,
      { exports, requirementsReady: ready, loadError, requirements: { ...diet.defaultRequirements, monitoredNutrients: [] }, isLoggedIn: true,
        applyStageReferences: refs.applyStageReferences, setRequirements: next => displayed.push(next), trackDietUpdate() {},
        syncRequirementsToLocalStorage: (next, pending) => cached.push({ next, pending }), saveRequirements: next => saved.push(next) });
    exports.applyStage('stage4');
    assert.equal(saved.length, ready && !loadError ? 1 : 0);
    if (saved.length) {
      assert.equal(displayed[0], saved[0]); assert.equal(cached[0].next, saved[0]); assert.equal(cached[0].pending, true);
      assert.equal(saved[0].potassiumLimitMg, 2737); assert.equal(flow.targetDisplayValue(saved[0], 'sodiumLimit'), 5);
    }
  }
});
