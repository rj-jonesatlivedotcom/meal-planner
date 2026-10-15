import { FileBlob, SpreadsheetFile } from '@oai/artifact-tool';
const input=await FileBlob.load('C:/Users/rj-jo/Documents/RenalPlan/outputs/renalplan-cofid-2021-audit/RenalPlan_CoFID_2021_Audit.xlsx'); const w=await SpreadsheetFile.importXlsx(input);
const sr=w.worksheets.getItem('Recipe Status').getRange('A6:Q155').values;
const nr=w.worksheets.getItem('Nutrient Comparison').getRange('A6:M1205').values;
const excluded='Fibre (AOAC)'; const comps=new Map(); for(const r of nr){ if(!r[0]||r[3]===excluded) continue; if(!comps.has(r[0]))comps.set(r[0],[]); comps.get(r[0]).push({nutrient:r[3],original:r[5],cofid:r[6],complete:r[7],pct:r[11]}); }
const statuses={}; for(const r of sr){const code=r[0]; if(!code)continue; (statuses[r[5]]??=[]).push(code);}
console.log('status_counts',JSON.stringify(Object.fromEntries(Object.entries(statuses).map(([k,v])=>[k,v.length]))));
console.log('nonverified_bycurrent',JSON.stringify(sr.filter(r=>r[0]&&r[5]!=='Verified').map(r=>({code:r[0],status:r[5],flags:r[7],lowConf:r[9],aliases:r[10],estimated:r[11],missing:r[12],tr:r[13],cooked:r[14]}))));
console.log('incomplete_nonfibre',JSON.stringify([...comps].filter(([k,v])=>v.length!==7).map(([k,v])=>[k,v.length])));
console.log('over10_nonfibre',JSON.stringify([...comps].map(([k,v])=>[k,v.filter(c=>c.complete==='Complete'&&typeof c.pct==='number'&&Math.abs(c.pct)>0.10).map(c=>[c.nutrient,c.pct])]).filter(x=>x[1].length)));
console.log('fibre_outliers',JSON.stringify(nr.filter(r=>r[3]===excluded&&r[7]==='Complete'&&typeof r[11]==='number'&&Math.abs(r[11])>.1).map(r=>[r[0],r[1],r[11]])));
