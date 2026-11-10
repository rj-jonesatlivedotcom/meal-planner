import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {existsSync} from 'node:fs';
import ts from 'typescript';
import React from 'react';
import * as jsxRuntime from 'react/jsx-runtime';
import {renderToStaticMarkup} from 'react-dom/server';
import {browseCatalogue,catalogue,catalogueBeforePhotoCorrection,evaluate,read} from './recipeCorrectionTestSupport.mjs';

const cuisine=evaluate(read('lib/recipeCuisines.ts')), diets=evaluate(read('lib/recipeDiets.ts')), protein=evaluate(read('lib/recipeProtein.ts'));
const audit=JSON.parse(read('data/recipeDiscoveryReview.json'));
const source=read('app/recipes/page.tsx'), tree=ts.createSourceFile('page.tsx',source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
const declarations=new Map(), resets=[], cuisineFields=[];let mealType,restore,save,saveDependencies;
function visit(n) {
  if(ts.isFunctionDeclaration(n)&&n.name?.text==='getMealType')mealType=n.getText(tree);
  if(ts.isVariableDeclaration(n)&&ts.isIdentifier(n.name))declarations.set(n.name.text,n.getText(tree));
  if(ts.isCallExpression(n)&&n.expression.getText(tree)==='useEffect'){
    const callback=n.arguments[0];
    if(callback.getText(tree).includes('const validMealTypes'))restore=callback.getText(tree);
    if(callback.getText(tree).includes('sessionStorage.setItem(')&&callback.getText(tree).includes('"recipes-filters"')){save=callback.getText(tree);saveDependencies=n.arguments[1].getText(tree);}
  }
  if(ts.isJsxElement(n)){
    const attributes=n.openingElement.attributes.properties;
    if(n.openingElement.tagName.getText(tree)==='button'&&attributes.some(a=>a.name?.getText(tree)==='aria-label'&&a.initializer?.text==='Clear all recipe filters and search'))resets.push(attributes.find(a=>a.name?.getText(tree)==='onClick').initializer.expression.getText(tree));
    if(n.openingElement.tagName.getText(tree)==='label'&&attributes.some(a=>a.name?.getText(tree)==='htmlFor'&&a.initializer?.text?.startsWith('recipe-cuisine-')))cuisineFields.push(n.parent.getText(tree));
  }
  ts.forEachChild(n,visit);
}
visit(tree);
const pipeline=mealType+'\n'+['featuredBreakfastRank','searchWords','showFeaturedBreakfasts','nutrientAmount','getMinutes','getCalories','availableRecipes','filteredRecipes','filteredRecipeCount','recipesMatchingBrowseFilters','mealTypeCounts'].map(name=>'const '+declarations.get(name)+';').join('\n')+'\nexports.result={filteredRecipes,filteredRecipeCount,mealTypeCounts};';
const defaults={selectedCuisine:'All',selectedDiet:'All',selectedMealType:'All',selectedProtein:'All',showFavourites:false,favouriteRecipeIds:[],searchText:'',sortBy:'default'};
const run=(options={})=>evaluate(pipeline,{recipes:catalogue,browseRecipes:browseCatalogue,openedFromPlanner:false,...defaults,...cuisine,...diets,...protein,...options}).result;
const codes=result=>Array.from(result.filteredRecipes,r=>r.code).sort();
const counts={
  British:43, Italian:18, Chinese:8, Indian:12, Thai:6, Vietnamese:2, Mediterranean:12, Mexican:6, 'Middle Eastern':5,
  Bangladeshi:1, Brazilian:3, Caribbean:2, 'East Asia':5, French:2, Ghanaian:6, Hungarian:1, Indonesian:2,
  Japanese:4, Korean:1, Malaysian:2, Moroccan:5, Nigerian:2, 'North Africa':2, Pakistani:3, Peruvian:4,
  Polish:2, Portuguese:1, 'South African':2, 'South America':2, 'Southeast Asia':2, 'Sri Lankan':2, Tunisian:2, 'West Africa':4, Other:138,
};

test('all represented cuisine options partition all 312 browse recipes without empty categories',()=>{
  assert.equal(run().filteredRecipeCount,312);
  assert.equal(new Set(run().filteredRecipes.map(r=>r.id)).size,312);
  assert.deepEqual(Array.from(cuisine.recipeCuisineOptions(catalogue)),Object.keys(counts));
  let total=0;
  for(const [selectedCuisine,count] of Object.entries(counts)){
    const result=run({selectedCuisine});assert.equal(result.filteredRecipeCount,count);assert.equal(result.mealTypeCounts.All,count);total+=count;
    assert.equal(result.mealTypeCounts.Breakfast+result.mealTypeCounts.Lunch+result.mealTypeCounts.Dinner,count);
  }
  assert.equal(total,312);
  for(const value of [undefined,'Simple cooking','Unknown future origin']){
    assert.equal(cuisine.matchesCuisineFilter({cuisine:value},'All'),true);assert.equal(cuisine.matchesCuisineFilter({cuisine:value},'Other'),true);
  }
  assert.equal(cuisine.recipeCuisine({cuisine:'Sri Lanka'}),'Sri Lankan');
  assert.equal(cuisine.recipeCuisine({cuisine:'sri-lankan'}),'Sri Lankan');
  assert.equal(cuisine.recipeCuisine({cuisine:'Pakistan'}),'Pakistani');
  assert.equal(cuisine.recipeCuisine({cuisine:'East Asia'}),'East Asia');
  assert.deepEqual(codes(run({selectedCuisine:'Japanese',searchText:'Japanese'})),['D069','D096','L059','L087']);
});
test('exactly 17 reviewed Blue Zone-inspired recipes span all three meal types',()=>{
  assert.ok(diets.DIET_TYPES.includes('Blue Zone-inspired'));
  const result=run({selectedDiet:'Blue Zone-inspired'});assert.equal(result.filteredRecipeCount,17);
  assert.equal(JSON.stringify(result.mealTypeCounts),JSON.stringify({All:17,Breakfast:4,Lunch:9,Dinner:4}));
  for(const r of result.filteredRecipes){const record=audit.recipes.find(x=>x.code===r.code);assert.ok(record.blueZoneRationale);assert.ok(record.blueZonePattern);assert.equal(r.dietCategories.filter(x=>x==='Blue Zone-inspired').length,1);}
  // Neither Vegetarian nor Mediterranean-style alone admits a recipe.
  for(const code of ['B041','B047','B048','B057','B060','L070','D117'])assert.equal(diets.matchesDietFilter(catalogue.find(r=>r.code===code),'Blue Zone-inspired'),false,code);
});
test('Cuisine + Diet type + Meal type intersect, while category counts remain consistent',()=>{
  const result=run({selectedCuisine:'Italian',selectedDiet:'Blue Zone-inspired',selectedMealType:'Lunch'});
  assert.deepEqual(codes(result),['L069']);assert.equal(result.filteredRecipeCount,1);
  assert.equal(JSON.stringify(result.mealTypeCounts),JSON.stringify({All:4,Breakfast:1,Lunch:1,Dinner:2}));
  assert.deepEqual(codes(run({selectedCuisine:'Mediterranean',selectedDiet:'Blue Zone-inspired',selectedMealType:'Lunch'})),['L116','L119']);
});
test('search, protein and favourites continue to combine with the new filters',()=>{
  assert.deepEqual(codes(run({selectedCuisine:'East Asia',selectedDiet:'Blue Zone-inspired',searchText:'ginger tofu'})),['L120','L125']);
  assert.ok(codes(run({selectedCuisine:'Chinese',searchText:'Chinese'})).includes('L020'));
  assert.equal(run({searchText:'Blue Zone-inspired'}).filteredRecipeCount,17);
  const r=catalogue.find(r=>r.code==='D045');
  assert.deepEqual(codes(run({selectedCuisine:'Chinese',selectedProtein:'Chicken',showFavourites:true,favouriteRecipeIds:[r.id]})),['D045']);
});
test('the two overnight oats lead default browsing while other views keep their existing order',()=>{
  const featured = ['B047', 'B048'];
  const order = (options) => Array.from(run(options).filteredRecipes, recipe => recipe.code);
  for (const selectedMealType of ['All', 'Breakfast']) {
    const original = browseCatalogue.filter(recipe => selectedMealType === 'All' || recipe.category === selectedMealType);
    assert.deepEqual(order({selectedMealType}), [
      ...featured,
      ...original.filter(recipe => !featured.includes(recipe.code)).map(recipe => recipe.code),
    ]);
  }
  const breakfast = {selectedMealType:'Breakfast'};
  assert.equal(order({...breakfast, openedFromPlanner:true})[0], 'B001');
  assert.equal(order({...breakfast, selectedDiet:'Vegetarian'})[0], 'B001');
  assert.equal(order({...breakfast, searchText:'overnight oats'})[0], 'B045');
  assert.equal(order({...breakfast, sortBy:'calories-asc'})[0], 'B049');
  assert.deepEqual(order({showFavourites:true, favouriteRecipeIds:catalogue.filter(recipe =>
    ['B001', ...featured].includes(recipe.code)).map(recipe => recipe.id)}), ['B001', ...featured]);
});
test('L007 is hidden from general browsing while its ID and saved access remain available',()=>{
  const retired = catalogue.find(recipe => recipe.code === 'L007');
  assert.equal(retired.id, 'ham-lettuce-sandwich');
  assert.equal(catalogue.length, 313);
  assert.equal(run().mealTypeCounts.Lunch, 124);
  const searchText = 'egg lettuce sandwich';
  const lunch = {selectedMealType:'Lunch', searchText};
  assert.ok(codes(run(lunch)).includes('L002'));
  assert.ok(!codes(run(lunch)).includes('L007'));
  assert.ok(codes(run({...lunch, openedFromPlanner:true})).includes('L007'));
  assert.deepEqual(codes(run({showFavourites:true, favouriteRecipeIds:[retired.id]})), ['L007']);
});

test('the egg and pepper and egg and leek rice bowls use their own photos',()=>{
  assert.equal(catalogue.find(recipe => recipe.code === 'L021').image, '/images/recipes/L021.webp');
  assert.equal(catalogue.find(recipe => recipe.code === 'L044').image, '/images/recipes/L044.webp');
});
test('the range additions are browsable with distinct images and reconcile to measured ingredient inputs',()=>{
  const evidence=JSON.parse(read('data/RecipeData/evidence/range-additions.json'));
  const foods=JSON.parse(read(`data/RecipeData/evidence/${evidence.sourceRegister}`));
  assert.deepEqual(codes(run({selectedMealType:'Breakfast',selectedCuisine:'British',searchText:'full english'})), ['B061']);
  const veganDinners=run({selectedMealType:'Dinner',selectedDiet:'Vegan',sortBy:'time-asc'}).filteredRecipes;
  assert.deepEqual(Array.from(veganDinners.filter(recipe=>parseInt(recipe.cookingTime,10)<25),recipe=>recipe.code), ['D127','D126']);
  for(const record of evidence.recipes){
    const recipe=catalogue.find(item=>item.id===record.id);
    assert.equal(recipe.servings,1);
    assert.equal(recipe.clinicalReviewPending,true);
    assert.equal(recipe.image,`/images/recipes/${record.code}.webp`);
    assert.equal(catalogue.filter(item=>item.image===recipe.image).length,1);
    assert.ok(existsSync(new URL('../public'+recipe.image,import.meta.url)));
    assert.deepEqual(JSON.parse(JSON.stringify(recipe.ingredients)),record.ingredients.map(({registerKey,grams,...ingredient})=>ingredient));
    for(const [nutrient,total] of Object.entries(record.unroundedTotals)){
      const recalculated=nutrient==='salt' ? record.unroundedTotals.sodium*2.5/1000 : record.ingredients.reduce((sum,line)=>{
        assert.equal(parseFloat(line.quantity),line.grams);
        return sum+foods[line.registerKey].nutrients[nutrient].value*line.grams/100;
      },0);
      assert.ok(Math.abs(recalculated-total)<1e-8,`${record.code} ${nutrient}`);
      const precision=nutrient==='salt' ? 2 : recipe.nutrition[nutrient].endsWith(' g') ? 1 : 0;
      assert.equal(parseFloat(recipe.nutrition[nutrient]),Number(recalculated.toFixed(precision)));
    }
  }
});
test('the actual desktop and mobile Clear filters handlers reset cuisine, diet and all previous fields',()=>{
  assert.equal(resets.length,2);
  for(const reset of resets){const fields={},globals={sessionStorage:{removeItem:key=>assert.equal(key,'recipes-filters')}};
    for(const key of Object.keys(defaults).filter(k=>k!=='favouriteRecipeIds'))globals['set'+key[0].toUpperCase()+key.slice(1)]=v=>fields[key]=v;
    evaluate('('+reset+')();',globals);
    assert.equal(JSON.stringify(fields),JSON.stringify({searchText:'',selectedMealType:'All',selectedProtein:'All',selectedDiet:'All',selectedCuisine:'All',showFavourites:false,sortBy:'default'}));
  }
  assert.equal((source.match(/selectedCuisine !== "All" \|\|/g)||[]).length,2);
  assert.equal((source.match(/selectedDiet !== "All" \|\|/g)||[]).length,2);
});
test('cuisine survives return navigation; malformed or stale saved cuisine safely defaults to All',()=>{
  assert.match(saveDependencies,/selectedCuisine/);
  let saved;
  evaluate('('+save+')();',{...defaults,selectedCuisine:'Chinese',filtersLoaded:true,plannerFilterRef:{current:false},sessionStorage:{setItem:(_key,value)=>saved=JSON.parse(value)}});
  assert.equal(saved.selectedCuisine,'Chinese');
  for(const [value,expected] of [['Chinese','Chinese'],['Unknown cuisine','All'],[17,'All']]){
    const fields={},globals={URLSearchParams,window:{location:{search:''}},cuisineOptions:cuisine.recipeCuisineOptions(catalogue),DIET_TYPES:diets.DIET_TYPES,plannerFilterRef:{current:false},sessionStorage:{getItem:key=>key==='recipes-filters'?JSON.stringify({...saved,selectedCuisine:value}):null}};
    for(const key of [...Object.keys(defaults).filter(k=>k!=='favouriteRecipeIds'),'filtersLoaded'])globals['set'+key[0].toUpperCase()+key.slice(1)]=v=>fields[key]=v;
    evaluate('('+restore+')();',globals);assert.equal(fields.selectedCuisine,expected);
  }
});
test('nutrition, photos, identifiers, ingredients, instructions and all non-discovery fields match the production baseline',()=>{
  const previous=['breakfasts','lunches','dinners'].flatMap(n=>evaluate(execFileSync('git',['show',audit.baselineCommit+':data/RecipeData/'+n+'.ts'],{encoding:'utf8',maxBuffer:1e7}))[n]);
  const protect=({cuisine,dietCategories,...r})=>r;
  for(const r of catalogueBeforePhotoCorrection){const old=previous.find(x=>x.id===r.id);assert.ok(old,r.id);assert.equal(JSON.stringify(protect(r)),JSON.stringify(protect(old)),r.code);
    for(const tag of old.dietCategories??[])assert.ok(r.dietCategories.includes(tag),r.code+' existing '+tag);
  }
  for(const record of audit.recipes){const r=catalogue.find(x=>x.code===record.code);assert.equal(createHash('sha256').update(JSON.stringify(protect(r))).digest('hex'),record.protectedContentSha256);}
  // A high mineral value never removes an otherwise tagged recipe.
  const tagged=catalogue.find(r=>r.code==='L119');assert.ok(diets.matchesDietFilter({...tagged,nutrition:{potassium:'99999 mg',phosphate:'99999 mg',calories:'99999 kcal'}},'Blue Zone-inspired'));
});
test('both existing cuisine controls retain their SEO link and responsive theme-compatible fields',()=>{
  assert.equal(cuisineFields.length,2);assert.match(source,/grid grid-cols-1 gap-4 md:grid-cols-3/);
  assert.ok(source.includes('w-[min(720px,calc(100vw-16rem))]')); // Leave room for the adjacent favourites control.
  assert.doesNotMatch(source,/md:col-span-4/); // Do not create an implicit fourth track in the three-column panel.
  for(const [index,field] of cuisineFields.entries()){
    const view=evaluate('exports.view=('+field+');',{React,Link:({children,href,...props})=>React.createElement('a',{href,...props},children),selectedCuisine:'All',setSelectedCuisine(){},cuisineOptions:cuisine.recipeCuisineOptions(catalogue),require:name=>{assert.equal(name,'react/jsx-runtime');return jsxRuntime;}}).view;
    const html=renderToStaticMarkup(view);assert.match(html,/All cuisines/);assert.equal((html.match(/<option/g)||[]).length,Object.keys(counts).length+1);
    assert.ok(html.includes('href="/kidney-friendly-chinese-recipes"'));assert.match(html,/dark:text-green-300/);assert.match(html,/w-full min-w-0 rounded-xl/);
    assert.ok(html.includes('recipe-cuisine-'+(index===0?'desktop':'mobile')));
  }
});
