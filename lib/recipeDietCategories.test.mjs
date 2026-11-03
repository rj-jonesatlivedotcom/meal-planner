import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {catalogue,evaluate,read} from './recipeCorrectionTestSupport.mjs';
const audit=JSON.parse(read('data/recipeDietCategoryReview.json'));
const before=['breakfasts','lunches','dinners'].flatMap(n=>evaluate(execFileSync('git',['show',audit.baselineCommit+':data/RecipeData/'+n+'.ts'],{encoding:'utf8',maxBuffer:10*1024*1024}))[n]);
const plain=x=>JSON.parse(JSON.stringify(x));
const hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
const category=evaluate(read('lib/recipeDiets.ts'));
const number=(r,f)=>r.nutritionIncomplete?.includes(f)?NaN:parseFloat(r.nutrition[f]);
const byCode=code=>catalogue.find(r=>r.code===code);

test('all 200 older recipes have recorded category decisions, with every other field and the existing 110 preserved',()=>{
 assert.equal(audit.recipes.length,200);assert.equal(catalogue.length,310);
 for(const r of catalogue){const previous=before.find(x=>x.code===r.code);if(previous.dietCategories?.length){assert.deepEqual(plain(r),plain(previous),r.code);continue;}const {primaryDietCategory,dietCategories,...protectedFields}=r;assert.deepEqual(plain(protectedFields),plain(previous),r.code);const record=audit.recipes.find(x=>x.code===r.code);assert.equal(hash(protectedFields),record.protectedFieldsSha256);assert.deepEqual(plain(dietCategories),record.dietCategories);assert.equal(primaryDietCategory,record.primaryDietCategory);assert.ok(dietCategories.includes(primaryDietCategory));}
});

test('the whole catalogue has no uncategorised records and all filter totals agree with the review',()=>{
 for(const r of catalogue)assert.ok(r.dietCategories?.length,r.code);
 assert.equal(catalogue.filter(r=>category.matchesDietFilter(r,'Not categorised')).length,0);
 assert.ok(category.DIET_TYPES.includes('Mixed diet'));assert.ok(!category.DIET_TYPES.includes('Not categorised'));
 for(const [label,count]of Object.entries(audit.fullCatalogueCounts))assert.equal(catalogue.filter(r=>category.matchesDietFilter(r,label)).length,count,label);
 assert.deepEqual(audit.fullCatalogueCounts,{Vegetarian:129,'Mixed diet':131,Keto:24,'Atkins Phase 1':16,'Low FODMAP':15,Vegan:33,'DASH-style':19,'Mediterranean-style':39,Carnivore:9,'Intermittent fasting — eating-window meal':66});
 assert.equal(category.matchesDietSearch(byCode('L001'),'mixed diet'),true);
});

test('keto and Atkins remain distinct, and parsley, mushrooms and processed ham are handled explicitly',()=>{
 for(const code of ['B041','B042','B043','B044']){assert.ok(byCode(code).dietCategories.includes('Keto'));assert.ok(byCode(code).dietCategories.includes('Atkins Phase 1'));assert.ok(!byCode(code).dietCategories.includes('Carnivore'));}
 assert.ok(byCode('L031').dietCategories.includes('Atkins Phase 1'));assert.ok(!byCode('L031').dietCategories.includes('Keto'));
 for(const code of ['B041','B042'])assert.ok(byCode(code).dietCategories.includes('Low FODMAP'));
 for(const code of ['B043','B044','L031'])assert.ok(!byCode(code).dietCategories.includes('Low FODMAP'));
 for(const record of audit.recipes.filter(r=>r.assessments.keto.assigned)){const r=byCode(record.code);assert.ok(number(r,'carbohydrates')<=10);assert.ok(number(r,'fat')*9/number(r,'calories')>=.60);}
});

test('older vegetarian records exclude meat and fish; cheese conditions and missing-value exclusions remain explicit',()=>{
 for(const record of audit.recipes.filter(r=>r.assessments.vegetarian.assigned))for(const i of byCode(record.code).ingredients)assert.doesNotMatch(i.item,/\b(?:chicken|turkey|duck|beef|pork|lamb|bacon|ham|salmon|cod|hake|haddock|tuna|fish|prawn|shrimp|parmesan)\b/i,record.code+' '+i.item);
 assert.ok(audit.recipes.find(r=>r.code==='B042').assessments.vegetarian.requiresVegetarianRennet.includes('Cheddar cheese'));
 for(const code of audit.twoMealContext.excludedUnknownRecipes){const record=audit.recipes.find(r=>r.code===code);if(record){assert.equal(record.assessments.intermittentFasting.assigned,false,code);assert.ok(!record.dietCategories.includes('DASH-style'),code);}}
});

test('Mediterranean assignments use a conservative saturated-fat bound cross-checked to retained CoFID cells',()=>{
 const row=JSON.parse(read('data/RecipeData/evidence/balanced-110/records.json'))['CoFID:17-038:1.3 Proximates'];
 assert.equal(row.rawRow.K,audit.oliveOilReference.reportedFatGPer100G);assert.equal(row.rawRow.AB,audit.oliveOilReference.reportedSaturatedFatGPer100G);
 for(const record of audit.recipes.filter(r=>r.assessments.mediterranean.assigned)){
  const r=byCode(record.code),s=record.saturatedFatEvidence;assert.ok(record.produceEvidence.knownEdibleGramsLowerBound>=80);assert.ok(r.ingredients.some(i=>/^(Olive oil|Oil, olive)$/i.test(i.item)));assert.ok(!r.ingredients.some(i=>/\b(beef|pork|lamb|ham|bacon|butter|cream|coconut|palm)\b/i.test(i.item)));
  const knownFat=s.knownOliveInputs.reduce((n,i)=>n+i.quantityG*(Number(row.rawRow.K)-.05)/100,0),knownSat=s.knownOliveInputs.reduce((n,i)=>n+i.quantityG*(Number(row.rawRow.AB)+.005)/100,0);
  const maximum=knownSat+s.reportedFat.upper-knownFat;assert.ok(Math.abs(maximum-s.saturatedFatUpperG)<1e-10);assert.ok(maximum*9/s.reportedEnergy.lower<=.10);assert.ok(s.reportedFat.upper>=knownFat);
 }
});

test('every eating-window tag has a complete six-nutrient two-meal example within its recorded reference targets',()=>{
 let checked=0;for(const record of audit.recipes){const contexts=record.assessments.intermittentFasting;if(!contexts.assigned)continue;const r=byCode(record.code);assert.ok(number(r,'calories')>=600);for(const example of contexts.scenarioExamples){const other=byCode(example.partnerCode);assert.notEqual(r.category,other.category);const target=audit.twoMealContext.scenarios.find(s=>s.name===example.scenario).targets;
  for(const f of audit.twoMealContext.fields){const sum=number(r,f)+number(other,f)+audit.twoMealContext.bookkeepingReserve[f];assert.ok(Number.isFinite(sum));assert.ok(Math.abs(sum-example.totalsIncludingReserve[f])<1e-9);if(target[f].min!=null)assert.ok(sum>=target[f].min);if(target[f].max!=null)assert.ok(sum<=target[f].max);}checked++;}}
 assert.ok(checked>=35);
});
