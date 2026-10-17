-- DISPOSABLE CALENDAR TEST PROJECT ONLY. Not a production migration.
-- Create two phase3b identities in the isolated harness before running this file.
-- Fail on an existing legacy table rather than replacing any data or policies.
begin;
do $$ begin
  if to_regclass('public.user_meal_plans') is not null then
    raise exception 'Legacy table already exists: inspect before creating fixtures';
  end if;
  if (select count(*) from auth.users where raw_user_meta_data->>'test_fixture' = 'renalplan-phase3b') <> 2 then
    raise exception 'Expected exactly two phase3b synthetic identities';
  end if;
end $$;
create table public.user_meal_plans (
  user_id uuid primary key references auth.users(id) on delete cascade,
  planner jsonb not null default '{}',
  meal_people jsonb not null default '{}',
  household_people integer not null default 1 check (household_people between 1 and 8),
  checked_items jsonb not null default '[]',
  updated_at timestamptz not null default now()
);
alter table public.user_meal_plans enable row level security;
revoke all on public.user_meal_plans from public, anon, authenticated;
grant select on public.user_meal_plans to authenticated;
create policy phase3b_legacy_owner_read on public.user_meal_plans for select
to authenticated using ((select auth.uid()) = user_id);
insert into public.user_meal_plans(user_id, planner, meal_people, household_people, checked_items)
select id, '{"Monday":{"Breakfast":"scrambled-egg-tomato-toast"}}',
  '{"Monday":{"Breakfast":1}}', 4, '["Milk"]'
from auth.users where raw_user_meta_data->>'test_fixture' = 'renalplan-phase3b';
commit;
