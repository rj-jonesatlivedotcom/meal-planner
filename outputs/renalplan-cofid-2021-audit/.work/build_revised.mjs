import fs from 'node:fs/promises';
import { FileBlob, SpreadsheetFile } from '@oai/artifact-tool';
const base = 'C:/Users/rj-jo/Documents/RenalPlan/outputs/renalplan-cofid-2021-audit';
const source = `${base}/RenalPlan_CoFID_2021_Audit.xlsx`;
const outputPath = `${base}/RenalPlan_CoFID_2021_Audit_Fibre_Excluded.xlsx`;
const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(source));
const summary = workbook.worksheets.getItem('Summary');
const status = workbook.worksheets.getItem('Recipe Status');
const nutrient = workbook.worksheets.getItem('Nutrient Comparison');
const ingredients = workbook.worksheets.getItem('Ingredient Audit');
const methods = workbook.worksheets.getItem('Method and Sources');

// Revise the summary to cover the seven specified non-fibre nutrients.
summary.getRange('B9').values = [[16]];
summary.getRange('B10').values = [[9]];
summary.getRange('B11').values = [[125]];
summary.getRange('A16:B16').values = [['Ingredient lines using estimated household weights',232]];
summary.getRange('A17:B17').values = [['Recipes with all 7 comparisons complete',107]];
summary.getRange('D10:F12').values = [
  ['Sodium (mg)',145,150],
  ['Potassium (mg)',144,150],
  ['Phosphorus (mg)',144,150],
];
summary.getRange('D13:F13').clear({applyTo:'contents'});
summary.getRange('A2').values = [['RenalPlan recipe audit against CoFID 2021']];
summary.getRange('A3').values = [['Second-pass review of 150 active recipes. Fibre is excluded from the revised audit. Unmatched ingredients are excluded from numeric totals; all listed recipe lines remain visible for review.']];
summary.getRange('A22:B22').values = [['Potassium in potato dishes','D023 and D040 are under-reported against conservative cooked/drained scenarios. L028-L030 appear over-reported because cut potatoes are boiled and the cooking water is discarded. Exact values need recipe-specific weights and cooking details.']];
summary.getRange('A23:B23').values = [['Second-pass status','16 verified under the seven specified non-fibre CoFID comparisons and declared assumptions; 9 discrepancies; 125 still need source or recipe clarification.']];

// Keep the full recipe detail while excluding fibre comparison rows and data.
const allNutrients = nutrient.getRange('A6:M1205').values;
const recipeStatuses = new Map(status.getRange('A6:Q155').values.filter(r=>r[0]).map(r=>[r[0],r[5]]));
recipeStatuses.set('B008','Verified');
const comparisonRows = allNutrients.filter(r=>r[0] && r[3] !== 'Fibre (AOAC)');
const corrected = {Energy:280,Protein:5.6,Carbohydrate:46.2,Fat:9.3,Sodium:294,Potassium:106,'Phosphorus vs listed phosphate':70};
const cofid = {Energy:279.9,Protein:5.61,Carbohydrate:46.23,Fat:9.34,Sodium:293.6,Potassium:105.6,'Phosphorus vs listed phosphate':70};
for (const r of comparisonRows) {
  r[2] = recipeStatuses.get(r[0]) ?? r[2];
  if (r[0] === 'B008') {
    const val = corrected[r[3]];
    const ref = cofid[r[3]];
    if (val === undefined || ref === undefined) throw new Error(`Unexpected B008 nutrient row ${r[3]}`);
    r[5] = val;
    r[10] = ref - val;
    r[11] = val === 0 ? null : Math.round((r[10] / val) * 1000) / 1000;
    r[12] = 'Recalculated from weighed ingredients and exact CoFID matches; stored values rounded to RenalPlan display precision.';
  }
}
if (comparisonRows.length !== 1050) throw new Error(`Expected 1050 non-fibre comparisons, found ${comparisonRows.length}`);
nutrient.getRange('A3').values = [['1,050 rows: seven nutrient checks per recipe. Fibre is excluded from this audit. “CoFID numeric subtotal” excludes N/blank cells; incomplete comparisons have no difference.']];
nutrient.getRange('F5').values = [['Revised stored value']];
nutrient.getRange('K5').values = [['Difference (CoFID - stored)']];
nutrient.getRange('A6:M1055').values = comparisonRows;
nutrient.getRange('A1056:M1205').clear({applyTo:'contents'});

// B008 is now supported by complete exact CoFID matches and gram quantities.
const statusRows = status.getRange('A6:Q155').values;
for (const r of statusRows) {
  if (!r[0]) continue;
  if (r[5] === 'Verified') {
    r[6] = String(r[6] ?? '').replaceAll('all eight nutrient comparisons','all seven non-fibre nutrient comparisons');
  }
  if (r[0] === 'B008') {
    r[5] = 'Verified';
    r[6] = 'All seven audited nutrient comparisons are complete and within ±10% using exact CoFID matches and stated gram quantities. This verifies the calculation for the listed ingredients and portions.';
    r[7] = null;
    r[16] = 'Stored nutrition values corrected to the itemized CoFID subtotal and rounded to RenalPlan precision; other recipe fields reviewed and retained.';
  }
}
status.getRange('A6:Q155').values = statusRows;

// Remove fibre values from the revised audit's ingredient detail, leaving clear exclusion labels.
ingredients.getRange('Y5').values = [['CoFID AOAC fibre (excluded from this audit)']];
ingredients.getRange('AG5').values = [['Fibre contribution (excluded from this audit)']];
ingredients.getRange('Y6:Y862').clear({applyTo:'contents'});
ingredients.getRange('AG6:AG862').clear({applyTo:'contents'});

// Update definitions and maintain the old phosphorus numerical basis.
methods.getRange('A3').values = [['Seven specified nutrients are audited. Fibre is excluded from calculations, completeness counts and status criteria.']];
methods.getRange('B3').clear({applyTo:'contents'});
methods.getRange('A10:C11').values = [
  ['Nutrient fields','Energy, protein, available carbohydrate, fat, sodium, potassium and phosphorus are audited. Fibre is excluded from this audit.','CoFID 1.3 Proximates and 1.4 Inorganics.'],
  ['Calculation','Per-ingredient contribution = nutrient per 100 g × converted ingredient grams ÷ 100. Recipe numeric subtotal per serving = sum of ingredient contributions ÷ recipe servings. Fibre is excluded.','Ingredient Audit contribution columns and Nutrient Comparison.'],
];
methods.getRange('A19:C21').values = [
  ['Stored values','Current stored nutrition values after the supported B008 correction. Previous B008 values and the field-by-field changes are in the change log.','data/RecipeData/breakfasts.ts; change log.'],
  ['Difference','Difference = CoFID numeric subtotal per serving minus the revised stored recipe value. Difference percent = difference ÷ revised stored value. Fibre is excluded. Differences are not calculated for incomplete CoFID nutrient totals.','Nutrient Comparison.'],
  ['Verified status','Second-pass Verified requires all seven audited nutrient comparisons complete, accepted exact or standardized food matches, no unresolved cooked/drained weight basis, and each difference within ±10% using the disclosed portion assumptions. Fibre is excluded. This verifies the calculation under those inputs. The 10% band is a QA screen, not a clinical or regulatory tolerance.','Recipe Status.'],
];
methods.getRange('B22').values = [['Nine discrepancies remain: six recipes list less fat than the vegetable oil alone; D023 and D040 have potassium below conservative boiled/drained scenarios; and L028-L030 likely overstate potassium because potato cooking water is discarded. These values remain unchanged because exact recipe-specific cooking losses or oil retention are not established.']];
methods.getRange('A29:C29').values = [['Fibre','Fibre is excluded from the revised audit calculations, completeness statistics and status criteria. Fibre fields and calculations in the RenalPlan application are unchanged.','User instruction.']];
methods.getRange('A29:C29').format.wrapText = true;
methods.getRange('A29:C29').format.verticalAlignment = 'center';
methods.getRange('A29:C29').format.rowHeight = 32;

workbook.recalculate();
const check = await workbook.inspect({kind:'table',range:'Summary!A4:F16',include:'values',tableMaxRows:16,tableMaxCols:6});
console.log(check.ndjson);
const errorScan = await workbook.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!',options:{useRegex:true,maxResults:100}});
console.log('ERROR_SCAN',errorScan.ndjson);
await fs.mkdir(base,{recursive:true});
const file = await SpreadsheetFile.exportXlsx(workbook);
await file.save(outputPath);
console.log(`SAVED ${outputPath}`);
