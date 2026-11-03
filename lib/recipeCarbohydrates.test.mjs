import test from 'node:test';
import assert from 'node:assert/strict';
import {catalogue,read,nutritionHarness} from './recipeCorrectionTestSupport.mjs';
const evidence=JSON.parse(read('data/RecipeData/evidence/international-carbohydrates.json'));
const expectedCodes=[...Array.from({length:20},(_,i)=>'L'+(i+49).toString().padStart(3,'0')),...Array.from({length:30},(_,i)=>'D'+(i+53).toString().padStart(3,'0'))];

test('all 50 new recipes have one-serving carbohydrate totals with complete line-by-line evidence',()=>{
 assert.equal(evidence.recipes.length,50);assert.equal(new Set(evidence.recipes.map(r=>r.code)).size,50);
 assert.deepEqual(evidence.recipes.map(r=>r.code).sort(),expectedCodes.sort());
 assert.equal(evidence.recipes.reduce((sum,r)=>sum+r.ingredients.length,0),884);
 for(const record of evidence.recipes){const recipe=catalogue.find(r=>r.code===record.code);
  assert.equal(recipe.servings,1);assert.equal(record.servings,1);assert.equal(recipe.id,record.id);
  assert.equal(recipe.ingredients.length,record.ingredients.length);assert.ok(!recipe.nutritionIncomplete.includes('carbohydrates'));
  let total=0;
  record.ingredients.forEach((line,i)=>{const input=recipe.ingredients[i];assert.equal(input.item,line.ingredient);const quantity=input.quantity.match(/^(\d+(?:\.\d+)?) (g|ml)\b/);assert.ok(quantity);assert.equal(Number(quantity[1]),line.quantity);assert.equal(quantity[2],line.basisUnit);assert.equal(line.unit,line.basisUnit);assert.ok(Number.isFinite(line.valuePer100)&&line.valuePer100>=0);assert.ok(line.references.length>0);assert.ok(line.limitations);const contribution=Number(quantity[1])*line.valuePer100/100;assert.ok(Math.abs(contribution-line.perServingContribution)<1e-10);total+=contribution;});
  assert.ok(Math.abs(total-record.carbohydrates)<1e-8,record.code);assert.equal(recipe.nutrition.carbohydrates,total.toFixed(1)+' g',record.code);
 }
});

test('source definitions are reconciled before adding ingredient carbohydrate contributions',()=>{
 for(const recipe of evidence.recipes)for(const line of recipe.ingredients){const p=line.parts;let expected;
  if(line.method.startsWith('CoFID')){
   assert.ok(p.totalME>=0);assert.notEqual(line.raw.L,'N');assert.notEqual(line.raw.L,null);
   expected='starchME'in p?p.starchME/1.1+(p.monosaccharides??0)+(p.disaccharidesME??0)/1.05+p.remainderME/1.05:p.totalME/1.05;
  }else if(line.method.startsWith('USDA')){assert.ok(Number.isFinite(p.totalCarbohydrate)&&Number.isFinite(p.dietaryFibre));expected=p.totalCarbohydrate-p.dietaryFibre;
  }else if(line.method.startsWith('Published')){assert.equal(line.references[0].basis,'per 100 g fresh weight');assert.match(line.references[0].table,/S5.*15/);expected=((p.totalCarbohydrate[0]-p.dietaryFibre[0])+(p.totalCarbohydrate[1]-p.dietaryFibre[1]))/2;
  }else{assert.equal(line.basisUnit,'ml');expected=p.labelCarbohydrate;assert.equal(expected,82);}
  assert.ok(Math.abs(expected-line.valuePer100)<1e-8,line.ingredient);
 }
 const sugar=evidence.recipes.flatMap(r=>r.ingredients).find(i=>i.references[0].foodCode==='17-063');assert.equal(sugar.valuePer100,100);
 const galangal=evidence.recipes.flatMap(r=>r.ingredients).find(i=>i.ingredient==='Fresh galangal');assert.ok(Math.abs(galangal.valuePer100-1.935)<1e-10);
 const lemongrass=evidence.recipes.flatMap(r=>r.ingredients).find(i=>i.ingredient==='Tender lemongrass core');assert.ok(Math.abs(lemongrass.valuePer100-4.73)<1e-10);
});

test('Nutrition adds completed actual meal totals but still propagates any newly declared nutrient gap',()=>{
 const lunch=catalogue.find(r=>r.code==='L049'),dinner=catalogue.find(r=>r.code==='D071');
 const h=nutritionHarness([lunch,dinner]);const day=h.getDayTotals({Monday:{Breakfast:null,Lunch:lunch.id,Dinner:dinner.id}},'Monday');
 assert.equal(day.carbohydrates,parseFloat(lunch.nutrition.carbohydrates)+parseFloat(dinner.nutrition.carbohydrates));
 assert.equal(day.calories,parseFloat(lunch.nutrition.calories)+parseFloat(dinner.nutrition.calories));
 assert.equal(day.potassium,parseFloat(lunch.nutrition.potassium)+parseFloat(dinner.nutrition.potassium));
 const unavailable={...dinner,nutritionIncomplete:['potassium']};
 assert.ok(Number.isNaN(nutritionHarness([lunch,unavailable]).getDayTotals({Monday:{Lunch:lunch.id,Dinner:dinner.id}},'Monday').potassium));
});
