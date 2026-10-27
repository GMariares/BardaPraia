import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { getAppHTML } from './html'

type Bindings = {
  SB_URL?: string
  SB_KEY?: string
  VAPID_PUBLIC?: string
  VAPID_PRIVATE?: string
  VAPID_SUBJECT?: string
  SB_SERVICE_KEY?: string      // secret: Supabase service_role key (server-side user management, locked tables)
  AUTH_EMAIL_DOMAIN?: string   // logins are Supabase Auth users named <username>@<domain>
}

const app = new Hono<{ Bindings: Bindings }>()

// Set at build time (vite.config.ts); changes with every deploy
declare const __BUILD_ID__: string
const BUILD_ID = typeof __BUILD_ID__ !== 'undefined' ? __BUILD_ID__ : 'dev'

app.use('*', cors())

// ── Configuration ─────────────────────────────────────────────
// Public values have built-in defaults so the app runs with zero config.
// VAPID_PRIVATE is a secret and MUST be set in the hosting environment
// (Cloudflare Pages → Settings → Variables and Secrets; locally in .dev.vars).
// The key pair was replaced on 2026-09-26 (the old private key is in the public git history).
// Devices re-subscribe on their own the next time the app opens (ensurePushCurrent in html.ts).
const DEFAULTS = {
  SB_URL: 'https://eurcdnyhwqofnddhxrpf.supabase.co',
  SB_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1cmNkbnlod3FvZm5kZGh4cnBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3ODIyNDMsImV4cCI6MjA5MDM1ODI0M30.sqap9onVY3z8AJO9bATT8jXShOxe7h6g0uXWTUN4kK0',
  VAPID_PUBLIC: 'BDVeMOFPNtTQON09egtcQXQh7E8XRSxw9nmyKo1J0izoiwEdoAqetfR70Cwq57I2MkHTjcCWbqttL07OjfEDmjI',
  VAPID_SUBJECT: 'mailto:admin@bardapraia.com'
}
function getConfig(env: Bindings | undefined) {
  const e = env || {}
  return {
    SB_URL: e.SB_URL || DEFAULTS.SB_URL,
    SB_KEY: e.SB_KEY || DEFAULTS.SB_KEY,
    VAPID_PUBLIC: e.VAPID_PUBLIC || DEFAULTS.VAPID_PUBLIC,
    VAPID_PRIVATE: e.VAPID_PRIVATE || '',
    VAPID_SUBJECT: e.VAPID_SUBJECT || DEFAULTS.VAPID_SUBJECT,
    SB_SERVICE_KEY: e.SB_SERVICE_KEY || '',
    EMAIL_DOMAIN: e.AUTH_EMAIL_DOMAIN || 'staff.bardapraia.org'
  }
}
type Cfg = ReturnType<typeof getConfig>

// ── Secure login (Supabase Auth) ──────────────────────────────
// Every staff login is a Supabase Auth user <username>@<EMAIL_DOMAIN>; its app_metadata carries
// { app_user_id, username, roles } so database policies and this server can check roles.
// "Secure mode" is on once the service key is set and the users have been moved to Supabase Auth.
function svcHeaders(key: string): Record<string, string> {
  // new-style secret keys go in apikey only; legacy service_role JWTs also as Bearer
  return key.startsWith('sb_secret_') ? { apikey: key } : { apikey: key, Authorization: `Bearer ${key}` }
}
function dbHeaders(cfg: Cfg): Record<string, string> {
  return cfg.SB_SERVICE_KEY ? svcHeaders(cfg.SB_SERVICE_KEY) : { apikey: cfg.SB_KEY, Authorization: `Bearer ${cfg.SB_KEY}` }
}
function emailFor(cfg: Cfg, username: string) { return String(username || '').trim().toLowerCase() + '@' + cfg.EMAIL_DOMAIN }
function b64utf8(s: string) { let bin = ''; new TextEncoder().encode(s).forEach(b => bin += String.fromCharCode(b)); return btoa(bin) }
function unb64utf8(s: string) { try { const bin = atob(s || ''); return new TextDecoder().decode(Uint8Array.from(bin, ch => ch.charCodeAt(0))) } catch { return '' } }
async function listAuthUsers(cfg: Cfg): Promise<any[]> {
  const out: any[] = []
  for (let page = 1; page < 20; page++) {
    const r = await fetch(`${cfg.SB_URL}/auth/v1/admin/users?page=${page}&per_page=200`, { headers: svcHeaders(cfg.SB_SERVICE_KEY) })
    if (!r.ok) throw new Error('auth admin ' + r.status + ' ' + (await r.text()).slice(0, 200))
    const j: any = await r.json(); const users = j.users || []
    out.push(...users); if (users.length < 200) break
  }
  return out
}
let secureCache = { at: 0, on: false, admin: '' }
async function secureMode(cfg: Cfg): Promise<boolean> {
  if (!cfg.SB_SERVICE_KEY) return false
  if (Date.now() - secureCache.at < 60000) return secureCache.on
  try {
    const r = await fetch(`${cfg.SB_URL}/auth/v1/admin/users?page=1&per_page=1`, { headers: svcHeaders(cfg.SB_SERVICE_KEY) })
    const j: any = r.ok ? await r.json() : { users: [] }
    secureCache = { at: Date.now(), on: (j.users || []).length > 0, admin: r.ok ? 'ok' : 'error ' + r.status + ': ' + JSON.stringify(j).slice(0, 120) }
    if (!r.ok) secureCache.admin = 'error ' + r.status + ': ' + (await r.text().catch(() => '')).slice(0, 120)
  } catch (e: any) { secureCache = { at: Date.now(), on: false, admin: 'error: ' + e.message } }
  return secureCache.on
}
// The caller's staff identity from their Supabase session, or null
async function staffFromToken(c: any, cfg: Cfg): Promise<{ appUserId: string, username: string, roles: string[] } | null> {
  const h = c.req.header('Authorization') || ''
  const token = h.startsWith('Bearer ') ? h.slice(7) : ''
  if (!token || token === cfg.SB_KEY) return null
  const r = await fetch(`${cfg.SB_URL}/auth/v1/user`, { headers: { apikey: cfg.SB_KEY, Authorization: `Bearer ${token}` } })
  if (!r.ok) return null
  const u: any = await r.json(), m = u.app_metadata || {}
  if (!m.app_user_id) return null
  return { appUserId: m.app_user_id, username: m.username || '', roles: Array.isArray(m.roles) ? m.roles : [] }
}
function authMeta(row: any) { return { app_user_id: row.id, username: row.username, roles: Array.isArray(row.roles) ? row.roles : [] } }
async function upsertAuthUser(cfg: Cfg, existing: any, row: any, password: string | null, oldUsername?: string) {
  const body: any = { app_metadata: authMeta(row), ban_duration: row.active === false ? '876000h' : 'none' }
  if (password) body.password = password
  if (existing) {
    if (oldUsername && oldUsername.toLowerCase() !== row.username.toLowerCase()) { body.email = emailFor(cfg, row.username); body.email_confirm = true }
    const r = await fetch(`${cfg.SB_URL}/auth/v1/admin/users/${existing.id}`, { method: 'PUT', headers: { ...svcHeaders(cfg.SB_SERVICE_KEY), 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    if (!r.ok) throw new Error((await r.text()).slice(0, 200))
    return 'updated'
  }
  if (!password) throw new Error('a password is needed to create the login')
  body.email = emailFor(cfg, row.username); body.email_confirm = true
  const r = await fetch(`${cfg.SB_URL}/auth/v1/admin/users`, { method: 'POST', headers: { ...svcHeaders(cfg.SB_SERVICE_KEY), 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
  if (!r.ok) throw new Error((await r.text()).slice(0, 200))
  return 'created'
}
const USER_COLS = 'id,name,username,roles,contract_start,contract_end,hours,amount,discount,insurance,cloth_size,notes,active,employee,employee_no,created_at'
// Until the payslips migration has run, app_users has no employee_no: read and save without it
const USER_COLS_OLD = USER_COLS.replace(',employee_no', '')
const noEmployeeNo = (t: string) => /employee_no/.test(t)

// ── Favicon ───────────────────────────────────────────────────
app.get('/favicon.ico', (c) => c.redirect('/brand/favicon-32.png', 301))

// ── Service Worker ────────────────────────────────────────────
// public/sw.js is served as a static asset at /sw.js (assets are matched before this app runs),
// so that file is the only service worker. Edit it there.

// ── SPA ───────────────────────────────────────────────────────
app.get('/', (c) => {
  const { SB_URL, SB_KEY } = getConfig(c.env)
  // never reuse a stored copy of the page: a home-screen app must pick up new versions
  c.header('Cache-Control', 'no-cache')
  return c.html(getAppHTML({ sbUrl: SB_URL, sbKey: SB_KEY, build: BUILD_ID }))
})

// ── Current build (the page reloads itself when this differs from its own) ──
app.get('/api/version', (c) => {
  c.header('Cache-Control', 'no-store')
  return c.json({ build: BUILD_ID })
})

// ── Secure login: status, one-off move to Supabase Auth, user management ──
app.get('/api/auth/status', async (c) => {
  const cfg = getConfig(c.env)
  c.header('Cache-Control', 'no-store')
  const secure = await secureMode(cfg)
  // authAdmin: whether the key may manage logins ('ok'), or the error Supabase gave
  return c.json({ serviceKey: !!cfg.SB_SERVICE_KEY, secure, emailDomain: cfg.EMAIL_DOMAIN, authAdmin: cfg.SB_SERVICE_KEY ? secureCache.admin : '' })
})

// Create a Supabase Auth login for every staff account, keeping each person's current password.
// Allowed for an admin, proven by their username + password (before secure login exists) or their session.
app.post('/api/auth/migrate', async (c) => {
  const cfg = getConfig(c.env)
  if (!cfg.SB_SERVICE_KEY) return c.json({ error: 'The SB_SERVICE_KEY secret is not set in Cloudflare yet' }, 400)
  const db = { headers: svcHeaders(cfg.SB_SERVICE_KEY) }
  const rows: any[] = await (await fetch(`${cfg.SB_URL}/rest/v1/app_users?select=*`, db)).json()
  if (!Array.isArray(rows)) return c.json({ error: 'Could not read the users' }, 500)
  let admin = await staffFromToken(c, cfg)
  if (!admin) {
    const { username, password } = await c.req.json().catch(() => ({} as any))
    const me = rows.find(r => String(r.username).toLowerCase() === String(username || '').toLowerCase())
    if (me && me.active !== false && me.password_hash && me.password_hash === b64utf8(String(password || ''))) admin = { appUserId: me.id, username: me.username, roles: me.roles || [] }
  }
  if (!admin || admin.roles.indexOf('admin') === -1) return c.json({ error: 'Only an admin can do this (check your password)' }, 403)
  let existing: any[]
  try { existing = await listAuthUsers(cfg) } catch (e: any) { return c.json({ error: 'Supabase refused to manage logins with this key: ' + e.message }, 502) }
  const result: any = { created: [], updated: [], failed: [] }
  for (const row of rows) {
    const email = emailFor(cfg, row.username)
    const ex = existing.find(u => (u.email || '').toLowerCase() === email)
    const pw = unb64utf8(row.password_hash || '')
    try {
      if (!ex && (!pw || pw.length < 6)) throw new Error('password shorter than 6 characters: set a new one in Users')
      if (!ex && pw === 'Admin1234') throw new Error('still the default password: set a new one in Users')
      result[await upsertAuthUser(cfg, ex, row, ex ? null : pw)].push(row.username)
    } catch (e: any) { result.failed.push({ username: row.username, reason: e.message }) }
  }
  secureCache = { at: 0, on: false }
  return c.json(result)
})

async function requireAdmin(c: any, cfg: Cfg) {
  if (!cfg.SB_SERVICE_KEY) return { error: c.json({ error: 'The SB_SERVICE_KEY secret is not set in Cloudflare yet' }, 400) }
  const me = await staffFromToken(c, cfg)
  if (!me || me.roles.indexOf('admin') === -1) return { error: c.json({ error: 'Admins only' }, 403) }
  return { me }
}
// All users with pay and contract details (admins only)
app.get('/api/users', async (c) => {
  const cfg = getConfig(c.env); const a = await requireAdmin(c, cfg); if (a.error) return a.error
  const read = (cols: string) => fetch(`${cfg.SB_URL}/rest/v1/app_users?select=${cols}&order=name.asc`, { headers: svcHeaders(cfg.SB_SERVICE_KEY) })
  let r = await read(USER_COLS)
  if (!r.ok) { const t = await r.text(); if (!noEmployeeNo(t)) return c.json({ error: t.slice(0, 200) }, 500); r = await read(USER_COLS_OLD) }
  return c.json(await r.json(), r.ok ? 200 : 500)
})
// Which people have a device registered for notifications (admins only). Since the lock-down the
// app may not read push_subscriptions itself, so the Users screen asks the server.
app.get('/api/push/devices', async (c) => {
  const cfg = getConfig(c.env); const a = await requireAdmin(c, cfg); if (a.error) return a.error
  const r = await fetch(`${cfg.SB_URL}/rest/v1/push_subscriptions?select=user_id,endpoint,updated_at`, { headers: svcHeaders(cfg.SB_SERVICE_KEY) })
  return c.json(await r.json(), r.ok ? 200 : 500)
})
// Create or update a user: the app_users row and the matching Supabase Auth login
app.post('/api/users/save', async (c) => {
  const cfg = getConfig(c.env); const a = await requireAdmin(c, cfg); if (a.error) return a.error
  const { user, password, oldUsername } = await c.req.json()
  if (!user || !user.id || !user.username || !user.name) return c.json({ error: 'Missing name or username' }, 400)
  if (password && String(password).length < 6) return c.json({ error: 'Password must be at least 6 characters' }, 400)
  const row: any = {}
  USER_COLS.split(',').forEach(k => { if (user[k] !== undefined) row[k] = user[k] })
  row.username = String(user.username).trim().toLowerCase()
  if (password) row.password_hash = ''                  // the old encoded password is no longer used
  // Update an existing user in place; an upsert would be refused because Postgres checks the
  // required password_hash column before it notices the row already exists.
  const H = { ...svcHeaders(cfg.SB_SERVICE_KEY), 'Content-Type': 'application/json', Prefer: 'return=representation' }
  const found: any[] = await (await fetch(`${cfg.SB_URL}/rest/v1/app_users?id=eq.${encodeURIComponent(row.id)}&select=id`, { headers: svcHeaders(cfg.SB_SERVICE_KEY) })).json().catch(() => [])
  const isNew = !Array.isArray(found) || !found.length
  if (isNew && !password) return c.json({ error: 'A new user needs a password' }, 400)
  const write = (r: any) => isNew
    ? fetch(`${cfg.SB_URL}/rest/v1/app_users`, { method: 'POST', headers: H, body: JSON.stringify({ password_hash: '', ...r }) })
    : fetch(`${cfg.SB_URL}/rest/v1/app_users?id=eq.${encodeURIComponent(row.id)}`, { method: 'PATCH', headers: H, body: JSON.stringify(r) })
  let ins = await write(row)
  if (!ins.ok) {
    const t = await ins.text()
    if (!('employee_no' in row) || !noEmployeeNo(t)) return c.json({ error: 'Could not save the user: ' + t.slice(0, 200) }, 500)
    delete row.employee_no
    ins = await write(row)
    if (!ins.ok) return c.json({ error: 'Could not save the user: ' + (await ins.text()).slice(0, 200) }, 500)
  }
  try {
    const all = await listAuthUsers(cfg)
    const email = emailFor(cfg, oldUsername || row.username)
    const ex = all.find(u => (u.email || '').toLowerCase() === email) || all.find(u => (u.app_metadata || {}).app_user_id === row.id)
    const saved: any = (await ins.json())[0] || row
    await upsertAuthUser(cfg, ex, saved, password || null, oldUsername)
  } catch (e: any) { return c.json({ error: 'Saved, but the login was not updated: ' + e.message }, 500) }
  return c.json({ ok: true })
})
// ── Clock in / out ──────────────────────────────────────────────
// The printed QR on the wall carries a code derived from the server's private key, so it
// cannot be guessed, needs no extra secret, and a scan is proof of being there (trust-based log).
async function clockCode(cfg: Cfg): Promise<string> {
  if (!cfg.VAPID_PRIVATE) return ''
  const h = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('clock:' + cfg.VAPID_PRIVATE))
  return Array.from(new Uint8Array(h)).slice(0, 8).map(b => b.toString(16).padStart(2, '0')).join('')
}
function lisbon(d: Date) {
  const p = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Lisbon', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(d)
  const g = (t: string) => (p.find(x => x.type === t) || { value: '00' }).value
  return { day: `${g('year')}-${g('month')}-${g('day')}`, hm: `${g('hour')}:${g('minute')}` }
}
app.get('/api/clock/code', async (c) => {
  const cfg = getConfig(c.env); const a = await requireAdmin(c, cfg); if (a.error) return a.error
  const code = await clockCode(cfg)
  if (!code) return c.json({ error: 'VAPID_PRIVATE is not set, so no code can be made' }, 400)
  return c.json({ code, url: new URL(c.req.url).origin + '/?clock=' + code })
})
app.post('/api/clock', async (c) => {
  const cfg = getConfig(c.env)
  const me = await staffFromToken(c, cfg)
  if (!me) return c.json({ error: 'Not logged in' }, 401)
  if (!cfg.SB_SERVICE_KEY) return c.json({ error: 'The SB_SERVICE_KEY secret is not set in Cloudflare yet' }, 400)
  const body: any = await c.req.json().catch(() => ({}))
  const code = String(body.code || '').trim().toLowerCase()
  const want = body.kind === 'in' || body.kind === 'out' ? body.kind : 'auto'
  const expected = await clockCode(cfg)
  if (!expected || code !== expected) return c.json({ error: 'That is not the restaurant\u2019s clock-in code. Scan the QR on the wall.' }, 400)
  const H = svcHeaders(cfg.SB_SERVICE_KEY)
  const users: any[] = await (await fetch(`${cfg.SB_URL}/rest/v1/app_users?id=eq.${encodeURIComponent(me.appUserId)}&select=name,employee`, { headers: H })).json().catch(() => [])
  const u = Array.isArray(users) ? users[0] : null
  const employee = (u && u.employee && u.employee !== '-') ? u.employee : (u && u.name) || me.username
  const last: any[] = await (await fetch(`${cfg.SB_URL}/rest/v1/clock_events?user_id=eq.${encodeURIComponent(me.appUserId)}&order=at.desc&limit=1`, { headers: H })).json().catch(() => [])
  const prev = Array.isArray(last) ? last[0] : null
  const now = new Date(), loc = lisbon(now)
  // still "in" from a check-in less than 20 h ago → this one is the check-out, on that check-in's day
  const open = prev && prev.kind === 'in' && now.getTime() - new Date(prev.at).getTime() < 20 * 3600e3 ? prev : null
  const kind = open ? 'out' : 'in'
  if (want !== 'auto' && want !== kind) {
    return c.json({ error: open ? `You are already checked in (since ${lisbon(new Date(open.at)).hm}). Scan again to check out.` : 'You are not checked in yet. Scan to check in.', state: { kind, since: open ? open.at : null } }, 409)
  }
  const ev = { id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7), user_id: me.appUserId, employee, kind, at: now.toISOString(), day: open ? open.day : loc.day, note: '' }
  const ins = await fetch(`${cfg.SB_URL}/rest/v1/clock_events`, { method: 'POST', headers: { ...H, 'Content-Type': 'application/json', Prefer: 'return=representation' }, body: JSON.stringify(ev) })
  if (!ins.ok) return c.json({ error: 'Not saved: ' + (await ins.text()).slice(0, 160) }, 500)
  console.log(`[Clock] ${employee} ${kind} ${loc.day} ${loc.hm}`)
  return c.json({ ok: true, event: ev, time: loc.hm, minutes: open ? Math.round((now.getTime() - new Date(open.at).getTime()) / 60000) : 0 })
})

// ── Calendar on the phone (one way: the app → the phone's calendar) ──
// Each person may create a private link (cal_feeds) that their phone subscribes to. The phone fetches it
// every so often; nothing is ever written back. Deleting the link (or deactivating the person) stops it.
const CAL_OPTS = ['shifts', 'events', 'reservations']
function calCanReservations(roles: string[]) { return roles.indexOf('admin') !== -1 || roles.indexOf('shift_mgr') !== -1 }
function calToken() { const b = new Uint8Array(24); crypto.getRandomValues(b); return btoa(String.fromCharCode(...b)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '') }
function calFeedOut(c: any, row: any) {
  if (!row) return null
  const https = new URL(c.req.url).origin + '/cal/' + row.token + '.ics'
  return { shifts: row.shifts !== false, events: row.events !== false, reservations: !!row.reservations, lang: row.lang || 'en', url: https, webcal: https.replace(/^https?:/, 'webcal:'), lastUsed: row.last_used_at || null }
}
async function calMine(cfg: Cfg, appUserId: string) {
  const r = await fetch(`${cfg.SB_URL}/rest/v1/cal_feeds?app_user_id=eq.${encodeURIComponent(appUserId)}&select=*`, { headers: svcHeaders(cfg.SB_SERVICE_KEY) })
  if (!r.ok) throw new Error((await r.text()).slice(0, 160))
  const rows: any[] = await r.json()
  return rows[0] || null
}
app.get('/api/cal/me', async (c) => {
  const cfg = getConfig(c.env); c.header('Cache-Control', 'no-store')
  const me = await staffFromToken(c, cfg); if (!me) return c.json({ error: 'Not logged in' }, 401)
  if (!cfg.SB_SERVICE_KEY) return c.json({ error: 'The SB_SERVICE_KEY secret is not set in Cloudflare yet' }, 400)
  try { return c.json({ feed: calFeedOut(c, await calMine(cfg, me.appUserId)), canReservations: calCanReservations(me.roles) }) }
  catch (e: any) { return c.json({ error: e.message, missing: /cal_feeds/.test(e.message) }, 500) }
})
// Create the link, or change what it shows ({ renew: true } makes a new link: the old one stops working)
app.post('/api/cal/me', async (c) => {
  const cfg = getConfig(c.env)
  const me = await staffFromToken(c, cfg); if (!me) return c.json({ error: 'Not logged in' }, 401)
  if (!cfg.SB_SERVICE_KEY) return c.json({ error: 'The SB_SERVICE_KEY secret is not set in Cloudflare yet' }, 400)
  const body: any = await c.req.json().catch(() => ({}))
  const H = { ...svcHeaders(cfg.SB_SERVICE_KEY), 'Content-Type': 'application/json', Prefer: 'return=representation' }
  try {
    const old = await calMine(cfg, me.appUserId)
    const row: any = { app_user_id: me.appUserId, lang: body.lang === 'pt' ? 'pt' : 'en' }
    CAL_OPTS.forEach(k => { row[k] = body[k] !== undefined ? !!body[k] : (old ? old[k] : k !== 'reservations') })
    if (!calCanReservations(me.roles)) row.reservations = false
    let r
    if (old && !body.renew) r = await fetch(`${cfg.SB_URL}/rest/v1/cal_feeds?app_user_id=eq.${encodeURIComponent(me.appUserId)}`, { method: 'PATCH', headers: H, body: JSON.stringify(row) })
    else {
      if (old) await fetch(`${cfg.SB_URL}/rest/v1/cal_feeds?app_user_id=eq.${encodeURIComponent(me.appUserId)}`, { method: 'DELETE', headers: H })
      r = await fetch(`${cfg.SB_URL}/rest/v1/cal_feeds`, { method: 'POST', headers: H, body: JSON.stringify({ ...row, token: calToken() }) })
    }
    if (!r.ok) throw new Error((await r.text()).slice(0, 160))
    return c.json({ feed: calFeedOut(c, (await r.json())[0]), canReservations: calCanReservations(me.roles) })
  } catch (e: any) { return c.json({ error: e.message, missing: /cal_feeds/.test(e.message) }, 500) }
})
app.delete('/api/cal/me', async (c) => {
  const cfg = getConfig(c.env)
  const me = await staffFromToken(c, cfg); if (!me) return c.json({ error: 'Not logged in' }, 401)
  if (!cfg.SB_SERVICE_KEY) return c.json({ error: 'The SB_SERVICE_KEY secret is not set in Cloudflare yet' }, 400)
  const r = await fetch(`${cfg.SB_URL}/rest/v1/cal_feeds?app_user_id=eq.${encodeURIComponent(me.appUserId)}`, { method: 'DELETE', headers: svcHeaders(cfg.SB_SERVICE_KEY) })
  return r.ok ? c.json({ ok: true }) : c.json({ error: (await r.text()).slice(0, 160) }, 500)
})

// The calendar file the phone reads
const CAL_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const CAL_TXT: Record<string, Record<string, string>> = {
  en: { cal: 'Bar da Praia', shift: 'Shift', off: 'Day off', res: 'Reservation', pax: 'people', table: 'Table', from: 'Updated from the Bar da Praia app. Changes made here are not sent back.' },
  pt: { cal: 'Bar da Praia', shift: 'Turno', off: 'Folga', res: 'Reserva', pax: 'pessoas', table: 'Mesa', from: 'Atualizado a partir da app Bar da Praia. Alterações feitas aqui não são enviadas de volta.' }
}
function calNorm(x: any) { return String(x || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim() }
function calEsc(s: any) { return String(s == null ? '' : s).replace(/\\/g, '\\\\').replace(/\r?\n/g, '\\n').replace(/([,;])/g, '\\$1') }
// Lines longer than 75 bytes are folded (RFC 5545)
function calFold(line: string) {
  const enc = new TextEncoder(), out: string[] = []
  let cur = '', len = 0
  for (const ch of line) { const n = enc.encode(ch).length; if (len + n > (out.length ? 74 : 75)) { out.push(cur); cur = ''; len = 0 } cur += ch; len += n }
  out.push(cur)
  return out.join('\r\n ')
}
function calAddDays(ymd: string, n: number) { const d = new Date(ymd + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10) }
const calYmd = (ymd: string) => ymd.replace(/-/g, '')
const calHm = (t: any) => String(t || '').slice(0, 5)
function calLocal(ymd: string, hm: string) { return calYmd(ymd) + 'T' + hm.replace(':', '').padEnd(4, '0') + '00' }
// Start and end in Lisbon time; an end at or before the start is the next day
function calTimed(ymd: string, a: string, b: string) {
  const s = calHm(a), e = calHm(b) || s
  return [`DTSTART;TZID=Europe/Lisbon:${calLocal(ymd, s)}`, `DTEND;TZID=Europe/Lisbon:${calLocal(e <= s ? calAddDays(ymd, 1) : ymd, e)}`]
}
const CAL_TZ = ['BEGIN:VTIMEZONE', 'TZID:Europe/Lisbon', 'X-LIC-LOCATION:Europe/Lisbon',
  'BEGIN:DAYLIGHT', 'TZOFFSETFROM:+0000', 'TZOFFSETTO:+0100', 'TZNAME:WEST', 'DTSTART:19700329T010000', 'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU', 'END:DAYLIGHT',
  'BEGIN:STANDARD', 'TZOFFSETFROM:+0100', 'TZOFFSETTO:+0000', 'TZNAME:WET', 'DTSTART:19701025T020000', 'RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU', 'END:STANDARD', 'END:VTIMEZONE']
app.get('/cal/:file', async (c) => {
  const cfg = getConfig(c.env)
  const token = String(c.req.param('file') || '').replace(/\.ics$/i, '')
  if (!cfg.SB_SERVICE_KEY || !/^[A-Za-z0-9_-]{20,64}$/.test(token)) return c.text('Not found', 404)
  const H = svcHeaders(cfg.SB_SERVICE_KEY)
  const get = async (q: string) => { const r = await fetch(`${cfg.SB_URL}/rest/v1/${q}`, { headers: H }); const j: any = r.ok ? await r.json().catch(() => []) : []; return Array.isArray(j) ? j : [] }
  const feed = (await get(`cal_feeds?token=eq.${token}&select=*`))[0]
  if (!feed) return c.text('Not found', 404)
  const user = (await get(`app_users?id=eq.${encodeURIComponent(feed.app_user_id)}&select=id,name,username,employee,roles,active`))[0]
  if (!user || user.active === false) return c.text('Not found', 404)
  const L = CAL_TXT[feed.lang] || CAL_TXT.en, roles: string[] = Array.isArray(user.roles) ? user.roles : []
  const today = new Date().toISOString().slice(0, 10), since = calAddDays(today, -60)
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+Z$/, 'Z')
  const ev: string[][] = []
  const add = (uid: string, lines: string[]) => ev.push(['BEGIN:VEVENT', `UID:${uid}@bardapraia.org`, `DTSTAMP:${stamp}`, ...lines, 'END:VEVENT'])
  // the person's name on the shift schedule: set in Users, otherwise matched on username or name (as in the app)
  let emp = user.employee && user.employee !== '-' ? user.employee : ''
  if (!emp && user.employee !== '-') {
    const keys = [calNorm(user.username), calNorm(user.name), calNorm(String(user.name || '').split(' ')[0])]
    const e = (await get('employees?select=name')).find((x: any) => keys.indexOf(calNorm(x.name)) !== -1)
    emp = e ? e.name : ''
  }
  if (feed.shifts !== false && emp) {
    const rows = await get(`shifts?employee=eq.${encodeURIComponent(emp)}&week_start=gte.${calAddDays(since, -7)}&select=*`)
    rows.forEach((s: any) => {
      const i = CAL_DAYS.indexOf(s.day); if (i < 0) return
      const day = calAddDays(String(s.week_start).slice(0, 10), i); if (day < since) return
      if (s.day_off) { add(`shift-${s.id}`, [`DTSTART;VALUE=DATE:${calYmd(day)}`, `DTEND;VALUE=DATE:${calYmd(calAddDays(day, 1))}`, `SUMMARY:${calEsc(L.off)}`, 'TRANSP:TRANSPARENT']); return }
      const where = (z: any, sec: any) => [z, sec].filter(Boolean).join(' · ')
      add(`shift-${s.id}`, [...calTimed(day, s.start_time, s.end_time), `SUMMARY:${calEsc(L.shift + (where(s.zone, s.section) ? ' · ' + where(s.zone, s.section) : ''))}`, `DESCRIPTION:${calEsc(L.from)}`])
      if (s.start2 && s.end2) add(`shift-${s.id}-2`, [...calTimed(day, s.start2, s.end2), `SUMMARY:${calEsc(L.shift + (where(s.zone2 || s.zone, s.section2) ? ' · ' + where(s.zone2 || s.zone, s.section2) : ''))}`, `DESCRIPTION:${calEsc(L.from)}`])
    })
  }
  if (feed.events !== false) {
    const rows = await get(`cal_events?date=gte.${since}&select=*`)
    rows.filter((e: any) => e.everyone || (Array.isArray(e.attendees) && e.attendees.indexOf(user.id) !== -1)).forEach((e: any) => {
      const when = e.all_day || !e.start_time ? [`DTSTART;VALUE=DATE:${calYmd(e.date)}`, `DTEND;VALUE=DATE:${calYmd(calAddDays(e.date, 1))}`]
        : calTimed(e.date, e.start_time, e.end_time || (String(Math.min(23, +calHm(e.start_time).slice(0, 2) + 1)).padStart(2, '0') + calHm(e.start_time).slice(2)))
      add(`event-${e.id}`, [...when, `SUMMARY:${calEsc(e.title || 'Bar da Praia')}`, `DESCRIPTION:${calEsc([e.notes, L.from].filter(Boolean).join('\n\n'))}`])
    })
  }
  if (feed.reservations && calCanReservations(roles)) {
    const rows = await get(`reservations?date=gte.${calAddDays(today, -7)}&select=id,guest_name,date,time,end_time,guests,tables,status`)
    rows.filter((r: any) => ['cancelled', 'no-show', 'noshow'].indexOf(String(r.status)) === -1).forEach((r: any) => {
      const s = calHm(r.time), e = calHm(r.end_time) || (String((+s.slice(0, 2) + 2) % 24).padStart(2, '0') + s.slice(2))
      const tables = Array.isArray(r.tables) && r.tables.length ? ' · ' + r.tables.join(', ') : ''
      add(`res-${r.id}`, [...calTimed(r.date, s, e), `SUMMARY:${calEsc(L.res + ' · ' + (r.guest_name || '') + ' · ' + (r.guests || '?') + ' ' + L.pax + tables)}`, `DESCRIPTION:${calEsc(L.from)}`])
    })
  }
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Bar da Praia//Team app//EN', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
    `X-WR-CALNAME:${calEsc(L.cal + ' · ' + (user.name || ''))}`, 'X-WR-TIMEZONE:Europe/Lisbon', 'REFRESH-INTERVAL;VALUE=DURATION:PT1H', 'X-PUBLISHED-TTL:PT1H',
    ...CAL_TZ, ...ev.flat(), 'END:VCALENDAR']
  // note when the phone last read it (shown in the app), at most every 10 minutes
  if (!feed.last_used_at || Date.now() - new Date(feed.last_used_at).getTime() > 600e3) {
    const w = fetch(`${cfg.SB_URL}/rest/v1/cal_feeds?token=eq.${token}`, { method: 'PATCH', headers: { ...H, 'Content-Type': 'application/json' }, body: JSON.stringify({ last_used_at: new Date().toISOString() }) }).catch(() => {})
    try { c.executionCtx.waitUntil(w) } catch (e) { await w }
  }
  return new Response(lines.map(calFold).join('\r\n') + '\r\n', { headers: { 'Content-Type': 'text/calendar; charset=utf-8', 'Cache-Control': 'private, max-age=300', 'Content-Disposition': 'inline; filename="bardapraia.ics"' } })
})

// ── Guest feedback (NPS) ──────────────────────────────────────
// A public page guests open from the QR on the table / bill or a link after their reservation:
// "From 0 to 10, how likely are you to recommend us?" + an optional comment. Saved by the server
// (nps_responses is admins-only); a score of 0–6 notifies the admins straight away.
const NPS_TXT: Record<string, Record<string, string>> = {
  pt: { title: 'A sua opinião', q: 'De 0 a 10, qual a probabilidade de recomendar o Bar da Praia a um amigo?', low: 'Nada provável', high: 'Muito provável',
    why: 'Qual a principal razão da sua nota? (opcional)', ph: 'Conte-nos…', send: 'Enviar', sending: 'A enviar…', thanks: 'Obrigado!',
    thanksHi: 'Ficamos muito contentes. Até breve!', thanksLo: 'Obrigado pela sinceridade. Vamos ler com atenção e melhorar.', again: 'Mudar a resposta',
    err: 'Não foi possível enviar. Tente outra vez.', hi: 'Olá', other: 'English' },
  en: { title: 'Your feedback', q: 'From 0 to 10, how likely are you to recommend Bar da Praia to a friend?', low: 'Not likely', high: 'Very likely',
    why: 'What is the main reason for your score? (optional)', ph: 'Tell us…', send: 'Send', sending: 'Sending…', thanks: 'Thank you!',
    thanksHi: 'We are so glad. See you soon!', thanksLo: 'Thank you for being honest. We will read it carefully and do better.', again: 'Change my answer',
    err: 'Could not send. Please try again.', hi: 'Hi', other: 'Português' }
}
const npsEsc = (s: any) => String(s == null ? '' : s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' } as any)[ch])
const npsClean = (v: any, n: number) => String(v == null ? '' : v).replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, n)
app.get('/feedback', async (c) => {
  const cfg = getConfig(c.env), q = c.req.query()
  const lang = q.lang === 'en' || q.lang === 'pt' ? q.lang : /^pt\b/i.test(c.req.header('Accept-Language') || 'pt') ? 'pt' : 'en'
  const L = NPS_TXT[lang]
  let guest = ''
  if (q.r && /^[A-Za-z0-9_-]{6,64}$/.test(q.r) && cfg.SB_SERVICE_KEY) {
    const rows: any[] = await (await fetch(`${cfg.SB_URL}/rest/v1/reservations?id=eq.${encodeURIComponent(q.r)}&select=guest_name`, { headers: svcHeaders(cfg.SB_SERVICE_KEY) })).json().catch(() => [])
    guest = Array.isArray(rows) && rows[0] ? String(rows[0].guest_name || '').split(' ')[0] : ''
  }
  const other = new URL(c.req.url); other.searchParams.set('lang', lang === 'pt' ? 'en' : 'pt')
  const ctx = JSON.stringify({ s: npsClean(q.s, 10) || 'link', t: npsClean(q.t, 20), r: npsClean(q.r, 64), lang }).replace(/</g, '\\u003c')
  c.header('Cache-Control', 'no-store')
  return c.html(`<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Bar da Praia · ${L.title}</title><link rel="icon" href="/brand/favicon-32.png"><meta name="robots" content="noindex">
<style>
:root{--ink:#16313a;--muted:#5b6f76;--line:#dfe6e8;--teal:#1d7a6a;--teal-d:#145c50;--bg:#f3f1ec;--red:#c4472f;--amber:#c98a12;--green:#2e8b57}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.45 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased}
main{max-width:520px;margin:0 auto;padding:22px 16px 40px}
.top{display:flex;align-items:center;justify-content:space-between;margin-bottom:22px}.top img{height:46px}
.top a{color:var(--muted);font-size:14px;text-decoration:none;border:1px solid var(--line);border-radius:999px;padding:6px 12px;background:#fff}
.card{background:#fff;border:1px solid var(--line);border-radius:18px;padding:22px 18px;box-shadow:0 1px 2px rgba(0,0,0,.04)}
h1{font-size:21px;line-height:1.3;margin:0 0 18px;font-weight:750}
.scale{display:grid;grid-template-columns:repeat(11,minmax(0,1fr));gap:6px}
.scale button{min-height:50px;border:1.5px solid var(--line);border-radius:10px;background:#fff;color:var(--ink);font:inherit;font-weight:750;font-size:16px;cursor:pointer;padding:0;touch-action:manipulation}
.scale button[data-v="0"],.scale button[data-v="1"],.scale button[data-v="2"],.scale button[data-v="3"],.scale button[data-v="4"],.scale button[data-v="5"],.scale button[data-v="6"]{border-bottom-color:#e7b3a8}
.scale button[data-v="7"],.scale button[data-v="8"]{border-bottom-color:#ecd39a}.scale button[data-v="9"],.scale button[data-v="10"]{border-bottom-color:#a9d5bb}
.scale button.on{background:var(--teal);border-color:var(--teal);color:#fff}
.ends{display:flex;justify-content:space-between;font-size:13px;color:var(--muted);margin-top:8px}
@media (max-width:520px){.scale{grid-template-columns:repeat(6,minmax(0,1fr));gap:8px}.scale button{min-height:52px;font-size:18px}}
.more{display:none;margin-top:22px}.more.show{display:block}
label{display:block;font-weight:650;margin-bottom:8px}
textarea{width:100%;min-height:110px;border:1.5px solid var(--line);border-radius:12px;padding:12px;font:inherit;resize:vertical;color:var(--ink)}
textarea:focus,.scale button:focus-visible{outline:none;border-color:var(--teal);box-shadow:0 0 0 3px rgba(29,122,106,.18)}
.send{margin-top:14px;width:100%;min-height:50px;border:0;border-radius:12px;background:var(--teal);color:#fff;font:inherit;font-weight:750;font-size:17px;cursor:pointer}
.send:disabled{opacity:.6}.hp{position:absolute;left:-9999px;width:1px;height:1px;opacity:0}
.err{color:var(--red);font-size:14px;margin-top:10px;min-height:1em}
.done{display:none;text-align:center;padding:12px 0}.done.show{display:block}.done .big{font-size:44px;line-height:1;margin-bottom:10px}
.done h2{margin:0 0 6px;font-size:22px}.done p{margin:0 0 16px;color:var(--muted)}
.done button{border:1px solid var(--line);background:#fff;border-radius:999px;padding:8px 14px;font:inherit;font-size:14px;color:var(--muted);cursor:pointer}
</style></head><body><main>
<div class="top"><img src="/brand/logo-transparent.png" alt="Bar da Praia"><a href="${npsEsc(other.pathname + other.search)}">${L.other}</a></div>
<div class="card">
<form id="f" novalidate>
<h1>${guest ? npsEsc(L.hi + ' ' + guest + ', ' + L.q.charAt(0).toLowerCase() + L.q.slice(1)) : npsEsc(L.q)}</h1>
<div class="scale" role="radiogroup" aria-label="0–10">${Array.from({ length: 11 }, (_, i) => `<button type="button" role="radio" aria-checked="false" data-v="${i}">${i}</button>`).join('')}</div>
<div class="ends"><span>${L.low}</span><span>${L.high}</span></div>
<div class="more" id="more"><label for="c">${L.why}</label><textarea id="c" maxlength="1000" placeholder="${L.ph}"></textarea>
<input class="hp" id="w" tabindex="-1" autocomplete="off" aria-hidden="true">
<button class="send" id="b" type="submit">${L.send}</button><div class="err" id="e" role="alert"></div></div>
</form>
<div class="done" id="d"><div class="big" id="dk"></div><h2>${L.thanks}</h2><p id="dm"></p><button type="button" id="a">${L.again}</button></div>
</div></main>
<script>
(function(){var X=${ctx},L=${JSON.stringify({ sending: L.sending, send: L.send, err: L.err, hi: L.thanksHi, lo: L.thanksLo }).replace(/</g, '\\u003c')},v=null,t0=Date.now();
var f=document.getElementById('f'),more=document.getElementById('more'),b=document.getElementById('b'),e=document.getElementById('e');
[].forEach.call(document.querySelectorAll('.scale button'),function(x){x.addEventListener('click',function(){v=+x.dataset.v;[].forEach.call(document.querySelectorAll('.scale button'),function(y){y.classList.toggle('on',y===x);y.setAttribute('aria-checked',y===x?'true':'false');});more.classList.add('show');});});
f.addEventListener('submit',function(ev){ev.preventDefault();if(v===null)return;b.disabled=true;b.textContent=L.sending;e.textContent='';
fetch('/api/feedback',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({score:v,comment:document.getElementById('c').value,website:document.getElementById('w').value,ms:Date.now()-t0,s:X.s,t:X.t,r:X.r,lang:X.lang})})
.then(function(r){if(!r.ok)throw 0;f.style.display='none';document.getElementById('dk').textContent=v>=9?'\\u2600\\ufe0f':v>=7?'\\ud83d\\ude42':'\\ud83d\\ude4f';document.getElementById('dm').textContent=v>=7?L.hi:L.lo;document.getElementById('d').classList.add('show');})
.catch(function(){e.textContent=L.err;}).then(function(){b.disabled=false;b.textContent=L.send;});});
document.getElementById('a').addEventListener('click',function(){document.getElementById('d').classList.remove('show');f.style.display='';});
})();
</script></body></html>`)
})
// One answer from the page above. A reservation link keeps one answer per reservation (a new one replaces it).
const npsSeen = new Map<string, number[]>()
app.post('/api/feedback', async (c) => {
  const cfg = getConfig(c.env)
  if (!cfg.SB_SERVICE_KEY) return c.json({ error: 'Not available' }, 503)
  const b: any = await c.req.json().catch(() => ({}))
  const score = Number(b.score)
  if (!Number.isInteger(score) || score < 0 || score > 10) return c.json({ error: 'Pick a score from 0 to 10' }, 400)
  if (b.website || Number(b.ms) < 1500) return c.json({ ok: true })   // filled by a robot: say thanks, keep nothing
  // at most 6 answers per 10 minutes from one connection
  const ip = c.req.header('CF-Connecting-IP') || 'x', now = Date.now()
  const recent = (npsSeen.get(ip) || []).filter(t => now - t < 600e3)
  if (recent.length >= 6) return c.json({ error: 'Too many answers, try again later' }, 429)
  recent.push(now); npsSeen.set(ip, recent); if (npsSeen.size > 5000) npsSeen.clear()
  const H = { ...svcHeaders(cfg.SB_SERVICE_KEY), 'Content-Type': 'application/json' }
  const r = /^[A-Za-z0-9_-]{6,64}$/.test(String(b.r || '')) ? String(b.r) : ''
  let guest = '', resDate = null
  if (r) {
    const rows: any[] = await (await fetch(`${cfg.SB_URL}/rest/v1/reservations?id=eq.${encodeURIComponent(r)}&select=guest_name,date`, { headers: H })).json().catch(() => [])
    if (Array.isArray(rows) && rows[0]) { guest = npsClean(rows[0].guest_name, 80); resDate = rows[0].date || null }
  }
  const row: any = { score, comment: npsClean(b.comment, 1000), source: ['qr', 'res', 'link'].indexOf(b.s) !== -1 ? b.s : 'link', table_name: npsClean(b.t, 20),
    reservation_id: guest ? r : '', guest_name: guest, visit_date: resDate, lang: b.lang === 'pt' ? 'pt' : 'en', created_at: new Date().toISOString() }
  let saved = false
  if (row.reservation_id) {
    const up = await fetch(`${cfg.SB_URL}/rest/v1/nps_responses?reservation_id=eq.${encodeURIComponent(r)}`, { method: 'PATCH', headers: { ...H, Prefer: 'return=representation' }, body: JSON.stringify({ ...row, followed_up: false }) })
    saved = up.ok && ((await up.json().catch(() => [])) as any[]).length > 0
  }
  if (!saved) {
    const ins = await fetch(`${cfg.SB_URL}/rest/v1/nps_responses`, { method: 'POST', headers: { ...H, Prefer: 'return=minimal' }, body: JSON.stringify({ id: 'nps-' + now.toString(36) + Math.random().toString(36).slice(2, 7), ...row }) })
    if (!ins.ok) { console.log('[NPS] not saved: ' + (await ins.text()).slice(0, 200)); return c.json({ error: 'Not saved' }, 500) }
  }
  // a low score: tell the admins now, so someone can react the same day
  if (score <= 6 && cfg.VAPID_PRIVATE) {
    const job = (async () => {
      const users: any[] = await (await fetch(`${cfg.SB_URL}/rest/v1/app_users?select=id,roles,active`, { headers: H })).json().catch(() => [])
      const admins = (Array.isArray(users) ? users : []).filter(u => u.active !== false && Array.isArray(u.roles) && u.roles.indexOf('admin') !== -1).map(u => u.id)
      if (!admins.length) return
      const where = row.guest_name ? ' · ' + row.guest_name : row.table_name ? ' · ' + row.table_name : ''
      await pushToUsers(cfg, admins, `Low guest score: ${score}/10${where}`, row.comment ? row.comment.slice(0, 160) : 'No comment left', '/?open=nps', 'bardapraia-nps')
    })().catch(e => console.log('[NPS] alert failed: ' + e.message))
    try { c.executionCtx.waitUntil(job) } catch (e) { await job }
  }
  return c.json({ ok: true })
})

// Impersonate (admins, for testing): a real session for another staff login, so the app and the
// database behave exactly as they would for that person. No email is sent; the person stays logged in
// on their own devices.
app.post('/api/auth/impersonate', async (c) => {
  const cfg = getConfig(c.env); const a = await requireAdmin(c, cfg); if (a.error) return a.error
  const { userId } = await c.req.json().catch(() => ({}))
  if (!userId || typeof userId !== 'string') return c.json({ error: 'Choose a person' }, 400)
  if (userId === a.me!.appUserId) return c.json({ error: 'That is you' }, 400)
  const rows: any[] = await (await fetch(`${cfg.SB_URL}/rest/v1/app_users?id=eq.${encodeURIComponent(userId)}&select=id,name,username,active`, { headers: svcHeaders(cfg.SB_SERVICE_KEY) })).json().catch(() => [])
  const u = Array.isArray(rows) ? rows[0] : null
  if (!u) return c.json({ error: 'Person not found' }, 404)
  if (u.active === false) return c.json({ error: u.name + ' is not active, so they cannot log in' }, 400)
  const email = emailFor(cfg, u.username)
  const gl = await fetch(`${cfg.SB_URL}/auth/v1/admin/generate_link`, { method: 'POST', headers: { ...svcHeaders(cfg.SB_SERVICE_KEY), 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'magiclink', email }) })
  const gj: any = await gl.json().catch(() => ({}))
  if (!gl.ok) return c.json({ error: 'No secure login for ' + u.name + ' yet (' + (gj.msg || gj.error_description || gj.message || gl.status) + ')' }, 400)
  const props = gj.properties || gj
  const verify = (body: any) => fetch(`${cfg.SB_URL}/auth/v1/verify`, { method: 'POST', headers: { apikey: cfg.SB_KEY, 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
  let vr = await verify({ type: props.verification_type || 'magiclink', token_hash: props.hashed_token })
  if (!vr.ok && props.email_otp) vr = await verify({ type: 'magiclink', email, token: props.email_otp })
  const vj: any = await vr.json().catch(() => ({}))
  if (!vr.ok || !vj.access_token) return c.json({ error: 'Could not start a session for ' + u.name + ' (' + (vj.msg || vj.error_description || vj.message || vr.status) + ')' }, 400)
  console.log(`[Impersonate] ${a.me!.username} -> ${u.username}`)
  return c.json({ session: vj, name: u.name })
})
app.post('/api/users/delete', async (c) => {
  const cfg = getConfig(c.env); const a = await requireAdmin(c, cfg); if (a.error) return a.error
  const { id } = await c.req.json()
  if (!id || id === a.me!.appUserId) return c.json({ error: 'You cannot delete yourself' }, 400)
  const all = await listAuthUsers(cfg)
  const ex = all.find(u => (u.app_metadata || {}).app_user_id === id)
  if (ex) await fetch(`${cfg.SB_URL}/auth/v1/admin/users/${ex.id}`, { method: 'DELETE', headers: svcHeaders(cfg.SB_SERVICE_KEY) })
  const r = await fetch(`${cfg.SB_URL}/rest/v1/app_users?id=eq.${encodeURIComponent(id)}`, { method: 'DELETE', headers: svcHeaders(cfg.SB_SERVICE_KEY) })
  return c.json({ ok: r.ok }, r.ok ? 200 : 500)
})

// ── VAPID public key (frontend needs it to subscribe) ─────────
app.get('/api/push/vapid-public-key', (c) => {
  return c.json({ key: getConfig(c.env).VAPID_PUBLIC })
})

// ── Save a push subscription for a user ──────────────────────
app.post('/api/push/subscribe', async (c) => {
  const cfg = getConfig(c.env), { SB_URL } = cfg
  try {
    let { userId, subscription } = await c.req.json()
    if (await secureMode(cfg)) {           // a device can only register itself, for the person logged in
      const me = await staffFromToken(c, cfg); if (!me) return c.json({ error: 'Not logged in' }, 401)
      userId = me.appUserId
    }
    if (!userId || !subscription || !subscription.endpoint) {
      return c.json({ error: 'Missing userId or subscription' }, 400)
    }

    // Upsert into push_subscriptions table in Supabase
    const res = await fetch(`${SB_URL}/rest/v1/push_subscriptions`, {
      method: 'POST',
      headers: {
        ...dbHeaders(cfg),
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates,return=minimal'
      },
      body: JSON.stringify({
        user_id: userId,
        endpoint: subscription.endpoint,
        p256dh: subscription.keys?.p256dh || '',
        auth: subscription.keys?.auth || '',
        updated_at: new Date().toISOString()
      })
    })

    if (!res.ok) {
      const err = await res.text()
      return c.json({ error: err }, 500)
    }
    return c.json({ ok: true })
  } catch (e: any) {
    return c.json({ error: e.message }, 500)
  }
})

// ── Send push notifications to a list of user IDs ─────────────
// Send a notification to these people: kept in their inbox (Home → Notifications) and pushed to their devices
async function pushToUsers(cfg: Cfg, userIds: string[], title: string, body: string, url: string, tag?: string): Promise<{ code: number, out: any }> {
  const { SB_URL, VAPID_PUBLIC, VAPID_PRIVATE, VAPID_SUBJECT } = cfg
  // Keep a copy in each person's inbox (Home → Notifications), also for people with no
  // device registered or who are logged off. Tests are not kept. Needs the service key.
  let stored = 0
  if (tag !== 'bardapraia-test' && cfg.SB_SERVICE_KEY) {
    const rows = [...new Set(userIds as unknown[])].filter((id): id is string => typeof id === 'string' && !!id).map(id => ({
      user_id: id,
      title: String(title).slice(0, 200),
      body: String(body || '').slice(0, 1000),
      url: typeof url === 'string' && url.startsWith('/') ? url.slice(0, 300) : '/'
    }))
    try {
      const r = await fetch(`${SB_URL}/rest/v1/notifications`, { method: 'POST', headers: { ...dbHeaders(cfg), 'Content-Type': 'application/json', Prefer: 'return=minimal' }, body: JSON.stringify(rows) })
      if (r.ok) stored = rows.length
      else console.log('[Inbox] not stored: HTTP ' + r.status + ' ' + (await r.text()).slice(0, 160))
    } catch (e: any) { console.log('[Inbox] not stored: ' + e.message) }
  }

  // Fetch subscriptions for given users — use in.() filter (correct PostgREST syntax)
  const idList = userIds.map((id: string) => encodeURIComponent(id)).join(',')
  const subUrl = `${SB_URL}/rest/v1/push_subscriptions?user_id=in.(${idList})&select=endpoint,p256dh,auth`
  const subRes = await fetch(subUrl, { headers: dbHeaders(cfg) })
  const subBody = await subRes.text()
  if (!subRes.ok) return { code: 500, out: { error: 'Failed to fetch subscriptions', detail: subBody } }
  const subs: any[] = JSON.parse(subBody)
  if (!subs.length) return { code: 200, out: { sent: 0, stored, message: 'No subscriptions found for userIds', userIds } }

  // Build VAPID JWT
  const vapidJwt = await buildVapidJwt(VAPID_SUBJECT, VAPID_PUBLIC, VAPID_PRIVATE)

  const payload = JSON.stringify({
    title,
    body: body || '',
    url: url || '/',
    icon: '/brand/icon-192.png',
    tag: typeof tag === 'string' && tag ? tag.slice(0, 64) : 'bardapraia-task-' + Date.now()
  })

  // Send to each subscription
  let sent = 0
  const errors: string[] = []
  await Promise.all(subs.map(async (sub) => {
    try {
      const encrypted = await encryptPayload(payload, sub.p256dh, sub.auth)

      // Build VAPID JWT per-subscription (audience = push service origin)
      const endpointOrigin = new URL(sub.endpoint).origin
      const perSubJwt = await buildVapidJwt(VAPID_SUBJECT, VAPID_PUBLIC, VAPID_PRIVATE, endpointOrigin)

      const pushRes = await fetch(sub.endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `vapid t=${perSubJwt.jwt},k=${VAPID_PUBLIC}`,
          'Content-Type': 'application/octet-stream',
          'Content-Encoding': 'aes128gcm',
          'TTL': '86400'
        },
        body: encrypted
      })

      const responseText = await pushRes.text()
      console.log(`[Push] ${sub.endpoint.slice(0,50)} → HTTP ${pushRes.status}: ${responseText.slice(0,200)}`)

      if (pushRes.status === 201 || pushRes.status === 200 || pushRes.status === 202) {
        sent++
      } else if (pushRes.status === 410 || pushRes.status === 404) {
        // Subscription expired – remove it
        await fetch(`${SB_URL}/rest/v1/push_subscriptions?endpoint=eq.${encodeURIComponent(sub.endpoint)}`, {
          method: 'DELETE',
          headers: dbHeaders(cfg)
        })
        errors.push(`Expired (${pushRes.status}): ${sub.endpoint.slice(0, 60)}`)
      } else {
        errors.push(`HTTP ${pushRes.status}: ${responseText.slice(0,100)}`)
      }
    } catch (err: any) {
      errors.push(`Exception: ${err.message}`)
    }
  }))

  return { code: 200, out: { sent, stored, total: subs.length, errors } }
}

app.post('/api/push/send', async (c) => {
  const cfg = getConfig(c.env), { SB_URL, VAPID_PUBLIC, VAPID_PRIVATE, VAPID_SUBJECT } = cfg
  if (await secureMode(cfg) && !(await staffFromToken(c, cfg))) return c.json({ error: 'Not logged in' }, 401)
  if (!VAPID_PRIVATE) {
    return c.json({ error: 'VAPID_PRIVATE is not configured on the server (set it as a secret in the hosting environment)' }, 500)
  }
  try {
    const { userIds, title, body, url, tag } = await c.req.json()
    if (!userIds || !userIds.length || !title) {
      return c.json({ error: 'Missing userIds or title' }, 400)
    }

    const r = await pushToUsers(cfg, userIds, title, body, url, tag)
    return c.json(r.out, r.code as any)
  } catch (e: any) {
    return c.json({ error: e.message }, 500)
  }
})

// ════════════════════════════════════════════════════════════════
// Web Push crypto helpers (pure Web Crypto API – works in CF Workers)
// ════════════════════════════════════════════════════════════════

function urlBase64ToUint8(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const raw = atob(base64)
  return Uint8Array.from(raw, c => c.charCodeAt(0))
}

function uint8ToUrlBase64(buf: Uint8Array): string {
  let str = ''
  buf.forEach(b => str += String.fromCharCode(b))
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

async function buildVapidJwt(subject: string, publicKeyB64: string, privateKeyB64: string, audience?: string) {
  const now = Math.floor(Date.now() / 1000)
  const aud = audience || 'https://fcm.googleapis.com'
  const header  = uint8ToUrlBase64(new TextEncoder().encode(JSON.stringify({ typ: 'JWT', alg: 'ES256' })))
  const payload = uint8ToUrlBase64(new TextEncoder().encode(JSON.stringify({ aud: aud, exp: now + 43200, sub: subject })))
  const sigInput = `${header}.${payload}`

  const privBytes = urlBase64ToUint8(privateKeyB64)
  const privKey = await crypto.subtle.importKey(
    'raw', privBytes,
    { name: 'ECDSA', namedCurve: 'P-256' },
    false, ['sign']
  ).catch(async () => {
    // Some runtimes need pkcs8 wrapping
    const pkcs8 = new Uint8Array(138)
    const prefix = [0x30,0x81,0x87,0x02,0x01,0x00,0x30,0x13,0x06,0x07,0x2a,0x86,0x48,0xce,0x3d,0x02,0x01,0x06,0x08,0x2a,0x86,0x48,0xce,0x3d,0x03,0x01,0x07,0x04,0x6d,0x30,0x6b,0x02,0x01,0x01,0x04,0x20]
    prefix.forEach((b, i) => pkcs8[i] = b)
    privBytes.forEach((b, i) => pkcs8[36 + i] = b)
    pkcs8[68] = 0xa1; pkcs8[69] = 0x44; pkcs8[70] = 0x03; pkcs8[71] = 0x42; pkcs8[72] = 0x00
    const pubBytes = urlBase64ToUint8(publicKeyB64)
    pubBytes.forEach((b, i) => pkcs8[73 + i] = b)
    return crypto.subtle.importKey('pkcs8', pkcs8, { name: 'ECDSA', namedCurve: 'P-256' }, false, ['sign'])
  })

  const sig = await crypto.subtle.sign(
    { name: 'ECDSA', hash: 'SHA-256' },
    privKey,
    new TextEncoder().encode(sigInput)
  )
  const jwt = `${sigInput}.${uint8ToUrlBase64(new Uint8Array(sig))}`
  return { jwt }
}

async function encryptPayload(plaintext: string, p256dhB64: string, authB64: string): Promise<Uint8Array> {
  const enc = new TextEncoder()
  const plainBuf = enc.encode(plaintext)

  // Keys
  const receiverPublicKey = await crypto.subtle.importKey(
    'raw', urlBase64ToUint8(p256dhB64),
    { name: 'ECDH', namedCurve: 'P-256' }, true, []
  )
  const authSecret = urlBase64ToUint8(authB64)

  // Sender ephemeral key pair
  const senderKeys = await crypto.subtle.generateKey({ name: 'ECDH', namedCurve: 'P-256' }, true, ['deriveBits'])
  const senderPublicRaw = new Uint8Array(await crypto.subtle.exportKey('raw', (senderKeys as CryptoKeyPair).publicKey))

  // ECDH shared secret
  const sharedBits = await crypto.subtle.deriveBits(
    { name: 'ECDH', public: receiverPublicKey },
    (senderKeys as CryptoKeyPair).privateKey, 256
  )
  const sharedSecret = new Uint8Array(sharedBits)

  // Salt
  const salt = crypto.getRandomValues(new Uint8Array(16))

  // HKDF: PRK = HMAC-SHA256(auth_secret, shared_secret)
  const receiverPublicRaw = new Uint8Array(await crypto.subtle.exportKey('raw', receiverPublicKey))
  const infoPrefix = enc.encode('WebPush: info\x00')
  const prkInfo = new Uint8Array(infoPrefix.length + receiverPublicRaw.length + senderPublicRaw.length)
  prkInfo.set(infoPrefix, 0)
  prkInfo.set(receiverPublicRaw, infoPrefix.length)
  prkInfo.set(senderPublicRaw, infoPrefix.length + receiverPublicRaw.length)
  const prk = await hkdf(authSecret, sharedSecret, prkInfo, 32)

  // HKDF: content encryption key
  const cek = await hkdf(salt, prk, enc.encode('Content-Encoding: aes128gcm\x00'), 16)
  const nonce = await hkdf(salt, prk, enc.encode('Content-Encoding: nonce\x00'), 12)

  // Import CEK
  const aesKey = await crypto.subtle.importKey('raw', cek, 'AES-GCM', false, ['encrypt'])

  // Pad plaintext (add 0x02 delimiter + padding)
  const padded = new Uint8Array(plainBuf.length + 2)
  padded.set(plainBuf); padded[plainBuf.length] = 0x02

  const ciphertext = new Uint8Array(await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: nonce },
    aesKey, padded
  ))

  // Build aes128gcm content-encoding record
  // Header: salt(16) + rs(4) + idlen(1) + keyid(65)
  const rs = new Uint8Array(4); new DataView(rs.buffer).setUint32(0, 4096)
  const header = new Uint8Array(16 + 4 + 1 + 65)
  header.set(salt, 0)
  header.set(rs, 16)
  header[20] = 65
  header.set(senderPublicRaw, 21)

  const result = new Uint8Array(header.length + ciphertext.length)
  result.set(header); result.set(ciphertext, header.length)
  return result
}

// HKDF (RFC 5869). Extract is HMAC keyed with the salt over the input key material;
// having these two the wrong way round made every payload undecryptable on the phone.
async function hkdf(salt: Uint8Array, ikm: Uint8Array, info: Uint8Array, length: number): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey('raw', salt, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const prk = new Uint8Array(await crypto.subtle.sign('HMAC', key, ikm))
  const prkKey = await crypto.subtle.importKey('raw', prk, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const infoWithCounter = new Uint8Array(info.length + 1)
  infoWithCounter.set(info); infoWithCounter[info.length] = 0x01
  const okm = new Uint8Array(await crypto.subtle.sign('HMAC', prkKey, infoWithCounter))
  return okm.slice(0, length)
}

export default app
