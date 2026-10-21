/** Display whitespace only; preserve product spelling, casing and stored identity. */
export function displayFoodName(name: string): string {
  return name.replace(/\s+/g, " ").trim();
}
