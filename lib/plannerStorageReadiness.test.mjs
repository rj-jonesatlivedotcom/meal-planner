import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import test from 'node:test';
import assert from 'node:assert/strict';
import { fixture, setup } from './weeklyPageTestSupport.mjs';

const text = fs.readFileSync(new URL('../app/planner/page.tsx', import.meta.url), 'utf8');
const source = ts.createSourceFile('planner.tsx', text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const effects = [];
function visit(node) {
  if (ts.isCallExpression(node) && node.expression.getText(source) === 'useEffect') effects.push(node.arguments[0].getText(source));
  ts.forEachChild(node, visit);
}
visit(source);
const hydrate = effects.find(effect => effect.includes('setLoadedPlannerStorage'));
const persist = effects.find(effect => effect.includes('loadedPlannerStorage !== weeklyPageStorage'));
function run(effect, bindings) {
  return vm.runInNewContext(ts.transpileModule(`(${effect})()`, { compilerOptions: { target: ts.ScriptTarget.ES2020 } }).outputText, bindings);
}

test('Planner does not hydrate empty defaults or write while its week is unavailable', () => {
  assert.ok(hydrate); assert.ok(persist);
  const unavailable = fixture().load('./weeklyPageStorage').useWeeklyPageStorage();
  assert.equal(unavailable.ready, false);
  assert.throws(() => unavailable.setItem('weekly-planner', '{}'), /Week not loaded/);
  assert.doesNotThrow(() => run(hydrate, { weeklyPageStorage: unavailable }));
  assert.doesNotThrow(() => run(persist, { weeklyPageStorage: unavailable }));
});

test('a new ready binding cannot save the previous binding’s page state', () => {
  const storage = { ready: true, setItem() { throw Error('stale state must not be written'); } };
  assert.doesNotThrow(() => run(persist, { weeklyPageStorage: storage, loadedPlannerStorage: {} }));
});

test('the Planner saves normally after hydration matches the ready week binding', async () => {
  const f = await setup();
  assert.equal(f.bridge.useWeeklyPageStorage().ready, true);
  const writes = [], storage = { ready: true, setItem: (key, raw) => writes.push([key, JSON.parse(raw)]) };
  const plannerMeals = { Monday: { Breakfast: 'recipe' } }, mealPeople = { Monday: { Breakfast: 2 } };
  run(persist, { weeklyPageStorage: storage, loadedPlannerStorage: storage, plannerMeals, mealPeople,
    syncPlannerWithShoppingList() {}, datedPlannerEnabled: () => true, window: { dispatchEvent() {} }, Event: class {} });
  assert.equal(writes.length, 1);
  assert.equal(writes[0][0], 'weekly-planner');
  assert.equal(writes[0][1].Monday.Breakfast, 'recipe');
  assert.equal(writes[0][1].mealPeople.Monday.Breakfast, 2);
});
