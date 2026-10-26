-- Calendar on the phone: each person's private link to their shifts / events (one way, app → phone).
-- Only the server reads and writes this table (with the service key); the app asks /api/cal/me.
CREATE TABLE IF NOT EXISTS cal_feeds (
  token TEXT PRIMARY KEY,                       -- the secret part of the link
  app_user_id TEXT NOT NULL UNIQUE,             -- one link per person
  shifts BOOLEAN NOT NULL DEFAULT true,
  events BOOLEAN NOT NULL DEFAULT true,
  reservations BOOLEAN NOT NULL DEFAULT false,  -- admins and shift managers only
  lang TEXT NOT NULL DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT now(),
  last_used_at TIMESTAMPTZ
);
ALTER TABLE cal_feeds ENABLE ROW LEVEL SECURITY;   -- no policies: nobody but the server can read the links
REVOKE ALL ON cal_feeds FROM anon, authenticated;
