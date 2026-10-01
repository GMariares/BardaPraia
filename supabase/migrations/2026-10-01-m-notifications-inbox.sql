-- Notifications inbox: every notification the app sends is also kept here, so people
-- see what came in while they were away or logged off (Home screen → Notifications).
-- Rows are written by the server only; each person reads, marks read and clears their own.
CREATE TABLE IF NOT EXISTS notifications (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT DEFAULT '',
  url TEXT DEFAULT '/',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  read_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS notifications_user_created ON notifications (user_id, created_at DESC);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS own_select ON notifications;
DROP POLICY IF EXISTS own_update ON notifications;
DROP POLICY IF EXISTS own_delete ON notifications;
CREATE POLICY own_select ON notifications FOR SELECT TO authenticated
  USING (public.is_staff() AND user_id = public.app_meta() ->> 'app_user_id');
CREATE POLICY own_update ON notifications FOR UPDATE TO authenticated
  USING (public.is_staff() AND user_id = public.app_meta() ->> 'app_user_id')
  WITH CHECK (public.is_staff() AND user_id = public.app_meta() ->> 'app_user_id');
CREATE POLICY own_delete ON notifications FOR DELETE TO authenticated
  USING (public.is_staff() AND user_id = public.app_meta() ->> 'app_user_id');

REVOKE ALL ON notifications FROM anon, authenticated;
GRANT SELECT, DELETE ON notifications TO authenticated;
GRANT UPDATE (read_at) ON notifications TO authenticated;
