export type AllergyRecipe = { ingredients?: readonly { item: string }[] };
const normalise = (text: string) => text.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const contains = (text: string, phrase: string) => (` ${text} `).includes(` ${phrase} `);
const groups: Record<string, { names: string[]; ingredients: string[] }> = {
  milk: { names: ["milk", "dairy", "cow milk", "cows milk", "milk protein"], ingredients: ["milk", "cheese", "butter", "cream", "yoghurt", "yogurt", "whey", "casein", "caseinate", "ghee", "buttermilk", "curd", "quark", "paneer", "ricotta", "mozzarella", "cheddar", "parmesan", "feta", "halloumi", "mascarpone", "creme fraiche", "fromage frais", "lactalbumin", "lactoglobulin"] },
  peanut: { names: ["peanut", "peanuts", "groundnut", "groundnuts", "arachis"], ingredients: ["peanut", "groundnut", "arachis", "monkey nut"] },
  nuts: { names: ["tree nut", "tree nuts"], ingredients: ["almond", "hazelnut", "walnut", "cashew", "pecan", "brazil nut", "pistachio", "macadamia", "marzipan", "praline"] },
  egg: { names: ["egg", "eggs"], ingredients: ["egg", "albumen", "albumin", "ovalbumin", "lysozyme", "mayonnaise", "mayo", "meringue"] },
  soy: { names: ["soy", "soya", "soybean", "soybeans"], ingredients: ["soy", "soya", "soybean", "tofu", "tempeh", "edamame", "miso", "tamari"] },
  wheat: { names: ["wheat"], ingredients: ["wheat", "semolina", "couscous", "bulgur", "spelt", "farro", "freekeh", "durum", "seitan"] },
  gluten: { names: ["gluten", "cereals containing gluten"], ingredients: ["wheat", "semolina", "couscous", "bulgur", "spelt", "farro", "freekeh", "durum", "seitan", "barley", "rye", "malt", "oat", "triticale"] },
  fish: { names: ["fish"], ingredients: ["fish", "salmon", "tuna", "cod", "haddock", "anchovy", "anchovies", "sardine", "mackerel", "trout", "pollock", "hake", "plaice", "sole", "tilapia", "herring", "whitebait"] },
  crustaceans: { names: ["crustacean", "crustaceans", "prawn", "prawns", "shrimp", "crab", "lobster"], ingredients: ["prawn", "shrimp", "crab", "lobster", "crayfish", "scampi", "langoustine"] },
  molluscs: { names: ["mollusc", "molluscs", "mollusk", "mollusks"], ingredients: ["mussel", "oyster", "squid", "octopus", "clam", "scallop", "whelk", "snail", "cuttlefish"] },
  sesame: { names: ["sesame", "sesame seed", "sesame seeds"], ingredients: ["sesame", "tahini", "tahin", "gingelly", "benne"] },
  celery: { names: ["celery", "celeriac"], ingredients: ["celery", "celeriac"] },
  mustard: { names: ["mustard"], ingredients: ["mustard", "dijon"] },
  lupin: { names: ["lupin", "lupine"], ingredients: ["lupin", "lupine"] },
  sulphites: { names: ["sulphite", "sulphites", "sulfite", "sulfites", "sulphur dioxide", "sulfur dioxide"], ingredients: ["sulphite", "sulfite", "sulphur dioxide", "sulfur dioxide", "e220", "e221", "e222", "e223", "e224", "e225", "e226", "e227", "e228"] },
};
const variants = (word: string) => [word, `${word}s`, ...(word.endsWith("y") ? [`${word.slice(0, -1)}ies`] : []), ...(word.endsWith("s") ? [`${word}es`] : [])];
const hasIngredient = (text: string, word: string) => variants(word).some(value => contains(text, value));
const compound = /\b(stock|broth|sauce|dressing|gravy|paste|pesto|bread|rolls?|pasta|noodles?|flour|margarine|spread|chocolate|sausage|sausages|seasoning|blend|mix|mixed nuts|vegetable oil|mayonnaise|mayo|yoghurt|yogurt|plant based|substitute)\b/;

/** Ingredient evidence only. An absence of matches never establishes allergen freedom. */
export function matchRecipeAllergies(recipe: AllergyRecipe, allergies: readonly string[] | null | undefined) {
  const detected: string[] = [], uncertain: string[] = [], uncertainIngredients = new Set<string>();
  for (const declared of allergies ?? []) {
    const name = normalise(declared);
    if (!name) continue;
    let keys = Object.keys(groups).filter(key => groups[key].names.includes(name));
    if (["nut", "nuts", "nut allergy"].includes(name)) keys = ["peanut", "nuts"];
    if (["shellfish", "seafood"].includes(name)) keys = ["crustaceans", "molluscs", ...(name === "seafood" ? ["fish"] : [])];
    const namedNut = groups.nuts.ingredients.find(nut => variants(nut).includes(name));
    const terms = namedNut ? [namedNut] : keys.flatMap(key => groups[key].ingredients);
    const recognised = keys.length > 0 || Boolean(namedNut);
    let found = false, unknown = !recognised;
    if (!recipe.ingredients?.length) unknown = true;
    for (const ingredient of recipe.ingredients ?? []) {
      let item = normalise(ingredient.item);
      if (!item) unknown = true;
      if (keys.includes("milk")) {
        // Named plant substitutes and cocoa butter are not evidence of milk.
        item = item.replace(/\b(?:almond|coconut|oat|rice|soy|soya|cashew|hemp) (?:milk|cream|butter)\b/g, "plant substitute")
          .replace(/\b(?:peanut|groundnut|sunflower|sesame|nut|seed) butter\b/g, "plant spread")
          .replace(/\bcocoa butter\b/g, "cocoa fat");
        item = item.replace(/\bbutter beans?\b/g, "beans").replace(/\bbutter lettuce\b/g, "lettuce").replace(/\bcream of tartar\b/g, "tartar");
        if (/\b(?:dairy free|vegan|plant based)\b/.test(item)) item = item.replace(/\b(?:milk|cheese|butter|cream|yoghurt|yogurt)\b/g, "plant substitute");
      }
      if (keys.includes("egg") && /\b(?:egg free|vegan)\b/.test(item)) item = item.replace(/\b(?:egg|mayonnaise)\b/g, "plant substitute");
      if (keys.includes("gluten") && /\bgluten free\b/.test(item)) item = item.replace(/\b(?:oat|oats|gluten)\b/g, "labelled substitute");
      const matches = (recognised ? terms : [name]).some(term => hasIngredient(item, term));
      if (matches) found = true;
      // Packaged/composite items need a full label; no inferred "safe" substitutions.
      if (!matches && compound.test(item)) { unknown = true; uncertainIngredients.add(ingredient.item); }
    }
    if (found) detected.push(declared);
    if (unknown) uncertain.push(declared);
  }
  return { detected: [...new Set(detected)], uncertain: [...new Set(uncertain)], uncertainIngredients: [...uncertainIngredients] };
}

export function eligibleForMyChef<T extends AllergyRecipe>(recipes: readonly T[], allergies: readonly string[] | null | undefined): T[] {
  return recipes.filter(recipe => { const result = matchRecipeAllergies(recipe, allergies); return !result.detected.length && !result.uncertain.length; });
}

export function plannerAllergyConflicts(planner: Record<string, Record<string, string | null>> | null, recipes: readonly (AllergyRecipe & { id: string; name: string })[], allergies: readonly string[] | null | undefined) {
  return Object.entries(planner ?? {}).flatMap(([day, meals]) => Object.entries(meals ?? {}).flatMap(([meal, id]) => {
    const recipe = recipes.find(item => item.id === id);
    if (!recipe) return [];
    const match = matchRecipeAllergies(recipe, allergies);
    return match.detected.length || match.uncertain.length ? [{ day, meal, recipe, ...match }] : [];
  }));
}
