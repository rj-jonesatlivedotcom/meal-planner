# Phase 4 coordinated page integration — 17 October 2026

## Status

Implemented locally behind a disabled-by-default development flag. Ready for further controlled testing; NOT approved for production activation. No calendar commit, push, deployment, production SQL or production API operation was performed. Food Check was separately committed and pushed as 107ee5e at the owner's request.

## Files changed in Phase 4

- `lib/supabase/config.ts`: development-only Calendar Test configuration, separate auth cookie and destination-restricted fetch. No fallback to normal project credentials when enabled. Production builds disable the mode.
- `lib/supabase/client.ts`, `server.ts`, `proxy.ts`: use that isolated configuration in browser, server and middleware. Middleware restricts enabled mode to localhost/127.0.0.1.
- `lib/weeklyPlanContext.ts`: capture mounted owner/week for asynchronous page writes; retain initial load conflicts for explicit review; save explicitly chosen local resolutions with revision checks.
- `lib/weeklyPageStorage.ts`: mounted-page compatibility projection over the existing shared store; owner/week-scoped pending placement; account-scoped dated fluid cache; queued writes and recovery intent records; duplicate-save suppression; wait for writes before navigation. No active-plan mirror in legacy keys.
- `lib/weeklyPageStorage.test.mjs`: 10 targeted tests for mounted identity, recovery, isolation, shopping projection, duplicate events, navigation timing and environment rejection.
- `lib/weeklyPlanSafeguards.test.mjs`: added initial-account-conflict and explicit-resolution save regression test.
- `components/calendar/DatedPlannerBoundary.tsx`: opt-in shared auth/week runtime, Monday week selector, explicit legacy assignment, conflict review, interrupted-write review and owner-filtered recovery display. Remount connected content by owner/week.
- `app/layout.tsx`: mounts the opt-in boundary; disabled mode renders existing children.
- `app/planner/page.tsx`: Planner/MyChef writes use mounted week; dates on desktop/mobile; fluid dates and Clear Week scope; preserve explicit one-person overrides; bypass legacy account writes only in enabled mode; dated-mode client navigation.
- `app/shopping/page.tsx`: selected-week state and checks, existing quantity algorithms; bypass legacy account writer in enabled mode.
- `app/nutrition/page.tsx`: selected-week meals and actual fluid dates; existing nutrition arithmetic unchanged.
- `app/page.tsx`: shared current-calendar-week Dashboard reads (boundary selects current week on Home).
- `components/RecipeCard.tsx`, `components/RecipeActions.tsx`, `app/recipes/[id]/page.tsx`: scoped placement/removal, pending-slot identity and navigation after writes. Detail/action redirects use client routing in dated mode to retain the selected week.
- `next.config.ts`, `.gitignore`: separate ignored `.next-calendar-test` development build directory. Normal build directory unchanged.
- This handoff document.

The earlier Phase 3/3B modules, SQL, controls and evidence remain in the working tree. They were not replaced with another database/storage design. Temporary Next-generated tsconfig changes and AGENTS.md from this test session were removed after stopping the separate server.

## Validation actually executed

- `node --test lib/*.test.mjs app/FoodCheck/*.test.mjs supabase/tests/*.test.mjs`: **138 passed, 0 failed**. These are automated/injected tests, not 138 live database checks. Includes the 50 Food Check regression tests.
- TypeScript `tsc --noEmit`: passed after final implementation.
- Production build: passed after final implementation (26 routes generated).
- New boundary/config/adapter/context and browser/server Supabase clients: ESLint passed with no errors or warnings.
- Existing affected pages: **30 lint errors before and 30 after**. Existing-page warnings increased from 18 to 29, principally effect-dependency warnings after introducing mounted stable adapters/helpers. The pre-existing proxy unused `options` warning remains. Affected-file lint is therefore not clean; no claim of a full lint pass.
- Git inspection: no changes to `data`, recipe datasets, Food Check files or dependencies relative to the Food Check commit. Existing audit-output deletions and unrelated untracked artifacts were left untouched.

## Actual browser observations

Separate loopback test server on port 4320, Calendar Test configuration only. Guest fixtures, not actual patient/account plans:

- Desktop and 390 x 844 mobile Planner show Monday–Sunday dates.
- Added meals, navigated to an empty future week and returned to the saved meal.
- Explicit two-person count survived navigation.
- Shopping showed 30 g cornflakes / 125 ml milk for one person, then 60 g / 250 ml for two people.
- Milk check state persisted; future-week Shopping was empty.
- Nutrition retained its existing guest login gate; rendered comparison data contained the planned meal. Authenticated report UX was not tested.
- Fluid dialog selected 2026-10-12. Added synthetic 200 ml water; current-week combined fluid became 450 ml. Future week showed 0 ml.
- Confirmed Clear Week for the future week; returning preserved the prior meal and 450 ml combined fluid.
- Browser testing exposed and prompted fixes for wrong-week write capture and a Shopping repeated-event/save loop; targeted regression tests now cover these.

The first 127.0.0.1:4320 fixture origin accumulated recovery records during the discovered loop and reached quota. No recovery data was deleted. Final Shopping/mobile checks used the separate localhost:4320 origin after the fix. The independent test server was stopped; the original development server was not stopped. Two attempts to reset the temporary mobile viewport timed out in browser control. Its restoration could not be confirmed; reset the Chrome viewport override before the next desktop browser check.

## Remaining validation / limitations

1. No new authenticated Calendar Test API/database checks were performed in this phase. Prior nine API and Phase 3B migration results remain prior evidence, not validation of the new page layer.
2. Calendar Test anonymous sign-ins remain disabled; no authenticated synthetic browser session was available. Authenticated MyChef, full Nutrition/Dashboard account flows, migration controls on real API, logout/account switching and two-device recovery still require controlled browser testing with a synthetic test login. Do not use production credentials/accounts.
3. Full recipe-card/detail pending-placement journeys, rapid-navigation stress and two-tab recovery UI have automated/core coverage but were not fully exercised in the integrated browser. Complete these before considering production enablement.
4. Mobile checks used Chromium viewport emulation, not physical iPhone/Android hardware.
5. Selected week is in shared mounted context; a hard reload starts on the current calendar week. Dated-mode recipe journeys now avoid full reloads. There is no persisted per-account selected-week preference yet.
6. Editing shared bridge modules while Next dev is running can invalidate their module-local attachment during Fast Refresh. Reload the isolated test page after such edits; do not treat an HMR run as a clean acceptance run.
7. Address the additional dependency lint warnings before final production readiness review.

## Controlled test startup

Use a separate shell and loopback port with `NEXT_PUBLIC_RENALPLAN_DATED_TEST=1` and `NEXT_PUBLIC_RENALPLAN_CALENDAR_TEST_KEY` set to the Calendar Test publishable key. Start `node node_modules/next/dist/bin/next dev -H 127.0.0.1 -p 4320`. No .env.local changes were made. Missing dedicated key fails closed; the normal project is never the test-mode fallback. Production builds explicitly disable the integration.

No ICS, subscriptions or notifications implemented. Later reminder requirements remain as recorded in PHASE_3B_VALIDATION.md. Audited recipe figures, fibre, pepper changes and nutrient/classification methodology were not edited.
