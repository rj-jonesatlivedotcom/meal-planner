import "server-only";
import { additiveConcern, type CategoryProduct } from "./categoryMinerals";
import { identifyFood, rankReferences, referenceNumber, type ReferenceCandidate, type ReferenceResolution } from "./referenceMatching";
import type { PreparationBasis } from "./curatedMinerals";
import type { UsdaFood } from "./usdaData";

export type CofidReferenceRow = { food_code: string; food_name: string; energy_kcal: number | null; protein_g: number | null;
  fat_g: number | null; carbohydrate_g: number | null; potassium_mg: number | null; phosphorus_mg: number | null };
export type ReferenceCache = Map<string, { expires: number; result: Promise<ReferenceResolution> }>;
export function createReferenceSearch(deps: {
  cofid: (term: string) => Promise<CofidReferenceRow[]>;
  usda: (query: string) => Promise<{ status: string; data: UsdaFood[] | null }>;
  cache?: ReferenceCache; now?: () => number;
}) {
  const cache = deps.cache ?? new Map(), now = deps.now ?? Date.now;
  return async (product: CategoryProduct, basis: PreparationBasis, unit: "g" | "ml"): Promise<ReferenceResolution> => {
    const key = JSON.stringify({ product, basis, unit });
    const hit = cache.get(key); if (hit && hit.expires > now()) return hit.result;
    const result = (async () => {
      const identity = identifyFood(product);
      const resolution: ReferenceResolution = { classification: identity?.label ?? null, matches: {}, reasons: {}, searches: [], note: identity?.note };
      if (!identity || unit !== "g" || basis === "unknown") {
        for (const key of ["potassium", "phosphorus"] as const) resolution.reasons[key] = "The food type or preparation/weight basis is not sufficiently described to select a comparable food.";
        return resolution;
      }
      const candidates: ReferenceCandidate[] = [];
      await Promise.all([
        ...identity.terms.slice(0, 2).map(async term => {
          try {
            const rows = await deps.cofid(term);
            resolution.searches.push({ source: "CoFID 2021", query: term, candidates: rows.length, status: "ok" });
            for (const row of rows) candidates.push({ source: "CoFID 2021", code: row.food_code, description: row.food_name,
              potassiumMg: referenceNumber(row.potassium_mg), phosphorusMg: referenceNumber(row.phosphorus_mg),
              macros: { energyKcal: referenceNumber(row.energy_kcal), protein: referenceNumber(row.protein_g), fat: referenceNumber(row.fat_g), carbohydrate: referenceNumber(row.carbohydrate_g) },
              url: "https://www.gov.uk/government/publications/composition-of-foods-integrated-dataset-cofid" });
          } catch { resolution.searches.push({ source: "CoFID 2021", query: term, candidates: 0, status: "unavailable" }); }
        }),
        (async () => {
          try {
            const result = await deps.usda(identity.query);
            resolution.searches.push({ source: "USDA", query: identity.query, candidates: result.data?.length ?? 0, status: result.status });
            for (const row of result.data ?? []) {
              if (row.unit !== "g" || row.dataset === "Branded" || row.completeProductUnclear || !row.macros) continue;
              candidates.push({ source: "USDA", code: String(row.fdcId), description: row.description,
                potassiumMg: row.potassiumMg, phosphorusMg: row.phosphorusMg, macros: row.macros, basis: row.preparation, url: row.url });
            }
          } catch { resolution.searches.push({ source: "USDA", query: identity.query, candidates: 0, status: "unavailable" }); }
        })(),
      ]);
      const unique = [...new Map(candidates.map(c => [c.source + c.code, c])).values()];
      const ranked = rankReferences(product, identity, unique, basis);
      for (const nutrient of ["potassium", "phosphorus"] as const) {
        const concern = additiveConcern(product, nutrient);
        if (concern) { resolution.reasons[nutrient] = concern; continue; }
        const selected = ranked.find(({ candidate }) => {
          const value = nutrient === "potassium" ? candidate.potassiumMg : candidate.phosphorusMg;
          return typeof value === "number" && Number.isFinite(value) && value >= 0;
        });
        if (selected) resolution.matches[nutrient] = selected.candidate;
        else resolution.reasons[nutrient] = resolution.searches.some(s => s.status !== "ok")
          ? "A reference search was unavailable, and the remaining candidates did not support this mineral."
          : "Reference candidates were searched, but none matched the food type, preparation and available nutrition closely enough.";
      }
      return resolution;
    })();
    if (cache.size >= 128) cache.delete(cache.keys().next().value!);
    cache.set(key, { expires: now() + 60000, result });
    const resolved = await result;
    if (cache.get(key)?.result === result)
      cache.set(key, { expires: now() + (Object.keys(resolved.matches).length && resolved.searches.every(s => s.status === "ok") ? 86400000 : 60000), result });
    return resolved;
  };
}
