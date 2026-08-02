"use client";

import { useEffect, useState } from "react";

const recipes = [
  "",
  "Chicken Curry",
  "Cottage Pie",
  "Chicken Arrabbiata",
  "Spaghetti Bolognese",
  "Lemon & Herb Chicken",
  "Chicken Fajitas",
  "Roast Chicken",
  "Honey & Mustard Chicken",
  "Homemade Beef Burgers",
  "Beef Meatballs",
  "Chilli Con Carne",
  "Sausage Mash & Gravy",
  "Salmon Lemon & Herbs",
  "Tuna Pasta Bake",
  "Mediterranean Chicken",
];

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

type MealPlan = Record<string, string>;

export default function PlannerPage() {
  const [plan, setPlan] = useState<MealPlan>({});

  useEffect(() => {
    const saved = localStorage.getItem("meal-plan");

    if (saved) {
      setPlan(JSON.parse(saved));
    } else {
      const emptyPlan = days.reduce(
        (acc, day) => ({ ...acc, [day]: "" }),
        {}
      );

      setPlan(emptyPlan);
    }
  }, []);

  function update(day: string, recipe: string) {
    const updated = {
      ...plan,
      [day]: recipe,
    };

    setPlan(updated);

    localStorage.setItem(
      "meal-plan",
      JSON.stringify(updated)
    );
  }

  if (Object.keys(plan).length === 0) {
    return null;
  }

  return (
    <main className="max-w-4xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        Weekly Meal Planner
      </h1>

      <div className="space-y-5">

        {days.map((day) => (
          <div
            key={day}
            className="flex justify-between items-center bg-white rounded-xl shadow p-4"
          >
            <strong className="w-32">
              {day}
            </strong>

            <select
              className="border rounded p-2 w-72"
              value={plan[day]}
              onChange={(e) =>
                update(day, e.target.value)
              }
            >
              {recipes.map((recipe) => (
                <option key={recipe} value={recipe}>
                  {recipe || "Choose meal..."}
                </option>
              ))}
            </select>
          </div>
        ))}

      </div>

    </main>
  );
}