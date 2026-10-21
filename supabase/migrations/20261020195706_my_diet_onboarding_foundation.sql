-- Standalone onboarding release, explicitly approved for production on 2026-10-21.
-- Verified against public.user_requirements on 2026-10-20: these eight columns are absent.
-- The live project reports an empty migration history; do not bulk-push unrelated migrations.
-- No data backfill, enrolment, target changes, new tables, triggers or policy changes.
begin;

alter table public.user_requirements
  add column preferred_name text,
  add column monitored_nutrients text[]
    check (monitored_nutrients <@ array['sodium', 'protein', 'potassium', 'phosphate', 'calories', 'carbohydrate', 'fluid']::text[]
      and array_position(monitored_nutrients, null) is null),
  add column dietary_advice text,
  add column food_allergies text[],
  add column disliked_foods text[],
  add column onboarding_version smallint check (onboarding_version >= 1),
  add column onboarding_status text
    check (onboarding_status in ('not_started', 'in_progress', 'skipped', 'completed')),
  add column onboarding_step smallint check (onboarding_step between 1 and 5);

-- Every new column is nullable with the default NULL, including on existing rows.
comment on column public.user_requirements.food_allergies is
  'User-reported allergies: NULL = unanswered, empty array = explicitly none reported. Recording allergies does not verify ingredients, recipe suitability or cross-contamination safety.';
comment on column public.user_requirements.dietary_advice is
  'User-entered record of existing advice; not interpreted as a prescription or converted into targets.';
comment on column public.user_requirements.monitored_nutrients is
  'Independent monitoring choices; NULL = unanswered, empty array = none selected. Uses existing internal nutrient keys; phosphate is displayed as Phosphorus.';
comment on column public.user_requirements.onboarding_status is
  'NULL = no recorded onboarding state; not an enrolment signal. Automatic eligibility requires authenticated account creation at or after an explicit future rollout timestamp.';

commit;
