import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
function load(path, context = {}) { const exports={}; vm.runInNewContext(ts.transpileModule(fs.readFileSync(new URL(path,import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2020}}).outputText,{exports,...context}); return exports; }
const model=load('./allergies.ts'), diet=load('./myDiet.ts');
const recipe=(...items)=>({ingredients:items.map(item=>({item}))});
test('ingredient derivatives, synonyms and multiple declared allergens are detected',()=>{
 for(const item of ['Milk','Lactose-free milk','Cheddar cheese','Unsalted butter','Cream','Whey powder','Casein','Ghee','Yoghurt']) assert.deepEqual([...model.matchRecipeAllergies(recipe(item),['Milk']).detected],['Milk'],item);
 assert.equal(model.matchRecipeAllergies(recipe('Groundnut oil'),['Peanuts']).detected.length,1);
 assert.equal(model.matchRecipeAllergies(recipe('Tahini'),['Sesame']).detected.length,1);
 assert.equal(model.matchRecipeAllergies(recipe('Tofu'),['Soya']).detected.length,1);
 assert.equal(model.matchRecipeAllergies(recipe('Semolina'),['Wheat']).detected.length,1);
 assert.deepEqual([...model.matchRecipeAllergies(recipe('Egg whites','Milk'),['Egg','Milk']).detected],['Egg','Milk']);
});
test('whole words, tree nuts and peanuts remain distinct; plant products are not milk evidence',()=>{
 assert.equal(model.matchRecipeAllergies(recipe('Butternut squash','Nutmeg','Pineapple'),['Nuts','Apple']).detected.length,0);
 assert.equal(model.matchRecipeAllergies(recipe('Peanut butter'),['Tree nuts']).detected.length,0);
 assert.equal(model.matchRecipeAllergies(recipe('Almonds'),['Peanuts']).detected.length,0);
 assert.equal(model.matchRecipeAllergies(recipe('Walnuts'),['Tree nuts']).detected.length,1);
 assert.equal(model.matchRecipeAllergies(recipe('Cashew butter'),['Cashews']).detected.length,1);
 for(const item of ['Peanut butter','Cocoa butter','Coconut milk','Dairy-free cheese','Vegan butter','Butter beans','Cream of tartar']) assert.equal(model.matchRecipeAllergies(recipe(item),['Milk']).detected.length,0,item);
});
test('missing ingredient details and allergen-relevant composites are uncertain; arbitrary names do not reject unrelated food',()=>{
 for(const item of [recipe('Vegetable stock'),recipe('White bread'),recipe('Vegan cheese'),{}]) {
  const match=model.matchRecipeAllergies(item,['Milk']); assert.equal(match.uncertain.length,1); assert.equal(model.eligibleForMyChef([item],['Milk']).length,0);
 }
 assert.equal(model.matchRecipeAllergies(recipe('Rice'),['Unrecognised allergen']).uncertain.length,0);
 assert.equal(model.eligibleForMyChef([recipe('Rice')],['Milk']).length,1);
});
test('planner conflicts flag existing meals without changing their IDs or positions',()=>{
 const plan={Monday:{Breakfast:'milk',Lunch:'rice'}}, before=JSON.stringify(plan);
 const items=[{...recipe('Butter'),id:'milk',name:'Toast'},{...recipe('Rice'),id:'rice',name:'Rice'}];
 const conflicts=model.plannerAllergyConflicts(plan,items,['Milk']);
 assert.equal(conflicts.length,1); assert.equal(conflicts[0].meal,'Breakfast'); assert.equal(JSON.stringify(plan),before);
});
function chefFixture(ingredients, fixed=null, ready=true) {
 const source=fs.readFileSync(new URL('../app/planner/page.tsx',import.meta.url),'utf8'); const ast=ts.createSourceFile('page.tsx',source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);let action;
 function visit(n){if(ts.isFunctionDeclaration(n)&&n.name?.text==='pickForMe')action=n.getText(ast);ts.forEachChild(n,visit);}visit(ast);assert.ok(action);
 const items=ingredients.map(([id,code,item])=>({id,code,...recipe(item),nutrition:{calories:'500',sodium:'9000',protein:'10',carbohydrates:'10',potassium:'0',phosphate:'0'},protein:'10',potassium:'Low',phosphate:'Low',purines:'Low'}));
 const initial={Monday:{Breakfast:fixed,Lunch:null,Dinner:null}}, before=JSON.stringify(initial);let next=initial,notice;
 const exports={};vm.runInNewContext(ts.transpileModule(action+'\nexports.run=pickForMe;', {compilerOptions:{target:ts.ScriptTarget.ES2020}}).outputText,{
 exports,recipes:items,latestDietRef:{current:{savedDiet:{...diet.defaultRequirements,foodAllergies:['Milk'],monitoredNutrients:[]},dietReady:ready,dietError:false}},activeRequirements:diet.activeRequirements,
 eligibleForMyChef:model.eligibleForMyChef,setShowPickConfirm:()=>{},setMyChefNotice:value=>notice=value,setPlannerMeals:fn=>{next=fn(initial)},days:['Monday'],mealTypes:['Breakfast','Lunch','Dinner'],getNutritionNumber:parseFloat,
 createEmptyPlanner:()=>({Monday:{Breakfast:null,Lunch:null,Dinner:null}}),
 });exports.run(false);return {next,notice,unchanged:JSON.stringify(initial)===before};
}
test('real MyChef selection excludes conflicts and uncertainty even when all eligible options exceed targets',()=>{
 const h=chefFixture([['bad','B001','Cheese'],['uncertain','B002','Vegetable stock'],['b','B003','Rice'],['l','L001','Rice'],['d','D001','Rice']]);
 assert.equal(h.next.Monday.Breakfast,'b');assert.ok(h.unchanged);
});
test('real MyChef leaves an ineligible meal slot empty and keeps existing conflicting meals unchanged',()=>{
 const items=[['bad','B001','Cheese'],['l','L001','Rice'],['d','D001','Rice']];
 const empty=chefFixture(items);assert.equal(empty.next.Monday.Breakfast,null);assert.equal(empty.next.Monday.Lunch,'l');assert.match(empty.notice,/No eligible breakfast recipes/);
 const fixed=chefFixture(items,'bad');assert.equal(fixed.next.Monday.Breakfast,'bad');assert.ok(fixed.unchanged);
 const pending=chefFixture(items,null,false);assert.equal(pending.next.Monday.Lunch,null);assert.match(pending.notice,/cannot read your allergy settings/);
});
test('red photo X uses two thick full-image diagonals only for detected allergy evidence',()=>{
 let allergies=['Milk']; const jsx=(type,props)=>({type,props});
 const ui=load('../components/RecipeAllergy.tsx',{require:name=>{
  if(name==='react/jsx-runtime')return {jsx,jsxs:jsx};
  if(name==='@/data/RecipeData')return {recipes:[{id:'a',...recipe('Butter')},{id:'b',...recipe('Vegetable stock')}]};
  if(name==='@/lib/allergies')return model;
  if(name==='./my-diet/MyDietProvider')return {useMyDiet:()=>({requirements:{foodAllergies:allergies,potassiumLimitMg:1,dislikedFoods:['Butter']},ready:true,error:false})};
  throw Error(name);
 }});
 const overlay=ui.AllergyOverlay({recipeId:'a'});assert.equal(overlay.type,'svg');assert.match(overlay.props['aria-label'],/Milk/);
 const paths=overlay.props.children.filter(n=>n.type==='path');assert.equal(paths.length,2);assert.equal(Number(paths[1].props.strokeWidth),9);assert.equal(paths[1].props.d,'M4 4L96 96M96 4L4 96');
 assert.equal(ui.AllergyOverlay({recipeId:'b'}),null); allergies=[];assert.equal(ui.AllergyOverlay({recipeId:'a'}),null);
});
