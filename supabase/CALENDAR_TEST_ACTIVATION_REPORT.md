# Calendar Test activation and production readiness

Date: 17 October 2026. Branch: `codex/calendar-completion-oct17`; existing commits `690f741`, `7836b48` preserved. **Calendar Test local/API acceptance is complete. Production activation is not cleared until provider/device acceptance and deployment security/configuration work are approved.** The owner supplied the complete brief and approved temporary Calendar Test anonymous sign-ins; both were incorporated.

## Environment positively identified

- Dashboard name: **RenalPlan Calendar Test**, project `pyevnakjpgwvylqmpqat`.
- Test API origin: `https://pyevnakjpgwvylqmpqat.supabase.co`.
- The normal app configuration names a different project, `yyxjeukraeibxxloaors`. No production database query, modification or deployment was performed.
- The dashboard's generic `main PRODUCTION` badge describes the default branch of the separate Calendar Test project; project name and reference were verified before SQL execution.
- The local app uses `127.0.0.1:4330`, development-only test flag, fixed test-project transport and dedicated test auth cookies. The normal localhost:3000 instance was not changed or stopped. Network access was explicitly granted to the test server; an initial sandbox-network failure was diagnosed separately from database/API failures.

## Calendar Test migration completed

The dashboard preflight returned true for both foundation tables, the save RPC, installed PT409 patch and pending-subscription-migration check. Installer role was `postgres` through the authorised dashboard, not a service-role API key.

Applied `migrations/20261017200848_calendar_subscriptions.sql` **once to Calendar Test only**. The editor returned `Success. No rows returned`. Do not apply it there again as an initial migration.

Ran `tests/calendar_subscriptions.sql` in Calendar Test. All transactional assertions completed without error. Follow-up confirmed:

| Check | Actual result |
|---|---|
| `plpgsql.check_asserts` | on |
| Remaining synthetic SQL-fixture users | 0 |
| Subscription-table RLS enabled / forced | true / true |
| Anonymous clients can SELECT token hashes | false |
| Authenticated clients can SELECT token hashes | false |

The live SQL suite exercised owner-scoped creation, rotation, revocation, stable namespace, feed minimisation, other-owner isolation, settings/save revision conflicts, anonymous management denial and rollback. These are **database-role/claim tests**, not a claim that a real Supabase Auth session completed the browser/API workflow.

Also ran the focused `tests/calendar_feed_updates.sql` against Calendar Test: changed meal IDs were reflected in the live feed projection, its revision advanced, namespace stayed stable, stale meal-plan writes returned PT409, configured 08:30 breakfast and disabled preparation/shopping settings appeared in the feed, and Clear Week emptied the saved planner at the next revision. The entire transaction rolled back successfully.

## HTTP and layout checks completed in this pass

- Unauthenticated settings and subscription-management endpoints: **401**.
- Malformed subscription token: **404**, no calendar data.
- Unknown well-formed token: **404**, zero body bytes, after enabling the test server's permitted outbound networking. Initial 503 was the sandbox blocking networking; the direct test RPC subsequently returned 200/null and the HTTP route returned 404.
- Added one narrowly scoped security change in `next.config.ts`: ignore `/api/calendar/feed/` in **Calendar Test development** incoming-request logging. This prevents private links appearing in normal Next access logs; normal development and production configuration are unchanged. Synthetic private links were used only in memory/the explicit owner dialog, then revoked; none were printed or saved in reports.
- TypeScript, changed-config ESLint and production build passed. A focused execution of the actual transpiled Next config confirmed the log filter is enabled in test development only, absent from normal development and absent from production even if the test flag is set. The full 174-test suite was not repeated. The isolated server was stopped after checks; its generated-only tsconfig/agent-file changes were removed, preserving the normal development server and original config.
- Desktop DOM confirmed the seven-day grid, existing meal image/card, people control, Clear Week, seven Fluid cards and full Nutrition selector/day totals remain present. The compact toolbar sits above `main`; it does not replace or overlap it. Previous-pass screenshot remains available for design comparison; no production database access was used for this review.
- At a measured **390 px** viewport, document width was **375 px**, toolbar width approximately **375 px**, height approximately **91 px**. Controls wrap into two rows without horizontal overflow. Existing mobile day tabs, MyChef, Clear Week, meal card/image, Fluid and Nutrition were present. Viewport override was reset afterward.
- Full-page browser screenshot automation timed out. Desktop evidence was saved using the supported viewport capture instead; no claim of a physical iPhone/iPad/Android or mobile screenshot test is made.

Evidence files: `tmp/calendar-test-rls-verification.png`, `tmp/calendar-test-desktop.png`, `tmp/calendar-authenticated-planner.png`. They contain no calendar subscription URLs or access tokens.

## Authenticated end-to-end acceptance completed

Ran `tests/calendar-subscription-api.mjs` through actual Supabase Auth, real SSR auth cookies, the local Next route handlers and Calendar Test/PostgREST. **19 checks passed, 0 failed in the final run.** The safe register is `tests/calendar-subscription-api-results.json`; it records check names, synthetic user IDs and cleanup status, never tokens, cookies or private URLs.

Passed checks include:

- Authenticated preferences read/save and subscription create; unauthenticated bearer-link retrieval of valid ICS for two saved dated weeks.
- Correct meal titles, all saved weeks, privacy minimisation, Europe/London times on both sides of the March and October clock changes, meal/preparation alarms and shopping on the preceding Saturday.
- A/B isolation for saved plans, settings and subscription management; direct plan writes denied; expected-owner header rejects an account switch.
- Stale plan save rejected with PT409, newest plan retained, explicitly reviewed retry accepted. Changed meals retain date/slot UIDs; changed times and disabled optional reminders update/cancel the relevant events.
- Stale settings and subscription updates rejected with HTTP409; saved values remain recoverable. Clear Week produces cancellations with unchanged UIDs.
- Regeneration returns a working replacement link and old-link 404; revocation returns empty404; unknown/malformed links contain no private data; sign-out removes management access.

The first two attempts exposed a genuine Next local-origin regression: the browser's `127.0.0.1` Origin was compared with an internal `localhost` URL, rejecting PUT requests with 403. Fixed `lib/calendarApi.ts` to use the actual Host header **restricted to loopback only**, never arbitrary forwarded hosts; it also builds private links with that same origin. Two focused regression tests cover internal-host normalization and rejection of untrusted/forwarded hosts. The third live run passed all 19 checks. Failed-attempt registers were retained under `tmp/` without credentials.

### Actual authenticated browser checks

Using the existing `/calendar-test` helper, created synthetic browser account `e2566f36-a520-4cae-87a9-979559de83e3`, selected **19–25 October 2026**, and placed Apple & Honey Porridge on Monday. Saved 08:30 breakfast through Meal times, created a private subscription in the dialog, downloaded the selected week and revoked the link. The private URL was not read, printed or captured in a screenshot. The downloaded `.ics` passed **six independent content/format checks**: two events, exact recipe name, Monday 08:30 London = 07:30 UTC, preceding Saturday 10:00 London shopping, matching account namespace/date-slot UID, and UTF-8 line folding.

Planner → Nutrition displayed the selected week's Monday 366 kcal meal; Shopping displayed its four ingredient lines and one-person quantities; returning to Planner retained **19–25 October 2026**. No audited numbers or quantities were edited. The authenticated navbar MyChef/account control, seven-day grid, meal image/card, Fluid, Nutrition and Clear Week remained present.

The browser helper initially encountered a repeated development refresh loop with Turbopack. Restarting **only the isolated test instance** using Next's supported `--webpack` flag restored interaction; no application bundler/configuration default was changed and the user's port3000 server was left running. This is a development limitation, not a claim that production has this issue. The browser automation's time-input `fill` did not dispatch React state changes; actual keyboard input committed 08:30 and the subsequent downloaded time was independently verified. No app workaround was added for that automation artefact.

All API fixture subscriptions were revoked and sessions signed out in `finally`; the result register confirms cleanup. The browser subscription was revoked and its helper reported `All synthetic test sessions signed out`. Synthetic rows remain as test evidence. Anonymous sign-ins were restored to **off**, the dashboard switch was unchecked with Save disabled, and an actual new-sign-in request returned `anonymous_provider_disabled`. No temporary authentication expansion remains.

The previous Phase4 two-tab UI recovery tests remain the evidence for the unchanged recovery controls; they were not unnecessarily repeated. This pass verified real API stale-write rejection and explicit retry, not a new claim of two-tab browser coverage.

### Files changed in this activation work

- `lib/calendarApi.ts`: loopback Host/origin correction and matching link origin.
- `lib/calendarApi.test.mjs`: two origin/security regressions.
- `next.config.ts`: test-development feed-URL logging exclusion.
- `supabase/tests/calendar-subscription-api.mjs`, `calendar-subscription-api-results.json`: repeatable live synthetic API test and redacted final result register.
- `supabase/tests/calendar_feed_updates.sql`: focused transactional feed/update/conflict check.
- This report and `supabase/CALENDAR_COMPLETION_HANDOFF.md`: current status, evidence and remaining steps.

No dependency, recipe, nutrient, shared week-store or production configuration changes were made. Unrelated output deletions/reports remain untouched.

## Production readiness: not yet cleared

Production feature gate and fixed-test transport remain intact. No public HTTPS test endpoint is currently approved/configured in this implementation; localhost cannot be subscribed to by external calendar services. No tunnel, public preview, deployment or production activation was created.

Before production approval:

- Authenticated local Calendar Test checks are complete; retain the result register and review the small origin/logging fixes.
- Approve an isolated, publicly reachable HTTPS test endpoint and its host/feature-gate restrictions. Ensure it connects only to Calendar Test, contains synthetic data only and cannot expose session helpers or arbitrary local routes.
- Configure a trusted canonical HTTPS origin and explicitly replace the current **loopback-only** origin guard for an approved test/public host. Ensure feed-path tokens are redacted at every hosting/proxy/access/analytics layer. The new Next development log filter does not configure an eventual host's access logs.
- Review feed privacy and revocation messaging; provider caches/downloaded copies cannot be recalled.
- Run provider/device acceptance below, then obtain separate owner approval for production configuration, reviewed migrations, backup/rollback and controlled activation. Do not reuse a test key or simply remove the current production gate.

## Exact manual provider acceptance steps

Use only a newly generated synthetic-account URL on the approved HTTPS **test** endpoint. Do not paste it into chat, screenshots, reports or shared tickets.

- **Google Calendar:** desktop web Calendar → Other calendars `+` → From URL → paste the private HTTPS subscription URL → Add calendar. Check week/time/title, then edit a test meal/time and allow Google's refresh interval. Verify the same event updates without duplicates; clear a meal and confirm cancellation after refresh.
- **Outlook:** Calendar → Add calendar → Subscribe from web → paste URL → name/import. Use a subscription, not file upload. Repeat update/cancellation checks after Outlook refresh.
- **Apple:** iPhone/iPad Settings → Apps → Calendar → Calendar Accounts → Add Account → Other → Add Subscribed Calendar (older versions: Settings → Calendar → Accounts). Paste HTTPS URL, keep SSL enabled. On Mac: Calendar → File → New Calendar Subscription. Check London times across the March/October clock changes, update/cancellation and optional alarms.
- Download the selected week separately and import it into a disposable calendar; confirm it is a snapshot, not an updating subscription. Calendar applications control alarm delivery and refresh schedules.
- Regenerate the link and confirm direct access to the old URL returns 404; repeat after revocation. Provider caches may persist until their next refresh. Remove disposable subscriptions afterward.

No Google, Outlook or Apple provider subscription acceptance is claimed yet. The prior 174 automated tests remain documented in `CALENDAR_COMPLETION_HANDOFF.md`; they have not been rerun or counted as new live tests here. Final validation: **29 targeted calendar generation/API tests passed; 19 live API checks passed; six authenticated download content/format checks passed; TypeScript, affected-code ESLint and production build passed.** The 29 include the two new origin regressions. Both isolated test servers were stopped, viewport overrides cleared, generated-only config/agent files removed, and the normal development server left running.
