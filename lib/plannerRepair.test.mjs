import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
import { fixture, setup, week, next } from './weeklyPageTestSupport.mjs';

test('loading a signed-in week cannot read legacy data or save an empty replacement',()=>{
  const f=fixture(),bridge=f.load('./weeklyPageStorage');
  f.values.set('weekly-planner','original legacy plan');
  const page=bridge.useWeeklyPageStorage();
  assert.equal(page.getItem('weekly-planner'),null);
  assert.equal(page.getItem('shopping-data'),null);
  assert.throws(()=>page.setItem('weekly-planner','{}'),/Week not loaded/);
  assert.equal(f.values.get('weekly-planner'),'original legacy plan');
});

test('hook callbacks retain the mounted week through rapid navigation',async()=>{
  const {bridge,context}=await setup();
  const first=bridge.useWeeklyPageStorage();
  await context.select(next);
  const second=bridge.useWeeklyPageStorage();
  first.setItem('weekly-planner',JSON.stringify({Monday:{Breakfast:'first-week'},mealPeople:{Monday:{Breakfast:3}}}));
  second.setItem('weekly-planner',JSON.stringify({Tuesday:{Lunch:'second-week'},mealPeople:{Tuesday:{Lunch:2}}}));
  await bridge.flushWeeklyPageWrites();
  await context.select(week);
  assert.equal(context.getSnapshot().plan.planner.Monday.Breakfast,'first-week');
  assert.equal(context.getSnapshot().plan.mealPeople.Monday.Breakfast,3);
  await context.select(next);
  assert.equal(context.getSnapshot().plan.planner.Monday.Breakfast,null);
  assert.equal(context.getSnapshot().plan.planner.Tuesday.Lunch,'second-week');
  assert.equal(context.getSnapshot().plan.mealPeople.Tuesday.Lunch,2);
});

test('old hook callback after an account switch cannot write into the new owner',async()=>{
  const {bridge,context,storage,load,values}=await setup();
  const original=bridge.useWeeklyPageStorage();
  const other={kind:'account',id:'second-owner'};
  let accountWrites=0;
  const account={load:async()=>null,save:async plan=>{accountWrites++;return {...plan,baseRevision:1};}};
  await context.setOwner(other,load('./weeklyPlanStore').createWeeklyPlanStore({owner:other,storage,account}));
  original.setItem('weekly-planner',JSON.stringify({Monday:{Dinner:'old-owner-only'}}));
  await bridge.flushWeeklyPageWrites();
  assert.equal(context.getSnapshot().plan.planner.Monday.Dinner,null);
  assert.equal(accountWrites,0);
  assert([...values.keys()].some(key=>key.includes('guest:test-device')&&key.includes('pending-change')));
});

test('new store restores guest weeks and original legacy keys stay byte-for-byte intact',async()=>{
  const {bridge,context,storage,values,load}=await setup();
  values.set('weekly-planner','legacy meals');values.set('shopping-data','legacy shopping');
  let page=bridge.useWeeklyPageStorage();
  page.setItem('weekly-planner',JSON.stringify({Monday:{Dinner:'saved-meal'},mealPeople:{Monday:{Dinner:1}}}));
  page.setItem('shopping-data',JSON.stringify({people:4,checkedItems:['Rice'],manualRecipes:['manual-item'],custom:'retain'}));
  await bridge.flushWeeklyPageWrites();
  const owner=context.getSnapshot().owner;
  await context.setOwner(owner,load('./weeklyPlanStore').createWeeklyPlanStore({owner,storage}));
  const plan=context.getSnapshot().plan;
  assert.equal(plan.planner.Monday.Dinner,'saved-meal');
  assert.equal(bridge.projectShopping(plan).plannerCounts['saved-meal'],1);
  assert.equal(plan.householdPeople,4);assert.equal(plan.shopping.checkedItems[0],'Rice');
  assert.equal(plan.shopping.legacy.manualRecipes[0],'manual-item');
  assert.equal(plan.shopping.legacy.custom,'retain');
  await context.select(next);page=bridge.useWeeklyPageStorage();
  assert(!Object.values(context.getSnapshot().plan.planner).some(day=>Object.values(day).some(Boolean)));
  assert.equal(values.get('weekly-planner'),'legacy meals');assert.equal(values.get('shopping-data'),'legacy shopping');
});

test('explicit guest import works after visiting an empty week without replacing the original',async()=>{
  const {context,load,storage,values}=await setup(),owner=context.getSnapshot().owner;
  const original=JSON.stringify({Monday:{Dinner:'legacy-dinner'},mealPeople:{Monday:{Dinner:2}}});
  values.set('weekly-planner',original);
  load('./weeklyPlanStore').stageLegacyGuestImport(storage,{owner,weekStart:week,planner:JSON.parse(original),shopping:{people:4,checkedItems:['Milk']}});
  await context.setOwner(owner,load('./weeklyPlanStore').createWeeklyPlanStore({owner,storage}));
  assert.equal(context.getSnapshot().plan.planner.Monday.Dinner,'legacy-dinner');
  assert.equal(context.getSnapshot().plan.mealPeople.Monday.Dinner,2);
  assert.equal(context.getSnapshot().plan.householdPeople,4);
  assert.equal(values.get('weekly-planner'),original);
});

test('week arithmetic crosses month, year and both London daylight-saving boundaries',()=>{
  const {shiftWeek}=fixture().load('./weeklyPlans');
  for(const [from,to] of [['2026-01-26','2026-02-02'],['2026-12-28','2027-01-04'],['2026-03-23','2026-03-30'],['2026-10-19','2026-10-26']]){
    assert.equal(shiftWeek(from,1),to);assert.equal(shiftWeek(to,-1),from);
  }
  assert.throws(()=>shiftWeek(week,1.5));
});

test('week navigation is not reset by an effect and importing is never an automatic page gate',()=>{
  const text=fs.readFileSync(new URL('../components/calendar/DatedPlannerBoundary.tsx',import.meta.url),'utf8');
  const tree=ts.createSourceFile('boundary.tsx',text,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
  function visit(node){
    if(ts.isCallExpression(node)&&node.expression.getText(tree)==='useEffect')
      assert(!node.getText(tree).includes('context.select(currentMonday())'));
    ts.forEachChild(node,visit);
  }visit(tree);
  assert(!text.includes('if (legacy &&'));
  assert(text.includes('if (!input) return null;'));
  assert(text.includes('hasPreviousMeals(source.planner)'));
  assert(text.includes('Your previous meal plan'));
  assert(text.includes('onToggle='));
});

test('previous-plan discovery requires actual meals, ignoring empty storage and metadata',()=>{
 const text=fs.readFileSync(new URL('../components/calendar/DatedPlannerBoundary.tsx',import.meta.url),'utf8');
 const tree=ts.createSourceFile('boundary.tsx',text,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
 const fn=tree.statements.find(n=>ts.isFunctionDeclaration(n)&&n.name?.text==='hasPreviousMeals');
 const js=ts.transpileModule(fn.getText(tree),{compilerOptions:{target:ts.ScriptTarget.ES2020}}).outputText;
 const check=new Function(js+'; return hasPreviousMeals;')();
 for(const value of [null,{}, {Monday:{Breakfast:null}}, {mealPeople:{Monday:{Breakfast:2}}}, {Monday:{Breakfast:' '}}]) assert.equal(check(value),false);
 assert.equal(check({Monday:{Dinner:'existing-recipe-id'}}),true);
});
