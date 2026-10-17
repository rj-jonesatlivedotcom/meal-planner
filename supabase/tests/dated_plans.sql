-- Disposable Supabase staging/local database ONLY, after the migration.
-- Run as its administrator. Any error fails the suite; fixtures roll back.
begin;

insert into auth.users(id) values
 ('11111111-1111-4111-8111-111111111111'),
 ('22222222-2222-4222-8222-222222222222');

do $$ begin
  assert public.rp_valid_week_payload('{}','{}'), 'Empty weeks must be valid';
  assert public.rp_valid_week_payload('{"Monday":{"Breakfast":"existing-id"}}','{"Monday":{"Breakfast":1}}'), 'Valid payload rejected';
  assert not public.rp_valid_week_payload('{"Monday":{"Snack":"id"}}','{}'), 'Unknown slots accepted';
  assert not public.rp_valid_week_payload('{}','{"Monday":{"Breakfast":1.5}}'), 'Fractional people accepted';
  assert not public.rp_valid_week_payload('{}','{"Monday":{"Breakfast":9}}'), 'Out of range people accepted';
  assert not public.rp_valid_shopping('{"checkedItems":[0],"legacy":{}}'), 'Non-string checks accepted';
  assert not has_table_privilege('anon','public.user_weekly_meal_plans','SELECT'), 'Anonymous read grant';
  assert not has_table_privilege('authenticated','public.user_weekly_meal_plans','UPDATE'), 'Direct update grant';
  assert not has_table_privilege('authenticated','public.user_weekly_meal_plans','INSERT'), 'Direct insert grant';
  assert not has_table_privilege('authenticated','public.user_weekly_meal_plans','DELETE'), 'Direct delete grant';
  assert not has_table_privilege('authenticated','public.user_weekly_meal_plans','TRUNCATE'), 'Truncate grant';
  assert not has_table_privilege('anon','public.user_calendar_settings','SELECT'), 'Anonymous settings read grant';
end $$;

set local role authenticated;
select set_config('request.jwt.claim.sub','11111111-1111-4111-8111-111111111111',true);
select set_config('request.jwt.claims','{"sub":"11111111-1111-4111-8111-111111111111","role":"authenticated"}',true);

do $$ declare r public.user_weekly_meal_plans; s public.user_calendar_settings; begin
  r := public.rp_save_week('2026-10-19',null,'{"Monday":{"Breakfast":"existing-id"}}',
    '{"Monday":{"Breakfast":1}}',4,'{"checkedItems":["Milk"],"legacy":{"manualRecipes":["extra-id"]}}');
  assert r.revision = 1 and r.household_people = 4, 'Initial save failed';
  assert r.meal_people->'Monday'->>'Breakfast' = '1', 'Override changed';
  begin
    perform public.rp_save_week('2026-10-19',null,'{}','{}',1,'{"checkedItems":[],"legacy":{}}');
    raise exception 'Duplicate creation did not conflict';
  exception when sqlstate 'PT409' then null; end;
  r := public.rp_save_week('2026-10-19',1,r.planner,r.meal_people,4,r.shopping_state);
  assert r.revision = 2, 'Revision did not advance';
  begin
    perform public.rp_save_week('2026-10-19',1,'{}','{}',1,'{"checkedItems":[],"legacy":{}}');
    raise exception 'Stale save succeeded';
  exception when sqlstate 'PT409' then null; end;
  assert (select count(*) = 1 from public.user_weekly_meal_plans), 'Wrong week count';
  assert not exists(select 1 from public.user_weekly_meal_plans where week_start='2026-10-26'), 'Future week copied';
  begin
    perform public.rp_save_week('2026-10-20',null,'{}','{}',1,'{"checkedItems":[],"legacy":{}}');
    raise exception 'Non-Monday accepted';
  exception when check_violation then null; end;
  begin
    perform public.rp_save_week('2026-10-26',null,'{}','{}',9,'{"checkedItems":[],"legacy":{}}');
    raise exception 'Invalid people accepted';
  exception when check_violation then null; end;
  s := public.rp_save_calendar_settings(null,'Europe/London','08:00','13:00','18:00',30,7,'16:00',true,true);
  assert s.revision=1 and s.preparation_reminder_minutes=30, 'Settings save failed';
  begin
    perform public.rp_save_calendar_settings(1,'Not/AZone','08:00','13:00','18:00',30,7,'16:00',true,true);
    raise exception 'Invalid zone accepted';
  exception when invalid_parameter_value then null; end;
  begin
    perform public.rp_save_calendar_settings(0,'Europe/London','08:00','13:00','18:00',30,7,'16:00',true,true);
    raise exception 'Stale settings accepted';
  exception when sqlstate 'PT409' then null; end;
end $$;

-- Second identity cannot read/update the first identity's rows.
select set_config('request.jwt.claim.sub','22222222-2222-4222-8222-222222222222',true);
select set_config('request.jwt.claims','{"sub":"22222222-2222-4222-8222-222222222222","role":"authenticated"}',true);
do $$ declare r public.user_weekly_meal_plans; begin
  assert (select count(*)=0 from public.user_weekly_meal_plans), 'Cross-user plan disclosure';
  assert (select count(*)=0 from public.user_calendar_settings), 'Cross-user settings disclosure';
  begin
    perform public.rp_save_week('2026-10-19',2,'{}','{}',1,'{"checkedItems":[],"legacy":{}}');
    raise exception 'Cross-user update succeeded';
  exception when sqlstate 'PT409' then null; end;
  r := public.rp_save_week('2026-10-19',null,'{}','{}',1,'{"checkedItems":[],"legacy":{}}');
  assert r.user_id='22222222-2222-4222-8222-222222222222'::uuid, 'Wrong RPC owner';
end $$;

-- Authenticated database role without identity still cannot create rows.
select set_config('request.jwt.claim.sub','',true);
select set_config('request.jwt.claims','{}',true);
do $$ begin
  begin
    perform public.rp_save_week('2026-10-19',null,'{}','{}',1,'{"checkedItems":[],"legacy":{}}');
    raise exception 'Missing identity accepted';
  exception when insufficient_privilege then null; end;
end $$;
set local role anon;
do $$ begin
  begin
    perform public.rp_save_week('2026-10-19',null,'{}','{}',1,'{"checkedItems":[],"legacy":{}}');
    raise exception 'Anonymous execution allowed';
  exception when insufficient_privilege then null; end;
end $$;
reset role;
rollback;
