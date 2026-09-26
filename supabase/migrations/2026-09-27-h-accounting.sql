-- Accounting: every amount (wage part, supplier invoice, fixed cost, daily expense, imported sale)
-- is one row. kind = wage | supplier | fixed | expense | revenue; line = person / supplier / cost line /
-- category / till; part = payslip | ticket | cash | extras (wages only).
CREATE TABLE IF NOT EXISTS acc_entries (
  id TEXT PRIMARY KEY,
  year INT NOT NULL,
  month INT NOT NULL CHECK (month BETWEEN 1 AND 12),
  kind TEXT NOT NULL,
  line TEXT NOT NULL DEFAULT '',
  part TEXT DEFAULT '',
  date DATE,
  amount NUMERIC NOT NULL DEFAULT 0,
  note TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS acc_entries_year_kind ON acc_entries (year, kind);
ALTER TABLE acc_entries ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS allow_all ON acc_entries;
CREATE POLICY allow_all ON acc_entries FOR ALL TO anon USING (true) WITH CHECK (true);

-- Cost lines, expense categories, "% of revenue" wage rules and the turnover history
ALTER TABLE settings ADD COLUMN IF NOT EXISTS accounting JSONB DEFAULT '{}'::jsonb;
