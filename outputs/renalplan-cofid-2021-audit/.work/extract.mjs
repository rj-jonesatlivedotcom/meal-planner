import { FileBlob, SpreadsheetFile } from '@oai/artifact-tool';
const input=await FileBlob.load('C:/Users/rj-jo/Documents/RenalPlan/outputs/renalplan-cofid-2021-audit/RenalPlan_CoFID_2021_Audit.xlsx');
const w=await SpreadsheetFile.importXlsx(input);
for (const [n,rng] of [['Recipe Status','A5:Q155'],['Nutrient Comparison','A5:M1205'],['Ingredient Audit','A5:AL862']]) {
 const sh=w.worksheets.getItem(n); const vals=sh.getRange(rng).values; console.log('\n'+n+' rows='+vals.length);
 if(n==='Recipe Status') { console.log(JSON.stringify(vals[0])); console.log(JSON.stringify(vals.slice(1).map(x=>[x[0],x[5],x[7],x[8]]))); }
 if(n==='Nutrient Comparison') { console.log(JSON.stringify(vals[0])); for(const row of vals.slice(1).filter(x=>x[0]==='B008')) console.log(JSON.stringify(row)); }
 if(n==='Ingredient Audit') { console.log(JSON.stringify(vals[0])); for(const row of vals.slice(1).filter(x=>x[0]==='B008')) console.log(JSON.stringify(row)); }
}
