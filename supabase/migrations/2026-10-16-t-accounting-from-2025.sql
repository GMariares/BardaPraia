-- Accounting keeps 2025 onwards only: delete the older values.
-- The app already hides everything before 2025; this removes it from the database for good.
--
-- Preview first (nothing is changed by these two lines):
--   SELECT jsonb_path_query_array(accounting -> 'history', '$[*] ? (@.year < 2025)') AS turnover_to_delete FROM settings WHERE id = 'config';
--   SELECT year, kind, count(*), sum(amount) FROM acc_entries WHERE year < 2025 GROUP BY 1, 2 ORDER BY 1, 2;

-- 1. "Turnover by year" (2017–2024 totals from the import)
UPDATE settings
SET accounting = jsonb_set(
      accounting, '{history}',
      coalesce((SELECT jsonb_agg(h) FROM jsonb_array_elements(accounting -> 'history') h WHERE (h ->> 'year')::int >= 2025), '[]'::jsonb))
WHERE id = 'config' AND jsonb_typeof(accounting -> 'history') = 'array';

-- 2. Any accounting amounts typed or imported for years before 2025
DELETE FROM acc_entries WHERE year < 2025;
