import { formatQuantityNumber } from "./recipeQuantities";

type Ingredient = { item: string; quantity: string };

// Display only: never feed these approximate measures into shopping or nutrition.
// Household weights: USDA SR28, https://ods.od.nih.gov/pubs/usdandb/Selenium-Food.pdf
// Garlic: https://aliments-nutrition.canada.ca/cnf-fce/serving-portion?id=2394&lang=eng
// Use UK 5 ml tsp / 15 ml tbsp. Estimates, not analytical conversions.
// Keep the supplied weight alongside every estimated equivalent.
// Produce portions: Health Canada, Nutrient Value of Some Common Foods,
// table 4 (raw carrot 61 g; tomato 123 g). Onion SR28 medium portion 110 g.
const spoonWeights: [RegExp, number][] = [
  [/\bcumin\b/i, 2.1], [/\bcoriander\b.*(?:ground|powder)|ground coriander/i, 1.8],
  [/\bpaprika\b/i, 2.3], [/\bturmeric\b/i, 3], [/\bcinnamon\b/i, 2.6],
  [/\bcardamom\b.*ground|ground cardamom/i, 2], [/\bcloves\b.*ground|ground cloves/i, 2.1],
  [/\bginger\b.*(?:ground|powder)|ground ginger/i, 1.8], [/\ballspice\b/i, 1.9],
  [/\bcayenne\b/i, 1.8],
  [/\bnutmeg\b/i, 2.2], [/\bblack pepper\b/i, 2.3],
  [/\boregano\b.*dried|dried oregano/i, 1], [/\bthyme\b.*dried|dried thyme/i, 1],
  [/\brosemary\b.*dried|dried rosemary/i, 1.2], [/\bparsley\b.*dried|dried parsley/i, 0.5],
  [/\bmustard seeds?\b/i, 2], [/\bfennel seeds?\b/i, 2], [/\bcaraway\b/i, 2.1],
  [/\b(?:olive|rapeseed|vegetable|sesame|coconut|sunflower) oil\b|\boil, (?:olive|rapeseed|vegetable|sesame|coconut|sunflower)\b/i, 4.5],
  [/\b(?:lemon|lime) juice\b/i, 5], [/\bvinegar\b/i, 5],
  [/\bsoy sauce\b/i, 5.3], [/\bfish sauce\b/i, 6], [/\bhoney\b/i, 7],
  [/\bmaple syrup\b/i, 6.7],
  [/^(?:white |granulated )?sugar$/i, 4.2],
  [/^(?:(?:whole|semi-skimmed|skimmed) )?milk(?:,|$)|^milk, /i, 5.1], [/\bsingle cream\b|^cream, fresh, single$/i, 5],
];

function tidy(text: string): string {
  return text.replace(/\s+/g, " ").replace(/\s+,/g, ",").replace(/^[,;\s]+|[,;\s]+$/g, "");
}

function cleanNote(note: string): string {
  return tidy(note
    .replace(/\braw edible (?:input|weight|portion|leaf|leaves|core|rhizome|peel|nuts|flesh)\b/gi, "")
    .replace(/\bedible (?:input|weight|portion|leaf|leaves|core|rhizome|peel|nuts|flesh)\b/gi, "")
    .replace(/\b(?:as sold|weighed not converted from ml|weighed (?:recipe )?water|weighed grams|weighed|dry flour|dry as sold|input)\b/gi, "")
    .replace(/\bleaves eaten\b/gi, "")
    .replace(/\bwhole contents\b/gi, "including juice"));
}

export function presentIngredientName(item: string): string {
  return tidy(item
    .replace(/\b(?:raw )?edible (?:portion|input|weight)\b/gi, "")
    .replace(/,\s*(?:average|retail|raw|meat only|flesh only)(?=,|$)/gi, "")
    .replace(/\braw edible\b/gi, "")
    .replace(/\bedible (?=florets|fat)/gi, "")
    .replace(/\bvisible edible fat\b/gi, "fat"));
}

export function presentIngredient(ingredient: Ingredient): { name: string; quantity: string; component?: string } {
  let component: string | undefined;
  const quantity = ingredient.quantity.replace(/\(([^)]+)\)/g, (_match, note: string) => {
    const parts = note.split(";");
    const hasAuditContext = /edible|as sold|weighed|(?:^|;)\s*(?:dry|raw)\b/i.test(note);
    const retained: string[] = [];
    for (const part of parts) {
      const cleaned = cleanNote(part);
      // Semicolon component labels are source allocations, not audit notes.
      if (parts.length > 1 && hasAuditContext && cleaned === part.trim() && !/^(?:dry|raw|cooked|requires |leaves eaten)/i.test(cleaned)) {
        component = cleaned;
      } else if (cleaned) retained.push(cleaned);
    }
    return retained.length ? `(${retained.join("; ")})` : "";
  }).trim();
  const name = presentIngredientName(ingredient.item);
  const weight = quantity.match(/^(\d+(?:\.\d+)?)\s*g(?:\s|$)/i);
  let display = quantity;
  if (weight) {
    const grams = Number(weight[1]);
    const rest = quantity.slice(weight[0].trimEnd().length).trim();
    const equivalent = kitchenEquivalent(name, grams);
    if (equivalent) display = `Approx. ${equivalent} (${weight[1]} g)${rest ? ` ${rest}` : ""}`;
  }
  return { name, quantity: display, ...(component ? { component } : {}) };
}

function practicalFraction(amount: number, step: number): number | null {
  const rounded = Math.round(amount / step) * step;
  // Never round a small dose to zero, or suggest a materially different amount.
  return rounded > 0 && Math.abs(rounded - amount) / amount <= 0.2 ? rounded : null;
}

export function kitchenEquivalent(name: string, grams: number): string | null {
  if (!(grams > 0)) return null;
  if (/^(?:fresh )?garlic(?:,|$)|^garlic cloves?\b/i.test(name)) {
    const cloves = practicalFraction(grams / 3, 0.25);
    return cloves === null ? null : `${formatQuantityNumber(cloves)} clove${cloves === 1 ? "" : "s"}`;
  }
  // Whole/quarter counts only when within 20% of a reference medium specimen.
  const produce: { grams: number; name: string } | undefined = [
    { pattern: /^(?:red |white |brown )?onions?(?:,|$)/i, grams: 110, name: "medium onion" },
    { pattern: /^(?:fresh )?tomato(?:es)?(?:,|$)/i, grams: 123, name: "medium tomato" },
    { pattern: /^carrots?(?:, raw|$)/i, grams: 61, name: "medium carrot" },
    { pattern: /^(?:(?:red|green|yellow) (?:bell )?pepper|peppers, capsicum, green)(?:,|$)/i, grams: 119, name: "medium pepper" },
    { pattern: /^(?:eating )?apple(?:,|$)/i, grams: 138, name: "small apple" },
  ].find(row => row.pattern.test(name));
  if (produce) {
    const count = practicalFraction(grams / produce.grams, 0.25);
    return count === null ? null : `${formatQuantityNumber(count)} ${produce.name}${count > 1 ? "s" : ""}`;
  }
  if (/^(?:whole )?egg(?:, shell removed)?$/i.test(name) && Number.isInteger(grams / 50)) {
    return `${grams / 50} egg${grams === 50 ? "" : "s"}`;
  }
  // Coconut milk and plant drinks vary by product; do not treat them as dairy milk.
  const spoon = /coconut milk|(?:oat|almond|soya|soy|rice) (?:milk|drink)/i.test(name) ? undefined : spoonWeights.find(([pattern]) => pattern.test(name));
  if (spoon) {
    const teaspoons = practicalFraction(grams / spoon[1], /oil|juice|vinegar|sauce|honey|syrup|milk|cream/i.test(name) ? 0.25 : 0.125);
    if (teaspoons === null) return null;
    if (teaspoons >= 3) {
      const tablespoons = practicalFraction(grams / (spoon[1] * 3), 0.25);
      if (tablespoons !== null) return `${formatQuantityNumber(tablespoons)} tbsp`;
    }
    return `${formatQuantityNumber(teaspoons)} tsp`;
  }
  if (/^(?:boiling |lukewarm |warm |cold |tap |drinking tap )?water$/i.test(name)) return `${grams} ml`;
  return null;
}

// Only known editorial/audit sentences are removed. Cooking temperatures,
// timings, allocations and instructions for handling raw food remain intact.
const auditSentences = [
  /No (?:leaching|nutrient) reduction[^.]*\./gi,
  /This input-weight calculation[^.]*\./gi,
  /Coconut K\/P remains[^.]*\./gi,
  /No unsupported nutrient extraction[^.]*\./gi,
  /All coating\/oil inputs are calculated[^.]*\./gi,
  /CoFID sweet-basil composition[^.]*\./gi,
];

export function presentMethod(step: string): string {
  let text = step;
  // Remove the whole sentence before its semicolon-delimited second clause.
  text = text.replace(/Coconut K\/P remains[^.]*\./gi, "");
  for (const sentence of auditSentences) text = text.replace(sentence, "");
  text = text
    .replace(/Use baking paper rather than adding uncounted dusting flour\./g, "Use baking paper without extra dusting flour.")
    .replace(/This follows a culinary fermentation method, not a validated home food-safety process; /g, "")
    .replace(/\. do not extend fermentation/g, ". Do not extend fermentation")
    .replace(/The finely sliced curry leaves are part of the eaten specification\./g, "Leave the finely sliced curry leaves in the dish.")
    .replace(/Without a curved pan, the flat pancake result is a different practical variant requiring its own review\./g, "Use a curved hopper pan for the characteristic shape.")
    .replace(/record any additional weighed water as a revision/gi, "add a little more water if needed")
    .replace(/add only further weighed water if needed and record the revision/gi, "add a little more water if needed")
    .replace(/so the measured sugar, vinegar and salt remain part of the eaten specification/g, "")
    .replace(/, keeping their fat; no defatting assumption is applied/g, "")
    .replace(/ for the chilli specification/g, "")
    .replace(/This uses full-fat ground peanuts, not defatted kuli-kuli; its fat remains counted\./g, "Use full-fat ground peanuts.")
    .replace(/Do not replace plantain with banana or assume the green-plantain CoFID entry measures the ripe ingredient\./g, "Use ripe plantain, not banana.")
    .replace(/record any extra weighed water/gi, "add a little more water if needed")
    .replace(/If necessary add only additional weighed boiling water as a recorded practical revision\./g, "Add a little more boiling water if needed.")
    .replace(/record extra weighed water if required/gi, "add a little water if needed")
    .replace(/\b(?:measured |weighed )?process water\b/gi, "water")
    .replace(/\bunmeasured dusting flour\b/gi, "extra dusting flour")
    .replace(/\bunmeasured oil\b/gi, "extra oil")
    .replace(/\bunmeasured bone broth\b/gi, "bone broth")
    .replace(/\bmeasured water\b/gi, "water")
    .replace(/\bweighed (?=lukewarm water|warm water|water|tofu|portion|whole egg|raw egg|egg|avocado|peeled)/gi, "")
    .replace(/\bedible (?:pan )?juices\b/gi, "cooking juices")
    .replace(/\bcooked edible weight\b/gi, "cooked weight")
    .replace(/\b(\d+(?:\.\d+)?) g (?:(of the) )?((?:(?:hot |lukewarm |warm |boiling |unsalted |separate |coating |sauce |kofta |finish |bread |griddle |curry |aromatic |fajita |platter |finishing |broth |chicken ))?)(water|(?:olive |rapeseed |vegetable |sesame )?oil|lemon juice|lime juice|(?:ground )?cumin|ground coriander|paprika|turmeric|ground cinnamon|(?:white )?sugar|milk)\b/gi,
      (original, amount: string, ofThe: string | undefined, component: string, ingredient: string) => {
        const equivalent = kitchenEquivalent(ingredient === "oil" ? "olive oil" : ingredient, Number(amount));
        return equivalent ? `approx. ${equivalent} (${amount} g) ${ofThe ? "of the " : ""}${component}${ingredient}` : original;
      });
  text = tidy(text).replace(/\s+\./g, ".");
  return text ? text[0].toUpperCase() + text.slice(1) : "";
}

export function presentMethods(steps: string[]): string[] {
  return steps.map(presentMethod).filter(Boolean);
}
