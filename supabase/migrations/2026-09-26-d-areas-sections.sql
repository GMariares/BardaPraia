-- Step 9: areas and sections for shifts
-- settings.areas: the list of areas and their sections, edited in Settings → Areas & sections.
--   Empty means the app uses its built-in default list.
-- shifts.section: the section within the shift's area (zone). Empty for areas with one section.
ALTER TABLE settings ADD COLUMN IF NOT EXISTS areas JSONB DEFAULT '[]'::jsonb;
ALTER TABLE shifts   ADD COLUMN IF NOT EXISTS section TEXT DEFAULT '';
