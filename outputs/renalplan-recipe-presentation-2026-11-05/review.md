# RenalPlan recipe presentation review — 5 November 2026

Shared presentation applied to all 310 recipes and 2865 ingredient entries. 995 entries now show approximate kitchen measures first, retaining exact source grams. 291 method steps receive display-only cleanup or practical measure equivalents.

Ingredient names, units and preparation notes originate in the ingredient item and quantity strings in data/RecipeData/{breakfasts,lunches,dinners}.ts. There are no separate public unit or note fields. The recipe page formerly rendered these source strings directly.

lib/recipePresentation.ts now formats recipe ingredients and methods. The recipe page and its Recipe JSON-LD use the same formatter. Shopping names are cleaned only when rendering the screen or downloadable checklist; shopping aggregation, stored names, checkbox identity and quantities remain original.

Examples: 0.6 g ground cumin → Approx. ¼ tsp (0.6 g); 6 g garlic → Approx. 2 cloves (6 g); 55 g onion → Approx. ½ medium onion (55 g). Component labels remain separate, for example “For the tikka” and “For the bread finish”. Chopped, drained, cooked, raw, unpressed, fat percentages and meaningful parentheses remain where supplied.

Conversions use ingredient-specific household reference weights. All equivalents are marked approximate; rounding must remain within 20% of the reference and cannot round to zero. Source grams are always retained. Meat, flour, grains and other normally weighed ingredients continue to use grams.

Cooking amounts, times and temperatures are preserved in every method. Raw-food handling instructions, fully cooked endpoints and component-specific egg/oil allocations remain. Internal nutrient calculations, proxy assumptions and audit-revision instructions are removed from public method text.

Validation: 34 focused tests passed, including all 310 real recipe page renders, all 310 Recipe JSON-LD blocks, metadata checks, meaningful notes, component allocations, unchanged source data and Dietary Guides, and 930 shopping/serving comparisons (310 recipes × 1, 2 and 4 people). TypeScript passed with --noEmit --incremental false. Existing responsive spacing/typography is reused; no browser-based mobile/desktop visual test was performed.

No commit, push or deployment was performed.

## Quantities retained in grams

These are deliberate exceptions to kitchen-measure conversion, not missing ingredients. Exact amounts and affected recipe codes are listed below. Ordinary weighed ingredients such as meat, flour, cheese and cooked beans are excluded from this exception list.

| Ingredient | Remaining quantities | Recipes | Reason |
| --- | --- | --- | --- |
| Active dry yeast | 1 g (dry); 0.15 g (dry; requires 0.1 g scales); 1.3 g (dry); 2 g (dry) | L049, L052, L053, L089, D060 | Small dose or ingredient form: a useful spoon fraction is not sufficiently close, or no matching reference is established. |
| Black pepper | 0.2 g (small pinch) | D025 | Small dose or ingredient form: a useful spoon fraction is not sufficiently close, or no matching reference is established. |
| Carrot | 25 g; 20 g | L072, L085, L086, L088, L090, L091, L092, L093, D088, D090 | No sufficiently close quarter/whole reference count, or no established matching size reference. |
| Cayenne chilli powder | 0.3 g; 0.15 g | L050, L053 | Size, trimming or product form varies; retain the original amount. |
| Courgette | 90 g; 70 g; 80 g; 45 g; 100 g; 60 g | L070, L121, D064, D086, D101, D103, D119 | No sufficiently close quarter/whole reference count, or no established matching size reference. |
| Dried red chilli flesh | 4 g (dry, stems and seeds removed) | D074 | Size, trimming or product form varies; retain the original amount. |
| Eating apple, flesh and skin, core removed | 55 g | D091 | No sufficiently close quarter/whole reference count, or no established matching size reference. |
| Fennel seeds, ground | 0.4 g | L052 | Small dose or ingredient form: a useful spoon fraction is not sufficiently close, or no matching reference is established. |
| Fresh basil | 3 g; 4 g; 6 g; 5 g; 10 g; 7.5 g | B055, L070, L071, L075, L103, L113, L121, D071, D079, D083, D087, D095, D114, D119, D122 | Leaf size, chopping and packing vary; retain grams rather than inventing a bunch or spoon equivalent. |
| Fresh chives | 3 g; 4 g; 5 g | B053, B058, L005, L011, L015, L016, L019, L027, L032, L074, L079, L101, L104, L110, L112, L114, L115, L118, L124, D105, D110, D112, D113, D115, D120 | Leaf size, chopping and packing vary; retain grams rather than inventing a bunch or spoon equivalent. |
| Fresh coriander | 4 g; 5 g | L049, L050, L051 | Leaf size, chopping and packing vary; retain grams rather than inventing a bunch or spoon equivalent. |
| Fresh coriander leaves | 3 g; 10 g; 6 g; 7 g; 7.5 g; 4 g; 5 g; 9 g | B056, L056, L061, L062, L063, L064, L065, L068, L072, L076, L081, L083, L084, L091, L094, L102, L120, L122, L123, L125, D053, D054, D056, D057, D063, D072, D073, D074, D075, D086, D088, D090, D094, D097, D098, D116, D123 | Leaf size, chopping and packing vary; retain grams rather than inventing a bunch or spoon equivalent. |
| Fresh curry leaves, finely sliced | 1 g (stems removed); 1.5 g (stems removed) | L052, D058 | Leaf size, chopping and packing vary; retain grams rather than inventing a bunch or spoon equivalent. |
| Fresh galangal | 7.5 g (peeled) | D071, D073 | Size, trimming or product form varies; retain the original amount. |
| Fresh ginger | 6 g; 5 g; 8 g; 2 g; 4 g; 7 g; 3 g; 9 g; 10 g; 15 g; 7.5 g; 14 g | L049, L050, L051, L052, L058, L060, L066, L068, L083, L086, L088, L089, L090, L091, L097, L098, L099, L110, L114, L120, L122, L125, D053, D054, D055, D056, D057, D058, D063, D064, D067, D068, D076, D077, D078, D093, D095, D096, D099, D115, D116, D123 | Size, trimming or product form varies; retain the original amount. |
| Fresh green chilli flesh | 3 g; 4 g; 5 g | L066, D054, D057, D076, D078 | Size, trimming or product form varies; retain the original amount. |
| Fresh holy basil | 15 g | D070 | Leaf size, chopping and packing vary; retain grams rather than inventing a bunch or spoon equivalent. |
| Fresh mint | 6 g; 4 g; 7.5 g; 9 g | L061, L084, L100, D053, D072 | Leaf size, chopping and packing vary; retain grams rather than inventing a bunch or spoon equivalent. |
| Fresh parsley | 2 g, finely chopped; 3 g; 5 g; 6 g; 7.5 g; 10 g; 4 g; 9 g; 7 g | B041, B042, B043, B044, B054, B057, B060, L054, L056, L057, L069, L073, L078, L082, L096, L111, L116, L117, L119, D059, D060, D064, D065, D080, D082, D084, D085, D089, D091, D101, D104, D105, D111, D117, D124, D125 | Leaf size, chopping and packing vary; retain grams rather than inventing a bunch or spoon equivalent. |
| Fresh raw egg white, separated from shell eggs | 60 g; 75 g; 65 g; 125 g; 50 g; 40 g; 80 g; 70 g; 100 g; 45 g; 35 g; 30 g; 160 g | B058, L070, L074, L075, L077, L078, L079, L091, L092, L103, L112, L115, L118, L121, L124, D085, D090, D094, D100, D104, D112, D114, D115, D120, D121, D125 | Keep the precise egg or egg-white portion; a whole-egg count could change the allocation. |
| Fresh red chilli flesh | 2.5 g; 2 g; 5 g; 17.5 g; 6 g; 20 g; 3 g; 15 g | L061, L062, L065, D058, D065, D070, D071, D072, D073, D077 | Size, trimming or product form varies; retain the original amount. |
| Fresh tomato | 50 g; 25 g; 40 g; 45 g | B054, B055, L076, L094, L098, L122, D093, D094, D097, D099 | No sufficiently close quarter/whole reference count, or no established matching size reference. |
| Full-fat canned coconut milk | 80 g; 40 g; 150 g; 175 g | L052, D058, D071, D073 | Product thickness and density vary; retain the weighed amount. |
| Garlic | 1 g | L102 | No sufficiently close quarter/whole reference count, or no established matching size reference. |
| Ground black pepper | 0.2 g (dry); 0.2 g; 0.4 g (dry) | B053, B055, B057, B058, B060, L050, L053, L055, L059, L101, L102, L103, L104, L105, L118, L121, L123, L124, D068, D072, D083, D084, D085, D087, D089, D091, D092, D098, D100, D101, D102, D103, D104, D105, D117, D118, D119, D120, D121, D122, D124, D125 | Small dose or ingredient form: a useful spoon fraction is not sufficiently close, or no matching reference is established. |
| Ground cardamom | 0.1 g; 0.2 g (dry) | L049, L052, D056 | Small dose or ingredient form: a useful spoon fraction is not sufficiently close, or no matching reference is established. |
| Ground cinnamon | 0.2 g; 0.5 g (dry); 0.1 g; 0.15 g; 0.25 g (dry) | B046, B051, B052, L049, L050, L052, L053, D053, D061, D063 | Small dose or ingredient form: a useful spoon fraction is not sufficiently close, or no matching reference is established. |
| Ground cloves | 0.05 g; 0.1 g (dry) | L049, L052, L068, D053, D055 | Small dose or ingredient form: a useful spoon fraction is not sufficiently close, or no matching reference is established. |
| Ground turmeric | 0.3 g (dry); 0.3 g; 0.5 g; 0.25 g; 0.5 g (dry); 0.6 g (dry) | B054, L049, L050, L051, L052, L053, L063, D053, D054, D056, D061, D063, D064, D093, D100, D121 | Small dose or ingredient form: a useful spoon fraction is not sufficiently close, or no matching reference is established. |
| Hass avocado flesh, skin and stone removed | 30 g; 40 g; 60 g; 70 g; 45 g; 35 g | L094, L101, L102, L123, D088, D097, D098, D104 | Size, trimming or product form varies; retain the original amount. |
| Liquid egg whites | 50 g | B001, B003, B005, B009, B014, B015, B017, B018, B020, B021, B026, B029, B032, B033, B037 | Keep the precise egg or egg-white portion; a whole-egg count could change the allocation. |
| Nashi pear, flesh and skin | 40 g | L060 | No sufficiently close quarter/whole reference count, or no established matching size reference. |
| Onion | 20 g; 15 g; 40 g; 35 g; 45 g | B053, B054, B056, L049, L051, L060, L065, L072, L075, L076, L080, L082, L083, L084, L085, L089, L094, L097, L100, L122, D083, D086, D089, D091, D092, D093, D097, D098, D099, D100, D119 | No sufficiently close quarter/whole reference count, or no established matching size reference. |
| Pure cayenne chilli powder | 0.3 g (dry); 0.1 g (dry); 0.35 g (dry) | L063, L068, L095, L098, D056, D075 | Size, trimming or product form varies; retain the original amount. |
| Red bell pepper | 40 g; 45 g | B055, L116, D088, D093, D095 | No sufficiently close quarter/whole reference count, or no established matching size reference. |
| Ripe plantain flesh | 230 g (raw ripe flesh); 40 g (raw ripe flesh) | L068, L097 | Size, trimming or product form varies; retain the original amount. |
| Saffron | 0.1 g (dry) | D053, D061, D080 | Small dose or ingredient form: a useful spoon fraction is not sufficiently close, or no matching reference is established. |
| Seed-free unsweetened tamarind flesh | 8 g (no sweetened concentrate); 10 g (no sweetened concentrate) | L063, D058 | Size, trimming or product form varies; retain the original amount. |
| Shallot | 20 g; 40 g; 25 g; 45 g | L061, D071, D072, D073 | No sufficiently close quarter/whole reference count, or no established matching size reference. |
| Spring onion, bulbs and green tops | 15 g; 12.5 g; 25 g; 6 g; 35 g | L058, L060, L066, L087, D067, D068, D076 | No sufficiently close quarter/whole reference count, or no established matching size reference. |
| Table salt | 0.3 g; 0.5 g; 0.45 g; 0.15 g; 0.4 g (dry); 0.3 g (dry); 0.5 g (dry); 0.25 g (dry); 0.6 g (dry); 0.45 g (dry); 0.35 g (dry); 0.2 g (dry); 0.7 g (dry); 0.75 g (dry); 0.8 g (dry); 0.9 g (dry); 1 g (dry); 0.85 g (dry) | L049, L050, L051, L052, L053, L054, L055, L056, L057, L059, L060, L062, L063, L064, L065, L066, L067, L068, L110, L112, L113, L114, L115, D053, D054, D055, D056, D057, D058, D059, D060, D061, D062, D063, D064, D065, D066, D067, D068, D069, D070, D071, D074, D075, D076, D077, D078, D079, D080, D081, D082, D110, D111, D112, D113, D114, D115 | Small dose or ingredient form: a useful spoon fraction is not sufficiently close, or no matching reference is established. |
| Tender lemongrass core | 10 g (finely minced); 7.5 g (finely minced); 12.5 g (finely minced); 14 g (finely minced) | L061, L062, D071, D072, D073 | Size, trimming or product form varies; retain the original amount. |
| Tomato puree | 12.5 g; 6 g; 17.5 g; 22.5 g; 30 g | L059, L099, D059, D065, D066, D074, D077 | No sufficiently close quarter/whole reference count, or no established matching size reference. |
| Whole egg, shell removed | 110 g; 30 g; 20 g; 80 g; 35 g | L057, L059, D060, D064, D066, D081, D087, D100 | Keep the precise egg or egg-white portion; a whole-egg count could change the allocation. |

## Reference basis

- [USDA SR28 household measure weights](https://ods.od.nih.gov/pubs/usdandb/Selenium-Food.pdf): ingredient-specific spoon and food weights. These historical household references are used only for approximate kitchen presentation, not nutrient calculations.
- [Health Canada garlic portions](https://aliments-nutrition.canada.ca/cnf-fce/serving-portion?id=2394&lang=eng): clove reference.
- [Health Canada vegetable portions](https://www.canada.ca/en/health-canada/services/food-nutrition/healthy-eating/nutrient-data/table-4-vegetables-vegetable-products-nutrient-value-some-common-foods-2008.html): carrot and tomato references.
- [Health Canada common foods](https://www.canada.ca/content/dam/hc-sc/migration/hc-sc/fn-an/alt_formats/pdf/nutrition/fiche-nutri-data/nvscf-vnqau-eng.pdf): small apple reference.
- [NHS metric kitchen measures](https://www.fhft.nhs.uk/patients-and-visitors/patient-information-library/liquidised-diet): 5 ml teaspoon and 15 ml tablespoon.
