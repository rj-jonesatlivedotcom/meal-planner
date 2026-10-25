import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const read = path => fs.readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const compile = source => ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX } }).outputText;
function load(path, imports = {}) { const exports = {}; vm.runInNewContext(compile(read(path)), { exports, require: name => imports[name] ?? (name.endsWith(".css") ? {default:{}} : require(name)), console, setTimeout:()=>0, clearTimeout(){}, crypto: { randomUUID: () => 'test-snack-id' } }); return exports; }
const helpers = load('lib/foodSnacks.ts');
const { foodSnapshot, snapshotForQuantity, snackSummary, snackTotalLabel, validFoodSnapshot, snackNutrients } = helpers;
const { foodAccount } = load('lib/foodAccount.ts', { './foodSnacks': helpers });
const quantityFields = load('components/food/QuantityFields.tsx', { '@/lib/foodSnacks': helpers });
const base = { energyKcal: 100, protein: 10, carbohydrate: 4, fat: 5, fibre: null, sodium: 0, potassium: null, phosphorus: 20,
  minerals: { potassium: { valueMg: 75, provenance: 'estimated' }, phosphorus: { valueMg: 505, provenance: 'estimated' } } };
const snapshot = () => foodSnapshot(base, 'g', 'as-sold', 'CoFID 2021: Cheese, Cheddar, English, food code 12-346; comparable food, not product measurement.');
const snack = (quantity = 30, date = '2026-10-19') => ({ id: 'test-snack-id', user_id: 'alice', planned_on: date, barcode: '5000295141599', name: 'Cheddar', quantity, snapshot: snapshotForQuantity(snapshot(), quantity) });
function clientHarness() {
  const state = { owner: 'alice', rows: [], calls: [], fail: false };
  const client = { auth: { getUser: async () => ({ data: { user: state.owner ? { id: state.owner } : null }, error: null }) },
    rpc: async (name, args) => { state.calls.push({ rpc: name, args }); return { error: state.fail ? {} : null }; },
    from(table) { const query = { table, filters: [], action: 'select' }; const chain = {
      select() { return chain; }, or() { return chain; }, order() { return chain; },
      eq(k,v) { query.filters.push([k,'=',v]); return chain; }, gte(k,v) { query.filters.push([k,'>=',v]); return chain; }, lte(k,v) { query.filters.push([k,'<=',v]); return chain; },
      delete() { query.action = 'delete'; return chain; },
      async upsert(row, options) { state.calls.push({ table, action: 'upsert', row, options });
        if (!state.fail) { const index = state.rows.findIndex(s => s.id === row.id); if (index >= 0) state.rows[index] = row; else state.rows.push(row); }
        return { error: state.fail ? {} : null }; },
      then(resolve) { state.calls.push(query); const matches = row => query.filters.every(([k,op,v]) => op === '=' ? row[k] === v : op === '>=' ? row[k] >= v : row[k] <= v);
        const rows = state.rows.filter(matches); if (query.action === 'delete' && !state.fail) state.rows = state.rows.filter(row => !matches(row));
        return Promise.resolve({ data: rows, error: state.fail ? {} : null }).then(resolve); }
    }; return chain; }
  }; return { state, client, account: foodAccount(client, 'alice') };
}
test('snack snapshots preserve missing, reported zero, estimates and preparation basis', () => {
  const s = snack().snapshot;
  assert.equal(validFoodSnapshot(s), true); assert.equal(s.nutrients.potassium.value, 22.5); assert.equal(s.nutrients.phosphate.value, 151.5);
  assert.equal(s.nutrients.potassium.kind, 'estimated'); assert.equal(s.nutrients.fibre.value, null); assert.equal(s.nutrients.fibre.kind, 'unavailable');
  assert.equal(s.nutrients.sodium.value, 0); assert.equal(s.nutrients.sodium.kind, 'reported');
  assert.equal(validFoodSnapshot({ ...s, basis: 'unknown' }), false);
});
test('quantity edits use immutable original reference, preserving source and status', () => {
  const s = snack().snapshot; const edited = snapshotForQuantity(s, 50);
  assert.equal(edited.nutrients.potassium.value, 37.5); assert.equal(snapshotForQuantity(edited, 30).nutrients.potassium.value, 22.5);
  assert.equal(s.nutrients.potassium.value, 22.5); assert.equal(edited.source, s.source); assert.equal(edited.reference, s.reference);
  for (const q of [0, -1, NaN, Infinity, 100001]) assert.throws(() => snapshotForQuantity(s,q));
});
test('daily aggregation counts multiple snacks by exact date and flags incomplete/estimated totals', () => {
  const missing = snack(50); missing.snapshot.nutrients.potassium = { value: null, kind: 'unavailable' };
  const result = snackSummary([snack(), missing, snack(100, '2026-10-20')], '2026-10-19');
  assert.equal(result.calories.value, 80); assert.equal(result.potassium.value, 22.5); assert.equal(result.potassium.missing, 1);
  assert.equal(snackTotalLabel('22.5 mg',result.potassium,false), '22.5 mg* (incomplete)');
  assert.equal(snackTotalLabel('0 g',result.fibre,false),'Not available (incomplete)');
  assert.equal(snackTotalLabel('5 g',result.fibre,true),'5 g (incomplete)');
  assert.equal(snackSummary([], '2026-10-19').potassium.value,null);
});
test('adding, editing and removing snapshots updates persisted date totals without product refetch', async () => {
  const h = clientHarness(); await h.account.save(snack()); await h.account.save(snack(50));
  assert.equal(h.state.rows.length,1); assert.equal(snackSummary(await h.account.snacks('2026-10-19','2026-10-25')).potassium.value,37.5);
  assert.equal(h.state.rows[0].snapshot.source,snapshot().source);
  await h.account.remove('test-snack-id'); assert.equal(h.state.rows.length,0);
  assert.ok(h.state.calls.some(c => c.filters?.some(f => f[0] === 'user_id' && f[2] === 'alice')));
});
test('account change and signed-out state block every read/write with no Supabase operation', async () => {
  for (const owner of ['bob', null]) { const h = clientHarness(); h.state.owner = owner;
    for (const operation of [() => h.account.save(snack()), () => h.account.remove('id'), () => h.account.foods(), () => h.account.snacks('2026-10-19','2026-10-25'), () => h.account.library('scan','5000295141599','Cheddar')]) await assert.rejects(operation);
    assert.equal(h.state.calls.length,0);
  }
});
test('forged owners, invalid snapshots and invalid quantities cannot be saved', async () => {
  const h = clientHarness();
  await assert.rejects(() => h.account.save({ ...snack(), user_id: 'bob' }));
  await assert.rejects(() => h.account.save({ ...snack(), snapshot: { ...snapshot(), basis: 'unknown' } }));
  await assert.rejects(() => h.account.save({ ...snack(), quantity: 0 }));
  assert.equal(h.state.calls.length,0);
  h.state.rows = [{ ...snack(), user_id: 'bob' }];
  // Simulate a broken transport that ignores filters, to exercise the response-owner guard.
  h.client.from = () => { const q = { select: () => q, eq: () => q, gte: () => q, lte: () => q, order: async () => ({ data: h.state.rows, error: null }) }; return q; };
  await assert.rejects(() => h.account.snacks('2026-10-19','2026-10-25'));
});
test('library operations store identities/preferences, and failures never report success', async () => {
  const h = clientHarness(); await h.account.library('scan','5000295141599','Cheddar'); await h.account.library('favourite','5000295141599','',true); await h.account.library('clear');
  assert.equal(h.state.calls[0].rpc,'rp_food_library'); assert.equal(h.state.calls[0].args.p_barcode,'5000295141599');
  assert.equal(h.state.calls[1].args.p_favourite,true); assert.equal(JSON.stringify(h.state.calls).includes('snapshot'),false);
  h.state.fail = true; await assert.rejects(() => h.account.save(snack())); await assert.rejects(() => h.account.library('remove','5000295141599'));
});
function functionSource(path,name) {
 const source = read(path), ast = ts.createSourceFile(path,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX); let found;
 function visit(n) { if (ts.isFunctionDeclaration(n) && n.name?.text === name) found = n.getText(ast); ts.forEachChild(n,visit); } visit(ast); assert.ok(found,name); return found;
}
test('Planner daily total includes dated snacks, updates on edit/removal, leaves missing null', () => {
 const context = { ...helpers, snackAccount: { snacks: [snack()] }, getDateForPlannerDay: () => '2026-10-19', mealTypes: ['Breakfast','Lunch','Dinner'], getDayMealRecipes: () => ({}), getNutritionNumber: Number };
 vm.runInNewContext(compile(functionSource('app/planner/page.tsx','getDailyNutritionTotal')),context);
 assert.equal(context.getDailyNutritionTotal('Monday','potassium'),22.5); assert.equal(context.getDailyNutritionTotal('Monday','sodium'),0);
 context.snackAccount.snacks = [snack(50)]; assert.equal(context.getDailyNutritionTotal('Monday','potassium'),37.5);
 context.getDayMealRecipes = () => ({ Breakfast: { calories: 500, nutrition: { potassium: 200 } } }); assert.equal(context.getDailyNutritionTotal('Monday','potassium'),237.5);
 context.getDayMealRecipes = () => ({}); context.snackAccount.snacks = []; assert.equal(context.getDailyNutritionTotal('Monday','potassium'),null);
});
function plannerIndicator(field, snacks, meals = {}) {
 const energy = load('lib/energyTarget.ts'), diet = load('lib/myDiet.ts');
 const targets = load('lib/nutrientTargets.ts', { './energyTarget': energy, './myDiet': diet });
 const context = { ...helpers, ...targets, require, exports: {},
   snackAccount: { snacks, loading: false, error: '' },
   nutritionRequirements: { sodiumLimit: 2000, potassiumLimitMg: 2737 },
   selectedNumericField: field, nutritionView: field === 'sodium' ? 'Sodium' : 'Potassium',
   getDateForPlannerDay: () => '2026-10-19', mealTypes: ['Breakfast', 'Lunch', 'Dinner'], getDayMealRecipes: () => meals };
 const names = ['getNutritionNumber', 'formatSalt', 'formatPotassiumMg', 'getDailyNutritionTotal', 'getDailyNutritionLimit', 'getDailyNutritionStatus', 'Tricirculus'];
 vm.runInNewContext(compile(names.map(name => functionSource('app/planner/page.tsx', name)).join('\n')), context);
 return context;
}
function assertPlannerIndicator(context, tone, label) {
 const render = require('react-dom/server').renderToStaticMarkup;
 for (const desktop of [false, true]) {
   const html = render(context.Tricirculus({ day: 'Monday', desktop }));
   assert.ok(html.includes(`data-nutrient-status="${tone}"`), html);
   if (label) assert.ok(html.includes(label), html);
 }
}

test('Planner colours meals plus a snack normally despite another missing snack value, including quantity edits and removal', () => {
 const missing = snack(); missing.snapshot.nutrients.sodium = { value: null, kind: 'unavailable' };
 const known = { ...snack(50), snapshot: snapshotForQuantity(foodSnapshot({ ...base, sodium: 400 }, 'g', 'as-sold', 'Label'), 50) };
 const before = JSON.stringify(missing);
 const context = plannerIndicator('sodium', [missing, known], { Breakfast: { nutrition: { sodium: '1500 mg' } } });
 assert.equal(context.getDailyNutritionTotal('Monday', 'sodium'), 1700);
 assertPlannerIndicator(context, 'green', 'Within limit');
 context.snackAccount.snacks = [missing, { ...known, snapshot: snapshotForQuantity(known.snapshot, 125) }];
 assert.equal(context.getDailyNutritionTotal('Monday', 'sodium'), 2000);
 assertPlannerIndicator(context, 'green', 'Within limit');
 context.snackAccount.snacks = [missing, { ...known, snapshot: snapshotForQuantity(known.snapshot, 200) }];
 assert.equal(context.getDailyNutritionTotal('Monday', 'sodium'), 2300);
 assertPlannerIndicator(context, 'red', 'Exceeds limit');
 context.snackAccount.snacks = [missing];
 assert.equal(context.getDailyNutritionTotal('Monday', 'sodium'), 1500);
 assertPlannerIndicator(context, 'green', 'Within limit');
 assert.equal(JSON.stringify(missing), before);
});

test('Planner assesses estimated range values with additive uncertainty and missing snack nutrients without blocking green', () => {
 const food = { ...base, minerals: { ...base.minerals, potassium: { valueMg: 240, provenance: 'estimated', basis: 'as-sold', rangeMg: { lower: 200, upper: 240 }, additiveUncertainty: 'Quantity unknown' } } };
 const ranged = { ...snack(), snapshot: snapshotForQuantity(foodSnapshot(food, 'g', 'as-sold', 'Reference'), 30) };
 const missing = snack(); missing.snapshot.nutrients.potassium = { value: null, kind: 'unavailable' };
 const context = plannerIndicator('potassium', [ranged, missing], { Breakfast: { nutrition: { potassium: '1000 mg' } } });
 const before = JSON.stringify(context.snackAccount.snacks);
 assert.equal(context.getDailyNutritionTotal('Monday', 'potassium'), 1072);
 assertPlannerIndicator(context, 'green', 'Within limit');
 context.nutritionRequirements.potassiumLimitMg = 1071;
 assertPlannerIndicator(context, 'red', 'Exceeds limit');
 assert.equal(JSON.stringify(context.snackAccount.snacks), before);
});

test('Planner still leaves wholly unavailable totals, unset limits and failed or loading account reads unassessed', () => {
 const missing = snack(); missing.snapshot.nutrients.sodium = { value: null, kind: 'unavailable' };
 const context = plannerIndicator('sodium', [missing]);
 assert.equal(context.getDailyNutritionTotal('Monday', 'sodium'), null);
 assert.equal(context.getDailyNutritionStatus('Monday', 'sodium'), 'pending');
 context.getDayMealRecipes = () => ({ Breakfast: { nutrition: { sodium: '1000 mg' } } });
 context.nutritionRequirements.sodiumLimit = null;
 assertPlannerIndicator(context, 'neutral');
 context.nutritionRequirements.sodiumLimit = 2000;
 for (const state of [{ loading: true, error: '' }, { loading: false, error: 'Read failed' }]) {
   Object.assign(context.snackAccount, state);
   assert.equal(context.getDailyNutritionStatus('Monday', 'sodium'), 'pending');
   assertPlannerIndicator(context, 'neutral');
 }
});

test('Nutrition uses the same snapshot nutrients alongside existing recipe totals', () => {
 const source=read('app/nutrition/page.tsx'), ast=ts.createSourceFile('page.tsx',source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX); let expression;
 function visit(n) { if(ts.isVariableDeclaration(n) && n.name.getText(ast)==='dayTotals') expression=n.initializer.getText(ast); ts.forEachChild(n,visit); } visit(ast);
 const context = { ...helpers, useMemo: f=>f(), plannerMeals:{}, weeklyPageStorage:{}, days:['Monday','Tuesday'], snackAccount:{snacks:[snack()]}, getCurrentWeekDate: i=>i ? '2026-10-20' : '2026-10-19', getDayTotals:()=>Object.fromEntries(snackNutrients.map(k=>[k,100])) };
 vm.runInNewContext(compile('result = '+expression),context);
 assert.equal(context.result.Monday.potassium,122.5); assert.equal(context.result.Tuesday.potassium,100); assert.equal(context.result.Monday.fibre,100);
 const report=read('app/nutrition/page.tsx'); assert.match(report,/nutrition-print-daily-report/); assert.match(report,/renderSnackBreakdown/); assert.match(report,/row.total = flaggedNutrient/);
});
function walk(node, predicate) { if (!node || typeof node !== 'object') return null; if (predicate(node)) return node; if (typeof node.type === 'function') return walk(node.type(node.props),predicate); for(const child of [node.props?.children].flat(Infinity)) { const found = walk(child,predicate); if(found) return found; } return null; }
function componentHarness() {
 const h=clientHarness(), states=[]; let cursor=0, notifications=0;
 const hooks={ useEffect() {}, useState(initial) { const index=cursor++; if(!(index in states)) states[index]= typeof initial==='function'?initial():initial; return [states[index],v=>states[index]= typeof v==='function'?v(states[index]):v]; }, useRef(value) { const index=cursor++; return states[index]??=( {current:value} ); } };
 const components=load('components/food/AccountFoods.tsx', { react:hooks, './QuantityFields':quantityFields, '@/lib/foodSnacks':helpers, '@/lib/foodAccount':{foodAccount}, '@/lib/supabase/client':{createClient:()=>h.client}, '@/lib/useFoodAccount':{notifyFoodAccount:()=>notifications++}, '@/lib/foodDisplay':load('lib/foodDisplay.ts') });
 return { ...h, components, render(name,props) { cursor=0; return components[name](props); }, notifications:()=>notifications };
}
test('Add to Planner defaults to today and selected portion; rapid duplicate confirmations save once', async () => {
 const h=componentHarness(), props={ owner:'alice',barcode:'5000295141599',name:'Cheddar',snapshot:snapshot(),quantity:30,open:true,onClose(){} };
 let tree=h.render('AddSnack',props); assert.equal(walk(tree,n=>n.props?.['aria-label']==='Quantity').props.value,30);
 assert.equal(walk(tree,n=>n.props?.['aria-label']==='Snack planner date').props.value,helpers.localFoodDate());
 const confirm=walk(tree,n=>n.type==='button' && n.props.children==='Confirm addition'); confirm.props.onClick(); confirm.props.onClick();
 await new Promise(setImmediate); assert.equal(h.state.calls.filter(c=>c.action==='upsert').length,1); assert.equal(h.state.rows[0].snapshot.nutrients.potassium.value,22.5);
 tree=h.render('AddSnack',props); assert.equal(walk(tree,n=>n.type==='button' && String(n.props.children).startsWith('Snack added')).props.disabled,true); assert.equal(h.notifications(),1);
});
test('saved foods reopen by exact barcode, Add to Planner invokes fresh lookup path, clearing preserves favourites in SQL', () => {
 const h=componentHarness(), opened=[]; const foods=[{user_id:'alice',barcode:'5000295141599',name:'Cheddar',favourite:true,last_scanned_at:'2026-10-19'}];
 const tree=h.render('MyFoods',{account:{owner:'alice',foods,repository:h.account,error:'',refresh(){}},onOpen:(...args)=>opened.push(args)});
 walk(tree,n=>n.type==='button' && n.props.children==='Cheddar').props.onClick();
 walk(tree,n=>n.type==='button' && n.props.children==='Add to Planner').props.onClick();
 assert.deepEqual(opened,[['5000295141599',false],['5000295141599',true]]);
 const sql=read('supabase/migrations/20261019130000_food_check_snacks.sql');
 assert.ok(sql.includes("on conflict(user_id,barcode)")); assert.match(sql,/offset 30/); assert.match(sql,/not favourite and last_scanned_at is null/);
 assert.equal((sql.match(/enable row level security/g)||[]).length,2); assert.equal(sql.split("with check ((select auth.uid()) = user_id)").length-1,2); assert.match(sql,/security invoker/);
});
test('snack report renders quantity, missing values, estimates and exact original source without edit actions', () => {
 const React=require('react'), render=require('react-dom/server').renderToStaticMarkup;
 const components=load('components/food/PlannerSnacks.tsx',{'@/app/FoodCheck/barcodePortions':{barcodePortion(){}},'./QuantityFields':quantityFields,'@/lib/foodSnacks':helpers,'@/lib/useFoodAccount':{notifyFoodAccount(){}},'next/link':{default:({children})=>children}});
 const html=render(React.createElement(components.default,{date:'2026-10-19',snacks:[snack()],report:true}));
 assert.match(html,/30/); assert.match(html,/mg\*/); assert.match(html,/Not available/); assert.doesNotMatch(html,/12-346|comparable food|Reference basis/); assert.doesNotMatch(html,/Edit quantity|Remove|Add food/);
});


test('upper range endpoint survives save and feeds actual Planner and Nutrition calculations',async()=>{
  const h=clientHarness();
  const food={...base,minerals:{...base.minerals,potassium:{valueMg:240,provenance:'estimated',basis:'as-sold',rangeMg:{lower:200,upper:240},additiveUncertainty:'test additive quantity unknown'}}};
  const ranged={...snack(),snapshot:snapshotForQuantity(foodSnapshot(food,'g','as-sold','test'),30)};
  await h.account.save(ranged);
  const saved=await h.account.snacks('2026-10-19','2026-10-19');
  assert.equal(saved[0].snapshot.nutrients.potassium.value,72);assert.equal(saved[0].snapshot.reference.potassium.rangeMg.lower,200);
  assert.equal(saved[0].snapshot.nutrients.potassium.additiveUncertainty,'test additive quantity unknown');
  const planner={...helpers,snackAccount:{snacks:saved},getDateForPlannerDay:()=> '2026-10-19',mealTypes:['Breakfast'],getDayMealRecipes:()=>({}),getNutritionNumber:Number};
  vm.runInNewContext(compile(functionSource('app/planner/page.tsx','getDailyNutritionTotal')),planner);
  assert.equal(planner.getDailyNutritionTotal('Monday','potassium'),72);
  const source=read('app/nutrition/page.tsx'),ast=ts.createSourceFile('page.tsx',source,99,true,4);let expression;
  function visit(n){if(ts.isVariableDeclaration(n)&&n.name.getText(ast)==='dayTotals')expression=n.initializer.getText(ast);ts.forEachChild(n,visit);}visit(ast);
  const nutrition={...helpers,useMemo:f=>f(),plannerMeals:{},weeklyPageStorage:{},days:['Monday'],snackAccount:{snacks:saved},getCurrentWeekDate:()=> '2026-10-19',getDayTotals:()=>Object.fromEntries(snackNutrients.map(k=>[k,0]))};
  vm.runInNewContext(compile('result='+expression),nutrition);assert.equal(nutrition.result.Monday.potassium,72);
  const quality=snackSummary(saved).potassium;assert.equal(quality.estimated,true);assert.equal(snackTotalLabel('72 mg',quality,false),'72 mg*');
});

test('Nutrition renders wholly missing snack minerals as unavailable rather than zero',()=>{
  const context={snackQuality:()=>({potassium:{missing:1,known:0,estimated:false}}),days:['Monday'],mealTypes:['Breakfast'],plannerMeals:{},getRecipe:()=>null,incompleteSnacks:()=>true};
  vm.runInNewContext(compile(functionSource('app/nutrition/page.tsx','flaggedNutrient')),context);
  assert.equal(context.flaggedNutrient('0 mg','potassium','Monday'),'Not available*');
});
test('My Foods sections preserve counts, recent limit, search, sorting and library actions', async()=>{
 const h=componentHarness();const foods=Array.from({length:35},(_,i)=>({user_id:'alice',barcode:String(i),name:`Item ${i}`,favourite:i===0,last_scanned_at:'2026-10-19'}));const props={account:{owner:'alice',foods,repository:h.account,error:'',refresh(){}},onOpen(){}};
 let tree=h.render('MyFoods',props);const recent=walk(tree,n=>n.type==='section'&&n.props['aria-label']==='Recently Scanned');assert.equal(walk(recent,n=>n.type==='ul').props.children.length,30);const favourites=walk(tree,n=>n.type==='section'&&n.props['aria-label']==='Favourites');assert.equal(walk(favourites,n=>n.type==='ul').props.children.length,1);
 walk(tree,n=>n.type==='input'&&n.props.type==='search').props.onChange({target:{value:'Item 1'}});tree=h.render('MyFoods',props);assert.equal(walk(tree,n=>n.type==='button'&&n.props.children==='Item 2'),null);
 walk(tree,n=>n.type==='select').props.onChange({target:{value:'name-desc'}});tree=h.render('MyFoods',props);const ordered=walk(tree,n=>n.type==='section'&&n.props['aria-label']==='Recently Scanned');assert.equal(walk(ordered,n=>n.type==='button'&&typeof n.props.children==='string'&&n.props.children.startsWith('Item')).props.children,'Item 19');
 for(const action of ['favourite','remove','clear']){tree=h.render('MyFoods',props);const control=walk(tree,n=>n.type==='button'&&(action==='favourite'?n.props['aria-label']==='Favourite Item 19':action==='remove'?n.props['aria-label']?.startsWith('Remove '):n.props.children==='Clear recent history'));control.props.onClick();await new Promise(setImmediate);assert.ok(h.state.calls.some(c=>c.rpc==='rp_food_library'&&c.args.p_action===action));}
});
test('empty guest snack cells offer Add snack while genuine account errors remain visible',()=>{
 const React=require('react'),render=require('react-dom/server').renderToStaticMarkup;
 const components=load('components/food/PlannerSnacks.tsx',{'@/app/FoodCheck/barcodePortions':{barcodePortion(){}},'./QuantityFields':quantityFields,'@/lib/foodSnacks':helpers,'@/lib/useFoodAccount':{notifyFoodAccount(){}},'next/link':{default:({children,...props})=>React.createElement('a',props,children)}});
 for(const mobile of [false,true]){const props={date:'2026-10-19',snacks:[],compact:true,mobile};const html=render(React.createElement(components.default,props));assert.match(html,/Add snack/);assert.match(html,/href="\/FoodCheck"/);assert.doesNotMatch(html,/Totals may be incomplete|role="alert"/);assert.match(render(React.createElement(components.default,{...props,error:'Account read failed'})),/Account read failed.*Totals may be incomplete/);}
});
