# Phase 1 fibre evidence — 20 November 2026

This snapshot preserves the evidence for fibre reconciliation in RenalPlan's original 150 recipes. It is an ingredient-input estimate, not a measurement of cooked meals or clinical approval.

- `RenalPlan_Recipe_Verification_Pre_Phase1.xlsx` is the unchanged original verification workbook.
- `RenalPlan_Recipe_Verification_Phase1_Fibre.xlsx` contains the updated fibre totals, ingredient contributions, before/after figures and unresolved ingredients. Its original three tabs and unrelated evidence are preserved.
- `fibre-reconciliation.json` is an exact copy of the corresponding repository evidence record. It retains food codes, publication URLs, source-file hashes, raw values, calculation quantities, before/after values and matching limitations.
- `snapshot.json` identifies the pre-Phase-1 baseline, exact corrected recipe-data commit, recipe-file Git objects and SHA-256 hashes, and checksums of both workbooks and the reconciliation record.

There are 114 numerical corrections, one formatting-only change, 32 unchanged complete estimates and three unavailable totals. B006, B022 and B032 remain unavailable because compatible fibre evidence for the specified seeded-fruit jam was not established. Known subtotals are retained as evidence and are not published as complete totals.

CoFID AOAC fibre is preferred. Compatible USDA SR28 total dietary fibre supplements are identified explicitly, including analytical-method uncertainty and USDA's published assumed-zero record for raw lean beef. NSP is not substituted. Other nutrient values, carbohydrate conventions, ingredients, quantities, portions, methods and dietary guides are unchanged.

For a later BDA/NKF review, use `recipeDataCommit` in `snapshot.json` to retrieve the corresponding recipe files with `git show <recipeDataCommit>:<path>`. The manifest's Git object IDs and LF-normalised source hashes allow independent verification even if the working checkout has moved on. Workbook hashes cover their exact bytes; the reconciliation JSON hash and byte count use UTF-8 with LF line endings so Windows checkout conversion does not change its identity. The two Excel files and reconciliation record can be retrieved directly from that commit at this snapshot path. Retain this dated snapshot unchanged; later evidence revisions should use a new directory.

The metadata follow-up commit records `recipeDataCommit` after committing and testing the recipe-data version. It changes no recipe or workbook content.
