import test from 'node:test';
import assert from 'node:assert/strict';
import { fixture, week, next } from './weeklyPageTestSupport.mjs';

const owner = { kind: 'account', id: 'authority-test' };
const clone = value => JSON.parse(JSON.stringify(value));
async function setup() {
  const f = fixture();
  const { emptyWeeklyPlan, planStorageKey } = f.load('./weeklyPlans');
  const remote = new Map();
  remote.set(week, { ...emptyWeeklyPlan(owner, week), baseRevision: 1 });
  let writes = 0;
  const account = {
    load: async key => clone(remote.get(key) ?? null),
    save: async plan => {
      writes++;
      assert.equal(plan.baseRevision, remote.get(plan.weekStart)?.baseRevision ?? null);
      const result = { ...clone(plan), baseRevision: (plan.baseRevision ?? 0) + 1 };
      remote.set(plan.weekStart, result);
      return clone(result);
    },
  };
  const store = f.load('./weeklyPlanStore').createWeeklyPlanStore({ owner, storage: f.storage, account });
  const context = f.load('./weeklyPlanContext').createWeeklyPlanContext(week); // No Web Locks needed for account CAS.
  const bridge = f.load('./weeklyPageStorage');
  return { ...f, remote, account, store, context, bridge, key: planStorageKey(owner, week) + ':sync', writes: () => writes };
}

test('dirty, corrupt and unavailable browser caches cannot block signed-in Planner/Nutrition', async () => {
  for (const stale of ['not JSON', JSON.stringify({ dirty: true, plan: { baseRevision: 0 } })]) {
    const f = await setup();
    f.values.set(f.key, stale);
    await f.context.setOwner(owner, f.store);
    assert.equal(f.context.getSnapshot().status, 'ready');
    assert.equal(f.context.getSnapshot().plan.baseRevision, 1);
    assert.equal(f.writes(), 0);
    assert([...f.values.values()].includes(stale), 'old browser bytes are archived');
  }
  const f = await setup();
  f.storage.getItem = () => { throw Error('storage unavailable'); };
  f.storage.setItem = () => { throw Error('quota'); };
  await f.context.setOwner(owner, f.store);
  assert.equal(f.context.getSnapshot().status, 'ready');
  f.bridge.attachWeeklyPages(f.context);
  const page = f.bridge.createWeeklyPageStorage();
  const planner = JSON.parse(page.getItem('weekly-planner'));
  planner.Wednesday.Lunch = 'saved-despite-quota';
  page.setItem('weekly-planner', JSON.stringify(planner));
  await f.bridge.flushWeeklyPageWrites();
  assert.equal(f.remote.get(week).planner.Wednesday.Lunch, 'saved-despite-quota');
});

test('a stale page changes only its edited slot and preserves other devices meals and portions', async () => {
  const f = await setup();
  await f.context.setOwner(owner, f.store); f.bridge.attachWeeklyPages(f.context);
  const page = f.bridge.createWeeklyPageStorage();
  const oldPage = JSON.parse(page.getItem('weekly-planner'));
  const newer = clone(f.remote.get(week));
  newer.planner.Tuesday.Dinner = 'other-device'; newer.mealPeople.Tuesday.Dinner = 4;
  newer.shopping.checkedItems = ['Milk']; newer.householdPeople = 3; newer.baseRevision = 2;
  f.remote.set(week, newer);
  await f.context.select(week); // Even an intervening refresh must retain the page's read baseline.
  oldPage.Monday.Breakfast = 'new-breakfast';
  page.setItem('weekly-planner', JSON.stringify(oldPage)); await f.bridge.flushWeeklyPageWrites();
  const saved = f.remote.get(week);
  assert.equal(saved.planner.Monday.Breakfast, 'new-breakfast');
  assert.equal(saved.planner.Tuesday.Dinner, 'other-device');
  assert.equal(saved.mealPeople.Tuesday.Dinner, 4);
  assert.equal(saved.householdPeople, 3); assert.deepEqual(saved.shopping.checkedItems, ['Milk']);
  assert.equal(saved.baseRevision, 3); assert.equal(f.context.getSnapshot().status, 'ready');
  await f.context.select(next); assert.equal(f.context.getSnapshot().plan.planner.Monday.Breakfast, null);
  await f.context.select(week); assert.equal(f.context.getSnapshot().plan.planner.Monday.Breakfast, 'new-breakfast');
});

test('shopping checkbox changes retain unrelated account meal and checkbox updates', async () => {
  const f = await setup();
  await f.context.setOwner(owner, f.store); f.bridge.attachWeeklyPages(f.context);
  const page = f.bridge.createWeeklyPageStorage();
  const shopping = JSON.parse(page.getItem('shopping-data'));
  const newer = clone(f.remote.get(week)); newer.planner.Friday.Lunch = 'remote-meal';
  newer.shopping.checkedItems = ['Milk']; newer.householdPeople = 5; newer.baseRevision = 2;
  f.remote.set(week, newer);
  shopping.checkedItems = ['Bread'];
  page.setItem('shopping-data', JSON.stringify(shopping)); await f.bridge.flushWeeklyPageWrites();
  const saved = f.remote.get(week);
  assert.equal(saved.planner.Friday.Lunch, 'remote-meal'); assert.equal(saved.householdPeople, 5);
  assert.deepEqual(saved.shopping.checkedItems, ['Milk', 'Bread']);
});

test('an unavailable account never falls back to an unverified browser plan', async () => {
  const f = await setup(); f.values.set(f.key, JSON.stringify({ plan: f.remote.get(week), dirty: false }));
  f.account.load = async () => { throw Error('offline'); };
  await f.context.setOwner(owner, f.store);
  assert.equal(f.context.getSnapshot().status, 'error');
  assert.equal(f.context.getSnapshot().plan, null);
  assert.doesNotMatch(f.context.getSnapshot().error, /conflict|reconcil|version|draft/i);
});
