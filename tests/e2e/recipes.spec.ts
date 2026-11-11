import { test, expect, capture, checkLayout } from './fixtures';
import { breakfasts } from '../../data/RecipeData/breakfasts';
import { lunches } from '../../data/RecipeData/lunches';
import { dinners } from '../../data/RecipeData/dinners';

// Exercise actual catalogue extremes, rather than specially shortened fixtures.
const catalogue = [...breakfasts, ...lunches, ...dinners];
const longestName = [...catalogue].sort((a, b) => b.name.length - a.name.length)[0];
const mostIngredients = [...catalogue].sort((a, b) => b.ingredients.length - a.ingredients.length)[0];
const longestMethod = [...catalogue].sort((a, b) => b.method.join('').length - a.method.join('').length)[0];
for (const [caseName, recipe] of [['long title', longestName], ['many ingredients', mostIngredients], ['long method', longestMethod]] as const) {
  test(`recipe with ${caseName} fits with an expanded guide and larger text`, async ({ page }, info) => {
    await page.goto(`/recipes/${recipe.id}`);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(recipe.name);
    await expect(page.locator('#recipe-ingredients + span')).toContainText('serving');
    const guide = page.locator('details[aria-labelledby="recipe-guide"]');
    await expect(guide).toBeVisible();
    const summary = guide.locator('summary');
    // Focusing freezes automatic fitting while the reader makes a choice.
    await summary.focus();
    if (await guide.getAttribute('open') !== null) {
      await page.keyboard.press('Enter');
      await expect(guide).not.toHaveAttribute('open');
    }
    await page.keyboard.press('Enter');
    await expect(guide).toHaveAttribute('open', '');
    await capture(page, info, `${recipe.code}-expanded-guide`);
    // Text-only enlargement complements the narrow viewport's browser reflow.
    await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
    await checkLayout(page);
    await capture(page, info, `${recipe.code}-large-text`);
    await guide.locator('summary').focus();
    await page.keyboard.press('Enter');
    await expect(guide).not.toHaveAttribute('open');
    await expect(guide.locator('summary')).toBeFocused();
    await expect(page.getByRole('button', { name: 'Add to Planner', exact: true })).toBeVisible();
  });
}
