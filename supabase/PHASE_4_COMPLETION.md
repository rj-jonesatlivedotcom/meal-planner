# Phase 4 completion — 17 October 2026

## Outcome

Phase 4 is ready for controlled activation in the isolated Calendar Test development environment. Production remains disabled by `datedPlannerEnabled()` requiring NODE_ENV=development and the explicit test flag. This is not authorisation to deploy or enable production.

This continues PHASE_4_HANDOFF.md; no general audit or new architecture was started. No recipe/nutritional dataset changes, commits, pushes, deployments or production Supabase operations were performed.

## Corrections made in this completion pass

1. Stabilised mounted storage helper closures with useMemo/useCallback and added their actual effect dependencies. All 11 Phase 4 dependency warnings are removed; no suppressions were added.
2. Conflict previews retain the attempted edit when local cross-tab compare-and-swap rejects it. Further queued writes are blocked during review so a following Shopping update cannot replace that attempted recipe edit in the preview. Explicitly chosen local versions save through the existing revision-checked account adapter.
3. Bridge save-error events now carry owner and week identity. The boundary ignores errors for other accounts/weeks.
4. Added an isolated synthetic-session UI at `/calendar-test`, gated on the same development-only test mode. It uses publishable credentials, the fixed Calendar Test destination and no privileged key. Production build metadata confirms HTTP 404. Session helpers use independent ephemeral Auth clients to create A/B identities without revoking the previous test identity, and can sign out both saved synthetic sessions. They do not store or calculate meal plans themselves. Each ephemeral client has a unique auth storage key to avoid the SDK multiple-client/shared-key warning. That final key-isolation adjustment was unit-tested and type/build checked; the live account-switch flow was executed before that key-only adjustment.
5. Added executable tests of the actual TSX placement/removal handler bodies, connected to the real shared page bridge/context/store with injected storage. Existing handlers did not need further recipe-placement changes after the prior Phase 4 navigation fixes.

## Files changed in this completion pass

- `app/page.tsx`: stable Dashboard reader callback and dependencies.
- `app/planner/page.tsx`: stable storage helper closures and dependencies.
- `app/nutrition/page.tsx`: stable Planner/fluid readers and dependencies.
- `app/shopping/page.tsx`: stable adapter dependency declarations.
- `components/RecipeActions.tsx`: stable adapter dependency declaration.
- `lib/weeklyPlanContext.ts`: retain attempted conflicting changes; pause subsequent queued edits pending resolution.
- `lib/weeklyPageStorage.ts`: owner/week-scoped save-error payload.
- `components/calendar/DatedPlannerBoundary.tsx`: filter save errors by active owner/week.
- `app/calendar-test/page.tsx`, `components/calendar/CalendarTestSession.tsx`: isolated synthetic session setup/cleanup.
- `lib/weeklyPageTestSupport.mjs`: shared injected test fixture, extracted from existing bridge tests.
- `lib/weeklyPageStorage.test.mjs`: reuse fixture.
- `lib/weeklyPlacementRoutes.test.mjs`: seven actual-handler placement/removal tests.
- `lib/weeklyPlanSafeguards.test.mjs`: conflict-preview/queued-update regression.
- `lib/calendarTestSession.test.mjs`: independent synthetic client/session regression.
- This completion record. Temporary Next-generated tsconfig edits and AGENTS.md were removed after stopping the separate test server.

## Actual integrated browser results

All application testing used `http://127.0.0.1:4330` and Calendar Test, never the live RenalPlan project. Normal development storage was not used.

- Authenticated MyChef generated 21 meals in 2026-10-19 to 2026-10-25. Reloading and returning to that week restored 21 meals. The current week remained empty before its separately requested test placement.
- Planner picker placement saved a distinct recipe to the signed-in account.
- Planner -> Browse Recipes -> card pending-slot placement returned to the intended slot.
- Normal card placement selected Tuesday in the selected future week, returned without resetting that week and displayed the recipe.
- Normal detail-page placement added Wednesday in the same future week; both placements were visible afterward.
- Planner -> Browse Recipes -> detail pending-slot placement placed Thursday breakfast in 2026-10-26 to 2026-11-01. The exact week and Thursday location were verified after returning.
- Detail-page removal removed that selected week's placement; its button reverted to Add to Planner.
- A stale second tab was blocked after the first tab saved a people-count edit. Review displayed local and saved versions. Choosing the saved version, explicitly reviewing queued recovery records, and then editing again saved successfully. The first tab reloaded the new three-person value.
- Repeated two-tab testing used a stale recipe removal against a saved two-person meal. After the preview fix, the local preview showed the attempted removal while the server preview retained the recipe and two-person count. Choosing Keep my local changes persisted the removal. Reloading the first tab showed an empty week. Recovery records remained retained.
- Account B showed an empty plan rather than inheriting A's meal. A -> B -> A switching restored A's distinct Weetabix meal. A prior test also saved a distinct Cornflakes meal for B and confirmed logout returned to an empty guest plan.
- Test-helper session revocation was encountered on the first A/B fixture pair, diagnosed and corrected in the test helper. The replacement independent pair completed A -> B -> A successfully. This was not an application authentication change.

Actual integrated browser coverage included both conflict choices, normal/pending card/detail additions, detail removal, picker placement, MyChef, logout and account switching. The unused legacy RecipeActions component and card removal also have actual-handler executable tests; no separate live route was invented for them.

## Automated and build results

- `node --test lib/*.test.mjs app/FoodCheck/*.test.mjs supabase/tests/*.test.mjs`: **147 passed, 0 failed**.
- Seven new handler tests cover RecipeCard normal add, pending add, removal; recipe details normal add, pending add, removal; legacy RecipeActions add. They assert selected-future-week targeting and preservation of unrelated slots/people.
- Conflict regression verifies that a queued Shopping write cannot replace an attempted recipe edit during conflict review, and that the reviewed local edit saves afterward.
- TypeScript: passed.
- Production build: passed, 27 routes including the deliberately unavailable test route.
- `.next/server/app/calendar-test.meta`: **status 404**.
- Core changed modules, test controls and changed tests: ESLint clean.
- Eight affected existing pages/components: **30 errors / 18 warnings before; 30 errors / 18 warnings after**. All pre-existing issues remain; the 11 Phase 4 warnings are removed. This is not a claim of repository-wide clean lint.
- Recipe/nutrition `data` files, Food Check files and dependency files have no changes relative to pushed commit 107ee5e.

## Test isolation and cleanup

Anonymous sign-ins were temporarily enabled in Calendar Test with explicit owner approval. They were disabled again in its dashboard after fixture creation; the switch was unchecked and Save changes disabled after saving. No other authentication provider setting was changed.

All replacement synthetic sessions were signed out using the test cleanup control. Earlier revoked fixture sessions were already signed out. Synthetic database rows and local recovery archives remain available as test evidence; no actual user plans were imported or removed.

Synthetic identities created in this pass:
- `6785d4ce-dc8b-40d6-9376-3b086b6a99dd`: original MyChef, placement and first conflict fixture.
- `641e145c-9b7b-47bd-ab9f-582223600e86`: first account-B fixture.
- `dad31759-8148-4638-b880-36cf2fe3a14c`: independent replacement A, account-switch and retained-local conflict fixture.
- `334ae37c-b518-43eb-b595-af642dc8a384`: independent replacement B.

The two public `/auth/v1/settings` read attempts did not expose an anonymous-sign-in status field, so they are not evidence of that setting. Dashboard state is the recorded evidence. One sandbox-blocked request was rerun read-only with network permission; no production request was made.

## Scope of readiness

Ready for a controlled Calendar Test trial. No remaining blocker was found in the four requested Phase 4 areas. Physical Safari/Android testing and a production rollout remain outside this completion pass. The original handoff's development-only Fast Refresh/reload caveat and current-week-on-hard-reload behaviour remain; no per-account selected-week persistence feature was added. Existing Calendar Test fixture tables do not reproduce every production account subsystem, so this does not claim a full production-authentication or complete My Diet persistence acceptance test.
