import type { Metadata } from "next";
import Link from "next/link";
import { recipes } from "@/data/RecipeData";
import RecipePhoto from "@/components/RecipePhoto";
import RecipeNutrition from "@/components/RecipeNutrition";
import styles from "@/components/recipe-design.module.css";
import collection from "./collection.module.css";

const url = "https://www.renalplan.com/kidney-friendly-chinese-recipes";
const description = "Explore Chinese and Chinese-inspired fried rice, noodles and steamed buns, with per-serving nutrition to compare against your individual kidney dietary needs.";

export const metadata: Metadata = {
  title: { absolute: "Kidney-Friendly Chinese Recipes | RenalPlan" },
  description,
  alternates: { canonical: url },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Kidney-Friendly Chinese Recipes | RenalPlan",
    description,
    url,
    siteName: "RenalPlan",
    locale: "en_GB",
    type: "website",
  },
};

const choices = [
  {
    id: "chicken-fried-rice",
    note: "A Chinese-inspired rice-pan lunch with chicken, egg, red pepper and onion. The listed recipe uses no soy sauce, so you can compare its salt figure with the other meals here.",
  },
  {
    id: "chicken-carrot-noodle-stir-fry",
    note: "Ginger-seasoned rice noodles with chicken, carrot and cabbage. This Chinese-inspired stir-fry uses cooked, drained vegetables and keeps the seasoning simple.",
  },
  {
    id: "steamed-cabbage-mushroom-and-white-bean-buns",
    note: "Chinese-style steamed buns with a savoury white-bean, mushroom and cabbage filling. A different texture and cooking method from the rice and noodle dishes, with time allowed for the dough.",
  },
  {
    id: "ginger-egg-and-carrot-fried-rice",
    note: "An egg fried rice option with ginger, carrot, spinach and chives. It uses both whole egg and egg white; check the protein and mineral figures for the listed serving.",
  },
];

export default function ChineseRecipeCollection() {
  return (
    <main className={styles.detail}>
      <Link className={styles.backLink} href="/recipes">Browse all recipes</Link>
      <header className={`${styles.panel} ${collection.intro}`}>
        <span className={styles.category}>From the RenalPlan kitchen</span>
        <h1>Kidney-friendly Chinese recipes</h1>
        <p>From a ginger noodle stir-fry to soft steamed buns, Chinese and Chinese-inspired cooking offers plenty of variety in texture and flavour. This small collection brings together four existing RenalPlan meals, with their ingredients, methods and nutrition ready to explore.</p>
        <p>Choosing a kidney-friendly meal depends on your individual dietary requirements, blood results and treatment. Compare each serving with any salt, potassium, phosphorus and protein targets agreed with your renal dietitian. The right choice will differ from person to person.</p>
      </header>

      <section className={collection.recipes} aria-labelledby="collection-recipes">
        <h2 id="collection-recipes">Rice, noodles and steamed buns to explore</h2>
        <p className={collection.explanation}>Nutrition is shown per serving, using the existing ingredient-based estimates on RenalPlan. Figures apply to the listed recipe and portion; extra sauces, ingredients or a different portion will change them. <Link href="/about#nutrition-sources-methodology">Read about our nutrition sources and methodology</Link>.</p>
        <div className={collection.grid}>
          {choices.map(choice => {
            const recipe = recipes.find(item => item.id === choice.id);
            if (!recipe) return null;
            const unavailableLabels = (recipe.nutritionIncomplete ?? []).map(field => ({
              calories: "Calories", protein: "Protein", carbohydrates: "Carbohydrates", fat: "Fat",
              fibre: "Fibre", salt: "Salt", sodium: "Sodium", potassium: "Potassium", phosphate: "Phosphorus",
            })[field]);
            return (
              <article key={recipe.id} className={styles.card} aria-labelledby={`collection-${recipe.id}`}>
                <Link href={`/recipes/${recipe.id}`} className={styles.cardImage} aria-label={`View ${recipe.name}`}>
                  <RecipePhoto recipeId={recipe.id} src={recipe.image} name={recipe.name} />
                </Link>
                <div className={collection.content}>
                  <h3 id={`collection-${recipe.id}`}><Link href={`/recipes/${recipe.id}`}>{recipe.name}</Link></h3>
                  <p>{choice.note}</p>
                  <p className={collection.time}>{recipe.cookingTime} · Serves {recipe.servings}</p>
                  <p className={collection.serving}>Nutrition per serving</p>
                  <RecipeNutrition detailed unavailableLabels={unavailableLabels} values={[
                    ["Calories", recipe.nutrition.calories], ["Protein", recipe.nutrition.protein],
                    ["Carbohydrates", recipe.nutrition.carbohydrates], ["Fat", recipe.nutrition.fat],
                    ["Fibre", recipe.nutrition.fibre], ["Salt", recipe.nutrition.salt],
                    ["Potassium", recipe.nutrition.potassium], ["Phosphorus", recipe.nutrition.phosphate],
                  ]} />
                  <Link className={styles.backLink} href={`/recipes/${recipe.id}`}>View recipe and cooking method →</Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className={`${styles.panel} ${collection.guidance}`} aria-labelledby="choosing-a-meal">
        <h2 id="choosing-a-meal">Choosing a meal for your own requirements</h2>
        <p>Start with the portion you plan to eat. The meals here have different energy, protein and mineral totals, even when they share rice or noodles. Open a recipe to check the full ingredient list, quantities and Dietary Guide before adding it to your week.</p>
        <p>Sauces deserve particular attention. Soy sauce can contribute a substantial amount of salt, and adding it at the table changes the figures for the meal. Follow the listed quantities when comparing recipes. <a href="https://www.nnuh.nhs.uk/publication/download/kidney-disease-eating-out-on-a-renal-diet-v6/">Norfolk and Norwich University Hospitals guidance on eating out with kidney disease</a> includes advice on added salt and soy sauce.</p>
        <p>Potassium and phosphorus needs vary. Use the nutrient figures alongside your own dietary advice rather than treating a cuisine or cooking method as a guarantee of suitability. <a href="https://kidneycareuk.org/get-support/healthy-diet-support/kidney-kitchen/welcome-to-the-kidney-kitchen/how-to-use-our-recipes/">Kidney Care UK explains how to compare recipes with your individual needs</a>.</p>
        <Link className={styles.backLink} href="/recipes">Explore the full RenalPlan recipe catalogue</Link>
      </section>
    </main>
  );
}
