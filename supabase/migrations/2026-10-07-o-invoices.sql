-- Invoices (Accounting → Invoices): supplier invoices with the photo, net / VAT / total and a paid tick.
-- Admins only, like the rest of Accounting.

-- Suppliers get a tax number, so an invoice's QR code can find the supplier (used from step 2 on)
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS nif TEXT DEFAULT '';

CREATE TABLE IF NOT EXISTS invoices (
  id TEXT PRIMARY KEY,
  supplier_id TEXT DEFAULT '',
  supplier_name TEXT NOT NULL DEFAULT '',
  supplier_nif TEXT DEFAULT '',
  number TEXT DEFAULT '',
  date DATE NOT NULL,
  due_date DATE,
  net NUMERIC,
  vat NUMERIC,
  total NUMERIC NOT NULL DEFAULT 0,
  paid BOOLEAN NOT NULL DEFAULT false,
  paid_at DATE,
  notes TEXT DEFAULT '',
  photo_path TEXT DEFAULT '',
  source TEXT DEFAULT 'manual',
  created_by TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS invoices_supplier ON invoices (supplier_id, date DESC);
CREATE INDEX IF NOT EXISTS invoices_paid ON invoices (paid, due_date);

ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS admin_only ON invoices;
CREATE POLICY admin_only ON invoices FOR ALL TO authenticated
  USING (public.app_has_role('admin')) WITH CHECK (public.app_has_role('admin'));
REVOKE ALL ON invoices FROM anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON invoices TO authenticated;

-- Private bucket for the photos / PDFs (10 MB each), admins only
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('invoices', 'invoices', false, 10485760, ARRAY['image/jpeg','image/png','image/webp','application/pdf'])
ON CONFLICT (id) DO NOTHING;
DROP POLICY IF EXISTS invoices_admin ON storage.objects;
CREATE POLICY invoices_admin ON storage.objects FOR ALL TO authenticated
  USING (bucket_id = 'invoices' AND public.app_has_role('admin'))
  WITH CHECK (bucket_id = 'invoices' AND public.app_has_role('admin'));
