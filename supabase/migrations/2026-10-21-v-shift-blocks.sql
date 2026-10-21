-- Shifts: "left early" and a second block on the same day
-- (e.g. 10:00–13:00 Kitchen + 18:00–22:00 Bar, or 10:00–14:00 Bar + 14:00–18:00 Service).
-- Still one row per person per day; the second block has its own times, area and section.
ALTER TABLE shifts ADD COLUMN IF NOT EXISTS early_minutes INTEGER NOT NULL DEFAULT 0;
ALTER TABLE shifts ADD COLUMN IF NOT EXISTS start2 TIME;
ALTER TABLE shifts ADD COLUMN IF NOT EXISTS end2 TIME;
ALTER TABLE shifts ADD COLUMN IF NOT EXISTS zone2 TEXT DEFAULT '';
ALTER TABLE shifts ADD COLUMN IF NOT EXISTS section2 TEXT DEFAULT '';
