# Phase 3B validation checkpoint — 17 October 2026

## Isolation

The standalone harness binds only `127.0.0.1:4319`, a different origin from the
normal localhost application. It does not load Next.js layouts, cookies, app
environment files or production clients. Startup verifies the explicitly supplied
publishable key against the allowlisted Calendar Test Auth endpoint. No privileged
key is accepted. CSP restricts connections to this origin and Calendar Test;
redirects are rejected and sessions remain in memory. No synthetic identity is
created by simply opening the harness or running its local browser suite.

Start with RENALPLAN_CALENDAR_TEST_PUBLISHABLE_KEY set privately in the process:
`node supabase/tests/browser-harness-server.mjs`. Do not put production credentials
in this variable. No dependency installation is required.

## Browser checks actually executed

Chrome at the isolated origin passed ten executable checks using the actual shared
modules: Web Locks availability, localStorage roundtrip, injected storage denial,
rapid navigation/slow response, conflict archive/explicit recovery, account switch
and logout, guest/account isolation, failed-save retention/retry blocking, edits
during a slow save, and late owner-response suppression. Account transport in these
ten checks is synthetic, not Supabase. A separate two-tab manual automation check
held an actual Web Lock in tab A, confirmed tab B waited, then confirmed acquisition
only after release. Safari, Android and real browser storage-policy denial were not
tested; storage denial here was injected at the storage port.

The new controls are tested through their actual React element handlers with a
small hook harness; those tests are not real browser rendering/accessibility tests.
The controls are not imported by any operational page.

## Live Calendar Test migration checks completed

Following explicit owner approval, the test project's anonymous sign-ins were
available for synthetic identities. A disposable legacy table was created in
Calendar Test only, with owner-only reads and synthetic source rows. No production
project was opened or queried.

The first live attempt exposed a real bug: jsonb reordered migration marker keys,
so the repeated-import check rejected an already imported week. The fix compares
marker fields by value; a regression test reproduces reordered marker keys.

The corrected isolated Chrome run passed:

- Actual account adapter legacy retrieval and import into the assigned Monday.
- People count 4, explicit one-person override, checked Milk item preserved.
- Repeated import did not increment the saved revision.
- Original legacy source remained unchanged; second account could not read the week.
- An occupied destination week was not overwritten.
- A real committed import survived an injected lost response via marker recovery.
- An injected pre-save failure created no week; the archived source resumed safely.

Test sessions were signed out and cleared from browser memory. Anonymous sign-ins
were switched off and saved in Calendar Test afterward. Synthetic fixtures remain
for inspection; their IDs are recorded in tests/phase3b-browser-results.json.

## Controls

`components/calendar/IntegrationControls.tsx` exports explicit Monday assignment,
conflict review of both versions, and migration status/error feedback. It performs
no network/storage operations itself; callbacks use the existing migration/store
APIs. It prevents duplicate submissions and never automatically picks a week or
resolves on mount. Conflict controls must be keyed by owner/week/review revision.

## Approved reminder specification (design only)

- Europe/London by default; all times/reminders configurable.
- Breakfast 08:00, lunch 13:00, dinner 18:00.
- Meal reminder 15 minutes before; preparation reminder 30 minutes before.
- Shopping Saturday 10:00 before the planned Monday.
- Advance preparation only where verified advance-preparation metadata exists.

These defaults are recorded in CALENDAR_DEFAULTS. Existing applied SQL contains
the earlier Sunday 16:00 defaults and no meal-reminder column. It was deliberately
not changed in this phase: the later reminder-settings migration must reconcile
this specification before those defaults are used. No events or notifications exist.

## Phase 4 readiness

Shared foundations and local/browser simulations are available for isolated page
development. Do not activate account migration or production-facing dated planning
until browser control review and coordinated page conversion are complete. The real synthetic legacy-import gate now passes.
Keep the previously documented coordinated page conversion; no legacy active-key
mirrors, automatic migration or silent conflict resolution.
