---
name: Bar da Praia Team App
description: The bar's whitewashed dining room — white panels on sand, a slate beam for structure, sea-mint for what you tap.
colors:
  canvas: "#f3f1ec"
  panel: "#ffffff"
  slate-900: "#22363f"
  slate-800: "#2b434e"
  slate-700: "#34525f"
  slate-600: "#4a6572"
  slate-500: "#5f7079"
  slate-400: "#8a9aa2"
  slate-300: "#b7c3c9"
  slate-200: "#d5dde1"
  slate-100: "#e6ebee"
  slate-50: "#f2f5f6"
  mint-50: "#edf9f5"
  mint-100: "#d6f2ea"
  mint-200: "#b7e7d2"
  mint-300: "#94dac3"
  teal-500: "#2a9683"
  teal-600: "#1f8574"
  teal-700: "#17695c"
  pine: "#b07b59"
  rattan: "#c9a680"
  rattan-50: "#f8f1e7"
  rattan-200: "#e9d6bb"
  gold: "#a6741e"
  gold-50: "#fbf1dc"
  gold-200: "#ecd39a"
  purple: "#6d4fc2"
  purple-50: "#efeafb"
  purple-200: "#cfc2f0"
  green: "#2b8a4b"
  green-50: "#e3f4e8"
  green-200: "#a9dcb9"
  blue: "#2f6fa8"
  blue-50: "#e6f0f9"
  blue-200: "#b5d0e8"
  red: "#b4402f"
  red-50: "#fbeae7"
  red-200: "#f0b8ae"
  amber: "#b7791f"
  amber-50: "#fdf3e1"
  amber-200: "#f0d391"
  amber-700: "#7a4f10"
  red-400: "#d0715f"
  red-700: "#8f3223"
  green-700: "#1f6b3a"
typography:
  display:
    fontFamily: "Hanken Grotesk, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "40px"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Hanken Grotesk, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "32px"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Hanken Grotesk, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "20px"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  panel-title:
    fontFamily: "Hanken Grotesk, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "12px"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "0.12em"
  beam-title:
    fontFamily: "Hanken Grotesk, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "13px"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "0.16em"
  body:
    fontFamily: "Hanken Grotesk, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "normal"
  label:
    fontFamily: "Hanken Grotesk, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "11px"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "0.1em"
  stamp:
    fontFamily: "Hanken Grotesk, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "11px"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0.04em"
rounded:
  stamp: "6px"
  sm: "8px"
  md: "10px"
  lg: "12px"
  sheet: "16px"
  pill: "18px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  2xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.teal-600}"
    textColor: "{colors.panel}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "10px 16px"
    height: "40px"
  button-primary-hover:
    backgroundColor: "{colors.teal-700}"
    textColor: "{colors.panel}"
  button-secondary:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.slate-700}"
    rounded: "{rounded.sm}"
    padding: "10px 16px"
    height: "40px"
  button-secondary-hover:
    backgroundColor: "{colors.slate-50}"
    textColor: "{colors.slate-700}"
  button-danger:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.red}"
    rounded: "{rounded.sm}"
    padding: "10px 16px"
    height: "40px"
  button-danger-hover:
    backgroundColor: "{colors.red-50}"
    textColor: "{colors.red}"
  button-beam:
    backgroundColor: "{colors.slate-700}"
    textColor: "{colors.panel}"
    rounded: "{rounded.sm}"
    padding: "10px 16px"
    height: "40px"
  button-beam-hover:
    backgroundColor: "{colors.slate-800}"
    textColor: "{colors.panel}"
  input:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.slate-900}"
    rounded: "{rounded.sm}"
    padding: "11px 14px"
    height: "46px"
  panel:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.slate-900}"
    rounded: "{rounded.lg}"
    padding: "16px"
  beam:
    backgroundColor: "{colors.slate-700}"
    textColor: "{colors.panel}"
    typography: "{typography.beam-title}"
    height: "56px"
  nav-item-active:
    backgroundColor: "{colors.mint-300}"
    textColor: "{colors.slate-900}"
    rounded: "{rounded.sm}"
    padding: "11px 12px"
  stamp-admin:
    backgroundColor: "{colors.gold-50}"
    textColor: "{colors.gold}"
    typography: "{typography.stamp}"
    rounded: "{rounded.stamp}"
    padding: "3px 9px"
  stamp-finance:
    backgroundColor: "{colors.purple-50}"
    textColor: "{colors.purple}"
    typography: "{typography.stamp}"
    rounded: "{rounded.stamp}"
    padding: "3px 9px"
  stamp-shifts:
    backgroundColor: "{colors.green-50}"
    textColor: "{colors.green}"
    typography: "{typography.stamp}"
    rounded: "{rounded.stamp}"
    padding: "3px 9px"
  stamp-employee:
    backgroundColor: "{colors.blue-50}"
    textColor: "{colors.blue}"
    typography: "{typography.stamp}"
    rounded: "{rounded.stamp}"
    padding: "3px 9px"
  stamp-danger:
    backgroundColor: "{colors.red-50}"
    textColor: "{colors.red}"
    typography: "{typography.stamp}"
    rounded: "{rounded.stamp}"
    padding: "2px 8px"
  stamp-warning:
    backgroundColor: "{colors.amber-50}"
    textColor: "{colors.amber}"
    typography: "{typography.stamp}"
    rounded: "{rounded.stamp}"
    padding: "2px 8px"
  slicer-active:
    backgroundColor: "{colors.slate-700}"
    textColor: "{colors.panel}"
    rounded: "{rounded.pill}"
    padding: "8px 13px"
    height: "36px"
---

# Design System: Bar da Praia Team App

## Overview

**Creative North Star: "The whitewashed dining room"**

The app is the bar itself, as its staff know it from the inside: whitewashed walls that hold the work, a dark slate-blue ceiling beam that carries the structure, and sea-mint from the sign at the one place a hand reaches. Pure white panels sit on a sand-white canvas and are separated by hairlines rather than lifted by shadows; the only dark fill on any screen is the beam (top bar, drawer, desktop sidebar, the money "total of the day" boxes, selected calendar days and slicers). Warmth appears only where hands touch: teal on the button you press next, a mint marker under the section you are in.

Density is operational, not editorial. Numbers are large, tabular and tight-tracked so a waiter can read a stock count in sunlight; everything else is small, bold and quiet. Colour is never decoration: every tint on the screen encodes a role (admin gold, finance purple, shift manager green, employee blue) or a state (danger terracotta, warning amber, done green, ordered green), and every such tint is a stamp with a word or an icon on it, so no meaning depends on hue alone. One workhorse sans, Hanken Grotesk, does every job from the 40px euro total to the 9px stat caption.

The world explicitly replaced a sky-blue gradient dashboard of emoji tiles and same-size cards. It has no gradients of colour, no emoji, no resting shadows and no dark theme.

**Key Characteristics:**
- White panels on a sand-white canvas, ruled by 1px slate-200 hairlines; shadows only under overlays (sheet, login card, toast).
- One dark fill, the beam slate (#34525f), used for structure and for "selected" in dark tiles.
- Sea-mint marks where you are (mint-300 fill); teal marks what you tap next (teal-600 fill).
- Roles and states as inked stamps: 50-tint fill, 200-tint border, full ink text, uppercase 11px, always with a word or icon.
- Hanken Grotesk throughout, tabular numerals on by default, tracked uppercase for titles echoing the wordmark.
- 12px panels, 8px controls, 6px stamps; an 8px spacing grid.

## Colors

A slate-and-white room with a mint sign: two neutrals, one slate ramp for structure and text, one mint-to-teal ramp for action, and six stamp inks that carry role and state meanings.

### Primary
- **Sea-mint marker** (mint-300): the fill of the active item in the bottom nav and the desktop sidebar; "you are here". Mint-100 fills icon tiles on KPI and inventory cards and is the 3px focus halo on inputs; mint-50 tints the selected supplier card; mint-200 is the text-selection colour.
- **Sign teal** (teal-600): the primary button, the inventory order button and the login button; "what you tap next". Teal-700 is its hover and the ink on mint tiles (KPI icons, prices, quantity plus). Teal-500 is the focus ring, the active tab underline, the today ring on the calendar and the selected-supplier border.

### Secondary
- **Beam slate** (slate-700): the top bar, the drawer/sidebar, the euro total boxes in Finance and Black Box, selected calendar days, selected table chips, selected Black Box rows, active category slicers, the user avatar disc and the `button-beam` variant. It is the logo ink and the only dark fill in the system. Slate-800 is its hover.

### Tertiary (venue materials, used sparingly)
- **Pine** (pine) with **rattan** tints (rattan-50 fill, rattan-200 border): the "orange" stamp and the Kitchen zone bar on the shifts timeline. Rattan itself is declared for the venue and reserved; it has no resting use in the current build.
- **Admin gold** (gold / gold-50 / gold-200): the admin role stamp, the admin unlock button on the beam (gold-200 fill), the admin-only badges in the sidebar, the Foccaceria zone bar.
- **Finance purple** (purple / purple-50 / purple-200): the finance role stamp, the finance unlock button, the Finance total-box label, finance record totals, the Finance input focus ring.
- **Shifts green** (green / green-50 / green-200): the shift-manager stamp, done and confirmed states, ordered inventory cards, the Bar zone bar (teal-500 in the script's zone map). Green-700 is the deep ink for text set directly on green-50 fills.
- **Employee blue** (blue / blue-50 / blue-200): the employee stamp, in-progress states, the Service zone bar.
- **Danger terracotta** (red / red-50 / red-200): overdue and no-show stamps, delete buttons, the timeline "now" line, error toasts, the login error line. Red-700 is the deep ink for text on red-50 fills; red-400 is the softer sync-error text and dashed "missing" border.
- **Warning amber** (amber / amber-50 / amber-200): pending stamps, order standby cards, the welcome toast (the script's `gold` toast type). Amber-700 is the deep ink for body text set on amber-50 fills (standby order details).

### Neutral
- **Sand canvas** (canvas): the page floor behind everything, and the lower two thirds of the login screen.
- **Whitewash panel** (panel): every card, input, the bottom nav, the drawer logo tile, the sheet.
- **Slate ink** (slate-900): primary text, KPI and total numerals, the default toast, the active nav label.
- **Tinted text** (slate-600 for labels and row captions, slate-500 for secondary text, meta and inactive nav, slate-400 for placeholders and hour labels, slate-300 for the drawer's muted sub-labels and delete glyphs at rest).
- **Hairline** (slate-200): every panel border, the bottom-nav top rule, tab-row rule, dividers. Slate-100 is the softer inner row rule inside panels and the ruled-row lines of empty states; slate-50 is the sunken tile (stat cells, derived rows, task icon tiles, detail cells).

### Named Rules
**The One Beam Rule.** Slate-700 is the only dark fill on a screen. It carries structure (top bar, sidebar, total boxes) and "selected" on dense pickers (calendar day, table chip, slicer, Black Box row). Nothing else is filled dark.

**The Mint Marks, Teal Acts Rule.** Mint-300 fill means "you are here" and appears once per navigation surface. Teal-600 fill means "the thing to tap next". Neither is used for decoration, headings or panel tints.

**The Inked Stamp Rule.** Every role and state is a stamp: 50-tint background, 200-tint border, full-ink uppercase text, and a word or icon. Colour never carries a meaning alone; the stamp text does.

**The Materials Only Rule.** Pine and rattan belong to the venue and appear only as the orange stamp and the Kitchen bar. They are never a page or panel tint.

## Typography

**Display Font:** Hanken Grotesk (with system-ui, -apple-system, Segoe UI, sans-serif)
**Body Font:** Hanken Grotesk (same family)
**Label/Mono Font:** none; numerals are tabular via `font-variant-numeric: tabular-nums` on the body.

**Character:** One workhorse grotesk at five self-hosted weights (400–800). Big numbers are heavy and tight (800, -0.02em); titles are heavy and slightly tight; small labels and section titles are bold, uppercase and widely tracked, echoing the logo's tracked "BAR DA PRAIA". Body copy is plain 400 at 15px. Nothing is italic, nothing is light.

### Hierarchy
- **Display** (800, 40px, 1, -0.02em): the euro total in the Finance and Black Box beam boxes. White on slate-700.
- **Headline** (800, 32px, 1, -0.02em): KPI numerals on the dashboard stat panels.
- **Title** (800, 20px, -0.01em): section headings inside content (`Employee Shifts`), the dashboard day name, modal titles at 18px.
- **Panel title** (700, 12px, 0.12em, uppercase): the heading of every white panel (`OPEN TASKS`, `INVOICED`, `PUSH NOTIFICATIONS`), always with a leading Font Awesome icon in teal-600 (finance panels use purple).
- **Beam title** (700, 13px, 0.16em, uppercase): the section name on the top bar and the wordmark in the drawer; drops to 12px/0.12em under 640px. Drawer group labels use the same tracking at 10px in slate-300.
- **Body** (400, 15px, 1.4): default text, task descriptions at 13px, meta lines at 12px/600 in slate-500.
- **Label** (700, 11px, 0.1em, uppercase, slate-600): form labels, finance row labels (0.08em), login labels; the eyebrow-tracked dashboard date at 0.14em in slate-500.
- **Stamp** (700, 11px, 0.04em, uppercase): role chips and status badges; 10px inside the beam.
- **Numeric micro**: stat values 14px/800 with 9px/700/0.06em uppercase captions (inventory `BAR · STORAGE · TOTAL`), timeline hour labels 9px/700 slate-400.

### Named Rules
**The Tabular Numbers Rule.** Numerals are tabular everywhere; counts, prices and times align in columns without extra markup.

**The Tracked Caps Rule.** Anything that names a place or a group (beam title, panel title, form label, stamp) is bold uppercase with 0.04–0.16em tracking and never larger than 13px. Content headings are sentence case, heavy and slightly tight. Do not track large text.

## Layout

Phone first, one column. A fixed 56px beam sits at the top; content scrolls in a fixed viewport between it and a fixed 64px white bottom nav (plus the safe-area inset), with 16px side padding and 12px at the bottom. Panels stack with 8px between siblings in a grid and 12px between full-width panels; a section's tab row sits on a hairline and, under 1024px, bleeds to the screen edges and scrolls horizontally without a scrollbar. Dashboard KPIs are a two-column grid; inventory items are a 2-column card grid that steps to 3 at 480px, 4 at 760px and 5 at 1180px. Task counts, finance and Black Box summaries are three equal columns.

From 1024px the drawer stops sliding and becomes a permanent 248px slate sidebar (`--beam-w`); the beam and content shift right by that width, the hamburger and bottom nav disappear, content padding grows to 24px/32px and each section is centred at max 1200px. The dashboard becomes a two-column grid (KPIs left, today's reservations right, open tasks full width); KPI grids go four-up; sheets become centred dialogs (16px radius, 88vh max). Under 640px the role stamps leave the beam and the beam title tightens.

Spacing sits on an 8px grid with 4px half-steps: 4px between chips and dots, 8px between grid cards and stamps, 12px inside dense rows and between panels, 14–16px inside panels, 16px content padding on phone, 24–32px on desktop. Touch targets hold 44px minimum (drawer items, tabs, hamburger, calendar days, table chips, 46px inputs, 48px login controls).

## Elevation & Depth

Flat by default. Resting panels are white on sand, separated by a 1px slate-200 hairline; `--shadow` and `--shadow-md` are declared as `none` on purpose. Depth inside a panel is tonal: slate-50 sunken tiles with a slate-100 inner rule for stats, derived totals and detail cells; slate-100 inner rules between rows. The only shadow is the overlay shadow, used where something genuinely floats above the room: the bottom sheet, the centred dialog, the login card and the toast. Overlays dim the room with beam-slate at 45–50% alpha rather than black.

### Shadow Vocabulary
- **Overlay** (`box-shadow: 0 12px 32px rgba(34,54,63,.18)`): the sheet/modal, the login card, the toast. Nothing else.
- **Focus halo** (`box-shadow: 0 0 0 3px` mint-100, or purple-50 in Finance): inputs, selects and the search bar on focus, together with a teal-500 (or purple) border.
- **Selection ring** (`box-shadow: 0 0 0 2px` mint-100 with a teal-500 border): the selected supplier card.

### Named Rules
**The Hairline Rule.** Surfaces separate by a 1px slate-200 rule, never by a shadow. If a new surface needs to look raised while resting, it is a panel with a hairline.

**The Overlay Only Rule.** The overlay shadow appears only on things that float over the page: sheets, dialogs, the login card, toasts.

## Shapes

Softly rounded, small radii, always with a 1px stroke. Panels and cards use 12px; buttons, inputs, selects, search bars and inner tiles use 8px; icon tiles, calendar days, login inputs and small rows use 10px; stamps and stat cells use 6px; the phone sheet has 18px top corners and the dialog and login card 16px. Pills are reserved for filters (18px radius on a 36px slicer, 16px on a 32px log filter) and for the mint nav marker (14px radius on a 44×28 lozenge). Avatars and pin dots are circles. Selected state is expressed by fill and border colour, not by a change of shape. The empty state is a stack of ruled rows drawn with a repeating 28px hairline pattern, the icon and text sitting on white patches over the lines like a notepad.

## Components

### Buttons
Small, bold, flat; feedback is a fill change and a 2% press.
- **Shape:** gently rounded (8px); small variant 7px, icon variant 36px square at 8px.
- **Primary:** teal-600 fill, white 13px/700 text, 10px 16px padding, 40px minimum height. Hover teal-700, active `scale(.98)`, disabled 50% opacity. The login button is the same at 16px/700, 48px, 10px radius.
- **Secondary:** white fill, slate-700 text, slate-200 hairline; hover slate-50 with slate-300 border.
- **Danger:** white fill, terracotta text and red-200 border; hover red-50 fill. Delete actions are the icon variant of this.
- **Beam:** slate-700 fill, white text (class `btn-gold` in source; the name is legacy, the fill is slate); hover slate-800. Used for the Repeat/Cart-style structural actions.
- **Focus:** 2px teal-500 outline offset 2px on every focusable element.

### Chips
- **Role stamps:** 50-tint fill, 200-tint border, full-ink 11px/700 uppercase text with a 10px Font Awesome icon; 3px 9px padding, 6px radius. Admin gold, finance purple, shift manager green, employee blue. On the beam they become white-on-slate glass (12% white fill, 18% white border) with only the icon in the 200 tint.
- **Status stamps:** same construction at 2px 8px: green done/confirmed, terracotta overdue/no-show, amber pending, blue in-progress, slate-50 neutral, rattan/pine orange, gold.
- **Filter slicers:** 36px white pills with hairline and slate-600 text; active is slate-700 fill with white text.
- **Table chips:** 44px white tiles at 9px radius; selected slate-700, occupied red-50 with terracotta text.

### Cards / Containers
- **Corner Style:** 12px.
- **Background:** white panel on the sand canvas; state-tinted variants use the 50 fill with the 200 border (ordered green, standby amber, confirmed green, no-show red).
- **Shadow Strategy:** none at rest (see Elevation & Depth).
- **Border:** 1px slate-200.
- **Internal Padding:** 16px for panels and settings cards (18px), 14px 16px for KPI, task and user cards, 12px for inventory, supplier and reservation cards. Rows inside a panel divide with a slate-100 rule and 11–13px vertical padding.
- **Panel title:** 12px tracked uppercase in slate-700 with a teal-600 icon (purple in Finance) and a 14px gap below.
- **Total boxes:** slate-700 fill, 12px radius, centred 40px white numeral under an 11px/0.16em label in mint-300 (Black Box) or purple-200 (Finance).

### Inputs / Fields
- **Style:** white fill, 1px slate-200 hairline, 8px radius, 11px 14px padding, 46px minimum, 16px text (prevents mobile zoom); placeholders slate-400. Selects share the style with a 14px slate-500 chevron. Finance amount inputs are right-aligned 17px/700. Login inputs use 10px radius and 48px height.
- **Focus:** border teal-500 and a 3px mint-100 halo (Finance: purple border, purple-50 halo). The search bar applies the same treatment on `:focus-within`.
- **Labels:** 11px/700 tracked uppercase in slate-600, 6px above the field.
- **PIN pad:** 3-column grid of 56px white keys at 12px radius; filled dots turn slate-700; the delete key is the danger variant.

### Navigation
- **The beam (top bar):** 56px slate-700, white 13px/0.16em uppercase section title, hamburger at 44px on phones; role stamps and the Staff select on the right as slate glass; the admin and finance unlock buttons are gold-200 and purple-200 fills with slate-900 text.
- **Drawer / sidebar:** 248px slate-700 with a 12%-white hairline under the logo header (white 44px tile holding the seagull mark, tracked wordmark, slate-300 "TEAM APP") and above the footer (avatar, name, roles, sign-out). Items are 44px rows at 8px radius, 14px/600 at 82% white; hover 8% white; active mint-300 fill with slate-900 text. Group labels are 10px tracked uppercase in slate-300; admin-only badges are 9px gold-200 on 14% white. On phones the drawer slides in over a 45% slate scrim in 220ms; from 1024px it is fixed and the scrim and hamburger are gone.
- **Bottom nav (phone):** 64px white with a top hairline, seven items of 18px icon over 10px/700 tracked uppercase label in slate-500; the active item is slate-900 with a 44×28 mint-300 lozenge behind its icon. The lozenge is one element (`#bnav-marker`) that slides between sections in 200ms `cubic-bezier(.2,0,0,1)`; it does not animate under `prefers-reduced-motion`.
- **Tabs:** underline tabs on a hairline row; 44px, 13px/700 slate-500, active slate-900 with a 3px teal-500 bar inset 8px from each end.

### Shifts timeline
Each day is a panel with a 64px name column and a proportional hour track on a slate-50 lane; hour labels are 9px slate-400 over a slate-200 rule; grid lines slate-100. Bars are 24px, 5px radius, 10px/700 white text, coloured by zone from the script's map (Dishes slate-500, Kitchen pine, Bar teal-500, Service blue, Foccaceria gold), and never wrap: the track scales. Now is a 2px terracotta line with a 10px dot.

### Empty state
Centred slate-500 text at 14px/600 on a stack of 28px ruled rows (slate-100 hairlines); the 26px slate-300 icon sits on a 64×44 white patch and the sentence on a white strip, so the empty panel teaches by looking like a blank page of the pad.

### Toast
Slate-900 pill (10px radius, 14px/600 white, overlay shadow) rising 8px in 200ms above the bottom nav (80px; 32px on desktop, offset for the sidebar). The script tints it terracotta for errors and amber for the welcome greeting.

## Do's and Don'ts

### Do:
- **Do** put every surface on white with a 1px slate-200 hairline and 12px corners; reserve shadows for sheets, dialogs, the login card and toasts.
- **Do** use slate-700 for structure and selection in dark tiles, and nowhere else as a fill.
- **Do** mark the current location with a single mint-300 fill and the next action with a teal-600 fill.
- **Do** express every role and state as a stamp (50 fill, 200 border, full-ink uppercase text, word or icon), keeping today's meanings: admin gold, finance purple, shift manager green, employee blue, danger terracotta, warning amber.
- **Do** set numbers in Hanken Grotesk 800 at 32–40px with -0.02em tracking, tabular; keep labels at 11–13px bold uppercase with 0.04–0.16em tracking.
- **Do** keep touch targets at 44px or more and inputs at 46px with 16px text; hold the 8px spacing grid.
- **Do** draw empty states as ruled rows with a short sentence that says what to do next.
- **Do** use Font Awesome glyphs for category, section and action icons, one per stamp or panel title, in the panel's ink colour.
- **Do** use the supplied logo files unaltered (seagull mark in a white 44px tile on the beam, full logo on the login card).

### Don't:
- **Don't** use colour gradients (tonal blends) on any fill or text; the only permitted gradient is the repeating hairline pattern that draws ruled rows in empty states.
- **Don't** add shadows, glows or borders thicker than 1px to resting panels, cards or buttons.
- **Don't** use emoji anywhere; every pictogram is a Font Awesome glyph.
- **Don't** let colour carry a meaning alone: a state or role always has its word or icon.
- **Don't** use pine, rattan, gold, purple, green, blue, red or amber as page, panel or heading tints; they are stamp and bar inks only.
- **Don't** introduce a second typeface, italics or weights below 400; Hanken Grotesk 400–800 covers every role.
- **Don't** track text larger than 13px, and don't set large numbers in anything lighter than 800.
- **Don't** add a dark theme, recolour or redraw the logo, or replace the bottom nav on phones.
