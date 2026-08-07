type RecipeSearchProps = {
  searchText: string;
  onSearchChange: (value: string) => void;
  onClose: () => void;
};

export default function RecipeSearch({
  searchText,
  onSearchChange,
  onClose,
}: RecipeSearchProps) {
  return (
    <div className="relative">
      {/* Search icon */}
      <span
        className="
          absolute
          left-3
          top-1/2
          -translate-y-1/2
          text-gray-400
          pointer-events-none
        "
      >
        🔍
      </span>

      <input
        type="text"
        placeholder="Search meals or ingredients..."
        value={searchText}
        autoFocus
        onChange={(e) => onSearchChange(e.target.value)}
        onBlur={() => {
          onClose();
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            onSearchChange("");
            onClose();
          }
        }}
        className="
          border
          rounded-full
          pl-10
          pr-10
          py-2
          w-full
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          transition-all
          duration-200
        "
      />

      {searchText && (
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => onSearchChange("")}
          className="
            absolute
            right-2
            top-1/2
            -translate-y-1/2
            w-6
            h-6
            rounded-full
            bg-red-500
            text-white
            text-xs
            font-bold
            flex
            items-center
            justify-center
            hover:bg-red-600
            transition
          "
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}