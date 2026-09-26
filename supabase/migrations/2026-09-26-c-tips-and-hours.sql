-- Step 3 — run in the Supabase SQL editor.
-- 1) Saved tip splits per week, so every phone shows the same split and Recalculate can replace it.
ALTER TABLE settings ADD COLUMN IF NOT EXISTS tip_splits JSONB DEFAULT '{}'::jsonb;
-- 2) Lateness and overtime per shift, in minutes. Used by the hours rule now; set from the schedule in step 4.
ALTER TABLE shifts ADD COLUMN IF NOT EXISTS late_minutes INTEGER NOT NULL DEFAULT 0;
ALTER TABLE shifts ADD COLUMN IF NOT EXISTS overtime_minutes INTEGER NOT NULL DEFAULT 0;
