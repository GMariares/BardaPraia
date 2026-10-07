-- ============================================================
-- Bar da Praia — COMPLETE schema (base tables + every in-app migration)
-- Safe to run repeatedly (IF NOT EXISTS / ADD COLUMN IF NOT EXISTS).
-- Contains NO seed data on purpose: use scripts/restore-supabase.mjs
-- to load a real backup after running this on a fresh project.
-- ============================================================

-- Settings (single-row config)
CREATE TABLE IF NOT EXISTS settings (
  id TEXT PRIMARY KEY DEFAULT 'config',
  admin_pin TEXT NOT NULL DEFAULT '1234',
  tables JSONB NOT NULL DEFAULT '["T1","T2","T3","T4","T5","T6","T7","T8","T9","T10"]'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE settings ADD COLUMN IF NOT EXISTS finance_pin    TEXT DEFAULT '0000';
ALTER TABLE settings ADD COLUMN IF NOT EXISTS fundo_caixa    NUMERIC DEFAULT 0;
ALTER TABLE settings ADD COLUMN IF NOT EXISTS budgets        JSONB DEFAULT '{}'::jsonb;
ALTER TABLE settings ADD COLUMN IF NOT EXISTS week_tips      JSONB DEFAULT '{}'::jsonb;
ALTER TABLE settings ADD COLUMN IF NOT EXISTS inv_sort_order JSONB DEFAULT '[]'::jsonb;
ALTER TABLE settings ADD COLUMN IF NOT EXISTS tip_splits     JSONB DEFAULT '{}'::jsonb;
ALTER TABLE settings ADD COLUMN IF NOT EXISTS areas          JSONB DEFAULT '[]'::jsonb;
ALTER TABLE settings ADD COLUMN IF NOT EXISTS week_notices   JSONB DEFAULT '{}'::jsonb;
ALTER TABLE settings ADD COLUMN IF NOT EXISTS accounting     JSONB DEFAULT '{}'::jsonb;

CREATE TABLE IF NOT EXISTS employees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS suppliers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  total_spend NUMERIC DEFAULT 0,
  send_email BOOLEAN DEFAULT false,
  categories JSONB DEFAULT '[]'::jsonb,
  nif TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'other',
  unit TEXT DEFAULT '',
  qty_bar INTEGER NOT NULL DEFAULT 0,
  qty_storage INTEGER NOT NULL DEFAULT 0,
  minimum INTEGER NOT NULL DEFAULT 10,
  last_employee TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE inventory ADD COLUMN IF NOT EXISTS supplier_id TEXT DEFAULT NULL REFERENCES suppliers(id) ON DELETE SET NULL;

CREATE TABLE IF NOT EXISTS inv_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action TEXT NOT NULL,
  item TEXT NOT NULL,
  employee TEXT DEFAULT 'System',
  qty_bar INTEGER DEFAULT 0,
  qty_storage INTEGER DEFAULT 0,
  timestamp TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  status TEXT NOT NULL DEFAULT 'standby',
  date TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS supplier_id TEXT DEFAULT NULL;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS amount NUMERIC DEFAULT 0;

CREATE TABLE IF NOT EXISTS reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name TEXT NOT NULL,
  phone TEXT DEFAULT '',
  date DATE NOT NULL,
  time TIME NOT NULL,
  guests INTEGER NOT NULL DEFAULT 2,
  tables JSONB NOT NULL DEFAULT '[]'::jsonb,
  notes TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE reservations ADD COLUMN IF NOT EXISTS end_time TIME;

CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  category TEXT DEFAULT 'other',
  priority TEXT DEFAULT 'medium',
  status TEXT DEFAULT 'pending',
  assigned_to TEXT DEFAULT '',
  deadline DATE,
  done_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS recurrence TEXT DEFAULT NULL;

CREATE TABLE IF NOT EXISTS shifts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee TEXT NOT NULL,
  day TEXT NOT NULL,
  week_start DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  role TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE shifts ADD COLUMN IF NOT EXISTS day_off BOOLEAN DEFAULT false;
ALTER TABLE shifts ADD COLUMN IF NOT EXISTS zone TEXT DEFAULT '';
ALTER TABLE shifts ADD COLUMN IF NOT EXISTS late_minutes INTEGER NOT NULL DEFAULT 0;
ALTER TABLE shifts ADD COLUMN IF NOT EXISTS overtime_minutes INTEGER NOT NULL DEFAULT 0;
ALTER TABLE shifts ADD COLUMN IF NOT EXISTS section TEXT DEFAULT '';
-- one shift per person per day (see supabase/migrations/2026-09-25-b-one-shift-per-day.sql)
CREATE UNIQUE INDEX IF NOT EXISTS shifts_one_per_person_per_day ON shifts (employee, week_start, day);

CREATE TABLE IF NOT EXISTS bb_menu (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  category TEXT DEFAULT 'other',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS bb_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL UNIQUE,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  total NUMERIC(10,2) NOT NULL DEFAULT 0,
  saved_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS fin_entries (
  id TEXT PRIMARY KEY,
  date DATE NOT NULL UNIQUE,
  t51 NUMERIC DEFAULT 0,
  multibanco NUMERIC DEFAULT 0,
  total_day NUMERIC DEFAULT 0,
  invoiced NUMERIC DEFAULT 0,
  gen_expenses NUMERIC DEFAULT 0,
  tips NUMERIC DEFAULT 0,
  entregar NUMERIC DEFAULT 0,
  cash_notes NUMERIC DEFAULT 0,
  coins NUMERIC DEFAULT 0,
  surf NUMERIC DEFAULT 0,
  cash_diff NUMERIC DEFAULT 0,
  day_notes TEXT DEFAULT '',
  saved_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS app_users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  roles JSONB DEFAULT '[]',
  contract_start DATE,
  contract_end DATE,
  hours TEXT,
  amount NUMERIC,
  discount NUMERIC,
  insurance TEXT,
  cloth_size TEXT,
  notes TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE app_users ADD COLUMN IF NOT EXISTS employee TEXT DEFAULT '';

CREATE TABLE IF NOT EXISTS push_subscriptions (
  user_id TEXT NOT NULL,
  endpoint TEXT PRIMARY KEY,
  p256dh TEXT NOT NULL,
  auth TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS absences (
  id TEXT PRIMARY KEY,
  employee TEXT NOT NULL,
  date DATE NOT NULL,
  week_start DATE NOT NULL,
  justified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Food cost (see supabase/migrations/2026-09-27-i-food-cost.sql)
CREATE TABLE IF NOT EXISTS fc_ingredients (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  unit TEXT NOT NULL DEFAULT 'kg',
  price NUMERIC NOT NULL DEFAULT 0,
  yield_pct NUMERIC NOT NULL DEFAULT 100,
  supplier TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT now()
);
CREATE TABLE IF NOT EXISTS fc_recipes (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT DEFAULT '',
  price NUMERIC DEFAULT 0,
  vat NUMERIC DEFAULT 13,
  portions NUMERIC DEFAULT 1,
  lines JSONB NOT NULL DEFAULT '[]'::jsonb,
  notes TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Accounting (see supabase/migrations/2026-09-27-h-accounting.sql)
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

-- Shift change requests (see supabase/migrations/2026-09-26-e-shift-requests.sql)
CREATE TABLE IF NOT EXISTS shift_requests (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  kind TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  requester TEXT NOT NULL,
  requester_user_id TEXT,
  week_start DATE NOT NULL,
  day TEXT NOT NULL,
  shift_id TEXT,
  shift_snapshot JSONB,
  new_start TEXT,
  new_end TEXT,
  colleague TEXT,
  colleague_snapshot JSONB,
  note TEXT DEFAULT '',
  decided_by TEXT,
  decided_at TIMESTAMPTZ,
  decision_note TEXT DEFAULT ''
);
CREATE INDEX IF NOT EXISTS shift_requests_week ON shift_requests (week_start);

-- Shopping list: things outside the stock (approved / bought ticked by admins;
-- the guard trigger that enforces that lives in migrations/2026-10-01-l-shopping-list.sql)
CREATE TABLE IF NOT EXISTS shopping_items (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  link TEXT DEFAULT '',
  price NUMERIC,
  notes TEXT DEFAULT '',
  requested_by TEXT DEFAULT '',
  requested_by_id TEXT DEFAULT '',
  approved BOOLEAN NOT NULL DEFAULT false,
  approved_by TEXT DEFAULT '',
  approved_at TIMESTAMPTZ,
  bought BOOLEAN NOT NULL DEFAULT false,
  bought_by TEXT DEFAULT '',
  bought_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Calendar events (policies in migrations/2026-10-01-n-calendar-events-and-day-notes.sql)
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

-- Supplier invoices with photo (policies and the storage bucket in migrations/2026-10-07-o-invoices.sql)
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

-- Notifications inbox (written by the server; per-person policies in migrations/2026-10-01-m-notifications-inbox.sql)
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

-- Row Level Security: open access with the anon key (the app does its own login)
DO $$
DECLARE t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY['settings','employees','suppliers','inventory','inv_logs','orders',
                           'reservations','tasks','shifts','bb_menu','bb_entries','fin_entries',
                           'app_users','push_subscriptions','absences','shift_requests','acc_entries','fc_ingredients','fc_recipes','shopping_items','notifications','cal_events','invoices']
  LOOP
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('DROP POLICY IF EXISTS allow_all ON %I', t);
    EXECUTE format('DROP POLICY IF EXISTS allow_all_%s ON %I', t, t);
    EXECUTE format('CREATE POLICY allow_all ON %I FOR ALL TO anon USING (true) WITH CHECK (true)', t);
  END LOOP;
END $$;
