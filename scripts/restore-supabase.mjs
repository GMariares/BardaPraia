#!/usr/bin/env node
// Restore a backup made by scripts/backup-supabase.mjs into a Supabase project.
// Usage: SB_URL=https://<ref>.supabase.co SB_KEY=<anon or service_role key> \
//        node scripts/restore-supabase.mjs <backup-dir>
// - Run supabase/full_schema.sql on the target project FIRST.
// - Uses upsert (merge-duplicates), so it is safe to re-run.
// - Refuses to run without an explicit SB_URL to avoid writing to the wrong project.
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const SB_URL = process.env.SB_URL
const SB_KEY = process.env.SB_KEY
const dir = process.argv[2]
if (!SB_URL || !SB_KEY || !dir) {
  console.error('Usage: SB_URL=... SB_KEY=... node scripts/restore-supabase.mjs <backup-dir>')
  process.exit(1)
}

// Order matters: suppliers before inventory (foreign key).
const ORDER = [
  'settings', 'employees', 'suppliers', 'inventory', 'inv_logs', 'orders', 'reservations',
  'tasks', 'shifts', 'bb_menu', 'bb_entries', 'fin_entries', 'app_users',
  'push_subscriptions', 'absences'
]
const CHUNK = 500

async function count(table) {
  const res = await fetch(`${SB_URL}/rest/v1/${table}?select=*`, {
    method: 'HEAD',
    headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}`, Prefer: 'count=exact', Range: '0-0' }
  })
  return Number((res.headers.get('content-range') || '/-1').split('/')[1])
}

let failed = false
for (const t of ORDER) {
  const file = join(dir, `${t}.json`)
  if (!existsSync(file)) { console.log(`${t}: no file in backup, skipped`); continue }
  const rows = JSON.parse(readFileSync(file, 'utf8'))
  for (let i = 0; i < rows.length; i += CHUNK) {
    const res = await fetch(`${SB_URL}/rest/v1/${t}`, {
      method: 'POST',
      headers: {
        apikey: SB_KEY,
        Authorization: `Bearer ${SB_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates,return=minimal'
      },
      body: JSON.stringify(rows.slice(i, i + CHUNK))
    })
    if (!res.ok) { failed = true; console.error(`${t}: HTTP ${res.status} ${await res.text()}`); break }
  }
  const after = await count(t)
  const ok = after >= rows.length
  if (!ok) failed = true
  console.log(`${t}: backup ${rows.length} rows -> target now has ${after} ${ok ? 'OK' : 'MISMATCH'}`)
}
console.log(failed ? '\nRESTORE INCOMPLETE — check the errors above.' : '\nRestore complete.')
process.exit(failed ? 1 : 0)
