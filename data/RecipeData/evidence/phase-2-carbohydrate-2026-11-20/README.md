# Phase 2 carbohydrate evidence — 20 November 2026

Approved Phase 2 release evidence. **No clinical approval is implied.**

This snapshot accompanies the recipe files identified by `snapshot.json`.
Its pinned pre-Phase-2 baseline is `98dd532f14f12538ffc47fb31666f4924fe18571`.
The manifest identifies the exact corrected recipe content by normalised SHA256
and Git blob ID, and is bound to the corresponding recipe-data commit in the
release metadata follow-up. These identifiers do not depend on a changing HEAD.

The workbook and reconciliation records preserve their original review-stage
annotations, assumptions and before/after evidence. Final release approval and
the recipe-data commit binding are recorded in the snapshot manifest; review-stage
wording does not imply that the evidence has clinical approval.

## Results and interpretation

- 317 carbohydrate records: **158 numerical corrections and 159 unchanged values** against the pinned pre-Phase-2 baseline. There are **no unavailable carbohydrate totals** after the avocado follow-up.
- All 317 have complete ingredient coverage. Seven have a complete food-specific conversion; **310 remain conditional estimates**. Complete describes coverage, not analytical accuracy, suitability for an individual or clinical approval.
- Conditional status includes incomplete sugar profiles, mixed fractions, source rounding, by-difference sources and food matching. No ingredient is omitted from a complete total.
- The eight initially held avocado recipes now use a documented **conditional USDA raw-avocado proxy**. Their prior Unavailable records, original CoFID 14-386 values, raw USDA evidence, substitution decision and uncertainty are preserved in `avocado-substitution-review.json`. The CoFID oligosaccharide-specific conversion itself remains unresolved; the proxy does not establish it.

## Method

Use UK-compatible **available carbohydrate by weight, excluding dietary fibre**.
CoFID carbohydrate already excludes fibre: do not subtract AOAC fibre or NSP.
Convert the selected food's starch ME /1.10, free monosaccharides unchanged and
disaccharides ME /1.05, following the CoFID guide and FAO/INFOODS table 4.2-2.
This is an ingredient conversion, never a blanket multiplier applied to a meal.

Where a sugar profile is incomplete, retain the published total and starch and
apply the guide's mixed-food /1.05 approximation to the non-starch remainder,
with conditional status. Missing individual sugars are not assigned zero.
An uncharacterised residual uses the same explicit conditional approximation;
it is not claimed to be a measured disaccharide or an exact oligosaccharide
chain-length conversion. Predominantly oligosaccharide CoFID conversions remain unresolved; a separate, food-specific conditional proxy may be used only when justified and documented, as for the eight avocado recipes below.
When independently rounded sugar components exceed the published non-starch
total by 0.1 g/100 g, proportionally apply that sugar profile to `CHO - starch`
and retain a conditional rounding note. Raw published values are never replaced
by the reconciled calculation.

For **USDA total carbohydrate by difference only**, subtract dietary fibre from
the **same food record**, retaining both nutrient 205 and 291 source lines and
their source/derivation codes. FAO/INFOODS table 4.2-4 supports this derivation.
The residual can include organic acids and other non-carbohydrate compounds;
this remains a conditional available-by-difference estimate, not analytical
equivalence to CoFID. CoFID N/blank spice totals are supplemented only with the
same dried form (cinnamon, paprika, black pepper and oregano), not omitted.

CoFID `Tr` remains distinguishable from a published zero and is counted as zero
only at the source's reporting precision. `N` and blank remain unknown.
Sum unrounded contributions and round half-up to 0.1 g per existing serving.
Excel normalises the summed value to eight decimals before final rounding to
remove binary tie noise; this does not alter the precision of the source data.
The existing edible-input weights and food matches are retained. No new yield,
cooking-loss, oil-loss, volume-to-mass or serving assumption is introduced.

Primary methodology references:

- [CoFID 2021 user guide](https://assets.publishing.service.gov.uk/media/60538e66d3bf7f03249bac58/McCance_and_Widdowsons_Composition_of_Foods_integrated_dataset_2021.pdf), pages 10–11 and 16.
- [FAO/INFOODS Conversion Guidelines 2012](https://www.fao.org/fileadmin/templates/food_composition/documents/1nutrition/Conversion_Guidelines-V1.0.pdf), tables 4.2-2 and 4.2-4.

## Contents and retrieval

`RenalPlan_Recipe_Verification_Phase2_Carbohydrate.xlsx` extends the Phase 1
workbook. It retains Summary, Spreadsheet and Methodology, all previous fibre
cells, source evidence, grouping and native worksheet features. Current recipe
carbohydrate headers and nutrient summaries point to the appended Phase 2
calculations. Newer carbohydrate ingredient rates are updated. Original-150
ingredient blocks retain the former ME source values as **historical** evidence;
the new section and ledger contain the current by-weight calculations.

`carbohydrate-reconciliation.json` contains every recipe's before/after value,
unchanged ingredient quantities, source IDs, raw source components or USDA
records, conversion formula, contributions, conditions and unresolved foods.
Source filenames and exact file hashes identify CoFID 2021, oldFoods, USDA SR28
and the input Phase 1 workbook. Selected raw records are included so the
calculation does not depend on a future website remaining available.

`avocado-substitution-review.json` preserves the original CoFID record, the eight before/after reconciliation records and unchanged nutrient/content evidence, the substitution rationale, raw source records and uncertainty.

`energy-review.json` records the limited energy-basis concern exposed by this
carbohydrate work. Calories were not recalculated or changed. No new confirmed
energy arithmetic error is asserted. A UK-label energy harmonisation would be
a separate review: CoFID uses carbohydrate ME at 3.75 kcal/g, while by-weight
labelling uses 4 kcal/g; fibre, alcohol, organic acids and specific Atwater
factors also matter. Applying four times the carbohydrate correction to calories
would be unjustified.

`workbook-validation.json` records saved-value agreement and preservation checks.
`snapshot.json` binds these evidence files to the exact recipe content and the
unchanged Phase 1 snapshot. **Hash convention: text is UTF-8 with CRLF normalised
to LF; SHA256 and byte counts cover those normalised bytes. XLSX hashes and byte
counts cover exact stored bytes.** The same convention is used in the integrity
test. The manifest does not checksum itself.

The original workbook and the Phase 1 workbook/ledger remain unchanged in
`../phase-1-fibre-2026-11-20/`. After approval and commit, retrieve this entire
directory and the recipe files at the recorded release commit from Git. The
workbook and its corresponding recipe-data version must be kept together for
any later NKF/BDA scrutiny.

No potassium, phosphorus, sodium, salt, protein, fat, fibre, energy, ingredient,
quantity, portion, cooking method, dietary guide or classification changed.

## Largest corrections

| Recipe | Before | After | Explanation |
| --- | ---: | ---: | --- |
| D002 — Rosemary Turkey with Rice & Vegetables | 89.2 g | 81.4 g | Mainly 100 g dry basmati rice: CHO 83.7 g ME, starch 83.6 g ME; converted available estimate 76.095238 g/100 g. |
| D003 | 90.0 g | 82.2 g | Same starch-specific conversion in the rice-based meal; remaining ingredients retain their own source conversions. |
| D004 | 89.9 g | 82.2 g | Same correction of the starch-rich ingredient basis. |
| D046 | 34.1 g | 31.3 g | Ingredient-level ME-to-weight reconciliation; its Phase 1 fibre remains 2.6 g. |

The initial 155 numerical corrections were decreases. The avocado follow-up adds three 0.1 g increases against the pre-Phase-2 baseline (D088, D097 and D104); five avocado totals return to the same rounded figure as that baseline, now with a documented conditional source. All previous non-avocado Phase 2 corrections remain unchanged. No ingredient or amount was reduced to produce these changes.

## Avocado-only follow-up

The proposed USDA subtraction is defensible as **available carbohydrate by difference**, an explicitly conditional ingredient estimate. USDA SR27 NDB 09037, *Avocados, raw, all commercial varieties*, reports 8.53 g total carbohydrate by difference and 6.7 g total dietary fibre per 100 g edible portion: **1.83 g/100 g**. The published SR27 report was checked directly (PDF page 140). Identical values in the retained local SR28 archive provide the preserved raw nutrient records; those raw lines are labelled SR28, not SR27.

[USDA SR27 methodology](https://www.ars.usda.gov/ARSUserFiles/80400525/Data/SR27/sr27_doc.pdf), printed page 13, confirms that total carbohydrate includes fibre and permits calculating available carbohydrate by difference. [The SR27 food report](https://www.ars.usda.gov/ARSUserFiles/80400525/Data/SR27/reports/sr27fg09.pdf) identifies the edible portion and the source values.

This is **not directly measured available carbohydrate**. It is a generic raw-avocado proxy for the specified Hass cultivar, with uncertainty from variety, origin, ripeness, residual non-carbohydrate compounds and propagated analytical errors. The two values belong to the same food record, not necessarily the same physical samples. Carbohydrate is calculated (source 4, derivation NC); fibre has 27 data points and standard error 0.879 g/100 g. No precision interval for the derived 1.83 g value is invented.

All eight ingredients are explicitly weighed raw avocado flesh with skin and stone excluded. Their unchanged methods use the flesh raw in salads, salsa or as a side at service. Therefore use the existing edible grams directly: applying USDA's 26% skin/seed refuse fraction again would double-discount the input. No new weight, yield or cooking adjustment is introduced. The USDA fibre value is used only internally to derive the substitute carbohydrate value; **published recipe fibre and all other nutrients are unchanged**.

| Recipe | Raw edible avocado | Avocado carbohydrate contribution | Revised recipe total |
| --- | ---: | ---: | ---: |
| L094 | 30 g | 0.549 g | 43.4 g |
| L101 | 40 g | 0.732 g | 2.0 g |
| L102 | 60 g | 1.098 g | 2.9 g |
| L123 | 70 g | 1.281 g | 54.1 g |
| D088 | 45 g | 0.8235 g | 46.5 g |
| D097 | 35 g | 0.6405 g | 59.4 g |
| D098 | 45 g | 0.8235 g | 44.1 g |
| D104 | 60 g | 1.098 g | 5.7 g |

All eight totals are conditional; none is a partial total or an analytical meal measurement. This substitution is explicitly restricted to these eight raw-avocado ingredients. It is not a rule to subtract fibre from CoFID values or generalise to other foods.

## Local validation and changed files

- **51/51 affected regression tests passed**, covering Phase 2 sources and totals,
  pinned-baseline preservation, Phase 1 evidence, historical carbohydrate evidence,
  recipe presentation, structured data, dietary-guide rendering, classifications,
  shopping and catalogue integration.
- **22/22 focused target regressions passed**. Actual Planner and Nutrition
  calculation functions agree on corrected totals; unavailable carbohydrate holds
  the total/target assessment rather than becoming zero.
- TypeScript (`npm run typecheck`) and `git diff --check` passed.
- All **317 saved workbook carbohydrate headers and nutrient summaries agree**
  with the current website data. The saved workbook recalculates all 317 headers;
  changing a rice input propagates, and deleting a source value withholds the
  complete total. These were disposable in-memory checks. Native Excel itself
  was not used for recalculation.
- Workbook preservation checks retained **350,141 unrelated existing Spreadsheet
  cells**, original row attributes, grouping, hyperlinks, formatting structures
  and all existing Phase 1 fibre evidence. Phase 1 snapshot files match their
  pinned release version.
- Initial Phase 2 browser checks passed for D002, D046, L101 and B006, including visible
  nutrition and Recipe JSON-LD before this follow-up. L101 then displayed unavailable carbohydrate. The avocado follow-up regression tests now verify numeric conditional carbohydrate and its inclusion in Recipe JSON-LD. D046 fibre remains 2.6 g and B006 fibre remains unavailable.

The intended Phase 2 scope is now 23 files (including this avocado follow-up):

- Recipe data: `data/RecipeData/breakfasts.ts`, `lunches.ts`, `dinners.ts`,
  `rangeAdditions.ts`, and the optional evidence-note type in `types.ts`.
- Display: `app/recipes/[id]/page.tsx` and `layout.tsx`.
- Tests/support in `lib/`: `recipeCarbohydratePhase2.test.mjs` (new), `recipeAvocadoCarbohydrates.test.mjs` (new),
  `recipeCorrectionTestSupport.mjs`, `recipeCarbohydrates.test.mjs`,
  `recipeFibre.test.mjs`, `recipePresentation.test.mjs`,
  `recipeStructuredData.test.mjs`, `chineseRecipeCollection.test.mjs`,
  `dietaryGuides.test.mjs`. Historical tests reconstruct and validate the approved
  pre-Phase-2 data; the new preservation test independently protects every other
  nutrient and all recipe content against a stable commit. No changing HEAD
  baseline is used for the updated recipe-preservation comparisons.
- Seven new files in this directory: this README, the Phase 2 XLSX,
  `carbohydrate-reconciliation.json`, `energy-review.json`,
  `workbook-validation.json`, `avocado-substitution-review.json`, and `snapshot.json`.

Temporary builders, previews, browser captures and logs under `outputs/` are
local working files and are excluded from the intended evidence/release scope.
The user approved the completed Phase 2 release on 20 November 2026. Only the intended files above belong to the release; working files remain excluded.

Avocado follow-up validation is limited to the affected tests and TypeScript. New scope-preservation tests bind every other Phase 2 recipe and source record to its pre-follow-up hash, and protect every non-carbohydrate field in the eight recipes. The sparse workbook update preserves all cells and native features outside the eight carbohydrate calculations and related status/methodology/summary cells. Saved totals and source contributions for all eight are checked, and snapshot integrity metadata is refreshed using the same UTF-8/LF text and exact-XLSX byte convention.

Avocado follow-up results: **21/21 affected tests passed**, covering the restricted substitution, unchanged non-avocado records and other nutrients, current totals, Planner/Nutrition target handling, Recipe JSON-LD, detail rendering and snapshot integrity. TypeScript and `git diff --check` passed. The saved workbook checks passed for all eight affected totals, changed edible-weight propagation and missing-source withholding. These checks were completed locally before release approval.
