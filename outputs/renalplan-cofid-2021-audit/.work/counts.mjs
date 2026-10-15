import { FileBlob, SpreadsheetFile } from '@oai/artifact-tool';const w=await SpreadsheetFile.importXlsx(await FileBlob.load('C:/Users/rj-jo/Documents/RenalPlan/outputs/renalplan-cofid-2021-audit/RenalPlan_CoFID_2021_Audit.xlsx'));
const st=w.worksheets.getItem('Recipe Status').getRange('A6:Q155').values;const nu=w.worksheets.getItem('Nutrient Comparison').getRange('A6:M1205').values;
const by=new Map();for(const r of nu){if(!r[0]||r[3]==='Fibre (AOAC)')continue;if(!by.has(r[0]))by.set(r[0],[]);by.get(r[0]).push(r)}
const completeRows=[...by.values()].filter(a=>a.length===7&&a.every(x=>x[7]==='Complete'||x[7]==='Complete; trace counted as 0')).length;
const onlyDiff=st.filter(r=>r[0]&&r[5]==='Unresolved pending better source data'&&String(r[7]||'').split(' | ').every(x=>x.includes('nutrient comparisons differ'))).map(r=>({code:r[0],flags:r[7],bad:(by.get(r[0])||[]).filter(x=>x[7].startsWith('Complete')&&typeof x[11]==='number'&&Math.abs(x[11])>.1).map(x=>[x[3],x[11]])}));
console.log(JSON.stringify({recipesWithAll7Complete:completeRows,unresolvedOnlyDifference:onlyDiff}));
