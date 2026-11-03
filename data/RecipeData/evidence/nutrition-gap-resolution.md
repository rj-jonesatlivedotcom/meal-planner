# Six recipe nutrition gaps — 3 November 2026

This revision fills the previously missing nutrition fields in L061, L062,
D069, D071, D072 and D073. These are source-backed ingredient-input estimates,
not measurements of the finished meals or personalised suitability decisions.
The original 150 and the other 154 recipes are unchanged.

## Current one-serving figures

| Code | kcal | Protein g | Carbohydrate g | Fat g | Fibre g | Sodium mg | Potassium mg | Phosphorus mg | Salt g |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| L061 | 691 | 39.0 | 82.3 | 20.4 | 6.0 | 1482 | 1048 | 347 | 3.70 |
| L062 | 770 | 42.6 | 81.6 | 28.9 | 8.1 | 1539 | 1164 | 331 | 3.85 |
| D069 | 1013 | 53.3 | 121.1 | 33.7 | 4.9 | 1212 | 1249 | 438 | 3.03 |
| D071 | 1175 | 56.6 | 108.2 | 55.2 | 10.7 | 1293 | 2122 | 613 | 3.23 |
| D072 | 1194 | 47.5 | 118.9 | 55.1 | 9.3 | 2072 | 1437 | 631 | 5.18 |
| D073 | 1169 | 55.6 | 106.3 | 54.3 | 8.3 | 1379 | 1702 | 666 | 3.45 |

Carbohydrate excludes fibre. Do not subtract fibre again. Retained values keep
their prior rounding; new values sum unrounded ingredient contributions before
rounding. Salt derives from unrounded sodium times 2.5/1000. The historical app
key `phosphate` holds the composition tables' phosphorus mg value.

## Sources and decisions

- Suttisansanee et al., Heliyon 2023, e15951,
  [article](https://pmc.ncbi.nlm.nih.gov/articles/PMC10189170/) and
  [supplement](https://ars.els-cdn.com/content/image/1-s2.0-S2405844023031584-mmc1.pdf).
  Table S5, printed/PDF pages 14–17, reports **fresh-weight** composition.
  Pages were visually checked for row/column alignment. Table 1's dry-weight
  numbers were not used. Lemongrass stalk dietary fibre is the mean of 7.90 and
  10.44 g/100 g. Galangal rhizome source means are retained in the JSON audit.
  These botanical/edible-part matches estimate tender core and peeled rhizome;
  neither exact recipe ingredient has been independently sampled.
- Galangal carbohydrate keeps the earlier 1.935 g/100 g available-by-weight
  reconciliation. Energy is derived as 4 × available carbohydrate + 4 × protein
  + 9 × fat + 2 × dietary fibre = 19.265 kcal/100 g. The paper's energy values
  (23.19 and 30.22 kcal) used total carbohydrate including fibre at 4 kcal/g;
  those published figures are preserved separately, not silently mixed into the
  by-weight carbohydrate calculation.
  The 4/4/9/2 kcal factors follow
  [Annex XIV's energy conversion factors](https://www.legislation.gov.uk/eur/2011/1169/annex/XIV/data.xht?view=snippet&wrap=true).
- The [Kikkoman UK mirin-style seasoning label](https://www.kikkoman.co.uk/products/detail/kikkoman-mirin-style-sweet-seasoning)
  does not report fibre, potassium or phosphorus. Missing label fields were not
  converted to zero. Generic Japanese mirin-style composition was rejected as
  evidence for the named UK product: formulation, concentration and measurement
  basis differ.
- The user authorised a seasoning replacement. In D069, 17.5 ml mirin-style
  seasoning is removed and replaced with an extra 14 g sugar, 3.5 g plain
  unseasoned vinegar and 7 g water. The sauce now has 23 g sugar and 19.5 g water;
  the separate salad vinegar remains 12.5 g. The method, shopping ingredients,
  carbohydrate line audit and dietary guide all reflect the revision. This is
  a sweet-acid glaze adaptation, not a claim of identical mirin flavour.
- Sugar and vinegar use the existing [CoFID 2021](https://www.gov.uk/government/publications/composition-of-foods-integrated-dataset-cofid)
  food codes 17-063 and 17-339. Their raw cells are cross-checked against the
  retained balanced-110 evidence records. Source-reported zero and trace tokens
  are kept distinct from missing data. Water retains the original calculation
  basis. No conversion from millilitres to grams was guessed.

## Preservation and limits

Only missing nutrient fields change in five recipes. D069's whole nutrition
panel is recalculated for the authorised ingredient change. Top-level calorie
and protein figures mirror the completed nutrition panel. Existing diet tags,
ratings, images, portions and unrelated methods stay unchanged. Guides remove
now-obsolete incomplete-mineral statements; source links and fingerprints are
updated. Historical audit files describe earlier dated revisions; this record
supersedes their missing-value findings for these six app recipes only.

The JSON audit retains exact before/after recipe records, source identifiers,
raw input values, per-ingredient unrounded contributions and complete totals.
The calculation does not invent cooking-retention, mineral-leaching, oil-loss
or final served-fluid measurements. Ordinary food variability, product choices,
prior conditional proxy limitations and the need to compare whole-day totals
remain. Recipes were not kitchen-tested in this revision. Complete numeric
fields do not establish that a meal meets a particular person's daily targets.
