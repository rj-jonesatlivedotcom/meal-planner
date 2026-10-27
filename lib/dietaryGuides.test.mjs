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

test('boiling guidance is limited to reviewed potato recipes that boil and drain', () => {
  const expected = ['L028', 'L029', 'L030', 'D023', 'D040'];
  const actual = recipes.filter(recipe => getDietaryGuide(recipe).includes('can help lower potassium'));
  assert.deepEqual(actual.map(recipe => recipe.code), expected);
  for (const recipe of actual) {
    assert.match(recipe.ingredients.map(item => item.item).join(' '), /potato/i);
    assert.match(recipe.method.join(' '), /boil/i);
    assert.match(recipe.method.join(' '), /drain/i);
  }
  for (const code of ['L025', 'L026', 'L027']) {
    assert.match(getDietaryGuide(byCode(code)), /microwaved/);
    assert.doesNotMatch(getDietaryGuide(byCode(code)), /can help lower potassium/);
  }
});

test('obsolete ham advice stays hidden and both layouts use reviewed guidance', () => {
  assert.equal(getDietaryGuide(byCode('L007')), neutralDietaryGuide);
  const page = fs.readFileSync(new URL('../app/recipes/[id]/page.tsx', import.meta.url), 'utf8');
  assert.equal((page.match(/getDietaryGuide\(recipe\)/g) ?? []).length, 1);
  assert.match(page, /getDietaryGuideSections\(getDietaryGuide\(recipe\)\)/);
  assert.match(page, /Discover more about the ingredients in this meal/);
  assert.match(page, /Recipe-specific notes are not available for this meal yet/);
  assert.doesNotMatch(page, /recipe\.dietaryNote|<strong>Purines:/);
});
