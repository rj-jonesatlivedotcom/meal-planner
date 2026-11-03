import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {catalogue,read,evaluate,shoppingHarness,nutritionHarness} from './recipeCorrectionTestSupport.mjs';
const evidence=JSON.parse(read('data/RecipeData/evidence/balanced-110/recipe-data.json'));
const added=catalogue.filter(r=>Number(r.code.slice(1))>({B:50,L:68,D:82}[r.code[0]]??Infinity));
const plain=x=>JSON.parse(JSON.stringify(x));
const fields={calories:'kcal',protein:'g',carbohydrates:'g',fat:'g',fibre:'g',sodium:'mg',potassium:'mg',phosphate:'mg',salt:'g'};
test('310 unique recipes have unique working image links and the audited 110 retain one-serving specifications',()=>{
 assert.equal(catalogue.length,310);assert.equal(added.length,110);assert.equal(new Set(catalogue.map(r=>r.id)).size,310);assert.equal(new Set(catalogue.map(r=>r.code)).size,310);
 assert.deepEqual(['Breakfast','Lunch','Dinner'].map(c=>catalogue.filter(r=>r.category===c).length),[60,125,125]);
 for(const r of catalogue)assert.ok(fs.existsSync(new URL('../public'+r.image,import.meta.url)),r.code);
 for(const r of added){const s=evidence.find(x=>x.code===r.code);assert.ok(s);assert.equal(r.id,s.id);assert.equal(r.servings,1);assert.equal(r.image,'/images/recipes/'+r.code+'.webp');assert.deepEqual(plain(r.method),s.method);assert.equal(r.description,s.description);assert.equal(r.cookingTime,s.minutes+' mins');assert.deepEqual(plain(r.dietCategories),s.dietCategories);assert.equal(r.primaryDietCategory,s.primaryDietCategory);assert.equal(r.fluidMl,undefined,r.code+' unmeasured fluid must stay unknown');
 assert.deepEqual(plain(r.ingredients),s.ingredients.map(i=>({item:i.ingredient,shoppingItem:i.ingredient,quantity:i.quantityG+' g ('+i.startingState+')'})));
 for(const [f,u]of Object.entries(fields)){const total=s.ingredients.reduce((sum,i)=>sum+i.quantityG*i.nutrients[f].value/100,0);assert.ok(Math.abs(total-s.nutritionPerServingUnrounded[f])<1e-7,r.code+' '+f);assert.equal(r.nutrition[f],s.nutritionPerServing[f].toFixed(f==='salt'?2:['calories','sodium','potassium','phosphate'].includes(f)?0:1)+' '+u);}
 assert.equal(r.calories,r.nutrition.calories);assert.equal(r.protein,r.nutrition.protein);assert.equal(r.nutritionIncomplete.length,0);
 }
});
test('all 110 image contents match the reviewed delivery manifest',()=>{
 const record=JSON.parse(read('data/RecipeData/evidence/balanced-110/image-manifest.json'));assert.equal(record.length,110);
 for(const r of added){const m=record.find(x=>x.code===r.code);const bytes=fs.readFileSync(new URL('../public'+r.image,import.meta.url));assert.equal(createHash('sha256').update(bytes).digest('hex'),m.sha256,r.code);assert.equal(bytes.toString('ascii',8,12),'WEBP');}
});
test('all 110 new recipes reach shopping quantities with correctly scaled weighed inputs',()=>{
 const shop=shoppingHarness();for(const r of added){const i=r.ingredients[0],g=parseFloat(i.quantity);assert.equal(shop.parseQuantity(i.quantity).amount,g);const single={...r,ingredients:[i]};for(const people of [1,4]){const result=shop.run([single],{[r.id]:people});assert.equal(result.list.length,1,r.code);assert.ok(Math.abs(shop.parseQuantity(result.list[0].quantity).amount-g*people)<=1,r.code+' shopping scale');}}
});
test('new meal carbohydrate and other daily totals use per-serving values, independent of household quantities',()=>{
 const rs=['B051','L069','D083'].map(code=>added.find(r=>r.code===code)),h=nutritionHarness(rs),plan={Monday:Object.fromEntries(['Breakfast','Lunch','Dinner'].map((m,i)=>[m,rs[i].id])),mealPeople:{Monday:{Breakfast:4,Lunch:4,Dinner:4}}};const total=h.getDayTotals(plan,'Monday');for(const f of Object.keys(fields).filter(f=>f!=='salt'))assert.ok(Math.abs(total[f]-rs.reduce((sum,r)=>sum+parseFloat(r.nutrition[f]),0))<1e-8,f);
});
test('wheat-based seitan recipes are excluded by the existing wheat allergy checks',()=>{
 const allergy=evaluate(read('lib/allergies.ts'));for(const r of added.filter(r=>r.ingredients.some(i=>/vital wheat gluten/i.test(i.item)))){const result=allergy.matchRecipeAllergies(r,['Wheat']);assert.ok(result.detected.length+result.uncertain.length>0,r.code);}
});
test('weighed recipe shopping retains exact gram totals for all inputs and mixed legacy units',()=>{
 const shop=shoppingHarness();
 for(const r of added){assert.equal(r.shoppingByWeight,true,r.code);const result=shop.run([r],{[r.id]:4});for(const i of r.ingredients.filter(i=>i.item!=='Drinking tap water')){const isolated={...r,ingredients:[i]},row=shop.run([isolated],{[r.id]:4}).list[0];assert.equal(shop.parseQuantity(row.quantity).unit,'g',r.code+' '+i.item);assert.ok(Math.abs(shop.parseQuantity(row.quantity).amount-4*parseFloat(i.quantity))<=.005,r.code+' '+i.item);}assert.ok(!result.list.some(i=>i.item==='Drinking tap water'));}
 const base=added.find(r=>r.code==='L069'),weighted={...base,id:'weighed',ingredients:[{item:'Olive oil',quantity:'12.5 g'}]},legacy={...base,id:'legacy',shoppingByWeight:false,ingredients:[{item:'Olive oil',quantity:'1 tbsp'}]};
 for(const pool of [[legacy,weighted],[weighted,legacy]]){const rows=shop.run(pool).list;assert.equal(rows.length,1);assert.match(rows[0].quantity,/15 ml \+ 12½ g/);}
 const beans=shop.normaliseShoppingQuantity('Navy beans, boiled without salt and drained','90 g');assert.equal(shop.parseQuantity(beans).unit,'g');
});
