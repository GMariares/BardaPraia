# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Bar and floor staff** (about 15 people, e.g. waiters and bartenders) on their **phones during service**: check and adjust stock, see their shifts and tips, tick off tasks, look up reservations. Often one-handed, in a hurry, sometimes outdoors in bright light.
- **Owner and managers** (a few people) on a **laptop**: finance close of day, weekly shift planning, orders to suppliers, user administration, settings. They also use the phone version when on the floor.
- Roles in the app: `admin`, `finance`, `shift_mgr`, `employee`. One person can hold several. Admin sees everything; finance unlocks the Finance section (extra PIN); shift manager unlocks shift planning and tips; employee is the floor view.

## Product Purpose

Internal operations app for **Bar da Praia**, a beach bar in Portugal. It replaces paper and chat messages for the daily running of the bar: what is in stock and what to order, who works when, what needs doing, who is coming tonight, and how much money came in and where it went. Success is a shift that runs without anyone asking the manager a question the app could have answered, and a day close that reconciles in minutes.

## Positioning

One shared, always-current picture of the bar for everyone on the team, from the same phone screen a waiter already has in their pocket. Not a POS and not accounting software: it sits between them, covering the operational gap those tools leave (stock counts, tasks, shifts, tips, reservations, the cash close).

## Operating Context

- Installed as a web app on staff phones, address `https://bardapraia.org`. Push notifications announce new tasks.
- Data is shared live through Supabase; each device keeps a cache so screens open instantly and survive a weak connection on the beach.
- Login is a username and password per person; the Finance section is additionally protected by a PIN, Settings by an admin PIN.
- Sections: Dashboard, Inventory (Stock), Reservations (Book), Tasks, Shifts, Black Box, Finance, Users, Settings.
- Daily rhythm: stock check and orders before service; tasks and reservations during; Black Box (items sold) and Finance close after service. Weekly rhythm: shift plan and tips per week (week starts Monday).
- Orders are grouped by supplier and can be sent as an email draft from the phone.

## Capabilities and Constraints

- **Inventory:** items with bar quantity, storage quantity, minimum, unit, category, supplier; movement log; custom sort order; low-stock feeds the order drafts.
- **Orders and suppliers:** draft orders per supplier, confirm, email, amount, order log; supplier cards with categories and total spend.
- **Reservations:** guest, phone, date, time, guests, tables (configurable list of tables), notes, status.
- **Tasks:** title, description, category, priority, status, assignee, deadline, optional recurrence; assignment triggers a push notification.
- **Shifts:** weekly grid per employee with start/end, role, zone, day off; absences (justified or not); weekly tips pool distributed by hours, lockable per week.
- **Black Box:** menu items with price and category; daily entry of quantities sold; totals and per-item records over a date range.
- **Finance:** daily close with T51 (till), Multibanco (card), invoiced, general expenses, tips, cash to hand over ("Entregar"), notes and coins count, "surf" revenue (surf-related income, separate line), cash difference, fundo de caixa (float); monthly budgets per line.
- **Users:** name, username, password, roles, contract dates, hours, pay amount, discount, insurance, clothing size, notes, active flag.
- Terminology to keep: English interface with Portuguese business terms as staff know them (Multibanco, Fundo de Caixa, Entregar, T51, Black Box, Surf).
- Technical: single-page app served by a Cloudflare Worker (Hono), no framework on the client, Supabase REST for data, Web Push for notifications. Must keep working on the current phones of the staff and on a laptop browser.
- Undecided: whether the app should ever be Portuguese-only or bilingual (today: English with Portuguese terms, confirmed as the current preference).

## Brand Commitments

- Name: **Bar da Praia**.
- A logo and brand colours exist and will be provided by the owner; until they arrive, no identity may be invented to replace them. Record them here when received (files under `public/brand/`).
- Voice today: short, friendly, practical; staff-facing rather than customer-facing.

## Evidence on Hand

- Real production data in Supabase (baseline 2026-09-24): 19 employees, 17 user accounts, 111 stock items, 172 menu items, 3,393 shift rows, 207 finance days, 59 tasks. Useful for realistic screens; never to be shown outside the team.
- No customer-facing content, testimonials, or marketing material exists and none should be fabricated.
- No logo or colour files in the repository yet (pending from the owner).

## Product Principles

1. **Glanceable on a phone mid-shift.** The most frequent actions (stock adjust, task done, my shifts) take one thumb and no scrolling.
2. **One source of truth, never a stale one.** What a waiter sees is what the manager sees; sync state is visible and honest.
3. **The close of day must reconcile.** Finance and Black Box entries are precise, verifiable, and hard to enter wrongly.
4. **Respect the team's vocabulary.** Portuguese business terms stay; labels match how staff already talk about the work.
5. **Quiet by default, loud when it matters.** Notifications and highlights are reserved for things that need a person now (new task, low stock, unlocked tips).

## Accessibility & Inclusion

- Phones outdoors in sunlight: strong contrast and large touch targets matter more than density.
- Mixed-nationality team; interface English must stay simple and unambiguous.
