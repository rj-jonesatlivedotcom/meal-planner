import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

function load(path, imports = {}) {
  const exports = {};
  const source = fs.readFileSync(new URL(path, import.meta.url), "utf8");
  const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  vm.runInNewContext(js, { exports, require: id => {
    if (id === "server-only") return {};
    assert.ok(imports[id], "unexpected import " + id); return imports[id];
  }, process: { env: {} }, Response, URL, AbortSignal, fetch: async () => { throw new Error("unexpected network request"); } });
  return exports;
}
const data = load("./usdaData.ts");
const server = load("./usda.server.ts", { "./usdaData": data });
const curated = load("./curatedMinerals.ts");
const base = { fdcId: 171615, description: "Soup, ramen noodle, chicken flavor, dry", dataType: "SR Legacy", foodNutrients: [
  { nutrient: { id: 1092, unitName: "mg" }, amount: 183, foodNutrientDerivation: { description: "Analytical", foodNutrientSource: { description: "Analytical data" } } },
  { nutrient: { id: 1091, unitName: "mg" }, amount: 115 },
] };
const response = (body, status = 200, headers = {}) => Response.json(body, { status, headers });

test("USDA details preserve exact FDC identity, dataset, units and provenance", () => {
  const food = data.parseUsdaFood(base);
  assert.equal(food.fdcId, 171615); assert.equal(food.dataset, "SR Legacy");
  assert.equal(food.potassiumMg, 183); assert.equal(food.phosphorusMg, 115); assert.equal(food.unit, "g");
  assert.match(food.url, /171615/); assert.equal(food.provenance[0].derivation, "Analytical");
});
test("USDA search nutrient shape, grams and micrograms convert to mg", () => {
  const food = data.parseUsdaFood({ ...base, foodNutrients: [
    { nutrientId: 1092, nutrientNumber: "306", unitName: "G", value: "0.183" },
    { nutrientId: 1091, nutrientNumber: "305", unitName: "UG", value: 115000 },
  ] });
  assert.equal(food.potassiumMg, 183); assert.equal(food.phosphorusMg, 115);
});
for (const value of [undefined, null, "", "  ", "unknown", false, [], {}, NaN, Infinity, -1]) {
  test("USDA invalid mineral stays missing: " + String(value), () => {
    const food = data.parseUsdaFood({ ...base, foodNutrients: [{ nutrient: { id: 1092, unitName: "mg" }, amount: value }] });
    assert.equal(food.potassiumMg, null); assert.equal(food.phosphorusMg, null);
  });
}
test("USDA zeros remain zero with branded rounding caveat; per-serving labels are not substituted", () => {
  const food = data.parseUsdaFood({ ...base, dataType: "Branded", servingSize: 30, servingSizeUnit: "g", householdServingFullText: "1 bar", brandOwner: "Example", gtinUpc: "123", ingredients: "MILK, COCOA", foodNutrients: [{ nutrient: { id: 1092, unitName: "mg" }, amount: 0 }], labelNutrients: { phosphorus: { value: 45 } } });
  assert.equal(food.potassiumMg, 0); assert.equal(food.phosphorusMg, null);
  assert.equal(food.provenance[0].zeroMayBeRounded, true); assert.equal(food.serving.amount, 30);
  assert.equal(food.brand, "Example"); assert.equal(food.barcode, "123");
});
test("unknown mineral units and branded mass/volume ambiguity cannot become gram estimates", () => {
  const unknown = data.parseUsdaFood({ ...base, dataType: "Branded", servingSizeUnit: "oz", foodNutrients: [{ nutrient: { id: 1092, unitName: "%DV" }, amount: 5 }] });
  assert.equal(unknown.potassiumMg, null); assert.equal(unknown.unit, "unknown");
  assert.equal(data.parseUsdaFood({ ...base, dataType: "Branded", servingSizeUnit: "ml" }).unit, "ml");
});
test("USDA partial packet references retain the preparation limitation", () => {
  const food = data.parseUsdaFood({ ...base, foodPortions: [{ gramWeight: 81, modifier: "package without flavor packet" }, { gramWeight: 6, modifier: "packet" }] });
  assert.equal(food.preparation, "dry"); assert.equal(food.completeProductUnclear, true);
  assert.equal(food.portions[0].grams, 81);
});
test("server client uses official detail/search endpoints and keeps key out of URLs/results", async () => {
  const calls = [];
  const client = server.createUsdaClient({ apiKey: () => "private-test-token", fetcher: async (url, options) => {
    calls.push({ url, options }); return response(url.includes("foods/search") ? { foods: [base] } : base);
  } });
  const detail = await client.food(171615), search = await client.search("chicken ramen");
  assert.equal(detail.status, "ok"); assert.equal(search.data.length, 1);
  assert.equal(calls[0].url, "https://api.nal.usda.gov/fdc/v1/food/171615");
  assert.equal(calls[1].options.method, "POST"); assert.equal(calls[0].options.headers["X-Api-Key"], "private-test-token");
  assert.equal(JSON.parse(calls[1].options.body).dataType.length, 4);
  assert.ok(!JSON.stringify([calls.map(c => c.url), detail, search]).includes("private-test-token"));
  assert.ok(calls[0].options.signal instanceof AbortSignal);
});
test("successful requests are cached, deduplicated and expire", async () => {
  let now = 0, calls = 0, release;
  const client = server.createUsdaClient({ apiKey: () => "test", now: () => now, fetcher: async () => {
    calls++; if (calls === 1) await new Promise(resolve => { release = resolve; }); return response(base);
  } });
  const a = client.food(171615), b = client.food(171615); assert.equal(calls, 1); release();
  await Promise.all([a, b]); await client.food(171615); assert.equal(calls, 1);
  now = 86400001; await client.food(171615); assert.equal(calls, 2);
});
test("missing/demo key skips requests; API errors and timeout failures are graceful and briefly cached", async () => {
  for (const key of ["", "DEMO_KEY"]) {
    const client = server.createUsdaClient({ apiKey: () => key, fetcher: async () => { assert.fail("no request"); } });
    assert.equal((await client.food(171615)).status, "unconfigured");
  }
  let calls = 0;
  const client = server.createUsdaClient({ apiKey: () => "test", fetcher: async () => { calls++; throw new DOMException("Timeout", "TimeoutError"); } });
  assert.equal((await client.food(171615)).status, "unavailable");
  assert.equal((await client.food(171615)).data, null); assert.equal(calls, 1);
  const bad = server.createUsdaClient({ apiKey: () => "test", fetcher: async () => response({ error: "not forwarded" }, 500) });
  assert.equal((await bad.food(171615)).data, null);
});
test("USDA rate limit blocks repeated requests across IDs until cooldown", async () => {
  let calls = 0, now = 0;
  const client = server.createUsdaClient({ apiKey: () => "test", now: () => now, fetcher: async () => {
    calls++; return calls === 1 ? response({}, 429, { "Retry-After": "120" }) : response(base);
  } });
  assert.equal((await client.food(171615)).status, "rate-limited");
  assert.equal((await client.food(167587)).status, "rate-limited"); assert.equal(calls, 1);
  now = 120001; assert.equal((await client.food(171615)).status, "ok"); assert.equal(calls, 2);
});

function candidate(extra = {}) {
  return { ...curated.CURATED_MINERALS[0], match: null, approved: { potassium: true, phosphorus: false }, usdaMatches: {
    potassium: { fdcId: 328637, description: "Cheese, cheddar", basis: "as-sold", completeProduct: true, explanation: "US cheese differs from the UK product; reviewed generic comparison only." },
  }, ...extra };
}
const cheese = () => data.parseUsdaFood({ ...base, fdcId: 328637, description: "Cheese, cheddar", dataType: "Foundation" });
const missing = { potassium: null, phosphorus: null };
const resolve = (mapping, food = cheese(), reported = missing, cofid = null) => curated.resolveCuratedMinerals(mapping.barcode, reported, async () => cofid, { mappings: [mapping], loadUsda: async () => food });
test("approved USDA fallback identifies FDC source, keeps separate approvals and scales", async () => {
  const result = await resolve(candidate());
  assert.equal(result.potassium.provenance, "estimated"); assert.equal(result.phosphorus.provenance, "unavailable");
  assert.equal(curated.scaleMineral(result.potassium, 30, "as-sold"), 54.9);
  const explanation = curated.mineralSourceExplanation(result, { amount: 30, label: "30g serving" });
  assert.match(explanation, /FDC ID 328637/); assert.match(explanation, /Foundation/); assert.match(explanation, /US cheese differs/);
  assert.match(explanation, /30\/100/); assert.match(explanation, /not a manufacturer measurement/);
});
test("USDA never replaces reliable OFF or suitable CoFID values", async () => {
  const result = await resolve(candidate(), cheese(), { potassium: 240, phosphorus: 0 });
  assert.equal(result.potassium.provenance, "reported"); assert.equal(result.potassium.valueMg, 240);
  const mapping = candidate({ match: curated.CURATED_MINERALS[0].match });
  const uk = await resolve(mapping, cheese(), missing, { food_code: "12-346", food_name: "Cheese, Cheddar, English", potassium_mg: 75, phosphorus_mg: 505 });
  assert.equal(uk.potassium.valueMg, 75); assert.equal(uk.potassium.estimate, undefined);
});
test("USDA missing, partial, wrong identity, wrong units and incompatible preparations are withheld", async () => {
  for (const food of [null, { ...cheese(), fdcId: 99 }, { ...cheese(), description: "different" }, { ...cheese(), unit: "ml" }, { ...cheese(), preparation: "dry" }, { ...cheese(), completeProductUnclear: true }, { ...cheese(), potassiumMg: null }]) {
    assert.equal((await resolve(candidate(), food)).potassium.provenance, "unavailable");
  }
});
test("USDA questionable zeros and unapproved matches preserve safeguards", async () => {
  const mapping = candidate(), food = { ...cheese(), potassiumMg: 0 };
  assert.equal((await resolve(mapping, food)).potassium.valueMg, 0);
  mapping.usdaMatches.potassium.questionableZero = true;
  assert.equal((await resolve(mapping, food)).potassium.valueMg, null);
  const disabled = candidate({ approved: { potassium: false, phosphorus: false } });
  assert.equal((await resolve(disabled)).potassium.valueMg, null);
  assert.ok(curated.CURATED_MINERALS.every(m => !m.preparationTips?.approved));
});
test("reference route accepts only fixed reviewed IDs and returns sanitized data", async () => {
  let reads = 0;
  const route = load("../api/food-check/usda/route.ts", {
    "@/app/FoodCheck/curatedMinerals": curated,
    "@/app/FoodCheck/categoryMinerals": { CATEGORY_USDA_IDS: [171546] },
    "@/app/FoodCheck/usda.server": { usdaClient: { food: async () => { reads++; return { status: "ok", data: cheese() }; } } },
  });
  assert.equal((await route.GET(new Request("http://localhost/api/food-check/usda?fdcId=bogus"))).status, 400);
  assert.equal((await route.GET(new Request("http://localhost/api/food-check/usda?fdcId=999999999"))).status, 404);
  assert.equal(reads, 0);
  const result = await route.GET(new Request("http://localhost/api/food-check/usda?fdcId=328637"));
  assert.equal(result.status, 200); assert.equal((await result.json()).food.fdcId, 328637); assert.equal(reads, 1);
});
test("client page imports only USDA types and uses the local API without credentials", () => {
  const page = fs.readFileSync(new URL("./page.tsx", import.meta.url), "utf8");
  assert.match(page, /import type \{ UsdaFood \} from "\.\/usdaData"/);
  assert.doesNotMatch(page, /USDA_FDC_API_KEY|usda\.server|api\.nal\.usda\.gov/);
  assert.match(page, /\/api\/food-check\/usda\?fdcId=/);
});
