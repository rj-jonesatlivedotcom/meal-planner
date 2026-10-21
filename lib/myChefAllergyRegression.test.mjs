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
test('real catalogue contains all 150 original recipes',()=>assert.equal(recipes.length,150));
for(const declared of [['Chicken'],['Pork'],['Paprika'],['Chicken','Pork','Paprika']]) test(`real MyChef fills all 21 slots for ${declared.join(', ')} without selecting detected or relevant uncertain ingredients`,()=>{
 const h=generate(declared),ids=slots(h.next);assert.equal(ids.filter(Boolean).length,21);assert.equal(h.notice,null);
 for(const id of ids){const recipe=recipes.find(r=>r.id===id),check=allergies.matchRecipeAllergies(recipe,declared);assert.equal(check.detected.length,0,`${recipe.name} detected`);assert.equal(check.uncertain.length,0,`${recipe.name} uncertain`);}
 const eligible=allergies.eligibleForMyChef(recipes,declared);console.log(`${declared.join('+')}: ${eligible.length}/150 eligible, 21/21 filled`);
});
test('no-allergy generation matches the pre-fix real selector with identical random seed and nutrition/variety rules',()=>{
 const before=execFileSync('git',['show','14468e0:app/planner/page.tsx'],{encoding:'utf8'});
 assert.deepEqual(JSON.parse(JSON.stringify(generate([]).next)),JSON.parse(JSON.stringify(generate([],{source:before}).next)));
});
test('derivatives and synonyms match while unrelated named ingredients and composite foods remain eligible',()=>{
 for(const [name,item] of [['Chicken','Chicken stock'],['Chicken','Hen'],['Pork','Bacon'],['Pork','Ham'],['Pork','Pancetta'],['Pork','Lard'],['Paprika','Smoked paprika'],['Paprika','Pimentón'],['Paprika','Paprika extract (E160c)']])assert.equal(allergies.matchRecipeAllergies({ingredients:[{item}]},[name]).detected.length,1,`${name}: ${item}`);
 for(const [name,item] of [['Chicken','Vegetable stock'],['Pork','Chicken breast'],['Pork','Turkey bacon'],['Paprika','White bread'],['Paprika','Yoghurt'],['Chicken','Chocolate'],['Coriander','White bread']]){const check=allergies.matchRecipeAllergies({ingredients:[{item}]},[name]);assert.equal(check.detected.length+check.uncertain.length,0,`${name}: ${item}`);}
 for(const [name,item] of [['Chicken','Poultry stock'],['Pork','Sausages'],['Paprika','Spice blend'],['Milk','White bread'],['Cashews','Pesto']])assert.equal(allergies.matchRecipeAllergies({ingredients:[{item}]},[name]).uncertain.length,1,`${name}: ${item}`);
 assert.equal(allergies.matchRecipeAllergies({ingredients:[{item:'Chickenpea'}]},['Chicken']).detected.length,0);
});
test('failed ingredient checking, zero eligible recipes, unready settings and invalid scores preserve the existing planner',()=>{
 const initial=empty();for(const day of days)for(const meal of mealTypes)initial[day][meal]=recipes.find(r=>r.code.startsWith(meal[0])).id;
 const original=JSON.stringify(initial);
 for(const options of [{filter:()=>[]},{filter:()=>{throw Error('ingredient check failed');}},{ready:false},{numeric:()=>NaN}]){
  const h=generate(['Chicken'],{initial,...options});assert.equal(JSON.stringify(h.next),original);assert.equal(JSON.stringify(initial),original);
 }
});
test('an established category shortage preserves existing slots, fills available categories and names the missing category',()=>{
 const initial=empty();initial.Monday.Breakfast=recipes.find(r=>r.code.startsWith('B')).id;
 const h=generate([],{initial,pool:recipes.filter(r=>!r.code.startsWith('B'))});assert.equal(h.next.Monday.Breakfast,initial.Monday.Breakfast);assert.equal(h.next.Tuesday.Breakfast,null);assert.ok(h.next.Tuesday.Lunch);assert.ok(h.next.Tuesday.Dinner);assert.match(h.notice,/No eligible breakfast recipes/);
});
