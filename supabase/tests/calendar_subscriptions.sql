-- Disposable Calendar Test/local database only. All synthetic rows roll back.
begin;
insert into auth.users(id) values ('33333333-3333-4333-8333-333333333333'),('44444444-4444-4444-8444-444444444444');
set local role authenticated;
select set_config('request.jwt.claim.sub','33333333-3333-4333-8333-333333333333',true);
do $$ declare s jsonb; r public.user_calendar_settings; f jsonb; begin
  s := public.rp_calendar_subscription('status',null);
  assert s = '{"active":false,"generation":0}'::jsonb, 'Initial status';
  s := public.rp_calendar_subscription('rotate',0,repeat('a',64));
  assert (s->>'active')::boolean and (s->>'generation')::integer=1, 'Token creation';
  assert not s ? 'token_hash', 'Hash disclosure';
  perform public.rp_save_week('2026-10-19',null,'{"Monday":{"Breakfast":"B001"}}','{"Monday":{"Breakfast":2}}',4,'{"checkedItems":["Private item"],"legacy":{}}');
  r := public.rp_save_calendar_preferences(null,'{"timezone":"Europe/London","breakfastTime":"08:00","lunchTime":"13:00","dinnerTime":"18:00","mealEnabled":true,"mealMinutes":15,"preparationEnabled":true,"preparationMinutes":30,"shoppingEnabled":true,"shoppingWeekday":6,"shoppingTime":"10:00"}');
  assert r.revision=1 and r.meal_reminder_minutes=15 and r.shopping_reminder_weekday=6, 'Approved preferences';
  f := public.rp_calendar_feed(repeat('a',64));
  assert jsonb_array_length(f->'weeks')=1 and f->'weeks'->0->'planner'->'Monday'->>'Breakfast'='B001', 'Correct feed plan';
  assert f->>'namespace'=encode(sha256(convert_to('33333333-3333-4333-8333-333333333333','UTF8')),'hex'), 'Stable namespace';
  assert not (f::text like '%Private item%' or f::text like '%household%' or f::text like '%user_id%' or f::text like '%33333333-%'), 'Private data disclosure';
  begin
    perform public.rp_calendar_subscription('rotate',0,repeat('b',64)); raise exception 'Stale token change accepted';
  exception when sqlstate 'PT409' then null; end;
  begin
    perform public.rp_save_calendar_preferences(0,'{"timezone":"Europe/London","breakfastTime":"08:00","lunchTime":"13:00","dinnerTime":"18:00","mealEnabled":true,"mealMinutes":15,"preparationEnabled":true,"preparationMinutes":30,"shoppingEnabled":true,"shoppingWeekday":6,"shoppingTime":"10:00"}'); raise exception 'Stale preferences accepted';
  exception when sqlstate 'PT409' then null; end;
  begin
    perform public.rp_save_calendar_preferences(1,'{}'); raise exception 'Missing settings accepted';
  exception when invalid_parameter_value then null; end;
  s := public.rp_calendar_subscription('rotate',1,repeat('b',64));
  assert public.rp_calendar_feed(repeat('a',64)) is null, 'Old token still active';
  assert public.rp_calendar_feed(repeat('b',64))->>'namespace'=f->>'namespace', 'Rotation changed event identity';
end $$;
select set_config('request.jwt.claim.sub','44444444-4444-4444-8444-444444444444',true);
do $$ declare s jsonb; begin
  s:=public.rp_calendar_subscription('status',null);
  assert s->>'generation'='0', 'Other account status disclosure';
  begin perform public.rp_calendar_subscription('revoke',2); raise exception 'Cross-owner revocation'; exception when sqlstate 'PT409' then null; end;
  assert (select count(*)=0 from public.user_calendar_settings), 'Settings isolation';
end $$;
select set_config('request.jwt.claim.sub','33333333-3333-4333-8333-333333333333',true);
select public.rp_calendar_subscription('revoke',2);
set local role anon;
select set_config('request.jwt.claim.sub','',true);
do $$ begin
  assert public.rp_calendar_feed(repeat('b',64)) is null, 'Revoked feed accessible';
  assert public.rp_calendar_feed('malformed') is null, 'Malformed capability accepted';
  assert not has_table_privilege('anon','renalplan_calendar_private.subscriptions','SELECT'), 'Anonymous table access';
  assert not has_table_privilege('authenticated','renalplan_calendar_private.subscriptions','SELECT'), 'Token hash table access';
  begin perform public.rp_calendar_subscription('rotate',0,repeat('c',64)); raise exception 'Anonymous token management'; exception when insufficient_privilege then null; end;
end $$;
reset role;
rollback;
