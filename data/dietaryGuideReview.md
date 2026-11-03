# Dietary Guide review — 3 November 2026

Applied locally to 310 recipes: 60 breakfasts, 125 lunches and 125 dinners. Not deployed.

Content remains in `data/dietaryGuides.json`, with central display and parsing changes. No recipe descriptions, ingredients, quantities, methods, serving sizes, nutrition calculations, nutrition evidence or uncertainty flags were edited.

All 310 entries underwent catalogue-wide editorial screening and automated checks against current recipe fingerprints and applicable ingredient patterns. Representative dishes were inspected in more detail. This is not a claim that 310 recipes have each received independent nutritional or clinical verification.

| Measure | Result |
| --- | ---: |
| Previous sections | 3,061 |
| Current substantive sections | 299 |
| Net reduction | 2,762 |
| Sections retained verbatim | 87 |
| Reworked or new sections | 212 |
| Recipes with no retained substantive note | 31 |
| Recipes with one section | 260 |
| Recipes with two sections | 18 |
| Recipes with three sections | 1 |

Counts compare blank-line-separated, titled paragraphs with the pre-change catalogue. Reworked/new includes a changed heading or wording; the net reduction is not an assertion that every removed paragraph was individually rewritten.

The original `references` arrays remain byte-for-byte equivalent as parsed data for every recipe. New `guidanceReferences` arrays select references relevant to the shorter text. Only those are displayed. Fingerprints are unchanged, and stale ingredients, quantities, methods or servings still hide both guidance and sources. Existing nutrition provenance and pending-review information remain in the nutrition evidence disclosure.

The guide, individual sections and Sources start collapsed. Native HTML disclosures provide keyboard interaction without extra state. The guide resets closed on recipe changes. Blank content and empty headings produce no section. The sentence-by-sentence keyword classifier and tests mandating long text, eight sections and five compulsory topics were removed. Existing colours, responsive layout and focus styles are retained; source links wrap on narrow screens.

Further editorial review can prioritise the following recipes, whose previous generic sections were omitted without adding replacement filler. A missing note is not a missing nutrient figure or a change to a recipe's audit status:

- Lunches: L070, L071, L077, L082, L087, L100, L101, L102, L104, L105, L108, L110, L111, L113, L114, L123.
- Dinners: D084, D085, D088, D089, D091, D094, D099, D102, D103, D104, D111, D112, D113, D114, D118.

Representative rendered-page checks cover B001, B051, B059, L028, L049, L070, L084, D071, D101 and D117: breakfast/lunch/dinner, simple animal-only dishes, nuts, pulses, seitan, boiled potato, homemade curry seasoning, and a recipe without retained guidance. Additional ingredient checks cover egg whites, tofu, beans/lentils, potato preparation and the obsolete L007 ham wording. D101's courgette is explicitly protected against an animal-only/no-plant claim.

No current recipe declares `nutritionIncomplete`; missing-nutrient behaviour was tested with a synthetic incomplete D071. Its real nutrition-evidence text still reports missing potassium/phosphorus and pending dietitian review. Ingredient-based advice does not invent missing totals. Unknown recipes and changed recipe fingerprints show no recipe-specific advice or source links.

Validation:

- `node --test lib/dietaryGuides.test.mjs lib/recipeEditorial.test.mjs lib/recipeNutritionResolution.test.mjs lib/recipeServings.test.mjs lib/recipeNutritionSafety.test.mjs` — 26/26 passed.
- `npx.cmd tsc --noEmit --incremental false` — passed before and after changes.
- Scoped `git diff --check` — passed.
- Current recipe source files have no diff from their pre-task tracked versions.
- Real page JSX was rendered with React's server renderer and inert service/navigation/component boundaries to check initial disclosure markup, section presence, source visibility and uncertainty text. This does not validate services or browser layout.
- The browser host returned `The browser access host is unavailable`. Native desktop/mobile visual layout and interactive keyboard/touch checks remain unverified. No production build or deployment was performed.

Nutritional references consulted for the retained/rewritten claims include [Kidney Care UK: natural and added phosphate](https://kidneycareuk.org/get-support/healthy-diet-support/natural-phosphate-and-added-phosphate-ckd/), [Kidney Care UK: potassium](https://kidneycareuk.org/get-support/healthy-diet-support/potassium-and-chronic-kidney-disease/), [Kidney Care UK: potatoes](https://kidneycareuk.org/get-support/healthy-diet-support/cooking-with-kidney-disease/eating-potatoes-with-ckd/), [NIDDK: healthy eating with CKD](https://www.niddk.nih.gov/health-information/kidney-disease/chronic-kidney-disease-ckd/healthy-eating-adults-chronic-kidney-disease), [DaVita: egg whites](https://davita.com/diet-nutrition/kidney-diet-tips/egg-whites-for-a-dialysis-diet/), [Diabetes UK: carbohydrate counting](https://www.diabetes.org.uk/living-with-diabetes/eating/carbohydrates-and-diabetes/learn-about-carb-counting) and [NHS: dietary fats](https://www.nhs.uk/live-well/eat-well/food-types/different-fats-nutrition/). These support general food/absorption principles, not independent calculations or approval of RenalPlan's recipes. Ingredient and preparation statements are checked against the local recipe records; no ranked potassium/phosphorus contributor or quantified cooking-loss claims were added.

Files changed:

- `data/dietaryGuides.json` — shortened per-recipe guidance and relevant display references.
- `lib/dietaryGuides.ts` — flexible editorial section parsing and reference selection.
- `app/recipes/[id]/page.tsx` — collapsed outer guide, concise empty state, source content wrapper.
- `components/recipe-design.module.css` — disclosure affordance, keyboard focus, source spacing/wrapping.
- `lib/dietaryGuides.test.mjs` — catalogue, preservation, drift, ingredient and rendered-page checks.
- `lib/recipeEditorial.test.mjs` — replace obsolete minimum-length/topic requirements while preserving recipe assertions.
- `lib/recipeNutritionResolution.test.mjs` — replace obsolete guide length/reference-count requirements with fingerprint/reference-type checks.
- `data/dietaryGuideReview.md` — this report.
