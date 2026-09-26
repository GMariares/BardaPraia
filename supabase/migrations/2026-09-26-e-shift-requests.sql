-- Step 11: shift change requests
-- app_users.employee: the name on the shift schedule this login belongs to
--   ('' = match automatically on username or name, '-' = not on the schedule).
-- shift_requests: change times / day off / swap or cover. Status goes
--   asked (waiting for the colleague, swaps only) → pending (waiting for a manager)
--   → approved | rejected, or declined (colleague) | cancelled (requester).
ALTER TABLE app_users ADD COLUMN IF NOT EXISTS employee TEXT DEFAULT '';

CREATE TABLE IF NOT EXISTS shift_requests (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  kind TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  requester TEXT NOT NULL,
  requester_user_id TEXT,
  week_start DATE NOT NULL,
  day TEXT NOT NULL,
  shift_id TEXT,
  shift_snapshot JSONB,
  new_start TEXT,
  new_end TEXT,
  colleague TEXT,
  colleague_snapshot JSONB,
  note TEXT DEFAULT '',
  decided_by TEXT,
  decided_at TIMESTAMPTZ,
  decision_note TEXT DEFAULT ''
);
CREATE INDEX IF NOT EXISTS shift_requests_week ON shift_requests (week_start);
ALTER TABLE shift_requests ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS allow_all ON shift_requests;
CREATE POLICY allow_all ON shift_requests FOR ALL TO anon USING (true) WITH CHECK (true);
