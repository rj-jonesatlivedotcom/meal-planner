import styles from "./recipe-design.module.css";
import RecipeIcon from "./RecipeIcon";

export default function RecipeNutrition({ values, detailed = false, estimated = false, unavailableLabels = [] }: {
  values: [string, string | undefined][];
  detailed?: boolean;
  estimated?: boolean;
  unavailableLabels?: readonly string[];
}) {
  return (
    <dl className={`${styles.nutrition} ${detailed ? styles.detailedNutrition : ""}`} aria-label="Nutrition per serving">
      {values.map(([label, value]) => {
        const available = !unavailableLabels.includes(label) && Boolean(value && /\d/.test(value));
        return (
        <div key={label} data-nutrient={label}>
          <RecipeIcon name={label as Parameters<typeof RecipeIcon>[0]["name"]} />
          <dt>{label}{" "}{(detailed || estimated || unavailableLabels.length > 0) && (!available || estimated) ? <span className={styles.nutritionStatus}>{available ? "Estimated" : "Unavailable"}</span> : null}</dt>
          <dd>{available ? value : "—"}</dd>
        </div>
        );
      })}
    </dl>
  );
}
