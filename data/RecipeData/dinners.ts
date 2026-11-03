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
  "Cook the basmati rice according to the packet instructions using unsalted water. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork.",
  "Boil the cabbage and onion in unsalted water until tender, then drain well.",
  "Brush the chicken with a little of the olive oil and grill in a hot frying pan until cooked through. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food.",
  "Add the remaining olive oil, lemon juice and dried parsley to the cooked vegetables and toss gently. Use the listed herbs, spices or citrus for flavour before considering any extra seasoning.",
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
    quantityConversionsEstimated: true,
    primaryDietCategory: "Mediterranean-style",
    dietCategories: ["Mediterranean-style"]
  },
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
  "Cook the basmati rice according to the packet instructions using unsalted water. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork.",
  "Boil the cabbage and carrots in unsalted water until tender, then drain.",
  "Rub the turkey with the dried rosemary.",
  "Heat half the olive oil in a frying pan and cook the turkey until browned and cooked through. Let the pan warm before the food goes in. If the oil begins to smoke or the food catches immediately, lower the heat before continuing. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food.",
  "Toss the vegetables with the remaining olive oil and serve with the turkey and rice. Use a fork or broad spoon and a light lifting motion so the grains stay separate. Work gently from the bottom of the bowl without pressing or mashing the grains."
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
    quantityConversionsEstimated: true,
    primaryDietCategory: "Mediterranean-style",
    dietCategories: ["Mediterranean-style","Intermittent fasting — eating-window meal"]
  },
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
  "Cook the basmati rice according to the packet instructions using unsalted water. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork.",
  "Boil the carrots and cabbage in unsalted water until tender, then drain well.",
  "Season the pork with the dried thyme.",
  "Heat half the olive oil in a frying pan and grill the pork until cooked through. Let the pan warm before the food goes in. If the oil begins to smoke or the food catches immediately, lower the heat before continuing.",
  "Toss the vegetables with the remaining olive oil and serve with the pork and rice. Use a fork or broad spoon and a light lifting motion so the grains stay separate. Work gently from the bottom of the bowl without pressing or mashing the grains."
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
    quantityConversionsEstimated: true,
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet","Intermittent fasting — eating-window meal"]
  },
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
  "Place the cod on a baking tray and bake until cooked through and opaque. Put the dish or tray on a stable oven shelf and begin checking towards the end of the stated time. Check the centre as well as the surface; a browned top alone does not show that the inside is cooked.",
  "Cook the basmati rice according to the packet instructions using unsalted water. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork.",
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
    quantityConversionsEstimated: true,
    primaryDietCategory: "Mediterranean-style",
    dietCategories: ["Mediterranean-style","Intermittent fasting — eating-window meal"]
  },
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
  "Place the salmon on a baking tray and bake until cooked through. Put the dish or tray on a stable oven shelf and begin checking towards the end of the stated time. Check the centre as well as the surface; a browned top alone does not show that the inside is cooked. Check the thickest part: it should be opaque, steaming hot and separate readily into flakes with a fork. Continue cooking if the centre is still cool or translucent.",
  "Cook the basmati rice according to the packet instructions using unsalted water. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork.",
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
    quantityConversionsEstimated: true,
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet","Intermittent fasting — eating-window meal"]
  },
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
  "Cook the basmati rice according to the packet instructions using unsalted water. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork.",
  "Boil the cabbage and onion in unsalted water until tender, then drain.",
  "Heat the olive oil in a frying pan over a medium heat. Let the pan warm before the food goes in. If the oil begins to smoke or the food catches immediately, lower the heat before continuing.",
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
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.095450 g per serving, 0.1064% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors. Owner-approved source assumptions D5 are documented in the 16 October 2026 reconciliation workbook. Nominal 5% beef mince uses the approved extra-lean CoFID proxy at its actual 4.2 g fat per 100 g.",
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet","Intermittent fasting — eating-window meal"]
  },
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
  "Cook the pasta according to the packet instructions using unsalted water. Separate the pasta or noodles as they soften so they do not stick together. Check the texture towards the end of the cooking time; it should be tender with no chalky centre.",
  "Boil the eggs until cooked through, cool slightly, peel and chop.",
  "Boil the cabbage in unsalted water until tender, then drain well.",
  "Melt the butter in the drained pasta and stir through the cabbage. Swirl the pan as the butter melts to coat its base. Keep it from browning or smoking before the next ingredient is added. Use the measured seasoning and sauces shown in the ingredients; do not add extra salt or a potassium-based salt substitute.",
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
    quantityConversionsEstimated: true,
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
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
  "Cook the basmati rice according to the packet instructions using unsalted water. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork.",
  "Boil the onion in unsalted water until softened, then drain.",
  "Heat half the olive oil in a frying pan and cook the chicken until browned and cooked through. Let the pan warm before the food goes in. If the oil begins to smoke or the food catches immediately, lower the heat before continuing. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food.",
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
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.095450 g per serving, 0.1202% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors.",
    primaryDietCategory: "Mediterranean-style",
    dietCategories: ["Mediterranean-style"]
  },
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
  "Cook the pasta according to the packet instructions using unsalted water. Separate the pasta or noodles as they soften so they do not stick together. Check the texture towards the end of the cooking time; it should be tender with no chalky centre.",
  "Boil the cabbage in unsalted water until tender, then drain.",
  "Heat the olive oil in a frying pan and cook the pork until cooked through. Let the pan warm before the food goes in. If the oil begins to smoke or the food catches immediately, lower the heat before continuing.",
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
    quantityConversionsEstimated: true,
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet","Intermittent fasting — eating-window meal"]
  },
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
  "Cook the basmati rice according to the packet instructions using unsalted water. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork.",
  "Boil the eggs until cooked through, then cool slightly, peel and halve.",
  "Boil the cauliflower in unsalted water until tender, then drain.",
  "Stir the butter through the hot rice. Use the measured seasoning and sauces shown in the ingredients; do not add extra salt or a potassium-based salt substitute.",
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
    quantityConversionsEstimated: true,
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet","Intermittent fasting — eating-window meal"]
  },
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
  "Cook the basmati rice according to the packet instructions. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork.",
  "Slice the mushrooms and chicken into even pieces.",
  "Heat the olive oil in a frying pan and cook the chicken until thoroughly cooked. Let the pan warm before the food goes in. If the oil begins to smoke or the food catches immediately, lower the heat before continuing. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food.",
  "Add the mushrooms and cook until tender.",
  "Add the cabbage and cook gently until softened.",
  "Stir in the cream, thyme and black pepper and warm through.",
  "Fold through the cooked rice and serve. Use a fork or broad spoon and a light lifting motion so the grains stay separate. Work gently from the bottom of the bowl without pressing or mashing the grains."
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
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.222238 g per serving, 0.2909% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors. Owner-approved source assumptions D4 are documented in the 16 October 2026 reconciliation workbook.",
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
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
  "Bring a large saucepan of water to the boil and cook the pasta according to the packet instructions. Separate the pasta or noodles as they soften so they do not stick together. Check the texture towards the end of the cooking time; it should be tender with no chalky centre.",
  "Cut the turkey into bite-sized pieces.",
  "Heat the olive oil in a frying pan and cook the turkey until thoroughly cooked. Let the pan warm before the food goes in. If the oil begins to smoke or the food catches immediately, lower the heat before continuing. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food.",
  "Add the cabbage and sweetcorn to the pasta pan for the final 4 minutes of cooking. Use the listed herbs, spices or citrus for flavour before considering any extra seasoning.",
  "Drain the pasta and vegetables thoroughly.",
  "Add the cream, parsley, black pepper and lemon juice to the turkey pan.",
  "Heat gently until warmed through.",
  "Stir in the drained pasta and vegetables.",
  "Cook together for a further 2 minutes, then serve."
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
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.222238 g per serving, 0.3329% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors.",
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },

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
  "Heat the oven to 200°C.",
  "Place the cod on a baking tray and brush with the olive oil.",
  "Sprinkle over the parsley and black pepper and bake for 15 minutes. Put the dish or tray on a stable oven shelf and begin checking towards the end of the stated time. Check the centre as well as the surface; a browned top alone does not show that the inside is cooked.",
  "Cook the pasta in a large saucepan according to the packet instructions. Separate the pasta or noodles as they soften so they do not stick together. Check the texture towards the end of the cooking time; it should be tender with no chalky centre.",
  "Add the cabbage and sliced green pepper for the final 4 minutes. Use the listed herbs, spices or citrus for flavour before considering any extra seasoning.",
  "Drain the pasta and vegetables thoroughly.",
  "Check the cod is cooked through and flakes easily.",
  "Flake the cod into large pieces and place over the pasta and vegetables.",
  "Drizzle over the measured lemon juice and serve."
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
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.222238 g per serving, 0.3551% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors.",
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },

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
  "Rinse the rice, place it in a saucepan with the required cooking water and bring to the boil.",
  "Reduce the heat, cover and cook according to the rice instructions. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork.",
  "Cut the chicken into bite-sized pieces.",
  "Heat the olive oil in a frying pan and cook the chicken for 8 minutes until cooked through. Let the pan warm before the food goes in. If the oil begins to smoke or the food catches immediately, lower the heat before continuing. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food.",
  "Add the cabbage and sweetcorn to the chicken pan and cook for 4 minutes. Use the listed herbs, spices or citrus for flavour before considering any extra seasoning.",
  "Check the rice is tender and drain if necessary.",
  "Add the thyme, black pepper and lemon juice to the chicken and vegetables.",
  "Spoon the rice into a bowl and top with the chicken mixture.",
  "Serve immediately. Transfer the complete portion to a plate or bowl, including any listed sides or sauce. Eat while freshly prepared; extra bread, dips or toppings would be additions to this meal."
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
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.222238 g per serving, 0.2949% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors. Owner-approved source assumptions D4 are documented in the 16 October 2026 reconciliation workbook.",
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },

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
  "Heat the oven to 200°C.",
  "Slice the green pepper and place on a baking tray with half the olive oil. Keep the pieces a similar size so they cook evenly. Keep any ingredients that are added later separate from those that go into the pan first.",
  "Roast the pepper for 15 minutes.",
  "Start cooking the basmati rice in a covered saucepan.",
  "Cut the turkey into bite-sized pieces.",
  "Heat the remaining olive oil in a frying pan and cook the turkey for 8 minutes. Let the pan warm before the food goes in. If the oil begins to smoke or the food catches immediately, lower the heat before continuing. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food.",
  "Add the cabbage to the turkey pan and cook for 4 minutes. Use the listed herbs, spices or citrus for flavour before considering any extra seasoning.",
  "Add rosemary, black pepper and lemon juice to the turkey.",
  "Check the rice and drain if required.",
  "Serve the rice topped with the turkey, cabbage and roasted pepper."
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
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.222238 g per serving, 0.3039% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors.",
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },

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
  "Cook the basmati rice in a covered saucepan according to the packet instructions. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork.",
  "Peel, core and dice the apple. Remove any inedible core, stalk or peel specified in the ingredient list before weighing. Cut into pieces that are comfortable to eat with the rest of the meal.",
  "Cut the pork into thin strips.",
  "Heat the olive oil in a frying pan and cook the pork for 8 minutes until cooked through. Let the pan warm before the food goes in. If the oil begins to smoke or the food catches immediately, lower the heat before continuing.",
  "Add the cabbage and cook for 4 minutes. Use the listed herbs, spices or citrus for flavour before considering any extra seasoning.",
  "Add the diced apple to a second area of the pan with 1 tbsp water.",
  "Cook the apple for 3 minutes until just softened.",
  "Add rosemary, black pepper and lemon juice to the pork.",
  "Check the rice is tender.",
  "Spoon the rice into a bowl and top with pork, cabbage and warm apple."
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
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.222238 g per serving, 0.2757% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors.",
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },

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
  "Bring a large saucepan of water to the boil and cook the pasta. Separate the pasta or noodles as they soften so they do not stick together. Check the texture towards the end of the cooking time; it should be tender with no chalky centre.",
  "Cut the chicken into bite-sized pieces.",
  "Heat the olive oil in a frying pan and cook the chicken for 8 minutes. Let the pan warm before the food goes in. If the oil begins to smoke or the food catches immediately, lower the heat before continuing. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food.",
  "Add the cabbage to the pasta water for the final 4 minutes. Use the listed herbs, spices or citrus for flavour before considering any extra seasoning.",
  "Drain the pasta and cabbage thoroughly.",
  "Add the cream, thyme, black pepper and lemon juice to the chicken.",
  "Heat gently for 2 minutes.",
  "Stir in the drained pasta and cabbage.",
  "Toss together and serve."
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
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.222238 g per serving, 0.3533% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors. Owner-approved source assumptions D4 are documented in the 16 October 2026 reconciliation workbook.",
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },

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
  "Heat the oven to 200°C.",
  "Place the cod on a baking tray and brush with the olive oil.",
  "Sprinkle with the dried parsley and black pepper and bake until the cod is opaque and flakes easily. Put the dish or tray on a stable oven shelf and begin checking towards the end of the stated time. Check the centre as well as the surface; a browned top alone does not show that the inside is cooked.",
  "Start the basmati rice in a covered saucepan according to the packet instructions.",
  "Cook the cabbage and sweetcorn in a separate saucepan of unsalted water until tender, then drain.",
  "Check the cod is cooked through and flakes easily.",
  "Check the rice is tender and drain if required.",
  "Place the rice, cabbage and sweetcorn in a bowl.",
  "Top with the baked cod and drizzle over the lemon juice. Serve immediately. Transfer the complete portion to a plate or bowl, including any listed sides or sauce. Eat while freshly prepared; extra bread, dips or toppings would be additions to this meal."
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
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.222238 g per serving, 0.2950% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors.",
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },

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
  "Cook the pasta in a large saucepan according to the packet instructions. Separate the pasta or noodles as they soften so they do not stick together. Check the texture towards the end of the cooking time; it should be tender with no chalky centre.",
  "Add the cabbage, sweetcorn and sliced green pepper for the final 4 minutes of cooking. Use the listed herbs, spices or citrus for flavour before considering any extra seasoning.",
  "Drain the pasta and vegetables thoroughly.",
  "Crack the eggs into a bowl and whisk lightly.",
  "Heat the olive oil in a frying pan over medium-low heat. Let the pan warm before the food goes in. If the oil begins to smoke or the food catches immediately, lower the heat before continuing.",
  "Add the eggs and stir gently until softly scrambled and cooked through.",
  "Add the pasta and vegetables to the egg.",
  "Stir through the parsley, black pepper and lemon juice. Mix until the added ingredients are evenly distributed. Scrape around the sides of the bowl or pan as appropriate, so the measured mixture is used throughout the serving.",
  "Serve immediately. Transfer the complete portion to a plate or bowl, including any listed sides or sauce. Eat while freshly prepared; extra bread, dips or toppings would be additions to this meal."
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
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.222238 g per serving, 0.3348% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors.",
    primaryDietCategory: "Vegetarian",
    dietCategories: ["Vegetarian"]
  },

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
  "Cook the basmati rice in a covered saucepan according to the packet instructions. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork.",
  "Peel, core and dice the apple. Remove any inedible core, stalk or peel specified in the ingredient list before weighing. Cut into pieces that are comfortable to eat with the rest of the meal.",
  "Cut the chicken into bite-sized pieces.",
  "Heat the olive oil in a frying pan and cook the chicken for 8 minutes until cooked through. Let the pan warm before the food goes in. If the oil begins to smoke or the food catches immediately, lower the heat before continuing. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food.",
  "Add the cabbage and cook for 4 minutes. Use the listed herbs, spices or citrus for flavour before considering any extra seasoning.",
  "Add the diced apple with 1 tbsp water and cook for 3 minutes until softened.",
  "Stir the parsley, black pepper and lemon juice through the chicken mixture. Mix until the added ingredients are evenly distributed. Scrape around the sides of the bowl or pan as appropriate, so the measured mixture is used throughout the serving.",
  "Check the rice is tender.",
  "Spoon the rice into a bowl and top with the chicken mixture.",
  "Serve immediately. Transfer the complete portion to a plate or bowl, including any listed sides or sauce. Eat while freshly prepared; extra bread, dips or toppings would be additions to this meal."
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
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.222238 g per serving, 0.2759% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors. Owner-approved source assumptions D4 are documented in the 16 October 2026 reconciliation workbook.",
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  {
    id: "chicken-herb-sweetcorn-rice", code: "D021", mealFamily: "rice-dish", category: "Dinner", emoji: "🍗", image: "/images/recipes/D021.png",
    name: "Chicken, Herb & Sweetcorn Rice", description: "Tender chicken with fluffy basmati rice, sweetcorn and herbs.", cookingTime: "30 minutes", calories: "519 kcal", protein: "33.9 g", equipment: "Large saucepan, frying pan, wooden spoon, knife, chopping board",
    ingredients: [
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "100 g" }, { item: "Basmati rice", shoppingItem: "Basmati rice", quantity: "90 g" }, { item: "Sweetcorn kernels", shoppingItem: "Sweetcorn kernels", quantity: "60 g" }, { item: "Onion", shoppingItem: "Onions", quantity: "½ onion (50 g)" }, { item: "Olive oil", shoppingItem: "Olive oil", quantity: "1 tsp" }, { item: "Dried thyme", shoppingItem: "Dried thyme", quantity: "½ tsp" }, { item: "Black pepper", shoppingItem: "Black pepper", quantity: "¼ tsp" }
    ],
    method: [
  "Cook the rice according to the packet instructions, then drain. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork.",
  "Dice the chicken and onion. Keep the pieces a similar size so they cook evenly. Keep any ingredients that are added later separate from those that go into the pan first.",
  "Heat the olive oil and cook the onion for 3 minutes. Stir around the base and edges of the pan. The vegetables should soften and lose their raw bite; lower the heat if they start to darken before they are tender.",
  "Add the chicken and thyme and cook until thoroughly cooked. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food.",
  "Stir in the sweetcorn and cook for 2 minutes.",
  "Fold through the cooked rice and season with black pepper. Use a fork or broad spoon and a light lifting motion so the grains stay separate. Work gently from the bottom of the bowl without pressing or mashing the grains.",
  "Serve hot. Transfer the complete portion to a plate or bowl, including any listed sides or sauce. Eat while freshly prepared; extra bread, dips or toppings would be additions to this meal."
],
    nutrition: { calories: "519 kcal", protein: "33.9 g", carbohydrates: "84.3 g", fat: "7.3 g", fibre: "4.5 g", sodium: "63 mg", salt: "0.16 g", potassium: "674 mg", phosphate: "378 mg" },
    potassium: "Moderate", phosphate: "High", purines: "Moderate", dietaryNote: "A protein-rich rice dinner with vegetables and no added salt.", fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1
  ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.222238 g per serving, 0.2629% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors. Owner-approved source assumptions D4 are documented in the 16 October 2026 reconciliation workbook.",
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  {
    id: "beef-pepper-pasta", code: "D022", mealFamily: "hot-pasta", category: "Dinner", emoji: "🥩", image: "/images/recipes/D022.png",
    name: "Beef & Pepper Pasta", description: "Lean beef mince with pasta, peppers and onion in a light herb sauce.", cookingTime: "25 minutes", calories: "519 kcal", protein: "37.0 g", equipment: "Large saucepan, frying pan, colander, wooden spoon, knife, chopping board",
    ingredients: [
      { item: "Beef mince (5% fat)", shoppingItem: "Beef mince (5% fat)", quantity: "120 g" }, { item: "White pasta", shoppingItem: "White pasta", quantity: "85 g" }, { item: "Green pepper", shoppingItem: "Green peppers", quantity: "1½ green peppers (70 g)" }, { item: "Onion", shoppingItem: "Onions", quantity: "½ onion (50 g)" }, { item: "Olive oil", shoppingItem: "Olive oil", quantity: "1 tsp" }, { item: "Dried oregano", shoppingItem: "Dried oregano", quantity: "½ tsp" }, { item: "Black pepper", shoppingItem: "Black pepper", quantity: "¼ tsp" }
    ],
    method: [
  "Cook the pasta according to the packet instructions, then drain. Separate the pasta or noodles as they soften so they do not stick together. Check the texture towards the end of the cooking time; it should be tender with no chalky centre.",
  "Finely chop the onion and pepper. Keep the pieces a similar size so they cook evenly. Keep any ingredients that are added later separate from those that go into the pan first.",
  "Heat the olive oil and cook the onion and pepper for 4 minutes. Stir around the base and edges of the pan. The vegetables should soften and lose their raw bite; lower the heat if they start to darken before they are tender.",
  "Add the beef mince and cook, breaking it up with a wooden spoon.",
  "Stir in the oregano and black pepper.",
  "Add the cooked pasta and toss together.",
  "Serve hot. Transfer the complete portion to a plate or bowl, including any listed sides or sauce. Eat while freshly prepared; extra bread, dips or toppings would be additions to this meal."
],
    nutrition: { calories: "519 kcal", protein: "37.0 g", carbohydrates: "70.1 g", fat: "11.3 g", fibre: "4.0 g", sodium: "114 mg", salt: "0.29 g", potassium: "709 mg", phosphate: "394 mg" },
    potassium: "Moderate", phosphate: "High", purines: "Moderate", dietaryNote: "Lean beef provides protein while pepper and onion add flavour without relying on added salt.", fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1
  ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.288288 g per serving, 0.4097% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors. Owner-approved source assumptions D5 are documented in the 16 October 2026 reconciliation workbook. Nominal 5% beef mince uses the approved extra-lean CoFID proxy at its actual 4.2 g fat per 100 g.",
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  {
    id: "herb-cod-potatoes-cabbage", code: "D023", mealFamily: "potato-dish", category: "Dinner", emoji: "🐟", image: "/images/recipes/D023.png",
    name: "Herb Cod with Potatoes & Cabbage", description: "Baked cod served with boiled potatoes and tender cabbage with lemon and herbs.", cookingTime: "35 minutes", calories: "449 kcal", protein: "30.7 g", equipment: "Baking tray, saucepan, steamer or second saucepan, knife, chopping board, Oven",
    ingredients: [
      { item: "Cod fillet", shoppingItem: "Cod fillet", quantity: "140 g" }, { item: "Potatoes", shoppingItem: "Potatoes", quantity: "250 g" }, { item: "Cabbage", shoppingItem: "Cabbage", quantity: "¼ cabbage (100 g)" }, { item: "Unsalted butter", shoppingItem: "Unsalted butter", quantity: "15 g" }, { item: "Lemon juice", shoppingItem: "Lemon juice", quantity: "1 tbsp" }, { item: "Dried parsley", shoppingItem: "Dried parsley", quantity: "½ tsp" }, { item: "Black pepper", shoppingItem: "Black pepper", quantity: "¼ tsp" }
    ],
    method: [
  "Heat the oven to 200°C.",
  "Peel and cut the potatoes into even pieces.",
  "Boil the potatoes until tender. Keep the pieces at a steady simmer and test the thickest piece with the tip of a knife. Stop when it goes in without a hard centre, before the potato breaks apart.",
  "Place the cod on a baking tray with half the butter, lemon juice and parsley.",
  "Bake until the cod is opaque and cooked through. Put the dish or tray on a stable oven shelf and begin checking towards the end of the stated time. Check the centre as well as the surface; a browned top alone does not show that the inside is cooked.",
  "Cook the cabbage in unsalted water until tender.",
  "Drain the potatoes and cabbage. Boiling and discarding the water can remove some potassium, but it does not make the portion potassium-free or establish a precise reduction.",
  "Toss the potatoes with the remaining butter and black pepper.",
  "Serve."
],
    nutrition: { calories: "449 kcal", protein: "30.7 g", carbohydrates: "54.2 g", fat: "13.6 g", fibre: "5.0 g", sodium: "141 mg", salt: "0.35 g", potassium: "1827 mg", phosphate: "354 mg" },
    potassium: "High", phosphate: "High", purines: "Low", dietaryNote: "The potatoes are boiled first and the cooking water is discarded to help reduce potassium by leaching. A simple fish dinner with cabbage and potatoes. Potassium is influenced by the potato portion.", fluidMl: 15, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1
  ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.222238 g per serving, 0.4086% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors.",
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  {
    id: "creamy-cheese-egg-pasta", code: "D024", mealFamily: "hot-pasta", category: "Dinner", emoji: "🍳", image: "/images/recipes/D024.png",
    name: "Creamy Cheese & Egg Pasta", description: "Pasta coated in a creamy egg and Cheddar sauce with onion and herbs.", cookingTime: "20 minutes", calories: "589 kcal", protein: "27.7 g", equipment: "Large saucepan, frying pan, mixing bowl, colander, wooden spoon",
    ingredients: [
      { item: "White pasta", shoppingItem: "White pasta", quantity: "90 g" }, { item: "Egg", shoppingItem: "Egg", quantity: "1" }, { item: "Cheddar cheese", shoppingItem: "Cheddar cheese", quantity: "25 g" }, { item: "Semi-skimmed milk", shoppingItem: "Semi-skimmed milk", quantity: "100 ml" }, { item: "Onion", shoppingItem: "Onions", quantity: "½ onion (40 g)" }, { item: "Olive oil", shoppingItem: "Olive oil", quantity: "1 tsp" }, { item: "Dried parsley", shoppingItem: "Dried parsley", quantity: "½ tsp" }, { item: "Black pepper", shoppingItem: "Black pepper", quantity: "¼ tsp" }
    ],
    method: [
  "Cook the pasta according to the packet instructions, reserving a little cooking water before draining. Separate the pasta or noodles as they soften so they do not stick together. Check the texture towards the end of the cooking time; it should be tender with no chalky centre.",
  "Finely chop the onion and cook gently in the olive oil for 4 minutes. Keep the pieces a similar size so they cook evenly. Keep any ingredients that are added later separate from those that go into the pan first.",
  "Beat the egg with the milk and grated Cheddar. Beat until the mixture has an even colour and consistency, with no long strands of unmixed egg white.",
  "Add the drained pasta to the onion pan and remove from the heat. Use the measured seasoning and sauces shown in the ingredients; do not add extra salt or a potassium-based salt substitute.",
  "Stir in the egg mixture and parsley, using a splash of pasta water to loosen the sauce.",
  "Return to very low heat and stir until the egg mixture is cooked through.",
  "Season with black pepper and serve."
],
    nutrition: { calories: "589 kcal", protein: "27.7 g", carbohydrates: "76.1 g", fat: "21.4 g", fibre: "3.0 g", sodium: "304 mg", salt: "0.76 g", potassium: "532 mg", phosphate: "498 mg" },
    potassium: "Moderate", phosphate: "High", purines: "Low", dietaryNote: "Egg and cheese provide protein and richness without meat or fish.", fluidMl: 100, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1
  ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.222238 g per serving, 0.2910% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors.",
    primaryDietCategory: "Vegetarian",
    dietCategories: ["Vegetarian"]
  },
  {
    id: "pork-apple-cabbage", code: "D025", mealFamily: "meat-and-vegetable-dish", category: "Dinner", emoji: "🍖", image: "/images/recipes/D025.png",
    name: "Pork, Apple & Cabbage", description: "Grilled pork with warm apple and tender cabbage, finished with herbs.", cookingTime: "30 minutes", calories: "396 kcal", protein: "36.9 g", equipment: "Grill pan, saucepan, frying pan, knife, chopping board",
    ingredients: [
      { item: "Lean pork loin", shoppingItem: "Lean pork loin", quantity: "140 g" }, { item: "Apple", shoppingItem: "Apples", quantity: "1 apple (100 g)" }, { item: "Cabbage", shoppingItem: "Cabbage", quantity: "¼ cabbage (120 g)" }, { item: "Unsalted butter", shoppingItem: "Unsalted butter", quantity: "15 g" }, { item: "Vegetable oil", shoppingItem: "Vegetable oil", quantity: "1 tsp" }, { item: "Dried rosemary", shoppingItem: "Dried rosemary", quantity: "½ tsp" }, { item: "Black pepper", shoppingItem: "Black pepper", quantity: "0.2 g (small pinch)" }
    ],
    method: [
  "Core and slice the apple and shred the cabbage. Keep the pieces a similar size so they cook evenly. Keep any ingredients that are added later separate from those that go into the pan first. Remove any inedible core, stalk or peel specified in the ingredient list before weighing. Cut into pieces that are comfortable to eat with the rest of the meal.",
  "Heat the grill pan and cook the pork with rosemary until thoroughly cooked.",
  "Cook the cabbage in unsalted water until tender, then drain.",
  "Heat the butter and gently cook the apple until softened.",
  "Add the cabbage and toss together.",
  "Season with the specified 0.2 g black pepper (a small pinch).",
  "Serve."
],
    nutrition: { calories: "396 kcal", protein: "36.9 g", carbohydrates: "17.6 g", fat: "20.3 g", fibre: "6.0 g", sodium: "68 mg", salt: "0.17 g", potassium: "948 mg", phosphate: "344 mg" },
    potassium: "Moderate", phosphate: "High", purines: "Moderate", dietaryNote: "Apple adds natural sweetness to pork and cabbage without a salty sauce.", fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1
  ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.077300 g per serving, 0.4381% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors.",
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  {
    id: "creamy-chicken-pepper-pasta", code: "D026", mealFamily: "hot-pasta", category: "Dinner", emoji: "🍗", image: "/images/recipes/D026.png",
    name: "Creamy Chicken & Pepper Pasta", description: "Chicken and peppers folded through pasta with a light creamy sauce.", cookingTime: "25 minutes", calories: "562 kcal", protein: "36.3 g", equipment: "Large saucepan, frying pan, colander, wooden spoon, knife, chopping board",
    ingredients: [
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "100 g" }, { item: "White pasta", shoppingItem: "White pasta", quantity: "85 g" }, { item: "Green pepper", shoppingItem: "Green peppers", quantity: "1½ green peppers (70 g)" }, { item: "Onion", shoppingItem: "Onions", quantity: "½ onion (40 g)" }, { item: "Single cream", shoppingItem: "Single cream", quantity: "50 ml" }, { item: "Olive oil", shoppingItem: "Olive oil", quantity: "1 tsp" }, { item: "Dried thyme", shoppingItem: "Dried thyme", quantity: "½ tsp" }, { item: "Black pepper", shoppingItem: "Black pepper", quantity: "¼ tsp" }
    ],
    method: [
  "Cook the pasta according to the packet instructions, then drain. Separate the pasta or noodles as they soften so they do not stick together. Check the texture towards the end of the cooking time; it should be tender with no chalky centre.",
  "Dice the chicken, pepper and onion. Keep the pieces a similar size so they cook evenly. Keep any ingredients that are added later separate from those that go into the pan first.",
  "Heat the olive oil and cook the onion and pepper for 4 minutes. Stir around the base and edges of the pan. The vegetables should soften and lose their raw bite; lower the heat if they start to darken before they are tender.",
  "Add the chicken and thyme and cook until thoroughly cooked. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food.",
  "Stir in the cream and heat gently for 2 minutes.",
  "Add the pasta and toss through the sauce.",
  "Season with black pepper and serve."
],
    nutrition: { calories: "562 kcal", protein: "36.3 g", carbohydrates: "70.5 g", fat: "16.9 g", fibre: "4.0 g", sodium: "80 mg", salt: "0.20 g", potassium: "768 mg", phosphate: "436 mg" },
    potassium: "Moderate", phosphate: "High", purines: "High", dietaryNote: "A creamy pasta dinner using chicken, pepper and onion for flavour.", fluidMl: 50, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1
  ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.222238 g per serving, 0.3143% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors. Owner-approved source assumptions D4 are documented in the 16 October 2026 reconciliation workbook.",
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  {
    id: "cod-sweetcorn-herb-pasta", code: "D027", mealFamily: "hot-pasta", category: "Dinner", emoji: "🐟", image: "/images/recipes/D027.png",
    name: "Cod, Sweetcorn & Herb Pasta", description: "Flaked cod with pasta and sweetcorn in a fresh lemon and herb dressing.", cookingTime: "25 minutes", calories: "483 kcal", protein: "34.9 g", equipment: "Large saucepan, frying pan, colander, wooden spoon, knife",
    ingredients: [
      { item: "Cod fillet", shoppingItem: "Cod fillet", quantity: "130 g" }, { item: "White pasta", shoppingItem: "White pasta", quantity: "85 g" }, { item: "Sweetcorn kernels", shoppingItem: "Sweetcorn kernels", quantity: "60 g" }, { item: "Onion", shoppingItem: "Onions", quantity: "½ onion (40 g)" }, { item: "Olive oil", shoppingItem: "Olive oil", quantity: "1 tsp" }, { item: "Lemon juice", shoppingItem: "Lemon juice", quantity: "1 tbsp" }, { item: "Dried parsley", shoppingItem: "Dried parsley", quantity: "½ tsp" }, { item: "Black pepper", shoppingItem: "Black pepper", quantity: "¼ tsp" }
    ],
    method: [
  "Cook the pasta according to the packet instructions. Separate the pasta or noodles as they soften so they do not stick together. Check the texture towards the end of the cooking time; it should be tender with no chalky centre.",
  "Cook the cod in a covered frying pan with a splash of water until it flakes easily.",
  "Flake the cooked cod into large pieces.",
  "Cook the onion gently in the olive oil until softened. Stir around the base and edges of the pan. The vegetables should soften and lose their raw bite; lower the heat if they start to darken before they are tender. Use the listed herbs, spices or citrus for flavour before considering any extra seasoning.",
  "Drain the pasta and add it to the pan with the sweetcorn.",
  "Fold through the cod, lemon juice and parsley.",
  "Season with black pepper and serve."
],
    nutrition: { calories: "483 kcal", protein: "34.9 g", carbohydrates: "72.6 g", fat: "7.9 g", fibre: "4.0 g", sodium: "123 mg", salt: "0.31 g", potassium: "864 mg", phosphate: "439 mg" },
    potassium: "Moderate", phosphate: "High", purines: "Low", dietaryNote: "Cod and pasta make a filling meal with lemon and herbs instead of a salty sauce.", fluidMl: 15, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1
  ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.222238 g per serving, 0.3052% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors.",
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  {
    id: "egg-cabbage-sweetcorn-rice", code: "D028", mealFamily: "rice-dish", category: "Dinner", emoji: "🥚", image: "/images/recipes/D028.png",
    name: "Egg, Cabbage & Sweetcorn Rice", description: "Fluffy rice stir-fried with egg, cabbage, sweetcorn and onion.", cookingTime: "25 minutes", calories: "567 kcal", protein: "23.7 g", equipment: "Saucepan, large frying pan, wooden spoon, knife, chopping board",
    ingredients: [
      { item: "Basmati rice", shoppingItem: "Basmati rice", quantity: "90 g" }, { item: "Eggs", shoppingItem: "Eggs", quantity: "2" }, { item: "Cabbage", shoppingItem: "Cabbage", quantity: "¼ cabbage (100 g)" }, { item: "Sweetcorn kernels", shoppingItem: "Sweetcorn kernels", quantity: "60 g" }, { item: "Onion", shoppingItem: "Onions", quantity: "½ onion (50 g)" }, { item: "Olive oil", shoppingItem: "Olive oil", quantity: "1 tsp" }, { item: "Black pepper", shoppingItem: "Black pepper", quantity: "¼ tsp" }
    ],
    method: [
  "Cook the rice according to the packet instructions, then drain well. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork.",
  "Shred the cabbage and finely chop the onion. Keep the pieces a similar size so they cook evenly. Keep any ingredients that are added later separate from those that go into the pan first.",
  "Heat the olive oil and cook the onion and cabbage until softened. Stir around the base and edges of the pan. The vegetables should soften and lose their raw bite; lower the heat if they start to darken before they are tender.",
  "Add the sweetcorn and cook for 2 minutes.",
  "Push the vegetables aside and scramble the eggs until cooked. Use slow, broad strokes to bring the setting egg from the edges into the middle. Take care not to break it into dry crumbs; finish only when the egg is set throughout.",
  "Stir in the rice and combine thoroughly.",
  "Season with black pepper and serve."
],
    nutrition: { calories: "567 kcal", protein: "23.7 g", carbohydrates: "89.0 g", fat: "15.3 g", fibre: "5.0 g", sodium: "164 mg", salt: "0.41 g", potassium: "674 mg", phosphate: "363 mg" },
    potassium: "Moderate", phosphate: "High", purines: "Low", dietaryNote: "An egg-based dinner with rice and vegetables, with no added salt.", fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1
  ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.222238 g per serving, 0.2491% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors.",
    primaryDietCategory: "Vegetarian",
    dietCategories: ["Vegetarian"]
  },
  {
    id: "pork-pepper-pasta", code: "D029", mealFamily: "hot-pasta", category: "Dinner", emoji: "🍖", image: "/images/recipes/D029.png",
    name: "Pork & Pepper Pasta", description: "Tender pork with pasta, green pepper and onion in a light herb dressing.", cookingTime: "25 minutes", calories: "510 kcal", protein: "42.9 g", equipment: "Large saucepan, frying pan, colander, wooden spoon, knife, chopping board",
    ingredients: [
      { item: "Lean pork loin", shoppingItem: "Lean pork loin", quantity: "130 g" }, { item: "White pasta", shoppingItem: "White pasta", quantity: "85 g" }, { item: "Green pepper", shoppingItem: "Green peppers", quantity: "1½ green peppers (70 g)" }, { item: "Onion", shoppingItem: "Onions", quantity: "½ onion (40 g)" }, { item: "Olive oil", shoppingItem: "Olive oil", quantity: "1 tsp" }, { item: "Dried rosemary", shoppingItem: "Dried rosemary", quantity: "½ tsp" }, { item: "Black pepper", shoppingItem: "Black pepper", quantity: "¼ tsp" }
    ],
    method: [
  "Cook the pasta according to the packet instructions, then drain. Separate the pasta or noodles as they soften so they do not stick together. Check the texture towards the end of the cooking time; it should be tender with no chalky centre.",
  "Slice the pork into thin strips and chop the pepper and onion. Keep the pieces a similar size so they cook evenly. Keep any ingredients that are added later separate from those that go into the pan first.",
  "Heat the olive oil and cook the onion and pepper for 4 minutes. Stir around the base and edges of the pan. The vegetables should soften and lose their raw bite; lower the heat if they start to darken before they are tender.",
  "Add the pork and rosemary and cook until thoroughly cooked.",
  "Add the drained pasta and toss together.",
  "Season with black pepper.",
  "Serve hot. Transfer the complete portion to a plate or bowl, including any listed sides or sauce. Eat while freshly prepared; extra bread, dips or toppings would be additions to this meal."
],
    nutrition: { calories: "510 kcal", protein: "42.9 g", carbohydrates: "69.4 g", fat: "8.7 g", fibre: "4.0 g", sodium: "59 mg", salt: "0.15 g", potassium: "873 mg", phosphate: "455 mg" },
    potassium: "Moderate", phosphate: "High", purines: "Moderate", dietaryNote: "Lean pork and pasta provide a substantial protein-rich meal with herbs for flavour.", fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1
  ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.222238 g per serving, 0.3192% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors.",
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
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
  "Cook the basmati rice according to the packet instructions. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork.",
  "Slice the pork thinly and shred the cabbage. Keep the pieces a similar size so they cook evenly. Keep any ingredients that are added later separate from those that go into the pan first.",
  "Melt half the butter in a large frying pan and cook the pork with rosemary until thoroughly cooked. Swirl the pan as the butter melts to coat its base. Keep it from browning or smoking before the next ingredient is added.",
  "Add the cabbage and cook until tender.",
  "Add the sliced apple and remaining butter and cook gently until the apple is softened.",
  "Season with black pepper.",
  "Serve the pork, cabbage and apple with the rice."
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
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.222238 g per serving, 0.3269% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors.",
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
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
  "Cook the pasta according to the packet instructions, then drain. Separate the pasta or noodles as they soften so they do not stick together. Check the texture towards the end of the cooking time; it should be tender with no chalky centre.",
  "Dice the chicken, onion and pepper. Keep the pieces a similar size so they cook evenly. Keep any ingredients that are added later separate from those that go into the pan first.",
  "Heat the olive oil and cook the onion and pepper for 4 minutes. Stir around the base and edges of the pan. The vegetables should soften and lose their raw bite; lower the heat if they start to darken before they are tender. Use the listed herbs, spices or citrus for flavour before considering any extra seasoning.",
  "Add the chicken and parsley and cook until thoroughly cooked. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food.",
  "Stir in the lemon juice. Mix until the added ingredients are evenly distributed. Scrape around the sides of the bowl or pan as appropriate, so the measured mixture is used throughout the serving.",
  "Add the cooked pasta and toss together.",
  "Season with black pepper and serve."
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
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.222238 g per serving, 0.2999% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors. Owner-approved source assumptions D4 are documented in the 16 October 2026 reconciliation workbook.",
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
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
  "Cook the rice according to the packet instructions. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork.",
  "Dice the onion and pepper. Keep the pieces a similar size so they cook evenly. Keep any ingredients that are added later separate from those that go into the pan first.",
  "Heat the olive oil and cook the onion and pepper for 5 minutes. Stir around the base and edges of the pan. The vegetables should soften and lose their raw bite; lower the heat if they start to darken before they are tender. Use the listed herbs, spices or citrus for flavour before considering any extra seasoning.",
  "Add the cod and thyme, cover and cook until the fish flakes easily.",
  "Flake the cod into large pieces.",
  "Drain the rice and stir it through the vegetables.",
  "Add the lemon juice and cod.",
  "Season with black pepper and serve."
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
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.222238 g per serving, 0.2711% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors.",
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
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
  "Cook the rice according to the packet instructions. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork.",
  "Shred the cabbage and finely chop the onion. Keep the pieces a similar size so they cook evenly. Keep any ingredients that are added later separate from those that go into the pan first.",
  "Heat the olive oil and cook the onion for 3 minutes. Stir around the base and edges of the pan. The vegetables should soften and lose their raw bite; lower the heat if they start to darken before they are tender.",
  "Add the beef mince and cook thoroughly, breaking it up as it cooks.",
  "Add the cabbage and thyme and cook until tender.",
  "Drain the rice and add it to the pan.",
  "Season with black pepper and serve."
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
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.222238 g per serving, 0.2602% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors. Owner-approved source assumptions D5 are documented in the 16 October 2026 reconciliation workbook. Nominal 5% beef mince uses the approved extra-lean CoFID proxy at its actual 4.2 g fat per 100 g.",
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
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
  "Cook the rice according to the packet instructions, then drain. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork.",
  "Chop the onion and pepper. Keep the pieces a similar size so they cook evenly. Keep any ingredients that are added later separate from those that go into the pan first.",
  "Heat the olive oil and cook the onion and pepper until softened. Stir around the base and edges of the pan. The vegetables should soften and lose their raw bite; lower the heat if they start to darken before they are tender. Use the measured seasoning and sauces shown in the ingredients; do not add extra salt or a potassium-based salt substitute.",
  "Add the sweetcorn and cook for 2 minutes.",
  "Add the eggs and scramble until cooked through. Use slow, broad strokes to bring the setting egg from the edges into the middle. Take care not to break it into dry crumbs; finish only when the egg is set throughout.",
  "Stir in the cooked rice and grated Cheddar.",
  "Season with black pepper and serve."
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
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.222238 g per serving, 0.2609% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors.",
    primaryDietCategory: "Vegetarian",
    dietCategories: ["Vegetarian","Intermittent fasting — eating-window meal"]
  },
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
  "Cook the rice according to the packet instructions. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork.",
  "Shred the cabbage, chop the onion and dice the chicken. Keep the pieces a similar size so they cook evenly. Keep any ingredients that are added later separate from those that go into the pan first.",
  "Cook the cabbage in unsalted water until tender, then drain.",
  "Melt the butter in a frying pan and cook the onion and chicken with rosemary. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food. Swirl the pan as the butter melts to coat its base. Keep it from browning or smoking before the next ingredient is added.",
  "Continue cooking until the chicken is thoroughly cooked.",
  "Stir in the cabbage and drained rice.",
  "Season with black pepper and serve."
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
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.222238 g per serving, 0.2600% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors. Owner-approved source assumptions D4 are documented in the 16 October 2026 reconciliation workbook.",
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
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
  "Cook the pasta according to the packet instructions. Separate the pasta or noodles as they soften so they do not stick together. Check the texture towards the end of the cooking time; it should be tender with no chalky centre.",
  "Cook the cod in a covered pan until it flakes easily.",
  "Shred the cabbage and chop the onion. Keep the pieces a similar size so they cook evenly. Keep any ingredients that are added later separate from those that go into the pan first.",
  "Cook the cabbage and onion gently in the olive oil until softened. Stir around the base and edges of the pan. The vegetables should soften and lose their raw bite; lower the heat if they start to darken before they are tender. Use the listed herbs, spices or citrus for flavour before considering any extra seasoning.",
  "Drain the pasta and add it to the vegetable pan.",
  "Flake in the cod and add the lemon juice and parsley.",
  "Season with black pepper and serve."
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
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.222238 g per serving, 0.2904% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors.",
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
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
  "Cook the rice according to the packet instructions. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork.",
  "Chop the onion and pepper. Keep the pieces a similar size so they cook evenly. Keep any ingredients that are added later separate from those that go into the pan first.",
  "Heat the olive oil and cook the vegetables until softened.",
  "Add the beef mince and oregano and cook thoroughly, breaking up the mince.",
  "Drain the rice.",
  "Spoon the beef mixture over the rice.",
  "Season with black pepper and serve."
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
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.288288 g per serving, 0.3529% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors. Owner-approved source assumptions D5 are documented in the 16 October 2026 reconciliation workbook. Nominal 5% beef mince uses the approved extra-lean CoFID proxy at its actual 4.2 g fat per 100 g.",
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
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
  "Cook the pasta according to the packet instructions. Separate the pasta or noodles as they soften so they do not stick together. Check the texture towards the end of the cooking time; it should be tender with no chalky centre.",
  "Slice the pork and onion and dice the apple. Keep the pieces a similar size so they cook evenly. Keep any ingredients that are added later separate from those that go into the pan first. Remove any inedible core, stalk or peel specified in the ingredient list before weighing. Cut into pieces that are comfortable to eat with the rest of the meal.",
  "Melt the butter in a frying pan and cook the onion for 3 minutes. Stir around the base and edges of the pan. The vegetables should soften and lose their raw bite; lower the heat if they start to darken before they are tender. Swirl the pan as the butter melts to coat its base. Keep it from browning or smoking before the next ingredient is added.",
  "Add the pork and rosemary and cook until thoroughly cooked.",
  "Add the apple and cook gently until softened.",
  "Add the drained pasta and toss together.",
  "Season with black pepper and serve."
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
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.222238 g per serving, 0.2851% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors.",
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
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
  "Cook the pasta according to the packet instructions. Separate the pasta or noodles as they soften so they do not stick together. Check the texture towards the end of the cooking time; it should be tender with no chalky centre.",
  "Cut the cauliflower into small florets and finely chop the onion. Keep the pieces a similar size so they cook evenly. Keep any ingredients that are added later separate from those that go into the pan first.",
  "Cook the cauliflower in unsalted water until tender, then drain.",
  "Heat the olive oil and cook the onion until softened. Stir around the base and edges of the pan. The vegetables should soften and lose their raw bite; lower the heat if they start to darken before they are tender. Use the listed herbs, spices or citrus for flavour before considering any extra seasoning.",
  "Beat the eggs with the parsley. Beat until the mixture has an even colour and consistency, with no long strands of unmixed egg white.",
  "Add the drained pasta and cauliflower to the onion pan and remove from the heat.",
  "Stir in the egg mixture and return to very low heat until the egg is cooked through.",
  "Season with black pepper and serve."
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
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.222238 g per serving, 0.2898% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors.",
    primaryDietCategory: "Vegetarian",
    dietCategories: ["Vegetarian"]
  },
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
  "Heat the oven to 200°C.",
  "Peel and slice the potatoes into even pieces.",
  "Boil the potatoes until just tender, then drain. Keep the pieces at a steady simmer and test the thickest piece with the tip of a knife. Stop when it goes in without a hard centre, before the potato breaks apart. Boiling and discarding the water can remove some potassium, but it does not make the portion potassium-free or establish a precise reduction.",
  "Cook the cabbage and sweetcorn in unsalted water until tender, then drain.",
  "Place the potato, cabbage and sweetcorn in a baking dish. Choose a dish that holds this portion without spreading it into a very thin layer. Arrange it evenly, so the centre and edges heat through at a similar rate.",
  "Place the cod on top and spoon over the cream.",
  "Dot with the butter and sprinkle over the parsley and the specified 0.5 g black pepper.",
  "Bake until the cod is opaque and flakes easily and the top is lightly golden. Put the dish or tray on a stable oven shelf and begin checking towards the end of the stated time. Check the centre as well as the surface; a browned top alone does not show that the inside is cooked.",
  "Serve immediately. Transfer the complete portion to a plate or bowl, including any listed sides or sauce. Eat while freshly prepared; extra bread, dips or toppings would be additions to this meal."
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
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.193250 g per serving, 0.4360% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors.",
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },

  { id: "chicken-leek-couscous-lemon", code: "D041", mealFamily: "couscous-dish", category: "Dinner", emoji: "🍋", image: "/images/recipes/D041.png", name: "Chicken & Leek Couscous with Lemon", description: "Tender chicken with fluffy couscous, softened leek and carrot, finished with fresh lemon and parsley.", cookingTime: "30 minutes", calories: "371 kcal", protein: "15.7 g", equipment: "Saucepan, frying pan, colander, knife, chopping board", ingredients: [
      { item: "Chicken, meat, average, raw", shoppingItem: "Chicken breast", quantity: "50 g (raw)" },
      { item: "Couscous, plain, raw", shoppingItem: "Couscous", quantity: "35 g" },
      { item: "Leeks, boiled in unsalted water", shoppingItem: "Leek", quantity: "½ leek (20 g)" },
      { item: "Carrots, old, boiled in unsalted water", shoppingItem: "Carrots", quantity: "½ carrot (20 g)" },
      { item: "Oil, olive", shoppingItem: "Olive oil", quantity: "20 g" },
      { item: "Lemon juice, fresh", shoppingItem: "Lemon juice", quantity: "10 g" },
      { item: "Parsley, dried", shoppingItem: "Dried parsley", quantity: "¼ tsp" }
    ], method: [
  "Prepare the couscous using unsalted water according to the packet instructions.",
  "Slice the chicken and cook in half the olive oil until completely cooked through. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food.",
  "Boil the leek and carrot in unsalted water until tender, then drain well.",
  "Fluff the couscous and stir through the vegetables. Use a fork or broad spoon and a light lifting motion so the grains stay separate. Work gently from the bottom of the bowl without pressing or mashing the grains. Use the listed herbs, spices or citrus for flavour before considering any extra seasoning.",
  "Top with the sliced chicken and finish with the remaining olive oil, lemon juice and parsley.",
  "Serve immediately. Transfer the complete portion to a plate or bowl, including any listed sides or sauce. Eat while freshly prepared; extra bread, dips or toppings would be additions to this meal."
], nutrition: { calories: "371 kcal", protein: "15.7 g", carbohydrates: "29.6 g", fat: "21.9 g", fibre: "2.2 g", sodium: "46 mg", salt: "0.12 g", potassium: "376 mg", phosphate: "172 mg" }, potassium: "Low", phosphate: "Low", purines: "Moderate", dietaryNote: "CoFID 2021 ingredient-level calculation for one serving. Potassium is below 400 mg per serving on the RenalPlan recipe-planning bands.", fluidMl: 10, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1 ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  { id: "turkey-meatballs-herb-rice", code: "D042", mealFamily: "meatballs-rice", category: "Dinner", emoji: "🍚", image: "/images/recipes/D042.png", name: "Turkey Meatballs with Herb Rice", description: "Herb-seasoned turkey meatballs served with basmati rice, tender cabbage and onion.", cookingTime: "30 minutes", calories: "504 kcal", protein: "20.0 g", equipment: "Saucepan, frying pan, colander, knife, chopping board", ingredients: [
      { item: "Turkey, meat, average, raw", shoppingItem: "Turkey mince (lean)", quantity: "60 g" },
      { item: "Rice, white, basmati, raw", shoppingItem: "Basmati rice", quantity: "70 g" },
      { item: "Cabbage, average, boiled in unsalted water", shoppingItem: "Cabbage", quantity: "⅛ cabbage (50 g)" },
      { item: "Onions, raw", shoppingItem: "Onion", quantity: "¼ onion (20 g)" },
      { item: "Oil, olive", shoppingItem: "Olive oil", quantity: "20 g" },
      { item: "Rosemary, dried", shoppingItem: "Dried rosemary", quantity: "¼ tsp" }
    ], method: [
  "Cook the basmati rice in unsalted water according to the packet instructions. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork.",
  "Mix the turkey mince with rosemary and form into small meatballs.",
  "Heat the olive oil in a frying pan and cook the meatballs, turning regularly, until browned and completely cooked through. Let the pan warm before the food goes in. If the oil begins to smoke or the food catches immediately, lower the heat before continuing.",
  "Boil the cabbage and onion in unsalted water until tender, then drain well.",
  "Check the rice is tender and drain if required.",
  "Serve the meatballs with the rice and vegetables."
], nutrition: { calories: "504 kcal", protein: "20.0 g", carbohydrates: "61.6 g", fat: "21.4 g", fibre: "2.4 g", sodium: "45 mg", salt: "0.11 g", potassium: "373 mg", phosphate: "219 mg" }, potassium: "Low", phosphate: "Low", purines: "Low", dietaryNote: "CoFID 2021 ingredient-level calculation for one serving. Potassium is below 400 mg per serving on the RenalPlan recipe-planning bands.", fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1 ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  { id: "cod-herby-noodles-cucumber", code: "D043", mealFamily: "noodles", category: "Dinner", emoji: "🐟", image: "/images/recipes/D043.png", name: "Cod with Herby Noodles & Cucumber", description: "Baked cod with plain noodles, tender cabbage and cucumber, finished with lemon, parsley and olive oil.", cookingTime: "30 minutes", calories: "377 kcal", protein: "15.7 g", equipment: "Saucepan, frying pan, colander, knife, chopping board, Oven, Baking tray", ingredients: [
      { item: "Cod, flesh only, baked", shoppingItem: "Cod fillet", quantity: "50 g" },
      { item: "Noodles, rice, fine, dried, boiled in unsalted water", shoppingItem: "Rice noodles", quantity: "150 g (cooked)" },
      { item: "Cucumber, raw, flesh and skin", shoppingItem: "Cucumber", quantity: "¼ cucumber (30 g)" },
      { item: "Cabbage, average, boiled in unsalted water", shoppingItem: "Cabbage", quantity: "⅛ cabbage (50 g)" },
      { item: "Oil, olive", shoppingItem: "Olive oil", quantity: "20 g" },
      { item: "Lemon juice, fresh", shoppingItem: "Lemon juice", quantity: "10 g" },
      { item: "Parsley, dried", shoppingItem: "Dried parsley", quantity: "¼ tsp" }
    ], method: [
  "Heat the oven to 200°C and bake the cod until opaque and cooked through. Put the dish or tray on a stable oven shelf and begin checking towards the end of the stated time. Check the centre as well as the surface; a browned top alone does not show that the inside is cooked.",
  "Cook the noodles in unsalted water according to the packet instructions, then drain thoroughly. Separate the pasta or noodles as they soften so they do not stick together. Check the texture towards the end of the cooking time; it should be tender with no chalky centre.",
  "Boil the cabbage in unsalted water until tender, then drain well.",
  "Prepare the cucumber and combine it with the noodles and cabbage. Keep the pieces a similar size so they cook evenly. Keep any ingredients that are added later separate from those that go into the pan first.",
  "Add the olive oil, lemon juice and parsley and toss gently. Use the listed herbs, spices or citrus for flavour before considering any extra seasoning.",
  "Flake the cod over the noodles and serve."
], nutrition: { calories: "377 kcal", protein: "15.7 g", carbohydrates: "33.9 g", fat: "20.8 g", fibre: "3.0 g", sodium: "56 mg", salt: "0.14 g", potassium: "339 mg", phosphate: "143 mg" }, potassium: "Low", phosphate: "Low", purines: "Moderate", dietaryNote: "CoFID 2021 ingredient-level calculation for one serving. Potassium is below 400 mg per serving on the RenalPlan recipe-planning bands.", fluidMl: 10, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1 ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    primaryDietCategory: "Mediterranean-style",
    dietCategories: ["Mediterranean-style"]
  },
  { id: "pork-apple-leek-rice", code: "D044", mealFamily: "meat-and-vegetable-dish", category: "Dinner", emoji: "🍎", image: "/images/recipes/D044.png", name: "Pork Medallions with Apple & Leek", description: "Lean pork medallions with basmati rice, softened leek and warm apple finished with thyme.", cookingTime: "30 minutes", calories: "421 kcal", protein: "14.4 g", equipment: "Saucepan, frying pan, colander, knife, chopping board", ingredients: [
      { item: "Pork, loin medallions, raw, lean", shoppingItem: "Lean pork loin", quantity: "40 g" },
      { item: "Rice, white, basmati, raw", shoppingItem: "Basmati rice", quantity: "50 g" },
      { item: "Leeks, raw", shoppingItem: "Leek", quantity: "½ leek (15 g)" },
      { item: "Apples, eating, raw, flesh and skin", shoppingItem: "Apple", quantity: "⅜ apple (30 g)" },
      { item: "Oil, olive", shoppingItem: "Olive oil", quantity: "20 g" },
      { item: "Thyme, dried, ground", shoppingItem: "Dried thyme", quantity: "¼ tsp" }
    ], method: [
  "Cook the basmati rice in unsalted water according to the packet instructions. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork.",
  "Slice the pork into medallions and heat the olive oil in a frying pan. Let the pan warm before the food goes in. If the oil begins to smoke or the food catches immediately, lower the heat before continuing.",
  "Cook the pork until completely cooked through, turning regularly.",
  "Add the sliced leek and cook until softened.",
  "Add the diced apple and cook gently until just softened.",
  "Serve the pork with the rice and apple and leek mixture."
], nutrition: { calories: "421 kcal", protein: "14.4 g", carbohydrates: "46.0 g", fat: "21.2 g", fibre: "1.4 g", sodium: "17 mg", salt: "0.04 g", potassium: "266 mg", phosphate: "143 mg" }, potassium: "Low", phosphate: "Low", purines: "Moderate", dietaryNote: "CoFID 2021 ingredient-level calculation for one serving. Potassium is below 400 mg per serving on the RenalPlan recipe-planning bands.", fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1 ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  { id: "chicken-carrot-noodle-stir-fry", code: "D045", mealFamily: "noodle-stir-fry", category: "Dinner", emoji: "🍜", image: "/images/recipes/D045.png", name: "Chicken & Carrot Noodle Stir-Fry", description: "Chicken and plain noodles stir-fried with boiled carrot and cabbage, finished with ground ginger.", cookingTime: "30 minutes", calories: "386 kcal", protein: "14.7 g", equipment: "Saucepan, frying pan, colander, knife, chopping board", ingredients: [
      { item: "Chicken, meat, average, raw", shoppingItem: "Chicken breast", quantity: "50 g (raw)" },
      { item: "Noodles, rice, fine, dried, boiled in unsalted water", shoppingItem: "Rice noodles", quantity: "150 g (cooked)" },
      { item: "Carrots, old, boiled in unsalted water", shoppingItem: "Carrots", quantity: "½ carrot (30 g)" },
      { item: "Cabbage, average, boiled in unsalted water", shoppingItem: "Cabbage", quantity: "⅛ cabbage (50 g)" },
      { item: "Oil, olive", shoppingItem: "Olive oil", quantity: "20 g" },
      { item: "Ginger, ground", shoppingItem: "Ground ginger", quantity: "¼ tsp" }
    ], method: [
  "Cook the noodles in unsalted water according to the packet instructions, then drain thoroughly. Separate the pasta or noodles as they soften so they do not stick together. Check the texture towards the end of the cooking time; it should be tender with no chalky centre.",
  "Cook the chicken in the olive oil until completely cooked through. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food.",
  "Add the boiled carrot and cabbage and cook gently until tender. Use the listed herbs, spices or citrus for flavour before considering any extra seasoning.",
  "Add the ground ginger and drained noodles and toss together.",
  "Serve immediately. Transfer the complete portion to a plate or bowl, including any listed sides or sauce. Eat while freshly prepared; extra bread, dips or toppings would be additions to this meal."
], nutrition: { calories: "386 kcal", protein: "14.7 g", carbohydrates: "35.5 g", fat: "21.6 g", fibre: "3.6 g", sodium: "56 mg", salt: "0.14 g", potassium: "335 mg", phosphate: "126 mg" }, potassium: "Low", phosphate: "Low", purines: "Moderate", dietaryNote: "CoFID 2021 ingredient-level calculation for one serving. Potassium is below 400 mg per serving on the RenalPlan recipe-planning bands.", fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1 ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  { id: "beef-meatballs-couscous-peppers", code: "D046", mealFamily: "couscous-dish", category: "Dinner", emoji: "🥩", image: "/images/recipes/D046.png", name: "Beef Meatballs with Couscous & Peppers", description: "Lean beef meatballs with couscous, softened green pepper and onion, gently seasoned with paprika.", cookingTime: "30 minutes", calories: "416 kcal", protein: "18.5 g", equipment: "Saucepan, frying pan, colander, knife, chopping board", ingredients: [
      { item: "Beef, mince, raw, extra lean", shoppingItem: "Beef mince (5% fat)", quantity: "60 g" },
      { item: "Couscous, plain, raw", shoppingItem: "Couscous", quantity: "40 g" },
      { item: "Peppers, capsicum, green, raw", shoppingItem: "Green pepper", quantity: "½ green pepper (30 g)" },
      { item: "Onions, raw", shoppingItem: "Onion", quantity: "¼ onion (20 g)" },
      { item: "Oil, olive", shoppingItem: "Olive oil", quantity: "20 g" },
      { item: "Paprika", shoppingItem: "Paprika", quantity: "¼ tsp" }
    ], method: [
  "Prepare the couscous using unsalted water according to the packet instructions.",
  "Mix the beef mince with paprika and form into small meatballs.",
  "Cook the meatballs in the olive oil, turning regularly, until browned and completely cooked through.",
  "Add the green pepper and onion and cook until softened.",
  "Fluff the couscous and serve with the meatballs and vegetables. Use a fork or broad spoon and a light lifting motion so the grains stay separate. Work gently from the bottom of the bowl without pressing or mashing the grains.",
  "Serve immediately. Transfer the complete portion to a plate or bowl, including any listed sides or sauce. Eat while freshly prepared; extra bread, dips or toppings would be additions to this meal."
], nutrition: { calories: "416 kcal", protein: "18.5 g", carbohydrates: "34.1 g", fat: "23.5 g", fibre: "0.0 g", sodium: "58 mg", salt: "0.14 g", potassium: "364 mg", phosphate: "215 mg" }, potassium: "Low", phosphate: "Low", purines: "Moderate", dietaryNote: "CoFID 2021 ingredient-level calculation for one serving. Potassium is below 400 mg per serving on the RenalPlan recipe-planning bands.", fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1 ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    nutritionSourceNote: "Owner-approved 0.5% negligible spice-carbohydrate allowance: the listed carbohydrate excludes the unresolved spice contribution. USDA total carbohydrate minus fibre gives a derived by-weight estimate of 0.095450 g per serving, 0.2795% of the estimated meal carbohydrate total. This is an approved estimation/omission assumption, not an exact CoFID monosaccharide-equivalent value or a measured error bound. USDA SR28 spice energy is retained as reported with food-specific Atwater factors.",
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  { id: "haddock-lemon-rice-leeks", code: "D047", mealFamily: "rice-dish", category: "Dinner", emoji: "🐟", image: "/images/recipes/D047.png", name: "Haddock with Lemon Rice & Leeks", description: "Baked haddock with lemon basmati rice, softened leek and boiled carrot.", cookingTime: "30 minutes", calories: "445 kcal", protein: "15.9 g", equipment: "Saucepan, frying pan, colander, knife, chopping board, Oven, Baking tray", ingredients: [
      { item: "Haddock, flesh only, raw", shoppingItem: "Haddock fillet", quantity: "60 g" },
      { item: "Rice, white, basmati, raw", shoppingItem: "Basmati rice", quantity: "60 g" },
      { item: "Leeks, boiled in unsalted water", shoppingItem: "Leek", quantity: "½ leek (20 g)" },
      { item: "Carrots, old, boiled in unsalted water", shoppingItem: "Carrots", quantity: "½ carrot (20 g)" },
      { item: "Oil, olive", shoppingItem: "Olive oil", quantity: "20 g" },
      { item: "Lemon juice, fresh", shoppingItem: "Lemon juice", quantity: "10 g" }
    ], method: [
  "Heat the oven to 200°C and bake the haddock until opaque and completely cooked through. Put the dish or tray on a stable oven shelf and begin checking towards the end of the stated time. Check the centre as well as the surface; a browned top alone does not show that the inside is cooked.",
  "Cook the basmati rice in unsalted water according to the packet instructions. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork.",
  "Boil the leek and carrot in unsalted water until tender, then drain well.",
  "Toss the vegetables with the olive oil and lemon juice.",
  "Check the rice is tender and drain if required.",
  "Serve the haddock with the rice and vegetables."
], nutrition: { calories: "445 kcal", protein: "15.9 g", carbohydrates: "52.1 g", fat: "20.7 g", fibre: "1.8 g", sodium: "48 mg", salt: "0.12 g", potassium: "315 mg", phosphate: "167 mg" }, potassium: "Low", phosphate: "Low", purines: "Low", dietaryNote: "CoFID 2021 ingredient-level calculation for one serving. Potassium is below 400 mg per serving on the RenalPlan recipe-planning bands.", fluidMl: 10, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1 ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: false,
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  { id: "chicken-pear-rice-bowl", code: "D048", mealFamily: "rice-bowl", category: "Dinner", emoji: "🍐", image: "/images/recipes/D048.png", name: "Chicken & Pear Rice Bowl", description: "Chicken and basmati rice with warm pear and tender cabbage, finished with rosemary.", cookingTime: "30 minutes", calories: "467 kcal", protein: "16.7 g", equipment: "Saucepan, frying pan, colander, knife, chopping board", ingredients: [
      { item: "Chicken, meat, average, raw", shoppingItem: "Chicken breast", quantity: "50 g (raw)" },
      { item: "Rice, white, basmati, raw", shoppingItem: "Basmati rice", quantity: "60 g" },
      { item: "Pears, average, raw, flesh only", shoppingItem: "Pear", quantity: "½ pear (30 g)" },
      { item: "Cabbage, average, boiled in unsalted water", shoppingItem: "Cabbage", quantity: "⅛ cabbage (50 g)" },
      { item: "Oil, olive", shoppingItem: "Olive oil", quantity: "20 g" },
      { item: "Rosemary, dried", shoppingItem: "Dried rosemary", quantity: "¼ tsp" }
    ], method: [
  "Cook the basmati rice in unsalted water according to the packet instructions. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork.",
  "Cook the chicken in the olive oil until completely cooked through. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food.",
  "Boil the cabbage in unsalted water until tender, then drain well.",
  "Dice the pear and warm gently with the cabbage and rosemary. Keep the pieces a similar size so they cook evenly. Keep any ingredients that are added later separate from those that go into the pan first. Remove any inedible core, stalk or peel specified in the ingredient list before weighing. Cut into pieces that are comfortable to eat with the rest of the meal.",
  "Check the rice is tender and drain if required.",
  "Serve the chicken with the rice and pear and cabbage mixture."
], nutrition: { calories: "467 kcal", protein: "16.7 g", carbohydrates: "55.1 g", fat: "21.5 g", fibre: "2.7 g", sodium: "42 mg", salt: "0.10 g", potassium: "355 mg", phosphate: "155 mg" }, potassium: "Low", phosphate: "Low", purines: "Moderate", dietaryNote: "CoFID 2021 ingredient-level calculation for one serving. Potassium is below 400 mg per serving on the RenalPlan recipe-planning bands.", fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1 ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    primaryDietCategory: "Mediterranean-style",
    dietCategories: ["Mediterranean-style"]
  },
  { id: "pork-carrot-couscous-skillet", code: "D049", mealFamily: "couscous-dish", category: "Dinner", emoji: "🥕", image: "/images/recipes/D049.png", name: "Pork & Carrot Couscous Skillet", description: "Lean pork with couscous, boiled carrot and softened leek, finished with thyme.", cookingTime: "30 minutes", calories: "383 kcal", protein: "15.1 g", equipment: "Saucepan, frying pan, colander, knife, chopping board", ingredients: [
      { item: "Pork, loin medallions, raw, lean", shoppingItem: "Lean pork loin", quantity: "40 g" },
      { item: "Couscous, plain, raw", shoppingItem: "Couscous", quantity: "40 g" },
      { item: "Carrots, old, boiled in unsalted water", shoppingItem: "Carrots", quantity: "½ carrot (20 g)" },
      { item: "Leeks, raw", shoppingItem: "Leek", quantity: "½ leek (20 g)" },
      { item: "Oil, olive", shoppingItem: "Olive oil", quantity: "20 g" },
      { item: "Thyme, dried, ground", shoppingItem: "Dried thyme", quantity: "¼ tsp" }
    ], method: [
  "Prepare the couscous using unsalted water according to the packet instructions.",
  "Slice the pork and cook in the olive oil until completely cooked through.",
  "Boil the carrot and leek in unsalted water until tender, then drain well.",
  "Add the vegetables and thyme to the pork pan and warm through.",
  "Fluff the couscous and spoon the pork and vegetables over it. Use a fork or broad spoon and a light lifting motion so the grains stay separate. Work gently from the bottom of the bowl without pressing or mashing the grains.",
  "Serve immediately. Transfer the complete portion to a plate or bowl, including any listed sides or sauce. Eat while freshly prepared; extra bread, dips or toppings would be additions to this meal."
], nutrition: { calories: "383 kcal", protein: "15.1 g", carbohydrates: "33.8 g", fat: "21.7 g", fibre: "2.7 g", sodium: "24 mg", salt: "0.06 g", potassium: "357 mg", phosphate: "189 mg" }, potassium: "Low", phosphate: "Low", purines: "Moderate", dietaryNote: "CoFID 2021 ingredient-level calculation for one serving. Potassium is below 400 mg per serving on the RenalPlan recipe-planning bands.", fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1 ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  { id: "cod-leek-pasta-bake", code: "D050", mealFamily: "pasta-bake", category: "Dinner", emoji: "🐟", image: "/images/recipes/D050.png", name: "Cod & Leek Pasta Bake", description: "Flaked cod and white pasta baked with softened leek and cabbage, finished with parsley and olive oil.", cookingTime: "30 minutes", calories: "374 kcal", protein: "16.0 g", equipment: "Saucepan, frying pan, colander, knife, chopping board, Oven, Baking dish", ingredients: [
      { item: "Cod, flesh only, baked", shoppingItem: "Cod fillet", quantity: "45 g" },
      { item: "Pasta, white, dried, raw", shoppingItem: "White pasta", quantity: "40 g" },
      { item: "Leeks, raw", shoppingItem: "Leek", quantity: "½ leek (20 g)" },
      { item: "Cabbage, average, boiled in unsalted water", shoppingItem: "Cabbage", quantity: "⅛ cabbage (40 g)" },
      { item: "Oil, olive", shoppingItem: "Olive oil", quantity: "20 g" },
      { item: "Parsley, dried", shoppingItem: "Dried parsley", quantity: "¼ tsp" }
    ], method: [
  "Heat the oven to 200°C.",
  "Cook the pasta in unsalted water according to the packet instructions, then drain thoroughly. Separate the pasta or noodles as they soften so they do not stick together. Check the texture towards the end of the cooking time; it should be tender with no chalky centre.",
  "Bake the cod until opaque and completely cooked through, then flake into large pieces. Put the dish or tray on a stable oven shelf and begin checking towards the end of the stated time. Check the centre as well as the surface; a browned top alone does not show that the inside is cooked.",
  "Boil the leek and cabbage in unsalted water until tender, then drain well.",
  "Combine the pasta, vegetables and cod with the olive oil and parsley in a baking dish.",
  "Bake until hot throughout.",
  "Serve immediately. Transfer the complete portion to a plate or bowl, including any listed sides or sauce. Eat while freshly prepared; extra bread, dips or toppings would be additions to this meal."
], nutrition: { calories: "374 kcal", protein: "16.0 g", carbohydrates: "32.2 g", fat: "21.0 g", fibre: "1.4 g", sodium: "44 mg", salt: "0.11 g", potassium: "378 mg", phosphate: "171 mg" }, potassium: "Low", phosphate: "Low", purines: "Low", dietaryNote: "CoFID 2021 ingredient-level calculation for one serving. Potassium is below 400 mg per serving on the RenalPlan recipe-planning bands.", fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1 ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  { id: "turkey-apple-noodle-bowl", code: "D051", mealFamily: "noodle-bowl", category: "Dinner", emoji: "🍎", image: "/images/recipes/D051.png", name: "Turkey & Apple Noodle Bowl", description: "Turkey and plain noodles with apple and cucumber, finished with ginger and olive oil.", cookingTime: "30 minutes", calories: "387 kcal", protein: "15.6 g", equipment: "Saucepan, frying pan, colander, knife, chopping board", ingredients: [
      { item: "Turkey, light meat, raw", shoppingItem: "Turkey breast", quantity: "50 g (raw)" },
      { item: "Noodles, rice, fine, dried, boiled in unsalted water", shoppingItem: "Rice noodles", quantity: "150 g (cooked)" },
      { item: "Apples, eating, raw, flesh and skin", shoppingItem: "Apple", quantity: "⅜ apple (30 g)" },
      { item: "Cucumber, raw, flesh and skin", shoppingItem: "Cucumber", quantity: "¼ cucumber (30 g)" },
      { item: "Oil, olive", shoppingItem: "Olive oil", quantity: "20 g" },
      { item: "Ginger, ground", shoppingItem: "Ground ginger", quantity: "¼ tsp" }
    ], method: [
  "Cook the noodles in unsalted water according to the packet instructions, then drain thoroughly. Separate the pasta or noodles as they soften so they do not stick together. Check the texture towards the end of the cooking time; it should be tender with no chalky centre.",
  "Slice the turkey and cook in the olive oil until completely cooked through. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food.",
  "Add the diced apple and cook gently until just softened. Use the listed herbs, spices or citrus for flavour before considering any extra seasoning.",
  "Toss the turkey and apple through the noodles with the cucumber and ground ginger.",
  "Serve immediately. Transfer the complete portion to a plate or bowl, including any listed sides or sauce. Eat while freshly prepared; extra bread, dips or toppings would be additions to this meal."
], nutrition: { calories: "387 kcal", protein: "15.6 g", carbohydrates: "36.1 g", fat: "21.0 g", fibre: "2.3 g", sodium: "33 mg", salt: "0.08 g", potassium: "266 mg", phosphate: "154 mg" }, potassium: "Low", phosphate: "Low", purines: "Low", dietaryNote: "CoFID 2021 ingredient-level calculation for one serving. Potassium is below 400 mg per serving on the RenalPlan recipe-planning bands.", fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
    servings: 1 ,
    conditionalProxyPending: false,
    nutritionIncomplete: [],
    nutritionBasis: "CoFID ingredient-input estimate",
    clinicalReviewPending: true,
    quantityConversionsEstimated: true,
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
  },
  { id: "chicken-herb-meatballs-rice", code: "D052", mealFamily: "meatballs-rice", category: "Dinner", emoji: "🍗", image: "/images/recipes/D052.png", name: "Chicken Herb Meatballs with Rice", description: "Chicken herb meatballs with basmati rice, tender cabbage and carrot, finished with parsley.", cookingTime: "30 minutes", calories: "459 kcal", protein: "16.7 g", equipment: "Saucepan, frying pan, colander, knife, chopping board", ingredients: [
      { item: "Chicken, meat, average, raw", shoppingItem: "Chicken breast", quantity: "50 g (raw)" },
      { item: "Rice, white, basmati, raw", shoppingItem: "Basmati rice", quantity: "60 g" },
      { item: "Cabbage, average, boiled in unsalted water", shoppingItem: "Cabbage", quantity: "⅛ cabbage (50 g)" },
      { item: "Carrots, old, boiled in unsalted water", shoppingItem: "Carrots", quantity: "½ carrot (20 g)" },
      { item: "Oil, olive", shoppingItem: "Olive oil", quantity: "20 g" },
      { item: "Parsley, dried", shoppingItem: "Dried parsley", quantity: "¼ tsp" }
    ], method: [
  "Cook the basmati rice in unsalted water according to the packet instructions. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork.",
  "Finely mince the chicken and mix with the parsley. Form into small meatballs. Use the listed herbs, spices or citrus for flavour before considering any extra seasoning.",
  "Cook the meatballs in the olive oil, turning regularly, until completely cooked through.",
  "Boil the cabbage and carrot in unsalted water until tender, then drain well.",
  "Check the rice is tender and drain if required.",
  "Serve the meatballs with the rice and vegetables."
], nutrition: { calories: "459 kcal", protein: "16.7 g", carbohydrates: "52.8 g", fat: "21.5 g", fibre: "2.3 g", sodium: "48 mg", salt: "0.12 g", potassium: "361 mg", phosphate: "156 mg" }, potassium: "Low", phosphate: "Low", purines: "Moderate", dietaryNote: "CoFID 2021 ingredient-level calculation for one serving. Potassium is below 400 mg per serving on the RenalPlan recipe-planning bands.", fluidMl: 0, // Approximate countable fluid from listed liquid/semi-liquid ingredients; excludes natural moisture and drained cooking water.
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
    "id": "chicken-biryani-with-fragrant-basmati-rice",
    "code": "D053",
    "category": "Dinner",
    "mealFamily": "biryani",
    "cuisine": "indian",
    "emoji": "🍽️",
    "image": "/images/recipes/D053.webp",
    "name": "Chicken biryani with fragrant basmati rice",
    "description": "Fragrant basmati rice layered with spiced chicken, onions and yoghurt, finished with saffron and fresh herbs.",
    "cookingTime": "110 mins",
    "calories": "967 kcal",
    "protein": "55.1 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Skinless boneless chicken thigh",
        "shoppingItem": "Skinless boneless chicken thigh",
        "quantity": "190 g (chicken masala; raw edible input)"
      },
      {
        "item": "Plain whole-milk yoghurt",
        "shoppingItem": "Plain whole-milk yoghurt",
        "quantity": "60 g (chicken masala; as sold)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "90 g (chicken masala; raw edible input)"
      },
      {
        "item": "Fresh tomato",
        "shoppingItem": "Fresh tomato",
        "quantity": "90 g (chicken masala; raw edible input)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "7 g (chicken masala; raw edible input)"
      },
      {
        "item": "Fresh ginger",
        "shoppingItem": "Fresh ginger",
        "quantity": "8 g (chicken masala; raw edible input)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "20 g (chicken masala; as sold, weighed grams)"
      },
      {
        "item": "Ground cumin",
        "shoppingItem": "Ground cumin",
        "quantity": "1 g (chicken masala; dry)"
      },
      {
        "item": "Ground coriander seed",
        "shoppingItem": "Ground coriander seed",
        "quantity": "1.5 g (chicken masala; dry)"
      },
      {
        "item": "Ground turmeric",
        "shoppingItem": "Ground turmeric",
        "quantity": "0.5 g (chicken masala; dry)"
      },
      {
        "item": "Pure cayenne chilli powder",
        "shoppingItem": "Pure cayenne chilli powder",
        "quantity": "0.5 g (chicken masala; dry)"
      },
      {
        "item": "Ground cinnamon",
        "shoppingItem": "Ground cinnamon",
        "quantity": "0.25 g (chicken masala; dry)"
      },
      {
        "item": "Ground cardamom",
        "shoppingItem": "Ground cardamom",
        "quantity": "0.25 g (chicken masala; dry)"
      },
      {
        "item": "Ground cloves",
        "shoppingItem": "Ground cloves",
        "quantity": "0.1 g (chicken masala; dry)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.7 g (chicken masala; dry)"
      },
      {
        "item": "White basmati rice",
        "shoppingItem": "White basmati rice",
        "quantity": "110 g (layered rice; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "100 g (layered rice; weighed recipe water)"
      },
      {
        "item": "Unsalted butter",
        "shoppingItem": "Unsalted butter",
        "quantity": "10 g (layered rice; as sold)"
      },
      {
        "item": "Fresh mint",
        "shoppingItem": "Fresh mint",
        "quantity": "7.5 g (layered rice; raw edible leaves)"
      },
      {
        "item": "Fresh coriander leaves",
        "shoppingItem": "Fresh coriander leaves",
        "quantity": "7.5 g (layered rice; raw edible input)"
      },
      {
        "item": "Saffron",
        "shoppingItem": "Saffron",
        "quantity": "0.1 g (layered rice; dry)"
      }
    ],
    "method": [
  "Weigh the ingredients for one serving before starting. Keep any amounts for the dough, filling and sauce separate so that each goes into the correct part of the recipe.",
  "Cut chicken into 3 cm pieces and marinate refrigerated in yoghurt, garlic, ginger, turmeric, coriander, chilli and half the salt for 30 minutes. Soak saffron in 10 g of the listed 100 g finishing water.",
  "Thinly slice onion and cook in 20 g oil for 15-20 minutes until deeply golden, stirring. Keep the pieces a similar size so they cook evenly. Keep any ingredients that are added later separate from those that go into the pan first. Reserve one third. Add cumin, cinnamon, cardamom and cloves to the pan, then chicken with its full marinade and chopped tomato. Cook 20-25 minutes until the chicken is safely cooked and the sauce thick but moist. Use the measured seasoning and sauces shown in the ingredients; do not add extra salt or a potassium-based salt substitute.",
  "Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food.",
  "Parboil the 110 g rice in 900 g unsalted process water for about 5 minutes, until the outside softens but a firm centre remains. Drain. This input-weight calculation takes no credit for nutrient loss in drained water.",
  "In a close-fitting heavy pot layer half the chicken sauce, half the rice and half the herbs, then repeat. Top with reserved onion, butter, saffron water and the remaining 90 g finishing water. Cover tightly with a lid and cook on the lowest heat for 15-20 minutes, then rest 10 minutes.",
  "Check rice is tender and the centre is steaming hot. Fold gently to preserve distinct grains and layers. Serve all the chicken, rice, sauce and garnish as one serving.",
  "Check the centre of the meat with a clean food thermometer: it should reach 75°C for at least 30 seconds. Do not wash raw poultry, and use clean utensils for the cooked food."
],
    "nutrition": {
      "calories": "967 kcal",
      "protein": "55.1 g",
      "carbohydrates": "101.3 g",
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
    "id": "chicken-jalfrezi-with-chapati",
    "code": "D054",
    "category": "Dinner",
    "mealFamily": "curry-flatbread",
    "cuisine": "indian",
    "emoji": "🍽️",
    "image": "/images/recipes/D054.webp",
    "name": "Chicken jalfrezi with chapati",
    "description": "Spiced chicken with peppers and onions in a tomato sauce, served with warm homemade chapatis.",
    "cookingTime": "65 mins",
    "calories": "944 kcal",
    "protein": "61.4 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Skinless boneless chicken breast",
        "shoppingItem": "Skinless boneless chicken breast",
        "quantity": "190 g (jalfrezi; raw edible input)"
      },
      {
        "item": "Red bell pepper",
        "shoppingItem": "Red bell pepper",
        "quantity": "110 g (jalfrezi; raw edible input)"
      },
      {
        "item": "Green bell pepper",
        "shoppingItem": "Green bell pepper",
        "quantity": "70 g (jalfrezi; raw edible input)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "80 g (jalfrezi; raw edible input)"
      },
      {
        "item": "Fresh tomato",
        "shoppingItem": "Fresh tomato",
        "quantity": "150 g (jalfrezi; raw edible input)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "7 g (jalfrezi; raw edible input)"
      },
      {
        "item": "Fresh ginger",
        "shoppingItem": "Fresh ginger",
        "quantity": "9 g (jalfrezi; raw edible input)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "22.5 g (jalfrezi; as sold, weighed grams)"
      },
      {
        "item": "Ground cumin",
        "shoppingItem": "Ground cumin",
        "quantity": "1.5 g (jalfrezi; dry)"
      },
      {
        "item": "Ground coriander seed",
        "shoppingItem": "Ground coriander seed",
        "quantity": "1.5 g (jalfrezi; dry)"
      },
      {
        "item": "Ground turmeric",
        "shoppingItem": "Ground turmeric",
        "quantity": "0.5 g (jalfrezi; dry)"
      },
      {
        "item": "Fresh green chilli flesh",
        "shoppingItem": "Fresh green chilli flesh",
        "quantity": "4 g (jalfrezi; raw edible input)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.75 g (jalfrezi; dry)"
      },
      {
        "item": "Fresh coriander leaves",
        "shoppingItem": "Fresh coriander leaves",
        "quantity": "7.5 g (jalfrezi; raw edible input)"
      },
      {
        "item": "Brown chapati flour",
        "shoppingItem": "Brown chapati flour",
        "quantity": "110 g (chapatis; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "72.5 g (chapatis; weighed recipe water)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "7.5 g (chapatis; as sold, weighed grams)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.3 g (chapatis; dry)"
      }
    ],
    "method": [
  "Weigh the ingredients for one serving before starting. Keep any amounts for the dough, filling and sauce separate so that each goes into the correct part of the recipe.",
  "Mix chapati flour, 72.5 g water, 7.5 g oil and chapati salt. Knead 7 minutes and rest covered for 20 minutes. Scrape dry patches from the bowl into the mixture and work them in with your hands. Keep to the measured dry ingredients and liquid; unmeasured additions change the portion and can make the dough tough. Slice chicken into strips and peppers and onion into thick batons. Keep the pieces a similar size so they cook evenly. Keep any ingredients that are added later separate from those that go into the pan first. Use the measured seasoning and sauces shown in the ingredients; do not add extra salt or a potassium-based salt substitute.",
  "Use 10 g curry oil to stir-fry the pepper and half the onion over high heat for 4-5 minutes, retaining some bite. Stir around the base and edges of the pan. The vegetables should soften and lose their raw bite; lower the heat if they start to darken before they are tender. Remove to a bowl with their oil.",
  "Heat remaining 12.5 g oil; cook remaining onion 7 minutes, then garlic, ginger, cumin, coriander, turmeric and green chilli for 1 minute. Add chopped tomato and curry salt; reduce for 10-12 minutes.",
  "Add chicken and cook 10-12 minutes until safely cooked. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food. Return the crisp peppers and onion for 2 minutes, then add coriander. Keep a thick clinging sauce rather than a long braise.",
  "Divide dough into two, roll thinly without extra flour, and griddle dry for 1-2 minutes per side until puffed and cooked through. Serve both chapatis and all the curry as one serving.",
  "Check the centre of the meat with a clean food thermometer: it should reach 75°C for at least 30 seconds. Do not wash raw poultry, and use clean utensils for the cooked food."
],
    "nutrition": {
      "calories": "944 kcal",
      "protein": "61.4 g",
      "carbohydrates": "93.1 g",
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
    "id": "lamb-rogan-josh-with-rice",
    "code": "D055",
    "category": "Dinner",
    "mealFamily": "lamb-braise",
    "cuisine": "indian",
    "emoji": "🍽️",
    "image": "/images/recipes/D055.webp",
    "name": "Lamb rogan josh with rice",
    "description": "Slow-cooked lamb in a rich yoghurt sauce with paprika, fennel and warming spices, served with basmati rice.",
    "cookingTime": "155 mins",
    "calories": "1172 kcal",
    "protein": "51.0 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Boneless lamb shoulder, lean and edible fat",
        "shoppingItem": "Boneless lamb shoulder, lean and edible fat",
        "quantity": "200 g (rogan josh; raw edible input)"
      },
      {
        "item": "Plain whole-milk yoghurt",
        "shoppingItem": "Plain whole-milk yoghurt",
        "quantity": "80 g (rogan josh; as sold)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "90 g (rogan josh; raw edible input)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "6 g (rogan josh; raw edible input)"
      },
      {
        "item": "Fresh ginger",
        "shoppingItem": "Fresh ginger",
        "quantity": "10 g (rogan josh; raw edible input)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "17.5 g (rogan josh; as sold, weighed grams)"
      },
      {
        "item": "Sweet paprika",
        "shoppingItem": "Sweet paprika",
        "quantity": "3.5 g (rogan josh; dry)"
      },
      {
        "item": "Pure cayenne chilli powder",
        "shoppingItem": "Pure cayenne chilli powder",
        "quantity": "0.4 g (rogan josh; dry)"
      },
      {
        "item": "Ground fennel seed",
        "shoppingItem": "Ground fennel seed",
        "quantity": "1.5 g (rogan josh; dry)"
      },
      {
        "item": "Ground cumin",
        "shoppingItem": "Ground cumin",
        "quantity": "1 g (rogan josh; dry)"
      },
      {
        "item": "Ground coriander seed",
        "shoppingItem": "Ground coriander seed",
        "quantity": "1.5 g (rogan josh; dry)"
      },
      {
        "item": "Ground cinnamon",
        "shoppingItem": "Ground cinnamon",
        "quantity": "0.3 g (rogan josh; dry)"
      },
      {
        "item": "Ground cardamom",
        "shoppingItem": "Ground cardamom",
        "quantity": "0.25 g (rogan josh; dry)"
      },
      {
        "item": "Ground cloves",
        "shoppingItem": "Ground cloves",
        "quantity": "0.1 g (rogan josh; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "175 g (rogan josh; weighed recipe water)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.75 g (rogan josh; dry)"
      },
      {
        "item": "White basmati rice",
        "shoppingItem": "White basmati rice",
        "quantity": "105 g (rice; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "189 g (rice; weighed recipe water)"
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
      }
    ],
    "method": [
  "Weigh the ingredients for one serving before starting. Keep any amounts for the dough, filling and sauce separate so that each goes into the correct part of the recipe.",
  "Trim bone and large external fat before weighing lamb, retaining the edible lean-and-fat shoulder specified. Cut into 3 cm cubes. Brown in 10 g curry oil in batches, retaining the meat juices.",
  "Add remaining 7.5 g curry oil and sliced onion; cook 12 minutes until golden. Stir in ginger, garlic and ground spices briefly off the strongest heat so paprika does not burn. Use the measured seasoning and sauces shown in the ingredients; do not add extra salt or a potassium-based salt substitute.",
  "Return lamb, add yoghurt one spoonful at a time while stirring, then curry water and salt. Bring to a gentle simmer, cover and braise 90-120 minutes until lamb is tender. Look for small, gentle bubbles rather than a rolling boil. Stir along the bottom when needed to prevent sticking, and keep the heat low enough for the food to cook evenly. Stir every 20 minutes; add only further weighed water if needed and record the revision.",
  "Cook the rice component in its measured water, oil and salt in a close-fitting saucepan: bring to a simmer, cover on the lowest heat for 12-15 minutes, then rest off the heat for 10 minutes. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork. Do not drain. Keep the complete cooked rice for this serving.",
  "Uncover the lamb for 10 minutes to reduce the red aromatic sauce if needed. Serve all the lamb, sauce and rice as one serving. This is an onion-yoghurt home adaptation, not a claim of one Kashmiri ceremonial formulation.",
  "Check the centre of the meat with a clean food thermometer: it should reach 75°C for at least 30 seconds."
],
    "nutrition": {
      "calories": "1172 kcal",
      "protein": "51.0 g",
      "carbohydrates": "96.4 g",
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
    "id": "tandoori-style-fish-with-lemon-pilau",
    "code": "D056",
    "category": "Dinner",
    "mealFamily": "fish-pilau",
    "cuisine": "indian",
    "emoji": "🍽️",
    "image": "/images/recipes/D056.webp",
    "name": "Tandoori-style fish with lemon pilau",
    "description": "Yoghurt-marinated cod roasted with tandoori-style spices, served with lemon and cardamom pilau rice.",
    "cookingTime": "75 mins",
    "calories": "846 kcal",
    "protein": "50.2 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Cod fillet, flesh only",
        "shoppingItem": "Cod fillet, flesh only",
        "quantity": "200 g (tandoori fish; raw edible input)"
      },
      {
        "item": "Plain whole-milk yoghurt",
        "shoppingItem": "Plain whole-milk yoghurt",
        "quantity": "70 g (tandoori fish; as sold)"
      },
      {
        "item": "Fresh lemon juice",
        "shoppingItem": "Fresh lemon juice",
        "quantity": "17.5 g (tandoori fish; freshly squeezed, weighed grams)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "6 g (tandoori fish; raw edible input)"
      },
      {
        "item": "Fresh ginger",
        "shoppingItem": "Fresh ginger",
        "quantity": "8 g (tandoori fish; raw edible input)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "12.5 g (tandoori fish; as sold, weighed grams)"
      },
      {
        "item": "Ground cumin",
        "shoppingItem": "Ground cumin",
        "quantity": "1 g (tandoori fish; dry)"
      },
      {
        "item": "Ground coriander seed",
        "shoppingItem": "Ground coriander seed",
        "quantity": "1.5 g (tandoori fish; dry)"
      },
      {
        "item": "Sweet paprika",
        "shoppingItem": "Sweet paprika",
        "quantity": "2 g (tandoori fish; dry)"
      },
      {
        "item": "Ground turmeric",
        "shoppingItem": "Ground turmeric",
        "quantity": "0.5 g (tandoori fish; dry)"
      },
      {
        "item": "Pure cayenne chilli powder",
        "shoppingItem": "Pure cayenne chilli powder",
        "quantity": "0.3 g (tandoori fish; dry)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.6 g (tandoori fish; dry)"
      },
      {
        "item": "White basmati rice",
        "shoppingItem": "White basmati rice",
        "quantity": "110 g (lemon pilau; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "198 g (lemon pilau; weighed recipe water)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "50 g (lemon pilau; raw edible input)"
      },
      {
        "item": "Unsalted butter",
        "shoppingItem": "Unsalted butter",
        "quantity": "12.5 g (lemon pilau; as sold)"
      },
      {
        "item": "Ground cumin",
        "shoppingItem": "Ground cumin",
        "quantity": "0.5 g (lemon pilau; dry)"
      },
      {
        "item": "Ground cardamom",
        "shoppingItem": "Ground cardamom",
        "quantity": "0.2 g (lemon pilau; dry)"
      },
      {
        "item": "Fresh lemon juice",
        "shoppingItem": "Fresh lemon juice",
        "quantity": "12.5 g (lemon pilau; freshly squeezed, weighed grams)"
      },
      {
        "item": "Fresh coriander leaves",
        "shoppingItem": "Fresh coriander leaves",
        "quantity": "7.5 g (lemon pilau; raw edible input)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.3 g (lemon pilau; dry)"
      }
    ],
    "method": [
  "Weigh the ingredients for one serving before starting. Keep any amounts for the dough, filling and sauce separate so that each goes into the correct part of the recipe.",
  "Mix yoghurt with fish lemon, garlic, ginger, oil, spices and fish salt. Coat thick cod pieces and refrigerate 20 minutes. Longer acidic marination would soften the fish excessively. Use the measured seasoning and sauces shown in the ingredients; do not add extra salt or a potassium-based salt substitute.",
  "Soften finely sliced pilau onion in butter for 8 minutes. Stir around the base and edges of the pan. The vegetables should soften and lose their raw bite; lower the heat if they start to darken before they are tender. Add cumin, cardamom and rice, stir 1 minute, then add pilau water and salt. Cover and cook gently 12-15 minutes; rest 10 minutes before folding in pilau lemon and coriander.",
  "Heat oven to 230 C conventional or 210 C fan. Put fish and all marinade in a shallow lined dish. Roast 12-18 minutes until cooked through. Briefly grill to brown the yoghurt coating without drying the fish. Check the thickest part: it should be opaque, steaming hot and separate readily into flakes with a fork. Continue cooking if the centre is still cool or translucent.",
  "Heat any liquid raw-contact marinade thoroughly. Serve all the fish, cooked coating, juices and lemon pilau as one serving.",
  "Check that the fish is steaming hot and cooked throughout, with opaque flesh that flakes easily."
],
    "nutrition": {
      "calories": "846 kcal",
      "protein": "50.2 g",
      "carbohydrates": "96.5 g",
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
    "id": "chicken-karahi-with-homemade-flatbread",
    "code": "D057",
    "category": "Dinner",
    "mealFamily": "karahi-flatbread",
    "cuisine": "pakistani",
    "emoji": "🍽️",
    "image": "/images/recipes/D057.webp",
    "name": "Chicken karahi with homemade flatbread",
    "description": "Chicken cooked in a rich tomato sauce with fresh ginger, chilli and coriander, served with homemade flatbread.",
    "cookingTime": "75 mins",
    "calories": "966 kcal",
    "protein": "55.3 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Skinless boneless chicken thigh",
        "shoppingItem": "Skinless boneless chicken thigh",
        "quantity": "200 g (karahi; raw edible input)"
      },
      {
        "item": "Fresh tomato",
        "shoppingItem": "Fresh tomato",
        "quantity": "250 g (karahi; raw edible input)"
      },
      {
        "item": "Fresh ginger",
        "shoppingItem": "Fresh ginger",
        "quantity": "15 g (karahi; raw edible input)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "9 g (karahi; raw edible input)"
      },
      {
        "item": "Fresh green chilli flesh",
        "shoppingItem": "Fresh green chilli flesh",
        "quantity": "5 g (karahi; raw edible input)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "25 g (karahi; as sold, weighed grams)"
      },
      {
        "item": "Ground cumin",
        "shoppingItem": "Ground cumin",
        "quantity": "1.5 g (karahi; dry)"
      },
      {
        "item": "Ground coriander seed",
        "shoppingItem": "Ground coriander seed",
        "quantity": "1.5 g (karahi; dry)"
      },
      {
        "item": "Ground black pepper",
        "shoppingItem": "Ground black pepper",
        "quantity": "0.5 g (karahi; dry)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.75 g (karahi; dry)"
      },
      {
        "item": "Fresh coriander leaves",
        "shoppingItem": "Fresh coriander leaves",
        "quantity": "9 g (karahi; raw edible input)"
      },
      {
        "item": "Plain white flour",
        "shoppingItem": "Plain white flour",
        "quantity": "115 g (flatbread; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "64.4 g (flatbread; weighed recipe water)"
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
      }
    ],
    "method": [
  "Weigh the ingredients for one serving before starting. Keep any amounts for the dough, filling and sauce separate so that each goes into the correct part of the recipe.",
  "Mix the flatbread flour, water, oil and salt; knead 5 minutes and cover for 20 minutes. Scrape dry patches from the bowl into the mixture and work them in with your hands. Keep to the measured dry ingredients and liquid; unmeasured additions change the portion and can make the dough tough. Roll into one flatbread on reusable baking paper without extra flour, and cook in a hot dry heavy pan for 2-3 minutes per side until cooked through. Keep the complete flatbread for this serving. Use the measured seasoning and sauces shown in the ingredients; do not add extra salt or a potassium-based salt substitute.",
  "Cut chicken into 3 cm pieces. Reserve 5 g ginger as very fine matchsticks; grate the rest with garlic. Chop tomato finely without discarding seeds or juice.",
  "Heat curry oil in a wide karahi or heavy wok over medium-high heat. Cook chicken for 6-8 minutes, turning, then add grated ginger and garlic for 1 minute. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food. Add tomato and salt; cover and simmer 12-15 minutes. Look for small, gentle bubbles rather than a rolling boil. Stir along the bottom when needed to prevent sticking, and keep the heat low enough for the food to cook evenly.",
  "Uncover, add cumin, coriander and pepper and cook briskly for 10-15 minutes, stirring until tomato forms a concentrated coating and chicken is safely cooked. Add green chilli halfway through this reduction.",
  "Finish with reserved ginger and fresh coriander. Serve all the chicken, reduced tomato and oil with the one flatbread. No onion, coconut milk or commercial curry paste is introduced.",
  "Check the centre of the meat with a clean food thermometer: it should reach 75°C for at least 30 seconds. Do not wash raw poultry, and use clean utensils for the cooked food."
],
    "nutrition": {
      "calories": "966 kcal",
      "protein": "55.3 g",
      "carbohydrates": "95.6 g",
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
    "id": "coconut-fish-curry-with-rice",
    "code": "D058",
    "category": "Dinner",
    "mealFamily": "coconut-fish-curry",
    "cuisine": "south-indian",
    "emoji": "🍽️",
    "image": "/images/recipes/D058.webp",
    "name": "Coconut fish curry with rice",
    "description": "Haddock in a coconut and tamarind curry with mustard seeds and curry leaves, served with basmati rice.",
    "cookingTime": "60 mins",
    "calories": "1043 kcal",
    "protein": "48.4 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Haddock fillet, unsmoked",
        "shoppingItem": "Haddock fillet, unsmoked",
        "quantity": "200 g (fish curry; raw edible input)"
      },
      {
        "item": "Full-fat canned coconut milk",
        "shoppingItem": "Full-fat canned coconut milk",
        "quantity": "150 g (fish curry; as sold, weighed grams)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "70 g (fish curry; raw edible input)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "6 g (fish curry; raw edible input)"
      },
      {
        "item": "Fresh ginger",
        "shoppingItem": "Fresh ginger",
        "quantity": "7.5 g (fish curry; raw edible input)"
      },
      {
        "item": "Fresh curry leaves, finely sliced",
        "shoppingItem": "Fresh curry leaves, finely sliced",
        "quantity": "1.5 g (fish curry; raw edible leaves, stems removed)"
      },
      {
        "item": "Mustard seeds",
        "shoppingItem": "Mustard seeds",
        "quantity": "1.5 g (fish curry; dry)"
      },
      {
        "item": "Ground turmeric",
        "shoppingItem": "Ground turmeric",
        "quantity": "0.75 g (fish curry; dry)"
      },
      {
        "item": "Fresh red chilli flesh",
        "shoppingItem": "Fresh red chilli flesh",
        "quantity": "5 g (fish curry; raw edible input)"
      },
      {
        "item": "Seed-free unsweetened tamarind flesh",
        "shoppingItem": "Seed-free unsweetened tamarind flesh",
        "quantity": "10 g (fish curry; edible flesh, no sweetened concentrate)"
      },
      {
        "item": "Coconut oil",
        "shoppingItem": "Coconut oil",
        "quantity": "15 g (fish curry; as sold)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "80 g (fish curry; weighed recipe water)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.75 g (fish curry; dry)"
      },
      {
        "item": "White basmati rice",
        "shoppingItem": "White basmati rice",
        "quantity": "110 g (rice; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "198 g (rice; weighed recipe water)"
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
      }
    ],
    "method": [
  "Weigh the ingredients for one serving before starting. Keep any amounts for the dough, filling and sauce separate so that each goes into the correct part of the recipe.",
  "Cook the rice component in its measured water, oil and salt in a close-fitting saucepan: bring to a simmer, cover on the lowest heat for 12-15 minutes, then rest off the heat for 10 minutes. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork. Do not drain. Keep the complete cooked rice for this serving.",
  "Mash seed-free tamarind flesh into the 80 g curry water, retaining the pulp. Slice onion, chilli, curry leaves, ginger and garlic finely. Keep the pieces a similar size so they cook evenly. Keep any ingredients that are added later separate from those that go into the pan first. Cut haddock into large 4 cm pieces.",
  "Heat coconut oil in a lidded pan. Add mustard seeds until they begin popping, then curry leaves, onion, ginger, garlic and chilli; soften 7-8 minutes. Stir in turmeric for 20 seconds. Use the measured seasoning and sauces shown in the ingredients; do not add extra salt or a potassium-based salt substitute.",
  "Add tamarind water, coconut milk and curry salt. Simmer gently for 8 minutes without hard boiling, then lower fish into the sauce and cook gently 8-12 minutes until safely cooked and flaking. Look for small, gentle bubbles rather than a rolling boil. Stir along the bottom when needed to prevent sticking, and keep the heat low enough for the food to cook evenly.",
  "Serve all the rice and fish curry as one serving, including finely sliced curry leaves. Coconut K/P remains a conditional generic canned proxy; no nutrient reduction is assumed from acid or simmering."
],
    "nutrition": {
      "calories": "1043 kcal",
      "protein": "48.4 g",
      "carbohydrates": "102.4 g",
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
    "id": "chicken-shish-tawook-with-vermicelli-rice",
    "code": "D059",
    "category": "Dinner",
    "mealFamily": "skewer-rice-plate",
    "cuisine": "lebanese",
    "emoji": "🍽️",
    "image": "/images/recipes/D059.webp",
    "name": "Chicken shish tawook with vermicelli rice",
    "description": "Garlic and yoghurt chicken skewers with buttery vermicelli rice and a fresh tomato and cucumber salad.",
    "cookingTime": "105 mins",
    "calories": "1012 kcal",
    "protein": "65.5 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Skinless boneless chicken breast",
        "shoppingItem": "Skinless boneless chicken breast",
        "quantity": "200 g (tawook; raw edible input)"
      },
      {
        "item": "Plain whole-milk yoghurt",
        "shoppingItem": "Plain whole-milk yoghurt",
        "quantity": "70 g (tawook; as sold)"
      },
      {
        "item": "Fresh lemon juice",
        "shoppingItem": "Fresh lemon juice",
        "quantity": "17.5 g (tawook; freshly squeezed, weighed grams)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "9 g (tawook; raw edible input)"
      },
      {
        "item": "Tomato puree",
        "shoppingItem": "Tomato puree",
        "quantity": "12.5 g (tawook; as sold)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "15 g (tawook; as sold, weighed grams)"
      },
      {
        "item": "Sweet paprika",
        "shoppingItem": "Sweet paprika",
        "quantity": "1.5 g (tawook; dry)"
      },
      {
        "item": "Dried oregano",
        "shoppingItem": "Dried oregano",
        "quantity": "0.5 g (tawook; dry)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.6 g (tawook; dry)"
      },
      {
        "item": "White basmati rice",
        "shoppingItem": "White basmati rice",
        "quantity": "95 g (vermicelli rice; dry)"
      },
      {
        "item": "Fine dry wheat vermicelli",
        "shoppingItem": "Fine dry wheat vermicelli",
        "quantity": "22.5 g (vermicelli rice; dry)"
      },
      {
        "item": "Unsalted butter",
        "shoppingItem": "Unsalted butter",
        "quantity": "12.5 g (vermicelli rice; as sold)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "222.5 g (vermicelli rice; weighed recipe water)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.35 g (vermicelli rice; dry)"
      },
      {
        "item": "Cucumber",
        "shoppingItem": "Cucumber",
        "quantity": "90 g (side; raw edible input)"
      },
      {
        "item": "Fresh tomato",
        "shoppingItem": "Fresh tomato",
        "quantity": "90 g (side; raw edible input)"
      },
      {
        "item": "Fresh parsley",
        "shoppingItem": "Fresh parsley",
        "quantity": "7.5 g (side; raw edible input)"
      },
      {
        "item": "Fresh lemon juice",
        "shoppingItem": "Fresh lemon juice",
        "quantity": "10 g (side; freshly squeezed, weighed grams)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "6 g (side; as sold, weighed grams)"
      }
    ],
    "method": [
  "Weigh the ingredients for one serving before starting. Keep any amounts for the dough, filling and sauce separate so that each goes into the correct part of the recipe.",
  "Cut chicken into 3 cm cubes and combine with all tawook marinade ingredients. Refrigerate for 60 minutes. This yoghurt, garlic and tomato marinade is not the oil-and-spice shawarma method.",
  "Break dry fine wheat vermicelli into 2 cm lengths. Brown gently in butter in a close-fitting pan for 2-3 minutes, stirring constantly. Add rice and stir, then measured water and rice salt. Use the measured seasoning and sauces shown in the ingredients; do not add extra salt or a potassium-based salt substitute.",
  "Cover and simmer the vermicelli rice on low heat 12-15 minutes, then rest 10 minutes. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork. Chop and combine all side ingredients without draining.",
  "Thread chicken onto metal skewers and griddle 12-16 minutes, turning, until safely cooked. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food. Bring leftover marinade to a bubbling simmer separately and cook thoroughly before spooning over the skewers. Look for small, gentle bubbles rather than a rolling boil. Stir along the bottom when needed to prevent sticking, and keep the heat low enough for the food to cook evenly.",
  "Serve all the skewers, cooked sauce, vermicelli rice and salad as one serving.",
  "Check the centre of the meat with a clean food thermometer: it should reach 75°C for at least 30 seconds. Do not wash raw poultry, and use clean utensils for the cooked food."
],
    "nutrition": {
      "calories": "1012 kcal",
      "protein": "65.5 g",
      "carbohydrates": "100.9 g",
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
    "id": "homemade-chicken-pide",
    "code": "D060",
    "category": "Dinner",
    "mealFamily": "pide",
    "cuisine": "turkish",
    "emoji": "🍽️",
    "image": "/images/recipes/D060.webp",
    "name": "Homemade chicken pide",
    "description": "Homemade boat-shaped bread filled with spiced chicken, peppers, tomatoes and fresh parsley.",
    "cookingTime": "140 mins",
    "calories": "988 kcal",
    "protein": "58.3 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Strong white bread flour",
        "shoppingItem": "Strong white bread flour",
        "quantity": "130 g (pide dough; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "77.5 g (pide dough; weighed recipe water)"
      },
      {
        "item": "Active dry yeast",
        "shoppingItem": "Active dry yeast",
        "quantity": "2 g (pide dough; dry)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "10 g (pide dough; as sold, weighed grams)"
      },
      {
        "item": "White sugar",
        "shoppingItem": "White sugar",
        "quantity": "2.5 g (pide dough; dry)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.6 g (pide dough; dry)"
      },
      {
        "item": "Skinless boneless chicken thigh",
        "shoppingItem": "Skinless boneless chicken thigh",
        "quantity": "180 g (filling; raw edible input)"
      },
      {
        "item": "Fresh tomato",
        "shoppingItem": "Fresh tomato",
        "quantity": "110 g (filling; raw edible input)"
      },
      {
        "item": "Red bell pepper",
        "shoppingItem": "Red bell pepper",
        "quantity": "80 g (filling; raw edible input)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "60 g (filling; raw edible input)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "5 g (filling; raw edible input)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "15 g (filling; as sold, weighed grams)"
      },
      {
        "item": "Sweet paprika",
        "shoppingItem": "Sweet paprika",
        "quantity": "1.5 g (filling; dry)"
      },
      {
        "item": "Ground cumin",
        "shoppingItem": "Ground cumin",
        "quantity": "1 g (filling; dry)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.5 g (filling; dry)"
      },
      {
        "item": "Fresh parsley",
        "shoppingItem": "Fresh parsley",
        "quantity": "7.5 g (filling; raw edible input)"
      },
      {
        "item": "Whole egg, shell removed",
        "shoppingItem": "Whole egg, shell removed",
        "quantity": "20 g (filling; raw edible input)"
      }
    ],
    "method": [
  "Weigh the ingredients for one serving before starting. Keep any amounts for the dough, filling and sauce separate so that each goes into the correct part of the recipe.",
  "Mix all dough ingredients and knead 8-10 minutes. Scrape dry patches from the bowl into the mixture and work them in with your hands. Keep to the measured dry ingredients and liquid; unmeasured additions change the portion and can make the dough tough. Cover and prove about 60 minutes until puffy. Cover the bowl so the surface cannot dry out. Judge readiness by the dough becoming visibly puffy, because a cooler kitchen may make the rise slower than the stated guide time. No extra dusting flour is added; use baking paper for rolling. Use the measured seasoning and sauces shown in the ingredients; do not add extra salt or a potassium-based salt substitute.",
  "Dice chicken and vegetables into 1 cm pieces. Keep the pieces a similar size so they cook evenly. Keep any ingredients that are added later separate from those that go into the pan first. Heat filling oil, soften onion and pepper 7 minutes, then add chicken, garlic, paprika, cumin and filling salt. Cook until chicken is safely cooked; add tomato and reduce to a moist but non-watery filling.",
  "Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food.",
  "Let filling cool until no longer steaming, fold in parsley. Heat oven to 230 C conventional or 210 C fan with a heavy baking tray inside.",
  "Roll the dough into one 30 cm oval. Add filling down the centre, leaving a 3 cm border. Fold long edges over the filling and pinch both ends firmly into a boat shape. Keep the filling away from the joining edge and press the dough surfaces directly together. Check for open gaps before cooking so that the filling stays inside. Brush the exposed dough with all 20 g beaten egg.",
  "Slide on paper onto the hot tray and bake 15-20 minutes until the boat edges and base are cooked and browned. Put the dish or tray on a stable oven shelf and begin checking towards the end of the stated time. Check the centre as well as the surface; a browned top alone does not show that the inside is cooked. Serve the complete pide as one serving.",
  "Check the centre of the meat with a clean food thermometer: it should reach 75°C for at least 30 seconds. Do not wash raw poultry, and use clean utensils for the cooked food. Cook the egg mixture until fully set."
],
    "nutrition": {
      "calories": "988 kcal",
      "protein": "58.3 g",
      "carbohydrates": "109.2 g",
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
    "id": "saffron-chicken-with-jewelled-rice",
    "code": "D061",
    "category": "Dinner",
    "mealFamily": "jewelled-rice",
    "cuisine": "persian",
    "emoji": "🍽️",
    "image": "/images/recipes/D061.webp",
    "name": "Saffron chicken with jewelled rice",
    "description": "Tender saffron chicken with colourful rice, carrots, orange peel, raisins and flaked almonds.",
    "cookingTime": "85 mins",
    "calories": "1080 kcal",
    "protein": "56.9 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Skinless boneless chicken thigh",
        "shoppingItem": "Skinless boneless chicken thigh",
        "quantity": "200 g (saffron chicken; raw edible input)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "80 g (saffron chicken; raw edible input)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "5 g (saffron chicken; raw edible input)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "15 g (saffron chicken; as sold, weighed grams)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "100 g (saffron chicken; weighed recipe water)"
      },
      {
        "item": "Fresh lemon juice",
        "shoppingItem": "Fresh lemon juice",
        "quantity": "15 g (saffron chicken; freshly squeezed, weighed grams)"
      },
      {
        "item": "Saffron",
        "shoppingItem": "Saffron",
        "quantity": "0.1 g (saffron chicken; dry)"
      },
      {
        "item": "Ground turmeric",
        "shoppingItem": "Ground turmeric",
        "quantity": "0.5 g (saffron chicken; dry)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.6 g (saffron chicken; dry)"
      },
      {
        "item": "White basmati rice",
        "shoppingItem": "White basmati rice",
        "quantity": "110 g (jewelled rice; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "198 g (jewelled rice; weighed recipe water)"
      },
      {
        "item": "Unsalted butter",
        "shoppingItem": "Unsalted butter",
        "quantity": "12.5 g (jewelled rice; as sold)"
      },
      {
        "item": "Carrot",
        "shoppingItem": "Carrot",
        "quantity": "70 g (jewelled rice; raw edible input)"
      },
      {
        "item": "Fresh orange-coloured peel, no white pith",
        "shoppingItem": "Fresh orange-coloured peel, no white pith",
        "quantity": "4 g (jewelled rice; raw edible peel)"
      },
      {
        "item": "Raisins",
        "shoppingItem": "Raisins",
        "quantity": "22.5 g (jewelled rice; dry as sold)"
      },
      {
        "item": "Flaked almonds",
        "shoppingItem": "Flaked almonds",
        "quantity": "17.5 g (jewelled rice; as sold)"
      },
      {
        "item": "White sugar",
        "shoppingItem": "White sugar",
        "quantity": "5 g (jewelled rice; dry)"
      },
      {
        "item": "Ground cinnamon",
        "shoppingItem": "Ground cinnamon",
        "quantity": "0.25 g (jewelled rice; dry)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.3 g (jewelled rice; dry)"
      }
    ],
    "method": [
  "Weigh the ingredients for one serving before starting. Keep any amounts for the dough, filling and sauce separate so that each goes into the correct part of the recipe.",
  "Crush saffron and steep in 15 g of the chicken water for 10 minutes. Brown thigh pieces in chicken oil for 5-6 minutes; add sliced onion and garlic, soften 7 minutes, then add turmeric, chicken salt and the remaining 85 g water. Use the measured seasoning and sauces shown in the ingredients; do not add extra salt or a potassium-based salt substitute.",
  "Cover and braise gently 25-30 minutes until chicken is safely cooked. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food. Add saffron infusion and lemon for the final 5 minutes, then uncover to reduce the sauce slightly.",
  "Cook the rice in its listed water and salt by absorption, covered, 12-15 minutes then rest 10 minutes. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork. Grate carrot and finely julienne only orange-coloured peel, avoiding bitter white pith.",
  "Warm butter in a small pan; soften carrot and peel for 7-8 minutes. Add raisins, almonds, sugar and cinnamon for 2 minutes, keeping the entire garnish and butter.",
  "Fold half the garnish through rice, scatter the rest on top and serve all the chicken, rice, garnish and saffron sauce as one serving. Use a fork or broad spoon and a light lifting motion so the grains stay separate. Work gently from the bottom of the bowl without pressing or mashing the grains. No unsupported nutrient extraction or discarded peel-syrup assumption is applied.",
  "Check the centre of the meat with a clean food thermometer: it should reach 75°C for at least 30 seconds. Do not wash raw poultry, and use clean utensils for the cooked food."
],
    "nutrition": {
      "calories": "1080 kcal",
      "protein": "56.9 g",
      "carbohydrates": "117.3 g",
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
    "id": "chicken-gyros-platter",
    "code": "D062",
    "category": "Dinner",
    "mealFamily": "gyros-platter",
    "cuisine": "greek",
    "emoji": "🍽️",
    "image": "/images/recipes/D062.webp",
    "name": "Chicken gyros platter",
    "description": "Yoghurt and oregano roast chicken with golden potatoes, warm pitta, fresh salad and cucumber yoghurt.",
    "cookingTime": "120 mins",
    "calories": "1058 kcal",
    "protein": "65.6 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Skinless boneless chicken thigh",
        "shoppingItem": "Skinless boneless chicken thigh",
        "quantity": "200 g (gyros chicken; raw edible input)"
      },
      {
        "item": "Plain whole-milk yoghurt",
        "shoppingItem": "Plain whole-milk yoghurt",
        "quantity": "60 g (gyros chicken; as sold)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "7 g (gyros chicken; raw edible input)"
      },
      {
        "item": "Fresh lemon juice",
        "shoppingItem": "Fresh lemon juice",
        "quantity": "15 g (gyros chicken; freshly squeezed, weighed grams)"
      },
      {
        "item": "Dried oregano",
        "shoppingItem": "Dried oregano",
        "quantity": "1 g (gyros chicken; dry)"
      },
      {
        "item": "Sweet paprika",
        "shoppingItem": "Sweet paprika",
        "quantity": "1 g (gyros chicken; dry)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "14 g (gyros chicken; as sold, weighed grams)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.6 g (gyros chicken; dry)"
      },
      {
        "item": "Peeled potato",
        "shoppingItem": "Peeled potato",
        "quantity": "180 g (potatoes; raw edible input)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "14 g (potatoes; as sold, weighed grams)"
      },
      {
        "item": "Dried oregano",
        "shoppingItem": "Dried oregano",
        "quantity": "0.5 g (potatoes; dry)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.35 g (potatoes; dry)"
      },
      {
        "item": "White pitta bread",
        "shoppingItem": "White pitta bread",
        "quantity": "110 g (platter; as sold)"
      },
      {
        "item": "Cucumber",
        "shoppingItem": "Cucumber",
        "quantity": "90 g (platter; raw edible input)"
      },
      {
        "item": "Plain whole-milk yoghurt",
        "shoppingItem": "Plain whole-milk yoghurt",
        "quantity": "75 g (platter; as sold)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "2 g (platter; raw edible input)"
      },
      {
        "item": "Fresh lemon juice",
        "shoppingItem": "Fresh lemon juice",
        "quantity": "10 g (platter; freshly squeezed, weighed grams)"
      },
      {
        "item": "Fresh tomato",
        "shoppingItem": "Fresh tomato",
        "quantity": "90 g (platter; raw edible input)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "30 g (platter; raw edible input)"
      }
    ],
    "method": [
  "Weigh the ingredients for one serving before starting. Keep any amounts for the dough, filling and sauce separate so that each goes into the correct part of the recipe.",
  "Flatten chicken thighs and coat with all gyros marinade ingredients. Refrigerate 60 minutes. Cut peeled potato into 2 cm wedges and toss with potato oil, oregano and salt.",
  "Heat oven to 220 C conventional or 200 C fan. Spread potatoes on one tray and roast 35-45 minutes, turning twice. Roast chicken and every bit of marinade in a separate rimmed dish for 25-30 minutes to the poultry safety endpoint. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food.",
  "Grate cucumber finely without draining and mix with platter yoghurt, garlic and lemon into a loose tzatziki-style sauce. Slice tomato and onion. Keep the pieces a similar size so they cook evenly. Keep any ingredients that are added later separate from those that go into the pan first. Use a sharp knife and steady the tomato on a board; make even slices so they warm through at the same rate. Warm pitta in a dry pan. Use the measured seasoning and sauces shown in the ingredients; do not add extra salt or a potassium-based salt substitute.",
  "Rest chicken 3 minutes, slice thinly and briefly sear the slices in their safely cooked tray juices for browned edges. Serve all the chicken, potatoes, bread, sauce and salad on one platter.",
  "This domestic sliced roast mimics gyros service but is not cooked on a vertical spit. The potato platter and yoghurt-cucumber sauce distinguish it from skewered souvlaki and garlic-emulsion shawarma.",
  "Check the centre of the meat with a clean food thermometer: it should reach 75°C for at least 30 seconds. Do not wash raw poultry, and use clean utensils for the cooked food."
],
    "nutrition": {
      "calories": "1058 kcal",
      "protein": "65.6 g",
      "carbohydrates": "106.3 g",
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
    "id": "chicken-and-apricot-tagine",
    "code": "D063",
    "category": "Dinner",
    "mealFamily": "tagine",
    "cuisine": "moroccan",
    "emoji": "🍽️",
    "image": "/images/recipes/D063.webp",
    "name": "Chicken and apricot tagine",
    "description": "Slow-cooked chicken with sweet apricots, warming spices and flaked almonds, served with fluffy couscous.",
    "cookingTime": "100 mins",
    "calories": "1066 kcal",
    "protein": "61.6 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Skinless boneless chicken thigh",
        "shoppingItem": "Skinless boneless chicken thigh",
        "quantity": "200 g (tagine; raw edible input)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "100 g (tagine; raw edible input)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "6 g (tagine; raw edible input)"
      },
      {
        "item": "Fresh ginger",
        "shoppingItem": "Fresh ginger",
        "quantity": "9 g (tagine; raw edible input)"
      },
      {
        "item": "Dried apricots",
        "shoppingItem": "Dried apricots",
        "quantity": "35 g (tagine; dry as sold)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "20 g (tagine; as sold, weighed grams)"
      },
      {
        "item": "Ground cumin",
        "shoppingItem": "Ground cumin",
        "quantity": "1 g (tagine; dry)"
      },
      {
        "item": "Ground coriander seed",
        "shoppingItem": "Ground coriander seed",
        "quantity": "1.5 g (tagine; dry)"
      },
      {
        "item": "Ground cinnamon",
        "shoppingItem": "Ground cinnamon",
        "quantity": "0.5 g (tagine; dry)"
      },
      {
        "item": "Ground turmeric",
        "shoppingItem": "Ground turmeric",
        "quantity": "0.5 g (tagine; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "175 g (tagine; weighed recipe water)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.7 g (tagine; dry)"
      },
      {
        "item": "Flaked almonds",
        "shoppingItem": "Flaked almonds",
        "quantity": "12.5 g (tagine; as sold)"
      },
      {
        "item": "Fresh coriander leaves",
        "shoppingItem": "Fresh coriander leaves",
        "quantity": "7.5 g (tagine; raw edible input)"
      },
      {
        "item": "Fresh lemon juice",
        "shoppingItem": "Fresh lemon juice",
        "quantity": "10 g (tagine; freshly squeezed, weighed grams)"
      },
      {
        "item": "Plain couscous",
        "shoppingItem": "Plain couscous",
        "quantity": "110 g (couscous; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "142.5 g (couscous; weighed recipe water)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "7.5 g (couscous; as sold, weighed grams)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.3 g (couscous; dry)"
      }
    ],
    "method": [
  "Weigh the ingredients for one serving before starting. Keep any amounts for the dough, filling and sauce separate so that each goes into the correct part of the recipe.",
  "Use a heavy lidded casserole or heat-diffused tagine. Brown chicken in half the tagine oil, then add the remaining oil and sliced onion; soften 10 minutes. Use the measured seasoning and sauces shown in the ingredients; do not add extra salt or a potassium-based salt substitute.",
  "Add garlic, ginger, cumin, coriander, cinnamon and turmeric for 1 minute. Add tagine water, apricots and salt. Cover and simmer very gently 40-50 minutes until chicken is tender and safely cooked. Look for small, gentle bubbles rather than a rolling boil. Stir along the bottom when needed to prevent sticking, and keep the heat low enough for the food to cook evenly. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food.",
  "Put couscous, its oil and salt in a heatproof bowl. Pour over its 142.5 g boiling water, cover 10 minutes and fluff.",
  "Uncover tagine to reduce for 5-10 minutes if watery. Toast almonds dry for 2 minutes and add with coriander and lemon. Serve the entire sweet-savoury braise and couscous as one serving.",
  "Check the centre of the meat with a clean food thermometer: it should reach 75°C for at least 30 seconds. Do not wash raw poultry, and use clean utensils for the cooked food."
],
    "nutrition": {
      "calories": "1066 kcal",
      "protein": "61.6 g",
      "carbohydrates": "105.1 g",
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
    "id": "spiced-lamb-and-vegetable-pastilla",
    "code": "D064",
    "category": "Dinner",
    "mealFamily": "pastilla",
    "cuisine": "moroccan",
    "emoji": "🍽️",
    "image": "/images/recipes/D064.webp",
    "name": "Spiced lamb and vegetable pastilla",
    "description": "Crisp filo pastry filled with spiced lamb, vegetables, egg and almonds, with a touch of cinnamon and sweetness.",
    "cookingTime": "125 mins",
    "calories": "1327 kcal",
    "protein": "60.7 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Lamb mince",
        "shoppingItem": "Lamb mince",
        "quantity": "180 g (filling; raw edible input)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "90 g (filling; raw edible input)"
      },
      {
        "item": "Carrot",
        "shoppingItem": "Carrot",
        "quantity": "80 g (filling; raw edible input)"
      },
      {
        "item": "Courgette",
        "shoppingItem": "Courgette",
        "quantity": "80 g (filling; raw edible input)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "12.5 g (filling; as sold, weighed grams)"
      },
      {
        "item": "Fresh ginger",
        "shoppingItem": "Fresh ginger",
        "quantity": "7.5 g (filling; raw edible input)"
      },
      {
        "item": "Ground cumin",
        "shoppingItem": "Ground cumin",
        "quantity": "1 g (filling; dry)"
      },
      {
        "item": "Ground cinnamon",
        "shoppingItem": "Ground cinnamon",
        "quantity": "0.75 g (filling; dry)"
      },
      {
        "item": "Ground turmeric",
        "shoppingItem": "Ground turmeric",
        "quantity": "0.5 g (filling; dry)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.6 g (filling; dry)"
      },
      {
        "item": "Whole egg, shell removed",
        "shoppingItem": "Whole egg, shell removed",
        "quantity": "80 g (filling; raw edible input)"
      },
      {
        "item": "Fresh parsley",
        "shoppingItem": "Fresh parsley",
        "quantity": "10 g (filling; raw edible input)"
      },
      {
        "item": "Flaked almonds",
        "shoppingItem": "Flaked almonds",
        "quantity": "22.5 g (filling; as sold)"
      },
      {
        "item": "White sugar",
        "shoppingItem": "White sugar",
        "quantity": "6 g (filling; dry)"
      },
      {
        "item": "Filo pastry",
        "shoppingItem": "Filo pastry",
        "quantity": "110 g (filo case; uncooked as sold)"
      },
      {
        "item": "Unsalted butter",
        "shoppingItem": "Unsalted butter",
        "quantity": "27.5 g (filo case; as sold)"
      }
    ],
    "method": [
  "Weigh the ingredients for one serving before starting. Keep any amounts for the dough, filling and sauce separate so that each goes into the correct part of the recipe.",
  "Cook chopped onion, carrot and courgette in filling oil for 10 minutes. Stir around the base and edges of the pan. The vegetables should soften and lose their raw bite; lower the heat if they start to darken before they are tender. Add lamb, ginger, cumin, cinnamon, turmeric and salt, breaking up mince. Cook until safely cooked and reduce until almost dry; no fat or vegetable liquor is drained. Use the measured seasoning and sauces shown in the ingredients; do not add extra salt or a potassium-based salt substitute.",
  "Beat the 80 g egg and stir into the hot filling over low heat until just set throughout. Beat until the mixture has an even colour and consistency, with no long strands of unmixed egg white. Fold in chopped parsley, almonds and sugar. Spread in a shallow bowl and let stop steaming for about 20 minutes before assembly.",
  "Heat oven to 200 C conventional or 180 C fan. Melt the 27.5 g butter. Swirl the pan as the butter melts to coat its base. Keep it from browning or smoking before the next ingredient is added. Line a 14 cm pie dish with overlapping filo sheets, brushing each with measured butter and leaving an overhang. Reserve enough filo and butter for the top.",
  "Add the filling, fold over the edges and finish with the remaining buttered filo. Bake 30-40 minutes until crisp, golden and piping hot at the centre. Put the dish or tray on a stable oven shelf and begin checking towards the end of the stated time. Check the centre as well as the surface; a browned top alone does not show that the inside is cooked.",
  "Rest 10 minutes and serve the whole small pastilla, including all filling and pastry, as one serving. Lamb and vegetables are an original savoury adaptation of pastilla structure, not a claim that this is canonical chicken or pigeon pastilla.",
  "Check the centre of the meat with a clean food thermometer: it should reach 75°C for at least 30 seconds. Cook the egg mixture until fully set."
],
    "nutrition": {
      "calories": "1327 kcal",
      "protein": "60.7 g",
      "carbohydrates": "83.0 g",
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
    "id": "harissa-style-baked-fish-with-couscous",
    "code": "D065",
    "category": "Dinner",
    "mealFamily": "harissa-fish-couscous",
    "cuisine": "tunisian",
    "emoji": "🍽️",
    "image": "/images/recipes/D065.webp",
    "name": "Harissa-style baked fish with couscous",
    "description": "Baked haddock with a red chilli, garlic and caraway sauce, served with couscous and carrots.",
    "cookingTime": "55 mins",
    "calories": "938 kcal",
    "protein": "52.0 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Haddock fillet, unsmoked",
        "shoppingItem": "Haddock fillet, unsmoked",
        "quantity": "200 g (harissa fish; raw edible input)"
      },
      {
        "item": "Fresh red chilli flesh",
        "shoppingItem": "Fresh red chilli flesh",
        "quantity": "17.5 g (harissa fish; raw edible input)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "9 g (harissa fish; raw edible input)"
      },
      {
        "item": "Caraway seed, freshly crushed",
        "shoppingItem": "Caraway seed, freshly crushed",
        "quantity": "1 g (harissa fish; dry)"
      },
      {
        "item": "Ground coriander seed",
        "shoppingItem": "Ground coriander seed",
        "quantity": "1.5 g (harissa fish; dry)"
      },
      {
        "item": "Sweet paprika",
        "shoppingItem": "Sweet paprika",
        "quantity": "2 g (harissa fish; dry)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "20 g (harissa fish; as sold, weighed grams)"
      },
      {
        "item": "Tomato puree",
        "shoppingItem": "Tomato puree",
        "quantity": "17.5 g (harissa fish; as sold)"
      },
      {
        "item": "Fresh lemon juice",
        "shoppingItem": "Fresh lemon juice",
        "quantity": "15 g (harissa fish; freshly squeezed, weighed grams)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.6 g (harissa fish; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "20 g (harissa fish; weighed recipe water)"
      },
      {
        "item": "Plain couscous",
        "shoppingItem": "Plain couscous",
        "quantity": "110 g (couscous; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "142.5 g (couscous; weighed recipe water)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "9 g (couscous; as sold, weighed grams)"
      },
      {
        "item": "Fresh parsley",
        "shoppingItem": "Fresh parsley",
        "quantity": "9 g (couscous; raw edible input)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.3 g (couscous; dry)"
      },
      {
        "item": "Carrot",
        "shoppingItem": "Carrot",
        "quantity": "90 g (side; raw edible input)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "6 g (side; as sold, weighed grams)"
      }
    ],
    "method": [
  "Weigh the ingredients for one serving before starting. Keep any amounts for the dough, filling and sauce separate so that each goes into the correct part of the recipe.",
  "Deseed and finely chop red chillies before weighing 17.5 g flesh. Pound with garlic, caraway, coriander, paprika, tomato puree, fish oil, lemon, salt and 20 g water to make a fresh harissa-style paste.",
  "Heat oven to 220 C conventional or 200 C fan. Toss 1 cm carrot batons with their oil and roast 25-30 minutes. Put fish in a separate shallow dish with all paste and bake 15-20 minutes until safely cooked. Put the dish or tray on a stable oven shelf and begin checking towards the end of the stated time. Check the centre as well as the surface; a browned top alone does not show that the inside is cooked.",
  "Check the thickest part: it should be opaque, steaming hot and separate readily into flakes with a fork. Continue cooking if the centre is still cool or translucent.",
  "Pour the couscous boiling water over couscous, its oil and salt; cover 10 minutes and fluff with parsley. Do not borrow cooked green chermoula data for the red chilli paste.",
  "Serve all the fish, cooked red sauce, couscous and roasted carrots on one plate."
],
    "nutrition": {
      "calories": "938 kcal",
      "protein": "52.0 g",
      "carbohydrates": "91.5 g",
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
    "nutritionIncomplete": [],
    "nutritionSourceNote": "Ingredient-input estimates with cited secondary sources. Available carbohydrate by weight, excluding dietary fibre; reconciliation and original references: data/RecipeData/evidence/international-carbohydrates.json. Other nutrient gaps remain explicit.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 1
  ,
    primaryDietCategory: "Mediterranean-style",
    dietCategories: ["Mediterranean-style","Intermittent fasting — eating-window meal"]
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
    "description": "Crispy coated chicken with pineapple, peppers and onions in a tangy sweet-and-sour sauce, served with rice.",
    "cookingTime": "65 mins",
    "calories": "1308 kcal",
    "protein": "64.8 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Skinless boneless chicken breast",
        "shoppingItem": "Skinless boneless chicken breast",
        "quantity": "200 g (chicken; raw edible input)"
      },
      {
        "item": "Cornflour (maize starch)",
        "shoppingItem": "Cornflour (maize starch)",
        "quantity": "32.5 g (chicken; dry)"
      },
      {
        "item": "Whole egg, shell removed",
        "shoppingItem": "Whole egg, shell removed",
        "quantity": "35 g (chicken; raw edible input)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "22.5 g (chicken; as sold, weighed grams)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.4 g (chicken; dry)"
      },
      {
        "item": "White basmati rice",
        "shoppingItem": "White basmati rice",
        "quantity": "110 g (rice; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "198 g (rice; weighed recipe water)"
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
        "item": "Fresh pineapple flesh",
        "shoppingItem": "Fresh pineapple flesh",
        "quantity": "110 g (sweet-sour sauce; raw edible input)"
      },
      {
        "item": "Red bell pepper",
        "shoppingItem": "Red bell pepper",
        "quantity": "90 g (sweet-sour sauce; raw edible input)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "60 g (sweet-sour sauce; raw edible input)"
      },
      {
        "item": "Plain unseasoned vinegar",
        "shoppingItem": "Plain unseasoned vinegar",
        "quantity": "32.5 g (sweet-sour sauce; as sold, weighed grams)"
      },
      {
        "item": "White sugar",
        "shoppingItem": "White sugar",
        "quantity": "27.5 g (sweet-sour sauce; dry)"
      },
      {
        "item": "Tomato puree",
        "shoppingItem": "Tomato puree",
        "quantity": "22.5 g (sweet-sour sauce; as sold)"
      },
      {
        "item": "Soy sauce",
        "shoppingItem": "Soy sauce",
        "quantity": "9 g (sweet-sour sauce; as sold, weighed grams)"
      },
      {
        "item": "Cornflour (maize starch)",
        "shoppingItem": "Cornflour (maize starch)",
        "quantity": "6 g (sweet-sour sauce; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "65 g (sweet-sour sauce; weighed recipe water)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "6 g (sweet-sour sauce; as sold, weighed grams)"
      }
    ],
    "method": [
  "Weigh the ingredients for one serving before starting. Keep any amounts for the dough, filling and sauce separate so that each goes into the correct part of the recipe.",
  "Cook the rice component in its measured water, oil and salt in a close-fitting saucepan: bring to a simmer, cover on the lowest heat for 12-15 minutes, then rest off the heat for 10 minutes. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork. Do not drain. Keep the complete cooked rice for this serving.",
  "Cut chicken into 2 cm pieces. Beat chicken egg and salt, coat chicken and dust with its cornflour. Beat until the mixture has an even colour and consistency, with no long strands of unmixed egg white. Shallow-fry in batches in the measured 22.5 g oil until crisp and safely cooked; do not discard pan oil without measuring it in the cooking trial.",
  "Cut pineapple and vegetables into 2 cm pieces. Keep the pieces a similar size so they cook evenly. Keep any ingredients that are added later separate from those that go into the pan first. Heat sauce oil in a second pan and stir-fry pepper and onion 4 minutes. Stir around the base and edges of the pan. The vegetables should soften and lose their raw bite; lower the heat if they start to darken before they are tender. Add pineapple, vinegar, sugar, tomato puree and soy; simmer 3 minutes. Use the measured seasoning and sauces shown in the ingredients; do not add extra salt or a potassium-based salt substitute.",
  "Mix the 6 g sauce cornflour with its 65 g water and stir into the simmering sauce until clear and glossy. Fold in chicken only immediately before serving to retain its crisp surface.",
  "Serve all the chicken, sauce and rice as one serving. All coating/oil inputs are calculated; uneaten raw coating and residual frying oil need measurement before a consumed-nutrient claim.",
  "Check the centre of the meat with a clean food thermometer: it should reach 75°C for at least 30 seconds. Do not wash raw poultry, and use clean utensils for the cooked food. Cook the egg mixture until fully set."
],
    "nutrition": {
      "calories": "1308 kcal",
      "protein": "64.8 g",
      "carbohydrates": "168.9 g",
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
    "id": "ginger-and-spring-onion-steamed-fish",
    "code": "D067",
    "category": "Dinner",
    "mealFamily": "steamed-fish-plate",
    "cuisine": "chinese",
    "emoji": "🍽️",
    "image": "/images/recipes/D067.webp",
    "name": "Ginger and spring-onion steamed fish",
    "description": "Delicately steamed cod with ginger, spring onions and soy sauce, served with rice and garlicky Chinese cabbage.",
    "cookingTime": "50 mins",
    "calories": "926 kcal",
    "protein": "49.2 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Cod fillet, flesh only",
        "shoppingItem": "Cod fillet, flesh only",
        "quantity": "210 g (steamed fish; raw edible input)"
      },
      {
        "item": "Fresh ginger",
        "shoppingItem": "Fresh ginger",
        "quantity": "15 g (steamed fish; raw edible input)"
      },
      {
        "item": "Spring onion, bulbs and green tops",
        "shoppingItem": "Spring onion, bulbs and green tops",
        "quantity": "35 g (steamed fish; raw edible input)"
      },
      {
        "item": "Soy sauce",
        "shoppingItem": "Soy sauce",
        "quantity": "17.5 g (steamed fish; as sold, weighed grams)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "25 g (steamed fish; weighed recipe water)"
      },
      {
        "item": "White sugar",
        "shoppingItem": "White sugar",
        "quantity": "4 g (steamed fish; dry)"
      },
      {
        "item": "Sesame oil",
        "shoppingItem": "Sesame oil",
        "quantity": "5 g (steamed fish; as sold, weighed grams)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "17.5 g (steamed fish; as sold, weighed grams)"
      },
      {
        "item": "White basmati rice",
        "shoppingItem": "White basmati rice",
        "quantity": "115 g (rice; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "207 g (rice; weighed recipe water)"
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
        "item": "Chinese cabbage",
        "shoppingItem": "Chinese cabbage",
        "quantity": "130 g (greens; raw edible input)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "6 g (greens; as sold, weighed grams)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "4 g (greens; raw edible input)"
      }
    ],
    "method": [
  "Weigh the ingredients for one serving before starting. Keep any amounts for the dough, filling and sauce separate so that each goes into the correct part of the recipe.",
  "Cook the rice component in its measured water, oil and salt in a close-fitting saucepan: bring to a simmer, cover on the lowest heat for 12-15 minutes, then rest off the heat for 10 minutes. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork. Do not drain. Keep the complete cooked rice for this serving.",
  "Use the cod as one thick portion and place on a heatproof shallow plate that catches all juices. Cut ginger and spring onion into fine matchsticks; put half beneath and on the fish. Keep the pieces a similar size so they cook evenly. Keep any ingredients that are added later separate from those that go into the pan first.",
  "Steam over boiling process water for 10-15 minutes, checking doneness at the thickest part. Keep the food above the water rather than sitting in it, with the lid fitted so steam circulates around the portion. Check the pan does not boil dry without letting water splash onto the food. Do not discard the plate juices. Simmer soy, 25 g sauce water, sugar and sesame oil in a small pan. Look for small, gentle bubbles rather than a rolling boil. Stir along the bottom when needed to prevent sticking, and keep the heat low enough for the food to cook evenly. Use the measured seasoning and sauces shown in the ingredients; do not add extra salt or a potassium-based salt substitute.",
  "Stir-fry sliced Chinese cabbage and garlic in the greens oil for 4-6 minutes until tender. Heat the 17.5 g aromatic oil until shimmering, turn off the heat and carefully pour over the remaining ginger and spring onion in a deep heatproof bowl.",
  "Pour the bubbling soy mixture and aromatic oil over the cooked fish and plate juices. Serve all the fish, rice, greens and sauce as one serving.",
  "Check that the fish is steaming hot and cooked throughout, with opaque flesh that flakes easily."
],
    "nutrition": {
      "calories": "926 kcal",
      "protein": "49.2 g",
      "carbohydrates": "99.1 g",
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
    "id": "crispy-pork-with-garlic-noodles",
    "code": "D068",
    "category": "Dinner",
    "mealFamily": "crispy-pork-noodles",
    "cuisine": "chinese",
    "emoji": "🍽️",
    "image": "/images/recipes/D068.webp",
    "name": "Crispy pork with garlic noodles",
    "description": "Crispy roasted pork belly with egg noodles, garlic, spring onions and Chinese cabbage.",
    "cookingTime": "85 mins",
    "calories": "1158 kcal",
    "protein": "53.4 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Boneless rindless pork belly, lean and fat",
        "shoppingItem": "Boneless rindless pork belly, lean and fat",
        "quantity": "190 g (crispy pork; raw edible input)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.6 g (crispy pork; dry)"
      },
      {
        "item": "Ground black pepper",
        "shoppingItem": "Ground black pepper",
        "quantity": "0.4 g (crispy pork; dry)"
      },
      {
        "item": "Fresh ginger",
        "shoppingItem": "Fresh ginger",
        "quantity": "6 g (crispy pork; raw edible input)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "6 g (crispy pork; as sold, weighed grams)"
      },
      {
        "item": "Dried egg noodles",
        "shoppingItem": "Dried egg noodles",
        "quantity": "115 g (garlic noodles; dry)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "12 g (garlic noodles; raw edible input)"
      },
      {
        "item": "Spring onion, bulbs and green tops",
        "shoppingItem": "Spring onion, bulbs and green tops",
        "quantity": "25 g (garlic noodles; raw edible input)"
      },
      {
        "item": "Chinese cabbage",
        "shoppingItem": "Chinese cabbage",
        "quantity": "125 g (garlic noodles; raw edible input)"
      },
      {
        "item": "Soy sauce",
        "shoppingItem": "Soy sauce",
        "quantity": "15 g (garlic noodles; as sold, weighed grams)"
      },
      {
        "item": "White sugar",
        "shoppingItem": "White sugar",
        "quantity": "4 g (garlic noodles; dry)"
      },
      {
        "item": "Sesame oil",
        "shoppingItem": "Sesame oil",
        "quantity": "8 g (garlic noodles; as sold, weighed grams)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "10 g (garlic noodles; as sold, weighed grams)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "30 g (garlic noodles; weighed recipe water)"
      }
    ],
    "method": [
  "Weigh the ingredients for one serving before starting. Keep any amounts for the dough, filling and sauce separate so that each goes into the correct part of the recipe.",
  "Use boneless rindless pork belly, weighed with edible fat. Cut into 1.5 cm strips, pat dry and rub with pork salt, pepper and grated ginger. Keep the pieces a similar size so they cook evenly. Keep any ingredients that are added later separate from those that go into the pan first. Heat oven to 220 C conventional or 200 C fan.",
  "Coat a small roasting dish with the pork oil and roast strips for 35-45 minutes, turning, until browned and safely cooked. The rendered fat is deliberately retained and used in the noodle sauce; no drained-fat credit is assumed.",
  "Cook dry egg noodles in 900 g unsalted process water according to the packet and drain. Separate the pasta or noodles as they soften so they do not stick together. Check the texture towards the end of the cooking time; it should be tender with no chalky centre. Slice cabbage and spring onion, and mince garlic.",
  "Heat noodle rapeseed oil in a large pan; fry garlic 30 seconds, then cabbage and spring onion for 4-5 minutes. Stir around the base and edges of the pan. The vegetables should soften and lose their raw bite; lower the heat if they start to darken before they are tender. Add soy, sugar, sesame oil, 30 g sauce water and all pork tray juices/fat. Bubble, then toss through noodles. Use the measured seasoning and sauces shown in the ingredients; do not add extra salt or a potassium-based salt substitute.",
  "Serve all the noodles topped with all the crisp pork as one serving. This is roasted belly-strip crispness without rind crackling, not a claim of Cantonese siu yuk.",
  "Check the centre of the meat with a clean food thermometer: it should reach 75°C for at least 30 seconds. Cook the egg mixture until fully set."
],
    "nutrition": {
      "calories": "1158 kcal",
      "protein": "53.4 g",
      "carbohydrates": "87.5 g",
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
    "id": "chicken-teriyaki-style-rice-bowl",
    "code": "D069",
    "category": "Dinner",
    "mealFamily": "teriyaki-rice-bowl",
    "cuisine": "japanese",
    "emoji": "🍽️",
    "image": "/images/recipes/D069.webp",
    "name": "Chicken teriyaki-style rice bowl",
    "description": "Pan-seared chicken in a glossy soy glaze, served with rice, cucumber, carrot and sesame seeds.",
    "cookingTime": "50 mins",
    "calories": "1013 kcal",
    "protein": "53.3 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Skinless boneless chicken thigh",
        "shoppingItem": "Skinless boneless chicken thigh",
        "quantity": "210 g (teriyaki; raw edible input)"
      },
      {
        "item": "Soy sauce",
        "shoppingItem": "Soy sauce",
        "quantity": "16 g (teriyaki; as sold, weighed grams)"
      },
      {
        "item": "Plain unseasoned vinegar",
        "shoppingItem": "Plain unseasoned vinegar",
        "quantity": "3.5 g (teriyaki; as sold, weighed grams)"
      },
      {
        "item": "White sugar",
        "shoppingItem": "White sugar",
        "quantity": "23 g (teriyaki; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "19.5 g (teriyaki; weighed recipe water)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "12.5 g (teriyaki; as sold, weighed grams)"
      },
      {
        "item": "White short-grain rice",
        "shoppingItem": "White short-grain rice",
        "quantity": "115 g (rice; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "207 g (rice; weighed recipe water)"
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
        "item": "Cucumber",
        "shoppingItem": "Cucumber",
        "quantity": "100 g (side; raw edible input)"
      },
      {
        "item": "Carrot",
        "shoppingItem": "Carrot",
        "quantity": "60 g (side; raw edible input)"
      },
      {
        "item": "Plain unseasoned vinegar",
        "shoppingItem": "Plain unseasoned vinegar",
        "quantity": "12.5 g (side; as sold, weighed grams)"
      },
      {
        "item": "Sesame seeds",
        "shoppingItem": "Sesame seeds",
        "quantity": "6 g (side; dry)"
      },
      {
        "item": "Sesame oil",
        "shoppingItem": "Sesame oil",
        "quantity": "5 g (side; as sold, weighed grams)"
      }
    ],
    "method": [
      "Weigh the ingredients for one serving before starting. Keep any amounts for the dough, filling and sauce separate so that each goes into the correct part of the recipe.",
      "Cook the rice component in its measured water, oil and salt in a close-fitting saucepan: bring to a simmer, cover on the lowest heat for 12-15 minutes, then rest off the heat for 10 minutes. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork. Do not drain. Keep the complete cooked rice for this serving.",
      "Stir together the 16 g soy sauce, 23 g white sugar, 3.5 g plain unseasoned vinegar and 19.5 g sauce water until the sugar starts to dissolve. Keep this glaze separate from the vinegar used for the salad. Use the measured amounts shown; do not add extra salt or a potassium-based salt substitute.",
      "Flatten thighs to an even thickness. Heat chicken oil in a non-stick pan, sear 5-6 minutes per side, then cover briefly until safely cooked. Let the pan warm before the food goes in. If the oil begins to smoke or the food catches immediately, lower the heat before continuing. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food. Keep the pan juices.",
      "Add the teriyaki mixture and simmer, turning chicken repeatedly, for 3-5 minutes until glossy and clinging. Look for small, gentle bubbles rather than a rolling boil. Stir along the bottom when needed to prevent sticking, and keep the heat low enough for the food to cook evenly. Serve all the glaze with the chicken; do not discard any pan sauce.",
      "Toss finely cut cucumber and carrot with vinegar, sesame and sesame oil. Keep the pieces a similar size so they cook evenly. Keep any ingredients that are added later separate from those that go into the pan first. Slice the chicken and serve it with all the glaze, rice and side as one serving.",
      "Check the centre of the meat with a clean food thermometer: it should reach 75°C for at least 30 seconds. Do not wash raw poultry, and use clean utensils for the cooked food."
    ],
    "nutrition": {
      "calories": "1013 kcal",
      "protein": "53.3 g",
      "carbohydrates": "121.1 g",
      "fat": "33.7 g",
      "fibre": "4.9 g",
      "sodium": "1212 mg",
      "potassium": "1249 mg",
      "phosphate": "438 mg",
      "salt": "3.03 g"
    },
    "potassium": "Pending review",
    "phosphate": "Pending review",
    "purines": "Pending review",
    "dietaryNote": "Development estimate requiring individual whole-day review; see guide dossier. No universal stage or dialysis suitability claim.",
    "nutritionBasis": "CoFID ingredient-input estimate",
    "nutritionIncomplete": [],
    "nutritionSourceNote": "Ingredient-input estimates with cited CoFID and secondary sources. Available carbohydrate by weight excludes dietary fibre. Completed missing-nutrient evidence and calculations: data/RecipeData/evidence/nutrition-gap-resolution.json. Ingredient and cooking variability remain.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 1
  ,
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
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
    "description": "Garlic and chilli chicken mince stir-fried with green beans and Thai holy basil, served with jasmine rice.",
    "cookingTime": "45 mins",
    "calories": "915 kcal",
    "protein": "59.5 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Plain chicken breast, minced",
        "shoppingItem": "Plain chicken breast, minced",
        "quantity": "200 g (basil chicken; raw edible input)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "11 g (basil chicken; raw edible input)"
      },
      {
        "item": "Fresh red chilli flesh",
        "shoppingItem": "Fresh red chilli flesh",
        "quantity": "6 g (basil chicken; raw edible input)"
      },
      {
        "item": "Fresh holy basil",
        "shoppingItem": "Fresh holy basil",
        "quantity": "15 g (basil chicken; raw edible leaves)"
      },
      {
        "item": "Fish sauce",
        "shoppingItem": "Fish sauce",
        "quantity": "11 g (basil chicken; as sold, weighed grams)"
      },
      {
        "item": "Soy sauce",
        "shoppingItem": "Soy sauce",
        "quantity": "8 g (basil chicken; as sold, weighed grams)"
      },
      {
        "item": "White sugar",
        "shoppingItem": "White sugar",
        "quantity": "6 g (basil chicken; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "35 g (basil chicken; weighed recipe water)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "20 g (basil chicken; as sold, weighed grams)"
      },
      {
        "item": "Green beans",
        "shoppingItem": "Green beans",
        "quantity": "90 g (basil chicken; raw edible input)"
      },
      {
        "item": "Thai fragrant jasmine rice",
        "shoppingItem": "Thai fragrant jasmine rice",
        "quantity": "115 g (rice; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "207 g (rice; weighed recipe water)"
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
      }
    ],
    "method": [
  "Weigh the ingredients for one serving before starting. Keep any amounts for the dough, filling and sauce separate so that each goes into the correct part of the recipe.",
  "Cook the rice component in its measured water, oil and salt in a close-fitting saucepan: bring to a simmer, cover on the lowest heat for 12-15 minutes, then rest off the heat for 10 minutes. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork. Do not drain. Keep the complete cooked rice for this serving.",
  "Mince raw chicken breast at home or request plain breast mince with no added ingredients. Pound garlic and chilli coarsely. Cut green beans into 1 cm lengths; pick and weigh holy basil leaves.",
  "Heat chicken oil in a large wok over high heat. Fry garlic and chilli for 20 seconds, then add chicken and break into small pieces, stir-frying 5-7 minutes. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food. Use the measured seasoning and sauces shown in the ingredients; do not add extra salt or a potassium-based salt substitute.",
  "Add beans, fish sauce, soy, sugar and sauce water; stir-fry 4-6 minutes until chicken is safely cooked and beans are tender with bite. Reduce to a glossy coating.",
  "Turn off heat and fold in all holy basil just until wilted. Serve immediately with all the jasmine rice as one serving. Transfer the complete portion to a plate or bowl, including any listed sides or sauce. Eat while freshly prepared; extra bread, dips or toppings would be additions to this meal. CoFID sweet-basil composition is only a stated species proxy for holy basil, not an exact analytical match.",
  "Check the centre of the meat with a clean food thermometer: it should reach 75°C for at least 30 seconds. Do not wash raw poultry, and use clean utensils for the cooked food."
],
    "nutrition": {
      "calories": "915 kcal",
      "protein": "59.5 g",
      "carbohydrates": "101.6 g",
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
    "id": "red-curry-style-chicken-with-rice",
    "code": "D071",
    "category": "Dinner",
    "mealFamily": "red-curry-rice",
    "cuisine": "thai",
    "emoji": "🍽️",
    "image": "/images/recipes/D071.webp",
    "name": "Red-curry-style chicken with rice",
    "description": "Chicken, peppers and green beans in a coconut curry with fresh chilli, lemongrass and galangal, served with jasmine rice.",
    "cookingTime": "75 mins",
    "calories": "1175 kcal",
    "protein": "56.6 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Fresh red chilli flesh",
        "shoppingItem": "Fresh red chilli flesh",
        "quantity": "20 g (fresh red paste; raw edible input)"
      },
      {
        "item": "Tender lemongrass core",
        "shoppingItem": "Tender lemongrass core",
        "quantity": "12.5 g (fresh red paste; raw edible core finely minced)"
      },
      {
        "item": "Fresh galangal",
        "shoppingItem": "Fresh galangal",
        "quantity": "7.5 g (fresh red paste; peeled raw edible rhizome)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "8 g (fresh red paste; raw edible input)"
      },
      {
        "item": "Shallot",
        "shoppingItem": "Shallot",
        "quantity": "40 g (fresh red paste; raw edible input)"
      },
      {
        "item": "Ground coriander seed",
        "shoppingItem": "Ground coriander seed",
        "quantity": "1.5 g (fresh red paste; dry)"
      },
      {
        "item": "Ground cumin",
        "shoppingItem": "Ground cumin",
        "quantity": "1 g (fresh red paste; dry)"
      },
      {
        "item": "Fresh lime juice",
        "shoppingItem": "Fresh lime juice",
        "quantity": "7.5 g (fresh red paste; freshly squeezed, weighed grams)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "12.5 g (fresh red paste; as sold, weighed grams)"
      },
      {
        "item": "Skinless boneless chicken thigh",
        "shoppingItem": "Skinless boneless chicken thigh",
        "quantity": "200 g (curry; raw edible input)"
      },
      {
        "item": "Full-fat canned coconut milk",
        "shoppingItem": "Full-fat canned coconut milk",
        "quantity": "175 g (curry; as sold, weighed grams)"
      },
      {
        "item": "Red bell pepper",
        "shoppingItem": "Red bell pepper",
        "quantity": "90 g (curry; raw edible input)"
      },
      {
        "item": "Green beans",
        "shoppingItem": "Green beans",
        "quantity": "90 g (curry; raw edible input)"
      },
      {
        "item": "Fish sauce",
        "shoppingItem": "Fish sauce",
        "quantity": "12.5 g (curry; as sold, weighed grams)"
      },
      {
        "item": "White sugar",
        "shoppingItem": "White sugar",
        "quantity": "6 g (curry; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "75 g (curry; weighed recipe water)"
      },
      {
        "item": "Fresh basil",
        "shoppingItem": "Fresh basil",
        "quantity": "10 g (curry; raw edible input)"
      },
      {
        "item": "Thai fragrant jasmine rice",
        "shoppingItem": "Thai fragrant jasmine rice",
        "quantity": "110 g (rice; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "198 g (rice; weighed recipe water)"
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
      }
    ],
    "method": [
  "Weigh the ingredients for one serving before starting. Keep any amounts for the dough, filling and sauce separate so that each goes into the correct part of the recipe.",
  "Cook the rice component in its measured water, oil and salt in a close-fitting saucepan: bring to a simmer, cover on the lowest heat for 12-15 minutes, then rest off the heat for 10 minutes. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork. Do not drain. Keep the complete cooked rice for this serving.",
  "Peel galangal and remove tough lemongrass layers before weighing. Mince very finely with chilli, garlic and shallot. Pound with coriander, cumin and paste lime into a coarse paste; this is an original fresh red-curry-style paste without a commercial blend.",
  "Heat paste oil over medium heat and fry the full paste for 8-10 minutes until fragrant, stirring so it does not scorch. Add 50 g of the curry coconut milk and cook 2 minutes. Use the measured seasoning and sauces shown in the ingredients; do not add extra salt or a potassium-based salt substitute.",
  "Add chicken in 3 cm pieces, remaining 125 g coconut milk, curry water, fish sauce and sugar. Simmer gently 15 minutes, then add sliced pepper and beans for 8-10 minutes, until chicken is safely cooked and vegetables tender. Look for small, gentle bubbles rather than a rolling boil. Stir along the bottom when needed to prevent sticking, and keep the heat low enough for the food to cook evenly.",
  "Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food.",
  "Fold in basil and serve all the curry and jasmine rice as one serving. Use a fork or broad spoon and a light lifting motion so the grains stay separate. Work gently from the bottom of the bowl without pressing or mashing the grains. Galangal remains galangal; no ginger value is substituted for its missing composition evidence.",
  "Check the centre of the meat with a clean food thermometer: it should reach 75°C for at least 30 seconds. Do not wash raw poultry, and use clean utensils for the cooked food."
],
    "nutrition": {
      "calories": "1175 kcal",
      "protein": "56.6 g",
      "carbohydrates": "108.2 g",
      "fat": "55.2 g",
      "fibre": "10.7 g",
      "sodium": "1293 mg",
      "potassium": "2122 mg",
      "phosphate": "613 mg",
      "salt": "3.23 g"
    },
    "potassium": "Pending review",
    "phosphate": "Pending review",
    "purines": "Pending review",
    "dietaryNote": "Development estimate requiring individual whole-day review; see guide dossier. No universal stage or dialysis suitability claim.",
    "nutritionBasis": "CoFID ingredient-input estimate",
    "nutritionIncomplete": [],
    "nutritionSourceNote": "Ingredient-input estimates with cited CoFID and secondary sources. Available carbohydrate by weight excludes dietary fibre. Completed missing-nutrient evidence and calculations: data/RecipeData/evidence/nutrition-gap-resolution.json. Ingredient and cooking variability remain.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 1
  ,
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
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
    "description": "Lemongrass-marinated pork with rice noodles, crisp vegetables, fresh herbs and a lime dressing.",
    "cookingTime": "85 mins",
    "calories": "1194 kcal",
    "protein": "47.5 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Boneless pork shoulder, lean and edible fat",
        "shoppingItem": "Boneless pork shoulder, lean and edible fat",
        "quantity": "200 g (pork; raw edible input)"
      },
      {
        "item": "Tender lemongrass core",
        "shoppingItem": "Tender lemongrass core",
        "quantity": "14 g (pork; raw edible core finely minced)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "8 g (pork; raw edible input)"
      },
      {
        "item": "Shallot",
        "shoppingItem": "Shallot",
        "quantity": "25 g (pork; raw edible input)"
      },
      {
        "item": "Fish sauce",
        "shoppingItem": "Fish sauce",
        "quantity": "12.5 g (pork; as sold, weighed grams)"
      },
      {
        "item": "White sugar",
        "shoppingItem": "White sugar",
        "quantity": "10 g (pork; dry)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "15 g (pork; as sold, weighed grams)"
      },
      {
        "item": "Ground black pepper",
        "shoppingItem": "Ground black pepper",
        "quantity": "0.4 g (pork; dry)"
      },
      {
        "item": "Rice noodles",
        "shoppingItem": "Rice noodles",
        "quantity": "110 g (noodle salad; dry)"
      },
      {
        "item": "Carrot",
        "shoppingItem": "Carrot",
        "quantity": "65 g (noodle salad; raw edible input)"
      },
      {
        "item": "Daikon/mooli radish",
        "shoppingItem": "Daikon/mooli radish",
        "quantity": "65 g (noodle salad; raw edible input)"
      },
      {
        "item": "Cucumber",
        "shoppingItem": "Cucumber",
        "quantity": "80 g (noodle salad; raw edible input)"
      },
      {
        "item": "Fresh mint",
        "shoppingItem": "Fresh mint",
        "quantity": "9 g (noodle salad; raw edible leaves)"
      },
      {
        "item": "Fresh coriander leaves",
        "shoppingItem": "Fresh coriander leaves",
        "quantity": "9 g (noodle salad; raw edible input)"
      },
      {
        "item": "Fresh lime juice",
        "shoppingItem": "Fresh lime juice",
        "quantity": "25 g (dressing; freshly squeezed, weighed grams)"
      },
      {
        "item": "Plain unseasoned vinegar",
        "shoppingItem": "Plain unseasoned vinegar",
        "quantity": "15 g (dressing; as sold, weighed grams)"
      },
      {
        "item": "Fish sauce",
        "shoppingItem": "Fish sauce",
        "quantity": "9 g (dressing; as sold, weighed grams)"
      },
      {
        "item": "White sugar",
        "shoppingItem": "White sugar",
        "quantity": "10 g (dressing; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "35 g (dressing; weighed recipe water)"
      },
      {
        "item": "Fresh red chilli flesh",
        "shoppingItem": "Fresh red chilli flesh",
        "quantity": "3 g (dressing; raw edible input)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "6 g (dressing; as sold, weighed grams)"
      }
    ],
    "method": [
  "Weigh the ingredients for one serving before starting. Keep any amounts for the dough, filling and sauce separate so that each goes into the correct part of the recipe.",
  "Slice boneless pork shoulder across the grain 5 mm thick. Mince tender lemongrass core, garlic and shallot with the pork fish sauce, sugar, oil and pepper. Marinate pork refrigerated for 45 minutes.",
  "Julienne carrot and mooli and toss with all dressing ingredients for 20 minutes as a fresh pickle dressing; no liquor is drained. Slice cucumber and tear mint and coriander.",
  "Cook rice noodles in 900 g process water according to their packet, then drain and cool. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork. Separate the pasta or noodles as they soften so they do not stick together.",
  "Check the texture towards the end of the cooking time; it should be tender with no chalky centre. No numerical mineral leaching credit is applied.",
  "Griddle pork in batches over medium-high heat for 3-5 minutes per side until safely cooked and browned. Simmer remaining marinade and collected juices until safely cooked before adding to the platter. Look for small, gentle bubbles rather than a rolling boil. Stir along the bottom when needed to prevent sticking, and keep the heat low enough for the food to cook evenly. Use the listed herbs, spices or citrus for flavour before considering any extra seasoning.",
  "Serve all the noodles, pork and juices, vegetables, herbs and dressing in one large bowl.",
  "Check the centre of the meat with a clean food thermometer: it should reach 75°C for at least 30 seconds."
],
    "nutrition": {
      "calories": "1194 kcal",
      "protein": "47.5 g",
      "carbohydrates": "118.9 g",
      "fat": "55.1 g",
      "fibre": "9.3 g",
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
    "nutritionIncomplete": [],
    "nutritionSourceNote": "Ingredient-input estimates with cited CoFID and secondary sources. Available carbohydrate by weight excludes dietary fibre. Completed missing-nutrient evidence and calculations: data/RecipeData/evidence/nutrition-gap-resolution.json. Ingredient and cooking variability remain.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 1
  ,
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
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
    "description": "Chicken and rice noodles in a coconut broth with lemongrass, galangal and chilli, finished with beansprouts and coriander.",
    "cookingTime": "80 mins",
    "calories": "1169 kcal",
    "protein": "55.6 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Tender lemongrass core",
        "shoppingItem": "Tender lemongrass core",
        "quantity": "12.5 g (laksa paste; raw edible core finely minced)"
      },
      {
        "item": "Fresh galangal",
        "shoppingItem": "Fresh galangal",
        "quantity": "7.5 g (laksa paste; peeled raw edible rhizome)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "7.5 g (laksa paste; raw edible input)"
      },
      {
        "item": "Shallot",
        "shoppingItem": "Shallot",
        "quantity": "45 g (laksa paste; raw edible input)"
      },
      {
        "item": "Fresh red chilli flesh",
        "shoppingItem": "Fresh red chilli flesh",
        "quantity": "15 g (laksa paste; raw edible input)"
      },
      {
        "item": "Ground turmeric",
        "shoppingItem": "Ground turmeric",
        "quantity": "1 g (laksa paste; dry)"
      },
      {
        "item": "Ground coriander seed",
        "shoppingItem": "Ground coriander seed",
        "quantity": "1.5 g (laksa paste; dry)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "17.5 g (laksa paste; as sold, weighed grams)"
      },
      {
        "item": "Skinless boneless chicken thigh",
        "shoppingItem": "Skinless boneless chicken thigh",
        "quantity": "200 g (broth; raw edible input)"
      },
      {
        "item": "Full-fat canned coconut milk",
        "shoppingItem": "Full-fat canned coconut milk",
        "quantity": "175 g (broth; as sold, weighed grams)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "325 g (broth; weighed recipe water)"
      },
      {
        "item": "Fish sauce",
        "shoppingItem": "Fish sauce",
        "quantity": "12.5 g (broth; as sold, weighed grams)"
      },
      {
        "item": "White sugar",
        "shoppingItem": "White sugar",
        "quantity": "6 g (broth; dry)"
      },
      {
        "item": "Fresh lime juice",
        "shoppingItem": "Fresh lime juice",
        "quantity": "17.5 g (broth; freshly squeezed, weighed grams)"
      },
      {
        "item": "Rice noodles",
        "shoppingItem": "Rice noodles",
        "quantity": "110 g (broth; dry)"
      },
      {
        "item": "Mung beansprouts",
        "shoppingItem": "Mung beansprouts",
        "quantity": "80 g (broth; raw edible input)"
      },
      {
        "item": "Fresh coriander leaves",
        "shoppingItem": "Fresh coriander leaves",
        "quantity": "9 g (broth; raw edible input)"
      }
    ],
    "method": [
  "Weigh the ingredients for one serving before starting. Keep any amounts for the dough, filling and sauce separate so that each goes into the correct part of the recipe.",
  "Finely mince peeled galangal, tender lemongrass core, garlic, shallot and chilli; pound with turmeric and coriander. Heat paste oil and fry the entire paste for 8-10 minutes until aromatic.",
  "Add chicken cut into 2 cm pieces, all 325 g broth water and 75 g coconut milk. Simmer gently 15 minutes, then add remaining 100 g coconut milk, fish sauce and sugar. Look for small, gentle bubbles rather than a rolling boil. Stir along the bottom when needed to prevent sticking, and keep the heat low enough for the food to cook evenly. Continue 10 minutes until chicken is safely cooked. Use the listed herbs, spices or citrus for flavour before considering any extra seasoning.",
  "Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food. The chicken poaching liquor forms the stock and is retained.",
  "Cook rice noodles in 900 g separate process water according to their packet; drain. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork. Separate the pasta or noodles as they soften so they do not stick together. Check the texture towards the end of the cooking time; it should be tender with no chalky centre. Add beansprouts to the simmering broth for 3 minutes so they are thoroughly cooked.",
  "Stir lime into the broth off the heat. Put all the noodles in one deep bowl, then add all the chicken, broth and coriander. This is a curry-laksa-inspired chicken version without an unquantified shrimp paste or stock cube.",
  "Measure final served broth after kitchen testing to establish countable fluid per person; evaporation makes the 325 g input water an unsuitable final fluid claim.",
  "Check the centre of the meat with a clean food thermometer: it should reach 75°C for at least 30 seconds. Do not wash raw poultry, and use clean utensils for the cooked food."
],
    "nutrition": {
      "calories": "1169 kcal",
      "protein": "55.6 g",
      "carbohydrates": "106.3 g",
      "fat": "54.3 g",
      "fibre": "8.3 g",
      "sodium": "1379 mg",
      "potassium": "1702 mg",
      "phosphate": "666 mg",
      "salt": "3.45 g"
    },
    "potassium": "Pending review",
    "phosphate": "Pending review",
    "purines": "Pending review",
    "dietaryNote": "Development estimate requiring individual whole-day review; see guide dossier. No universal stage or dialysis suitability claim.",
    "nutritionBasis": "CoFID ingredient-input estimate",
    "nutritionIncomplete": [],
    "nutritionSourceNote": "Ingredient-input estimates with cited CoFID and secondary sources. Available carbohydrate by weight excludes dietary fibre. Completed missing-nutrient evidence and calculations: data/RecipeData/evidence/nutrition-gap-resolution.json. Ingredient and cooking variability remain.",
    "quantityConversionsEstimated": false,
    "conditionalProxyPending": true,
    "clinicalReviewPending": true,
    "servings": 1
  ,
    primaryDietCategory: "Mixed diet",
    dietCategories: ["Mixed diet"]
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
    "description": "Corn tortillas filled with spiced chicken and peppers, baked in a tomato and chilli sauce with melted Cheddar.",
    "cookingTime": "80 mins",
    "calories": "1102 kcal",
    "protein": "73.5 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Skinless boneless chicken breast",
        "shoppingItem": "Skinless boneless chicken breast",
        "quantity": "190 g (chicken filling; raw edible input)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "65 g (chicken filling; raw edible input)"
      },
      {
        "item": "Red bell pepper",
        "shoppingItem": "Red bell pepper",
        "quantity": "90 g (chicken filling; raw edible input)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "12.5 g (chicken filling; as sold, weighed grams)"
      },
      {
        "item": "Ground cumin",
        "shoppingItem": "Ground cumin",
        "quantity": "1.5 g (chicken filling; dry)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.5 g (chicken filling; dry)"
      },
      {
        "item": "Canned tomatoes including juice",
        "shoppingItem": "Canned tomatoes including juice",
        "quantity": "250 g (red sauce; as sold, whole contents)"
      },
      {
        "item": "Tomato puree",
        "shoppingItem": "Tomato puree",
        "quantity": "17.5 g (red sauce; as sold)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "9 g (red sauce; raw edible input)"
      },
      {
        "item": "Dried red chilli flesh",
        "shoppingItem": "Dried red chilli flesh",
        "quantity": "4 g (red sauce; dry, stems and seeds removed)"
      },
      {
        "item": "Dried oregano",
        "shoppingItem": "Dried oregano",
        "quantity": "0.75 g (red sauce; dry)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "10 g (red sauce; as sold, weighed grams)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "80 g (red sauce; weighed recipe water)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.4 g (red sauce; dry)"
      },
      {
        "item": "Soft corn tortillas",
        "shoppingItem": "Soft corn tortillas",
        "quantity": "130 g (assembly; as sold)"
      },
      {
        "item": "Mature Cheddar",
        "shoppingItem": "Mature Cheddar",
        "quantity": "55 g (assembly; as sold)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "6 g (assembly; as sold, weighed grams)"
      },
      {
        "item": "Fresh coriander leaves",
        "shoppingItem": "Fresh coriander leaves",
        "quantity": "10 g (assembly; raw edible input)"
      }
    ],
    "method": [
  "Weigh the ingredients for one serving before starting. Keep any amounts for the dough, filling and sauce separate so that each goes into the correct part of the recipe.",
  "Use whole dried red chilli flesh without stems or seeds, weighed 4 g. Soften it in the 80 g hot sauce water for 15 minutes; blend the full water and chilli with canned tomato, puree and garlic.",
  "Heat sauce oil, add the blended mixture, oregano and sauce salt, and simmer 15-20 minutes until thick enough to coat a spoon. Look for small, gentle bubbles rather than a rolling boil. Stir along the bottom when needed to prevent sticking, and keep the heat low enough for the food to cook evenly. No straining or discarded chilli liquid is assumed. Use the measured seasoning and sauces shown in the ingredients; do not add extra salt or a potassium-based salt substitute.",
  "Dice chicken, onion and pepper. Keep the pieces a similar size so they cook evenly. Keep any ingredients that are added later separate from those that go into the pan first. Cook in filling oil with cumin and filling salt for 12-15 minutes until chicken is safely cooked and the filling is not watery. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food.",
  "Heat oven to 200 C conventional or 180 C fan. Brush tortillas with the assembly oil and warm in a pan to make flexible. Divide filling and half the grated cheese between them, roll, and place seam down in a small baking dish over one third of the sauce. Choose a dish that holds this portion without spreading it into a very thin layer. Arrange it evenly, so the centre and edges heat through at a similar rate.",
  "Cover with remaining sauce and cheese. Bake 20-25 minutes until bubbling and hot throughout. Put the dish or tray on a stable oven shelf and begin checking towards the end of the stated time. Check the centre as well as the surface; a browned top alone does not show that the inside is cooked. Scatter coriander and serve the complete dish as one serving.",
  "Check the centre of the meat with a clean food thermometer: it should reach 75°C for at least 30 seconds. Do not wash raw poultry, and use clean utensils for the cooked food."
],
    "nutrition": {
      "calories": "1102 kcal",
      "protein": "73.5 g",
      "carbohydrates": "74.4 g",
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
    "id": "beef-fajita-platter-with-tortillas",
    "code": "D075",
    "category": "Dinner",
    "mealFamily": "fajita-platter",
    "cuisine": "mexican",
    "emoji": "🍽️",
    "image": "/images/recipes/D075.webp",
    "name": "Beef fajita platter with tortillas",
    "description": "Sizzling strips of beef with peppers and onions, served with warm tortillas, yoghurt and fresh coriander.",
    "cookingTime": "75 mins",
    "calories": "1177 kcal",
    "protein": "61.7 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Beef sirloin, lean and edible fat",
        "shoppingItem": "Beef sirloin, lean and edible fat",
        "quantity": "200 g (fajitas; raw edible input)"
      },
      {
        "item": "Red bell pepper",
        "shoppingItem": "Red bell pepper",
        "quantity": "100 g (fajitas; raw edible input)"
      },
      {
        "item": "Green bell pepper",
        "shoppingItem": "Green bell pepper",
        "quantity": "90 g (fajitas; raw edible input)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "100 g (fajitas; raw edible input)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "6 g (fajitas; raw edible input)"
      },
      {
        "item": "Fresh lime juice",
        "shoppingItem": "Fresh lime juice",
        "quantity": "22.5 g (fajitas; freshly squeezed, weighed grams)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "20 g (fajitas; as sold, weighed grams)"
      },
      {
        "item": "Ground cumin",
        "shoppingItem": "Ground cumin",
        "quantity": "1.5 g (fajitas; dry)"
      },
      {
        "item": "Sweet paprika",
        "shoppingItem": "Sweet paprika",
        "quantity": "1.5 g (fajitas; dry)"
      },
      {
        "item": "Pure cayenne chilli powder",
        "shoppingItem": "Pure cayenne chilli powder",
        "quantity": "0.35 g (fajitas; dry)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.7 g (fajitas; dry)"
      },
      {
        "item": "Soft wheat tortillas",
        "shoppingItem": "Soft wheat tortillas",
        "quantity": "140 g (platter; as sold)"
      },
      {
        "item": "Plain whole-milk yoghurt",
        "shoppingItem": "Plain whole-milk yoghurt",
        "quantity": "65 g (platter; as sold)"
      },
      {
        "item": "Fresh coriander leaves",
        "shoppingItem": "Fresh coriander leaves",
        "quantity": "10 g (platter; raw edible input)"
      },
      {
        "item": "Fresh lime juice",
        "shoppingItem": "Fresh lime juice",
        "quantity": "10 g (platter; freshly squeezed, weighed grams)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "6 g (platter; as sold, weighed grams)"
      }
    ],
    "method": [
  "Weigh the ingredients for one serving before starting. Keep any amounts for the dough, filling and sauce separate so that each goes into the correct part of the recipe.",
  "Cut beef across the grain into 1 cm strips. Mix fajita garlic, lime, spices, salt and half the 20 g fajita oil; marinate beef refrigerated for 30 minutes. Use the measured seasoning and sauces shown in the ingredients; do not add extra salt or a potassium-based salt substitute.",
  "Slice peppers and onion into long strips. Keep the pieces a similar size so they cook evenly. Keep any ingredients that are added later separate from those that go into the pan first. Heat remaining 10 g fajita oil in a large pan and sear vegetables in two batches for 6-8 minutes, keeping charred edges and some bite.",
  "Remove vegetables, sear beef in two batches over high heat until browned and safely cooked, then add all raw-contact marinade and bubble thoroughly. Return vegetables briefly.",
  "Warm tortillas in a dry pan and brush with the 6 g platter oil. Mix yoghurt with platter lime and coriander. Serve all the sizzling meat, vegetables, juices, tortillas and yoghurt sauce as one serving.",
  "Check the centre of the meat with a clean food thermometer: it should reach 75°C for at least 30 seconds."
],
    "nutrition": {
      "calories": "1177 kcal",
      "protein": "61.7 g",
      "carbohydrates": "90.5 g",
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
    "id": "caribbean-chicken-curry-with-rice",
    "code": "D076",
    "category": "Dinner",
    "mealFamily": "caribbean-curry-rice",
    "cuisine": "caribbean",
    "emoji": "🍽️",
    "image": "/images/recipes/D076.webp",
    "name": "Caribbean chicken curry with rice",
    "description": "Chicken and potato curry with thyme, allspice, ginger and chilli, served with basmati rice.",
    "cookingTime": "100 mins",
    "calories": "979 kcal",
    "protein": "55.6 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Skinless boneless chicken thigh",
        "shoppingItem": "Skinless boneless chicken thigh",
        "quantity": "200 g (Caribbean curry; raw edible input)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "90 g (Caribbean curry; raw edible input)"
      },
      {
        "item": "Peeled potato",
        "shoppingItem": "Peeled potato",
        "quantity": "120 g (Caribbean curry; raw edible input)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "7.5 g (Caribbean curry; raw edible input)"
      },
      {
        "item": "Fresh ginger",
        "shoppingItem": "Fresh ginger",
        "quantity": "10 g (Caribbean curry; raw edible input)"
      },
      {
        "item": "Spring onion, bulbs and green tops",
        "shoppingItem": "Spring onion, bulbs and green tops",
        "quantity": "25 g (Caribbean curry; raw edible input)"
      },
      {
        "item": "Fresh green chilli flesh",
        "shoppingItem": "Fresh green chilli flesh",
        "quantity": "4 g (Caribbean curry; raw edible input)"
      },
      {
        "item": "Dried thyme",
        "shoppingItem": "Dried thyme",
        "quantity": "1 g (Caribbean curry; dry)"
      },
      {
        "item": "Ground allspice",
        "shoppingItem": "Ground allspice",
        "quantity": "1 g (Caribbean curry; dry)"
      },
      {
        "item": "Ground turmeric",
        "shoppingItem": "Ground turmeric",
        "quantity": "1.5 g (Caribbean curry; dry)"
      },
      {
        "item": "Ground coriander seed",
        "shoppingItem": "Ground coriander seed",
        "quantity": "2 g (Caribbean curry; dry)"
      },
      {
        "item": "Ground cumin",
        "shoppingItem": "Ground cumin",
        "quantity": "1 g (Caribbean curry; dry)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "20 g (Caribbean curry; as sold, weighed grams)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "200 g (Caribbean curry; weighed recipe water)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.8 g (Caribbean curry; dry)"
      },
      {
        "item": "White basmati rice",
        "shoppingItem": "White basmati rice",
        "quantity": "105 g (rice; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "189 g (rice; weighed recipe water)"
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
      }
    ],
    "method": [
  "Weigh the ingredients for one serving before starting. Keep any amounts for the dough, filling and sauce separate so that each goes into the correct part of the recipe.",
  "Mix chicken cut into 3 cm pieces with minced garlic, ginger, spring onion and chilli, thyme, allspice, turmeric, coriander, cumin and curry salt. Keep the pieces a similar size so they cook evenly. Keep any ingredients that are added later separate from those that go into the pan first. Refrigerate 30 minutes. Use the measured seasoning and sauces shown in the ingredients; do not add extra salt or a potassium-based salt substitute.",
  "Heat curry oil in a heavy casserole. Add seasoned chicken and onion wedges and cook 8-10 minutes, turning until coloured; lower heat if spices catch. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food.",
  "Add curry water and peeled potato in 2 cm cubes. Cover and simmer gently 35-45 minutes until chicken is safely cooked and potato tender. Look for small, gentle bubbles rather than a rolling boil. Stir along the bottom when needed to prevent sticking, and keep the heat low enough for the food to cook evenly. Uncover for the last 10 minutes to thicken naturally.",
  "Cook the rice component in its measured water, oil and salt in a close-fitting saucepan: bring to a simmer, cover on the lowest heat for 12-15 minutes, then rest off the heat for 10 minutes. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork. Do not drain. Keep the complete cooked rice for this serving.",
  "Serve all the chicken, potatoes, sauce and rice as one serving. The individual curry spices define this Caribbean-style blend; no commercial curry powder or hidden stock cube is included.",
  "Check the centre of the meat with a clean food thermometer: it should reach 75°C for at least 30 seconds. Do not wash raw poultry, and use clean utensils for the cooked food."
],
    "nutrition": {
      "calories": "979 kcal",
      "protein": "55.6 g",
      "carbohydrates": "113.3 g",
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
    "id": "jollof-style-rice-with-grilled-chicken",
    "code": "D077",
    "category": "Dinner",
    "mealFamily": "jollof-chicken",
    "cuisine": "nigerian",
    "emoji": "🍽️",
    "image": "/images/recipes/D077.webp",
    "name": "Jollof-style rice with grilled chicken",
    "description": "Rice cooked in a rich tomato and pepper sauce, served with grilled paprika and ginger chicken.",
    "cookingTime": "105 mins",
    "calories": "1068 kcal",
    "protein": "57.5 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "White basmati rice",
        "shoppingItem": "White basmati rice",
        "quantity": "120 g (pepper base rice; dry)"
      },
      {
        "item": "Fresh tomato",
        "shoppingItem": "Fresh tomato",
        "quantity": "225 g (pepper base rice; raw edible input)"
      },
      {
        "item": "Red bell pepper",
        "shoppingItem": "Red bell pepper",
        "quantity": "130 g (pepper base rice; raw edible input)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "90 g (pepper base rice; raw edible input)"
      },
      {
        "item": "Tomato puree",
        "shoppingItem": "Tomato puree",
        "quantity": "30 g (pepper base rice; as sold)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "7 g (pepper base rice; raw edible input)"
      },
      {
        "item": "Fresh ginger",
        "shoppingItem": "Fresh ginger",
        "quantity": "9 g (pepper base rice; raw edible input)"
      },
      {
        "item": "Fresh red chilli flesh",
        "shoppingItem": "Fresh red chilli flesh",
        "quantity": "5 g (pepper base rice; raw edible input)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "22.5 g (pepper base rice; as sold, weighed grams)"
      },
      {
        "item": "Dried thyme",
        "shoppingItem": "Dried thyme",
        "quantity": "0.75 g (pepper base rice; dry)"
      },
      {
        "item": "Ground cumin",
        "shoppingItem": "Ground cumin",
        "quantity": "0.5 g (pepper base rice; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "150 g (pepper base rice; weighed recipe water)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.9 g (pepper base rice; dry)"
      },
      {
        "item": "Skinless boneless chicken thigh",
        "shoppingItem": "Skinless boneless chicken thigh",
        "quantity": "200 g (grilled chicken; raw edible input)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "10 g (grilled chicken; as sold, weighed grams)"
      },
      {
        "item": "Sweet paprika",
        "shoppingItem": "Sweet paprika",
        "quantity": "1.5 g (grilled chicken; dry)"
      },
      {
        "item": "Fresh ginger",
        "shoppingItem": "Fresh ginger",
        "quantity": "5 g (grilled chicken; raw edible input)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "4 g (grilled chicken; raw edible input)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.4 g (grilled chicken; dry)"
      }
    ],
    "method": [
  "Weigh the ingredients for one serving before starting. Keep any amounts for the dough, filling and sauce separate so that each goes into the correct part of the recipe.",
  "Blend tomato, red pepper, half the onion, garlic, ginger and chilli into a coarse puree without straining. Slice the remaining onion. Keep the pieces a similar size so they cook evenly. Keep any ingredients that are added later separate from those that go into the pan first.",
  "Cook sliced onion in rice oil for 8 minutes. Stir around the base and edges of the pan. The vegetables should soften and lose their raw bite; lower the heat if they start to darken before they are tender. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork. Use the measured seasoning and sauces shown in the ingredients; do not add extra salt or a potassium-based salt substitute.",
  "Add tomato puree and fry 4 minutes; add blended peppers and tomatoes, thyme and cumin. Reduce uncovered 20-30 minutes, stirring, until the base is thick and its raw taste has gone.",
  "Stir rice into the reduced base, add listed water and rice salt, cover tightly and simmer on the lowest heat for 25-30 minutes. Check grains for tenderness; record any extra weighed water. Rest covered 10 minutes and fluff without scraping burnt material into the rice. Use a fork or broad spoon and a light lifting motion so the grains stay separate. Work gently from the bottom of the bowl without pressing or mashing the grains.",
  "Coat chicken with its oil, paprika, grated ginger, garlic and salt. Roast at 220 C conventional or 200 C fan for 25-30 minutes, finishing briefly under the grill for char, and check safe doneness.",
  "Serve all the jollof-style rice and chicken with its safely cooked juices as one serving. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food. Chicken cooks separately; no unmeasured bone broth or seasoning cube is added.",
  "Check the centre of the meat with a clean food thermometer: it should reach 75°C for at least 30 seconds. Do not wash raw poultry, and use clean utensils for the cooked food."
],
    "nutrition": {
      "calories": "1068 kcal",
      "protein": "57.5 g",
      "carbohydrates": "118.2 g",
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
    "id": "light-chicken-stew-with-seasoned-rice",
    "code": "D078",
    "category": "Dinner",
    "mealFamily": "ghanaian-stew-rice",
    "cuisine": "ghanaian",
    "emoji": "🍽️",
    "image": "/images/recipes/D078.webp",
    "name": "Light chicken stew with seasoned rice",
    "description": "Ginger-spiced chicken in a tomato sauce, served with rice seasoned with onion and ginger.",
    "cookingTime": "105 mins",
    "calories": "969 kcal",
    "protein": "54.8 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Skinless boneless chicken thigh",
        "shoppingItem": "Skinless boneless chicken thigh",
        "quantity": "200 g (light stew; raw edible input)"
      },
      {
        "item": "Fresh tomato",
        "shoppingItem": "Fresh tomato",
        "quantity": "250 g (light stew; raw edible input)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "100 g (light stew; raw edible input)"
      },
      {
        "item": "Fresh ginger",
        "shoppingItem": "Fresh ginger",
        "quantity": "14 g (light stew; raw edible input)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "7 g (light stew; raw edible input)"
      },
      {
        "item": "Fresh green chilli flesh",
        "shoppingItem": "Fresh green chilli flesh",
        "quantity": "3 g (light stew; raw edible input)"
      },
      {
        "item": "Ground coriander seed",
        "shoppingItem": "Ground coriander seed",
        "quantity": "1 g (light stew; dry)"
      },
      {
        "item": "Ground black pepper",
        "shoppingItem": "Ground black pepper",
        "quantity": "0.5 g (light stew; dry)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "20 g (light stew; as sold, weighed grams)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "150 g (light stew; weighed recipe water)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.8 g (light stew; dry)"
      },
      {
        "item": "White basmati rice",
        "shoppingItem": "White basmati rice",
        "quantity": "115 g (seasoned rice; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "207 g (seasoned rice; weighed recipe water)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "30 g (seasoned rice; raw edible input)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "7.5 g (seasoned rice; as sold, weighed grams)"
      },
      {
        "item": "Fresh ginger",
        "shoppingItem": "Fresh ginger",
        "quantity": "4 g (seasoned rice; raw edible input)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.3 g (seasoned rice; dry)"
      }
    ],
    "method": [
  "Weigh the ingredients for one serving before starting. Keep any amounts for the dough, filling and sauce separate so that each goes into the correct part of the recipe.",
  "Blend tomato, half the stew onion, ginger, garlic and chilli. Slice the remaining stew onion. Keep the pieces a similar size so they cook evenly. Keep any ingredients that are added later separate from those that go into the pan first. Brown chicken gently in half the stew oil for 6 minutes, then set aside with its juices.",
  "Soften sliced onion in remaining stew oil for 8 minutes. Stir around the base and edges of the pan. The vegetables should soften and lose their raw bite; lower the heat if they start to darken before they are tender. Add blended vegetables and cook uncovered 25-30 minutes until the raw tomato flavour mellows; this is a light-textured Ghanaian-inspired stew, not a claim of low energy. Use the measured seasoning and sauces shown in the ingredients; do not add extra salt or a potassium-based salt substitute.",
  "Return chicken and juices with coriander, pepper, stew salt and listed stew water. Cover and simmer 25-30 minutes until chicken is tender and safely cooked. Look for small, gentle bubbles rather than a rolling boil. Stir along the bottom when needed to prevent sticking, and keep the heat low enough for the food to cook evenly. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds.",
  "Check more than one piece if their sizes differ, and use clean utensils for the cooked food. Keep a looser sauce than jollof base.",
  "For seasoned rice, soften its finely chopped onion and ginger in 7.5 g oil for 5 minutes. Add rice, rice water and rice salt, cover and simmer 12-15 minutes, then rest 10 minutes.",
  "Serve all the separate seasoned rice and stew as one serving. No step cooks rice in the tomato base, preserving its distinction from D077.",
  "Check the centre of the meat with a clean food thermometer: it should reach 75°C for at least 30 seconds. Do not wash raw poultry, and use clean utensils for the cooked food."
],
    "nutrition": {
      "calories": "969 kcal",
      "protein": "54.8 g",
      "carbohydrates": "107.9 g",
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
    "id": "homemade-chicken-and-spinach-cannelloni",
    "code": "D079",
    "category": "Dinner",
    "mealFamily": "cannelloni",
    "cuisine": "italian",
    "emoji": "🍽️",
    "image": "/images/recipes/D079.webp",
    "name": "Homemade chicken and spinach cannelloni",
    "description": "Chicken, spinach and ricotta cannelloni baked with tomato sauce, creamy white sauce and Parmesan.",
    "cookingTime": "110 mins",
    "calories": "1267 kcal",
    "protein": "83.9 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Skinless boneless chicken breast",
        "shoppingItem": "Skinless boneless chicken breast",
        "quantity": "180 g (filling; raw edible input)"
      },
      {
        "item": "Baby spinach",
        "shoppingItem": "Baby spinach",
        "quantity": "130 g (filling; raw edible input)"
      },
      {
        "item": "Ricotta",
        "shoppingItem": "Ricotta",
        "quantity": "75 g (filling; as sold)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "60 g (filling; raw edible input)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "7 g (filling; raw edible input)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "12.5 g (filling; as sold, weighed grams)"
      },
      {
        "item": "Ground nutmeg",
        "shoppingItem": "Ground nutmeg",
        "quantity": "0.25 g (filling; dry)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.5 g (filling; dry)"
      },
      {
        "item": "Canned tomatoes including juice",
        "shoppingItem": "Canned tomatoes including juice",
        "quantity": "225 g (tomato sauce; as sold, whole contents)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "4 g (tomato sauce; raw edible input)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "9 g (tomato sauce; as sold, weighed grams)"
      },
      {
        "item": "Fresh basil",
        "shoppingItem": "Fresh basil",
        "quantity": "7.5 g (tomato sauce; raw edible input)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.3 g (tomato sauce; dry)"
      },
      {
        "item": "Whole milk",
        "shoppingItem": "Whole milk",
        "quantity": "160 g (white sauce; as sold, weighed grams)"
      },
      {
        "item": "Plain white flour",
        "shoppingItem": "Plain white flour",
        "quantity": "12.5 g (white sauce; dry)"
      },
      {
        "item": "Unsalted butter",
        "shoppingItem": "Unsalted butter",
        "quantity": "12.5 g (white sauce; as sold)"
      },
      {
        "item": "Ground black pepper",
        "shoppingItem": "Ground black pepper",
        "quantity": "0.25 g (white sauce; dry)"
      },
      {
        "item": "Dry cannelloni tubes",
        "shoppingItem": "Dry cannelloni tubes",
        "quantity": "100 g (assembly; dry)"
      },
      {
        "item": "Parmesan",
        "shoppingItem": "Parmesan",
        "quantity": "22.5 g (assembly; as sold)"
      }
    ],
    "method": [
  "Weigh the ingredients for one serving before starting. Keep any amounts for the dough, filling and sauce separate so that each goes into the correct part of the recipe.",
  "Use 100 g dry cannelloni tubes that are labelled for filling without precooking. Mince chicken, chop spinach and onion, and crush filling garlic. Keep the pieces a similar size so they cook evenly. Keep any ingredients that are added later separate from those that go into the pan first. Soften onion in filling oil 7 minutes, then cook chicken and garlic until safely cooked. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food.",
  "Add spinach and cook until wilted, keeping its liquid in the filling. Reduce until thick, cool until no longer steaming, then fold in ricotta, nutmeg and filling salt. Use the measured seasoning and sauces shown in the ingredients; do not add extra salt or a potassium-based salt substitute.",
  "Simmer all tomato sauce ingredients, keeping basil for the final minute, for 15 minutes. Look for small, gentle bubbles rather than a rolling boil. Stir along the bottom when needed to prevent sticking, and keep the heat low enough for the food to cook evenly. Make white sauce by melting butter, stirring in flour for 1 minute, then gradually whisking in milk; simmer 4 minutes and add pepper.",
  "Heat oven to 200 C conventional or 180 C fan. Put one third of tomato sauce in a deep 14 cm baking dish. Choose a dish that holds this portion without spreading it into a very thin layer. Arrange it evenly, so the centre and edges heat through at a similar rate. Fill all cannelloni, arrange snugly, cover with remaining tomato sauce and white sauce and finish with grated Parmesan.",
  "Cover and bake 30 minutes, then uncover for 10-15 minutes until pasta is tender and the centre piping hot. Put the dish or tray on a stable oven shelf and begin checking towards the end of the stated time. Check the centre as well as the surface; a browned top alone does not show that the inside is cooked. Rest 10 minutes and serve the whole dish as one serving. Tube absorption, not a raw-to-cooked pasta factor, determines the practical final yield.",
  "Check the centre of the meat with a clean food thermometer: it should reach 75°C for at least 30 seconds. Do not wash raw poultry, and use clean utensils for the cooked food."
],
    "nutrition": {
      "calories": "1267 kcal",
      "protein": "83.9 g",
      "carbohydrates": "102.4 g",
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
    "id": "chicken-and-pepper-paella",
    "code": "D080",
    "category": "Dinner",
    "mealFamily": "paella",
    "cuisine": "spanish",
    "emoji": "🍽️",
    "image": "/images/recipes/D080.webp",
    "name": "Chicken and pepper paella",
    "description": "Saffron rice cooked with chicken, peppers, green beans and tomatoes, finished with lemon and parsley.",
    "cookingTime": "80 mins",
    "calories": "1003 kcal",
    "protein": "56.0 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Skinless boneless chicken thigh",
        "shoppingItem": "Skinless boneless chicken thigh",
        "quantity": "210 g (paella; raw edible input)"
      },
      {
        "item": "White short-grain rice",
        "shoppingItem": "White short-grain rice",
        "quantity": "120 g (paella; dry)"
      },
      {
        "item": "Red bell pepper",
        "shoppingItem": "Red bell pepper",
        "quantity": "110 g (paella; raw edible input)"
      },
      {
        "item": "Green beans",
        "shoppingItem": "Green beans",
        "quantity": "100 g (paella; raw edible input)"
      },
      {
        "item": "Fresh tomato",
        "shoppingItem": "Fresh tomato",
        "quantity": "120 g (paella; raw edible input)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "65 g (paella; raw edible input)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "8 g (paella; raw edible input)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "27.5 g (paella; as sold, weighed grams)"
      },
      {
        "item": "Sweet paprika",
        "shoppingItem": "Sweet paprika",
        "quantity": "2 g (paella; dry)"
      },
      {
        "item": "Saffron",
        "shoppingItem": "Saffron",
        "quantity": "0.1 g (paella; dry)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "350 g (paella; weighed recipe water)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "1 g (paella; dry)"
      },
      {
        "item": "Fresh lemon juice",
        "shoppingItem": "Fresh lemon juice",
        "quantity": "17.5 g (paella; freshly squeezed, weighed grams)"
      },
      {
        "item": "Fresh parsley",
        "shoppingItem": "Fresh parsley",
        "quantity": "7.5 g (paella; raw edible input)"
      }
    ],
    "method": [
  "Weigh the ingredients for one serving before starting. Keep any amounts for the dough, filling and sauce separate so that each goes into the correct part of the recipe.",
  "Steep saffron in 25 g of the 350 g listed water. Cut chicken into 3 cm pieces and vegetables into bite-size pieces. Keep the pieces a similar size so they cook evenly. Keep any ingredients that are added later separate from those that go into the pan first. Use a 22 cm wide heavy shallow pan with a broad heat source.",
  "Brown chicken in 15 g oil for 6-8 minutes; remove with its juices. Add remaining 12.5 g oil and soften onion and pepper 8 minutes. Stir around the base and edges of the pan. The vegetables should soften and lose their raw bite; lower the heat if they start to darken before they are tender. Add garlic, tomato and paprika and reduce 8-10 minutes to a thick sofrito. Use the measured seasoning and sauces shown in the ingredients; do not add extra salt or a potassium-based salt substitute.",
  "Add rice and stir 1 minute. Return chicken and juices, add beans, saffron infusion, remaining 325 g water and salt, then distribute evenly. Simmer moderately 8 minutes, then gently 10-15 minutes without stirring; check chicken is safely cooked and rice tender. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food.",
  "If necessary add only additional weighed boiling water as a recorded practical revision. Rest off heat 8 minutes. Scatter parsley and drizzle the measured lemon juice across the surface.",
  "Serve all the rice, chicken, vegetables and pan juices on one plate. This chicken-and-pepper adaptation uses water enriched by retained chicken juices, not an unquantified commercial stock.",
  "Check the centre of the meat with a clean food thermometer: it should reach 75°C for at least 30 seconds. Do not wash raw poultry, and use clean utensils for the cooked food."
],
    "nutrition": {
      "calories": "1003 kcal",
      "protein": "56.0 g",
      "carbohydrates": "112.0 g",
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
    "id": "chicken-and-mushroom-puff-pastry-pie",
    "code": "D081",
    "category": "Dinner",
    "mealFamily": "pastry-pie",
    "cuisine": "french",
    "emoji": "🍽️",
    "image": "/images/recipes/D081.webp",
    "name": "Chicken and mushroom puff-pastry pie",
    "description": "Tender chicken and mushrooms in a creamy thyme sauce, baked under a golden puff-pastry lid.",
    "cookingTime": "105 mins",
    "calories": "1161 kcal",
    "protein": "67.1 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Skinless boneless chicken breast",
        "shoppingItem": "Skinless boneless chicken breast",
        "quantity": "200 g (filling; raw edible input)"
      },
      {
        "item": "White mushrooms",
        "shoppingItem": "White mushrooms",
        "quantity": "150 g (filling; raw edible input)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "80 g (filling; raw edible input)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "6 g (filling; raw edible input)"
      },
      {
        "item": "Olive oil",
        "shoppingItem": "Olive oil",
        "quantity": "12.5 g (filling; as sold, weighed grams)"
      },
      {
        "item": "Unsalted butter",
        "shoppingItem": "Unsalted butter",
        "quantity": "10 g (filling; as sold)"
      },
      {
        "item": "Plain white flour",
        "shoppingItem": "Plain white flour",
        "quantity": "15 g (filling; dry)"
      },
      {
        "item": "Whole milk",
        "shoppingItem": "Whole milk",
        "quantity": "125 g (filling; as sold, weighed grams)"
      },
      {
        "item": "Single cream",
        "shoppingItem": "Single cream",
        "quantity": "50 g (filling; as sold, weighed grams)"
      },
      {
        "item": "Dried thyme",
        "shoppingItem": "Dried thyme",
        "quantity": "0.75 g (filling; dry)"
      },
      {
        "item": "Ground black pepper",
        "shoppingItem": "Ground black pepper",
        "quantity": "0.35 g (filling; dry)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.75 g (filling; dry)"
      },
      {
        "item": "Puff pastry",
        "shoppingItem": "Puff pastry",
        "quantity": "120 g (pastry lid; uncooked as sold)"
      },
      {
        "item": "Whole egg, shell removed",
        "shoppingItem": "Whole egg, shell removed",
        "quantity": "20 g (pastry lid; raw edible input)"
      }
    ],
    "method": [
  "Weigh the ingredients for one serving before starting. Keep any amounts for the dough, filling and sauce separate so that each goes into the correct part of the recipe.",
  "Use uncooked retail puff pastry, not cooked pastry weight. Cut chicken into 2 cm pieces and slice mushrooms and onion. Keep the pieces a similar size so they cook evenly. Keep any ingredients that are added later separate from those that go into the pan first. Heat oil and filling butter in a wide saucepan; soften onion 7 minutes. Stir around the base and edges of the pan. The vegetables should soften and lose their raw bite; lower the heat if they start to darken before they are tender. Use the measured seasoning and sauces shown in the ingredients; do not add extra salt or a potassium-based salt substitute.",
  "Add chicken and mushrooms and cook 10-12 minutes until chicken is safely cooked and released mushroom liquid has reduced. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food. Add garlic, thyme and flour; stir 1 minute, then gradually add milk and cream. Simmer 5 minutes, season and cool the thick filling until it stops steaming.",
  "Look for small, gentle bubbles rather than a rolling boil. Stir along the bottom when needed to prevent sticking, and keep the heat low enough for the food to cook evenly.",
  "Heat oven to 210 C conventional or 190 C fan. Transfer filling to a 14 cm deep pie dish. Roll pastry between baking paper to cover the dish without added flour. Lay over the filling, crimp edges and make two steam slits. Keep the food above the water rather than sitting in it, with the lid fitted so steam circulates around the portion. Check the pan does not boil dry without letting water splash onto the food.",
  "Brush all 20 g beaten egg over the lid and exposed pastry scraps; bake scraps beside the pie and include them in this serving. Put the dish or tray on a stable oven shelf and begin checking towards the end of the stated time. Check the centre as well as the surface; a browned top alone does not show that the inside is cooked. Bake 30-40 minutes until pastry is risen and cooked underneath and filling is piping hot.",
  "Rest 10 minutes and serve the whole small pie, including all the filling, lid and pastry scraps, as one serving. Product butter/vegetable-fat formulation and additive labels remain a required check.",
  "Check the centre of the meat with a clean food thermometer: it should reach 75°C for at least 30 seconds. Do not wash raw poultry, and use clean utensils for the cooked food. Cook the egg mixture until fully set."
],
    "nutrition": {
      "calories": "1161 kcal",
      "protein": "67.1 g",
      "carbohydrates": "62.5 g",
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
    "id": "paprika-pork-goulash-with-buttered-noodles",
    "code": "D082",
    "category": "Dinner",
    "mealFamily": "goulash-noodles",
    "cuisine": "hungarian",
    "emoji": "🍽️",
    "image": "/images/recipes/D082.webp",
    "name": "Paprika pork goulash with buttered noodles",
    "description": "Slow-cooked pork with paprika, onions and peppers, served with buttery egg noodles and fresh parsley.",
    "cookingTime": "145 mins",
    "calories": "1272 kcal",
    "protein": "57.5 g",
    "equipment": "0.1 g kitchen scales; knife and board; mixing bowls; pans or trays specified in method; clean food probe; metal skewers or steamer where specified",
    "ingredients": [
      {
        "item": "Boneless pork shoulder, lean and edible fat",
        "shoppingItem": "Boneless pork shoulder, lean and edible fat",
        "quantity": "210 g (goulash; raw edible input)"
      },
      {
        "item": "Onion",
        "shoppingItem": "Onion",
        "quantity": "130 g (goulash; raw edible input)"
      },
      {
        "item": "Red bell pepper",
        "shoppingItem": "Red bell pepper",
        "quantity": "110 g (goulash; raw edible input)"
      },
      {
        "item": "Fresh tomato",
        "shoppingItem": "Fresh tomato",
        "quantity": "130 g (goulash; raw edible input)"
      },
      {
        "item": "Garlic",
        "shoppingItem": "Garlic",
        "quantity": "8 g (goulash; raw edible input)"
      },
      {
        "item": "Sweet paprika",
        "shoppingItem": "Sweet paprika",
        "quantity": "7 g (goulash; dry)"
      },
      {
        "item": "Caraway seed, freshly crushed",
        "shoppingItem": "Caraway seed, freshly crushed",
        "quantity": "1 g (goulash; dry)"
      },
      {
        "item": "Rapeseed oil",
        "shoppingItem": "Rapeseed oil",
        "quantity": "17.5 g (goulash; as sold, weighed grams)"
      },
      {
        "item": "Water",
        "shoppingItem": "Water",
        "quantity": "175 g (goulash; weighed recipe water)"
      },
      {
        "item": "Table salt",
        "shoppingItem": "Table salt",
        "quantity": "0.85 g (goulash; dry)"
      },
      {
        "item": "Ground black pepper",
        "shoppingItem": "Ground black pepper",
        "quantity": "0.3 g (goulash; dry)"
      },
      {
        "item": "Dried egg noodles",
        "shoppingItem": "Dried egg noodles",
        "quantity": "120 g (buttered noodles; dry)"
      },
      {
        "item": "Unsalted butter",
        "shoppingItem": "Unsalted butter",
        "quantity": "17.5 g (buttered noodles; as sold)"
      },
      {
        "item": "Fresh parsley",
        "shoppingItem": "Fresh parsley",
        "quantity": "9 g (buttered noodles; raw edible input)"
      }
    ],
    "method": [
  "Weigh the ingredients for one serving before starting. Keep any amounts for the dough, filling and sauce separate so that each goes into the correct part of the recipe.",
  "Cut boneless pork shoulder into 3 cm cubes and slice onion finely. Keep the pieces a similar size so they cook evenly. Keep any ingredients that are added later separate from those that go into the pan first. Heat goulash oil and brown pork in batches; retain juices. Soften onion in the same pan for 12-15 minutes. Stir around the base and edges of the pan. The vegetables should soften and lose their raw bite; lower the heat if they start to darken before they are tender. Use the measured seasoning and sauces shown in the ingredients; do not add extra salt or a potassium-based salt substitute.",
  "Remove the pan from direct heat, stir in sweet Hungarian paprika and crushed caraway, then add garlic, chopped tomato and pepper. Return pork and juices, add listed goulash water, salt and black pepper and bring gently to a simmer. Look for small, gentle bubbles rather than a rolling boil. Stir along the bottom when needed to prevent sticking, and keep the heat low enough for the food to cook evenly.",
  "Cover and braise gently for 75-100 minutes until pork is tender and safely cooked, stirring every 20 minutes. Keep a thick stew rather than soup; record extra weighed water if required.",
  "Cook dry egg noodles in 900 g unsalted process water according to their packet and drain. Separate the pasta or noodles as they soften so they do not stick together. Check the texture towards the end of the cooking time; it should be tender with no chalky centre. Toss immediately with all butter and chopped parsley.",
  "Serve all the pork, paprika-onion sauce and buttered noodles as one serving. The paprika is warmed off direct high heat to preserve flavour without bitterness.",
  "Check the centre of the meat with a clean food thermometer: it should reach 75°C for at least 30 seconds. Cook the egg mixture until fully set."
],
    "nutrition": {
      "calories": "1272 kcal",
      "protein": "57.5 g",
      "carbohydrates": "101.2 g",
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
  "id": "roasted-pepper-and-white-bean-lasagne",
  "code": "D083",
  "category": "Dinner",
  "cuisine": "Italy",
  "mealFamily": "pasta",
  "emoji": "🍽️",
  "image": "/images/recipes/D083.webp",
  "name": "Roasted pepper and white-bean lasagne",
  "description": "Lasagne layered with white beans, roasted peppers, ricotta and a walnut topping.",
  "cookingTime": "55 mins",
  "calories": "717 kcal",
  "protein": "23.2 g",
  "equipment": "Kitchen scales, knife, chopping board, mixing bowl, saucepan or frying pan, oven, baking dish or tray",
  "ingredients": [
    {
      "item": "Egg-free plain dried white wheat pasta",
      "shoppingItem": "Egg-free plain dried white wheat pasta",
      "quantity": "45 g (dry)"
    },
    {
      "item": "Navy beans, boiled without salt and drained",
      "shoppingItem": "Navy beans, boiled without salt and drained",
      "quantity": "100 g (cooked drained edible weight)"
    },
    {
      "item": "Red bell pepper",
      "shoppingItem": "Red bell pepper",
      "quantity": "75 g (raw edible input)"
    },
    {
      "item": "Onion",
      "shoppingItem": "Onion",
      "quantity": "20 g (raw edible input)"
    },
    {
      "item": "Vegetarian-rennet ricotta",
      "shoppingItem": "Vegetarian-rennet ricotta",
      "quantity": "55 g (as sold)"
    },
    {
      "item": "Whole milk",
      "shoppingItem": "Whole milk",
      "quantity": "45 g (as sold, weighed grams)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "22 g (as sold, weighed grams)"
    },
    {
      "item": "Plain white flour",
      "shoppingItem": "Plain white flour",
      "quantity": "6 g (dry)"
    },
    {
      "item": "Unsalted walnut kernels",
      "shoppingItem": "Unsalted walnut kernels",
      "quantity": "10 g (as sold edible weight)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "65 g (weighed grams)"
    },
    {
      "item": "Fresh basil",
      "shoppingItem": "Fresh basil",
      "quantity": "6 g (raw edible input)"
    },
    {
      "item": "Garlic",
      "shoppingItem": "Garlic",
      "quantity": "2 g (raw edible input)"
    },
    {
      "item": "Ground black pepper",
      "shoppingItem": "Ground black pepper",
      "quantity": "0.2 g (dry)"
    }
  ],
  "method": [
  "Heat the oven to 200°C, or 180°C fan. Finely dice the pepper and onion. Keep the pieces a similar size so they cook evenly. Keep any ingredients that are added later separate from those that go into the pan first. Cook in half the oil for 8 minutes. Add crushed garlic, cooked drained navy beans and 20 g of the measured water and simmer for 3 minutes. Look for small, gentle bubbles rather than a rolling boil. Use the measured seasoning and sauces shown in the ingredients; do not add extra salt or a potassium-based salt substitute.",
  "Stir along the bottom when needed to prevent sticking, and keep the heat low enough for the food to cook evenly. Mash some beans to thicken.",
  "In a small pan, stir the flour into one quarter of the oil. Gradually whisk in the milk and remaining 45 g water. Simmer for 3 minutes, then stir in the ricotta, chopped basil and pepper.",
  "Use no-preboil dry white lasagne sheets. Layer all the beans, pasta and sauce in a small baking dish, with sauce covering every pasta edge. Chop the walnuts and mix with the remaining oil for the topping. Keep the nuts together on the board and chop to a similar size. Leave some texture where the recipe uses them as a topping, rather than turning them into a smooth paste.",
  "Cover tightly and bake for 30 minutes. Put the dish or tray on a stable oven shelf and begin checking towards the end of the stated time. Check the centre as well as the surface; a browned top alone does not show that the inside is cooked. Uncover, scatter over all the walnut topping and bake for another 8–10 minutes until the pasta is tender and the centre is steaming hot. Rest for 5 minutes and serve the whole bake.",
  "Use vegetarian-rennet cheese for the vegetarian version specified here."
],
  "nutrition": {
    "calories": "717 kcal",
    "protein": "23.2 g",
    "carbohydrates": "59.7 g",
    "fat": "38.2 g",
    "fibre": "15.1 g",
    "sodium": "80 mg",
    "potassium": "903 mg",
    "phosphate": "434 mg",
    "salt": "0.20 g"
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
    "Intermittent fasting — eating-window meal"
  ]
},
{
  "id": "turkey-and-leek-pie-with-walnut-pastry",
  "code": "D084",
  "category": "Dinner",
  "cuisine": "Britain",
  "mealFamily": "pie",
  "emoji": "🍽️",
  "image": "/images/recipes/D084.webp",
  "name": "Turkey and leek pie with walnut pastry",
  "description": "A turkey and leek filling under a crisp, crumbly walnut pastry lid.",
  "cookingTime": "55 mins",
  "calories": "706 kcal",
  "protein": "34.6 g",
  "equipment": "Kitchen scales, knife, chopping board, mixing bowl, saucepan or frying pan, oven, baking dish or tray, food thermometer",
  "ingredients": [
    {
      "item": "Plain white flour",
      "shoppingItem": "Plain white flour",
      "quantity": "50 g (dry)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "28 g (as sold, weighed grams)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "110 g (weighed grams)"
    },
    {
      "item": "Skinless turkey breast",
      "shoppingItem": "Skinless turkey breast",
      "quantity": "100 g (raw edible input)"
    },
    {
      "item": "Leek, trimmed edible portion",
      "shoppingItem": "Leek, trimmed edible portion",
      "quantity": "55 g (raw edible input)"
    },
    {
      "item": "Carrot",
      "shoppingItem": "Carrot",
      "quantity": "35 g (raw edible input)"
    },
    {
      "item": "Whole milk",
      "shoppingItem": "Whole milk",
      "quantity": "65 g (as sold, weighed grams)"
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
      "item": "Fresh parsley",
      "shoppingItem": "Fresh parsley",
      "quantity": "6 g (raw edible input)"
    },
    {
      "item": "Ground black pepper",
      "shoppingItem": "Ground black pepper",
      "quantity": "0.2 g (dry)"
    }
  ],
  "method": [
  "Heat the oven to 200°C, or 180°C fan. Grind the walnuts finely. Keep the nuts together on the board and chop to a similar size. Leave some texture where the recipe uses them as a topping, rather than turning them into a smooth paste. Mix with 45 g of the flour, 17 g of the oil and 20 g of the water to make a dough. Scrape dry patches from the bowl into the mixture and work them in with your hands. Use the listed herbs, spices or citrus for flavour before considering any extra seasoning.",
  "Keep to the measured dry ingredients and liquid; unmeasured additions change the portion and can make the dough tough. Cover and rest while making the filling.",
  "Dice the turkey and slice the leek and carrot thinly. Keep the pieces a similar size so they cook evenly. Keep any ingredients that are added later separate from those that go into the pan first. Cook in the remaining 11 g oil for 5 minutes. Stir in the remaining 5 g flour and thyme, then gradually add the milk and remaining 90 g water. Simmer for 8–10 minutes until the vegetables are tender and the sauce thickens.",
  "Look for small, gentle bubbles rather than a rolling boil. Stir along the bottom when needed to prevent sticking, and keep the heat low enough for the food to cook evenly.",
  "Stir in the parsley and pepper and transfer all the filling and sauce to a small pie dish. Roll the pastry between non-stick sheets without extra flour and place over the top. Make a steam slit. Keep the food above the water rather than sitting in it, with the lid fitted so steam circulates around the portion. Check the pan does not boil dry without letting water splash onto the food.",
  "Bake for 25–30 minutes until the pastry is cooked and the centre of the turkey filling reaches 75°C for 30 seconds. Put the dish or tray on a stable oven shelf and begin checking towards the end of the stated time. Check the centre as well as the surface; a browned top alone does not show that the inside is cooked. Serve the whole pie."
],
  "nutrition": {
    "calories": "706 kcal",
    "protein": "34.6 g",
    "carbohydrates": "45.4 g",
    "fat": "42.5 g",
    "fibre": "6.4 g",
    "sodium": "96 mg",
    "potassium": "859 mg",
    "phosphate": "430 mg",
    "salt": "0.24 g"
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
    "Mediterranean-style",
    "Intermittent fasting — eating-window meal"
  ]
},
{
  "id": "cod-and-parsley-cakes-with-warm-rice-salad",
  "code": "D085",
  "category": "Dinner",
  "cuisine": "Britain",
  "mealFamily": "cakes",
  "emoji": "🍽️",
  "image": "/images/recipes/D085.webp",
  "name": "Cod and parsley cakes with warm rice salad",
  "description": "Cod and parsley cakes with warm rice, a creamy cabbage salad and chopped walnuts.",
  "cookingTime": "40 mins",
  "calories": "686 kcal",
  "protein": "29.6 g",
  "equipment": "Kitchen scales, knife, chopping board, mixing bowl, saucepan or frying pan",
  "ingredients": [
    {
      "item": "Cod fillet, flesh only",
      "shoppingItem": "Cod fillet, flesh only",
      "quantity": "100 g (raw edible input)"
    },
    {
      "item": "White rice flour",
      "shoppingItem": "White rice flour",
      "quantity": "20 g (dry edible input)"
    },
    {
      "item": "Fresh raw egg white, separated from shell eggs",
      "shoppingItem": "Fresh raw egg white, separated from shell eggs",
      "quantity": "45 g (raw edible input)"
    },
    {
      "item": "White basmati rice",
      "shoppingItem": "White basmati rice",
      "quantity": "35 g (dry)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "22 g (as sold, weighed grams)"
    },
    {
      "item": "Standard mayonnaise",
      "shoppingItem": "Standard mayonnaise",
      "quantity": "15 g (as sold)"
    },
    {
      "item": "White cabbage",
      "shoppingItem": "White cabbage",
      "quantity": "65 g (raw edible input)"
    },
    {
      "item": "Cucumber",
      "shoppingItem": "Cucumber",
      "quantity": "45 g (raw edible input)"
    },
    {
      "item": "Unsalted walnut kernels",
      "shoppingItem": "Unsalted walnut kernels",
      "quantity": "10 g (as sold edible weight)"
    },
    {
      "item": "Fresh lemon juice",
      "shoppingItem": "Fresh lemon juice",
      "quantity": "20 g (freshly squeezed, weighed grams)"
    },
    {
      "item": "Fresh parsley",
      "shoppingItem": "Fresh parsley",
      "quantity": "7 g (raw edible input)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "100 g (weighed grams)"
    },
    {
      "item": "Ground black pepper",
      "shoppingItem": "Ground black pepper",
      "quantity": "0.2 g (dry)"
    }
  ],
  "method": [
  "Cook the rice with 70 g of the measured water, covered, for 12–15 minutes. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork. Rest for 5 minutes.",
  "Finely chop or pulse the cod. Mix with the egg white, rice flour, half the parsley, half the lemon juice and pepper. Mix until the added ingredients are evenly distributed. Scrape around the sides of the bowl or pan as appropriate, so the measured mixture is used throughout the serving. Form four thin cakes. Use the listed herbs, spices or citrus for flavour before considering any extra seasoning.",
  "Heat three quarters of the oil in a non-stick pan. Let the pan warm before the food goes in. If the oil begins to smoke or the food catches immediately, lower the heat before continuing. Cook the cakes for 4–5 minutes per side until fully set, opaque and steaming hot in the centres. Leave space between the portions and let the underside set before moving them. Slide a thin spatula underneath and turn carefully, keeping each portion together.",
  "Mix the mayonnaise, remaining oil, remaining lemon juice and remaining 30 g water. Toss with the shredded cabbage, sliced cucumber, remaining parsley and walnuts. Serve all the cakes with all the rice and salad."
],
  "nutrition": {
    "calories": "686 kcal",
    "protein": "29.6 g",
    "carbohydrates": "46.1 g",
    "fat": "41.4 g",
    "fibre": "4.1 g",
    "sodium": "209 mg",
    "potassium": "809 mg",
    "phosphate": "308 mg",
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
  "primaryDietCategory": "Mediterranean-style",
  "dietCategories": [
    "Mediterranean-style",
    "Intermittent fasting — eating-window meal"
  ]
},
{
  "id": "vegetable-and-chickpea-tagine-with-almond-couscous",
  "code": "D086",
  "category": "Dinner",
  "cuisine": "Morocco",
  "mealFamily": "stew",
  "emoji": "🍽️",
  "image": "/images/recipes/D086.webp",
  "name": "Vegetable and chickpea tagine with almond couscous",
  "description": "A fragrant chickpea and vegetable tagine with lemony almond couscous.",
  "cookingTime": "40 mins",
  "calories": "647 kcal",
  "protein": "16.5 g",
  "equipment": "Kitchen scales, knife, chopping board, mixing bowl, saucepan or frying pan",
  "ingredients": [
    {
      "item": "Chickpeas, boiled without salt and drained",
      "shoppingItem": "Chickpeas, boiled without salt and drained",
      "quantity": "75 g (cooked drained edible weight)"
    },
    {
      "item": "Plain couscous",
      "shoppingItem": "Plain couscous",
      "quantity": "45 g (dry)"
    },
    {
      "item": "Carrot",
      "shoppingItem": "Carrot",
      "quantity": "45 g (raw edible input)"
    },
    {
      "item": "Courgette",
      "shoppingItem": "Courgette",
      "quantity": "45 g (raw edible input)"
    },
    {
      "item": "Onion",
      "shoppingItem": "Onion",
      "quantity": "20 g (raw edible input)"
    },
    {
      "item": "Fresh tomato",
      "shoppingItem": "Fresh tomato",
      "quantity": "35 g (raw edible input)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "28 g (as sold, weighed grams)"
    },
    {
      "item": "Flaked almonds",
      "shoppingItem": "Flaked almonds",
      "quantity": "15 g (as sold)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "165 g (weighed grams)"
    },
    {
      "item": "Fresh lemon juice",
      "shoppingItem": "Fresh lemon juice",
      "quantity": "15 g (freshly squeezed, weighed grams)"
    },
    {
      "item": "Ground cumin",
      "shoppingItem": "Ground cumin",
      "quantity": "1.1 g (dry)"
    },
    {
      "item": "Ground cinnamon",
      "shoppingItem": "Ground cinnamon",
      "quantity": "0.3 g (dry)"
    },
    {
      "item": "Ground ginger",
      "shoppingItem": "Ground ginger",
      "quantity": "0.6 g (dry)"
    },
    {
      "item": "Fresh coriander leaves",
      "shoppingItem": "Fresh coriander leaves",
      "quantity": "6 g (raw edible input)"
    }
  ],
  "method": [
  "Soften the chopped onion in three fifths of the oil for 5 minutes. Stir around the base and edges of the pan. The vegetables should soften and lose their raw bite; lower the heat if they start to darken before they are tender. Add cumin, cinnamon and ginger for 30 seconds. Use the measured seasoning and sauces shown in the ingredients; do not add extra salt or a potassium-based salt substitute.",
  "Add diced carrot, courgette and tomato, cooked drained chickpeas and 65 g of the measured water. Cover and simmer for 20–25 minutes until tender. Look for small, gentle bubbles rather than a rolling boil. Stir along the bottom when needed to prevent sticking, and keep the heat low enough for the food to cook evenly.",
  "Bring the remaining 100 g water to a boil in a separate pan. Stir in the couscous, cover, turn off the heat and leave for 5–7 minutes.",
  "Fluff the couscous and fold in the remaining oil, chopped almonds and half the lemon juice. Use a fork or broad spoon and a light lifting motion so the grains stay separate. Work gently from the bottom of the bowl without pressing or mashing the grains. Add the remaining lemon juice and chopped coriander to the tagine. Serve both whole portions."
],
  "nutrition": {
    "calories": "647 kcal",
    "protein": "16.5 g",
    "carbohydrates": "54.0 g",
    "fat": "40.2 g",
    "fibre": "14.8 g",
    "sodium": "30 mg",
    "potassium": "873 mg",
    "phosphate": "343 mg",
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
    "Vegetarian",
    "Mediterranean-style",
    "Intermittent fasting — eating-window meal"
  ]
},
{
  "id": "ricotta-and-walnut-ravioli-with-basil-and-green-beans",
  "code": "D087",
  "category": "Dinner",
  "cuisine": "Italy",
  "mealFamily": "pasta",
  "emoji": "🍽️",
  "image": "/images/recipes/D087.webp",
  "name": "Ricotta and walnut ravioli with basil and green beans",
  "description": "Homemade ravioli filled with ricotta and walnuts, with basil oil and green beans.",
  "cookingTime": "60 mins",
  "calories": "664 kcal",
  "protein": "19.0 g",
  "equipment": "Kitchen scales, knife, chopping board, mixing bowl, saucepan or frying pan, steamer",
  "ingredients": [
    {
      "item": "Plain white flour",
      "shoppingItem": "Plain white flour",
      "quantity": "50 g (dry)"
    },
    {
      "item": "Whole egg, shell removed",
      "shoppingItem": "Whole egg, shell removed",
      "quantity": "30 g (raw edible input)"
    },
    {
      "item": "Vegetarian-rennet ricotta",
      "shoppingItem": "Vegetarian-rennet ricotta",
      "quantity": "65 g (as sold)"
    },
    {
      "item": "Unsalted walnut kernels",
      "shoppingItem": "Unsalted walnut kernels",
      "quantity": "20 g (as sold edible weight)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "22 g (as sold, weighed grams)"
    },
    {
      "item": "Green beans",
      "shoppingItem": "Green beans",
      "quantity": "65 g (raw edible input)"
    },
    {
      "item": "Fresh basil",
      "shoppingItem": "Fresh basil",
      "quantity": "6 g (raw edible input)"
    },
    {
      "item": "Fresh lemon juice",
      "shoppingItem": "Fresh lemon juice",
      "quantity": "15 g (freshly squeezed, weighed grams)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "15 g (weighed grams)"
    },
    {
      "item": "Ground black pepper",
      "shoppingItem": "Ground black pepper",
      "quantity": "0.2 g (dry)"
    }
  ],
  "method": [
  "Mix the flour and 30 g beaten egg into a firm dough. Scrape dry patches from the bowl into the mixture and work them in with your hands. Keep to the measured dry ingredients and liquid; unmeasured additions change the portion and can make the dough tough. Knead for 5–7 minutes, cover and rest for 15 minutes. The measured water is for the sauce, not the dough. Use the listed herbs, spices or citrus for flavour before considering any extra seasoning.",
  "Mix the ricotta with finely chopped walnuts, half the basil, half the lemon juice and black pepper. Mix until the added ingredients are evenly distributed. Scrape around the sides of the bowl or pan as appropriate, so the measured mixture is used throughout the serving. Roll the dough very thinly between non-stick sheets without extra flour. Make six large ravioli, dividing all the filling between them and pinching the edges firmly.",
  "Keep the filling away from the joining edge and press the dough surfaces directly together. Check for open gaps before cooking so that the filling stays inside.",
  "Steam the green beans for 6–8 minutes until tender. Keep the food above the water rather than sitting in it, with the lid fitted so steam circulates around the portion. Check the pan does not boil dry without letting water splash onto the food. Poach the ravioli in a separate pan of unsalted water for 4–5 minutes until the pasta and egg are cooked throughout. Lift out carefully.",
  "Warm the oil, measured water, remaining lemon juice and remaining basil gently in a pan. Turn all the ravioli and beans in the sauce and serve, including any loose filling.",
  "Use vegetarian-rennet cheese for the vegetarian version specified here."
],
  "nutrition": {
    "calories": "664 kcal",
    "protein": "19.0 g",
    "carbohydrates": "41.3 g",
    "fat": "46.5 g",
    "fibre": "5.7 g",
    "sodium": "115 mg",
    "potassium": "519 mg",
    "phosphate": "326 mg",
    "salt": "0.29 g"
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
    "Intermittent fasting — eating-window meal"
  ]
},
{
  "id": "baked-fish-with-green-rice-and-lime-slaw",
  "code": "D088",
  "category": "Dinner",
  "cuisine": "Peru",
  "mealFamily": "rice",
  "emoji": "🍽️",
  "image": "/images/recipes/D088.webp",
  "name": "Baked fish with green rice and lime slaw",
  "description": "Baked cod with coriander rice, crunchy lime slaw and avocado.",
  "cookingTime": "40 mins",
  "calories": "673 kcal",
  "protein": "26.0 g",
  "equipment": "Kitchen scales, knife, chopping board, mixing bowl, saucepan or frying pan, oven, baking dish or tray, blender",
  "ingredients": [
    {
      "item": "White basmati rice",
      "shoppingItem": "White basmati rice",
      "quantity": "50 g (dry)"
    },
    {
      "item": "Cod fillet, flesh only",
      "shoppingItem": "Cod fillet, flesh only",
      "quantity": "110 g (raw edible input)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "22 g (as sold, weighed grams)"
    },
    {
      "item": "White cabbage",
      "shoppingItem": "White cabbage",
      "quantity": "65 g (raw edible input)"
    },
    {
      "item": "Carrot",
      "shoppingItem": "Carrot",
      "quantity": "20 g (raw edible input)"
    },
    {
      "item": "Standard mayonnaise",
      "shoppingItem": "Standard mayonnaise",
      "quantity": "15 g (as sold)"
    },
    {
      "item": "Fresh coriander leaves",
      "shoppingItem": "Fresh coriander leaves",
      "quantity": "10 g (raw edible input)"
    },
    {
      "item": "Red bell pepper",
      "shoppingItem": "Red bell pepper",
      "quantity": "45 g (raw edible input)"
    },
    {
      "item": "Hass avocado flesh, skin and stone removed",
      "shoppingItem": "Hass avocado flesh, skin and stone removed",
      "quantity": "45 g (raw edible input)"
    },
    {
      "item": "Fresh lime juice",
      "shoppingItem": "Fresh lime juice",
      "quantity": "20 g (freshly squeezed, weighed grams)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "120 g (weighed grams)"
    },
    {
      "item": "Garlic",
      "shoppingItem": "Garlic",
      "quantity": "2 g (raw edible input)"
    }
  ],
  "method": [
  "Blend the pepper, coriander, garlic and all the measured water. Put in a small pan with the dry rice and half the oil. Bring to a simmer, cover and cook gently for 15–18 minutes until tender. Look for small, gentle bubbles rather than a rolling boil. Stir along the bottom when needed to prevent sticking, and keep the heat low enough for the food to cook evenly. Rest covered for 5 minutes. Use the listed herbs, spices or citrus for flavour before considering any extra seasoning.",
  "Brush the cod with one quarter of the oil and half the lime juice. Bake at 200°C, or 180°C fan, for 12–15 minutes until opaque, steaming hot and flaking easily. Put the dish or tray on a stable oven shelf and begin checking towards the end of the stated time. Check the centre as well as the surface; a browned top alone does not show that the inside is cooked.",
  "Mix the mayonnaise, remaining oil and remaining lime juice. Mix until the added ingredients are evenly distributed. Scrape around the sides of the bowl or pan as appropriate, so the measured mixture is used throughout the serving. Toss with the shredded cabbage and carrot. Serve all the fish and edible baking juices with all the green rice, slaw and weighed avocado flesh."
],
  "nutrition": {
    "calories": "673 kcal",
    "protein": "26.0 g",
    "carbohydrates": "46.4 g",
    "fat": "42.3 g",
    "fibre": "6.1 g",
    "sodium": "143 mg",
    "potassium": "1023 mg",
    "phosphate": "303 mg",
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
  "primaryDietCategory": "Mediterranean-style",
  "dietCategories": [
    "Mediterranean-style",
    "Intermittent fasting — eating-window meal"
  ]
},
{
  "id": "turkey-mushroom-and-walnut-pilaf",
  "code": "D089",
  "category": "Dinner",
  "cuisine": "Britain",
  "mealFamily": "rice",
  "emoji": "🍽️",
  "image": "/images/recipes/D089.webp",
  "name": "Turkey, mushroom and walnut pilaf",
  "description": "A one-pan turkey and mushroom rice dish with walnuts and a lemon yoghurt spooned alongside.",
  "cookingTime": "40 mins",
  "calories": "667 kcal",
  "protein": "31.9 g",
  "equipment": "Kitchen scales, knife, chopping board, mixing bowl, saucepan or frying pan, food thermometer",
  "ingredients": [
    {
      "item": "White basmati rice",
      "shoppingItem": "White basmati rice",
      "quantity": "50 g (dry)"
    },
    {
      "item": "Skinless turkey breast",
      "shoppingItem": "Skinless turkey breast",
      "quantity": "90 g (raw edible input)"
    },
    {
      "item": "Unsalted walnut kernels",
      "shoppingItem": "Unsalted walnut kernels",
      "quantity": "20 g (as sold edible weight)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "22 g (as sold, weighed grams)"
    },
    {
      "item": "White mushrooms",
      "shoppingItem": "White mushrooms",
      "quantity": "45 g (raw edible input)"
    },
    {
      "item": "Onion",
      "shoppingItem": "Onion",
      "quantity": "20 g (raw edible input)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "120 g (weighed grams)"
    },
    {
      "item": "Fresh lemon juice",
      "shoppingItem": "Fresh lemon juice",
      "quantity": "15 g (freshly squeezed, weighed grams)"
    },
    {
      "item": "Fresh parsley",
      "shoppingItem": "Fresh parsley",
      "quantity": "6 g (raw edible input)"
    },
    {
      "item": "Plain full-fat Greek-style yoghurt, about 10% fat",
      "shoppingItem": "Plain full-fat Greek-style yoghurt, about 10% fat",
      "quantity": "35 g (as sold edible weight)"
    },
    {
      "item": "Dried thyme",
      "shoppingItem": "Dried thyme",
      "quantity": "0.6 g (dry)"
    },
    {
      "item": "Ground black pepper",
      "shoppingItem": "Ground black pepper",
      "quantity": "0.2 g (dry)"
    }
  ],
  "method": [
  "Dice the turkey and finely slice the onion and mushrooms. Keep the pieces a similar size so they cook evenly. Keep any ingredients that are added later separate from those that go into the pan first. Heat the oil in a small covered pan. Cook the turkey for 3–4 minutes, then add the vegetables and thyme and cook for another 4 minutes. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food. Use the listed herbs, spices or citrus for flavour before considering any extra seasoning.",
  "Stir in the dry rice, all the measured water and pepper. Cover and simmer gently for 15–18 minutes until the rice is tender and the turkey reaches 75°C for 30 seconds. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork. Rest covered for 5 minutes.",
  "Fold in the chopped walnuts and parsley. Mix the Greek-style yoghurt and lemon juice. Mix until the added ingredients are evenly distributed. Scrape around the sides of the bowl or pan as appropriate, so the measured mixture is used throughout the serving. Serve all the pilaf and all the yoghurt."
],
  "nutrition": {
    "calories": "667 kcal",
    "protein": "31.9 g",
    "carbohydrates": "42.7 g",
    "fat": "40.5 g",
    "fibre": "3.2 g",
    "sodium": "80 mg",
    "potassium": "787 mg",
    "phosphate": "435 mg",
    "salt": "0.20 g"
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
    "Mixed diet",
    "Intermittent fasting — eating-window meal"
  ]
},
{
  "id": "hake-and-coconut-rice-bake-with-crisp-slaw",
  "code": "D090",
  "category": "Dinner",
  "cuisine": "Brazil",
  "mealFamily": "rice",
  "emoji": "🍽️",
  "image": "/images/recipes/D090.webp",
  "name": "Hake and coconut rice bake with crisp slaw",
  "description": "A coconut rice and hake bake with a golden egg-white topping and crisp lime slaw.",
  "cookingTime": "40 mins",
  "calories": "666 kcal",
  "protein": "27.1 g",
  "equipment": "Kitchen scales, knife, chopping board, mixing bowl, saucepan or frying pan, oven, baking dish or tray",
  "ingredients": [
    {
      "item": "Hake fillet, flesh only",
      "shoppingItem": "Hake fillet, flesh only",
      "quantity": "90 g (raw edible input, skin and bones excluded)"
    },
    {
      "item": "Fresh raw egg white, separated from shell eggs",
      "shoppingItem": "Fresh raw egg white, separated from shell eggs",
      "quantity": "45 g (raw edible input)"
    },
    {
      "item": "White basmati rice",
      "shoppingItem": "White basmati rice",
      "quantity": "50 g (dry)"
    },
    {
      "item": "Unsweetened desiccated coconut",
      "shoppingItem": "Unsweetened desiccated coconut",
      "quantity": "10 g (dry edible input)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "22 g (as sold, weighed grams)"
    },
    {
      "item": "White cabbage",
      "shoppingItem": "White cabbage",
      "quantity": "65 g (raw edible input)"
    },
    {
      "item": "Carrot",
      "shoppingItem": "Carrot",
      "quantity": "20 g (raw edible input)"
    },
    {
      "item": "Fresh lime juice",
      "shoppingItem": "Fresh lime juice",
      "quantity": "20 g (freshly squeezed, weighed grams)"
    },
    {
      "item": "Standard mayonnaise",
      "shoppingItem": "Standard mayonnaise",
      "quantity": "15 g (as sold)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "120 g (weighed grams)"
    },
    {
      "item": "Garlic",
      "shoppingItem": "Garlic",
      "quantity": "2 g (raw edible input)"
    },
    {
      "item": "Fresh coriander leaves",
      "shoppingItem": "Fresh coriander leaves",
      "quantity": "6 g (raw edible input)"
    }
  ],
  "method": [
  "Heat the oven to 200°C, or 180°C fan. Put the rice, desiccated coconut, crushed garlic, half the oil and all the measured water in a small pan. Bring to a simmer, cover and cook gently for 10 minutes. Look for small, gentle bubbles rather than a rolling boil. Stir along the bottom when needed to prevent sticking, and keep the heat low enough for the food to cook evenly. Use the listed herbs, spices or citrus for flavour before considering any extra seasoning.",
  "Transfer the partially cooked rice and all its liquid to a small baking dish. Choose a dish that holds this portion without spreading it into a very thin layer. Arrange it evenly, so the centre and edges heat through at a similar rate. Nestle in the hake pieces. Pour the weighed egg white over the surface and cover tightly.",
  "Bake for 15–20 minutes until the rice is tender, the egg white is fully set and the fish is opaque, steaming hot and flaking easily. Put the dish or tray on a stable oven shelf and begin checking towards the end of the stated time. Check the centre as well as the surface; a browned top alone does not show that the inside is cooked. Uncover for the last 3 minutes if needed.",
  "Mix the mayonnaise, remaining oil, lime juice and chopped coriander. Mix until the added ingredients are evenly distributed. Scrape around the sides of the bowl or pan as appropriate, so the measured mixture is used throughout the serving. Toss with shredded cabbage and carrot. Serve the whole bake with all the slaw and all edible baking juices."
],
  "nutrition": {
    "calories": "666 kcal",
    "protein": "27.1 g",
    "carbohydrates": "44.3 g",
    "fat": "41.8 g",
    "fibre": "5.2 g",
    "sodium": "214 mg",
    "potassium": "664 mg",
    "phosphate": "271 mg",
    "salt": "0.53 g"
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
    "Mixed diet",
    "Intermittent fasting — eating-window meal"
  ]
},
{
  "id": "pork-and-apple-skewers-with-herbed-couscous",
  "code": "D091",
  "category": "Dinner",
  "cuisine": "Britain",
  "mealFamily": "plated meal",
  "emoji": "🍽️",
  "image": "/images/recipes/D091.webp",
  "name": "Pork and apple skewers with herbed couscous",
  "description": "Mustard and thyme pork skewers with apple, herbed couscous and walnut cabbage salad.",
  "cookingTime": "40 mins",
  "calories": "657 kcal",
  "protein": "29.6 g",
  "equipment": "Kitchen scales, knife, chopping board, mixing bowl, saucepan or frying pan, food thermometer",
  "ingredients": [
    {
      "item": "Plain couscous",
      "shoppingItem": "Plain couscous",
      "quantity": "50 g (dry)"
    },
    {
      "item": "Pork fillet, lean and visible edible fat",
      "shoppingItem": "Pork fillet, lean and visible edible fat",
      "quantity": "90 g (raw edible input)"
    },
    {
      "item": "Eating apple, flesh and skin, core removed",
      "shoppingItem": "Eating apple, flesh and skin, core removed",
      "quantity": "55 g (raw edible input)"
    },
    {
      "item": "Onion",
      "shoppingItem": "Onion",
      "quantity": "20 g (raw edible input)"
    },
    {
      "item": "White cabbage",
      "shoppingItem": "White cabbage",
      "quantity": "55 g (raw edible input)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "28 g (as sold, weighed grams)"
    },
    {
      "item": "Unsalted walnut kernels",
      "shoppingItem": "Unsalted walnut kernels",
      "quantity": "10 g (as sold edible weight)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "110 g (weighed grams)"
    },
    {
      "item": "Fresh lemon juice",
      "shoppingItem": "Fresh lemon juice",
      "quantity": "10 g (freshly squeezed, weighed grams)"
    },
    {
      "item": "Mustard seeds",
      "shoppingItem": "Mustard seeds",
      "quantity": "1.1 g (dry)"
    },
    {
      "item": "Dried thyme",
      "shoppingItem": "Dried thyme",
      "quantity": "0.6 g (dry)"
    },
    {
      "item": "Fresh parsley",
      "shoppingItem": "Fresh parsley",
      "quantity": "6 g (raw edible input)"
    },
    {
      "item": "Ground black pepper",
      "shoppingItem": "Ground black pepper",
      "quantity": "0.2 g (dry)"
    }
  ],
  "method": [
  "Cut the pork, cored apple and onion into small pieces. Keep the pieces a similar size so they cook evenly. Keep any ingredients that are added later separate from those that go into the pan first. Grind the mustard seeds and mix with two fifths of the oil and the thyme. Coat the pork, apple and onion and thread onto short skewers. Use the listed herbs, spices or citrus for flavour before considering any extra seasoning.",
  "Grill or cook in a non-stick pan over medium heat, turning regularly, for about 12–15 minutes until the pork centres reach 75°C for 30 seconds. Retain edible cooking juices.",
  "Bring the measured water to a boil. Add the couscous, cover, turn off the heat and leave for 5–7 minutes. Fluff and fold in one fifth of the oil and chopped parsley.",
  "Mix the remaining oil, lemon juice and pepper. Mix until the added ingredients are evenly distributed. Scrape around the sides of the bowl or pan as appropriate, so the measured mixture is used throughout the serving. Toss with finely shredded cabbage and chopped walnuts. Serve all the skewers, edible pan juices, couscous and salad."
],
  "nutrition": {
    "calories": "657 kcal",
    "protein": "29.6 g",
    "carbohydrates": "47.7 g",
    "fat": "38.3 g",
    "fibre": "5.9 g",
    "sodium": "52 mg",
    "potassium": "842 mg",
    "phosphate": "395 mg",
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
  "primaryDietCategory": "Mixed diet",
  "dietCategories": [
    "Mixed diet",
    "Intermittent fasting — eating-window meal"
  ]
},
{
  "id": "cabbage-rolls-with-barley-mushrooms-and-seitan",
  "code": "D092",
  "category": "Dinner",
  "cuisine": "Poland",
  "mealFamily": "plated meal",
  "emoji": "🍽️",
  "image": "/images/recipes/D092.webp",
  "name": "Cabbage rolls with barley, mushrooms and seitan",
  "description": "Tender cabbage leaves filled with barley, mushrooms, walnuts and homemade seitan.",
  "cookingTime": "65 mins",
  "calories": "621 kcal",
  "protein": "24.1 g",
  "equipment": "Kitchen scales, knife, chopping board, mixing bowl, saucepan or frying pan, steamer",
  "ingredients": [
    {
      "item": "Pearl barley",
      "shoppingItem": "Pearl barley",
      "quantity": "35 g (dry edible input)"
    },
    {
      "item": "White basmati rice",
      "shoppingItem": "White basmati rice",
      "quantity": "20 g (dry)"
    },
    {
      "item": "Unsalted walnut kernels",
      "shoppingItem": "Unsalted walnut kernels",
      "quantity": "15 g (as sold edible weight)"
    },
    {
      "item": "White cabbage",
      "shoppingItem": "White cabbage",
      "quantity": "110 g (raw edible input)"
    },
    {
      "item": "White mushrooms",
      "shoppingItem": "White mushrooms",
      "quantity": "35 g (raw edible input)"
    },
    {
      "item": "Onion",
      "shoppingItem": "Onion",
      "quantity": "20 g (raw edible input)"
    },
    {
      "item": "Fresh tomato",
      "shoppingItem": "Fresh tomato",
      "quantity": "55 g (raw edible input)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "22 g (as sold, weighed grams)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "230 g (weighed grams)"
    },
    {
      "item": "Garlic",
      "shoppingItem": "Garlic",
      "quantity": "2 g (raw edible input)"
    },
    {
      "item": "Sweet paprika",
      "shoppingItem": "Sweet paprika",
      "quantity": "0.6 g (dry)"
    },
    {
      "item": "Dried thyme",
      "shoppingItem": "Dried thyme",
      "quantity": "0.6 g (dry)"
    },
    {
      "item": "Ground black pepper",
      "shoppingItem": "Ground black pepper",
      "quantity": "0.2 g (dry)"
    },
    {
      "item": "Pure vital wheat gluten powder",
      "shoppingItem": "Pure vital wheat gluten powder",
      "quantity": "20 g (dry edible input)"
    }
  ],
  "method": [
  "Mix 20 g pure vital wheat gluten with 30 g of the water into a dough. Scrape dry patches from the bowl into the mixture and work them in with your hands. Keep to the measured dry ingredients and liquid; unmeasured additions change the portion and can make the dough tough. Knead for 2 minutes, rest for 5 minutes, flatten to 1 cm thick and steam over a separate pan of water for 20–25 minutes until firm and fully cooked.",
  "Keep the food above the water rather than sitting in it, with the lid fitted so steam circulates around the portion. Check the pan does not boil dry without letting water splash onto the food. Keep the entire portion and chop finely.",
  "Simmer the barley in 120 g of the water, covered, for 15 minutes. Add the rice and cook for another 15–20 minutes until both grains are tender, keeping all liquid.",
  "Steam the cabbage leaves until flexible, finely chopping any edible stalk trimmings. Cook chopped onion, garlic, mushrooms and cabbage trimmings in three quarters of the oil for 6–8 minutes. Stir around the base and edges of the pan. The vegetables should soften and lose their raw bite; lower the heat if they start to darken before they are tender. Mix with all the cooked grains, seitan, walnuts, thyme and pepper.",
  "Divide the entire filling between three large cabbage leaves, fold in the sides and roll. Put chopped tomato, paprika, remaining oil and remaining 80 g water in a covered casserole. Choose a dish that holds this portion without spreading it into a very thin layer. Arrange it evenly, so the centre and edges heat through at a similar rate. Add the rolls and simmer for 20–25 minutes until tender and steaming hot. Look for small, gentle bubbles rather than a rolling boil.",
  "Stir along the bottom when needed to prevent sticking, and keep the heat low enough for the food to cook evenly. Serve all the rolls and sauce."
],
  "nutrition": {
    "calories": "621 kcal",
    "protein": "24.1 g",
    "carbohydrates": "54.3 g",
    "fat": "33.7 g",
    "fibre": "11.9 g",
    "sodium": "29 mg",
    "potassium": "763 mg",
    "phosphate": "288 mg",
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
    "Vegetarian",
    "Mediterranean-style",
    "Intermittent fasting — eating-window meal"
  ]
},
{
  "id": "mild-tofu-and-coconut-curry-with-basmati-rice",
  "code": "D093",
  "category": "Dinner",
  "cuisine": "India",
  "mealFamily": "stew",
  "emoji": "🍽️",
  "image": "/images/recipes/D093.webp",
  "name": "Mild tofu and coconut curry with basmati rice",
  "description": "A mild coconut and tofu curry with cabbage, peppers and basmati rice.",
  "cookingTime": "35 mins",
  "calories": "625 kcal",
  "protein": "20.1 g",
  "equipment": "Kitchen scales, knife, chopping board, mixing bowl, saucepan or frying pan",
  "ingredients": [
    {
      "item": "White basmati rice",
      "shoppingItem": "White basmati rice",
      "quantity": "45 g (dry)"
    },
    {
      "item": "Regular tofu, made with calcium sulphate, gently drained",
      "shoppingItem": "Regular tofu, made with calcium sulphate, gently drained",
      "quantity": "165 g (as sold edible weight, unpressed)"
    },
    {
      "item": "Unsweetened desiccated coconut",
      "shoppingItem": "Unsweetened desiccated coconut",
      "quantity": "15 g (dry edible input)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "22 g (as sold, weighed grams)"
    },
    {
      "item": "White cabbage",
      "shoppingItem": "White cabbage",
      "quantity": "75 g (raw edible input)"
    },
    {
      "item": "Red bell pepper",
      "shoppingItem": "Red bell pepper",
      "quantity": "45 g (raw edible input)"
    },
    {
      "item": "Onion",
      "shoppingItem": "Onion",
      "quantity": "20 g (raw edible input)"
    },
    {
      "item": "Fresh tomato",
      "shoppingItem": "Fresh tomato",
      "quantity": "45 g (raw edible input)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "155 g (weighed grams)"
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
      "item": "Ground cumin",
      "shoppingItem": "Ground cumin",
      "quantity": "0.8 g (dry)"
    },
    {
      "item": "Ground coriander seed",
      "shoppingItem": "Ground coriander seed",
      "quantity": "0.8 g (dry)"
    },
    {
      "item": "Ground turmeric",
      "shoppingItem": "Ground turmeric",
      "quantity": "0.3 g (dry)"
    },
    {
      "item": "Fresh lime juice",
      "shoppingItem": "Fresh lime juice",
      "quantity": "15 g (freshly squeezed, weighed grams)"
    }
  ],
  "method": [
  "Cook the rice with 100 g of the measured water, covered, for 12–15 minutes. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork. Rest for 5 minutes. Use regular calcium-sulphate tofu, gently drained without pressing, and cut the weighed tofu into cubes.",
  "Soften chopped onion, garlic and ginger in the oil for 5 minutes. Stir around the base and edges of the pan. The vegetables should soften and lose their raw bite; lower the heat if they start to darken before they are tender. Stir in the cumin, coriander and turmeric for 30 seconds. Use the listed herbs, spices or citrus for flavour before considering any extra seasoning.",
  "Add shredded cabbage, diced pepper and tomato, desiccated coconut, tofu and remaining 55 g water. Cover and simmer gently for 10–12 minutes until the vegetables are tender and the tofu is hot. Look for small, gentle bubbles rather than a rolling boil. Stir along the bottom when needed to prevent sticking, and keep the heat low enough for the food to cook evenly.",
  "Stir in the lime juice and serve all the curry with all the rice. Mix until the added ingredients are evenly distributed. Scrape around the sides of the bowl or pan as appropriate, so the measured mixture is used throughout the serving."
],
  "nutrition": {
    "calories": "625 kcal",
    "protein": "20.1 g",
    "carbohydrates": "47.7 g",
    "fat": "40.0 g",
    "fibre": "8.3 g",
    "sodium": "32 mg",
    "potassium": "814 mg",
    "phosphate": "289 mg",
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
    "Intermittent fasting — eating-window meal"
  ]
},
{
  "id": "turkey-kebabs-with-flatbread-and-cucumber-yoghurt",
  "code": "D094",
  "category": "Dinner",
  "cuisine": "Pakistan",
  "mealFamily": "bread",
  "emoji": "🍽️",
  "image": "/images/recipes/D094.webp",
  "name": "Turkey kebabs with flatbread and cucumber yoghurt",
  "description": "Spiced turkey kebabs with a warm flatbread and cool cucumber yoghurt.",
  "cookingTime": "40 mins",
  "calories": "704 kcal",
  "protein": "48.0 g",
  "equipment": "Kitchen scales, knife, chopping board, mixing bowl, saucepan or frying pan, food thermometer",
  "ingredients": [
    {
      "item": "Skinless turkey breast",
      "shoppingItem": "Skinless turkey breast",
      "quantity": "145 g (raw edible input)"
    },
    {
      "item": "Plain white flour",
      "shoppingItem": "Plain white flour",
      "quantity": "50 g (dry)"
    },
    {
      "item": "Fresh raw egg white, separated from shell eggs",
      "shoppingItem": "Fresh raw egg white, separated from shell eggs",
      "quantity": "35 g (raw edible input)"
    },
    {
      "item": "Fine sifted cornmeal, not self-raising",
      "shoppingItem": "Fine sifted cornmeal, not self-raising",
      "quantity": "9 g (dry edible input)"
    },
    {
      "item": "Onion",
      "shoppingItem": "Onion",
      "quantity": "30 g (raw edible input)"
    },
    {
      "item": "Fresh tomato",
      "shoppingItem": "Fresh tomato",
      "quantity": "45 g (raw edible input)"
    },
    {
      "item": "Cucumber",
      "shoppingItem": "Cucumber",
      "quantity": "65 g (raw edible input)"
    },
    {
      "item": "Plain full-fat Greek-style yoghurt, about 10% fat",
      "shoppingItem": "Plain full-fat Greek-style yoghurt, about 10% fat",
      "quantity": "30 g (as sold edible weight)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "28 g (as sold, weighed grams)"
    },
    {
      "item": "Fresh coriander leaves",
      "shoppingItem": "Fresh coriander leaves",
      "quantity": "6 g (raw edible input)"
    },
    {
      "item": "Ground cumin",
      "shoppingItem": "Ground cumin",
      "quantity": "1.1 g (dry)"
    },
    {
      "item": "Ground coriander seed",
      "shoppingItem": "Ground coriander seed",
      "quantity": "1.1 g (dry)"
    },
    {
      "item": "Fresh lemon juice",
      "shoppingItem": "Fresh lemon juice",
      "quantity": "15 g (freshly squeezed, weighed grams)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "35 g (weighed grams)"
    },
    {
      "item": "Pure cayenne chilli powder",
      "shoppingItem": "Pure cayenne chilli powder",
      "quantity": "0.2 g (dry)"
    }
  ],
  "method": [
  "Mix the flour, measured water and 6 g of the oil into a dough. Scrape dry patches from the bowl into the mixture and work them in with your hands. Keep to the measured dry ingredients and liquid; unmeasured additions change the portion and can make the dough tough. Knead briefly, cover and rest for 10 minutes. Use the listed herbs, spices or citrus for flavour before considering any extra seasoning.",
  "Mince plain turkey breast at home. Mix with the egg white, cornmeal, very finely chopped onion and tomato, half the coriander leaves, ground cumin and coriander, and chilli. Form four thin, compact patties.",
  "Heat 16 g of the oil in a non-stick pan. Let the pan warm before the food goes in. If the oil begins to smoke or the food catches immediately, lower the heat before continuing. Cook the kebabs over medium heat for 5–6 minutes per side until the centres reach 75°C for 30 seconds. Keep edible pan juices.",
  "Roll the dough between non-stick sheets and dry-cook for 2–3 minutes per side until cooked through. Mix the Greek-style yoghurt, diced cucumber, lemon juice, remaining 6 g oil and remaining coriander. Mix until the added ingredients are evenly distributed. Scrape around the sides of the bowl or pan as appropriate, so the measured mixture is used throughout the serving. Serve all the kebabs, flatbread, juices and yoghurt."
],
  "nutrition": {
    "calories": "704 kcal",
    "protein": "48.0 g",
    "carbohydrates": "49.8 g",
    "fat": "34.2 g",
    "fibre": "4.8 g",
    "sodium": "169 mg",
    "potassium": "1064 mg",
    "phosphate": "493 mg",
    "salt": "0.42 g"
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
    "Mediterranean-style",
    "Intermittent fasting — eating-window meal"
  ]
},
{
  "id": "basil-and-ginger-tofu-cakes-with-rice-and-cabbage",
  "code": "D095",
  "category": "Dinner",
  "cuisine": "Thailand",
  "mealFamily": "cakes",
  "emoji": "🍽️",
  "image": "/images/recipes/D095.webp",
  "name": "Basil and ginger tofu cakes with rice and cabbage",
  "description": "Tofu cakes with basil and ginger, served with rice and warm sesame cabbage.",
  "cookingTime": "40 mins",
  "calories": "669 kcal",
  "protein": "20.8 g",
  "equipment": "Kitchen scales, knife, chopping board, mixing bowl, saucepan or frying pan",
  "ingredients": [
    {
      "item": "Regular tofu, made with calcium sulphate, gently drained",
      "shoppingItem": "Regular tofu, made with calcium sulphate, gently drained",
      "quantity": "165 g (as sold edible weight, unpressed)"
    },
    {
      "item": "White rice flour",
      "shoppingItem": "White rice flour",
      "quantity": "35 g (dry edible input)"
    },
    {
      "item": "White short-grain rice",
      "shoppingItem": "White short-grain rice",
      "quantity": "20 g (dry)"
    },
    {
      "item": "White cabbage",
      "shoppingItem": "White cabbage",
      "quantity": "65 g (raw edible input)"
    },
    {
      "item": "Red bell pepper",
      "shoppingItem": "Red bell pepper",
      "quantity": "45 g (raw edible input)"
    },
    {
      "item": "Rapeseed oil",
      "shoppingItem": "Rapeseed oil",
      "quantity": "22 g (as sold, weighed grams)"
    },
    {
      "item": "Sesame oil",
      "shoppingItem": "Sesame oil",
      "quantity": "6 g (as sold, weighed grams)"
    },
    {
      "item": "Unsalted dry-roasted peanuts",
      "shoppingItem": "Unsalted dry-roasted peanuts",
      "quantity": "10 g (as sold edible weight)"
    },
    {
      "item": "Soy sauce",
      "shoppingItem": "Soy sauce",
      "quantity": "3 g (as sold, weighed grams)"
    },
    {
      "item": "Fresh basil",
      "shoppingItem": "Fresh basil",
      "quantity": "6 g (raw edible input)"
    },
    {
      "item": "Fresh lime juice",
      "shoppingItem": "Fresh lime juice",
      "quantity": "20 g (freshly squeezed, weighed grams)"
    },
    {
      "item": "Fresh ginger",
      "shoppingItem": "Fresh ginger",
      "quantity": "3 g (raw edible input)"
    },
    {
      "item": "Garlic",
      "shoppingItem": "Garlic",
      "quantity": "2 g (raw edible input)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "100 g (weighed grams)"
    }
  ],
  "method": [
  "Cook the short-grain rice with 55 g of the measured water in a covered pan for 12–15 minutes. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork. Rest for 5 minutes.",
  "Mash the weighed regular calcium-sulphate tofu, gently drained without pressing. Mix with the rice flour, finely chopped basil, garlic, ginger and 20 g of the measured water. Rest for 5 minutes, then form four small, thin cakes. Use the measured seasoning and sauces shown in the ingredients; do not add extra salt or a potassium-based salt substitute.",
  "Heat 17 g of the rapeseed oil in a non-stick pan. Let the pan warm before the food goes in. If the oil begins to smoke or the food catches immediately, lower the heat before continuing. Cook the cakes for 5–6 minutes per side until firm and the centres are fully cooked. Leave space between the portions and let the underside set before moving them. Slide a thin spatula underneath and turn carefully, keeping each portion together.",
  "Cook the shredded cabbage and sliced pepper in the remaining 5 g rapeseed oil and remaining 25 g water for 5–6 minutes. Stir around the base and edges of the pan. The vegetables should soften and lose their raw bite; lower the heat if they start to darken before they are tender. Stir in the sesame oil, soy sauce, lime juice and chopped peanuts. Mix until the added ingredients are evenly distributed.",
  "Scrape around the sides of the bowl or pan as appropriate, so the measured mixture is used throughout the serving. Serve all the cakes, rice and vegetables."
],
  "nutrition": {
    "calories": "669 kcal",
    "protein": "20.8 g",
    "carbohydrates": "51.6 g",
    "fat": "41.5 g",
    "fibre": "5.6 g",
    "sodium": "189 mg",
    "potassium": "680 mg",
    "phosphate": "300 mg",
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
  "primaryDietCategory": "Vegan",
  "dietCategories": [
    "Vegan",
    "Vegetarian",
    "DASH-style",
    "Intermittent fasting — eating-window meal"
  ]
},
{
  "id": "sesame-salmon-with-rice-noodles-and-crunchy-slaw",
  "code": "D096",
  "category": "Dinner",
  "cuisine": "Japan",
  "mealFamily": "pasta",
  "emoji": "🍽️",
  "image": "/images/recipes/D096.webp",
  "name": "Sesame salmon with rice noodles and crunchy slaw",
  "description": "Sesame salmon with rice noodles and a crunchy ginger-dressed cabbage salad.",
  "cookingTime": "30 mins",
  "calories": "701 kcal",
  "protein": "26.3 g",
  "equipment": "Kitchen scales, knife, chopping board, mixing bowl, saucepan or frying pan, oven, baking dish or tray",
  "ingredients": [
    {
      "item": "Farmed salmon fillet, flesh only",
      "shoppingItem": "Farmed salmon fillet, flesh only",
      "quantity": "110 g (raw edible input, skin and bones excluded)"
    },
    {
      "item": "Rice noodles",
      "shoppingItem": "Rice noodles",
      "quantity": "35 g (dry)"
    },
    {
      "item": "White cabbage",
      "shoppingItem": "White cabbage",
      "quantity": "65 g (raw edible input)"
    },
    {
      "item": "Carrot",
      "shoppingItem": "Carrot",
      "quantity": "35 g (raw edible input)"
    },
    {
      "item": "Sesame seeds",
      "shoppingItem": "Sesame seeds",
      "quantity": "3 g (dry)"
    },
    {
      "item": "Rapeseed oil",
      "shoppingItem": "Rapeseed oil",
      "quantity": "17 g (as sold, weighed grams)"
    },
    {
      "item": "Sesame oil",
      "shoppingItem": "Sesame oil",
      "quantity": "6 g (as sold, weighed grams)"
    },
    {
      "item": "Standard mayonnaise",
      "shoppingItem": "Standard mayonnaise",
      "quantity": "10 g (as sold)"
    },
    {
      "item": "Soy sauce",
      "shoppingItem": "Soy sauce",
      "quantity": "3 g (as sold, weighed grams)"
    },
    {
      "item": "Plain unseasoned vinegar",
      "shoppingItem": "Plain unseasoned vinegar",
      "quantity": "10 g (as sold, weighed grams)"
    },
    {
      "item": "Fresh ginger",
      "shoppingItem": "Fresh ginger",
      "quantity": "3 g (raw edible input)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "45 g (weighed grams)"
    },
    {
      "item": "White sugar",
      "shoppingItem": "White sugar",
      "quantity": "2 g (dry)"
    }
  ],
  "method": [
  "Heat the oven to 200°C, or 180°C fan. Brush the salmon with one third of the rapeseed oil, scatter with the sesame seeds and bake for 12–15 minutes until opaque, steaming hot and flaking easily. Put the dish or tray on a stable oven shelf and begin checking towards the end of the stated time. Check the centre as well as the surface; a browned top alone does not show that the inside is cooked. Retain edible baking juices.",
  "Cook the rice noodles in a separate pan of unsalted water according to the packet and drain. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork. Separate the pasta or noodles as they soften so they do not stick together.",
  "Check the texture towards the end of the cooking time; it should be tender with no chalky centre. Toss with the remaining rapeseed oil and all the sesame oil while warm.",
  "Mix the mayonnaise, soy sauce, vinegar, grated ginger, sugar and all the measured water. Mix until the added ingredients are evenly distributed. Scrape around the sides of the bowl or pan as appropriate, so the measured mixture is used throughout the serving. Toss with shredded cabbage and carrot. Use the measured seasoning and sauces shown in the ingredients; do not add extra salt or a potassium-based salt substitute.",
  "Serve all the freshly cooked salmon and edible juices with all the noodles, slaw and dressing."
],
  "nutrition": {
    "calories": "701 kcal",
    "protein": "26.3 g",
    "carbohydrates": "36.3 g",
    "fat": "49.1 g",
    "fibre": "4.5 g",
    "sodium": "307 mg",
    "potassium": "653 mg",
    "phosphate": "350 mg",
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
  "primaryDietCategory": "Mixed diet",
  "dietCategories": [
    "Mixed diet",
    "Intermittent fasting — eating-window meal"
  ]
},
{
  "id": "black-bean-and-rice-stuffed-peppers",
  "code": "D097",
  "category": "Dinner",
  "cuisine": "Mexico",
  "mealFamily": "rice",
  "emoji": "🍽️",
  "image": "/images/recipes/D097.webp",
  "name": "Black-bean and rice stuffed peppers",
  "description": "Baked peppers filled with black beans, rice and spices, with melted Cheddar and avocado.",
  "cookingTime": "45 mins",
  "calories": "681 kcal",
  "protein": "20.2 g",
  "equipment": "Kitchen scales, knife, chopping board, mixing bowl, saucepan or frying pan, oven, baking dish or tray",
  "ingredients": [
    {
      "item": "White basmati rice",
      "shoppingItem": "White basmati rice",
      "quantity": "45 g (dry)"
    },
    {
      "item": "Black beans, boiled without salt and drained",
      "shoppingItem": "Black beans, boiled without salt and drained",
      "quantity": "100 g (cooked drained edible weight)"
    },
    {
      "item": "Red bell pepper",
      "shoppingItem": "Red bell pepper",
      "quantity": "130 g (raw edible input)"
    },
    {
      "item": "Onion",
      "shoppingItem": "Onion",
      "quantity": "20 g (raw edible input)"
    },
    {
      "item": "Fresh tomato",
      "shoppingItem": "Fresh tomato",
      "quantity": "45 g (raw edible input)"
    },
    {
      "item": "Vegetarian-rennet mature cheddar",
      "shoppingItem": "Vegetarian-rennet mature cheddar",
      "quantity": "20 g (as sold)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "22 g (as sold, weighed grams)"
    },
    {
      "item": "Hass avocado flesh, skin and stone removed",
      "shoppingItem": "Hass avocado flesh, skin and stone removed",
      "quantity": "35 g (raw edible input)"
    },
    {
      "item": "Fresh lime juice",
      "shoppingItem": "Fresh lime juice",
      "quantity": "20 g (freshly squeezed, weighed grams)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "110 g (weighed grams)"
    },
    {
      "item": "Ground cumin",
      "shoppingItem": "Ground cumin",
      "quantity": "1.1 g (dry)"
    },
    {
      "item": "Sweet paprika",
      "shoppingItem": "Sweet paprika",
      "quantity": "1.1 g (dry)"
    },
    {
      "item": "Fresh coriander leaves",
      "shoppingItem": "Fresh coriander leaves",
      "quantity": "6 g (raw edible input)"
    }
  ],
  "method": [
  "Heat the oven to 200°C, or 180°C fan. Halve and deseed the peppers and weigh the edible halves. Brush with half the oil and bake for 15 minutes. Put the dish or tray on a stable oven shelf and begin checking towards the end of the stated time. Check the centre as well as the surface; a browned top alone does not show that the inside is cooked.",
  "Cook the rice with all the measured water in a covered pan for 12–15 minutes, then rest for 5 minutes. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork.",
  "Soften chopped onion in the remaining oil for 5 minutes. Stir around the base and edges of the pan. The vegetables should soften and lose their raw bite; lower the heat if they start to darken before they are tender. Add cumin, paprika, chopped tomato and cooked drained black beans. Cook for 5 minutes, then fold in all the rice. Use a fork or broad spoon and a light lifting motion so the grains stay separate. Work gently from the bottom of the bowl without pressing or mashing the grains. Use the measured seasoning and sauces shown in the ingredients; do not add extra salt or a potassium-based salt substitute.",
  "Fill both pepper halves, spooning any extra filling around them. Top with all the grated Cheddar and bake for 15–20 minutes until the peppers are tender and the filling is steaming hot. Serve the entire dish with all the weighed avocado flesh, lime juice and coriander.",
  "Use vegetarian-rennet cheese for the vegetarian version specified here."
],
  "nutrition": {
    "calories": "681 kcal",
    "protein": "20.2 g",
    "carbohydrates": "59.3 g",
    "fat": "36.6 g",
    "fibre": "14.8 g",
    "sodium": "161 mg",
    "potassium": "1115 mg",
    "phosphate": "364 mg",
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
  "primaryDietCategory": "Vegetarian",
  "dietCategories": [
    "Vegetarian",
    "Intermittent fasting — eating-window meal"
  ]
},
{
  "id": "beef-pepper-and-onion-saltado-with-rice",
  "code": "D098",
  "category": "Dinner",
  "cuisine": "Peru",
  "mealFamily": "rice",
  "emoji": "🍽️",
  "image": "/images/recipes/D098.webp",
  "name": "Beef, pepper and onion saltado with rice",
  "description": "Quick-seared beef, onions and peppers with rice, tomato and fresh avocado.",
  "cookingTime": "35 mins",
  "calories": "700 kcal",
  "protein": "29.9 g",
  "equipment": "Kitchen scales, knife, chopping board, mixing bowl, saucepan or frying pan",
  "ingredients": [
    {
      "item": "White basmati rice",
      "shoppingItem": "White basmati rice",
      "quantity": "45 g (dry)"
    },
    {
      "item": "Beef sirloin, lean and edible fat",
      "shoppingItem": "Beef sirloin, lean and edible fat",
      "quantity": "110 g (raw edible input)"
    },
    {
      "item": "Onion",
      "shoppingItem": "Onion",
      "quantity": "45 g (raw edible input)"
    },
    {
      "item": "Fresh tomato",
      "shoppingItem": "Fresh tomato",
      "quantity": "65 g (raw edible input)"
    },
    {
      "item": "Red bell pepper",
      "shoppingItem": "Red bell pepper",
      "quantity": "55 g (raw edible input)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "22 g (as sold, weighed grams)"
    },
    {
      "item": "Hass avocado flesh, skin and stone removed",
      "shoppingItem": "Hass avocado flesh, skin and stone removed",
      "quantity": "45 g (raw edible input)"
    },
    {
      "item": "Plain unseasoned vinegar",
      "shoppingItem": "Plain unseasoned vinegar",
      "quantity": "15 g (as sold, weighed grams)"
    },
    {
      "item": "Soy sauce",
      "shoppingItem": "Soy sauce",
      "quantity": "4 g (as sold, weighed grams)"
    },
    {
      "item": "Garlic",
      "shoppingItem": "Garlic",
      "quantity": "2 g (raw edible input)"
    },
    {
      "item": "Fresh coriander leaves",
      "shoppingItem": "Fresh coriander leaves",
      "quantity": "6 g (raw edible input)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "100 g (weighed grams)"
    },
    {
      "item": "Ground black pepper",
      "shoppingItem": "Ground black pepper",
      "quantity": "0.2 g (dry)"
    }
  ],
  "method": [
  "Cook the rice with all the measured water in a covered pan for 12–15 minutes, then rest for 5 minutes. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork. Slice the beef across the grain and cut the onion, pepper and tomato into wedges. Keep the pieces a similar size so they cook evenly. Keep any ingredients that are added later separate from those that go into the pan first.",
  "Heat three quarters of the oil in a wok. Sear the beef for 2–3 minutes, then add the onion, pepper and garlic. Stir-fry for 3–4 minutes. Use the measured seasoning and sauces shown in the ingredients; do not add extra salt or a potassium-based salt substitute.",
  "Add the tomato, soy sauce, vinegar and pepper. Stir-fry for 2 minutes, ensuring the beef surfaces are thoroughly seared and everything is hot.",
  "Mix the weighed avocado flesh with the remaining oil and chopped coriander. Serve all the stir-fry and sauce with all the rice and avocado."
],
  "nutrition": {
    "calories": "700 kcal",
    "protein": "29.9 g",
    "carbohydrates": "44.1 g",
    "fat": "44.3 g",
    "fibre": "5.0 g",
    "sodium": "303 mg",
    "potassium": "1033 mg",
    "phosphate": "316 mg",
    "salt": "0.76 g"
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
    "Mixed diet",
    "Intermittent fasting — eating-window meal"
  ]
},
{
  "id": "fish-and-groundnut-stew-with-rice",
  "code": "D099",
  "category": "Dinner",
  "cuisine": "Ghana",
  "mealFamily": "stew",
  "emoji": "🍽️",
  "image": "/images/recipes/D099.webp",
  "name": "Fish and groundnut stew with rice",
  "description": "Fish in a warming groundnut and pepper sauce with rice and tender cabbage.",
  "cookingTime": "40 mins",
  "calories": "638 kcal",
  "protein": "26.2 g",
  "equipment": "Kitchen scales, knife, chopping board, mixing bowl, saucepan or frying pan",
  "ingredients": [
    {
      "item": "Cod fillet, flesh only",
      "shoppingItem": "Cod fillet, flesh only",
      "quantity": "75 g (raw edible input)"
    },
    {
      "item": "Unsalted dry-roasted peanuts",
      "shoppingItem": "Unsalted dry-roasted peanuts",
      "quantity": "30 g (as sold edible weight)"
    },
    {
      "item": "White basmati rice",
      "shoppingItem": "White basmati rice",
      "quantity": "45 g (dry)"
    },
    {
      "item": "White cabbage",
      "shoppingItem": "White cabbage",
      "quantity": "65 g (raw edible input)"
    },
    {
      "item": "Red bell pepper",
      "shoppingItem": "Red bell pepper",
      "quantity": "65 g (raw edible input)"
    },
    {
      "item": "Fresh tomato",
      "shoppingItem": "Fresh tomato",
      "quantity": "45 g (raw edible input)"
    },
    {
      "item": "Onion",
      "shoppingItem": "Onion",
      "quantity": "20 g (raw edible input)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "22 g (as sold, weighed grams)"
    },
    {
      "item": "Fresh lime juice",
      "shoppingItem": "Fresh lime juice",
      "quantity": "15 g (freshly squeezed, weighed grams)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "130 g (weighed grams)"
    },
    {
      "item": "Fresh ginger",
      "shoppingItem": "Fresh ginger",
      "quantity": "4 g (raw edible input)"
    },
    {
      "item": "Garlic",
      "shoppingItem": "Garlic",
      "quantity": "2 g (raw edible input)"
    },
    {
      "item": "Sweet paprika",
      "shoppingItem": "Sweet paprika",
      "quantity": "0.6 g (dry)"
    },
    {
      "item": "Pure cayenne chilli powder",
      "shoppingItem": "Pure cayenne chilli powder",
      "quantity": "0.2 g (dry)"
    }
  ],
  "method": [
  "Cook the rice with 100 g of the measured water, covered, for 12–15 minutes. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork. Rest for 5 minutes.",
  "Grind the peanuts. Keep the nuts together on the board and chop to a similar size. Leave some texture where the recipe uses them as a topping, rather than turning them into a smooth paste. Soften chopped onion, pepper, ginger and garlic in the oil for 6–8 minutes. Stir around the base and edges of the pan. The vegetables should soften and lose their raw bite; lower the heat if they start to darken before they are tender. Stir in paprika and chilli, then add chopped tomato, shredded cabbage, ground peanuts and remaining 30 g water. Use the listed herbs, spices or citrus for flavour before considering any extra seasoning.",
  "Cover and simmer for 8 minutes. Look for small, gentle bubbles rather than a rolling boil. Stir along the bottom when needed to prevent sticking, and keep the heat low enough for the food to cook evenly. Add the cod pieces, cover and simmer gently for 6–8 minutes until opaque, steaming hot and flaking easily.",
  "Stir in the lime juice and serve the entire stew with all the rice. Mix until the added ingredients are evenly distributed. Scrape around the sides of the bowl or pan as appropriate, so the measured mixture is used throughout the serving."
],
  "nutrition": {
    "calories": "638 kcal",
    "protein": "26.2 g",
    "carbohydrates": "47.9 g",
    "fat": "38.0 g",
    "fibre": "7.7 g",
    "sodium": "84 mg",
    "potassium": "945 mg",
    "phosphate": "336 mg",
    "salt": "0.21 g"
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
    "Mediterranean-style",
    "Intermittent fasting — eating-window meal"
  ]
},
{
  "id": "lentil-bobotie-with-rice",
  "code": "D100",
  "category": "Dinner",
  "cuisine": "South Africa",
  "mealFamily": "pie",
  "emoji": "🍽️",
  "image": "/images/recipes/D100.webp",
  "name": "Lentil bobotie with rice",
  "description": "A gently spiced lentil and walnut bake with apple, raisins and a golden egg topping.",
  "cookingTime": "50 mins",
  "calories": "681 kcal",
  "protein": "27.1 g",
  "equipment": "Kitchen scales, knife, chopping board, mixing bowl, oven, baking dish or tray",
  "ingredients": [
    {
      "item": "White basmati rice",
      "shoppingItem": "White basmati rice",
      "quantity": "40 g (dry)"
    },
    {
      "item": "Green or brown lentils, boiled without salt and drained",
      "shoppingItem": "Green or brown lentils, boiled without salt and drained",
      "quantity": "100 g (cooked drained edible weight)"
    },
    {
      "item": "Whole egg, shell removed",
      "shoppingItem": "Whole egg, shell removed",
      "quantity": "30 g (raw edible input)"
    },
    {
      "item": "Fresh raw egg white, separated from shell eggs",
      "shoppingItem": "Fresh raw egg white, separated from shell eggs",
      "quantity": "65 g (raw edible input)"
    },
    {
      "item": "Whole milk",
      "shoppingItem": "Whole milk",
      "quantity": "45 g (as sold, weighed grams)"
    },
    {
      "item": "White crusty bloomer bread, egg- and dairy-free",
      "shoppingItem": "White crusty bloomer bread, egg- and dairy-free",
      "quantity": "15 g (as sold edible weight)"
    },
    {
      "item": "Onion",
      "shoppingItem": "Onion",
      "quantity": "20 g (raw edible input)"
    },
    {
      "item": "Eating apple, flesh and skin, core removed",
      "shoppingItem": "Eating apple, flesh and skin, core removed",
      "quantity": "35 g (raw edible input)"
    },
    {
      "item": "Raisins",
      "shoppingItem": "Raisins",
      "quantity": "6 g (dry as sold)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "22 g (as sold, weighed grams)"
    },
    {
      "item": "Unsalted walnut kernels",
      "shoppingItem": "Unsalted walnut kernels",
      "quantity": "10 g (as sold edible weight)"
    },
    {
      "item": "Plain unseasoned vinegar",
      "shoppingItem": "Plain unseasoned vinegar",
      "quantity": "10 g (as sold, weighed grams)"
    },
    {
      "item": "Ground cumin",
      "shoppingItem": "Ground cumin",
      "quantity": "0.6 g (dry)"
    },
    {
      "item": "Ground coriander seed",
      "shoppingItem": "Ground coriander seed",
      "quantity": "0.6 g (dry)"
    },
    {
      "item": "Ground turmeric",
      "shoppingItem": "Ground turmeric",
      "quantity": "0.6 g (dry)"
    },
    {
      "item": "Ground cinnamon",
      "shoppingItem": "Ground cinnamon",
      "quantity": "0.3 g (dry)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "90 g (weighed grams)"
    },
    {
      "item": "Ground black pepper",
      "shoppingItem": "Ground black pepper",
      "quantity": "0.2 g (dry)"
    }
  ],
  "method": [
  "Heat the oven to 190°C, or 170°C fan. Soak the bread in 20 g of the milk, keeping all the milk.",
  "Cook chopped onion and grated cored apple in the oil for 6 minutes. Stir around the base and edges of the pan. The vegetables should soften and lose their raw bite; lower the heat if they start to darken before they are tender. Add cumin, coriander, turmeric, cinnamon, vinegar, raisins, cooked drained green lentils and chopped walnuts. Stir in all the soaked bread and milk and the pepper. Use the measured seasoning and sauces shown in the ingredients; do not add extra salt or a potassium-based salt substitute.",
  "Spoon into a small baking dish. Beat the whole egg, weighed egg white and remaining 25 g milk and pour over the top. Beat until the mixture has an even colour and consistency, with no long strands of unmixed egg white. Bake for 25–30 minutes until the topping is completely set and filling is steaming hot. Put the dish or tray on a stable oven shelf and begin checking towards the end of the stated time. Check the centre as well as the surface; a browned top alone does not show that the inside is cooked.",
  "Meanwhile cook the rice in all the measured water, covered, for 12–15 minutes, then rest for 5 minutes. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork. Serve the whole bake with all the rice."
],
  "nutrition": {
    "calories": "681 kcal",
    "protein": "27.1 g",
    "carbohydrates": "63.2 g",
    "fat": "34.8 g",
    "fibre": "10.6 g",
    "sodium": "254 mg",
    "potassium": "668 mg",
    "phosphate": "321 mg",
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
  "primaryDietCategory": "Vegetarian",
  "dietCategories": [
    "Vegetarian",
    "Intermittent fasting — eating-window meal"
  ]
},
{
  "id": "salmon-and-courgette-frittata",
  "code": "D101",
  "category": "Dinner",
  "cuisine": "Italy",
  "mealFamily": "eggs",
  "emoji": "🍽️",
  "image": "/images/recipes/D101.webp",
  "name": "Salmon and courgette frittata",
  "description": "An individual salmon and courgette frittata with Cheddar, lemon and parsley.",
  "cookingTime": "35 mins",
  "calories": "561 kcal",
  "protein": "33.0 g",
  "equipment": "Kitchen scales, knife, chopping board, mixing bowl, saucepan or frying pan, oven, baking dish or tray",
  "ingredients": [
    {
      "item": "Whole egg, shell removed",
      "shoppingItem": "Whole egg, shell removed",
      "quantity": "50 g (raw edible input)"
    },
    {
      "item": "Farmed salmon fillet, flesh only",
      "shoppingItem": "Farmed salmon fillet, flesh only",
      "quantity": "100 g (raw edible input, skin and bones excluded)"
    },
    {
      "item": "Courgette",
      "shoppingItem": "Courgette",
      "quantity": "80 g (raw edible input)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "20 g (as sold, weighed grams)"
    },
    {
      "item": "Mature Cheddar",
      "shoppingItem": "Mature Cheddar",
      "quantity": "20 g (as sold)"
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
      "item": "Ground black pepper",
      "shoppingItem": "Ground black pepper",
      "quantity": "0.2 g (dry)"
    }
  ],
  "method": [
  "Heat the oven to 200°C, or 180°C fan. Dice the courgette and cook in half the oil in a small ovenproof pan for 5 minutes. Keep the pieces a similar size so they cook evenly. Keep any ingredients that are added later separate from those that go into the pan first.",
  "Cut the salmon into small pieces and add to the pan. Beat the weighed egg with the lemon juice, parsley and pepper, and pour over the fish and vegetables. Beat until the mixture has an even colour and consistency, with no long strands of unmixed egg white. Use the measured seasoning and sauces shown in the ingredients; do not add extra salt or a potassium-based salt substitute.",
  "Scatter with the grated Cheddar and remaining oil. Bake for 18–22 minutes until the egg is completely set and the salmon is opaque and steaming hot. Put the dish or tray on a stable oven shelf and begin checking towards the end of the stated time. Check the centre as well as the surface; a browned top alone does not show that the inside is cooked. Serve the whole dish and edible juices."
],
  "nutrition": {
    "calories": "561 kcal",
    "protein": "33.0 g",
    "carbohydrates": "2.2 g",
    "fat": "46.7 g",
    "fibre": "0.8 g",
    "sodium": "266 mg",
    "potassium": "762 mg",
    "phosphate": "452 mg",
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
  "primaryDietCategory": "Keto",
  "dietCategories": [
    "Keto",
    "Atkins Phase 1"
  ]
},
{
  "id": "garlic-cream-chicken-with-braised-cabbage",
  "code": "D102",
  "category": "Dinner",
  "cuisine": "Britain",
  "mealFamily": "plated meal",
  "emoji": "🍽️",
  "image": "/images/recipes/D102.webp",
  "name": "Garlic cream chicken with braised cabbage",
  "description": "Tender chicken thigh in a garlic and thyme cream sauce with soft cabbage.",
  "cookingTime": "35 mins",
  "calories": "453 kcal",
  "protein": "29.6 g",
  "equipment": "Kitchen scales, knife, chopping board, mixing bowl, saucepan or frying pan, food thermometer",
  "ingredients": [
    {
      "item": "Skinless boneless chicken thigh",
      "shoppingItem": "Skinless boneless chicken thigh",
      "quantity": "130 g (raw edible input)"
    },
    {
      "item": "White cabbage",
      "shoppingItem": "White cabbage",
      "quantity": "100 g (raw edible input)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "25 g (as sold, weighed grams)"
    },
    {
      "item": "Single cream",
      "shoppingItem": "Single cream",
      "quantity": "30 g (as sold, weighed grams)"
    },
    {
      "item": "Garlic",
      "shoppingItem": "Garlic",
      "quantity": "2 g (raw edible input)"
    },
    {
      "item": "Fresh lemon juice",
      "shoppingItem": "Fresh lemon juice",
      "quantity": "15 g (freshly squeezed, weighed grams)"
    },
    {
      "item": "Dried thyme",
      "shoppingItem": "Dried thyme",
      "quantity": "0.5 g (dry)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "40 g (weighed grams)"
    },
    {
      "item": "Ground black pepper",
      "shoppingItem": "Ground black pepper",
      "quantity": "0.2 g (dry)"
    }
  ],
  "method": [
  "Use skinless boneless chicken thigh. Cut into small pieces and brown in three fifths of the oil for 5 minutes.",
  "Add shredded cabbage, crushed garlic, thyme and all the measured water. Cover and simmer for 12–15 minutes until the cabbage is tender and the chicken reaches 75°C for 30 seconds. Look for small, gentle bubbles rather than a rolling boil. Stir along the bottom when needed to prevent sticking, and keep the heat low enough for the food to cook evenly. Use the listed herbs, spices or citrus for flavour before considering any extra seasoning.",
  "Stir in the cream, remaining oil, lemon juice and pepper. Mix until the added ingredients are evenly distributed. Scrape around the sides of the bowl or pan as appropriate, so the measured mixture is used throughout the serving. Warm gently without boiling and serve the entire portion with all the sauce."
],
  "nutrition": {
    "calories": "453 kcal",
    "protein": "29.6 g",
    "carbohydrates": "6.2 g",
    "fat": "34.5 g",
    "fibre": "3.3 g",
    "sodium": "135 mg",
    "potassium": "804 mg",
    "phosphate": "199 mg",
    "salt": "0.34 g"
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
  "id": "pork-medallions-with-creamy-courgettes",
  "code": "D103",
  "category": "Dinner",
  "cuisine": "Britain",
  "mealFamily": "plated meal",
  "emoji": "🍽️",
  "image": "/images/recipes/D103.webp",
  "name": "Pork medallions with creamy courgettes",
  "description": "Pork medallions with courgettes in a buttery thyme and garlic sauce.",
  "cookingTime": "30 mins",
  "calories": "432 kcal",
  "protein": "29.4 g",
  "equipment": "Kitchen scales, knife, chopping board, mixing bowl, saucepan or frying pan, food thermometer",
  "ingredients": [
    {
      "item": "Pork fillet, lean and visible edible fat",
      "shoppingItem": "Pork fillet, lean and visible edible fat",
      "quantity": "120 g (raw edible input)"
    },
    {
      "item": "Courgette",
      "shoppingItem": "Courgette",
      "quantity": "100 g (raw edible input)"
    },
    {
      "item": "Single cream",
      "shoppingItem": "Single cream",
      "quantity": "20 g (as sold, weighed grams)"
    },
    {
      "item": "Unsalted butter",
      "shoppingItem": "Unsalted butter",
      "quantity": "15 g (as sold)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "15 g (as sold, weighed grams)"
    },
    {
      "item": "Dried thyme",
      "shoppingItem": "Dried thyme",
      "quantity": "0.5 g (dry)"
    },
    {
      "item": "Garlic",
      "shoppingItem": "Garlic",
      "quantity": "2 g (raw edible input)"
    },
    {
      "item": "Ground black pepper",
      "shoppingItem": "Ground black pepper",
      "quantity": "0.2 g (dry)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "30 g (weighed grams)"
    }
  ],
  "method": [
  "Slice the pork into medallions. Heat the oil and half the butter in a non-stick pan and cook the pork, turning, until its centres reach 75°C for 30 seconds. Let the pan warm before the food goes in. If the oil begins to smoke or the food catches immediately, lower the heat before continuing. Keep warm and retain all edible pan juices.",
  "Slice the courgette and cook in the same pan with the remaining butter, garlic, thyme and measured water for 7–8 minutes until tender. Keep the pieces a similar size so they cook evenly. Keep any ingredients that are added later separate from those that go into the pan first.",
  "Stir in the cream and pepper over low heat. Return the pork and all edible juices, warm through and serve the entire portion."
],
  "nutrition": {
    "calories": "432 kcal",
    "protein": "29.4 g",
    "carbohydrates": "3.4 g",
    "fat": "33.6 g",
    "fibre": "0.8 g",
    "sodium": "59 mg",
    "potassium": "882 mg",
    "phosphate": "330 mg",
    "salt": "0.15 g"
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
  "id": "turkey-patties-with-avocado-and-cabbage-salad",
  "code": "D104",
  "category": "Dinner",
  "cuisine": "Pakistan",
  "mealFamily": "cakes",
  "emoji": "🍽️",
  "image": "/images/recipes/D104.webp",
  "name": "Turkey patties with avocado and cabbage salad",
  "description": "Cumin-spiced turkey patties with a crunchy cabbage, avocado and lemon salad.",
  "cookingTime": "35 mins",
  "calories": "503 kcal",
  "protein": "37.4 g",
  "equipment": "Kitchen scales, knife, chopping board, mixing bowl, saucepan or frying pan, food thermometer",
  "ingredients": [
    {
      "item": "Skinless turkey breast",
      "shoppingItem": "Skinless turkey breast",
      "quantity": "130 g (raw edible input)"
    },
    {
      "item": "Fresh raw egg white, separated from shell eggs",
      "shoppingItem": "Fresh raw egg white, separated from shell eggs",
      "quantity": "30 g (raw edible input)"
    },
    {
      "item": "White cabbage",
      "shoppingItem": "White cabbage",
      "quantity": "80 g (raw edible input)"
    },
    {
      "item": "Hass avocado flesh, skin and stone removed",
      "shoppingItem": "Hass avocado flesh, skin and stone removed",
      "quantity": "60 g (raw edible input)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "25 g (as sold, weighed grams)"
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
      "item": "Ground cumin",
      "shoppingItem": "Ground cumin",
      "quantity": "1 g (dry)"
    },
    {
      "item": "Ground black pepper",
      "shoppingItem": "Ground black pepper",
      "quantity": "0.2 g (dry)"
    }
  ],
  "method": [
  "Mince plain skinless turkey breast at home. Mix with the egg white, cumin, half the parsley and pepper. Shape into four thin patties. Use the listed herbs, spices or citrus for flavour before considering any extra seasoning.",
  "Heat three fifths of the oil in a non-stick pan and cook the patties for 5–6 minutes per side until the centres reach 75°C for 30 seconds. Let the pan warm before the food goes in. If the oil begins to smoke or the food catches immediately, lower the heat before continuing. Leave space between the portions and let the underside set before moving them. Slide a thin spatula underneath and turn carefully, keeping each portion together.",
  "Toss shredded cabbage and weighed avocado flesh with the remaining oil, lemon juice and parsley. Serve all the patties, edible pan juices and salad."
],
  "nutrition": {
    "calories": "503 kcal",
    "protein": "37.4 g",
    "carbohydrates": "5.6 g",
    "fat": "36.8 g",
    "fibre": "4.6 g",
    "sodium": "134 mg",
    "potassium": "1122 mg",
    "phosphate": "367 mg",
    "salt": "0.33 g"
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
  "id": "egg-and-cheddar-stuffed-mushrooms",
  "code": "D105",
  "category": "Dinner",
  "cuisine": "Italy",
  "mealFamily": "eggs",
  "emoji": "🍽️",
  "image": "/images/recipes/D105.webp",
  "name": "Egg and Cheddar stuffed mushrooms",
  "description": "Large mushrooms filled with a rich egg, Cheddar and herb mixture.",
  "cookingTime": "35 mins",
  "calories": "527 kcal",
  "protein": "24.9 g",
  "equipment": "Kitchen scales, knife, chopping board, mixing bowl, oven, baking dish or tray",
  "ingredients": [
    {
      "item": "Whole egg, shell removed",
      "shoppingItem": "Whole egg, shell removed",
      "quantity": "100 g (raw edible input)"
    },
    {
      "item": "Vegetarian-rennet mature cheddar",
      "shoppingItem": "Vegetarian-rennet mature cheddar",
      "quantity": "40 g (as sold)"
    },
    {
      "item": "White mushrooms",
      "shoppingItem": "White mushrooms",
      "quantity": "120 g (raw edible input)"
    },
    {
      "item": "Single cream",
      "shoppingItem": "Single cream",
      "quantity": "20 g (as sold, weighed grams)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "20 g (as sold, weighed grams)"
    },
    {
      "item": "Fresh parsley",
      "shoppingItem": "Fresh parsley",
      "quantity": "5 g (raw edible input)"
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
  "Heat the oven to 190°C, or 170°C fan. Choose large flat mushrooms and weigh 120 g of edible caps and stalks. Remove the stalks, chop them and cook in half the oil for 3 minutes.",
  "Beat the weighed egg with the cream, grated Cheddar, chopped herbs, cooked stalks and pepper. Beat until the mixture has an even colour and consistency, with no long strands of unmixed egg white. Put the caps in a small dish and brush with the remaining oil.",
  "Fill the caps, pouring any extra filling around them. Bake for 20–25 minutes until the egg filling is completely set and mushrooms are tender. Put the dish or tray on a stable oven shelf and begin checking towards the end of the stated time. Check the centre as well as the surface; a browned top alone does not show that the inside is cooked. Serve all the mushrooms, filling and edible juices.",
  "Use vegetarian-rennet cheese for the vegetarian version specified here."
],
  "nutrition": {
    "calories": "527 kcal",
    "protein": "24.9 g",
    "carbohydrates": "1.1 g",
    "fat": "47.1 g",
    "fibre": "1.1 g",
    "sodium": "456 mg",
    "potassium": "699 mg",
    "phosphate": "515 mg",
    "salt": "1.14 g"
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
  "id": "salmon-and-egg-bake",
  "code": "D106",
  "category": "Dinner",
  "cuisine": "Simple cooking",
  "mealFamily": "eggs",
  "emoji": "🍽️",
  "image": "/images/recipes/D106.webp",
  "name": "Salmon and egg bake",
  "description": "An individual salmon and egg bake with a golden surface.",
  "cookingTime": "35 mins",
  "calories": "584 kcal",
  "protein": "41.3 g",
  "equipment": "Kitchen scales, knife, chopping board, mixing bowl, oven, baking dish or tray",
  "ingredients": [
    {
      "item": "Farmed salmon fillet, flesh only",
      "shoppingItem": "Farmed salmon fillet, flesh only",
      "quantity": "140 g (raw edible input, skin and bones excluded)"
    },
    {
      "item": "Whole egg, shell removed",
      "shoppingItem": "Whole egg, shell removed",
      "quantity": "100 g (raw edible input)"
    },
    {
      "item": "Unsalted butter",
      "shoppingItem": "Unsalted butter",
      "quantity": "20 g (as sold)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "30 g (weighed grams)"
    }
  ],
  "method": [
  "Heat the oven to 190°C, or 170°C fan. Grease a small baking dish with 5 g of the butter and add the salmon in small pieces.",
  "Beat the weighed egg with the measured water and pour over the salmon. Beat until the mixture has an even colour and consistency, with no long strands of unmixed egg white. Dot with the remaining 15 g butter.",
  "Bake for 22–28 minutes until the egg is completely set and the salmon is opaque and steaming hot. Put the dish or tray on a stable oven shelf and begin checking towards the end of the stated time. Check the centre as well as the surface; a browned top alone does not show that the inside is cooked. Serve the entire bake and edible juices."
],
  "nutrition": {
    "calories": "584 kcal",
    "protein": "41.3 g",
    "carbohydrates": "0.1 g",
    "fat": "46.4 g",
    "fibre": "0.3 g",
    "sodium": "217 mg",
    "potassium": "650 mg",
    "phosphate": "500 mg",
    "salt": "0.54 g"
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
  "id": "beef-patties-with-poached-eggs",
  "code": "D107",
  "category": "Dinner",
  "cuisine": "Simple cooking",
  "mealFamily": "cakes",
  "emoji": "🍽️",
  "image": "/images/recipes/D107.webp",
  "name": "Beef patties with poached eggs",
  "description": "Plain beef patties with poached eggs and warm butter juices.",
  "cookingTime": "35 mins",
  "calories": "581 kcal",
  "protein": "45.1 g",
  "equipment": "Kitchen scales, knife, chopping board, mixing bowl, saucepan or frying pan, steamer, food thermometer",
  "ingredients": [
    {
      "item": "Beef sirloin, lean and edible fat",
      "shoppingItem": "Beef sirloin, lean and edible fat",
      "quantity": "150 g (raw edible input)"
    },
    {
      "item": "Whole egg, shell removed",
      "shoppingItem": "Whole egg, shell removed",
      "quantity": "100 g (raw edible input)"
    },
    {
      "item": "Unsalted butter",
      "shoppingItem": "Unsalted butter",
      "quantity": "20 g (as sold)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "50 g (weighed grams)"
    }
  ],
  "method": [
  "Mince plain sirloin at home and shape into two patties. Melt 10 g of the butter in a non-stick pan and cook for 5–6 minutes per side until the centres reach 75°C for 30 seconds. Swirl the pan as the butter melts to coat its base. Keep it from browning or smoking before the next ingredient is added.",
  "Grease two small heatproof cups with the remaining 10 g butter. Divide the weighed egg and measured water between them and steam over a separate pan of water until fully set, about 8–10 minutes. Keep the food above the water rather than sitting in it, with the lid fitted so steam circulates around the portion. Check the pan does not boil dry without letting water splash onto the food.",
  "Serve all the patties, eggs, butter and edible pan juices."
],
  "nutrition": {
    "calories": "581 kcal",
    "protein": "45.1 g",
    "carbohydrates": "0.1 g",
    "fat": "44.5 g",
    "fibre": "0.0 g",
    "sodium": "251 mg",
    "potassium": "630 mg",
    "phosphate": "454 mg",
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
  "primaryDietCategory": "Carnivore",
  "dietCategories": [
    "Keto",
    "Carnivore"
  ]
},
{
  "id": "chicken-thigh-and-egg-casserole",
  "code": "D108",
  "category": "Dinner",
  "cuisine": "Simple cooking",
  "mealFamily": "eggs",
  "emoji": "🍽️",
  "image": "/images/recipes/D108.webp",
  "name": "Chicken thigh and egg casserole",
  "description": "Chicken thigh pieces baked with egg and butter in a small casserole.",
  "cookingTime": "40 mins",
  "calories": "491 kcal",
  "protein": "46.2 g",
  "equipment": "Kitchen scales, knife, chopping board, mixing bowl, oven, baking dish or tray, food thermometer",
  "ingredients": [
    {
      "item": "Skinless boneless chicken thigh",
      "shoppingItem": "Skinless boneless chicken thigh",
      "quantity": "160 g (raw edible input)"
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
      "quantity": "30 g (weighed grams)"
    }
  ],
  "method": [
  "Heat the oven to 190°C, or 170°C fan. Dice plain skinless boneless chicken thigh and brown in 10 g of the butter for 5 minutes.",
  "Transfer the chicken and all edible juices to a small dish. Beat the weighed egg and water, pour over and dot with the remaining 15 g butter. Beat until the mixture has an even colour and consistency, with no long strands of unmixed egg white.",
  "Bake for 25–30 minutes until the egg is fully set and the chicken centres reach 75°C for 30 seconds. Put the dish or tray on a stable oven shelf and begin checking towards the end of the stated time. Check the centre as well as the surface; a browned top alone does not show that the inside is cooked. Serve the whole casserole and edible juices."
],
  "nutrition": {
    "calories": "491 kcal",
    "protein": "46.2 g",
    "carbohydrates": "0.1 g",
    "fat": "34.0 g",
    "fibre": "0.0 g",
    "sodium": "301 mg",
    "potassium": "776 mg",
    "phosphate": "361 mg",
    "salt": "0.75 g"
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
  "id": "cod-and-salmon-egg-custard",
  "code": "D109",
  "category": "Dinner",
  "cuisine": "Simple cooking",
  "mealFamily": "eggs",
  "emoji": "🍽️",
  "image": "/images/recipes/D109.webp",
  "name": "Cod and salmon egg custard",
  "description": "Cod and salmon pieces in a savoury baked egg custard.",
  "cookingTime": "35 mins",
  "calories": "528 kcal",
  "protein": "46.5 g",
  "equipment": "Kitchen scales, knife, chopping board, mixing bowl, oven, baking dish or tray",
  "ingredients": [
    {
      "item": "Cod fillet, flesh only",
      "shoppingItem": "Cod fillet, flesh only",
      "quantity": "100 g (raw edible input)"
    },
    {
      "item": "Farmed salmon fillet, flesh only",
      "shoppingItem": "Farmed salmon fillet, flesh only",
      "quantity": "80 g (raw edible input, skin and bones excluded)"
    },
    {
      "item": "Whole egg, shell removed",
      "shoppingItem": "Whole egg, shell removed",
      "quantity": "100 g (raw edible input)"
    },
    {
      "item": "Unsalted butter",
      "shoppingItem": "Unsalted butter",
      "quantity": "20 g (as sold)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "40 g (weighed grams)"
    }
  ],
  "method": [
  "Heat the oven to 180°C, or 160°C fan. Grease a small baking dish with 5 g of the butter. Dice the fish and arrange in the dish.",
  "Beat the weighed egg and water and pour over the fish. Beat until the mixture has an even colour and consistency, with no long strands of unmixed egg white. Dot with the remaining 15 g butter.",
  "Bake for 25–30 minutes until the custard is completely set and the fish is opaque and steaming hot. Put the dish or tray on a stable oven shelf and begin checking towards the end of the stated time. Check the centre as well as the surface; a browned top alone does not show that the inside is cooked. Serve the entire dish and edible juices."
],
  "nutrition": {
    "calories": "528 kcal",
    "protein": "46.5 g",
    "carbohydrates": "0.1 g",
    "fat": "38.0 g",
    "fibre": "0.2 g",
    "sodium": "283 mg",
    "potassium": "758 mg",
    "phosphate": "533 mg",
    "salt": "0.71 g"
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
  "id": "chicken-and-potato-frittata-with-carrots",
  "code": "D110",
  "category": "Dinner",
  "cuisine": "Britain",
  "mealFamily": "eggs",
  "emoji": "🍽️",
  "image": "/images/recipes/D110.webp",
  "name": "Chicken and potato frittata with carrots",
  "description": "Chicken and potato baked into a chive frittata, served with tender carrots.",
  "cookingTime": "35 mins",
  "calories": "527 kcal",
  "protein": "39.2 g",
  "equipment": "Kitchen scales, knife, chopping board, mixing bowl, saucepan or frying pan, oven, baking dish or tray, food thermometer",
  "ingredients": [
    {
      "item": "Skinless boneless chicken breast",
      "shoppingItem": "Skinless boneless chicken breast",
      "quantity": "100 g (raw edible input)"
    },
    {
      "item": "Peeled potato, boiled in unsalted water and drained",
      "shoppingItem": "Peeled potato, boiled in unsalted water and drained",
      "quantity": "120 g (cooked drained edible weight)"
    },
    {
      "item": "Whole egg, shell removed",
      "shoppingItem": "Whole egg, shell removed",
      "quantity": "100 g (raw edible input)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "20 g (as sold, weighed grams)"
    },
    {
      "item": "Carrot",
      "shoppingItem": "Carrot",
      "quantity": "60 g (raw edible input)"
    },
    {
      "item": "Fresh chives",
      "shoppingItem": "Fresh chives",
      "quantity": "3 g (raw edible input)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "30 g (weighed grams)"
    },
    {
      "item": "Table salt",
      "shoppingItem": "Table salt",
      "quantity": "0.2 g (dry)"
    }
  ],
  "method": [
  "Heat the oven to 200°C, or 180°C fan. Use peeled potato already boiled without salt and drained; weigh 120 g cooked. Weigh this ingredient after the cooking and draining described here; the same weight of the dry or raw ingredient would make a different portion. Dice the chicken and cook in half the oil for 5 minutes. Check the thickest piece with a clean food thermometer: the centre should reach 75°C for at least 30 seconds. Check more than one piece if their sizes differ, and use clean utensils for the cooked food.",
  "Add sliced cooked potato. Beat the weighed egg, salt and chives, pour over and drizzle with the remaining oil. Beat until the mixture has an even colour and consistency, with no long strands of unmixed egg white. Bake for 15–20 minutes until the egg is fully set and chicken reaches 75°C for 30 seconds. Put the dish or tray on a stable oven shelf and begin checking towards the end of the stated time. Check the centre as well as the surface; a browned top alone does not show that the inside is cooked. Use the measured seasoning and sauces shown in the ingredients; do not add extra salt or a potassium-based salt substitute.",
  "Simmer the sliced carrot in all the measured water in a covered pan until tender, retaining any liquid. Look for small, gentle bubbles rather than a rolling boil. Stir along the bottom when needed to prevent sticking, and keep the heat low enough for the food to cook evenly. Serve the whole frittata with all the carrot and edible juices."
],
  "nutrition": {
    "calories": "527 kcal",
    "protein": "39.2 g",
    "carbohydrates": "23.7 g",
    "fat": "30.5 g",
    "fibre": "4.3 g",
    "sodium": "311 mg",
    "potassium": "1069 mg",
    "phosphate": "448 mg",
    "salt": "0.78 g"
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
  "id": "salmon-with-carrot-rice-and-cucumber-salad",
  "code": "D111",
  "category": "Dinner",
  "cuisine": "Mediterranean",
  "mealFamily": "salad",
  "emoji": "🍽️",
  "image": "/images/recipes/D111.webp",
  "name": "Salmon with carrot rice and cucumber salad",
  "description": "Baked salmon with carrot rice and a small cucumber and parsley salad.",
  "cookingTime": "35 mins",
  "calories": "649 kcal",
  "protein": "27.9 g",
  "equipment": "Kitchen scales, knife, chopping board, mixing bowl, saucepan or frying pan, oven, baking dish or tray",
  "ingredients": [
    {
      "item": "White basmati rice",
      "shoppingItem": "White basmati rice",
      "quantity": "60 g (dry)"
    },
    {
      "item": "Farmed salmon fillet, flesh only",
      "shoppingItem": "Farmed salmon fillet, flesh only",
      "quantity": "110 g (raw edible input, skin and bones excluded)"
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
      "quantity": "120 g (weighed grams)"
    },
    {
      "item": "Table salt",
      "shoppingItem": "Table salt",
      "quantity": "0.2 g (dry)"
    }
  ],
  "method": [
  "Cook the rice and grated carrot with all the measured water in a covered pan for 12–15 minutes, then rest for 5 minutes. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork.",
  "Brush the salmon with half the oil and season with the salt. Bake at 200°C, or 180°C fan, for 12–15 minutes until opaque and steaming hot. Put the dish or tray on a stable oven shelf and begin checking towards the end of the stated time. Check the centre as well as the surface; a browned top alone does not show that the inside is cooked. Use the measured seasoning and sauces shown in the ingredients; do not add extra salt or a potassium-based salt substitute.",
  "Mix the cucumber, parsley, lemon juice and remaining oil. Mix until the added ingredients are evenly distributed. Scrape around the sides of the bowl or pan as appropriate, so the measured mixture is used throughout the serving. Serve all the salmon, edible juices, rice, carrot and salad."
],
  "nutrition": {
    "calories": "649 kcal",
    "protein": "27.9 g",
    "carbohydrates": "49.2 g",
    "fat": "37.2 g",
    "fibre": "2.8 g",
    "sodium": "144 mg",
    "potassium": "593 mg",
    "phosphate": "325 mg",
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
  "primaryDietCategory": "Low FODMAP",
  "dietCategories": [
    "Low FODMAP",
    "Intermittent fasting — eating-window meal"
  ]
},
{
  "id": "turkey-and-chive-meatballs-with-polenta",
  "code": "D112",
  "category": "Dinner",
  "cuisine": "Britain",
  "mealFamily": "plated meal",
  "emoji": "🍽️",
  "image": "/images/recipes/D112.webp",
  "name": "Turkey and chive meatballs with polenta",
  "description": "Plain turkey and chive meatballs with soft polenta and sweet carrots.",
  "cookingTime": "40 mins",
  "calories": "511 kcal",
  "protein": "38.3 g",
  "equipment": "Kitchen scales, knife, chopping board, mixing bowl, saucepan or frying pan, food thermometer",
  "ingredients": [
    {
      "item": "Skinless turkey breast",
      "shoppingItem": "Skinless turkey breast",
      "quantity": "120 g (raw edible input)"
    },
    {
      "item": "Fresh raw egg white, separated from shell eggs",
      "shoppingItem": "Fresh raw egg white, separated from shell eggs",
      "quantity": "40 g (raw edible input)"
    },
    {
      "item": "Fine sifted cornmeal, not self-raising",
      "shoppingItem": "Fine sifted cornmeal, not self-raising",
      "quantity": "45 g (dry edible input)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "180 g (weighed grams)"
    },
    {
      "item": "Carrot",
      "shoppingItem": "Carrot",
      "quantity": "60 g (raw edible input)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "20 g (as sold, weighed grams)"
    },
    {
      "item": "Fresh chives",
      "shoppingItem": "Fresh chives",
      "quantity": "3 g (raw edible input)"
    },
    {
      "item": "Dried thyme",
      "shoppingItem": "Dried thyme",
      "quantity": "0.3 g (dry)"
    },
    {
      "item": "Table salt",
      "shoppingItem": "Table salt",
      "quantity": "0.2 g (dry)"
    }
  ],
  "method": [
  "Mince plain turkey breast at home and mix with the egg white, chives, thyme and half the salt. Shape into five small meatballs. Use the measured seasoning and sauces shown in the ingredients; do not add extra salt or a potassium-based salt substitute.",
  "Bring all the measured water to a simmer and whisk in the cornmeal and remaining salt. Look for small, gentle bubbles rather than a rolling boil. Stir along the bottom when needed to prevent sticking, and keep the heat low enough for the food to cook evenly. Cook over low heat for 20–25 minutes until fully tender, stirring frequently.",
  "Heat all the oil in a non-stick pan. Let the pan warm before the food goes in. If the oil begins to smoke or the food catches immediately, lower the heat before continuing. Cook the meatballs and thinly sliced carrot over medium-low heat for 12–15 minutes, turning and covering briefly, until the carrot is tender and meatball centres reach 75°C for 30 seconds. Serve everything, including edible pan juices."
],
  "nutrition": {
    "calories": "511 kcal",
    "protein": "38.3 g",
    "carbohydrates": "36.0 g",
    "fat": "22.7 g",
    "fibre": "4.3 g",
    "sodium": "236 mg",
    "potassium": "686 mg",
    "phosphate": "347 mg",
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
  "primaryDietCategory": "Low FODMAP",
  "dietCategories": [
    "Low FODMAP"
  ]
},
{
  "id": "steak-and-rice-with-lettuce-and-carrots",
  "code": "D113",
  "category": "Dinner",
  "cuisine": "South America",
  "mealFamily": "salad",
  "emoji": "🍽️",
  "image": "/images/recipes/D113.webp",
  "name": "Steak and rice with lettuce and carrots",
  "description": "Seared steak with rice and a fresh lettuce, carrot and chive salad.",
  "cookingTime": "35 mins",
  "calories": "648 kcal",
  "protein": "31.5 g",
  "equipment": "Kitchen scales, knife, chopping board, mixing bowl, saucepan or frying pan",
  "ingredients": [
    {
      "item": "Beef sirloin, lean and edible fat",
      "shoppingItem": "Beef sirloin, lean and edible fat",
      "quantity": "120 g (raw edible input)"
    },
    {
      "item": "White basmati rice",
      "shoppingItem": "White basmati rice",
      "quantity": "60 g (dry)"
    },
    {
      "item": "Carrot",
      "shoppingItem": "Carrot",
      "quantity": "30 g (raw edible input)"
    },
    {
      "item": "Lettuce",
      "shoppingItem": "Lettuce",
      "quantity": "40 g (raw edible input)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "20 g (as sold, weighed grams)"
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
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "120 g (weighed grams)"
    },
    {
      "item": "Table salt",
      "shoppingItem": "Table salt",
      "quantity": "0.2 g (dry)"
    }
  ],
  "method": [
  "Cook the rice with all the measured water in a covered pan for 12–15 minutes, then rest for 5 minutes. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork.",
  "Heat half the oil in a non-stick pan. Let the pan warm before the food goes in. If the oil begins to smoke or the food catches immediately, lower the heat before continuing. Season the steak with the salt, sear all its surfaces and cook to preference. Rest for 3 minutes, retaining edible juices. Use the measured seasoning and sauces shown in the ingredients; do not add extra salt or a potassium-based salt substitute.",
  "Toss shredded lettuce and grated carrot with the remaining oil, lemon juice and chives. Serve all the steak, juices, rice and salad."
],
  "nutrition": {
    "calories": "648 kcal",
    "protein": "31.5 g",
    "carbohydrates": "48.7 g",
    "fat": "35.7 g",
    "fibre": "2.5 g",
    "sodium": "170 mg",
    "potassium": "594 mg",
    "phosphate": "293 mg",
    "salt": "0.43 g"
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
    "Low FODMAP",
    "Intermittent fasting — eating-window meal"
  ]
},
{
  "id": "crisp-cod-with-basil-polenta-and-carrots",
  "code": "D114",
  "category": "Dinner",
  "cuisine": "Italy",
  "mealFamily": "plated meal",
  "emoji": "🍽️",
  "image": "/images/recipes/D114.webp",
  "name": "Crisp cod with basil polenta and carrots",
  "description": "Rice-flour-crusted cod with soft basil polenta and warm carrots.",
  "cookingTime": "40 mins",
  "calories": "552 kcal",
  "protein": "29.4 g",
  "equipment": "Kitchen scales, knife, chopping board, mixing bowl, saucepan or frying pan, steamer",
  "ingredients": [
    {
      "item": "Cod fillet, flesh only",
      "shoppingItem": "Cod fillet, flesh only",
      "quantity": "120 g (raw edible input)"
    },
    {
      "item": "White rice flour",
      "shoppingItem": "White rice flour",
      "quantity": "15 g (dry edible input)"
    },
    {
      "item": "Fresh raw egg white, separated from shell eggs",
      "shoppingItem": "Fresh raw egg white, separated from shell eggs",
      "quantity": "30 g (raw edible input)"
    },
    {
      "item": "Fine sifted cornmeal, not self-raising",
      "shoppingItem": "Fine sifted cornmeal, not self-raising",
      "quantity": "40 g (dry edible input)"
    },
    {
      "item": "Carrot",
      "shoppingItem": "Carrot",
      "quantity": "60 g (raw edible input)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "25 g (as sold, weighed grams)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "170 g (weighed grams)"
    },
    {
      "item": "Fresh lemon juice",
      "shoppingItem": "Fresh lemon juice",
      "quantity": "10 g (freshly squeezed, weighed grams)"
    },
    {
      "item": "Fresh basil",
      "shoppingItem": "Fresh basil",
      "quantity": "3 g (raw edible input)"
    },
    {
      "item": "Table salt",
      "shoppingItem": "Table salt",
      "quantity": "0.2 g (dry)"
    }
  ],
  "method": [
  "Bring 160 g of the water to a simmer. Look for small, gentle bubbles rather than a rolling boil. Stir along the bottom when needed to prevent sticking, and keep the heat low enough for the food to cook evenly. Whisk in the cornmeal and half the salt and cook gently for 20–25 minutes, stirring often, until tender. Stir in the basil at the end. Use the measured seasoning and sauces shown in the ingredients; do not add extra salt or a potassium-based salt substitute.",
  "Mix the egg white and remaining 10 g water. Dip the cod into it, then coat with all the rice flour. Keep any leftover coating mixture for the pan.",
  "Heat 20 g of the oil in a non-stick pan. Let the pan warm before the food goes in. If the oil begins to smoke or the food catches immediately, lower the heat before continuing. Cook the fish and any remaining coating for 4–5 minutes per side until the fish is opaque and steaming hot and the coating is fully cooked.",
  "Steam the carrot until tender and toss with the remaining 5 g oil, lemon juice and salt. Keep the food above the water rather than sitting in it, with the lid fitted so steam circulates around the portion. Check the pan does not boil dry without letting water splash onto the food. Serve all the fish, coating, edible pan juices, polenta and carrots."
],
  "nutrition": {
    "calories": "552 kcal",
    "protein": "29.4 g",
    "carbohydrates": "43.5 g",
    "fat": "27.4 g",
    "fibre": "4.3 g",
    "sodium": "267 mg",
    "potassium": "664 mg",
    "phosphate": "285 mg",
    "salt": "0.67 g"
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
  "id": "ginger-egg-and-carrot-fried-rice",
  "code": "D115",
  "category": "Dinner",
  "cuisine": "East Asia",
  "mealFamily": "rice",
  "emoji": "🍽️",
  "image": "/images/recipes/D115.webp",
  "name": "Ginger egg and carrot fried rice",
  "description": "Freshly cooked rice stir-fried with egg, carrots, spinach, ginger and chives.",
  "cookingTime": "35 mins",
  "calories": "587 kcal",
  "protein": "29.2 g",
  "equipment": "Kitchen scales, knife, chopping board, mixing bowl, saucepan or frying pan",
  "ingredients": [
    {
      "item": "Whole egg, shell removed",
      "shoppingItem": "Whole egg, shell removed",
      "quantity": "100 g (raw edible input)"
    },
    {
      "item": "Fresh raw egg white, separated from shell eggs",
      "shoppingItem": "Fresh raw egg white, separated from shell eggs",
      "quantity": "100 g (raw edible input)"
    },
    {
      "item": "White basmati rice",
      "shoppingItem": "White basmati rice",
      "quantity": "60 g (dry)"
    },
    {
      "item": "Carrot",
      "shoppingItem": "Carrot",
      "quantity": "50 g (raw edible input)"
    },
    {
      "item": "Baby spinach",
      "shoppingItem": "Baby spinach",
      "quantity": "20 g (raw edible input)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "20 g (as sold, weighed grams)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "120 g (weighed grams)"
    },
    {
      "item": "Fresh ginger",
      "shoppingItem": "Fresh ginger",
      "quantity": "3 g (raw edible input)"
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
  "Cook the rice with all the measured water in a covered pan for 12–15 minutes. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork. Rest for 5 minutes, then spread on a clean plate while preparing the remaining ingredients; use immediately.",
  "Heat half the oil in a wok. Add the weighed egg and egg white and stir until fully set. Transfer to a bowl with all edible juices. Use the measured seasoning and sauces shown in the ingredients; do not add extra salt or a potassium-based salt substitute.",
  "Heat the remaining oil. Stir-fry grated carrot and ginger for 3 minutes, then add spinach, rice, salt and cooked egg. Toss over high heat until steaming hot throughout. Add the chives and serve the entire portion."
],
  "nutrition": {
    "calories": "587 kcal",
    "protein": "29.2 g",
    "carbohydrates": "49.7 g",
    "fat": "29.6 g",
    "fibre": "2.9 g",
    "sodium": "443 mg",
    "potassium": "587 mg",
    "phosphate": "271 mg",
    "salt": "1.11 g"
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
  "id": "spiced-lentil-and-brown-rice-pilaf",
  "code": "D116",
  "category": "Dinner",
  "cuisine": "West Africa",
  "mealFamily": "rice",
  "emoji": "🍽️",
  "image": "/images/recipes/D116.webp",
  "name": "Spiced lentil and brown rice pilaf",
  "description": "A gently spiced brown rice and lentil pilaf with carrots and cabbage.",
  "cookingTime": "45 mins",
  "calories": "513 kcal",
  "protein": "16.0 g",
  "equipment": "Kitchen scales, knife, chopping board, mixing bowl, saucepan or frying pan",
  "ingredients": [
    {
      "item": "Wholegrain brown basmati rice",
      "shoppingItem": "Wholegrain brown basmati rice",
      "quantity": "40 g (dry edible input)"
    },
    {
      "item": "White basmati rice",
      "shoppingItem": "White basmati rice",
      "quantity": "25 g (dry)"
    },
    {
      "item": "Dried split red lentils",
      "shoppingItem": "Dried split red lentils",
      "quantity": "35 g (dry edible input)"
    },
    {
      "item": "Carrot",
      "shoppingItem": "Carrot",
      "quantity": "50 g (raw edible input)"
    },
    {
      "item": "White cabbage",
      "shoppingItem": "White cabbage",
      "quantity": "60 g (raw edible input)"
    },
    {
      "item": "Rapeseed oil",
      "shoppingItem": "Rapeseed oil",
      "quantity": "15 g (as sold, weighed grams)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "250 g (weighed grams)"
    },
    {
      "item": "Ground cumin",
      "shoppingItem": "Ground cumin",
      "quantity": "1 g (dry)"
    },
    {
      "item": "Sweet paprika",
      "shoppingItem": "Sweet paprika",
      "quantity": "1 g (dry)"
    },
    {
      "item": "Fresh ginger",
      "shoppingItem": "Fresh ginger",
      "quantity": "3 g (raw edible input)"
    },
    {
      "item": "Fresh coriander leaves",
      "shoppingItem": "Fresh coriander leaves",
      "quantity": "4 g (raw edible input)"
    }
  ],
  "method": [
  "Cook the brown rice with 130 g of the water, covered, for 15 minutes. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork. Rinse the white rice and red lentils.",
  "Heat the oil in a second pan. Cook finely shredded carrot, cabbage and ginger for 4 minutes. Stir in cumin and paprika for 30 seconds. Use the listed herbs, spices or citrus for flavour before considering any extra seasoning.",
  "Add all the partially cooked brown rice and its liquid, white rice, lentils and remaining 120 g water. Cover and simmer for 20–25 minutes until all grains and lentils are tender. Stir in the coriander and serve the entire portion."
],
  "nutrition": {
    "calories": "513 kcal",
    "protein": "16.0 g",
    "carbohydrates": "71.0 g",
    "fat": "17.6 g",
    "fibre": "12.1 g",
    "sodium": "33 mg",
    "potassium": "660 mg",
    "phosphate": "306 mg",
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
  "primaryDietCategory": "DASH-style",
  "dietCategories": [
    "Vegan",
    "Vegetarian",
    "DASH-style"
  ]
},
{
  "id": "lemon-seitan-with-white-bean-barley-pilaf",
  "code": "D117",
  "category": "Dinner",
  "cuisine": "Mediterranean",
  "mealFamily": "rice",
  "emoji": "🍽️",
  "image": "/images/recipes/D117.webp",
  "name": "Lemon seitan with white-bean barley pilaf",
  "description": "Homemade lemon seitan with pearl barley, white beans and sweet vegetables.",
  "cookingTime": "45 mins",
  "calories": "522 kcal",
  "protein": "28.5 g",
  "equipment": "Kitchen scales, knife, chopping board, mixing bowl, saucepan or frying pan, steamer",
  "ingredients": [
    {
      "item": "Pure vital wheat gluten powder",
      "shoppingItem": "Pure vital wheat gluten powder",
      "quantity": "25 g (dry edible input)"
    },
    {
      "item": "Pearl barley",
      "shoppingItem": "Pearl barley",
      "quantity": "50 g (dry edible input)"
    },
    {
      "item": "Navy beans, boiled without salt and drained",
      "shoppingItem": "Navy beans, boiled without salt and drained",
      "quantity": "60 g (cooked drained edible weight)"
    },
    {
      "item": "Carrot",
      "shoppingItem": "Carrot",
      "quantity": "50 g (raw edible input)"
    },
    {
      "item": "Red bell pepper",
      "shoppingItem": "Red bell pepper",
      "quantity": "50 g (raw edible input)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "15 g (as sold, weighed grams)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "215 g (weighed grams)"
    },
    {
      "item": "Fresh lemon juice",
      "shoppingItem": "Fresh lemon juice",
      "quantity": "20 g (freshly squeezed, weighed grams)"
    },
    {
      "item": "Fresh parsley",
      "shoppingItem": "Fresh parsley",
      "quantity": "4 g (raw edible input)"
    },
    {
      "item": "Ground black pepper",
      "shoppingItem": "Ground black pepper",
      "quantity": "0.2 g (dry)"
    }
  ],
  "method": [
  "Mix the vital wheat gluten with 35 g of the water. Knead for 2 minutes, rest for 5 minutes, flatten to 1 cm thick and steam over a separate pan of water for 20–25 minutes until firm and cooked throughout. Scrape dry patches from the bowl into the mixture and work them in with your hands. Keep to the measured dry ingredients and liquid; unmeasured additions change the portion and can make the dough tough. Use the measured seasoning and sauces shown in the ingredients; do not add extra salt or a potassium-based salt substitute.",
  "Keep the food above the water rather than sitting in it, with the lid fitted so steam circulates around the portion. Check the pan does not boil dry without letting water splash onto the food. Retain the whole seitan portion.",
  "Meanwhile simmer the dry barley with the remaining 180 g water, covered, for 30–35 minutes until tender, retaining any liquid.",
  "Finely dice the carrot and pepper and cook in all the oil in a covered pan for 8–10 minutes until tender. Keep the pieces a similar size so they cook evenly. Keep any ingredients that are added later separate from those that go into the pan first. Add the cooked, drained navy beans and diced cooked seitan and heat through.",
  "Fold all the barley and its liquid into the vegetables with the lemon juice, parsley and pepper. Use a fork or broad spoon and a light lifting motion so the grains stay separate. Work gently from the bottom of the bowl without pressing or mashing the grains. Serve the entire portion."
],
  "nutrition": {
    "calories": "522 kcal",
    "protein": "28.5 g",
    "carbohydrates": "57.0 g",
    "fat": "17.0 g",
    "fibre": "17.5 g",
    "sodium": "33 mg",
    "potassium": "649 mg",
    "phosphate": "280 mg",
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
  "primaryDietCategory": "DASH-style",
  "dietCategories": [
    "Vegan",
    "Vegetarian",
    "Mediterranean-style",
    "DASH-style"
  ]
},
{
  "id": "turkey-with-brown-rice-and-herb-vegetables",
  "code": "D118",
  "category": "Dinner",
  "cuisine": "Britain",
  "mealFamily": "rice",
  "emoji": "🍽️",
  "image": "/images/recipes/D118.webp",
  "name": "Turkey with brown rice and herb vegetables",
  "description": "Turkey strips with mixed brown rice and softly cooked herb vegetables.",
  "cookingTime": "45 mins",
  "calories": "518 kcal",
  "protein": "33.6 g",
  "equipment": "Kitchen scales, knife, chopping board, mixing bowl, saucepan or frying pan, food thermometer",
  "ingredients": [
    {
      "item": "Skinless turkey breast",
      "shoppingItem": "Skinless turkey breast",
      "quantity": "110 g (raw edible input)"
    },
    {
      "item": "Wholegrain brown basmati rice",
      "shoppingItem": "Wholegrain brown basmati rice",
      "quantity": "40 g (dry edible input)"
    },
    {
      "item": "White basmati rice",
      "shoppingItem": "White basmati rice",
      "quantity": "25 g (dry)"
    },
    {
      "item": "Carrot",
      "shoppingItem": "Carrot",
      "quantity": "60 g (raw edible input)"
    },
    {
      "item": "White cabbage",
      "shoppingItem": "White cabbage",
      "quantity": "60 g (raw edible input)"
    },
    {
      "item": "Rapeseed oil",
      "shoppingItem": "Rapeseed oil",
      "quantity": "15 g (as sold, weighed grams)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "150 g (weighed grams)"
    },
    {
      "item": "Dried thyme",
      "shoppingItem": "Dried thyme",
      "quantity": "0.5 g (dry)"
    },
    {
      "item": "Fresh lemon juice",
      "shoppingItem": "Fresh lemon juice",
      "quantity": "15 g (freshly squeezed, weighed grams)"
    },
    {
      "item": "Ground black pepper",
      "shoppingItem": "Ground black pepper",
      "quantity": "0.2 g (dry)"
    }
  ],
  "method": [
  "Simmer the brown rice in 100 g of the water for 15 minutes. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork. Add the white rice and remaining 50 g water and cook covered for another 12–15 minutes until tender, retaining any liquid. Use the listed herbs, spices or citrus for flavour before considering any extra seasoning.",
  "Slice the turkey and vegetables thinly. Keep the pieces a similar size so they cook evenly. Keep any ingredients that are added later separate from those that go into the pan first. Cook in all the oil with the thyme and pepper over medium-low heat for 10–12 minutes until vegetables are tender and turkey centres reach 75°C for 30 seconds.",
  "Stir in the lemon juice and serve all the turkey, vegetables and edible juices with all the rice. Mix until the added ingredients are evenly distributed. Scrape around the sides of the bowl or pan as appropriate, so the measured mixture is used throughout the serving."
],
  "nutrition": {
    "calories": "518 kcal",
    "protein": "33.6 g",
    "carbohydrates": "55.1 g",
    "fat": "17.6 g",
    "fibre": "6.0 g",
    "sodium": "83 mg",
    "potassium": "775 mg",
    "phosphate": "430 mg",
    "salt": "0.21 g"
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
    "DASH-style"
  ]
},
{
  "id": "tofu-white-bean-and-barley-bake",
  "code": "D119",
  "category": "Dinner",
  "cuisine": "Italy",
  "mealFamily": "plated meal",
  "emoji": "🍽️",
  "image": "/images/recipes/D119.webp",
  "name": "Tofu, white-bean and barley bake",
  "description": "Tofu, white beans and pearl barley baked with tomatoes, courgettes and basil.",
  "cookingTime": "55 mins",
  "calories": "532 kcal",
  "protein": "22.3 g",
  "equipment": "Kitchen scales, knife, chopping board, mixing bowl, saucepan or frying pan, oven, baking dish or tray",
  "ingredients": [
    {
      "item": "Regular tofu, made with calcium sulphate, gently drained",
      "shoppingItem": "Regular tofu, made with calcium sulphate, gently drained",
      "quantity": "140 g (as sold edible weight, unpressed)"
    },
    {
      "item": "Navy beans, boiled without salt and drained",
      "shoppingItem": "Navy beans, boiled without salt and drained",
      "quantity": "70 g (cooked drained edible weight)"
    },
    {
      "item": "Pearl barley",
      "shoppingItem": "Pearl barley",
      "quantity": "45 g (dry edible input)"
    },
    {
      "item": "Fresh tomato",
      "shoppingItem": "Fresh tomato",
      "quantity": "70 g (raw edible input)"
    },
    {
      "item": "Courgette",
      "shoppingItem": "Courgette",
      "quantity": "60 g (raw edible input)"
    },
    {
      "item": "Rapeseed oil",
      "shoppingItem": "Rapeseed oil",
      "quantity": "15 g (as sold, weighed grams)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "160 g (weighed grams)"
    },
    {
      "item": "Garlic",
      "shoppingItem": "Garlic",
      "quantity": "2 g (raw edible input)"
    },
    {
      "item": "Fresh basil",
      "shoppingItem": "Fresh basil",
      "quantity": "4 g (raw edible input)"
    },
    {
      "item": "Onion",
      "shoppingItem": "Onion",
      "quantity": "20 g (raw edible input)"
    },
    {
      "item": "Ground black pepper",
      "shoppingItem": "Ground black pepper",
      "quantity": "0.2 g (dry)"
    }
  ],
  "method": [
  "Simmer the dry barley with all the measured water, covered, for 30–35 minutes until tender, keeping any liquid.",
  "Heat the oven to 200°C, or 180°C fan. Soften finely chopped onion, garlic and courgette in the oil for 6 minutes. Stir around the base and edges of the pan. The vegetables should soften and lose their raw bite; lower the heat if they start to darken before they are tender. Add chopped tomato and pepper and simmer for 5 minutes. Look for small, gentle bubbles rather than a rolling boil. Stir along the bottom when needed to prevent sticking, and keep the heat low enough for the food to cook evenly. Use the measured seasoning and sauces shown in the ingredients; do not add extra salt or a potassium-based salt substitute.",
  "Use regular calcium-sulphate tofu, gently drained without pressing. Fold the weighed tofu, cooked drained navy beans, basil and all the barley and liquid into the vegetables. Use a fork or broad spoon and a light lifting motion so the grains stay separate. Work gently from the bottom of the bowl without pressing or mashing the grains.",
  "Transfer the entire mixture to a small dish and bake covered for 15 minutes until steaming hot. Put the dish or tray on a stable oven shelf and begin checking towards the end of the stated time. Check the centre as well as the surface; a browned top alone does not show that the inside is cooked. Serve the whole bake."
],
  "nutrition": {
    "calories": "532 kcal",
    "protein": "22.3 g",
    "carbohydrates": "52.9 g",
    "fat": "23.1 g",
    "fibre": "16.4 g",
    "sodium": "20 mg",
    "potassium": "979 mg",
    "phosphate": "380 mg",
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
  "primaryDietCategory": "DASH-style",
  "dietCategories": [
    "Vegan",
    "Vegetarian",
    "DASH-style"
  ]
},
{
  "id": "spinach-and-egg-brown-rice-bake",
  "code": "D120",
  "category": "Dinner",
  "cuisine": "Britain",
  "mealFamily": "rice",
  "emoji": "🍽️",
  "image": "/images/recipes/D120.webp",
  "name": "Spinach and egg brown rice bake",
  "description": "Brown rice baked with spinach, carrots and egg, with chive yoghurt.",
  "cookingTime": "50 mins",
  "calories": "555 kcal",
  "protein": "33.4 g",
  "equipment": "Kitchen scales, knife, chopping board, mixing bowl, saucepan or frying pan, oven, baking dish or tray",
  "ingredients": [
    {
      "item": "Whole egg, shell removed",
      "shoppingItem": "Whole egg, shell removed",
      "quantity": "50 g (raw edible input)"
    },
    {
      "item": "Fresh raw egg white, separated from shell eggs",
      "shoppingItem": "Fresh raw egg white, separated from shell eggs",
      "quantity": "160 g (raw edible input)"
    },
    {
      "item": "Wholegrain brown basmati rice",
      "shoppingItem": "Wholegrain brown basmati rice",
      "quantity": "45 g (dry edible input)"
    },
    {
      "item": "White basmati rice",
      "shoppingItem": "White basmati rice",
      "quantity": "20 g (dry)"
    },
    {
      "item": "Baby spinach",
      "shoppingItem": "Baby spinach",
      "quantity": "40 g (raw edible input)"
    },
    {
      "item": "Carrot",
      "shoppingItem": "Carrot",
      "quantity": "40 g (raw edible input)"
    },
    {
      "item": "Rapeseed oil",
      "shoppingItem": "Rapeseed oil",
      "quantity": "15 g (as sold, weighed grams)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "150 g (weighed grams)"
    },
    {
      "item": "Plain low-fat yoghurt, about 1% fat",
      "shoppingItem": "Plain low-fat yoghurt, about 1% fat",
      "quantity": "60 g (as sold edible weight)"
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
  "Simmer the brown rice in 105 g of the water for 15 minutes. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork. Add the white rice and remaining 45 g water and cook covered for another 12–15 minutes until tender. Use the listed herbs, spices or citrus for flavour before considering any extra seasoning.",
  "Heat the oven to 190°C, or 170°C fan. Finely grate the carrot and chop the spinach. Cook in the oil for 5 minutes, then mix with all the rice and any liquid.",
  "Beat the weighed whole egg and egg white with the pepper and mix through the warm rice. Beat until the mixture has an even colour and consistency, with no long strands of unmixed egg white. Put in a small dish and bake for 18–22 minutes until fully set and steaming hot. Put the dish or tray on a stable oven shelf and begin checking towards the end of the stated time. Check the centre as well as the surface; a browned top alone does not show that the inside is cooked.",
  "Mix the yoghurt and chives and serve with the entire bake."
],
  "nutrition": {
    "calories": "555 kcal",
    "protein": "33.4 g",
    "carbohydrates": "54.7 g",
    "fat": "22.0 g",
    "fibre": "3.8 g",
    "sodium": "440 mg",
    "potassium": "920 mg",
    "phosphate": "380 mg",
    "salt": "1.10 g"
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
  "id": "lentil-and-walnut-bobotie-with-rice",
  "code": "D121",
  "category": "Dinner",
  "cuisine": "South Africa",
  "mealFamily": "pie",
  "emoji": "🍽️",
  "image": "/images/recipes/D121.webp",
  "name": "Lentil and walnut bobotie with rice",
  "description": "A substantial lentil and walnut bobotie with apple, raisins, a golden egg topping and rice.",
  "cookingTime": "55 mins",
  "calories": "852 kcal",
  "protein": "35.8 g",
  "equipment": "Kitchen scales, knife, chopping board, mixing bowl, oven, baking dish or tray",
  "ingredients": [
    {
      "item": "Green or brown lentils, boiled without salt and drained",
      "shoppingItem": "Green or brown lentils, boiled without salt and drained",
      "quantity": "150 g (cooked drained edible weight)"
    },
    {
      "item": "White basmati rice",
      "shoppingItem": "White basmati rice",
      "quantity": "55 g (dry)"
    },
    {
      "item": "Whole egg, shell removed",
      "shoppingItem": "Whole egg, shell removed",
      "quantity": "50 g (raw edible input)"
    },
    {
      "item": "Fresh raw egg white, separated from shell eggs",
      "shoppingItem": "Fresh raw egg white, separated from shell eggs",
      "quantity": "60 g (raw edible input)"
    },
    {
      "item": "Whole milk",
      "shoppingItem": "Whole milk",
      "quantity": "50 g (as sold, weighed grams)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "20 g (as sold, weighed grams)"
    },
    {
      "item": "Unsalted walnut kernels",
      "shoppingItem": "Unsalted walnut kernels",
      "quantity": "15 g (as sold edible weight)"
    },
    {
      "item": "Onion",
      "shoppingItem": "Onion",
      "quantity": "30 g (raw edible input)"
    },
    {
      "item": "Eating apple, flesh and skin, core removed",
      "shoppingItem": "Eating apple, flesh and skin, core removed",
      "quantity": "40 g (raw edible input)"
    },
    {
      "item": "Raisins",
      "shoppingItem": "Raisins",
      "quantity": "10 g (dry as sold)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "125 g (weighed grams)"
    },
    {
      "item": "Ground cumin",
      "shoppingItem": "Ground cumin",
      "quantity": "0.5 g (dry)"
    },
    {
      "item": "Ground coriander seed",
      "shoppingItem": "Ground coriander seed",
      "quantity": "0.5 g (dry)"
    },
    {
      "item": "Ground turmeric",
      "shoppingItem": "Ground turmeric",
      "quantity": "0.5 g (dry)"
    },
    {
      "item": "Ground cinnamon",
      "shoppingItem": "Ground cinnamon",
      "quantity": "0.3 g (dry)"
    },
    {
      "item": "Plain unseasoned vinegar",
      "shoppingItem": "Plain unseasoned vinegar",
      "quantity": "15 g (as sold, weighed grams)"
    },
    {
      "item": "White crusty bloomer bread, egg- and dairy-free",
      "shoppingItem": "White crusty bloomer bread, egg- and dairy-free",
      "quantity": "20 g (as sold edible weight)"
    },
    {
      "item": "Ground black pepper",
      "shoppingItem": "Ground black pepper",
      "quantity": "0.2 g (dry)"
    }
  ],
  "method": [
  "Heat the oven to 190°C, or 170°C fan. Soak the bread in 25 g of the milk, retaining all the milk. Cook the rice with all the measured water, covered, for 12–15 minutes, then rest for 5 minutes. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork.",
  "Soften chopped onion and grated cored apple in the oil for 6 minutes. Stir around the base and edges of the pan. The vegetables should soften and lose their raw bite; lower the heat if they start to darken before they are tender. Add all the spices, vinegar, raisins, chopped walnuts, cooked drained lentils, soaked bread and milk, and pepper. Cook for 3 minutes. Use the measured seasoning and sauces shown in the ingredients; do not add extra salt or a potassium-based salt substitute.",
  "Transfer the entire filling to a small dish. Beat the weighed whole egg and egg white with the remaining 25 g milk and pour over. Beat until the mixture has an even colour and consistency, with no long strands of unmixed egg white. Bake for 25–30 minutes until completely set and steaming hot. Put the dish or tray on a stable oven shelf and begin checking towards the end of the stated time.",
  "Check the centre as well as the surface; a browned top alone does not show that the inside is cooked. Serve the whole bake with all the rice."
],
  "nutrition": {
    "calories": "852 kcal",
    "protein": "35.8 g",
    "carbohydrates": "87.7 g",
    "fat": "38.8 g",
    "fibre": "15.3 g",
    "sodium": "301 mg",
    "potassium": "889 mg",
    "phosphate": "456 mg",
    "salt": "0.75 g"
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
    "Intermittent fasting — eating-window meal"
  ]
},
{
  "id": "white-bean-and-ricotta-stuffed-peppers-with-rice",
  "code": "D122",
  "category": "Dinner",
  "cuisine": "Italy",
  "mealFamily": "rice",
  "emoji": "🍽️",
  "image": "/images/recipes/D122.webp",
  "name": "White-bean and ricotta stuffed peppers with rice",
  "description": "Roasted peppers with rice, white beans, ricotta and a crunchy walnut topping.",
  "cookingTime": "50 mins",
  "calories": "787 kcal",
  "protein": "23.6 g",
  "equipment": "Kitchen scales, knife, chopping board, mixing bowl, saucepan or frying pan, oven, baking dish or tray",
  "ingredients": [
    {
      "item": "White basmati rice",
      "shoppingItem": "White basmati rice",
      "quantity": "60 g (dry)"
    },
    {
      "item": "Navy beans, boiled without salt and drained",
      "shoppingItem": "Navy beans, boiled without salt and drained",
      "quantity": "120 g (cooked drained edible weight)"
    },
    {
      "item": "Red bell pepper",
      "shoppingItem": "Red bell pepper",
      "quantity": "150 g (raw edible input)"
    },
    {
      "item": "Vegetarian-rennet ricotta",
      "shoppingItem": "Vegetarian-rennet ricotta",
      "quantity": "50 g (as sold)"
    },
    {
      "item": "Unsalted walnut kernels",
      "shoppingItem": "Unsalted walnut kernels",
      "quantity": "15 g (as sold edible weight)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "20 g (as sold, weighed grams)"
    },
    {
      "item": "Onion",
      "shoppingItem": "Onion",
      "quantity": "30 g (raw edible input)"
    },
    {
      "item": "Fresh tomato",
      "shoppingItem": "Fresh tomato",
      "quantity": "60 g (raw edible input)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "140 g (weighed grams)"
    },
    {
      "item": "Fresh basil",
      "shoppingItem": "Fresh basil",
      "quantity": "5 g (raw edible input)"
    },
    {
      "item": "Ground black pepper",
      "shoppingItem": "Ground black pepper",
      "quantity": "0.2 g (dry)"
    }
  ],
  "method": [
  "Heat the oven to 200°C, or 180°C fan. Halve and deseed the pepper, weigh 150 g edible halves and brush with 5 g of the oil. Roast for 15 minutes.",
  "Cook the rice with all the measured water in a covered pan for 12–15 minutes. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork. Soften chopped onion and tomato in the remaining 15 g oil for 8 minutes. Stir around the base and edges of the pan. The vegetables should soften and lose their raw bite; lower the heat if they start to darken before they are tender. Use the measured seasoning and sauces shown in the ingredients; do not add extra salt or a potassium-based salt substitute.",
  "Mix all the rice and its liquid, cooked drained navy beans, ricotta, basil and pepper with the tomato mixture. Fill the peppers, spooning all excess filling around them. Add all the chopped walnuts.",
  "Cover and bake for 15 minutes, then uncover for 5 minutes until tender and steaming hot. Put the dish or tray on a stable oven shelf and begin checking towards the end of the stated time. Check the centre as well as the surface; a browned top alone does not show that the inside is cooked. Serve the entire dish.",
  "Use vegetarian-rennet cheese for the vegetarian version specified here."
],
  "nutrition": {
    "calories": "787 kcal",
    "protein": "23.6 g",
    "carbohydrates": "76.6 g",
    "fat": "37.2 g",
    "fibre": "19.0 g",
    "sodium": "61 mg",
    "potassium": "1152 mg",
    "phosphate": "432 mg",
    "salt": "0.15 g"
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
  "id": "peanut-and-lime-fish-noodles",
  "code": "D123",
  "category": "Dinner",
  "cuisine": "Thailand",
  "mealFamily": "pasta",
  "emoji": "🍽️",
  "image": "/images/recipes/D123.webp",
  "name": "Peanut and lime fish noodles",
  "description": "Fish and rice noodles with warm vegetables and a rich peanut and lime sauce.",
  "cookingTime": "35 mins",
  "calories": "744 kcal",
  "protein": "32.6 g",
  "equipment": "Kitchen scales, knife, chopping board, mixing bowl, saucepan or frying pan, blender",
  "ingredients": [
    {
      "item": "Cod fillet, flesh only",
      "shoppingItem": "Cod fillet, flesh only",
      "quantity": "120 g (raw edible input)"
    },
    {
      "item": "Rice noodles",
      "shoppingItem": "Rice noodles",
      "quantity": "65 g (dry)"
    },
    {
      "item": "Unsalted dry-roasted peanuts",
      "shoppingItem": "Unsalted dry-roasted peanuts",
      "quantity": "25 g (as sold edible weight)"
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
      "item": "White cabbage",
      "shoppingItem": "White cabbage",
      "quantity": "80 g (raw edible input)"
    },
    {
      "item": "Carrot",
      "shoppingItem": "Carrot",
      "quantity": "50 g (raw edible input)"
    },
    {
      "item": "Fresh lime juice",
      "shoppingItem": "Fresh lime juice",
      "quantity": "25 g (freshly squeezed, weighed grams)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "50 g (weighed grams)"
    },
    {
      "item": "Fresh ginger",
      "shoppingItem": "Fresh ginger",
      "quantity": "5 g (raw edible input)"
    },
    {
      "item": "Soy sauce",
      "shoppingItem": "Soy sauce",
      "quantity": "5 g (as sold, weighed grams)"
    },
    {
      "item": "Fresh coriander leaves",
      "shoppingItem": "Fresh coriander leaves",
      "quantity": "5 g (raw edible input)"
    }
  ],
  "method": [
  "Cook the noodles in a separate pan of unsalted water according to the packet and drain. Separate the pasta or noodles as they soften so they do not stick together. Check the texture towards the end of the cooking time; it should be tender with no chalky centre. Blend the peanuts, sesame oil, lime juice, measured water, ginger and soy sauce.",
  "Heat the rapeseed oil in a covered non-stick pan. Let the pan warm before the food goes in. If the oil begins to smoke or the food catches immediately, lower the heat before continuing. Add finely shredded cabbage and carrot and cook over medium-low heat for 6 minutes. Use the measured seasoning and sauces shown in the ingredients; do not add extra salt or a potassium-based salt substitute.",
  "Add the cod in small pieces and all the peanut sauce. Cover and simmer gently for 6–8 minutes until the fish is opaque and steaming hot. Look for small, gentle bubbles rather than a rolling boil. Stir along the bottom when needed to prevent sticking, and keep the heat low enough for the food to cook evenly. Fold in all the noodles and coriander and serve the entire portion."
],
  "nutrition": {
    "calories": "744 kcal",
    "protein": "32.6 g",
    "carbohydrates": "63.5 g",
    "fat": "38.8 g",
    "fibre": "7.8 g",
    "sodium": "528 mg",
    "potassium": "919 mg",
    "phosphate": "430 mg",
    "salt": "1.32 g"
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
    "Intermittent fasting — eating-window meal"
  ]
},
{
  "id": "beef-and-black-eyed-pea-stew-with-polenta",
  "code": "D124",
  "category": "Dinner",
  "cuisine": "West Africa",
  "mealFamily": "stew",
  "emoji": "🍽️",
  "image": "/images/recipes/D124.webp",
  "name": "Beef and black-eyed pea stew with polenta",
  "description": "A warming beef and black-eyed pea stew with soft polenta.",
  "cookingTime": "45 mins",
  "calories": "768 kcal",
  "protein": "38.3 g",
  "equipment": "Kitchen scales, knife, chopping board, mixing bowl, saucepan or frying pan",
  "ingredients": [
    {
      "item": "Beef sirloin, lean and edible fat",
      "shoppingItem": "Beef sirloin, lean and edible fat",
      "quantity": "110 g (raw edible input)"
    },
    {
      "item": "Black-eyed peas, boiled without salt and drained",
      "shoppingItem": "Black-eyed peas, boiled without salt and drained",
      "quantity": "100 g (cooked drained edible weight)"
    },
    {
      "item": "Fine sifted cornmeal, not self-raising",
      "shoppingItem": "Fine sifted cornmeal, not self-raising",
      "quantity": "55 g (dry edible input)"
    },
    {
      "item": "Fresh tomato",
      "shoppingItem": "Fresh tomato",
      "quantity": "70 g (raw edible input)"
    },
    {
      "item": "Carrot",
      "shoppingItem": "Carrot",
      "quantity": "50 g (raw edible input)"
    },
    {
      "item": "Onion",
      "shoppingItem": "Onion",
      "quantity": "30 g (raw edible input)"
    },
    {
      "item": "Rapeseed oil",
      "shoppingItem": "Rapeseed oil",
      "quantity": "20 g (as sold, weighed grams)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "240 g (weighed grams)"
    },
    {
      "item": "Ground cumin",
      "shoppingItem": "Ground cumin",
      "quantity": "1 g (dry)"
    },
    {
      "item": "Sweet paprika",
      "shoppingItem": "Sweet paprika",
      "quantity": "1 g (dry)"
    },
    {
      "item": "Garlic",
      "shoppingItem": "Garlic",
      "quantity": "3 g (raw edible input)"
    },
    {
      "item": "Fresh parsley",
      "shoppingItem": "Fresh parsley",
      "quantity": "5 g (raw edible input)"
    },
    {
      "item": "Ground black pepper",
      "shoppingItem": "Ground black pepper",
      "quantity": "0.2 g (dry)"
    }
  ],
  "method": [
  "Bring 210 g of the measured water to a simmer, whisk in the cornmeal and cook over low heat for 20–25 minutes until tender, stirring frequently. Look for small, gentle bubbles rather than a rolling boil. Stir along the bottom when needed to prevent sticking, and keep the heat low enough for the food to cook evenly. Use the measured seasoning and sauces shown in the ingredients; do not add extra salt or a potassium-based salt substitute.",
  "Dice the beef small and finely chop the vegetables and garlic. Keep the pieces a similar size so they cook evenly. Keep any ingredients that are added later separate from those that go into the pan first. Brown the beef surfaces in all the oil for 3 minutes. Add onion, carrot, garlic, cumin and paprika and cook for 5 minutes.",
  "Add chopped tomato, cooked drained black-eyed peas and remaining 30 g water. Cover and simmer over low heat for 15 minutes until the carrot is tender and stew is steaming hot. Stir in parsley and pepper and serve all the stew over all the polenta."
],
  "nutrition": {
    "calories": "768 kcal",
    "protein": "38.3 g",
    "carbohydrates": "61.9 g",
    "fat": "37.0 g",
    "fibre": "12.7 g",
    "sodium": "102 mg",
    "potassium": "1110 mg",
    "phosphate": "467 mg",
    "salt": "0.25 g"
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
    "Intermittent fasting — eating-window meal"
  ]
},
{
  "id": "salmon-and-leek-rice-pie",
  "code": "D125",
  "category": "Dinner",
  "cuisine": "Britain",
  "mealFamily": "pie",
  "emoji": "🍽️",
  "image": "/images/recipes/D125.webp",
  "name": "Salmon and leek rice pie",
  "description": "Salmon and leeks baked under a light egg and rice topping.",
  "cookingTime": "50 mins",
  "calories": "764 kcal",
  "protein": "47.1 g",
  "equipment": "Kitchen scales, knife, chopping board, mixing bowl, saucepan or frying pan, oven, baking dish or tray",
  "ingredients": [
    {
      "item": "White basmati rice",
      "shoppingItem": "White basmati rice",
      "quantity": "55 g (dry)"
    },
    {
      "item": "Farmed salmon fillet, flesh only",
      "shoppingItem": "Farmed salmon fillet, flesh only",
      "quantity": "120 g (raw edible input, skin and bones excluded)"
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
      "item": "Whole milk",
      "shoppingItem": "Whole milk",
      "quantity": "40 g (as sold, weighed grams)"
    },
    {
      "item": "Leek, trimmed edible portion",
      "shoppingItem": "Leek, trimmed edible portion",
      "quantity": "50 g (raw edible input)"
    },
    {
      "item": "Olive oil",
      "shoppingItem": "Olive oil",
      "quantity": "15 g (as sold, weighed grams)"
    },
    {
      "item": "Plain white flour",
      "shoppingItem": "Plain white flour",
      "quantity": "10 g (dry)"
    },
    {
      "item": "Drinking tap water",
      "shoppingItem": "Drinking tap water",
      "quantity": "125 g (weighed grams)"
    },
    {
      "item": "Fresh parsley",
      "shoppingItem": "Fresh parsley",
      "quantity": "5 g (raw edible input)"
    },
    {
      "item": "Fresh lemon juice",
      "shoppingItem": "Fresh lemon juice",
      "quantity": "20 g (freshly squeezed, weighed grams)"
    },
    {
      "item": "Ground black pepper",
      "shoppingItem": "Ground black pepper",
      "quantity": "0.2 g (dry)"
    }
  ],
  "method": [
  "Cook the rice with 115 g of the measured water in a covered pan for 12–15 minutes, then rest for 5 minutes. Keep the heat low enough that the rice cooks steadily rather than boiling over. At the end, check that a grain is tender right through, then let the rice rest as directed before loosening it with a fork. Heat the oven to 190°C, or 170°C fan.",
  "Slice the leek and soften in all the oil for 6 minutes. Keep the pieces a similar size so they cook evenly. Keep any ingredients that are added later separate from those that go into the pan first. Stir in the flour, then gradually add the milk and remaining 10 g water. Simmer for 3 minutes and add the salmon in small pieces, parsley, lemon juice and pepper. Look for small, gentle bubbles rather than a rolling boil. Stir along the bottom when needed to prevent sticking, and keep the heat low enough for the food to cook evenly. Use the listed herbs, spices or citrus for flavour before considering any extra seasoning.",
  "Transfer all the filling to a small dish. Beat the weighed whole egg and egg white and mix with all the warm rice. Beat until the mixture has an even colour and consistency, with no long strands of unmixed egg white. Spoon over the fish.",
  "Bake for 25–30 minutes until the topping is fully set and the salmon is opaque and steaming hot. Put the dish or tray on a stable oven shelf and begin checking towards the end of the stated time. Check the centre as well as the surface; a browned top alone does not show that the inside is cooked. Serve the entire pie and sauce."
],
  "nutrition": {
    "calories": "764 kcal",
    "protein": "47.1 g",
    "carbohydrates": "53.5 g",
    "fat": "39.5 g",
    "fibre": "2.9 g",
    "sodium": "301 mg",
    "potassium": "924 mg",
    "phosphate": "492 mg",
    "salt": "0.75 g"
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
    "Intermittent fasting — eating-window meal"
  ]
}
];
