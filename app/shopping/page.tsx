"use client";

import { useEffect, useState } from "react";
import { recipes } from "@/data/RecipeData";
import { createClient } from "@/lib/supabase/client";

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
  "haddock fillet": "🥩 Meat & Fish",
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
  limes: "🥕 Fruit & Vegetables",
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
  cabbage: "🥕 Fruit & Vegetables",
  "white cabbage": "🥕 Fruit & Vegetables",
  cauliflower: "🥕 Fruit & Vegetables",
  pear: "🥕 Fruit & Vegetables",

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
  "ready-made mild fajita seasoning": "🥫 Cupboard",
  "ready made mild fajita seasoning": "🥫 Cupboard",
  "mild fajita seasoning": "🥫 Cupboard",
  cornflakes: "🥫 Cupboard",
  jam: "🥫 Cupboard",
  marmalade: "🥫 Cupboard",
  "sesame seeds": "🧂 Herbs & Spices",
  "garlic granules": "🧂 Herbs & Spices",

  // Herbs & Spices
  "whole cloves": "🧂 Herbs & Spices",
  "cardamom pods": "🧂 Herbs & Spices",
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
  "mild chilli powder": "🧂 Herbs & Spices",
  "mild chili powder": "🧂 Herbs & Spices",
  "mild chilli seasoning": "🧂 Herbs & Spices",
  "mild chili seasoning": "🧂 Herbs & Spices",
  "dried chilli powder": "🧂 Herbs & Spices",
  "dried chili powder": "🧂 Herbs & Spices",
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

  if (u === "lime" || u === "limes") {
    return `${a}`;
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
  "lime",
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

  if (/^lime(?:s)?$/.test(lower)) {
    return "Lime";
  }

    if (/^apple(?:s)?$/.test(lower)) {
    return "Apple";
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

  // Consolidate all agreed chilli-powder variants.
  if (
    lower === "mild chilli powder" ||
    lower === "mild chili powder" ||
    lower === "mild chilli seasoning" ||
    lower === "mild chili seasoning" ||
    lower === "dried chilli powder" ||
    lower === "dried chili powder"
  ) {
    return "Mild chilli powder";
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

  if (lower === "lime") {
    if (parsed.unit === "" || parsed.unit === "lime" || parsed.unit === "limes") {
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



  if (lower === "eggs") {
    return decimalToFraction(parsed.amount);
  }

  if (lower === "lime") {
    return decimalToFraction(parsed.amount);
  }

  if (lower === "eggs" && parsed.unit === "") {
    return decimalToFraction(parsed.amount);
  }

  if (lower === "cod fillet" && parsed.unit === "") {
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

  if (lower === "lime") {
    if (
      (a.unit === "" || a.unit === "lime" || a.unit === "limes") &&
      (b.unit === "" || b.unit === "lime" || b.unit === "limes")
    ) {
      return decimalToFraction(a.amount + b.amount);
    }
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
   * Stock is purchased as stock cubes.
   * One cube makes up to 400 ml of finished stock.
   *
   * This conversion happens after all recipe quantities have been
   * combined, so 200 ml + 250 ml becomes 450 ml -> 2 cubes,
   * rather than rounding each recipe separately.
   */
  if (lower.includes("stock")) {
    const ml = quantityToMl(parsed);

    if (ml !== null) {
      const cubes = Math.ceil(ml / 400);

      let stockType = "";

      if (lower.includes("chicken")) {
        stockType = "Chicken";
      } else if (lower.includes("beef")) {
        stockType = "Beef";
      } else if (lower.includes("lamb")) {
        stockType = "Lamb";
      } else if (lower.includes("fish")) {
        stockType = "Fish";
      } else if (lower.includes("vegetable")) {
        stockType = "Vegetable";
      } else if (lower.includes("turkey")) {
        stockType = "Turkey";
      } else if (lower.includes("chicken or turkey")) {
        stockType = "Chicken or turkey";
      }

      const itemName = stockType
        ? `${stockType} stock cube${cubes === 1 ? "" : "s"}`
        : `Stock cube${cubes === 1 ? "" : "s"}`;

      return {
        item: itemName,
        quantity: String(cubes),
      };
    }
  }

  /*
   * Gravy is purchased as gravy granules.
   * 20 g gravy granules makes 280 ml finished gravy.
   *
   * This conversion also happens after all quantities have been combined.
   */
  if (lower.includes("gravy")) {
    const ml = quantityToMl(parsed);

    if (ml !== null) {
      const grams = Math.ceil((ml / 280) * 20);

      let gravyType = "";

      if (lower.includes("chicken or turkey")) {
        gravyType = "Chicken or turkey";
        } else if (lower.includes("chicken")) {
        gravyType = "Chicken";
      } else if (lower.includes("beef")) {
        gravyType = "Beef";
      } else if (lower.includes("lamb")) {
        gravyType = "Lamb";
      } else if (lower.includes("onion")) {
        gravyType = "Onion";
      } else if (lower.includes("turkey")) {
        gravyType = "Turkey";
      } else if (lower.includes("vegetable")) {
        gravyType = "Vegetable";
      }

      const itemName = gravyType
        ? `${gravyType} gravy granules`
        : "Gravy granules";

      return {
        item: itemName,
        quantity: `${grams} g`,
      };
    }
  }

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
  const wholeCount = Math.ceil(parsed.amount);
  return {
    item: lower === "lemon"
      ? wholeCount === 1 ? "Lemon" : "Lemons"
      : name,
    quantity: decimalToFraction(wholeCount),
  };
}

if (lower === "lime") {
  const wholeLimes = Math.ceil(parsed.amount);

  return {
    item: wholeLimes === 1 ? "Lime" : "Limes",
    quantity: String(wholeLimes),
  };
}

if (lower === "eggs" && parsed.unit === "") {
  const eggCount = Math.ceil(parsed.amount);
  return {
    item: eggCount === 1 ? "Egg" : "Eggs",
    quantity: String(eggCount),
  };
}

if (lower === "cod fillet" && parsed.unit === "") {
  const filletCount = Math.ceil(parsed.amount);
  return {
    item: filletCount === 1 ? "Cod fillet" : "Cod fillets",
    quantity: String(filletCount),
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
    lower === "white wine vinegar" ||
    lower === "ready-made mild fajita seasoning" ||
    lower === "ready made mild fajita seasoning" ||
    lower === "mild fajita seasoning"
  ) {
    return "🥫 Cupboard";
  }

  if (
  lower === "mint" ||
  lower === "white pepper" ||
  lower === "whole cloves" ||
  lower === "cardamom pods"
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
  const [accountSyncReady, setAccountSyncReady] = useState(false);
  const [accountUserId, setAccountUserId] = useState<string | null>(null);

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

    let cancelled = false;

    async function syncAccountShoppingData() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (cancelled) return;

      if (!user) {
        setAccountUserId(null);
        setAccountSyncReady(true);
        return;
      }

      setAccountUserId(user.id);

      const { data, error } = await supabase
        .from("user_meal_plans")
        .select("planner, meal_people, household_people, checked_items")
        .eq("user_id", user.id)
        .maybeSingle();

      if (cancelled) return;

      if (error) {
        console.error("Unable to load saved account shopping data:", error);
        setAccountSyncReady(true);
        return;
      }

      if (data) {
        const remotePlanner = data.planner ?? {};
        const remoteMealPeople = data.meal_people ?? {};
        const remotePeople =
          typeof data.household_people === "number" && data.household_people > 0
            ? data.household_people
            : 1;
        const remoteCheckedItems = Array.isArray(data.checked_items)
          ? data.checked_items
          : [];

        const remotePlannerCounts: Record<string, number> = {};
        const remoteDays = [
          "Monday", "Tuesday", "Wednesday", "Thursday",
          "Friday", "Saturday", "Sunday",
        ];
        const remoteMealTypes = ["Breakfast", "Lunch", "Dinner"];

        remoteDays.forEach((day) => {
          remoteMealTypes.forEach((meal) => {
            const recipeId = remotePlanner?.[day]?.[meal];
            if (!recipeId) return;

            const override = remoteMealPeople?.[day]?.[meal];
            const mealCount =
              typeof override === "number" && override > 0
                ? override
                : remotePeople;

            remotePlannerCounts[recipeId] =
              (remotePlannerCounts[recipeId] ?? 0) + mealCount;
          });
        });

        const remotePlannerRecipes = Object.keys(remotePlannerCounts);

        setSelectedRecipes(remotePlannerRecipes);
        setPlannerRecipes(remotePlannerRecipes);
        setPlannerCounts(remotePlannerCounts);
        setPeople(remotePeople);
        setCheckedItems(remoteCheckedItems);

        localStorage.setItem(
          "weekly-planner",
          JSON.stringify({ ...remotePlanner, mealPeople: remoteMealPeople })
        );

        const currentShopping = localStorage.getItem("shopping-data");
        let shoppingData: ShoppingData = {
          selectedRecipes: remotePlannerRecipes,
          shoppingList: [],
          checkedItems: remoteCheckedItems,
          people: remotePeople,
          plannerRecipes: remotePlannerRecipes,
          plannerCounts: remotePlannerCounts,
        };

        if (currentShopping) {
          try {
            shoppingData = { ...shoppingData, ...JSON.parse(currentShopping) };
          } catch {
            // Keep remote defaults.
          }
        }

        localStorage.setItem(
          "shopping-data",
          JSON.stringify({
            ...shoppingData,
            selectedRecipes: remotePlannerRecipes,
            checkedItems: remoteCheckedItems,
            people: remotePeople,
            plannerRecipes: remotePlannerRecipes,
            plannerCounts: remotePlannerCounts,
          })
        );
      } else {
        const savedPlanner = localStorage.getItem("weekly-planner");
        let planner: Record<string, any> = {};
        let mealPeople: Record<string, any> = {};

        if (savedPlanner) {
          try {
            const parsed = JSON.parse(savedPlanner);
            planner = parsed ?? {};
            mealPeople = parsed?.mealPeople ?? {};
          } catch {
            // Keep empty defaults.
          }
        }

        const currentPeople = people;
        const { error: saveError } = await supabase
          .from("user_meal_plans")
          .upsert({
            user_id: user.id,
            planner,
            meal_people: mealPeople,
            household_people: currentPeople,
            checked_items: checkedItems,
          }, { onConflict: "user_id" });

        if (saveError) {
          console.error("Unable to create saved account shopping data:", saveError);
        }
      }

      setAccountSyncReady(true);
    }

    void syncAccountShoppingData();

    return () => {
      cancelled = true;
    };
  }, [loaded]);

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

    if (accountSyncReady && accountUserId) {
      let planner: Record<string, any> = {};
      let mealPeople: Record<string, any> = {};

      try {
        const savedPlanner = localStorage.getItem("weekly-planner");
        if (savedPlanner) {
          const parsed = JSON.parse(savedPlanner);
          planner = parsed ?? {};
          mealPeople = parsed?.mealPeople ?? {};
        }
      } catch {
        // Keep empty defaults if local planner data is invalid.
      }

      const supabase = createClient();

      void supabase
        .from("user_meal_plans")
        .upsert({
          user_id: accountUserId,
          planner,
          meal_people: mealPeople,
          household_people: people,
          checked_items: checkedItems,
        }, { onConflict: "user_id" })
        .then(({ error }) => {
          if (error) {
            console.error("Unable to save shopping data:", error);
          }
        });
    }
  }, [
    loaded,
    selectedRecipes,
    shoppingList,
    checkedItems,
    people,
    plannerRecipes,
    plannerCounts,
    accountSyncReady,
    accountUserId,
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

  const categoryStyles: Record<
    string,
    { card: string; header: string; badge: string }
  > = {
    "🥩 Meat & Fish": {
      card: "border-rose-200 bg-rose-50/60",
      header: "bg-rose-100/80 border-rose-200",
      badge: "bg-rose-100 text-rose-700",
    },
    "🥕 Fruit & Vegetables": {
      card: "border-emerald-200 bg-emerald-50/55",
      header: "bg-emerald-100/80 border-emerald-200",
      badge: "bg-emerald-100 text-emerald-700",
    },
    "🥫 Cupboard": {
      card: "border-amber-200 bg-amber-50/60",
      header: "bg-amber-100/80 border-amber-200",
      badge: "bg-amber-100 text-amber-700",
    },
    "❄️ Frozen": {
      card: "border-violet-200 bg-violet-50/60",
      header: "bg-violet-100/80 border-violet-200",
      badge: "bg-violet-100 text-violet-700",
    },
    "🍞 Bakery": {
      card: "border-sky-200 bg-sky-50/60",
      header: "bg-sky-100/80 border-sky-200",
      badge: "bg-sky-100 text-sky-700",
    },
    "🧊 Chilled": {
      card: "border-cyan-200 bg-cyan-50/60",
      header: "bg-cyan-100/80 border-cyan-200",
      badge: "bg-cyan-100 text-cyan-700",
    },
    "🧂 Herbs & Spices": {
      card: "border-pink-200 bg-pink-50/60",
      header: "bg-pink-100/80 border-pink-200",
      badge: "bg-pink-100 text-pink-700",
    },
    Other: {
      card: "border-slate-200 bg-slate-50/60",
      header: "bg-slate-100/80 border-slate-200",
      badge: "bg-slate-100 text-slate-700",
    },
  };

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

  function CategoryIcon({ category }: { category: string }) {
    const iconClass = "text-xl leading-none shrink-0";

    switch (category) {
      case "🥩 Meat & Fish":
        return <span className={iconClass} aria-hidden="true">🥩</span>;
      case "🥕 Fruit & Vegetables":
        return <span className={iconClass} aria-hidden="true">🥕</span>;
      case "🥫 Cupboard":
        return <span className={iconClass} aria-hidden="true">🥫</span>;
      case "❄️ Frozen":
        return <span className={iconClass} aria-hidden="true">❄️</span>;
      case "🍞 Bakery":
        return <span className={iconClass} aria-hidden="true">🍞</span>;
      case "🧊 Chilled":
        return <span className={iconClass} aria-hidden="true">🧊</span>;
      case "🧂 Herbs & Spices":
        return <span className={iconClass} aria-hidden="true">🧂</span>;
      default:
        return <span className={iconClass} aria-hidden="true">📦</span>;
    }
  }

  function renderCategoryGroup(group: {
    category: string;
    items: ShoppingItem[];
  }) {
    const styles = categoryStyles[group.category] ?? categoryStyles.Other;
    const categoryName = group.category.replace(/^\S+\s+/, "");

    return (
      <div
        key={group.category}
        className={`overflow-hidden rounded-2xl border shadow-sm ${styles.card}`}
      >
        <div
          className={`flex items-center justify-between border-b px-4 py-3 ${styles.header}`}
        >
          <h3 className="flex items-center gap-2 text-base font-bold text-slate-900">
            <CategoryIcon category={group.category} />
            <span>{categoryName}</span>
          </h3>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${styles.badge}`}
          >
            {group.items.length} {group.items.length === 1 ? "item" : "items"}
          </span>
        </div>

        <ul className="divide-y divide-white/80 px-4 py-1">
          {group.items.map((item, itemIndex) => {
            const checked = checkedItems.includes(item.item);

            return (
              <li
                key={`${group.category}-${item.item}-${itemIndex}`}
                className="flex min-h-[42px] items-center justify-between gap-3 py-2"
              >
                <label className="flex min-w-0 flex-1 cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => {
                      setCheckedItems((current) =>
                        checked
                          ? current.filter((name) => name !== item.item)
                          : [...current, item.item]
                      );
                    }}
                    className="h-4 w-4 shrink-0 accent-green-600"
                  />

                  <span
                    className={
                      checked
                        ? "truncate text-slate-400 line-through"
                        : "truncate text-slate-800"
                    }
                  >
                    {item.item}
                  </span>
                </label>

                <span
                  className={
                    checked
                      ? "shrink-0 font-medium text-slate-400 line-through"
                      : "shrink-0 font-semibold text-slate-800"
                  }
                >
                  {item.quantity}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white px-2.5 py-3 sm:px-4 sm:py-5 md:px-6 md:py-6">
      <div className="mx-auto max-w-[1500px]">
        <div className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm md:rounded-3xl">
          <div className="border-b border-emerald-100 bg-gradient-to-r from-emerald-50 via-white to-emerald-50 px-3 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5">
            {shoppingList.length === 0 ? (
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-slate-600">
                  Add meals to your Weekly Planner and they will appear here automatically.
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-slate-600">Cooking for:</span>
                  <select
                    value={people}
                    onChange={(e) => updateHouseholdPeople(Number(e.target.value))}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-slate-700 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "person" : "people"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="grid w-full grid-cols-3 items-stretch rounded-2xl border border-emerald-100 bg-white/90 px-1 py-2.5 shadow-sm sm:flex sm:w-auto sm:px-3 sm:py-2">
                  <div className="flex min-w-0 flex-col items-center justify-center gap-1 border-r border-emerald-100 px-1 py-1 sm:min-w-[120px] sm:flex-row sm:justify-start sm:gap-3 sm:border-r-0 sm:px-3">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-emerald-600 sm:h-7 sm:w-7" aria-hidden="true">
                      <path d="M3 5h2l2.2 10.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 8H6" />
                      <circle cx="10" cy="20" r="1" />
                      <circle cx="18" cy="20" r="1" />
                    </svg>
                    <div className="min-w-0 text-center whitespace-nowrap sm:text-left">
                      <div className="text-xl font-bold leading-none text-slate-900 sm:text-2xl">{shoppingList.length}</div>
                      <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500 sm:mt-1 sm:text-xs">items</div>
                    </div>
                  </div>

                  <div className="flex min-w-0 flex-col items-center justify-center gap-1 border-r border-emerald-100 px-1 py-1 sm:min-w-[120px] sm:flex-row sm:justify-start sm:gap-3 sm:border-r-0 sm:px-3">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-emerald-600 sm:h-7 sm:w-7" aria-hidden="true">
                      <path d="M7 3v7" />
                      <path d="M4 3v4a3 3 0 0 0 6 0V3" />
                      <path d="M7 10v11" />
                      <path d="M15 3v18" />
                      <path d="M15 3c3 2 4 4.3 4 7h-4" />
                    </svg>
                    <div className="min-w-0 text-center whitespace-nowrap sm:text-left">
                      <div className="text-xl font-bold leading-none text-slate-900 sm:text-2xl">{selectedRecipes.length}</div>
                      <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500 sm:mt-1 sm:text-xs">meals</div>
                    </div>
                  </div>

                  <div className="flex min-w-0 flex-col items-center justify-center gap-1 px-1 py-1 sm:min-w-[120px] sm:flex-row sm:justify-start sm:gap-3 sm:px-3">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-blue-600 sm:h-7 sm:w-7" aria-hidden="true">
                      <circle cx="9" cy="8" r="3" />
                      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
                      <circle cx="17" cy="9" r="2.5" />
                      <path d="M15.5 14.5A5.5 5.5 0 0 1 21 20" />
                    </svg>
                    <div className="min-w-0 text-center whitespace-nowrap sm:text-left">
                      <div className="text-xl font-bold leading-none text-slate-900 sm:text-2xl">{people}</div>
                      <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500 sm:mt-1 sm:text-xs">
                        {people === 1 ? "person" : "people"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-end">
                  <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-start">
                    <label className="whitespace-nowrap text-sm font-semibold text-slate-700">
                      Cooking for:
                    </label>
                    <select
                      value={people}
                      onChange={(e) => updateHouseholdPeople(Number(e.target.value))}
                      className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-slate-700 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 sm:min-w-[145px] sm:flex-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "person" : "people"}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={uncheckAll}
                    className="w-full whitespace-nowrap rounded-xl border-2 border-orange-500 bg-white px-5 py-3 text-sm font-bold text-orange-600 shadow-sm transition hover:bg-orange-50 active:scale-[0.99] sm:w-auto sm:py-2.5"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5 inline-block h-5 w-5 align-[-4px]" aria-hidden="true">
                      <path d="M4 7h16" />
                      <path d="M10 11v6" />
                      <path d="M14 11v6" />
                      <path d="M6 7l1 13h10l1-13" />
                      <path d="M9 7V4h6v3" />
                    </svg>
                    Clear Checked
                  </button>
                </div>
              </div>
            )}
          </div>

          {shoppingList.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="mb-4 flex justify-center text-emerald-600">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-14 w-14" aria-hidden="true">
                  <path d="M3 5h2l2.2 10.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 8H6" />
                  <circle cx="10" cy="20" r="1" />
                  <circle cx="18" cy="20" r="1" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-slate-900">
                Your shopping list is empty
              </h2>
              <p className="mt-3 text-slate-500">
                Add meals to your Weekly Planner and they will appear here automatically.
              </p>
            </div>
          ) : (
            <div className="p-4 sm:p-5 md:p-6">
              <div className="grid items-start gap-5 md:grid-cols-3">
                <div className="space-y-5">
                  {leftCategoryGroups.map(renderCategoryGroup)}
                </div>
                <div className="space-y-5">
                  {middleCategoryGroups.map(renderCategoryGroup)}
                </div>
                <div className="space-y-5">
                  {rightCategoryGroups.map(renderCategoryGroup)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
