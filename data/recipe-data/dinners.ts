import type { Recipe } from "../recipes";

export const dinners: Recipe[] = [
{
    id: "chicken-curry",
    code: "D001",
    servings: 1,

    source: {
      name: "RenalPlan Original",
      url: "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/971021/McCance_and_Widdowsons_Composition_of_Foods_integrated_dataset_2021.pdf",
      logo: "/images/govuk.png",
      description: "Developed specifically for RenalPlan. Nutritional values calculated using McCance and Widdowson�s Composition of Foods Integrated Dataset (CoFID) 2021.",
      linkText: "View CoFID 2021",
    },    category: "Chicken",
    emoji: "??",
    image: "/images/recipes/chicken-curry.png",
    name: "Chicken Curry",

    description:
      "A mild, tomato-based chicken curry made with simple everyday ingredients for a comforting family favourite.",

    cookingTime: "40 minutes",

    calories: "520 kcal",

    protein: "42g",

    equipment:
      "Large frying pan or saut� pan, saucepan",

    ingredients: [
      {
        item: "Chicken breast, diced",
        shoppingItem: "Chicken breast",
        quantity: "150 g",
      },
      {
        item: "Large onion, diced",
        shoppingItem: "Onion",
        quantity: "�",
      },
      {
        item: "Garlic, crushed",
        shoppingItem: "Garlic",
        quantity: "1 clove",
      },
      {
        item: "Red pepper, diced",
        shoppingItem: "Red pepper",
        quantity: "�",
      },
      {
        item: "Mild curry powder", shoppingItem: "Mild curry powder",
        quantity: "1 tsp",
      },
      {
        item: "Tomato pur�e",
        shoppingItem: "Tomato pur�e", quantity: "1� tsp",
      },
      {
        item: "Passata",
        shoppingItem: "Passata", quantity: "100 g",
      },
      {
        item: "Reduced-salt chicken stock",
        shoppingItem: "Reduced-salt chicken stock", quantity: "50 ml",
      },
      {
        item: "Green beans, trimmed and cut into bite-sized pieces",
        shoppingItem: "Green beans",
        quantity: "37.5 g",
      },
      {
        item: "Dry basmati rice",
        shoppingItem: "Basmati rice", quantity: "75 g",
      },
      {
        item: "Olive oil",
        shoppingItem: "Olive oil", quantity: "1� tsp",
      },
      {
        item: "Freshly ground black pepper",
        shoppingItem: "Black pepper", quantity: "To taste",
      },
    ],

    method: [
      "Bring a saucepan of water to the boil, ready for the rice later.",
      "Heat the olive oil in a large frying pan over a medium heat.",
      "Add the onion and cook for 4�5 minutes until softened.",
      "Stir in the garlic and cook for 30 seconds.",
      "Add the diced chicken and cook for 5�6 minutes until lightly browned on all sides.",
      "Stir in the red pepper and cook for a further 2 minutes.",
      "Sprinkle over the curry powder and stir until the chicken and vegetables are evenly coated.",
      "Stir in the tomato pur�e and cook for 1 minute.",
      "Pour in the passata and reduced-salt chicken stock, then add the green beans. Bring to a gentle simmer and cook for 15 minutes, stirring occasionally.",
      "While the curry is simmering, cook the basmati rice according to the packet instructions.",
      "Taste the curry and season with freshly ground black pepper if required.",
      "Drain the rice and serve immediately with the chicken curry.",
    ],

    nutrition: {
      calories: "520 kcal",
      protein: "42 g",
      carbohydrates: "50 g",
      fat: "13 g",
      fibre: "6 g",
      sodium: "190 mg",
    },
  potassium: "Moderate",
  phosphate: "Low",
  purines: "Low",
  dietaryNote: "Tomato-based ingredients make this moderate in potassium.",
  },
{
    id: "cottage-pie",
    code: "D002",
    servings: 1,
    source: {
      name: "cottage pie",
      url: "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/971021/McCance_and_Widdowsons_Composition_of_Foods_integrated_dataset_2021.pdf",
      logo: "/images/govuk.png",
    },
    category: "Beef",
    emoji: "??",
    image: "/images/recipes/cottage-pie.png",
    name: "Cottage Pie",

    description:
      "A comforting family favourite made with lean beef, vegetables and creamy mashed potato, with all the flavour of a traditional Cottage Pie.",

    cookingTime:
      "55 minutes",

    calories:
      "540 kcal",

    protein:
      "38g",

    equipment:
      "Large frying pan, saucepan, ovenproof dish, potato masher",

    ingredients: [
      {
        item: "Floury potatoes, peeled and chopped",
        shoppingItem: "Potato",
        quantity: "200 g"
      },
      {
        item: "Lean beef mince (5% fat)", shoppingItem: "Lean beef mince",
        quantity: "150 g"
      },
      {
        item: "Large onion, diced",
        shoppingItem: "Onion",
        quantity: "�"
      },
      {
        item: "Medium carrot, diced",
        shoppingItem: "Carrot",
        quantity: "�"
      },
      {
        item: "Tomato pur�e", shoppingItem: "Tomato pur�e",
        quantity: "1� tsp"
      },
      {
        item: "Worcestershire sauce", shoppingItem: "Worcestershire sauce",
        quantity: "� tsp"
      },
      {
        item: "Dried thyme", shoppingItem: "Dried thyme",
        quantity: "� tsp"
      },
      {
        item: "Reduced-salt beef stock", shoppingItem: "Reduced-salt beef stock",
        quantity: "75 ml"
      },
      {
        item: "Frozen peas", shoppingItem: "Frozen peas",
        quantity: "37.5 g"
      },
      {
        item: "Butter", shoppingItem: "Unsalted Butter",
        quantity: "5 g"
      },
      {
        item: "Semi-skimmed milk", shoppingItem: "Semi-skimmed milk",
        quantity: "15 ml"
      },
      {
        item: "Freshly ground black pepper", shoppingItem: "Black pepper",
        quantity: "To taste"
      }
    ],

    method: [
      "Preheat the oven to 200�C (180�C fan).",
      "Place the potatoes into a saucepan of cold water, bring to the boil and cook for 18�20 minutes until tender.",
      "While the potatoes are cooking, place the beef mince, onion and carrot into a large frying pan over a medium heat. Cook for 8�10 minutes, breaking up the mince with a wooden spoon, until the beef is browned and the vegetables have softened.",
      "Stir in the tomato pur�e, Worcestershire sauce and dried thyme, then cook for 1 minute.",
      "Pour in the reduced-salt beef stock, stir well and bring to a gentle simmer.",
      "Add the frozen peas and simmer for 10�12 minutes, stirring occasionally until the sauce has reduced slightly.",
      "While the filling is simmering, drain the potatoes thoroughly. Add the butter and milk, then mash until smooth. Season with freshly ground black pepper.",
      "Spoon the beef mixture evenly into an ovenproof dish.",
      "Spread the mashed potato over the filling, smoothing it with the back of a spoon. Lightly roughen the surface with a fork to help it brown.",
      "Bake for 20�25 minutes, until the potato is lightly golden and the filling is bubbling around the edges.",
      "Leave to stand for 5 minutes before serving."
    ],

    nutrition: {
      calories: "540 kcal",
      protein: "38 g",
      carbohydrates: "44 g",
      fat: "18 g",
      fibre: "7 g",
      sodium: "260 mg",
    },
  potassium: "Moderate",
  phosphate: "Moderate",
  purines: "Moderate",
  dietaryNote: "Potato, beef and peas make this a more moderate renal-diet choice. Source audit: RenalPlan Original � Hearty cottage pie is a candidate match; this RenalPlan recipe is not classified as an exact/scaled source recipe.",
  },
{
    id: "chicken-arrabbiata",
    code: "D003",
    servings: 1,

    source: {
      name: "RenalPlan Original",
      url: "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/971021/McCance_and_Widdowsons_Composition_of_Foods_integrated_dataset_2021.pdf",
      logo: "/images/govuk.png",
      description: "Developed specifically for RenalPlan. Nutritional values calculated using McCance and Widdowson�s Composition of Foods Integrated Dataset (CoFID) 2021.",
      linkText: "View CoFID 2021",
    },    category: "Chicken",
    emoji: "??",
    image: "/images/recipes/chicken-arrabbiata.png",
    name: "Chicken Arrabbiata Pasta",

    description:
      "A simple tomato-based chicken pasta with a gentle warmth, designed to be kidney-friendly while remaining a family favourite.",

    cookingTime: "35 minutes",

    calories: "500 kcal",

    protein: "40g",

    equipment:
      "Large frying pan or saut� pan, saucepan",

    ingredients: [
      {
        item: "Chicken breast, diced",
        shoppingItem: "Chicken breast",
        quantity: "150 g",
      },
      {
        item: "Penne pasta",
        shoppingItem: "Pasta",
        quantity: "75 g",
      },
      {
        item: "Large onion, diced",
        shoppingItem: "Onion",
        quantity: "�",
      },
      {
        item: "Garlic, crushed",
        shoppingItem: "Garlic",
        quantity: "1 clove",
      },
      {
        item: "Red pepper, diced",
        shoppingItem: "Red pepper",
        quantity: "�",
      },
      {
        item: "Tomato pur�e", shoppingItem: "Tomato pur�e",
        quantity: "1� tsp",
      },
      {
        item: "Passata",
        shoppingItem: "Passata", quantity: "100 g",
      },
      {
        item: "Reduced-salt chicken stock",
        shoppingItem: "Reduced-salt chicken stock", quantity: "50 ml",
      },
      {
        item: "Dried chilli flakes",
        shoppingItem: "Dried chilli flakes", quantity: "� tsp",
      },
      {
        item: "Olive oil",
        shoppingItem: "Olive oil", quantity: "1� tsp",
      },
      {
        item: "Freshly ground black pepper",
        shoppingItem: "Black pepper", quantity: "To taste",
      },
    ],

    method: [
      "Bring a saucepan of water to the boil and cook the pasta according to the packet instructions.",
      "Heat the olive oil in a large frying pan over a medium heat.",
      "Add the onion and cook for 4�5 minutes until softened.",
      "Stir in the garlic and cook for 30 seconds.",
      "Add the diced chicken and cook for 5�6 minutes until lightly browned.",
      "Add the red pepper and cook for a further 2 minutes.",
      "Stir in the tomato pur�e and chilli flakes and cook for 1 minute.",
      "Pour in the passata and reduced-salt chicken stock, then simmer gently for 10�15 minutes until the chicken is cooked through.",
      "Drain the pasta and add it to the sauce.",
      "Stir everything together and season with freshly ground black pepper if required.",
      "Serve immediately.",
    ],

    nutrition: {
      calories: "500 kcal",
      protein: "40 g",
      carbohydrates: "48 g",
      fat: "9 g",
      fibre: "6 g",
      sodium: "190 mg",
    },
  potassium: "Moderate",
  phosphate: "Low",
  purines: "Low",
  dietaryNote: "Tomato-based ingredients make this moderate in potassium.",
  },
{
  id: "spaghetti-bolognese",
  code: "D004",
    servings: 1,

    source: {
      name: "RenalPlan Original � Pasta Bolognese",
      url: "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/971021/McCance_and_Widdowsons_Composition_of_Foods_integrated_dataset_2021.pdf",
      logo: "/images/govuk.png",
    },  category: "Beef",
  emoji: "??",
  image: "/images/recipes/spaghetti-bolognese.png",
  name: "Spaghetti Bolognese",

  description:
    "A rich, tomato-based family favourite made with lean beef, simple vegetables and everyday ingredients.",

  cookingTime: "40 minutes",

  calories: "510 kcal",

  protein: "38g",

  equipment:
    "Large frying pan, saucepan",

  ingredients: [
    {
      item: "Lean beef mince (5% fat)",
      shoppingItem: "Lean beef mince", quantity: "150 g",
    },
    {
      item: "Dried spaghetti",
      shoppingItem: "Spaghetti", quantity: "75 g",
    },
    {
      item: "Large onion, finely diced",
      shoppingItem: "Onion",
      quantity: "�",
    },
    {
      item: "Medium carrot, finely diced",
      shoppingItem: "Carrot",
      quantity: "�",
    },
    {
      item: "Garlic, crushed",
      shoppingItem: "Garlic",
      quantity: "1 clove",
    },
    {
      item: "Tomato pur�e",
      shoppingItem: "Tomato pur�e", quantity: "1� tsp",
    },
    {
      item: "Passata",
      shoppingItem: "Passata", quantity: "100 g",
    },
    {
      item: "Dried mixed herbs",
      shoppingItem: "Dried mixed herbs", quantity: "� tsp",
    },
    {
      item: "Freshly ground black pepper",
      shoppingItem: "Black pepper", quantity: "To taste",
    },
  ],

  method: [
    "Bring a saucepan of water to the boil and cook the spaghetti according to the packet instructions.",
    "While the spaghetti is cooking, place the lean beef mince and onion into a large frying pan over a medium heat. Cook for 5�6 minutes, breaking up the mince with a wooden spoon until browned.",
    "Add the carrot and garlic and cook for a further 2�3 minutes until softened.",
    "Stir in the tomato pur�e and cook for 1 minute, stirring continuously.",
    "Pour in the passata and stir in the dried mixed herbs. Bring to a gentle simmer.",
    "Simmer for 12�15 minutes, stirring occasionally until the sauce has thickened.",
    "While the sauce is finishing, drain the spaghetti.",
    "Divide the spaghetti between serving bowls and spoon the Bolognese sauce over the top.",
    "Finish with freshly ground black pepper and serve immediately.",
  ],

  nutrition: {
    calories: "510 kcal",
    protein: "38 g",
    carbohydrates: "47 g",
    fat: "11 g",
    fibre: "6 g",
      sodium: "130 mg",
  },
  potassium: "Moderate",
  phosphate: "Low",
  purines: "Moderate",
  dietaryNote: "Beef makes this moderate in purines; the tomato base also raises potassium. Source audit: RenalPlan Original � Pasta Bolognese is a candidate match; this RenalPlan recipe is not classified as an exact/scaled source recipe.",
},
{
  id: "lemon-herb-chicken-tray-bake",
  code: "D005",
    servings: 1,

    source: {
      name: "RenalPlan Original",
      url: "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/971021/McCance_and_Widdowsons_Composition_of_Foods_integrated_dataset_2021.pdf",
      logo: "/images/govuk.png",
      description: "Developed specifically for RenalPlan. Nutritional values calculated using McCance and Widdowson�s Composition of Foods Integrated Dataset (CoFID) 2021.",
      linkText: "View CoFID 2021",
    },  category: "Chicken",
  emoji: "??",
  image: "/images/recipes/lemon-herb-chicken.png",
  name: "Lemon & Herb Chicken Tray Bake",

  description:
    "A simple one-tray family dinner with roasted chicken, potatoes and vegetables, flavoured with lemon and herbs for a fresh, satisfying meal.",

  cookingTime: "45 minutes",

  calories: "510 kcal",

  protein: "42g",

  equipment:
    "Fan oven, large roasting tray",

  ingredients: [
    {
      item: "Chicken breast, cut into large chunks",
      shoppingItem: "Chicken breast",
      quantity: "150 g",
    },
    {
      item: "Floury potatoes, cut into bite-sized chunks",
      shoppingItem: "Potatoes",
      quantity: "200 g",
    },
    {
      item: "Red pepper, cut into chunks",
      shoppingItem: "Red pepper",
      quantity: "�",
    },
    {
      item: "Red onion, cut into wedges",
      shoppingItem: "Red onion",
      quantity: "�",
    },
    {
      item: "Olive oil",
      shoppingItem: "Olive oil", quantity: "1� tsp",
    },
    {
      item: "Lemon juice",
      shoppingItem: "Lemon",
      quantity: "�",
    },
    {
      item: "Lemon zest",
      shoppingItem: "Lemon",
      quantity: "�",
    },
    {
      item: "Dried mixed herbs",
      shoppingItem: "Dried mixed herbs", quantity: "� tsp",
    },
    {
      item: "Freshly ground black pepper",
      shoppingItem: "Black pepper", quantity: "To taste",
    },
  ],

  method: [
    "Preheat the oven to 200�C (180�C fan).",
    "Place the potatoes into a large roasting tray and drizzle with half of the olive oil. Toss to coat evenly and roast for 15 minutes.",
    "While the potatoes are roasting, place the chicken, red pepper and red onion into a bowl. Add the remaining olive oil, lemon juice, lemon zest, dried mixed herbs and freshly ground black pepper. Mix well until everything is evenly coated.",
    "Remove the roasting tray from the oven and add the chicken and vegetables to the potatoes, spreading everything into a single layer.",
    "Return the tray to the oven and roast for 25�30 minutes, turning everything halfway through, until the chicken is cooked through, the potatoes are golden and the vegetables are lightly roasted.",
    "Serve immediately.",
  ],

  nutrition: {
    calories: "510 kcal",
    protein: "42 g",
    carbohydrates: "42 g",
    fat: "12 g",
    fibre: "5 g",
      sodium: "110 mg",
  },
  potassium: "Moderate",
  phosphate: "Low",
  purines: "Low",
  dietaryNote: "The potato portion makes this moderate in potassium.",
},
{
  id: "chicken-fajitas",
  code: "D006",
    servings: 1,

    source: {
      name: "RenalPlan Original � Chicken fajitas",
      url: "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/971021/McCance_and_Widdowsons_Composition_of_Foods_integrated_dataset_2021.pdf",
      logo: "/images/govuk.png",
    },  category: "Chicken",
  emoji: "??",
  image: "/images/recipes/chicken-fajitas.png",
  name: "Chicken Fajitas",

  description:
    "A quick, colourful family favourite made with tender chicken, peppers and onions in a mild fajita seasoning, served in soft white tortilla wraps.",

  cookingTime: "30 minutes",

  calories: "510 kcal",

  protein: "40g",

  equipment:
    "Large frying pan",

  ingredients: [
    {
      item: "Chicken breast, cut into thin strips",
      shoppingItem: "Chicken breast",
      quantity: "150 g",
    },
    {
      item: "White Tortilla Wraps",
      shoppingItem: "White Tortilla Wraps", quantity: "2",
    },
    {
      item: "Large onion, sliced",
      shoppingItem: "Onion",
      quantity: "�",
    },
    {
      item: "Red pepper, sliced",
      shoppingItem: "Red pepper",
      quantity: "�",
    },
    {
      item: "Green pepper, sliced",
      shoppingItem: "Green pepper",
      quantity: "�",
    },
    {
      item: "Olive oil",
      shoppingItem: "Olive oil", quantity: "1� tsp",
    },
    {
      item: "Ready-made mild fajita seasoning",
      shoppingItem: "Ready-made mild fajita seasoning", quantity: "1 tsp",
    },
    {
      item: "Lime juice",
      shoppingItem: "Lime",
      quantity: "�",
    },
    {
      item: "Freshly ground black pepper",
      shoppingItem: "Black pepper", quantity: "To taste",
    },
  ],

  method: [
    "Heat the olive oil in a large frying pan over a medium-high heat.",
    "Add the chicken strips and cook for 5�6 minutes, stirring regularly until lightly browned.",
    "Add the sliced onion and peppers and continue cooking for 5 minutes, stirring occasionally until softened but still with a little bite.",
    "Sprinkle over the fajita seasoning and stir well until the chicken and vegetables are evenly coated.",
    "Add the lime juice and cook for a further 1 minute, stirring continuously.",
    "While the filling finishes cooking, warm the white tortilla wraps according to the packet instructions.",
    "Divide the chicken and vegetable mixture evenly between the warmed tortilla wraps.",
    "Finish with freshly ground black pepper and serve immediately.",
  ],

  nutrition: {
    calories: "510 kcal",
    protein: "40 g",
    carbohydrates: "38 g",
    fat: "13 g",
    fibre: "5 g",
      sodium: "970 mg",
  },
  potassium: "Low",
  phosphate: "Low",
  purines: "Low",
},
{
  id: "roast-chicken-dinner",
  code: "D007",
    servings: 1,

    source: {
      name: "RenalPlan Original",
      url: "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/971021/McCance_and_Widdowsons_Composition_of_Foods_integrated_dataset_2021.pdf",
      logo: "/images/govuk.png",
      description: "Developed specifically for RenalPlan. Nutritional values calculated using McCance and Widdowson�s Composition of Foods Integrated Dataset (CoFID) 2021.",
      linkText: "View CoFID 2021",
    },  category: "Chicken",
  emoji: "??",
  image: "/images/recipes/roast-chicken-dinner.png",
  name: "Roast Chicken Dinner",

  description:
    "A traditional roast chicken dinner made with lean chicken breast, roasted potatoes and vegetables, with all the flavour of a classic Sunday roast.",

  cookingTime: "60 minutes",

  calories: "550 kcal",

  protein: "43g",

  equipment:
    "Fan oven, roasting tray, saucepan",

  ingredients: [
    {
      item: "Chicken breast",
      shoppingItem: "Chicken breast",
      quantity: "150 g",
    },
    {
      item: "Floury potatoes, peeled and cut into roast-sized chunks",
      shoppingItem: "Potatoes",
      quantity: "200 g",
    },
    {
      item: "Carrot, cut into batons",
      shoppingItem: "Carrot",
      quantity: "�",
    },
    {
      item: "Frozen peas",
      shoppingItem: "Frozen peas", quantity: "37.5 g",
    },
    {
      item: "Red onion, cut into wedges",
      shoppingItem: "Onion",
      quantity: "�",
    },
    {
      item: "Olive oil",
      shoppingItem: "Olive oil", quantity: "1� tsp",
    },
    {
      item: "Dried mixed herbs",
      shoppingItem: "Dried mixed herbs", quantity: "� tsp",
    },
    {
      item: "Reduced-salt chicken gravy",
      shoppingItem: "Reduced-salt chicken gravy", quantity: "75 ml",
    },
    {
      item: "Freshly ground black pepper",
      shoppingItem: "Black pepper", quantity: "To taste",
    },
  ],

  method: [
    "Preheat the oven to 200�C (180�C fan).",
    "Place the potatoes into a saucepan of cold water. Bring to the boil and cook for 8 minutes, then drain well and allow them to steam dry for 2 minutes.",
    "Place the potatoes into a roasting tray, drizzle with the olive oil and roast for 20 minutes.",
    "While the potatoes are roasting, season the chicken with the dried mixed herbs and freshly ground black pepper.",
    "Remove the roasting tray from the oven and add the chicken, carrots and red onion. Return to the oven and roast for a further 25�30 minutes, turning the potatoes halfway through, until the chicken is cooked through and the potatoes are crisp and golden.",
    "During the last 5 minutes of cooking, boil the frozen peas until tender and heat the reduced-salt chicken gravy according to the packet instructions.",
    "Serve the roast chicken with the potatoes, vegetables and gravy.",
  ],

  nutrition: {
    calories: "550 kcal",
    protein: "43 g",
    carbohydrates: "45 g",
    fat: "14 g",
    fibre: "6 g",
      sodium: "230 mg",
  },
  potassium: "Moderate",
  phosphate: "Moderate",
  purines: "Low",
  dietaryNote: "Potatoes, peas and gravy make this a more moderate renal-diet choice.",
},
{
  id: "honey-mustard-chicken",
  code: "D008",
    servings: 1,

    source: {
      name: "RenalPlan Original",
      url: "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/971021/McCance_and_Widdowsons_Composition_of_Foods_integrated_dataset_2021.pdf",
      logo: "/images/govuk.png",
      description: "Developed specifically for RenalPlan. Nutritional values calculated using McCance and Widdowson�s Composition of Foods Integrated Dataset (CoFID) 2021.",
      linkText: "View CoFID 2021",
    },  category: "Chicken",
  emoji: "??",
  image: "/images/recipes/honey-mustard-chicken.png",
  name: "Honey & Mustard Chicken",

  description:
    "Tender chicken breast coated in a light honey and mustard glaze, served with roasted potatoes and vegetables for a simple family dinner.",

  cookingTime: "40 minutes",

  calories: "520 kcal",

  protein: "42g",

  equipment:
    "Fan oven, large roasting tray, mixing bowl",

  ingredients: [
    {
      item: "Chicken breast",
      shoppingItem: "Chicken breast",
      quantity: "150 g",
    },
    {
      item: "Floury potatoes, cut into bite-sized chunks",
      shoppingItem: "Potatoes",
      quantity: "200 g",
    },
    {
      item: "Red pepper, cut into chunks",
      shoppingItem: "Red pepper",
      quantity: "�",
    },
    {
      item: "Red onion, cut into wedges",
      shoppingItem: "Red onion",
      quantity: "�",
    },
    {
      item: "Olive oil",
      shoppingItem: "Olive oil", quantity: "1� tsp",
    },
    {
      item: "Clear honey",
      shoppingItem: "Clear honey", quantity: "1 tsp",
    },
    {
      item: "Dijon mustard",
      shoppingItem: "Dijon mustard", quantity: "1 tsp",
    },
    {
      item: "Dried mixed herbs",
      shoppingItem: "Dried mixed herbs", quantity: "� tsp",
    },
    {
      item: "Freshly ground black pepper",
      shoppingItem: "Black pepper", quantity: "To taste",
    },
  ],

  method: [
    "Preheat the oven to 200�C (180�C fan).",
    "Place the potatoes into a large roasting tray, drizzle with half of the olive oil and toss to coat. Roast for 15 minutes.",
    "While the potatoes are roasting, place the chicken into a mixing bowl. Add the remaining olive oil, honey, Dijon mustard, dried mixed herbs and freshly ground black pepper. Mix until the chicken is evenly coated.",
    "Add the red pepper and red onion to the bowl and toss lightly to coat with any remaining glaze.",
    "Remove the roasting tray from the oven and add the chicken and vegetables to the potatoes, spreading everything into a single layer.",
    "Return to the oven and roast for 20�25 minutes, turning the potatoes and vegetables halfway through, until the chicken is cooked through and the potatoes are crisp and golden.",
    "Serve immediately.",
  ],

  nutrition: {
    calories: "520 kcal",
    protein: "42 g",
    carbohydrates: "43 g",
    fat: "12 g",
    fibre: "5 g",
      sodium: "160 mg",
  },
  potassium: "Moderate",
  phosphate: "Low",
  purines: "Low",
  dietaryNote: "The potato portion makes this moderate in potassium.",
},
{
  id: "homemade-beef-burgers",
  code: "D009",
    servings: 1,

    source: {
      name: "RenalPlan Original",
      url: "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/971021/McCance_and_Widdowsons_Composition_of_Foods_integrated_dataset_2021.pdf",
      logo: "/images/govuk.png",
      description: "Developed specifically for RenalPlan. Nutritional values calculated using McCance and Widdowson�s Composition of Foods Integrated Dataset (CoFID) 2021.",
      linkText: "View CoFID 2021",
    },  category: "Beef",
  emoji: "??",
  image: "/images/recipes/homemade-beef-burgers.png",
  name: "Homemade Beef Burgers",

  description:
    "Lean homemade beef burgers served in a soft white burger bun with salad and oven-baked potato wedges for a family favourite meal.",

  cookingTime: "40 minutes",

  calories: "560 kcal",

  protein: "39g",

  equipment:
    "Fan oven, baking tray, frying pan or grill pan",

  ingredients: [
    {
      item: "Lean beef mince (5% fat)",
      shoppingItem: "Lean beef mince", quantity: "150 g",
    },
    {
      item: "Small white burger bun",
      shoppingItem: "white burger bun", quantity: "1",
    },
    {
      item: "Floury potatoes, cut into wedges",
      shoppingItem: "Potatoes",
      quantity: "200 g",
    },
    {
      item: "Small onion, finely diced",
      shoppingItem: "Onion",
      quantity: "�",
    },
    {
      item: "Olive oil",
      shoppingItem: "Olive oil", quantity: "1� tsp",
    },
    {
      item: "Tomato pur�e",
      shoppingItem: "Tomato pur�e", quantity: "1 tsp",
    },
    {
      item: "Worcestershire sauce",
      shoppingItem: "Worcestershire sauce", quantity: "� tsp",
    },
    {
      item: "Lettuce leaf",
      shoppingItem: "Lettuce", quantity: "1 leaf",
    },
    {
      item: "Tomato slices",
      shoppingItem: "Tomato",
      quantity: "2",
    },
    {
      item: "Freshly ground black pepper",
      shoppingItem: "Black pepper", quantity: "To taste",
    },
  ],

  method: [
    "Preheat the oven to 200�C (180�C fan).",
    "Place the potato wedges onto a baking tray, drizzle with the olive oil and toss to coat evenly. Roast for 35�40 minutes, turning halfway through, until golden and crisp.",
    "While the wedges are cooking, place the beef mince, diced onion, tomato pur�e, Worcestershire sauce and freshly ground black pepper into a mixing bowl. Mix gently until just combined.",
    "Shape the mixture into one burger approximately 2cm thick.",
    "Heat a frying pan or grill pan over a medium-high heat.",
    "Cook the burger for 5�6 minutes on each side, until browned and cooked all the way through.",
    "During the final 2 minutes, lightly warm the burger bun.",
    "Place the burger into the bun and top with the lettuce and tomato slices.",
    "Serve immediately with the oven-baked potato wedges.",
  ],

  nutrition: {
    calories: "560 kcal",
    protein: "39 g",
    carbohydrates: "44 g",
    fat: "16 g",
    fibre: "5 g",
      sodium: "390 mg",
  },
  potassium: "High",
  phosphate: "Moderate",
  purines: "Moderate",
  dietaryNote: "Potato and tomato contribute potassium, while beef makes this moderate in purines.",
},
{
  id: "beef-meatballs-tomato-herb-sauce",
  code: "D010",
    servings: 1,

    source: {
      name: "RenalPlan Original",
      url: "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/971021/McCance_and_Widdowsons_Composition_of_Foods_integrated_dataset_2021.pdf",
      logo: "/images/govuk.png",
      description: "Developed specifically for RenalPlan. Nutritional values calculated using McCance and Widdowson�s Composition of Foods Integrated Dataset (CoFID) 2021.",
      linkText: "View CoFID 2021",
    },  category: "Beef",
  emoji: "??",
  image: "/images/recipes/beef-meatballs.png",
  name: "Beef Meatballs in Tomato & Herb Sauce",

  description:
    "Lean homemade beef meatballs simmered in a rich tomato and herb sauce, served with spaghetti for a simple family meal.",

  cookingTime: "40 minutes",

  calories: "530 kcal",

  protein: "39g",

  equipment:
    "Large frying pan, saucepan, mixing bowl",

  ingredients: [
    {
      item: "Lean beef mince (5% fat)",
      shoppingItem: "Lean beef mince", quantity: "150 g",
    },
    {
      item: "Dried spaghetti",
      shoppingItem: "Spaghetti", quantity: "75 g",
    },
    {
      item: "Large onion, finely diced",
      shoppingItem: "Onion",
      quantity: "�",
    },
    {
      item: "Garlic, crushed",
      shoppingItem: "Garlic",
      quantity: "1 clove",
    },
    {
      item: "Tomato pur�e",
      shoppingItem: "Tomato pur�e", quantity: "1� tsp",
    },
    {
      item: "Passata",
      shoppingItem: "Passata", quantity: "100 g",
    },
    {
      item: "Dried mixed herbs",
      shoppingItem: "Dried mixed herbs", quantity: "� tsp",
    },
    {
      item: "Worcestershire sauce",
      shoppingItem: "Worcestershire sauce", quantity: "� tsp",
    },
    {
      item: "Freshly ground black pepper",
      shoppingItem: "Black pepper", quantity: "To taste",
    },
  ],

  method: [
    "Bring a saucepan of water to the boil and cook the spaghetti according to the packet instructions.",
    "While the spaghetti is cooking, place the beef mince, half of the diced onion, Worcestershire sauce and freshly ground black pepper into a mixing bowl. Mix gently and shape into small meatballs.",
    "Heat a large frying pan over a medium heat and cook the meatballs for 6�8 minutes, turning regularly until browned on all sides.",
    "Add the remaining onion and cook for 3�4 minutes until softened.",
    "Stir in the garlic and cook for 30 seconds.",
    "Add the tomato pur�e and cook for 1 minute, stirring continuously.",
    "Pour in the passata and stir in the dried mixed herbs. Bring to a gentle simmer.",
    "Simmer for 10�12 minutes, stirring occasionally until the meatballs are cooked through and the sauce has thickened.",
    "While the sauce is finishing, drain the spaghetti.",
    "Divide the spaghetti between serving bowls and spoon the meatballs and sauce over the top.",
    "Finish with freshly ground black pepper and serve immediately.",
  ],

  nutrition: {
    calories: "530 kcal",
    protein: "39 g",
    carbohydrates: "47 g",
    fat: "12 g",
    fibre: "6 g",
      sodium: "150 mg",
  },
  potassium: "Moderate",
  phosphate: "Low",
  purines: "Moderate",
  dietaryNote: "Beef makes this moderate in purines; the tomato base also raises potassium.",
},
{
  id: "chilli-con-carne",
  code: "D011",
    servings: 1,

    source: {
      name: "RenalPlan Original � Chilli con carne with rice",
      url: "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/971021/McCance_and_Widdowsons_Composition_of_Foods_integrated_dataset_2021.pdf",
      logo: "/images/govuk.png",
    },  category: "Beef",
  emoji: "???",
  image: "/images/recipes/chilli-con-carne.png",
  name: "Chilli Con Carne",

  description:
    "A mild chilli made with lean beef, tomatoes and peppers, served with basmati rice for a hearty family meal.",

  cookingTime: "40 minutes",

  calories: "530 kcal",

  protein: "39g",

  equipment:
    "Large frying pan, saucepan",

  ingredients: [
    {
      item: "Lean beef mince (5% fat)",
      shoppingItem: "Lean beef mince", quantity: "150 g",
    },
    {
      item: "Dry basmati rice",
      shoppingItem: "Basmati rice", quantity: "75 g",
    },
    {
      item: "Large onion, diced",
      shoppingItem: "Onion",
      quantity: "�",
    },
    {
      item: "Red pepper, diced",
      shoppingItem: "Red pepper",
      quantity: "�",
    },
    {
      item: "Garlic, crushed",
      shoppingItem: "Garlic",
      quantity: "1 clove",
    },
    {
      item: "Tomato pur�e",
      shoppingItem: "Tomato pur�e", quantity: "1� tsp",
    },
    {
      item: "Passata",
      shoppingItem: "Passata", quantity: "100 g",
    },
    {
      item: "Mild chilli seasoning",
      shoppingItem: "Mild chilli seasoning", quantity: "1 tsp",
    },
    {
      item: "Freshly ground black pepper",
      shoppingItem: "Black pepper", quantity: "To taste",
    },
  ],

  method: [
    "Bring a saucepan of water to the boil and cook the basmati rice according to the packet instructions.",
    "While the rice is cooking, heat a large frying pan over a medium heat.",
    "Add the beef mince and onion and cook for 5�6 minutes, breaking up the mince with a wooden spoon until browned.",
    "Stir in the red pepper and cook for 3 minutes until beginning to soften.",
    "Add the garlic and cook for 30 seconds.",
    "Stir in the tomato pur�e and cook for 1 minute, stirring continuously.",
    "Add the passata and the mild chilli seasoning, stirring well to combine.",
    "Simmer for 12�15 minutes, stirring occasionally until the sauce has thickened and the beef is fully cooked.",
    "While the chilli is finishing, drain the rice.",
    "Divide the rice between serving bowls and spoon the chilli over the top.",
    "Finish with freshly ground black pepper and serve immediately.",
  ],

  nutrition: {
    calories: "530 kcal",
    protein: "39 g",
    carbohydrates: "49 g",
    fat: "11 g",
    fibre: "6 g",
      sodium: "360 mg",
  },
  potassium: "Moderate",
  phosphate: "Moderate",
  purines: "Moderate",
  dietaryNote: "Beef and tomato make this a more moderate renal-diet choice. Source audit: RenalPlan Original � Chilli con carne with rice is a candidate match; this RenalPlan recipe is not classified as an exact/scaled source recipe.",
},
{
  id: "sausage-mash-onion-gravy",
  code: "D012",
    servings: 1,

    source: {
      name: "RenalPlan Original � Sausage and mash",
      url: "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/971021/McCance_and_Widdowsons_Composition_of_Foods_integrated_dataset_2021.pdf",
      logo: "/images/govuk.png",
    },  category: "Pork",
  emoji: "??",
  image: "/images/recipes/sausage-mash-onion-gravy.png",
  name: "Sausage & Mash with Onion Gravy",

  description:
    "A comforting family favourite made with quality pork sausages, creamy mashed potato and rich onion gravy.",

  cookingTime: "45 minutes",

  calories: "560 kcal",

  protein: "28g",

  equipment:
    "Fan oven, saucepan, small saucepan",

  ingredients: [
    {
      item: "Quality pork sausages",
      shoppingItem: "Quality pork sausages", quantity: "2 (approximately 120 g total)",
    },
    {
      item: "Floury potatoes, peeled and chopped",
      shoppingItem: "Potatoes",
      quantity: "200 g",
    },
    {
      item: "Large onion, thinly sliced",
      shoppingItem: "onion", quantity: "�",
    },
    {
      item: "Frozen peas",
      shoppingItem: "Frozen peas", quantity: "37.5 g",
    },
    {
      item: "Butter", shoppingItem: "Unsalted Butter",
      quantity: "5 g",
    },
    {
      item: "Semi-skimmed milk",
      shoppingItem: "Semi-skimmed milk", quantity: "15 ml",
    },
    {
      item: "Reduced-salt onion gravy",
      shoppingItem: "Reduced-salt onion gravy", quantity: "75 ml",
    },
    {
      item: "Freshly ground black pepper",
      shoppingItem: "Black pepper", quantity: "To taste",
    },
  ],

  method: [
    "Preheat the oven to 200�C (180�C fan).",
    "Place the sausages onto a baking tray and cook for 25�30 minutes, turning halfway through, until browned and cooked through.",
    "While the sausages are cooking, place the potatoes into a saucepan of cold water. Bring to the boil and cook for 18�20 minutes until tender.",
    "During the final 10 minutes, cook the sliced onion in a small saucepan over a medium-low heat until softened and lightly browned.",
    "Add the reduced-salt onion gravy to the onions and heat gently until piping hot.",
    "During the final 5 minutes, boil the frozen peas until tender.",
    "Drain the potatoes thoroughly, add the butter and milk, then mash until smooth. Season with freshly ground black pepper.",
    "Serve the sausages with the mashed potato, peas and onion gravy.",
  ],

  nutrition: {
    calories: "560 kcal",
    protein: "28 g",
    carbohydrates: "43 g",
    fat: "24 g",
    fibre: "5 g",
      sodium: "900 mg",
  },
  potassium: "High",
  phosphate: "High",
  purines: "Moderate",
  dietaryNote: "?? Higher in potassium and phosphate because of the potato and processed sausages; best treated as an occasional meal.",
},
{
  id: "salmon-lemon-herbs",
  code: "D013",
    servings: 1,

    source: {
      name: "RenalPlan Original",
      url: "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/971021/McCance_and_Widdowsons_Composition_of_Foods_integrated_dataset_2021.pdf",
      logo: "/images/govuk.png",
      description: "Developed specifically for RenalPlan. Nutritional values calculated using McCance and Widdowson�s Composition of Foods Integrated Dataset (CoFID) 2021.",
      linkText: "View CoFID 2021",
    },  category: "Fish",
  emoji: "??",
  image: "/images/recipes/salmon-lemon-herbs.png",
  name: "Salmon with Lemon & Herbs",

  description:
    "Oven-baked salmon fillet served with roasted potatoes and vegetables, finished with lemon and herbs for a light family dinner.",

  cookingTime: "40 minutes",

  calories: "540 kcal",

  protein: "35g",

  equipment:
    "Fan oven, large roasting tray",

  ingredients: [
    {
      item: "Salmon fillet",
      shoppingItem: "Salmon fillet", quantity: "150 g",
    },
    {
      item: "Floury potatoes, cut into bite-sized chunks",
      shoppingItem: "Potatoes",
      quantity: "200 g",
    },
    {
      item: "Red pepper, cut into chunks",
      shoppingItem: "Red pepper",
      quantity: "�",
    },
    {
      item: "Red onion, cut into wedges",
      shoppingItem: "Red onion", quantity: "�",
    },
    {
      item: "Olive oil",
      shoppingItem: "Olive oil", quantity: "1� tsp",
    },
    {
      item: "Lemon juice",
      shoppingItem: "Lemon",
      quantity: "�",
    },
    {
      item: "Lemon zest",
      shoppingItem: "Lemon",
      quantity: "�",
    },
    {
      item: "Dried mixed herbs",
      shoppingItem: "Dried mixed herbs", quantity: "� tsp",
    },
    {
      item: "Freshly ground black pepper",
      shoppingItem: "Black pepper", quantity: "To taste",
    },
  ],

  method: [
    "Preheat the oven to 200�C (180�C fan).",
    "Place the potatoes into a large roasting tray, drizzle with half of the olive oil and toss to coat evenly. Roast for 15 minutes.",
    "While the potatoes are roasting, place the salmon into a bowl. Add the remaining olive oil, lemon juice, lemon zest, dried mixed herbs and freshly ground black pepper. Coat the salmon evenly.",
    "Remove the roasting tray from the oven and add the red pepper and red onion. Place the salmon on top or alongside the vegetables.",
    "Return the tray to the oven and roast for 18�20 minutes, until the salmon flakes easily with a fork and the potatoes are golden.",
    "Serve immediately.",
  ],

  nutrition: {
    calories: "540 kcal",
    protein: "35 g",
    carbohydrates: "42 g",
    fat: "20 g",
    fibre: "5 g",
      sodium: "110 mg",
  },
  potassium: "Moderate",
  phosphate: "Low",
  purines: "Moderate",
  dietaryNote: "?? Salmon is relatively higher in purines than chicken, so enjoy as part of a balanced rotation.",
},
{
  id: "tuna-pasta-bake",
  code: "D014",
    servings: 1,

    source: {
      name: "RenalPlan Original",
      url: "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/971021/McCance_and_Widdowsons_Composition_of_Foods_integrated_dataset_2021.pdf",
      logo: "/images/govuk.png",
      description: "Developed specifically for RenalPlan. Nutritional values calculated using McCance and Widdowson�s Composition of Foods Integrated Dataset (CoFID) 2021.",
      linkText: "View CoFID 2021",
    },  category: "Fish",
  emoji: "??",
  image: "/images/recipes/tuna-pasta-bake.png",
  name: "Tuna Pasta Bake",

  description:
    "A comforting tuna pasta bake with a light tomato sauce using simple everyday ingredients.",

  cookingTime: "40 minutes",

  calories: "520 kcal",

  protein: "36g",

  equipment:
    "Saucepan, large frying pan, ovenproof dish",

  ingredients: [
    {
      item: "Dried penne pasta",
      shoppingItem: "Pasta",
      quantity: "75 g",
    },
    {
      item: "Tuna in spring water, drained",
      shoppingItem: "Tinned Tuna",
      quantity: "100 g",
    },
    {
      item: "Large onion, finely diced",
      shoppingItem: "onion", quantity: "�",
    },
    {
      item: "Red pepper, diced",
      shoppingItem: "Red pepper",
      quantity: "�",
    },
    {
      item: "Garlic, crushed",
      shoppingItem: "Garlic",
      quantity: "1 clove",
    },
    {
      item: "Tomato pur�e",
      shoppingItem: "Tomato pur�e", quantity: "1� tsp",
    },
    {
      item: "Passata",
      shoppingItem: "Passata", quantity: "100 g",
    },
    {
      item: "Dried mixed herbs",
      shoppingItem: "Dried mixed herbs", quantity: "� tsp",
    },
    {
      item: "Reduced-fat Cheddar cheese, grated",
      shoppingItem: "Reduced-fat Cheddar cheese", quantity: "15 g",
    },
    {
      item: "Freshly ground black pepper",
      shoppingItem: "Black pepper", quantity: "To taste",
    },
  ],

  method: [
    "Preheat the oven to 200�C (180�C fan).",
    "Bring a saucepan of water to the boil and cook the penne according to the packet instructions until just al dente.",
    "While the pasta is cooking, heat a large frying pan over a medium heat. Add the onion and cook for 4�5 minutes until softened.",
    "Stir in the garlic and red pepper and cook for 2 minutes.",
    "Add the tomato pur�e and cook for 1 minute, stirring continuously.",
    "Pour in the passata and stir in the dried mixed herbs. Simmer for 5 minutes.",
    "Fold the drained tuna into the sauce and heat gently for 2 minutes.",
    "Drain the pasta and stir it into the sauce until evenly coated.",
    "Transfer the mixture to an ovenproof dish and sprinkle with the grated reduced-fat Cheddar.",
    "Bake for 12�15 minutes, until the cheese has melted and turned lightly golden.",
    "Finish with freshly ground black pepper and serve immediately.",
  ],

  nutrition: {
    calories: "520 kcal",
    protein: "36 g",
    carbohydrates: "46 g",
    fat: "11 g",
    fibre: "5 g",
      sodium: "420 mg",
  },
  potassium: "Low",
  phosphate: "Moderate",
  purines: "Moderate",
  dietaryNote: "?? Tuna and cheese contribute more phosphate; fish is also relatively higher in purines.",
},
{
  id: "mediterranean-chicken",
  code: "D015",
    servings: 1,

    source: {
      name: "RenalPlan Original",
      url: "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/971021/McCance_and_Widdowsons_Composition_of_Foods_integrated_dataset_2021.pdf",
      logo: "/images/govuk.png",
      description: "Developed specifically for RenalPlan. Nutritional values calculated using McCance and Widdowson�s Composition of Foods Integrated Dataset (CoFID) 2021.",
      linkText: "View CoFID 2021",
    },  category: "Chicken",
  emoji: "??",
  image: "/images/recipes/mediterranean-chicken.png",
  name: "Mediterranean Chicken",

  description:
    "A colourful one-pan chicken dish with Mediterranean vegetables and herbs, served with basmati rice for a fresh, family-friendly dinner.",

  cookingTime: "35 minutes",

  calories: "515 kcal",

  protein: "41g",

  equipment:
    "Large frying pan, saucepan",

  ingredients: [
    {
      item: "Chicken breast, diced",
      shoppingItem: "Chicken breast",
      quantity: "150 g",
    },
    {
      item: "Dry basmati rice",
      shoppingItem: "Basmati rice", quantity: "75 g",
    },
    {
      item: "Large red onion, diced",
      shoppingItem: "Red onion",
      quantity: "�",
    },
    {
      item: "Red pepper, diced",
      shoppingItem: "Red pepper",
      quantity: "�",
    },
    {
      item: "Garlic, crushed",
      shoppingItem: "Garlic",
      quantity: "1 clove",
    },
    {
      item: "Passata",
      shoppingItem: "Passata", quantity: "100 g",
    },
    {
      item: "Tomato pur�e",
      shoppingItem: "Tomato pur�e", quantity: "1� tsp",
    },
    {
      item: "Dried mixed herbs",
      shoppingItem: "Dried mixed herbs", quantity: "� tsp",
    },
    {
      item: "Olive oil",
      shoppingItem: "Olive oil", quantity: "1� tsp",
    },
    {
      item: "Freshly ground black pepper",
      shoppingItem: "Black pepper", quantity: "To taste",
    },
  ],

  method: [
    "Bring a saucepan of water to the boil and cook the basmati rice according to the packet instructions.",
    "While the rice is cooking, heat the olive oil in a large frying pan over a medium heat.",
    "Add the diced chicken and cook for 5�6 minutes, stirring regularly until lightly browned.",
    "Add the red onion and cook for 4�5 minutes until softened.",
    "Stir in the garlic and red pepper and cook for a further 2 minutes.",
    "Add the tomato pur�e and cook for 1 minute, stirring continuously.",
    "Pour in the passata and stir in the dried mixed herbs.",
    "Simmer for 8�10 minutes, stirring occasionally until the chicken is cooked through and the sauce has thickened.",
    "While the chicken is finishing, drain the rice.",
    "Divide the rice between serving plates and spoon the Mediterranean chicken over the top.",
    "Finish with freshly ground black pepper and serve immediately.",
  ],

  nutrition: {
    calories: "515 kcal",
    protein: "41 g",
    carbohydrates: "48 g",
    fat: "10 g",
    fibre: "5 g",
      sodium: "110 mg",
  },
  potassium: "Moderate",
  phosphate: "Low",
  purines: "Low",
  dietaryNote: "The tomato-based sauce makes this moderate in potassium.",
},
{
    id: "lemon-herb-chicken-couscous",
    code: "D016",
    servings: 1,

    source: {
      name: "RenalPlan Original",
      url: "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/971021/McCance_and_Widdowsons_Composition_of_Foods_integrated_dataset_2021.pdf",
      logo: "/images/govuk.png",
      description: "Developed specifically for RenalPlan. Nutritional values calculated using McCance and Widdowson�s Composition of Foods Integrated Dataset (CoFID) 2021.",
      linkText: "View CoFID 2021",
    },    category: "Chicken",
    emoji: "??",
    image: "/images/recipes/lemon-herb-chicken-couscous.png",
    name: "Lemon & Herb Chicken with Couscous",
    description:
      "A fresh lemon and herb chicken dish served with couscous and simple vegetables.",
    cookingTime: "30 minutes",
    calories: "640 kcal",
    protein: "47g",
    equipment:
      "Large frying pan, large bowl, measuring jug, chopping board, knife",
    ingredients: [
      { item: "Chicken breast, skinless", shoppingItem: "Chicken breast", quantity: "150 g" },
      { item: "Couscous", shoppingItem: "Couscous", quantity: "75 g" },
      { item: "Red pepper, diced", shoppingItem: "Red pepper", quantity: "�" },
      { item: "Courgette, diced", shoppingItem: "Courgette", quantity: "�" },
      { item: "Onion, sliced", shoppingItem: "Onion", quantity: "�" },
      { item: "Lemon, zest and juice", shoppingItem: "Lemon", quantity: "� lemon" },
      { item: "Olive oil", shoppingItem: "Olive oil", quantity: "� tbsp" },
      { item: "Dried oregano", shoppingItem: "Dried oregano", quantity: "� tsp" },
      { item: "Dried parsley", shoppingItem: "Dried parsley", quantity: "� tsp" },
      { item: "Garlic granules", shoppingItem: "Garlic granules", quantity: "? tsp" },
      { item: "Black pepper", shoppingItem: "Black pepper", quantity: "? tsp" },
      { item: "Fresh parsley", shoppingItem: "Parsley", quantity: "handful" },
      { item: "No added salt", shoppingItem: "No added salt", quantity: "As required" },
    ],
    method: [
      "Put the couscous into a large bowl and pour over 75ml boiling water. Cover and leave for 5 minutes.",
      "Fluff the couscous with a fork and stir through ? tbsp of the olive oil, the lemon zest, half the lemon juice and the dried herbs.",
      "Heat the remaining olive oil in a large frying pan over a medium heat.",
      "Season the chicken with black pepper and garlic granules. Cook for around 6�7 minutes per side, until cooked through and lightly browned.",
      "Remove the chicken from the pan and keep warm.",
      "Add the onion, red pepper and courgette to the pan. Cook for 5�6 minutes until softened.",
      "Return the chicken to the pan and add the remaining lemon juice.",
      "Serve the chicken with the couscous and vegetables, topped with fresh parsley.",
    ],
    nutrition: {
      calories: "640 kcal",
      protein: "47 g",
      carbohydrates: "65 g",
      fat: "21 g",
      fibre: "5 g",
      sodium: "100 mg",
    },
    potassium: "Moderate",
    phosphate: "Moderate",
    purines: "Moderate",
    dietaryNote:
      "Chicken contributes phosphate and purines, so the portion is kept sensible. The recipe avoids cheese, cream, pulses and processed sauces.",
  },
{
    id: "honey-garlic-chicken-rice",
    code: "D017",
    servings: 1,

    source: {
      name: "RenalPlan Original",
      url: "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/971021/McCance_and_Widdowsons_Composition_of_Foods_integrated_dataset_2021.pdf",
      logo: "/images/govuk.png",
      description: "Developed specifically for RenalPlan. Nutritional values calculated using McCance and Widdowson�s Composition of Foods Integrated Dataset (CoFID) 2021.",
      linkText: "View CoFID 2021",
    },    category: "Chicken",
    emoji: "??",
    image: "/images/recipes/honey-garlic-chicken-rice.png",
    name: "Honey Garlic Chicken with Rice",
    description:
      "Tender chicken cooked in a simple honey and garlic glaze, served with white rice and crisp vegetables.",
    cookingTime: "30 minutes",
    calories: "680 kcal",
    protein: "47g",
    equipment:
      "Large frying pan, saucepan with lid, measuring jug, chopping board, knife",
    ingredients: [
      { item: "Chicken breast, skinless", shoppingItem: "Chicken breast", quantity: "140 g" },
      { item: "Dry white basmati rice", shoppingItem: "Rice", quantity: "65 g" },
      { item: "Red pepper, sliced", shoppingItem: "Red pepper", quantity: "�" },
      { item: "Green beans, trimmed", shoppingItem: "Green beans", quantity: "37.5 g" },
      { item: "Onion, thinly sliced", shoppingItem: "Onion", quantity: "�" },
      { item: "Honey", shoppingItem: "Honey", quantity: "� tbsp" },
      { item: "Olive oil", shoppingItem: "Olive oil", quantity: "� tbsp" },
      { item: "Garlic, crushed", shoppingItem: "Garlic", quantity: "� clove" },
      { item: "Lemon juice", shoppingItem: "Lemon", quantity: "� tbsp" },
      { item: "Cornflour", shoppingItem: "Cornflour", quantity: "� tsp" },
      { item: "Water", shoppingItem: "Water", quantity: "25 ml" },
      { item: "Black pepper", shoppingItem: "Black pepper", quantity: "To taste" },
      { item: "No added salt", shoppingItem: "No added salt", quantity: "As required" },
    ],
    method: [
      "Cook the basmati rice according to the packet instructions.",
      "Mix the honey, lemon juice, cornflour and 25ml water in a small jug.",
      "Heat the olive oil in a large frying pan over a medium heat.",
      "Season the chicken with black pepper and cook for 5�6 minutes per side, until lightly browned and cooked through.",
      "Remove the chicken from the pan and keep warm.",
      "Add the onion and red pepper to the pan and cook for 4�5 minutes until softened.",
      "Add the garlic and cook for 30 seconds.",
      "Pour in the honey mixture and stir until the sauce thickens.",
      "Return the chicken to the pan and turn it in the glaze for 2�3 minutes.",
      "Meanwhile, steam or boil the green beans until tender but still slightly crisp.",
      "Drain the rice and serve with the honey garlic chicken and green beans.",
    ],
    nutrition: {
      calories: "680 kcal",
      protein: "47 g",
      carbohydrates: "75 g",
      fat: "25 g",
      fibre: "3 g",
      sodium: "90 mg",
    },
    potassium: "Moderate",
    phosphate: "Moderate",
    purines: "Moderate",
    dietaryNote:
      "Chicken contributes phosphate and purines. White rice is a useful lower-potassium starchy base, while the recipe avoids soy sauce and other processed sauces.",
  },
{
    id: "chicken-tikka-rice",
    code: "D018",
    servings: 1,

    source: {
      name: "RenalPlan Original � Chicken tikka pulao",
      url: "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/971021/McCance_and_Widdowsons_Composition_of_Foods_integrated_dataset_2021.pdf",
      logo: "/images/govuk.png",
    },    category: "Chicken",
    emoji: "??",
    image: "/images/recipes/chicken-tikka-rice.png",
    name: "Chicken Tikka with Rice",
    description:
      "A mild, homemade chicken tikka with fragrant basmati rice and fresh vegetables.",
    cookingTime: "35 minutes",
    calories: "650 kcal",
    protein: "50g",
    equipment:
      "Large frying pan, saucepan with lid, mixing bowl, chopping board, knife",
    ingredients: [
      { item: "Chicken breast, skinless", shoppingItem: "Chicken breast", quantity: "150 g" },
      { item: "Dry white basmati rice", shoppingItem: "Rice", quantity: "70 g" },
      { item: "Red pepper, sliced", shoppingItem: "Red pepper", quantity: "�" },
      { item: "Onion, sliced", shoppingItem: "Onion", quantity: "�" },
      { item: "Courgette, sliced", shoppingItem: "Courgette", quantity: "�" },
      { item: "Plain natural yoghurt", shoppingItem: "Natural Yoghurt", quantity: "37.5 g" },
      { item: "Olive oil", shoppingItem: "Olive oil", quantity: "� tbsp" },
      { item: "Lemon juice", shoppingItem: "Lemon", quantity: "� tbsp" },
      { item: "Mild curry powder", shoppingItem: "Mild curry powder", quantity: "� tsp" },
      { item: "Ground cumin", shoppingItem: "Ground cumin", quantity: "� tsp" },
      { item: "Paprika", shoppingItem: "Paprika", quantity: "� tsp" },
      { item: "Turmeric", shoppingItem: "Turmeric", quantity: "? tsp" },
      { item: "Garlic granules", shoppingItem: "Garlic granules", quantity: "? tsp" },
      { item: "Ground ginger", shoppingItem: "Ground ginger", quantity: "? tsp" },
      { item: "Black pepper", shoppingItem: "Black pepper", quantity: "To taste" },
      { item: "Fresh parsley", shoppingItem: "Parsley", quantity: "handful" },
      { item: "No added salt", shoppingItem: "No added salt", quantity: "As required" },
    ],
    method: [
      "Cut the chicken into bite-sized pieces and place in a bowl.",
      "Mix the yoghurt, lemon juice, curry powder, cumin, paprika, turmeric, garlic granules and ginger.",
      "Stir the chicken into the marinade and leave for at least 15 minutes.",
      "Cook the basmati rice according to the packet instructions.",
      "Heat � tbsp of the olive oil in a large frying pan and cook the onion, pepper and courgette for 5�6 minutes. Remove and keep warm.",
      "Add the remaining oil to the pan and cook the marinated chicken for 8�10 minutes, turning regularly, until completely cooked through.",
      "Return the vegetables to the pan and cook together for another 2 minutes.",
      "Serve the chicken and vegetables with the basmati rice and sprinkle with fresh parsley.",
    ],
    nutrition: {
      calories: "650 kcal",
      protein: "50 g",
      carbohydrates: "72 g",
      fat: "19 g",
      fibre: "4 g",
      sodium: "120 mg",
    },
    potassium: "Moderate",
    phosphate: "Moderate",
    purines: "Moderate",
    dietaryNote:
      "Chicken and yoghurt contribute phosphate, while chicken contributes purines. White basmati rice provides the main carbohydrate without a large potassium contribution. Source audit: RenalPlan Original � Chicken tikka pulao is a candidate match; this RenalPlan recipe is not classified as an exact/scaled source recipe.",
  },
{
    id: "chicken-pesto-pasta",
    code: "D019",
    servings: 1,

    source: {
      name: "RenalPlan Original",
      url: "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/971021/McCance_and_Widdowsons_Composition_of_Foods_integrated_dataset_2021.pdf",
      logo: "/images/govuk.png",
      description: "Developed specifically for RenalPlan. Nutritional values calculated using McCance and Widdowson�s Composition of Foods Integrated Dataset (CoFID) 2021.",
      linkText: "View CoFID 2021",
    },    category: "Chicken",
    emoji: "??",
    image: "/images/recipes/chicken-pesto-pasta.png",
    name: "Chicken Pesto Pasta",
    description:
      "A simple chicken and pesto pasta with peppers and courgette, fresh and colourful enough for a normal weeknight dinner.",
    cookingTime: "30 minutes",
    calories: "660 kcal",
    protein: "48g",
    equipment:
      "Large frying pan, large saucepan, colander, chopping board, knife",
    ingredients: [
      { item: "Chicken breast, skinless", shoppingItem: "Chicken breast", quantity: "140 g" },
      { item: "Dried penne pasta", shoppingItem: "Pasta", quantity: "75 g" },
      { item: "Red pepper, sliced", shoppingItem: "Red pepper", quantity: "�" },
      { item: "Courgette, sliced", shoppingItem: "Courgette", quantity: "�" },
      { item: "Onion, sliced", shoppingItem: "Onion", quantity: "�" },
      { item: "Fresh basil pesto", shoppingItem: "Fresh basil pesto", quantity: "1 tbsp" },
      { item: "Olive oil", shoppingItem: "Olive oil", quantity: "� tbsp" },
      { item: "Lemon juice", shoppingItem: "Lemon", quantity: "? lemon" },
      { item: "Dried oregano", shoppingItem: "Dried oregano", quantity: "� tsp" },
      { item: "Garlic granules", shoppingItem: "Garlic granules", quantity: "? tsp" },
      { item: "Black pepper", shoppingItem: "Black pepper", quantity: "To taste" },
      { item: "Fresh basil or parsley", shoppingItem: "Fresh basil or parsley", quantity: "handful" },
      { item: "No added salt", shoppingItem: "No added salt", quantity: "As required" },
    ],
    method: [
      "Cook the pasta according to the packet instructions until just tender. Reserve a small cup of the cooking water, then drain.",
      "Cut the chicken into bite-sized pieces and season with black pepper, oregano and garlic granules.",
      "Heat � tbsp of the olive oil in a large frying pan and cook the chicken for 7�8 minutes, turning regularly, until completely cooked through.",
      "Remove the chicken and keep warm.",
      "Add the remaining olive oil, onion, pepper and courgette to the pan. Cook for 5�6 minutes until softened.",
      "Return the chicken to the pan.",
      "Add the drained pasta and pesto, together with a small splash of the reserved pasta water. Toss everything together over a low heat.",
      "Add the lemon juice, season with black pepper and finish with fresh basil or parsley.",
    ],
    nutrition: {
      calories: "660 kcal",
      protein: "48 g",
      carbohydrates: "68 g",
      fat: "22 g",
      fibre: "5 g",
      sodium: "200 mg",
    },
    potassium: "Moderate",
    phosphate: "High",
    purines: "Moderate",
    dietaryNote:
      "Chicken contributes phosphate and purines, while pesto can add phosphate because it contains cheese and nuts. Check the pesto label for phosphate additives.",
  },
{
    id: "beef-stroganoff-pasta",
    code: "D020",
    servings: 1,

    source: {
      name: "RenalPlan Original",
      url: "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/971021/McCance_and_Widdowsons_Composition_of_Foods_integrated_dataset_2021.pdf",
      logo: "/images/govuk.png",
      description: "Developed specifically for RenalPlan. Nutritional values calculated using McCance and Widdowson�s Composition of Foods Integrated Dataset (CoFID) 2021.",
      linkText: "View CoFID 2021",
    },    category: "Beef",
    emoji: "??",
    image: "/images/recipes/beef-stroganoff-pasta.png",
    name: "Beef Stroganoff with Pasta",
    description:
      "A homemade beef stroganoff with tender beef, mushrooms and onions in a light creamy sauce, served with pasta.",
    cookingTime: "30 minutes",
    calories: "650 kcal",
    protein: "45g",
    equipment:
      "Large frying pan, large saucepan, colander, chopping board, knife",
    ingredients: [
      { item: "Lean beef steak, cut into thin strips", shoppingItem: "Beef steak", quantity: "125 g" },
      { item: "Dried penne pasta", shoppingItem: "Pasta", quantity: "75 g" },
      { item: "Mushrooms, sliced", shoppingItem: "Mushrooms", quantity: "37.5 g" },
      { item: "Onion, thinly sliced", shoppingItem: "Onion", quantity: "�" },
      { item: "Half-fat cr�me fra�che", shoppingItem: "Half-fat cr�me fra�che", quantity: "37.5 ml" },
      { item: "Olive oil", shoppingItem: "Olive oil", quantity: "� tbsp" },
      { item: "Paprika", shoppingItem: "Paprika", quantity: "� tsp" },
      { item: "Dijon mustard", shoppingItem: "Dijon mustard", quantity: "� tsp" },
      { item: "Garlic granules", shoppingItem: "Garlic granules", quantity: "� tsp" },
      { item: "Dried parsley", shoppingItem: "Dried parsley", quantity: "� tsp" },
      { item: "Water", shoppingItem: "Water", quantity: "25 ml" },
      { item: "Lemon juice", shoppingItem: "Lemon", quantity: "� tbsp" },
      { item: "Black pepper", shoppingItem: "Black pepper", quantity: "To taste" },
      { item: "Fresh parsley", shoppingItem: "Parsley", quantity: "handful" },
      { item: "No added salt", shoppingItem: "No added salt", quantity: "As required" },
    ],
    method: [
      "Cook the pasta according to the packet instructions until just tender. Reserve a little cooking water, then drain.",
      "Heat � tbsp olive oil in a large frying pan over a high heat.",
      "Add the beef strips and cook for 2�3 minutes, stirring regularly, until browned. Remove from the pan and keep warm.",
      "Reduce the heat and add the remaining olive oil.",
      "Add the onion and mushrooms and cook for 5�6 minutes until softened.",
      "Stir in the paprika and garlic granules and cook for 30 seconds.",
      "Add the water and Dijon mustard and stir well, scraping any browned pieces from the bottom of the pan.",
      "Reduce the heat and stir in the cr�me fra�che.",
      "Return the beef to the pan and cook gently for 2�3 minutes. Do not boil the sauce.",
      "Add the lemon juice and dried parsley, then season with black pepper.",
      "Toss the pasta through the sauce or serve the stroganoff over the pasta.",
      "Finish with fresh parsley.",
    ],
    nutrition: {
      calories: "650 kcal",
      protein: "45 g",
      carbohydrates: "65 g",
      fat: "24 g",
      fibre: "5 g",
      sodium: "120 mg",
    },
    potassium: "Moderate",
    phosphate: "High",
    purines: "High",
    dietaryNote:
      "Beef contributes both phosphate and purines, so this is naturally less favourable on those measures than the chicken recipes.",
  },
{
    id: "beef-kofta-couscous",
    code: "D021",
    servings: 1,

    source: {
      name: "RenalPlan Original",
      url: "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/971021/McCance_and_Widdowsons_Composition_of_Foods_integrated_dataset_2021.pdf",
      logo: "/images/govuk.png",
      description: "Developed specifically for RenalPlan. Nutritional values calculated using McCance and Widdowson�s Composition of Foods Integrated Dataset (CoFID) 2021.",
      linkText: "View CoFID 2021",
    },    category: "Beef",
    emoji: "??",
    image: "/images/recipes/beef-kofta-couscous.png",
    name: "Beef Kofta with Couscous",
    description:
      "Homemade beef kofta seasoned with mild herbs and spices, served with fluffy couscous and fresh vegetables.",
    cookingTime: "35 minutes",
    calories: "660 kcal",
    protein: "43g",
    equipment:
      "Large frying pan, large bowl, measuring jug, chopping board, knife",
    ingredients: [
      { item: "Lean beef mince", shoppingItem: "Beef mince", quantity: "125 g" },
      { item: "Couscous", shoppingItem: "Couscous", quantity: "70 g" },
      { item: "Red pepper, sliced", shoppingItem: "Red pepper", quantity: "�" },
      { item: "Courgette, sliced", shoppingItem: "Courgette", quantity: "�" },
      { item: "Onion, finely chopped", shoppingItem: "Onion", quantity: "�" },
      { item: "Olive oil", shoppingItem: "Olive oil", quantity: "� tbsp" },
      { item: "Ground cumin", shoppingItem: "Ground cumin", quantity: "� tsp" },
      { item: "Paprika", shoppingItem: "Paprika", quantity: "� tsp" },
      { item: "Dried oregano", shoppingItem: "Dried oregano", quantity: "� tsp" },
      { item: "Garlic granules", shoppingItem: "Garlic granules", quantity: "? tsp" },
      { item: "Lemon juice", shoppingItem: "Lemon", quantity: "? lemon" },
      { item: "Fresh parsley", shoppingItem: "Parsley", quantity: "handful" },
      { item: "Black pepper", shoppingItem: "Black pepper", quantity: "To taste" },
      { item: "No added salt", shoppingItem: "No added salt", quantity: "As required" },
    ],
    method: [
      "Put the beef mince into a large bowl and add half the onion, cumin, paprika, oregano, garlic granules and black pepper.",
      "Mix thoroughly, then shape the mixture into about 12 small kofta.",
      "Put the couscous into a large bowl and pour over 70ml boiling water. Cover and leave for 5 minutes.",
      "Fluff the couscous with a fork and stir through � tbsp olive oil, the lemon juice and half the fresh parsley.",
      "Heat � tbsp olive oil in a large frying pan over a medium heat.",
      "Add the kofta and cook for 10�12 minutes, turning regularly, until browned and completely cooked through.",
      "Remove the kofta and keep warm.",
      "Add the remaining olive oil, onion, red pepper and courgette to the pan. Cook for 5�6 minutes until softened.",
      "Serve the kofta with the couscous and vegetables, finished with the remaining fresh parsley.",
    ],
    nutrition: {
      calories: "660 kcal",
      protein: "43 g",
      carbohydrates: "63 g",
      fat: "27 g",
      fibre: "5 g",
      sodium: "90 mg",
    },
    potassium: "Moderate",
    phosphate: "High",
    purines: "High",
    dietaryNote:
      "Beef is naturally higher in purines and contributes phosphate, so this uses a sensible portion of lean mince.",
  },
{
    id: "steak-chips-green-beans",
    code: "D022",
    servings: 1,

    source: {
      name: "RenalPlan Original",
      url: "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/971021/McCance_and_Widdowsons_Composition_of_Foods_integrated_dataset_2021.pdf",
      logo: "/images/govuk.png",
      description: "Developed specifically for RenalPlan. Nutritional values calculated using McCance and Widdowson�s Composition of Foods Integrated Dataset (CoFID) 2021.",
      linkText: "View CoFID 2021",
    },    category: "Beef",
    emoji: "??",
    image: "/images/recipes/steak-chips-green-beans.png",
    name: "Steak, Chips & Green Beans",
    description:
      "A straightforward family favourite: steak with pan-fried chips and green beans, finished with lemon and herbs.",
    cookingTime: "35 minutes",
    calories: "670 kcal",
    protein: "42g",
    equipment:
      "Large saucepan, large frying pan, steamer or saucepan for green beans, chopping board, knife",
    ingredients: [
      { item: "Lean sirloin steaks", shoppingItem: "Sirloin steak", quantity: "150 g" },
      { item: "Potatoes", shoppingItem: "Potatoes", quantity: "200 g" },
      { item: "Green beans", shoppingItem: "Green beans", quantity: "50 g" },
      { item: "Olive oil", shoppingItem: "Olive oil", quantity: "� tbsp" },
      { item: "Dried rosemary", shoppingItem: "Dried rosemary", quantity: "� tsp" },
      { item: "Dried parsley", shoppingItem: "Dried parsley", quantity: "� tsp" },
      { item: "Garlic granules", shoppingItem: "Garlic granules", quantity: "? tsp" },
      { item: "Black pepper", shoppingItem: "Black pepper", quantity: "To taste" },
      { item: "Lemon juice", shoppingItem: "Lemon", quantity: "? lemon" },
      { item: "No added salt", shoppingItem: "No added salt", quantity: "As required" },
    ],
    method: [
      "Peel the potatoes and cut them into chunky chips.",
      "Put the chips into a saucepan of cold water, bring to the boil and simmer for 5 minutes.",
      "Drain the potatoes thoroughly and leave them to steam dry for a few minutes.",
      "Heat � tbsp olive oil in a large frying pan and cook the chips over a medium heat for 15�20 minutes, turning regularly, until golden and cooked through.",
      "Meanwhile, trim the green beans and steam or boil them for 5�6 minutes until tender but still slightly crisp.",
      "Remove the chips from the pan and keep warm.",
      "Rub the steaks with the remaining olive oil, rosemary, garlic granules and black pepper.",
      "Heat the frying pan until hot and cook the steaks to your preferred level of doneness, turning once or twice.",
      "Remove the steaks and rest for 5 minutes.",
      "Finish the beans with the lemon juice and dried parsley.",
      "Serve the steak with the chips and green beans.",
    ],
    nutrition: {
      calories: "670 kcal",
      protein: "42 g",
      carbohydrates: "53 g",
      fat: "31 g",
      fibre: "6 g",
      sodium: "120 mg",
    },
    potassium: "High",
    phosphate: "Moderate",
    purines: "High",
    dietaryNote:
      "Steak contributes phosphate and purines, while potatoes contribute a significant amount of potassium.",
  },
{
    id: "pork-apple-potatoes",
    code: "D023",
    servings: 1,

    source: {
      name: "RenalPlan Original",
      url: "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/971021/McCance_and_Widdowsons_Composition_of_Foods_integrated_dataset_2021.pdf",
      logo: "/images/govuk.png",
      description: "Developed specifically for RenalPlan. Nutritional values calculated using McCance and Widdowson�s Composition of Foods Integrated Dataset (CoFID) 2021.",
      linkText: "View CoFID 2021",
    },    category: "Pork",
    emoji: "??",
    image: "/images/recipes/pork-apple-potatoes.png",
    name: "Pork & Apple with Potatoes",
    description:
      "Tender pork with gently cooked apple and onions, served with herby potatoes and green beans.",
    cookingTime: "35 minutes",
    calories: "650 kcal",
    protein: "42g",
    equipment:
      "Large frying pan, large saucepan, steamer or saucepan for green beans, chopping board, knife",
    ingredients: [
      { item: "Lean pork loin steaks", shoppingItem: "Pork loin steaks", quantity: "150 g" },
      { item: "Potatoes", shoppingItem: "Potatoes", quantity: "175 g" },
      { item: "Eating apples", shoppingItem: "Apples", quantity: "�" },
      { item: "Green beans", shoppingItem: "Green beans", quantity: "12.5 g" },
      { item: "Onion, sliced", shoppingItem: "Onion", quantity: "�" },
      { item: "Olive oil", shoppingItem: "Olive oil", quantity: "� tbsp" },
      { item: "Dried sage", shoppingItem: "Dried sage", quantity: "� tsp" },
      { item: "Dried parsley", shoppingItem: "Dried parsley", quantity: "� tsp" },
      { item: "Lemon juice", shoppingItem: "Lemon", quantity: "� tbsp" },
      { item: "Black pepper", shoppingItem: "Black pepper", quantity: "To taste" },
      { item: "No added salt", shoppingItem: "No added salt", quantity: "As required" },
    ],
    method: [
      "Peel and cut the potatoes into even chunks. Boil for 12�15 minutes until tender.",
      "Drain and allow them to steam dry for a few minutes.",
      "Heat � tbsp olive oil in a large frying pan. Season the pork with black pepper and sage and cook for 4�5 minutes per side, until cooked through. Remove and keep warm.",
      "Add the remaining oil and the sliced onion to the pan. Cook for 3�4 minutes until softened.",
      "Core and slice the apples, then add them to the pan with the lemon juice. Cook for 3�4 minutes until just softened but still holding their shape.",
      "Meanwhile, steam or boil the green beans for 5�6 minutes.",
      "Return the pork to the pan for 1�2 minutes to warm through.",
      "Toss the potatoes with dried parsley and serve with the pork, apple and green beans.",
    ],
    nutrition: {
      calories: "650 kcal",
      protein: "42 g",
      carbohydrates: "60 g",
      fat: "25 g",
      fibre: "6 g",
      sodium: "100 mg",
    },
    potassium: "High",
    phosphate: "Moderate",
    purines: "Moderate",
    dietaryNote:
      "Pork contributes phosphate and purines, while potatoes and apples contribute potassium. The meal avoids processed gravy and stock cubes.",
  },
{
    id: "pork-stir-fry-rice",
    code: "D024",
    servings: 1,

    source: {
      name: "RenalPlan Original � Double-cooked pork",
      url: "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/971021/McCance_and_Widdowsons_Composition_of_Foods_integrated_dataset_2021.pdf",
      logo: "/images/govuk.png",
    },    category: "Pork",
    emoji: "??",
    image: "/images/recipes/pork-stir-fry-rice.png",
    name: "Pork Stir-Fry with Rice",
    description:
      "A quick pork stir-fry with colourful vegetables and fluffy white rice, made without soy sauce.",
    cookingTime: "30 minutes",
    calories: "650 kcal",
    protein: "42g",
    equipment:
      "Large frying pan or wok, saucepan with lid, measuring jug, chopping board, knife",
    ingredients: [
      { item: "Lean pork loin, cut into thin strips", shoppingItem: "Pork loin", quantity: "125 g" },
      { item: "Dry white basmati rice", shoppingItem: "Rice", quantity: "70 g" },
      { item: "Red pepper, sliced", shoppingItem: "Red pepper", quantity: "�" },
      { item: "Courgette, sliced", shoppingItem: "Courgette", quantity: "�" },
      { item: "Onion, sliced", shoppingItem: "Onion", quantity: "�" },
      { item: "Green beans, trimmed", shoppingItem: "Green beans", quantity: "37.5 g" },
      { item: "Olive oil", shoppingItem: "Olive oil", quantity: "� tbsp" },
      { item: "Garlic, crushed", shoppingItem: "Garlic", quantity: "� clove" },
      { item: "Ground ginger", shoppingItem: "Ground ginger", quantity: "� tsp" },
      { item: "Honey", shoppingItem: "Honey", quantity: "� tbsp" },
      { item: "Lemon juice", shoppingItem: "Lemon", quantity: "� tbsp" },
      { item: "Water", shoppingItem: "Water", quantity: "25 ml" },
      { item: "Cornflour", shoppingItem: "Cornflour", quantity: "� tsp" },
      { item: "Paprika", shoppingItem: "Paprika", quantity: "? tsp" },
      { item: "Black pepper", shoppingItem: "Black pepper", quantity: "To taste" },
      { item: "No added salt", shoppingItem: "No added salt", quantity: "As required" },
    ],
    method: [
      "Cook the basmati rice according to the packet instructions.",
      "Mix the water, honey, lemon juice and cornflour in a small jug.",
      "Heat ? tbsp olive oil in a large frying pan or wok over a high heat.",
      "Add the pork and stir-fry for 5�6 minutes until browned and cooked through. Remove and keep warm.",
      "Add the remaining oil, onion, pepper, courgette and green beans to the pan.",
      "Stir-fry the vegetables for 5�6 minutes until cooked but still slightly crisp.",
      "Add the garlic, ginger and paprika and cook for 30 seconds.",
      "Return the pork to the pan.",
      "Pour in the honey and lemon mixture and stir for 2�3 minutes until the sauce lightly thickens.",
      "Serve immediately with the basmati rice.",
    ],
    nutrition: {
      calories: "650 kcal",
      protein: "42 g",
      carbohydrates: "70 g",
      fat: "23 g",
      fibre: "5 g",
      sodium: "80 mg",
    },
    potassium: "Moderate",
    phosphate: "Moderate",
    purines: "Moderate",
    dietaryNote:
      "Pork contributes phosphate and purines. White rice provides the main carbohydrate, while avoiding soy sauce keeps the dish lower in added salt. Source audit: RenalPlan Original � Double-cooked pork is a candidate match; this RenalPlan recipe is not classified as an exact/scaled source recipe.",
  },
{
    id: "sausage-tomato-pasta",
    code: "D025",
    servings: 1,
    source: {
      name: "RenalPlan Original � Arrabbiata pasta with sausages",
      url: "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/971021/McCance_and_Widdowsons_Composition_of_Foods_integrated_dataset_2021.pdf",
      logo: "/images/govuk.png",
    },
    category: "Pork",
    emoji: "??",
    image: "/images/recipes/sausage-tomato-pasta.png",
    name: "Sausage & Tomato Pasta",
    description:
      "A simple sausage and tomato pasta with peppers and courgette, with plenty of flavour without salty sauces.",
    cookingTime: "30 minutes",
    calories: "650 kcal",
    protein: "32g",
    equipment:
      "Large frying pan, large saucepan, colander, chopping board, knife",
    ingredients: [
      { item: "Good-quality pork sausages", shoppingItem: "Pork sausages", quantity: "2" },
      { item: "Dried penne pasta", shoppingItem: "Pasta", quantity: "75 g" },
      { item: "Red pepper, diced", shoppingItem: "Red pepper", quantity: "�" },
      { item: "Onion, finely sliced", shoppingItem: "Onion", quantity: "�" },
      { item: "Courgette, diced", shoppingItem: "Courgette", quantity: "�" },
      { item: "Chopped tomatoes", shoppingItem: "Chopped tomatoes", quantity: "12.5 g" },
      { item: "Olive oil", shoppingItem: "Olive oil", quantity: "� tbsp" },
      { item: "Garlic, crushed", shoppingItem: "Garlic", quantity: "� clove" },
      { item: "Dried oregano", shoppingItem: "Dried oregano", quantity: "� tsp" },
      { item: "Dried basil", shoppingItem: "Dried basil", quantity: "� tsp" },
      { item: "Paprika", shoppingItem: "Paprika", quantity: "� tsp" },
      { item: "Water", shoppingItem: "Water", quantity: "25 ml" },
      { item: "Black pepper", shoppingItem: "Black pepper", quantity: "To taste" },
      { item: "Fresh parsley", shoppingItem: "Parsley", quantity: "handful" },
      { item: "No added salt", shoppingItem: "No added salt", quantity: "As required" },
    ],
    method: [
      "Remove the skins from the sausages and break the meat into small pieces.",
      "Cook the pasta according to the packet instructions until just tender. Drain and set aside.",
      "Heat � tbsp olive oil in a large frying pan.",
      "Add the sausage meat and cook for 6�8 minutes, breaking it up as it cooks, until browned and cooked through.",
      "Remove the sausage from the pan and set aside.",
      "Add the remaining olive oil, onion, pepper and courgette and cook for 5�6 minutes.",
      "Add the garlic, oregano, basil and paprika and cook for 30 seconds.",
      "Stir in the chopped tomatoes and water and simmer for 5 minutes.",
      "Return the sausage meat to the pan and simmer for another 3�4 minutes.",
      "Stir through the cooked pasta and heat for 1�2 minutes.",
      "Season with black pepper and finish with fresh parsley.",
    ],
    nutrition: {
      calories: "650 kcal",
      protein: "32 g",
      carbohydrates: "68 g",
      fat: "29 g",
      fibre: "6 g",
      sodium: "140 mg",
    },
    potassium: "Moderate",
    phosphate: "High",
    purines: "High",
    dietaryNote:
      "Sausages can contain considerable salt and phosphate additives, so choose a good-quality product and check the ingredient label. Source audit: RenalPlan Original � Arrabbiata pasta with sausages is a candidate match; this RenalPlan recipe is not classified as an exact/scaled source recipe.",
  },
{
    id: "cod-herby-potatoes-green-beans",
    code: "D026",
    servings: 1,

    source: {
      name: "RenalPlan Original",
      url: "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/971021/McCance_and_Widdowsons_Composition_of_Foods_integrated_dataset_2021.pdf",
      logo: "/images/govuk.png",
      description: "Developed specifically for RenalPlan. Nutritional values calculated using McCance and Widdowson�s Composition of Foods Integrated Dataset (CoFID) 2021.",
      linkText: "View CoFID 2021",
    },    category: "Fish",
    emoji: "??",
    image: "/images/recipes/cod-herby-potatoes-green-beans.png",
    name: "Cod with Herby Potatoes & Green Beans",
    description:
      "A simple pan-fried cod fillet with herby potatoes and green beans, finished with lemon.",
    cookingTime: "35 minutes",
    calories: "650 kcal",
    protein: "43g",
    equipment:
      "Large saucepan, large frying pan, steamer or saucepan for green beans, chopping board, knife",
    ingredients: [
      { item: "Cod fillets", shoppingItem: "Cod fillets", quantity: "170 g" },
      { item: "Potatoes", shoppingItem: "Potatoes", quantity: "200 g" },
      { item: "Green beans", shoppingItem: "Green beans", quantity: "62.5 g" },
      { item: "Olive oil", shoppingItem: "Olive oil", quantity: "� tbsp" },
      { item: "Lemon juice", shoppingItem: "Lemon", quantity: "? lemon" },
      { item: "Dried parsley", shoppingItem: "Dried parsley", quantity: "� tsp" },
      { item: "Dried dill", shoppingItem: "Dried dill", quantity: "� tsp" },
      { item: "Garlic granules", shoppingItem: "Garlic granules", quantity: "? tsp" },
      { item: "Black pepper", shoppingItem: "Black pepper", quantity: "To taste" },
      { item: "Fresh parsley", shoppingItem: "Parsley", quantity: "handful" },
      { item: "No added salt", shoppingItem: "No added salt", quantity: "As required" },
    ],
    method: [
      "Peel the potatoes and cut them into even chunks.",
      "Place them in a saucepan of cold water, bring to the boil and cook for 12�15 minutes until tender.",
      "Drain the potatoes and allow them to steam dry.",
      "Heat � tbsp olive oil in a large frying pan over a medium heat.",
      "Season the cod with black pepper, garlic granules and dried dill.",
      "Place the cod in the pan and cook for 4�5 minutes on each side, until opaque and cooked through.",
      "Remove the cod and keep warm.",
      "Add the remaining olive oil to the pan and gently toss the potatoes with the dried parsley and lemon juice for 3�4 minutes.",
      "Meanwhile, steam or boil the green beans for 5�6 minutes until tender but still slightly crisp.",
      "Serve the cod with the herby potatoes and green beans, finished with fresh parsley.",
    ],
    nutrition: {
      calories: "650 kcal",
      protein: "43 g",
      carbohydrates: "55 g",
      fat: "31 g",
      fibre: "7 g",
      sodium: "180 mg",
    },
    potassium: "High",
    phosphate: "Moderate",
    purines: "Moderate",
    dietaryNote:
      "Cod provides useful protein but also contributes phosphate and purines. Potatoes are the main potassium contributor.",
  },
{
    id: "cod-couscous-vegetables",
    code: "D027",
    servings: 1,

    source: {
      name: "RenalPlan Original � Baked cod fillet, tabouli and tomato salsa",
      url: "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/971021/McCance_and_Widdowsons_Composition_of_Foods_integrated_dataset_2021.pdf",
      logo: "/images/govuk.png",
    },    category: "Fish",
    emoji: "??",
    image: "/images/recipes/cod-couscous-vegetables.png",
    name: "Cod with Couscous & Vegetables",
    description:
      "A lighter Mediterranean-style cod dish with fluffy couscous, peppers and courgette, finished with lemon and herbs.",
    cookingTime: "30 minutes",
    calories: "640 kcal",
    protein: "43g",
    equipment:
      "Large frying pan, large bowl, measuring jug, chopping board, knife",
    ingredients: [
      { item: "Cod fillets", shoppingItem: "Cod fillets", quantity: "170 g" },
      { item: "Couscous", shoppingItem: "Couscous", quantity: "75 g" },
      { item: "Red pepper, sliced", shoppingItem: "Red pepper", quantity: "�" },
      { item: "Courgette, sliced", shoppingItem: "Courgette", quantity: "�" },
      { item: "Onion, sliced", shoppingItem: "Onion", quantity: "�" },
      { item: "Olive oil", shoppingItem: "Olive oil", quantity: "� tbsp" },
      { item: "Lemon juice", shoppingItem: "Lemon", quantity: "? lemon" },
      { item: "Dried oregano", shoppingItem: "Dried oregano", quantity: "� tsp" },
      { item: "Dried parsley", shoppingItem: "Dried parsley", quantity: "� tsp" },
      { item: "Garlic granules", shoppingItem: "Garlic granules", quantity: "? tsp" },
      { item: "Water", shoppingItem: "Water", quantity: "25 ml" },
      { item: "Black pepper", shoppingItem: "Black pepper", quantity: "To taste" },
      { item: "Fresh parsley", shoppingItem: "Parsley", quantity: "handful" },
      { item: "No added salt", shoppingItem: "No added salt", quantity: "As required" },
    ],
    method: [
      "Put the couscous into a large bowl and pour over 75ml boiling water. Cover and leave for 5 minutes.",
      "Fluff the couscous with a fork and stir through � tbsp olive oil, lemon juice and the dried herbs.",
      "Heat � tbsp olive oil in a large frying pan.",
      "Add the onion, pepper and courgette and cook for 5�6 minutes until softened.",
      "Remove the vegetables and keep warm.",
      "Add the remaining oil to the pan and season the cod with black pepper, garlic granules and oregano.",
      "Cook the cod for 4�5 minutes on each side until completely cooked through.",
      "Return the vegetables to the pan and add 25ml water.",
      "Simmer gently for 2 minutes to bring everything together.",
      "Serve the cod with the couscous and vegetables, finished with fresh parsley.",
    ],
    nutrition: {
      calories: "640 kcal",
      protein: "43 g",
      carbohydrates: "65 g",
      fat: "27 g",
      fibre: "5 g",
      sodium: "170 mg",
    },
    potassium: "Moderate",
    phosphate: "Moderate",
    purines: "Moderate",
    dietaryNote:
      "Cod contributes phosphate and purines, while the vegetables provide potassium. The recipe avoids processed sauces and stock cubes. Source audit: RenalPlan Original � Baked cod fillet, tabouli and tomato salsa is a candidate match; this RenalPlan recipe is not classified as an exact/scaled source recipe.",
  },
{
    id: "cod-tomato-rice",
    code: "D028",
    servings: 1,

    source: {
      name: "RenalPlan Original",
      url: "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/971021/McCance_and_Widdowsons_Composition_of_Foods_integrated_dataset_2021.pdf",
      logo: "/images/govuk.png",
      description: "Developed specifically for RenalPlan. Nutritional values calculated using McCance and Widdowson�s Composition of Foods Integrated Dataset (CoFID) 2021.",
      linkText: "View CoFID 2021",
    },    category: "Fish",
    emoji: "??",
    image: "/images/recipes/cod-tomato-rice.png",
    name: "Cod & Tomato Rice",
    description:
      "A simple cod dish with fluffy white rice, peppers and a light tomato and herb sauce. Familiar ingredients and no jarred sauce.",
    cookingTime: "35 minutes",
    calories: "650 kcal",
    protein: "43g",
    equipment:
      "Large frying pan with lid, chopping board, knife, measuring jug",
    ingredients: [
      { item: "Cod fillets", shoppingItem: "Cod fillets", quantity: "170 g" },
      { item: "Dry white basmati rice", shoppingItem: "Rice", quantity: "70 g" },
      { item: "Chopped tomatoes", shoppingItem: "Chopped tomatoes", quantity: "12.5 g" },
      { item: "Red pepper, diced", shoppingItem: "Red pepper", quantity: "�" },
      { item: "Onion, finely sliced", shoppingItem: "Onion", quantity: "�" },
      { item: "Courgette, diced", shoppingItem: "Courgette", quantity: "�" },
      { item: "Olive oil", shoppingItem: "Olive oil", quantity: "� tbsp" },
      { item: "Garlic, crushed", shoppingItem: "Garlic", quantity: "� clove" },
      { item: "Dried oregano", shoppingItem: "Dried oregano", quantity: "� tsp" },
      { item: "Dried parsley", shoppingItem: "Dried parsley", quantity: "� tsp" },
      { item: "Paprika", shoppingItem: "Paprika", quantity: "? tsp" },
      { item: "Water", shoppingItem: "Water", quantity: "37.5 ml" },
      { item: "Lemon juice", shoppingItem: "Lemon", quantity: "� tbsp" },
      { item: "Black pepper", shoppingItem: "Black pepper", quantity: "To taste" },
      { item: "Fresh parsley", shoppingItem: "Parsley", quantity: "handful" },
      { item: "No added salt", shoppingItem: "No added salt", quantity: "As required" },
    ],
    method: [
      "Heat � tbsp olive oil in a large frying pan and gently cook the onion, pepper and courgette for 5�6 minutes.",
      "Add the garlic, oregano, parsley and paprika and cook for 30 seconds.",
      "Stir in the chopped tomatoes and water.",
      "Add the rice and stir well.",
      "Bring to a gentle simmer, cover and cook according to the rice packet instructions, stirring occasionally.",
      "Season the cod with black pepper.",
      "When the rice is nearly cooked, place the cod fillets on top.",
      "Cover and cook for around 8�10 minutes, until the cod is completely cooked through and flakes easily.",
      "Drizzle over the lemon juice and remaining olive oil.",
      "Finish with fresh parsley and serve.",
    ],
    nutrition: {
      calories: "650 kcal",
      protein: "43 g",
      carbohydrates: "70 g",
      fat: "25 g",
      fibre: "5 g",
      sodium: "160 mg",
    },
    potassium: "Moderate",
    phosphate: "Moderate",
    purines: "Moderate",
    dietaryNote:
      "Cod contributes phosphate and purines, while tomatoes and vegetables contribute potassium. The dish avoids stock cubes, salty sauces and processed seasoning.",
  },
{
    id: "vegetable-herb-couscous",
    code: "D029",
    servings: 1,

    source: {
      name: "RenalPlan Original",
      url: "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/971021/McCance_and_Widdowsons_Composition_of_Foods_integrated_dataset_2021.pdf",
      logo: "/images/govuk.png",
      description: "Developed specifically for RenalPlan. Nutritional values calculated using McCance and Widdowson�s Composition of Foods Integrated Dataset (CoFID) 2021.",
      linkText: "View CoFID 2021",
    },    category: "Vegetarian",
    emoji: "??",
    image: "/images/recipes/vegetable-herb-couscous.png",
    name: "Vegetable & Herb Couscous",
    description:
      "A colourful, satisfying couscous meal with peppers, courgette, onion and sweetcorn, finished with lemon, herbs and a little olive oil.",
    cookingTime: "30 minutes",
    calories: "640 kcal",
    protein: "18g",
    equipment:
      "Large frying pan, large bowl, measuring jug, chopping board, knife",
    ingredients: [
      { item: "Couscous", shoppingItem: "Couscous", quantity: "75 g" },
      { item: "Red pepper, diced", shoppingItem: "Red pepper", quantity: "�" },
      { item: "Yellow pepper, diced", shoppingItem: "Yellow pepper", quantity: "�" },
      { item: "Courgette, diced", shoppingItem: "Courgette", quantity: "�" },
      { item: "Onion, sliced", shoppingItem: "Onion", quantity: "�" },
      { item: "Sweetcorn, drained", shoppingItem: "Sweetcorn", quantity: "37.5 g" },
      { item: "Olive oil", shoppingItem: "Olive oil", quantity: "� tbsp" },
      { item: "Lemon, zest and juice", shoppingItem: "Lemon", quantity: "� lemon" },
      { item: "Dried oregano", shoppingItem: "Dried oregano", quantity: "� tsp" },
      { item: "Dried parsley", shoppingItem: "Dried parsley", quantity: "� tsp" },
      { item: "Garlic granules", shoppingItem: "Garlic granules", quantity: "? tsp" },
      { item: "Paprika", shoppingItem: "Paprika", quantity: "? tsp" },
      { item: "Reduced-fat feta cheese, crumbled", shoppingItem: "Reduced-fat feta cheese, crumbled", quantity: "12.5 g" },
      { item: "Black pepper", shoppingItem: "Black pepper", quantity: "To taste" },
      { item: "Fresh parsley", shoppingItem: "Parsley", quantity: "handful" },
      { item: "No added salt", shoppingItem: "No added salt", quantity: "As required" },
    ],
    method: [
      "Put the couscous into a large bowl and pour over 75ml boiling water. Cover and leave for 5 minutes.",
      "Fluff the couscous with a fork and stir through � tbsp olive oil, the lemon zest and half the lemon juice.",
      "Heat � tbsp olive oil in a large frying pan.",
      "Add the onion, red and yellow peppers and courgette. Cook for 7�8 minutes until softened and lightly browned.",
      "Add the sweetcorn, oregano, parsley, garlic granules and paprika and cook for another 2 minutes.",
      "Stir the vegetables through the couscous.",
      "Add the remaining olive oil and lemon juice and mix well.",
      "Serve in a bowl and crumble the feta over the top.",
      "Finish with fresh parsley and black pepper.",
    ],
    nutrition: {
      calories: "640 kcal",
      protein: "18 g",
      carbohydrates: "78 g",
      fat: "28 g",
      fibre: "7 g",
      sodium: "140 mg",
    },
    potassium: "Moderate",
    phosphate: "Moderate",
    purines: "Low",
    dietaryNote:
      "This vegetarian option is relatively low in purines because it does not rely on meat, fish or pulses. The vegetables contribute potassium and the feta contributes phosphate.",
  },
{
    id: "creamy-mushroom-garlic-pasta",
    code: "D030",
    servings: 1,
    source: {
      name: "RenalPlan Original � Mushroom and courgette stroganoff",
      url: "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/971021/McCance_and_Widdowsons_Composition_of_Foods_integrated_dataset_2021.pdf",
      logo: "/images/govuk.png",
    },
    category: "Vegetarian",
    emoji: "??",
    image: "/images/recipes/creamy-mushroom-garlic-pasta.png",
    name: "Creamy Mushroom & Garlic Pasta",
    description:
      "A creamy mushroom and garlic pasta with onions, herbs and a light lemon finish. A satisfying vegetarian meal with a modest amount of cream.",
    cookingTime: "30 minutes",
    calories: "650 kcal",
    protein: "19g",
    equipment:
      "Large frying pan, large saucepan, colander, chopping board, knife",
    ingredients: [
      { item: "Dried penne pasta", shoppingItem: "Pasta", quantity: "87.5 g" },
      { item: "Chestnut mushrooms, sliced", shoppingItem: "Mushrooms", quantity: "75 g" },
      { item: "Onion, finely sliced", shoppingItem: "Onion", quantity: "�" },
      { item: "Garlic, crushed", shoppingItem: "Garlic", quantity: "� clove" },
      { item: "Half-fat cr�me fra�che", shoppingItem: "Half-fat cr�me fra�che", quantity: "37.5 ml" },
      { item: "Olive oil", shoppingItem: "Olive oil", quantity: "� tbsp" },
      { item: "Lemon juice", shoppingItem: "Lemon", quantity: "? lemon" },
      { item: "Dried parsley", shoppingItem: "Dried parsley", quantity: "� tsp" },
      { item: "Dried thyme", shoppingItem: "Dried thyme", quantity: "� tsp" },
      { item: "Black pepper", shoppingItem: "Black pepper", quantity: "To taste" },
      { item: "Fresh parsley", shoppingItem: "Parsley", quantity: "handful" },
      { item: "No added salt", shoppingItem: "No added salt", quantity: "As required" },
    ],
    method: [
      "Cook the pasta according to the packet instructions until just tender. Reserve a little cooking water, then drain.",
      "Heat � tbsp olive oil in a large frying pan over a medium-high heat.",
      "Add the mushrooms and cook for 5�7 minutes until softened and lightly browned.",
      "Add the remaining olive oil and the onion and cook for 4�5 minutes until softened.",
      "Add the garlic, thyme and dried parsley and cook for 30 seconds.",
      "Reduce the heat and stir in the cr�me fra�che and a small splash of the reserved pasta water.",
      "Add the drained pasta and toss gently until coated in the sauce.",
      "Add the lemon juice and black pepper and warm through for 1�2 minutes. Do not boil the sauce.",
      "Finish with fresh parsley and serve.",
    ],
    nutrition: {
      calories: "650 kcal",
      protein: "19 g",
      carbohydrates: "82 g",
      fat: "27 g",
      fibre: "7 g",
      sodium: "30 mg",
    },
    potassium: "Moderate",
    phosphate: "High",
    purines: "Low",
    dietaryNote:
      "This vegetarian recipe is relatively low in purines because it contains no meat, fish or pulses. Mushrooms contribute potassium and the cr�me fra�che contributes some phosphate. Source audit: RenalPlan Original � Mushroom and courgette stroganoff is a candidate match; this RenalPlan recipe is not classified as an exact/scaled source recipe.",
  },
{
    id: "turkey-curry",
    code: "D031",
    servings: 1,
    source: {
      name: "RenalPlan Original � Turkey Curry",
      url: "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/971021/McCance_and_Widdowsons_Composition_of_Foods_integrated_dataset_2021.pdf",
      logo: "/images/govuk.png",
    },
    category: "Turkey",
    emoji: "??",
    image: "/images/recipes/turkey-curry.png",
    name: "Turkey Curry with Basmati Rice",
    description:
      "A mildly spiced turkey curry with butternut squash, coconut and spinach served with fragrant basmati rice.",
    cookingTime: "50 minutes",
    calories: "584 kcal",
    protein: "35 g",
    equipment: "Saucepan, large frying pan, sieve, knife",
    ingredients: [
      { item: "Olive oil", shoppingItem: "Olive oil", quantity: "� tsp" },
      { item: "Unsalted butter", shoppingItem: "Unsalted Butter", quantity: "6.25 g" },
      { item: "Onion", shoppingItem: "Onion", quantity: "�" },
      { item: "Garlic", shoppingItem: "Garlic", quantity: "1 clove" },
      { item: "Fresh ginger", shoppingItem: "Ginger", quantity: "? cm" },
      { item: "Red chilli", shoppingItem: "Red chilli", quantity: "�" },
      { item: "Curry powder", shoppingItem: "Curry powder", quantity: "� tsp" },
      { item: "Butternut squash", shoppingItem: "Butternut squash", quantity: "75 g" },
      { item: "Low-salt chicken or turkey stock", shoppingItem: "Low-salt chicken or turkey stock", quantity: "142.5 ml" },
      { item: "Coconut milk", shoppingItem: "Coconut milk", quantity: "46 ml" },
      { item: "Spinach", shoppingItem: "Spinach", quantity: "12.5 g" },
      { item: "Lemon juice", shoppingItem: "Lemon", quantity: "� tsp" },
      { item: "Cooked turkey", shoppingItem: "Cooked turkey", quantity: "100 g" },
      { item: "Basmati rice, raw", shoppingItem: "Basmati rice", quantity: "60 g" },
      { item: "Cinnamon stick", shoppingItem: "Cinnamon sticks", quantity: "�" },
      { item: "Whole cloves", shoppingItem: "Whole cloves", quantity: "� tsp" },
      { item: "Cardamom pods", shoppingItem: "Cardamom pods", quantity: "� tsp" },
      { item: "Fresh coriander", shoppingItem: "Coriander", quantity: "handful" },
    ],
    method: [
      "Rinse the rice in cold water 3�4 times until the water is less cloudy. Cover with water and soak for up to 30 minutes, then drain. Put the rice into a saucepan with fresh cold water and the cinnamon, cloves and cardamom. Bring to the boil, cover tightly, reduce the heat to low and simmer for 10 minutes. Turn off the heat and leave covered for 5 minutes, then fluff with a fork and remove the spices.",
      "Meanwhile, peel, deseed and cube the squash. Finely chop the garlic, onion and chilli. Heat the oil and butter in a large saucepan, add the onion and cook for 2�3 minutes. Add the garlic, chilli, curry powder and grated ginger and cook over a medium heat until the onion is soft, taking care not to burn the curry powder.",
      "Add the squash and cook until it begins to stick slightly to the bottom of the pan. Add the stock, bring to the boil, then reduce the heat and simmer for 10�15 minutes until the squash is tender.",
      "Stir in the coconut milk and lemon juice. Add the cooked turkey, fold through and simmer until heated through. Add the spinach and heat until wilted.",
      "Serve the curry with the cooked rice and sprinkle over the chopped coriander.",
    ],
    nutrition: {
      calories: "584 kcal",
      protein: "35 g",
      carbohydrates: "60 g",
      fat: "23 g",
      fibre: "6 g",
      sodium: "350 mg",
    },
    potassium: "Low",
    phosphate: "Low",
    purines: "Moderate",
    dietaryNote:
      "low potassium and low phosphate.",
  },
{
    id: "roast-lamb",
    code: "D032",
    servings: 1,
    source: {
      name: "RenalPlan Original � Roast Lamb",
      url: "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/971021/McCance_and_Widdowsons_Composition_of_Foods_integrated_dataset_2021.pdf",
      logo: "/images/govuk.png",
    },
    category: "Lamb",
    emoji: "??",
    image: "/images/recipes/roast-lamb.png",
    name: "Roast Lamb with Potatoes & Vegetables",
    description:
      "A traditional roast lamb dinner with rosemary potatoes, swede mash, vegetables and low-salt gravy.",
    cookingTime: "2 hours",
    calories: "506 kcal",
    protein: "29 g",
    equipment: "Roasting tin, saucepan, colander, grill or oven, knife",
    ingredients: [
      { item: "Boneless leg of lamb", shoppingItem: "Boneless leg of lamb", quantity: "95 g" },
      { item: "Fresh rosemary", shoppingItem: "Rosemary", quantity: "sprig" },
      { item: "Garlic", shoppingItem: "Garlic", quantity: "� clove" },
      { item: "Onion", shoppingItem: "Onion", quantity: "�" },
      { item: "Potatoes", shoppingItem: "Potatoes", quantity: "125 g" },
      { item: "Olive oil", shoppingItem: "Olive oil", quantity: "� tbsp" },
      { item: "Swede", shoppingItem: "Swede", quantity: "62.5 g" },
      { item: "Unsalted butter", shoppingItem: "Unsalted Butter", quantity: "10 g" },
      { item: "Spring greens or carrots", shoppingItem: "Spring greens", quantity: "62.5 g" },
      { item: "Plain flour", shoppingItem: "Plain flour", quantity: "3.75 g" },
      { item: "Low-salt lamb stock", shoppingItem: "Low-salt lamb stock", quantity: "6.25 ml" },
      { item: "Mint sauce", shoppingItem: "Mint sauce", quantity: "amount" },
      { item: "Black pepper", shoppingItem: "Black pepper", quantity: "To taste" },
    ],
    method: [
      "Preheat the oven to 200�C (180�C fan). Make small incisions in the lamb and place the rosemary, garlic and onion around and into the meat. Season with black pepper and rub with a little olive oil. For the original joint, roast for 20 minutes at this temperature, then reduce to 180�C (160�C fan) and cook for a further 20 minutes per 500g, adjusting the cooking time to the weight of the lamb used.",
      "Put the potatoes into a pan of cold water and bring to the boil. Cook until soft, then drain and shake the potatoes to roughen the edges. Allow them to steam dry.",
      "Heat the remaining roasting oil in a roasting tin for 5 minutes. Add the parboiled potatoes, turn to coat and roast with the rosemary until golden and crisp, about 45 minutes.",
      "Boil the swede until soft, drain, return to the pan and mash with the butter and black pepper. About 10 minutes before serving, boil the spring greens or carrots until cooked, then drain and discard the water.",
      "Remove the lamb from the oven and allow it to rest for 15 minutes. Make the gravy by cooking the flour in the roasting juices, then gradually stirring in the low-salt stock until thickened. Strain the gravy.",
      "Serve the lamb with the roast potatoes, swede mash, vegetables and gravy, with a little mint sauce.",
    ],
    nutrition: {
      calories: "506 kcal",
      protein: "29 g",
      carbohydrates: "30 g",
      fat: "28 g",
      fibre: "5 g",
      sodium: "400 mg",
    },
    potassium: "Low",
    phosphate: "Low",
    purines: "Moderate",
    dietaryNote:
      "low potassium and low phosphate.",
  },
{
    id: "quick-lamb-leek-hotpot",
    code: "D033",
    servings: 1,
    source: {
      name: "RenalPlan Original � Quick Lamb and Leek Hotpot",
      url: "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/971021/McCance_and_Widdowsons_Composition_of_Foods_integrated_dataset_2021.pdf",
      logo: "/images/govuk.png",
    },
    category: "Lamb",
    emoji: "??",
    image: "/images/recipes/quick-lamb-leek-hotpot.png",
    name: "Quick Lamb & Leek Hotpot",
    description:
      "A comforting lamb and leek hotpot topped with sliced potatoes and served with green beans.",
    cookingTime: "40 minutes",
    calories: "378 kcal",
    protein: "30 g",
    equipment: "Saucepan, frying pan, ovenproof dish, grill, knife",
    ingredients: [
      { item: "White potatoes", shoppingItem: "Potatoes", quantity: "100 g" },
      { item: "Diced lamb leg steak", shoppingItem: "Diced lamb leg steak", quantity: "125 g" },
      { item: "Oil", shoppingItem: "Sunflower oil", quantity: "� tsp" },
      { item: "Leek", shoppingItem: "Leek", quantity: "�" },
      { item: "Fresh rosemary", shoppingItem: "Rosemary", quantity: "� sprig" },
      { item: "Low-salt lamb gravy", shoppingItem: "Low-salt lamb gravy", quantity: "125 ml" },
      { item: "Green beans", shoppingItem: "Green beans", quantity: "40 g" },
      { item: "Butter", shoppingItem: "Unsalted Butter", quantity: "� tbsp" },
      { item: "Black pepper", shoppingItem: "Black pepper", quantity: "To taste" },
    ],
    method: [
      "Fill a saucepan with water and bring to the boil. Peel and slice the potatoes about 0.5cm thick and cook for 8�10 minutes.",
      "Meanwhile, heat a frying pan over a high heat and dry-fry the diced lamb for about 5 minutes, until browned on all sides.",
      "Clean, trim and slice the leek and chop the rosemary. Add them to the lamb with the oil and fry for 2�3 minutes, until the leek has softened slightly.",
      "Prepare the gravy according to its instructions, add it to the pan and simmer gently for about 20 minutes, until the lamb is thoroughly cooked. Season with black pepper and transfer to an ovenproof dish.",
      "Preheat the grill. Drain the potato slices and allow them to cool. Arrange them overlapping in a single layer over the lamb mixture. Melt the butter and brush it over the potatoes.",
      "Grill for about 5 minutes, until golden and bubbling. Meanwhile, cook the green beans in boiling water for 5�10 minutes until soft, then drain and discard the water.",
      "Serve the hotpot with the green beans.",
    ],
    nutrition: {
      calories: "378 kcal",
      protein: "30 g",
      carbohydrates: "30 g",
      fat: "17 g",
      fibre: "5 g",
      sodium: "650 mg",
    },
    potassium: "Low",
    phosphate: "Low",
    purines: "Moderate",
    dietaryNote:
      "low potassium and low phosphate; not low salt.",
  },
{
    id: "chinese-pork-celery-rice",
    code: "D034",
    servings: 1,
    source: {
      name: "RenalPlan Original � Chinese Pork with Celery and Rice",
      url: "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/971021/McCance_and_Widdowsons_Composition_of_Foods_integrated_dataset_2021.pdf",
      logo: "/images/govuk.png",
    },
    category: "Pork",
    emoji: "??",
    image: "/images/recipes/chinese-pork-celery-rice.png",
    name: "Chinese Pork with Celery & Rice",
    description:
      "Tender pork stir-fried with crisp celery, carrot, ginger and garlic in a light Chinese-style sauce, served with rice.",
    cookingTime: "90 minutes",
    calories: "460 kcal",
    protein: "22 g",
    equipment: "Wok or frying pan, saucepan, bowls, knife",
    ingredients: [
      { item: "Pork chop", shoppingItem: "Pork chop", quantity: "100 g" },
      { item: "Celery", shoppingItem: "Celery", quantity: "50 g" },
      { item: "Onion", shoppingItem: "Onion", quantity: "�" },
      { item: "Carrot", shoppingItem: "Carrot", quantity: "�" },
      { item: "Fresh ginger", shoppingItem: "Ginger", quantity: "1 cm" },
      { item: "Garlic", shoppingItem: "Garlic", quantity: "1 clove" },
      { item: "Vegetable oil", shoppingItem: "Sunflower oil", quantity: "� tbsp" },
      { item: "Brown rice, raw", shoppingItem: "Brown rice", quantity: "60 g" },
      { item: "Cornflour", shoppingItem: "Cornflour", quantity: "� tsp" },
      { item: "Water", shoppingItem: "Water", quantity: "2� tbsp" },
      { item: "White wine", shoppingItem: "White wine", quantity: "� tsp" },
      { item: "Oyster sauce", shoppingItem: "Oyster sauce", quantity: "� tsp" },
      { item: "Sesame oil", shoppingItem: "Sesame oil", quantity: "� tsp" },
      { item: "Sugar", shoppingItem: "Sugar", quantity: "? tsp" },
      { item: "White pepper", shoppingItem: "White pepper", quantity: "Pinch" },
    ],
    method: [
      "If using pork chop, slice it into strips about 5cm long and 0.5cm wide. Put the pork or mince into a bowl and mix thoroughly with the marinade ingredients. Cover and refrigerate for at least 1 hour.",
      "Slice the celery and carrot into thin matchsticks. Prepare the cornflour slurry by mixing the cornflour with the specified water. Cook the rice according to the packet instructions.",
      "Heat a non-stick wok over high heat and add the oil. Add the marinated pork and keep it moving. When the pork is slightly browned, add the onion, ginger and garlic and continue cooking until fragrant. Add the sauce ingredients and stir.",
      "Stir the cornflour slurry again, pour it into the wok while stirring continuously and bring the sauce to the boil. Add the celery and carrot and cook for 3�4 minutes, until the vegetables are cooked and everything is coated in the sauce.",
      "Serve the pork and vegetables over the cooked rice.",
    ],
    nutrition: {
      calories: "460 kcal",
      protein: "22 g",
      carbohydrates: "61 g",
      fat: "16 g",
      fibre: "5 g",
      sodium: "350 mg",
    },
    potassium: "Low",
    phosphate: "Low",
    purines: "Moderate",
    dietaryNote:
      "low potassium and low phosphate.",
  },
{
    id: "beef-stir-fry",
    code: "D035",
    servings: 1,
    source: {
      name: "RenalPlan Original � Beef Stir Fry",
      url: "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/971021/McCance_and_Widdowsons_Composition_of_Foods_integrated_dataset_2021.pdf",
      logo: "/images/govuk.png",
    },
    category: "Beef",
    emoji: "??",
    image: "/images/recipes/beef-stir-fry.png",
    name: "Beef Stir-Fry with Rice",
    description:
      "An Asian-inspired beef stir-fry with peppers, celery and spring onions in a sweet-savoury sauce, served with basmati rice.",
    cookingTime: "2 hours",
    calories: "510 kcal",
    protein: "38 g",
    equipment: "Wok or large frying pan, saucepan, bowls, knife",
    ingredients: [
      { item: "Beef steak, rump or sirloin", shoppingItem: "Beef steak", quantity: "125 g" },
      { item: "Green pepper", shoppingItem: "Green pepper", quantity: "�" },
      { item: "Spring onions", shoppingItem: "Spring onions", quantity: "1" },
      { item: "Garlic", shoppingItem: "Garlic", quantity: "� clove" },
      { item: "Celery", shoppingItem: "Celery", quantity: "1 stick" },
      { item: "Red pepper", shoppingItem: "Red pepper", quantity: "�" },
      { item: "Mild chilli powder", shoppingItem: "Mild chilli powder", quantity: "� tsp" },
      { item: "Paprika", shoppingItem: "Paprika", quantity: "� tbsp" },
      { item: "Very low-salt beef stock", shoppingItem: "Very low-salt beef stock", quantity: "� cube" },
      { item: "Clear honey", shoppingItem: "Clear honey", quantity: "� tbsp" },
      { item: "Red wine vinegar", shoppingItem: "Red wine vinegar", quantity: "� tbsp" },
      { item: "Sunflower oil", shoppingItem: "Sunflower oil", quantity: "� tbsp" },
      { item: "Worcestershire sauce", shoppingItem: "Worcestershire sauce", quantity: "� tbsp" },
      { item: "Basmati rice, raw", shoppingItem: "Basmati rice", quantity: "62.5 g" },
    ],
    method: [
      "Cut the beef into thin 1cm strips and place in a bowl. Add the paprika and mild chilli powder and mix until evenly coated. Leave to marinate for 1 hour, stirring once after 30 minutes.",
      "Put the rice into a saucepan with 500ml water. Bring to a rolling boil, reduce to a gentle simmer and cook for 12 minutes.",
      "Cut the celery and peppers into strips about 5cm long and 5mm thick. Thinly slice the spring onions and set aside.",
      "Heat the sunflower oil in a wok or large frying pan. Stir-fry the spring onions, garlic, celery and peppers for 1 minute, then add the beef and cook over high heat for 3�4 minutes.",
      "Make the sauce by mixing the stock with the boiling water, Worcestershire sauce, honey and red wine vinegar. Add it to the wok and cook until the beef is well coated.",
      "Drain the rice and rinse with boiling water. Serve immediately with the beef stir-fry.",
    ],
    nutrition: {
      calories: "510 kcal",
      protein: "38 g",
      carbohydrates: "60 g",
      fat: "17 g",
      fibre: "4 g",
      sodium: "400 mg",
    },
    potassium: "Low",
    phosphate: "Low",
    purines: "Moderate",
    dietaryNote:
      "low potassium and low phosphate.",
  }
];

