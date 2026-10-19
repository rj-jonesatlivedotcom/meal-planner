import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url), cache = new Map();
const root = new URL("../../", import.meta.url);
const read = path => fs.readFileSync(new URL(path, root), "utf8");
const compile = source => ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX } }).outputText;
function load(path, overrides = {}) {
  const exports = {};
  vm.runInNewContext(compile(read(path)), { exports, Response, Request, URL, AbortSignal, ...overrides.__globals, require: name => {
    if (name in overrides) return overrides[name];
    if (name.startsWith("@/") || name.startsWith(".")) {
      const file = name.startsWith("@/") ? name.slice(2) : new URL(name, new URL(path, root)).pathname.slice(root.pathname.length);
      const resolved = /\.[cm]?[jt]sx?$/.test(file) ? file : file + (fs.existsSync(new URL(file + ".ts", root)) ? ".ts" : ".tsx");
      if (!cache.has(resolved)) cache.set(resolved, load(resolved));
      return cache.get(resolved);
    }
    return require(name);
  } });
  return exports;
}
const curated = load("app/FoodCheck/curatedMinerals.ts"), category = load("app/FoodCheck/categoryMinerals.ts");
const portions = load("app/FoodCheck/barcodePortions.ts"), snapshots = load("lib/foodSnacks.ts");
// Exact OFF API fields retrieved 19 October 2026. These are acceptance fixtures,
// not copied production nutrition or new source records.
const products = {
  "4061463055286": { product_name: "Digestives", nutriments: { "energy-kcal_100g":446.666666666667, proteins_100g:8, fat_100g:19, carbohydrates_100g:63.3333333333333 } },
  "4088600475851": { product_name:"Chunky chopped tomatoes", quantity:"400g", serving_size:"1 portion (200 g)", serving_quantity:200, serving_quantity_unit:"g", categories_tags:["en:canned-tomatoes"], ingredients_text:"citric Acid", nutriments:{ "energy-kcal_100g":22,proteins_100g:1.1,fat_100g:0.1,carbohydrates_100g:3.8 } },
  "7622202830990": { product_name:"Oreo BTS Brown Sugar Pancake Flavour",quantity:"157g",serving_size:"2 cookies (28.5 g)",serving_quantity:28.5,serving_quantity_unit:"g",categories_tags:["en:biscuits"],ingredients_text:"Sugar, WHEAT flour, palm oil, rapeseed oil, WHEAT starch, raising agents (ammonium carbonates, potassium carbonates, sodium carbonates), colour (anthocyanins), caramelised sugar, salt, emulsifier (SOYA lecithins), flavourings, modified starch",nutriments:{"energy-kcal_100g":497,proteins_100g:4.3,fat_100g:23,carbohydrates_100g:67} },
  "5000157062772": { product_name:"BIG SOUP CHICKEN & VEGETABLE",quantity:"400g",serving_size:"1 can (400 g)",categories_tags:["en:canned-soups"],ingredients_text:"Water, Carrots (15%), Potatoes (14%), Chicken (8%), Peas (5%), Onions (4%), Modified Cornflour, Wheat Flour (contains Calcium, Iron, Niacin, Thiamin), Yeast Extracts, Salt, Flavourings (contain Milk)",nutriments:{"energy-kcal_100g":50,proteins_100g:3.1,fat_100g:0.7,carbohydrates_100g:7.4,phosphorus_100g:0,magnesium_100g:0,iron_100g:0,zinc_100g:0} },
};
const cofid = {
  "11-799": { food_code:"11-799",food_name:"Biscuits, digestive, plain",potassium_mg:215,phosphorus_mg:119 },
  "11-813": { food_code:"11-813",food_name:"Biscuits, sandwich, cream",potassium_mg:253,phosphorus_mg:102 },
  "13-530": { food_code:"13-530",food_name:"Tomatoes, canned, whole contents",potassium_mg:212,phosphorus_mg:17 },
};
const soup = { fdcId:171546,description:"Soup, chicken and vegetable, canned, ready-to-serve",dataset:"SR Legacy",unit:"g",preparation:"prepared",completeProductUnclear:false,potassiumMg:133,phosphorusMg:35 };
function declaration(name) {
  const source=read("app/FoodCheck/page.tsx"), ast=ts.createSourceFile("page.tsx",source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX); let found;
  function visit(n) { if(ts.isFunctionDeclaration(n) && n.name?.text===name) found=n.getText(ast); ts.forEachChild(n,visit); } visit(ast); assert.ok(found); return found;
}
async function lookup(code, product = products[code]) {
  const selected=[];
  const context = { ...curated,...category,...portions, myFoods:{repository:null}, console, searchRequestRef:{current:0},barcodeLookupBusyRef:{current:false},searchDebounceRef:{current:null},
    requestResultsScroll(){},setSearching(){},stopScanner(){},setBarcode(){},setBarcodeLoading(){},setError(){},setSelectedFood(){},setResults(){},selectFood:f=>selected.push(f),
    supabase:{from:()=>({select:()=>({eq:(_,id)=>({maybeSingle:async()=>({data:cofid[id],error:null})})})})},
    fetch:async url=>({ok:true,status:200,json:async()=>url.startsWith('/api/')?{food:soup}:{status:1,product}}),
  };
  vm.runInNewContext(compile(declaration("lookupBarcode")),context); await context.lookupBarcode(code); assert.equal(selected.length,1); return selected[0];
}
function snapshot(food) { return snapshots.foodSnapshot(food,food.portion.unit,food.portion.basis,curated.mineralSourceExplanation(food.minerals),food.portion.naturalUnit); }
function planned(food, amount, unit) { return {id:"snack",user_id:"alice",planned_on:"2026-10-19",barcode:food.code,name:food.name,...snapshots.snapshotForEntry(snapshot(food),{amount,unit})}; }

test("digestive scan uses a generic CoFID comparison and two explicitly approximate biscuits",async()=>{
  const f=await lookup("4061463055286"), entry=planned(f,2,"biscuits");
  assert.equal(f.minerals.potassium.valueMg,215);assert.equal(f.minerals.phosphorus.valueMg,119);
  assert.equal(f.portion.amount,14.7);assert.equal(f.portion.naturalUnit.approximate,true); assert.ok(Math.abs(entry.quantity-29.4)<1e-9);
  assert.equal(Math.round(entry.snapshot.nutrients.potassium.value),63);assert.equal(Math.round(entry.snapshot.nutrients.phosphate.value),35);
  assert.equal(entry.snapshot.nutrients.protein.kind,"estimated");assert.equal(entry.snapshot.reference.protein.kind,"reported");
  assert.match(entry.snapshot.source,/11-799/);assert.match(entry.snapshot.naturalUnit.source,/mcvities.ch/);
});
test("tomatoes use whole contents and one/half verified 400g tin",async()=>{
  const f=await lookup("4088600475851"); assert.equal(f.portion.naturalUnit.amount,400);
  const whole=planned(f,1,"tins"), half=planned(f,0.5,"tins");
  assert.equal(whole.snapshot.nutrients.potassium.value,848);assert.equal(whole.snapshot.nutrients.phosphate.value,68);
  assert.equal(half.quantity,200);assert.equal(half.snapshot.nutrients.potassium.value,424);assert.equal(half.snapshot.nutrients.phosphate.value,34);
  assert.match(curated.mineralSourceExplanation(f.minerals,{amount:400,label:"1 tin (400g)"}),/13-530.*400g/);
});
test("Oreo defaults to one 14.25g biscuit, scales three biscuits, and abstains only for potassium salt",async()=>{
  const f=await lookup("7622202830990");assert.equal(f.portion.amount,14.25);assert.equal(f.portion.wholePack.amount,157);
  assert.equal(f.portion.naturalUnit.approximate,false);assert.equal(f.minerals.potassium.valueMg,null);assert.match(f.minerals.potassium.reason,/Potassium salts/);
  const entry=planned(f,3,"biscuits");assert.equal(entry.quantity,42.75);assert.equal(Math.round(entry.snapshot.nutrients.phosphate.value),44);
  assert.equal(entry.snapshot.nutrients.potassium.kind,"unavailable");assert.equal(entry.snapshot.nutrients.phosphate.kind,"estimated");
  assert.match(entry.snapshot.source,/11-813/);assert.match(entry.snapshot.source,/Potassium salts/);
});
test("soup keeps reported zero evidence but treats P/Mg/iron/zinc as questionable; calcium is missing",async()=>{
  const f=await lookup("5000157062772"), entry=planned(f,1,"tins");
  assert.equal(f.minerals.phosphorus.sourceValueMg,0);assert.equal(f.minerals.phosphorus.sourceState,"questionable");
  assert.equal(f.calcium,null);assert.equal(f.magnesium,null);assert.equal(f.iron,null);assert.equal(f.zinc,null);assert.equal(f.questionableMinerals.includes("calcium"),false);
  assert.equal(entry.quantity,400);assert.equal(entry.snapshot.nutrients.potassium.value,532);assert.equal(entry.snapshot.nutrients.phosphate.value,140);
  assert.equal(entry.snapshot.reference.phosphate.sourceValueMg,0);assert.equal(entry.snapshot.reference.phosphate.sourceState,"questionable");
  const half=planned(f,0.5,"tins");assert.equal(half.snapshot.nutrients.potassium.value,266);assert.equal(half.snapshot.nutrients.phosphate.value,70);
  assert.match(entry.snapshot.source,/FDC ID 171546/);
});
test("rules generalise beyond barcodes; unrelated names, sparse macros, dry/prepared and volume mismatches abstain",async()=>{
  assert.equal((await lookup("1234567890123",products["4088600475851"])).minerals.potassium.valueMg,212);
  for(const product of [ {product_name:"Tomato soup",nutriments:products["4088600475851"].nutriments}, {product_name:"Digestive health supplement"}, {...products["4088600475851"],product_name:"Tomato paste concentrate"} ]) assert.equal(category.categoryRule(product),undefined);
  const missing=await curated.resolveCuratedMinerals("unknown",{potassium:null,phosphorus:null},async()=>null,{basis:"as-sold"});
  for(const options of [{basis:"dry",unit:"g"},{basis:"prepared",unit:"g"},{basis:"as-sold",unit:"ml"}]) {
    const result=await category.resolveCategoryMinerals("unknown",products["4088600475851"],missing,async()=>cofid["13-530"],options); assert.equal(result.potassium.valueMg,null);
  }
});
test("additive gates and nutrient approval act independently; reliable positive/zero values are preserved",async()=>{
  const p={...products["4088600475851"],ingredients_text:"Tomatoes, sodium phosphate"};
  const initial=await curated.resolveCuratedMinerals("unknown",{potassium:0,phosphorus:null},async()=>null,{basis:"as-sold"});
  const result=await category.resolveCategoryMinerals("unknown",p,initial,async()=>cofid["13-530"],{basis:"as-sold",unit:"g"});
  assert.equal(result.potassium.valueMg,0);assert.equal(result.potassium.provenance,"reported");assert.equal(result.phosphorus.valueMg,null);assert.match(result.phosphorus.reason,/additives/);
  assert.ok(category.additiveConcern({additives_tags:["en:e450i"]},"phosphorus"));
  const verified={...products["5000157062772"],data_sources:"Producers"};assert.equal(Object.keys(category.questionableMineralZeros(verified)).length,0);
  assert.equal(Object.keys(category.questionableMineralZeros({product_name:"Refined sugar",nutriments:{phosphorus_100g:0,iron_100g:0,zinc_100g:0}})).length,0);
});
test("unavailable or wrong reference data cannot invent estimates",async()=>{
  const initial=await curated.resolveCuratedMinerals("unknown",{potassium:null,phosphorus:null},async()=>null,{basis:"as-sold"});
  for(const row of [null,{...cofid["13-530"],food_code:"wrong"},{...cofid["13-530"],potassium_mg:null,phosphorus_mg:null}]) {
    const result=await category.resolveCategoryMinerals("unknown",products["4088600475851"],initial,async()=>row,{basis:"as-sold",unit:"g"});assert.equal(result.potassium.valueMg,null);assert.equal(result.phosphorus.valueMg,null);
  }
});
test("verified counts and manufacturer servings win; pack weight alone never implies a biscuit count",()=>{
  const p=portions.barcodePortion("unknown",{product_name:"Biscuits",quantity:"168g (12 biscuits)"});assert.equal(p.naturalUnit.amount,14);
  const noCount=portions.barcodePortion("unknown",{product_name:"Biscuits",quantity:"168g"});assert.equal(noCount.naturalUnit,undefined);
  const contradictory=portions.barcodePortion("unknown",{product_name:"Oreo biscuits",quantity:"157g",serving_size:"2 cookies (28.5 g)",serving_quantity:40,serving_quantity_unit:"g"});assert.equal(contradictory.naturalUnit,undefined);
  const noodle=portions.barcodePortion("4061464935198",{product_name:"Noodle pot",quantity:"85g"});assert.equal(noodle.naturalUnit.amount,435);assert.equal(noodle.naturalUnit.basis,"prepared");
  assert.equal(portions.barcodePortion("5000159553834",{product_name:"Galaxy Ripple",quantity:"30g"}).naturalUnit.unit,"bars");
});
test("natural-entry edits preserve historical references and feed daily/weekly report totals",async()=>{
  const f=await lookup("7622202830990"), original=planned(f,2,"biscuits");
  const edited={...original,...snapshots.snapshotForEntry(original.snapshot,{amount:3,unit:"biscuits"})};
  assert.equal(original.quantity,28.5);assert.equal(edited.quantity,42.75);assert.equal(edited.snapshot.reference,original.snapshot.reference);
  const daily=snapshots.snackSummary([edited],"2026-10-19"), weekly=snapshots.snackSummary([edited]);
  assert.equal(daily.phosphate.value,weekly.phosphate.value);assert.equal(daily.phosphate.estimated,true);assert.equal(daily.potassium.value,null);assert.equal(daily.potassium.missing,1);
  assert.match(snapshots.snackQuantityLabel(edited),/3 biscuits.*42.75g/);assert.equal(snapshots.snackSummary([]).phosphate.value,null);
  assert.equal(snapshots.validFoodSnapshot(edited.snapshot),true);assert.equal(snapshots.validFoodSnapshot({...edited.snapshot,naturalUnit:{...edited.snapshot.naturalUnit,basis:"dry"}}),false);
});
test("legacy snapshots remain grams-only; shared controls and report preserve natural quantities in dark/mobile layouts",async()=>{
  const f=await lookup("4088600475851"), legacy=snapshot(f); delete legacy.naturalUnit;
  assert.equal(snapshots.initialQuantityEntry(legacy,200).unit,"g");
  const React=require("react"), render=require("react-dom/server").renderToStaticMarkup, QuantityFields=load("components/food/QuantityFields.tsx").default;
  const html=render(React.createElement(QuantityFields,{snapshot:snapshot(f),value:{amount:0.5,unit:"tins"},onChange(){}}));
  assert.match(html,/200/);assert.match(html,/tins/);assert.match(html,/grams/);assert.match(html,/flex-wrap/);assert.match(html,/dark:bg-slate-800/);
  const Report=load("components/food/PlannerSnacks.tsx",{"next/link":{default:({children})=>children},"@/lib/useFoodAccount":{notifyFoodAccount(){}}}).default;
  const report=render(React.createElement(Report,{date:"2026-10-19",snacks:[planned(f,0.5,"tins")],hideHeading:true,report:true}));
  assert.match(report,/0.5 tins/);assert.match(report,/200g/);assert.match(report,/ESTIMATE/);assert.doesNotMatch(report,/<h3[^>]*>Snacks/);
});
test("USDA category endpoint stays restricted to reviewed IDs and server-only credentials",async()=>{
  const route=load("app/api/food-check/usda/route.ts",{"@/app/FoodCheck/usda.server":{usdaClient:{food:async()=>({status:"ok",data:soup})}}});
  assert.equal((await route.GET(new Request("https://example.test/api/food-check/usda?fdcId=171546"))).status,200);
  assert.equal((await route.GET(new Request("https://example.test/api/food-check/usda?fdcId=999999"))).status,404);
  for(const path of ["app/FoodCheck/page.tsx","app/FoodCheck/categoryMinerals.ts","app/FoodCheck/barcodePortions.ts"])
    assert.doesNotMatch(read(path),/USDA_FDC_API_KEY|usda\.server|api\.nal\.usda\.gov/);
});

test("editing a legacy snack reads unit evidence only and saves three biscuits against its original nutrition",async()=>{
  const f=await lookup("7622202830990"), original=planned(f,2,"biscuits");
  delete original.snapshot.naturalUnit; delete original.snapshot.entry;
  const states=[];let cursor=0, saved, reads=0;
  const hooks={useState(initial){const i=cursor++;if(!(i in states))states[i]=typeof initial==='function'?initial():initial;return[states[i],v=>{states[i]=typeof v==='function'?v(states[i]):v;}];},useRef(value){const i=cursor++;return states[i]??={current:value};}};
  const Report=load("components/food/PlannerSnacks.tsx",{react:hooks,"next/link":{default:()=>null},"@/lib/useFoodAccount":{notifyFoodAccount(){}},
    __globals:{fetch:async()=>{reads++;return{ok:true,json:async()=>({status:1,product:products["7622202830990"]})};}}}).default;
  const shell=Report({date:"2026-10-19",snacks:[original],repository:{save:async value=>{saved=value;}}});
  function find(node,predicate){if(!node||typeof node!=='object')return null;if(predicate(node))return node;if(typeof node.type==='function')return find(node.type(node.props),predicate);for(const child of [node.props?.children].flat(Infinity)){const found=find(child,predicate);if(found)return found;}return null;}
  const row=find(shell,n=>typeof n.type==='function'&&n.props?.snack?.id===original.id);
  const render=()=>{cursor=0;return row.type(row.props);};
  find(render(),n=>n.type==='button'&&n.props.children==='Edit quantity').props.onClick();await new Promise(setImmediate);
  assert.equal(reads,1);
  const input=find(render(),n=>n.type==='input'&&n.props['aria-label']===`Quantity for ${original.name}`);assert.equal(input.props.value,2);input.props.onChange({target:{value:'3'}});
  find(render(),n=>n.type==='button'&&n.props.children==='Save quantity').props.onClick();await new Promise(setImmediate);
  assert.equal(saved.quantity,42.75);assert.equal(saved.snapshot.entry.unit,'biscuits');assert.equal(saved.snapshot.entry.amount,3);
  assert.equal(saved.snapshot.reference,original.snapshot.reference);assert.equal(saved.snapshot.source,original.snapshot.source);assert.equal(saved.snapshot.naturalUnit.approximate,true);
  assert.equal(original.quantity,28.5);assert.equal(original.snapshot.naturalUnit,undefined);
});
