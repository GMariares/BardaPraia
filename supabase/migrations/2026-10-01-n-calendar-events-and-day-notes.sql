-- 1. Calendar events (meetings, opening-hours changes, events…) shown on the Reservations calendar.
--    Everyone on the staff sees them; admins and shift managers add, change and remove them.
--    attendees = app_users ids who are in it (everyone = true means the whole team).
CREATE TABLE IF NOT EXISTS cal_events (
  id TEXT PRIMARY KEY,
  kind TEXT NOT NULL DEFAULT 'meeting',
  title TEXT NOT NULL,
  date DATE NOT NULL,
  all_day BOOLEAN NOT NULL DEFAULT false,
  start_time TEXT DEFAULT '',
  end_time TEXT DEFAULT '',
  everyone BOOLEAN NOT NULL DEFAULT false,
  attendees JSONB NOT NULL DEFAULT '[]'::jsonb,
  notes TEXT DEFAULT '',
  created_by TEXT DEFAULT '',
  created_by_id TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS cal_events_date ON cal_events (date);

ALTER TABLE cal_events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS staff_read ON cal_events;
DROP POLICY IF EXISTS managers_write ON cal_events;
CREATE POLICY staff_read ON cal_events FOR SELECT TO authenticated USING (public.is_staff());
CREATE POLICY managers_write ON cal_events FOR ALL TO authenticated
  USING (public.app_has_role('admin') OR public.app_has_role('shift_mgr'))
  WITH CHECK (public.app_has_role('admin') OR public.app_has_role('shift_mgr'));
REVOKE ALL ON cal_events FROM anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON cal_events TO authenticated;

-- 2. Finance daily entry: optional notes for the day
ALTER TABLE fin_entries ADD COLUMN IF NOT EXISTS day_notes TEXT DEFAULT '';
