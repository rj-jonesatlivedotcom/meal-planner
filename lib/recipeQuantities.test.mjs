import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {catalogue,quantities,shoppingHarness,nutritionHarness,read} from './recipeCorrectionTestSupport.mjs';
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-9,`${a} != ${b}`);
const shop=shoppingHarness();

test('Unicode, slash, mixed and multiplied quantities retain mathematical values',()=>{
  for(const [s,n] of [['¼',.25],['½',.5],['¾',.75],['⅓',1/3],['⅔',2/3],['⅛',.125],['⅜',.375],['⅝',.625],['⅞',.875],['1/2',.5],['1/3',1/3],['2/3',2/3],['3/4',.75],['1½',1.5],['1 1/2',1.5],['2⅓',2+1/3],['1 ⅔',1+2/3],['2 x 1/3',2/3],['3 × ½',1.5],['0.25',.25]]){
    close(shop.parseQuantity(s+' tbsp').amount,n);
    assert.equal(shop.parseQuantity(s+' tbsp').unit,'tbsp');
  }
  for(const s of ['1/0 tsp','1//3 tsp','2-3 leaves','about a handful',''])assert.equal(shop.parseQuantity(s),null,s);
});

test('bracketed edible weights are retained as reference, not double-counted as shopping counts',()=>{
  const a=quantities.parseRecipeQuantity('⅓ cucumber (40 g)');close(a.amount,1/3);assert.equal(a.referenceWeight.amount,40);assert.equal(a.referenceWeight.unit,'g');
  assert.equal(quantities.parseRecipeQuantity('½ onion [50 g]').referenceWeight.amount,50);
  for(const unit of ['g','kg','ml','litres','teaspoons','tablespoons','slices','pieces','cloves'])assert.ok(shop.parseQuantity('1 1/2 '+unit));
  assert.equal(shop.parseQuantity('1 litre').unit,'l');assert.equal(shop.parseQuantity('1 teaspoon').unit,'tsp');
});

test('all 22 previously omitted third-fraction lines produce an actual Shopping row',()=>{
  const thirds=catalogue.flatMap(r=>r.ingredients.filter(i=>i.quantity.includes('⅓')).map(i=>({r,i})));
  assert.equal(thirds.length,22);
  for(const {r,i} of thirds){
    const result=shop.run([{...r,ingredients:[i]}],{[r.id]:3});
    assert.equal(result.list.length,1,r.code+' '+i.item);assert.ok(result.list[0].quantity);
    close(shop.parseQuantity(i.quantity).amount,1/3);
  }
});

test('all previously recognised catalogue quantity amounts and units retain their meaning',()=>{
  // Pre-fix parse results from bf4534d; independent of Git HEAD after release.
  const rows=[];
  for(const r of catalogue)for(const i of r.ingredients){
    const parsed=shop.parseQuantity(i.quantity);
    assert.ok(parsed,r.code+' '+i.quantity);
    const originalRecipe=Number(r.code.slice(1))<=({B:50,L:48,D:52}[r.code[0]]??0);
    if(originalRecipe&&!i.quantity.includes('\u2153'))rows.push({code:r.code,quantity:i.quantity,parsed:{amount:parsed.amount,unit:parsed.unit}});
  }
  assert.equal(rows.length,835);
  assert.equal(createHash('sha256').update(JSON.stringify(rows)).digest('hex'),'a1728c3fc5be49cbc34298ddab05430bf46ad9f270d72ec0c08ad42cd01c9f25');
});

test('thirds and eighths survive formatting, reparsing and aggregation before final purchase rounding',()=>{
  assert.equal(shop.formatQuantity(1/3,'tsp'),'⅓ tsp');assert.equal(shop.formatQuantity(1/8,'tsp'),'⅛ tsp');
  close(shop.parseQuantity(shop.combineQuantity('⅓ tsp','⅓ tsp','Paprika')).amount,2/3);
  assert.equal(shop.combineQuantity('⅔ tsp','⅓ tsp','Paprika'),'1 tsp');
  assert.equal(shop.combineQuantity('1 kg','500 g','Chicken breast'),'1500 g');
});

test('unknown quantities remain visible beside measured requirements and keep checked names',()=>{
  const recipe={id:'fallback',servings:2,ingredients:[{item:'Fresh coriander',quantity:'as required'},{item:'Fresh coriander',quantity:'2 g'}]};
  const r=shop.run([recipe],{fallback:4},['Fresh coriander','Unrelated']);
  assert.equal(r.list.length,1);assert.match(r.list[0].quantity,/as required/);assert.match(r.list[0].quantity,/recipe serves 2; shopping for 4 servings/);assert.match(r.list[0].quantity,/4 g/);
  assert.deepEqual(r.checked,[r.list[0].item]);
  const mixed=shop.run([{...recipe,ingredients:[recipe.ingredients[1],recipe.ingredients[0],recipe.ingredients[1]]}],{fallback:4});
  assert.match(mixed.list[0].quantity,/as required/);
  assert.equal((mixed.list[0].quantity.match(/4 g/g)||[]).length,2);
});

test('one/two-serving recipes produce the same per-person Shopping and Nutrition figures',()=>{
  const nutrition={calories:'600 kcal',protein:'30 g',carbohydrates:'70 g',fat:'20 g',fibre:'6 g',sodium:'400 mg',potassium:'700 mg',phosphate:'300 mg'};
  const one={id:'one',servings:1,nutrition,ingredients:[{item:'Chicken breast',quantity:'120 g'}]};
  const two={id:'two',servings:2,nutrition,ingredients:[{item:'Chicken breast',quantity:'240 g'}]};
  for(const people of [1,2,4,8]){
    const a=shop.run([one],{one:people}),b=shop.run([two],{two:people});assert.deepEqual(a.list,b.list);assert.equal(a.list[0].quantity,120*people+' g');
  }
  const n=nutritionHarness([one,two]);assert.deepEqual(JSON.parse(JSON.stringify(n.getMealTotals(one))),JSON.parse(JSON.stringify(n.getMealTotals(two))));
  const totals=n.getDayTotals({Monday:{Breakfast:'one',Lunch:'two',Dinner:null},mealPeople:{Monday:{Breakfast:4,Lunch:8}}},'Monday');assert.equal(totals.calories,1200);assert.equal(totals.protein,60);
  const page=read('app/recipes/[id]/page.tsx');assert.match(page,/recipe\.servings/);assert.match(page,/recipe\.ingredients\.map/);assert.match(read('components/RecipeNutrition.tsx'),/Nutrition per serving/);
  assert.match(read('app/planner/page.tsx'),/getNutritionNumber\(recipe\.nutrition\[field\]/);
});
