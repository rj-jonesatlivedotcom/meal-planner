-- Synthetic checks are rolled back; no notification is sent by SQL.
begin;
set local role service_role;
do $$
declare
  v_key text := encode(extensions.digest(gen_random_uuid()::text, 'sha256'), 'hex');
  v_id uuid;
  v_count integer;
  v_limited boolean := false;
  v_invalid boolean := false;
begin
  for i in 1..3 loop
    v_id := public.submit_feedback('Suggestion', 'Synthetic rollback-only feedback test', 4::smallint, null, null, v_key);
    if v_id is null then raise exception 'Feedback was not stored'; end if;
  end loop;
  begin
    perform public.submit_feedback('Suggestion', 'Fourth synthetic submission', null, null, null, v_key);
  exception when raise_exception then
    v_limited := sqlerrm = 'Feedback limit reached';
  end;
  if not v_limited then raise exception 'Per-visitor rate limit failed'; end if;
  select count(*) into v_count from public.feedback_submissions where message = 'Synthetic rollback-only feedback test';
  if v_count <> 3 then raise exception 'Unexpected stored submission count'; end if;
  begin
    perform public.submit_feedback('Invalid category', 'Synthetic invalid submission', null, null, null,
      encode(extensions.digest(gen_random_uuid()::text, 'sha256'), 'hex'));
  exception when check_violation then v_invalid := true;
  end;
  if not v_invalid then raise exception 'Database input constraints failed'; end if;
end;
$$;
rollback;
select 'Feedback storage, constraints and fourth-submission rate limit passed; synthetic rows rolled back' as verification;
