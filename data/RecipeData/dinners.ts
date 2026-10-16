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
    quantityConversionsEstimated: true,}
];
