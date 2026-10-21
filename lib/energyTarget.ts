export type TargetRangeStatus = "Below target" | "Within target" | "Exceeds target";
export type EnergyTargetStatus = TargetRangeStatus;

/** Assessment only: never changes meal selection or saved requirements. */
export function classifyTargetRange(
  actual: number,
  min?: number | null,
  max?: number | null,
): TargetRangeStatus | null {
  const hasMin = min != null && Number.isFinite(min);
  const hasMax = max != null && Number.isFinite(max);
  if (!hasMin && !hasMax) return null;
  if (!Number.isFinite(actual)) return null;
  if (hasMin && actual < min) return "Below target";
  if (hasMax && actual > max) return "Exceeds target";
  return "Within target";
}

export { classifyTargetRange as classifyEnergyTarget };
