import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
const modules = new Map();
function load(name) {
  if (modules.has(name)) return modules.get(name);
  const exports = {}; modules.set(name, exports);
  const code = ts.transpileModule(fs.readFileSync(new URL(name + '.ts', import.meta.url), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  vm.runInNewContext(code, { exports, require: load, Intl, Date }); return exports;
}
const model = load('./weeklyPlans');
const { createWeeklyPlanAccount, accountRowToPlan, createWeekSelectionLoader } = load('./weeklyPlanAccount');
const week = '2026-10-19', user = 'user-a';
const draft = () => model.emptyWeeklyPlan({ kind: 'account', id: user }, week, 4);
const row = (extra = {}) => ({ user_id: user, week_start: week, planner: {}, meal_people: {}, household_people: 4,
  shopping_state: { checkedItems: ['Milk'], legacy: {} }, revision: 1, ...extra });
const deferred = () => { let resolve, reject; const promise = new Promise((a,b) => { resolve=a; reject=b; }); return { promise, resolve, reject }; };
function harness() {
  const calls = [], state = { session: user, result: { data: row(), error: null }, rpcResult: null };
  const query = { select: value => { calls.push(['select',value]); return query; }, eq: (...v) => { calls.push(['eq',...v]); return query; }, maybeSingle: async () => state.result };
  const client = { auth: { getUser: async () => ({ data: { user: { id: state.session } }, error: null }) },
    from: table => { calls.push(['from',table]); return query; },
    rpc: async (name,args) => { calls.push(['rpc',name,args]); return state.rpcResult ? await state.rpcResult : state.result; } };
  return { state, calls, account: createWeeklyPlanAccount(client,user) };
}
test('reads only requested account/week and maps people/checks', async () => {
  const h=harness(); const plan=await h.account.load(week);
  assert.equal(plan.weekStart,week); assert.equal(plan.householdPeople,4); assert.equal(plan.shopping.checkedItems[0],'Milk');
  assert(h.calls.some(c => c[0]==='eq' && c[1]==='user_id' && c[2]===user));
  assert(h.calls.some(c => c[0]==='eq' && c[1]==='week_start' && c[2]===week));
});
test('absent account week returns null without creating anything', async () => {
  const h=harness(); h.state.result.data=null; assert.equal(await h.account.load(week),null); assert(!h.calls.some(c=>c[0]==='rpc'));
});
for(const patch of [{user_id:'other'},{week_start:'2026-10-26'},{revision:'1'},{revision:0},{meal_people:undefined}]) {
  test('rejects invalid response '+JSON.stringify(patch),()=>assert.throws(()=>accountRowToPlan(row(patch),user,week)));
}
test('new save uses create-only null revision and retains explicit people',async()=>{
  const h=harness(), p=draft(); p.mealPeople.Monday.Breakfast=1; await h.account.save(p);
  const args=h.calls.find(c=>c[0]==='rpc')[2]; assert.equal(args.p_expected_revision,null); assert.equal(args.p_meal_people.Monday.Breakfast,1);
});
test('update uses acknowledged revision and validates increment',async()=>{
  const h=harness(),p=draft();p.baseRevision=3;h.state.result.data=row({revision:4});assert.equal((await h.account.save(p)).baseRevision,4);
});
test('conflict returns dedicated error without retry or draft mutation',async()=>{
  const h=harness(),p=draft(),before=JSON.stringify(p);h.state.result={data:null,error:{code:'PT409'}};
  await assert.rejects(h.account.save(p),{name:'WeeklyPlanConflict'}); assert.equal(JSON.stringify(p),before); assert.equal(h.calls.filter(c=>c[0]==='rpc').length,1);
});
test('wrong owner and signed-out sessions cannot issue saves',async()=>{
  const h=harness(),p=draft();p.owner.id='other';await assert.rejects(h.account.save(p));
  h.state.session='other';await assert.rejects(h.account.save(draft()),{name:'WeeklyPlanSessionChanged'});assert.equal(h.calls.length,0);
});
test('pending save uses captured snapshot and discards response after account change',async()=>{
  const h=harness(),p=draft(),wait=deferred();h.state.rpcResult=wait.promise;
  const pending=h.account.save(p); await new Promise(r=>setImmediate(r));p.weekStart='2026-10-26';p.householdPeople=8;
  const args=h.calls.find(c=>c[0]==='rpc')[2]; assert.equal(args.p_week_start,week);assert.equal(args.p_household_people,4);
  h.state.session='other';wait.resolve({data:row(),error:null});await assert.rejects(pending,{name:'WeeklyPlanSessionChanged'});
});
test('unknown network outcome keeps draft and does not retry',async()=>{
  const h=harness(),p=draft(),before=JSON.stringify(p);h.state.result={data:null,error:{code:'network'}};
  await assert.rejects(h.account.save(p));assert.equal(JSON.stringify(p),before);
});
test('rapid week switching suppresses out-of-order completion',async()=>{
  const waits=[deferred(),deferred()];let i=0;const loader=createWeekSelectionLoader({load:()=>waits[i++].promise});
  const a=loader.select(week),b=loader.select('2026-10-26');waits[1].resolve(null);assert.equal((await b).weekStart,'2026-10-26');
  waits[0].resolve(draft());assert.equal((await a).stale,true);
});
test('cancelled loads cannot show errors on the next account/week',async()=>{
  const wait=deferred(),loader=createWeekSelectionLoader({load:()=>wait.promise});const pending=loader.select(week);loader.cancel();wait.reject(new Error('old failure'));assert.equal((await pending).stale,true);
});
