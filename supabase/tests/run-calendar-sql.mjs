// Optional offline test tool, deliberately not an application dependency.
// npm install --prefix tmp/calendar-sql-validation --no-save --package-lock=false @electric-sql/pglite@0.3.14
import fs from 'node:fs/promises';
import { PGlite } from '../../tmp/calendar-sql-validation/node_modules/@electric-sql/pglite/dist/index.js';
const db = new PGlite();
try {
 await db.exec(`create role anon; create role authenticated; create schema auth;
 create table auth.users(id uuid primary key);
 create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;
 grant usage on schema auth to anon, authenticated; grant execute on function auth.uid() to anon,authenticated;`);
 for (const path of ['supabase/migrations/202610170001_dated_plans_foundation.sql','supabase/patches/calendar-conflict-response.sql','supabase/migrations/20261017200848_calendar_subscriptions.sql','supabase/tests/dated_plans.sql','supabase/tests/calendar_subscriptions.sql']) {
  let sql = await fs.readFile(path, 'utf8');
  // The first foundation tests predate the installed PT409 patch.
  if (path.endsWith('/dated_plans.sql')) sql = sql.replaceAll('when serialization_failure', "when sqlstate 'PT409'");
  await db.exec(sql); console.log('PASS ' + path);
 }
 const result=await db.query('select (select count(*) from auth.users) as users,(select count(*) from public.user_weekly_meal_plans) as plans');
 if (result.rows[0].users !== 0 || result.rows[0].plans !== 0) throw Error('Fixture rollback failed');
 console.log('PASS synthetic fixtures rolled back; no network or Supabase connection used');
} finally { await db.close(); }
