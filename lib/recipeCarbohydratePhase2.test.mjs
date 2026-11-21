import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import ts from 'typescript';
import React from 'react';
import * as jsxRuntime from 'react/jsx-runtime';
import {renderToStaticMarkup} from 'react-dom/server';
import {catalogue,evaluate,read,nutritionHarness,restoreRecipeBeforeCarbohydrateReconciliation} from './recipeCorrectionTestSupport.mjs';
const directory='data/RecipeData/evidence/phase-2-carbohydrate-2026-11-20';
const evidence=JSON.parse(read(directory+'/carbohydrate-reconciliation.json'));
const plain=x=>JSON.parse(JSON.stringify(x));
const byCode=code=>catalogue.find(r=>r.code===code);
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
const token=x=>x==='Tr'?0:x===null||x==='N'||x===''?null:Number(x);
const rounded=x=>(Math.round((x+1e-9)*10)/10).toFixed(1)+' g';

test('Phase 2 source records preserve definitions, missing components and same-food USDA subtraction',()=>{
 for(const [id,s]of Object.entries(evidence.sources)){
  if(id.startsWith('USDA-SR28:')){
   const c=s.raw['205'],f=s.raw['291'];
   assert.equal(c.rawRecord[0],f.rawRecord[0],id);assert.equal(c.rawRecord[0],s.foodCode);
   assert.equal(c.rawRecord[1],'205');assert.equal(f.rawRecord[1],'291');
   assert.equal(c.value,Number(c.rawRecord[2]));assert.equal(f.value,Number(f.rawRecord[2]));
   assert.ok(Math.abs(s.valuePer100-(c.value-f.value))<1e-10,id);assert.equal(s.status,'conditional');
   continue;
  }
  if(!id.startsWith('CoFID:')){
   assert.match(s.method,/Published/);assert.match(s.references[0].basis,/fresh weight/);
   const p=s.parts;assert.ok(Math.abs(s.valuePer100-((p.totalCarbohydrate[0]-p.dietaryFibre[0])+(p.totalCarbohydrate[1]-p.dietaryFibre[1]))/2)<1e-9);continue;
  }
  const p=Object.fromEntries(Object.entries(s.raw).map(([k,v])=>[k,token(v)]));
  assert.notEqual(p.L,null,id+' missing total cannot become zero');
  assert.ok(!s.formula?.includes('Z'),id+' CoFID fibre must not be subtracted');
  if(s.status==='unavailable'){
   assert.ok(p.P>p.L/2);assert.equal(s.valuePer100,null);assert.match(s.conditions.join(' '),/chain/);continue;
  }
  let expected;
  if(p.L===0)expected=0;
  else if(p.O===null){expected=p.L/1.05;assert.equal(s.status,'conditional');}
  else if(['R','S','T','U','V','W'].some(k=>p[k]===null)){
   expected=p.O/1.1+(p.L-p.O)/1.05;assert.match(s.conditions.join(' '),/incomplete/);assert.equal(s.status,'conditional');
  }else{
   const mono=p.R+p.S+p.T,di=p.U+p.V+p.W,rest=p.L-p.O-mono-di;
   expected=rest>=-1e-8?p.O/1.1+mono+di/1.05+Math.max(0,rest)/1.05:p.O/1.1+(p.L-p.O)*(mono+di/1.05)/(mono+di);
   if(rest< -1e-8)assert.equal(s.status,'conditional');
  }
  assert.ok(Math.abs(expected-s.valuePer100)<1e-9,id);
 }
 assert.equal(evidence.sources['CoFID:17-063'].valuePer100,100,'sucrose is not divided by a meal-level factor');
 assert.ok(evidence.sources['CoFID:11-857'].valuePer100<77,'dry rice uses its starch-specific conversion');
 assert.equal(evidence.sources['CoFID:14-386'].valuePer100,null,'predominantly uncharacterised avocado oligosaccharides are held');
});

test('all 317 carbohydrate totals and current ingredient quantities agree with complete or held evidence',()=>{
 assert.equal(evidence.recipes.length,317);assert.equal(new Set(evidence.recipes.map(r=>r.code)).size,317);
 assert.equal(evidence.recipes.filter(r=>r.changed&&r.status!=='unavailable').length,158);
 assert.equal(evidence.recipes.filter(r=>!r.changed).length,159);
 assert.equal(evidence.recipes.filter(r=>r.status==='conditional').length,310);
 assert.equal(evidence.recipes.filter(r=>r.status==='complete').length,7);
 const held=[];
 assert.deepEqual(evidence.recipes.filter(r=>r.status==='unavailable').map(r=>r.code),held);
 for(const r of evidence.recipes){
  const recipe=byCode(r.code);assert.equal(recipe.servings,1,r.code);
  assert.equal(recipe.nutrition.carbohydrates,r.after.carbohydrates);assert.equal(recipe.carbohydrateEvidenceNote,r.after.carbohydrateEvidenceNote);
  assert.equal(recipe.ingredients.length,r.ingredients.length);let total=0;
  for(const i of r.ingredients){
   const actual=recipe.ingredients[i.line-1],s=evidence.sources[i.sourceId];
   assert.equal(actual.item,i.ingredient);assert.equal(actual.quantity,i.recipeQuantity);assert.equal(i.valuePer100,s.valuePer100);
   if(i.valuePer100===null){assert.equal(i.contributionG,null);assert.equal(r.coverage,'incomplete');continue;}
   assert.ok(Number.isFinite(i.quantity)&&i.quantity>0);const c=i.quantity*i.valuePer100/100;
   assert.ok(Math.abs(c-i.contributionG)<1e-9);total+=c;
  }
  assert.ok(Math.abs(total-r.knownSubtotalG)<1e-8);
  if(r.status==='unavailable'){
   assert.equal(recipe.nutrition.carbohydrates,'?');assert.ok(recipe.nutritionIncomplete.includes('carbohydrates'));
   assert.ok(r.unresolvedIngredients.some(x=>/avocado/i.test(x)));assert.equal(r.unroundedCompleteG,null);
  }else assert.equal(recipe.nutrition.carbohydrates,rounded(total),r.code);
 }
});

test('all other nutrients, Phase 1 fibre, food, portions, methods and guidance match the pinned pre-Phase-2 commit',()=>{
 assert.equal(evidence.baselineCommit,'98dd532f14f12538ffc47fb31666f4924fe18571');
 let checked=0;
 for(const name of ['breakfasts','lunches','dinners','rangeAdditions']){
  const path=`data/RecipeData/${name}.ts`,source=execFileSync('git',['show',`${evidence.baselineCommit}:${path}`],{encoding:'utf8',maxBuffer:1e7});
  for(const array of Object.values(evaluate(source)).filter(Array.isArray))for(const before of array){
   assert.deepEqual(plain(restoreRecipeBeforeCarbohydrateReconciliation(byCode(before.code))),plain(before),before.code);checked++;
  }
 }
 assert.equal(checked,317);
 for(const path of ['data/dietaryGuides.json','data/dietaryGuideInstallation.json'].filter(p=>fs.existsSync(new URL('../'+p,import.meta.url)))){
  assert.equal(read(path).replaceAll('\r\n','\n'),execFileSync('git',['show',`${evidence.baselineCommit}:${path}`],{encoding:'utf8',maxBuffer:1e7}).replaceAll('\r\n','\n'));
 }
 for(const mutate of [r=>r.nutrition.carbohydrates='99 g',r=>r.nutrition.fibre='99 g',r=>r.nutrition.calories='999 kcal',r=>r.ingredients[0].quantity='999 g',r=>r.ingredients[0].item='Other',r=>r.servings=2,r=>r.method[0]='Other',r=>r.dietaryNote='Other',r=>r.nutrition.sodium='999 mg',r=>r.nutritionIncomplete.push('protein')]){
  const actual=plain(byCode('D046'));mutate(actual);
  assert.throws(()=>assert.deepEqual(plain(restoreRecipeBeforeCarbohydrateReconciliation(actual)),plain(restoreRecipeBeforeCarbohydrateReconciliation(byCode('D046')))));
 }
});

function plannerTotal(recipes){
 const source=read('app/planner/page.tsx'),ast=ts.createSourceFile('page.tsx',source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX),pieces=[];
 function visit(n){if(ts.isFunctionDeclaration(n)&&['getNutritionNumber','getDailyNutritionTotal'].includes(n.name?.text))pieces.push(n.getText(ast));else ts.forEachChild(n,visit);}
 visit(ast);assert.equal(pieces.length,2);
 return evaluate(pieces.join('\n')+'\nexports.total=getDailyNutritionTotal;',{
  mealTypes:['Breakfast','Lunch','Dinner'],getDayMealRecipes:()=>Object.fromEntries(recipes.map((r,i)=>[['Breakfast','Lunch','Dinner'][i],r])),
  snackAccount:{snacks:[]},getDateForPlannerDay:()=>new Date('2026-11-20'),snackSummary:()=>({carbohydrates:{value:0},calories:{value:0}}),
 }).total('Friday','carbohydrates');
}
test('Planner and Nutrition add corrected carbohydrate consistently and hold unavailable totals',()=>{
 const meals=['B012','L036','D046'].map(byCode),expected=meals.reduce((s,r)=>s+parseFloat(r.nutrition.carbohydrates),0);
 assert.equal(plannerTotal(meals),expected);
 assert.equal(nutritionHarness(meals).getDayTotals({Friday:{Breakfast:meals[0].id,Lunch:meals[1].id,Dinner:meals[2].id}},'Friday').carbohydrates,expected);
 const avocado=byCode('L101');assert.equal(plannerTotal([avocado]),2);
 assert.equal(nutritionHarness([avocado]).getMealTotals(avocado).carbohydrates,2);
 const unavailable={...avocado,nutritionIncomplete:[...avocado.nutritionIncomplete,'carbohydrates'],nutrition:{...avocado.nutrition,carbohydrates:'?'}};assert.equal(plannerTotal([unavailable]),null);
 assert.ok(Number.isNaN(nutritionHarness([unavailable]).getMealTotals(unavailable).carbohydrates));
 assert.ok(Number.isFinite(nutritionHarness([unavailable]).getMealTotals(unavailable).calories));
});

test('actual carbohydrate target comparison handles corrected values, boundaries and unavailable evidence',()=>{
 const energy=evaluate(read('lib/energyTarget.ts'));
 const targets=evaluate(read('lib/nutrientTargets.ts'),{require:name=>name==='./energyTarget'?energy:{isNutrientActive:()=>true}});
 const value=parseFloat(byCode('D046').nutrition.carbohydrates),req={carbohydrateMin:value,carbohydrateMax:value+10};
 assert.equal(targets.evaluateNutrientTarget(value,req,'carbohydrates'),'Within target');
 assert.equal(targets.evaluateNutrientTarget(value-1,req,'carbohydrates'),'Below target');
 assert.equal(targets.evaluateNutrientTarget(value+11,req,'carbohydrates'),'Exceeds target');
 assert.equal(targets.evaluateNutrientTarget(Number.NaN,req,'carbohydrates'),'pending');
 assert.equal(targets.evaluateNutrientTarget(value,req,'carbohydrates',true),'pending');
 assert.equal(targets.evaluateNutrientTarget(value+11,req,'carbohydrates',true),'Exceeds target');
});

test('recipe nutrition shows unavailable carbohydrate explicitly, while known figures remain estimated',()=>{
 const component=evaluate(read('components/RecipeNutrition.tsx'),{require:name=>name==='react/jsx-runtime'?jsxRuntime:name.endsWith('.css')?{default:{}}:{default:()=>null}}).default;
 const html=renderToStaticMarkup(React.createElement(component,{values:[['Carbohydrate','?'],['Fibre','2.6 g']],detailed:true,estimated:true,unavailableLabels:['Carbohydrate']}));
 assert.match(html,/Carbohydrate.*Unavailable.*—/);assert.match(html,/Fibre.*Estimated.*2.6 g/);
 assert.ok(read('app/recipes/[id]/page.tsx').includes('{recipe.carbohydrateEvidenceNote}'));
});

test('the dated Phase 2 snapshot binds its workbook, ledger and exact recipe content with cross-platform hashes',()=>{
 const snapshot=JSON.parse(read(directory+'/snapshot.json'));
 assert.equal(snapshot.baselineCommit,evidence.baselineCommit);
 assert.deepEqual(snapshot.counts,{reviewed:317,numericCorrections:158,unchanged:159,newlyUnavailable:0,completeCoverage:317,completeConversionEstimates:7,conditionalEstimates:310,conditionallyResolvedAvocadoRecipes:8});
 if(snapshot.recipeDataCommit)assert.match(snapshot.recipeDataCommit,/^[0-9a-f]{40}$/);
 assert.equal(snapshot.hashConvention,'Text: UTF-8, CRLF normalised to LF; SHA256 and bytes cover normalised bytes. XLSX: exact stored bytes.');
 for(const file of snapshot.evidenceFiles){
  const bytes=fs.readFileSync(new URL('../'+directory+'/'+file.path,import.meta.url)),normalised=file.path.endsWith('.xlsx')?bytes:Buffer.from(bytes.toString('utf8').replaceAll('\r\n','\n'));
  assert.equal(hash(normalised),file.sha256,file.path);assert.equal(normalised.length,file.bytes,file.path);
 }
 for(const file of snapshot.recipeFiles){
  const text=(snapshot.recipeDataCommit?execFileSync('git',['show',`${snapshot.recipeDataCommit}:${file.path}`],{encoding:'utf8',maxBuffer:1e7}):read(file.path)).replaceAll('\r\n','\n');assert.equal(hash(text),file.sha256Lf,file.path);
  const blob=execFileSync('git',['hash-object','--path',file.path,'--stdin'],{input:text,encoding:'utf8'}).trim();assert.equal(blob,file.gitBlob,file.path);
  if(snapshot.recipeDataCommit){
   const committed=execFileSync('git',['show',`${snapshot.recipeDataCommit}:${file.path}`],{encoding:'utf8',maxBuffer:1e7}).replaceAll('\r\n','\n');
   assert.equal(hash(committed),file.sha256Lf,file.path+' at pinned recipe-data commit');
   assert.equal(execFileSync('git',['rev-parse',`${snapshot.recipeDataCommit}:${file.path}`],{encoding:'utf8'}).trim(),file.gitBlob,file.path+' committed blob');
  }
 }
 for(const file of snapshot.preservedPhase1Files){
  const normalise=b=>file.path.endsWith('.xlsx')?b:Buffer.from(b.toString('utf8').replaceAll('\r\n','\n'));
  const bytes=normalise(fs.readFileSync(new URL('../'+file.path,import.meta.url)));
  const pinned=normalise(execFileSync('git',['show',`${evidence.baselineCommit}:${file.path}`],{maxBuffer:1e7}));
  assert.equal(hash(bytes),file.sha256,file.path);assert.equal(hash(bytes),hash(pinned),file.path+' unchanged from Phase 1 release');
 }
});
