import { ESLint } from 'eslint';
import { readFileSync } from 'node:fs';
import { relative } from 'node:path';

const baseline = JSON.parse(readFileSync(new URL('../eslint-baseline.json', import.meta.url), 'utf8'));
const results = await new ESLint().lintFiles(['.']);
const actual = {};
for (const file of results) {
  for (const finding of file.messages) {
    const key = JSON.stringify([relative(process.cwd(), file.filePath).replaceAll('\\', '/'), finding.ruleId, finding.severity, finding.message.split('\n')[0]]);
    actual[key] = (actual[key] ?? 0) + 1;
  }
}
let added = 0;
for (const [key, count] of Object.entries(actual)) {
  const increase = count - (baseline[key] ?? 0);
  if (increase > 0) {
    const [file, rule, , message] = JSON.parse(key);
    console.error(`${file}: ${increase} new ${rule ?? 'parser'} finding(s): ${message}`);
    added += increase;
  }
}
const total = Object.values(actual).reduce((sum, count) => sum + count, 0);
console.log(`Lint: ${total - added} baseline findings; ${added} new findings. Run npm run lint for full details.`);
process.exitCode = added ? 1 : 0;
