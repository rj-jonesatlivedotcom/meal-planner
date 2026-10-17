// Explicitly targets the disposable Calendar Test project. Never loads .env.local.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import { createClient } from '@supabase/supabase-js';
import { calendarTestConfiguration, calendarTestFetch } from './calendar-test-environment.mjs';

const { url, key } = calendarTestConfiguration(process.env);
const clients = [];
const identities = [];
const results = [];
const modules = new Map();
function load(name) {
  if (modules.has(name)) return modules.get(name);
  const exports = {}; modules.set(name, exports);
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(new URL('../../lib/' + name + '.ts', import.meta.url), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText, { exports, require: load, Intl, Date });
  return exports;
}
const { createWeeklyPlanAccount } = load('./weeklyPlanAccount');
const { emptyWeeklyPlan } = load('./weeklyPlans');
function client() {
  const c = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false,
      storageKey: `calendar-test-${crypto.randomUUID()}` },
    global: { fetch: calendarTestFetch },
  });
  clients.push(c); return c;
}
async function check(name, fn) {
  await fn(); results.push(name); console.log('PASS: ' + name);
}
const week = '2026-10-19';
try {
  const noAuth = client();
  await check('unauthenticated table and save RPC access denied', async () => {
    const read = await noAuth.from('user_weekly_meal_plans').select('week_start').limit(0);
    assert.equal(read.error?.code, '42501');
    const write = await noAuth.rpc('rp_save_week', { p_week_start: week, p_expected_revision: null,
      p_planner: {}, p_meal_people: {}, p_household_people: 1, p_shopping_state: { checkedItems: [], legacy: {} } });
    assert.equal(write.error?.code, '42501');
  });
  const a = client(), b = client();
  let firstSession;
  for (const c of [a, b]) {
    const { data, error } = await c.auth.signInAnonymously({ options: { data: { test_fixture: 'renalplan-calendar-api' } } });
    if (error) throw new Error('Test identity creation failed: ' + error.message);
    identities.push(data.user.id);
    if (c === a) firstSession = data.session;
    fs.writeFileSync(new URL('./calendar-api-cleanup.json', import.meta.url), JSON.stringify({ project: 'RenalPlan Calendar Test', userIds: identities }, null, 2));
  }
  // Independent clients model separate devices and avoid sharing an Auth lock.
  const secondDevice = client();
  const sessionResult = await secondDevice.auth.setSession(firstSession);
  assert.equal(sessionResult.error, null);
  const account = createWeeklyPlanAccount(a, identities[0]);
  const sameUserOtherDevice = createWeeklyPlanAccount(secondDevice, identities[0]);
  const other = createWeeklyPlanAccount(b, identities[1]);
  let saved;
  await check('actual adapter roundtrip preserves people, checks and recipe ID', async () => {
    const plan = emptyWeeklyPlan({ kind: 'account', id: identities[0] }, week, 4);
    plan.planner.Monday.Breakfast = 'scrambled-egg-tomato-toast';
    plan.mealPeople.Monday.Breakfast = 1;
    plan.shopping.checkedItems = ['Milk'];
    saved = await account.save(plan);
    assert.equal(saved.baseRevision, 1);
    const read = await account.load(week);
    assert.equal(read.householdPeople, 4);
    assert.equal(read.mealPeople.Monday.Breakfast, 1);
    assert.equal(read.planner.Monday.Breakfast, plan.planner.Monday.Breakfast);
    assert.equal(read.shopping.checkedItems[0], 'Milk');
  });
  await check('owner isolation through actual authenticated REST reads', async () => {
    const read = await b.from('user_weekly_meal_plans').select('user_id').eq('user_id', identities[0]);
    assert.equal(read.error, null); assert.equal(read.data.length, 0);
    assert.equal(await other.load(week), null);
  });
  await check('direct authenticated insert/update/delete are denied', async () => {
    for (const response of [
      await a.from('user_weekly_meal_plans').insert({ user_id: identities[0], week_start: '2026-10-26' }),
      await a.from('user_weekly_meal_plans').update({ household_people: 8 }).eq('user_id', identities[0]),
      await a.from('user_weekly_meal_plans').delete().eq('user_id', identities[0]),
    ]) assert.equal(response.error?.code, '42501');
  });
  await check('simultaneous same-revision updates accept exactly one writer', async () => {
    const first = JSON.parse(JSON.stringify(saved)), second = JSON.parse(JSON.stringify(saved));
    first.householdPeople = 2; second.householdPeople = 3;
    const outcomes = await Promise.allSettled([account.save(first), sameUserOtherDevice.save(second)]);
    assert.equal(outcomes.filter(x => x.status === 'fulfilled').length, 1);
    const failure = outcomes.find(x => x.status === 'rejected');
    assert.equal(failure.reason.name, 'WeeklyPlanConflict');
    saved = await account.load(week); assert.equal(saved.baseRevision, 2);
  });
  await check('repeated create-only and stale update cannot overwrite', async () => {
    await assert.rejects(account.save(emptyWeeklyPlan({ kind: 'account', id: identities[0] }, week)), { name: 'WeeklyPlanConflict' });
    await assert.rejects(account.save({ ...saved, baseRevision: 1 }), { name: 'WeeklyPlanConflict' });
  });
  await check('reading future week neither creates nor copies a plan', async () => {
    assert.equal(await account.load('2026-10-26'), null);
  });
  const settings = revision => ({ p_expected_revision: revision, p_timezone: 'Europe/London',
    p_breakfast_time: '08:00', p_lunch_time: '13:00', p_dinner_time: '18:00',
    p_preparation_minutes: 30, p_shopping_weekday: 7, p_shopping_time: '16:00',
    p_preparation_enabled: true, p_shopping_enabled: true });
  await check('calendar settings preserve defaults and isolate users', async () => {
    const response = await a.rpc('rp_save_calendar_settings', settings(null));
    assert.equal(response.error, null); assert.equal(response.data.revision, 1);
    const read = await b.from('user_calendar_settings').select('user_id').eq('user_id', identities[0]);
    assert.equal(read.error, null); assert.equal(read.data.length, 0);
  });
  await check('simultaneous settings updates accept exactly one writer', async () => {
    const responses = await Promise.all([a.rpc('rp_save_calendar_settings', settings(1)), secondDevice.rpc('rp_save_calendar_settings', settings(1))]);
    assert.equal(responses.filter(r => !r.error).length, 1);
    assert.equal(responses.find(r => r.error).error.code, 'PT409');
  });
} catch (error) {
  console.error('FAIL: ' + error.message); process.exitCode = 1;
} finally {
  // Sign out sessions, but do not bypass the intended table DELETE restrictions.
  await Promise.all(clients.map(c => c.auth.signOut()));
  const report = { project: 'RenalPlan Calendar Test', date: new Date().toISOString(),
    passed: results, cleanupRequiredTestUserIds: identities, complete: !process.exitCode };
  fs.writeFileSync(new URL('./calendar-api-results.json', import.meta.url), JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify(report));
}
