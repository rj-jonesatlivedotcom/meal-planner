-- Calendar Test review migration. No legacy-plan changes or production execution.
begin;
create schema if not exists renalplan_calendar_private;
revoke all on schema renalplan_calendar_private from public;
grant usage on schema renalplan_calendar_private to anon, authenticated;

alter table public.user_calendar_settings
  add column meal_reminders_enabled boolean not null default true,
  add column meal_reminder_minutes integer not null default 15 check (meal_reminder_minutes between 0 and 10080);
-- Defaults only: existing saved preferences remain exactly as chosen.
alter table public.user_calendar_settings alter column shopping_reminder_weekday set default 6;
alter table public.user_calendar_settings alter column shopping_reminder_time set default '10:00';

create table renalplan_calendar_private.subscriptions (
  user_id uuid primary key references auth.users(id) on delete cascade,
  token_hash text not null unique check (token_hash ~ '^[a-f0-9]{64}$'),
  active boolean not null default true,
  generation bigint not null default 1 check (generation > 0),
  updated_at timestamptz not null default now()
);
alter table renalplan_calendar_private.subscriptions enable row level security;
alter table renalplan_calendar_private.subscriptions force row level security;
revoke all on renalplan_calendar_private.subscriptions from public, anon, authenticated;

create function renalplan_calendar_private.subscription(p_action text, p_expected_generation bigint, p_token_hash text)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare owner_id uuid := auth.uid(); r renalplan_calendar_private.subscriptions;
begin
  if owner_id is null then raise exception 'Authentication required' using errcode='42501'; end if;
  if p_action = 'status' then
    select * into r from renalplan_calendar_private.subscriptions where user_id=owner_id;
    return jsonb_build_object('active',coalesce(r.active,false),'generation',coalesce(r.generation,0));
  end if;
  if p_action = 'rotate' then
    if p_token_hash is null or p_token_hash !~ '^[a-f0-9]{64}$' then raise exception 'Invalid token hash' using errcode='22023'; end if;
    if p_expected_generation = 0 then
      insert into renalplan_calendar_private.subscriptions(user_id,token_hash)
      values(owner_id,p_token_hash) on conflict(user_id) do nothing returning * into r;
    else
      update renalplan_calendar_private.subscriptions set token_hash=p_token_hash,active=true,generation=generation+1,updated_at=clock_timestamp()
      where user_id=owner_id and generation=p_expected_generation returning * into r;
    end if;
  elsif p_action = 'revoke' then
    update renalplan_calendar_private.subscriptions set active=false,generation=generation+1,updated_at=clock_timestamp()
    where user_id=owner_id and generation=p_expected_generation returning * into r;
  else raise exception 'Invalid subscription action' using errcode='22023'; end if;
  if r.user_id is null then raise exception 'Subscription changed; refresh before retrying' using errcode='PT409'; end if;
  return jsonb_build_object('active',r.active,'generation',r.generation);
end $$;

create function public.rp_calendar_subscription(p_action text, p_expected_generation bigint, p_token_hash text default null)
returns jsonb language sql security invoker set search_path = '' as $$
  select renalplan_calendar_private.subscription(p_action,p_expected_generation,p_token_hash);
$$;

create function renalplan_calendar_private.save_preferences(p_expected_revision bigint, p_preferences jsonb)
returns public.user_calendar_settings language plpgsql security definer set search_path = '' as $$
declare owner_id uuid := auth.uid(); r public.user_calendar_settings; k text;
begin
  if owner_id is null then raise exception 'Authentication required' using errcode='42501'; end if;
  if p_preferences is null or jsonb_typeof(p_preferences)<>'object' then
    raise exception 'Invalid calendar preferences' using errcode='22023'; end if;
  if (select count(*) from jsonb_object_keys(p_preferences))<>11 then raise exception 'Invalid calendar preference fields' using errcode='22023'; end if;
  for k in select jsonb_object_keys(p_preferences) loop
    if k <> all(array['timezone','breakfastTime','lunchTime','dinnerTime','mealEnabled','mealMinutes','preparationEnabled','preparationMinutes','shoppingEnabled','shoppingWeekday','shoppingTime']) then
      raise exception 'Unknown calendar preference' using errcode='22023'; end if;
  end loop;
  -- Eleven fields; strict presence and types prevent JSON null coercion.
  for k in select unnest(array['timezone','breakfastTime','lunchTime','dinnerTime','shoppingTime']) loop
    if jsonb_typeof(p_preferences->k) is distinct from 'string' then raise exception 'Invalid time field' using errcode='22023'; end if;
    if k<>'timezone' and (p_preferences->>k) !~ '^([01][0-9]|2[0-3]):[0-5][0-9]$' then raise exception 'Invalid time' using errcode='22023'; end if;
  end loop;
  for k in select unnest(array['mealEnabled','preparationEnabled','shoppingEnabled']) loop
    if jsonb_typeof(p_preferences->k) is distinct from 'boolean' then raise exception 'Invalid reminder switch' using errcode='22023'; end if;
  end loop;
  for k in select unnest(array['mealMinutes','preparationMinutes','shoppingWeekday']) loop
    if jsonb_typeof(p_preferences->k) is distinct from 'number' or (p_preferences->>k)::numeric <> trunc((p_preferences->>k)::numeric) then
      raise exception 'Invalid reminder number' using errcode='22023'; end if;
  end loop;
  if p_expected_revision is null then
    insert into public.user_calendar_settings(user_id,timezone,breakfast_time,lunch_time,dinner_time,
      meal_reminders_enabled,meal_reminder_minutes,preparation_reminders_enabled,preparation_reminder_minutes,
      shopping_reminders_enabled,shopping_reminder_weekday,shopping_reminder_time)
    values(owner_id,p_preferences->>'timezone',(p_preferences->>'breakfastTime')::time,(p_preferences->>'lunchTime')::time,(p_preferences->>'dinnerTime')::time,
      (p_preferences->>'mealEnabled')::boolean,(p_preferences->>'mealMinutes')::integer,(p_preferences->>'preparationEnabled')::boolean,(p_preferences->>'preparationMinutes')::integer,
      (p_preferences->>'shoppingEnabled')::boolean,(p_preferences->>'shoppingWeekday')::integer,(p_preferences->>'shoppingTime')::time)
    on conflict(user_id) do nothing returning * into r;
  else
    update public.user_calendar_settings set timezone=p_preferences->>'timezone',breakfast_time=(p_preferences->>'breakfastTime')::time,
      lunch_time=(p_preferences->>'lunchTime')::time,dinner_time=(p_preferences->>'dinnerTime')::time,
      meal_reminders_enabled=(p_preferences->>'mealEnabled')::boolean,meal_reminder_minutes=(p_preferences->>'mealMinutes')::integer,
      preparation_reminders_enabled=(p_preferences->>'preparationEnabled')::boolean,preparation_reminder_minutes=(p_preferences->>'preparationMinutes')::integer,
      shopping_reminders_enabled=(p_preferences->>'shoppingEnabled')::boolean,shopping_reminder_weekday=(p_preferences->>'shoppingWeekday')::integer,
      shopping_reminder_time=(p_preferences->>'shoppingTime')::time,revision=revision+1,updated_at=clock_timestamp()
    where user_id=owner_id and revision=p_expected_revision returning * into r;
  end if;
  if r.user_id is null then raise exception 'Calendar preferences changed; refresh before retrying' using errcode='PT409'; end if;
  return r;
end $$;
create function public.rp_save_calendar_preferences(p_expected_revision bigint,p_preferences jsonb)
returns public.user_calendar_settings language sql security invoker set search_path = '' as $$
  select renalplan_calendar_private.save_preferences(p_expected_revision,p_preferences);
$$;

-- Bearer capability lookup deliberately returns only calendar projections.
-- No user UUID, dietary requirements, shopping items, people or nutrient figures.
create function renalplan_calendar_private.feed(p_token_hash text)
returns jsonb language plpgsql stable security definer set search_path = '' as $$
declare owner_id uuid; result jsonb;
begin
  if p_token_hash is null or p_token_hash !~ '^[a-f0-9]{64}$' then return null; end if;
  select user_id into owner_id from renalplan_calendar_private.subscriptions where token_hash=p_token_hash and active;
  if owner_id is null then return null; end if;
  select jsonb_build_object(
    'namespace',encode(sha256(convert_to(owner_id::text,'UTF8')),'hex'),
    'weeks',coalesce((select jsonb_agg(jsonb_build_object('weekStart',week_start,'planner',planner,'revision',revision,'updatedAt',updated_at) order by week_start)
       from public.user_weekly_meal_plans where user_id=owner_id),'[]'::jsonb),
    'settings',(select jsonb_build_object('timezone',timezone,'breakfast_time',breakfast_time,'lunch_time',lunch_time,'dinner_time',dinner_time,
      'meal_reminders_enabled',meal_reminders_enabled,'meal_reminder_minutes',meal_reminder_minutes,
      'preparation_reminders_enabled',preparation_reminders_enabled,'preparation_reminder_minutes',preparation_reminder_minutes,
      'shopping_reminders_enabled',shopping_reminders_enabled,'shopping_reminder_weekday',shopping_reminder_weekday,
      'shopping_reminder_time',shopping_reminder_time,'revision',revision,'updated_at',updated_at)
      from public.user_calendar_settings where user_id=owner_id)
  ) into result;
  return result;
end $$;
create function public.rp_calendar_feed(p_token_hash text)
returns jsonb language sql stable security invoker set search_path = '' as $$
  select renalplan_calendar_private.feed(p_token_hash);
$$;

revoke all on all functions in schema renalplan_calendar_private from public,anon,authenticated;
revoke all on function public.rp_calendar_subscription(text,bigint,text), public.rp_save_calendar_preferences(bigint,jsonb),public.rp_calendar_feed(text) from public,anon,authenticated;
grant execute on function renalplan_calendar_private.subscription(text,bigint,text),renalplan_calendar_private.save_preferences(bigint,jsonb),
  public.rp_calendar_subscription(text,bigint,text),public.rp_save_calendar_preferences(bigint,jsonb) to authenticated;
grant execute on function renalplan_calendar_private.feed(text),public.rp_calendar_feed(text) to anon,authenticated;
commit;
