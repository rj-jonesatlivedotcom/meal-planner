-- READ ONLY. Catalog metadata only; no account or meal-plan contents.
-- Administrator must first verify dashboard project yyxjeukraeibxxloaors (RenalPlan).
-- This query cannot establish the dashboard project identity on its own.
begin read only;

select n.nspname as schema_name, c.relname, c.relrowsecurity, c.relforcerowsecurity
from pg_catalog.pg_class c join pg_catalog.pg_namespace n on n.oid=c.relnamespace
where n.nspname in ('public','renalplan_calendar_private','supabase_migrations')
  and (c.relname in ('user_meal_plans','user_weekly_meal_plans','user_calendar_settings','subscriptions','schema_migrations')
       or c.relname like '%calendar%')
order by 1,2;

select table_schema, table_name, column_name, data_type, is_nullable, column_default
from information_schema.columns
where table_schema in ('public','renalplan_calendar_private')
  and (table_name in ('user_meal_plans','user_weekly_meal_plans','user_calendar_settings','subscriptions') or table_name like '%calendar%')
order by table_schema,table_name,ordinal_position;

select n.nspname as schema_name,c.relname,con.conname,pg_catalog.pg_get_constraintdef(con.oid,true) as definition
from pg_catalog.pg_constraint con
join pg_catalog.pg_class c on c.oid=con.conrelid
join pg_catalog.pg_namespace n on n.oid=c.relnamespace
where n.nspname in ('public','renalplan_calendar_private')
  and (c.relname in ('user_meal_plans','user_weekly_meal_plans','user_calendar_settings','subscriptions') or c.relname like '%calendar%')
order by 1,2,3;

select schemaname,tablename,policyname,roles,cmd,qual,with_check
from pg_catalog.pg_policies
where tablename in ('user_meal_plans','user_weekly_meal_plans','user_calendar_settings','subscriptions') or tablename like '%calendar%'
order by 1,2,3;

select n.nspname as schema_name,p.proname,p.prosecdef,
       pg_catalog.pg_get_userbyid(p.proowner) as owner,p.proconfig,p.proacl,
       pg_catalog.pg_get_functiondef(p.oid) as definition
from pg_catalog.pg_proc p join pg_catalog.pg_namespace n on n.oid=p.pronamespace
where n.nspname in ('public','renalplan_calendar_private') and (p.proname like 'rp_%' or p.proname='set_user_meal_plan_updated_at')
order by 1,2;

select table_schema,table_name,grantee,privilege_type
from information_schema.role_table_grants
where table_schema in ('public','renalplan_calendar_private')
  and (table_name in ('user_meal_plans','user_weekly_meal_plans','user_calendar_settings','subscriptions') or table_name like '%calendar%')
order by 1,2,3,4;

-- If schema_migrations exists above, separately inspect its version/name columns.
-- Do not assume an empty dashboard migration label means objects are absent.
rollback;
