import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {catalogueBeforeFinalEditorial as catalogue,catalogue as currentCatalogue,evaluate,read,nutritionResolution as audit,nutritionHarness,shoppingHarness} from './recipeCorrectionTestSupport.mjs';
const plain=x=>JSON.parse(JSON.stringify(x));
const before=['breakfasts','lunches','dinners'].flatMap(n=>evaluate(execFileSync('git',['show',audit.baselineCommit+':data/RecipeData/'+n+'.ts'],{encoding:'utf8',maxBuffer:12*1024*1024}))[n]);
const record=c=>audit.recipes.find(r=>r.code===c);

test('only the six authorised recipes change, with their exact baseline and completed result retained',()=>{
 assert.equal(audit.recipes.length,6);assert.equal(catalogue.length,310);
 for(const r of catalogue){const old=before.find(x=>x.code===r.code),a=record(r.code);
  if(!a){assert.deepEqual(plain(r),plain(old),r.code);continue;}
  assert.deepEqual(a.before,plain(old),r.code+' audit baseline');assert.deepEqual(a.after,plain(r));
  const allowed=['nutrition','nutritionIncomplete','nutritionSourceNote',...(r.code==='D069'?['ingredients','method','description','calories']:['D071','D073'].includes(r.code)?['calories','protein']:[]),...(r.code==='D071'?['method']:[])];
  for(const key of Object.keys(r))if(!allowed.includes(key))assert.deepEqual(plain(r[key]),plain(old[key]),r.code+' '+key);
  assert.deepEqual(plain(r.nutritionIncomplete),[]);assert.equal(r.servings,1);
  if(r.code!=='D069')for(const [key,value]of Object.entries(old.nutrition))if(!old.nutritionIncomplete.includes(key))assert.equal(r.nutrition[key],value,r.code+' already complete '+key);
 }
 for(const r of catalogue)for(const value of Object.values(r.nutrition))assert.ok(Number.isFinite(parseFloat(value)),r.code+' '+value);
});

test('every completed nutrient reconciles from measured one-person inputs and unrounded ingredient contributions',()=>{
 for(const a of audit.recipes){const r=catalogue.find(r=>r.code===a.code);assert.equal(a.lines.length,r.ingredients.length);
  for(const [i,line]of a.lines.entries()){assert.equal(line.ingredient,r.ingredients[i].item);const match=r.ingredients[i].quantity.match(/^(\d+(?:\.\d+)?) (g|ml)\b/);assert.equal(+match[1],line.quantity);assert.equal(match[2],line.unit);
   for(const [key,n]of Object.entries(line.nutrients)){assert.ok(n.sourceReference);assert.ok(n.raw!==null&&n.raw!==undefined);assert.ok(Number.isFinite(n.valuePer100)&&n.valuePer100>=0);assert.equal(n.unit,line.unit);assert.ok(Math.abs(n.contribution-line.quantity*n.valuePer100/100)<1e-10,a.code+' '+key);}
  }
  for(const key of Object.keys(a.unroundedTotals)){const total=key==='salt'?a.unroundedTotals.sodium*.0025:a.lines.reduce((s,l)=>s+l.nutrients[key].contribution,0);assert.ok(Math.abs(total-a.unroundedTotals[key])<1e-8);if(a.code==='D069'||a.before.nutritionIncomplete.includes(key)){const digits=key==='salt'?2:['calories','sodium','potassium','phosphate'].includes(key)?0:1;assert.equal(parseFloat(r.nutrition[key]),+total.toFixed(digits),a.code+' '+key);}}
 }
});

test('fresh-weight S5 values stay distinct from dry-weight figures and fibre is not counted twice in galangal energy',()=>{
 const expected={protein:.84,fat:.075,fibre:3.745,sodium:6.82,potassium:135.16,phosphate:25.33,calories:19.265};
 for(const a of audit.recipes)for(const line of a.lines){if(line.ingredient==='Fresh galangal')for(const [key,value]of Object.entries(expected)){assert.ok(Math.abs(line.nutrients[key].valuePer100-value)<1e-10);assert.equal(line.unit,'g');assert.match(line.nutrients[key].sourceReference.basis,/fresh weight/);}
  if(/lemongrass/.test(line.ingredient)){assert.equal(line.nutrients.fibre.valuePer100,9.17);assert.equal(line.nutrients.fibre.sourceReference.pages,'15');}
 }
});

test('the authorised mirin replacement uses actual CoFID sugar/vinegar cells, with no density or absent-value assumptions',()=>{
 const a=record('D069'),r=a.after,rows=JSON.parse(read('data/RecipeData/evidence/balanced-110/records.json'));
 assert.ok(!r.ingredients.some(i=>/mirin/i.test(i.item)));assert.equal(r.ingredients[2].quantity,'3.5 g (teriyaki; as sold, weighed grams)');assert.equal(r.ingredients[3].quantity,'23 g (teriyaki; dry)');assert.equal(r.ingredients[4].quantity,'19.5 g (teriyaki; weighed recipe water)');
 for(const line of [a.lines[2],a.lines[3]])for(const [key,n]of Object.entries(line.nutrients)){if(key==='carbohydrates')continue;const ref=n.sourceReference,row=rows[`CoFID:${ref.foodCode}:${ref.sheet}`];assert.ok(row,ref.foodCode);const column=ref.cell.match(/^[A-Z]+/)[0],raw=row.rawRow[column];assert.equal(String(raw),String(n.raw));assert.equal(n.valuePer100,raw==='Tr'?0:+raw);}
 assert.equal(r.nutrition.carbohydrates,'121.1 g');assert.doesNotMatch(r.method.join(' '),/mirin|unreported|per 100 ml/i);
 const shop=shoppingHarness(),one=shop.run([r],{[r.id]:1}).list,four=shop.run([r],{[r.id]:4}).list;assert.ok(!one.some(i=>/mirin/i.test(i.item)));assert.ok(one.some(i=>/sugar/i.test(i.item)&&/23 g/.test(i.quantity)));assert.ok(four.some(i=>/sugar/i.test(i.item)&&/92 g/.test(i.quantity)));
});

test('completed meals aggregate correctly while declared missing nutrients still remain unavailable',()=>{
 const r=record('D071').after,h=nutritionHarness([r]);const d=h.getDayTotals({Monday:{Dinner:r.id}},'Monday');assert.equal(d.potassium,2122);assert.equal(d.calories,1175);
 assert.doesNotMatch(r.method.join(' '),/missing composition evidence/);
 const missing={...r,nutritionIncomplete:['potassium']};assert.ok(Number.isNaN(nutritionHarness([missing]).getDayTotals({Monday:{Dinner:r.id}},'Monday').potassium));
 const guides=JSON.parse(read('data/dietaryGuides.json')),functions=evaluate(read('lib/dietaryGuides.ts'),{require:()=>({default:guides})});
 for(const a of audit.recipes){const current=currentCatalogue.find(r=>r.id===a.after.id);assert.equal(guides[current.id].fingerprint,functions.dietaryGuideFingerprint(current));assert.doesNotMatch(functions.getDietaryGuide(current),/information.*incomplete|mirin/i);assert.ok(Array.isArray(functions.getDietaryGuideReferences(current)));}
});
