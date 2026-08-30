"use client";

import { useEffect, useState } from "react";
import { recipes } from "@/data/recipes";

type ShoppingItem = {
  item: string;
  quantity: string;
};

type ShoppingData = {
  selectedRecipes: string[];
  shoppingList: ShoppingItem[];
  checkedItems: string[];
  people: number;
  plannerRecipes?: string[];
  plannerCounts?: Record<string, number>;
};

/*
 * SHOPPING LIST V3
 *
 * Important:
 * - recipes.ts remains the source of truth.
 * - Recipe quantities are never changed.
 * - The shopping list translates recipe quantities into
 *   practical quantities for buying.
 * - One shopping item = one line = one final quantity.
 */

/* ============================================================
 * CATEGORIES
 * ============================================================ */

const ingredientCategories: Record<string, string> = {
  // Meat & Fish
  chicken: "🥩 Meat & Fish",
  beef: "🥩 Meat & Fish",
  mince: "🥩 Meat & Fish",
  sausage: "🥩 Meat & Fish",
  bacon: "🥩 Meat & Fish",
  ham: "🥩 Meat & Fish",
  salmon: "🥩 Meat & Fish",
  tuna: "🥩 Meat & Fish",
  cod: "🥩 Meat & Fish",
  fish: "🥩 Meat & Fish",
  pork: "🥩 Meat & Fish",
  sirloin: "🥩 Meat & Fish",
  tofu: "🥩 Meat & Fish",
  lamb: "🥩 Meat & Fish",
  "cooked turkey": "🥩 Meat & Fish",
  turkey: "🥩 Meat & Fish",

  // Fruit & Vegetables
  onion: "🥕 Fruit & Vegetables",
  "red onion": "🥕 Fruit & Vegetables",
  "white onion": "🥕 Fruit & Vegetables",
  "spring onion": "🥕 Fruit & Vegetables",
  garlic: "🥕 Fruit & Vegetables",
  pepper: "🥕 Fruit & Vegetables",
  "red pepper": "🥕 Fruit & Vegetables",
  "green pepper": "🥕 Fruit & Vegetables",
  "yellow pepper": "🥕 Fruit & Vegetables",
  tomato: "🥕 Fruit & Vegetables",
  potato: "🥕 Fruit & Vegetables",
  potatoes: "🥕 Fruit & Vegetables",
  "baking potato": "🥕 Fruit & Vegetables",
  "baking potatoes": "🥕 Fruit & Vegetables",
  carrot: "🥕 Fruit & Vegetables",
  broccoli: "🥕 Fruit & Vegetables",
  mushroom: "🥕 Fruit & Vegetables",
  courgette: "🥕 Fruit & Vegetables",
  spinach: "🥕 Fruit & Vegetables",
  lettuce: "🥕 Fruit & Vegetables",
  beans: "🥕 Fruit & Vegetables",
  "green beans": "🥕 Fruit & Vegetables",
  celery: "🥕 Fruit & Vegetables",
  lemon: "🥕 Fruit & Vegetables",
  lime: "🥕 Fruit & Vegetables",
  apple: "🥕 Fruit & Vegetables",
  apples: "🥕 Fruit & Vegetables",
  blueberry: "🥕 Fruit & Vegetables",
  blueberries: "🥕 Fruit & Vegetables",
  strawberry: "🥕 Fruit & Vegetables",
  strawberries: "🥕 Fruit & Vegetables",
  peach: "🥕 Fruit & Vegetables",
  peaches: "🥕 Fruit & Vegetables",
  leek: "🥕 Fruit & Vegetables",
  watercress: "🥕 Fruit & Vegetables",
  avocado: "🥕 Fruit & Vegetables",
  cucumber: "🥕 Fruit & Vegetables",
  "butternut squash": "🥕 Fruit & Vegetables",
  "red chilli": "🥕 Fruit & Vegetables",
  "spring greens": "🥕 Fruit & Vegetables",
  swede: "🥕 Fruit & Vegetables",
  "green chilli": "🥕 Fruit & Vegetables",
  beansprouts: "🥕 Fruit & Vegetables",

  // Chilled
  egg: "🧊 Chilled",
  eggs: "🧊 Chilled",
  yoghurt: "🧊 Chilled",
  cheese: "🧊 Chilled",
  cheddar: "🧊 Chilled",
  parmesan: "🧊 Chilled",
  mozzarella: "🧊 Chilled",
  feta: "🧊 Chilled",
  "reduced-fat feta cheese": "🧊 Chilled",
  butter: "🧊 Chilled",
  milk: "🧊 Chilled",
  cream: "🧊 Chilled",
  "crème fraîche": "🧊 Chilled",

  // Frozen
  peas: "❄️ Frozen",
  "frozen peas": "❄️ Frozen",
  "frozen berries": "❄️ Frozen",
  "oven chips": "❄️ Frozen",

  // Bakery
  bread: "🍞 Bakery",
  "white bread": "🍞 Bakery",
  roll: "🍞 Bakery",
  bun: "🍞 Bakery",
  bagel: "🍞 Bakery",
  crumpet: "🍞 Bakery",
  crumpets: "🍞 Bakery",
  muffin: "🍞 Bakery",
  muffins: "🍞 Bakery",
  "breakfast muffin": "🍞 Bakery",
  "breakfast muffins": "🍞 Bakery",
  wrap: "🍞 Bakery",
  tortilla: "🍞 Bakery",
  pitta: "🍞 Bakery",
  naan: "🍞 Bakery",

  // Cupboard
  rice: "🥫 Cupboard",
  pasta: "🥫 Cupboard",
  penne: "🥫 Cupboard",
  spaghetti: "🥫 Cupboard",
  couscous: "🥫 Cupboard",
  flour: "🥫 Cupboard",
  breadcrumbs: "🥫 Cupboard",
  sweetcorn: "🥫 Cupboard",
  passata: "🥫 Cupboard",
  stock: "🥫 Cupboard",
  "chicken stock": "🥫 Cupboard",
  "beef stock": "🥫 Cupboard",
  "fish stock": "🥫 Cupboard",
  "vegetable stock": "🥫 Cupboard",
  "low-salt chicken stock": "🥫 Cupboard",
  "low-salt turkey stock": "🥫 Cupboard",
  "chicken or turkey stock": "🥫 Cupboard",
  "turkey stock": "🥫 Cupboard",
  gravy: "🥫 Cupboard",
  "chicken gravy": "🥫 Cupboard",
  "beef gravy": "🥫 Cupboard",
  "onion gravy": "🥫 Cupboard",
  mayonnaise: "🥫 Cupboard",
  mustard: "🥫 Cupboard",
  worcestershire: "🥫 Cupboard",
  "worcestershire sauce": "🥫 Cupboard",
  honey: "🥫 Cupboard",
  "maple syrup": "🥫 Cupboard",
  "golden syrup": "🥫 Cupboard",
  "tomato purée": "🥫 Cupboard",
  "tomato puree": "🥫 Cupboard",
  "olive oil": "🥫 Cupboard",
  "vegetable oil": "🥫 Cupboard",
  "fresh basil pesto": "🥫 Cupboard",
  "basil pesto": "🥫 Cupboard",
  sugar: "🥫 Cupboard",
  "caster sugar": "🥫 Cupboard",
  "brown sugar": "🥫 Cupboard",
  "vanilla extract": "🥫 Cupboard",
  "baking powder": "🥫 Cupboard",
  "baking soda": "🥫 Cupboard",
  bicarbonate: "🥫 Cupboard",
  oats: "🥫 Cupboard",
  "rolled oats": "🥫 Cupboard",
  "reduced-salt baked beans": "🥫 Cupboard",
  "garlic paste": "🥫 Cupboard",
  "oyster sauce": "🥫 Cupboard",
  "sesame oil": "🥫 Cupboard",
  "red wine": "🥫 Cupboard",
  "white wine": "🥫 Cupboard",
  cannellini: "🥫 Cupboard",
  "cannellini beans": "🥫 Cupboard",
  "sunflower oil": "🥫 Cupboard",
  "rice noodles": "🥫 Cupboard",
  "basmati rice": "🥫 Cupboard",
  "brown rice": "🥫 Cupboard",
  chickpeas: "🥫 Cupboard",
  "low-salt soy sauce": "🥫 Cupboard",
  "low salt soy sauce": "🥫 Cupboard",
  "red wine vinegar": "🥫 Cupboard",
  "white wine vinegar": "🥫 Cupboard",
  cornflour: "🥫 Cupboard",
  "coconut milk": "🥫 Cupboard",
  "sweet chilli sauce": "🥫 Cupboard",
  "tinned lentils": "🥫 Cupboard",
  lentils: "🥫 Cupboard",
  "sesame seeds": "🧂 Herbs & Spices",
  "garlic granules": "🧂 Herbs & Spices",

  // Herbs & Spices
  thyme: "🧂 Herbs & Spices",
  rosemary: "🧂 Herbs & Spices",
  oregano: "🧂 Herbs & Spices",
  basil: "🧂 Herbs & Spices",
  parsley: "🧂 Herbs & Spices",
  chives: "🧂 Herbs & Spices",
  paprika: "🧂 Herbs & Spices",
  cumin: "🧂 Herbs & Spices",
  turmeric: "🧂 Herbs & Spices",
  coriander: "🧂 Herbs & Spices",
  "mixed herbs": "🧂 Herbs & Spices",
  "curry powder": "🧂 Herbs & Spices",
  "chilli flakes": "🧂 Herbs & Spices",
  "mild chilli seasoning": "🧂 Herbs & Spices",
  "mild chili seasoning": "🧂 Herbs & Spices",
  "red chilli powder": "🧂 Herbs & Spices",
  "chilli powder": "🧂 Herbs & Spices",
  "chilli seasoning": "🧂 Herbs & Spices",
  "chili seasoning": "🧂 Herbs & Spices",
  ginger: "🧂 Herbs & Spices",
  cinnamon: "🧂 Herbs & Spices",
  "ground cinnamon": "🧂 Herbs & Spices",
  dill: "🧂 Herbs & Spices",
  sage: "🧂 Herbs & Spices",
  mint: "🧂 Herbs & Spices",
  "white pepper": "🧂 Herbs & Spices",
  
  "black pepper": "🧂 Herbs & Spices",
  "freshly ground black pepper": "🧂 Herbs & Spices",
};

/* ============================================================
 * BASIC TEXT / NUMBER HELPERS
 * ============================================================ */

function cleanText(value: string): string {
  return value
    .replace(/Â¼/g, "¼")
    .replace(/Â½/g, "½")
    .replace(/Â¾/g, "¾")
    .replace(/Ã—/g, "×")
    .replace(/Ã©/g, "é")
    .replace(/Ã¨/g, "è")
    .replace(/Ãª/g, "ê")
    .replace(/Ã´/g, "ô")
    .replace(/Ã¹/g, "ù")
    .replace(/Ã¢/g, "â")
    .replace(/Ã®/g, "î")
    .replace(/â€™/g, "’")
    .replace(/â€“/g, "–")
    .replace(/â€”/g, "—")
    .replace(/â€¦/g, "…")
    .replace(/Â/g, "")
    .trim();
}

function fractionToDecimal(value: string): number | null {
  const v = cleanText(value).trim();

  const fractions: Record<string, number> = {
    "¼": 0.25,
    "½": 0.5,
    "¾": 0.75,
    "⅛": 0.125,
    "⅜": 0.375,
    "⅝": 0.625,
    "⅞": 0.875,
  };

  if (fractions[v] !== undefined) return fractions[v];

  const mixedUnicode = v.match(/^(\d+)([¼½¾⅛⅜⅝⅞])$/);
  if (mixedUnicode) {
    return Number(mixedUnicode[1]) + fractions[mixedUnicode[2]];
  }

  const mixedSlash = v.match(/^(\d+)\s+(\d+)\s*\/\s*(\d+)$/);
  if (mixedSlash) {
    const denominator = Number(mixedSlash[3]);
    return denominator
      ? Number(mixedSlash[1]) + Number(mixedSlash[2]) / denominator
      : null;
  }

  const slash = v.match(/^(\d+)\s*\/\s*(\d+)$/);
  if (slash) {
    const denominator = Number(slash[2]);
    return denominator ? Number(slash[1]) / denominator : null;
  }

  const numeric = Number(v);
  return Number.isFinite(numeric) ? numeric : null;
}

function decimalToFraction(value: number): string {
  const rounded = Math.round(value * 100) / 100;
  const whole = Math.floor(rounded);
  const fraction = Math.round((rounded - whole) * 100) / 100;

  const map: Record<string, string> = {
    "0.125": "⅛",
    "0.25": "¼",
    "0.375": "⅜",
    "0.5": "½",
    "0.625": "⅝",
    "0.75": "¾",
    "0.875": "⅞",
  };

  if (fraction === 0) return String(whole);

  const key = Object.keys(map).find(
    (candidate) => Math.abs(Number(candidate) - fraction) < 0.0001
  );

  if (!key) return Number(rounded.toFixed(2)).toString();

  return whole === 0 ? map[key] : `${whole}${map[key]}`;
}

function normaliseUnit(unit: string): string {
  const u = cleanText(unit).toLowerCase().trim();

  const map: Record<string, string> = {
    gram: "g",
    grams: "g",
    kilogram: "kg",
    kilograms: "kg",
    millilitre: "ml",
    millilitres: "ml",
    litre: "l",
    litres: "l",
    teaspoon: "tsp",
    teaspoons: "tsp",
    tablespoon: "tbsp",
    tablespoons: "tbsp",
    sprig: "sprig",
    sprigs: "sprig",
    cloves: "clove",
  };

  return map[u] ?? u;
}

function parseQuantity(
  quantity: string
): { amount: number; unit: string } | null {
  const q = cleanText(quantity)
    .replace(/\s*\([^)]*\)/g, "")
    .replace(/\s*\(optional\)/gi, "")
    .trim();

  if (!q) return null;

  const lower = q.toLowerCase();

  if (
    lower === "to taste" ||
    lower === "as required" ||
    lower === "as needed" ||
    lower === "optional"
  ) {
    return null;
  }

  const multiplied = q.match(
    /^(\d+(?:\.\d+)?)\s*[×x]\s*(\d+(?:\.\d+)?(?:[¼½¾⅛⅜⅝⅞])?|\d+\s*\/\s*\d+|[¼½¾⅛⅜⅝⅞])\s*(.*)$/i
  );

  if (multiplied) {
    const count = Number(multiplied[1]);
    const each = fractionToDecimal(multiplied[2]);
    if (each === null) return null;
    return {
      amount: count * each,
      unit: normaliseUnit(multiplied[3]),
    };
  }

  const match = q.match(
    /^(\d+(?:\.\d+)?(?:[¼½¾⅛⅜⅝⅞])?|\d+\s+\d+\s*\/\s*\d+|\d+\s*\/\s*\d+|[¼½¾⅛⅜⅝⅞])\s*(.*)$/
  );

  if (!match) {
    const sizeOnly = lower.match(/^(small|medium|large)$/);
    if (sizeOnly) return { amount: 1, unit: sizeOnly[1] };
    return null;
  }

  const amount = fractionToDecimal(match[1]);
  if (amount === null) return null;

  return {
    amount,
    unit: normaliseUnit(match[2]),
  };
}

function formatQuantity(amount: number, unit: string): string {
  const n = Math.round(amount * 100) / 100;
  const a = decimalToFraction(n);
  const u = normaliseUnit(unit);

  if (u === "ml") {
    return `${Math.ceil(n)} ml`;
  }

  if (u === "g") {
    return `${Math.ceil(n)} g`;
  }

  if (u === "kg" || u === "l") {
    return `${a} ${u}`;
  }

  if (u === "clove") {
    const wholeCloves = Math.ceil(n);
    return `${wholeCloves} clove${wholeCloves === 1 ? "" : "s"}`;
  }

  if (u === "sprig") {
    return `${a} sprig${n === 1 ? "" : "s"}`;
  }

  if (u === "lemon") {
    return `${a} lemon${n === 1 ? "" : "s"}`;
  }

  if (u === "small handful") {
    return `${a} small handful${n === 1 ? "" : "s"}`;
  }

  return `${a} ${u}`;
}

/* ============================================================
 * SHOPPING NORMALISATION
 * ============================================================ */

const WHOLE_PRODUCE = new Set([
  "courgette",
  "onion",
  "red onion",
  "red pepper",
  "green pepper",
  "yellow pepper",
  "green chilli",
  "red chilli",
  "cucumber",
  "butternut squash",
  "spring greens",
  "swede",
  "lemon",
  "apple",
  "potatoes",
  "baking potatoes",
]);

const ML_ITEMS = new Set([
  "mayonnaise",
  "mustard",
  "worcestershire sauce",
  "worcestershire",
  "tomato purée",
  "tomato puree",
  "passata",
  "honey",
  "maple syrup",
  "golden syrup",
  "olive oil",
  "vegetable oil",
  "fresh basil pesto",
  "basil pesto",
  "vanilla extract",
  "milk",
  "cream",
  "crème fraîche",
  "lemon juice",
]);

function removePreparationWords(value: string): string {
  return value
    .replace(
      /\s*,\s*(?:finely chopped|roughly chopped|thinly sliced|diced|sliced|chopped|crushed|minced|grated|cubed|trimmed|peeled|halved|quartered|crumbled|separated|drained|cut into bite[- ]sized pieces|cut into strips|cut into thin strips|cut into wedges)\b/gi,
      ""
    )
    .replace(
      /\s*[-–]\s*(?:to taste|as required|as needed|optional)\b/gi,
      ""
    )
    .replace(/[.,]+$/, "")
    .trim();
}

function normaliseIngredient(raw: string): string {
  let value = removePreparationWords(cleanText(raw))
    .replace(/\s*\(optional\)/gi, "")
    .trim();
  const lower = value.toLowerCase();

  if (/^egg(?:s)?$/.test(lower) || /^egg white(?:s)?$/.test(lower)) {
    return "Eggs";
  }

  if (lower.includes("feta cheese")) {
    return "Reduced-fat feta cheese";
  }

  if (/^potato(?:es)?$/.test(lower)) {
    return "Potatoes";
  }

  if (/^(?:baking )?potato(?:es)?$/.test(lower)) {
    return lower.startsWith("baking") ? "Baking potatoes" : "Potatoes";
  }

  if (/^(small|medium|large)\s+courgette$/.test(lower) || /^courgette(?:s)?$/.test(lower)) {
    return "Courgette";
  }

  if (/^(small|medium|large)\s+onion$/.test(lower) || /^onion(?:s)?$/.test(lower)) {
    return "Onion";
  }

  if (/^(red|green|yellow)\s+pepper(?:s)?$/.test(lower)) {
    return lower.replace(/s$/, "").replace(/^./, (c) => c.toUpperCase());
  }

  if (/^red onion(?:s)?$/.test(lower)) {
    return "Red onion";
  }

  if (lower.includes("lemon juice")) {
    return "Lemon juice";
  }

  if (lower.includes("lemon zest")) {
    return "Lemon zest";
  }

  if (/^lemon(?:s)?$/.test(lower)) {
    return "Lemon";
  }

  if (/^lettuce(?:\s+(?:leaf|leaves))?$/.test(lower)) {
    return "Lettuce";
  }

  // Fresh tomatoes are combined under one shopping item.
  if (/^tomatoes?$/.test(lower)) {
    return "Tomato";
  }

  // Chopped tomatoes are a separate purchased product from fresh tomatoes.
  // Treat both singular/plural and tinned/non-tinned wording consistently.
  if (/^(?:tinned\s+)?chopped tomatoes?$/.test(lower)) {
    return "Tinned chopped tomatoes";
  }

  if (/^breakfast muffins?$/.test(lower)) {
    return "Breakfast muffins";
  }

  if (/^lean cooked ham$/.test(lower) || lower === "cooked ham" || lower === "ham") {
    return "Cooked ham";
  }

  if (lower === "cooked lamb" || lower === "lamb cooked") {
    return "Lamb";
  }

  if (lower === "salmon" || lower === "salmon fillet" || lower === "salmon fillets") {
    return "Salmon fillet";
  }

  if (
    lower.includes("pork sausages") ||
    lower.includes("light pork sausages") ||
    lower === "sausages"
  ) {
    return "Sausages (low fat pork)";
  }

  if (lower === "tinned tuna" || lower === "tuna") {
    return "Tinned Tuna";
  }

  if (
    lower === "beef mince" ||
    lower === "beef mince (5%)" ||
    lower === "beef mince 5%" ||
    lower === "beef mince 5% fat" ||
    lower === "lean beef mince" ||
    lower === "lean beef mince 5%" ||
    lower === "lean beef mince (5%)" ||
    lower === "lean beef mince (5% fat)"
  ) {
    return "Beef mince (5% fat)";
  }

  if (lower === "pepper") {
    return "Green pepper";
  }

  if (lower === "oil") {
    return "Sunflower oil";
  }

  if (/^green chilli(?:s)?$/.test(lower)) {
    return "Green chilli";
  }

  if (/^red chilli(?:s)?$/.test(lower)) {
    return "Red chilli";
  }

  if (/^cucumber(?:s)?$/.test(lower)) {
    return "Cucumber";
  }

  if (/^avocado(?:s)?(?:\s*\(optional\))?$/.test(lower)) {
    return "Avocado";
  }

  if (/^butternut squash(?:es)?$/.test(lower)) {
    return "Butternut squash";
  }

  if (/^spring greens?$/.test(lower)) {
    return "Spring greens";
  }

  if (/^swede(?:s)?$/.test(lower)) {
    return "Swede";
  }

  if (lower === "fresh basil pesto" || lower === "basil pesto") {
    return "Fresh basil pesto";
  }

  if (
    lower.includes("pitta") ||
    lower.includes("pita")
  ) {
    return "White Pitta";
  }

  if (
    lower === "natural yoghurt" ||
    lower === "plain natural yoghurt" ||
    lower === "plain yoghurt"
  ) {
    return "Natural Yoghurt";
  }

  if (lower === "butter" || lower === "unsalted butter") {
    return "Unsalted Butter";
  }

  if (lower === "tinned lentils" || lower === "lentils") {
    return "Tinned lentils";
  }

  if (lower === "fresh chives" || lower === "fresh chives chopped" || lower === "chives") {
    return "Chives";
  }

  if (lower === "coriander" || lower === "fresh coriander") {
    return "Fresh coriander";
  }

  if (lower === "dried coriander") {
    return "Dried coriander";
  }

  return value;
}

/* ============================================================
 * RECIPE SERVINGS
 * ============================================================ */

/*
 * Dinner recipes in the current library are written as family-sized
 * recipes. plannerCounts contains the total number of people eating each
 * planned recipe across the week, so each meal can have its own people count.
 *
 * This replaces the old lexicographical recipe.code >= "D016" test,
 * which was the source of the inconsistent scaling seen in the last test.
 */
function recipeServings(recipe: any): number {
  return recipe.category === "Dinner" ? 4 : 1;
}

/* ============================================================
 * PRACTICAL SHOPPING CONVERSIONS
 * ============================================================ */

function quantityToMl(parsed: { amount: number; unit: string }): number | null {
  if (parsed.unit === "ml") return parsed.amount;
  if (parsed.unit === "l") return parsed.amount * 1000;
  if (parsed.unit === "tsp") return parsed.amount * 5;
  if (parsed.unit === "tbsp") return parsed.amount * 15;
  return null;
}

function normaliseProduceAmount(
  name: string,
  parsed: { amount: number; unit: string }
): number | null {
  const lower = name.toLowerCase();

  // All courgettes are treated as medium for shopping purposes.
  if (lower === "courgette") {
    if (["small", "medium", "large", "", "courgette"].includes(parsed.unit)) {
      return parsed.amount;
    }
    return null;
  }

  // Small/medium/large onions and peppers are normalised to medium equivalents.
  if (
    lower === "onion" ||
    lower === "red onion" ||
    lower === "red pepper" ||
    lower === "green pepper" ||
    lower === "yellow pepper"
  ) {
    const sizeFactor =
      parsed.unit === "small"
        ? 0.5
        : parsed.unit === "large"
          ? 1.5
          : 1;

    if (
      parsed.unit === "" ||
      parsed.unit === lower ||
      parsed.unit === "small" ||
      parsed.unit === "medium" ||
      parsed.unit === "large"
    ) {
      return parsed.amount * sizeFactor;
    }

    // Chopped onion is not a shopping quantity.
    // 2 tbsp chopped onion ≈ ¼ onion.
    if (lower === "onion" && parsed.unit === "tbsp") {
      return parsed.amount / 8;
    }

    return null;
  }

  if (lower === "lemon") {
    if (parsed.unit === "" || parsed.unit === "lemon") {
      return parsed.amount;
    }
  }

  if (lower === "apple") {
    if (["", "apple", "small", "medium", "large"].includes(parsed.unit)) {
      return parsed.amount;
    }
  }

  if (lower === "cucumber") {
    // Recipe data may specify cucumber by weight.
    // Practical shopping assumptions: 37.5 g = 1/6 cucumber,
    // and 40 usable slices = 1 cucumber.
    if (parsed.unit === "g") {
      return (parsed.amount / 37.5) / 6;
    }

    if (parsed.unit === "slice" || parsed.unit === "slices") {
      return parsed.amount / 40;
    }

    if (["", "cucumber", "small", "medium", "large"].includes(parsed.unit)) {
      return parsed.amount;
    }
  }

  return null;
}

/*
 * Potatoes are a purchase-unit item.
 *
 * Ordinary potatoes:
 *   2 kg bag
 *
 * Baking potatoes:
 *   whole potatoes
 *
 * A 250g baking potato in the recipe represents one baking potato.
 */
function normalisePotato(
  name: string,
  parsed: { amount: number; unit: string }
): { amount: number; unit: string } | null {
  const lower = name.toLowerCase();

  if (lower === "potatoes") {
    if (parsed.unit === "g") {
      return { amount: parsed.amount, unit: "2kg-bag-source-g" };
    }
    if (parsed.unit === "kg") {
      return { amount: parsed.amount * 1000, unit: "2kg-bag-source-g" };
    }
    if (parsed.unit === "" || parsed.unit === "potato" || parsed.unit === "potatoes") {
      // Individual ordinary potatoes: one potato each, represented as a bag
      // only after a reliable weight is available. Keep these as potatoes.
      return { amount: parsed.amount, unit: "individual-potato" };
    }
  }

  if (lower === "baking potatoes") {
    if (parsed.unit === "g") {
      return { amount: parsed.amount / 250, unit: "baking-potato" };
    }
    if (parsed.unit === "kg") {
      return { amount: (parsed.amount * 1000) / 250, unit: "baking-potato" };
    }
    if (
      parsed.unit === "" ||
      parsed.unit === "baking potato" ||
      parsed.unit === "baking potatoes"
    ) {
      return { amount: parsed.amount, unit: "baking-potato" };
    }
  }

  return null;
}

/*
 * Lettuce is bought whole, not by the leaf.
 *
 * Practical shopping assumption: 20 usable leaves per lettuce.
 * This is intentionally a shopping conversion only; recipe data is unchanged.
 */
function normaliseLettuce(
  parsed: { amount: number; unit: string }
): { amount: number; unit: string } | null {
  // Recipe data may specify lettuce by weight.
  // Practical shopping assumptions: 12.5 g = 1 usable leaf,
  // and 20 usable leaves = 1 lettuce.
  if (parsed.unit === "g") {
    const leaves = parsed.amount / 12.5;
    return { amount: leaves / 20, unit: "lettuce" };
  }

  if (parsed.unit === "" || parsed.unit === "leaf" || parsed.unit === "leaves") {
    return { amount: parsed.amount / 20, unit: "lettuce" };
  }

  return null;
}

/*
 * Fresh chives are bought as a bunch/pack rather than tablespoons.
 * Practical assumption: 1 tbsp chopped chives ≈ 1/8 bunch.
 * Therefore 8 tbsp = 1 bunch.
 */
function normaliseFreshChives(
  parsed: { amount: number; unit: string }
): { amount: number; unit: string } | null {
  if (parsed.unit === "tbsp") {
    return { amount: parsed.amount / 8, unit: "bunch" };
  }

  if (parsed.unit === "g") {
    return { amount: parsed.amount, unit: "g" };
  }

  return null;
}

/*
 * Fresh pesto is a purchased product, so its recipe tbsp/tsp measurement
 * becomes exact ml on the shopping list.
 */
function normaliseShoppingQuantity(
  name: string,
  quantity: string
): string {
  const parsed = parseQuantity(quantity);
  if (!parsed) return cleanText(quantity);

  const lower = name.toLowerCase();

  if (lower === "eggs") {
    return decimalToFraction(parsed.amount);
  }

  if (lower === "fresh coriander") {
    if (parsed.unit === "tsp") return formatQuantity(parsed.amount, "sprig");
    if (parsed.unit === "tbsp") return formatQuantity(parsed.amount * 3, "sprig");
  }

  if (lower === "natural yoghurt") {
    let tsp = 0;

    if (parsed.unit === "tsp") tsp = parsed.amount;
    else if (parsed.unit === "tbsp") tsp = parsed.amount * 3;
    else if (parsed.unit === "ml") tsp = parsed.amount / 5;
    else if (parsed.unit === "l") tsp = (parsed.amount * 1000) / 5;
    else if (parsed.unit === "g") tsp = parsed.amount / 5;

    if (tsp > 0) {
      const roundedQuarter = Math.max(0.25, Math.round(tsp * 4) / 4);
      return `${decimalToFraction(roundedQuarter)} tsp`;
    }
  }

  if (lower === "tomato purée" || lower === "tomato puree") {
    if (parsed.unit === "g") {
      return formatQuantity(parsed.amount, "g");
    }

    if (parsed.unit === "tsp") {
      return formatQuantity(parsed.amount * 5, "g");
    }

    if (parsed.unit === "tbsp") {
      return formatQuantity(parsed.amount * 15, "g");
    }
  }

  if (lower === "passata") {
    if (parsed.unit === "g") {
      return formatQuantity(parsed.amount, "ml");
    }

    if (parsed.unit === "ml") {
      return formatQuantity(parsed.amount, "ml");
    }

    if (parsed.unit === "l") {
      return formatQuantity(parsed.amount * 1000, "ml");
    }

    if (parsed.unit === "tsp") {
      return formatQuantity(parsed.amount * 5, "ml");
    }

    if (parsed.unit === "tbsp") {
      return formatQuantity(parsed.amount * 15, "ml");
    }
  }

  if (lower === "potatoes" || lower === "baking potatoes") {
    const converted = normalisePotato(name, parsed);
    if (converted) {
      if (converted.unit === "2kg-bag-source-g") {
        return `${converted.amount} g`;
      }
      if (converted.unit === "baking-potato") {
        return decimalToFraction(converted.amount);
      }
      if (converted.unit === "individual-potato") {
        return decimalToFraction(converted.amount);
      }
    }
  }

  if (lower === "lettuce") {
    const converted = normaliseLettuce(parsed);
    if (converted) return decimalToFraction(converted.amount);
  }

  if (lower === "chives") {
    const converted = normaliseFreshChives(parsed);
    if (converted) {
      if (converted.unit === "bunch") return `${decimalToFraction(converted.amount)} bunch`;
      return formatQuantity(converted.amount, "g");
    }
  }

  if (WHOLE_PRODUCE.has(lower)) {
    const converted = normaliseProduceAmount(name, parsed);
    if (converted !== null) return decimalToFraction(converted);
  }

  if (ML_ITEMS.has(lower) || lower.includes("oil") || lower.includes("syrup")) {
    const ml = quantityToMl(parsed);
    if (ml !== null) return formatQuantity(ml, "ml");
  }

  // Sugar is displayed as practical teaspoon fractions.
  if (
    (lower === "sugar" ||
      lower === "caster sugar" ||
      lower === "brown sugar") &&
    (parsed.unit === "tsp" || parsed.unit === "tbsp")
  ) {
    const tsp = parsed.unit === "tbsp" ? parsed.amount * 3 : parsed.amount;
    const rounded = Math.max(0.25, Math.round(tsp * 4) / 4);
    return `${decimalToFraction(rounded)} tsp`;
  }

  // Vanilla extract is a liquid product.
  if (lower === "vanilla extract") {
    const ml = quantityToMl(parsed);
    if (ml !== null) return formatQuantity(ml, "ml");
  }

  // For herbs/spices, tsp remains a useful shopping quantity.
  if (parsed.unit === "tbsp") {
    // Avoid ever displaying tbsp. For dry herbs/spices, convert to tsp.
    return formatQuantity(parsed.amount * 3, "tsp");
  }

  return formatQuantity(parsed.amount, parsed.unit);
}

function combineQuantity(
  current: string,
  incoming: string,
  name: string
): string {
  const a = parseQuantity(current);
  const b = parseQuantity(incoming);

  if (!a) return incoming;
  if (!b) return current;

  const lower = name.toLowerCase();

  if (lower === "eggs") {
    return decimalToFraction(a.amount + b.amount);
  }

  if (lower === "fresh coriander") {
    if (a.unit === "sprig" && b.unit === "sprig") {
      return formatQuantity(a.amount + b.amount, "sprig");
    }
  }

  if (lower === "lemon") {
    // Juice and zest from the same physical lemon can be shared.
    return decimalToFraction(Math.max(a.amount, b.amount));
  }

  if (lower === "lettuce") {
    // Only combine lettuce quantities when they use the same unit.
    if (a.unit === b.unit) {
      return decimalToFraction(a.amount + b.amount);
    }

    return current;
  }

  if (lower === "potatoes") {
    if (a.unit === "g" && b.unit === "g") {
      return `${Math.round((a.amount + b.amount) * 100) / 100} g`;
    }
    if (a.unit === "individual-potato" && b.unit === "individual-potato") {
      return decimalToFraction(a.amount + b.amount);
    }
  }

  if (lower === "baking potatoes") {
    return decimalToFraction(a.amount + b.amount);
  }

  if (
    lower === "courgette" ||
    lower === "onion" ||
    lower === "red onion" ||
    lower === "red pepper" ||
    lower === "green pepper" ||
    lower === "yellow pepper" ||
    lower === "green chilli" ||
    lower === "cucumber" ||
    lower === "apple"
  ) {
    // Only combine produce quantities when they use the same unit.
    // For example, ¼ red onion must not be added to 15 g red onion.
    if (a.unit === b.unit) {
      return decimalToFraction(a.amount + b.amount);
    }

    return current;
  }

  if (a.unit === "ml" && b.unit === "ml") {
    return formatQuantity(a.amount + b.amount, "ml");
  }

  if (
    (a.unit === "g" || a.unit === "kg") &&
    (b.unit === "g" || b.unit === "kg")
  ) {
    const ag = a.unit === "kg" ? a.amount * 1000 : a.amount;
    const bg = b.unit === "kg" ? b.amount * 1000 : b.amount;
    return formatQuantity(ag + bg, "g");
  }

  if (a.unit === b.unit) {
    return formatQuantity(a.amount + b.amount, a.unit);
  }

  // Never create a second quantity for one shopping item.
  return current;
}

function finaliseShoppingQuantity(item: ShoppingItem): ShoppingItem {
  const name = normaliseIngredient(item.item);
  const lower = name.toLowerCase();
  const parsed = parseQuantity(item.quantity);

  if (!parsed) return item;

  /*
   * Dry herbs/spices used in very small quantities are displayed as
   * practical quarter-teaspoon fractions. Never show a decimal and never
   * show less than ¼ tsp.
   */
  const FRACTIONAL_SPICES = new Set([
    "garlic granules",
    "black pepper",
    "turmeric",
    "ground ginger",
    "paprika",
    "sugar",
    "caster sugar",
    "brown sugar",
  ]);

  if (FRACTIONAL_SPICES.has(lower) && parsed.unit === "tsp") {
    const rounded = Math.max(0.25, Math.round(parsed.amount * 4) / 4);

    return {
      item: name,
      quantity: `${decimalToFraction(rounded)} tsp`,
    };
  }

  if (lower === "fresh coriander" && parsed.unit === "sprig") {
    const rounded = Math.max(0.25, Math.round(parsed.amount * 4) / 4);
    return {
      item: "Fresh coriander",
      quantity: formatQuantity(rounded, "sprig"),
    };
  }

  if (lower === "cooked lamb" && parsed.unit === "g") {
    return {
      item: "Cooked lamb",
      quantity: `${Math.ceil(parsed.amount)} g`,
    };
  }

  if (lower === "potatoes" && parsed.unit === "g") {
    const kg = parsed.amount / 1000;
    return {
      item: "Potatoes",
      quantity: `${kg.toFixed(1)} kg`,
    };
  }

  if (lower === "baking potatoes") {
    return {
      item: "Baking potatoes",
      quantity: decimalToFraction(Math.ceil(parsed.amount)),
    };
  }

  if (lower === "lettuce") {
    const roundedHalf = Math.max(0.5, Math.ceil(parsed.amount * 2) / 2);
    return {
      item: "Lettuce",
      quantity: decimalToFraction(roundedHalf),
    };
  }

  if (lower === "courgette") {
    return {
      item: "Courgette",
      quantity: decimalToFraction(Math.ceil(parsed.amount)),
    };
  }

  if (lower === "cucumber") {
    const roundedHalf = Math.max(0.5, Math.ceil(parsed.amount * 2) / 2);
    return {
      item: "Cucumber",
      quantity: decimalToFraction(roundedHalf),
    };
  }

  if (
    lower === "onion" ||
    lower === "red pepper" ||
    lower === "green pepper" ||
    lower === "yellow pepper" ||
    lower === "green chilli" ||
    lower === "apple" ||
    lower === "lemon"
  ) {
    return {
      item: name,
      quantity: decimalToFraction(Math.ceil(parsed.amount)),
    };
  }

  if (lower === "chives" && parsed.unit === "bunch") {
    return {
      item: "Chives",
      quantity: `${decimalToFraction(Math.ceil(parsed.amount))} bunch${
        Math.ceil(parsed.amount) === 1 ? "" : "es"
      }`,
    };
  }

  return item;
}

function getCategory(item: string): string {
  const lower = cleanText(item).toLowerCase();

  // Explicit category overrides for common recipe/shopping aliases.
  if (
    lower === "beansprouts" ||
    lower === "bean sprouts"
  ) {
    return "🥕 Fruit & Vegetables";
  }

  if (
    lower === "chickpeas" ||
    lower === "rice noodles" ||
    lower === "basmati rice" ||
    lower === "brown rice" ||
    lower === "cornflour" ||
    lower === "coconut milk" ||
    lower === "low-salt soy sauce" ||
    lower === "low salt soy sauce" ||
    lower === "red wine vinegar" ||
    lower === "white wine vinegar"
  ) {
    return "🥫 Cupboard";
  }

  if (
    lower === "mint" ||
    lower === "white pepper"
  ) {
    return "🧂 Herbs & Spices";
  }

  // Tinned chopped tomatoes are a cupboard item regardless of the
  // "tomato" keyword also matching the fresh-produce category.
  if (lower === "tinned chopped tomatoes") {
    return "🥫 Cupboard";
  }

  // Stock and gravy are cupboard items regardless of the meat/fish named
  // within the product description.
  if (
    lower.includes("stock") ||
    lower.includes("gravy")
  ) {
    return "🥫 Cupboard";
  }

  const key = Object.keys(ingredientCategories)
    .sort((a, b) => b.length - a.length)
    .find((candidate) => lower.includes(candidate));

  return key ? ingredientCategories[key] : "Other";
}

/* ============================================================
 * PAGE
 * ============================================================ */

export default function ShoppingPage() {
  const [selectedRecipes, setSelectedRecipes] = useState<string[]>([]);
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [people, setPeople] = useState<number>(1);
  const [plannerRecipes, setPlannerRecipes] = useState<string[]>([]);
  const [plannerCounts, setPlannerCounts] = useState<Record<string, number>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("shopping-data");

    if (saved) {
      try {
        const data: ShoppingData = JSON.parse(saved);

        const savedPlannerRecipes = data.plannerRecipes ?? [];

        /*
         * The Weekly Planner is now the single source of truth.
         * Ignore any legacy selected/manual recipes that may still
         * exist in older localStorage data.
         */
        setSelectedRecipes(savedPlannerRecipes);
        setShoppingList(data.shoppingList ?? []);
        setCheckedItems(data.checkedItems ?? []);
        setPeople(data.people ?? 1);
        setPlannerRecipes(savedPlannerRecipes);
        setPlannerCounts(data.plannerCounts ?? {});
      } catch {
        // Ignore invalid saved data.
      }
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    /*
     * Clean up legacy shopping data from before the Weekly Planner
     * became the single source of truth. Current planner data is kept;
     * old manually-added recipe IDs are discarded.
     */
    const saved = localStorage.getItem("shopping-data");

    if (saved) {
      try {
        const data: ShoppingData = JSON.parse(saved);
        const currentPlannerRecipes = data.plannerRecipes ?? [];

        localStorage.setItem(
          "shopping-data",
          JSON.stringify({
            ...data,
            selectedRecipes: currentPlannerRecipes,
            plannerRecipes: currentPlannerRecipes,
            plannerCounts: data.plannerCounts ?? {},
          })
        );
      } catch {
        // Ignore invalid saved data.
      }
    }

    function reloadShoppingData() {
      const saved = localStorage.getItem("shopping-data");
      if (!saved) return;

      try {
        const data: ShoppingData = JSON.parse(saved);

        const savedPlannerRecipes = data.plannerRecipes ?? [];

        setSelectedRecipes(savedPlannerRecipes);
        setPlannerRecipes(savedPlannerRecipes);
        setPlannerCounts(data.plannerCounts ?? {});
        setPeople(data.people ?? 1);
      } catch {
        // Ignore invalid saved data.
      }
    }

    window.addEventListener("shopping-list-updated", reloadShoppingData);
    window.addEventListener("storage", reloadShoppingData);

    return () => {
      window.removeEventListener("shopping-list-updated", reloadShoppingData);
      window.removeEventListener("storage", reloadShoppingData);
    };
  }, [loaded]);

  useEffect(() => {
    if (!loaded) return;

    const combined: ShoppingItem[] = [];

    // Lemon is a shared physical resource. Track juice and zest separately
    // so one lemon can satisfy both, while two separate juice requirements
    // correctly require two lemons.
    let lemonJuiceLemons = 0;
    let lemonZestLemons = 0;
    let wholeLemons = 0;

    recipes
      .filter((recipe) => selectedRecipes.includes(recipe.id))
      .forEach((recipe: any) => {
        const plannerCount = plannerCounts[recipe.id] ?? 0;
        const recipeCount = plannerCount > 0 ? plannerCount : 1;
        const servings = recipeServings(recipe);

        recipe.ingredients
          .filter(
            (ingredient: any) =>
              ingredient.item?.trim().toLowerCase() !== "water" &&
              ingredient.item?.trim().toLowerCase() !== "boiling water" &&
              ingredient.item?.trim().toLowerCase() !== "no added salt"
          )
          .forEach((ingredient: any) => {
            const parsed = parseQuantity(ingredient.quantity);
            if (!parsed) return;

            /*
             * Scale recipe quantity first.
             * This is the critical fix: the old code used a
             * lexicographical recipe-code test and therefore
             * scaled some lunch recipes differently from others.
             */
            const scaledAmount =
              (parsed.amount * recipeCount) / servings;

            const scaledQuantity = formatQuantity(
              scaledAmount,
              parsed.unit
            );

            let sourceName = ingredient.shoppingItem || ingredient.item;

            /*
             * Lemon:
             * Explicit lemon fractions are tracked as a physical resource.
             * Juice and zest are separate requirements because one lemon can
             * supply both; whole lemons are also combined with those requirements.
             */
            const rawLower = cleanText(ingredient.item).toLowerCase();
            const isLemonBased = rawLower.includes("lemon");
            const isLemonFraction =
              parsed.unit === "lemon" || parsed.unit === "";

            /*
             * Lemon is a special physical ingredient:
             *
             * - "1 lemon's worth of juice" and "1 lemon's worth of zest"
             *   can come from the SAME lemon.
             * - Whole lemons are also combined with those requirements.
             * - We never add lemon zest as a separate shopping item, because
             *   that is what previously created duplicate "Lemon" rows.
             *
             * If a recipe specifies lemon juice in ml, keep that exact ml
             * requirement. Only quantities expressed as a whole lemon are
             * treated as a physical lemon.
             */
            if (rawLower.includes("lemon juice") && isLemonFraction) {
              lemonJuiceLemons += scaledAmount;
              return;
            }

            if (rawLower.includes("lemon zest") && isLemonFraction) {
              lemonZestLemons += scaledAmount;
              return;
            }

            if (
              (rawLower === "lemon" || rawLower === "lemons") &&
              (parsed.unit === "" || parsed.unit === "lemon")
            ) {
              wholeLemons += scaledAmount;
              return;
            }

            if (rawLower.includes("lemon juice")) {
              sourceName = "Lemon juice";
            } else if (rawLower.includes("lemon zest")) {
              /*
               * Do not turn zest into a separate "Lemon" shopping item.
               * A lemon is added once below after all lemon requirements
               * have been combined.
               */
              if (isLemonBased && isLemonFraction) return;
              sourceName = "Lemon zest";
            }

            const shoppingName = normaliseIngredient(sourceName);

            const shoppingQuantity = normaliseShoppingQuantity(
              shoppingName,
              scaledQuantity
            );

            const existing = combined.find(
              (item) =>
                normaliseIngredient(item.item).toLowerCase() ===
                shoppingName.toLowerCase()
            );

            if (!existing) {
              combined.push({
                item: shoppingName,
                quantity: shoppingQuantity,
              });
            } else {
              existing.quantity = combineQuantity(
                existing.quantity,
                shoppingQuantity,
                shoppingName
              );
            }
          });
      });

    // One lemon can provide both its juice and its zest. We therefore need
    // the maximum of the two requirements, while whole lemons are also
    // respected. This avoids double-counting the same physical lemon.
    const lemonsNeeded = Math.ceil(
      Math.max(wholeLemons, lemonJuiceLemons, lemonZestLemons)
    );

    if (lemonsNeeded > 0) {
      const existingLemon = combined.find(
        (item) => normaliseIngredient(item.item).toLowerCase() === "lemon"
      );

      if (existingLemon) {
        existingLemon.quantity = decimalToFraction(
          Math.max(lemonsNeeded, parseQuantity(existingLemon.quantity)?.amount ?? 0)
        );
      } else {
        combined.push({
          item: "Lemon",
          quantity: decimalToFraction(lemonsNeeded),
        });
      }
    }

    /*
     * Final purchase-unit conversion happens only after all recipe
     * quantities have been combined. This prevents early rounding.
     */
    /*
     * Safety net: collapse any duplicate normalised shopping names before
     * rendering. This prevents duplicate rows (and duplicate React keys)
     * even if two recipe aliases resolve to the same shopping item.
     */
    const deduped = combined.reduce<ShoppingItem[]>((list, item) => {
      const name = normaliseIngredient(item.item);
      const existing = list.find(
        (entry) => normaliseIngredient(entry.item).toLowerCase() === name.toLowerCase()
      );

      if (!existing) {
        list.push({ item: name, quantity: item.quantity });
      } else {
        existing.quantity = combineQuantity(existing.quantity, item.quantity, name);
      }

      return list;
    }, []);

    const finalList = deduped.map(finaliseShoppingQuantity);

    setShoppingList(finalList);

    setCheckedItems((current) =>
      current.filter((name) =>
        finalList.some((item) => item.item === name)
      )
    );
  }, [
    loaded,
    selectedRecipes,
    people,
    plannerCounts,
  ]);

  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem(
      "shopping-data",
      JSON.stringify({
        selectedRecipes: plannerRecipes,
        shoppingList,
        checkedItems,
        people,
        plannerRecipes,
        plannerCounts,
      })
    );
  }, [
    loaded,
    selectedRecipes,
    shoppingList,
    checkedItems,
    people,
    plannerRecipes,
    plannerCounts,
  ]);

  function updateHouseholdPeople(newPeople: number) {
    const nextPeople = Math.max(1, Math.min(8, newPeople));

    setPeople(nextPeople);

    /*
     * The Weekly Planner stores the meal selections and any per-meal
     * people overrides separately from the Shopping List. When the
     * household size is changed here, recalculate plannerCounts now
     * rather than waiting for the Weekly Planner page to be opened.
     *
     * Meals with an explicit people override keep that override; meals
     * without one use the new household size.
     */
    try {
      const savedPlanner =
        localStorage.getItem("weekly-planner");

      if (savedPlanner) {
        const plannerData = JSON.parse(savedPlanner);
        const planner = plannerData ?? {};
        const mealPeople = planner.mealPeople ?? {};
        const nextPlannerCounts: Record<string, number> = {};

        const days = [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ];

        const mealTypes = [
          "Breakfast",
          "Lunch",
          "Dinner",
        ];

        days.forEach((day) => {
          mealTypes.forEach((meal) => {
            const recipeId = planner[day]?.[meal];
            if (!recipeId) return;

            const mealOverride = mealPeople?.[day]?.[meal];
            const mealCount =
              typeof mealOverride === "number" && mealOverride > 0
                ? mealOverride
                : nextPeople;

            nextPlannerCounts[recipeId] =
              (nextPlannerCounts[recipeId] ?? 0) + mealCount;
          });
        });

        setPlannerCounts(nextPlannerCounts);
      }
    } catch {
      // Keep the existing planner counts if saved planner data is invalid.
    }
  }

  function uncheckAll() {
    setCheckedItems([]);
  }

  const categoryOrder = [
    "🥩 Meat & Fish",
    "🥕 Fruit & Vegetables",
    "🥫 Cupboard",
    "❄️ Frozen",
    "🍞 Bakery",
    "🧊 Chilled",
    "🧂 Herbs & Spices",
    "Other",
  ];

  const groupedShoppingList = categoryOrder
    .map((category) => ({
      category,
      items: shoppingList
        .filter((item) => getCategory(item.item) === category)
        .sort((a, b) =>
          a.item.localeCompare(b.item, "en-GB", {
            sensitivity: "base",
          })
        ),
    }))
    .filter((group) => group.items.length > 0);

  // On desktop the category cards use three independent columns so a short
  // category does not leave a large empty area before the next card.
  const leftCategoryGroups = groupedShoppingList.filter(
    (_, index) => index % 3 === 0
  );
  const middleCategoryGroups = groupedShoppingList.filter(
    (_, index) => index % 3 === 1
  );
  const rightCategoryGroups = groupedShoppingList.filter(
    (_, index) => index % 3 === 2
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 px-4 py-5 md:px-6 md:py-6">
      <div className="mx-auto md:max-w-[1400px]">
      <div className="bg-white rounded-xl shadow p-6 md:rounded-2xl md:border md:border-slate-200 md:shadow-sm md:p-7">
        <div className="flex flex-col items-stretch gap-4 mb-6 md:mb-7 md:flex-row md:flex-nowrap md:items-center md:justify-between md:gap-4">
          <div>
            <h2 className="text-xl font-semibold whitespace-nowrap text-slate-900 md:text-lg">
              Cooking for:
            </h2>

            <select
              value={people}
              onChange={(e) =>
                updateHouseholdPeople(Number(e.target.value))
              }
              className="border rounded-lg px-4 py-2 mt-2 bg-white text-slate-700 md:mt-2 md:min-w-[150px] md:border-slate-200 md:shadow-sm"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "person" : "people"}
                </option>
              ))}
            </select>
          </div>

          {selectedRecipes.length > 0 && (
            <div className="flex min-w-0 flex-col items-stretch text-sm text-slate-500 text-left sm:items-end sm:text-right">
              <button
                onClick={uncheckAll}
                className="w-full whitespace-nowrap rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 sm:w-auto"
              >
                Clear Checked
                <span className="ml-2">→</span>
              </button>

              <div className="mt-2 whitespace-nowrap">
                {selectedRecipes.length}{" "}
                {selectedRecipes.length === 1 ? "meal" : "meals"} •{" "}
                {people} {people === 1 ? "person" : "people"} •{" "}
                {shoppingList.length}{" "}
                {shoppingList.length === 1 ? "item" : "items"}
              </div>
            </div>
          )}
        </div>

        {shoppingList.length === 0 ? (
          <div className="py-12 text-center">
            <div className="text-5xl mb-4">🛒</div>
            <h2 className="text-xl font-semibold text-slate-900">
              Your shopping list is empty
            </h2>
            <p className="mt-3 text-slate-500">
              Add meals to your Weekly Planner and they will appear here
              automatically.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-6 md:grid md:grid-cols-3 md:gap-5 md:space-y-0 md:items-start">
              <div className="space-y-5">
                {leftCategoryGroups.map((group) => (
                  <div
                    key={group.category}
                    className="md:rounded-xl md:border md:border-slate-200 md:bg-white md:p-5"
                  >
                    <h3 className="text-lg font-bold mb-3 px-3 py-2 rounded-lg bg-slate-50 border border-slate-100 text-slate-800 md:mb-4 md:px-0 md:py-0 md:rounded-none md:border-0 md:bg-transparent md:text-base md:flex md:items-center md:gap-2">
                      {group.category}
                    </h3>

                    <ul className="space-y-3 md:space-y-2.5">
                      {group.items.map((item, itemIndex) => {
                        const checked = checkedItems.includes(item.item);

                        return (
                          <li
                            key={`${group.category}-${item.item}-${itemIndex}`}
                            className="flex items-center justify-between border-b pb-2 md:border-b-0 md:pb-0 md:min-h-[30px]"
                          >
                            <label className="flex items-center gap-3 cursor-pointer flex-1 md:gap-3">
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => {
                                  setCheckedItems((current) =>
                                    checked
                                      ? current.filter(
                                          (name) => name !== item.item
                                        )
                                      : [...current, item.item]
                                  );
                                }}
                                className="md:h-4 md:w-4 md:accent-orange-500"
                              />

                              <span
                                className={
                                  checked
                                    ? "line-through text-slate-400"
                                    : "text-slate-700"
                                }
                              >
                                {item.item}
                              </span>
                            </label>

                            <span
                              className={
                                checked
                                  ? "font-medium line-through text-slate-400"
                                  : "font-medium text-slate-700"
                              }
                            >
                              {item.quantity}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="space-y-5">
                {middleCategoryGroups.map((group) => (
                  <div
                    key={group.category}
                    className="md:rounded-xl md:border md:border-slate-200 md:bg-white md:p-5"
                  >
                    <h3 className="text-lg font-bold mb-3 px-3 py-2 rounded-lg bg-slate-50 border border-slate-100 text-slate-800 md:mb-4 md:px-0 md:py-0 md:rounded-none md:border-0 md:bg-transparent md:text-base md:flex md:items-center md:gap-2">
                      {group.category}
                    </h3>

                    <ul className="space-y-3 md:space-y-2.5">
                      {group.items.map((item, itemIndex) => {
                        const checked = checkedItems.includes(item.item);

                        return (
                          <li
                            key={`${group.category}-${item.item}-${itemIndex}`}
                            className="flex items-center justify-between border-b pb-2 md:border-b-0 md:pb-0 md:min-h-[30px]"
                          >
                            <label className="flex items-center gap-3 cursor-pointer flex-1 md:gap-3">
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => {
                                  setCheckedItems((current) =>
                                    checked
                                      ? current.filter(
                                          (name) => name !== item.item
                                        )
                                      : [...current, item.item]
                                  );
                                }}
                                className="md:h-4 md:w-4 md:accent-orange-500"
                              />

                              <span
                                className={
                                  checked
                                    ? "line-through text-slate-400"
                                    : "text-slate-700"
                                }
                              >
                                {item.item}
                              </span>
                            </label>

                            <span
                              className={
                                checked
                                  ? "font-medium line-through text-slate-400"
                                  : "font-medium text-slate-700"
                              }
                            >
                              {item.quantity}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="space-y-5">
                {rightCategoryGroups.map((group) => (
                  <div
                    key={group.category}
                    className="md:rounded-xl md:border md:border-slate-200 md:bg-white md:p-5"
                  >
                    <h3 className="text-lg font-bold mb-3 px-3 py-2 rounded-lg bg-slate-50 border border-slate-100 text-slate-800 md:mb-4 md:px-0 md:py-0 md:rounded-none md:border-0 md:bg-transparent md:text-base md:flex md:items-center md:gap-2">
                      {group.category}
                    </h3>

                    <ul className="space-y-3 md:space-y-2.5">
                      {group.items.map((item, itemIndex) => {
                        const checked = checkedItems.includes(item.item);

                        return (
                          <li
                            key={`${group.category}-${item.item}-${itemIndex}`}
                            className="flex items-center justify-between border-b pb-2 md:border-b-0 md:pb-0 md:min-h-[30px]"
                          >
                            <label className="flex items-center gap-3 cursor-pointer flex-1 md:gap-3">
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => {
                                  setCheckedItems((current) =>
                                    checked
                                      ? current.filter(
                                          (name) => name !== item.item
                                        )
                                      : [...current, item.item]
                                  );
                                }}
                                className="md:h-4 md:w-4 md:accent-orange-500"
                              />

                              <span
                                className={
                                  checked
                                    ? "line-through text-slate-400"
                                    : "text-slate-700"
                                }
                              >
                                {item.item}
                              </span>
                            </label>

                            <span
                              className={
                                checked
                                  ? "font-medium line-through text-slate-400"
                                  : "font-medium text-slate-700"
                              }
                            >
                              {item.quantity}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 border-t border-slate-100 pt-5 md:mt-6 md:pt-5">
              <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white px-4 py-4 md:flex-row md:items-center md:justify-between md:px-5">
                <div>
                  <div className="text-xl font-bold text-slate-900">
                    {shoppingList.length}{" "}
                    {shoppingList.length === 1 ? "item" : "items"}
                  </div>
                  <div className="mt-1 text-sm text-slate-500">
                    {checkedItems.length} checked
                  </div>
                </div>

                <button
                  onClick={uncheckAll}
                  className="w-full rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-orange-600 md:w-auto md:min-w-[220px]"
                >
                  Clear Checked
                  <span className="ml-2">→</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      </div>
    </main>
  );
}