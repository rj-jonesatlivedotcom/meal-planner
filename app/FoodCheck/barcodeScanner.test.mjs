import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import { createRequire } from "node:module";
import ts from "typescript";

const load = createRequire(import.meta.url);
const library = load("@zxing/library");
const source = fs.readFileSync(new URL("./barcodeScanner.ts", import.meta.url), "utf8");
const page = fs.readFileSync(new URL("./page.tsx", import.meta.url), "utf8");
const compile = (text) => ts.transpileModule(text, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017 },
}).outputText;
const flush = async () => { await new Promise(setImmediate); };
const mineralModule = { exports: {} };
vm.runInNewContext(compile(fs.readFileSync(new URL("./curatedMinerals.ts", import.meta.url), "utf8")), { exports: mineralModule.exports });
const mineralHelpers = mineralModule.exports;
const portionModule = { exports: {} };
vm.runInNewContext(compile(fs.readFileSync(new URL("./barcodePortions.ts", import.meta.url), "utf8")), { exports: portionModule.exports, require: () => mineralHelpers });
const portionHelpers = portionModule.exports;
const error = (name) => Object.assign(new Error(name), { name });

function harness(options = {}) {
  const timers = new Map();
  const events = new Map();
  const calls = { camera: [], detected: [], errors: [], stopped: 0, imports: [], decoded: 0 };
  let nextTimer = 0;
  const stream = { getTracks: () => [{ stop() { calls.stopped++; } }] };
  const video = {
    readyState: 4, videoWidth: 640, videoHeight: 480, srcObject: null,
    pause() {}, play: options.play ?? (() => Promise.resolve()),
    addEventListener: (name, fn) => events.set(name, fn),
    removeEventListener: (name) => events.delete(name),
  };
  class Fallback {
    decodeFromCanvas() {
      calls.decoded++;
      if (options.fallbackError) throw options.fallbackError;
      return { getText: () => options.value ?? "0012345678905" };
    }
  }
  class Native {
    static getSupportedFormats = async () => options.formats ?? ["ean_13", "ean_8", "upc_a", "upc_e", "code_128"];
    constructor() { if (options.constructorError) throw new Error("unsupported"); }
    detect = options.detect ?? (async () => [{ rawValue: options.value ?? "0012345678905" }]);
  }
  const canvas = options.canvas ?? { getContext: () => ({ drawImage() {} }) };
  const context = {
    exports: {}, Error, console,
    window: {
      isSecureContext: options.secure ?? true,
      BarcodeDetector: options.native === false ? undefined : Native,
      setTimeout(fn, ms) { const id = ++nextTimer; timers.set(id, { fn, ms }); return id; },
      clearTimeout(id) { timers.delete(id); },
    },
    navigator: { mediaDevices: options.noCameraAPI ? undefined : {
      async getUserMedia(constraints) {
        calls.camera.push(constraints);
        return options.camera ? options.camera(calls.camera.length, stream) : stream;
      },
    } },
    document: { createElement: () => canvas },
    require(name) {
      calls.imports.push(name);
      if (options.importError) throw new Error("chunk failed");
      return name === "@zxing/browser" ? options.realDecoder ? load(name) : { BrowserMultiFormatReader: Fallback } : library;
    },
  };
  vm.runInNewContext(compile(source), context);
  const scanner = context.exports.createBarcodeScanner(video, (value) => {
    assert.ok(calls.stopped > 0, "camera must stop before lookup callback");
    assert.equal(video.srcObject, null);
    calls.detected.push(value);
  }, (message) => calls.errors.push(message));
  return { scanner, calls, timers, video, events, async tick(ms) {
    const entry = [...timers].find(([, timer]) => timer.ms === ms);
    assert.ok(entry, "expected timer " + ms);
    timers.delete(entry[0]); entry[1].fn(); await flush();
  } };
}

test("native scanner stays first, preserves zeros and stops before lookup", async () => {
  const h = harness(); await h.scanner.start(); await flush();
  assert.deepEqual(h.calls.detected, ["0012345678905"]);
  assert.equal(h.calls.imports.length, 0);
  assert.equal(h.calls.camera[0].video.facingMode.ideal, "environment");
  assert.equal(h.calls.camera[0].audio, false);
  assert.equal(h.video.muted, true); assert.equal(h.video.playsInline, true);
  assert.equal(h.timers.size, 0);
});

for (const options of [{ native: false }, { constructorError: true }, { formats: ["ean_13"] }]) {
  test("fallback handles unavailable/unusable native API " + JSON.stringify(options), async () => {
    const h = harness(options); await h.scanner.start(); await flush();
    assert.deepEqual(h.calls.detected, ["0012345678905"]);
    assert.equal(h.calls.decoded, 1); assert.equal(h.calls.camera.length, 1);
  });
}

test("native detection failure switches decoder on the same camera stream", async () => {
  const h = harness({ detect: async () => { throw new Error("native failed"); } });
  await h.scanner.start(); await flush(); await h.tick(200);
  assert.equal(h.calls.decoded, 1); assert.equal(h.calls.camera.length, 1);
  assert.deepEqual(h.calls.detected, ["0012345678905"]);
});

test("repeated startup does not acquire concurrent streams", async () => {
  const h = harness(); await Promise.all([h.scanner.start(), h.scanner.start()]);
  await flush(); assert.equal(h.calls.camera.length, 1); assert.equal(h.calls.detected.length, 1);
});

test("late camera permission response is released after cancellation", async () => {
  let deliver;
  const h = harness({ camera: (_, stream) => new Promise((resolve) => { deliver = () => resolve(stream); }) });
  const pending = h.scanner.start(); await flush(); h.scanner.stop(); deliver(); await pending;
  assert.equal(h.calls.stopped, 1); assert.equal(h.calls.detected.length, 0); assert.equal(h.timers.size, 0);
});

test("late native result after closing cannot trigger lookup or restart polling", async () => {
  let deliver;
  const h = harness({ detect: () => new Promise((resolve) => { deliver = () => resolve([{ rawValue: "0012345678905" }]); }) });
  await h.scanner.start(); h.scanner.stop(); deliver(); await flush();
  assert.equal(h.calls.detected.length, 0); assert.equal(h.timers.size, 0);
});

test("preview rejection releases camera with a useful error", async () => {
  const h = harness({ play: () => Promise.reject(error("NotAllowedError")) });
  await h.scanner.start(); assert.equal(h.calls.stopped, 1);
  assert.match(h.calls.errors[0], /preview/); assert.equal(h.timers.size, 0);
});

test("cancelling a pending preview clears readiness listeners and timer", async () => {
  const h = harness({ play: () => new Promise(() => {}) });
  const pending = h.scanner.start(); await flush(); h.scanner.stop(); await pending;
  assert.equal(h.calls.stopped, 1); assert.equal(h.events.size, 0); assert.equal(h.timers.size, 0);
});

test("stalled preview times out and releases the camera", async () => {
  const h = harness({ play: () => new Promise(() => {}) });
  const pending = h.scanner.start(); await flush(); await h.tick(10000); await pending;
  assert.match(h.calls.errors[0], /preview/); assert.equal(h.calls.stopped, 1);
  assert.equal(h.events.size, 0); assert.equal(h.timers.size, 0);
});

test("loaded data cannot bypass a rejected playback promise", async () => {
  let rejectPlayback;
  const h = harness({ play: () => new Promise((_, reject) => { rejectPlayback = reject; }) });
  const pending = h.scanner.start(); await flush(); h.events.get("loadeddata")();
  assert.equal(h.calls.detected.length, 0); rejectPlayback(new Error("play blocked")); await pending;
  assert.match(h.calls.errors[0], /preview/); assert.equal(h.calls.stopped, 1);
});

test("preview readiness follows loaded data rather than a fixed delay", async () => {
  const h = harness(); h.video.readyState = 0;
  const pending = h.scanner.start(); await flush(); assert.equal(h.calls.detected.length, 0);
  h.video.readyState = 2; h.events.get("loadeddata")(); await pending; await flush();
  assert.equal(h.calls.detected.length, 1);
});

test("camera constraint failure retries without restrictive selection", async () => {
  const h = harness({ camera: async (attempt, stream) => {
    if (attempt === 1) throw error("OverconstrainedError"); return stream;
  } });
  await h.scanner.start(); await flush(); assert.equal(h.calls.camera.length, 2);
  assert.equal(h.calls.camera[1].video, true); assert.equal(h.calls.detected.length, 1);
});

for (const name of ["NotAllowedError", "NotFoundError", "NotReadableError"]) {
  test("camera failure handled: " + name, async () => {
    const h = harness({ camera: async () => { throw error(name); } });
    await h.scanner.start(); assert.equal(h.calls.errors.length, 1);
    assert.equal(h.calls.camera.length, name === "NotFoundError" ? 2 : 1);
    assert.equal(h.calls.detected.length, 0); assert.equal(h.timers.size, 0);
  });
}

for (const options of [{ secure: false }, { noCameraAPI: true }]) {
  test("unsupported camera environment gets manual-entry guidance " + JSON.stringify(options), async () => {
    const h = harness(options); await h.scanner.start();
    assert.equal(h.calls.camera.length, 0); assert.match(h.calls.errors[0], /manually/);
  });
}

test("fallback import failure closes camera", async () => {
  const h = harness({ native: false, importError: true }); await h.scanner.start();
  assert.equal(h.calls.stopped, 1); assert.match(h.calls.errors[0], /decoder/);
});

test("ordinary no-barcode frames retry; timeout stops all activity", async () => {
  const h = harness({ native: false, fallbackError: new library.NotFoundException() });
  await h.scanner.start(); await flush(); await h.tick(200);
  assert.equal(h.calls.errors.length, 0); await h.tick(45000);
  assert.match(h.calls.errors[0], /No readable barcode/); assert.equal(h.calls.stopped, 1);
  assert.equal(h.timers.size, 0);
});

test("unexpected fallback failure is reported and camera released", async () => {
  const h = harness({ native: false, fallbackError: new Error("canvas failed") });
  await h.scanner.start(); await flush(); assert.match(h.calls.errors[0], /decoding failed/);
  assert.equal(h.calls.stopped, 1);
});

// A real pixel fixture exercises the installed browser decoder, not a mocked result.
function retailCanvas(code) {
  const left = ["0001101", "0011001", "0010011", "0111101", "0100011", "0110001", "0101111", "0111011", "0110111", "0001011"];
  const even = ["0100111", "0110011", "0011011", "0100001", "0011101", "0111001", "0000101", "0010001", "0001001", "0010111"];
  const parity = code.length === 8 ? "LLLL" : ["LLLLLL", "LLGLGG", "LLGGLG", "LLGGGL", "LGLLGG", "LGGLLG", "LGGGLL", "LGLGLG", "LGLGGL", "LGGLGL"][Number(code[0])];
  const middle = code.length === 8 ? 4 : 7;
  const first = code.length === 8 ? 0 : 1;
  const bits = "0".repeat(12) + "101" + [...code.slice(first, middle)].map((c, i) => (parity[i] === "L" ? left : even)[Number(c)]).join("") + "01010" + [...code.slice(middle)].map(c => [...left[Number(c)]].map(b => b === "0" ? "1" : "0").join("")).join("") + "101" + "0".repeat(12);
  const width = bits.length * 3, height = 120, pixels = new Uint8ClampedArray(width * height * 4);
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
    const v = bits[Math.floor(x / 3)] === "1" ? 0 : 255, i = (y * width + x) * 4;
    pixels.set([v, v, v, 255], i);
  }
  return { width, height, getContext: () => ({ drawImage() {}, getImageData: () => ({ data: pixels }) }) };
}

for (const code of ["0012345678905", "5000159484695", "12345670"]) {
  test("real ZXing browser fallback decodes retail pixels: " + code, async () => {
    const canvas = retailCanvas(code);
    const h = harness({ native: false, realDecoder: true, canvas });
    h.video.videoWidth = canvas.width; h.video.videoHeight = canvas.height;
    await h.scanner.start(); await flush();
    assert.deepEqual(h.calls.detected, [code]);
    assert.equal(h.calls.stopped, 1);
  });
}

function pageFunction(name) {
  const file = ts.createSourceFile("page.tsx", page, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  let result;
  const visit = (node) => { if (ts.isFunctionDeclaration(node) && node.name?.text === name) result = node.getText(file); ts.forEachChild(node, visit); };
  visit(file); assert.ok(result, name); return result;
}

function lookupHarness(fetch, reviewMappings, cofidRow, repository = null) {
  const state = { errors: [], selected: [], stops: 0, loading: [], cofidReads: [] };
  const context = { myFoods: { repository }, notifyFoodAccount() {}, setMyFoodsError() {}, ...mineralHelpers, ...portionHelpers, Error, console: { error() {} }, fetch, requestResultsScroll() {}, setSearching() {}, searchRequestRef: { current: 0 }, searchDebounceRef: { current: null }, barcodeLookupBusyRef: { current: false },
    resolveCuratedMinerals: (code, reported, loader, options) => mineralHelpers.resolveCuratedMinerals(code, reported, loader, { ...options, mappings: reviewMappings }),
    supabase: { from: table => ({ select: columns => ({ eq: (column, code) => ({ maybeSingle: async () => {
      state.cofidReads.push({ table, columns, column, code }); return { data: cofidRow, error: null };
    } }) }) }) },
    stopScanner: () => state.stops++, setError: (v) => state.errors.push(v), setBarcode: (v) => { state.barcode = v; },
    setBarcodeLoading: (v) => state.loading.push(v), setSelectedFood() {}, setResults() {}, selectFood: (f) => state.selected.push(f),
  };
  vm.runInNewContext(compile(pageFunction("lookupBarcode")), context);
  return { state, lookup: context.lookupBarcode };
}

test("lookup preserves leading zeros, missing minerals and existing product selection", async () => {
  let url;
  const h = lookupHarness(async u => { url = u; return { ok: true, json: async () => ({ status: 1, product: { product_name: "Test", nutriments: {} } }) }; });
  await h.lookup("0012345678905"); assert.match(url, /0012345678905\.json$/);
  assert.equal(h.state.selected[0].potassium, null); assert.equal(h.state.selected[0].phosphorus, null);
  assert.equal(h.state.selected[0].code, "0012345678905"); assert.equal(h.state.stops, 1);
  assert.match(page, /nutritionFood\.potassium === null\s*\? "Not available"/);
  assert.match(page, /nutritionFood\.phosphorus === null\s*\? "Not available"/);
});

test("genuine mineral zeros remain zero; reported values retain unit conversion", async () => {
  const h = lookupHarness(async () => ({ ok: true, json: async () => ({ status: 1, product: { nutriments: { potassium_100g: 0, phosphorus_100g: 0.12 } } }) }));
  await h.lookup("0012345678905"); assert.equal(h.state.selected[0].potassium, 0); assert.equal(h.state.selected[0].phosphorus, 120);
});

test("duplicate lookup attempts share a synchronous busy guard", async () => {
  let complete, requests = 0;
  const h = lookupHarness(() => { requests++; return new Promise(resolve => { complete = () => resolve({ ok: true, json: async () => ({ status: 0 }) }); }); });
  const first = h.lookup("0012345678905"); await h.lookup("0012345678905"); assert.equal(requests, 1);
  complete(); await first; assert.match(h.state.errors.at(-1), /couldn't find/);
});

test("failed product request has actionable error and releases lookup lock", async () => {
  const h = lookupHarness(async () => { throw new Error("offline"); });
  await h.lookup("0012345678905"); assert.match(h.state.errors.at(-1), /couldn't check/);
  assert.equal(h.state.loading.at(-1), false);
});

test("unknown product HTTP 404 shows the existing not-found guidance", async () => {
  const h = lookupHarness(async () => ({ ok: false, status: 404 }));
  await h.lookup("0012345678905");
  assert.match(h.state.errors.at(-1), /couldn't find/);
  assert.equal(h.state.loading.at(-1), false);
});

test("Open camera synchronous guard prevents concurrent React startup requests", () => {
  let opens = 0;
  const context = { scannerRequestedRef: { current: false }, barcodeLookupBusyRef: { current: false }, setScannerError() {}, setError() {}, setScannerOpen: () => opens++ };
  vm.runInNewContext(compile(pageFunction("startScanner")), context);
  context.startScanner(); context.startScanner(); assert.equal(opens, 1);
});

test("selection requests a post-render nutrition scroll for every selection", () => {
  const requests = []; let selected;
  const context = { setSnackDialogOpen() {}, setWholePackView() {}, setReferenceView() {}, setSelectedFood: f => { selected = f; }, requestResultsScroll: target => requests.push(target) };
  vm.runInNewContext(compile(pageFunction("selectFood")), context);
  context.selectFood({ code: "0012345678905" }); context.selectFood(selected);
  assert.equal(selected.code, "0012345678905");
  assert.deepEqual(requests, ["nutrition", "nutrition"]);
});

const nutrientKeys = ['energyKj', 'energyKcal', 'protein', 'carbohydrate', 'sugars', 'fat', 'saturates', 'fibre', 'salt', 'sodium', 'potassium', 'phosphorus', 'calcium', 'magnesium', 'iron', 'zinc'];
const sourceKeys = ['energy-kj', 'energy-kcal', 'proteins', 'carbohydrates', 'sugars', 'fat', 'saturated-fat', 'fiber', 'salt', 'sodium', 'potassium', 'phosphorus', 'calcium', 'magnesium', 'iron', 'zinc'];
const cofidKeys = ['energy_kj', 'energy_kcal', 'protein_g', 'carbohydrate_g', 'sugars_g', 'fat_g', 'saturates_g', 'fibre_g', 'salt_g', 'sodium_mg', 'potassium_mg', 'phosphorus_mg', 'calcium_mg', 'magnesium_mg', 'iron_mg', 'zinc_mg'];
const nutritionContext = {};
vm.runInNewContext(compile(['optionalNumberValue', 'textValue', 'mapFood', 'formatNumber', 'displayNutrient'].map(pageFunction).join('\n')), nutritionContext);

for (const value of [undefined, null, '', '  ', 'unknown', '1mg', false, true, [], {}, NaN, Infinity]) {
  test('all nutrients reject missing or invalid input: ' + String(value), async () => {
    const h = lookupHarness(async () => ({ ok: true, json: async () => ({ status: 1, product: { nutriments: Object.fromEntries(sourceKeys.map(k => [k + '_100g', value])) } }) }));
    await h.lookup('0012345678905');
    const cofid = nutritionContext.mapFood(Object.fromEntries(cofidKeys.map(k => [k, value])));
    for (const key of nutrientKeys) {
      assert.equal(h.state.selected[0][key], null, 'OFF ' + key);
      assert.equal(cofid[key], null, 'CoFID ' + key);
      assert.equal(nutritionContext.displayNutrient(cofid[key], 'mg'), 'Not available');
    }
  });
}
for (const value of [0, '0', 1.25, '1.25']) {
  test('all nutrients preserve valid values and source units: ' + JSON.stringify(value), async () => {
    const h = lookupHarness(async () => ({ ok: true, json: async () => ({ status: 1, product: { nutriments: Object.fromEntries(sourceKeys.map(k => [k + '_100g', value])) } }) }));
    await h.lookup('0012345678905');
    const cofid = nutritionContext.mapFood(Object.fromEntries(cofidKeys.map(k => [k, value])));
    nutrientKeys.forEach((key, i) => {
      assert.equal(cofid[key], Number(value));
      assert.equal(h.state.selected[0][key], Number(value) * (i >= 9 ? 1000 : 1));
    });
    assert.equal(nutritionContext.displayNutrient(Number(value), 'g'), (Number(value) === 0 ? '0' : '1.3') + ' g');
    assert.equal(nutritionContext.displayNutrient(Number(value), 'mg'), (Number(value) === 0 ? '0' : '1.3') + ' mg');
  });
}

function renderSource(selectedFood) {
  const section = page.slice(page.indexOf('{/* SOURCE */}'), page.indexOf('{/* SOURCE */}') + 4000);
  const content = section.slice(section.indexOf('<h3'), section.indexOf('\n                        </div>', section.indexOf('<h3')));
  const context = { ...mineralHelpers, React: load('react'), selectedFood, nutritionFood: selectedFood, activePortion: selectedFood.portion };
  const js = ts.transpileModule('result = <div>' + content + '</div>;', { compilerOptions: { jsx: ts.JsxEmit.React, target: ts.ScriptTarget.ES2017 } }).outputText;
  vm.runInNewContext(js, context);
  return load('react-dom/server').renderToStaticMarkup(context.result);
}
test('name-search mapping retains CoFID attribution and edible-portion source link', () => {
  const html = renderSource(nutritionContext.mapFood({ food_code: 'test' }));
  assert.match(html, /Nutritional information source/);
  assert.match(html, /McCance and Widdowson&#x27;s Composition of Foods Integrated Dataset \(CoFID\), 2021\./);
  assert.match(html, /per 100g of edible portion/);
  assert.match(html, /https:\/\/www.gov.uk\/government\/publications\/composition-of-foods-integrated-dataset-cofid/);
  assert.doesNotMatch(html, /Open Food Facts/);
});
test('barcode source renders OFF warning and exact leading-zero product link', async () => {
  const h = lookupHarness(async () => ({ ok: true, json: async () => ({ status: 1, product: { nutriments: {} } }) }));
  await h.lookup('0012345678905');
  const html = renderSource(h.state.selected[0]);
  assert.match(html, /Nutritional information source/);
  assert.match(html, /Open Food Facts product database/);
  assert.match(html, /Product information may be incomplete or contributed by users. &#x27;Not available&#x27; does not mean zero\./);
  assert.match(html, /href="https:\/\/world.openfoodfacts.org\/product\/0012345678905"/);
  assert.match(html, /View product on Open Food Facts/);
  assert.doesNotMatch(html, /CoFID|edible portion/);
});
test('manual entry and camera both use the tested barcode lookup', () => {
  assert.match(page, /void lookupBarcode\(barcode\)/);
  assert.match(page, /lookupBarcodeRef.current = lookupBarcode/);
  assert.match(page, /void lookupBarcodeRef.current\(value\)/);
  assert.match(page, /value=\{displayNutrient\(nutritionFood.sodium, "mg"\)\}/);
});

const { CURATED_MINERALS, resolveCuratedMinerals, scaleMineral, formatMineral, mineralSourceExplanation } = mineralHelpers;
const missingMinerals = { potassium: null, phosphorus: null };
const cofidFixture = { food_code: '12-346', food_name: 'Cheese, Cheddar, English', potassium_mg: 75, phosphorus_mg: 505 };
function reviewMapping(approved = { potassium: true, phosphorus: true }, extra = {}) {
  return { ...CURATED_MINERALS[0], approved, ...extra };
}
const resolveReview = (reported = missingMinerals, mapping = reviewMapping(), row = cofidFixture, basis = 'as-sold') =>
  resolveCuratedMinerals(mapping.barcode, reported, async () => row, { mappings: [mapping], basis });

test('disabled review candidates never fetch CoFID or emit estimate attribution', async () => {
  for (const mapping of CURATED_MINERALS.filter(m => !m.approved.potassium && !m.approved.phosphorus)) {
    assert.equal(mapping.approved.potassium, false); assert.equal(mapping.approved.phosphorus, false);
    const result = await resolveCuratedMinerals(mapping.barcode, missingMinerals, () => { throw new Error('must not fetch'); });
    for (const nutrient of ['potassium', 'phosphorus']) assert.equal(formatMineral(result[nutrient], String), 'Not available');
    assert.equal(mineralSourceExplanation(result), '');
    assert.doesNotMatch(renderSource({ source: 'Open Food Facts', code: mapping.barcode, minerals: result }), /Estimated using/);
  }
});
test('reliable reported minerals including unflagged zeros take precedence over approved estimates', async () => {
  for (const value of [0, 240]) {
    let loads = 0;
    const result = await resolveCuratedMinerals(cofidFixture.food_code, { potassium: value, phosphorus: value }, async () => { loads++; return cofidFixture; });
    assert.equal(loads, 0);
    for (const nutrient of ['potassium', 'phosphorus']) {
      assert.equal(result[nutrient].sourceValueMg, value);
      assert.equal(result[nutrient].provenance, 'reported');
      assert.equal(formatMineral(result[nutrient], String), value + ' mg');
    }
    const reviewed = await resolveReview({ potassium: value, phosphorus: value });
    assert.equal(reviewed.potassium.provenance, 'reported'); assert.equal(reviewed.phosphorus.valueMg, value);
  }
});
test('questionable-zero flags apply independently and preserve original zeros', async () => {
  const mapping = reviewMapping({ potassium: false, phosphorus: false }, { questionableZero: { potassium: true, phosphorus: false } });
  const reported = { potassium: 0, phosphorus: 0 };
  const result = await resolveReview(reported, mapping);
  assert.equal(formatMineral(result.potassium, String), 'Not available');
  assert.equal(result.potassium.sourceValueMg, 0);
  assert.equal(formatMineral(result.phosphorus, String), '0 mg');
  assert.equal(reported.potassium, 0);
  const approved = await resolveReview(reported, { ...mapping, approved: { potassium: true, phosphorus: false } });
  assert.equal(formatMineral(approved.potassium, String), 'Estimated 75 mg');
  assert.equal(approved.potassium.sourceValueMg, 0);
  assert.equal(formatMineral(approved.phosphorus, String), '0 mg');
  const positive = await resolveReview({ potassium: 240, phosphorus: null }, mapping);
  assert.equal(positive.potassium.provenance, 'reported');
});
for (const nutrient of ['potassium', 'phosphorus']) {
  test(nutrient + ' can be approved without enabling the other nutrient', async () => {
    const result = await resolveReview(missingMinerals, reviewMapping({ potassium: nutrient === 'potassium', phosphorus: nutrient === 'phosphorus' }));
    const other = nutrient === 'potassium' ? 'phosphorus' : 'potassium';
    assert.equal(result[nutrient].provenance, 'estimated'); assert.equal(result[other].provenance, 'unavailable');
    const html = renderSource({ source: 'Open Food Facts', code: CURATED_MINERALS[0].barcode, minerals: result });
    assert.match(html, /Open Food Facts product database/);
    assert.match(html, /Estimated using CoFID 2021 data for Cheese, Cheddar, English, food code 12-346/);
    assert.match(html, /not a measurement of the scanned product. Actual values may differ/);
    assert.doesNotMatch(html, /Potassium and phosphorus: Estimated/);
  });
}
test('both estimates share one explanation with the exact match, preserving OFF product link', async () => {
  const result = await resolveReview();
  assert.equal(formatMineral(result.phosphorus, String), 'Estimated 505 mg');
  const html = renderSource({ source: 'Open Food Facts', code: '5000295141599', minerals: result });
  assert.match(html, /Potassium and phosphorus: Estimated using CoFID 2021/);
  assert.equal((html.match(/This is a comparable food/g) || []).length, 1);
  assert.match(html, /https:\/\/world.openfoodfacts.org\/product\/5000295141599/);
});
test('beans load the exact CoFID record with sauce and display its existing values', async () => {
  const mapping = { ...CURATED_MINERALS[1], approved: { potassium: true, phosphorus: true } };
  let requested;
  const result = await resolveCuratedMinerals(mapping.barcode, missingMinerals, async code => {
    requested = code; return { food_code: '13-532', food_name: 'Baked beans, canned in tomato sauce', potassium_mg: 272, phosphorus_mg: 88 };
  }, { mappings: [mapping] });
  assert.equal(requested, '13-532'); assert.match(mapping.explanation, /not drained/);
  assert.equal(formatMineral(result.potassium, String), 'Estimated 272 mg');
  assert.equal(formatMineral(result.phosphorus, String), 'Estimated 88 mg');
});
test('unmatched barcodes cannot inherit another product mapping', async () => {
  let loads = 0;
  const result = await resolveCuratedMinerals('05000295141599', missingMinerals, async () => { loads++; return cofidFixture; }, { mappings: [reviewMapping()] });
  assert.equal(loads, 0); assert.equal(result.potassium.valueMg, null);
});
test('failed, missing, renamed or wrong-code CoFID records cannot yield estimates', async () => {
  for (const row of [null, { ...cofidFixture, food_code: 'other' }, { ...cofidFixture, food_name: 'Different food' }]) {
    const result = await resolveReview(missingMinerals, reviewMapping(), row);
    assert.equal(result.potassium.valueMg, null); assert.equal(result.phosphorus.valueMg, null);
  }
  const result = await resolveCuratedMinerals(CURATED_MINERALS[0].barcode, missingMinerals, async () => { throw new Error('offline'); }, { mappings: [reviewMapping()] });
  assert.equal(result.potassium.valueMg, null);
});
test('missing CoFID mineral stays unavailable independently; genuine zero is retained', async () => {
  const result = await resolveReview(missingMinerals, reviewMapping(), { ...cofidFixture, potassium_mg: null, phosphorus_mg: 0 });
  assert.equal(formatMineral(result.potassium, String), 'Not available');
  assert.equal(formatMineral(result.phosphorus, String), 'Estimated 0 mg');
});
test('portion estimates scale by mass on the same basis, never between preparation states', async () => {
  const result = await resolveReview(missingMinerals, reviewMapping(), { ...cofidFixture, potassium_mg: 200 });
  assert.equal(scaleMineral(result.potassium, 50, 'as-sold'), 100);
  assert.equal(scaleMineral(result.potassium, 200, 'as-sold'), 400);
  assert.equal(scaleMineral(result.potassium, 0, 'as-sold'), 0);
  for (const basis of ['dry', 'prepared', 'unknown']) assert.equal(scaleMineral(result.potassium, 50, basis), null);
  assert.equal(scaleMineral(result.potassium, NaN, 'as-sold'), null);
});
test('dry, prepared and unknown source bases cannot access a mismatched approved reference', async () => {
  for (const basis of ['dry', 'prepared', 'unknown']) {
    let loads = 0;
    const result = await resolveCuratedMinerals(CURATED_MINERALS[0].barcode, missingMinerals, async () => { loads++; return cofidFixture; }, { mappings: [reviewMapping()], basis });
    assert.equal(loads, 0); assert.equal(result.potassium.valueMg, null);
  }
});
test('Bramwells has a prepared basis and no approved or generic noodle substitute', async () => {
  const mapping = CURATED_MINERALS.find(m => m.barcode === '4061464935198');
  assert.equal(mapping.sourceBasis, 'prepared'); assert.equal(mapping.match, null);
  assert.match(mapping.explanation, /seasoning and retained water/);
  const result = await resolveCuratedMinerals(mapping.barcode, missingMinerals, () => { throw new Error('no substitute'); }, { mappings: [{ ...mapping, approved: { potassium: true, phosphorus: true } }] });
  assert.equal(result.potassium.valueMg, null); assert.equal(result.phosphorus.valueMg, null);
});
test('public lookups without a valid reference retain raw missing K/P', async () => {
  for (const mapping of CURATED_MINERALS) {
    const h = lookupHarness(async () => ({ ok: true, json: async () => ({ status: 1, product: { nutriments: { proteins_100g: 7 } } }) }));
    await h.lookup(mapping.barcode);
    assert.equal(h.state.selected[0].protein, 7);
    assert.equal(h.state.selected[0].potassium, null); assert.equal(h.state.selected[0].phosphorus, null);
    assert.equal(h.state.selected[0].minerals.potassium.provenance, 'unavailable');
  }
});

function renderMineralRows(selectedFood) {
  const file = ts.createSourceFile('page.tsx', page, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const rows = [];
  const visit = node => {
    if (ts.isJsxSelfClosingElement(node) && node.tagName.getText(file) === 'NutritionRow' &&
        node.attributes.properties.some(p => p.name?.getText(file) === 'label' && ['Potassium', 'Phosphorus'].includes(p.initializer?.text))) rows.push(node.getText(file));
    ts.forEachChild(node, visit);
  };
  visit(file); assert.equal(rows.length, 2);
  const context = { ...mineralHelpers, React: load('react'), selectedFood, nutritionFood: selectedFood, activePortion: selectedFood.portion };
  const js = ts.transpileModule(pageFunction('formatNumber') + '\n' + pageFunction('NutritionRow') + '\nresult = <div>' + rows.join('') + '</div>;', { compilerOptions: { jsx: ts.JsxEmit.React, target: ts.ScriptTarget.ES2017 } }).outputText;
  vm.runInNewContext(js, context);
  return load('react-dom/server').renderToStaticMarkup(context.result);
}
test('actual mineral rows render reported, estimated and unavailable values correctly', async () => {
  const reported = await resolveReview({ potassium: 240, phosphorus: 0 });
  let html = renderMineralRows({ minerals: reported });
  assert.match(html, /240 mg/); assert.match(html, /0 mg/); assert.doesNotMatch(html, /Estimated/);
  const estimates = await resolveReview();
  html = renderMineralRows({ minerals: estimates });
  assert.match(html, /75 mg/); assert.match(html, /505 mg/); assert.equal((html.match(/>ESTIMATE</g) || []).length, 2);
  html = renderMineralRows({ minerals: await resolveReview(missingMinerals, reviewMapping({ potassium: false, phosphorus: false })) });
  assert.equal((html.match(/Not available/g) || []).length, 2);
  // Food-name/CoFID results retain their existing rendering path.
  html = renderMineralRows({ potassium: 157, phosphorus: 96 });
  assert.match(html, /157 mg/); assert.match(html, /96 mg/); assert.doesNotMatch(html, /Estimated/);
});
test('approved test-only barcode mapping reads CoFID, retains OFF values and adds estimate attribution', async () => {
  const h = lookupHarness(async () => ({ ok: true, json: async () => ({ status: 1, product: { nutriments: { proteins_100g: 25.4, salt_100g: 1.8 } } }) }), [reviewMapping()], cofidFixture);
  await h.lookup('5000295141599');
  const food = h.state.selected[0];
  assert.equal(h.state.cofidReads.length, 1);
  assert.deepEqual(h.state.cofidReads[0], { table: 'cofid_foods', columns: 'food_code,food_name,potassium_mg,phosphorus_mg', column: 'food_code', code: '12-346' });
  assert.equal(food.source, 'Open Food Facts'); assert.equal(food.protein, 25.4); assert.equal(food.salt, 1.8);
  assert.equal(food.potassium, null); assert.equal(food.minerals.potassium.sourceValueMg, null);
  assert.match(renderMineralRows(food), /75 mg/); assert.match(renderMineralRows(food), />ESTIMATE</);
  assert.match(renderSource(food), /food code 12-346/);
});
test('barcode prepared-data marker blocks an approved as-sold reference', async () => {
  const h = lookupHarness(async () => ({ ok: true, json: async () => ({ status: 1, product: { nutriments: {}, nutrition_data_prepared: 'on' } }) }), [reviewMapping()], cofidFixture);
  await h.lookup('5000295141599');
  assert.equal(h.state.cofidReads.length, 0);
  assert.equal(h.state.selected[0].minerals.potassium.valueMg, null);
});

const { validEstimate, scaleMineralRange, foodPreparationTips, foodBasisDescription } = mineralHelpers;
// Synthetic fixtures exercise the mechanism; these are not proposed product values.
const evidence = [{ label: 'Synthetic CoFID test reference', url: 'https://example.org/test-fixture', foodCode: 'TEST-ONLY', description: 'Synthetic complete product' }];
const rangeFixture = { kind: 'range', lowerMg: 180, upperMg: 300, method: 'component-calculation', basis: 'as-sold', completeProduct: true, explanation: 'Synthetic fixture: endpoints represent documented component bounds, not a percentage margin.', references: evidence };
const singleFixture = { ...rangeFixture, kind: 'single', valueMg: 240, method: 'comparable-food' };
const mixedMapping = (extra = {}) => reviewMapping(undefined, { match: null, estimates: { potassium: singleFixture, phosphorus: rangeFixture }, ...extra });

test('independent single and range methods display in the actual mineral rows and source panel', async () => {
  const result = await resolveReview(missingMinerals, mixedMapping());
  assert.equal(formatMineral(result.potassium, String), 'Estimated 240 mg');
  assert.equal(formatMineral(result.phosphorus, String), 'Estimated 180–300 mg');
  const html = renderMineralRows({ minerals: result });
  assert.match(html, /240 mg/); assert.match(html, /Not available/); assert.equal((html.match(/>ESTIMATE</g) || []).length, 1);
  const source = renderSource({ source: 'Open Food Facts', code: '5000295141599', minerals: result });
  assert.match(source, /comparable food/); assert.match(source, /component calculation for the complete product/);
  assert.match(source, /Synthetic complete product, food code TEST-ONLY/);
  assert.match(source, /href="https:\/\/example.org\/test-fixture"/);
  assert.match(source, /documented component bounds/); assert.match(source, /Open Food Facts/);
});
for (const extra of [
  { lowerMg: -1 }, { upperMg: NaN }, { upperMg: Infinity }, { lowerMg: 300, upperMg: 180 },
  { lowerMg: 180, upperMg: 180 }, { references: [] }, { explanation: '' },
  { references: [{ label: 'Unsafe source', url: 'javascript:bad' }] }, { completeProduct: false },
]) {
  test('invalid or unsupported range is withheld: ' + JSON.stringify(extra), async () => {
    const estimate = { ...rangeFixture, ...extra };
    assert.equal(validEstimate(estimate, 'as-sold'), false);
    const result = await resolveReview(missingMinerals, mixedMapping({ estimates: { potassium: estimate } }));
    assert.equal(formatMineral(result.potassium, String), 'Not available');
    assert.equal(mineralSourceExplanation(result), '');
  });
}
test('range scaling adjusts both endpoints on the same basis without changing raw values', async () => {
  const result = await resolveReview(missingMinerals, mixedMapping());
  const portion = scaleMineralRange(result.phosphorus, 50, 'as-sold');
  assert.equal(portion.lower, 90); assert.equal(portion.upper, 150);
  assert.equal(scaleMineral(result.potassium, 50, 'as-sold'), 120);
  for (const basis of ['dry', 'prepared', 'unknown']) {
    assert.equal(scaleMineralRange(result.phosphorus, 85, basis), null);
    assert.equal(scaleMineral(result.potassium, 85, basis), null);
    const withheld = await resolveReview(missingMinerals, mixedMapping(), null, basis);
    assert.equal(withheld.phosphorus.provenance, 'unavailable');
  }
  assert.equal(result.phosphorus.rangeMg.lower, 180); assert.equal(result.phosphorus.sourceValueMg, null);
});
test('estimated rounding removes false precision and preserves reported display', async () => {
  const result = await resolveReview(missingMinerals, mixedMapping({ estimates: { potassium: { ...singleFixture, valueMg: 240.278 }, phosphorus: { ...rangeFixture, lowerMg: 180.9, upperMg: 299.1 } } }));
  assert.equal(formatMineral(result.potassium, String), 'Estimated 240 mg');
  assert.equal(formatMineral(result.phosphorus, String), 'Estimated 180–300 mg');
  assert.equal(formatMineral({ ...result.potassium, provenance: 'reported', valueMg: 240.278 }, String), '240.278 mg');
});
test('unapproved ranges and singles are hidden; nutrient approvals are independent', async () => {
  for (const nutrient of ['potassium', 'phosphorus']) {
    const result = await resolveReview(missingMinerals, mixedMapping({ approved: { potassium: nutrient === 'potassium', phosphorus: nutrient === 'phosphorus' } }));
    const other = nutrient === 'potassium' ? 'phosphorus' : 'potassium';
    assert.equal(result[nutrient].provenance, 'estimated'); assert.equal(result[other].provenance, 'unavailable');
  }
  const result = await resolveReview(missingMinerals, mixedMapping({ approved: { potassium: false, phosphorus: false } }));
  assert.equal(result.potassium.provenance, 'unavailable'); assert.equal(result.phosphorus.provenance, 'unavailable');
});
test('flagged zero can use a range; unflagged zero and positive values are retained', async () => {
  const mapping = mixedMapping({ questionableZero: { potassium: false, phosphorus: true } });
  const result = await resolveReview({ potassium: 0, phosphorus: 0 }, mapping);
  assert.equal(formatMineral(result.potassium, String), '0 mg');
  assert.equal(formatMineral(result.phosphorus, String), 'Estimated 180–300 mg');
  assert.equal(result.phosphorus.sourceValueMg, 0);
  const positive = await resolveReview({ potassium: 100, phosphorus: 100 }, mapping);
  assert.equal(positive.phosphorus.provenance, 'reported');
});

function renderPreparation(selectedFood, mappings) {
  const file = ts.createSourceFile('page.tsx', page, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  let expression;
  const visit = node => {
    if (ts.isJsxExpression(node) && node.expression?.getText(file).startsWith('selectedFood.source === "Open Food Facts" && foodPreparationTips')) expression = node.getText(file);
    ts.forEachChild(node, visit);
  };
  visit(file); assert.ok(expression);
  const context = { React: load('react'), selectedFood, foodPreparationTips: code => foodPreparationTips(code, mappings) };
  const js = ts.transpileModule('result = <div>' + expression + '</div>;', { compilerOptions: { jsx: ts.JsxEmit.React, target: ts.ScriptTarget.ES2017 } }).outputText;
  vm.runInNewContext(js, context);
  return load('react-dom/server').renderToStaticMarkup(context.result);
}
test('preparation tips require explicit approval and never modify the complete-product figures', async () => {
  const mapping = CURATED_MINERALS.find(m => m.barcode === '4061464935198');
  assert.equal(mapping.preparationTips.approved, false);
  const food = { code: mapping.barcode, source: 'Open Food Facts', minerals: await resolveReview(missingMinerals, mixedMapping()) };
  const before = renderMineralRows(food);
  assert.equal(foodPreparationTips(mapping.barcode).length, 0);
  assert.doesNotMatch(renderPreparation(food), /Food preparation tips/);
  const reviewed = [{ ...mapping, preparationTips: { ...mapping.preparationTips, approved: true } }];
  const html = renderPreparation(food, reviewed);
  assert.match(html, /Food preparation tips/); assert.match(html, /separate vegetable and seasoning sachet/);
  assert.match(html, /noodles still retain water/); assert.match(html, /Potassium iodate/);
  assert.match(html, /all supplied edible components/);
  assert.equal(renderMineralRows(food), before);
  assert.doesNotMatch(renderPreparation({ ...food, source: 'CoFID 2021' }, reviewed), /Food preparation tips/);
  assert.match(page, /html\[data-theme="dark"\] \.food-check-preparation-tips/);
});
test('prepared bowl basis states complete contents and manufacturer serving, never dry-pack scaling', () => {
  const basis = foodBasisDescription('4061464935198');
  assert.match(basis, /Per 100g prepared/); assert.match(basis, /all noodles, seasoning and retained water/);
  assert.match(basis, /435g/); assert.match(basis, /dry pack weighs 85g/);
  assert.equal(foodBasisDescription('unknown'), '');
});

test('tiny estimates do not round to zero and component basis cannot contradict the reviewed product', async () => {
  const tiny = await resolveReview(missingMinerals, mixedMapping({ estimates: { potassium: { ...singleFixture, valueMg: 0.03 } } }));
  assert.equal(formatMineral(tiny.potassium, n => n.toFixed(1)), 'Estimated 0.03 mg');
  const mismatch = await resolveReview(missingMinerals, mixedMapping({ sourceBasis: 'prepared' }));
  assert.equal(mismatch.potassium.valueMg, null); assert.equal(mismatch.phosphorus.provenance, 'unavailable');
});

const { barcodePortion, portionNutrition } = portionHelpers;
test('Ripple flags its phosphorus zero independently when a reference is unavailable', async () => {
  const mapping = CURATED_MINERALS.find(m => m.barcode === '5000159553834');
  assert.equal(mapping.match.code, '17-648'); assert.equal(mapping.approved.potassium, true); assert.equal(mapping.approved.phosphorus, true);
  const result = await resolveCuratedMinerals(mapping.barcode, { potassium: null, phosphorus: 0 }, () => { throw new Error('disabled'); });
  assert.equal(result.phosphorus.sourceValueMg, 0); assert.equal(result.phosphorus.valueMg, null);
});
test('reviewed Ripple comparison scales to one 30g bar with separate ESTIMATE badges', async () => {
  const mapping = { ...CURATED_MINERALS.find(m => m.barcode === '5000159553834'), approved: { potassium: true, phosphorus: true } };
  const h = lookupHarness(async () => ({ ok: true, json: async () => ({ status: 1, product: { quantity: '30', nutriments: { 'energy-kcal_100g': 526, fat_100g: 29, phosphorus_100g: 0 } } }) }), [mapping], { food_code: '17-648', food_name: 'Chocolate, milk', potassium_mg: 451, phosphorus_mg: 224 });
  await h.lookup(mapping.barcode);
  const food = h.state.selected[0], portion = food.portion;
  assert.equal(portion.amount, 30); assert.equal(portion.unit, 'g');
  const display = portionNutrition(food, portion);
  assert.equal(display.energyKcal, 157.8); assert.ok(Math.abs(display.fat - 8.7) < 1e-10);
  assert.ok(Math.abs(display.minerals.potassium.valueMg - 135.3) < 1e-10);
  assert.ok(Math.abs(display.minerals.phosphorus.valueMg - 67.2) < 1e-10);
  assert.equal(food.minerals.phosphorus.sourceValueMg, 0);
  const html = renderMineralRows(display);
  assert.match(html, /135 mg/); assert.match(html, /67 mg/); assert.equal((html.match(/>ESTIMATE</g) || []).length, 2);
  assert.doesNotMatch(html, /Estimated|451 mg|224 mg/);
  const source = renderSource(food);
  assert.match(source, /food code 17-648/); assert.match(source, /451 mg/); assert.match(source, /224 mg/);
  assert.match(source, /30\/100/); assert.match(source, /approximately 135 mg/); assert.match(source, /ingredient transcription is incomplete/);
  assert.equal(portionNutrition(food).energyKcal, 526);
});
for (const quantity of ['6x25g', '6 x 25 g', '150g(6x25g)']) {
  test('multipack defaults to one identifiable eating unit: ' + quantity, () => {
    const portion = barcodePortion('crisps', { quantity, nutrition_data_per: '100g' });
    assert.equal(portion.amount, 25); assert.match(portion.label, /One unit/); assert.match(portion.label, /multipack of 6/);
  });
}
test('single bags, volume packs and conflicting units are handled without density guesses', () => {
  assert.equal(barcodePortion('crisps', { quantity: '25g', nutrition_data_per: '100g' }).amount, 25);
  const volume = barcodePortion('drink', { quantity: '330ml', nutrition_data_per: '100ml' });
  assert.equal(volume.amount, 330); assert.equal(volume.unit, 'ml');
  assert.equal(barcodePortion('drink', { quantity: '330ml', nutrition_data_per: '100g' }).amount, null);
  assert.equal(barcodePortion('drink', { quantity: '330g', nutrition_data_per: '100ml' }).amount, null);
});
for (const product of [{}, { quantity: '6 bags' }, { quantity: '150g', product_name: 'Ready Salted Crisps 6pk' }, { quantity: '160g(6x25g)' }, { quantity: '0g' }]) {
  test('unverified or contradictory eating quantities fall back to reference: ' + JSON.stringify(product), () => {
    const portion = barcodePortion('unknown', product);
    assert.equal(portion.amount, null); assert.ok(portion.limitation.length > 0);
  });
}
test('Bramwells whole bowl uses the labelled prepared 435g, not dry 85g or inferred 450g', async () => {
  const h = lookupHarness(async () => ({ ok: true, json: async () => ({ status: 1, product: { quantity: '85 g', nutriments: { 'energy-kcal_100g': 91.2643678160919, proteins_100g: 1.72413793103448 } } }) }));
  await h.lookup('4061464935198');
  const food = h.state.selected[0], portion = food.portion;
  assert.equal(portion.amount, 435); assert.equal(portion.basis, 'prepared'); assert.match(portion.referenceLabel, /prepared/);
  const display = portionNutrition(food, portion);
  assert.ok(Math.abs(display.energyKcal - 397) < 1e-8); assert.ok(Math.abs(display.protein - 7.5) < 1e-8);
  assert.equal(display.minerals.potassium.valueMg, null); assert.equal(display.minerals.phosphorus.valueMg, null);
  assert.match(foodBasisDescription(food.code), /all noodles, seasoning and retained water/);
  assert.equal(barcodePortion('different-pot', { quantity: '85g', nutrition_data_prepared: 'on' }).amount, null);
});
test('all nutrient fields use the same pack factor; missing values and source data are preserved', async () => {
  const h = lookupHarness(async () => ({ ok: true, json: async () => ({ status: 1, product: { quantity: '25g', nutriments: { proteins_100g: 8, salt_100g: 1, potassium_100g: 0.4 } } }) }));
  await h.lookup('bag');
  // lookup sanitises barcodes, so exercise an actual digit code.
  await h.lookup('12345670');
  const food = h.state.selected[0], display = portionNutrition(food, food.portion);
  assert.equal(display.protein, 2); assert.equal(display.salt, 0.25); assert.equal(display.sodium, null);
  assert.equal(display.minerals.potassium.valueMg, 100); assert.equal(display.potassium, 100);
  assert.equal(display.energyKcal, null); assert.equal(food.protein, 8); assert.equal(food.minerals.potassium.valueMg, 400);
  assert.doesNotMatch(renderMineralRows(display), /ESTIMATE/);
});
test('public barcode pipeline keeps ranges dormant even when a range-only candidate is approved', async () => {
  const mapping = mixedMapping();
  const h = lookupHarness(async () => ({ ok: true, json: async () => ({ status: 1, product: { quantity: '350g', nutriments: {} } }) }), [mapping], cofidFixture);
  await h.lookup(mapping.barcode);
  assert.equal(h.state.selected[0].minerals.phosphorus.provenance, 'unavailable');
  assert.match(renderMineralRows(h.state.selected[0]), /Not available/);
});
test('portion reference toggle resets on selection and the estimate badge supports dark mode', () => {
  let reference;
  const context = { setSnackDialogOpen() {}, setWholePackView() {}, setSelectedFood() {}, setReferenceView: value => { reference = value; }, requestResultsScroll() {} };
  vm.runInNewContext(compile(pageFunction('selectFood')), context);
  context.selectFood({ code: 'test' }); assert.equal(reference, false);
  assert.match(page, /onClick=\{\(\) => setReferenceView\(true\)\}/);
  assert.match(page, /html\[data-theme="dark"\] \.food-check-estimate/);
});

test('CoFID gram-based estimates never become millilitre-based values', async () => {
  let reads = 0;
  const result = await resolveCuratedMinerals(CURATED_MINERALS[0].barcode, missingMinerals, async () => { reads++; return cofidFixture; }, { mappings: [reviewMapping()], unit: 'ml' });
  assert.equal(reads, 0); assert.equal(result.potassium.provenance, 'unavailable');
});
for (const [code, grams, row] of [
  ['5000295141599', 350, cofidFixture],
  ['5000157024671', 415, { food_code: '13-532', food_name: 'Baked beans, canned in tomato sauce', potassium_mg: 272, phosphorus_mg: 88 }],
]) {
  test('existing review candidate retains exact reference and whole-pack scaling: ' + code, async () => {
    const mapping = { ...CURATED_MINERALS.find(m => m.barcode === code), approved: { potassium: true, phosphorus: true } };
    const minerals = await resolveCuratedMinerals(code, missingMinerals, async () => row, { mappings: [mapping] });
    const portion = barcodePortion(code, { quantity: grams + 'g' });
    assert.equal(portion.amount, grams);
    assert.equal(scaleMineral(minerals.potassium, grams, portion.basis), row.potassium_mg * grams / 100);
    assert.equal(scaleMineral(minerals.phosphorus, grams, portion.basis), row.phosphorus_mg * grams / 100);
    const source = mineralSourceExplanation(minerals, portion);
    assert.match(source, new RegExp('food code ' + row.food_code));
    assert.ok(source.includes(grams + '/100'));
  });
}

test('larger reviewed foods prefer explicit manufacturer servings and retain whole-pack choice', () => {
  const cheese = barcodePortion('5000295141599', { quantity: '350g', serving_size: '1 serving (30 g)', serving_quantity: 30, serving_quantity_unit: 'g' });
  assert.equal(cheese.amount, 30); assert.match(cheese.label, /Manufacturer serving/); assert.equal(cheese.wholePack.amount, 350);
  const beans = barcodePortion('5000157024671', { quantity: '415g', serving_size: '0.5 can (207 g)', serving_quantity: 207, serving_quantity_unit: 'g' });
  assert.equal(beans.amount, 207); assert.equal(beans.wholePack.amount, 415);
  assert.match(beans.wholePack.label, /with sauce/);
});
for (const serving of [
  { serving_size: '1 serving', serving_quantity: 30, serving_quantity_unit: 'g' },
  { serving_size: '1 serving (30 ml)', serving_quantity: 30, serving_quantity_unit: 'ml' },
  { serving_size: '1 serving (30 g)', serving_quantity: 60, serving_quantity_unit: 'g' },
  { serving_size: '1 serving (400 g)', serving_quantity: 400, serving_quantity_unit: 'g' },
]) {
  test('unusable manufacturer serving retains verified cheese whole-pack fallback: ' + JSON.stringify(serving), () => {
    assert.equal(barcodePortion('5000295141599', { quantity: '350g', ...serving }).amount, 350);
  });
}
test('snacks, explicit multipacks and prepared pots do not adopt unrelated serving sizes', () => {
  const serving = { serving_size: '1 serving (15 g)', serving_quantity: 15, serving_quantity_unit: 'g' };
  assert.equal(barcodePortion('5000159553834', { quantity: '30', ...serving }).amount, 30);
  assert.equal(barcodePortion('bag', { quantity: '25g', ...serving }).amount, 25);
  assert.equal(barcodePortion('multipack', { quantity: '6x25g', ...serving }).amount, 25);
  assert.equal(barcodePortion('4061464935198', { quantity: '85g', ...serving }).amount, 435);
});
test('manufacturer serving and whole-pack views scale from the same unchanged reference', async () => {
  const h = lookupHarness(async () => ({ ok: true, json: async () => ({ status: 1, product: { quantity: '350g', serving_size: '1 serving (30 g)', serving_quantity: 30, serving_quantity_unit: 'g', nutriments: { proteins_100g: 25.4, potassium_100g: 0.075 } } }) }));
  await h.lookup('5000295141599');
  const food = h.state.selected[0], serving = portionNutrition(food, food.portion);
  assert.equal(serving.minerals.potassium.valueMg, 22.5); assert.ok(Math.abs(serving.protein - 7.62) < 1e-9);
  const pack = portionNutrition(food, { ...food.portion, ...food.portion.wholePack });
  assert.equal(pack.minerals.potassium.valueMg, 262.5); assert.equal(food.minerals.potassium.valueMg, 75);
  assert.match(page, /setWholePackView\(true\)/);
});

for (const [barcode, grams, k, p, row] of [
 ['5000295141599',30,23,152,cofidFixture],
 ['5000157024671',207,563,182,{food_code:'13-532',food_name:'Baked beans, canned in tomato sauce',potassium_mg:272,phosphorus_mg:88}],
 ['5000159553834',30,135,67,{food_code:'17-648',food_name:'Chocolate, milk',potassium_mg:451,phosphorus_mg:224}],
]) {
 test('authorised public mapping supplies single estimates for '+barcode,async()=>{
  const result=await resolveCuratedMinerals(barcode,missingMinerals,async()=>row,{basis:'as-sold',unit:'g'});
  assert.equal(result.potassium.provenance,'estimated'); assert.equal(result.phosphorus.provenance,'estimated');
  assert.equal(Math.round(scaleMineral(result.potassium,grams,'as-sold')),k); assert.equal(Math.round(scaleMineral(result.phosphorus,grams,'as-sold')),p);
 });
}
test('successful barcode selection automatically saves identity only; reopening refreshes product and estimates',async()=>{
 const calls=[]; let requests=0;
 const h=lookupHarness(async()=>({ok:true,json:async()=>({status:1,product:{product_name:'Cheddar '+(++requests),nutriments:{}}})}),undefined,cofidFixture,{library:async(...args)=>calls.push(args)});
 const first=await h.lookup('5000295141599'); await flush(); const second=await h.lookup('5000295141599'); await flush();
 assert.equal(requests,2); assert.equal(first.name,'Cheddar 1'); assert.equal(second.name,'Cheddar 2');
 assert.deepEqual(calls,[['scan','5000295141599','Cheddar 1'],['scan','5000295141599','Cheddar 2']]); assert.equal(second.minerals.potassium.provenance,'estimated');
});
