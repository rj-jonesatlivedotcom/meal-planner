import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {catalogue,evaluate,read,nutritionHarness,restoreRecipeBeforeSodiumRoundingCorrection,restoreRecipeBeforePhotoFileCleanup} from './recipeCorrectionTestSupport.mjs';
const correction=JSON.parse(read('data/RecipeData/evidence/sodium-rounding-2026-11-21.json'));
const plain=x=>JSON.parse(JSON.stringify(x));
test('Breakfast 059 rounds its decimal source sum to 187 mg sodium without changing salt',()=>{
 const r=catalogue.find(r=>r.code===correction.code),sum=correction.ingredients.reduce((s,i)=>s+i.grams*i.sodiumMgPer100g/100,0);
 const recorded=JSON.parse(read(correction.sourceEvidence)).find(r=>r.code===correction.code);
 for(const [i,row]of correction.ingredients.entries()){
  assert.equal(row.food,recorded.ingredients[i].ingredient);
  assert.equal(row.grams,recorded.ingredients[i].quantityG);
  assert.equal(row.sodiumMgPer100g,recorded.ingredients[i].nutrients.sodium.value);
  assert.ok(Math.abs(row.contributionMg-row.grams*row.sodiumMgPer100g/100)<1e-10);
 }
 assert.equal(Number(sum.toFixed(8)),186.5);
 assert.equal(Math.round(Number(sum.toFixed(8)))+' mg',r.nutrition.sodium);
 assert.equal(r.nutrition.sodium,'187 mg');assert.equal(r.nutrition.salt,'0.47 g');
 assert.equal(nutritionHarness([r]).getMealTotals(r).sodium,187);
 assert.equal((Number(sum.toFixed(8))*0.0025).toFixed(2)+' g',r.nutrition.salt);
});
test('the authorised sodium correction is the only recipe-data change from its recorded baseline',()=>{
 let count=0;
 for(const file of ['breakfasts','lunches','dinners','rangeAdditions']){
  const source=execFileSync('git',['show',correction.baselineCommit+':data/RecipeData/'+file+'.ts'],{encoding:'utf8',maxBuffer:1e7});
  for(const list of Object.values(evaluate(source)).filter(Array.isArray))for(const before of list){
   const current=catalogue.find(r=>r.code===before.code);
   assert.deepEqual(plain(restoreRecipeBeforeSodiumRoundingCorrection(restoreRecipeBeforePhotoFileCleanup(current))),plain(before),before.code);count++;
  }
 }
 assert.equal(count,317);
 const r=plain(catalogue.find(r=>r.code==='B059'));r.nutrition.sodium='188 mg';
 assert.throws(()=>restoreRecipeBeforeSodiumRoundingCorrection(r));
});
