import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import React from 'react';
import * as jsxRuntime from 'react/jsx-runtime';
import {renderToStaticMarkup} from 'react-dom/server';
import {catalogue,evaluate,read,quantities,shoppingHarness} from './recipeCorrectionTestSupport.mjs';

const presentation=evaluate(read('lib/recipePresentation.ts'),{require:name=>{
  assert.equal(name,'./recipeQuantities');return quantities;
}});
const {presentIngredient,presentIngredientName,presentMethods,kitchenEquivalent}=presentation;
const plain=x=>JSON.parse(JSON.stringify(x));
const technical=/edible (?:input|weight|portion)|weighed grams|as sold|CoFID|specification|conditional generic|nutrient reduction|defatting assumption|record.*revision|input-weight|requires.*review/i;

test('all 310 ingredient and method presentations remove internal annotations without mutating source objects',()=>{
  assert.equal(catalogue.length,310);
  let converted=0;
  for(const recipe of catalogue){
    const before=JSON.stringify(recipe);
    for(const ingredient of recipe.ingredients){
      const shown=presentIngredient(ingredient);
      assert.doesNotMatch(JSON.stringify(shown),technical,recipe.code);
      assert.ok(shown.name&&shown.quantity,recipe.code);
      if(shown.quantity.startsWith('Approx.')){
        converted++;
        const weight=ingredient.quantity.match(/^(\d+(?:\.\d+)?)\s*g/)[1];
        assert.ok(shown.quantity.includes(`(${weight} g)`),recipe.code+' exact source weight');
      }
      const componentNote=ingredient.quantity.match(/\(([^)]+;[^)]+)\)/)?.[1];
      if(componentNote)assert.ok(shown.component,recipe.code+' source component retained');
    }
    const methods=presentMethods(recipe.method).join(' ');
    assert.doesNotMatch(methods,technical,recipe.code);
    // All cooking amounts, durations and temperature values survive presentation.
    for(const value of recipe.method.join(' ').matchAll(/\b\d+(?:\.\d+)?\s*(?:g\b|°C|minutes\b|seconds\b|hours\b)/g)){
      assert.ok(methods.includes(value[0]),recipe.code+' retained '+value[0]);
    }
    assert.equal(JSON.stringify(recipe),before,recipe.code+' source untouched');
  }
  assert.ok(converted>800);
});

test('ingredient-specific measures retain exact grams and meaningful parenthetical notes',()=>{
  assert.equal(presentIngredient({item:'Ground cumin',quantity:'0.6 g (raw edible input; tikka)'}).quantity,'Approx. ¼ tsp (0.6 g)');
  assert.deepEqual(plain(presentIngredient({item:'Garlic',quantity:'6 g (raw edible input; bread finish)'})),{name:'Garlic',quantity:'Approx. 2 cloves (6 g)',component:'bread finish'});
  assert.equal(kitchenEquivalent('Onion',55),'½ medium onion');
  assert.equal(kitchenEquivalent('Carrot',61),'1 medium carrot');
  assert.equal(kitchenEquivalent('Tomato',123),'1 medium tomato');
  assert.equal(kitchenEquivalent('Olive oil',10),'2¼ tsp');
  assert.equal(kitchenEquivalent('Lemon juice',15),'1 tbsp');
  assert.equal(kitchenEquivalent('Drinking tap water',150),'150 ml');
  for(const item of ['Chicken breast','Plain flour','Rice','Saffron','Active dry yeast','Fresh coriander leaves','Full-fat canned coconut milk'])assert.equal(kitchenEquivalent(item,0.1),null,item);
  assert.equal(presentIngredient({item:'Beef mince (5% fat)',quantity:'150 g'}).name,'Beef mince (5% fat)');
  assert.equal(presentIngredient({item:'Cornflour (maize starch)',quantity:'10 g'}).name,'Cornflour (maize starch)');
  assert.match(presentIngredient({item:'Beans',quantity:'80 g (cooked drained edible weight)'}).quantity,/cooked drained/);
  assert.match(presentIngredient({item:'Tofu',quantity:'100 g (as sold edible weight, unpressed)'}).quantity,/unpressed/);
  assert.match(presentIngredient({item:'Carrot',quantity:'61 g (chopped)'}).quantity,/chopped/);
  assert.match(presentIngredient({item:'Beans',quantity:'80 g (chopped; drained)'}).quantity,/chopped; drained/);
  assert.match(presentIngredient({item:'Rice',quantity:'50 g (raw)'}).quantity,/raw/);
  const plantain=presentIngredient({item:'Ripe plantain flesh',quantity:'230 g (plantain; raw ripe flesh)'});
  assert.equal(plantain.component,'plantain');
  assert.match(plantain.quantity,/raw ripe flesh/);
  assert.equal(presentIngredient({item:'Active dry yeast',quantity:'0.15 g (dry; requires 0.1 g scales; hoppers)'}).component,'hoppers');
});

test('component allocations and egg coating weights stay separate',()=>{
  const recipe=catalogue.find(r=>r.code==='L051');
  const shown=recipe.ingredients.map(presentIngredient);
  assert.ok(shown.some(i=>i.component==='flatbreads'));
  assert.ok(shown.some(i=>i.component==='egg coating'));
  const method=presentMethods(recipe.method).join(' ');
  assert.match(method,/two 2.5 g portions/);
  assert.match(method,/50 g beaten egg/);
  assert.match(method,/100 g shelled egg/);
});

test('public JSON-LD uses the same clean presentation for all 310 recipes',async()=>{
  const layout=evaluate(read('app/recipes/[id]/layout.tsx'),{require:name=>{
    if(name==='react/jsx-runtime')return jsxRuntime;
    if(name==='@/data/RecipeData')return {recipes:catalogue};
    if(name==='@/lib/recipePresentation')return presentation;
    throw Error(name);
  }}).default;
  for(const recipe of catalogue){
    const html=renderToStaticMarkup(await layout({params:Promise.resolve({id:recipe.id}),children:React.createElement('div')}));
    const json=JSON.parse(html.match(/<script[^>]*>([\s\S]*?)<\/script>/)[1]);
    assert.doesNotMatch(JSON.stringify([json.recipeIngredient,json.recipeInstructions]),technical,recipe.code);
    assert.equal(json.recipeIngredient.length,recipe.ingredients.length,recipe.code);
    assert.deepEqual(json.recipeInstructions.map(s=>s.text),plain(presentMethods(recipe.method)),recipe.code);
  }
});

test('source data and shopping quantities for 1, 2 and 4 people remain identical to the current committed catalogue',()=>{
  const shop=shoppingHarness();
  for(const category of ['breakfasts','lunches','dinners']){
    const path=`data/RecipeData/${category}.ts`;
    const committed=execFileSync('git',['show',`HEAD:${path}`],{encoding:'utf8',maxBuffer:1e7});
    assert.equal(read(path).replace(/\r\n/g,'\n'),committed.replace(/\r\n/g,'\n'),path);
    const originals=evaluate(committed)[category];
    for(const recipe of originals){
      const current=catalogue.find(r=>r.id===recipe.id);
      for(const people of [1,2,4]){
        const result=shop.run([current],{[recipe.id]:people});
        assert.deepEqual(result,shop.run([recipe],{[recipe.id]:people}),recipe.code+' shopping for '+people);
        assert.doesNotMatch(JSON.stringify(result.list.map(row=>({...row,item:presentIngredientName(row.item)}))),technical,recipe.code+' public shopping rows');
      }
    }
  }
  for(const path of ['data/dietaryGuides.json','data/dietaryGuideInstallation.json']){
    assert.equal(read(path).replace(/\r\n/g,'\n'),execFileSync('git',['show',`HEAD:${path}`],{encoding:'utf8',maxBuffer:1e7}).replace(/\r\n/g,'\n'),path);
  }
});

test('shopping screens and downloadable checklists clean names only at render time',()=>{
  const source=read('app/shopping/page.tsx');
  assert.ok(source.includes('{presentIngredientName(item.item)}'));
  assert.ok(source.includes('escapeHtml(presentIngredientName(item.item))'));
  assert.ok(source.includes('checkedItems.includes(item.item)'));
  assert.ok(source.includes('{item.quantity}'));
});
