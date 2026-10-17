-- REVIEW/STAGING ONLY. Additive foundation; no legacy data import or table changes.
begin;

create function public.rp_valid_week_payload(meals jsonb, people jsonb)
returns boolean language plpgsql immutable set search_path = '' as $$
declare d text; m text; v jsonb; day_value jsonb;
begin
  if meals is null or people is null or jsonb_typeof(meals) <> 'object'
     or jsonb_typeof(people) <> 'object' then return false; end if;
  for d, day_value in select * from jsonb_each(meals) loop
    if d <> all(array['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'])
       or jsonb_typeof(day_value) <> 'object' then return false; end if;
    for m, v in select * from jsonb_each(day_value) loop
      if m <> all(array['Breakfast','Lunch','Dinner']) then return false; end if;
      if jsonb_typeof(v) <> 'null' and
         (jsonb_typeof(v) <> 'string' or btrim(v #>> '{}') = '') then return false; end if;
    end loop;
  end loop;
  for d, day_value in select * from jsonb_each(people) loop
    if d <> all(array['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'])
       or jsonb_typeof(day_value) <> 'object' then return false; end if;
    for m, v in select * from jsonb_each(day_value) loop
      if m <> all(array['Breakfast','Lunch','Dinner']) or jsonb_typeof(v) <> 'number'
         then return false; end if;
      if (v::text)::numeric < 1 or (v::text)::numeric > 8
         or trunc((v::text)::numeric) <> (v::text)::numeric then return false; end if;
    end loop;
  end loop;
  return true;
end;
$$;

create function public.rp_valid_shopping(value jsonb)
returns boolean language plpgsql immutable set search_path = '' as $$
declare item jsonb; k text;
begin
  if value is null or jsonb_typeof(value) <> 'object' then return false; end if;
  if not (value ? 'checkedItems' and value ? 'legacy') then return false; end if;
  for k in select jsonb_object_keys(value) loop
    if k <> all(array['checkedItems','legacy']) then return false; end if;
  end loop;
  if jsonb_typeof(value->'checkedItems') <> 'array'
     or jsonb_typeof(value->'legacy') <> 'object' then return false; end if;
  for item in select * from jsonb_array_elements(value->'checkedItems') loop
    if jsonb_typeof(item) <> 'string' then return false; end if;
  end loop;
  return true;
end;
$$;

create table public.user_weekly_meal_plans (
  id uuid not null default gen_random_uuid() unique,
  user_id uuid not null references auth.users(id) on delete cascade,
  week_start date not null check (extract(isodow from week_start) = 1 and isfinite(week_start)),
  planner jsonb not null default '{}'::jsonb,
  meal_people jsonb not null default '{}'::jsonb,
  household_people integer not null default 1 check (household_people between 1 and 8),
  shopping_state jsonb not null default '{"checkedItems":[],"legacy":{}}'::jsonb,
  revision bigint not null default 1 check (revision > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, week_start),
  check (public.rp_valid_week_payload(planner, meal_people)),
  check (public.rp_valid_shopping(shopping_state))
);

create table public.user_calendar_settings (
  user_id uuid primary key references auth.users(id) on delete cascade,
  timezone text not null default 'Europe/London',
  breakfast_time time without time zone not null default '08:00',
  lunch_time time without time zone not null default '13:00',
  dinner_time time without time zone not null default '18:00',
  preparation_reminder_minutes integer not null default 30
    check (preparation_reminder_minutes between 0 and 10080),
  shopping_reminder_weekday integer not null default 7 check (shopping_reminder_weekday between 1 and 7),
  shopping_reminder_time time without time zone not null default '16:00',
  preparation_reminders_enabled boolean not null default true,
  shopping_reminders_enabled boolean not null default true,
  revision bigint not null default 1 check (revision > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Reject unsupported zone identifiers even on privileged administrative writes.
create function public.rp_check_calendar_timezone()
returns trigger language plpgsql set search_path = '' as $$
begin
  if not exists(select 1 from pg_catalog.pg_timezone_names where name = new.timezone) then
    raise exception 'Invalid calendar time zone' using errcode = '22023';
  end if;
  return new;
end;
$$;
create trigger rp_calendar_timezone before insert or update on public.user_calendar_settings
for each row execute function public.rp_check_calendar_timezone();

alter table public.user_weekly_meal_plans enable row level security;
alter table public.user_weekly_meal_plans force row level security;
alter table public.user_calendar_settings enable row level security;
alter table public.user_calendar_settings force row level security;

create policy rp_weekly_owner_read on public.user_weekly_meal_plans
for select to authenticated using ((select auth.uid()) = user_id);
create policy rp_calendar_owner_read on public.user_calendar_settings
for select to authenticated using ((select auth.uid()) = user_id);

-- No direct client writes: every write must use the revision-checked RPCs below.
revoke all on public.user_weekly_meal_plans, public.user_calendar_settings from public, anon, authenticated;
grant select on public.user_weekly_meal_plans, public.user_calendar_settings to authenticated;

-- Narrow SECURITY DEFINER boundary: no caller-supplied owner, no dynamic SQL,
-- empty search_path, and explicit ownership on every query. Migration must be
-- installed by the Supabase administrator; its owning role is reviewed in staging.
create function public.rp_save_week(
  p_week_start date, p_expected_revision bigint, p_planner jsonb,
  p_meal_people jsonb, p_household_people integer, p_shopping_state jsonb
) returns public.user_weekly_meal_plans
language plpgsql security definer set search_path = '' as $$
declare owner_id uuid := auth.uid(); result public.user_weekly_meal_plans;
begin
  if owner_id is null then raise exception 'Authentication required' using errcode = '42501'; end if;
  if p_expected_revision is null then
    insert into public.user_weekly_meal_plans(user_id, week_start, planner, meal_people, household_people, shopping_state)
    values(owner_id, p_week_start, p_planner, p_meal_people, p_household_people, p_shopping_state)
    on conflict (user_id, week_start) do nothing returning * into result;
  else
    update public.user_weekly_meal_plans
    set planner = p_planner, meal_people = p_meal_people, household_people = p_household_people,
        shopping_state = p_shopping_state, revision = revision + 1, updated_at = clock_timestamp()
    where user_id = owner_id and week_start = p_week_start and revision = p_expected_revision
    returning * into result;
  end if;
  if result.user_id is null then raise exception 'Weekly plan revision conflict' using errcode = '40001'; end if;
  return result;
end;
$$;

create function public.rp_save_calendar_settings(
  p_expected_revision bigint, p_timezone text, p_breakfast_time time, p_lunch_time time,
  p_dinner_time time, p_preparation_minutes integer, p_shopping_weekday integer,
  p_shopping_time time, p_preparation_enabled boolean, p_shopping_enabled boolean
) returns public.user_calendar_settings
language plpgsql security definer set search_path = '' as $$
declare owner_id uuid := auth.uid(); result public.user_calendar_settings;
begin
  if owner_id is null then raise exception 'Authentication required' using errcode = '42501'; end if;
  if p_expected_revision is null then
    insert into public.user_calendar_settings(user_id, timezone, breakfast_time, lunch_time, dinner_time,
      preparation_reminder_minutes, shopping_reminder_weekday, shopping_reminder_time,
      preparation_reminders_enabled, shopping_reminders_enabled)
    values(owner_id, p_timezone, p_breakfast_time, p_lunch_time, p_dinner_time, p_preparation_minutes,
      p_shopping_weekday, p_shopping_time, p_preparation_enabled, p_shopping_enabled)
    on conflict (user_id) do nothing returning * into result;
  else
    update public.user_calendar_settings set timezone = p_timezone, breakfast_time = p_breakfast_time,
      lunch_time = p_lunch_time, dinner_time = p_dinner_time, preparation_reminder_minutes = p_preparation_minutes,
      shopping_reminder_weekday = p_shopping_weekday, shopping_reminder_time = p_shopping_time,
      preparation_reminders_enabled = p_preparation_enabled, shopping_reminders_enabled = p_shopping_enabled,
      revision = revision + 1, updated_at = clock_timestamp()
    where user_id = owner_id and revision = p_expected_revision returning * into result;
  end if;
  if result.user_id is null then raise exception 'Calendar settings revision conflict' using errcode = '40001'; end if;
  return result;
end;
$$;

-- Functions otherwise receive PUBLIC EXECUTE by default.
revoke all on function public.rp_valid_week_payload(jsonb,jsonb), public.rp_valid_shopping(jsonb),
  public.rp_check_calendar_timezone() from public, anon, authenticated;
revoke all on function public.rp_save_week(date,bigint,jsonb,jsonb,integer,jsonb),
  public.rp_save_calendar_settings(bigint,text,time,time,time,integer,integer,time,boolean,boolean)
  from public, anon, authenticated;
grant execute on function public.rp_save_week(date,bigint,jsonb,jsonb,integer,jsonb),
  public.rp_save_calendar_settings(bigint,text,time,time,time,integer,integer,time,boolean,boolean)
  to authenticated;

commit;
