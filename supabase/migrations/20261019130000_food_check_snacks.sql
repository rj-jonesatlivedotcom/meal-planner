-- Staging only: do not apply to production without a separate release decision.
begin;
create table public.user_food_products (
  user_id uuid not null references auth.users(id) on delete cascade,
  barcode text not null check (barcode ~ '^[0-9]{8,14}$'),
  name text not null check (length(name) between 1 and 240),
  favourite boolean not null default false,
  last_scanned_at timestamptz,
  primary key (user_id, barcode)
);
create table public.planner_snacks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  planned_on date not null,
  barcode text not null check (barcode ~ '^[0-9]{8,14}$'),
  name text not null check (length(name) between 1 and 240),
  quantity numeric not null check (quantity > 0 and quantity <= 100000),
  snapshot jsonb not null,
  created_at timestamptz not null default now()
);
create index planner_snacks_owner_date on public.planner_snacks(user_id, planned_on);

create function public.rp_valid_snack_snapshot(s jsonb) returns boolean
language plpgsql immutable set search_path = '' as $$
declare section text; nutrient text; n jsonb;
begin
  if s is null or jsonb_typeof(s) <> 'object' or octet_length(s::text) > 20000
     or s->>'version' is distinct from '1' or coalesce(s->>'unit','') not in ('g','ml')
     or coalesce(s->>'basis','') not in ('as-sold','dry','prepared')
     or jsonb_typeof(s->'source') is distinct from 'string' then return false; end if;
  foreach section in array array['reference','nutrients'] loop
    if jsonb_typeof(s->section) is distinct from 'object' then return false; end if;
    foreach nutrient in array array['calories','protein','carbohydrates','fat','fibre','sodium','potassium','phosphate'] loop
      n := s->section->nutrient;
      if n is null or jsonb_typeof(n) <> 'object' then return false; end if;
      if n->>'kind' = 'unavailable' then
        if n->'value' is distinct from 'null'::jsonb then return false; end if;
      elsif coalesce(n->>'kind','') in ('reported','estimated') then
        if jsonb_typeof(n->'value') is distinct from 'number' then return false; end if;
        if (n->>'value')::numeric < 0 then return false; end if;
      else return false;
      end if;
    end loop;
  end loop;
  return true;
end; $$;
alter table public.planner_snacks add constraint planner_snacks_valid_snapshot check (public.rp_valid_snack_snapshot(snapshot));

alter table public.user_food_products enable row level security;
alter table public.planner_snacks enable row level security;
-- Remove inherited default table grants too: TRUNCATE bypasses row-level security.
revoke all on public.user_food_products, public.planner_snacks from public, anon, authenticated;
grant select, insert, update, delete on public.user_food_products, public.planner_snacks to authenticated;
create policy food_products_owner on public.user_food_products for all to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy planner_snacks_owner on public.planner_snacks for all to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

-- One atomic identity/preferences operation. No nutritional data is kept in My Foods.
create function public.rp_food_library(p_action text, p_barcode text default '', p_name text default '', p_favourite boolean default null)
returns void language plpgsql security invoker set search_path = '' as $$
declare owner_id uuid := auth.uid();
begin
  if owner_id is null then raise exception 'Sign in required' using errcode = '42501'; end if;
  -- Serialise this owner's library updates, without exposing another owner's data.
  perform pg_advisory_xact_lock(hashtextextended(owner_id::text, 0));
  if p_action = 'scan' then
    insert into public.user_food_products(user_id,barcode,name,last_scanned_at)
      values(owner_id,p_barcode,p_name,clock_timestamp())
      on conflict(user_id,barcode) do update set name=excluded.name,last_scanned_at=excluded.last_scanned_at;
  elsif p_action = 'favourite' and p_favourite is not null then
    update public.user_food_products set favourite=p_favourite where user_id=owner_id and barcode=p_barcode;
  elsif p_action = 'remove' then
    delete from public.user_food_products where user_id=owner_id and barcode=p_barcode;
  elsif p_action = 'clear' then
    update public.user_food_products set last_scanned_at=null where user_id=owner_id;
  else raise exception 'Invalid food action';
  end if;
  update public.user_food_products set last_scanned_at=null where user_id=owner_id and barcode in (
    select barcode from public.user_food_products where user_id=owner_id and last_scanned_at is not null
    order by last_scanned_at desc,barcode offset 30
  );
  delete from public.user_food_products where user_id=owner_id and not favourite and last_scanned_at is null;
end; $$;
revoke all on function public.rp_food_library(text,text,text,boolean) from public, anon;
grant execute on function public.rp_food_library(text,text,text,boolean) to authenticated;
revoke all on function public.rp_valid_snack_snapshot(jsonb) from public, anon;
grant execute on function public.rp_valid_snack_snapshot(jsonb) to authenticated;
commit;
