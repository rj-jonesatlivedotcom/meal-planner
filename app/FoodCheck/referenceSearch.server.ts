import "server-only";
import { type CategoryProduct } from "./categoryMinerals";
import { identifyFood, normaliseFood, rankReferences, selectReferenceGroup, referenceNumber, type ReferenceCandidate, type ReferenceResolution } from "./referenceMatching";
import type { PreparationBasis } from "./curatedMinerals";
import type { UsdaFood } from "./usdaData";
import { supplementalReferences } from "./supplementalReferences";

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
      const identity = identifyFood(product, basis);
      const resolution: ReferenceResolution = { classification: identity?.label ?? null, matches: {}, comparables: {}, reasons: {}, searches: [], note: identity?.note };
      if (!identity || unit !== "g" || basis === "unknown") {
        for (const key of ["potassium", "phosphorus"] as const) resolution.reasons[key] = "The food type or preparation/weight basis is not sufficiently described to select a comparable food.";
        return resolution;
      }
      const candidates: ReferenceCandidate[] = supplementalReferences(product, basis);
      const seenTerms = new Set<string>(), seenQueries = new Set<string>();
      const cofidSearch = async (term: string) => {
          if (seenTerms.has(term)) return;
          seenTerms.add(term);
          try {
            const rows = await deps.cofid(term);
            resolution.searches.push({ source: "CoFID 2021", query: term, candidates: rows.length, status: "ok" });
            for (const row of rows) candidates.push({ source: "CoFID 2021", code: row.food_code, description: row.food_name,
              potassiumMg: referenceNumber(row.potassium_mg), phosphorusMg: referenceNumber(row.phosphorus_mg),
              macros: { energyKcal: referenceNumber(row.energy_kcal), protein: referenceNumber(row.protein_g), fat: referenceNumber(row.fat_g), carbohydrate: referenceNumber(row.carbohydrate_g) },
              url: "https://www.gov.uk/government/publications/composition-of-foods-integrated-dataset-cofid" });
          } catch { resolution.searches.push({ source: "CoFID 2021", query: term, candidates: 0, status: "unavailable" }); }
      };
      const usdaSearch = async (query: string) => {
          if (seenQueries.has(query)) return;
          seenQueries.add(query);
          try {
            const result = await deps.usda(query);
            resolution.searches.push({ source: "USDA", query, candidates: result.data?.length ?? 0, status: result.status });
            for (const row of result.data ?? []) {
              if (row.unit !== "g" || row.dataset === "Branded" || row.completeProductUnclear || !row.macros) continue;
              candidates.push({ source: "USDA", code: String(row.fdcId), description: row.description,
                potassiumMg: row.potassiumMg, phosphorusMg: row.phosphorusMg, macros: row.macros,
                basis: row.preparation === "unspecified" && row.dataset === "Survey (FNDDS)" ? "prepared" : row.preparation,
                completeProduct: row.componentDescriptions?.some(t => /seasoning|flavou?r sachet/i.test(t)), url: row.url });
            }
          } catch { resolution.searches.push({ source: "USDA", query, candidates: 0, status: "unavailable" }); }
      };
      const rank = () => rankReferences(product, identity, [...new Map(candidates.map(c => [c.source + c.code, c])).values()], basis);
      await Promise.all([cofidSearch(identity.terms[0]), usdaSearch(identity.query)]);
      let ranked = rank();
      // Broaden the food words, never the preparation/contents acceptance rules.
      // At most four CoFID name queries and two USDA queries per uncached food.
      if (ranked.filter(r => r.candidate.source === "CoFID 2021").length < 2 || !ranked.some(r => r.candidate.potassiumMg !== null) || !ranked.some(r => r.candidate.phosphorusMg !== null)) {
        await Promise.all(identity.terms.slice(1, 4).map(cofidSearch));
        ranked = rank();
        if (!ranked.some(r => r.candidate.source === "USDA")) {
          const evidenced = identity.tokens?.filter(t => candidates.some(c => normaliseFood(c.description).split(" ").includes(t)));
          const broad = evidenced?.length ? identity.query.replace(identity.tokens!.join(" "), evidenced.join(" ")) : identity.terms[0];
          if (broad !== identity.query) await usdaSearch(broad);
        }
        ranked = rank();
      }
      for (const nutrient of ["potassium", "phosphorus"] as const) {
        const selected = ranked.find(({ candidate }) => {
          const value = nutrient === "potassium" ? candidate.potassiumMg : candidate.phosphorusMg;
          return typeof value === "number" && Number.isFinite(value) && value >= 0;
        });
        if (selected) {
          resolution.matches[nutrient] = selected.candidate;
          // Every entry passes the same identity, preparation and macro gates.
          // These are observed reference values, not branded-product bounds.
          const available = ranked.filter(r => referenceNumber(nutrient === "potassium" ? r.candidate.potassiumMg : r.candidate.phosphorusMg) !== null);
          // Broader categories fill gaps; they do not displace available close
          // comparisons or widen a range with a different food formulation.
          const supported = selectReferenceGroup(available).map(r => r.candidate);
          resolution.matches[nutrient] = supported[0];
          const amount = (c: ReferenceCandidate) => (nutrient === "potassium" ? c.potassiumMg : c.phosphorusMg)!;
          const sorted = [...supported].sort((a, b) => amount(a) - amount(b));
          // Bound stored metadata, not the observed extrema. Never discard a
          // valid upper endpoint merely because its food code ranks later.
          resolution.comparables![nutrient] = [...new Map([supported[0], sorted[0], sorted[sorted.length - 1], ...supported.slice(1, 3)]
            .filter(Boolean).map(c => [c.source + c.code, c])).values()];
          resolution.note = [identity.note, ...new Set(supported.map(c => c.comparisonNote).filter(Boolean))].join(" ");
        }
        else resolution.reasons[nutrient] = resolution.searches.some(s => s.status !== "ok")
          ? "A reference search was unavailable, and the remaining candidates did not support this mineral."
          : ranked.length ? "Comparable foods were found, but this mineral was not supplied by those references."
          : `Reference candidates were searched, but none matched the food identity, preparation and ${identity.state?.contents === "drained" ? "drained" : "whole edible contents including liquid"} basis closely enough.`;
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
