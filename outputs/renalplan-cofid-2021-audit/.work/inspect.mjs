import { FileBlob, SpreadsheetFile } from '@oai/artifact-tool';
const input = await FileBlob.load('C:/Users/rj-jo/Documents/RenalPlan/outputs/renalplan-cofid-2021-audit/RenalPlan_CoFID_2021_Audit.xlsx');
const workbook = await SpreadsheetFile.importXlsx(input);
const summary = await workbook.inspect({kind:'workbook,sheet', maxChars:5000});
console.log(summary.ndjson);
for (const name of ['Recipe Status','Nutrient Comparison','Ingredient Audit','Potato K Review']) {
  try { const v = await workbook.inspect({kind:'table',range:`'${name}'!A1:Z8`,include:'values,formulas',tableMaxRows:8,tableMaxCols:26}); console.log('\n'+name+'\n'+v.ndjson); } catch(e) { console.log(name+': '+e.message); }
}
