-- Shopping list: things outside the stock that need buying (utensils, equipment…).
-- Anyone on the staff can add an item; only admins can tick "Approved" and "Bought".
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

ALTER TABLE shopping_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS staff_all ON shopping_items;
CREATE POLICY staff_all ON shopping_items FOR ALL TO authenticated
  USING (public.is_staff()) WITH CHECK (public.is_staff());
REVOKE ALL ON shopping_items FROM anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON shopping_items TO authenticated;

-- Only admins may approve, mark bought, or remove an item that was already approved
CREATE OR REPLACE FUNCTION public.shopping_items_guard() RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
  IF public.app_has_role('admin') THEN
    RETURN COALESCE(NEW, OLD);
  END IF;
  IF TG_OP = 'INSERT' AND (NEW.approved OR NEW.bought) THEN
    RAISE EXCEPTION 'only admins can approve or mark bought' USING ERRCODE = '42501';
  END IF;
  IF TG_OP = 'UPDATE' AND (NEW.approved IS DISTINCT FROM OLD.approved OR NEW.bought IS DISTINCT FROM OLD.bought) THEN
    RAISE EXCEPTION 'only admins can approve or mark bought' USING ERRCODE = '42501';
  END IF;
  IF TG_OP = 'DELETE' AND (OLD.approved OR OLD.bought) THEN
    RAISE EXCEPTION 'only admins can remove an approved item' USING ERRCODE = '42501';
  END IF;
  RETURN COALESCE(NEW, OLD);
END $$;

DROP TRIGGER IF EXISTS shopping_items_guard ON shopping_items;
CREATE TRIGGER shopping_items_guard BEFORE INSERT OR UPDATE OR DELETE ON shopping_items
  FOR EACH ROW EXECUTE FUNCTION public.shopping_items_guard();
