import type { Metadata } from "next";
import { recipes } from "@/data/RecipeData";

const SITE_URL = "https://www.renalplan.com";

export const metadata: Metadata = {
  title: {
    absolute: "Kidney-Friendly Recipes | RenalPlan",
  },
  alternates: {
    canonical: `${SITE_URL}/recipes`,
  },
};

const recipeListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: recipes.map((recipe, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `${SITE_URL}/recipes/${recipe.id}`,
  })),
};

export default function RecipesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(recipeListSchema),
        }}
      />
      {children}
    </>
  );
}
