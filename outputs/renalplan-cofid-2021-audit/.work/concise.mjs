import { FileBlob, SpreadsheetFile } from '@oai/artifact-tool'; const w=await SpreadsheetFile.importXlsx(await FileBlob.load('C:/Users/rj-jo/Documents/RenalPlan/outputs/renalplan-cofid-2021-audit/RenalPlan_CoFID_2021_Audit.xlsx'));
const st=w.worksheets.getItem('Recipe Status').getRange('A6:Q155').values; const nu=w.worksheets.getItem('Nutrient Comparison').getRange('A6:M1205').values; const sum=w.worksheets.getItem('Summary').getRange('A1:F24').values; const methods=w.worksheets.getItem('Method and Sources').getRange('A1:C28').values;
const statuses={}; for(const r of st){if(r[0]){statuses[r[5]]=(statuses[r[5]]||[]).concat(r[0]);}}
const byN={}; for(const r of nu){if(r[0]&&r[3]!=='Fibre (AOAC)'){const k=r[7];byN[k]=(byN[k]||0)+1;}}
console.log('discrepancies',JSON.stringify(st.filter(r=>r[0]&&r[5]==='Discrepancy requiring correction').map(r=>[r[0],r[1],r[7]])));
console.log('nonnfibre_completeness',JSON.stringify(byN));
console.log('summary',JSON.stringify(sum.filter(r=>r.some(x=>x!==null))));
console.log('methods',JSON.stringify(methods.filter(r=>r.some(x=>x!==null))));
