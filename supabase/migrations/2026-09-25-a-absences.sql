-- Step 1a — run now in the Supabase SQL editor.
-- Creates the absences table the app already writes to. Until it exists, absences
-- are kept only on the device that recorded them.
CREATE TABLE IF NOT EXISTS absences (
  id TEXT PRIMARY KEY,
  employee TEXT NOT NULL,
  date DATE NOT NULL,
  week_start DATE NOT NULL,
  justified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE absences ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS allow_all ON absences;
CREATE POLICY allow_all ON absences FOR ALL TO anon USING (true) WITH CHECK (true);
