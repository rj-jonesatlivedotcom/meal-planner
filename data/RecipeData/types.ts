export type Ingredient = {
  item: string;
  shoppingItem?: string;
  quantity: string;
};

export type Nutrition = {
  calories: string;
  protein: string;
  carbohydrates: string;
  fat: string;
  fibre: string;
  sodium: string;
  salt?: string;
  potassium?: string;
  phosphate?: string;
};

export type NutritionField = keyof Nutrition;

export type DietaryRating = "Low" | "Moderate" | "High" | "Pending review";

export type Recipe = {
  id: string;
  code: string;
  category: string;
  cuisine?: string;
  mealFamily: string;emoji: string;
  image: string;
  name: string;
  description: string;
  cookingTime: string;
  calories: string;
  protein: string;
  equipment: string;
  ingredients: Ingredient[];
  method: string[];
  nutrition: Nutrition;
  potassium: DietaryRating;
  phosphate: DietaryRating;
  purines: DietaryRating;
  dietaryNote?: string;
  /** Status of the current CoFID ingredient-input calculation. */
  nutritionBasis?: "CoFID ingredient-input estimate";
  nutritionIncomplete?: NutritionField[];
  /** Nutrients supplemented from an explicitly cited secondary source, when applicable. */
  nutritionSourceNote?: string;
  quantityConversionsEstimated?: boolean;
  conditionalProxyPending?: boolean;
  clinicalReviewPending?: boolean;
  /** Approximate countable fluid in ml from listed liquid/semi-liquid ingredients; excludes natural food moisture and drained cooking water. */
  fluidMl?: number;
  servings: number;
  source?: {
    name: string;
    url: string;
    logo: string;
    description?: string;
    linkText?: string;
  };
};
