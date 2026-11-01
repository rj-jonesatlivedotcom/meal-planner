import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import { execFileSync } from 'node:child_process';
function load(path) {
 const exports={};vm.runInNewContext(ts.transpileModule(fs.readFileSync(new URL(path,import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText,{exports});return exports;
}
const allergies=load('./allergies.ts'),diet=load('./myDiet.ts');
const recipes=['breakfasts','lunches','dinners'].flatMap(name=>[...load(`../data/RecipeData/${name}.ts`)[name]]);
const days=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],mealTypes=['Breakfast','Lunch','Dinner'];
const empty=()=>Object.fromEntries(days.map(day=>[day,Object.fromEntries(mealTypes.map(meal=>[meal,null]))]));
const currentSource=fs.readFileSync(new URL('../app/planner/page.tsx',import.meta.url),'utf8');
function action(source){const ast=ts.createSourceFile('page.tsx',source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);let result;function visit(n){if(ts.isFunctionDeclaration(n)&&n.name?.text==='pickForMe')result=n.getText(ast);ts.forEachChild(n,visit);}visit(ast);assert.ok(result);return ts.transpileModule(result+'\nexports.run=pickForMe;',{compilerOptions:{target:ts.ScriptTarget.ES2020}}).outputText;}
function generate(declared,{initial=empty(),source=currentSource,pool=recipes,filter=allergies.eligibleForMyChef,ready=true,numeric=parseFloat}={}){
 let next=initial,notice,seed=42;const math=Object.create(Math);math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
 const exports={};vm.runInNewContext(action(source),{
 exports,Math:math,recipes:pool,days,mealTypes,latestDietRef:{current:{savedDiet:{...diet.defaultRequirements,foodAllergies:declared,sodiumLimit:2000,proteinMaxG:75},dietReady:ready,dietError:false}},
 activeRequirements:diet.activeRequirements,eligibleForMyChef:filter,setMyChefNotice:value=>notice=value,setShowPickConfirm:()=>{},createEmptyPlanner:empty,getNutritionNumber:numeric,setPlannerMeals:fn=>next=fn(initial),
 });exports.run(true);return {next,notice};
}
const slots=plan=>days.flatMap(day=>mealTypes.map(meal=>plan[day][meal]));
test('expanded catalogue contains 200 recipes including 150 original codes',()=>{assert.equal(recipes.length,200);assert.equal(recipes.filter(r=>Number(r.code.slice(1))<=({B:50,L:48,D:52}[r.code[0]]??0)).length,150);});
test('one-serving and two-serving recipe yields leave per-person MyChef scoring and selection unchanged',()=>{
 const doubledYield=recipes.map(r=>({...r,servings:2,ingredients:r.ingredients.map(i=>({...i,quantity:`2 x ${i.quantity}`}))}));
 const one=generate([]),two=generate([],{pool:doubledYield});
 assert.deepEqual(JSON.parse(JSON.stringify(two.next)),JSON.parse(JSON.stringify(one.next)));
 assert.equal(two.notice,one.notice);
});
for(const declared of [['Chicken'],['Pork'],['Paprika'],['Chicken','Pork','Paprika']]) test(`real MyChef fills all 21 slots for ${declared.join(', ')} without selecting detected or relevant uncertain ingredients`,()=>{
 const h=generate(declared),ids=slots(h.next);assert.equal(ids.filter(Boolean).length,21);assert.equal(h.notice,null);
 for(const id of ids){const recipe=recipes.find(r=>r.id===id),check=allergies.matchRecipeAllergies(recipe,declared);assert.equal(check.detected.length,0,`${recipe.name} detected`);assert.equal(check.uncertain.length,0,`${recipe.name} uncertain`);}
 const eligible=allergies.eligibleForMyChef(recipes,declared);console.log(`${declared.join('+')}: ${eligible.length}/${recipes.length} eligible, 21/21 filled`);
});
test('complete-nutrition candidates retain existing nutrition and variety scoring with identical random seed',()=>{
 const fields=['calories','protein','carbohydrates','sodium','potassium','phosphate'];
 const complete=recipes.filter(r=>fields.every(f=>!r.nutritionIncomplete?.includes(f)&&Number.isFinite(parseFloat(r.nutrition[f]??''))));
 const before=execFileSync('git',['show','14468e0:app/planner/page.tsx'],{encoding:'utf8'});
 assert.deepEqual(JSON.parse(JSON.stringify(generate([],{pool:complete}).next)),JSON.parse(JSON.stringify(generate([],{source:before,pool:complete}).next)));
});
test('derivatives and synonyms match while unrelated named ingredients and composite foods remain eligible',()=>{
 for(const [name,item] of [['Chicken','Chicken stock'],['Chicken','Hen'],['Pork','Bacon'],['Pork','Ham'],['Pork','Pancetta'],['Pork','Lard'],['Paprika','Smoked paprika'],['Paprika','Pimentón'],['Paprika','Paprika extract (E160c)']])assert.equal(allergies.matchRecipeAllergies({ingredients:[{item}]},[name]).detected.length,1,`${name}: ${item}`);
 for(const [name,item] of [['Chicken','Vegetable stock'],['Pork','Chicken breast'],['Pork','Turkey bacon'],['Paprika','White bread'],['Paprika','Yoghurt'],['Chicken','Chocolate'],['Coriander','White bread']]){const check=allergies.matchRecipeAllergies({ingredients:[{item}]},[name]);assert.equal(check.detected.length+check.uncertain.length,0,`${name}: ${item}`);}
 for(const [name,item] of [['Chicken','Poultry stock'],['Pork','Sausages'],['Paprika','Spice blend'],['Milk','White bread'],['Cashews','Pesto']])assert.equal(allergies.matchRecipeAllergies({ingredients:[{item}]},[name]).uncertain.length,1,`${name}: ${item}`);
 assert.equal(allergies.matchRecipeAllergies({ingredients:[{item:'Chickenpea'}]},['Chicken']).detected.length,0);
});
test('failed ingredient checking, zero eligible recipes, unready settings preserve the existing planner',()=>{
 const initial=empty();for(const day of days)for(const meal of mealTypes)initial[day][meal]=recipes.find(r=>r.code.startsWith(meal[0])).id;
 const original=JSON.stringify(initial);
 for(const options of [{filter:()=>[]},{filter:()=>{throw Error('ingredient check failed');}},{ready:false}]){
  const h=generate(['Chicken'],{initial,...options});assert.equal(JSON.stringify(h.next),original);assert.equal(JSON.stringify(initial),original);
 }
});
test('an established category shortage preserves existing slots, fills available categories and names the missing category',()=>{
 const initial=empty();initial.Monday.Breakfast=recipes.find(r=>r.code.startsWith('B')).id;
 const h=generate([],{initial,pool:recipes.filter(r=>!r.code.startsWith('B'))});assert.equal(h.next.Monday.Breakfast,initial.Monday.Breakfast);assert.equal(h.next.Tuesday.Breakfast,null);assert.ok(h.next.Tuesday.Lunch);assert.ok(h.next.Tuesday.Dinner);assert.match(h.notice,/No eligible breakfast recipes/);
});

test('MyChef selects new lunches and dinners with incomplete nutrition without relaxing allergy exclusions',()=>{
 const pool=recipes.filter(r=>r.code.startsWith('B')||r.code.startsWith('L')&&Number(r.code.slice(1))>=49||r.code.startsWith('D')&&Number(r.code.slice(1))>=53);
 const h=generate([],{pool});assert.equal(slots(h.next).filter(Boolean).length,21);
 for(const day of days){assert.ok(Number(recipes.find(r=>r.id===h.next[day].Lunch).code.slice(1))>=49);assert.ok(Number(recipes.find(r=>r.id===h.next[day].Dinner).code.slice(1))>=53);}
 const allergyPlan=generate(['Chicken'],{pool});
 for(const id of slots(allergyPlan.next).filter(Boolean)){const r=recipes.find(r=>r.id===id),check=allergies.matchRecipeAllergies(r,['Chicken']);assert.equal(check.detected.length+check.uncertain.length,0,r.code);}
});
test('missing nutrients and flagged numeric subtotals remain selectable, never invalidating the whole MyChef score',()=>{
 for(const missing of ['?','—','',undefined]){
  const pool=recipes.map(r=>({...r,nutrition:{...r.nutrition,potassium:missing}}));
  assert.equal(slots(generate([],{pool}).next).filter(Boolean).length,21);
 }
 const pool=recipes.map(r=>({...r,nutritionIncomplete:['potassium'],nutrition:{...r.nutrition,potassium:'100 mg'}}));
 assert.equal(slots(generate([],{pool}).next).filter(Boolean).length,21);
});
test('known upper-limit exceedances remain penalised even when another meal lacks that nutrient',()=>{
 const base=recipes.find(r=>r.code==='B001'),nutrition={calories:'500',protein:'10',carbohydrates:'50',sodium:'100',potassium:'100',phosphate:'100'};
 const make=(id,code,sodium)=>({...base,id,code,mealFamily:id,nutritionIncomplete:[],protein:'10',nutrition:{...nutrition,sodium}});
 const pool=[make('b','B001','?'),{...make('low','L001','100'),mealFamily:'test'},{...make('high','L002','9000'),mealFamily:'test'},make('d','D001','100')];
 const h=generate([],{pool});for(const day of days)assert.equal(h.next[day].Lunch,'low');
});
test('the unsolicited Planner and recipe notices are absent',()=>{
 assert.ok(!currentSource.includes('MyChef excludes recipes with incomplete planning nutrition'));
 assert.ok(!fs.readFileSync(new URL('../components/RecipeCard.tsx',import.meta.url),'utf8').includes('dietary suitability not assessed'));
 assert.ok(!fs.readFileSync(new URL('../app/recipes/[id]/page.tsx',import.meta.url),'utf8').includes('Personal dietary suitability has not been assessed.'));
});


test('MyChef fill keeps a manually planned incomplete recipe when filling gaps',()=>{
 const initial=empty(),r=recipes.find(r=>r.code==='L049');initial.Monday.Lunch=r.id;
 const fillSource=currentSource.replace('  ) {\n    const { savedDiet', '  ) {\n    replaceAll = false;\n    const { savedDiet');
 assert.notEqual(fillSource,currentSource);
 const h=generate([],{initial,source:fillSource});assert.equal(h.next.Monday.Lunch,r.id);assert.equal(initial.Monday.Lunch,r.id);
});
