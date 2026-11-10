import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import React from 'react';
import * as jsxRuntime from 'react/jsx-runtime';
import {renderToStaticMarkup} from 'react-dom/server';
import {catalogue,evaluate,read,restoreRecipePhotoBeforeCorrection} from './recipeCorrectionTestSupport.mjs';

const pagePath='app/kidney-friendly-chinese-recipes/page.tsx';
const css={__esModule:true,default:new Proxy({},{get:(_,key)=>String(key)})};
const common=name=>{
 if(name==='react/jsx-runtime')return jsxRuntime;
 if(name.endsWith('.module.css'))return css;
 if(name==='./RecipeIcon')return {__esModule:true,default:()=>null};
 throw Error(name);
};
const Nutrition=evaluate(read('components/RecipeNutrition.tsx'),{require:common}).default;
const photos=[];
const page=evaluate(read(pagePath),{require:name=>{
 if(name==='@/data/RecipeData')return {recipes:catalogue};
 if(name==='next/link')return {__esModule:true,default:({href,children,...props})=>React.createElement('a',{...props,href},children)};
 if(name==='@/components/RecipeNutrition')return {__esModule:true,default:Nutrition};
 if(name==='@/components/RecipePhoto')return {__esModule:true,default:props=>{photos.push(props);return React.createElement('img',{src:props.src,alt:props.name});}};
 return common(name);
}});
const html=renderToStaticMarkup(React.createElement(page.default));
const selected=['chicken-fried-rice','chicken-carrot-noodle-stir-fry','steamed-cabbage-mushroom-and-white-bean-buns','ginger-egg-and-carrot-fried-rice'];

test('collection has descriptive indexable metadata and its own canonical',()=>{
 assert.equal(page.metadata.title.absolute,'Kidney-Friendly Chinese Recipes | RenalPlan');
 assert.equal(page.metadata.alternates.canonical,'https://www.renalplan.com/kidney-friendly-chinese-recipes');
 assert.ok(page.metadata.description.length>100);
 assert.equal(page.metadata.robots.index,true);
 assert.equal(page.metadata.robots.follow,true);
 assert.equal(page.metadata.openGraph.url,page.metadata.alternates.canonical);
 assert.equal((html.match(/<h1>/g)||[]).length,1);
 assert.doesNotMatch(read(pagePath),/^['"]use client['"]/m);
});

test('four existing recipes have crawlable named links and unchanged per-serving nutrient figures',()=>{
 const articles=[...html.matchAll(/<article[^>]*>([\s\S]*?)<\/article>/g)].map(m=>m[1]);
 assert.equal(articles.length,4);
 const linked=[...new Set([...html.matchAll(/href="\/recipes\/([^"]+)"/g)].map(m=>m[1]))];
 assert.deepEqual(linked,selected);
 for(let index=0;index<selected.length;index++){
  const recipe=catalogue.find(r=>r.id===selected[index]);
  assert.ok(recipe);
  assert.equal(recipe.servings,1);
  assert.ok(!recipe.conditionalProxyPending);
  assert.equal(recipe.nutritionIncomplete.length,0);
  const article=articles[index];
  assert.ok(article.includes(renderToStaticMarkup(React.createElement('a',{href:'/recipes/'+recipe.id},recipe.name))));
  assert.equal((article.match(/data-nutrient=/g)||[]).length,8);
  for(const key of ['calories','protein','carbohydrates','fat','fibre','salt','potassium','phosphate']){
   assert.ok(article.includes(renderToStaticMarkup(React.createElement('dd',null,recipe.nutrition[key]))),recipe.code+' '+key);
  }
  assert.equal(photos[index].src,recipe.image);
  assert.equal(photos[index].recipeId,recipe.id);
 }
 assert.doesNotMatch(html,/nofollow/);
});

test('copy explains individual needs and estimate status without claiming clinical approval',()=>{
 assert.match(html,/individual dietary requirements/);
 assert.match(html,/ingredient-based estimates/);
 assert.match(html,/Chinese-inspired/);
 assert.match(html,/portion will change/);
 assert.doesNotMatch(html,/safe for everyone|dietitian.approved|clinically verified/i);
 assert.ok(html.includes('href="/about#nutrition-sources-methodology"'));
 assert.ok(html.includes('href="/recipes"'));
 assert.ok(read('app/recipes/page.tsx').includes('href="/kidney-friendly-chinese-recipes"'));
});

test('recipe content and Dietary Guides are preserved across discovery metadata updates',()=>{
 for(const path of ['data/RecipeData/breakfasts.ts','data/RecipeData/lunches.ts','data/RecipeData/dinners.ts','data/dietaryGuides.json']){
  const original=execFileSync('git',['show','HEAD:'+path],{encoding:'utf8',maxBuffer:1e7});
  if(path.endsWith('.ts')) {
    const name=path.split('/').at(-1).replace('.ts','');
    const content=source=>evaluate(source)[name].map(({cuisine,dietCategories,...recipe})=>restoreRecipePhotoBeforeCorrection(recipe));
    assert.equal(JSON.stringify(content(read(path))),JSON.stringify(content(original)),path);
  } else assert.equal(read(path).replace(/\r\n/g,'\n'),original.replace(/\r\n/g,'\n'),path);
 }
});

test('existing sitemap includes the collection once and lists all 317 recipe URLs',()=>{
 const load=source=>evaluate(source,{require:name=>{
  assert.equal(name,'@/data/RecipeData');return {recipes:catalogue};
 }}).default();
 const result=load(read('app/sitemap.ts'));
 const url=page.metadata.alternates.canonical;
 assert.equal(result.filter(entry=>entry.url===url).length,1);
 assert.equal(result.filter(entry=>entry.url.startsWith('https://www.renalplan.com/recipes/')).length,317);
 assert.ok(result.some(entry=>entry.url==='https://www.renalplan.com/recipes/ham-lettuce-sandwich'));
 const committed=load(execFileSync('git',['show','HEAD:app/sitemap.ts'],{encoding:'utf8'}));
 assert.equal(JSON.stringify(result.filter(entry=>entry.url!==url)),JSON.stringify(committed.filter(entry=>entry.url!==url)));
});
