"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { recipes } from "@/data/recipes";

type ShoppingItem = {
  item: string;
  quantity: string;
};

const ingredientCategories: Record<string, string> = {
  stock: "🥫 Cupboard",
  "curry powder": "🥫 Cupboard",
  passata: "🥫 Cupboard",
  pasta: "🥫 Cupboard",
  spaghetti: "🥫 Cupboard",
  rice: "🥫 Cupboard",
  "tomato purée": "🥫 Cupboard",
  olive: "🥫 Cupboard",
  worcestershire: "🥫 Cupboard",

  chicken: "🥩 Meat & Fish",
  salmon: "🥩 Meat & Fish",
  tuna: "🥩 Meat & Fish",
  beef: "🥩 Meat & Fish",
  sausage: "🥩 Meat & Fish",

  onion: "🥕 Fruit & Vegetables",
  garlic: "🥕 Fruit & Vegetables",
  pepper: "🥕 Fruit & Vegetables",
  tomato: "🥕 Fruit & Vegetables",
  potato: "🥕 Fruit & Vegetables",
  lemon: "🥕 Fruit & Vegetables",
  beans: "🥕 Fruit & Vegetables",
  carrot: "🥕 Fruit & Vegetables",

  cheese: "🧊 Chilled",
  cream: "🧊 Chilled",
  milk: "🧊 Chilled",
  butter: "🧊 Chilled",

  peas: "❄️ Frozen",

  thyme: "🧂 Herbs & Spices",
  "mixed herbs": "🧂 Herbs & Spices",
  "chilli flakes": "🧂 Herbs & Spices",
};


function getCategory(item: string) {
  const lowerItem = item.toLowerCase();

  const match = Object.keys(ingredientCategories).find((key) =>
    lowerItem.includes(key)
  );

  return match
    ? ingredientCategories[match]
    : "Other";
}


export default function ShoppingPage() {

  const [selectedRecipes, setSelectedRecipes] =
  useState<string[]>([]);

const [shoppingList, setShoppingList] =
  useState<ShoppingItem[]>([]);

const [checkedItems, setCheckedItems] =
  useState<string[]>([]);

const [people, setPeople] =
  useState<number>(1);

const [loaded, setLoaded] =
  useState(false);



  function toggleRecipe(id: string) {

    setSelectedRecipes((current) =>
      current.includes(id)
        ? current.filter((recipeId) => recipeId !== id)
        : [...current, id]
    );

  }



  function fractionToDecimal(value: string): number | null {

    const fractions: Record<string, number> = {
      "¼": 0.25,
      "½": 0.5,
      "¾": 0.75,
    };


    if (fractions[value]) {
      return fractions[value];
    }


    const number = Number(value);


    if (!isNaN(number)) {
      return number;
    }


    return null;

  }



  function decimalToFraction(value: number): string {

    const whole = Math.floor(value);
    const fraction = value - whole;

    let result = "";


    if (fraction === 0.25) result = "¼";
    if (fraction === 0.5) result = "½";
    if (fraction === 0.75) result = "¾";


    if (whole > 0 && result) {
      return `${whole} ${result}`;
    }


    if (whole > 0) {
      return `${whole}`;
    }


    return result;

  }



  function scaleQuantity(quantity: string): string {

    const match =
      quantity.match(/([0-9]+|¼|½|¾)/);


    if (!match) {
      return quantity;
    }


    const value =
      fractionToDecimal(match[0]);


    if (value === null) {
      return quantity;
    }


    const scaled =
      value * people;


    return quantity.replace(
      match[0],
      decimalToFraction(scaled)
    );

  }



  function combineIngredients(
    ingredients: ShoppingItem[]
  ): ShoppingItem[] {

    const combined: ShoppingItem[] = [];


    ingredients.forEach((ingredient) => {

      const existing = combined.find(
        (item) =>
          item.item.toLowerCase() ===
          ingredient.item.toLowerCase()
      );


      if (!existing) {

        combined.push({
          item: ingredient.item,
          quantity: ingredient.quantity,
        });

        return;

      }


      if (
        existing.quantity.toLowerCase() === "to taste" &&
        ingredient.quantity.toLowerCase() === "to taste"
      ) {
        return;
      }


      const firstNumber =
        existing.quantity.match(/[0-9]+|¼|½|¾/);

      const secondNumber =
        ingredient.quantity.match(/[0-9]+|¼|½|¾/);    if (firstNumber && secondNumber) {

        const unit1 =
          existing.quantity
            .replace(/[0-9¼½¾]/g, "")
            .trim();

        const unit2 =
          ingredient.quantity
            .replace(/[0-9¼½¾]/g, "")
            .trim();


        if (unit1 === unit2) {

          const firstValue =
            fractionToDecimal(firstNumber[0]);

          const secondValue =
            fractionToDecimal(secondNumber[0]);


          if (
            firstValue !== null &&
            secondValue !== null
          ) {

            const quantity =
  decimalToFraction(firstValue + secondValue);

const noSpaceUnits = [
  "g",
  "kg",
  "ml",
  "l",
];

existing.quantity =
  noSpaceUnits.includes(unit1)
    ? `${quantity}${unit1}`
    : `${quantity} ${unit1}`;

return;

            return;

          }

        }

      }


      const number1 =
        parseFloat(existing.quantity);

      const number2 =
        parseFloat(ingredient.quantity);


      const unit1 =
        existing.quantity.replace(/[0-9.]/g, "");

      const unit2 =
        ingredient.quantity.replace(/[0-9.]/g, "");


      if (
        !isNaN(number1) &&
        !isNaN(number2) &&
        unit1 === unit2
      ) {

        const quantity =
  number1 + number2;

const noSpaceUnits = [
  "g",
  "kg",
  "ml",
  "l",
];

existing.quantity =
  noSpaceUnits.includes(unit1.trim())
    ? `${quantity}${unit1.trim()}`
    : `${quantity} ${unit1.trim()}`;

      } else {

        existing.quantity =
          `${existing.quantity}, ${ingredient.quantity}`;

      }

    });


    return combined;

  }



  function generateShoppingList() {

  const ingredients = recipes
    .filter((recipe) =>
      selectedRecipes.includes(recipe.id)
    )
    .flatMap((recipe) =>
      recipe.ingredients.map((ingredient) => ({
        item: ingredient.item,
        quantity: scaleQuantity(ingredient.quantity),
      }))
    );

  setShoppingList(
    combineIngredients(ingredients)
  );

  setCheckedItems([]);

}



  function resetShopping() {

  setSelectedRecipes([]);
  setShoppingList([]);
  setCheckedItems([]);

  localStorage.removeItem("shopping-data");

}



  const categoryOrder = [
    "🥩 Meat & Fish",
    "🥕 Fruit & Vegetables",
    "🧊 Chilled",
    "❄️ Frozen",
    "🥫 Cupboard",
    "🧂 Herbs & Spices",
    "Other",
  ];


useEffect(() => {
  const saved = localStorage.getItem("shopping-data");

  if (saved) {
    const data = JSON.parse(saved);

    setSelectedRecipes(data.selectedRecipes ?? []);
    setShoppingList(data.shoppingList ?? []);
    setCheckedItems(data.checkedItems ?? []);
    setPeople(data.people ?? 1);
  }

  setLoaded(true);
}, []);

useEffect(() => {
  if (!loaded) return;

  localStorage.setItem(
    "shopping-data",
    JSON.stringify({
      selectedRecipes,
      shoppingList,
      checkedItems,
      people,
    })
  );
}, [
  loaded,
  selectedRecipes,
  shoppingList,
  checkedItems,
  people,
]);
  const groupedShoppingList =
    categoryOrder
      .map((category) => ({
        category,
        items: shoppingList.filter(
          (item) =>
            getCategory(item.item) === category
        ),
      }))
      .filter(
        (group) =>
          group.items.length > 0
      );



  return (
    <main className="p-6 max-w-5xl mx-auto">


      <h1 className="text-3xl font-bold mb-6">
        Shopping List
      </h1>



      <div className="bg-white rounded-xl shadow p-6 mb-6">


        <h2 className="text-xl font-semibold mb-4">
          Cooking for:
        </h2>


        <select
          value={people}
          onChange={(e) =>
            setPeople(Number(e.target.value))
          }
          className="border rounded-lg px-4 py-2 mb-6"
        >

          <option value={1}>
            1 person
          </option>

          <option value={2}>
            2 people
          </option>

          <option value={3}>
            3 people
          </option>

          <option value={4}>
            4 people
          </option>

        </select>



        <h2 className="text-xl font-semibold mb-4">
          Select meals
        </h2>


        <div className="space-y-3">


          {recipes.map((recipe) => (

            <label
              key={recipe.id}
              className="flex items-start gap-3 cursor-pointer py-3"
            >

              <input
                type="checkbox"
                checked={
                  selectedRecipes.includes(recipe.id)
                }
                onChange={() =>
                  toggleRecipe(recipe.id)
                }
              />


<div className="flex flex-col">
  <span className="font-semibold text-slate-900">
    {recipe.emoji} {recipe.name}
  </span>

  <span className="text-sm text-slate-500">
  ⏱️ {recipe.cookingTime.replace(" minutes", " min")} • 🔥{" "}
  {recipe.nutrition.calories} •{" "}
  <Link
    href={`/recipes/${recipe.id}`}
    className="text-blue-600 hover:text-blue-800 hover:underline"
    onClick={(e) => e.stopPropagation()}
  >
    📖 Recipe
  </Link>
</span>
</div>


            </label>

          ))}


        </div>



        <button
          onClick={generateShoppingList}
          className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg"
        >
          Generate Shopping List
        </button>



        {shoppingList.length > 0 && (

          <button
  onClick={resetShopping}
  className="ml-4 mt-6 bg-gray-300 hover:bg-gray-400 px-6 py-3 rounded-lg"
>
  🔄 Reset
</button>

        )}


      </div>





      {shoppingList.length > 0 && (

        <div className="bg-white rounded-xl shadow p-6">


          <h2 className="text-xl font-semibold mb-4">
            Your Shopping List
          </h2>



          <div className="space-y-6">


            {groupedShoppingList.map((group) => (

              <div key={group.category}>


                <h3 className="text-lg font-bold mb-3">
                  {group.category}
                </h3>



                <ul className="space-y-3">


                  {group.items.map((item, index) => (

<li
  key={index}
  className="flex items-center justify-between border-b pb-2"
>
  <label className="flex items-center gap-3 cursor-pointer flex-1">

    <input
      type="checkbox"
      checked={checkedItems.includes(item.item)}
      onChange={() => {
        setCheckedItems((current) =>
          current.includes(item.item)
            ? current.filter((name) => name !== item.item)
            : [...current, item.item]
        );
      }}
    />

    <span
      className={
        checkedItems.includes(item.item)
          ? "line-through text-slate-400"
          : ""
      }
    >
      {item.item}
    </span>

  </label>

  <span
    className={
      checkedItems.includes(item.item)
        ? "font-medium line-through text-slate-400"
        : "font-medium"
    }
  >
    {item.quantity}
  </span>

</li>
                  ))}


                </ul>


              </div>

            ))}


          </div>


        </div>

      )}


    </main>
  );
}