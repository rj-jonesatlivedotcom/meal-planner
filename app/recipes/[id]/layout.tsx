
import type { Metadata } from "next";
import { recipes } from "@/data/RecipeData";

const SITE_URL = "https://www.renalplan.com";

type RecipeLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
};

function getRecipe(id: string) {
  return recipes.find((recipe) => recipe.id === id);
}

function toIsoDuration(value: string) {
  const match = value.match(/(\d+)/);

  if (!match) {
    return undefined;
  }

  return `PT${match[1]}M`;
}

export async function generateMetadata({
  params,
}: RecipeLayoutProps): Promise<Metadata> {
  const { id } = await params;
  const recipe = getRecipe(id);

  if (!recipe) {
    return {
      title: "Recipe Not Found | RenalPlan",
      robots: {
        index: false,
        follow: false,
        },
      // Keeps a canonical tag even if the recipe ID is invalid
      alternates: {
        canonical: `/recipes/${id}`,
      },
    };
  }

  const recipeUrl = `${SITE_URL}/recipes/${recipe.id}`;

  return {
    title: `${recipe.name} | RenalPlan`,
    description: recipe.description,

    alternates: {
      canonical: recipeUrl,
    },

    openGraph: {
      title: `${recipe.name} | RenalPlan`,
      description: recipe.description,
      url: recipeUrl,
      siteName: "RenalPlan",
      locale: "en_GB",
      type: "article",
      ...(recipe.image?.trim()
        ? {
            images: [
              {
                url: `${SITE_URL}${recipe.image}`,
                alt: recipe.name,
              },
            ],
          }
        : {}),
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RecipeLayout({
  children,
  params,
}: RecipeLayoutProps) {
  const { id } = await params;
  const recipe = getRecipe(id);

  if (!recipe) {
    return children;
  }

  const recipeUrl = `${SITE_URL}/recipes/${recipe.id}`;
  const recipeImage = recipe.image?.trim()
    ? `${SITE_URL}${recipe.image}`
    : undefined;
  const totalTime = toIsoDuration(recipe.cookingTime);

  const recipeSchema = {
    "@context": "https://schema.org",
    "@type": "Recipe",

    name: recipe.name,

    description: recipe.description,

    ...(recipeImage
      ? {
          image: [recipeImage],
        }
      : {}),

    url: recipeUrl,

    author: {
      "@type": "Organization",
      name: "RenalPlan",
      url: SITE_URL,
    },

    publisher: {
      "@type": "Organization",
      name: "RenalPlan",
      url: SITE_URL,
    },

    recipeCategory: recipe.category,

    recipeYield: `${recipe.servings} ${
      recipe.servings === 1 ? "serving" : "servings"
    }`,

    ...(totalTime
      ? {
          totalTime,
        }
      : {}),

    recipeIngredient: recipe.ingredients.map(
      (ingredient) =>
        `${ingredient.quantity} ${ingredient.item}`
    ),

    recipeInstructions: recipe.method.map(
      (step, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        text: step,
      })
    ),

    nutrition: {
      "@type": "NutritionInformation",
      calories: recipe.nutrition.calories,
      proteinContent: recipe.nutrition.protein,
      carbohydrateContent:
        recipe.nutrition.carbohydrates,
      fatContent: recipe.nutrition.fat,
      fiberContent: recipe.nutrition.fibre,
      sodiumContent: recipe.nutrition.sodium,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(recipeSchema),
        }}
      />

      {children}
    </>
  );
}
