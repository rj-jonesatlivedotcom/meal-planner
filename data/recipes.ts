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
};

export const recipes: Recipe[] = [
  {
    id: "chicken-curry",
    code: "D001",
    category: "Chicken",
    emoji: "🍛",
    image: "/images/recipes/chicken-curry.png",
    name: "Chicken Curry",

    description:
      "A mild, tomato-based chicken curry made with simple everyday ingredients, designed to be kidney-friendly by design while remaining a family favourite.",

    cookingTime: "40 minutes",

    calories: "520 kcal",

    protein: "42g",

    equipment:
      "Large frying pan or sauté pan, saucepan",

    ingredients: [
      {
        item: "Chicken breast, diced",
        shoppingItem: "Chicken breast",
        quantity: "150g",
      },
      {
        item: "Large onion, diced",
        shoppingItem: "Onion",
        quantity: "¼",
      },
      {
        item: "Garlic, crushed",
        shoppingItem: "Garlic",
        quantity: "1 clove",
      },
      {
        item: "Red pepper, diced",
        shoppingItem: "Red pepper",
        quantity: "½",
      },
      {
        item: "Mild curry powder",
        quantity: "1 tsp",
      },
      {
        item: "Tomato purée",
        quantity: "1½ tsp",
      },
      {
        item: "Passata",
        quantity: "100g",
      },
      {
        item: "Reduced-salt chicken stock",
        quantity: "50ml",
      },
      {
        item: "Green beans, trimmed and cut into bite-sized pieces",
        shoppingItem: "Green beans",
        quantity: "37.5g",
      },
      {
        item: "Dry basmati rice",
        quantity: "75g",
      },
      {
        item: "Olive oil",
        quantity: "1½ tsp",
      },
      {
        item: "Freshly ground black pepper",
        quantity: "To taste",
      },
    ],

    method: [
      "Bring a saucepan of water to the boil, ready for the rice later.",
      "Heat the olive oil in a large frying pan over a medium heat.",
      "Add the onion and cook for 4–5 minutes until softened.",
      "Stir in the garlic and cook for 30 seconds.",
      "Add the diced chicken and cook for 5–6 minutes until lightly browned on all sides.",
      "Stir in the red pepper and cook for a further 2 minutes.",
      "Sprinkle over the curry powder and stir until the chicken and vegetables are evenly coated.",
      "Stir in the tomato purée and cook for 1 minute.",
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
    },
  potassium: "Moderate",
  phosphate: "Low",
  purines: "Low",
  dietaryNote: "Tomato-based ingredients make this moderate in potassium.",
  },
  {
    id: "cottage-pie",
    code: "D002",
    category: "Beef",
    emoji: "🥧",
    image: "/images/recipes/cottage-pie.png",
    name: "Cottage Pie",

    description:
      "A comforting family favourite made with lean beef, vegetables and creamy mashed potato, designed to be kidney-friendly by design while keeping all the flavour of a traditional Cottage Pie.",

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
        quantity: "200g"
      },
      {
        item: "Lean beef mince (5% fat)",
        quantity: "150g"
      },
      {
        item: "Large onion, diced",
        shoppingItem: "Onion",
        quantity: "¼"
      },
      {
        item: "Medium carrot, diced",
        shoppingItem: "Carrot",
        quantity: "½"
      },
      {
        item: "Tomato purée",
        quantity: "1½ tsp"
      },
      {
        item: "Worcestershire sauce",
        quantity: "¼ tsp"
      },
      {
        item: "Dried thyme",
        quantity: "¼ tsp"
      },
      {
        item: "Reduced-salt beef stock",
        quantity: "75ml"
      },
      {
        item: "Frozen peas",
        quantity: "37.5g"
      },
      {
        item: "Butter",
        quantity: "5g"
      },
      {
        item: "Semi-skimmed milk",
        quantity: "15ml"
      },
      {
        item: "Freshly ground black pepper",
        quantity: "To taste"
      }
    ],

    method: [
      "Preheat the oven to 200°C (180°C fan).",
      "Place the potatoes into a saucepan of cold water, bring to the boil and cook for 18–20 minutes until tender.",
      "While the potatoes are cooking, place the beef mince, onion and carrot into a large frying pan over a medium heat. Cook for 8–10 minutes, breaking up the mince with a wooden spoon, until the beef is browned and the vegetables have softened.",
      "Stir in the tomato purée, Worcestershire sauce and dried thyme, then cook for 1 minute.",
      "Pour in the reduced-salt beef stock, stir well and bring to a gentle simmer.",
      "Add the frozen peas and simmer for 10–12 minutes, stirring occasionally until the sauce has reduced slightly.",
      "While the filling is simmering, drain the potatoes thoroughly. Add the butter and milk, then mash until smooth. Season with freshly ground black pepper.",
      "Spoon the beef mixture evenly into an ovenproof dish.",
      "Spread the mashed potato over the filling, smoothing it with the back of a spoon. Lightly roughen the surface with a fork to help it brown.",
      "Bake for 20–25 minutes, until the potato is lightly golden and the filling is bubbling around the edges.",
      "Leave to stand for 5 minutes before serving."
    ],

    nutrition: {
      calories: "540 kcal",
      protein: "38 g",
      carbohydrates: "44 g",
      fat: "18 g",
      fibre: "7 g"
    },
  potassium: "Moderate",
  phosphate: "Moderate",
  purines: "Moderate",
  dietaryNote: "Potato, beef and peas make this a more moderate renal-diet choice.",
  },

{
    id: "chicken-arrabbiata",
    code: "D003",
    category: "Chicken",
    emoji: "🍝",
    image: "/images/recipes/chicken-arrabbiata.png",
    name: "Chicken Arrabbiata Pasta",

    description:
      "A simple tomato-based chicken pasta with a gentle warmth, designed to be kidney-friendly while remaining a family favourite.",

    cookingTime: "35 minutes",

    calories: "500 kcal",

    protein: "40g",

    equipment:
      "Large frying pan or sauté pan, saucepan",

    ingredients: [
      {
        item: "Chicken breast, diced",
        shoppingItem: "Chicken breast",
        quantity: "150g",
      },
      {
        item: "Penne pasta",
        shoppingItem: "Pasta",
        quantity: "75g",
      },
      {
        item: "Large onion, diced",
        shoppingItem: "Onion",
        quantity: "¼",
      },
      {
        item: "Garlic, crushed",
        shoppingItem: "Garlic",
        quantity: "1 clove",
      },
      {
        item: "Red pepper, diced",
        shoppingItem: "Red pepper",
        quantity: "½",
      },
      {
        item: "Tomato purée",
        quantity: "1½ tsp",
      },
      {
        item: "Passata",
        quantity: "100g",
      },
      {
        item: "Reduced-salt chicken stock",
        quantity: "50ml",
      },
      {
        item: "Dried chilli flakes",
        quantity: "¼ tsp",
      },
      {
        item: "Olive oil",
        quantity: "1½ tsp",
      },
      {
        item: "Freshly ground black pepper",
        quantity: "To taste",
      },
    ],

    method: [
      "Bring a saucepan of water to the boil and cook the pasta according to the packet instructions.",
      "Heat the olive oil in a large frying pan over a medium heat.",
      "Add the onion and cook for 4–5 minutes until softened.",
      "Stir in the garlic and cook for 30 seconds.",
      "Add the diced chicken and cook for 5–6 minutes until lightly browned.",
      "Add the red pepper and cook for a further 2 minutes.",
      "Stir in the tomato purée and chilli flakes and cook for 1 minute.",
      "Pour in the passata and reduced-salt chicken stock, then simmer gently for 10–15 minutes until the chicken is cooked through.",
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
    },
  potassium: "Moderate",
  phosphate: "Low",
  purines: "Low",
  dietaryNote: "Tomato-based ingredients make this moderate in potassium.",
  },
{
  id: "spaghetti-bolognese",
  code: "D004",
  category: "Beef",
  emoji: "🍝",
  image: "/images/recipes/spaghetti-bolognese.png",
  name: "Spaghetti Bolognese",

  description:
    "A rich, tomato-based family favourite made with lean beef, simple vegetables and everyday ingredients, designed to be kidney-friendly by design.",

  cookingTime: "40 minutes",

  calories: "510 kcal",

  protein: "38g",

  equipment:
    "Large frying pan, saucepan",

  ingredients: [
    {
      item: "Lean beef mince (5% fat)",
      quantity: "150g",
    },
    {
      item: "Dried spaghetti",
      quantity: "75g",
    },
    {
      item: "Large onion, finely diced",
      shoppingItem: "Onion",
      quantity: "¼",
    },
    {
      item: "Medium carrot, finely diced",
      shoppingItem: "Carrot",
      quantity: "½",
    },
    {
      item: "Garlic, crushed",
      shoppingItem: "Garlic",
      quantity: "1 clove",
    },
    {
      item: "Tomato purée",
      quantity: "1½ tsp",
    },
    {
      item: "Passata",
      quantity: "100g",
    },
    {
      item: "Dried mixed herbs",
      quantity: "½ tsp",
    },
    {
      item: "Freshly ground black pepper",
      quantity: "To taste",
    },
  ],

  method: [
    "Bring a saucepan of water to the boil and cook the spaghetti according to the packet instructions.",
    "While the spaghetti is cooking, place the lean beef mince and onion into a large frying pan over a medium heat. Cook for 5–6 minutes, breaking up the mince with a wooden spoon until browned.",
    "Add the carrot and garlic and cook for a further 2–3 minutes until softened.",
    "Stir in the tomato purée and cook for 1 minute, stirring continuously.",
    "Pour in the passata and stir in the dried mixed herbs. Bring to a gentle simmer.",
    "Simmer for 12–15 minutes, stirring occasionally until the sauce has thickened.",
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
  },
  potassium: "Moderate",
  phosphate: "Low",
  purines: "Moderate",
  dietaryNote: "Beef makes this moderate in purines; the tomato base also raises potassium.",
},
{
  id: "lemon-herb-chicken-tray-bake",
  code: "D005",
  category: "Chicken",
  emoji: "🍗",
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
      quantity: "150g",
    },
    {
      item: "Floury potatoes, cut into bite-sized chunks",
      shoppingItem: "Potatoes",
      quantity: "200g",
    },
    {
      item: "Red pepper, cut into chunks",
      shoppingItem: "Red pepper",
      quantity: "½",
    },
    {
      item: "Red onion, cut into wedges",
      shoppingItem: "Red onion",
      quantity: "¼",
    },
    {
      item: "Olive oil",
      quantity: "1½ tsp",
    },
    {
      item: "Lemon juice",
      shoppingItem: "Lemon",
      quantity: "¼",
    },
    {
      item: "Lemon zest",
      shoppingItem: "Lemon",
      quantity: "¼",
    },
    {
      item: "Dried mixed herbs",
      quantity: "½ tsp",
    },
    {
      item: "Freshly ground black pepper",
      quantity: "To taste",
    },
  ],

  method: [
    "Preheat the oven to 200°C (180°C fan).",
    "Place the potatoes into a large roasting tray and drizzle with half of the olive oil. Toss to coat evenly and roast for 15 minutes.",
    "While the potatoes are roasting, place the chicken, red pepper and red onion into a bowl. Add the remaining olive oil, lemon juice, lemon zest, dried mixed herbs and freshly ground black pepper. Mix well until everything is evenly coated.",
    "Remove the roasting tray from the oven and add the chicken and vegetables to the potatoes, spreading everything into a single layer.",
    "Return the tray to the oven and roast for 25–30 minutes, turning everything halfway through, until the chicken is cooked through, the potatoes are golden and the vegetables are lightly roasted.",
    "Serve immediately.",
  ],

  nutrition: {
    calories: "510 kcal",
    protein: "42 g",
    carbohydrates: "42 g",
    fat: "12 g",
    fibre: "5 g",
  },
  potassium: "Moderate",
  phosphate: "Low",
  purines: "Low",
  dietaryNote: "The potato portion makes this moderate in potassium.",
},
{
  id: "chicken-fajitas",
  code: "D006",
  category: "Chicken",
  emoji: "🌯",
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
      quantity: "150g",
    },
    {
      item: "Small white tortilla wraps",
      quantity: "2",
    },
    {
      item: "Large onion, sliced",
      shoppingItem: "Onion",
      quantity: "¼",
    },
    {
      item: "Red pepper, sliced",
      shoppingItem: "Red pepper",
      quantity: "½",
    },
    {
      item: "Green pepper, sliced",
      shoppingItem: "Green pepper",
      quantity: "½",
    },
    {
      item: "Olive oil",
      quantity: "1½ tsp",
    },
    {
      item: "Ready-made mild fajita seasoning",
      quantity: "1 tsp",
    },
    {
      item: "Lime juice",
      shoppingItem: "Lime",
      quantity: "¼",
    },
    {
      item: "Freshly ground black pepper",
      quantity: "To taste",
    },
  ],

  method: [
    "Heat the olive oil in a large frying pan over a medium-high heat.",
    "Add the chicken strips and cook for 5–6 minutes, stirring regularly until lightly browned.",
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
  },
  potassium: "Low",
  phosphate: "Low",
  purines: "Low",
},
{
  id: "roast-chicken-dinner",
  code: "D007",
  category: "Chicken",
  emoji: "🍗",
  image: "/images/recipes/roast-chicken-dinner.png",
  name: "Roast Chicken Dinner",

  description:
    "A traditional roast chicken dinner made with lean chicken breast, roasted potatoes and vegetables, designed to be kidney-friendly by design while keeping all the flavour of a classic Sunday roast.",

  cookingTime: "60 minutes",

  calories: "550 kcal",

  protein: "43g",

  equipment:
    "Fan oven, roasting tray, saucepan",

  ingredients: [
    {
      item: "Chicken breast",
      shoppingItem: "Chicken breast",
      quantity: "150g",
    },
    {
      item: "Floury potatoes, peeled and cut into roast-sized chunks",
      shoppingItem: "Potatoes",
      quantity: "200g",
    },
    {
      item: "Carrot, cut into batons",
      shoppingItem: "Carrot",
      quantity: "½",
    },
    {
      item: "Frozen peas",
      quantity: "37.5g",
    },
    {
      item: "Red onion, cut into wedges",
      shoppingItem: "Onion",
      quantity: "¼",
    },
    {
      item: "Olive oil",
      quantity: "1½ tsp",
    },
    {
      item: "Dried mixed herbs",
      quantity: "½ tsp",
    },
    {
      item: "Reduced-salt chicken gravy",
      quantity: "75ml",
    },
    {
      item: "Freshly ground black pepper",
      quantity: "To taste",
    },
  ],

  method: [
    "Preheat the oven to 200°C (180°C fan).",
    "Place the potatoes into a saucepan of cold water. Bring to the boil and cook for 8 minutes, then drain well and allow them to steam dry for 2 minutes.",
    "Place the potatoes into a roasting tray, drizzle with the olive oil and roast for 20 minutes.",
    "While the potatoes are roasting, season the chicken with the dried mixed herbs and freshly ground black pepper.",
    "Remove the roasting tray from the oven and add the chicken, carrots and red onion. Return to the oven and roast for a further 25–30 minutes, turning the potatoes halfway through, until the chicken is cooked through and the potatoes are crisp and golden.",
    "During the last 5 minutes of cooking, boil the frozen peas until tender and heat the reduced-salt chicken gravy according to the packet instructions.",
    "Serve the roast chicken with the potatoes, vegetables and gravy.",
  ],

  nutrition: {
    calories: "550 kcal",
    protein: "43 g",
    carbohydrates: "45 g",
    fat: "14 g",
    fibre: "6 g",
  },
  potassium: "Moderate",
  phosphate: "Moderate",
  purines: "Low",
  dietaryNote: "Potatoes, peas and gravy make this a more moderate renal-diet choice.",
},
{
  id: "honey-mustard-chicken",
  code: "D008",
  category: "Chicken",
  emoji: "🍯",
  image: "/images/recipes/honey-mustard-chicken.png",
  name: "Honey & Mustard Chicken",

  description:
    "Tender chicken breast coated in a light honey and mustard glaze, served with roasted potatoes and vegetables for a simple family dinner designed to be kidney-friendly by design.",

  cookingTime: "40 minutes",

  calories: "520 kcal",

  protein: "42g",

  equipment:
    "Fan oven, large roasting tray, mixing bowl",

  ingredients: [
    {
      item: "Chicken breast",
      shoppingItem: "Chicken breast",
      quantity: "150g",
    },
    {
      item: "Floury potatoes, cut into bite-sized chunks",
      shoppingItem: "Potatoes",
      quantity: "200g",
    },
    {
      item: "Red pepper, cut into chunks",
      shoppingItem: "Red pepper",
      quantity: "½",
    },
    {
      item: "Red onion, cut into wedges",
      shoppingItem: "Red onion",
      quantity: "¼",
    },
    {
      item: "Olive oil",
      quantity: "1½ tsp",
    },
    {
      item: "Clear honey",
      quantity: "1 tsp",
    },
    {
      item: "Dijon mustard",
      quantity: "1 tsp",
    },
    {
      item: "Dried mixed herbs",
      quantity: "½ tsp",
    },
    {
      item: "Freshly ground black pepper",
      quantity: "To taste",
    },
  ],

  method: [
    "Preheat the oven to 200°C (180°C fan).",
    "Place the potatoes into a large roasting tray, drizzle with half of the olive oil and toss to coat. Roast for 15 minutes.",
    "While the potatoes are roasting, place the chicken into a mixing bowl. Add the remaining olive oil, honey, Dijon mustard, dried mixed herbs and freshly ground black pepper. Mix until the chicken is evenly coated.",
    "Add the red pepper and red onion to the bowl and toss lightly to coat with any remaining glaze.",
    "Remove the roasting tray from the oven and add the chicken and vegetables to the potatoes, spreading everything into a single layer.",
    "Return to the oven and roast for 20–25 minutes, turning the potatoes and vegetables halfway through, until the chicken is cooked through and the potatoes are crisp and golden.",
    "Serve immediately.",
  ],

  nutrition: {
    calories: "520 kcal",
    protein: "42 g",
    carbohydrates: "43 g",
    fat: "12 g",
    fibre: "5 g",
  },
  potassium: "Moderate",
  phosphate: "Low",
  purines: "Low",
  dietaryNote: "The potato portion makes this moderate in potassium.",
},
{
  id: "homemade-beef-burgers",
  code: "D009",
  category: "Beef",
  emoji: "🍔",
  image: "/images/recipes/homemade-beef-burgers.png",
  name: "Homemade Beef Burgers",

  description:
    "Lean homemade beef burgers served in a soft white burger bun with salad and oven-baked potato wedges, designed to be kidney-friendly by design while remaining a family favourite.",

  cookingTime: "40 minutes",

  calories: "560 kcal",

  protein: "39g",

  equipment:
    "Fan oven, baking tray, frying pan or grill pan",

  ingredients: [
    {
      item: "Lean beef mince (5% fat)",
      quantity: "150g",
    },
    {
      item: "Small white burger bun",
      quantity: "1",
    },
    {
      item: "Floury potatoes, cut into wedges",
      shoppingItem: "Potatoes",
      quantity: "200g",
    },
    {
      item: "Small onion, finely diced",
      shoppingItem: "Onion",
      quantity: "¼",
    },
    {
      item: "Olive oil",
      quantity: "1½ tsp",
    },
    {
      item: "Tomato purée",
      quantity: "1 tsp",
    },
    {
      item: "Worcestershire sauce",
      quantity: "½ tsp",
    },
    {
      item: "Lettuce leaf",
      quantity: "1",
    },
    {
      item: "Tomato slices",
      shoppingItem: "Tomato",
      quantity: "2",
    },
    {
      item: "Freshly ground black pepper",
      quantity: "To taste",
    },
  ],

  method: [
    "Preheat the oven to 200°C (180°C fan).",
    "Place the potato wedges onto a baking tray, drizzle with the olive oil and toss to coat evenly. Roast for 35–40 minutes, turning halfway through, until golden and crisp.",
    "While the wedges are cooking, place the beef mince, diced onion, tomato purée, Worcestershire sauce and freshly ground black pepper into a mixing bowl. Mix gently until just combined.",
    "Shape the mixture into one burger approximately 2cm thick.",
    "Heat a frying pan or grill pan over a medium-high heat.",
    "Cook the burger for 5–6 minutes on each side, until browned and cooked all the way through.",
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
  },
  potassium: "High",
  phosphate: "Moderate",
  purines: "Moderate",
  dietaryNote: "Potato and tomato contribute potassium, while beef makes this moderate in purines.",
},
{
  id: "beef-meatballs-tomato-herb-sauce",
  code: "D010",
  category: "Beef",
  emoji: "🍝",
  image: "/images/recipes/beef-meatballs.png",
  name: "Beef Meatballs in Tomato & Herb Sauce",

  description:
    "Lean homemade beef meatballs simmered in a rich tomato and herb sauce, served with spaghetti for a simple family meal designed to be kidney-friendly by design.",

  cookingTime: "40 minutes",

  calories: "530 kcal",

  protein: "39g",

  equipment:
    "Large frying pan, saucepan, mixing bowl",

  ingredients: [
    {
      item: "Lean beef mince (5% fat)",
      quantity: "150g",
    },
    {
      item: "Dried spaghetti",
      quantity: "75g",
    },
    {
      item: "Large onion, finely diced",
      shoppingItem: "Onion",
      quantity: "¼",
    },
    {
      item: "Garlic, crushed",
      shoppingItem: "Garlic",
      quantity: "1 clove",
    },
    {
      item: "Tomato purée",
      quantity: "1½ tsp",
    },
    {
      item: "Passata",
      quantity: "100g",
    },
    {
      item: "Dried mixed herbs",
      quantity: "½ tsp",
    },
    {
      item: "Worcestershire sauce",
      quantity: "½ tsp",
    },
    {
      item: "Freshly ground black pepper",
      quantity: "To taste",
    },
  ],

  method: [
    "Bring a saucepan of water to the boil and cook the spaghetti according to the packet instructions.",
    "While the spaghetti is cooking, place the beef mince, half of the diced onion, Worcestershire sauce and freshly ground black pepper into a mixing bowl. Mix gently and shape into small meatballs.",
    "Heat a large frying pan over a medium heat and cook the meatballs for 6–8 minutes, turning regularly until browned on all sides.",
    "Add the remaining onion and cook for 3–4 minutes until softened.",
    "Stir in the garlic and cook for 30 seconds.",
    "Add the tomato purée and cook for 1 minute, stirring continuously.",
    "Pour in the passata and stir in the dried mixed herbs. Bring to a gentle simmer.",
    "Simmer for 10–12 minutes, stirring occasionally until the meatballs are cooked through and the sauce has thickened.",
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
  },
  potassium: "Moderate",
  phosphate: "Low",
  purines: "Moderate",
  dietaryNote: "Beef makes this moderate in purines; the tomato base also raises potassium.",
},
{
  id: "chilli-con-carne",
  code: "D011",
  category: "Beef",
  emoji: "🌶️",
  image: "/images/recipes/chilli-con-carne.png",
  name: "Chilli Con Carne",

  description:
    "A mild chilli made with lean beef, tomatoes and peppers, served with basmati rice for a hearty family meal designed to be kidney-friendly by design.",

  cookingTime: "40 minutes",

  calories: "530 kcal",

  protein: "39g",

  equipment:
    "Large frying pan, saucepan",

  ingredients: [
    {
      item: "Lean beef mince (5% fat)",
      quantity: "150g",
    },
    {
      item: "Dry basmati rice",
      quantity: "75g",
    },
    {
      item: "Large onion, diced",
      shoppingItem: "Onion",
      quantity: "¼",
    },
    {
      item: "Red pepper, diced",
      shoppingItem: "Red pepper",
      quantity: "½",
    },
    {
      item: "Garlic, crushed",
      shoppingItem: "Garlic",
      quantity: "1 clove",
    },
    {
      item: "Tomato purée",
      quantity: "1½ tsp",
    },
    {
      item: "Passata",
      quantity: "100g",
    },
    {
      item: "Mild chilli seasoning",
      quantity: "1 tsp",
    },
    {
      item: "Freshly ground black pepper",
      quantity: "To taste",
    },
  ],

  method: [
    "Bring a saucepan of water to the boil and cook the basmati rice according to the packet instructions.",
    "While the rice is cooking, heat a large frying pan over a medium heat.",
    "Add the beef mince and onion and cook for 5–6 minutes, breaking up the mince with a wooden spoon until browned.",
    "Stir in the red pepper and cook for 3 minutes until beginning to soften.",
    "Add the garlic and cook for 30 seconds.",
    "Stir in the tomato purée and cook for 1 minute, stirring continuously.",
    "Add the passata and the mild chilli seasoning, stirring well to combine.",
    "Simmer for 12–15 minutes, stirring occasionally until the sauce has thickened and the beef is fully cooked.",
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
  },
  potassium: "Moderate",
  phosphate: "Moderate",
  purines: "Moderate",
  dietaryNote: "Beef and tomato make this a more moderate renal-diet choice.",
},{
  id: "sausage-mash-onion-gravy",
  code: "D012",
  category: "Pork",
  emoji: "🌭",
  image: "/images/recipes/sausage-mash-onion-gravy.png",
  name: "Sausage & Mash with Onion Gravy",

  description:
    "A comforting family favourite made with quality pork sausages, creamy mashed potato and rich onion gravy, designed to be kidney-friendly by design.",

  cookingTime: "45 minutes",

  calories: "560 kcal",

  protein: "28g",

  equipment:
    "Fan oven, saucepan, small saucepan",

  ingredients: [
    {
      item: "Quality pork sausages",
      quantity: "2 (approximately 120g total)",
    },
    {
      item: "Floury potatoes, peeled and chopped",
      shoppingItem: "Potatoes",
      quantity: "200g",
    },
    {
      item: "Large onion, thinly sliced",
      quantity: "¼",
    },
    {
      item: "Frozen peas",
      quantity: "37.5g",
    },
    {
      item: "Butter",
      quantity: "5g",
    },
    {
      item: "Semi-skimmed milk",
      quantity: "15ml",
    },
    {
      item: "Reduced-salt onion gravy",
      quantity: "75ml",
    },
    {
      item: "Freshly ground black pepper",
      quantity: "To taste",
    },
  ],

  method: [
    "Preheat the oven to 200°C (180°C fan).",
    "Place the sausages onto a baking tray and cook for 25–30 minutes, turning halfway through, until browned and cooked through.",
    "While the sausages are cooking, place the potatoes into a saucepan of cold water. Bring to the boil and cook for 18–20 minutes until tender.",
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
  },
  potassium: "High",
  phosphate: "High",
  purines: "Moderate",
  dietaryNote: "⚠️ Higher in potassium and phosphate because of the potato and processed sausages; best treated as an occasional meal.",
},
{
  id: "salmon-lemon-herbs",
  code: "D013",
  category: "Fish",
  emoji: "🐟",
  image: "/images/recipes/salmon-lemon-herbs.png",
  name: "Salmon with Lemon & Herbs",

  description:
    "Oven-baked salmon fillet served with roasted potatoes and vegetables, finished with lemon and herbs for a light family dinner designed to be kidney-friendly by design.",

  cookingTime: "40 minutes",

  calories: "540 kcal",

  protein: "35g",

  equipment:
    "Fan oven, large roasting tray",

  ingredients: [
    {
      item: "Salmon fillet",
      quantity: "150g",
    },
    {
      item: "Floury potatoes, cut into bite-sized chunks",
      shoppingItem: "Potatoes",
      quantity: "200g",
    },
    {
      item: "Red pepper, cut into chunks",
      shoppingItem: "Red pepper",
      quantity: "½",
    },
    {
      item: "Red onion, cut into wedges",
      quantity: "¼",
    },
    {
      item: "Olive oil",
      quantity: "1½ tsp",
    },
    {
      item: "Lemon juice",
      shoppingItem: "Lemon",
      quantity: "¼",
    },
    {
      item: "Lemon zest",
      shoppingItem: "Lemon",
      quantity: "¼",
    },
    {
      item: "Dried mixed herbs",
      quantity: "½ tsp",
    },
    {
      item: "Freshly ground black pepper",
      quantity: "To taste",
    },
  ],

  method: [
    "Preheat the oven to 200°C (180°C fan).",
    "Place the potatoes into a large roasting tray, drizzle with half of the olive oil and toss to coat evenly. Roast for 15 minutes.",
    "While the potatoes are roasting, place the salmon into a bowl. Add the remaining olive oil, lemon juice, lemon zest, dried mixed herbs and freshly ground black pepper. Coat the salmon evenly.",
    "Remove the roasting tray from the oven and add the red pepper and red onion. Place the salmon on top or alongside the vegetables.",
    "Return the tray to the oven and roast for 18–20 minutes, until the salmon flakes easily with a fork and the potatoes are golden.",
    "Serve immediately.",
  ],

  nutrition: {
    calories: "540 kcal",
    protein: "35 g",
    carbohydrates: "42 g",
    fat: "20 g",
    fibre: "5 g",
  },
  potassium: "Moderate",
  phosphate: "Low",
  purines: "Moderate",
  dietaryNote: "⚠️ Salmon is relatively higher in purines than chicken, so enjoy as part of a balanced rotation.",
},
{
  id: "tuna-pasta-bake",
  code: "D014",
  category: "Fish",
  emoji: "🐟",
  image: "/images/recipes/tuna-pasta-bake.png",
  name: "Tuna Pasta Bake",

  description:
    "A comforting tuna pasta bake with a light tomato sauce, designed to be kidney-friendly by design while using simple everyday ingredients.",

  cookingTime: "40 minutes",

  calories: "520 kcal",

  protein: "36g",

  equipment:
    "Saucepan, large frying pan, ovenproof dish",

  ingredients: [
    {
      item: "Dried penne pasta",
      shoppingItem: "Pasta",
      quantity: "75g",
    },
    {
      item: "Tuna in spring water, drained",
      shoppingItem: "Tuna",
      quantity: "100g",
    },
    {
      item: "Large onion, finely diced",
      quantity: "¼",
    },
    {
      item: "Red pepper, diced",
      shoppingItem: "Red pepper",
      quantity: "½",
    },
    {
      item: "Garlic, crushed",
      shoppingItem: "Garlic",
      quantity: "1 clove",
    },
    {
      item: "Tomato purée",
      quantity: "1½ tsp",
    },
    {
      item: "Passata",
      quantity: "100g",
    },
    {
      item: "Dried mixed herbs",
      quantity: "½ tsp",
    },
    {
      item: "Reduced-fat Cheddar cheese, grated",
      quantity: "15g",
    },
    {
      item: "Freshly ground black pepper",
      quantity: "To taste",
    },
  ],

  method: [
    "Preheat the oven to 200°C (180°C fan).",
    "Bring a saucepan of water to the boil and cook the penne according to the packet instructions until just al dente.",
    "While the pasta is cooking, heat a large frying pan over a medium heat. Add the onion and cook for 4–5 minutes until softened.",
    "Stir in the garlic and red pepper and cook for 2 minutes.",
    "Add the tomato purée and cook for 1 minute, stirring continuously.",
    "Pour in the passata and stir in the dried mixed herbs. Simmer for 5 minutes.",
    "Fold the drained tuna into the sauce and heat gently for 2 minutes.",
    "Drain the pasta and stir it into the sauce until evenly coated.",
    "Transfer the mixture to an ovenproof dish and sprinkle with the grated reduced-fat Cheddar.",
    "Bake for 12–15 minutes, until the cheese has melted and turned lightly golden.",
    "Finish with freshly ground black pepper and serve immediately.",
  ],

  nutrition: {
    calories: "520 kcal",
    protein: "36 g",
    carbohydrates: "46 g",
    fat: "11 g",
    fibre: "5 g",
  },
  potassium: "Low",
  phosphate: "Moderate",
  purines: "Moderate",
  dietaryNote: "⚠️ Tuna and cheese contribute more phosphate; fish is also relatively higher in purines.",
},
{
  id: "mediterranean-chicken",
  code: "D015",
  category: "Chicken",
  emoji: "🍅",
  image: "/images/recipes/mediterranean-chicken.png",
  name: "Mediterranean Chicken",

  description:
    "A colourful one-pan chicken dish with Mediterranean vegetables and herbs, served with basmati rice for a fresh, family-friendly dinner designed to be kidney-friendly by design.",

  cookingTime: "35 minutes",

  calories: "515 kcal",

  protein: "41g",

  equipment:
    "Large frying pan, saucepan",

  ingredients: [
    {
      item: "Chicken breast, diced",
      shoppingItem: "Chicken breast",
      quantity: "150g",
    },
    {
      item: "Dry basmati rice",
      quantity: "75g",
    },
    {
      item: "Large red onion, diced",
      shoppingItem: "Red onion",
      quantity: "¼",
    },
    {
      item: "Red pepper, diced",
      shoppingItem: "Red pepper",
      quantity: "½",
    },
    {
      item: "Garlic, crushed",
      shoppingItem: "Garlic",
      quantity: "1 clove",
    },
    {
      item: "Passata",
      quantity: "100g",
    },
    {
      item: "Tomato purée",
      quantity: "1½ tsp",
    },
    {
      item: "Dried mixed herbs",
      quantity: "½ tsp",
    },
    {
      item: "Olive oil",
      quantity: "1½ tsp",
    },
    {
      item: "Freshly ground black pepper",
      quantity: "To taste",
    },
  ],

  method: [
    "Bring a saucepan of water to the boil and cook the basmati rice according to the packet instructions.",
    "While the rice is cooking, heat the olive oil in a large frying pan over a medium heat.",
    "Add the diced chicken and cook for 5–6 minutes, stirring regularly until lightly browned.",
    "Add the red onion and cook for 4–5 minutes until softened.",
    "Stir in the garlic and red pepper and cook for a further 2 minutes.",
    "Add the tomato purée and cook for 1 minute, stirring continuously.",
    "Pour in the passata and stir in the dried mixed herbs.",
    "Simmer for 8–10 minutes, stirring occasionally until the chicken is cooked through and the sauce has thickened.",
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
  },
  potassium: "Moderate",
  phosphate: "Low",
  purines: "Low",
  dietaryNote: "The tomato-based sauce makes this moderate in potassium.",
},

  {
    id: "lemon-herb-chicken-couscous",
    code: "D016",
    category: "Chicken",
    emoji: "🍋",
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
      { item: "Chicken breast, skinless", shoppingItem: "Chicken breast", quantity: "4 × 150g" },
      { item: "Couscous", shoppingItem: "Couscous", quantity: "300g" },
      { item: "Red pepper, diced", shoppingItem: "Red pepper", quantity: "1 medium" },
      { item: "Courgette, diced", shoppingItem: "Courgette", quantity: "1 small" },
      { item: "Onion, sliced", shoppingItem: "Onion", quantity: "1 small" },
      { item: "Lemon, zest and juice", shoppingItem: "Lemon", quantity: "1" },
      { item: "Olive oil", quantity: "3 tbsp" },
      { item: "Dried oregano", quantity: "1 tsp" },
      { item: "Dried parsley", quantity: "1 tsp" },
      { item: "Garlic granules", quantity: "½ tsp" },
      { item: "Black pepper", quantity: "½ tsp" },
      { item: "Fresh parsley", quantity: "Small handful" },
      { item: "No added salt", quantity: "As required" },
    ],
    method: [
      "Put the couscous into a large bowl and pour over 300ml boiling water. Cover and leave for 5 minutes.",
      "Fluff the couscous with a fork and stir through 1½ tbsp of the olive oil, the lemon zest, half the lemon juice and the dried herbs.",
      "Heat the remaining olive oil in a large frying pan over a medium heat.",
      "Season the chicken with black pepper and garlic granules. Cook for around 6–7 minutes per side, until cooked through and lightly browned.",
      "Remove the chicken from the pan and keep warm.",
      "Add the onion, red pepper and courgette to the pan. Cook for 5–6 minutes until softened.",
      "Return the chicken to the pan and add the remaining lemon juice.",
      "Serve the chicken with the couscous and vegetables, topped with fresh parsley.",
    ],
    nutrition: {
      calories: "640 kcal",
      protein: "47 g",
      carbohydrates: "65 g",
      fat: "21 g",
      fibre: "5 g",
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
    category: "Chicken",
    emoji: "🍯",
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
      { item: "Chicken breast, skinless", shoppingItem: "Chicken breast", quantity: "4 × 140g" },
      { item: "Dry white basmati rice", shoppingItem: "Rice", quantity: "260g" },
      { item: "Red pepper, sliced", shoppingItem: "Red pepper", quantity: "1 medium" },
      { item: "Green beans, trimmed", shoppingItem: "Green beans", quantity: "150g" },
      { item: "Onion, thinly sliced", shoppingItem: "Onion", quantity: "1 small" },
      { item: "Honey", quantity: "4 tbsp" },
      { item: "Olive oil", quantity: "4 tbsp" },
      { item: "Garlic, crushed", shoppingItem: "Garlic", quantity: "2 cloves" },
      { item: "Lemon juice", shoppingItem: "Lemon", quantity: "1 tbsp" },
      { item: "Cornflour", quantity: "1 tsp" },
      { item: "Water", quantity: "100ml" },
      { item: "Black pepper", quantity: "To taste" },
      { item: "No added salt", quantity: "As required" },
    ],
    method: [
      "Cook the basmati rice according to the packet instructions.",
      "Mix the honey, lemon juice, cornflour and 100ml water in a small jug.",
      "Heat the olive oil in a large frying pan over a medium heat.",
      "Season the chicken with black pepper and cook for 5–6 minutes per side, until lightly browned and cooked through.",
      "Remove the chicken from the pan and keep warm.",
      "Add the onion and red pepper to the pan and cook for 4–5 minutes until softened.",
      "Add the garlic and cook for 30 seconds.",
      "Pour in the honey mixture and stir until the sauce thickens.",
      "Return the chicken to the pan and turn it in the glaze for 2–3 minutes.",
      "Meanwhile, steam or boil the green beans until tender but still slightly crisp.",
      "Drain the rice and serve with the honey garlic chicken and green beans.",
    ],
    nutrition: {
      calories: "680 kcal",
      protein: "47 g",
      carbohydrates: "75 g",
      fat: "25 g",
      fibre: "3 g",
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
    category: "Chicken",
    emoji: "🍛",
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
      { item: "Chicken breast, skinless", shoppingItem: "Chicken breast", quantity: "4 × 150g" },
      { item: "Dry white basmati rice", shoppingItem: "Rice", quantity: "280g" },
      { item: "Red pepper, sliced", shoppingItem: "Red pepper", quantity: "1 medium" },
      { item: "Onion, sliced", shoppingItem: "Onion", quantity: "1 small" },
      { item: "Courgette, sliced", shoppingItem: "Courgette", quantity: "1 small" },
      { item: "Plain natural yoghurt", quantity: "150g" },
      { item: "Olive oil", quantity: "2 tbsp" },
      { item: "Lemon juice", shoppingItem: "Lemon", quantity: "1 tbsp" },
      { item: "Mild curry powder", quantity: "2 tsp" },
      { item: "Ground cumin", quantity: "1 tsp" },
      { item: "Paprika", quantity: "1 tsp" },
      { item: "Turmeric", quantity: "½ tsp" },
      { item: "Garlic granules", quantity: "½ tsp" },
      { item: "Ground ginger", quantity: "½ tsp" },
      { item: "Black pepper", quantity: "To taste" },
      { item: "Fresh parsley", quantity: "Small handful" },
      { item: "No added salt", quantity: "As required" },
    ],
    method: [
      "Cut the chicken into bite-sized pieces and place in a bowl.",
      "Mix the yoghurt, lemon juice, curry powder, cumin, paprika, turmeric, garlic granules and ginger.",
      "Stir the chicken into the marinade and leave for at least 15 minutes.",
      "Cook the basmati rice according to the packet instructions.",
      "Heat 1 tbsp of the olive oil in a large frying pan and cook the onion, pepper and courgette for 5–6 minutes. Remove and keep warm.",
      "Add the remaining oil to the pan and cook the marinated chicken for 8–10 minutes, turning regularly, until completely cooked through.",
      "Return the vegetables to the pan and cook together for another 2 minutes.",
      "Serve the chicken and vegetables with the basmati rice and sprinkle with fresh parsley.",
    ],
    nutrition: {
      calories: "650 kcal",
      protein: "50 g",
      carbohydrates: "72 g",
      fat: "19 g",
      fibre: "4 g",
    },
    potassium: "Moderate",
    phosphate: "Moderate",
    purines: "Moderate",
    dietaryNote:
      "Chicken and yoghurt contribute phosphate, while chicken contributes purines. White basmati rice provides the main carbohydrate without a large potassium contribution.",
  },
  {
    id: "chicken-pesto-pasta",
    code: "D019",
    category: "Chicken",
    emoji: "🍝",
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
      { item: "Chicken breast, skinless", shoppingItem: "Chicken breast", quantity: "4 × 140g" },
      { item: "Dried penne pasta", shoppingItem: "Pasta", quantity: "300g" },
      { item: "Red pepper, sliced", shoppingItem: "Red pepper", quantity: "1 medium" },
      { item: "Courgette, sliced", shoppingItem: "Courgette", quantity: "1 small" },
      { item: "Onion, sliced", shoppingItem: "Onion", quantity: "1 small" },
      { item: "Fresh basil pesto", quantity: "4 tbsp" },
      { item: "Olive oil", quantity: "2 tbsp" },
      { item: "Lemon juice", shoppingItem: "Lemon", quantity: "½ lemon" },
      { item: "Dried oregano", quantity: "1 tsp" },
      { item: "Garlic granules", quantity: "½ tsp" },
      { item: "Black pepper", quantity: "To taste" },
      { item: "Fresh basil or parsley", quantity: "Small handful" },
      { item: "No added salt", quantity: "As required" },
    ],
    method: [
      "Cook the pasta according to the packet instructions until just tender. Reserve a small cup of the cooking water, then drain.",
      "Cut the chicken into bite-sized pieces and season with black pepper, oregano and garlic granules.",
      "Heat 1 tbsp of the olive oil in a large frying pan and cook the chicken for 7–8 minutes, turning regularly, until completely cooked through.",
      "Remove the chicken and keep warm.",
      "Add the remaining olive oil, onion, pepper and courgette to the pan. Cook for 5–6 minutes until softened.",
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
    category: "Beef",
    emoji: "🥩",
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
      { item: "Lean beef steak, cut into thin strips", shoppingItem: "Beef steak", quantity: "500g" },
      { item: "Dried penne pasta", shoppingItem: "Pasta", quantity: "300g" },
      { item: "Mushrooms, sliced", shoppingItem: "Mushrooms", quantity: "150g" },
      { item: "Onion, thinly sliced", shoppingItem: "Onion", quantity: "1 medium" },
      { item: "Half-fat crème fraîche", quantity: "150ml" },
      { item: "Olive oil", quantity: "2 tbsp" },
      { item: "Paprika", quantity: "1 tsp" },
      { item: "Dijon mustard", quantity: "1 tsp" },
      { item: "Garlic granules", quantity: "1 tsp" },
      { item: "Dried parsley", quantity: "1 tsp" },
      { item: "Water", quantity: "100ml" },
      { item: "Lemon juice", shoppingItem: "Lemon", quantity: "1 tbsp" },
      { item: "Black pepper", quantity: "To taste" },
      { item: "Fresh parsley", quantity: "Small handful" },
      { item: "No added salt", quantity: "As required" },
    ],
    method: [
      "Cook the pasta according to the packet instructions until just tender. Reserve a little cooking water, then drain.",
      "Heat 1 tbsp olive oil in a large frying pan over a high heat.",
      "Add the beef strips and cook for 2–3 minutes, stirring regularly, until browned. Remove from the pan and keep warm.",
      "Reduce the heat and add the remaining olive oil.",
      "Add the onion and mushrooms and cook for 5–6 minutes until softened.",
      "Stir in the paprika and garlic granules and cook for 30 seconds.",
      "Add the water and Dijon mustard and stir well, scraping any browned pieces from the bottom of the pan.",
      "Reduce the heat and stir in the crème fraîche.",
      "Return the beef to the pan and cook gently for 2–3 minutes. Do not boil the sauce.",
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
    category: "Beef",
    emoji: "🥙",
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
      { item: "Lean beef mince", shoppingItem: "Beef mince", quantity: "500g" },
      { item: "Couscous", shoppingItem: "Couscous", quantity: "280g" },
      { item: "Red pepper, sliced", shoppingItem: "Red pepper", quantity: "1 medium" },
      { item: "Courgette, sliced", shoppingItem: "Courgette", quantity: "1 small" },
      { item: "Onion, finely chopped", shoppingItem: "Onion", quantity: "1 small" },
      { item: "Olive oil", quantity: "3 tbsp" },
      { item: "Ground cumin", quantity: "1 tsp" },
      { item: "Paprika", quantity: "1 tsp" },
      { item: "Dried oregano", quantity: "1 tsp" },
      { item: "Garlic granules", quantity: "½ tsp" },
      { item: "Lemon juice", shoppingItem: "Lemon", quantity: "½ lemon" },
      { item: "Fresh parsley", quantity: "Small handful" },
      { item: "Black pepper", quantity: "To taste" },
      { item: "No added salt", quantity: "As required" },
    ],
    method: [
      "Put the beef mince into a large bowl and add half the onion, cumin, paprika, oregano, garlic granules and black pepper.",
      "Mix thoroughly, then shape the mixture into about 12 small kofta.",
      "Put the couscous into a large bowl and pour over 280ml boiling water. Cover and leave for 5 minutes.",
      "Fluff the couscous with a fork and stir through 1 tbsp olive oil, the lemon juice and half the fresh parsley.",
      "Heat 1 tbsp olive oil in a large frying pan over a medium heat.",
      "Add the kofta and cook for 10–12 minutes, turning regularly, until browned and completely cooked through.",
      "Remove the kofta and keep warm.",
      "Add the remaining olive oil, onion, red pepper and courgette to the pan. Cook for 5–6 minutes until softened.",
      "Serve the kofta with the couscous and vegetables, finished with the remaining fresh parsley.",
    ],
    nutrition: {
      calories: "660 kcal",
      protein: "43 g",
      carbohydrates: "63 g",
      fat: "27 g",
      fibre: "5 g",
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
    category: "Beef",
    emoji: "🥩",
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
      { item: "Lean sirloin steaks", shoppingItem: "Sirloin steak", quantity: "4 × 150g" },
      { item: "Potatoes", shoppingItem: "Potatoes", quantity: "800g" },
      { item: "Green beans", shoppingItem: "Green beans", quantity: "200g" },
      { item: "Olive oil", quantity: "3 tbsp" },
      { item: "Dried rosemary", quantity: "1 tsp" },
      { item: "Dried parsley", quantity: "1 tsp" },
      { item: "Garlic granules", quantity: "½ tsp" },
      { item: "Black pepper", quantity: "To taste" },
      { item: "Lemon juice", shoppingItem: "Lemon", quantity: "½ lemon" },
      { item: "No added salt", quantity: "As required" },
    ],
    method: [
      "Peel the potatoes and cut them into chunky chips.",
      "Put the chips into a saucepan of cold water, bring to the boil and simmer for 5 minutes.",
      "Drain the potatoes thoroughly and leave them to steam dry for a few minutes.",
      "Heat 2 tbsp olive oil in a large frying pan and cook the chips over a medium heat for 15–20 minutes, turning regularly, until golden and cooked through.",
      "Meanwhile, trim the green beans and steam or boil them for 5–6 minutes until tender but still slightly crisp.",
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
    category: "Pork",
    emoji: "🍎",
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
      { item: "Lean pork loin steaks", shoppingItem: "Pork loin steaks", quantity: "4 × 150g" },
      { item: "Potatoes", shoppingItem: "Potatoes", quantity: "700g" },
      { item: "Eating apples", shoppingItem: "Apples", quantity: "2 medium" },
      { item: "Green beans", shoppingItem: "Green beans", quantity: "200g" },
      { item: "Onion, sliced", shoppingItem: "Onion", quantity: "1 medium" },
      { item: "Olive oil", quantity: "3 tbsp" },
      { item: "Dried sage", quantity: "1 tsp" },
      { item: "Dried parsley", quantity: "1 tsp" },
      { item: "Lemon juice", shoppingItem: "Lemon", quantity: "1 tbsp" },
      { item: "Black pepper", quantity: "To taste" },
      { item: "No added salt", quantity: "As required" },
    ],
    method: [
      "Peel and cut the potatoes into even chunks. Boil for 12–15 minutes until tender.",
      "Drain and allow them to steam dry for a few minutes.",
      "Heat 1 tbsp olive oil in a large frying pan. Season the pork with black pepper and sage and cook for 4–5 minutes per side, until cooked through. Remove and keep warm.",
      "Add the remaining oil and the sliced onion to the pan. Cook for 3–4 minutes until softened.",
      "Core and slice the apples, then add them to the pan with the lemon juice. Cook for 3–4 minutes until just softened but still holding their shape.",
      "Meanwhile, steam or boil the green beans for 5–6 minutes.",
      "Return the pork to the pan for 1–2 minutes to warm through.",
      "Toss the potatoes with dried parsley and serve with the pork, apple and green beans.",
    ],
    nutrition: {
      calories: "650 kcal",
      protein: "42 g",
      carbohydrates: "60 g",
      fat: "25 g",
      fibre: "6 g",
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
    category: "Pork",
    emoji: "🥢",
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
      { item: "Lean pork loin, cut into thin strips", shoppingItem: "Pork loin", quantity: "500g" },
      { item: "Dry white basmati rice", shoppingItem: "Rice", quantity: "280g" },
      { item: "Red pepper, sliced", shoppingItem: "Red pepper", quantity: "1 medium" },
      { item: "Courgette, sliced", shoppingItem: "Courgette", quantity: "1 small" },
      { item: "Onion, sliced", shoppingItem: "Onion", quantity: "1 small" },
      { item: "Green beans, trimmed", shoppingItem: "Green beans", quantity: "150g" },
      { item: "Olive oil", quantity: "3 tbsp" },
      { item: "Garlic, crushed", shoppingItem: "Garlic", quantity: "2 cloves" },
      { item: "Ground ginger", quantity: "1 tsp" },
      { item: "Honey", quantity: "1 tbsp" },
      { item: "Lemon juice", shoppingItem: "Lemon", quantity: "1 tbsp" },
      { item: "Water", quantity: "100ml" },
      { item: "Cornflour", quantity: "1 tsp" },
      { item: "Paprika", quantity: "½ tsp" },
      { item: "Black pepper", quantity: "To taste" },
      { item: "No added salt", quantity: "As required" },
    ],
    method: [
      "Cook the basmati rice according to the packet instructions.",
      "Mix the water, honey, lemon juice and cornflour in a small jug.",
      "Heat 1½ tbsp olive oil in a large frying pan or wok over a high heat.",
      "Add the pork and stir-fry for 5–6 minutes until browned and cooked through. Remove and keep warm.",
      "Add the remaining oil, onion, pepper, courgette and green beans to the pan.",
      "Stir-fry the vegetables for 5–6 minutes until cooked but still slightly crisp.",
      "Add the garlic, ginger and paprika and cook for 30 seconds.",
      "Return the pork to the pan.",
      "Pour in the honey and lemon mixture and stir for 2–3 minutes until the sauce lightly thickens.",
      "Serve immediately with the basmati rice.",
    ],
    nutrition: {
      calories: "650 kcal",
      protein: "42 g",
      carbohydrates: "70 g",
      fat: "23 g",
      fibre: "5 g",
    },
    potassium: "Moderate",
    phosphate: "Moderate",
    purines: "Moderate",
    dietaryNote:
      "Pork contributes phosphate and purines. White rice provides the main carbohydrate, while avoiding soy sauce keeps the dish lower in added salt.",
  },
  {
    id: "sausage-tomato-pasta",
    code: "D025",
    category: "Pork",
    emoji: "🌭",
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
      { item: "Good-quality pork sausages", shoppingItem: "Pork sausages", quantity: "8" },
      { item: "Dried penne pasta", shoppingItem: "Pasta", quantity: "300g" },
      { item: "Red pepper, diced", shoppingItem: "Red pepper", quantity: "1 medium" },
      { item: "Onion, finely sliced", shoppingItem: "Onion", quantity: "1 small" },
      { item: "Courgette, diced", shoppingItem: "Courgette", quantity: "150g" },
      { item: "Chopped tomatoes", quantity: "200g" },
      { item: "Olive oil", quantity: "2 tbsp" },
      { item: "Garlic, crushed", shoppingItem: "Garlic", quantity: "2 cloves" },
      { item: "Dried oregano", quantity: "1 tsp" },
      { item: "Dried basil", quantity: "1 tsp" },
      { item: "Paprika", quantity: "1 tsp" },
      { item: "Water", quantity: "100ml" },
      { item: "Black pepper", quantity: "To taste" },
      { item: "Fresh parsley", quantity: "Small handful" },
      { item: "No added salt", quantity: "As required" },
    ],
    method: [
      "Remove the skins from the sausages and break the meat into small pieces.",
      "Cook the pasta according to the packet instructions until just tender. Drain and set aside.",
      "Heat 1 tbsp olive oil in a large frying pan.",
      "Add the sausage meat and cook for 6–8 minutes, breaking it up as it cooks, until browned and cooked through.",
      "Remove the sausage from the pan and set aside.",
      "Add the remaining olive oil, onion, pepper and courgette and cook for 5–6 minutes.",
      "Add the garlic, oregano, basil and paprika and cook for 30 seconds.",
      "Stir in the chopped tomatoes and water and simmer for 5 minutes.",
      "Return the sausage meat to the pan and simmer for another 3–4 minutes.",
      "Stir through the cooked pasta and heat for 1–2 minutes.",
      "Season with black pepper and finish with fresh parsley.",
    ],
    nutrition: {
      calories: "650 kcal",
      protein: "32 g",
      carbohydrates: "68 g",
      fat: "29 g",
      fibre: "6 g",
    },
    potassium: "Moderate",
    phosphate: "High",
    purines: "High",
    dietaryNote:
      "Sausages can contain considerable salt and phosphate additives, so choose a good-quality product and check the ingredient label.",
  },
  {
    id: "cod-herby-potatoes-green-beans",
    code: "D026",
    category: "Fish",
    emoji: "🐟",
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
      { item: "Cod fillets", shoppingItem: "Cod fillets", quantity: "4 × 170g" },
      { item: "Potatoes", shoppingItem: "Potatoes", quantity: "800g" },
      { item: "Green beans", shoppingItem: "Green beans", quantity: "250g" },
      { item: "Olive oil", quantity: "4 tbsp" },
      { item: "Lemon juice", shoppingItem: "Lemon", quantity: "½ lemon" },
      { item: "Dried parsley", quantity: "1 tsp" },
      { item: "Dried dill", quantity: "1 tsp" },
      { item: "Garlic granules", quantity: "½ tsp" },
      { item: "Black pepper", quantity: "To taste" },
      { item: "Fresh parsley", quantity: "Small handful" },
      { item: "No added salt", quantity: "As required" },
    ],
    method: [
      "Peel the potatoes and cut them into even chunks.",
      "Place them in a saucepan of cold water, bring to the boil and cook for 12–15 minutes until tender.",
      "Drain the potatoes and allow them to steam dry.",
      "Heat 2 tbsp olive oil in a large frying pan over a medium heat.",
      "Season the cod with black pepper, garlic granules and dried dill.",
      "Place the cod in the pan and cook for 4–5 minutes on each side, until opaque and cooked through.",
      "Remove the cod and keep warm.",
      "Add the remaining olive oil to the pan and gently toss the potatoes with the dried parsley and lemon juice for 3–4 minutes.",
      "Meanwhile, steam or boil the green beans for 5–6 minutes until tender but still slightly crisp.",
      "Serve the cod with the herby potatoes and green beans, finished with fresh parsley.",
    ],
    nutrition: {
      calories: "650 kcal",
      protein: "43 g",
      carbohydrates: "55 g",
      fat: "31 g",
      fibre: "7 g",
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
    category: "Fish",
    emoji: "🐟",
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
      { item: "Cod fillets", shoppingItem: "Cod fillets", quantity: "4 × 170g" },
      { item: "Couscous", shoppingItem: "Couscous", quantity: "300g" },
      { item: "Red pepper, sliced", shoppingItem: "Red pepper", quantity: "1 medium" },
      { item: "Courgette, sliced", shoppingItem: "Courgette", quantity: "1 small" },
      { item: "Onion, sliced", shoppingItem: "Onion", quantity: "1 small" },
      { item: "Olive oil", quantity: "3 tbsp" },
      { item: "Lemon juice", shoppingItem: "Lemon", quantity: "½ lemon" },
      { item: "Dried oregano", quantity: "1 tsp" },
      { item: "Dried parsley", quantity: "1 tsp" },
      { item: "Garlic granules", quantity: "½ tsp" },
      { item: "Water", quantity: "100ml" },
      { item: "Black pepper", quantity: "To taste" },
      { item: "Fresh parsley", quantity: "Small handful" },
      { item: "No added salt", quantity: "As required" },
    ],
    method: [
      "Put the couscous into a large bowl and pour over 300ml boiling water. Cover and leave for 5 minutes.",
      "Fluff the couscous with a fork and stir through 1 tbsp olive oil, lemon juice and the dried herbs.",
      "Heat 1 tbsp olive oil in a large frying pan.",
      "Add the onion, pepper and courgette and cook for 5–6 minutes until softened.",
      "Remove the vegetables and keep warm.",
      "Add the remaining oil to the pan and season the cod with black pepper, garlic granules and oregano.",
      "Cook the cod for 4–5 minutes on each side until completely cooked through.",
      "Return the vegetables to the pan and add 100ml water.",
      "Simmer gently for 2 minutes to bring everything together.",
      "Serve the cod with the couscous and vegetables, finished with fresh parsley.",
    ],
    nutrition: {
      calories: "640 kcal",
      protein: "43 g",
      carbohydrates: "65 g",
      fat: "27 g",
      fibre: "5 g",
    },
    potassium: "Moderate",
    phosphate: "Moderate",
    purines: "Moderate",
    dietaryNote:
      "Cod contributes phosphate and purines, while the vegetables provide potassium. The recipe avoids processed sauces and stock cubes.",
  },
  {
    id: "cod-tomato-rice",
    code: "D028",
    category: "Fish",
    emoji: "🐟",
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
      { item: "Cod fillets", shoppingItem: "Cod fillets", quantity: "4 × 170g" },
      { item: "Dry white basmati rice", shoppingItem: "Rice", quantity: "280g" },
      { item: "Chopped tomatoes", quantity: "200g" },
      { item: "Red pepper, diced", shoppingItem: "Red pepper", quantity: "1 medium" },
      { item: "Onion, finely sliced", shoppingItem: "Onion", quantity: "1 small" },
      { item: "Courgette, diced", shoppingItem: "Courgette", quantity: "1 small" },
      { item: "Olive oil", quantity: "3 tbsp" },
      { item: "Garlic, crushed", shoppingItem: "Garlic", quantity: "2 cloves" },
      { item: "Dried oregano", quantity: "1 tsp" },
      { item: "Dried parsley", quantity: "1 tsp" },
      { item: "Paprika", quantity: "½ tsp" },
      { item: "Water", quantity: "150ml" },
      { item: "Lemon juice", shoppingItem: "Lemon", quantity: "1 tbsp" },
      { item: "Black pepper", quantity: "To taste" },
      { item: "Fresh parsley", quantity: "Small handful" },
      { item: "No added salt", quantity: "As required" },
    ],
    method: [
      "Heat 1 tbsp olive oil in a large frying pan and gently cook the onion, pepper and courgette for 5–6 minutes.",
      "Add the garlic, oregano, parsley and paprika and cook for 30 seconds.",
      "Stir in the chopped tomatoes and water.",
      "Add the rice and stir well.",
      "Bring to a gentle simmer, cover and cook according to the rice packet instructions, stirring occasionally.",
      "Season the cod with black pepper.",
      "When the rice is nearly cooked, place the cod fillets on top.",
      "Cover and cook for around 8–10 minutes, until the cod is completely cooked through and flakes easily.",
      "Drizzle over the lemon juice and remaining olive oil.",
      "Finish with fresh parsley and serve.",
    ],
    nutrition: {
      calories: "650 kcal",
      protein: "43 g",
      carbohydrates: "70 g",
      fat: "25 g",
      fibre: "5 g",
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
    category: "Vegetarian",
    emoji: "🌱",
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
      { item: "Couscous", shoppingItem: "Couscous", quantity: "300g" },
      { item: "Red pepper, diced", shoppingItem: "Red pepper", quantity: "1 medium" },
      { item: "Yellow pepper, diced", shoppingItem: "Yellow pepper", quantity: "1 medium" },
      { item: "Courgette, diced", shoppingItem: "Courgette", quantity: "1 small" },
      { item: "Onion, sliced", shoppingItem: "Onion", quantity: "1 small" },
      { item: "Sweetcorn, drained", shoppingItem: "Sweetcorn", quantity: "150g" },
      { item: "Olive oil", quantity: "4 tbsp" },
      { item: "Lemon, zest and juice", shoppingItem: "Lemon", quantity: "1" },
      { item: "Dried oregano", quantity: "1 tsp" },
      { item: "Dried parsley", quantity: "1 tsp" },
      { item: "Garlic granules", quantity: "½ tsp" },
      { item: "Paprika", quantity: "½ tsp" },
      { item: "Reduced-fat feta cheese, crumbled", quantity: "50g" },
      { item: "Black pepper", quantity: "To taste" },
      { item: "Fresh parsley", quantity: "Small handful" },
      { item: "No added salt", quantity: "As required" },
    ],
    method: [
      "Put the couscous into a large bowl and pour over 300ml boiling water. Cover and leave for 5 minutes.",
      "Fluff the couscous with a fork and stir through 1 tbsp olive oil, the lemon zest and half the lemon juice.",
      "Heat 2 tbsp olive oil in a large frying pan.",
      "Add the onion, red and yellow peppers and courgette. Cook for 7–8 minutes until softened and lightly browned.",
      "Add the sweetcorn, oregano, parsley, garlic granules and paprika and cook for another 2 minutes.",
      "Stir the vegetables through the couscous.",
      "Add the remaining olive oil and lemon juice and mix well.",
      "Divide between four bowls and crumble a small amount of feta over each serving.",
      "Finish with fresh parsley and black pepper.",
    ],
    nutrition: {
      calories: "640 kcal",
      protein: "18 g",
      carbohydrates: "78 g",
      fat: "28 g",
      fibre: "7 g",
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
    category: "Vegetarian",
    emoji: "🍄",
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
      { item: "Dried penne pasta", shoppingItem: "Pasta", quantity: "350g" },
      { item: "Chestnut mushrooms, sliced", shoppingItem: "Mushrooms", quantity: "300g" },
      { item: "Onion, finely sliced", shoppingItem: "Onion", quantity: "1 medium" },
      { item: "Garlic, crushed", shoppingItem: "Garlic", quantity: "2 cloves" },
      { item: "Half-fat crème fraîche", quantity: "150ml" },
      { item: "Olive oil", quantity: "4 tbsp" },
      { item: "Lemon juice", shoppingItem: "Lemon", quantity: "½ lemon" },
      { item: "Dried parsley", quantity: "1 tsp" },
      { item: "Dried thyme", quantity: "1 tsp" },
      { item: "Black pepper", quantity: "To taste" },
      { item: "Fresh parsley", quantity: "Small handful" },
      { item: "No added salt", quantity: "As required" },
    ],
    method: [
      "Cook the pasta according to the packet instructions until just tender. Reserve a little cooking water, then drain.",
      "Heat 2 tbsp olive oil in a large frying pan over a medium-high heat.",
      "Add the mushrooms and cook for 5–7 minutes until softened and lightly browned.",
      "Add the remaining olive oil and the onion and cook for 4–5 minutes until softened.",
      "Add the garlic, thyme and dried parsley and cook for 30 seconds.",
      "Reduce the heat and stir in the crème fraîche and a small splash of the reserved pasta water.",
      "Add the drained pasta and toss gently until coated in the sauce.",
      "Add the lemon juice and black pepper and warm through for 1–2 minutes. Do not boil the sauce.",
      "Finish with fresh parsley and serve.",
    ],
    nutrition: {
      calories: "650 kcal",
      protein: "19 g",
      carbohydrates: "82 g",
      fat: "27 g",
      fibre: "7 g",
    },
    potassium: "Moderate",
    phosphate: "High",
    purines: "Low",
    dietaryNote:
      "This vegetarian recipe is relatively low in purines because it contains no meat, fish or pulses. Mushrooms contribute potassium and the crème fraîche contributes some phosphate.",
  },
      {
    id: "apple-cinnamon-french-toast",
    code: "B001",
    category: "Breakfast",
    emoji: "🍎",
    image: "/images/recipes/apple-cinnamon-french-toast.png",
    name: "Apple & Cinnamon French Toast",
    description:
      "Golden French toast made with egg whites, warm apple and cinnamon, finished with a light drizzle of maple syrup.",
    cookingTime: "15 minutes",
    calories: "330 kcal",
    protein: "14 g",
    equipment:
      "Non-stick frying pan, shallow bowl, toaster, knife",
    ingredients: [
      {
        item: "White bread, phosphate-additive-free",
        shoppingItem: "White bread",
        quantity: "2 slices",
      },
      {
        item: "Egg whites",
        quantity: "3 large",
      },
      {
        item: "Apple, thinly sliced",
        shoppingItem: "Apple",
        quantity: "½ medium",
      },
      {
        item: "Ground cinnamon",
        quantity: "½ tsp",
      },
      {
        item: "Olive oil",
        quantity: "1 tsp",
      },
      {
        item: "Maple syrup",
        quantity: "1 tsp",
      },
    ],
    method: [
      "Whisk the egg whites with half of the cinnamon in a shallow bowl.",
      "Dip the bread into the egg-white mixture, turning once so both sides are coated.",
      "Heat the olive oil in a non-stick frying pan over a medium heat.",
      "Cook the bread for 2–3 minutes on each side until lightly golden and cooked through.",
      "Add the sliced apple to the pan and cook for 2–3 minutes until just softened.",
      "Serve the French toast topped with the warm apple, remaining cinnamon and maple syrup.",
    ],
    nutrition: {
      calories: "330 kcal",
      protein: "14 g",
      carbohydrates: "54 g",
      fat: "7 g",
      fibre: "4 g",
    },
    potassium: "Low",
    phosphate: "Low",
    purines: "Low",
    dietaryNote:
      "Uses egg whites rather than whole eggs to keep phosphate lower. Choose bread without phosphate additives.",
  },

  {
    id: "blueberry-lemon-pancakes",
    code: "B002",
    category: "Breakfast",
    emoji: "🥞",
    image: "/images/recipes/blueberry-lemon-pancakes.png",
    name: "Blueberry & Lemon Pancakes",
    description:
      "Fluffy homemade pancakes with a modest portion of blueberries, fresh lemon and a light maple drizzle.",
    cookingTime: "20 minutes",
    calories: "390 kcal",
    protein: "9 g",
    equipment:
      "Non-stick frying pan, mixing bowl, whisk, spatula",
    ingredients: [
      {
        item: "Plain flour",
        quantity: "70 g",
      },
      {
        item: "Egg white",
        quantity: "1 large",
      },
      {
        item: "Water",
        quantity: "100 ml",
      },
      {
        item: "Baking powder",
        quantity: "1 tsp",
      },
      {
        item: "Caster sugar",
        quantity: "1 tbsp",
      },
      {
        item: "Blueberries",
        shoppingItem: "Blueberries",
        quantity: "50 g",
      },
      {
        item: "Lemon zest",
        shoppingItem: "Lemon",
        quantity: "½ lemon",
      },
      {
        item: "Olive oil",
        quantity: "1 tsp",
      },
      {
        item: "Maple syrup",
        quantity: "1 tsp",
      },
    ],
    method: [
      "Mix the flour, baking powder and sugar in a bowl.",
      "Whisk the egg white with the water and lemon zest, then gradually whisk into the dry ingredients to make a smooth batter.",
      "Fold in half of the blueberries.",
      "Heat the olive oil in a non-stick frying pan over a medium heat.",
      "Cook the pancakes in batches, turning when bubbles appear on the surface, until lightly golden and cooked through.",
      "Serve with the remaining blueberries and maple syrup.",
    ],
    nutrition: {
      calories: "390 kcal",
      protein: "9 g",
      carbohydrates: "72 g",
      fat: "7 g",
      fibre: "3 g",
    },
    potassium: "Low",
    phosphate: "Low",
    purines: "Low",
    dietaryNote:
      "The blueberry portion is deliberately modest. Choose baking powder without phosphate additives where available.",
  },

  {
    id: "scrambled-egg-pepper-toast",
    code: "B003",
    category: "Breakfast",
    emoji: "🍳",
    image: "/images/recipes/scrambled-egg-red-pepper-toast.png",
    name: "Scrambled Egg & Red Pepper Toast",
    description:
      "Soft scrambled egg whites with sweet red pepper and spring onion served over crisp toast.",
    cookingTime: "15 minutes",
    calories: "300 kcal",
    protein: "18 g",
    equipment:
      "Non-stick frying pan, bowl, toaster, spatula",
    ingredients: [
      {
        item: "Egg whites",
        quantity: "4 large",
      },
      {
        item: "White bread, phosphate-additive-free",
        shoppingItem: "White bread",
        quantity: "2 slices",
      },
      {
        item: "Red pepper, finely diced",
        shoppingItem: "Red pepper",
        quantity: "½ medium",
      },
      {
        item: "Spring onion, finely sliced",
        shoppingItem: "Spring onion",
        quantity: "1",
      },
      {
        item: "Olive oil",
        quantity: "1 tsp",
      },
      {
        item: "Freshly ground black pepper",
        quantity: "To taste",
      },
    ],
    method: [
      "Toast the bread.",
      "Heat the olive oil in a non-stick frying pan over a medium heat.",
      "Add the red pepper and spring onion and cook for 3–4 minutes until softened.",
      "Whisk the egg whites with black pepper and pour into the pan.",
      "Stir gently until softly scrambled and cooked through.",
      "Serve immediately on the toast.",
    ],
    nutrition: {
      calories: "300 kcal",
      protein: "18 g",
      carbohydrates: "39 g",
      fat: "8 g",
      fibre: "3 g",
    },
    potassium: "Low",
    phosphate: "Low",
    purines: "Low",
    dietaryNote:
      "Egg whites provide protein with less phosphate than whole eggs. Choose bread without phosphate additives.",
  },

  {
    id: "strawberry-crumpets",
    code: "B004",
    category: "Breakfast",
    emoji: "🍓",
    image: "/images/recipes/strawberry-crumpets.png",
    name: "Strawberry Breakfast Crumpets",
    description:
      "Warm toasted crumpets topped with fresh strawberries, a little butter and maple syrup.",
    cookingTime: "10 minutes",
    calories: "310 kcal",
    protein: "7 g",
    equipment:
      "Toaster, knife",
    ingredients: [
      {
        item: "Plain crumpets",
        shoppingItem: "Crumpets",
        quantity: "2",
      },
      {
        item: "Strawberries, sliced",
        shoppingItem: "Strawberries",
        quantity: "80 g",
      },
      {
        item: "Butter",
        quantity: "10 g",
      },
      {
        item: "Maple syrup",
        quantity: "1 tsp",
      },
      {
        item: "Fresh mint",
        quantity: "Small handful",
      },
    ],
    method: [
      "Toast the crumpets until golden and hot.",
      "Spread the butter over the warm crumpets.",
      "Top with the sliced strawberries.",
      "Drizzle with the maple syrup and finish with a few mint leaves.",
      "Serve immediately.",
    ],
    nutrition: {
      calories: "310 kcal",
      protein: "7 g",
      carbohydrates: "51 g",
      fat: "9 g",
      fibre: "4 g",
    },
    potassium: "Low",
    phosphate: "Low",
    purines: "Low",
    dietaryNote:
      "Uses a modest portion of strawberries. Check the crumpet label for phosphate additives.",
  },

  {
    id: "apple-cinnamon-rice-breakfast",
    code: "B005",
    category: "Breakfast",
    emoji: "🍚",
    image: "/images/recipes/apple-cinnamon-rice-pudding.png",
    name: "Apple & Cinnamon Breakfast Rice",
    description:
      "Warm creamy rice with gently cooked apple, cinnamon and vanilla for a comforting breakfast.",
    cookingTime: "15 minutes",
    calories: "360 kcal",
    protein: "5 g",
    equipment:
      "Saucepan, wooden spoon, knife",
    ingredients: [
      {
        item: "Cooked white rice",
        shoppingItem: "Rice",
        quantity: "180 g",
      },
      {
        item: "Water",
        quantity: "120 ml",
      },
      {
        item: "Apple, peeled and diced",
        shoppingItem: "Apple",
        quantity: "½ medium",
      },
      {
        item: "Caster sugar",
        quantity: "1 tbsp",
      },
      {
        item: "Ground cinnamon",
        quantity: "½ tsp",
      },
      {
        item: "Vanilla extract",
        quantity: "½ tsp",
      },
    ],
    method: [
      "Place the cooked rice, water, diced apple, sugar and cinnamon into a saucepan.",
      "Bring gently to a simmer and cook for 7–8 minutes, stirring regularly, until creamy and the apple is tender.",
      "Stir in the vanilla extract.",
      "Serve warm with a light dusting of cinnamon.",
    ],
    nutrition: {
      calories: "360 kcal",
      protein: "5 g",
      carbohydrates: "77 g",
      fat: "1 g",
      fibre: "3 g",
    },
    potassium: "Low",
    phosphate: "Low",
    purines: "Low",
    dietaryNote:
      "White rice provides a relatively low-potassium carbohydrate base. The recipe avoids milk and cream to keep phosphate lower.",
  },

  {
    id: "egg-herb-breakfast-sandwich",
    code: "B006",
    category: "Breakfast",
    emoji: "🥪",
    image: "/images/recipes/egg-herb-sandwich.png",
    name: "Egg & Herb Breakfast Sandwich",
    description:
      "A fresh breakfast sandwich filled with softly cooked egg whites, lettuce, red pepper and chives.",
    cookingTime: "15 minutes",
    calories: "350 kcal",
    protein: "19 g",
    equipment:
      "Non-stick frying pan, toaster, bowl",
    ingredients: [
      {
        item: "White bread roll, phosphate-additive-free",
        shoppingItem: "White bread roll",
        quantity: "1",
      },
      {
        item: "Egg whites",
        quantity: "4 large",
      },
      {
        item: "Red pepper, thinly sliced",
        shoppingItem: "Red pepper",
        quantity: "¼ medium",
      },
      {
        item: "Lettuce leaves",
        shoppingItem: "Lettuce",
        quantity: "2",
      },
      {
        item: "Mayonnaise",
        quantity: "1 tbsp",
      },
      {
        item: "Fresh chives, chopped",
        shoppingItem: "Chives",
        quantity: "1 tbsp",
      },
      {
        item: "Olive oil",
        quantity: "½ tsp",
      },
      {
        item: "Freshly ground black pepper",
        quantity: "To taste",
      },
    ],
    method: [
      "Slice the bread roll and lightly toast the cut sides.",
      "Heat the olive oil in a non-stick frying pan and cook the red pepper for 2–3 minutes.",
      "Whisk the egg whites with the chives and black pepper.",
      "Pour into the pan and gently scramble until cooked through.",
      "Spread the mayonnaise over the toasted bread roll.",
      "Add the lettuce, egg mixture and red pepper.",
      "Serve immediately.",
    ],
    nutrition: {
      calories: "350 kcal",
      protein: "19 g",
      carbohydrates: "43 g",
      fat: "12 g",
      fibre: "3 g",
    },
    potassium: "Low",
    phosphate: "Low",
    purines: "Low",
    dietaryNote:
      "Uses egg whites rather than whole eggs. Choose bread and mayonnaise without phosphate additives where possible.",
  },

  {
    id: "lemon-blueberry-pancake-stack",
    code: "B007",
    category: "Breakfast",
    emoji: "🫐",
    image: "/images/recipes/lemon-blueberry-pancake-stack.png",
    name: "Lemon & Blueberry Pancake Stack",
    description:
      "Small golden pancakes layered with blueberries and lemon zest, finished with a little maple syrup.",
    cookingTime: "20 minutes",
    calories: "410 kcal",
    protein: "9 g",
    equipment:
      "Non-stick frying pan, mixing bowl, whisk, spatula",
    ingredients: [
      {
        item: "Plain flour",
        quantity: "75 g",
      },
      {
        item: "Egg white",
        quantity: "1 large",
      },
      {
        item: "Water",
        quantity: "110 ml",
      },
      {
        item: "Baking powder",
        quantity: "1 tsp",
      },
      {
        item: "Caster sugar",
        quantity: "1 tbsp",
      },
      {
        item: "Blueberries",
        shoppingItem: "Blueberries",
        quantity: "60 g",
      },
      {
        item: "Lemon zest",
        shoppingItem: "Lemon",
        quantity: "½ lemon",
      },
      {
        item: "Vegetable oil",
        quantity: "1 tsp",
      },
      {
        item: "Maple syrup",
        quantity: "2 tsp",
      },
    ],
    method: [
      "Mix the flour, baking powder and sugar in a bowl.",
      "Whisk the egg white, water and lemon zest together.",
      "Gradually whisk the wet mixture into the dry ingredients until smooth.",
      "Heat the oil in a non-stick frying pan over a medium heat.",
      "Cook small pancakes in batches, turning when bubbles appear and cooking until golden on both sides.",
      "Stack the pancakes and spoon the blueberries between the layers.",
      "Finish with the maple syrup and serve.",
    ],
    nutrition: {
      calories: "410 kcal",
      protein: "9 g",
      carbohydrates: "76 g",
      fat: "8 g",
      fibre: "3 g",
    },
    potassium: "Low",
    phosphate: "Low",
    purines: "Low",
    dietaryNote:
      "The fruit portion is controlled to keep potassium modest. Choose baking powder without phosphate additives where available.",
  },

  {
    id: "peach-vanilla-rice-bowl",
    code: "B008",
    category: "Breakfast",
    emoji: "🍑",
    image: "/images/recipes/peach-vanilla-rice.png",
    name: "Peach & Vanilla Breakfast Rice Bowl",
    description:
      "Warm white rice with drained peaches, vanilla and cinnamon for a simple sweet breakfast.",
    cookingTime: "10 minutes",
    calories: "320 kcal",
    protein: "4 g",
    equipment:
      "Saucepan, bowl, spoon",
    ingredients: [
      {
        item: "Cooked white rice",
        shoppingItem: "Rice",
        quantity: "180 g",
      },
      {
        item: "Tinned peach slices in juice, drained",
        shoppingItem: "Tinned peaches",
        quantity: "80 g",
      },
      {
        item: "Caster sugar",
        quantity: "1 tbsp",
      },
      {
        item: "Vanilla extract",
        quantity: "½ tsp",
      },
      {
        item: "Ground cinnamon",
        quantity: "¼ tsp",
      },
      {
        item: "Water",
        quantity: "50 ml",
      },
    ],
    method: [
      "Place the cooked rice and water into a saucepan and warm gently for 3–4 minutes.",
      "Stir in the sugar and vanilla extract.",
      "Spoon into a breakfast bowl.",
      "Top with the drained peach slices and sprinkle with cinnamon.",
      "Serve warm.",
    ],
    nutrition: {
      calories: "320 kcal",
      protein: "4 g",
      carbohydrates: "72 g",
      fat: "1 g",
      fibre: "2 g",
    },
    potassium: "Low",
    phosphate: "Low",
    purines: "Low",
    dietaryNote:
      "Uses drained tinned peaches in a modest portion. White rice provides a lower-potassium carbohydrate base.",
  },

  {
    id: "savoury-egg-pepper-wrap",
    code: "B009",
    category: "Breakfast",
    emoji: "🌯",
    image: "/images/recipes/egg-pepper-wrap.png",
    name: "Savoury Egg & Pepper Breakfast Wrap",
    description:
      "A warm white tortilla filled with softly scrambled egg whites, red pepper, onion and crisp lettuce.",
    cookingTime: "15 minutes",
    calories: "370 kcal",
    protein: "17 g",
    equipment:
      "Non-stick frying pan, bowl, spatula",
    ingredients: [
      {
        item: "White tortilla wrap, phosphate-additive-free",
        shoppingItem: "White tortilla wraps",
        quantity: "1 large",
      },
      {
        item: "Egg whites",
        quantity: "3 large",
      },
      {
        item: "Red pepper, diced",
        shoppingItem: "Red pepper",
        quantity: "½ medium",
      },
      {
        item: "Onion, finely sliced",
        shoppingItem: "Onion",
        quantity: "2 tbsp",
      },
      {
        item: "Lettuce leaves",
        shoppingItem: "Lettuce",
        quantity: "2",
      },
      {
        item: "Olive oil",
        quantity: "1 tsp",
      },
      {
        item: "Freshly ground black pepper",
        quantity: "To taste",
      },
    ],
    method: [
      "Warm the tortilla briefly in a dry frying pan and set aside.",
      "Heat the olive oil in the pan over a medium heat.",
      "Add the onion and red pepper and cook for 3–4 minutes until softened.",
      "Whisk the egg whites with black pepper and pour into the pan.",
      "Stir gently until the egg whites are cooked through.",
      "Place the lettuce in the centre of the tortilla and spoon the egg mixture over it.",
      "Fold in the sides and roll tightly.",
      "Serve immediately.",
    ],
    nutrition: {
      calories: "370 kcal",
      protein: "17 g",
      carbohydrates: "48 g",
      fat: "12 g",
      fibre: "4 g",
    },
    potassium: "Low",
    phosphate: "Low",
    purines: "Low",
    dietaryNote:
      "Uses egg whites for protein and avoids cheese. Choose a tortilla without phosphate additives.",
  },

  {
    id: "apple-blueberry-breakfast-toast",
    code: "B010",
    category: "Breakfast",
    emoji: "🍏",
    image: "/images/recipes/apple-blueberry-toast.png",
    name: "Apple & Blueberry Breakfast Toast",
    description:
      "Golden toast topped with gently softened apple, blueberries, cinnamon and a little maple syrup.",
    cookingTime: "12 minutes",
    calories: "300 kcal",
    protein: "6 g",
    equipment:
      "Toaster, non-stick frying pan, knife",
    ingredients: [
      {
        item: "White bread, phosphate-additive-free",
        shoppingItem: "White bread",
        quantity: "2 slices",
      },
      {
        item: "Apple, thinly sliced",
        shoppingItem: "Apple",
        quantity: "½ medium",
      },
      {
        item: "Blueberries",
        shoppingItem: "Blueberries",
        quantity: "40 g",
      },
      {
        item: "Butter",
        quantity: "8 g",
      },
      {
        item: "Maple syrup",
        quantity: "1 tsp",
      },
      {
        item: "Ground cinnamon",
        quantity: "½ tsp",
      },
    ],
    method: [
      "Toast the bread until golden.",
      "Melt the butter in a non-stick frying pan over a medium heat.",
      "Add the apple and cinnamon and cook for 3–4 minutes until just softened.",
      "Add the blueberries and warm for 1 minute without breaking them up too much.",
      "Place the warm fruit over the toast.",
      "Drizzle with maple syrup and serve immediately.",
    ],
    nutrition: {
      calories: "300 kcal",
      protein: "6 g",
      carbohydrates: "50 g",
      fat: "9 g",
      fibre: "4 g",
    },
    potassium: "Low",
    phosphate: "Low",
    purines: "Low",
    dietaryNote:
      "Uses modest portions of lower-potassium fruit and avoids dairy-heavy toppings. Choose bread without phosphate additives.",
  },


  {
    id: "scrambled-eggs-on-toast",
    code: "B011",
    category: "Breakfast",
    emoji: "🍳",
    image: "/images/recipes/scrambled-eggs-on-toast.png",
    name: "Scrambled Eggs on Toast",
    description:
      "Soft, creamy scrambled eggs served on crisp golden toast with a little black pepper and fresh chives.",
    cookingTime: "10 minutes",
    calories: "360 kcal",
    protein: "18 g",
    equipment: "Non-stick frying pan, bowl, toaster, spatula",
    ingredients: [
      { item: "Eggs", quantity: "2 large" },
      { item: "White bread, phosphate-additive-free", shoppingItem: "White bread", quantity: "2 slices" },
      { item: "Butter", quantity: "8 g" },
      { item: "Freshly ground black pepper", quantity: "To taste" },
      { item: "Fresh chives, finely chopped", shoppingItem: "Fresh chives", quantity: "1 tsp" },
    ],
    method: [
      "Toast the bread until golden.",
      "Crack the eggs into a bowl and whisk gently with the black pepper.",
      "Melt half the butter in a non-stick frying pan over a low to medium heat.",
      "Pour in the eggs and stir gently with a spatula until softly scrambled and just cooked.",
      "Butter the toast with the remaining butter.",
      "Spoon the scrambled eggs over the toast and finish with the chopped chives.",
      "Serve immediately.",
    ],
    nutrition: {
      calories: "360 kcal",
      protein: "18 g",
      carbohydrates: "31 g",
      fat: "18 g",
      fibre: "3 g",
    },
    potassium: "Low",
    phosphate: "Moderate",
    purines: "Low",
    dietaryNote:
      "Eggs provide useful protein but contribute phosphate. Choose bread without phosphate additives.",
  },

  {
    id: "poached-eggs-on-toast",
    code: "B012",
    category: "Breakfast",
    emoji: "🥚",
    image: "/images/recipes/poached-eggs-on-toast.png",
    name: "Poached Eggs on Toast",
    description:
      "Perfectly poached eggs served on golden toast with black pepper and fresh chives.",
    cookingTime: "12 minutes",
    calories: "340 kcal",
    protein: "17 g",
    equipment: "Saucepan, slotted spoon, toaster, small bowl",
    ingredients: [
      { item: "Eggs", quantity: "2 large" },
      { item: "White bread, phosphate-additive-free", shoppingItem: "White bread", quantity: "2 slices" },
      { item: "Butter", quantity: "8 g" },
      { item: "Fresh chives, finely chopped", shoppingItem: "Fresh chives", quantity: "1 tsp" },
      { item: "Freshly ground black pepper", quantity: "To taste" },
    ],
    method: [
      "Bring a saucepan of water to a gentle simmer.",
      "Crack each egg into a small bowl.",
      "Carefully slide the eggs into the simmering water and poach for about 3–4 minutes until the whites are set and the yolks remain soft.",
      "Toast the bread and spread with the butter.",
      "Lift the eggs from the water with a slotted spoon and drain briefly.",
      "Place one poached egg on each slice of toast.",
      "Finish with black pepper and fresh chives.",
      "Serve immediately.",
    ],
    nutrition: {
      calories: "340 kcal",
      protein: "17 g",
      carbohydrates: "30 g",
      fat: "17 g",
      fibre: "3 g",
    },
    potassium: "Low",
    phosphate: "Moderate",
    purines: "Low",
    dietaryNote:
      "A simple breakfast using eggs and bread. Choose bread without phosphate additives.",
  },

  {
    id: "egg-and-soldiers",
    code: "B013",
    category: "Breakfast",
    emoji: "🥚",
    image: "/images/recipes/egg-and-soldiers.png",
    name: "Egg & Soldiers",
    description:
      "A proper British breakfast of soft-boiled eggs with crisp buttery toast soldiers for dipping.",
    cookingTime: "8 minutes",
    calories: "350 kcal",
    protein: "17 g",
    equipment: "Saucepan, egg cups, toaster, knife",
    ingredients: [
      { item: "Eggs", quantity: "2 large" },
      { item: "White bread, phosphate-additive-free", shoppingItem: "White bread", quantity: "2 slices" },
      { item: "Butter", quantity: "10 g" },
      { item: "Freshly ground black pepper", quantity: "To taste" },
    ],
    method: [
      "Bring a saucepan of water to the boil.",
      "Carefully lower the eggs into the water and cook for 5–6 minutes for soft-boiled eggs.",
      "Toast the bread until golden.",
      "Spread the butter over the toast and cut each slice into four long soldiers.",
      "Place the eggs in egg cups and carefully remove the tops.",
      "Season with black pepper and serve with the toast soldiers.",
    ],
    nutrition: {
      calories: "350 kcal",
      protein: "17 g",
      carbohydrates: "30 g",
      fat: "18 g",
      fibre: "3 g",
    },
    potassium: "Low",
    phosphate: "Moderate",
    purines: "Low",
    dietaryNote:
      "A traditional British breakfast with a moderate egg portion. Choose bread without phosphate additives.",
  },

  {
    id: "sausage-and-egg-breakfast-muffin",
    code: "B014",
    category: "Breakfast",
    emoji: "🌭",
    image: "/images/recipes/sausage-and-egg-breakfast-muffin.png",
    name: "Sausage & Egg Breakfast Muffin",
    description:
      "A toasted breakfast muffin filled with a light pork sausage, egg and crisp lettuce.",
    cookingTime: "15 minutes",
    calories: "410 kcal",
    protein: "23 g",
    equipment: "Non-stick frying pan, toaster, spatula",
    ingredients: [
      { item: "Light pork breakfast sausage", shoppingItem: "Light pork sausages", quantity: "1 small" },
      { item: "Egg", quantity: "1 large" },
      { item: "Plain white breakfast muffin, phosphate-additive-free", shoppingItem: "Breakfast muffins", quantity: "1" },
      { item: "Lettuce leaves", shoppingItem: "Lettuce", quantity: "2" },
      { item: "Butter", quantity: "5 g" },
      { item: "Freshly ground black pepper", quantity: "To taste" },
    ],
    method: [
      "Cook the sausage in a non-stick frying pan over a medium heat until thoroughly cooked and browned.",
      "Remove the sausage and keep warm.",
      "Toast the breakfast muffin and spread lightly with butter.",
      "Crack the egg into the same pan and cook until the white is set and the yolk is cooked to your preference.",
      "Place the lettuce on the bottom half of the muffin.",
      "Add the sausage and egg.",
      "Season with black pepper and top with the other half of the muffin.",
      "Serve immediately.",
    ],
    nutrition: {
      calories: "410 kcal",
      protein: "23 g",
      carbohydrates: "31 g",
      fat: "21 g",
      fibre: "3 g",
    },
    potassium: "Low",
    phosphate: "Moderate",
    purines: "Moderate",
    dietaryNote:
      "Uses one small light sausage rather than a larger portion. Choose a sausage and muffin without added phosphate ingredients where possible.",
  },

  {
    id: "bacon-and-egg-toast",
    code: "B015",
    category: "Breakfast",
    emoji: "🥓",
    image: "/images/recipes/bacon-and-egg-toast.png",
    name: "Bacon & Egg Toast",
    description:
      "A familiar British breakfast of one crisp bacon rasher and a fried egg served on golden toast.",
    cookingTime: "12 minutes",
    calories: "390 kcal",
    protein: "22 g",
    equipment: "Non-stick frying pan, toaster, spatula",
    ingredients: [
      { item: "Back bacon, trimmed", shoppingItem: "Back bacon", quantity: "1 rasher" },
      { item: "Egg", quantity: "1 large" },
      { item: "White bread, phosphate-additive-free", shoppingItem: "White bread", quantity: "2 slices" },
      { item: "Butter", quantity: "5 g" },
      { item: "Freshly ground black pepper", quantity: "To taste" },
    ],
    method: [
      "Heat a non-stick frying pan over a medium heat.",
      "Cook the bacon until lightly crisp and thoroughly cooked.",
      "Remove the bacon and keep warm.",
      "Toast the bread and spread lightly with butter.",
      "Cook the egg in the same pan until the white is set and the yolk is cooked to your preference.",
      "Place the bacon on the toast and top with the egg.",
      "Season with black pepper and serve immediately.",
    ],
    nutrition: {
      calories: "390 kcal",
      protein: "22 g",
      carbohydrates: "30 g",
      fat: "20 g",
      fibre: "3 g",
    },
    potassium: "Low",
    phosphate: "Moderate",
    purines: "Moderate",
    dietaryNote:
      "Keeps bacon to one rasher. Choose lean back bacon with no added phosphate ingredients where possible.",
  },

  {
    id: "egg-and-cheese-crumpets",
    code: "B016",
    category: "Breakfast",
    emoji: "🧀",
    image: "/images/recipes/egg-and-cheese-crumpets.png",
    name: "Egg & Cheese Crumpets",
    description:
      "Toasted crumpets topped with softly scrambled egg and a small amount of mature cheddar.",
    cookingTime: "12 minutes",
    calories: "420 kcal",
    protein: "20 g",
    equipment: "Non-stick frying pan, toaster, bowl, spatula",
    ingredients: [
      { item: "Plain crumpets", shoppingItem: "Crumpets", quantity: "2" },
      { item: "Eggs", quantity: "2 large" },
      { item: "Mature cheddar, finely grated", shoppingItem: "Mature cheddar", quantity: "15 g" },
      { item: "Butter", quantity: "5 g" },
      { item: "Freshly ground black pepper", quantity: "To taste" },
    ],
    method: [
      "Toast the crumpets until hot and golden.",
      "Whisk the eggs with black pepper.",
      "Melt the butter in a non-stick frying pan over a low to medium heat.",
      "Add the eggs and stir gently until softly scrambled.",
      "Divide the scrambled egg between the crumpets.",
      "Sprinkle the grated cheddar over the top while the egg is still hot.",
      "Serve immediately.",
    ],
    nutrition: {
      calories: "420 kcal",
      protein: "20 g",
      carbohydrates: "40 g",
      fat: "21 g",
      fibre: "3 g",
    },
    potassium: "Low",
    phosphate: "High",
    purines: "Low",
    dietaryNote:
      "The small cheese portion keeps the recipe lighter, but cheese contributes phosphate. Best treated as an occasional breakfast choice.",
  },

  {
    id: "sausage-on-toast",
    code: "B017",
    category: "Breakfast",
    emoji: "🌭",
    image: "/images/recipes/sausage-on-toast.png",
    name: "Sausage on Toast",
    description:
      "A simple British breakfast of a light pork sausage served with crisp golden toast and black pepper.",
    cookingTime: "15 minutes",
    calories: "380 kcal",
    protein: "19 g",
    equipment: "Non-stick frying pan, toaster",
    ingredients: [
      { item: "Light pork breakfast sausage", shoppingItem: "Light pork sausages", quantity: "1 large" },
      { item: "White bread, phosphate-additive-free", shoppingItem: "White bread", quantity: "2 slices" },
      { item: "Butter", quantity: "8 g" },
      { item: "Freshly ground black pepper", quantity: "To taste" },
    ],
    method: [
      "Cook the sausage in a non-stick frying pan over a medium heat until thoroughly cooked and browned.",
      "Toast the bread until golden.",
      "Spread the butter over the toast.",
      "Slice the cooked sausage and arrange it over the toast.",
      "Season with black pepper and serve immediately.",
    ],
    nutrition: {
      calories: "380 kcal",
      protein: "19 g",
      carbohydrates: "30 g",
      fat: "21 g",
      fibre: "3 g",
    },
    potassium: "Low",
    phosphate: "Moderate",
    purines: "Moderate",
    dietaryNote:
      "Uses a single light sausage to keep the portion sensible. Choose a sausage without added phosphate ingredients where possible.",
  },

  {
    id: "egg-and-ham-breakfast-bagel",
    code: "B018",
    category: "Breakfast",
    emoji: "🥯",
    image: "/images/recipes/egg-and-ham-breakfast-bagel.png",
    name: "Egg & Ham Breakfast Bagel",
    description:
      "A toasted bagel filled with softly scrambled egg, a small amount of ham and crisp lettuce.",
    cookingTime: "12 minutes",
    calories: "430 kcal",
    protein: "24 g",
    equipment: "Non-stick frying pan, toaster, bowl, spatula",
    ingredients: [
      { item: "Plain white bagel, phosphate-additive-free", shoppingItem: "Plain bagels", quantity: "1" },
      { item: "Egg", quantity: "1 large" },
      { item: "Lean cooked ham", shoppingItem: "Cooked ham", quantity: "30 g" },
      { item: "Lettuce leaves", shoppingItem: "Lettuce", quantity: "2" },
      { item: "Butter", quantity: "5 g" },
      { item: "Freshly ground black pepper", quantity: "To taste" },
    ],
    method: [
      "Toast the bagel halves until lightly golden.",
      "Whisk the egg with black pepper.",
      "Melt the butter in a non-stick frying pan over a low to medium heat.",
      "Add the egg and stir gently until softly scrambled and cooked through.",
      "Place the lettuce on the bottom half of the bagel.",
      "Add the ham and scrambled egg.",
      "Top with the other half of the bagel and serve immediately.",
    ],
    nutrition: {
      calories: "430 kcal",
      protein: "24 g",
      carbohydrates: "48 g",
      fat: "16 g",
      fibre: "3 g",
    },
    potassium: "Low",
    phosphate: "Moderate",
    purines: "Moderate",
    dietaryNote:
      "Uses a modest portion of ham. Choose a bagel without phosphate additives and a lean ham where possible.",
  },

  {
    id: "egg-and-pepper-breakfast-bagel",
    code: "B019",
    category: "Breakfast",
    emoji: "🥯",
    image: "/images/recipes/egg-and-pepper-breakfast-bagel.png",
    name: "Egg & Pepper Breakfast Bagel",
    description:
      "A warm toasted bagel filled with softly scrambled egg, sweet red pepper and crisp lettuce.",
    cookingTime: "15 minutes",
    calories: "400 kcal",
    protein: "19 g",
    equipment: "Non-stick frying pan, toaster, bowl, spatula",
    ingredients: [
      { item: "Plain white bagel, phosphate-additive-free", shoppingItem: "Plain bagels", quantity: "1" },
      { item: "Egg whites", quantity: "3 large" },
      { item: "Red pepper, finely diced", shoppingItem: "Red pepper", quantity: "¼ medium" },
      { item: "Lettuce leaves", shoppingItem: "Lettuce", quantity: "2" },
      { item: "Olive oil", quantity: "1 tsp" },
      { item: "Freshly ground black pepper", quantity: "To taste" },
    ],
    method: [
      "Toast the bagel halves until lightly golden.",
      "Heat the olive oil in a non-stick frying pan over a medium heat.",
      "Add the diced red pepper and cook for 2–3 minutes until slightly softened.",
      "Whisk the egg whites with black pepper and pour them into the pan.",
      "Stir gently until the egg whites are softly scrambled and cooked through.",
      "Place the lettuce on the bottom half of the bagel.",
      "Spoon the scrambled egg and pepper mixture over the lettuce.",
      "Top with the other half of the bagel and serve immediately.",
    ],
    nutrition: {
      calories: "400 kcal",
      protein: "19 g",
      carbohydrates: "51 g",
      fat: "13 g",
      fibre: "4 g",
    },
    potassium: "Low",
    phosphate: "Low",
    purines: "Low",
    dietaryNote:
      "Uses egg whites to provide protein with less phosphate than whole eggs. Choose a bagel without phosphate additives.",
  },

  {
    id: "apple-cinnamon-porridge",
    code: "B020",
    category: "Breakfast",
    emoji: "🥣",
    image: "/images/recipes/apple-cinnamon-porridge.png",
    name: "Apple & Cinnamon Porridge",
    description:
      "Warm creamy porridge made with oats and water, topped with gently cooked apple and cinnamon.",
    cookingTime: "10 minutes",
    calories: "340 kcal",
    protein: "8 g",
    equipment: "Saucepan, wooden spoon, knife",
    ingredients: [
      { item: "Rolled oats", shoppingItem: "Rolled oats", quantity: "50 g" },
      { item: "Water", quantity: "250 ml" },
      { item: "Apple, peeled and finely diced", shoppingItem: "Apple", quantity: "½ medium" },
      { item: "Caster sugar", quantity: "1 tbsp" },
      { item: "Ground cinnamon", quantity: "½ tsp" },
      { item: "Vanilla extract", quantity: "½ tsp" },
    ],
    method: [
      "Place the oats and water into a saucepan.",
      "Bring gently to a simmer and cook for 4–5 minutes, stirring regularly, until creamy.",
      "Meanwhile, place the diced apple in a small pan with a splash of water and cook for 3–4 minutes until just softened.",
      "Stir the sugar and vanilla extract into the porridge.",
      "Spoon the porridge into a bowl and top with the warm apple.",
      "Finish with the cinnamon and serve immediately.",
    ],
    nutrition: {
      calories: "340 kcal",
      protein: "8 g",
      carbohydrates: "61 g",
      fat: "6 g",
      fibre: "6 g",
    },
    potassium: "Moderate",
    phosphate: "Moderate",
    purines: "Low",
    dietaryNote:
      "Oats provide useful fibre but contain more potassium and phosphate than refined cereals. The recipe uses water rather than milk.",
  },


]