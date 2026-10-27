import test from 'node:test';
import assert from 'node:assert/strict';
import {catalogue,evaluate,read} from './recipeCorrectionTestSupport.mjs';
const {getRecipeProteinType:classify,matchesProteinFilter:matches}=evaluate(read('lib/recipeProtein.ts'));
const recipe=(...items)=>({ingredients:items.map(item=>({item}))});
test('poultry grouping preserves Chicken-only and supports turkey and duck',()=>{
  assert.equal(classify(recipe('Chicken breast')),'Chicken');assert.equal(classify(recipe('Turkey breast')),'Poultry');
  assert.ok(matches(recipe('Chicken'),'Poultry'));assert.ok(matches(recipe('Turkey'),'Poultry'));assert.ok(!matches(recipe('Turkey'),'Chicken'));
  for(const i of ['Duck','Turkey bacon','Murgh','Chicken stock'])assert.ok(['Chicken','Poultry'].includes(classify(recipe(i))),i);
});
test('fish/seafood and international canonical aliases match consistently',()=>{
  for(const i of ['Cod fillet','Pollock','Hake','Prawns','Shrimp paste','Squid','Octopus','Mussels','Fish sauce','Nam pla','Nuoc mam','Bonito','Katsuobushi','Surimi'])assert.equal(classify(recipe(i)),'Fish',i);
  assert.equal(classify({ingredients:[{item:'Ikan fillet',shoppingItem:'Fish fillet'}]}),'Fish');
  for(const [i,t]of [['Lamb','Lamb'],['Mutton','Lamb'],['Beef','Beef'],['Pancetta','Pork'],['Pork','Pork']])assert.equal(classify(recipe(i)),t);
});
test('eggs, vegetables and explicit plant replacements stay vegetarian; ambiguous meat stays Other',()=>{
  for(const i of ['Eggs','Egg whites','Eggs, chicken, whole, raw','Duck egg','Oyster mushrooms','Chicken of the woods','Eggplant','Paneer','Tofu','Tempeh','Seitan','Chickpeas','Vegan chicken pieces','Plant-based fish sauce'])assert.equal(classify(recipe(i)),'Vegetarian',i);
  assert.equal(classify({ingredients:[{item:'Vegan chicken pieces',shoppingItem:'Chicken substitute'}]}),'Vegetarian');
  for(const i of ['Dashi','Keema','Meat stock','Goat'])assert.equal(classify(recipe(i)),'Other');
});
test('mixed proteins follow the documented existing precedence in any ingredient order',()=>{
  for(const items of [['Chicken','Lamb'],['Beef','Fish sauce'],['Chicken','Pork'],['Chicken','Beef'],['Chicken','Turkey']]){
    const a=classify(recipe(...items));assert.equal(a,classify(recipe(...items.reverse())));
  }
  assert.equal(classify(recipe('Chicken','Lamb')),'Lamb');assert.equal(classify(recipe('Chicken','Fish sauce')),'Fish');
});
test('entire existing catalogue has stable usable browse classes, including all turkey and egg dishes',()=>{
  assert.equal(catalogue.length,150);const turkeys=catalogue.filter(r=>r.ingredients.some(i=>/\bturkey\b/i.test(i.item)));assert.ok(turkeys.length);
  for(const r of turkeys)assert.ok(matches(r,'Poultry'),r.code);
  for(const r of catalogue)assert.ok(['Chicken','Poultry','Fish','Pork','Beef','Lamb','Vegetarian','Other'].includes(classify(r)),r.code);
  assert.equal(classify(catalogue.find(r=>r.code==='L007')),'Vegetarian');
  const source=read('app/recipes/page.tsx');assert.equal((source.match(/matchesProteinFilter\(recipe, selectedProtein\)/g)||[]).length,2);assert.match(source,/"Poultry"/);assert.match(source,/"Other"/);
});
