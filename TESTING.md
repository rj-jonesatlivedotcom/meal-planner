# Local checks

Use Node.js 24 and `npm ci`. On Windows, use `npm.cmd` / `npx.cmd` if PowerShell blocks the npm scripts.

```sh
npm test
npm run typecheck
npm run lint:check
```

`npm test` discovers every `*.test.mjs` under `app`, `components`, `lib` and `supabase/tests`. These tests use local fixtures; they do not write to hosted services. Several recipe-preservation tests read historical Git commits, so use a complete clone (`git fetch --unshallow` for a shallow clone).

`npm run lint` remains the full ESLint report. The initial baseline contains **43 errors and 51 warnings**. `lint:check` rejects increases for each file, rule, severity and message; it does not mean the existing code is lint-clean. Do not expand `eslint-baseline.json` to accept new warnings or errors. Reduce the relevant counts when fixing existing findings.

## Browser checks

```sh
# Install the browser inside node_modules instead of the user's profile.
# PowerShell: $env:PLAYWRIGHT_BROWSERS_PATH='0'
# bash: export PLAYWRIGHT_BROWSERS_PATH=0
npx playwright install chromium
npm run test:e2e
```

The suite starts its own app at `http://127.0.0.1:3100` and an in-memory HTTP fixture at `http://127.0.0.1:54329`. Both ports must be available. It supplies synthetic credentials, disables Calendar opt-ins for this process, blocks external browser requests and uses a separate synthetic account per test. It does not reuse an existing development server or modify `.env.local`.

The checks cover:

- All five Sidney steps, selected/unselected nutrients, expanded help, invalid ranges, completion and saved account rows.
- Failed saving, preserved answers, retry, reopening a saved step and leaving setup.
- Adding a first meal, changing its people count, reloading the plan, scaled shopping quantities and persisted checklist selections.
- Real recipes with the longest title, most ingredients and longest method; expanded guides, keyboard disclosure controls and 200% root text size.
- Chromium at 390 px in light mode, 320 px in dark mode with 200% root text size, and 1280 px on desktop. Every captured state checks page width.

Screenshots are saved under `test-results/` and attached to `playwright-report/index.html`. Failed checks also retain a browser trace. Run `npx playwright show-report` to inspect the report.

These are browser integration checks against a simulated service. They do **not** verify live signup/email delivery, Supabase authentication or RLS, cross-device persistence, real iOS/Android devices, or clinical accuracy. They exercise the current undated Planner; Calendar opt-ins retain their existing separate tests.

## Continuous integration

`.github/workflows/checks.yml` runs on pull requests, pushes to `main`, or manual dispatch. It runs the existing tests, checks lint against the baseline, builds the app, checks TypeScript and runs the browser suite against that production build. Full Git history is fetched for the recipe-preservation tests. Browser reports are uploaded for 14 days.

The CI build uses only the synthetic loopback service settings. It is a test build and must never be deployed. This workflow does not deploy or publish anything. Enabling required status checks in GitHub branch protection is a separate repository setting.

## Verified locally — 11 November 2026

- 684 Node tests passed; TypeScript and the production build passed.
- All 15 browser checks passed against the production bundle, with screenshots reviewed across mobile light mode, narrow dark mode with enlarged text, and desktop.
- Lint matched its existing baseline: 43 errors and 51 warnings, with no new findings.
- The fresh-browser Planner initialisation fix was verified through account-fixture writes, a two-person meal, page reloads and scaled shopping quantities.
- Header, setup progress, nutrient choices, My Diet controls, shopping controls/items and recipe sections now reflow at narrow widths with enlarged text. Recipe and nutrition data were unchanged.
- The GitHub workflow is prepared locally; a hosted CI run and required branch-protection checks have not been verified.
