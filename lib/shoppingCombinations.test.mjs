import test from 'node:test';
import assert from 'node:assert/strict';
import {shoppingHarness, catalogue} from './recipeCorrectionTestSupport.mjs';

const shop = shoppingHarness();
const recipe = (id, item, quantity, shoppingByWeight = false) => ({
  id, servings: 1, shoppingByWeight, ingredients: [{item, quantity}],
});

test('reported mixed quantities combine before purchase rounding in either recipe order', () => {
  const cases = [
    ['Cucumber', '2', '40 g', '2½'],
    ['Lemon juice', '35 ml', '70 g', '105 ml'],
    ['Onion', '2', '65 g', '4'],
    ['Olive oil', '55 ml', '134 g', '13¾ tbsp'],
    ['Rapeseed oil', '13 ml', '15 g', '2 tbsp'],
    ['Dried thyme', '1/2 tsp', '1/2 g', '1 tsp'],
    ['Fresh parsley', '2 g, finely chopped', '7 g', '9 g'],
  ];
  for (const [item, first, second, expected] of cases) {
    const recipes = [recipe('legacy', item, first), recipe('weighed', item, second, true)];
    const before = JSON.stringify(recipes);
    for (const order of [recipes, [...recipes].reverse()]) {
      assert.deepEqual(shop.run(order).list, [{item, quantity: expected}], item);
    }
    assert.equal(JSON.stringify(recipes), before, 'source data preserved');
  }
});

test('shopping names omit preparation while retaining the purchased ingredient', () => {
  for (const [source, expected] of [
    ['Eating apple, flesh and skin, core removed', 'Eating apple'],
    ['Navy beans, boiled without salt and drained', 'Navy beans'],
    ['Beef sirloin, lean and fat', 'Beef sirloin'],
    ['Green or brown lentils, boiled without salt and drained', 'Green or brown lentils'],
  ]) {
    const rows = shop.run([recipe('one', source, '90 g', true)]).list;
    assert.deepEqual(rows, [{item: expected, quantity: '90 g'}]);
  }
});

test('household scaling and repeated entries retain every requirement until final rounding', () => {
  const recipes = [recipe('a', 'Onion', '3'), recipe('b', 'Onion', '3'), recipe('c', 'Onion', '65 g', true)];
  assert.equal(shop.run(recipes).list[0].quantity, '8');
  assert.equal(shop.run([recipe('a', 'Dried thyme', '0.5 g', true)], {a: 4}).list[0].quantity, '2 tsp');
  const oil = shop.run([recipe('a', 'Olive oil', '1 tsp'), recipe('b', 'Olive oil', '4.5 g', true)]).list[0];
  assert.equal(oil.quantity, '2 tsp');
});

test('current catalogue quantities have no leaked preparation in parsley units or mixed oil units', () => {
  const before = JSON.stringify(catalogue);
  const rows = shop.run(catalogue).list;
  for (const row of rows.filter(row => /\boil\b/i.test(row.item))) {
    assert.match(row.quantity, /^\S+ (?:tsp|tbsp)$/u, row.item);
  }
  const parsley = rows.find(row => row.item === 'Fresh parsley');
  assert.match(parsley.quantity, /^\S+ g$/u);
  assert.equal(JSON.stringify(catalogue), before);
});
