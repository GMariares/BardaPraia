-- Secure login, step 3: lock the database.
-- Run ONLY after Settings → Secure login → "Move everyone to secure login" succeeded
-- and you have logged out and in again. After this the published (anon) key reads nothing:
-- every request needs a staff session, and the roles in that session decide the rest.

-- Who is asking: app_metadata is set only by the server (never by the user)
create or replace function public.app_meta() returns jsonb language sql stable as
$$ select coalesce(auth.jwt() -> 'app_metadata', '{}'::jsonb) $$;
create or replace function public.is_staff() returns boolean language sql stable as
$$ select (public.app_meta() ->> 'app_user_id') is not null $$;
create or replace function public.app_has_role(r text) returns boolean language sql stable as
$$ select public.is_staff() and coalesce(public.app_meta() -> 'roles', '[]'::jsonb) ? r $$;

-- Everyday tables: any logged-in staff member
do $$ declare t text; begin
  foreach t in array array['settings','employees','suppliers','inventory','inv_logs','orders','reservations','tasks',
                           'shifts','bb_menu','bb_entries','absences','shift_requests'] loop
    execute format('drop policy if exists allow_all on %I', t);
    execute format('drop policy if exists allow_all_%s on %I', t, t);
    execute format('drop policy if exists staff_all on %I', t);
    execute format('create policy staff_all on %I for all to authenticated using (public.is_staff()) with check (public.is_staff())', t);
  end loop;
end $$;

-- Finance: admins and finance
drop policy if exists allow_all on fin_entries;
drop policy if exists allow_all_fin_entries on fin_entries;
drop policy if exists finance_only on fin_entries;
create policy finance_only on fin_entries for all to authenticated
  using (public.app_has_role('admin') or public.app_has_role('finance'))
  with check (public.app_has_role('admin') or public.app_has_role('finance'));

-- Accounting: admins only
drop policy if exists allow_all on acc_entries;
drop policy if exists admin_only on acc_entries;
create policy admin_only on acc_entries for all to authenticated
  using (public.app_has_role('admin')) with check (public.app_has_role('admin'));

-- Food cost: admins and chefs
do $$ declare t text; begin
  foreach t in array array['fc_ingredients','fc_recipes'] loop
    execute format('drop policy if exists allow_all on %I', t);
    execute format('drop policy if exists chef_admin on %I', t);
    execute format('create policy chef_admin on %I for all to authenticated using (public.app_has_role(''admin'') or public.app_has_role(''chef'')) with check (public.app_has_role(''admin'') or public.app_has_role(''chef''))', t);
  end loop;
end $$;

-- Users: staff see names and roles only; pay, contract and password columns go through the server
drop policy if exists allow_all on app_users;
drop policy if exists allow_all_app_users on app_users;
drop policy if exists staff_read on app_users;
create policy staff_read on app_users for select to authenticated using (public.is_staff());
revoke all on app_users from anon, authenticated;
grant select (id, name, username, roles, active, employee, created_at) on app_users to authenticated;

-- Notification subscriptions: written by the server; a device may remove its own
drop policy if exists allow_all on push_subscriptions;
drop policy if exists allow_all_push_subscriptions on push_subscriptions;
drop policy if exists own_delete on push_subscriptions;
create policy own_delete on push_subscriptions for delete to authenticated
  using (public.is_staff() and user_id = public.app_meta() ->> 'app_user_id');

-- Settings: every column except accounting (admins read/write that through the functions below)
revoke select, update on settings from authenticated;
grant select (id, admin_pin, tables, updated_at, finance_pin, fundo_caixa, budgets, week_tips, inv_sort_order,
              tip_splits, areas, week_notices) on settings to authenticated;
grant update (admin_pin, tables, updated_at, finance_pin, fundo_caixa, budgets, week_tips, inv_sort_order,
              tip_splits, areas, week_notices) on settings to authenticated;

create or replace function public.get_accounting_config() returns jsonb
language plpgsql stable security definer set search_path = public as $$
begin
  if not public.app_has_role('admin') then raise exception 'admins only' using errcode = '42501'; end if;
  return (select coalesce(accounting, '{}'::jsonb) from settings where id = 'config');
end $$;
create or replace function public.set_accounting_config(cfg jsonb) returns void
language plpgsql security definer set search_path = public as $$
begin
  if not public.app_has_role('admin') then raise exception 'admins only' using errcode = '42501'; end if;
  update settings set accounting = cfg where id = 'config';
end $$;
create or replace function public.get_food_cost_target() returns numeric
language plpgsql stable security definer set search_path = public as $$
begin
  if not (public.app_has_role('admin') or public.app_has_role('chef')) then raise exception 'not allowed' using errcode = '42501'; end if;
  return (select (accounting ->> 'foodCostTarget')::numeric from settings where id = 'config');
end $$;
revoke execute on function public.get_accounting_config() from public, anon;
revoke execute on function public.set_accounting_config(jsonb) from public, anon;
revoke execute on function public.get_food_cost_target() from public, anon;
grant execute on function public.get_accounting_config() to authenticated;
grant execute on function public.set_accounting_config(jsonb) to authenticated;
grant execute on function public.get_food_cost_target() to authenticated;

-- The published key reads nothing any more
revoke all on all tables in schema public from anon;
