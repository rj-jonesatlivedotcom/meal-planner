type CategoryFilterProps = {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
};
const categoryIcons: Record<string, string> = {
  All: "🍽️",
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
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 flex-1">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full border transition flex items-center gap-2 ${
            selectedCategory === category
              ? "bg-blue-600 text-white"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          <span>{categoryIcons[category]}</span>
          <span>{category}</span>
        </button>
      ))}
    </div>
  );
}