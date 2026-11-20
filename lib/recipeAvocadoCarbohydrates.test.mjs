import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {catalogue,read,nutritionHarness} from './recipeCorrectionTestSupport.mjs';
const directory='data/RecipeData/evidence/phase-2-carbohydrate-2026-11-20/';
const evidence=JSON.parse(read(directory+'carbohydrate-reconciliation.json'));
const review=JSON.parse(read(directory+'avocado-substitution-review.json'));
const stable=x=>Array.isArray(x)?x.map(stable):x&&typeof x==='object'?Object.fromEntries(Object.keys(x).sort().map(k=>[k,stable(x[k])])):x;
const plain=x=>JSON.parse(JSON.stringify(x));
const hash=x=>createHash('sha256').update(JSON.stringify(stable(x))).digest('hex');
const expected={L094:[30,'43.4 g'],L101:[40,'2.0 g'],L102:[60,'2.9 g'],L123:[70,'54.1 g'],D088:[45,'46.5 g'],D097:[35,'59.4 g'],D098:[45,'44.1 g'],D104:[60,'5.7 g']};

test('avocado carbohydrate proxy retains the original CoFID gap and correctly matched USDA source definitions',()=>{
 const s=evidence.sources['USDA-SR28:09037'];assert.equal(s.valuePer100,1.83);assert.equal(s.status,'conditional');
 assert.equal(s.raw['205'].rawRecord[0],'09037');assert.equal(s.raw['291'].rawRecord[0],'09037');
 assert.equal(Number(s.raw['205'].rawRecord[2]),8.53);assert.equal(Number(s.raw['291'].rawRecord[2]),6.7);
 assert.ok(Math.abs(8.53-6.7-s.valuePer100)<1e-12);
 assert.equal(s.sr27Corroboration.pdfPageOneBased,140);assert.equal(s.sr27Corroboration.carbohydrateByDifferenceG,8.53);assert.equal(s.sr27Corroboration.totalDietaryFibreG,6.7);
 assert.equal(s.foodDescription.rawRecord[7],'Seed and skin');assert.equal(s.foodDescription.rawRecord[8],'26');
 assert.match(s.conditions.join(' '),/not directly measured|not directly/);assert.match(s.conditions.join(' '),/Hass/);assert.match(s.conditions.join(' '),/not apply.*26%/);
 assert.deepEqual(s.scopeRecipeCodes,Object.keys(expected));
 assert.deepEqual(evidence.sources['CoFID:14-386'],review.retainedCoFIDSource);
 assert.equal(review.retainedCoFIDSource.status,'unavailable');assert.equal(review.retainedCoFIDSource.raw.P,1.4);
 assert.equal(review.retainedCoFIDSource.valuePer100,null,'USDA does not silently replace the retained CoFID source');
});

test('only eight avocado carbohydrate fields change; all other Phase 1/2 records, sources and recipe content are preserved',()=>{
 const codes=new Set(Object.keys(expected));assert.equal(review.recipes.length,8);
 assert.equal(hash(evidence.recipes.filter(r=>!codes.has(r.code))),review.unchangedLedgerRecipesSha256);
 assert.equal(hash(Object.fromEntries(Object.entries(evidence.sources).filter(([key])=>key!=='USDA-SR28:09037'))),review.unchangedSourceRecordsSha256);
 assert.equal(hash(catalogue.filter(r=>!codes.has(r.code))),review.unchangedCatalogueSha256);
 for(const r of review.recipes){
  const current=catalogue.find(x=>x.code===r.code),[grams,total]=expected[r.code],record=evidence.recipes.find(x=>x.code===r.code);
  const fields=plain(current);delete fields.nutrition;delete fields.nutritionIncomplete;delete fields.carbohydrateEvidenceNote;
  assert.deepEqual(fields,r.unchangedRecipeFields,r.code);
  const nutrients=plain(current.nutrition);delete nutrients.carbohydrates;assert.deepEqual(nutrients,r.unchangedNutrition,r.code);
  assert.equal(current.nutrition.carbohydrates,total);assert.ok(!current.nutritionIncomplete.includes('carbohydrates'));assert.match(current.carbohydrateEvidenceNote,/conditional/);
  assert.equal(r.before.status,'unavailable');assert.equal(r.before.after.carbohydrates,'?');assert.deepEqual(record,r.after);
  const line=record.ingredients.find(i=>i.sourceId==='USDA-SR28:09037');assert.equal(line.quantity,grams);assert.equal(line.originalSourceId,'CoFID:14-386');assert.match(line.recipeQuantity,/raw edible/);
  assert.ok(Math.abs(line.contributionG-grams*1.83/100)<1e-12,'edible grams used directly without a second refuse adjustment');
  assert.ok(Math.abs(record.knownSubtotalG-r.before.knownSubtotalG-line.contributionG)<1e-10);
  assert.equal(record.status,'conditional');assert.equal(record.coverage,'complete');assert.deepEqual(record.unresolvedIngredients,[]);
  assert.equal(nutritionHarness([current]).getMealTotals(current).carbohydrates,parseFloat(total));
 }
 assert.deepEqual(evidence.recipes.flatMap(r=>r.ingredients.filter(i=>i.sourceId==='USDA-SR28:09037').map(()=>r.code)),Object.keys(expected),'substitution is not generalised to other foods or recipes');
});
