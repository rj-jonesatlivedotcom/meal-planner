# Food Check shared estimation changes — 20 October 2026

**Subsequent admission/range correction (20 October):** The yogurt failure recorded below is historical and is now corrected by shared formulation checks before both generic and family matching. Compound nuts, fruit/chocolate/flavour additions and explicit fat variants are screened; incidental recipe fats and trace-allergen notices are distinguished. Range construction selects the best formulation/identity group and removes macro-dominated candidates without changing the global acceptance threshold or discovery. Yogurt now uses one plain fat-free CoFID reference, K247/P151 per100g. All six diagnostics retain estimates: chickpeas K109–281/P80–141; soup single K133/P35; prepared bowl single K44.36/P28.33; fish fingers K230–263/P129–143; sardines single K287/P545; carrots K110–179/P14–24. Units/bases remain as in the table below. These corrected results supersede the earlier soup/fish ranges and yogurt holdout assessment. 98 targeted tests passed; TypeScript excluding only the existing generated copy declarations returned zero diagnostics. This correction changed referenceMatching.ts, referenceSearch.server.ts, supermarketMatching.test.mjs and this note; UI, recipes and saved-food implementation were untouched. No external requests or release actions were performed.

Local implementation only. No commit, push, deployment or authenticated device validation was performed. Existing compact additive presentation edits in page.tsx were preserved; backup-page.tsx was not edited by this task. Recipe data, Planner and Nutrition UI were not changed.

## Shared changes

- Normalise food names and synonyms (including chick peas, garbanzo, fish sticks and yoghurt); recover identity from category metadata; classify hydrated legumes, vegetables, canned fish, breaded fish, instant noodles and prepared soups.
- Rank by identity, preparation, packing medium, complete-product coverage and observed macronutrients. Relax individual macro vetoes while retaining aggregate density screens. Prefer close comparisons before broader category fallbacks.
- Retain bounded paginated CoFID discovery rather than the first 40 food codes, broaden name queries when needed, use up to four CoFID terms and two USDA searches per uncached product. USDA searches retrieve 40 candidates and preserve ingredient-component evidence.
- Derive observed reference ranges from comparable foods at the closest supported tier. Preserve extrema, source records and preparation basis; use the upper endpoint for numerical planning. These are reference observations, not guaranteed branded-product bounds.
- Add a reusable AFCD complete-seasoned-instant-noodle comparison. Apply a supplied retained-content dry/prepared yield generically, retaining original values and the exact conversion factor. Do not reuse ambiguous USDA dry-noodle entries as complete seasoned bowls.
- Packaging-only overrides establish drained/prepared basis for reviewed labels; they contain no K/P or preferred reference IDs. Current explicit product metadata takes precedence. Unknown drained pack mass is not replaced with gross pack mass.
- Preserve existing independently detected additive uncertainty, saved estimate/range/source metadata and numerical propagation. Existing tests exercise the actual Planner/Nutrition calculation consumers and missing-value handling. Detailed explanations remain in Food Check.

## Six diagnostic examples

Values are mg per 100g on the stated basis. A range is the observed comparison range; planning uses its upper endpoint. No manufacturer mineral measurements are implied.

| Product | Basis | Potassium | Phosphorus | Planning K/P |
| --- | --- | --- | --- | --- |
| Freshona chickpeas | drained | 109–281 | 80–141 | 281 / 141 |
| Heinz chicken and vegetable soup | supplied | 73–133 | 19–35 | 133 / 35 |
| Bramwells chicken flavour noodle bowl | prepared, retained contents | single 44.36 | single 28.33 | 44.36 / 28.33 |
| Breaded Alaska pollock fish fingers | as sold, cooked breaded comparison | 185–263 | 129–191 | 263 / 191 |
| ALVA sardines in brine | drained | single 287 | single 545 | 287 / 545 |
| Sliced carrots in water | drained | 110–179 | 14–24 | 179 / 24 |

Bramwells uses AFCD F006055, complete noodles including flavour sachet: K227/P145 per100g dry, multiplied by the declared 85/435 retained-content yield. A 435g bowl therefore has baseline K192.95/P123.25mg, excluding unknown additive contributions. AFCD labels the dry record **estimated**, moisture-adjusted from cooked analyses; it is not a manufacturer measurement. The old curated hold and its complete-product concern were retained, with fresh complete-reference search now permitted.

## Independent holdouts — no outcome-specific rule tuning

Plain yogurt, peanut butter and orange juice were selected before evaluation, in different categories from the six. Primary retailer/manufacturer labels and public CoFID rows are captured in holdout-products.json and holdout-cofid.json. This is a CoFID-only replay with USDA explicitly unavailable, not a live end-to-end supermarket validation.

| Holdout | Observed result | Assessment |
| --- | --- | --- |
| Tesco 0% natural yogurt | K215–280 / P141–170 per100g | **Relevance failure:** includes hazelnut yogurt alongside plain yogurts. Do not treat this range as validated. |
| Meridian smooth peanut butter | K700 / P330 per100g, single CoFID smooth peanut butter | Suitable category comparison; estimated, not measured for the brand. |
| Tropicana orange with bits | labelled K200 per100ml retained; P missing | Correct abstention: engine does not assume density to convert mass references to volume. |

Remaining systematic limitations: generic formulation matching can admit extra flavour/nut ingredients (demonstrated by yogurt); categories outside explicit families still rely on generic tokens. A nutrition-label or ingredient extraction error propagates to matching. Unknown additive quantities cannot be included in numerical ranges. Missing preparation yield/density prevents exact conversions. Broad reference discovery remains bounded, not exhaustive. These limits mean the results do **not** establish supermarket-wide reliability; the holdout failure is deliberately recorded rather than hidden by a product patch.

## Validation and changed files

96 targeted tests passed across referenceSearch.test.mjs, categoryPortions.test.mjs, usda.test.mjs, supermarketMatching.test.mjs and lib/foodSnacks.test.mjs. Passing automation does not override the yogurt relevance failure. Fixtures cover live-captured six-product searches, upper-endpoint propagation, label basis, complete seasoning coverage, conversion provenance, extrema and missing values.

Normal TypeScript checking remains blocked by existing duplicate generated `.next/**/routes.d - Copy.ts` declarations. A separate check excluding only those generated copy files completed with zero diagnostics. No broad lint, build or audit was run.

Implementation files: app/FoodCheck/{referenceMatching.ts,referenceSearch.server.ts,categoryMinerals.ts,curatedMinerals.ts,barcodePortions.ts,usda.server.ts,usdaData.ts,page.tsx,reviewedLabelBasis.ts,supplementalReferences.ts}; app/api/food-check/estimate/route.ts. Tests: referenceSearch.test.mjs and supermarketMatching.test.mjs; captured fixture app/FoodCheck/fixtures/supermarketReferences.json. Supporting evidence/results live in this output directory. lib/foodSnacks.ts and Planner/Nutrition consumers needed no changes.

Primary reference provenance: [CoFID 2021](https://www.gov.uk/government/publications/composition-of-foods-integrated-dataset-cofid), [AFCD F006055](https://www.foodstandards.gov.au/science-data/food-nutrient-databases/afcd/search/food/F006055), [AFCD F006054](https://www.foodstandards.gov.au/science-data/food-nutrient-databases/afcd/search/food/F006054). Exact USDA IDs, URLs, query captures and label URLs are retained in the fixtures and regression-results.json.
