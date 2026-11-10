-- Closed days (Settings → Closed days): weekdays the restaurant is closed every week, and closed periods.
--   { "weekdays": [1], "periods": [{ "id": "…", "from": "2026-12-24", "to": "2026-12-26", "note": "Christmas" }] }
-- Everyone signed in may read it (Shifts, Finance); the app lets only admins change it.
ALTER TABLE settings ADD COLUMN IF NOT EXISTS closures JSONB DEFAULT '{}'::jsonb;
GRANT SELECT (closures), UPDATE (closures) ON settings TO authenticated;
