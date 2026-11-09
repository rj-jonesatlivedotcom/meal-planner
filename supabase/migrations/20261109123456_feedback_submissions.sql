-- Only the server's service role can store or read feedback. No public policies.
create table public.feedback_submissions (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('Suggestion', 'Report a Problem', 'General Feedback')),
  message text not null check (char_length(btrim(message)) between 1 and 5000),
  rating smallint check (rating between 1 and 5),
  email text check (email is null or (char_length(email) <= 254 and email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$')),
  user_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  notification_status text not null default 'pending' check (notification_status in ('pending', 'sent', 'failed')),
  notification_id text
);
alter table public.feedback_submissions enable row level security;
revoke all on table public.feedback_submissions from public, anon, authenticated;
grant select, insert, update on table public.feedback_submissions to service_role;
create index feedback_submissions_user_id_idx on public.feedback_submissions(user_id) where user_id is not null;

-- Short-lived opaque counters; no IP addresses, email addresses or feedback text.
create table public.feedback_rate_limits (
  bucket text primary key,
  attempts integer not null check (attempts > 0),
  expires_at timestamptz not null
);
alter table public.feedback_rate_limits enable row level security;
revoke all on table public.feedback_rate_limits from public, anon, authenticated;
grant select, insert, update, delete on table public.feedback_rate_limits to service_role;
create index feedback_rate_limits_expiry_idx on public.feedback_rate_limits(expires_at);

-- Atomic across server instances, including the limit check and feedback insert.
create function public.submit_feedback(p_category text, p_message text, p_rating smallint,
  p_email text, p_user_id uuid, p_rate_key text) returns uuid
language plpgsql security invoker set search_path = '' as $$
declare
  v_id uuid;
  v_now timestamptz := clock_timestamp();
  v_period bigint;
  v_key text;
  v_count integer;
  v_seconds integer;
  v_limit integer;
begin
  if p_rate_key is null or p_rate_key !~ '^[a-f0-9]{64}$' then
    raise exception 'Invalid feedback rate key' using errcode = '22023';
  end if;
  -- Global minute/hour caps also bound bots that discard their guest cookie.
  -- Same lock order for every call; exceptions roll back counters and insertion.
  perform pg_catalog.pg_advisory_xact_lock(71940521);
  delete from public.feedback_rate_limits where expires_at <= v_now;
  for v_seconds, v_limit in values (60, 10), (3600, 60), (900, 3) loop
    v_period := floor(extract(epoch from v_now) / v_seconds);
    v_key := case when v_seconds = 900 then p_rate_key else 'global' end || ':' || v_seconds || ':' || v_period;
    insert into public.feedback_rate_limits(bucket, attempts, expires_at)
      values (v_key, 1, to_timestamp((v_period + 1) * v_seconds))
      on conflict (bucket) do update set attempts = public.feedback_rate_limits.attempts + 1
      returning attempts into v_count;
    if v_count > v_limit then
      raise exception 'Feedback limit reached' using errcode = 'P0001';
    end if;
  end loop;
  insert into public.feedback_submissions(category, message, rating, email, user_id)
    values (p_category, p_message, p_rating, p_email, p_user_id) returning id into v_id;
  return v_id;
end;
$$;
revoke all on function public.submit_feedback(text,text,smallint,text,uuid,text) from public, anon, authenticated;
grant execute on function public.submit_feedback(text,text,smallint,text,uuid,text) to service_role;
