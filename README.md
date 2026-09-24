# Bar da Praia

Staff app for Bar da Praia: inventory, orders, suppliers, reservations, tasks, shifts, tips, finance and the
"Black Box" daily sales. Built with [Hono](https://hono.dev) and deployed as a **Cloudflare Worker** (with static assets).
Data lives in Supabase (project `eurcdnyhwqofnddhxrpf`); the browser keeps a local cache only.

## Development

```bash
npm install
cp .dev.vars.example .dev.vars   # fill in VAPID_PRIVATE
npm run build && npm run preview  # http://localhost:8787 (wrangler dev)
```

`npm run dev` runs the Vite dev server without Cloudflare bindings (push notifications disabled).

## Configuration

Set in Cloudflare dashboard → Workers & Pages → `bardapraia` → Settings → Variables and Secrets:

| Variable | Required | Notes |
|---|---|---|
| `VAPID_PRIVATE` | **yes** (secret) | Private key for Web Push. Must be the existing key; changing it breaks every push subscription. |
| `SB_URL`, `SB_KEY` | no | Supabase URL and anon key. Defaults built in. |
| `VAPID_PUBLIC`, `VAPID_SUBJECT` | no | Defaults built in. Must match the private key. |

## Deploy (Cloudflare Workers, Git integration)

1. Cloudflare dashboard → Workers & Pages → Create → Workers → Import a repository → `GMariares/BardaPraia`.
2. Build command `npm run build`, deploy command `npx wrangler deploy` (the defaults), production branch `main`.
3. Settings → Variables and Secrets → add `VAPID_PRIVATE` as a secret. Every push to `main` redeploys.
4. Custom domain: Settings → Domains & Routes → Add → Custom domain.

Manual deploy from a machine with a Cloudflare login: `npm run deploy`.

## Database

- `supabase/full_schema.sql` — complete schema (run on a fresh project, or re-run safely on the existing one).
- `node scripts/backup-supabase.mjs` — full JSON backup of every table into `backups/` (git-ignored).
- `SB_URL=… SB_KEY=… node scripts/restore-supabase.mjs backups/<dir>` — restore into a project.

See `MIGRATION.md` for the plan to move hosting off Genspark.
