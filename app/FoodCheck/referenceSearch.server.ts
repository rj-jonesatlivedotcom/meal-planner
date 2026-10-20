import "server-only";
import { type CategoryProduct } from "./categoryMinerals";
import { identifyFood, normaliseFood, rankReferences, selectReferenceGroup, referenceNumber, type ReferenceCandidate, type ReferenceResolution, type EstimationLevel } from "./referenceMatching";
import type { PreparationBasis } from "./curatedMinerals";
import type { UsdaFood } from "./usdaData";
import { supplementalReferences } from "./supplementalReferences";

export type CofidReferenceRow = { food_code: string; food_name: string; energy_kcal: number | null; protein_g: number | null;
  fat_g: number | null; carbohydrate_g: number | null; potassium_mg: number | null; phosphorus_mg: number | null };
export type ReferenceCache = Map<string, { expires: number; result: Promise<ReferenceResolution> }>;
export function createReferenceSearch(deps: {
  cofid: (term: string) => Promise<CofidReferenceRow[]>;
  usda: (query: string) => Promise<{ status: string; data: UsdaFood[] | null }>;
  usdaFood?: (id: number) => Promise<{ status: string; data: UsdaFood | null }>;
  cache?: ReferenceCache; now?: () => number;
}) {
  const cache = deps.cache ?? new Map(), now = deps.now ?? Date.now;
  return async (product: CategoryProduct, basis: PreparationBasis, unit: "g" | "ml"): Promise<ReferenceResolution> => {
    const key = JSON.stringify({ product, basis, unit });
    const hit = cache.get(key); if (hit && hit.expires > now()) return hit.result;
    const result = (async () => {
      const identity = identifyFood(product, basis);
      const resolution: ReferenceResolution = { classification: identity?.label ?? null, matches: {}, comparables: {}, reasons: {}, diagnostics: {}, searches: [], note: identity?.note };
      if (!identity || basis === "unknown") {
        for (const key of ["potassium", "phosphorus"] as const) {
          resolution.reasons[key] = "The food type or preparation/weight basis is not sufficiently described to select a comparable food.";
          resolution.diagnostics![key] = { attemptedLevels: [2, 3, 4, 5], candidates: 0, admitted: 0, missingMineral: 0,
            rejections: {}, limitations: [!identity ? "food-identity-unavailable" : "preparation-basis-unavailable"] };
        }
        return resolution;
      }
      const candidates: ReferenceCandidate[] = supplementalReferences(product, basis);
      const retrievalRejections: Record<string, number> = {};
      const volumeEvidence = new Map<string, NonNullable<UsdaFood["volumeBasis"]>>();
      const limitations = new Set<string>();
      // Do not compare source macros recorded per 100g with converted per-100ml
      // reference macros. Identity can still support a measured volume reference.
      const rankingProduct = unit === "ml" && product.nutrition_data_per !== "100ml" ? { ...product, nutriments: {} } : product;
      if (rankingProduct !== product) limitations.add("product-macro-volume-basis-unconfirmed");
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
              unit: "g", url: "https://www.gov.uk/government/publications/composition-of-foods-integrated-dataset-cofid" });
          } catch { resolution.searches.push({ source: "CoFID 2021", query: term, candidates: 0, status: "unavailable" }); }
      };
      const usdaSearch = async (query: string) => {
          if (seenQueries.has(query)) return;
          seenQueries.add(query);
          try {
            const result = await deps.usda(query);
            resolution.searches.push({ source: "USDA", query, candidates: result.data?.length ?? 0, status: result.status });
            for (const row of result.data ?? []) {
              const reject = !["g", "ml"].includes(row.unit) ? "reference-unit-unconfirmed" : row.dataset === "Branded" ? "unverified-branded-reference" : row.completeProductUnclear ? "incomplete-product-reference" : null;
              if (reject) { retrievalRejections[reject] = (retrievalRejections[reject] ?? 0) + 1; continue; }
              if (row.volumeBasis) volumeEvidence.set(String(row.fdcId), row.volumeBasis);
              candidates.push({ source: "USDA", code: String(row.fdcId), description: row.description,
                potassiumMg: row.potassiumMg, phosphorusMg: row.phosphorusMg, macros: row.macros ?? { energyKcal: null, protein: null, fat: null, carbohydrate: null }, unit: row.unit as "g" | "ml",
                basis: row.preparation === "unspecified" && row.dataset === "Survey (FNDDS)" ? "prepared" : row.preparation,
                completeProduct: row.componentDescriptions?.some(t => /seasoning|flavou?r sachet/i.test(t)), url: row.url });
            }
          } catch { resolution.searches.push({ source: "USDA", query, candidates: 0, status: "unavailable" }); }
      };
      const unique = () => [...new Map(candidates.map(c => [c.source + c.code, c])).values()];
      const normalisedCandidates = () => unique().flatMap(c => {
        if ((c.unit ?? "g") === unit) return [c];
        const volume = c.source === "USDA" && unit === "ml" ? volumeEvidence.get(c.code) : undefined;
        if (!volume) return [];
        const factor = volume.grams / volume.millilitres;
        if (!(factor > 0) || !Number.isFinite(factor)) return [];
        const scale = (n: number | null) => n === null ? null : n * factor;
        return [{ ...c, unit, potassiumMg: scale(c.potassiumMg), phosphorusMg: scale(c.phosphorusMg),
          macros: { energyKcal: scale(c.macros.energyKcal), protein: scale(c.macros.protein), fat: scale(c.macros.fat), carbohydrate: scale(c.macros.carbohydrate) },
          conversion: { from: "g" as const, to: "ml" as const, factor, evidence: volume.evidence, url: c.url },
          comparisonNote: `Reference converted from per 100g to per 100ml using its measured portion: ${volume.evidence}.` }];
      });
      const rank = (maxLevel: EstimationLevel = 5, rejections?: Record<string, number>) => rankReferences(rankingProduct, identity, normalisedCandidates(), basis, { maxLevel, rejections });
      const missing = (ranked: ReturnType<typeof rank>) => ["potassiumMg", "phosphorusMg"].some(key => !ranked.some(r => referenceNumber(r.candidate[key as "potassiumMg" | "phosphorusMg"]) !== null));
      await Promise.all([cofidSearch(identity.terms[0]), usdaSearch(identity.query)]);
      let ranked = rank();
      // Bounded discovery: a failed exact query or either missing mineral must
      // not prevent the other from using close, family or category evidence.
      if (ranked.filter(r => r.candidate.source === "CoFID 2021").length < 2 || missing(ranked)) {
        await Promise.all(identity.terms.slice(1, 4).map(cofidSearch));
        ranked = rank();
        if (missing(ranked) || !ranked.some(r => r.candidate.source === "USDA")) {
          const evidenced = identity.tokens?.filter(t => candidates.some(c => normaliseFood(c.description).split(" ").includes(t)));
          const broad = evidenced?.length ? identity.query.replace(identity.tokens!.join(" "), evidenced.join(" "))
            : ["ice-cream", "water-ice"].includes(identity.family) ? identity.terms[1] ?? identity.terms[0] : identity.terms[0];
          if (broad !== identity.query) await usdaSearch(broad);
        }
        ranked = rank();
      }
      if (unit === "ml") {
        // Search responses often omit portions. Enrich only compatible generic
        // candidates, with a bounded number of cached detail reads.
        const needsVolume = rankReferences(rankingProduct, identity, unique().filter(c => c.source === "USDA" && c.unit === "g" && !volumeEvidence.has(c.code)), basis)
          .filter(r => r.candidate.potassiumMg !== null || r.candidate.phosphorusMg !== null).slice(0, 3);
        await Promise.all(needsVolume.map(async ({ candidate }) => {
          if (!deps.usdaFood) { limitations.add("reference-volume-evidence-unavailable"); return; }
          try {
            const detail = await deps.usdaFood(Number(candidate.code));
            if (detail.status !== "ok") limitations.add(`reference-detail-${detail.status}`);
            const food = detail.data;
            if (food?.fdcId === Number(candidate.code) && food.description === candidate.description && food.unit === "g" && !food.completeProductUnclear && food.volumeBasis)
              volumeEvidence.set(candidate.code, food.volumeBasis);
          } catch { limitations.add("reference-detail-unavailable"); }
        }));
        ranked = rank();
      }
      const notes = new Set([identity.note]);
      for (const nutrient of ["potassium", "phosphorus"] as const) {
        const field = nutrient === "potassium" ? "potassiumMg" : "phosphorusMg";
        const rejections: Record<string, number> = { ...retrievalRejections };
        const allRanked = rank(5, rejections);
        const converted = normalisedCandidates();
        const unconverted = unique().length - converted.length;
        if (unconverted) rejections["unit-conversion-unavailable"] = unconverted;
        const diagnostic = resolution.diagnostics![nutrient] = { attemptedLevels: [] as number[], candidates: unique().length,
          admitted: allRanked.length, missingMineral: allRanked.filter(r => referenceNumber(r.candidate[field]) === null).length,
          rejections, limitations: [...limitations, ...resolution.searches.filter(s => s.status !== "ok").map(s => `${s.source}:${s.status}`), ...(unconverted ? ["reference-mass-volume-conversion-unavailable"] : [])], selectedLevel: undefined as EstimationLevel | undefined,
          outcome: allRanked.length ? "reference-mineral-unavailable" : unique().length ? "candidates-rejected"
            : resolution.searches.some(s => s.status !== "ok") ? "reference-service-unavailable" : "no-reference-candidates" };
        let available: typeof ranked = [];
        for (const level of [2, 3, 4, 5] as const) {
          diagnostic.attemptedLevels.push(level);
          available = allRanked.filter(r => r.level <= level && referenceNumber(r.candidate[field]) !== null);
          if (available.length) { diagnostic.selectedLevel = level; break; }
        }
        const selected = available[0];
        if (selected) {
          diagnostic.outcome = "estimated";
          resolution.matches[nutrient] = selected.candidate;
          // Every entry passes the same identity, preparation and macro gates.
          // These are observed reference values, not branded-product bounds.
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
          for (const c of supported) if (c.comparisonNote) notes.add(c.comparisonNote);
        }
        else resolution.reasons[nutrient] = resolution.searches.some(s => s.status !== "ok")
          ? "A reference search was unavailable, and the remaining candidates did not support this mineral."
          : ranked.length ? "Comparable foods were found, but this mineral was not supplied by those references."
          : `Reference candidates were searched, but none matched the food identity, preparation and ${identity.state?.contents === "drained" ? "drained" : "whole edible contents including liquid"} basis closely enough.`;
      }
      resolution.note = [...notes].filter(Boolean).join(" ");
      return resolution;
    })();
    if (cache.size >= 128) cache.delete(cache.keys().next().value!);
    cache.set(key, { expires: now() + 60000, result });
    const resolved = await result;
    if (cache.get(key)?.result === result)
      cache.set(key, { expires: now() + (resolved.matches.potassium && resolved.matches.phosphorus && resolved.searches.every(s => s.status === "ok") ? 86400000 : 60000), result });
    return resolved;
  };
}
