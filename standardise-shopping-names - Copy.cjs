const fs = require("fs");

const target = "data/recipes.ts";
const backup = "data/recipes.ts.backup-before-shopping-standardisation";

if (!fs.existsSync(target)) {
  console.error(`STOPPED: ${target} was not found.`);
  process.exit(1);
}

const original = fs.readFileSync(target, "utf8");

if (!fs.existsSync(backup)) {
  fs.writeFileSync(backup, original, "utf8");
  console.log(`Backup created: ${backup}`);
}

let updated = original;

// ------------------------------------------------------------
// 1. PITTA STANDARDISATION
// All pitta ingredients are White Pitta.
// ------------------------------------------------------------
updated = updated.replace(
  /item:\s*"[^"]*\bpitta(?:\s+bread)?s?\b[^"]*"/gi,
  'item: "White Pitta"'
);

updated = updated.replace(
  /shoppingItem:\s*"[^"]*\bpitta(?:\s+bread)?s?\b[^"]*"/gi,
  'shoppingItem: "White Pitta"'
);

// If an ingredient was a pitta but had no shoppingItem, add it.
updated = updated.replace(
  /(\{\s*item:\s*"White Pitta")(\s*,\s*quantity:\s*"[^"]*"\s*\})/g,
  '$1, shoppingItem: "White Pitta"$2'
);

// ------------------------------------------------------------
// 2. SPACE BETWEEN NUMBER AND g/ml
// Only formatting; numerical values are not changed.
// ------------------------------------------------------------
updated = updated.replace(
  /quantity:\s*"([^"]*)"/g,
  (full, quantity) => {
    let q = quantity;

    q = q.replace(
      /(\d+(?:\.\d+)?)(g|ml)\b/gi,
      "$1 $2"
    );

    return `quantity: "${q}"`;
  }
);

// ------------------------------------------------------------
// 3. STANDARD SHOPPING NAMES
//
// Existing shoppingItem values are retained.
// Missing values are filled from an explicit standard dictionary.
// The fallback is deliberately conservative: it strips preparation
// wording but does not alter the recipe item itself.
// ------------------------------------------------------------

const standardNames = {
  // Meat & fish
  "Tuna": "Tinned Tuna",
  "Tuna, drained": "Tinned Tuna",
  "Tinned tuna": "Tinned Tuna",
  "Tinned Tuna": "Tinned Tuna",
  "Cooked chicken": "Cooked chicken breast",
  "Cooked chicken breast, sliced": "Cooked chicken breast",
  "Cooked chicken breast, diced": "Cooked chicken breast",
  "Cooked chicken breast, sliced": "Cooked chicken breast",
  "Cooked turkey": "Cooked turkey",
  "Lamb": "Lamb",
  "Diced lamb": "Lamb",
  "Diced lamb leg steak": "Lamb",
  "Sausages": "Sausages (low fat pork)",
  "Quality pork sausages": "Sausages (low fat pork)",
  "Low-fat pork sausages": "Sausages (low fat pork)",

  // Fruit & vegetables
  "Red onion": "Red onion",
  "Red onion, diced": "Red onion",
  "Red onion, finely chopped": "Red onion",
  "Red onion, cut into wedges": "Red onion",
  "Small onion, finely diced": "Onion",
  "Large onion, thinly sliced": "Onion",
  "Onion, finely chopped": "Onion",
  "Cucumber": "Cucumber",
  "Cucumber, diced": "Cucumber",
  "Lettuce": "Lettuce",
  "Lettuce leaf": "Lettuce",
  "Lettuce leaves": "Lettuce",
  "Baby gem lettuce": "Lettuce",
  "Shredded lettuce": "Lettuce",
  "Red chilli": "Red chilli",
  "Green chilli": "Green chilli",
  "Pepper": "Green pepper",
  "Green pepper": "Green pepper",
  "Red pepper": "Red pepper",
  "Red pepper, cut into chunks": "Red pepper",
  "Yellow pepper": "Yellow pepper",
  "Butternut squash": "Butternut squash",
  "Avocado": "Avocado",
  "Avocado, chopped": "Avocado",
  "Celery": "Celery",
  "Leek": "Leek",
  "Spring onion": "Spring onions",
  "Spring onions": "Spring onions",
  "Watercress": "Watercress",
  "Spring greens": "Spring greens",
  "Swede": "Swede",
  "Garlic": "Garlic",
  "Garlic, crushed": "Garlic",
  "Garlic cloves": "Garlic",
  "Ginger": "Ginger",
  "Carrot": "Carrot",
  "Carrot, grated": "Carrot",
  "Courgette": "Courgette",
  "Mushrooms": "Mushrooms",
  "Spinach": "Spinach",
  "Strawberries": "Strawberries",
  "Blueberries": "Blueberries",
  "Tinned peaches": "Tinned peaches",
  "Sweetcorn": "Sweetcorn",
  "Sweetcorn, drained": "Sweetcorn",
  "Tomato": "Tomato",
  "Tomato, diced": "Tomato",
  "Tomato, finely chopped": "Tomato",
  "Tomato slices": "Tomato",
  "Lemon": "Lemon",
  "Lemon juice": "Lemon",
  "Lime": "Lime",
  "Lime juice": "Lime",

  // Chilled
  "Butter": "Unsalted Butter",
  "Unsalted butter": "Unsalted Butter",
  "Eggs": "Eggs",
  "Plain natural yoghurt": "Natural Yoghurt",
  "Natural yoghurt": "Natural Yoghurt",
  "Plain full-fat yoghurt": "Natural Yoghurt",
  "Feta cheese": "Feta",
  "Mature cheddar": "Mature cheddar",
  "Parmesan": "Parmesan",
  "Reduced-fat feta cheese": "Reduced-fat feta cheese",
  "Semi-skimmed milk": "Semi-skimmed milk",
  "Half-fat crème fraîche": "Half-fat crème fraîche",
  "Coconut milk": "Coconut milk",

  // Bakery
  "White bread": "White bread",
  "White bread, phosphate-additive-free": "White bread",
  "White bread roll": "White bread roll",
  "White tortilla wraps": "White tortilla wraps",
  "Tortilla wraps": "Tortilla wraps",
  "Wholemeal tortilla wrap": "Wholemeal tortilla wraps",
  "Wholemeal tortilla wraps": "Wholemeal tortilla wraps",
  "Crumpets": "Crumpets",
  "Plain bagels": "Plain bagels",
  "White Pitta": "White Pitta",

  // Cupboard
  "Cannellini beans": "Cannellini beans",
  "Cannellini beans, drained and rinsed": "Cannellini beans",
  "Lentils, drained": "Tinned lentils",
  "Tinned lentils": "Tinned lentils",
  "Chickpeas, drained": "Chickpeas",
  "Rice": "Rice",
  "Ready-cooked rice": "Rice",
  "Basmati rice": "Basmati rice",
  "Dry basmati rice": "Dry basmati rice",
  "Brown rice": "Brown rice",
  "Pasta": "Pasta",
  "Dried spaghetti": "Dried spaghetti",
  "Couscous": "Couscous",
  "Passata": "Passata",
  "Tomato purée": "Tomato purée",
  "Plain flour": "Plain flour",
  "Cornflour": "Cornflour",
  "Baking powder": "Baking powder",
  "Caster sugar": "Caster sugar",
  "Sugar": "Sugar",
  "Maple syrup": "Maple syrup",
  "Clear honey": "Clear honey",
  "Mayonnaise": "Mayonnaise",
  "Garlic paste": "Garlic paste",
  "Oyster sauce": "Oyster sauce",
  "Sweet chilli sauce": "Sweet chilli sauce",
  "Low-salt chicken or turkey stock": "Low-salt chicken or turkey stock",
  "Low-salt lamb gravy": "Low-salt lamb gravy",
  "Low-salt lamb stock": "Low-salt lamb stock",
  "Reduced-salt onion gravy": "Reduced-salt onion gravy",
  "Reduced-salt chicken gravy": "Reduced-salt chicken gravy",
  "Very low-salt beef stock": "Very low-salt beef stock",
  "Olive oil": "Olive oil",
  "Sunflower oil": "Sunflower oil",
  "Vegetable oil": "Sunflower oil",
  "Oil": "Sunflower oil",
  "Sesame oil": "Sesame oil",
  "Red wine": "Red wine",
  "White wine": "White wine",
  "Red wine vinegar": "Red wine vinegar",
  "Worcestershire sauce": "Worcestershire sauce",
  "Vanilla extract": "Vanilla extract",

  // Herbs & spices
  "Black pepper": "Black pepper",
  "Freshly ground black pepper": "Black pepper",
  "Garlic granules": "Garlic granules",
  "Turmeric": "Turmeric",
  "Ground ginger": "Ground ginger",
  "Ground cinnamon": "Ground cinnamon",
  "Paprika": "Paprika",
  "Red chilli powder": "Red chilli powder",
  "Mild chilli powder": "Mild chilli powder",
  "Mild chilli seasoning": "Mild chilli seasoning",
  "Curry powder": "Curry powder",
  "Mild curry powder": "Mild curry powder",
  "Ground cumin": "Ground cumin",
  "Cumin powder": "Cumin powder",
  "Cumin seeds": "Cumin seeds",
  "Dried oregano": "Dried oregano",
  "Dried parsley": "Dried parsley",
  "Dried thyme": "Dried thyme",
  "Dried mixed herbs": "Dried mixed herbs",
  "Rosemary": "Rosemary",
  "Sesame seeds": "Sesame seeds",
  "Fresh coriander": "Coriander",
  "Fresh mint": "Mint",
  "Fresh parsley": "Parsley",
};

// Helper: remove preparation wording from an ingredient when it is
// not in the explicit dictionary. This is only used to create a
// shopping name, never to change the recipe ingredient itself.
function conservativeFallback(item) {
  let name = item.trim();

  name = name
    .replace(/,\s*(finely\s+)?(roughly\s+)?(diced|chopped|sliced|crushed|grated|shredded|cut into[^"]*|halved|quartered|peeled|drained(?:\s+and\s+rinsed)?|rinsed)\b/gi, "")
    .replace(/\s*\([^)]*\)\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (/^pepper$/i.test(name)) return "Green pepper";
  if (/^tuna\b/i.test(name)) return "Tinned Tuna";
  if (/^oil$/i.test(name)) return "Sunflower oil";
  if (/^butter$/i.test(name)) return "Unsalted Butter";
  if (/^yoghurt$/i.test(name)) return "Natural Yoghurt";
  if (/pitta/i.test(name)) return "White Pitta";

  return name;
}

// Add shoppingItem to ingredient objects that do not already have one.
// The parser works only on individual ingredient object lines/blocks.
// Existing shoppingItem values are left untouched.
let missingCount = 0;

updated = updated.replace(
  /(\{\s*item:\s*"([^"]+)",)(?!\s*shoppingItem:)([\s\S]*?quantity:\s*"[^"]*"\s*\})/g,
  (full, prefix, item, rest) => {
    const standard = standardNames[item] || conservativeFallback(item);

    if (!standard) {
      console.error(`STOPPED: No shopping name could be determined for "${item}".`);
      process.exit(1);
    }

    missingCount++;
    return `${prefix} shoppingItem: "${standard}",${rest}`;
  }
);

// ------------------------------------------------------------
// 4. NORMALISE known legacy shopping names.
// ------------------------------------------------------------
updated = updated.replace(
  /shoppingItem:\s*"Pitta(?: bread| breads)?"/gi,
  'shoppingItem: "White Pitta"'
);

updated = updated.replace(
  /shoppingItem:\s*"Tinned tuna"/g,
  'shoppingItem: "Tinned Tuna"'
);

updated = updated.replace(
  /shoppingItem:\s*"Natural yoghurt"/g,
  'shoppingItem: "Natural Yoghurt"'
);

updated = updated.replace(
  /shoppingItem:\s*"Butter"/g,
  'shoppingItem: "Unsalted Butter"'
);

// ------------------------------------------------------------
// 5. VERIFY EXACTLY 83 RECIPES.
// ------------------------------------------------------------
const codes = [...updated.matchAll(/\bcode:\s*["']([BLD]\d{3})["']/g)]
  .map(m => m[1]);

const unique = [...new Set(codes)];

const expected = [
  ...Array.from({ length: 20 }, (_, i) => `B${String(i + 1).padStart(3, "0")}`),
  ...Array.from({ length: 28 }, (_, i) => `L${String(i + 1).padStart(3, "0")}`),
  ...Array.from({ length: 35 }, (_, i) => `D${String(i + 1).padStart(3, "0")}`),
];

if (
  codes.length !== 83 ||
  unique.length !== 83 ||
  expected.some(code => !unique.includes(code))
) {
  console.error("STOPPED: Recipe-code structure was changed unexpectedly.");
  process.exit(1);
}

// ------------------------------------------------------------
// 6. VERIFY NO INGREDIENT IS MISSING shoppingItem.
// ------------------------------------------------------------
const ingredientBlocks = [...updated.matchAll(
  /\{\s*item:\s*"([^"]+)"[\s\S]*?quantity:\s*"[^"]*"\s*\}/g
)].map(m => m[0]);

const missing = ingredientBlocks.filter(block => !/shoppingItem:\s*"/.test(block));

if (missing.length) {
  console.error(`STOPPED: ${missing.length} ingredient(s) still have no shoppingItem.`);
  missing.slice(0, 20).forEach((block, i) => {
    const item = block.match(/item:\s*"([^"]+)"/)?.[1] || "unknown";
    console.error(`  ${i + 1}. ${item}`);
  });
  process.exit(1);
}

// ------------------------------------------------------------
// 7. VERIFY no pitta remains as Wholemeal/Pitta bread.
// ------------------------------------------------------------
if (/item:\s*"[^"]*wholemeal\s+pitta/i.test(updated) ||
    /shoppingItem:\s*"Pitta(?: bread| breads)?"/i.test(updated)) {
  console.error("STOPPED: A non-standard pitta name remains.");
  process.exit(1);
}

fs.writeFileSync(target, updated, "utf8");

console.log("");
console.log("SUCCESS");
console.log(`Updated ${target}`);
console.log(`Added missing shoppingItem values: ${missingCount}`);
console.log("Standardised pitta to White Pitta.");
console.log("Standardised g/ml spacing.");
console.log("Verified exactly 83 recipes.");
console.log("Verified every ingredient has a shoppingItem.");
console.log(`Backup: ${backup}`);
console.log("");
console.log("IMPORTANT: Review the resulting shopping list before committing.");
