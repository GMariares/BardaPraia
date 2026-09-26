-- Secure login, step 4 (a few days after step 3, once everyone has logged in with secure login):
-- the old encoded passwords are no longer used by anything. Clear them.
update app_users set password_hash = '';
