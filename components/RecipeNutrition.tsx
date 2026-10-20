import styles from "./recipe-design.module.css";

export default function RecipeNutrition({ values }: {
  values: [string, string | undefined][];
}) {
  return (
    <dl className={styles.nutrition} aria-label="Nutrition per serving">
      {values.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value || "—"}</dd>
        </div>
      ))}
    </dl>
  );
}
