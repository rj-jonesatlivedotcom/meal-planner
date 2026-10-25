import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
function run(source,context={}){const exports={};vm.runInNewContext(ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,jsx:ts.JsxEmit.ReactJSX}}).outputText,{exports,...context});return exports;}
function functions(path,names){const source=read(path),ast=ts.createSourceFile(path,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX),found={};function visit(n){if(ts.isFunctionDeclaration(n)&&names.includes(n.name?.text))found[n.name.text]=n.getText(ast);ts.forEachChild(n,visit);}visit(ast);for(const name of names)assert.ok(found[name],name);return names.map(n=>found[n]).join('\n');}
const energy=run(read('lib/energyTarget.ts'));
const diet=run(read('lib/myDiet.ts'));
const targets=run(read('lib/nutrientTargets.ts'),{require:p=>p==='./energyTarget'?energy:diet});
const plannerChoices=run(read('lib/plannerNutrients.ts'));

test('selected nutrients alone drive personalised Planner and Nutrition displays, with legacy profiles preserved',()=>{
 const saved={...diet.defaultRequirements,monitoredNutrients:['potassium']};
 assert.deepEqual(JSON.parse(JSON.stringify(plannerChoices.visiblePlannerNutrients(saved))),['Potassium']);
 for(const nutrient of ['calories','protein','carbohydrates','sodium','phosphate','fluid','fat','fibre'])assert.equal(diet.isPersonalisedNutrientVisible(saved,nutrient),false);
 assert.equal(diet.isPersonalisedNutrientVisible(saved,'potassium'),true);
 assert.equal(targets.evaluateNutrientTarget(1731,saved,'potassium'),'pending');
 assert.equal(targets.nutrientStatusTone(targets.evaluateNutrientTarget(1731,saved,'potassium')),'neutral');
 assert.deepEqual(JSON.parse(JSON.stringify(plannerChoices.visiblePlannerNutrients({...saved,monitoredNutrients:['calories','carbohydrate']}))),['Calories','Carbohydrate']);
 assert.equal(diet.isPersonalisedNutrientVisible({...saved,monitoredNutrients:['fluid']},'fluid'),true);
 assert.equal(plannerChoices.visiblePlannerNutrients(diet.defaultRequirements).length,6);
 assert.equal(diet.isPersonalisedNutrientVisible(diet.defaultRequirements,'protein'),true);
});
const jsx=(type,props)=>({type,props});
const text=node=>node==null||typeof node==='boolean'?'':Array.isArray(node)?node.map(text).join(''):typeof node==='object'?text(node.props?.children):String(node);
function nodes(node){return !node||typeof node!=='object'?[]:Array.isArray(node)?node.flatMap(nodes):[node,...nodes(node.props?.children)];}
const limits={energyMinKcal:1800,energyMaxKcal:2200};
function planner(actual,field='calories',target=limits,carb={min:100,max:250},savedTargets={}){const requirements={nutrientTargetSettings:target,sodiumLimit:2000,proteinMinG:50,proteinMaxG:80,carbohydrateMin:carb.min,carbohydrateMax:carb.max,...savedTargets};return run(functions('app/planner/page.tsx',['getDailyNutritionStatus','Tricirculus'])+'\nexports.status=getDailyNutritionStatus;exports.render=Tricirculus;',{
 ...targets,selectedNumericField:field,nutritionRequirements:requirements,requirements,nutritionView:({calories:'Calories',protein:'Protein',carbohydrates:'Carbohydrate',sodium:'Sodium',potassium:'Potassium',phosphate:'Phosphorus'})[field],snackAccount:{loading:false,error:false,snacks:[]},snackSummary:()=>({[field]:{estimated:false,missing:0}}),getDateForPlannerDay:()=> '2026-10-19',getDailyNutritionTotal:()=>actual,getDailyNutritionLimit:()=>targets.getNutrientTarget(requirements,field).max??null,formatPotassiumMg:n=>`${n} mg`,formatSalt:n=>`${n/400} g`,require:()=>({jsx,jsxs:jsx}),
});}
const nutrition=run(functions('app/nutrition/page.tsx',['worstStatus','numericLimitStatus','getDailyStatus','getStatusText','getStatusDotClass'])+'\nexports.daily=getDailyStatus;exports.numeric=numericLimitStatus;exports.label=getStatusText;exports.dot=getStatusDotClass;', {...targets});
for(const [actual,expected] of [[1527,'Below target'],[1799,'Below target'],[1800,'Within target'],[2000,'Within target'],[2200,'Within target'],[2201,'Exceeds target']])test(`energy ${actual} has correct inclusive classification in shared helper, Planner desktop/mobile and Nutrition`,()=>{
 assert.equal(energy.classifyTargetRange(actual,1800,2200),expected);
 const p=planner(actual);assert.equal(p.status('Monday','calories'),expected);
 for(const desktop of [true,false]){const tree=p.render({day:'Monday',desktop});assert.match(text(tree),new RegExp(expected));const accessible=nodes(tree).find(n=>n.props?.['aria-label']);assert.ok(accessible.props['aria-label'].includes(expected));assert.ok(!accessible.props['aria-label'].includes('exceeds the daily limit'));}
 const result=nutrition.daily({calories:actual},{nutrientTargetSettings:limits});assert.equal(nutrition.label(result),expected);
});
test('no targets, minimum-only, maximum-only, zero and invalid amounts do not invent bounds',()=>{
 assert.equal(targets.evaluateNutrientTarget(null,{sodiumLimit:2000},'sodium'),'pending');
 assert.equal(energy.classifyTargetRange(1500,null,null),null);assert.equal(energy.classifyTargetRange(NaN,1800,2200),null);
 assert.equal(energy.classifyTargetRange(1527,1800,null),'Below target');assert.equal(energy.classifyTargetRange(2201,null,2200),'Exceeds target');assert.equal(energy.classifyTargetRange(0,0,2200),'Within target');
 assert.equal(planner(1527,'calories',{}).status('Monday','calories'),'pending');
 for(const desktop of [true,false])assert.match(text(planner(1527,'calories',{energyMinKcal:1800}).render({day:'Monday',desktop})),/Below target/);
});
test('upper-limit nutrient rules and wording remain unchanged; an upper-limit exceedance takes precedence',()=>{
 for(const [actual,result] of [[1527,'green'],[2000,'green'],[2001,'red']])assert.equal(planner(actual,'sodium').status('Monday','sodium'),result);
 assert.equal(nutrition.numeric(1527,null,2000),'green');assert.equal(nutrition.numeric(2001,null,2000),'red');assert.equal(nutrition.label('red'),'Exceeds limit');assert.equal(nutrition.label('green'),'Within limit');
 assert.equal(nutrition.daily({calories:1527,sodium:2001},{sodiumLimit:2000,nutrientTargetSettings:limits}),'red');
 assert.equal(nutrition.dot('Below target'),'bg-amber-600');assert.equal(nutrition.dot('Within target'),'bg-green-600');
});
test('Nutrition daily and weekly-average energy displays use the shared evaluator',()=>{
 const source=read('app/nutrition/page.tsx');for(const day of ['selectedDay','day','undefined'])assert.ok(source.includes('totalNutrientStatus('+day+', \"calories\")'),day);
});
test('existing offline checklist invokes a real downloadable HTML attachment and preserves 39 lines and checked state',async()=>{
 const list=Array.from({length:39},(_,i)=>({item:i===0?'Rice & <test>':`Item ${i}`,quantity:`${i+1} g`}));const before=JSON.stringify(list),checked=[list[0].item],events=[],timers=[];let blob,anchor;
 const document={body:{appendChild:a=>events.push('append')},createElement:()=>anchor={click(){events.push('click');},remove(){events.push('remove');}}};
 const p=run(functions('app/shopping/page.tsx',['downloadOfflineChecklist'])+'\nexports.download=downloadOfflineChecklist;', {shoppingList:list,checkedItems:checked,categoryOrder:['Cupboard'],getCategory:()=> 'Cupboard',Blob,URL:{createObjectURL:b=>{blob=b;return 'blob:test-checklist';},revokeObjectURL:u=>events.push('revoke:'+u)},document,window:{setTimeout:(callback,ms)=>timers.push({callback,ms})}});
 p.download();assert.deepEqual(events,['append','click','remove']);assert.equal(anchor.href,'blob:test-checklist');assert.equal(anchor.download,'RenalPlan-Offline-Shopping-Checklist.html');assert.equal(blob.type,'text/html;charset=utf-8');
 const html=await blob.text();assert.equal((html.match(/<input id="item-/g)||[]).length,39);assert.match(html,/<input id="item-0-\d+" type="checkbox" checked>\s*<span class="name">Rice &amp; &lt;test&gt;<\/span>/);assert.match(html,/Rice &amp; &lt;test&gt;/);assert.match(html,/name="viewport"/);assert.match(html,/localStorage.setItem/);assert.equal(JSON.stringify(list),before);assert.deepEqual(checked,[list[0].item]);assert.equal(timers[0].ms,1000);timers[0].callback();assert.ok(events.includes('revoke:blob:test-checklist'));
});
test('desktop navbar and mobile shopping button remain connected to the existing download function',()=>{
 const nav=read('components/Navbar.tsx'),shopping=read('app/shopping/page.tsx');assert.match(nav,/window.dispatchEvent\(new Event\("renalplan:download-shopping-checklist"\)\)/);assert.match(shopping,/window.addEventListener\("renalplan:download-shopping-checklist", handleNavbarDownload\)/);assert.match(shopping,/const handleNavbarDownload = \(\) => downloadChecklistHandlerRef.current\(\)/);assert.match(shopping,/downloadChecklistHandlerRef.current = downloadOfflineChecklist/);assert.match(shopping,/onClick=\{downloadOfflineChecklist\}[\s\S]{0,450}lg:hidden/);
});

for(const [actual,expected] of [[99,'Below target'],[100,'Within target'],[250,'Within target'],[251,'Exceeds target']])test(`carbohydrate range ${actual} uses inclusive target states across Planner and Nutrition`,()=>{
 const p=planner(actual,'carbohydrates');assert.equal(p.status('Monday','carbohydrates'),expected);
 for(const desktop of [true,false]){const tree=p.render({day:'Monday',desktop});assert.match(text(tree),new RegExp(expected));assert.match(nodes(tree).find(n=>n.props?.['aria-label']).props['aria-label'],/100.*250 g\/day/);}
 assert.equal(nutrition.label(nutrition.daily({carbohydrates:actual},{carbohydrateMin:100,carbohydrateMax:250})),expected);
});
test('carbohydrate maximum-only and monitor-only behaviour remain upper-limit-only or neutral',()=>{
 for(const [actual,want] of [[99,'green'],[250,'green'],[251,'red']]) assert.equal(planner(actual,'carbohydrates',limits,{min:null,max:250}).status('Monday','carbohydrates'),want);
 assert.equal(planner(99,'carbohydrates',limits,{min:null,max:null}).status('Monday','carbohydrates'),'pending');
 assert.equal(nutrition.daily({carbohydrates:99},{carbohydrateMin:null,carbohydrateMax:250}),'green');assert.equal(nutrition.daily({carbohydrates:251},{carbohydrateMin:null,carbohydrateMax:250}),'red');
});

test('desktop and mobile share a compact three-state range legend with distinct colours',()=>{
 const view=run(functions('app/planner/page.tsx',['NutritionLegend'])+'\nexports.legend=NutritionLegend;',{require:()=>({jsx,jsxs:jsx})});
 const range=view.legend({range:true});assert.equal(text(range),'Below targetWithin targetExceeds target');
 for(const colour of ['bg-amber-600','bg-green-500','bg-red-500'])assert.ok(nodes(range).some(n=>n.props?.className?.includes(colour)));
 assert.equal(text(view.legend({range:false})),'Within limitExceeds limit');
});

for (const [actual,expected] of [[49,'Below target'],[50,'Within target'],[80,'Within target'],[81,'Exceeds target']]) test('protein target '+actual+' uses shared below/within/above rules',()=>{
 const requirements={proteinMinG:50,proteinMaxG:80};
 assert.equal(targets.evaluateNutrientTarget(actual,requirements,'protein'),expected);
 assert.equal(nutrition.numeric(actual,50,80),expected);
});
test('monitored numerical limits are assessed despite legacy wizard flags; hidden and unset targets stay neutral',()=>{
 const saved={...diet.defaultRequirements,proteinMinG:50,proteinMaxG:80,monitoredNutrients:['protein'],nutrientTargetSettings:{enabled:{protein:false},energyMinKcal:1800,energyMaxKcal:2200}};
 const before=JSON.stringify(saved);
 assert.equal(targets.evaluateNutrientTarget(100,saved,'protein'),'Exceeds target');
 assert.equal(targets.evaluateNutrientTarget(2300,saved,'calories'),'pending');
 assert.equal(targets.evaluateNutrientTarget(100,diet.defaultRequirements,'protein'),'pending');
 assert.equal(nutrition.daily({},diet.defaultRequirements),'pending');
 assert.equal(targets.nutrientStatusTone('pending'),'neutral');
 assert.equal(JSON.stringify(saved),before);
});
test('refresh reads saved numerical targets including nutrient_target_settings from the existing owned row',async()=>{
 const row={protein_min_g:50,protein_max_g:80,monitored_nutrients:['protein','calories'],nutrient_target_settings:{enabled:{protein:true,calories:true},energyMinKcal:1800,energyMaxKcal:2200}};
 const calls=[];const query={select:columns=>{calls.push(columns);return query},eq:(column,value)=>{calls.push([column,value]);return query},maybeSingle:async()=>({data:structuredClone(row),error:null})};
 const client={from:table=>{calls.push(table);return query}};
 for(let refresh=0;refresh<2;refresh++){
  const {requirements,error}=await diet.loadRequirements(client,'test-user');assert.equal(error,null);
  assert.equal(targets.evaluateNutrientTarget(1527,requirements,'calories'),'Below target');
  assert.equal(targets.evaluateNutrientTarget(2000,requirements,'calories'),'Within target');
  assert.equal(targets.evaluateNutrientTarget(2201,requirements,'calories'),'Exceeds target');
 }
 assert.equal(calls.filter(c=>c==='user_requirements').length,2);assert.ok(calls.includes('*'));
});
test('estimated totals are assessed normally while unavailable contributions remain unassessed unless already over',()=>{
 const saved={sodiumLimit:2000};
 assert.equal(targets.evaluateNutrientTarget(1900,saved,'sodium'),'green');
 assert.equal(targets.evaluateNutrientTarget(2100,saved,'sodium'),'red');
 assert.equal(targets.evaluateNutrientTarget(1900,saved,'sodium',true),'pending');
 assert.equal(targets.evaluateNutrientTarget(2100,saved,'sodium',true),'red');
});

test('the VS Code profile potassium circle uses its saved 2737 mg limit even when the wizard disabled the old target flag',()=>{
 const saved={...diet.defaultRequirements,potassiumLimitMg:2737,monitoredNutrients:['sodium','potassium','phosphate','calories','fluid'],nutrientTargetSettings:{enabled:{potassium:false,sodium:false,phosphate:false,calories:true,fluid:false},energyMinKcal:null,energyMaxKcal:null}};
 const before=JSON.stringify(saved),p=planner(1731,'potassium',{}, {min:null,max:null},saved);
 assert.equal(p.status('Monday','potassium'),'green');
 for(const desktop of [false,true]){
  const tree=p.render({day:'Monday',desktop});assert.match(text(tree),/Within limit/);
  assert.ok(nodes(tree).some(n=>n.props?.['data-nutrient-status']==='green'));
  assert.match(nodes(tree).find(n=>n.props?.['aria-label']).props['aria-label'],/2737 mg/);
 }
 assert.equal(nutrition.daily({potassium:1731},saved),'green');assert.equal(JSON.stringify(saved),before);
});
