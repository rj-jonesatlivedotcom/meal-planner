import styles from "./recipe-design.module.css";
import RecipeIcon from "./RecipeIcon";

export default function RecipeNutrition({ values, detailed = false }: {
  values: [string, string | undefined][];
  detailed?: boolean;
}) {
  return (
    <dl className={`${styles.nutrition} ${detailed ? styles.detailedNutrition : ""}`} aria-label="Nutrition per serving">
      {values.map(([label, value]) => (
        <div key={label} data-nutrient={label}>
          <RecipeIcon name={label as Parameters<typeof RecipeIcon>[0]["name"]} />
          <dt>{label}</dt>
          <dd>{value || "—"}</dd>
        </div>
      ))}
    </dl>
  );
}
