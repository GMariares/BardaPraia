-- ============================================================
-- Bar da Praia - Supabase Schema
-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/eurcdnyhwqofnddhxrpf/sql
-- ============================================================

-- Settings (single-row config: admin PIN, tables list)
CREATE TABLE IF NOT EXISTS settings (
  id TEXT PRIMARY KEY DEFAULT 'config',
  admin_pin TEXT NOT NULL DEFAULT '1234',
  tables JSONB NOT NULL DEFAULT '["T1","T2","T3","T4","T5","T6","T7","T8","T9","T10"]'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT now()
);
INSERT INTO settings (id, admin_pin, tables) VALUES ('config','1234','["T1","T2","T3","T4","T5","T6","T7","T8","T9","T10"]')
ON CONFLICT (id) DO NOTHING;

-- Employees
CREATE TABLE IF NOT EXISTS employees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now()
);
INSERT INTO employees (name) VALUES ('Ana'),('Bruno'),('Carla'),('David'),('Eva')
ON CONFLICT (name) DO NOTHING;

-- Inventory
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

-- Inventory logs
CREATE TABLE IF NOT EXISTS inv_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action TEXT NOT NULL,
  item TEXT NOT NULL,
  employee TEXT DEFAULT 'System',
  qty_bar INTEGER DEFAULT 0,
  qty_storage INTEGER DEFAULT 0,
  timestamp TIMESTAMPTZ DEFAULT now()
);

-- Orders
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  status TEXT NOT NULL DEFAULT 'standby',
  date TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Reservations
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

-- Tasks
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

-- Shifts
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

-- Black Box menu items
CREATE TABLE IF NOT EXISTS bb_menu (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  category TEXT DEFAULT 'other',
  created_at TIMESTAMPTZ DEFAULT now()
);
INSERT INTO bb_menu (name, price, category) VALUES
  ('Beer', 3.50, 'beer'),
  ('Wine Glass', 4.00, 'wine'),
  ('Sangria', 5.50, 'cocktails'),
  ('Soft Drink', 2.00, 'beverages'),
  ('Water', 1.50, 'beverages'),
  ('Burger', 9.00, 'food'),
  ('Fries', 3.50, 'food'),
  ('Gin Tonic', 7.00, 'cocktails'),
  ('Mojito', 7.50, 'cocktails'),
  ('Vodka Shot', 3.00, 'spirits')
ON CONFLICT DO NOTHING;

-- Black Box daily entries
CREATE TABLE IF NOT EXISTS bb_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL UNIQUE,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  total NUMERIC(10,2) NOT NULL DEFAULT 0,
  saved_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (open access with anon key)
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE inv_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE shifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE bb_menu ENABLE ROW LEVEL SECURITY;
ALTER TABLE bb_entries ENABLE ROW LEVEL SECURITY;

-- Allow full access via anon key (app controls auth itself)
CREATE POLICY "allow_all_settings"     ON settings     FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_employees"    ON employees    FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_inventory"    ON inventory    FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_inv_logs"     ON inv_logs     FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_orders"       ON orders       FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_reservations" ON reservations FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_tasks"        ON tasks        FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_shifts"       ON shifts       FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_bb_menu"      ON bb_menu      FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_bb_entries"   ON bb_entries   FOR ALL TO anon USING (true) WITH CHECK (true);
