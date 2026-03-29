export function getAppHTML(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <title>Bar da Praia</title>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --ocean-50: #f0f9ff; --ocean-100: #e0f2fe; --ocean-200: #bae6fd;
      --ocean-300: #7dd3fc; --ocean-400: #38bdf8; --ocean-500: #0ea5e9;
      --ocean-600: #0284c7; --ocean-700: #0369a1; --ocean-800: #075985;
      --ocean-900: #0c4a6e;
      --grad: linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0ea5e9 100%);
      --grad-btn: linear-gradient(135deg, #0ea5e9, #0284c7);
      --radius: 14px; --radius-sm: 9px;
      --shadow: 0 2px 16px rgba(0,0,0,.07);
      --shadow-md: 0 4px 24px rgba(14,165,233,.14);
    }
    html, body { height: 100%; overflow: hidden; }
    body { font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; background: var(--ocean-50); color: var(--ocean-900); -webkit-tap-highlight-color: transparent; }
    ::-webkit-scrollbar { width: 4px; height: 4px; }
    ::-webkit-scrollbar-track { background: var(--ocean-50); }
    ::-webkit-scrollbar-thumb { background: var(--ocean-300); border-radius: 2px; }

    /* TOP BAR */
    #topbar {
      position: fixed; top: 0; left: 0; right: 0; z-index: 200;
      background: rgba(255,255,255,.95); backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--ocean-100);
      height: 56px; display: flex; align-items: center; padding: 0 16px; gap: 12px;
    }
    #hamburger-btn {
      width: 38px; height: 38px; border-radius: 10px; border: none;
      background: var(--ocean-100); color: var(--ocean-700); cursor: pointer;
      display: flex; align-items: center; justify-content: center; font-size: 16px;
      flex-shrink: 0; transition: background .2s;
    }
    #hamburger-btn:hover { background: var(--ocean-200); }
    #topbar-title { font-weight: 700; font-size: 17px; color: var(--ocean-900); flex: 1; }
    #topbar-emp {
      font-size: 13px; color: var(--ocean-700); background: var(--ocean-100);
      border: 1px solid var(--ocean-200); border-radius: 8px;
      padding: 5px 10px; outline: none; cursor: pointer; max-width: 130px;
    }

    /* DRAWER OVERLAY */
    #drawer-overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,.45);
      backdrop-filter: blur(3px); z-index: 300; opacity: 0;
      pointer-events: none; transition: opacity .25s;
    }
    #drawer-overlay.open { opacity: 1; pointer-events: all; }

    /* DRAWER */
    #drawer {
      position: fixed; top: 0; left: 0; bottom: 0; width: 280px;
      background: var(--grad); z-index: 400;
      transform: translateX(-100%); transition: transform .28s cubic-bezier(.4,0,.2,1);
      display: flex; flex-direction: column;
    }
    #drawer.open { transform: translateX(0); }
    #drawer-header { padding: 20px 20px 16px; border-bottom: 1px solid rgba(255,255,255,.12); }
    .logo-row { display: flex; align-items: center; gap: 12px; }
    .logo-icon { width: 42px; height: 42px; background: rgba(255,255,255,.18); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; }
    .logo-name { color: white; font-weight: 700; font-size: 17px; }
    .logo-sub { color: rgba(255,255,255,.6); font-size: 12px; }
    #drawer nav { flex: 1; padding: 16px 12px; overflow-y: auto; }
    .section-label { color: rgba(255,255,255,.45); font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .1em; padding: 0 12px; margin: 8px 0 6px; }
    .drawer-item {
      display: flex; align-items: center; gap: 12px; padding: 11px 14px;
      border-radius: 11px; cursor: pointer; border: none; background: none;
      color: rgba(255,255,255,.8); font-size: 14px; font-weight: 500;
      width: 100%; text-align: left; transition: background .15s, color .15s;
      margin-bottom: 2px;
    }
    .drawer-item:hover { background: rgba(255,255,255,.1); color: white; }
    .drawer-item.active { background: rgba(255,255,255,.2); color: white; box-shadow: 0 2px 10px rgba(0,0,0,.15); }
    .drawer-item i { width: 20px; text-align: center; font-size: 15px; opacity: .85; }
    #drawer-footer { padding: 14px 16px; border-top: 1px solid rgba(255,255,255,.1); }
    #drawer-user-name { color: white; font-size: 14px; font-weight: 600; }
    #drawer-user-sub { color: rgba(255,255,255,.5); font-size: 11px; }

    /* BOTTOM NAV */
    #bottom-nav {
      position: fixed; bottom: 0; left: 0; right: 0; z-index: 200;
      background: rgba(255,255,255,.97); backdrop-filter: blur(12px);
      border-top: 1px solid var(--ocean-100);
      height: 60px; display: flex; align-items: stretch;
      padding: 0 4px; padding-bottom: env(safe-area-inset-bottom, 0);
    }
    .bnav-item {
      flex: 1; display: flex; flex-direction: column; align-items: center;
      justify-content: center; gap: 3px; cursor: pointer; border: none;
      background: none; color: var(--ocean-400); font-size: 10px; font-weight: 600;
      border-radius: 10px; transition: color .15s, background .15s; padding: 4px 0;
      text-transform: uppercase; letter-spacing: .03em;
    }
    .bnav-item i { font-size: 18px; transition: transform .15s; }
    .bnav-item.active { color: var(--ocean-600); }
    .bnav-item.active i { transform: translateY(-1px); }
    .bnav-item:active { background: var(--ocean-100); }

    /* MAIN CONTENT */
    #content-wrap {
      position: fixed; top: 56px; left: 0; right: 0; bottom: 60px;
      overflow-y: auto; -webkit-overflow-scrolling: touch;
      padding: 14px 14px 8px;
    }

    /* SECTIONS */
    .page-section { display: none; }
    .page-section.active { display: block; }

    /* CARDS */
    .card { background: white; border-radius: var(--radius); box-shadow: var(--shadow); border: 1px solid var(--ocean-100); }

    /* KPI GRID */
    .kpi-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 14px; }
    .kpi-card { background: white; border-radius: var(--radius); padding: 14px; border: 1px solid var(--ocean-100); box-shadow: var(--shadow); }
    .kpi-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
    .kpi-icon { width: 36px; height: 36px; background: var(--ocean-100); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 17px; }
    .kpi-num { font-size: 26px; font-weight: 800; color: var(--ocean-900); line-height: 1; }
    .kpi-label { font-size: 12px; color: var(--ocean-400); margin-top: 2px; }
    .kpi-sub { font-size: 11px; color: #ef4444; margin-top: 4px; min-height: 14px; }

    /* BADGES */
    .badge { display: inline-flex; align-items: center; padding: 2px 8px; border-radius: 20px; font-size: 11px; font-weight: 700; }
    .badge-green { background: #dcfce7; color: #16a34a; }
    .badge-red { background: #fee2e2; color: #dc2626; }
    .badge-yellow { background: #fef9c3; color: #ca8a04; }
    .badge-blue { background: #dbeafe; color: #1d4ed8; }
    .badge-gray { background: #f3f4f6; color: #6b7280; }

    /* BUTTONS */
    .btn { display: inline-flex; align-items: center; gap: 6px; border: none; cursor: pointer; font-weight: 600; font-size: 13px; border-radius: var(--radius-sm); padding: 9px 16px; transition: all .2s; white-space: nowrap; }
    .btn-primary { background: var(--grad-btn); color: white; }
    .btn-primary:active { opacity: .88; transform: scale(.97); }
    .btn-secondary { background: white; color: var(--ocean-600); border: 1.5px solid var(--ocean-200); }
    .btn-secondary:active { background: var(--ocean-100); }
    .btn-danger { background: #fee2e2; color: #dc2626; border: 1.5px solid #fca5a5; }
    .btn-danger:active { background: #fecaca; }
    .btn-sm { padding: 6px 12px; font-size: 12px; border-radius: 8px; }
    .btn-icon { width: 32px; height: 32px; padding: 0; border-radius: 8px; justify-content: center; }

    /* FAB */
    .fab {
      position: fixed; bottom: 76px; right: 16px; z-index: 150;
      width: 52px; height: 52px; border-radius: 50%; background: var(--grad-btn);
      color: white; border: none; cursor: pointer; font-size: 22px;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 20px rgba(14,165,233,.45); transition: transform .2s, box-shadow .2s;
    }
    .fab:active { transform: scale(.92); }

    /* INPUTS */
    .input-field {
      width: 100%; border: 1.5px solid var(--ocean-200); border-radius: var(--radius-sm);
      padding: 10px 14px; font-size: 15px; color: var(--ocean-900);
      background: var(--ocean-50); outline: none; transition: border .2s;
      -webkit-appearance: none; appearance: none;
    }
    .input-field:focus { border-color: var(--ocean-500); background: white; box-shadow: 0 0 0 3px rgba(14,165,233,.1); }
    .input-field::placeholder { color: var(--ocean-300); }
    .select-field {
      width: 100%; border: 1.5px solid var(--ocean-200); border-radius: var(--radius-sm);
      padding: 10px 14px; font-size: 15px; color: var(--ocean-900);
      background: var(--ocean-50); outline: none; cursor: pointer;
      -webkit-appearance: none; appearance: none;
    }
    .select-field:focus { border-color: var(--ocean-500); }
    .label { font-size: 11px; font-weight: 700; color: var(--ocean-700); text-transform: uppercase; letter-spacing: .05em; margin-bottom: 5px; display: block; }
    .form-row { margin-bottom: 14px; }
    .form-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .form-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }

    /* TABS */
    .tab-row { display: flex; gap: 6px; margin-bottom: 14px; flex-wrap: wrap; }
    .tab-btn { padding: 7px 14px; border-radius: 9px; font-weight: 600; font-size: 13px; cursor: pointer; border: none; transition: all .18s; }
    .tab-btn.active { background: var(--grad-btn); color: white; }
    .tab-btn:not(.active) { background: white; color: var(--ocean-600); border: 1.5px solid var(--ocean-200); }

    /* SECTION HEADER */
    .section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; flex-wrap: wrap; gap: 10px; }

    /* INVENTORY CARDS */
    .inv-card { background: white; border-radius: var(--radius); padding: 14px; border: 1px solid var(--ocean-100); margin-bottom: 10px; box-shadow: var(--shadow); }
    .inv-card-header { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
    .inv-cat-icon { font-size: 22px; flex-shrink: 0; }
    .inv-name { font-weight: 700; font-size: 15px; color: var(--ocean-900); }
    .inv-meta { font-size: 11px; color: var(--ocean-400); margin-top: 1px; }
    .inv-stats { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 8px; margin-bottom: 10px; }
    .inv-stat { background: var(--ocean-50); border-radius: 8px; padding: 7px 6px; text-align: center; }
    .inv-stat-val { font-size: 16px; font-weight: 800; color: var(--ocean-900); }
    .inv-stat-label { font-size: 10px; color: var(--ocean-400); margin-top: 1px; }
    .inv-stat.min-stat { cursor: pointer; }
    .inv-stat.min-stat:active { background: var(--ocean-100); }
    .inv-actions { display: flex; gap: 8px; }
    .progress-bar { height: 5px; border-radius: 3px; background: var(--ocean-100); overflow: hidden; margin-top: 6px; }
    .progress-fill { height: 100%; border-radius: 3px; background: var(--grad-btn); transition: width .5s; }
    .progress-fill.low { background: linear-gradient(90deg,#ef4444,#dc2626); }
    .status-low { color: #dc2626; font-weight: 700; font-size: 12px; }

    /* CALENDAR */
    .cal-nav { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
    .cal-week-label { font-weight: 700; font-size: 14px; color: var(--ocean-800); }
    .cal-grid { display: grid; grid-template-columns: repeat(7,1fr); gap: 4px; margin-bottom: 14px; }
    .cal-day { border-radius: 10px; padding: 6px 2px; text-align: center; cursor: pointer; border: 1.5px solid transparent; transition: all .15s; min-height: 58px; }
    .cal-day:active { background: var(--ocean-100); }
    .cal-day.today { border-color: var(--ocean-400); background: var(--ocean-50); }
    .cal-day.selected { background: var(--grad-btn); color: white; border-color: transparent; }
    .cal-day-name { font-size: 10px; font-weight: 700; color: var(--ocean-400); margin-bottom: 2px; }
    .cal-day.selected .cal-day-name { color: rgba(255,255,255,.75); }
    .cal-day-num { font-size: 16px; font-weight: 800; color: var(--ocean-900); }
    .cal-day.today .cal-day-num { color: var(--ocean-600); }
    .cal-day.selected .cal-day-num { color: white; }
    .cal-dots { display: flex; gap: 2px; justify-content: center; margin-top: 3px; flex-wrap: wrap; }
    .cal-dots span { width: 5px; height: 5px; border-radius: 50%; display: inline-block; }
    .cal-count { font-size: 10px; color: var(--ocean-400); margin-top: 1px; }
    .cal-day.selected .cal-count { color: rgba(255,255,255,.7); }

    /* RESERVATION ITEMS */
    .res-item { border-left: 4px solid var(--ocean-400); background: white; border-radius: 0 12px 12px 0; padding: 12px 14px; margin-bottom: 8px; cursor: pointer; transition: transform .15s, box-shadow .15s; box-shadow: var(--shadow); }
    .res-item:active { transform: translateX(3px); }
    .res-item.confirmed { border-left-color: #16a34a; background: #f0fdf4; }
    .res-item.no-show { border-left-color: #dc2626; background: #fff5f5; }
    .res-item-top { display: flex; align-items: center; justify-content: space-between; }
    .res-time { font-weight: 800; font-size: 15px; color: var(--ocean-800); margin-right: 8px; }
    .res-name { font-weight: 600; font-size: 15px; color: var(--ocean-900); }
    .res-meta { font-size: 12px; color: var(--ocean-400); margin-top: 4px; display: flex; gap: 12px; flex-wrap: wrap; }

    /* ALL-RES LIST */
    .res-list-item { display: flex; align-items: center; gap: 12px; padding: 13px 14px; border-bottom: 1px solid var(--ocean-50); cursor: pointer; background: white; transition: background .15s; }
    .res-list-item:active { background: var(--ocean-50); }
    .res-date-box { width: 44px; height: 44px; background: var(--ocean-100); border-radius: 10px; display: flex; flex-direction: column; align-items: center; justify-content: center; flex-shrink: 0; }
    .res-date-box .rdb-d { font-size: 12px; font-weight: 800; color: var(--ocean-700); }
    .res-date-box .rdb-t { font-size: 10px; color: var(--ocean-500); }

    /* TASK ITEMS */
    .task-item { background: white; border-radius: var(--radius); padding: 14px; margin-bottom: 10px; border: 1.5px solid var(--ocean-100); box-shadow: var(--shadow); }
    .task-item.done { opacity: .6; }
    .task-top { display: flex; align-items: flex-start; gap: 10px; }
    .task-icon { font-size: 22px; flex-shrink: 0; margin-top: 1px; }
    .task-body { flex: 1; min-width: 0; }
    .task-title { font-weight: 700; font-size: 15px; color: var(--ocean-900); margin-bottom: 4px; }
    .task-title.done-text { text-decoration: line-through; }
    .task-badges { display: flex; gap: 5px; flex-wrap: wrap; margin-bottom: 5px; }
    .task-desc { font-size: 13px; color: var(--ocean-500); margin-bottom: 6px; }
    .task-meta { font-size: 12px; color: var(--ocean-400); display: flex; gap: 12px; flex-wrap: wrap; }
    .task-actions { display: flex; gap: 7px; margin-top: 10px; flex-wrap: wrap; }
    .task-count-row { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-bottom: 14px; }
    .task-count-card { background: white; border-radius: var(--radius); padding: 12px; border: 1px solid var(--ocean-100); display: flex; align-items: center; gap: 10px; }
    .tc-icon { width: 34px; height: 34px; border-radius: 9px; display: flex; align-items: center; justify-content: center; font-size: 16px; }
    .tc-num { font-size: 20px; font-weight: 800; color: var(--ocean-900); }
    .tc-label { font-size: 11px; color: var(--ocean-400); }

    /* PULSE DOT */
    .pulse-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; flex-shrink: 0; }
    .pulse-dot.green { background: #22c55e; }
    .pulse-dot.red { background: #ef4444; animation: pulse 1.5s infinite; }
    .pulse-dot.yellow { background: #f59e0b; }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.35} }

    /* LOG / HISTORY */
    .log-item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; background: var(--ocean-50); border-radius: 10px; margin-bottom: 7px; }
    .log-icon { width: 30px; height: 30px; background: white; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }

    /* ORDER ITEM */
    .order-item { background: white; border-radius: 12px; padding: 12px 14px; margin-bottom: 8px; border: 1px solid var(--ocean-100); }
    .order-row { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border: 1px solid var(--ocean-100); border-radius: 10px; margin-bottom: 8px; background: white; }

    /* SETTINGS */
    .settings-card { background: white; border-radius: var(--radius); padding: 18px; margin-bottom: 14px; border: 1px solid var(--ocean-100); box-shadow: var(--shadow); }
    .settings-card h3 { font-size: 15px; font-weight: 700; color: var(--ocean-800); margin-bottom: 14px; display: flex; align-items: center; gap: 7px; }
    .emp-row { display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; background: var(--ocean-50); border-radius: 10px; margin-bottom: 6px; }
    .emp-avatar { width: 30px; height: 30px; border-radius: 50%; background: var(--ocean-200); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800; color: var(--ocean-700); }

    /* MODAL */
    .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.45); backdrop-filter: blur(5px); z-index: 500; display: flex; align-items: flex-end; justify-content: center; opacity: 0; pointer-events: none; transition: opacity .25s; }
    .modal-overlay.open { opacity: 1; pointer-events: all; }
    .modal { background: white; border-radius: 22px 22px 0 0; padding: 22px 20px; width: 100%; max-width: 600px; max-height: 92vh; overflow-y: auto; transform: translateY(40px); transition: transform .28s cubic-bezier(.4,0,.2,1); padding-bottom: max(22px, env(safe-area-inset-bottom, 22px)); }
    .modal-overlay.open .modal { transform: translateY(0); }
    .modal-handle { width: 36px; height: 4px; background: var(--ocean-200); border-radius: 2px; margin: 0 auto 18px; }
    .modal h2 { font-size: 18px; font-weight: 800; color: var(--ocean-900); margin-bottom: 18px; display: flex; align-items: center; gap: 8px; }

    /* DETAIL MODAL */
    .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px; }
    .detail-cell { background: var(--ocean-50); border-radius: 10px; padding: 11px 12px; }
    .detail-cell-label { font-size: 11px; color: var(--ocean-400); font-weight: 600; text-transform: uppercase; margin-bottom: 3px; }
    .detail-cell-val { font-size: 14px; font-weight: 700; color: var(--ocean-900); }
    .detail-cell.full { grid-column: 1 / -1; }
    .action-row { display: flex; gap: 8px; flex-wrap: wrap; }

    /* SEARCH BAR */
    .search-bar { background: white; border-radius: var(--radius); padding: 10px 14px; display: flex; align-items: center; gap: 10px; border: 1px solid var(--ocean-100); margin-bottom: 12px; box-shadow: var(--shadow); }
    .search-bar i { color: var(--ocean-400); font-size: 14px; }
    .search-bar input { flex: 1; border: none; outline: none; font-size: 14px; color: var(--ocean-900); background: transparent; }
    .search-bar input::placeholder { color: var(--ocean-300); }

    /* TOAST */
    #toast { position: fixed; bottom: 76px; left: 50%; transform: translateX(-50%) translateY(10px); background: var(--ocean-900); color: white; padding: 10px 20px; border-radius: 22px; font-size: 14px; font-weight: 600; z-index: 9999; white-space: nowrap; box-shadow: 0 4px 20px rgba(0,0,0,.25); opacity: 0; pointer-events: none; transition: opacity .25s, transform .25s; }
    #toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }

    /* ALERT / DASHBOARD */
    .alert-item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; background: #fff5f5; border-radius: 10px; margin-bottom: 7px; }
    .today-res-item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; background: var(--ocean-50); border-radius: 10px; margin-bottom: 7px; cursor: pointer; }
    .today-res-item:active { background: var(--ocean-100); }
    .dash-panel { background: white; border-radius: var(--radius); padding: 16px; margin-bottom: 12px; border: 1px solid var(--ocean-100); box-shadow: var(--shadow); }
    .dash-panel h3 { font-size: 14px; font-weight: 700; color: var(--ocean-800); margin-bottom: 12px; display: flex; align-items: center; gap: 6px; }

    /* SUPABASE */
    .sb-status { display: flex; align-items: center; gap: 8px; padding: 10px 12px; border-radius: 10px; margin-top: 12px; }

    /* EMPTY STATE */
    .empty-state { text-align: center; padding: 36px 20px; color: var(--ocean-300); }
    .empty-state i { font-size: 32px; margin-bottom: 10px; display: block; }
    .empty-state p { font-size: 14px; }
  </style>
</head>
<body>

<!-- TOP BAR -->
<header id="topbar">
  <button id="hamburger-btn" aria-label="Menu">
    <i class="fas fa-bars"></i>
  </button>
  <div id="topbar-title">Bar da Praia</div>
  <select id="topbar-emp">
    <option value="">Employee</option>
  </select>
</header>

<!-- DRAWER OVERLAY -->
<div id="drawer-overlay"></div>

<!-- DRAWER -->
<nav id="drawer">
  <div id="drawer-header">
    <div class="logo-row">
      <div class="logo-icon">🌊</div>
      <div>
        <div class="logo-name">Bar da Praia</div>
        <div class="logo-sub">Management System</div>
      </div>
    </div>
  </div>
  <nav style="padding:14px 10px; flex:1; overflow-y:auto;">
    <div class="section-label">Menu</div>
    <button class="drawer-item active" id="ditem-dashboard" data-nav="dashboard"><i class="fas fa-home"></i> Dashboard</button>
    <button class="drawer-item" id="ditem-inventory" data-nav="inventory"><i class="fas fa-boxes-stacked"></i> Inventory</button>
    <button class="drawer-item" id="ditem-reservations" data-nav="reservations"><i class="fas fa-calendar-days"></i> Reservations</button>
    <button class="drawer-item" id="ditem-tasks" data-nav="tasks"><i class="fas fa-list-check"></i> Tasks</button>
    <div class="section-label" style="margin-top:12px">Config</div>
    <button class="drawer-item" id="ditem-settings" data-nav="settings"><i class="fas fa-gear"></i> Settings</button>
  </nav>
  <div id="drawer-footer">
    <div style="display:flex;align-items:center;gap:10px">
      <div style="width:32px;height:32px;background:rgba(255,255,255,.2);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px">👤</div>
      <div>
        <div id="drawer-user-name">Manager</div>
        <div id="drawer-user-sub">Active session</div>
      </div>
    </div>
  </div>
</nav>

<!-- MAIN CONTENT -->
<div id="content-wrap">

  <!-- DASHBOARD -->
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
    <div class="dash-panel">
      <h3><i class="fas fa-triangle-exclamation" style="color:#f59e0b"></i> Low Stock Alerts</h3>
      <div id="dash-low-stock"><div class="empty-state"><i class="fas fa-check-circle" style="color:#22c55e"></i><p>All good! No alerts</p></div></div>
    </div>
    <div class="dash-panel">
      <h3><i class="fas fa-calendar-day" style="color:var(--ocean-500)"></i> Today's Reservations</h3>
      <div id="dash-today-res"><div class="empty-state"><i class="fas fa-calendar-xmark"></i><p>No reservations today</p></div></div>
    </div>
  </section>

  <!-- INVENTORY -->
  <section id="section-inventory" class="page-section">
    <div class="section-header">
      <div class="tab-row" style="margin-bottom:0">
        <button class="tab-btn active" id="inv-tab-stock" data-inv-tab="stock"><i class="fas fa-warehouse"></i> Stock</button>
        <button class="tab-btn" id="inv-tab-log" data-inv-tab="log"><i class="fas fa-clock-rotate-left"></i> Log</button>
        <button class="tab-btn" id="inv-tab-orders" data-inv-tab="orders"><i class="fas fa-truck"></i> Orders</button>
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

  <!-- RESERVATIONS -->
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
      <div class="card" style="padding:14px" id="res-day-panel">
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

  <!-- TASKS -->
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

  <!-- SETTINGS -->
  <section id="section-settings" class="page-section">
    <div class="settings-card">
      <h3><i class="fas fa-users" style="color:var(--ocean-500)"></i> Team Members</h3>
      <div id="employee-list"></div>
      <div style="display:flex;gap:8px;margin-top:10px">
        <input type="text" id="new-employee-name" class="input-field" placeholder="Employee name..." style="font-size:14px" />
        <button class="btn btn-primary" id="btn-add-employee" style="flex-shrink:0"><i class="fas fa-plus"></i></button>
      </div>
    </div>
    <div class="settings-card">
      <h3><i class="fas fa-chair" style="color:var(--ocean-500)"></i> Table Configuration</h3>
      <p style="font-size:13px;color:var(--ocean-400);margin-bottom:12px">Set total number of tables in your restaurant.</p>
      <div style="display:flex;gap:10px;align-items:flex-end">
        <div style="flex:1">
          <label class="label">Number of Tables</label>
          <input type="number" id="tables-count-input" class="input-field" min="1" max="200" value="10" />
        </div>
        <button class="btn btn-primary" id="btn-save-tables"><i class="fas fa-save"></i> Save</button>
      </div>
      <div style="margin-top:10px;padding:10px 12px;background:var(--ocean-50);border-radius:10px;font-size:13px;color:var(--ocean-700)">
        Current: <strong id="tables-display">10 tables</strong>
      </div>
    </div>
    <div class="settings-card">
      <h3><i class="fas fa-database" style="color:var(--ocean-500)"></i> Supabase Connection</h3>
      <p style="font-size:13px;color:var(--ocean-400);margin-bottom:12px">Connect for cloud sync. Currently using local storage.</p>
      <div class="form-row"><label class="label">Project URL</label><input type="text" id="sb-url" class="input-field" placeholder="https://xxx.supabase.co" /></div>
      <div class="form-row"><label class="label">Anon Key</label><input type="text" id="sb-key" class="input-field" placeholder="eyJh..." /></div>
      <button class="btn btn-primary" style="width:100%;justify-content:center" id="btn-save-supabase"><i class="fas fa-plug"></i> Connect Supabase</button>
      <div class="sb-status" id="sb-status-box" style="background:#f0fdf4">
        <span class="pulse-dot green"></span>
        <span style="font-size:13px;color:#16a34a" id="sb-status-text">Using local storage</span>
      </div>
    </div>
    <div class="settings-card">
      <h3><i class="fas fa-tags" style="color:var(--ocean-500)"></i> Item Categories</h3>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
        <div style="background:var(--ocean-50);border-radius:9px;padding:9px 12px;font-size:13px;font-weight:600;color:var(--ocean-700)">🍹 Beverages</div>
        <div style="background:var(--ocean-50);border-radius:9px;padding:9px 12px;font-size:13px;font-weight:600;color:var(--ocean-700)">🍔 Food</div>
        <div style="background:var(--ocean-50);border-radius:9px;padding:9px 12px;font-size:13px;font-weight:600;color:var(--ocean-700)">🧹 Supplies</div>
        <div style="background:var(--ocean-50);border-radius:9px;padding:9px 12px;font-size:13px;font-weight:600;color:var(--ocean-700)">🔧 Equipment</div>
        <div style="background:var(--ocean-50);border-radius:9px;padding:9px 12px;font-size:13px;font-weight:600;color:var(--ocean-700)">📦 Other</div>
      </div>
    </div>
  </section>

</div>

<!-- BOTTOM NAV -->
<nav id="bottom-nav">
  <button class="bnav-item active" id="bnav-dashboard" data-nav="dashboard"><i class="fas fa-home"></i>Home</button>
  <button class="bnav-item" id="bnav-inventory" data-nav="inventory"><i class="fas fa-boxes-stacked"></i>Stock</button>
  <button class="bnav-item" id="bnav-reservations" data-nav="reservations"><i class="fas fa-calendar-days"></i>Bookings</button>
  <button class="bnav-item" id="bnav-tasks" data-nav="tasks"><i class="fas fa-list-check"></i>Tasks</button>
  <button class="bnav-item" id="bnav-settings" data-nav="settings"><i class="fas fa-gear"></i>Settings</button>
</nav>

<!-- MODALS -->

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
      <div style="font-size:13px;color:var(--ocean-400);margin-top:3px">Current stock: <span id="edit-min-current"></span></div>
    </div>
    <div class="form-row"><label class="label">New Minimum Quantity</label><input type="number" class="input-field" id="edit-min-value" min="0" /></div>
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
    <p style="font-size:13px;color:var(--ocean-400);margin-bottom:14px">Items below minimum. Adjust quantities if needed.</p>
    <div id="order-items-list" style="max-height:50vh;overflow-y:auto;margin-bottom:16px"></div>
    <div style="display:flex;gap:10px">
      <button class="btn btn-primary" style="flex:1;justify-content:center" id="btn-confirm-order"><i class="fas fa-paper-plane"></i> Confirm Order</button>
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
      <div><label class="label">Guests</label><input type="number" class="input-field" id="res-guests" min="1" max="50" value="2" /></div>
    </div>
    <div class="form-grid-2" style="margin-bottom:16px">
      <div><label class="label">Table *</label><select class="select-field" id="res-table"></select></div>
      <div><label class="label">Notes</label><input type="text" class="input-field" id="res-notes" placeholder="Allergies, occasion..." /></div>
    </div>
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

<!-- TOAST -->
<div id="toast"></div>

<script>
(function() {
'use strict';

// ================================================
// STATE & DB
// ================================================
var DB_KEY = 'bardapraia_v4';
function loadDB() { try { return JSON.parse(localStorage.getItem(DB_KEY) || '{}'); } catch(e) { return {}; } }
function saveDB(db) { localStorage.setItem(DB_KEY, JSON.stringify(db)); }
function getDB() {
  var db = loadDB();
  if (!db.employees)    db.employees = ['Ana', 'Bruno', 'Carla', 'David', 'Eva'];
  if (!db.tables)       db.tables = 10;
  if (!db.inventory)    db.inventory = [];
  if (!db.invLogs)      db.invLogs = [];
  if (!db.orders)       db.orders = [];
  if (!db.reservations) db.reservations = [];
  if (!db.tasks)        db.tasks = [];
  return db;
}

var currentSection = 'dashboard';
var calendarWeekStart = getMonday(new Date());
var selectedCalendarDay = null;
var currentTaskFilter = 'all';
var invSearchVal = '';
var invCatFilter = '';
var resSearchVal = '';
var resDateFilter = '';
var editInventoryId = null;

// ================================================
// UTILS
// ================================================
function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
function toDateStr(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
function fmtDate(iso) { if (!iso) return ''; var d = new Date(iso); return d.toLocaleDateString('en-GB', {day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'}); }
function getMonday(d) { var dd = new Date(d); var day = dd.getDay(); var diff = day === 0 ? -6 : 1 - day; dd.setDate(dd.getDate() + diff); dd.setHours(0, 0, 0, 0); return dd; }
function esc(str) { return String(str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

var toastTimer;
function toast(msg, type) {
  var el = document.getElementById('toast');
  el.textContent = msg;
  el.style.background = type === 'error' ? '#dc2626' : 'var(--ocean-900)';
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function() { el.classList.remove('show'); }, 2800);
}

// ================================================
// MODAL
// ================================================
function openModal(id) {
  var el = document.getElementById(id);
  if (!el) return;
  el.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  var el = document.getElementById(id);
  if (!el) return;
  el.classList.remove('open');
  document.body.style.overflow = '';
}

// ================================================
// DRAWER / NAVIGATION
// ================================================
function openDrawer() {
  document.getElementById('drawer').classList.add('open');
  document.getElementById('drawer-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeDrawer() {
  document.getElementById('drawer').classList.remove('open');
  document.getElementById('drawer-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

function showSection(name) {
  document.querySelectorAll('.page-section').forEach(function(s) { s.classList.remove('active'); });
  var sec = document.getElementById('section-' + name);
  if (!sec) { console.warn('Section not found:', name); return; }
  sec.classList.add('active');

  document.querySelectorAll('.bnav-item').forEach(function(b) { b.classList.remove('active'); });
  var bn = document.getElementById('bnav-' + name);
  if (bn) bn.classList.add('active');

  document.querySelectorAll('.drawer-item').forEach(function(b) { b.classList.remove('active'); });
  var di = document.getElementById('ditem-' + name);
  if (di) di.classList.add('active');

  var titles = {dashboard: 'Bar da Praia', inventory: 'Inventory', reservations: 'Reservations', tasks: 'Tasks', settings: 'Settings'};
  document.getElementById('topbar-title').textContent = titles[name] || 'Bar da Praia';

  currentSection = name;

  if (name === 'dashboard')    renderDashboard();
  if (name === 'inventory')    renderInventory();
  if (name === 'reservations') { renderCalendar(); renderAllReservations(); }
  if (name === 'tasks')        renderTasks();
  if (name === 'settings')     renderSettings();
}

// ================================================
// EMPLOYEES
// ================================================
function getEmployees() { return getDB().employees; }

function addEmployee() {
  var inp = document.getElementById('new-employee-name');
  var name = inp.value.trim();
  if (!name) return;
  var db = getDB();
  if (db.employees.indexOf(name) === -1) {
    db.employees.push(name); saveDB(db); inp.value = '';
    renderSettings(); updateAllDropdowns(); toast('Employee added!');
  } else { toast('Already exists!', 'error'); }
}

function removeEmployee(name) {
  if (!confirm('Remove ' + name + '?')) return;
  var db = getDB();
  db.employees = db.employees.filter(function(e) { return e !== name; });
  saveDB(db); renderSettings(); updateAllDropdowns(); toast('Removed.');
}

function updateAllDropdowns() {
  var emp = getEmployees();
  var opts = '<option value="">-- Select --</option>' + emp.map(function(e) { return '<option value="' + esc(e) + '">' + esc(e) + '</option>'; }).join('');
  ['inv-employee', 'update-qty-employee', 'task-assigned'].forEach(function(id) {
    var el = document.getElementById(id); if (!el) return;
    var cur = el.value; el.innerHTML = opts; el.value = cur;
  });
  var gs = document.getElementById('topbar-emp');
  if (gs) {
    var c = gs.value;
    gs.innerHTML = '<option value="">Employee</option>' + emp.map(function(e) { return '<option value="' + esc(e) + '">' + esc(e) + '</option>'; }).join('');
    gs.value = c;
  }
}

function updateTableDropdown() {
  var n = getDB().tables;
  var el = document.getElementById('res-table'); if (!el) return;
  el.innerHTML = Array.from({length: n}, function(_, i) { return '<option value="' + (i + 1) + '">Table ' + (i + 1) + '</option>'; }).join('');
}

// ================================================
// SETTINGS
// ================================================
function renderSettings() {
  var db = getDB();
  var el = document.getElementById('employee-list');
  if (db.employees.length === 0) {
    el.innerHTML = '<div class="empty-state" style="padding:16px"><p>No employees yet.</p></div>';
  } else {
    el.innerHTML = db.employees.map(function(e) {
      return '<div class="emp-row"><div style="display:flex;align-items:center;gap:10px"><div class="emp-avatar">' + esc(e[0]) + '</div><span style="font-size:14px;font-weight:600;color:var(--ocean-900)">' + esc(e) + '</span></div>'
        + '<button class="btn btn-danger btn-sm btn-icon" data-remove-emp="' + esc(e) + '"><i class="fas fa-trash"></i></button></div>';
    }).join('');
  }
  document.getElementById('tables-count-input').value = db.tables;
  document.getElementById('tables-display').textContent = db.tables + ' tables';
  document.getElementById('sb-url').value = localStorage.getItem('sb_url') || '';
  document.getElementById('sb-key').value = localStorage.getItem('sb_key') || '';
  updateSupabaseStatus();
  updateAllDropdowns();
}

function saveTables() {
  var n = parseInt(document.getElementById('tables-count-input').value) || 10;
  var db = getDB(); db.tables = n; saveDB(db);
  document.getElementById('tables-display').textContent = n + ' tables';
  updateTableDropdown(); renderDashboard(); toast('Saved!');
}

function saveSupabase() {
  var url = document.getElementById('sb-url').value.trim();
  var key = document.getElementById('sb-key').value.trim();
  if (!url || !key) { toast('Fill both fields.', 'error'); return; }
  localStorage.setItem('sb_url', url); localStorage.setItem('sb_key', key);
  updateSupabaseStatus(); toast('Supabase connected!');
}

function updateSupabaseStatus() {
  var url = localStorage.getItem('sb_url');
  var box = document.getElementById('sb-status-box');
  var txt = document.getElementById('sb-status-text');
  if (!box || !txt) return;
  if (url) {
    box.style.background = '#eff6ff';
    box.querySelector('.pulse-dot').className = 'pulse-dot green';
    txt.textContent = 'Connected: ' + url; txt.style.color = '#1d4ed8';
  } else {
    box.style.background = '#f0fdf4';
    box.querySelector('.pulse-dot').className = 'pulse-dot green';
    txt.textContent = 'Using local storage'; txt.style.color = '#16a34a';
  }
}

// ================================================
// INVENTORY
// ================================================
var catIconMap = {beverages: '🍹', food: '🍔', supplies: '🧹', equipment: '🔧', other: '📦'};

function switchInvTab(t) {
  ['stock', 'log', 'orders'].forEach(function(x) {
    document.getElementById('inv-tab-' + x).classList.toggle('active', x === t);
    document.getElementById('inv-panel-' + x).style.display = x === t ? 'block' : 'none';
  });
  if (t === 'log') renderInvLog();
  if (t === 'orders') renderOrderHistory();
}

function openAddInventoryModal(editId) {
  updateAllDropdowns();
  var m = document.getElementById('modal-add-inventory');
  if (editId) {
    var db = getDB(); var item = db.inventory.find(function(i) { return i.id === editId; }); if (!item) return;
    editInventoryId = editId;
    document.getElementById('inv-modal-title').textContent = 'Edit Item';
    document.getElementById('inv-item-name').value = item.name;
    document.getElementById('inv-category').value = item.category || 'other';
    document.getElementById('inv-unit').value = item.unit || '';
    document.getElementById('inv-qty-bar').value = item.qtyBar;
    document.getElementById('inv-qty-storage').value = item.qtyStorage;
    document.getElementById('inv-minimum').value = item.minimum;
    document.getElementById('inv-employee').value = item.lastEmployee || '';
  } else {
    editInventoryId = null;
    document.getElementById('inv-modal-title').textContent = 'Add Item';
    document.getElementById('inv-item-name').value = '';
    document.getElementById('inv-unit').value = '';
    document.getElementById('inv-category').value = 'beverages';
    document.getElementById('inv-qty-bar').value = '0';
    document.getElementById('inv-qty-storage').value = '0';
    document.getElementById('inv-minimum').value = '10';
    document.getElementById('inv-employee').value = '';
  }
  openModal('modal-add-inventory');
}

function saveInventoryItem() {
  var name = document.getElementById('inv-item-name').value.trim();
  if (!name) { toast('Name required!', 'error'); return; }
  var db = getDB();
  var emp = document.getElementById('inv-employee').value;
  var qb = parseInt(document.getElementById('inv-qty-bar').value) || 0;
  var qs = parseInt(document.getElementById('inv-qty-storage').value) || 0;
  var min = parseInt(document.getElementById('inv-minimum').value) || 0;
  var cat = document.getElementById('inv-category').value;
  var unit = document.getElementById('inv-unit').value.trim();
  if (editInventoryId) {
    var idx = db.inventory.findIndex(function(i) { return i.id === editInventoryId; });
    if (idx !== -1) {
      var old = db.inventory[idx];
      db.inventory[idx] = Object.assign({}, old, {name: name, category: cat, unit: unit, qtyBar: qb, qtyStorage: qs, minimum: min, lastEmployee: emp, updatedAt: new Date().toISOString()});
      addInvLog(db, {action: 'update', item: name, employee: emp, qtyBar: qb, qtyStorage: qs});
    }
  } else {
    db.inventory.push({id: uid(), name: name, category: cat, unit: unit, qtyBar: qb, qtyStorage: qs, minimum: min, lastEmployee: emp, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()});
    addInvLog(db, {action: 'add', item: name, employee: emp, qtyBar: qb, qtyStorage: qs});
  }
  saveDB(db); closeModal('modal-add-inventory'); renderInventory(); renderDashboard(); toast(editInventoryId ? 'Updated!' : 'Item added!');
  editInventoryId = null;
}

function addInvLog(db, entry) {
  db.invLogs.unshift(Object.assign({}, entry, {timestamp: new Date().toISOString(), id: uid()}));
  if (db.invLogs.length > 300) db.invLogs = db.invLogs.slice(0, 300);
}

function deleteInventoryItem(id) {
  if (!confirm('Delete this item?')) return;
  var db = getDB(); var item = db.inventory.find(function(i) { return i.id === id; });
  db.inventory = db.inventory.filter(function(i) { return i.id !== id; });
  addInvLog(db, {action: 'delete', item: item ? item.name : '?', employee: 'System'});
  saveDB(db); renderInventory(); renderDashboard(); toast('Deleted.');
}

function openUpdateQtyModal(id) {
  updateAllDropdowns();
  var db = getDB(); var item = db.inventory.find(function(i) { return i.id === id; }); if (!item) return;
  document.getElementById('update-qty-id').value = id;
  document.getElementById('update-qty-name').textContent = item.name + (item.unit ? ' (' + item.unit + ')' : '');
  document.getElementById('update-qty-bar').value = item.qtyBar;
  document.getElementById('update-qty-storage').value = item.qtyStorage;
  document.getElementById('update-qty-employee').value = item.lastEmployee || '';
  openModal('modal-update-qty');
}

function saveQtyUpdate() {
  var id = document.getElementById('update-qty-id').value;
  var emp = document.getElementById('update-qty-employee').value;
  var qb = parseInt(document.getElementById('update-qty-bar').value) || 0;
  var qs = parseInt(document.getElementById('update-qty-storage').value) || 0;
  var db = getDB(); var idx = db.inventory.findIndex(function(i) { return i.id === id; });
  if (idx !== -1) {
    var item = db.inventory[idx];
    db.inventory[idx] = Object.assign({}, item, {qtyBar: qb, qtyStorage: qs, lastEmployee: emp, updatedAt: new Date().toISOString()});
    addInvLog(db, {action: 'update', item: item.name, employee: emp, qtyBar: qb, qtyStorage: qs});
  }
  saveDB(db); closeModal('modal-update-qty'); renderInventory(); renderDashboard(); toast('Stock updated!');
}

function openEditMinimumModal(id) {
  var db = getDB(); var item = db.inventory.find(function(i) { return i.id === id; }); if (!item) return;
  document.getElementById('edit-min-id').value = id;
  document.getElementById('edit-min-item-name').textContent = item.name;
  document.getElementById('edit-min-current').textContent = (item.qtyBar + item.qtyStorage) + ' ' + (item.unit || 'units');
  document.getElementById('edit-min-value').value = item.minimum;
  openModal('modal-edit-minimum');
}

function saveMinimum() {
  var id = document.getElementById('edit-min-id').value;
  var val = parseInt(document.getElementById('edit-min-value').value) || 0;
  var db = getDB(); var idx = db.inventory.findIndex(function(i) { return i.id === id; });
  if (idx !== -1) db.inventory[idx].minimum = val;
  saveDB(db); closeModal('modal-edit-minimum'); renderInventory(); toast('Minimum updated!');
}

function renderInventory() {
  var db = getDB(); var items = db.inventory.slice();
  if (invSearchVal) items = items.filter(function(i) { return i.name.toLowerCase().indexOf(invSearchVal.toLowerCase()) !== -1; });
  if (invCatFilter) items = items.filter(function(i) { return i.category === invCatFilter; });
  var el = document.getElementById('inventory-list');
  if (!el) return;
  if (items.length === 0) { el.innerHTML = '<div class="empty-state"><i class="fas fa-box-open"></i><p>No items found.</p></div>'; return; }
  el.innerHTML = items.map(function(item) {
    var total = item.qtyBar + item.qtyStorage;
    var isLow = total < item.minimum;
    var pct = item.minimum > 0 ? Math.min(Math.round(total / item.minimum * 100), 100) : 100;
    var unit = item.unit ? ' ' + esc(item.unit) : '';
    return '<div class="inv-card">'
      + '<div class="inv-card-header">'
        + '<div class="inv-cat-icon">' + (catIconMap[item.category] || '📦') + '</div>'
        + '<div style="flex:1;min-width:0">'
          + '<div class="inv-name">' + esc(item.name) + '</div>'
          + '<div class="inv-meta">' + (item.lastEmployee ? 'Last: ' + esc(item.lastEmployee) : '') + (item.updatedAt ? ' · ' + fmtDate(item.updatedAt) : '') + '</div>'
        + '</div>'
        + '<span class="badge ' + (isLow ? 'badge-red' : 'badge-green') + '">' + (isLow ? 'Low' : 'OK') + '</span>'
      + '</div>'
      + '<div class="inv-stats">'
        + '<div class="inv-stat"><div class="inv-stat-val">' + item.qtyBar + '</div><div class="inv-stat-label">In Bar</div></div>'
        + '<div class="inv-stat"><div class="inv-stat-val">' + item.qtyStorage + '</div><div class="inv-stat-label">Storage</div></div>'
        + '<div class="inv-stat"><div class="inv-stat-val" style="color:var(--ocean-600)">' + total + '</div><div class="inv-stat-label">Total</div></div>'
        + '<div class="inv-stat min-stat" data-edit-min="' + esc(item.id) + '" title="Tap to edit minimum">'
          + '<div class="inv-stat-val" style="color:#f59e0b">' + item.minimum + '</div>'
          + '<div class="inv-stat-label">Min <i class="fas fa-pen" style="font-size:8px;opacity:.6"></i></div>'
        + '</div>'
      + '</div>'
      + '<div class="progress-bar"><div class="progress-fill ' + (isLow ? 'low' : '') + '" style="width:' + pct + '%"></div></div>'
      + '<div class="inv-actions" style="margin-top:10px">'
        + '<button class="btn btn-secondary btn-sm" style="flex:1;justify-content:center" data-update-qty="' + esc(item.id) + '"><i class="fas fa-pen"></i> Update Stock</button>'
        + '<button class="btn btn-secondary btn-sm btn-icon" data-edit-inv="' + esc(item.id) + '" title="Edit"><i class="fas fa-edit"></i></button>'
        + '<button class="btn btn-danger btn-sm btn-icon" data-delete-inv="' + esc(item.id) + '" title="Delete"><i class="fas fa-trash"></i></button>'
      + '</div>'
    + '</div>';
  }).join('');
}

function renderInvLog() {
  var db = getDB(); var el = document.getElementById('inv-log-list');
  if (!el) return;
  if (db.invLogs.length === 0) { el.innerHTML = '<div class="empty-state"><i class="fas fa-clock-rotate-left"></i><p>No log entries yet.</p></div>'; return; }
  var icons = {add: '<i class="fas fa-plus" style="color:#16a34a"></i>', update: '<i class="fas fa-pen" style="color:#1d4ed8"></i>', delete: '<i class="fas fa-trash" style="color:#dc2626"></i>'};
  el.innerHTML = db.invLogs.map(function(l) {
    return '<div class="log-item"><div class="log-icon">' + (icons[l.action] || '📝') + '</div><div style="flex:1"><div style="font-size:13px;font-weight:600;color:var(--ocean-900)">' + esc(l.item) + '</div><div style="font-size:11px;color:var(--ocean-400)">' + esc(l.action) + ' · ' + esc(l.employee || 'System') + '</div></div><div style="font-size:11px;color:var(--ocean-400)">' + fmtDate(l.timestamp) + '</div></div>';
  }).join('');
}

function renderOrderHistory() {
  var db = getDB(); var el = document.getElementById('inv-orders-list');
  if (!el) return;
  if (db.orders.length === 0) { el.innerHTML = '<div class="empty-state"><i class="fas fa-truck"></i><p>No orders yet.</p></div>'; return; }
  el.innerHTML = db.orders.slice().reverse().map(function(o) {
    return '<div class="order-item"><div style="display:flex;justify-content:space-between;margin-bottom:8px"><span style="font-weight:700;color:var(--ocean-800)">Order #' + o.id.slice(-6).toUpperCase() + '</span><span style="font-size:12px;color:var(--ocean-400)">' + fmtDate(o.date) + '</span></div><div>' + o.items.map(function(i) { return '<div style="display:flex;justify-content:space-between;font-size:13px;padding:3px 0"><span style="color:var(--ocean-700)">' + esc(i.name) + '</span><span style="font-weight:700;color:var(--ocean-900)">' + i.orderQty + ' ' + esc(i.unit || '') + '</span></div>'; }).join('') + '</div></div>';
  }).join('');
}

function openOrderModal() {
  var db = getDB(); var low = db.inventory.filter(function(i) { return (i.qtyBar + i.qtyStorage) < i.minimum; });
  var el = document.getElementById('order-items-list');
  if (!el) return;
  if (low.length === 0) {
    el.innerHTML = '<div class="empty-state" style="padding:20px"><i class="fas fa-check-circle" style="color:#22c55e"></i><p>All items above minimum!</p></div>';
  } else {
    el.innerHTML = low.map(function(item) {
      var total = item.qtyBar + item.qtyStorage; var needed = item.minimum - total;
      return '<div class="order-row"><div style="flex:1"><div style="font-weight:700;font-size:14px;color:var(--ocean-900)">' + esc(item.name) + '</div><div style="font-size:12px;color:var(--ocean-400)">Have ' + total + ' / Need ' + item.minimum + ' ' + esc(item.unit || '') + '</div></div><div style="text-align:right"><div style="font-size:11px;color:var(--ocean-400);margin-bottom:3px">Order</div><input type="number" min="1" value="' + needed + '" class="input-field" id="order-qty-' + esc(item.id) + '" style="width:70px;text-align:center;font-size:14px;padding:6px 8px"/></div></div>';
    }).join('');
  }
  openModal('modal-order');
}

function confirmOrder() {
  var db = getDB(); var low = db.inventory.filter(function(i) { return (i.qtyBar + i.qtyStorage) < i.minimum; });
  if (low.length === 0) { closeModal('modal-order'); return; }
  var orderItems = low.map(function(item) {
    var qEl = document.getElementById('order-qty-' + item.id);
    return {id: item.id, name: item.name, unit: item.unit, orderQty: qEl ? (parseInt(qEl.value) || (item.minimum - item.qtyBar - item.qtyStorage)) : item.minimum - item.qtyBar - item.qtyStorage};
  });
  db.orders.push({id: uid(), date: new Date().toISOString(), items: orderItems, status: 'sent'});
  saveDB(db); closeModal('modal-order'); renderInventory(); toast('Order placed! ' + orderItems.length + ' items.');
}

// ================================================
// RESERVATIONS
// ================================================
function switchResTab(t) {
  ['calendar', 'list'].forEach(function(x) {
    document.getElementById('res-tab-' + x).classList.toggle('active', x === t);
    document.getElementById('res-panel-' + x).style.display = x === t ? 'block' : 'none';
  });
}

function prevWeek() { calendarWeekStart.setDate(calendarWeekStart.getDate() - 7); renderCalendar(); }
function nextWeek() { calendarWeekStart.setDate(calendarWeekStart.getDate() + 7); renderCalendar(); }

function renderCalendar() {
  var db = getDB();
  var dnames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  var mnames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var end = new Date(calendarWeekStart); end.setDate(end.getDate() + 6);
  document.getElementById('calendar-week-label').textContent = mnames[calendarWeekStart.getMonth()] + ' ' + calendarWeekStart.getDate() + ' - ' + mnames[end.getMonth()] + ' ' + end.getDate();
  var grid = document.getElementById('calendar-grid');
  if (!grid) return;
  var today = new Date(); today.setHours(0, 0, 0, 0);
  grid.innerHTML = '';
  for (var i = 0; i < 7; i++) {
    var day = new Date(calendarWeekStart); day.setDate(day.getDate() + i);
    var dateStr = toDateStr(day);
    var isToday = day.getTime() === today.getTime();
    var isSel = selectedCalendarDay === dateStr;
    var dayRes = db.reservations.filter(function(r) { return r.date === dateStr; });
    var conf = dayRes.filter(function(r) { return r.status === 'confirmed'; }).length;
    var pend = dayRes.filter(function(r) { return !r.status || r.status === 'pending'; }).length;
    var nos = dayRes.filter(function(r) { return r.status === 'no-show'; }).length;
    var el = document.createElement('div');
    el.className = 'cal-day' + (isToday ? ' today' : '') + (isSel ? ' selected' : '');
    el.dataset.calDay = dateStr;
    var dots = '';
    for (var c = 0; c < Math.min(conf, 3); c++) dots += '<span style="background:' + (isSel ? 'rgba(255,255,255,.8)' : '#22c55e') + '"></span>';
    for (var p = 0; p < Math.min(pend, 3); p++) dots += '<span style="background:' + (isSel ? 'rgba(255,255,255,.8)' : '#f59e0b') + '"></span>';
    for (var n = 0; n < Math.min(nos, 3); n++) dots += '<span style="background:' + (isSel ? 'rgba(255,255,255,.8)' : '#ef4444') + '"></span>';
    el.innerHTML = '<div class="cal-day-name">' + dnames[i] + '</div><div class="cal-day-num">' + day.getDate() + '</div>'
      + (dots ? '<div class="cal-dots">' + dots + '</div>' : '')
      + (dayRes.length > 0 ? '<div class="cal-count">' + dayRes.length + '</div>' : '');
    grid.appendChild(el);
  }
  if (selectedCalendarDay) renderDayReservations(selectedCalendarDay);
}

function renderDayReservations(dateStr) {
  var db = getDB();
  var res = db.reservations.filter(function(r) { return r.date === dateStr; }).sort(function(a, b) { return a.time.localeCompare(b.time); });
  var d = new Date(dateStr + 'T12:00:00');
  var dnames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var mnames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  document.getElementById('res-day-label').textContent = dnames[d.getDay()] + ', ' + mnames[d.getMonth()] + ' ' + d.getDate();
  var el = document.getElementById('res-day-list');
  if (!el) return;
  if (res.length === 0) { el.innerHTML = '<div class="empty-state"><i class="fas fa-calendar-xmark"></i><p>No reservations this day.</p></div>'; return; }
  el.innerHTML = res.map(function(r) {
    return '<div class="res-item ' + (r.status === 'no-show' ? 'no-show' : r.status === 'confirmed' ? 'confirmed' : '') + '" data-open-res-detail="' + esc(r.id) + '">'
      + '<div class="res-item-top"><div><span class="res-time">' + esc(r.time) + '</span><span class="res-name">' + esc(r.guestName) + '</span></div>'
      + '<span class="badge ' + (r.status === 'confirmed' ? 'badge-green' : r.status === 'no-show' ? 'badge-red' : 'badge-yellow') + '">' + esc(r.status || 'Pending') + '</span></div>'
      + '<div class="res-meta"><span><i class="fas fa-users" style="margin-right:3px"></i>' + r.guests + '</span><span><i class="fas fa-chair" style="margin-right:3px"></i>Table ' + r.table + '</span>' + (r.phone ? '<span><i class="fas fa-phone" style="margin-right:3px"></i>' + esc(r.phone) + '</span>' : '') + '</div>'
    + '</div>';
  }).join('');
}

function openResDetail(id) {
  var db = getDB(); var r = db.reservations.find(function(x) { return x.id === id; }); if (!r) return;
  document.getElementById('res-detail-content').innerHTML = '<div class="detail-grid">'
    + '<div class="detail-cell"><div class="detail-cell-label">Guest</div><div class="detail-cell-val">' + esc(r.guestName) + '</div></div>'
    + '<div class="detail-cell"><div class="detail-cell-label">Status</div><div class="detail-cell-val"><span class="badge ' + (r.status === 'confirmed' ? 'badge-green' : r.status === 'no-show' ? 'badge-red' : 'badge-yellow') + '">' + esc(r.status || 'Pending') + '</span></div></div>'
    + '<div class="detail-cell"><div class="detail-cell-label">Date</div><div class="detail-cell-val">' + esc(r.date) + '</div></div>'
    + '<div class="detail-cell"><div class="detail-cell-label">Time</div><div class="detail-cell-val">' + esc(r.time) + '</div></div>'
    + '<div class="detail-cell"><div class="detail-cell-label">Guests</div><div class="detail-cell-val">' + r.guests + ' people</div></div>'
    + '<div class="detail-cell"><div class="detail-cell-label">Table</div><div class="detail-cell-val">Table ' + r.table + '</div></div>'
    + (r.phone ? '<div class="detail-cell"><div class="detail-cell-label">Phone</div><div class="detail-cell-val">' + esc(r.phone) + '</div></div>' : '')
    + (r.notes ? '<div class="detail-cell full"><div class="detail-cell-label">Notes</div><div class="detail-cell-val">' + esc(r.notes) + '</div></div>' : '')
    + '</div>';
  var actEl = document.getElementById('res-detail-actions');
  actEl.innerHTML = '';
  var confirmBtn = document.createElement('button');
  confirmBtn.className = 'btn btn-sm';
  confirmBtn.style.cssText = 'background:linear-gradient(135deg,#22c55e,#16a34a);color:white;flex:1;justify-content:center';
  confirmBtn.innerHTML = '<i class="fas fa-check"></i> Confirmed';
  confirmBtn.addEventListener('click', function() { setResStatus(id, 'confirmed'); });
  var noShowBtn = document.createElement('button');
  noShowBtn.className = 'btn btn-danger btn-sm';
  noShowBtn.style.cssText = 'flex:1;justify-content:center';
  noShowBtn.innerHTML = '<i class="fas fa-user-xmark"></i> No Show';
  noShowBtn.addEventListener('click', function() { setResStatus(id, 'no-show'); });
  var pendBtn = document.createElement('button');
  pendBtn.className = 'btn btn-secondary btn-sm';
  pendBtn.style.cssText = 'flex:1;justify-content:center';
  pendBtn.innerHTML = '<i class="fas fa-clock"></i> Pending';
  pendBtn.addEventListener('click', function() { setResStatus(id, 'pending'); });
  var editBtn = document.createElement('button');
  editBtn.className = 'btn btn-secondary btn-sm btn-icon';
  editBtn.innerHTML = '<i class="fas fa-pen"></i>';
  editBtn.addEventListener('click', function() { closeModal('modal-res-detail'); openEditReservation(id); });
  var delBtn = document.createElement('button');
  delBtn.className = 'btn btn-danger btn-sm btn-icon';
  delBtn.innerHTML = '<i class="fas fa-trash"></i>';
  delBtn.addEventListener('click', function() { deleteReservation(id); });
  actEl.appendChild(confirmBtn); actEl.appendChild(noShowBtn); actEl.appendChild(pendBtn); actEl.appendChild(editBtn); actEl.appendChild(delBtn);
  openModal('modal-res-detail');
}

function setResStatus(id, status) {
  var db = getDB(); var idx = db.reservations.findIndex(function(r) { return r.id === id; });
  if (idx !== -1) { db.reservations[idx].status = status; saveDB(db); }
  closeModal('modal-res-detail'); renderCalendar(); renderAllReservations(); renderDashboard(); toast('Status: ' + status + '!');
}

function openAddReservationModal() {
  updateTableDropdown();
  document.getElementById('res-modal-title').textContent = 'New Reservation';
  document.getElementById('res-edit-id').value = '';
  document.getElementById('res-guest-name').value = '';
  document.getElementById('res-phone').value = '';
  document.getElementById('res-date').value = toDateStr(new Date());
  document.getElementById('res-time').value = '12:00';
  document.getElementById('res-guests').value = '2';
  document.getElementById('res-notes').value = '';
  openModal('modal-add-reservation');
}

function openEditReservation(id) {
  updateTableDropdown();
  var db = getDB(); var r = db.reservations.find(function(x) { return x.id === id; }); if (!r) return;
  document.getElementById('res-modal-title').textContent = 'Edit Reservation';
  document.getElementById('res-edit-id').value = id;
  document.getElementById('res-guest-name').value = r.guestName;
  document.getElementById('res-phone').value = r.phone || '';
  document.getElementById('res-date').value = r.date;
  document.getElementById('res-time').value = r.time;
  document.getElementById('res-guests').value = r.guests;
  document.getElementById('res-table').value = r.table;
  document.getElementById('res-notes').value = r.notes || '';
  openModal('modal-add-reservation');
}

function saveReservation() {
  var guestName = document.getElementById('res-guest-name').value.trim();
  if (!guestName) { toast('Guest name required!', 'error'); return; }
  var date = document.getElementById('res-date').value;
  var time = document.getElementById('res-time').value;
  var table = document.getElementById('res-table').value;
  if (!date || !time || !table) { toast('Date, time and table required!', 'error'); return; }
  var db = getDB(); var editId = document.getElementById('res-edit-id').value;
  var res = {guestName: guestName, phone: document.getElementById('res-phone').value.trim(), date: date, time: time, guests: parseInt(document.getElementById('res-guests').value) || 1, table: table, notes: document.getElementById('res-notes').value.trim(), status: 'pending'};
  if (editId) {
    var idx = db.reservations.findIndex(function(r) { return r.id === editId; });
    if (idx !== -1) db.reservations[idx] = Object.assign({}, db.reservations[idx], res);
  } else {
    db.reservations.push(Object.assign({}, res, {id: uid(), createdAt: new Date().toISOString()}));
  }
  saveDB(db); closeModal('modal-add-reservation'); renderCalendar(); renderAllReservations(); renderDashboard(); toast(editId ? 'Updated!' : 'Reservation saved!');
}

function deleteReservation(id) {
  if (!confirm('Delete reservation?')) return;
  var db = getDB(); db.reservations = db.reservations.filter(function(r) { return r.id !== id; }); saveDB(db);
  closeModal('modal-res-detail'); renderCalendar(); renderAllReservations(); renderDashboard(); toast('Deleted.');
}

function renderAllReservations() {
  var db = getDB();
  var res = db.reservations.slice().sort(function(a, b) { return (a.date + a.time).localeCompare(b.date + b.time); });
  if (resSearchVal) res = res.filter(function(r) { return r.guestName.toLowerCase().indexOf(resSearchVal.toLowerCase()) !== -1 || String(r.table).indexOf(resSearchVal) !== -1; });
  if (resDateFilter) res = res.filter(function(r) { return r.date === resDateFilter; });
  var el = document.getElementById('res-all-list');
  if (!el) return;
  if (res.length === 0) { el.innerHTML = '<div class="empty-state"><i class="fas fa-calendar-xmark"></i><p>No reservations found.</p></div>'; return; }
  el.innerHTML = res.map(function(r) {
    return '<div class="res-list-item" data-open-res-detail="' + esc(r.id) + '">'
      + '<div class="res-date-box"><div class="rdb-d">' + esc(r.date.slice(5)) + '</div><div class="rdb-t">' + esc(r.time) + '</div></div>'
      + '<div style="flex:1;min-width:0"><div style="font-weight:700;font-size:14px;color:var(--ocean-900)">' + esc(r.guestName) + '</div>'
      + '<div style="font-size:12px;color:var(--ocean-400);display:flex;gap:10px;flex-wrap:wrap;margin-top:2px"><span><i class="fas fa-users" style="margin-right:3px"></i>' + r.guests + '</span><span><i class="fas fa-chair" style="margin-right:3px"></i>Table ' + r.table + '</span>' + (r.phone ? '<span>' + esc(r.phone) + '</span>' : '') + '</div></div>'
      + '<span class="badge ' + (r.status === 'confirmed' ? 'badge-green' : r.status === 'no-show' ? 'badge-red' : 'badge-yellow') + '">' + esc(r.status || 'Pending') + '</span>'
      + '</div>';
  }).join('');
}

// ================================================
// TASKS
// ================================================
var taskCatIcons = {maintenance: '🔧', cleaning: '🧹', call: '📞', purchase: '🛒', admin: '📋', staff: '👥', other: '📌'};
var priColors = {high: 'badge-red', medium: 'badge-yellow', low: 'badge-green'};

function openAddTaskModal(editId) {
  updateAllDropdowns();
  if (editId) {
    var db = getDB(); var t = db.tasks.find(function(x) { return x.id === editId; }); if (!t) return;
    document.getElementById('task-modal-title').textContent = 'Edit Task';
    document.getElementById('task-edit-id').value = editId;
    document.getElementById('task-title').value = t.title;
    document.getElementById('task-description').value = t.description || '';
    document.getElementById('task-category').value = t.category || 'other';
    document.getElementById('task-priority').value = t.priority || 'medium';
    document.getElementById('task-assigned').value = t.assignedTo || '';
    document.getElementById('task-deadline').value = t.deadline || '';
  } else {
    document.getElementById('task-modal-title').textContent = 'New Task';
    document.getElementById('task-edit-id').value = '';
    document.getElementById('task-title').value = '';
    document.getElementById('task-description').value = '';
    document.getElementById('task-category').value = 'maintenance';
    document.getElementById('task-priority').value = 'medium';
    document.getElementById('task-assigned').value = '';
    document.getElementById('task-deadline').value = '';
  }
  openModal('modal-add-task');
}

function saveTask() {
  var title = document.getElementById('task-title').value.trim();
  if (!title) { toast('Title required!', 'error'); return; }
  var db = getDB(); var editId = document.getElementById('task-edit-id').value;
  var task = {title: title, description: document.getElementById('task-description').value.trim(), category: document.getElementById('task-category').value, priority: document.getElementById('task-priority').value, assignedTo: document.getElementById('task-assigned').value, deadline: document.getElementById('task-deadline').value};
  if (editId) {
    var idx = db.tasks.findIndex(function(t) { return t.id === editId; });
    if (idx !== -1) db.tasks[idx] = Object.assign({}, db.tasks[idx], task);
  } else {
    db.tasks.push(Object.assign({}, task, {id: uid(), status: 'pending', createdAt: new Date().toISOString()}));
  }
  saveDB(db); closeModal('modal-add-task'); renderTasks(); renderDashboard(); toast(editId ? 'Updated!' : 'Task created!');
}

function setTaskStatus(id, status) {
  var db = getDB(); var idx = db.tasks.findIndex(function(t) { return t.id === id; });
  if (idx !== -1) { db.tasks[idx].status = status; if (status === 'done') db.tasks[idx].doneAt = new Date().toISOString(); saveDB(db); }
  renderTasks(); renderDashboard(); toast('Marked as ' + status + '!');
}

function deleteTask(id) {
  if (!confirm('Delete task?')) return;
  var db = getDB(); db.tasks = db.tasks.filter(function(t) { return t.id !== id; }); saveDB(db);
  renderTasks(); renderDashboard(); toast('Deleted.');
}

function renderTasks() {
  var db = getDB();
  document.getElementById('task-count-pending').textContent = db.tasks.filter(function(t) { return t.status === 'pending'; }).length;
  document.getElementById('task-count-progress').textContent = db.tasks.filter(function(t) { return t.status === 'in-progress'; }).length;
  document.getElementById('task-count-done').textContent = db.tasks.filter(function(t) { return t.status === 'done'; }).length;
  var po = {high: 0, medium: 1, low: 2};
  var tasks = db.tasks.slice().sort(function(a, b) { return (po[a.priority] || 1) - (po[b.priority] || 1); });
  if (currentTaskFilter !== 'all') tasks = tasks.filter(function(t) { return t.status === currentTaskFilter; });
  var el = document.getElementById('task-list');
  if (!el) return;
  if (tasks.length === 0) { el.innerHTML = '<div class="empty-state"><i class="fas fa-clipboard-list"></i><p>No tasks here.</p></div>'; return; }
  var now = new Date();
  el.innerHTML = tasks.map(function(t) {
    var isOverdue = t.deadline && new Date(t.deadline) < now && t.status !== 'done';
    return '<div class="task-item' + (t.status === 'done' ? ' done' : '') + '">'
      + '<div class="task-top">'
        + '<div class="task-icon">' + (taskCatIcons[t.category] || '📌') + '</div>'
        + '<div class="task-body">'
          + '<div class="task-title' + (t.status === 'done' ? ' done-text' : '') + '">' + esc(t.title) + '</div>'
          + '<div class="task-badges"><span class="badge ' + (priColors[t.priority] || 'badge-gray') + '">' + esc(t.priority || 'medium') + '</span><span class="badge ' + (t.status === 'done' ? 'badge-green' : t.status === 'in-progress' ? 'badge-blue' : 'badge-yellow') + '">' + esc(t.status) + '</span>' + (isOverdue ? '<span class="badge badge-red">Overdue</span>' : '') + '</div>'
          + (t.description ? '<div class="task-desc">' + esc(t.description) + '</div>' : '')
          + '<div class="task-meta">' + (t.assignedTo ? '<span><i class="fas fa-user" style="margin-right:3px"></i>' + esc(t.assignedTo) + '</span>' : '') + (t.deadline ? '<span><i class="fas fa-calendar-check" style="margin-right:3px"></i>' + esc(t.deadline) + '</span>' : '') + '</div>'
        + '</div>'
      + '</div>'
      + '<div class="task-actions">'
        + (t.status !== 'done' ? '<button class="btn btn-sm" style="background:#dcfce7;color:#16a34a;border:1.5px solid #bbf7d0;flex:1;justify-content:center" data-task-done="' + esc(t.id) + '"><i class="fas fa-check"></i> Done</button>' : '')
        + (t.status === 'pending' ? '<button class="btn btn-sm" style="background:#dbeafe;color:#1d4ed8;border:1.5px solid #bfdbfe" data-task-progress="' + esc(t.id) + '"><i class="fas fa-play"></i></button>' : '')
        + '<button class="btn btn-secondary btn-sm" data-edit-task="' + esc(t.id) + '"><i class="fas fa-pen"></i></button>'
        + '<button class="btn btn-danger btn-sm btn-icon" data-delete-task="' + esc(t.id) + '"><i class="fas fa-trash"></i></button>'
      + '</div>'
    + '</div>';
  }).join('');
}

// ================================================
// DASHBOARD
// ================================================
function renderDashboard() {
  var db = getDB();
  document.getElementById('dash-inv-count').textContent = db.inventory.length;
  var lowItems = db.inventory.filter(function(i) { return (i.qtyBar + i.qtyStorage) < i.minimum; });
  document.getElementById('dash-inv-status').className = 'badge ' + (lowItems.length > 0 ? 'badge-red' : 'badge-green');
  document.getElementById('dash-inv-status').textContent = lowItems.length > 0 ? lowItems.length + ' Low' : 'OK';
  document.getElementById('dash-inv-low').textContent = lowItems.length > 0 ? lowItems.length + ' need restock' : '';
  var alertEl = document.getElementById('dash-low-stock');
  if (lowItems.length === 0) {
    alertEl.innerHTML = '<div class="empty-state" style="padding:12px"><i class="fas fa-check-circle" style="color:#22c55e;font-size:22px"></i><p>All good!</p></div>';
  } else {
    alertEl.innerHTML = lowItems.slice(0, 6).map(function(i) {
      var total = i.qtyBar + i.qtyStorage; var pct = i.minimum > 0 ? Math.round(total / i.minimum * 100) : 100;
      return '<div class="alert-item"><span class="pulse-dot red"></span><div style="flex:1"><div style="font-size:13px;font-weight:700;color:#dc2626">' + esc(i.name) + '</div><div style="height:4px;background:#fee2e2;border-radius:2px;margin-top:3px;overflow:hidden"><div style="height:100%;width:' + pct + '%;background:#ef4444;border-radius:2px"></div></div></div><div style="font-size:12px;color:#dc2626;font-weight:700">' + total + '/' + i.minimum + '</div></div>';
    }).join('');
  }
  var today = toDateStr(new Date());
  var todayRes = db.reservations.filter(function(r) { return r.date === today; }).sort(function(a, b) { return a.time.localeCompare(b.time); });
  document.getElementById('dash-res-count').textContent = todayRes.length;
  var todayEl = document.getElementById('dash-today-res');
  if (todayRes.length === 0) {
    todayEl.innerHTML = '<div class="empty-state" style="padding:12px"><i class="fas fa-calendar-xmark" style="font-size:22px"></i><p>No reservations today</p></div>';
  } else {
    todayEl.innerHTML = todayRes.slice(0, 5).map(function(r) {
      return '<div class="today-res-item" data-nav="reservations"><div style="width:38px;height:38px;background:var(--ocean-200);border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:var(--ocean-700);flex-shrink:0">' + esc(r.time) + '</div><div style="flex:1"><div style="font-size:13px;font-weight:700;color:var(--ocean-900)">' + esc(r.guestName) + '</div><div style="font-size:11px;color:var(--ocean-400)">Table ' + r.table + ' · ' + r.guests + ' guests</div></div><span class="badge ' + (r.status === 'confirmed' ? 'badge-green' : r.status === 'no-show' ? 'badge-red' : 'badge-yellow') + '">' + esc(r.status || 'Pending') + '</span></div>';
    }).join('');
  }
  var openTasks = db.tasks.filter(function(t) { return t.status !== 'done'; });
  document.getElementById('dash-task-count').textContent = openTasks.length;
  document.getElementById('dash-task-badge').className = 'badge ' + (openTasks.length > 0 ? 'badge-yellow' : 'badge-green');
  document.getElementById('dash-task-badge').textContent = openTasks.length > 0 ? 'Open' : 'All Done';
  document.getElementById('dash-tables').textContent = db.tables;
}

// ================================================
// EVENT DELEGATION - Single event listener approach
// ================================================
document.addEventListener('click', function(e) {
  var t = e.target;
  // Find closest element with a data attribute
  var el = t.closest('[data-nav]');
  if (el) { closeDrawer(); showSection(el.dataset.nav); return; }

  el = t.closest('[data-close-modal]');
  if (el) { closeModal(el.dataset.closeModal); return; }

  el = t.closest('[data-inv-tab]');
  if (el) { switchInvTab(el.dataset.invTab); return; }

  el = t.closest('[data-res-tab]');
  if (el) { switchResTab(el.dataset.resTab); return; }

  el = t.closest('[data-task-filter]');
  if (el) {
    currentTaskFilter = el.dataset.taskFilter;
    document.querySelectorAll('#task-filter-btns .tab-btn').forEach(function(b) { b.classList.remove('active'); });
    el.classList.add('active');
    renderTasks(); return;
  }

  el = t.closest('[data-edit-min]');
  if (el) { openEditMinimumModal(el.dataset.editMin); return; }

  el = t.closest('[data-update-qty]');
  if (el) { openUpdateQtyModal(el.dataset.updateQty); return; }

  el = t.closest('[data-edit-inv]');
  if (el) { openAddInventoryModal(el.dataset.editInv); return; }

  el = t.closest('[data-delete-inv]');
  if (el) { deleteInventoryItem(el.dataset.deleteInv); return; }

  el = t.closest('[data-open-res-detail]');
  if (el) { openResDetail(el.dataset.openResDetail); return; }

  el = t.closest('[data-task-done]');
  if (el) { setTaskStatus(el.dataset.taskDone, 'done'); return; }

  el = t.closest('[data-task-progress]');
  if (el) { setTaskStatus(el.dataset.taskProgress, 'in-progress'); return; }

  el = t.closest('[data-edit-task]');
  if (el) { openAddTaskModal(el.dataset.editTask); return; }

  el = t.closest('[data-delete-task]');
  if (el) { deleteTask(el.dataset.deleteTask); return; }

  el = t.closest('[data-remove-emp]');
  if (el) { removeEmployee(el.dataset.removeEmp); return; }

  // Overlay close: click on modal overlay itself
  var overlay = t.closest('.modal-overlay');
  if (overlay && t === overlay) { closeModal(overlay.id); return; }

  // Specific buttons
  if (t.closest('#hamburger-btn')) { openDrawer(); return; }
  if (t.closest('#drawer-overlay')) { closeDrawer(); return; }
  if (t.closest('#btn-add-inventory')) { openAddInventoryModal(); return; }
  if (t.closest('#btn-open-order')) { openOrderModal(); return; }
  if (t.closest('#btn-save-inventory')) { saveInventoryItem(); return; }
  if (t.closest('#btn-save-minimum')) { saveMinimum(); return; }
  if (t.closest('#btn-save-qty-update')) { saveQtyUpdate(); return; }
  if (t.closest('#btn-confirm-order')) { confirmOrder(); return; }
  if (t.closest('#btn-add-reservation')) { openAddReservationModal(); return; }
  if (t.closest('#btn-save-reservation')) { saveReservation(); return; }
  if (t.closest('#btn-add-task')) { openAddTaskModal(); return; }
  if (t.closest('#btn-save-task')) { saveTask(); return; }
  if (t.closest('#btn-add-employee')) { addEmployee(); return; }
  if (t.closest('#btn-save-tables')) { saveTables(); return; }
  if (t.closest('#btn-save-supabase')) { saveSupabase(); return; }
  if (t.closest('#btn-prev-week')) { prevWeek(); return; }
  if (t.closest('#btn-next-week')) { nextWeek(); return; }

  el = t.closest('.cal-day[data-cal-day]');
  if (el) { selectedCalendarDay = el.dataset.calDay; renderCalendar(); renderDayReservations(selectedCalendarDay); return; }
});

// Input/change event delegation
document.addEventListener('input', function(e) {
  var t = e.target;
  if (t.id === 'inv-search') { invSearchVal = t.value; renderInventory(); }
});

document.addEventListener('change', function(e) {
  var t = e.target;
  if (t.id === 'inv-cat-filter') { invCatFilter = t.value; renderInventory(); }
  if (t.id === 'res-search') { resSearchVal = t.value; renderAllReservations(); }
  if (t.id === 'res-date-filter') { resDateFilter = t.value; renderAllReservations(); }
  if (t.id === 'topbar-emp') { document.getElementById('drawer-user-name').textContent = t.value || 'Manager'; }
});

// Also handle input on res-search
document.addEventListener('input', function(e) {
  var t = e.target;
  if (t.id === 'res-search') { resSearchVal = t.value; renderAllReservations(); }
});

// ================================================
// INIT
// ================================================
selectedCalendarDay = toDateStr(new Date());
updateAllDropdowns();
updateTableDropdown();
showSection('dashboard');

})(); // end IIFE
<\/script>
</body>
</html>`;
}
