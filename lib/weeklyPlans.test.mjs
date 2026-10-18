import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
const exports = {};
vm.runInNewContext(ts.transpileModule(fs.readFileSync(new URL('./weeklyPlans.ts', import.meta.url), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText, { exports, Intl, Date });
const { mondayForDate, dateForSlot, currentMonday, shiftWeek, convertLegacyPlan, emptyWeeklyPlan, planStorageKey, saveLocalDraft, readLocalDraft } = exports;
const owner = { kind: 'guest', id: 'device-a' }, weekStart = '2026-10-19';
const convert = extra => convertLegacyPlan({ owner, weekStart, planner: {}, ...extra });
const memory = () => { const values = new Map(); return { values, getItem: k => values.get(k) ?? null, setItem: (k, v) => values.set(k, v) }; };
test('Monday/Sunday and year boundary use calendar dates', () => {
  assert.equal(mondayForDate('2026-10-19'), weekStart);
  assert.equal(mondayForDate('2026-10-25'), weekStart);
  assert.equal(mondayForDate('2027-01-01'), '2026-12-28');
});
for (const week of ['2026-03-23', '2026-10-19']) test('DST week keeps seven correct dates: ' + week, () => {
  assert.equal(dateForSlot(week, 'Monday'), week);
  assert.equal(dateForSlot(week, 'Sunday'), week === '2026-03-23' ? '2026-03-29' : '2026-10-25');
});
test('week arrows move exactly seven days across DST and year boundaries', () => {
  assert.equal(shiftWeek('2026-10-19', -1), '2026-10-12');
  assert.equal(shiftWeek('2026-10-19', 1), '2026-10-26');
  assert.equal(shiftWeek('2026-03-23', 1), '2026-03-30');
  assert.equal(shiftWeek('2026-12-28', 1), '2027-01-04');
  assert.equal(shiftWeek(shiftWeek('2026-10-19', -1), 1), '2026-10-19');
  assert.throws(() => shiftWeek('2026-10-20', 1));
  assert.throws(() => shiftWeek('2026-10-19', 0.5));
});
test('current week uses London midnight rather than browser timezone', () => {
  assert.equal(currentMonday(new Date('2026-07-05T23:30:00Z')), '2026-07-06');
  assert.equal(currentMonday(new Date('2026-07-05T23:30:00Z'), 'America/New_York'), '2026-06-29');
});
for (const date of ['2026-02-30', '2026-13-01', '19/10/2026', '']) test('invalid date rejected: ' + date, () => assert.throws(() => mondayForDate(date)));
test('migration requires an explicit Monday', () => assert.throws(() => convert({ weekStart: '2026-10-20' })));
test('migration preserves IDs, explicit one-person override and household size', () => {
  const input = { planner: { Monday: { Breakfast: 'existing-recipe-id' }, mealPeople: { Monday: { Breakfast: 1 } } }, householdPeople: 4, shopping: { people: 4, checkedItems: ['Milk'], manualRecipes: ['another-id'], shoppingList: [{ item: 'Milk', quantity: '200ml' }] } };
  const before = JSON.stringify(input), result = convert(input);
  assert.equal(result.plan.planner.Monday.Breakfast, 'existing-recipe-id');
  assert.equal(result.plan.mealPeople.Monday.Breakfast, 1);
  assert.equal(result.plan.householdPeople, 4);
  assert.equal(JSON.stringify(result.plan.shopping.legacy), JSON.stringify(input.shopping));
  assert.equal(JSON.stringify(input), before);
  result.plan.shopping.legacy.checkedItems.push('Bread');
  assert.equal(JSON.stringify(input), before);
  assert.equal(JSON.parse(result.original).planner.Monday.Breakfast, 'existing-recipe-id');
});
test('account separate people fields are preserved', () => assert.equal(convert({ mealPeople: { Tuesday: { Dinner: 2 } } }).plan.mealPeople.Tuesday.Dinner, 2));
for (const bad of [{ householdPeople: 9 }, { planner: { Monday: { Breakfast: 123 } } }, { planner: { Unrecognised: {} } }, { mealPeople: { Monday: { Lunch: 0 } } }, { checkedItems: [1] }]) test('malformed payload held without coercion: ' + JSON.stringify(bad), () => assert.throws(() => convert(bad)));
test('conflicting legacy copies require reconciliation', () => {
  assert.throws(() => convert({ householdPeople: 2, shopping: { people: 3 } }));
  assert.throws(() => convert({ planner: { mealPeople: { Monday: { Lunch: 1 } } }, mealPeople: { Monday: { Lunch: 2 } } }));
  assert.throws(() => convert({ checkedItems: ['A'], shopping: { checkedItems: ['B'] } }));
});
test('guest/account/week namespaces cannot collide', () => {
  assert.notEqual(planStorageKey(owner, weekStart), planStorageKey({ kind: 'account', id: owner.id }, weekStart));
  assert.notEqual(planStorageKey(owner, weekStart), planStorageKey(owner, '2026-10-26'));
});
test('new future week remains empty, read does not create a row', () => {
  const store = memory(); saveLocalDraft(store, convert({ planner: { Monday: { Lunch: 'meal' } } }).plan, null);
  assert.equal(readLocalDraft(store, owner, '2026-10-26'), null);
  assert.equal(store.values.size, 1);
  assert.equal(emptyWeeklyPlan(owner, '2026-10-26').planner.Monday.Lunch, null);
});
test('repeat import and stale draft cannot overwrite an existing week', () => {
  const store = memory(), plan = convert({}).plan, raw = saveLocalDraft(store, plan, null);
  assert.throws(() => saveLocalDraft(store, plan, null));
  plan.planner.Monday.Lunch = 'new'; saveLocalDraft(store, plan, raw);
  assert.throws(() => saveLocalDraft(store, plan, raw));
});
test('read detects ownership mismatch and corrupt cache', () => {
  const store = memory(), key = planStorageKey(owner, weekStart), plan = convert({}).plan;
  plan.owner = { kind: 'account', id: 'different-user' }; store.setItem(key, JSON.stringify(plan));
  assert.throws(() => readLocalDraft(store, owner, weekStart));
  store.setItem(key, '{bad'); assert.throws(() => readLocalDraft(store, owner, weekStart));
});

test('optional calendar export cannot mislabel the undated Planner as another week', () => {
  const page = fs.readFileSync(new URL('../app/planner/page.tsx', import.meta.url), 'utf8');
  assert.match(page, /calendarWeek !== currentMonday\(\)/);
  assert.match(page, /does not yet store separate dated weeks/);
  assert.match(page, /if \(calendarWeek !== currentMonday\(\)\) throw new Error\(/);
});
