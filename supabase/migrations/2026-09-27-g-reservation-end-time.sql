-- Optional end time for reservations. Without one, the app holds the tables for 2 hours
-- when checking which tables are free.
ALTER TABLE reservations ADD COLUMN IF NOT EXISTS end_time TIME;
