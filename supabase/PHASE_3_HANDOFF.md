# Phase 3 safeguards and next integration boundary

No application page, root layout, recipe dataset, nutrient calculation or
production connection is changed by this phase. No database SQL was executed.

## Configuration isolation

Normal application clients still read NEXT_PUBLIC_SUPABASE_URL and
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY. Calendar integration tests never load
.env.local. Their separate publishable-key variable is required, the Calendar Test
origin is fixed, alternate projects are rejected, and HTTP redirects are refused.
The owner disabled anonymous sign-ins following the earlier nine successful live
API checks. New Phase 3 tests use injected accounts/storage/locks, not live users.
Those earlier API results must not be described as live validation of new imports
or browser lifecycle handling. No privileged key is used or printed.

## Migration and recovery

`loadLegacy(assignedWeek)` on the account adapter reads and validates the signed-in
owner's source row; it never dates or imports it implicitly. Pass that source to
`migrateLegacyAccount` with a specifically chosen Monday. The migration archives
the original locally before creating anything, then stores a recoverable source
marker inside the existing owner-protected weekly shopping legacy snapshot. No
new tables or active-plan representations are introduced. Create-only revision
checks protect the destination, and a lost response is reconciled by re-reading
the marker. Repeated imports never overwrite subsequent edits.

Guest import uses the same dated store and archives without changing either old
localStorage key. A guest is never silently adopted by a signed-in account.
Malformed, contradictory or changed source data is held for explicit review.
If local archive storage fails, no remote import is attempted.

The store retains both conflict sides, attempted saves and reviewed resolutions.
Resolution requires a reviewed server revision and, for changed local cache, its
reviewed raw token. Changes arriving during review invalidate that resolution.
Only explicit resolution releases the blocked save state. A subsequent device
write remains protected by the database revision compare-and-swap.

## Shared provider contract

`createWeeklyPlanContext` is a framework-neutral external-store provider with
getSnapshot/subscribe, selected week, owner, load/save status and explicit errors.
React integration can consume it through useSyncExternalStore. It is not mounted.
`bindWeeklyPlanAuth` clears visible data immediately on identity events and then
verifies identity with getUser outside the Auth callback. It disposes old stores,
ignores late owner loads and restores a separate guest namespace on logout.

Inject browser navigator.locks as the coordination port for writes. Every lock is
scoped by owner and week. Without locks this provider fails closed to read-only;
there is no unsafe localStorage spin-lock fallback. This is an explicit remaining
browser-support limitation. Revision checks and archived cache comparisons remain
mandatory even when browser locks exist. Tests model tabs and lock scheduling;
real multi-tab Safari/Android/desktop validation remains necessary.

## Smallest coordinated page conversion (next phase)

1. Supply a dedicated local Calendar Test client/session and mount one provider
   behind explicit non-production activation. Do not repoint the whole website
   or reuse production account cookies for the test project.
2. Planner: replace legacy hydration/autosave with provider reads/edits/saves;
   retain meal selection and people controls. MyChef captures owner/week/revision
   before confirmation. Clear Week uses selected week dates for existing fluid
   clearing and clearly confirms the affected date range.
3. Shopping: derive existing quantities from that snapshot. Change only checked
   items/household/manual selection through the shared store; remove whole-plan
   stale upserts and global cache replacement.
4. Nutrition: consume same selected week and use its actual dates for fluid and
   report labels. Preserve all calculation and threshold functions.
5. RecipeCard and recipe details: include owner/week in pending placement and
   removal; capture context before dialogs and preserve it through navigation.
   Cover the otherwise-unused RecipeActions component before enabling it.
6. Dashboard: explicitly use the current London week rather than the last future
   week edited. Namespace update events and ensure subscription cleanup.
7. Convert these readers/writers together before enabling navigation. The global
   legacy keys are recovery inputs, never an active mirror of the selected week.

## Remaining release gates

- Explicit legacy date assignment and conflict-resolution UX (not added here).
- Isolated browser session with real Calendar Test accounts for complete page tests.
- Real browser tab/reload/storage-denial checks, including unsupported Web Locks.
- Account import end-to-end in a disposable database with a synthetic legacy table.
- No production cutover until original data backups, rollback and old-tab handling
  are separately validated. Existing test identities still require admin cleanup.
