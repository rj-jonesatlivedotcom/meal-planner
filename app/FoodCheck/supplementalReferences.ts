import type { CategoryProduct } from "./categoryMinerals";
import type { PreparationBasis } from "./curatedMinerals";
import type { ReferenceCandidate } from "./referenceMatching";

// FSANZ Australian Food Composition Database release 3.0, checked 20 Oct 2026.
// F006055 explicitly includes the flavour sachet. Its nutrients are estimated
// from analysed cooked noodles with a moisture adjustment, not measured for a
// branded product. F006054 is a whole seasoned undrained recipe.
const root = "https://www.foodstandards.gov.au/science-data/food-nutrient-databases/afcd/search/food/";
export function supplementalReferences(p: CategoryProduct, basis: PreparationBasis): ReferenceCandidate[] {
  const text = `${p.product_name ?? ""} ${p.product_name_en ?? ""} ${p.categories ?? ""} ${(p.categories_tags ?? []).join(" ")}`;
  if (!/instant.?noodle|noodle.?bowl|ramen|noodle.?pot/i.test(text) || !["prepared", "dry"].includes(basis)) return [];
  if (basis === "dry") return [{ source: "AFCD 3.0", code: "F006055", description: "Noodle, wheat, instant, flavoured, dry, uncooked", basis: "dry",
    completeProduct: true, url: root + "F006055", potassiumMg: 227, phosphorusMg: 145,
    macros: { energyKcal: 1842 / 4.184, protein: 11, fat: 19.1, carbohydrate: 54 },
    comparisonNote: "AFCD complete dry instant-noodle product includes the flavour sachet. Moisture-adjusted source estimate; no prepared-weight conversion is assumed." }];
  const yieldInfo = p.preparationYield;
  if (yieldInfo?.retainsAllContents && Number.isFinite(yieldInfo.dryGrams) && yieldInfo.dryGrams > 0 &&
      Number.isFinite(yieldInfo.preparedGrams) && yieldInfo.preparedGrams > yieldInfo.dryGrams && /^https:\/\//.test(yieldInfo.source)) {
    const factor = yieldInfo.dryGrams / yieldInfo.preparedGrams;
    return [{ source: "AFCD 3.0", code: "F006055", description: "Noodle, wheat, instant, flavoured, dry, uncooked", basis: "prepared",
      completeProduct: true, url: root + "F006055", potassiumMg: 227 * factor, phosphorusMg: 145 * factor,
      original: { basis: "dry", potassiumMg: 227, phosphorusMg: 145, factor },
      macros: { energyKcal: 1842 / 4.184 * factor, protein: 11 * factor, fat: 19.1 * factor, carbohydrate: 54 * factor },
      comparisonNote: `Complete seasoned dry-product comparison (AFCD source: K227/P145 mg per 100g dry). Converted to per 100g prepared using declared whole-pack ${yieldInfo.dryGrams}g / ${yieldInfo.preparedGrams}g yield, retaining all contents; no cooking-loss or additive uplift. Source: ${yieldInfo.source}. AFCD dry values are moisture-adjusted estimates; formulations differ.` }];
  }
  return [{ source: "AFCD 3.0", code: "F006054", description: "Noodle, wheat, instant, flavoured, boiled, undrained", basis: "prepared",
    completeProduct: true, url: root + "F006054", potassiumMg: 28, phosphorusMg: 18,
    macros: { energyKcal: 226 / 4.184, protein: 1.4, fat: 2.3, carbohydrate: 6.6 },
    comparisonNote: "FSANZ whole-product recipe includes the flavour sachet and retained cooking water. This reference is more dilute than some noodle pots; no concentration adjustment has been assumed." }];
}
