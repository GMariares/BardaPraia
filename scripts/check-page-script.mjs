#!/usr/bin/env node
// Syntax-checks the inline <script> blocks of the page the Worker serves.
// Usage: npm run build && node scripts/check-page-script.mjs
import { writeFileSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { execFileSync } from 'node:child_process'
const mod = await import(join(process.cwd(), 'dist/index.js'))
const res = await mod.default.fetch(new Request('http://localhost/'), {}, { waitUntil() {}, passThroughOnException() {} })
const html = await res.text()
const scripts = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1])
const dir = mkdtempSync(join(tmpdir(), 'pagecheck-'))
let failed = 0
scripts.forEach((code, i) => {
  const f = join(dir, `inline-${i}.js`); writeFileSync(f, code)
  try { execFileSync(process.execPath, ['--check', f], { stdio: 'pipe' }) }
  catch (e) { failed++; console.error(`inline script #${i} has a syntax error:\n` + e.stderr.toString().split('\n').slice(0, 6).join('\n')) }
})
console.log(`${scripts.length} inline script(s) checked, ${failed} with errors`)
process.exit(failed ? 1 : 0)
