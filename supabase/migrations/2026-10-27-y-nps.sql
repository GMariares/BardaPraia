-- Guest feedback (NPS): answers from the public page /feedback (QR on the tables / bill, or a link after a reservation).
-- The server saves them; only admins can read them in the app (Reputation → NPS).
CREATE TABLE IF NOT EXISTS nps_responses (
  id TEXT PRIMARY KEY,
  score INT NOT NULL CHECK (score BETWEEN 0 AND 10),
  comment TEXT DEFAULT '',
  source TEXT NOT NULL DEFAULT 'link',      -- 'qr' (table / bill), 'res' (link after a reservation), 'link'
  table_name TEXT DEFAULT '',
  reservation_id TEXT DEFAULT '',
  guest_name TEXT DEFAULT '',
  visit_date DATE,
  lang TEXT DEFAULT 'pt',
  followed_up BOOLEAN NOT NULL DEFAULT false,   -- an admin dealt with it (for low scores)
  followed_up_by TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS nps_responses_created ON nps_responses (created_at DESC);
CREATE INDEX IF NOT EXISTS nps_responses_reservation ON nps_responses (reservation_id);

ALTER TABLE nps_responses ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS admin_only ON nps_responses;
CREATE POLICY admin_only ON nps_responses FOR ALL TO authenticated
  USING (public.app_has_role('admin')) WITH CHECK (public.app_has_role('admin'));
REVOKE ALL ON nps_responses FROM anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON nps_responses TO authenticated;
