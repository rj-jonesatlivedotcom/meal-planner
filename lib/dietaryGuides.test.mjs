import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import test from 'node:test';
import assert from 'node:assert/strict';

const catalog = JSON.parse(fs.readFileSync(new URL('../data/dietaryGuides.json', import.meta.url), 'utf8'));
function load(path, require = () => { throw new Error('Unexpected import'); }) {
  const exports = {};
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(new URL(path, import.meta.url), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
  }).outputText, { exports, require });
  return exports;
}
const recipes = ['breakfasts', 'lunches', 'dinners'].flatMap(category =>
  load(`../data/RecipeData/${category}.ts`)[category]);
const { getDietaryGuide, getDietaryGuideSections, neutralDietaryGuide, dietaryGuideFingerprint } = load('./dietaryGuides.ts', name => {
  assert.equal(name, '@/data/dietaryGuides.json');
  return catalog;
});
const byCode = code => recipes.find(recipe => recipe.code === code);

test('every current recipe has an explicit, current review decision', () => {
  assert.equal(Object.keys(catalog).length, recipes.length);
  for (const recipe of recipes) {
    assert.ok(Object.hasOwn(catalog, recipe.id), recipe.id);
    assert.equal(catalog[recipe.id].fingerprint, dietaryGuideFingerprint(recipe), `Revalidate ${recipe.code}`);
    assert.equal(getDietaryGuide(recipe), catalog[recipe.id].text ?? neutralDietaryGuide);
  }
});

test('changed ingredients, quantities, method, servings and unknown recipes fail closed', () => {
  const original = byCode('D040');
  assert.notEqual(getDietaryGuide(original), neutralDietaryGuide);
  for (const change of [
    { ingredients: original.ingredients.slice(1) },
    { ingredients: original.ingredients.map((item, i) => i === 0 ? { ...item, quantity: '999 g' } : item) },
    { method: ['Bake the potatoes without boiling.'] },
    { servings: original.servings + 1 },
    { id: 'unknown-recipe' },
  ]) assert.equal(getDietaryGuide({ ...original, ...change }), neutralDietaryGuide);
});

test('guide sections only use relevant topics present in verified guide text', () => {
  const sections = getDietaryGuideSections(
    'Oats and milk contribute potassium and phosphorus. The egg adds protein. Compare this portion with your saved My Diet targets.',
  );
  assert.deepEqual(
    JSON.parse(JSON.stringify(sections)),
    [
      { title: 'Potassium and phosphorus', text: 'Oats and milk contribute potassium and phosphorus.' },
      { title: 'Protein', text: 'The egg adds protein.' },
      { title: 'Portions and personal targets', text: 'Compare this portion with your saved My Diet targets.' },
    ],
  );
  assert.deepEqual(
    JSON.parse(JSON.stringify(getDietaryGuideSections('A simple meal note.'))),
    [{ title: 'About this serving', text: 'A simple meal note.' }],
  );
  assert.deepEqual(
    JSON.parse(JSON.stringify(getDietaryGuideSections(neutralDietaryGuide))),
    [],
  );
});

test('current potato guidance matches preparation without promising a quantified potassium reduction', () => {
  const expected = ['L028', 'L029', 'L030', 'D023', 'D040'];
  for (const code of expected) {
    const recipe = byCode(code);
    const guide = getDietaryGuide(recipe);
    assert.notEqual(guide, neutralDietaryGuide);
    assert.match(guide, /boil/i, code);
    assert.match(guide, /drain|discard/i, code);
    assert.match(guide, /potassium|portion|assessment/i, code);
    assert.doesNotMatch(guide, /\b\d+(?:\.\d+)?\s*(?:%|mg)\b/i, code);
    assert.match(recipe.ingredients.map(item => item.item).join(' '), /potato/i);
    assert.match(recipe.method.join(' '), /boil/i);
    assert.match(recipe.method.join(' '), /drain/i);
    assert.equal(getDietaryGuide({ ...recipe, method: ['Bake without boiling or draining.'] }), neutralDietaryGuide);
  }
  for (const code of ['L025', 'L026', 'L027']) {
    const recipe = byCode(code), guide = getDietaryGuide(recipe);
    assert.match(recipe.method.join(' '), /microwave/i);
    assert.match(guide, /microwav|jacket potato/i);
    assert.match(guide, /different|not boiled|do not rely/i);
    assert.doesNotMatch(guide, /can help lower potassium|leaching is accounted for/i);
  }
});

test('obsolete ham advice stays hidden and both layouts use reviewed guidance', () => {
  const eggRecipe = byCode('L007');
  const guide = getDietaryGuide(eggRecipe);
  assert.ok(eggRecipe.ingredients.some(ingredient => /\begg\b/i.test(ingredient.item)));
  assert.ok(eggRecipe.ingredients.every(ingredient => !/\bham\b/i.test(ingredient.item)));
  assert.notEqual(guide, neutralDietaryGuide);
  assert.match(guide, /\begg\b/i);
  assert.doesNotMatch(guide, /\bham\b/i);
  assert.equal(getDietaryGuide({ ...eggRecipe, ingredients: [{ item: 'Ham', quantity: '50 g' }] }), neutralDietaryGuide);
  const page = fs.readFileSync(new URL('../app/recipes/[id]/page.tsx', import.meta.url), 'utf8');
  assert.equal((page.match(/getDietaryGuide\(recipe\)/g) ?? []).length, 1);
  assert.match(page, /getDietaryGuideSections\(getDietaryGuide\(recipe\)\)/);
  assert.match(page, /Discover more about the ingredients in this meal/);
  assert.match(page, /Recipe-specific notes are not available for this meal yet/);
  assert.doesNotMatch(page, /recipe\.dietaryNote|<strong>Purines:/);
});
