import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import React from 'react';
import * as jsxRuntime from 'react/jsx-runtime';
import {renderToStaticMarkup} from 'react-dom/server';
const read = path => fs.readFileSync(new URL('../'+path,import.meta.url),'utf8');
const catalog = JSON.parse(read('data/dietaryGuides.json'));
function load(path, require = () => { throw new Error('Unexpected import'); }) {
  const exports = {};
  vm.runInNewContext(ts.transpileModule(read(path), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true, jsx: ts.JsxEmit.ReactJSX },
  }).outputText, { exports, require, URL });
  return exports;
}
const recipes = ['breakfasts', 'lunches', 'dinners'].flatMap(category =>
  load(`data/RecipeData/${category}.ts`)[category]);
const guide = load('lib/dietaryGuides.ts', name => {
  assert.equal(name, '@/data/dietaryGuides.json'); return catalog;
});
const {getDietaryGuide,getDietaryGuideSections,getDietaryGuideReferences,neutralDietaryGuide,dietaryGuideFingerprint}=guide;
const byCode = code => recipes.find(recipe => recipe.code === code);
const plain = x => JSON.parse(JSON.stringify(x));

test('all 310 entries match current recipes without requiring a word or section count', () => {
  assert.equal(recipes.length,310);
  assert.equal(Object.keys(catalog).length, recipes.length);
  for (const recipe of recipes) {
    const entry=catalog[recipe.id];
    assert.ok(entry, recipe.code);
    assert.equal(entry.fingerprint, dietaryGuideFingerprint(recipe), recipe.code);
    assert.equal(getDietaryGuide(recipe), entry.text ?? neutralDietaryGuide);
    const sections=getDietaryGuideSections(getDietaryGuide(recipe));
    assert.equal(new Set(sections.map(s=>s.title)).size,sections.length,recipe.code);
    for(const s of sections){assert.ok(s.text.trim());assert.doesNotMatch(s.text,/keep its portion separate|Choose the trade-off against the whole day|nutritionally neutral|main potassium contributor|main phosphorus contributor|clinically reviewed/i,recipe.code);}
    for(const url of getDietaryGuideReferences(recipe))assert.equal(new URL(url).protocol,'https:');
  }
});

test('original reference provenance and recipe fingerprints are preserved for every entry',()=>{
 const previous=JSON.parse(execFileSync('git',['show','HEAD:data/dietaryGuides.json'],{encoding:'utf8',maxBuffer:10*1024*1024}));
 for(const r of recipes){assert.equal(catalog[r.id].fingerprint,previous[r.id].fingerprint);assert.deepEqual(catalog[r.id].references,previous[r.id].references);}
});

test('changed ingredients, quantities, method, servings and unknown recipes hide both guidance and links', () => {
  const original = byCode('D040');
  assert.notEqual(getDietaryGuide(original), neutralDietaryGuide);
  for (const change of [
    { ingredients: original.ingredients.slice(1) },
    { ingredients: original.ingredients.map((item, i) => i === 0 ? { ...item, quantity: '999 g' } : item) },
    { method: ['Bake the potatoes without boiling.'] },
    { servings: original.servings + 1 },
    { id: 'unknown-recipe' },
  ]) {assert.equal(getDietaryGuide({ ...original, ...change }), neutralDietaryGuide);assert.equal(getDietaryGuideReferences({...original,...change}).length,0);}
});

test('editorial headings support zero, one or several sections and ignore empty headings', () => {
 assert.deepEqual(plain(getDietaryGuideSections('Protein: Extra whites add protein.')), [{title:'Protein',text:'Extra whites add protein.'}]);
 assert.deepEqual(plain(getDietaryGuideSections('Protein:  \n\nSalt and flavour: Lemon adds sharpness.')), [{title:'Salt and flavour',text:'Lemon adds sharpness.'}]);
 assert.deepEqual(plain(getDietaryGuideSections('  \n\n ')),[]);
 assert.deepEqual(plain(getDietaryGuideSections(neutralDietaryGuide)),[]);
 assert.deepEqual(plain(getDietaryGuideSections('A useful untitled note.')), [{title:'About this meal',text:'A useful untitled note.'}]);
 assert.equal(getDietaryGuideSections('Fibre: Oats supply fibre.\n\nCooking and adaptations: Toast the oats.').length,2);
});

test('potato claims match the actual method and never invent a reduction figure', () => {
 for(const code of ['L028','L029','L030','D023','D040']){
  const r=byCode(code),text=getDietaryGuide(r);
  assert.match(r.ingredients.map(i=>i.item).join(' '),/potato/i);
  assert.match(r.method.join(' '),/boil/i);assert.match(r.method.join(' '),/drain|discard/i);
  assert.match(text,/boil/i);assert.match(text,/drain|discard/i);assert.doesNotMatch(text,/\d+\s*(%|mg)/i);
 }
 for(const code of ['L025','L026','L027']){
  assert.match(byCode(code).method.join(' '),/microwave/i);
  assert.match(getDietaryGuide(byCode(code)),/microwav/i);
  assert.match(getDietaryGuide(byCode(code)),/different|not boiled|not boil|not remove/i);
 }
});

test('representative ingredient claims match actual dishes, including plant and animal meals',()=>{
 for(const r of recipes){
  const text=getDietaryGuide(r),items=r.ingredients.map(i=>i.item).join(' ');
  if(text.includes('The mixture uses extra whites')){assert.match(items,/whole egg/i);assert.match(items,/egg white/i);}
  if(text.includes('The seitan is made'))assert.match(items,/vital wheat gluten/i);
  if(text.includes('regular tofu set with calcium sulphate'))assert.match(items,/tofu.*calcium sulphate/i);
  if(text.includes('This version has no plant accompaniment')){assert.ok(r.ingredients.every(i=>/salmon|cod|beef|chicken|whole egg|butter|water/i.test(i.item)),r.code);}
  if(text.includes('The potato weight is for'))assert.match(items,/potato.*boiled.*drained/i);
  if(text.includes('The beans contribute'))assert.match(items,/beans/i);
  if(text.includes('The lentils contribute'))assert.match(items,/lentils/i);
 }
 assert.match(getDietaryGuide(byCode('L007')),/egg/i);assert.doesNotMatch(getDietaryGuide(byCode('L007')),/ham/i);
 assert.match(getDietaryGuide(byCode('D101')),/Cheddar/);assert.doesNotMatch(getDietaryGuide(byCode('D101')),/no dietary fibre/);
 assert.match(getDietaryGuide(byCode('D071')),/commercial red curry paste/);
 assert.doesNotMatch(getDietaryGuide(byCode('B051')),/milk.*used|salted nut topping/);
});

// Render the real page with inert navigation/storage/service/component boundaries.
// This checks disclosure markup, not browser layout or service integrations.
function renderRecipe(recipe){
 const placeholder=()=>null;
 const component=load('app/recipes/[id]/page.tsx',name=>{
  if(name==='react')return React;
  if(name==='react/jsx-runtime')return jsxRuntime;
  if(name==='next/navigation')return {useRouter:()=>({}),useParams:()=>({id:recipe.id})};
  if(name==='next/link')return {__esModule:true,default:({children,href})=>React.createElement('a',{href},children)};
  if(name==='@/data/RecipeData')return {recipes:[recipe]};
  if(name==='@/lib/dietaryGuides')return guide;
  if(name==='@/lib/weeklyPageStorage')return {useWeeklyPageStorage:()=>({})};
  if(name==='@/lib/supabase/client')return {createClient:()=>({})};
  if(name==='@/lib/nutritionEvidence')return load('lib/nutritionEvidence.ts');
  if(name.endsWith('.module.css'))return {__esModule:true,default:new Proxy({},{get:(_,key)=>String(key)})};
  if(name==='@/components/RecipeAllergy')return {RecipeAllergyNotice:placeholder};
  if(name.startsWith('@/components/'))return {__esModule:true,default:placeholder};
  throw Error('Unexpected import '+name);
 }).default;
 return renderToStaticMarkup(React.createElement(component));
}
test('real recipe markup starts all disclosures closed and only renders substantive sections',()=>{
 for(const code of ['B001','B051','B059','L028','L049','L070','L084','D071','D101','D117']){
  const r=byCode(code),html=renderRecipe(r),panel=html.includes('<details class="guidePanel"') ? html.slice(html.indexOf('<details class="guidePanel"')) : null;
  assert.ok(panel,code);assert.doesNotMatch(panel,/<details[^>]*\bopen(?:=|\s|>)/);
  const sections=getDietaryGuideSections(getDietaryGuide(r));
  for(const s of sections)assert.ok(panel.includes('<summary>'+s.title+'</summary>'),code);
  assert.equal((panel.match(/class="guideSection"/g)??[]).length,sections.length+(getDietaryGuideReferences(r).length?1:0),code);
  assert.equal(panel.includes('<summary>Sources</summary>'),getDietaryGuideReferences(r).length>0);
 }
 const incomplete={...byCode('D071'),nutritionIncomplete:['potassium','phosphate'],clinicalReviewPending:true};
 const incompleteHtml=renderRecipe(incomplete);
 assert.match(incompleteHtml,/potassium, phosphorus information is unavailable or incomplete/);
 assert.match(incompleteHtml,/pending renal dietitian review/);
 assert.equal(getDietaryGuide(incomplete),getDietaryGuide(byCode('D071')),'ingredient-only advice does not invent missing values');
 const missing={...incomplete,id:'unreviewed'};
 const html=renderRecipe(missing);assert.match(html,/No recipe-specific notes/);assert.doesNotMatch(html,/<summary>Sources/);assert.doesNotMatch(html,/commercial red curry paste/);
});
