-- Stock: put every item in one of the five categories the Stock page shows as cards
-- (Bar, Cozinha, Limpeza, Economato, Other), and make "Running low at" something you set per item.
--
-- Before running, you can preview what will move:
--   SELECT category, count(*) FROM inventory GROUP BY category ORDER BY 2 DESC;
--   SELECT name FROM inventory WHERE category IN ('', 'other') AND name ILIKE 'copos%';

-- 1. Cups, lids, straws, till rolls ("Consumíveis", and the cups filed under drinks) -> Economato
UPDATE inventory SET category = 'equipment'
WHERE category = 'Consumíveis'
   OR (coalesce(category, '') IN ('', 'other') AND name ILIKE 'copos%');

-- 2. Drinks saved as "Drinks", "other" or with no category -> Bar
UPDATE inventory SET category = 'beverages'
WHERE category IS NULL OR category IN ('Drinks', '', 'other');

-- 3. Sauces saved as "Comida" -> Cozinha
UPDATE inventory SET category = 'food' WHERE category = 'Comida';

-- 4. "Running low at": nobody ever set the old default of 10, so start from "not watched" (0)
ALTER TABLE inventory ALTER COLUMN minimum SET DEFAULT 0;
UPDATE inventory SET minimum = 0 WHERE minimum = 10;
