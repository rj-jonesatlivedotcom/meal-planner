import type { CategoryProduct } from "./categoryMinerals";
import type { Mineral, PreparationBasis } from "./curatedMinerals";

export type ReferenceMacros = { energyKcal: number | null; protein: number | null; fat: number | null; carbohydrate: number | null };
export type ReferenceCandidate = { source: "CoFID 2021" | "USDA" | "AFCD 3.0"; code: string; description: string;
  potassiumMg: number | null; phosphorusMg: number | null; macros: ReferenceMacros; basis?: string;
  completeProduct?: boolean; comparisonNote?: string;
  original?: { basis: PreparationBasis; potassiumMg: number; phosphorusMg: number; factor: number }; url: string };
export type FoodIdentity = { family: string; label: string; terms: string[]; query: string; note: string; ingredients: string; tokens?: string[]; state?: FoodState; primary?: string };
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
    .replace(/\b(?:chick peas?|chickpeas?|garbanzo(?: beans?)?)\b/g, "chickpea").replace(/\bfish sticks?\b/g, "fish finger")
    .replace(/\byoghurt\b/g, "yogurt").replace(/\bgroundnut\b/g, "peanut").replace(/\bsweet corn\b/g, "sweetcorn")
    .replace(/\bcorn flakes\b/g, "cornflake").replace(/\b([a-z]{3,})s\b/g, "$1").replace(/[^a-z0-9]+/g, " ").trim();
}
export function foodState(p: CategoryProduct, basis: PreparationBasis = "as-sold"): FoodState {
  const name = normaliseFood(`${p.product_name_en ?? ""} ${p.product_name ?? ""} ${p.generic_name ?? ""}`);
  const metadata = normaliseFood(`${p.categories ?? ""} ${(p.categories_tags ?? []).join(" ")} ${p.ingredients_text ?? ""}`);
  const text = name + " " + metadata;
  const medium = /\bin (?:olive |sunflower |vegetable )?oil\b/.test(text) ? "oil" : /\bbrine\b/.test(text) ? "brine"
    : /\b(?:in |tomato )sauce\b/.test(text) ? (/tomato/.test(text) ? "tomato sauce" : "sauce")
    : /\bsyrup\b/.test(text) ? "syrup" : /\bin (?:fruit |natural |own )?juice\b/.test(text) ? "juice" : /\bin water\b/.test(text) ? "water" : "";
  const basisText = normaliseFood(`${p.nutrition_basis ?? ""} ${(p.ingredients_text ?? "").split(/nutrition/i)[1] ?? ""}`);
  const contents = /\b(?:undrained|whole content|solid and liquid|including liquid)\b/.test(name + " " + basisText) ? "whole"
    : /\bdrained\b/.test(name + " " + basisText) ? "drained" : "whole";
  const preparation = basis === "prepared" || /\bprepared|cooked|heated\b/.test(basisText) || /\b(?:cooked|prepared|boiled|steamed|grilled|fried|microwaved|made with)\b/.test(name) ? "cooked"
    : basis === "dry" || /\b(?:dry|dried|dehydrated)\b/.test(name + " " + normaliseFood(`${p.categories ?? ""} ${(p.categories_tags ?? []).join(" ")}`)) || /\b(?:rolled |porridge )?oat\b/.test(name) && !/\bcooked\b/.test(name) ? "dry"
    : /\bcanned\b/.test(text) || medium ? "canned" : /\braw|fresh\b/.test(name) ? "raw" : "";
  return { preparation, medium, contents, fortified: /\bunfortified\b/.test(text) ? false : /\bfortified|vitamin|niacin|thiamin\b/.test(text) ? true : null };
}
const nameNoise = new Set("a an the and with in of for from natural organic essential value choice finest original premium ready eat supermarket food packaged product slice sliced chunk flake rolled instant young baby whole half content canned tinned water brine oil sunflower olive vegetable fruit juice syrup dry dried raw fresh cooked prepared portion serving packet box pack gram g kg ml unfortified fortified porridge en fr de es drained fillet skinless boneless".split(" "));
function generalIdentity(p: CategoryProduct, basis: PreparationBasis): FoodIdentity | null {
  const name = normaliseFood(`${p.product_name_en || p.product_name || ""} ${p.generic_name ?? ""}`);
  const tags = normaliseFood(`${p.categories ?? ""} ${(p.categories_tags ?? []).join(" ")}`);
  let tokens = [...new Set(name.split(" ").filter(t => t.length > 2 && !nameNoise.has(t) && !/^\d/.test(t)))].slice(-6);
  // Meaningful category terms can recover a vague product name; never rank on
  // macro similarity alone. Unknown brands are tried, then broadened away.
  if (!tokens.length) tokens = [...new Set(tags.split(" ").filter(t => t.length > 2 && !nameNoise.has(t)))].slice(-3);
  const categoryWords = tags.split(" ").filter(t => t.length > 3 && !nameNoise.has(t) && !new Set(["plant", "based", "beverage", "meal", "product", "food", "vegetable", "fruit", "snack"]).has(t));
  tokens = [...new Set([...tokens, ...categoryWords.slice(-2)])];
  if (!tokens.length) return null;
  const categoryTokens = new Set(tags.split(" "));
  const searchTokens = [...tokens].sort((a, b) => Number(categoryTokens.has(b)) - Number(categoryTokens.has(a)));
  const state = foodState(p, basis), terms = [tokens.join(" "), ...searchTokens].filter((t, i, a) => a.indexOf(t) === i);
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
  const make = (family: string, label: string, terms: string[], query: string, note = "") => ({ family, label, terms, query, note, ingredients: name + " " + ingredients.replace(/may contain[\s\S]*/i, ""), state: foodState(p, basis) });
  const normal = normaliseFood(text);
  const hydrated = ["cooked", "canned"].includes(foodState(p, basis).preparation);
  const simple = !/soup|cake|juice|puree|salad|curry|sandwich|spread|hummu|rissol|falafel/.test(normal);
  const legume = /\b(chickpea|lentil|kidney bean|butter bean|black bean|cannellini bean|haricot bean|borlotti bean|pea)\b/.exec(normal)?.[1];
  const vegetable = /\b(carrot|broccoli|cauliflower|spinach|beetroot|asparagu|green bean|sweetcorn)\b/.exec(normal)?.[1];
  if (simple && hydrated && legume) return { ...make("hydrated-legumes", "Canned / cooked " + legume, legume === "chickpea" ? ["chick peas", "chickpea", "garbanzo"] : [legume, legume.split(" ").at(-1)!], "+" + legume.split(" ").join(" +") + " +canned", "Hydrated legume comparison; varieties, rinsing and processing differ. Drained and whole contents are kept separate."), primary: legume };
  if (simple && hydrated && vegetable) return { ...make("vegetables", "Canned / cooked " + vegetable, [vegetable, vegetable + "s"], "+" + vegetable.split(" ").join(" +") + " +canned", "Plain hydrated vegetable comparison; drained and whole contents are kept separate. Canning, heating and varieties differ."), primary: vegetable };
  const fish = /\b(sardine|mackerel|herring|tuna|salmon|anchovy)\b/.exec(normal)?.[1];
  if (fish && /canned|brine|in water|in oil|in sauce/.test(normal)) return { ...make("canned-fish", "Canned " + fish, [fish, fish + "s"], "+" + fish + " +canned", "Canned fish comparison; neighbouring fish only where edible bone, contents and composition are compatible. Packing medium and residual oil may differ."), primary: fish };
  if (/fish finger|fish stick|breaded.*(?:pollock|fish)|(?:pollock|fish).*breaded/.test(normal)) return make("breaded-fish", "Complete breaded white fish", ["fish fingers", "breaded", "fish sticks"], "+fish +sticks", "Complete breaded fish including coating; white-fish species and cooking methods may differ. Label macros screen for major moisture/oil differences; no cooking-weight conversion is assumed.");
  if (/instant.?noodle|ramen|noodle.?bowl|noodle.?pot/.test(normal)) return make("instant-noodles", "Complete seasoned instant noodles", ["noodles", "ramen"], "+ramen", "Complete seasoned instant noodles including retained water. Whole-product coverage comes from source metadata; plain noodles and ambiguous flavour-packet records are excluded.");
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
  if (/soup/.test(text) && foodState(p, basis).preparation !== "dry")
    return make("prepared-soup", "Complete prepared soup", ["soup"], /chicken/.test(text) && /vegetable|\bveg\b/.test(text) ? "soup chicken vegetable canned ready to serve" : `+soup +${/chicken/.test(text) ? "chicken" : /tomato/.test(text) ? "tomato" : "vegetable"}`, "Complete prepared soup including supplied broth and solids. Their proportions may differ; no dilution or cooking-loss adjustment is assumed.");
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
  for (const modifier of ["cake", "soup", "salad", "sauce", "pie", "sandwich", "puree", "juice", "flour", "butter", "frosted", "honey", "chocolate", "nut", "fruit", "strawberry", "vanilla", "toffee", "soya", "soy", "coconut"]) {
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

// Composition families accept alternative names and neighbouring products.
// Tier 0 is the closest food; tier 1 is a documented category comparison.
function familyComparison(identity: FoodIdentity, c: ReferenceCandidate): number | null | undefined {
  const t = normaliseFood(c.description), state = identity.state!;
  const cooked = c.basis === "prepared" || /\b(?:cooked|boiled|heated|grilled|baked|fried|as served|ready to serve|water added|prepared)\b/.test(t);
  const dry = c.basis !== "prepared" && !cooked && /\b(?:dry|dried|dehydrated|raw|powder)\b/.test(t);
  const canned = /\bcanned\b/.test(t);
  const drained = /\bdrained\b/.test(t) && !/\bundrained\b/.test(t);
  const whole = /whole content|solid and liquid|undrained/.test(t);
  if (["hydrated-legumes", "vegetables"].includes(identity.family)) {
    const noun = identity.primary!;
    if (!t.includes(noun) || dry || !canned && !cooked || /soup|cake|juice|flour|hummu|curry|salad|puree|rissol|pakora|bhaji/.test(t)) return null;
    if (noun !== "pea" && /\bpea\b/.test(t) || /fat added|with oil|with butter|with margarine/.test(t)) return null;
    if (state.contents === "drained") {
      if (whole || canned && !drained && !cooked) return null;
      return canned && drained ? 0 : 1;
    }
    return whole && !drained ? 0 : null;
  }
  if (identity.family === "canned-fish") {
    if (!canned || /sandwich|paste|roe|soup/.test(t)) return null;
    if (/sauce/.test(t) !== state.medium.includes("sauce")) return null;
    if (state.medium === "tomato sauce" && !/tomato sauce/.test(t)) return null;
    if (state.contents === "drained" ? !drained : !whole || drained) return null;
    if (/boneless|skinless|fillet/.test(identity.ingredients) && !/boneless|skinless|fillet/.test(t)) return null;
    if (t.includes(identity.primary!)) return state.medium && !t.includes(state.medium) ? 1 : 0;
    return ["sardine", "herring", "mackerel"].includes(identity.primary!) && /\b(?:sardine|herring|mackerel)\b/.test(t) && /with bone/.test(t) ? 1 : null;
  }
  if (identity.family === "breaded-fish") {
    if (!/fish finger|fish.*breaded|breaded.*fish/.test(t) || /salmon|fishcake|croaker|catfish/.test(t)) return null;
    if (/raw/.test(t) && state.preparation === "cooked") return null;
    return 0;
  }
  if (identity.family === "instant-noodles") {
    // Metadata can establish complete seasoning coverage without exact title words.
    if (!c.completeProduct || c.basis !== (state.preparation === "dry" ? "dry" : "prepared") || drained || !/noodle|ramen/.test(t)) return null;
    return 0;
  }
  if (identity.family === "prepared-soup") {
    if (!/soup/.test(t) || dry || /stock|broth/.test(t) || /condensed/.test(t) && !cooked) return null;
    if (!canned && !cooked && c.basis !== "prepared") return null;
    const product = normaliseFood(identity.ingredients.split(/water|ingredient/i)[0]);
    const creamy = /cream/.test(product);
    if (creamy !== /cream/.test(t)) return null;
    const main = /chicken/.test(product) ? "chicken" : /tomato/.test(product) ? "tomato" : /vegetable/.test(product) ? "vegetable" : "";
    return main && t.includes(main) && (!/vegetable/.test(product) || /vegetable/.test(t)) ? 0 : 1;
  }
  return undefined;
}

// These checks precede every family path. Trace-allergen notices are not recipes.
function formulation(text: string) {
  const t = normaliseFood(text.replace(/may contain[\s\S]*/i, "").replace(/\b(?:no|not|without) (?:added )?(?:nuts?|fruit|chocolate)\b/gi, ""))
    .replace(/\b(?:plain )?caramel(?= and beta carotene| colour| color)/g, "")
    .replace(/\bcoconut (?:fat|oil)\b/g, "")
    .replace(/\bcocoa\b/g, "chocolate").replace(/\b(?:strawberry|raspberry|blueberry|banana|peach|raisin|sultana)\b/g, "fruit");
  const additions = ["peanut", "hazelnut", "almond", "cashew", "walnut", "pecan", "pistachio", "macadamia", "brazil nut", "nut",
    "fruit", "coconut", "chocolate",
    "vanilla", "toffee", "caramel", "honey", "marshmallow", "cheese"].filter(x => new RegExp(`\\b${x}\\b`).test(t));
  const fat = /\b(?:fat free|0 fat|zero fat|skimmed)\b/.test(t) ? "free"
    : /\b(?:low fat|reduced fat|semi skimmed)\b/.test(t) ? "low"
    : /\b(?:full fat|whole milk|full cream)\b/.test(t) ? "full" : "unspecified";
  return { additions, fat, plain: /\bplain|unflavoured\b/.test(t), flavoured: /\bflavou?r(?:ed)?\b/.test(t) };
}
function formulationCompatible(p: CategoryProduct, identity: FoodIdentity, candidate: ReferenceCandidate) {
  const product = formulation(identity.ingredients + " " + identity.label), reference = formulation(candidate.description);
  // Variant claims describe the product, not incidental whole-milk powder in a recipe.
  const claims = formulation(`${p.product_name_en || p.product_name || ""} ${p.generic_name ?? ""}`);
  if (product.additions.some(x => !reference.additions.includes(x)) || reference.additions.some(x => !product.additions.includes(x))) return false;
  if (claims.plain && reference.flavoured) return false;
  if (reference.plain && product.flavoured) return false;
  return claims.fat === "unspecified" || reference.fat === "unspecified" || claims.fat === reference.fat;
}

function compatible(p: CategoryProduct, identity: FoodIdentity, candidate: ReferenceCandidate, basis: PreparationBasis): boolean {
  if (basis === "unknown") return false;
  if (!formulationCompatible(p, identity, candidate)) return false;
  const family = familyComparison(identity, candidate);
  if (family !== undefined) return family !== null;
  const t = candidate.description.toLowerCase();
  for (const ingredient of ["peanut", "hazelnut", "almond", "cashew", "walnut", "raisin", "marshmallow"]) {
    if (new RegExp(`\\b${ingredient}s?\\b`).test(identity.ingredients) && !t.includes(ingredient)) return false;
  }
  if (/oat flour|oat flakes|whole oats/.test(identity.ingredients) && !/oat/.test(t)) return false;
  if (identity.family === "food-name") return generalCompatible(identity, candidate, basis);
  if (/condensed|powder|dehydrated|dried/.test(t) && basis !== "dry") return false;
  if (basis === "prepared" && !/as served|ready.to.serve|cooked|prepared/.test(t)) return false;
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
    if (!compatible(p, identity, candidate, basis)) return [];
    const fields = ["energyKcal", "protein", "fat", "carbohydrate"] as const;
    const floors = { energyKcal: 100, protein: 5, fat: 8, carbohydrate: 15 };
    let distance = 0, count = 0;
    const differences: Partial<Record<typeof fields[number], number>> = {};
    for (const key of fields) {
      const a = macros[key], b = candidate.macros[key];
      if (a === null || b === null) continue;
      const difference = Math.abs(a - b) / Math.max(floors[key], a);
      differences[key] = difference;
      // Reject major density incompatibility, not every individual macro variation.
      if (key === "energyKcal" && a > 0 && (b / a < 0.5 || b / a > 2)) return [];
      distance += difference; count++;
    }
    if (count < 2) return [];
    // This is a ranking cost, never a clinical confidence score or accuracy claim.
    const identityCost = identity.tokens ? 1 - identity.tokens.filter(t => normaliseFood(candidate.description).split(" ").includes(t)).length / identity.tokens.length : 0;
    const ingredientTokens = normaliseFood(p.ingredients_text ?? "").split(" ").filter(t => t.length > 3 && !nameNoise.has(t));
    const ingredientCost = ingredientTokens.length ? 1 - ingredientTokens.filter(t => normaliseFood(candidate.description).split(" ").includes(t)).length / ingredientTokens.length : 0;
    const cost = distance / count + ingredientCost * 0.05 + (candidate.source === "USDA" ? 0.12 : 0) +
      (identity.family === "coated-biscuit" && /half coated|caramel/i.test(candidate.description) ? 0.08 : 0);
    const tier = familyComparison(identity, candidate) ?? 0;
    return cost <= 0.8 ? [{ candidate, cost, identityCost, tier, differences }] : [];
  }).sort((a, b) => a.tier - b.tier || (a.candidate.source === "CoFID 2021" ? 0 : 1) - (b.candidate.source === "CoFID 2021" ? 0 : 1) || a.identityCost - b.identityCost || a.cost - b.cost || a.candidate.code.localeCompare(b.candidate.code));
}

// Keep one formulation/identity group, then remove references that are no closer
// on any observed macro and strictly worse on at least one. No mineral values or
// arbitrary score window determine membership. Incomplete macro evidence cannot
// displace a reference with more observed fields.
export function selectReferenceGroup(ranked: ReturnType<typeof rankReferences>) {
  if (!ranked.length) return [];
  const best = ranked[0];
  const signature = (c: ReferenceCandidate) => {
    const f = formulation(c.description);
    return JSON.stringify([f.fat, f.additions, f.plain, f.flavoured]);
  };
  const group = ranked.filter(r => r.tier === best.tier && r.identityCost === best.identityCost && signature(r.candidate) === signature(best.candidate));
  return group.filter(r => !group.some(other => {
    if (other === r) return false;
    const keys = Object.keys(r.differences) as (keyof typeof r.differences)[];
    return keys.every(k => other.differences[k] !== undefined && other.differences[k]! <= r.differences[k]!) &&
      keys.some(k => other.differences[k]! < r.differences[k]!);
  }));
}
