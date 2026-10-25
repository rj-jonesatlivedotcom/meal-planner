import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const modules = new Map();
function load(file) {
  if (modules.has(file)) return modules.get(file);
  const exports = {}; modules.set(file, exports);
  const source = fs.readFileSync(new URL(file, import.meta.url), 'utf8');
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  vm.runInNewContext(code, { exports, require: name => load(name + '.ts') });
  return exports;
}
const diet = load('./myDiet.ts');
const { homeJourney } = load('./homeJourney.ts');
const complete = overrides => ({ ...diet.defaultRequirements, onboardingStatus: 'completed', monitoredNutrients: ['calories'],
  nutrientTargetSettings: { energyMinKcal: 1800, energyMaxKcal: 2200 }, ...overrides });

test('existing meals, preferences or nutrient selections never bypass unfinished My Diet', () => {
  for (const settings of [null, { ...diet.defaultRequirements, potassium: 'Low' },
    complete({ onboardingStatus: undefined }), complete({ onboardingStatus: 'in_progress' }), complete({ onboardingStatus: 'skipped' })]) {
    const result = homeJourney(settings, 21);
    assert.equal(result.dietReady, false); assert.equal(result.currentJourneyStep, 1);
    assert.equal(result.nextAction.href, '/requirements'); assert.equal(result.welcome, 'WELCOME TO RENALPLAN');
    assert.match(result.nextAction.description, /Sidney.*guided setup.*daily figures/);
    assert.doesNotMatch(result.nextAction.description, /shopping list is ready/i);
  }
});

test('a completed wizard needs saved figures for every selected nutrient', () => {
  for (const settings of [complete({ monitoredNutrients: [] }), complete({ monitoredNutrients: ['potassium'] }),
    complete({ monitoredNutrients: ['calories', 'protein'] }), complete({ nutrientTargetSettings: null })]) {
    const result = homeJourney(settings, 21);
    assert.equal(result.currentJourneyStep, 1); assert.equal(result.nextAction.button, 'Set My Diet figures');
    assert.equal(result.badge, 'MY DIET FIGURES TO SET');
    assert.match(result.nextAction.description, /daily target or range for each nutrient/);
  }
});

test('retained figures for unselected nutrients cannot complete My Diet', () => {
  const result = homeJourney(complete({ monitoredNutrients: ['potassium'], sodiumLimit: 2000, proteinMaxG: 80 }), 21);
  assert.equal(result.dietReady, false);
});

test('valid minimum-only, maximum-only, zero and mixed targets complete My Diet', () => {
  for (const settings of [complete({ nutrientTargetSettings: { energyMinKcal: 1800 } }),
    complete({ nutrientTargetSettings: { energyMaxKcal: 2200 } }),
    complete({ monitoredNutrients: ['sodium'], sodiumLimit: 0 }),
    complete({ monitoredNutrients: ['potassium', 'carbohydrate', 'fluid'], potassiumLimitMg: 2737, carbohydrateMin: 100, carbohydrateMax: 250, fluidLimitMl: 1500 })]) {
    const before = JSON.stringify(settings);
    const result = homeJourney(settings, 0);
    assert.equal(result.dietReady, true); assert.equal(result.currentJourneyStep, 2); assert.equal(result.nextAction.href, '/planner');
    assert.equal(result.welcome, 'WELCOME BACK'); assert.equal(JSON.stringify(settings), before);
  }
});

test('invalid or unsaved figures keep the Journey at My Diet', () => {
  for (const settings of [complete({ nutrientTargetSettings: { energyMinKcal: 2200, energyMaxKcal: 1800 } }),
    complete({ nutrientTargetSettings: { energyMaxKcal: NaN } }), complete({ nutrientTargetSettings: { energyMaxKcal: Infinity } }),
    complete({ nutrientTargetSettings: { energyMinKcal: -1, energyMaxKcal: 2200 } })]) assert.equal(homeJourney(settings, 21).dietReady, false);
  assert.equal(homeJourney(complete(), 21, true).dietReady, false);
  assert.equal(homeJourney(complete(), 21, true).nextAction.href, '/requirements');
});

for (const [meals, step, href] of [[0, 2, '/planner'], [8, 2, '/planner'], [21, 4, '/shopping']]) {
  test(`completed My Diet restores the normal Journey for ${meals} planned meals`, () => {
    const result = homeJourney(complete(), meals);
    assert.equal(result.currentJourneyStep, step); assert.equal(result.nextAction.href, href);
  });
}

test('the actual homepage welcome uses the same message on mobile and desktop', () => {
  const source = fs.readFileSync(new URL('../app/page.tsx', import.meta.url), 'utf8');
  const ast = ts.createSourceFile('page.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  let paragraph;
  function visit(node) {
    if (ts.isJsxElement(node) && node.openingElement.tagName.getText(ast) === 'p' && node.getText(ast).includes('{nextAction.description}')) paragraph = node.getText(ast);
    ts.forEachChild(node, visit);
  }
  visit(ast); assert.ok(paragraph); assert.doesNotMatch(paragraph, /sm:hidden|hidden sm:inline/);
  for (const result of [homeJourney(null, 21), homeJourney(complete({ monitoredNutrients: ['protein'] }), 21), homeJourney(complete(), 0)]) {
    const exports = {};
    vm.runInNewContext(ts.transpileModule('exports.view = ' + paragraph, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText,
      { exports, nextAction: result.nextAction, require: () => ({ jsx: (type, props) => ({ type, props }) }) });
    assert.equal(exports.view.props.children, result.nextAction.description);
    assert.doesNotMatch(exports.view.props.children, /shopping list is ready/i);
  }
});

test('the actual welcome badge reflects incomplete setup even with an existing full meal plan', () => {
  const source = fs.readFileSync(new URL('../app/page.tsx', import.meta.url), 'utf8');
  const ast = ts.createSourceFile('page.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  let badgeElement;
  function visit(node) {
    if (ts.isJsxElement(node) && node.openingElement.tagName.getText(ast) === 'span' && node.children.some(child =>
      ts.isJsxExpression(child) && child.expression?.getText(ast) === 'badge')) badgeElement = node.getText(ast);
    ts.forEachChild(node, visit);
  }
  visit(ast); assert.ok(badgeElement);
  for (const settings of [null, complete({ monitoredNutrients: ['potassium'] }), complete()]) {
    const result = homeJourney(settings, 21), exports = {};
    vm.runInNewContext(ts.transpileModule('exports.view = ' + badgeElement, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText,
      { exports, ...result, plannedMeals: 21, require: () => ({ jsx: (type, props) => ({ type, props }) }) });
    assert.equal(exports.view.props.children, result.badge);
    assert.match(exports.view.props.className, result.dietReady ? /bg-green-100/ : /bg-amber-100/);
  }
});
