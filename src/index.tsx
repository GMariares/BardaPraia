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
const USER_COLS = 'id,name,username,roles,contract_start,contract_end,hours,amount,discount,insurance,cloth_size,notes,active,employee,created_at'

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
  const r = await fetch(`${cfg.SB_URL}/rest/v1/app_users?select=${USER_COLS}&order=name.asc`, { headers: svcHeaders(cfg.SB_SERVICE_KEY) })
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
  const ins = isNew
    ? await fetch(`${cfg.SB_URL}/rest/v1/app_users`, { method: 'POST', headers: H, body: JSON.stringify({ password_hash: '', ...row }) })
    : await fetch(`${cfg.SB_URL}/rest/v1/app_users?id=eq.${encodeURIComponent(row.id)}`, { method: 'PATCH', headers: H, body: JSON.stringify(row) })
  if (!ins.ok) return c.json({ error: 'Could not save the user: ' + (await ins.text()).slice(0, 200) }, 500)
  try {
    const all = await listAuthUsers(cfg)
    const email = emailFor(cfg, oldUsername || row.username)
    const ex = all.find(u => (u.email || '').toLowerCase() === email) || all.find(u => (u.app_metadata || {}).app_user_id === row.id)
    const saved: any = (await ins.json())[0] || row
    await upsertAuthUser(cfg, ex, saved, password || null, oldUsername)
  } catch (e: any) { return c.json({ error: 'Saved, but the login was not updated: ' + e.message }, 500) }
  return c.json({ ok: true })
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

    // Fetch subscriptions for given users — use in.() filter (correct PostgREST syntax)
    const idList = userIds.map((id: string) => encodeURIComponent(id)).join(',')
    const subUrl = `${SB_URL}/rest/v1/push_subscriptions?user_id=in.(${idList})&select=endpoint,p256dh,auth`
    const subRes = await fetch(subUrl, { headers: dbHeaders(cfg) })
    const subBody = await subRes.text()
    if (!subRes.ok) return c.json({ error: 'Failed to fetch subscriptions', detail: subBody }, 500)
    const subs: any[] = JSON.parse(subBody)
    if (!subs.length) return c.json({ sent: 0, message: 'No subscriptions found for userIds', userIds })

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

    return c.json({ sent, total: subs.length, errors })
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
