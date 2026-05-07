import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { getAppHTML } from './html'

const app = new Hono()

app.use('*', cors())

// VAPID keys (generated once, fixed)
const VAPID_PUBLIC  = 'BJ302ZJZf1kKxra5TvjiV-33Yx07KRR8oCfsQobjgtxu-oan78YJr2YTUAzVSyXolJO-V_ktqcQZe9g9RjZuqes'
const VAPID_PRIVATE = 'XpUJ_Vn3j-5KStotIa0lC4eFwHl6LVdiRxoL6vplqAk'
const VAPID_SUBJECT = 'mailto:admin@bardapraia.com'

// Supabase config (same as frontend)
const SB_URL = 'https://eurcdnyhwqofnddhxrpf.supabase.co'
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1cmNkbnlod3FvZm5kZGh4cnBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3ODIyNDMsImV4cCI6MjA5MDM1ODI0M30.sqap9onVY3z8AJO9bATT8jXShOxe7h6g0uXWTUN4kK0'

// ── Favicon ───────────────────────────────────────────────────
app.get('/favicon.ico', (c) => new Response('', { status: 204 }))

// ── Service Worker (must be served from root scope) ───────────
app.get('/sw.js', async (c) => {
  // sw.js is bundled as a static asset in public/sw.js → dist/sw.js
  // We inline it here so it's always available at the root scope
  const swCode = `
// ── Bar da Praia – Service Worker (Web Push) ──────────────────
self.addEventListener('install', function(e) { self.skipWaiting(); });
self.addEventListener('activate', function(e) { e.waitUntil(self.clients.claim()); });

self.addEventListener('push', function(e) {
  var data = {};
  try { data = e.data ? e.data.json() : {}; } catch(err) {}
  var title = data.title || 'Bar da Praia';
  var body  = data.body  || 'You have a new task.';
  var tag   = data.tag   || 'bardapraia-push';
  e.waitUntil(
    self.registration.showNotification(title, {
      body: body, icon: '/favicon.ico', badge: '/favicon.ico',
      tag: tag, data: { url: data.url || '/' }
    })
  );
});

self.addEventListener('notificationclick', function(e) {
  e.notification.close();
  var target = (e.notification.data && e.notification.data.url) || '/';
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(list) {
      for (var i = 0; i < list.length; i++) {
        if (list[i].url.indexOf(self.location.origin) !== -1 && 'focus' in list[i])
          return list[i].focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow(target);
    })
  );
});
`
  return new Response(swCode, {
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8',
      'Service-Worker-Allowed': '/',
      'Cache-Control': 'no-cache'
    }
  })
})

// ── Service Worker ────────────────────────────────────────────
// Served from /public/sw.js automatically by Cloudflare Pages

// ── SPA ───────────────────────────────────────────────────────
app.get('/', (c) => c.html(getAppHTML()))

// ── VAPID public key (frontend needs it to subscribe) ─────────
app.get('/api/push/vapid-public-key', (c) => {
  return c.json({ key: VAPID_PUBLIC })
})

// ── Save a push subscription for a user ──────────────────────
app.post('/api/push/subscribe', async (c) => {
  try {
    const { userId, subscription } = await c.req.json()
    if (!userId || !subscription || !subscription.endpoint) {
      return c.json({ error: 'Missing userId or subscription' }, 400)
    }

    // Upsert into push_subscriptions table in Supabase
    const res = await fetch(`${SB_URL}/rest/v1/push_subscriptions`, {
      method: 'POST',
      headers: {
        'apikey': SB_KEY,
        'Authorization': `Bearer ${SB_KEY}`,
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
  try {
    const { userIds, title, body, url } = await c.req.json()
    if (!userIds || !userIds.length || !title) {
      return c.json({ error: 'Missing userIds or title' }, 400)
    }

    // Fetch subscriptions for given users
    const ids = userIds.map((id: string) => `user_id=eq.${encodeURIComponent(id)}`).join(',')
    const subRes = await fetch(
      `${SB_URL}/rest/v1/push_subscriptions?or=(${ids})&select=endpoint,p256dh,auth`,
      {
        headers: {
          'apikey': SB_KEY,
          'Authorization': `Bearer ${SB_KEY}`
        }
      }
    )
    if (!subRes.ok) return c.json({ error: 'Failed to fetch subscriptions' }, 500)
    const subs: any[] = await subRes.json()
    if (!subs.length) return c.json({ sent: 0, message: 'No subscriptions found' })

    // Build VAPID JWT
    const vapidJwt = await buildVapidJwt(VAPID_SUBJECT, VAPID_PUBLIC, VAPID_PRIVATE)

    const payload = JSON.stringify({
      title,
      body: body || '',
      url: url || '/',
      icon: '/favicon.ico',
      tag: 'bardapraia-task-' + Date.now()
    })

    // Send to each subscription
    let sent = 0
    const errors: string[] = []
    await Promise.all(subs.map(async (sub) => {
      try {
        const encrypted = await encryptPayload(payload, sub.p256dh, sub.auth)
        const pushRes = await fetch(sub.endpoint, {
          method: 'POST',
          headers: {
            'Authorization': `vapid t=${vapidJwt.jwt},k=${VAPID_PUBLIC}`,
            'Content-Type': 'application/octet-stream',
            'Content-Encoding': 'aes128gcm',
            'TTL': '86400'
          },
          body: encrypted
        })
        if (pushRes.status === 201 || pushRes.status === 200 || pushRes.status === 202) {
          sent++
        } else if (pushRes.status === 410 || pushRes.status === 404) {
          // Subscription expired – remove it
          await fetch(`${SB_URL}/rest/v1/push_subscriptions?endpoint=eq.${encodeURIComponent(sub.endpoint)}`, {
            method: 'DELETE',
            headers: { 'apikey': SB_KEY, 'Authorization': `Bearer ${SB_KEY}` }
          })
          errors.push(`Expired: ${sub.endpoint.slice(0, 40)}`)
        } else {
          errors.push(`HTTP ${pushRes.status} for ${sub.endpoint.slice(0, 40)}`)
        }
      } catch (err: any) {
        errors.push(err.message)
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

async function buildVapidJwt(subject: string, publicKeyB64: string, privateKeyB64: string) {
  const now = Math.floor(Date.now() / 1000)
  const header  = uint8ToUrlBase64(new TextEncoder().encode(JSON.stringify({ typ: 'JWT', alg: 'ES256' })))
  const payload = uint8ToUrlBase64(new TextEncoder().encode(JSON.stringify({ aud: 'https://fcm.googleapis.com', exp: now + 43200, sub: subject })))
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
  const prk = await hkdf(authSecret, sharedSecret, enc.encode('WebPush: info\x00').concat(
    new Uint8Array(await crypto.subtle.exportKey('raw', receiverPublicKey)),
    senderPublicRaw
  ), 32)

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

async function hkdf(salt: Uint8Array, ikm: Uint8Array, info: Uint8Array, length: number): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey('raw', ikm, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const prk = new Uint8Array(await crypto.subtle.sign('HMAC', key, salt))
  const prkKey = await crypto.subtle.importKey('raw', prk, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const infoWithCounter = new Uint8Array(info.length + 1)
  infoWithCounter.set(info); infoWithCounter[info.length] = 0x01
  const okm = new Uint8Array(await crypto.subtle.sign('HMAC', prkKey, infoWithCounter))
  return okm.slice(0, length)
}

export default app
