# Moving Bar da Praia off Genspark — step by step

Goal: run this app fully under your own accounts (GitHub + Supabase + Cloudflare or Vercel),
with a custom domain, and only then remove Genspark. Nothing in the database is touched
until a verified backup exists and you know who owns the Supabase project.

---

## 0. What the app actually is (so you know what has to move)

| Piece | Where it lives today | Has to move? |
|---|---|---|
| Source code | GitHub `GMariares/BardaPraia` (this repo) | Already yours. Just confirm it is up to date (step 2). |
| Web app / API | Hono app built for **Cloudflare Pages** (`dist/_worker.js`). Genspark deploys it to a `*.pages.dev` URL. | Yes: redeploy under your own Cloudflare or Vercel account (step 5). |
| Data | Supabase project `eurcdnyhwqofnddhxrpf` (14 tables). All business data is here. | Only if that project is not in an account you control (step 3). |
| Push notifications | VAPID keys hard-coded in `src/index.tsx`, subscriptions in table `push_subscriptions`. | Keys must stay **identical** or every existing subscription breaks. |
| Browser cache | `localStorage` on each phone/laptop (key `bardapraia_v6`), used as a fast cache of Supabase. | Cache only, except the two items in step 7. |

Nothing in the code references Genspark. The only Genspark-specific file is `ecosystem.config.cjs`
(a PM2 config for Genspark's sandbox) which can be deleted.

Live row counts on 2026-09-24 (your baseline for "nothing was lost"):

| table | rows | | table | rows |
|---|---|---|---|---|
| settings | 1 | | bb_menu | 172 |
| employees | 19 | | bb_entries | 9 |
| inventory | 111 | | fin_entries | 207 |
| inv_logs | 190 | | app_users | 17 |
| orders | 6 | | push_subscriptions | 25 |
| reservations | 5 | | suppliers | 4 |
| tasks | 59 | | absences | **table does not exist** (see step 1c) |
| shifts | 3393 | | | |

---

## 1. Secure the data (do this first, before anything else)

### 1a. Backup — DONE, and repeatable
A full JSON backup of every table was taken on 2026-09-24 and sent to you as a zip.
Store it somewhere safe (it contains the admin/finance PINs and user password hashes).

To take a fresh backup at any time (do it again right before cutover):

```bash
npm install
node scripts/backup-supabase.mjs
# writes backups/<timestamp>/<table>.json + _summary.json  (folder is git-ignored)
```

### 1b. Find out who owns the Supabase project
The app's database is project ref **`eurcdnyhwqofnddhxrpf`**. It is **not** in the Supabase
account connected to this session (that account only has "Inventario" and "valentinas-fb").
So it is in one of:

1. another Supabase account/organisation of yours (other email, or an org you were invited to), or
2. an account Genspark created/controls.

How to check: open https://supabase.com/dashboard/project/eurcdnyhwqofnddhxrpf while logged in
with every email you have. If it opens and you can see **Project Settings → General**, you own it
(or are a member). If every account says "project not found", it is under Genspark → go to step 3B.

### 1c. Create the missing `absences` table (also proves you have SQL access)
Absences added in the app are currently only saved in the browser of the device that added them,
because the table was never created. Run this in the SQL editor of the project:

```sql
CREATE TABLE IF NOT EXISTS absences (
  id TEXT PRIMARY KEY,
  employee TEXT NOT NULL,
  date DATE NOT NULL,
  week_start DATE NOT NULL,
  justified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE absences ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS allow_all ON absences;
CREATE POLICY allow_all ON absences FOR ALL TO anon USING (true) WITH CHECK (true);
```

It only creates an empty table; existing data is not touched. From then on new absences are saved
to Supabase. Absences already recorded on a device are **not** uploaded automatically; if there are
any that matter, re-enter them after the table exists (or ask for a one-time upload feature).

---

## 2. Make sure GitHub has the complete, latest code

Genspark works in its own sandbox and pushes to GitHub when told to. Before leaving:

1. In Genspark, ask it to commit and push **all** pending changes to `main` one last time.
2. Compare: open the live Genspark URL of the app and check the newest feature you asked for is
   in this repo's latest commit (`git log` — currently the last commit is the Daily Entry date-picker fix).
3. Ask Genspark for the values it deployed with, if any: Cloudflare account/project name and any
   environment variables. (This app has none today; everything is hard-coded.)

From here on, treat GitHub `main` as the only source of truth.

---

## 3. Database: keep it or clone it

### 3A. You own the Supabase project → keep it, nothing to migrate
- If it sits in an organisation you want to leave, use **Project Settings → General → Transfer project**
  to move it to your own organisation. The URL and keys do not change, so the app keeps working.
- Skip to step 4.

### 3B. Genspark owns the project → clone it into your own project (zero-downtime, reversible)
1. Create a new Supabase project in your account (region `eu-west-1`, same as your others).
2. In its SQL editor run **`supabase/full_schema.sql`** from this repo (all tables + columns +
   policies, no seed data).
3. Take a fresh backup of the old project (step 1a).
4. Restore it into the new project:
   ```bash
   SB_URL=https://<new-ref>.supabase.co SB_KEY=<new anon key> \
   node scripts/restore-supabase.mjs backups/<timestamp>
   ```
   The script prints, per table, `backup N rows -> target now has N OK`. Every line must say OK.
5. Point the app at the new project: replace the `SB_URL` / `SB_KEY` values in `src/html.ts`
   (line ~1678) **and** `src/index.tsx` (line ~14), plus the two dashboard links in `src/html.ts`.
   Deploy (step 5) and test with real usage for a day.
6. Because staff may keep using the old URL while you test, re-run backup + restore once more
   right before you switch everyone over. Restore is an upsert, so it is safe to repeat.
7. Do **not** delete or pause the old project until step 8.

---

## 4. Prepare the code for your own hosting — DONE on this branch

- The VAPID private key is no longer in the source. It is read from the `VAPID_PRIVATE` environment
  variable (Cloudflare Pages → Settings → Variables and Secrets). Supabase URL/key and the VAPID
  public key keep built-in defaults and can be overridden the same way. Keep the **same VAPID keys**.
- `ecosystem.config.cjs` (Genspark sandbox only) deleted; project renamed from `webapp` to `bardapraia`.
- `.dev.vars.example` documents the variables; `README.md` has the deploy steps.
- Note: the private key remains in the git history of earlier commits. Rotating it would invalidate all
  push subscriptions, so it stays; the repo should simply remain private.

Optional later: a `manifest.json` + icons so the app installs to the home screen on the new domain.

---

## 5. Deploy under your own account — decision: Cloudflare Pages

### Option A — Cloudflare Pages (chosen)
The app is already built for it, so no code changes are needed.
1. https://dash.cloudflare.com → Workers & Pages → Create → Pages → Connect to Git → pick `GMariares/BardaPraia`.
2. Build settings: framework **None**, build command `npm run build`, output directory `dist`.
3. Add `VAPID_PRIVATE` (encrypted secret) with the existing key value.
4. Deploy. You get `https://<project>.pages.dev`. Every push to `main` redeploys automatically.

### Option B — Vercel
1. https://vercel.com/new → import `GMariares/BardaPraia`.
2. Needs the adapter change from step 4 first (`@hono/vite-build/vercel`), otherwise the build
   output is a Cloudflare worker Vercel cannot run.
3. Add environment variables, deploy, get `https://<project>.vercel.app`.

Pick Cloudflare unless you already pay for / prefer Vercel. Both are free at this app's size.

---

## 6. Custom domain
1. Buy the domain (Cloudflare Registrar is simplest if you go with Cloudflare; any registrar works).
2. Cloudflare Pages: project → Custom domains → add `app.yourdomain.com` (it creates the DNS record
   for you if the domain is on Cloudflare; otherwise add the CNAME it shows).
   Vercel: project → Settings → Domains → add the domain → create the CNAME/A record it shows.
3. Wait for the certificate (minutes), open the domain, log in, check every tab.
4. Push notifications require HTTPS, which both providers give you automatically.

---

## 7. Cutover checklist (the day you switch staff to the new address)

The browser storage is tied to the address, so on the **new** domain every device starts empty
and reloads from Supabase. Consequences:

- Everyone has to **log in again** (user accounts are in Supabase, nothing is lost).
- Everyone has to **enable notifications again** on the new domain (tap the bell / allow). Old
  subscriptions keep pointing at the old address.
- "Tips locked" flags per week (`tipsLocked`) live **only** in the browser; they reset on the new
  domain. Weekly tip amounts themselves are in Supabase and are kept.
- Absences: see step 1c.

Order of operations:
1. Fresh backup (step 1a). If you cloned the DB (3B), run the restore once more.
2. Announce the new address, ask staff to log in there and re-enable notifications.
3. Run `node scripts/backup-supabase.mjs` again the next day and compare `_summary.json` row
   counts with the baseline table above — they must be equal or higher.
4. Keep the Genspark URL alive but unused for at least a week.

---

## 8. Unlink Genspark (last, after a week of clean running on the new domain)
1. In Genspark: remove the GitHub connection / revoke its access token
   (GitHub → Settings → Applications → Authorized OAuth/GitHub Apps → revoke Genspark).
2. If Genspark had a Cloudflare API token of yours, delete it in Cloudflare → My Profile → API Tokens.
3. Delete the project/sandbox in Genspark.
4. Only if step 3B applied and the new project has been in use for a week with matching row
   counts: pause the old Supabase project (do not delete; pausing is reversible).

Rollback at any point before step 8: the old Genspark URL and old Supabase project are untouched,
so switching staff back to the old address restores everything.

---

## Reference: files added for this migration
- `scripts/backup-supabase.mjs` — full JSON backup of all tables (paginated, verified counts).
- `scripts/restore-supabase.mjs` — upsert a backup into any Supabase project, prints per-table verification.
- `supabase/full_schema.sql` — complete schema for a fresh project (base + all in-app migrations, no seed rows).
- `backups/` — git-ignored; never commit backups, they contain PINs and password hashes.
