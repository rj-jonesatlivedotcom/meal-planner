-- Calendar Test only: targeted update/conflict check; synthetic fixtures roll back.
begin;
insert into auth.users(id) values ('55555555-5555-4555-8555-555555555555');
set local role authenticated;
select set_config('request.jwt.claim.sub','55555555-5555-4555-8555-555555555555',true);
do $$ declare r public.user_weekly_meal_plans; before_feed jsonb; after_feed jsonb; begin
  perform public.rp_calendar_subscription('rotate',0,repeat('d',64));
  r:=public.rp_save_week('2026-10-19',null,'{"Monday":{"Breakfast":"apple-honey-porridge"}}','{}',1,'{"checkedItems":[],"legacy":{}}');
  before_feed:=public.rp_calendar_feed(repeat('d',64));
  assert before_feed->'weeks'->0->'planner'->'Monday'->>'Breakfast'='apple-honey-porridge', 'Initial feed meal missing';
  r:=public.rp_save_week('2026-10-19',1,'{"Monday":{"Breakfast":"scrambled-egg-tomato-toast"}}','{}',1,'{"checkedItems":[],"legacy":{}}');
  after_feed:=public.rp_calendar_feed(repeat('d',64));
  assert after_feed->'weeks'->0->'planner'->'Monday'->>'Breakfast'='scrambled-egg-tomato-toast', 'Feed did not reflect update';
  assert (after_feed->'weeks'->0->>'revision')::integer=2, 'Feed revision did not advance';
  assert after_feed->>'namespace'=before_feed->>'namespace', 'Update changed stable namespace';
  begin
    perform public.rp_save_week('2026-10-19',1,'{}','{}',1,'{"checkedItems":[],"legacy":{}}');
    raise exception 'Stale plan write succeeded';
  exception when sqlstate 'PT409' then null; end;
  perform public.rp_save_calendar_preferences(null,'{"timezone":"Europe/London","breakfastTime":"08:30","lunchTime":"13:00","dinnerTime":"18:00","mealEnabled":true,"mealMinutes":15,"preparationEnabled":false,"preparationMinutes":30,"shoppingEnabled":false,"shoppingWeekday":6,"shoppingTime":"10:00"}');
  after_feed:=public.rp_calendar_feed(repeat('d',64));
  assert after_feed->'settings'->>'breakfast_time'='08:30:00', 'Configured time absent from feed';
  assert after_feed->'settings'->>'preparation_reminders_enabled'='false', 'Preparation toggle absent';
  assert after_feed->'settings'->>'shopping_reminders_enabled'='false', 'Shopping toggle absent';
  r:=public.rp_save_week('2026-10-19',2,'{}','{}',1,'{"checkedItems":[],"legacy":{}}');
  after_feed:=public.rp_calendar_feed(repeat('d',64));
  assert after_feed->'weeks'->0->'planner'='{}'::jsonb, 'Cleared plan retained meals';
  assert (after_feed->'weeks'->0->>'revision')::integer=3, 'Clear revision did not advance';
end $$;
reset role;
rollback;
select 'Feed updates, reminder preferences, Clear Week and PT409 checked; fixtures rolled back' as result;
