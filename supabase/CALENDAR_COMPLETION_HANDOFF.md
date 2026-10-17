# Calendar completion — 17 October 2026

Follow-up: the migration is installed in Calendar Test; its live SQL suites, 19 authenticated API checks, 29 targeted tests and authenticated browser/export checks passed. Anonymous sign-ins are restored off and test subscriptions/sessions cleaned up. See `CALENDAR_TEST_ACTIVATION_REPORT.md` for the origin fix, evidence and remaining provider/device/production prerequisites. The original completion-pass evidence below is retained as history.

## Review state

Work is on local branch `codex/calendar-completion-oct17`. Phase 4 was checkpointed at `690f741`. No push, merge, deployment or production Supabase operation occurred. The calendar feature still requires development mode plus the explicit Calendar Test flag; all new routes use that same gate. Normal Planner grid/card styles and the audited datasets are unchanged.

The local implementation is ready for the **Calendar Test migration and authenticated trial**, not production activation. The subscription migration below has not been installed on Calendar Test. No administrator database credential or active synthetic account session was available in this pass. Existing test-project anonymous sign-ins were left disabled. The new functionality was tested with injected API clients, offline PostgreSQL and the isolated guest browser.

## Implemented

- Compact toolbar above the existing Planner: previous/next arrows, UK date range, current-week indicator/reset, Connect calendar and Meal times. Weekday dates and Clear Week range now use UK presentation. No new page heading or changes to meal-card sizes, images, fluid or nutrition calculations.
- Selected-week ICS download, including guest plans. It waits for pending shared-storage writes and checks the current owner/week again before exporting. Existing shared Planner/Shopping/Nutrition state, migration and conflict handling remain authoritative.
- All-saved-weeks, read-only subscription feed; 32 random bytes encoded as a URL-safe token. Only its SHA-256 hash is stored. Creation/regeneration/revocation use owner-authenticated, generation-checked RPCs. Raw links appear only in the explicit response/dialog, never localStorage. Losing the displayed link requires regeneration.
- Meal times and time zone; optional meal/preparation alarms; optional shopping event in the preceding calendar week. New defaults: 08:00/13:00/18:00, meal 15 minutes, preparation 30 minutes, Saturday 10:00, Europe/London. Existing saved settings (including older Sunday 16:00 choices) are preserved; migration changes defaults only. Guest calendar preferences use a separate owner-scoped preferences key, not another meal-plan store.
- Stable SHA-256 owner namespace and date/slot UIDs, independent of recipe/token changes. Saved revisions and modification timestamps drive updates. Removed meals/cleared weeks publish cancelled events; settings changes retain event identity. No dated plan deletion feature was introduced. Thirty-minute calendar blocks are presentation slots, not recipe cooking durations.
- UTC timestamps derived from IANA wall times. London DST covered; ambiguous autumn times use the earlier occurrence. Nonexistent spring times fail explicitly. Empty-slot cancellation tombstones do not require resolving nonexistent wall times. No advance-preparation reminders are invented without verified metadata. Calendar providers control subscription refresh and alert delivery.
- Provider-specific Google/Outlook/Apple instructions, links to Google/Outlook Calendar, private HTTPS URL copy control. Apple instructions cover iPhone/iPad SSL subscriptions and Mac Calendar. External providers cannot reach localhost; no automatic provider account linking, tunnel or notification service was introduced.
- Selectively integrated `origin/ui-feedback-oct17` (`e1c505d`): icon-only My Account (existing accessible label retained), icon-only mobile theme control, unavailable My Diet Purines control hidden with stored fields intact, and dietary Phosphorus wording distinguishing P mass from phosphate compounds. No other branch files were merged.

## Security boundaries

The feed exposes meal names/dates and reminder settings only. It does not expose user UUIDs, dietary requirements, nutrients, shopping contents, household size or people counts. Anyone holding the private link can read that calendar; this is explained in the connection dialog. Revocation prevents subsequent reads but cannot erase provider caches/downloaded copies.

The subscription table is in an unexposed private schema, RLS enabled/forced, without client table grants. Narrow private SECURITY DEFINER functions enforce ownership for management. Public RPC wrappers use SECURITY INVOKER; only the capability lookup is anonymously callable. No service-role key is used. Route mutations require same-origin requests and an expected-owner header matching verified auth; CAS conflicts return 409 without automatic retries. Feed responses are no-store, no-referrer and noindex. Errors do not return tokens or upstream credentials.

Before any public HTTPS rollout, configure an explicit trusted public origin; review proxy/host handling and redact token-bearing feed paths from hosting/proxy/access/analytics logs. Do not enable request/response-body logging for token creation. Current Next development mode is intentionally loopback-only and cannot serve real third-party subscriptions.

## Files in this completion pass

| Files | Purpose |
|---|---|
| `components/calendar/CalendarToolbar.tsx` | Compact toolbar, accessible native dialog, settings, provider instructions, download/token actions |
| `components/calendar/DatedPlannerBoundary.tsx` | Mount controls using existing selected owner/week; distinct toolbar key |
| `app/planner/page.tsx` | UK date presentation only |
| `components/Navbar.tsx`, `app/requirements/page.tsx` | Selective UI feedback integration |
| `lib/calendar.ts` | Preferences, UK formatting, timezone conversion, RFC 5545 generation |
| `lib/calendarApi.ts`, `lib/calendarServer.ts` | Injected/testable API boundary and fixed-test Supabase wiring |
| `app/api/calendar/settings/route.ts` | Owner settings GET/PUT |
| `app/api/calendar/subscription/route.ts` | Owner status/create/regenerate/revoke |
| `app/api/calendar/feed/[token]/route.ts` | Read-only capability feed |
| `lib/calendar.test.mjs`, `lib/calendarApi.test.mjs` | 27 focused generation/API tests |
| `supabase/migrations/20261017200848_calendar_subscriptions.sql` | Additive settings/subscription migration, created with official Supabase CLI |
| `supabase/tests/calendar_subscriptions.sql` | Synthetic transactional security/CAS/token tests |
| `supabase/tests/run-calendar-sql.mjs` | Optional embedded-Postgres runner; no network connection |
| This file | Results, blockers and activation steps |

No application dependencies were added. The optional PGlite test tool was installed under untracked `tmp/calendar-sql-validation` only. Existing unrelated audit-output deletions/untracked reports were preserved and excluded from commits.

## Validation evidence

- Full regression run once: `node --test lib/*.test.mjs app/FoodCheck/*.test.mjs supabase/tests/*.test.mjs`: **174 passed, 0 failed** (147 existing + 27 calendar tests).
- Focused 27 calendar tests rerun after the small API/error-handling and cancellation changes: passed. Tests cover DST, stable IDs, all weeks, cancellations, reminders, UTF-8 folding/escaping, preferences, auth/origin/account checks, token rotation/revocation, no-cache responses and production gating.
- `node supabase/tests/run-calendar-sql.mjs`: foundation migration, installed conflict-response patch, new migration, foundation tests and new subscription tests passed in an in-memory PostgreSQL engine. Synthetic records rolled back. This is **not** a claim of live Supabase/PostgREST migration acceptance. The runner translates the old foundation suite's `serialization_failure` expectations to the already-approved PT409 conflict code.
- Optional SQL runner setup: `npm.cmd install --prefix tmp/calendar-sql-validation --no-save --package-lock=false @electric-sql/pglite@0.3.14`. This does not modify app dependency files. The embedded runner supplies minimal synthetic auth roles/UID function, not a full Supabase Auth service.
- TypeScript and production build passed. New calendar modules/routes/components/tests: ESLint clean. Existing modified Planner/My Diet/Navbar: **14 errors / 13 warnings before and after** (Planner 8/11, My Diet 3/1, Navbar 3/1); no claim of repository-wide clean lint. Remaining findings are existing hook/render/image issues, with source-line shifts only.
- Actual isolated browser `127.0.0.1:4330`: UK week navigation, existing spacious grid, configurable guest settings/save feedback and guest recipe placement observed. A React sibling-key collision introduced by the toolbar was found and fixed. Native dialog focus/close worked.
- Clicking Download produced `C:\Users\rj-jo\Downloads\RenalPlan-2026-10-12.ics` (1,144 bytes). Its content was inspected: Apple & Honey Porridge, Monday 08:00 London = 07:00 UTC, 15/30-minute alarms, preceding Saturday 10:00 London shopping event, folded stable UIDs and CRLF. The browser download-event automation timed out although the actual file and success feedback were present; filesystem evidence confirms the download.
- Local HTTP settings/subscription requests without auth returned 401. A synthetic feed request returned 503 because the new live integration is unavailable pending migration. No real private calendar token was logged or transmitted to a provider.
- Prior Phase 4 real authenticated/MyChef/account/conflict evidence remains in `PHASE_4_COMPLETION.md`; it was not re-described as a new live test. Mobile/physical-device layout and external provider subscription refresh/cancellation behaviour still need manual acceptance.
- `git diff 107ee5e -- data package.json package-lock.json` is empty. No audited recipe/nutritional values changed.

## Exact Calendar Test steps

1. Select **RenalPlan Calendar Test**, project `pyevnakjpgwvylqmpqat` (not live RenalPlan). Confirm the existing foundation and PT409 patch are already installed.
2. In that project's SQL Editor, run **only** `supabase/migrations/20261017200848_calendar_subscriptions.sql` once, as administrator. The transaction is additive; do not rerun an already-successful migration.
3. Run `supabase/tests/calendar_subscriptions.sql` there. Its synthetic users/plans/settings/subscriptions are rolled back. If an error occurs, issue `ROLLBACK;`, retain the error and fix it before continuing. Do not run the old foundation suite unchanged after the PT409 patch; use its documented code update or the offline runner.
4. Use an authorised synthetic account (or user-confirmed temporary anonymous sign-ins in Calendar Test), with the existing isolated test-session helper. Do not use actual patient accounts or a privileged key. Keep the normal dev server/storage separate.
5. Start the isolated dev instance on `127.0.0.1:4330` with `NEXT_PUBLIC_RENALPLAN_DATED_TEST=1` and the dedicated Calendar Test publishable key. Never set a production key as fallback. Verify settings creation/update/conflict, token create/rotate/revoke, two owners and all saved weeks through actual PostgREST/API requests. Do not log raw tokens.
6. Verify selected-week export against that authenticated feed (matching date/slot UIDs), changed recipes, Clear Week cancellation and settings updates. Revoke synthetic subscriptions and sign out test sessions afterward. Any temporary anonymous sign-ins must be disabled again.
7. External calendar acceptance needs a separately approved publicly reachable HTTPS **test** environment and explicit feature-gate/isolation changes; the current dev-only/loopback restrictions intentionally prevent that. Then check Google/Outlook/Apple subscription refresh, cancellations, time zones and alarms. No such environment was deployed in this pass.

## Before production

Obtain owner approval after Calendar Test and provider/device acceptance; review existing Phase 4 migration/recovery controls and production account compatibility. Back up production and apply reviewed additive migrations only with separate approval. Provision the trusted HTTPS origin and token-path log redaction, then explicitly design/review a production feature flag and transport configuration (current code always disables production). Keep guest/account stores isolated and never automatically import/copy undated weeks. Deploy/activate gradually only after a separate instruction.

Rollback of UI activation is to disable the feature gate first. Leave additive database objects/data intact for recovery; do not drop saved preferences/subscriptions as an automatic rollback.

## References used

- iCalendar: https://www.rfc-editor.org/rfc/rfc5545
- Google subscription instructions: https://support.google.com/calendar/answer/37100?hl=en-uk
- Apple subscription instructions: https://support.apple.com/en-ca/102301
- Existing foundation/methodology: `PHASE_4_HANDOFF.md`, `PHASE_4_COMPLETION.md`, migration and patch files in this repository.
