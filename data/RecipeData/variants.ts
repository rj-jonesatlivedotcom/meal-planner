const variantPairs = [
  {
    primary: "egg-tomato-onion-toast",
    variation: "egg-tomato-onion-buttered-toast",
    primaryLabel: "Tomato and onion toast with added egg whites",
    variationLabel: "Buttered toast with one whole egg",
  },
  {
    primary: "creamy-chicken-pasta",
    variation: "chicken-onion-pasta",
    primaryLabel: "Creamier chicken pasta",
    variationLabel: "Chicken pasta with more onion",
  },
  {
    primary: "lentil-bobotie-with-rice",
    variation: "lentil-and-walnut-bobotie-with-rice",
    primaryLabel: "Lentil and walnut bobotie with a smaller portion of lentils and rice",
    variationLabel: "Lentil and walnut bobotie with a larger portion of lentils and rice",
  },
  {
    primary: "chicken-leek-couscous-bowl",
    variation: "chicken-leek-couscous-lemon",
    primaryLabel: "Lunch bowl with 100 g chicken",
    variationLabel: "Dinner bowl with 50 g chicken",
    keepBothInBrowse: true,
  },
  {
    primary: "salmon-and-egg-breakfast-cup",
    variation: "salmon-and-egg-bake",
    primaryLabel: "Breakfast cup with 70 g salmon",
    variationLabel: "Dinner bake with 140 g salmon",
    keepBothInBrowse: true,
  },
];

const hiddenBrowseIds = new Set([
  "ham-lettuce-sandwich",
  ...variantPairs.filter((pair) => !pair.keepBothInBrowse).map((pair) => pair.variation),
]);

export function isPublicBrowseRecipe(id: string) {
  return !hiddenBrowseIds.has(id);
}

export function getRecipeVariation(id: string) {
  const pair = variantPairs.find((item) => item.primary === id || item.variation === id);
  if (!pair) return undefined;

  return pair.primary === id
    ? { id: pair.variation, label: pair.variationLabel }
    : { id: pair.primary, label: pair.primaryLabel };
}
