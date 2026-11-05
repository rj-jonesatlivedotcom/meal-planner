-- Read-only: run/save in the Supabase SQL Editor as an authorised administrator.
-- One row per currently confirmed account in auth.users; no individual details.
-- "New" and monthly cohorts use account creation (created_at), not login time.
-- The 7/30-day windows are rolling; calendar months use Europe/London.
with confirmed_accounts as (
  select created_at
  from auth.users
  where email_confirmed_at is not null
    and is_anonymous is not true
    and invited_at is null
    and deleted_at is null
), report as (
  select
    0 as sort_order,
    'Total currently confirmed registered accounts' as metric,
    'All time' as period,
    count(*) as account_count
  from confirmed_accounts

  union all

  select
    1,
    'New confirmed registrations',
    'Last 7 days',
    count(*)
  from confirmed_accounts
  where created_at >= current_timestamp - interval '168 hours'

  union all

  select
    2,
    'New confirmed registrations',
    'Last 30 days',
    count(*)
  from confirmed_accounts
  where created_at >= current_timestamp - interval '720 hours'

  union all

  select
    3,
    'Registrations by month',
    to_char(created_at at time zone 'Europe/London', 'YYYY-MM'),
    count(*)
  from confirmed_accounts
  group by to_char(created_at at time zone 'Europe/London', 'YYYY-MM')
)
select metric, period, account_count
from report
order by sort_order, period desc;
