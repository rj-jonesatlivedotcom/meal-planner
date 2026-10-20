import type { CategoryProduct } from "./categoryMinerals";
import type { Mineral, PreparationBasis } from "./curatedMinerals";

export type ReferenceMacros = { energyKcal: number | null; protein: number | null; fat: number | null; carbohydrate: number | null };
export type ReferenceCandidate = { source: "CoFID 2021" | "USDA"; code: string; description: string;
  potassiumMg: number | null; phosphorusMg: number | null; macros: ReferenceMacros; basis?: string; url: string };
export type FoodIdentity = { family: string; label: string; terms: string[]; query: string; note: string; ingredients: string; tokens?: string[]; state?: FoodState };
type FoodState = { preparation: string; medium: string; contents: string; fortified: boolean | null };

// Vocabulary normalisation, not barcode mappings or a list of permitted foods.
export function normaliseFood(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/\b(carottes?|zanahorias?)\b/g, "carrot").replace(/\b(peches?|melocotones?)\b/g, "peach")
    .replace(/\b(avena|avoine|haferflocken|oatmeal)\b/g, "oat").replace(/\b(pilchards?)\b/g, "sardine")
    .replace(/\bsardinas\b/g, "sardine").replace(/\ben aceite\b/g, "in oil").replace(/\ben saumure\b/g, "in brine")
    .replace(/\bau jus\b/g, "in juice").replace(/\beau\b/g, "water")
    .replace(/\b(tinned|conserve[sd]?)\b/g, "canned").replace(/\bmaize\b/g, "corn")
    .replace(/\bnot fortified\b/g, "unfortified")
    .replace(/\bpeaches\b/g, "peach").replace(/\bberries\b/g, "berry").replace(/\btomatoes\b/g, "tomato")
    .replace(/\bcorn flakes\b/g, "cornflake").replace(/\b([a-z]{3,})s\b/g, "$1").replace(/[^a-z0-9]+/g, " ").trim();
}
export function foodState(p: CategoryProduct, basis: PreparationBasis = "as-sold"): FoodState {
  const name = normaliseFood(`${p.product_name_en ?? ""} ${p.product_name ?? ""} ${p.generic_name ?? ""}`);
  const metadata = normaliseFood(`${p.categories ?? ""} ${(p.categories_tags ?? []).join(" ")} ${p.ingredients_text ?? ""}`);
  const text = name + " " + metadata;
  const medium = /\bin (?:olive |sunflower |vegetable )?oil\b/.test(text) ? "oil" : /\bbrine\b/.test(text) ? "brine"
    : /\b(?:in |tomato )sauce\b/.test(text) ? (/tomato/.test(text) ? "tomato sauce" : "sauce")
    : /\bsyrup\b/.test(text) ? "syrup" : /\bin (?:fruit |natural |own )?juice\b/.test(text) ? "juice" : /\bin water\b/.test(text) ? "water" : "";
  const contents = /\b(?:undrained|whole content|solid and liquid|including liquid)\b/.test(name) ? "whole"
    : /\bdrained\b/.test(name + " " + normaliseFood(p.nutrition_basis ?? "")) ? "drained" : "whole";
  const preparation = basis === "prepared" || /\b(?:cooked|prepared|boiled|steamed|grilled|fried|microwaved|made with)\b/.test(name) ? "cooked"
    : basis === "dry" || /\bdry|dried|dehydrated\b/.test(name + " " + normaliseFood(p.categories ?? "")) || /\b(?:rolled |porridge )?oat\b/.test(name) && !/\bcooked\b/.test(name) ? "dry"
    : /\bcanned\b/.test(text) || medium ? "canned" : /\braw|fresh\b/.test(name) ? "raw" : "";
  return { preparation, medium, contents, fortified: /\bunfortified\b/.test(text) ? false : /\bfortified|vitamin|niacin|thiamin\b/.test(text) ? true : null };
}
const nameNoise = new Set("a an the and with in of for from natural organic essential value choice finest original premium ready eat supermarket food packaged product slice sliced chunk flake rolled instant young baby whole half content canned tinned water brine oil sunflower olive vegetable fruit juice syrup dry dried raw fresh cooked prepared portion serving packet box pack gram g kg ml unfortified fortified porridge en fr de es drained fillet skinless boneless".split(" "));
function generalIdentity(p: CategoryProduct, basis: PreparationBasis): FoodIdentity | null {
  const name = normaliseFood(`${p.product_name_en || p.product_name || ""} ${p.generic_name ?? ""}`);
  const tags = normaliseFood(`${p.categories ?? ""} ${(p.categories_tags ?? []).join(" ")}`);
  let tokens = [...new Set(name.split(" ").filter(t => t.length > 2 && !nameNoise.has(t) && !/^\d/.test(t)))].slice(0, 4);
  // Meaningful category terms can recover a vague product name; never rank on
  // macro similarity alone. Unknown brands are tried, then broadened away.
  if (!tokens.length) tokens = [...new Set(tags.split(" ").filter(t => t.length > 2 && !nameNoise.has(t)))].slice(-3);
  if (!tokens.length) return null;
  const state = foodState(p, basis), terms = [tokens.join(" "), ...tokens].filter((t, i, a) => a.indexOf(t) === i);
  const qualifier = [state.preparation, state.medium, state.contents === "drained" ? "drained" : state.preparation === "canned" ? "solids and liquid" : ""].filter(Boolean).join(" ");
  return { family: "food-name", label: `${tokens.join(" ")} ${qualifier}`.trim(), terms,
    query: `${tokens.join(" ")} ${qualifier}`.trim(), tokens, state, ingredients: `${name} ${normaliseFood(p.ingredients_text ?? "")}`,
    note: `Comparable food with matching identity and preparation; ${state.contents === "drained" ? "drained edible contents" : "all edible contents including supplied liquid"}. Branded ingredients and mineral amounts may differ.` };
}
export type SearchTrace = { source: string; query: string; candidates: number; status: string };
export type ReferenceResolution = { classification: string | null; matches: Partial<Record<Mineral, ReferenceCandidate>>;
  comparables?: Partial<Record<Mineral, ReferenceCandidate[]>>;
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
export function identifyFood(p: CategoryProduct, basis: PreparationBasis = "as-sold"): FoodIdentity | null {
  const name = `${p.product_name_en ?? ""} ${p.product_name ?? ""} ${p.generic_name ?? ""}`.toLowerCase();
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
  return generalIdentity(p, basis);
}

function generalCompatible(identity: FoodIdentity, candidate: ReferenceCandidate, basis: PreparationBasis): boolean {
  const text = normaliseFood(candidate.description), tokens = new Set(text.split(" "));
  if (!identity.tokens?.some(t => tokens.has(t))) return false;
  const broadHeads = new Set(["fish", "cereal", "breakfast", "fruit", "vegetable"]);
  const head = normaliseFood(candidate.description.split(",")[0]).split(" ").filter(t => !nameNoise.has(t) && !broadHeads.has(t));
  if (head.length && !head.some(t => identity.tokens?.includes(t))) return false;
  for (const form of ["soup", "salad", "pie", "sandwich", "puree", "juice", "flour", "butter", "curry", "stew", "pizza", "sauce"]) {
    if (identity.tokens?.includes(form) && !tokens.has(form)) return false;
  }
  // Keep mixed dishes distinct from their isolated ingredients in both directions.
  for (const component of ["pea", "carrot", "pear", "peach", "sardine", "chicken", "noodle"]) {
    if (new RegExp(`\\b${component}\\b`).test(normaliseFood(identity.ingredients)) !== tokens.has(component)) return false;
  }
  if (/season|flavou?r|sauce/.test(identity.ingredients) && /noodle|rice|pasta/.test(identity.ingredients) && !/season|flavou?r|sauce/.test(text)) return false;
  // A carrot in a cake, or sardines in a mixed dish, is not the named food.
  for (const modifier of ["cake", "soup", "salad", "sauce", "pie", "sandwich", "puree", "juice", "flour", "butter", "frosted", "honey", "chocolate", "nut"]) {
    if (tokens.has(modifier) && !normaliseFood(identity.ingredients).includes(modifier) && modifier !== identity.state?.medium) return false;
  }
  const state = identity.state!;
  if (state.preparation === "cooked" && candidate.basis === "dry") return false;
  const canned = /\bcanned\b/.test(text);
  if ((state.preparation === "canned") !== canned) return false;
  if (state.preparation === "dry" && (/\b(?:cooked|prepared|boiled|steamed|grilled|fried|microwaved|made with|water added)\b/.test(text) || candidate.basis === "prepared")) return false;
  if (state.preparation === "cooked" && !/\b(?:cooked|prepared|boiled|steamed|grilled|fried|microwaved|ready to serve|made with)\b/.test(text)) return false;
  if (state.preparation === "raw" && !/\braw\b/.test(text)) return false;
  if (!state.preparation && /\bcooked|boiled|prepared|raw|dehydrated\b/.test(text)) return false;
  if (state.preparation !== "dry" && /\bdried|dehydrated|powder\b/.test(text) && basis !== "dry") return false;
  if (canned) {
    const drained = /\bdrained\b/.test(text) && !/\bundrained\b/.test(text);
    const whole = /\bwhole content|solid and liquid|undrained\b/.test(text);
    if (state.contents === "drained" ? !drained : !whole || drained) return false;
    if (state.medium === "juice" && !/\bjuice\b/.test(text) || state.medium === "syrup" && !/\bsyrup\b/.test(text) || state.medium === "oil" && !/\boil\b/.test(text) || state.medium === "brine" && !/\bbrine\b/.test(text) || state.medium === "tomato sauce" && !/\btomato sauce\b/.test(text)) return false;
    if (state.medium === "water" && /\bsyrup|juice|sauce|oil\b/.test(text)) return false;
    if (!state.medium && /\bsyrup|juice|sauce|oil|brine\b/.test(text)) return false;
  }
  if (state.fortified === true && /\bunfortified\b/.test(text) || state.fortified === false && /\bfortified\b/.test(text)) return false;
  if (/\bboneless|skinless|fillet\b/.test(identity.ingredients) && !/\bboneless|skinless|fillet\b/.test(text)) return false;
  return true;
}

function compatible(identity: FoodIdentity, candidate: ReferenceCandidate, basis: PreparationBasis): boolean {
  const t = candidate.description.toLowerCase();
  for (const ingredient of ["peanut", "hazelnut", "almond", "cashew", "walnut", "raisin", "marshmallow"]) {
    if (new RegExp(`\\b${ingredient}s?\\b`).test(identity.ingredients) && !t.includes(ingredient)) return false;
  }
  if (/oat flour|oat flakes|whole oats/.test(identity.ingredients) && !/oat/.test(t)) return false;
  if (identity.family === "food-name") return generalCompatible(identity, candidate, basis);
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
      if (difference > (key === "energyKcal" ? 0.6 : 1.2)) return [];
      distance += difference; count++;
    }
    if (count < 2 || macros.energyKcal === null || candidate.macros.energyKcal === null) return [];
    // This is a ranking cost, never a clinical confidence score or accuracy claim.
    const identityCost = identity.tokens ? 1 - identity.tokens.filter(t => normaliseFood(candidate.description).split(" ").includes(t)).length / identity.tokens.length : 0;
    const ingredientTokens = normaliseFood(p.ingredients_text ?? "").split(" ").filter(t => t.length > 3 && !nameNoise.has(t));
    const ingredientCost = ingredientTokens.length ? 1 - ingredientTokens.filter(t => normaliseFood(candidate.description).split(" ").includes(t)).length / ingredientTokens.length : 0;
    const cost = distance / count + ingredientCost * 0.05 + (candidate.source === "USDA" ? 0.12 : 0) +
      (identity.family === "coated-biscuit" && /half coated|caramel/i.test(candidate.description) ? 0.08 : 0);
    return cost <= 0.6 ? [{ candidate, cost, identityCost }] : [];
  }).sort((a, b) => (a.candidate.source === "USDA" ? 1 : 0) - (b.candidate.source === "USDA" ? 1 : 0) || a.identityCost - b.identityCost || a.cost - b.cost || a.candidate.code.localeCompare(b.candidate.code));
}
