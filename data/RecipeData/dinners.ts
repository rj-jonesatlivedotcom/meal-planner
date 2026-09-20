import type { Recipe } from "./types";

export const dinners: Recipe[] = [
{
    id: "lemon-herb-chicken-rice",
    code: "D001",
    category: "Dinner",
    emoji: "🍋",
    image: "/images/recipes/D001.png",
    name: "Lemon & Herb Chicken with Rice",
    description: "Tender grilled chicken with basmati rice, soft white cabbage and onion, finished with lemon and parsley.",
    cookingTime: "30 minutes",
    calories: "586 kcal",
    protein: "31 g",
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
        quantity: "100 g"
      },
      {
        item: "Onions, boiled in unsalted water",
        shoppingItem: "Onion",
        quantity: "50 g"
      },
      {
        item: "Oil, olive",
        shoppingItem: "Olive oil",
        quantity: "15 g"
      },
      {
        item: "Lemon juice, fresh",
        shoppingItem: "Lemon",
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
      calories: "586 kcal",
      protein: "31 g",
      carbohydrates: "82 g",
      fat: "17 g",
      fibre: "4 g",
      sodium: "47 mg",
      salt: "0.12 g",
      potassium: "660 mg",
      phosphate: "342 mg"
    },
    potassium: "Moderate",
    phosphate: "Low",
    purines: "Moderate",
    dietaryNote: "The meal uses a modest chicken portion with rice and lower-potassium vegetables. Chicken contributes protein and phosphate.",
    servings: 1
  },
{
    id: "turkey-rosemary-rice",
    code: "D002",
    category: "Dinner",
    emoji: "🌿",
    image: "/images/recipes/D002.png",
    name: "Rosemary Turkey with Rice & Vegetables",
    description: "Lean grilled turkey with basmati rice, cabbage and carrots, gently flavoured with rosemary.",
    cookingTime: "30 minutes",
    calories: "609 kcal",
    protein: "30 g",
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
        quantity: "75 g"
      },
      {
        item: "Carrots, old, boiled in unsalted water",
        shoppingItem: "Carrots",
        quantity: "50 g"
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
      calories: "609 kcal",
      protein: "30 g",
      carbohydrates: "90 g",
      fat: "17 g",
      fibre: "5 g",
      sodium: "74 mg",
      salt: "0.18 g",
      potassium: "617 mg",
      phosphate: "352 mg"
    },
    potassium: "Moderate",
    phosphate: "Moderate",
    purines: "Low",
    dietaryNote: "Turkey provides concentrated protein while rice and the vegetable portions provide the main carbohydrate and fibre. Turkey contributes protein and phosphate.",
    servings: 1
  },
{
    id: "pork-herb-rice",
    code: "D003",
    category: "Dinner",
    emoji: "🥕",
    image: "/images/recipes/D003.png",
    name: "Herb-Grilled Pork with Rice & Vegetables",
    description: "Lean grilled pork loin served with basmati rice, carrots and cabbage with a light thyme dressing.",
    cookingTime: "30 minutes",
    calories: "674 kcal",
    protein: "37 g",
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
        quantity: "50 g"
      },
      {
        item: "Cabbage, white, boiled in unsalted water",
        shoppingItem: "Cabbage",
        quantity: "100 g"
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
      calories: "674 kcal",
      protein: "37 g",
      carbohydrates: "90 g",
      fat: "21 g",
      fibre: "5 g",
      sodium: "67 mg",
      salt: "0.17 g",
      potassium: "687 mg",
      phosphate: "339 mg"
    },
    potassium: "Moderate",
    phosphate: "Low",
    purines: "Moderate",
    dietaryNote: "Lean pork provides useful protein. Pork contributes phosphate and purines, while the rice and vegetables form the lower-potassium carbohydrate base.",
    servings: 1
  },
{
    id: "lemon-cod-rice",
    code: "D004",
    category: "Dinner",
    emoji: "🐟",
    image: "/images/recipes/D004.png",
    name: "Lemon Cod with Rice & Cabbage",
    description: "Oven-baked cod with fluffy basmati rice, cabbage and onion, finished with fresh lemon and parsley.",
    cookingTime: "30 minutes",
    calories: "662 kcal",
    protein: "33 g",
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
        quantity: "100 g"
      },
      {
        item: "Onions, boiled in unsalted water",
        shoppingItem: "Onion",
        quantity: "50 g"
      },
      {
        item: "Oil, olive",
        shoppingItem: "Olive oil",
        quantity: "20 g"
      },
      {
        item: "Lemon juice, fresh",
        shoppingItem: "Lemon",
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
      calories: "662 kcal",
      protein: "33 g",
      carbohydrates: "90 g",
      fat: "21 g",
      fibre: "4 g",
      sodium: "100 mg",
      salt: "0.25 g",
      potassium: "713 mg",
      phosphate: "324 mg"
    },
    potassium: "Moderate",
    phosphate: "Low",
    purines: "Low",
    dietaryNote: "Cod provides useful protein with a relatively lean fat profile. Fish contributes phosphate and purines, while rice and cabbage provide the main carbohydrate and fibre.",
    servings: 1
  },
{
    id: "lemon-salmon-rice",
    code: "D005",
    category: "Dinner",
    emoji: "🍋",
    image: "/images/recipes/D005.png",
    name: "Lemon Salmon with Rice & Cabbage",
    description: "Baked salmon with basmati rice, soft cabbage and onion, brightened with fresh lemon.",
    cookingTime: "30 minutes",
    calories: "656 kcal",
    protein: "30 g",
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
        quantity: "100 g"
      },
      {
        item: "Onions, boiled in unsalted water",
        shoppingItem: "Onion",
        quantity: "50 g"
      },
      {
        item: "Oil, olive",
        shoppingItem: "Olive oil",
        quantity: "10 g"
      },
      {
        item: "Lemon juice, fresh",
        shoppingItem: "Lemon",
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
      protein: "30 g",
      carbohydrates: "90 g",
      fat: "22 g",
      fibre: "4 g",
      sodium: "46 mg",
      salt: "0.12 g",
      potassium: "635 mg",
      phosphate: "341 mg"
    },
    potassium: "Moderate",
    phosphate: "Low",
    purines: "Moderate",
    dietaryNote: "Salmon provides useful protein and fat but is an oily fish and therefore classified as higher in purines. The rice and cabbage keep the meal centred on lower-potassium foods.",
    servings: 1
  },
{
    id: "beef-paprika-rice",
    code: "D006",
    category: "Dinner",
    emoji: "🥩",
    image: "/images/recipes/D006.png",
    name: "Paprika Beef with Rice & Cabbage",
    description: "Lean minced beef gently cooked with paprika and onion, served with basmati rice and soft cabbage.",
    cookingTime: "30 minutes",
    calories: "606 kcal",
    protein: "34 g",
    equipment: "Saucepan, frying pan, colander, wooden spoon, knife",
    ingredients: [
      {
        item: "Beef, mince, extra lean, stewed",
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
        quantity: "100 g"
      },
      {
        item: "Onions, boiled in unsalted water",
        shoppingItem: "Onion",
        quantity: "50 g"
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
      calories: "606 kcal",
      protein: "34 g",
      carbohydrates: "90 g",
      fat: "15 g",
      fibre: "5 g",
      sodium: "83 mg",
      salt: "0.21 g",
      potassium: "588 mg",
      phosphate: "304 mg"
    },
    potassium: "Moderate",
    phosphate: "Low",
    purines: "Moderate",
    dietaryNote: "Extra-lean beef keeps the fat content controlled while providing substantial protein. Beef contributes protein and phosphate.",
    servings: 1
  },
{
    id: "egg-cheddar-pasta-cabbage",
    code: "D007",
    category: "Dinner",
    emoji: "🍝",
    image: "/images/recipes/D007.png",
    name: "Creamy Egg & Cheddar Pasta with Cabbage",
    description: "White pasta tossed with boiled egg, mature cheddar and tender cabbage for a filling meat-free dinner.",
    cookingTime: "25 minutes",
    calories: "593 kcal",
    protein: "29 g",
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
        quantity: "100 g"
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
      calories: "593 kcal",
      protein: "29 g",
      carbohydrates: "64 g",
      fat: "26 g",
      fibre: "2 g",
      sodium: "304 mg",
      salt: "0.76 g",
      potassium: "541 mg",
      phosphate: "473 mg"
    },
    potassium: "Moderate",
    phosphate: "Moderate",
    purines: "Low",
    dietaryNote: "Eggs provide a low-purine protein source. Cheddar contributes a substantial amount of phosphate, so the cheese portion is deliberately modest.",
    servings: 1
  },
{
    id: "chicken-paprika-rice-peppers",
    code: "D008",
    category: "Dinner",
    emoji: "🌶️",
    image: "/images/recipes/D008.png",
    name: "Paprika Chicken with Rice & Peppers",
    description: "Grilled chicken with basmati rice, green pepper and onion, gently seasoned with paprika.",
    cookingTime: "30 minutes",
    calories: "574 kcal",
    protein: "31 g",
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
        shoppingItem: "Green pepper",
        quantity: "50 g"
      },
      {
        item: "Onions, boiled in unsalted water",
        shoppingItem: "Onion",
        quantity: "50 g"
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
      calories: "574 kcal",
      protein: "31 g",
      carbohydrates: "79 g",
      fat: "17 g",
      fibre: "3 g",
      sodium: "43 mg",
      salt: "0.11 g",
      potassium: "527 mg",
      phosphate: "332 mg"
    },
    potassium: "Moderate",
    phosphate: "Low",
    purines: "Moderate",
    dietaryNote: "Chicken provides useful protein while the rice provides the main carbohydrate. The meal avoids salty sauces and uses a modest vegetable portion.",
    servings: 1
  },
{
    id: "creamy-pork-pasta-cabbage",
    code: "D009",
    category: "Dinner",
    emoji: "🍝",
    image: "/images/recipes/D009.png",
    name: "Creamy Pork & Herb Pasta",
    description: "Lean grilled pork with white pasta and cabbage in a light single-cream and thyme sauce.",
    cookingTime: "30 minutes",
    calories: "641 kcal",
    protein: "39 g",
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
        quantity: "100 g"
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
      calories: "641 kcal",
      protein: "39 g",
      carbohydrates: "65 g",
      fat: "27 g",
      fibre: "3 g",
      sodium: "62 mg",
      salt: "0.15 g",
      potassium: "743 mg",
      phosphate: "397 mg"
    },
    potassium: "Moderate",
    phosphate: "Moderate",
    purines: "Low",
    dietaryNote: "Lean pork provides substantial protein. Pork contributes phosphate and purines, while the pasta and cabbage provide the main carbohydrate and fibre.",
    servings: 1
  },
{
    id: "egg-cauliflower-rice",
    code: "D010",
    category: "Dinner",
    emoji: "🥚",
    image: "/images/recipes/D010.png",
    name: "Egg, Cheddar & Cauliflower Rice Bowl",
    description: "Boiled egg and mature cheddar served with basmati rice and tender cauliflower, finished with parsley.",
    cookingTime: "25 minutes",
    calories: "682 kcal",
    protein: "29 g",
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
      calories: "682 kcal",
      protein: "29 g",
      carbohydrates: "87 g",
      fat: "26 g",
      fibre: "3 g",
      sodium: "305 mg",
      salt: "0.76 g",
      potassium: "492 mg",
      phosphate: "458 mg"
    },
    potassium: "Low",
    phosphate: "Moderate",
    purines: "Low",
    dietaryNote: "Eggs are a low-purine protein source. The cheddar adds phosphate, so the cheese portion is kept modest. The recipe uses rice and a controlled cauliflower portion as the main accompaniments.",
    servings: 1
  },
  {
    id: "d011-creamy-chicken-mushroom-rice",
    code: "D011",
    category: "Dinner",
    emoji: "🍄",
    image: "/images/recipes/D011.png",
    name: "Creamy Chicken & Mushroom Rice",
    description: "Tender chicken and earthy mushrooms folded through fluffy basmati rice in a silky, lightly seasoned cream sauce.",
    cookingTime: "30 minutes",
    calories: "620 kcal",
    protein: "35.0 g",
    equipment: "Saucepan with lid, frying pan, wooden spoon, knife, chopping board",
    ingredients: [
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "100 g" },
      { item: "Basmati rice", shoppingItem: "Basmati rice", quantity: "85 g" },
      { item: "Mushrooms", shoppingItem: "Mushrooms", quantity: "80 g" },
      { item: "Cabbage", shoppingItem: "Cabbage", quantity: "80 g" },
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
      calories: "620 kcal", protein: "35.0 g", carbohydrates: "82.0 g", fat: "18.0 g",
      fibre: "5.0 g", sodium: "82 mg", salt: "0.21 g", potassium: "640 mg", phosphate: "390 mg"
    },
    potassium: "Moderate",
    phosphate: "Moderate",
    purines: "Moderate",
    dietaryNote: "Tender chicken and mushrooms create a rich, savoury dinner without relying on a salty sauce.",
    servings: 1,
  },
  {
    id: "D012",
    code: "D012",
    category: "Dinner",
    emoji: "🍝",
    image: "/images/recipes/D012.png",
    name: "Turkey & Sweetcorn Pasta",
    description: "Lean turkey and sweetcorn tossed with white pasta in a simple creamy herb sauce.",
    cookingTime: "25 minutes",
    calories: "620 kcal",
    protein: "36.0 g",
    equipment: "Large saucepan, frying pan, colander, wooden spoon, knife, chopping board",
    ingredients: [
      { item: "Turkey breast", shoppingItem: "Turkey breast", quantity: "100 g" },
      { item: "White pasta", shoppingItem: "White pasta", quantity: "75 g" },
      { item: "Sweetcorn", shoppingItem: "Sweetcorn kernels", quantity: "60 g" },
      { item: "Cabbage", shoppingItem: "Cabbage", quantity: "80 g" },
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
      calories: "620 kcal",
      protein: "36.0 g",
      carbohydrates: "78 g",
      fat: "17 g",
      fibre: "5 g",
      sodium: "92 mg",
      salt: "0.23 g",
      potassium: "650 mg",
      phosphate: "405 mg",
    },
    potassium: "Moderate",
    phosphate: "Moderate",
    purines: "Low",
    dietaryNote: "A lean turkey pasta dish with moderate potassium and phosphate. The measured turkey portion provides substantial protein without adding salt.",
    servings: 1,
  },

  {
    id: "D013",
    code: "D013",
    category: "Dinner",
    emoji: "🐟",
    image: "/images/recipes/D013.png",
    name: "Lemon Cod with Pasta & Peppers",
    description: "Flaked baked cod served with white pasta, cabbage and green pepper with fresh lemon.",
    cookingTime: "25 minutes",
    calories: "601 kcal",
    protein: "35.0 g",
    equipment: "Large saucepan, baking tray, colander, wooden spoon, knife, chopping board",
    ingredients: [
      { item: "Cod fillet", shoppingItem: "Cod fillet", quantity: "120 g" },
      { item: "White pasta", shoppingItem: "White pasta", quantity: "75 g" },
      { item: "Cabbage", shoppingItem: "Cabbage", quantity: "80 g" },
      { item: "Green pepper", shoppingItem: "Green peppers", quantity: "60 g" },
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
      calories: "601 kcal",
      protein: "35.0 g",
      carbohydrates: "77 g",
      fat: "16 g",
      fibre: "4 g",
      sodium: "117 mg",
      salt: "0.29 g",
      potassium: "664 mg",
      phosphate: "343 mg",
    },
    potassium: "Moderate",
    phosphate: "Low",
    purines: "Moderate",
    dietaryNote: "Cod provides a lean source of protein, while pasta and the measured vegetables provide the carbohydrate and fibre base. No added salt is used.",
    servings: 1,
  },

  {
    id: "D014",
    code: "D014",
    category: "Dinner",
    emoji: "🍚",
    image: "/images/recipes/D014.png",
    name: "Chicken & Sweetcorn Rice Bowl",
    description: "Grilled chicken with basmati rice, cabbage, sweetcorn and lemon.",
    cookingTime: "25 minutes",
    calories: "592 kcal",
    protein: "34.0 g",
    equipment: "Saucepan with lid, frying pan, wooden spoon, knife, chopping board",
    ingredients: [
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "100 g" },
      { item: "Basmati rice", shoppingItem: "Basmati rice", quantity: "80 g" },
      { item: "Cabbage", shoppingItem: "Cabbage", quantity: "80 g" },
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
      calories: "592 kcal",
      protein: "34.0 g",
      carbohydrates: "86 g",
      fat: "14 g",
      fibre: "4 g",
      sodium: "67 mg",
      salt: "0.17 g",
      potassium: "622 mg",
      phosphate: "337 mg",
    },
    potassium: "Moderate",
    phosphate: "Low",
    purines: "Moderate",
    dietaryNote: "A straightforward chicken and rice meal with moderate potassium and low phosphate within the recipe-planning bands.",
    servings: 1,
  },

  {
    id: "D015",
    code: "D015",
    category: "Dinner",
    emoji: "🍗",
    image: "/images/recipes/D015.png",
    name: "Turkey, Rice & Roasted Peppers",
    description: "Herb-grilled turkey served with basmati rice, cabbage and roasted green pepper.",
    cookingTime: "30 minutes",
    calories: "603 kcal",
    protein: "35.0 g",
    equipment: "Saucepan with lid, baking tray, frying pan, wooden spoon, knife, chopping board",
    ingredients: [
      { item: "Turkey breast", shoppingItem: "Turkey breast", quantity: "100 g" },
      { item: "Basmati rice", shoppingItem: "Basmati rice", quantity: "80 g" },
      { item: "Green pepper", shoppingItem: "Green peppers", quantity: "70 g" },
      { item: "Cabbage", shoppingItem: "Cabbage", quantity: "80 g" },
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
      calories: "603 kcal",
      protein: "35.0 g",
      carbohydrates: "85 g",
      fat: "15 g",
      fibre: "4 g",
      sodium: "79 mg",
      salt: "0.20 g",
      potassium: "663 mg",
      phosphate: "361 mg",
    },
    potassium: "Moderate",
    phosphate: "Moderate",
    purines: "Moderate",
    dietaryNote: "Lean turkey is paired with rice and measured lower-potassium vegetables. The recipe contains no added salt.",
    servings: 1,
  },

  {
    id: "D016",
    code: "D016",
    category: "Dinner",
    emoji: "🍎",
    image: "/images/recipes/D016.png",
    name: "Pork & Apple Rice Bowl",
    description: "Tender lean pork with basmati rice, cabbage and warm apple with rosemary.",
    cookingTime: "30 minutes",
    calories: "650 kcal",
    protein: "37.0 g",
    equipment: "Saucepan with lid, frying pan, wooden spoon, knife, chopping board",
    ingredients: [
      { item: "Lean pork loin", shoppingItem: "Lean pork loin", quantity: "100 g" },
      { item: "Basmati rice", shoppingItem: "Basmati rice", quantity: "80 g" },
      { item: "Cabbage", shoppingItem: "Cabbage", quantity: "80 g" },
      { item: "Apple", shoppingItem: "Apples", quantity: "80 g" },
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
      calories: "650 kcal",
      protein: "37.0 g",
      carbohydrates: "88 g",
      fat: "18 g",
      fibre: "5 g",
      sodium: "72 mg",
      salt: "0.18 g",
      potassium: "701 mg",
      phosphate: "349 mg",
    },
    potassium: "Moderate",
    phosphate: "Low",
    purines: "Moderate",
    dietaryNote: "A balanced pork and rice dish with fruit for sweetness instead of added sugar. Pork provides protein as part of the meal.",
    servings: 1,
  },

  {
    id: "D017",
    code: "D017",
    category: "Dinner",
    emoji: "🍝",
    image: "/images/recipes/D017.png",
    name: "Creamy Chicken & Cabbage Pasta",
    description: "Chicken and cabbage folded through pasta with a light cream, lemon and herb sauce.",
    cookingTime: "25 minutes",
    calories: "625 kcal",
    protein: "38.0 g",
    equipment: "Large saucepan, frying pan, colander, wooden spoon, knife, chopping board",
    ingredients: [
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "100 g" },
      { item: "White pasta", shoppingItem: "White pasta", quantity: "75 g" },
      { item: "Cabbage", shoppingItem: "Cabbage", quantity: "100 g" },
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
      calories: "625 kcal",
      protein: "38.0 g",
      carbohydrates: "76 g",
      fat: "20 g",
      fibre: "4 g",
      sodium: "78 mg",
      salt: "0.20 g",
      potassium: "666 mg",
      phosphate: "374 mg",
    },
    potassium: "Moderate",
    phosphate: "Low",
    purines: "Moderate",
    dietaryNote: "A creamy but simply seasoned chicken pasta. Cabbage adds volume while keeping the ingredient list straightforward.",
    servings: 1,
  },

  {
    id: "D018",
    code: "D018",
    category: "Dinner",
    emoji: "🐟",
    image: "/images/recipes/D018.png",
    name: "Cod, Sweetcorn & Rice",
    description: "Baked cod with basmati rice, cabbage and sweetcorn finished with lemon and parsley.",
    cookingTime: "30 minutes",
    calories: "596 kcal",
    protein: "35.0 g",
    equipment: "Saucepan with lid, baking tray, wooden spoon, knife, chopping board",
    ingredients: [
      { item: "Cod fillet", shoppingItem: "Cod fillet", quantity: "120 g" },
      { item: "Basmati rice", shoppingItem: "Basmati rice", quantity: "80 g" },
      { item: "Cabbage", shoppingItem: "Cabbage", quantity: "80 g" },
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
      calories: "596 kcal",
      protein: "35.0 g",
      carbohydrates: "87 g",
      fat: "13 g",
      fibre: "4 g",
      sodium: "112 mg",
      salt: "0.28 g",
      potassium: "648 mg",
      phosphate: "326 mg",
    },
    potassium: "Moderate",
    phosphate: "Low",
    purines: "Low",
    dietaryNote: "Cod provides lean protein while rice supplies the main carbohydrate source. The measured vegetables add volume without added salt.",
    servings: 1,
  },

  {
    id: "D019",
    code: "D019",
    category: "Dinner",
    emoji: "🥚",
    image: "/images/recipes/D019.png",
    name: "Egg & Vegetable Pasta",
    description: "Soft scrambled egg with pasta, cabbage, sweetcorn and green pepper in a simple herb dressing.",
    cookingTime: "20 minutes",
    calories: "576 kcal",
    protein: "27.0 g",
    equipment: "Large saucepan, frying pan, colander, wooden spoon, bowl, knife, chopping board",
    ingredients: [
      { item: "Eggs", shoppingItem: "Eggs", quantity: "2" },
      { item: "White pasta", shoppingItem: "White pasta", quantity: "75 g" },
      { item: "Cabbage", shoppingItem: "Cabbage", quantity: "80 g" },
      { item: "Sweetcorn", shoppingItem: "Sweetcorn kernels", quantity: "50 g" },
      { item: "Green pepper", shoppingItem: "Green peppers", quantity: "50 g" },
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
      calories: "576 kcal",
      protein: "27.0 g",
      carbohydrates: "76 g",
      fat: "20 g",
      fibre: "5 g",
      sodium: "160 mg",
      salt: "0.40 g",
      potassium: "507 mg",
      phosphate: "424 mg",
    },
    potassium: "Low",
    phosphate: "Moderate",
    purines: "Low",
    dietaryNote: "Eggs provide a lower-purine protein source. Cheaper, simple ingredients make this a useful meat-free dinner option.",
    servings: 1,
  },

  {
    id: "D020",
    code: "D020",
    category: "Dinner",
    emoji: "🍗",
    image: "/images/recipes/D020.png",
    name: "Chicken & Apple Couscous-Style Rice",
    description: "Lemon-herb chicken with fluffy basmati rice, cabbage and warm apple.",
    cookingTime: "30 minutes",
    calories: "604 kcal",
    protein: "33.0 g",
    equipment: "Saucepan with lid, frying pan, wooden spoon, knife, chopping board",
    ingredients: [
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "100 g" },
      { item: "Basmati rice", shoppingItem: "Basmati rice", quantity: "80 g" },
      { item: "Cabbage", shoppingItem: "Cabbage", quantity: "80 g" },
      { item: "Apple", shoppingItem: "Apples", quantity: "80 g" },
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
      calories: "604 kcal",
      protein: "33.0 g",
      carbohydrates: "87 g",
      fat: "14 g",
      fibre: "5 g",
      sodium: "68 mg",
      salt: "0.17 g",
      potassium: "645 mg",
      phosphate: "332 mg",
    },
    potassium: "Moderate",
    phosphate: "Low",
    purines: "Moderate",
    dietaryNote: "A simple chicken and rice dinner with apple for natural sweetness. The recipe uses herbs, lemon and pepper instead of added salt.",
    servings: 1,
  },
  {
    id: "D021", code: "D021", category: "Dinner", emoji: "🍗", image: "/images/recipes/D021.png",
    name: "Chicken, Herb & Sweetcorn Rice", description: "Tender chicken with fluffy basmati rice, sweetcorn and herbs.", cookingTime: "30 minutes", calories: "612 kcal", protein: "32.5 g", equipment: "Large saucepan, frying pan, wooden spoon, knife, chopping board",
    ingredients: [
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "100 g" }, { item: "Basmati rice", shoppingItem: "Basmati rice", quantity: "90 g" }, { item: "Sweetcorn kernels", shoppingItem: "Sweetcorn kernels", quantity: "60 g" }, { item: "Onion", shoppingItem: "Onions", quantity: "50 g" }, { item: "Olive oil", shoppingItem: "Olive oil", quantity: "1 tsp" }, { item: "Dried thyme", shoppingItem: "Dried thyme", quantity: "1/2 tsp" }, { item: "Black pepper", shoppingItem: "Black pepper", quantity: "1/4 tsp" }
    ],
    method: ["00:00 — Cook the rice according to the packet instructions, then drain.", "05:00 — Dice the chicken and onion.", "10:00 — Heat the olive oil and cook the onion for 3 minutes.", "13:00 — Add the chicken and thyme and cook until thoroughly cooked.", "25:00 — Stir in the sweetcorn and cook for 2 minutes.", "27:00 — Fold through the cooked rice and season with black pepper.", "30:00 — Serve hot."],
    nutrition: { calories: "612 kcal", protein: "32.5 g", carbohydrates: "91.0 g", fat: "13.0 g", fibre: "4.5 g", sodium: "70 mg", salt: "0.18 g", potassium: "620 mg", phosphate: "350 mg" },
    potassium: "Moderate", phosphate: "Moderate", purines: "Moderate", dietaryNote: "A protein-rich rice dinner with vegetables and no added salt.", servings: 1
  },
  {
    id: "D022", code: "D022", category: "Dinner", emoji: "🥩", image: "/images/recipes/D022.png",
    name: "Beef & Pepper Pasta", description: "Lean beef mince with pasta, peppers and onion in a light herb sauce.", cookingTime: "25 minutes", calories: "648 kcal", protein: "34.0 g", equipment: "Large saucepan, frying pan, colander, wooden spoon, knife, chopping board",
    ingredients: [
      { item: "Beef mince (5% fat)", shoppingItem: "Beef mince (5% fat)", quantity: "120 g" }, { item: "White pasta", shoppingItem: "White pasta", quantity: "85 g" }, { item: "Green pepper", shoppingItem: "Green peppers", quantity: "70 g" }, { item: "Onion", shoppingItem: "Onions", quantity: "50 g" }, { item: "Olive oil", shoppingItem: "Olive oil", quantity: "1 tsp" }, { item: "Dried oregano", shoppingItem: "Dried oregano", quantity: "1/2 tsp" }, { item: "Black pepper", shoppingItem: "Black pepper", quantity: "1/4 tsp" }
    ],
    method: ["00:00 — Cook the pasta according to the packet instructions, then drain.", "05:00 — Finely chop the onion and pepper.", "08:00 — Heat the olive oil and cook the onion and pepper for 4 minutes.", "12:00 — Add the beef mince and cook, breaking it up with a wooden spoon.", "20:00 — Stir in the oregano and black pepper.", "22:00 — Add the cooked pasta and toss together.", "25:00 — Serve hot."],
    nutrition: { calories: "648 kcal", protein: "34.0 g", carbohydrates: "79.0 g", fat: "20.0 g", fibre: "4.0 g", sodium: "82 mg", salt: "0.21 g", potassium: "610 mg", phosphate: "360 mg" },
    potassium: "Moderate", phosphate: "Moderate", purines: "Moderate", dietaryNote: "Lean beef provides protein while pepper and onion add flavour without relying on added salt.", servings: 1
  },
  {
    id: "D023", code: "D023", category: "Dinner", emoji: "🐟", image: "/images/recipes/D023.png",
    name: "Herb Cod with Potatoes & Cabbage", description: "Baked cod served with boiled potatoes and tender cabbage with lemon and herbs.", cookingTime: "35 minutes", calories: "578 kcal", protein: "31.5 g", equipment: "Baking tray, saucepan, steamer or second saucepan, knife, chopping board",
    ingredients: [
      { item: "Cod fillet", shoppingItem: "Cod fillets", quantity: "140 g" }, { item: "Potatoes", shoppingItem: "Potatoes", quantity: "250 g" }, { item: "Cabbage", shoppingItem: "Cabbage", quantity: "100 g" }, { item: "Unsalted butter", shoppingItem: "Unsalted butter", quantity: "15 g" }, { item: "Lemon juice", shoppingItem: "Lemons", quantity: "1 tbsp" }, { item: "Dried parsley", shoppingItem: "Dried parsley", quantity: "1/2 tsp" }, { item: "Black pepper", shoppingItem: "Black pepper", quantity: "1/4 tsp" }
    ],
    method: ["00:00 — Heat the oven to 200°C.", "03:00 — Peel and cut the potatoes into even pieces.", "05:00 — Boil the potatoes until tender.", "08:00 — Place the cod on a baking tray with half the butter, lemon juice and parsley.", "10:00 — Bake until the cod is opaque and cooked through.", "15:00 — Cook the cabbage in unsalted water until tender.", "28:00 — Drain the potatoes and cabbage.", "30:00 — Toss the potatoes with the remaining butter and black pepper.", "35:00 — Serve."],
    nutrition: { calories: "578 kcal", protein: "31.5 g", carbohydrates: "68.0 g", fat: "19.0 g", fibre: "5.0 g", sodium: "145 mg", salt: "0.36 g", potassium: "760 mg", phosphate: "320 mg" },
    potassium: "High", phosphate: "Moderate", purines: "Low", dietaryNote: "A simple fish dinner with cabbage and potatoes. Potassium is influenced by the potato portion.", servings: 1
  },
  {
    id: "D024", code: "D024", category: "Dinner", emoji: "🍳", image: "/images/recipes/D024.png",
    name: "Creamy Cheese & Egg Pasta", description: "Pasta coated in a creamy egg and Cheddar sauce with onion and herbs.", cookingTime: "20 minutes", calories: "625 kcal", protein: "29.0 g", equipment: "Large saucepan, frying pan, mixing bowl, colander, wooden spoon",
    ingredients: [
      { item: "White pasta", shoppingItem: "White pasta", quantity: "90 g" }, { item: "Egg", shoppingItem: "Egg", quantity: "1" }, { item: "Cheddar cheese", shoppingItem: "Cheddar cheese", quantity: "25 g" }, { item: "Semi-skimmed milk", shoppingItem: "Semi-skimmed milk", quantity: "100 ml" }, { item: "Onion", shoppingItem: "Onions", quantity: "40 g" }, { item: "Olive oil", shoppingItem: "Olive oil", quantity: "1 tsp" }, { item: "Dried parsley", shoppingItem: "Dried parsley", quantity: "1/2 tsp" }, { item: "Black pepper", shoppingItem: "Black pepper", quantity: "1/4 tsp" }
    ],
    method: ["00:00 — Cook the pasta according to the packet instructions, reserving a little cooking water before draining.", "05:00 — Finely chop the onion and cook gently in the olive oil for 4 minutes.", "09:00 — Beat the egg with the milk and grated Cheddar.", "12:00 — Add the drained pasta to the onion pan and remove from the heat.", "14:00 — Stir in the egg mixture and parsley, using a splash of pasta water to loosen the sauce.", "17:00 — Return to very low heat and stir until the egg mixture is cooked through.", "20:00 — Season with black pepper and serve."],
    nutrition: { calories: "625 kcal", protein: "29.0 g", carbohydrates: "78.0 g", fat: "22.0 g", fibre: "3.0 g", sodium: "330 mg", salt: "0.83 g", potassium: "540 mg", phosphate: "450 mg" },
    potassium: "Moderate", phosphate: "Moderate", purines: "Low", dietaryNote: "Egg and cheese provide protein and richness without meat or fish.", servings: 1
  },
  {
    id: "D025", code: "D025", category: "Dinner", emoji: "🍖", image: "/images/recipes/D025.png",
    name: "Pork, Apple & Cabbage", description: "Grilled pork with warm apple and tender cabbage, finished with herbs.", cookingTime: "30 minutes", calories: "590 kcal", protein: "35.0 g", equipment: "Grill pan, saucepan, frying pan, knife, chopping board",
    ingredients: [
      { item: "Lean pork loin", shoppingItem: "Lean pork loin", quantity: "140 g" }, { item: "Apple", shoppingItem: "Apples", quantity: "100 g" }, { item: "Cabbage", shoppingItem: "Cabbage", quantity: "120 g" }, { item: "Unsalted butter", shoppingItem: "Unsalted butter", quantity: "15 g" }, { item: "Vegetable oil", shoppingItem: "Vegetable oil", quantity: "1 tsp" }, { item: "Dried rosemary", shoppingItem: "Dried rosemary", quantity: "1/2 tsp" }, { item: "Black pepper", shoppingItem: "Black pepper", quantity: "1/4 tsp" }
    ],
    method: ["00:00 — Core and slice the apple and shred the cabbage.", "05:00 — Heat the grill pan and cook the pork with rosemary until thoroughly cooked.", "12:00 — Cook the cabbage in unsalted water until tender, then drain.", "18:00 — Heat the butter and gently cook the apple until softened.", "24:00 — Add the cabbage and toss together.", "27:00 — Season with black pepper.", "30:00 — Serve."],
    nutrition: { calories: "590 kcal", protein: "35.0 g", carbohydrates: "61.0 g", fat: "22.0 g", fibre: "6.0 g", sodium: "75 mg", salt: "0.19 g", potassium: "650 mg", phosphate: "330 mg" },
    potassium: "Moderate", phosphate: "Moderate", purines: "Moderate", dietaryNote: "Apple adds natural sweetness to pork and cabbage without a salty sauce.", servings: 1
  },
  {
    id: "D026", code: "D026", category: "Dinner", emoji: "🍗", image: "/images/recipes/D026.png",
    name: "Creamy Chicken & Pepper Pasta", description: "Chicken and peppers folded through pasta with a light creamy sauce.", cookingTime: "25 minutes", calories: "635 kcal", protein: "34.0 g", equipment: "Large saucepan, frying pan, colander, wooden spoon, knife, chopping board",
    ingredients: [
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "100 g" }, { item: "White pasta", shoppingItem: "White pasta", quantity: "85 g" }, { item: "Green pepper", shoppingItem: "Green peppers", quantity: "70 g" }, { item: "Onion", shoppingItem: "Onions", quantity: "40 g" }, { item: "Single cream", shoppingItem: "Single cream", quantity: "50 ml" }, { item: "Olive oil", shoppingItem: "Olive oil", quantity: "1 tsp" }, { item: "Dried thyme", shoppingItem: "Dried thyme", quantity: "1/2 tsp" }, { item: "Black pepper", shoppingItem: "Black pepper", quantity: "1/4 tsp" }
    ],
    method: ["00:00 — Cook the pasta according to the packet instructions, then drain.", "05:00 — Dice the chicken, pepper and onion.", "08:00 — Heat the olive oil and cook the onion and pepper for 4 minutes.", "12:00 — Add the chicken and thyme and cook until thoroughly cooked.", "20:00 — Stir in the cream and heat gently for 2 minutes.", "22:00 — Add the pasta and toss through the sauce.", "25:00 — Season with black pepper and serve."],
    nutrition: { calories: "635 kcal", protein: "34.0 g", carbohydrates: "76.0 g", fat: "21.0 g", fibre: "4.0 g", sodium: "92 mg", salt: "0.23 g", potassium: "610 mg", phosphate: "390 mg" },
    potassium: "Moderate", phosphate: "Moderate", purines: "High", dietaryNote: "A creamy pasta dinner using chicken, pepper and onion for flavour.", servings: 1
  },
  {
    id: "D027", code: "D027", category: "Dinner", emoji: "🐟", image: "/images/recipes/D027.png",
    name: "Cod, Sweetcorn & Herb Pasta", description: "Flaked cod with pasta and sweetcorn in a fresh lemon and herb dressing.", cookingTime: "25 minutes", calories: "610 kcal", protein: "33.0 g", equipment: "Large saucepan, frying pan, colander, wooden spoon, knife",
    ingredients: [
      { item: "Cod fillet", shoppingItem: "Cod fillets", quantity: "130 g" }, { item: "White pasta", shoppingItem: "White pasta", quantity: "85 g" }, { item: "Sweetcorn kernels", shoppingItem: "Sweetcorn kernels", quantity: "60 g" }, { item: "Onion", shoppingItem: "Onions", quantity: "40 g" }, { item: "Olive oil", shoppingItem: "Olive oil", quantity: "1 tsp" }, { item: "Lemon juice", shoppingItem: "Lemons", quantity: "1 tbsp" }, { item: "Dried parsley", shoppingItem: "Dried parsley", quantity: "1/2 tsp" }, { item: "Black pepper", shoppingItem: "Black pepper", quantity: "1/4 tsp" }
    ],
    method: ["00:00 — Cook the pasta according to the packet instructions.", "05:00 — Cook the cod in a covered frying pan with a splash of water until it flakes easily.", "12:00 — Flake the cooked cod into large pieces.", "14:00 — Cook the onion gently in the olive oil until softened.", "18:00 — Drain the pasta and add it to the pan with the sweetcorn.", "20:00 — Fold through the cod, lemon juice and parsley.", "25:00 — Season with black pepper and serve."],
    nutrition: { calories: "610 kcal", protein: "33.0 g", carbohydrates: "82.0 g", fat: "15.0 g", fibre: "4.0 g", sodium: "145 mg", salt: "0.36 g", potassium: "650 mg", phosphate: "350 mg" },
    potassium: "Moderate", phosphate: "Moderate", purines: "Low", dietaryNote: "Cod and pasta make a filling meal with lemon and herbs instead of a salty sauce.", servings: 1
  },
  {
    id: "D028", code: "D028", category: "Dinner", emoji: "🥚", image: "/images/recipes/D028.png",
    name: "Egg, Cabbage & Sweetcorn Rice", description: "Fluffy rice stir-fried with egg, cabbage, sweetcorn and onion.", cookingTime: "25 minutes", calories: "575 kcal", protein: "20.0 g", equipment: "Saucepan, large frying pan, wooden spoon, knife, chopping board",
    ingredients: [
      { item: "Basmati rice", shoppingItem: "Basmati rice", quantity: "90 g" }, { item: "Egg", shoppingItem: "Eggs", quantity: "2" }, { item: "Cabbage", shoppingItem: "Cabbage", quantity: "100 g" }, { item: "Sweetcorn kernels", shoppingItem: "Sweetcorn kernels", quantity: "60 g" }, { item: "Onion", shoppingItem: "Onions", quantity: "50 g" }, { item: "Olive oil", shoppingItem: "Olive oil", quantity: "1 tsp" }, { item: "Black pepper", shoppingItem: "Black pepper", quantity: "1/4 tsp" }
    ],
    method: ["00:00 — Cook the rice according to the packet instructions, then drain well.", "08:00 — Shred the cabbage and finely chop the onion.", "10:00 — Heat the olive oil and cook the onion and cabbage until softened.", "15:00 — Add the sweetcorn and cook for 2 minutes.", "17:00 — Push the vegetables aside and scramble the eggs until cooked.", "20:00 — Stir in the rice and combine thoroughly.", "25:00 — Season with black pepper and serve."],
    nutrition: { calories: "575 kcal", protein: "20.0 g", carbohydrates: "89.0 g", fat: "15.0 g", fibre: "5.0 g", sodium: "305 mg", salt: "0.76 g", potassium: "520 mg", phosphate: "410 mg" },
    potassium: "Moderate", phosphate: "Moderate", purines: "Low", dietaryNote: "An egg-based dinner with rice and vegetables, with no added salt.", servings: 1
  },
  {
    id: "D029", code: "D029", category: "Dinner", emoji: "🍖", image: "/images/recipes/D029.png",
    name: "Pork & Pepper Pasta", description: "Tender pork with pasta, green pepper and onion in a light herb dressing.", cookingTime: "25 minutes", calories: "645 kcal", protein: "36.0 g", equipment: "Large saucepan, frying pan, colander, wooden spoon, knife, chopping board",
    ingredients: [
      { item: "Lean pork loin", shoppingItem: "Lean pork loin", quantity: "130 g" }, { item: "White pasta", shoppingItem: "White pasta", quantity: "85 g" }, { item: "Green pepper", shoppingItem: "Green peppers", quantity: "70 g" }, { item: "Onion", shoppingItem: "Onions", quantity: "40 g" }, { item: "Olive oil", shoppingItem: "Olive oil", quantity: "1 tsp" }, { item: "Dried rosemary", shoppingItem: "Dried rosemary", quantity: "1/2 tsp" }, { item: "Black pepper", shoppingItem: "Black pepper", quantity: "1/4 tsp" }
    ],
    method: ["00:00 — Cook the pasta according to the packet instructions, then drain.", "05:00 — Slice the pork into thin strips and chop the pepper and onion.", "08:00 — Heat the olive oil and cook the onion and pepper for 4 minutes.", "12:00 — Add the pork and rosemary and cook until thoroughly cooked.", "20:00 — Add the drained pasta and toss together.", "23:00 — Season with black pepper.", "25:00 — Serve hot."],
    nutrition: { calories: "645 kcal", protein: "36.0 g", carbohydrates: "76.0 g", fat: "21.0 g", fibre: "4.0 g", sodium: "76 mg", salt: "0.19 g", potassium: "600 mg", phosphate: "360 mg" },
    potassium: "Moderate", phosphate: "Moderate", purines: "Moderate", dietaryNote: "Lean pork and pasta provide a substantial protein-rich meal with herbs for flavour.", servings: 1
  },
  {
    id: "d030-pork-apple-cabbage-skillet",
    code: "D030",
    category: "Dinner",
    emoji: "🍎",
    image: "/images/recipes/D030.png",
    name: "Pork & Apple Cabbage Skillet",
    description: "Succulent pork with tender cabbage and softly caramelised apple, finished with rosemary for a fragrant sweet-and-savoury supper.",
    cookingTime: "30 minutes",
    calories: "590 kcal",
    protein: "35.0 g",
    equipment: "Large frying pan, saucepan, wooden spoon, knife, chopping board",
    ingredients: [
      { item: "Lean pork loin", shoppingItem: "Lean pork loin", quantity: "130 g" },
      { item: "Cabbage", shoppingItem: "Cabbage", quantity: "120 g" },
      { item: "Apple", shoppingItem: "Apples", quantity: "100 g" },
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
      calories: "590 kcal", protein: "35.0 g", carbohydrates: "69.0 g", fat: "21.0 g",
      fibre: "6.0 g", sodium: "76 mg", salt: "0.19 g", potassium: "650 mg", phosphate: "335 mg"
    },
    potassium: "Moderate",
    phosphate: "Moderate",
    purines: "Moderate",
    dietaryNote: "Apple brings a gentle sweetness to the savoury pork and cabbage, while rosemary adds a warm aromatic finish.",
    servings: 1,
  },
  {
    id: "D031",
    code: "D031",
    category: "Dinner",
    emoji: "🍗",
    image: "/images/recipes/D031.png",
    name: "Lemon Chicken & Herb Pasta",
    description: "Tender chicken and pasta with lemon, onion and herbs.",
    cookingTime: "25 minutes",
    calories: "625 kcal",
    protein: "34.0 g",
    equipment: "Large saucepan, frying pan, colander, wooden spoon, knife, chopping board",
    ingredients: [
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "100 g" },
      { item: "White pasta", shoppingItem: "White pasta", quantity: "90 g" },
      { item: "Onion", shoppingItem: "Onions", quantity: "50 g" },
      { item: "Green pepper", shoppingItem: "Green peppers", quantity: "60 g" },
      { item: "Olive oil", shoppingItem: "Olive oil", quantity: "1 tsp" },
      { item: "Lemon juice", shoppingItem: "Lemons", quantity: "1 tbsp" },
      { item: "Dried parsley", shoppingItem: "Dried parsley", quantity: "1/2 tsp" },
      { item: "Black pepper", shoppingItem: "Black pepper", quantity: "1/4 tsp" }
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
      calories: "625 kcal", protein: "34.0 g", carbohydrates: "82.0 g", fat: "16.0 g",
      fibre: "4.0 g", sodium: "75 mg", salt: "0.19 g", potassium: "600 mg", phosphate: "390 mg"
    },
    potassium: "Moderate",
    phosphate: "Moderate",
    purines: "Moderate",
    dietaryNote: "Chicken and pasta provide protein and energy, with lemon and herbs used instead of added salt.",
    servings: 1
  },
  {
    id: "D032",
    code: "D032",
    category: "Dinner",
    emoji: "🐟",
    image: "/images/recipes/D032.png",
    name: "Cod, Pepper & Lemon Rice",
    description: "Flaked cod served with basmati rice, green pepper and lemon.",
    cookingTime: "30 minutes",
    calories: "590 kcal",
    protein: "32.0 g",
    equipment: "Saucepan, frying pan, wooden spoon, knife, chopping board",
    ingredients: [
      { item: "Cod fillet", shoppingItem: "Cod fillets", quantity: "140 g" },
      { item: "Basmati rice", shoppingItem: "Basmati rice", quantity: "90 g" },
      { item: "Green pepper", shoppingItem: "Green peppers", quantity: "80 g" },
      { item: "Onion", shoppingItem: "Onions", quantity: "50 g" },
      { item: "Olive oil", shoppingItem: "Olive oil", quantity: "1 tsp" },
      { item: "Lemon juice", shoppingItem: "Lemons", quantity: "1 tbsp" },
      { item: "Dried thyme", shoppingItem: "Dried thyme", quantity: "1/2 tsp" },
      { item: "Black pepper", shoppingItem: "Black pepper", quantity: "1/4 tsp" }
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
      calories: "590 kcal", protein: "32.0 g", carbohydrates: "88.0 g", fat: "13.0 g",
      fibre: "3.5 g", sodium: "150 mg", salt: "0.38 g", potassium: "650 mg", phosphate: "330 mg"
    },
    potassium: "Moderate",
    phosphate: "Moderate",
    purines: "Moderate",
    dietaryNote: "Cod, rice and peppers make a straightforward dinner with fresh lemon flavour.",
    servings: 1
  },
  {
    id: "D033",
    code: "D033",
    category: "Dinner",
    emoji: "🥩",
    image: "/images/recipes/D033.png",
    name: "Beef, Cabbage & Rice",
    description: "Lean beef mince with cabbage, onion and basmati rice.",
    cookingTime: "30 minutes",
    calories: "635 kcal",
    protein: "33.0 g",
    equipment: "Saucepan, frying pan, wooden spoon, knife, chopping board",
    ingredients: [
      { item: "Beef mince (5% fat)", shoppingItem: "Beef mince (5% fat)", quantity: "120 g" },
      { item: "Basmati rice", shoppingItem: "Basmati rice", quantity: "90 g" },
      { item: "Cabbage", shoppingItem: "Cabbage", quantity: "120 g" },
      { item: "Onion", shoppingItem: "Onions", quantity: "50 g" },
      { item: "Olive oil", shoppingItem: "Olive oil", quantity: "1 tsp" },
      { item: "Dried thyme", shoppingItem: "Dried thyme", quantity: "1/2 tsp" },
      { item: "Black pepper", shoppingItem: "Black pepper", quantity: "1/4 tsp" }
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
      calories: "635 kcal", protein: "33.0 g", carbohydrates: "88.0 g", fat: "17.0 g",
      fibre: "5.0 g", sodium: "80 mg", salt: "0.20 g", potassium: "590 mg", phosphate: "340 mg"
    },
    potassium: "Moderate",
    phosphate: "Moderate",
    purines: "Moderate",
    dietaryNote: "Lean beef is combined with rice and cabbage for a filling one-pan-style dinner.",
    servings: 1
  },
  {
    id: "D034",
    code: "D034",
    category: "Dinner",
    emoji: "🍳",
    image: "/images/recipes/D034.png",
    name: "Cheesy Egg & Vegetable Rice",
    description: "Basmati rice with scrambled egg, sweetcorn, pepper and Cheddar.",
    cookingTime: "25 minutes",
    calories: "640 kcal",
    protein: "24.0 g",
    equipment: "Saucepan, large frying pan, wooden spoon, knife, chopping board",
    ingredients: [
      { item: "Basmati rice", shoppingItem: "Basmati rice", quantity: "90 g" },
      { item: "Egg", shoppingItem: "Eggs", quantity: "2" },
      { item: "Cheddar cheese", shoppingItem: "Cheddar cheese", quantity: "20 g" },
      { item: "Sweetcorn kernels", shoppingItem: "Sweetcorn kernels", quantity: "60 g" },
      { item: "Green pepper", shoppingItem: "Green peppers", quantity: "60 g" },
      { item: "Onion", shoppingItem: "Onions", quantity: "40 g" },
      { item: "Olive oil", shoppingItem: "Olive oil", quantity: "1 tsp" },
      { item: "Black pepper", shoppingItem: "Black pepper", quantity: "1/4 tsp" }
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
      calories: "640 kcal", protein: "24.0 g", carbohydrates: "91.0 g", fat: "21.0 g",
      fibre: "4.0 g", sodium: "310 mg", salt: "0.78 g", potassium: "500 mg", phosphate: "430 mg"
    },
    potassium: "Moderate",
    phosphate: "Moderate",
    purines: "Low",
    dietaryNote: "An egg-based rice dinner with vegetables and a modest amount of Cheddar for flavour.",
    servings: 1
  },
  {
    id: "D035",
    code: "D035",
    category: "Dinner",
    emoji: "🍗",
    image: "/images/recipes/D035.png",
    name: "Chicken, Cabbage & Herb Rice",
    description: "Chicken and cabbage served with fluffy basmati rice and rosemary.",
    cookingTime: "30 minutes",
    calories: "605 kcal",
    protein: "32.0 g",
    equipment: "Saucepan, frying pan, wooden spoon, knife, chopping board",
    ingredients: [
      { item: "Chicken breast", shoppingItem: "Chicken breast", quantity: "100 g" },
      { item: "Basmati rice", shoppingItem: "Basmati rice", quantity: "90 g" },
      { item: "Cabbage", shoppingItem: "Cabbage", quantity: "120 g" },
      { item: "Onion", shoppingItem: "Onions", quantity: "50 g" },
      { item: "Unsalted butter", shoppingItem: "Unsalted butter", quantity: "10 g" },
      { item: "Dried rosemary", shoppingItem: "Dried rosemary", quantity: "1/2 tsp" },
      { item: "Black pepper", shoppingItem: "Black pepper", quantity: "1/4 tsp" }
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
      calories: "605 kcal", protein: "32.0 g", carbohydrates: "88.0 g", fat: "15.0 g",
      fibre: "5.0 g", sodium: "70 mg", salt: "0.18 g", potassium: "610 mg", phosphate: "345 mg"
    },
    potassium: "Moderate",
    phosphate: "Moderate",
    purines: "Moderate",
    dietaryNote: "Chicken and rice are paired with cabbage and herbs for a simple, lightly seasoned dinner.",
    servings: 1
  },
  {
    id: "D036",
    code: "D036",
    category: "Dinner",
    emoji: "🐟",
    image: "/images/recipes/D036.png",
    name: "Cod & Cabbage Pasta",
    description: "Flaked cod and tender cabbage folded through pasta with lemon and parsley.",
    cookingTime: "25 minutes",
    calories: "600 kcal",
    protein: "33.0 g",
    equipment: "Large saucepan, frying pan, colander, wooden spoon, knife",
    ingredients: [
      { item: "Cod fillet", shoppingItem: "Cod fillets", quantity: "130 g" },
      { item: "White pasta", shoppingItem: "White pasta", quantity: "90 g" },
      { item: "Cabbage", shoppingItem: "Cabbage", quantity: "100 g" },
      { item: "Onion", shoppingItem: "Onions", quantity: "40 g" },
      { item: "Olive oil", shoppingItem: "Olive oil", quantity: "1 tsp" },
      { item: "Lemon juice", shoppingItem: "Lemons", quantity: "1 tbsp" },
      { item: "Dried parsley", shoppingItem: "Dried parsley", quantity: "1/2 tsp" },
      { item: "Black pepper", shoppingItem: "Black pepper", quantity: "1/4 tsp" }
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
      calories: "600 kcal", protein: "33.0 g", carbohydrates: "83.0 g", fat: "14.0 g",
      fibre: "5.0 g", sodium: "145 mg", salt: "0.36 g", potassium: "610 mg", phosphate: "320 mg"
    },
    potassium: "Moderate",
    phosphate: "Low",
    purines: "Low",
    dietaryNote: "Cod and pasta provide protein and energy, while cabbage and lemon add flavour and texture.",
    servings: 1
  },
  {
    id: "D037",
    code: "D037",
    category: "Dinner",
    emoji: "🥩",
    image: "/images/recipes/D037.png",
    name: "Pepper Beef & Rice",
    description: "Lean beef mince with green pepper and onion served over basmati rice.",
    cookingTime: "30 minutes",
    calories: "650 kcal",
    protein: "34.0 g",
    equipment: "Saucepan, frying pan, wooden spoon, knife, chopping board",
    ingredients: [
      { item: "Beef mince (5% fat)", shoppingItem: "Beef mince (5% fat)", quantity: "120 g" },
      { item: "Basmati rice", shoppingItem: "Basmati rice", quantity: "90 g" },
      { item: "Green pepper", shoppingItem: "Green peppers", quantity: "80 g" },
      { item: "Onion", shoppingItem: "Onions", quantity: "50 g" },
      { item: "Olive oil", shoppingItem: "Olive oil", quantity: "1 tsp" },
      { item: "Dried oregano", shoppingItem: "Dried oregano", quantity: "1/2 tsp" },
      { item: "Black pepper", shoppingItem: "Black pepper", quantity: "1/4 tsp" }
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
      calories: "650 kcal", protein: "34.0 g", carbohydrates: "89.0 g", fat: "18.0 g",
      fibre: "4.0 g", sodium: "82 mg", salt: "0.21 g", potassium: "570 mg", phosphate: "330 mg"
    },
    potassium: "Moderate",
    phosphate: "Moderate",
    purines: "High",
    dietaryNote: "Lean beef with rice and peppers makes a substantial dinner without a salty sauce.",
    servings: 1
  },
  {
    id: "D038",
    code: "D038",
    category: "Dinner",
    emoji: "🍖",
    image: "/images/recipes/D038.png",
    name: "Pork & Apple Herb Pasta",
    description: "Tender pork with apple, pasta and onion finished with rosemary.",
    cookingTime: "25 minutes",
    calories: "640 kcal",
    protein: "35.0 g",
    equipment: "Large saucepan, frying pan, colander, wooden spoon, knife, chopping board",
    ingredients: [
      { item: "Lean pork loin", shoppingItem: "Lean pork loin", quantity: "130 g" },
      { item: "White pasta", shoppingItem: "White pasta", quantity: "85 g" },
      { item: "Apple", shoppingItem: "Apples", quantity: "80 g" },
      { item: "Onion", shoppingItem: "Onions", quantity: "50 g" },
      { item: "Unsalted butter", shoppingItem: "Unsalted butter", quantity: "10 g" },
      { item: "Dried rosemary", shoppingItem: "Dried rosemary", quantity: "1/2 tsp" },
      { item: "Black pepper", shoppingItem: "Black pepper", quantity: "1/4 tsp" }
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
      calories: "640 kcal", protein: "35.0 g", carbohydrates: "78.0 g", fat: "21.0 g",
      fibre: "5.0 g", sodium: "78 mg", salt: "0.20 g", potassium: "610 mg", phosphate: "350 mg"
    },
    potassium: "Moderate",
    phosphate: "Moderate",
    purines: "Moderate",
    dietaryNote: "Apple adds sweetness to pork and pasta, with rosemary providing extra flavour.",
    servings: 1
  },
  {
    id: "D039",
    code: "D039",
    category: "Dinner",
    emoji: "🍳",
    image: "/images/recipes/D039.png",
    name: "Egg, Cauliflower & Herb Pasta",
    description: "Pasta with egg, cauliflower, onion and a light herb dressing.",
    cookingTime: "25 minutes",
    calories: "585 kcal",
    protein: "23.0 g",
    equipment: "Large saucepan, frying pan, colander, mixing bowl, wooden spoon",
    ingredients: [
      { item: "White pasta", shoppingItem: "White pasta", quantity: "90 g" },
      { item: "Egg", shoppingItem: "Eggs", quantity: "2" },
      { item: "Cauliflower", shoppingItem: "Cauliflower", quantity: "100 g" },
      { item: "Onion", shoppingItem: "Onions", quantity: "50 g" },
      { item: "Olive oil", shoppingItem: "Olive oil", quantity: "1 tsp" },
      { item: "Dried parsley", shoppingItem: "Dried parsley", quantity: "1/2 tsp" },
      { item: "Black pepper", shoppingItem: "Black pepper", quantity: "1/4 tsp" }
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
      calories: "585 kcal", protein: "23.0 g", carbohydrates: "79.0 g", fat: "19.0 g",
      fibre: "5.0 g", sodium: "310 mg", salt: "0.78 g", potassium: "570 mg", phosphate: "400 mg"
    },
    potassium: "Moderate",
    phosphate: "Moderate",
    purines: "Low",
    dietaryNote: "An egg-based pasta dinner with cauliflower and herbs instead of meat or fish.",
    servings: 1
  },
  {
    id: "d040-cod-sweetcorn-potato-bake",
    code: "D040",
    category: "Dinner",
    emoji: "🐟",
    image: "/images/recipes/D040.png",
    name: "Cod & Sweetcorn Potato Bake",
    description: "Flaky baked cod layered with tender potato and sweetcorn in a creamy, lightly seasoned bake with a golden finish.",
    cookingTime: "40 minutes",
    calories: "610 kcal",
    protein: "34.0 g",
    equipment: "Oven, baking dish, saucepan, colander, knife, chopping board",
    ingredients: [
      { item: "Cod fillet", shoppingItem: "Cod fillet", quantity: "120 g" },
      { item: "Potatoes", shoppingItem: "Potatoes", quantity: "180 g" },
      { item: "Sweetcorn kernels", shoppingItem: "Sweetcorn kernels", quantity: "50 g" },
      { item: "Single cream", shoppingItem: "Single cream", quantity: "40 ml" },
      { item: "Unsalted butter", shoppingItem: "Unsalted butter", quantity: "10 g" },
      { item: "Cabbage", shoppingItem: "Cabbage", quantity: "80 g" },
      { item: "Dried parsley", shoppingItem: "Dried parsley", quantity: "¼ tsp" },
      { item: "Black pepper", shoppingItem: "Black pepper", quantity: "¼ tsp" }
    ],
    method: [
      "00:00 — Heat the oven to 200°C.",
      "03:00 — Peel and slice the potatoes into even pieces.",
      "05:00 — Boil the potatoes until just tender, then drain.",
      "12:00 — Cook the cabbage and sweetcorn in unsalted water until tender, then drain.",
      "15:00 — Place the potato, cabbage and sweetcorn in a baking dish.",
      "18:00 — Place the cod on top and spoon over the cream.",
      "20:00 — Dot with the butter and sprinkle over the parsley and black pepper.",
      "22:00 — Bake until the cod is opaque and flakes easily and the top is lightly golden.",
      "40:00 — Serve immediately."
    ],
    nutrition: {
      calories: "610 kcal", protein: "34.0 g", carbohydrates: "64.0 g", fat: "24.0 g",
      fibre: "5.0 g", sodium: "150 mg", salt: "0.38 g", potassium: "680 mg", phosphate: "345 mg"
    },
    potassium: "Moderate",
    phosphate: "Moderate",
    purines: "Low",
    dietaryNote: "Flaky cod, tender potato and sweetcorn make a comforting baked dinner with gentle seasoning and no added salt.",
    servings: 1,
  }
];
