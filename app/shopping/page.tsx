"use client";

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
  sirloin: "🥩 Meat & Fish",
  "pork loin": "🥩 Meat & Fish",
  cod: "🥩 Meat & Fish",
  "tomato purée": "🥫 Cupboard",
  couscous: "🥫 Cupboard",
  cornflour: "🥫 Cupboard",
  sweetcorn: "🥫 Cupboard",

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
  apple: "🥕 Fruit & Vegetables",
  apples: "🥕 Fruit & Vegetables",

  // 🧊 Chilled
  cheese: "🧊 Chilled",
  cheddar: "🧊 Chilled",
  parmesan: "🧊 Chilled",
  mozzarella: "🧊 Chilled",
  yoghurt: "🧊 Chilled",
  cream: "🧊 Chilled",
  milk: "🧊 Chilled",
  butter: "🧊 Chilled",
  "crème fraîche": "🧊 Chilled",

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
  ginger: "🧂 Herbs & Spices",
  sage: "🧂 Herbs & Spices",
  dill: "🧂 Herbs & Spices",
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

  function normaliseUnit(unit: string): string {
    const cleaned = unit.trim().toLowerCase();

    const aliases: Record<string, string> = {
      "clove": "clove",
      "cloves": "clove",
      "tsp": "tsp",
      "tsps": "tsp",
      "teaspoon": "tsp",
      "teaspoons": "tsp",
      "tbsp": "tbsp",
      "tbsps": "tbsp",
      "tablespoon": "tbsp",
      "tablespoons": "tbsp",
      "ml": "ml",
      "l": "l",
      "g": "g",
      "kg": "kg",
      "small": "small",
      "medium": "medium",
      "large": "large",
      "small handful": "small handful",
      "small handfuls": "small handful",
    };

    return aliases[cleaned] ?? unit.trim();
  }

  function formatQuantity(amount: number, unit: string): string {
    const normalisedUnit = normaliseUnit(unit);
    const rounded =
      Math.round(amount * 100) / 100;

    const amountText =
      decimalToFraction(rounded);

    const noSpaceUnits = [
      "g",
      "kg",
      "ml",
      "l",
    ];

    if (normalisedUnit === "clove") {
      return rounded === 1
        ? `${amountText} clove`
        : `${amountText} cloves`;
    }

    if (normalisedUnit === "small handful") {
      return rounded === 1
        ? `${amountText} small handful`
        : `${amountText} small handfuls`;
    }

    return noSpaceUnits.includes(normalisedUnit)
      ? `${amountText}${normalisedUnit}`
      : `${amountText} ${normalisedUnit}`;
  }

  function scaleQuantity(
    quantity: string,
    recipeServings: number = 1
  ): string {
    const parsed = parseQuantity(quantity);

    if (!parsed) {
      return quantity;
    }

    const scaled =
      (parsed.amount * people) / recipeServings;

    return formatQuantity(
      scaled,
      parsed.unit
    );
  }

  function parseQuantity(quantity: string) {
    const multipliedMatch = quantity.match(
      /^(\d+(?:\.\d+)?)\s*[×x]\s*(\d+(?:\.\d+)?(?:[¼½¾])?)\s*(.*)$/i
    );

    if (multipliedMatch) {
      const count = Number(multipliedMatch[1]);
      const each = fractionToDecimal(
        multipliedMatch[2]
      );

      if (each === null) {
        return null;
      }

      return {
        amount: count * each,
        unit: normaliseUnit(
          multipliedMatch[3]
        ),
      };
    }

    const trimmedQuantity = quantity.trim();

    if (
      normaliseUnit(trimmedQuantity) ===
      "small handful"
    ) {
      return {
        amount: 1,
        unit: "small handful",
      };
    }

    const match = trimmedQuantity.match(
      /^(\d+(?:\.\d+)?(?:[¼½¾])?|[¼½¾])\s*(.*)$/
    );

    if (!match) {
      return null;
    }

    let amount = fractionToDecimal(match[1]);

    if (amount === null) {
      return null;
    }

    // Support values such as 1.5½, although normal recipe
    // quantities will normally use either decimals or fractions.
    const decimalFraction = match[1].match(
      /^(\d+(?:\.\d+)?)([¼½¾])$/
    );

    if (decimalFraction) {
      const whole = Number(decimalFraction[1]);
      const fraction = fractionToDecimal(
        decimalFraction[2]
      );

      if (fraction !== null) {
        amount = whole + fraction;
      }
    }

    return {
      amount,
      unit: normaliseUnit(match[2]),
    };
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

    const lower = result.trim().toLowerCase();

    // Keep lemon juice/zest separate from whole lemons.
    if (lower.includes("lemon juice")) {
      return "Lemon juice";
    }

    if (lower.includes("lemon zest")) {
      return "Lemon zest";
    }

    // Standardise common shopping names.
    if (lower === "potato" || lower === "potatoes") {
      return "Potatoes";
    }

    if (lower === "onion" || lower === "onions") {
      return "Onion";
    }

    if (lower === "red pepper" || lower === "red peppers") {
      return "Red pepper";
    }

    if (
      lower === "green pepper" ||
      lower === "green peppers"
    ) {
      return "Green pepper";
    }

    if (
      lower === "yellow pepper" ||
      lower === "yellow peppers"
    ) {
      return "Yellow pepper";
    }

    if (lower === "lemon" || lower === "lemons") {
      return "Lemon";
    }

    return result.trim();
  }

  function normaliseSizedProduce(
    item: string,
    quantity: string
  ): string {
    const name = normaliseIngredient(item).toLowerCase();

    const sizedItems = [
      "onion",
      "red pepper",
      "green pepper",
      "yellow pepper",
    ];

    if (!sizedItems.includes(name)) {
      return quantity;
    }

    const parsed = parseQuantity(quantity);

    if (!parsed) {
      return quantity;
    }

    let multiplier = 1;

    switch (parsed.unit) {
      case "small":
        multiplier = 0.5;
        break;
      case "medium":
        multiplier = 1;
        break;
      case "large":
        multiplier = 1.5;
        break;
      default:
        // A bare number is already a medium-sized item.
        if (parsed.unit !== "") {
          return quantity;
        }
    }

    return formatQuantity(
      parsed.amount * multiplier,
      ""
    );
  }

  function normaliseLemonQuantity(
    item: string,
    quantity: string
  ): string {
    if (
      normaliseIngredient(item).toLowerCase() !==
      "lemon"
    ) {
      return quantity;
    }

    const parsed = parseQuantity(quantity);

    if (!parsed) {
      return quantity;
    }

    // Fresh lemon quantities such as "½ lemon" or a bare "¼"
    // are shopping quantities for whole lemons. Store them as
    // a plain count so they combine cleanly with whole lemons.
    if (
      parsed.unit === "lemon" ||
      parsed.unit === ""
    ) {
      return decimalToFraction(parsed.amount);
    }

    return quantity;
  }

  function combineIngredients(
    ingredients: ShoppingItem[]
  ): ShoppingItem[] {
    const combined: ShoppingItem[] = [];

    function addQuantity(
      current: string,
      incoming: string
    ): string {
      const currentLower = current.toLowerCase().trim();
      const incomingLower = incoming.toLowerCase().trim();

      if (
        incomingLower === "to taste" ||
        incomingLower === "as required"
      ) {
        return current;
      }

      if (
        currentLower === "to taste" ||
        currentLower === "as required"
      ) {
        return incoming;
      }

      // A combined item can contain several incompatible quantities,
      // e.g. "18, 2 small". Work on each part separately so later
      // quantities can still combine with a compatible part.
      const parts = current
        .split(",")
        .map((part) => part.trim())
        .filter(Boolean);

      const incomingParsed = parseQuantity(incoming);

      if (!incomingParsed) {
        return `${current}, ${incoming}`;
      }

      for (let i = 0; i < parts.length; i++) {
        const existingParsed =
          parseQuantity(parts[i]);

        if (!existingParsed) {
          continue;
        }

        const converted1 =
          convertToBaseUnit(
            existingParsed.amount,
            existingParsed.unit
          );

        const converted2 =
          convertToBaseUnit(
            incomingParsed.amount,
            incomingParsed.unit
          );

        if (converted1.unit === converted2.unit) {
          const total =
            converted1.amount +
            converted2.amount;

          parts[i] =
            formatQuantity(
              total,
              converted1.unit
            );

          return parts.join(", ");
        }
      }

      return `${current}, ${incoming}`;
    }

    ingredients.forEach((ingredient) => {
      const rawItem =
        ingredient.item?.trim() ?? "";

      // "No added salt" is a dietary instruction, not something
      // the shopper needs to buy.
      if (
        rawItem.toLowerCase() === "no added salt"
      ) {
        return;
      }

      // Keep whole lemon, lemon juice and lemon zest separate.
      // Some older recipes use shoppingItem: "Lemon" for juice/zest,
      // so the recipe's actual item name takes priority here.
      const lowerItem = rawItem.toLowerCase();

      const parsedQuantity =
        parseQuantity(ingredient.quantity);

      const isFreshLemonQuantity =
        lowerItem.includes("lemon juice") &&
        parsedQuantity !== null &&
        (
          parsedQuantity.unit === "lemon" ||
          parsedQuantity.unit === ""
        );

      const sourceName =
        lowerItem.includes("lemon juice")
          ? isFreshLemonQuantity
            ? "Lemon"
            : "Lemon juice"
          : lowerItem.includes("lemon zest")
            ? "Lemon zest"
            : lowerItem === "fresh parsley" ||
                lowerItem === "fresh basil or parsley" ||
                lowerItem === "basil or parsley"
              ? "Parsley"
              : ingredient.shoppingItem ?? rawItem;

      const shoppingName =
        normaliseIngredient(sourceName);

      const shoppingQuantity =
        normaliseLemonQuantity(
          shoppingName,
          normaliseSizedProduce(
            shoppingName,
            ingredient.quantity
          )
        );

      const normalisedIngredient = {
        ...ingredient,
        quantity: shoppingQuantity,
      };

      const existing = combined.find(
        (item) =>
          normaliseIngredient(item.item).toLowerCase() ===
          shoppingName.toLowerCase()
      );

      if (!existing) {
        combined.push({
          item: shoppingName,
          quantity: normalisedIngredient.quantity,
        });

        return;
      }

      existing.quantity =
        addQuantity(
          existing.quantity,
          normalisedIngredient.quantity
        );
    });

    return combined;
  }


  function resetShopping() {
    setSelectedRecipes([]);
    setShoppingList([]);
    setCheckedItems([]);
  }
function uncheckAll() {
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

  // Automatically regenerate the shopping list
  // whenever the selected meals or number of people changes.
  useEffect(() => {
    if (!loaded) return;

    const ingredients = recipes
      .filter((recipe) =>
        selectedRecipes.includes(recipe.id)
      )
      .flatMap((recipe) =>
        recipe.ingredients
          .filter(
            (ingredient) =>
              ingredient.item.trim().toLowerCase() !== "water"
          )
          .map((ingredient) => ({
            item: ingredient.item,
            shoppingItem: ingredient.shoppingItem,
            quantity:
              scaleQuantity(
                ingredient.quantity,
                recipe.code >= "D016" ? 4 : 1
              ),
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
        🛒 Shopping List
      </h1>

      <div className="bg-white rounded-xl shadow p-6">

        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">

          <div>
            <h2 className="text-xl font-semibold">
              Cooking for:
            </h2>

            <select
              value={people}
              onChange={(e) =>
                setPeople(
                  Number(e.target.value)
                )
              }
              className="border rounded-lg px-4 py-2 mt-2"
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
              <option value={5}>
  5 people
</option>

<option value={6}>
  6 people
</option>

<option value={7}>
  7 people
</option>

<option value={8}>
  8 people
</option>
            </select>
          </div>

          {selectedRecipes.length > 0 && (
            <div className="text-sm text-slate-500 text-right">
              <div>
                {selectedRecipes.length} meal
                {selectedRecipes.length === 1
                  ? ""
                  : "s"} •{" "}
                {people}{" "}
                {people === 1
                  ? "person"
                  : "people"}{" "}
                •{" "}
                {shoppingList.length} item
                {shoppingList.length === 1
                  ? ""
                  : "s"}
              </div>

              <div className="flex gap-2">

  <button
    onClick={uncheckAll}
    className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg text-sm text-black"
  >
    ☐ Uncheck All
  </button>

  <button
    onClick={resetShopping}
    className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg text-sm text-black"
  >
    🗑️ Clear All
  </button>

</div>
            </div>
          )}

        </div>

        {shoppingList.length === 0 ? (

          <div className="py-12 text-center">

            <div className="text-5xl mb-4">
              🛒
            </div>

            <h2 className="text-xl font-semibold text-slate-900">
              Your shopping list is empty
            </h2>

            <p className="mt-3 text-slate-500">
              Choose meals from the Recipes page
              and add them to your shopping list.
            </p>

          </div>

        ) : (

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

        )}

      </div>

    </main>
  );
}