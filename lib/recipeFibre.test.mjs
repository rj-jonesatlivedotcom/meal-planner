import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {catalogue,evaluate,read,nutritionHarness} from './recipeCorrectionTestSupport.mjs';

const review=JSON.parse(read('data/RecipeData/evidence/fibre-reconciliation.json'));
const plain=x=>JSON.parse(JSON.stringify(x));
const byCode=code=>catalogue.find(r=>r.code===code);
const expected={D046:'2.6 g',D035:'5.9 g',B012:'3.2 g',L036:'2.7 g',B041:'0.1 g',B042:'0.1 g',B044:'0.1 g',B034:'5.5 g'};

test('the dated fibre snapshot preserves both workbooks and the exact reconciliation and recipe-data version',()=>{
 const directory='data/RecipeData/evidence/phase-1-fibre-2026-11-20';
 const snapshot=JSON.parse(read(directory+'/snapshot.json'));
 const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
 assert.equal(snapshot.prePhase1Commit,review.baselineCommit);
 assert.equal(snapshot.evidenceFileHashConvention,'JSON: UTF-8 with CRLF normalised to LF; sha256 and bytes cover the normalised bytes. XLSX: exact stored bytes.');
 assert.deepEqual(snapshot.counts,{reviewed:150,completeEstimates:147,numericCorrections:114,formatOnly:1,completeUnchanged:32,unavailable:3});
 for(const file of snapshot.evidenceFiles){
  const stored=fs.readFileSync(new URL('../'+directory+'/'+file.file,import.meta.url));
  const bytes=file.file.endsWith('.json')?Buffer.from(stored.toString('utf8').replaceAll('\r\n','\n')):stored;
  assert.equal(hash(bytes),file.sha256,file.file);
  assert.equal(bytes.length,file.bytes,file.file);
 }
 assert.equal(snapshot.evidenceFiles.find(f=>f.file==='RenalPlan_Recipe_Verification_Pre_Phase1.xlsx').sha256,review.sourceFiles.verificationWorkbook.sha256);
 assert.equal(read(directory+'/fibre-reconciliation.json').replaceAll('\r\n','\n'),read('data/RecipeData/evidence/fibre-reconciliation.json').replaceAll('\r\n','\n'));
 if(snapshot.recipeDataCommit)assert.match(snapshot.recipeDataCommit,/^[0-9a-f]{40}$/);
 for(const file of snapshot.recipeFiles){
  const source=snapshot.recipeDataCommit?execFileSync('git',['show',`${snapshot.recipeDataCommit}:${file.path}`],{encoding:'utf8',maxBuffer:1e7}):read(file.path);
  assert.equal(hash(source.replaceAll('\r\n','\n')),file.sha256Lf,file.path);
  if(snapshot.recipeDataCommit)assert.equal(execFileSync('git',['rev-parse',`${snapshot.recipeDataCommit}:${file.path}`],{encoding:'utf8'}).trim(),file.gitBlob,file.path);
 }
});

test('all original-150 fibre totals reconcile from cited quantities and compatible sources, with missing totals held',()=>{
 assert.equal(review.recipes.length,150);
 assert.equal(review.recipes.filter(r=>r.status==='complete').length,147);
 assert.deepEqual(review.recipes.filter(r=>r.status==='incomplete').map(r=>r.code),['B006','B022','B032']);
 for(const record of review.recipes){
  const recipe=byCode(record.code);
  assert.equal(recipe.nutrition.fibre,record.after.fibre,record.code);
  assert.deepEqual(plain(recipe.nutritionIncomplete),record.after.nutritionIncomplete,record.code);
  assert.equal(record.ingredients.length,recipe.ingredients.length,record.code);
  let total=0;
  for(const ingredient of record.ingredients){
   const source=review.sources[ingredient.sourceId];
   assert.equal(ingredient.valuePer100g,source.valuePer100g);
   assert.equal(ingredient.ingredient,recipe.ingredients[ingredient.line-1].item);
   assert.equal(ingredient.recipeQuantity,recipe.ingredients[ingredient.line-1].quantity);
   assert.equal(source.dataset==='CoFID 2021' ? source.basis.startsWith('AOAC') : source.nutrientId==='291',true);
   if(source.valuePer100g===null){assert.equal(record.status,'incomplete');continue;}
   assert.ok(Number.isFinite(source.valuePer100g)&&source.valuePer100g>=0);
   if(source.dataset==='USDA SR28')assert.equal(Number(source.rawRecord[2]),source.valuePer100g);
   else assert.equal(source.raw==='Tr'?0:Number(source.raw),source.valuePer100g);
   const value=ingredient.grams*source.valuePer100g/100;
   assert.ok(Math.abs(value-ingredient.contributionG)<1e-9);
   total+=value;
  }
  assert.ok(Math.abs(total-record.knownSubtotalG)<1e-8);
  if(record.status==='complete')assert.equal(recipe.nutrition.fibre,`${(Math.round((total+1e-9)*10)/10).toFixed(1)} g`,record.code);
  else {assert.equal(recipe.nutrition.fibre,'?');assert.ok(recipe.nutritionIncomplete.includes('fibre'));assert.ok(recipe.fibreEvidenceNote.includes('jam'));}
 }
 for(const [code,value]of Object.entries(expected))assert.equal(byCode(code).nutrition.fibre,value,code);
});

test('fibre-only reconciliation preserves every other nutrient, recipe specification and newer recipe against the baseline commit',()=>{
 for(const category of ['breakfasts','lunches','dinners']){
  const source=execFileSync('git',['show',`${review.baselineCommit}:data/RecipeData/${category}.ts`],{encoding:'utf8',maxBuffer:1e7});
  for(const before of evaluate(source)[category]){
   const current=byCode(before.code),record=review.recipes.find(r=>r.code===before.code);
   if(!record){assert.deepEqual(plain(current),plain(before),before.code);continue;}
   assert.equal(record.before.fibre,before.nutrition.fibre);
   assert.deepEqual(record.before.nutritionIncomplete,plain(before.nutritionIncomplete));
   const restored=plain(current);
   restored.nutrition.fibre=before.nutrition.fibre;
   for(const key of ['nutritionIncomplete','nutritionSourceNote','fibreEvidenceNote']){
    if(Object.hasOwn(before,key))restored[key]=plain(before[key]);else delete restored[key];
   }
   assert.deepEqual(restored,plain(before),before.code+' unrelated content is unchanged');
   if(before.nutritionSourceNote)assert.ok(current.nutritionSourceNote.startsWith(before.nutritionSourceNote));
  }
 }
});

test('corrected fibre reaches meal and day totals; unresolved jam never becomes zero or a partial complete total',()=>{
 const h=nutritionHarness(catalogue);
 for(const [code,value]of Object.entries(expected))assert.equal(h.getMealTotals(byCode(code)).fibre,Number.parseFloat(value));
 const day=h.getDayTotals({Monday:{Breakfast:byCode('B012').id,Lunch:byCode('L036').id,Dinner:byCode('D046').id}},'Monday');
 assert.ok(Math.abs(day.fibre-8.5)<1e-9);
 for(const code of ['B006','B022','B032']){
  assert.ok(Number.isNaN(h.getMealTotals(byCode(code)).fibre));
  const total=h.getDayTotals({Monday:{Breakfast:byCode(code).id,Lunch:byCode('L036').id,Dinner:byCode('D046').id}},'Monday');
  assert.ok(Number.isNaN(total.fibre));
  assert.ok(Number.isFinite(total.calories));
 }
});
