-- Clock in / out: staff scan the printed QR on the wall when they arrive and leave.
-- A separate log from the rota and the hours counted elsewhere. Written by the server;
-- each person reads their own events, admins read everything (Shifts → Clock).
CREATE TABLE IF NOT EXISTS clock_events (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  employee TEXT NOT NULL DEFAULT '',
  kind TEXT NOT NULL CHECK (kind IN ('in','out')),
  at TIMESTAMPTZ NOT NULL DEFAULT now(),
  day DATE NOT NULL,
  note TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS clock_events_day ON clock_events (day, employee);
CREATE INDEX IF NOT EXISTS clock_events_user ON clock_events (user_id, at DESC);

ALTER TABLE clock_events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS own_select ON clock_events;
CREATE POLICY own_select ON clock_events FOR SELECT TO authenticated
  USING (public.is_staff() AND (user_id = public.app_meta() ->> 'app_user_id' OR public.app_has_role('admin')));
DROP POLICY IF EXISTS admin_write ON clock_events;
CREATE POLICY admin_write ON clock_events FOR ALL TO authenticated
  USING (public.app_has_role('admin')) WITH CHECK (public.app_has_role('admin'));
REVOKE ALL ON clock_events FROM anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON clock_events TO authenticated;

-- Shift reminders already sent (so the 5-minute job never sends one twice). Server only.
CREATE TABLE IF NOT EXISTS clock_reminders (
  shift_id TEXT NOT NULL,
  kind TEXT NOT NULL,
  sent_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (shift_id, kind)
);
ALTER TABLE clock_reminders ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON clock_reminders FROM anon, authenticated;
