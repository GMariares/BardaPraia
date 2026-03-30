export function getAppHTML(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <title>Bar da Praia</title>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js"></script>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --ocean-50: #f0f9ff; --ocean-100: #e0f2fe; --ocean-200: #bae6fd;
      --ocean-300: #7dd3fc; --ocean-400: #38bdf8; --ocean-500: #0ea5e9;
      --ocean-600: #0284c7; --ocean-700: #0369a1; --ocean-800: #075985;
      --ocean-900: #0c4a6e;
      --grad: linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0ea5e9 100%);
      --grad-btn: linear-gradient(135deg, #0ea5e9, #0284c7);
      --gold: #f59e0b; --gold-light: #fef9c3;
      --radius: 14px; --radius-sm: 9px;
      --shadow: 0 2px 16px rgba(0,0,0,.07);
      --shadow-md: 0 4px 24px rgba(14,165,233,.14);
    }
    html, body { height: 100%; overflow: hidden; }
    body { font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; background: var(--ocean-50); color: var(--ocean-900); -webkit-tap-highlight-color: transparent; }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--ocean-50); }
    ::-webkit-scrollbar-thumb { background: var(--ocean-300); border-radius: 2px; }

    /* ── ADMIN ROLE BADGE ── */
    .role-badge-admin { background: linear-gradient(135deg,#f59e0b,#d97706); color:white; font-size:10px; font-weight:700; padding:2px 7px; border-radius:20px; letter-spacing:.05em; }
    .role-badge-emp { background: var(--ocean-100); color:var(--ocean-700); font-size:10px; font-weight:700; padding:2px 7px; border-radius:20px; }

    /* ── TOP BAR ── */
    #topbar { position:fixed; top:0; left:0; right:0; z-index:200; background:rgba(255,255,255,.95); backdrop-filter:blur(12px); border-bottom:1px solid var(--ocean-100); height:56px; display:flex; align-items:center; padding:0 16px; gap:10px; }
    #hamburger-btn { width:38px; height:38px; border-radius:10px; border:none; background:var(--ocean-100); color:var(--ocean-700); cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:16px; flex-shrink:0; transition:background .2s; }
    #hamburger-btn:hover { background:var(--ocean-200); }
    #topbar-title { font-weight:700; font-size:17px; color:var(--ocean-900); flex:1; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    #topbar-right { display:flex; align-items:center; gap:8px; flex-shrink:0; }
    #topbar-role-info { display:flex; align-items:center; gap:6px; }
    #topbar-emp { font-size:13px; color:var(--ocean-700); background:var(--ocean-100); border:1px solid var(--ocean-200); border-radius:8px; padding:5px 10px; outline:none; cursor:pointer; max-width:110px; }
    #admin-login-btn { background:linear-gradient(135deg,#f59e0b,#d97706); color:white; border:none; border-radius:8px; padding:5px 10px; font-size:12px; font-weight:700; cursor:pointer; white-space:nowrap; }
    #admin-logout-btn { background:#fee2e2; color:#dc2626; border:none; border-radius:8px; padding:5px 10px; font-size:12px; font-weight:700; cursor:pointer; display:none; }
    #finance-login-btn { background:linear-gradient(135deg,#8b5cf6,#7c3aed); color:white; border:none; border-radius:8px; padding:5px 10px; font-size:12px; font-weight:700; cursor:pointer; white-space:nowrap; }
    #finance-logout-btn { background:#ede9fe; color:#7c3aed; border:none; border-radius:8px; padding:5px 10px; font-size:12px; font-weight:700; cursor:pointer; display:none; }
    .role-badge-finance { background:linear-gradient(135deg,#8b5cf6,#7c3aed); color:white; font-size:10px; font-weight:700; padding:2px 7px; border-radius:20px; letter-spacing:.05em; }

    /* ── FINANCE SECTION ── */
    .fin-card { background:white; border-radius:var(--radius); padding:18px; margin-bottom:12px; border:1px solid var(--ocean-100); box-shadow:var(--shadow); }
    .fin-card h3 { font-size:14px; font-weight:700; color:var(--ocean-800); margin-bottom:14px; display:flex; align-items:center; gap:7px; }
    .fin-total-box { background:linear-gradient(135deg,#4c1d95,#7c3aed); border-radius:14px; padding:18px; text-align:center; color:white; margin-bottom:14px; }
    .fin-total-label { font-size:12px; opacity:.7; margin-bottom:4px; text-transform:uppercase; letter-spacing:.06em; }
    .fin-total-num { font-size:34px; font-weight:900; }
    .fin-row { display:flex; align-items:center; justify-content:space-between; padding:10px 0; border-bottom:1px solid var(--ocean-50); }
    .fin-row:last-child { border-bottom:none; }
    .fin-row-label { font-size:13px; font-weight:600; color:var(--ocean-700); display:flex; align-items:center; gap:8px; }
    .fin-row-val { font-size:16px; font-weight:800; color:var(--ocean-900); }
    .fin-record { background:white; border-radius:var(--radius); padding:16px; margin-bottom:10px; border:1px solid var(--ocean-100); box-shadow:var(--shadow); }
    .fin-record-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:12px; padding-bottom:10px; border-bottom:1px solid var(--ocean-50); }
    .fin-record-date { font-weight:700; font-size:15px; color:var(--ocean-900); }
    .fin-record-total { font-weight:900; font-size:20px; color:#7c3aed; }
    .fin-summary-grid { display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px; margin-bottom:14px; }
    .fin-summary-card { background:white; border-radius:var(--radius); padding:14px; border:1px solid var(--ocean-100); text-align:center; box-shadow:var(--shadow); }
    .fin-summary-num { font-size:20px; font-weight:800; color:var(--ocean-900); }
    .fin-summary-label { font-size:11px; color:var(--ocean-400); margin-top:2px; }
    .fin-input-row { display:flex; align-items:center; gap:12px; margin-bottom:12px; }
    .fin-input-row label { font-size:12px; font-weight:700; color:var(--ocean-700); text-transform:uppercase; letter-spacing:.04em; min-width:110px; flex-shrink:0; }
    .fin-input-row input { flex:1; border:1.5px solid var(--ocean-200); border-radius:9px; padding:10px 14px; font-size:16px; font-weight:700; color:var(--ocean-900); background:var(--ocean-50); outline:none; text-align:right; -webkit-appearance:none; }
    .fin-input-row input:focus { border-color:#8b5cf6; background:white; box-shadow:0 0 0 3px rgba(139,92,246,.1); }
    .fin-section-title { font-size:11px; font-weight:800; color:var(--ocean-400); text-transform:uppercase; letter-spacing:.08em; margin:16px 0 10px; display:flex; align-items:center; gap:6px; }
    .fin-section-title::after { content:''; flex:1; height:1px; background:var(--ocean-100); }
    .fin-derived { background:var(--ocean-50); border-radius:10px; padding:12px 14px; display:flex; align-items:center; justify-content:space-between; margin-bottom:10px; }
    .fin-derived-label { font-size:13px; color:var(--ocean-600); font-weight:600; }
    .fin-derived-val { font-size:17px; font-weight:800; color:var(--ocean-800); }

    /* ── DRAWER ── */
    #drawer-overlay { position:fixed; inset:0; background:rgba(0,0,0,.45); backdrop-filter:blur(3px); z-index:300; opacity:0; pointer-events:none; transition:opacity .25s; }
    #drawer-overlay.open { opacity:1; pointer-events:all; }
    #drawer { position:fixed; top:0; left:0; bottom:0; width:280px; background:var(--grad); z-index:400; transform:translateX(-100%); transition:transform .28s cubic-bezier(.4,0,.2,1); display:flex; flex-direction:column; }
    #drawer.open { transform:translateX(0); }
    #drawer-header { padding:20px 20px 16px; border-bottom:1px solid rgba(255,255,255,.12); }
    .logo-row { display:flex; align-items:center; gap:12px; }
    .logo-icon { width:42px; height:42px; background:rgba(255,255,255,.18); border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:20px; }
    .logo-name { color:white; font-weight:700; font-size:17px; }
    .logo-sub { color:rgba(255,255,255,.6); font-size:12px; }
    #drawer nav { flex:1; padding:16px 12px; overflow-y:auto; }
    .section-label { color:rgba(255,255,255,.45); font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:.1em; padding:0 12px; margin:8px 0 6px; }
    .drawer-item { display:flex; align-items:center; gap:12px; padding:11px 14px; border-radius:11px; cursor:pointer; border:none; background:none; color:rgba(255,255,255,.8); font-size:14px; font-weight:500; width:100%; text-align:left; transition:background .15s,color .15s; margin-bottom:2px; }
    .drawer-item:hover { background:rgba(255,255,255,.1); color:white; }
    .drawer-item.active { background:rgba(255,255,255,.2); color:white; box-shadow:0 2px 10px rgba(0,0,0,.15); }
    .drawer-item i { width:20px; text-align:center; font-size:15px; opacity:.85; }
    .drawer-item .admin-only-badge { background:rgba(245,158,11,.3); color:#fde68a; font-size:9px; font-weight:700; padding:1px 5px; border-radius:4px; margin-left:auto; }
    #drawer-footer { padding:14px 16px; border-top:1px solid rgba(255,255,255,.1); }
    #drawer-user-name { color:white; font-size:14px; font-weight:600; }
    #drawer-user-sub { color:rgba(255,255,255,.5); font-size:11px; }

    /* ── BOTTOM NAV ── */
    #bottom-nav { position:fixed; bottom:0; left:0; right:0; z-index:200; background:rgba(255,255,255,.97); backdrop-filter:blur(12px); border-top:1px solid var(--ocean-100); height:60px; display:flex; align-items:stretch; padding:0 2px; padding-bottom:env(safe-area-inset-bottom,0); }
    .bnav-item { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:3px; cursor:pointer; border:none; background:none; color:var(--ocean-400); font-size:9px; font-weight:600; border-radius:10px; transition:color .15s,background .15s; padding:4px 0; text-transform:uppercase; letter-spacing:.03em; min-width:0; }
    .bnav-item i { font-size:17px; transition:transform .15s; }
    .bnav-item.active { color:var(--ocean-600); }
    .bnav-item.active i { transform:translateY(-1px); }
    .bnav-item:active { background:var(--ocean-100); }
    .bnav-item.admin-nav { color:#d97706; }
    .bnav-item.admin-nav.active { color:#b45309; }

    /* ── MAIN CONTENT ── */
    #content-wrap { position:fixed; top:56px; left:0; right:0; bottom:60px; overflow-y:auto; -webkit-overflow-scrolling:touch; padding:14px 14px 8px; }

    /* ── SECTIONS ── */
    .page-section { display:none; }
    .page-section.active { display:block; }

    /* ── CARDS ── */
    .card { background:white; border-radius:var(--radius); box-shadow:var(--shadow); border:1px solid var(--ocean-100); }

    /* ── KPI GRID ── */
    .kpi-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:14px; }
    .kpi-card { background:white; border-radius:var(--radius); padding:14px; border:1px solid var(--ocean-100); box-shadow:var(--shadow); }
    .kpi-top { display:flex; align-items:center; justify-content:space-between; margin-bottom:8px; }
    .kpi-icon { width:36px; height:36px; background:var(--ocean-100); border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:17px; }
    .kpi-num { font-size:26px; font-weight:800; color:var(--ocean-900); line-height:1; }
    .kpi-label { font-size:12px; color:var(--ocean-400); margin-top:2px; }
    .kpi-sub { font-size:11px; color:#ef4444; margin-top:4px; min-height:14px; }

    /* ── BADGES ── */
    .badge { display:inline-flex; align-items:center; padding:2px 8px; border-radius:20px; font-size:11px; font-weight:700; }
    .badge-green { background:#dcfce7; color:#16a34a; }
    .badge-red { background:#fee2e2; color:#dc2626; }
    .badge-yellow { background:#fef9c3; color:#ca8a04; }
    .badge-blue { background:#dbeafe; color:#1d4ed8; }
    .badge-gray { background:#f3f4f6; color:#6b7280; }
    .badge-orange { background:#ffedd5; color:#c2410c; }
    .badge-gold { background:#fef9c3; color:#92400e; }

    /* ── BUTTONS ── */
    .btn { display:inline-flex; align-items:center; gap:6px; border:none; cursor:pointer; font-weight:600; font-size:13px; border-radius:var(--radius-sm); padding:9px 16px; transition:all .2s; white-space:nowrap; }
    .btn-primary { background:var(--grad-btn); color:white; }
    .btn-primary:active { opacity:.88; transform:scale(.97); }
    .btn-secondary { background:white; color:var(--ocean-600); border:1.5px solid var(--ocean-200); }
    .btn-secondary:active { background:var(--ocean-100); }
    .btn-danger { background:#fee2e2; color:#dc2626; border:1.5px solid #fca5a5; }
    .btn-gold { background:linear-gradient(135deg,#f59e0b,#d97706); color:white; }
    .btn-sm { padding:6px 12px; font-size:12px; border-radius:8px; }
    .btn-icon { width:32px; height:32px; padding:0; border-radius:8px; justify-content:center; }

    /* ── INPUTS ── */
    .input-field { width:100%; border:1.5px solid var(--ocean-200); border-radius:var(--radius-sm); padding:10px 14px; font-size:15px; color:var(--ocean-900); background:var(--ocean-50); outline:none; transition:border .2s; -webkit-appearance:none; appearance:none; }
    .input-field:focus { border-color:var(--ocean-500); background:white; box-shadow:0 0 0 3px rgba(14,165,233,.1); }
    .input-field::placeholder { color:var(--ocean-300); }
    .select-field { width:100%; border:1.5px solid var(--ocean-200); border-radius:var(--radius-sm); padding:10px 14px; font-size:15px; color:var(--ocean-900); background:var(--ocean-50); outline:none; cursor:pointer; -webkit-appearance:none; appearance:none; }
    .select-field:focus { border-color:var(--ocean-500); }
    .label { font-size:11px; font-weight:700; color:var(--ocean-700); text-transform:uppercase; letter-spacing:.05em; margin-bottom:5px; display:block; }
    .form-row { margin-bottom:14px; }
    .form-grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
    .form-grid-3 { display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px; }

    /* ── TABS ── */
    .tab-row { display:flex; gap:6px; margin-bottom:14px; flex-wrap:wrap; }
    .tab-btn { padding:7px 14px; border-radius:9px; font-weight:600; font-size:13px; cursor:pointer; border:none; transition:all .18s; }
    .tab-btn.active { background:var(--grad-btn); color:white; }
    .tab-btn:not(.active) { background:white; color:var(--ocean-600); border:1.5px solid var(--ocean-200); }

    /* ── SECTION HEADER ── */
    .section-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:14px; flex-wrap:wrap; gap:10px; }

    /* ── INVENTORY CARDS ── */
    .inv-card { background:white; border-radius:var(--radius); padding:14px; border:1px solid var(--ocean-100); margin-bottom:10px; box-shadow:var(--shadow); }
    .inv-card-header { display:flex; align-items:center; gap:10px; margin-bottom:10px; }
    .inv-cat-icon { font-size:22px; flex-shrink:0; }
    .inv-name { font-weight:700; font-size:15px; color:var(--ocean-900); }
    .inv-meta { font-size:11px; color:var(--ocean-400); margin-top:1px; }
    .inv-stats { display:grid; grid-template-columns:1fr 1fr 1fr 1fr; gap:8px; margin-bottom:10px; }
    .inv-stat { background:var(--ocean-50); border-radius:8px; padding:7px 6px; text-align:center; }
    .inv-stat-val { font-size:16px; font-weight:800; color:var(--ocean-900); }
    .inv-stat-label { font-size:10px; color:var(--ocean-400); margin-top:1px; }
    .inv-stat.min-stat { cursor:pointer; }
    .inv-stat.min-stat:active { background:var(--ocean-100); }
    .inv-actions { display:flex; gap:8px; }
    .progress-bar { height:5px; border-radius:3px; background:var(--ocean-100); overflow:hidden; margin-top:6px; }
    .progress-fill { height:100%; border-radius:3px; background:var(--grad-btn); transition:width .5s; }
    .progress-fill.low { background:linear-gradient(90deg,#ef4444,#dc2626); }

    /* ── ORDER STANDBY ── */
    .order-standby { border-left:4px solid #f59e0b; background:#fffbeb; border-radius:0 12px 12px 0; padding:12px 14px; margin-bottom:8px; box-shadow:var(--shadow); }
    .order-confirmed { border-left:4px solid #22c55e; background:#f0fdf4; border-radius:0 12px 12px 0; padding:12px 14px; margin-bottom:8px; box-shadow:var(--shadow); }

    /* ── CALENDAR ── */
    .cal-nav { display:flex; align-items:center; justify-content:space-between; margin-bottom:14px; }
    .cal-week-label { font-weight:700; font-size:14px; color:var(--ocean-800); }
    .cal-grid { display:grid; grid-template-columns:repeat(7,1fr); gap:4px; margin-bottom:14px; }
    .cal-day { border-radius:10px; padding:6px 2px; text-align:center; cursor:pointer; border:1.5px solid transparent; transition:all .15s; min-height:58px; }
    .cal-day:active { background:var(--ocean-100); }
    .cal-day.today { border-color:var(--ocean-400); background:var(--ocean-50); }
    .cal-day.selected { background:var(--grad-btn); color:white; border-color:transparent; }
    .cal-day-name { font-size:10px; font-weight:700; color:var(--ocean-400); margin-bottom:2px; }
    .cal-day.selected .cal-day-name { color:rgba(255,255,255,.75); }
    .cal-day-num { font-size:16px; font-weight:800; color:var(--ocean-900); }
    .cal-day.today .cal-day-num { color:var(--ocean-600); }
    .cal-day.selected .cal-day-num { color:white; }
    .cal-dots { display:flex; gap:2px; justify-content:center; margin-top:3px; flex-wrap:wrap; }
    .cal-dots span { width:5px; height:5px; border-radius:50%; display:inline-block; }
    .cal-count { font-size:10px; color:var(--ocean-400); margin-top:1px; }
    .cal-day.selected .cal-count { color:rgba(255,255,255,.7); }

    /* ── RESERVATION ITEMS ── */
    .res-item { border-left:4px solid var(--ocean-400); background:white; border-radius:0 12px 12px 0; padding:12px 14px; margin-bottom:8px; cursor:pointer; transition:transform .15s; box-shadow:var(--shadow); }
    .res-item:active { transform:translateX(3px); }
    .res-item.confirmed { border-left-color:#16a34a; background:#f0fdf4; }
    .res-item.no-show { border-left-color:#dc2626; background:#fff5f5; }
    .res-item-top { display:flex; align-items:center; justify-content:space-between; }
    .res-time { font-weight:800; font-size:15px; color:var(--ocean-800); margin-right:8px; }
    .res-name { font-weight:600; font-size:15px; color:var(--ocean-900); }
    .res-meta { font-size:12px; color:var(--ocean-400); margin-top:4px; display:flex; gap:12px; flex-wrap:wrap; }

    /* ── ALL-RES LIST ── */
    .res-list-item { display:flex; align-items:center; gap:12px; padding:13px 14px; border-bottom:1px solid var(--ocean-50); cursor:pointer; background:white; transition:background .15s; }
    .res-list-item:active { background:var(--ocean-50); }
    .res-date-box { width:44px; height:44px; background:var(--ocean-100); border-radius:10px; display:flex; flex-direction:column; align-items:center; justify-content:center; flex-shrink:0; }
    .res-date-box .rdb-d { font-size:12px; font-weight:800; color:var(--ocean-700); }
    .res-date-box .rdb-t { font-size:10px; color:var(--ocean-500); }

    /* ── TABLE MULTI-SELECT ── */
    .table-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:8px; }
    .table-chip { padding:8px 4px; border-radius:9px; text-align:center; cursor:pointer; border:1.5px solid var(--ocean-200); background:white; font-size:13px; font-weight:600; color:var(--ocean-600); transition:all .15s; -webkit-user-select:none; user-select:none; }
    .table-chip:active { transform:scale(.94); }
    .table-chip.selected { background:var(--grad-btn); color:white; border-color:transparent; }
    .table-chip.occupied { background:#fee2e2; color:#dc2626; border-color:#fca5a5; cursor:not-allowed; }

    /* ── TASK ITEMS ── */
    .task-item { background:white; border-radius:var(--radius); padding:14px; margin-bottom:10px; border:1.5px solid var(--ocean-100); box-shadow:var(--shadow); }
    .task-item.done { opacity:.6; }
    .task-top { display:flex; align-items:flex-start; gap:10px; }
    .task-icon { font-size:22px; flex-shrink:0; margin-top:1px; }
    .task-body { flex:1; min-width:0; }
    .task-title { font-weight:700; font-size:15px; color:var(--ocean-900); margin-bottom:4px; }
    .task-title.done-text { text-decoration:line-through; }
    .task-badges { display:flex; gap:5px; flex-wrap:wrap; margin-bottom:5px; }
    .task-desc { font-size:13px; color:var(--ocean-500); margin-bottom:6px; }
    .task-meta { font-size:12px; color:var(--ocean-400); display:flex; gap:12px; flex-wrap:wrap; }
    .task-actions { display:flex; gap:7px; margin-top:10px; flex-wrap:wrap; }
    .task-count-row { display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px; margin-bottom:14px; }
    .task-count-card { background:white; border-radius:var(--radius); padding:12px; border:1px solid var(--ocean-100); display:flex; align-items:center; gap:10px; }
    .tc-icon { width:34px; height:34px; border-radius:9px; display:flex; align-items:center; justify-content:center; font-size:16px; }
    .tc-num { font-size:20px; font-weight:800; color:var(--ocean-900); }
    .tc-label { font-size:11px; color:var(--ocean-400); }

    /* ── SHIFTS GANTT ── */
    .gantt-wrap { background:white; border-radius:var(--radius); border:1px solid var(--ocean-100); box-shadow:var(--shadow); overflow:hidden; margin-bottom:12px; }
    .gantt-day-header { display:flex; align-items:center; justify-content:space-between; padding:10px 14px 8px; border-bottom:1px solid var(--ocean-50); }
    .gantt-day-name { font-weight:700; font-size:14px; color:var(--ocean-900); }
    .gantt-day-date { font-size:11px; color:var(--ocean-400); margin-top:1px; }
    .gantt-timeline { position:relative; padding:0 14px 10px; }
    .gantt-hours { display:flex; border-bottom:1px solid var(--ocean-100); margin-bottom:6px; padding-bottom:4px; }
    .gantt-hour-label { flex:1; font-size:9px; font-weight:700; color:var(--ocean-300); text-align:left; white-space:nowrap; }
    .gantt-rows { position:relative; }
    .gantt-grid-lines { position:absolute; top:0; left:0; right:0; bottom:0; display:flex; pointer-events:none; }
    .gantt-grid-line { flex:1; border-left:1px dashed var(--ocean-100); }
    .gantt-row { position:relative; height:28px; margin-bottom:5px; display:flex; align-items:center; }
    .gantt-emp-label { width:60px; flex-shrink:0; font-size:11px; font-weight:700; color:var(--ocean-600); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; padding-right:6px; }
    .gantt-track { flex:1; position:relative; height:22px; border-radius:4px; background:var(--ocean-50); overflow:visible; }
    .gantt-bar { position:absolute; top:0; height:100%; border-radius:6px; display:flex; align-items:center; padding:0 6px; font-size:10px; font-weight:700; color:white; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; cursor:pointer; transition:filter .15s; box-shadow:0 1px 4px rgba(0,0,0,.15); min-width:4px; }
    .gantt-bar:active { filter:brightness(1.1); }
    .gantt-empty { font-size:12px; color:var(--ocean-300); font-style:italic; padding:6px 0 4px; }
    .gantt-now-line { position:absolute; top:0; bottom:0; width:2px; background:#ef4444; z-index:10; pointer-events:none; }
    .gantt-now-dot { position:absolute; top:-4px; left:-4px; width:10px; height:10px; border-radius:50%; background:#ef4444; }
    .shift-empty { font-size:13px; color:var(--ocean-300); font-style:italic; }

    /* ── BLACK BOX ── */
    .bb-item { display:flex; align-items:center; gap:12px; padding:10px 12px; background:white; border-radius:10px; margin-bottom:7px; border:1px solid var(--ocean-100); box-shadow:var(--shadow); cursor:pointer; transition:all .15s; }
    .bb-item:active { background:var(--ocean-50); }
    .bb-item.selected { background:linear-gradient(135deg,#0c4a6e,#0369a1); color:white; border-color:transparent; }
    .bb-item.selected .bb-price { color:rgba(255,255,255,.8); }
    .bb-item.selected .bb-name { color:white; }
    .bb-item.selected .bb-cat { color:rgba(255,255,255,.6); }
    .bb-name { font-weight:700; font-size:14px; color:var(--ocean-900); flex:1; }
    .bb-cat { font-size:11px; color:var(--ocean-400); }
    .bb-price { font-weight:800; font-size:16px; color:var(--ocean-600); margin-left:auto; white-space:nowrap; }
    .bb-qty-ctrl { display:flex; align-items:center; gap:8px; }
    .bb-qty-btn { width:28px; height:28px; border-radius:8px; border:none; font-size:16px; font-weight:700; cursor:pointer; display:flex; align-items:center; justify-content:center; }
    .bb-qty-minus { background:#fee2e2; color:#dc2626; }
    .bb-qty-plus { background:#dcfce7; color:#16a34a; }
    .bb-qty-val { font-size:15px; font-weight:700; color:var(--ocean-900); min-width:24px; text-align:center; }
    .bb-daily-record { background:white; border-radius:var(--radius); padding:16px; margin-bottom:10px; border:1px solid var(--ocean-100); box-shadow:var(--shadow); }
    .bb-daily-record-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:10px; }
    .bb-total-box { background:linear-gradient(135deg,#0c4a6e,#0369a1); border-radius:14px; padding:16px; text-align:center; color:white; margin-bottom:14px; }
    .bb-total-label { font-size:12px; opacity:.7; margin-bottom:4px; }
    .bb-total-num { font-size:32px; font-weight:900; }
    .bb-summary-grid { display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px; margin-bottom:14px; }
    .bb-summary-card { background:white; border-radius:var(--radius); padding:14px; border:1px solid var(--ocean-100); text-align:center; }
    .bb-summary-num { font-size:22px; font-weight:800; color:var(--ocean-900); }
    .bb-summary-label { font-size:11px; color:var(--ocean-400); margin-top:2px; }

    /* ── SETTINGS ── */
    .settings-card { background:white; border-radius:var(--radius); padding:18px; margin-bottom:14px; border:1px solid var(--ocean-100); box-shadow:var(--shadow); }
    .settings-card h3 { font-size:15px; font-weight:700; color:var(--ocean-800); margin-bottom:14px; display:flex; align-items:center; gap:7px; }
    .emp-row { display:flex; align-items:center; justify-content:space-between; padding:10px 12px; background:var(--ocean-50); border-radius:10px; margin-bottom:6px; }
    .emp-avatar { width:30px; height:30px; border-radius:50%; background:var(--ocean-200); display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:800; color:var(--ocean-700); }

    /* ── TABLE NUMBER CONFIG ── */
    .table-num-grid { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:10px; }
    .table-num-chip { position:relative; width:52px; height:52px; border-radius:10px; background:var(--ocean-50); border:1.5px solid var(--ocean-200); display:flex; align-items:center; justify-content:center; font-size:14px; font-weight:700; color:var(--ocean-700); }
    .table-num-chip .del-chip { position:absolute; top:-6px; right:-6px; width:17px; height:17px; background:#ef4444; color:white; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:9px; cursor:pointer; border:none; }

    /* ── MODAL ── */
    .modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,.5); backdrop-filter:blur(5px); z-index:500; display:flex; align-items:flex-end; justify-content:center; opacity:0; pointer-events:none; transition:opacity .25s; }
    .modal-overlay.open { opacity:1; pointer-events:all; }
    .modal { background:white; border-radius:22px 22px 0 0; padding:22px 20px; width:100%; max-width:600px; max-height:92vh; overflow-y:auto; transform:translateY(40px); transition:transform .28s cubic-bezier(.4,0,.2,1); padding-bottom:max(22px,env(safe-area-inset-bottom,22px)); }
    .modal-overlay.open .modal { transform:translateY(0); }
    .modal-handle { width:36px; height:4px; background:var(--ocean-200); border-radius:2px; margin:0 auto 18px; }
    .modal h2 { font-size:18px; font-weight:800; color:var(--ocean-900); margin-bottom:18px; display:flex; align-items:center; gap:8px; }
    .modal-center { align-items:center; justify-content:center; }
    .modal-center .modal { border-radius:22px; max-width:360px; }
    .detail-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:16px; }
    .detail-cell { background:var(--ocean-50); border-radius:10px; padding:11px 12px; }
    .detail-cell-label { font-size:11px; color:var(--ocean-400); font-weight:600; text-transform:uppercase; margin-bottom:3px; }
    .detail-cell-val { font-size:14px; font-weight:700; color:var(--ocean-900); }
    .detail-cell.full { grid-column:1/-1; }
    .action-row { display:flex; gap:8px; flex-wrap:wrap; }

    /* ── PIN PAD ── */
    .pin-display { display:flex; gap:10px; justify-content:center; margin-bottom:20px; }
    .pin-dot { width:16px; height:16px; border-radius:50%; background:var(--ocean-200); transition:background .2s; }
    .pin-dot.filled { background:var(--ocean-600); }
    .pin-pad { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; }
    .pin-key { height:56px; border-radius:12px; border:none; background:var(--ocean-50); color:var(--ocean-900); font-size:22px; font-weight:700; cursor:pointer; transition:background .15s; display:flex; align-items:center; justify-content:center; }
    .pin-key:active { background:var(--ocean-200); }
    .pin-key.del { font-size:16px; background:#fee2e2; color:#dc2626; }
    .pin-error { color:#dc2626; font-size:13px; text-align:center; margin-top:10px; min-height:20px; }

    /* ── SEARCH BAR ── */
    .search-bar { background:white; border-radius:var(--radius); padding:10px 14px; display:flex; align-items:center; gap:10px; border:1px solid var(--ocean-100); margin-bottom:12px; box-shadow:var(--shadow); }
    .search-bar i { color:var(--ocean-400); font-size:14px; }
    .search-bar input { flex:1; border:none; outline:none; font-size:14px; color:var(--ocean-900); background:transparent; }
    .search-bar input::placeholder { color:var(--ocean-300); }

    /* ── TOAST ── */
    #toast { position:fixed; bottom:76px; left:50%; transform:translateX(-50%) translateY(10px); background:var(--ocean-900); color:white; padding:10px 20px; border-radius:22px; font-size:14px; font-weight:600; z-index:9999; white-space:nowrap; box-shadow:0 4px 20px rgba(0,0,0,.25); opacity:0; pointer-events:none; transition:opacity .25s,transform .25s; }
    #toast.show { opacity:1; transform:translateX(-50%) translateY(0); }

    /* ── MISC ── */
    .alert-item { display:flex; align-items:center; gap:10px; padding:10px 12px; background:#fff5f5; border-radius:10px; margin-bottom:7px; }
    .today-res-item { display:flex; align-items:center; gap:10px; padding:10px 12px; background:var(--ocean-50); border-radius:10px; margin-bottom:7px; cursor:pointer; }
    .dash-panel { background:white; border-radius:var(--radius); padding:16px; margin-bottom:12px; border:1px solid var(--ocean-100); box-shadow:var(--shadow); }
    .dash-panel h3 { font-size:14px; font-weight:700; color:var(--ocean-800); margin-bottom:12px; display:flex; align-items:center; gap:6px; }
    .sb-status { display:flex; align-items:center; gap:8px; padding:10px 12px; border-radius:10px; margin-top:12px; }
    .pulse-dot { width:8px; height:8px; border-radius:50%; display:inline-block; flex-shrink:0; }
    .pulse-dot.green { background:#22c55e; }
    .pulse-dot.red { background:#ef4444; animation:pulse 1.5s infinite; }
    .pulse-dot.yellow { background:#f59e0b; }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.35} }
    .log-item { display:flex; align-items:center; gap:10px; padding:10px 12px; background:var(--ocean-50); border-radius:10px; margin-bottom:7px; }
    .log-icon { width:30px; height:30px; background:white; border-radius:8px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
    .order-item { background:white; border-radius:12px; padding:12px 14px; margin-bottom:8px; border:1px solid var(--ocean-100); }
    .order-row { display:flex; align-items:center; gap:10px; padding:10px 12px; border:1px solid var(--ocean-100); border-radius:10px; margin-bottom:8px; background:white; }
    .empty-state { text-align:center; padding:36px 20px; color:var(--ocean-300); }
    .empty-state i { font-size:32px; margin-bottom:10px; display:block; }
    .empty-state p { font-size:14px; }
    .locked-overlay { display:flex; flex-direction:column; align-items:center; justify-content:center; padding:48px 20px; color:var(--ocean-300); text-align:center; }
    .locked-overlay i { font-size:48px; margin-bottom:14px; color:#f59e0b; }
    .locked-overlay h3 { font-size:18px; font-weight:700; color:var(--ocean-900); margin-bottom:8px; }
    .locked-overlay p { font-size:14px; margin-bottom:20px; }
    .divider { height:1px; background:var(--ocean-100); margin:14px 0; }
  </style>
</head>
<body>

<!-- TOP BAR -->
<header id="topbar">
  <button id="hamburger-btn" aria-label="Menu"><i class="fas fa-bars"></i></button>
  <div id="topbar-title">Bar da Praia</div>
  <div id="topbar-right">
    <div id="topbar-role-info"></div>
    <select id="topbar-emp"><option value="">Staff</option></select>
    <button id="finance-login-btn"><i class="fas fa-euro-sign"></i></button>
    <button id="finance-logout-btn"><i class="fas fa-sign-out-alt"></i> Finance</button>
    <button id="admin-login-btn">Admin</button>
    <button id="admin-logout-btn"><i class="fas fa-sign-out-alt"></i></button>
  </div>
</header>

<!-- DRAWER -->
<div id="drawer-overlay"></div>
<nav id="drawer">
  <div id="drawer-header">
    <div class="logo-row">
      <div class="logo-icon">🌊</div>
      <div><div class="logo-name">Bar da Praia</div><div class="logo-sub">Management System</div></div>
    </div>
  </div>
  <nav style="padding:14px 10px;flex:1;overflow-y:auto;">
    <div class="section-label">Main</div>
    <button class="drawer-item active" id="ditem-dashboard" data-nav="dashboard"><i class="fas fa-home"></i> Dashboard</button>
    <button class="drawer-item" id="ditem-inventory" data-nav="inventory"><i class="fas fa-boxes-stacked"></i> Inventory</button>
    <button class="drawer-item" id="ditem-reservations" data-nav="reservations"><i class="fas fa-calendar-days"></i> Reservations</button>
    <button class="drawer-item" id="ditem-tasks" data-nav="tasks"><i class="fas fa-list-check"></i> Tasks</button>
    <button class="drawer-item" id="ditem-shifts" data-nav="shifts"><i class="fas fa-clock"></i> Shifts</button>
    <div class="section-label" style="margin-top:12px">Admin</div>
    <button class="drawer-item" id="ditem-blackbox" data-nav="blackbox"><i class="fas fa-cash-register"></i> Black Box <span class="admin-only-badge">ADMIN</span></button>
    <button class="drawer-item" id="ditem-finance" data-nav="finance"><i class="fas fa-euro-sign"></i> Finance <span class="admin-only-badge" style="background:rgba(139,92,246,.3);color:#ddd6fe">PIN</span></button>
    <button class="drawer-item" id="ditem-settings" data-nav="settings"><i class="fas fa-gear"></i> Settings <span class="admin-only-badge">ADMIN</span></button>
  </nav>
  <div id="drawer-footer">
    <div style="display:flex;align-items:center;gap:10px">
      <div style="width:32px;height:32px;background:rgba(255,255,255,.2);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px">👤</div>
      <div>
        <div id="drawer-user-name">Staff</div>
        <div id="drawer-user-sub" style="color:rgba(255,255,255,.5);font-size:11px">Active session</div>
      </div>
    </div>
  </div>
</nav>

<!-- MAIN CONTENT -->
<div id="content-wrap">

  <!-- ═══ DASHBOARD ═══ -->
  <section id="section-dashboard" class="page-section active">
    <div class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-top"><div class="kpi-icon">📦</div><span class="badge badge-green" id="dash-inv-status">OK</span></div>
        <div class="kpi-num" id="dash-inv-count">0</div>
        <div class="kpi-label">Inventory Items</div>
        <div class="kpi-sub" id="dash-inv-low"></div>
      </div>
      <div class="kpi-card">
        <div class="kpi-top"><div class="kpi-icon">🪑</div><span class="badge badge-blue">Today</span></div>
        <div class="kpi-num" id="dash-res-count">0</div>
        <div class="kpi-label">Reservations Today</div>
        <div class="kpi-sub"></div>
      </div>
      <div class="kpi-card">
        <div class="kpi-top"><div class="kpi-icon">✅</div><span class="badge badge-yellow" id="dash-task-badge">Open</span></div>
        <div class="kpi-num" id="dash-task-count">0</div>
        <div class="kpi-label">Open Tasks</div>
        <div class="kpi-sub"></div>
      </div>
      <div class="kpi-card">
        <div class="kpi-top"><div class="kpi-icon">🏖️</div><span class="badge badge-blue">Tables</span></div>
        <div class="kpi-num" id="dash-tables">0</div>
        <div class="kpi-label">Total Tables</div>
        <div class="kpi-sub"></div>
      </div>
    </div>
    <div class="dash-panel" id="dash-orders-panel" style="display:none">
      <h3><i class="fas fa-truck" style="color:#f59e0b"></i> Pending Orders <span class="badge badge-orange" id="dash-orders-badge"></span></h3>
      <div id="dash-pending-orders"></div>
    </div>
    <div class="dash-panel">
      <h3><i class="fas fa-triangle-exclamation" style="color:#f59e0b"></i> Low Stock Alerts</h3>
      <div id="dash-low-stock"><div class="empty-state" style="padding:14px"><i class="fas fa-check-circle" style="color:#22c55e;font-size:22px"></i><p>All good!</p></div></div>
    </div>
    <div class="dash-panel">
      <h3><i class="fas fa-calendar-day" style="color:var(--ocean-500)"></i> Today's Reservations</h3>
      <div id="dash-today-res"><div class="empty-state" style="padding:14px"><i class="fas fa-calendar-xmark"></i><p>No reservations today</p></div></div>
    </div>
  </section>

  <!-- ═══ INVENTORY ═══ -->
  <section id="section-inventory" class="page-section">
    <div class="section-header">
      <div class="tab-row" style="margin-bottom:0">
        <button class="tab-btn active" id="inv-tab-stock" data-inv-tab="stock"><i class="fas fa-warehouse"></i> Stock</button>
        <button class="tab-btn" id="inv-tab-log" data-inv-tab="log"><i class="fas fa-clock-rotate-left"></i> Log</button>
        <button class="tab-btn" id="inv-tab-orders" data-inv-tab="orders"><i class="fas fa-truck"></i> Orders <span id="orders-standby-badge" style="display:none;background:#f59e0b;color:white;font-size:10px;font-weight:800;padding:1px 6px;border-radius:10px;margin-left:2px"></span></button>
      </div>
      <div style="display:flex;gap:8px">
        <button class="btn btn-secondary btn-sm" id="btn-open-order"><i class="fas fa-cart-shopping"></i> Order</button>
        <button class="btn btn-primary btn-sm" id="btn-add-inventory"><i class="fas fa-plus"></i> Add</button>
      </div>
    </div>
    <div id="inv-panel-stock">
      <div class="search-bar">
        <i class="fas fa-search"></i>
        <input type="text" placeholder="Search items..." id="inv-search" />
        <select id="inv-cat-filter" style="border:none;outline:none;font-size:13px;color:var(--ocean-600);background:transparent;cursor:pointer">
          <option value="">All</option>
          <option value="beverages">🍹 Drinks</option>
          <option value="food">🍔 Food</option>
          <option value="supplies">🧹 Supplies</option>
          <option value="equipment">🔧 Equipment</option>
          <option value="other">📦 Other</option>
        </select>
      </div>
      <div id="inventory-list"><div class="empty-state"><i class="fas fa-box-open"></i><p>No items yet. Tap Add to start!</p></div></div>
    </div>
    <div id="inv-panel-log" style="display:none">
      <div id="inv-log-list"><div class="empty-state"><i class="fas fa-clock-rotate-left"></i><p>No log entries yet.</p></div></div>
    </div>
    <div id="inv-panel-orders" style="display:none">
      <div id="inv-orders-list"><div class="empty-state"><i class="fas fa-truck"></i><p>No orders placed yet.</p></div></div>
    </div>
  </section>

  <!-- ═══ RESERVATIONS ═══ -->
  <section id="section-reservations" class="page-section">
    <div class="section-header">
      <div class="tab-row" style="margin-bottom:0">
        <button class="tab-btn active" id="res-tab-calendar" data-res-tab="calendar"><i class="fas fa-calendar-week"></i> Calendar</button>
        <button class="tab-btn" id="res-tab-list" data-res-tab="list"><i class="fas fa-list"></i> All</button>
      </div>
      <button class="btn btn-primary btn-sm" id="btn-add-reservation"><i class="fas fa-plus"></i> New</button>
    </div>
    <div id="res-panel-calendar">
      <div class="card" style="padding:14px;margin-bottom:12px">
        <div class="cal-nav">
          <button class="btn btn-secondary btn-sm" id="btn-prev-week"><i class="fas fa-chevron-left"></i></button>
          <span class="cal-week-label" id="calendar-week-label"></span>
          <button class="btn btn-secondary btn-sm" id="btn-next-week"><i class="fas fa-chevron-right"></i></button>
        </div>
        <div class="cal-grid" id="calendar-grid"></div>
      </div>
      <div class="card" style="padding:14px">
        <div style="font-weight:700;font-size:15px;color:var(--ocean-800);margin-bottom:12px;display:flex;align-items:center;gap:8px">
          <i class="fas fa-calendar-day" style="color:var(--ocean-400)"></i>
          <span id="res-day-label">Select a day</span>
        </div>
        <div id="res-day-list"><div class="empty-state"><i class="fas fa-hand-pointer"></i><p>Tap a day to see reservations</p></div></div>
      </div>
    </div>
    <div id="res-panel-list" style="display:none">
      <div class="search-bar">
        <i class="fas fa-search"></i>
        <input type="text" placeholder="Search name, table..." id="res-search" />
        <input type="date" id="res-date-filter" style="border:none;outline:none;font-size:13px;color:var(--ocean-600);background:transparent;cursor:pointer" />
      </div>
      <div class="card" style="overflow:hidden">
        <div id="res-all-list"><div class="empty-state"><i class="fas fa-calendar-xmark"></i><p>No reservations yet.</p></div></div>
      </div>
    </div>
  </section>

  <!-- ═══ TASKS ═══ -->
  <section id="section-tasks" class="page-section">
    <div class="section-header">
      <div class="tab-row" id="task-filter-btns" style="margin-bottom:0">
        <button class="tab-btn active" data-task-filter="all">All</button>
        <button class="tab-btn" data-task-filter="pending">Pending</button>
        <button class="tab-btn" data-task-filter="in-progress">Active</button>
        <button class="tab-btn" data-task-filter="done">Done</button>
      </div>
      <button class="btn btn-primary btn-sm" id="btn-add-task"><i class="fas fa-plus"></i> New</button>
    </div>
    <div class="task-count-row">
      <div class="task-count-card"><div class="tc-icon" style="background:#fef9c3">⏳</div><div><div class="tc-num" id="task-count-pending">0</div><div class="tc-label">Pending</div></div></div>
      <div class="task-count-card"><div class="tc-icon" style="background:#dbeafe">🔄</div><div><div class="tc-num" id="task-count-progress">0</div><div class="tc-label">Active</div></div></div>
      <div class="task-count-card"><div class="tc-icon" style="background:#dcfce7">✅</div><div><div class="tc-num" id="task-count-done">0</div><div class="tc-label">Done</div></div></div>
    </div>
    <div id="task-list"><div class="empty-state"><i class="fas fa-clipboard-list"></i><p>No tasks yet!</p></div></div>
  </section>

  <!-- ═══ SHIFTS ═══ -->
  <section id="section-shifts" class="page-section">
    <div class="section-header" style="margin-bottom:10px">
      <div>
        <div style="font-weight:700;font-size:17px;color:var(--ocean-900)">Employee Shifts</div>
        <div style="font-size:12px;color:var(--ocean-400)" id="shifts-week-label"></div>
      </div>
      <div style="display:flex;gap:8px;align-items:center">
        <button class="btn btn-secondary btn-sm" id="btn-shifts-prev-week"><i class="fas fa-chevron-left"></i></button>
        <button class="btn btn-secondary btn-sm" id="btn-shifts-next-week"><i class="fas fa-chevron-right"></i></button>
        <button class="btn btn-gold btn-sm" id="btn-add-shift" style="display:none"><i class="fas fa-plus"></i> Add</button>
      </div>
    </div>
    <div style="display:flex;align-items:center;gap:8px;padding:8px 12px;background:white;border-radius:var(--radius);border:1px solid var(--ocean-100);margin-bottom:12px;font-size:11px;color:var(--ocean-400);flex-wrap:wrap">
      <i class="fas fa-circle-info" style="color:var(--ocean-300)"></i>
      Timeline: 07:00 – 24:00 &nbsp;·&nbsp;
      <span style="display:inline-flex;align-items:center;gap:4px"><span style="width:10px;height:10px;border-radius:3px;background:#0ea5e9;display:inline-block"></span> Morning</span>
      <span style="display:inline-flex;align-items:center;gap:4px"><span style="width:10px;height:10px;border-radius:3px;background:#f59e0b;display:inline-block"></span> Afternoon</span>
      <span style="display:inline-flex;align-items:center;gap:4px"><span style="width:10px;height:10px;border-radius:3px;background:#8b5cf6;display:inline-block"></span> Evening</span>
      <span style="display:inline-flex;align-items:center;gap:4px"><span style="width:10px;height:10px;border-radius:3px;background:#374151;display:inline-block"></span> Night</span>
    </div>
    <div id="shifts-list"></div>
  </section>

  <!-- ═══ FINANCE ═══ -->
  <section id="section-finance" class="page-section">
    <div id="finance-locked" class="locked-overlay" style="display:none">
      <i class="fas fa-euro-sign" style="color:#8b5cf6"></i>
      <h3>Finance Access Required</h3>
      <p>Enter the Finance PIN to access daily records.</p>
      <button class="btn" style="background:linear-gradient(135deg,#8b5cf6,#7c3aed);color:white" id="fin-login-prompt-btn"><i class="fas fa-key"></i> Enter Finance PIN</button>
    </div>
    <div id="finance-content" style="display:none">
      <div class="tab-row" style="margin-bottom:14px">
        <button class="tab-btn active" id="fin-tab-entry" data-fin-tab="entry"><i class="fas fa-pen-to-square"></i> Daily Entry</button>
        <button class="tab-btn" id="fin-tab-records" data-fin-tab="records"><i class="fas fa-history"></i> Records</button>
      </div>

      <!-- ── Daily Entry Panel ── -->
      <div id="fin-panel-entry">
        <div class="fin-total-box">
          <div class="fin-total-label">TOTAL OF THE DAY</div>
          <div class="fin-total-num" id="fin-day-total">€0.00</div>
          <div style="font-size:12px;opacity:.7;margin-top:4px" id="fin-entry-date"></div>
        </div>

        <div class="fin-card">
          <h3><i class="fas fa-money-bill-wave" style="color:#10b981"></i> Revenue</h3>
          <div class="fin-section-title"><i class="fas fa-cash-register"></i> Day Breakdown</div>
          <div class="fin-input-row">
            <label>T 51</label>
            <input type="number" id="fin-t51" placeholder="0.00" step="0.01" min="0" inputmode="decimal" />
          </div>
          <div class="fin-input-row">
            <label>MultiBanco</label>
            <input type="number" id="fin-multibanco" placeholder="0.00" step="0.01" min="0" inputmode="decimal" />
          </div>
          <div class="fin-derived">
            <span class="fin-derived-label"><i class="fas fa-calculator" style="color:var(--ocean-400)"></i> Total of Day (T51 + MB)</span>
            <span class="fin-derived-val" id="fin-total-day-calc">€0.00</span>
          </div>
          <div class="fin-section-title"><i class="fas fa-file-invoice-dollar"></i> Invoiced</div>
          <div class="fin-input-row">
            <label>Total Invoiced</label>
            <input type="number" id="fin-invoiced" placeholder="0.00" step="0.01" min="0" inputmode="decimal" />
          </div>
        </div>

        <div class="fin-card">
          <h3><i class="fas fa-arrow-down" style="color:#ef4444"></i> Expenses</h3>
          <div class="fin-input-row">
            <label>Tips</label>
            <input type="number" id="fin-tips" placeholder="0.00" step="0.01" min="0" inputmode="decimal" />
          </div>
          <div class="fin-input-row">
            <label>€ Entregar</label>
            <input type="number" id="fin-entregar" placeholder="0.00" step="0.01" min="0" inputmode="decimal" />
          </div>
        </div>

        <div class="fin-card">
          <h3><i class="fas fa-coins" style="color:#f59e0b"></i> Cash Details</h3>
          <div class="fin-input-row">
            <label>Cash Details</label>
            <input type="number" id="fin-cash" placeholder="0.00" step="0.01" min="0" inputmode="decimal" />
          </div>
          <div class="fin-input-row">
            <label>Coins</label>
            <input type="number" id="fin-coins" placeholder="0.00" step="0.01" min="0" inputmode="decimal" />
          </div>
          <div class="fin-input-row" style="margin-bottom:0">
            <label>Notes</label>
            <input type="text" id="fin-notes" placeholder="Optional notes..." style="text-align:left;font-weight:500;font-size:14px" />
          </div>
        </div>

        <button class="btn btn-primary" style="width:100%;justify-content:center;background:linear-gradient(135deg,#8b5cf6,#7c3aed);border-color:#7c3aed;margin-bottom:8px" id="btn-save-finance-entry">
          <i class="fas fa-save"></i> Save Daily Entry
        </button>
        <button class="btn btn-secondary" style="width:100%;justify-content:center" id="btn-clear-finance-entry">
          <i class="fas fa-rotate-left"></i> Clear Form
        </button>
      </div>

      <!-- ── Records Panel ── -->
      <div id="fin-panel-records" style="display:none">
        <div class="fin-summary-grid">
          <div class="fin-summary-card">
            <div class="fin-summary-num" id="fin-rec-today">€0</div>
            <div class="fin-summary-label">Today</div>
          </div>
          <div class="fin-summary-card">
            <div class="fin-summary-num" id="fin-rec-week">€0</div>
            <div class="fin-summary-label">This Week</div>
          </div>
          <div class="fin-summary-card">
            <div class="fin-summary-num" id="fin-rec-month">€0</div>
            <div class="fin-summary-label">This Month</div>
          </div>
        </div>
        <div id="fin-records-list"></div>
      </div>
    </div>
  </section>

  <!-- ═══ BLACK BOX ═══ -->
  <section id="section-blackbox" class="page-section">
    <div id="blackbox-locked" class="locked-overlay" style="display:none">
      <i class="fas fa-lock"></i>
      <h3>Admin Only</h3>
      <p>Log in as admin to access the Black Box.</p>
      <button class="btn btn-gold" id="bb-login-prompt-btn"><i class="fas fa-key"></i> Admin Login</button>
    </div>
    <div id="blackbox-content" style="display:none">
      <div class="tab-row" style="margin-bottom:14px">
        <button class="tab-btn active" id="bb-tab-daily" data-bb-tab="daily">Daily Entry</button>
        <button class="tab-btn" id="bb-tab-records" data-bb-tab="records">Records</button>
        <button class="tab-btn" id="bb-tab-menu" data-bb-tab="menu">Menu Items</button>
      </div>
      <!-- Daily Entry -->
      <div id="bb-panel-daily">
        <div class="bb-total-box">
          <div class="bb-total-label">TODAY'S TOTAL</div>
          <div class="bb-total-num" id="bb-today-total">€0.00</div>
          <div style="font-size:12px;opacity:.6;margin-top:4px" id="bb-today-date"></div>
        </div>
        <div class="search-bar" style="margin-bottom:10px">
          <i class="fas fa-search"></i>
          <input type="text" placeholder="Search menu items..." id="bb-item-search" />
        </div>
        <div id="bb-menu-selector" style="margin-bottom:14px"></div>
        <div style="display:flex;gap:10px;margin-bottom:14px">
          <button class="btn btn-gold" style="flex:1;justify-content:center" id="btn-save-daily-entry"><i class="fas fa-save"></i> Save Daily Entry</button>
          <button class="btn btn-secondary btn-sm btn-icon" id="btn-clear-daily"><i class="fas fa-rotate-left"></i></button>
        </div>
        <div class="divider"></div>
        <div style="font-weight:700;font-size:14px;color:var(--ocean-800);margin-bottom:10px">Selected Items</div>
        <div id="bb-selected-list"><div class="empty-state" style="padding:16px"><p>No items selected yet.</p></div></div>
      </div>
      <!-- Records -->
      <div id="bb-panel-records" style="display:none">
        <div class="bb-summary-grid">
          <div class="bb-summary-card">
            <div class="bb-summary-num" id="bb-today-sum">€0</div>
            <div class="bb-summary-label">Today</div>
          </div>
          <div class="bb-summary-card">
            <div class="bb-summary-num" id="bb-week-sum">€0</div>
            <div class="bb-summary-label">This Week</div>
          </div>
          <div class="bb-summary-card">
            <div class="bb-summary-num" id="bb-month-sum">€0</div>
            <div class="bb-summary-label">This Month</div>
          </div>
        </div>
        <div id="bb-records-list"></div>
      </div>
      <!-- Menu Items Management -->
      <div id="bb-panel-menu" style="display:none">
        <div class="section-header">
          <div style="font-size:14px;color:var(--ocean-500)">Manage items for sale</div>
          <button class="btn btn-primary btn-sm" id="btn-add-bb-item"><i class="fas fa-plus"></i> Add Item</button>
        </div>
        <div id="bb-menu-manage-list"></div>
      </div>
    </div>
  </section>

  <!-- ═══ SETTINGS ═══ -->
  <section id="section-settings" class="page-section">
    <div id="settings-locked" class="locked-overlay" style="display:none">
      <i class="fas fa-lock"></i>
      <h3>Admin Only</h3>
      <p>Settings can only be changed by an administrator.</p>
      <button class="btn btn-gold" id="settings-login-prompt-btn"><i class="fas fa-key"></i> Admin Login</button>
    </div>
    <div id="settings-content" style="display:none">
      <!-- Change PIN -->
      <div class="settings-card">
        <h3><i class="fas fa-key" style="color:#f59e0b"></i> Admin PIN</h3>
        <p style="font-size:13px;color:var(--ocean-400);margin-bottom:12px">Change the 4-digit admin PIN.</p>
        <div class="form-grid-2" style="margin-bottom:12px">
          <div><label class="label">New PIN</label><input type="password" id="new-pin" class="input-field" maxlength="4" placeholder="4 digits" inputmode="numeric" /></div>
          <div><label class="label">Confirm PIN</label><input type="password" id="confirm-pin" class="input-field" maxlength="4" placeholder="4 digits" inputmode="numeric" /></div>
        </div>
        <button class="btn btn-gold" id="btn-change-pin"><i class="fas fa-save"></i> Update PIN</button>
      </div>
      <!-- Finance PIN -->
      <div class="settings-card">
        <h3><i class="fas fa-euro-sign" style="color:#8b5cf6"></i> Finance PIN</h3>
        <p style="font-size:13px;color:var(--ocean-400);margin-bottom:12px">Change the 4-digit Finance tab PIN.</p>
        <div class="form-grid-2" style="margin-bottom:12px">
          <div><label class="label">New Finance PIN</label><input type="password" id="new-finance-pin" class="input-field" maxlength="4" placeholder="4 digits" inputmode="numeric" /></div>
          <div><label class="label">Confirm PIN</label><input type="password" id="confirm-finance-pin" class="input-field" maxlength="4" placeholder="4 digits" inputmode="numeric" /></div>
        </div>
        <button class="btn" style="background:linear-gradient(135deg,#8b5cf6,#7c3aed);color:white;display:flex;align-items:center;gap:8px;padding:10px 18px;border:none;border-radius:var(--radius-sm);cursor:pointer;font-weight:700" id="btn-change-finance-pin"><i class="fas fa-save"></i> Update Finance PIN</button>
      </div>
      <!-- Team Members -->
      <div class="settings-card">
        <h3><i class="fas fa-users" style="color:var(--ocean-500)"></i> Team Members</h3>
        <div id="employee-list"></div>
        <div style="display:flex;gap:8px;margin-top:10px">
          <input type="text" id="new-employee-name" class="input-field" placeholder="Employee name..." style="font-size:14px" />
          <button class="btn btn-primary" id="btn-add-employee" style="flex-shrink:0"><i class="fas fa-plus"></i></button>
        </div>
      </div>
      <!-- Tables -->
      <div class="settings-card">
        <h3><i class="fas fa-chair" style="color:var(--ocean-500)"></i> Table Configuration</h3>
        <p style="font-size:13px;color:var(--ocean-400);margin-bottom:12px">Add custom table numbers/names for your restaurant.</p>
        <div class="table-num-grid" id="table-num-grid"></div>
        <div style="display:flex;gap:8px;margin-top:10px">
          <input type="text" id="new-table-num" class="input-field" placeholder="Table name/number e.g. T1, VIP, Bar..." style="font-size:14px" />
          <button class="btn btn-primary" id="btn-add-table-num" style="flex-shrink:0"><i class="fas fa-plus"></i></button>
        </div>
      </div>
      <!-- Supabase -->
      <div class="settings-card">
        <h3><i class="fas fa-database" style="color:var(--ocean-500)"></i> Supabase Connection</h3>
        <p style="font-size:13px;color:var(--ocean-400);margin-bottom:12px">Cloud database — all data syncs across devices in real time.</p>
        <div class="form-row"><label class="label">Project URL</label><input type="text" id="sb-url" class="input-field" readonly style="background:var(--ocean-50);color:var(--ocean-600);font-size:13px" /></div>
        <div class="form-row"><label class="label">Anon Key</label><input type="text" id="sb-key" class="input-field" readonly style="background:var(--ocean-50);color:var(--ocean-600);font-size:13px" /></div>
        <button class="btn btn-primary" style="width:100%;justify-content:center" id="btn-save-supabase"><i class="fas fa-rotate"></i> Re-sync from Supabase</button>
        <div class="sb-status" id="sb-status-box" style="background:#fefce8">
          <span class="pulse-dot yellow"></span>
          <span style="font-size:13px;color:#ca8a04" id="sb-status-text">Connecting...</span>
        </div>
      </div>
    </div>
  </section>

</div>

<!-- BOTTOM NAV -->
<nav id="bottom-nav">
  <button class="bnav-item active" id="bnav-dashboard" data-nav="dashboard"><i class="fas fa-home"></i>Home</button>
  <button class="bnav-item" id="bnav-inventory" data-nav="inventory"><i class="fas fa-boxes-stacked"></i>Stock</button>
  <button class="bnav-item" id="bnav-reservations" data-nav="reservations"><i class="fas fa-calendar-days"></i>Book</button>
  <button class="bnav-item" id="bnav-tasks" data-nav="tasks"><i class="fas fa-list-check"></i>Tasks</button>
  <button class="bnav-item" id="bnav-shifts" data-nav="shifts"><i class="fas fa-clock"></i>Shifts</button>
  <button class="bnav-item admin-nav" id="bnav-blackbox" data-nav="blackbox"><i class="fas fa-cash-register"></i>Box</button>
  <button class="bnav-item" id="bnav-finance" data-nav="finance" style="color:#8b5cf6"><i class="fas fa-euro-sign"></i>Finance</button>
</nav>

<!-- ═══════════ MODALS ═══════════ -->

<!-- Admin Login Modal -->
<div class="modal-overlay modal-center" id="modal-admin-login">
  <div class="modal">
    <div class="modal-handle"></div>
    <h2 style="justify-content:center"><i class="fas fa-shield-halved" style="color:#f59e0b"></i> Admin Login</h2>
    <p style="text-align:center;font-size:13px;color:var(--ocean-400);margin-bottom:20px">Enter your 4-digit PIN</p>
    <div class="pin-display" id="pin-display">
      <div class="pin-dot" id="pd0"></div><div class="pin-dot" id="pd1"></div>
      <div class="pin-dot" id="pd2"></div><div class="pin-dot" id="pd3"></div>
    </div>
    <div class="pin-pad">
      <button class="pin-key" data-pin-key="1">1</button>
      <button class="pin-key" data-pin-key="2">2</button>
      <button class="pin-key" data-pin-key="3">3</button>
      <button class="pin-key" data-pin-key="4">4</button>
      <button class="pin-key" data-pin-key="5">5</button>
      <button class="pin-key" data-pin-key="6">6</button>
      <button class="pin-key" data-pin-key="7">7</button>
      <button class="pin-key" data-pin-key="8">8</button>
      <button class="pin-key" data-pin-key="9">9</button>
      <button class="pin-key del" data-pin-key="cancel">Cancel</button>
      <button class="pin-key" data-pin-key="0">0</button>
      <button class="pin-key del" data-pin-key="del"><i class="fas fa-delete-left"></i></button>
    </div>
    <div class="pin-error" id="pin-error"></div>
  </div>
</div>

<!-- Finance PIN Login Modal -->
<div class="modal-overlay modal-center" id="modal-finance-login">
  <div class="modal">
    <div class="modal-handle"></div>
    <h2 style="justify-content:center"><i class="fas fa-euro-sign" style="color:#8b5cf6"></i> Finance Login</h2>
    <p style="text-align:center;font-size:13px;color:var(--ocean-400);margin-bottom:20px">Enter your 4-digit Finance PIN</p>
    <div class="pin-display" id="fin-pin-display">
      <div class="pin-dot" id="fpd0"></div><div class="pin-dot" id="fpd1"></div>
      <div class="pin-dot" id="fpd2"></div><div class="pin-dot" id="fpd3"></div>
    </div>
    <div class="pin-pad">
      <button class="pin-key" data-fin-pin-key="1">1</button>
      <button class="pin-key" data-fin-pin-key="2">2</button>
      <button class="pin-key" data-fin-pin-key="3">3</button>
      <button class="pin-key" data-fin-pin-key="4">4</button>
      <button class="pin-key" data-fin-pin-key="5">5</button>
      <button class="pin-key" data-fin-pin-key="6">6</button>
      <button class="pin-key" data-fin-pin-key="7">7</button>
      <button class="pin-key" data-fin-pin-key="8">8</button>
      <button class="pin-key" data-fin-pin-key="9">9</button>
      <button class="pin-key del" data-fin-pin-key="cancel">Cancel</button>
      <button class="pin-key" data-fin-pin-key="0">0</button>
      <button class="pin-key del" data-fin-pin-key="del"><i class="fas fa-delete-left"></i></button>
    </div>
    <div class="pin-error" id="fin-pin-error"></div>
  </div>
</div>

<!-- Add / Edit Inventory Item -->
<div class="modal-overlay" id="modal-add-inventory">
  <div class="modal">
    <div class="modal-handle"></div>
    <h2><i class="fas fa-box" style="color:var(--ocean-400)"></i><span id="inv-modal-title">Add Item</span></h2>
    <div class="form-row"><label class="label">Employee</label><select class="select-field" id="inv-employee"></select></div>
    <div class="form-grid-2" style="margin-bottom:14px">
      <div><label class="label">Item Name *</label><input type="text" class="input-field" id="inv-item-name" placeholder="e.g. Water Bottle" /></div>
      <div><label class="label">Category</label>
        <select class="select-field" id="inv-category">
          <option value="beverages">🍹 Beverages</option>
          <option value="food">🍔 Food</option>
          <option value="supplies">🧹 Supplies</option>
          <option value="equipment">🔧 Equipment</option>
          <option value="other">📦 Other</option>
        </select>
      </div>
    </div>
    <div class="form-row"><label class="label">Unit (optional)</label><input type="text" class="input-field" id="inv-unit" placeholder="bottles, kg, boxes..." /></div>
    <div class="form-grid-3" style="margin-bottom:14px">
      <div><label class="label">In Bar</label><input type="number" class="input-field" id="inv-qty-bar" min="0" value="0" /></div>
      <div><label class="label">In Storage</label><input type="number" class="input-field" id="inv-qty-storage" min="0" value="0" /></div>
      <div><label class="label">Minimum</label><input type="number" class="input-field" id="inv-minimum" min="0" value="10" /></div>
    </div>
    <div style="display:flex;gap:10px">
      <button class="btn btn-primary" style="flex:1;justify-content:center" id="btn-save-inventory"><i class="fas fa-save"></i> Save</button>
      <button class="btn btn-secondary" style="flex:1;justify-content:center" data-close-modal="modal-add-inventory">Cancel</button>
    </div>
  </div>
</div>

<!-- Edit Minimum -->
<div class="modal-overlay" id="modal-edit-minimum">
  <div class="modal">
    <div class="modal-handle"></div>
    <h2><i class="fas fa-sliders" style="color:var(--ocean-400)"></i> Edit Minimum Stock</h2>
    <input type="hidden" id="edit-min-id" />
    <div style="background:var(--ocean-50);border-radius:12px;padding:14px;margin-bottom:16px">
      <div style="font-weight:700;font-size:16px;color:var(--ocean-900)" id="edit-min-item-name"></div>
      <div style="font-size:13px;color:var(--ocean-400);margin-top:3px">Current: <span id="edit-min-current"></span></div>
    </div>
    <div class="form-row"><label class="label">New Minimum</label><input type="number" class="input-field" id="edit-min-value" min="0" /></div>
    <div style="display:flex;gap:10px">
      <button class="btn btn-primary" style="flex:1;justify-content:center" id="btn-save-minimum"><i class="fas fa-save"></i> Update</button>
      <button class="btn btn-secondary" style="flex:1;justify-content:center" data-close-modal="modal-edit-minimum">Cancel</button>
    </div>
  </div>
</div>

<!-- Update Quantities -->
<div class="modal-overlay" id="modal-update-qty">
  <div class="modal">
    <div class="modal-handle"></div>
    <h2><i class="fas fa-pen" style="color:var(--ocean-400)"></i> Update Stock</h2>
    <input type="hidden" id="update-qty-id" />
    <div class="form-row"><label class="label">Employee</label><select class="select-field" id="update-qty-employee"></select></div>
    <div style="background:var(--ocean-50);border-radius:12px;padding:12px;margin-bottom:14px;font-weight:700;color:var(--ocean-900)" id="update-qty-name"></div>
    <div class="form-grid-2" style="margin-bottom:16px">
      <div><label class="label">Qty in Bar</label><input type="number" class="input-field" id="update-qty-bar" min="0" /></div>
      <div><label class="label">Qty in Storage</label><input type="number" class="input-field" id="update-qty-storage" min="0" /></div>
    </div>
    <div style="display:flex;gap:10px">
      <button class="btn btn-primary" style="flex:1;justify-content:center" id="btn-save-qty-update"><i class="fas fa-save"></i> Update</button>
      <button class="btn btn-secondary" style="flex:1;justify-content:center" data-close-modal="modal-update-qty">Cancel</button>
    </div>
  </div>
</div>

<!-- Place Order -->
<div class="modal-overlay" id="modal-order">
  <div class="modal">
    <div class="modal-handle"></div>
    <h2><i class="fas fa-cart-shopping" style="color:var(--ocean-400)"></i> Place Order</h2>
    <p style="font-size:13px;color:var(--ocean-400);margin-bottom:14px">Items below minimum. Order will be placed on <strong>Standby</strong> until admin approves.</p>
    <div id="order-items-list" style="max-height:40vh;overflow-y:auto;margin-bottom:16px"></div>
    <div style="display:flex;gap:10px">
      <button class="btn btn-primary" style="flex:1;justify-content:center" id="btn-confirm-order"><i class="fas fa-paper-plane"></i> Submit Order</button>
      <button class="btn btn-secondary" style="flex:1;justify-content:center" data-close-modal="modal-order">Cancel</button>
    </div>
  </div>
</div>

<!-- Add / Edit Reservation -->
<div class="modal-overlay" id="modal-add-reservation">
  <div class="modal">
    <div class="modal-handle"></div>
    <h2><i class="fas fa-calendar-plus" style="color:var(--ocean-400)"></i><span id="res-modal-title">New Reservation</span></h2>
    <input type="hidden" id="res-edit-id" />
    <div class="form-grid-2" style="margin-bottom:14px">
      <div><label class="label">Guest Name *</label><input type="text" class="input-field" id="res-guest-name" placeholder="Full name" /></div>
      <div><label class="label">Phone</label><input type="tel" class="input-field" id="res-phone" placeholder="+351..." /></div>
    </div>
    <div class="form-grid-3" style="margin-bottom:14px">
      <div><label class="label">Date *</label><input type="date" class="input-field" id="res-date" /></div>
      <div><label class="label">Time *</label><input type="time" class="input-field" id="res-time" /></div>
      <div><label class="label">Guests</label><input type="number" class="input-field" id="res-guests" min="1" max="200" value="2" /></div>
    </div>
    <div class="form-row">
      <label class="label">Tables * (tap to select multiple)</label>
      <div class="table-grid" id="res-table-grid" style="margin-top:6px"></div>
    </div>
    <div class="form-row"><label class="label">Notes</label><input type="text" class="input-field" id="res-notes" placeholder="Allergies, occasion..." /></div>
    <div style="display:flex;gap:10px">
      <button class="btn btn-primary" style="flex:1;justify-content:center" id="btn-save-reservation"><i class="fas fa-save"></i> Save</button>
      <button class="btn btn-secondary" style="flex:1;justify-content:center" data-close-modal="modal-add-reservation">Cancel</button>
    </div>
  </div>
</div>

<!-- Reservation Detail -->
<div class="modal-overlay" id="modal-res-detail">
  <div class="modal">
    <div class="modal-handle"></div>
    <h2><i class="fas fa-calendar-check" style="color:var(--ocean-400)"></i> Reservation</h2>
    <div id="res-detail-content"></div>
    <div class="action-row" id="res-detail-actions"></div>
  </div>
</div>

<!-- Add / Edit Task -->
<div class="modal-overlay" id="modal-add-task">
  <div class="modal">
    <div class="modal-handle"></div>
    <h2><i class="fas fa-clipboard-list" style="color:var(--ocean-400)"></i><span id="task-modal-title">New Task</span></h2>
    <input type="hidden" id="task-edit-id" />
    <div class="form-row"><label class="label">Title *</label><input type="text" class="input-field" id="task-title" placeholder="e.g. Fix espresso machine" /></div>
    <div class="form-row"><label class="label">Description</label><textarea class="input-field" id="task-description" placeholder="More details..." style="height:72px;resize:none"></textarea></div>
    <div class="form-grid-2" style="margin-bottom:14px">
      <div><label class="label">Category</label>
        <select class="select-field" id="task-category">
          <option value="maintenance">🔧 Maintenance</option>
          <option value="cleaning">🧹 Cleaning</option>
          <option value="call">📞 Call Someone</option>
          <option value="purchase">🛒 Purchase</option>
          <option value="admin">📋 Admin</option>
          <option value="staff">👥 Staff</option>
          <option value="other">📌 Other</option>
        </select>
      </div>
      <div><label class="label">Priority</label>
        <select class="select-field" id="task-priority">
          <option value="low">🟢 Low</option>
          <option value="medium">🟡 Medium</option>
          <option value="high">🔴 High</option>
        </select>
      </div>
    </div>
    <div class="form-grid-2" style="margin-bottom:16px">
      <div><label class="label">Assigned To</label><select class="select-field" id="task-assigned"></select></div>
      <div><label class="label">Deadline</label><input type="date" class="input-field" id="task-deadline" /></div>
    </div>
    <div style="display:flex;gap:10px">
      <button class="btn btn-primary" style="flex:1;justify-content:center" id="btn-save-task"><i class="fas fa-save"></i> Save Task</button>
      <button class="btn btn-secondary" style="flex:1;justify-content:center" data-close-modal="modal-add-task">Cancel</button>
    </div>
  </div>
</div>

<!-- Add / Edit Shift -->
<div class="modal-overlay" id="modal-add-shift">
  <div class="modal">
    <div class="modal-handle"></div>
    <h2><i class="fas fa-clock" style="color:var(--ocean-400)"></i><span id="shift-modal-title">Add Shift</span></h2>
    <input type="hidden" id="shift-edit-id" />
    <div class="form-row"><label class="label">Employee *</label><select class="select-field" id="shift-employee"></select></div>
    <div class="form-row"><label class="label">Day *</label>
      <select class="select-field" id="shift-day">
        <option value="Monday">Monday</option><option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option><option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option><option value="Saturday">Saturday</option>
        <option value="Sunday">Sunday</option>
      </select>
    </div>
    <div class="form-grid-2" style="margin-bottom:14px">
      <div><label class="label">Start Time *</label><input type="time" class="input-field" id="shift-start" /></div>
      <div><label class="label">End Time *</label><input type="time" class="input-field" id="shift-end" /></div>
    </div>
    <div class="form-row"><label class="label">Role / Notes</label><input type="text" class="input-field" id="shift-role" placeholder="e.g. Bar, Kitchen, Host..." /></div>
    <div style="display:flex;gap:10px">
      <button class="btn btn-primary" style="flex:1;justify-content:center" id="btn-save-shift"><i class="fas fa-save"></i> Save Shift</button>
      <button class="btn btn-secondary" style="flex:1;justify-content:center" data-close-modal="modal-add-shift">Cancel</button>
    </div>
  </div>
</div>

<!-- Add BB Menu Item -->
<div class="modal-overlay" id="modal-add-bb-item">
  <div class="modal">
    <div class="modal-handle"></div>
    <h2><i class="fas fa-tag" style="color:#f59e0b"></i><span id="bb-item-modal-title">Add Menu Item</span></h2>
    <input type="hidden" id="bb-item-edit-id" />
    <div class="form-row"><label class="label">Item Name *</label><input type="text" class="input-field" id="bb-item-name" placeholder="e.g. Sangria" /></div>
    <div class="form-grid-2" style="margin-bottom:14px">
      <div><label class="label">Price (€) *</label><input type="number" class="input-field" id="bb-item-price" min="0" step="0.01" placeholder="0.00" /></div>
      <div><label class="label">Category</label>
        <select class="select-field" id="bb-item-category">
          <option value="beverages">🍹 Beverages</option>
          <option value="food">🍔 Food</option>
          <option value="cocktails">🍸 Cocktails</option>
          <option value="beer">🍺 Beer</option>
          <option value="wine">🍷 Wine</option>
          <option value="spirits">🥃 Spirits</option>
          <option value="other">📦 Other</option>
        </select>
      </div>
    </div>
    <div style="display:flex;gap:10px">
      <button class="btn btn-gold" style="flex:1;justify-content:center" id="btn-save-bb-item"><i class="fas fa-save"></i> Save</button>
      <button class="btn btn-secondary" style="flex:1;justify-content:center" data-close-modal="modal-add-bb-item">Cancel</button>
    </div>
  </div>
</div>

<!-- TOAST -->
<div id="toast"></div>

<script>
(function() {
'use strict';

// ================================================
// SUPABASE CONFIG
// ================================================
var SB_URL = 'https://eurcdnyhwqofnddhxrpf.supabase.co';
var SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1cmNkbnlod3FvZm5kZGh4cnBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3ODIyNDMsImV4cCI6MjA5MDM1ODI0M30.sqap9onVY3z8AJO9bATT8jXShOxe7h6g0uXWTUN4kK0';
var sb = null;
var sbReady = false;

function initSupabase() {
  try {
    sb = window.supabase.createClient(SB_URL, SB_KEY);
    sbReady = true;
  } catch(e) {
    console.warn('Supabase init failed:', e);
    sbReady = false;
  }
}

// REST helper (no supabase-js needed, works as fallback too)
function sbFetch(method, table, body, params) {
  var url = SB_URL + '/rest/v1/' + table;
  if (params) url += '?' + params;
  return fetch(url, {
    method: method,
    headers: {
      'apikey': SB_KEY,
      'Authorization': 'Bearer ' + SB_KEY,
      'Content-Type': 'application/json',
      'Prefer': method === 'POST' ? 'return=representation' : (method === 'PATCH' ? 'return=representation' : '')
    },
    body: body ? JSON.stringify(body) : undefined
  }).then(function(r) {
    if (!r.ok) return r.json().then(function(e){ throw e; });
    var ct = r.headers.get('content-type') || '';
    if (ct.indexOf('json') !== -1) return r.json();
    return null;
  });
}

// ================================================
// LOCAL CACHE DB (fast render layer)
// ================================================
var DB_KEY = 'bardapraia_v6';
function loadDB() { try { return JSON.parse(localStorage.getItem(DB_KEY) || '{}'); } catch(e) { return {}; } }
function saveDB(db) { localStorage.setItem(DB_KEY, JSON.stringify(db)); }
function getDB() {
  var db = loadDB();
  if (!db.employees)    db.employees = [];
  if (!db.tables)       db.tables = ['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10'];
  if (!db.inventory)    db.inventory = [];
  if (!db.invLogs)      db.invLogs = [];
  if (!db.orders)       db.orders = [];
  if (!db.reservations) db.reservations = [];
  if (!db.tasks)        db.tasks = [];
  if (!db.shifts)       db.shifts = [];
  if (!db.bbMenu)       db.bbMenu = [];
  if (!db.bbEntries)    db.bbEntries = [];
  if (!db.adminPin)     db.adminPin = '1234';
  if (!db.financePin)   db.financePin = '0000';
  if (!db.finEntries)   db.finEntries = [];
  return db;
}

// ================================================
// SUPABASE SYNC - Load all data from Supabase into local cache
// ================================================
function setSbStatus(ok, msg) {
  var box = document.getElementById('sb-status-box');
  var txt = document.getElementById('sb-status-text');
  if (!box || !txt) return;
  if (ok === true) {
    box.style.background = '#eff6ff';
    box.querySelector('.pulse-dot').className = 'pulse-dot green';
    txt.style.color = '#1d4ed8';
    txt.textContent = msg || 'Connected to Supabase';
  } else if (ok === false) {
    box.style.background = '#fff5f5';
    box.querySelector('.pulse-dot').className = 'pulse-dot red';
    txt.style.color = '#dc2626';
    txt.textContent = msg || 'Connection error';
  } else {
    box.style.background = '#fefce8';
    box.querySelector('.pulse-dot').className = 'pulse-dot yellow';
    txt.style.color = '#ca8a04';
    txt.textContent = msg || 'Syncing...';
  }
}

function syncFromSupabase() {
  setSbStatus(null, 'Syncing...');
  var db = getDB();
  var promises = [
    sbFetch('GET', 'settings', null, 'id=eq.config').then(function(rows) {
      if (rows && rows[0]) {
        db.adminPin = rows[0].admin_pin || '1234';
        db.financePin = rows[0].finance_pin || db.financePin || '0000';
        db.tables = rows[0].tables || db.tables;
      }
    }),
    sbFetch('GET', 'employees', null, 'order=name.asc').then(function(rows) {
      if (rows) db.employees = rows.map(function(r){ return r.name; });
    }),
    sbFetch('GET', 'inventory', null, 'order=name.asc').then(function(rows) {
      if (rows) db.inventory = rows.map(function(r){ return {
        id: r.id, name: r.name, category: r.category, unit: r.unit||'',
        qtyBar: r.qty_bar, qtyStorage: r.qty_storage, minimum: r.minimum,
        lastEmployee: r.last_employee||'', createdAt: r.created_at, updatedAt: r.updated_at
      }; });
    }),
    sbFetch('GET', 'inv_logs', null, 'order=timestamp.desc&limit=300').then(function(rows) {
      if (rows) db.invLogs = rows.map(function(r){ return {
        id: r.id, action: r.action, item: r.item, employee: r.employee,
        qtyBar: r.qty_bar, qtyStorage: r.qty_storage, timestamp: r.timestamp
      }; });
    }),
    sbFetch('GET', 'orders', null, 'order=created_at.desc').then(function(rows) {
      if (rows) db.orders = rows.map(function(r){ return {
        id: r.id, date: r.date, items: r.items||[], status: r.status, createdAt: r.created_at
      }; });
    }),
    sbFetch('GET', 'reservations', null, 'order=date.asc,time.asc').then(function(rows) {
      if (rows) db.reservations = rows.map(function(r){ return {
        id: r.id, guestName: r.guest_name, phone: r.phone||'', date: r.date,
        time: r.time ? r.time.slice(0,5) : '', guests: r.guests,
        tables: r.tables||[], notes: r.notes||'', status: r.status, createdAt: r.created_at
      }; });
    }),
    sbFetch('GET', 'tasks', null, 'order=created_at.desc').then(function(rows) {
      if (rows) db.tasks = rows.map(function(r){ return {
        id: r.id, title: r.title, description: r.description||'', category: r.category,
        priority: r.priority, status: r.status, assignedTo: r.assigned_to||'',
        deadline: r.deadline||'', doneAt: r.done_at||'', createdAt: r.created_at
      }; });
    }),
    sbFetch('GET', 'shifts', null, 'order=week_start.desc,day.asc').then(function(rows) {
      if (rows) db.shifts = rows.map(function(r){ return {
        id: r.id, employee: r.employee, day: r.day, weekStart: r.week_start,
        start: r.start_time ? r.start_time.slice(0,5) : '',
        end: r.end_time ? r.end_time.slice(0,5) : '',
        role: r.role||'', createdAt: r.created_at
      }; });
    }),
    sbFetch('GET', 'bb_menu', null, 'order=category.asc,name.asc').then(function(rows) {
      if (rows) db.bbMenu = rows.map(function(r){ return {
        id: r.id, name: r.name, price: parseFloat(r.price)||0, category: r.category
      }; });
    }),
    sbFetch('GET', 'bb_entries', null, 'order=date.desc&limit=90').then(function(rows) {
      if (rows) db.bbEntries = rows.map(function(r){ return {
        id: r.id, date: r.date, items: r.items||[], total: parseFloat(r.total)||0, savedAt: r.saved_at
      }; });
    }),
    sbFetch('GET', 'fin_entries', null, 'order=date.desc&limit=365').then(function(rows) {
      if (rows) db.finEntries = rows.map(function(r){ return {
        id: r.id, date: r.date,
        t51: parseFloat(r.t51)||0, multibanco: parseFloat(r.multibanco)||0,
        totalDay: parseFloat(r.total_day)||0, invoiced: parseFloat(r.invoiced)||0,
        tips: parseFloat(r.tips)||0, entregar: parseFloat(r.entregar)||0,
        cash: parseFloat(r.cash)||0, coins: parseFloat(r.coins)||0, notes: r.notes||'', savedAt: r.saved_at
      }; });
    }).catch(function(){ /* table may not exist yet */ })
  ];
  return Promise.all(promises).then(function() {
    saveDB(db);
    setSbStatus(true, 'Synced · ' + SB_URL.replace('https://',''));
    return db;
  }).catch(function(err) {
    console.error('Sync error:', err);
    setSbStatus(false, 'Sync failed — using local cache');
    return db;
  });
}

// ================================================
// STATE
// ================================================
var isAdmin = false;
var isFinance = false;
var currentSection = 'dashboard';
var calendarWeekStart = getMonday(new Date());
var selectedCalendarDay = null;
var currentTaskFilter = 'all';
var invSearchVal = '';
var invCatFilter = '';
var resSearchVal = '';
var resDateFilter = '';
var editInventoryId = null;
var editBbItemId = null;
var shiftsWeekOffset = 0;
var pinBuffer = '';
var finPinBuffer = '';
var bbSelectedItems = {}; // {id: qty}
var bbItemSearchVal = '';
var currentBbTab = 'daily';
var currentFinTab = 'entry';
var selectedTables = [];

// ================================================
// UTILS
// ================================================
function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
function toDateStr(d) { return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0'); }
function fmtDate(iso) { if (!iso) return ''; var d = new Date(iso); return d.toLocaleDateString('en-GB',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'}); }
function fmtDateShort(iso) { if (!iso) return ''; var d = new Date(iso+'T12:00:00'); return d.toLocaleDateString('en-GB',{weekday:'short',day:'2-digit',month:'short'}); }
function getMonday(d) { var dd = new Date(d); var day = dd.getDay(); var diff = day===0?-6:1-day; dd.setDate(dd.getDate()+diff); dd.setHours(0,0,0,0); return dd; }
function esc(str) { return String(str||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function fmtEur(n) { return '€' + (Math.round(n*100)/100).toFixed(2); }
function getWeekStart(offset) { var d = getMonday(new Date()); d.setDate(d.getDate() + offset*7); return d; }

var toastTimer;
function toast(msg, type) {
  var el = document.getElementById('toast');
  el.textContent = msg;
  el.style.background = type==='error' ? '#dc2626' : type==='gold' ? '#d97706' : 'var(--ocean-900)';
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function(){ el.classList.remove('show'); }, 2800);
}

// ================================================
// MODAL
// ================================================
function openModal(id) { var el=document.getElementById(id); if(!el) return; el.classList.add('open'); document.body.style.overflow='hidden'; }
function closeModal(id) { var el=document.getElementById(id); if(!el) return; el.classList.remove('open'); document.body.style.overflow=''; }

// ================================================
// ADMIN / ROLE SYSTEM
// ================================================
function openAdminLogin(callback) {
  pinBuffer = '';
  document.getElementById('pin-error').textContent = '';
  updatePinDisplay();
  openModal('modal-admin-login');
  window._pinCallback = callback || null;
}

function updatePinDisplay() {
  for (var i = 0; i < 4; i++) {
    var dot = document.getElementById('pd' + i);
    if (dot) dot.classList.toggle('filled', i < pinBuffer.length);
  }
}

function handlePinKey(key) {
  if (key === 'cancel') { closeModal('modal-admin-login'); pinBuffer = ''; return; }
  if (key === 'del') { pinBuffer = pinBuffer.slice(0,-1); updatePinDisplay(); return; }
  if (pinBuffer.length >= 4) return;
  pinBuffer += key;
  updatePinDisplay();
  if (pinBuffer.length === 4) {
    var db = getDB();
    if (pinBuffer === db.adminPin) {
      isAdmin = true;
      closeModal('modal-admin-login');
      pinBuffer = '';
      updateAdminUI();
      toast('Welcome, Admin!', 'gold');
      if (window._pinCallback) { window._pinCallback(); window._pinCallback = null; }
      else { showSection(currentSection); }
    } else {
      document.getElementById('pin-error').textContent = 'Incorrect PIN. Try again.';
      pinBuffer = '';
      updatePinDisplay();
      setTimeout(function(){ document.getElementById('pin-error').textContent = ''; }, 2000);
    }
  }
}

function adminLogout() {
  isAdmin = false;
  updateAdminUI();
  showSection('dashboard');
  toast('Logged out.');
}

function updateAdminUI() {
  var loginBtn = document.getElementById('admin-login-btn');
  var logoutBtn = document.getElementById('admin-logout-btn');
  var roleInfo = document.getElementById('topbar-role-info');
  if (isAdmin) {
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'block';
    roleInfo.innerHTML = '<span class="role-badge-admin"><i class="fas fa-shield-halved"></i> Admin</span>';
  } else {
    loginBtn.style.display = 'block';
    logoutBtn.style.display = 'none';
    roleInfo.innerHTML = '';
  }
  // Show/hide add shift button
  var addShiftBtn = document.getElementById('btn-add-shift');
  if (addShiftBtn) addShiftBtn.style.display = isAdmin ? 'flex' : 'none';
}

// ================================================
// FINANCE PIN SYSTEM
// ================================================
function openFinanceLogin(callback) {
  finPinBuffer = '';
  document.getElementById('fin-pin-error').textContent = '';
  updateFinPinDisplay();
  openModal('modal-finance-login');
  window._finPinCallback = callback || null;
}

function updateFinPinDisplay() {
  for (var i = 0; i < 4; i++) {
    var dot = document.getElementById('fpd' + i);
    if (dot) dot.classList.toggle('filled', i < finPinBuffer.length);
  }
}

function handleFinPinKey(key) {
  if (key === 'cancel') { closeModal('modal-finance-login'); finPinBuffer = ''; return; }
  if (key === 'del') { finPinBuffer = finPinBuffer.slice(0,-1); updateFinPinDisplay(); return; }
  if (finPinBuffer.length >= 4) return;
  finPinBuffer += key;
  updateFinPinDisplay();
  if (finPinBuffer.length === 4) {
    var db = getDB();
    if (finPinBuffer === db.financePin) {
      isFinance = true;
      closeModal('modal-finance-login');
      finPinBuffer = '';
      updateFinanceUI();
      toast('Finance access granted!', 'gold');
      if (window._finPinCallback) { window._finPinCallback(); window._finPinCallback = null; }
      else { showSection('finance'); }
    } else {
      document.getElementById('fin-pin-error').textContent = 'Incorrect PIN. Try again.';
      finPinBuffer = '';
      updateFinPinDisplay();
      setTimeout(function(){ document.getElementById('fin-pin-error').textContent = ''; }, 2000);
    }
  }
}

function financeLogout() {
  isFinance = false;
  updateFinanceUI();
  if (currentSection === 'finance') showSection('dashboard');
  toast('Finance logged out.');
}

function updateFinanceUI() {
  var loginBtn = document.getElementById('finance-login-btn');
  var logoutBtn = document.getElementById('finance-logout-btn');
  if (loginBtn) loginBtn.style.display = isFinance ? 'none' : 'flex';
  if (logoutBtn) logoutBtn.style.display = isFinance ? 'flex' : 'none';
}

function changeFinancePin() {
  var np = document.getElementById('new-finance-pin').value;
  var cp = document.getElementById('confirm-finance-pin').value;
  if (!/^\d{4}$/.test(np)) { toast('Finance PIN must be 4 digits','error'); return; }
  if (np !== cp) { toast('PINs do not match','error'); return; }
  var db = getDB(); db.financePin = np; saveDB(db);
  document.getElementById('new-finance-pin').value=''; document.getElementById('confirm-finance-pin').value='';
  sbFetch('PATCH','settings',{finance_pin:np},'id=eq.config').catch(function(){});
  toast('Finance PIN updated!', 'gold');
}

// ================================================
// DRAWER / NAVIGATION
// ================================================
function openDrawer() { document.getElementById('drawer').classList.add('open'); document.getElementById('drawer-overlay').classList.add('open'); document.body.style.overflow='hidden'; }
function closeDrawer() { document.getElementById('drawer').classList.remove('open'); document.getElementById('drawer-overlay').classList.remove('open'); document.body.style.overflow=''; }

function showSection(name) {
  // Admin-gated sections
  if ((name === 'blackbox' || name === 'settings') && !isAdmin) {
    // Still show the section but with locked overlay
  }
  document.querySelectorAll('.page-section').forEach(function(s){ s.classList.remove('active'); });
  var sec = document.getElementById('section-' + name);
  if (!sec) return;
  sec.classList.add('active');

  document.querySelectorAll('.bnav-item').forEach(function(b){ b.classList.remove('active'); });
  var bn = document.getElementById('bnav-' + name);
  if (bn) bn.classList.add('active');
  document.querySelectorAll('.drawer-item').forEach(function(b){ b.classList.remove('active'); });
  var di = document.getElementById('ditem-' + name);
  if (di) di.classList.add('active');

  var titles = {dashboard:'Bar da Praia',inventory:'Inventory',reservations:'Reservations',tasks:'Tasks',shifts:'Shifts',blackbox:'Black Box',finance:'Finance',settings:'Settings'};
  document.getElementById('topbar-title').textContent = titles[name] || 'Bar da Praia';
  currentSection = name;

  if (name === 'dashboard')    renderDashboard();
  if (name === 'inventory')    renderInventory();
  if (name === 'reservations') { renderCalendar(); renderAllReservations(); }
  if (name === 'tasks')        renderTasks();
  if (name === 'shifts')       renderShifts();
  if (name === 'blackbox')     renderBlackBox();
  if (name === 'finance')      renderFinance();
  if (name === 'settings')     renderSettings();
}

// ================================================
// EMPLOYEES
// ================================================
function getEmployees() { return getDB().employees; }
function addEmployee() {
  var inp = document.getElementById('new-employee-name');
  var name = inp.value.trim(); if (!name) return;
  var db = getDB();
  if (db.employees.indexOf(name) !== -1) { toast('Already exists!','error'); return; }
  db.employees.push(name); saveDB(db); inp.value=''; renderSettings(); updateAllDropdowns(); toast('Adding...');
  sbFetch('POST','employees',{name:name}).then(function(){
    toast('Employee added!');
  }).catch(function(){ toast('Saved locally (sync later)','error'); });
}
function removeEmployee(name) {
  if (!confirm('Remove '+name+'?')) return;
  var db=getDB(); db.employees=db.employees.filter(function(e){return e!==name;}); saveDB(db);
  renderSettings(); updateAllDropdowns();
  sbFetch('DELETE','employees',null,'name=eq.'+encodeURIComponent(name)).then(function(){
    toast('Removed.');
  }).catch(function(){ toast('Removed locally','error'); });
}
function updateAllDropdowns() {
  var emp = getEmployees();
  var opts = '<option value="">-- Select --</option>' + emp.map(function(e){return '<option value="'+esc(e)+'">'+esc(e)+'</option>';}).join('');
  ['inv-employee','update-qty-employee','task-assigned','shift-employee'].forEach(function(id){
    var el=document.getElementById(id); if(!el) return;
    var cur=el.value; el.innerHTML=opts; el.value=cur;
  });
  var gs=document.getElementById('topbar-emp');
  if(gs){ var c=gs.value; gs.innerHTML='<option value="">Staff</option>'+emp.map(function(e){return '<option value="'+esc(e)+'">'+esc(e)+'</option>';}).join(''); gs.value=c; }
}

// ================================================
// TABLE MANAGEMENT
// ================================================
function getTables() { return getDB().tables || []; }
function saveTablesToSb(tables) {
  sbFetch('PATCH','settings',{tables:tables},'id=eq.config').catch(function(e){ console.warn('Table sync err',e); });
}
function addTableNum() {
  var inp = document.getElementById('new-table-num');
  var val = inp.value.trim(); if (!val) return;
  var db = getDB();
  if (db.tables.indexOf(val) !== -1) { toast('Already exists!','error'); return; }
  db.tables.push(val); saveDB(db); inp.value=''; renderSettings(); toast('Table added!');
  saveTablesToSb(db.tables);
}
function removeTableNum(val) {
  var db = getDB(); db.tables = db.tables.filter(function(t){return t!==val;}); saveDB(db);
  renderSettings(); toast('Table removed.');
  saveTablesToSb(db.tables);
}
function renderTableGrid(gridId, selectedArr) {
  var tables = getTables();
  var grid = document.getElementById(gridId); if (!grid) return;
  grid.innerHTML = '';
  tables.forEach(function(t) {
    var chip = document.createElement('div');
    chip.className = 'table-chip' + (selectedArr.indexOf(t)!==-1 ? ' selected' : '');
    chip.textContent = t;
    chip.dataset.tableVal = t;
    grid.appendChild(chip);
  });
}

// ================================================
// SETTINGS
// ================================================
function renderSettings() {
  var settingsLocked = document.getElementById('settings-locked');
  var settingsContent = document.getElementById('settings-content');
  if (!isAdmin) {
    settingsLocked.style.display = 'flex';
    settingsContent.style.display = 'none';
    return;
  }
  settingsLocked.style.display = 'none';
  settingsContent.style.display = 'block';

  var db = getDB();
  var el = document.getElementById('employee-list');
  el.innerHTML = db.employees.length===0
    ? '<div class="empty-state" style="padding:16px"><p>No employees yet.</p></div>'
    : db.employees.map(function(e){
        return '<div class="emp-row"><div style="display:flex;align-items:center;gap:10px"><div class="emp-avatar">'+esc(e[0])+'</div><span style="font-size:14px;font-weight:600;color:var(--ocean-900)">'+esc(e)+'</span></div>'
          +'<button class="btn btn-danger btn-sm btn-icon" data-remove-emp="'+esc(e)+'"><i class="fas fa-trash"></i></button></div>';
      }).join('');

  // Table config
  var tg = document.getElementById('table-num-grid');
  tg.innerHTML = db.tables.map(function(t){
    return '<div class="table-num-chip">'+esc(t)+'<button class="del-chip" data-del-table="'+esc(t)+'">&times;</button></div>';
  }).join('');

  document.getElementById('sb-url').value = SB_URL;
  document.getElementById('sb-key').value = SB_KEY.slice(0,30) + '...';
  updateSupabaseStatus();
  updateAllDropdowns();
}

function changePin() {
  var np = document.getElementById('new-pin').value;
  var cp = document.getElementById('confirm-pin').value;
  if (!/^\d{4}$/.test(np)) { toast('PIN must be 4 digits','error'); return; }
  if (np !== cp) { toast('PINs do not match','error'); return; }
  var db = getDB(); db.adminPin = np; saveDB(db);
  document.getElementById('new-pin').value=''; document.getElementById('confirm-pin').value='';
  sbFetch('PATCH','settings',{admin_pin:np},'id=eq.config').then(function(){
    toast('PIN updated!','gold');
  }).catch(function(){ toast('PIN updated locally','gold'); });
}

function saveSupabase() {
  // Re-sync from Supabase on demand
  toast('Syncing with Supabase...','gold');
  syncFromSupabase().then(function(){
    renderDashboard(); renderInventory(); renderAllReservations(); renderTasks(); renderShifts();
    updateAllDropdowns(); toast('Synced successfully!','gold');
  });
}
function updateSupabaseStatus() {
  setSbStatus(true, 'Connected · ' + SB_URL.replace('https://',''));
}

// ================================================
// FINANCE
// ================================================
function switchFinTab(tab) {
  ['entry','records'].forEach(function(x){
    document.getElementById('fin-tab-'+x).classList.toggle('active',x===tab);
    document.getElementById('fin-panel-'+x).style.display=x===tab?'block':'none';
  });
  currentFinTab = tab;
  if (tab === 'records') renderFinRecords();
}

function renderFinance() {
  var locked = document.getElementById('finance-locked');
  var content = document.getElementById('finance-content');
  if (!isFinance) {
    locked.style.display = 'flex';
    content.style.display = 'none';
    return;
  }
  locked.style.display = 'none';
  content.style.display = 'block';
  // Set today's date label
  var today = toDateStr(new Date());
  var el = document.getElementById('fin-entry-date');
  if (el) el.textContent = new Date().toLocaleDateString('en-GB',{weekday:'long',day:'2-digit',month:'long',year:'numeric'});
  // Check if there's already an entry for today and pre-fill
  var db = getDB();
  var existing = (db.finEntries||[]).find(function(e){ return e.date === today; });
  if (existing) {
    setFinForm(existing);
  }
  updateFinDayTotal();
  if (currentFinTab === 'records') renderFinRecords();
}

function setFinForm(entry) {
  document.getElementById('fin-t51').value = entry.t51 || '';
  document.getElementById('fin-multibanco').value = entry.multibanco || '';
  document.getElementById('fin-invoiced').value = entry.invoiced || '';
  document.getElementById('fin-tips').value = entry.tips || '';
  document.getElementById('fin-entregar').value = entry.entregar || '';
  document.getElementById('fin-cash').value = entry.cash || '';
  document.getElementById('fin-coins').value = entry.coins || '';
  document.getElementById('fin-notes').value = entry.notes || '';
  updateFinDayTotal();
}

function getFinFormValues() {
  return {
    t51:        parseFloat(document.getElementById('fin-t51').value) || 0,
    multibanco: parseFloat(document.getElementById('fin-multibanco').value) || 0,
    invoiced:   parseFloat(document.getElementById('fin-invoiced').value) || 0,
    tips:       parseFloat(document.getElementById('fin-tips').value) || 0,
    entregar:   parseFloat(document.getElementById('fin-entregar').value) || 0,
    cash:       parseFloat(document.getElementById('fin-cash').value) || 0,
    coins:      parseFloat(document.getElementById('fin-coins').value) || 0,
    notes:      document.getElementById('fin-notes').value.trim()
  };
}

function updateFinDayTotal() {
  var v = getFinFormValues();
  var total = v.t51 + v.multibanco;
  var calcEl = document.getElementById('fin-total-day-calc');
  var totalEl = document.getElementById('fin-day-total');
  if (calcEl) calcEl.textContent = fmtEur(total);
  if (totalEl) totalEl.textContent = fmtEur(total);
}

function saveFinanceEntry() {
  var v = getFinFormValues();
  var total = v.t51 + v.multibanco;
  var today = toDateStr(new Date());
  var db = getDB();
  if (!db.finEntries) db.finEntries = [];
  var idx = db.finEntries.findIndex(function(e){ return e.date === today; });
  var entry = {
    id: idx !== -1 ? db.finEntries[idx].id : uid(),
    date: today,
    t51: v.t51, multibanco: v.multibanco, totalDay: total,
    invoiced: v.invoiced, tips: v.tips, entregar: v.entregar,
    cash: v.cash, coins: v.coins, notes: v.notes, savedAt: new Date().toISOString()
  };
  if (idx !== -1) { db.finEntries[idx] = entry; } else { db.finEntries.unshift(entry); }
  saveDB(db);
  toast('Daily finance entry saved!', 'gold');
  updateFinDayTotal();
  // Supabase sync
  sbFetch(idx !== -1 ? 'PATCH' : 'POST', 'fin_entries',
    { id: entry.id, date: entry.date, t51: entry.t51, multibanco: entry.multibanco,
      total_day: entry.totalDay, invoiced: entry.invoiced, tips: entry.tips,
      entregar: entry.entregar, cash: entry.cash, coins: entry.coins, notes: entry.notes, saved_at: entry.savedAt },
    idx !== -1 ? 'id=eq.'+entry.id : null
  ).catch(function(){ /* saved locally */ });
}

function clearFinanceEntry() {
  ['fin-t51','fin-multibanco','fin-invoiced','fin-tips','fin-entregar','fin-cash','fin-coins','fin-notes'].forEach(function(id){
    var el = document.getElementById(id); if(el) el.value='';
  });
  updateFinDayTotal();
}

function renderFinRecords() {
  var db = getDB();
  var entries = (db.finEntries||[]).slice().sort(function(a,b){ return b.date.localeCompare(a.date); });
  var today = toDateStr(new Date());
  var weekStart = toDateStr(getMonday(new Date()));
  var monthStr = today.slice(0,7);

  var todayTotal=0, weekTotal=0, monthTotal=0;
  entries.forEach(function(e){
    var t = e.totalDay || 0;
    if (e.date === today) todayTotal += t;
    if (e.date >= weekStart) weekTotal += t;
    if (e.date.slice(0,7) === monthStr) monthTotal += t;
  });
  var todayEl = document.getElementById('fin-rec-today');
  var weekEl  = document.getElementById('fin-rec-week');
  var monthEl = document.getElementById('fin-rec-month');
  if (todayEl) todayEl.textContent = fmtEur(todayTotal);
  if (weekEl)  weekEl.textContent  = fmtEur(weekTotal);
  if (monthEl) monthEl.textContent = fmtEur(monthTotal);

  var listEl = document.getElementById('fin-records-list');
  if (!listEl) return;
  if (!entries.length) {
    listEl.innerHTML = '<div class="empty-state" style="padding:24px"><i class="fas fa-folder-open"></i><p>No records yet.</p></div>';
    return;
  }
  listEl.innerHTML = entries.map(function(e){
    var total = e.totalDay || 0;
    return '<div class="fin-record">'
      +'<div class="fin-record-header">'
        +'<span class="fin-record-date">'+fmtDateShort(e.date)+'</span>'
        +'<span class="fin-record-total">'+fmtEur(total)+'</span>'
      +'</div>'
      +'<div class="fin-row"><span class="fin-row-label"><i class="fas fa-cash-register" style="color:var(--ocean-400)"></i> T 51</span><span class="fin-row-val">'+fmtEur(e.t51||0)+'</span></div>'
      +'<div class="fin-row"><span class="fin-row-label"><i class="fas fa-credit-card" style="color:var(--ocean-400)"></i> MultiBanco</span><span class="fin-row-val">'+fmtEur(e.multibanco||0)+'</span></div>'
      +'<div class="fin-row"><span class="fin-row-label"><i class="fas fa-file-invoice" style="color:#10b981"></i> Total Invoiced</span><span class="fin-row-val">'+fmtEur(e.invoiced||0)+'</span></div>'
      +'<div class="fin-row"><span class="fin-row-label"><i class="fas fa-hand-holding-dollar" style="color:#f59e0b"></i> Tips</span><span class="fin-row-val">'+fmtEur(e.tips||0)+'</span></div>'
      +'<div class="fin-row"><span class="fin-row-label"><i class="fas fa-arrow-right" style="color:#ef4444"></i> € Entregar</span><span class="fin-row-val">'+fmtEur(e.entregar||0)+'</span></div>'
      +'<div class="fin-row"><span class="fin-row-label"><i class="fas fa-coins" style="color:#f59e0b"></i> Cash Details</span><span class="fin-row-val">'+fmtEur(e.cash||0)+'</span></div>'
      +(e.coins ? '<div class="fin-row"><span class="fin-row-label"><i class="fas fa-circle-dollar-to-slot" style="color:#f59e0b"></i> Coins</span><span class="fin-row-val">'+fmtEur(e.coins||0)+'</span></div>' : '')
      +(e.notes ? '<div class="fin-row"><span class="fin-row-label"><i class="fas fa-note-sticky" style="color:var(--ocean-300)"></i> Notes</span><span style="font-size:13px;color:var(--ocean-600)">'+esc(e.notes)+'</span></div>' : '')
    +'</div>';
  }).join('');
}

// ================================================
// INVENTORY
// ================================================
var catIconMap={beverages:'🍹',food:'🍔',supplies:'🧹',equipment:'🔧',other:'📦'};
function switchInvTab(t) {
  ['stock','log','orders'].forEach(function(x){
    document.getElementById('inv-tab-'+x).classList.toggle('active',x===t);
    document.getElementById('inv-panel-'+x).style.display=x===t?'block':'none';
  });
  if(t==='log') renderInvLog();
  if(t==='orders') renderOrderHistory();
}
function openAddInventoryModal(editId) {
  updateAllDropdowns();
  if(editId){
    var db=getDB(); var item=db.inventory.find(function(i){return i.id===editId;}); if(!item) return;
    editInventoryId=editId;
    document.getElementById('inv-modal-title').textContent='Edit Item';
    document.getElementById('inv-item-name').value=item.name;
    document.getElementById('inv-category').value=item.category||'other';
    document.getElementById('inv-unit').value=item.unit||'';
    document.getElementById('inv-qty-bar').value=item.qtyBar;
    document.getElementById('inv-qty-storage').value=item.qtyStorage;
    document.getElementById('inv-minimum').value=item.minimum;
    document.getElementById('inv-employee').value=item.lastEmployee||'';
  } else {
    editInventoryId=null;
    document.getElementById('inv-modal-title').textContent='Add Item';
    document.getElementById('inv-item-name').value='';
    document.getElementById('inv-unit').value='';
    document.getElementById('inv-category').value='beverages';
    document.getElementById('inv-qty-bar').value='0';
    document.getElementById('inv-qty-storage').value='0';
    document.getElementById('inv-minimum').value='10';
    document.getElementById('inv-employee').value='';
  }
  openModal('modal-add-inventory');
}
function saveInventoryItem() {
  var name=document.getElementById('inv-item-name').value.trim(); if(!name){toast('Name required!','error');return;}
  var db=getDB(); var emp=document.getElementById('inv-employee').value;
  var qb=parseInt(document.getElementById('inv-qty-bar').value)||0;
  var qs=parseInt(document.getElementById('inv-qty-storage').value)||0;
  var min=parseInt(document.getElementById('inv-minimum').value)||0;
  var cat=document.getElementById('inv-category').value;
  var unit=document.getElementById('inv-unit').value.trim();
  var now=new Date().toISOString();
  var eid=editInventoryId;
  if(eid){
    var idx=db.inventory.findIndex(function(i){return i.id===eid;});
    if(idx!==-1){var old=db.inventory[idx]; db.inventory[idx]=Object.assign({},old,{name:name,category:cat,unit:unit,qtyBar:qb,qtyStorage:qs,minimum:min,lastEmployee:emp,updatedAt:now}); addInvLog(db,{action:'update',item:name,employee:emp,qtyBar:qb,qtyStorage:qs});}
    saveDB(db); closeModal('modal-add-inventory'); renderInventory(); renderDashboard(); toast('Updating...'); editInventoryId=null;
    sbFetch('PATCH','inventory',{name:name,category:cat,unit:unit,qty_bar:qb,qty_storage:qs,minimum:min,last_employee:emp,updated_at:now},'id=eq.'+eid)
      .then(function(){ sbAddInvLog({action:'update',item:name,employee:emp,qty_bar:qb,qty_storage:qs}); toast('Updated!'); })
      .catch(function(){ toast('Saved locally','error'); });
  } else {
    var newId=uid();
    db.inventory.push({id:newId,name:name,category:cat,unit:unit,qtyBar:qb,qtyStorage:qs,minimum:min,lastEmployee:emp,createdAt:now,updatedAt:now});
    addInvLog(db,{action:'add',item:name,employee:emp,qtyBar:qb,qtyStorage:qs});
    saveDB(db); closeModal('modal-add-inventory'); renderInventory(); renderDashboard(); toast('Adding...'); editInventoryId=null;
    sbFetch('POST','inventory',{name:name,category:cat,unit:unit,qty_bar:qb,qty_storage:qs,minimum:min,last_employee:emp})
      .then(function(rows){
        if(rows&&rows[0]){var oid=db.inventory.findIndex(function(i){return i.id===newId;}); if(oid!==-1) db.inventory[oid].id=rows[0].id; saveDB(db);}
        sbAddInvLog({action:'add',item:name,employee:emp,qty_bar:qb,qty_storage:qs}); toast('Item added!');
      }).catch(function(){ toast('Saved locally','error'); });
  }
}
function addInvLog(db,entry){db.invLogs.unshift(Object.assign({},entry,{timestamp:new Date().toISOString(),id:uid()})); if(db.invLogs.length>300) db.invLogs=db.invLogs.slice(0,300);}
function sbAddInvLog(entry){ sbFetch('POST','inv_logs',Object.assign({timestamp:new Date().toISOString()},entry)).catch(function(){}); }
function deleteInventoryItem(id){
  if(!confirm('Delete this item?')) return;
  var db=getDB(); var item=db.inventory.find(function(i){return i.id===id;});
  db.inventory=db.inventory.filter(function(i){return i.id!==id;});
  addInvLog(db,{action:'delete',item:item?item.name:'?',employee:'System'});
  saveDB(db); renderInventory(); renderDashboard(); toast('Deleting...');
  sbFetch('DELETE','inventory',null,'id=eq.'+id).then(function(){
    if(item) sbAddInvLog({action:'delete',item:item.name,employee:'System',qty_bar:0,qty_storage:0});
    toast('Deleted.');
  }).catch(function(){ toast('Deleted locally','error'); });
}
function openUpdateQtyModal(id){
  updateAllDropdowns();
  var db=getDB(); var item=db.inventory.find(function(i){return i.id===id;}); if(!item) return;
  document.getElementById('update-qty-id').value=id;
  document.getElementById('update-qty-name').textContent=item.name+(item.unit?' ('+item.unit+')':'');
  document.getElementById('update-qty-bar').value=item.qtyBar;
  document.getElementById('update-qty-storage').value=item.qtyStorage;
  document.getElementById('update-qty-employee').value=item.lastEmployee||'';
  openModal('modal-update-qty');
}
function saveQtyUpdate(){
  var id=document.getElementById('update-qty-id').value;
  var emp=document.getElementById('update-qty-employee').value;
  var qb=parseInt(document.getElementById('update-qty-bar').value)||0;
  var qs=parseInt(document.getElementById('update-qty-storage').value)||0;
  var now=new Date().toISOString();
  var db=getDB(); var idx=db.inventory.findIndex(function(i){return i.id===id;});
  var iname='';
  if(idx!==-1){var item=db.inventory[idx]; iname=item.name; db.inventory[idx]=Object.assign({},item,{qtyBar:qb,qtyStorage:qs,lastEmployee:emp,updatedAt:now}); addInvLog(db,{action:'update',item:item.name,employee:emp,qtyBar:qb,qtyStorage:qs});}
  saveDB(db); closeModal('modal-update-qty'); renderInventory(); renderDashboard(); toast('Updating...');
  sbFetch('PATCH','inventory',{qty_bar:qb,qty_storage:qs,last_employee:emp,updated_at:now},'id=eq.'+id)
    .then(function(){ sbAddInvLog({action:'update',item:iname,employee:emp,qty_bar:qb,qty_storage:qs}); toast('Stock updated!'); })
    .catch(function(){ toast('Updated locally','error'); });
}
function openEditMinimumModal(id){
  var db=getDB(); var item=db.inventory.find(function(i){return i.id===id;}); if(!item) return;
  document.getElementById('edit-min-id').value=id;
  document.getElementById('edit-min-item-name').textContent=item.name;
  document.getElementById('edit-min-current').textContent=(item.qtyBar+item.qtyStorage)+' '+(item.unit||'units');
  document.getElementById('edit-min-value').value=item.minimum;
  openModal('modal-edit-minimum');
}
function saveMinimum(){
  var id=document.getElementById('edit-min-id').value;
  var val=parseInt(document.getElementById('edit-min-value').value)||0;
  var db=getDB(); var idx=db.inventory.findIndex(function(i){return i.id===id;});
  if(idx!==-1) db.inventory[idx].minimum=val;
  saveDB(db); closeModal('modal-edit-minimum'); renderInventory(); toast('Updating...');
  sbFetch('PATCH','inventory',{minimum:val},'id=eq.'+id).then(function(){ toast('Minimum updated!'); }).catch(function(){ toast('Updated locally','error'); });
}
function renderInventory(){
  var db=getDB(); var items=db.inventory.slice();
  if(invSearchVal) items=items.filter(function(i){return i.name.toLowerCase().indexOf(invSearchVal.toLowerCase())!==-1;});
  if(invCatFilter) items=items.filter(function(i){return i.category===invCatFilter;});
  var el=document.getElementById('inventory-list'); if(!el) return;
  if(items.length===0){el.innerHTML='<div class="empty-state"><i class="fas fa-box-open"></i><p>No items found.</p></div>';return;}
  el.innerHTML=items.map(function(item){
    var total=item.qtyBar+item.qtyStorage; var isLow=total<item.minimum;
    var pct=item.minimum>0?Math.min(Math.round(total/item.minimum*100),100):100;
    return '<div class="inv-card">'
      +'<div class="inv-card-header">'
        +'<div class="inv-cat-icon">'+(catIconMap[item.category]||'📦')+'</div>'
        +'<div style="flex:1;min-width:0"><div class="inv-name">'+esc(item.name)+'</div>'
        +'<div class="inv-meta">'+(item.lastEmployee?'Last: '+esc(item.lastEmployee):'')+(item.updatedAt?' · '+fmtDate(item.updatedAt):'')+'</div></div>'
        +'<span class="badge '+(isLow?'badge-red':'badge-green')+'">'+(isLow?'Low':'OK')+'</span>'
      +'</div>'
      +'<div class="inv-stats">'
        +'<div class="inv-stat"><div class="inv-stat-val">'+item.qtyBar+'</div><div class="inv-stat-label">In Bar</div></div>'
        +'<div class="inv-stat"><div class="inv-stat-val">'+item.qtyStorage+'</div><div class="inv-stat-label">Storage</div></div>'
        +'<div class="inv-stat"><div class="inv-stat-val" style="color:var(--ocean-600)">'+total+'</div><div class="inv-stat-label">Total</div></div>'
        +'<div class="inv-stat min-stat" data-edit-min="'+esc(item.id)+'">'
          +'<div class="inv-stat-val" style="color:#f59e0b">'+item.minimum+'</div>'
          +'<div class="inv-stat-label">Min <i class="fas fa-pen" style="font-size:8px;opacity:.6"></i></div>'
        +'</div>'
      +'</div>'
      +'<div class="progress-bar"><div class="progress-fill '+(isLow?'low':'')+'" style="width:'+pct+'%"></div></div>'
      +'<div class="inv-actions" style="margin-top:10px">'
        +'<button class="btn btn-secondary btn-sm" style="flex:1;justify-content:center" data-update-qty="'+esc(item.id)+'"><i class="fas fa-pen"></i> Update</button>'
        +'<button class="btn btn-secondary btn-sm btn-icon" data-edit-inv="'+esc(item.id)+'"><i class="fas fa-edit"></i></button>'
        +'<button class="btn btn-danger btn-sm btn-icon" data-delete-inv="'+esc(item.id)+'"><i class="fas fa-trash"></i></button>'
      +'</div>'
    +'</div>';
  }).join('');
}
function renderInvLog(){
  var db=getDB(); var el=document.getElementById('inv-log-list'); if(!el) return;
  if(db.invLogs.length===0){el.innerHTML='<div class="empty-state"><i class="fas fa-clock-rotate-left"></i><p>No log entries yet.</p></div>';return;}
  var icons={add:'<i class="fas fa-plus" style="color:#16a34a"></i>',update:'<i class="fas fa-pen" style="color:#1d4ed8"></i>',delete:'<i class="fas fa-trash" style="color:#dc2626"></i>'};
  el.innerHTML=db.invLogs.map(function(l){
    return '<div class="log-item"><div class="log-icon">'+(icons[l.action]||'📝')+'</div><div style="flex:1"><div style="font-size:13px;font-weight:600;color:var(--ocean-900)">'+esc(l.item)+'</div><div style="font-size:11px;color:var(--ocean-400)">'+esc(l.action)+' · '+esc(l.employee||'System')+'</div></div><div style="font-size:11px;color:var(--ocean-400)">'+fmtDate(l.timestamp)+'</div></div>';
  }).join('');
}
function updateOrdersBadge(){
  var db=getDB();
  var standbyCount=db.orders.filter(function(o){return o.status==='standby';}).length;
  var badge=document.getElementById('orders-standby-badge');
  if(badge){ badge.textContent=standbyCount>0?standbyCount:''; badge.style.display=standbyCount>0?'inline':'none'; }
}
function renderOrderHistory(){
  var db=getDB(); var el=document.getElementById('inv-orders-list'); if(!el) return;
  updateOrdersBadge();
  if(db.orders.length===0){el.innerHTML='<div class="empty-state"><i class="fas fa-truck"></i><p>No orders yet.</p></div>';return;}
  el.innerHTML=db.orders.slice().reverse().map(function(o){
    var isStandby=o.status==='standby';
    return '<div class="'+(isStandby?'order-standby':'order-confirmed')+'">'
      +'<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">'
        +'<span style="font-weight:700;color:var(--ocean-800)">Order #'+o.id.slice(-6).toUpperCase()+'</span>'
        +'<div style="display:flex;gap:6px;align-items:center">'
          +'<span class="badge '+(isStandby?'badge-orange':'badge-green')+'">'+(isStandby?'⏳ Standby':'✓ Approved')+'</span>'
          +(isStandby&&isAdmin?'<button class="btn btn-sm btn-gold" data-confirm-order="'+esc(o.id)+'"><i class="fas fa-check"></i> Approve</button>':isStandby?'<span style="font-size:11px;color:#92400e;font-style:italic">Awaiting admin</span>':'')
        +'</div>'
      +'</div>'
      +'<div style="font-size:11px;color:var(--ocean-400);margin-bottom:8px">'+fmtDate(o.date)+'</div>'
      +'<div>'+o.items.map(function(i){return '<div style="display:flex;justify-content:space-between;font-size:13px;padding:2px 0"><span style="color:var(--ocean-700)">'+esc(i.name)+'</span><span style="font-weight:700;color:var(--ocean-900)">'+i.orderQty+' '+esc(i.unit||'')+'</span></div>';}).join('')+'</div>'
    +'</div>';
  }).join('');
}
function openOrderModal(){
  var db=getDB(); var low=db.inventory.filter(function(i){return(i.qtyBar+i.qtyStorage)<i.minimum;});
  var el=document.getElementById('order-items-list'); if(!el) return;
  if(low.length===0){el.innerHTML='<div class="empty-state" style="padding:20px"><i class="fas fa-check-circle" style="color:#22c55e"></i><p>All items above minimum!</p></div>';}
  else el.innerHTML=low.map(function(item){
    var total=item.qtyBar+item.qtyStorage; var needed=item.minimum-total;
    return '<div class="order-row"><div style="flex:1"><div style="font-weight:700;font-size:14px;color:var(--ocean-900)">'+esc(item.name)+'</div><div style="font-size:12px;color:var(--ocean-400)">Have '+total+' / Need '+item.minimum+' '+esc(item.unit||'')+'</div></div><div style="text-align:right"><div style="font-size:11px;color:var(--ocean-400);margin-bottom:3px">Order</div><input type="number" min="1" value="'+needed+'" class="input-field" id="order-qty-'+esc(item.id)+'" style="width:70px;text-align:center;font-size:14px;padding:6px 8px"/></div></div>';
  }).join('');
  openModal('modal-order');
}
function confirmOrder(){
  var db=getDB(); var low=db.inventory.filter(function(i){return(i.qtyBar+i.qtyStorage)<i.minimum;});
  if(low.length===0){closeModal('modal-order');return;}
  var orderItems=low.map(function(item){
    var qEl=document.getElementById('order-qty-'+item.id);
    return{id:item.id,name:item.name,unit:item.unit,orderQty:qEl?(parseInt(qEl.value)||(item.minimum-item.qtyBar-item.qtyStorage)):item.minimum-item.qtyBar-item.qtyStorage};
  });
  var newOrder={id:uid(),date:new Date().toISOString(),items:orderItems,status:'standby'};
  db.orders.unshift(newOrder);
  saveDB(db); closeModal('modal-order'); renderInventory(); renderDashboard(); updateOrdersBadge(); toast('Submitting order...','gold');
  sbFetch('POST','orders',{items:orderItems,status:'standby'}).then(function(rows){
    if(rows&&rows[0]){var oi=db.orders.findIndex(function(o){return o.id===newOrder.id;}); if(oi!==-1) db.orders[oi].id=rows[0].id; saveDB(db);}
    renderOrderHistory(); updateOrdersBadge(); toast('Order submitted — awaiting admin approval.','gold');
  }).catch(function(){ toast('Order saved locally','error'); });
}
function approveOrder(orderId){
  var db=getDB(); var idx=db.orders.findIndex(function(o){return o.id===orderId;});
  if(idx!==-1) db.orders[idx].status='confirmed';
  saveDB(db); renderOrderHistory(); renderDashboard(); toast('Approving...','gold');
  sbFetch('PATCH','orders',{status:'confirmed'},'id=eq.'+orderId).then(function(){
    toast('Order approved!','gold');
  }).catch(function(){ toast('Approved locally','error'); });
}

// ================================================
// RESERVATIONS
// ================================================
function switchResTab(t){
  ['calendar','list'].forEach(function(x){
    document.getElementById('res-tab-'+x).classList.toggle('active',x===t);
    document.getElementById('res-panel-'+x).style.display=x===t?'block':'none';
  });
}
function prevWeek(){calendarWeekStart.setDate(calendarWeekStart.getDate()-7);renderCalendar();}
function nextWeek(){calendarWeekStart.setDate(calendarWeekStart.getDate()+7);renderCalendar();}
function renderCalendar(){
  var db=getDB();
  var dnames=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  var mnames=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var end=new Date(calendarWeekStart); end.setDate(end.getDate()+6);
  document.getElementById('calendar-week-label').textContent=mnames[calendarWeekStart.getMonth()]+' '+calendarWeekStart.getDate()+' - '+mnames[end.getMonth()]+' '+end.getDate();
  var grid=document.getElementById('calendar-grid'); if(!grid) return;
  var today=new Date(); today.setHours(0,0,0,0);
  grid.innerHTML='';
  for(var i=0;i<7;i++){
    var day=new Date(calendarWeekStart); day.setDate(day.getDate()+i);
    var dateStr=toDateStr(day);
    var isToday=day.getTime()===today.getTime();
    var isSel=selectedCalendarDay===dateStr;
    var dayRes=db.reservations.filter(function(r){return r.date===dateStr;});
    var conf=dayRes.filter(function(r){return r.status==='confirmed';}).length;
    var pend=dayRes.filter(function(r){return !r.status||r.status==='pending';}).length;
    var nos=dayRes.filter(function(r){return r.status==='no-show';}).length;
    var el=document.createElement('div');
    el.className='cal-day'+(isToday?' today':'')+(isSel?' selected':'');
    el.dataset.calDay=dateStr;
    var dots='';
    for(var c=0;c<Math.min(conf,3);c++) dots+='<span style="background:'+(isSel?'rgba(255,255,255,.8)':'#22c55e')+'"></span>';
    for(var p=0;p<Math.min(pend,3);p++) dots+='<span style="background:'+(isSel?'rgba(255,255,255,.8)':'#f59e0b')+'"></span>';
    for(var n=0;n<Math.min(nos,3);n++) dots+='<span style="background:'+(isSel?'rgba(255,255,255,.8)':'#ef4444')+'"></span>';
    el.innerHTML='<div class="cal-day-name">'+dnames[i]+'</div><div class="cal-day-num">'+day.getDate()+'</div>'+(dots?'<div class="cal-dots">'+dots+'</div>':'')+(dayRes.length>0?'<div class="cal-count">'+dayRes.length+'</div>':'');
    grid.appendChild(el);
  }
  if(selectedCalendarDay) renderDayReservations(selectedCalendarDay);
}
function renderDayReservations(dateStr){
  var db=getDB();
  var res=db.reservations.filter(function(r){return r.date===dateStr;}).sort(function(a,b){return a.time.localeCompare(b.time);});
  var d=new Date(dateStr+'T12:00:00');
  var dnames=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var mnames=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  document.getElementById('res-day-label').textContent=dnames[d.getDay()]+', '+mnames[d.getMonth()]+' '+d.getDate();
  var el=document.getElementById('res-day-list'); if(!el) return;
  if(res.length===0){el.innerHTML='<div class="empty-state"><i class="fas fa-calendar-xmark"></i><p>No reservations this day.</p></div>';return;}
  el.innerHTML=res.map(function(r){
    var tables=Array.isArray(r.tables)?r.tables.join(', '):(r.table||'?');
    return '<div class="res-item '+(r.status==='no-show'?'no-show':r.status==='confirmed'?'confirmed':'')+'" data-open-res-detail="'+esc(r.id)+'">'
      +'<div class="res-item-top"><div><span class="res-time">'+esc(r.time)+'</span><span class="res-name">'+esc(r.guestName)+'</span></div>'
      +'<span class="badge '+(r.status==='confirmed'?'badge-green':r.status==='no-show'?'badge-red':'badge-yellow')+'">'+esc(r.status||'Pending')+'</span></div>'
      +'<div class="res-meta"><span><i class="fas fa-users" style="margin-right:3px"></i>'+r.guests+'</span><span><i class="fas fa-chair" style="margin-right:3px"></i>'+esc(tables)+'</span>'+(r.phone?'<span><i class="fas fa-phone" style="margin-right:3px"></i>'+esc(r.phone)+'</span>':'')+'</div>'
    +'</div>';
  }).join('');
}
function openResDetail(id){
  var db=getDB(); var r=db.reservations.find(function(x){return x.id===id;}); if(!r) return;
  var tables=Array.isArray(r.tables)?r.tables.join(', '):(r.table||'?');
  document.getElementById('res-detail-content').innerHTML='<div class="detail-grid">'
    +'<div class="detail-cell"><div class="detail-cell-label">Guest</div><div class="detail-cell-val">'+esc(r.guestName)+'</div></div>'
    +'<div class="detail-cell"><div class="detail-cell-label">Status</div><div class="detail-cell-val"><span class="badge '+(r.status==='confirmed'?'badge-green':r.status==='no-show'?'badge-red':'badge-yellow')+'">'+esc(r.status||'Pending')+'</span></div></div>'
    +'<div class="detail-cell"><div class="detail-cell-label">Date</div><div class="detail-cell-val">'+esc(r.date)+'</div></div>'
    +'<div class="detail-cell"><div class="detail-cell-label">Time</div><div class="detail-cell-val">'+esc(r.time)+'</div></div>'
    +'<div class="detail-cell"><div class="detail-cell-label">Guests</div><div class="detail-cell-val">'+r.guests+' people</div></div>'
    +'<div class="detail-cell"><div class="detail-cell-label">Tables</div><div class="detail-cell-val">'+esc(tables)+'</div></div>'
    +(r.phone?'<div class="detail-cell"><div class="detail-cell-label">Phone</div><div class="detail-cell-val">'+esc(r.phone)+'</div></div>':'')
    +(r.notes?'<div class="detail-cell full"><div class="detail-cell-label">Notes</div><div class="detail-cell-val">'+esc(r.notes)+'</div></div>':'')
    +'</div>';
  var actEl=document.getElementById('res-detail-actions'); actEl.innerHTML='';
  function mkBtn(cls,html,cb){var b=document.createElement('button');b.className=cls;b.innerHTML=html;b.addEventListener('click',cb);return b;}
  actEl.appendChild(mkBtn('btn btn-sm','<i class="fas fa-check"></i> Confirmed',function(){setResStatus(id,'confirmed');}));
  actEl.appendChild(mkBtn('btn btn-danger btn-sm','<i class="fas fa-user-xmark"></i> No Show',function(){setResStatus(id,'no-show');}));
  actEl.appendChild(mkBtn('btn btn-secondary btn-sm','<i class="fas fa-clock"></i> Pending',function(){setResStatus(id,'pending');}));
  actEl.appendChild(mkBtn('btn btn-secondary btn-sm btn-icon','<i class="fas fa-pen"></i>',function(){closeModal('modal-res-detail');openEditReservation(id);}));
  actEl.appendChild(mkBtn('btn btn-danger btn-sm btn-icon','<i class="fas fa-trash"></i>',function(){deleteReservation(id);}));
  actEl.children[0].style.cssText='background:linear-gradient(135deg,#22c55e,#16a34a);color:white;flex:1;justify-content:center';
  actEl.children[1].style.cssText='flex:1;justify-content:center';
  actEl.children[2].style.cssText='flex:1;justify-content:center';
  openModal('modal-res-detail');
}
function setResStatus(id,status){
  var db=getDB(); var idx=db.reservations.findIndex(function(r){return r.id===id;});
  if(idx!==-1){db.reservations[idx].status=status;saveDB(db);}
  closeModal('modal-res-detail'); renderCalendar(); renderAllReservations(); renderDashboard(); toast('Status: '+status+'!');
  sbFetch('PATCH','reservations',{status:status},'id=eq.'+id).catch(function(){});
}
function openAddReservationModal(){
  selectedTables=[];
  renderTableGrid('res-table-grid', selectedTables);
  document.getElementById('res-modal-title').textContent='New Reservation';
  document.getElementById('res-edit-id').value='';
  document.getElementById('res-guest-name').value='';
  document.getElementById('res-phone').value='';
  document.getElementById('res-date').value=toDateStr(new Date());
  document.getElementById('res-time').value='12:00';
  document.getElementById('res-guests').value='2';
  document.getElementById('res-notes').value='';
  openModal('modal-add-reservation');
}
function openEditReservation(id){
  var db=getDB(); var r=db.reservations.find(function(x){return x.id===id;}); if(!r) return;
  selectedTables=Array.isArray(r.tables)?r.tables.slice():(r.table?[r.table]:[]);
  renderTableGrid('res-table-grid', selectedTables);
  document.getElementById('res-modal-title').textContent='Edit Reservation';
  document.getElementById('res-edit-id').value=id;
  document.getElementById('res-guest-name').value=r.guestName;
  document.getElementById('res-phone').value=r.phone||'';
  document.getElementById('res-date').value=r.date;
  document.getElementById('res-time').value=r.time;
  document.getElementById('res-guests').value=r.guests;
  document.getElementById('res-notes').value=r.notes||'';
  openModal('modal-add-reservation');
}
function saveReservation(){
  var guestName=document.getElementById('res-guest-name').value.trim(); if(!guestName){toast('Guest name required!','error');return;}
  var date=document.getElementById('res-date').value; var time=document.getElementById('res-time').value;
  if(!date||!time){toast('Date and time required!','error');return;}
  if(selectedTables.length===0){toast('Select at least one table!','error');return;}
  var db=getDB(); var editId=document.getElementById('res-edit-id').value;
  var phone=document.getElementById('res-phone').value.trim();
  var guests=parseInt(document.getElementById('res-guests').value)||1;
  var notes=document.getElementById('res-notes').value.trim();
  var res={guestName:guestName,phone:phone,date:date,time:time,guests:guests,tables:selectedTables.slice(),notes:notes,status:'pending'};
  var sbRes={guest_name:guestName,phone:phone,date:date,time:time,guests:guests,tables:selectedTables.slice(),notes:notes,status:'pending'};
  if(editId){
    var idx=db.reservations.findIndex(function(r){return r.id===editId;});
    if(idx!==-1) db.reservations[idx]=Object.assign({},db.reservations[idx],res);
    saveDB(db); closeModal('modal-add-reservation'); renderCalendar(); renderAllReservations(); renderDashboard(); toast('Updating...');
    sbFetch('PATCH','reservations',sbRes,'id=eq.'+editId).then(function(){ toast('Updated!'); }).catch(function(){ toast('Updated locally','error'); });
  } else {
    var newId=uid();
    db.reservations.push(Object.assign({},res,{id:newId,createdAt:new Date().toISOString()}));
    saveDB(db); closeModal('modal-add-reservation'); renderCalendar(); renderAllReservations(); renderDashboard(); toast('Saving...');
    sbFetch('POST','reservations',sbRes).then(function(rows){
      if(rows&&rows[0]){var ri=db.reservations.findIndex(function(r){return r.id===newId;}); if(ri!==-1) db.reservations[ri].id=rows[0].id; saveDB(db);}
      toast('Reservation saved!');
    }).catch(function(){ toast('Saved locally','error'); });
  }
}
function deleteReservation(id){
  if(!confirm('Delete reservation?')) return;
  var db=getDB(); db.reservations=db.reservations.filter(function(r){return r.id!==id;}); saveDB(db);
  closeModal('modal-res-detail'); renderCalendar(); renderAllReservations(); renderDashboard(); toast('Deleting...');
  sbFetch('DELETE','reservations',null,'id=eq.'+id).then(function(){ toast('Deleted.'); }).catch(function(){ toast('Deleted locally','error'); });
}
function renderAllReservations(){
  var db=getDB();
  var res=db.reservations.slice().sort(function(a,b){return(a.date+a.time).localeCompare(b.date+b.time);});
  if(resSearchVal) res=res.filter(function(r){var t=Array.isArray(r.tables)?r.tables.join(','):(r.table||''); return r.guestName.toLowerCase().indexOf(resSearchVal.toLowerCase())!==-1||t.toLowerCase().indexOf(resSearchVal.toLowerCase())!==-1;});
  if(resDateFilter) res=res.filter(function(r){return r.date===resDateFilter;});
  var el=document.getElementById('res-all-list'); if(!el) return;
  if(res.length===0){el.innerHTML='<div class="empty-state"><i class="fas fa-calendar-xmark"></i><p>No reservations found.</p></div>';return;}
  el.innerHTML=res.map(function(r){
    var tables=Array.isArray(r.tables)?r.tables.join(', '):(r.table||'?');
    return '<div class="res-list-item" data-open-res-detail="'+esc(r.id)+'">'
      +'<div class="res-date-box"><div class="rdb-d">'+esc(r.date.slice(5))+'</div><div class="rdb-t">'+esc(r.time)+'</div></div>'
      +'<div style="flex:1;min-width:0"><div style="font-weight:700;font-size:14px;color:var(--ocean-900)">'+esc(r.guestName)+'</div>'
      +'<div style="font-size:12px;color:var(--ocean-400);display:flex;gap:10px;flex-wrap:wrap;margin-top:2px"><span><i class="fas fa-users" style="margin-right:3px"></i>'+r.guests+'</span><span><i class="fas fa-chair" style="margin-right:3px"></i>'+esc(tables)+'</span></div></div>'
      +'<span class="badge '+(r.status==='confirmed'?'badge-green':r.status==='no-show'?'badge-red':'badge-yellow')+'">'+esc(r.status||'Pending')+'</span>'
    +'</div>';
  }).join('');
}

// ================================================
// TASKS
// ================================================
var taskCatIcons={maintenance:'🔧',cleaning:'🧹',call:'📞',purchase:'🛒',admin:'📋',staff:'👥',other:'📌'};
var priColors={high:'badge-red',medium:'badge-yellow',low:'badge-green'};
function openAddTaskModal(editId){
  updateAllDropdowns();
  if(editId){
    var db=getDB(); var t=db.tasks.find(function(x){return x.id===editId;}); if(!t) return;
    document.getElementById('task-modal-title').textContent='Edit Task';
    document.getElementById('task-edit-id').value=editId;
    document.getElementById('task-title').value=t.title;
    document.getElementById('task-description').value=t.description||'';
    document.getElementById('task-category').value=t.category||'other';
    document.getElementById('task-priority').value=t.priority||'medium';
    document.getElementById('task-assigned').value=t.assignedTo||'';
    document.getElementById('task-deadline').value=t.deadline||'';
  } else {
    document.getElementById('task-modal-title').textContent='New Task';
    document.getElementById('task-edit-id').value='';
    document.getElementById('task-title').value='';
    document.getElementById('task-description').value='';
    document.getElementById('task-category').value='maintenance';
    document.getElementById('task-priority').value='medium';
    document.getElementById('task-assigned').value='';
    document.getElementById('task-deadline').value='';
  }
  openModal('modal-add-task');
}
function saveTask(){
  var title=document.getElementById('task-title').value.trim(); if(!title){toast('Title required!','error');return;}
  var db=getDB(); var editId=document.getElementById('task-edit-id').value;
  var desc=document.getElementById('task-description').value.trim();
  var cat=document.getElementById('task-category').value;
  var pri=document.getElementById('task-priority').value;
  var asn=document.getElementById('task-assigned').value;
  var dl=document.getElementById('task-deadline').value;
  var task={title:title,description:desc,category:cat,priority:pri,assignedTo:asn,deadline:dl};
  var sbTask={title:title,description:desc,category:cat,priority:pri,assigned_to:asn,deadline:dl||null};
  if(editId){
    var idx=db.tasks.findIndex(function(t){return t.id===editId;});if(idx!==-1) db.tasks[idx]=Object.assign({},db.tasks[idx],task);
    saveDB(db); closeModal('modal-add-task'); renderTasks(); renderDashboard(); toast('Updating...');
    sbFetch('PATCH','tasks',sbTask,'id=eq.'+editId).then(function(){ toast('Updated!'); }).catch(function(){ toast('Updated locally','error'); });
  } else {
    var newId=uid();
    db.tasks.push(Object.assign({},task,{id:newId,status:'pending',createdAt:new Date().toISOString()}));
    saveDB(db); closeModal('modal-add-task'); renderTasks(); renderDashboard(); toast('Creating...');
    sbFetch('POST','tasks',Object.assign({},sbTask,{status:'pending'})).then(function(rows){
      if(rows&&rows[0]){var ti=db.tasks.findIndex(function(t){return t.id===newId;}); if(ti!==-1) db.tasks[ti].id=rows[0].id; saveDB(db);}
      toast('Task created!');
    }).catch(function(){ toast('Saved locally','error'); });
  }
}
function setTaskStatus(id,status){
  var db=getDB(); var idx=db.tasks.findIndex(function(t){return t.id===id;});
  var doneAt=status==='done'?new Date().toISOString():null;
  if(idx!==-1){db.tasks[idx].status=status;if(doneAt) db.tasks[idx].doneAt=doneAt;saveDB(db);}
  renderTasks(); renderDashboard(); toast('Marked as '+status+'!');
  var patch={status:status}; if(doneAt) patch.done_at=doneAt;
  sbFetch('PATCH','tasks',patch,'id=eq.'+id).catch(function(){});
}
function deleteTask(id){
  if(!confirm('Delete task?')) return;
  var db=getDB(); db.tasks=db.tasks.filter(function(t){return t.id!==id;}); saveDB(db);
  renderTasks(); renderDashboard(); toast('Deleting...');
  sbFetch('DELETE','tasks',null,'id=eq.'+id).then(function(){ toast('Deleted.'); }).catch(function(){ toast('Deleted locally','error'); });
}
function renderTasks(){
  var db=getDB();
  document.getElementById('task-count-pending').textContent=db.tasks.filter(function(t){return t.status==='pending';}).length;
  document.getElementById('task-count-progress').textContent=db.tasks.filter(function(t){return t.status==='in-progress';}).length;
  document.getElementById('task-count-done').textContent=db.tasks.filter(function(t){return t.status==='done';}).length;
  var po={high:0,medium:1,low:2};
  var tasks=db.tasks.slice().sort(function(a,b){return(po[a.priority]||1)-(po[b.priority]||1);});
  if(currentTaskFilter!=='all') tasks=tasks.filter(function(t){return t.status===currentTaskFilter;});
  var el=document.getElementById('task-list'); if(!el) return;
  if(tasks.length===0){el.innerHTML='<div class="empty-state"><i class="fas fa-clipboard-list"></i><p>No tasks here.</p></div>';return;}
  var now=new Date();
  el.innerHTML=tasks.map(function(t){
    var isOverdue=t.deadline&&new Date(t.deadline)<now&&t.status!=='done';
    return '<div class="task-item'+(t.status==='done'?' done':'')+'">'
      +'<div class="task-top"><div class="task-icon">'+(taskCatIcons[t.category]||'📌')+'</div>'
      +'<div class="task-body"><div class="task-title'+(t.status==='done'?' done-text':'')+'">'+esc(t.title)+'</div>'
      +'<div class="task-badges"><span class="badge '+(priColors[t.priority]||'badge-gray')+'">'+esc(t.priority||'medium')+'</span><span class="badge '+(t.status==='done'?'badge-green':t.status==='in-progress'?'badge-blue':'badge-yellow')+'">'+esc(t.status)+'</span>'+(isOverdue?'<span class="badge badge-red">Overdue</span>':'')+'</div>'
      +(t.description?'<div class="task-desc">'+esc(t.description)+'</div>':'')
      +'<div class="task-meta">'+(t.assignedTo?'<span><i class="fas fa-user" style="margin-right:3px"></i>'+esc(t.assignedTo)+'</span>':'')+(t.deadline?'<span><i class="fas fa-calendar-check" style="margin-right:3px"></i>'+esc(t.deadline)+'</span>':'')+'</div>'
      +'</div></div>'
      +'<div class="task-actions">'
        +(t.status!=='done'?'<button class="btn btn-sm" style="background:#dcfce7;color:#16a34a;border:1.5px solid #bbf7d0;flex:1;justify-content:center" data-task-done="'+esc(t.id)+'"><i class="fas fa-check"></i> Done</button>':'')
        +(t.status==='pending'?'<button class="btn btn-sm" style="background:#dbeafe;color:#1d4ed8;border:1.5px solid #bfdbfe" data-task-progress="'+esc(t.id)+'"><i class="fas fa-play"></i></button>':'')
        +'<button class="btn btn-secondary btn-sm" data-edit-task="'+esc(t.id)+'"><i class="fas fa-pen"></i></button>'
        +'<button class="btn btn-danger btn-sm btn-icon" data-delete-task="'+esc(t.id)+'"><i class="fas fa-trash"></i></button>'
      +'</div>'
    +'</div>';
  }).join('');
}

// ================================================
// SHIFTS GANTT
// ================================================
var DAYS=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

// Gantt config: 07:00 to 24:00 = 17 hours
var GANTT_START = 7;   // 07:00
var GANTT_END   = 24;  // 24:00
var GANTT_SPAN  = GANTT_END - GANTT_START; // 17 hours

// Hour labels shown on the ruler (every 2h to fit mobile)
var GANTT_HOUR_MARKS = [7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];

// Color palette per employee (cycles through)
var GANTT_COLORS = [
  '#0ea5e9','#f59e0b','#8b5cf6','#22c55e','#ef4444',
  '#06b6d4','#f97316','#a855f7','#14b8a6','#ec4899'
];

function timeToMins(t) {
  if (!t) return 0;
  var parts = t.split(':');
  return parseInt(parts[0]) * 60 + parseInt(parts[1] || 0);
}

function ganttShiftColor(employee, db) {
  // Consistent color per employee name
  var emps = db.employees || [];
  var idx = emps.indexOf(employee);
  if (idx === -1) idx = Math.abs(employee.split('').reduce(function(a,c){return a+c.charCodeAt(0);},0)) % GANTT_COLORS.length;
  return GANTT_COLORS[idx % GANTT_COLORS.length];
}

function renderShifts(){
  var ws = getWeekStart(shiftsWeekOffset);
  var we = new Date(ws); we.setDate(we.getDate()+6);
  var mnames=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  document.getElementById('shifts-week-label').textContent =
    mnames[ws.getMonth()]+' '+ws.getDate()+' – '+mnames[we.getMonth()]+' '+we.getDate()+', '+we.getFullYear();

  var db = getDB();
  var addBtn = document.getElementById('btn-add-shift');
  if (addBtn) addBtn.style.display = isAdmin ? 'flex' : 'none';
  var el = document.getElementById('shifts-list'); if (!el) return;

  // Current time marker (only relevant for today)
  var now = new Date();
  var todayStr = toDateStr(now);
  var nowMins = now.getHours()*60 + now.getMinutes();
  var nowPct = ((nowMins/60 - GANTT_START) / GANTT_SPAN) * 100;
  var nowInRange = nowMins/60 >= GANTT_START && nowMins/60 <= GANTT_END;

  el.innerHTML = DAYS.map(function(day, di) {
    var dayDate = new Date(ws); dayDate.setDate(dayDate.getDate()+di);
    var dateStr = toDateStr(dayDate);
    var isToday = dateStr === todayStr;
    var wsStr = toDateStr(ws);
    var dayShifts = db.shifts.filter(function(s){
      return s.day === day && s.weekStart === wsStr;
    });

    // Build hour ruler HTML
    var rulerHTML = '<div class="gantt-hours">';
    // Show label every 2 hours for readability on mobile
    for (var h = GANTT_START; h <= GANTT_END; h++) {
      var showLabel = (h % 2 === 1) || h === GANTT_START || h === GANTT_END;
      rulerHTML += '<div class="gantt-hour-label" style="min-width:0;flex:1">'
        + (showLabel ? h+':00' : '')
        +'</div>';
    }
    rulerHTML += '</div>';

    // Grid lines (one per hour)
    var gridHTML = '<div class="gantt-grid-lines">';
    for (var g = 0; g <= GANTT_SPAN; g++) {
      gridHTML += '<div class="gantt-grid-line"></div>';
    }
    gridHTML += '</div>';

    // Now-line for today
    var nowLineHTML = (isToday && nowInRange)
      ? '<div class="gantt-now-line" style="left:'+nowPct.toFixed(2)+'%"><div class="gantt-now-dot"></div></div>'
      : '';

    // Shift bars
    var rowsHTML = '';
    if (dayShifts.length === 0) {
      rowsHTML = '<div class="gantt-empty">No shifts scheduled</div>';
    } else {
      rowsHTML = dayShifts.map(function(s) {
        var startMins = timeToMins(s.start);
        var endMins   = timeToMins(s.end);
        // Handle overnight (end < start means next day)
        if (endMins <= startMins) endMins += 24*60;
        // Clamp to gantt range
        var clampStart = Math.max(startMins, GANTT_START*60);
        var clampEnd   = Math.min(endMins,   GANTT_END*60);
        var leftPct  = ((clampStart/60 - GANTT_START) / GANTT_SPAN * 100).toFixed(2);
        var widthPct = Math.max(((clampEnd - clampStart)/60 / GANTT_SPAN * 100), 0.5).toFixed(2);
        var color = ganttShiftColor(s.employee, db);
        var label = esc(s.employee) + ' ' + esc(s.start) + '–' + esc(s.end) + (s.role ? ' · '+esc(s.role) : '');
        return '<div class="gantt-row">'
          +'<div class="gantt-emp-label" title="'+esc(s.employee)+'">'+esc(s.employee.split(' ')[0])+'</div>'
          +'<div class="gantt-track">'
            +'<div class="gantt-bar" style="left:'+leftPct+'%;width:'+widthPct+'%;background:'+color+'" title="'+label+'"'
              +(isAdmin?' data-delete-shift="'+esc(s.id)+'"':'')+'>'  
              + label
            +'</div>'
          +'</div>'
        +'</div>';
      }).join('');
    }

    return '<div class="gantt-wrap"'
        +(isToday?' style="border-left:3px solid var(--ocean-400)"':'')+'>' 
      +'<div class="gantt-day-header">'
        +'<div>'
          +'<div class="gantt-day-name">'+day+(isToday?' <span class="badge badge-blue" style="font-size:10px;vertical-align:middle">Today</span>':'')+'</div>'
          +'<div class="gantt-day-date">'+dateStr+'</div>'
        +'</div>'
        +(isAdmin?'<button class="btn btn-secondary btn-sm" data-add-shift-day="'+esc(day)+'"><i class="fas fa-plus"></i> Add</button>':'')
      +'</div>'
      +'<div class="gantt-timeline">'
        + rulerHTML
        +'<div class="gantt-rows" style="position:relative">'
          + gridHTML
          + nowLineHTML
          + rowsHTML
        +'</div>'
      +'</div>'
    +'</div>';
  }).join('');
}
function openAddShiftModal(preDay){
  updateAllDropdowns();
  document.getElementById('shift-modal-title').textContent='Add Shift';
  document.getElementById('shift-edit-id').value='';
  document.getElementById('shift-employee').value='';
  document.getElementById('shift-day').value=preDay||'Monday';
  document.getElementById('shift-start').value='09:00';
  document.getElementById('shift-end').value='17:00';
  document.getElementById('shift-role').value='';
  openModal('modal-add-shift');
}
function saveShift(){
  var emp=document.getElementById('shift-employee').value; if(!emp){toast('Select employee!','error');return;}
  var day=document.getElementById('shift-day').value;
  var start=document.getElementById('shift-start').value; if(!start){toast('Start time required!','error');return;}
  var end=document.getElementById('shift-end').value; if(!end){toast('End time required!','error');return;}
  var role=document.getElementById('shift-role').value.trim();
  var db=getDB();
  var ws=toDateStr(getWeekStart(shiftsWeekOffset));
  var newId=uid();
  db.shifts.push({id:newId,employee:emp,day:day,start:start,end:end,role:role,weekStart:ws,createdAt:new Date().toISOString()});
  saveDB(db); closeModal('modal-add-shift'); renderShifts(); toast('Adding shift...');
  sbFetch('POST','shifts',{employee:emp,day:day,start_time:start,end_time:end,role:role,week_start:ws}).then(function(rows){
    if(rows&&rows[0]){var si=db.shifts.findIndex(function(s){return s.id===newId;}); if(si!==-1) db.shifts[si].id=rows[0].id; saveDB(db);}
    toast('Shift added!');
  }).catch(function(){ toast('Saved locally','error'); });
}
function deleteShift(id){
  if(!confirm('Remove shift?')) return;
  var db=getDB(); db.shifts=db.shifts.filter(function(s){return s.id!==id;}); saveDB(db);
  renderShifts(); toast('Removing...');
  sbFetch('DELETE','shifts',null,'id=eq.'+id).then(function(){ toast('Shift removed.'); }).catch(function(){ toast('Removed locally','error'); });
}

// ================================================
// BLACK BOX
// ================================================
var bbCatIcons={beverages:'🍹',food:'🍔',cocktails:'🍸',beer:'🍺',wine:'🍷',spirits:'🥃',other:'📦'};
function renderBlackBox(){
  var locked=document.getElementById('blackbox-locked');
  var content=document.getElementById('blackbox-content');
  if(!isAdmin){locked.style.display='flex';content.style.display='none';return;}
  locked.style.display='none'; content.style.display='block';
  switchBbTab(currentBbTab);
}
function switchBbTab(t){
  currentBbTab=t;
  ['daily','records','menu'].forEach(function(x){
    var btn=document.getElementById('bb-tab-'+x); if(btn) btn.classList.toggle('active',x===t);
    var panel=document.getElementById('bb-panel-'+x); if(panel) panel.style.display=x===t?'block':'none';
  });
  if(t==='daily') renderBbDaily();
  if(t==='records') renderBbRecords();
  if(t==='menu') renderBbMenuManage();
}
function renderBbDaily(){
  var today=toDateStr(new Date());
  document.getElementById('bb-today-date').textContent=fmtDateShort(today);
  renderBbMenuSelector();
  renderBbSelectedList();
  updateBbTotal();
}
function renderBbMenuSelector(){
  var db=getDB();
  var items=db.bbMenu.slice();
  if(bbItemSearchVal) items=items.filter(function(i){return i.name.toLowerCase().indexOf(bbItemSearchVal.toLowerCase())!==-1;});
  var el=document.getElementById('bb-menu-selector'); if(!el) return;
  if(items.length===0){el.innerHTML='<div class="empty-state" style="padding:14px"><p>No items found.</p></div>';return;}
  el.innerHTML=items.map(function(item){
    var qty=bbSelectedItems[item.id]||0;
    return '<div class="bb-item" data-bb-item-id="'+esc(item.id)+'">'
      +'<div style="font-size:20px;flex-shrink:0">'+(bbCatIcons[item.category]||'📦')+'</div>'
      +'<div style="flex:1;min-width:0">'
        +'<div class="bb-name">'+esc(item.name)+'</div>'
        +'<div class="bb-cat">'+esc(item.category)+'</div>'
      +'</div>'
      +'<div class="bb-qty-ctrl" style="flex-shrink:0">'
        +'<button class="bb-qty-btn bb-qty-minus" data-bb-minus="'+esc(item.id)+'" style="'+(qty===0?'opacity:.3':'')+'">-</button>'
        +'<span class="bb-qty-val">'+qty+'</span>'
        +'<button class="bb-qty-btn bb-qty-plus" data-bb-plus="'+esc(item.id)+'">+</button>'
      +'</div>'
      +'<div class="bb-price">'+fmtEur(item.price)+'</div>'
    +'</div>';
  }).join('');
}
function renderBbSelectedList(){
  var db=getDB();
  var el=document.getElementById('bb-selected-list'); if(!el) return;
  var selected=Object.keys(bbSelectedItems).filter(function(id){return bbSelectedItems[id]>0;});
  if(selected.length===0){el.innerHTML='<div class="empty-state" style="padding:16px"><p>No items selected yet.</p></div>';return;}
  el.innerHTML=selected.map(function(id){
    var item=db.bbMenu.find(function(i){return i.id===id;}); if(!item) return '';
    var qty=bbSelectedItems[id];
    var subtotal=item.price*qty;
    return '<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:var(--ocean-50);border-radius:10px;margin-bottom:6px">'
      +'<div><div style="font-weight:700;font-size:14px">'+esc(item.name)+'</div><div style="font-size:12px;color:var(--ocean-400)">'+fmtEur(item.price)+' x '+qty+'</div></div>'
      +'<div style="font-weight:800;color:var(--ocean-700)">'+fmtEur(subtotal)+'</div>'
    +'</div>';
  }).join('');
}
function updateBbTotal(){
  var db=getDB(); var total=0;
  Object.keys(bbSelectedItems).forEach(function(id){
    var item=db.bbMenu.find(function(i){return i.id===id;});
    if(item) total+=item.price*(bbSelectedItems[id]||0);
  });
  document.getElementById('bb-today-total').textContent=fmtEur(total);
}
function saveDailyEntry(){
  var db=getDB();
  var selected=Object.keys(bbSelectedItems).filter(function(id){return bbSelectedItems[id]>0;});
  if(selected.length===0){toast('Select at least one item!','error');return;}
  var items=selected.map(function(id){
    var item=db.bbMenu.find(function(i){return i.id===id;});
    return{id:id,name:item?item.name:'?',price:item?item.price:0,qty:bbSelectedItems[id],subtotal:(item?item.price:0)*bbSelectedItems[id]};
  });
  var total=items.reduce(function(s,i){return s+i.subtotal;},0);
  var today=toDateStr(new Date());
  var idx=db.bbEntries.findIndex(function(e){return e.date===today;});
  var entry={id:uid(),date:today,items:items,total:total,savedAt:new Date().toISOString()};
  if(idx!==-1) db.bbEntries[idx]=entry; else db.bbEntries.push(entry);
  saveDB(db); toast('Saving...','gold');
  bbSelectedItems={}; renderBbDaily(); renderBbRecords();
  // Upsert in Supabase (unique on date)
  sbFetch('POST','bb_entries',{date:today,items:items,total:total},null).catch(function(){
    // If conflict (date exists), update instead
    sbFetch('PATCH','bb_entries',{items:items,total:total,saved_at:new Date().toISOString()},'date=eq.'+today).catch(function(){});
  });
  // Use proper upsert header
  fetch(SB_URL+'/rest/v1/bb_entries', {
    method:'POST',
    headers:{'apikey':SB_KEY,'Authorization':'Bearer '+SB_KEY,'Content-Type':'application/json','Prefer':'resolution=merge-duplicates'},
    body:JSON.stringify({date:today,items:items,total:total,saved_at:new Date().toISOString()})
  }).then(function(){ toast('Daily entry saved! '+fmtEur(total),'gold'); }).catch(function(){});
}
function clearDailyEntry(){ bbSelectedItems={}; renderBbDaily(); toast('Cleared.'); }
function renderBbRecords(){
  var db=getDB();
  var today=toDateStr(new Date());
  var now=new Date();
  var weekStart=toDateStr(getMonday(now));
  var monthStart=now.getFullYear()+'-'+String(now.getMonth()+1).padStart(2,'0')+'-01';

  var todayEntry=db.bbEntries.find(function(e){return e.date===today;});
  var weekEntries=db.bbEntries.filter(function(e){return e.date>=weekStart&&e.date<=today;});
  var monthEntries=db.bbEntries.filter(function(e){return e.date>=monthStart&&e.date<=today;});

  var todayTotal=todayEntry?todayEntry.total:0;
  var weekTotal=weekEntries.reduce(function(s,e){return s+e.total;},0);
  var monthTotal=monthEntries.reduce(function(s,e){return s+e.total;},0);

  document.getElementById('bb-today-sum').textContent=fmtEur(todayTotal);
  document.getElementById('bb-week-sum').textContent=fmtEur(weekTotal);
  document.getElementById('bb-month-sum').textContent=fmtEur(monthTotal);

  var el=document.getElementById('bb-records-list'); if(!el) return;
  var sorted=db.bbEntries.slice().sort(function(a,b){return b.date.localeCompare(a.date);});
  if(sorted.length===0){el.innerHTML='<div class="empty-state"><i class="fas fa-cash-register"></i><p>No records yet.</p></div>';return;}
  el.innerHTML=sorted.map(function(entry){
    return '<div class="bb-daily-record">'
      +'<div class="bb-daily-record-header"><div style="font-weight:700;font-size:15px;color:var(--ocean-900)">'+fmtDateShort(entry.date)+(entry.date===today?' <span class="badge badge-blue">Today</span>':'')+'</div>'
      +'<div style="font-weight:800;font-size:18px;color:var(--ocean-700)">'+fmtEur(entry.total)+'</div></div>'
      +'<div>'+entry.items.map(function(i){
        return '<div style="display:flex;justify-content:space-between;font-size:13px;padding:2px 0;color:var(--ocean-700)"><span>'+esc(i.name)+' x'+i.qty+'</span><span style="font-weight:600">'+fmtEur(i.subtotal)+'</span></div>';
      }).join('')+'</div>'
    +'</div>';
  }).join('');
}
function renderBbMenuManage(){
  var db=getDB(); var el=document.getElementById('bb-menu-manage-list'); if(!el) return;
  if(db.bbMenu.length===0){el.innerHTML='<div class="empty-state"><i class="fas fa-tag"></i><p>No menu items.</p></div>';return;}
  el.innerHTML=db.bbMenu.map(function(item){
    return '<div class="bb-item" style="cursor:default">'
      +'<div style="font-size:20px">'+(bbCatIcons[item.category]||'📦')+'</div>'
      +'<div style="flex:1;min-width:0"><div class="bb-name">'+esc(item.name)+'</div><div class="bb-cat">'+esc(item.category)+'</div></div>'
      +'<div class="bb-price">'+fmtEur(item.price)+'</div>'
      +'<button class="btn btn-secondary btn-sm btn-icon" data-edit-bb-item="'+esc(item.id)+'"><i class="fas fa-pen"></i></button>'
      +'<button class="btn btn-danger btn-sm btn-icon" data-delete-bb-item="'+esc(item.id)+'"><i class="fas fa-trash"></i></button>'
    +'</div>';
  }).join('');
}
function openAddBbItemModal(editId){
  if(editId){
    var db=getDB(); var item=db.bbMenu.find(function(i){return i.id===editId;}); if(!item) return;
    editBbItemId=editId;
    document.getElementById('bb-item-modal-title').textContent='Edit Item';
    document.getElementById('bb-item-name').value=item.name;
    document.getElementById('bb-item-price').value=item.price;
    document.getElementById('bb-item-category').value=item.category||'other';
  } else {
    editBbItemId=null;
    document.getElementById('bb-item-modal-title').textContent='Add Menu Item';
    document.getElementById('bb-item-name').value='';
    document.getElementById('bb-item-price').value='';
    document.getElementById('bb-item-category').value='beverages';
  }
  openModal('modal-add-bb-item');
}
function saveBbItem(){
  var name=document.getElementById('bb-item-name').value.trim(); if(!name){toast('Name required!','error');return;}
  var price=parseFloat(document.getElementById('bb-item-price').value); if(isNaN(price)||price<0){toast('Valid price required!','error');return;}
  var cat=document.getElementById('bb-item-category').value;
  var db=getDB(); var eid=editBbItemId;
  if(eid){
    var idx=db.bbMenu.findIndex(function(i){return i.id===eid;});
    if(idx!==-1) db.bbMenu[idx]=Object.assign({},db.bbMenu[idx],{name:name,price:price,category:cat});
    saveDB(db); closeModal('modal-add-bb-item'); renderBbMenuManage(); toast('Updating...'); editBbItemId=null;
    sbFetch('PATCH','bb_menu',{name:name,price:price,category:cat},'id=eq.'+eid).then(function(){ toast('Updated!'); }).catch(function(){ toast('Updated locally','error'); });
  } else {
    var newId=uid();
    db.bbMenu.push({id:newId,name:name,price:price,category:cat});
    saveDB(db); closeModal('modal-add-bb-item'); renderBbMenuManage(); toast('Adding...'); editBbItemId=null;
    sbFetch('POST','bb_menu',{name:name,price:price,category:cat}).then(function(rows){
      if(rows&&rows[0]){var bi=db.bbMenu.findIndex(function(i){return i.id===newId;}); if(bi!==-1) db.bbMenu[bi].id=rows[0].id; saveDB(db);}
      toast('Item added!');
    }).catch(function(){ toast('Saved locally','error'); });
  }
}
function deleteBbItem(id){
  if(!confirm('Remove this menu item?')) return;
  var db=getDB(); db.bbMenu=db.bbMenu.filter(function(i){return i.id!==id;}); saveDB(db);
  renderBbMenuManage(); toast('Removing...');
  sbFetch('DELETE','bb_menu',null,'id=eq.'+id).then(function(){ toast('Removed.'); }).catch(function(){ toast('Removed locally','error'); });
}

// ================================================
// DASHBOARD
// ================================================
function renderDashboard(){
  var db=getDB();
  document.getElementById('dash-inv-count').textContent=db.inventory.length;
  var lowItems=db.inventory.filter(function(i){return(i.qtyBar+i.qtyStorage)<i.minimum;});
  document.getElementById('dash-inv-status').className='badge '+(lowItems.length>0?'badge-red':'badge-green');
  document.getElementById('dash-inv-status').textContent=lowItems.length>0?lowItems.length+' Low':'OK';
  document.getElementById('dash-inv-low').textContent=lowItems.length>0?lowItems.length+' need restock':'';
  var alertEl=document.getElementById('dash-low-stock');
  if(lowItems.length===0){alertEl.innerHTML='<div class="empty-state" style="padding:12px"><i class="fas fa-check-circle" style="color:#22c55e;font-size:22px"></i><p>All good!</p></div>';}
  else alertEl.innerHTML=lowItems.slice(0,5).map(function(i){
    var total=i.qtyBar+i.qtyStorage; var pct=i.minimum>0?Math.round(total/i.minimum*100):100;
    return '<div class="alert-item"><span class="pulse-dot red"></span><div style="flex:1"><div style="font-size:13px;font-weight:700;color:#dc2626">'+esc(i.name)+'</div><div style="height:4px;background:#fee2e2;border-radius:2px;margin-top:3px;overflow:hidden"><div style="height:100%;width:'+pct+'%;background:#ef4444;border-radius:2px"></div></div></div><div style="font-size:12px;color:#dc2626;font-weight:700">'+total+'/'+i.minimum+'</div></div>';
  }).join('');
  var today=toDateStr(new Date());
  var todayRes=db.reservations.filter(function(r){return r.date===today;}).sort(function(a,b){return a.time.localeCompare(b.time);});
  document.getElementById('dash-res-count').textContent=todayRes.length;
  var todayEl=document.getElementById('dash-today-res');
  if(todayRes.length===0){todayEl.innerHTML='<div class="empty-state" style="padding:12px"><i class="fas fa-calendar-xmark" style="font-size:22px"></i><p>No reservations today</p></div>';}
  else todayEl.innerHTML=todayRes.slice(0,5).map(function(r){
    var tables=Array.isArray(r.tables)?r.tables.join(', '):(r.table||'?');
    return '<div class="today-res-item" data-nav="reservations"><div style="width:38px;height:38px;background:var(--ocean-200);border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:var(--ocean-700);flex-shrink:0">'+esc(r.time)+'</div><div style="flex:1"><div style="font-size:13px;font-weight:700;color:var(--ocean-900)">'+esc(r.guestName)+'</div><div style="font-size:11px;color:var(--ocean-400)">'+esc(tables)+' · '+r.guests+' guests</div></div><span class="badge '+(r.status==='confirmed'?'badge-green':r.status==='no-show'?'badge-red':'badge-yellow')+'">'+esc(r.status||'Pending')+'</span></div>';
  }).join('');
  var openTasks=db.tasks.filter(function(t){return t.status!=='done';});
  document.getElementById('dash-task-count').textContent=openTasks.length;
  document.getElementById('dash-task-badge').className='badge '+(openTasks.length>0?'badge-yellow':'badge-green');
  document.getElementById('dash-task-badge').textContent=openTasks.length>0?'Open':'All Done';
  document.getElementById('dash-tables').textContent=db.tables.length;

  // Pending orders panel — visible to everyone
  var standbyOrders=db.orders.filter(function(o){return o.status==='standby';});
  var ordersPanel=document.getElementById('dash-orders-panel');
  var ordersBadge=document.getElementById('dash-orders-badge');
  var pendingEl=document.getElementById('dash-pending-orders');
  if(ordersPanel){
    ordersPanel.style.display=standbyOrders.length>0?'block':'none';
    if(ordersBadge) ordersBadge.textContent=standbyOrders.length;
    if(pendingEl){
      pendingEl.innerHTML=standbyOrders.slice().reverse().map(function(o){
        return '<div class="order-standby" style="display:flex;align-items:flex-start;justify-content:space-between;gap:10px">'
          +'<div style="flex:1">'
            +'<div style="font-weight:700;font-size:13px;color:var(--ocean-800);margin-bottom:4px">Order #'+o.id.slice(-6).toUpperCase()+' <span style="font-size:11px;font-weight:500;color:#92400e">· '+fmtDate(o.date)+'</span></div>'
            +'<div>'+o.items.map(function(i){return '<span style="font-size:12px;color:var(--ocean-700);margin-right:8px">'+esc(i.name)+' ('+i.orderQty+(i.unit?' '+esc(i.unit):'')+')  </span>';}).join('')+'</div>'
          +'</div>'
          +(isAdmin?'<button class="btn btn-sm btn-gold" style="flex-shrink:0" data-confirm-order="'+esc(o.id)+'"><i class="fas fa-check"></i> Approve</button>':'<span class="badge badge-orange" style="flex-shrink:0;align-self:center">⏳ Standby</span>')
        +'</div>';
      }).join('');
    }
  }
  updateOrdersBadge();
}

// ================================================
// EVENT DELEGATION
// ================================================
document.addEventListener('click', function(e) {
  var t = e.target;
  var el;

  // Pin pad
  el = t.closest('[data-pin-key]');
  if (el) { handlePinKey(el.dataset.pinKey); return; }

  // Nav
  el = t.closest('[data-nav]');
  if (el) { closeDrawer(); showSection(el.dataset.nav); return; }

  // Close modal
  el = t.closest('[data-close-modal]');
  if (el) { closeModal(el.dataset.closeModal); return; }

  // Overlay close
  var overlay = t.closest('.modal-overlay');
  if (overlay && t === overlay) { closeModal(overlay.id); return; }

  // Drawer / hamburger
  if (t.closest('#hamburger-btn')) { openDrawer(); return; }
  if (t.closest('#drawer-overlay')) { closeDrawer(); return; }

  // Finance PIN pad
  var finPinEl = t.closest('[data-fin-pin-key]');
  if (finPinEl) { handleFinPinKey(finPinEl.dataset.finPinKey); return; }
  if (t.closest('#fin-login-prompt-btn')) { openFinanceLogin(); return; }
  if (t.closest('#finance-login-btn')) { openFinanceLogin(); return; }
  if (t.closest('#finance-logout-btn')) { financeLogout(); return; }

  // Finance tabs & actions
  var finTabEl = t.closest('[data-fin-tab]');
  if (finTabEl) { switchFinTab(finTabEl.dataset.finTab); return; }
  if (t.closest('#btn-save-finance-entry')) { saveFinanceEntry(); return; }
  if (t.closest('#btn-clear-finance-entry')) { clearFinanceEntry(); return; }
  if (t.closest('#btn-change-finance-pin')) { changeFinancePin(); return; }

  // Admin
  if (t.closest('#admin-login-btn')) { openAdminLogin(); return; }
  if (t.closest('#admin-logout-btn')) { adminLogout(); return; }
  if (t.closest('#bb-login-prompt-btn') || t.closest('#settings-login-prompt-btn')) { openAdminLogin(function(){showSection(currentSection);}); return; }

  // Inv tabs
  el = t.closest('[data-inv-tab]');
  if (el) { switchInvTab(el.dataset.invTab); return; }

  // Inv actions
  if (t.closest('#btn-add-inventory')) { openAddInventoryModal(); return; }
  if (t.closest('#btn-open-order')) { openOrderModal(); return; }
  if (t.closest('#btn-save-inventory')) { saveInventoryItem(); return; }
  if (t.closest('#btn-save-minimum')) { saveMinimum(); return; }
  if (t.closest('#btn-save-qty-update')) { saveQtyUpdate(); return; }
  if (t.closest('#btn-confirm-order')) { confirmOrder(); return; }

  el = t.closest('[data-edit-min]');
  if (el) { openEditMinimumModal(el.dataset.editMin); return; }
  el = t.closest('[data-update-qty]');
  if (el) { openUpdateQtyModal(el.dataset.updateQty); return; }
  el = t.closest('[data-edit-inv]');
  if (el) { openAddInventoryModal(el.dataset.editInv); return; }
  el = t.closest('[data-delete-inv]');
  if (el) { deleteInventoryItem(el.dataset.deleteInv); return; }
  el = t.closest('[data-confirm-order]');
  if (el) { approveOrder(el.dataset.confirmOrder); return; }

  // Res tabs / actions
  el = t.closest('[data-res-tab]');
  if (el) { switchResTab(el.dataset.resTab); return; }
  if (t.closest('#btn-prev-week')) { prevWeek(); return; }
  if (t.closest('#btn-next-week')) { nextWeek(); return; }
  if (t.closest('#btn-add-reservation')) { openAddReservationModal(); return; }
  if (t.closest('#btn-save-reservation')) { saveReservation(); return; }
  el = t.closest('[data-open-res-detail]');
  if (el) { openResDetail(el.dataset.openResDetail); return; }
  el = t.closest('.cal-day[data-cal-day]');
  if (el) { selectedCalendarDay=el.dataset.calDay; renderCalendar(); renderDayReservations(selectedCalendarDay); return; }

  // Table chip (multi-select in reservation modal)
  el = t.closest('.table-chip[data-table-val]');
  if (el) {
    var tv = el.dataset.tableVal;
    var idx2 = selectedTables.indexOf(tv);
    if (idx2 === -1) selectedTables.push(tv); else selectedTables.splice(idx2,1);
    el.classList.toggle('selected', selectedTables.indexOf(tv) !== -1);
    return;
  }

  // Tasks
  el = t.closest('[data-task-filter]');
  if (el) { currentTaskFilter=el.dataset.taskFilter; document.querySelectorAll('#task-filter-btns .tab-btn').forEach(function(b){b.classList.remove('active');}); el.classList.add('active'); renderTasks(); return; }
  if (t.closest('#btn-add-task')) { openAddTaskModal(); return; }
  if (t.closest('#btn-save-task')) { saveTask(); return; }
  el = t.closest('[data-task-done]');
  if (el) { setTaskStatus(el.dataset.taskDone,'done'); return; }
  el = t.closest('[data-task-progress]');
  if (el) { setTaskStatus(el.dataset.taskProgress,'in-progress'); return; }
  el = t.closest('[data-edit-task]');
  if (el) { openAddTaskModal(el.dataset.editTask); return; }
  el = t.closest('[data-delete-task]');
  if (el) { deleteTask(el.dataset.deleteTask); return; }

  // Shifts
  if (t.closest('#btn-add-shift')) { openAddShiftModal(); return; }
  el = t.closest('[data-add-shift-day]');
  if (el) { openAddShiftModal(el.dataset.addShiftDay); return; }
  if (t.closest('#btn-save-shift')) { saveShift(); return; }
  if (t.closest('#btn-shifts-prev-week')) { shiftsWeekOffset--; renderShifts(); return; }
  if (t.closest('#btn-shifts-next-week')) { shiftsWeekOffset++; renderShifts(); return; }
  el = t.closest('[data-delete-shift]');
  if (el) { deleteShift(el.dataset.deleteShift); return; }

  // Black Box tabs
  el = t.closest('[data-bb-tab]');
  if (el) { switchBbTab(el.dataset.bbTab); return; }
  if (t.closest('#btn-save-daily-entry')) { saveDailyEntry(); return; }
  if (t.closest('#btn-clear-daily')) { clearDailyEntry(); return; }
  if (t.closest('#btn-add-bb-item')) { openAddBbItemModal(); return; }
  if (t.closest('#btn-save-bb-item')) { saveBbItem(); return; }
  el = t.closest('[data-bb-minus]');
  if (el) { var bid=el.dataset.bbMinus; if(bbSelectedItems[bid]&&bbSelectedItems[bid]>0){bbSelectedItems[bid]--;if(bbSelectedItems[bid]===0) delete bbSelectedItems[bid];} renderBbMenuSelector(); renderBbSelectedList(); updateBbTotal(); return; }
  el = t.closest('[data-bb-plus]');
  if (el) { var bid2=el.dataset.bbPlus; bbSelectedItems[bid2]=(bbSelectedItems[bid2]||0)+1; renderBbMenuSelector(); renderBbSelectedList(); updateBbTotal(); return; }
  el = t.closest('[data-edit-bb-item]');
  if (el) { openAddBbItemModal(el.dataset.editBbItem); return; }
  el = t.closest('[data-delete-bb-item]');
  if (el) { deleteBbItem(el.dataset.deleteBbItem); return; }

  // Settings
  if (t.closest('#btn-add-employee')) { addEmployee(); return; }
  el = t.closest('[data-remove-emp]');
  if (el) { removeEmployee(el.dataset.removeEmp); return; }
  if (t.closest('#btn-add-table-num')) { addTableNum(); return; }
  el = t.closest('[data-del-table]');
  if (el) { removeTableNum(el.dataset.delTable); return; }
  if (t.closest('#btn-change-pin')) { changePin(); return; }
  if (t.closest('#btn-save-supabase')) { saveSupabase(); return; }
});

document.addEventListener('input', function(e) {
  var t = e.target;
  if (t.id === 'inv-search') { invSearchVal=t.value; renderInventory(); }
  if (t.id === 'res-search') { resSearchVal=t.value; renderAllReservations(); }
  if (t.id === 'bb-item-search') { bbItemSearchVal=t.value; renderBbMenuSelector(); }
  // Finance live total update
  if (['fin-t51','fin-multibanco'].indexOf(t.id) !== -1) { updateFinDayTotal(); }
});
document.addEventListener('change', function(e) {
  var t = e.target;
  if (t.id === 'inv-cat-filter') { invCatFilter=t.value; renderInventory(); }
  if (t.id === 'res-date-filter') { resDateFilter=t.value; renderAllReservations(); }
  if (t.id === 'topbar-emp') { document.getElementById('drawer-user-name').textContent=t.value||'Staff'; }
});

// ================================================
// INIT
// ================================================
selectedCalendarDay = toDateStr(new Date());
initSupabase();
// Show cached data immediately for instant load
updateAllDropdowns();
updateAdminUI();
updateFinanceUI();
showSection('dashboard');
updateOrdersBadge();
// Then sync from Supabase and refresh all views
syncFromSupabase().then(function() {
  updateAllDropdowns();
  showSection(currentSection);
  updateOrdersBadge();
});

})();
<\/script>
</body>
</html>`;
}
