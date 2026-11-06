/** Shared by the visible method and its JSON-LD deep links. */
export function recipeStepId(index: number) {
  return `recipe-step-${index + 1}`;
}

/** Use the opening instruction verbatim, shortening only the schema title. */
export function recipeStepName(instruction: string) {
  const opening = instruction.trim().split(/\.(?=\s|$)|;/)[0].trim();
  if (opening.length <= 80) return opening;
  const shortened = opening.slice(0, 77).replace(/\s+\S*$/, "");
  return `${shortened}…`;
}
