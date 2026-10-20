-- Item Sales (Accounting → Item Sales)
-- 1. Menu items keep a log of their price changes, each with the date it is valid from:
--    [{ "from": "2026-03-01", "price": 3.5, "prev": 3, "at": "2026-10-20T10:00:00Z", "by": "Zé Rui" }, …]
--    Black Box days already keep the price they were saved with; the log decides the price for a day saved later.
ALTER TABLE bb_menu ADD COLUMN IF NOT EXISTS price_history JSONB NOT NULL DEFAULT '[]'::jsonb;

-- 2. Sales typed by hand or loaded from a file, per item and month (Black Box days are added on top in the app).
--    qty = units, price = the price used, amount = € (kept as saved: a later price change does not alter it).
CREATE TABLE IF NOT EXISTS item_sales (
  id TEXT PRIMARY KEY,
  year INT NOT NULL,
  month INT NOT NULL CHECK (month BETWEEN 1 AND 12),
  item_id TEXT NOT NULL DEFAULT '',
  name TEXT NOT NULL DEFAULT '',
  category TEXT DEFAULT '',
  qty NUMERIC NOT NULL DEFAULT 0,
  price NUMERIC NOT NULL DEFAULT 0,
  amount NUMERIC NOT NULL DEFAULT 0,
  source TEXT NOT NULL DEFAULT 'manual',   -- 'manual' or 'file'
  note TEXT DEFAULT '',
  created_by TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS item_sales_period ON item_sales (year, month);

-- Admins only, like the rest of Accounting
ALTER TABLE item_sales ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS admin_only ON item_sales;
CREATE POLICY admin_only ON item_sales FOR ALL TO authenticated
  USING (public.app_has_role('admin')) WITH CHECK (public.app_has_role('admin'));
REVOKE ALL ON item_sales FROM anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON item_sales TO authenticated;
