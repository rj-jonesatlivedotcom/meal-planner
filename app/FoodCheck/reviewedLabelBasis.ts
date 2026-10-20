// Label evidence fills missing OFF basis metadata, never nutrient amounts.
// Retrieved/reviewed 20 October 2026. Explicit current metadata takes priority.
export type PreparationYield = { dryGrams: number; preparedGrams: number; retainsAllContents: boolean; source: string };
export function reviewedLabelBasis<T extends { nutrition_basis?: string; preparationYield?: PreparationYield }>(code: string, product: T): T {
  if (product.nutrition_basis) return product;
  const labels: Record<string, { basis: string; source: string }> = {
    "4056489903703": { basis: "Per 100g drained", source: "https://images.openfoodfacts.org/images/products/405/648/990/3703/nutrition_en.7.full.jpg" },
    "5606677004959": { basis: "Per 100g drained", source: "https://images.openfoodfacts.org/images/products/560/667/700/4959/nutrition_en.5.full.jpg" },
  };
  if (labels[code]) return { ...product, nutrition_basis: `${labels[code].basis}; label: ${labels[code].source}` };
  if (code === "4061464935198") return { ...product, nutrition_basis: "Per 100g prepared, whole bowl including seasoning and retained water",
    preparationYield: { dryGrams: 85, preparedGrams: 435, retainsAllContents: true,
      source: "https://images.openfoodfacts.org/images/products/406/146/493/5198/nutrition_en.14.full.jpg" } };
  return product;
}
