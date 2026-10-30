import test from 'node:test';
import assert from 'node:assert/strict';
import ts from 'typescript';
import {catalogue,evaluate,read,nutritionHarness,shoppingHarness} from './recipeCorrectionTestSupport.mjs';
const energy=evaluate(read('lib/energyTarget.ts')),diet=evaluate(read('lib/myDiet.ts'));
const target=evaluate(read('lib/nutrientTargets.ts'),{require:name=>name==='./energyTarget'?energy:diet});
const fields=['calories','protein','carbohydrates','fat','fibre','sodium','potassium','phosphate'];
const complete={id:'complete',servings:2,nutrition:Object.fromEntries(fields.map(f=>[f,'100']))};
const n=nutritionHarness([complete]);
test('unknown meal values propagate as unavailable, never zero, while genuine zero stays numeric',()=>{
 for(const field of fields){for(const missing of ['?','—','',undefined]){
  const r={...complete,nutrition:{...complete.nutrition,[field]:missing}};
  assert.ok(Number.isNaN(n.getMealTotals(r)[field]),field+' '+missing);
 }const r={...complete,nutrition:{...complete.nutrition,[field]:'0'}};assert.equal(n.getMealTotals(r)[field],0);}
});
test('declared incomplete subtotals remain unavailable in meal/day/week arithmetic',()=>{
 for(const field of fields){const r={...complete,id:'incomplete',nutritionIncomplete:[field]};
  const h=nutritionHarness([complete,r]);
  const day=h.getDayTotals({Monday:{Breakfast:'complete',Lunch:r.id,Dinner:null}},'Monday');
  assert.ok(Number.isNaN(day[field]),field);assert.ok(Number.isNaN((day[field]+100)/7));
  for(const other of fields.filter(f=>f!==field))assert.equal(day[other],200);
 }
});
test('unavailable daily/weekly nutrients never produce a successful target assessment',()=>{
 const req={...diet.defaultRequirements,sodiumLimit:1500,proteinMaxG:100,potassiumLimitMg:2000,phosphateLimitMg:1000,carbohydrateMax:250,nutrientTargetSettings:{energyMinKcal:1600,energyMaxKcal:2200}};
 for(const field of ['calories','protein','carbohydrates','sodium','potassium','phosphate','fluid'])for(const value of [NaN,Infinity,null])assert.equal(target.evaluateNutrientTarget(value,req,field),'pending');
 assert.equal(target.evaluateNutrientTarget(0,req,'sodium'),'green');
 assert.equal(target.evaluateNutrientTarget(1600,req,'sodium',true),'red');
});
test('requirement matching rejects unknown nutrients and Pending review classifications when constrained',()=>{
 const {recipeMatchesRequirements:matches,defaultRequirements:req}=evaluate(read('lib/recipeRequirements.ts'));
 const r=catalogue.find(r=>r.code==='L049');
 assert.equal(matches({...r,nutrition:{...r.nutrition,sodium:'?'}},req),false);
 assert.equal(matches({...r,nutritionIncomplete:['sodium']},req),false);
 assert.equal(matches(r,{...req,sodiumLimit:null,potassium:'Low'}),false);
 assert.equal(matches(r,{...req,sodiumLimit:null,carbohydrateMax:200}),false);
});
test('all 50 one-serving additions generate correct shopping quantities for one and four people',()=>{
 const shop=shoppingHarness(),added=catalogue.filter(r=>Number(r.code.slice(1))>({B:50,L:48,D:52}[r.code[0]]??Infinity));
 assert.equal(added.length,50);
 for(const r of added){assert.equal(r.servings,1);const half=shop.run([r],{[r.id]:1}),double=shop.run([r],{[r.id]:4});assert.ok(half.list.length,r.code);assert.equal(half.list.length,double.list.length,r.code);assert.ok(half.list.every(i=>i.item&&i.quantity));}
 const r=added[0],one={...r,ingredients:[r.ingredients[0]]};
 assert.match(shop.run([one],{[r.id]:1}).list[0].quantity,/120 g/);
 assert.match(shop.run([one],{[r.id]:4}).list[0].quantity,/480 g/);
});
test('both views propagate missing recipe fluid and format unavailable values as a dash',()=>{
 for(const file of ['app/planner/page.tsx','app/nutrition/page.tsx']){
  const source=read(file),ast=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);const pieces={};
  function visit(node){if(ts.isFunctionDeclaration(node)&&['plannedMealFluidForDay','formatFluid'].includes(node.name?.text))pieces[node.name.text]=node.getText(ast);ts.forEachChild(node,visit);}visit(ast);
  const r=catalogue.find(r=>r.code==='L049');const getRecipe=()=>r;
  const h=evaluate(Object.values(pieces).join('\n')+'\nexports.total=plannedMealFluidForDay;exports.format=formatFluid;',{getRecipe,mealTypes:['Lunch'],plannerMeals:{Monday:{Lunch:r.id}},mealPeople:{Monday:{Lunch:1}},getHouseholdPeople:()=>1});
  assert.ok(Number.isNaN(h.total('Monday')),file);assert.equal(h.format(h.total('Monday')),'—');
 }
});
