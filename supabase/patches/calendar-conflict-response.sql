-- Calendar Test only. Fix API conflict responses; no table or stored-data changes.
-- Run after 202610170001_dated_plans_foundation.sql. CREATE OR REPLACE keeps existing grants.
begin;
create or replace function public.rp_save_week(
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
  if result.user_id is null then raise exception 'Weekly plan revision conflict' using errcode = 'PT409'; end if;
  return result;
end;
$$;

create or replace function public.rp_save_calendar_settings(
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
  if result.user_id is null then raise exception 'Calendar settings revision conflict' using errcode = 'PT409'; end if;
  return result;
end;
$$;


commit;
