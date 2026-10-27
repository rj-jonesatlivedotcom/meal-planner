type ProteinRecipe = { category?: string; ingredients: { item: string; shoppingItem?: string }[] };
export type ProteinType = "Chicken" | "Poultry" | "Fish" | "Pork" | "Beef" | "Lamb" | "Vegetarian" | "Other";

/** Same mixed-protein priority as the existing browser: lamb, fish, pork, beef, chicken.
 * Poultry adds turkey/duck without changing the existing Chicken-only filter.
 * This is browsing metadata, never evidence of allergen freedom or clinical suitability.
 */
export function getRecipeProteinType(recipe: ProteinRecipe): ProteinType {
  const text = recipe.ingredients
    .filter(i => !/^\s*(?:(?:plant[ -]based|vegan|vegetarian|meat[ -]free)\b|quorn\b)/i.test(i.item))
    .flatMap(i => [i.item, i.shoppingItem ?? ""])
    .join(" ").toLowerCase()
    .replace(/\beggs?,?\s+(chicken|duck|turkey|quail)\b|\b(chicken|duck|turkey|quail)\s+eggs?\b/g, "egg")
    .replace(/\b(?:king\s+)?oyster\s+mushrooms?\b|\bchicken of the woods\b/g, "mushroom")
    .replace(/\b(turkey|chicken)\s+(bacon|ham)\b/g, "$1");
  const category = recipe.category?.toLowerCase();
  if (category === "lamb" || /\b(lamb|mutton)\b/.test(text)) return "Lamb";
  if (category === "fish" || /\b(fish|seafood|shellfish|salmon|tuna|cod|haddock|mackerel|trout|sardines?|anchov(?:y|ies)|herring|pollock|tilapia|hake|plaice|sole|halibut|sea bass|seabass|bream|snapper|prawns?|shrimp|crab|lobster|mussels?|clams?|oysters?|scallops?|squid|octopus|cuttlefish|bonito|katsuobushi|surimi|nam pla|nuoc mam)\b/.test(text)) return "Fish";
  if (category === "pork" || /\b(pork|bacon|ham|pancetta|prosciutto|chorizo|salami|pepperoni|lard)\b/.test(text)) return "Pork";
  if (category === "beef" || /\b(beef|veal)\b/.test(text)) return "Beef";
  if (category === "chicken" || /\b(chicken|hen|murgh)\b/.test(text)) return "Chicken";
  if (category === "poultry" || /\b(turkey|duck|goose|poultry|quail|pheasant)\b/.test(text)) return "Poultry";
  if (/\b(meat|goat|gosht|sausages?|gelatin|gelatine|keema|dashi)\b/.test(text)) return "Other";
  // Eggs and dairy remain Vegetarian. Unknown composite meats are Other above;
  // named international ingredients can supply a canonical shoppingItem alias.
  return "Vegetarian";
}

export function matchesProteinFilter(recipe: ProteinRecipe, selected: string): boolean {
  const type = getRecipeProteinType(recipe);
  return selected === "All" || type === selected || (selected === "Poultry" && type === "Chicken");
}
