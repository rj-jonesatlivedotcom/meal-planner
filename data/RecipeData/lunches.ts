import type { Recipe } from "./types";

export const lunches: Recipe[] = [
  {
    id: "chicken-lettuce-sandwich",
    code: "L001", mealFamily: "sandwich",
    category: "Lunch",
    cuisine: "British",
    emoji: "🥪",
    image: "/images/recipes/L001.webp",
    name: "Chicken & Lettuce Sandwich",
    description: "Tender pan-cooked chicken and crisp iceberg lettuce come together in soft white bread with a smooth layer of mayonnaise.",
    cookingTime: "15 minutes",
    calories: "372 kcal",
    protein: "24.0 g",
    equipment: "Knife, Chopping board, Butter knife, Frying pan, Food thermometer",
    ingredients: [
      { item: "White bread", shoppingItem: "White bread", quantity: "2 slices (70 g)" },
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "75 g (raw)" },
      { item: "Iceberg lettuce", shoppingItem: "Iceberg lettuce", quantity: "2 leaves (shredded if preferred)" },
      { item: "Mayonnaise", shoppingItem: "Mayonnaise", quantity: "20 g" },
    ],
    method: [
      "Wash and prepare the salad vegetables. Rinse the produce under cold running water, drain well and gently pat dry so that excess water does not dilute the filling or dressing. Cut the chicken breast into thin strips.",
      "Heat a non-stick frying pan over medium heat and cook the chicken for 6–8 minutes, turning regularly, until completely cooked through. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food. Remove from the pan and allow to rest briefly.",
      "Spread the measured mayonnaise evenly over the bread.",
      "Arrange the cooked chicken and prepared vegetables over the bread.",
      "Close the sandwich, cut in half if desired and serve immediately."
    ],
    nutrition: {
      calories: "372 kcal",
      protein: "24.0 g",
      carbohydrates: "33.0 g",
      fat: "16.9 g",
      fibre: "2.0 g",
      sodium: "353 mg",
      salt: "0.88 g",
      potassium: "419 mg",
      phosphate: "237 mg",
    },
    potassium: "Moderate",
    phosphate: "Low",
    purines: "Moderate",
    dietaryNote: "The chicken contributes protein. Compare the recorded potassium, phosphate and salt values with your own My Diet targets when planning the rest of the day.",
    fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1,
  
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    nutritionSourceNote: "Owner-approved source assumptions D4 are documented in the 16 October 2026 reconciliation workbook.",
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  {
    id: "egg-lettuce-sandwich",
    code: "L002", mealFamily: "sandwich",
    category: "Lunch",
    cuisine: "British",
    emoji: "🥪",
    image: "/images/recipes/L002.webp",
    name: "Egg & Lettuce Sandwich",
    description: "Slices of hard-boiled egg and crisp lettuce are tucked into soft white bread with creamy mayonnaise for a classic, satisfying sandwich.",
    cookingTime: "14 minutes",
    calories: "401 kcal",
    protein: "20.0 g",
    equipment: "Knife, Chopping board, Butter knife, Saucepan, Lid or bowl cover",
    ingredients: [
      { item: "White bread", shoppingItem: "White bread", quantity: "2 slices (70 g)" },
      { item: "Egg", shoppingItem: "Egg", quantity: "2" },
      { item: "Iceberg lettuce", shoppingItem: "Iceberg lettuce", quantity: "2 leaves (shredded if preferred)" },
      { item: "Mayonnaise", shoppingItem: "Mayonnaise", quantity: "15 g" },
    ],
    method: [
      "Place the eggs in a saucepan and cover with cold water.",
      "Bring the water to a boil.",
      "Once boiling, cook the eggs for 8–10 minutes.",
      "Drain, cool under cold running water and peel the eggs.",
      "Slice the eggs and arrange on the bread with mayonnaise and lettuce. Make sure washed salad leaves are dry before assembling, so they do not make the bread or filling soggy. Spread the filling evenly across the portion and serve soon after assembling.",
      "Close the sandwich, cut in half if desired and serve."
    ],
    nutrition: {
      calories: "401 kcal",
      protein: "20.0 g",
      carbohydrates: "32.9 g",
      fat: "22.0 g",
      fibre: "2.0 g",
      sodium: "451 mg",
      salt: "1.13 g",
      potassium: "282 mg",
      phosphate: "277 mg",
    },
    potassium: "Low",
    phosphate: "Moderate",
    purines: "Low",
    dietaryNote: "Compare this serving’s recorded potassium, phosphate and salt values with your own My Diet targets and the rest of the day’s meals.",
    fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1,
  
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    primaryDietCategory: "Vegetarian",
    dietCategories: ["Vegetarian"]
  },
  {
    id: "tuna-lettuce-sandwich",
    code: "L003", mealFamily: "sandwich",
    category: "Lunch",
    cuisine: "British",
    emoji: "🥪",
    image: "/images/recipes/L003.webp",
    name: "Tuna & Lettuce Sandwich",
    description: "Flaked tuna folded through creamy mayonnaise and layered with crisp lettuce makes a quick, savoury sandwich.",
    cookingTime: "8 minutes",
    calories: "358 kcal",
    protein: "20.9 g",
    equipment: "Knife, Chopping board, Butter knife, Mixing bowl",
    ingredients: [
      { item: "White bread", shoppingItem: "White bread", quantity: "2 slices (70 g)" },
      { item: "Tuna, canned in brine, drained", shoppingItem: "Tuna, canned in brine, drained", quantity: "60 g" },
      { item: "Iceberg lettuce", shoppingItem: "Iceberg lettuce", quantity: "2 leaves (shredded if preferred)" },
      { item: "Mayonnaise", shoppingItem: "Mayonnaise", quantity: "20 g" },
    ],
    method: [
      "Drain the tuna thoroughly and prepare the lettuce.",
      "Mix the tuna with the measured mayonnaise.",
      "Spread the tuna mixture over the bread.",
      "Add the lettuce and close the sandwich.",
      "Cut in half if desired and serve."
    ],
    nutrition: {
      calories: "358 kcal",
      protein: "20.9 g",
      carbohydrates: "33.0 g",
      fat: "16.7 g",
      fibre: "2.0 g",
      sodium: "484 mg",
      salt: "1.21 g",
      potassium: "279 mg",
      phosphate: "175 mg",
    },
    potassium: "Low",
    phosphate: "Low",
    purines: "Low",
    dietaryNote: "The tuna is canned in brine, so drain it thoroughly. Check the label because salt content varies by product.",
    fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1,
  
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  {
    id: "chicken-cucumber-sandwich",
    code: "L004", mealFamily: "sandwich",
    category: "Lunch",
    cuisine: "British",
    emoji: "🥪",
    image: "/images/recipes/L004.webp",
    name: "Chicken & Cucumber Sandwich",
    description: "Tender chicken and cool, crunchy cucumber meet a creamy mayonnaise spread in soft white bread for a fresh, easy lunch.",
    cookingTime: "15 minutes",
    calories: "377 kcal",
    protein: "24.3 g",
    equipment: "Knife, Chopping board, Butter knife, Frying pan, Food thermometer",
    ingredients: [
      { item: "White bread", shoppingItem: "White bread", quantity: "2 slices (70 g)" },
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "75 g (raw)" },
      { item: "Cucumber", shoppingItem: "Cucumber", quantity: "½ cucumber (50 g)" },
      { item: "Mayonnaise", shoppingItem: "Mayonnaise", quantity: "20 g" },
    ],
    method: [
      "Wash and prepare the salad vegetables. Rinse the produce under cold running water, drain well and gently pat dry so that excess water does not dilute the filling or dressing. Cut the chicken breast into thin strips.",
      "Heat a non-stick frying pan over medium heat and cook the chicken for 6–8 minutes, turning regularly, until completely cooked through. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food. Remove from the pan and allow to rest briefly.",
      "Spread the measured mayonnaise evenly over the bread.",
      "Arrange the cooked chicken and prepared vegetables over the bread.",
      "Close the sandwich, cut in half if desired and serve immediately."
    ],
    nutrition: {
      calories: "377 kcal",
      protein: "24.3 g",
      carbohydrates: "33.4 g",
      fat: "17.2 g",
      fibre: "2.1 g",
      sodium: "353 mg",
      salt: "0.88 g",
      potassium: "452 mg",
      phosphate: "244 mg",
    },
    potassium: "Moderate",
    phosphate: "Low",
    purines: "Moderate",
    dietaryNote: "The chicken contributes protein. Compare the recorded nutrition with your own My Diet targets.",
    fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1,
  
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: false,
    nutritionSourceNote: "Owner-approved source assumptions D4 are documented in the 16 October 2026 reconciliation workbook.",
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  {
    id: "egg-mayo-sandwich",
    code: "L005", mealFamily: "sandwich",
    category: "Lunch",
    cuisine: "British",
    emoji: "🥪",
    image: "/images/recipes/L005.webp",
    name: "Egg Mayo Sandwich",
    description: "Classic egg mayonnaise with a fresh hint of chives, piled onto soft white bread for a simple, comforting lunch.",
    cookingTime: "14 minutes",
    calories: "469 kcal",
    protein: "20.0 g",
    equipment: "Knife, Chopping board, Butter knife, Saucepan, Mixing bowl, Lid or bowl cover",
    ingredients: [
      { item: "White bread", shoppingItem: "White bread", quantity: "2 slices (70 g)" },
      { item: "Egg", shoppingItem: "Egg", quantity: "2" },
      { item: "Mayonnaise", shoppingItem: "Mayonnaise", quantity: "25 g" },
      { item: "Fresh chives", shoppingItem: "Fresh chives", quantity: "3 g" },
    ],
    method: [
      "Place the egg in a saucepan and cover with cold water.",
      "Bring the water to a boil.",
      "Cook the egg for 8–10 minutes.",
      "Drain, cool under cold running water and peel.",
      "Chop the egg and mix with mayonnaise and chopped chives.",
      "Spread the mixture over the bread and serve."
    ],
    nutrition: {
      calories: "469 kcal",
      protein: "20.0 g",
      carbohydrates: "32.9 g",
      fat: "29.4 g",
      fibre: "1.8 g",
      sodium: "463 mg",
      salt: "1.16 g",
      potassium: "247 mg",
      phosphate: "274 mg",
    },
    potassium: "Low",
    phosphate: "Moderate",
    purines: "Low",
    dietaryNote: "Egg provides the main protein source. Compare the recorded nutrition with your own My Diet targets.",
    fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1,
  
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    primaryDietCategory: "Vegetarian",
    dietCategories: ["Vegetarian"]
  },
  {
    id: "chicken-red-pepper-sandwich",
    code: "L006", mealFamily: "sandwich",
    category: "Lunch",
    cuisine: "British",
    emoji: "🥪",
    image: "/images/recipes/L006.webp",
    name: "Chicken & Red Pepper Sandwich",
    description: "Tender chicken and sweet red pepper add colour and a little crunch to this generously filled mayonnaise sandwich.",
    cookingTime: "15 minutes",
    calories: "371 kcal",
    protein: "22.8 g",
    equipment: "Knife, Chopping board, Butter knife, Frying pan, Food thermometer",
    ingredients: [
      { item: "White bread", shoppingItem: "White bread", quantity: "2 slices (70 g)" },
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "70 g (raw)" },
      { item: "Red pepper", shoppingItem: "Red peppers", quantity: "½ red pepper (30 g)" },
      { item: "Mayonnaise", shoppingItem: "Mayonnaise", quantity: "20 g" },
    ],
    method: [
      "Wash and prepare the salad vegetables. Rinse the produce under cold running water, drain well and gently pat dry so that excess water does not dilute the filling or dressing. Cut the chicken breast into thin strips.",
      "Heat a non-stick frying pan over medium heat and cook the chicken for 6–8 minutes, turning regularly, until completely cooked through. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food. Remove from the pan and allow to rest briefly.",
      "Spread the measured mayonnaise evenly over the bread.",
      "Arrange the cooked chicken and prepared vegetables over the bread.",
      "Close the sandwich, cut in half if desired and serve immediately."
    ],
    nutrition: {
      calories: "371 kcal",
      protein: "22.8 g",
      carbohydrates: "34.0 g",
      fat: "16.9 g",
      fibre: "1.8 g",
      sodium: "349 mg",
      salt: "0.87 g",
      potassium: "421 mg",
      phosphate: "228 mg",
    },
    potassium: "Low",
    phosphate: "Low",
    purines: "Moderate",
    dietaryNote: "The chicken contributes protein. Compare the recorded nutrition with your own My Diet targets.",
    fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1,
  
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: false,
    nutritionSourceNote: "Owner-approved source assumptions D4 are documented in the 16 October 2026 reconciliation workbook.",
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  {
    id: "ham-lettuce-sandwich",
    code: "L007", mealFamily: "sandwich",
    category: "Lunch",
    cuisine: "British",
    emoji: "🥪",
    image: "/images/recipes/L002.webp",
    name: "Egg & Lettuce Sandwich with Chives",
    description: "Soft white bread layered with egg, crisp lettuce and creamy mayonnaise makes this a familiar, satisfying lunchtime favourite.",
    cookingTime: "15 mins",
    calories: "430 kcal",
    protein: "18.5 g",
    equipment: "Knife, Chopping board, Butter knife, Saucepan, Lid or bowl cover",
    ingredients: [
      { item: "White bread", shoppingItem: "White bread", quantity: "2 slices (70 g)" },
      { item: "Egg", shoppingItem: "Egg", quantity: "2" },
      { item: "Iceberg lettuce", shoppingItem: "Iceberg lettuce", quantity: "2 leaves (shredded if preferred)" },
      { item: "Butter, unsalted", shoppingItem: "Unsalted butter", quantity: "10 g" },
      { item: "Mayonnaise", shoppingItem: "Mayonnaise", quantity: "10 g" },
    ],
    method: [
      "Place the eggs in a saucepan and cover with cold water. Bring to the boil and cook for 8–10 minutes. Drain, cool under cold running water, peel and slice.",
      "Wash and prepare the lettuce. Rinse the produce under cold running water, drain well and gently pat dry so that excess water does not dilute the filling or dressing.",
      "Spread the measured butter over the bread.",
      "Spread the mayonnaise over the bread.",
      "Add the sliced eggs and lettuce.",
      "Close the sandwich, cut in half if desired and serve."
    ],
    nutrition: {
      calories: "430 kcal",
      protein: "18.5 g",
      carbohydrates: "32.9 g",
      fat: "25.8 g",
      fibre: "2.0 g",
      sodium: "450 mg",
      salt: "1.12 g",
      potassium: "288 mg",
      phosphate: "253 mg",
    },
    potassium: "Low",
    phosphate: "Moderate",
    purines: "Low",
    dietaryNote: "Ham, bread and mayonnaise can all contribute salt; check product labels because values vary by brand. Buttering the bread is optional.",
    fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1,
  
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    primaryDietCategory: "Vegetarian",
    dietCategories: ["Vegetarian"]
  },
  {
    id: "chicken-cream-cheese-sandwich",
    code: "L008", mealFamily: "sandwich",
    category: "Lunch",
    cuisine: "British",
    emoji: "🥪",
    image: "/images/recipes/L008.webp",
    name: "Chicken & Cream Cheese Sandwich",
    description: "Tender chicken, cool cucumber and smooth cream cheese make a fresh, creamy filling between slices of soft white bread.",
    cookingTime: "15 minutes",
    calories: "296 kcal",
    protein: "24.1 g",
    equipment: "Knife, Chopping board, Butter knife, Frying pan, Food thermometer",
    ingredients: [
      { item: "White bread", shoppingItem: "White bread", quantity: "2 slices (70 g)" },
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "70 g (raw)" },
      { item: "Cream cheese", shoppingItem: "Cream cheese", quantity: "25 g" },
      { item: "Cucumber", shoppingItem: "Cucumber", quantity: "⅓ cucumber (40 g)" },
    ],
    method: [
      "Wash and prepare the salad vegetables. Rinse the produce under cold running water, drain well and gently pat dry so that excess water does not dilute the filling or dressing. Cut the chicken breast into thin strips.",
      "Heat a non-stick frying pan over medium heat and cook the chicken for 6–8 minutes, turning regularly, until completely cooked through. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food. Remove from the pan and allow to rest briefly.",
      "Spread the measured cream cheese evenly over the bread.",
      "Arrange the cooked chicken and prepared vegetables over the bread.",
      "Close the sandwich, cut in half if desired and serve immediately."
    ],
    nutrition: {
      calories: "296 kcal",
      protein: "24.1 g",
      carbohydrates: "33.5 g",
      fat: "8.2 g",
      fibre: "2.0 g",
      sodium: "389 mg",
      salt: "0.97 g",
      potassium: "440 mg",
      phosphate: "254 mg",
    },
    potassium: "Moderate",
    phosphate: "Moderate",
    purines: "Moderate",
    dietaryNote: "Chicken contributes protein, while cream cheese can contribute phosphate. Check the cream cheese label for added phosphates where relevant.",
    fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1,
  
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: false,
    nutritionSourceNote: "Owner-approved source assumptions D4, D2 are documented in the 16 October 2026 reconciliation workbook.",
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  {
    id: "chicken-lettuce-wrap",
    code: "L009", mealFamily: "wrap",
    category: "Lunch",
    emoji: "🌯",
    image: "/images/recipes/L009.webp",
    name: "Chicken & Lettuce Wrap",
    description: "A soft tortilla wrapped around tender chicken, crisp lettuce and creamy mayonnaise for an easy lunch with a fresh crunch.",
    cookingTime: "20 mins",
    calories: "385 kcal",
    protein: "21.9 g",
    equipment: "Knife, Chopping board, Butter knife, Frying pan, Food thermometer",
    ingredients: [
      { item: "White tortilla wrap", shoppingItem: "White Tortilla Wraps", quantity: "60 g" },
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "70 g (raw)" },
      { item: "Iceberg lettuce", shoppingItem: "Iceberg lettuce", quantity: "2 leaves (shredded if preferred)" },
      { item: "Mayonnaise", shoppingItem: "Mayonnaise", quantity: "20 g" },
    ],
    method: [
      "Slice the raw chicken breast into thin, even strips. Heat a non-stick frying pan over medium heat and cook for about 6–8 minutes, turning regularly, until cooked through. Check the thickest pieces with a clean food thermometer: they must reach 75°C for at least 30 seconds; continue cooking if needed. Transfer to a clean plate and let the steam subside while preparing the filling.",
      "Using a clean board and knife, wash, dry and prepare the listed salad vegetables. Keep them separate from raw chicken and its utensils.",
      "Spread the measured mayonnaise over the tortilla.",
      "Add the cooked chicken and prepared vegetables down the centre.",
      "Fold in the sides and roll the tortilla tightly. Keep the filling in a compact strip rather than spreading it to every edge. Fold the sides in first where the recipe calls for a closed wrap, then roll firmly without squeezing the filling out.",
      "Cut the wrap in half if desired and serve immediately."
    ],
    nutrition: {
      calories: "385 kcal",
      protein: "21.9 g",
      carbohydrates: "33.1 g",
      fat: "19.2 g",
      fibre: "2.5 g",
      sodium: "443 mg",
      salt: "1.11 g",
      potassium: "380 mg",
      phosphate: "287 mg",
    },
    potassium: "Low",
    phosphate: "Moderate",
    purines: "Moderate",
    dietaryNote: "Compare the recorded nutrient totals for this serving with your own My Diet targets when planning the rest of the day.",
    fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1,
  
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    nutritionSourceNote: "Owner-approved source assumptions D4 are documented in the 16 October 2026 reconciliation workbook.",
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  {
    id: "tuna-mayo-wrap",
    code: "L010", mealFamily: "wrap",
    category: "Lunch",
    emoji: "🌯",
    image: "/images/recipes/L010.webp",
    name: "Tuna Mayo Wrap",
    description: "Creamy tuna mayonnaise and crisp iceberg lettuce rolled into a soft tortilla for a simple, satisfying wrap.",
    cookingTime: "15 minutes",
    calories: "376 kcal",
    protein: "20.1 g",
    equipment: "Knife, Chopping board, Butter knife, Mixing bowl",
    ingredients: [
      { item: "White tortilla wrap", shoppingItem: "White Tortilla Wraps", quantity: "60 g" },
      { item: "Tuna, canned in brine, drained", shoppingItem: "Tuna, canned in brine, drained", quantity: "60 g" },
      { item: "Mayonnaise", shoppingItem: "Mayonnaise", quantity: "20 g" },
      { item: "Iceberg lettuce", shoppingItem: "Iceberg lettuce", quantity: "2 leaves (shredded if preferred)" },
    ],
    method: [
      "Drain the tuna thoroughly and prepare the lettuce.",
      "Mix the tuna with mayonnaise.",
      "Lay the tortilla flat and spoon the tuna mixture down the centre.",
      "Add the lettuce.",
      "Fold in the sides and roll tightly.",
      "Close the sandwich, cut in half if desired and serve immediately."
    ],
    nutrition: {
      calories: "376 kcal",
      protein: "20.1 g",
      carbohydrates: "33.1 g",
      fat: "19.0 g",
      fibre: "2.5 g",
      sodium: "577 mg",
      salt: "1.44 g",
      potassium: "259 mg",
      phosphate: "235 mg",
    },
    potassium: "Low",
    phosphate: "Moderate",
    purines: "Low",
    dietaryNote: "The tuna is canned in brine, so drain it thoroughly. Check the label because salt content varies by product.",
    fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1,
  
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  {
    id: "egg-chive-wrap",
    code: "L011", mealFamily: "wrap",
    category: "Lunch",
    emoji: "🌯",
    image: "/images/recipes/L011.webp",
    name: "Egg & Chive Wrap",
    description: "Chopped egg mixed with mayonnaise and fresh chives gives this wrap a rich, savoury filling, balanced by crisp lettuce.",
    cookingTime: "15 minutes",
    calories: "420 kcal",
    protein: "19.3 g",
    equipment: "Knife, Chopping board, Butter knife, Saucepan, Mixing bowl, Lid or bowl cover",
    ingredients: [
      { item: "White tortilla wrap", shoppingItem: "White Tortilla Wraps", quantity: "60 g" },
      { item: "Egg", shoppingItem: "Egg", quantity: "2" },
      { item: "Mayonnaise", shoppingItem: "Mayonnaise", quantity: "15 g" },
      { item: "Fresh chives", shoppingItem: "Fresh chives", quantity: "3 g" },
      { item: "Iceberg lettuce", shoppingItem: "Iceberg lettuce", quantity: "2 leaves (shredded if preferred)" },
    ],
    method: [
      "Place the eggs in a saucepan and cover with cold water.",
      "Bring the water to a boil.",
      "Cook the eggs for 8–10 minutes.",
      "Drain, cool under cold running water and peel.",
      "Chop the eggs and mix with mayonnaise and chopped chives.",
      "Lay the tortilla flat and add the lettuce and egg mixture.",
      "Fold in the sides and roll the tortilla tightly. Keep the filling in a compact strip rather than spreading it to every edge. Fold the sides in first where the recipe calls for a closed wrap, then roll firmly without squeezing the filling out. Serve."
    ],
    nutrition: {
      calories: "420 kcal",
      protein: "19.3 g",
      carbohydrates: "33.0 g",
      fat: "24.3 g",
      fibre: "2.5 g",
      sodium: "545 mg",
      salt: "1.36 g",
      potassium: "270 mg",
      phosphate: "339 mg",
    },
    potassium: "Low",
    phosphate: "High",
    purines: "Low",
    dietaryNote: "Egg provides the main protein source. Check the wrap label for added phosphate ingredients where relevant.",
    fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1,
  
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    primaryDietCategory: "Vegetarian",
    dietCategories: ["Vegetarian"]
  },
  {
    id: "chicken-cucumber-wrap",
    code: "L012", mealFamily: "wrap",
    category: "Lunch",
    emoji: "🌯",
    image: "/images/recipes/L012.webp",
    name: "Chicken & Cucumber Wrap",
    description: "Tender chicken, cool cucumber and creamy mayonnaise tucked into a soft tortilla for a fresh, filling wrap.",
    cookingTime: "20 mins",
    calories: "391 kcal",
    protein: "22.3 g",
    equipment: "Knife, Chopping board, Butter knife, Frying pan, Food thermometer",
    ingredients: [
      { item: "White tortilla wrap", shoppingItem: "White Tortilla Wraps", quantity: "60 g" },
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "70 g (raw)" },
      { item: "Cucumber", shoppingItem: "Cucumber", quantity: "½ cucumber (60 g)" },
      { item: "Mayonnaise", shoppingItem: "Mayonnaise", quantity: "20 g" },
    ],
    method: [
      "Slice the raw chicken breast into thin, even strips. Heat a non-stick frying pan over medium heat and cook for about 6–8 minutes, turning regularly, until cooked through. Check the thickest pieces with a clean food thermometer: they must reach 75°C for at least 30 seconds; continue cooking if needed. Transfer to a clean plate and let the steam subside while preparing the filling.",
      "Using a clean board and knife, wash, dry and prepare the listed salad vegetables. Keep them separate from raw chicken and its utensils.",
      "Spread the measured mayonnaise over the tortilla.",
      "Add the cooked chicken and prepared vegetables down the centre.",
      "Fold in the sides and roll the tortilla tightly. Keep the filling in a compact strip rather than spreading it to every edge. Fold the sides in first where the recipe calls for a closed wrap, then roll firmly without squeezing the filling out.",
      "Cut the wrap in half if desired and serve immediately."
    ],
    nutrition: {
      calories: "391 kcal",
      protein: "22.3 g",
      carbohydrates: "33.5 g",
      fat: "19.5 g",
      fibre: "2.6 g",
      sodium: "444 mg",
      salt: "1.11 g",
      potassium: "429 mg",
      phosphate: "296 mg",
    },
    potassium: "Moderate",
    phosphate: "Moderate",
    purines: "Moderate",
    dietaryNote: "Compare the recorded nutrient totals for this serving with your own My Diet targets when planning the rest of the day.",
    fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1,
  
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: false,
    nutritionSourceNote: "Owner-approved source assumptions D4 are documented in the 16 October 2026 reconciliation workbook.",
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  {
    id: "chicken-pepper-pasta",
    code: "L013", mealFamily: "hot-pasta",
    category: "Lunch",
    emoji: "🍝",
    image: "/images/recipes/L013.webp",
    name: "Chicken & Pepper Pasta",
    description: "Pasta tossed with tender chicken, sweet red pepper and softened onion for a colourful, savoury bowl.",
    cookingTime: "18 minutes",
    calories: "438 kcal",
    protein: "25.8 g",
    equipment: "Knife, Chopping board, Saucepan, Frying pan, Food thermometer, Colander or sieve",
    ingredients: [
      { item: "Pasta", shoppingItem: "Pasta", quantity: "75 g (dry)" },
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "70 g (raw)" },
      { item: "Red pepper", shoppingItem: "Red peppers", quantity: "½ red pepper (30 g)" },
      { item: "Onion", shoppingItem: "Onions", quantity: "½ onion (30 g)" },
      { item: "Vegetable oil", shoppingItem: "Vegetable oil", quantity: "10 g" },
    ],
    method: [
      "Bring a saucepan of water to the boil and cook the pasta according to the packet instructions. Separate the pasta or noodles as they soften so they do not stick together. Check the texture towards the end of the cooking time; it should be tender with no chalky centre.",
      "Finely chop the onion and red pepper.",
      "Heat the vegetable oil in a frying pan over medium heat.",
      "Cook the onion and red pepper until softened. Stir around the base and edges of the pan. The vegetables should soften and lose their raw bite; lower the heat if they start to darken before they are tender.",
      "Add the chicken and cook thoroughly until no longer pink in the centre. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food.",
      "Drain the pasta thoroughly.",
      "Add the pasta to the frying pan and toss with the chicken and vegetables.",
      "Heat through thoroughly and serve immediately."
    ],
    nutrition: {
      calories: "438 kcal",
      protein: "25.8 g",
      carbohydrates: "60.4 g",
      fat: "12.1 g",
      fibre: "0.8 g",
      sodium: "45 mg",
      salt: "0.11 g",
      potassium: "539 mg",
      phosphate: "302 mg",
    },
    potassium: "Moderate",
    phosphate: "Moderate",
    purines: "Moderate",
    dietaryNote: "Compare the recorded nutrient totals for this serving with your own My Diet targets when planning the rest of the day.",
    fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1,
  
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: false,
    nutritionSourceNote: "Owner-approved source assumptions D4 are documented in the 16 October 2026 reconciliation workbook.",
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  {
    id: "creamy-chicken-pasta",
    code: "L014", mealFamily: "hot-pasta",
    category: "Lunch",
    emoji: "🍝",
    image: "/images/recipes/L014.webp",
    name: "Creamy Chicken Pasta",
    description: "Tender chicken and softened onion coated in a smooth cream-cheese sauce, tossed through pasta for a comforting lunch.",
    cookingTime: "18 minutes",
    calories: "506 kcal",
    protein: "27.1 g",
    equipment: "Knife, Chopping board, Saucepan, Frying pan, Food thermometer, Colander or sieve",
    ingredients: [
      { item: "Pasta", shoppingItem: "Pasta", quantity: "75 g (dry)" },
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "70 g (raw)" },
      { item: "Cream cheese", shoppingItem: "Cream cheese", quantity: "30 g" },
      { item: "Onion", shoppingItem: "Onions", quantity: "¼ onion (25 g)" },
      { item: "Vegetable oil", shoppingItem: "Vegetable oil", quantity: "10 g" },
    ],
    method: [
      "Bring a saucepan of water to the boil and cook the pasta according to the packet instructions. Separate the pasta or noodles as they soften so they do not stick together. Check the texture towards the end of the cooking time; it should be tender with no chalky centre.",
      "Finely chop the onion.",
      "Heat the vegetable oil in a frying pan over medium heat.",
      "Cook the onion until softened. Stir around the base and edges of the pan. The vegetables should soften and lose their raw bite; lower the heat if they start to darken before they are tender.",
      "Add the chicken and cook thoroughly until no longer pink in the centre. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food.",
      "Drain the pasta thoroughly.",
      "Add the pasta and cream cheese to the frying pan and stir until combined.",
      "Heat through thoroughly and serve immediately."
    ],
    nutrition: {
      calories: "506 kcal",
      protein: "27.1 g",
      carbohydrates: "59.6 g",
      fat: "19.3 g",
      fibre: "0.7 g",
      sodium: "122 mg",
      salt: "0.31 g",
      potassium: "494 mg",
      phosphate: "323 mg",
    },
    potassium: "Moderate",
    phosphate: "Moderate",
    purines: "Moderate",
    dietaryNote: "Compare the recorded nutrient totals for this serving with your own My Diet targets when planning the rest of the day.",
    fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1,
  
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: false,
    nutritionSourceNote: "Owner-approved source assumptions D4, D2 are documented in the 16 October 2026 reconciliation workbook.",
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  {
    id: "tuna-pepper-pasta",
    code: "L015", mealFamily: "hot-pasta",
    category: "Lunch",
    emoji: "🍝",
    image: "/images/recipes/L015.webp",
    name: "Tuna & Pepper Pasta",
    description: "Tuna and sweet red pepper bring a fresh, savoury contrast to pasta, with a creamy mayonnaise finish and fragrant chives.",
    cookingTime: "18 minutes",
    calories: "467 kcal",
    protein: "24.0 g",
    equipment: "Knife, Chopping board, Saucepan, Frying pan, Colander or sieve",
    ingredients: [
      { item: "Pasta", shoppingItem: "Pasta", quantity: "75 g (dry)" },
      { item: "Tuna, canned in brine, drained", shoppingItem: "Tuna, canned in brine, drained", quantity: "60 g" },
      { item: "Red pepper", shoppingItem: "Red peppers", quantity: "½ red pepper (30 g)" },
      { item: "Mayonnaise", shoppingItem: "Mayonnaise", quantity: "20 g" },
      { item: "Fresh chives", shoppingItem: "Fresh chives", quantity: "3 g" },
    ],
    method: [
      "Bring a saucepan of water to the boil and cook the pasta according to the packet instructions. Separate the pasta or noodles as they soften so they do not stick together. Check the texture towards the end of the cooking time; it should be tender with no chalky centre.",
      "Prepare the red pepper and fresh chives.",
      "Drain the pasta thoroughly.",
      "Add the drained pasta, tuna and red pepper to a clean pan and warm gently.",
      "Stir through the mayonnaise and fresh chives.",
      "Serve immediately."
    ],
    nutrition: {
      calories: "467 kcal",
      protein: "24.0 g",
      carbohydrates: "58.5 g",
      fat: "16.8 g",
      fibre: "0.1 g",
      sodium: "204 mg",
      salt: "0.51 g",
      potassium: "386 mg",
      phosphate: "246 mg",
    },
    potassium: "Low",
    phosphate: "Moderate",
    purines: "Moderate",
    dietaryNote: "The tuna is canned in brine, so drain it thoroughly and check the product label for salt content.",
    fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1,
  
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: false,
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  {
    id: "egg-cream-cheese-pasta",
    code: "L016", mealFamily: "hot-pasta",
    category: "Lunch",
    emoji: "🍝",
    image: "/images/recipes/L016.webp",
    name: "Egg & Cream Cheese Pasta",
    description: "Cream cheese coats the pasta while egg adds substance and fresh chives bring a savoury, herby finish.",
    cookingTime: "19 minutes",
    calories: "510 kcal",
    protein: "22.8 g",
    equipment: "Knife, Chopping board, Saucepan, Frying pan, Mixing bowl, Fork or whisk, Colander or sieve",
    ingredients: [
      { item: "Pasta", shoppingItem: "Pasta", quantity: "75 g (dry)" },
      { item: "Egg", shoppingItem: "Egg", quantity: "2" },
      { item: "Cream cheese", shoppingItem: "Cream cheese", quantity: "30 g" },
      { item: "Fresh chives", shoppingItem: "Fresh chives", quantity: "3 g" },
      { item: "Vegetable oil", shoppingItem: "Vegetable oil", quantity: "5 g" },
    ],
    method: [
      "Bring a saucepan of water to the boil and cook the pasta according to the packet instructions. Separate the pasta or noodles as they soften so they do not stick together. Check the texture towards the end of the cooking time; it should be tender with no chalky centre.",
      "Prepare the egg and fresh chives.",
      "Drain the pasta thoroughly.",
      "Add the pasta and cream cheese to a frying pan over low heat and stir until combined.",
      "Beat the egg, add it to the hot pasta and stir continuously until fully cooked.",
      "Stir through the fresh chives and serve immediately."
    ],
    nutrition: {
      calories: "510 kcal",
      protein: "22.8 g",
      carbohydrates: "57.7 g",
      fat: "22.5 g",
      fibre: "0.2 g",
      sodium: "234 mg",
      salt: "0.58 g",
      potassium: "355 mg",
      phosphate: "344 mg",
    },
    potassium: "Low",
    phosphate: "High",
    purines: "Low",
    dietaryNote: "Egg provides protein; cream cheese can contribute phosphate. Check the label for added phosphates where relevant.",
    fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1,
  
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    nutritionSourceNote: "Owner-approved source assumptions D2 are documented in the 16 October 2026 reconciliation workbook.",
    primaryDietCategory: "Vegetarian",
    dietCategories: ["Vegetarian"]
  },
  {
    id: "chicken-onion-pasta",
    code: "L017", mealFamily: "hot-pasta",
    category: "Lunch",
    emoji: "🍝",
    image: "/images/recipes/L017.webp",
    name: "Chicken & Onion Pasta",
    description: "Tender chicken and sweet softened onion are folded through pasta with a smooth cream-cheese coating.",
    cookingTime: "18 minutes",
    calories: "504 kcal",
    protein: "28.2 g",
    equipment: "Knife, Chopping board, Saucepan, Frying pan, Food thermometer, Colander or sieve",
    ingredients: [
      { item: "Pasta", shoppingItem: "Pasta", quantity: "75 g (dry)" },
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "75 g (raw)" },
      { item: "Onion", shoppingItem: "Onions", quantity: "½ onion (40 g)" },
      { item: "Cream cheese", shoppingItem: "Cream cheese", quantity: "25 g" },
      { item: "Vegetable oil", shoppingItem: "Vegetable oil", quantity: "10 g" },
    ],
    method: [
      "Bring a saucepan of water to the boil and cook the pasta according to the packet instructions. Separate the pasta or noodles as they soften so they do not stick together. Check the texture towards the end of the cooking time; it should be tender with no chalky centre.",
      "Finely chop the onion.",
      "Heat the vegetable oil in a frying pan over medium heat.",
      "Cook the onion until softened. Stir around the base and edges of the pan. The vegetables should soften and lose their raw bite; lower the heat if they start to darken before they are tender.",
      "Add the chicken and cook thoroughly until no longer pink in the centre. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food.",
      "Drain the pasta thoroughly.",
      "Add the pasta and cream cheese to the frying pan and stir through the chicken and onion.",
      "Heat through thoroughly and serve immediately."
    ],
    nutrition: {
      calories: "504 kcal",
      protein: "28.2 g",
      carbohydrates: "60.7 g",
      fat: "18.2 g",
      fibre: "1.0 g",
      sodium: "113 mg",
      salt: "0.28 g",
      potassium: "529 mg",
      phosphate: "333 mg",
    },
    potassium: "Moderate",
    phosphate: "Moderate",
    purines: "Moderate",
    dietaryNote: "Compare the recorded nutrient totals for this serving with your own My Diet targets when planning the rest of the day.",
    fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1,
  
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: false,
    nutritionSourceNote: "Owner-approved source assumptions D4, D2 are documented in the 16 October 2026 reconciliation workbook.",
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  {
    id: "chicken-mushroom-pasta",
    code: "L018", mealFamily: "hot-pasta",
    category: "Lunch",
    emoji: "🍝",
    image: "/images/recipes/L018.webp",
    name: "Chicken & Mushroom Pasta",
    description: "Sliced mushrooms and tender chicken make a savoury pasta dish, brought together with a smooth cream-cheese sauce.",
    cookingTime: "18 minutes",
    calories: "487 kcal",
    protein: "27.0 g",
    equipment: "Knife, Chopping board, Saucepan, Frying pan, Food thermometer, Colander or sieve",
    ingredients: [
      { item: "Pasta", shoppingItem: "Pasta", quantity: "75 g (dry)" },
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "70 g (raw)" },
      { item: "Mushrooms", shoppingItem: "Mushrooms", quantity: "4 mushrooms (40 g)" },
      { item: "Cream cheese", shoppingItem: "Cream cheese", quantity: "25 g" },
      { item: "Vegetable oil", shoppingItem: "Vegetable oil", quantity: "10 g" },
    ],
    method: [
      "Bring a saucepan of water to the boil and cook the pasta according to the packet instructions. Separate the pasta or noodles as they soften so they do not stick together. Check the texture towards the end of the cooking time; it should be tender with no chalky centre.",
      "Slice the mushrooms and prepare the chicken.",
      "Heat the vegetable oil in a frying pan over medium heat.",
      "Cook the mushrooms until softened.",
      "Add the chicken and cook thoroughly until no longer pink in the centre. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food.",
      "Drain the pasta thoroughly.",
      "Add the pasta and cream cheese to the frying pan and stir until combined.",
      "Heat through thoroughly and serve immediately."
    ],
    nutrition: {
      calories: "487 kcal",
      protein: "27.0 g",
      carbohydrates: "57.6 g",
      fat: "18.1 g",
      fibre: "0.4 g",
      sodium: "110 mg",
      salt: "0.28 g",
      potassium: "606 mg",
      phosphate: "350 mg",
    },
    potassium: "High",
    phosphate: "High",
    purines: "Moderate",
    dietaryNote: "Compare the recorded nutrient totals for this serving with your own My Diet targets when planning the rest of the day.",
    fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1,
  
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: false,
    nutritionSourceNote: "Owner-approved source assumptions D4, D2 are documented in the 16 October 2026 reconciliation workbook.",
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  {
    id: "tuna-cream-cheese-pasta",
    code: "L019", mealFamily: "hot-pasta",
    category: "Lunch",
    emoji: "🍝",
    image: "/images/recipes/L019.webp",
    name: "Tuna & Cream Cheese Pasta",
    description: "Flaked tuna and smooth cream cheese create a creamy pasta coating, lifted by a sprinkle of fresh chives.",
    cookingTime: "18 minutes",
    calories: "431 kcal",
    protein: "24.8 g",
    equipment: "Knife, Chopping board, Saucepan, Frying pan, Colander or sieve",
    ingredients: [
      { item: "Pasta", shoppingItem: "Pasta", quantity: "75 g (dry)" },
      { item: "Tuna, canned in brine, drained", shoppingItem: "Tuna, canned in brine, drained", quantity: "60 g" },
      { item: "Cream cheese", shoppingItem: "Cream cheese", quantity: "25 g" },
      { item: "Fresh chives", shoppingItem: "Fresh chives", quantity: "3 g" },
      { item: "Vegetable oil", shoppingItem: "Vegetable oil", quantity: "5 g" },
    ],
    method: [
      "Bring a saucepan of water to the boil and cook the pasta according to the packet instructions. Separate the pasta or noodles as they soften so they do not stick together. Check the texture towards the end of the cooking time; it should be tender with no chalky centre.",
      "Prepare the tuna, cream cheese and fresh chives.",
      "Drain the pasta thoroughly.",
      "Add the pasta, tuna and cream cheese to a frying pan over low heat and stir until combined.",
      "Stir through the fresh chives.",
      "Heat through thoroughly and serve immediately."
    ],
    nutrition: {
      calories: "431 kcal",
      protein: "24.8 g",
      carbohydrates: "57.5 g",
      fat: "12.9 g",
      fibre: "0.2 g",
      sodium: "242 mg",
      salt: "0.61 g",
      potassium: "343 mg",
      phosphate: "263 mg",
    },
    potassium: "Low",
    phosphate: "Moderate",
    purines: "Moderate",
    dietaryNote: "The tuna is canned in brine, so drain it thoroughly and check the product label for salt content. Cream cheese can vary in phosphate additives by brand.",
    fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1,
  
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: false,
    nutritionSourceNote: "Owner-approved source assumptions D2 are documented in the 16 October 2026 reconciliation workbook.",
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  {
    id: "chicken-fried-rice",
    code: "L020", mealFamily: "rice-bowl",
    category: "Lunch",
    cuisine: "Chinese",
    emoji: "🍚",
    image: "/images/recipes/L020.webp",
    name: "Chicken Fried Rice",
    description: "A colourful pan of rice with tender chicken, egg, red pepper and onion, cooked together for a hearty, savoury lunch.",
    cookingTime: "26 minutes",
    calories: "458 kcal",
    protein: "27.6 g",
    equipment: "Knife, Chopping board, Saucepan, Frying pan, Mixing bowl, Fork or whisk, Food thermometer, Lid or bowl cover",
    ingredients: [
      { item: "White rice", shoppingItem: "White rice", quantity: "60 g (dry)" },
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "70 g (raw)" },
      { item: "Egg", shoppingItem: "Egg", quantity: "1" },
      { item: "Red pepper", shoppingItem: "Red peppers", quantity: "⅓ red pepper (25 g)" },
      { item: "Onion", shoppingItem: "Onions", quantity: "½ onion (30 g)" },
      { item: "Vegetable oil", shoppingItem: "Vegetable oil", quantity: "10 g" },
    ],
    method: [
      "Rinse the measured dry rice and place it in a saucepan with the appropriate amount of water.",
      "Bring to the boil, cover and simmer according to the rice packet instructions. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork.",
      "Finely dice the onion and red pepper.",
      "Heat the vegetable oil in a frying pan over medium heat.",
      "Cook the onion and red pepper until softened. Stir around the base and edges of the pan. The vegetables should soften and lose their raw bite; lower the heat if they start to darken before they are tender.",
      "Add the chicken and cook thoroughly until no longer pink in the centre. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food.",
      "Beat the egg, add it to the pan and stir continuously until fully cooked.",
      "Stir in the cooked rice and combine thoroughly.",
      "Serve immediately."
    ],
    nutrition: {
      calories: "458 kcal",
      protein: "27.6 g",
      carbohydrates: "54.5 g",
      fat: "15.9 g",
      fibre: "1.5 g",
      sodium: "121 mg",
      salt: "0.30 g",
      potassium: "479 mg",
      phosphate: "326 mg",
    },
    potassium: "Moderate",
    phosphate: "Moderate",
    purines: "Moderate",
    dietaryNote: "Compare the recorded nutrient totals for this serving with your own My Diet targets when planning the rest of the day.",
    fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1,
  
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    nutritionSourceNote: "Owner-approved source assumptions D4 are documented in the 16 October 2026 reconciliation workbook.",
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  {
    id: "egg-pepper-rice-bowl",
    code: "L021", mealFamily: "rice-bowl",
    category: "Lunch",
    emoji: "🍚",
    image: "/images/recipes/L021.webp",
    name: "Egg & Pepper Rice Bowl",
    description: "Fluffy rice tossed with egg, sweet red pepper and softened onion for a simple, satisfying bowl full of savoury flavour.",
    cookingTime: "23 minutes",
    calories: "514 kcal",
    protein: "23.4 g",
    equipment: "Knife, Chopping board, Saucepan, Frying pan, Mixing bowl, Fork or whisk, Lid or bowl cover",
    ingredients: [
      { item: "White rice", shoppingItem: "White rice", quantity: "60 g (dry)" },
      { item: "Egg", shoppingItem: "Egg", quantity: "3" },
      { item: "Red pepper", shoppingItem: "Red peppers", quantity: "½ red pepper (30 g)" },
      { item: "Onion", shoppingItem: "Onions", quantity: "¼ onion (25 g)" },
      { item: "Vegetable oil", shoppingItem: "Vegetable oil", quantity: "10 g" },
    ],
    method: [
      "Rinse the measured dry rice and place it in a saucepan with the appropriate amount of water.",
      "Bring to the boil, cover and simmer according to the rice packet instructions. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork.",
      "Finely dice the onion and red pepper.",
      "Heat the oil in a frying pan over medium heat.",
      "Cook the onion and pepper for 3 minutes until softened. Stir around the base and edges of the pan. The vegetables should soften and lose their raw bite; lower the heat if they start to darken before they are tender.",
      "Add the cooked rice and stir-fry for 2 minutes.",
      "Beat the egg, add it to the pan and stir until fully cooked.",
      "Serve immediately."
    ],
    nutrition: {
      calories: "514 kcal",
      protein: "23.4 g",
      carbohydrates: "54.4 g",
      fat: "24.2 g",
      fibre: "1.4 g",
      sodium: "233 mg",
      salt: "0.58 g",
      potassium: "369 mg",
      phosphate: "351 mg",
    },
    potassium: "Low",
    phosphate: "High",
    purines: "Low",
    dietaryNote: "Egg provides the main protein source. Compare the recorded nutrition with your own My Diet targets.",
    fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1,
  
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    primaryDietCategory: "Vegetarian",
    dietCategories: ["Vegetarian"]
  },
  {
    id: "chicken-onion-rice-bowl",
    code: "L022", mealFamily: "rice-bowl",
    category: "Lunch",
    emoji: "🍚",
    image: "/images/recipes/L022.webp",
    name: "Chicken & Onion Rice Bowl",
    description: "Tender chicken, sweet onion and red pepper served with fluffy rice for a straightforward, comforting bowl.",
    cookingTime: "26 minutes",
    calories: "401 kcal",
    protein: "22.6 g",
    equipment: "Knife, Chopping board, Saucepan, Frying pan, Food thermometer, Lid or bowl cover",
    ingredients: [
      { item: "White rice", shoppingItem: "White rice", quantity: "60 g (dry)" },
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "75 g (raw)" },
      { item: "Onion", shoppingItem: "Onions", quantity: "½ onion (40 g)" },
      { item: "Red pepper", shoppingItem: "Red peppers", quantity: "⅓ red pepper (20 g)" },
      { item: "Vegetable oil", shoppingItem: "Vegetable oil", quantity: "10 g" },
    ],
    method: [
      "Rinse the measured dry rice and place it in a saucepan with the appropriate amount of water.",
      "Bring to the boil, cover and simmer according to the rice packet instructions. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork.",
      "Finely slice the onion and dice the pepper.",
      "Heat the oil in a frying pan over medium heat.",
      "Cook the onion and pepper for 3 minutes until softened. Stir around the base and edges of the pan. The vegetables should soften and lose their raw bite; lower the heat if they start to darken before they are tender.",
      "Add the raw chicken and cook for 6–8 minutes until completely cooked through. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food.",
      "Stir in the cooked rice and heat thoroughly.",
      "Serve immediately."
    ],
    nutrition: {
      calories: "401 kcal",
      protein: "22.6 g",
      carbohydrates: "55.1 g",
      fat: "11.5 g",
      fibre: "1.7 g",
      sodium: "47 mg",
      salt: "0.12 g",
      potassium: "428 mg",
      phosphate: "249 mg",
    },
    potassium: "Moderate",
    phosphate: "Low",
    purines: "Moderate",
    dietaryNote: "Compare the recorded nutrient totals for this serving with your own My Diet targets when planning the rest of the day.",
    fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1,
  
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: false,
    nutritionSourceNote: "Owner-approved source assumptions D4 are documented in the 16 October 2026 reconciliation workbook.",
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  {
    id: "tuna-egg-rice-bowl",
    code: "L023", mealFamily: "rice-bowl",
    category: "Lunch",
    emoji: "🍚",
    image: "/images/recipes/L023.webp",
    name: "Tuna & Egg Rice Bowl",
    description: "A filling rice bowl topped with flaky tuna, cooked egg and cool cucumber, brought together with a creamy mayonnaise dressing.",
    cookingTime: "20 minutes",
    calories: "485 kcal",
    protein: "33.3 g",
    equipment: "Knife, Chopping board, Saucepan, Frying pan, Lid or bowl cover",
    ingredients: [
      { item: "White rice", shoppingItem: "White rice", quantity: "60 g (dry)" },
      { item: "Tuna, canned in brine, drained", shoppingItem: "Tuna, canned in brine, drained", quantity: "90 g" },
      { item: "Egg", shoppingItem: "Egg", quantity: "1" },
      { item: "Cucumber", shoppingItem: "Cucumber", quantity: "⅓ cucumber (40 g)" },
      { item: "Mayonnaise", shoppingItem: "Mayonnaise", quantity: "15 g" },
    ],
    method: [
      "Rinse the measured dry rice and place it in a saucepan with the appropriate amount of water.",
      "Bring to the boil, then cover and simmer according to the rice packet instructions. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork.",
      "While the rice cooks, prepare the cucumber and drain the tuna.",
      "Cook the egg in a frying pan until fully set, then remove and set aside.",
      "Drain any excess water from the rice if necessary and allow it to stand for a minute.",
      "Stir the rice with the tuna and mayonnaise, then top with the cooked egg and cucumber.",
      "Serve immediately."
    ],
    nutrition: {
      calories: "485 kcal",
      protein: "33.3 g",
      carbohydrates: "51.9 g",
      fat: "17.5 g",
      fibre: "0.9 g",
      sodium: "363 mg",
      salt: "0.91 g",
      potassium: "395 mg",
      phosphate: "324 mg",
    },
    potassium: "Low",
    phosphate: "High",
    purines: "Low",
    dietaryNote: "The tuna is canned in brine, so drain it thoroughly and check the product label for salt content.",
    fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1,
  
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  {
    id: "chicken-noodle-bowl",
    code: "L024", mealFamily: "noodle-bowl",
    category: "Lunch",
    emoji: "🍜",
    image: "/images/recipes/L024.webp",
    name: "Chicken & Noodle Bowl",
    description: "Egg noodles tossed with tender chicken and red pepper, with cucumber adding a fresh finish to this colourful bowl.",
    cookingTime: "20 minutes",
    calories: "428 kcal",
    protein: "26.4 g",
    equipment: "Knife, Chopping board, Saucepan, Frying pan, Food thermometer, Colander or sieve",
    ingredients: [
      { item: "Egg noodles", shoppingItem: "Egg noodles", quantity: "75 g (dry)" },
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "70 g (raw)" },
      { item: "Cucumber", shoppingItem: "Cucumber", quantity: "⅓ cucumber (40 g)" },
      { item: "Red pepper", shoppingItem: "Red peppers", quantity: "⅓ red pepper (25 g)" },
      { item: "Vegetable oil", shoppingItem: "Vegetable oil", quantity: "10 g" },
    ],
    method: [
      "Bring a saucepan of water to a boil and cook the measured dry egg noodles according to the packet instructions. Separate the pasta or noodles as they soften so they do not stick together. Check the texture towards the end of the cooking time; it should be tender with no chalky centre.",
      "Slice the chicken and prepare the cucumber and red pepper.",
      "Heat the oil in a frying pan over medium heat.",
      "Stir-fry the raw chicken and red pepper for 6–8 minutes until the chicken is completely cooked through and the pepper is softened. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food.",
      "Drain the noodles thoroughly.",
      "Add the noodles and cucumber to the pan and toss together.",
      "Heat through thoroughly and serve."
    ],
    nutrition: {
      calories: "428 kcal",
      protein: "26.4 g",
      carbohydrates: "56.0 g",
      fat: "12.6 g",
      fibre: "0.4 g",
      sodium: "419 mg",
      salt: "1.05 g",
      potassium: "659 mg",
      phosphate: "309 mg",
    },
    potassium: "High",
    phosphate: "Moderate",
    purines: "Moderate",
    dietaryNote: "Compare the recorded nutrient totals for this serving with your own My Diet targets when planning the rest of the day.",
    fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1,
  
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: false,
    nutritionSourceNote: "Owner-approved source assumptions D4 are documented in the 16 October 2026 reconciliation workbook.",
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  {
    id: "chicken-jacket-potato",
    code: "L025", mealFamily: "jacket-potato",
    category: "Lunch",
    cuisine: "British",
    emoji: "🥔",
    image: "/images/recipes/L025.webp",
    name: "Chicken Jacket Potato",
    description: "A fluffy baked potato filled with tender chicken and smooth cream cheese, served with crisp iceberg lettuce on the side.",
    cookingTime: "29 minutes",
    calories: "289 kcal",
    protein: "22.5 g",
    equipment: "Knife, Chopping board, Saucepan, Microwave, Oven or air fryer, Mixing bowl, Frying pan, Food thermometer, Baking tray",
    ingredients: [
      { item: "Baking potato", shoppingItem: "Baking potato", quantity: "1 baking potato (200 g)" },
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "70 g (raw)" },
      { item: "Cream cheese", shoppingItem: "Cream cheese", quantity: "30 g" },
      { item: "Iceberg lettuce", shoppingItem: "Iceberg lettuce", quantity: "2 leaves (shredded if preferred)" },
    ],
    method: [
      "Wash and prick the baking potato several times with a fork.",
      "Microwave the potato until tender, turning halfway through according to your microwave instructions.",
      "While the potato cooks, prepare the filling and wash the lettuce. Rinse the produce under cold running water, drain well and gently pat dry so that excess water does not dilute the filling or dressing.",
      "Slice the raw chicken breast and cook in a non-stick frying pan over medium heat for 6–8 minutes, turning regularly, until completely cooked through. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food.",
      "Finish the potato in a hot oven or air fryer until the skin is crisp.",
      "Mix the cooked chicken with the cream cheese.",
      "Cut a cross in the top of the potato and gently open it.",
      "Fill with the chicken and cream cheese mixture and serve with the lettuce."
    ],
    nutrition: {
      calories: "289 kcal",
      protein: "22.5 g",
      carbohydrates: "33.2 g",
      fat: "8.3 g",
      fibre: "4.3 g",
      sodium: "125 mg",
      salt: "0.31 g",
      potassium: "1202 mg",
      phosphate: "252 mg",
    },
    potassium: "High",
    phosphate: "Moderate",
    purines: "Moderate",
    dietaryNote: "The potato is baked rather than boiled, so this method does not discard cooking water to reduce potassium. If you have a potassium restriction, compare the recorded amount with your own My Diet target.",
    fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1,
  
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    nutritionSourceNote: "Owner-approved source assumptions D6, D4, D2 are documented in the 16 October 2026 reconciliation workbook. Potato uses CoFID 13-494 flesh and skin at an estimated 149 g cooked from 200 g raw using a 74.5% microwave reference yield; actual microwave-plus-oven final weight was not measured. All skin is assumed eaten.",
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  {
    id: "tuna-jacket-potato",
    code: "L026", mealFamily: "jacket-potato",
    category: "Lunch",
    cuisine: "British",
    emoji: "🥔",
    image: "/images/recipes/L026.webp",
    name: "Tuna Jacket Potato",
    description: "A warm, fluffy jacket potato topped with creamy tuna mayonnaise and served with crisp lettuce for a classic, satisfying lunch.",
    cookingTime: "29 minutes",
    calories: "342 kcal",
    protein: "19.3 g",
    equipment: "Knife, Chopping board, Saucepan, Microwave, Oven or air fryer, Mixing bowl, Baking tray",
    ingredients: [
      { item: "Baking potato", shoppingItem: "Baking potato", quantity: "1 baking potato (200 g)" },
      { item: "Tuna, canned in brine, drained", shoppingItem: "Tuna, canned in brine, drained", quantity: "60 g" },
      { item: "Mayonnaise", shoppingItem: "Mayonnaise", quantity: "20 g" },
      { item: "Iceberg lettuce", shoppingItem: "Iceberg lettuce", quantity: "2 leaves (shredded if preferred)" },
    ],
    method: [
      "Wash and prick the baking potato several times with a fork.",
      "Microwave the potato until tender, turning halfway through according to your microwave instructions.",
      "Drain the tuna thoroughly and mix with the mayonnaise.",
      "Finish the potato in a hot oven or air fryer until the skin is crisp.",
      "Cut a cross in the top of the potato and gently open it.",
      "Fill with the tuna mixture and serve with the lettuce. Make sure washed salad leaves are dry before assembling, so they do not make the bread or filling soggy. Spread the filling evenly across the portion and serve soon after assembling."
    ],
    nutrition: {
      calories: "342 kcal",
      protein: "19.3 g",
      carbohydrates: "32.8 g",
      fat: "15.7 g",
      fibre: "4.3 g",
      sodium: "207 mg",
      salt: "0.52 g",
      potassium: "1055 mg",
      phosphate: "172 mg",
    },
    potassium: "High",
    phosphate: "Low",
    purines: "Low",
    dietaryNote: "The potato is baked rather than boiled, so this method does not discard cooking water to reduce potassium. The tuna is canned in brine, so drain it thoroughly and check the label for salt content.",
    fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1,
  
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    nutritionSourceNote: "Owner-approved source assumptions D6 are documented in the 16 October 2026 reconciliation workbook. Potato uses CoFID 13-494 flesh and skin at an estimated 149 g cooked from 200 g raw using a 74.5% microwave reference yield; actual microwave-plus-oven final weight was not measured. All skin is assumed eaten.",
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  {
    id: "egg-mayo-jacket-potato",
    code: "L027", mealFamily: "jacket-potato",
    category: "Lunch",
    cuisine: "British",
    emoji: "🥔",
    image: "/images/recipes/L027.webp",
    name: "Egg Mayo Jacket Potato",
    description: "Fluffy jacket potato topped with creamy egg mayonnaise and finished with fresh chives for a comforting lunch.",
    cookingTime: "29 minutes",
    calories: "418 kcal",
    protein: "18.3 g",
    equipment: "Knife, Chopping board, Saucepan, Microwave, Oven or air fryer, Mixing bowl, Lid or bowl cover, Baking tray",
    ingredients: [
      { item: "Baking potato", shoppingItem: "Baking potato", quantity: "1 baking potato (200 g)" },
      { item: "Egg", shoppingItem: "Egg", quantity: "2" },
      { item: "Mayonnaise", shoppingItem: "Mayonnaise", quantity: "20 g" },
      { item: "Fresh chives", shoppingItem: "Fresh chives", quantity: "3 g" },
    ],
    method: [
      "Wash and prick the baking potato several times with a fork.",
      "Microwave the potato until tender, turning halfway through according to your microwave instructions.",
      "Place the egg in a saucepan, cover with cold water and bring to the boil.",
      "Cook the egg for 8–10 minutes.",
      "Drain, cool and peel the egg, then chop and mix with mayonnaise and chives. Boiling and discarding the water can remove some potassium, but it does not make the portion potassium-free or establish a precise reduction.",
      "Finish the potato in a hot oven or air fryer until crisp.",
      "Cut a cross in the top, gently open and fill with the egg mixture."
    ],
    nutrition: {
      calories: "418 kcal",
      protein: "18.3 g",
      carbohydrates: "32.6 g",
      fat: "24.7 g",
      fibre: "4.1 g",
      sodium: "179 mg",
      salt: "0.45 g",
      potassium: "1022 mg",
      phosphate: "272 mg",
    },
    potassium: "High",
    phosphate: "Moderate",
    purines: "Low",
    dietaryNote: "The potato is baked rather than boiled, so this method does not discard cooking water to reduce potassium. Egg provides protein; compare the recorded nutrition with your own My Diet targets.",
    fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1,
  
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    nutritionSourceNote: "Owner-approved source assumptions D6 are documented in the 16 October 2026 reconciliation workbook. Potato uses CoFID 13-494 flesh and skin at an estimated 149 g cooked from 200 g raw using a 74.5% microwave reference yield; actual microwave-plus-oven final weight was not measured. All skin is assumed eaten.",
    primaryDietCategory: "Vegetarian",
    dietCategories: ["Vegetarian"]
  },
  {
    id: "chicken-potato-hash",
    code: "L028", mealFamily: "potato-hash",
    category: "Lunch",
    emoji: "🥔",
    image: "/images/recipes/L028.webp",
    name: "Chicken Potato Hash",
    description: "Golden pan-fried potatoes with tender chicken, softened onion and sweet pepper make a hearty, savoury hash.",
    cookingTime: "32 minutes",
    calories: "376 kcal",
    protein: "20.8 g",
    equipment: "Knife, Chopping board, Saucepan, Frying pan, Food thermometer",
    ingredients: [
      { item: "Potatoes, peeled", shoppingItem: "Potatoes, peeled", quantity: "1 potato (180 g)" },
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "70 g (raw)" },
      { item: "Onion", shoppingItem: "Onions", quantity: "½ onion (40 g)" },
      { item: "Red pepper", shoppingItem: "Red peppers", quantity: "⅓ red pepper (25 g)" },
      { item: "Vegetable oil", shoppingItem: "Vegetable oil", quantity: "15 g" },
    ],
    method: [
      "Peel the potato and cut it into small pieces.",
      "Put the potato into a saucepan of fresh water and bring to the boil. Keep the pieces at a steady simmer and test the thickest piece with the tip of a knife. Stop when it goes in without a hard centre, before the potato breaks apart.",
      "Boil until tender, then drain and discard the cooking water. Use a colander and let the cooking water run away completely. Do not return that water to the sauce or mash: draining it away is part of this preparation. Boiling and discarding the water can remove some potassium, but it does not make the portion potassium-free or establish a precise reduction.",
      "While the potato cooks, prepare the onion and red pepper.",
      "Heat the oil in a frying pan over medium heat.",
      "Cook the onion and pepper until softened. Stir around the base and edges of the pan. The vegetables should soften and lose their raw bite; lower the heat if they start to darken before they are tender.",
      "Add the drained potato and cook for 3 minutes.",
      "Add the chicken and cook for 5–7 minutes, turning regularly, until completely cooked through. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food.",
      "Heat everything through and serve immediately."
    ],
    nutrition: {
      calories: "376 kcal",
      protein: "20.8 g",
      carbohydrates: "39.6 g",
      fat: "16.0 g",
      fibre: "4.7 g",
      sodium: "47 mg",
      salt: "0.12 g",
      potassium: "1166 mg",
      phosphate: "230 mg",
    },
    potassium: "High",
    phosphate: "Low",
    purines: "Moderate",
    dietaryNote: "The potatoes are peeled and boiled, and the cooking water is discarded as specified in the method. This preparation is reflected in the recipe calculation; compare the recorded potassium with your own My Diet target.",
    fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1,
  
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: false,
    nutritionSourceNote: "Owner-approved source assumptions D4 are documented in the 16 October 2026 reconciliation workbook.",
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  {
    id: "egg-potato-hash",
    code: "L029", mealFamily: "potato-hash",
    category: "Lunch",
    emoji: "🥔",
    image: "/images/recipes/L029.webp",
    name: "Egg & Potato Hash",
    description: "A hearty potato hash with egg, softened onion and red pepper, bringing together tender vegetables and satisfying potato.",
    cookingTime: "32 minutes",
    calories: "432 kcal",
    protein: "16.6 g",
    equipment: "Knife, Chopping board, Saucepan, Frying pan, Second saucepan",
    ingredients: [
      { item: "Potatoes, peeled", shoppingItem: "Potatoes, peeled", quantity: "1 potato (180 g)" },
      { item: "Egg", shoppingItem: "Egg", quantity: "2" },
      { item: "Onion", shoppingItem: "Onions", quantity: "½ onion (40 g)" },
      { item: "Red pepper", shoppingItem: "Red peppers", quantity: "⅓ red pepper (20 g)" },
      { item: "Vegetable oil", shoppingItem: "Vegetable oil", quantity: "15 g" },
    ],
    method: [
      "Peel the potato and cut it into small pieces.",
      "Put the potato into a saucepan of fresh water and bring to the boil. Keep the pieces at a steady simmer and test the thickest piece with the tip of a knife. Stop when it goes in without a hard centre, before the potato breaks apart.",
      "While the potatoes simmer, put the eggs in a separate saucepan, cover with cold water and bring to the boil. Simmer for 8–10 minutes while the potatoes cook. Cool briefly under cold running water, peel and chop, keeping ready for the final step.",
      "Boil until tender, then drain and discard the cooking water. Use a colander and let the cooking water run away completely. Do not return that water to the sauce or mash: draining it away is part of this preparation. Boiling and discarding the water can remove some potassium, but it does not make the portion potassium-free or establish a precise reduction.",
      "While the potato cooks, prepare the onion and red pepper.",
      "Heat the oil in a frying pan over medium heat.",
      "Cook the onion and pepper until softened. Stir around the base and edges of the pan. The vegetables should soften and lose their raw bite; lower the heat if they start to darken before they are tender.",
      "Add the drained potato and cook for 3 minutes.",
      "Add the chopped cooked egg and toss gently with the potato and vegetables.",
      "Heat everything through and serve immediately."
    ],
    nutrition: {
      calories: "432 kcal",
      protein: "16.6 g",
      carbohydrates: "39.3 g",
      fat: "24.2 g",
      fibre: "4.7 g",
      sodium: "159 mg",
      salt: "0.40 g",
      potassium: "1041 mg",
      phosphate: "254 mg",
    },
    potassium: "High",
    phosphate: "Moderate",
    purines: "Low",
    dietaryNote: "The potatoes are peeled and boiled, and the cooking water is discarded as specified in the method. This preparation is reflected in the recipe calculation; compare the recorded potassium with your own My Diet target.",
    fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1,
  
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    primaryDietCategory: "Vegetarian",
    dietCategories: ["Vegetarian"]
  },
  {
    id: "tuna-potato-salad",
    code: "L030", mealFamily: "potato-salad",
    category: "Lunch",
    emoji: "🥔",
    image: "/images/recipes/L030.webp",
    name: "Tuna Potato Salad",
    description: "Tender potato pieces tossed with tuna mayonnaise, cucumber and crisp lettuce for a cool, creamy salad with plenty of texture.",
    cookingTime: "20 minutes",
    calories: "359 kcal",
    protein: "19.3 g",
    equipment: "Knife, Chopping board, Saucepan, Mixing bowl",
    ingredients: [
      { item: "Potatoes, peeled", shoppingItem: "Potatoes, peeled", quantity: "1 potato (180 g)" },
      { item: "Tuna, canned in brine, drained", shoppingItem: "Tuna, canned in brine, drained", quantity: "60 g" },
      { item: "Mayonnaise", shoppingItem: "Mayonnaise", quantity: "20 g" },
      { item: "Cucumber", shoppingItem: "Cucumber", quantity: "½ cucumber (50 g)" },
      { item: "Iceberg lettuce", shoppingItem: "Iceberg lettuce", quantity: "2 leaves (shredded if preferred)" },
    ],
    method: [
      "Peel the potato and cut it into small pieces.",
      "Put the potato into a saucepan of fresh water and bring to the boil. Keep the pieces at a steady simmer and test the thickest piece with the tip of a knife. Stop when it goes in without a hard centre, before the potato breaks apart.",
      "Boil until tender, then drain and discard the cooking water. Use a colander and let the cooking water run away completely. Do not return that water to the sauce or mash: draining it away is part of this preparation. Boiling and discarding the water can remove some potassium, but it does not make the portion potassium-free or establish a precise reduction.",
      "While the potato cooks, drain the tuna and prepare the cucumber and lettuce.",
      "Allow the potato to cool slightly.",
      "Mix the potato with tuna and mayonnaise, then serve with cucumber and lettuce."
    ],
    nutrition: {
      calories: "359 kcal",
      protein: "19.3 g",
      carbohydrates: "36.6 g",
      fat: "16.1 g",
      fibre: "4.2 g",
      sodium: "209 mg",
      salt: "0.52 g",
      potassium: "1059 mg",
      phosphate: "181 mg",
    },
    potassium: "High",
    phosphate: "Low",
    purines: "Low",
    dietaryNote: "The potatoes are peeled and boiled, and the cooking water is discarded as specified in the method. The tuna is canned in brine, so drain it thoroughly and check the label for salt content.",
    fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1,
  
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  {
    id: "chicken-pepper-omelette",
    code: "L031", mealFamily: "omelette",
    category: "Lunch",
    emoji: "🍳",
    image: "/images/recipes/L031.webp",
    name: "Chicken & Pepper Omelette",
    description: "A savoury omelette filled with tender chicken and sweet red pepper, with softened onion adding extra depth.",
    cookingTime: "18 minutes",
    calories: "365 kcal",
    protein: "33.8 g",
    equipment: "Knife, Chopping board, Frying pan, Mixing bowl, Fork or whisk, Food thermometer",
    ingredients: [
      { item: "Egg", shoppingItem: "Egg", quantity: "3" },
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "60 g (raw)" },
      { item: "Red pepper", shoppingItem: "Red peppers", quantity: "½ red pepper (30 g)" },
      { item: "Onion", shoppingItem: "Onions", quantity: "¼ onion (25 g)" },
      { item: "Vegetable oil", shoppingItem: "Vegetable oil", quantity: "10 g" },
    ],
    method: [
      "Beat the eggs in a bowl and prepare the chicken, onion and pepper.",
      "Heat the oil in a non-stick frying pan over medium heat.",
      "Add the onion and pepper and cook for 4 minutes until softened.",
      "Add the raw chicken and cook for 5–7 minutes until completely cooked through. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food.",
      "Pour the beaten egg into the pan.",
      "Cook until the egg is almost completely set.",
      "Fold the omelette in half and cook for a further 2 minutes.",
      "Check the egg is fully cooked and serve."
    ],
    nutrition: {
      calories: "365 kcal",
      protein: "33.8 g",
      carbohydrates: "3.3 g",
      fat: "24.2 g",
      fibre: "0.7 g",
      sodium: "268 mg",
      salt: "0.67 g",
      potassium: "539 mg",
      phosphate: "413 mg",
    },
    potassium: "Moderate",
    phosphate: "High",
    purines: "Moderate",
    dietaryNote: "Compare the recorded nutrient totals for this serving with your own My Diet targets when planning the rest of the day.",
    fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1,
  
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    nutritionSourceNote: "Owner-approved source assumptions D4 are documented in the 16 October 2026 reconciliation workbook.",
    primaryDietCategory: "Atkins Phase 1",
    dietCategories: ["Atkins Phase 1"]
  },
  {
    id: "mushroom-chive-omelette",
    code: "L032", mealFamily: "omelette",
    category: "Lunch",
    emoji: "🍳",
    image: "/images/recipes/L032.webp",
    name: "Mushroom & Chive Omelette",
    description: "A buttery mushroom omelette finished with fresh chives and served with white toast for a comforting café-style lunch.",
    cookingTime: "15 minutes",
    calories: "351 kcal",
    protein: "22.2 g",
    equipment: "Knife, Chopping board, Frying pan, Mixing bowl, Fork or whisk",
    ingredients: [
      { item: "Egg", shoppingItem: "Egg", quantity: "3" },
      { item: "Mushrooms", shoppingItem: "Mushrooms", quantity: "4 mushrooms (40 g)" },
      { item: "Fresh chives", shoppingItem: "Fresh chives", quantity: "3 g" },
      { item: "Butter, unsalted", shoppingItem: "Unsalted butter", quantity: "10 g" },
      { item: "White bread", shoppingItem: "White bread", quantity: "1 slice (35 g)" },
    ],
    method: [
      "Slice the mushrooms and chop the chives.",
      "Melt the butter in a non-stick frying pan over medium heat. Swirl the pan as the butter melts to coat its base. Keep it from browning or smoking before the next ingredient is added.",
      "Add the mushrooms and cook for 4 minutes until softened.",
      "Beat the eggs and stir in the chives.",
      "Pour the egg mixture into the pan.",
      "Cook until almost set, then fold the omelette in half.",
      "Toast the measured bread.",
      "Check the egg is fully cooked and serve with the toast."
    ],
    nutrition: {
      calories: "351 kcal",
      protein: "22.2 g",
      carbohydrates: "16.4 g",
      fat: "22.4 g",
      fibre: "1.2 g",
      sodium: "373 mg",
      salt: "0.93 g",
      potassium: "428 mg",
      phosphate: "343 mg",
    },
    potassium: "Moderate",
    phosphate: "High",
    purines: "Low",
    dietaryNote: "Compare the recorded nutrient totals for this serving with your own My Diet targets when planning the rest of the day.",
    fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1,
  
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    primaryDietCategory: "Vegetarian",
    dietCategories: ["Vegetarian"]
  },
  {
    id: "egg-pepper-toast",
    code: "L033", mealFamily: "toast",
    category: "Lunch",
    emoji: "🍞",
    image: "/images/recipes/L033.webp",
    name: "Egg & Pepper Toast",
    description: "Buttered toast topped with cooked egg and sweet red pepper for a quick, simple lunch with a little colour.",
    cookingTime: "12 minutes",
    calories: "365 kcal",
    protein: "18.4 g",
    equipment: "Knife, Chopping board, Saucepan, Mixing bowl, Fork or whisk, Toaster, Frying pan",
    ingredients: [
      { item: "Egg", shoppingItem: "Egg", quantity: "2" },
      { item: "White bread", shoppingItem: "White bread", quantity: "2 slices (70 g)" },
      { item: "Red pepper", shoppingItem: "Red peppers", quantity: "½ red pepper (30 g)" },
      { item: "Butter, unsalted", shoppingItem: "Unsalted butter", quantity: "10 g" },
    ],
    method: [
      "Put the bread into the toaster.",
      "Dice the red pepper and beat the egg.",
      "Melt the butter in a non-stick frying pan over medium heat. Swirl the pan as the butter melts to coat its base. Keep it from browning or smoking before the next ingredient is added.",
      "Add the pepper and cook for 3 minutes until softened.",
      "Add the beaten egg and stir gently until fully set.",
      "Place the toast on a plate and spoon over the egg and pepper.",
      "Serve immediately."
    ],
    nutrition: {
      calories: "365 kcal",
      protein: "18.4 g",
      carbohydrates: "33.6 g",
      fat: "18.4 g",
      fibre: "1.8 g",
      sodium: "435 mg",
      salt: "1.09 g",
      potassium: "308 mg",
      phosphate: "255 mg",
    },
    potassium: "Low",
    phosphate: "Moderate",
    purines: "Low",
    dietaryNote: "Egg provides the main protein source. Compare the recorded nutrition with your own My Diet targets.",
    fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1,
  
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    primaryDietCategory: "Vegetarian",
    dietCategories: ["Vegetarian"]
  },
  {
    id: "chicken-pepper-toastie",
    code: "L034", mealFamily: "toastie",
    category: "Lunch",
    cuisine: "British",
    emoji: "🍞",
    image: "/images/recipes/L034.webp",
    name: "Chicken & Pepper Toastie",
    description: "A crisp, buttery toastie filled with tender chicken, sweet red pepper and smooth cream cheese.",
    cookingTime: "20 mins",
    calories: "334 kcal",
    protein: "23.9 g",
    equipment: "Knife, Chopping board, Butter knife, Frying pan, Food thermometer",
    ingredients: [
      { item: "White bread", shoppingItem: "White bread", quantity: "2 slices (70 g)" },
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "70 g (raw)" },
      { item: "Red pepper", shoppingItem: "Red peppers", quantity: "½ red pepper (30 g)" },
      { item: "Cream cheese", shoppingItem: "Cream cheese", quantity: "25 g" },
      { item: "Butter, unsalted", shoppingItem: "Unsalted butter", quantity: "5 g" },
    ],
    method: [
      "Slice the raw chicken breast into thin, even strips. Heat a non-stick frying pan over medium heat and cook for about 6–8 minutes, turning regularly, until cooked through. Check the thickest pieces with a clean food thermometer: they must reach 75°C for at least 30 seconds; continue cooking if needed. Transfer to a clean plate and let the steam subside while preparing the filling.",
      "Prepare the pepper on a clean board. Spread the measured cream cheese over the bread and add the cooked chicken and pepper.",
      "Close the sandwich and spread the measured butter lightly over the outside.",
      "Heat a sandwich press or non-stick frying pan over medium-low heat. Toast for about 2–3 minutes per side until the bread is golden and the cooked filling is steaming hot throughout.",
      "Cut in half and serve immediately."
    ],
    nutrition: {
      calories: "334 kcal",
      protein: "23.9 g",
      carbohydrates: "34.3 g",
      fat: "12.2 g",
      fibre: "1.8 g",
      sodium: "388 mg",
      salt: "0.97 g",
      potassium: "443 mg",
      phosphate: "253 mg",
    },
    potassium: "Moderate",
    phosphate: "Moderate",
    purines: "Moderate",
    dietaryNote: "Chicken contributes protein. Buttering the bread is optional; check the bread label for added phosphates where relevant.",
    fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1,
  
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: false,
    nutritionSourceNote: "Owner-approved source assumptions D4, D2 are documented in the 16 October 2026 reconciliation workbook.",
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  {
    id: "tuna-cucumber-toastie",
    code: "L035", mealFamily: "toastie",
    category: "Lunch",
    cuisine: "British",
    emoji: "🍞",
    image: "/images/recipes/L035.webp",
    name: "Tuna & Cucumber Toastie",
    description: "Golden toasted bread encloses creamy tuna mayonnaise and cucumber for a warm, satisfying toastie with a fresh crunch.",
    cookingTime: "13 minutes",
    calories: "399 kcal",
    protein: "21.1 g",
    equipment: "Knife, Chopping board, Butter knife, Frying pan, Mixing bowl",
    ingredients: [
      { item: "White bread", shoppingItem: "White bread", quantity: "2 slices (70 g)" },
      { item: "Tuna, canned in brine, drained", shoppingItem: "Tuna, canned in brine, drained", quantity: "60 g" },
      { item: "Cucumber", shoppingItem: "Cucumber", quantity: "⅓ cucumber (40 g)" },
      { item: "Mayonnaise", shoppingItem: "Mayonnaise", quantity: "20 g" },
      { item: "Butter, unsalted", shoppingItem: "Unsalted butter", quantity: "5 g" },
    ],
    method: [
      "Drain the tuna thoroughly and mix with the mayonnaise.",
      "Spread the tuna mixture over the bread and add the cucumber.",
      "Butter the outside of the sandwich lightly.",
      "Heat a sandwich press or non-stick frying pan.",
      "Toast the sandwich until the bread is golden and the filling is hot.",
      "Remove, cut in half and serve."
    ],
    nutrition: {
      calories: "399 kcal",
      protein: "21.1 g",
      carbohydrates: "33.3 g",
      fat: "21.0 g",
      fibre: "2.0 g",
      sodium: "484 mg",
      salt: "1.21 g",
      potassium: "298 mg",
      phosphate: "180 mg",
    },
    potassium: "Low",
    phosphate: "Low",
    purines: "Low",
    dietaryNote: "The tuna is canned in brine, so drain it thoroughly and check the product label for salt content. Buttering the bread is optional.",
    fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1,
  
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: false,
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  {
    id: "chicken-apple-sandwich",
    code: "L036", mealFamily: "sandwich",
    category: "Lunch",
    cuisine: "British",
    emoji: "🥪",
    image: "/images/recipes/L036.webp",
    name: "Chicken & Apple Sandwich",
    description: "Tender chicken, crisp apple and iceberg lettuce pair with creamy mayonnaise for a fresh sandwich with a subtle sweet crunch.",
    cookingTime: "15 minutes",
    calories: "392 kcal",
    protein: "23.1 g",
    equipment: "Knife, Chopping board, Butter knife, Frying pan, Food thermometer",
    ingredients: [
      { item: "White bread", shoppingItem: "White bread", quantity: "2 slices (70 g)" },
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "70 g (raw)" },
      { item: "Apple", shoppingItem: "Apples", quantity: "½ apple (50 g)" },
      { item: "Mayonnaise", shoppingItem: "Mayonnaise", quantity: "20 g" },
      { item: "Iceberg lettuce", shoppingItem: "Iceberg lettuce", quantity: "2 leaves (shredded if preferred)" },
    ],
    method: [
      "Wash and dry the lettuce. Core and thinly slice the apple. Cut the chicken breast into thin strips.",
      "Heat a non-stick frying pan over medium heat and cook the chicken for 6–8 minutes, turning regularly, until completely cooked through. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food. Remove from the pan and allow to rest briefly.",
      "Spread the measured mayonnaise evenly over the bread.",
      "Arrange the cooked chicken, apple and lettuce over the bread. Make sure washed salad leaves are dry before assembling, so they do not make the bread or filling soggy. Spread the filling evenly across the portion and serve soon after assembling.",
      "Close the sandwich, cut in half if desired and serve immediately."
    ],
    nutrition: {
      calories: "392 kcal",
      protein: "23.1 g",
      carbohydrates: "38.8 g",
      fat: "17.1 g",
      fibre: "2.0 g",
      sodium: "351 mg",
      salt: "0.88 g",
      potassium: "450 mg",
      phosphate: "230 mg",
    },
    potassium: "Moderate",
    phosphate: "Low",
    purines: "Moderate",
    dietaryNote: "Compare the recorded nutrient totals for this serving with your own My Diet targets when planning the rest of the day.",
    fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1,
  
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    nutritionSourceNote: "Owner-approved source assumptions D4 are documented in the 16 October 2026 reconciliation workbook.",
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  {
    id: "egg-cucumber-sandwich",
    code: "L037", mealFamily: "sandwich",
    category: "Lunch",
    cuisine: "British",
    emoji: "🥪",
    image: "/images/recipes/L037.webp",
    name: "Egg & Cucumber Sandwich",
    description: "Sliced egg and cool cucumber bring creamy and crisp textures together in soft bread with a smooth mayonnaise spread.",
    cookingTime: "16 minutes",
    calories: "441 kcal",
    protein: "20.4 g",
    equipment: "Knife, Chopping board, Butter knife, Saucepan, Lid or bowl cover",
    ingredients: [
      { item: "White bread", shoppingItem: "White bread", quantity: "2 slices (70 g)" },
      { item: "Egg", shoppingItem: "Egg", quantity: "2" },
      { item: "Cucumber", shoppingItem: "Cucumber", quantity: "½ cucumber (50 g)" },
      { item: "Mayonnaise", shoppingItem: "Mayonnaise", quantity: "20 g" },
    ],
    method: [
      "Place the eggs in a saucepan and cover with cold water.",
      "Bring the water to a boil.",
      "Cook the eggs for 8–10 minutes.",
      "Drain, cool under cold running water and peel.",
      "Slice the eggs and prepare the cucumber.",
      "Spread the mayonnaise over the bread and add the egg and cucumber.",
      "Close the sandwich, cut in half if desired and serve."
    ],
    nutrition: {
      calories: "441 kcal",
      protein: "20.4 g",
      carbohydrates: "33.4 g",
      fat: "26.0 g",
      fibre: "2.1 g",
      sodium: "458 mg",
      salt: "1.15 g",
      potassium: "316 mg",
      phosphate: "284 mg",
    },
    potassium: "Low",
    phosphate: "Moderate",
    purines: "Low",
    dietaryNote: "Egg provides the main protein source. Compare the recorded nutrition with your own My Diet targets.",
    fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1,
  
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    primaryDietCategory: "Vegetarian",
    dietCategories: ["Vegetarian"]
  },
  {
    id: "chicken-cream-cheese-wrap",
    code: "L038", mealFamily: "wrap",
    category: "Lunch",
    emoji: "🌯",
    image: "/images/recipes/L038.webp",
    name: "Chicken & Cream Cheese Wrap",
    description: "Tender chicken, cool cucumber and crisp lettuce are wrapped with smooth cream cheese for a fresh, creamy bite.",
    cookingTime: "20 mins",
    calories: "317 kcal",
    protein: "23.5 g",
    equipment: "Knife, Chopping board, Butter knife, Frying pan, Food thermometer",
    ingredients: [
      { item: "White tortilla wrap", shoppingItem: "White Tortilla Wraps", quantity: "60 g" },
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "70 g (raw)" },
      { item: "Cream cheese", shoppingItem: "Cream cheese", quantity: "25 g" },
      { item: "Cucumber", shoppingItem: "Cucumber", quantity: "½ cucumber (50 g)" },
      { item: "Iceberg lettuce", shoppingItem: "Iceberg lettuce", quantity: "2 leaves (shredded if preferred)" },
    ],
    method: [
      "Slice the raw chicken breast into thin, even strips. Heat a non-stick frying pan over medium heat and cook for about 6–8 minutes, turning regularly, until cooked through. Check the thickest pieces with a clean food thermometer: they must reach 75°C for at least 30 seconds; continue cooking if needed. Transfer to a clean plate and let the steam subside while preparing the filling.",
      "Using a clean board and knife, wash, dry and prepare the listed salad vegetables. Keep them separate from raw chicken and its utensils.",
      "Spread the measured cream cheese over the tortilla.",
      "Add the cooked chicken and prepared vegetables down the centre.",
      "Fold in the sides and roll the tortilla tightly. Keep the filling in a compact strip rather than spreading it to every edge. Fold the sides in first where the recipe calls for a closed wrap, then roll firmly without squeezing the filling out.",
      "Cut the wrap in half if desired and serve immediately."
    ],
    nutrition: {
      calories: "317 kcal",
      protein: "23.5 g",
      carbohydrates: "34.0 g",
      fat: "10.6 g",
      fibre: "2.8 g",
      sodium: "484 mg",
      salt: "1.21 g",
      potassium: "479 mg",
      phosphate: "321 mg",
    },
    potassium: "Moderate",
    phosphate: "Moderate",
    purines: "Moderate",
    dietaryNote: "Compare the recorded nutrient totals for this serving with your own My Diet targets when planning the rest of the day.",
    fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1,
  
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    nutritionSourceNote: "Owner-approved source assumptions D4, D2 are documented in the 16 October 2026 reconciliation workbook.",
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  {
    id: "tuna-cream-cheese-wrap",
    code: "L039", mealFamily: "wrap",
    category: "Lunch",
    emoji: "🌯",
    image: "/images/recipes/L039.webp",
    name: "Tuna & Cream Cheese Wrap",
    description: "Flaked tuna and smooth cream cheese fill a soft tortilla, with cool cucumber adding freshness and crunch.",
    cookingTime: "15 minutes",
    calories: "306 kcal",
    protein: "21.4 g",
    equipment: "Knife, Chopping board, Butter knife",
    ingredients: [
      { item: "White tortilla wrap", shoppingItem: "White Tortilla Wraps", quantity: "60 g" },
      { item: "Tuna, canned in brine, drained", shoppingItem: "Tuna, canned in brine, drained", quantity: "60 g" },
      { item: "Cream cheese", shoppingItem: "Cream cheese", quantity: "25 g" },
      { item: "Cucumber", shoppingItem: "Cucumber", quantity: "½ cucumber (50 g)" },
    ],
    method: [
      "Drain the tuna thoroughly and prepare the cucumber.",
      "Spread the cream cheese over the centre of the tortilla.",
      "Add the tuna and cucumber.",
      "Fold in the sides and roll the tortilla tightly. Keep the filling in a compact strip rather than spreading it to every edge. Fold the sides in first where the recipe calls for a closed wrap, then roll firmly without squeezing the filling out.",
      "Close the sandwich, cut in half if desired and serve immediately."
    ],
    nutrition: {
      calories: "306 kcal",
      protein: "21.4 g",
      carbohydrates: "33.7 g",
      fat: "10.4 g",
      fibre: "2.5 g",
      sodium: "616 mg",
      salt: "1.54 g",
      potassium: "314 mg",
      phosphate: "266 mg",
    },
    potassium: "Low",
    phosphate: "Moderate",
    purines: "Low",
    dietaryNote: "The tuna is canned in brine, so drain it thoroughly and check the product label for salt content. Cream cheese can vary in phosphate additives by brand.",
    fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1,
  
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: false,
    nutritionSourceNote: "Owner-approved source assumptions D2 are documented in the 16 October 2026 reconciliation workbook.",
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  {
    id: "chicken-onion-pasta-salad",
    code: "L040", mealFamily: "pasta-salad",
    category: "Lunch",
    emoji: "🍝",
    image: "/images/recipes/L040.webp",
    name: "Chicken & Onion Pasta Salad",
    description: "Pasta salad with tender chicken, onion and cucumber, lightly coated in mayonnaise for a creamy, satisfying lunch.",
    cookingTime: "20 minutes",
    calories: "485 kcal",
    protein: "26.2 g",
    equipment: "Knife, Chopping board, Saucepan, Frying pan, Mixing bowl, Food thermometer, Colander or sieve",
    ingredients: [
      { item: "Pasta", shoppingItem: "Pasta", quantity: "75 g (dry)" },
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "70 g (raw)" },
      { item: "Onion", shoppingItem: "Onions", quantity: "½ onion (30 g)" },
      { item: "Cucumber", shoppingItem: "Cucumber", quantity: "⅓ cucumber (40 g)" },
      { item: "Mayonnaise", shoppingItem: "Mayonnaise", quantity: "20 g" },
    ],
    method: [
      "Bring a saucepan of water to a boil and cook the measured dry pasta according to the packet instructions. Separate the pasta or noodles as they soften so they do not stick together. Check the texture towards the end of the cooking time; it should be tender with no chalky centre.",
      "While the pasta cooks, finely dice the onion and cucumber.",
      "Drain the pasta thoroughly and allow it to cool for a few minutes.",
      "Cook the chicken in a non-stick frying pan over medium heat for 6–8 minutes, turning regularly, until completely cooked through. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food. Allow it to rest briefly, then slice.",
      "Stir the cooked chicken, onion and cucumber through the pasta.",
      "Add the mayonnaise and mix until evenly coated.",
      "Serve warm or chill before serving."
    ],
    nutrition: {
      calories: "485 kcal",
      protein: "26.2 g",
      carbohydrates: "60.1 g",
      fat: "17.2 g",
      fibre: "0.9 g",
      sodium: "72 mg",
      salt: "0.18 g",
      potassium: "538 mg",
      phosphate: "305 mg",
    },
    potassium: "Moderate",
    phosphate: "Moderate",
    purines: "Moderate",
    dietaryNote: "Compare the recorded nutrient totals for this serving with your own My Diet targets when planning the rest of the day.",
    fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1,
  
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: false,
    nutritionSourceNote: "Owner-approved source assumptions D4 are documented in the 16 October 2026 reconciliation workbook.",
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },

  { id: "chicken-leek-couscous-bowl", code: "L041", mealFamily: "couscous-bowl", category: "Lunch", emoji: "🥗", image: "/images/recipes/L041.webp", name: "Chicken & Leek Couscous Bowl", description: "Fluffy couscous tossed with tender chicken, soft leek and sweet carrot, finished with lemon and parsley for a bright, savoury bowl.", cookingTime: "25 minutes", calories: "380 kcal", protein: "26.9 g", equipment: "Saucepan, frying pan, colander, knife, chopping board, Food thermometer", ingredients: [ { item: "Chicken, meat, average, raw", shoppingItem: "Chicken breast", quantity: "100 g (raw)" }, { item: "Couscous, plain, raw", shoppingItem: "Couscous", quantity: "35 g" }, { item: "Leeks, boiled in unsalted water", shoppingItem: "Leek", quantity: "¼ leek (20 g)" }, { item: "Carrots, old, boiled in unsalted water", shoppingItem: "Carrots", quantity: "½ carrot (20 g)" }, { item: "Oil, olive", shoppingItem: "Olive oil", quantity: "15 g" }, { item: "Lemon juice, fresh", shoppingItem: "Lemon juice", quantity: "10 g" }, { item: "Parsley, dried", shoppingItem: "Dried parsley", quantity: "¼ tsp" } ], method: [
      "Prepare the couscous according to the packet instructions using unsalted water.",
      "Slice the chicken and cook in half the olive oil until completely cooked through. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food.",
      "Boil the leek and carrot in unsalted water until tender, then drain well.",
      "Fluff the couscous and combine with the vegetables.",
      "Top with the chicken and finish with the remaining olive oil, lemon juice and parsley.",
      "Serve immediately."
    ], nutrition: { calories: "380 kcal", protein: "26.9 g", carbohydrates: "29.6 g", fat: "18.0 g", fibre: "2.2 g", sodium: "85 mg", salt: "0.21 g", potassium: "566 mg", phosphate: "252 mg" }, potassium: "High", phosphate: "Moderate", purines: "Moderate", dietaryNote: "This recipe is calculated for one serving using CoFID 2021 ingredient values. Compare the recorded nutrient totals with your own My Diet targets.", fluidMl: 10, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1 ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  { id: "turkey-cucumber-pitta", code: "L042", mealFamily: "pitta", category: "Lunch", emoji: "🥙", image: "/images/recipes/L042.webp", name: "Turkey & Cucumber Pitta", description: "Juicy turkey breast, crisp cucumber and iceberg lettuce tucked into a soft white pitta with creamy mayonnaise and a hint of parsley.", cookingTime: "12 minutes", calories: "437 kcal", protein: "30.7 g", equipment: "Knife, chopping board, frying pan, Food thermometer", ingredients: [ { item: "Turkey, light meat, raw", shoppingItem: "Turkey breast", quantity: "100 g (raw)" }, { item: "Bread, pitta, white", shoppingItem: "White pitta bread", quantity: "1 pitta (60 g)" }, { item: "Cucumber, raw, flesh and skin", shoppingItem: "Cucumber", quantity: "⅓ cucumber (40 g)" }, { item: "Lettuce, average, raw", shoppingItem: "Iceberg lettuce", quantity: "2 leaves (15 g)" }, { item: "Mayonnaise, standard, retail", shoppingItem: "Mayonnaise", quantity: "25 g" }, { item: "Parsley, dried", shoppingItem: "Dried parsley", quantity: "¼ tsp" } ], method: [
      "Cook the turkey in a non-stick frying pan until completely cooked through. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food.",
      "Slice the turkey and prepare the cucumber and lettuce.",
      "Warm the pitta briefly and split it open.",
      "Spread with mayonnaise and add the turkey and salad.",
      "Finish with parsley and serve."
    ], nutrition: { calories: "437 kcal", protein: "30.7 g", carbohydrates: "34.4 g", fat: "20.5 g", fibre: "1.9 g", sodium: "326 mg", salt: "0.81 g", potassium: "569 mg", phosphate: "304 mg" }, potassium: "High", phosphate: "High", purines: "Moderate", dietaryNote: "This recipe is calculated for one serving using CoFID 2021 ingredient values. Compare the recorded nutrient totals with your own My Diet targets.", fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1 ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  { id: "tuna-sweetcorn-pasta-salad", code: "L043", mealFamily: "pasta-salad", category: "Lunch", emoji: "🍝", image: "/images/recipes/L043.webp", name: "Tuna & Sweetcorn Pasta Salad", description: "A colourful pasta salad with flaky tuna, sweetcorn and cucumber, brought together with a creamy mayonnaise dressing.", cookingTime: "20 minutes", calories: "463 kcal", protein: "29.4 g", equipment: "Saucepan, colander, bowl, knife", ingredients: [ { item: "Pasta, white, dried, raw", shoppingItem: "White pasta", quantity: "50 g" }, { item: "Tuna, canned in brine, drained", shoppingItem: "Tuna, canned in brine, drained", quantity: "90 g" }, { item: "Sweetcorn kernels, canned in water, drained", shoppingItem: "Sweetcorn kernels", quantity: "20 g" }, { item: "Cucumber, raw, flesh and skin", shoppingItem: "Cucumber", quantity: "⅓ cucumber (30 g)" }, { item: "Lettuce, average, raw", shoppingItem: "Iceberg lettuce", quantity: "2 leaves (20 g)" }, { item: "Mayonnaise, standard, retail", shoppingItem: "Mayonnaise", quantity: "25 g" } ], method: [
      "Cook the pasta in unsalted water according to the packet instructions. Separate the pasta or noodles as they soften so they do not stick together. Check the texture towards the end of the cooking time; it should be tender with no chalky centre.",
      "Drain the pasta thoroughly and allow it to cool.",
      "Drain the tuna very thoroughly and prepare the cucumber.",
      "Mix the pasta, tuna, sweetcorn and cucumber.",
      "Stir through the mayonnaise.",
      "Serve warm or chilled."
    ], nutrition: { calories: "463 kcal", protein: "29.4 g", carbohydrates: "41.8 g", fat: "20.9 g", fibre: "1.1 g", sodium: "301 mg", salt: "0.75 g", potassium: "447 mg", phosphate: "266 mg" }, potassium: "Moderate", phosphate: "Moderate", purines: "Moderate", dietaryNote: "This recipe is calculated for one serving using CoFID 2021 ingredient values. The tuna is canned in brine, so drain it thoroughly and check the label for salt content.", fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1 ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: false,
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  { id: "egg-leek-rice-bowl", code: "L044", mealFamily: "rice-bowl", category: "Lunch", emoji: "🍳", image: "/images/recipes/L044.webp", name: "Egg & Leek Rice Bowl", description: "Fluffy rice tossed with egg, gently softened leek and onion, finished with fresh chives for a comforting savoury bowl.", cookingTime: "25 minutes", calories: "488 kcal", protein: "18.0 g", equipment: "Saucepan, frying pan, colander, knife, Mixing bowl, Fork or whisk", ingredients: [ { item: "Rice, white, basmati, raw", shoppingItem: "White rice", quantity: "60 g (dry)" }, { item: "Eggs, chicken, whole, raw", shoppingItem: "Egg", quantity: "2" }, { item: "Leeks, raw", shoppingItem: "Leek", quantity: "¼ leek (20 g)" }, { item: "Onions, raw", shoppingItem: "Onions", quantity: "½ onion (20 g)" }, { item: "Oil, olive", shoppingItem: "Olive oil", quantity: "15 g" }, { item: "Chives, fresh", shoppingItem: "Fresh chives", quantity: "1 tsp" } ], method: [
      "Cook the rice according to the packet instructions using unsalted water. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork.",
      "Slice the leek and onion and cook gently in half the oil until soft.",
      "Beat the egg and cook gently in the pan until fully set.",
      "Add the cooked rice and remaining oil and stir through.",
      "Finish with fresh chives.",
      "Serve immediately."
    ], nutrition: { calories: "488 kcal", protein: "18.0 g", carbohydrates: "52.7 g", fat: "24.4 g", fibre: "1.7 g", sodium: "155 mg", salt: "0.39 g", potassium: "268 mg", phosphate: "249 mg" }, potassium: "Low", phosphate: "Moderate", purines: "Low", dietaryNote: "This recipe is calculated for one serving using CoFID 2021 ingredient values. Compare the recorded nutrient totals with your own My Diet targets.", fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1 ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  { id: "chicken-carrot-noodle-salad", code: "L045", mealFamily: "noodle-salad", category: "Lunch", emoji: "🍜", image: "/images/recipes/L045.webp", name: "Chicken & Carrot Noodle Salad", description: "Rice noodles, tender chicken, carrot and cucumber are tossed with lemon, ginger and olive oil for a fresh, zesty noodle salad.", cookingTime: "20 minutes", calories: "436 kcal", protein: "25.7 g", equipment: "Saucepan, colander, frying pan, knife, Food thermometer", ingredients: [ { item: "Noodles, rice, fine, dried, boiled in unsalted water", shoppingItem: "Rice rice noodles", quantity: "150 g (cooked)" }, { item: "Chicken, meat, average, raw", shoppingItem: "Chicken breast", quantity: "100 g (raw)" }, { item: "Carrots, old, boiled in unsalted water", shoppingItem: "Carrots", quantity: "½ carrot (30 g)" }, { item: "Cucumber, raw, flesh and skin", shoppingItem: "Cucumber", quantity: "⅓ cucumber (30 g)" }, { item: "Oil, olive", shoppingItem: "Olive oil", quantity: "20 g" }, { item: "Lemon juice, fresh", shoppingItem: "Lemon juice", quantity: "10 g" }, { item: "Ginger, ground", shoppingItem: "Ground ginger", quantity: "¼ tsp" } ], method: [
      "Cook the rice rice noodles according to the packet instructions using unsalted water. Separate the pasta or noodles as they soften so they do not stick together. Check the texture towards the end of the cooking time; it should be tender with no chalky centre.",
      "Cook the chicken in a non-stick frying pan until completely cooked through. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food.",
      "Boil the carrot until tender and drain well.",
      "Drain the rice rice noodles thoroughly and rinse briefly if serving chilled.",
      "Toss the rice rice noodles with carrot, cucumber, chicken, oil, lemon and ginger.",
      "Serve."
    ], nutrition: { calories: "436 kcal", protein: "25.7 g", carbohydrates: "34.6 g", fat: "22.7 g", fibre: "3.1 g", sodium: "93 mg", salt: "0.23 g", potassium: "499 mg", phosphate: "202 mg" }, potassium: "Moderate", phosphate: "Moderate", purines: "Moderate", dietaryNote: "This recipe is calculated for one serving using CoFID 2021 ingredient values. Compare the recorded nutrient totals with your own My Diet targets.", fluidMl: 10, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1 ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  { id: "turkey-apple-couscous-salad", code: "L046", mealFamily: "couscous-salad", category: "Lunch", emoji: "🍎", image: "/images/recipes/L046.webp", name: "Turkey & Apple Couscous Salad", description: "Tender turkey and fluffy couscous meet crisp apple and cucumber, with lemon and parsley adding a fresh, herby lift.", cookingTime: "20 minutes", calories: "433 kcal", protein: "29.1 g", equipment: "Saucepan, frying pan, knife, bowl, Food thermometer", ingredients: [ { item: "Turkey, light meat, raw", shoppingItem: "Turkey breast", quantity: "100 g (raw)" }, { item: "Couscous, plain, raw", shoppingItem: "Couscous", quantity: "35 g" }, { item: "Apples, eating, raw, flesh and skin", shoppingItem: "Apples", quantity: "⅓ apple (30 g)" }, { item: "Cucumber, raw, flesh and skin", shoppingItem: "Cucumber", quantity: "⅓ cucumber (30 g)" }, { item: "Oil, olive", shoppingItem: "Olive oil", quantity: "20 g" }, { item: "Lemon juice, fresh", shoppingItem: "Lemon juice", quantity: "10 g" }, { item: "Parsley, fresh", shoppingItem: "Fresh parsley", quantity: "1 sprig" } ], method: [
      "Prepare the couscous according to the packet instructions using unsalted water.",
      "Cook the turkey in a non-stick pan until completely cooked through. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food.",
      "Dice the apple and cucumber. Remove any inedible core, stalk or peel specified in the ingredient list before weighing.",
      "Fluff the couscous and stir through the apple and cucumber.",
      "Slice the turkey and add to the couscous.",
      "Finish with olive oil, lemon and parsley and serve."
    ], nutrition: { calories: "433 kcal", protein: "29.1 g", carbohydrates: "31.7 g", fat: "21.9 g", fibre: "1.9 g", sodium: "53 mg", salt: "0.13 g", potassium: "558 mg", phosphate: "324 mg" }, potassium: "Moderate", phosphate: "High", purines: "Moderate", dietaryNote: "This recipe is calculated for one serving using CoFID 2021 ingredient values. Compare the recorded nutrient totals with your own My Diet targets.", fluidMl: 10, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1 ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  { id: "cod-cucumber-pasta-salad", code: "L047", mealFamily: "pasta-salad", category: "Lunch", emoji: "🐟", image: "/images/recipes/L047.webp", name: "Cod & Cucumber Pasta Salad", description: "Flaky baked cod and pasta tossed with cucumber and lettuce, finished with lemon, parsley and olive oil for a bright, fresh salad.", cookingTime: "25 minutes", calories: "443 kcal", protein: "33.7 g", equipment: "Oven, baking tray, saucepan, colander, knife", ingredients: [ { item: "Cod, flesh only, baked", shoppingItem: "Cod fillet", quantity: "120 g" }, { item: "Pasta, white, dried, raw", shoppingItem: "White pasta", quantity: "40 g" }, { item: "Cucumber, raw, flesh and skin", shoppingItem: "Cucumber", quantity: "¼ cucumber (20 g)" }, { item: "Lettuce, average, raw", shoppingItem: "Iceberg lettuce", quantity: "2 leaves (20 g)" }, { item: "Oil, olive", shoppingItem: "Olive oil", quantity: "20 g" }, { item: "Lemon juice, fresh", shoppingItem: "Lemon juice", quantity: "10 g" }, { item: "Parsley, dried", shoppingItem: "Dried parsley", quantity: "¼ tsp" } ], method: [
      "The listed 120 g of cod is the cooked edible weight. Cook a plain portion as directed below, then weigh out 120 g after cooking for this meal; it is not a 120 g raw starting portion. Keep any extra cooked food separate from this serving.",
      "Heat the oven to 200°C (180°C fan) and bake the cod until cooked through. Check the centre as well as the surface; a browned top alone does not show that the inside is cooked. Check the thickest part: it should be opaque, steaming hot and separate readily into flakes with a fork. Continue cooking if the centre is still cool or translucent. Weigh the cooked cod now and use the listed 120 g portion.",
      "Cook the pasta in unsalted water according to the packet instructions. Separate the pasta or noodles as they soften so they do not stick together. Check the texture towards the end of the cooking time; it should be tender with no chalky centre.",
      "Drain the pasta thoroughly and allow to cool slightly.",
      "Flake the cod and combine with the pasta, cucumber and lettuce.",
      "Add the olive oil, lemon juice and parsley.",
      "Serve."
    ], nutrition: { calories: "443 kcal", protein: "33.7 g", carbohydrates: "30.9 g", fat: "21.4 g", fibre: "0.4 g", sodium: "113 mg", salt: "0.28 g", potassium: "627 mg", phosphate: "309 mg" }, potassium: "High", phosphate: "High", purines: "Moderate", dietaryNote: "This recipe is calculated for one serving using CoFID 2021 ingredient values. Compare the recorded nutrient totals with your own My Diet targets.", fluidMl: 10, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1 ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  { id: "chicken-leek-toasted-pitta", code: "L048", mealFamily: "pitta", category: "Lunch", emoji: "🥙", image: "/images/recipes/L048.webp", name: "Chicken & Leek Toasted Pitta", description: "Toasted white pitta filled with tender chicken, softened leek and creamy chive mayonnaise for a warm, savoury lunch.", cookingTime: "18 minutes", calories: "410 kcal", protein: "27.4 g", equipment: "Frying pan, knife, chopping board, toaster, Mixing bowl, Food thermometer", ingredients: [ { item: "Chicken, meat, average, raw", shoppingItem: "Chicken breast", quantity: "100 g (raw)" }, { item: "Bread, pitta, white", shoppingItem: "White pitta bread", quantity: "1 pitta (50 g)" }, { item: "Leeks, boiled in unsalted water", shoppingItem: "Leek", quantity: "¼ leek (20 g)" }, { item: "Mayonnaise, standard, retail", shoppingItem: "Mayonnaise", quantity: "25 g" }, { item: "Chives, fresh", shoppingItem: "Fresh chives", quantity: "1 tsp" } ], method: [
      "Slice the chicken and leek.",
      "Cook the chicken in a non-stick pan until completely cooked through. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food.",
      "Add the leek and cook until soft.",
      "Warm the pitta and mix the filling with mayonnaise and chives.",
      "Fill the pitta.",
      "Serve immediately."
    ], nutrition: { calories: "410 kcal", protein: "27.4 g", carbohydrates: "28.7 g", fat: "21.5 g", fibre: "1.6 g", sodium: "310 mg", salt: "0.77 g", potassium: "507 mg", phosphate: "216 mg" }, potassium: "Moderate", phosphate: "Moderate", purines: "Moderate", dietaryNote: "This recipe is calculated for one serving using CoFID 2021 ingredient values. Compare the recorded nutrient totals with your own My Diet targets.", fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1 ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  // International recipes: nutrition and ingredient quantities are for one serving.
      {
    "id": "chicken-tikka-naan-style-flatbread",
    "code": "L049",
    "category": "Lunch",
    "mealFamily": "flatbread",
    "cuisine": "indian",
    "emoji": "🍽️",
    "image": "/images/recipes/L049.webp",
    "name": "Chicken tikka naan-style flatbread",
    "description": "Yoghurt-marinated chicken skewers with warm naan-style flatbread, charred onion and fresh cucumber.",
    "cookingTime": "115 mins",
    "calories": "706 kcal",
    "protein": "44.2 g",
    "equipment": "0.01 g scales, mixing bowls, knife, board, rolling pin, heavy frying pan, oven tray, metal skewers, clean probe thermometer, Saucepan, Lid or bowl cover, Grill",
    "ingredients": [
      {
        "item": "Skinless chicken breast",
        "shoppingItem": "Skinless chicken breast",
        "quantity": "120 g (raw edible input; tikka)"
      },
      {
        "item": "Plain whole-milk yoghurt",
        "shoppingItem": "Plain whole-milk yoghurt",
        "quantity": "30 g (raw edible input; tikka)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "40 g (raw edible input; tikka)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "6 g (raw edible input; tikka)"
      },
      {
        "item": "Fresh ginger",
        "shoppingItem": "Fresh ginger",
        "quantity": "6 g (raw edible input; tikka)"
      },
      {
        "item": "Fresh lemon juice",
        "shoppingItem": "Fresh lemon juice",
        "quantity": "15 g (raw edible input; tikka)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "10 g (raw edible input; tikka)"
      },
      {
        "item": "Cumin seeds, ground",
        "shoppingItem": "Cumin seeds, ground",
        "quantity": "0.6 g (raw edible input; tikka)"
      },
      {
        "item": "Coriander seeds, ground",
        "shoppingItem": "Coriander seeds, ground",
        "quantity": "0.8 g (raw edible input; tikka)"
      },
      {
        "item": "Paprika",
        "shoppingItem": "Paprika",
        "quantity": "0.8 g (raw edible input; tikka)"
      },
      {
        "item": "Cayenne chilli powder",
        "shoppingItem": "Cayenne chilli powder",
        "quantity": "0.2 g (raw edible input; tikka)"
      },
      {
        "item": "Ground turmeric",
        "shoppingItem": "Ground turmeric",
        "quantity": "0.3 g (raw edible input; tikka)"
      },
      {
        "item": "Ground cinnamon",
        "shoppingItem": "Ground cinnamon",
        "quantity": "0.1 g (raw edible input; tikka)"
      },
      {
        "item": "Ground cardamom",
        "shoppingItem": "Ground cardamom",
        "quantity": "0.1 g (raw edible input; tikka)"
      },
      {
        "item": "Ground cloves",
        "shoppingItem": "Ground cloves",
        "quantity": "0.05 g (raw edible input; tikka)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.3 g (raw edible input; tikka)"
      },
      {
        "item": "Strong white bread flour",
        "shoppingItem": "Strong white bread flour",
        "quantity": "90 g (dry flour; naan-style bread)"
      },
      {
        "item": "Plain whole-milk yoghurt",
        "shoppingItem": "Plain whole-milk yoghurt",
        "quantity": "20 g (raw edible input; naan-style bread)"
      },
      {
        "item": "Active dry yeast",
        "shoppingItem": "Active dry yeast",
        "quantity": "1 g (dry; naan-style bread)"
      },
      {
        "item": "White sugar",
        "shoppingItem": "White sugar",
        "quantity": "2 g (raw edible input; naan-style bread)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "40 g (weighed water; naan-style bread)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "5 g (raw edible input; naan-style bread)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.3 g (raw edible input; naan-style bread)"
      },
      {
        "item": "Unsalted butter",
        "shoppingItem": "Unsalted butter",
        "quantity": "5 g (raw edible input; bread finish)"
      },
      {
        "item": "Cucumber",
        "shoppingItem": "Cucumber",
        "quantity": "50 g (raw edible input; salad)"
      },
      {
        "item": "Fresh coriander",
        "shoppingItem": "Fresh coriander",
        "quantity": "4 g (raw edible input; salad)"
      }
    ],
    "method": [
      "Do not wash raw chicken. Weigh every ingredient, including the spices. Cut it into approximately 25 mm pieces; cut the onion into wedges. Mix the tikka yoghurt, garlic, ginger, lemon, 10 g oil, listed spices and 0.3 g salt. Coat chicken and onion in a covered bowl and refrigerate for 60 minutes.",
      "Cover and keep chilled while you prepare the other parts of the recipe. Keep raw meat and its utensils separate from ready-to-eat salad and cooked food.",
      "While the chicken marinates, mix flour, yeast, sugar and 0.3 g bread salt. Add 20 g yoghurt, 40 g weighed lukewarm water and 5 g oil. Knead 6-8 minutes into a soft dough. Scrape dry patches from the bowl into the mixture and work them in with your hands. Cover and prove for about 60 minutes at ordinary warm room temperature, until visibly puffy.",
      "Cover the bowl so the surface cannot dry out. Judge readiness by the dough becoming visibly puffy, because a cooler kitchen may make the rise slower than the stated guide time. Avoid extra flour; use the measured oil or baking paper if sticking.",
      "Preheat the grill to medium-high and place a rimmed tray below the skewers to catch juices. Roll the dough into one flatbread approximately 20 cm across and 4-5 mm thick. If the dough has not puffed, leave it covered for another 15–30 minutes before rolling.",
      "Thread chicken and onion loosely onto metal skewers. Spread all remaining marinade over them. Grill for approximately 18-25 minutes, turning several times, until browned. Check the thickest chicken reaches 75 C for at least 30 seconds; extend cooking as needed.",
      "In parallel, heat the dry heavy frying pan over medium-high heat. Cook each bread for about 2-3 minutes on the first side and 1-2 on the other, with a brief lid-on period if needed to cook its centre. Look for cooked, airy crumb and brown patches. Brush the flatbread with all the measured butter.",
      "Transfer skewer food to a plate. Put collected marinade and juices in a small pan; bring to a bubbling simmer and heat thoroughly before serving. Look for small, gentle bubbles rather than a rolling boil. Stir along the bottom when needed to prevent sticking, and keep the heat low enough for the food to cook evenly. Serve all chicken, onion, bread, butter, cucumber, coriander and cooked juices on one plate.",
      "Check more than one piece if their sizes differ, and use clean utensils for the cooked food."
    ],
    "nutrition": {
      "calories": "706 kcal",
      "protein": "44.2 g",
      "carbohydrates": "76.8 g",
      "fat": "23.9 g",
      "fibre": "5.8 g",
      "sodium": "359 mg",
      "potassium": "1045 mg",
      "phosphate": "525 mg",
      "salt": "0.90 g"
    },
    "potassium": "Pending review",
    "phosphate": "Pending review",
    "purines": "Pending review",
    "dietaryNote": "The naan-style bread, measured oil and butter make this a more substantial lunch than a plain chicken wrap. Chicken and yoghurt contribute protein as well as phosphorus, so the useful question is how this full serving fits alongside your other meals. The calculated phosphorus is not a reason to remove the dish automatically: the saved examples show how lighter existing breakfasts and dinners can leave room for it. The marinade and cooked juices are included in the estimate. Your protein needs depend on your kidney condition and treatment; this is not automatically suitable for every non-dialysis or dialysis plan. Practical portion testing still needs review.",
    "nutritionBasis": "CoFID ingredient-input estimate",
    "nutritionIncomplete": [],
    "nutritionSourceNote": "Ingredient-input estimates with cited secondary sources. Available carbohydrate by weight, excluding dietary fibre; reconciliation and original references: data/RecipeData/evidence/international-carbohydrates.json. Other nutrient gaps remain explicit.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 1
  ,
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  {
    "id": "spiced-turkey-keema-stuffed-pitta",
    "code": "L050",
    "category": "Lunch",
    "mealFamily": "stuffed-pitta",
    "cuisine": "indian",
    "emoji": "🍽️",
    "image": "/images/recipes/L050.webp",
    "name": "Spiced turkey keema stuffed pitta",
    "description": "Spiced turkey mince with tomatoes, peas and onions, tucked into warm pitta with cucumber yoghurt.",
    "cookingTime": "55 mins",
    "calories": "597 kcal",
    "protein": "43.7 g",
    "equipment": "0.1 g scales, knife, board, wide lidded frying pan, spoon, bowl, toaster or dry frying pan, clean probe thermometer, Saucepan, Blender or food processor, Grater",
    "ingredients": [
      {
        "item": "Skinless turkey breast, finely minced",
        "shoppingItem": "Skinless turkey breast, finely minced",
        "quantity": "120 g (raw edible input; keema)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "60 g (raw edible input; keema)"
      },
      {
        "item": "Tomato",
        "shoppingItem": "Tomato",
        "quantity": "80 g (raw edible input; keema)"
      },
      {
        "item": "Frozen peas",
        "shoppingItem": "Frozen peas",
        "quantity": "40 g (frozen raw edible weight; keema)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "15 g (raw edible input; keema)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "6 g (raw edible input; keema)"
      },
      {
        "item": "Fresh ginger",
        "shoppingItem": "Fresh ginger",
        "quantity": "6 g (raw edible input; keema)"
      },
      {
        "item": "Cumin seeds, ground",
        "shoppingItem": "Cumin seeds, ground",
        "quantity": "1 g (raw edible input; keema)"
      },
      {
        "item": "Coriander seeds, ground",
        "shoppingItem": "Coriander seeds, ground",
        "quantity": "1 g (raw edible input; keema)"
      },
      {
        "item": "Ground turmeric",
        "shoppingItem": "Ground turmeric",
        "quantity": "0.3 g (raw edible input; keema)"
      },
      {
        "item": "Ground cinnamon",
        "shoppingItem": "Ground cinnamon",
        "quantity": "0.15 g (raw edible input; keema)"
      },
      {
        "item": "Ground black pepper",
        "shoppingItem": "Ground black pepper",
        "quantity": "0.2 g (raw edible input; keema)"
      },
      {
        "item": "Cayenne chilli powder",
        "shoppingItem": "Cayenne chilli powder",
        "quantity": "0.3 g (raw edible input; keema)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.5 g (raw edible input; keema)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "30 g (weighed water; keema)"
      },
      {
        "item": "Fresh coriander",
        "shoppingItem": "Fresh coriander",
        "quantity": "5 g (raw edible input; keema finish)"
      },
      {
        "item": "White pitta bread",
        "shoppingItem": "White pitta bread",
        "quantity": "90 g (as sold, two 45 g pittas; bread)"
      },
      {
        "item": "Plain whole-milk yoghurt",
        "shoppingItem": "Plain whole-milk yoghurt",
        "quantity": "30 g (raw edible input; raita)"
      },
      {
        "item": "Cucumber",
        "shoppingItem": "Cucumber",
        "quantity": "30 g (raw edible input; raita)"
      }
    ],
    "method": [
      "Finely mince the raw turkey breast using a clean processor or ask the butcher to mince breast only without added ingredients. Finely chop onion, garlic, ginger and tomato. Keep the turkey chilled while preparing vegetables; clean equipment after contact with raw poultry.",
      "Heat 15 g oil in a wide pan over medium heat. Add onion and cook gently for 15-20 minutes, stirring until golden. Use 10 g of the measured water if it catches rather than adding unmeasured oil.",
      "Add garlic, ginger, cumin, coriander, turmeric, cinnamon, pepper and chilli. Stir for 30-60 seconds. Add tomato and salt and cook 5-7 minutes, crushing tomato until the mixture is a thick masala.",
      "Add turkey and break it into small crumbs. Cook 5 minutes, then add the frozen peas and the remaining measured water. Cover and simmer about 8 minutes. Look for small, gentle bubbles rather than a rolling boil. Stir along the bottom when needed to prevent sticking, and keep the heat low enough for the food to cook evenly. Stir thoroughly and check several parts of the mixture reach 75 C for 30 seconds.",
      "Uncover and reduce for 3-5 minutes until moist but not saucy. Keep all fat and juices in the filling; do not drain. Fold in chopped coriander. Grate cucumber and mix with yoghurt without squeezing out its juice.",
      "Warm two 45 g pittas in a toaster or dry pan for 1-2 minutes. Open pockets carefully. Divide all keema between the two pittas for one person, and serve with the cucumber yoghurt. Allow 55 minutes total; extend cooking if the temperature check requires it."
    ],
    "nutrition": {
      "calories": "597 kcal",
      "protein": "43.7 g",
      "carbohydrates": "61.3 g",
      "fat": "19.2 g",
      "fibre": "7.7 g",
      "sodium": "652 mg",
      "potassium": "1190 mg",
      "phosphate": "515 mg",
      "salt": "1.63 g"
    },
    "potassium": "Pending review",
    "phosphate": "Pending review",
    "purines": "Pending review",
    "dietaryNote": "This is a filling pitta lunch with a substantial turkey portion, peas and a small cucumber-yoghurt accompaniment. The turkey brings protein and phosphorus; the pitta is an important contributor to salt, so the actual bread label matters. Choosing a plain yeast-raised bread helps avoid adding an unnecessary phosphate raising agent, but the finished product still needs checking. There are recorded day combinations that fit the illustrative mineral and salt ceilings without shrinking the keema. These combinations do not decide your personal protein allowance. The calculation assumes breast meat minced without added ingredients and includes all the cooking fat and juices.",
    "nutritionBasis": "CoFID ingredient-input estimate",
    "nutritionIncomplete": [],
    "nutritionSourceNote": "Ingredient-input estimates with cited secondary sources. Available carbohydrate by weight, excluding dietary fibre; reconciliation and original references: data/RecipeData/evidence/international-carbohydrates.json. Other nutrient gaps remain explicit.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 1
  ,
    primaryDietCategory: "Mediterranean-style",
    dietCategories: ["Mediterranean-style"]
  },
  {
    "id": "bombay-style-cauliflower-and-egg-rolls",
    "code": "L051",
    "category": "Lunch",
    "mealFamily": "vegetable-egg-roll",
    "cuisine": "indian",
    "emoji": "🍽️",
    "image": "/images/recipes/L051.webp",
    "name": "Bombay-style cauliflower and egg rolls",
    "description": "Egg-coated flatbread rolls filled with spiced cauliflower, finished with fresh onion, coriander and lemon.",
    "cookingTime": "55 mins",
    "calories": "649 kcal",
    "protein": "25.0 g",
    "equipment": "0.1 g scales, knife, board, mixing bowl, rolling pin, wide non-stick frying pan, lidded saute pan, spatula, Fork or whisk, Saucepan",
    "ingredients": [
      {
        "item": "Plain white flour",
        "shoppingItem": "Plain white flour",
        "quantity": "80 g (dry flour; flatbreads)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "45 g (weighed water; flatbreads)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "5 g (raw edible input; flatbreads)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.3 g (raw edible input; flatbreads)"
      },
      {
        "item": "Cauliflower florets",
        "shoppingItem": "Cauliflower florets",
        "quantity": "150 g (raw edible input; filling)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "35 g (raw edible input; filling)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "4 g (raw edible input; filling)"
      },
      {
        "item": "Fresh ginger",
        "shoppingItem": "Fresh ginger",
        "quantity": "5 g (raw edible input; filling)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "7.5 g (raw edible input; filling)"
      },
      {
        "item": "Cumin seeds, ground",
        "shoppingItem": "Cumin seeds, ground",
        "quantity": "1 g (raw edible input; filling)"
      },
      {
        "item": "Coriander seeds, ground",
        "shoppingItem": "Coriander seeds, ground",
        "quantity": "1 g (raw edible input; filling)"
      },
      {
        "item": "Ground turmeric",
        "shoppingItem": "Ground turmeric",
        "quantity": "0.5 g (raw edible input; filling)"
      },
      {
        "item": "Cayenne chilli powder",
        "shoppingItem": "Cayenne chilli powder",
        "quantity": "0.2 g (raw edible input; filling)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.3 g (raw edible input; filling)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "15 g (weighed water; filling)"
      },
      {
        "item": "Whole egg, shell removed",
        "shoppingItem": "Whole egg, shell removed",
        "quantity": "100 g (raw edible weight, approximately two medium eggs; egg coating)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "5 g (raw edible input; egg coating)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "15 g (raw edible input; fresh finish)"
      },
      {
        "item": "Fresh lemon juice",
        "shoppingItem": "Fresh lemon juice",
        "quantity": "10 g (raw edible input; fresh finish)"
      },
      {
        "item": "Fresh coriander",
        "shoppingItem": "Fresh coriander",
        "quantity": "5 g (raw edible input; fresh finish)"
      }
    ],
    "method": [
      "Mix flour, 45 g water, 5 g oil and 0.3 g salt. Knead 5 minutes and cover for 15 minutes. Scrape dry patches from the bowl into the mixture and work them in with your hands. Beat exactly 100 g shelled egg in a separate bowl; egg count is only a shopping approximation.",
      "Cut cauliflower into 1-1.5 cm florets and finely slice both onion portions, keeping 15 g aside raw. Heat 7.5 g oil in a lidded pan. Cook the 35 g onion portion 5 minutes. Stir around the base and edges of the pan.",
      "The vegetables should soften and lose their raw bite; lower the heat if they start to darken before they are tender. Add garlic, ginger and filling spices and stir briefly.",
      "Add cauliflower, 0.3 g salt and 15 g water. Cover for about 8 minutes, then uncover and cook 5-7 minutes, stirring, until tender with browned edges and no watery sauce. Do not boil in excess water or drain.",
      "Divide the rested dough into two equal pieces and roll each approximately 18 cm wide. Use baking paper rather than adding uncounted dusting flour. Cook each in a hot dry non-stick pan for approximately 1 minute per side until cooked through. Stack under a clean cloth.",
      "Divide the 5 g coating oil into two 2.5 g portions. Heat one portion over medium-low heat. Pour in 50 g beaten egg, spread to the bread size and immediately lay a cooked flatbread over it. Cook until the egg layer is fully set; turn and heat the bread briefly. Repeat for the second bread without leaving liquid egg on the bread.",
      "Combine the reserved 15 g onion, lemon and coriander. Divide all cauliflower and fresh finish between two egg-coated breads. Roll firmly and serve both as one serving. Allow up to 55 minutes for the successive pan batches; timing depends on burner and pan size."
    ],
    "nutrition": {
      "calories": "649 kcal",
      "protein": "25.0 g",
      "carbohydrates": "71.1 g",
      "fat": "28.8 g",
      "fibre": "8.0 g",
      "sodium": "409 mg",
      "potassium": "866 mg",
      "phosphate": "360 mg",
      "salt": "1.02 g"
    },
    "potassium": "Pending review",
    "phosphate": "Pending review",
    "purines": "Pending review",
    "dietaryNote": "These are egg-coated flatbread rolls, not an omelette in a commercial wrap. Bread and oil supply much of the energy, while whole egg and cauliflower contribute protein and the recorded minerals. The yolks have been kept because they are part of the agreed dish; no fixed per-meal phosphorus rule was applied. Cauliflower is cooked with a small measured amount of water and nothing is drained, so no potassium-leaching reduction has been claimed. Use the full serving information when combining this lunch with the rest of your day. The egg layers should be completely set. Practical roll size still needs review.",
    "nutritionBasis": "CoFID ingredient-input estimate",
    "nutritionIncomplete": [],
    "nutritionSourceNote": "Ingredient-input estimates with cited secondary sources. Available carbohydrate by weight, excluding dietary fibre; reconciliation and original references: data/RecipeData/evidence/international-carbohydrates.json. Other nutrient gaps remain explicit.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 1
  ,
    primaryDietCategory: "Vegetarian",
    dietCategories: ["Vegetarian","Intermittent fasting — eating-window meal"]
  },
  {
    "id": "coconut-chicken-hopper-style-bowl",
    "code": "L052",
    "category": "Lunch",
    "mealFamily": "hopper-bowl",
    "cuisine": "sri-lankan",
    "emoji": "🍽️",
    "image": "/images/recipes/L052.webp",
    "name": "Coconut chicken hopper-style bowl",
    "description": "Lacy rice and coconut pancakes served with a fragrant chicken curry, curry leaves and warming spices.",
    "cookingTime": "65 minutes, plus 18-20 hours fermentation",
    "calories": "827 kcal",
    "protein": "34.2 g",
    "equipment": "0.01 g scales, clean covered fermentation bowl, non-stick hopper pan or small curved wok with fitted lid, ladle, wide saucepan, knife, board, spice grinder, clean probe thermometer",
    "ingredients": [
      {
        "item": "Fine white rice flour",
        "shoppingItem": "Fine white rice flour",
        "quantity": "90 g (dry flour; hoppers)"
      },
      {
        "item": "Active dry yeast",
        "shoppingItem": "Active dry yeast",
        "quantity": "0.15 g (dry; requires 0.1 g scales; hoppers)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "90 g (weighed water; hoppers)"
      },
      {
        "item": "Full-fat canned coconut milk",
        "shoppingItem": "Full-fat canned coconut milk",
        "quantity": "80 g (as sold, weighed not converted from ml; hoppers)"
      },
      {
        "item": "White sugar",
        "shoppingItem": "White sugar",
        "quantity": "2 g (raw edible input; hoppers)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.3 g (raw edible input; hoppers)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "2 g (raw edible input; hopper pan)"
      },
      {
        "item": "Boneless skinless chicken thigh",
        "shoppingItem": "Boneless skinless chicken thigh",
        "quantity": "120 g (raw edible input; curry)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "50 g (raw edible input; curry)"
      },
      {
        "item": "Tomato",
        "shoppingItem": "Tomato",
        "quantity": "60 g (raw edible input; curry)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "6 g (raw edible input; curry)"
      },
      {
        "item": "Fresh ginger",
        "shoppingItem": "Fresh ginger",
        "quantity": "6 g (raw edible input; curry)"
      },
      {
        "item": "Fresh curry leaves, finely sliced",
        "shoppingItem": "Fresh curry leaves, finely sliced",
        "quantity": "1 g (raw edible leaf, stems removed; leaves eaten; curry)"
      },
      {
        "item": "Coriander seeds, ground",
        "shoppingItem": "Coriander seeds, ground",
        "quantity": "1.5 g (raw edible input; curry)"
      },
      {
        "item": "Cumin seeds, ground",
        "shoppingItem": "Cumin seeds, ground",
        "quantity": "0.75 g (raw edible input; curry)"
      },
      {
        "item": "Fennel seeds, ground",
        "shoppingItem": "Fennel seeds, ground",
        "quantity": "0.4 g (raw edible input; curry)"
      },
      {
        "item": "Ground turmeric",
        "shoppingItem": "Ground turmeric",
        "quantity": "0.3 g (raw edible input; curry)"
      },
      {
        "item": "Cayenne chilli powder",
        "shoppingItem": "Cayenne chilli powder",
        "quantity": "0.4 g (raw edible input; curry)"
      },
      {
        "item": "Ground cinnamon",
        "shoppingItem": "Ground cinnamon",
        "quantity": "0.15 g (raw edible input; curry)"
      },
      {
        "item": "Ground cardamom",
        "shoppingItem": "Ground cardamom",
        "quantity": "0.1 g (raw edible input; curry)"
      },
      {
        "item": "Ground cloves",
        "shoppingItem": "Ground cloves",
        "quantity": "0.05 g (raw edible input; curry)"
      },
      {
        "item": "Coconut oil",
        "shoppingItem": "Coconut oil",
        "quantity": "10 g (raw edible input; curry)"
      },
      {
        "item": "Full-fat canned coconut milk",
        "shoppingItem": "Full-fat canned coconut milk",
        "quantity": "40 g (as sold, weighed; curry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "75 g (weighed water; curry)"
      },
      {
        "item": "Vinegar",
        "shoppingItem": "Vinegar",
        "quantity": "5 g (raw edible input; curry)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.45 g (raw edible input; curry)"
      }
    ],
    "method": [
      "The previous day, 18-20 hours before cooking - Mix rice flour, 0.15 g yeast and 90 g weighed water into a thick paste in a clean covered bowl. Ferment at approximately 20-24 C until risen and bubbly. Do not add coconut milk, sugar, salt or raw chicken at this stage. This follows a culinary fermentation method, not a validated home food-safety process; do not extend fermentation indefinitely if it fails.",
      "Cooking day, 00:00 - Stir 80 g coconut milk and 2 g sugar into the fermented paste. Cover for 30 minutes. The batter should pour smoothly and coat the pan thinly.",
      "Cut chicken thighs into 2-3 cm pieces. Chop onion and tomato; crush garlic and ginger. Lightly toast the coriander, cumin and fennel in a dry saucepan for 30-60 seconds without burning. Add coconut oil, onion, garlic, ginger and finely sliced curry leaves; soften for 6-8 minutes.",
      "Add turmeric, chilli, cinnamon, cardamom, cloves, tomato and 0.45 g curry salt. Cook 5 minutes to soften tomato, then add chicken, 40 g coconut milk, 75 g water and vinegar. Simmer gently, covered, 20-25 minutes, stirring and checking several chicken pieces reach 75 C for 30 seconds. Look for small, gentle bubbles rather than a rolling boil. Stir along the bottom when needed to prevent sticking, and keep the heat low enough for the food to cook evenly. Uncover briefly if needed to thicken; do not discard sauce.",
      "Stir 0.3 g hopper salt into the batter. Mix until the dry flour is incorporated and scrape down the sides of the bowl. The batter should be evenly combined before each portion is spooned into the pan. Heat a non-stick curved hopper pan over medium heat. Divide the measured 2 g olive oil across four to five hoppers with a brush. Weigh or divide batter equally; ladle a portion, quickly swirl it up the sides and cover. Cook 2-3 minutes until the centre is set and edges release. Repeat, adjusting heat to avoid burning.",
      "If a second pan is unavailable, allow up to 65 minutes on cooking day for all hoppers and curry. Serve all the hoppers and curry as one serving, with the complete sauce. The finely sliced curry leaves are part of the eaten specification. Without a curved pan, the flat pancake result is a different practical variant requiring its own review."
    ],
    "nutrition": {
      "calories": "827 kcal",
      "protein": "34.2 g",
      "carbohydrates": "79.3 g",
      "fat": "37.2 g",
      "fibre": "6.0 g",
      "sodium": "414 mg",
      "potassium": "1282 mg",
      "phosphate": "418 mg",
      "salt": "1.04 g"
    },
    "potassium": "Pending review",
    "phosphate": "Pending review",
    "purines": "Pending review",
    "dietaryNote": "The fermented hopper and the coconut chicken curry are both included in this serving. Coconut milk and rice flour make it energy-dense without simply enlarging the meat portion. Curry leaves and the full sauce remain in the recipe. This is also the most conditional mineral calculation in the batch: coconut-milk potassium and phosphorus come from a generic canned-product proxy, so the figures are not a verified measurement of a particular tin. The saved daily combinations show arithmetic possibilities, not guaranteed clinical suitability. Countable curry fluid has not yet been measured; if you have a fluid allowance, that remains an additional review point. Fermentation and bowl shape also need a practical cooking test.",
    "nutritionBasis": "CoFID ingredient-input estimate",
    "nutritionIncomplete": [],
    "nutritionSourceNote": "Ingredient-input estimates with cited secondary sources. Available carbohydrate by weight, excluding dietary fibre; reconciliation and original references: data/RecipeData/evidence/international-carbohydrates.json. Other nutrient gaps remain explicit.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 1
  ,
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet","Intermittent fasting — eating-window meal"]
  },
  {
    "id": "chicken-shawarma-with-garlic-flatbread",
    "code": "L053",
    "category": "Lunch",
    "mealFamily": "flatbread",
    "cuisine": "lebanese",
    "emoji": "🍽️",
    "image": "/images/recipes/L053.webp",
    "name": "Chicken shawarma with garlic flatbread",
    "description": "Shawarma-spiced chicken with warm garlic flatbread, roasted onion, fresh tomato and a creamy garlic sauce.",
    "cookingTime": "120 mins",
    "calories": "804 kcal",
    "protein": "39.7 g",
    "equipment": "0.1 g scales, mixing bowls, knife, board, rolling pin, rimmed roasting tray, heavy frying pan, small mortar and whisk, clean probe thermometer, Saucepan, Oven, Lid or bowl cover, Cloth or lid to keep the flatbread warm",
    "ingredients": [
      {
        "item": "Boneless skinless chicken thigh",
        "shoppingItem": "Boneless skinless chicken thigh",
        "quantity": "130 g (raw edible input; shawarma)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "50 g (raw edible input; shawarma)"
      },
      {
        "item": "Fresh lemon juice",
        "shoppingItem": "Fresh lemon juice",
        "quantity": "15 g (raw edible input; shawarma)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "4 g (raw edible input; shawarma)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "8 g (raw edible input; shawarma)"
      },
      {
        "item": "Cumin seeds, ground",
        "shoppingItem": "Cumin seeds, ground",
        "quantity": "0.75 g (raw edible input; shawarma)"
      },
      {
        "item": "Coriander seeds, ground",
        "shoppingItem": "Coriander seeds, ground",
        "quantity": "1 g (raw edible input; shawarma)"
      },
      {
        "item": "Paprika",
        "shoppingItem": "Paprika",
        "quantity": "0.5 g (raw edible input; shawarma)"
      },
      {
        "item": "Ground allspice",
        "shoppingItem": "Ground allspice",
        "quantity": "0.25 g (raw edible input; shawarma)"
      },
      {
        "item": "Ground cinnamon",
        "shoppingItem": "Ground cinnamon",
        "quantity": "0.15 g (raw edible input; shawarma)"
      },
      {
        "item": "Ground black pepper",
        "shoppingItem": "Ground black pepper",
        "quantity": "0.2 g (raw edible input; shawarma)"
      },
      {
        "item": "Ground turmeric",
        "shoppingItem": "Ground turmeric",
        "quantity": "0.25 g (raw edible input; shawarma)"
      },
      {
        "item": "Cayenne chilli powder",
        "shoppingItem": "Cayenne chilli powder",
        "quantity": "0.15 g (raw edible input; shawarma)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.3 g (raw edible input; shawarma)"
      },
      {
        "item": "Strong white bread flour",
        "shoppingItem": "Strong white bread flour",
        "quantity": "90 g (dry flour; garlic flatbread)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "50 g (weighed water; garlic flatbread)"
      },
      {
        "item": "Active dry yeast",
        "shoppingItem": "Active dry yeast",
        "quantity": "1 g (dry; garlic flatbread)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "5 g (raw edible input; garlic flatbread)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "2 g (raw edible input; garlic flatbread)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.3 g (raw edible input; garlic flatbread)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "3 g (raw edible input; toum-style sauce)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "20 g (raw edible input; toum-style sauce)"
      },
      {
        "item": "Fresh lemon juice",
        "shoppingItem": "Fresh lemon juice",
        "quantity": "5 g (raw edible input; toum-style sauce)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "2.5 g (weighed water; toum-style sauce)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.15 g (raw edible input; toum-style sauce)"
      },
      {
        "item": "Tomato",
        "shoppingItem": "Tomato",
        "quantity": "60 g (raw edible input; fresh side)"
      }
    ],
    "method": [
      "Do not wash raw poultry. Flatten thigh pieces to an even thickness without mincing. Mix the shawarma lemon, garlic, oil, spices and 0.3 g salt; coat chicken and onion wedges. Cover and refrigerate for at least 60 minutes.",
      "While the chicken marinates, mix bread flour, yeast and 0.3 g bread salt. Add 50 g water, 5 g oil and the finely crushed 2 g bread garlic. Knead about 8 minutes; cover and prove around 60 minutes until puffy. Scrape dry patches from the bowl into the mixture and work them in with your hands. Cover the bowl so the surface cannot dry out.",
      "Judge readiness by the dough becoming visibly puffy, because a cooler kitchen may make the rise slower than the stated guide time. Do not add unmeasured dusting flour.",
      "Crush the 3 g sauce garlic with 0.15 g sauce salt in a small mortar to a smooth paste. Whisk in 20 g sauce oil drop by drop, alternating with the 5 g sauce lemon juice and 2.5 g water. Aim for a loose emulsion rather than a large-batch restaurant toum.",
      "Keep chilled and use this batch now; do not store garlic in oil at room temperature.",
      "Heat oven to 220 C (200 C fan). Arrange chicken, onion and every bit of marinade in a single layer in a rimmed tray. Roast about 20-25 minutes until browned and chicken reaches 75 C for 30 seconds; extend cooking as needed.",
      "While the chicken roasts, roll the dough into one approximately 20 cm flatbread. Cook in a hot dry heavy pan 2-3 minutes each side until cooked through with brown patches. Keep warm under a clean cloth.",
      "Rest chicken 3 minutes, then slice thinly. Transfer tray juices and onions to the hot frying pan and bring to a bubbling simmer. Look for small, gentle bubbles rather than a rolling boil. Stir along the bottom when needed to prevent sticking, and keep the heat low enough for the food to cook evenly. Add sliced chicken and briefly toss to brown its edges and coat it with the cooked juices.",
      "Check more than one piece if their sizes differ, and use clean utensils for the cooked food.",
      "Serve all chicken, onions, juices, tomato and sauce with the one garlic flatbread."
    ],
    "nutrition": {
      "calories": "804 kcal",
      "protein": "39.7 g",
      "carbohydrates": "73.1 g",
      "fat": "38.3 g",
      "fibre": "6.1 g",
      "sodium": "420 mg",
      "potassium": "1015 mg",
      "phosphate": "324 mg",
      "salt": "1.05 g"
    },
    "potassium": "Pending review",
    "phosphate": "Pending review",
    "purines": "Pending review",
    "dietaryNote": "The garlic emulsion and fresh flatbread are part of this substantial lunch, not optional extras omitted from the numbers. The sauce is oil-based, while chicken thigh provides protein; this combination gives a different energy and phosphorus pattern from the yoghurt-marinated tikka. The complete measured oil and cooked juices are counted, with no assumed absorption discount. The saved examples show that the meal can be combined with existing lighter meals under the illustrative ceilings, subject to source uncertainty. Whether its protein fits your needs depends on your individual plan and treatment. Keep the garlic sauce freshly prepared and chilled, and review the carbohydrate definition before technical integration.",
    "nutritionBasis": "CoFID ingredient-input estimate",
    "nutritionIncomplete": [],
    "nutritionSourceNote": "Ingredient-input estimates with cited secondary sources. Available carbohydrate by weight, excluding dietary fibre; reconciliation and original references: data/RecipeData/evidence/international-carbohydrates.json. Other nutrient gaps remain explicit.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 1
  ,
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet","Intermittent fasting — eating-window meal"]
  },
  {
    "id": "lamb-kofta-with-herbed-bulgur",
    "code": "L054",
    "category": "Lunch",
    "mealFamily": "kofta-grain-plate",
    "cuisine": "turkish",
    "emoji": "🍽️",
    "image": "/images/recipes/L054.webp",
    "name": "Lamb kofta with herbed bulgur",
    "description": "Grilled lamb kofta with parsley and cumin, served with lemony bulgur wheat and fresh tomato.",
    "cookingTime": "50 mins",
    "calories": "730 kcal",
    "protein": "38.4 g",
    "equipment": "Kitchen scales, Mixing bowl, Griddle pan, Saucepan, Grater, Food thermometer, Lid or bowl cover",
    "ingredients": [
      {
        "item": "Lamb mince",
        "shoppingItem": "Lamb mince",
        "quantity": "150 g (kofta; raw edible input)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "30 g (kofta; raw edible input)"
      },
      {
        "item": "Fresh parsley",
        "shoppingItem": "Fresh parsley",
        "quantity": "6 g (kofta; raw edible input)"
      },
      {
        "item": "Ground cumin",
        "shoppingItem": "Ground cumin",
        "quantity": "1 g (kofta; dry)"
      },
      {
        "item": "Ground black pepper",
        "shoppingItem": "Ground black pepper",
        "quantity": "0.25 g (kofta; dry)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.4 g (kofta; dry)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "5 g (kofta; as sold, weighed grams)"
      },
      {
        "item": "Bulgur wheat",
        "shoppingItem": "Bulgur wheat",
        "quantity": "80 g (bulgur; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "160 g (bulgur; weighed recipe water)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "9 g (bulgur; as sold, weighed grams)"
      },
      {
        "item": "Fresh lemon juice",
        "shoppingItem": "Fresh lemon juice",
        "quantity": "12.5 g (bulgur; freshly squeezed, weighed grams)"
      },
      {
        "item": "Fresh parsley",
        "shoppingItem": "Fresh parsley",
        "quantity": "7.5 g (bulgur; raw edible input)"
      },
      {
        "item": "Fresh tomato",
        "shoppingItem": "Fresh tomato",
        "quantity": "60 g (bulgur; raw edible input)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.3 g (bulgur; dry)"
      }
    ],
    "method": [
      "Finely grate the kofta onion without discarding juice. Mix with lamb, parsley, cumin, pepper and kofta salt for 2 minutes until sticky. Form three equal oval kofta and chill 15 minutes.",
      "Bring the bulgur and measured water to a simmer, cover for 10-12 minutes or until tender, then rest 5 minutes. Look for small, gentle bubbles rather than a rolling boil. Stir along the bottom when needed to prevent sticking, and keep the heat low enough for the food to cook evenly. Check the packet grain size; record any additional weighed water as a revision.",
      "Check the centre of the meat with a clean food thermometer: it should reach 75°C for at least 30 seconds.",
      "Brush a griddle with the 5 g kofta oil and cook the kofta over medium-high heat for 10-12 minutes, turning to brown every side. Check their centres reach the meat safety endpoint. Keep and serve the cooked pan juices.",
      "Fluff bulgur with its 9 g oil, lemon and salt. Fold in chopped tomato and bulgur parsley. Serve all three kofta with all the herbed grain as one serving."
    ],
    "nutrition": {
      "calories": "730 kcal",
      "protein": "38.4 g",
      "carbohydrates": "61.9 g",
      "fat": "36.0 g",
      "fibre": "7.3 g",
      "sodium": "391 mg",
      "potassium": "1065 mg",
      "phosphate": "546 mg",
      "salt": "0.98 g"
    },
    "potassium": "Pending review",
    "phosphate": "Pending review",
    "purines": "Pending review",
    "dietaryNote": "Development estimate requiring individual whole-day review; see guide dossier. No universal stage or dialysis suitability claim.",
    "nutritionBasis": "CoFID ingredient-input estimate",
    "nutritionIncomplete": [],
    "nutritionSourceNote": "Ingredient-input estimates with cited secondary sources. Available carbohydrate by weight, excluding dietary fibre; reconciliation and original references: data/RecipeData/evidence/international-carbohydrates.json. Other nutrient gaps remain explicit.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 1
  ,
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet","Intermittent fasting — eating-window meal"]
  },
  {
    "id": "lemon-chicken-souvlaki-with-warm-pitta",
    "code": "L055",
    "category": "Lunch",
    "mealFamily": "skewer-pitta",
    "cuisine": "greek",
    "emoji": "🍽️",
    "image": "/images/recipes/L055.webp",
    "name": "Lemon chicken souvlaki with warm pitta",
    "description": "Lemon and oregano chicken skewers with warm pitta, tomato, cucumber and garlic yoghurt.",
    "cookingTime": "70 mins",
    "calories": "643 kcal",
    "protein": "50.1 g",
    "equipment": "Kitchen scales, Knife and chopping board, Frying pan, Griddle pan, Saucepan, Metal skewers, Food thermometer, Lid or bowl cover",
    "ingredients": [
      {
        "item": "Skinless boneless chicken breast",
        "shoppingItem": "Skinless boneless chicken breast",
        "quantity": "150 g (skewers; raw edible input)"
      },
      {
        "item": "Fresh lemon juice",
        "shoppingItem": "Fresh lemon juice",
        "quantity": "15 g (skewers; freshly squeezed, weighed grams)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "11 g (skewers; as sold, weighed grams)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "4 g (skewers; raw edible input)"
      },
      {
        "item": "Dried oregano",
        "shoppingItem": "Dried oregano",
        "quantity": "0.75 g (skewers; dry)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.4 g (skewers; dry)"
      },
      {
        "item": "Ground black pepper",
        "shoppingItem": "Ground black pepper",
        "quantity": "0.2 g (skewers; dry)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "50 g (skewers; raw edible input)"
      },
      {
        "item": "White pitta bread",
        "shoppingItem": "White pitta bread",
        "quantity": "100 g (pitta and salad; as sold)"
      },
      {
        "item": "Cucumber",
        "shoppingItem": "Cucumber",
        "quantity": "75 g (pitta and salad; raw edible input)"
      },
      {
        "item": "Fresh tomato",
        "shoppingItem": "Fresh tomato",
        "quantity": "60 g (pitta and salad; raw edible input)"
      },
      {
        "item": "Plain whole-milk yoghurt",
        "shoppingItem": "Plain whole-milk yoghurt",
        "quantity": "50 g (pitta and salad; as sold)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "1.5 g (pitta and salad; raw edible input)"
      },
      {
        "item": "Fresh lemon juice",
        "shoppingItem": "Fresh lemon juice",
        "quantity": "5 g (pitta and salad; freshly squeezed, weighed grams)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "5 g (pitta and salad; as sold, weighed grams)"
      }
    ],
    "method": [
      "Do not wash raw poultry, and use clean utensils for the cooked food. Cut chicken into even 2.5 cm pieces. Combine the skewer lemon, oil, garlic, oregano, salt and pepper; refrigerate chicken and onion wedges in this marinade for 30 minutes. Cover and keep chilled while you prepare the other parts of the recipe. Keep raw meat and its utensils separate from ready-to-eat salad and cooked food.",
      "Dice cucumber without squeezing or draining it. Combine half with yoghurt, sauce garlic and lemon; keep the remainder with chopped tomato as a side. Refrigerate until serving.",
      "Thread the chicken and onion onto metal skewers. Griddle over medium-high heat 10-14 minutes, turning regularly, until chicken reaches the poultry safety endpoint. Simmer all reserved marinade in a small pan until bubbling and safely cooked, then spoon over the cooked skewers. Look for small, gentle bubbles rather than a rolling boil. Stir along the bottom when needed to prevent sticking, and keep the heat low enough for the food to cook evenly.",
      "Check the centre of the meat with a clean food thermometer: it should reach 75°C for at least 30 seconds.",
      "Warm pitta in a dry pan for 1 minute each side. Brush with the 5 g finish oil. Serve all the skewers, bread, cucumber sauce and tomato side as one serving."
    ],
    "nutrition": {
      "calories": "643 kcal",
      "protein": "50.1 g",
      "carbohydrates": "62.2 g",
      "fat": "21.1 g",
      "fibre": "5.1 g",
      "sodium": "694 mg",
      "potassium": "1265 mg",
      "phosphate": "568 mg",
      "salt": "1.73 g"
    },
    "potassium": "Pending review",
    "phosphate": "Pending review",
    "purines": "Pending review",
    "dietaryNote": "Development estimate requiring individual whole-day review; see guide dossier. No universal stage or dialysis suitability claim.",
    "nutritionBasis": "CoFID ingredient-input estimate",
    "nutritionIncomplete": [],
    "nutritionSourceNote": "Ingredient-input estimates with cited secondary sources. Available carbohydrate by weight, excluding dietary fibre; reconciliation and original references: data/RecipeData/evidence/international-carbohydrates.json. Other nutrient gaps remain explicit.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 1
  ,
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  {
    "id": "chermoula-fish-with-couscous",
    "code": "L056",
    "category": "Lunch",
    "mealFamily": "fish-couscous-plate",
    "cuisine": "moroccan",
    "emoji": "🍽️",
    "image": "/images/recipes/L056.webp",
    "name": "Chermoula fish with couscous",
    "description": "Baked cod coated in a coriander, parsley and lemon sauce, served with couscous and carrots.",
    "cookingTime": "40 mins",
    "calories": "679 kcal",
    "protein": "39.8 g",
    "equipment": "Kitchen scales, Knife and chopping board, Mixing bowl, Saucepan, Oven, Lid or bowl cover, Ovenproof dish",
    "ingredients": [
      {
        "item": "Cod fillet, flesh only",
        "shoppingItem": "Cod fillet, flesh only",
        "quantity": "160 g (chermoula fish; raw edible input)"
      },
      {
        "item": "Fresh coriander leaves",
        "shoppingItem": "Fresh coriander leaves",
        "quantity": "10 g (chermoula fish; raw edible input)"
      },
      {
        "item": "Fresh parsley",
        "shoppingItem": "Fresh parsley",
        "quantity": "10 g (chermoula fish; raw edible input)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "5 g (chermoula fish; raw edible input)"
      },
      {
        "item": "Fresh lemon juice",
        "shoppingItem": "Fresh lemon juice",
        "quantity": "17.5 g (chermoula fish; freshly squeezed, weighed grams)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "17.5 g (chermoula fish; as sold, weighed grams)"
      },
      {
        "item": "Ground cumin",
        "shoppingItem": "Ground cumin",
        "quantity": "1 g (chermoula fish; dry)"
      },
      {
        "item": "Sweet paprika",
        "shoppingItem": "Sweet paprika",
        "quantity": "1 g (chermoula fish; dry)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.5 g (chermoula fish; dry)"
      },
      {
        "item": "Plain couscous",
        "shoppingItem": "Plain couscous",
        "quantity": "85 g (couscous; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "110 g (couscous; weighed recipe water)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "6 g (couscous; as sold, weighed grams)"
      },
      {
        "item": "Carrot",
        "shoppingItem": "Carrot",
        "quantity": "60 g (couscous; raw edible input)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.25 g (couscous; dry)"
      }
    ],
    "method": [
      "Finely chop coriander, parsley and garlic; mix with lemon, 17.5 g oil, cumin, paprika and fish salt into chermoula. Coat cod and leave chilled for 15 minutes.",
      "Cut carrot into 5 mm dice. Simmer in the measured couscous water for 5 minutes. Look for small, gentle bubbles rather than a rolling boil. Stir along the bottom when needed to prevent sticking, and keep the heat low enough for the food to cook evenly. Pour the complete boiling carrot-water mixture over couscous, add its oil and salt, cover for 10 minutes, then fluff.",
      "Heat oven to 210 C conventional or 190 C fan. Place fish and every bit of chermoula in a small baking dish. Choose a dish that holds this portion without spreading it into a very thin layer. Arrange it evenly, so the centre and edges heat through at a similar rate. Bake 12-18 minutes, checking the thickest part is cooked safely and flakes. Check the centre as well as the surface; a browned top alone does not show that the inside is cooked.",
      "Serve all the fish, its herb juices and the couscous as one serving.",
      "Check that the fish is steaming hot and cooked throughout, with opaque flesh that flakes easily."
    ],
    "nutrition": {
      "calories": "679 kcal",
      "protein": "39.8 g",
      "carbohydrates": "67.7 g",
      "fat": "27.0 g",
      "fibre": "6.7 g",
      "sodium": "471 mg",
      "potassium": "1089 mg",
      "phosphate": "512 mg",
      "salt": "1.18 g"
    },
    "potassium": "Pending review",
    "phosphate": "Pending review",
    "purines": "Pending review",
    "dietaryNote": "Development estimate requiring individual whole-day review; see guide dossier. No universal stage or dialysis suitability claim.",
    "nutritionBasis": "CoFID ingredient-input estimate",
    "nutritionIncomplete": [],
    "nutritionSourceNote": "Ingredient-input estimates with cited secondary sources. Available carbohydrate by weight, excluding dietary fibre; reconciliation and original references: data/RecipeData/evidence/international-carbohydrates.json. Other nutrient gaps remain explicit.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 1
  ,
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  {
    "id": "spiced-egg-and-pepper-shakshuka-with-bread",
    "code": "L057",
    "category": "Lunch",
    "mealFamily": "shakshuka",
    "cuisine": "tunisian",
    "emoji": "🍽️",
    "image": "/images/recipes/L057.webp",
    "name": "Spiced egg and pepper shakshuka with bread",
    "description": "Eggs gently cooked in a spiced tomato and pepper sauce, served with toasted bread for dipping.",
    "cookingTime": "45 mins",
    "calories": "653 kcal",
    "protein": "25.9 g",
    "equipment": "Kitchen scales, Knife and chopping board, Frying pan, Saucepan, Lid or bowl cover",
    "ingredients": [
      {
        "item": "Whole egg, shell removed",
        "shoppingItem": "Whole egg, shell removed",
        "quantity": "110 g (shakshuka; raw edible input)"
      },
      {
        "item": "Red bell pepper",
        "shoppingItem": "Red bell pepper",
        "quantity": "120 g (shakshuka; raw edible input)"
      },
      {
        "item": "Fresh tomato",
        "shoppingItem": "Fresh tomato",
        "quantity": "200 g (shakshuka; raw edible input)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "50 g (shakshuka; raw edible input)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "4 g (shakshuka; raw edible input)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "15 g (shakshuka; as sold, weighed grams)"
      },
      {
        "item": "Ground cumin",
        "shoppingItem": "Ground cumin",
        "quantity": "1 g (shakshuka; dry)"
      },
      {
        "item": "Sweet paprika",
        "shoppingItem": "Sweet paprika",
        "quantity": "1 g (shakshuka; dry)"
      },
      {
        "item": "Pure cayenne chilli powder",
        "shoppingItem": "Pure cayenne chilli powder",
        "quantity": "0.2 g (shakshuka; dry)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.6 g (shakshuka; dry)"
      },
      {
        "item": "Fresh parsley",
        "shoppingItem": "Fresh parsley",
        "quantity": "6 g (shakshuka; raw edible input)"
      },
      {
        "item": "White bread",
        "shoppingItem": "White bread",
        "quantity": "100 g (bread; as sold)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "6 g (bread; as sold, weighed grams)"
      }
    ],
    "method": [
      "Chop onion and peppers into 1 cm pieces; crush garlic and dice tomato. Heat the 15 g sauce oil in a wide lidded frying pan. Soften onion and peppers for 8-10 minutes.",
      "Stir in garlic, cumin, paprika and chilli for 30 seconds. Add tomato and salt. Simmer 15-20 minutes until thick enough to hold two wells; do not strain the sauce. Look for small, gentle bubbles rather than a rolling boil. Stir along the bottom when needed to prevent sticking, and keep the heat low enough for the food to cook evenly.",
      "Weigh 110 g shelled eggs, approximately two large eggs, keeping individual yolks where possible. Divide between two wells. Cover on low heat until whites and yolks are fully set, roughly 7-10 minutes.",
      "Warm the bread and brush with the 6 g bread oil. Scatter parsley over the pan. Serve both eggs and all the pepper-tomato sauce and bread as one serving.",
      "Cook the egg mixture until fully set."
    ],
    "nutrition": {
      "calories": "653 kcal",
      "protein": "25.9 g",
      "carbohydrates": "60.8 g",
      "fat": "34.0 g",
      "fibre": "9.4 g",
      "sodium": "816 mg",
      "potassium": "1183 mg",
      "phosphate": "395 mg",
      "salt": "2.04 g"
    },
    "potassium": "Pending review",
    "phosphate": "Pending review",
    "purines": "Pending review",
    "dietaryNote": "Development estimate requiring individual whole-day review; see guide dossier. No universal stage or dialysis suitability claim.",
    "nutritionBasis": "CoFID ingredient-input estimate",
    "nutritionIncomplete": [],
    "nutritionSourceNote": "Ingredient-input estimates with cited secondary sources. Available carbohydrate by weight, excluding dietary fibre; reconciliation and original references: data/RecipeData/evidence/international-carbohydrates.json. Other nutrient gaps remain explicit.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 1
  ,
    primaryDietCategory: "Vegetarian",
    dietCategories: ["Vegetarian","Intermittent fasting — eating-window meal"]
  },
  {
    "id": "pork-and-ginger-steamed-dumplings",
    "code": "L058",
    "category": "Lunch",
    "mealFamily": "steamed-dumplings",
    "cuisine": "chinese",
    "emoji": "🍽️",
    "image": "/images/recipes/L058.webp",
    "name": "Pork and ginger steamed dumplings",
    "description": "Soft steamed dumplings filled with pork, ginger and Chinese cabbage, served with a soy and vinegar dipping sauce.",
    "cookingTime": "85 mins",
    "calories": "724 kcal",
    "protein": "37.5 g",
    "equipment": "Kitchen scales, Knife and chopping board, Mixing bowl, Saucepan, Steamer and saucepan, Rolling pin, Food thermometer, Lid or bowl cover",
    "ingredients": [
      {
        "item": "Plain white flour",
        "shoppingItem": "Plain white flour",
        "quantity": "95 g (wrappers; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "50 g (wrappers; weighed recipe water)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "4 g (wrappers; as sold, weighed grams)"
      },
      {
        "item": "Plain pork mince",
        "shoppingItem": "Plain pork mince",
        "quantity": "140 g (filling; raw edible input)"
      },
      {
        "item": "Chinese cabbage",
        "shoppingItem": "Chinese cabbage",
        "quantity": "70 g (filling; raw edible input)"
      },
      {
        "item": "Spring onion, bulbs and green tops",
        "shoppingItem": "Spring onion, bulbs and green tops",
        "quantity": "15 g (filling; raw edible input)"
      },
      {
        "item": "Fresh ginger",
        "shoppingItem": "Fresh ginger",
        "quantity": "8 g (filling; raw edible input)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "3 g (filling; raw edible input)"
      },
      {
        "item": "Soy sauce",
        "shoppingItem": "Soy sauce",
        "quantity": "9 g (filling; as sold, weighed grams)"
      },
      {
        "item": "Sesame oil",
        "shoppingItem": "Sesame oil",
        "quantity": "6 g (filling; as sold, weighed grams)"
      },
      {
        "item": "White sugar",
        "shoppingItem": "White sugar",
        "quantity": "2 g (filling; dry)"
      },
      {
        "item": "Ground black pepper",
        "shoppingItem": "Ground black pepper",
        "quantity": "0.25 g (filling; dry)"
      },
      {
        "item": "Soy sauce",
        "shoppingItem": "Soy sauce",
        "quantity": "7 g (dipping sauce; as sold, weighed grams)"
      },
      {
        "item": "Plain unseasoned vinegar",
        "shoppingItem": "Plain unseasoned vinegar",
        "quantity": "12.5 g (dipping sauce; as sold, weighed grams)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "10 g (dipping sauce; weighed recipe water)"
      },
      {
        "item": "Fresh ginger",
        "shoppingItem": "Fresh ginger",
        "quantity": "2 g (dipping sauce; raw edible input)"
      },
      {
        "item": "Sesame oil",
        "shoppingItem": "Sesame oil",
        "quantity": "3 g (dipping sauce; as sold, weighed grams)"
      }
    ],
    "method": [
      "Mix wrapper flour with its water and oil. Knead 6-8 minutes to a smooth firm dough and cover for 30 minutes. Scrape dry patches from the bowl into the mixture and work them in with your hands. Finely chop cabbage and spring onion; do not salt or squeeze out juice.",
      "Mix pork, cabbage, spring onion, filling ginger and garlic, 9 g soy, 6 g sesame oil, sugar and pepper vigorously until cohesive. Keep refrigerated while rolling wrappers.",
      "Divide dough and filling into 12 equal portions. Roll wrappers about 9 cm wide with thin edges on baking paper. Add one filling portion to each; wet edges with a little measured process water and pleat firmly, keeping filling off the seal. Keep the filling away from the joining edge and press the dough surfaces directly together. Check for open gaps before cooking so that the filling stays inside.",
      "Line a steamer with perforated baking paper. Set dumplings apart and steam over boiling process water for 12-16 minutes in batches; check the centre of a thick dumpling reaches the mince safety endpoint. Keep the food above the water rather than sitting in it, with the lid fitted so steam circulates around the portion. Check the pan does not boil dry without letting water splash onto the food. Refill only the steamer reservoir, never pour water onto the dumplings.",
      "Check the centre of the meat with a clean food thermometer: it should reach 75°C for at least 30 seconds.",
      "Mix the dipping sauce ingredients. Serve all twelve dumplings and all the dipping sauce as one serving."
    ],
    "nutrition": {
      "calories": "724 kcal",
      "protein": "37.5 g",
      "carbohydrates": "77.5 g",
      "fat": "28.2 g",
      "fibre": "5.4 g",
      "sodium": "983 mg",
      "potassium": "1011 mg",
      "phosphate": "415 mg",
      "salt": "2.46 g"
    },
    "potassium": "Pending review",
    "phosphate": "Pending review",
    "purines": "Pending review",
    "dietaryNote": "Development estimate requiring individual whole-day review; see guide dossier. No universal stage or dialysis suitability claim.",
    "nutritionBasis": "CoFID ingredient-input estimate",
    "nutritionIncomplete": [],
    "nutritionSourceNote": "Ingredient-input estimates with cited secondary sources. Available carbohydrate by weight, excluding dietary fibre; reconciliation and original references: data/RecipeData/evidence/international-carbohydrates.json. Other nutrient gaps remain explicit.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 1
  ,
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet","Intermittent fasting — eating-window meal"]
  },
  {
    "id": "chicken-katsu-with-rice-and-cabbage-slaw",
    "code": "L059",
    "category": "Lunch",
    "mealFamily": "breaded-cutlet-plate",
    "cuisine": "japanese",
    "emoji": "🍽️",
    "image": "/images/recipes/L059.webp",
    "name": "Chicken katsu with rice and cabbage slaw",
    "description": "Crispy breadcrumb-coated chicken with rice, cabbage and carrot slaw, and a tangy tomato and soy sauce.",
    "cookingTime": "55 mins",
    "calories": "977 kcal",
    "protein": "51.8 g",
    "equipment": "Kitchen scales, Knife and chopping board, Frying pan, Saucepan, Food thermometer, Lid or bowl cover",
    "ingredients": [
      {
        "item": "Skinless boneless chicken breast",
        "shoppingItem": "Skinless boneless chicken breast",
        "quantity": "150 g (cutlets; raw edible input)"
      },
      {
        "item": "Plain white flour",
        "shoppingItem": "Plain white flour",
        "quantity": "12.5 g (cutlets; dry)"
      },
      {
        "item": "Whole egg, shell removed",
        "shoppingItem": "Whole egg, shell removed",
        "quantity": "30 g (cutlets; raw edible input)"
      },
      {
        "item": "Plain coarse dry white breadcrumbs",
        "shoppingItem": "Plain coarse dry white breadcrumbs",
        "quantity": "35 g (cutlets; dry)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "18 g (cutlets; as sold, weighed grams)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.4 g (cutlets; dry)"
      },
      {
        "item": "Ground black pepper",
        "shoppingItem": "Ground black pepper",
        "quantity": "0.2 g (cutlets; dry)"
      },
      {
        "item": "White short-grain rice",
        "shoppingItem": "White short-grain rice",
        "quantity": "75 g (rice; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "135 g (rice; weighed recipe water)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "5 g (rice; as sold, weighed grams)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.3 g (rice; dry)"
      },
      {
        "item": "White cabbage",
        "shoppingItem": "White cabbage",
        "quantity": "80 g (slaw; raw edible input)"
      },
      {
        "item": "Carrot",
        "shoppingItem": "Carrot",
        "quantity": "40 g (slaw; raw edible input)"
      },
      {
        "item": "Plain unseasoned vinegar",
        "shoppingItem": "Plain unseasoned vinegar",
        "quantity": "10 g (slaw; as sold, weighed grams)"
      },
      {
        "item": "White sugar",
        "shoppingItem": "White sugar",
        "quantity": "4 g (slaw; dry)"
      },
      {
        "item": "Sesame oil",
        "shoppingItem": "Sesame oil",
        "quantity": "4 g (slaw; as sold, weighed grams)"
      },
      {
        "item": "Tomato puree",
        "shoppingItem": "Tomato puree",
        "quantity": "12.5 g (sharp tomato sauce; as sold)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "20 g (sharp tomato sauce; weighed recipe water)"
      },
      {
        "item": "Soy sauce",
        "shoppingItem": "Soy sauce",
        "quantity": "6 g (sharp tomato sauce; as sold, weighed grams)"
      },
      {
        "item": "White sugar",
        "shoppingItem": "White sugar",
        "quantity": "6 g (sharp tomato sauce; dry)"
      },
      {
        "item": "Plain unseasoned vinegar",
        "shoppingItem": "Plain unseasoned vinegar",
        "quantity": "6 g (sharp tomato sauce; as sold, weighed grams)"
      }
    ],
    "method": [
      "Do not wash raw poultry, and use clean utensils for the cooked food. Cook the rice component in its measured water, oil and salt in a close-fitting saucepan: bring to a simmer, cover on the lowest heat for 12-15 minutes, then rest off the heat for 10 minutes. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork. Do not drain.",
      "Flatten the chicken into one 1.5 cm thick cutlet. Season with cutlet salt and pepper. Set out the measured flour, beaten egg and coarse dry crumbs. Coat the cutlet in that order.",
      "Make the slaw from finely shredded cabbage and carrot, vinegar, sugar and sesame oil. Simmer the tomato sauce ingredients for 3-4 minutes until glossy. Look for small, gentle bubbles rather than a rolling boil. Stir along the bottom when needed to prevent sticking, and keep the heat low enough for the food to cook evenly.",
      "Heat the measured frying oil in a close-fitting non-stick pan over medium heat. Fry the cutlet for 4-6 minutes per side, adjusting heat so crumbs brown without burning; check the poultry safety endpoint. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food.",
      "Do not pour unused raw egg/flour onto the plated food. Slice the cutlet and serve with all the rice, slaw and sauce as one serving.",
      "Cook the egg mixture until fully set."
    ],
    "nutrition": {
      "calories": "977 kcal",
      "protein": "51.8 g",
      "carbohydrates": "110.8 g",
      "fat": "34.3 g",
      "fibre": "7.4 g",
      "sodium": "1022 mg",
      "potassium": "1183 mg",
      "phosphate": "579 mg",
      "salt": "2.56 g"
    },
    "potassium": "Pending review",
    "phosphate": "Pending review",
    "purines": "Pending review",
    "dietaryNote": "Development estimate requiring individual whole-day review; see guide dossier. No universal stage or dialysis suitability claim.",
    "nutritionBasis": "CoFID ingredient-input estimate",
    "nutritionIncomplete": [],
    "nutritionSourceNote": "Ingredient-input estimates with cited secondary sources. Available carbohydrate by weight, excluding dietary fibre; reconciliation and original references: data/RecipeData/evidence/international-carbohydrates.json. Other nutrient gaps remain explicit.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 1
  ,
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet","Intermittent fasting — eating-window meal"]
  },
  {
    "id": "bulgogi-style-beef-lettuce-cups",
    "code": "L060",
    "category": "Lunch",
    "mealFamily": "lettuce-cups",
    "cuisine": "korean",
    "emoji": "🍽️",
    "image": "/images/recipes/L060.webp",
    "name": "Bulgogi-style beef lettuce cups",
    "description": "Thin slices of beef in a pear, garlic and soy marinade, served with rice, lettuce and cucumber.",
    "cookingTime": "65 mins",
    "calories": "825 kcal",
    "protein": "42.8 g",
    "equipment": "Kitchen scales, Knife and chopping board, Mixing bowl, Frying pan, Saucepan, Grater, Food thermometer, Lid or bowl cover",
    "ingredients": [
      {
        "item": "Beef sirloin, lean and edible fat",
        "shoppingItem": "Beef sirloin, lean and edible fat",
        "quantity": "150 g (bulgogi; raw edible input)"
      },
      {
        "item": "Nashi pear, flesh and skin",
        "shoppingItem": "Nashi pear, flesh and skin",
        "quantity": "40 g (bulgogi; raw edible input)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "35 g (bulgogi; raw edible input)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "6 g (bulgogi; raw edible input)"
      },
      {
        "item": "Fresh ginger",
        "shoppingItem": "Fresh ginger",
        "quantity": "4 g (bulgogi; raw edible input)"
      },
      {
        "item": "Soy sauce",
        "shoppingItem": "Soy sauce",
        "quantity": "12 g (bulgogi; as sold, weighed grams)"
      },
      {
        "item": "White sugar",
        "shoppingItem": "White sugar",
        "quantity": "8 g (bulgogi; dry)"
      },
      {
        "item": "Sesame oil",
        "shoppingItem": "Sesame oil",
        "quantity": "9 g (bulgogi; as sold, weighed grams)"
      },
      {
        "item": "Spring onion, bulbs and green tops",
        "shoppingItem": "Spring onion, bulbs and green tops",
        "quantity": "12.5 g (bulgogi; raw edible input)"
      },
      {
        "item": "Ground black pepper",
        "shoppingItem": "Ground black pepper",
        "quantity": "0.25 g (bulgogi; dry)"
      },
      {
        "item": "Sesame seeds",
        "shoppingItem": "Sesame seeds",
        "quantity": "4 g (bulgogi; dry)"
      },
      {
        "item": "White basmati rice",
        "shoppingItem": "White basmati rice",
        "quantity": "80 g (rice; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "144 g (rice; weighed recipe water)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "5 g (rice; as sold, weighed grams)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.3 g (rice; dry)"
      },
      {
        "item": "Lettuce",
        "shoppingItem": "Lettuce",
        "quantity": "80 g (cups; raw edible input)"
      },
      {
        "item": "Cucumber",
        "shoppingItem": "Cucumber",
        "quantity": "60 g (cups; raw edible input)"
      }
    ],
    "method": [
      "Chill beef briefly until firm and slice across the grain 2-3 mm thick. Grate pear and onion; mix with garlic, ginger, soy, sugar, sesame oil and pepper. Marinate beef refrigerated for 30 minutes.",
      "Cook the rice component in its measured water, oil and salt in a close-fitting saucepan: bring to a simmer, cover on the lowest heat for 12-15 minutes, then rest off the heat for 10 minutes. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork. Do not drain.",
      "Separate washed lettuce leaves, pat dry and cut cucumber into fine batons. Heat a broad non-stick pan until hot. Lift beef into two batches, searing 1-2 minutes per side; cook the collected marinade separately until bubbling and safely cooked.",
      "Check the centre of the meat with a clean food thermometer: it should reach 75°C for at least 30 seconds.",
      "Return beef and sliced spring onion to the reduced marinade briefly, then scatter sesame. Serve all the beef, cooked juices, rice, lettuce and cucumber as one serving, building small cups at the table."
    ],
    "nutrition": {
      "calories": "825 kcal",
      "protein": "42.8 g",
      "carbohydrates": "79.9 g",
      "fat": "36.4 g",
      "fibre": "5.8 g",
      "sodium": "888 mg",
      "potassium": "1042 mg",
      "phosphate": "445 mg",
      "salt": "2.22 g"
    },
    "potassium": "Pending review",
    "phosphate": "Pending review",
    "purines": "Pending review",
    "dietaryNote": "Development estimate requiring individual whole-day review; see guide dossier. No universal stage or dialysis suitability claim.",
    "nutritionBasis": "CoFID ingredient-input estimate",
    "nutritionIncomplete": [],
    "nutritionSourceNote": "Ingredient-input estimates with cited secondary sources. Available carbohydrate by weight, excluding dietary fibre; reconciliation and original references: data/RecipeData/evidence/international-carbohydrates.json. Other nutrient gaps remain explicit.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 1
  ,
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet","Intermittent fasting — eating-window meal"]
  },
  {
    "id": "lemongrass-chicken-noodle-salad",
    "code": "L061",
    "category": "Lunch",
    "mealFamily": "noodle-salad",
    "cuisine": "thai",
    "emoji": "🍽️",
    "image": "/images/recipes/L061.webp",
    "name": "Lemongrass chicken noodle salad",
    "description": "Lemongrass chicken with rice noodles, crisp vegetables, fresh herbs and a lime and fish sauce dressing.",
    "cookingTime": "65 mins",
    "calories": "691 kcal",
    "protein": "39.0 g",
    "equipment": "Kitchen scales, Knife and chopping board, Mixing bowl, Griddle pan, Saucepan, Food thermometer, Colander or sieve",
    "ingredients": [
      {
        "item": "Skinless boneless chicken thigh",
        "shoppingItem": "Skinless boneless chicken thigh",
        "quantity": "150 g (chicken; raw edible input)"
      },
      {
        "item": "Tender lemongrass core",
        "shoppingItem": "Tender lemongrass core",
        "quantity": "10 g (chicken; raw edible core finely minced)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "4 g (chicken; raw edible input)"
      },
      {
        "item": "Fish sauce",
        "shoppingItem": "Fish sauce",
        "quantity": "9 g (chicken; as sold, weighed grams)"
      },
      {
        "item": "White sugar",
        "shoppingItem": "White sugar",
        "quantity": "5 g (chicken; dry)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "10 g (chicken; as sold, weighed grams)"
      },
      {
        "item": "Rice noodles",
        "shoppingItem": "Rice noodles",
        "quantity": "80 g (salad; dry)"
      },
      {
        "item": "Cucumber",
        "shoppingItem": "Cucumber",
        "quantity": "60 g (salad; raw edible input)"
      },
      {
        "item": "Carrot",
        "shoppingItem": "Carrot",
        "quantity": "50 g (salad; raw edible input)"
      },
      {
        "item": "Shallot",
        "shoppingItem": "Shallot",
        "quantity": "20 g (salad; raw edible input)"
      },
      {
        "item": "Fresh mint",
        "shoppingItem": "Fresh mint",
        "quantity": "6 g (salad; raw edible leaves)"
      },
      {
        "item": "Fresh coriander leaves",
        "shoppingItem": "Fresh coriander leaves",
        "quantity": "6 g (salad; raw edible input)"
      },
      {
        "item": "Fresh lime juice",
        "shoppingItem": "Fresh lime juice",
        "quantity": "20 g (dressing; freshly squeezed, weighed grams)"
      },
      {
        "item": "Fish sauce",
        "shoppingItem": "Fish sauce",
        "quantity": "6 g (dressing; as sold, weighed grams)"
      },
      {
        "item": "White sugar",
        "shoppingItem": "White sugar",
        "quantity": "7 g (dressing; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "12.5 g (dressing; weighed recipe water)"
      },
      {
        "item": "Fresh red chilli flesh",
        "shoppingItem": "Fresh red chilli flesh",
        "quantity": "2.5 g (dressing; raw edible input)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "5 g (dressing; as sold, weighed grams)"
      }
    ],
    "method": [
      "Do not wash raw poultry, and use clean utensils for the cooked food. Remove tough lemongrass layers before weighing the tender core. Mince extremely finely with garlic, then mix with the chicken fish sauce, sugar and oil. Flatten thigh pieces and marinate refrigerated for 30 minutes.",
      "Soak or cook rice noodles in 750 g boiling process water according to their width, about 3-6 minutes; drain and cool. Separate the pasta or noodles as they soften so they do not stick together.",
      "Check the texture towards the end of the cooking time; it should be tender with no chalky centre. No leaching reduction is applied to the dry noodle input estimate.",
      "Cut cucumber and carrot into fine batons and thinly slice shallot. Mix every dressing ingredient until sugar dissolves. Tear mint and coriander leaves.",
      "Griddle chicken over medium-high heat for 6-8 minutes per side until the poultry endpoint is met. Simmer all leftover marinade and collected chicken juices to a safe bubbling finish. Look for small, gentle bubbles rather than a rolling boil. Stir along the bottom when needed to prevent sticking, and keep the heat low enough for the food to cook evenly.",
      "Slice chicken. Toss noodles, vegetables and herbs with the complete dressing; top with chicken and cooked marinade. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food. Serve the whole salad as one serving. Thai-style lime, chilli and fish-sauce dressing is distinct from Indonesian peanut-tamarind satay."
    ],
    "nutrition": {
      "calories": "691 kcal",
      "protein": "39.0 g",
      "carbohydrates": "82.3 g",
      "fat": "20.4 g",
      "fibre": "6.0 g",
      "sodium": "1482 mg",
      "potassium": "1048 mg",
      "phosphate": "347 mg",
      "salt": "3.70 g"
    },
    "potassium": "Pending review",
    "phosphate": "Pending review",
    "purines": "Pending review",
    "dietaryNote": "Development estimate requiring individual whole-day review; see guide dossier. No universal stage or dialysis suitability claim.",
    "nutritionBasis": "CoFID/USDA ingredient-input estimate",
    "nutritionIncomplete": [],
    "nutritionSourceNote": "Ingredient-input estimates with cited CoFID and secondary sources. Available carbohydrate by weight excludes dietary fibre. Completed missing-nutrient evidence and calculations: data/RecipeData/evidence/nutrition-gap-resolution.json. Ingredient and cooking variability remain.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 1
  ,
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet","Intermittent fasting — eating-window meal"]
  },
  {
    "id": "banh-mi-inspired-chicken-baguette",
    "code": "L062",
    "category": "Lunch",
    "mealFamily": "baguette",
    "cuisine": "vietnamese",
    "emoji": "🍽️",
    "image": "/images/recipes/L062.webp",
    "name": "Bánh mì-inspired chicken baguette",
    "description": "A crusty baguette filled with lemongrass chicken, pickled carrot and mooli, cucumber, coriander and mayonnaise.",
    "cookingTime": "65 mins",
    "calories": "770 kcal",
    "protein": "42.6 g",
    "equipment": "Kitchen scales, Knife and chopping board, Saucepan, Oven, Food thermometer, Lid or bowl cover, Ovenproof dish",
    "ingredients": [
      {
        "item": "Skinless boneless chicken thigh",
        "shoppingItem": "Skinless boneless chicken thigh",
        "quantity": "140 g (chicken; raw edible input)"
      },
      {
        "item": "Tender lemongrass core",
        "shoppingItem": "Tender lemongrass core",
        "quantity": "7.5 g (chicken; raw edible core finely minced)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "4 g (chicken; raw edible input)"
      },
      {
        "item": "Soy sauce",
        "shoppingItem": "Soy sauce",
        "quantity": "7 g (chicken; as sold, weighed grams)"
      },
      {
        "item": "Fish sauce",
        "shoppingItem": "Fish sauce",
        "quantity": "5 g (chicken; as sold, weighed grams)"
      },
      {
        "item": "White sugar",
        "shoppingItem": "White sugar",
        "quantity": "4 g (chicken; dry)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "9 g (chicken; as sold, weighed grams)"
      },
      {
        "item": "Carrot",
        "shoppingItem": "Carrot",
        "quantity": "50 g (quick pickle; raw edible input)"
      },
      {
        "item": "Daikon/mooli radish",
        "shoppingItem": "Daikon/mooli radish",
        "quantity": "50 g (quick pickle; raw edible input)"
      },
      {
        "item": "Plain unseasoned vinegar",
        "shoppingItem": "Plain unseasoned vinegar",
        "quantity": "17.5 g (quick pickle; as sold, weighed grams)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "12.5 g (quick pickle; weighed recipe water)"
      },
      {
        "item": "White sugar",
        "shoppingItem": "White sugar",
        "quantity": "7.5 g (quick pickle; dry)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.25 g (quick pickle; dry)"
      },
      {
        "item": "White baguette",
        "shoppingItem": "White baguette",
        "quantity": "120 g (sandwich; as sold)"
      },
      {
        "item": "Standard mayonnaise",
        "shoppingItem": "Standard mayonnaise",
        "quantity": "17.5 g (sandwich; as sold)"
      },
      {
        "item": "Cucumber",
        "shoppingItem": "Cucumber",
        "quantity": "50 g (sandwich; raw edible input)"
      },
      {
        "item": "Fresh coriander leaves",
        "shoppingItem": "Fresh coriander leaves",
        "quantity": "7 g (sandwich; raw edible input)"
      },
      {
        "item": "Fresh red chilli flesh",
        "shoppingItem": "Fresh red chilli flesh",
        "quantity": "2 g (sandwich; raw edible input)"
      }
    ],
    "method": [
      "Do not wash raw poultry, and use clean utensils for the cooked food. Finely mince the tender lemongrass core and garlic. Combine chicken marinade ingredients and refrigerate flattened thigh meat in them for 30 minutes. Cover and keep chilled while you prepare the other parts of the recipe. Keep raw meat and its utensils separate from ready-to-eat salad and cooked food.",
      "Julienne carrot and mooli. Toss with the pickle vinegar, water, sugar and salt in a shallow bowl for 30 minutes. This is a small fresh pickle salad, not a preserved jar. Reserve all its liquor for serving.",
      "Roast chicken and all marinade in a small rimmed dish at 220 C conventional or 200 C fan for 20-25 minutes, checking the poultry endpoint. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food. Rest 3 minutes and slice; safely simmer any thin juices if needed. Look for small, gentle bubbles rather than a rolling boil. Stir along the bottom when needed to prevent sticking, and keep the heat low enough for the food to cook evenly.",
      "Warm the 120 g baguette portion and split it lengthways. Spread mayonnaise inside, then layer cucumber, chicken with cooked juices, pickle vegetables, coriander and finely sliced chilli.",
      "Serve all the pickle liquor as a small side dressing for this serving so the measured sugar, vinegar and salt remain part of the eaten specification."
    ],
    "nutrition": {
      "calories": "770 kcal",
      "protein": "42.6 g",
      "carbohydrates": "81.6 g",
      "fat": "28.9 g",
      "fibre": "8.1 g",
      "sodium": "1539 mg",
      "potassium": "1164 mg",
      "phosphate": "331 mg",
      "salt": "3.85 g"
    },
    "potassium": "Pending review",
    "phosphate": "Pending review",
    "purines": "Pending review",
    "dietaryNote": "Development estimate requiring individual whole-day review; see guide dossier. No universal stage or dialysis suitability claim.",
    "nutritionBasis": "CoFID/USDA ingredient-input estimate",
    "nutritionIncomplete": [],
    "nutritionSourceNote": "Ingredient-input estimates with cited CoFID and secondary sources. Available carbohydrate by weight excludes dietary fibre. Completed missing-nutrient evidence and calculations: data/RecipeData/evidence/nutrition-gap-resolution.json. Ingredient and cooking variability remain.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 1
  ,
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet","Intermittent fasting — eating-window meal"]
  },
  {
    "id": "chicken-satay-style-rice-noodle-salad",
    "code": "L063",
    "category": "Lunch",
    "mealFamily": "satay-noodle-salad",
    "cuisine": "indonesian",
    "emoji": "🍽️",
    "image": "/images/recipes/L063.webp",
    "name": "Chicken satay-style rice noodle salad",
    "description": "Spiced chicken skewers with rice noodles, crunchy vegetables and a peanut and tamarind sauce.",
    "cookingTime": "65 mins",
    "calories": "809 kcal",
    "protein": "50.3 g",
    "equipment": "Kitchen scales, Knife and chopping board, Mixing bowl, Saucepan, Metal skewers, Blender or food processor, Food thermometer, Colander or sieve, Grill",
    "ingredients": [
      {
        "item": "Skinless boneless chicken breast",
        "shoppingItem": "Skinless boneless chicken breast",
        "quantity": "150 g (satay; raw edible input)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "4 g (satay; raw edible input)"
      },
      {
        "item": "Ground coriander seed",
        "shoppingItem": "Ground coriander seed",
        "quantity": "1 g (satay; dry)"
      },
      {
        "item": "Ground turmeric",
        "shoppingItem": "Ground turmeric",
        "quantity": "0.5 g (satay; dry)"
      },
      {
        "item": "White sugar",
        "shoppingItem": "White sugar",
        "quantity": "5 g (satay; dry)"
      },
      {
        "item": "Soy sauce",
        "shoppingItem": "Soy sauce",
        "quantity": "8 g (satay; as sold, weighed grams)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "10 g (satay; as sold, weighed grams)"
      },
      {
        "item": "Unsalted shelled peanuts",
        "shoppingItem": "Unsalted shelled peanuts",
        "quantity": "27.5 g (peanut sauce; raw edible nuts)"
      },
      {
        "item": "Seed-free unsweetened tamarind flesh",
        "shoppingItem": "Seed-free unsweetened tamarind flesh",
        "quantity": "8 g (peanut sauce; edible flesh, no sweetened concentrate)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "50 g (peanut sauce; weighed recipe water)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "2.5 g (peanut sauce; raw edible input)"
      },
      {
        "item": "White sugar",
        "shoppingItem": "White sugar",
        "quantity": "6 g (peanut sauce; dry)"
      },
      {
        "item": "Pure cayenne chilli powder",
        "shoppingItem": "Pure cayenne chilli powder",
        "quantity": "0.3 g (peanut sauce; dry)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.3 g (peanut sauce; dry)"
      },
      {
        "item": "Rice noodles",
        "shoppingItem": "Rice noodles",
        "quantity": "80 g (noodle salad; dry)"
      },
      {
        "item": "Cucumber",
        "shoppingItem": "Cucumber",
        "quantity": "80 g (noodle salad; raw edible input)"
      },
      {
        "item": "Carrot",
        "shoppingItem": "Carrot",
        "quantity": "50 g (noodle salad; raw edible input)"
      },
      {
        "item": "Fresh lime juice",
        "shoppingItem": "Fresh lime juice",
        "quantity": "12.5 g (noodle salad; freshly squeezed, weighed grams)"
      },
      {
        "item": "Fresh coriander leaves",
        "shoppingItem": "Fresh coriander leaves",
        "quantity": "7.5 g (noodle salad; raw edible input)"
      }
    ],
    "method": [
      "Do not wash raw poultry, and use clean utensils for the cooked food. Cut chicken into thin strips and mix with the marinade garlic, coriander, turmeric, sugar, soy sauce and oil. Refrigerate 30 minutes. Grind unsalted peanuts finely, keeping their fat; no defatting assumption is applied.",
      "Mash seed-free tamarind flesh with 50 g sauce water. Blend with ground peanuts, sauce garlic, sugar, chilli and salt. Simmer 5-7 minutes to a pourable sauce; keep all pulp. Look for small, gentle bubbles rather than a rolling boil. Stir along the bottom when needed to prevent sticking, and keep the heat low enough for the food to cook evenly.",
      "Cook noodles in 750 g boiling process water according to their packet, drain, and toss with lime, thin cucumber and carrot, and coriander. Separate the pasta or noodles as they soften so they do not stick together. Check the texture towards the end of the cooking time; it should be tender with no chalky centre.",
      "Thread chicken onto metal skewers and grill under a hot grill, turning, for 8-12 minutes until safely cooked. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food. Bubble all remaining marinade in the peanut sauce until the poultry safety endpoint is met.",
      "Serve all the skewers, noodles and peanut-tamarind sauce as one serving."
    ],
    "nutrition": {
      "calories": "809 kcal",
      "protein": "50.3 g",
      "carbohydrates": "89.7 g",
      "fat": "25.8 g",
      "fibre": "7.5 g",
      "sodium": "818 mg",
      "potassium": "1127 mg",
      "phosphate": "632 mg",
      "salt": "2.04 g"
    },
    "potassium": "Pending review",
    "phosphate": "Pending review",
    "purines": "Pending review",
    "dietaryNote": "Development estimate requiring individual whole-day review; see guide dossier. No universal stage or dialysis suitability claim.",
    "nutritionBasis": "CoFID ingredient-input estimate",
    "nutritionIncomplete": [],
    "nutritionSourceNote": "Ingredient-input estimates with cited secondary sources. Available carbohydrate by weight, excluding dietary fibre; reconciliation and original references: data/RecipeData/evidence/international-carbohydrates.json. Other nutrient gaps remain explicit.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 1
  ,
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  {
    "id": "chicken-and-pepper-quesadillas",
    "code": "L064",
    "category": "Lunch",
    "mealFamily": "quesadilla",
    "cuisine": "mexican",
    "emoji": "🍽️",
    "image": "/images/recipes/L064.webp",
    "name": "Chicken and pepper quesadillas",
    "description": "Golden toasted tortillas filled with spiced chicken, peppers, onions and melted Cheddar.",
    "cookingTime": "45 mins",
    "calories": "851 kcal",
    "protein": "55.3 g",
    "equipment": "Kitchen scales, Knife and chopping board, Griddle pan, Grater, Food thermometer",
    "ingredients": [
      {
        "item": "Skinless boneless chicken breast",
        "shoppingItem": "Skinless boneless chicken breast",
        "quantity": "140 g (filling; raw edible input)"
      },
      {
        "item": "Red bell pepper",
        "shoppingItem": "Red bell pepper",
        "quantity": "90 g (filling; raw edible input)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "50 g (filling; raw edible input)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "12.5 g (filling; as sold, weighed grams)"
      },
      {
        "item": "Ground cumin",
        "shoppingItem": "Ground cumin",
        "quantity": "1 g (filling; dry)"
      },
      {
        "item": "Sweet paprika",
        "shoppingItem": "Sweet paprika",
        "quantity": "1 g (filling; dry)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.4 g (filling; dry)"
      },
      {
        "item": "Fresh lime juice",
        "shoppingItem": "Fresh lime juice",
        "quantity": "10 g (filling; freshly squeezed, weighed grams)"
      },
      {
        "item": "Fresh coriander leaves",
        "shoppingItem": "Fresh coriander leaves",
        "quantity": "6 g (filling; raw edible input)"
      },
      {
        "item": "Soft wheat tortillas",
        "shoppingItem": "Soft wheat tortillas",
        "quantity": "110 g (quesadillas; as sold)"
      },
      {
        "item": "Mature Cheddar",
        "shoppingItem": "Mature Cheddar",
        "quantity": "45 g (quesadillas; as sold)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "5 g (quesadillas; as sold, weighed grams)"
      }
    ],
    "method": [
      "Do not wash raw poultry, and use clean utensils for the cooked food. Cut chicken into 1 cm pieces, slice pepper and onion and grate the cheese. Heat 12.5 g oil in a broad pan and soften pepper and onion for 7 minutes. Stir around the base and edges of the pan. The vegetables should soften and lose their raw bite; lower the heat if they start to darken before they are tender.",
      "Add chicken, cumin, paprika and salt. Cook 8-10 minutes, stirring, until chicken is safely cooked and the filling is fairly dry. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food. Fold in lime and coriander.",
      "Divide filling and cheese between two tortillas, using half of each tortilla as the base, then fold closed. Use all 5 g griddle oil across the two folded tortillas.",
      "Cook in batches over medium-low heat 2-3 minutes each side, pressing gently, until crisp and cheese melts. Serve both folded quesadillas as one serving with all filling and pan juices."
    ],
    "nutrition": {
      "calories": "851 kcal",
      "protein": "55.3 g",
      "carbohydrates": "62.6 g",
      "fat": "41.6 g",
      "fibre": "7.7 g",
      "sodium": "1258 mg",
      "potassium": "1037 mg",
      "phosphate": "812 mg",
      "salt": "3.15 g"
    },
    "potassium": "Pending review",
    "phosphate": "Pending review",
    "purines": "Pending review",
    "dietaryNote": "Development estimate requiring individual whole-day review; see guide dossier. No universal stage or dialysis suitability claim.",
    "nutritionBasis": "CoFID ingredient-input estimate",
    "nutritionIncomplete": [],
    "nutritionSourceNote": "Ingredient-input estimates with cited secondary sources. Available carbohydrate by weight, excluding dietary fibre; reconciliation and original references: data/RecipeData/evidence/international-carbohydrates.json. Other nutrient gaps remain explicit.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 1
  ,
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  {
    "id": "soft-fish-tacos-with-lime-slaw",
    "code": "L065",
    "category": "Lunch",
    "mealFamily": "tacos",
    "cuisine": "mexican",
    "emoji": "🍽️",
    "image": "/images/recipes/L065.webp",
    "name": "Soft fish tacos with lime slaw",
    "description": "Warm corn tortillas filled with spiced cod, crunchy cabbage and a creamy lime and yoghurt slaw.",
    "cookingTime": "40 mins",
    "calories": "588 kcal",
    "protein": "39.2 g",
    "equipment": "Kitchen scales, Knife and chopping board, Frying pan",
    "ingredients": [
      {
        "item": "Cod fillet, flesh only",
        "shoppingItem": "Cod fillet, flesh only",
        "quantity": "160 g (fish; raw edible input)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "14 g (fish; as sold, weighed grams)"
      },
      {
        "item": "Ground cumin",
        "shoppingItem": "Ground cumin",
        "quantity": "0.75 g (fish; dry)"
      },
      {
        "item": "Sweet paprika",
        "shoppingItem": "Sweet paprika",
        "quantity": "1 g (fish; dry)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "3 g (fish; raw edible input)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.45 g (fish; dry)"
      },
      {
        "item": "Fresh lime juice",
        "shoppingItem": "Fresh lime juice",
        "quantity": "10 g (fish; freshly squeezed, weighed grams)"
      },
      {
        "item": "White cabbage",
        "shoppingItem": "White cabbage",
        "quantity": "90 g (slaw; raw edible input)"
      },
      {
        "item": "Plain whole-milk yoghurt",
        "shoppingItem": "Plain whole-milk yoghurt",
        "quantity": "60 g (slaw; as sold)"
      },
      {
        "item": "Fresh lime juice",
        "shoppingItem": "Fresh lime juice",
        "quantity": "12.5 g (slaw; freshly squeezed, weighed grams)"
      },
      {
        "item": "Fresh coriander leaves",
        "shoppingItem": "Fresh coriander leaves",
        "quantity": "7.5 g (slaw; raw edible input)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "20 g (slaw; raw edible input)"
      },
      {
        "item": "Fresh red chilli flesh",
        "shoppingItem": "Fresh red chilli flesh",
        "quantity": "2 g (slaw; raw edible input)"
      },
      {
        "item": "Soft corn tortillas",
        "shoppingItem": "Soft corn tortillas",
        "quantity": "100 g (tacos; as sold)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "4 g (tacos; as sold, weighed grams)"
      }
    ],
    "method": [
      "Shred cabbage and onion finely and toss with yoghurt, slaw lime, coriander and chilli. Do not drain or discard the yoghurt dressing.",
      "Cut cod into large strips and coat with fish oil, cumin, paprika, crushed garlic, salt and fish lime. Heat a non-stick frying pan over medium-high heat.",
      "Sear fish 3-4 minutes on each broad side until cooked through, handling gently. Check the thickest part: it should be opaque, steaming hot and separate readily into flakes with a fork. Continue cooking if the centre is still cool or translucent. Add any remaining coating to the pan and heat fully; serve all cooked juices.",
      "Brush tortillas with the measured 4 g finish oil, then warm briefly on both sides in a dry second pan. Divide fish and complete slaw between the tortillas and serve all as one serving.",
      "Check that the fish is steaming hot and cooked throughout, with opaque flesh that flakes easily."
    ],
    "nutrition": {
      "calories": "588 kcal",
      "protein": "39.2 g",
      "carbohydrates": "50.2 g",
      "fat": "24.1 g",
      "fibre": "10.3 g",
      "sodium": "428 mg",
      "potassium": "1229 mg",
      "phosphate": "732 mg",
      "salt": "1.07 g"
    },
    "potassium": "Pending review",
    "phosphate": "Pending review",
    "purines": "Pending review",
    "dietaryNote": "Development estimate requiring individual whole-day review; see guide dossier. No universal stage or dialysis suitability claim.",
    "nutritionBasis": "CoFID ingredient-input estimate",
    "nutritionIncomplete": [],
    "nutritionSourceNote": "Ingredient-input estimates with cited secondary sources. Available carbohydrate by weight, excluding dietary fibre; reconciliation and original references: data/RecipeData/evidence/international-carbohydrates.json. Other nutrient gaps remain explicit.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 1
  ,
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  {
    "id": "jerk-chicken-flatbread",
    "code": "L066",
    "category": "Lunch",
    "mealFamily": "flatbread",
    "cuisine": "caribbean",
    "emoji": "🍽️",
    "image": "/images/recipes/L066.webp",
    "name": "Jerk chicken flatbread",
    "description": "Jerk-spiced chicken with allspice, thyme and chilli, served on homemade flatbread with cabbage and cucumber.",
    "cookingTime": "100 mins",
    "calories": "731 kcal",
    "protein": "42.7 g",
    "equipment": "Kitchen scales, Knife and chopping board, Mixing bowl, Oven, Rolling pin, Blender or food processor, Food thermometer, Lid or bowl cover, Ovenproof dish",
    "ingredients": [
      {
        "item": "Skinless boneless chicken thigh",
        "shoppingItem": "Skinless boneless chicken thigh",
        "quantity": "150 g (jerk chicken; raw edible input)"
      },
      {
        "item": "Spring onion, bulbs and green tops",
        "shoppingItem": "Spring onion, bulbs and green tops",
        "quantity": "25 g (jerk chicken; raw edible input)"
      },
      {
        "item": "Fresh ginger",
        "shoppingItem": "Fresh ginger",
        "quantity": "6 g (jerk chicken; raw edible input)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "5 g (jerk chicken; raw edible input)"
      },
      {
        "item": "Ground allspice",
        "shoppingItem": "Ground allspice",
        "quantity": "1.5 g (jerk chicken; dry)"
      },
      {
        "item": "Dried thyme",
        "shoppingItem": "Dried thyme",
        "quantity": "0.75 g (jerk chicken; dry)"
      },
      {
        "item": "Fresh green chilli flesh",
        "shoppingItem": "Fresh green chilli flesh",
        "quantity": "3 g (jerk chicken; raw edible input)"
      },
      {
        "item": "Fresh lime juice",
        "shoppingItem": "Fresh lime juice",
        "quantity": "15 g (jerk chicken; freshly squeezed, weighed grams)"
      },
      {
        "item": "Plain unseasoned vinegar",
        "shoppingItem": "Plain unseasoned vinegar",
        "quantity": "6 g (jerk chicken; as sold, weighed grams)"
      },
      {
        "item": "White sugar",
        "shoppingItem": "White sugar",
        "quantity": "5 g (jerk chicken; dry)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "12.5 g (jerk chicken; as sold, weighed grams)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.5 g (jerk chicken; dry)"
      },
      {
        "item": "Plain white flour",
        "shoppingItem": "Plain white flour",
        "quantity": "95 g (flatbread; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "53.2 g (flatbread; weighed recipe water)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "6 g (flatbread; as sold, weighed grams)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.4 g (flatbread; dry)"
      },
      {
        "item": "White cabbage",
        "shoppingItem": "White cabbage",
        "quantity": "70 g (fresh side; raw edible input)"
      },
      {
        "item": "Cucumber",
        "shoppingItem": "Cucumber",
        "quantity": "50 g (fresh side; raw edible input)"
      },
      {
        "item": "Fresh lime juice",
        "shoppingItem": "Fresh lime juice",
        "quantity": "7.5 g (fresh side; freshly squeezed, weighed grams)"
      }
    ],
    "method": [
      "Do not wash raw poultry, and use clean utensils for the cooked food. Use 3 g Scotch bonnet flesh for the chilli specification, remove stem before weighing and handle with care. Blend all jerk seasonings, oil and salt with spring onion, ginger and garlic. Coat chicken and refrigerate 60 minutes. Cover and keep chilled while you prepare the other parts of the recipe. Keep raw meat and its utensils separate from ready-to-eat salad and cooked food.",
      "Mix the flatbread flour, water, oil and salt; knead 5 minutes and cover for 20 minutes. Scrape dry patches from the bowl into the mixture and work them in with your hands. Roll into one flatbread on reusable baking paper without extra flour, and cook in a hot dry heavy pan for 2-3 minutes per side until cooked through.",
      "Roast chicken with all marinade in a rimmed dish at 220 C conventional or 200 C fan for 25-30 minutes, turning once and checking the poultry endpoint. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food. Finish briefly under a hot grill for browned edges without burning the spices.",
      "Shred cabbage, slice cucumber and dress with the 7.5 g side lime. Slice the chicken and serve it with every cooked jerk juice on the flatbread, with all the fresh side as one serving."
    ],
    "nutrition": {
      "calories": "731 kcal",
      "protein": "42.7 g",
      "carbohydrates": "82.3 g",
      "fat": "24.8 g",
      "fibre": "7.9 g",
      "sodium": "503 mg",
      "potassium": "1165 mg",
      "phosphate": "329 mg",
      "salt": "1.26 g"
    },
    "potassium": "Pending review",
    "phosphate": "Pending review",
    "purines": "Pending review",
    "dietaryNote": "Development estimate requiring individual whole-day review; see guide dossier. No universal stage or dialysis suitability claim.",
    "nutritionBasis": "CoFID ingredient-input estimate",
    "nutritionIncomplete": [],
    "nutritionSourceNote": "Ingredient-input estimates with cited secondary sources. Available carbohydrate by weight, excluding dietary fibre; reconciliation and original references: data/RecipeData/evidence/international-carbohydrates.json. Other nutrient gaps remain explicit.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 1
  ,
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet","Intermittent fasting — eating-window meal"]
  },
  {
    "id": "suya-spiced-chicken-skewers-with-flatbread",
    "code": "L067",
    "category": "Lunch",
    "mealFamily": "skewer-flatbread",
    "cuisine": "nigerian",
    "emoji": "🍽️",
    "image": "/images/recipes/L067.webp",
    "name": "Suya-spiced chicken skewers with flatbread",
    "description": "Chicken skewers coated in roasted peanuts, ginger and chilli, served with flatbread, tomato and onion.",
    "cookingTime": "65 mins",
    "calories": "810 kcal",
    "protein": "53.3 g",
    "equipment": "Kitchen scales, Knife and chopping board, Mixing bowl, Metal skewers, Rolling pin, Blender or food processor, Food thermometer, Lid or bowl cover",
    "ingredients": [
      {
        "item": "Skinless boneless chicken breast",
        "shoppingItem": "Skinless boneless chicken breast",
        "quantity": "160 g (suya chicken; raw edible input)"
      },
      {
        "item": "Unsalted dry-roasted peanuts",
        "shoppingItem": "Unsalted dry-roasted peanuts",
        "quantity": "20 g (suya chicken; as sold)"
      },
      {
        "item": "Ground ginger",
        "shoppingItem": "Ground ginger",
        "quantity": "1.5 g (suya chicken; dry)"
      },
      {
        "item": "Sweet paprika",
        "shoppingItem": "Sweet paprika",
        "quantity": "2 g (suya chicken; dry)"
      },
      {
        "item": "Pure cayenne chilli powder",
        "shoppingItem": "Pure cayenne chilli powder",
        "quantity": "0.5 g (suya chicken; dry)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "4 g (suya chicken; raw edible input)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "12.5 g (suya chicken; as sold, weighed grams)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.5 g (suya chicken; dry)"
      },
      {
        "item": "Plain white flour",
        "shoppingItem": "Plain white flour",
        "quantity": "90 g (flatbread; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "50.4 g (flatbread; weighed recipe water)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "6 g (flatbread; as sold, weighed grams)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.4 g (flatbread; dry)"
      },
      {
        "item": "Fresh tomato",
        "shoppingItem": "Fresh tomato",
        "quantity": "90 g (side; raw edible input)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "30 g (side; raw edible input)"
      },
      {
        "item": "Fresh lime juice",
        "shoppingItem": "Fresh lime juice",
        "quantity": "10 g (side; freshly squeezed, weighed grams)"
      }
    ],
    "method": [
      "Do not wash raw poultry, and use clean utensils for the cooked food. Grind unsalted dry-roasted peanuts into a coarse powder before adding the ginger powder, paprika, cayenne and salt. Keep the nuts together on the board and chop to a similar size. Leave some texture where the recipe uses them as a topping, rather than turning them into a smooth paste. This uses full-fat ground peanuts, not defatted kuli-kuli; its fat remains counted.",
      "Slice chicken across the grain into 1 cm strips. Rub with garlic, oil and the entire measured peanut spice blend. Thread onto metal skewers and refrigerate 20 minutes.",
      "Mix the flatbread flour, water, oil and salt; knead 5 minutes and cover for 20 minutes. Scrape dry patches from the bowl into the mixture and work them in with your hands. Roll into one flatbread on reusable baking paper without extra flour, and cook in a hot dry heavy pan for 2-3 minutes per side until cooked through.",
      "Grill skewers over medium-high heat for 10-14 minutes, turning frequently, until chicken is safely cooked and peanut coating is toasted rather than scorched. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food. Safely cook and serve any raw-contact coating left in the bowl.",
      "Slice tomato and onion, dress with lime and serve all the skewers, complete coating, flatbread and salad as one serving. Use a sharp knife and steady the tomato on a board; make even slices so they warm through at the same rate."
    ],
    "nutrition": {
      "calories": "810 kcal",
      "protein": "53.3 g",
      "carbohydrates": "75.3 g",
      "fat": "32.0 g",
      "fibre": "7.8 g",
      "sodium": "614 mg",
      "potassium": "1244 mg",
      "phosphate": "583 mg",
      "salt": "1.54 g"
    },
    "potassium": "Pending review",
    "phosphate": "Pending review",
    "purines": "Pending review",
    "dietaryNote": "Development estimate requiring individual whole-day review; see guide dossier. No universal stage or dialysis suitability claim.",
    "nutritionBasis": "CoFID ingredient-input estimate",
    "nutritionIncomplete": [],
    "nutritionSourceNote": "Ingredient-input estimates with cited secondary sources. Available carbohydrate by weight, excluding dietary fibre; reconciliation and original references: data/RecipeData/evidence/international-carbohydrates.json. Other nutrient gaps remain explicit.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 1
  ,
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  {
    "id": "mildly-spiced-chicken-kelewele-inspired-bowl",
    "code": "L068",
    "category": "Lunch",
    "mealFamily": "plantain-bowl",
    "cuisine": "ghanaian",
    "emoji": "🍽️",
    "image": "/images/recipes/L068.webp",
    "name": "Mildly spiced chicken kelewele-inspired bowl",
    "description": "Roasted ripe plantain with ginger and warming spices, served with grilled chicken and a tomato and lime relish.",
    "cookingTime": "55 mins",
    "calories": "731 kcal",
    "protein": "35.9 g",
    "equipment": "Kitchen scales, Knife and chopping board, Griddle pan, Oven, Grater, Food thermometer, Baking tray",
    "ingredients": [
      {
        "item": "Ripe plantain flesh",
        "shoppingItem": "Ripe plantain flesh",
        "quantity": "230 g (plantain; raw ripe flesh)"
      },
      {
        "item": "Fresh ginger",
        "shoppingItem": "Fresh ginger",
        "quantity": "7 g (plantain; raw edible input)"
      },
      {
        "item": "Pure cayenne chilli powder",
        "shoppingItem": "Pure cayenne chilli powder",
        "quantity": "0.3 g (plantain; dry)"
      },
      {
        "item": "Ground cloves",
        "shoppingItem": "Ground cloves",
        "quantity": "0.1 g (plantain; dry)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "20 g (plantain; as sold, weighed grams)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.4 g (plantain; dry)"
      },
      {
        "item": "Skinless boneless chicken thigh",
        "shoppingItem": "Skinless boneless chicken thigh",
        "quantity": "150 g (chicken; raw edible input)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "50 g (chicken; raw edible input)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "4 g (chicken; raw edible input)"
      },
      {
        "item": "Fresh ginger",
        "shoppingItem": "Fresh ginger",
        "quantity": "4 g (chicken; raw edible input)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "7.5 g (chicken; as sold, weighed grams)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.35 g (chicken; dry)"
      },
      {
        "item": "Fresh tomato",
        "shoppingItem": "Fresh tomato",
        "quantity": "70 g (finish; raw edible input)"
      },
      {
        "item": "Fresh lime juice",
        "shoppingItem": "Fresh lime juice",
        "quantity": "12.5 g (finish; freshly squeezed, weighed grams)"
      },
      {
        "item": "Fresh coriander leaves",
        "shoppingItem": "Fresh coriander leaves",
        "quantity": "6 g (finish; raw edible input)"
      }
    ],
    "method": [
      "Do not wash raw poultry, and use clean utensils for the cooked food. Choose ripe yellow plantain with black speckles. Peel before weighing 230 g flesh and cut into 2 cm cubes. Toss with grated ginger, cayenne, cloves, 20 g oil and plantain salt.",
      "Roast plantain in a single layer at 220 C conventional or 200 C fan for 25-35 minutes, turning twice, until golden outside and soft inside. Roast with the measured oil rather than deep-frying.",
      "Flatten thigh meat, coat with chicken garlic, ginger, oil and salt, and griddle with onion wedges for 15-20 minutes until the poultry endpoint is met. Bubble all collected chicken juices safely.",
      "Check the centre of the meat with a clean food thermometer: it should reach 75°C for at least 30 seconds.",
      "Chop tomato and coriander with lime. Serve all roasted plantain, chicken, onion, juices and fresh finish in one bowl. Do not replace plantain with banana or assume the green-plantain CoFID entry measures the ripe ingredient."
    ],
    "nutrition": {
      "calories": "731 kcal",
      "protein": "35.9 g",
      "carbohydrates": "75.9 g",
      "fat": "32.9 g",
      "fibre": "7.7 g",
      "sodium": "447 mg",
      "potassium": "2081 mg",
      "phosphate": "285 mg",
      "salt": "1.12 g"
    },
    "potassium": "Pending review",
    "phosphate": "Pending review",
    "purines": "Pending review",
    "dietaryNote": "Development estimate requiring individual whole-day review; see guide dossier. No universal stage or dialysis suitability claim.",
    "nutritionBasis": "CoFID ingredient-input estimate",
    "nutritionIncomplete": [],
    "nutritionSourceNote": "Ingredient-input estimates with cited secondary sources. Available carbohydrate by weight, excluding dietary fibre; reconciliation and original references: data/RecipeData/evidence/international-carbohydrates.json. Other nutrient gaps remain explicit.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 1
  ,
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
{
  "id": "white-bean-and-roasted-pepper-bruschetta",
  "code": "L069",
  "category": "Lunch",
  "cuisine": "Italy",
  "mealFamily": "bread",
  "emoji": "🥗",
  "image": "/images/recipes/L069.webp",
  "name": "White-bean and roasted pepper bruschetta",
  "description": "Toasted bread topped with creamy white beans, roasted peppers and a walnut and parsley dressing.",
  "cookingTime": "25 mins",
  "calories": "554 kcal",
  "protein": "15.5 g",
  "equipment": "Kitchen scales, Knife and chopping board, Mixing bowl, Toaster",
  "ingredients": [
    {
      "item": "Navy beans, boiled without salt and drained",
      "shoppingItem": "Navy beans, boiled without salt and drained",
      "quantity": "90 g (cooked drained edible weight)"
    },
    {
      "item": "White crusty bloomer bread, egg- and dairy-free",
      "shoppingItem": "White crusty bloomer bread, egg- and dairy-free",
      "quantity": "55 g (as sold edible weight)"
    },
    {
      "item": "Red bell pepper",
      "shoppingItem": "Red bell pepper",
      "quantity": "65 g (raw edible input)"
    },
    {
      "item": "Fresh parsley",
      "shoppingItem": "Fresh parsley",
      "quantity": "4 g (raw edible input)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "19 g (as sold, weighed grams)"
    },
    {
      "item": "Garlic",
      "shoppingItem": "Garlic",
      "quantity": "1.3 g (raw edible input)"
    },
    {
      "item": "Fresh lemon juice",
      "shoppingItem": "Fresh lemon juice",
      "quantity": "15 g (freshly squeezed, weighed grams)"
    },
    {
      "item": "Unsalted walnut kernels",
      "shoppingItem": "Unsalted walnut kernels",
      "quantity": "15 g (as sold edible weight)"
    },
    {
      "item": "Ground black pepper",
      "shoppingItem": "Ground black pepper",
      "quantity": "0.3 g (dry)"
    }
  ],
  "method": [
      "Grill the deseeded pepper for 10–12 minutes until tender. Chop it, retaining its juices. Use navy beans previously boiled without salt and drained; weigh the cooked beans. Weigh this ingredient after the cooking and draining described here; the same weight of the dry or raw ingredient would make a different portion.",
      "Mash half the beans with half the oil, the crushed garlic and half the lemon juice. Stir in the remaining beans and roasted pepper.",
      "Toast the bread. Spoon over the beans. Chop the walnuts and parsley, mix with the remaining oil and lemon juice and black pepper, and spoon over the toast. Serve the entire portion."
    ],
  "nutrition": {
    "calories": "554 kcal",
    "protein": "15.5 g",
    "carbohydrates": "44.1 g",
    "fat": "30.9 g",
    "fibre": "13.7 g",
    "sodium": "223 mg",
    "potassium": "694 mg",
    "phosphate": "257 mg",
    "salt": "0.56 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "Vegan",
  "dietCategories": [
    "Vegan",
    "Vegetarian",
    "Blue Zone-inspired"
  ]
},
{
  "id": "courgette-and-ricotta-bake-with-garlic-toast",
  "code": "L070",
  "category": "Lunch",
  "cuisine": "Italy",
  "mealFamily": "bread",
  "emoji": "🥗",
  "image": "/images/recipes/L070.webp",
  "name": "Courgette and ricotta bake with garlic toast",
  "description": "A small courgette and ricotta bake with crunchy walnuts and garlic toast.",
  "cookingTime": "30 mins",
  "calories": "532 kcal",
  "protein": "22.2 g",
  "equipment": "Kitchen scales, Mixing bowl, Oven, Grater, Ovenproof dish",
  "ingredients": [
    {
      "item": "Courgette",
      "shoppingItem": "Courgette",
      "quantity": "90 g (raw edible input)"
    },
    {
      "item": "Vegetarian-rennet ricotta",
      "shoppingItem": "Vegetarian-rennet ricotta",
      "quantity": "65 g (as sold)"
    },
    {
      "item": "Fresh raw egg white, separated from shell eggs",
      "shoppingItem": "Fresh raw egg white, separated from shell eggs",
      "quantity": "75 g (raw edible input)"
    },
    {
      "item": "White crusty bloomer bread, egg- and dairy-free",
      "shoppingItem": "White crusty bloomer bread, egg- and dairy-free",
      "quantity": "45 g (as sold edible weight)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "19 g (as sold, weighed grams)"
    },
    {
      "item": "Unsalted walnut kernels",
      "shoppingItem": "Unsalted walnut kernels",
      "quantity": "15 g (as sold edible weight)"
    },
    {
      "item": "Garlic",
      "shoppingItem": "Garlic",
      "quantity": "3 g (raw edible input)"
    },
    {
      "item": "Fresh lemon juice",
      "shoppingItem": "Fresh lemon juice",
      "quantity": "15 g (freshly squeezed, weighed grams)"
    },
    {
      "item": "Fresh basil",
      "shoppingItem": "Fresh basil",
      "quantity": "4 g (raw edible input)"
    },
    {
      "item": "Ground black pepper",
      "shoppingItem": "Ground black pepper",
      "quantity": "0.3 g (dry)"
    }
  ],
  "method": [
      "Heat the oven to 200°C, or 180°C fan. Finely grate the courgette, retaining its juice. Mix with the ricotta, egg white, torn basil, black pepper and one third of the oil.",
      "Spoon into a small baking dish and scatter over the chopped walnuts. Bake for 18–22 minutes until completely set and steaming hot in the centre. Check the centre as well as the surface; a browned top alone does not show that the inside is cooked.",
      "Brush the bread with another third of the oil and rub with the garlic. Toast under the grill for 2–3 minutes. Mix any remaining garlic with the lemon juice and remaining oil and spoon over the bake. Serve the whole bake and toast.",
      "Use vegetarian-rennet cheese for the vegetarian version specified here."
    ],
  "nutrition": {
    "calories": "532 kcal",
    "protein": "22.2 g",
    "carbohydrates": "26.2 g",
    "fat": "37.4 g",
    "fibre": "3.0 g",
    "sodium": "385 mg",
    "potassium": "672 mg",
    "phosphate": "261 mg",
    "salt": "0.96 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "Vegetarian",
  "dietCategories": [
    "Vegetarian"
  ]
},
{
  "id": "basil-and-walnut-pasta-salad-with-ricotta",
  "code": "L071",
  "category": "Lunch",
  "cuisine": "Italy",
  "mealFamily": "pasta",
  "emoji": "🥗",
  "image": "/images/recipes/L071.webp",
  "name": "Basil and walnut pasta salad with ricotta",
  "description": "Pasta with soft ricotta, sweet peppers and a fresh basil and walnut dressing.",
  "cookingTime": "25 mins",
  "calories": "526 kcal",
  "protein": "14.3 g",
  "equipment": "Kitchen scales, Knife and chopping board, Mixing bowl, Colander or sieve",
  "ingredients": [
    {
      "item": "Egg-free plain dried white wheat pasta",
      "shoppingItem": "Egg-free plain dried white wheat pasta",
      "quantity": "45 g (dry)"
    },
    {
      "item": "Vegetarian-rennet ricotta",
      "shoppingItem": "Vegetarian-rennet ricotta",
      "quantity": "50 g (as sold)"
    },
    {
      "item": "Unsalted walnut kernels",
      "shoppingItem": "Unsalted walnut kernels",
      "quantity": "20 g (as sold edible weight)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "15 g (as sold, weighed grams)"
    },
    {
      "item": "Cucumber",
      "shoppingItem": "Cucumber",
      "quantity": "75 g (raw edible input)"
    },
    {
      "item": "Red bell pepper",
      "shoppingItem": "Red bell pepper",
      "quantity": "50 g (raw edible input)"
    },
    {
      "item": "Fresh basil",
      "shoppingItem": "Fresh basil",
      "quantity": "6 g (raw edible input)"
    },
    {
      "item": "Fresh lemon juice",
      "shoppingItem": "Fresh lemon juice",
      "quantity": "20 g (freshly squeezed, weighed grams)"
    },
    {
      "item": "Garlic",
      "shoppingItem": "Garlic",
      "quantity": "1.3 g (raw edible input)"
    },
    {
      "item": "Ground black pepper",
      "shoppingItem": "Ground black pepper",
      "quantity": "0.3 g (dry)"
    }
  ],
  "method": [
      "Cook the dry pasta shapes in a separate pan of unsalted water according to the packet until tender. Separate the pasta or noodles as they soften so they do not stick together. Check the texture towards the end of the cooking time; it should be tender with no chalky centre. Drain. No nutrient reduction from draining has been assumed.",
      "Finely chop the walnuts, basil and garlic. Keep the nuts together on the board and chop to a similar size. Leave some texture where the recipe uses them as a topping, rather than turning them into a smooth paste. Mix with the oil, lemon juice and pepper. Dice the cucumber and pepper.",
      "Toss all the pasta and vegetables with the dressing. Fold in the ricotta and serve the whole bowl.",
      "Use vegetarian-rennet cheese for the vegetarian version specified here."
    ],
  "nutrition": {
    "calories": "526 kcal",
    "protein": "14.3 g",
    "carbohydrates": "36.5 g",
    "fat": "35.5 g",
    "fibre": "4.7 g",
    "sodium": "57 mg",
    "potassium": "530 mg",
    "phosphate": "277 mg",
    "salt": "0.14 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "Vegetarian",
  "dietCategories": [
    "Vegetarian"
  ]
},
{
  "id": "white-bean-and-cumin-patties-with-lemon-slaw",
  "code": "L072",
  "category": "Lunch",
  "cuisine": "North Africa",
  "mealFamily": "cakes",
  "emoji": "🥗",
  "image": "/images/recipes/L072.webp",
  "name": "White-bean and cumin patties with lemon slaw",
  "description": "Golden white-bean patties with cumin and coriander, served with creamy lemon slaw.",
  "cookingTime": "30 mins",
  "calories": "545 kcal",
  "protein": "12.4 g",
  "equipment": "Kitchen scales, Knife and chopping board, Mixing bowl, Frying pan",
  "ingredients": [
    {
      "item": "Navy beans, boiled without salt and drained",
      "shoppingItem": "Navy beans, boiled without salt and drained",
      "quantity": "100 g (cooked drained edible weight)"
    },
    {
      "item": "Plain white flour",
      "shoppingItem": "Plain white flour",
      "quantity": "25 g (dry)"
    },
    {
      "item": "White cabbage",
      "shoppingItem": "White cabbage",
      "quantity": "90 g (raw edible input)"
    },
    {
      "item": "Carrot",
      "shoppingItem": "Carrot",
      "quantity": "25 g (raw edible input)"
    },
    {
      "item": "Onion",
      "shoppingItem": "Onion",
      "quantity": "15 g (raw edible input)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "19 g (as sold, weighed grams)"
    },
    {
      "item": "Standard mayonnaise",
      "shoppingItem": "Standard mayonnaise",
      "quantity": "15 g (as sold)"
    },
    {
      "item": "Fresh coriander leaves",
      "shoppingItem": "Fresh coriander leaves",
      "quantity": "4 g (raw edible input)"
    },
    {
      "item": "Fresh lemon juice",
      "shoppingItem": "Fresh lemon juice",
      "quantity": "20 g (freshly squeezed, weighed grams)"
    },
    {
      "item": "Ground cumin",
      "shoppingItem": "Ground cumin",
      "quantity": "1.3 g (dry)"
    },
    {
      "item": "Ground black pepper",
      "shoppingItem": "Ground black pepper",
      "quantity": "0.3 g (dry)"
    }
  ],
  "method": [
      "Use navy beans previously boiled without salt and drained. Mash them, then mix with the flour, very finely chopped onion, cumin, chopped coriander and pepper. Form three thin patties.",
      "Heat the oil in a non-stick pan. Cook the patties over medium heat for 4–5 minutes per side until firm and steaming hot throughout, using all the oil across the batches. Leave space between the portions and let the underside set before moving them. Slide a thin spatula underneath and turn carefully, keeping each portion together.",
      "Shred the cabbage and carrot. Mix the mayonnaise and lemon juice, toss with the vegetables and serve the whole slaw with all three patties."
    ],
  "nutrition": {
    "calories": "545 kcal",
    "protein": "12.4 g",
    "carbohydrates": "42.5 g",
    "fat": "31.7 g",
    "fibre": "15.9 g",
    "sodium": "38 mg",
    "potassium": "777 mg",
    "phosphate": "215 mg",
    "salt": "0.09 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "Vegetarian",
  "dietCategories": [
    "Vegetarian",
    "Mediterranean-style"
  ]
},
{
  "id": "chickpea-and-carrot-flatbread-with-walnut-dressing",
  "code": "L073",
  "category": "Lunch",
  "cuisine": "Morocco",
  "mealFamily": "bread",
  "emoji": "🥗",
  "image": "/images/recipes/L073.webp",
  "name": "Chickpea and carrot flatbread with walnut dressing",
  "description": "A warm chickpea and carrot flatbread with crunchy cabbage and lemony walnut dressing.",
  "cookingTime": "30 mins",
  "calories": "537 kcal",
  "protein": "14.0 g",
  "equipment": "Kitchen scales, Knife and chopping board, Mixing bowl, Frying pan, Lid or bowl cover",
  "ingredients": [
    {
      "item": "Chickpeas, boiled without salt and drained",
      "shoppingItem": "Chickpeas, boiled without salt and drained",
      "quantity": "90 g (cooked drained edible weight)"
    },
    {
      "item": "Carrot",
      "shoppingItem": "Carrot",
      "quantity": "50 g (raw edible input)"
    },
    {
      "item": "Plain white flour",
      "shoppingItem": "Plain white flour",
      "quantity": "30 g (dry)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "25 g (weighed grams)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "19 g (as sold, weighed grams)"
    },
    {
      "item": "White cabbage",
      "shoppingItem": "White cabbage",
      "quantity": "65 g (raw edible input)"
    },
    {
      "item": "Fresh lemon juice",
      "shoppingItem": "Fresh lemon juice",
      "quantity": "20 g (freshly squeezed, weighed grams)"
    },
    {
      "item": "Ground cumin",
      "shoppingItem": "Ground cumin",
      "quantity": "1.3 g (dry)"
    },
    {
      "item": "Unsalted walnut kernels",
      "shoppingItem": "Unsalted walnut kernels",
      "quantity": "15 g (as sold edible weight)"
    },
    {
      "item": "Fresh parsley",
      "shoppingItem": "Fresh parsley",
      "quantity": "5 g (raw edible input)"
    },
    {
      "item": "Ground black pepper",
      "shoppingItem": "Ground black pepper",
      "quantity": "0.3 g (dry)"
    }
  ],
  "method": [
      "Mix the flour with the measured water to make a dough. Scrape dry patches from the bowl into the mixture and work them in with your hands. Knead briefly, cover and rest for 10 minutes. Roll between non-stick sheets without extra flour.",
      "Finely dice the carrot. Cook it in one third of the oil in a covered non-stick pan for 8–10 minutes over low heat. Stir in the cumin and cooked, drained chickpeas, cover and heat through.",
      "Dry-cook the flatbread in a separate hot pan for 2–3 minutes per side until cooked throughout. Finely shred the cabbage and chop the walnuts and parsley. Keep the nuts together on the board and chop to a similar size. Leave some texture where the recipe uses them as a topping, rather than turning them into a smooth paste.",
      "Mix the remaining oil and lemon juice with the walnuts, parsley and pepper. Serve all the chickpeas, carrot and cabbage on the whole flatbread with all the dressing."
    ],
  "nutrition": {
    "calories": "537 kcal",
    "protein": "14.0 g",
    "carbohydrates": "45.4 g",
    "fat": "33.0 g",
    "fibre": "16.1 g",
    "sodium": "26 mg",
    "potassium": "701 mg",
    "phosphate": "255 mg",
    "salt": "0.06 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "Vegan",
  "dietCategories": [
    "Vegan",
    "Vegetarian",
    "Mediterranean-style"
  ]
},
{
  "id": "egg-and-mustard-pasta-salad",
  "code": "L074",
  "category": "Lunch",
  "cuisine": "Britain",
  "mealFamily": "pasta",
  "emoji": "🥗",
  "image": "/images/recipes/L074.webp",
  "name": "Egg and mustard pasta salad",
  "description": "A creamy egg and pasta salad with cucumber, peppers, chives and mustard.",
  "cookingTime": "25 mins",
  "calories": "483 kcal",
  "protein": "19.6 g",
  "equipment": "Kitchen scales, Knife and chopping board, Mixing bowl, Frying pan, Saucepan, Colander or sieve",
  "ingredients": [
    {
      "item": "Egg-free plain dried white wheat pasta",
      "shoppingItem": "Egg-free plain dried white wheat pasta",
      "quantity": "40 g (dry)"
    },
    {
      "item": "Whole egg, shell removed",
      "shoppingItem": "Whole egg, shell removed",
      "quantity": "50 g (raw edible input)"
    },
    {
      "item": "Fresh raw egg white, separated from shell eggs",
      "shoppingItem": "Fresh raw egg white, separated from shell eggs",
      "quantity": "65 g (raw edible input)"
    },
    {
      "item": "Standard mayonnaise",
      "shoppingItem": "Standard mayonnaise",
      "quantity": "25 g (as sold)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "6 g (as sold, weighed grams)"
    },
    {
      "item": "Cucumber",
      "shoppingItem": "Cucumber",
      "quantity": "75 g (raw edible input)"
    },
    {
      "item": "Red bell pepper",
      "shoppingItem": "Red bell pepper",
      "quantity": "50 g (raw edible input)"
    },
    {
      "item": "Fresh chives",
      "shoppingItem": "Fresh chives",
      "quantity": "4 g (raw edible input)"
    },
    {
      "item": "Mustard seeds",
      "shoppingItem": "Mustard seeds",
      "quantity": "0.6 g (dry)"
    },
    {
      "item": "Fresh lemon juice",
      "shoppingItem": "Fresh lemon juice",
      "quantity": "15 g (freshly squeezed, weighed grams)"
    },
    {
      "item": "Ground black pepper",
      "shoppingItem": "Ground black pepper",
      "quantity": "0.3 g (dry)"
    }
  ],
  "method": [
      "Boil the whole egg for 10 minutes, cool, peel and chop. The listed egg weight excludes the shell. Cook the pasta in a separate pan of unsalted water according to the packet and drain. Separate the pasta or noodles as they soften so they do not stick together. Check the texture towards the end of the cooking time; it should be tender with no chalky centre.",
      "Brush a small non-stick pan with half the oil. Pour in the weighed egg white and cook as a thin pancake for 2–3 minutes per side until fully set. Leave space between the portions and let the underside set before moving them. Slide a thin spatula underneath and turn carefully, keeping each portion together. Slice into ribbons.",
      "Crush or grind the mustard seeds. Mix with the mayonnaise, lemon juice, remaining oil, chives and pepper. Toss with all the pasta, egg, egg-white ribbons, diced cucumber and pepper. Serve the entire salad."
    ],
  "nutrition": {
    "calories": "483 kcal",
    "protein": "19.6 g",
    "carbohydrates": "31.7 g",
    "fat": "30.6 g",
    "fibre": "3.2 g",
    "sodium": "235 mg",
    "potassium": "528 mg",
    "phosphate": "208 mg",
    "salt": "0.59 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "Vegetarian",
  "dietCategories": [
    "Vegetarian",
    "Mediterranean-style"
  ]
},
{
  "id": "pepper-and-herb-frittata-with-toasted-bread",
  "code": "L075",
  "category": "Lunch",
  "cuisine": "Italy",
  "mealFamily": "bread",
  "emoji": "🥗",
  "image": "/images/recipes/L075.webp",
  "name": "Pepper and herb frittata with toasted bread",
  "description": "A pepper and mozzarella frittata with basil and crisp toasted bread.",
  "cookingTime": "30 mins",
  "calories": "488 kcal",
  "protein": "29.5 g",
  "equipment": "Kitchen scales, Knife and chopping board, Mixing bowl, Fork or whisk, Frying pan, Oven, Baking tray",
  "ingredients": [
    {
      "item": "Whole egg, shell removed",
      "shoppingItem": "Whole egg, shell removed",
      "quantity": "50 g (raw edible input)"
    },
    {
      "item": "Fresh raw egg white, separated from shell eggs",
      "shoppingItem": "Fresh raw egg white, separated from shell eggs",
      "quantity": "125 g (raw edible input)"
    },
    {
      "item": "Vegetarian-rennet fresh mozzarella",
      "shoppingItem": "Vegetarian-rennet fresh mozzarella",
      "quantity": "25 g (as sold edible weight)"
    },
    {
      "item": "Red bell pepper",
      "shoppingItem": "Red bell pepper",
      "quantity": "65 g (raw edible input)"
    },
    {
      "item": "Onion",
      "shoppingItem": "Onion",
      "quantity": "20 g (raw edible input)"
    },
    {
      "item": "White crusty bloomer bread, egg- and dairy-free",
      "shoppingItem": "White crusty bloomer bread, egg- and dairy-free",
      "quantity": "45 g (as sold edible weight)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "19 g (as sold, weighed grams)"
    },
    {
      "item": "Fresh basil",
      "shoppingItem": "Fresh basil",
      "quantity": "4 g (raw edible input)"
    },
    {
      "item": "Ground black pepper",
      "shoppingItem": "Ground black pepper",
      "quantity": "0.3 g (dry)"
    }
  ],
  "method": [
      "Heat the oven to 200°C, or 180°C fan. Finely chop the onion and pepper. Cook in two thirds of the oil in a small ovenproof frying pan for 6–8 minutes.",
      "Beat the whole egg and weighed egg white with the torn basil and black pepper. Pour over the vegetables and scatter over all the diced mozzarella.",
      "Bake for 12–15 minutes until the centre is completely set. Check the centre as well as the surface; a browned top alone does not show that the inside is cooked. Brush the bread with the remaining oil, toast and serve with the whole frittata.",
      "Use vegetarian-rennet cheese for the vegetarian version specified here."
    ],
  "nutrition": {
    "calories": "488 kcal",
    "protein": "29.5 g",
    "carbohydrates": "26.1 g",
    "fat": "29.5 g",
    "fibre": "3.3 g",
    "sodium": "589 mg",
    "potassium": "516 mg",
    "phosphate": "233 mg",
    "salt": "1.47 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "Vegetarian",
  "dietCategories": [
    "Vegetarian"
  ]
},
{
  "id": "black-bean-and-sweetcorn-cakes-with-lime-slaw",
  "code": "L076",
  "category": "Lunch",
  "cuisine": "Brazil",
  "mealFamily": "cakes",
  "emoji": "🥗",
  "image": "/images/recipes/L076.webp",
  "name": "Black-bean and sweetcorn cakes with lime slaw",
  "description": "Crisp black-bean and corn cakes with a fresh cabbage and lime salad.",
  "cookingTime": "30 mins",
  "calories": "502 kcal",
  "protein": "12.5 g",
  "equipment": "Kitchen scales, Knife and chopping board, Mixing bowl, Frying pan",
  "ingredients": [
    {
      "item": "Black beans, boiled without salt and drained",
      "shoppingItem": "Black beans, boiled without salt and drained",
      "quantity": "90 g (cooked drained edible weight)"
    },
    {
      "item": "White masa harina, unenriched",
      "shoppingItem": "White masa harina, unenriched",
      "quantity": "30 g (dry edible input)"
    },
    {
      "item": "Frozen sweetcorn kernels",
      "shoppingItem": "Frozen sweetcorn kernels",
      "quantity": "25 g (frozen uncooked input)"
    },
    {
      "item": "White cabbage",
      "shoppingItem": "White cabbage",
      "quantity": "50 g (raw edible input)"
    },
    {
      "item": "Onion",
      "shoppingItem": "Onion",
      "quantity": "20 g (raw edible input)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "25 g (as sold, weighed grams)"
    },
    {
      "item": "Fresh tomato",
      "shoppingItem": "Fresh tomato",
      "quantity": "25 g (raw edible input)"
    },
    {
      "item": "Fresh lime juice",
      "shoppingItem": "Fresh lime juice",
      "quantity": "20 g (freshly squeezed, weighed grams)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "45 g (weighed grams)"
    },
    {
      "item": "Ground cumin",
      "shoppingItem": "Ground cumin",
      "quantity": "0.6 g (dry)"
    },
    {
      "item": "Fresh coriander leaves",
      "shoppingItem": "Fresh coriander leaves",
      "quantity": "4 g (raw edible input)"
    }
  ],
  "method": [
      "Use black beans previously boiled without salt and drained. Mash them and mix with the masa harina, sweetcorn, finely chopped onion, cumin and 20 g of the measured water. Form three thin cakes.",
      "Heat three quarters of the oil in a non-stick pan. Cook the cakes over medium-low heat for 5–6 minutes per side until firm, fully cooked and steaming hot. Leave space between the portions and let the underside set before moving them. Slide a thin spatula underneath and turn carefully, keeping each portion together.",
      "Shred the cabbage and dice the tomato. Mix the lime juice, remaining oil, remaining 25 g water and chopped coriander into a dressing. Serve all the cakes with all the slaw and dressing."
    ],
  "nutrition": {
    "calories": "502 kcal",
    "protein": "12.5 g",
    "carbohydrates": "44.5 g",
    "fat": "27.0 g",
    "fibre": "12.7 g",
    "sodium": "13 mg",
    "potassium": "702 mg",
    "phosphate": "242 mg",
    "salt": "0.03 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "Vegan",
  "dietCategories": [
    "Vegan",
    "Vegetarian",
    "Mediterranean-style",
    "Blue Zone-inspired"
  ]
},
{
  "id": "buckwheat-galette-with-mushrooms-and-walnuts",
  "code": "L077",
  "category": "Lunch",
  "cuisine": "France",
  "mealFamily": "bread",
  "emoji": "🥗",
  "image": "/images/recipes/L077.webp",
  "name": "Buckwheat galette with mushrooms and walnuts",
  "description": "A buckwheat pancake filled with mushrooms, leeks, ricotta and toasted walnuts.",
  "cookingTime": "35 mins",
  "calories": "575 kcal",
  "protein": "19.6 g",
  "equipment": "Kitchen scales, Knife and chopping board, Mixing bowl, Fork or whisk, Frying pan",
  "ingredients": [
    {
      "item": "Whole-groat buckwheat flour",
      "shoppingItem": "Whole-groat buckwheat flour",
      "quantity": "40 g (dry edible input)"
    },
    {
      "item": "Plain white flour",
      "shoppingItem": "Plain white flour",
      "quantity": "20 g (dry)"
    },
    {
      "item": "Fresh raw egg white, separated from shell eggs",
      "shoppingItem": "Fresh raw egg white, separated from shell eggs",
      "quantity": "50 g (raw edible input)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "95 g (weighed grams)"
    },
    {
      "item": "Leek, trimmed edible portion",
      "shoppingItem": "Leek, trimmed edible portion",
      "quantity": "50 g (raw edible input)"
    },
    {
      "item": "White mushrooms",
      "shoppingItem": "White mushrooms",
      "quantity": "50 g (raw edible input)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "19 g (as sold, weighed grams)"
    },
    {
      "item": "Vegetarian-rennet ricotta",
      "shoppingItem": "Vegetarian-rennet ricotta",
      "quantity": "40 g (as sold)"
    },
    {
      "item": "Fresh lemon juice",
      "shoppingItem": "Fresh lemon juice",
      "quantity": "6 g (freshly squeezed, weighed grams)"
    },
    {
      "item": "Unsalted walnut kernels",
      "shoppingItem": "Unsalted walnut kernels",
      "quantity": "15 g (as sold edible weight)"
    },
    {
      "item": "Dried thyme",
      "shoppingItem": "Dried thyme",
      "quantity": "0.6 g (dry)"
    },
    {
      "item": "Ground black pepper",
      "shoppingItem": "Ground black pepper",
      "quantity": "0.3 g (dry)"
    }
  ],
  "method": [
      "Whisk both flours with the egg white and measured water. Rest for 10 minutes. Slice the leek and mushrooms.",
      "Cook the vegetables in two thirds of the oil with the thyme and pepper for 8–10 minutes, retaining their juices. Stir around the base and edges of the pan. The vegetables should soften and lose their raw bite; lower the heat if they start to darken before they are tender. Stir in the ricotta and lemon juice off the heat.",
      "Brush a 24 cm non-stick pan with the remaining oil. Pour in the batter, swirl thinly and cook for 3–4 minutes, then turn and cook for another 2 minutes until fully set.",
      "Spoon over all the filling and chopped walnuts, fold in the sides and warm for 1–2 minutes. Serve the whole galette.",
      "Use vegetarian-rennet cheese for the vegetarian version specified here."
    ],
  "nutrition": {
    "calories": "575 kcal",
    "protein": "19.6 g",
    "carbohydrates": "42.8 g",
    "fat": "35.4 g",
    "fibre": "7.9 g",
    "sodium": "145 mg",
    "potassium": "772 mg",
    "phosphate": "349 mg",
    "salt": "0.36 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "Vegetarian",
  "dietCategories": [
    "Vegetarian"
  ]
},
{
  "id": "chickpea-and-egg-salad-with-crisp-croutons",
  "code": "L078",
  "category": "Lunch",
  "cuisine": "Portugal",
  "mealFamily": "salad",
  "emoji": "🥗",
  "image": "/images/recipes/L078.webp",
  "name": "Chickpea and egg salad with crisp croutons",
  "description": "Chickpeas and chopped egg with cucumber, parsley and crisp olive-oil croutons.",
  "cookingTime": "25 mins",
  "calories": "468 kcal",
  "protein": "24.6 g",
  "equipment": "Kitchen scales, Knife and chopping board, Mixing bowl, Frying pan, Saucepan",
  "ingredients": [
    {
      "item": "Chickpeas, boiled without salt and drained",
      "shoppingItem": "Chickpeas, boiled without salt and drained",
      "quantity": "90 g (cooked drained edible weight)"
    },
    {
      "item": "Whole egg, shell removed",
      "shoppingItem": "Whole egg, shell removed",
      "quantity": "50 g (raw edible input)"
    },
    {
      "item": "Fresh raw egg white, separated from shell eggs",
      "shoppingItem": "Fresh raw egg white, separated from shell eggs",
      "quantity": "65 g (raw edible input)"
    },
    {
      "item": "Cucumber",
      "shoppingItem": "Cucumber",
      "quantity": "65 g (raw edible input)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "19 g (as sold, weighed grams)"
    },
    {
      "item": "White crusty bloomer bread, egg- and dairy-free",
      "shoppingItem": "White crusty bloomer bread, egg- and dairy-free",
      "quantity": "30 g (as sold edible weight)"
    },
    {
      "item": "Fresh parsley",
      "shoppingItem": "Fresh parsley",
      "quantity": "6 g (raw edible input)"
    },
    {
      "item": "Fresh lemon juice",
      "shoppingItem": "Fresh lemon juice",
      "quantity": "20 g (freshly squeezed, weighed grams)"
    },
    {
      "item": "Ground black pepper",
      "shoppingItem": "Ground black pepper",
      "quantity": "0.3 g (dry)"
    }
  ],
  "method": [
      "Boil the whole egg for 10 minutes, cool and peel. Use chickpeas previously boiled without salt and drained. Dice the cucumber and chop the parsley.",
      "Cut the bread into cubes and toast in one third of the oil in a non-stick pan until crisp. Set aside. Cook the weighed egg white in the same pan with another third of the oil as a thin pancake until fully set, then chop. Leave space between the portions and let the underside set before moving them. Slide a thin spatula underneath and turn carefully, keeping each portion together.",
      "Mix the remaining oil with the lemon juice and pepper. Toss with all the chickpeas, cucumber, parsley and chopped eggs. Scatter over all the croutons and serve."
    ],
  "nutrition": {
    "calories": "468 kcal",
    "protein": "24.6 g",
    "carbohydrates": "30.7 g",
    "fat": "27.1 g",
    "fibre": "11.2 g",
    "sodium": "323 mg",
    "potassium": "640 mg",
    "phosphate": "272 mg",
    "salt": "0.81 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "Vegetarian",
  "dietCategories": [
    "Vegetarian"
  ]
},
{
  "id": "potato-and-chive-cakes-with-herb-mayonnaise",
  "code": "L079",
  "category": "Lunch",
  "cuisine": "Britain",
  "mealFamily": "cakes",
  "emoji": "🥗",
  "image": "/images/recipes/L079.webp",
  "name": "Potato and chive cakes with herb mayonnaise",
  "description": "Soft potato and chive cakes with a crisp outside, cucumber and herb mayonnaise.",
  "cookingTime": "30 mins",
  "calories": "553 kcal",
  "protein": "11.0 g",
  "equipment": "Kitchen scales, Mixing bowl, Frying pan",
  "ingredients": [
    {
      "item": "Peeled potato, boiled in unsalted water and drained",
      "shoppingItem": "Peeled potato, boiled in unsalted water and drained",
      "quantity": "75 g (cooked drained edible weight)"
    },
    {
      "item": "White rice flour",
      "shoppingItem": "White rice flour",
      "quantity": "40 g (dry edible input)"
    },
    {
      "item": "Fresh raw egg white, separated from shell eggs",
      "shoppingItem": "Fresh raw egg white, separated from shell eggs",
      "quantity": "50 g (raw edible input)"
    },
    {
      "item": "Leek, trimmed edible portion",
      "shoppingItem": "Leek, trimmed edible portion",
      "quantity": "40 g (raw edible input)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "19 g (as sold, weighed grams)"
    },
    {
      "item": "Standard mayonnaise",
      "shoppingItem": "Standard mayonnaise",
      "quantity": "20 g (as sold)"
    },
    {
      "item": "Cucumber",
      "shoppingItem": "Cucumber",
      "quantity": "65 g (raw edible input)"
    },
    {
      "item": "Fresh chives",
      "shoppingItem": "Fresh chives",
      "quantity": "4 g (raw edible input)"
    },
    {
      "item": "Fresh lemon juice",
      "shoppingItem": "Fresh lemon juice",
      "quantity": "20 g (freshly squeezed, weighed grams)"
    },
    {
      "item": "Ground black pepper",
      "shoppingItem": "Ground black pepper",
      "quantity": "0.3 g (dry)"
    }
  ],
  "method": [
      "Use peeled potato already boiled in unsalted water and drained; weigh 75 g after cooking. Weigh this ingredient after the cooking and draining described here; the same weight of the dry or raw ingredient would make a different portion. Mash and cool, then mix with the rice flour, egg white, finely sliced leek, half the chives and pepper. Rest for 5 minutes.",
      "Form three thin cakes. Heat the oil in a non-stick pan and cook over medium-low heat for 5–6 minutes per side until the leeks are tender and the centres are cooked through. Use all the oil across the batches.",
      "Mix the mayonnaise, lemon juice and remaining chives. Serve all the cakes with sliced cucumber and all the mayonnaise."
    ],
  "nutrition": {
    "calories": "553 kcal",
    "protein": "11.0 g",
    "carbohydrates": "44.5 g",
    "fat": "34.8 g",
    "fibre": "4.0 g",
    "sodium": "124 mg",
    "potassium": "680 mg",
    "phosphate": "111 mg",
    "salt": "0.31 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "Vegetarian",
  "dietCategories": [
    "Vegetarian",
    "Mediterranean-style"
  ]
},
{
  "id": "cabbage-mushroom-and-white-bean-pierogi",
  "code": "L080",
  "category": "Lunch",
  "cuisine": "Poland",
  "mealFamily": "pasta",
  "emoji": "🥗",
  "image": "/images/recipes/L080.webp",
  "name": "Cabbage, mushroom and white-bean pierogi",
  "description": "Hand-folded dumplings with cabbage, mushrooms, white beans and ricotta.",
  "cookingTime": "60 mins",
  "calories": "569 kcal",
  "protein": "14.6 g",
  "equipment": "Kitchen scales, Knife and chopping board, Mixing bowl, Saucepan, Rolling pin, Lid or bowl cover",
  "ingredients": [
    {
      "item": "Plain white flour",
      "shoppingItem": "Plain white flour",
      "quantity": "55 g (dry)"
    },
    {
      "item": "Vegetarian-rennet ricotta",
      "shoppingItem": "Vegetarian-rennet ricotta",
      "quantity": "30 g (as sold)"
    },
    {
      "item": "Navy beans, boiled without salt and drained",
      "shoppingItem": "Navy beans, boiled without salt and drained",
      "quantity": "65 g (cooked drained edible weight)"
    },
    {
      "item": "White cabbage",
      "shoppingItem": "White cabbage",
      "quantity": "65 g (raw edible input)"
    },
    {
      "item": "White mushrooms",
      "shoppingItem": "White mushrooms",
      "quantity": "40 g (raw edible input)"
    },
    {
      "item": "Onion",
      "shoppingItem": "Onion",
      "quantity": "20 g (raw edible input)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "19 g (as sold, weighed grams)"
    },
    {
      "item": "Unsalted butter",
      "shoppingItem": "Unsalted butter",
      "quantity": "6 g (as sold)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "45 g (weighed grams)"
    },
    {
      "item": "Ground black pepper",
      "shoppingItem": "Ground black pepper",
      "quantity": "0.3 g (dry)"
    }
  ],
  "method": [
      "Mix 50 g of the flour with 30 g of the water and one third of the oil. Knead for 5 minutes, cover and rest for 15 minutes. Scrape dry patches from the bowl into the mixture and work them in with your hands.",
      "Finely chop the cabbage, mushrooms and onion. Cook in the remaining oil and remaining 15 g water for 10–12 minutes until tender. Mash in the cooked, drained navy beans and ricotta. Mix the remaining 5 g flour with the filling and cook for 2 minutes to thicken; season with pepper and cool.",
      "Stir around the base and edges of the pan. The vegetables should soften and lose their raw bite; lower the heat if they start to darken before they are tender.",
      "Roll the dough between non-stick sheets without extra flour. Cut six circles. Divide all the filling among them, fold and pinch the edges firmly. Keep the filling away from the joining edge and press the dough surfaces directly together. Check for open gaps before cooking so that the filling stays inside.",
      "Poach in a separate pan of unsalted water for 3–4 minutes after the dumplings float, checking the dough is fully cooked. Lift out, turn in the melted butter and serve all six with any loose filling.",
      "Use vegetarian-rennet cheese for the vegetarian version specified here."
    ],
  "nutrition": {
    "calories": "569 kcal",
    "protein": "14.6 g",
    "carbohydrates": "56.1 g",
    "fat": "28.6 g",
    "fibre": "11.8 g",
    "sodium": "40 mg",
    "potassium": "714 mg",
    "phosphate": "268 mg",
    "salt": "0.10 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "Vegetarian",
  "dietCategories": [
    "Vegetarian"
  ]
},
{
  "id": "carrot-and-coriander-soup-with-toast",
  "code": "L081",
  "category": "Lunch",
  "cuisine": "Britain",
  "mealFamily": "soup",
  "emoji": "🥗",
  "image": "/images/recipes/L081.webp",
  "name": "Carrot and coriander soup with toast",
  "description": "A smooth carrot soup with coriander, a little coconut and warm toast.",
  "cookingTime": "30 mins",
  "calories": "509 kcal",
  "protein": "10.7 g",
  "equipment": "Kitchen scales, Knife and chopping board, Toaster, Saucepan, Blender or food processor, Lid or bowl cover",
  "ingredients": [
    {
      "item": "Carrot",
      "shoppingItem": "Carrot",
      "quantity": "100 g (raw edible input)"
    },
    {
      "item": "Onion",
      "shoppingItem": "Onion",
      "quantity": "25 g (raw edible input)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "250 g (weighed grams)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "13 g (as sold, weighed grams)"
    },
    {
      "item": "Unsweetened desiccated coconut",
      "shoppingItem": "Unsweetened desiccated coconut",
      "quantity": "20 g (dry edible input)"
    },
    {
      "item": "White crusty bloomer bread, egg- and dairy-free",
      "shoppingItem": "White crusty bloomer bread, egg- and dairy-free",
      "quantity": "75 g (as sold edible weight)"
    },
    {
      "item": "Plain full-fat Greek-style yoghurt, about 10% fat",
      "shoppingItem": "Plain full-fat Greek-style yoghurt, about 10% fat",
      "quantity": "30 g (as sold edible weight)"
    },
    {
      "item": "Fresh coriander leaves",
      "shoppingItem": "Fresh coriander leaves",
      "quantity": "5 g (raw edible input)"
    },
    {
      "item": "Ground cumin",
      "shoppingItem": "Ground cumin",
      "quantity": "0.6 g (dry)"
    },
    {
      "item": "Ground black pepper",
      "shoppingItem": "Ground black pepper",
      "quantity": "0.3 g (dry)"
    }
  ],
  "method": [
      "Finely slice the onion and carrot. Soften the onion in the oil in a small covered pan for 4 minutes. Stir around the base and edges of the pan. The vegetables should soften and lose their raw bite; lower the heat if they start to darken before they are tender. Stir in the cumin, carrot, desiccated coconut and measured water.",
      "Cover and simmer for 18–20 minutes until the carrot is tender. Look for small, gentle bubbles rather than a rolling boil. Stir along the bottom when needed to prevent sticking, and keep the heat low enough for the food to cook evenly. Add the coriander and blend the entire contents until smooth.",
      "Stir in the Greek-style yoghurt and pepper off the heat. Toast the bread and serve it with all the soup. Measure the finished soup volume if tracking a fluid allowance."
    ],
  "nutrition": {
    "calories": "509 kcal",
    "protein": "10.7 g",
    "carbohydrates": "48.1 g",
    "fat": "30.2 g",
    "fibre": "10.1 g",
    "sodium": "367 mg",
    "potassium": "542 mg",
    "phosphate": "168 mg",
    "salt": "0.92 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "Vegetarian",
  "dietCategories": [
    "Vegetarian"
  ]
},
{
  "id": "creamy-mushroom-spaghetti-with-walnuts",
  "code": "L082",
  "category": "Lunch",
  "cuisine": "Italy",
  "mealFamily": "pasta",
  "emoji": "🥗",
  "image": "/images/recipes/L082.webp",
  "name": "Creamy mushroom spaghetti with walnuts",
  "description": "Spaghetti in a creamy mushroom sauce with sweet peppers and chopped walnuts.",
  "cookingTime": "30 mins",
  "calories": "531 kcal",
  "protein": "11.9 g",
  "equipment": "Kitchen scales, Knife and chopping board, Saucepan, Colander or sieve",
  "ingredients": [
    {
      "item": "Egg-free plain dried white wheat pasta",
      "shoppingItem": "Egg-free plain dried white wheat pasta",
      "quantity": "50 g (dry)"
    },
    {
      "item": "White mushrooms",
      "shoppingItem": "White mushrooms",
      "quantity": "65 g (raw edible input)"
    },
    {
      "item": "Red bell pepper",
      "shoppingItem": "Red bell pepper",
      "quantity": "50 g (raw edible input)"
    },
    {
      "item": "Onion",
      "shoppingItem": "Onion",
      "quantity": "20 g (raw edible input)"
    },
    {
      "item": "Plain full-fat Greek-style yoghurt, about 10% fat",
      "shoppingItem": "Plain full-fat Greek-style yoghurt, about 10% fat",
      "quantity": "45 g (as sold edible weight)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "19 g (as sold, weighed grams)"
    },
    {
      "item": "Unsalted walnut kernels",
      "shoppingItem": "Unsalted walnut kernels",
      "quantity": "15 g (as sold edible weight)"
    },
    {
      "item": "Fresh lemon juice",
      "shoppingItem": "Fresh lemon juice",
      "quantity": "15 g (freshly squeezed, weighed grams)"
    },
    {
      "item": "Fresh parsley",
      "shoppingItem": "Fresh parsley",
      "quantity": "4 g (raw edible input)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "40 g (weighed grams)"
    },
    {
      "item": "Ground black pepper",
      "shoppingItem": "Ground black pepper",
      "quantity": "0.3 g (dry)"
    }
  ],
  "method": [
      "Cook the dry white spaghetti in a separate pan of unsalted water according to the packet and drain. Separate the pasta or noodles as they soften so they do not stick together. Check the texture towards the end of the cooking time; it should be tender with no chalky centre.",
      "Finely slice the onion, mushrooms and pepper. Cook in the oil for 7–8 minutes. Add the measured water and simmer for 2 minutes. Look for small, gentle bubbles rather than a rolling boil. Stir along the bottom when needed to prevent sticking, and keep the heat low enough for the food to cook evenly.",
      "Take off the heat. Stir in the Greek-style yoghurt, lemon juice, parsley, walnuts and pepper. Toss through all the pasta and warm gently without boiling. Serve the whole portion."
    ],
  "nutrition": {
    "calories": "531 kcal",
    "protein": "11.9 g",
    "carbohydrates": "41.3 g",
    "fat": "35.0 g",
    "fibre": "4.9 g",
    "sodium": "39 mg",
    "potassium": "701 mg",
    "phosphate": "290 mg",
    "salt": "0.10 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "Vegetarian",
  "dietCategories": [
    "Vegetarian"
  ]
},
{
  "id": "crisp-rice-pancakes-with-cabbage-and-peanut-dressing",
  "code": "L083",
  "category": "Lunch",
  "cuisine": "India",
  "mealFamily": "cakes",
  "emoji": "🥗",
  "image": "/images/recipes/L083.webp",
  "name": "Crisp rice pancakes with cabbage and peanut dressing",
  "description": "Thin rice pancakes filled with chickpeas and cabbage, with a tangy peanut dressing.",
  "cookingTime": "40 mins",
  "calories": "519 kcal",
  "protein": "12.2 g",
  "equipment": "Kitchen scales, Knife and chopping board, Mixing bowl, Fork or whisk, Frying pan, Blender or food processor, Second frying pan",
  "ingredients": [
    {
      "item": "White rice flour",
      "shoppingItem": "White rice flour",
      "quantity": "45 g (dry edible input)"
    },
    {
      "item": "Unsalted dry-roasted peanuts",
      "shoppingItem": "Unsalted dry-roasted peanuts",
      "quantity": "15 g (as sold edible weight)"
    },
    {
      "item": "Chickpeas, boiled without salt and drained",
      "shoppingItem": "Chickpeas, boiled without salt and drained",
      "quantity": "50 g (cooked drained edible weight)"
    },
    {
      "item": "White cabbage",
      "shoppingItem": "White cabbage",
      "quantity": "75 g (raw edible input)"
    },
    {
      "item": "Onion",
      "shoppingItem": "Onion",
      "quantity": "20 g (raw edible input)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "125 g (weighed grams)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "19 g (as sold, weighed grams)"
    },
    {
      "item": "Fresh lime juice",
      "shoppingItem": "Fresh lime juice",
      "quantity": "15 g (freshly squeezed, weighed grams)"
    },
    {
      "item": "Fresh ginger",
      "shoppingItem": "Fresh ginger",
      "quantity": "4 g (raw edible input)"
    },
    {
      "item": "Ground cumin",
      "shoppingItem": "Ground cumin",
      "quantity": "0.6 g (dry)"
    },
    {
      "item": "Fresh coriander leaves",
      "shoppingItem": "Fresh coriander leaves",
      "quantity": "4 g (raw edible input)"
    }
  ],
  "method": [
      "Whisk the rice flour with 90 g of the water and one third of the oil. Rest for 10 minutes. Finely chop the cabbage, onion and ginger.",
      "While the batter rests, cook the vegetables in another third of the oil with 17.5 g of the water for 7–8 minutes. Stir in the cumin and cooked, drained chickpeas and heat through.",
      "Keep the filling covered over the lowest heat while cooking the pancakes. Brush a second non-stick pan with the remaining oil. Use all the batter to make three thin pancakes, cooking each for 2–3 minutes per side until the rice flour is fully cooked. Stack the cooked pancakes on a warm plate and cover until all three are ready to fill.",
      "Blend the peanuts, lime juice and remaining 17.5 g water. Fill all the pancakes with all the chickpeas and vegetables, scatter with coriander and serve with all the dressing."
    ],
  "nutrition": {
    "calories": "519 kcal",
    "protein": "12.2 g",
    "carbohydrates": "49.0 g",
    "fat": "28.6 g",
    "fibre": "10.6 g",
    "sodium": "18 mg",
    "potassium": "606 mg",
    "phosphate": "215 mg",
    "salt": "0.05 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "Vegan",
  "dietCategories": [
    "Vegan",
    "Vegetarian",
    "Mediterranean-style"
  ]
},
{
  "id": "chickpea-chaat-with-herbed-yoghurt-dressing",
  "code": "L084",
  "category": "Lunch",
  "cuisine": "India",
  "mealFamily": "plated meal",
  "emoji": "🥗",
  "image": "/images/recipes/L084.webp",
  "name": "Chickpea chaat with herbed yoghurt dressing",
  "description": "Chickpeas, potato and cucumber with cumin, fresh herbs and creamy yoghurt dressing.",
  "cookingTime": "25 mins",
  "calories": "486 kcal",
  "protein": "15.7 g",
  "equipment": "Kitchen scales, Knife and chopping board, Mixing bowl, Fork or whisk, Toaster",
  "ingredients": [
    {
      "item": "Chickpeas, boiled without salt and drained",
      "shoppingItem": "Chickpeas, boiled without salt and drained",
      "quantity": "100 g (cooked drained edible weight)"
    },
    {
      "item": "Peeled potato, boiled in unsalted water and drained",
      "shoppingItem": "Peeled potato, boiled in unsalted water and drained",
      "quantity": "50 g (cooked drained edible weight)"
    },
    {
      "item": "Cucumber",
      "shoppingItem": "Cucumber",
      "quantity": "65 g (raw edible input)"
    },
    {
      "item": "Onion",
      "shoppingItem": "Onion",
      "quantity": "15 g (raw edible input)"
    },
    {
      "item": "Plain full-fat Greek-style yoghurt, about 10% fat",
      "shoppingItem": "Plain full-fat Greek-style yoghurt, about 10% fat",
      "quantity": "50 g (as sold edible weight)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "19 g (as sold, weighed grams)"
    },
    {
      "item": "Fresh mint",
      "shoppingItem": "Fresh mint",
      "quantity": "4 g (raw edible leaves)"
    },
    {
      "item": "Fresh coriander leaves",
      "shoppingItem": "Fresh coriander leaves",
      "quantity": "4 g (raw edible input)"
    },
    {
      "item": "Fresh lemon juice",
      "shoppingItem": "Fresh lemon juice",
      "quantity": "20 g (freshly squeezed, weighed grams)"
    },
    {
      "item": "Ground cumin",
      "shoppingItem": "Ground cumin",
      "quantity": "0.6 g (dry)"
    },
    {
      "item": "White crusty bloomer bread, egg- and dairy-free",
      "shoppingItem": "White crusty bloomer bread, egg- and dairy-free",
      "quantity": "25 g (as sold edible weight)"
    }
  ],
  "method": [
      "Use chickpeas and peeled potato previously boiled separately without salt and drained. Weigh each in its cooked state and cool. Dice the potato and cucumber and finely chop the onion and herbs.",
      "Whisk the Greek-style yoghurt, oil, lemon juice and cumin. Toss with all the chickpeas, potato, cucumber, onion, mint and coriander.",
      "Toast the bread and serve with the entire salad and dressing."
    ],
  "nutrition": {
    "calories": "486 kcal",
    "protein": "15.7 g",
    "carbohydrates": "41.6 g",
    "fat": "28.1 g",
    "fibre": "13.4 g",
    "sodium": "141 mg",
    "potassium": "779 mg",
    "phosphate": "276 mg",
    "salt": "0.35 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "Vegetarian",
  "dietCategories": [
    "Vegetarian"
  ]
},
{
  "id": "coconut-roti-with-spiced-cabbage",
  "code": "L085",
  "category": "Lunch",
  "cuisine": "Sri Lanka",
  "mealFamily": "bread",
  "emoji": "🥗",
  "image": "/images/recipes/L085.webp",
  "name": "Coconut roti with spiced cabbage",
  "description": "Small coconut flatbreads with warm cabbage, carrot and mustard seeds.",
  "cookingTime": "35 mins",
  "calories": "493 kcal",
  "protein": "6.9 g",
  "equipment": "Kitchen scales, Mixing bowl, Frying pan, Lid or bowl cover",
  "ingredients": [
    {
      "item": "Plain white flour",
      "shoppingItem": "Plain white flour",
      "quantity": "45 g (dry)"
    },
    {
      "item": "Unsweetened desiccated coconut",
      "shoppingItem": "Unsweetened desiccated coconut",
      "quantity": "20 g (dry edible input)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "19 g (as sold, weighed grams)"
    },
    {
      "item": "White cabbage",
      "shoppingItem": "White cabbage",
      "quantity": "90 g (raw edible input)"
    },
    {
      "item": "Onion",
      "shoppingItem": "Onion",
      "quantity": "20 g (raw edible input)"
    },
    {
      "item": "Carrot",
      "shoppingItem": "Carrot",
      "quantity": "25 g (raw edible input)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "40 g (weighed grams)"
    },
    {
      "item": "Fresh lime juice",
      "shoppingItem": "Fresh lime juice",
      "quantity": "20 g (freshly squeezed, weighed grams)"
    },
    {
      "item": "Mustard seeds",
      "shoppingItem": "Mustard seeds",
      "quantity": "0.6 g (dry)"
    },
    {
      "item": "Ground turmeric",
      "shoppingItem": "Ground turmeric",
      "quantity": "0.4 g (dry)"
    }
  ],
  "method": [
      "Mix the flour, desiccated coconut and 35 g of the water into a soft dough. Scrape dry patches from the bowl into the mixture and work them in with your hands. Knead briefly, cover and rest for 10 minutes.",
      "Heat the oil in a covered pan, add the mustard seeds and cover until they begin to pop. Add finely shredded cabbage, onion and carrot, the turmeric and remaining 5 g water. Cover and cook over low heat for 8–10 minutes until tender. Stir in the lime juice.",
      "Divide the dough into two. Flatten between non-stick sheets and dry-cook in a hot non-stick pan for 3–4 minutes per side until cooked throughout. Serve both roti with all the vegetables and their juices."
    ],
  "nutrition": {
    "calories": "493 kcal",
    "protein": "6.9 g",
    "carbohydrates": "42.6 g",
    "fat": "32.4 g",
    "fibre": "9.4 g",
    "sodium": "22 mg",
    "potassium": "525 mg",
    "phosphate": "123 mg",
    "salt": "0.06 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "Vegan",
  "dietCategories": [
    "Vegan",
    "Vegetarian"
  ]
},
{
  "id": "vegetable-and-lentil-khichuri",
  "code": "L086",
  "category": "Lunch",
  "cuisine": "Bangladesh",
  "mealFamily": "rice",
  "emoji": "🥗",
  "image": "/images/recipes/L086.webp",
  "name": "Vegetable and lentil khichuri",
  "description": "A soft rice and lentil bowl with vegetables, coconut, ginger and gentle spices.",
  "cookingTime": "35 mins",
  "calories": "482 kcal",
  "protein": "11.5 g",
  "equipment": "Kitchen scales, Knife and chopping board, Saucepan, Lid or bowl cover",
  "ingredients": [
    {
      "item": "White basmati rice",
      "shoppingItem": "White basmati rice",
      "quantity": "30 g (dry)"
    },
    {
      "item": "Dried split red lentils",
      "shoppingItem": "Dried split red lentils",
      "quantity": "25 g (dry edible input)"
    },
    {
      "item": "Cauliflower, edible florets and stalk",
      "shoppingItem": "Cauliflower, edible florets and stalk",
      "quantity": "50 g (raw edible input)"
    },
    {
      "item": "Carrot",
      "shoppingItem": "Carrot",
      "quantity": "25 g (raw edible input)"
    },
    {
      "item": "Onion",
      "shoppingItem": "Onion",
      "quantity": "25 g (raw edible input)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "19 g (as sold, weighed grams)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "250 g (weighed grams)"
    },
    {
      "item": "Unsweetened desiccated coconut",
      "shoppingItem": "Unsweetened desiccated coconut",
      "quantity": "15 g (dry edible input)"
    },
    {
      "item": "Ground cumin",
      "shoppingItem": "Ground cumin",
      "quantity": "0.6 g (dry)"
    },
    {
      "item": "Ground turmeric",
      "shoppingItem": "Ground turmeric",
      "quantity": "0.4 g (dry)"
    },
    {
      "item": "Fresh ginger",
      "shoppingItem": "Fresh ginger",
      "quantity": "4 g (raw edible input)"
    }
  ],
  "method": [
      "Rinse the dry rice and lentils. Finely chop the onion and ginger and cut the carrot and cauliflower into small pieces.",
      "Soften the onion in the oil for 4–5 minutes. Stir around the base and edges of the pan. The vegetables should soften and lose their raw bite; lower the heat if they start to darken before they are tender. Add the ginger, cumin and turmeric and stir for 30 seconds.",
      "Add the rice, lentils, vegetables, desiccated coconut and all the measured water. Cover and simmer gently for 20–25 minutes until the rice and lentils are tender. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork. Stir occasionally, then rest covered for 5 minutes and serve the entire portion."
    ],
  "nutrition": {
    "calories": "482 kcal",
    "protein": "11.5 g",
    "carbohydrates": "42.0 g",
    "fat": "29.4 g",
    "fibre": "9.8 g",
    "sodium": "27 mg",
    "potassium": "545 mg",
    "phosphate": "175 mg",
    "salt": "0.07 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "Vegan",
  "dietCategories": [
    "Vegan",
    "Vegetarian"
  ]
},
{
  "id": "salmon-and-cucumber-rice-salad",
  "code": "L087",
  "category": "Lunch",
  "cuisine": "Japan",
  "mealFamily": "salad",
  "emoji": "🥗",
  "image": "/images/recipes/L087.webp",
  "name": "Salmon and cucumber rice salad",
  "description": "Flaked salmon and short-grain rice with cool cucumber and a creamy sesame dressing.",
  "cookingTime": "30 mins",
  "calories": "596 kcal",
  "protein": "22.5 g",
  "equipment": "Kitchen scales, Mixing bowl, Oven, Lid or bowl cover, Baking tray, Saucepan",
  "ingredients": [
    {
      "item": "White short-grain rice",
      "shoppingItem": "White short-grain rice",
      "quantity": "40 g (dry)"
    },
    {
      "item": "Farmed salmon fillet, flesh only",
      "shoppingItem": "Farmed salmon fillet, flesh only",
      "quantity": "90 g (raw edible input, skin and bones excluded)"
    },
    {
      "item": "Cucumber",
      "shoppingItem": "Cucumber",
      "quantity": "75 g (raw edible input)"
    },
    {
      "item": "Sesame seeds",
      "shoppingItem": "Sesame seeds",
      "quantity": "4 g (dry)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "13 g (as sold, weighed grams)"
    },
    {
      "item": "Plain unseasoned vinegar",
      "shoppingItem": "Plain unseasoned vinegar",
      "quantity": "15 g (as sold, weighed grams)"
    },
    {
      "item": "Fresh lemon juice",
      "shoppingItem": "Fresh lemon juice",
      "quantity": "20 g (freshly squeezed, weighed grams)"
    },
    {
      "item": "Spring onion, bulbs and green tops",
      "shoppingItem": "Spring onion, bulbs and green tops",
      "quantity": "6 g (raw edible input)"
    },
    {
      "item": "Standard mayonnaise",
      "shoppingItem": "Standard mayonnaise",
      "quantity": "15 g (as sold)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "80 g (weighed grams)"
    }
  ],
  "method": [
      "Cook the rice with all the measured water in a covered pan for 12–15 minutes, then rest covered for 5 minutes. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork.",
      "Brush the salmon with half the oil and bake at 200°C, or 180°C fan, for 12–15 minutes until opaque, steaming hot and flaking easily. Check the centre as well as the surface; a browned top alone does not show that the inside is cooked. Retain the edible baking juices.",
      "Mix the mayonnaise, remaining oil, vinegar, lemon juice and sesame seeds. Toss with the warm rice, flaked salmon, sliced cucumber and spring onion and serve the entire bowl freshly prepared. Use a fork or broad spoon and a light lifting motion so the grains stay separate."
    ],
  "nutrition": {
    "calories": "596 kcal",
    "protein": "22.5 g",
    "carbohydrates": "33.0 g",
    "fat": "40.9 g",
    "fibre": "1.8 g",
    "sodium": "67 mg",
    "potassium": "542 mg",
    "phosphate": "297 mg",
    "salt": "0.17 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "Mediterranean-style",
  "dietCategories": [
    "Mediterranean-style"
  ]
},
{
  "id": "tofu-cabbage-and-ginger-pancakes",
  "code": "L088",
  "category": "Lunch",
  "cuisine": "East Asia",
  "mealFamily": "cakes",
  "emoji": "🥗",
  "image": "/images/recipes/L088.webp",
  "name": "Tofu, cabbage and ginger pancakes",
  "description": "Golden tofu pancakes with cabbage and ginger, served with a lime and sesame dip.",
  "cookingTime": "30 mins",
  "calories": "507 kcal",
  "protein": "16.4 g",
  "equipment": "Kitchen scales, Mixing bowl, Frying pan, Grater",
  "ingredients": [
    {
      "item": "Regular tofu, made with calcium sulphate, gently drained",
      "shoppingItem": "Regular tofu, made with calcium sulphate, gently drained",
      "quantity": "150 g (as sold edible weight, unpressed)"
    },
    {
      "item": "White rice flour",
      "shoppingItem": "White rice flour",
      "quantity": "40 g (dry edible input)"
    },
    {
      "item": "White cabbage",
      "shoppingItem": "White cabbage",
      "quantity": "90 g (raw edible input)"
    },
    {
      "item": "Carrot",
      "shoppingItem": "Carrot",
      "quantity": "25 g (raw edible input)"
    },
    {
      "item": "Rapeseed oil",
      "shoppingItem": "Rapeseed oil",
      "quantity": "19 g (as sold, weighed grams)"
    },
    {
      "item": "Sesame oil",
      "shoppingItem": "Sesame oil",
      "quantity": "4 g (as sold, weighed grams)"
    },
    {
      "item": "Soy sauce",
      "shoppingItem": "Soy sauce",
      "quantity": "4 g (as sold, weighed grams)"
    },
    {
      "item": "Fresh lime juice",
      "shoppingItem": "Fresh lime juice",
      "quantity": "20 g (freshly squeezed, weighed grams)"
    },
    {
      "item": "Garlic",
      "shoppingItem": "Garlic",
      "quantity": "3 g (raw edible input)"
    },
    {
      "item": "Fresh ginger",
      "shoppingItem": "Fresh ginger",
      "quantity": "4 g (raw edible input)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "40 g (weighed grams)"
    }
  ],
  "method": [
      "Use regular calcium-sulphate tofu, gently drained without pressing. Mash the weighed tofu and mix with the rice flour, finely shredded cabbage and carrot, crushed garlic, grated ginger and 20 g of the water. Rest for 5 minutes.",
      "Heat all the rapeseed oil in a wide non-stick pan large enough to hold all four small pancakes without crowding. Cook four small, thin pancakes over medium-low heat for 4–5 minutes per side until firm and fully cooked, in one batch.",
      "Mix the sesame oil, soy sauce, lime juice and remaining 20 g water. Serve all four pancakes with all the dip."
    ],
  "nutrition": {
    "calories": "507 kcal",
    "protein": "16.4 g",
    "carbohydrates": "39.4 g",
    "fat": "30.7 g",
    "fibre": "5.3 g",
    "sodium": "248 mg",
    "potassium": "592 mg",
    "phosphate": "235 mg",
    "salt": "0.62 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "Vegan",
  "dietCategories": [
    "Vegan",
    "Vegetarian",
    "DASH-style"
  ]
},
{
  "id": "steamed-cabbage-mushroom-and-white-bean-buns",
  "code": "L089",
  "category": "Lunch",
  "cuisine": "China",
  "mealFamily": "bread",
  "emoji": "🥗",
  "image": "/images/recipes/L089.webp",
  "name": "Steamed cabbage, mushroom and white-bean buns",
  "description": "Soft steamed buns with a savoury cabbage, mushroom and white-bean filling.",
  "cookingTime": "100 mins",
  "calories": "533 kcal",
  "protein": "12.2 g",
  "equipment": "Kitchen scales, Knife and chopping board, Mixing bowl, Saucepan, Steamer and saucepan, Lid or bowl cover",
  "ingredients": [
    {
      "item": "Plain white flour",
      "shoppingItem": "Plain white flour",
      "quantity": "55 g (dry)"
    },
    {
      "item": "Navy beans, boiled without salt and drained",
      "shoppingItem": "Navy beans, boiled without salt and drained",
      "quantity": "65 g (cooked drained edible weight)"
    },
    {
      "item": "White cabbage",
      "shoppingItem": "White cabbage",
      "quantity": "65 g (raw edible input)"
    },
    {
      "item": "White mushrooms",
      "shoppingItem": "White mushrooms",
      "quantity": "25 g (raw edible input)"
    },
    {
      "item": "Onion",
      "shoppingItem": "Onion",
      "quantity": "15 g (raw edible input)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "19 g (as sold, weighed grams)"
    },
    {
      "item": "Sesame oil",
      "shoppingItem": "Sesame oil",
      "quantity": "4 g (as sold, weighed grams)"
    },
    {
      "item": "Soy sauce",
      "shoppingItem": "Soy sauce",
      "quantity": "4 g (as sold, weighed grams)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "45 g (weighed grams)"
    },
    {
      "item": "Active dry yeast",
      "shoppingItem": "Active dry yeast",
      "quantity": "1.3 g (dry)"
    },
    {
      "item": "White sugar",
      "shoppingItem": "White sugar",
      "quantity": "3 g (dry)"
    },
    {
      "item": "Fresh ginger",
      "shoppingItem": "Fresh ginger",
      "quantity": "4 g (raw edible input)"
    }
  ],
  "method": [
      "Mix the flour, yeast, sugar and 40 g lukewarm water into a soft dough. Scrape dry patches from the bowl into the mixture and work them in with your hands. Knead for 6–8 minutes, cover and leave in a warm place for about 45 minutes until puffy.",
      "Finely chop the cabbage, mushroom, onion and ginger. Cook in two thirds of the olive oil with the remaining 5 g water for 8–10 minutes until tender and no loose liquid remains. Mash in the cooked, drained navy beans, soy sauce and sesame oil. Cool.",
      "Divide the dough into three. Flatten between non-stick sheets without extra flour. Fill with all the bean mixture and pinch closed. Brush the bases with the remaining olive oil and set on parchment squares. Rest for 10 minutes.",
      "Steam over a separate pan of boiling water for 15 minutes, keeping the buns clear of the water. Keep the food above the water rather than sitting in it, with the lid fitted so steam circulates around the portion. Check the pan does not boil dry without letting water splash onto the food. Turn off the heat, leave covered for 3 minutes and serve all three buns."
    ],
  "nutrition": {
    "calories": "533 kcal",
    "protein": "12.2 g",
    "carbohydrates": "59.0 g",
    "fat": "24.3 g",
    "fibre": "11.9 g",
    "sodium": "230 mg",
    "potassium": "663 mg",
    "phosphate": "220 mg",
    "salt": "0.58 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "Vegan",
  "dietCategories": [
    "Vegan",
    "Vegetarian",
    "Mediterranean-style"
  ]
},
{
  "id": "chicken-lettuce-cups-with-ginger-and-peanut-dressing",
  "code": "L090",
  "category": "Lunch",
  "cuisine": "Southeast Asia",
  "mealFamily": "salad",
  "emoji": "🥗",
  "image": "/images/recipes/L090.webp",
  "name": "Chicken lettuce cups with ginger and peanut dressing",
  "description": "Lettuce cups with tender chicken, crunchy vegetables, a peanut dressing and crisp rice pancakes.",
  "cookingTime": "35 mins",
  "calories": "515 kcal",
  "protein": "27.9 g",
  "equipment": "Kitchen scales, Knife and chopping board, Mixing bowl, Fork or whisk, Frying pan, Saucepan, Steamer and saucepan, Blender or food processor, Food thermometer, Lid or bowl cover",
  "ingredients": [
    {
      "item": "Skinless boneless chicken breast",
      "shoppingItem": "Skinless boneless chicken breast",
      "quantity": "80 g (raw edible input)"
    },
    {
      "item": "White rice flour",
      "shoppingItem": "White rice flour",
      "quantity": "30 g (dry edible input)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "100 g (weighed grams)"
    },
    {
      "item": "Lettuce",
      "shoppingItem": "Lettuce",
      "quantity": "75 g (raw edible input)"
    },
    {
      "item": "Cucumber",
      "shoppingItem": "Cucumber",
      "quantity": "65 g (raw edible input)"
    },
    {
      "item": "Carrot",
      "shoppingItem": "Carrot",
      "quantity": "25 g (raw edible input)"
    },
    {
      "item": "Unsalted dry-roasted peanuts",
      "shoppingItem": "Unsalted dry-roasted peanuts",
      "quantity": "20 g (as sold edible weight)"
    },
    {
      "item": "Sesame oil",
      "shoppingItem": "Sesame oil",
      "quantity": "6 g (as sold, weighed grams)"
    },
    {
      "item": "Rapeseed oil",
      "shoppingItem": "Rapeseed oil",
      "quantity": "13 g (as sold, weighed grams)"
    },
    {
      "item": "Fresh lime juice",
      "shoppingItem": "Fresh lime juice",
      "quantity": "20 g (freshly squeezed, weighed grams)"
    },
    {
      "item": "Soy sauce",
      "shoppingItem": "Soy sauce",
      "quantity": "4 g (as sold, weighed grams)"
    },
    {
      "item": "Fresh ginger",
      "shoppingItem": "Fresh ginger",
      "quantity": "4 g (raw edible input)"
    }
  ],
  "method": [
      "Whisk the rice flour with 75 g of the water and half the rapeseed oil. Rest for 10 minutes. Steam the chicken until its centre reaches 75°C for 30 seconds, then shred it, retaining the edible juices. Keep the food above the water rather than sitting in it, with the lid fitted so steam circulates around the portion. Check the pan does not boil dry without letting water splash onto the food.",
      "Brush a non-stick pan with the remaining rapeseed oil. Use all the batter to make two very thin rice pancakes, cooking for 2–3 minutes per side until fully cooked and crisp at the edges. Cut into wedges.",
      "Blend the peanuts, sesame oil, lime juice, soy sauce, ginger and remaining 25 g water into a dressing.",
      "Divide all the chicken, finely sliced cucumber and carrot between the lettuce leaves. Spoon over all the dressing and serve with all the pancake wedges."
    ],
  "nutrition": {
    "calories": "515 kcal",
    "protein": "27.9 g",
    "carbohydrates": "29.4 g",
    "fat": "30.6 g",
    "fibre": "5.1 g",
    "sodium": "292 mg",
    "potassium": "854 mg",
    "phosphate": "328 mg",
    "salt": "0.73 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "Mixed diet",
  "dietCategories": [
    "Mixed diet"
  ]
},
{
  "id": "lime-fish-cakes-with-noodles-and-crunchy-salad",
  "code": "L091",
  "category": "Lunch",
  "cuisine": "Thailand",
  "mealFamily": "pasta",
  "emoji": "🥗",
  "image": "/images/recipes/L091.webp",
  "name": "Lime fish cakes with noodles and crunchy salad",
  "description": "Cod and herb cakes with rice noodles, crunchy vegetables and lime mayonnaise.",
  "cookingTime": "35 mins",
  "calories": "565 kcal",
  "protein": "27.7 g",
  "equipment": "Kitchen scales, Knife and chopping board, Mixing bowl, Frying pan, Colander or sieve",
  "ingredients": [
    {
      "item": "Cod fillet, flesh only",
      "shoppingItem": "Cod fillet, flesh only",
      "quantity": "100 g (raw edible input)"
    },
    {
      "item": "Fresh raw egg white, separated from shell eggs",
      "shoppingItem": "Fresh raw egg white, separated from shell eggs",
      "quantity": "50 g (raw edible input)"
    },
    {
      "item": "White rice flour",
      "shoppingItem": "White rice flour",
      "quantity": "20 g (dry edible input)"
    },
    {
      "item": "Rice noodles",
      "shoppingItem": "Rice noodles",
      "quantity": "25 g (dry)"
    },
    {
      "item": "Green beans",
      "shoppingItem": "Green beans",
      "quantity": "40 g (raw edible input)"
    },
    {
      "item": "Cucumber",
      "shoppingItem": "Cucumber",
      "quantity": "65 g (raw edible input)"
    },
    {
      "item": "Carrot",
      "shoppingItem": "Carrot",
      "quantity": "25 g (raw edible input)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "19 g (as sold, weighed grams)"
    },
    {
      "item": "Fresh lime juice",
      "shoppingItem": "Fresh lime juice",
      "quantity": "20 g (freshly squeezed, weighed grams)"
    },
    {
      "item": "Fresh coriander leaves",
      "shoppingItem": "Fresh coriander leaves",
      "quantity": "4 g (raw edible input)"
    },
    {
      "item": "Fresh ginger",
      "shoppingItem": "Fresh ginger",
      "quantity": "3 g (raw edible input)"
    },
    {
      "item": "Standard mayonnaise",
      "shoppingItem": "Standard mayonnaise",
      "quantity": "15 g (as sold)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "25 g (weighed grams)"
    }
  ],
  "method": [
      "Finely chop or pulse the cod. Mix with the egg white, rice flour, finely sliced green beans, ginger and coriander. Form four thin fish cakes.",
      "Heat the oil in a non-stick pan. Cook the cakes over medium heat for 4–5 minutes per side until the fish is opaque and the centres are steaming hot and fully set. Leave space between the portions and let the underside set before moving them. Slide a thin spatula underneath and turn carefully, keeping each portion together.",
      "Cook the dry rice noodles in a separate pan of unsalted water according to the packet and drain. Separate the pasta or noodles as they soften so they do not stick together.",
      "Check the texture towards the end of the cooking time; it should be tender with no chalky centre. Mix half the lime juice with the measured water and toss through the noodles and sliced cucumber and carrot.",
      "Mix the mayonnaise with the remaining lime juice. Serve all the cakes, noodles, salad and mayonnaise."
    ],
  "nutrition": {
    "calories": "565 kcal",
    "protein": "27.7 g",
    "carbohydrates": "39.0 g",
    "fat": "31.8 g",
    "fibre": "3.9 g",
    "sodium": "262 mg",
    "potassium": "768 mg",
    "phosphate": "278 mg",
    "salt": "0.66 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "Mediterranean-style",
  "dietCategories": [
    "Mediterranean-style"
  ]
},
{
  "id": "vegetable-and-tofu-popiah-rolls",
  "code": "L092",
  "category": "Lunch",
  "cuisine": "Malaysia",
  "mealFamily": "bread",
  "emoji": "🥗",
  "image": "/images/recipes/L092.webp",
  "name": "Vegetable and tofu popiah rolls",
  "description": "Thin wheat pancakes around a warm tofu and vegetable filling with chopped peanuts.",
  "cookingTime": "35 mins",
  "calories": "525 kcal",
  "protein": "20.2 g",
  "equipment": "Kitchen scales, Knife and chopping board, Mixing bowl, Fork or whisk, Frying pan",
  "ingredients": [
    {
      "item": "Regular tofu, made with calcium sulphate, gently drained",
      "shoppingItem": "Regular tofu, made with calcium sulphate, gently drained",
      "quantity": "75 g (as sold edible weight, unpressed)"
    },
    {
      "item": "Plain white flour",
      "shoppingItem": "Plain white flour",
      "quantity": "40 g (dry)"
    },
    {
      "item": "Fresh raw egg white, separated from shell eggs",
      "shoppingItem": "Fresh raw egg white, separated from shell eggs",
      "quantity": "40 g (raw edible input)"
    },
    {
      "item": "White cabbage",
      "shoppingItem": "White cabbage",
      "quantity": "65 g (raw edible input)"
    },
    {
      "item": "Carrot",
      "shoppingItem": "Carrot",
      "quantity": "25 g (raw edible input)"
    },
    {
      "item": "Mung beansprouts",
      "shoppingItem": "Mung beansprouts",
      "quantity": "40 g (raw edible input)"
    },
    {
      "item": "Unsalted dry-roasted peanuts",
      "shoppingItem": "Unsalted dry-roasted peanuts",
      "quantity": "15 g (as sold edible weight)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "19 g (as sold, weighed grams)"
    },
    {
      "item": "Soy sauce",
      "shoppingItem": "Soy sauce",
      "quantity": "4 g (as sold, weighed grams)"
    },
    {
      "item": "Plain unseasoned vinegar",
      "shoppingItem": "Plain unseasoned vinegar",
      "quantity": "15 g (as sold, weighed grams)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "90 g (weighed grams)"
    },
    {
      "item": "White sugar",
      "shoppingItem": "White sugar",
      "quantity": "1.3 g (dry)"
    },
    {
      "item": "Garlic",
      "shoppingItem": "Garlic",
      "quantity": "3 g (raw edible input)"
    }
  ],
  "method": [
      "Whisk the flour, egg white and 65 g of the water into a thin batter. Mix until the dry flour is incorporated and scrape down the sides of the bowl. The batter should be evenly combined before each portion is spooned into the pan. Rest for 10 minutes. Brush a non-stick pan with one third of the oil and use all the batter to make three pancakes, cooking both sides until fully set.",
      "Use regular calcium-sulphate tofu, gently drained without pressing, and crumble it. Finely shred the cabbage and carrot and chop the garlic.",
      "Cook the tofu, vegetables, garlic and beansprouts in the remaining oil and remaining 25 g water for 6–8 minutes until the beansprouts are steaming hot. Stir in the soy sauce, vinegar and sugar and cook until there is no loose liquid.",
      "Divide all the filling between the pancakes, add all the chopped peanuts, fold in the sides and roll. Serve all three."
    ],
  "nutrition": {
    "calories": "525 kcal",
    "protein": "20.2 g",
    "carbohydrates": "41.6 g",
    "fat": "31.0 g",
    "fibre": "6.8 g",
    "sodium": "319 mg",
    "potassium": "568 mg",
    "phosphate": "226 mg",
    "salt": "0.80 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "Vegetarian",
  "dietCategories": [
    "Vegetarian",
    "Mediterranean-style"
  ]
},
{
  "id": "gado-gado-with-peanut-and-coconut-dressing",
  "code": "L093",
  "category": "Lunch",
  "cuisine": "Indonesia",
  "mealFamily": "plated meal",
  "emoji": "🥗",
  "image": "/images/recipes/L093.webp",
  "name": "Gado-gado with peanut and coconut dressing",
  "description": "Warm vegetables and a boiled egg with a rich peanut, coconut and lime dressing.",
  "cookingTime": "30 mins",
  "calories": "509 kcal",
  "protein": "18.1 g",
  "equipment": "Kitchen scales, Saucepan, Steamer and saucepan, Blender or food processor, Lid or bowl cover",
  "ingredients": [
    {
      "item": "Peeled potato, boiled in unsalted water and drained",
      "shoppingItem": "Peeled potato, boiled in unsalted water and drained",
      "quantity": "100 g (cooked drained edible weight)"
    },
    {
      "item": "Whole egg, shell removed",
      "shoppingItem": "Whole egg, shell removed",
      "quantity": "50 g (raw edible input)"
    },
    {
      "item": "White cabbage",
      "shoppingItem": "White cabbage",
      "quantity": "65 g (raw edible input)"
    },
    {
      "item": "Green beans",
      "shoppingItem": "Green beans",
      "quantity": "25 g (raw edible input)"
    },
    {
      "item": "Carrot",
      "shoppingItem": "Carrot",
      "quantity": "25 g (raw edible input)"
    },
    {
      "item": "Unsalted dry-roasted peanuts",
      "shoppingItem": "Unsalted dry-roasted peanuts",
      "quantity": "30 g (as sold edible weight)"
    },
    {
      "item": "Unsweetened desiccated coconut",
      "shoppingItem": "Unsweetened desiccated coconut",
      "quantity": "15 g (dry edible input)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "6 g (as sold, weighed grams)"
    },
    {
      "item": "Fresh lime juice",
      "shoppingItem": "Fresh lime juice",
      "quantity": "20 g (freshly squeezed, weighed grams)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "45 g (weighed grams)"
    },
    {
      "item": "Soy sauce",
      "shoppingItem": "Soy sauce",
      "quantity": "3 g (as sold, weighed grams)"
    },
    {
      "item": "White sugar",
      "shoppingItem": "White sugar",
      "quantity": "3 g (dry)"
    },
    {
      "item": "Garlic",
      "shoppingItem": "Garlic",
      "quantity": "3 g (raw edible input)"
    }
  ],
  "method": [
      "Use peeled potato previously boiled in unsalted water and drained; weigh 100 g cooked potato. Weigh this ingredient after the cooking and draining described here; the same weight of the dry or raw ingredient would make a different portion. Boil the egg for 10 minutes, cool and peel. Steam the sliced cabbage, beans and carrot for 6–8 minutes until tender. Keep the food above the water rather than sitting in it, with the lid fitted so steam circulates around the portion. Check the pan does not boil dry without letting water splash onto the food.",
      "Blend the peanuts, desiccated coconut, measured water, soy sauce, sugar, garlic and lime juice until smooth.",
      "Warm the oil in a small pan, add the dressing and simmer gently for 2–3 minutes. Look for small, gentle bubbles rather than a rolling boil. Stir along the bottom when needed to prevent sticking, and keep the heat low enough for the food to cook evenly. Arrange all the vegetables and quartered egg in a bowl and spoon over all the dressing."
    ],
  "nutrition": {
    "calories": "509 kcal",
    "protein": "18.1 g",
    "carbohydrates": "30.8 g",
    "fat": "35.1 g",
    "fibre": "10.5 g",
    "sodium": "263 mg",
    "potassium": "1036 mg",
    "phosphate": "292 mg",
    "salt": "0.66 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "Vegetarian",
  "dietCategories": [
    "Vegetarian"
  ]
},
{
  "id": "black-bean-tostadas-with-avocado-and-lime",
  "code": "L094",
  "category": "Lunch",
  "cuisine": "Mexico",
  "mealFamily": "plated meal",
  "emoji": "🥗",
  "image": "/images/recipes/L094.webp",
  "name": "Black-bean tostadas with avocado and lime",
  "description": "Crisp corn tostadas with black beans, sweetcorn, avocado and fresh lime salsa.",
  "cookingTime": "35 mins",
  "calories": "493 kcal",
  "protein": "13.0 g",
  "equipment": "Kitchen scales, Mixing bowl, Oven, Baking tray",
  "ingredients": [
    {
      "item": "White masa harina, unenriched",
      "shoppingItem": "White masa harina, unenriched",
      "quantity": "30 g (dry edible input)"
    },
    {
      "item": "Black beans, boiled without salt and drained",
      "shoppingItem": "Black beans, boiled without salt and drained",
      "quantity": "90 g (cooked drained edible weight)"
    },
    {
      "item": "Frozen sweetcorn kernels",
      "shoppingItem": "Frozen sweetcorn kernels",
      "quantity": "25 g (frozen uncooked input)"
    },
    {
      "item": "Fresh tomato",
      "shoppingItem": "Fresh tomato",
      "quantity": "40 g (raw edible input)"
    },
    {
      "item": "Lettuce",
      "shoppingItem": "Lettuce",
      "quantity": "50 g (raw edible input)"
    },
    {
      "item": "Onion",
      "shoppingItem": "Onion",
      "quantity": "15 g (raw edible input)"
    },
    {
      "item": "Fresh lime juice",
      "shoppingItem": "Fresh lime juice",
      "quantity": "20 g (freshly squeezed, weighed grams)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "19 g (as sold, weighed grams)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "45 g (weighed grams)"
    },
    {
      "item": "Hass avocado flesh, skin and stone removed",
      "shoppingItem": "Hass avocado flesh, skin and stone removed",
      "quantity": "30 g (raw edible input)"
    },
    {
      "item": "Ground cumin",
      "shoppingItem": "Ground cumin",
      "quantity": "0.6 g (dry)"
    },
    {
      "item": "Fresh coriander leaves",
      "shoppingItem": "Fresh coriander leaves",
      "quantity": "4 g (raw edible input)"
    }
  ],
  "method": [
      "Mix the masa harina and measured water into a dough. Scrape dry patches from the bowl into the mixture and work them in with your hands. Divide into two, press between non-stick sheets and dry-cook in a hot pan for 1–2 minutes per side.",
      "Brush with one third of the oil and bake at 200°C, or 180°C fan, for 8–10 minutes until crisp. Check the centre as well as the surface; a browned top alone does not show that the inside is cooked. Heat the cooked, drained black beans and sweetcorn in another third of the oil with the cumin until steaming hot.",
      "Mix the diced tomato, onion, weighed avocado flesh, coriander, lime juice and remaining oil. Top both tostadas with all the beans, corn, lettuce and salsa and serve."
    ],
  "nutrition": {
    "calories": "493 kcal",
    "protein": "13.0 g",
    "carbohydrates": "43.4 g",
    "fat": "26.3 g",
    "fibre": "12.9 g",
    "sodium": "16 mg",
    "potassium": "901 mg",
    "phosphate": "259 mg",
    "salt": "0.04 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "Vegan",
  "dietCategories": [
    "Vegan",
    "Vegetarian",
    "Mediterranean-style",
    "Blue Zone-inspired"
  ]
},
{
  "id": "tuna-and-lime-potato-causa",
  "code": "L095",
  "category": "Lunch",
  "cuisine": "Peru",
  "mealFamily": "plated meal",
  "emoji": "🥗",
  "image": "/images/recipes/L095.webp",
  "name": "Tuna and lime potato causa",
  "description": "Lime-flavoured potato layered with tuna, cucumber and a creamy dressing.",
  "cookingTime": "35 mins",
  "calories": "472 kcal",
  "protein": "22.3 g",
  "equipment": "Kitchen scales, Knife and chopping board, Mixing bowl",
  "ingredients": [
    {
      "item": "Peeled potato, boiled in unsalted water and drained",
      "shoppingItem": "Peeled potato, boiled in unsalted water and drained",
      "quantity": "115 g (cooked drained edible weight)"
    },
    {
      "item": "Tuna canned in brine, drained",
      "shoppingItem": "Tuna canned in brine, drained",
      "quantity": "75 g (drained edible weight)"
    },
    {
      "item": "Standard mayonnaise",
      "shoppingItem": "Standard mayonnaise",
      "quantity": "25 g (as sold)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "13 g (as sold, weighed grams)"
    },
    {
      "item": "Fresh lime juice",
      "shoppingItem": "Fresh lime juice",
      "quantity": "25 g (freshly squeezed, weighed grams)"
    },
    {
      "item": "Cucumber",
      "shoppingItem": "Cucumber",
      "quantity": "65 g (raw edible input)"
    },
    {
      "item": "Lettuce",
      "shoppingItem": "Lettuce",
      "quantity": "40 g (raw edible input)"
    },
    {
      "item": "Ground black pepper",
      "shoppingItem": "Ground black pepper",
      "quantity": "0.3 g (dry)"
    },
    {
      "item": "Pure cayenne chilli powder",
      "shoppingItem": "Pure cayenne chilli powder",
      "quantity": "0.1 g (dry)"
    }
  ],
  "method": [
      "Use peeled potato previously boiled in unsalted water and drained. Weigh 115 g while warm and mash with the oil, lime juice, chilli and pepper. Cool.",
      "Drain brine-canned tuna and weigh the drained fish. Mix with the mayonnaise. Finely dice the cucumber. Boiling and discarding the water can remove some potassium, but it does not make the portion potassium-free or establish a precise reduction.",
      "Layer half the potato, all the tuna and cucumber, then the remaining potato in a small bowl or ring mould. Serve with all the lettuce. Refrigerate promptly if not serving immediately."
    ],
  "nutrition": {
    "calories": "472 kcal",
    "protein": "22.3 g",
    "carbohydrates": "20.8 g",
    "fat": "33.0 g",
    "fibre": "3.1 g",
    "sodium": "260 mg",
    "potassium": "817 mg",
    "phosphate": "191 mg",
    "salt": "0.65 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "Mediterranean-style",
  "dietCategories": [
    "Mediterranean-style"
  ]
},
{
  "id": "black-beans-and-rice-with-lime-dressed-cabbage",
  "code": "L096",
  "category": "Lunch",
  "cuisine": "Brazil",
  "mealFamily": "rice",
  "emoji": "🥗",
  "image": "/images/recipes/L096.webp",
  "name": "Black beans and rice with lime-dressed cabbage",
  "description": "Garlicky black beans and rice with a bright cabbage, parsley and lime salad.",
  "cookingTime": "30 mins",
  "calories": "517 kcal",
  "protein": "14.0 g",
  "equipment": "Kitchen scales, Saucepan, Lid or bowl cover",
  "ingredients": [
    {
      "item": "Black beans, boiled without salt and drained",
      "shoppingItem": "Black beans, boiled without salt and drained",
      "quantity": "105 g (cooked drained edible weight)"
    },
    {
      "item": "White basmati rice",
      "shoppingItem": "White basmati rice",
      "quantity": "40 g (dry)"
    },
    {
      "item": "White cabbage",
      "shoppingItem": "White cabbage",
      "quantity": "65 g (raw edible input)"
    },
    {
      "item": "Onion",
      "shoppingItem": "Onion",
      "quantity": "25 g (raw edible input)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "23 g (as sold, weighed grams)"
    },
    {
      "item": "Fresh lime juice",
      "shoppingItem": "Fresh lime juice",
      "quantity": "20 g (freshly squeezed, weighed grams)"
    },
    {
      "item": "Fresh parsley",
      "shoppingItem": "Fresh parsley",
      "quantity": "4 g (raw edible input)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "100 g (weighed grams)"
    },
    {
      "item": "Garlic",
      "shoppingItem": "Garlic",
      "quantity": "3 g (raw edible input)"
    },
    {
      "item": "Ground black pepper",
      "shoppingItem": "Ground black pepper",
      "quantity": "0.3 g (dry)"
    }
  ],
  "method": [
      "Cook the rice with 65 g of the measured water, covered, for 12–15 minutes, then rest for 5 minutes. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork.",
      "Soften the chopped onion and garlic in two thirds of the oil for 5 minutes. Stir around the base and edges of the pan. The vegetables should soften and lose their raw bite; lower the heat if they start to darken before they are tender. Add the cooked, drained black beans, remaining 35 g water and pepper. Simmer for 5–7 minutes, mashing a spoonful of beans to thicken. Look for small, gentle bubbles rather than a rolling boil. Stir along the bottom when needed to prevent sticking, and keep the heat low enough for the food to cook evenly.",
      "Toss the shredded cabbage and chopped parsley with the remaining oil and lime juice. Serve all the beans, rice and salad."
    ],
  "nutrition": {
    "calories": "517 kcal",
    "protein": "14.0 g",
    "carbohydrates": "52.2 g",
    "fat": "23.9 g",
    "fibre": "12.4 g",
    "sodium": "12 mg",
    "potassium": "661 mg",
    "phosphate": "220 mg",
    "salt": "0.03 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "Vegan",
  "dietCategories": [
    "Vegan",
    "Vegetarian",
    "Mediterranean-style",
    "Blue Zone-inspired"
  ]
},
{
  "id": "plantain-and-black-eyed-pea-fritters-with-groundnuts",
  "code": "L097",
  "category": "Lunch",
  "cuisine": "Ghana",
  "mealFamily": "cakes",
  "emoji": "🥗",
  "image": "/images/recipes/L097.webp",
  "name": "Plantain and black-eyed pea fritters with groundnuts",
  "description": "Plantain and black-eyed pea fritters with ginger, groundnuts and lime-dressed cabbage.",
  "cookingTime": "35 mins",
  "calories": "525 kcal",
  "protein": "14.4 g",
  "equipment": "Kitchen scales, Frying pan",
  "ingredients": [
    {
      "item": "Black-eyed peas, boiled without salt and drained",
      "shoppingItem": "Black-eyed peas, boiled without salt and drained",
      "quantity": "100 g (cooked drained edible weight)"
    },
    {
      "item": "Ripe plantain flesh",
      "shoppingItem": "Ripe plantain flesh",
      "quantity": "40 g (raw ripe flesh)"
    },
    {
      "item": "White rice flour",
      "shoppingItem": "White rice flour",
      "quantity": "20 g (dry edible input)"
    },
    {
      "item": "Onion",
      "shoppingItem": "Onion",
      "quantity": "20 g (raw edible input)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "19 g (as sold, weighed grams)"
    },
    {
      "item": "Fresh lime juice",
      "shoppingItem": "Fresh lime juice",
      "quantity": "20 g (freshly squeezed, weighed grams)"
    },
    {
      "item": "White cabbage",
      "shoppingItem": "White cabbage",
      "quantity": "65 g (raw edible input)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "25 g (weighed grams)"
    },
    {
      "item": "Ground cumin",
      "shoppingItem": "Ground cumin",
      "quantity": "0.6 g (dry)"
    },
    {
      "item": "Unsalted dry-roasted peanuts",
      "shoppingItem": "Unsalted dry-roasted peanuts",
      "quantity": "15 g (as sold edible weight)"
    },
    {
      "item": "Fresh ginger",
      "shoppingItem": "Fresh ginger",
      "quantity": "4 g (raw edible input)"
    }
  ],
  "method": [
      "Use black-eyed peas previously boiled without salt and drained. Mash with the weighed peeled ripe plantain, rice flour, finely chopped onion, ginger, cumin and all the measured water.",
      "Form four thin patties. Heat the oil in a non-stick pan and cook over medium-low heat for 5–6 minutes per side until the plantain and flour are fully cooked and the centres are steaming hot.",
      "Toss the shredded cabbage with the lime juice and chopped peanuts. Serve all four fritters with all the cabbage."
    ],
  "nutrition": {
    "calories": "525 kcal",
    "protein": "14.4 g",
    "carbohydrates": "48.1 g",
    "fat": "27.5 g",
    "fibre": "11.8 g",
    "sodium": "15 mg",
    "potassium": "845 mg",
    "phosphate": "277 mg",
    "salt": "0.04 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "Vegan",
  "dietCategories": [
    "Vegan",
    "Vegetarian",
    "Mediterranean-style"
  ]
},
{
  "id": "black-eyed-pea-and-tomato-stew-with-soft-polenta",
  "code": "L098",
  "category": "Lunch",
  "cuisine": "Ghana",
  "mealFamily": "stew",
  "emoji": "🥗",
  "image": "/images/recipes/L098.webp",
  "name": "Black-eyed pea and tomato stew with soft polenta",
  "description": "Black-eyed peas in a ginger and tomato sauce, served over soft polenta.",
  "cookingTime": "35 mins",
  "calories": "511 kcal",
  "protein": "14.5 g",
  "equipment": "Kitchen scales, Mixing bowl, Fork or whisk, Saucepan, Lid or bowl cover",
  "ingredients": [
    {
      "item": "Black-eyed peas, boiled without salt and drained",
      "shoppingItem": "Black-eyed peas, boiled without salt and drained",
      "quantity": "115 g (cooked drained edible weight)"
    },
    {
      "item": "Fresh tomato",
      "shoppingItem": "Fresh tomato",
      "quantity": "50 g (raw edible input)"
    },
    {
      "item": "Onion",
      "shoppingItem": "Onion",
      "quantity": "25 g (raw edible input)"
    },
    {
      "item": "Fine sifted cornmeal, not self-raising",
      "shoppingItem": "Fine sifted cornmeal, not self-raising",
      "quantity": "50 g (dry edible input)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "19 g (as sold, weighed grams)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "225 g (weighed grams)"
    },
    {
      "item": "Fresh ginger",
      "shoppingItem": "Fresh ginger",
      "quantity": "4 g (raw edible input)"
    },
    {
      "item": "Garlic",
      "shoppingItem": "Garlic",
      "quantity": "3 g (raw edible input)"
    },
    {
      "item": "Sweet paprika",
      "shoppingItem": "Sweet paprika",
      "quantity": "0.6 g (dry)"
    },
    {
      "item": "Pure cayenne chilli powder",
      "shoppingItem": "Pure cayenne chilli powder",
      "quantity": "0.3 g (dry)"
    }
  ],
  "method": [
      "Bring 175 g of the water to a gentle simmer. Look for small, gentle bubbles rather than a rolling boil. Stir along the bottom when needed to prevent sticking, and keep the heat low enough for the food to cook evenly. Whisk in the cornmeal and cook over low heat for 20–25 minutes, stirring often, until fully tender. Cover off the heat if ready early.",
      "Meanwhile soften the chopped onion, ginger and garlic in the oil for 5 minutes. Stir around the base and edges of the pan. The vegetables should soften and lose their raw bite; lower the heat if they start to darken before they are tender. Add chopped tomato, paprika, chilli and remaining 50 g water and simmer for 8 minutes.",
      "Add the cooked, drained black-eyed peas and simmer for 5–7 minutes until hot and thickened. Serve all the stew over all the polenta."
    ],
  "nutrition": {
    "calories": "511 kcal",
    "protein": "14.5 g",
    "carbohydrates": "55.6 g",
    "fat": "21.5 g",
    "fibre": "10.9 g",
    "sodium": "16 mg",
    "potassium": "606 mg",
    "phosphate": "265 mg",
    "salt": "0.04 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "Vegan",
  "dietCategories": [
    "Vegan",
    "Vegetarian"
  ]
},
{
  "id": "lentil-and-groundnut-stew-with-flatbread",
  "code": "L099",
  "category": "Lunch",
  "cuisine": "West Africa",
  "mealFamily": "bread",
  "emoji": "🥗",
  "image": "/images/recipes/L099.webp",
  "name": "Lentil and groundnut stew with flatbread",
  "description": "Red lentils and vegetables in a groundnut sauce with a warm homemade flatbread.",
  "cookingTime": "40 mins",
  "calories": "542 kcal",
  "protein": "16.9 g",
  "equipment": "Kitchen scales, Knife and chopping board, Mixing bowl, Saucepan, Rolling pin, Lid or bowl cover",
  "ingredients": [
    {
      "item": "Dried split red lentils",
      "shoppingItem": "Dried split red lentils",
      "quantity": "30 g (dry edible input)"
    },
    {
      "item": "Plain white flour",
      "shoppingItem": "Plain white flour",
      "quantity": "40 g (dry)"
    },
    {
      "item": "Unsalted dry-roasted peanuts",
      "shoppingItem": "Unsalted dry-roasted peanuts",
      "quantity": "15 g (as sold edible weight)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "19 g (as sold, weighed grams)"
    },
    {
      "item": "Carrot",
      "shoppingItem": "Carrot",
      "quantity": "40 g (raw edible input)"
    },
    {
      "item": "White cabbage",
      "shoppingItem": "White cabbage",
      "quantity": "50 g (raw edible input)"
    },
    {
      "item": "Onion",
      "shoppingItem": "Onion",
      "quantity": "25 g (raw edible input)"
    },
    {
      "item": "Fresh ginger",
      "shoppingItem": "Fresh ginger",
      "quantity": "4 g (raw edible input)"
    },
    {
      "item": "Garlic",
      "shoppingItem": "Garlic",
      "quantity": "3 g (raw edible input)"
    },
    {
      "item": "Tomato puree",
      "shoppingItem": "Tomato puree",
      "quantity": "6 g (as sold)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "225 g (weighed grams)"
    },
    {
      "item": "Ground cumin",
      "shoppingItem": "Ground cumin",
      "quantity": "0.6 g (dry)"
    },
    {
      "item": "Sweet paprika",
      "shoppingItem": "Sweet paprika",
      "quantity": "1.3 g (dry)"
    }
  ],
  "method": [
      "Mix the flour with 25 g of the water to make a dough. Scrape dry patches from the bowl into the mixture and work them in with your hands. Knead briefly, cover and rest for 10 minutes. Finely chop the vegetables, garlic and ginger and grind the peanuts.",
      "Soften the onion in the oil for 5 minutes. Stir around the base and edges of the pan. The vegetables should soften and lose their raw bite; lower the heat if they start to darken before they are tender. Add garlic, ginger, cumin, paprika and tomato puree and cook for 30 seconds.",
      "Add the rinsed red lentils, carrot, cabbage, ground peanuts and remaining 200 g water. Cover and simmer for 20–25 minutes until the lentils are soft, stirring regularly. Look for small, gentle bubbles rather than a rolling boil. Stir along the bottom when needed to prevent sticking, and keep the heat low enough for the food to cook evenly.",
      "Roll the dough between non-stick sheets without extra flour. Dry-cook in a hot pan for 2–3 minutes per side until cooked throughout. Serve all the stew with the whole flatbread."
    ],
  "nutrition": {
    "calories": "542 kcal",
    "protein": "16.9 g",
    "carbohydrates": "54.6 g",
    "fat": "28.1 g",
    "fibre": "12.6 g",
    "sodium": "31 mg",
    "potassium": "750 mg",
    "phosphate": "249 mg",
    "salt": "0.08 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "Vegan",
  "dietCategories": [
    "Vegan",
    "Vegetarian",
    "Mediterranean-style"
  ]
},
{
  "id": "pea-and-mint-soup-with-toast",
  "code": "L100",
  "category": "Lunch",
  "cuisine": "Britain",
  "mealFamily": "soup",
  "emoji": "🥗",
  "image": "/images/recipes/L100.webp",
  "name": "Pea and mint soup with toast",
  "description": "A smooth pea and mint soup with a spoonful of yoghurt and crisp toast.",
  "cookingTime": "25 mins",
  "calories": "517 kcal",
  "protein": "15.2 g",
  "equipment": "Kitchen scales, Knife and chopping board, Mixing bowl, Toaster, Saucepan, Blender or food processor, Lid or bowl cover",
  "ingredients": [
    {
      "item": "Frozen peas",
      "shoppingItem": "Frozen peas",
      "quantity": "115 g (frozen uncooked input)"
    },
    {
      "item": "White rice flour",
      "shoppingItem": "White rice flour",
      "quantity": "20 g (dry edible input)"
    },
    {
      "item": "Onion",
      "shoppingItem": "Onion",
      "quantity": "20 g (raw edible input)"
    },
    {
      "item": "Leek, trimmed edible portion",
      "shoppingItem": "Leek, trimmed edible portion",
      "quantity": "30 g (raw edible input)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "19 g (as sold, weighed grams)"
    },
    {
      "item": "White crusty bloomer bread, egg- and dairy-free",
      "shoppingItem": "White crusty bloomer bread, egg- and dairy-free",
      "quantity": "45 g (as sold edible weight)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "250 g (weighed grams)"
    },
    {
      "item": "Fresh mint",
      "shoppingItem": "Fresh mint",
      "quantity": "4 g (raw edible leaves)"
    },
    {
      "item": "Fresh lemon juice",
      "shoppingItem": "Fresh lemon juice",
      "quantity": "15 g (freshly squeezed, weighed grams)"
    },
    {
      "item": "Plain full-fat Greek-style yoghurt, about 10% fat",
      "shoppingItem": "Plain full-fat Greek-style yoghurt, about 10% fat",
      "quantity": "50 g (as sold edible weight)"
    },
    {
      "item": "Ground black pepper",
      "shoppingItem": "Ground black pepper",
      "quantity": "0.3 g (dry)"
    }
  ],
  "method": [
      "Slice the onion and leek and soften in the oil in a covered pan for 5 minutes. Mix the rice flour with 40 g of the measured water to make a smooth slurry.",
      "Add the frozen peas and remaining 210 g water to the pan. Bring to a simmer, stir in the slurry and cook for 8–10 minutes until the peas and rice flour are fully cooked.",
      "Add the mint, lemon juice and pepper, then blend until smooth. Stir in the Greek-style yoghurt off the heat. Toast the bread and serve with all the soup; measure the finished soup volume if tracking a fluid allowance."
    ],
  "nutrition": {
    "calories": "517 kcal",
    "protein": "15.2 g",
    "carbohydrates": "53.2 g",
    "fat": "25.9 g",
    "fibre": "9.5 g",
    "sodium": "230 mg",
    "potassium": "528 mg",
    "phosphate": "250 mg",
    "salt": "0.58 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "Vegetarian",
  "dietCategories": [
    "Vegetarian"
  ]
},
{
  "id": "salmon-avocado-and-cucumber-salad",
  "code": "L101",
  "category": "Lunch",
  "cuisine": "Mediterranean",
  "mealFamily": "salad",
  "emoji": "🥗",
  "image": "/images/recipes/L101.webp",
  "name": "Salmon, avocado and cucumber salad",
  "description": "Flaked salmon with avocado, cucumber and crisp lettuce in a lemon and chive dressing.",
  "cookingTime": "25 mins",
  "calories": "433 kcal",
  "protein": "22.1 g",
  "equipment": "Kitchen scales, Knife and chopping board, Mixing bowl, Oven, Baking tray",
  "ingredients": [
    {
      "item": "Farmed salmon fillet, flesh only",
      "shoppingItem": "Farmed salmon fillet, flesh only",
      "quantity": "100 g (raw edible input, skin and bones excluded)"
    },
    {
      "item": "Hass avocado flesh, skin and stone removed",
      "shoppingItem": "Hass avocado flesh, skin and stone removed",
      "quantity": "40 g (raw edible input)"
    },
    {
      "item": "Cucumber",
      "shoppingItem": "Cucumber",
      "quantity": "50 g (raw edible input)"
    },
    {
      "item": "Lettuce",
      "shoppingItem": "Lettuce",
      "quantity": "30 g (raw edible input)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "15 g (as sold, weighed grams)"
    },
    {
      "item": "Fresh lemon juice",
      "shoppingItem": "Fresh lemon juice",
      "quantity": "10 g (freshly squeezed, weighed grams)"
    },
    {
      "item": "Fresh chives",
      "shoppingItem": "Fresh chives",
      "quantity": "3 g (raw edible input)"
    },
    {
      "item": "Ground black pepper",
      "shoppingItem": "Ground black pepper",
      "quantity": "0.2 g (dry)"
    }
  ],
  "method": [
      "Brush the salmon with one third of the oil. Bake at 200°C, or 180°C fan, for 12–15 minutes until opaque, steaming hot and flaking easily. Check the centre as well as the surface; a browned top alone does not show that the inside is cooked. Retain edible baking juices.",
      "Weigh the avocado flesh after removing its skin and stone. Dice with the cucumber and shred the lettuce.",
      "Mix the remaining oil, lemon juice, chopped chives and pepper. Serve all the salad with all the salmon, edible juices and dressing."
    ],
  "nutrition": {
    "calories": "433 kcal",
    "protein": "22.1 g",
    "carbohydrates": "2.0 g",
    "fat": "37.3 g",
    "fibre": "2.4 g",
    "sodium": "51 mg",
    "potassium": "759 mg",
    "phosphate": "270 mg",
    "salt": "0.13 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "Keto",
  "dietCategories": [
    "Keto",
    "Atkins Phase 1"
  ]
},
{
  "id": "chicken-and-avocado-lettuce-wraps",
  "code": "L102",
  "category": "Lunch",
  "cuisine": "Southeast Asia",
  "mealFamily": "bread",
  "emoji": "🥗",
  "image": "/images/recipes/L102.webp",
  "name": "Chicken and avocado lettuce wraps",
  "description": "Warm chicken strips in lettuce cups with avocado, cucumber, coriander and lime.",
  "cookingTime": "30 mins",
  "calories": "393 kcal",
  "protein": "24.0 g",
  "equipment": "Kitchen scales, Knife and chopping board, Mixing bowl, Food thermometer",
  "ingredients": [
    {
      "item": "Skinless boneless chicken breast",
      "shoppingItem": "Skinless boneless chicken breast",
      "quantity": "90 g (raw edible input)"
    },
    {
      "item": "Hass avocado flesh, skin and stone removed",
      "shoppingItem": "Hass avocado flesh, skin and stone removed",
      "quantity": "60 g (raw edible input)"
    },
    {
      "item": "Lettuce",
      "shoppingItem": "Lettuce",
      "quantity": "60 g (raw edible input)"
    },
    {
      "item": "Cucumber",
      "shoppingItem": "Cucumber",
      "quantity": "40 g (raw edible input)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "20 g (as sold, weighed grams)"
    },
    {
      "item": "Fresh lime juice",
      "shoppingItem": "Fresh lime juice",
      "quantity": "15 g (freshly squeezed, weighed grams)"
    },
    {
      "item": "Garlic",
      "shoppingItem": "Garlic",
      "quantity": "1 g (raw edible input)"
    },
    {
      "item": "Fresh coriander leaves",
      "shoppingItem": "Fresh coriander leaves",
      "quantity": "3 g (raw edible input)"
    },
    {
      "item": "Ground black pepper",
      "shoppingItem": "Ground black pepper",
      "quantity": "0.2 g (dry)"
    }
  ],
  "method": [
      "Slice the chicken thinly. Cook in half the oil with crushed garlic and pepper for 8–10 minutes until its centre reaches 75°C for 30 seconds.",
      "Dice the weighed avocado flesh and cucumber. Mix with the lime juice, chopped coriander and remaining oil.",
      "Divide all the chicken and edible pan juices among the lettuce leaves. Add all the avocado mixture and serve the whole portion."
    ],
  "nutrition": {
    "calories": "393 kcal",
    "protein": "24.0 g",
    "carbohydrates": "2.9 g",
    "fat": "31.8 g",
    "fibre": "3.3 g",
    "sodium": "67 mg",
    "potassium": "919 mg",
    "phosphate": "259 mg",
    "salt": "0.17 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "Keto",
  "dietCategories": [
    "Keto",
    "Atkins Phase 1"
  ]
},
{
  "id": "spinach-egg-and-mozzarella-skillet",
  "code": "L103",
  "category": "Lunch",
  "cuisine": "Italy",
  "mealFamily": "eggs",
  "emoji": "🥗",
  "image": "/images/recipes/L103.webp",
  "name": "Spinach, egg and mozzarella skillet",
  "description": "A soft spinach and mozzarella frittata with fresh basil and warm tomatoes.",
  "cookingTime": "25 mins",
  "calories": "435 kcal",
  "protein": "25.8 g",
  "equipment": "Kitchen scales, Mixing bowl, Fork or whisk, Oven, Baking tray",
  "ingredients": [
    {
      "item": "Whole egg, shell removed",
      "shoppingItem": "Whole egg, shell removed",
      "quantity": "100 g (raw edible input)"
    },
    {
      "item": "Fresh raw egg white, separated from shell eggs",
      "shoppingItem": "Fresh raw egg white, separated from shell eggs",
      "quantity": "50 g (raw edible input)"
    },
    {
      "item": "Vegetarian-rennet fresh mozzarella",
      "shoppingItem": "Vegetarian-rennet fresh mozzarella",
      "quantity": "35 g (as sold edible weight)"
    },
    {
      "item": "Baby spinach",
      "shoppingItem": "Baby spinach",
      "quantity": "40 g (raw edible input)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "20 g (as sold, weighed grams)"
    },
    {
      "item": "Fresh tomato",
      "shoppingItem": "Fresh tomato",
      "quantity": "30 g (raw edible input)"
    },
    {
      "item": "Fresh basil",
      "shoppingItem": "Fresh basil",
      "quantity": "3 g (raw edible input)"
    },
    {
      "item": "Ground black pepper",
      "shoppingItem": "Ground black pepper",
      "quantity": "0.2 g (dry)"
    }
  ],
  "method": [
      "Heat the oven to 200°C, or 180°C fan. Warm half the oil in a small ovenproof pan. Add chopped tomato and spinach and cook for 3 minutes.",
      "Beat the weighed whole egg and egg white with the basil and pepper. Pour into the pan and scatter over all the diced mozzarella. Drizzle with the remaining oil.",
      "Bake for 12–15 minutes until the centre is completely set and steaming hot. Check the centre as well as the surface; a browned top alone does not show that the inside is cooked. Serve the whole skillet.",
      "Use vegetarian-rennet cheese for the vegetarian version specified here."
    ],
  "nutrition": {
    "calories": "435 kcal",
    "protein": "25.8 g",
    "carbohydrates": "1.2 g",
    "fat": "36.4 g",
    "fibre": "0.8 g",
    "sodium": "398 mg",
    "potassium": "589 mg",
    "phosphate": "304 mg",
    "salt": "0.99 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "Keto",
  "dietCategories": [
    "Vegetarian",
    "Keto",
    "Atkins Phase 1"
  ]
},
{
  "id": "tuna-egg-and-cucumber-boats",
  "code": "L104",
  "category": "Lunch",
  "cuisine": "Britain",
  "mealFamily": "salad",
  "emoji": "🥗",
  "image": "/images/recipes/L104.webp",
  "name": "Tuna, egg and cucumber boats",
  "description": "Cucumber boats filled with tuna, chopped egg and a lemon and chive dressing.",
  "cookingTime": "25 mins",
  "calories": "420 kcal",
  "protein": "32.8 g",
  "equipment": "Kitchen scales, Knife and chopping board, Mixing bowl, Saucepan, Steamer and saucepan, Lid or bowl cover",
  "ingredients": [
    {
      "item": "Tuna canned in brine, drained",
      "shoppingItem": "Tuna canned in brine, drained",
      "quantity": "100 g (drained edible weight)"
    },
    {
      "item": "Whole egg, shell removed",
      "shoppingItem": "Whole egg, shell removed",
      "quantity": "50 g (raw edible input)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "25 g (as sold, weighed grams)"
    },
    {
      "item": "Cucumber",
      "shoppingItem": "Cucumber",
      "quantity": "100 g (raw edible input)"
    },
    {
      "item": "Lettuce",
      "shoppingItem": "Lettuce",
      "quantity": "40 g (raw edible input)"
    },
    {
      "item": "Fresh lemon juice",
      "shoppingItem": "Fresh lemon juice",
      "quantity": "10 g (freshly squeezed, weighed grams)"
    },
    {
      "item": "Fresh chives",
      "shoppingItem": "Fresh chives",
      "quantity": "3 g (raw edible input)"
    },
    {
      "item": "Ground black pepper",
      "shoppingItem": "Ground black pepper",
      "quantity": "0.2 g (dry)"
    }
  ],
  "method": [
      "Brush a small ramekin with 5 g of the oil. Add the weighed raw egg and steam over a separate pan of water for 8–10 minutes until fully set. Keep the food above the water rather than sitting in it, with the lid fitted so steam circulates around the portion. Check the pan does not boil dry without letting water splash onto the food. Cool and chop, retaining the oil.",
      "Drain brine-canned tuna and weigh 100 g. Mix with the egg, remaining 20 g oil, lemon juice, chives and pepper.",
      "Halve the cucumber lengthways and scoop out its centre, keeping all the edible flesh. Chop that flesh into the tuna mixture, fill both cucumber halves and serve on all the lettuce. Make sure washed salad leaves are dry before assembling, so they do not make the bread or filling soggy. Spread the filling evenly across the portion and serve soon after assembling."
    ],
  "nutrition": {
    "calories": "420 kcal",
    "protein": "32.8 g",
    "carbohydrates": "2.0 g",
    "fat": "31.1 g",
    "fibre": "1.5 g",
    "sodium": "378 mg",
    "potassium": "572 mg",
    "phosphate": "295 mg",
    "salt": "0.94 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "Keto",
  "dietCategories": [
    "Keto",
    "Atkins Phase 1"
  ]
},
{
  "id": "beef-and-cheddar-lettuce-cups",
  "code": "L105",
  "category": "Lunch",
  "cuisine": "Britain",
  "mealFamily": "salad",
  "emoji": "🥗",
  "image": "/images/recipes/L105.webp",
  "name": "Beef and Cheddar lettuce cups",
  "description": "Seared beef and Cheddar in crisp lettuce cups with a mustard dressing.",
  "cookingTime": "25 mins",
  "calories": "457 kcal",
  "protein": "29.3 g",
  "equipment": "Kitchen scales, Knife and chopping board, Mixing bowl, Frying pan, Grater",
  "ingredients": [
    {
      "item": "Beef sirloin, lean and edible fat",
      "shoppingItem": "Beef sirloin, lean and edible fat",
      "quantity": "100 g (raw edible input)"
    },
    {
      "item": "Mature Cheddar",
      "shoppingItem": "Mature Cheddar",
      "quantity": "25 g (as sold)"
    },
    {
      "item": "Lettuce",
      "shoppingItem": "Lettuce",
      "quantity": "60 g (raw edible input)"
    },
    {
      "item": "Cucumber",
      "shoppingItem": "Cucumber",
      "quantity": "40 g (raw edible input)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "15 g (as sold, weighed grams)"
    },
    {
      "item": "Mustard seeds",
      "shoppingItem": "Mustard seeds",
      "quantity": "0.5 g (dry)"
    },
    {
      "item": "Plain unseasoned vinegar",
      "shoppingItem": "Plain unseasoned vinegar",
      "quantity": "10 g (as sold, weighed grams)"
    },
    {
      "item": "Ground black pepper",
      "shoppingItem": "Ground black pepper",
      "quantity": "0.2 g (dry)"
    }
  ],
  "method": [
      "Slice the beef across the grain. Cook in two thirds of the oil in a hot non-stick pan for 3–4 minutes until the surfaces are thoroughly seared. Season with pepper.",
      "Grind the mustard seeds and mix with the vinegar and remaining oil. Dice the cucumber and grate the Cheddar.",
      "Divide all the beef, edible pan juices, cheese and cucumber between the lettuce leaves. Spoon over all the dressing and serve."
    ],
  "nutrition": {
    "calories": "457 kcal",
    "protein": "29.3 g",
    "carbohydrates": "1.6 g",
    "fat": "36.9 g",
    "fibre": "1.3 g",
    "sodium": "250 mg",
    "potassium": "544 mg",
    "phosphate": "334 mg",
    "salt": "0.63 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "Keto",
  "dietCategories": [
    "Keto",
    "Atkins Phase 1"
  ]
},
{
  "id": "salmon-with-softly-set-egg",
  "code": "L106",
  "category": "Lunch",
  "cuisine": "Simple cooking",
  "mealFamily": "eggs",
  "emoji": "🥗",
  "image": "/images/recipes/L106.webp",
  "name": "Salmon with softly set egg",
  "description": "Baked salmon with a softly set egg and warm butter.",
  "cookingTime": "25 mins",
  "calories": "394 kcal",
  "protein": "26.8 g",
  "equipment": "Kitchen scales, Mixing bowl, Fork or whisk, Frying pan, Oven, Ovenproof dish",
  "ingredients": [
    {
      "item": "Farmed salmon fillet, flesh only",
      "shoppingItem": "Farmed salmon fillet, flesh only",
      "quantity": "100 g (raw edible input, skin and bones excluded)"
    },
    {
      "item": "Whole egg, shell removed",
      "shoppingItem": "Whole egg, shell removed",
      "quantity": "50 g (raw edible input)"
    },
    {
      "item": "Unsalted butter",
      "shoppingItem": "Unsalted butter",
      "quantity": "15 g (as sold)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "15 g (weighed grams)"
    }
  ],
  "method": [
      "Heat the oven to 190°C, or 170°C fan. Put the salmon in a small dish with 5 g of the butter and bake for 12–15 minutes until opaque and steaming hot. Check the centre as well as the surface; a browned top alone does not show that the inside is cooked.",
      "Beat the weighed egg with the measured water. Melt the remaining 10 g butter in a non-stick pan and cook the egg gently, stirring, until fully set. Swirl the pan as the butter melts to coat its base. Keep it from browning or smoking before the next ingredient is added.",
      "Serve all the salmon, edible baking juices, egg and butter together."
    ],
  "nutrition": {
    "calories": "394 kcal",
    "protein": "26.8 g",
    "carbohydrates": "0.1 g",
    "fat": "31.8 g",
    "fibre": "0.2 g",
    "sodium": "122 mg",
    "potassium": "434 mg",
    "phosphate": "319 mg",
    "salt": "0.30 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "Carnivore",
  "dietCategories": [
    "Keto",
    "Carnivore"
  ]
},
{
  "id": "sirloin-steak-with-a-baked-egg",
  "code": "L107",
  "category": "Lunch",
  "cuisine": "Simple cooking",
  "mealFamily": "eggs",
  "emoji": "🥗",
  "image": "/images/recipes/L107.webp",
  "name": "Sirloin steak with a baked egg",
  "description": "Pan-seared sirloin with a baked egg and its butter pan juices.",
  "cookingTime": "25 mins",
  "calories": "418 kcal",
  "protein": "32.3 g",
  "equipment": "Kitchen scales, Frying pan, Oven, Ramekin",
  "ingredients": [
    {
      "item": "Beef sirloin, lean and edible fat",
      "shoppingItem": "Beef sirloin, lean and edible fat",
      "quantity": "120 g (raw edible input)"
    },
    {
      "item": "Whole egg, shell removed",
      "shoppingItem": "Whole egg, shell removed",
      "quantity": "50 g (raw edible input)"
    },
    {
      "item": "Unsalted butter",
      "shoppingItem": "Unsalted butter",
      "quantity": "15 g (as sold)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "15 g (weighed grams)"
    }
  ],
  "method": [
      "Heat the oven to 190°C, or 170°C fan. Brush a small ramekin with 5 g of the butter, add the weighed egg and water and bake for 10–12 minutes until fully set. Check the centre as well as the surface; a browned top alone does not show that the inside is cooked.",
      "Heat the remaining 10 g butter in a non-stick pan. Sear the steak on every surface and cook to preference. Rest for 3 minutes, retaining the edible juices.",
      "Serve the entire steak, baked egg and all edible pan juices."
    ],
  "nutrition": {
    "calories": "418 kcal",
    "protein": "32.3 g",
    "carbohydrates": "0.1 g",
    "fat": "32.1 g",
    "fibre": "0.0 g",
    "sodium": "153 mg",
    "potassium": "461 mg",
    "phosphate": "309 mg",
    "salt": "0.38 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "Carnivore",
  "dietCategories": [
    "Keto",
    "Carnivore"
  ]
},
{
  "id": "pork-medallions-with-scrambled-eggs",
  "code": "L108",
  "category": "Lunch",
  "cuisine": "Simple cooking",
  "mealFamily": "eggs",
  "emoji": "🥗",
  "image": "/images/recipes/L108.webp",
  "name": "Pork medallions with scrambled eggs",
  "description": "Pork medallions with buttery scrambled eggs.",
  "cookingTime": "30 mins",
  "calories": "444 kcal",
  "protein": "39.9 g",
  "equipment": "Kitchen scales, Knife and chopping board, Mixing bowl, Fork or whisk, Frying pan, Food thermometer",
  "ingredients": [
    {
      "item": "Pork fillet, lean and visible edible fat",
      "shoppingItem": "Pork fillet, lean and visible edible fat",
      "quantity": "120 g (raw edible input)"
    },
    {
      "item": "Whole egg, shell removed",
      "shoppingItem": "Whole egg, shell removed",
      "quantity": "100 g (raw edible input)"
    },
    {
      "item": "Unsalted butter",
      "shoppingItem": "Unsalted butter",
      "quantity": "25 g (as sold)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "15 g (weighed grams)"
    }
  ],
  "method": [
      "Slice the pork into medallions. Cook in 10 g of the butter over medium heat, turning, until the centres reach 75°C for 30 seconds. Keep warm with all edible pan juices.",
      "Beat the weighed egg and water. Melt the remaining 15 g butter in a clean non-stick pan and cook the eggs gently until fully set. Swirl the pan as the butter melts to coat its base. Keep it from browning or smoking before the next ingredient is added.",
      "Serve all the pork, eggs, butter and edible juices."
    ],
  "nutrition": {
    "calories": "444 kcal",
    "protein": "39.9 g",
    "carbohydrates": "0.1 g",
    "fat": "31.7 g",
    "fibre": "0.0 g",
    "sodium": "207 mg",
    "potassium": "649 mg",
    "phosphate": "451 mg",
    "salt": "0.52 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "Carnivore",
  "dietCategories": [
    "Keto",
    "Carnivore"
  ]
},
{
  "id": "chicken-and-egg-mini-patties",
  "code": "L109",
  "category": "Lunch",
  "cuisine": "Simple cooking",
  "mealFamily": "cakes",
  "emoji": "🥗",
  "image": "/images/recipes/L109.webp",
  "name": "Chicken and egg mini patties",
  "description": "Small chicken thigh patties bound with egg and cooked in butter.",
  "cookingTime": "30 mins",
  "calories": "367 kcal",
  "protein": "35.7 g",
  "equipment": "Kitchen scales, Knife and chopping board, Mixing bowl, Frying pan, Food thermometer",
  "ingredients": [
    {
      "item": "Skinless boneless chicken thigh",
      "shoppingItem": "Skinless boneless chicken thigh",
      "quantity": "140 g (raw edible input)"
    },
    {
      "item": "Whole egg, shell removed",
      "shoppingItem": "Whole egg, shell removed",
      "quantity": "50 g (raw edible input)"
    },
    {
      "item": "Unsalted butter",
      "shoppingItem": "Unsalted butter",
      "quantity": "20 g (as sold)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "20 g (weighed grams)"
    }
  ],
  "method": [
      "Mince the plain skinless boneless chicken thigh at home. Mix with the weighed egg and form four small, thin patties.",
      "Melt all the butter in a non-stick pan. Swirl the pan as the butter melts to coat its base. Keep it from browning or smoking before the next ingredient is added. Cook the patties over medium-low heat for 5–6 minutes per side until the centres reach 75°C for 30 seconds. Leave space between the portions and let the underside set before moving them. Slide a thin spatula underneath and turn carefully, keeping each portion together.",
      "Transfer the patties to a plate. Add the measured water to the pan, heat briefly and spoon all the edible butter and juices over all four patties."
    ],
  "nutrition": {
    "calories": "367 kcal",
    "protein": "35.7 g",
    "carbohydrates": "0.1 g",
    "fat": "24.9 g",
    "fibre": "0.0 g",
    "sodium": "205 mg",
    "potassium": "624 mg",
    "phosphate": "248 mg",
    "salt": "0.51 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "Carnivore",
  "dietCategories": [
    "Keto",
    "Carnivore"
  ]
},
{
  "id": "ginger-chicken-and-carrot-rice-bowl",
  "code": "L110",
  "category": "Lunch",
  "cuisine": "East Asia",
  "mealFamily": "rice",
  "emoji": "🥗",
  "image": "/images/recipes/L110.webp",
  "name": "Ginger chicken and carrot rice bowl",
  "description": "Chicken strips, tender carrots and rice with fresh ginger and chives.",
  "cookingTime": "30 mins",
  "calories": "484 kcal",
  "protein": "28.5 g",
  "equipment": "Kitchen scales, Knife and chopping board, Grater, Food thermometer, Lid or bowl cover, Saucepan, Frying pan",
  "ingredients": [
    {
      "item": "White basmati rice",
      "shoppingItem": "White basmati rice",
      "quantity": "50 g (dry)"
    },
    {
      "item": "Skinless boneless chicken breast",
      "shoppingItem": "Skinless boneless chicken breast",
      "quantity": "100 g (raw edible input)"
    },
    {
      "item": "Carrot",
      "shoppingItem": "Carrot",
      "quantity": "60 g (raw edible input)"
    },
    {
      "item": "Fresh ginger",
      "shoppingItem": "Fresh ginger",
      "quantity": "3 g (raw edible input)"
    },
    {
      "item": "Rapeseed oil",
      "shoppingItem": "Rapeseed oil",
      "quantity": "20 g (as sold, weighed grams)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "100 g (weighed grams)"
    },
    {
      "item": "Fresh chives",
      "shoppingItem": "Fresh chives",
      "quantity": "3 g (raw edible input)"
    },
    {
      "item": "Table salt",
      "shoppingItem": "Table salt",
      "quantity": "0.2 g (dry)"
    }
  ],
  "method": [
      "Cook the rice with all the measured water in a covered pan for 12–15 minutes, then rest for 5 minutes. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork. Keep the entire cooked rice portion.",
      "Finely slice the chicken and carrot. Cook in the oil with grated ginger for 8–10 minutes, covering briefly if needed, until the carrot is tender and chicken reaches 75°C for 30 seconds.",
      "Add the salt and chopped chives and serve all the chicken, carrot and edible pan juices with all the rice."
    ],
  "nutrition": {
    "calories": "484 kcal",
    "protein": "28.5 g",
    "carbohydrates": "42.8 g",
    "fat": "21.6 g",
    "fibre": "3.0 g",
    "sodium": "160 mg",
    "potassium": "537 mg",
    "phosphate": "283 mg",
    "salt": "0.40 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "Low FODMAP",
  "dietCategories": [
    "Low FODMAP"
  ]
},
{
  "id": "tuna-and-cucumber-rice-salad",
  "code": "L111",
  "category": "Lunch",
  "cuisine": "Mediterranean",
  "mealFamily": "salad",
  "emoji": "🥗",
  "image": "/images/recipes/L111.webp",
  "name": "Tuna and cucumber rice salad",
  "description": "Tuna and rice tossed with cucumber, carrot, parsley and lemon.",
  "cookingTime": "25 mins",
  "calories": "460 kcal",
  "protein": "24.6 g",
  "equipment": "Kitchen scales, Knife and chopping board, Mixing bowl, Grater, Lid or bowl cover, Saucepan",
  "ingredients": [
    {
      "item": "White basmati rice",
      "shoppingItem": "White basmati rice",
      "quantity": "50 g (dry)"
    },
    {
      "item": "Tuna canned in brine, drained",
      "shoppingItem": "Tuna canned in brine, drained",
      "quantity": "80 g (drained edible weight)"
    },
    {
      "item": "Cucumber",
      "shoppingItem": "Cucumber",
      "quantity": "40 g (raw edible input)"
    },
    {
      "item": "Carrot",
      "shoppingItem": "Carrot",
      "quantity": "30 g (raw edible input)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "20 g (as sold, weighed grams)"
    },
    {
      "item": "Fresh lemon juice",
      "shoppingItem": "Fresh lemon juice",
      "quantity": "10 g (freshly squeezed, weighed grams)"
    },
    {
      "item": "Fresh parsley",
      "shoppingItem": "Fresh parsley",
      "quantity": "3 g (raw edible input)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "100 g (weighed grams)"
    }
  ],
  "method": [
      "Cook the rice with all the measured water in a covered pan for 12–15 minutes, then rest for 5 minutes. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork.",
      "Drain plain brine-canned tuna and weigh the drained fish. Check the packet contains no onion, garlic, flavouring or added sauce. Dice the cucumber and grate the carrot.",
      "Mix the oil, lemon juice and parsley. Toss with all the rice, tuna and vegetables and serve the entire salad freshly prepared. Use a fork or broad spoon and a light lifting motion so the grains stay separate."
    ],
  "nutrition": {
    "calories": "460 kcal",
    "protein": "24.6 g",
    "carbohydrates": "41.0 g",
    "fat": "21.4 g",
    "fibre": "2.1 g",
    "sodium": "250 mg",
    "potassium": "374 mg",
    "phosphate": "204 mg",
    "salt": "0.62 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "Low FODMAP",
  "dietCategories": [
    "Low FODMAP"
  ]
},
{
  "id": "chive-and-spinach-rice-pancakes",
  "code": "L112",
  "category": "Lunch",
  "cuisine": "Britain",
  "mealFamily": "cakes",
  "emoji": "🥗",
  "image": "/images/recipes/L112.webp",
  "name": "Chive and spinach rice pancakes",
  "description": "Savoury rice pancakes with spinach, chives and a tender centre.",
  "cookingTime": "40 mins",
  "calories": "450 kcal",
  "protein": "18.7 g",
  "equipment": "Kitchen scales, Knife and chopping board, Mixing bowl, Fork or whisk, Frying pan",
  "ingredients": [
    {
      "item": "White rice flour",
      "shoppingItem": "White rice flour",
      "quantity": "45 g (dry edible input)"
    },
    {
      "item": "Whole egg, shell removed",
      "shoppingItem": "Whole egg, shell removed",
      "quantity": "50 g (raw edible input)"
    },
    {
      "item": "Fresh raw egg white, separated from shell eggs",
      "shoppingItem": "Fresh raw egg white, separated from shell eggs",
      "quantity": "80 g (raw edible input)"
    },
    {
      "item": "Baby spinach",
      "shoppingItem": "Baby spinach",
      "quantity": "30 g (raw edible input)"
    },
    {
      "item": "Fresh chives",
      "shoppingItem": "Fresh chives",
      "quantity": "3 g (raw edible input)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "20 g (as sold, weighed grams)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "85 g (weighed grams)"
    },
    {
      "item": "Table salt",
      "shoppingItem": "Table salt",
      "quantity": "0.2 g (dry)"
    }
  ],
  "method": [
      "Whisk the rice flour, weighed whole egg, egg white, measured water and salt into a smooth batter. Mix until the dry flour is incorporated and scrape down the sides of the bowl. The batter should be evenly combined before each portion is spooned into the pan. Rest for 10 minutes.",
      "Finely chop the spinach and chives and stir into the batter.",
      "Divide all the oil between three batches in a non-stick pan. Cook three medium pancakes for 3–4 minutes per side until the egg and rice flour are fully cooked. Keep the finished pancakes covered on a warm plate while cooking the remaining batches, then serve all three together."
    ],
  "nutrition": {
    "calories": "450 kcal",
    "protein": "18.7 g",
    "carbohydrates": "32.9 g",
    "fat": "25.0 g",
    "fibre": "1.5 g",
    "sodium": "318 mg",
    "potassium": "513 mg",
    "phosphate": "173 mg",
    "salt": "0.80 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "Low FODMAP",
  "dietCategories": [
    "Vegetarian",
    "Low FODMAP"
  ]
},
{
  "id": "basil-cod-with-warm-rice-salad",
  "code": "L113",
  "category": "Lunch",
  "cuisine": "Italy",
  "mealFamily": "salad",
  "emoji": "🥗",
  "image": "/images/recipes/L113.webp",
  "name": "Basil cod with warm rice salad",
  "description": "Basil and lemon cod with rice, carrot and cool cucumber.",
  "cookingTime": "30 mins",
  "calories": "450 kcal",
  "protein": "22.2 g",
  "equipment": "Kitchen scales, Mixing bowl, Oven, Grater, Lid or bowl cover, Baking tray, Saucepan",
  "ingredients": [
    {
      "item": "Cod fillet, flesh only",
      "shoppingItem": "Cod fillet, flesh only",
      "quantity": "100 g (raw edible input)"
    },
    {
      "item": "White basmati rice",
      "shoppingItem": "White basmati rice",
      "quantity": "50 g (dry)"
    },
    {
      "item": "Carrot",
      "shoppingItem": "Carrot",
      "quantity": "40 g (raw edible input)"
    },
    {
      "item": "Cucumber",
      "shoppingItem": "Cucumber",
      "quantity": "30 g (raw edible input)"
    },
    {
      "item": "Fresh basil",
      "shoppingItem": "Fresh basil",
      "quantity": "3 g (raw edible input)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "20 g (as sold, weighed grams)"
    },
    {
      "item": "Fresh lemon juice",
      "shoppingItem": "Fresh lemon juice",
      "quantity": "10 g (freshly squeezed, weighed grams)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "100 g (weighed grams)"
    },
    {
      "item": "Table salt",
      "shoppingItem": "Table salt",
      "quantity": "0.2 g (dry)"
    }
  ],
  "method": [
      "Cook the rice with all the measured water in a covered pan for 12–15 minutes, then rest for 5 minutes. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork.",
      "Brush the cod with half the oil and season with the salt. Bake at 200°C, or 180°C fan, for 12–15 minutes until opaque, steaming hot and flaking easily. Check the centre as well as the surface; a browned top alone does not show that the inside is cooked.",
      "Mix the remaining oil, lemon juice and chopped basil with the rice, grated carrot and diced cucumber. Serve all the salad with all the fish and edible juices."
    ],
  "nutrition": {
    "calories": "450 kcal",
    "protein": "22.2 g",
    "carbohydrates": "41.7 g",
    "fat": "21.2 g",
    "fibre": "2.4 g",
    "sodium": "186 mg",
    "potassium": "501 mg",
    "phosphate": "235 mg",
    "salt": "0.47 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "Low FODMAP",
  "dietCategories": [
    "Low FODMAP"
  ]
},
{
  "id": "beef-and-carrot-rice-bowl",
  "code": "L114",
  "category": "Lunch",
  "cuisine": "South America",
  "mealFamily": "rice",
  "emoji": "🥗",
  "image": "/images/recipes/L114.webp",
  "name": "Beef and carrot rice bowl",
  "description": "Quick-seared beef with ginger carrots, rice and chopped chives.",
  "cookingTime": "30 mins",
  "calories": "579 kcal",
  "protein": "26.1 g",
  "equipment": "Kitchen scales, knife, chopping board, mixing bowl, Frying pan, Lid or bowl cover",
  "ingredients": [
    {
      "item": "Beef sirloin, lean and edible fat",
      "shoppingItem": "Beef sirloin, lean and edible fat",
      "quantity": "100 g (raw edible input)"
    },
    {
      "item": "White basmati rice",
      "shoppingItem": "White basmati rice",
      "quantity": "50 g (dry)"
    },
    {
      "item": "Carrot",
      "shoppingItem": "Carrot",
      "quantity": "60 g (raw edible input)"
    },
    {
      "item": "Fresh ginger",
      "shoppingItem": "Fresh ginger",
      "quantity": "3 g (raw edible input)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "20 g (as sold, weighed grams)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "100 g (weighed grams)"
    },
    {
      "item": "Fresh chives",
      "shoppingItem": "Fresh chives",
      "quantity": "3 g (raw edible input)"
    },
    {
      "item": "Table salt",
      "shoppingItem": "Table salt",
      "quantity": "0.2 g (dry)"
    }
  ],
  "method": [
      "Cook the rice in all the measured water, covered, for 12–15 minutes and rest for 5 minutes. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork.",
      "Slice the beef and carrot thinly. Heat the oil and sear the beef surfaces. Add the carrot and ginger, cover and cook over medium-low heat for 5–7 minutes until the carrot is tender and the beef is cooked to preference.",
      "Stir in the salt and chives. Serve all the beef, carrot and edible juices with all the rice."
    ],
  "nutrition": {
    "calories": "579 kcal",
    "protein": "26.1 g",
    "carbohydrates": "42.8 g",
    "fat": "33.2 g",
    "fibre": "3.0 g",
    "sodium": "162 mg",
    "potassium": "487 mg",
    "phosphate": "243 mg",
    "salt": "0.40 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "Low FODMAP",
  "dietCategories": [
    "Low FODMAP"
  ]
},
{
  "id": "chive-omelette-with-soft-polenta-and-carrots",
  "code": "L115",
  "category": "Lunch",
  "cuisine": "Italy",
  "mealFamily": "eggs",
  "emoji": "🥗",
  "image": "/images/recipes/L115.webp",
  "name": "Chive omelette with soft polenta and carrots",
  "description": "A chive omelette with soft polenta and warm carrots.",
  "cookingTime": "35 mins",
  "calories": "446 kcal",
  "protein": "23.8 g",
  "equipment": "Kitchen scales, Knife and chopping board, Mixing bowl, Fork or whisk, Frying pan, Saucepan, Lid or bowl cover",
  "ingredients": [
    {
      "item": "Whole egg, shell removed",
      "shoppingItem": "Whole egg, shell removed",
      "quantity": "100 g (raw edible input)"
    },
    {
      "item": "Fresh raw egg white, separated from shell eggs",
      "shoppingItem": "Fresh raw egg white, separated from shell eggs",
      "quantity": "70 g (raw edible input)"
    },
    {
      "item": "Fine sifted cornmeal, not self-raising",
      "shoppingItem": "Fine sifted cornmeal, not self-raising",
      "quantity": "35 g (dry edible input)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "140 g (weighed grams)"
    },
    {
      "item": "Carrot",
      "shoppingItem": "Carrot",
      "quantity": "60 g (raw edible input)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "15 g (as sold, weighed grams)"
    },
    {
      "item": "Fresh chives",
      "shoppingItem": "Fresh chives",
      "quantity": "3 g (raw edible input)"
    },
    {
      "item": "Table salt",
      "shoppingItem": "Table salt",
      "quantity": "0.2 g (dry)"
    }
  ],
  "method": [
      "Bring all the measured water to a simmer. Look for small, gentle bubbles rather than a rolling boil. Stir along the bottom when needed to prevent sticking, and keep the heat low enough for the food to cook evenly. Whisk in the cornmeal and half the salt and cook gently for 20–25 minutes, stirring often, until fully tender. Retain the whole portion.",
      "Finely slice the carrot. Cook in 5 g of the oil in a covered non-stick pan over low heat for 8–10 minutes until tender; set aside with any edible juices.",
      "Beat the weighed egg and egg white with the chives and remaining salt. Heat the remaining 10 g oil and cook the egg as an omelette until fully set. Serve the whole omelette, all the polenta and carrots."
    ],
  "nutrition": {
    "calories": "446 kcal",
    "protein": "23.8 g",
    "carbohydrates": "28.9 g",
    "fat": "25.4 g",
    "fibre": "3.8 g",
    "sodium": "384 mg",
    "potassium": "425 mg",
    "phosphate": "241 mg",
    "salt": "0.96 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "Low FODMAP",
  "dietCategories": [
    "Vegetarian",
    "Low FODMAP"
  ]
},
{
  "id": "white-bean-and-brown-rice-salad",
  "code": "L116",
  "category": "Lunch",
  "cuisine": "Mediterranean",
  "mealFamily": "salad",
  "emoji": "🥗",
  "image": "/images/recipes/L116.webp",
  "name": "White-bean and brown rice salad",
  "description": "Brown and white rice with white beans, crunchy vegetables, parsley and walnuts.",
  "cookingTime": "40 mins",
  "calories": "438 kcal",
  "protein": "11.7 g",
  "equipment": "Kitchen scales, Knife and chopping board, Mixing bowl, Saucepan, Lid or bowl cover",
  "ingredients": [
    {
      "item": "Navy beans, boiled without salt and drained",
      "shoppingItem": "Navy beans, boiled without salt and drained",
      "quantity": "60 g (cooked drained edible weight)"
    },
    {
      "item": "Wholegrain brown basmati rice",
      "shoppingItem": "Wholegrain brown basmati rice",
      "quantity": "25 g (dry edible input)"
    },
    {
      "item": "White basmati rice",
      "shoppingItem": "White basmati rice",
      "quantity": "25 g (dry)"
    },
    {
      "item": "Cucumber",
      "shoppingItem": "Cucumber",
      "quantity": "60 g (raw edible input)"
    },
    {
      "item": "Red bell pepper",
      "shoppingItem": "Red bell pepper",
      "quantity": "40 g (raw edible input)"
    },
    {
      "item": "Rapeseed oil",
      "shoppingItem": "Rapeseed oil",
      "quantity": "10 g (as sold, weighed grams)"
    },
    {
      "item": "Fresh lemon juice",
      "shoppingItem": "Fresh lemon juice",
      "quantity": "15 g (freshly squeezed, weighed grams)"
    },
    {
      "item": "Fresh parsley",
      "shoppingItem": "Fresh parsley",
      "quantity": "3 g (raw edible input)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "110 g (weighed grams)"
    },
    {
      "item": "Unsalted walnut kernels",
      "shoppingItem": "Unsalted walnut kernels",
      "quantity": "10 g (as sold edible weight)"
    }
  ],
  "method": [
      "Simmer the brown rice in 70 g of the water, covered, for 15 minutes. Add the white rice and remaining 40 g water and simmer for another 12–15 minutes until both are tender; retain any liquid. Check both types of rice are tender, then rest covered off the heat for 5 minutes before loosening with a fork.",
      "Use navy beans previously boiled without salt and drained. Dice the cucumber and pepper and chop the parsley and walnuts. Keep the nuts together on the board and chop to a similar size. Leave some texture where the recipe uses them as a topping, rather than turning them into a smooth paste.",
      "Mix the oil and lemon juice and toss with all the rice, beans, vegetables, herbs and walnuts. Use a fork or broad spoon and a light lifting motion so the grains stay separate. Serve the entire portion."
    ],
  "nutrition": {
    "calories": "438 kcal",
    "protein": "11.7 g",
    "carbohydrates": "49.1 g",
    "fat": "18.6 g",
    "fibre": "9.5 g",
    "sodium": "10 mg",
    "potassium": "576 mg",
    "phosphate": "253 mg",
    "salt": "0.02 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "DASH-style",
  "dietCategories": [
    "Vegan",
    "Vegetarian",
    "DASH-style",
    "Blue Zone-inspired"
  ]
},
{
  "id": "lemon-chickpea-and-quinoa-bowl",
  "code": "L117",
  "category": "Lunch",
  "cuisine": "North Africa",
  "mealFamily": "plated meal",
  "emoji": "🥗",
  "image": "/images/recipes/L117.webp",
  "name": "Lemon chickpea and quinoa bowl",
  "description": "Quinoa and chickpeas with cumin carrots, cabbage, walnuts and lemon.",
  "cookingTime": "35 mins",
  "calories": "481 kcal",
  "protein": "17.6 g",
  "equipment": "Kitchen scales, Knife and chopping board, Lid or bowl cover, Saucepan, Frying pan",
  "ingredients": [
    {
      "item": "Quinoa",
      "shoppingItem": "Quinoa",
      "quantity": "60 g (dry edible input)"
    },
    {
      "item": "Chickpeas, boiled without salt and drained",
      "shoppingItem": "Chickpeas, boiled without salt and drained",
      "quantity": "80 g (cooked drained edible weight)"
    },
    {
      "item": "Carrot",
      "shoppingItem": "Carrot",
      "quantity": "50 g (raw edible input)"
    },
    {
      "item": "White cabbage",
      "shoppingItem": "White cabbage",
      "quantity": "50 g (raw edible input)"
    },
    {
      "item": "Rapeseed oil",
      "shoppingItem": "Rapeseed oil",
      "quantity": "10 g (as sold, weighed grams)"
    },
    {
      "item": "Fresh lemon juice",
      "shoppingItem": "Fresh lemon juice",
      "quantity": "15 g (freshly squeezed, weighed grams)"
    },
    {
      "item": "Fresh parsley",
      "shoppingItem": "Fresh parsley",
      "quantity": "4 g (raw edible input)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "160 g (weighed grams)"
    },
    {
      "item": "Ground cumin",
      "shoppingItem": "Ground cumin",
      "quantity": "0.5 g (dry)"
    },
    {
      "item": "Unsalted walnut kernels",
      "shoppingItem": "Unsalted walnut kernels",
      "quantity": "10 g (as sold edible weight)"
    }
  ],
  "method": [
      "Rinse the dry quinoa and cook in all the measured water, covered, for 15–18 minutes until tender and the water is absorbed. Rest for 5 minutes.",
      "Finely slice the carrot and cabbage. Cook in the oil with the cumin over low heat in a covered pan for 8–10 minutes. Add the cooked, drained chickpeas and heat through.",
      "Fold in all the quinoa, lemon juice, parsley and chopped walnuts and serve the entire bowl."
    ],
  "nutrition": {
    "calories": "481 kcal",
    "protein": "17.6 g",
    "carbohydrates": "50.9 g",
    "fat": "22.7 g",
    "fibre": "17.0 g",
    "sodium": "64 mg",
    "potassium": "999 mg",
    "phosphate": "316 mg",
    "salt": "0.16 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "DASH-style",
  "dietCategories": [
    "Vegan",
    "Vegetarian",
    "DASH-style",
    "Blue Zone-inspired"
  ]
},
{
  "id": "oat-and-carrot-pancakes-with-white-beans",
  "code": "L118",
  "category": "Lunch",
  "cuisine": "Britain",
  "mealFamily": "cakes",
  "emoji": "🥗",
  "image": "/images/recipes/L118.webp",
  "name": "Oat and carrot pancakes with white beans",
  "description": "Savoury oat pancakes with carrots and white beans, with lemon yoghurt.",
  "cookingTime": "35 mins",
  "calories": "418 kcal",
  "protein": "20.9 g",
  "equipment": "Kitchen scales, Mixing bowl, Frying pan, Grater, Blender or grinder",
  "ingredients": [
    {
      "item": "Unfortified porridge oats",
      "shoppingItem": "Unfortified porridge oats",
      "quantity": "40 g (dry edible input)"
    },
    {
      "item": "Fresh raw egg white, separated from shell eggs",
      "shoppingItem": "Fresh raw egg white, separated from shell eggs",
      "quantity": "80 g (raw edible input)"
    },
    {
      "item": "Carrot",
      "shoppingItem": "Carrot",
      "quantity": "80 g (raw edible input)"
    },
    {
      "item": "Navy beans, boiled without salt and drained",
      "shoppingItem": "Navy beans, boiled without salt and drained",
      "quantity": "60 g (cooked drained edible weight)"
    },
    {
      "item": "Rapeseed oil",
      "shoppingItem": "Rapeseed oil",
      "quantity": "10 g (as sold, weighed grams)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "50 g (weighed grams)"
    },
    {
      "item": "Fresh chives",
      "shoppingItem": "Fresh chives",
      "quantity": "3 g (raw edible input)"
    },
    {
      "item": "Fresh lemon juice",
      "shoppingItem": "Fresh lemon juice",
      "quantity": "10 g (freshly squeezed, weighed grams)"
    },
    {
      "item": "Plain low-fat yoghurt, about 1% fat",
      "shoppingItem": "Plain low-fat yoghurt, about 1% fat",
      "quantity": "50 g (as sold edible weight)"
    },
    {
      "item": "Ground black pepper",
      "shoppingItem": "Ground black pepper",
      "quantity": "0.2 g (dry)"
    }
  ],
  "method": [
      "Grind the oats to a coarse flour. Mix with the egg white and measured water and rest for 10 minutes.",
      "Mash the cooked, drained navy beans and stir into the batter with finely grated carrot, chives and pepper. Mix until the dry flour is incorporated and scrape down the sides of the bowl. The batter should be evenly combined before each portion is spooned into the pan.",
      "Heat all the oil in a wide non-stick pan large enough to hold three thin pancakes without crowding. Cook all three in one batch for 4–5 minutes per side until fully set and the carrots are tender. Mix the yoghurt and lemon juice and serve with all three pancakes."
    ],
  "nutrition": {
    "calories": "418 kcal",
    "protein": "20.9 g",
    "carbohydrates": "45.1 g",
    "fat": "14.4 g",
    "fibre": "12.7 g",
    "sodium": "204 mg",
    "potassium": "782 mg",
    "phosphate": "338 mg",
    "salt": "0.51 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "DASH-style",
  "dietCategories": [
    "Vegetarian",
    "DASH-style"
  ]
},
{
  "id": "lentil-and-barley-herb-salad",
  "code": "L119",
  "category": "Lunch",
  "cuisine": "Mediterranean",
  "mealFamily": "salad",
  "emoji": "🥗",
  "image": "/images/recipes/L119.webp",
  "name": "Lentil and barley herb salad",
  "description": "Lentils and pearl barley with peppers, cucumber, parsley and walnuts.",
  "cookingTime": "45 mins",
  "calories": "436 kcal",
  "protein": "13.7 g",
  "equipment": "Kitchen scales, Knife and chopping board, Mixing bowl, Saucepan, Lid or bowl cover, Colander or sieve",
  "ingredients": [
    {
      "item": "Green or brown lentils, boiled without salt and drained",
      "shoppingItem": "Green or brown lentils, boiled without salt and drained",
      "quantity": "100 g (cooked drained edible weight)"
    },
    {
      "item": "Pearl barley",
      "shoppingItem": "Pearl barley",
      "quantity": "40 g (dry edible input)"
    },
    {
      "item": "Red bell pepper",
      "shoppingItem": "Red bell pepper",
      "quantity": "60 g (raw edible input)"
    },
    {
      "item": "Cucumber",
      "shoppingItem": "Cucumber",
      "quantity": "60 g (raw edible input)"
    },
    {
      "item": "Rapeseed oil",
      "shoppingItem": "Rapeseed oil",
      "quantity": "12 g (as sold, weighed grams)"
    },
    {
      "item": "Fresh lemon juice",
      "shoppingItem": "Fresh lemon juice",
      "quantity": "15 g (freshly squeezed, weighed grams)"
    },
    {
      "item": "Fresh parsley",
      "shoppingItem": "Fresh parsley",
      "quantity": "5 g (raw edible input)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "130 g (weighed grams)"
    },
    {
      "item": "Unsalted walnut kernels",
      "shoppingItem": "Unsalted walnut kernels",
      "quantity": "10 g (as sold edible weight)"
    }
  ],
  "method": [
      "Simmer the dry pearl barley with all the measured water, covered, for 30–35 minutes until tender. Retain any remaining liquid and cool until just warm.",
      "Use green or brown lentils previously boiled without salt and drained. Dice the pepper and cucumber and chop the parsley and walnuts. Keep the nuts together on the board and chop to a similar size. Leave some texture where the recipe uses them as a topping, rather than turning them into a smooth paste.",
      "Mix the oil and lemon juice and toss with all the barley, lentils, vegetables, herbs and walnuts. Serve the entire salad."
    ],
  "nutrition": {
    "calories": "436 kcal",
    "protein": "13.7 g",
    "carbohydrates": "47.6 g",
    "fat": "20.8 g",
    "fibre": "16.3 g",
    "sodium": "12 mg",
    "potassium": "636 mg",
    "phosphate": "256 mg",
    "salt": "0.03 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "DASH-style",
  "dietCategories": [
    "Vegan",
    "Vegetarian",
    "DASH-style",
    "Blue Zone-inspired"
  ]
},
{
  "id": "ginger-tofu-and-brown-rice-bowl",
  "code": "L120",
  "category": "Lunch",
  "cuisine": "East Asia",
  "mealFamily": "rice",
  "emoji": "🥗",
  "image": "/images/recipes/L120.webp",
  "name": "Ginger tofu and brown rice bowl",
  "description": "Tofu, cabbage and carrots over brown and white rice with ginger and sesame.",
  "cookingTime": "40 mins",
  "calories": "427 kcal",
  "protein": "14.3 g",
  "equipment": "Kitchen scales, Saucepan, Lid or bowl cover",
  "ingredients": [
    {
      "item": "Wholegrain brown basmati rice",
      "shoppingItem": "Wholegrain brown basmati rice",
      "quantity": "35 g (dry edible input)"
    },
    {
      "item": "White basmati rice",
      "shoppingItem": "White basmati rice",
      "quantity": "20 g (dry)"
    },
    {
      "item": "Regular tofu, made with calcium sulphate, gently drained",
      "shoppingItem": "Regular tofu, made with calcium sulphate, gently drained",
      "quantity": "100 g (as sold edible weight, unpressed)"
    },
    {
      "item": "Carrot",
      "shoppingItem": "Carrot",
      "quantity": "60 g (raw edible input)"
    },
    {
      "item": "White cabbage",
      "shoppingItem": "White cabbage",
      "quantity": "50 g (raw edible input)"
    },
    {
      "item": "Rapeseed oil",
      "shoppingItem": "Rapeseed oil",
      "quantity": "12 g (as sold, weighed grams)"
    },
    {
      "item": "Soy sauce",
      "shoppingItem": "Soy sauce",
      "quantity": "3 g (as sold, weighed grams)"
    },
    {
      "item": "Fresh ginger",
      "shoppingItem": "Fresh ginger",
      "quantity": "3 g (raw edible input)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "120 g (weighed grams)"
    },
    {
      "item": "Fresh coriander leaves",
      "shoppingItem": "Fresh coriander leaves",
      "quantity": "3 g (raw edible input)"
    },
    {
      "item": "Sesame seeds",
      "shoppingItem": "Sesame seeds",
      "quantity": "2 g (dry)"
    }
  ],
  "method": [
      "Simmer the brown rice in 80 g of the water, covered, for 15 minutes. Add the white rice and remaining 40 g water and cook covered for another 12–15 minutes until tender, retaining any liquid. Check both types of rice are tender, then rest covered off the heat for 5 minutes before loosening with a fork.",
      "While the rice cooks, use regular calcium-sulphate tofu, gently drained without pressing. Cube it and cook in the oil for 5 minutes. Add finely shredded carrot, cabbage and ginger, cover and cook for 6–8 minutes until tender.",
      "Add the soy sauce, coriander and sesame. Serve all the tofu, vegetables and edible juices with all the rice."
    ],
  "nutrition": {
    "calories": "427 kcal",
    "protein": "14.3 g",
    "carbohydrates": "49.1 g",
    "fat": "19.4 g",
    "fibre": "5.9 g",
    "sodium": "199 mg",
    "potassium": "481 mg",
    "phosphate": "266 mg",
    "salt": "0.50 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "DASH-style",
  "dietCategories": [
    "Vegan",
    "Vegetarian",
    "DASH-style",
    "Blue Zone-inspired"
  ]
},
{
  "id": "white-bean-walnut-pasta-with-frittata-ribbons",
  "code": "L121",
  "category": "Lunch",
  "cuisine": "Italy",
  "mealFamily": "pasta",
  "emoji": "🥗",
  "image": "/images/recipes/L121.webp",
  "name": "White-bean walnut pasta with frittata ribbons",
  "description": "Pasta with white beans, vegetables, walnuts and basil, topped with egg-white ribbons.",
  "cookingTime": "35 mins",
  "calories": "723 kcal",
  "protein": "28.1 g",
  "equipment": "Kitchen scales, Knife and chopping board, Colander or sieve",
  "ingredients": [
    {
      "item": "Egg-free plain dried white wheat pasta",
      "shoppingItem": "Egg-free plain dried white wheat pasta",
      "quantity": "60 g (dry)"
    },
    {
      "item": "Navy beans, boiled without salt and drained",
      "shoppingItem": "Navy beans, boiled without salt and drained",
      "quantity": "100 g (cooked drained edible weight)"
    },
    {
      "item": "Courgette",
      "shoppingItem": "Courgette",
      "quantity": "70 g (raw edible input)"
    },
    {
      "item": "Red bell pepper",
      "shoppingItem": "Red bell pepper",
      "quantity": "50 g (raw edible input)"
    },
    {
      "item": "Unsalted walnut kernels",
      "shoppingItem": "Unsalted walnut kernels",
      "quantity": "20 g (as sold edible weight)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "20 g (as sold, weighed grams)"
    },
    {
      "item": "Fresh basil",
      "shoppingItem": "Fresh basil",
      "quantity": "5 g (raw edible input)"
    },
    {
      "item": "Fresh lemon juice",
      "shoppingItem": "Fresh lemon juice",
      "quantity": "20 g (freshly squeezed, weighed grams)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "40 g (weighed grams)"
    },
    {
      "item": "Fresh raw egg white, separated from shell eggs",
      "shoppingItem": "Fresh raw egg white, separated from shell eggs",
      "quantity": "80 g (raw edible input)"
    },
    {
      "item": "Ground black pepper",
      "shoppingItem": "Ground black pepper",
      "quantity": "0.2 g (dry)"
    }
  ],
  "method": [
      "Cook the dry pasta in a separate pan of unsalted water according to the packet and drain. Separate the pasta or noodles as they soften so they do not stick together. Check the texture towards the end of the cooking time; it should be tender with no chalky centre. Cook the weighed egg white in 5 g of the oil as a thin pancake until fully set; cut into ribbons. Leave space between the portions and let the underside set before moving them. Slide a thin spatula underneath and turn carefully, keeping each portion together.",
      "Dice the courgette and pepper and cook in the remaining 15 g oil for 6–8 minutes. Add the cooked, drained navy beans and all the measured water and heat through.",
      "Toss in all the pasta, chopped walnuts, basil, lemon juice and pepper. Add all the frittata ribbons and serve the entire portion."
    ],
  "nutrition": {
    "calories": "723 kcal",
    "protein": "28.1 g",
    "carbohydrates": "61.8 g",
    "fat": "35.5 g",
    "fibre": "15.4 g",
    "sodium": "153 mg",
    "potassium": "1128 mg",
    "phosphate": "380 mg",
    "salt": "0.38 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "Intermittent fasting — eating-window meal",
  "dietCategories": [
    "Vegetarian",
    "Mediterranean-style",
    "DASH-style",
    "Intermittent fasting — eating-window meal"
  ]
},
{
  "id": "chicken-groundnut-and-black-eyed-pea-rice-bowl",
  "code": "L122",
  "category": "Lunch",
  "cuisine": "Ghana",
  "mealFamily": "rice",
  "emoji": "🥗",
  "image": "/images/recipes/L122.webp",
  "name": "Chicken, groundnut and black-eyed pea rice bowl",
  "description": "Chicken and black-eyed peas in a groundnut and pepper sauce with rice.",
  "cookingTime": "40 mins",
  "calories": "738 kcal",
  "protein": "41.2 g",
  "equipment": "Kitchen scales, Knife and chopping board, Saucepan, Food thermometer, Lid or bowl cover",
  "ingredients": [
    {
      "item": "Skinless boneless chicken breast",
      "shoppingItem": "Skinless boneless chicken breast",
      "quantity": "100 g (raw edible input)"
    },
    {
      "item": "White basmati rice",
      "shoppingItem": "White basmati rice",
      "quantity": "60 g (dry)"
    },
    {
      "item": "Black-eyed peas, boiled without salt and drained",
      "shoppingItem": "Black-eyed peas, boiled without salt and drained",
      "quantity": "80 g (cooked drained edible weight)"
    },
    {
      "item": "Unsalted dry-roasted peanuts",
      "shoppingItem": "Unsalted dry-roasted peanuts",
      "quantity": "20 g (as sold edible weight)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "20 g (as sold, weighed grams)"
    },
    {
      "item": "Fresh tomato",
      "shoppingItem": "Fresh tomato",
      "quantity": "50 g (raw edible input)"
    },
    {
      "item": "Red bell pepper",
      "shoppingItem": "Red bell pepper",
      "quantity": "50 g (raw edible input)"
    },
    {
      "item": "Onion",
      "shoppingItem": "Onion",
      "quantity": "20 g (raw edible input)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "130 g (weighed grams)"
    },
    {
      "item": "Garlic",
      "shoppingItem": "Garlic",
      "quantity": "2 g (raw edible input)"
    },
    {
      "item": "Fresh ginger",
      "shoppingItem": "Fresh ginger",
      "quantity": "3 g (raw edible input)"
    },
    {
      "item": "Sweet paprika",
      "shoppingItem": "Sweet paprika",
      "quantity": "1 g (dry)"
    },
    {
      "item": "Fresh coriander leaves",
      "shoppingItem": "Fresh coriander leaves",
      "quantity": "4 g (raw edible input)"
    }
  ],
  "method": [
      "Cook the rice with 125 g of the water in a covered pan for 12–15 minutes, then rest for 5 minutes. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork.",
      "Dice the chicken and vegetables and grind the peanuts. Keep the nuts together on the board and chop to a similar size. Leave some texture where the recipe uses them as a topping, rather than turning them into a smooth paste. Soften onion, garlic and ginger in the oil for 4 minutes. Add chicken and paprika and cook for 4 minutes.",
      "Add chopped tomato, pepper, cooked drained black-eyed peas, ground peanuts and remaining 5 g water. Cover and simmer gently for 12–15 minutes until chicken reaches 75°C for 30 seconds and vegetables are tender. Look for small, gentle bubbles rather than a rolling boil. Stir along the bottom when needed to prevent sticking, and keep the heat low enough for the food to cook evenly. Stir in the coriander and serve all the stew with all the rice."
    ],
  "nutrition": {
    "calories": "738 kcal",
    "protein": "41.2 g",
    "carbohydrates": "65.6 g",
    "fat": "32.1 g",
    "fibre": "10.1 g",
    "sodium": "75 mg",
    "potassium": "1081 mg",
    "phosphate": "515 mg",
    "salt": "0.19 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "Intermittent fasting — eating-window meal",
  "dietCategories": [
    "Mediterranean-style",
    "Intermittent fasting — eating-window meal"
  ]
},
{
  "id": "lime-fish-and-avocado-rice-bowl",
  "code": "L123",
  "category": "Lunch",
  "cuisine": "Peru",
  "mealFamily": "rice",
  "emoji": "🥗",
  "image": "/images/recipes/L123.webp",
  "name": "Lime fish and avocado rice bowl",
  "description": "Lime baked fish with rice, avocado and a creamy cabbage and carrot slaw.",
  "cookingTime": "35 mins",
  "calories": "782 kcal",
  "protein": "28.6 g",
  "equipment": "Kitchen scales, Mixing bowl, Oven, Lid or bowl cover, Baking tray",
  "ingredients": [
    {
      "item": "Cod fillet, flesh only",
      "shoppingItem": "Cod fillet, flesh only",
      "quantity": "120 g (raw edible input)"
    },
    {
      "item": "White basmati rice",
      "shoppingItem": "White basmati rice",
      "quantity": "60 g (dry)"
    },
    {
      "item": "Hass avocado flesh, skin and stone removed",
      "shoppingItem": "Hass avocado flesh, skin and stone removed",
      "quantity": "70 g (raw edible input)"
    },
    {
      "item": "White cabbage",
      "shoppingItem": "White cabbage",
      "quantity": "70 g (raw edible input)"
    },
    {
      "item": "Carrot",
      "shoppingItem": "Carrot",
      "quantity": "40 g (raw edible input)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "25 g (as sold, weighed grams)"
    },
    {
      "item": "Standard mayonnaise",
      "shoppingItem": "Standard mayonnaise",
      "quantity": "15 g (as sold)"
    },
    {
      "item": "Fresh lime juice",
      "shoppingItem": "Fresh lime juice",
      "quantity": "25 g (freshly squeezed, weighed grams)"
    },
    {
      "item": "Fresh coriander leaves",
      "shoppingItem": "Fresh coriander leaves",
      "quantity": "6 g (raw edible input)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "135 g (weighed grams)"
    },
    {
      "item": "Ground black pepper",
      "shoppingItem": "Ground black pepper",
      "quantity": "0.2 g (dry)"
    }
  ],
  "method": [
      "Cook the rice with all the measured water, covered, for 12–15 minutes, then rest for 5 minutes. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork.",
      "Brush the cod with 10 g of the oil and half the lime juice. Bake at 200°C, or 180°C fan, for 12–15 minutes until opaque and steaming hot. Check the centre as well as the surface; a browned top alone does not show that the inside is cooked.",
      "Mix mayonnaise, remaining 15 g oil, remaining lime juice, chopped coriander and pepper. Toss with shredded cabbage and carrot. Serve all the fish and edible juices with all the rice, weighed avocado flesh and slaw."
    ],
  "nutrition": {
    "calories": "782 kcal",
    "protein": "28.6 g",
    "carbohydrates": "54.1 g",
    "fat": "49.7 g",
    "fibre": "6.8 g",
    "sodium": "159 mg",
    "potassium": "1133 mg",
    "phosphate": "334 mg",
    "salt": "0.40 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "Intermittent fasting — eating-window meal",
  "dietCategories": [
    "Mediterranean-style",
    "Intermittent fasting — eating-window meal"
  ]
},
{
  "id": "potato-and-herb-cakes-with-egg-salad",
  "code": "L124",
  "category": "Lunch",
  "cuisine": "Britain",
  "mealFamily": "cakes",
  "emoji": "🥗",
  "image": "/images/recipes/L124.webp",
  "name": "Potato and herb cakes with egg salad",
  "description": "Crisp potato and herb cakes with chopped egg, cucumber and creamy lemon dressing.",
  "cookingTime": "40 mins",
  "calories": "710 kcal",
  "protein": "23.7 g",
  "equipment": "Kitchen scales, Knife and chopping board, Mixing bowl",
  "ingredients": [
    {
      "item": "Peeled potato, boiled in unsalted water and drained",
      "shoppingItem": "Peeled potato, boiled in unsalted water and drained",
      "quantity": "140 g (cooked drained edible weight)"
    },
    {
      "item": "White rice flour",
      "shoppingItem": "White rice flour",
      "quantity": "35 g (dry edible input)"
    },
    {
      "item": "Whole egg, shell removed",
      "shoppingItem": "Whole egg, shell removed",
      "quantity": "50 g (raw edible input)"
    },
    {
      "item": "Fresh raw egg white, separated from shell eggs",
      "shoppingItem": "Fresh raw egg white, separated from shell eggs",
      "quantity": "100 g (raw edible input)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "20 g (as sold, weighed grams)"
    },
    {
      "item": "Standard mayonnaise",
      "shoppingItem": "Standard mayonnaise",
      "quantity": "25 g (as sold)"
    },
    {
      "item": "Lettuce",
      "shoppingItem": "Lettuce",
      "quantity": "60 g (raw edible input)"
    },
    {
      "item": "Cucumber",
      "shoppingItem": "Cucumber",
      "quantity": "60 g (raw edible input)"
    },
    {
      "item": "Fresh lemon juice",
      "shoppingItem": "Fresh lemon juice",
      "quantity": "20 g (freshly squeezed, weighed grams)"
    },
    {
      "item": "Fresh chives",
      "shoppingItem": "Fresh chives",
      "quantity": "5 g (raw edible input)"
    },
    {
      "item": "Ground black pepper",
      "shoppingItem": "Ground black pepper",
      "quantity": "0.2 g (dry)"
    }
  ],
  "method": [
      "Use peeled potato previously boiled without salt and drained; weigh 140 g cooked. Weigh this ingredient after the cooking and draining described here; the same weight of the dry or raw ingredient would make a different portion. Mash, cool and mix with the rice flour, weighed egg white, half the chives and pepper. Form four thin cakes.",
      "Cook the weighed whole egg in a small ramekin brushed with 5 g of the oil, steaming until fully set. Cool and chop. Cook all four potato cakes in the remaining 15 g oil over medium-low heat for 5–6 minutes per side until fully cooked. Leave space between the portions and let the underside set before moving them. Slide a thin spatula underneath and turn carefully, keeping each portion together.",
      "Mix the mayonnaise, lemon juice and remaining chives. Toss with chopped egg, sliced cucumber and lettuce. Serve all the cakes and salad."
    ],
  "nutrition": {
    "calories": "710 kcal",
    "protein": "23.7 g",
    "carbohydrates": "50.5 g",
    "fat": "44.1 g",
    "fibre": "4.6 g",
    "sodium": "306 mg",
    "potassium": "1088 mg",
    "phosphate": "223 mg",
    "salt": "0.77 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "Intermittent fasting — eating-window meal",
  "dietCategories": [
    "Vegetarian",
    "Mediterranean-style",
    "Intermittent fasting — eating-window meal"
  ]
},
{
  "id": "ginger-tofu-and-peanut-noodle-salad",
  "code": "L125",
  "category": "Lunch",
  "cuisine": "East Asia",
  "mealFamily": "pasta",
  "emoji": "🥗",
  "image": "/images/recipes/L125.webp",
  "name": "Ginger tofu and peanut noodle salad",
  "description": "Rice noodles with tofu, crunchy vegetables and a ginger, peanut and lime dressing.",
  "cookingTime": "30 mins",
  "calories": "738 kcal",
  "protein": "24.5 g",
  "equipment": "Kitchen scales, Knife and chopping board, Blender or food processor, Grater, Colander or sieve",
  "ingredients": [
    {
      "item": "Rice noodles",
      "shoppingItem": "Rice noodles",
      "quantity": "60 g (dry)"
    },
    {
      "item": "Regular tofu, made with calcium sulphate, gently drained",
      "shoppingItem": "Regular tofu, made with calcium sulphate, gently drained",
      "quantity": "180 g (as sold edible weight, unpressed)"
    },
    {
      "item": "Unsalted dry-roasted peanuts",
      "shoppingItem": "Unsalted dry-roasted peanuts",
      "quantity": "20 g (as sold edible weight)"
    },
    {
      "item": "Rapeseed oil",
      "shoppingItem": "Rapeseed oil",
      "quantity": "20 g (as sold, weighed grams)"
    },
    {
      "item": "Sesame oil",
      "shoppingItem": "Sesame oil",
      "quantity": "5 g (as sold, weighed grams)"
    },
    {
      "item": "Cucumber",
      "shoppingItem": "Cucumber",
      "quantity": "80 g (raw edible input)"
    },
    {
      "item": "Carrot",
      "shoppingItem": "Carrot",
      "quantity": "60 g (raw edible input)"
    },
    {
      "item": "Soy sauce",
      "shoppingItem": "Soy sauce",
      "quantity": "5 g (as sold, weighed grams)"
    },
    {
      "item": "Fresh lime juice",
      "shoppingItem": "Fresh lime juice",
      "quantity": "20 g (freshly squeezed, weighed grams)"
    },
    {
      "item": "Fresh ginger",
      "shoppingItem": "Fresh ginger",
      "quantity": "5 g (raw edible input)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "60 g (weighed grams)"
    },
    {
      "item": "Fresh coriander leaves",
      "shoppingItem": "Fresh coriander leaves",
      "quantity": "5 g (raw edible input)"
    }
  ],
  "method": [
      "Cook the rice noodles in a separate pan of unsalted water according to the packet and drain. Separate the pasta or noodles as they soften so they do not stick together. Check the texture towards the end of the cooking time; it should be tender with no chalky centre.",
      "Use regular calcium-sulphate tofu, gently drained without pressing. Cut into cubes and cook in all the rapeseed oil for 6–8 minutes until hot.",
      "Blend the peanuts, sesame oil, soy sauce, lime juice, ginger and measured water. Toss with all the noodles, tofu and edible pan juices, sliced cucumber, grated carrot and coriander. Serve the entire bowl freshly prepared."
    ],
  "nutrition": {
    "calories": "738 kcal",
    "protein": "24.5 g",
    "carbohydrates": "59.6 g",
    "fat": "44.6 g",
    "fibre": "6.4 g",
    "sodium": "423 mg",
    "potassium": "673 mg",
    "phosphate": "375 mg",
    "salt": "1.06 g"
  },
  "potassium": "Pending review",
  "phosphate": "Pending review",
  "purines": "Pending review",
  "nutritionBasis": "CoFID/USDA ingredient-input estimate",
  "nutritionIncomplete": [],
  "nutritionSourceNote": "Based on the listed edible ingredient weights and CoFID/USDA food-composition records. Carbohydrate excludes fibre. Purchased products and preparation can change the figures.",
  "servings": 1,
  "shoppingByWeight": true,
  "primaryDietCategory": "Intermittent fasting — eating-window meal",
  "dietCategories": [
    "Vegan",
    "Vegetarian",
    "Intermittent fasting — eating-window meal",
    "Blue Zone-inspired"
  ]
}
];
