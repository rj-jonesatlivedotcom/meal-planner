import type { Recipe } from "./types";

export const dinners: Recipe[] = [
{
    id: "lemon-herb-chicken-rice",
    code: "D001", mealFamily: "rice-dish",
    category: "Dinner",
    emoji: "🍋",
    image: "/images/recipes/D001.png",
    name: "Lemon & Herb Chicken with Rice",
    description: "Tender grilled chicken with basmati rice, soft white cabbage and onion, finished with lemon and parsley.",
    cookingTime: "30 minutes",
    calories: "584 kcal",
    protein: "30.9 g",
    equipment: "Saucepan, frying pan, colander, knife, chopping board",
    ingredients: [
      {
        item: "Chicken, breast, grilled without skin, meat only",
        shoppingItem: "Chicken breast",
        quantity: "70 g"
      },
      {
        item: "Rice, white, basmati, raw",
        shoppingItem: "Basmati rice",
        quantity: "90 g"
      },
      {
        item: "Cabbage, white, boiled in unsalted water",
        shoppingItem: "Cabbage",
        quantity: "¼ cabbage (100 g)"
      },
      {
        item: "Onions, boiled in unsalted water",
        shoppingItem: "Onions",
        quantity: "½ onion (50 g)"
      },
      {
        item: "Oil, olive",
        shoppingItem: "Olive oil",
        quantity: "15 g"
      },
      {
        item: "Lemon juice, fresh",
        shoppingItem: "Lemon juice",
        quantity: "1 tbsp"
      },
      {
        item: "Parsley, dried",
        shoppingItem: "Dried parsley",
        quantity: "¼ tsp"
      }
    ],
    method: [
      "Cook the basmati rice according to the packet instructions using unsalted water.",
      "Boil the cabbage and onion in unsalted water until tender, then drain well.",
      "Brush the chicken with a little of the olive oil and grill in a hot frying pan until cooked through.",
      "Add the remaining olive oil, lemon juice and dried parsley to the cooked vegetables and toss gently.",
      "Serve the chicken with the rice and vegetables."
    ],
    nutrition: {
      calories: "584 kcal",
      protein: "30.9 g",
      carbohydrates: "81.5 g",
      fat: "17.2 g",
      fibre: "4 g",
      sodium: "46 mg",
      salt: "0.11 g",
      potassium: "624 mg",
      phosphate: "339 mg"
    },
    potassium: "High",
    phosphate: "High",
    purines: "Moderate",
    dietaryNote: "The meal uses a modest chicken portion with rice and lower-potassium vegetables. Chicken contributes protein and phosphate.",
    fluidMl: 15, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1
  ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,},
{
    id: "turkey-rosemary-rice",
    code: "D002", mealFamily: "rice-dish",
    category: "Dinner",
    emoji: "🌿",
    image: "/images/recipes/D002.png",
    name: "Rosemary Turkey with Rice & Vegetables",
    description: "Lean grilled turkey with basmati rice, cabbage and carrots, gently flavoured with rosemary.",
    cookingTime: "30 minutes",
    calories: "606 kcal",
    protein: "30.0 g",
    equipment: "Saucepan, frying pan, colander, knife, chopping board",
    ingredients: [
      {
        item: "Turkey, breast, fillet, grilled, meat only",
        shoppingItem: "Turkey breast",
        quantity: "60 g"
      },
      {
        item: "Rice, white, basmati, raw",
        shoppingItem: "Basmati rice",
        quantity: "100 g"
      },
      {
        item: "Cabbage, white, boiled in unsalted water",
        shoppingItem: "Cabbage",
        quantity: "¼ cabbage (75 g)"
      },
      {
        item: "Carrots, old, boiled in unsalted water",
        shoppingItem: "Carrots",
        quantity: "1 carrot (50 g)"
      },
      {
        item: "Oil, olive",
        shoppingItem: "Olive oil",
        quantity: "15 g"
      },
      {
        item: "Rosemary, dried",
        shoppingItem: "Dried rosemary",
        quantity: "¼ tsp"
      }
    ],
    method: [
      "Cook the basmati rice according to the packet instructions using unsalted water.",
      "Boil the cabbage and carrots in unsalted water until tender, then drain.",
      "Rub the turkey with the dried rosemary.",
      "Heat half the olive oil in a frying pan and cook the turkey until browned and cooked through.",
      "Toss the vegetables with the remaining olive oil and serve with the turkey and rice."
    ],
    nutrition: {
      calories: "606 kcal",
      protein: "30.0 g",
      carbohydrates: "89.2 g",
      fat: "16.8 g",
      fibre: "5 g",
      sodium: "73 mg",
      salt: "0.18 g",
      potassium: "608 mg",
      phosphate: "351 mg"
    },
    potassium: "Moderate",
    phosphate: "High",
    purines: "Low",
    dietaryNote: "Turkey provides concentrated protein while rice and the vegetable portions provide the main carbohydrate and fibre. Turkey contributes protein and phosphate.",
    fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1
  ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,},
{
    id: "pork-herb-rice",
    code: "D003", mealFamily: "rice-dish",
    category: "Dinner",
    emoji: "🥕",
    image: "/images/recipes/D003.png",
    name: "Herb-Grilled Pork with Rice & Vegetables",
    description: "Lean grilled pork loin served with basmati rice, carrots and cabbage with a light thyme dressing.",
    cookingTime: "30 minutes",
    calories: "672 kcal",
    protein: "37.2 g",
    equipment: "Saucepan, frying pan, colander, knife, chopping board",
    ingredients: [
      {
        item: "Pork, loin chops, grilled, lean",
        shoppingItem: "Lean pork loin",
        quantity: "80 g"
      },
      {
        item: "Rice, white, basmati, raw",
        shoppingItem: "Basmati rice",
        quantity: "100 g"
      },
      {
        item: "Carrots, old, boiled in unsalted water",
        shoppingItem: "Carrots",
        quantity: "1 carrot (50 g)"
      },
      {
        item: "Cabbage, white, boiled in unsalted water",
        shoppingItem: "Cabbage",
        quantity: "¼ cabbage (100 g)"
      },
      {
        item: "Oil, olive",
        shoppingItem: "Olive oil",
        quantity: "15 g"
      },
      {
        item: "Thyme, dried, ground",
        shoppingItem: "Dried thyme",
        quantity: "¼ tsp"
      }
    ],
    method: [
      "Cook the basmati rice according to the packet instructions using unsalted water.",
      "Boil the carrots and cabbage in unsalted water until tender, then drain well.",
      "Season the pork with the dried thyme.",
      "Heat half the olive oil in a frying pan and grill the pork until cooked through.",
      "Toss the vegetables with the remaining olive oil and serve with the pork and rice."
    ],
    nutrition: {
      calories: "672 kcal",
      protein: "37.2 g",
      carbohydrates: "90.0 g",
      fat: "20.6 g",
      fibre: "5 g",
      sodium: "66 mg",
      salt: "0.17 g",
      potassium: "679 mg",
      phosphate: "337 mg"
    },
    potassium: "High",
    phosphate: "High",
    purines: "Moderate",
    dietaryNote: "Lean pork provides useful protein. Pork contributes phosphate and purines, while the rice and vegetables form the lower-potassium carbohydrate base.",
    fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1
  ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,},
{
    id: "lemon-cod-rice",
    code: "D004", mealFamily: "rice-dish",
    category: "Dinner",
    emoji: "🐟",
    image: "/images/recipes/D004.png",
    name: "Lemon Cod with Rice & Cabbage",
    description: "Oven-baked cod with fluffy basmati rice, cabbage and onion, finished with fresh lemon and parsley.",
    cookingTime: "30 minutes",
    calories: "661 kcal",
    protein: "33.2 g",
    equipment: "Oven, baking tray, saucepan, colander, knife",
    ingredients: [
      {
        item: "Cod, flesh only, baked",
        shoppingItem: "Cod fillet",
        quantity: "100 g"
      },
      {
        item: "Rice, white, basmati, raw",
        shoppingItem: "Basmati rice",
        quantity: "100 g"
      },
      {
        item: "Cabbage, white, boiled in unsalted water",
        shoppingItem: "Cabbage",
        quantity: "¼ cabbage (100 g)"
      },
      {
        item: "Onions, boiled in unsalted water",
        shoppingItem: "Onions",
        quantity: "½ onion (50 g)"
      },
      {
        item: "Oil, olive",
        shoppingItem: "Olive oil",
        quantity: "20 g"
      },
      {
        item: "Lemon juice, fresh",
        shoppingItem: "Lemon juice",
        quantity: "1 tbsp"
      },
      {
        item: "Parsley, dried",
        shoppingItem: "Dried parsley",
        quantity: "¼ tsp"
      }
    ],
    method: [
      "Preheat the oven to 200°C (180°C fan).",
      "Place the cod on a baking tray and bake until cooked through and opaque.",
      "Cook the basmati rice according to the packet instructions using unsalted water.",
      "Boil the cabbage and onion in unsalted water until tender, then drain.",
      "Drizzle the olive oil and lemon juice over the vegetables and finish with dried parsley.",
      "Serve the cod with the rice and vegetables."
    ],
    nutrition: {
      calories: "661 kcal",
      protein: "33.2 g",
      carbohydrates: "89.9 g",
      fat: "21.2 g",
      fibre: "4 g",
      sodium: "98 mg",
      salt: "0.25 g",
      potassium: "677 mg",
      phosphate: "321 mg"
    },
    potassium: "High",
    phosphate: "High",
    purines: "Low",
    dietaryNote: "Cod provides useful protein with a relatively lean fat profile. Fish contributes phosphate and purines, while rice and cabbage provide the main carbohydrate and fibre.",
    fluidMl: 15, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1
  ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,},
{
    id: "lemon-salmon-rice",
    code: "D005", mealFamily: "rice-dish",
    category: "Dinner",
    emoji: "🍋",
    image: "/images/recipes/D005.png",
    name: "Lemon Salmon with Rice & Cabbage",
    description: "Baked salmon with basmati rice, soft cabbage and onion, brightened with fresh lemon.",
    cookingTime: "30 minutes",
    calories: "656 kcal",
    protein: "29.5 g",
    equipment: "Oven, baking tray, saucepan, colander, knife",
    ingredients: [
      {
        item: "Salmon, farmed, flesh only, baked",
        shoppingItem: "Salmon fillet",
        quantity: "80 g"
      },
      {
        item: "Rice, white, basmati, raw",
        shoppingItem: "Basmati rice",
        quantity: "100 g"
      },
      {
        item: "Cabbage, white, boiled in unsalted water",
        shoppingItem: "Cabbage",
        quantity: "¼ cabbage (100 g)"
      },
      {
        item: "Onions, boiled in unsalted water",
        shoppingItem: "Onions",
        quantity: "½ onion (50 g)"
      },
      {
        item: "Oil, olive",
        shoppingItem: "Olive oil",
        quantity: "10 g"
      },
      {
        item: "Lemon juice, fresh",
        shoppingItem: "Lemon juice",
        quantity: "1 tbsp"
      }
    ],
    method: [
      "Preheat the oven to 200°C (180°C fan).",
      "Place the salmon on a baking tray and bake until cooked through.",
      "Cook the basmati rice according to the packet instructions using unsalted water.",
      "Boil the cabbage and onion in unsalted water until tender, then drain.",
      "Toss the vegetables with the olive oil and lemon juice.",
      "Serve the salmon with the rice and vegetables."
    ],
    nutrition: {
      calories: "656 kcal",
      protein: "29.5 g",
      carbohydrates: "89.8 g",
      fat: "22.4 g",
      fibre: "4 g",
      sodium: "46 mg",
      salt: "0.12 g",
      potassium: "635 mg",
      phosphate: "341 mg"
    },
    potassium: "Moderate",
    phosphate: "High",
    purines: "Moderate",
    dietaryNote: "Salmon provides useful protein and fat but is an oily fish and therefore classified as higher in purines. The rice and cabbage keep the meal centred on lower-potassium foods.",
    fluidMl: 15, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1
  ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,},
{
    id: "beef-paprika-rice",
    code: "D006", mealFamily: "rice-dish",
    category: "Dinner",
    emoji: "🥩",
    image: "/images/recipes/D006.png",
    name: "Paprika Beef with Rice & Cabbage",
    description: "Lean minced beef gently cooked with paprika and onion, served with basmati rice and soft cabbage.",
    cookingTime: "30 minutes",
    calories: "601 kcal",
    protein: "31.2 g",
    equipment: "Saucepan, frying pan, colander, wooden spoon, knife",
    ingredients: [
      {
        item: "Beef mince (5% fat), raw",
        shoppingItem: "Beef mince (5% fat)",
        quantity: "100 g"
      },
      {
        item: "Rice, white, basmati, raw",
        shoppingItem: "Basmati rice",
        quantity: "100 g"
      },
      {
        item: "Cabbage, white, boiled in unsalted water",
        shoppingItem: "Cabbage",
        quantity: "¼ cabbage (100 g)"
      },
      {
        item: "Onions, boiled in unsalted water",
        shoppingItem: "Onions",
        quantity: "½ onion (50 g)"
      },
      {
        item: "Oil, olive",
        shoppingItem: "Olive oil",
        quantity: "10 g"
      },
      {
        item: "Paprika",
        shoppingItem: "Paprika",
        quantity: "¼ tsp"
      }
    ],
    method: [
      "Cook the basmati rice according to the packet instructions using unsalted water.",
      "Boil the cabbage and onion in unsalted water until tender, then drain.",
      "Heat the olive oil in a frying pan over a medium heat.",
      "Add the beef and paprika and cook, breaking the mince apart, until browned and cooked through.",
      "Serve the beef with the rice and vegetables."
    ],
    nutrition: {
      calories: "601 kcal",
      protein: "31.2 g",
      carbohydrates: "89.6 g",
      fat: "15 g",
      fibre: "5 g",
      sodium: "97 mg",
      salt: "0.24 g",
      potassium: "587 mg",
      phosphate: "312 mg"
    },
    potassium: "Moderate",
    phosphate: "High",
    purines: "Moderate",
    dietaryNote: "Extra-lean beef keeps the fat content controlled while providing substantial protein. Beef contributes protein and phosphate.",
    fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1
  ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.095450 g per serving, 0.1064% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors. Owner-approved source assumptions D5 are documented in the 16 October 2026 reconciliation workbook. Nominal 5% beef mince uses the approved extra-lean CoFID proxy at its actual 4.2 g fat per 100 g.",},
{
    id: "egg-cheddar-pasta-cabbage",
    code: "D007", mealFamily: "hot-pasta",
    category: "Dinner",
    emoji: "🍝",
    image: "/images/recipes/D007.png",
    name: "Creamy Egg & Cheddar Pasta with Cabbage",
    description: "White pasta tossed with boiled egg, mature cheddar and tender cabbage for a filling meat-free dinner.",
    cookingTime: "25 minutes",
    calories: "591 kcal",
    protein: "29.1 g",
    equipment: "Saucepan, colander, frying pan, knife",
    ingredients: [
      {
        item: "Eggs, chicken, whole, boiled",
        shoppingItem: "Eggs",
        quantity: "2"
      },
      {
        item: "Pasta, white, dried, raw",
        shoppingItem: "White pasta",
        quantity: "80 g"
      },
      {
        item: "Cabbage, white, boiled in unsalted water",
        shoppingItem: "Cabbage",
        quantity: "¼ cabbage (100 g)"
      },
      {
        item: "Butter, unsalted",
        shoppingItem: "Unsalted butter",
        quantity: "10 g"
      },
      {
        item: "Cheese, Cheddar, English",
        shoppingItem: "Cheddar cheese",
        quantity: "20 g"
      },
      {
        item: "Parsley, dried",
        shoppingItem: "Dried parsley",
        quantity: "¼ tsp"
      }
    ],
    method: [
      "Cook the pasta according to the packet instructions using unsalted water.",
      "Boil the eggs until cooked through, cool slightly, peel and chop.",
      "Boil the cabbage in unsalted water until tender, then drain well.",
      "Melt the butter in the drained pasta and stir through the cabbage.",
      "Add the chopped egg and grated cheddar and stir gently until the cheese softens.",
      "Finish with dried parsley and serve."
    ],
    nutrition: {
      calories: "591 kcal",
      protein: "29.1 g",
      carbohydrates: "63.8 g",
      fat: "26.2 g",
      fibre: "2 g",
      sodium: "302 mg",
      salt: "0.76 g",
      potassium: "505 mg",
      phosphate: "470 mg"
    },
    potassium: "Moderate",
    phosphate: "High",
    purines: "Low",
    dietaryNote: "Eggs provide a low-purine protein source. Cheddar contributes a substantial amount of phosphate, so the cheese portion is deliberately modest.",
    fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1
  ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,},
{
    id: "chicken-paprika-rice-peppers",
    code: "D008", mealFamily: "rice-dish",
    category: "Dinner",
    emoji: "🌶️",
    image: "/images/recipes/D008.png",
    name: "Paprika Chicken with Rice & Peppers",
    description: "Grilled chicken with basmati rice, green pepper and onion, gently seasoned with paprika.",
    cookingTime: "30 minutes",
    calories: "576 kcal",
    protein: "30.5 g",
    equipment: "Saucepan, frying pan, colander, knife, chopping board",
    ingredients: [
      {
        item: "Chicken, breast, grilled without skin, meat only",
        shoppingItem: "Chicken breast",
        quantity: "70 g"
      },
      {
        item: "Rice, white, basmati, raw",
        shoppingItem: "Basmati rice",
        quantity: "90 g"
      },
      {
        item: "Peppers, capsicum, green, raw",
        shoppingItem: "Green peppers",
        quantity: "1 green pepper (50 g)"
      },
      {
        item: "Onions, boiled in unsalted water",
        shoppingItem: "Onions",
        quantity: "½ onion (50 g)"
      },
      {
        item: "Oil, olive",
        shoppingItem: "Olive oil",
        quantity: "15 g"
      },
      {
        item: "Paprika",
        shoppingItem: "Paprika",
        quantity: "¼ tsp"
      }
    ],
    method: [
      "Cook the basmati rice according to the packet instructions using unsalted water.",
      "Boil the onion in unsalted water until softened, then drain.",
      "Heat half the olive oil in a frying pan and cook the chicken until browned and cooked through.",
      "Add the green pepper and cook gently until softened.",
      "Stir in the paprika and remaining olive oil.",
      "Serve the chicken and vegetables over the rice."
    ],
    nutrition: {
      calories: "576 kcal",
      protein: "30.5 g",
      carbohydrates: "79.3 g",
      fat: "17.3 g",
      fibre: "3 g",
      sodium: "43 mg",
      salt: "0.11 g",
      potassium: "515 mg",
      phosphate: "330 mg"
    },
    potassium: "Moderate",
    phosphate: "High",
    purines: "Moderate",
    dietaryNote: "Chicken provides useful protein while the rice provides the main carbohydrate. The meal avoids salty sauces and uses a modest vegetable portion.",
    fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1
  ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.095450 g per serving, 0.1202% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors.",},
{
    id: "creamy-pork-pasta-cabbage",
    code: "D009", mealFamily: "hot-pasta",
    category: "Dinner",
    emoji: "🍝",
    image: "/images/recipes/D009.png",
    name: "Creamy Pork & Herb Pasta",
    description: "Lean grilled pork with white pasta and cabbage in a light single-cream and thyme sauce.",
    cookingTime: "30 minutes",
    calories: "639 kcal",
    protein: "38.9 g",
    equipment: "Saucepan, colander, frying pan, knife",
    ingredients: [
      {
        item: "Pork, loin chops, grilled, lean",
        shoppingItem: "Lean pork loin",
        quantity: "80 g"
      },
      {
        item: "Pasta, white, dried, raw",
        shoppingItem: "White pasta",
        quantity: "80 g"
      },
      {
        item: "Cabbage, white, boiled in unsalted water",
        shoppingItem: "Cabbage",
        quantity: "¼ cabbage (100 g)"
      },
      {
        item: "Oil, olive",
        shoppingItem: "Olive oil",
        quantity: "15 g"
      },
      {
        item: "Cream, fresh, single",
        shoppingItem: "Single cream",
        quantity: "30 g"
      },
      {
        item: "Thyme, dried, ground",
        shoppingItem: "Dried thyme",
        quantity: "¼ tsp"
      }
    ],
    method: [
      "Cook the pasta according to the packet instructions using unsalted water.",
      "Boil the cabbage in unsalted water until tender, then drain.",
      "Heat the olive oil in a frying pan and cook the pork until cooked through.",
      "Remove the pork and slice thinly.",
      "Add the cream and dried thyme to the pan and warm gently.",
      "Toss the drained pasta and cabbage through the cream sauce and serve with the sliced pork."
    ],
    nutrition: {
      calories: "639 kcal",
      protein: "38.9 g",
      carbohydrates: "64.4 g",
      fat: "26.8 g",
      fibre: "3 g",
      sodium: "61 mg",
      salt: "0.15 g",
      potassium: "736 mg",
      phosphate: "395 mg"
    },
    potassium: "High",
    phosphate: "High",
    purines: "Low",
    dietaryNote: "Lean pork provides substantial protein. Pork contributes phosphate and purines, while the pasta and cabbage provide the main carbohydrate and fibre.",
    fluidMl: 30, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1
  ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,},
{
    id: "egg-cauliflower-rice",
    code: "D010", mealFamily: "rice-bowl",
    category: "Dinner",
    emoji: "🥚",
    image: "/images/recipes/D010.png",
    name: "Egg, Cheddar & Cauliflower Rice Bowl",
    description: "Boiled egg and mature cheddar served with basmati rice and tender cauliflower, finished with parsley.",
    cookingTime: "25 minutes",
    calories: "681 kcal",
    protein: "29.3 g",
    equipment: "Saucepan, colander, knife",
    ingredients: [
      {
        item: "Eggs, chicken, whole, boiled",
        shoppingItem: "Eggs",
        quantity: "2"
      },
      {
        item: "Rice, white, basmati, raw",
        shoppingItem: "Basmati rice",
        quantity: "100 g"
      },
      {
        item: "Cauliflower, boiled in unsalted water",
        shoppingItem: "Cauliflower",
        quantity: "100 g"
      },
      {
        item: "Cheese, Cheddar, English",
        shoppingItem: "Cheddar cheese",
        quantity: "20 g"
      },
      {
        item: "Butter, unsalted",
        shoppingItem: "Unsalted butter",
        quantity: "10 g"
      },
      {
        item: "Parsley, dried",
        shoppingItem: "Dried parsley",
        quantity: "¼ tsp"
      }
    ],
    method: [
      "Cook the basmati rice according to the packet instructions using unsalted water.",
      "Boil the eggs until cooked through, then cool slightly, peel and halve.",
      "Boil the cauliflower in unsalted water until tender, then drain.",
      "Stir the butter through the hot rice.",
      "Serve the rice with the cauliflower and halved eggs.",
      "Finish with grated cheddar and dried parsley."
    ],
    nutrition: {
      calories: "681 kcal",
      protein: "29.3 g",
      carbohydrates: "87.3 g",
      fat: "26.2 g",
      fibre: "3 g",
      sodium: "304 mg",
      salt: "0.76 g",
      potassium: "456 mg",
      phosphate: "455 mg"
    },
    potassium: "Moderate",
    phosphate: "High",
    purines: "Low",
    dietaryNote: "Eggs are a low-purine protein source. The cheddar adds phosphate, so the cheese portion is kept modest. The recipe uses rice and a controlled cauliflower portion as the main accompaniments.",
    fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1
  ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,},
  {
    id: "d011-creamy-chicken-mushroom-rice",
    code: "D011", mealFamily: "rice-dish",
    category: "Dinner",
    emoji: "🍄",
    image: "/images/recipes/D011.png",
    name: "Creamy Chicken & Mushroom Rice",
    description: "Tender chicken and earthy mushrooms folded through fluffy basmati rice in a silky, lightly seasoned cream sauce.",
    cookingTime: "27 minutes",
    calories: "549 kcal",
    protein: "34.0 g",
    equipment: "Saucepan with lid, frying pan, wooden spoon, knife, chopping board",
    ingredients: [
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "100 g" },
      { item: "Basmati rice", shoppingItem: "Basmati rice", quantity: "85 g" },
      { item: "Mushrooms", shoppingItem: "Mushrooms", quantity: "4 mushrooms (80 g)" },
      { item: "Cabbage", shoppingItem: "Cabbage", quantity: "¼ cabbage (80 g)" },
      { item: "Single cream", shoppingItem: "Single cream", quantity: "40 ml" },
      { item: "Olive oil", shoppingItem: "Olive oil", quantity: "1 tsp" },
      { item: "Dried thyme", shoppingItem: "Dried thyme", quantity: "¼ tsp" },
      { item: "Black pepper", shoppingItem: "Black pepper", quantity: "¼ tsp" }
    ],
    method: [
      "00:00 — Cook the basmati rice according to the packet instructions.",
      "05:00 — Slice the mushrooms and chicken into even pieces.",
      "08:00 — Heat the olive oil in a frying pan and cook the chicken until thoroughly cooked.",
      "16:00 — Add the mushrooms and cook until tender.",
      "20:00 — Add the cabbage and cook gently until softened.",
      "23:00 — Stir in the cream, thyme and black pepper and warm through.",
      "27:00 — Fold through the cooked rice and serve."
    ],
    nutrition: {
      calories: "549 kcal", protein: "34.0 g", carbohydrates: "76.2 g", fat: "14.0 g",
      fibre: "5.0 g", sodium: "81 mg", salt: "0.20 g", potassium: "970 mg", phosphate: "435 mg"
    },
    potassium: "Moderate",
    phosphate: "High",
    purines: "Moderate",
    dietaryNote: "Tender chicken and mushrooms create a rich, savoury dinner without relying on a salty sauce.",
    fluidMl: 40, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1,
  
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.222238 g per serving, 0.2909% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors. Owner-approved source assumptions D4 are documented in the 16 October 2026 reconciliation workbook.",},
  {
    id: "turkey-sweetcorn-pasta",
    code: "D012", mealFamily: "hot-pasta",
    category: "Dinner",
    emoji: "🍝",
    image: "/images/recipes/D012.png",
    name: "Turkey & Sweetcorn Pasta",
    description: "Lean turkey and sweetcorn tossed with white pasta in a simple creamy herb sauce.",
    cookingTime: "23 minutes",
    calories: "539 kcal",
    protein: "37.3 g",
    equipment: "Large saucepan, frying pan, colander, wooden spoon, knife, chopping board",
    ingredients: [
      { item: "Turkey breast", shoppingItem: "Turkey breast", quantity: "100 g" },
      { item: "White pasta", shoppingItem: "White pasta", quantity: "75 g" },
      { item: "Sweetcorn", shoppingItem: "Sweetcorn kernels", quantity: "60 g" },
      { item: "Cabbage", shoppingItem: "Cabbage", quantity: "¼ cabbage (80 g)" },
      { item: "Single cream", shoppingItem: "Single cream", quantity: "40 ml" },
      { item: "Olive oil", shoppingItem: "Olive oil", quantity: "1 tsp" },
      { item: "Dried parsley", shoppingItem: "Dried parsley", quantity: "¼ tsp" },
      { item: "Black pepper", shoppingItem: "Black pepper", quantity: "¼ tsp" },
      { item: "Lemon juice", shoppingItem: "Lemon juice", quantity: "1 tbsp" },
    ],
    method: [
      "00:00 — Bring a large saucepan of water to the boil and cook the pasta according to the packet instructions.",
      "03:00 — Cut the turkey into bite-sized pieces.",
      "05:00 — Heat the olive oil in a frying pan and cook the turkey until thoroughly cooked.",
      "09:00 — Add the cabbage and sweetcorn to the pasta pan for the final 4 minutes of cooking.",
      "13:00 — Drain the pasta and vegetables thoroughly.",
      "15:00 — Add the cream, parsley, black pepper and lemon juice to the turkey pan.",
      "18:00 — Heat gently until warmed through.",
      "20:00 — Stir in the drained pasta and vegetables.",
      "23:00 — Cook together for a further 2 minutes, then serve."
    ],
    nutrition: {
      calories: "539 kcal",
      protein: "37.3 g",
      carbohydrates: "66.5 g",
      fat: "15.4 g",
      fibre: "5 g",
      sodium: "70 mg",
      salt: "0.17 g",
      potassium: "945 mg",
      phosphate: "474 mg",
    },
    potassium: "Moderate",
    phosphate: "High",
    purines: "Low",
    dietaryNote: "A lean turkey pasta dish with moderate potassium and phosphate. The measured turkey portion provides substantial protein without adding salt.",
    fluidMl: 55, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1,
  
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.222238 g per serving, 0.3329% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors.",},

  {
    id: "lemon-cod-pasta-peppers",
    code: "D013", mealFamily: "hot-pasta",
    category: "Dinner",
    emoji: "🐟",
    image: "/images/recipes/D013.png",
    name: "Lemon Cod with Pasta & Peppers",
    description: "Flaked baked cod served with white pasta, cabbage and green pepper with fresh lemon.",
    cookingTime: "22 minutes",
    calories: "420 kcal",
    protein: "31.0 g",
    equipment: "Large saucepan, baking tray, colander, wooden spoon, knife, chopping board, Oven",
    ingredients: [
      { item: "Cod fillet", shoppingItem: "Cod fillet", quantity: "120 g" },
      { item: "White pasta", shoppingItem: "White pasta", quantity: "75 g" },
      { item: "Cabbage", shoppingItem: "Cabbage", quantity: "¼ cabbage (80 g)" },
      { item: "Green pepper", shoppingItem: "Green peppers", quantity: "1 green pepper (60 g)" },
      { item: "Olive oil", shoppingItem: "Olive oil", quantity: "1 tsp" },
      { item: "Lemon juice", shoppingItem: "Lemon juice", quantity: "1 tbsp" },
      { item: "Dried parsley", shoppingItem: "Dried parsley", quantity: "¼ tsp" },
      { item: "Black pepper", shoppingItem: "Black pepper", quantity: "¼ tsp" },
    ],
    method: [
      "00:00 — Heat the oven to 200°C.",
      "02:00 — Place the cod on a baking tray and brush with the olive oil.",
      "04:00 — Sprinkle over the parsley and black pepper and bake for 15 minutes.",
      "05:00 — Cook the pasta in a large saucepan according to the packet instructions.",
      "10:00 — Add the cabbage and sliced green pepper for the final 4 minutes.",
      "14:00 — Drain the pasta and vegetables thoroughly.",
      "19:00 — Check the cod is cooked through and flakes easily.",
      "20:00 — Flake the cod into large pieces and place over the pasta and vegetables.",
      "22:00 — Drizzle over the measured lemon juice and serve."
    ],
    nutrition: {
      calories: "420 kcal",
      protein: "31.0 g",
      carbohydrates: "62.4 g",
      fat: "6.8 g",
      fibre: "4 g",
      sodium: "119 mg",
      salt: "0.30 g",
      potassium: "846 mg",
      phosphate: "372 mg",
    },
    potassium: "High",
    phosphate: "High",
    purines: "Moderate",
    dietaryNote: "Cod provides a lean source of protein, while pasta and the measured vegetables provide the carbohydrate and fibre base. No added salt is used.",
    fluidMl: 15, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1,
  
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.222238 g per serving, 0.3551% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors.",},

  {
    id: "chicken-sweetcorn-rice-bowl",
    code: "D014", mealFamily: "rice-bowl",
    category: "Dinner",
    emoji: "🍚",
    image: "/images/recipes/D014.png",
    name: "Chicken & Sweetcorn Rice Bowl",
    description: "Grilled chicken with basmati rice, cabbage, sweetcorn and lemon.",
    cookingTime: "23 minutes",
    calories: "480 kcal",
    protein: "33.3 g",
    equipment: "Saucepan with lid, frying pan, wooden spoon, knife, chopping board",
    ingredients: [
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "100 g" },
      { item: "Basmati rice", shoppingItem: "Basmati rice", quantity: "80 g" },
      { item: "Cabbage", shoppingItem: "Cabbage", quantity: "¼ cabbage (80 g)" },
      { item: "Sweetcorn", shoppingItem: "Sweetcorn kernels", quantity: "50 g" },
      { item: "Olive oil", shoppingItem: "Olive oil", quantity: "1 tsp" },
      { item: "Lemon juice", shoppingItem: "Lemon juice", quantity: "1 tbsp" },
      { item: "Dried thyme", shoppingItem: "Dried thyme", quantity: "¼ tsp" },
      { item: "Black pepper", shoppingItem: "Black pepper", quantity: "¼ tsp" },
    ],
    method: [
      "00:00 — Rinse the rice, place it in a saucepan with the required cooking water and bring to the boil.",
      "03:00 — Reduce the heat, cover and cook according to the rice instructions.",
      "05:00 — Cut the chicken into bite-sized pieces.",
      "06:00 — Heat the olive oil in a frying pan and cook the chicken for 8 minutes until cooked through.",
      "10:00 — Add the cabbage and sweetcorn to the chicken pan and cook for 4 minutes.",
      "17:00 — Check the rice is tender and drain if necessary.",
      "19:00 — Add the thyme, black pepper and lemon juice to the chicken and vegetables.",
      "21:00 — Spoon the rice into a bowl and top with the chicken mixture.",
      "23:00 — Serve immediately."
    ],
    nutrition: {
      calories: "480 kcal",
      protein: "33.3 g",
      carbohydrates: "75.1 g",
      fat: "7.1 g",
      fibre: "4 g",
      sodium: "67 mg",
      salt: "0.17 g",
      potassium: "771 mg",
      phosphate: "369 mg",
    },
    potassium: "Moderate",
    phosphate: "High",
    purines: "Moderate",
    dietaryNote: "A straightforward chicken and rice meal with moderate potassium and high phosphate within the recipe-planning bands.",
    fluidMl: 15, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1,
  
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.222238 g per serving, 0.2949% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors. Owner-approved source assumptions D4 are documented in the 16 October 2026 reconciliation workbook.",},

  {
    id: "turkey-rice-roasted-peppers",
    code: "D015", mealFamily: "rice-dish",
    category: "Dinner",
    emoji: "🍗",
    image: "/images/recipes/D015.png",
    name: "Turkey, Rice & Roasted Peppers",
    description: "Herb-grilled turkey served with basmati rice, cabbage and roasted green pepper.",
    cookingTime: "25 minutes",
    calories: "460 kcal",
    protein: "32.5 g",
    equipment: "Saucepan with lid, baking tray, frying pan, wooden spoon, knife, chopping board, Oven",
    ingredients: [
      { item: "Turkey breast", shoppingItem: "Turkey breast", quantity: "100 g" },
      { item: "Basmati rice", shoppingItem: "Basmati rice", quantity: "80 g" },
      { item: "Green pepper", shoppingItem: "Green peppers", quantity: "1½ green peppers (70 g)" },
      { item: "Cabbage", shoppingItem: "Cabbage", quantity: "¼ cabbage (80 g)" },
      { item: "Olive oil", shoppingItem: "Olive oil", quantity: "1 tsp" },
      { item: "Dried rosemary", shoppingItem: "Dried rosemary", quantity: "¼ tsp" },
      { item: "Lemon juice", shoppingItem: "Lemon juice", quantity: "1 tbsp" },
      { item: "Black pepper", shoppingItem: "Black pepper", quantity: "¼ tsp" },
    ],
    method: [
      "00:00 — Heat the oven to 200°C.",
      "02:00 — Slice the green pepper and place on a baking tray with half the olive oil.",
      "04:00 — Roast the pepper for 15 minutes.",
      "05:00 — Start cooking the basmati rice in a covered saucepan.",
      "08:00 — Cut the turkey into bite-sized pieces.",
      "10:00 — Heat the remaining olive oil in a frying pan and cook the turkey for 8 minutes.",
      "14:00 — Add the cabbage to the turkey pan and cook for 4 minutes.",
      "20:00 — Add rosemary, black pepper and lemon juice to the turkey.",
      "22:00 — Check the rice and drain if required.",
      "25:00 — Serve the rice topped with the turkey, cabbage and roasted pepper."
    ],
    nutrition: {
      calories: "460 kcal",
      protein: "32.5 g",
      carbohydrates: "72.9 g",
      fat: "6.1 g",
      fibre: "4 g",
      sodium: "60 mg",
      salt: "0.15 g",
      potassium: "716 mg",
      phosphate: "347 mg",
    },
    potassium: "High",
    phosphate: "High",
    purines: "Moderate",
    dietaryNote: "Lean turkey is paired with rice and measured lower-potassium vegetables. The recipe contains no added salt.",
    fluidMl: 15, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1,
  
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.222238 g per serving, 0.3039% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors.",},

  {
    id: "pork-apple-rice-bowl",
    code: "D016", mealFamily: "rice-bowl",
    category: "Dinner",
    emoji: "🍎",
    image: "/images/recipes/D016.png",
    name: "Pork & Apple Rice Bowl",
    description: "Tender lean pork with basmati rice, cabbage and warm apple with rosemary.",
    cookingTime: "25 minutes",
    calories: "501 kcal",
    protein: "32.8 g",
    equipment: "Saucepan with lid, frying pan, wooden spoon, knife, chopping board",
    ingredients: [
      { item: "Lean pork loin", shoppingItem: "Lean pork loin", quantity: "100 g" },
      { item: "Basmati rice", shoppingItem: "Basmati rice", quantity: "80 g" },
      { item: "Cabbage", shoppingItem: "Cabbage", quantity: "¼ cabbage (80 g)" },
      { item: "Apple", shoppingItem: "Apples", quantity: "1 apple (80 g)" },
      { item: "Olive oil", shoppingItem: "Olive oil", quantity: "1 tsp" },
      { item: "Dried rosemary", shoppingItem: "Dried rosemary", quantity: "¼ tsp" },
      { item: "Lemon juice", shoppingItem: "Lemon juice", quantity: "1 tbsp" },
      { item: "Black pepper", shoppingItem: "Black pepper", quantity: "¼ tsp" },
    ],
    method: [
      "00:00 — Cook the basmati rice in a covered saucepan according to the packet instructions.",
      "03:00 — Peel, core and dice the apple.",
      "05:00 — Cut the pork into thin strips.",
      "06:00 — Heat the olive oil in a frying pan and cook the pork for 8 minutes until cooked through.",
      "10:00 — Add the cabbage and cook for 4 minutes.",
      "15:00 — Add the diced apple to a second area of the pan with 1 tbsp water.",
      "17:00 — Cook the apple for 3 minutes until just softened.",
      "20:00 — Add rosemary, black pepper and lemon juice to the pork.",
      "23:00 — Check the rice is tender.",
      "25:00 — Spoon the rice into a bowl and top with pork, cabbage and warm apple."
    ],
    nutrition: {
      calories: "501 kcal",
      protein: "32.8 g",
      carbohydrates: "80.4 g",
      fat: "7.4 g",
      fibre: "5 g",
      sodium: "49 mg",
      salt: "0.12 g",
      potassium: "757 mg",
      phosphate: "325 mg",
    },
    potassium: "High",
    phosphate: "High",
    purines: "Moderate",
    dietaryNote: "A balanced pork and rice dish with fruit for sweetness instead of added sugar. Pork provides protein as part of the meal.",
    fluidMl: 15, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1,
  
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.222238 g per serving, 0.2757% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors.",},

  {
    id: "creamy-chicken-cabbage-pasta",
    code: "D017", mealFamily: "hot-pasta",
    category: "Dinner",
    emoji: "🍝",
    image: "/images/recipes/D017.png",
    name: "Creamy Chicken & Cabbage Pasta",
    description: "Chicken and cabbage folded through pasta with a light cream, lemon and herb sauce.",
    cookingTime: "20 minutes",
    calories: "509 kcal",
    protein: "35.1 g",
    equipment: "Large saucepan, frying pan, colander, wooden spoon, knife, chopping board",
    ingredients: [
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "100 g" },
      { item: "White pasta", shoppingItem: "White pasta", quantity: "75 g" },
      { item: "Cabbage", shoppingItem: "Cabbage", quantity: "¼ cabbage (100 g)" },
      { item: "Single cream", shoppingItem: "Single cream", quantity: "40 ml" },
      { item: "Olive oil", shoppingItem: "Olive oil", quantity: "1 tsp" },
      { item: "Lemon juice", shoppingItem: "Lemon juice", quantity: "1 tbsp" },
      { item: "Dried thyme", shoppingItem: "Dried thyme", quantity: "¼ tsp" },
      { item: "Black pepper", shoppingItem: "Black pepper", quantity: "¼ tsp" },
    ],
    method: [
      "00:00 — Bring a large saucepan of water to the boil and cook the pasta.",
      "03:00 — Cut the chicken into bite-sized pieces.",
      "05:00 — Heat the olive oil in a frying pan and cook the chicken for 8 minutes.",
      "08:00 — Add the cabbage to the pasta water for the final 4 minutes.",
      "12:00 — Drain the pasta and cabbage thoroughly.",
      "14:00 — Add the cream, thyme, black pepper and lemon juice to the chicken.",
      "16:00 — Heat gently for 2 minutes.",
      "18:00 — Stir in the drained pasta and cabbage.",
      "20:00 — Toss together and serve."
    ],
    nutrition: {
      calories: "509 kcal",
      protein: "35.1 g",
      carbohydrates: "62.7 g",
      fat: "14.7 g",
      fibre: "4 g",
      sodium: "80 mg",
      salt: "0.20 g",
      potassium: "841 mg",
      phosphate: "414 mg",
    },
    potassium: "High",
    phosphate: "High",
    purines: "Moderate",
    dietaryNote: "A creamy but simply seasoned chicken pasta. Cabbage adds volume while keeping the ingredient list straightforward.",
    fluidMl: 55, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1,
  
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.222238 g per serving, 0.3533% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors. Owner-approved source assumptions D4 are documented in the 16 October 2026 reconciliation workbook.",},

  {
    id: "cod-sweetcorn-rice",
    code: "D018", mealFamily: "rice-dish",
    category: "Dinner",
    emoji: "🐟",
    image: "/images/recipes/D018.png",
    name: "Cod, Sweetcorn & Rice",
    description: "Baked cod with basmati rice, cabbage and sweetcorn finished with lemon and parsley.",
    cookingTime: "26 minutes",
    calories: "464 kcal",
    protein: "30.3 g",
    equipment: "Saucepan with lid, baking tray, wooden spoon, knife, chopping board, Oven",
    ingredients: [
      { item: "Cod fillet", shoppingItem: "Cod fillet", quantity: "120 g" },
      { item: "Basmati rice", shoppingItem: "Basmati rice", quantity: "80 g" },
      { item: "Cabbage", shoppingItem: "Cabbage", quantity: "¼ cabbage (80 g)" },
      { item: "Sweetcorn", shoppingItem: "Sweetcorn kernels", quantity: "50 g" },
      { item: "Olive oil", shoppingItem: "Olive oil", quantity: "1 tsp" },
      { item: "Lemon juice", shoppingItem: "Lemon juice", quantity: "1 tbsp" },
      { item: "Dried parsley", shoppingItem: "Dried parsley", quantity: "¼ tsp" },
      { item: "Black pepper", shoppingItem: "Black pepper", quantity: "¼ tsp" },
    ],
    method: [
      "00:00 — Heat the oven to 200°C.",
      "02:00 — Place the cod on a baking tray and brush with the olive oil.",
      "04:00 — Sprinkle with the dried parsley and black pepper and bake until the cod is opaque and flakes easily.",
      "05:00 — Start the basmati rice in a covered saucepan according to the packet instructions.",
      "15:00 — Cook the cabbage and sweetcorn in a separate saucepan of unsalted water until tender, then drain.",
      "20:00 — Check the cod is cooked through and flakes easily.",
      "22:00 — Check the rice is tender and drain if required.",
      "24:00 — Place the rice, cabbage and sweetcorn in a bowl.",
      "26:00 — Top with the baked cod and drizzle over the lemon juice. Serve immediately."
    ],
    nutrition: {
      calories: "464 kcal",
      protein: "30.3 g",
      carbohydrates: "75.1 g",
      fat: "6.7 g",
      fibre: "4 g",
      sodium: "117 mg",
      salt: "0.29 g",
      potassium: "792 mg",
      phosphate: "352 mg",
    },
    potassium: "Moderate",
    phosphate: "High",
    purines: "Low",
    dietaryNote: "Cod provides lean protein while rice supplies the main carbohydrate source. The measured vegetables add volume without added salt.",
    fluidMl: 15, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1,
  
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.222238 g per serving, 0.2950% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors.",},

  {
    id: "egg-vegetable-pasta",
    code: "D019", mealFamily: "hot-pasta",
    category: "Dinner",
    emoji: "🥚",
    image: "/images/recipes/D019.png",
    name: "Egg & Vegetable Pasta",
    description: "Soft scrambled egg with pasta, cabbage, sweetcorn and green pepper in a simple herb dressing.",
    cookingTime: "20 minutes",
    calories: "489 kcal",
    protein: "24.3 g",
    equipment: "Large saucepan, frying pan, colander, wooden spoon, bowl, knife, chopping board",
    ingredients: [
      { item: "Eggs", shoppingItem: "Eggs", quantity: "2" },
      { item: "White pasta", shoppingItem: "White pasta", quantity: "75 g" },
      { item: "Cabbage", shoppingItem: "Cabbage", quantity: "¼ cabbage (80 g)" },
      { item: "Sweetcorn", shoppingItem: "Sweetcorn kernels", quantity: "50 g" },
      { item: "Green pepper", shoppingItem: "Green peppers", quantity: "1 green pepper (50 g)" },
      { item: "Olive oil", shoppingItem: "Olive oil", quantity: "1 tsp" },
      { item: "Dried parsley", shoppingItem: "Dried parsley", quantity: "¼ tsp" },
      { item: "Black pepper", shoppingItem: "Black pepper", quantity: "¼ tsp" },
      { item: "Lemon juice", shoppingItem: "Lemon juice", quantity: "1 tbsp" },
    ],
    method: [
      "00:00 — Cook the pasta in a large saucepan according to the packet instructions.",
      "05:00 — Add the cabbage, sweetcorn and sliced green pepper for the final 4 minutes of cooking.",
      "09:00 — Drain the pasta and vegetables thoroughly.",
      "10:00 — Crack the eggs into a bowl and whisk lightly.",
      "11:00 — Heat the olive oil in a frying pan over medium-low heat.",
      "12:00 — Add the eggs and stir gently until softly scrambled and cooked through.",
      "15:00 — Add the pasta and vegetables to the egg.",
      "17:00 — Stir through the parsley, black pepper and lemon juice.",
      "20:00 — Serve immediately."
    ],
    nutrition: {
      calories: "489 kcal",
      protein: "24.3 g",
      carbohydrates: "66.1 g",
      fat: "16.0 g",
      fibre: "5 g",
      sodium: "164 mg",
      salt: "0.41 g",
      potassium: "723 mg",
      phosphate: "392 mg",
    },
    potassium: "Moderate",
    phosphate: "High",
    purines: "Low",
    dietaryNote: "Eggs provide a lower-purine protein source. Cheaper, simple ingredients make this a useful meat-free dinner option.",
    fluidMl: 15, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1,
  
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.222238 g per serving, 0.3348% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors.",},

  {
    id: "chicken-apple-couscous-style-rice",
    code: "D020", mealFamily: "couscous-bowl",
    category: "Dinner",
    emoji: "🍗",
    image: "/images/recipes/D020.png",
    name: "Chicken & Apple Couscous-Style Rice",
    description: "Lemon-herb chicken with fluffy basmati rice, cabbage and warm apple.",
    cookingTime: "28 minutes",
    calories: "491 kcal",
    protein: "32.0 g",
    equipment: "Saucepan with lid, frying pan, wooden spoon, knife, chopping board",
    ingredients: [
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "100 g" },
      { item: "Basmati rice", shoppingItem: "Basmati rice", quantity: "80 g" },
      { item: "Cabbage", shoppingItem: "Cabbage", quantity: "¼ cabbage (80 g)" },
      { item: "Apple", shoppingItem: "Apples", quantity: "1 apple (80 g)" },
      { item: "Olive oil", shoppingItem: "Olive oil", quantity: "1 tsp" },
      { item: "Dried parsley", shoppingItem: "Dried parsley", quantity: "¼ tsp" },
      { item: "Lemon juice", shoppingItem: "Lemon juice", quantity: "1 tbsp" },
      { item: "Black pepper", shoppingItem: "Black pepper", quantity: "¼ tsp" },
    ],
    method: [
      "00:00 — Cook the basmati rice in a covered saucepan according to the packet instructions.",
      "03:00 — Peel, core and dice the apple.",
      "05:00 — Cut the chicken into bite-sized pieces.",
      "06:00 — Heat the olive oil in a frying pan and cook the chicken for 8 minutes until cooked through.",
      "10:00 — Add the cabbage and cook for 4 minutes.",
      "15:00 — Add the diced apple with 1 tbsp water and cook for 3 minutes until softened.",
      "19:00 — Stir the parsley, black pepper and lemon juice through the chicken mixture.",
      "22:00 — Check the rice is tender.",
      "25:00 — Spoon the rice into a bowl and top with the chicken mixture.",
      "28:00 — Serve immediately."
    ],
    nutrition: {
      calories: "491 kcal",
      protein: "32.0 g",
      carbohydrates: "80.3 g",
      fat: "6.6 g",
      fibre: "5 g",
      sodium: "68 mg",
      salt: "0.17 g",
      potassium: "725 mg",
      phosphate: "331 mg",
    },
    potassium: "Moderate",
    phosphate: "High",
    purines: "Moderate",
    dietaryNote: "A simple chicken and rice dinner with apple for natural sweetness. The recipe uses herbs, lemon and pepper instead of added salt.",
    fluidMl: 15, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1,
  
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.222238 g per serving, 0.2759% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors. Owner-approved source assumptions D4 are documented in the 16 October 2026 reconciliation workbook.",},
  {
    id: "chicken-herb-sweetcorn-rice", code: "D021", mealFamily: "rice-dish", category: "Dinner", emoji: "🍗", image: "/images/recipes/D021.png",
    name: "Chicken, Herb & Sweetcorn Rice", description: "Tender chicken with fluffy basmati rice, sweetcorn and herbs.", cookingTime: "30 minutes", calories: "519 kcal", protein: "33.9 g", equipment: "Large saucepan, frying pan, wooden spoon, knife, chopping board",
    ingredients: [
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "100 g" }, { item: "Basmati rice", shoppingItem: "Basmati rice", quantity: "90 g" }, { item: "Sweetcorn kernels", shoppingItem: "Sweetcorn kernels", quantity: "60 g" }, { item: "Onion", shoppingItem: "Onions", quantity: "½ onion (50 g)" }, { item: "Olive oil", shoppingItem: "Olive oil", quantity: "1 tsp" }, { item: "Dried thyme", shoppingItem: "Dried thyme", quantity: "½ tsp" }, { item: "Black pepper", shoppingItem: "Black pepper", quantity: "¼ tsp" }
    ],
    method: ["00:00 — Cook the rice according to the packet instructions, then drain.", "05:00 — Dice the chicken and onion.", "10:00 — Heat the olive oil and cook the onion for 3 minutes.", "13:00 — Add the chicken and thyme and cook until thoroughly cooked.", "25:00 — Stir in the sweetcorn and cook for 2 minutes.", "27:00 — Fold through the cooked rice and season with black pepper.", "30:00 — Serve hot."],
    nutrition: { calories: "519 kcal", protein: "33.9 g", carbohydrates: "84.3 g", fat: "7.3 g", fibre: "4.5 g", sodium: "63 mg", salt: "0.16 g", potassium: "674 mg", phosphate: "378 mg" },
    potassium: "Moderate", phosphate: "High", purines: "Moderate", dietaryNote: "A protein-rich rice dinner with vegetables and no added salt.", fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1
  ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.222238 g per serving, 0.2629% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors. Owner-approved source assumptions D4 are documented in the 16 October 2026 reconciliation workbook.",},
  {
    id: "beef-pepper-pasta", code: "D022", mealFamily: "hot-pasta", category: "Dinner", emoji: "🥩", image: "/images/recipes/D022.png",
    name: "Beef & Pepper Pasta", description: "Lean beef mince with pasta, peppers and onion in a light herb sauce.", cookingTime: "25 minutes", calories: "519 kcal", protein: "37.0 g", equipment: "Large saucepan, frying pan, colander, wooden spoon, knife, chopping board",
    ingredients: [
      { item: "Beef mince (5% fat)", shoppingItem: "Beef mince (5% fat)", quantity: "120 g" }, { item: "White pasta", shoppingItem: "White pasta", quantity: "85 g" }, { item: "Green pepper", shoppingItem: "Green peppers", quantity: "1½ green peppers (70 g)" }, { item: "Onion", shoppingItem: "Onions", quantity: "½ onion (50 g)" }, { item: "Olive oil", shoppingItem: "Olive oil", quantity: "1 tsp" }, { item: "Dried oregano", shoppingItem: "Dried oregano", quantity: "½ tsp" }, { item: "Black pepper", shoppingItem: "Black pepper", quantity: "¼ tsp" }
    ],
    method: ["00:00 — Cook the pasta according to the packet instructions, then drain.", "05:00 — Finely chop the onion and pepper.", "08:00 — Heat the olive oil and cook the onion and pepper for 4 minutes.", "12:00 — Add the beef mince and cook, breaking it up with a wooden spoon.", "20:00 — Stir in the oregano and black pepper.", "22:00 — Add the cooked pasta and toss together.", "25:00 — Serve hot."],
    nutrition: { calories: "519 kcal", protein: "37.0 g", carbohydrates: "70.1 g", fat: "11.3 g", fibre: "4.0 g", sodium: "114 mg", salt: "0.29 g", potassium: "709 mg", phosphate: "394 mg" },
    potassium: "Moderate", phosphate: "High", purines: "Moderate", dietaryNote: "Lean beef provides protein while pepper and onion add flavour without relying on added salt.", fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1
  ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.288288 g per serving, 0.4097% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors. Owner-approved source assumptions D5 are documented in the 16 October 2026 reconciliation workbook. Nominal 5% beef mince uses the approved extra-lean CoFID proxy at its actual 4.2 g fat per 100 g.",},
  {
    id: "herb-cod-potatoes-cabbage", code: "D023", mealFamily: "potato-dish", category: "Dinner", emoji: "🐟", image: "/images/recipes/D023.png",
    name: "Herb Cod with Potatoes & Cabbage", description: "Baked cod served with boiled potatoes and tender cabbage with lemon and herbs.", cookingTime: "35 minutes", calories: "449 kcal", protein: "30.7 g", equipment: "Baking tray, saucepan, steamer or second saucepan, knife, chopping board, Oven",
    ingredients: [
      { item: "Cod fillet", shoppingItem: "Cod fillet", quantity: "140 g" }, { item: "Potatoes", shoppingItem: "Potatoes", quantity: "250 g" }, { item: "Cabbage", shoppingItem: "Cabbage", quantity: "¼ cabbage (100 g)" }, { item: "Unsalted butter", shoppingItem: "Unsalted butter", quantity: "15 g" }, { item: "Lemon juice", shoppingItem: "Lemon juice", quantity: "1 tbsp" }, { item: "Dried parsley", shoppingItem: "Dried parsley", quantity: "½ tsp" }, { item: "Black pepper", shoppingItem: "Black pepper", quantity: "¼ tsp" }
    ],
    method: ["00:00 — Heat the oven to 200°C.", "03:00 — Peel and cut the potatoes into even pieces.", "05:00 — Boil the potatoes until tender.", "08:00 — Place the cod on a baking tray with half the butter, lemon juice and parsley.", "10:00 — Bake until the cod is opaque and cooked through.", "15:00 — Cook the cabbage in unsalted water until tender.", "28:00 — Drain the potatoes and cabbage.", "30:00 — Toss the potatoes with the remaining butter and black pepper.", "35:00 — Serve."],
    nutrition: { calories: "449 kcal", protein: "30.7 g", carbohydrates: "54.2 g", fat: "13.6 g", fibre: "5.0 g", sodium: "141 mg", salt: "0.35 g", potassium: "1827 mg", phosphate: "354 mg" },
    potassium: "High", phosphate: "High", purines: "Low", dietaryNote: "The potatoes are boiled first and the cooking water is discarded to help reduce potassium by leaching. A simple fish dinner with cabbage and potatoes. Potassium is influenced by the potato portion.", fluidMl: 15, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1
  ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.222238 g per serving, 0.4086% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors.",},
  {
    id: "creamy-cheese-egg-pasta", code: "D024", mealFamily: "hot-pasta", category: "Dinner", emoji: "🍳", image: "/images/recipes/D024.png",
    name: "Creamy Cheese & Egg Pasta", description: "Pasta coated in a creamy egg and Cheddar sauce with onion and herbs.", cookingTime: "20 minutes", calories: "589 kcal", protein: "27.7 g", equipment: "Large saucepan, frying pan, mixing bowl, colander, wooden spoon",
    ingredients: [
      { item: "White pasta", shoppingItem: "White pasta", quantity: "90 g" }, { item: "Egg", shoppingItem: "Egg", quantity: "1" }, { item: "Cheddar cheese", shoppingItem: "Cheddar cheese", quantity: "25 g" }, { item: "Semi-skimmed milk", shoppingItem: "Semi-skimmed milk", quantity: "100 ml" }, { item: "Onion", shoppingItem: "Onions", quantity: "½ onion (40 g)" }, { item: "Olive oil", shoppingItem: "Olive oil", quantity: "1 tsp" }, { item: "Dried parsley", shoppingItem: "Dried parsley", quantity: "½ tsp" }, { item: "Black pepper", shoppingItem: "Black pepper", quantity: "¼ tsp" }
    ],
    method: ["00:00 — Cook the pasta according to the packet instructions, reserving a little cooking water before draining.", "05:00 — Finely chop the onion and cook gently in the olive oil for 4 minutes.", "09:00 — Beat the egg with the milk and grated Cheddar.", "12:00 — Add the drained pasta to the onion pan and remove from the heat.", "14:00 — Stir in the egg mixture and parsley, using a splash of pasta water to loosen the sauce.", "17:00 — Return to very low heat and stir until the egg mixture is cooked through.", "20:00 — Season with black pepper and serve."],
    nutrition: { calories: "589 kcal", protein: "27.7 g", carbohydrates: "76.1 g", fat: "21.4 g", fibre: "3.0 g", sodium: "304 mg", salt: "0.76 g", potassium: "532 mg", phosphate: "498 mg" },
    potassium: "Moderate", phosphate: "High", purines: "Low", dietaryNote: "Egg and cheese provide protein and richness without meat or fish.", fluidMl: 100, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1
  ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.222238 g per serving, 0.2910% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors.",},
  {
    id: "pork-apple-cabbage", code: "D025", mealFamily: "meat-and-vegetable-dish", category: "Dinner", emoji: "🍖", image: "/images/recipes/D025.png",
    name: "Pork, Apple & Cabbage", description: "Grilled pork with warm apple and tender cabbage, finished with herbs.", cookingTime: "30 minutes", calories: "396 kcal", protein: "36.9 g", equipment: "Grill pan, saucepan, frying pan, knife, chopping board",
    ingredients: [
      { item: "Lean pork loin", shoppingItem: "Lean pork loin", quantity: "140 g" }, { item: "Apple", shoppingItem: "Apples", quantity: "1 apple (100 g)" }, { item: "Cabbage", shoppingItem: "Cabbage", quantity: "¼ cabbage (120 g)" }, { item: "Unsalted butter", shoppingItem: "Unsalted butter", quantity: "15 g" }, { item: "Vegetable oil", shoppingItem: "Vegetable oil", quantity: "1 tsp" }, { item: "Dried rosemary", shoppingItem: "Dried rosemary", quantity: "½ tsp" }, { item: "Black pepper", shoppingItem: "Black pepper", quantity: "0.2 g (small pinch)" }
    ],
    method: ["00:00 — Core and slice the apple and shred the cabbage.", "05:00 — Heat the grill pan and cook the pork with rosemary until thoroughly cooked.", "12:00 — Cook the cabbage in unsalted water until tender, then drain.", "18:00 — Heat the butter and gently cook the apple until softened.", "24:00 — Add the cabbage and toss together.", "27:00 — Season with the specified 0.2 g black pepper (a small pinch).", "30:00 — Serve."],
    nutrition: { calories: "396 kcal", protein: "36.9 g", carbohydrates: "17.6 g", fat: "20.3 g", fibre: "6.0 g", sodium: "68 mg", salt: "0.17 g", potassium: "948 mg", phosphate: "344 mg" },
    potassium: "Moderate", phosphate: "High", purines: "Moderate", dietaryNote: "Apple adds natural sweetness to pork and cabbage without a salty sauce.", fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1
  ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.077300 g per serving, 0.4381% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors.",},
  {
    id: "creamy-chicken-pepper-pasta", code: "D026", mealFamily: "hot-pasta", category: "Dinner", emoji: "🍗", image: "/images/recipes/D026.png",
    name: "Creamy Chicken & Pepper Pasta", description: "Chicken and peppers folded through pasta with a light creamy sauce.", cookingTime: "25 minutes", calories: "562 kcal", protein: "36.3 g", equipment: "Large saucepan, frying pan, colander, wooden spoon, knife, chopping board",
    ingredients: [
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "100 g" }, { item: "White pasta", shoppingItem: "White pasta", quantity: "85 g" }, { item: "Green pepper", shoppingItem: "Green peppers", quantity: "1½ green peppers (70 g)" }, { item: "Onion", shoppingItem: "Onions", quantity: "½ onion (40 g)" }, { item: "Single cream", shoppingItem: "Single cream", quantity: "50 ml" }, { item: "Olive oil", shoppingItem: "Olive oil", quantity: "1 tsp" }, { item: "Dried thyme", shoppingItem: "Dried thyme", quantity: "½ tsp" }, { item: "Black pepper", shoppingItem: "Black pepper", quantity: "¼ tsp" }
    ],
    method: ["00:00 — Cook the pasta according to the packet instructions, then drain.", "05:00 — Dice the chicken, pepper and onion.", "08:00 — Heat the olive oil and cook the onion and pepper for 4 minutes.", "12:00 — Add the chicken and thyme and cook until thoroughly cooked.", "20:00 — Stir in the cream and heat gently for 2 minutes.", "22:00 — Add the pasta and toss through the sauce.", "25:00 — Season with black pepper and serve."],
    nutrition: { calories: "562 kcal", protein: "36.3 g", carbohydrates: "70.5 g", fat: "16.9 g", fibre: "4.0 g", sodium: "80 mg", salt: "0.20 g", potassium: "768 mg", phosphate: "436 mg" },
    potassium: "Moderate", phosphate: "High", purines: "High", dietaryNote: "A creamy pasta dinner using chicken, pepper and onion for flavour.", fluidMl: 50, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1
  ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.222238 g per serving, 0.3143% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors. Owner-approved source assumptions D4 are documented in the 16 October 2026 reconciliation workbook.",},
  {
    id: "cod-sweetcorn-herb-pasta", code: "D027", mealFamily: "hot-pasta", category: "Dinner", emoji: "🐟", image: "/images/recipes/D027.png",
    name: "Cod, Sweetcorn & Herb Pasta", description: "Flaked cod with pasta and sweetcorn in a fresh lemon and herb dressing.", cookingTime: "25 minutes", calories: "483 kcal", protein: "34.9 g", equipment: "Large saucepan, frying pan, colander, wooden spoon, knife",
    ingredients: [
      { item: "Cod fillet", shoppingItem: "Cod fillet", quantity: "130 g" }, { item: "White pasta", shoppingItem: "White pasta", quantity: "85 g" }, { item: "Sweetcorn kernels", shoppingItem: "Sweetcorn kernels", quantity: "60 g" }, { item: "Onion", shoppingItem: "Onions", quantity: "½ onion (40 g)" }, { item: "Olive oil", shoppingItem: "Olive oil", quantity: "1 tsp" }, { item: "Lemon juice", shoppingItem: "Lemon juice", quantity: "1 tbsp" }, { item: "Dried parsley", shoppingItem: "Dried parsley", quantity: "½ tsp" }, { item: "Black pepper", shoppingItem: "Black pepper", quantity: "¼ tsp" }
    ],
    method: ["00:00 — Cook the pasta according to the packet instructions.", "05:00 — Cook the cod in a covered frying pan with a splash of water until it flakes easily.", "12:00 — Flake the cooked cod into large pieces.", "14:00 — Cook the onion gently in the olive oil until softened.", "18:00 — Drain the pasta and add it to the pan with the sweetcorn.", "20:00 — Fold through the cod, lemon juice and parsley.", "25:00 — Season with black pepper and serve."],
    nutrition: { calories: "483 kcal", protein: "34.9 g", carbohydrates: "72.6 g", fat: "7.9 g", fibre: "4.0 g", sodium: "123 mg", salt: "0.31 g", potassium: "864 mg", phosphate: "439 mg" },
    potassium: "Moderate", phosphate: "High", purines: "Low", dietaryNote: "Cod and pasta make a filling meal with lemon and herbs instead of a salty sauce.", fluidMl: 15, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1
  ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.222238 g per serving, 0.3052% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors.",},
  {
    id: "egg-cabbage-sweetcorn-rice", code: "D028", mealFamily: "rice-dish", category: "Dinner", emoji: "🥚", image: "/images/recipes/D028.png",
    name: "Egg, Cabbage & Sweetcorn Rice", description: "Fluffy rice stir-fried with egg, cabbage, sweetcorn and onion.", cookingTime: "25 minutes", calories: "567 kcal", protein: "23.7 g", equipment: "Saucepan, large frying pan, wooden spoon, knife, chopping board",
    ingredients: [
      { item: "Basmati rice", shoppingItem: "Basmati rice", quantity: "90 g" }, { item: "Eggs", shoppingItem: "Eggs", quantity: "2" }, { item: "Cabbage", shoppingItem: "Cabbage", quantity: "¼ cabbage (100 g)" }, { item: "Sweetcorn kernels", shoppingItem: "Sweetcorn kernels", quantity: "60 g" }, { item: "Onion", shoppingItem: "Onions", quantity: "½ onion (50 g)" }, { item: "Olive oil", shoppingItem: "Olive oil", quantity: "1 tsp" }, { item: "Black pepper", shoppingItem: "Black pepper", quantity: "¼ tsp" }
    ],
    method: ["00:00 — Cook the rice according to the packet instructions, then drain well.", "08:00 — Shred the cabbage and finely chop the onion.", "10:00 — Heat the olive oil and cook the onion and cabbage until softened.", "15:00 — Add the sweetcorn and cook for 2 minutes.", "17:00 — Push the vegetables aside and scramble the eggs until cooked.", "20:00 — Stir in the rice and combine thoroughly.", "25:00 — Season with black pepper and serve."],
    nutrition: { calories: "567 kcal", protein: "23.7 g", carbohydrates: "89.0 g", fat: "15.3 g", fibre: "5.0 g", sodium: "164 mg", salt: "0.41 g", potassium: "674 mg", phosphate: "363 mg" },
    potassium: "Moderate", phosphate: "High", purines: "Low", dietaryNote: "An egg-based dinner with rice and vegetables, with no added salt.", fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1
  ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.222238 g per serving, 0.2491% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors.",},
  {
    id: "pork-pepper-pasta", code: "D029", mealFamily: "hot-pasta", category: "Dinner", emoji: "🍖", image: "/images/recipes/D029.png",
    name: "Pork & Pepper Pasta", description: "Tender pork with pasta, green pepper and onion in a light herb dressing.", cookingTime: "25 minutes", calories: "510 kcal", protein: "42.9 g", equipment: "Large saucepan, frying pan, colander, wooden spoon, knife, chopping board",
    ingredients: [
      { item: "Lean pork loin", shoppingItem: "Lean pork loin", quantity: "130 g" }, { item: "White pasta", shoppingItem: "White pasta", quantity: "85 g" }, { item: "Green pepper", shoppingItem: "Green peppers", quantity: "1½ green peppers (70 g)" }, { item: "Onion", shoppingItem: "Onions", quantity: "½ onion (40 g)" }, { item: "Olive oil", shoppingItem: "Olive oil", quantity: "1 tsp" }, { item: "Dried rosemary", shoppingItem: "Dried rosemary", quantity: "½ tsp" }, { item: "Black pepper", shoppingItem: "Black pepper", quantity: "¼ tsp" }
    ],
    method: ["00:00 — Cook the pasta according to the packet instructions, then drain.", "05:00 — Slice the pork into thin strips and chop the pepper and onion.", "08:00 — Heat the olive oil and cook the onion and pepper for 4 minutes.", "12:00 — Add the pork and rosemary and cook until thoroughly cooked.", "20:00 — Add the drained pasta and toss together.", "23:00 — Season with black pepper.", "25:00 — Serve hot."],
    nutrition: { calories: "510 kcal", protein: "42.9 g", carbohydrates: "69.4 g", fat: "8.7 g", fibre: "4.0 g", sodium: "59 mg", salt: "0.15 g", potassium: "873 mg", phosphate: "455 mg" },
    potassium: "Moderate", phosphate: "High", purines: "Moderate", dietaryNote: "Lean pork and pasta provide a substantial protein-rich meal with herbs for flavour.", fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1
  ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.222238 g per serving, 0.3192% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors.",},
  {
    id: "d030-pork-apple-cabbage-skillet",
    code: "D030", mealFamily: "skillet",
    category: "Dinner",
    emoji: "🍎",
    image: "/images/recipes/D030.png",
    name: "Pork & Apple Cabbage Skillet",
    description: "Succulent pork with tender cabbage and softly caramelised apple, finished with rosemary for a fragrant sweet-and-savoury supper.",
    cookingTime: "30 minutes",
    calories: "518 kcal",
    protein: "39.3 g",
    equipment: "Large frying pan, saucepan, wooden spoon, knife, chopping board",
    ingredients: [
      { item: "Lean pork loin", shoppingItem: "Lean pork loin", quantity: "130 g" },
      { item: "Cabbage", shoppingItem: "Cabbage", quantity: "¼ cabbage (120 g)" },
      { item: "Apple", shoppingItem: "Apples", quantity: "1 apple (100 g)" },
      { item: "Basmati rice", shoppingItem: "Basmati rice", quantity: "60 g" },
      { item: "Unsalted butter", shoppingItem: "Unsalted butter", quantity: "10 g" },
      { item: "Dried rosemary", shoppingItem: "Dried rosemary", quantity: "½ tsp" },
      { item: "Black pepper", shoppingItem: "Black pepper", quantity: "¼ tsp" }
    ],
    method: [
      "00:00 — Cook the basmati rice according to the packet instructions.",
      "05:00 — Slice the pork thinly and shred the cabbage.",
      "08:00 — Melt half the butter in a large frying pan and cook the pork with rosemary until thoroughly cooked.",
      "18:00 — Add the cabbage and cook until tender.",
      "22:00 — Add the sliced apple and remaining butter and cook gently until the apple is softened.",
      "27:00 — Season with black pepper.",
      "30:00 — Serve the pork, cabbage and apple with the rice."
    ],
    nutrition: {
      calories: "518 kcal", protein: "39.3 g", carbohydrates: "67.8 g", fat: "11.7 g",
      fibre: "6.0 g", sodium: "64 mg", salt: "0.16 g", potassium: "958 mg", phosphate: "383 mg"
    },
    potassium: "Moderate",
    phosphate: "High",
    purines: "Moderate",
    dietaryNote: "Apple brings a gentle sweetness to the savoury pork and cabbage, while rosemary adds a warm aromatic finish.",
    fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1,
  
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.222238 g per serving, 0.3269% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors.",},
  {
    id: "lemon-chicken-herb-pasta",
    code: "D031", mealFamily: "hot-pasta",
    category: "Dinner",
    emoji: "🍗",
    image: "/images/recipes/D031.png",
    name: "Lemon Chicken & Herb Pasta",
    description: "Tender chicken and pasta with lemon, onion and herbs.",
    cookingTime: "25 minutes",
    calories: "485 kcal",
    protein: "35.3 g",
    equipment: "Large saucepan, frying pan, colander, wooden spoon, knife, chopping board",
    ingredients: [
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "100 g" },
      { item: "White pasta", shoppingItem: "White pasta", quantity: "90 g" },
      { item: "Onion", shoppingItem: "Onions", quantity: "½ onion (50 g)" },
      { item: "Green pepper", shoppingItem: "Green peppers", quantity: "1 green pepper (60 g)" },
      { item: "Olive oil", shoppingItem: "Olive oil", quantity: "1 tsp" },
      { item: "Lemon juice", shoppingItem: "Lemon juice", quantity: "1 tbsp" },
      { item: "Dried parsley", shoppingItem: "Dried parsley", quantity: "½ tsp" },
      { item: "Black pepper", shoppingItem: "Black pepper", quantity: "¼ tsp" }
    ],
    method: [
      "00:00 — Cook the pasta according to the packet instructions, then drain.",
      "05:00 — Dice the chicken, onion and pepper.",
      "08:00 — Heat the olive oil and cook the onion and pepper for 4 minutes.",
      "12:00 — Add the chicken and parsley and cook until thoroughly cooked.",
      "20:00 — Stir in the lemon juice.",
      "22:00 — Add the cooked pasta and toss together.",
      "25:00 — Season with black pepper and serve."
    ],
    nutrition: {
      calories: "485 kcal", protein: "35.3 g", carbohydrates: "73.9 g", fat: "7.4 g",
      fibre: "4.0 g", sodium: "66 mg", salt: "0.17 g", potassium: "757 mg", phosphate: "407 mg"
    },
    potassium: "Moderate",
    phosphate: "High",
    purines: "Moderate",
    dietaryNote: "Chicken and pasta provide protein and energy, with lemon and herbs used instead of added salt.",
    fluidMl: 15, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1
  ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.222238 g per serving, 0.2999% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors. Owner-approved source assumptions D4 are documented in the 16 October 2026 reconciliation workbook.",},
  {
    id: "cod-pepper-lemon-rice",
    code: "D032", mealFamily: "rice-dish",
    category: "Dinner",
    emoji: "🐟",
    image: "/images/recipes/D032.png",
    name: "Cod, Pepper & Lemon Rice",
    description: "Flaked cod served with basmati rice, green pepper and lemon.",
    cookingTime: "30 minutes",
    calories: "495 kcal",
    protein: "33.1 g",
    equipment: "Saucepan, frying pan, wooden spoon, knife, chopping board",
    ingredients: [
      { item: "Cod fillet", shoppingItem: "Cod fillet", quantity: "140 g" },
      { item: "Basmati rice", shoppingItem: "Basmati rice", quantity: "90 g" },
      { item: "Green pepper", shoppingItem: "Green peppers", quantity: "1½ green peppers (80 g)" },
      { item: "Onion", shoppingItem: "Onions", quantity: "½ onion (50 g)" },
      { item: "Olive oil", shoppingItem: "Olive oil", quantity: "1 tsp" },
      { item: "Lemon juice", shoppingItem: "Lemon juice", quantity: "1 tbsp" },
      { item: "Dried thyme", shoppingItem: "Dried thyme", quantity: "½ tsp" },
      { item: "Black pepper", shoppingItem: "Black pepper", quantity: "¼ tsp" }
    ],
    method: [
      "00:00 — Cook the rice according to the packet instructions.",
      "05:00 — Dice the onion and pepper.",
      "08:00 — Heat the olive oil and cook the onion and pepper for 5 minutes.",
      "13:00 — Add the cod and thyme, cover and cook until the fish flakes easily.",
      "22:00 — Flake the cod into large pieces.",
      "24:00 — Drain the rice and stir it through the vegetables.",
      "27:00 — Add the lemon juice and cod.",
      "30:00 — Season with black pepper and serve."
    ],
    nutrition: {
      calories: "495 kcal", protein: "33.1 g", carbohydrates: "81.8 g", fat: "6.2 g",
      fibre: "3.5 g", sodium: "133 mg", salt: "0.33 g", potassium: "714 mg", phosphate: "357 mg"
    },
    potassium: "Moderate",
    phosphate: "High",
    purines: "Moderate",
    dietaryNote: "Cod, rice and peppers make a straightforward dinner with fresh lemon flavour.",
    fluidMl: 15, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1
  ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.222238 g per serving, 0.2711% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors.",},
  {
    id: "beef-cabbage-rice",
    code: "D033", mealFamily: "rice-dish",
    category: "Dinner",
    emoji: "🥩",
    image: "/images/recipes/D033.png",
    name: "Beef, Cabbage & Rice",
    description: "Lean beef mince with cabbage, onion and basmati rice.",
    cookingTime: "30 minutes",
    calories: "562 kcal",
    protein: "35.6 g",
    equipment: "Saucepan, frying pan, wooden spoon, knife, chopping board",
    ingredients: [
      { item: "Beef mince (5% fat)", shoppingItem: "Beef mince (5% fat)", quantity: "120 g" },
      { item: "Basmati rice", shoppingItem: "Basmati rice", quantity: "90 g" },
      { item: "Cabbage", shoppingItem: "Cabbage", quantity: "¼ cabbage (120 g)" },
      { item: "Onion", shoppingItem: "Onions", quantity: "½ onion (50 g)" },
      { item: "Olive oil", shoppingItem: "Olive oil", quantity: "1 tsp" },
      { item: "Dried thyme", shoppingItem: "Dried thyme", quantity: "½ tsp" },
      { item: "Black pepper", shoppingItem: "Black pepper", quantity: "¼ tsp" }
    ],
    method: [
      "00:00 — Cook the rice according to the packet instructions.",
      "05:00 — Shred the cabbage and finely chop the onion.",
      "08:00 — Heat the olive oil and cook the onion for 3 minutes.",
      "11:00 — Add the beef mince and cook thoroughly, breaking it up as it cooks.",
      "20:00 — Add the cabbage and thyme and cook until tender.",
      "25:00 — Drain the rice and add it to the pan.",
      "30:00 — Season with black pepper and serve."
    ],
    nutrition: {
      calories: "562 kcal", protein: "35.6 g", carbohydrates: "85.2 g", fat: "10.3 g",
      fibre: "5.0 g", sodium: "119 mg", salt: "0.30 g", potassium: "768 mg", phosphate: "351 mg"
    },
    potassium: "Moderate",
    phosphate: "High",
    purines: "Moderate",
    dietaryNote: "Lean beef is combined with rice and cabbage for a filling one-pan-style dinner.",
    fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1
  ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.222238 g per serving, 0.2602% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors. Owner-approved source assumptions D5 are documented in the 16 October 2026 reconciliation workbook. Nominal 5% beef mince uses the approved extra-lean CoFID proxy at its actual 4.2 g fat per 100 g.",},
  {
    id: "cheesy-egg-vegetable-rice",
    code: "D034", mealFamily: "rice-dish",
    category: "Dinner",
    emoji: "🍳",
    image: "/images/recipes/D034.png",
    name: "Cheesy Egg & Vegetable Rice",
    description: "Basmati rice with scrambled egg, sweetcorn, pepper and Cheddar.",
    cookingTime: "25 minutes",
    calories: "632 kcal",
    protein: "27.9 g",
    equipment: "Saucepan, large frying pan, wooden spoon, knife, chopping board",
    ingredients: [
      { item: "Basmati rice", shoppingItem: "Basmati rice", quantity: "90 g" },
      { item: "Eggs", shoppingItem: "Eggs", quantity: "2" },
      { item: "Cheddar cheese", shoppingItem: "Cheddar cheese", quantity: "20 g" },
      { item: "Sweetcorn kernels", shoppingItem: "Sweetcorn kernels", quantity: "60 g" },
      { item: "Green pepper", shoppingItem: "Green peppers", quantity: "1 green pepper (60 g)" },
      { item: "Onion", shoppingItem: "Onions", quantity: "½ onion (40 g)" },
      { item: "Olive oil", shoppingItem: "Olive oil", quantity: "1 tsp" },
      { item: "Black pepper", shoppingItem: "Black pepper", quantity: "¼ tsp" }
    ],
    method: [
      "00:00 — Cook the rice according to the packet instructions, then drain.",
      "08:00 — Chop the onion and pepper.",
      "10:00 — Heat the olive oil and cook the onion and pepper until softened.",
      "15:00 — Add the sweetcorn and cook for 2 minutes.",
      "17:00 — Add the eggs and scramble until cooked through.",
      "20:00 — Stir in the cooked rice and grated Cheddar.",
      "25:00 — Season with black pepper and serve."
    ],
    nutrition: {
      calories: "632 kcal", protein: "27.9 g", carbohydrates: "85.0 g", fat: "22.3 g",
      fibre: "4.0 g", sodium: "304 mg", salt: "0.76 g", potassium: "520 mg", phosphate: "447 mg"
    },
    potassium: "Moderate",
    phosphate: "High",
    purines: "Low",
    dietaryNote: "An egg-based rice dinner with vegetables and a modest amount of Cheddar for flavour.",
    fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1
  ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.222238 g per serving, 0.2609% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors.",},
  {
    id: "chicken-cabbage-herb-rice",
    code: "D035", mealFamily: "rice-dish",
    category: "Dinner",
    emoji: "🍗",
    image: "/images/recipes/D035.png",
    name: "Chicken, Cabbage & Herb Rice",
    description: "Chicken and cabbage served with fluffy basmati rice and rosemary.",
    cookingTime: "30 minutes",
    calories: "545 kcal",
    protein: "33.4 g",
    equipment: "Saucepan, frying pan, wooden spoon, knife, chopping board",
    ingredients: [
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "100 g" },
      { item: "Basmati rice", shoppingItem: "Basmati rice", quantity: "90 g" },
      { item: "Cabbage", shoppingItem: "Cabbage", quantity: "¼ cabbage (120 g)" },
      { item: "Onion", shoppingItem: "Onions", quantity: "½ onion (50 g)" },
      { item: "Unsalted butter", shoppingItem: "Unsalted butter", quantity: "10 g" },
      { item: "Dried rosemary", shoppingItem: "Dried rosemary", quantity: "½ tsp" },
      { item: "Black pepper", shoppingItem: "Black pepper", quantity: "¼ tsp" }
    ],
    method: [
      "00:00 — Cook the rice according to the packet instructions.",
      "05:00 — Shred the cabbage, chop the onion and dice the chicken.",
      "10:00 — Cook the cabbage in unsalted water until tender, then drain.",
      "12:00 — Melt the butter in a frying pan and cook the onion and chicken with rosemary.",
      "22:00 — Continue cooking until the chicken is thoroughly cooked.",
      "25:00 — Stir in the cabbage and drained rice.",
      "30:00 — Season with black pepper and serve."
    ],
    nutrition: {
      calories: "545 kcal", protein: "33.4 g", carbohydrates: "85.3 g", fat: "10.0 g",
      fibre: "5.0 g", sodium: "72 mg", salt: "0.18 g", potassium: "793 mg", phosphate: "357 mg"
    },
    potassium: "Moderate",
    phosphate: "High",
    purines: "Moderate",
    dietaryNote: "Chicken and rice are paired with cabbage and herbs for a simple, lightly seasoned dinner.",
    fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1
  ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.222238 g per serving, 0.2600% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors. Owner-approved source assumptions D4 are documented in the 16 October 2026 reconciliation workbook.",},
  {
    id: "cod-cabbage-pasta",
    code: "D036", mealFamily: "hot-pasta",
    category: "Dinner",
    emoji: "🐟",
    image: "/images/recipes/D036.png",
    name: "Cod & Cabbage Pasta",
    description: "Flaked cod and tender cabbage folded through pasta with lemon and parsley.",
    cookingTime: "25 minutes",
    calories: "488 kcal",
    protein: "34.7 g",
    equipment: "Large saucepan, frying pan, colander, wooden spoon, knife",
    ingredients: [
      { item: "Cod fillet", shoppingItem: "Cod fillet", quantity: "130 g" },
      { item: "White pasta", shoppingItem: "White pasta", quantity: "90 g" },
      { item: "Cabbage", shoppingItem: "Cabbage", quantity: "¼ cabbage (100 g)" },
      { item: "Onion", shoppingItem: "Onions", quantity: "½ onion (40 g)" },
      { item: "Olive oil", shoppingItem: "Olive oil", quantity: "1 tsp" },
      { item: "Lemon juice", shoppingItem: "Lemon juice", quantity: "1 tbsp" },
      { item: "Dried parsley", shoppingItem: "Dried parsley", quantity: "½ tsp" },
      { item: "Black pepper", shoppingItem: "Black pepper", quantity: "¼ tsp" }
    ],
    method: [
      "00:00 — Cook the pasta according to the packet instructions.",
      "05:00 — Cook the cod in a covered pan until it flakes easily.",
      "10:00 — Shred the cabbage and chop the onion.",
      "12:00 — Cook the cabbage and onion gently in the olive oil until softened.",
      "20:00 — Drain the pasta and add it to the vegetable pan.",
      "22:00 — Flake in the cod and add the lemon juice and parsley.",
      "25:00 — Season with black pepper and serve."
    ],
    nutrition: {
      calories: "488 kcal", protein: "34.7 g", carbohydrates: "76.3 g", fat: "7.0 g",
      fibre: "5.0 g", sodium: "129 mg", salt: "0.32 g", potassium: "947 mg", phosphate: "419 mg"
    },
    potassium: "Moderate",
    phosphate: "High",
    purines: "Low",
    dietaryNote: "Cod and pasta provide protein and energy, while cabbage and lemon add flavour and texture.",
    fluidMl: 15, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1
  ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.222238 g per serving, 0.2904% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors.",},
  {
    id: "pepper-beef-rice",
    code: "D037", mealFamily: "rice-dish",
    category: "Dinner",
    emoji: "🥩",
    image: "/images/recipes/D037.png",
    name: "Pepper Beef & Rice",
    description: "Lean beef mince with green pepper and onion served over basmati rice.",
    cookingTime: "30 minutes",
    calories: "545 kcal",
    protein: "34.8 g",
    equipment: "Saucepan, frying pan, wooden spoon, knife, chopping board",
    ingredients: [
      { item: "Beef mince (5% fat)", shoppingItem: "Beef mince (5% fat)", quantity: "120 g" },
      { item: "Basmati rice", shoppingItem: "Basmati rice", quantity: "90 g" },
      { item: "Green pepper", shoppingItem: "Green peppers", quantity: "1½ green peppers (80 g)" },
      { item: "Onion", shoppingItem: "Onions", quantity: "½ onion (50 g)" },
      { item: "Olive oil", shoppingItem: "Olive oil", quantity: "1 tsp" },
      { item: "Dried oregano", shoppingItem: "Dried oregano", quantity: "½ tsp" },
      { item: "Black pepper", shoppingItem: "Black pepper", quantity: "¼ tsp" }
    ],
    method: [
      "00:00 — Cook the rice according to the packet instructions.",
      "05:00 — Chop the onion and pepper.",
      "08:00 — Heat the olive oil and cook the vegetables until softened.",
      "13:00 — Add the beef mince and oregano and cook thoroughly, breaking up the mince.",
      "23:00 — Drain the rice.",
      "25:00 — Spoon the beef mixture over the rice.",
      "30:00 — Season with black pepper and serve."
    ],
    nutrition: {
      calories: "545 kcal", protein: "34.8 g", carbohydrates: "81.4 g", fat: "10.4 g",
      fibre: "4.0 g", sodium: "114 mg", salt: "0.28 g", potassium: "593 mg", phosphate: "335 mg"
    },
    potassium: "Moderate",
    phosphate: "High",
    purines: "High",
    dietaryNote: "Lean beef with rice and peppers makes a substantial dinner without a salty sauce.",
    fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1
  ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.288288 g per serving, 0.3529% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors. Owner-approved source assumptions D5 are documented in the 16 October 2026 reconciliation workbook. Nominal 5% beef mince uses the approved extra-lean CoFID proxy at its actual 4.2 g fat per 100 g.",},
  {
    id: "pork-apple-herb-pasta",
    code: "D038", mealFamily: "hot-pasta",
    category: "Dinner",
    emoji: "🍖",
    image: "/images/recipes/D038.png",
    name: "Pork & Apple Herb Pasta",
    description: "Tender pork with apple, pasta and onion finished with rosemary.",
    cookingTime: "25 minutes",
    calories: "577 kcal",
    protein: "43.0 g",
    equipment: "Large saucepan, frying pan, colander, wooden spoon, knife, chopping board",
    ingredients: [
      { item: "Lean pork loin", shoppingItem: "Lean pork loin", quantity: "130 g" },
      { item: "White pasta", shoppingItem: "White pasta", quantity: "85 g" },
      { item: "Apple", shoppingItem: "Apples", quantity: "1 apple (80 g)" },
      { item: "Onion", shoppingItem: "Onions", quantity: "½ onion (50 g)" },
      { item: "Unsalted butter", shoppingItem: "Unsalted butter", quantity: "10 g" },
      { item: "Dried rosemary", shoppingItem: "Dried rosemary", quantity: "½ tsp" },
      { item: "Black pepper", shoppingItem: "Black pepper", quantity: "¼ tsp" }
    ],
    method: [
      "00:00 — Cook the pasta according to the packet instructions.",
      "05:00 — Slice the pork and onion and dice the apple.",
      "08:00 — Melt the butter in a frying pan and cook the onion for 3 minutes.",
      "11:00 — Add the pork and rosemary and cook until thoroughly cooked.",
      "20:00 — Add the apple and cook gently until softened.",
      "22:00 — Add the drained pasta and toss together.",
      "25:00 — Season with black pepper and serve."
    ],
    nutrition: {
      calories: "577 kcal", protein: "43.0 g", carbohydrates: "77.7 g", fat: "12.6 g",
      fibre: "5.0 g", sodium: "58 mg", salt: "0.15 g", potassium: "885 mg", phosphate: "453 mg"
    },
    potassium: "Moderate",
    phosphate: "High",
    purines: "Moderate",
    dietaryNote: "Apple adds sweetness to pork and pasta, with rosemary providing extra flavour.",
    fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1
  ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.222238 g per serving, 0.2851% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors.",},
  {
    id: "egg-cauliflower-herb-pasta",
    code: "D039", mealFamily: "hot-pasta",
    category: "Dinner",
    emoji: "🍳",
    image: "/images/recipes/D039.png",
    name: "Egg, Cauliflower & Herb Pasta",
    description: "Pasta with egg, cauliflower, onion and a light herb dressing.",
    cookingTime: "25 minutes",
    calories: "530 kcal",
    protein: "25.9 g",
    equipment: "Large saucepan, frying pan, colander, mixing bowl, wooden spoon",
    ingredients: [
      { item: "White pasta", shoppingItem: "White pasta", quantity: "90 g" },
      { item: "Eggs", shoppingItem: "Eggs", quantity: "2" },
      { item: "Cauliflower", shoppingItem: "Cauliflower", quantity: "100 g" },
      { item: "Onion", shoppingItem: "Onions", quantity: "½ onion (50 g)" },
      { item: "Olive oil", shoppingItem: "Olive oil", quantity: "1 tsp" },
      { item: "Dried parsley", shoppingItem: "Dried parsley", quantity: "½ tsp" },
      { item: "Black pepper", shoppingItem: "Black pepper", quantity: "¼ tsp" }
    ],
    method: [
      "00:00 — Cook the pasta according to the packet instructions.",
      "05:00 — Cut the cauliflower into small florets and finely chop the onion.",
      "08:00 — Cook the cauliflower in unsalted water until tender, then drain.",
      "12:00 — Heat the olive oil and cook the onion until softened.",
      "16:00 — Beat the eggs with the parsley.",
      "18:00 — Add the drained pasta and cauliflower to the onion pan and remove from the heat.",
      "20:00 — Stir in the egg mixture and return to very low heat until the egg is cooked through.",
      "25:00 — Season with black pepper and serve."
    ],
    nutrition: {
      calories: "530 kcal", protein: "25.9 g", carbohydrates: "76.5 g", fat: "15.5 g",
      fibre: "5.0 g", sodium: "165 mg", salt: "0.41 g", potassium: "693 mg", phosphate: "390 mg"
    },
    potassium: "Moderate",
    phosphate: "High",
    purines: "Low",
    dietaryNote: "An egg-based pasta dinner with cauliflower and herbs instead of meat or fish.",
    fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1
  ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.222238 g per serving, 0.2898% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors.",},
  {
    id: "d040-cod-sweetcorn-potato-bake",
    code: "D040", mealFamily: "potato-bake",
    category: "Dinner",
    emoji: "🐟",
    image: "/images/recipes/D040.png",
    name: "Cod & Sweetcorn Potato Bake",
    description: "Flaky baked cod layered with tender potato and sweetcorn in a creamy, lightly seasoned bake with a golden finish.",
    cookingTime: "40 minutes",
    calories: "440 kcal",
    protein: "28.5 g",
    equipment: "Oven, baking dish, saucepan, colander, knife, chopping board",
    ingredients: [
      { item: "Cod fillet", shoppingItem: "Cod fillet", quantity: "120 g" },
      { item: "Potatoes", shoppingItem: "Potatoes", quantity: "180 g" },
      { item: "Sweetcorn kernels", shoppingItem: "Sweetcorn kernels", quantity: "50 g" },
      { item: "Single cream", shoppingItem: "Single cream", quantity: "40 ml" },
      { item: "Unsalted butter", shoppingItem: "Unsalted butter", quantity: "10 g" },
      { item: "Cabbage", shoppingItem: "Cabbage", quantity: "¼ cabbage (80 g)" },
      { item: "Dried parsley", shoppingItem: "Dried parsley", quantity: "¼ tsp" },
      { item: "Black pepper", shoppingItem: "Black pepper", quantity: "0.5 g" }
    ],
    method: [
      "00:00 — Heat the oven to 200°C.",
      "03:00 — Peel and slice the potatoes into even pieces.",
      "05:00 — Boil the potatoes until just tender, then drain.",
      "12:00 — Cook the cabbage and sweetcorn in unsalted water until tender, then drain.",
      "15:00 — Place the potato, cabbage and sweetcorn in a baking dish.",
      "18:00 — Place the cod on top and spoon over the cream.",
      "20:00 — Dot with the butter and sprinkle over the parsley and the specified 0.5 g black pepper.",
      "22:00 — Bake until the cod is opaque and flakes easily and the top is lightly golden.",
      "40:00 — Serve immediately."
    ],
    nutrition: {
      calories: "440 kcal", protein: "28.5 g", carbohydrates: "44.1 g", fat: "17.8 g",
      fibre: "5.0 g", sodium: "132 mg", salt: "0.33 g", potassium: "1551 mg", phosphate: "365 mg"
    },
    potassium: "High",
    phosphate: "High",
    purines: "Low",
    dietaryNote: "The potatoes are boiled first and the cooking water is discarded to help reduce potassium by leaching. Flaky cod, tender potato and sweetcorn make a comforting baked dinner with gentle seasoning and no added salt.",
    fluidMl: 40, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1,
  
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.193250 g per serving, 0.4360% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors.",},

  { id: "chicken-leek-couscous-lemon", code: "D041", mealFamily: "couscous-dish", category: "Dinner", emoji: "🍋", image: "/images/recipes/D041.png", name: "Chicken & Leek Couscous with Lemon", description: "Tender chicken with fluffy couscous, softened leek and carrot, finished with fresh lemon and parsley.", cookingTime: "30 minutes", calories: "371 kcal", protein: "15.7 g", equipment: "Saucepan, frying pan, colander, knife, chopping board", ingredients: [
      { item: "Chicken, meat, average, raw", shoppingItem: "Chicken breast", quantity: "50 g (raw)" },
      { item: "Couscous, plain, raw", shoppingItem: "Couscous", quantity: "35 g" },
      { item: "Leeks, boiled in unsalted water", shoppingItem: "Leek", quantity: "½ leek (20 g)" },
      { item: "Carrots, old, boiled in unsalted water", shoppingItem: "Carrots", quantity: "½ carrot (20 g)" },
      { item: "Oil, olive", shoppingItem: "Olive oil", quantity: "20 g" },
      { item: "Lemon juice, fresh", shoppingItem: "Lemon juice", quantity: "10 g" },
      { item: "Parsley, dried", shoppingItem: "Dried parsley", quantity: "¼ tsp" }
    ], method: ["00:00 — Prepare the couscous using unsalted water according to the packet instructions.", "05:00 — Slice the chicken and cook in half the olive oil until completely cooked through.", "12:00 — Boil the leek and carrot in unsalted water until tender, then drain well.", "18:00 — Fluff the couscous and stir through the vegetables.", "22:00 — Top with the sliced chicken and finish with the remaining olive oil, lemon juice and parsley.", "30:00 — Serve immediately."], nutrition: { calories: "371 kcal", protein: "15.7 g", carbohydrates: "29.6 g", fat: "21.9 g", fibre: "2.2 g", sodium: "46 mg", salt: "0.12 g", potassium: "376 mg", phosphate: "172 mg" }, potassium: "Low", phosphate: "Low", purines: "Moderate", dietaryNote: "CoFID 2021 ingredient-level calculation for one serving. Potassium is below 400 mg per serving on the RenalPlan recipe-planning bands.", fluidMl: 10, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1 ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,},
  { id: "turkey-meatballs-herb-rice", code: "D042", mealFamily: "meatballs-rice", category: "Dinner", emoji: "🍚", image: "/images/recipes/D042.png", name: "Turkey Meatballs with Herb Rice", description: "Herb-seasoned turkey meatballs served with basmati rice, tender cabbage and onion.", cookingTime: "30 minutes", calories: "504 kcal", protein: "20.0 g", equipment: "Saucepan, frying pan, colander, knife, chopping board", ingredients: [
      { item: "Turkey, meat, average, raw", shoppingItem: "Turkey mince (lean)", quantity: "60 g" },
      { item: "Rice, white, basmati, raw", shoppingItem: "Basmati rice", quantity: "70 g" },
      { item: "Cabbage, average, boiled in unsalted water", shoppingItem: "Cabbage", quantity: "⅛ cabbage (50 g)" },
      { item: "Onions, raw", shoppingItem: "Onion", quantity: "¼ onion (20 g)" },
      { item: "Oil, olive", shoppingItem: "Olive oil", quantity: "20 g" },
      { item: "Rosemary, dried", shoppingItem: "Dried rosemary", quantity: "¼ tsp" }
    ], method: ["00:00 — Cook the basmati rice in unsalted water according to the packet instructions.", "05:00 — Mix the turkey mince with rosemary and form into small meatballs.", "08:00 — Heat the olive oil in a frying pan and cook the meatballs, turning regularly, until browned and completely cooked through.", "18:00 — Boil the cabbage and onion in unsalted water until tender, then drain well.", "25:00 — Check the rice is tender and drain if required.", "30:00 — Serve the meatballs with the rice and vegetables."], nutrition: { calories: "504 kcal", protein: "20.0 g", carbohydrates: "61.6 g", fat: "21.4 g", fibre: "2.4 g", sodium: "45 mg", salt: "0.11 g", potassium: "373 mg", phosphate: "219 mg" }, potassium: "Low", phosphate: "Low", purines: "Low", dietaryNote: "CoFID 2021 ingredient-level calculation for one serving. Potassium is below 400 mg per serving on the RenalPlan recipe-planning bands.", fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1 ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,},
  { id: "cod-herby-noodles-cucumber", code: "D043", mealFamily: "noodles", category: "Dinner", emoji: "🐟", image: "/images/recipes/D043.png", name: "Cod with Herby Noodles & Cucumber", description: "Baked cod with plain noodles, tender cabbage and cucumber, finished with lemon, parsley and olive oil.", cookingTime: "30 minutes", calories: "377 kcal", protein: "15.7 g", equipment: "Saucepan, frying pan, colander, knife, chopping board, Oven, Baking tray", ingredients: [
      { item: "Cod, flesh only, baked", shoppingItem: "Cod fillet", quantity: "50 g" },
      { item: "Noodles, rice, fine, dried, boiled in unsalted water", shoppingItem: "Rice noodles", quantity: "150 g (cooked)" },
      { item: "Cucumber, raw, flesh and skin", shoppingItem: "Cucumber", quantity: "¼ cucumber (30 g)" },
      { item: "Cabbage, average, boiled in unsalted water", shoppingItem: "Cabbage", quantity: "⅛ cabbage (50 g)" },
      { item: "Oil, olive", shoppingItem: "Olive oil", quantity: "20 g" },
      { item: "Lemon juice, fresh", shoppingItem: "Lemon juice", quantity: "10 g" },
      { item: "Parsley, dried", shoppingItem: "Dried parsley", quantity: "¼ tsp" }
    ], method: ["00:00 — Heat the oven to 200°C and bake the cod until opaque and cooked through.", "05:00 — Cook the noodles in unsalted water according to the packet instructions, then drain thoroughly.", "12:00 — Boil the cabbage in unsalted water until tender, then drain well.", "18:00 — Prepare the cucumber and combine it with the noodles and cabbage.", "22:00 — Add the olive oil, lemon juice and parsley and toss gently.", "25:00 — Flake the cod over the noodles and serve."], nutrition: { calories: "377 kcal", protein: "15.7 g", carbohydrates: "33.9 g", fat: "20.8 g", fibre: "3.0 g", sodium: "56 mg", salt: "0.14 g", potassium: "339 mg", phosphate: "143 mg" }, potassium: "Low", phosphate: "Low", purines: "Moderate", dietaryNote: "CoFID 2021 ingredient-level calculation for one serving. Potassium is below 400 mg per serving on the RenalPlan recipe-planning bands.", fluidMl: 10, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1 ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,},
  { id: "pork-apple-leek-rice", code: "D044", mealFamily: "meat-and-vegetable-dish", category: "Dinner", emoji: "🍎", image: "/images/recipes/D044.png", name: "Pork Medallions with Apple & Leek", description: "Lean pork medallions with basmati rice, softened leek and warm apple finished with thyme.", cookingTime: "30 minutes", calories: "421 kcal", protein: "14.4 g", equipment: "Saucepan, frying pan, colander, knife, chopping board", ingredients: [
      { item: "Pork, loin medallions, raw, lean", shoppingItem: "Lean pork loin", quantity: "40 g" },
      { item: "Rice, white, basmati, raw", shoppingItem: "Basmati rice", quantity: "50 g" },
      { item: "Leeks, raw", shoppingItem: "Leek", quantity: "½ leek (15 g)" },
      { item: "Apples, eating, raw, flesh and skin", shoppingItem: "Apple", quantity: "⅜ apple (30 g)" },
      { item: "Oil, olive", shoppingItem: "Olive oil", quantity: "20 g" },
      { item: "Thyme, dried, ground", shoppingItem: "Dried thyme", quantity: "¼ tsp" }
    ], method: ["00:00 — Cook the basmati rice in unsalted water according to the packet instructions.", "05:00 — Slice the pork into medallions and heat the olive oil in a frying pan.", "08:00 — Cook the pork until completely cooked through, turning regularly.", "18:00 — Add the sliced leek and cook until softened.", "22:00 — Add the diced apple and cook gently until just softened.", "30:00 — Serve the pork with the rice and apple and leek mixture."], nutrition: { calories: "421 kcal", protein: "14.4 g", carbohydrates: "46.0 g", fat: "21.2 g", fibre: "1.4 g", sodium: "17 mg", salt: "0.04 g", potassium: "266 mg", phosphate: "143 mg" }, potassium: "Low", phosphate: "Low", purines: "Moderate", dietaryNote: "CoFID 2021 ingredient-level calculation for one serving. Potassium is below 400 mg per serving on the RenalPlan recipe-planning bands.", fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1 ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,},
  { id: "chicken-carrot-noodle-stir-fry", code: "D045", mealFamily: "noodle-stir-fry", category: "Dinner", emoji: "🍜", image: "/images/recipes/D045.png", name: "Chicken & Carrot Noodle Stir-Fry", description: "Chicken and plain noodles stir-fried with boiled carrot and cabbage, finished with ground ginger.", cookingTime: "30 minutes", calories: "386 kcal", protein: "14.7 g", equipment: "Saucepan, frying pan, colander, knife, chopping board", ingredients: [
      { item: "Chicken, meat, average, raw", shoppingItem: "Chicken breast", quantity: "50 g (raw)" },
      { item: "Noodles, rice, fine, dried, boiled in unsalted water", shoppingItem: "Rice noodles", quantity: "150 g (cooked)" },
      { item: "Carrots, old, boiled in unsalted water", shoppingItem: "Carrots", quantity: "½ carrot (30 g)" },
      { item: "Cabbage, average, boiled in unsalted water", shoppingItem: "Cabbage", quantity: "⅛ cabbage (50 g)" },
      { item: "Oil, olive", shoppingItem: "Olive oil", quantity: "20 g" },
      { item: "Ginger, ground", shoppingItem: "Ground ginger", quantity: "¼ tsp" }
    ], method: ["00:00 — Cook the noodles in unsalted water according to the packet instructions, then drain thoroughly.", "05:00 — Cook the chicken in the olive oil until completely cooked through.", "15:00 — Add the boiled carrot and cabbage and cook gently until tender.", "22:00 — Add the ground ginger and drained noodles and toss together.", "30:00 — Serve immediately."], nutrition: { calories: "386 kcal", protein: "14.7 g", carbohydrates: "35.5 g", fat: "21.6 g", fibre: "3.6 g", sodium: "56 mg", salt: "0.14 g", potassium: "335 mg", phosphate: "126 mg" }, potassium: "Low", phosphate: "Low", purines: "Moderate", dietaryNote: "CoFID 2021 ingredient-level calculation for one serving. Potassium is below 400 mg per serving on the RenalPlan recipe-planning bands.", fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1 ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,},
  { id: "beef-meatballs-couscous-peppers", code: "D046", mealFamily: "couscous-dish", category: "Dinner", emoji: "🥩", image: "/images/recipes/D046.png", name: "Beef Meatballs with Couscous & Peppers", description: "Lean beef meatballs with couscous, softened green pepper and onion, gently seasoned with paprika.", cookingTime: "30 minutes", calories: "416 kcal", protein: "18.5 g", equipment: "Saucepan, frying pan, colander, knife, chopping board", ingredients: [
      { item: "Beef, mince, raw, extra lean", shoppingItem: "Beef mince (5% fat)", quantity: "60 g" },
      { item: "Couscous, plain, raw", shoppingItem: "Couscous", quantity: "40 g" },
      { item: "Peppers, capsicum, green, raw", shoppingItem: "Green pepper", quantity: "½ green pepper (30 g)" },
      { item: "Onions, raw", shoppingItem: "Onion", quantity: "¼ onion (20 g)" },
      { item: "Oil, olive", shoppingItem: "Olive oil", quantity: "20 g" },
      { item: "Paprika", shoppingItem: "Paprika", quantity: "¼ tsp" }
    ], method: ["00:00 — Prepare the couscous using unsalted water according to the packet instructions.", "05:00 — Mix the beef mince with paprika and form into small meatballs.", "08:00 — Cook the meatballs in the olive oil, turning regularly, until browned and completely cooked through.", "18:00 — Add the green pepper and onion and cook until softened.", "25:00 — Fluff the couscous and serve with the meatballs and vegetables.", "30:00 — Serve immediately."], nutrition: { calories: "416 kcal", protein: "18.5 g", carbohydrates: "34.1 g", fat: "23.5 g", fibre: "0.0 g", sodium: "58 mg", salt: "0.14 g", potassium: "364 mg", phosphate: "215 mg" }, potassium: "Low", phosphate: "Low", purines: "Moderate", dietaryNote: "CoFID 2021 ingredient-level calculation for one serving. Potassium is below 400 mg per serving on the RenalPlan recipe-planning bands.", fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1 ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.095450 g per serving, 0.2795% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors.",},
  { id: "haddock-lemon-rice-leeks", code: "D047", mealFamily: "rice-dish", category: "Dinner", emoji: "🐟", image: "/images/recipes/D047.png", name: "Haddock with Lemon Rice & Leeks", description: "Baked haddock with lemon basmati rice, softened leek and boiled carrot.", cookingTime: "30 minutes", calories: "445 kcal", protein: "15.9 g", equipment: "Saucepan, frying pan, colander, knife, chopping board, Oven, Baking tray", ingredients: [
      { item: "Haddock, flesh only, raw", shoppingItem: "Haddock fillet", quantity: "60 g" },
      { item: "Rice, white, basmati, raw", shoppingItem: "Basmati rice", quantity: "60 g" },
      { item: "Leeks, boiled in unsalted water", shoppingItem: "Leek", quantity: "½ leek (20 g)" },
      { item: "Carrots, old, boiled in unsalted water", shoppingItem: "Carrots", quantity: "½ carrot (20 g)" },
      { item: "Oil, olive", shoppingItem: "Olive oil", quantity: "20 g" },
      { item: "Lemon juice, fresh", shoppingItem: "Lemon juice", quantity: "10 g" }
    ], method: ["00:00 — Heat the oven to 200°C and bake the haddock until opaque and completely cooked through.", "05:00 — Cook the basmati rice in unsalted water according to the packet instructions.", "12:00 — Boil the leek and carrot in unsalted water until tender, then drain well.", "22:00 — Toss the vegetables with the olive oil and lemon juice.", "25:00 — Check the rice is tender and drain if required.", "30:00 — Serve the haddock with the rice and vegetables."], nutrition: { calories: "445 kcal", protein: "15.9 g", carbohydrates: "52.1 g", fat: "20.7 g", fibre: "1.8 g", sodium: "48 mg", salt: "0.12 g", potassium: "315 mg", phosphate: "167 mg" }, potassium: "Low", phosphate: "Low", purines: "Low", dietaryNote: "CoFID 2021 ingredient-level calculation for one serving. Potassium is below 400 mg per serving on the RenalPlan recipe-planning bands.", fluidMl: 10, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1 ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: false,},
  { id: "chicken-pear-rice-bowl", code: "D048", mealFamily: "rice-bowl", category: "Dinner", emoji: "🍐", image: "/images/recipes/D048.png", name: "Chicken & Pear Rice Bowl", description: "Chicken and basmati rice with warm pear and tender cabbage, finished with rosemary.", cookingTime: "30 minutes", calories: "467 kcal", protein: "16.7 g", equipment: "Saucepan, frying pan, colander, knife, chopping board", ingredients: [
      { item: "Chicken, meat, average, raw", shoppingItem: "Chicken breast", quantity: "50 g (raw)" },
      { item: "Rice, white, basmati, raw", shoppingItem: "Basmati rice", quantity: "60 g" },
      { item: "Pears, average, raw, flesh only", shoppingItem: "Pear", quantity: "½ pear (30 g)" },
      { item: "Cabbage, average, boiled in unsalted water", shoppingItem: "Cabbage", quantity: "⅛ cabbage (50 g)" },
      { item: "Oil, olive", shoppingItem: "Olive oil", quantity: "20 g" },
      { item: "Rosemary, dried", shoppingItem: "Dried rosemary", quantity: "¼ tsp" }
    ], method: ["00:00 — Cook the basmati rice in unsalted water according to the packet instructions.", "05:00 — Cook the chicken in the olive oil until completely cooked through.", "15:00 — Boil the cabbage in unsalted water until tender, then drain well.", "22:00 — Dice the pear and warm gently with the cabbage and rosemary.", "27:00 — Check the rice is tender and drain if required.", "30:00 — Serve the chicken with the rice and pear and cabbage mixture."], nutrition: { calories: "467 kcal", protein: "16.7 g", carbohydrates: "55.1 g", fat: "21.5 g", fibre: "2.7 g", sodium: "42 mg", salt: "0.10 g", potassium: "355 mg", phosphate: "155 mg" }, potassium: "Low", phosphate: "Low", purines: "Moderate", dietaryNote: "CoFID 2021 ingredient-level calculation for one serving. Potassium is below 400 mg per serving on the RenalPlan recipe-planning bands.", fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1 ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,},
  { id: "pork-carrot-couscous-skillet", code: "D049", mealFamily: "couscous-dish", category: "Dinner", emoji: "🥕", image: "/images/recipes/D049.png", name: "Pork & Carrot Couscous Skillet", description: "Lean pork with couscous, boiled carrot and softened leek, finished with thyme.", cookingTime: "30 minutes", calories: "383 kcal", protein: "15.1 g", equipment: "Saucepan, frying pan, colander, knife, chopping board", ingredients: [
      { item: "Pork, loin medallions, raw, lean", shoppingItem: "Lean pork loin", quantity: "40 g" },
      { item: "Couscous, plain, raw", shoppingItem: "Couscous", quantity: "40 g" },
      { item: "Carrots, old, boiled in unsalted water", shoppingItem: "Carrots", quantity: "½ carrot (20 g)" },
      { item: "Leeks, raw", shoppingItem: "Leek", quantity: "½ leek (20 g)" },
      { item: "Oil, olive", shoppingItem: "Olive oil", quantity: "20 g" },
      { item: "Thyme, dried, ground", shoppingItem: "Dried thyme", quantity: "¼ tsp" }
    ], method: ["00:00 — Prepare the couscous using unsalted water according to the packet instructions.", "05:00 — Slice the pork and cook in the olive oil until completely cooked through.", "15:00 — Boil the carrot and leek in unsalted water until tender, then drain well.", "22:00 — Add the vegetables and thyme to the pork pan and warm through.", "27:00 — Fluff the couscous and spoon the pork and vegetables over it.", "30:00 — Serve immediately."], nutrition: { calories: "383 kcal", protein: "15.1 g", carbohydrates: "33.8 g", fat: "21.7 g", fibre: "2.7 g", sodium: "24 mg", salt: "0.06 g", potassium: "357 mg", phosphate: "189 mg" }, potassium: "Low", phosphate: "Low", purines: "Moderate", dietaryNote: "CoFID 2021 ingredient-level calculation for one serving. Potassium is below 400 mg per serving on the RenalPlan recipe-planning bands.", fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1 ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,},
  { id: "cod-leek-pasta-bake", code: "D050", mealFamily: "pasta-bake", category: "Dinner", emoji: "🐟", image: "/images/recipes/D050.png", name: "Cod & Leek Pasta Bake", description: "Flaked cod and white pasta baked with softened leek and cabbage, finished with parsley and olive oil.", cookingTime: "30 minutes", calories: "374 kcal", protein: "16.0 g", equipment: "Saucepan, frying pan, colander, knife, chopping board, Oven, Baking dish", ingredients: [
      { item: "Cod, flesh only, baked", shoppingItem: "Cod fillet", quantity: "45 g" },
      { item: "Pasta, white, dried, raw", shoppingItem: "White pasta", quantity: "40 g" },
      { item: "Leeks, raw", shoppingItem: "Leek", quantity: "½ leek (20 g)" },
      { item: "Cabbage, average, boiled in unsalted water", shoppingItem: "Cabbage", quantity: "⅛ cabbage (40 g)" },
      { item: "Oil, olive", shoppingItem: "Olive oil", quantity: "20 g" },
      { item: "Parsley, dried", shoppingItem: "Dried parsley", quantity: "¼ tsp" }
    ], method: ["00:00 — Heat the oven to 200°C.", "02:00 — Cook the pasta in unsalted water according to the packet instructions, then drain thoroughly.", "10:00 — Bake the cod until opaque and completely cooked through, then flake into large pieces.", "15:00 — Boil the leek and cabbage in unsalted water until tender, then drain well.", "20:00 — Combine the pasta, vegetables and cod with the olive oil and parsley in a baking dish.", "25:00 — Bake until hot throughout.", "30:00 — Serve immediately."], nutrition: { calories: "374 kcal", protein: "16.0 g", carbohydrates: "32.2 g", fat: "21.0 g", fibre: "1.4 g", sodium: "44 mg", salt: "0.11 g", potassium: "378 mg", phosphate: "171 mg" }, potassium: "Low", phosphate: "Low", purines: "Low", dietaryNote: "CoFID 2021 ingredient-level calculation for one serving. Potassium is below 400 mg per serving on the RenalPlan recipe-planning bands.", fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1 ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,},
  { id: "turkey-apple-noodle-bowl", code: "D051", mealFamily: "noodle-bowl", category: "Dinner", emoji: "🍎", image: "/images/recipes/D051.png", name: "Turkey & Apple Noodle Bowl", description: "Turkey and plain noodles with apple and cucumber, finished with ginger and olive oil.", cookingTime: "30 minutes", calories: "387 kcal", protein: "15.6 g", equipment: "Saucepan, frying pan, colander, knife, chopping board", ingredients: [
      { item: "Turkey, light meat, raw", shoppingItem: "Turkey breast", quantity: "50 g (raw)" },
      { item: "Noodles, rice, fine, dried, boiled in unsalted water", shoppingItem: "Rice noodles", quantity: "150 g (cooked)" },
      { item: "Apples, eating, raw, flesh and skin", shoppingItem: "Apple", quantity: "⅜ apple (30 g)" },
      { item: "Cucumber, raw, flesh and skin", shoppingItem: "Cucumber", quantity: "¼ cucumber (30 g)" },
      { item: "Oil, olive", shoppingItem: "Olive oil", quantity: "20 g" },
      { item: "Ginger, ground", shoppingItem: "Ground ginger", quantity: "¼ tsp" }
    ], method: ["00:00 — Cook the noodles in unsalted water according to the packet instructions, then drain thoroughly.", "05:00 — Slice the turkey and cook in the olive oil until completely cooked through.", "18:00 — Add the diced apple and cook gently until just softened.", "23:00 — Toss the turkey and apple through the noodles with the cucumber and ground ginger.", "30:00 — Serve immediately."], nutrition: { calories: "387 kcal", protein: "15.6 g", carbohydrates: "36.1 g", fat: "21.0 g", fibre: "2.3 g", sodium: "33 mg", salt: "0.08 g", potassium: "266 mg", phosphate: "154 mg" }, potassium: "Low", phosphate: "Low", purines: "Low", dietaryNote: "CoFID 2021 ingredient-level calculation for one serving. Potassium is below 400 mg per serving on the RenalPlan recipe-planning bands.", fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1 ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,},
  { id: "chicken-herb-meatballs-rice", code: "D052", mealFamily: "meatballs-rice", category: "Dinner", emoji: "🍗", image: "/images/recipes/D052.png", name: "Chicken Herb Meatballs with Rice", description: "Chicken herb meatballs with basmati rice, tender cabbage and carrot, finished with parsley.", cookingTime: "30 minutes", calories: "459 kcal", protein: "16.7 g", equipment: "Saucepan, frying pan, colander, knife, chopping board", ingredients: [
      { item: "Chicken, meat, average, raw", shoppingItem: "Chicken breast", quantity: "50 g (raw)" },
      { item: "Rice, white, basmati, raw", shoppingItem: "Basmati rice", quantity: "60 g" },
      { item: "Cabbage, average, boiled in unsalted water", shoppingItem: "Cabbage", quantity: "⅛ cabbage (50 g)" },
      { item: "Carrots, old, boiled in unsalted water", shoppingItem: "Carrots", quantity: "½ carrot (20 g)" },
      { item: "Oil, olive", shoppingItem: "Olive oil", quantity: "20 g" },
      { item: "Parsley, dried", shoppingItem: "Dried parsley", quantity: "¼ tsp" }
    ], method: ["00:00 — Cook the basmati rice in unsalted water according to the packet instructions.", "05:00 — Finely mince the chicken and mix with the parsley. Form into small meatballs.", "08:00 — Cook the meatballs in the olive oil, turning regularly, until completely cooked through.", "18:00 — Boil the cabbage and carrot in unsalted water until tender, then drain well.", "25:00 — Check the rice is tender and drain if required.", "30:00 — Serve the meatballs with the rice and vegetables."], nutrition: { calories: "459 kcal", protein: "16.7 g", carbohydrates: "52.8 g", fat: "21.5 g", fibre: "2.3 g", sodium: "48 mg", salt: "0.12 g", potassium: "361 mg", phosphate: "156 mg" }, potassium: "Low", phosphate: "Low", purines: "Moderate", dietaryNote: "CoFID 2021 ingredient-level calculation for one serving. Potassium is below 400 mg per serving on the RenalPlan recipe-planning bands.", fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1 ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,},
  // International recipes: nutrition is per serving; ingredient quantities make two servings.
  {
    "id": "chicken-biryani-with-fragrant-basmati-rice",
    "code": "D053",
    "category": "Dinner",
    "mealFamily": "biryani",
    "cuisine": "indian",
    "emoji": "🍽️",
    "image": "/images/recipes/D053.webp",
    "name": "Chicken biryani with fragrant basmati rice",
    "description": "Parboiled layered rice finished under a tight lid with cooked chicken masala; distinct from curry served beside plain rice.",
    "cookingTime": "110 minutes elapsed (development timing)",
    "calories": "967 kcal",
    "protein": "55.1 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Skinless boneless chicken thigh",
        "shoppingItem": "Skinless boneless chicken thigh",
        "quantity": "380 g (chicken masala; raw edible input)"
      },
      {
        "item": "Plain whole-milk yoghurt",
        "shoppingItem": "Plain whole-milk yoghurt",
        "quantity": "120 g (chicken masala; as sold)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "180 g (chicken masala; raw edible input)"
      },
      {
        "item": "Fresh tomato",
        "shoppingItem": "Fresh tomato",
        "quantity": "180 g (chicken masala; raw edible input)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "14 g (chicken masala; raw edible input)"
      },
      {
        "item": "Fresh ginger",
        "shoppingItem": "Fresh ginger",
        "quantity": "16 g (chicken masala; raw edible input)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "40 g (chicken masala; as sold, weighed grams)"
      },
      {
        "item": "Ground cumin",
        "shoppingItem": "Ground cumin",
        "quantity": "2 g (chicken masala; dry)"
      },
      {
        "item": "Ground coriander seed",
        "shoppingItem": "Ground coriander seed",
        "quantity": "3 g (chicken masala; dry)"
      },
      {
        "item": "Ground turmeric",
        "shoppingItem": "Ground turmeric",
        "quantity": "1 g (chicken masala; dry)"
      },
      {
        "item": "Pure cayenne chilli powder",
        "shoppingItem": "Pure cayenne chilli powder",
        "quantity": "1 g (chicken masala; dry)"
      },
      {
        "item": "Ground cinnamon",
        "shoppingItem": "Ground cinnamon",
        "quantity": "0.5 g (chicken masala; dry)"
      },
      {
        "item": "Ground cardamom",
        "shoppingItem": "Ground cardamom",
        "quantity": "0.5 g (chicken masala; dry)"
      },
      {
        "item": "Ground cloves",
        "shoppingItem": "Ground cloves",
        "quantity": "0.2 g (chicken masala; dry)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "1.4 g (chicken masala; dry)"
      },
      {
        "item": "White basmati rice",
        "shoppingItem": "White basmati rice",
        "quantity": "220 g (layered rice; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "200 g (layered rice; weighed recipe water)"
      },
      {
        "item": "Unsalted butter",
        "shoppingItem": "Unsalted butter",
        "quantity": "20 g (layered rice; as sold)"
      },
      {
        "item": "Fresh mint",
        "shoppingItem": "Fresh mint",
        "quantity": "15 g (layered rice; raw edible leaves)"
      },
      {
        "item": "Fresh coriander leaves",
        "shoppingItem": "Fresh coriander leaves",
        "quantity": "15 g (layered rice; raw edible input)"
      },
      {
        "item": "Saffron",
        "shoppingItem": "Saffron",
        "quantity": "0.2 g (layered rice; dry)"
      }
    ],
    "method": [
      "Cut chicken into 3 cm pieces and marinate refrigerated in yoghurt, garlic, ginger, turmeric, coriander, chilli and half the salt for 30 minutes. Soak saffron in 20 g of the listed 200 g finishing water.",
      "Thinly slice onion and cook in 40 g oil for 15-20 minutes until deeply golden, stirring. Reserve one third. Add cumin, cinnamon, cardamom and cloves to the pan, then chicken with its full marinade and chopped tomato. Cook 20-25 minutes until the chicken is safely cooked and the sauce thick but moist.",
      "Parboil the 220 g rice in 1800 g unsalted process water for about 5 minutes, until the outside softens but a firm centre remains. Drain. This input-weight calculation takes no credit for nutrient loss in drained water.",
      "In a close-fitting heavy pot layer half the chicken sauce, half the rice and half the herbs, then repeat. Top with reserved onion, butter, saffron water and the remaining 180 g finishing water. Cover tightly with a lid and cook on the lowest heat for 15-20 minutes, then rest 10 minutes.",
      "Check rice is tender and the centre is steaming hot. Fold gently to preserve distinct grains and layers. Divide chicken, rice, sauce and garnish equally between two substantial portions.",
      "Cook poultry, minced meats and mixed meat fillings to a clean-probe centre temperature of 75 C for at least 30 seconds. Cook fish and pork safely throughout; times alone do not establish doneness. Do not wash raw poultry. Fully set eggs. Source: https://www.food.gov.uk/safety-hygiene/cooking-your-food"
    ],
    "nutrition": {
      "calories": "967 kcal",
      "protein": "55.1 g",
      "carbohydrates": "?",
      "fat": "36.9 g",
      "fibre": "6.3 g",
      "sodium": "509 mg",
      "potassium": "1525 mg",
      "phosphate": "504 mg",
      "salt": "1.27 g"
    },
    "potassium": "Pending review",
    "phosphate": "Pending review",
    "purines": "Pending review",
    "dietaryNote": "Development estimate requiring individual whole-day review; see guide dossier. No universal stage or dialysis suitability claim.",
    "nutritionBasis": "CoFID ingredient-input estimate",
    "nutritionIncomplete": [
      "carbohydrates"
    ],
    "nutritionSourceNote": "Ingredient-input estimates with nutrient-specific supplements and explicit unknowns. CoFID carbohydrate expressed as monosaccharides; alternatives not mixed into totals. See evidence/D053/summary.json.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 2
  },
  {
    "id": "chicken-jalfrezi-with-chapati",
    "code": "D054",
    "category": "Dinner",
    "mealFamily": "curry-flatbread",
    "cuisine": "indian",
    "emoji": "🍽️",
    "image": "/images/recipes/D054.webp",
    "name": "Chicken jalfrezi with chapati",
    "description": "Late high-heat peppers and onion retain texture in jalfrezi; handmade chapatis differ from rice-based curries.",
    "cookingTime": "65 minutes elapsed (development timing)",
    "calories": "944 kcal",
    "protein": "61.4 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Skinless boneless chicken breast",
        "shoppingItem": "Skinless boneless chicken breast",
        "quantity": "380 g (jalfrezi; raw edible input)"
      },
      {
        "item": "Red bell pepper",
        "shoppingItem": "Red bell pepper",
        "quantity": "220 g (jalfrezi; raw edible input)"
      },
      {
        "item": "Green bell pepper",
        "shoppingItem": "Green bell pepper",
        "quantity": "140 g (jalfrezi; raw edible input)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "160 g (jalfrezi; raw edible input)"
      },
      {
        "item": "Fresh tomato",
        "shoppingItem": "Fresh tomato",
        "quantity": "300 g (jalfrezi; raw edible input)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "14 g (jalfrezi; raw edible input)"
      },
      {
        "item": "Fresh ginger",
        "shoppingItem": "Fresh ginger",
        "quantity": "18 g (jalfrezi; raw edible input)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "45 g (jalfrezi; as sold, weighed grams)"
      },
      {
        "item": "Ground cumin",
        "shoppingItem": "Ground cumin",
        "quantity": "3 g (jalfrezi; dry)"
      },
      {
        "item": "Ground coriander seed",
        "shoppingItem": "Ground coriander seed",
        "quantity": "3 g (jalfrezi; dry)"
      },
      {
        "item": "Ground turmeric",
        "shoppingItem": "Ground turmeric",
        "quantity": "1 g (jalfrezi; dry)"
      },
      {
        "item": "Fresh green chilli flesh",
        "shoppingItem": "Fresh green chilli flesh",
        "quantity": "8 g (jalfrezi; raw edible input)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "1.5 g (jalfrezi; dry)"
      },
      {
        "item": "Fresh coriander leaves",
        "shoppingItem": "Fresh coriander leaves",
        "quantity": "15 g (jalfrezi; raw edible input)"
      },
      {
        "item": "Brown chapati flour",
        "shoppingItem": "Brown chapati flour",
        "quantity": "220 g (chapatis; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "145 g (chapatis; weighed recipe water)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "15 g (chapatis; as sold, weighed grams)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.6 g (chapatis; dry)"
      }
    ],
    "method": [
      "Mix chapati flour, 145 g water, 15 g oil and chapati salt. Knead 7 minutes and rest covered for 20 minutes. Slice chicken into strips and peppers and onion into thick batons.",
      "Use 20 g curry oil to stir-fry the pepper and half the onion over high heat for 4-5 minutes, retaining some bite. Remove to a bowl with their oil.",
      "Heat remaining 25 g oil; cook remaining onion 7 minutes, then garlic, ginger, cumin, coriander, turmeric and green chilli for 1 minute. Add chopped tomato and curry salt; reduce for 10-12 minutes.",
      "Add chicken and cook 10-12 minutes until safely cooked. Return the crisp peppers and onion for 2 minutes, then add coriander. Keep a thick clinging sauce rather than a long braise.",
      "Divide dough into four, roll thinly without extra flour, and griddle dry for 1-2 minutes per side until puffed and cooked through. Serve two chapatis and half the complete curry per person.",
      "Cook poultry, minced meats and mixed meat fillings to a clean-probe centre temperature of 75 C for at least 30 seconds. Cook fish and pork safely throughout; times alone do not establish doneness. Do not wash raw poultry. Fully set eggs. Source: https://www.food.gov.uk/safety-hygiene/cooking-your-food"
    ],
    "nutrition": {
      "calories": "944 kcal",
      "protein": "61.4 g",
      "carbohydrates": "?",
      "fat": "35.6 g",
      "fibre": "17.1 g",
      "sodium": "560 mg",
      "potassium": "1968 mg",
      "phosphate": "960 mg",
      "salt": "1.40 g"
    },
    "potassium": "Pending review",
    "phosphate": "Pending review",
    "purines": "Pending review",
    "dietaryNote": "Development estimate requiring individual whole-day review; see guide dossier. No universal stage or dialysis suitability claim.",
    "nutritionBasis": "CoFID ingredient-input estimate",
    "nutritionIncomplete": [
      "carbohydrates"
    ],
    "nutritionSourceNote": "Ingredient-input estimates with nutrient-specific supplements and explicit unknowns. CoFID carbohydrate expressed as monosaccharides; alternatives not mixed into totals. See evidence/D054/summary.json.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 2
  },
  {
    "id": "lamb-rogan-josh-with-rice",
    "code": "D055",
    "category": "Dinner",
    "mealFamily": "lamb-braise",
    "cuisine": "indian",
    "emoji": "🍽️",
    "image": "/images/recipes/D055.webp",
    "name": "Lamb rogan josh with rice",
    "description": "Long shoulder braise with fennel, yoghurt and red chilli character; paprika-cayenne blend is a disclosed alternative to a named Kashmiri chilli powder.",
    "cookingTime": "155 minutes elapsed (development timing)",
    "calories": "1172 kcal",
    "protein": "51.0 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Boneless lamb shoulder, lean and edible fat",
        "shoppingItem": "Boneless lamb shoulder, lean and edible fat",
        "quantity": "400 g (rogan josh; raw edible input)"
      },
      {
        "item": "Plain whole-milk yoghurt",
        "shoppingItem": "Plain whole-milk yoghurt",
        "quantity": "160 g (rogan josh; as sold)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "180 g (rogan josh; raw edible input)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "12 g (rogan josh; raw edible input)"
      },
      {
        "item": "Fresh ginger",
        "shoppingItem": "Fresh ginger",
        "quantity": "20 g (rogan josh; raw edible input)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "35 g (rogan josh; as sold, weighed grams)"
      },
      {
        "item": "Sweet paprika",
        "shoppingItem": "Sweet paprika",
        "quantity": "7 g (rogan josh; dry)"
      },
      {
        "item": "Pure cayenne chilli powder",
        "shoppingItem": "Pure cayenne chilli powder",
        "quantity": "0.8 g (rogan josh; dry)"
      },
      {
        "item": "Ground fennel seed",
        "shoppingItem": "Ground fennel seed",
        "quantity": "3 g (rogan josh; dry)"
      },
      {
        "item": "Ground cumin",
        "shoppingItem": "Ground cumin",
        "quantity": "2 g (rogan josh; dry)"
      },
      {
        "item": "Ground coriander seed",
        "shoppingItem": "Ground coriander seed",
        "quantity": "3 g (rogan josh; dry)"
      },
      {
        "item": "Ground cinnamon",
        "shoppingItem": "Ground cinnamon",
        "quantity": "0.6 g (rogan josh; dry)"
      },
      {
        "item": "Ground cardamom",
        "shoppingItem": "Ground cardamom",
        "quantity": "0.5 g (rogan josh; dry)"
      },
      {
        "item": "Ground cloves",
        "shoppingItem": "Ground cloves",
        "quantity": "0.2 g (rogan josh; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "350 g (rogan josh; weighed recipe water)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "1.5 g (rogan josh; dry)"
      },
      {
        "item": "White basmati rice",
        "shoppingItem": "White basmati rice",
        "quantity": "210 g (rice; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "378 g (rice; weighed recipe water)"
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
      }
    ],
    "method": [
      "Trim bone and large external fat before weighing lamb, retaining the edible lean-and-fat shoulder specified. Cut into 3 cm cubes. Brown in 20 g curry oil in batches, retaining the meat juices.",
      "Add remaining 15 g curry oil and sliced onion; cook 12 minutes until golden. Stir in ginger, garlic and ground spices briefly off the strongest heat so paprika does not burn.",
      "Return lamb, add yoghurt one spoonful at a time while stirring, then curry water and salt. Bring to a gentle simmer, cover and braise 90-120 minutes until lamb is tender. Stir every 20 minutes; add only further weighed water if needed and record the revision.",
      "Cook the rice component in its measured water, oil and salt in a close-fitting saucepan: bring to a simmer, cover on the lowest heat for 12-15 minutes, then rest off the heat for 10 minutes. Do not drain. Divide the complete cooked rice equally.",
      "Uncover the lamb for 10 minutes to reduce the red aromatic sauce if needed. Serve half the lamb and all its sauce with half the rice each. This is an onion-yoghurt home adaptation, not a claim of one Kashmiri ceremonial formulation.",
      "Cook poultry, minced meats and mixed meat fillings to a clean-probe centre temperature of 75 C for at least 30 seconds. Cook fish and pork safely throughout; times alone do not establish doneness. Do not wash raw poultry. Fully set eggs. Source: https://www.food.gov.uk/safety-hygiene/cooking-your-food"
    ],
    "nutrition": {
      "calories": "1172 kcal",
      "protein": "51.0 g",
      "carbohydrates": "?",
      "fat": "63.5 g",
      "fibre": "6.4 g",
      "sodium": "614 mg",
      "potassium": "1224 mg",
      "phosphate": "628 mg",
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
    "nutritionSourceNote": "Ingredient-input estimates with nutrient-specific supplements and explicit unknowns. CoFID carbohydrate expressed as monosaccharides; alternatives not mixed into totals. See evidence/D055/summary.json.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 2
  },
  {
    "id": "tandoori-style-fish-with-lemon-pilau",
    "code": "D056",
    "category": "Dinner",
    "mealFamily": "fish-pilau",
    "cuisine": "indian",
    "emoji": "🍽️",
    "image": "/images/recipes/D056.webp",
    "name": "Tandoori-style fish with lemon pilau",
    "description": "High-heat yoghurt-spiced fish with toasted-spice lemon pilau, not the green herb chermoula or coconut curry.",
    "cookingTime": "75 minutes elapsed (development timing)",
    "calories": "846 kcal",
    "protein": "50.2 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Cod fillet, flesh only",
        "shoppingItem": "Cod fillet, flesh only",
        "quantity": "400 g (tandoori fish; raw edible input)"
      },
      {
        "item": "Plain whole-milk yoghurt",
        "shoppingItem": "Plain whole-milk yoghurt",
        "quantity": "140 g (tandoori fish; as sold)"
      },
      {
        "item": "Fresh lemon juice",
        "shoppingItem": "Fresh lemon juice",
        "quantity": "35 g (tandoori fish; freshly squeezed, weighed grams)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "12 g (tandoori fish; raw edible input)"
      },
      {
        "item": "Fresh ginger",
        "shoppingItem": "Fresh ginger",
        "quantity": "16 g (tandoori fish; raw edible input)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "25 g (tandoori fish; as sold, weighed grams)"
      },
      {
        "item": "Ground cumin",
        "shoppingItem": "Ground cumin",
        "quantity": "2 g (tandoori fish; dry)"
      },
      {
        "item": "Ground coriander seed",
        "shoppingItem": "Ground coriander seed",
        "quantity": "3 g (tandoori fish; dry)"
      },
      {
        "item": "Sweet paprika",
        "shoppingItem": "Sweet paprika",
        "quantity": "4 g (tandoori fish; dry)"
      },
      {
        "item": "Ground turmeric",
        "shoppingItem": "Ground turmeric",
        "quantity": "1 g (tandoori fish; dry)"
      },
      {
        "item": "Pure cayenne chilli powder",
        "shoppingItem": "Pure cayenne chilli powder",
        "quantity": "0.6 g (tandoori fish; dry)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "1.2 g (tandoori fish; dry)"
      },
      {
        "item": "White basmati rice",
        "shoppingItem": "White basmati rice",
        "quantity": "220 g (lemon pilau; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "396 g (lemon pilau; weighed recipe water)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "100 g (lemon pilau; raw edible input)"
      },
      {
        "item": "Unsalted butter",
        "shoppingItem": "Unsalted butter",
        "quantity": "25 g (lemon pilau; as sold)"
      },
      {
        "item": "Ground cumin",
        "shoppingItem": "Ground cumin",
        "quantity": "1 g (lemon pilau; dry)"
      },
      {
        "item": "Ground cardamom",
        "shoppingItem": "Ground cardamom",
        "quantity": "0.4 g (lemon pilau; dry)"
      },
      {
        "item": "Fresh lemon juice",
        "shoppingItem": "Fresh lemon juice",
        "quantity": "25 g (lemon pilau; freshly squeezed, weighed grams)"
      },
      {
        "item": "Fresh coriander leaves",
        "shoppingItem": "Fresh coriander leaves",
        "quantity": "15 g (lemon pilau; raw edible input)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.6 g (lemon pilau; dry)"
      }
    ],
    "method": [
      "Mix yoghurt with fish lemon, garlic, ginger, oil, spices and fish salt. Coat thick cod pieces and refrigerate 20 minutes. Longer acidic marination would soften the fish excessively.",
      "Soften finely sliced pilau onion in butter for 8 minutes. Add cumin, cardamom and rice, stir 1 minute, then add pilau water and salt. Cover and cook gently 12-15 minutes; rest 10 minutes before folding in pilau lemon and coriander.",
      "Heat oven to 230 C conventional or 210 C fan. Put fish and all marinade in a shallow lined dish. Roast 12-18 minutes until cooked through. Briefly grill to brown the yoghurt coating without drying the fish.",
      "Heat any liquid raw-contact marinade thoroughly. Serve half the fish, complete cooked coating and juices, and half the lemon pilau per person.",
      "Cook poultry, minced meats and mixed meat fillings to a clean-probe centre temperature of 75 C for at least 30 seconds. Cook fish and pork safely throughout; times alone do not establish doneness. Do not wash raw poultry. Fully set eggs. Source: https://www.food.gov.uk/safety-hygiene/cooking-your-food"
    ],
    "nutrition": {
      "calories": "846 kcal",
      "protein": "50.2 g",
      "carbohydrates": "?",
      "fat": "27.8 g",
      "fibre": "4.6 g",
      "sodium": "605 mg",
      "potassium": "1261 mg",
      "phosphate": "624 mg",
      "salt": "1.51 g"
    },
    "potassium": "Pending review",
    "phosphate": "Pending review",
    "purines": "Pending review",
    "dietaryNote": "Development estimate requiring individual whole-day review; see guide dossier. No universal stage or dialysis suitability claim.",
    "nutritionBasis": "CoFID ingredient-input estimate",
    "nutritionIncomplete": [
      "carbohydrates"
    ],
    "nutritionSourceNote": "Ingredient-input estimates with nutrient-specific supplements and explicit unknowns. CoFID carbohydrate expressed as monosaccharides; alternatives not mixed into totals. See evidence/D056/summary.json.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 2
  },
  {
    "id": "chicken-karahi-with-homemade-flatbread",
    "code": "D057",
    "category": "Dinner",
    "mealFamily": "karahi-flatbread",
    "cuisine": "pakistani",
    "emoji": "🍽️",
    "image": "/images/recipes/D057.webp",
    "name": "Chicken karahi with homemade flatbread",
    "description": "Wide-pan tomato reduction with a fresh ginger and chilli finish defines karahi rather than a generic cream curry.",
    "cookingTime": "75 minutes elapsed (development timing)",
    "calories": "966 kcal",
    "protein": "55.3 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Skinless boneless chicken thigh",
        "shoppingItem": "Skinless boneless chicken thigh",
        "quantity": "400 g (karahi; raw edible input)"
      },
      {
        "item": "Fresh tomato",
        "shoppingItem": "Fresh tomato",
        "quantity": "500 g (karahi; raw edible input)"
      },
      {
        "item": "Fresh ginger",
        "shoppingItem": "Fresh ginger",
        "quantity": "30 g (karahi; raw edible input)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "18 g (karahi; raw edible input)"
      },
      {
        "item": "Fresh green chilli flesh",
        "shoppingItem": "Fresh green chilli flesh",
        "quantity": "10 g (karahi; raw edible input)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "50 g (karahi; as sold, weighed grams)"
      },
      {
        "item": "Ground cumin",
        "shoppingItem": "Ground cumin",
        "quantity": "3 g (karahi; dry)"
      },
      {
        "item": "Ground coriander seed",
        "shoppingItem": "Ground coriander seed",
        "quantity": "3 g (karahi; dry)"
      },
      {
        "item": "Ground black pepper",
        "shoppingItem": "Ground black pepper",
        "quantity": "1 g (karahi; dry)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "1.5 g (karahi; dry)"
      },
      {
        "item": "Fresh coriander leaves",
        "shoppingItem": "Fresh coriander leaves",
        "quantity": "18 g (karahi; raw edible input)"
      },
      {
        "item": "Plain white flour",
        "shoppingItem": "Plain white flour",
        "quantity": "230 g (flatbread; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "128.8 g (flatbread; weighed recipe water)"
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
      }
    ],
    "method": [
      "Mix the flatbread flour, water, oil and salt; knead 5 minutes and cover for 20 minutes. Divide in two, roll on reusable baking paper without extra flour, and cook in a hot dry heavy pan for 2-3 minutes per side until cooked through. Serve one per person.",
      "Cut chicken into 3 cm pieces. Reserve 10 g ginger as very fine matchsticks; grate the rest with garlic. Chop tomato finely without discarding seeds or juice.",
      "Heat curry oil in a wide karahi or heavy wok over medium-high heat. Cook chicken for 6-8 minutes, turning, then add grated ginger and garlic for 1 minute. Add tomato and salt; cover and simmer 12-15 minutes.",
      "Uncover, add cumin, coriander and pepper and cook briskly for 10-15 minutes, stirring until tomato forms a concentrated coating and chicken is safely cooked. Add green chilli halfway through this reduction.",
      "Finish with reserved ginger and fresh coriander. Serve half the chicken, all reduced tomato and oil, and one flatbread each. No onion, coconut milk or commercial curry paste is introduced.",
      "Cook poultry, minced meats and mixed meat fillings to a clean-probe centre temperature of 75 C for at least 30 seconds. Cook fish and pork safely throughout; times alone do not establish doneness. Do not wash raw poultry. Fully set eggs. Source: https://www.food.gov.uk/safety-hygiene/cooking-your-food"
    ],
    "nutrition": {
      "calories": "966 kcal",
      "protein": "55.3 g",
      "carbohydrates": "?",
      "fat": "39.3 g",
      "fibre": "8.8 g",
      "sodium": "649 mg",
      "potassium": "1768 mg",
      "phosphate": "449 mg",
      "salt": "1.62 g"
    },
    "potassium": "Pending review",
    "phosphate": "Pending review",
    "purines": "Pending review",
    "dietaryNote": "Development estimate requiring individual whole-day review; see guide dossier. No universal stage or dialysis suitability claim.",
    "nutritionBasis": "CoFID ingredient-input estimate",
    "nutritionIncomplete": [
      "carbohydrates"
    ],
    "nutritionSourceNote": "Ingredient-input estimates with nutrient-specific supplements and explicit unknowns. CoFID carbohydrate expressed as monosaccharides; alternatives not mixed into totals. See evidence/D057/summary.json.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 2
  },
  {
    "id": "coconut-fish-curry-with-rice",
    "code": "D058",
    "category": "Dinner",
    "mealFamily": "coconut-fish-curry",
    "cuisine": "south-indian",
    "emoji": "🍽️",
    "image": "/images/recipes/D058.webp",
    "name": "Coconut fish curry with rice",
    "description": "South Indian mustard-curry-leaf tempering and tamarind-coconut fish sauce remain distinct from tandoori and harissa fish.",
    "cookingTime": "60 minutes elapsed (development timing)",
    "calories": "1043 kcal",
    "protein": "48.4 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Haddock fillet, unsmoked",
        "shoppingItem": "Haddock fillet, unsmoked",
        "quantity": "400 g (fish curry; raw edible input)"
      },
      {
        "item": "Full-fat canned coconut milk",
        "shoppingItem": "Full-fat canned coconut milk",
        "quantity": "300 g (fish curry; as sold, weighed grams)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "140 g (fish curry; raw edible input)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "12 g (fish curry; raw edible input)"
      },
      {
        "item": "Fresh ginger",
        "shoppingItem": "Fresh ginger",
        "quantity": "15 g (fish curry; raw edible input)"
      },
      {
        "item": "Fresh curry leaves, finely sliced",
        "shoppingItem": "Fresh curry leaves, finely sliced",
        "quantity": "3 g (fish curry; raw edible leaves, stems removed)"
      },
      {
        "item": "Mustard seeds",
        "shoppingItem": "Mustard seeds",
        "quantity": "3 g (fish curry; dry)"
      },
      {
        "item": "Ground turmeric",
        "shoppingItem": "Ground turmeric",
        "quantity": "1.5 g (fish curry; dry)"
      },
      {
        "item": "Fresh red chilli flesh",
        "shoppingItem": "Fresh red chilli flesh",
        "quantity": "10 g (fish curry; raw edible input)"
      },
      {
        "item": "Seed-free unsweetened tamarind flesh",
        "shoppingItem": "Seed-free unsweetened tamarind flesh",
        "quantity": "20 g (fish curry; edible flesh, no sweetened concentrate)"
      },
      {
        "item": "Coconut oil",
        "shoppingItem": "Coconut oil",
        "quantity": "30 g (fish curry; as sold)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "160 g (fish curry; weighed recipe water)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "1.5 g (fish curry; dry)"
      },
      {
        "item": "White basmati rice",
        "shoppingItem": "White basmati rice",
        "quantity": "220 g (rice; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "396 g (rice; weighed recipe water)"
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
      }
    ],
    "method": [
      "Cook the rice component in its measured water, oil and salt in a close-fitting saucepan: bring to a simmer, cover on the lowest heat for 12-15 minutes, then rest off the heat for 10 minutes. Do not drain. Divide the complete cooked rice equally.",
      "Mash seed-free tamarind flesh into the 160 g curry water, retaining the pulp. Slice onion, chilli, curry leaves, ginger and garlic finely. Cut haddock into large 4 cm pieces.",
      "Heat coconut oil in a lidded pan. Add mustard seeds until they begin popping, then curry leaves, onion, ginger, garlic and chilli; soften 7-8 minutes. Stir in turmeric for 20 seconds.",
      "Add tamarind water, coconut milk and curry salt. Simmer gently for 8 minutes without hard boiling, then lower fish into the sauce and cook gently 8-12 minutes until safely cooked and flaking.",
      "Serve half the rice and complete fish curry each, including finely sliced curry leaves. Coconut K/P remains a conditional generic canned proxy; no nutrient reduction is assumed from acid or simmering.",
      "Cook poultry, minced meats and mixed meat fillings to a clean-probe centre temperature of 75 C for at least 30 seconds. Cook fish and pork safely throughout; times alone do not establish doneness. Do not wash raw poultry. Fully set eggs. Source: https://www.food.gov.uk/safety-hygiene/cooking-your-food"
    ],
    "nutrition": {
      "calories": "1043 kcal",
      "protein": "48.4 g",
      "carbohydrates": "?",
      "fat": "47.4 g",
      "fibre": "4.8 g",
      "sodium": "557 mg",
      "potassium": "1283 mg",
      "phosphate": "639 mg",
      "salt": "1.39 g"
    },
    "potassium": "Pending review",
    "phosphate": "Pending review",
    "purines": "Pending review",
    "dietaryNote": "Development estimate requiring individual whole-day review; see guide dossier. No universal stage or dialysis suitability claim.",
    "nutritionBasis": "CoFID ingredient-input estimate",
    "nutritionIncomplete": [
      "carbohydrates"
    ],
    "nutritionSourceNote": "Ingredient-input estimates with nutrient-specific supplements and explicit unknowns. CoFID carbohydrate expressed as monosaccharides; alternatives not mixed into totals. See evidence/D058/summary.json.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 2
  },
  {
    "id": "chicken-shish-tawook-with-vermicelli-rice",
    "code": "D059",
    "category": "Dinner",
    "mealFamily": "skewer-rice-plate",
    "cuisine": "lebanese",
    "emoji": "🍽️",
    "image": "/images/recipes/D059.webp",
    "name": "Chicken shish tawook with vermicelli rice",
    "description": "Garlicky yoghurt-tomato skewers and browned vermicelli rice distinguish shish tawook from lemon-oregano souvlaki.",
    "cookingTime": "105 minutes elapsed (development timing)",
    "calories": "1012 kcal",
    "protein": "65.5 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Skinless boneless chicken breast",
        "shoppingItem": "Skinless boneless chicken breast",
        "quantity": "400 g (tawook; raw edible input)"
      },
      {
        "item": "Plain whole-milk yoghurt",
        "shoppingItem": "Plain whole-milk yoghurt",
        "quantity": "140 g (tawook; as sold)"
      },
      {
        "item": "Fresh lemon juice",
        "shoppingItem": "Fresh lemon juice",
        "quantity": "35 g (tawook; freshly squeezed, weighed grams)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "18 g (tawook; raw edible input)"
      },
      {
        "item": "Tomato puree",
        "shoppingItem": "Tomato puree",
        "quantity": "25 g (tawook; as sold)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "30 g (tawook; as sold, weighed grams)"
      },
      {
        "item": "Sweet paprika",
        "shoppingItem": "Sweet paprika",
        "quantity": "3 g (tawook; dry)"
      },
      {
        "item": "Dried oregano",
        "shoppingItem": "Dried oregano",
        "quantity": "1 g (tawook; dry)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "1.2 g (tawook; dry)"
      },
      {
        "item": "White basmati rice",
        "shoppingItem": "White basmati rice",
        "quantity": "190 g (vermicelli rice; dry)"
      },
      {
        "item": "Fine dry wheat vermicelli",
        "shoppingItem": "Fine dry wheat vermicelli",
        "quantity": "45 g (vermicelli rice; dry)"
      },
      {
        "item": "Unsalted butter",
        "shoppingItem": "Unsalted butter",
        "quantity": "25 g (vermicelli rice; as sold)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "445 g (vermicelli rice; weighed recipe water)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.7 g (vermicelli rice; dry)"
      },
      {
        "item": "Cucumber",
        "shoppingItem": "Cucumber",
        "quantity": "180 g (side; raw edible input)"
      },
      {
        "item": "Fresh tomato",
        "shoppingItem": "Fresh tomato",
        "quantity": "180 g (side; raw edible input)"
      },
      {
        "item": "Fresh parsley",
        "shoppingItem": "Fresh parsley",
        "quantity": "15 g (side; raw edible input)"
      },
      {
        "item": "Fresh lemon juice",
        "shoppingItem": "Fresh lemon juice",
        "quantity": "20 g (side; freshly squeezed, weighed grams)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "12 g (side; as sold, weighed grams)"
      }
    ],
    "method": [
      "Cut chicken into 3 cm cubes and combine with all tawook marinade ingredients. Refrigerate for 60 minutes. This yoghurt, garlic and tomato marinade is not the oil-and-spice shawarma method.",
      "Break dry fine wheat vermicelli into 2 cm lengths. Brown gently in butter in a close-fitting pan for 2-3 minutes, stirring constantly. Add rice and stir, then measured water and rice salt.",
      "Cover and simmer the vermicelli rice on low heat 12-15 minutes, then rest 10 minutes. Chop and combine all side ingredients without draining.",
      "Thread chicken onto metal skewers and griddle 12-16 minutes, turning, until safely cooked. Bring leftover marinade to a bubbling simmer separately and cook thoroughly before spooning over the skewers.",
      "Serve half the skewers, all cooked sauce, vermicelli rice and salad each.",
      "Cook poultry, minced meats and mixed meat fillings to a clean-probe centre temperature of 75 C for at least 30 seconds. Cook fish and pork safely throughout; times alone do not establish doneness. Do not wash raw poultry. Fully set eggs. Source: https://www.food.gov.uk/safety-hygiene/cooking-your-food"
    ],
    "nutrition": {
      "calories": "1012 kcal",
      "protein": "65.5 g",
      "carbohydrates": "?",
      "fat": "37.4 g",
      "fibre": "5.1 g",
      "sodium": "568 mg",
      "potassium": "1753 mg",
      "phosphate": "778 mg",
      "salt": "1.42 g"
    },
    "potassium": "Pending review",
    "phosphate": "Pending review",
    "purines": "Pending review",
    "dietaryNote": "Development estimate requiring individual whole-day review; see guide dossier. No universal stage or dialysis suitability claim.",
    "nutritionBasis": "CoFID ingredient-input estimate",
    "nutritionIncomplete": [
      "carbohydrates"
    ],
    "nutritionSourceNote": "Ingredient-input estimates with nutrient-specific supplements and explicit unknowns. CoFID carbohydrate expressed as monosaccharides; alternatives not mixed into totals. See evidence/D059/summary.json.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 2
  },
  {
    "id": "homemade-chicken-pide",
    "code": "D060",
    "category": "Dinner",
    "mealFamily": "pide",
    "cuisine": "turkish",
    "emoji": "🍽️",
    "image": "/images/recipes/D060.webp",
    "name": "Homemade chicken pide",
    "description": "Open boat-shaped yeasted bread with a cooked pepper-chicken filling, not pizza, wrap or closed pie.",
    "cookingTime": "140 minutes elapsed (development timing)",
    "calories": "988 kcal",
    "protein": "58.3 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Strong white bread flour",
        "shoppingItem": "Strong white bread flour",
        "quantity": "260 g (pide dough; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "155 g (pide dough; weighed recipe water)"
      },
      {
        "item": "Active dry yeast",
        "shoppingItem": "Active dry yeast",
        "quantity": "4 g (pide dough; dry)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "20 g (pide dough; as sold, weighed grams)"
      },
      {
        "item": "White sugar",
        "shoppingItem": "White sugar",
        "quantity": "5 g (pide dough; dry)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "1.2 g (pide dough; dry)"
      },
      {
        "item": "Skinless boneless chicken thigh",
        "shoppingItem": "Skinless boneless chicken thigh",
        "quantity": "360 g (filling; raw edible input)"
      },
      {
        "item": "Fresh tomato",
        "shoppingItem": "Fresh tomato",
        "quantity": "220 g (filling; raw edible input)"
      },
      {
        "item": "Red bell pepper",
        "shoppingItem": "Red bell pepper",
        "quantity": "160 g (filling; raw edible input)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "120 g (filling; raw edible input)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "10 g (filling; raw edible input)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "30 g (filling; as sold, weighed grams)"
      },
      {
        "item": "Sweet paprika",
        "shoppingItem": "Sweet paprika",
        "quantity": "3 g (filling; dry)"
      },
      {
        "item": "Ground cumin",
        "shoppingItem": "Ground cumin",
        "quantity": "2 g (filling; dry)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "1 g (filling; dry)"
      },
      {
        "item": "Fresh parsley",
        "shoppingItem": "Fresh parsley",
        "quantity": "15 g (filling; raw edible input)"
      },
      {
        "item": "Whole egg, shell removed",
        "shoppingItem": "Whole egg, shell removed",
        "quantity": "40 g (filling; raw edible input)"
      }
    ],
    "method": [
      "Mix all dough ingredients and knead 8-10 minutes. Cover and prove about 60 minutes until puffy. No extra dusting flour is added; use baking paper for rolling.",
      "Dice chicken and vegetables into 1 cm pieces. Heat filling oil, soften onion and pepper 7 minutes, then add chicken, garlic, paprika, cumin and filling salt. Cook until chicken is safely cooked; add tomato and reduce to a moist but non-watery filling.",
      "Let filling cool until no longer steaming, fold in parsley, and divide in two. Heat oven to 230 C conventional or 210 C fan with a heavy baking tray inside.",
      "Divide dough in two and roll each into a 30 cm oval. Add filling down the centre, leaving a 3 cm border. Fold long edges over the filling and pinch both ends firmly into a boat shape. Brush the exposed dough with all 40 g beaten egg.",
      "Slide on paper onto the hot tray and bake 15-20 minutes until the boat edges and base are cooked and browned. Serve one complete pide per person; timing is subject to dough and oven testing.",
      "Cook poultry, minced meats and mixed meat fillings to a clean-probe centre temperature of 75 C for at least 30 seconds. Cook fish and pork safely throughout; times alone do not establish doneness. Do not wash raw poultry. Fully set eggs. Source: https://www.food.gov.uk/safety-hygiene/cooking-your-food"
    ],
    "nutrition": {
      "calories": "988 kcal",
      "protein": "58.3 g",
      "carbohydrates": "?",
      "fat": "34.3 g",
      "fibre": "10.0 g",
      "sodium": "639 mg",
      "potassium": "1629 mg",
      "phosphate": "505 mg",
      "salt": "1.60 g"
    },
    "potassium": "Pending review",
    "phosphate": "Pending review",
    "purines": "Pending review",
    "dietaryNote": "Development estimate requiring individual whole-day review; see guide dossier. No universal stage or dialysis suitability claim.",
    "nutritionBasis": "CoFID ingredient-input estimate",
    "nutritionIncomplete": [
      "carbohydrates"
    ],
    "nutritionSourceNote": "Ingredient-input estimates with nutrient-specific supplements and explicit unknowns. CoFID carbohydrate expressed as monosaccharides; alternatives not mixed into totals. See evidence/D060/summary.json.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 2
  },
  {
    "id": "saffron-chicken-with-jewelled-rice",
    "code": "D061",
    "category": "Dinner",
    "mealFamily": "jewelled-rice",
    "cuisine": "persian",
    "emoji": "🍽️",
    "image": "/images/recipes/D061.webp",
    "name": "Saffron chicken with jewelled rice",
    "description": "Saffron braise and carrot-orange-fruit-nut rice create a jewelled presentation without falsely claiming a full ceremonial Persian preparation.",
    "cookingTime": "85 minutes elapsed (development timing)",
    "calories": "1080 kcal",
    "protein": "56.9 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Skinless boneless chicken thigh",
        "shoppingItem": "Skinless boneless chicken thigh",
        "quantity": "400 g (saffron chicken; raw edible input)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "160 g (saffron chicken; raw edible input)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "10 g (saffron chicken; raw edible input)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "30 g (saffron chicken; as sold, weighed grams)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "200 g (saffron chicken; weighed recipe water)"
      },
      {
        "item": "Fresh lemon juice",
        "shoppingItem": "Fresh lemon juice",
        "quantity": "30 g (saffron chicken; freshly squeezed, weighed grams)"
      },
      {
        "item": "Saffron",
        "shoppingItem": "Saffron",
        "quantity": "0.2 g (saffron chicken; dry)"
      },
      {
        "item": "Ground turmeric",
        "shoppingItem": "Ground turmeric",
        "quantity": "1 g (saffron chicken; dry)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "1.2 g (saffron chicken; dry)"
      },
      {
        "item": "White basmati rice",
        "shoppingItem": "White basmati rice",
        "quantity": "220 g (jewelled rice; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "396 g (jewelled rice; weighed recipe water)"
      },
      {
        "item": "Unsalted butter",
        "shoppingItem": "Unsalted butter",
        "quantity": "25 g (jewelled rice; as sold)"
      },
      {
        "item": "Carrot",
        "shoppingItem": "Carrot",
        "quantity": "140 g (jewelled rice; raw edible input)"
      },
      {
        "item": "Fresh orange-coloured peel, no white pith",
        "shoppingItem": "Fresh orange-coloured peel, no white pith",
        "quantity": "8 g (jewelled rice; raw edible peel)"
      },
      {
        "item": "Raisins",
        "shoppingItem": "Raisins",
        "quantity": "45 g (jewelled rice; dry as sold)"
      },
      {
        "item": "Flaked almonds",
        "shoppingItem": "Flaked almonds",
        "quantity": "35 g (jewelled rice; as sold)"
      },
      {
        "item": "White sugar",
        "shoppingItem": "White sugar",
        "quantity": "10 g (jewelled rice; dry)"
      },
      {
        "item": "Ground cinnamon",
        "shoppingItem": "Ground cinnamon",
        "quantity": "0.5 g (jewelled rice; dry)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.6 g (jewelled rice; dry)"
      }
    ],
    "method": [
      "Crush saffron and steep in 30 g of the chicken water for 10 minutes. Brown thigh pieces in chicken oil for 5-6 minutes; add sliced onion and garlic, soften 7 minutes, then add turmeric, chicken salt and the remaining 170 g water.",
      "Cover and braise gently 25-30 minutes until chicken is safely cooked. Add saffron infusion and lemon for the final 5 minutes, then uncover to reduce the sauce slightly.",
      "Cook the rice in its listed water and salt by absorption, covered, 12-15 minutes then rest 10 minutes. Grate carrot and finely julienne only orange-coloured peel, avoiding bitter white pith.",
      "Warm butter in a small pan; soften carrot and peel for 7-8 minutes. Add raisins, almonds, sugar and cinnamon for 2 minutes, keeping the entire garnish and butter.",
      "Fold half the garnish through rice, scatter the rest on top and serve half the chicken and complete saffron sauce each. No unsupported nutrient extraction or discarded peel-syrup assumption is applied.",
      "Cook poultry, minced meats and mixed meat fillings to a clean-probe centre temperature of 75 C for at least 30 seconds. Cook fish and pork safely throughout; times alone do not establish doneness. Do not wash raw poultry. Fully set eggs. Source: https://www.food.gov.uk/safety-hygiene/cooking-your-food"
    ],
    "nutrition": {
      "calories": "1080 kcal",
      "protein": "56.9 g",
      "carbohydrates": "?",
      "fat": "41.8 g",
      "fibre": "9.3 g",
      "sodium": "564 mg",
      "potassium": "1517 mg",
      "phosphate": "495 mg",
      "salt": "1.41 g"
    },
    "potassium": "Pending review",
    "phosphate": "Pending review",
    "purines": "Pending review",
    "dietaryNote": "Development estimate requiring individual whole-day review; see guide dossier. No universal stage or dialysis suitability claim.",
    "nutritionBasis": "CoFID ingredient-input estimate",
    "nutritionIncomplete": [
      "carbohydrates"
    ],
    "nutritionSourceNote": "Ingredient-input estimates with nutrient-specific supplements and explicit unknowns. CoFID carbohydrate expressed as monosaccharides; alternatives not mixed into totals. See evidence/D061/summary.json.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 2
  },
  {
    "id": "chicken-gyros-platter",
    "code": "D062",
    "category": "Dinner",
    "mealFamily": "gyros-platter",
    "cuisine": "greek",
    "emoji": "🍽️",
    "image": "/images/recipes/D062.webp",
    "name": "Chicken gyros platter",
    "description": "Thinly sliced yoghurt-oregano roast chicken, roast potatoes and pitta served as a full gyros-inspired platter.",
    "cookingTime": "120 minutes elapsed (development timing)",
    "calories": "1058 kcal",
    "protein": "65.6 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Skinless boneless chicken thigh",
        "shoppingItem": "Skinless boneless chicken thigh",
        "quantity": "400 g (gyros chicken; raw edible input)"
      },
      {
        "item": "Plain whole-milk yoghurt",
        "shoppingItem": "Plain whole-milk yoghurt",
        "quantity": "120 g (gyros chicken; as sold)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "14 g (gyros chicken; raw edible input)"
      },
      {
        "item": "Fresh lemon juice",
        "shoppingItem": "Fresh lemon juice",
        "quantity": "30 g (gyros chicken; freshly squeezed, weighed grams)"
      },
      {
        "item": "Dried oregano",
        "shoppingItem": "Dried oregano",
        "quantity": "2 g (gyros chicken; dry)"
      },
      {
        "item": "Sweet paprika",
        "shoppingItem": "Sweet paprika",
        "quantity": "2 g (gyros chicken; dry)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "28 g (gyros chicken; as sold, weighed grams)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "1.2 g (gyros chicken; dry)"
      },
      {
        "item": "Peeled potato",
        "shoppingItem": "Peeled potato",
        "quantity": "360 g (potatoes; raw edible input)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "28 g (potatoes; as sold, weighed grams)"
      },
      {
        "item": "Dried oregano",
        "shoppingItem": "Dried oregano",
        "quantity": "1 g (potatoes; dry)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.7 g (potatoes; dry)"
      },
      {
        "item": "White pitta bread",
        "shoppingItem": "White pitta bread",
        "quantity": "220 g (platter; as sold)"
      },
      {
        "item": "Cucumber",
        "shoppingItem": "Cucumber",
        "quantity": "180 g (platter; raw edible input)"
      },
      {
        "item": "Plain whole-milk yoghurt",
        "shoppingItem": "Plain whole-milk yoghurt",
        "quantity": "150 g (platter; as sold)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "4 g (platter; raw edible input)"
      },
      {
        "item": "Fresh lemon juice",
        "shoppingItem": "Fresh lemon juice",
        "quantity": "20 g (platter; freshly squeezed, weighed grams)"
      },
      {
        "item": "Fresh tomato",
        "shoppingItem": "Fresh tomato",
        "quantity": "180 g (platter; raw edible input)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "60 g (platter; raw edible input)"
      }
    ],
    "method": [
      "Flatten chicken thighs and coat with all gyros marinade ingredients. Refrigerate 60 minutes. Cut peeled potato into 2 cm wedges and toss with potato oil, oregano and salt.",
      "Heat oven to 220 C conventional or 200 C fan. Spread potatoes on one tray and roast 35-45 minutes, turning twice. Roast chicken and every bit of marinade in a separate rimmed dish for 25-30 minutes to the poultry safety endpoint.",
      "Grate cucumber finely without draining and mix with platter yoghurt, garlic and lemon into a loose tzatziki-style sauce. Slice tomato and onion. Warm pitta in a dry pan.",
      "Rest chicken 3 minutes, slice thinly and briefly sear the slices in their safely cooked tray juices for browned edges. Divide the whole chicken, potatoes, bread, sauce and salad between two platters.",
      "This domestic sliced roast mimics gyros service but is not cooked on a vertical spit. The potato platter and yoghurt-cucumber sauce distinguish it from skewered souvlaki and garlic-emulsion shawarma.",
      "Cook poultry, minced meats and mixed meat fillings to a clean-probe centre temperature of 75 C for at least 30 seconds. Cook fish and pork safely throughout; times alone do not establish doneness. Do not wash raw poultry. Fully set eggs. Source: https://www.food.gov.uk/safety-hygiene/cooking-your-food"
    ],
    "nutrition": {
      "calories": "1058 kcal",
      "protein": "65.6 g",
      "carbohydrates": "?",
      "fat": "40.1 g",
      "fibre": "9.6 g",
      "sodium": "1113 mg",
      "potassium": "2665 mg",
      "phosphate": "690 mg",
      "salt": "2.78 g"
    },
    "potassium": "Pending review",
    "phosphate": "Pending review",
    "purines": "Pending review",
    "dietaryNote": "Development estimate requiring individual whole-day review; see guide dossier. No universal stage or dialysis suitability claim.",
    "nutritionBasis": "CoFID ingredient-input estimate",
    "nutritionIncomplete": [
      "carbohydrates"
    ],
    "nutritionSourceNote": "Ingredient-input estimates with nutrient-specific supplements and explicit unknowns. CoFID carbohydrate expressed as monosaccharides; alternatives not mixed into totals. See evidence/D062/summary.json.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 2
  },
  {
    "id": "chicken-and-apricot-tagine",
    "code": "D063",
    "category": "Dinner",
    "mealFamily": "tagine",
    "cuisine": "moroccan",
    "emoji": "🍽️",
    "image": "/images/recipes/D063.webp",
    "name": "Chicken and apricot tagine",
    "description": "Slow covered apricot-spice braise has tender fruit and a reduced sauce, unlike stir-fry chicken or a generic rice bowl.",
    "cookingTime": "100 minutes elapsed (development timing)",
    "calories": "1066 kcal",
    "protein": "61.6 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Skinless boneless chicken thigh",
        "shoppingItem": "Skinless boneless chicken thigh",
        "quantity": "400 g (tagine; raw edible input)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "200 g (tagine; raw edible input)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "12 g (tagine; raw edible input)"
      },
      {
        "item": "Fresh ginger",
        "shoppingItem": "Fresh ginger",
        "quantity": "18 g (tagine; raw edible input)"
      },
      {
        "item": "Dried apricots",
        "shoppingItem": "Dried apricots",
        "quantity": "70 g (tagine; dry as sold)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "40 g (tagine; as sold, weighed grams)"
      },
      {
        "item": "Ground cumin",
        "shoppingItem": "Ground cumin",
        "quantity": "2 g (tagine; dry)"
      },
      {
        "item": "Ground coriander seed",
        "shoppingItem": "Ground coriander seed",
        "quantity": "3 g (tagine; dry)"
      },
      {
        "item": "Ground cinnamon",
        "shoppingItem": "Ground cinnamon",
        "quantity": "1 g (tagine; dry)"
      },
      {
        "item": "Ground turmeric",
        "shoppingItem": "Ground turmeric",
        "quantity": "1 g (tagine; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "350 g (tagine; weighed recipe water)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "1.4 g (tagine; dry)"
      },
      {
        "item": "Flaked almonds",
        "shoppingItem": "Flaked almonds",
        "quantity": "25 g (tagine; as sold)"
      },
      {
        "item": "Fresh coriander leaves",
        "shoppingItem": "Fresh coriander leaves",
        "quantity": "15 g (tagine; raw edible input)"
      },
      {
        "item": "Fresh lemon juice",
        "shoppingItem": "Fresh lemon juice",
        "quantity": "20 g (tagine; freshly squeezed, weighed grams)"
      },
      {
        "item": "Plain couscous",
        "shoppingItem": "Plain couscous",
        "quantity": "220 g (couscous; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "285 g (couscous; weighed recipe water)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "15 g (couscous; as sold, weighed grams)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.6 g (couscous; dry)"
      }
    ],
    "method": [
      "Use a heavy lidded casserole or heat-diffused tagine. Brown chicken in half the tagine oil, then add the remaining oil and sliced onion; soften 10 minutes.",
      "Add garlic, ginger, cumin, coriander, cinnamon and turmeric for 1 minute. Add tagine water, apricots and salt. Cover and simmer very gently 40-50 minutes until chicken is tender and safely cooked.",
      "Put couscous, its oil and salt in a heatproof bowl. Pour over its 285 g boiling water, cover 10 minutes and fluff.",
      "Uncover tagine to reduce for 5-10 minutes if watery. Toast almonds dry for 2 minutes and add with coriander and lemon. Serve half the entire sweet-savoury braise and couscous each.",
      "Cook poultry, minced meats and mixed meat fillings to a clean-probe centre temperature of 75 C for at least 30 seconds. Cook fish and pork safely throughout; times alone do not establish doneness. Do not wash raw poultry. Fully set eggs. Source: https://www.food.gov.uk/safety-hygiene/cooking-your-food"
    ],
    "nutrition": {
      "calories": "1066 kcal",
      "protein": "61.6 g",
      "carbohydrates": "?",
      "fat": "43.4 g",
      "fibre": "12.0 g",
      "sodium": "609 mg",
      "potassium": "2170 mg",
      "phosphate": "646 mg",
      "salt": "1.52 g"
    },
    "potassium": "Pending review",
    "phosphate": "Pending review",
    "purines": "Pending review",
    "dietaryNote": "Development estimate requiring individual whole-day review; see guide dossier. No universal stage or dialysis suitability claim.",
    "nutritionBasis": "CoFID ingredient-input estimate",
    "nutritionIncomplete": [
      "carbohydrates"
    ],
    "nutritionSourceNote": "Ingredient-input estimates with nutrient-specific supplements and explicit unknowns. CoFID carbohydrate expressed as monosaccharides; alternatives not mixed into totals. See evidence/D063/summary.json.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 2
  },
  {
    "id": "spiced-lamb-and-vegetable-pastilla",
    "code": "D064",
    "category": "Dinner",
    "mealFamily": "pastilla",
    "cuisine": "moroccan",
    "emoji": "🍽️",
    "image": "/images/recipes/D064.webp",
    "name": "Spiced lamb and vegetable pastilla",
    "description": "Layered crisp filo encloses a dry spiced lamb-egg-almond filling; technique and sweet-spice balance make it distinct from a puff-pastry pie.",
    "cookingTime": "125 minutes elapsed (development timing)",
    "calories": "1327 kcal",
    "protein": "60.7 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Lamb mince",
        "shoppingItem": "Lamb mince",
        "quantity": "360 g (filling; raw edible input)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "180 g (filling; raw edible input)"
      },
      {
        "item": "Carrot",
        "shoppingItem": "Carrot",
        "quantity": "160 g (filling; raw edible input)"
      },
      {
        "item": "Courgette",
        "shoppingItem": "Courgette",
        "quantity": "160 g (filling; raw edible input)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "25 g (filling; as sold, weighed grams)"
      },
      {
        "item": "Fresh ginger",
        "shoppingItem": "Fresh ginger",
        "quantity": "15 g (filling; raw edible input)"
      },
      {
        "item": "Ground cumin",
        "shoppingItem": "Ground cumin",
        "quantity": "2 g (filling; dry)"
      },
      {
        "item": "Ground cinnamon",
        "shoppingItem": "Ground cinnamon",
        "quantity": "1.5 g (filling; dry)"
      },
      {
        "item": "Ground turmeric",
        "shoppingItem": "Ground turmeric",
        "quantity": "1 g (filling; dry)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "1.2 g (filling; dry)"
      },
      {
        "item": "Whole egg, shell removed",
        "shoppingItem": "Whole egg, shell removed",
        "quantity": "160 g (filling; raw edible input)"
      },
      {
        "item": "Fresh parsley",
        "shoppingItem": "Fresh parsley",
        "quantity": "20 g (filling; raw edible input)"
      },
      {
        "item": "Flaked almonds",
        "shoppingItem": "Flaked almonds",
        "quantity": "45 g (filling; as sold)"
      },
      {
        "item": "White sugar",
        "shoppingItem": "White sugar",
        "quantity": "12 g (filling; dry)"
      },
      {
        "item": "Filo pastry",
        "shoppingItem": "Filo pastry",
        "quantity": "220 g (filo case; uncooked as sold)"
      },
      {
        "item": "Unsalted butter",
        "shoppingItem": "Unsalted butter",
        "quantity": "55 g (filo case; as sold)"
      }
    ],
    "method": [
      "Cook chopped onion, carrot and courgette in filling oil for 10 minutes. Add lamb, ginger, cumin, cinnamon, turmeric and salt, breaking up mince. Cook until safely cooked and reduce until almost dry; no fat or vegetable liquor is drained.",
      "Beat the 160 g egg and stir into the hot filling over low heat until just set throughout. Fold in chopped parsley, almonds and sugar. Spread in a shallow bowl and let stop steaming for about 20 minutes before assembly.",
      "Heat oven to 200 C conventional or 180 C fan. Melt the 55 g butter. Line a 20 cm pie dish with overlapping filo sheets, brushing each with measured butter and leaving an overhang. Reserve enough filo and butter for the top.",
      "Add the filling, fold over the edges and finish with the remaining buttered filo. Bake 30-40 minutes until crisp, golden and piping hot at the centre.",
      "Rest 10 minutes and cut exactly in half. Serve each half with its full filling and pastry. Lamb and vegetables are an original savoury adaptation of pastilla structure, not a claim that this is canonical chicken or pigeon pastilla.",
      "Cook poultry, minced meats and mixed meat fillings to a clean-probe centre temperature of 75 C for at least 30 seconds. Cook fish and pork safely throughout; times alone do not establish doneness. Do not wash raw poultry. Fully set eggs. Source: https://www.food.gov.uk/safety-hygiene/cooking-your-food"
    ],
    "nutrition": {
      "calories": "1327 kcal",
      "protein": "60.7 g",
      "carbohydrates": "?",
      "fat": "83.0 g",
      "fibre": "13.1 g",
      "sodium": "904 mg",
      "potassium": "1671 mg",
      "phosphate": "783 mg",
      "salt": "2.26 g"
    },
    "potassium": "Pending review",
    "phosphate": "Pending review",
    "purines": "Pending review",
    "dietaryNote": "Development estimate requiring individual whole-day review; see guide dossier. No universal stage or dialysis suitability claim.",
    "nutritionBasis": "CoFID ingredient-input estimate",
    "nutritionIncomplete": [
      "carbohydrates"
    ],
    "nutritionSourceNote": "Ingredient-input estimates with nutrient-specific supplements and explicit unknowns. CoFID carbohydrate expressed as monosaccharides; alternatives not mixed into totals. See evidence/D064/summary.json.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 2
  },
  {
    "id": "harissa-style-baked-fish-with-couscous",
    "code": "D065",
    "category": "Dinner",
    "mealFamily": "harissa-fish-couscous",
    "cuisine": "tunisian",
    "emoji": "🍽️",
    "image": "/images/recipes/D065.webp",
    "name": "Harissa-style baked fish with couscous",
    "description": "Caraway-coriander red chilli paste is cooked onto fish; fresh green chermoula is a deliberately different recipe.",
    "cookingTime": "55 minutes elapsed (development timing)",
    "calories": "938 kcal",
    "protein": "52.0 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Haddock fillet, unsmoked",
        "shoppingItem": "Haddock fillet, unsmoked",
        "quantity": "400 g (harissa fish; raw edible input)"
      },
      {
        "item": "Fresh red chilli flesh",
        "shoppingItem": "Fresh red chilli flesh",
        "quantity": "35 g (harissa fish; raw edible input)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "18 g (harissa fish; raw edible input)"
      },
      {
        "item": "Caraway seed, freshly crushed",
        "shoppingItem": "Caraway seed, freshly crushed",
        "quantity": "2 g (harissa fish; dry)"
      },
      {
        "item": "Ground coriander seed",
        "shoppingItem": "Ground coriander seed",
        "quantity": "3 g (harissa fish; dry)"
      },
      {
        "item": "Sweet paprika",
        "shoppingItem": "Sweet paprika",
        "quantity": "4 g (harissa fish; dry)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "40 g (harissa fish; as sold, weighed grams)"
      },
      {
        "item": "Tomato puree",
        "shoppingItem": "Tomato puree",
        "quantity": "35 g (harissa fish; as sold)"
      },
      {
        "item": "Fresh lemon juice",
        "shoppingItem": "Fresh lemon juice",
        "quantity": "30 g (harissa fish; freshly squeezed, weighed grams)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "1.2 g (harissa fish; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "40 g (harissa fish; weighed recipe water)"
      },
      {
        "item": "Plain couscous",
        "shoppingItem": "Plain couscous",
        "quantity": "220 g (couscous; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "285 g (couscous; weighed recipe water)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "18 g (couscous; as sold, weighed grams)"
      },
      {
        "item": "Fresh parsley",
        "shoppingItem": "Fresh parsley",
        "quantity": "18 g (couscous; raw edible input)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.6 g (couscous; dry)"
      },
      {
        "item": "Carrot",
        "shoppingItem": "Carrot",
        "quantity": "180 g (side; raw edible input)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "12 g (side; as sold, weighed grams)"
      }
    ],
    "method": [
      "Deseed and finely chop red chillies before weighing 35 g flesh. Pound with garlic, caraway, coriander, paprika, tomato puree, fish oil, lemon, salt and 40 g water to make a fresh harissa-style paste.",
      "Heat oven to 220 C conventional or 200 C fan. Toss 1 cm carrot batons with their oil and roast 25-30 minutes. Put fish in a separate shallow dish with all paste and bake 15-20 minutes until safely cooked.",
      "Pour the couscous boiling water over couscous, its oil and salt; cover 10 minutes and fluff with parsley. Do not borrow cooked green chermoula data for the red chilli paste.",
      "Divide fish, all cooked red sauce, couscous and roasted carrots equally between two plates.",
      "Cook poultry, minced meats and mixed meat fillings to a clean-probe centre temperature of 75 C for at least 30 seconds. Cook fish and pork safely throughout; times alone do not establish doneness. Do not wash raw poultry. Fully set eggs. Source: https://www.food.gov.uk/safety-hygiene/cooking-your-food"
    ],
    "nutrition": {
      "calories": "938 kcal",
      "protein": "52.0 g",
      "carbohydrates": "?",
      "fat": "39.4 g",
      "fibre": "10.9 g",
      "sodium": "535 mg",
      "potassium": "1626 mg",
      "phosphate": "665 mg",
      "salt": "1.34 g"
    },
    "potassium": "Pending review",
    "phosphate": "Pending review",
    "purines": "Pending review",
    "dietaryNote": "Development estimate requiring individual whole-day review; see guide dossier. No universal stage or dialysis suitability claim.",
    "nutritionBasis": "CoFID ingredient-input estimate",
    "nutritionIncomplete": [
      "carbohydrates"
    ],
    "nutritionSourceNote": "Ingredient-input estimates with nutrient-specific supplements and explicit unknowns. CoFID carbohydrate expressed as monosaccharides; alternatives not mixed into totals. See evidence/D065/summary.json.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 2
  },
  {
    "id": "sweet-and-sour-chicken-with-rice",
    "code": "D066",
    "category": "Dinner",
    "mealFamily": "sweet-sour-rice",
    "cuisine": "chinese",
    "emoji": "🍽️",
    "image": "/images/recipes/D066.webp",
    "name": "Sweet-and-sour chicken with rice",
    "description": "Crisped coated chicken meets a separately thickened vinegar-pineapple sauce only at serving.",
    "cookingTime": "65 minutes elapsed (development timing)",
    "calories": "1308 kcal",
    "protein": "64.8 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Skinless boneless chicken breast",
        "shoppingItem": "Skinless boneless chicken breast",
        "quantity": "400 g (chicken; raw edible input)"
      },
      {
        "item": "Cornflour (maize starch)",
        "shoppingItem": "Cornflour (maize starch)",
        "quantity": "65 g (chicken; dry)"
      },
      {
        "item": "Whole egg, shell removed",
        "shoppingItem": "Whole egg, shell removed",
        "quantity": "70 g (chicken; raw edible input)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "45 g (chicken; as sold, weighed grams)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.8 g (chicken; dry)"
      },
      {
        "item": "White basmati rice",
        "shoppingItem": "White basmati rice",
        "quantity": "220 g (rice; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "396 g (rice; weighed recipe water)"
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
        "item": "Fresh pineapple flesh",
        "shoppingItem": "Fresh pineapple flesh",
        "quantity": "220 g (sweet-sour sauce; raw edible input)"
      },
      {
        "item": "Red bell pepper",
        "shoppingItem": "Red bell pepper",
        "quantity": "180 g (sweet-sour sauce; raw edible input)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "120 g (sweet-sour sauce; raw edible input)"
      },
      {
        "item": "Plain unseasoned vinegar",
        "shoppingItem": "Plain unseasoned vinegar",
        "quantity": "65 g (sweet-sour sauce; as sold, weighed grams)"
      },
      {
        "item": "White sugar",
        "shoppingItem": "White sugar",
        "quantity": "55 g (sweet-sour sauce; dry)"
      },
      {
        "item": "Tomato puree",
        "shoppingItem": "Tomato puree",
        "quantity": "45 g (sweet-sour sauce; as sold)"
      },
      {
        "item": "Soy sauce",
        "shoppingItem": "Soy sauce",
        "quantity": "18 g (sweet-sour sauce; as sold, weighed grams)"
      },
      {
        "item": "Cornflour (maize starch)",
        "shoppingItem": "Cornflour (maize starch)",
        "quantity": "12 g (sweet-sour sauce; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "130 g (sweet-sour sauce; weighed recipe water)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "12 g (sweet-sour sauce; as sold, weighed grams)"
      }
    ],
    "method": [
      "Cook the rice component in its measured water, oil and salt in a close-fitting saucepan: bring to a simmer, cover on the lowest heat for 12-15 minutes, then rest off the heat for 10 minutes. Do not drain. Divide the complete cooked rice equally.",
      "Cut chicken into 2 cm pieces. Beat chicken egg and salt, coat chicken and dust with its cornflour. Shallow-fry in batches in the measured 45 g oil until crisp and safely cooked; do not discard pan oil without measuring it in the cooking trial.",
      "Cut pineapple and vegetables into 2 cm pieces. Heat sauce oil in a second pan and stir-fry pepper and onion 4 minutes. Add pineapple, vinegar, sugar, tomato puree and soy; simmer 3 minutes.",
      "Mix the 12 g sauce cornflour with its 130 g water and stir into the simmering sauce until clear and glossy. Fold in chicken only immediately before serving to retain its crisp surface.",
      "Serve half the chicken, complete sauce and rice each. All coating/oil inputs are calculated; uneaten raw coating and residual frying oil need measurement before a consumed-nutrient claim.",
      "Cook poultry, minced meats and mixed meat fillings to a clean-probe centre temperature of 75 C for at least 30 seconds. Cook fish and pork safely throughout; times alone do not establish doneness. Do not wash raw poultry. Fully set eggs. Source: https://www.food.gov.uk/safety-hygiene/cooking-your-food"
    ],
    "nutrition": {
      "calories": "1308 kcal",
      "protein": "64.8 g",
      "carbohydrates": "182.3 g",
      "fat": "40.0 g",
      "fibre": "7.2 g",
      "sodium": "966 mg",
      "potassium": "1599 mg",
      "phosphate": "690 mg",
      "salt": "2.42 g"
    },
    "potassium": "Pending review",
    "phosphate": "Pending review",
    "purines": "Pending review",
    "dietaryNote": "Development estimate requiring individual whole-day review; see guide dossier. No universal stage or dialysis suitability claim.",
    "nutritionBasis": "CoFID ingredient-input estimate",
    "nutritionIncomplete": [],
    "nutritionSourceNote": "Ingredient-input estimates with nutrient-specific supplements and explicit unknowns. CoFID carbohydrate expressed as monosaccharides; alternatives not mixed into totals. See evidence/D066/summary.json.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 2
  },
  {
    "id": "ginger-and-spring-onion-steamed-fish",
    "code": "D067",
    "category": "Dinner",
    "mealFamily": "steamed-fish-plate",
    "cuisine": "chinese",
    "emoji": "🍽️",
    "image": "/images/recipes/D067.webp",
    "name": "Ginger and spring-onion steamed fish",
    "description": "Gentle plate-steaming followed by hot ginger-spring-onion oil preserves a different fish texture and method from baking in curry paste.",
    "cookingTime": "50 minutes elapsed (development timing)",
    "calories": "926 kcal",
    "protein": "49.2 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Cod fillet, flesh only",
        "shoppingItem": "Cod fillet, flesh only",
        "quantity": "420 g (steamed fish; raw edible input)"
      },
      {
        "item": "Fresh ginger",
        "shoppingItem": "Fresh ginger",
        "quantity": "30 g (steamed fish; raw edible input)"
      },
      {
        "item": "Spring onion, bulbs and green tops",
        "shoppingItem": "Spring onion, bulbs and green tops",
        "quantity": "70 g (steamed fish; raw edible input)"
      },
      {
        "item": "Soy sauce",
        "shoppingItem": "Soy sauce",
        "quantity": "35 g (steamed fish; as sold, weighed grams)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "50 g (steamed fish; weighed recipe water)"
      },
      {
        "item": "White sugar",
        "shoppingItem": "White sugar",
        "quantity": "8 g (steamed fish; dry)"
      },
      {
        "item": "Sesame oil",
        "shoppingItem": "Sesame oil",
        "quantity": "10 g (steamed fish; as sold, weighed grams)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "35 g (steamed fish; as sold, weighed grams)"
      },
      {
        "item": "White basmati rice",
        "shoppingItem": "White basmati rice",
        "quantity": "230 g (rice; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "414 g (rice; weighed recipe water)"
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
        "item": "Chinese cabbage",
        "shoppingItem": "Chinese cabbage",
        "quantity": "260 g (greens; raw edible input)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "12 g (greens; as sold, weighed grams)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "8 g (greens; raw edible input)"
      }
    ],
    "method": [
      "Cook the rice component in its measured water, oil and salt in a close-fitting saucepan: bring to a simmer, cover on the lowest heat for 12-15 minutes, then rest off the heat for 10 minutes. Do not drain. Divide the complete cooked rice equally.",
      "Cut cod into two thick equal portions and place on a heatproof shallow plate that catches all juices. Cut ginger and spring onion into fine matchsticks; put half beneath and on the fish.",
      "Steam over boiling process water for 10-15 minutes, checking doneness at the thickest part. Do not discard the plate juices. Simmer soy, 50 g sauce water, sugar and sesame oil in a small pan.",
      "Stir-fry sliced Chinese cabbage and garlic in the greens oil for 4-6 minutes until tender. Heat the 35 g aromatic oil until shimmering, turn off the heat and carefully pour over the remaining ginger and spring onion in a deep heatproof bowl.",
      "Pour the bubbling soy mixture and aromatic oil over the cooked fish and plate juices. Serve half the fish, rice, greens and entire sauce each.",
      "Cook poultry, minced meats and mixed meat fillings to a clean-probe centre temperature of 75 C for at least 30 seconds. Cook fish and pork safely throughout; times alone do not establish doneness. Do not wash raw poultry. Fully set eggs. Source: https://www.food.gov.uk/safety-hygiene/cooking-your-food"
    ],
    "nutrition": {
      "calories": "926 kcal",
      "protein": "49.2 g",
      "carbohydrates": "108.3 g",
      "fat": "35.9 g",
      "fibre": "4.1 g",
      "sodium": "1287 mg",
      "potassium": "1275 mg",
      "phosphate": "536 mg",
      "salt": "3.22 g"
    },
    "potassium": "Pending review",
    "phosphate": "Pending review",
    "purines": "Pending review",
    "dietaryNote": "Development estimate requiring individual whole-day review; see guide dossier. No universal stage or dialysis suitability claim.",
    "nutritionBasis": "CoFID ingredient-input estimate",
    "nutritionIncomplete": [],
    "nutritionSourceNote": "Ingredient-input estimates with nutrient-specific supplements and explicit unknowns. CoFID carbohydrate expressed as monosaccharides; alternatives not mixed into totals. See evidence/D067/summary.json.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 2
  },
  {
    "id": "crispy-pork-with-garlic-noodles",
    "code": "D068",
    "category": "Dinner",
    "mealFamily": "crispy-pork-noodles",
    "cuisine": "chinese",
    "emoji": "🍽️",
    "image": "/images/recipes/D068.webp",
    "name": "Crispy pork with garlic noodles",
    "description": "Roasted belly strips and a garlic-forward noodle toss; retained rendered fat is an explicit substantial-energy specification.",
    "cookingTime": "85 minutes elapsed (development timing)",
    "calories": "1158 kcal",
    "protein": "53.4 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Boneless rindless pork belly, lean and fat",
        "shoppingItem": "Boneless rindless pork belly, lean and fat",
        "quantity": "380 g (crispy pork; raw edible input)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "1.2 g (crispy pork; dry)"
      },
      {
        "item": "Ground black pepper",
        "shoppingItem": "Ground black pepper",
        "quantity": "0.8 g (crispy pork; dry)"
      },
      {
        "item": "Fresh ginger",
        "shoppingItem": "Fresh ginger",
        "quantity": "12 g (crispy pork; raw edible input)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "12 g (crispy pork; as sold, weighed grams)"
      },
      {
        "item": "Dried egg noodles",
        "shoppingItem": "Dried egg noodles",
        "quantity": "230 g (garlic noodles; dry)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "24 g (garlic noodles; raw edible input)"
      },
      {
        "item": "Spring onion, bulbs and green tops",
        "shoppingItem": "Spring onion, bulbs and green tops",
        "quantity": "50 g (garlic noodles; raw edible input)"
      },
      {
        "item": "Chinese cabbage",
        "shoppingItem": "Chinese cabbage",
        "quantity": "250 g (garlic noodles; raw edible input)"
      },
      {
        "item": "Soy sauce",
        "shoppingItem": "Soy sauce",
        "quantity": "30 g (garlic noodles; as sold, weighed grams)"
      },
      {
        "item": "White sugar",
        "shoppingItem": "White sugar",
        "quantity": "8 g (garlic noodles; dry)"
      },
      {
        "item": "Sesame oil",
        "shoppingItem": "Sesame oil",
        "quantity": "16 g (garlic noodles; as sold, weighed grams)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "20 g (garlic noodles; as sold, weighed grams)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "60 g (garlic noodles; weighed recipe water)"
      }
    ],
    "method": [
      "Use boneless rindless pork belly, weighed with edible fat. Cut into 1.5 cm strips, pat dry and rub with pork salt, pepper and grated ginger. Heat oven to 220 C conventional or 200 C fan.",
      "Coat a small roasting dish with the pork oil and roast strips for 35-45 minutes, turning, until browned and safely cooked. The rendered fat is deliberately retained and used in the noodle sauce; no drained-fat credit is assumed.",
      "Cook dry egg noodles in 1800 g unsalted process water according to the packet and drain. Slice cabbage and spring onion, and mince garlic.",
      "Heat noodle rapeseed oil in a large pan; fry garlic 30 seconds, then cabbage and spring onion for 4-5 minutes. Add soy, sugar, sesame oil, 60 g sauce water and all pork tray juices/fat. Bubble, then toss through noodles.",
      "Serve half the noodles topped with half the crisp pork. This is roasted belly-strip crispness without rind crackling, not a claim of Cantonese siu yuk.",
      "Cook poultry, minced meats and mixed meat fillings to a clean-probe centre temperature of 75 C for at least 30 seconds. Cook fish and pork safely throughout; times alone do not establish doneness. Do not wash raw poultry. Fully set eggs. Source: https://www.food.gov.uk/safety-hygiene/cooking-your-food"
    ],
    "nutrition": {
      "calories": "1158 kcal",
      "protein": "53.4 g",
      "carbohydrates": "?",
      "fat": "65.1 g",
      "fibre": "6.4 g",
      "sodium": "1779 mg",
      "potassium": "1472 mg",
      "phosphate": "590 mg",
      "salt": "4.45 g"
    },
    "potassium": "Pending review",
    "phosphate": "Pending review",
    "purines": "Pending review",
    "dietaryNote": "Development estimate requiring individual whole-day review; see guide dossier. No universal stage or dialysis suitability claim.",
    "nutritionBasis": "CoFID ingredient-input estimate",
    "nutritionIncomplete": [
      "carbohydrates"
    ],
    "nutritionSourceNote": "Ingredient-input estimates with nutrient-specific supplements and explicit unknowns. CoFID carbohydrate expressed as monosaccharides; alternatives not mixed into totals. See evidence/D068/summary.json.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 2
  },
  {
    "id": "chicken-teriyaki-style-rice-bowl",
    "code": "D069",
    "category": "Dinner",
    "mealFamily": "teriyaki-rice-bowl",
    "cuisine": "japanese",
    "emoji": "🍽️",
    "image": "/images/recipes/D069.webp",
    "name": "Chicken teriyaki-style rice bowl",
    "description": "Pan-seared chicken glazed by reducing soy-mirin-style seasoning, rather than a pre-thickened generic sweet sauce.",
    "cookingTime": "50 minutes elapsed (development timing)",
    "calories": "1015 kcal",
    "protein": "53.3 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Skinless boneless chicken thigh",
        "shoppingItem": "Skinless boneless chicken thigh",
        "quantity": "420 g (teriyaki; raw edible input)"
      },
      {
        "item": "Soy sauce",
        "shoppingItem": "Soy sauce",
        "quantity": "32 g (teriyaki; as sold, weighed grams)"
      },
      {
        "item": "Kikkoman mirin-style sweet seasoning",
        "shoppingItem": "Kikkoman mirin-style sweet seasoning",
        "quantity": "35 ml (teriyaki; as sold, measured ml)"
      },
      {
        "item": "White sugar",
        "shoppingItem": "White sugar",
        "quantity": "18 g (teriyaki; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "25 g (teriyaki; weighed recipe water)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "25 g (teriyaki; as sold, weighed grams)"
      },
      {
        "item": "White short-grain rice",
        "shoppingItem": "White short-grain rice",
        "quantity": "230 g (rice; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "414 g (rice; weighed recipe water)"
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
        "item": "Cucumber",
        "shoppingItem": "Cucumber",
        "quantity": "200 g (side; raw edible input)"
      },
      {
        "item": "Carrot",
        "shoppingItem": "Carrot",
        "quantity": "120 g (side; raw edible input)"
      },
      {
        "item": "Plain unseasoned vinegar",
        "shoppingItem": "Plain unseasoned vinegar",
        "quantity": "25 g (side; as sold, weighed grams)"
      },
      {
        "item": "Sesame seeds",
        "shoppingItem": "Sesame seeds",
        "quantity": "12 g (side; dry)"
      },
      {
        "item": "Sesame oil",
        "shoppingItem": "Sesame oil",
        "quantity": "10 g (side; as sold, weighed grams)"
      }
    ],
    "method": [
      "Cook the rice component in its measured water, oil and salt in a close-fitting saucepan: bring to a simmer, cover on the lowest heat for 12-15 minutes, then rest off the heat for 10 minutes. Do not drain. Divide the complete cooked rice equally.",
      "Use the specified Kikkoman mirin-style sweet seasoning measured as 35 ml, not 35 g. Its published nutrition is per 100 ml; no density conversion is invented. Mix with soy, sugar and sauce water.",
      "Flatten thighs to an even thickness. Heat chicken oil in a non-stick pan, sear 5-6 minutes per side, then cover briefly until safely cooked. Keep the pan juices.",
      "Add the teriyaki mixture and simmer, turning chicken repeatedly, for 3-5 minutes until glossy and clinging. Count all glaze; no alcohol-evaporation nutrient adjustment is claimed for this low-alcohol mirin-style product.",
      "Toss finely cut cucumber and carrot with vinegar, sesame and sesame oil. Slice chicken and serve half with all glaze, rice and side each. Fibre, potassium and phosphorus for the exact mirin product remain unreported.",
      "Cook poultry, minced meats and mixed meat fillings to a clean-probe centre temperature of 75 C for at least 30 seconds. Cook fish and pork safely throughout; times alone do not establish doneness. Do not wash raw poultry. Fully set eggs. Source: https://www.food.gov.uk/safety-hygiene/cooking-your-food"
    ],
    "nutrition": {
      "calories": "1015 kcal",
      "protein": "53.3 g",
      "carbohydrates": "?",
      "fat": "33.7 g",
      "fibre": "?",
      "sodium": "1218 mg",
      "potassium": "?",
      "phosphate": "?",
      "salt": "3.04 g"
    },
    "potassium": "Pending review",
    "phosphate": "Pending review",
    "purines": "Pending review",
    "dietaryNote": "Development estimate requiring individual whole-day review; see guide dossier. No universal stage or dialysis suitability claim.",
    "nutritionBasis": "CoFID ingredient-input estimate",
    "nutritionIncomplete": [
      "carbohydrates",
      "fibre",
      "potassium",
      "phosphate"
    ],
    "nutritionSourceNote": "Ingredient-input estimates with nutrient-specific supplements and explicit unknowns. CoFID carbohydrate expressed as monosaccharides; alternatives not mixed into totals. See evidence/D069/summary.json.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 2
  },
  {
    "id": "thai-basil-chicken-with-jasmine-rice",
    "code": "D070",
    "category": "Dinner",
    "mealFamily": "basil-chicken-rice",
    "cuisine": "thai",
    "emoji": "🍽️",
    "image": "/images/recipes/D070.webp",
    "name": "Thai basil chicken with jasmine rice",
    "description": "High-heat garlic-chilli minced chicken finished with holy basil; the herb is not simmered away in a curry.",
    "cookingTime": "45 minutes elapsed (development timing)",
    "calories": "915 kcal",
    "protein": "59.5 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Plain chicken breast, minced",
        "shoppingItem": "Plain chicken breast, minced",
        "quantity": "400 g (basil chicken; raw edible input)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "22 g (basil chicken; raw edible input)"
      },
      {
        "item": "Fresh red chilli flesh",
        "shoppingItem": "Fresh red chilli flesh",
        "quantity": "12 g (basil chicken; raw edible input)"
      },
      {
        "item": "Fresh holy basil",
        "shoppingItem": "Fresh holy basil",
        "quantity": "30 g (basil chicken; raw edible leaves)"
      },
      {
        "item": "Fish sauce",
        "shoppingItem": "Fish sauce",
        "quantity": "22 g (basil chicken; as sold, weighed grams)"
      },
      {
        "item": "Soy sauce",
        "shoppingItem": "Soy sauce",
        "quantity": "16 g (basil chicken; as sold, weighed grams)"
      },
      {
        "item": "White sugar",
        "shoppingItem": "White sugar",
        "quantity": "12 g (basil chicken; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "70 g (basil chicken; weighed recipe water)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "40 g (basil chicken; as sold, weighed grams)"
      },
      {
        "item": "Green beans",
        "shoppingItem": "Green beans",
        "quantity": "180 g (basil chicken; raw edible input)"
      },
      {
        "item": "Thai fragrant jasmine rice",
        "shoppingItem": "Thai fragrant jasmine rice",
        "quantity": "230 g (rice; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "414 g (rice; weighed recipe water)"
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
      }
    ],
    "method": [
      "Cook the rice component in its measured water, oil and salt in a close-fitting saucepan: bring to a simmer, cover on the lowest heat for 12-15 minutes, then rest off the heat for 10 minutes. Do not drain. Divide the complete cooked rice equally.",
      "Mince raw chicken breast at home or request plain breast mince with no added ingredients. Pound garlic and chilli coarsely. Cut green beans into 1 cm lengths; pick and weigh holy basil leaves.",
      "Heat chicken oil in a large wok over high heat. Fry garlic and chilli for 20 seconds, then add chicken and break into small pieces, stir-frying 5-7 minutes.",
      "Add beans, fish sauce, soy, sugar and sauce water; stir-fry 4-6 minutes until chicken is safely cooked and beans are tender with bite. Reduce to a glossy coating.",
      "Turn off heat and fold in all holy basil just until wilted. Serve immediately with half the jasmine rice each. CoFID sweet-basil composition is only a stated species proxy for holy basil, not an exact analytical match.",
      "Cook poultry, minced meats and mixed meat fillings to a clean-probe centre temperature of 75 C for at least 30 seconds. Cook fish and pork safely throughout; times alone do not establish doneness. Do not wash raw poultry. Fully set eggs. Source: https://www.food.gov.uk/safety-hygiene/cooking-your-food"
    ],
    "nutrition": {
      "calories": "915 kcal",
      "protein": "59.5 g",
      "carbohydrates": "?",
      "fat": "29.0 g",
      "fibre": "4.5 g",
      "sodium": "1545 mg",
      "potassium": "1271 mg",
      "phosphate": "608 mg",
      "salt": "3.86 g"
    },
    "potassium": "Pending review",
    "phosphate": "Pending review",
    "purines": "Pending review",
    "dietaryNote": "Development estimate requiring individual whole-day review; see guide dossier. No universal stage or dialysis suitability claim.",
    "nutritionBasis": "CoFID ingredient-input estimate",
    "nutritionIncomplete": [
      "carbohydrates"
    ],
    "nutritionSourceNote": "Ingredient-input estimates with nutrient-specific supplements and explicit unknowns. CoFID carbohydrate expressed as monosaccharides; alternatives not mixed into totals. See evidence/D070/summary.json.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 2
  },
  {
    "id": "red-curry-style-chicken-with-rice",
    "code": "D071",
    "category": "Dinner",
    "mealFamily": "red-curry-rice",
    "cuisine": "thai",
    "emoji": "🍽️",
    "image": "/images/recipes/D071.webp",
    "name": "Red-curry-style chicken with rice",
    "description": "Fresh chilli-lemongrass-galangal paste is fried before the coconut simmer; no phosphate-containing convenience paste is assumed.",
    "cookingTime": "75 minutes elapsed (development timing)",
    "calories": "?",
    "protein": "?",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Fresh red chilli flesh",
        "shoppingItem": "Fresh red chilli flesh",
        "quantity": "40 g (fresh red paste; raw edible input)"
      },
      {
        "item": "Tender lemongrass core",
        "shoppingItem": "Tender lemongrass core",
        "quantity": "25 g (fresh red paste; raw edible core finely minced)"
      },
      {
        "item": "Fresh galangal",
        "shoppingItem": "Fresh galangal",
        "quantity": "15 g (fresh red paste; peeled raw edible rhizome)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "16 g (fresh red paste; raw edible input)"
      },
      {
        "item": "Shallot",
        "shoppingItem": "Shallot",
        "quantity": "80 g (fresh red paste; raw edible input)"
      },
      {
        "item": "Ground coriander seed",
        "shoppingItem": "Ground coriander seed",
        "quantity": "3 g (fresh red paste; dry)"
      },
      {
        "item": "Ground cumin",
        "shoppingItem": "Ground cumin",
        "quantity": "2 g (fresh red paste; dry)"
      },
      {
        "item": "Fresh lime juice",
        "shoppingItem": "Fresh lime juice",
        "quantity": "15 g (fresh red paste; freshly squeezed, weighed grams)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "25 g (fresh red paste; as sold, weighed grams)"
      },
      {
        "item": "Skinless boneless chicken thigh",
        "shoppingItem": "Skinless boneless chicken thigh",
        "quantity": "400 g (curry; raw edible input)"
      },
      {
        "item": "Full-fat canned coconut milk",
        "shoppingItem": "Full-fat canned coconut milk",
        "quantity": "350 g (curry; as sold, weighed grams)"
      },
      {
        "item": "Red bell pepper",
        "shoppingItem": "Red bell pepper",
        "quantity": "180 g (curry; raw edible input)"
      },
      {
        "item": "Green beans",
        "shoppingItem": "Green beans",
        "quantity": "180 g (curry; raw edible input)"
      },
      {
        "item": "Fish sauce",
        "shoppingItem": "Fish sauce",
        "quantity": "25 g (curry; as sold, weighed grams)"
      },
      {
        "item": "White sugar",
        "shoppingItem": "White sugar",
        "quantity": "12 g (curry; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "150 g (curry; weighed recipe water)"
      },
      {
        "item": "Fresh basil",
        "shoppingItem": "Fresh basil",
        "quantity": "20 g (curry; raw edible input)"
      },
      {
        "item": "Thai fragrant jasmine rice",
        "shoppingItem": "Thai fragrant jasmine rice",
        "quantity": "220 g (rice; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "396 g (rice; weighed recipe water)"
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
      }
    ],
    "method": [
      "Cook the rice component in its measured water, oil and salt in a close-fitting saucepan: bring to a simmer, cover on the lowest heat for 12-15 minutes, then rest off the heat for 10 minutes. Do not drain. Divide the complete cooked rice equally.",
      "Peel galangal and remove tough lemongrass layers before weighing. Mince very finely with chilli, garlic and shallot. Pound with coriander, cumin and paste lime into a coarse paste; this is an original fresh red-curry-style paste without a commercial blend.",
      "Heat paste oil over medium heat and fry the full paste for 8-10 minutes until fragrant, stirring so it does not scorch. Add 100 g of the curry coconut milk and cook 2 minutes.",
      "Add chicken in 3 cm pieces, remaining 250 g coconut milk, curry water, fish sauce and sugar. Simmer gently 15 minutes, then add sliced pepper and beans for 8-10 minutes, until chicken is safely cooked and vegetables tender.",
      "Fold in basil and serve half the complete curry and jasmine rice each. Galangal remains galangal; no ginger value is substituted for its missing composition evidence.",
      "Cook poultry, minced meats and mixed meat fillings to a clean-probe centre temperature of 75 C for at least 30 seconds. Cook fish and pork safely throughout; times alone do not establish doneness. Do not wash raw poultry. Fully set eggs. Source: https://www.food.gov.uk/safety-hygiene/cooking-your-food"
    ],
    "nutrition": {
      "calories": "?",
      "protein": "?",
      "carbohydrates": "?",
      "fat": "?",
      "fibre": "?",
      "sodium": "?",
      "potassium": "?",
      "phosphate": "?",
      "salt": "?"
    },
    "potassium": "Pending review",
    "phosphate": "Pending review",
    "purines": "Pending review",
    "dietaryNote": "Development estimate requiring individual whole-day review; see guide dossier. No universal stage or dialysis suitability claim.",
    "nutritionBasis": "CoFID ingredient-input estimate",
    "nutritionIncomplete": [
      "calories",
      "protein",
      "carbohydrates",
      "fat",
      "fibre",
      "sodium",
      "potassium",
      "phosphate",
      "salt"
    ],
    "nutritionSourceNote": "Ingredient-input estimates with nutrient-specific supplements and explicit unknowns. CoFID carbohydrate expressed as monosaccharides; alternatives not mixed into totals. See evidence/D071/summary.json.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 2
  },
  {
    "id": "lemongrass-pork-with-rice-noodles",
    "code": "D072",
    "category": "Dinner",
    "mealFamily": "lemongrass-pork-noodles",
    "cuisine": "vietnamese",
    "emoji": "🍽️",
    "image": "/images/recipes/D072.webp",
    "name": "Lemongrass pork with rice noodles",
    "description": "Charred lemongrass pork with cool noodles, fresh pickle dressing and herbs differs from ginger-pork dumplings and garlic noodles.",
    "cookingTime": "85 minutes elapsed (development timing)",
    "calories": "1194 kcal",
    "protein": "47.5 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Boneless pork shoulder, lean and edible fat",
        "shoppingItem": "Boneless pork shoulder, lean and edible fat",
        "quantity": "400 g (pork; raw edible input)"
      },
      {
        "item": "Tender lemongrass core",
        "shoppingItem": "Tender lemongrass core",
        "quantity": "28 g (pork; raw edible core finely minced)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "16 g (pork; raw edible input)"
      },
      {
        "item": "Shallot",
        "shoppingItem": "Shallot",
        "quantity": "50 g (pork; raw edible input)"
      },
      {
        "item": "Fish sauce",
        "shoppingItem": "Fish sauce",
        "quantity": "25 g (pork; as sold, weighed grams)"
      },
      {
        "item": "White sugar",
        "shoppingItem": "White sugar",
        "quantity": "20 g (pork; dry)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "30 g (pork; as sold, weighed grams)"
      },
      {
        "item": "Ground black pepper",
        "shoppingItem": "Ground black pepper",
        "quantity": "0.8 g (pork; dry)"
      },
      {
        "item": "Rice noodles",
        "shoppingItem": "Rice noodles",
        "quantity": "220 g (noodle salad; dry)"
      },
      {
        "item": "Carrot",
        "shoppingItem": "Carrot",
        "quantity": "130 g (noodle salad; raw edible input)"
      },
      {
        "item": "Daikon/mooli radish",
        "shoppingItem": "Daikon/mooli radish",
        "quantity": "130 g (noodle salad; raw edible input)"
      },
      {
        "item": "Cucumber",
        "shoppingItem": "Cucumber",
        "quantity": "160 g (noodle salad; raw edible input)"
      },
      {
        "item": "Fresh mint",
        "shoppingItem": "Fresh mint",
        "quantity": "18 g (noodle salad; raw edible leaves)"
      },
      {
        "item": "Fresh coriander leaves",
        "shoppingItem": "Fresh coriander leaves",
        "quantity": "18 g (noodle salad; raw edible input)"
      },
      {
        "item": "Fresh lime juice",
        "shoppingItem": "Fresh lime juice",
        "quantity": "50 g (dressing; freshly squeezed, weighed grams)"
      },
      {
        "item": "Plain unseasoned vinegar",
        "shoppingItem": "Plain unseasoned vinegar",
        "quantity": "30 g (dressing; as sold, weighed grams)"
      },
      {
        "item": "Fish sauce",
        "shoppingItem": "Fish sauce",
        "quantity": "18 g (dressing; as sold, weighed grams)"
      },
      {
        "item": "White sugar",
        "shoppingItem": "White sugar",
        "quantity": "20 g (dressing; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "70 g (dressing; weighed recipe water)"
      },
      {
        "item": "Fresh red chilli flesh",
        "shoppingItem": "Fresh red chilli flesh",
        "quantity": "6 g (dressing; raw edible input)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "12 g (dressing; as sold, weighed grams)"
      }
    ],
    "method": [
      "Slice boneless pork shoulder across the grain 5 mm thick. Mince tender lemongrass core, garlic and shallot with the pork fish sauce, sugar, oil and pepper. Marinate pork refrigerated for 45 minutes.",
      "Julienne carrot and mooli and toss with all dressing ingredients for 20 minutes as a fresh pickle dressing; no liquor is drained. Slice cucumber and tear mint and coriander.",
      "Cook rice noodles in 1800 g process water according to their packet, then drain and cool. No numerical mineral leaching credit is applied.",
      "Griddle pork in batches over medium-high heat for 3-5 minutes per side until safely cooked and browned. Simmer remaining marinade and collected juices until safely cooked before adding to the platter.",
      "Divide noodles, pork and juices, vegetables, herbs and complete dressing between two large bowls.",
      "Cook poultry, minced meats and mixed meat fillings to a clean-probe centre temperature of 75 C for at least 30 seconds. Cook fish and pork safely throughout; times alone do not establish doneness. Do not wash raw poultry. Fully set eggs. Source: https://www.food.gov.uk/safety-hygiene/cooking-your-food"
    ],
    "nutrition": {
      "calories": "1194 kcal",
      "protein": "47.5 g",
      "carbohydrates": "?",
      "fat": "55.1 g",
      "fibre": "?",
      "sodium": "2072 mg",
      "potassium": "1437 mg",
      "phosphate": "631 mg",
      "salt": "5.18 g"
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
    "nutritionSourceNote": "Ingredient-input estimates with nutrient-specific supplements and explicit unknowns. CoFID carbohydrate expressed as monosaccharides; alternatives not mixed into totals. See evidence/D072/summary.json.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 2
  },
  {
    "id": "chicken-laksa-inspired-noodle-bowl",
    "code": "D073",
    "category": "Dinner",
    "mealFamily": "laksa",
    "cuisine": "malaysian",
    "emoji": "🍽️",
    "image": "/images/recipes/D073.webp",
    "name": "Chicken laksa-inspired noodle bowl",
    "description": "A substantial coconut aromatic broth served over noodles, distinct from dry satay salad and rice-accompanied red curry.",
    "cookingTime": "80 minutes elapsed (development timing)",
    "calories": "?",
    "protein": "?",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Tender lemongrass core",
        "shoppingItem": "Tender lemongrass core",
        "quantity": "25 g (laksa paste; raw edible core finely minced)"
      },
      {
        "item": "Fresh galangal",
        "shoppingItem": "Fresh galangal",
        "quantity": "15 g (laksa paste; peeled raw edible rhizome)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "15 g (laksa paste; raw edible input)"
      },
      {
        "item": "Shallot",
        "shoppingItem": "Shallot",
        "quantity": "90 g (laksa paste; raw edible input)"
      },
      {
        "item": "Fresh red chilli flesh",
        "shoppingItem": "Fresh red chilli flesh",
        "quantity": "30 g (laksa paste; raw edible input)"
      },
      {
        "item": "Ground turmeric",
        "shoppingItem": "Ground turmeric",
        "quantity": "2 g (laksa paste; dry)"
      },
      {
        "item": "Ground coriander seed",
        "shoppingItem": "Ground coriander seed",
        "quantity": "3 g (laksa paste; dry)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "35 g (laksa paste; as sold, weighed grams)"
      },
      {
        "item": "Skinless boneless chicken thigh",
        "shoppingItem": "Skinless boneless chicken thigh",
        "quantity": "400 g (broth; raw edible input)"
      },
      {
        "item": "Full-fat canned coconut milk",
        "shoppingItem": "Full-fat canned coconut milk",
        "quantity": "350 g (broth; as sold, weighed grams)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "650 g (broth; weighed recipe water)"
      },
      {
        "item": "Fish sauce",
        "shoppingItem": "Fish sauce",
        "quantity": "25 g (broth; as sold, weighed grams)"
      },
      {
        "item": "White sugar",
        "shoppingItem": "White sugar",
        "quantity": "12 g (broth; dry)"
      },
      {
        "item": "Fresh lime juice",
        "shoppingItem": "Fresh lime juice",
        "quantity": "35 g (broth; freshly squeezed, weighed grams)"
      },
      {
        "item": "Rice noodles",
        "shoppingItem": "Rice noodles",
        "quantity": "220 g (broth; dry)"
      },
      {
        "item": "Mung beansprouts",
        "shoppingItem": "Mung beansprouts",
        "quantity": "160 g (broth; raw edible input)"
      },
      {
        "item": "Fresh coriander leaves",
        "shoppingItem": "Fresh coriander leaves",
        "quantity": "18 g (broth; raw edible input)"
      }
    ],
    "method": [
      "Finely mince peeled galangal, tender lemongrass core, garlic, shallot and chilli; pound with turmeric and coriander. Heat paste oil and fry the entire paste for 8-10 minutes until aromatic.",
      "Add chicken cut into 2 cm pieces, all 650 g broth water and 150 g coconut milk. Simmer gently 15 minutes, then add remaining 200 g coconut milk, fish sauce and sugar. Continue 10 minutes until chicken is safely cooked. The chicken poaching liquor forms the stock and is retained.",
      "Cook rice noodles in 1800 g separate process water according to their packet; drain. Add beansprouts to the simmering broth for 3 minutes so they are thoroughly cooked.",
      "Stir lime into the broth off the heat. Divide noodles between two deep bowls, then add half the chicken, all broth and coriander each. This is a curry-laksa-inspired chicken version without an unquantified shrimp paste or stock cube.",
      "Measure final served broth after kitchen testing to establish countable fluid per person; evaporation makes the 650 g input water an unsuitable final fluid claim.",
      "Cook poultry, minced meats and mixed meat fillings to a clean-probe centre temperature of 75 C for at least 30 seconds. Cook fish and pork safely throughout; times alone do not establish doneness. Do not wash raw poultry. Fully set eggs. Source: https://www.food.gov.uk/safety-hygiene/cooking-your-food"
    ],
    "nutrition": {
      "calories": "?",
      "protein": "?",
      "carbohydrates": "?",
      "fat": "?",
      "fibre": "?",
      "sodium": "?",
      "potassium": "?",
      "phosphate": "?",
      "salt": "?"
    },
    "potassium": "Pending review",
    "phosphate": "Pending review",
    "purines": "Pending review",
    "dietaryNote": "Development estimate requiring individual whole-day review; see guide dossier. No universal stage or dialysis suitability claim.",
    "nutritionBasis": "CoFID ingredient-input estimate",
    "nutritionIncomplete": [
      "calories",
      "protein",
      "carbohydrates",
      "fat",
      "fibre",
      "sodium",
      "potassium",
      "phosphate",
      "salt"
    ],
    "nutritionSourceNote": "Ingredient-input estimates with nutrient-specific supplements and explicit unknowns. CoFID carbohydrate expressed as monosaccharides; alternatives not mixed into totals. See evidence/D073/summary.json.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 2
  },
  {
    "id": "chicken-enchiladas-with-homemade-sauce",
    "code": "D074",
    "category": "Dinner",
    "mealFamily": "enchiladas",
    "cuisine": "mexican",
    "emoji": "🍽️",
    "image": "/images/recipes/D074.webp",
    "name": "Chicken enchiladas with homemade sauce",
    "description": "Rolled corn tortillas baked under a cooked dried-chilli tomato sauce, structurally different from folded dry-griddled quesadillas.",
    "cookingTime": "80 minutes elapsed (development timing)",
    "calories": "1102 kcal",
    "protein": "73.5 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Skinless boneless chicken breast",
        "shoppingItem": "Skinless boneless chicken breast",
        "quantity": "380 g (chicken filling; raw edible input)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "130 g (chicken filling; raw edible input)"
      },
      {
        "item": "Red bell pepper",
        "shoppingItem": "Red bell pepper",
        "quantity": "180 g (chicken filling; raw edible input)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "25 g (chicken filling; as sold, weighed grams)"
      },
      {
        "item": "Ground cumin",
        "shoppingItem": "Ground cumin",
        "quantity": "3 g (chicken filling; dry)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "1 g (chicken filling; dry)"
      },
      {
        "item": "Canned tomatoes including juice",
        "shoppingItem": "Canned tomatoes including juice",
        "quantity": "500 g (red sauce; as sold, whole contents)"
      },
      {
        "item": "Tomato puree",
        "shoppingItem": "Tomato puree",
        "quantity": "35 g (red sauce; as sold)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "18 g (red sauce; raw edible input)"
      },
      {
        "item": "Dried red chilli flesh",
        "shoppingItem": "Dried red chilli flesh",
        "quantity": "8 g (red sauce; dry, stems and seeds removed)"
      },
      {
        "item": "Dried oregano",
        "shoppingItem": "Dried oregano",
        "quantity": "1.5 g (red sauce; dry)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "20 g (red sauce; as sold, weighed grams)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "160 g (red sauce; weighed recipe water)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.8 g (red sauce; dry)"
      },
      {
        "item": "Soft corn tortillas",
        "shoppingItem": "Soft corn tortillas",
        "quantity": "260 g (assembly; as sold)"
      },
      {
        "item": "Mature Cheddar",
        "shoppingItem": "Mature Cheddar",
        "quantity": "110 g (assembly; as sold)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "12 g (assembly; as sold, weighed grams)"
      },
      {
        "item": "Fresh coriander leaves",
        "shoppingItem": "Fresh coriander leaves",
        "quantity": "20 g (assembly; raw edible input)"
      }
    ],
    "method": [
      "Use whole dried red chilli flesh without stems or seeds, weighed 8 g. Soften it in the 160 g hot sauce water for 15 minutes; blend the full water and chilli with canned tomato, puree and garlic.",
      "Heat sauce oil, add the blended mixture, oregano and sauce salt, and simmer 15-20 minutes until thick enough to coat a spoon. No straining or discarded chilli liquid is assumed.",
      "Dice chicken, onion and pepper. Cook in filling oil with cumin and filling salt for 12-15 minutes until chicken is safely cooked and the filling is not watery.",
      "Heat oven to 200 C conventional or 180 C fan. Brush tortillas with the assembly oil and warm in a pan to make flexible. Divide filling and half the grated cheese between them, roll, and place seam down in a small baking dish over one third of the sauce.",
      "Cover with remaining sauce and cheese. Bake 20-25 minutes until bubbling and hot throughout. Scatter coriander and serve exactly half the complete dish per person.",
      "Cook poultry, minced meats and mixed meat fillings to a clean-probe centre temperature of 75 C for at least 30 seconds. Cook fish and pork safely throughout; times alone do not establish doneness. Do not wash raw poultry. Fully set eggs. Source: https://www.food.gov.uk/safety-hygiene/cooking-your-food"
    ],
    "nutrition": {
      "calories": "1102 kcal",
      "protein": "73.5 g",
      "carbohydrates": "?",
      "fat": "54.7 g",
      "fibre": "16.5 g",
      "sodium": "959 mg",
      "potassium": "2240 mg",
      "phosphate": "1234 mg",
      "salt": "2.40 g"
    },
    "potassium": "Pending review",
    "phosphate": "Pending review",
    "purines": "Pending review",
    "dietaryNote": "Development estimate requiring individual whole-day review; see guide dossier. No universal stage or dialysis suitability claim.",
    "nutritionBasis": "CoFID ingredient-input estimate",
    "nutritionIncomplete": [
      "carbohydrates"
    ],
    "nutritionSourceNote": "Ingredient-input estimates with nutrient-specific supplements and explicit unknowns. CoFID carbohydrate expressed as monosaccharides; alternatives not mixed into totals. See evidence/D074/summary.json.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 2
  },
  {
    "id": "beef-fajita-platter-with-tortillas",
    "code": "D075",
    "category": "Dinner",
    "mealFamily": "fajita-platter",
    "cuisine": "mexican",
    "emoji": "🍽️",
    "image": "/images/recipes/D075.webp",
    "name": "Beef fajita platter with tortillas",
    "description": "Hot strips of seared beef and peppers served for table assembly, distinct from a baked tortilla casserole.",
    "cookingTime": "75 minutes elapsed (development timing)",
    "calories": "1177 kcal",
    "protein": "61.7 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Beef sirloin, lean and edible fat",
        "shoppingItem": "Beef sirloin, lean and edible fat",
        "quantity": "400 g (fajitas; raw edible input)"
      },
      {
        "item": "Red bell pepper",
        "shoppingItem": "Red bell pepper",
        "quantity": "200 g (fajitas; raw edible input)"
      },
      {
        "item": "Green bell pepper",
        "shoppingItem": "Green bell pepper",
        "quantity": "180 g (fajitas; raw edible input)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "200 g (fajitas; raw edible input)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "12 g (fajitas; raw edible input)"
      },
      {
        "item": "Fresh lime juice",
        "shoppingItem": "Fresh lime juice",
        "quantity": "45 g (fajitas; freshly squeezed, weighed grams)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "40 g (fajitas; as sold, weighed grams)"
      },
      {
        "item": "Ground cumin",
        "shoppingItem": "Ground cumin",
        "quantity": "3 g (fajitas; dry)"
      },
      {
        "item": "Sweet paprika",
        "shoppingItem": "Sweet paprika",
        "quantity": "3 g (fajitas; dry)"
      },
      {
        "item": "Pure cayenne chilli powder",
        "shoppingItem": "Pure cayenne chilli powder",
        "quantity": "0.7 g (fajitas; dry)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "1.4 g (fajitas; dry)"
      },
      {
        "item": "Soft wheat tortillas",
        "shoppingItem": "Soft wheat tortillas",
        "quantity": "280 g (platter; as sold)"
      },
      {
        "item": "Plain whole-milk yoghurt",
        "shoppingItem": "Plain whole-milk yoghurt",
        "quantity": "130 g (platter; as sold)"
      },
      {
        "item": "Fresh coriander leaves",
        "shoppingItem": "Fresh coriander leaves",
        "quantity": "20 g (platter; raw edible input)"
      },
      {
        "item": "Fresh lime juice",
        "shoppingItem": "Fresh lime juice",
        "quantity": "20 g (platter; freshly squeezed, weighed grams)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "12 g (platter; as sold, weighed grams)"
      }
    ],
    "method": [
      "Cut beef across the grain into 1 cm strips. Mix fajita garlic, lime, spices, salt and half the 40 g fajita oil; marinate beef refrigerated for 30 minutes.",
      "Slice peppers and onion into long strips. Heat remaining 20 g fajita oil in a large pan and sear vegetables in two batches for 6-8 minutes, keeping charred edges and some bite.",
      "Remove vegetables, sear beef in two batches over high heat until browned and safely cooked, then add all raw-contact marinade and bubble thoroughly. Return vegetables briefly.",
      "Warm tortillas in a dry pan and brush with the 12 g platter oil. Mix yoghurt with platter lime and coriander. Serve half the sizzling meat/vegetables, complete juices, tortillas and yoghurt sauce each.",
      "Cook poultry, minced meats and mixed meat fillings to a clean-probe centre temperature of 75 C for at least 30 seconds. Cook fish and pork safely throughout; times alone do not establish doneness. Do not wash raw poultry. Fully set eggs. Source: https://www.food.gov.uk/safety-hygiene/cooking-your-food"
    ],
    "nutrition": {
      "calories": "1177 kcal",
      "protein": "61.7 g",
      "carbohydrates": "?",
      "fat": "62.6 g",
      "fibre": "12.3 g",
      "sodium": "1338 mg",
      "potassium": "1654 mg",
      "phosphate": "861 mg",
      "salt": "3.35 g"
    },
    "potassium": "Pending review",
    "phosphate": "Pending review",
    "purines": "Pending review",
    "dietaryNote": "Development estimate requiring individual whole-day review; see guide dossier. No universal stage or dialysis suitability claim.",
    "nutritionBasis": "CoFID ingredient-input estimate",
    "nutritionIncomplete": [
      "carbohydrates"
    ],
    "nutritionSourceNote": "Ingredient-input estimates with nutrient-specific supplements and explicit unknowns. CoFID carbohydrate expressed as monosaccharides; alternatives not mixed into totals. See evidence/D075/summary.json.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 2
  },
  {
    "id": "caribbean-chicken-curry-with-rice",
    "code": "D076",
    "category": "Dinner",
    "mealFamily": "caribbean-curry-rice",
    "cuisine": "caribbean",
    "emoji": "🍽️",
    "image": "/images/recipes/D076.webp",
    "name": "Caribbean chicken curry with rice",
    "description": "Thyme-allspice curry with potato thickening differs from jerk grilling and from Indian tomato-yoghurt curries.",
    "cookingTime": "100 minutes elapsed (development timing)",
    "calories": "979 kcal",
    "protein": "55.6 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Skinless boneless chicken thigh",
        "shoppingItem": "Skinless boneless chicken thigh",
        "quantity": "400 g (Caribbean curry; raw edible input)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "180 g (Caribbean curry; raw edible input)"
      },
      {
        "item": "Peeled potato",
        "shoppingItem": "Peeled potato",
        "quantity": "240 g (Caribbean curry; raw edible input)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "15 g (Caribbean curry; raw edible input)"
      },
      {
        "item": "Fresh ginger",
        "shoppingItem": "Fresh ginger",
        "quantity": "20 g (Caribbean curry; raw edible input)"
      },
      {
        "item": "Spring onion, bulbs and green tops",
        "shoppingItem": "Spring onion, bulbs and green tops",
        "quantity": "50 g (Caribbean curry; raw edible input)"
      },
      {
        "item": "Fresh green chilli flesh",
        "shoppingItem": "Fresh green chilli flesh",
        "quantity": "8 g (Caribbean curry; raw edible input)"
      },
      {
        "item": "Dried thyme",
        "shoppingItem": "Dried thyme",
        "quantity": "2 g (Caribbean curry; dry)"
      },
      {
        "item": "Ground allspice",
        "shoppingItem": "Ground allspice",
        "quantity": "2 g (Caribbean curry; dry)"
      },
      {
        "item": "Ground turmeric",
        "shoppingItem": "Ground turmeric",
        "quantity": "3 g (Caribbean curry; dry)"
      },
      {
        "item": "Ground coriander seed",
        "shoppingItem": "Ground coriander seed",
        "quantity": "4 g (Caribbean curry; dry)"
      },
      {
        "item": "Ground cumin",
        "shoppingItem": "Ground cumin",
        "quantity": "2 g (Caribbean curry; dry)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "40 g (Caribbean curry; as sold, weighed grams)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "400 g (Caribbean curry; weighed recipe water)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "1.6 g (Caribbean curry; dry)"
      },
      {
        "item": "White basmati rice",
        "shoppingItem": "White basmati rice",
        "quantity": "210 g (rice; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "378 g (rice; weighed recipe water)"
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
      }
    ],
    "method": [
      "Mix chicken cut into 3 cm pieces with minced garlic, ginger, spring onion and chilli, thyme, allspice, turmeric, coriander, cumin and curry salt. Refrigerate 30 minutes.",
      "Heat curry oil in a heavy casserole. Add seasoned chicken and onion wedges and cook 8-10 minutes, turning until coloured; lower heat if spices catch.",
      "Add curry water and peeled potato in 2 cm cubes. Cover and simmer gently 35-45 minutes until chicken is safely cooked and potato tender. Uncover for the last 10 minutes to thicken naturally.",
      "Cook the rice component in its measured water, oil and salt in a close-fitting saucepan: bring to a simmer, cover on the lowest heat for 12-15 minutes, then rest off the heat for 10 minutes. Do not drain. Divide the complete cooked rice equally.",
      "Divide all chicken, potatoes, sauce and rice equally. The individual curry spices define this Caribbean-style blend; no commercial curry powder or hidden stock cube is included.",
      "Cook poultry, minced meats and mixed meat fillings to a clean-probe centre temperature of 75 C for at least 30 seconds. Cook fish and pork safely throughout; times alone do not establish doneness. Do not wash raw poultry. Fully set eggs. Source: https://www.food.gov.uk/safety-hygiene/cooking-your-food"
    ],
    "nutrition": {
      "calories": "979 kcal",
      "protein": "55.6 g",
      "carbohydrates": "?",
      "fat": "32.4 g",
      "fibre": "8.5 g",
      "sodium": "626 mg",
      "potassium": "1785 mg",
      "phosphate": "435 mg",
      "salt": "1.57 g"
    },
    "potassium": "Pending review",
    "phosphate": "Pending review",
    "purines": "Pending review",
    "dietaryNote": "Development estimate requiring individual whole-day review; see guide dossier. No universal stage or dialysis suitability claim.",
    "nutritionBasis": "CoFID ingredient-input estimate",
    "nutritionIncomplete": [
      "carbohydrates"
    ],
    "nutritionSourceNote": "Ingredient-input estimates with nutrient-specific supplements and explicit unknowns. CoFID carbohydrate expressed as monosaccharides; alternatives not mixed into totals. See evidence/D076/summary.json.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 2
  },
  {
    "id": "jollof-style-rice-with-grilled-chicken",
    "code": "D077",
    "category": "Dinner",
    "mealFamily": "jollof-chicken",
    "cuisine": "nigerian",
    "emoji": "🍽️",
    "image": "/images/recipes/D077.webp",
    "name": "Jollof-style rice with grilled chicken",
    "description": "Nigerian-style reduced pepper-tomato base cooks into the rice rather than being spooned over plain rice.",
    "cookingTime": "105 minutes elapsed (development timing)",
    "calories": "1068 kcal",
    "protein": "57.5 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "White basmati rice",
        "shoppingItem": "White basmati rice",
        "quantity": "240 g (pepper base rice; dry)"
      },
      {
        "item": "Fresh tomato",
        "shoppingItem": "Fresh tomato",
        "quantity": "450 g (pepper base rice; raw edible input)"
      },
      {
        "item": "Red bell pepper",
        "shoppingItem": "Red bell pepper",
        "quantity": "260 g (pepper base rice; raw edible input)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "180 g (pepper base rice; raw edible input)"
      },
      {
        "item": "Tomato puree",
        "shoppingItem": "Tomato puree",
        "quantity": "60 g (pepper base rice; as sold)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "14 g (pepper base rice; raw edible input)"
      },
      {
        "item": "Fresh ginger",
        "shoppingItem": "Fresh ginger",
        "quantity": "18 g (pepper base rice; raw edible input)"
      },
      {
        "item": "Fresh red chilli flesh",
        "shoppingItem": "Fresh red chilli flesh",
        "quantity": "10 g (pepper base rice; raw edible input)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "45 g (pepper base rice; as sold, weighed grams)"
      },
      {
        "item": "Dried thyme",
        "shoppingItem": "Dried thyme",
        "quantity": "1.5 g (pepper base rice; dry)"
      },
      {
        "item": "Ground cumin",
        "shoppingItem": "Ground cumin",
        "quantity": "1 g (pepper base rice; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "300 g (pepper base rice; weighed recipe water)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "1.8 g (pepper base rice; dry)"
      },
      {
        "item": "Skinless boneless chicken thigh",
        "shoppingItem": "Skinless boneless chicken thigh",
        "quantity": "400 g (grilled chicken; raw edible input)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "20 g (grilled chicken; as sold, weighed grams)"
      },
      {
        "item": "Sweet paprika",
        "shoppingItem": "Sweet paprika",
        "quantity": "3 g (grilled chicken; dry)"
      },
      {
        "item": "Fresh ginger",
        "shoppingItem": "Fresh ginger",
        "quantity": "10 g (grilled chicken; raw edible input)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "8 g (grilled chicken; raw edible input)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.8 g (grilled chicken; dry)"
      }
    ],
    "method": [
      "Blend tomato, red pepper, half the onion, garlic, ginger and chilli into a coarse puree without straining. Slice the remaining onion.",
      "Cook sliced onion in rice oil for 8 minutes. Add tomato puree and fry 4 minutes; add blended peppers and tomatoes, thyme and cumin. Reduce uncovered 20-30 minutes, stirring, until the base is thick and its raw taste has gone.",
      "Stir rice into the reduced base, add listed water and rice salt, cover tightly and simmer on the lowest heat for 25-30 minutes. Check grains for tenderness; record any extra weighed water. Rest covered 10 minutes and fluff without scraping burnt material into the rice.",
      "Coat chicken with its oil, paprika, grated ginger, garlic and salt. Roast at 220 C conventional or 200 C fan for 25-30 minutes, finishing briefly under the grill for char, and check safe doneness.",
      "Serve half the complete jollof-style rice and chicken with its safely cooked juices each. Chicken cooks separately; no unmeasured bone broth or seasoning cube is added.",
      "Cook poultry, minced meats and mixed meat fillings to a clean-probe centre temperature of 75 C for at least 30 seconds. Cook fish and pork safely throughout; times alone do not establish doneness. Do not wash raw poultry. Fully set eggs. Source: https://www.food.gov.uk/safety-hygiene/cooking-your-food"
    ],
    "nutrition": {
      "calories": "1068 kcal",
      "protein": "57.5 g",
      "carbohydrates": "?",
      "fat": "39.9 g",
      "fibre": "11.3 g",
      "sodium": "720 mg",
      "potassium": "2355 mg",
      "phosphate": "504 mg",
      "salt": "1.80 g"
    },
    "potassium": "Pending review",
    "phosphate": "Pending review",
    "purines": "Pending review",
    "dietaryNote": "Development estimate requiring individual whole-day review; see guide dossier. No universal stage or dialysis suitability claim.",
    "nutritionBasis": "CoFID ingredient-input estimate",
    "nutritionIncomplete": [
      "carbohydrates"
    ],
    "nutritionSourceNote": "Ingredient-input estimates with nutrient-specific supplements and explicit unknowns. CoFID carbohydrate expressed as monosaccharides; alternatives not mixed into totals. See evidence/D077/summary.json.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 2
  },
  {
    "id": "light-chicken-stew-with-seasoned-rice",
    "code": "D078",
    "category": "Dinner",
    "mealFamily": "ghanaian-stew-rice",
    "cuisine": "ghanaian",
    "emoji": "🍽️",
    "image": "/images/recipes/D078.webp",
    "name": "Light chicken stew with seasoned rice",
    "description": "A separate gingery tomato chicken stew with lightly seasoned rice; light refers to stew style, not a nutrient threshold.",
    "cookingTime": "105 minutes elapsed (development timing)",
    "calories": "969 kcal",
    "protein": "54.8 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Skinless boneless chicken thigh",
        "shoppingItem": "Skinless boneless chicken thigh",
        "quantity": "400 g (light stew; raw edible input)"
      },
      {
        "item": "Fresh tomato",
        "shoppingItem": "Fresh tomato",
        "quantity": "500 g (light stew; raw edible input)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "200 g (light stew; raw edible input)"
      },
      {
        "item": "Fresh ginger",
        "shoppingItem": "Fresh ginger",
        "quantity": "28 g (light stew; raw edible input)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "14 g (light stew; raw edible input)"
      },
      {
        "item": "Fresh green chilli flesh",
        "shoppingItem": "Fresh green chilli flesh",
        "quantity": "6 g (light stew; raw edible input)"
      },
      {
        "item": "Ground coriander seed",
        "shoppingItem": "Ground coriander seed",
        "quantity": "2 g (light stew; dry)"
      },
      {
        "item": "Ground black pepper",
        "shoppingItem": "Ground black pepper",
        "quantity": "1 g (light stew; dry)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "40 g (light stew; as sold, weighed grams)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "300 g (light stew; weighed recipe water)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "1.6 g (light stew; dry)"
      },
      {
        "item": "White basmati rice",
        "shoppingItem": "White basmati rice",
        "quantity": "230 g (seasoned rice; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "414 g (seasoned rice; weighed recipe water)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "60 g (seasoned rice; raw edible input)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "15 g (seasoned rice; as sold, weighed grams)"
      },
      {
        "item": "Fresh ginger",
        "shoppingItem": "Fresh ginger",
        "quantity": "8 g (seasoned rice; raw edible input)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.6 g (seasoned rice; dry)"
      }
    ],
    "method": [
      "Blend tomato, half the stew onion, ginger, garlic and chilli. Slice the remaining stew onion. Brown chicken gently in half the stew oil for 6 minutes, then set aside with its juices.",
      "Soften sliced onion in remaining stew oil for 8 minutes. Add blended vegetables and cook uncovered 25-30 minutes until the raw tomato flavour mellows; this is a light-textured Ghanaian-inspired stew, not a claim of low energy.",
      "Return chicken and juices with coriander, pepper, stew salt and listed stew water. Cover and simmer 25-30 minutes until chicken is tender and safely cooked. Keep a looser sauce than jollof base.",
      "For seasoned rice, soften its finely chopped onion and ginger in 15 g oil for 5 minutes. Add rice, rice water and rice salt, cover and simmer 12-15 minutes, then rest 10 minutes.",
      "Serve half the separate seasoned rice and half the complete stew each. No step cooks rice in the tomato base, preserving its distinction from D077.",
      "Cook poultry, minced meats and mixed meat fillings to a clean-probe centre temperature of 75 C for at least 30 seconds. Cook fish and pork safely throughout; times alone do not establish doneness. Do not wash raw poultry. Fully set eggs. Source: https://www.food.gov.uk/safety-hygiene/cooking-your-food"
    ],
    "nutrition": {
      "calories": "969 kcal",
      "protein": "54.8 g",
      "carbohydrates": "?",
      "fat": "34.4 g",
      "fibre": "7.7 g",
      "sodium": "626 mg",
      "potassium": "1750 mg",
      "phosphate": "446 mg",
      "salt": "1.56 g"
    },
    "potassium": "Pending review",
    "phosphate": "Pending review",
    "purines": "Pending review",
    "dietaryNote": "Development estimate requiring individual whole-day review; see guide dossier. No universal stage or dialysis suitability claim.",
    "nutritionBasis": "CoFID ingredient-input estimate",
    "nutritionIncomplete": [
      "carbohydrates"
    ],
    "nutritionSourceNote": "Ingredient-input estimates with nutrient-specific supplements and explicit unknowns. CoFID carbohydrate expressed as monosaccharides; alternatives not mixed into totals. See evidence/D078/summary.json.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 2
  },
  {
    "id": "homemade-chicken-and-spinach-cannelloni",
    "code": "D079",
    "category": "Dinner",
    "mealFamily": "cannelloni",
    "cuisine": "italian",
    "emoji": "🍽️",
    "image": "/images/recipes/D079.webp",
    "name": "Homemade chicken and spinach cannelloni",
    "description": "Filled pasta tubes with separate spinach-ricotta chicken, tomato and roux sauces, not plain cream-cheese pasta.",
    "cookingTime": "110 minutes elapsed (development timing)",
    "calories": "1267 kcal",
    "protein": "83.9 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Skinless boneless chicken breast",
        "shoppingItem": "Skinless boneless chicken breast",
        "quantity": "360 g (filling; raw edible input)"
      },
      {
        "item": "Baby spinach",
        "shoppingItem": "Baby spinach",
        "quantity": "260 g (filling; raw edible input)"
      },
      {
        "item": "Ricotta",
        "shoppingItem": "Ricotta",
        "quantity": "150 g (filling; as sold)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "120 g (filling; raw edible input)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "14 g (filling; raw edible input)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "25 g (filling; as sold, weighed grams)"
      },
      {
        "item": "Ground nutmeg",
        "shoppingItem": "Ground nutmeg",
        "quantity": "0.5 g (filling; dry)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "1 g (filling; dry)"
      },
      {
        "item": "Canned tomatoes including juice",
        "shoppingItem": "Canned tomatoes including juice",
        "quantity": "450 g (tomato sauce; as sold, whole contents)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "8 g (tomato sauce; raw edible input)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "18 g (tomato sauce; as sold, weighed grams)"
      },
      {
        "item": "Fresh basil",
        "shoppingItem": "Fresh basil",
        "quantity": "15 g (tomato sauce; raw edible input)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.6 g (tomato sauce; dry)"
      },
      {
        "item": "Whole milk",
        "shoppingItem": "Whole milk",
        "quantity": "320 g (white sauce; as sold, weighed grams)"
      },
      {
        "item": "Plain white flour",
        "shoppingItem": "Plain white flour",
        "quantity": "25 g (white sauce; dry)"
      },
      {
        "item": "Unsalted butter",
        "shoppingItem": "Unsalted butter",
        "quantity": "25 g (white sauce; as sold)"
      },
      {
        "item": "Ground black pepper",
        "shoppingItem": "Ground black pepper",
        "quantity": "0.5 g (white sauce; dry)"
      },
      {
        "item": "Dry cannelloni tubes",
        "shoppingItem": "Dry cannelloni tubes",
        "quantity": "200 g (assembly; dry)"
      },
      {
        "item": "Parmesan",
        "shoppingItem": "Parmesan",
        "quantity": "45 g (assembly; as sold)"
      }
    ],
    "method": [
      "Use 200 g dry cannelloni tubes that are labelled for filling without precooking. Mince chicken, chop spinach and onion, and crush filling garlic. Soften onion in filling oil 7 minutes, then cook chicken and garlic until safely cooked.",
      "Add spinach and cook until wilted, keeping its liquid in the filling. Reduce until thick, cool until no longer steaming, then fold in ricotta, nutmeg and filling salt.",
      "Simmer all tomato sauce ingredients, keeping basil for the final minute, for 15 minutes. Make white sauce by melting butter, stirring in flour for 1 minute, then gradually whisking in milk; simmer 4 minutes and add pepper.",
      "Heat oven to 200 C conventional or 180 C fan. Put one third of tomato sauce in a deep 20 cm baking dish. Fill all cannelloni, arrange snugly, cover with remaining tomato sauce and white sauce and finish with grated Parmesan.",
      "Cover and bake 30 minutes, then uncover for 10-15 minutes until pasta is tender and the centre piping hot. Rest 10 minutes and divide the whole dish equally. Tube absorption, not a raw-to-cooked pasta factor, determines the practical final yield.",
      "Cook poultry, minced meats and mixed meat fillings to a clean-probe centre temperature of 75 C for at least 30 seconds. Cook fish and pork safely throughout; times alone do not establish doneness. Do not wash raw poultry. Fully set eggs. Source: https://www.food.gov.uk/safety-hygiene/cooking-your-food"
    ],
    "nutrition": {
      "calories": "1267 kcal",
      "protein": "83.9 g",
      "carbohydrates": "?",
      "fat": "57.5 g",
      "fibre": "8.6 g",
      "sodium": "770 mg",
      "potassium": "2833 mg",
      "phosphate": "1158 mg",
      "salt": "1.92 g"
    },
    "potassium": "Pending review",
    "phosphate": "Pending review",
    "purines": "Pending review",
    "dietaryNote": "Development estimate requiring individual whole-day review; see guide dossier. No universal stage or dialysis suitability claim.",
    "nutritionBasis": "CoFID ingredient-input estimate",
    "nutritionIncomplete": [
      "carbohydrates"
    ],
    "nutritionSourceNote": "Ingredient-input estimates with nutrient-specific supplements and explicit unknowns. CoFID carbohydrate expressed as monosaccharides; alternatives not mixed into totals. See evidence/D079/summary.json.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 2
  },
  {
    "id": "chicken-and-pepper-paella",
    "code": "D080",
    "category": "Dinner",
    "mealFamily": "paella",
    "cuisine": "spanish",
    "emoji": "🍽️",
    "image": "/images/recipes/D080.webp",
    "name": "Chicken and pepper paella",
    "description": "Wide-pan absorption rice with sofrito and an undisturbed finish, distinct from stirred risotto, layered biryani and separate curry rice.",
    "cookingTime": "80 minutes elapsed (development timing)",
    "calories": "1003 kcal",
    "protein": "56.0 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Skinless boneless chicken thigh",
        "shoppingItem": "Skinless boneless chicken thigh",
        "quantity": "420 g (paella; raw edible input)"
      },
      {
        "item": "White short-grain rice",
        "shoppingItem": "White short-grain rice",
        "quantity": "240 g (paella; dry)"
      },
      {
        "item": "Red bell pepper",
        "shoppingItem": "Red bell pepper",
        "quantity": "220 g (paella; raw edible input)"
      },
      {
        "item": "Green beans",
        "shoppingItem": "Green beans",
        "quantity": "200 g (paella; raw edible input)"
      },
      {
        "item": "Fresh tomato",
        "shoppingItem": "Fresh tomato",
        "quantity": "240 g (paella; raw edible input)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "130 g (paella; raw edible input)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "16 g (paella; raw edible input)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "55 g (paella; as sold, weighed grams)"
      },
      {
        "item": "Sweet paprika",
        "shoppingItem": "Sweet paprika",
        "quantity": "4 g (paella; dry)"
      },
      {
        "item": "Saffron",
        "shoppingItem": "Saffron",
        "quantity": "0.2 g (paella; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "700 g (paella; weighed recipe water)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "2 g (paella; dry)"
      },
      {
        "item": "Fresh lemon juice",
        "shoppingItem": "Fresh lemon juice",
        "quantity": "35 g (paella; freshly squeezed, weighed grams)"
      },
      {
        "item": "Fresh parsley",
        "shoppingItem": "Fresh parsley",
        "quantity": "15 g (paella; raw edible input)"
      }
    ],
    "method": [
      "Steep saffron in 50 g of the 700 g listed water. Cut chicken into 3 cm pieces and vegetables into bite-size pieces. Use a 30 cm wide heavy shallow pan with a broad heat source.",
      "Brown chicken in 30 g oil for 6-8 minutes; remove with its juices. Add remaining 25 g oil and soften onion and pepper 8 minutes. Add garlic, tomato and paprika and reduce 8-10 minutes to a thick sofrito.",
      "Add rice and stir 1 minute. Return chicken and juices, add beans, saffron infusion, remaining 650 g water and salt, then distribute evenly. Simmer moderately 8 minutes, then gently 10-15 minutes without stirring; check chicken is safely cooked and rice tender.",
      "If necessary add only additional weighed boiling water as a recorded practical revision. Rest off heat 8 minutes. Scatter parsley and drizzle the measured lemon juice across the surface.",
      "Divide the entire rice, chicken, vegetables and pan juices between two plates. This chicken-and-pepper adaptation uses water enriched by retained chicken juices, not an unquantified commercial stock.",
      "Cook poultry, minced meats and mixed meat fillings to a clean-probe centre temperature of 75 C for at least 30 seconds. Cook fish and pork safely throughout; times alone do not establish doneness. Do not wash raw poultry. Fully set eggs. Source: https://www.food.gov.uk/safety-hygiene/cooking-your-food"
    ],
    "nutrition": {
      "calories": "1003 kcal",
      "protein": "56.0 g",
      "carbohydrates": "?",
      "fat": "35.6 g",
      "fibre": "10.8 g",
      "sodium": "593 mg",
      "potassium": "1978 mg",
      "phosphate": "489 mg",
      "salt": "1.48 g"
    },
    "potassium": "Pending review",
    "phosphate": "Pending review",
    "purines": "Pending review",
    "dietaryNote": "Development estimate requiring individual whole-day review; see guide dossier. No universal stage or dialysis suitability claim.",
    "nutritionBasis": "CoFID ingredient-input estimate",
    "nutritionIncomplete": [
      "carbohydrates"
    ],
    "nutritionSourceNote": "Ingredient-input estimates with nutrient-specific supplements and explicit unknowns. CoFID carbohydrate expressed as monosaccharides; alternatives not mixed into totals. See evidence/D080/summary.json.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 2
  },
  {
    "id": "chicken-and-mushroom-puff-pastry-pie",
    "code": "D081",
    "category": "Dinner",
    "mealFamily": "pastry-pie",
    "cuisine": "french",
    "emoji": "🍽️",
    "image": "/images/recipes/D081.webp",
    "name": "Chicken and mushroom puff-pastry pie",
    "description": "A mushroom-cream chicken ragout under a risen puff lid is distinct from the layered filo enclosure of pastilla.",
    "cookingTime": "105 minutes elapsed (development timing)",
    "calories": "1161 kcal",
    "protein": "67.1 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Skinless boneless chicken breast",
        "shoppingItem": "Skinless boneless chicken breast",
        "quantity": "400 g (filling; raw edible input)"
      },
      {
        "item": "White mushrooms",
        "shoppingItem": "White mushrooms",
        "quantity": "300 g (filling; raw edible input)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "160 g (filling; raw edible input)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "12 g (filling; raw edible input)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "25 g (filling; as sold, weighed grams)"
      },
      {
        "item": "Unsalted butter",
        "shoppingItem": "Unsalted butter",
        "quantity": "20 g (filling; as sold)"
      },
      {
        "item": "Plain white flour",
        "shoppingItem": "Plain white flour",
        "quantity": "30 g (filling; dry)"
      },
      {
        "item": "Whole milk",
        "shoppingItem": "Whole milk",
        "quantity": "250 g (filling; as sold, weighed grams)"
      },
      {
        "item": "Single cream",
        "shoppingItem": "Single cream",
        "quantity": "100 g (filling; as sold, weighed grams)"
      },
      {
        "item": "Dried thyme",
        "shoppingItem": "Dried thyme",
        "quantity": "1.5 g (filling; dry)"
      },
      {
        "item": "Ground black pepper",
        "shoppingItem": "Ground black pepper",
        "quantity": "0.7 g (filling; dry)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "1.5 g (filling; dry)"
      },
      {
        "item": "Puff pastry",
        "shoppingItem": "Puff pastry",
        "quantity": "240 g (pastry lid; uncooked as sold)"
      },
      {
        "item": "Whole egg, shell removed",
        "shoppingItem": "Whole egg, shell removed",
        "quantity": "40 g (pastry lid; raw edible input)"
      }
    ],
    "method": [
      "Use uncooked retail puff pastry, not cooked pastry weight. Cut chicken into 2 cm pieces and slice mushrooms and onion. Heat oil and filling butter in a wide saucepan; soften onion 7 minutes.",
      "Add chicken and mushrooms and cook 10-12 minutes until chicken is safely cooked and released mushroom liquid has reduced. Add garlic, thyme and flour; stir 1 minute, then gradually add milk and cream. Simmer 5 minutes, season and cool the thick filling until it stops steaming.",
      "Heat oven to 210 C conventional or 190 C fan. Transfer filling to a 20 cm deep pie dish. Roll pastry between baking paper to cover the dish without added flour. Lay over the filling, crimp edges and make two steam slits.",
      "Brush all 40 g beaten egg over the lid and exposed pastry scraps; bake scraps beside the pie and include them in the servings. Bake 30-40 minutes until pastry is risen and cooked underneath and filling is piping hot.",
      "Rest 10 minutes, cut the lid and filling in two and serve each half with half the pastry scraps. Product butter/vegetable-fat formulation and additive labels remain a required check.",
      "Cook poultry, minced meats and mixed meat fillings to a clean-probe centre temperature of 75 C for at least 30 seconds. Cook fish and pork safely throughout; times alone do not establish doneness. Do not wash raw poultry. Fully set eggs. Source: https://www.food.gov.uk/safety-hygiene/cooking-your-food"
    ],
    "nutrition": {
      "calories": "1161 kcal",
      "protein": "67.1 g",
      "carbohydrates": "?",
      "fat": "70.9 g",
      "fibre": "7.3 g",
      "sodium": "927 mg",
      "potassium": "1879 mg",
      "phosphate": "885 mg",
      "salt": "2.32 g"
    },
    "potassium": "Pending review",
    "phosphate": "Pending review",
    "purines": "Pending review",
    "dietaryNote": "Development estimate requiring individual whole-day review; see guide dossier. No universal stage or dialysis suitability claim.",
    "nutritionBasis": "CoFID ingredient-input estimate",
    "nutritionIncomplete": [
      "carbohydrates"
    ],
    "nutritionSourceNote": "Ingredient-input estimates with nutrient-specific supplements and explicit unknowns. CoFID carbohydrate expressed as monosaccharides; alternatives not mixed into totals. See evidence/D081/summary.json.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 2
  },
  {
    "id": "paprika-pork-goulash-with-buttered-noodles",
    "code": "D082",
    "category": "Dinner",
    "mealFamily": "goulash-noodles",
    "cuisine": "hungarian",
    "emoji": "🍽️",
    "image": "/images/recipes/D082.webp",
    "name": "Paprika pork goulash with buttered noodles",
    "description": "A paprika-onion pork braise with buttered egg noodles, rather than crisp pork, stir-fried strips or curry.",
    "cookingTime": "145 minutes elapsed (development timing)",
    "calories": "1272 kcal",
    "protein": "57.5 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Boneless pork shoulder, lean and edible fat",
        "shoppingItem": "Boneless pork shoulder, lean and edible fat",
        "quantity": "420 g (goulash; raw edible input)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "260 g (goulash; raw edible input)"
      },
      {
        "item": "Red bell pepper",
        "shoppingItem": "Red bell pepper",
        "quantity": "220 g (goulash; raw edible input)"
      },
      {
        "item": "Fresh tomato",
        "shoppingItem": "Fresh tomato",
        "quantity": "260 g (goulash; raw edible input)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "16 g (goulash; raw edible input)"
      },
      {
        "item": "Sweet paprika",
        "shoppingItem": "Sweet paprika",
        "quantity": "14 g (goulash; dry)"
      },
      {
        "item": "Caraway seed, freshly crushed",
        "shoppingItem": "Caraway seed, freshly crushed",
        "quantity": "2 g (goulash; dry)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "35 g (goulash; as sold, weighed grams)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "350 g (goulash; weighed recipe water)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "1.7 g (goulash; dry)"
      },
      {
        "item": "Ground black pepper",
        "shoppingItem": "Ground black pepper",
        "quantity": "0.6 g (goulash; dry)"
      },
      {
        "item": "Dried egg noodles",
        "shoppingItem": "Dried egg noodles",
        "quantity": "240 g (buttered noodles; dry)"
      },
      {
        "item": "Unsalted butter",
        "shoppingItem": "Unsalted butter",
        "quantity": "35 g (buttered noodles; as sold)"
      },
      {
        "item": "Fresh parsley",
        "shoppingItem": "Fresh parsley",
        "quantity": "18 g (buttered noodles; raw edible input)"
      }
    ],
    "method": [
      "Cut boneless pork shoulder into 3 cm cubes and slice onion finely. Heat goulash oil and brown pork in batches; retain juices. Soften onion in the same pan for 12-15 minutes.",
      "Remove the pan from direct heat, stir in sweet Hungarian paprika and crushed caraway, then add garlic, chopped tomato and pepper. Return pork and juices, add listed goulash water, salt and black pepper and bring gently to a simmer.",
      "Cover and braise gently for 75-100 minutes until pork is tender and safely cooked, stirring every 20 minutes. Keep a thick stew rather than soup; record extra weighed water if required.",
      "Cook dry egg noodles in 1800 g unsalted process water according to their packet and drain. Toss immediately with all butter and chopped parsley.",
      "Serve half the pork and complete paprika-onion sauce with half the buttered noodles each. The paprika is warmed off direct high heat to preserve flavour without bitterness.",
      "Cook poultry, minced meats and mixed meat fillings to a clean-probe centre temperature of 75 C for at least 30 seconds. Cook fish and pork safely throughout; times alone do not establish doneness. Do not wash raw poultry. Fully set eggs. Source: https://www.food.gov.uk/safety-hygiene/cooking-your-food"
    ],
    "nutrition": {
      "calories": "1272 kcal",
      "protein": "57.5 g",
      "carbohydrates": "?",
      "fat": "70.0 g",
      "fibre": "13.9 g",
      "sodium": "1092 mg",
      "potassium": "2133 mg",
      "phosphate": "737 mg",
      "salt": "2.73 g"
    },
    "potassium": "Pending review",
    "phosphate": "Pending review",
    "purines": "Pending review",
    "dietaryNote": "Development estimate requiring individual whole-day review; see guide dossier. No universal stage or dialysis suitability claim.",
    "nutritionBasis": "CoFID ingredient-input estimate",
    "nutritionIncomplete": [
      "carbohydrates"
    ],
    "nutritionSourceNote": "Ingredient-input estimates with nutrient-specific supplements and explicit unknowns. CoFID carbohydrate expressed as monosaccharides; alternatives not mixed into totals. See evidence/D082/summary.json.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 2
  }
];
