-- Reputation: ratings and reviews from Google (and later Tripadvisor, TheFork, Facebook).
-- The server writes these (daily check + "Refresh now"); admins read them in the app.

-- One row per platform: which place it is and the latest rating / number of reviews
CREATE TABLE IF NOT EXISTS rep_platforms (
  id TEXT PRIMARY KEY,                 -- 'google' (later 'tripadvisor', 'thefork', 'facebook')
  place_id TEXT DEFAULT '',
  name TEXT DEFAULT '',
  address TEXT DEFAULT '',
  url TEXT DEFAULT '',
  rating NUMERIC,
  review_count INT,
  fetched_at TIMESTAMPTZ,
  fetch_error TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT now()
);
-- The rating and number of reviews each day (for the trend)
CREATE TABLE IF NOT EXISTS rep_snapshots (
  id TEXT PRIMARY KEY,                 -- '<platform>:<YYYY-MM-DD>'
  platform TEXT NOT NULL,
  day DATE NOT NULL,
  rating NUMERIC,
  review_count INT,
  source TEXT DEFAULT 'auto'           -- 'auto' or 'manual'
);
CREATE INDEX IF NOT EXISTS rep_snapshots_platform_day ON rep_snapshots (platform, day);
-- Reviews as they were read (Google gives up to 5 per check; new ones are added)
CREATE TABLE IF NOT EXISTS rep_reviews (
  id TEXT PRIMARY KEY,                 -- '<platform>:<review id>'
  platform TEXT NOT NULL,
  author TEXT DEFAULT '',
  author_url TEXT DEFAULT '',
  photo_url TEXT DEFAULT '',
  rating NUMERIC,
  text TEXT DEFAULT '',
  lang TEXT DEFAULT '',
  original_text TEXT DEFAULT '',
  original_lang TEXT DEFAULT '',
  published_at TIMESTAMPTZ,
  url TEXT DEFAULT '',
  first_seen TIMESTAMPTZ DEFAULT now(),
  handled BOOLEAN NOT NULL DEFAULT false
);
CREATE INDEX IF NOT EXISTS rep_reviews_platform_published ON rep_reviews (platform, published_at DESC);

DO $$
DECLARE t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY['rep_platforms', 'rep_snapshots', 'rep_reviews'] LOOP
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('DROP POLICY IF EXISTS admin_only ON %I', t);
    EXECUTE format('CREATE POLICY admin_only ON %I FOR ALL TO authenticated USING (public.app_has_role(''admin'')) WITH CHECK (public.app_has_role(''admin''))', t);
    EXECUTE format('REVOKE ALL ON %I FROM anon', t);
    EXECUTE format('GRANT SELECT, INSERT, UPDATE, DELETE ON %I TO authenticated', t);
  END LOOP;
END $$;
