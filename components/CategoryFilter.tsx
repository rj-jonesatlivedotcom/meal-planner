type CategoryFilterProps = {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  label?: string;
};

const categoryIcons: Record<string, string> = {
  All: "🍽️",
  Breakfast: "🥣",
  Lunch: "🥪",
  Dinner: "🍽️",
  Chicken: "🍗",
  Beef: "🥩",
  Pork: "🐷",
  Fish: "🐟",
  Vegetarian: "🥕",
};

export default function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  label = "Category",
}: CategoryFilterProps) {
  return (
    <>
      {/* Mobile dropdown */}
      <div className="block md:hidden w-full">

        <label className="block text-sm font-medium mb-2">
          {label}
        </label>

        <select
          value={selectedCategory}
          onChange={(e) =>
            onCategoryChange(e.target.value)
          }
          className="w-full rounded-lg border px-3 py-3 bg-white"
        >
          {categories.map((category) => (
            <option
              key={category}
              value={category}
            >
              {categoryIcons[category] ?? "🍽️"} {category}
            </option>
          ))}
        </select>

      </div>

      {/* Desktop buttons */}
      <div className="hidden md:flex flex-wrap items-center gap-2 flex-1">

        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() =>
              onCategoryChange(category)
            }
            className={`px-4 py-2 rounded-full border transition flex items-center gap-2 ${
              selectedCategory === category
                ? "bg-blue-600 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            <span>
              {categoryIcons[category] ?? "🍽️"}
            </span>

            <span>
              {category}
            </span>
          </button>
        ))}

      </div>
    </>
  );
}