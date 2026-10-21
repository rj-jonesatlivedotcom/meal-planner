-- One-column additive change explicitly approved for production on 2026-10-21.
-- Extend the existing My Diet row; do not change records, targets or RLS.
begin;
alter table public.user_requirements
  add column if not exists nutrient_target_settings jsonb default null
  check (nutrient_target_settings is null or jsonb_typeof(nutrient_target_settings) = 'object');
comment on column public.user_requirements.nutrient_target_settings is
  'Optional explicit target enabled/declined choices by monitored nutrient, plus energyMinKcal and energyMaxKcal. NULL preserves legacy saved target behaviour. Existing numerical targets remain in their original columns.';
notify pgrst, 'reload schema';
commit;
