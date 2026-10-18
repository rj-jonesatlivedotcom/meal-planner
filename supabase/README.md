# Dated Planner database foundation — review draft

## Scope

The migration adds `user_weekly_meal_plans`, `user_calendar_settings`, validation
helpers, a time-zone trigger and two revision-checked save RPCs. It does not read,
import, update, rename or drop `user_meal_plans`. It does not change its existing
grants. No application reader/writer has been switched to the new tables.

The owner applied the foundation migration and SQL tests in Calendar Test and
provided successful results, assertions enabled, and zero remaining fixtures.
Live API tests subsequently passed reads, round-trip writes, ownership isolation
and denied direct writes, but found the conflict-response issue described below.
There is no
local PostgreSQL, Docker or Supabase CLI executable available in this workspace.
Static checks are not evidence of successful SQL execution or RLS isolation.

## Security and concurrency contract

- Client roles have SELECT only, protected by owner RLS, on new tables.
- Anonymous clients have no table privileges or save-RPC execution rights.
- Save RPCs are SECURITY DEFINER because direct client writes are intentionally
  denied. Install as the trusted Supabase database administrator. Review function
  ownership and effective privileges in staging. Functions have an empty search
  path, qualified object names, no dynamic SQL, and derive owner from `auth.uid()`.
- These functions are a deliberate narrow privileged boundary, not a reusable
  general service-role client. Every read/update is restricted to the derived owner.
- `p_expected_revision = null` means create only. Existing rows cause SQLSTATE
  `PT409` after the corrective patch. Updates require the exact last acknowledged revision and advance it
  atomically. Two writers using the same revision cannot both succeed.
- Supabase is authoritative for signed-in users. On PT409 or an uncertain save
  response, reload the saved account week without replaying a stale snapshot.
  Browser drafts are passive backups, never a competing account plan; users are
  never asked to compare or select versions.
- Save payloads contain the whole weekly snapshot, including shopping state.
  Callers must share one week-aware store; Shopping must not send a stale Planner.
- Clear a week through an explicit revision-checked update, not DELETE.
- Administrative writes bypass this application contract; do not use them as a
  second normal save path. Account deletion cascades to the new tables.

## Mapping to the local model

`planner`, `meal_people`, `household_people`, `shopping_state` map respectively to
`planner`, `mealPeople`, `householdPeople`, `shopping` in `lib/weeklyPlans.ts`.
`week_start` maps to `weekStart`; acknowledged `revision` maps to `baseRevision`.
The account owner is supplied by the session, never a payload parameter.
Shopping's `legacy` object retains recovered source information; quantities
continue to be calculated by the existing shopping code. Full migration archives
and an idempotent importer are a later stage, not implemented by this foundation.

Defaults: Europe/London, 08:00/13:00/18:00, 30-minute preparation reminder and
Sunday 16:00 shopping reminder. Weekday numbers use ISO 1=Monday through 7=Sunday.
No reminders are scheduled by these tables. Whether Sunday precedes the planned
Monday remains an explicit application scheduling policy, not inferred here.

## Staging execution (administrator only; separate disposable project)

1. Confirm this is a disposable Supabase project, not RenalPlan production.
2. Take the schema baseline and review object-name collisions and role grants.
   The migration deliberately fails on existing names rather than hiding drift.
3. Apply `migrations/202610170001_dated_plans_foundation.sql` using the trusted
   administrator role, then `patches/calendar-conflict-response.sql`. Both use a
   transaction. The original applied migration remains preserved for history.
4. Run `tests/dated_plans.sql` with SQL errors stopping execution. Enable PL/pgSQL
   assertions (`plpgsql.check_asserts` must be on). The test file creates two
   synthetic auth users inside a transaction and rolls them back. It must never
   be run against production. If a test fails, roll back the open transaction.
5. Inspect new object ownership, RLS flags, policy definitions and grants.
   Confirm the legacy schema/grants and stored values are unchanged.
6. In two authenticated sessions for the same test user, read revision R. Issue
   different updates simultaneously with expected R: exactly one must succeed;
   the other must return PT409. Repeat settings and competing create-only saves.
7. Through the actual Supabase API test users A/B and anonymous clients: own reads,
   cross-user reads, RPC writes, denied direct insert/update/delete/truncate and
   missing-session requests. SQL session tests are not a substitute for this.

## Rollback

Before application cutover, disable the new path (currently unused). Keep the
additive tables in place; leaving unused tables is the least destructive rollback.
If an unapplied transaction fails, ROLLBACK removes its partial changes.

Do not run a generic DROP/CASCADE rollback. If removal is later required, first
check dependencies, archive all new data, and prepare an explicit reviewed removal
migration. After multi-week editing begins, rolling back the app cannot represent
every week in the old one-plan format. Preserve all dated records and drafts and
prefer a forward fix/read-only week-aware view. Do not copy a random week back.

## Before production or UI integration

Database tests and real API tests must pass; record the actual results. Implement
the legacy archive/import transaction separately, with explicit week assignment,
no overwrite on destination collision, and unchanged original records. Namespace
guest/account caches; update every writer and reader together; guard stale tabs
and late requests. Separately review tightening legacy broad grants without
breaking the still-running old app. No production application is authorised by
the presence of this migration file.

## API test finding: conflict code correction required

Using SQLSTATE 40001 for an application revision mismatch can trigger PostgREST
transaction retries rather than a prompt HTTP conflict response. The live test
reproduced a timeout on concurrent saves; it did not pass the concurrency gate.
The patch changes only the two RPC definitions to use PT409 (HTTP 409). The
adapter, SQL tests and API assertions now expect PT409. Apply the patch in Calendar
Test before rerunning. See Supabase's documented issue:
https://supabase.com/docs/guides/troubleshooting/high-cpu-and-infinite-transaction-retries-when-using-custom-error-codes-in-rpc-functions-77326b

`tests/calendar-api.mjs` uses only the explicitly supplied test publishable key,
never `.env.local`; sessions stay in memory and are signed out afterward. Test
identities and rows persist because client DELETE is deliberately denied. Review
`tests/calendar-api-cleanup*.json` and the test project's Auth user list for cleanup.
The first interrupted run created two identities before journaling was added, so
they are not in those files. No production users or records were accessed.
Existing retrying server backends may require administrator cancellation or a
test-project restart even after the patch; do not restart the live project.

## Verified API results — 17 October 2026

After the owner applied the conflict-response patch in Calendar Test, all nine
checks in `tests/calendar-api.mjs` passed against the real hosted API:

1. Unauthenticated table and save-RPC access denied.
2. Actual account-adapter roundtrip preserved recipe ID, people override and checks.
3. Authenticated cross-user reads returned no other owner's rows.
4. Direct authenticated insert/update/delete denied.
5. Concurrent same-revision plan saves: exactly one success and one conflict.
6. Duplicate create-only and stale update attempts could not overwrite.
7. Future-week read returned absent; no copying/creation.
8. Settings roundtrip and owner isolation passed.
9. Concurrent settings saves: exactly one success and one PT409 conflict.

The final run completed in about four seconds. `tests/calendar-api-results.json`
records the actual outcome, test project and fixture IDs. This verifies API and
adapter behaviour, not the unfinished page integrations, legacy account import,
calendar output or production readiness. Anonymous sign-ins were enabled by the
owner for test identities; disable them again when API testing is finished.
