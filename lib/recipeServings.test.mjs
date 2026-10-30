import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {catalogue,evaluate,read,shoppingHarness} from './recipeCorrectionTestSupport.mjs';
const before=['breakfasts','lunches','dinners'].flatMap(name=>evaluate(execFileSync('git',['show',`fec1970581529f46e90fb879890a389051b75a8e:data/RecipeData/${name}.ts`],{encoding:'utf8'}))[name]);
const plain=value=>JSON.parse(JSON.stringify(value));
const isNew=r=>Number(r.code.slice(1))>({B:50,L:48,D:52}[r.code[0]]??Infinity);
const added=catalogue.filter(isNew);
test('all 50 additions make exactly one serving with half the prior batch ingredients and unchanged per-serving nutrition',()=>{
 assert.equal(added.length,50);
 for(const recipe of added){
  const original=before.find(r=>r.code===recipe.code);assert.equal(original.servings,2);assert.equal(recipe.servings,1,recipe.code);
  assert.equal(recipe.ingredients.length,original.ingredients.length);
  for(let index=0;index<recipe.ingredients.length;index++){
   const a=recipe.ingredients[index],b=original.ingredients[index];
   const match=b.quantity.match(/^(\d+(?:\.\d+)?)( (?:g|ml)\b.*)$/);assert.ok(match,b.quantity);
   assert.equal(a.quantity,`${Number((Number(match[1])/2).toFixed(8))}${match[2]}`,recipe.code+' '+a.item);
   assert.deepEqual(plain({...a,quantity:undefined}),plain({...b,quantity:undefined}));
  }
  const unchanged=r=>{const {ingredients,method,servings,equipment,...rest}=r;return plain(rest);};
  assert.deepEqual(unchanged(recipe),unchanged(original),recipe.code+' nutrition/status/image changed');
  assert.ok(!recipe.method.some(s=>/Serve half|serve half|between two (?:plates|bowls|platters|large bowls|deep bowls)/.test(s)),recipe.code);
  const safety=original.method.filter(s=>s.startsWith('Cook poultry,'));for(const step of safety)assert.ok(recipe.method.includes(step),recipe.code+' safety text');
 }
});
test('all original 150 recipe records and guide entries are unchanged',()=>{
 const original=catalogue.filter(r=>!isNew(r));assert.equal(original.length,150);
 const guides=JSON.parse(read('data/dietaryGuides.json'));
 const previousGuides=JSON.parse(execFileSync('git',['show','fec1970581529f46e90fb879890a389051b75a8e:data/dietaryGuides.json'],{encoding:'utf8'}));
 for(const recipe of original){assert.deepEqual(plain(recipe),plain(before.find(r=>r.id===recipe.id)),recipe.code);assert.deepEqual(guides[recipe.id],previousGuides[recipe.id]);}
});
test('shopping amounts remain identical for the same number of people after batch normalization',()=>{
 const shop=shoppingHarness();
 for(const recipe of added){
  const original=before.find(r=>r.id===recipe.id);
  for(const people of [1,2,4])assert.deepEqual(shop.run([recipe],{[recipe.id]:people}),shop.run([original],{[recipe.id]:people}),recipe.code+' for '+people);
 }
});
test('method counts and weighed references match the one-person batch',()=>{
 const method=code=>added.find(r=>r.code===code).method.join(' ');
 assert.match(method('L049'),/one flatbread/);assert.match(method('L049'),/40 g weighed lukewarm water/);
 assert.match(method('L050'),/two 45 g pittas/);assert.match(method('L051'),/100 g shelled egg/);assert.match(method('L051'),/two 2.5 g portions/);assert.match(method('L051'),/50 g beaten egg/);
 assert.match(method('L052'),/four to five hoppers/);assert.match(method('L054'),/three equal oval kofta/);
 assert.match(method('L057'),/110 g shelled eggs, approximately two large eggs/);assert.match(method('L058'),/12 equal portions/);
 assert.match(method('L059'),/one 1.5 cm thick cutlet/);assert.match(method('L062'),/120 g baguette portion/);
 assert.match(method('D060'),/one 30 cm oval/);assert.match(method('D069'),/17.5 ml, not 17.5 g/);assert.match(method('D069'),/per 100 ml/);
 assert.match(method('D080'),/25 g of the 350 g listed water/);assert.match(method('D080'),/remaining 325 g water/);
});
