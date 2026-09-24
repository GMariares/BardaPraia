# Bar da Praia

Staff app for Bar da Praia: inventory, orders, suppliers, reservations, tasks, shifts, tips, finance and the
"Black Box" daily sales. Built with [Hono](https://hono.dev) and deployed on **Cloudflare Pages**.
Data lives in Supabase (project `eurcdnyhwqofnddhxrpf`); the browser keeps a local cache only.

## Development

```bash
npm install
cp .dev.vars.example .dev.vars   # fill in VAPID_PRIVATE
npm run build && npm run preview  # http://localhost:8788 (wrangler pages dev)
```

`npm run dev` runs the Vite dev server without Cloudflare bindings (push notifications disabled).

## Configuration

Set in Cloudflare Pages → Settings → Variables and Secrets (production and preview):

| Variable | Required | Notes |
|---|---|---|
| `VAPID_PRIVATE` | **yes** (secret) | Private key for Web Push. Must be the existing key; changing it breaks every push subscription. |
| `SB_URL`, `SB_KEY` | no | Supabase URL and anon key. Defaults built in. |
| `VAPID_PUBLIC`, `VAPID_SUBJECT` | no | Defaults built in. Must match the private key. |

## Deploy (Cloudflare Pages, Git integration)

1. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → `GMariares/BardaPraia`.
2. Production branch `main`, framework preset **None**, build command `npm run build`, output directory `dist`.
3. Add `VAPID_PRIVATE` as an encrypted secret, then deploy. Every push to `main` redeploys.

Manual deploy from a machine with a Cloudflare login: `npm run deploy`.

## Database

- `supabase/full_schema.sql` — complete schema (run on a fresh project, or re-run safely on the existing one).
- `node scripts/backup-supabase.mjs` — full JSON backup of every table into `backups/` (git-ignored).
- `SB_URL=… SB_KEY=… node scripts/restore-supabase.mjs backups/<dir>` — restore into a project.

See `MIGRATION.md` for the plan to move hosting off Genspark.
