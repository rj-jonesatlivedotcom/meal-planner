import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import { createRequire } from "node:module";
import ts from "typescript";
import { renderToStaticMarkup } from "react-dom/server";

const require = createRequire(import.meta.url);
const read = file => fs.readFileSync(new URL(file, import.meta.url), "utf8");
const compile = source => ts.transpileModule(source, { compilerOptions: {
  module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX,
} }).outputText;
function load(file) {
  const exports = {};
  vm.runInNewContext(compile(read(file)), { exports, require: name =>
    name.startsWith(".") ? load(`${name}.ts`) : require(name) });
  return exports;
}
const { additiveNotice } = load("./categoryMinerals.ts");
// Render the actual inline notice, without mounting the scanner/account page.
const page = ts.createSourceFile("page.tsx", read("./page.tsx"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
let notice;
function visit(node) {
  if (ts.isArrowFunction(node) && node.body.getText(page).includes("const hasWarning =") &&
      !node.body.getText(page).includes("export default")) notice ??= node;
  ts.forEachChild(node, visit);
}
visit(page);
assert.ok(notice, "Food Check inline additive notice exists");
const module = { exports: {} };
vm.runInNewContext(compile(`exports.render = (selectedFood) => (${notice.getText(page)})();`), {
  exports: module.exports, require,
});
function render(product, override = {}) {
  const minerals = Object.fromEntries(["potassium", "phosphorus"].map(key => {
    const result = additiveNotice(product, key);
    return [key, result ? { additiveUncertainty: result.text, additiveSeverity: result.severity } : {}];
  }));
  return renderToStaticMarkup(module.exports.render({ minerals: { ...minerals, ...override } }));
}
const low = { ingredients_text: "potassium iodate, disodium 5'-ribonucleotides", additives_tags: ["en:e635"] };

test("E635 plus potassium iodate renders a compact blue information notice", () => {
  const html = render(low);
  assert.match(html, /Additional ingredient information/);
  assert.match(html, /Contains additives that contribute small or trace amounts of potassium and phosphorus\. Exact quantities are not available\./);
  assert.match(html, /aria-hidden="true" class="text-blue-700 dark:text-blue-300">ⓘ/);
  assert.match(html, /mx-4 mb-3 rounded-xl border px-3 py-2/);
  assert.match(html, /border-blue-200 bg-blue-50 text-blue-950/);
  assert.doesNotMatch(html, /amber|⚠|significantly higher|Actual amounts may exceed|additives detected/);
});

test("single-nutrient information summary names only the detected nutrient", () => {
  const html = render({ additives_tags: ["en:e635"] });
  assert.match(html, /small or trace amounts of phosphorus\./);
  assert.doesNotMatch(html, /potassium/);
});

test("higher-concern and mixed additives retain amber priority and all explanations", () => {
  for (const product of [{ additives_tags: ["en:e450"] }, { ...low, additives_tags: ["en:e635", "en:e450"] }]) {
    const html = render(product);
    assert.match(html, /border-amber-200 bg-amber-50\/70 text-amber-950/);
    assert.match(html, /dark:border-amber-800 dark:bg-amber-950\/30 dark:text-amber-100/);
    assert.match(html, /⚠/); assert.match(html, /additives detected/);
    assert.match(html, /Actual amounts may exceed estimates\./);
    assert.match(html, /significantly higher/); assert.match(html, /<details[^>]+open=""/);
    assert.doesNotMatch(html, /Additional ingredient information|bg-blue-50/);
    if (product.ingredients_text) {
      assert.match(html, /iodisation/); assert.match(html, /flavour enhancer/);
      assert.ok(html.indexOf("inorganic phosphates") < html.indexOf("iodisation"));
    }
  }
  // Missing severity on older metadata must retain the existing warning default.
  assert.match(render({}, { phosphorus: { additiveUncertainty: "Unknown additive quantity" } }), /bg-amber-50/);
});

test("native expandable Details retains explanations and the BDA reference", () => {
  const html = render(low);
  assert.match(html, /<details[^>]*><summary/); // Collapsed information notice; native keyboard toggling.
  assert.match(html, /Details<\/span><\/summary>/);
  assert.match(html, /iodisation/); assert.match(html, /flavour enhancer/);
  assert.match(html, /<a class="underline" href="https:\/\/www\.bda\.uk\.com\/static\/[^\"]+\.pdf" target="_blank" rel="noreferrer">BDA Renal Nutrition Group/);
  assert.equal(render({}), "");
});

test("light/dark information text and icons meet 4.5:1 contrast using installed Tailwind colours", () => {
  const theme = read("../../node_modules/tailwindcss/theme.css");
  function luminance(shade) {
    const match = theme.match(new RegExp(`--color-blue-${shade}: oklch\\(([\\d.]+)% ([\\d.]+) ([\\d.]+)\\)`));
    assert.ok(match);
    const L = Number(match[1]) / 100, C = Number(match[2]), h = Number(match[3]) * Math.PI / 180;
    const a = C * Math.cos(h), b = C * Math.sin(h);
    const l = (L + .3963377774 * a + .2158037573 * b) ** 3;
    const m = (L - .1055613458 * a - .0638541728 * b) ** 3;
    const s = (L - .0894841775 * a - 1.291485548 * b) ** 3;
    const rgb = [4.0767416621*l-3.3077115913*m+.2309699292*s, -1.2684380046*l+2.6097574011*m-.3413193965*s, -.0041960863*l-.7034186147*m+1.707614701*s].map(v => Math.min(1, Math.max(0,v)));
    return .2126*rgb[0]+.7152*rgb[1]+.0722*rgb[2];
  }
  const html = render(low);
  for (const [foreground, background] of [[950,50],[900,50],[700,50],[100,950],[300,950]]) {
    const a=luminance(foreground), b=luminance(background);
    assert.ok((Math.max(a,b)+.05)/(Math.min(a,b)+.05) >= 4.5, `${foreground} on ${background}`);
  }
  assert.match(html, /dark:bg-blue-950 dark:text-blue-100/);
  assert.match(html, /text-blue-900 dark:text-blue-100/);
});
