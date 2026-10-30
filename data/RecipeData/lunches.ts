import type { Recipe } from "./types";

export const lunches: Recipe[] = [
  {
    id: "chicken-lettuce-sandwich",
    code: "L001", mealFamily: "sandwich",
    category: "Lunch",
    emoji: "🥪",
    image: "/images/recipes/L001.webp",
    name: "Chicken & Lettuce Sandwich",
    description: "Tender pan-cooked chicken and crisp iceberg lettuce come together in soft white bread with a smooth layer of mayonnaise.",
    cookingTime: "15 minutes",
    calories: "372 kcal",
    protein: "24.0 g",
    equipment: "Knife, Chopping board, Butter knife",
    ingredients: [
      { item: "White bread", shoppingItem: "White bread", quantity: "2 slices (70 g)" },
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "75 g (raw)" },
      { item: "Iceberg lettuce", shoppingItem: "Iceberg lettuce", quantity: "2 leaves (shredded if preferred)" },
      { item: "Mayonnaise", shoppingItem: "Mayonnaise", quantity: "20 g" },
    ],
    method: [
      "00:00 — Wash and prepare the salad vegetables. Cut the chicken breast into thin strips.",
      "02:00 — Heat a non-stick frying pan over medium heat and cook the chicken for 6–8 minutes, turning regularly, until completely cooked through. Remove from the pan and allow to rest briefly.",
      "10:00 — Spread the measured mayonnaise evenly over the bread.",
      "12:00 — Arrange the cooked chicken and prepared vegetables over the bread.",
      "15:00 — Close the sandwich, cut in half if desired and serve immediately."
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
    nutritionSourceNote: "Owner-approved source assumptions D4 are documented in the 16 October 2026 reconciliation workbook.",},
  {
    id: "egg-lettuce-sandwich",
    code: "L002", mealFamily: "sandwich",
    category: "Lunch",
    emoji: "🥪",
    image: "/images/recipes/L002.webp",
    name: "Egg & Lettuce Sandwich",
    description: "Slices of hard-boiled egg and crisp lettuce are tucked into soft white bread with creamy mayonnaise for a classic, satisfying sandwich.",
    cookingTime: "14 minutes",
    calories: "401 kcal",
    protein: "20.0 g",
    equipment: "Knife, Chopping board, Butter knife, Saucepan",
    ingredients: [
      { item: "White bread", shoppingItem: "White bread", quantity: "2 slices (70 g)" },
      { item: "Egg", shoppingItem: "Egg", quantity: "2" },
      { item: "Iceberg lettuce", shoppingItem: "Iceberg lettuce", quantity: "2 leaves (shredded if preferred)" },
      { item: "Mayonnaise", shoppingItem: "Mayonnaise", quantity: "15 g" },
    ],
    method: [
      "00:00 — Place the eggs in a saucepan and cover with cold water.",
      "01:00 — Bring the water to a boil.",
      "02:00 — Once boiling, cook the eggs for 8–10 minutes.",
      "10:00 — Drain, cool under cold running water and peel the eggs.",
      "12:00 — Slice the eggs and arrange on the bread with mayonnaise and lettuce.",
      "14:00 — Close the sandwich, cut in half if desired and serve."
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
    quantityConversionsEstimated: true,},
  {
    id: "tuna-lettuce-sandwich",
    code: "L003", mealFamily: "sandwich",
    category: "Lunch",
    emoji: "🥪",
    image: "/images/recipes/L003.webp",
    name: "Tuna & Lettuce Sandwich",
    description: "Flaked tuna folded through creamy mayonnaise and layered with crisp lettuce makes a quick, savoury sandwich.",
    cookingTime: "8 minutes",
    calories: "358 kcal",
    protein: "20.9 g",
    equipment: "Knife, Chopping board, Butter knife",
    ingredients: [
      { item: "White bread", shoppingItem: "White bread", quantity: "2 slices (70 g)" },
      { item: "Tuna, canned in brine, drained", shoppingItem: "Tuna, canned in brine, drained", quantity: "60 g" },
      { item: "Iceberg lettuce", shoppingItem: "Iceberg lettuce", quantity: "2 leaves (shredded if preferred)" },
      { item: "Mayonnaise", shoppingItem: "Mayonnaise", quantity: "20 g" },
    ],
    method: [
      "00:00 — Drain the tuna thoroughly and prepare the lettuce.",
      "02:00 — Mix the tuna with the measured mayonnaise.",
      "04:00 — Spread the tuna mixture over the bread.",
      "06:00 — Add the lettuce and close the sandwich.",
      "08:00 — Cut in half if desired and serve."
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
    quantityConversionsEstimated: true,},
  {
    id: "chicken-cucumber-sandwich",
    code: "L004", mealFamily: "sandwich",
    category: "Lunch",
    emoji: "🥪",
    image: "/images/recipes/L004.webp",
    name: "Chicken & Cucumber Sandwich",
    description: "Tender chicken and cool, crunchy cucumber meet a creamy mayonnaise spread in soft white bread for a fresh, easy lunch.",
    cookingTime: "15 minutes",
    calories: "377 kcal",
    protein: "24.3 g",
    equipment: "Knife, Chopping board, Butter knife",
    ingredients: [
      { item: "White bread", shoppingItem: "White bread", quantity: "2 slices (70 g)" },
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "75 g (raw)" },
      { item: "Cucumber", shoppingItem: "Cucumber", quantity: "½ cucumber (50 g)" },
      { item: "Mayonnaise", shoppingItem: "Mayonnaise", quantity: "20 g" },
    ],
    method: [
      "00:00 — Wash and prepare the salad vegetables. Cut the chicken breast into thin strips.",
      "02:00 — Heat a non-stick frying pan over medium heat and cook the chicken for 6–8 minutes, turning regularly, until completely cooked through. Remove from the pan and allow to rest briefly.",
      "10:00 — Spread the measured mayonnaise evenly over the bread.",
      "12:00 — Arrange the cooked chicken and prepared vegetables over the bread.",
      "15:00 — Close the sandwich, cut in half if desired and serve immediately."
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
    nutritionSourceNote: "Owner-approved source assumptions D4 are documented in the 16 October 2026 reconciliation workbook.",},
  {
    id: "egg-mayo-sandwich",
    code: "L005", mealFamily: "sandwich",
    category: "Lunch",
    emoji: "🥪",
    image: "/images/recipes/L005.webp",
    name: "Egg Mayo Sandwich",
    description: "Classic egg mayonnaise with a fresh hint of chives, piled onto soft white bread for a simple, comforting lunch.",
    cookingTime: "14 minutes",
    calories: "469 kcal",
    protein: "20.0 g",
    equipment: "Knife, Chopping board, Butter knife, Saucepan",
    ingredients: [
      { item: "White bread", shoppingItem: "White bread", quantity: "2 slices (70 g)" },
      { item: "Egg", shoppingItem: "Egg", quantity: "2" },
      { item: "Mayonnaise", shoppingItem: "Mayonnaise", quantity: "25 g" },
      { item: "Fresh chives", shoppingItem: "Fresh chives", quantity: "3 g" },
    ],
    method: [
      "00:00 — Place the egg in a saucepan and cover with cold water.",
      "01:00 — Bring the water to a boil.",
      "02:00 — Cook the egg for 8–10 minutes.",
      "10:00 — Drain, cool under cold running water and peel.",
      "12:00 — Chop the egg and mix with mayonnaise and chopped chives.",
      "14:00 — Spread the mixture over the bread and serve."
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
    quantityConversionsEstimated: true,},
  {
    id: "chicken-red-pepper-sandwich",
    code: "L006", mealFamily: "sandwich",
    category: "Lunch",
    emoji: "🥪",
    image: "/images/recipes/L006.webp",
    name: "Chicken & Red Pepper Sandwich",
    description: "Tender chicken and sweet red pepper add colour and a little crunch to this generously filled mayonnaise sandwich.",
    cookingTime: "15 minutes",
    calories: "371 kcal",
    protein: "22.8 g",
    equipment: "Knife, Chopping board, Butter knife",
    ingredients: [
      { item: "White bread", shoppingItem: "White bread", quantity: "2 slices (70 g)" },
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "70 g (raw)" },
      { item: "Red pepper", shoppingItem: "Red peppers", quantity: "½ red pepper (30 g)" },
      { item: "Mayonnaise", shoppingItem: "Mayonnaise", quantity: "20 g" },
    ],
    method: [
      "00:00 — Wash and prepare the salad vegetables. Cut the chicken breast into thin strips.",
      "02:00 — Heat a non-stick frying pan over medium heat and cook the chicken for 6–8 minutes, turning regularly, until completely cooked through. Remove from the pan and allow to rest briefly.",
      "10:00 — Spread the measured mayonnaise evenly over the bread.",
      "12:00 — Arrange the cooked chicken and prepared vegetables over the bread.",
      "15:00 — Close the sandwich, cut in half if desired and serve immediately."
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
    nutritionSourceNote: "Owner-approved source assumptions D4 are documented in the 16 October 2026 reconciliation workbook.",},
  {
    id: "ham-lettuce-sandwich",
    code: "L007", mealFamily: "sandwich",
    category: "Lunch",
    emoji: "🥪",
    image: "/images/recipes/L002.webp",
    name: "Egg & Lettuce Sandwich with Chives",
    description: "Soft white bread layered with egg, crisp lettuce and creamy mayonnaise makes this a familiar, satisfying lunchtime favourite.",
    cookingTime: "8 minutes",
    calories: "430 kcal",
    protein: "18.5 g",
    equipment: "Knife, Chopping board, Butter knife",
    ingredients: [
      { item: "White bread", shoppingItem: "White bread", quantity: "2 slices (70 g)" },
      { item: "Egg", shoppingItem: "Egg", quantity: "2" },
      { item: "Iceberg lettuce", shoppingItem: "Iceberg lettuce", quantity: "2 leaves (shredded if preferred)" },
      { item: "Butter, unsalted", shoppingItem: "Unsalted butter", quantity: "10 g" },
      { item: "Mayonnaise", shoppingItem: "Mayonnaise", quantity: "10 g" },
    ],
    method: ["00:00 — Wash and prepare the lettuce.","02:00 — Spread the measured butter over the bread.","04:00 — Spread the mayonnaise over the bread.","06:00 — Add the lettuce.","08:00 — Close the sandwich, cut in half if desired and serve."],
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
    quantityConversionsEstimated: true,},
  {
    id: "chicken-cream-cheese-sandwich",
    code: "L008", mealFamily: "sandwich",
    category: "Lunch",
    emoji: "🥪",
    image: "/images/recipes/L008.webp",
    name: "Chicken & Cream Cheese Sandwich",
    description: "Tender chicken, cool cucumber and smooth cream cheese make a fresh, creamy filling between slices of soft white bread.",
    cookingTime: "15 minutes",
    calories: "296 kcal",
    protein: "24.1 g",
    equipment: "Knife, Chopping board, Butter knife",
    ingredients: [
      { item: "White bread", shoppingItem: "White bread", quantity: "2 slices (70 g)" },
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "70 g (raw)" },
      { item: "Cream cheese", shoppingItem: "Cream cheese", quantity: "25 g" },
      { item: "Cucumber", shoppingItem: "Cucumber", quantity: "⅓ cucumber (40 g)" },
    ],
    method: [
      "00:00 — Wash and prepare the salad vegetables. Cut the chicken breast into thin strips.",
      "02:00 — Heat a non-stick frying pan over medium heat and cook the chicken for 6–8 minutes, turning regularly, until completely cooked through. Remove from the pan and allow to rest briefly.",
      "10:00 — Spread the measured cream cheese evenly over the bread.",
      "12:00 — Arrange the cooked chicken and prepared vegetables over the bread.",
      "15:00 — Close the sandwich, cut in half if desired and serve immediately."
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
    nutritionSourceNote: "Owner-approved source assumptions D4, D2 are documented in the 16 October 2026 reconciliation workbook.",},
  {
    id: "chicken-lettuce-wrap",
    code: "L009", mealFamily: "wrap",
    category: "Lunch",
    emoji: "🌯",
    image: "/images/recipes/L009.webp",
    name: "Chicken & Lettuce Wrap",
    description: "A soft tortilla wrapped around tender chicken, crisp lettuce and creamy mayonnaise for an easy lunch with a fresh crunch.",
    cookingTime: "15 minutes",
    calories: "385 kcal",
    protein: "21.9 g",
    equipment: "Knife, Chopping board, Butter knife",
    ingredients: [
      { item: "White tortilla wrap", shoppingItem: "White Tortilla Wraps", quantity: "60 g" },
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "70 g (raw)" },
      { item: "Iceberg lettuce", shoppingItem: "Iceberg lettuce", quantity: "2 leaves (shredded if preferred)" },
      { item: "Mayonnaise", shoppingItem: "Mayonnaise", quantity: "20 g" },
    ],
    method: [
      "00:00 — Prepare the chicken and salad ingredients.",
      "02:00 — Spread the measured mayonnaise over the tortilla.",
      "04:00 — Add the chicken and prepared vegetables down the centre.",
      "07:00 — Fold in the sides and roll the tortilla tightly.",
      "15:00 — Close the sandwich, cut in half if desired and serve immediately."
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
    nutritionSourceNote: "Owner-approved source assumptions D4 are documented in the 16 October 2026 reconciliation workbook.",},
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
    equipment: "Knife, Chopping board, Butter knife",
    ingredients: [
      { item: "White tortilla wrap", shoppingItem: "White Tortilla Wraps", quantity: "60 g" },
      { item: "Tuna, canned in brine, drained", shoppingItem: "Tuna, canned in brine, drained", quantity: "60 g" },
      { item: "Mayonnaise", shoppingItem: "Mayonnaise", quantity: "20 g" },
      { item: "Iceberg lettuce", shoppingItem: "Iceberg lettuce", quantity: "2 leaves (shredded if preferred)" },
    ],
    method: [
      "00:00 — Drain the tuna thoroughly and prepare the lettuce.",
      "02:00 — Mix the tuna with mayonnaise.",
      "04:00 — Lay the tortilla flat and spoon the tuna mixture down the centre.",
      "06:00 — Add the lettuce.",
      "08:00 — Fold in the sides and roll tightly.",
      "15:00 — Close the sandwich, cut in half if desired and serve immediately."
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
    quantityConversionsEstimated: true,},
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
    equipment: "Knife, Chopping board, Butter knife, Saucepan",
    ingredients: [
      { item: "White tortilla wrap", shoppingItem: "White Tortilla Wraps", quantity: "60 g" },
      { item: "Egg", shoppingItem: "Egg", quantity: "2" },
      { item: "Mayonnaise", shoppingItem: "Mayonnaise", quantity: "15 g" },
      { item: "Fresh chives", shoppingItem: "Fresh chives", quantity: "3 g" },
      { item: "Iceberg lettuce", shoppingItem: "Iceberg lettuce", quantity: "2 leaves (shredded if preferred)" },
    ],
    method: [
      "00:00 — Place the eggs in a saucepan and cover with cold water.",
      "01:00 — Bring the water to a boil.",
      "02:00 — Cook the eggs for 8–10 minutes.",
      "10:00 — Drain, cool under cold running water and peel.",
      "12:00 — Chop the eggs and mix with mayonnaise and chopped chives.",
      "14:00 — Lay the tortilla flat and add the lettuce and egg mixture.",
      "15:00 — Fold in the sides and roll the tortilla tightly. Serve."
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
    quantityConversionsEstimated: true,},
  {
    id: "chicken-cucumber-wrap",
    code: "L012", mealFamily: "wrap",
    category: "Lunch",
    emoji: "🌯",
    image: "/images/recipes/L012.webp",
    name: "Chicken & Cucumber Wrap",
    description: "Tender chicken, cool cucumber and creamy mayonnaise tucked into a soft tortilla for a fresh, filling wrap.",
    cookingTime: "15 minutes",
    calories: "391 kcal",
    protein: "22.3 g",
    equipment: "Knife, Chopping board, Butter knife",
    ingredients: [
      { item: "White tortilla wrap", shoppingItem: "White Tortilla Wraps", quantity: "60 g" },
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "70 g (raw)" },
      { item: "Cucumber", shoppingItem: "Cucumber", quantity: "½ cucumber (60 g)" },
      { item: "Mayonnaise", shoppingItem: "Mayonnaise", quantity: "20 g" },
    ],
    method: [
      "00:00 — Prepare the chicken and salad ingredients.",
      "02:00 — Spread the measured mayonnaise over the tortilla.",
      "04:00 — Add the chicken and prepared vegetables down the centre.",
      "07:00 — Fold in the sides and roll the tortilla tightly.",
      "15:00 — Close the sandwich, cut in half if desired and serve immediately."
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
    nutritionSourceNote: "Owner-approved source assumptions D4 are documented in the 16 October 2026 reconciliation workbook.",},
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
    equipment: "Knife, Chopping board, Saucepan, Frying pan",
    ingredients: [
      { item: "Pasta", shoppingItem: "Pasta", quantity: "75 g (dry)" },
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "70 g (raw)" },
      { item: "Red pepper", shoppingItem: "Red peppers", quantity: "½ red pepper (30 g)" },
      { item: "Onion", shoppingItem: "Onions", quantity: "½ onion (30 g)" },
      { item: "Vegetable oil", shoppingItem: "Vegetable oil", quantity: "10 g" },
    ],
    method: [
      "00:00 — Bring a saucepan of water to the boil and cook the pasta according to the packet instructions.",
      "02:00 — Finely chop the onion and red pepper.",
      "08:00 — Heat the vegetable oil in a frying pan over medium heat.",
      "09:00 — Cook the onion and red pepper until softened.",
      "12:00 — Add the chicken and cook thoroughly until no longer pink in the centre.",
      "14:00 — Drain the pasta thoroughly.",
      "15:00 — Add the pasta to the frying pan and toss with the chicken and vegetables.",
      "18:00 — Heat through thoroughly and serve immediately."
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
    nutritionSourceNote: "Owner-approved source assumptions D4 are documented in the 16 October 2026 reconciliation workbook.",},
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
    equipment: "Knife, Chopping board, Saucepan, Frying pan",
    ingredients: [
      { item: "Pasta", shoppingItem: "Pasta", quantity: "75 g (dry)" },
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "70 g (raw)" },
      { item: "Cream cheese", shoppingItem: "Cream cheese", quantity: "30 g" },
      { item: "Onion", shoppingItem: "Onions", quantity: "¼ onion (25 g)" },
      { item: "Vegetable oil", shoppingItem: "Vegetable oil", quantity: "10 g" },
    ],
    method: [
      "00:00 — Bring a saucepan of water to the boil and cook the pasta according to the packet instructions.",
      "02:00 — Finely chop the onion.",
      "08:00 — Heat the vegetable oil in a frying pan over medium heat.",
      "09:00 — Cook the onion until softened.",
      "12:00 — Add the chicken and cook thoroughly until no longer pink in the centre.",
      "14:00 — Drain the pasta thoroughly.",
      "15:00 — Add the pasta and cream cheese to the frying pan and stir until combined.",
      "18:00 — Heat through thoroughly and serve immediately."
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
    nutritionSourceNote: "Owner-approved source assumptions D4, D2 are documented in the 16 October 2026 reconciliation workbook.",},
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
    equipment: "Knife, Chopping board, Saucepan, Frying pan",
    ingredients: [
      { item: "Pasta", shoppingItem: "Pasta", quantity: "75 g (dry)" },
      { item: "Tuna, canned in brine, drained", shoppingItem: "Tuna, canned in brine, drained", quantity: "60 g" },
      { item: "Red pepper", shoppingItem: "Red peppers", quantity: "½ red pepper (30 g)" },
      { item: "Mayonnaise", shoppingItem: "Mayonnaise", quantity: "20 g" },
      { item: "Fresh chives", shoppingItem: "Fresh chives", quantity: "3 g" },
    ],
    method: [
      "00:00 — Bring a saucepan of water to the boil and cook the pasta according to the packet instructions.",
      "02:00 — Prepare the red pepper and fresh chives.",
      "08:00 — Drain the pasta thoroughly.",
      "10:00 — Add the drained pasta, tuna and red pepper to a clean pan and warm gently.",
      "14:00 — Stir through the mayonnaise and fresh chives.",
      "18:00 — Serve immediately."
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
    quantityConversionsEstimated: false,},
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
    equipment: "Knife, Chopping board, Saucepan, Frying pan",
    ingredients: [
      { item: "Pasta", shoppingItem: "Pasta", quantity: "75 g (dry)" },
      { item: "Egg", shoppingItem: "Egg", quantity: "2" },
      { item: "Cream cheese", shoppingItem: "Cream cheese", quantity: "30 g" },
      { item: "Fresh chives", shoppingItem: "Fresh chives", quantity: "3 g" },
      { item: "Vegetable oil", shoppingItem: "Vegetable oil", quantity: "5 g" },
    ],
    method: [
      "00:00 — Bring a saucepan of water to the boil and cook the pasta according to the packet instructions.",
      "02:00 — Prepare the egg and fresh chives.",
      "12:00 — Drain the pasta thoroughly.",
      "14:00 — Add the pasta and cream cheese to a frying pan over low heat and stir until combined.",
      "16:00 — Beat the egg, add it to the hot pasta and stir continuously until fully cooked.",
      "19:00 — Stir through the fresh chives and serve immediately."
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
    nutritionSourceNote: "Owner-approved source assumptions D2 are documented in the 16 October 2026 reconciliation workbook.",},
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
    equipment: "Knife, Chopping board, Saucepan, Frying pan",
    ingredients: [
      { item: "Pasta", shoppingItem: "Pasta", quantity: "75 g (dry)" },
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "75 g (raw)" },
      { item: "Onion", shoppingItem: "Onions", quantity: "½ onion (40 g)" },
      { item: "Cream cheese", shoppingItem: "Cream cheese", quantity: "25 g" },
      { item: "Vegetable oil", shoppingItem: "Vegetable oil", quantity: "10 g" },
    ],
    method: [
      "00:00 — Bring a saucepan of water to the boil and cook the pasta according to the packet instructions.",
      "02:00 — Finely chop the onion.",
      "08:00 — Heat the vegetable oil in a frying pan over medium heat.",
      "09:00 — Cook the onion until softened.",
      "12:00 — Add the chicken and cook thoroughly until no longer pink in the centre.",
      "14:00 — Drain the pasta thoroughly.",
      "15:00 — Add the pasta and cream cheese to the frying pan and stir through the chicken and onion.",
      "18:00 — Heat through thoroughly and serve immediately."
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
    nutritionSourceNote: "Owner-approved source assumptions D4, D2 are documented in the 16 October 2026 reconciliation workbook.",},
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
    equipment: "Knife, Chopping board, Saucepan, Frying pan",
    ingredients: [
      { item: "Pasta", shoppingItem: "Pasta", quantity: "75 g (dry)" },
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "70 g (raw)" },
      { item: "Mushrooms", shoppingItem: "Mushrooms", quantity: "4 mushrooms (40 g)" },
      { item: "Cream cheese", shoppingItem: "Cream cheese", quantity: "25 g" },
      { item: "Vegetable oil", shoppingItem: "Vegetable oil", quantity: "10 g" },
    ],
    method: [
      "00:00 — Bring a saucepan of water to the boil and cook the pasta according to the packet instructions.",
      "02:00 — Slice the mushrooms and prepare the chicken.",
      "08:00 — Heat the vegetable oil in a frying pan over medium heat.",
      "09:00 — Cook the mushrooms until softened.",
      "12:00 — Add the chicken and cook thoroughly until no longer pink in the centre.",
      "14:00 — Drain the pasta thoroughly.",
      "15:00 — Add the pasta and cream cheese to the frying pan and stir until combined.",
      "18:00 — Heat through thoroughly and serve immediately."
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
    nutritionSourceNote: "Owner-approved source assumptions D4, D2 are documented in the 16 October 2026 reconciliation workbook.",},
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
    equipment: "Knife, Chopping board, Saucepan, Frying pan",
    ingredients: [
      { item: "Pasta", shoppingItem: "Pasta", quantity: "75 g (dry)" },
      { item: "Tuna, canned in brine, drained", shoppingItem: "Tuna, canned in brine, drained", quantity: "60 g" },
      { item: "Cream cheese", shoppingItem: "Cream cheese", quantity: "25 g" },
      { item: "Fresh chives", shoppingItem: "Fresh chives", quantity: "3 g" },
      { item: "Vegetable oil", shoppingItem: "Vegetable oil", quantity: "5 g" },
    ],
    method: [
      "00:00 — Bring a saucepan of water to the boil and cook the pasta according to the packet instructions.",
      "02:00 — Prepare the tuna, cream cheese and fresh chives.",
      "12:00 — Drain the pasta thoroughly.",
      "14:00 — Add the pasta, tuna and cream cheese to a frying pan over low heat and stir until combined.",
      "16:00 — Stir through the fresh chives.",
      "18:00 — Heat through thoroughly and serve immediately."
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
    nutritionSourceNote: "Owner-approved source assumptions D2 are documented in the 16 October 2026 reconciliation workbook.",},
  {
    id: "chicken-fried-rice",
    code: "L020", mealFamily: "rice-bowl",
    category: "Lunch",
    emoji: "🍚",
    image: "/images/recipes/L020.webp",
    name: "Chicken Fried Rice",
    description: "A colourful pan of rice with tender chicken, egg, red pepper and onion, cooked together for a hearty, savoury lunch.",
    cookingTime: "26 minutes",
    calories: "458 kcal",
    protein: "27.6 g",
    equipment: "Knife, Chopping board, Saucepan, Frying pan",
    ingredients: [
      { item: "White rice", shoppingItem: "White rice", quantity: "60 g (dry)" },
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "70 g (raw)" },
      { item: "Egg", shoppingItem: "Egg", quantity: "1" },
      { item: "Red pepper", shoppingItem: "Red peppers", quantity: "⅓ red pepper (25 g)" },
      { item: "Onion", shoppingItem: "Onions", quantity: "½ onion (30 g)" },
      { item: "Vegetable oil", shoppingItem: "Vegetable oil", quantity: "10 g" },
    ],
    method: [
      "00:00 — Rinse the measured dry rice and place it in a saucepan with the appropriate amount of water.",
      "02:00 — Bring to the boil, cover and simmer according to the rice packet instructions.",
      "12:00 — Finely dice the onion and red pepper.",
      "14:00 — Heat the vegetable oil in a frying pan over medium heat.",
      "15:00 — Cook the onion and red pepper until softened.",
      "18:00 — Add the chicken and cook thoroughly until no longer pink in the centre.",
      "21:00 — Beat the egg, add it to the pan and stir continuously until fully cooked.",
      "24:00 — Stir in the cooked rice and combine thoroughly.",
      "26:00 — Serve immediately."
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
    nutritionSourceNote: "Owner-approved source assumptions D4 are documented in the 16 October 2026 reconciliation workbook.",},
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
    equipment: "Knife, Chopping board, Saucepan, Frying pan",
    ingredients: [
      { item: "White rice", shoppingItem: "White rice", quantity: "60 g (dry)" },
      { item: "Egg", shoppingItem: "Egg", quantity: "3" },
      { item: "Red pepper", shoppingItem: "Red peppers", quantity: "½ red pepper (30 g)" },
      { item: "Onion", shoppingItem: "Onions", quantity: "¼ onion (25 g)" },
      { item: "Vegetable oil", shoppingItem: "Vegetable oil", quantity: "10 g" },
    ],
    method: [
      "00:00 — Rinse the measured dry rice and place it in a saucepan with the appropriate amount of water.",
      "02:00 — Bring to the boil, cover and simmer according to the rice packet instructions.",
      "12:00 — Finely dice the onion and red pepper.",
      "14:00 — Heat the oil in a frying pan over medium heat.",
      "15:00 — Cook the onion and pepper for 3 minutes until softened.",
      "18:00 — Add the cooked rice and stir-fry for 2 minutes.",
      "20:00 — Beat the egg, add it to the pan and stir until fully cooked.",
      "23:00 — Serve immediately."
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
    quantityConversionsEstimated: true,},
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
    equipment: "Knife, Chopping board, Saucepan, Frying pan",
    ingredients: [
      { item: "White rice", shoppingItem: "White rice", quantity: "60 g (dry)" },
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "75 g (raw)" },
      { item: "Onion", shoppingItem: "Onions", quantity: "½ onion (40 g)" },
      { item: "Red pepper", shoppingItem: "Red peppers", quantity: "⅓ red pepper (20 g)" },
      { item: "Vegetable oil", shoppingItem: "Vegetable oil", quantity: "10 g" },
    ],
    method: [
      "00:00 — Rinse the measured dry rice and place it in a saucepan with the appropriate amount of water.",
      "02:00 — Bring to the boil, cover and simmer according to the rice packet instructions.",
      "12:00 — Finely slice the onion and dice the pepper.",
      "14:00 — Heat the oil in a frying pan over medium heat.",
      "15:00 — Cook the onion and pepper for 3 minutes until softened.",
      "18:00 — Add the raw chicken and cook for 6–8 minutes until completely cooked through.",
      "26:00 — Stir in the cooked rice and heat thoroughly.",
      "25:00 — Serve immediately."
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
    nutritionSourceNote: "Owner-approved source assumptions D4 are documented in the 16 October 2026 reconciliation workbook.",},
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
    equipment: "Knife, Chopping board, Saucepan, Frying pan",
    ingredients: [
      { item: "White rice", shoppingItem: "White rice", quantity: "60 g (dry)" },
      { item: "Tuna, canned in brine, drained", shoppingItem: "Tuna, canned in brine, drained", quantity: "90 g" },
      { item: "Egg", shoppingItem: "Egg", quantity: "1" },
      { item: "Cucumber", shoppingItem: "Cucumber", quantity: "⅓ cucumber (40 g)" },
      { item: "Mayonnaise", shoppingItem: "Mayonnaise", quantity: "15 g" },
    ],
    method: [
      "00:00 — Rinse the measured dry rice and place it in a saucepan with the appropriate amount of water.",
      "02:00 — Bring to the boil, then cover and simmer according to the rice packet instructions.",
      "12:00 — While the rice cooks, prepare the cucumber and drain the tuna.",
      "15:00 — Cook the egg in a frying pan until fully set, then remove and set aside.",
      "17:00 — Drain any excess water from the rice if necessary and allow it to stand for a minute.",
      "18:00 — Stir the rice with the tuna and mayonnaise, then top with the cooked egg and cucumber.",
      "20:00 — Serve immediately."
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
    quantityConversionsEstimated: true,},
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
    equipment: "Knife, Chopping board, Saucepan, Frying pan",
    ingredients: [
      { item: "Egg noodles", shoppingItem: "Egg noodles", quantity: "75 g (dry)" },
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "70 g (raw)" },
      { item: "Cucumber", shoppingItem: "Cucumber", quantity: "⅓ cucumber (40 g)" },
      { item: "Red pepper", shoppingItem: "Red peppers", quantity: "⅓ red pepper (25 g)" },
      { item: "Vegetable oil", shoppingItem: "Vegetable oil", quantity: "10 g" },
    ],
    method: [
      "00:00 — Bring a saucepan of water to a boil and cook the measured dry egg noodles according to the packet instructions.",
      "02:00 — Slice the chicken and prepare the cucumber and red pepper.",
      "08:00 — Heat the oil in a frying pan over medium heat.",
      "09:00 — Stir-fry the raw chicken and red pepper for 6–8 minutes until the chicken is completely cooked through and the pepper is softened.",
      "17:00 — Drain the noodles thoroughly.",
      "18:00 — Add the noodles and cucumber to the pan and toss together.",
      "20:00 — Heat through thoroughly and serve."
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
    nutritionSourceNote: "Owner-approved source assumptions D4 are documented in the 16 October 2026 reconciliation workbook.",},
  {
    id: "chicken-jacket-potato",
    code: "L025", mealFamily: "jacket-potato",
    category: "Lunch",
    emoji: "🥔",
    image: "/images/recipes/L025.webp",
    name: "Chicken Jacket Potato",
    description: "A fluffy baked potato filled with tender chicken and smooth cream cheese, served with crisp iceberg lettuce on the side.",
    cookingTime: "29 minutes",
    calories: "289 kcal",
    protein: "22.5 g",
    equipment: "Knife, Chopping board, Saucepan, Microwave, Oven or air fryer",
    ingredients: [
      { item: "Baking potato", shoppingItem: "Baking potato", quantity: "1 baking potato (200 g)" },
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "70 g (raw)" },
      { item: "Cream cheese", shoppingItem: "Cream cheese", quantity: "30 g" },
      { item: "Iceberg lettuce", shoppingItem: "Iceberg lettuce", quantity: "2 leaves (shredded if preferred)" },
    ],
    method: [
      "00:00 — Wash and prick the baking potato several times with a fork.",
      "02:00 — Microwave the potato until tender, turning halfway through according to your microwave instructions.",
      "14:00 — While the potato cooks, prepare the filling and wash the lettuce.",
      "18:00 — Slice the raw chicken breast and cook in a non-stick frying pan over medium heat for 6–8 minutes, turning regularly, until completely cooked through.",
      "20:00 — Finish the potato in a hot oven or air fryer until the skin is crisp.",
      "26:00 — Mix the cooked chicken with the cream cheese.",
      "27:00 — Cut a cross in the top of the potato and gently open it.",
      "29:00 — Fill with the chicken and cream cheese mixture and serve with the lettuce."
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
    nutritionSourceNote: "Owner-approved source assumptions D6, D4, D2 are documented in the 16 October 2026 reconciliation workbook. Potato uses CoFID 13-494 flesh and skin at an estimated 149 g cooked from 200 g raw using a 74.5% microwave reference yield; actual microwave-plus-oven final weight was not measured. All skin is assumed eaten.",},
  {
    id: "tuna-jacket-potato",
    code: "L026", mealFamily: "jacket-potato",
    category: "Lunch",
    emoji: "🥔",
    image: "/images/recipes/L026.webp",
    name: "Tuna Jacket Potato",
    description: "A warm, fluffy jacket potato topped with creamy tuna mayonnaise and served with crisp lettuce for a classic, satisfying lunch.",
    cookingTime: "29 minutes",
    calories: "342 kcal",
    protein: "19.3 g",
    equipment: "Knife, Chopping board, Saucepan, Microwave, Oven or air fryer",
    ingredients: [
      { item: "Baking potato", shoppingItem: "Baking potato", quantity: "1 baking potato (200 g)" },
      { item: "Tuna, canned in brine, drained", shoppingItem: "Tuna, canned in brine, drained", quantity: "60 g" },
      { item: "Mayonnaise", shoppingItem: "Mayonnaise", quantity: "20 g" },
      { item: "Iceberg lettuce", shoppingItem: "Iceberg lettuce", quantity: "2 leaves (shredded if preferred)" },
    ],
    method: [
      "00:00 — Wash and prick the baking potato several times with a fork.",
      "02:00 — Microwave the potato until tender, turning halfway through according to your microwave instructions.",
      "14:00 — Drain the tuna thoroughly and mix with the mayonnaise.",
      "20:00 — Finish the potato in a hot oven or air fryer until the skin is crisp.",
      "27:00 — Cut a cross in the top of the potato and gently open it.",
      "29:00 — Fill with the tuna mixture and serve with the lettuce."
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
    nutritionSourceNote: "Owner-approved source assumptions D6 are documented in the 16 October 2026 reconciliation workbook. Potato uses CoFID 13-494 flesh and skin at an estimated 149 g cooked from 200 g raw using a 74.5% microwave reference yield; actual microwave-plus-oven final weight was not measured. All skin is assumed eaten.",},
  {
    id: "egg-mayo-jacket-potato",
    code: "L027", mealFamily: "jacket-potato",
    category: "Lunch",
    emoji: "🥔",
    image: "/images/recipes/L027.webp",
    name: "Egg Mayo Jacket Potato",
    description: "Fluffy jacket potato topped with creamy egg mayonnaise and finished with fresh chives for a comforting lunch.",
    cookingTime: "29 minutes",
    calories: "418 kcal",
    protein: "18.3 g",
    equipment: "Knife, Chopping board, Saucepan, Microwave, Oven or air fryer",
    ingredients: [
      { item: "Baking potato", shoppingItem: "Baking potato", quantity: "1 baking potato (200 g)" },
      { item: "Egg", shoppingItem: "Egg", quantity: "2" },
      { item: "Mayonnaise", shoppingItem: "Mayonnaise", quantity: "20 g" },
      { item: "Fresh chives", shoppingItem: "Fresh chives", quantity: "3 g" },
    ],
    method: [
      "00:00 — Wash and prick the baking potato several times with a fork.",
      "02:00 — Microwave the potato until tender, turning halfway through according to your microwave instructions.",
      "14:00 — Place the egg in a saucepan, cover with cold water and bring to the boil.",
      "16:00 — Cook the egg for 8–10 minutes.",
      "20:00 — Drain, cool and peel the egg, then chop and mix with mayonnaise and chives.",
      "27:00 — Finish the potato in a hot oven or air fryer until crisp.",
      "29:00 — Cut a cross in the top, gently open and fill with the egg mixture."
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
    nutritionSourceNote: "Owner-approved source assumptions D6 are documented in the 16 October 2026 reconciliation workbook. Potato uses CoFID 13-494 flesh and skin at an estimated 149 g cooked from 200 g raw using a 74.5% microwave reference yield; actual microwave-plus-oven final weight was not measured. All skin is assumed eaten.",},
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
    equipment: "Knife, Chopping board, Saucepan, Frying pan",
    ingredients: [
      { item: "Potatoes, peeled", shoppingItem: "Potatoes, peeled", quantity: "1 potato (180 g)" },
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "70 g (raw)" },
      { item: "Onion", shoppingItem: "Onions", quantity: "½ onion (40 g)" },
      { item: "Red pepper", shoppingItem: "Red peppers", quantity: "⅓ red pepper (25 g)" },
      { item: "Vegetable oil", shoppingItem: "Vegetable oil", quantity: "15 g" },
    ],
    method: [
      "00:00 — Peel the potato and cut it into small pieces.",
      "02:00 — Put the potato into a saucepan of fresh water and bring to the boil.",
      "04:00 — Boil until tender, then drain and discard the cooking water.",
      "15:00 — While the potato cooks, prepare the onion and red pepper.",
      "17:00 — Heat the oil in a frying pan over medium heat.",
      "18:00 — Cook the onion and pepper until softened.",
      "22:00 — Add the drained potato and cook for 3 minutes.",
      "25:00 — Add the chicken and cook for 5–7 minutes, turning regularly, until completely cooked through.",
      "32:00 — Heat everything through and serve immediately."
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
    nutritionSourceNote: "Owner-approved source assumptions D4 are documented in the 16 October 2026 reconciliation workbook.",},
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
    equipment: "Knife, Chopping board, Saucepan, Frying pan",
    ingredients: [
      { item: "Potatoes, peeled", shoppingItem: "Potatoes, peeled", quantity: "1 potato (180 g)" },
      { item: "Egg", shoppingItem: "Egg", quantity: "2" },
      { item: "Onion", shoppingItem: "Onions", quantity: "½ onion (40 g)" },
      { item: "Red pepper", shoppingItem: "Red peppers", quantity: "⅓ red pepper (20 g)" },
      { item: "Vegetable oil", shoppingItem: "Vegetable oil", quantity: "15 g" },
    ],
    method: [
      "00:00 — Peel the potato and cut it into small pieces.",
      "02:00 — Put the potato into a saucepan of fresh water and bring to the boil.",
      "04:00 — Boil until tender, then drain and discard the cooking water.",
      "15:00 — While the potato cooks, prepare the onion and red pepper.",
      "17:00 — Heat the oil in a frying pan over medium heat.",
      "18:00 — Cook the onion and pepper until softened.",
      "22:00 — Add the drained potato and cook for 3 minutes.",
      "25:00 — Add the chopped cooked egg and toss gently with the potato and vegetables.",
      "32:00 — Heat everything through and serve immediately."
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
    quantityConversionsEstimated: true,},
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
    equipment: "Knife, Chopping board, Saucepan",
    ingredients: [
      { item: "Potatoes, peeled", shoppingItem: "Potatoes, peeled", quantity: "1 potato (180 g)" },
      { item: "Tuna, canned in brine, drained", shoppingItem: "Tuna, canned in brine, drained", quantity: "60 g" },
      { item: "Mayonnaise", shoppingItem: "Mayonnaise", quantity: "20 g" },
      { item: "Cucumber", shoppingItem: "Cucumber", quantity: "½ cucumber (50 g)" },
      { item: "Iceberg lettuce", shoppingItem: "Iceberg lettuce", quantity: "2 leaves (shredded if preferred)" },
    ],
    method: [
      "00:00 — Peel the potato and cut it into small pieces.",
      "02:00 — Put the potato into a saucepan of fresh water and bring to the boil.",
      "04:00 — Boil until tender, then drain and discard the cooking water.",
      "15:00 — While the potato cooks, drain the tuna and prepare the cucumber and lettuce.",
      "18:00 — Allow the potato to cool slightly.",
      "20:00 — Mix the potato with tuna and mayonnaise, then serve with cucumber and lettuce."
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
    quantityConversionsEstimated: true,},
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
    equipment: "Knife, Chopping board, Frying pan",
    ingredients: [
      { item: "Egg", shoppingItem: "Egg", quantity: "3" },
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "60 g (raw)" },
      { item: "Red pepper", shoppingItem: "Red peppers", quantity: "½ red pepper (30 g)" },
      { item: "Onion", shoppingItem: "Onions", quantity: "¼ onion (25 g)" },
      { item: "Vegetable oil", shoppingItem: "Vegetable oil", quantity: "10 g" },
    ],
    method: [
      "00:00 — Beat the eggs in a bowl and prepare the chicken, onion and pepper.",
      "02:00 — Heat the oil in a non-stick frying pan over medium heat.",
      "03:00 — Add the onion and pepper and cook for 4 minutes until softened.",
      "07:00 — Add the raw chicken and cook for 5–7 minutes until completely cooked through.",
      "13:00 — Pour the beaten egg into the pan.",
      "14:00 — Cook until the egg is almost completely set.",
      "16:00 — Fold the omelette in half and cook for a further 2 minutes.",
      "18:00 — Check the egg is fully cooked and serve."
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
    nutritionSourceNote: "Owner-approved source assumptions D4 are documented in the 16 October 2026 reconciliation workbook.",},
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
    equipment: "Knife, Chopping board, Frying pan",
    ingredients: [
      { item: "Egg", shoppingItem: "Egg", quantity: "3" },
      { item: "Mushrooms", shoppingItem: "Mushrooms", quantity: "4 mushrooms (40 g)" },
      { item: "Fresh chives", shoppingItem: "Fresh chives", quantity: "3 g" },
      { item: "Butter, unsalted", shoppingItem: "Unsalted butter", quantity: "10 g" },
      { item: "White bread", shoppingItem: "White bread", quantity: "1 slice (35 g)" },
    ],
    method: [
      "00:00 — Slice the mushrooms and chop the chives.",
      "02:00 — Melt the butter in a non-stick frying pan over medium heat.",
      "03:00 — Add the mushrooms and cook for 4 minutes until softened.",
      "07:00 — Beat the eggs and stir in the chives.",
      "08:00 — Pour the egg mixture into the pan.",
      "10:00 — Cook until almost set, then fold the omelette in half.",
      "12:00 — Toast the measured bread.",
      "15:00 — Check the egg is fully cooked and serve with the toast."
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
    quantityConversionsEstimated: true,},
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
    equipment: "Knife, Chopping board, Saucepan",
    ingredients: [
      { item: "Egg", shoppingItem: "Egg", quantity: "2" },
      { item: "White bread", shoppingItem: "White bread", quantity: "2 slices (70 g)" },
      { item: "Red pepper", shoppingItem: "Red peppers", quantity: "½ red pepper (30 g)" },
      { item: "Butter, unsalted", shoppingItem: "Unsalted butter", quantity: "10 g" },
    ],
    method: [
      "00:00 — Put the bread into the toaster.",
      "02:00 — Dice the red pepper and beat the egg.",
      "03:00 — Melt the butter in a non-stick frying pan over medium heat.",
      "04:00 — Add the pepper and cook for 3 minutes until softened.",
      "07:00 — Add the beaten egg and stir gently until fully set.",
      "10:00 — Place the toast on a plate and spoon over the egg and pepper.",
      "12:00 — Serve immediately."
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
    quantityConversionsEstimated: true,},
  {
    id: "chicken-pepper-toastie",
    code: "L034", mealFamily: "toastie",
    category: "Lunch",
    emoji: "🍞",
    image: "/images/recipes/L034.webp",
    name: "Chicken & Pepper Toastie",
    description: "A crisp, buttery toastie filled with tender chicken, sweet red pepper and smooth cream cheese.",
    cookingTime: "13 minutes",
    calories: "334 kcal",
    protein: "23.9 g",
    equipment: "Knife, Chopping board, Butter knife, Frying pan",
    ingredients: [
      { item: "White bread", shoppingItem: "White bread", quantity: "2 slices (70 g)" },
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "70 g (raw)" },
      { item: "Red pepper", shoppingItem: "Red peppers", quantity: "½ red pepper (30 g)" },
      { item: "Cream cheese", shoppingItem: "Cream cheese", quantity: "25 g" },
      { item: "Butter, unsalted", shoppingItem: "Unsalted butter", quantity: "5 g" },
    ],
    method: [
      "00:00 — Spread the cream cheese over the bread.",
      "02:00 — Slice the chicken and prepare the pepper.",
      "04:00 — Add the chicken and pepper to the sandwich.",
      "06:00 — Butter the outside lightly.",
      "08:00 — Heat a sandwich press or non-stick frying pan.",
      "09:00 — Toast until the bread is golden and the filling is hot.",
      "13:00 — Remove, cut in half and serve."
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
    nutritionSourceNote: "Owner-approved source assumptions D4, D2 are documented in the 16 October 2026 reconciliation workbook.",},
  {
    id: "tuna-cucumber-toastie",
    code: "L035", mealFamily: "toastie",
    category: "Lunch",
    emoji: "🍞",
    image: "/images/recipes/L035.webp",
    name: "Tuna & Cucumber Toastie",
    description: "Golden toasted bread encloses creamy tuna mayonnaise and cucumber for a warm, satisfying toastie with a fresh crunch.",
    cookingTime: "13 minutes",
    calories: "399 kcal",
    protein: "21.1 g",
    equipment: "Knife, Chopping board, Butter knife, Frying pan",
    ingredients: [
      { item: "White bread", shoppingItem: "White bread", quantity: "2 slices (70 g)" },
      { item: "Tuna, canned in brine, drained", shoppingItem: "Tuna, canned in brine, drained", quantity: "60 g" },
      { item: "Cucumber", shoppingItem: "Cucumber", quantity: "⅓ cucumber (40 g)" },
      { item: "Mayonnaise", shoppingItem: "Mayonnaise", quantity: "20 g" },
      { item: "Butter, unsalted", shoppingItem: "Unsalted butter", quantity: "5 g" },
    ],
    method: [
      "00:00 — Drain the tuna thoroughly and mix with the mayonnaise.",
      "02:00 — Spread the tuna mixture over the bread and add the cucumber.",
      "04:00 — Butter the outside of the sandwich lightly.",
      "06:00 — Heat a sandwich press or non-stick frying pan.",
      "08:00 — Toast the sandwich until the bread is golden and the filling is hot.",
      "13:00 — Remove, cut in half and serve."
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
    quantityConversionsEstimated: false,},
  {
    id: "chicken-apple-sandwich",
    code: "L036", mealFamily: "sandwich",
    category: "Lunch",
    emoji: "🥪",
    image: "/images/recipes/L036.webp",
    name: "Chicken & Apple Sandwich",
    description: "Tender chicken, crisp apple and iceberg lettuce pair with creamy mayonnaise for a fresh sandwich with a subtle sweet crunch.",
    cookingTime: "15 minutes",
    calories: "392 kcal",
    protein: "23.1 g",
    equipment: "Knife, Chopping board, Butter knife",
    ingredients: [
      { item: "White bread", shoppingItem: "White bread", quantity: "2 slices (70 g)" },
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "70 g (raw)" },
      { item: "Apple", shoppingItem: "Apples", quantity: "½ apple (50 g)" },
      { item: "Mayonnaise", shoppingItem: "Mayonnaise", quantity: "20 g" },
      { item: "Iceberg lettuce", shoppingItem: "Iceberg lettuce", quantity: "2 leaves (shredded if preferred)" },
    ],
    method: [
      "00:00 — Wash and prepare the salad vegetables. Cut the chicken breast into thin strips.",
      "02:00 — Heat a non-stick frying pan over medium heat and cook the chicken for 6–8 minutes, turning regularly, until completely cooked through. Remove from the pan and allow to rest briefly.",
      "10:00 — Spread the measured mayonnaise evenly over the bread.",
      "12:00 — Arrange the cooked chicken and prepared vegetables over the bread.",
      "15:00 — Close the sandwich, cut in half if desired and serve immediately."
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
    nutritionSourceNote: "Owner-approved source assumptions D4 are documented in the 16 October 2026 reconciliation workbook.",},
  {
    id: "egg-cucumber-sandwich",
    code: "L037", mealFamily: "sandwich",
    category: "Lunch",
    emoji: "🥪",
    image: "/images/recipes/L037.webp",
    name: "Egg & Cucumber Sandwich",
    description: "Sliced egg and cool cucumber bring creamy and crisp textures together in soft bread with a smooth mayonnaise spread.",
    cookingTime: "16 minutes",
    calories: "441 kcal",
    protein: "20.4 g",
    equipment: "Knife, Chopping board, Butter knife, Saucepan",
    ingredients: [
      { item: "White bread", shoppingItem: "White bread", quantity: "2 slices (70 g)" },
      { item: "Egg", shoppingItem: "Egg", quantity: "2" },
      { item: "Cucumber", shoppingItem: "Cucumber", quantity: "½ cucumber (50 g)" },
      { item: "Mayonnaise", shoppingItem: "Mayonnaise", quantity: "20 g" },
    ],
    method: [
      "00:00 — Place the eggs in a saucepan and cover with cold water.",
      "01:00 — Bring the water to a boil.",
      "02:00 — Cook the eggs for 8–10 minutes.",
      "10:00 — Drain, cool under cold running water and peel.",
      "12:00 — Slice the eggs and prepare the cucumber.",
      "14:00 — Spread the mayonnaise over the bread and add the egg and cucumber.",
      "16:00 — Close the sandwich, cut in half if desired and serve."
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
    quantityConversionsEstimated: true,},
  {
    id: "chicken-cream-cheese-wrap",
    code: "L038", mealFamily: "wrap",
    category: "Lunch",
    emoji: "🌯",
    image: "/images/recipes/L038.webp",
    name: "Chicken & Cream Cheese Wrap",
    description: "Tender chicken, cool cucumber and crisp lettuce are wrapped with smooth cream cheese for a fresh, creamy bite.",
    cookingTime: "15 minutes",
    calories: "317 kcal",
    protein: "23.5 g",
    equipment: "Knife, Chopping board, Butter knife",
    ingredients: [
      { item: "White tortilla wrap", shoppingItem: "White Tortilla Wraps", quantity: "60 g" },
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "70 g (raw)" },
      { item: "Cream cheese", shoppingItem: "Cream cheese", quantity: "25 g" },
      { item: "Cucumber", shoppingItem: "Cucumber", quantity: "½ cucumber (50 g)" },
      { item: "Iceberg lettuce", shoppingItem: "Iceberg lettuce", quantity: "2 leaves (shredded if preferred)" },
    ],
    method: [
      "00:00 — Prepare the chicken and salad ingredients.",
      "02:00 — Spread the measured cream cheese over the tortilla.",
      "04:00 — Add the chicken and prepared vegetables down the centre.",
      "07:00 — Fold in the sides and roll the tortilla tightly.",
      "15:00 — Close the sandwich, cut in half if desired and serve immediately."
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
    nutritionSourceNote: "Owner-approved source assumptions D4, D2 are documented in the 16 October 2026 reconciliation workbook.",},
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
      "00:00 — Drain the tuna thoroughly and prepare the cucumber.",
      "02:00 — Spread the cream cheese over the centre of the tortilla.",
      "04:00 — Add the tuna and cucumber.",
      "07:00 — Fold in the sides and roll the tortilla tightly.",
      "15:00 — Close the sandwich, cut in half if desired and serve immediately."
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
    nutritionSourceNote: "Owner-approved source assumptions D2 are documented in the 16 October 2026 reconciliation workbook.",},
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
    equipment: "Knife, Chopping board, Saucepan, Frying pan",
    ingredients: [
      { item: "Pasta", shoppingItem: "Pasta", quantity: "75 g (dry)" },
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "70 g (raw)" },
      { item: "Onion", shoppingItem: "Onions", quantity: "½ onion (30 g)" },
      { item: "Cucumber", shoppingItem: "Cucumber", quantity: "⅓ cucumber (40 g)" },
      { item: "Mayonnaise", shoppingItem: "Mayonnaise", quantity: "20 g" },
    ],
    method: [
      "00:00 — Bring a saucepan of water to a boil and cook the measured dry pasta according to the packet instructions.",
      "02:00 — While the pasta cooks, finely dice the onion and cucumber.",
      "10:00 — Drain the pasta thoroughly and allow it to cool for a few minutes.",
      "13:00 — Cook the chicken in a non-stick frying pan over medium heat for 6–8 minutes, turning regularly, until completely cooked through. Allow it to rest briefly, then slice.",
      "16:00 — Stir the cooked chicken, onion and cucumber through the pasta.",
      "18:00 — Add the mayonnaise and mix until evenly coated.",
      "20:00 — Serve warm or chill before serving."
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
    nutritionSourceNote: "Owner-approved source assumptions D4 are documented in the 16 October 2026 reconciliation workbook.",},

  { id: "chicken-leek-couscous-bowl", code: "L041", mealFamily: "couscous-bowl", category: "Lunch", emoji: "🥗", image: "/images/recipes/L041.webp", name: "Chicken & Leek Couscous Bowl", description: "Fluffy couscous tossed with tender chicken, soft leek and sweet carrot, finished with lemon and parsley for a bright, savoury bowl.", cookingTime: "25 minutes", calories: "380 kcal", protein: "26.9 g", equipment: "Saucepan, frying pan, colander, knife, chopping board", ingredients: [ { item: "Chicken, meat, average, raw", shoppingItem: "Chicken breast", quantity: "100 g (raw)" }, { item: "Couscous, plain, raw", shoppingItem: "Couscous", quantity: "35 g" }, { item: "Leeks, boiled in unsalted water", shoppingItem: "Leek", quantity: "¼ leek (20 g)" }, { item: "Carrots, old, boiled in unsalted water", shoppingItem: "Carrots", quantity: "½ carrot (20 g)" }, { item: "Oil, olive", shoppingItem: "Olive oil", quantity: "15 g" }, { item: "Lemon juice, fresh", shoppingItem: "Lemon juice", quantity: "10 g" }, { item: "Parsley, dried", shoppingItem: "Dried parsley", quantity: "¼ tsp" } ], method: [ "00:00 — Prepare the couscous according to the packet instructions using unsalted water.", "05:00 — Slice the chicken and cook in half the olive oil until completely cooked through.", "12:00 — Boil the leek and carrot in unsalted water until tender, then drain well.", "18:00 — Fluff the couscous and combine with the vegetables.", "22:00 — Top with the chicken and finish with the remaining olive oil, lemon juice and parsley.", "25:00 — Serve immediately." ], nutrition: { calories: "380 kcal", protein: "26.9 g", carbohydrates: "29.6 g", fat: "18.0 g", fibre: "2.2 g", sodium: "85 mg", salt: "0.21 g", potassium: "566 mg", phosphate: "252 mg" }, potassium: "High", phosphate: "Moderate", purines: "Moderate", dietaryNote: "This recipe is calculated for one serving using CoFID 2021 ingredient values. Compare the recorded nutrient totals with your own My Diet targets.", fluidMl: 10, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1 ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,},
  { id: "turkey-cucumber-pitta", code: "L042", mealFamily: "pitta", category: "Lunch", emoji: "🥙", image: "/images/recipes/L042.webp", name: "Turkey & Cucumber Pitta", description: "Juicy turkey breast, crisp cucumber and iceberg lettuce tucked into a soft white pitta with creamy mayonnaise and a hint of parsley.", cookingTime: "12 minutes", calories: "437 kcal", protein: "30.7 g", equipment: "Knife, chopping board, frying pan", ingredients: [ { item: "Turkey, light meat, raw", shoppingItem: "Turkey breast", quantity: "100 g (raw)" }, { item: "Bread, pitta, white", shoppingItem: "White pitta bread", quantity: "1 pitta (60 g)" }, { item: "Cucumber, raw, flesh and skin", shoppingItem: "Cucumber", quantity: "⅓ cucumber (40 g)" }, { item: "Lettuce, average, raw", shoppingItem: "Iceberg lettuce", quantity: "2 leaves (15 g)" }, { item: "Mayonnaise, standard, retail", shoppingItem: "Mayonnaise", quantity: "25 g" }, { item: "Parsley, dried", shoppingItem: "Dried parsley", quantity: "¼ tsp" } ], method: [ "00:00 — Cook the turkey in a non-stick frying pan until completely cooked through.", "06:00 — Slice the turkey and prepare the cucumber and lettuce.", "08:00 — Warm the pitta briefly and split it open.", "10:00 — Spread with mayonnaise and add the turkey and salad.", "12:00 — Finish with parsley and serve." ], nutrition: { calories: "437 kcal", protein: "30.7 g", carbohydrates: "34.4 g", fat: "20.5 g", fibre: "1.9 g", sodium: "326 mg", salt: "0.81 g", potassium: "569 mg", phosphate: "304 mg" }, potassium: "High", phosphate: "High", purines: "Moderate", dietaryNote: "This recipe is calculated for one serving using CoFID 2021 ingredient values. Compare the recorded nutrient totals with your own My Diet targets.", fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1 ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,},
  { id: "tuna-sweetcorn-pasta-salad", code: "L043", mealFamily: "pasta-salad", category: "Lunch", emoji: "🍝", image: "/images/recipes/L043.webp", name: "Tuna & Sweetcorn Pasta Salad", description: "A colourful pasta salad with flaky tuna, sweetcorn and cucumber, brought together with a creamy mayonnaise dressing.", cookingTime: "20 minutes", calories: "463 kcal", protein: "29.4 g", equipment: "Saucepan, colander, bowl, knife", ingredients: [ { item: "Pasta, white, dried, raw", shoppingItem: "White pasta", quantity: "50 g" }, { item: "Tuna, canned in brine, drained", shoppingItem: "Tuna, canned in brine, drained", quantity: "90 g" }, { item: "Sweetcorn kernels, canned in water, drained", shoppingItem: "Sweetcorn kernels", quantity: "20 g" }, { item: "Cucumber, raw, flesh and skin", shoppingItem: "Cucumber", quantity: "⅓ cucumber (30 g)" }, { item: "Lettuce, average, raw", shoppingItem: "Iceberg lettuce", quantity: "2 leaves (20 g)" }, { item: "Mayonnaise, standard, retail", shoppingItem: "Mayonnaise", quantity: "25 g" } ], method: [ "00:00 — Cook the pasta in unsalted water according to the packet instructions.", "10:00 — Drain the pasta thoroughly and allow it to cool.", "12:00 — Drain the tuna very thoroughly and prepare the cucumber.", "15:00 — Mix the pasta, tuna, sweetcorn and cucumber.", "18:00 — Stir through the mayonnaise.", "20:00 — Serve warm or chilled." ], nutrition: { calories: "463 kcal", protein: "29.4 g", carbohydrates: "41.8 g", fat: "20.9 g", fibre: "1.1 g", sodium: "301 mg", salt: "0.75 g", potassium: "447 mg", phosphate: "266 mg" }, potassium: "Moderate", phosphate: "Moderate", purines: "Moderate", dietaryNote: "This recipe is calculated for one serving using CoFID 2021 ingredient values. The tuna is canned in brine, so drain it thoroughly and check the label for salt content.", fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1 ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: false,},
  { id: "egg-leek-rice-bowl", code: "L044", mealFamily: "rice-bowl", category: "Lunch", emoji: "🍳", image: "/images/recipes/L021.webp", name: "Egg & Leek Rice Bowl", description: "Fluffy rice tossed with egg, gently softened leek and onion, finished with fresh chives for a comforting savoury bowl.", cookingTime: "25 minutes", calories: "488 kcal", protein: "18.0 g", equipment: "Saucepan, frying pan, colander, knife", ingredients: [ { item: "Rice, white, basmati, raw", shoppingItem: "White rice", quantity: "60 g (dry)" }, { item: "Eggs, chicken, whole, raw", shoppingItem: "Egg", quantity: "2" }, { item: "Leeks, raw", shoppingItem: "Leek", quantity: "¼ leek (20 g)" }, { item: "Onions, raw", shoppingItem: "Onions", quantity: "½ onion (20 g)" }, { item: "Oil, olive", shoppingItem: "Olive oil", quantity: "15 g" }, { item: "Chives, fresh", shoppingItem: "Fresh chives", quantity: "1 tsp" } ], method: [ "00:00 — Cook the rice according to the packet instructions using unsalted water.", "12:00 — Slice the leek and onion and cook gently in half the oil until soft.", "17:00 — Beat the egg and cook gently in the pan until fully set.", "21:00 — Add the cooked rice and remaining oil and stir through.", "24:00 — Finish with fresh chives.", "25:00 — Serve immediately." ], nutrition: { calories: "488 kcal", protein: "18.0 g", carbohydrates: "52.7 g", fat: "24.4 g", fibre: "1.7 g", sodium: "155 mg", salt: "0.39 g", potassium: "268 mg", phosphate: "249 mg" }, potassium: "Low", phosphate: "Moderate", purines: "Low", dietaryNote: "This recipe is calculated for one serving using CoFID 2021 ingredient values. Compare the recorded nutrient totals with your own My Diet targets.", fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1 ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,},
  { id: "chicken-carrot-noodle-salad", code: "L045", mealFamily: "noodle-salad", category: "Lunch", emoji: "🍜", image: "/images/recipes/L045.webp", name: "Chicken & Carrot Noodle Salad", description: "Rice noodles, tender chicken, carrot and cucumber are tossed with lemon, ginger and olive oil for a fresh, zesty noodle salad.", cookingTime: "20 minutes", calories: "436 kcal", protein: "25.7 g", equipment: "Saucepan, colander, frying pan, knife", ingredients: [ { item: "Noodles, rice, fine, dried, boiled in unsalted water", shoppingItem: "Rice rice noodles", quantity: "150 g (cooked)" }, { item: "Chicken, meat, average, raw", shoppingItem: "Chicken breast", quantity: "100 g (raw)" }, { item: "Carrots, old, boiled in unsalted water", shoppingItem: "Carrots", quantity: "½ carrot (30 g)" }, { item: "Cucumber, raw, flesh and skin", shoppingItem: "Cucumber", quantity: "⅓ cucumber (30 g)" }, { item: "Oil, olive", shoppingItem: "Olive oil", quantity: "20 g" }, { item: "Lemon juice, fresh", shoppingItem: "Lemon juice", quantity: "10 g" }, { item: "Ginger, ground", shoppingItem: "Ground ginger", quantity: "¼ tsp" } ], method: [ "00:00 — Cook the rice rice noodles according to the packet instructions using unsalted water.", "03:00 — Cook the chicken in a non-stick frying pan until completely cooked through.", "10:00 — Boil the carrot until tender and drain well.", "14:00 — Drain the rice rice noodles thoroughly and rinse briefly if serving chilled.", "17:00 — Toss the rice rice noodles with carrot, cucumber, chicken, oil, lemon and ginger.", "20:00 — Serve." ], nutrition: { calories: "436 kcal", protein: "25.7 g", carbohydrates: "34.6 g", fat: "22.7 g", fibre: "3.1 g", sodium: "93 mg", salt: "0.23 g", potassium: "499 mg", phosphate: "202 mg" }, potassium: "Moderate", phosphate: "Moderate", purines: "Moderate", dietaryNote: "This recipe is calculated for one serving using CoFID 2021 ingredient values. Compare the recorded nutrient totals with your own My Diet targets.", fluidMl: 10, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1 ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,},
  { id: "turkey-apple-couscous-salad", code: "L046", mealFamily: "couscous-salad", category: "Lunch", emoji: "🍎", image: "/images/recipes/L046.webp", name: "Turkey & Apple Couscous Salad", description: "Tender turkey and fluffy couscous meet crisp apple and cucumber, with lemon and parsley adding a fresh, herby lift.", cookingTime: "20 minutes", calories: "433 kcal", protein: "29.1 g", equipment: "Saucepan, frying pan, knife, bowl", ingredients: [ { item: "Turkey, light meat, raw", shoppingItem: "Turkey breast", quantity: "100 g (raw)" }, { item: "Couscous, plain, raw", shoppingItem: "Couscous", quantity: "35 g" }, { item: "Apples, eating, raw, flesh and skin", shoppingItem: "Apples", quantity: "⅓ apple (30 g)" }, { item: "Cucumber, raw, flesh and skin", shoppingItem: "Cucumber", quantity: "⅓ cucumber (30 g)" }, { item: "Oil, olive", shoppingItem: "Olive oil", quantity: "20 g" }, { item: "Lemon juice, fresh", shoppingItem: "Lemon juice", quantity: "10 g" }, { item: "Parsley, fresh", shoppingItem: "Fresh parsley", quantity: "1 sprig" } ], method: [ "00:00 — Prepare the couscous according to the packet instructions using unsalted water.", "05:00 — Cook the turkey in a non-stick pan until completely cooked through.", "10:00 — Dice the apple and cucumber.", "14:00 — Fluff the couscous and stir through the apple and cucumber.", "17:00 — Slice the turkey and add to the couscous.", "20:00 — Finish with olive oil, lemon and parsley and serve." ], nutrition: { calories: "433 kcal", protein: "29.1 g", carbohydrates: "31.7 g", fat: "21.9 g", fibre: "1.9 g", sodium: "53 mg", salt: "0.13 g", potassium: "558 mg", phosphate: "324 mg" }, potassium: "Moderate", phosphate: "High", purines: "Moderate", dietaryNote: "This recipe is calculated for one serving using CoFID 2021 ingredient values. Compare the recorded nutrient totals with your own My Diet targets.", fluidMl: 10, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1 ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,},
  { id: "cod-cucumber-pasta-salad", code: "L047", mealFamily: "pasta-salad", category: "Lunch", emoji: "🐟", image: "/images/recipes/L047.webp", name: "Cod & Cucumber Pasta Salad", description: "Flaky baked cod and pasta tossed with cucumber and lettuce, finished with lemon, parsley and olive oil for a bright, fresh salad.", cookingTime: "25 minutes", calories: "443 kcal", protein: "33.7 g", equipment: "Oven, baking tray, saucepan, colander, knife", ingredients: [ { item: "Cod, flesh only, baked", shoppingItem: "Cod fillet", quantity: "120 g" }, { item: "Pasta, white, dried, raw", shoppingItem: "White pasta", quantity: "40 g" }, { item: "Cucumber, raw, flesh and skin", shoppingItem: "Cucumber", quantity: "¼ cucumber (20 g)" }, { item: "Lettuce, average, raw", shoppingItem: "Iceberg lettuce", quantity: "2 leaves (20 g)" }, { item: "Oil, olive", shoppingItem: "Olive oil", quantity: "20 g" }, { item: "Lemon juice, fresh", shoppingItem: "Lemon juice", quantity: "10 g" }, { item: "Parsley, dried", shoppingItem: "Dried parsley", quantity: "¼ tsp" } ], method: [ "00:00 — Heat the oven to 200°C (180°C fan) and bake the cod until cooked through.", "05:00 — Cook the pasta in unsalted water according to the packet instructions.", "15:00 — Drain the pasta thoroughly and allow to cool slightly.", "18:00 — Flake the cod and combine with the pasta, cucumber and lettuce.", "22:00 — Add the olive oil, lemon juice and parsley.", "25:00 — Serve." ], nutrition: { calories: "443 kcal", protein: "33.7 g", carbohydrates: "30.9 g", fat: "21.4 g", fibre: "0.4 g", sodium: "113 mg", salt: "0.28 g", potassium: "627 mg", phosphate: "309 mg" }, potassium: "High", phosphate: "High", purines: "Moderate", dietaryNote: "This recipe is calculated for one serving using CoFID 2021 ingredient values. Compare the recorded nutrient totals with your own My Diet targets.", fluidMl: 10, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1 ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,},
  { id: "chicken-leek-toasted-pitta", code: "L048", mealFamily: "pitta", category: "Lunch", emoji: "🥙", image: "/images/recipes/L048.webp", name: "Chicken & Leek Toasted Pitta", description: "Toasted white pitta filled with tender chicken, softened leek and creamy chive mayonnaise for a warm, savoury lunch.", cookingTime: "18 minutes", calories: "410 kcal", protein: "27.4 g", equipment: "Frying pan, knife, chopping board, toaster", ingredients: [ { item: "Chicken, meat, average, raw", shoppingItem: "Chicken breast", quantity: "100 g (raw)" }, { item: "Bread, pitta, white", shoppingItem: "White pitta bread", quantity: "1 pitta (50 g)" }, { item: "Leeks, boiled in unsalted water", shoppingItem: "Leek", quantity: "¼ leek (20 g)" }, { item: "Mayonnaise, standard, retail", shoppingItem: "Mayonnaise", quantity: "25 g" }, { item: "Chives, fresh", shoppingItem: "Fresh chives", quantity: "1 tsp" } ], method: [ "00:00 — Slice the chicken and leek.", "03:00 — Cook the chicken in a non-stick pan until completely cooked through.", "09:00 — Add the leek and cook until soft.", "13:00 — Warm the pitta and mix the filling with mayonnaise and chives.", "16:00 — Fill the pitta.", "18:00 — Serve immediately." ], nutrition: { calories: "410 kcal", protein: "27.4 g", carbohydrates: "28.7 g", fat: "21.5 g", fibre: "1.6 g", sodium: "310 mg", salt: "0.77 g", potassium: "507 mg", phosphate: "216 mg" }, potassium: "Moderate", phosphate: "Moderate", purines: "Moderate", dietaryNote: "This recipe is calculated for one serving using CoFID 2021 ingredient values. Compare the recorded nutrient totals with your own My Diet targets.", fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1 ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,},
  // International recipes: nutrition is per serving; ingredient quantities make two servings.
  {
    "id": "chicken-tikka-naan-style-flatbread",
    "code": "L049",
    "category": "Lunch",
    "mealFamily": "flatbread",
    "cuisine": "indian",
    "emoji": "🍽️",
    "image": "/images/recipes/L049.webp",
    "name": "Chicken tikka naan-style flatbread",
    "description": "Yoghurt-spiced chicken skewers with charred onion, a soft griddled naan-style bread and cucumber.",
    "cookingTime": "115 minutes elapsed",
    "calories": "706 kcal",
    "protein": "44.2 g",
    "equipment": "0.1 g scales, mixing bowls, knife, board, rolling pin, heavy frying pan, oven tray, metal skewers, clean probe thermometer",
    "ingredients": [
      {
        "item": "Skinless chicken breast",
        "shoppingItem": "Skinless chicken breast",
        "quantity": "240 g (raw edible input; tikka)"
      },
      {
        "item": "Plain whole-milk yoghurt",
        "shoppingItem": "Plain whole-milk yoghurt",
        "quantity": "60 g (raw edible input; tikka)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "80 g (raw edible input; tikka)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "12 g (raw edible input; tikka)"
      },
      {
        "item": "Fresh ginger",
        "shoppingItem": "Fresh ginger",
        "quantity": "12 g (raw edible input; tikka)"
      },
      {
        "item": "Fresh lemon juice",
        "shoppingItem": "Fresh lemon juice",
        "quantity": "30 g (raw edible input; tikka)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "20 g (raw edible input; tikka)"
      },
      {
        "item": "Cumin seeds, ground",
        "shoppingItem": "Cumin seeds, ground",
        "quantity": "1.2 g (raw edible input; tikka)"
      },
      {
        "item": "Coriander seeds, ground",
        "shoppingItem": "Coriander seeds, ground",
        "quantity": "1.6 g (raw edible input; tikka)"
      },
      {
        "item": "Paprika",
        "shoppingItem": "Paprika",
        "quantity": "1.6 g (raw edible input; tikka)"
      },
      {
        "item": "Cayenne chilli powder",
        "shoppingItem": "Cayenne chilli powder",
        "quantity": "0.4 g (raw edible input; tikka)"
      },
      {
        "item": "Ground turmeric",
        "shoppingItem": "Ground turmeric",
        "quantity": "0.6 g (raw edible input; tikka)"
      },
      {
        "item": "Ground cinnamon",
        "shoppingItem": "Ground cinnamon",
        "quantity": "0.2 g (raw edible input; tikka)"
      },
      {
        "item": "Ground cardamom",
        "shoppingItem": "Ground cardamom",
        "quantity": "0.2 g (raw edible input; tikka)"
      },
      {
        "item": "Ground cloves",
        "shoppingItem": "Ground cloves",
        "quantity": "0.1 g (raw edible input; tikka)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.6 g (raw edible input; tikka)"
      },
      {
        "item": "Strong white bread flour",
        "shoppingItem": "Strong white bread flour",
        "quantity": "180 g (dry flour; naan-style bread)"
      },
      {
        "item": "Plain whole-milk yoghurt",
        "shoppingItem": "Plain whole-milk yoghurt",
        "quantity": "40 g (raw edible input; naan-style bread)"
      },
      {
        "item": "Active dry yeast",
        "shoppingItem": "Active dry yeast",
        "quantity": "2 g (dry; naan-style bread)"
      },
      {
        "item": "White sugar",
        "shoppingItem": "White sugar",
        "quantity": "4 g (raw edible input; naan-style bread)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "80 g (weighed water; naan-style bread)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "10 g (raw edible input; naan-style bread)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.6 g (raw edible input; naan-style bread)"
      },
      {
        "item": "Unsalted butter",
        "shoppingItem": "Unsalted butter",
        "quantity": "10 g (raw edible input; bread finish)"
      },
      {
        "item": "Cucumber",
        "shoppingItem": "Cucumber",
        "quantity": "100 g (raw edible input; salad)"
      },
      {
        "item": "Fresh coriander",
        "shoppingItem": "Fresh coriander",
        "quantity": "8 g (raw edible input; salad)"
      }
    ],
    "method": [
      "00:00 - Weigh every ingredient, including the spices. Do not wash raw chicken. Cut it into approximately 25 mm pieces; cut the onion into wedges. Mix the tikka yoghurt, garlic, ginger, lemon, 20 g oil, listed spices and 0.6 g salt. Coat chicken and onion in a covered bowl and refrigerate for 60 minutes.",
      "00:10 - Mix flour, yeast, sugar and 0.6 g bread salt. Add 40 g yoghurt, 80 g weighed lukewarm water and 10 g oil. Knead 6-8 minutes into a soft dough. Cover and prove for about 60 minutes at ordinary warm room temperature, until visibly puffy. Avoid extra flour; use the measured oil or baking paper if sticking.",
      "01:10 - Preheat the grill to medium-high and place a rimmed tray below the skewers to catch juices. Divide the dough equally and roll two flatbreads approximately 20 cm across and 4-5 mm thick. If dough has not puffed, allow another 15-30 minutes and record actual elapsed time.",
      "01:15 - Thread chicken and onion loosely onto metal skewers. Spread all remaining marinade over them. Grill for approximately 18-25 minutes, turning several times, until browned. Check the thickest chicken reaches 75 C for at least 30 seconds; extend cooking as needed.",
      "01:20 - In parallel, heat the dry heavy frying pan over medium-high heat. Cook each bread for about 2-3 minutes on the first side and 1-2 on the other, with a brief lid-on period if needed to cook its centre. Look for cooked, airy crumb and brown patches. Brush both with the measured butter, divided equally.",
      "01:40 - Transfer skewer food to a plate. Put collected marinade and juices in a small pan; bring to a bubbling simmer and heat thoroughly before serving. Divide all chicken, onion, bread, butter, cucumber, coriander and cooked juices equally between two plates. Allow up to 01:55 if the grill or dough needs longer."
    ],
    "nutrition": {
      "calories": "706 kcal",
      "protein": "44.2 g",
      "carbohydrates": "?",
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
    "dietaryNote": "The naan-style bread, measured oil and butter make this a more substantial lunch than a plain chicken wrap. Chicken and yoghurt contribute protein as well as phosphorus, so the useful question is how this full serving fits alongside your other meals. The calculated phosphorus is not a reason to remove the dish automatically: the saved examples show how lighter existing breakfasts and dinners can leave room for it. The marinade and cooked juices are included in the estimate. Your protein needs depend on your kidney condition and treatment; this is not automatically suitable for every non-dialysis or dialysis plan. Carbohydrate definition and practical portion testing still need review.",
    "nutritionBasis": "CoFID ingredient-input estimate",
    "nutritionIncomplete": [
      "carbohydrates"
    ],
    "nutritionSourceNote": "CoFID ingredient-input estimates with cited secondary sources. Compatible carbohydrate is incomplete; an unapproved mixed-basis proposal is retained separately, never exported as a total. L052 coconut minerals remain conditional.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 2
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
    "description": "Turkey mince cooked into a fragrant, fairly dry onion-tomato keema, tucked into warm pitta with cucumber yoghurt.",
    "cookingTime": "55 minutes elapsed",
    "calories": "597 kcal",
    "protein": "43.7 g",
    "equipment": "0.1 g scales, knife, board, wide lidded frying pan, spoon, bowl, toaster or dry frying pan, clean probe thermometer",
    "ingredients": [
      {
        "item": "Skinless turkey breast, finely minced",
        "shoppingItem": "Skinless turkey breast, finely minced",
        "quantity": "240 g (raw edible input; keema)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "120 g (raw edible input; keema)"
      },
      {
        "item": "Tomato",
        "shoppingItem": "Tomato",
        "quantity": "160 g (raw edible input; keema)"
      },
      {
        "item": "Frozen peas",
        "shoppingItem": "Frozen peas",
        "quantity": "80 g (frozen raw edible weight; keema)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "30 g (raw edible input; keema)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "12 g (raw edible input; keema)"
      },
      {
        "item": "Fresh ginger",
        "shoppingItem": "Fresh ginger",
        "quantity": "12 g (raw edible input; keema)"
      },
      {
        "item": "Cumin seeds, ground",
        "shoppingItem": "Cumin seeds, ground",
        "quantity": "2 g (raw edible input; keema)"
      },
      {
        "item": "Coriander seeds, ground",
        "shoppingItem": "Coriander seeds, ground",
        "quantity": "2 g (raw edible input; keema)"
      },
      {
        "item": "Ground turmeric",
        "shoppingItem": "Ground turmeric",
        "quantity": "0.6 g (raw edible input; keema)"
      },
      {
        "item": "Ground cinnamon",
        "shoppingItem": "Ground cinnamon",
        "quantity": "0.3 g (raw edible input; keema)"
      },
      {
        "item": "Ground black pepper",
        "shoppingItem": "Ground black pepper",
        "quantity": "0.4 g (raw edible input; keema)"
      },
      {
        "item": "Cayenne chilli powder",
        "shoppingItem": "Cayenne chilli powder",
        "quantity": "0.6 g (raw edible input; keema)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "1 g (raw edible input; keema)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "60 g (weighed water; keema)"
      },
      {
        "item": "Fresh coriander",
        "shoppingItem": "Fresh coriander",
        "quantity": "10 g (raw edible input; keema finish)"
      },
      {
        "item": "White pitta bread",
        "shoppingItem": "White pitta bread",
        "quantity": "180 g (as sold, four 45 g pittas; bread)"
      },
      {
        "item": "Plain whole-milk yoghurt",
        "shoppingItem": "Plain whole-milk yoghurt",
        "quantity": "60 g (raw edible input; raita)"
      },
      {
        "item": "Cucumber",
        "shoppingItem": "Cucumber",
        "quantity": "60 g (raw edible input; raita)"
      }
    ],
    "method": [
      "00:00 - Finely mince the raw turkey breast using a clean processor or ask the butcher to mince breast only without added ingredients. Finely chop onion, garlic, ginger and tomato. Keep the turkey chilled while preparing vegetables; clean equipment after contact with raw poultry.",
      "00:10 - Heat 30 g oil in a wide pan over medium heat. Add onion and cook gently for 15-20 minutes, stirring until golden. Use 20 g of the measured water if it catches rather than adding unmeasured oil.",
      "00:28 - Add garlic, ginger, cumin, coriander, turmeric, cinnamon, pepper and chilli. Stir for 30-60 seconds. Add tomato and salt and cook 5-7 minutes, crushing tomato until the mixture is a thick masala.",
      "00:35 - Add turkey and break it into small crumbs. Cook 5 minutes, then add the frozen peas and the remaining measured water. Cover and simmer about 8 minutes. Stir thoroughly and check several parts of the mixture reach 75 C for 30 seconds.",
      "00:45 - Uncover and reduce for 3-5 minutes until moist but not saucy. Keep all fat and juices in the filling; do not drain. Fold in chopped coriander. Grate cucumber and mix with yoghurt without squeezing out its juice.",
      "00:50 - Warm four 45 g pittas in a toaster or dry pan for 1-2 minutes. Open pockets carefully. Divide all keema between them, two per person, and serve with the cucumber yoghurt. Allow 55 minutes total; extend cooking if the temperature check requires it."
    ],
    "nutrition": {
      "calories": "597 kcal",
      "protein": "43.7 g",
      "carbohydrates": "?",
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
    "nutritionIncomplete": [
      "carbohydrates"
    ],
    "nutritionSourceNote": "CoFID ingredient-input estimates with cited secondary sources. Compatible carbohydrate is incomplete; an unapproved mixed-basis proposal is retained separately, never exported as a total. L052 coconut minerals remain conditional.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 2
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
    "description": "Two freshly griddled, egg-coated rolls per person, filled with cumin-turmeric cauliflower and a sharp onion-coriander finish.",
    "cookingTime": "55 minutes elapsed",
    "calories": "649 kcal",
    "protein": "25.0 g",
    "equipment": "0.1 g scales, knife, board, mixing bowl, rolling pin, wide non-stick frying pan, lidded saute pan, spatula",
    "ingredients": [
      {
        "item": "Plain white flour",
        "shoppingItem": "Plain white flour",
        "quantity": "160 g (dry flour; flatbreads)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "90 g (weighed water; flatbreads)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "10 g (raw edible input; flatbreads)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.6 g (raw edible input; flatbreads)"
      },
      {
        "item": "Cauliflower florets",
        "shoppingItem": "Cauliflower florets",
        "quantity": "300 g (raw edible input; filling)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "70 g (raw edible input; filling)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "8 g (raw edible input; filling)"
      },
      {
        "item": "Fresh ginger",
        "shoppingItem": "Fresh ginger",
        "quantity": "10 g (raw edible input; filling)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "15 g (raw edible input; filling)"
      },
      {
        "item": "Cumin seeds, ground",
        "shoppingItem": "Cumin seeds, ground",
        "quantity": "2 g (raw edible input; filling)"
      },
      {
        "item": "Coriander seeds, ground",
        "shoppingItem": "Coriander seeds, ground",
        "quantity": "2 g (raw edible input; filling)"
      },
      {
        "item": "Ground turmeric",
        "shoppingItem": "Ground turmeric",
        "quantity": "1 g (raw edible input; filling)"
      },
      {
        "item": "Cayenne chilli powder",
        "shoppingItem": "Cayenne chilli powder",
        "quantity": "0.4 g (raw edible input; filling)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.6 g (raw edible input; filling)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "30 g (weighed water; filling)"
      },
      {
        "item": "Whole egg, shell removed",
        "shoppingItem": "Whole egg, shell removed",
        "quantity": "200 g (raw edible weight, approximately four medium eggs; egg coating)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "10 g (raw edible input; egg coating)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "30 g (raw edible input; fresh finish)"
      },
      {
        "item": "Fresh lemon juice",
        "shoppingItem": "Fresh lemon juice",
        "quantity": "20 g (raw edible input; fresh finish)"
      },
      {
        "item": "Fresh coriander",
        "shoppingItem": "Fresh coriander",
        "quantity": "10 g (raw edible input; fresh finish)"
      }
    ],
    "method": [
      "00:00 - Mix flour, 90 g water, 10 g oil and 0.6 g salt. Knead 5 minutes and cover for 15 minutes. Beat exactly 200 g shelled egg in a separate bowl; egg count is only a shopping approximation.",
      "00:10 - Cut cauliflower into 1-1.5 cm florets and finely slice both onion portions, keeping 30 g aside raw. Heat 15 g oil in a lidded pan. Cook the 70 g onion portion 5 minutes. Add garlic, ginger and filling spices and stir briefly.",
      "00:17 - Add cauliflower, 0.6 g salt and 30 g water. Cover for about 8 minutes, then uncover and cook 5-7 minutes, stirring, until tender with browned edges and no watery sauce. Do not boil in excess water or drain.",
      "00:20 - Divide the rested dough into four equal pieces and roll each approximately 18 cm wide. Use baking paper rather than adding uncounted dusting flour. Cook each in a hot dry non-stick pan for approximately 1 minute per side until cooked through. Stack under a clean cloth.",
      "00:32 - Divide the 10 g coating oil into four 2.5 g portions. Heat one portion over medium-low heat. Pour in 50 g beaten egg, spread to the bread size and immediately lay a cooked flatbread over it. Cook until the egg layer is fully set; turn and heat the bread briefly. Repeat four times without leaving liquid egg on the bread.",
      "00:48 - Combine the reserved 30 g onion, lemon and coriander. Divide all cauliflower and fresh finish between four egg-coated breads. Roll firmly and serve two per person. Allow up to 55 minutes for the successive pan batches; timing depends on burner and pan size."
    ],
    "nutrition": {
      "calories": "649 kcal",
      "protein": "25.0 g",
      "carbohydrates": "?",
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
    "dietaryNote": "These are egg-coated flatbread rolls, not an omelette in a commercial wrap. Bread and oil supply much of the energy, while whole egg and cauliflower contribute protein and the recorded minerals. The yolks have been kept because they are part of the agreed dish; no fixed per-meal phosphorus rule was applied. Cauliflower is cooked with a small measured amount of water and nothing is drained, so no potassium-leaching reduction has been claimed. Use the full serving information when combining this lunch with the rest of your day. The egg layers should be completely set. The carbohydrate proposal and practical roll size still need review.",
    "nutritionBasis": "CoFID ingredient-input estimate",
    "nutritionIncomplete": [
      "carbohydrates"
    ],
    "nutritionSourceNote": "CoFID ingredient-input estimates with cited secondary sources. Compatible carbohydrate is incomplete; an unapproved mixed-basis proposal is retained separately, never exported as a total. L052 coconut minerals remain conditional.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 2
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
    "description": "Lacy fermented rice-and-coconut hoppers served with a coconut chicken curry fragrant with curry leaves and toasted spices.",
    "cookingTime": "65 minutes, plus 18-20 hours fermentation",
    "calories": "827 kcal",
    "protein": "34.2 g",
    "equipment": "0.1 g scales, clean covered fermentation bowl, non-stick hopper pan or small curved wok with fitted lid, ladle, wide saucepan, knife, board, spice grinder, clean probe thermometer",
    "ingredients": [
      {
        "item": "Fine white rice flour",
        "shoppingItem": "Fine white rice flour",
        "quantity": "180 g (dry flour; hoppers)"
      },
      {
        "item": "Active dry yeast",
        "shoppingItem": "Active dry yeast",
        "quantity": "0.3 g (dry; requires 0.1 g scales; hoppers)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "180 g (weighed water; hoppers)"
      },
      {
        "item": "Full-fat canned coconut milk",
        "shoppingItem": "Full-fat canned coconut milk",
        "quantity": "160 g (as sold, weighed not converted from ml; hoppers)"
      },
      {
        "item": "White sugar",
        "shoppingItem": "White sugar",
        "quantity": "4 g (raw edible input; hoppers)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.6 g (raw edible input; hoppers)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "4 g (raw edible input; hopper pan)"
      },
      {
        "item": "Boneless skinless chicken thigh",
        "shoppingItem": "Boneless skinless chicken thigh",
        "quantity": "240 g (raw edible input; curry)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "100 g (raw edible input; curry)"
      },
      {
        "item": "Tomato",
        "shoppingItem": "Tomato",
        "quantity": "120 g (raw edible input; curry)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "12 g (raw edible input; curry)"
      },
      {
        "item": "Fresh ginger",
        "shoppingItem": "Fresh ginger",
        "quantity": "12 g (raw edible input; curry)"
      },
      {
        "item": "Fresh curry leaves, finely sliced",
        "shoppingItem": "Fresh curry leaves, finely sliced",
        "quantity": "2 g (raw edible leaf, stems removed; leaves eaten; curry)"
      },
      {
        "item": "Coriander seeds, ground",
        "shoppingItem": "Coriander seeds, ground",
        "quantity": "3 g (raw edible input; curry)"
      },
      {
        "item": "Cumin seeds, ground",
        "shoppingItem": "Cumin seeds, ground",
        "quantity": "1.5 g (raw edible input; curry)"
      },
      {
        "item": "Fennel seeds, ground",
        "shoppingItem": "Fennel seeds, ground",
        "quantity": "0.8 g (raw edible input; curry)"
      },
      {
        "item": "Ground turmeric",
        "shoppingItem": "Ground turmeric",
        "quantity": "0.6 g (raw edible input; curry)"
      },
      {
        "item": "Cayenne chilli powder",
        "shoppingItem": "Cayenne chilli powder",
        "quantity": "0.8 g (raw edible input; curry)"
      },
      {
        "item": "Ground cinnamon",
        "shoppingItem": "Ground cinnamon",
        "quantity": "0.3 g (raw edible input; curry)"
      },
      {
        "item": "Ground cardamom",
        "shoppingItem": "Ground cardamom",
        "quantity": "0.2 g (raw edible input; curry)"
      },
      {
        "item": "Ground cloves",
        "shoppingItem": "Ground cloves",
        "quantity": "0.1 g (raw edible input; curry)"
      },
      {
        "item": "Coconut oil",
        "shoppingItem": "Coconut oil",
        "quantity": "20 g (raw edible input; curry)"
      },
      {
        "item": "Full-fat canned coconut milk",
        "shoppingItem": "Full-fat canned coconut milk",
        "quantity": "80 g (as sold, weighed; curry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "150 g (weighed water; curry)"
      },
      {
        "item": "Vinegar",
        "shoppingItem": "Vinegar",
        "quantity": "10 g (raw edible input; curry)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.9 g (raw edible input; curry)"
      }
    ],
    "method": [
      "The previous day, 18-20 hours before cooking - Mix rice flour, 0.3 g yeast and 180 g weighed water into a thick paste in a clean covered bowl. Ferment at approximately 20-24 C until risen and bubbly. Do not add coconut milk, sugar, salt or raw chicken at this stage. This follows a culinary fermentation method, not a validated home food-safety process; do not extend fermentation indefinitely if it fails.",
      "Cooking day, 00:00 - Stir 160 g coconut milk and 4 g sugar into the fermented paste. Cover for 30 minutes. The batter should pour smoothly and coat the pan thinly; reserve any required additional weighed water as a documented revision, not an unrecorded coconut-milk addition.",
      "00:05 - Cut chicken thighs into 2-3 cm pieces. Chop onion and tomato; crush garlic and ginger. Lightly toast the coriander, cumin and fennel in a dry saucepan for 30-60 seconds without burning. Add coconut oil, onion, garlic, ginger and finely sliced curry leaves; soften for 6-8 minutes.",
      "00:15 - Add turmeric, chilli, cinnamon, cardamom, cloves, tomato and 0.9 g curry salt. Cook 5 minutes to soften tomato, then add chicken, 80 g coconut milk, 150 g water and vinegar. Simmer gently, covered, 20-25 minutes, stirring and checking several chicken pieces reach 75 C for 30 seconds. Uncover briefly if needed to thicken; do not discard sauce.",
      "00:30 - Stir 0.6 g hopper salt into the batter. Heat a non-stick curved hopper pan over medium heat. Divide the measured 4 g olive oil across eight to ten hoppers with a brush. Weigh or divide batter equally; ladle a portion, quickly swirl it up the sides and cover. Cook 2-3 minutes until the centre is set and edges release. Repeat, adjusting heat to avoid burning.",
      "00:55 - If a second pan is unavailable, allow up to 65 minutes on cooking day for all hoppers and curry. Serve half the hoppers and half the curry per person, with the complete sauce. The finely sliced curry leaves are part of the eaten specification. Without a curved pan, the flat pancake result is a different practical variant requiring its own review."
    ],
    "nutrition": {
      "calories": "827 kcal",
      "protein": "34.2 g",
      "carbohydrates": "?",
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
    "nutritionIncomplete": [
      "carbohydrates"
    ],
    "nutritionSourceNote": "CoFID ingredient-input estimates with cited secondary sources. Compatible carbohydrate is incomplete; an unapproved mixed-basis proposal is retained separately, never exported as a total. L052 coconut minerals remain conditional.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 2
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
    "description": "Warm garlic flatbread with sliced, twice-browned shawarma-spiced chicken thigh, roasted onion, fresh tomato and a small garlic emulsion.",
    "cookingTime": "120 minutes elapsed",
    "calories": "804 kcal",
    "protein": "39.7 g",
    "equipment": "0.1 g scales, mixing bowls, knife, board, rolling pin, rimmed roasting tray, heavy frying pan, small mortar and whisk, clean probe thermometer",
    "ingredients": [
      {
        "item": "Boneless skinless chicken thigh",
        "shoppingItem": "Boneless skinless chicken thigh",
        "quantity": "260 g (raw edible input; shawarma)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "100 g (raw edible input; shawarma)"
      },
      {
        "item": "Fresh lemon juice",
        "shoppingItem": "Fresh lemon juice",
        "quantity": "30 g (raw edible input; shawarma)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "8 g (raw edible input; shawarma)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "16 g (raw edible input; shawarma)"
      },
      {
        "item": "Cumin seeds, ground",
        "shoppingItem": "Cumin seeds, ground",
        "quantity": "1.5 g (raw edible input; shawarma)"
      },
      {
        "item": "Coriander seeds, ground",
        "shoppingItem": "Coriander seeds, ground",
        "quantity": "2 g (raw edible input; shawarma)"
      },
      {
        "item": "Paprika",
        "shoppingItem": "Paprika",
        "quantity": "1 g (raw edible input; shawarma)"
      },
      {
        "item": "Ground allspice",
        "shoppingItem": "Ground allspice",
        "quantity": "0.5 g (raw edible input; shawarma)"
      },
      {
        "item": "Ground cinnamon",
        "shoppingItem": "Ground cinnamon",
        "quantity": "0.3 g (raw edible input; shawarma)"
      },
      {
        "item": "Ground black pepper",
        "shoppingItem": "Ground black pepper",
        "quantity": "0.4 g (raw edible input; shawarma)"
      },
      {
        "item": "Ground turmeric",
        "shoppingItem": "Ground turmeric",
        "quantity": "0.5 g (raw edible input; shawarma)"
      },
      {
        "item": "Cayenne chilli powder",
        "shoppingItem": "Cayenne chilli powder",
        "quantity": "0.3 g (raw edible input; shawarma)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.6 g (raw edible input; shawarma)"
      },
      {
        "item": "Strong white bread flour",
        "shoppingItem": "Strong white bread flour",
        "quantity": "180 g (dry flour; garlic flatbread)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "100 g (weighed water; garlic flatbread)"
      },
      {
        "item": "Active dry yeast",
        "shoppingItem": "Active dry yeast",
        "quantity": "2 g (dry; garlic flatbread)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "10 g (raw edible input; garlic flatbread)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "4 g (raw edible input; garlic flatbread)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.6 g (raw edible input; garlic flatbread)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "6 g (raw edible input; toum-style sauce)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "40 g (raw edible input; toum-style sauce)"
      },
      {
        "item": "Fresh lemon juice",
        "shoppingItem": "Fresh lemon juice",
        "quantity": "10 g (raw edible input; toum-style sauce)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "5 g (weighed water; toum-style sauce)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.3 g (raw edible input; toum-style sauce)"
      },
      {
        "item": "Tomato",
        "shoppingItem": "Tomato",
        "quantity": "120 g (raw edible input; fresh side)"
      }
    ],
    "method": [
      "00:00 - Flatten thigh pieces to an even thickness without mincing. Mix the shawarma lemon, garlic, oil, spices and 0.6 g salt; coat chicken and onion wedges. Cover and refrigerate for at least 60 minutes. Do not wash raw poultry.",
      "00:10 - Mix bread flour, yeast and 0.6 g bread salt. Add 100 g water, 10 g oil and the finely crushed 4 g bread garlic. Knead about 8 minutes; cover and prove around 60 minutes until puffy. Do not add unmeasured dusting flour.",
      "00:20 - Crush the 6 g sauce garlic with 0.3 g sauce salt in a small mortar to a smooth paste. Whisk in 40 g sauce oil drop by drop, alternating with the 10 g sauce lemon juice and 5 g water. Aim for a loose emulsion rather than a large-batch restaurant toum. Keep chilled and use this batch now; do not store garlic in oil at room temperature. Separation is a practical issue, not a reason to omit its oil from nutrition.",
      "01:10 - Heat oven to 220 C (200 C fan). Arrange chicken, onion and every bit of marinade in a single layer in a rimmed tray. Roast about 20-25 minutes until browned and chicken reaches 75 C for 30 seconds; extend cooking as needed.",
      "01:15 - Divide the dough in two and roll approximately 20 cm flatbreads. Cook in a hot dry heavy pan 2-3 minutes each side until cooked through with brown patches. Keep warm under a clean cloth.",
      "01:35 - Rest chicken 3 minutes, then slice thinly. Transfer tray juices and onions to the hot frying pan and bring to a bubbling simmer. Add sliced chicken and briefly toss to brown its edges and coat it with the cooked juices. Use the listed oil only.",
      "01:45 - Divide all chicken, onions, juices, tomato and sauce equally between two garlic flatbreads. Allow up to 120 minutes elapsed if proofing or browning needs longer. This sliced-and-browned preparation, garlic bread and oil-based sauce distinguish it from tikka skewers and yoghurt marinade."
    ],
    "nutrition": {
      "calories": "804 kcal",
      "protein": "39.7 g",
      "carbohydrates": "?",
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
    "nutritionIncomplete": [
      "carbohydrates"
    ],
    "nutritionSourceNote": "CoFID ingredient-input estimates with cited secondary sources. Compatible carbohydrate is incomplete; an unapproved mixed-basis proposal is retained separately, never exported as a total. L052 coconut minerals remain conditional.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 2
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
    "description": "Grilled Turkish-style oval lamb kofta, not beef meatballs in sauce; parsley and lemon bulgur stay separate from the meat.",
    "cookingTime": "50 minutes elapsed (development timing)",
    "calories": "730 kcal",
    "protein": "38.4 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Lamb mince",
        "shoppingItem": "Lamb mince",
        "quantity": "300 g (kofta; raw edible input)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "60 g (kofta; raw edible input)"
      },
      {
        "item": "Fresh parsley",
        "shoppingItem": "Fresh parsley",
        "quantity": "12 g (kofta; raw edible input)"
      },
      {
        "item": "Ground cumin",
        "shoppingItem": "Ground cumin",
        "quantity": "2 g (kofta; dry)"
      },
      {
        "item": "Ground black pepper",
        "shoppingItem": "Ground black pepper",
        "quantity": "0.5 g (kofta; dry)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.8 g (kofta; dry)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "10 g (kofta; as sold, weighed grams)"
      },
      {
        "item": "Bulgur wheat",
        "shoppingItem": "Bulgur wheat",
        "quantity": "160 g (bulgur; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "320 g (bulgur; weighed recipe water)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "18 g (bulgur; as sold, weighed grams)"
      },
      {
        "item": "Fresh lemon juice",
        "shoppingItem": "Fresh lemon juice",
        "quantity": "25 g (bulgur; freshly squeezed, weighed grams)"
      },
      {
        "item": "Fresh parsley",
        "shoppingItem": "Fresh parsley",
        "quantity": "15 g (bulgur; raw edible input)"
      },
      {
        "item": "Fresh tomato",
        "shoppingItem": "Fresh tomato",
        "quantity": "120 g (bulgur; raw edible input)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.6 g (bulgur; dry)"
      }
    ],
    "method": [
      "Finely grate the kofta onion without discarding juice. Mix with lamb, parsley, cumin, pepper and kofta salt for 2 minutes until sticky. Form six equal oval kofta and chill 15 minutes.",
      "Bring the bulgur and measured water to a simmer, cover for 10-12 minutes or until tender, then rest 5 minutes. Check the packet grain size; record any additional weighed water as a revision.",
      "Brush a griddle with the 10 g kofta oil and cook the kofta over medium-high heat for 10-12 minutes, turning to brown every side. Check their centres reach the meat safety endpoint. Keep and serve the cooked pan juices.",
      "Fluff bulgur with its 18 g oil, lemon and salt. Fold in chopped tomato and bulgur parsley. Serve three kofta and half the herbed grain per person.",
      "Cook poultry, minced meats and mixed meat fillings to a clean-probe centre temperature of 75 C for at least 30 seconds. Cook fish and pork safely throughout; times alone do not establish doneness. Do not wash raw poultry. Fully set eggs. Source: https://www.food.gov.uk/safety-hygiene/cooking-your-food"
    ],
    "nutrition": {
      "calories": "730 kcal",
      "protein": "38.4 g",
      "carbohydrates": "?",
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
    "nutritionIncomplete": [
      "carbohydrates"
    ],
    "nutritionSourceNote": "Ingredient-input estimates with nutrient-specific supplements and explicit unknowns. CoFID carbohydrate expressed as monosaccharides; alternatives not mixed into totals. See evidence/L054/summary.json.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 2
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
    "description": "Lemon-oregano skewer cookery and fresh cucumber yoghurt distinguish souvlaki from sliced shawarma and gyros.",
    "cookingTime": "70 minutes elapsed (development timing)",
    "calories": "643 kcal",
    "protein": "50.1 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Skinless boneless chicken breast",
        "shoppingItem": "Skinless boneless chicken breast",
        "quantity": "300 g (skewers; raw edible input)"
      },
      {
        "item": "Fresh lemon juice",
        "shoppingItem": "Fresh lemon juice",
        "quantity": "30 g (skewers; freshly squeezed, weighed grams)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "22 g (skewers; as sold, weighed grams)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "8 g (skewers; raw edible input)"
      },
      {
        "item": "Dried oregano",
        "shoppingItem": "Dried oregano",
        "quantity": "1.5 g (skewers; dry)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.8 g (skewers; dry)"
      },
      {
        "item": "Ground black pepper",
        "shoppingItem": "Ground black pepper",
        "quantity": "0.4 g (skewers; dry)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "100 g (skewers; raw edible input)"
      },
      {
        "item": "White pitta bread",
        "shoppingItem": "White pitta bread",
        "quantity": "200 g (pitta and salad; as sold)"
      },
      {
        "item": "Cucumber",
        "shoppingItem": "Cucumber",
        "quantity": "150 g (pitta and salad; raw edible input)"
      },
      {
        "item": "Fresh tomato",
        "shoppingItem": "Fresh tomato",
        "quantity": "120 g (pitta and salad; raw edible input)"
      },
      {
        "item": "Plain whole-milk yoghurt",
        "shoppingItem": "Plain whole-milk yoghurt",
        "quantity": "100 g (pitta and salad; as sold)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "3 g (pitta and salad; raw edible input)"
      },
      {
        "item": "Fresh lemon juice",
        "shoppingItem": "Fresh lemon juice",
        "quantity": "10 g (pitta and salad; freshly squeezed, weighed grams)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "10 g (pitta and salad; as sold, weighed grams)"
      }
    ],
    "method": [
      "Cut chicken into even 2.5 cm pieces. Combine the skewer lemon, oil, garlic, oregano, salt and pepper; refrigerate chicken and onion wedges in this marinade for 30 minutes.",
      "Dice cucumber without squeezing or draining it. Combine half with yoghurt, sauce garlic and lemon; keep the remainder with chopped tomato as a side. Refrigerate until serving.",
      "Thread the chicken and onion onto metal skewers. Griddle over medium-high heat 10-14 minutes, turning regularly, until chicken reaches the poultry safety endpoint. Simmer all reserved marinade in a small pan until bubbling and safely cooked, then spoon over the cooked skewers.",
      "Warm pitta in a dry pan for 1 minute each side. Brush with the 10 g finish oil. Serve half the skewers, bread, cucumber sauce and tomato side to each person.",
      "Cook poultry, minced meats and mixed meat fillings to a clean-probe centre temperature of 75 C for at least 30 seconds. Cook fish and pork safely throughout; times alone do not establish doneness. Do not wash raw poultry. Fully set eggs. Source: https://www.food.gov.uk/safety-hygiene/cooking-your-food"
    ],
    "nutrition": {
      "calories": "643 kcal",
      "protein": "50.1 g",
      "carbohydrates": "?",
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
    "nutritionIncomplete": [
      "carbohydrates"
    ],
    "nutritionSourceNote": "Ingredient-input estimates with nutrient-specific supplements and explicit unknowns. CoFID carbohydrate expressed as monosaccharides; alternatives not mixed into totals. See evidence/L055/summary.json.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 2
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
    "description": "Green coriander-parsley chermoula coats baked cod; couscous absorbs the carrot cooking water.",
    "cookingTime": "40 minutes elapsed (development timing)",
    "calories": "679 kcal",
    "protein": "39.8 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Cod fillet, flesh only",
        "shoppingItem": "Cod fillet, flesh only",
        "quantity": "320 g (chermoula fish; raw edible input)"
      },
      {
        "item": "Fresh coriander leaves",
        "shoppingItem": "Fresh coriander leaves",
        "quantity": "20 g (chermoula fish; raw edible input)"
      },
      {
        "item": "Fresh parsley",
        "shoppingItem": "Fresh parsley",
        "quantity": "20 g (chermoula fish; raw edible input)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "10 g (chermoula fish; raw edible input)"
      },
      {
        "item": "Fresh lemon juice",
        "shoppingItem": "Fresh lemon juice",
        "quantity": "35 g (chermoula fish; freshly squeezed, weighed grams)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "35 g (chermoula fish; as sold, weighed grams)"
      },
      {
        "item": "Ground cumin",
        "shoppingItem": "Ground cumin",
        "quantity": "2 g (chermoula fish; dry)"
      },
      {
        "item": "Sweet paprika",
        "shoppingItem": "Sweet paprika",
        "quantity": "2 g (chermoula fish; dry)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "1 g (chermoula fish; dry)"
      },
      {
        "item": "Plain couscous",
        "shoppingItem": "Plain couscous",
        "quantity": "170 g (couscous; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "220 g (couscous; weighed recipe water)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "12 g (couscous; as sold, weighed grams)"
      },
      {
        "item": "Carrot",
        "shoppingItem": "Carrot",
        "quantity": "120 g (couscous; raw edible input)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.5 g (couscous; dry)"
      }
    ],
    "method": [
      "Finely chop coriander, parsley and garlic; mix with lemon, 35 g oil, cumin, paprika and fish salt into chermoula. Coat cod and leave chilled for 15 minutes.",
      "Cut carrot into 5 mm dice. Simmer in the measured couscous water for 5 minutes. Pour the complete boiling carrot-water mixture over couscous, add its oil and salt, cover for 10 minutes, then fluff.",
      "Heat oven to 210 C conventional or 190 C fan. Place fish and every bit of chermoula in a small baking dish. Bake 12-18 minutes, checking the thickest part is cooked safely and flakes.",
      "Serve one half of the fish, its herb juices and the couscous per person. Keep the fresh green herb character; this is distinct from the cooked red harissa paste of D065.",
      "Cook poultry, minced meats and mixed meat fillings to a clean-probe centre temperature of 75 C for at least 30 seconds. Cook fish and pork safely throughout; times alone do not establish doneness. Do not wash raw poultry. Fully set eggs. Source: https://www.food.gov.uk/safety-hygiene/cooking-your-food"
    ],
    "nutrition": {
      "calories": "679 kcal",
      "protein": "39.8 g",
      "carbohydrates": "?",
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
    "nutritionIncomplete": [
      "carbohydrates"
    ],
    "nutritionSourceNote": "Ingredient-input estimates with nutrient-specific supplements and explicit unknowns. CoFID carbohydrate expressed as monosaccharides; alternatives not mixed into totals. See evidence/L056/summary.json.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 2
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
    "description": "Eggs poached in a reduced North African pepper-tomato base, rather than scrambled egg on toast.",
    "cookingTime": "45 minutes elapsed (development timing)",
    "calories": "653 kcal",
    "protein": "25.9 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Whole egg, shell removed",
        "shoppingItem": "Whole egg, shell removed",
        "quantity": "220 g (shakshuka; raw edible input)"
      },
      {
        "item": "Red bell pepper",
        "shoppingItem": "Red bell pepper",
        "quantity": "240 g (shakshuka; raw edible input)"
      },
      {
        "item": "Fresh tomato",
        "shoppingItem": "Fresh tomato",
        "quantity": "400 g (shakshuka; raw edible input)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "100 g (shakshuka; raw edible input)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "8 g (shakshuka; raw edible input)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "30 g (shakshuka; as sold, weighed grams)"
      },
      {
        "item": "Ground cumin",
        "shoppingItem": "Ground cumin",
        "quantity": "2 g (shakshuka; dry)"
      },
      {
        "item": "Sweet paprika",
        "shoppingItem": "Sweet paprika",
        "quantity": "2 g (shakshuka; dry)"
      },
      {
        "item": "Pure cayenne chilli powder",
        "shoppingItem": "Pure cayenne chilli powder",
        "quantity": "0.4 g (shakshuka; dry)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "1.2 g (shakshuka; dry)"
      },
      {
        "item": "Fresh parsley",
        "shoppingItem": "Fresh parsley",
        "quantity": "12 g (shakshuka; raw edible input)"
      },
      {
        "item": "White bread",
        "shoppingItem": "White bread",
        "quantity": "200 g (bread; as sold)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "12 g (bread; as sold, weighed grams)"
      }
    ],
    "method": [
      "Chop onion and peppers into 1 cm pieces; crush garlic and dice tomato. Heat the 30 g sauce oil in a wide lidded frying pan. Soften onion and peppers for 8-10 minutes.",
      "Stir in garlic, cumin, paprika and chilli for 30 seconds. Add tomato and salt. Simmer 15-20 minutes until thick enough to hold four wells; do not strain the sauce.",
      "Weigh 220 g shelled eggs, approximately four large eggs, keeping individual yolks where possible. Divide between four wells. Cover on low heat until whites and yolks are fully set, roughly 7-10 minutes.",
      "Warm the bread and brush with the 12 g bread oil. Scatter parsley over the pan. Serve half of the eggs and complete pepper-tomato sauce, with half the bread, to each person.",
      "Cook poultry, minced meats and mixed meat fillings to a clean-probe centre temperature of 75 C for at least 30 seconds. Cook fish and pork safely throughout; times alone do not establish doneness. Do not wash raw poultry. Fully set eggs. Source: https://www.food.gov.uk/safety-hygiene/cooking-your-food"
    ],
    "nutrition": {
      "calories": "653 kcal",
      "protein": "25.9 g",
      "carbohydrates": "?",
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
    "nutritionIncomplete": [
      "carbohydrates"
    ],
    "nutritionSourceNote": "Ingredient-input estimates with nutrient-specific supplements and explicit unknowns. CoFID carbohydrate expressed as monosaccharides; alternatives not mixed into totals. See evidence/L057/summary.json.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 2
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
    "description": "Handmade wheat wrappers and enclosed juicy ginger-pork filling are steamed, not pan-fried meatballs or a noodle bowl.",
    "cookingTime": "85 minutes elapsed (development timing)",
    "calories": "724 kcal",
    "protein": "37.5 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Plain white flour",
        "shoppingItem": "Plain white flour",
        "quantity": "190 g (wrappers; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "100 g (wrappers; weighed recipe water)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "8 g (wrappers; as sold, weighed grams)"
      },
      {
        "item": "Plain pork mince",
        "shoppingItem": "Plain pork mince",
        "quantity": "280 g (filling; raw edible input)"
      },
      {
        "item": "Chinese cabbage",
        "shoppingItem": "Chinese cabbage",
        "quantity": "140 g (filling; raw edible input)"
      },
      {
        "item": "Spring onion, bulbs and green tops",
        "shoppingItem": "Spring onion, bulbs and green tops",
        "quantity": "30 g (filling; raw edible input)"
      },
      {
        "item": "Fresh ginger",
        "shoppingItem": "Fresh ginger",
        "quantity": "16 g (filling; raw edible input)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "6 g (filling; raw edible input)"
      },
      {
        "item": "Soy sauce",
        "shoppingItem": "Soy sauce",
        "quantity": "18 g (filling; as sold, weighed grams)"
      },
      {
        "item": "Sesame oil",
        "shoppingItem": "Sesame oil",
        "quantity": "12 g (filling; as sold, weighed grams)"
      },
      {
        "item": "White sugar",
        "shoppingItem": "White sugar",
        "quantity": "4 g (filling; dry)"
      },
      {
        "item": "Ground black pepper",
        "shoppingItem": "Ground black pepper",
        "quantity": "0.5 g (filling; dry)"
      },
      {
        "item": "Soy sauce",
        "shoppingItem": "Soy sauce",
        "quantity": "14 g (dipping sauce; as sold, weighed grams)"
      },
      {
        "item": "Plain unseasoned vinegar",
        "shoppingItem": "Plain unseasoned vinegar",
        "quantity": "25 g (dipping sauce; as sold, weighed grams)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "20 g (dipping sauce; weighed recipe water)"
      },
      {
        "item": "Fresh ginger",
        "shoppingItem": "Fresh ginger",
        "quantity": "4 g (dipping sauce; raw edible input)"
      },
      {
        "item": "Sesame oil",
        "shoppingItem": "Sesame oil",
        "quantity": "6 g (dipping sauce; as sold, weighed grams)"
      }
    ],
    "method": [
      "Mix wrapper flour with its water and oil. Knead 6-8 minutes to a smooth firm dough and cover for 30 minutes. Finely chop cabbage and spring onion; do not salt or squeeze out juice.",
      "Mix pork, cabbage, spring onion, filling ginger and garlic, 18 g soy, 12 g sesame oil, sugar and pepper vigorously until cohesive. Keep refrigerated while rolling wrappers.",
      "Divide dough and filling into 24 equal portions. Roll wrappers about 9 cm wide with thin edges on baking paper. Add one filling portion to each; wet edges with a little measured process water and pleat firmly, keeping filling off the seal.",
      "Line a steamer with perforated baking paper. Set dumplings apart and steam over boiling process water for 12-16 minutes in batches; check the centre of a thick dumpling reaches the mince safety endpoint. Refill only the steamer reservoir, never pour water onto the dumplings.",
      "Mix the dipping sauce ingredients. Serve twelve dumplings and half the complete dipping sauce per person. Sauce quantities are planned as consumed, not an assumed restaurant dipping uptake.",
      "Cook poultry, minced meats and mixed meat fillings to a clean-probe centre temperature of 75 C for at least 30 seconds. Cook fish and pork safely throughout; times alone do not establish doneness. Do not wash raw poultry. Fully set eggs. Source: https://www.food.gov.uk/safety-hygiene/cooking-your-food"
    ],
    "nutrition": {
      "calories": "724 kcal",
      "protein": "37.5 g",
      "carbohydrates": "?",
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
    "nutritionIncomplete": [
      "carbohydrates"
    ],
    "nutritionSourceNote": "Ingredient-input estimates with nutrient-specific supplements and explicit unknowns. CoFID carbohydrate expressed as monosaccharides; alternatives not mixed into totals. See evidence/L058/summary.json.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 2
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
    "description": "Crisp coarse-crumb cutlet with tangy sauce and raw slaw; coating losses are explicit rather than an invented oil uptake.",
    "cookingTime": "55 minutes elapsed (development timing)",
    "calories": "977 kcal",
    "protein": "51.8 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Skinless boneless chicken breast",
        "shoppingItem": "Skinless boneless chicken breast",
        "quantity": "300 g (cutlets; raw edible input)"
      },
      {
        "item": "Plain white flour",
        "shoppingItem": "Plain white flour",
        "quantity": "25 g (cutlets; dry)"
      },
      {
        "item": "Whole egg, shell removed",
        "shoppingItem": "Whole egg, shell removed",
        "quantity": "60 g (cutlets; raw edible input)"
      },
      {
        "item": "Plain coarse dry white breadcrumbs",
        "shoppingItem": "Plain coarse dry white breadcrumbs",
        "quantity": "70 g (cutlets; dry)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "36 g (cutlets; as sold, weighed grams)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.8 g (cutlets; dry)"
      },
      {
        "item": "Ground black pepper",
        "shoppingItem": "Ground black pepper",
        "quantity": "0.4 g (cutlets; dry)"
      },
      {
        "item": "White short-grain rice",
        "shoppingItem": "White short-grain rice",
        "quantity": "150 g (rice; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "270 g (rice; weighed recipe water)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "10 g (rice; as sold, weighed grams)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.6 g (rice; dry)"
      },
      {
        "item": "White cabbage",
        "shoppingItem": "White cabbage",
        "quantity": "160 g (slaw; raw edible input)"
      },
      {
        "item": "Carrot",
        "shoppingItem": "Carrot",
        "quantity": "80 g (slaw; raw edible input)"
      },
      {
        "item": "Plain unseasoned vinegar",
        "shoppingItem": "Plain unseasoned vinegar",
        "quantity": "20 g (slaw; as sold, weighed grams)"
      },
      {
        "item": "White sugar",
        "shoppingItem": "White sugar",
        "quantity": "8 g (slaw; dry)"
      },
      {
        "item": "Sesame oil",
        "shoppingItem": "Sesame oil",
        "quantity": "8 g (slaw; as sold, weighed grams)"
      },
      {
        "item": "Tomato puree",
        "shoppingItem": "Tomato puree",
        "quantity": "25 g (sharp tomato sauce; as sold)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "40 g (sharp tomato sauce; weighed recipe water)"
      },
      {
        "item": "Soy sauce",
        "shoppingItem": "Soy sauce",
        "quantity": "12 g (sharp tomato sauce; as sold, weighed grams)"
      },
      {
        "item": "White sugar",
        "shoppingItem": "White sugar",
        "quantity": "12 g (sharp tomato sauce; dry)"
      },
      {
        "item": "Plain unseasoned vinegar",
        "shoppingItem": "Plain unseasoned vinegar",
        "quantity": "12 g (sharp tomato sauce; as sold, weighed grams)"
      }
    ],
    "method": [
      "Cook the rice component in its measured water, oil and salt in a close-fitting saucepan: bring to a simmer, cover on the lowest heat for 12-15 minutes, then rest off the heat for 10 minutes. Do not drain. Divide the complete cooked rice equally.",
      "Split and flatten chicken to two 1.5 cm cutlets. Season with cutlet salt and pepper. Set out the measured flour, beaten egg and coarse dry crumbs. Coat each cutlet in that order.",
      "Make the slaw from finely shredded cabbage and carrot, vinegar, sugar and sesame oil. Simmer the tomato sauce ingredients for 3-4 minutes until glossy. This is a specified homemade sharp-sweet sauce, not an unquantified bottled katsu sauce.",
      "Heat the measured frying oil in a close-fitting non-stick pan over medium heat. Fry the cutlets for 4-6 minutes per side, adjusting heat so crumbs brown without burning; check the poultry safety endpoint.",
      "For the input calculation all coating and oil are counted. Do not pour unused raw egg/flour onto the plated food. Weigh uneaten coating/oil during the cooking trial before claiming consumed rather than input nutrients. Slice cutlets and serve half the rice, slaw and sauce each.",
      "Cook poultry, minced meats and mixed meat fillings to a clean-probe centre temperature of 75 C for at least 30 seconds. Cook fish and pork safely throughout; times alone do not establish doneness. Do not wash raw poultry. Fully set eggs. Source: https://www.food.gov.uk/safety-hygiene/cooking-your-food"
    ],
    "nutrition": {
      "calories": "977 kcal",
      "protein": "51.8 g",
      "carbohydrates": "?",
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
    "nutritionIncomplete": [
      "carbohydrates"
    ],
    "nutritionSourceNote": "Ingredient-input estimates with nutrient-specific supplements and explicit unknowns. CoFID carbohydrate expressed as monosaccharides; alternatives not mixed into totals. See evidence/L059/summary.json.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 2
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
    "description": "Pear-onion marinated thin beef, a quick sear and individual lettuce wraps preserve bulgogi character.",
    "cookingTime": "65 minutes elapsed (development timing)",
    "calories": "825 kcal",
    "protein": "42.8 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Beef sirloin, lean and edible fat",
        "shoppingItem": "Beef sirloin, lean and edible fat",
        "quantity": "300 g (bulgogi; raw edible input)"
      },
      {
        "item": "Nashi pear, flesh and skin",
        "shoppingItem": "Nashi pear, flesh and skin",
        "quantity": "80 g (bulgogi; raw edible input)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "70 g (bulgogi; raw edible input)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "12 g (bulgogi; raw edible input)"
      },
      {
        "item": "Fresh ginger",
        "shoppingItem": "Fresh ginger",
        "quantity": "8 g (bulgogi; raw edible input)"
      },
      {
        "item": "Soy sauce",
        "shoppingItem": "Soy sauce",
        "quantity": "24 g (bulgogi; as sold, weighed grams)"
      },
      {
        "item": "White sugar",
        "shoppingItem": "White sugar",
        "quantity": "16 g (bulgogi; dry)"
      },
      {
        "item": "Sesame oil",
        "shoppingItem": "Sesame oil",
        "quantity": "18 g (bulgogi; as sold, weighed grams)"
      },
      {
        "item": "Spring onion, bulbs and green tops",
        "shoppingItem": "Spring onion, bulbs and green tops",
        "quantity": "25 g (bulgogi; raw edible input)"
      },
      {
        "item": "Ground black pepper",
        "shoppingItem": "Ground black pepper",
        "quantity": "0.5 g (bulgogi; dry)"
      },
      {
        "item": "Sesame seeds",
        "shoppingItem": "Sesame seeds",
        "quantity": "8 g (bulgogi; dry)"
      },
      {
        "item": "White basmati rice",
        "shoppingItem": "White basmati rice",
        "quantity": "160 g (rice; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "288 g (rice; weighed recipe water)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "10 g (rice; as sold, weighed grams)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.6 g (rice; dry)"
      },
      {
        "item": "Lettuce",
        "shoppingItem": "Lettuce",
        "quantity": "160 g (cups; raw edible input)"
      },
      {
        "item": "Cucumber",
        "shoppingItem": "Cucumber",
        "quantity": "120 g (cups; raw edible input)"
      }
    ],
    "method": [
      "Chill beef briefly until firm and slice across the grain 2-3 mm thick. Grate pear and onion; mix with garlic, ginger, soy, sugar, sesame oil and pepper. Marinate beef refrigerated for 30 minutes.",
      "Cook the rice component in its measured water, oil and salt in a close-fitting saucepan: bring to a simmer, cover on the lowest heat for 12-15 minutes, then rest off the heat for 10 minutes. Do not drain. Divide the complete cooked rice equally.",
      "Separate washed lettuce leaves, pat dry and cut cucumber into fine batons. Heat a broad non-stick pan until hot. Lift beef into two batches, searing 1-2 minutes per side; cook the collected marinade separately until bubbling and safely cooked.",
      "Return beef and sliced spring onion to the reduced marinade briefly, then scatter sesame. Serve half the beef, all cooked juices and rice with half the lettuce and cucumber each, building small cups at the table.",
      "Cook poultry, minced meats and mixed meat fillings to a clean-probe centre temperature of 75 C for at least 30 seconds. Cook fish and pork safely throughout; times alone do not establish doneness. Do not wash raw poultry. Fully set eggs. Source: https://www.food.gov.uk/safety-hygiene/cooking-your-food"
    ],
    "nutrition": {
      "calories": "825 kcal",
      "protein": "42.8 g",
      "carbohydrates": "?",
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
    "nutritionIncomplete": [
      "carbohydrates"
    ],
    "nutritionSourceNote": "Ingredient-input estimates with nutrient-specific supplements and explicit unknowns. CoFID carbohydrate expressed as monosaccharides; alternatives not mixed into totals. See evidence/L060/summary.json.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 2
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
    "description": "Lemongrass-charred chicken and a lime-fish-sauce herb dressing keep this salad bright, without peanut sauce.",
    "cookingTime": "65 minutes elapsed (development timing)",
    "calories": "691 kcal",
    "protein": "39.0 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Skinless boneless chicken thigh",
        "shoppingItem": "Skinless boneless chicken thigh",
        "quantity": "300 g (chicken; raw edible input)"
      },
      {
        "item": "Tender lemongrass core",
        "shoppingItem": "Tender lemongrass core",
        "quantity": "20 g (chicken; raw edible core finely minced)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "8 g (chicken; raw edible input)"
      },
      {
        "item": "Fish sauce",
        "shoppingItem": "Fish sauce",
        "quantity": "18 g (chicken; as sold, weighed grams)"
      },
      {
        "item": "White sugar",
        "shoppingItem": "White sugar",
        "quantity": "10 g (chicken; dry)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "20 g (chicken; as sold, weighed grams)"
      },
      {
        "item": "Rice noodles",
        "shoppingItem": "Rice noodles",
        "quantity": "160 g (salad; dry)"
      },
      {
        "item": "Cucumber",
        "shoppingItem": "Cucumber",
        "quantity": "120 g (salad; raw edible input)"
      },
      {
        "item": "Carrot",
        "shoppingItem": "Carrot",
        "quantity": "100 g (salad; raw edible input)"
      },
      {
        "item": "Shallot",
        "shoppingItem": "Shallot",
        "quantity": "40 g (salad; raw edible input)"
      },
      {
        "item": "Fresh mint",
        "shoppingItem": "Fresh mint",
        "quantity": "12 g (salad; raw edible leaves)"
      },
      {
        "item": "Fresh coriander leaves",
        "shoppingItem": "Fresh coriander leaves",
        "quantity": "12 g (salad; raw edible input)"
      },
      {
        "item": "Fresh lime juice",
        "shoppingItem": "Fresh lime juice",
        "quantity": "40 g (dressing; freshly squeezed, weighed grams)"
      },
      {
        "item": "Fish sauce",
        "shoppingItem": "Fish sauce",
        "quantity": "12 g (dressing; as sold, weighed grams)"
      },
      {
        "item": "White sugar",
        "shoppingItem": "White sugar",
        "quantity": "14 g (dressing; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "25 g (dressing; weighed recipe water)"
      },
      {
        "item": "Fresh red chilli flesh",
        "shoppingItem": "Fresh red chilli flesh",
        "quantity": "5 g (dressing; raw edible input)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "10 g (dressing; as sold, weighed grams)"
      }
    ],
    "method": [
      "Remove tough lemongrass layers before weighing the tender core. Mince extremely finely with garlic, then mix with the chicken fish sauce, sugar and oil. Flatten thigh pieces and marinate refrigerated for 30 minutes.",
      "Soak or cook rice noodles in 1500 g boiling process water according to their width, about 3-6 minutes; drain and cool. No leaching reduction is applied to the dry noodle input estimate.",
      "Cut cucumber and carrot into fine batons and thinly slice shallot. Mix every dressing ingredient until sugar dissolves. Tear mint and coriander leaves.",
      "Griddle chicken over medium-high heat for 6-8 minutes per side until the poultry endpoint is met. Simmer all leftover marinade and collected chicken juices to a safe bubbling finish.",
      "Slice chicken. Toss noodles, vegetables and herbs with the complete dressing; top with chicken and cooked marinade. Serve half the whole salad each. Thai-style lime, chilli and fish-sauce dressing is distinct from Indonesian peanut-tamarind satay.",
      "Cook poultry, minced meats and mixed meat fillings to a clean-probe centre temperature of 75 C for at least 30 seconds. Cook fish and pork safely throughout; times alone do not establish doneness. Do not wash raw poultry. Fully set eggs. Source: https://www.food.gov.uk/safety-hygiene/cooking-your-food"
    ],
    "nutrition": {
      "calories": "691 kcal",
      "protein": "39.0 g",
      "carbohydrates": "?",
      "fat": "20.4 g",
      "fibre": "?",
      "sodium": "1482 mg",
      "potassium": "1048 mg",
      "phosphate": "347 mg",
      "salt": "3.70 g"
    },
    "potassium": "Pending review",
    "phosphate": "Pending review",
    "purines": "Pending review",
    "dietaryNote": "Development estimate requiring individual whole-day review; see guide dossier. No universal stage or dialysis suitability claim.",
    "nutritionBasis": "CoFID ingredient-input estimate",
    "nutritionIncomplete": [
      "carbohydrates",
      "fibre"
    ],
    "nutritionSourceNote": "Ingredient-input estimates with nutrient-specific supplements and explicit unknowns. CoFID carbohydrate expressed as monosaccharides; alternatives not mixed into totals. See evidence/L061/summary.json.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 2
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
    "description": "Crusty baguette, fresh carrot-mooli pickle and coriander provide the banh mi structure; chicken adaptation omits pate rather than claiming a canonical pork sandwich.",
    "cookingTime": "65 minutes elapsed (development timing)",
    "calories": "770 kcal",
    "protein": "42.6 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Skinless boneless chicken thigh",
        "shoppingItem": "Skinless boneless chicken thigh",
        "quantity": "280 g (chicken; raw edible input)"
      },
      {
        "item": "Tender lemongrass core",
        "shoppingItem": "Tender lemongrass core",
        "quantity": "15 g (chicken; raw edible core finely minced)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "8 g (chicken; raw edible input)"
      },
      {
        "item": "Soy sauce",
        "shoppingItem": "Soy sauce",
        "quantity": "14 g (chicken; as sold, weighed grams)"
      },
      {
        "item": "Fish sauce",
        "shoppingItem": "Fish sauce",
        "quantity": "10 g (chicken; as sold, weighed grams)"
      },
      {
        "item": "White sugar",
        "shoppingItem": "White sugar",
        "quantity": "8 g (chicken; dry)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "18 g (chicken; as sold, weighed grams)"
      },
      {
        "item": "Carrot",
        "shoppingItem": "Carrot",
        "quantity": "100 g (quick pickle; raw edible input)"
      },
      {
        "item": "Daikon/mooli radish",
        "shoppingItem": "Daikon/mooli radish",
        "quantity": "100 g (quick pickle; raw edible input)"
      },
      {
        "item": "Plain unseasoned vinegar",
        "shoppingItem": "Plain unseasoned vinegar",
        "quantity": "35 g (quick pickle; as sold, weighed grams)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "25 g (quick pickle; weighed recipe water)"
      },
      {
        "item": "White sugar",
        "shoppingItem": "White sugar",
        "quantity": "15 g (quick pickle; dry)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.5 g (quick pickle; dry)"
      },
      {
        "item": "White baguette",
        "shoppingItem": "White baguette",
        "quantity": "240 g (sandwich; as sold)"
      },
      {
        "item": "Standard mayonnaise",
        "shoppingItem": "Standard mayonnaise",
        "quantity": "35 g (sandwich; as sold)"
      },
      {
        "item": "Cucumber",
        "shoppingItem": "Cucumber",
        "quantity": "100 g (sandwich; raw edible input)"
      },
      {
        "item": "Fresh coriander leaves",
        "shoppingItem": "Fresh coriander leaves",
        "quantity": "14 g (sandwich; raw edible input)"
      },
      {
        "item": "Fresh red chilli flesh",
        "shoppingItem": "Fresh red chilli flesh",
        "quantity": "4 g (sandwich; raw edible input)"
      }
    ],
    "method": [
      "Finely mince the tender lemongrass core and garlic. Combine chicken marinade ingredients and refrigerate flattened thigh meat in them for 30 minutes.",
      "Julienne carrot and mooli. Toss with the pickle vinegar, water, sugar and salt in a shallow bowl for 30 minutes. This is a small fresh pickle salad, not a preserved jar. Reserve all its liquor for serving.",
      "Roast chicken and all marinade in a small rimmed dish at 220 C conventional or 200 C fan for 20-25 minutes, checking the poultry endpoint. Rest 3 minutes and slice; safely simmer any thin juices if needed.",
      "Warm and split baguette into two 120 g portions. Spread mayonnaise inside, then layer cucumber, chicken with cooked juices, pickle vegetables, coriander and finely sliced chilli.",
      "Serve half the pickle liquor as a small side dressing per person so the measured sugar, vinegar and salt remain part of the eaten specification. Omitting or draining it requires a revised nutrition calculation.",
      "Cook poultry, minced meats and mixed meat fillings to a clean-probe centre temperature of 75 C for at least 30 seconds. Cook fish and pork safely throughout; times alone do not establish doneness. Do not wash raw poultry. Fully set eggs. Source: https://www.food.gov.uk/safety-hygiene/cooking-your-food"
    ],
    "nutrition": {
      "calories": "770 kcal",
      "protein": "42.6 g",
      "carbohydrates": "?",
      "fat": "28.9 g",
      "fibre": "?",
      "sodium": "1539 mg",
      "potassium": "1164 mg",
      "phosphate": "331 mg",
      "salt": "3.85 g"
    },
    "potassium": "Pending review",
    "phosphate": "Pending review",
    "purines": "Pending review",
    "dietaryNote": "Development estimate requiring individual whole-day review; see guide dossier. No universal stage or dialysis suitability claim.",
    "nutritionBasis": "CoFID ingredient-input estimate",
    "nutritionIncomplete": [
      "carbohydrates",
      "fibre"
    ],
    "nutritionSourceNote": "Ingredient-input estimates with nutrient-specific supplements and explicit unknowns. CoFID carbohydrate expressed as monosaccharides; alternatives not mixed into totals. See evidence/L062/summary.json.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 2
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
    "description": "Ground peanut-tamarind sauce and coriander-turmeric skewers, presented as a composed noodle salad rather than a claim of one regional satay standard.",
    "cookingTime": "65 minutes elapsed (development timing)",
    "calories": "809 kcal",
    "protein": "50.3 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Skinless boneless chicken breast",
        "shoppingItem": "Skinless boneless chicken breast",
        "quantity": "300 g (satay; raw edible input)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "8 g (satay; raw edible input)"
      },
      {
        "item": "Ground coriander seed",
        "shoppingItem": "Ground coriander seed",
        "quantity": "2 g (satay; dry)"
      },
      {
        "item": "Ground turmeric",
        "shoppingItem": "Ground turmeric",
        "quantity": "1 g (satay; dry)"
      },
      {
        "item": "White sugar",
        "shoppingItem": "White sugar",
        "quantity": "10 g (satay; dry)"
      },
      {
        "item": "Soy sauce",
        "shoppingItem": "Soy sauce",
        "quantity": "16 g (satay; as sold, weighed grams)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "20 g (satay; as sold, weighed grams)"
      },
      {
        "item": "Unsalted shelled peanuts",
        "shoppingItem": "Unsalted shelled peanuts",
        "quantity": "55 g (peanut sauce; raw edible nuts)"
      },
      {
        "item": "Seed-free unsweetened tamarind flesh",
        "shoppingItem": "Seed-free unsweetened tamarind flesh",
        "quantity": "16 g (peanut sauce; edible flesh, no sweetened concentrate)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "100 g (peanut sauce; weighed recipe water)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "5 g (peanut sauce; raw edible input)"
      },
      {
        "item": "White sugar",
        "shoppingItem": "White sugar",
        "quantity": "12 g (peanut sauce; dry)"
      },
      {
        "item": "Pure cayenne chilli powder",
        "shoppingItem": "Pure cayenne chilli powder",
        "quantity": "0.6 g (peanut sauce; dry)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.6 g (peanut sauce; dry)"
      },
      {
        "item": "Rice noodles",
        "shoppingItem": "Rice noodles",
        "quantity": "160 g (noodle salad; dry)"
      },
      {
        "item": "Cucumber",
        "shoppingItem": "Cucumber",
        "quantity": "160 g (noodle salad; raw edible input)"
      },
      {
        "item": "Carrot",
        "shoppingItem": "Carrot",
        "quantity": "100 g (noodle salad; raw edible input)"
      },
      {
        "item": "Fresh lime juice",
        "shoppingItem": "Fresh lime juice",
        "quantity": "25 g (noodle salad; freshly squeezed, weighed grams)"
      },
      {
        "item": "Fresh coriander leaves",
        "shoppingItem": "Fresh coriander leaves",
        "quantity": "15 g (noodle salad; raw edible input)"
      }
    ],
    "method": [
      "Cut chicken into thin strips and mix with all satay marinade ingredients. Refrigerate 30 minutes. Grind unsalted peanuts finely, keeping their fat; no defatting assumption is applied.",
      "Mash seed-free tamarind flesh with 100 g sauce water. Blend with ground peanuts, sauce garlic, sugar, chilli and salt. Simmer 5-7 minutes to a pourable sauce; keep all pulp.",
      "Cook noodles in 1500 g boiling process water according to their packet, drain, and toss with lime, thin cucumber and carrot, and coriander.",
      "Thread chicken onto metal skewers and grill under a hot grill, turning, for 8-12 minutes until safely cooked. Bubble all remaining marinade in the peanut sauce until the poultry safety endpoint is met.",
      "Serve half the skewers, noodles and complete peanut-tamarind sauce each. Peanut sauce, grilled skewers and tamarind distinguish this Indonesian-inspired adaptation from L061.",
      "Cook poultry, minced meats and mixed meat fillings to a clean-probe centre temperature of 75 C for at least 30 seconds. Cook fish and pork safely throughout; times alone do not establish doneness. Do not wash raw poultry. Fully set eggs. Source: https://www.food.gov.uk/safety-hygiene/cooking-your-food"
    ],
    "nutrition": {
      "calories": "809 kcal",
      "protein": "50.3 g",
      "carbohydrates": "?",
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
    "nutritionIncomplete": [
      "carbohydrates"
    ],
    "nutritionSourceNote": "Ingredient-input estimates with nutrient-specific supplements and explicit unknowns. CoFID carbohydrate expressed as monosaccharides; alternatives not mixed into totals. See evidence/L063/summary.json.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 2
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
    "description": "Folded cheese-bound griddled tortillas, not a cold wrap or a sauced baked enchilada.",
    "cookingTime": "45 minutes elapsed (development timing)",
    "calories": "851 kcal",
    "protein": "55.3 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Skinless boneless chicken breast",
        "shoppingItem": "Skinless boneless chicken breast",
        "quantity": "280 g (filling; raw edible input)"
      },
      {
        "item": "Red bell pepper",
        "shoppingItem": "Red bell pepper",
        "quantity": "180 g (filling; raw edible input)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "100 g (filling; raw edible input)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "25 g (filling; as sold, weighed grams)"
      },
      {
        "item": "Ground cumin",
        "shoppingItem": "Ground cumin",
        "quantity": "2 g (filling; dry)"
      },
      {
        "item": "Sweet paprika",
        "shoppingItem": "Sweet paprika",
        "quantity": "2 g (filling; dry)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.8 g (filling; dry)"
      },
      {
        "item": "Fresh lime juice",
        "shoppingItem": "Fresh lime juice",
        "quantity": "20 g (filling; freshly squeezed, weighed grams)"
      },
      {
        "item": "Fresh coriander leaves",
        "shoppingItem": "Fresh coriander leaves",
        "quantity": "12 g (filling; raw edible input)"
      },
      {
        "item": "Soft wheat tortillas",
        "shoppingItem": "Soft wheat tortillas",
        "quantity": "220 g (quesadillas; as sold)"
      },
      {
        "item": "Mature Cheddar",
        "shoppingItem": "Mature Cheddar",
        "quantity": "90 g (quesadillas; as sold)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "10 g (quesadillas; as sold, weighed grams)"
      }
    ],
    "method": [
      "Cut chicken into 1 cm pieces, slice pepper and onion and grate the cheese. Heat 25 g oil in a broad pan and soften pepper and onion for 7 minutes.",
      "Add chicken, cumin, paprika and salt. Cook 8-10 minutes, stirring, until chicken is safely cooked and the filling is fairly dry. Fold in lime and coriander.",
      "Divide filling and cheese between four tortillas, using half of each tortilla as the base, then fold closed. Use all 10 g griddle oil across the four folded tortillas.",
      "Cook in batches over medium-low heat 2-3 minutes each side, pressing gently, until crisp and cheese melts. Serve two folded quesadillas per person with all filling and pan juices.",
      "Cook poultry, minced meats and mixed meat fillings to a clean-probe centre temperature of 75 C for at least 30 seconds. Cook fish and pork safely throughout; times alone do not establish doneness. Do not wash raw poultry. Fully set eggs. Source: https://www.food.gov.uk/safety-hygiene/cooking-your-food"
    ],
    "nutrition": {
      "calories": "851 kcal",
      "protein": "55.3 g",
      "carbohydrates": "?",
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
    "nutritionIncomplete": [
      "carbohydrates"
    ],
    "nutritionSourceNote": "Ingredient-input estimates with nutrient-specific supplements and explicit unknowns. CoFID carbohydrate expressed as monosaccharides; alternatives not mixed into totals. See evidence/L064/summary.json.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 2
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
    "description": "Soft corn tortillas, separately seared fish and creamy lime slaw distinguish tacos from wheat quesadillas and grain plates.",
    "cookingTime": "40 minutes elapsed (development timing)",
    "calories": "588 kcal",
    "protein": "39.2 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Cod fillet, flesh only",
        "shoppingItem": "Cod fillet, flesh only",
        "quantity": "320 g (fish; raw edible input)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "28 g (fish; as sold, weighed grams)"
      },
      {
        "item": "Ground cumin",
        "shoppingItem": "Ground cumin",
        "quantity": "1.5 g (fish; dry)"
      },
      {
        "item": "Sweet paprika",
        "shoppingItem": "Sweet paprika",
        "quantity": "2 g (fish; dry)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "6 g (fish; raw edible input)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.9 g (fish; dry)"
      },
      {
        "item": "Fresh lime juice",
        "shoppingItem": "Fresh lime juice",
        "quantity": "20 g (fish; freshly squeezed, weighed grams)"
      },
      {
        "item": "White cabbage",
        "shoppingItem": "White cabbage",
        "quantity": "180 g (slaw; raw edible input)"
      },
      {
        "item": "Plain whole-milk yoghurt",
        "shoppingItem": "Plain whole-milk yoghurt",
        "quantity": "120 g (slaw; as sold)"
      },
      {
        "item": "Fresh lime juice",
        "shoppingItem": "Fresh lime juice",
        "quantity": "25 g (slaw; freshly squeezed, weighed grams)"
      },
      {
        "item": "Fresh coriander leaves",
        "shoppingItem": "Fresh coriander leaves",
        "quantity": "15 g (slaw; raw edible input)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "40 g (slaw; raw edible input)"
      },
      {
        "item": "Fresh red chilli flesh",
        "shoppingItem": "Fresh red chilli flesh",
        "quantity": "4 g (slaw; raw edible input)"
      },
      {
        "item": "Soft corn tortillas",
        "shoppingItem": "Soft corn tortillas",
        "quantity": "200 g (tacos; as sold)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "8 g (tacos; as sold, weighed grams)"
      }
    ],
    "method": [
      "Shred cabbage and onion finely and toss with yoghurt, slaw lime, coriander and chilli. Do not drain or discard the yoghurt dressing.",
      "Cut cod into large strips and coat with fish oil, cumin, paprika, crushed garlic, salt and fish lime. Heat a non-stick frying pan over medium-high heat.",
      "Sear fish 3-4 minutes on each broad side until cooked through, handling gently. Add any remaining coating to the pan and heat fully; serve all cooked juices.",
      "Brush tortillas with the measured 8 g finish oil, then warm briefly on both sides in a dry second pan. Divide fish and complete slaw between the tortillas and serve half to each person. The tortilla gram allocation is authoritative; piece counts depend on the selected product.",
      "Cook poultry, minced meats and mixed meat fillings to a clean-probe centre temperature of 75 C for at least 30 seconds. Cook fish and pork safely throughout; times alone do not establish doneness. Do not wash raw poultry. Fully set eggs. Source: https://www.food.gov.uk/safety-hygiene/cooking-your-food"
    ],
    "nutrition": {
      "calories": "588 kcal",
      "protein": "39.2 g",
      "carbohydrates": "?",
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
    "nutritionIncomplete": [
      "carbohydrates"
    ],
    "nutritionSourceNote": "Ingredient-input estimates with nutrient-specific supplements and explicit unknowns. CoFID carbohydrate expressed as monosaccharides; alternatives not mixed into totals. See evidence/L065/summary.json.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 2
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
    "description": "Allspice, thyme, Scotch bonnet and spring onion define jerk-style char; domestic oven adaptation retains the full marinade.",
    "cookingTime": "100 minutes elapsed (development timing)",
    "calories": "731 kcal",
    "protein": "42.7 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Skinless boneless chicken thigh",
        "shoppingItem": "Skinless boneless chicken thigh",
        "quantity": "300 g (jerk chicken; raw edible input)"
      },
      {
        "item": "Spring onion, bulbs and green tops",
        "shoppingItem": "Spring onion, bulbs and green tops",
        "quantity": "50 g (jerk chicken; raw edible input)"
      },
      {
        "item": "Fresh ginger",
        "shoppingItem": "Fresh ginger",
        "quantity": "12 g (jerk chicken; raw edible input)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "10 g (jerk chicken; raw edible input)"
      },
      {
        "item": "Ground allspice",
        "shoppingItem": "Ground allspice",
        "quantity": "3 g (jerk chicken; dry)"
      },
      {
        "item": "Dried thyme",
        "shoppingItem": "Dried thyme",
        "quantity": "1.5 g (jerk chicken; dry)"
      },
      {
        "item": "Fresh green chilli flesh",
        "shoppingItem": "Fresh green chilli flesh",
        "quantity": "6 g (jerk chicken; raw edible input)"
      },
      {
        "item": "Fresh lime juice",
        "shoppingItem": "Fresh lime juice",
        "quantity": "30 g (jerk chicken; freshly squeezed, weighed grams)"
      },
      {
        "item": "Plain unseasoned vinegar",
        "shoppingItem": "Plain unseasoned vinegar",
        "quantity": "12 g (jerk chicken; as sold, weighed grams)"
      },
      {
        "item": "White sugar",
        "shoppingItem": "White sugar",
        "quantity": "10 g (jerk chicken; dry)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "25 g (jerk chicken; as sold, weighed grams)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "1 g (jerk chicken; dry)"
      },
      {
        "item": "Plain white flour",
        "shoppingItem": "Plain white flour",
        "quantity": "190 g (flatbread; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "106.4 g (flatbread; weighed recipe water)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "12 g (flatbread; as sold, weighed grams)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.8 g (flatbread; dry)"
      },
      {
        "item": "White cabbage",
        "shoppingItem": "White cabbage",
        "quantity": "140 g (fresh side; raw edible input)"
      },
      {
        "item": "Cucumber",
        "shoppingItem": "Cucumber",
        "quantity": "100 g (fresh side; raw edible input)"
      },
      {
        "item": "Fresh lime juice",
        "shoppingItem": "Fresh lime juice",
        "quantity": "15 g (fresh side; freshly squeezed, weighed grams)"
      }
    ],
    "method": [
      "Use 6 g Scotch bonnet flesh for the chilli specification, remove stem before weighing and handle with care. Blend all jerk seasonings, oil and salt with spring onion, ginger and garlic. Coat chicken and refrigerate 60 minutes.",
      "Mix the flatbread flour, water, oil and salt; knead 5 minutes and cover for 20 minutes. Divide in two, roll on reusable baking paper without extra flour, and cook in a hot dry heavy pan for 2-3 minutes per side until cooked through. Serve one per person.",
      "Roast chicken with all marinade in a rimmed dish at 220 C conventional or 200 C fan for 25-30 minutes, turning once and checking the poultry endpoint. Finish briefly under a hot grill for browned edges without burning the spices.",
      "Shred cabbage, slice cucumber and dress with the 15 g side lime. Slice chicken and divide it with every cooked jerk juice between the flatbreads; serve half the fresh side per person.",
      "Cook poultry, minced meats and mixed meat fillings to a clean-probe centre temperature of 75 C for at least 30 seconds. Cook fish and pork safely throughout; times alone do not establish doneness. Do not wash raw poultry. Fully set eggs. Source: https://www.food.gov.uk/safety-hygiene/cooking-your-food"
    ],
    "nutrition": {
      "calories": "731 kcal",
      "protein": "42.7 g",
      "carbohydrates": "?",
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
    "nutritionIncomplete": [
      "carbohydrates"
    ],
    "nutritionSourceNote": "Ingredient-input estimates with nutrient-specific supplements and explicit unknowns. CoFID carbohydrate expressed as monosaccharides; alternatives not mixed into totals. See evidence/L066/summary.json.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 2
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
    "description": "Nigerian suya-inspired peanut-dry-spice crust differs from wet satay peanut sauce; full-fat peanut adaptation is disclosed.",
    "cookingTime": "65 minutes elapsed (development timing)",
    "calories": "810 kcal",
    "protein": "53.3 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Skinless boneless chicken breast",
        "shoppingItem": "Skinless boneless chicken breast",
        "quantity": "320 g (suya chicken; raw edible input)"
      },
      {
        "item": "Unsalted dry-roasted peanuts",
        "shoppingItem": "Unsalted dry-roasted peanuts",
        "quantity": "40 g (suya chicken; as sold)"
      },
      {
        "item": "Ground ginger",
        "shoppingItem": "Ground ginger",
        "quantity": "3 g (suya chicken; dry)"
      },
      {
        "item": "Sweet paprika",
        "shoppingItem": "Sweet paprika",
        "quantity": "4 g (suya chicken; dry)"
      },
      {
        "item": "Pure cayenne chilli powder",
        "shoppingItem": "Pure cayenne chilli powder",
        "quantity": "1 g (suya chicken; dry)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "8 g (suya chicken; raw edible input)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "25 g (suya chicken; as sold, weighed grams)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "1 g (suya chicken; dry)"
      },
      {
        "item": "Plain white flour",
        "shoppingItem": "Plain white flour",
        "quantity": "180 g (flatbread; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "100.80000000000001 g (flatbread; weighed recipe water)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "12 g (flatbread; as sold, weighed grams)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.8 g (flatbread; dry)"
      },
      {
        "item": "Fresh tomato",
        "shoppingItem": "Fresh tomato",
        "quantity": "180 g (side; raw edible input)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "60 g (side; raw edible input)"
      },
      {
        "item": "Fresh lime juice",
        "shoppingItem": "Fresh lime juice",
        "quantity": "20 g (side; freshly squeezed, weighed grams)"
      }
    ],
    "method": [
      "Grind unsalted dry-roasted peanuts into a coarse powder before adding the ginger powder, paprika, cayenne and salt. This uses full-fat ground peanuts, not defatted kuli-kuli; its fat remains counted.",
      "Slice chicken across the grain into 1 cm strips. Rub with garlic, oil and the entire measured peanut spice blend. Thread onto metal skewers and refrigerate 20 minutes.",
      "Mix the flatbread flour, water, oil and salt; knead 5 minutes and cover for 20 minutes. Divide in two, roll on reusable baking paper without extra flour, and cook in a hot dry heavy pan for 2-3 minutes per side until cooked through. Serve one per person.",
      "Grill skewers over medium-high heat for 10-14 minutes, turning frequently, until chicken is safely cooked and peanut coating is toasted rather than scorched. Safely cook and serve any raw-contact coating left in the bowl.",
      "Slice tomato and onion, dress with lime and serve half the skewers, complete coating, flatbread and salad each.",
      "Cook poultry, minced meats and mixed meat fillings to a clean-probe centre temperature of 75 C for at least 30 seconds. Cook fish and pork safely throughout; times alone do not establish doneness. Do not wash raw poultry. Fully set eggs. Source: https://www.food.gov.uk/safety-hygiene/cooking-your-food"
    ],
    "nutrition": {
      "calories": "810 kcal",
      "protein": "53.3 g",
      "carbohydrates": "?",
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
    "nutritionIncomplete": [
      "carbohydrates"
    ],
    "nutritionSourceNote": "Ingredient-input estimates with nutrient-specific supplements and explicit unknowns. CoFID carbohydrate expressed as monosaccharides; alternatives not mixed into totals. See evidence/L067/summary.json.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 2
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
    "description": "Ghanaian ginger-spiced ripe plantain is the centre of the bowl; chicken is the accompaniment.",
    "cookingTime": "55 minutes elapsed (development timing)",
    "calories": "731 kcal",
    "protein": "35.9 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Ripe plantain flesh",
        "shoppingItem": "Ripe plantain flesh",
        "quantity": "460 g (plantain; raw ripe flesh)"
      },
      {
        "item": "Fresh ginger",
        "shoppingItem": "Fresh ginger",
        "quantity": "14 g (plantain; raw edible input)"
      },
      {
        "item": "Pure cayenne chilli powder",
        "shoppingItem": "Pure cayenne chilli powder",
        "quantity": "0.6 g (plantain; dry)"
      },
      {
        "item": "Ground cloves",
        "shoppingItem": "Ground cloves",
        "quantity": "0.2 g (plantain; dry)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "40 g (plantain; as sold, weighed grams)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.8 g (plantain; dry)"
      },
      {
        "item": "Skinless boneless chicken thigh",
        "shoppingItem": "Skinless boneless chicken thigh",
        "quantity": "300 g (chicken; raw edible input)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "100 g (chicken; raw edible input)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "8 g (chicken; raw edible input)"
      },
      {
        "item": "Fresh ginger",
        "shoppingItem": "Fresh ginger",
        "quantity": "8 g (chicken; raw edible input)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "15 g (chicken; as sold, weighed grams)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.7 g (chicken; dry)"
      },
      {
        "item": "Fresh tomato",
        "shoppingItem": "Fresh tomato",
        "quantity": "140 g (finish; raw edible input)"
      },
      {
        "item": "Fresh lime juice",
        "shoppingItem": "Fresh lime juice",
        "quantity": "25 g (finish; freshly squeezed, weighed grams)"
      },
      {
        "item": "Fresh coriander leaves",
        "shoppingItem": "Fresh coriander leaves",
        "quantity": "12 g (finish; raw edible input)"
      }
    ],
    "method": [
      "Choose ripe yellow plantain with black speckles. Peel before weighing 460 g flesh and cut into 2 cm cubes. Toss with grated ginger, cayenne, cloves, 40 g oil and plantain salt.",
      "Roast plantain in a single layer at 220 C conventional or 200 C fan for 25-35 minutes, turning twice, until golden outside and soft inside. This measured-oil roast is a disclosed adaptation of fried kelewele.",
      "Flatten thigh meat, coat with chicken garlic, ginger, oil and salt, and griddle with onion wedges for 15-20 minutes until the poultry endpoint is met. Bubble all collected chicken juices safely.",
      "Chop tomato and coriander with lime. Divide all roasted plantain, chicken, onion, juices and fresh finish between two bowls. Do not replace plantain with banana or assume the green-plantain CoFID entry measures the ripe ingredient.",
      "Cook poultry, minced meats and mixed meat fillings to a clean-probe centre temperature of 75 C for at least 30 seconds. Cook fish and pork safely throughout; times alone do not establish doneness. Do not wash raw poultry. Fully set eggs. Source: https://www.food.gov.uk/safety-hygiene/cooking-your-food"
    ],
    "nutrition": {
      "calories": "731 kcal",
      "protein": "35.9 g",
      "carbohydrates": "?",
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
    "nutritionIncomplete": [
      "carbohydrates"
    ],
    "nutritionSourceNote": "Ingredient-input estimates with nutrient-specific supplements and explicit unknowns. CoFID carbohydrate expressed as monosaccharides; alternatives not mixed into totals. See evidence/L068/summary.json.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 2
  }
];
