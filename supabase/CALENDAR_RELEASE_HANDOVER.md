# Calendar release handover — 18 October 2026

## Release state

**Preview prepared; production and external subscriptions are not cleared.**

- GitHub: `rj-jonesatlivedotcom/meal-planner`, branch `codex/calendar-completion-oct17`, application commit `9927546` (includes `6378910`, `7836b48`, `690f741`).
- Ready Preview: https://renalplan-j7rqopao0-jones-developing.vercel.app/planner
- Vercel deployment: `dpl_BZrbz6KVnEGNvW6b2u7SDWqQEE5P`; API target `null` means Preview. Confirmed project `prj_nya4oAWDhUlCb9JGZ5YQzPoMG31e`, team `team_ivc1twL3N7LFFsekVWgWCjk9`, production branch `main`.
- Test database: `pyevnakjpgwvylqmpqat`. Production dashboard positively identifies **RenalPlan**, `yyxjeukraeibxxloaors`, healthy, London region. No production SQL or configuration changes, deployment, or merge occurred.
- UI consolidation verified: account icon retains accessible label without visible My Account text; mobile theme icon only; unavailable My Diet Purines controls hidden; dietary labels use Phosphorus. No blind merge of `ui-feedback-oct17`.

## Preview isolation and changes

Five variables apply **only to Preview / this Git branch**: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `NEXT_PUBLIC_RENALPLAN_CALENDAR_TEST_KEY`, `NEXT_PUBLIC_RENALPLAN_DATED_TEST=1`, `NEXT_PUBLIC_VERCEL_ENV=preview`. Both Supabase configurations point to Calendar Test. No production secret/service-role credential was copied. The existing service-role variable targets Production only.

`lib/supabase/config.ts` permits explicit Preview opt-in, rejects missing Preview configuration, retains fixed Test transport and dedicated auth cookies, rejects production activation, and supplies the canonical HTTPS origin from Vercel's deployment hostname. `lib/supabase/proxy.ts`, `lib/calendarApi.ts`, and `lib/calendarServer.ts` enforce that hostname and same-origin mutations. Header-supplied alternate origins are rejected.

`app/calendar-test/page.tsx` stays development-only. `app/layout.tsx` omits Analytics and Speed Insights on Preview. `vercel.json` suppresses automatic deployments for this feature branch; manual Git-backed Preview was created after configuration. Other branches retain Vercel defaults. Added `lib/calendarPreview.test.mjs` and extended `lib/calendarApi.test.mjs`.

Private subscription creation and feed lookup remain disabled in hosted Preview. Existing local subscription tests still work; preview status/revocation are available to authenticated owners. **This is a privacy blocker, not successful hosted subscription acceptance.** Vercel documents actual request paths in runtime logs; Next development logging filters and analytics suppression cannot redact platform access logs. No valid bearer URL was sent to Preview or an external provider. See https://vercel.com/docs/logs/runtime .

## Checks actually executed

- 28 focused tests passed: Preview guards, canonical HTTPS origin, blocked bearer creation, calendar API and shared page storage. Original 174-test suite was not repeated.
- TypeScript and production build passed locally; Vercel Preview build reached READY.
- Affected-file ESLint: zero errors, one existing unused `options` warning in `lib/supabase/proxy.ts`.
- Actual HTTPS browser: guest week navigation, Monday recipe placement, image, explicit one-person count, fluid 200 ml and nutrition 366 kcal; existing seven-day layout retained.
- Actual Preview download: `C:\Users\rj-jo\Downloads\RenalPlan-2026-10-19 (2).ics`. Valid VCALENDAR, two events, Apple & Honey Porridge on 19 October at 07:00 UTC (08:00 London), shopping on 17 October at 09:00 UTC (10:00 London).
- HTTPS settings signed out: 401. Development helper: 404. Fabricated feed token: 404. No valid or revoked private token was tested on HTTPS.
- Unauthenticated external feed request: 302 to deployment protection. Google/Outlook/Apple cannot subscribe through that login barrier. Protection was retained.
- Existing 19 live API and six authenticated export checks remain prior local evidence, not new Preview results. Authenticated Preview flow and provider refresh/revocation remain unverified.
- `git diff 107ee5e -- data package.json package-lock.json` is empty. Unrelated deleted audit outputs and untracked reports/tmp preserved and excluded from commits.

## Production preparation — approval required before execution

Exact target requiring owner approval: **RenalPlan / `yyxjeukraeibxxloaors`**. Candidate ordered SQL files (do not blindly rerun objects already present):

1. `migrations/202610170001_dated_plans_foundation.sql` — SHA256 `967080AE27BF9B855C4EC74E286092D2BF0255591E038E95C6929F9D3657704A`.
2. `patches/calendar-conflict-response.sql` — SHA256 `95D90F8FD75D3BE4A27864D73CFF204BA951068E13ADD88C61A1B9EB5A52F8DE`.
3. `migrations/20261017200848_calendar_subscriptions.sql` — SHA256 `719A2DCFF1A1E8B88735A33279E925D610368064901DED7CC970BE5ED38445CD`.

These are additive: legacy `user_meal_plans` is not removed or rewritten; new weekly rows, settings and private subscription objects are separate. Existing account IDs remain owners. Recipe data is not part of these migrations. Defaults change without overwriting chosen calendar settings. Legacy imports require explicit Monday assignment, retain snapshots, are idempotent and do not overwrite existing dated plans. Current production catalog/migration-ledger compatibility still requires preflight; the dashboard's “No migrations” label is not proof that no objects exist.

**Backup first:** dashboard currently reports “No backups”. An administrator must obtain a consistent roles/schema/data backup, including managed Auth data and any custom Auth objects, secure it outside Git, record row counts and restore-test it in an isolated project. Preserve migration history separately where present; separately back up Storage files/configuration if needed. Do not reset credentials merely for this operation. Follow https://supabase.com/docs/guides/platform/migrating-within-supabase/backup-restore and https://supabase.com/docs/guides/platform/backups . No backup or restore was performed here.

Before production activation:

1. Resolve pre-storage token-path redaction for every hosting/proxy/monitoring layer, or approve and validate a different hosting/feed design. A filtered log viewer is insufficient.
2. Approve a narrowly scoped public feed access arrangement; keep account-management endpoints protected. Verify real HTTPS token creation, rotation/revocation, feed updates and provider access before production.
3. Complete Google/Outlook/Apple subscription and physical-device checks below.
4. Obtain explicit owner approval for the named production project and exact migration set, after backup/restore and catalog preflight. Apply only missing reviewed SQL, then verify RLS/grants/CAS and legacy preservation.
5. Implement and test a separate production activation/transport configuration and trusted `https://www.renalplan.com` origin. **Current code intentionally refuses production calendar activation.** Do not set the Calendar Test flag in Production or copy the Test key. Retain existing production URL/publishable key; no service-role key is required by the new calendar flow. Configure production Auth site/redirect URLs appropriately after review.
6. Only after separate release authorization, merge/deploy a reviewed production build and activate gradually with real-account smoke checks.

Rollback: disable dated-calendar activation/restore the prior deployment first, revoke subscriptions if privacy demands it, and retain additive tables and recovery snapshots. Do not drop dated plans. Legacy UI rollback will not automatically display edits made only in dated storage; reconcile those explicitly from preserved rows before retiring the feature. A failed migration transaction should roll back; never run destructive rollback SQL over successful user writes.

## Provider instructions — manual acceptance pending

After a usable private HTTPS subscription link exists:

- **Google Calendar (desktop web):** Other calendars → + → From URL → paste private link → Add calendar.
- **Outlook web:** Add calendar → Subscribe from web → paste link → name calendar → Import. Do not use file upload for a live subscription.
- **Apple Mac:** Calendar → File → New Calendar Subscription. **iPhone/iPad:** Settings → Apps → Calendar → Calendar Accounts → Add Account → Other → Add Subscribed Calendar; older iOS uses Settings → Calendar → Accounts. Keep SSL enabled.

Verify London winter/summer time, stable event identity after a recipe change, cancellations after meal removal, provider-controlled refresh and reminders, then regeneration/revocation. Revocation blocks future retrieval; it cannot erase provider caches. Manual provider and physical-device checks have not passed yet.
