type IconName = "Calories" | "Protein" | "Potassium" | "Phosphorus" | "Carbohydrates" | "Fat" | "Fibre" | "Salt" | "time" | "servings" | "ingredients" | "method" | "planner" | "heart" | "star" | "filters";

export default function RecipeIcon({ name }: { name: IconName }) {
  const paths: Record<IconName, React.ReactNode> = {
    filters: <><path d="M3 6h18M3 12h18M3 18h18" /><circle cx="8" cy="6" r="2" fill="currentColor" /><circle cx="16" cy="12" r="2" fill="currentColor" /><circle cx="10" cy="18" r="2" fill="currentColor" /></>,
    Calories: <path d="M12 3c1 5 6 6 6 11a6 6 0 0 1-12 0c0-3 2-5 3-6 0 3 1 4 2 4 2-2 2-5 1-9Z" />,
    Protein: <><path d="m6 12 2-7 4-1 2 3-3 2-1-1-1 6c3-3 7-3 9 0 3 5-1 7-5 7H6l-3-4 1-5Z" /><path d="M13 15c1-1 3-1 4 0" /></>,
    Potassium: <><path d="M5 19C0 8 12 4 20 3c0 9-4 18-13 15" /><path d="m4 21 12-13M8 17l1-6m2 3 5-1" /></>,
    Phosphorus: <>{[[9,5],[15,5],[6,11],[12,11],[18,11],[9,17],[15,17]].map(([cx,cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.5" />)}</>,
    Carbohydrates: <><path d="M12 22V3m0 15c-5 0-7-3-6-6 4 0 6 2 6 6Zm0-5c5 0 7-3 6-6-4 0-6 2-6 6Zm0-5C7 8 6 5 7 2c3 0 5 3 5 6Z" /></>,
    Fat: <path d="M12 3C9 8 5 12 5 16a7 7 0 0 0 14 0c0-4-4-8-7-13Z" />,
    Fibre: <><path d="M5 19C0 8 12 4 20 3c0 9-4 18-13 15M4 21 16 8" /></>,
    Salt: <><path d="M8 8h8l2 13H6L8 8Zm0 0V4h8v4M10 4V2m4 2V2" /><path d="M10 12h.01M14 15h.01M10 18h.01" /></>,
    time: <><circle cx="12" cy="12" r="9" /><path d="M12 6v6l4 2" /></>,
    servings: <><path d="M4 3v6c0 3 6 3 6 0V3M7 3v18M20 21V3c-4 0-5 7-5 10h5" /></>,
    ingredients: <><path d="m3 9 2 12h14l2-12H3Zm4 0 5-7 5 7M8 13v4m4-4v4m4-4v4" /></>,
    method: <><path d="M7 14a5 5 0 0 1-2-9 5 5 0 0 1 7-2 5 5 0 0 1 7 2 5 5 0 0 1-2 9v7H7v-7Zm0 3h10" /></>,
    planner: <><rect x="4" y="5" width="16" height="16" rx="2" /><path d="M8 2v6m8-6v6M4 11h16m-12 4h2m4 0h2m-8 3h2" /></>,
    heart: <path d="M20 5c-3-3-6-1-8 1C10 4 7 2 4 5c-4 4 0 8 8 15 8-7 12-11 8-15Z" />,
    star: <path d="m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6Z" />,
  };
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
