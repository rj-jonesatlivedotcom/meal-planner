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
};

export const recipes: Recipe[] = [
  {
    id: "chicken-curry",
    code: "D001",
    emoji: "🍛",
    image: "/images/recipes/chicken-curry.png",
    name: "Chicken Curry",

    description:
      "A mild, tomato-based chicken curry made with simple everyday ingredients, designed to be kidney-friendly by design while remaining a family favourite.",

    cookingTime: "40 minutes",

    calories: "Approx. 520 kcal per adult serving",

    protein: "Approx. 42g per adult serving",

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
  },
  {
    id: "cottage-pie",
    code: "D002",
    emoji: "🥧",
    image: "/images/recipes/cottage-pie.png",
    name: "Cottage Pie",

    description:
      "A comforting family favourite made with lean beef, vegetables and creamy mashed potato, designed to be kidney-friendly by design while keeping all the flavour of a traditional Cottage Pie.",

    cookingTime:
      "55 minutes",

    calories:
      "Approx. 540 kcal per adult serving",

    protein:
      "Approx. 38g per adult serving",

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
  },

{
    id: "chicken-arrabbiata",
    code: "D003",
    emoji: "🍝",
    image: "/images/recipes/chicken-arrabbiata.png",
    name: "Chicken Arrabbiata Pasta",

    description:
      "A simple tomato-based chicken pasta with a gentle warmth, designed to be kidney-friendly while remaining a family favourite.",

    cookingTime: "35 minutes",

    calories: "Approx. 500 kcal per adult serving",

    protein: "Approx. 40g per adult serving",

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
  },
{
  id: "spaghetti-bolognese",
  code: "D004",
  emoji: "🍝",
  image: "/images/recipes/spaghetti-bolognese.png",
  name: "Spaghetti Bolognese",

  description:
    "A rich, tomato-based family favourite made with lean beef, simple vegetables and everyday ingredients, designed to be kidney-friendly by design.",

  cookingTime: "40 minutes",

  calories: "Approx. 510 kcal per adult serving",

  protein: "Approx. 38g per adult serving",

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
},
{
  id: "lemon-herb-chicken-tray-bake",
  code: "D005",
  emoji: "🍗",
  image: "/images/recipes/lemon-herb-chicken.png",
  name: "Lemon & Herb Chicken Tray Bake",

  description:
    "A simple one-tray family dinner with roasted chicken, potatoes and vegetables, flavoured with lemon and herbs for a fresh, satisfying meal.",

  cookingTime: "45 minutes",

  calories: "Approx. 510 kcal per adult serving",

  protein: "Approx. 42g per adult serving",

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
},
{
  id: "chicken-fajitas",
  code: "D006",
  emoji: "🌯",
  image: "/images/recipes/chicken-fajitas.png",
  name: "Chicken Fajitas",

  description:
    "A quick, colourful family favourite made with tender chicken, peppers and onions in a mild fajita seasoning, served in soft white tortilla wraps.",

  cookingTime: "30 minutes",

  calories: "Approx. 510 kcal per adult serving",

  protein: "Approx. 40g per adult serving",

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
},
{
  id: "roast-chicken-dinner",
  code: "D007",
  emoji: "🍗",
  image: "/images/recipes/roast-chicken-dinner.png",
  name: "Roast Chicken Dinner",

  description:
    "A traditional roast chicken dinner made with lean chicken breast, roasted potatoes and vegetables, designed to be kidney-friendly by design while keeping all the flavour of a classic Sunday roast.",

  cookingTime: "60 minutes",

  calories: "Approx. 550 kcal per adult serving",

  protein: "Approx. 43g per adult serving",

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
},
{
  id: "honey-mustard-chicken",
  code: "D008",
  emoji: "🍯",
  image: "/images/recipes/honey-mustard-chicken.png",
  name: "Honey & Mustard Chicken",

  description:
    "Tender chicken breast coated in a light honey and mustard glaze, served with roasted potatoes and vegetables for a simple family dinner designed to be kidney-friendly by design.",

  cookingTime: "40 minutes",

  calories: "Approx. 520 kcal per adult serving",

  protein: "Approx. 42g per adult serving",

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
},
{
  id: "homemade-beef-burgers",
  code: "D009",
  emoji: "🍔",
  image: "/images/recipes/homemade-beef-burgers.png",
  name: "Homemade Beef Burgers",

  description:
    "Lean homemade beef burgers served in a soft white burger bun with salad and oven-baked potato wedges, designed to be kidney-friendly by design while remaining a family favourite.",

  cookingTime: "40 minutes",

  calories: "Approx. 560 kcal per adult serving",

  protein: "Approx. 39g per adult serving",

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
},
{
  id: "beef-meatballs-tomato-herb-sauce",
  code: "D010",
  emoji: "🍝",
  image: "/images/recipes/beef-meatballs.png",
  name: "Beef Meatballs in Tomato & Herb Sauce",

  description:
    "Lean homemade beef meatballs simmered in a rich tomato and herb sauce, served with spaghetti for a simple family meal designed to be kidney-friendly by design.",

  cookingTime: "40 minutes",

  calories: "Approx. 530 kcal per adult serving",

  protein: "Approx. 39g per adult serving",

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
},
{
  id: "chilli-con-carne",
  code: "D011",
  emoji: "🌶️",
  image: "/images/recipes/chilli-con-carne.png",
  name: "Chilli Con Carne",

  description:
    "A mild chilli made with lean beef, tomatoes and peppers, served with basmati rice for a hearty family meal designed to be kidney-friendly by design.",

  cookingTime: "40 minutes",

  calories: "Approx. 530 kcal per adult serving",

  protein: "Approx. 39g per adult serving",

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
},{
  id: "sausage-mash-onion-gravy",
  code: "D012",
  emoji: "🌭",
  image: "/images/recipes/sausage-mash-onion-gravy.png",
  name: "Sausage & Mash with Onion Gravy",

  description:
    "A comforting family favourite made with quality pork sausages, creamy mashed potato and rich onion gravy, designed to be kidney-friendly by design.",

  cookingTime: "45 minutes",

  calories: "Approx. 560 kcal per adult serving",

  protein: "Approx. 28g per adult serving",

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
},
{
  id: "salmon-lemon-herbs",
  code: "D013",
  emoji: "🐟",
  image: "/images/recipes/salmon-lemon-herbs.png",
  name: "Salmon with Lemon & Herbs",

  description:
    "Oven-baked salmon fillet served with roasted potatoes and vegetables, finished with lemon and herbs for a light family dinner designed to be kidney-friendly by design.",

  cookingTime: "40 minutes",

  calories: "Approx. 540 kcal per adult serving",

  protein: "Approx. 35g per adult serving",

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
},
{
  id: "tuna-pasta-bake",
  code: "D014",
  emoji: "🐟",
  image: "/images/recipes/tuna-pasta-bake.png",
  name: "Tuna Pasta Bake",

  description:
    "A comforting tuna pasta bake with a light tomato sauce, designed to be kidney-friendly by design while using simple everyday ingredients.",

  cookingTime: "40 minutes",

  calories: "Approx. 520 kcal per adult serving",

  protein: "Approx. 36g per adult serving",

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
},
{
  id: "mediterranean-chicken",
  code: "D015",
  emoji: "🍅",
  image: "/images/recipes/mediterranean-chicken.png",
  name: "Mediterranean Chicken",

  description:
    "A colourful one-pan chicken dish with Mediterranean vegetables and herbs, served with basmati rice for a fresh, family-friendly dinner designed to be kidney-friendly by design.",

  cookingTime: "35 minutes",

  calories: "Approx. 515 kcal per adult serving",

  protein: "Approx. 41g per adult serving",

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
      shoppingItem: "Red Onion",
      quantity: "¼",
    },
    {
      item: "Red pepper, diced",
      shoppingItem: "Red Pepper",
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
},
]