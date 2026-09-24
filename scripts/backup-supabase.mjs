#!/usr/bin/env node
// Full JSON backup of every Bar da Praia table in Supabase.
// Usage: node scripts/backup-supabase.mjs [output-dir]
// Env overrides: SB_URL, SB_KEY (defaults to the values used by the app).
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const SB_URL = process.env.SB_URL || 'https://eurcdnyhwqofnddhxrpf.supabase.co'
const SB_KEY = process.env.SB_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1cmNkbnlod3FvZm5kZGh4cnBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3ODIyNDMsImV4cCI6MjA5MDM1ODI0M30.sqap9onVY3z8AJO9bATT8jXShOxe7h6g0uXWTUN4kK0'

const TABLES = [
  'settings', 'employees', 'inventory', 'inv_logs', 'orders', 'reservations',
  'tasks', 'shifts', 'bb_menu', 'bb_entries', 'fin_entries', 'app_users',
  'push_subscriptions', 'absences', 'suppliers'
]
const PAGE = 1000

async function fetchAll(table) {
  const rows = []
  for (let from = 0; ; from += PAGE) {
    const res = await fetch(`${SB_URL}/rest/v1/${table}?select=*`, {
      headers: {
        apikey: SB_KEY,
        Authorization: `Bearer ${SB_KEY}`,
        Range: `${from}-${from + PAGE - 1}`,
        Prefer: 'count=exact'
      }
    })
    if (res.status === 404) return { missing: true, rows: [] }
    if (!res.ok) throw new Error(`${table}: HTTP ${res.status} ${await res.text()}`)
    const page = await res.json()
    rows.push(...page)
    const total = Number((res.headers.get('content-range') || '').split('/')[1])
    if (page.length < PAGE || rows.length >= total) return { missing: false, rows, total }
  }
}

const stamp = new Date().toISOString().replace(/[:.]/g, '-')
const outDir = process.argv[2] || join('backups', stamp)
mkdirSync(outDir, { recursive: true })

const summary = {}
for (const t of TABLES) {
  const { missing, rows, total } = await fetchAll(t)
  if (missing) { summary[t] = 'TABLE MISSING'; continue }
  writeFileSync(join(outDir, `${t}.json`), JSON.stringify(rows, null, 2))
  summary[t] = { rows: rows.length, reported: total }
  if (total !== undefined && rows.length !== total) summary[t].WARNING = 'row count mismatch'
}
writeFileSync(join(outDir, '_summary.json'), JSON.stringify({ takenAt: new Date().toISOString(), source: SB_URL, tables: summary }, null, 2))
console.log(`Backup written to ${outDir}`)
console.table(Object.fromEntries(Object.entries(summary).map(([k, v]) => [k, typeof v === 'string' ? v : `${v.rows}${v.WARNING ? ' !!' : ''}`])))
