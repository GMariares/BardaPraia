-- Weeks the team was told about ("Notify team" in Shifts), shared by all managers' devices.
-- After a week is announced, changing someone's upcoming shift in it sends them an alert.
ALTER TABLE settings ADD COLUMN IF NOT EXISTS week_notices JSONB DEFAULT '{}'::jsonb;
