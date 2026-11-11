import { createServer } from 'node:http';

// A deliberately small HTTP fixture, not a database/RLS test. Each synthetic
// account owns independent in-memory rows; unexpected endpoints fail closed.
const accounts = new Map();
createServer(async (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3100');
  response.setHeader('Access-Control-Allow-Headers', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,OPTIONS');
  response.setHeader('Content-Type', 'application/json');
  if (request.method === 'OPTIONS') { response.end(); return; }
  const url = new URL(request.url, 'http://127.0.0.1:54329');
  if (url.pathname === '/health') { response.end('{}'); return; }
  let claims;
  try { claims = JSON.parse(Buffer.from(request.headers.authorization.split(' ')[1].split('.')[1], 'base64url')); } catch { /* no session */ }
  const id = claims?.sub;
  if (!id?.startsWith('e2e-')) { response.writeHead(401); response.end('{"message":"Synthetic session required"}'); return; }
  if (!accounts.has(id)) accounts.set(id, {});
  const account = accounts.get(id);
  if (url.pathname === '/auth/v1/user') {
    response.end(JSON.stringify({ id, aud: 'authenticated', role: 'authenticated', email: `${id}@example.invalid`, app_metadata: { provider: 'email' }, user_metadata: { renalplan_theme: claims.theme }, created_at: '2026-01-01T00:00:00Z' }));
    return;
  }
  const table = url.pathname.replace('/rest/v1/', '');
  if (!['user_requirements', 'user_meal_plans', 'user_fluid_entries', 'user_favourites', 'user_food_products', 'planner_snacks'].includes(table)) {
    response.writeHead(404); response.end(JSON.stringify({ message: `Unexpected fixture endpoint ${url.pathname}` })); return;
  }
  if (request.method === 'GET') {
    const row = account[table] ?? null;
    response.end(JSON.stringify(request.headers.accept?.includes('application/vnd.pgrst.object') ? row : row ? [row] : []));
    return;
  }
  if (request.method === 'POST' || request.method === 'PATCH') {
    let body = ''; for await (const chunk of request) body += chunk;
    const row = JSON.parse(body);
    if (row.user_id !== id) { response.writeHead(403); response.end('{}'); return; }
    account[table] = { ...account[table], ...row };
    response.writeHead(201); response.end(); return;
  }
  response.writeHead(405); response.end('{}');
}).listen(54329, '127.0.0.1');
