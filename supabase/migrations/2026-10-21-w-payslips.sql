-- Payslips (Accounting → Payslips)
-- Admins upload payslips (one PDF per person, or one PDF with everyone that the app splits per person).
-- Each person sees only their own, and only the latest 3 months; older ones stay stored here.

-- 1. The number printed on the payslip for each person, so a payslip finds its owner
ALTER TABLE app_users ADD COLUMN IF NOT EXISTS employee_no TEXT DEFAULT '';

-- 2. One row per payslip file
CREATE TABLE IF NOT EXISTS payslips (
  id TEXT PRIMARY KEY,
  app_user_id TEXT NOT NULL,
  employee_no TEXT DEFAULT '',
  name TEXT DEFAULT '',
  period TEXT NOT NULL,                 -- 'YYYY-MM', the month the payslip is for
  path TEXT NOT NULL,                   -- file in the private 'payslips' bucket: <app_user_id>/<period>-<id>.pdf
  size INT DEFAULT 0,
  pages INT DEFAULT 1,
  uploaded_by TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS payslips_user_period ON payslips (app_user_id, period DESC);

-- The payslips the signed-in person may see: their latest 3 months (the newest file of each month)
CREATE OR REPLACE FUNCTION public.my_payslips() RETURNS TABLE (id TEXT, path TEXT)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT x.id, x.path FROM (
    SELECT DISTINCT ON (p.period) p.id, p.path, p.period
    FROM payslips p
    WHERE p.app_user_id = public.app_meta() ->> 'app_user_id'
    ORDER BY p.period, p.created_at DESC
  ) x ORDER BY x.period DESC LIMIT 3
$$;
REVOKE ALL ON FUNCTION public.my_payslips() FROM anon;
GRANT EXECUTE ON FUNCTION public.my_payslips() TO authenticated;

ALTER TABLE payslips ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS admin_all ON payslips;
CREATE POLICY admin_all ON payslips FOR ALL TO authenticated
  USING (public.app_has_role('admin')) WITH CHECK (public.app_has_role('admin'));
DROP POLICY IF EXISTS own_latest ON payslips;
CREATE POLICY own_latest ON payslips FOR SELECT TO authenticated
  USING (public.is_staff() AND id IN (SELECT m.id FROM public.my_payslips() m));
REVOKE ALL ON payslips FROM anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON payslips TO authenticated;

-- 3. Private bucket for the files (10 MB each): admins do everything, a person may open their latest 3
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('payslips', 'payslips', false, 10485760, ARRAY['application/pdf','image/jpeg','image/png','image/webp'])
ON CONFLICT (id) DO NOTHING;
DROP POLICY IF EXISTS payslips_admin ON storage.objects;
CREATE POLICY payslips_admin ON storage.objects FOR ALL TO authenticated
  USING (bucket_id = 'payslips' AND public.app_has_role('admin'))
  WITH CHECK (bucket_id = 'payslips' AND public.app_has_role('admin'));
DROP POLICY IF EXISTS payslips_own ON storage.objects;
CREATE POLICY payslips_own ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'payslips' AND public.is_staff() AND name IN (SELECT m.path FROM public.my_payslips() m));
