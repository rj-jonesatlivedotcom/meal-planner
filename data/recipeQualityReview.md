# Final recipe quality refinement - 3 November 2026

Completed locally. No deployment or push was performed.

| Measure | Result |
| --- | ---: |
| Recipes assessed by the structured check | 310 |
| Recipes changed (records or guides) | 306 |
| Methods refined | 302 |
| Equipment lists corrected or made specific | 243 |
| Descriptions corrected | 1 |
| Source labels corrected | 6 |
| Displayed times corrected | 1 |
| Dietary Guides refined | 38 |
| Repeated guide sections removed | 19 |

The single catalogue-wide consistency pass checked ingredient use, method structure, equipment, duration notation, guide relevance, identifiers/counts and cooked-weight descriptions. Five groups of lexical ingredient-use candidates were manually resolved as valid collective instructions; four duration candidates were overnight-oat chilling notations. The raw results and decisions are retained in `recipeQualityReview.json`. Representative methods were also read directly, including B002, B003, B009, L001, L007, L049, L052, L058, L063, D001-D003, D059, D060, D073 and D117. This is a structured editorial review with representative manual inspection.

Main corrections:

- B002: moved the creamy-oat instruction out of the apple step and into the porridge step.
- B003 and B009: use the already-beaten whole egg and whites, then cook until set; removed contradictory instructions to crack another egg. B003's description and assembly now match the mixed filling.
- B005: removed the second instruction to beat an egg already beaten during preparation.
- L001: removed the nonexistent smoking-oil reference and included its frying pan and thermometer.
- L007: restored the missing boiling, peeling and slicing instructions for the two listed eggs; included saucepan equipment and changed the displayed time from 8 minutes to 15 mins to include the egg preparation.
- L036: explicitly prepares and adds the listed apple. D025 now uses its vegetable oil; D044 uses its thyme.
- L049: repaired an unfinished dough sentence. L063: removed copied nut-topping instructions that conflicted with making ground-peanut sauce.
- Removed repeated serving, measurement and seasoning filler, duplicate temperature checks and rice-grain instructions wrongly attached to noodles. Preserved existing food temperatures, useful timings, texture cues, raw-food handling and boiling/draining techniques.
- Replaced placeholder equipment lists using concrete cooking actions. Removed incidental matches such as a rolling pin inferred from “rolling boil”.
- Retained concise guides. Removed repeated plant-phosphorus paragraphs from mixed dishes where they added little; shortened retained explanations in pulse-centred plant dishes. Updated guide fingerprints after method changes, keeping both reference arrays intact.

Sources presentation:

- Added `Nutrition Sources & Methodology` at `/about#nutrition-sources-methodology`, covering CoFID 2021, the actually used USDA SR28 records, the cited fresh-weight Table S5 research, quantity/serving calculations, preparation assumptions and handling of estimates/missing data.
- Removed generic reference lists from individual Dietary Guide displays. Added a discreet methodology link below recipe nutrition.
- Kept the existing nutrition evidence disclosure. Six recipes now link to downloadable ingredient-level calculation records with their original source references and unrounded contributions: L061, L062, D069, D071, D072 and D073. Large evidence records are downloads, not additions to the recipe page's JavaScript imports.
- Corrected those six recipes' source labels to `CoFID/USDA ingredient-input estimate`. Existing source notes and status flags remain unchanged.
- No additional warning or disclaimer blocks were added; the existing About-page dietary-needs note was preserved exactly.

Remaining source-basis questions:

- D001-D003: the ingredient list uses cooked/grilled food descriptions and gram amounts while the method begins with uncooked food. Raw starting weights and cooking yields are not established by the retained record. The pan/griddle wording is corrected, but quantities and calculation assumptions remain unchanged.
- The same lexical cooked-weight screen identified L041, L045, L047, L048, D004-D010, D041-D043, D045 and D047-D052 for source-basis review. These are candidates rather than confirmed nutrient errors: a cooked-food description can correctly describe the finished food. The question is whether each stated gram amount is a starting or finished weight. Ingredient counts, such as numbers of eggs, need distinguishing from weight conversions before making changes.
- D073 has no measured final served-fluid amount. Its `fluidMl` remains absent. The kitchen-development measurement instruction was removed from the cooking method; the underlying evidence still retains that calculation limitation.

D069, D071 and D073 investigation:

The later `nutrition-gap-resolution.json` record contains source-referenced contributions completing their previously missing nutrients. Their completeness arrays are empty and the displayed values match that record. Their source-match and classification flags remain pending; complete numeric fields do not clear those separate decisions. There is no missing value converted to zero and no recalculation in this refinement.

Preservation:

All 310 recipes were compared with commit `1a0175c2ba783562c3cad862ca940a527cf7ca8b`. Every ingredient, quantity, nutrition value, serving size, image, ID/code, diet category, source note, uncertainty flag and fluid value is identical. Only method, equipment, one description, six source labels and L007's displayed time changed in recipe records. MyChef, Planner, shopping-list, allergy and filtering implementation files were not edited. Previous dated review records were retained; test support checks the exact new editorial before/after values before reconstructing earlier stages for their historical preservation tests.

Validation:

- Nine focused suites exercised 47 unique checks. The initial run passed 46; a historical guide-fingerprint assertion was updated to refer to the current editorial revision. After the method/equipment refinements, the three affected suites passed 18/18. After removing the last audit-commentary sentences, the guide and integrity suites passed 13/13. The other 29 checks passed in the initial run. No repeated full-catalogue consistency scan was run.
- `npx.cmd tsc --noEmit --incremental false` passed after the final edits.
- The actual About page and representative recipe page JSX were rendered with React's server renderer. The methodology anchor, recipe links, evidence downloads, closed disclosures and removal of per-guide source lists passed.
- Scoped `git diff --check` passed. Browser layout and native-app interaction were not tested in this task.

Files modified or added:

- `data/RecipeData/breakfasts.ts`, `lunches.ts`, `dinners.ts`.
- `data/dietaryGuides.json`, `data/recipeQualityReview.json`, `data/recipeQualityReview.md`.
- `app/about/page.tsx`, `app/recipes/[id]/page.tsx`, `components/recipe-design.module.css`.
- `public/evidence/nutrition/{L061,L062,D069,D071,D072,D073}.json`.
- `lib/recipeQualityConsistency.mjs`, `lib/recipeQuality.test.mjs`, `lib/recipeCorrectionTestSupport.mjs`.
- `lib/dietaryGuides.test.mjs`, `lib/recipeEditorial.test.mjs`, `lib/recipeExpansion310.test.mjs`, `lib/recipeNutritionResolution.test.mjs`, `lib/recipeServings.test.mjs`.
