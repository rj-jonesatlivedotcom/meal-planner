import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

// Explicit discovery keeps Node's runner separate from Playwright and includes
// new tests in every application directory on both Windows and Linux.
function discover(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? discover(path) : entry.name.endsWith('.test.mjs') ? [path] : [];
  });
}
const files = ['lib', 'components', 'app', 'supabase/tests'].flatMap(discover).sort();
console.log(`Running ${files.length} test files.`);
const result = spawnSync(process.execPath, ['--test', '--test-concurrency=4', ...process.argv.slice(2), ...files], { stdio: 'inherit' });
if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
