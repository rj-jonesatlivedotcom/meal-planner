/** Quantity syntax only. Shopping keeps its existing unit/purchase conversions. */
const fractions: Record<string, number> = {
  "¼": 1 / 4, "½": 1 / 2, "¾": 3 / 4, "⅓": 1 / 3, "⅔": 2 / 3,
  "⅛": 1 / 8, "⅜": 3 / 8, "⅝": 5 / 8, "⅞": 7 / 8,
};
const numberPattern = String.raw`(?:\d+\s+\d+\s*/\s*\d+|\d+\s*[¼½¾⅓⅔⅛⅜⅝⅞]|\d+\s*/\s*\d+|\d+(?:\.\d+)?|[¼½¾⅓⅔⅛⅜⅝⅞])`;

export function quantityNumber(value: string): number | null {
  const text = value.trim().replace(/⁄/g, "/");
  if (text in fractions) return fractions[text];
  const unicode = text.match(/^(\d+)\s*([¼½¾⅓⅔⅛⅜⅝⅞])$/);
  if (unicode) return Number(unicode[1]) + fractions[unicode[2]];
  const slash = text.match(/^(?:(\d+)\s+)?(\d+)\s*\/\s*(\d+)$/);
  if (slash) return Number(slash[3]) > 0 ? Number(slash[1] ?? 0) + Number(slash[2]) / Number(slash[3]) : null;
  return /^\d+(?:\.\d+)?$/.test(text) ? Number(text) : null;
}

export function parseRecipeQuantity(quantity: string): {
  amount: number; unit: string; referenceWeight?: { amount: number; unit: "g" | "kg" };
} | null {
  const original = quantity.trim().replace(/⁄/g, "/");
  const bracket = original.match(/[([]\s*(\d+(?:\.\d+)?)\s*(kg|g)\s*[)\]]/i);
  const text = original.replace(/\([^)]*\)|\[[^\]]*\]/g, "").trim();
  if (text.includes(" + ")) return null; // preserved mixed/unmeasured requirements are not a single quantity
  const multiply = text.match(new RegExp(`^(${numberPattern})\\s*[×x]\\s*(${numberPattern})(?![\\d./-])\\s*(.*)$`, "i"));
  const simple = multiply ? null : text.match(new RegExp(`^(${numberPattern})(?![\\d./-])\\s*(.*)$`));
  let amount: number | null = null;
  let unit = "";
  if (multiply) {
    const count = quantityNumber(multiply[1]), each = quantityNumber(multiply[2]);
    if (count !== null && each !== null) amount = count * each;
    unit = multiply[3];
  } else if (simple) {
    amount = quantityNumber(simple[1]); unit = simple[2];
  } else if (/^(small|medium|large)$/i.test(text)) {
    amount = 1; unit = text;
  }
  if (amount === null || !Number.isFinite(amount) || amount < 0) return null;
  return {
    amount, unit: unit.trim(),
    ...(bracket ? { referenceWeight: { amount: Number(bracket[1]), unit: bracket[2].toLowerCase() as "g" | "kg" } } : {}),
  };
}

export function formatQuantityNumber(amount: number): string {
  const whole = Math.floor(amount), remainder = amount - whole;
  const fraction = Object.entries(fractions).find(([, value]) => Math.abs(remainder - value) < 1e-9);
  if (fraction) return `${whole || ""}${fraction[0]}`;
  return String(Math.round(amount * 100) / 100);
}

/** An unknown quantity must stay visible and must never be guessed or discarded. */
export function unmeasuredShoppingQuantity(quantity: string, people: number, servings: number): string {
  return `Unmeasured: ${quantity.trim() || "quantity not specified"} (recipe serves ${servings}; shopping for ${people} serving${people === 1 ? "" : "s"})`;
}
