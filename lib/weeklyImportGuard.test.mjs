import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const load = (file, requireFn = () => { throw Error('Unexpected import'); }) => {
  const exports = {};
  const source = fs.readFileSync(new URL(file, import.meta.url), 'utf8');
  vm.runInNewContext(ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText, { exports, require: requireFn, Date, Intl });
  return exports;
};
const weeks = load('./weeklyPlans.ts');
const guard = load('./weeklyImportGuard.ts', name => {
  assert.equal(name, './weeklyPlans');
  return weeks;
});
const owner = { kind: 'guest', id: 'device-1' };
const other = { kind: 'account', id: 'device-1' };
const monday = '2026-10-19';
const next = '2026-10-26';
const store = () => {
  const data = new Map();
  return { data, getItem: key => data.get(key) ?? null, setItem: (key, value) => data.set(key, value) };
};
const source = { planner: { Monday: { Breakfast: 'B001' }, mealPeople: { Monday: { Breakfast: 2 } } },
  shopping: { people: 2, checkedItems: ['Milk'], manualRecipes: ['L001'] }, householdPeople: 2 };

test('preview is read-only and preserves original legacy data', () => {
  const storage = store();
  storage.setItem('weekly-planner', JSON.stringify(source.planner));
  storage.setItem('shopping-data', JSON.stringify(source.shopping));
  const before = [...storage.data.entries()];
  const preview = guard.previewLegacyWeekImport(storage, owner, monday, source);
  assert.equal(preview.plan.planner.Monday.Breakfast, 'B001');
  assert.equal(preview.plan.mealPeople.Monday.Breakfast, 2);
  assert.equal(preview.plan.shopping.checkedItems[0], 'Milk');
  assert.equal(preview.existing, null);
  assert.deepEqual([...storage.data.entries()], before);
});

test('explicit acceptance preserves legacy keys and isolates owners and weeks', () => {
  const storage = store();
  storage.setItem('weekly-planner', 'legacy-is-untouched');
  const plan = guard.acceptLegacyWeekImport(storage, owner, monday, source);
  assert.equal(plan.planner.Monday.Breakfast, 'B001');
  assert.equal(storage.getItem('weekly-planner'), 'legacy-is-untouched');
  assert.equal(guard.inspectDatedWeek(storage, owner, monday).plan.planner.Monday.Breakfast, 'B001');
  assert.equal(guard.inspectDatedWeek(storage, owner, next).plan, null);
  assert.equal(guard.inspectDatedWeek(storage, other, monday).plan, null);
});

test('existing target is never overwritten, even when it has no meals', () => {
  const storage = store();
  guard.acceptLegacyWeekImport(storage, owner, monday, { planner: {} });
  const original = storage.getItem(weeks.planStorageKey(owner, monday));
  assert.throws(() => guard.acceptLegacyWeekImport(storage, owner, monday, source), /already exists/);
  assert.equal(storage.getItem(weeks.planStorageKey(owner, monday)), original);
});

test('malformed legacy data does not create a target or change the source', () => {
  const storage = store();
  storage.setItem('weekly-planner', 'original');
  assert.throws(() => guard.acceptLegacyWeekImport(storage, owner, monday, {
    planner: { Monday: { Breakfast: 123 } },
  }));
  assert.equal(storage.data.size, 1);
  assert.equal(storage.getItem('weekly-planner'), 'original');
});

test('non-Monday target is rejected without writes', () => {
  const storage = store();
  assert.throws(() => guard.acceptLegacyWeekImport(storage, owner, '2026-10-20', source));
  assert.equal(storage.data.size, 0);
});
