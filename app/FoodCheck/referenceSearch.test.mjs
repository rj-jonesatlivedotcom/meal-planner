import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";
import { createRequire } from "node:module";
const require=createRequire(import.meta.url), root=new URL("../../",import.meta.url), cache=new Map();
const read=p=>fs.readFileSync(new URL(p,root),"utf8");
const compile=s=>ts.transpileModule(s,{compilerOptions:{module:1,target:7,jsx:4}}).outputText;
function load(file,overrides={}) {
  const exports={}; vm.runInNewContext(compile(read(file)),{exports,Response,Request,URL,AbortSignal,...overrides.__globals,require:name=>{
    if(name in overrides)return overrides[name];if(name==='server-only')return{};
    if(name.startsWith('@/')||name.startsWith('.')) {let path=name.startsWith('@/')?name.slice(2):new URL(name,new URL(file,root)).pathname.slice(root.pathname.length);if(!/\.[jt]sx?$/.test(path))path+=fs.existsSync(new URL(path+'.ts',root))?'.ts':'.tsx';if(!cache.has(path))cache.set(path,load(path));return cache.get(path);}return require(name);
  }});return exports;
}
const matching=load('app/FoodCheck/referenceMatching.ts'), search=load('app/FoodCheck/referenceSearch.server.ts'), minerals=load('app/FoodCheck/curatedMinerals.ts'), categories=load('app/FoodCheck/categoryMinerals.ts'), portions=load('app/FoodCheck/barcodePortions.ts'), snapshots=load('lib/foodSnacks.ts');
const profile=(energy,protein,fat,carbs)=>({'energy-kcal_100g':energy,proteins_100g:protein,fat_100g:fat,carbohydrates_100g:carbs});
// OFF product fields and CoFID candidate rows read on 19 October 2026.
const products={
 '20203269':{product_name:'Cornets à Glace',categories_tags:['en:ice-creams','en:ice-cream-cones'],ingredients_text:'wheat flour, sugar, wheat starch, emulsifier: soya lecithins, coconut fat, raising agent: magnesium carbonates, salt, whole milk powder',serving_size:'12.5g',serving_quantity:12.5,serving_quantity_unit:'g',nutriments:profile(402,7.3,3.9,83)},
 '4088600148588':{product_name:'Milk Chocolate Digestives',quantity:'300g',categories_tags:['en:chocolate-covered-biscuits'],ingredients_text:'wheat flour, milk chocolate (30%), sugar, palm oil, wholemeal wheat flour, raising agents: sodium carbonates, ammonium carbonates',serving_size:'17g',serving_quantity:17,serving_quantity_unit:'g',nutriments:profile(496,6.7,23.4,62.8)},
 '4088600107936':{product_name:'Wacko',serving_size:'21.0g',serving_quantity:21,serving_quantity_unit:'g',nutriments:profile(508,6.5,25.9,60.6)},
 '4061463055286':{product_name:'Digestives',nutriments:profile(446.67,8,19,63.33)},
 '5000157062772':{product_name:'BIG SOUP CHICKEN & VEGETABLE',quantity:'400g',categories_tags:['en:canned-soups'],ingredients_text:'Water, carrots, potatoes, chicken, peas, wheat flour',nutriments:{...profile(50,3.1,.7,7.4),phosphorus_100g:0,iron_100g:0,zinc_100g:0,magnesium_100g:0}},
 '4088600475851':{product_name:'Chunky chopped tomatoes',quantity:'400g',categories_tags:['en:canned-tomatoes'],ingredients_text:'citric acid',nutriments:profile(22,1.1,.1,3.8)},
 '5000328376677':{product_name:'Walkers Ready Salted Crisps 6pk',quantity:'150g',categories_tags:['en:potato-crisps'],ingredients_text:'Potatoes, sunflower and rapeseed oil, salt',nutriments:profile(500,8.3,27,56)},
};
const rows=[
 ['11-800','Wafers, plain ice cream wafers, not filled',368,10.5,3,79.7,195,129],
 ['12-582','Ice cream with wafers, non-dairy, vanilla',199,2.9,7.5,31.7,179,71],
 ['11-799','Biscuits, digestive, plain',463,6.2,21.3,65.6,215,119],
 ['11-807','Biscuits, digestive, half coated in chocolate',488,6.3,25.7,61.8,258,124],
 ['11-809','Biscuits, fully coated with chocolate',506,6.4,27.2,62.8,344,204],
 ['11-812','Chocolate covered wafer biscuit',509,5.5,28.6,61.1,340,151],
 ['17-648','Chocolate, milk',519,7.3,31.1,56,451,224],
 ['13-530','Tomatoes, canned, whole contents',19,1.1,.1,3.8,212,17],
 ['17-671','Potato crisps, fried in sunflower oil',493,6.2,28.8,55.8,1328,135],
].map(([food_code,food_name,energy_kcal,protein_g,fat_g,carbohydrate_g,potassium_mg,phosphorus_mg])=>({food_code,food_name,energy_kcal,protein_g,fat_g,carbohydrate_g,potassium_mg,phosphorus_mg}));
const soup={fdcId:171546,description:'Soup, chicken and vegetable, canned, ready-to-serve',dataset:'SR Legacy',unit:'g',preparation:'prepared',completeProductUnclear:false,potassiumMg:133,phosphorusMg:35,macros:{energyKcal:33,protein:1.97,fat:.73,carbohydrate:4.68},url:'https://fdc.nal.usda.gov/food-details/171546/nutrients'};
// Additional reference rows verified with read-only CoFID SELECT and USDA
// generic searches on 19 October 2026. Product descriptions below are deliberately
// generic/unseen, not claims about a particular branded pack or barcode.
rows.push(...[
 ['11-788','Porridge oats, unfortified',381,10.9,8.1,70.7,372,387],
 ['11-789','Porridge oats, unfortified, cooked, made up with semi-skimmed milk',84,4.6,2.3,12.1,202,145],
 ['11-745','Breakfast cereal, cornflakes, unfortified',378,7.1,.8,91.4,93,53],
 ['16-424','Sardines, canned in brine, drained',170,22.1,9.1,0,287,545],
 ['16-439','Sardines, canned in sunflower oil, drained',220,23.3,14.1,0,410,520],
 ['16-422','Sardines, canned in tomato sauce, whole contents',175,18.5,10.8,.9,371,417],
 ['13-565','Carrots, young, canned in water, re-heated, drained',20,.5,.3,4.2,110,14],
 ['14-188','Peaches, canned in juice, whole contents',39,.6,null,9.7,170,19],
 ['14-189','Peaches, canned in syrup, whole contents',55,.5,null,14,110,11],
].map(([food_code,food_name,energy_kcal,protein_g,fat_g,carbohydrate_g,potassium_mg,phosphorus_mg])=>({food_code,food_name,energy_kcal,protein_g,fat_g,carbohydrate_g,potassium_mg,phosphorus_mg})));
const genericUsda=[
 [169340,'Carrots, canned, no salt added, solids and liquids',23,.59,.14,5.36,158,20],
 [170512,'Peas and carrots, canned, no salt added, solids and liquids',38,2.17,.27,8.48,100,46],
 [169930,'Peaches, canned, juice pack, solids and liquids',44,.63,.03,11.6,128,17],
 [169936,'Pears, canned, juice pack, solids and liquids',50,.34,.07,12.9,96,12],
].map(([fdcId,description,energyKcal,protein,fat,carbohydrate,potassiumMg,phosphorusMg])=>({fdcId,description,macros:{energyKcal,protein,fat,carbohydrate},potassiumMg,phosphorusMg,dataset:'SR Legacy',unit:'g',preparation:'unspecified',completeProductUnclear:false,url:`https://fdc.nal.usda.gov/food-details/${fdcId}/nutrients`}));
function service(extra={}) {const calls=[];const resolve=search.createReferenceSearch({cofid:async term=>{calls.push(['cofid',term]);return rows.filter(r=>r.food_name.toLowerCase().includes(term.toLowerCase()));},usda:async query=>{calls.push(['usda',query]);return{status:'ok',data:/soup/.test(query)?[soup]:[]};},...extra});return{resolve,calls};}
async function result(code,svc=service()) {const p=products[code],flags=categories.questionableMineralZeros(p);const current=await minerals.resolveCuratedMinerals(code,{potassium:null,phosphorus:p.nutriments.phosphorus_100g===0?0:null},async()=>null,{basis:'as-sold',questionableZero:{phosphorus:!!flags.phosphorus}});const resolved=await categories.resolveCategoryMinerals(code,p,current,async()=>null,{basis:'as-sold',unit:'g',searchReferences:svc.resolve});return{p,resolved,portion:portions.barcodePortion(code,p),svc};}

const examples = [
 ['Marlow rolled porridge oats','1kg','40g',[381,10.9,8.1,70.7],{},'11-788',40,149,155],
 ['Unfortified corn flakes','750g','30g',[378,7.1,.8,91.4],{},'11-745',30,28,16],
 ['Sardines in brine, drained','125g','60g',[170,22.1,9.1,0],{},'16-424',60,172,327],
 ['Sliced carrots in water','400g','200g',[23,.59,.14,5.36],{},'169340',200,316,40],
 ['Pêches en conserve in fruit juice','410g','125g',[39,.6,.1,9.7],{},'14-188',125,213,24],
 ['Larkspur pear slices in juice','410g','100g',[50,.34,.07,12.9],{},'169936',100,96,12],
 ['Milk chocolate','200g','25g',[519,7.3,31.1,56],{},'17-648',25,113,56],
];
if(!process.env.RENALPLAN_UI_PREVIEW) {
for (const [name,quantity,serving,macros,extra,expected,grams,k,p] of examples) test('unseen food identity, state, live-shaped searches and serving: '+name,async()=>{
 const product={product_name:name,quantity,serving_size:serving,nutriments:profile(...macros),...extra};
 const calls=[];const resolve=search.createReferenceSearch({cofid:async term=>{calls.push(['CoFID',term]);return rows.filter(r=>r.food_name.toLowerCase().includes(term));},usda:async query=>{calls.push(['USDA',query]);return{status:'ok',data:genericUsda};}});
 const portion=portions.barcodePortion('never-mapped',product),r=await resolve(product,portion.basis,portion.unit);
 assert.ok(calls.some(c=>c[0]==='CoFID')&&calls.some(c=>c[0]==='USDA'));assert.equal(r.matches.potassium?.code,expected);assert.equal(r.matches.phosphorus?.code,expected);assert.equal(portion.amount,grams);
 assert.equal(Math.round(r.matches.potassium.potassiumMg*grams/100),k);assert.equal(Math.round(r.matches.phosphorus.phosphorusMg*grams/100),p);
 console.log(JSON.stringify({food:name,identity:r.classification,basis:portion.basis,searches:r.searches,reference:expected,source:r.matches.potassium.source,grams,K:k,P:p}));
});
test('unknown or incompatible can contents abstain; broader queries do not relax preparation',async()=>{
 const svc=service({usda:async()=>({status:'ok',data:genericUsda})});
 for(const name of ['Sardines in brine','Sardines in oil','Carrots in water, drained']){
  const r=await svc.resolve({product_name:name,nutriments:profile(170,22,9,0)},'as-sold','g');assert.equal(Object.keys(r.matches).length,0);assert.ok(r.searches.length);assert.match(r.reasons.potassium,/identity|basis/);
 }
 const peaches={product_name:'Peach slices in juice',nutriments:profile(55,.5,.1,14)};const id=matching.identifyFood(peaches);
 const syrup=rows.find(r=>r.food_code==='14-189');assert.equal(matching.rankReferences(peaches,id,[{source:'CoFID 2021',code:syrup.food_code,description:syrup.food_name,macros:{energyKcal:55,protein:.5,fat:.1,carbohydrate:14},potassiumMg:110,phosphorusMg:11}],'as-sold').length,0);
});
test('bulk, missing/contradictory servings and dry/prepared/drained quantities stay consistent',()=>{
 const oats={product_name:'Rolled oats',quantity:'1kg',nutriments:profile(381,10.9,8.1,70.7)};
 const fallback=portions.barcodePortion('unseen',oats);assert.equal(fallback.amount,100);assert.equal(fallback.basis,'dry');assert.equal(fallback.wholePack.amount,1000);assert.match(fallback.label,/Grams entry/);
 assert.equal(portions.barcodePortion('unseen',{...oats,serving_size:'Prepared portion (250g)'}).amount,100);
 assert.equal(portions.barcodePortion('unseen',{...oats,serving_size:'40g',serving_quantity:50,serving_quantity_unit:'g'}).amount,100);
 assert.equal(portions.barcodePortion('unseen',{...oats,serving_quantity:40,serving_quantity_unit:'g'}).amount,40);
 assert.equal(portions.barcodePortion('unseen',{...oats,serving_size:'40g dry oats'}).amount,40);
 assert.equal(portions.barcodePortion('unseen',{product_name:'Milk chocolate',quantity:'200g',serving_size:'25g'}).naturalUnit.unit,'servings');
 const drained=portions.barcodePortion('unseen',{product_name:'Carrots in water, drained',quantity:'400g (drained 240g)',serving_size:'120g'});assert.equal(drained.amount,120);assert.equal(drained.wholePack.amount,240);assert.match(drained.referenceLabel,/drained/);
 const unknown=portions.barcodePortion('unseen',{product_name:'Sardines in brine, drained',quantity:'125g'});assert.equal(unknown.amount,null);
 const actual=portions.barcodePortion('unseen',{...oats,serving_size:'40g'});const nutrient={value:372,kind:'estimated'};const values=Object.fromEntries(snapshots.snackNutrients.map(k=>[k,nutrient]));const snap={version:1,unit:'g',basis:'dry',source:'CoFID',reference:values,nutrients:values,naturalUnit:actual.naturalUnit};const saved=snapshots.snapshotForEntry(snap,{amount:3,unit:'servings'});assert.equal(saved.quantity,120);assert.equal(saved.snapshot.nutrients.potassium.value,446.4);assert.equal(saved.snapshot.basis,'dry');
});
test('preparation and identity beat even identical macros; questionable zeros retain the raw source',async()=>{
 const product={product_name:'Porridge oats',nutriments:profile(381,10.9,8.1,70.7)};const identity=matching.identifyFood(product);
 const fake={source:'CoFID 2021',code:'wrong-state',description:'Porridge oats, cooked with milk',macros:matching.productMacros(product),potassiumMg:202,phosphorusMg:145};assert.equal(matching.rankReferences(product,identity,[fake],'dry').length,0);
 const carrots={product_name:'Carrots in water',nutriments:{...profile(23,.59,.14,5.36),potassium_100g:0,phosphorus_100g:0,calcium_100g:0}};
 const flags=categories.questionableMineralZeros(carrots);assert.ok(flags.potassium&&flags.phosphorus);
 const raw=await minerals.resolveCuratedMinerals('unseen',{potassium:0,phosphorus:0},async()=>null,{basis:'as-sold',questionableZero:{potassium:true,phosphorus:true}});
 const resolved=await categories.resolveCategoryMinerals('unseen',carrots,raw,async()=>null,{basis:'as-sold',unit:'g',searchReferences:search.createReferenceSearch({cofid:async()=>rows,usda:async()=>({status:'ok',data:genericUsda})})});
 assert.equal(resolved.potassium.sourceValueMg,0);assert.equal(resolved.potassium.sourceState,'questionable');assert.equal(resolved.potassium.valueMg,158);
 const zero=await minerals.resolveCuratedMinerals('unseen',{potassium:0,phosphorus:0},async()=>null,{basis:'as-sold'});assert.equal(zero.potassium.provenance,'reported');assert.equal(zero.potassium.valueMg,0);
});
for(const [code,foodCode,grams,k,p] of [['20203269','11-800',12.5,24,16],['4088600148588','11-807',17,44,21],['4088600107936','11-809',21,72,43]]) {
 test('runtime candidate searches and ranked comparison: '+code,async()=>{const r=await result(code);assert.ok(r.svc.calls.some(c=>c[0]==='cofid'));assert.ok(r.svc.calls.some(c=>c[0]==='usda'));assert.equal(r.resolved.potassium.estimate.references[0].foodCode,foodCode);assert.equal(r.resolved.phosphorus.estimate.references[0].foodCode,foodCode);assert.equal(r.portion.amount,grams);assert.equal(Math.round(r.resolved.potassium.valueMg*grams/100),k);assert.equal(Math.round(r.resolved.phosphorus.valueMg*grams/100),p);console.log(JSON.stringify({barcode:code,searches:r.svc.calls,reference:foodCode,K:k,P:p,grams}));});
}
test('cone rejects filled ice cream even with misleading matching macros',()=>{const id=matching.identifyFood(products['20203269']);assert.equal(id.family,'empty-cone');const candidate={source:'USDA',code:'filled',description:'Ice cream with wafers, non-dairy, vanilla',macros:matching.productMacros(products['20203269']),potassiumMg:999,phosphorusMg:999};assert.equal(matching.rankReferences(products['20203269'],id,[candidate],'as-sold').length,0);});
test('plain digestives, whole soup and tomato tin regressions remain useful',async()=>{for(const [code,k,p]of[['4061463055286',215,119],['5000157062772',133,35],['4088600475851',212,17]]){const r=await result(code);assert.equal(r.resolved.potassium.valueMg,k);assert.equal(r.resolved.phosphorus.valueMg,p);if(code==='5000157062772'){assert.equal(r.resolved.phosphorus.sourceState,'questionable');assert.equal(r.resolved.phosphorus.sourceValueMg,0);}}});
test('additional unmapped real product finds potato-crisp comparison and 25g bag',async()=>{const r=await result('5000328376677');assert.equal(r.portion.amount,25);assert.equal(r.portion.naturalUnit.unit,'bags');assert.equal(r.resolved.potassium.valueMg,1328);assert.equal(Math.round(r.resolved.phosphorus.valueMg/4),34);assert.ok(r.svc.calls.length>=2);});
test('selection follows candidate data, not a preselected food code; K/P resolve independently',async()=>{const changed={...rows[0],food_code:'new-live-row',potassium_mg:null,phosphorus_mg:130};const svc=service({cofid:async()=>[changed]});const r=await svc.resolve(products['20203269'],'as-sold','g');assert.equal(r.matches.potassium,undefined);assert.equal(r.matches.phosphorus.code,'new-live-row');assert.equal(r.matches.phosphorus.phosphorusMg,130);});
test('additives, major ingredients, preparation mismatches and missing profiles abstain',async()=>{const svc=service();const base=products['4088600148588'];const salts=await svc.resolve({...base,ingredients_text:base.ingredients_text+', potassium phosphate'},'as-sold','g');assert.equal(Object.keys(salts.matches).length,2);const nuts=await svc.resolve({...base,ingredients_text:'Peanuts, wheat flour, milk chocolate'},'as-sold','g');assert.equal(Object.keys(nuts.matches).length,0);const prepared=await svc.resolve(products['20203269'],'prepared','g');assert.equal(Object.keys(prepared.matches).length,0);assert.equal(Object.keys((await svc.resolve({product_name:'Wacko'},'as-sold','g')).matches).length,0);});
test('repeated comparisons share bounded cached searches; failures are not numerical zeros',async()=>{const svc=service();await svc.resolve(products['20203269'],'as-sold','g');const count=svc.calls.length;await svc.resolve(products['20203269'],'as-sold','g');assert.equal(svc.calls.length,count);const failed=service({cofid:async()=>{throw Error('offline');},usda:async()=>({status:'unavailable',data:null})});const r=await failed.resolve(products['20203269'],'as-sold','g');assert.equal(Object.keys(r.matches).length,0);assert.match(r.reasons.potassium,/unavailable/);});
test('natural units and display rounding preserve precise stored calculations',async()=>{const r=await result('4088600148588');const food={energyKcal:496,protein:6.7,carbohydrate:62.8,fat:23.4,fibre:null,sodium:0,potassium:null,phosphorus:null,minerals:r.resolved};const s=snapshots.foodSnapshot(food,'g','as-sold','CoFID comparison',r.portion.naturalUnit);const entered=snapshots.snapshotForEntry(s,{amount:2.999999999,unit:'biscuits'});assert.equal(snapshots.displayQuantity(entered.snapshot.entry.amount),3);assert.equal(entered.quantity,2.999999999*17);assert.equal(snapshots.snackSummary([{planned_on:'2026-10-19',snapshot:entered.snapshot}],'2026-10-19').potassium.estimated,true);assert.equal(snapshots.snapshotForEntry(s,{amount:0.5,unit:'g'}).quantity,.5);assert.equal(portions.barcodePortion('20203269',products['20203269']).naturalUnit.unit,'servings');});
test('signed-in route performs live-shaped food-name queries; signed-out requests cannot use cached results',async()=>{let user={id:'alice'},dbReads=0,usdaReads=0;const client={auth:{getUser:async()=>({data:{user},error:null})},from:table=>{assert.equal(table,'cofid_foods');return{select:()=>({ilike:(_,term)=>({order:()=>({range:async (from,to)=>{dbReads++;assert.equal(from,0);assert.equal(to,499);return{data:rows.filter(r=>r.food_name.toLowerCase().includes(term.slice(1,-1))),error:null};}})})})};}};
 const route=load('app/api/food-check/estimate/route.ts',{'@/lib/supabase/server':{createClient:async()=>client},'@/app/FoodCheck/usda.server':{usdaClient:{search:async()=>{usdaReads++;return{status:'ok',data:[]};}}}});const request=()=>new Request('https://example.test/api/food-check/estimate',{method:'POST',body:JSON.stringify({product:products['20203269'],basis:'as-sold',unit:'g'})});const response=await route.POST(request());assert.equal(response.status,200);assert.ok(dbReads>0&&usdaReads>0);assert.equal((await response.json()).matches.potassium.code,'11-800');user=null;assert.equal((await route.POST(request())).status,401);});
test('compact card and mobile total markup keep detail text out of the default layout',()=>{const React=require('react'),render=require('react-dom/server').renderToStaticMarkup;const Card=load('components/food/PlannerSnacks.tsx',{'@/lib/useFoodAccount':{notifyFoodAccount(){}}}).default;const values=Object.fromEntries(snapshots.snackNutrients.map(k=>[k,{value:k==='calories'?131.32:63.21,kind:['potassium','phosphate'].includes(k)?'estimated':'reported'}]));const s={id:'ui',name:'Biscuit bar',planned_on:'2026-10-19',quantity:21,snapshot:{version:1,unit:'g',basis:'as-sold',reference:values,nutrients:values,source:'Original source'}};const html=render(React.createElement(Card,{date:s.planned_on,snacks:[s],hideHeading:true,report:true}));assert.match(html,/131 kcal/);assert.doesNotMatch(html,/131\.32/);assert.match(html,/<summary[^>]*>View nutrition/);assert.ok(html.indexOf('Protein')>html.indexOf('View nutrition'));assert.doesNotMatch(html,/ESTIMATE|Original source|comparable food/);assert.match(html,/mg\*/);const page=read('app/nutrition/page.tsx');const part=page.slice(page.indexOf('nutrition-mobile-daily-total'),page.indexOf('{/* MOBILE FLUID INTAKE'));assert.match(part,/grid-cols-1/);assert.doesNotMatch(part,/grid-cols-2|break-words|shrink-0 whitespace-nowrap/);});
}


test('comparable references derive independent observed ranges and preserve upper planning values', async () => {
  const first=rows.find(r=>r.food_code==='11-799');
  // Synthetic nutrient variation verifies derivation; these are not new source data.
  const second={...first,food_code:'test-comparable',food_name:'Biscuits, digestive, plain, average',potassium_mg:240,phosphorus_mg:null};
  const svc=service({cofid:async()=>[first,second,first],usda:async()=>({status:'ok',data:[]})});
  const {resolved}=await result('4061463055286',svc);
  assert.equal(resolved.potassium.valueMg,240);assert.equal(resolved.potassium.rangeMg.lower,215);assert.equal(resolved.potassium.rangeMg.upper,240);
  assert.equal(resolved.potassium.estimate.references.length,2);assert.equal(resolved.phosphorus.valueMg,119);assert.equal(resolved.phosphorus.estimate.kind,'single');
  assert.match(resolved.potassium.estimate.explanation,/minimum and maximum.*not guaranteed bounds.*upper endpoint/);
  assert.match(minerals.mineralSourceExplanation(resolved),/test-comparable/);
  assert.equal(minerals.mineralSourceReferences(resolved).length,2);
  const base={energyKcal:460,protein:6,carbohydrate:65,fat:21,fibre:null,sodium:null,potassium:null,phosphorus:null,minerals:resolved};
  const snapshot=snapshots.foodSnapshot(base,'g','as-sold','CoFID');
  const scaled=snapshots.snapshotForQuantity(snapshot,30);
  assert.equal(scaled.nutrients.potassium.value,72);assert.equal(scaled.nutrients.potassium.rangeMg.lower,64.5);
  assert.equal(scaled.reference.potassium.rangeMg.upper,240);assert.equal(scaled.nutrients.potassium.kind,'estimated');
  assert.equal(snapshots.snapshotForQuantity(scaled,50).nutrients.potassium.value,120);
  assert.equal(snapshots.snackSummary([{planned_on:'2026-10-20',snapshot:scaled}]).potassium.value,72);
  assert.equal(snapshots.validFoodSnapshot(JSON.parse(JSON.stringify(scaled))),true);
  assert.equal(snapshots.foodSnapshot(base,'g','prepared','CoFID').reference.potassium.value,null);
  const portion=portions.portionNutrition(base,{amount:30,unit:'g',basis:'as-sold'});
  assert.equal(portion.minerals.potassium.rangeMg.upper,72);assert.match(minerals.singleMineralText(portion.minerals.potassium,String),/64.*72/);
});

test('CoFID remains preferred while credible USDA references contribute to the baseline range', async () => {
  const first=rows.find(r=>r.food_code==='11-799');
  const comparison={...soup,fdcId:999,description:'Cookies, digestive, plain',preparation:'unspecified',macros:{energyKcal:463,protein:6.2,fat:21.3,carbohydrate:65.6},potassiumMg:200,phosphorusMg:125};
  const svc=service({cofid:async()=>[first],usda:async()=>({status:'ok',data:[comparison,{...comparison,fdcId:998,dataset:'Branded',potassiumMg:9999}]})});
  const r=await svc.resolve(products['4061463055286'],'as-sold','g');
  assert.equal(r.matches.potassium.source,'CoFID 2021');assert.equal(r.comparables.potassium.length,2);
});

test('additives retain valid baseline values with independent identified uncertainty metadata', async () => {
  const product={...products['4061463055286'],ingredients_text:'Wheat flour, sugar, potassium phosphate (E340)'};
  const current=await minerals.resolveCuratedMinerals('unseen',{potassium:null,phosphorus:null},async()=>null,{basis:'as-sold'});
  const resolved=await categories.resolveCategoryMinerals('unseen',product,current,async()=>null,{basis:'as-sold',unit:'g',searchReferences:service().resolve});
  for(const key of ['potassium','phosphorus']) {
    assert.equal(resolved[key].provenance,'estimated');assert.match(resolved[key].additiveUncertainty,/potassium phosphate.*significantly higher.*not calculated or included/);
  }
  assert.equal(categories.additiveConcern({ingredients_text:'sodium phosphate'},'potassium'),null);
  assert.equal(categories.additiveConcern({ingredients_text:'potassium chloride'},'phosphorus'),null);
  assert.match(categories.additiveConcern({additives_tags:['en:e202']},'potassium'),/e202/);
  const snap=snapshots.foodSnapshot({potassium:null,phosphorus:null,minerals:resolved},'g','as-sold','test');
  assert.equal(snapshots.snapshotForQuantity(snap,40).nutrients.potassium.additiveUncertainty,resolved.potassium.additiveUncertainty);
  const page=read('app/FoodCheck/page.tsx');
  assert.ok(page.indexOf('role="alert" className="m-4 rounded-xl border-2 border-red-700')<page.indexOf('<div className={resultStyles.heading}>'));
});

test('curated complete-seasoned-bowl hold cannot be bypassed by generic dry noodle matches',async()=>{
  let calls=0;
  const current=await minerals.resolveCuratedMinerals('4061464935198',{potassium:null,phosphorus:null},async()=>null,{basis:'prepared'});
  const r=await categories.resolveCategoryMinerals('4061464935198',{product_name:'Chicken noodle bowl',ingredients_text:'potassium iodate'},current,async()=>null,{basis:'prepared',unit:'g',searchReferences:async()=>{calls++;throw Error('must not search');}});
  assert.equal(calls,0);assert.equal(r.potassium.valueMg,null);assert.equal(r.phosphorus.valueMg,null);assert.match(r.potassium.additiveUncertainty,/iodate/);
});

test('relaxed matching tolerates unused brand tokens and moderate macro differences, but keeps complete-food distinctions',()=>{
  const product={product_name:'Marlow oat flakes',nutriments:profile(381,10.9,8.1,70.7)};
  const id=matching.identifyFood(product,'dry');
  const candidate={source:'CoFID 2021',code:'oat',description:'Porridge oats, unfortified',potassiumMg:372,phosphorusMg:387,macros:{energyKcal:390,protein:16,fat:8,carbohydrate:68}};
  assert.equal(matching.rankReferences(product,id,[candidate],'dry').length,1);
  for(const [name,description,basis] of [['Chicken curry','Chicken, cooked','prepared'],['Seasoned noodle bowl','Noodles, cooked','prepared'],['Dry noodles','Noodles, cooked','dry']]) {
    const p={product_name:name,nutriments:profile(150,5,4,23)},i=matching.identifyFood(p,basis);
    assert.equal(matching.rankReferences(p,i,[{...candidate,description,macros:matching.productMacros(p)}],basis).length,0);
  }
});

test('authenticated CoFID search reaches relevant candidates beyond the first page',async()=>{
  const relevant=rows.find(r=>r.food_code==='11-800');
  const records=Array.from({length:500},(_,i)=>({...relevant,food_code:'test-'+i,food_name:'Ice cream with wafers, vanilla'})).concat(relevant);
  const pages=[];
  const client={auth:{getUser:async()=>({data:{user:{id:'pagination'}},error:null})},from:()=>({select:()=>({ilike:()=>({order:()=>({range:async(a,b)=>{pages.push(a);return {data:records.slice(a,b+1),error:null};}})})})})};
  const route=load('app/api/food-check/estimate/route.ts',{'@/lib/supabase/server':{createClient:async()=>client},'@/app/FoodCheck/usda.server':{usdaClient:{search:async()=>({status:'ok',data:[]})}}});
  const response=await route.POST(new Request('https://test/api/food-check/estimate',{method:'POST',body:JSON.stringify({product:products['20203269'],basis:'as-sold',unit:'g'})}));
  assert.equal(response.status,200);assert.equal((await response.json()).matches.potassium.code,'11-800');assert.ok(pages.includes(500));assert.ok(pages.length<=4);
});

// Optional, account-free visual fixture using the actual components and stylesheet.
if(process.env.RENALPLAN_UI_PREVIEW) {
 const React=require('react'),render=require('react-dom/server').renderToStaticMarkup,Card=load('components/food/PlannerSnacks.tsx',{'@/lib/useFoodAccount':{notifyFoodAccount(){}}}).default;
 const values=Object.fromEntries(snapshots.snackNutrients.map(k=>[k,{value:k==='calories'?131.32:63.21,kind:['potassium','phosphate'].includes(k)?'estimated':'reported'}]));
 const snack={id:'ui',name:'Milk Chocolate Digestives',planned_on:'2026-10-19',quantity:34,snapshot:{version:1,unit:'g',basis:'as-sold',reference:values,nutrients:values,source:'CoFID 2021 comparison; branded-product values may differ.'}};
 const source=read('app/nutrition/page.tsx'),ast=ts.createSourceFile('page.tsx',source,99,true,4);let markup;function visit(n){if(ts.isJsxElement(n)&&n.openingElement.getText(ast).includes('nutrition-mobile-daily-total'))markup=n.getText(ast);ts.forEachChild(n,visit);}visit(ast);
 const ctx={result:null,exports:{},require,selectedDay:'Monday',getStatusDotClass:()=> 'bg-slate-400',getDailyStatusForDay:()=> 'pending',getStatusText:()=> 'Not assessed',incompleteSnacks:()=>true,numericLimitStatus:()=> 'pending',requirements:{},dayTotals:{Monday:{}},formatDayNutrient:(_,k)=>k==='calories'?'131 kcal ESTIMATE':k==='potassium'?'532 mg ESTIMATE (incomplete)':k==='phosphate'?'Not available (incomplete)':'25 g'};vm.runInNewContext(compile('result=('+markup+');'),ctx);
 const body=render(React.createElement(Card,{date:snack.planned_on,snacks:[snack],hideHeading:true}))+render(ctx.result),classes=[...body.matchAll(/class="([^"]+)"/g)].flatMap(m=>m[1].split(/\s+/));
 const compiler=await require('@tailwindcss/node').compile(read('app/globals.css'),{base:process.cwd(),onDependency(){}}),css=compiler.build(classes);
 require('node:http').createServer((req,res)=>{res.setHeader('Content-Type','text/html; charset=utf-8');if(req.url.startsWith('/case')){const dark=new URL(req.url,'http://localhost').searchParams.get('theme')==='dark';res.end('<html data-theme="'+(dark?'dark':'light')+'" class="'+(dark?'dark':'')+'"><meta name="viewport" content="width=device-width,initial-scale=1"><style>'+css+' body{margin:0;padding:12px;background:'+(dark?'#0f172a':'#f8fafc')+'}</style>'+body+'</html>');}else res.end('<html><title>RenalPlan responsive check</title><h2>Actual components at narrow widths</h2><div style="display:flex;flex-wrap:wrap;gap:20px">'+[320,375,430].flatMap(w=>['light','dark'].map(t=>'<div><p>'+w+'px '+t+'</p><iframe style="border:1px solid #aaa;width:'+w+'px;height:820px" src="/case?theme='+t+'"></iframe></div>')).join('')+'</div></html>');}).listen(4317,'127.0.0.1',()=>console.log('http://127.0.0.1:4317'));
}
