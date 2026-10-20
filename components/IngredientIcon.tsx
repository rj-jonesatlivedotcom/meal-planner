import styles from "./recipe-design.module.css";

// Illustrations identify the listed ingredient; they never supply recipe content.
const icons: [RegExp, string][] = [
  [/egg white/i, "🥣"], [/egg/i, "🥚"], [/bread|toast|bagel|muffin|pitta/i, "🍞"],
  [/butter|cheese/i, "🧈"], [/tomato/i, "🍅"], [/peppercorn|black pepper/i, "🧂"],
  [/pepper/i, "🫑"], [/milk|cream|yoghurt/i, "🥛"], [/apple/i, "🍎"],
  [/chicken|turkey/i, "🍗"], [/fish|cod|tuna|salmon|haddock/i, "🐟"],
  [/carrot/i, "🥕"], [/onion|leek|garlic/i, "🧅"], [/mushroom/i, "🍄"],
  [/rice|oat|flour|couscous/i, "🌾"], [/potato/i, "🥔"], [/lemon/i, "🍋"],
  [/lettuce|cabbage|herb|parsley|chive/i, "🥬"], [/salt/i, "🧂"],
];

export default function IngredientIcon({ item }: { item: string }) {
  return <span className={styles.ingredientIcon} aria-hidden="true">{icons.find(([pattern]) => pattern.test(item))?.[1] ?? "🥣"}</span>;
}
