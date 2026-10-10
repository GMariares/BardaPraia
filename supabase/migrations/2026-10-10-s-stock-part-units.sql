-- Stock: allow part units (0,5 · 1,5 · 0,25), counted from the Stock page.
-- Whole numbers keep working as before; nothing else changes.
ALTER TABLE inventory
  ALTER COLUMN qty_bar     TYPE NUMERIC(10,2) USING qty_bar::numeric,
  ALTER COLUMN qty_storage TYPE NUMERIC(10,2) USING qty_storage::numeric,
  ALTER COLUMN minimum     TYPE NUMERIC(10,2) USING minimum::numeric;

ALTER TABLE inv_logs
  ALTER COLUMN qty_bar     TYPE NUMERIC(10,2) USING qty_bar::numeric,
  ALTER COLUMN qty_storage TYPE NUMERIC(10,2) USING qty_storage::numeric;
