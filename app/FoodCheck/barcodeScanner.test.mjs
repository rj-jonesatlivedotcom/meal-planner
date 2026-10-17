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

function lookupHarness(fetch) {
  const state = { errors: [], selected: [], stops: 0, loading: [] };
  const context = { Error, console: { error() {} }, fetch, requestResultsScroll() {}, setSearching() {}, searchRequestRef: { current: 0 }, searchDebounceRef: { current: null }, barcodeLookupBusyRef: { current: false },
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
  assert.match(page, /selectedFood\.potassium === null\s*\? "Not available"/);
  assert.match(page, /selectedFood\.phosphorus === null\s*\? "Not available"/);
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
  const context = { setSelectedFood: f => { selected = f; }, requestResultsScroll: target => requests.push(target) };
  vm.runInNewContext(compile(pageFunction("selectFood")), context);
  context.selectFood({ code: "0012345678905" }); context.selectFood(selected);
  assert.equal(selected.code, "0012345678905");
  assert.deepEqual(requests, ["nutrition", "nutrition"]);
});
