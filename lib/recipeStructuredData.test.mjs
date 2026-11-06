import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import React from 'react';
import * as jsxRuntime from 'react/jsx-runtime';
import { renderToStaticMarkup } from 'react-dom/server';
import { catalogue, evaluate, read, quantities } from './recipeCorrectionTestSupport.mjs';

const instructions = evaluate(read('lib/recipeInstructions.ts'));
const presentation = evaluate(read('lib/recipePresentation.ts'), {require: () => quantities});
const globals = {URL, require: name => {
  if (name === 'react/jsx-runtime') return jsxRuntime;
  if (name === '@/data/RecipeData') return {recipes: catalogue};
  if (name === '@/lib/recipePresentation') return presentation;
  if (name === '@/lib/recipeInstructions') return instructions;
  throw Error(name);
}};
const layout = evaluate(read('app/recipes/[id]/layout.tsx'), globals).default;
const plain = value => JSON.parse(JSON.stringify(value));
async function schema(render, recipe) {
  const html = renderToStaticMarkup(await render({params: Promise.resolve({id: recipe.id}), children: null}));
  const scripts = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  assert.equal(scripts.length, 1, recipe.code + ' one Recipe script');
  return JSON.parse(scripts[0][1]);
}

test('step names preserve opening meaning, decimals and short descriptive phrases', () => {
  assert.equal(instructions.recipeStepName('Slice the tomato. Heat a pan.'), 'Slice the tomato');
  assert.equal(instructions.recipeStepName('Add 0.3 g salt; stir well.'), 'Add 0.3 g salt');
  const long = 'Carefully stir the vegetables into the sauce until everything is evenly coated and warmed through';
  const name = instructions.recipeStepName(long);
  assert.ok(name.length <= 80);
  assert.ok(long.startsWith(name.slice(0, -1)));
  assert.ok(name.endsWith('…'));
});

test('catalogue schemas retain existing data and only add supported cuisine and step metadata', async () => {
  for (const recipe of catalogue) {
    const before = JSON.stringify(recipe);
    const json = await schema(layout, recipe);
    const old = {
      '@context': 'https://schema.org', '@type': 'Recipe',
      name: recipe.name, description: recipe.description,
      image: [`https://www.renalplan.com${recipe.image}`],
      url: `https://www.renalplan.com/recipes/${recipe.id}`,
      author: {'@type': 'Organization', name: 'RenalPlan', url: 'https://www.renalplan.com'},
      publisher: {'@type': 'Organization', name: 'RenalPlan', url: 'https://www.renalplan.com'},
      recipeCategory: recipe.category,
      recipeYield: `${recipe.servings} ${recipe.servings === 1 ? 'serving' : 'servings'}`,
      totalTime: `PT${recipe.cookingTime.match(/(\d+)/)[1]}M`,
      recipeIngredient: plain(recipe.ingredients.map(ingredient => {
        const shown = presentation.presentIngredient(ingredient);
        return `${shown.quantity} ${shown.name}`;
      })),
      recipeInstructions: plain(presentation.presentMethods(recipe.method).map((text, index) => ({
        '@type': 'HowToStep', position: index + 1, text,
      }))),
      nutrition: {
        '@type': 'NutritionInformation', calories: recipe.nutrition.calories,
        proteinContent: recipe.nutrition.protein, carbohydrateContent: recipe.nutrition.carbohydrates,
        fatContent: recipe.nutrition.fat, fiberContent: recipe.nutrition.fibre,
        sodiumContent: recipe.nutrition.sodium,
      },
    };
    const {recipeCuisine, ...unchanged} = json;
    unchanged.recipeInstructions = json.recipeInstructions.map(({name, url, ...step}) => step);
    assert.deepEqual(unchanged, old, recipe.code + ' existing schema preserved');
    assert.equal(recipeCuisine, recipe.cuisine && recipe.cuisine !== 'Simple cooking' ? recipe.cuisine : undefined, recipe.code);
    assert.ok(!('video' in json));
    for (const [index, step] of json.recipeInstructions.entries()) {
      assert.equal(step['@type'], 'HowToStep');
      assert.ok(step.name.trim() && step.name.length <= 80, recipe.code);
      assert.equal(step.text, presentation.presentMethods(recipe.method)[index]);
      assert.equal(step.url, `https://www.renalplan.com/recipes/${recipe.id}#${instructions.recipeStepId(index)}`);
      assert.ok(!('image' in step) && !('video' in step));
    }
    assert.equal(json.image[0], new URL(recipe.image, 'https://www.renalplan.com').href);
    assert.ok(fs.existsSync(new URL('../public' + recipe.image, import.meta.url)), recipe.code + ' actual photo exists');
    assert.equal(JSON.stringify(recipe), before, recipe.code + ' catalogue untouched');
  }
});

test('breakfast, lunch and dinner deep links target the actual rendered instruction and keep its appearance', async () => {
  // Render the method list directly from the page source; it has no hooks or account dependencies.
  const source = read('app/recipes/[id]/page.tsx');
  const methodList = source.match(/<ol className=\{styles.method\}>[\s\S]*?<\/ol>/)[0];
  const renderMethod = evaluate(`export default (recipe) => (${methodList});`, {
    ...globals, styles: {method: 'method'}, ...presentation, ...instructions,
  }).default;
  const previousList = methodList.replace(' id={recipeStepId(index)}', '');
  const renderPrevious = evaluate(`export default (recipe) => (${previousList});`, {
    ...globals, styles: {method: 'method'}, ...presentation,
  }).default;
  for (const code of ['B001', 'L049', 'D053']) {
    const recipe = catalogue.find(item => item.code === code);
    const html = renderToStaticMarkup(renderMethod(recipe));
    const json = await schema(layout, recipe);
    assert.equal(html.replace(/ id="recipe-step-\d+"/g, ''), renderToStaticMarkup(renderPrevious(recipe)));
    for (const step of json.recipeInstructions) {
      const id = new URL(step.url).hash.slice(1);
      assert.equal(html.split(`id="${id}"`).length - 1, 1);
      const text = renderToStaticMarkup(React.createElement('p', null, step.text));
      assert.ok(html.includes(`id="${id}"><span aria-hidden="true">${step.position}</span>${text}</li>`));
    }
  }
  // Ancestor layouts add WebSite/ItemList schemas, never another Recipe.
  for (const file of ['app/layout.tsx', 'app/recipes/layout.tsx', 'app/recipes/[id]/page.tsx']) {
    assert.doesNotMatch(read(file), /["']@type["']\s*:\s*["']Recipe["']/);
  }
});
