"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { recipes } from "@/data/recipes";

type ShoppingItem = {
  item: string;
  shoppingItem?: string;
  quantity: string;
};

const ingredientCategories: Record<string, string> = {
  // 🥩 Meat & Fish
  "freshly ground black pepper": "🧂 Herbs & Spices",
  gravy: "🥫 Cupboard",
  stock: "🥫 Cupboard",
  chicken: "🥩 Meat & Fish",
  beef: "🥩 Meat & Fish",
  mince: "🥩 Meat & Fish",
  sausage: "🥩 Meat & Fish",
  bacon: "🥩 Meat & Fish",
  salmon: "🥩 Meat & Fish",
  tuna: "🥩 Meat & Fish",
  fish: "🥩 Meat & Fish",
  "tomato purée": "🥫 Cupboard",

  // 🥕 Fruit & Vegetables
  onion: "🥕 Fruit & Vegetables",
  "red onion": "🥕 Fruit & Vegetables",
  "white onion": "🥕 Fruit & Vegetables",
  "spring onion": "🥕 Fruit & Vegetables",

  garlic: "🥕 Fruit & Vegetables",

  pepper: "🥕 Fruit & Vegetables",
  "red pepper": "🥕 Fruit & Vegetables",
  "green pepper": "🥕 Fruit & Vegetables",
  "yellow pepper": "🥕 Fruit & Vegetables",

  tomato: "🥕 Fruit & Vegetables",

  potato: "🥕 Fruit & Vegetables",
  potatoes: "🥕 Fruit & Vegetables",
  "floury potato": "🥕 Fruit & Vegetables",
  "floury potatoes": "🥕 Fruit & Vegetables",

  carrot: "🥕 Fruit & Vegetables",
  broccoli: "🥕 Fruit & Vegetables",
  mushroom: "🥕 Fruit & Vegetables",
  courgette: "🥕 Fruit & Vegetables",
  spinach: "🥕 Fruit & Vegetables",
  lettuce: "🥕 Fruit & Vegetables",
  beans: "🥕 Fruit & Vegetables",

  lemon: "🥕 Fruit & Vegetables",
  lime: "🥕 Fruit & Vegetables",

  // 🧊 Chilled
  cheese: "🧊 Chilled",
  cheddar: "🧊 Chilled",
  parmesan: "🧊 Chilled",
  mozzarella: "🧊 Chilled",
  yoghurt: "🧊 Chilled",
  cream: "🧊 Chilled",
  milk: "🧊 Chilled",
  butter: "🧊 Chilled",

  // ❄️ Frozen
  peas: "❄️ Frozen",

  // 🍞 Bakery
  bread: "🍞 Bakery",
  bun: "🍞 Bakery",
  roll: "🍞 Bakery",
  wrap: "🍞 Bakery",
  tortilla: "🍞 Bakery",
  pitta: "🍞 Bakery",
  naan: "🍞 Bakery",
  bagel: "🍞 Bakery",

  // 🥫 Cupboard
  passata: "🥫 Cupboard",
  pasta: "🥫 Cupboard",
  penne: "🥫 Cupboard",
  spaghetti: "🥫 Cupboard",
  rice: "🥫 Cupboard",

  flour: "🥫 Cupboard",
  breadcrumbs: "🥫 Cupboard",

  olive: "🥫 Cupboard",
  worcestershire: "🥫 Cupboard",
  honey: "🥫 Cupboard",
  mustard: "🥫 Cupboard",
  seasoning: "🥫 Cupboard",

  // 🧂 Herbs & Spices
  thyme: "🧂 Herbs & Spices",
  rosemary: "🧂 Herbs & Spices",
  oregano: "🧂 Herbs & Spices",
  basil: "🧂 Herbs & Spices",
  parsley: "🧂 Herbs & Spices",
  paprika: "🧂 Herbs & Spices",
  cumin: "🧂 Herbs & Spices",
  turmeric: "🧂 Herbs & Spices",
  coriander: "🧂 Herbs & Spices",
  "mixed herbs": "🧂 Herbs & Spices",
  "curry powder": "🧂 Herbs & Spices",
  "chilli flakes": "🧂 Herbs & Spices",
  "black pepper": "🧂 Herbs & Spices",
  salt: "🧂 Herbs & Spices",
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
    value = value.trim();

    const fractionValues: Record<string, number> = {
      "¼": 0.25,
      "½": 0.5,
      "¾": 0.75,
    };

    if (fractionValues[value] !== undefined) {
      return fractionValues[value];
    }

    const mixed = value.match(/^(\d+)([¼½¾])$/);

    if (mixed) {
      const whole = Number(mixed[1]);
      const fraction = fractionValues[mixed[2]];

      return whole + fraction;
    }

    const number = Number(value);

    if (!isNaN(number)) {
      return number;
    }

    return null;
  }

  function decimalToFraction(value: number): string {
    const whole = Math.floor(value);

    const fraction =
      Math.round((value - whole) * 100) / 100;

    if (fraction === 0) {
      return `${whole}`;
    }

    const fractionMap: Record<number, string> = {
      0.25: "¼",
      0.5: "½",
      0.75: "¾",
    };

    const fractionText =
      fractionMap[fraction];

    if (!fractionText) {
      return value.toString();
    }

    if (whole === 0) {
      return fractionText;
    }

    return `${whole}${fractionText}`;
  }

  const unitConversions = {
    tsp: {
      base: "tsp",
      factor: 1,
    },

    tbsp: {
      base: "tsp",
      factor: 3,
    },

    ml: {
      base: "ml",
      factor: 1,
    },

    l: {
      base: "ml",
      factor: 1000,
    },

    g: {
      base: "g",
      factor: 1,
    },

    kg: {
      base: "g",
      factor: 1000,
    },
  } as const;

  function convertToBaseUnit(
    amount: number,
    unit: string
  ) {
    const conversion =
      unitConversions[
        unit as keyof typeof unitConversions
      ];

    if (!conversion) {
      return {
        amount,
        unit,
      };
    }

    return {
      amount: amount * conversion.factor,
      unit: conversion.base,
    };
  }

  function scaleQuantity(quantity: string): string {
    const match = quantity.match(
      /^(\d+[¼½¾]?|[¼½¾])\s*(.*)$/
    );

    if (!match) {
      return quantity;
    }

    const value =
      fractionToDecimal(match[1]);

    if (value === null) {
      return quantity;
    }

    const scaled =
      value * people;

    const unit =
      match[2];

    const noSpaceUnits = [
      "g",
      "kg",
      "ml",
      "l",
    ];

    const amount =
      decimalToFraction(scaled);

    return noSpaceUnits.includes(unit)
      ? `${amount}${unit}`
      : `${amount} ${unit}`;
  }

  function normaliseIngredient(item: string): string {
    const removePreparation = [
      ", diced",
      ", sliced",
      ", chopped",
      ", finely chopped",
      ", roughly chopped",
      ", crushed",
      ", minced",
      ", grated",
      ", cubed",
      ", trimmed",
      ", peeled",
      ", halved",
      ", quartered",
      ", cut into bite-sized pieces",
      ", cut into strips",
    ];

    let result = item;

    removePreparation.forEach((text) => {
      result = result.replace(text, "");
    });

    return result.trim();
  }

  function combineIngredients(
    ingredients: ShoppingItem[]
  ): ShoppingItem[] {
    const combined: ShoppingItem[] = [];

    ingredients.forEach((ingredient) => {
      const shoppingName =
        normaliseIngredient(
          ingredient.shoppingItem ?? ingredient.item
        );

      const existing = combined.find(
        (item) =>
          normaliseIngredient(item.item).toLowerCase() ===
          shoppingName.toLowerCase()
      );

      if (!existing) {
        combined.push({
          item: shoppingName,
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

      const existingMatch =
        existing.quantity.match(
          /^(\d+[¼½¾]?|[¼½¾])\s*(.*)$/
        );

      const newMatch =
        ingredient.quantity.match(
          /^(\d+[¼½¾]?|[¼½¾])\s*(.*)$/
        );

      if (existingMatch && newMatch) {
        const firstValue =
          fractionToDecimal(existingMatch[1]);

        const secondValue =
          fractionToDecimal(newMatch[1]);

        if (
          firstValue === null ||
          secondValue === null
        ) {
          existing.quantity =
            `${existing.quantity}, ${ingredient.quantity}`;

          return;
        }

        const converted1 =
          convertToBaseUnit(
            firstValue,
            existingMatch[2].trim()
          );

        const converted2 =
          convertToBaseUnit(
            secondValue,
            newMatch[2].trim()
          );

        if (
          converted1 &&
          converted2 &&
          converted1.unit === converted2.unit
        ) {
          const total =
            converted1.amount +
            converted2.amount;

          const amount =
            decimalToFraction(total);

          const noSpaceUnits = [
            "g",
            "kg",
            "ml",
            "l",
          ];

          existing.quantity =
            noSpaceUnits.includes(converted1.unit)
              ? `${amount}${converted1.unit}`
              : `${amount} ${converted1.unit}`;

          return;
        }
      }

      existing.quantity =
        `${existing.quantity}, ${ingredient.quantity}`;
    });

    return combined;
  }

  function resetShopping() {
    setSelectedRecipes([]);
    setShoppingList([]);
    setCheckedItems([]);
  }

  const categoryOrder = [
    "🥩 Meat & Fish",
    "🥕 Fruit & Vegetables",
    "🧊 Chilled",
    "❄️ Frozen",
    "🍞 Bakery",
    "🥫 Cupboard",
    "🧂 Herbs & Spices",
    "Other",
  ];

  // Load saved shopping data.
  useEffect(() => {
    const saved =
      localStorage.getItem("shopping-data");

    if (saved) {
      try {
        const data = JSON.parse(saved);

        setSelectedRecipes(
          data.selectedRecipes ?? []
        );

        setShoppingList(
          data.shoppingList ?? []
        );

        setCheckedItems(
          data.checkedItems ?? []
        );

        setPeople(
          data.people ?? 1
        );
      } catch {
        // Ignore invalid saved data.
      }
    }

    setLoaded(true);
  }, []);

  // Automatically regenerate the shopping list whenever
  // selected meals or number of people changes.
  useEffect(() => {
    if (!loaded) return;

    const ingredients = recipes
      .filter((recipe) =>
        selectedRecipes.includes(recipe.id)
      )
      .flatMap((recipe) =>
        recipe.ingredients.map((ingredient) => ({
          item:
            ingredient.shoppingItem ??
            ingredient.item,
          quantity:
            scaleQuantity(ingredient.quantity),
        }))
      );

    const newShoppingList =
      combineIngredients(ingredients);

    setShoppingList(newShoppingList);

    // Keep checked items that still exist.
    setCheckedItems((current) =>
      current.filter((name) =>
        newShoppingList.some(
          (item) => item.item === name
        )
      )
    );
  }, [
    loaded,
    selectedRecipes,
    people,
  ]);

  // Save current state.
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
            setPeople(
              Number(e.target.value)
            )
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
                  selectedRecipes.includes(
                    recipe.id
                  )
                }
                onChange={() =>
                  toggleRecipe(recipe.id)
                }
              />

              <div className="flex flex-col">

                <div className="flex items-center gap-4">

                  <Image
                    src={recipe.image}
                    alt={recipe.name}
                    width={72}
                    height={72}
                    className="w-[72px] h-[72px] rounded-lg object-cover border border-gray-200"
                  />

                  <div>

                    <span className="font-semibold text-slate-900">
                      {recipe.name}
                    </span>

                    <span className="text-sm text-slate-500">
                      ⏱️{" "}
                      {recipe.cookingTime.replace(
                        " minutes",
                        " min"
                      )}{" "}
                      • 🔥{" "}
                      {recipe.nutrition.calories}{" "}
                      •{" "}
                      <Link
                        href={`/recipes/${recipe.id}`}
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                        onClick={(e) =>
                          e.stopPropagation()
                        }
                      >
                        📖 Recipe
                      </Link>
                    </span>

                  </div>

                </div>

              </div>

            </label>

          ))}

        </div>

        {selectedRecipes.length === 0 ? (
          <p className="mt-6 text-sm text-slate-500">
            🛒 Select one or more meals above and
            your shopping list will appear
            automatically.
          </p>
        ) : (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">

            <p className="text-sm text-slate-500">
              ✓ {selectedRecipes.length} meal
              {selectedRecipes.length === 1
                ? ""
                : "s"} selected — shopping list
              updated automatically.
            </p>

            <button
              onClick={resetShopping}
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg text-sm"
            >
              🔄 Reset
            </button>

          </div>
        )}

      </div>

      {shoppingList.length > 0 && (

        <div className="bg-white rounded-xl shadow p-6">

          <div className="flex items-center justify-between gap-3 mb-4">

            <h2 className="text-xl font-semibold">
              🛒 Your Shopping List
            </h2>

            <span className="text-sm text-slate-500">
  {selectedRecipes.length} meal
  {selectedRecipes.length === 1
    ? ""
    : "s"} •{" "}
  {people}{" "}
  {people === 1 ? "person" : "people"} •{" "}
  {shoppingList.length} item
  {shoppingList.length === 1
    ? ""
    : "s"}
</span>

          </div>

          <div className="space-y-6">

            {groupedShoppingList.map((group) => (

              <div key={group.category}>

                <h3 className="text-lg font-bold mb-3">
                  {group.category}
                </h3>

                <ul className="space-y-3">

                  {group.items.map(
                    (item, index) => (

                      <li
                        key={index}
                        className="flex items-center justify-between border-b pb-2"
                      >

                        <label className="flex items-center gap-3 cursor-pointer flex-1">

                          <input
                            type="checkbox"
                            checked={checkedItems.includes(
                              item.item
                            )}
                            onChange={() => {
                              setCheckedItems(
                                (current) =>
                                  current.includes(
                                    item.item
                                  )
                                    ? current.filter(
                                        (name) =>
                                          name !==
                                          item.item
                                      )
                                    : [
                                        ...current,
                                        item.item,
                                      ]
                              );
                            }}
                          />

                          <span
                            className={
                              checkedItems.includes(
                                item.item
                              )
                                ? "line-through text-slate-400"
                                : ""
                            }
                          >
                            {item.item}
                          </span>

                        </label>

                        <span
                          className={
                            checkedItems.includes(
                              item.item
                            )
                              ? "font-medium line-through text-slate-400"
                              : "font-medium"
                          }
                        >
                          {item.quantity}
                        </span>

                      </li>

                    )
                  )}

                </ul>

              </div>

            ))}

          </div>

        </div>

      )}

    </main>
  );
}