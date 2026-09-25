-- Step 1b — run only after the remaining duplicate shifts are resolved
-- (it fails with "could not create unique index" while any remain).
-- Allows one shift row per person per day per week, so duplicates can never be stored again.
CREATE UNIQUE INDEX IF NOT EXISTS shifts_one_per_person_per_day ON shifts (employee, week_start, day);
