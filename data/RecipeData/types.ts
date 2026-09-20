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

export type Recipe = {
  id: string;
  code: string;
  category: string;
  emoji: string;
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
  potassium: "Low" | "Moderate" | "High";
  phosphate: "Low" | "Moderate" | "High";
  purines: "Low" | "Moderate" | "High";
  dietaryNote?: string;
  servings: number;
  source?: {
    name: string;
    url: string;
    logo: string;
    description?: string;
    linkText?: string;
  };
};