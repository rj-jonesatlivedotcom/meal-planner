import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {catalogue,evaluate,read} from './recipeCorrectionTestSupport.mjs';

const review=JSON.parse(read('data/recipeCookingReview.json'));
const previous=['breakfasts','lunches','dinners'].flatMap(c=>evaluate(execFileSync('git',['show',`${review.baselineCommit}:data/RecipeData/${c}.ts`],{encoding:'utf8',maxBuffer:1e7}))[c]);
const plain=x=>JSON.parse(JSON.stringify(x));
const sha=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
const by=c=>catalogue.find(r=>r.code===c);
const method=c=>by(c).method.join(' ');

test('all 310 recipes retain quantities, nutrition, images, categories and unrelated data',()=>{
 assert.equal(catalogue.length,310);
 assert.equal(new Set(catalogue.map(r=>r.id)).size,310);
 assert.equal(review.changedRecipeCount,review.recipes.length);
 const protectedPart=r=>Object.fromEntries(Object.entries(r).filter(([k])=>!review.allowedRecipeFields.includes(k)));
 for(const r of catalogue){
  const before=previous.find(x=>x.id===r.id),record=review.recipes.find(x=>x.id===r.id);
  assert.deepEqual(plain(protectedPart(r)),plain(protectedPart(before)),r.code);
  if(!record){assert.deepEqual(plain(r),plain(before),r.code);continue;}
  assert.equal(sha(protectedPart(r)),record.protectedFieldsSha256,r.code);
  assert.deepEqual(review.allowedRecipeFields.filter(k=>JSON.stringify(r[k])!==JSON.stringify(before[k])),record.changedFields,r.code);
  for(const key of record.changedFields){assert.deepEqual(plain(r[key]),record.after[key]);assert.deepEqual(plain(before[key]),record.before[key]);}
  assert.equal(r.ingredients.length,before.ingredients.length);
  r.ingredients.forEach((i,n)=>{
   const old=before.ingredients[n];assert.equal(i.item,old.item);assert.equal(i.shoppingItem,old.shoppingItem);
   if(i.quantity!==old.quantity){assert.ok(['L050','L051'].includes(r.code));assert.equal(i.quantity.split(' (')[0],old.quantity.split(' (')[0]);}
  });
 }
});

test('raw poultry is cooked before assembling ready-to-eat wraps and toasties',()=>{
 const poultry=catalogue.filter(r=>r.ingredients.some(i=>/chicken|turkey/i.test(i.item)&&!/^eggs?[, ]/i.test(i.item)));
 for(const r of poultry)assert.match(r.method.join(' '),/75|cooked through|thoroughly cooked|safely cooked|completely cooked/,r.code);
 for(const code of ['L009','L012','L034','L038']){
  const r=by(code),cooking=r.method.findIndex(s=>/75°C.*30 seconds/.test(s)),assembly=r.method.findIndex(s=>/add the cooked chicken/i.test(s));
  assert.ok(cooking>=0&&assembly>cooking,code+' cooking must precede assembly');
  assert.match(r.equipment,/Frying pan/i);assert.match(r.equipment,/thermometer/i);
 }
 assert.ok(by('L029').method.findIndex(s=>/eggs.*saucepan/i.test(s))<by('L029').method.findIndex(s=>/chopped cooked egg/.test(s)));
});

test('corrected water allocations use the full listed amounts',()=>{
 for(const [code,firstPattern,lastPattern]of [
  ['L076',/(\d+) g of the measured water/,/remaining (\d+) g water/],
  ['L096',/(\d+) g of the measured water/,/remaining (\d+) g water/],
  ['L098',/(\d+) g of the water/,/remaining (\d+) g water/],
 ]){
  const text=method(code),listed=parseFloat(by(code).ingredients.find(i=>i.item==='Drinking tap water').quantity);
  assert.equal(+text.match(firstPattern)[1]+ +text.match(lastPattern)[1],listed,code);
 }
});

test('batch cooking fits the displayed time including a preparation allowance',()=>{
 for(const [code,rest,batches,perSide]of [['B052',10,3,5],['L112',10,3,4]]){
  assert.ok(parseFloat(by(code).cookingTime)>=rest+batches*perSide*2+5,code);
  assert.match(method(code),/warm plate/);
 }
 for(const code of ['L088','L118'])assert.match(method(code),/without crowding.*one batch/);
 assert.ok(parseFloat(by('D083').cookingTime)>=8+3+3+30+10+5+10);
 assert.ok(parseFloat(by('D120').cookingTime)>=15+15+22+8);
 assert.ok(parseFloat(by('D125').cookingTime)>=15+5+30+10);
 for(const code of ['D120','D125'])assert.match(by(code).method[0],/^Heat the oven/);
 for(const code of ['L049','L053'])assert.match(method(code),/While the chicken marinates/);
 for(const code of ['L083','L120','D078','D086','D092','D112','D118','D120','D124','D125'])assert.match(method(code),/while|during|as soon as/i,code);
});

test('cold mixtures, slaw, pastry and mixed rice have coherent instructions',()=>{
 assert.doesNotMatch(method('B048'),/reduce the heat|pan as it thickens/);
 assert.doesNotMatch(method('L065'),/colander|cooking water/);
 for(const code of ['D081','D084']){assert.doesNotMatch(method(code),/above the water|pan does not boil dry/);assert.doesNotMatch(by(code).equipment,/Steamer/);}
 for(const code of ['B060','L116','L120','D118','D120']){
  const rice=by(code).method.find(s=>s.includes('Add the white rice'));
  assert.ok(rice.indexOf('Check both types')>rice.indexOf('Add the white rice'),code);
 }
 for(const code of ['L087','L110','L111','L113','L117','D061','D097','D111','D122'])assert.match(by(code).equipment,/Saucepan/,code);
 for(const code of ['D001','D002','D003','D004','D005','L047'])assert.match(by(code).method[0],/cooked edible weight/);
});

test('all 310 Dietary Guide texts and references are unchanged and current fingerprints resolve',()=>{
 const guides=JSON.parse(read('data/dietaryGuides.json'));
 const old=JSON.parse(execFileSync('git',['show',`${review.baselineCommit}:data/dietaryGuides.json`],{encoding:'utf8',maxBuffer:1e7}));
 const functions=evaluate(read('lib/dietaryGuides.ts'),{require:()=>({default:guides})});
 const refreshed=[];
 for(const r of catalogue){
  const {fingerprint,...content}=guides[r.id],{fingerprint:prior,...oldContent}=old[r.id];
  assert.deepEqual(content,oldContent,r.code);
  assert.equal(fingerprint,functions.dietaryGuideFingerprint(r),r.code);
  assert.equal(functions.getDietaryGuide(r),guides[r.id].text,r.code);
  if(fingerprint!==prior)refreshed.push(r.code);
 }
 assert.deepEqual(refreshed,review.guideFingerprintsRefreshed);
});
