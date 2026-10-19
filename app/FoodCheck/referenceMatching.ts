import type { CategoryProduct } from "./categoryMinerals";
import type { Mineral, PreparationBasis } from "./curatedMinerals";

export type ReferenceMacros = { energyKcal: number | null; protein: number | null; fat: number | null; carbohydrate: number | null };
export type ReferenceCandidate = { source: "CoFID 2021" | "USDA"; code: string; description: string;
  potassiumMg: number | null; phosphorusMg: number | null; macros: ReferenceMacros; basis?: string; url: string };
export type FoodIdentity = { family: string; label: string; terms: string[]; query: string; note: string; ingredients: string };
export type SearchTrace = { source: string; query: string; candidates: number; status: string };
export type ReferenceResolution = { classification: string | null; matches: Partial<Record<Mineral, ReferenceCandidate>>;
  reasons: Partial<Record<Mineral, string>>; searches: SearchTrace[]; note?: string };
export const referenceNumber = (value: unknown): number | null => {
  if (typeof value !== "number" && !(typeof value === "string" && /^\d+(?:\.\d+)?$/.test(value.trim()))) return null;
  const n = Number(value); return Number.isFinite(n) && n >= 0 ? n : null;
};
export function productMacros(p: CategoryProduct): ReferenceMacros {
  const n = p.nutriments ?? {};
  return { energyKcal: referenceNumber(n["energy-kcal_100g"]), protein: referenceNumber(n.proteins_100g),
    fat: referenceNumber(n.fat_100g), carbohydrate: referenceNumber(n.carbohydrates_100g) };
}
export function identifyFood(p: CategoryProduct): FoodIdentity | null {
  const name = `${p.product_name ?? p.product_name_en ?? ""} ${p.generic_name ?? ""}`.toLowerCase();
  const tags = `${(p.categories_tags ?? []).join(" ")} ${p.categories ?? ""}`.toLowerCase();
  const ingredients = (p.ingredients_text ?? "").toLowerCase(), text = name + " " + tags, m = productMacros(p);
  const make = (family: string, label: string, terms: string[], query: string, note = "") => ({ family, label, terms, query, note, ingredients: name + " " + ingredients });
  // Ingredients/profile take precedence over broad OFF frozen-dessert tags.
  if (/cone|cornet|wafer/.test(name) && !/chocolat|filled|sundae/.test(name) && /^\s*wheat flour/.test(ingredients) && (m.carbohydrate ?? 0) > 65 && (m.fat ?? 100) < 12)
    return make("empty-cone", "Empty wafer / ice-cream cone", ["wafer"], "ice cream cones cake wafer", "Empty baked wafer only; excludes ice cream, coatings and fillings.");
  if (/digestive/.test(text)) return /chocolat|cocoa/.test(text + " " + ingredients)
    ? make("chocolate-digestive", "Chocolate-coated digestive biscuit", ["biscuits"], "chocolate digestive cookies", "Coating and biscuit are both included; branded proportions may differ.")
    : make("digestive", "Plain digestive biscuit", ["digestive"], "digestive biscuits", "Generic plain digestive comparison; flour and raising agents vary.");
  if (/biscuit|cookie/.test(text) && /cream|sandwich|filled|oreo/.test(text))
    return make("sandwich-biscuit", "Filled sandwich biscuit", ["biscuits"], "sandwich cookies cream filling", "Includes biscuit and filling; flavouring and filling proportions vary.");
  // A small documented vocabulary alias identifies a product family, not minerals
  // or a reference ID. Wacko variants are biscuit bars, not plain chocolate.
  // https://www.aldi.co.uk/results?q=Chocolate+Biscuits (Chocolate Wacko 9 pack)
  if (/\bwacko\b/.test(name) || /chocolat/.test(text) && /biscuit|cookie/.test(text))
    return make("coated-biscuit", "Chocolate-coated biscuit bar", ["biscuits", "chocolate covered"], "chocolate coated cookies", "Generic coated biscuit, not plain chocolate. Filling details and additive quantities may be incomplete.");
  if (/tomato/.test(text) && /canned|tinned/.test(text) && !/soup|sauce|paste|puree|purée|dried|beans/.test(name))
    return make("canned-tomatoes", "Canned tomatoes with juice", ["tomatoes"], "tomatoes canned whole contents", "Includes all juice; not drained or concentrated tomato paste.");
  if (/soup/.test(text) && /chicken/.test(text) && /vegetable|\bveg\b/.test(text))
    return make("chicken-vegetable-soup", "Complete chicken-and-vegetable soup", ["soup"], "soup chicken vegetable canned ready to serve", "Complete soup including broth, chicken and vegetables. Their proportions may differ; no dilution or cooking-loss adjustment is assumed.");
  if (/baked.beans/.test(text)) return make("baked-beans", "Baked beans with sauce", ["baked beans"], "baked beans canned tomato sauce", "Whole contents including sauce, not drained beans.");
  if (/crisp|potato.chips/.test(text) && /potato/.test(ingredients) && !/cheese|barbecue|bacon|vinegar/.test(text + ingredients))
    return make("potato-crisps", "Plain salted potato crisps", ["potato crisps"], "potato chips plain salted", "Generic fried potato crisps; potatoes, oils and processing vary between brands.");
  if (/chocolat/.test(text) && !/cake|drink|biscuit|cookie|spread|ice.cream|cereal/.test(text)) {
    const kind = /dark|plain/.test(name) ? "dark" : /white/.test(name) ? "white" : /milk/.test(name + ingredients) ? "milk" : null;
    if (kind && !/nut|almond|raisin|caramel|nougat|filled/.test(name))
      return make(`chocolate-${kind}`, `${kind} chocolate`, [`chocolate, ${kind === "dark" ? "plain" : kind}`], `chocolate ${kind}`, "Generic chocolate; cocoa and milk proportions differ between brands.");
  }
  if (/cheddar/.test(text) && !/processed|spread|sauce/.test(text)) return make("cheddar", "Natural Cheddar cheese", ["cheddar"], "cheese cheddar", "Natural cheese only; excludes processed cheese and spreads.");
  if (/bread/.test(text) && !/gluten.free|protein|fruit|seed|nut/.test(name)) {
    const whole = /wholemeal|whole.wheat/.test(text);
    return make(whole ? "wholemeal-bread" : "white-bread", whole ? "Wholemeal bread" : "White bread", [whole ? "bread, wholemeal" : "bread, white"], whole ? "bread whole wheat" : "bread white", "Untoasted bread; flour and fortification may differ.");
  }
  return null;
}

function compatible(identity: FoodIdentity, candidate: ReferenceCandidate, basis: PreparationBasis): boolean {
  const t = candidate.description.toLowerCase();
  for (const ingredient of ["peanut", "hazelnut", "almond", "cashew", "walnut", "raisin", "marshmallow"]) {
    if (new RegExp(`\\b${ingredient}s?\\b`).test(identity.ingredients) && !t.includes(ingredient)) return false;
  }
  if (/oat flour|oat flakes|whole oats/.test(identity.ingredients) && !/oat/.test(t)) return false;
  if (/condensed|powder|dehydrated|dried/.test(t) && basis !== "dry") return false;
  if (basis === "prepared" && !/as served|ready.to.serve|cooked|prepared/.test(t)) return false;
  if (basis === "unknown") return false;
  switch (identity.family) {
    case "empty-cone": return /^(?:wafers?\b)|cones.*(?:cake|wafer)|cake.*cones/.test(t) && !/chocolat|sundae|scooped|filled|sandwich|prepackaged/.test(t.replace("not filled", ""));
    case "chocolate-digestive": return /digestive/.test(t) && /chocolat/.test(t) && !/\boat\b|cream|marshmallow/.test(t);
    case "digestive": return /digestive/.test(t) && !/chocolat|oat|filled/.test(t);
    case "sandwich-biscuit": return /biscuit|cookie/.test(t) && /sandwich|cream|filling/.test(t) && !/coated|marshmallow|nut|oat/.test(t);
    case "coated-biscuit": return /biscuit|cookie/.test(t) && /chocolat/.test(t) && /coated|covered|coating/.test(t) && !/digestive|\boat\b|cream|marshmallow|nut|chip|wafer/.test(t);
    case "canned-tomatoes": return /tomato/.test(t) && /canned/.test(t) && !/soup|sauce|paste|puree|purée|drained|concentrat/.test(t);
    case "chicken-vegetable-soup": return /soup/.test(t) && /chicken/.test(t) && /vegetable/.test(t) && !/cream|cheese|rice|noodle/.test(t);
    case "baked-beans": return /baked beans/.test(t) && /tomato|canned/.test(t) && !/pork|sausage|reduced|barbecue/.test(t);
    case "potato-crisps": return /potato (?:crisps|chips)/.test(t) && !/baked|fat.free|low.fat|reduced|flavour|cheese|barbecue/.test(t);
    case "cheddar": return /cheddar/.test(t) && !/processed|reduced|low.fat|spread/.test(t);
    case "wholemeal-bread": return /bread/.test(t) && /wholemeal|whole.wheat/.test(t) && !/toast|seed|nut|protein/.test(t);
    case "white-bread": return /bread/.test(t) && /white/.test(t) && !/toast|seed|nut|protein/.test(t);
    default: return identity.family.startsWith("chocolate-") && /chocolate/.test(t) && t.includes(identity.family.endsWith("dark") ? "plain" : identity.family.slice(10)) && !/biscuit|cookie|drink|nut|raisin|filled|caramel|nougat/.test(t);
  }
}
export function rankReferences(p: CategoryProduct, identity: FoodIdentity, candidates: ReferenceCandidate[], basis: PreparationBasis) {
  const macros = productMacros(p);
  return candidates.flatMap(candidate => {
    if (!compatible(identity, candidate, basis)) return [];
    const fields = ["energyKcal", "protein", "fat", "carbohydrate"] as const;
    const floors = { energyKcal: 100, protein: 5, fat: 8, carbohydrate: 15 };
    let distance = 0, count = 0;
    for (const key of fields) {
      const a = macros[key], b = candidate.macros[key];
      if (a === null || b === null) continue;
      const difference = Math.abs(a - b) / Math.max(floors[key], a);
      if (difference > (key === "energyKcal" ? 0.45 : 0.8)) return [];
      distance += difference; count++;
    }
    if (count < 3 || macros.energyKcal === null || candidate.macros.energyKcal === null) return [];
    // This is a ranking cost, never a clinical confidence score or accuracy claim.
    const cost = distance / count + (candidate.source === "USDA" ? 0.12 : 0) +
      (identity.family === "coated-biscuit" && /half coated|caramel/i.test(candidate.description) ? 0.08 : 0);
    return cost <= 0.5 ? [{ candidate, cost }] : [];
  }).sort((a, b) => a.cost - b.cost || a.candidate.code.localeCompare(b.candidate.code));
}
