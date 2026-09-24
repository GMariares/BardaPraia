---
version: 1
slug: "src-html-ts"
primary_target: "src/html.ts"
related_targets: []
---

# Surface brief: Bar da Praia team app (src/html.ts, all sections)

Scope: the whole single-page app, every section, phone first, laptop second. Visitor mode: Operate.
Audience and job: bar staff on phones mid-shift (stock, tasks, shifts); owner and managers on a laptop (finance close, shift plan, orders, users). Content is the live Supabase data. Constraints: keep section names, tabs and placement; keep the bottom navigation on phones; keep role and status colour meanings; no dark theme; logo binding; English UI with Portuguese business terms.

## Direction contract

THESIS: The app is the bar's whitewashed dining room: white walls hold the work, a slate beam above carries structure and identity, warmth appears only where hands touch. It refuses the sky-blue gradient dashboard of emoji tiles and same-size cards.

OWN-WORLD: Ground pure white panels on a sand-white canvas (#f3f1ec). Structure is the beam slate from the logo (#34525f): top bar, desktop sidebar, section titles in tracked uppercase echoing the wordmark. Text slate-900 (#22363f), secondary tinted slate (#5f7079), hairline rules (#dfe5e8). Action is the sign's sea-mint: light fills (#d6f2ea, #94dac3) for selected states, teal (#1f8574) for what you tap next. Pine (#b07b59) and rattan (#c9a680) only for the welcome and tips moments. Roles as inked stamps with today's meanings: admin gold, finance purple, shifts green, employee blue; danger terracotta, warning amber. One workhorse sans, Hanken Grotesk, tabular numerals. Flat 1px-ruled panels, 12px radius, no gradients, shadows only on overlays, Font Awesome icons, no emoji anywhere.

STORY: A waiter opens it between tables and recognises the bar in the beam and the white; the beam says where they are, the white holds the numbers, mint says what to tap. The manager on a laptop gets the same room with the beam turned into a sidebar.

FIRST VIEWPORT: Phone dashboard. Slate beam 56px: seagull mark left, section name in tracked caps, role stamps right. Below on white: today's date line, two stat panels side by side with 32px tabular numerals, then the open-task rows separated by hairlines, each with its Font Awesome category icon. White bottom nav 64px, slate icons, the active item a sea-mint pill. Desktop from 1024px: the drawer becomes a permanent 248px slate sidebar, content up to 1200px centred, no bottom bar.

FORM: The whitewashed dining room, position 1 on the ordered grounded list, presented as the pick and chosen by the user; seed key d69712f2, kind pick. Raises carried from the declined hand: every colour encodes a state or a role, never decoration; no state is colour alone, each carries a word or icon; one 8px grid; empty states drawn as ruled rows that teach; the shifts timeline never wraps, it scales, and now is marked. Signature interaction: the sea-mint marker slides between bottom-nav sections (200ms ease-out); all other motion is 150–200ms state feedback.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
