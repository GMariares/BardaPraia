-- Food cost: ingredients with the price paid per kg / litre / piece (yield % for waste),
-- and dishes with their recipe (lines = [{ing, qty, unit}] or [{rec, qty}] for a base recipe).
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
ALTER TABLE fc_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE fc_recipes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS allow_all ON fc_ingredients;
DROP POLICY IF EXISTS allow_all ON fc_recipes;
CREATE POLICY allow_all ON fc_ingredients FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY allow_all ON fc_recipes FOR ALL TO anon USING (true) WITH CHECK (true);
