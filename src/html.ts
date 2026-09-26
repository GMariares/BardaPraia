export function getAppHTML(cfg: { sbUrl: string; sbKey: string }): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <title>Bar da Praia</title>
  <meta name="theme-color" content="#34525f" />
  <link rel="preload" href="/fonts/hanken-grotesk-latin-600-normal.woff2" as="font" type="font/woff2" crossorigin />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-title" content="Bar da Praia" />
  <link rel="icon" type="image/png" sizes="32x32" href="/brand/favicon-32.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/brand/apple-touch-icon.png" />
  <link rel="manifest" href="/manifest.webmanifest" />
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js"></script>
  <style>
    @font-face { font-family:'Hanken Grotesk'; font-style:normal; font-weight:400; font-display:swap; src:url(/fonts/hanken-grotesk-latin-400-normal.woff2) format('woff2'); }
    @font-face { font-family:'Hanken Grotesk'; font-style:normal; font-weight:500; font-display:swap; src:url(/fonts/hanken-grotesk-latin-500-normal.woff2) format('woff2'); }
    @font-face { font-family:'Hanken Grotesk'; font-style:normal; font-weight:600; font-display:swap; src:url(/fonts/hanken-grotesk-latin-600-normal.woff2) format('woff2'); }
    @font-face { font-family:'Hanken Grotesk'; font-style:normal; font-weight:700; font-display:swap; src:url(/fonts/hanken-grotesk-latin-700-normal.woff2) format('woff2'); }
    @font-face { font-family:'Hanken Grotesk'; font-style:normal; font-weight:800; font-display:swap; src:url(/fonts/hanken-grotesk-latin-800-normal.woff2) format('woff2'); }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      /* ── The whitewashed dining room ── */
      --canvas: #f3f1ec;            /* sand-white floor */
      --panel: #ffffff;             /* whitewashed wall */
      --slate-900: #22363f; --slate-800: #2b434e; --slate-700: #34525f; --slate-600: #4a6572;
      --slate-500: #5f7079; --slate-400: #8a9aa2; --slate-300: #b7c3c9; --slate-200: #d5dde1;
      --slate-100: #e6ebee; --slate-50: #f2f5f6;
      --mint-50: #edf9f5; --mint-100: #d6f2ea; --mint-200: #b7e7d2; --mint-300: #94dac3;
      --teal-500: #2a9683; --teal-600: #1f8574; --teal-700: #17695c;
      --pine: #b07b59; --rattan: #c9a680; --rattan-50: #f8f1e7; --rattan-200: #e9d6bb;
      --gold: #a6741e; --gold-50: #fbf1dc; --gold-200: #ecd39a;
      --purple: #6d4fc2; --purple-50: #efeafb; --purple-200: #cfc2f0;
      --green: #2b8a4b; --green-50: #e3f4e8; --green-200: #a9dcb9;
      --blue: #2f6fa8; --blue-50: #e6f0f9; --blue-200: #b5d0e8;
      --red: #b4402f; --red-50: #fbeae7; --red-200: #f0b8ae;
      --amber: #b7791f; --amber-50: #fdf3e1; --amber-200: #f0d391; --amber-700: #7a4f10;
      --red-400: #d0715f; --red-700: #8f3223; --green-700: #1f6b3a;
      --chart-teal: #1f9f86;        /* data fill: validated for chroma, lightness and 3:1 on white */
      --radius: 12px; --radius-sm: 8px;
      --rule: 1px solid var(--slate-200);
      --shadow: none;
      --shadow-md: none;
      --shadow-overlay: 0 12px 32px rgba(34,54,63,.18);
      --font: 'Hanken Grotesk', system-ui, -apple-system, 'Segoe UI', sans-serif;
      --beam-w: 248px;
      /* legacy aliases (inline styles in the page script) */
      --ocean-50: var(--slate-50); --ocean-100: var(--slate-100); --ocean-200: var(--slate-200);
      --ocean-300: var(--slate-300); --ocean-400: var(--slate-500); --ocean-500: var(--teal-500);
      --ocean-600: var(--teal-600); --ocean-700: var(--slate-700); --ocean-800: var(--slate-800);
      --ocean-900: var(--slate-900);
      --grad: var(--slate-700);
      --grad-btn: var(--teal-600);
      --gold-light: var(--gold-50);
    }
    html, body { height: 100%; overflow: hidden; }
    body { font-family: var(--font); font-size: 15px; line-height: 1.4; background: var(--canvas); color: var(--slate-900); -webkit-tap-highlight-color: transparent; font-variant-numeric: tabular-nums; font-feature-settings: "tnum" 1, "ss01" 0; -webkit-font-smoothing: antialiased; }
    button, input, select, textarea { font-family: inherit; font-size: inherit; color: inherit; }
    ::selection { background: var(--mint-200); color: var(--slate-900); }
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: var(--slate-300); border-radius: 3px; }
    :focus-visible { outline: 2px solid var(--teal-500); outline-offset: 2px; }
    input:focus-visible, select:focus-visible, textarea:focus-visible { outline: none; }
    i.fas, i.far, i.fab { line-height: 1; }

    /* ── LOGIN SCREEN ── */
    #login-screen { position:fixed; inset:0; z-index:9999; background:var(--canvas); display:flex; align-items:center; justify-content:center; padding:20px; }
    #login-screen::before { content:''; position:absolute; left:0; right:0; top:0; height:38vh; background:var(--slate-700); }
    #login-screen.hidden { display:none; }
    .login-box { position:relative; background:var(--panel); border-radius:16px; padding:36px 28px 28px; width:100%; max-width:380px; border:var(--rule); box-shadow:var(--shadow-overlay); }
    .login-logo { text-align:center; margin-bottom:28px; }
    .login-logo-img { display:block; width:220px; max-width:76%; height:auto; margin:0 auto 10px; }
    .login-logo h1 { font-size:20px; font-weight:700; color:var(--slate-900); }
    .login-logo p  { font-size:12px; font-weight:600; color:var(--slate-500); letter-spacing:.14em; text-transform:uppercase; }
    .login-field { margin-bottom:16px; }
    .login-field label { font-size:11px; font-weight:700; color:var(--slate-600); text-transform:uppercase; letter-spacing:.1em; display:block; margin-bottom:6px; }
    .login-field input { width:100%; border:var(--rule); border-radius:10px; padding:13px 14px; font-size:16px; color:var(--slate-900); outline:none; background:var(--panel); min-height:48px; transition:border-color .15s, box-shadow .15s; }
    .login-field input::placeholder { color:var(--slate-400); }
    .login-field input:focus { border-color:var(--teal-500); box-shadow:0 0 0 3px var(--mint-100); }
    #login-error { color:var(--red); font-size:13px; font-weight:600; text-align:center; min-height:18px; margin-bottom:10px; }
    .btn-login { width:100%; padding:14px; min-height:48px; background:var(--teal-600); color:white; border:none; border-radius:10px; font-size:16px; font-weight:700; cursor:pointer; transition:background .15s, transform .1s; }
    .btn-login:hover { background:var(--teal-700); }
    .btn-login:active { transform:scale(.99); }

    /* ── ROLE STAMPS ── */
    .role-chip { display:inline-flex; align-items:center; gap:5px; padding:3px 9px; border-radius:6px; font-size:11px; font-weight:700; letter-spacing:.04em; text-transform:uppercase; margin:1px; border:1px solid transparent; line-height:1.3; }
    .role-chip i { font-size:10px; }
    .role-chip.admin     { background:var(--gold-50);   color:var(--gold);   border-color:var(--gold-200); }
    .role-chip.finance   { background:var(--purple-50); color:var(--purple); border-color:var(--purple-200); }
    .role-chip.shift_mgr { background:var(--green-50);  color:var(--green);  border-color:var(--green-200); }
    .role-chip.employee  { background:var(--blue-50);   color:var(--blue);   border-color:var(--blue-200); }

    /* ── USER CARDS ── */
    .user-card { background:var(--panel); border-radius:var(--radius); padding:14px 16px; border:var(--rule); margin-bottom:8px; display:flex; align-items:center; gap:14px; }
    .user-avatar { width:44px; height:44px; border-radius:50%; background:var(--slate-700); color:white; font-size:16px; font-weight:700; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
    .user-info { flex:1; min-width:0; }
    .user-name { font-size:15px; font-weight:700; color:var(--slate-900); }
    .user-username { font-size:12px; color:var(--slate-500); margin-top:1px; }
    .user-roles { margin-top:6px; }

    /* ── ADMIN ROLE BADGE ── */
    .role-badge-admin { background:var(--gold-50); color:var(--gold); border:1px solid var(--gold-200); font-size:10px; font-weight:700; padding:2px 7px; border-radius:6px; letter-spacing:.06em; text-transform:uppercase; }
    .role-badge-emp { background:var(--blue-50); color:var(--blue); border:1px solid var(--blue-200); font-size:10px; font-weight:700; padding:2px 7px; border-radius:6px; letter-spacing:.06em; text-transform:uppercase; }

    /* ── THE BEAM (top bar) ── */
    #topbar { position:fixed; top:0; left:0; right:0; z-index:200; background:var(--slate-700); color:white; height:56px; display:flex; align-items:center; padding:0 12px 0 10px; gap:10px; }
    #hamburger-btn { width:44px; height:44px; border-radius:10px; border:none; background:transparent; color:white; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:18px; flex-shrink:0; transition:background .15s; }
    #hamburger-btn:hover { background:rgba(255,255,255,.1); }
    #topbar-title { font-weight:700; font-size:13px; letter-spacing:.16em; text-transform:uppercase; color:white; flex:1; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    #topbar-right { display:flex; align-items:center; gap:6px; flex-shrink:0; overflow:hidden; }
    #topbar-role-info { display:flex; align-items:center; gap:4px; overflow-x:auto; scrollbar-width:none; }
    #topbar-role-info::-webkit-scrollbar { display:none; }
    #topbar .role-chip { background:rgba(255,255,255,.12); border-color:rgba(255,255,255,.18); color:white; }
    #topbar .role-chip.admin i { color:var(--gold-200); }
    #topbar .role-chip.finance i { color:var(--purple-200); }
    #topbar .role-chip.shift_mgr i { color:var(--green-200); }
    #topbar .role-chip.employee i { color:var(--blue-200); }
    #topbar-emp { font-size:13px; font-weight:600; color:white; background:rgba(255,255,255,.12); border:1px solid rgba(255,255,255,.18); border-radius:8px; padding:6px 10px; outline:none; cursor:pointer; max-width:120px; }
    #topbar-emp option { color:var(--slate-900); }
    #admin-login-btn { background:var(--gold-200); color:var(--slate-900); border:none; border-radius:8px; padding:7px 10px; font-size:12px; font-weight:700; cursor:pointer; white-space:nowrap; }
    #admin-logout-btn { background:rgba(255,255,255,.12); color:white; border:1px solid rgba(255,255,255,.18); border-radius:8px; padding:7px 10px; font-size:12px; font-weight:700; cursor:pointer; display:none; }
    #finance-login-btn { background:var(--purple-200); color:var(--slate-900); border:none; border-radius:8px; padding:7px 10px; font-size:12px; font-weight:700; cursor:pointer; white-space:nowrap; }
    #finance-logout-btn { background:rgba(255,255,255,.12); color:white; border:1px solid rgba(255,255,255,.18); border-radius:8px; padding:7px 10px; font-size:12px; font-weight:700; cursor:pointer; display:none; }
    .role-badge-finance { background:var(--purple-50); color:var(--purple); border:1px solid var(--purple-200); font-size:10px; font-weight:700; padding:2px 7px; border-radius:6px; letter-spacing:.06em; text-transform:uppercase; }

    /* ── FINANCE SECTION ── */
    .fin-card { background:var(--panel); border-radius:var(--radius); padding:16px; margin-bottom:12px; border:var(--rule); overflow:hidden; }
    .fin-card h3 { font-size:12px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:var(--slate-700); margin-bottom:14px; display:flex; align-items:center; gap:8px; }
    .fin-card h3 i { color:var(--purple); }
    .fin-total-box { background:var(--slate-700); border-radius:var(--radius); padding:20px 18px; text-align:center; color:white; margin-bottom:14px; }
    .fin-total-label { font-size:11px; font-weight:700; letter-spacing:.16em; text-transform:uppercase; color:var(--purple-200); margin-bottom:6px; }
    .fin-total-num { font-size:40px; font-weight:800; letter-spacing:-.02em; line-height:1; }
    .fin-row { display:flex; align-items:center; justify-content:space-between; padding:11px 0; border-bottom:1px solid var(--slate-100); }
    .fin-row:last-child { border-bottom:none; }
    .fin-row-label { font-size:13px; font-weight:600; color:var(--slate-600); display:flex; align-items:center; gap:8px; }
    .fin-row-val { font-size:16px; font-weight:700; color:var(--slate-900); }
    .fin-record { background:var(--panel); border-radius:var(--radius); padding:16px; margin-bottom:8px; border:var(--rule); }
    .fin-record-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:12px; padding-bottom:10px; border-bottom:1px solid var(--slate-100); }
    .fin-record-date { font-weight:700; font-size:15px; color:var(--slate-900); }
    .fin-record-total { font-weight:800; font-size:20px; color:var(--purple); }
    .fin-summary-grid { display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; margin-bottom:14px; }
    .fin-summary-card { background:var(--panel); border-radius:var(--radius); padding:14px 10px; border:var(--rule); text-align:center; }
    .fin-summary-num { font-size:20px; font-weight:800; color:var(--slate-900); }
    .fin-summary-label { font-size:11px; font-weight:600; color:var(--slate-500); margin-top:3px; text-transform:uppercase; letter-spacing:.06em; }
    .fin-input-row { display:flex; align-items:center; gap:10px; margin-bottom:10px; overflow:hidden; }
    .fin-input-row label { font-size:11px; font-weight:700; color:var(--slate-600); text-transform:uppercase; letter-spacing:.08em; width:120px; min-width:120px; flex-shrink:0; }
    .fin-input-row input { flex:1; min-width:0; width:0; border:var(--rule); border-radius:var(--radius-sm); padding:11px 12px; min-height:46px; font-size:17px; font-weight:700; color:var(--slate-900); background:var(--panel); outline:none; text-align:right; -webkit-appearance:none; box-sizing:border-box; transition:border-color .15s, box-shadow .15s; }
    .fin-input-row input:focus { border-color:var(--purple); box-shadow:0 0 0 3px var(--purple-50); }
    .fin-section-title { font-size:11px; font-weight:700; color:var(--slate-500); text-transform:uppercase; letter-spacing:.14em; margin:18px 0 10px; display:flex; align-items:center; gap:8px; }
    .fin-section-title::after { content:''; flex:1; height:1px; background:var(--slate-200); }
    .fin-derived { background:var(--slate-50); border-radius:var(--radius-sm); padding:11px 12px; display:flex; align-items:center; justify-content:space-between; gap:8px; margin-bottom:8px; overflow:hidden; border:1px solid var(--slate-100); }
    .fin-derived-label { font-size:12px; color:var(--slate-600); font-weight:600; flex:1; min-width:0; }
    .fin-derived-val { font-size:16px; font-weight:800; color:var(--slate-900); flex-shrink:0; white-space:nowrap; }

    /* ── FINANCE YEAR CHARTS ── */
    .fin-chart { margin:0 0 12px; }
    .fin-chart-head { display:flex; align-items:baseline; justify-content:space-between; gap:10px; margin-bottom:6px; }
    .fin-chart-title { font-size:11px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:var(--slate-500); }
    .fin-chart-legend { display:flex; gap:12px; font-size:11px; font-weight:600; color:var(--slate-600); }
    .fin-chart-legend span { display:inline-flex; align-items:center; gap:5px; }
    .fin-chart-legend .sw-bar { width:10px; height:10px; border-radius:2px; background:var(--chart-teal); display:inline-block; }
    .fin-chart-legend .sw-line { width:14px; height:0; border-top:2px solid var(--slate-700); display:inline-block; }
    .fin-chart svg { display:block; width:100%; height:auto; overflow:visible; font-family:var(--font); }
    .fin-chart svg text { font-variant-numeric:tabular-nums; }
    .fin-chart .fc-grid { stroke:var(--slate-100); stroke-width:1; }
    .fin-chart .fc-axis { stroke:var(--slate-200); stroke-width:1; }
    .fin-chart .fc-tick { fill:var(--slate-500); font-size:10px; font-weight:600; }
    .fin-chart .fc-month { fill:var(--slate-500); font-size:10px; font-weight:700; letter-spacing:.04em; }
    .fin-chart .fc-month.now { fill:var(--slate-900); }
    .fin-chart .fc-bar { fill:var(--chart-teal); }
    .fin-chart .fc-budget { stroke:var(--slate-700); stroke-width:2; stroke-linecap:round; }
    .fin-chart .fc-hit { fill:transparent; cursor:default; }
    .fin-chart .fc-month-g:hover .fc-hit, .fin-chart .fc-month-g:focus .fc-hit { fill:var(--slate-50); }
    .fin-chart .fc-month-g:focus { outline:none; }
    .fin-chart .fc-label { fill:var(--slate-900); font-size:10px; font-weight:700; }
    .fin-chart .fc-tip { position:absolute; pointer-events:none; background:var(--slate-900); color:white; font-size:11px; font-weight:600; padding:6px 9px; border-radius:6px; white-space:nowrap; transform:translate(-50%,-100%); opacity:0; transition:opacity .12s; z-index:5; line-height:1.4; }
    .fin-chart .fc-tip b { color:var(--mint-300); font-weight:700; }
    .fin-chart .fc-wrap { position:relative; }
    .fin-chart details { margin-top:6px; }
    .fin-chart summary { font-size:11px; font-weight:700; color:var(--teal-700); cursor:pointer; letter-spacing:.04em; list-style:none; display:inline-flex; align-items:center; gap:5px; }
    .fin-chart summary::-webkit-details-marker { display:none; }
    .fin-chart table { width:100%; border-collapse:collapse; margin-top:6px; font-size:12px; }
    .fin-chart th { text-align:right; font-size:10px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; color:var(--slate-500); padding:4px 6px; border-bottom:var(--rule); }
    .fin-chart th:first-child, .fin-chart td:first-child { text-align:left; }
    .fin-chart td { text-align:right; padding:4px 6px; border-bottom:1px solid var(--slate-100); color:var(--slate-800); font-variant-numeric:tabular-nums; }
    .fin-chart td.neg { color:var(--red); }
    .fin-chart td.pos { color:var(--green); }
    .fin-chart tr.now td { font-weight:700; color:var(--slate-900); }

    /* ── THE BEAM (drawer / desktop sidebar) ── */
    #drawer-overlay { position:fixed; inset:0; background:rgba(34,54,63,.45); z-index:300; opacity:0; pointer-events:none; transition:opacity .2s; }
    #drawer-overlay.open { opacity:1; pointer-events:all; }
    #drawer { position:fixed; top:0; left:0; bottom:0; width:var(--beam-w); background:var(--slate-700); z-index:400; transform:translateX(-100%); transition:transform .22s cubic-bezier(.2,0,0,1); display:flex; flex-direction:column; color:white; }
    #drawer.open { transform:translateX(0); }
    #drawer-header { padding:18px 18px 16px; border-bottom:1px solid rgba(255,255,255,.12); }
    .logo-row { display:flex; align-items:center; gap:12px; }
    .logo-icon { width:44px; height:44px; background:#fff; border-radius:10px; display:flex; align-items:center; justify-content:center; padding:6px; flex-shrink:0; }
    .logo-icon img { width:100%; height:100%; object-fit:contain; }
    .logo-name { color:white; font-weight:700; font-size:13px; letter-spacing:.16em; text-transform:uppercase; }
    .logo-sub { color:var(--slate-300); font-size:11px; letter-spacing:.08em; text-transform:uppercase; margin-top:2px; }
    #drawer nav { flex:1; padding:12px 10px; overflow-y:auto; }
    .section-label { color:var(--slate-300); font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:.16em; padding:0 12px; margin:10px 0 6px; }
    .drawer-item { display:flex; align-items:center; gap:12px; padding:11px 12px; min-height:44px; border-radius:var(--radius-sm); cursor:pointer; border:none; background:none; color:rgba(255,255,255,.82); font-size:14px; font-weight:600; width:100%; text-align:left; transition:background .15s,color .15s; margin-bottom:2px; position:relative; }
    .drawer-item:hover { background:rgba(255,255,255,.08); color:white; }
    .drawer-item.active { background:var(--mint-300); color:var(--slate-900); }
    .drawer-item i { width:20px; text-align:center; font-size:15px; }
    .drawer-item .admin-only-badge { background:rgba(255,255,255,.14); color:var(--gold-200); font-size:9px; font-weight:700; letter-spacing:.08em; padding:2px 6px; border-radius:4px; margin-left:auto; }
    .drawer-item.active .admin-only-badge { background:rgba(34,54,63,.12); color:var(--slate-900); }
    #drawer-footer { padding:14px 16px; border-top:1px solid rgba(255,255,255,.12); }
    #drawer-user-name { color:white; font-size:14px; font-weight:700; }
    #drawer-user-sub { color:var(--slate-300); font-size:11px; }
    #drawer-footer .btn { background:rgba(255,255,255,.1); color:white; border:1px solid rgba(255,255,255,.18); }

    /* ── BOTTOM NAV (phone) ── */
    #bottom-nav { position:fixed; bottom:0; left:0; right:0; z-index:200; background:var(--panel); border-top:var(--rule); height:64px; display:flex; align-items:stretch; padding:6px 4px 0; padding-bottom:env(safe-area-inset-bottom,0); }
    .bnav-item { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:4px; cursor:pointer; border:none; background:none; color:var(--slate-500); font-size:10px; font-weight:700; border-radius:10px; transition:color .15s; padding:2px 0 6px; text-transform:uppercase; letter-spacing:.06em; min-width:0; position:relative; }
    .bnav-item i { font-size:18px; width:44px; height:28px; display:flex; align-items:center; justify-content:center; border-radius:14px; position:relative; z-index:1; transition:color .15s; }
    .bnav-item.active { color:var(--slate-900); }
    .bnav-item.active i { color:var(--slate-900); }
    .bnav-item:active i { background:var(--slate-100); }
    #bnav-marker { position:absolute; left:0; top:0; width:44px; height:28px; border-radius:14px; background:var(--mint-300); transform:translate(-200px,0); transition:transform .2s cubic-bezier(.2,0,0,1); pointer-events:none; }
    #bnav-marker.settled { }
    @media (prefers-reduced-motion: reduce) { #bnav-marker { transition:none; } }
    .bnav-item.admin-nav { color:var(--slate-500); }
    .bnav-item.admin-nav.active { color:var(--slate-900); }

    /* ── MAIN CONTENT ── */
    #content-wrap { position:fixed; top:56px; left:0; right:0; bottom:64px; overflow-y:auto; -webkit-overflow-scrolling:touch; padding:16px 16px 12px; }

    /* ── SECTIONS ── */
    .page-section { display:none; }
    .page-section.active { display:block; }

    /* ── PANELS ── */
    .card { background:var(--panel); border-radius:var(--radius); border:var(--rule); }

    /* ── DASHBOARD DATE LINE ── */
    .dash-date { display:flex; align-items:baseline; justify-content:space-between; gap:12px; padding:2px 2px 0; margin-bottom:12px; border-bottom:var(--rule); padding-bottom:10px; }
    .dash-date b { font-size:20px; font-weight:800; letter-spacing:-.01em; color:var(--slate-900); }
    .dash-date span { font-size:11px; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:var(--slate-500); white-space:nowrap; }

    /* ── KPI GRID ── */
    .kpi-grid { display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:16px; }
    .kpi-card { background:var(--panel); border-radius:var(--radius); padding:14px 16px 16px; border:var(--rule); }
    .kpi-top { display:flex; align-items:center; justify-content:space-between; margin-bottom:10px; }
    .kpi-icon { width:36px; height:36px; background:var(--mint-100); color:var(--teal-700); border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:15px; }
    .kpi-num { font-size:32px; font-weight:800; color:var(--slate-900); line-height:1; letter-spacing:-.02em; }
    .kpi-label { font-size:12px; font-weight:600; color:var(--slate-500); margin-top:6px; }
    .kpi-sub { font-size:11px; font-weight:600; color:var(--red); margin-top:4px; min-height:14px; }

    /* ── STAMPS (status badges) ── */
    .badge { display:inline-flex; align-items:center; gap:4px; padding:2px 8px; border-radius:6px; font-size:11px; font-weight:700; letter-spacing:.04em; text-transform:uppercase; border:1px solid transparent; line-height:1.4; white-space:nowrap; }
    .badge-green  { background:var(--green-50);  color:var(--green);  border-color:var(--green-200); }
    .badge-red    { background:var(--red-50);    color:var(--red);    border-color:var(--red-200); }
    .badge-yellow { background:var(--amber-50);  color:var(--amber);  border-color:var(--amber-200); }
    .badge-blue   { background:var(--blue-50);   color:var(--blue);   border-color:var(--blue-200); }
    .badge-gray   { background:var(--slate-50);  color:var(--slate-600); border-color:var(--slate-200); }
    .badge-orange { background:var(--rattan-50); color:var(--pine);   border-color:var(--rattan-200); }
    .badge-gold   { background:var(--gold-50);   color:var(--gold);   border-color:var(--gold-200); }

    /* ── BUTTONS ── */
    .btn { display:inline-flex; align-items:center; justify-content:center; gap:7px; border:1px solid transparent; cursor:pointer; font-weight:700; font-size:13px; border-radius:var(--radius-sm); padding:10px 16px; min-height:40px; transition:background .15s, border-color .15s, color .15s, transform .1s; white-space:nowrap; line-height:1.2; }
    .btn:active { transform:scale(.98); }
    .btn:disabled { opacity:.5; cursor:not-allowed; transform:none; }
    .btn-primary { background:var(--teal-600); color:white; }
    .btn-primary:hover { background:var(--teal-700); }
    .btn-secondary { background:var(--panel); color:var(--slate-700); border-color:var(--slate-200); }
    .btn-secondary:hover { background:var(--slate-50); border-color:var(--slate-300); }
    .btn-secondary:active { background:var(--slate-100); }
    .btn-danger { background:var(--panel); color:var(--red); border-color:var(--red-200); }
    .btn-danger:hover { background:var(--red-50); }
    .btn-gold { background:var(--slate-700); color:white; }
    .btn-gold:hover { background:var(--slate-800); }
    .btn-sm { padding:7px 12px; min-height:34px; font-size:12px; border-radius:7px; }
    .btn-icon { width:36px; height:36px; min-height:36px; padding:0; border-radius:8px; justify-content:center; }

    /* ── INPUTS ── */
    .input-field { width:100%; border:var(--rule); border-radius:var(--radius-sm); padding:11px 14px; min-height:46px; font-size:16px; color:var(--slate-900); background:var(--panel); outline:none; transition:border-color .15s, box-shadow .15s; -webkit-appearance:none; appearance:none; }
    .input-field:focus { border-color:var(--teal-500); box-shadow:0 0 0 3px var(--mint-100); }
    .input-field::placeholder { color:var(--slate-400); }
    .select-field { width:100%; border:var(--rule); border-radius:var(--radius-sm); padding:11px 38px 11px 14px; min-height:46px; font-size:16px; color:var(--slate-900); background:var(--panel) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%235f7079' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E") no-repeat right 12px center; outline:none; cursor:pointer; -webkit-appearance:none; appearance:none; }
    .select-field:focus { border-color:var(--teal-500); box-shadow:0 0 0 3px var(--mint-100); }
    .label { font-size:11px; font-weight:700; color:var(--slate-600); text-transform:uppercase; letter-spacing:.1em; margin-bottom:6px; display:block; }
    .form-row { margin-bottom:14px; }
    .form-grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
    .form-grid-3 { display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px; }

    /* ── TABS (the pad's index tabs) ── */
    .tab-row { display:flex; gap:0; margin-bottom:16px; flex-wrap:wrap; border-bottom:var(--rule); }
    .tab-btn { padding:10px 14px 11px; min-height:44px; border-radius:0; font-weight:700; font-size:13px; letter-spacing:.02em; cursor:pointer; border:none; background:transparent; color:var(--slate-500); position:relative; transition:color .15s; margin-bottom:-1px; display:inline-flex; align-items:center; gap:6px; }
    .tab-btn::after { content:''; position:absolute; left:8px; right:8px; bottom:0; height:3px; border-radius:3px 3px 0 0; background:transparent; transition:background .15s; }
    .tab-btn.active { color:var(--slate-900); }
    .tab-btn.active::after { background:var(--teal-500); }
    .tab-btn:not(.active) { background:transparent; color:var(--slate-500); border:none; }
    .tab-btn:not(.active):hover { color:var(--slate-800); }

    /* ── SECTION HEADER ── */
    .section-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:16px; flex-wrap:wrap; gap:10px; }
    .section-header h2 { font-size:20px; font-weight:800; letter-spacing:-.01em; color:var(--slate-900); }

    /* ── INVENTORY ── */
    .inv-slicer { display:inline-flex; align-items:center; gap:6px; padding:8px 13px; min-height:36px; border-radius:18px; border:var(--rule); background:var(--panel); color:var(--slate-600); font-size:12px; font-weight:700; cursor:pointer; transition:background .15s, color .15s, border-color .15s; white-space:nowrap; }
    .inv-slicer:active { transform:scale(.97); }
    .inv-slicer.active { background:var(--slate-700); color:white; border-color:var(--slate-700); }
    #inventory-list { display:grid; grid-template-columns:repeat(2,1fr); gap:8px; }
    @media(min-width:480px){ #inventory-list { grid-template-columns:repeat(3,1fr); } }
    @media(min-width:760px){ #inventory-list { grid-template-columns:repeat(4,1fr); gap:10px; } }
    @media(min-width:1180px){ #inventory-list { grid-template-columns:repeat(5,1fr); gap:12px; } }
    .inv-card { background:var(--panel); border-radius:var(--radius); padding:12px 10px 10px; border:var(--rule); display:flex; flex-direction:column; gap:8px; position:relative; transition:background .2s,border-color .2s; }
    .inv-card.inv-ordered { background:var(--green-50); border-color:var(--green-200); }
    .supplier-card { background:var(--panel); border-radius:var(--radius); padding:12px 12px; border:var(--rule); cursor:pointer; transition:border-color .15s, background .15s; position:relative; }
    .supplier-card:active { transform:scale(.98); }
    .supplier-card-active { border-color:var(--teal-500); background:var(--mint-50); box-shadow:0 0 0 2px var(--mint-100); }
    .log-sup-filter { background:var(--panel); border:var(--rule); color:var(--slate-600); padding:6px 12px; min-height:32px; border-radius:16px; font-size:12px; font-weight:700; cursor:pointer; transition:background .15s, color .15s; }
    .log-sup-filter.active { background:var(--slate-700); border-color:var(--slate-700); color:white; }
    .inv-card.inv-ordered .inv-stat { background:var(--panel); }
    .inv-card.inv-ordered .inv-order-btn { background:var(--green); }
    .inv-cat-icon { font-size:14px; color:var(--teal-700); width:28px; height:28px; border-radius:8px; background:var(--mint-100); display:inline-flex; align-items:center; justify-content:center; }
    .inv-name { font-weight:700; font-size:13px; color:var(--slate-900); line-height:1.25; word-break:break-word; }
    .inv-stats { display:grid; grid-template-columns:1fr 1fr 1fr; gap:3px; }
    .inv-stat { background:var(--slate-50); border-radius:6px; padding:5px 2px; text-align:center; }
    .inv-stat-val { font-size:14px; font-weight:800; color:var(--slate-900); }
    .inv-stat-label { font-size:9px; font-weight:700; color:var(--slate-500); margin-top:1px; text-transform:uppercase; letter-spacing:.06em; }
    .inv-actions { display:flex; gap:4px; }
    .inv-actions .btn-icon { flex:1; }
    .inv-order-btn { width:36px; height:36px; display:flex; align-items:center; justify-content:center; background:var(--teal-600); color:white; border:none; border-radius:8px; font-size:14px; cursor:pointer; transition:background .15s; flex-shrink:0; }
    .inv-order-btn:hover { background:var(--teal-700); }
    .inv-card-del { position:absolute; top:6px; right:6px; background:none; border:none; color:var(--slate-300); font-size:11px; cursor:pointer; padding:4px 5px; line-height:1; transition:color .15s; }
    .inv-card-del:hover { color:var(--red); }

    /* ── ORDER STANDBY ── */
    .order-standby { border:var(--rule); border-color:var(--amber-200); background:var(--amber-50); border-radius:var(--radius); padding:12px 14px; margin-bottom:8px; }
    .order-confirmed { border:var(--rule); border-color:var(--green-200); background:var(--green-50); border-radius:var(--radius); padding:12px 14px; margin-bottom:8px; }

    /* ── CALENDAR ── */
    .cal-nav { display:flex; align-items:center; justify-content:space-between; margin-bottom:12px; }
    .cal-week-label { font-weight:700; font-size:14px; color:var(--slate-800); letter-spacing:.02em; }
    .cal-grid { display:grid; grid-template-columns:repeat(7,1fr); gap:4px; margin-bottom:14px; }
    .cal-day { border-radius:10px; padding:8px 2px; text-align:center; cursor:pointer; border:1px solid transparent; transition:background .15s, border-color .15s; min-height:62px; }
    .cal-day:active { background:var(--slate-100); }
    .cal-day.today { border-color:var(--teal-500); background:var(--panel); }
    .cal-day.selected { background:var(--slate-700); color:white; border-color:var(--slate-700); }
    .cal-day-name { font-size:10px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; color:var(--slate-500); margin-bottom:3px; }
    .cal-day.selected .cal-day-name { color:var(--slate-300); }
    .cal-day-num { font-size:17px; font-weight:800; color:var(--slate-900); }
    .cal-day.today .cal-day-num { color:var(--teal-700); }
    .cal-day.selected .cal-day-num { color:white; }
    .cal-dots { display:flex; gap:2px; justify-content:center; margin-top:4px; flex-wrap:wrap; }
    .cal-dots span { width:5px; height:5px; border-radius:50%; display:inline-block; }
    .cal-count { font-size:10px; font-weight:600; color:var(--slate-500); margin-top:1px; }
    .cal-day.selected .cal-count { color:var(--slate-300); }

    /* ── RESERVATION ITEMS ── */
    .res-item { border:var(--rule); background:var(--panel); border-radius:var(--radius); padding:12px 14px; margin-bottom:8px; cursor:pointer; transition:border-color .15s; }
    .res-item:active { border-color:var(--slate-300); }
    .res-item.confirmed { border-color:var(--green-200); background:var(--green-50); }
    .res-item.no-show { border-color:var(--red-200); background:var(--red-50); }
    .res-item-top { display:flex; align-items:center; justify-content:space-between; }
    .res-time { font-weight:800; font-size:15px; color:var(--slate-800); margin-right:8px; }
    .res-name { font-weight:600; font-size:15px; color:var(--slate-900); }
    .res-meta { font-size:12px; color:var(--slate-500); margin-top:4px; display:flex; gap:12px; flex-wrap:wrap; }

    /* ── ALL-RES LIST ── */
    .res-list-item { display:flex; align-items:center; gap:12px; padding:13px 14px; border-bottom:1px solid var(--slate-100); cursor:pointer; background:var(--panel); transition:background .15s; }
    .res-list-item:active { background:var(--slate-50); }
    .res-date-box { width:46px; height:46px; background:var(--slate-50); border:1px solid var(--slate-100); border-radius:10px; display:flex; flex-direction:column; align-items:center; justify-content:center; flex-shrink:0; }
    .res-date-box .rdb-d { font-size:12px; font-weight:800; color:var(--slate-800); }
    .res-date-box .rdb-t { font-size:10px; font-weight:600; color:var(--slate-500); }

    /* ── TABLE MULTI-SELECT ── */
    .table-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:8px; }
    .table-chip { padding:10px 4px; min-height:44px; border-radius:9px; text-align:center; cursor:pointer; border:var(--rule); background:var(--panel); font-size:13px; font-weight:700; color:var(--slate-700); transition:background .15s, color .15s, border-color .15s; -webkit-user-select:none; user-select:none; }
    .table-chip:active { transform:scale(.96); }
    .table-chip.selected { background:var(--slate-700); color:white; border-color:var(--slate-700); }
    .table-chip.occupied { background:var(--red-50); color:var(--red); border-color:var(--red-200); cursor:not-allowed; }

    /* ── TASK ITEMS ── */
    .task-item { background:var(--panel); border-radius:var(--radius); padding:14px 16px; margin-bottom:8px; border:var(--rule); }
    .task-item.done { opacity:.6; }
    .task-top { display:flex; align-items:flex-start; gap:12px; }
    .task-icon { font-size:14px; flex-shrink:0; width:36px; height:36px; border-radius:10px; background:var(--slate-50); color:var(--slate-700); display:flex; align-items:center; justify-content:center; border:1px solid var(--slate-100); }
    .task-body { flex:1; min-width:0; }
    .task-title { font-weight:700; font-size:15px; color:var(--slate-900); margin-bottom:5px; }
    .task-title.done-text { text-decoration:line-through; }
    .task-badges { display:flex; gap:5px; flex-wrap:wrap; margin-bottom:6px; }
    .task-desc { font-size:13px; color:var(--slate-600); margin-bottom:6px; }
    .task-meta { font-size:12px; font-weight:600; color:var(--slate-500); display:flex; gap:12px; flex-wrap:wrap; }
    .task-actions { display:flex; gap:7px; margin-top:12px; flex-wrap:wrap; }
    .task-count-row { display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; margin-bottom:16px; }
    .task-count-card { background:var(--panel); border-radius:var(--radius); padding:12px; border:var(--rule); display:flex; align-items:center; gap:10px; }
    .tc-icon { width:34px; height:34px; border-radius:9px; display:flex; align-items:center; justify-content:center; font-size:14px; }
    .tc-num { font-size:22px; font-weight:800; color:var(--slate-900); line-height:1; }
    .tc-label { font-size:11px; font-weight:600; color:var(--slate-500); margin-top:2px; }

    /* ── SHIFTS TIMELINE ── */
    .gantt-wrap { background:var(--panel); border-radius:var(--radius); border:var(--rule); overflow:hidden; margin-bottom:10px; }
    .gantt-day-header { display:flex; align-items:center; justify-content:space-between; padding:12px 14px 10px; border-bottom:1px solid var(--slate-100); }
    .gantt-day-name { font-weight:800; font-size:14px; color:var(--slate-900); }
    .gantt-day-date { font-size:11px; font-weight:600; color:var(--slate-500); margin-top:1px; }
    .gantt-timeline { position:relative; padding:0 14px 12px; }
    .gantt-hours { display:flex; align-items:flex-end; margin-bottom:6px; padding-bottom:4px; border-bottom:1px solid var(--slate-200); }
    .gantt-hours-spacer { width:64px; flex-shrink:0; }
    .gantt-hours-track { flex:1; position:relative; height:14px; }
    .gantt-hour-label { position:absolute; font-size:9px; font-weight:700; color:var(--slate-400); white-space:nowrap; transform:translateX(-50%); }
    .gantt-rows { position:relative; }
    .gantt-grid-lines { position:absolute; top:0; left:0; right:0; bottom:0; pointer-events:none; }
    .gantt-grid-line { position:absolute; top:0; bottom:0; width:1px; background:var(--slate-100); }
    .gantt-row { position:relative; height:30px; margin-bottom:4px; display:flex; align-items:center; }
    .gantt-emp-label { width:64px; flex-shrink:0; font-size:11px; font-weight:700; color:var(--slate-700); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; padding-right:6px; letter-spacing:.02em; }
    .gantt-track { flex:1; position:relative; height:24px; border-radius:4px; background:var(--slate-50); overflow:visible; }
    .gantt-bar { position:absolute; top:0; height:100%; border-radius:5px; display:flex; align-items:center; padding:0 7px; font-size:10px; font-weight:700; letter-spacing:.02em; color:white; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; cursor:pointer; transition:filter .15s; min-width:4px; }
    .gantt-bar:active { filter:brightness(1.1); }
    .gantt-empty { font-size:12px; color:var(--slate-400); padding:6px 0 4px; }
    .gantt-now-line { position:absolute; top:0; bottom:0; width:2px; background:var(--red); z-index:10; pointer-events:none; }
    .gantt-now-dot { position:absolute; top:-4px; left:-4px; width:10px; height:10px; border-radius:50%; background:var(--red); }
    .shift-empty { font-size:13px; color:var(--slate-400); }

    /* ── BLACK BOX ── */
    .bb-item { display:flex; align-items:center; gap:12px; padding:10px 12px; min-height:56px; background:var(--panel); border-radius:10px; margin-bottom:6px; border:var(--rule); cursor:pointer; transition:background .15s, border-color .15s; }
    .bb-item:active { background:var(--slate-50); }
    .bb-item.selected { background:var(--slate-700); color:white; border-color:var(--slate-700); }
    .bb-item.selected .bb-price { color:var(--mint-300); }
    .bb-item.selected .bb-name { color:white; }
    .bb-item.selected .bb-cat { color:var(--slate-300); }
    .bb-name { font-weight:700; font-size:14px; color:var(--slate-900); flex:1; }
    .bb-cat { font-size:11px; font-weight:600; color:var(--slate-500); text-transform:uppercase; letter-spacing:.06em; }
    .bb-price { font-weight:800; font-size:16px; color:var(--teal-700); margin-left:auto; white-space:nowrap; }
    .bb-qty-ctrl { display:flex; align-items:center; gap:6px; }
    .bb-qty-btn { width:36px; height:36px; border-radius:8px; border:var(--rule); font-size:18px; font-weight:700; cursor:pointer; display:flex; align-items:center; justify-content:center; background:var(--panel); transition:background .15s; }
    .bb-qty-minus { color:var(--red); }
    .bb-qty-minus:active { background:var(--red-50); }
    .bb-qty-plus { color:var(--teal-700); border-color:var(--mint-200); background:var(--mint-50); }
    .bb-qty-plus:active { background:var(--mint-100); }
    .bb-qty-val { font-size:16px; font-weight:800; color:var(--slate-900); min-width:26px; text-align:center; }
    .bb-qty-input { width:44px; min-height:36px; border:var(--rule); border-radius:6px; padding:2px 4px; background:var(--panel); text-align:center; font-weight:700; -moz-appearance:textfield; }
    .bb-qty-input::-webkit-inner-spin-button, .bb-qty-input::-webkit-outer-spin-button { -webkit-appearance:none; margin:0; }
    .bb-daily-record { background:var(--panel); border-radius:var(--radius); padding:16px; margin-bottom:8px; border:var(--rule); }
    .bb-daily-record-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:10px; }
    .bb-total-box { background:var(--slate-700); border-radius:var(--radius); padding:20px 18px; text-align:center; color:white; margin-bottom:14px; }
    .bb-total-label { font-size:11px; font-weight:700; letter-spacing:.16em; text-transform:uppercase; color:var(--mint-300); margin-bottom:6px; }
    .bb-total-num { font-size:40px; font-weight:800; letter-spacing:-.02em; line-height:1; }
    .bb-summary-grid { display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; margin-bottom:14px; }
    .bb-summary-card { background:var(--panel); border-radius:var(--radius); padding:14px 10px; border:var(--rule); text-align:center; }
    .bb-summary-num { font-size:22px; font-weight:800; color:var(--slate-900); }
    .bb-summary-label { font-size:11px; font-weight:600; color:var(--slate-500); margin-top:3px; text-transform:uppercase; letter-spacing:.06em; }

    /* ── SETTINGS ── */
    .settings-card { background:var(--panel); border-radius:var(--radius); padding:18px; margin-bottom:12px; border:var(--rule); }
    .settings-card h3 { font-size:12px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:var(--slate-700); margin-bottom:14px; display:flex; align-items:center; gap:8px; }
    .settings-card h3 i { color:var(--teal-600); }
    .emp-row { display:flex; align-items:center; justify-content:space-between; padding:10px 12px; min-height:48px; background:var(--panel); border:var(--rule); border-radius:10px; margin-bottom:6px; }
    .emp-avatar { width:32px; height:32px; border-radius:50%; background:var(--slate-100); display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:800; color:var(--slate-700); }

    /* ── TABLE NUMBER CONFIG ── */
    .table-num-grid { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:10px; }
    .table-num-chip { position:relative; width:52px; height:52px; border-radius:10px; background:var(--panel); border:var(--rule); display:flex; align-items:center; justify-content:center; font-size:14px; font-weight:700; color:var(--slate-700); }
    .table-num-chip .del-chip { position:absolute; top:-6px; right:-6px; width:18px; height:18px; background:var(--red); color:white; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:9px; cursor:pointer; border:2px solid var(--panel); }

    /* ── MODAL (sheet) ── */
    .modal-overlay { position:fixed; inset:0; background:rgba(34,54,63,.5); z-index:500; display:flex; align-items:flex-end; justify-content:center; opacity:0; pointer-events:none; transition:opacity .2s; }
    .modal-overlay.open { opacity:1; pointer-events:all; }
    .modal { background:var(--panel); border-radius:18px 18px 0 0; padding:20px 20px; width:100%; max-width:600px; max-height:92vh; overflow-y:auto; transform:translateY(24px); transition:transform .22s cubic-bezier(.2,0,0,1); padding-bottom:max(22px,env(safe-area-inset-bottom,22px)); box-shadow:var(--shadow-overlay); }
    .modal-overlay.open .modal { transform:translateY(0); }
    .modal-handle { width:36px; height:4px; background:var(--slate-200); border-radius:2px; margin:0 auto 18px; }
    .modal h2 { font-size:18px; font-weight:800; color:var(--slate-900); margin-bottom:18px; display:flex; align-items:center; gap:8px; letter-spacing:-.01em; }
    .modal h2 i { color:var(--teal-600); font-size:16px; }
    .modal-center { align-items:center; justify-content:center; }
    .modal-center .modal { border-radius:16px; max-width:380px; }
    .detail-grid { display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:16px; }
    .detail-cell { background:var(--slate-50); border:1px solid var(--slate-100); border-radius:10px; padding:11px 12px; }
    .detail-cell-label { font-size:10px; color:var(--slate-500); font-weight:700; letter-spacing:.1em; text-transform:uppercase; margin-bottom:3px; }
    .detail-cell-val { font-size:14px; font-weight:700; color:var(--slate-900); }
    .detail-cell.full { grid-column:1/-1; }
    .action-row { display:flex; gap:8px; flex-wrap:wrap; }

    /* ── PIN PAD ── */
    .pin-display { display:flex; gap:12px; justify-content:center; margin-bottom:22px; }
    .pin-dot { width:14px; height:14px; border-radius:50%; background:var(--panel); border:2px solid var(--slate-300); transition:background .15s, border-color .15s; }
    .pin-dot.filled { background:var(--slate-700); border-color:var(--slate-700); }
    .pin-pad { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; }
    .pin-key { height:56px; border-radius:12px; border:var(--rule); background:var(--panel); color:var(--slate-900); font-size:22px; font-weight:700; cursor:pointer; transition:background .12s; display:flex; align-items:center; justify-content:center; }
    .pin-key:active { background:var(--slate-100); }
    .pin-key.del { font-size:16px; background:var(--panel); color:var(--red); border-color:var(--red-200); }
    .pin-error { color:var(--red); font-size:13px; font-weight:600; text-align:center; margin-top:10px; min-height:20px; }

    /* ── SEARCH BAR ── */
    .search-bar { background:var(--panel); border-radius:var(--radius-sm); padding:0 14px; min-height:46px; display:flex; align-items:center; gap:10px; border:var(--rule); margin-bottom:12px; transition:border-color .15s, box-shadow .15s; }
    .search-bar:focus-within { border-color:var(--teal-500); box-shadow:0 0 0 3px var(--mint-100); }
    .search-bar i { color:var(--slate-400); font-size:14px; }
    .search-bar input { flex:1; border:none; outline:none; font-size:16px; color:var(--slate-900); background:transparent; min-height:44px; }
    .search-bar input::placeholder { color:var(--slate-400); }

    /* ── TOAST ── */
    #toast { position:fixed; bottom:80px; left:50%; transform:translateX(-50%) translateY(8px); background:var(--slate-900); color:white; padding:11px 20px; border-radius:10px; font-size:14px; font-weight:600; z-index:9999; white-space:nowrap; box-shadow:var(--shadow-overlay); opacity:0; pointer-events:none; transition:opacity .2s,transform .2s; max-width:calc(100vw - 32px); overflow:hidden; text-overflow:ellipsis; }
    #toast.show { opacity:1; transform:translateX(-50%) translateY(0); }

    /* ── MISC ── */
    .alert-item { display:flex; align-items:center; gap:10px; padding:10px 12px; background:var(--red-50); border:1px solid var(--red-200); border-radius:10px; margin-bottom:6px; }
    .today-res-item { display:flex; align-items:center; gap:12px; padding:12px 4px; min-height:52px; background:transparent; border-bottom:1px solid var(--slate-100); border-radius:0; margin-bottom:0; cursor:pointer; }
    .today-res-item:last-child { border-bottom:none; }
    .dash-panel { background:var(--panel); border-radius:var(--radius); padding:16px 16px 8px; margin-bottom:12px; border:var(--rule); }
    .dash-panel h3 { font-size:12px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:var(--slate-700); margin-bottom:6px; display:flex; align-items:center; gap:8px; }
    .dash-panel h3 i { color:var(--teal-600); }
    .sb-status { display:flex; align-items:center; gap:8px; padding:10px 12px; border-radius:var(--radius-sm); margin-top:12px; font-size:12px; font-weight:600; color:var(--slate-500); }
    .pulse-dot { width:8px; height:8px; border-radius:50%; display:inline-block; flex-shrink:0; }
    .pulse-dot.green { background:var(--green); }
    .pulse-dot.red { background:var(--red); animation:pulse 1.5s infinite; }
    .pulse-dot.yellow { background:var(--amber); }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.35} }
    .log-item { display:flex; align-items:center; gap:10px; padding:10px 12px; background:var(--panel); border:var(--rule); border-radius:10px; margin-bottom:6px; }
    .log-icon { width:32px; height:32px; background:var(--slate-50); border:1px solid var(--slate-100); border-radius:8px; display:flex; align-items:center; justify-content:center; flex-shrink:0; color:var(--slate-700); }
    .order-item { background:var(--panel); border-radius:var(--radius); padding:12px 14px; margin-bottom:8px; border:var(--rule); }
    .order-row { display:flex; align-items:center; gap:10px; padding:10px 12px; border:var(--rule); border-radius:10px; margin-bottom:8px; background:var(--panel); }
    .empty-state { text-align:center; padding:32px 20px; color:var(--slate-500); background-image:repeating-linear-gradient(to bottom, transparent 0 27px, var(--slate-100) 27px 28px); border-radius:8px; }
    .empty-state i { font-size:26px; margin-bottom:10px; display:block; color:var(--slate-300); background:var(--panel); width:56px; height:44px; line-height:44px; margin-left:auto; margin-right:auto; border-radius:8px; }
    .empty-state p { font-size:14px; font-weight:600; background:var(--panel); display:inline-block; padding:0 8px; text-wrap:balance; max-width:32ch; }
    .locked-overlay { display:flex; flex-direction:column; align-items:center; justify-content:center; padding:48px 20px; color:var(--slate-500); text-align:center; }
    .locked-overlay i { font-size:40px; margin-bottom:14px; color:var(--slate-700); }
    .locked-overlay h3 { font-size:18px; font-weight:800; color:var(--slate-900); margin-bottom:8px; }
    .locked-overlay p { font-size:14px; margin-bottom:20px; }
    .divider { height:1px; background:var(--slate-200); margin:14px 0; }

    /* ── ROUND ONE ── */
    @media (max-width:640px) {
      #topbar-role-info .role-chip { display:none; }
      #topbar-title { font-size:12px; letter-spacing:.12em; min-width:0; }
    }
    @media (max-width:1023px) {
      .tab-row { flex-wrap:nowrap; overflow-x:auto; scrollbar-width:none; margin-left:-16px; margin-right:-16px; padding:0 16px; }
      .tab-row::-webkit-scrollbar { display:none; }
      .tab-btn { flex-shrink:0; }
    }
    .empty-state { background-image:repeating-linear-gradient(to bottom, transparent 0 27px, var(--slate-100) 27px 28px); }
    .empty-state i { width:64px; }

    /* ── DESKTOP: the beam becomes a sidebar ── */
    @media (min-width:1024px) {
      #drawer { transform:none; box-shadow:none; }
      #drawer-overlay { display:none; }
      #hamburger-btn { display:none; }
      #topbar { left:var(--beam-w); padding-left:24px; }
      #content-wrap { left:var(--beam-w); bottom:0; padding:24px 32px 32px; }
      #content-wrap > .page-section { max-width:1200px; margin:0 auto; }
      #bottom-nav { display:none; }
      #toast { bottom:32px; left:calc(50% + var(--beam-w) / 2); }
      .modal-overlay { align-items:center; }
      .modal { border-radius:16px; max-height:88vh; }
      .kpi-grid { grid-template-columns:repeat(4,1fr); gap:12px; }
      #section-dashboard.active { display:grid; grid-template-columns:1fr 1fr; gap:16px; align-items:start; }
      #section-dashboard > .dash-date { grid-column:1 / -1; margin-bottom:0; }
      #section-dashboard > .kpi-grid { grid-column:1; grid-row:2; grid-template-columns:1fr 1fr; margin-bottom:0; }
      #section-dashboard > .dash-panel { margin-bottom:0; }
      #dash-res-panel { grid-column:2; grid-row:2; }
      #dash-tasks-card, #dash-orders-panel { grid-column:1 / -1; }
      .task-count-row, .fin-summary-grid, .bb-summary-grid { gap:12px; }
    }
    @media (max-width:1023px) {
      .modal { padding-bottom:max(24px,env(safe-area-inset-bottom,24px)); }
    }
  </style>
</head>
<body>

<!-- LOGIN SCREEN -->
<div id="login-screen">
  <div class="login-box">
    <div class="login-logo">
      <img class="login-logo-img" src="/brand/logo-transparent.png" alt="Bar da Praia, Arrifana" width="476" height="250" />
      <p>Team app</p>
    </div>
    <div class="login-field">
      <label>Username</label>
      <input type="text" id="login-username" placeholder="Enter username" autocomplete="username" autocapitalize="none" />
    </div>
    <div class="login-field">
      <label>Password</label>
      <input type="password" id="login-password" placeholder="Enter password" autocomplete="current-password" />
    </div>
    <div id="login-error"></div>
    <div id="login-sync-status" style="text-align:center;font-size:0.85rem;color:var(--ocean-300);margin-bottom:8px;min-height:18px;"></div>
    <button class="btn-login" id="btn-do-login"><i class="fas fa-sign-in-alt"></i> Sign In</button>
  </div>
</div>

<!-- TOP BAR -->
<header id="topbar">
  <button id="hamburger-btn" aria-label="Menu"><i class="fas fa-bars"></i></button>
  <div id="topbar-title">Bar da Praia</div>
  <div id="topbar-right">
    <div id="topbar-role-info"></div>
    <select id="topbar-emp"><option value="">Staff</option></select>
    <button id="btn-app-logout" style="background:#fbeae7;color:#b4402f;border:none;border-radius:8px;padding:5px 10px;font-size:12px;font-weight:700;cursor:pointer;display:none"><i class="fas fa-sign-out-alt"></i> <span id="topbar-username"></span></button>
  </div>
</header>

<!-- DRAWER -->
<div id="drawer-overlay"></div>
<nav id="drawer">
  <div id="drawer-header">
    <div class="logo-row">
      <div class="logo-icon"><img src="/brand/mark.png" alt="" width="200" height="110" /></div>
      <div><div class="logo-name">Bar da Praia</div><div class="logo-sub">Team app</div></div>
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
    <button class="drawer-item" id="ditem-finance" data-nav="finance"><i class="fas fa-euro-sign"></i> Finance <span class="admin-only-badge" style="background:rgba(139,92,246,.3);color:#cfc2f0">FINANCE</span></button>
    <button class="drawer-item" id="ditem-users" data-nav="users" style="display:none"><i class="fas fa-users"></i> Users <span class="admin-only-badge">ADMIN</span></button>
    <button class="drawer-item" id="ditem-settings" data-nav="settings"><i class="fas fa-gear"></i> Settings <span class="admin-only-badge">ADMIN</span></button>
  </nav>
  <div id="drawer-footer">
    <div style="display:flex;align-items:center;gap:10px;flex:1;min-width:0">
      <div id="drawer-avatar" style="width:36px;height:36px;background:rgba(255,255,255,.25);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:800;color:white;flex-shrink:0">?</div>
      <div style="flex:1;min-width:0">
        <div id="drawer-user-name" style="color:white;font-weight:700;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">—</div>
        <div id="drawer-user-sub" style="color:rgba(255,255,255,.5);font-size:11px;margin-top:1px">Not signed in</div>
      </div>
      <button id="drawer-logout-btn" onclick="appLogout()" style="background:rgba(255,255,255,.15);border:none;color:white;border-radius:8px;padding:6px 9px;font-size:12px;cursor:pointer;flex-shrink:0" title="Sign out"><i class="fas fa-sign-out-alt"></i></button>
    </div>
    <button id="btn-enable-notif" style="margin-top:10px;width:100%;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.25);color:white;border-radius:9px;padding:8px 12px;font-size:12px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:7px">
      <i class="fas fa-bell"></i> <span id="notif-btn-label">Enable Notifications</span> <i id="notif-status-dot" class="fas fa-circle" style="font-size:7px;margin-left:auto;color:rgba(255,255,255,.4)"></i>
    </button>
  </div>
</nav>

<!-- MAIN CONTENT -->
<div id="content-wrap">

  <!-- ═══ DASHBOARD ═══ -->
  <section id="section-dashboard" class="page-section active">
    <div class="dash-date" id="dash-date"><b id="dash-date-day"></b><span id="dash-date-full"></span></div>
    <div class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-top"><div class="kpi-icon"><i class="fas fa-chair"></i></div><span class="badge badge-gray">Today</span></div>
        <div class="kpi-num" id="dash-res-count">0</div>
        <div class="kpi-label">Reservations Today</div>
        <div class="kpi-sub"></div>
      </div>
      <div class="kpi-card">
        <div class="kpi-top"><div class="kpi-icon"><i class="fas fa-list-check"></i></div><span class="badge badge-gray" id="dash-task-badge">Open</span></div>
        <div class="kpi-num" id="dash-task-count">0</div>
        <div class="kpi-label">Open Tasks</div>
        <div class="kpi-sub"></div>
      </div>
    </div>
    <div class="dash-panel" id="dash-orders-panel" style="display:none">
      <h3><i class="fas fa-truck" style="color:#b7791f"></i> Pending Orders <span class="badge badge-orange" id="dash-orders-badge"></span></h3>
      <div id="dash-pending-orders"></div>
    </div>
    <div class="dash-panel" id="dash-tasks-card">
      <h3><i class="fas fa-clipboard-list" style="color:var(--ocean-500)"></i> Open Tasks <span class="badge badge-yellow" id="dash-tasks-panel-badge" style="display:none"></span></h3>
      <div id="dash-tasks-panel"><div class="empty-state" style="padding:14px"><i class="fas fa-check-circle" style="color:#2b8a4b;font-size:22px"></i><p>All done!</p></div></div>
    </div>
    <div class="dash-panel" id="dash-res-panel">
      <h3><i class="fas fa-calendar-day" style="color:var(--ocean-500)"></i> Today's Reservations</h3>
      <div id="dash-today-res"><div class="empty-state" style="padding:14px"><i class="fas fa-calendar-xmark"></i><p>No reservations today. Add one from Reservations.</p></div></div>
    </div>
  </section>

  <!-- ═══ INVENTORY ═══ -->
  <section id="section-inventory" class="page-section">
    <div class="section-header">
      <div class="tab-row" style="margin-bottom:0">
        <button class="tab-btn active" id="inv-tab-stock" data-inv-tab="stock"><i class="fas fa-warehouse"></i> Stock</button>
        <button class="tab-btn" id="inv-tab-log" data-inv-tab="log"><i class="fas fa-clock-rotate-left"></i> Log</button>
        <button class="tab-btn" id="inv-tab-orders" data-inv-tab="orders"><i class="fas fa-truck"></i> Orders <span id="orders-standby-badge" style="display:none;background:#b7791f;color:white;font-size:10px;font-weight:800;padding:1px 6px;border-radius:10px;margin-left:2px"></span></button>
      </div>
      <div style="display:flex;gap:8px">
        <button class="btn btn-secondary btn-sm" id="btn-open-order"><i class="fas fa-cart-shopping"></i> Cart <span id="cart-badge" style="display:none;background:#b7791f;color:white;font-size:10px;font-weight:800;padding:1px 6px;border-radius:10px;margin-left:2px"></span></button>
        <button class="btn btn-primary btn-sm" id="btn-add-inventory"><i class="fas fa-plus"></i> Add</button>
      </div>
    </div>
    <div id="inv-panel-stock">
      <!-- Category filter chips -->
      <div id="inv-cat-slicers" style="display:flex;gap:7px;flex-wrap:wrap;margin-bottom:14px">
        <button class="inv-slicer active" data-inv-cat="">All</button>
        <button class="inv-slicer" data-inv-cat="beverages"><i class="fas fa-martini-glass-citrus"></i> Bar</button>
        <button class="inv-slicer" data-inv-cat="food"><i class="fas fa-utensils"></i> Cozinha</button>
        <button class="inv-slicer" data-inv-cat="supplies"><i class="fas fa-broom"></i> Limpeza</button>
        <button class="inv-slicer" data-inv-cat="equipment"><i class="fas fa-screwdriver-wrench"></i> Economato</button>
        <button class="inv-slicer" data-inv-cat="other"><i class="fas fa-box"></i> Other</button>
      </div>
      <!-- Supplier cards section -->
      <div id="inv-supplier-section" style="margin-bottom:16px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
          <div style="font-size:13px;font-weight:700;color:var(--ocean-700);display:flex;align-items:center;gap:6px"><i class="fas fa-truck" style="color:var(--ocean-400)"></i> Suppliers</div>
          <button class="btn btn-secondary btn-sm" id="btn-add-supplier"><i class="fas fa-plus"></i> Add Supplier</button>
        </div>
        <div id="supplier-cards" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px"></div>
      </div>
      <!-- Items panel (shown when a supplier is selected, or all items) -->
      <div id="inv-items-section">
        <div id="inv-items-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
          <div style="display:flex;align-items:center;gap:8px">
            <button class="btn btn-secondary btn-sm" id="btn-back-to-suppliers" style="display:none" data-supplier-filter=""><i class="fas fa-arrow-left"></i></button>
            <span style="font-size:13px;font-weight:700;color:var(--ocean-700)" id="inv-items-title">All Items</span>
          </div>
          <div class="search-bar" style="margin-bottom:0;flex:1;max-width:220px;margin-left:10px">
            <i class="fas fa-search"></i>
            <input type="text" placeholder="Search items..." id="inv-search" />
          </div>
        </div>
        <div id="inventory-list"><div class="empty-state"><i class="fas fa-box-open"></i><p>No items yet. Tap Add to start!</p></div></div>
      </div>
    </div>
    <div id="inv-panel-log" style="display:none">
      <div id="inv-log-supplier-filter" style="display:flex;gap:7px;flex-wrap:wrap;margin-bottom:12px">
        <button class="log-sup-filter active" data-log-supplier="">All Suppliers</button>
      </div>
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
        <button class="tab-btn active" data-task-filter="open">Open</button>
        <button class="tab-btn" data-task-filter="pending">Pending</button>
        <button class="tab-btn" data-task-filter="in-progress">Active</button>
        <button class="tab-btn" data-task-filter="done">Done</button>
        <button class="tab-btn" data-task-filter="all">All</button>
      </div>
      <button class="btn btn-primary btn-sm" id="btn-add-task"><i class="fas fa-plus"></i> New</button>
    </div>
    <div class="task-count-row">
      <div class="task-count-card"><div class="tc-icon" style="background:#fdf3e1">⏳</div><div><div class="tc-num" id="task-count-pending">0</div><div class="tc-label">Pending</div></div></div>
      <div class="task-count-card"><div class="tc-icon" style="background:#e6f0f9;color:#2f6fa8"><i class="fas fa-rotate"></i></div><div><div class="tc-num" id="task-count-progress">0</div><div class="tc-label">Active</div></div></div>
      <div class="task-count-card"><div class="tc-icon" style="background:#e3f4e8;color:#2b8a4b"><i class="fas fa-check"></i></div><div><div class="tc-num" id="task-count-done">0</div><div class="tc-label">Done</div></div></div>
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
        <button class="btn btn-secondary btn-sm" id="btn-repeat-week" style="display:none" title="Copy previous week shifts to this week"><i class="fas fa-copy"></i> Repeat</button>
      </div>
    </div>
    <!-- Shifts tabs -->
    <div class="tab-row" style="margin-bottom:12px" id="shifts-tab-row">
      <button class="tab-btn active" data-shifts-tab="gantt"><i class="fas fa-calendar-week"></i> Schedule</button>
      <button class="tab-btn" data-shifts-tab="tips"><i class="fas fa-hand-holding-dollar"></i> Tips</button>
      <button class="tab-btn" data-shifts-tab="hours"><i class="fas fa-clock"></i> Hours</button>
      <button class="tab-btn" data-shifts-tab="attendance"><i class="fas fa-user-check"></i> Attendance</button>
      <button class="tab-btn" id="shifts-tab-team-btn" data-shifts-tab="team" style="display:none"><i class="fas fa-users"></i> Team</button>
    </div>

    <!-- ── Tab: Schedule (Gantt) ── -->
    <div id="shifts-panel-gantt">
      <div style="display:flex;align-items:center;gap:8px;padding:8px 12px;background:white;border-radius:var(--radius);border:1px solid var(--ocean-100);margin-bottom:12px;font-size:11px;color:var(--ocean-400);flex-wrap:wrap">
        <i class="fas fa-circle-info" style="color:var(--ocean-300)"></i>
        Timeline: 07:00 – 24:00 &nbsp;·&nbsp;
        <span style="display:inline-flex;align-items:center;gap:4px"><span style="width:10px;height:10px;border-radius:3px;background:#5f7079;display:inline-block"></span> Dishes</span>
        <span style="display:inline-flex;align-items:center;gap:4px"><span style="width:10px;height:10px;border-radius:3px;background:#b07b59;display:inline-block"></span> Kitchen</span>
        <span style="display:inline-flex;align-items:center;gap:4px"><span style="width:10px;height:10px;border-radius:3px;background:#2a9683;display:inline-block"></span> Bar</span>
        <span style="display:inline-flex;align-items:center;gap:4px"><span style="width:10px;height:10px;border-radius:3px;background:#2f6fa8;display:inline-block"></span> Service</span>
        <span style="display:inline-flex;align-items:center;gap:4px"><span style="width:10px;height:10px;border-radius:3px;background:var(--slate-800);display:inline-block"></span> Day Off</span>
        <span style="display:inline-flex;align-items:center;gap:4px"><span style="width:10px;height:10px;border-radius:3px;background:var(--red);display:inline-block"></span> Absent</span>
      </div>
      <div id="shifts-list"></div>
    </div>

    <!-- ── Tab: Tips ── -->
    <div id="shifts-panel-tips" style="display:none">
      <div class="shifts-tips-card" style="background:white;border-radius:var(--radius);border:1px solid var(--ocean-100);padding:14px;margin-bottom:14px;box-shadow:var(--shadow)">
        <div style="font-weight:700;font-size:14px;color:var(--ocean-800);margin-bottom:10px;display:flex;align-items:center;gap:8px">
          <i class="fas fa-hand-holding-dollar" style="color:#b7791f"></i> Weekly Tips Distribution
        </div>
        <div id="tips-locked-notice" style="display:none;background:#fdf3e1;border:1px solid var(--amber-200);border-radius:8px;padding:10px 12px;margin-bottom:10px;font-size:13px;color:var(--amber-700);display:flex;align-items:center;gap:8px">
          <i class="fas fa-lock" style="color:#b7791f"></i> Tips already generated for this week — field is locked.
          <button id="btn-tips-unlock" class="btn btn-sm btn-secondary" style="margin-left:auto;font-size:11px"><i class="fas fa-unlock"></i> Edit</button>
        </div>
        <div id="tips-input-row" style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap">
          <div style="flex:1;min-width:120px">
            <label style="font-size:11px;font-weight:600;color:var(--ocean-600);text-transform:uppercase;letter-spacing:.5px;display:block;margin-bottom:4px">Total Tips (€)</label>
            <input type="text" id="shifts-tips-input" class="input-field" placeholder="0.00" inputmode="decimal" pattern="[0-9]*[.,]?[0-9]*" style="text-align:right;font-weight:700" />
          </div>
          <button class="btn btn-gold btn-sm" id="btn-generate-tips" style="height:42px;white-space:nowrap"><i class="fas fa-calculator"></i> Generate</button>
        </div>
        <div id="shifts-tips-result" style="margin-top:10px"></div>
      </div>
    </div>

    <!-- ── Tab: Hours & Days ── -->
    <div id="shifts-panel-hours" style="display:none">
      <div id="shifts-hours-content"></div>
    </div>

    <!-- ── Tab: Attendance ── -->
    <div id="shifts-panel-attendance" style="display:none">
      <div id="shifts-attendance-content"></div>
    </div>

    <!-- ── Tab: Team Members (shift_mgr + admin) ── -->
    <div id="shifts-panel-team" style="display:none">
      <div style="background:white;border-radius:var(--radius);border:1px solid var(--ocean-100);padding:18px;box-shadow:var(--shadow)">
        <h3 style="font-size:15px;font-weight:700;color:var(--ocean-800);margin-bottom:14px;display:flex;align-items:center;gap:7px"><i class="fas fa-users" style="color:var(--ocean-500)"></i> Team Members</h3>
        <div id="shifts-employee-list"></div>
        <div style="display:flex;gap:8px;margin-top:12px">
          <input type="text" id="shifts-new-employee-name" class="input-field" placeholder="Employee name..." style="font-size:14px" />
          <button class="btn btn-primary" id="btn-shifts-add-employee" style="flex-shrink:0"><i class="fas fa-plus"></i></button>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══ FINANCE ═══ -->
  <section id="section-finance" class="page-section">
    <div id="finance-locked" class="locked-overlay" style="display:none">
      <i class="fas fa-euro-sign" style="color:#6d4fc2"></i>
      <h3>Finance Access Required</h3>
      <p>Enter the Finance PIN to access daily records.</p>
      <button class="btn" style="background:#6d4fc2;color:white" id="fin-login-prompt-btn"><i class="fas fa-key"></i> Enter Finance PIN</button>
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
          <div style="margin-top:10px;display:flex;align-items:center;justify-content:center">
            <input type="date" id="fin-entry-date"
              style="background:rgba(255,255,255,.15);border:1.5px solid rgba(255,255,255,.35);border-radius:9px;color:white;font-size:14px;font-weight:600;padding:6px 12px;outline:none;cursor:pointer;text-align:center;-webkit-appearance:none;color-scheme:dark" />
          </div>
        </div>

        <!-- Missing days warning -->
        <div id="fin-missing-warning" style="display:none;background:var(--red-50);border:2px solid #b4402f;border-radius:var(--radius);padding:12px 14px;margin-bottom:12px">
          <div style="display:flex;align-items:flex-start;gap:10px">
            <i class="fas fa-triangle-exclamation" style="color:#b4402f;font-size:18px;margin-top:1px;flex-shrink:0"></i>
            <div>
              <div style="font-weight:800;font-size:13px;color:#b4402f;margin-bottom:4px">Missing previous entries</div>
              <div id="fin-missing-days-list" style="font-size:12px;color:var(--red-700);line-height:1.7"></div>
            </div>
          </div>
        </div>

        <!-- Invoiced FIRST -->
        <div class="fin-card">
          <h3><i class="fas fa-file-invoice-dollar" style="color:#2b8a4b"></i> Invoiced</h3>
          <div class="fin-input-row" style="margin-bottom:0">
            <label>Total Facturado</label>
            <input type="text" id="fin-invoiced" placeholder="0.00" inputmode="decimal" pattern="[0-9]*[.,]?[0-9]*" />
          </div>
        </div>

        <!-- Revenue -->
        <div class="fin-card">
          <h3><i class="fas fa-money-bill-wave" style="color:var(--ocean-500)"></i> Revenue</h3>
          <div class="fin-input-row">
            <label>T 51</label>
            <input type="text" id="fin-t51" placeholder="0.00" inputmode="decimal" pattern="[0-9]*[.,]?[0-9]*" />
          </div>
          <div class="fin-input-row">
            <label>MultiBanco</label>
            <input type="text" id="fin-multibanco" placeholder="0.00" inputmode="decimal" pattern="[0-9]*[.,]?[0-9]*" />
          </div>
          <div class="fin-derived">
            <span class="fin-derived-label"><i class="fas fa-calculator" style="color:var(--ocean-400)"></i> Total of Day (Invoiced + T51)</span>
            <span class="fin-derived-val" id="fin-total-day-calc">€0.00</span>
          </div>
        </div>

        <!-- Expenses -->
        <div class="fin-card">
          <h3><i class="fas fa-arrow-down" style="color:#b4402f"></i> Expenses</h3>
          <div class="fin-input-row">
            <label>Tips</label>
            <input type="text" id="fin-tips" placeholder="0.00" inputmode="decimal" pattern="[0-9]*[.,]?[0-9]*" />
          </div>
          <div class="fin-input-row">
            <label>Despesas</label>
            <input type="text" id="fin-gen-expenses" placeholder="0.00" inputmode="decimal" pattern="[0-9]*[.,]?[0-9]*" />
          </div>
          <div class="fin-derived">
            <span class="fin-derived-label"><i class="fas fa-calculator" style="color:var(--ocean-400)"></i> € Entregar (Day − MB − Gen.Exp)</span>
            <span class="fin-derived-val" id="fin-entregar-calc">€0.00</span>
          </div>
          <input type="hidden" id="fin-entregar" value="0" />
        </div>

        <!-- Cash Details -->
        <div class="fin-card">
          <h3><i class="fas fa-coins" style="color:#b7791f"></i> Cash Details</h3>
          <div class="fin-input-row">
            <label>Notes</label>
            <input type="text" id="fin-cash-notes" placeholder="0.00" inputmode="decimal" pattern="[0-9]*[.,]?[0-9]*" />
          </div>
          <div class="fin-input-row">
            <label>Coins</label>
            <input type="text" id="fin-coins" placeholder="0.00" inputmode="decimal" pattern="[0-9]*[.,]?[0-9]*" />
          </div>
          <div class="fin-derived" style="margin-top:6px">
            <span class="fin-derived-label"><i class="fas fa-sigma" style="color:var(--ocean-400)"></i> Total Cash (Notes + Coins)</span>
            <span class="fin-derived-val" id="fin-cash-total-calc">€0.00</span>
          </div>
          <!-- Balance indicator -->
          <div id="fin-cash-balance" style="margin-top:10px;padding:12px 14px;border-radius:10px;display:flex;align-items:center;gap:10px;font-weight:700;font-size:14px"></div>
        </div>

        <!-- Surf -->
        <div class="fin-card">
          <h3><i class="fas fa-umbrella-beach" style="color:#2a9683"></i> Surf</h3>
          <div class="fin-input-row" style="margin-bottom:0">
            <label>Surf</label>
            <input type="text" id="fin-surf" placeholder="0.00" inputmode="decimal" pattern="[0-9]*[.,]?[0-9]*" />
          </div>
        </div>

        <!-- Action buttons — shown when entry is NOT yet saved for this date -->
        <div id="fin-entry-actions">
          <button class="btn btn-primary" style="width:100%;justify-content:center;background:#6d4fc2;border-color:#6d4fc2;margin-bottom:8px" id="btn-save-finance-entry">
            <i class="fas fa-save"></i> Save Daily Entry
          </button>
          <button class="btn btn-secondary" style="width:100%;justify-content:center" id="btn-clear-finance-entry">
            <i class="fas fa-rotate-left"></i> Clear Form
          </button>
        </div>
        <!-- Locked banner — shown when entry is already saved for this date -->
        <div id="fin-entry-locked" style="display:none;background:#e3f4e8;border:2px solid #2b8a4b;border-radius:var(--radius);padding:14px 16px;display:none;align-items:center;gap:12px;flex-wrap:wrap">
          <i class="fas fa-circle-check" style="color:#2b8a4b;font-size:22px;flex-shrink:0"></i>
          <div style="flex:1;min-width:0">
            <div style="font-weight:800;font-size:14px;color:var(--green-700)">Entry Saved</div>
            <div style="font-size:12px;color:#2b8a4b;margin-top:2px">This day is locked. Finance users can edit.</div>
          </div>
          <button id="btn-fin-edit-entry" style="display:none;background:#b7791f;color:white;border:none;border-radius:var(--radius-sm);padding:8px 14px;font-weight:700;font-size:13px;cursor:pointer;display:none;align-items:center;gap:6px">
            <i class="fas fa-pen"></i> Edit
          </button>
        </div>
      </div>

      <!-- ── Records Panel ── -->
      <div id="fin-panel-records" style="display:none">

        <!-- Section 1: Total of Day -->
        <div style="background:white;border-radius:var(--radius);border:1px solid var(--ocean-100);padding:14px;margin-bottom:14px;box-shadow:var(--shadow)">
          <div style="font-weight:700;font-size:13px;color:var(--ocean-700);margin-bottom:10px;display:flex;align-items:center;gap:6px"><i class="fas fa-receipt" style="color:#6d4fc2"></i> Total of the Day</div>
          <div class="fin-chart" id="fin-chart-day" data-line="day"></div>
          <div class="fin-summary-grid">
            <div class="fin-summary-card" style="position:relative">
              <div class="fin-summary-num" id="fin-stat-day-month">€0</div>
              <div class="fin-summary-label">This Month</div>
              <div id="fin-stat-day-month-avg" style="font-size:11px;color:var(--ocean-400);margin-top:2px"></div>
              <div id="fin-stat-day-month-budget" style="font-size:11px;margin-top:4px"></div>
            </div>
            <div class="fin-summary-card">
              <div class="fin-summary-num" id="fin-stat-day-year">€0</div>
              <div class="fin-summary-label">Year to Date</div>
              <div id="fin-stat-day-year-avg" style="font-size:11px;color:var(--ocean-400);margin-top:2px"></div>
              <div id="fin-stat-day-year-budget" style="font-size:11px;margin-top:4px"></div>
            </div>
            <div class="fin-summary-card">
              <div class="fin-summary-num" id="fin-stat-day-range">€0</div>
              <div class="fin-summary-label">Custom Range</div>
              <div id="fin-stat-day-range-avg" style="font-size:11px;color:var(--ocean-400);margin-top:2px"></div>
              <div id="fin-stat-day-range-budget" style="font-size:11px;margin-top:4px"></div>
            </div>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px;align-items:center">
            <input type="date" id="fin-range-from" class="input-field" style="flex:1;min-width:120px;font-size:12px;padding:6px 8px" />
            <span style="font-size:12px;color:var(--ocean-400)">to</span>
            <input type="date" id="fin-range-to" class="input-field" style="flex:1;min-width:120px;font-size:12px;padding:6px 8px" />
            <button class="btn btn-secondary btn-sm" id="btn-fin-recalc"><i class="fas fa-calculator"></i> Calc</button>
          </div>
        </div>

        <!-- Section 2: T51 -->
        <div style="background:white;border-radius:var(--radius);border:1px solid var(--ocean-100);padding:14px;margin-bottom:14px;box-shadow:var(--shadow)">
          <div style="font-weight:700;font-size:13px;color:var(--ocean-700);margin-bottom:10px;display:flex;align-items:center;gap:6px"><i class="fas fa-cash-register" style="color:#2a9683"></i> T 51</div>
          <div class="fin-chart" id="fin-chart-t51" data-line="t51"></div>
          <div class="fin-summary-grid">
            <div class="fin-summary-card">
              <div class="fin-summary-num" id="fin-stat-t51-month">€0</div>
              <div class="fin-summary-label">This Month</div>
              <div id="fin-stat-t51-month-avg" style="font-size:11px;color:var(--ocean-400);margin-top:2px"></div>
              <div id="fin-stat-t51-month-budget" style="font-size:11px;margin-top:4px"></div>
            </div>
            <div class="fin-summary-card">
              <div class="fin-summary-num" id="fin-stat-t51-year">€0</div>
              <div class="fin-summary-label">Year to Date</div>
              <div id="fin-stat-t51-year-avg" style="font-size:11px;color:var(--ocean-400);margin-top:2px"></div>
              <div id="fin-stat-t51-year-budget" style="font-size:11px;margin-top:4px"></div>
            </div>
            <div class="fin-summary-card">
              <div class="fin-summary-num" id="fin-stat-t51-range">€0</div>
              <div class="fin-summary-label">Custom Range</div>
              <div id="fin-stat-t51-range-avg" style="font-size:11px;color:var(--ocean-400);margin-top:2px"></div>
            </div>
          </div>
        </div>

        <!-- Section 3: Surf -->
        <div style="background:white;border-radius:var(--radius);border:1px solid var(--ocean-100);padding:14px;margin-bottom:14px;box-shadow:var(--shadow)">
          <div style="font-weight:700;font-size:13px;color:var(--ocean-700);margin-bottom:10px;display:flex;align-items:center;gap:6px"><i class="fas fa-water" style="color:#2a9683"></i> Surf</div>
          <div class="fin-chart" id="fin-chart-surf" data-line="surf"></div>
          <div class="fin-summary-grid">
            <div class="fin-summary-card">
              <div class="fin-summary-num" id="fin-stat-surf-month">€0</div>
              <div class="fin-summary-label">This Month</div>
              <div id="fin-stat-surf-month-avg" style="font-size:11px;color:var(--ocean-400);margin-top:2px"></div>
              <div id="fin-stat-surf-month-budget" style="font-size:11px;margin-top:4px"></div>
            </div>
            <div class="fin-summary-card">
              <div class="fin-summary-num" id="fin-stat-surf-year">€0</div>
              <div class="fin-summary-label">Year to Date</div>
              <div id="fin-stat-surf-year-avg" style="font-size:11px;color:var(--ocean-400);margin-top:2px"></div>
              <div id="fin-stat-surf-year-budget" style="font-size:11px;margin-top:4px"></div>
            </div>
            <div class="fin-summary-card">
              <div class="fin-summary-num" id="fin-stat-surf-range">€0</div>
              <div class="fin-summary-label">Custom Range</div>
              <div id="fin-stat-surf-range-avg" style="font-size:11px;color:var(--ocean-400);margin-top:2px"></div>
            </div>
          </div>
        </div>

        <!-- Section 4: Cash Over / Under Log -->
        <div style="background:white;border-radius:var(--radius);border:1px solid var(--ocean-100);padding:14px;margin-bottom:14px;box-shadow:var(--shadow)">
          <div style="font-weight:700;font-size:13px;color:var(--ocean-700);margin-bottom:10px;display:flex;align-items:center;gap:6px"><i class="fas fa-scale-unbalanced" style="color:#b4402f"></i> Cash Over / Under Log</div>
          <div class="fin-summary-grid" style="margin-bottom:10px">
            <div class="fin-summary-card" style="border:1px solid var(--red-200)">
              <div class="fin-summary-num" id="fin-stat-short-month" style="color:#b4402f">€0</div>
              <div class="fin-summary-label">Short This Month</div>
              <div id="fin-stat-short-month-cnt" style="font-size:11px;color:var(--ocean-400);margin-top:2px"></div>
            </div>
            <div class="fin-summary-card" style="border:1px solid var(--red-200)">
              <div class="fin-summary-num" id="fin-stat-short-year" style="color:#b4402f">€0</div>
              <div class="fin-summary-label">Short This Year</div>
              <div id="fin-stat-short-year-cnt" style="font-size:11px;color:var(--ocean-400);margin-top:2px"></div>
            </div>
            <div class="fin-summary-card" style="border:1px solid #a9dcb9">
              <div class="fin-summary-num" id="fin-stat-over-month" style="color:#2b8a4b">€0</div>
              <div class="fin-summary-label">Over This Month</div>
              <div id="fin-stat-over-month-cnt" style="font-size:11px;color:var(--ocean-400);margin-top:2px"></div>
            </div>
            <div class="fin-summary-card" style="border:1px solid #a9dcb9">
              <div class="fin-summary-num" id="fin-stat-over-year" style="color:#2b8a4b">€0</div>
              <div class="fin-summary-label">Over This Year</div>
              <div id="fin-stat-over-year-cnt" style="font-size:11px;color:var(--ocean-400);margin-top:2px"></div>
            </div>
          </div>
          <div id="fin-diff-log-list"></div>
        </div>

        <!-- Day picker + records list -->
        <div style="background:white;border-radius:var(--radius);border:1px solid var(--ocean-100);padding:12px;margin-bottom:10px;display:flex;align-items:center;gap:10px">
          <i class="fas fa-calendar-day" style="color:var(--ocean-400)"></i>
          <label style="font-size:12px;font-weight:600;color:var(--ocean-600);white-space:nowrap">Jump to date:</label>
          <input type="date" id="fin-rec-day-picker" class="input-field" style="flex:1;font-size:12px;padding:6px 8px" />
          <button class="btn btn-secondary btn-sm" id="btn-fin-clear-day"><i class="fas fa-times"></i></button>
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
        <button class="tab-btn" id="bb-tab-items" data-bb-tab="items">Item Records</button>
        <button class="tab-btn" id="bb-tab-menu" data-bb-tab="menu">Menu Items</button>
      </div>
      <!-- Daily Entry -->
      <div id="bb-panel-daily">
        <div class="bb-total-box">
          <div class="bb-total-label">DAILY ENTRY</div>
          <div class="bb-total-num" id="bb-today-total">€0.00</div>
          <div style="display:flex;align-items:center;justify-content:center;gap:8px;margin-top:6px">
            <input type="date" id="bb-entry-date" class="input-field" style="font-size:12px;padding:4px 10px;width:auto;background:rgba(255,255,255,.15);color:white;border-color:rgba(255,255,255,.3);text-align:center" />
            <span id="bb-today-date" style="font-size:11px;opacity:.7"></span>
          </div>
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
        <!-- Date range filter -->
        <div style="display:flex;gap:8px;align-items:center;margin-bottom:10px;flex-wrap:wrap">
          <div style="display:flex;align-items:center;gap:6px;flex:1;min-width:120px">
            <label style="font-size:11px;color:var(--ocean-500);white-space:nowrap">From</label>
            <input type="date" id="bb-records-from" class="input-field" style="font-size:12px;padding:4px 8px;flex:1" />
          </div>
          <div style="display:flex;align-items:center;gap:6px;flex:1;min-width:120px">
            <label style="font-size:11px;color:var(--ocean-500);white-space:nowrap">To</label>
            <input type="date" id="bb-records-to" class="input-field" style="font-size:12px;padding:4px 8px;flex:1" />
          </div>
          <button class="btn btn-secondary btn-sm" id="btn-bb-records-clear-range" style="white-space:nowrap"><i class="fas fa-xmark"></i> Clear</button>
        </div>
        <!-- Summary cards -->
        <div class="bb-summary-grid" style="margin-bottom:12px">
          <div class="bb-summary-card">
            <div class="bb-summary-num" id="bb-today-sum">€0</div>
            <div class="bb-summary-label" id="bb-sum-label-today">Today</div>
          </div>
          <div class="bb-summary-card">
            <div class="bb-summary-num" id="bb-week-sum">€0</div>
            <div class="bb-summary-label" id="bb-sum-label-week">This Week</div>
          </div>
          <div class="bb-summary-card">
            <div class="bb-summary-num" id="bb-month-sum">€0</div>
            <div class="bb-summary-label" id="bb-sum-label-month">This Month</div>
          </div>
        </div>
        <!-- Daily entries list -->
        <div style="font-weight:700;font-size:13px;color:var(--ocean-800);margin-bottom:8px"><i class="fas fa-calendar-days" style="color:var(--ocean-500)"></i> Daily Records</div>
        <div id="bb-records-list"></div>
      </div>
      <!-- Item Records -->
      <div id="bb-panel-items" style="display:none">
        <!-- Date range filter -->
        <div style="display:flex;gap:8px;align-items:center;margin-bottom:10px;flex-wrap:wrap">
          <div style="display:flex;align-items:center;gap:6px;flex:1;min-width:120px">
            <label style="font-size:11px;color:var(--ocean-500);white-space:nowrap">From</label>
            <input type="date" id="bb-items-from" class="input-field" style="font-size:12px;padding:4px 8px;flex:1" />
          </div>
          <div style="display:flex;align-items:center;gap:6px;flex:1;min-width:120px">
            <label style="font-size:11px;color:var(--ocean-500);white-space:nowrap">To</label>
            <input type="date" id="bb-items-to" class="input-field" style="font-size:12px;padding:4px 8px;flex:1" />
          </div>
          <button class="btn btn-secondary btn-sm" id="btn-bb-items-clear-range" style="white-space:nowrap"><i class="fas fa-xmark"></i> Clear</button>
        </div>
        <!-- Item search -->
        <div class="search-bar" style="margin-bottom:10px">
          <i class="fas fa-search"></i>
          <input type="text" id="bb-records-search" placeholder="Search items..." />
        </div>
        <!-- Item summary list -->
        <div id="bb-item-summary-list"></div>
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

  <!-- ═══ USERS ═══ -->
  <section id="section-users" class="page-section">
    <div class="section-header">
      <h2 style="font-size:16px;font-weight:800;color:var(--ocean-900)"><i class="fas fa-users" style="color:var(--ocean-500)"></i> Users</h2>
      <button class="btn btn-primary btn-sm" id="btn-add-user"><i class="fas fa-user-plus"></i> Add User</button>
    </div>
    <div id="users-list"><div class="empty-state"><i class="fas fa-users"></i><p>No users yet.</p></div></div>
  </section>

  <!-- ═══ SETTINGS ═══ -->
  <section id="section-settings" class="page-section">
    <!-- Migration notice — always visible when migration is needed (admin must see this) -->
    <div id="sb-migration-banner" style="display:none;margin:0 0 14px 0;background:#fdf3e1;border:1.5px solid #b7791f;border-radius:12px;padding:14px">
      <div style="font-weight:700;font-size:13px;color:var(--amber-700);margin-bottom:8px;display:flex;align-items:center;gap:7px">
        <i class="fas fa-triangle-exclamation" style="color:#b7791f"></i> Database migration required
      </div>
      <p style="font-size:12px;color:var(--amber-700);margin-bottom:10px">Some columns or tables are missing in your Supabase database. This prevents Finance data and Settings (Finance PIN, Fundo de Caixa) from syncing across devices. Run the script below <strong>once</strong> in your Supabase SQL Editor to fix this.</p>
      <a href="https://supabase.com/dashboard/project/eurcdnyhwqofnddhxrpf/sql/new" target="_blank" class="btn btn-gold btn-sm" style="width:100%;justify-content:center;margin-bottom:10px"><i class="fas fa-external-link-alt"></i> Open Supabase SQL Editor</a>
      <div style="position:relative">
        <pre id="sb-migration-sql" style="background:var(--slate-800);color:var(--slate-200);font-size:11px;border-radius:8px;padding:12px;overflow-x:auto;white-space:pre;margin:0;line-height:1.6"></pre>
        <button id="btn-copy-sql" class="btn btn-sm" style="position:absolute;top:6px;right:6px;background:rgba(255,255,255,.1);color:var(--slate-200);border:1px solid rgba(255,255,255,.2);font-size:11px"><i class="fas fa-copy"></i> Copy</button>
      </div>
    </div>
    <!-- Notifications card — visible to ALL users -->
    <div class="settings-card" id="notif-settings-card">
      <h3><i class="fas fa-bell" style="color:var(--ocean-500)"></i> Push Notifications</h3>
      <p style="font-size:13px;color:var(--ocean-400);margin-bottom:12px">Receive alerts when a task is assigned to you.</p>
      <div id="notif-status-row" style="font-size:13px;color:#5f7079;margin-bottom:12px;display:flex;align-items:center;gap:8px">
        <i class="fas fa-circle" id="notif-status-dot" style="font-size:8px;color:#8a9aa2"></i>
        <span id="notif-status-text">Checking...</span>
      </div>
      <button class="btn btn-primary" style="width:100%;justify-content:center" id="btn-enable-notif">
        <i class="fas fa-bell"></i> Enable Notifications on this Device
      </button>
    </div>

    <div id="settings-locked" class="locked-overlay" style="display:none">
      <i class="fas fa-lock"></i>
      <h3>Admin Only</h3>
      <p>Settings can only be changed by an administrator.</p>
      <button class="btn btn-gold" id="settings-login-prompt-btn"><i class="fas fa-key"></i> Admin Login</button>
    </div>
    <div id="settings-content" style="display:none">
      <!-- Change PIN -->
      <div class="settings-card">
        <h3><i class="fas fa-key" style="color:#b7791f"></i> Admin PIN</h3>
        <p style="font-size:13px;color:var(--ocean-400);margin-bottom:12px">Change the 4-digit admin PIN.</p>
        <div class="form-grid-2" style="margin-bottom:12px">
          <div><label class="label">New PIN</label><input type="password" id="new-pin" class="input-field" maxlength="4" placeholder="4 digits" inputmode="numeric" /></div>
          <div><label class="label">Confirm PIN</label><input type="password" id="confirm-pin" class="input-field" maxlength="4" placeholder="4 digits" inputmode="numeric" /></div>
        </div>
        <button class="btn btn-gold" id="btn-change-pin"><i class="fas fa-save"></i> Update PIN</button>
      </div>
      <!-- Fundo de Caixa -->
      <div class="settings-card">
        <h3><i class="fas fa-vault" style="color:#2b8a4b"></i> Fundo de Caixa</h3>
        <p style="font-size:13px;color:var(--ocean-400);margin-bottom:12px">Set the base cash fund amount used in Finance calculations.</p>
        <div class="fin-input-row" style="margin-bottom:12px">
          <label>Fundo de Caixa (€)</label>
          <input type="text" id="settings-fundo" class="input-field" placeholder="0.00" inputmode="decimal" pattern="[0-9]*[.,]?[0-9]*" style="text-align:right;font-weight:700;font-size:16px" />
        </div>
        <button class="btn btn-primary" id="btn-save-fundo"><i class="fas fa-save"></i> Save</button>
      </div>
      <!-- Finance PIN -->
      <div class="settings-card">
        <h3><i class="fas fa-euro-sign" style="color:#6d4fc2"></i> Finance PIN</h3>
        <p style="font-size:13px;color:var(--ocean-400);margin-bottom:12px">Change the 4-digit Finance tab PIN.</p>
        <div class="form-grid-2" style="margin-bottom:12px">
          <div><label class="label">New Finance PIN</label><input type="password" id="new-finance-pin" class="input-field" maxlength="4" placeholder="4 digits" inputmode="numeric" /></div>
          <div><label class="label">Confirm PIN</label><input type="password" id="confirm-finance-pin" class="input-field" maxlength="4" placeholder="4 digits" inputmode="numeric" /></div>
        </div>
        <button class="btn" style="background:#6d4fc2;color:white;display:flex;align-items:center;gap:8px;padding:10px 18px;border:none;border-radius:var(--radius-sm);cursor:pointer;font-weight:700" id="btn-change-finance-pin"><i class="fas fa-save"></i> Update Finance PIN</button>
      </div>
      <!-- Finance Budgets -->
      <div class="settings-card">
        <h3><i class="fas fa-chart-line" style="color:#2b8a4b"></i> Finance Budgets</h3>
        <p style="font-size:13px;color:var(--ocean-400);margin-bottom:10px">Set a monthly budget for each metric. The year total is calculated automatically.</p>
        <div style="overflow-x:auto;margin-bottom:14px">
          <table style="width:100%;border-collapse:collapse;font-size:12px">
            <thead>
              <tr style="background:var(--ocean-50)">
                <th style="padding:6px 8px;text-align:left;font-weight:700;color:var(--ocean-700);min-width:60px">Month</th>
                <th style="padding:6px 4px;font-weight:700;color:#6d4fc2;text-align:right;min-width:80px">Total Day</th>
                <th style="padding:6px 4px;font-weight:700;color:#2a9683;text-align:right;min-width:80px">T 51</th>
                <th style="padding:6px 4px;font-weight:700;color:#2a9683;text-align:right;min-width:80px">Surf</th>
              </tr>
            </thead>
            <tbody id="budget-months-body">
              <!-- rendered by renderSettings() -->
            </tbody>
            <tfoot>
              <tr style="background:var(--ocean-50);border-top:2px solid var(--ocean-200)">
                <td style="padding:6px 8px;font-weight:800;color:var(--ocean-800);font-size:12px">Year Total</td>
                <td id="budget-year-day"  style="padding:6px 4px;font-weight:800;color:#6d4fc2;text-align:right;font-size:12px">€0</td>
                <td id="budget-year-t51"  style="padding:6px 4px;font-weight:800;color:#2a9683;text-align:right;font-size:12px">€0</td>
                <td id="budget-year-surf" style="padding:6px 4px;font-weight:800;color:#2a9683;text-align:right;font-size:12px">€0</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <button class="btn btn-primary" id="btn-save-budgets"><i class="fas fa-save"></i> Save Budgets</button>
      </div>
      <!-- Team Members moved to Shifts → Team tab -->
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
        <div class="sb-status" id="sb-status-box" style="background:#fdf3e1">
          <span class="pulse-dot yellow"></span>
          <span style="font-size:13px;color:var(--amber)" id="sb-status-text">Connecting...</span>
        </div>
        <!-- Migration notice moved to banner above settings-locked -->
      </div>
    </div>
  </section>

</div>

<!-- BOTTOM NAV -->
<nav id="bottom-nav">
  <span id="bnav-marker" aria-hidden="true"></span>
  <button class="bnav-item active" id="bnav-dashboard" data-nav="dashboard"><i class="fas fa-home"></i>Home</button>
  <button class="bnav-item" id="bnav-inventory" data-nav="inventory"><i class="fas fa-boxes-stacked"></i>Stock</button>
  <button class="bnav-item" id="bnav-reservations" data-nav="reservations"><i class="fas fa-calendar-days"></i>Book</button>
  <button class="bnav-item" id="bnav-tasks" data-nav="tasks"><i class="fas fa-list-check"></i>Tasks</button>
  <button class="bnav-item" id="bnav-shifts" data-nav="shifts"><i class="fas fa-clock"></i>Shifts</button>
  <button class="bnav-item admin-nav" id="bnav-blackbox" data-nav="blackbox"><i class="fas fa-cash-register"></i>Box</button>
  <button class="bnav-item" id="bnav-finance" data-nav="finance" style="color:#6d4fc2"><i class="fas fa-euro-sign"></i>Finance</button>
</nav>

<!-- ═══════════ MODALS ═══════════ -->

<!-- Admin Login Modal -->
<div class="modal-overlay modal-center" id="modal-admin-login">
  <div class="modal">
    <div class="modal-handle"></div>
    <h2 style="justify-content:center"><i class="fas fa-shield-halved" style="color:#b7791f"></i> Admin Login</h2>
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
    <h2 style="justify-content:center"><i class="fas fa-euro-sign" style="color:#6d4fc2"></i> Finance Login</h2>
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

<!-- Add / Edit User -->
<div class="modal-overlay" id="modal-add-user">
  <div class="modal" style="max-height:90vh;overflow-y:auto">
    <div class="modal-handle"></div>
    <h2><i class="fas fa-user-circle" style="color:var(--ocean-500)"></i><span id="user-modal-title">Add User</span></h2>

    <div style="background:var(--ocean-50);border-radius:10px;padding:10px 12px;margin-bottom:14px;font-size:11px;font-weight:700;color:var(--ocean-600);text-transform:uppercase;letter-spacing:.06em">Account</div>
    <div class="form-grid-2" style="margin-bottom:12px">
      <div><label class="label">Name *</label><input type="text" class="input-field" id="user-name" placeholder="Full name" /></div>
      <div><label class="label">Username *</label><input type="text" class="input-field" id="user-username" placeholder="login name" autocapitalize="none" /></div>
    </div>
    <div class="form-grid-2" style="margin-bottom:14px">
      <div><label class="label">Password *</label><input type="password" class="input-field" id="user-password" placeholder="Min 6 chars" /></div>
      <div><label class="label">Confirm Password</label><input type="password" class="input-field" id="user-password2" placeholder="Repeat" /></div>
    </div>

    <div style="background:var(--ocean-50);border-radius:10px;padding:10px 12px;margin-bottom:12px;font-size:11px;font-weight:700;color:var(--ocean-600);text-transform:uppercase;letter-spacing:.06em">Roles *</div>
    <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px" id="user-roles-wrap">
      <label style="display:flex;align-items:center;gap:6px;cursor:pointer;padding:7px 12px;border-radius:20px;border:1.5px solid var(--ocean-200);font-size:13px;font-weight:600;transition:all .15s" id="role-lbl-admin">
        <input type="checkbox" value="admin" class="user-role-cb" style="accent-color:#a6741e" /> <i class="fas fa-crown" style="color:#a6741e"></i> Admin
      </label>
      <label style="display:flex;align-items:center;gap:6px;cursor:pointer;padding:7px 12px;border-radius:20px;border:1.5px solid var(--ocean-200);font-size:13px;font-weight:600;transition:all .15s" id="role-lbl-finance">
        <input type="checkbox" value="finance" class="user-role-cb" style="accent-color:#6d4fc2" /> <i class="fas fa-euro-sign" style="color:#6d4fc2"></i> Finance
      </label>
      <label style="display:flex;align-items:center;gap:6px;cursor:pointer;padding:7px 12px;border-radius:20px;border:1.5px solid var(--ocean-200);font-size:13px;font-weight:600;transition:all .15s" id="role-lbl-shift_mgr">
        <input type="checkbox" value="shift_mgr" class="user-role-cb" style="accent-color:#2b8a4b" /> <i class="fas fa-calendar-days" style="color:#2b8a4b"></i> Shift Manager
      </label>
      <label style="display:flex;align-items:center;gap:6px;cursor:pointer;padding:7px 12px;border-radius:20px;border:1.5px solid var(--ocean-200);font-size:13px;font-weight:600;transition:all .15s" id="role-lbl-employee">
        <input type="checkbox" value="employee" class="user-role-cb" style="accent-color:#2f6fa8" /> <i class="fas fa-user" style="color:#2f6fa8"></i> Employee
      </label>
    </div>

    <div style="background:var(--ocean-50);border-radius:10px;padding:10px 12px;margin-bottom:12px;font-size:11px;font-weight:700;color:var(--ocean-600);text-transform:uppercase;letter-spacing:.06em">Contract</div>
    <div class="form-grid-2" style="margin-bottom:12px">
      <div><label class="label">Contract Start</label><input type="date" class="input-field" id="user-contract-start" /></div>
      <div><label class="label">Contract End</label><input type="date" class="input-field" id="user-contract-end" /></div>
    </div>
    <div class="form-grid-2" style="margin-bottom:12px">
      <div><label class="label">Agreed Hours/Week</label><input type="number" class="input-field" id="user-hours" placeholder="e.g. 40" min="0" /></div>
      <div><label class="label">Amount Agreed (€)</label><input type="number" class="input-field" id="user-amount" placeholder="e.g. 1200" min="0" step="0.01" /></div>
    </div>
    <div class="form-grid-2" style="margin-bottom:12px">
      <div><label class="label">House Discount (€)</label><input type="number" class="input-field" id="user-discount" placeholder="e.g. 50" min="0" step="0.01" /></div>
      <div><label class="label">Insurance Policy</label><input type="text" class="input-field" id="user-insurance" placeholder="Policy number" /></div>
    </div>
    <div class="form-grid-2" style="margin-bottom:14px">
      <div><label class="label">Cloth Size</label>
        <select class="select-field" id="user-cloth-size">
          <option value="">— select —</option>
          <option value="S">S</option><option value="M">M</option><option value="L">L</option>
          <option value="XL">XL</option><option value="XXL">XXL</option>
        </select>
      </div>
      <div style="display:flex;flex-direction:column;justify-content:flex-end">
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer;padding:10px 0">
          <input type="checkbox" id="user-active" checked style="width:16px;height:16px;accent-color:var(--ocean-500)" />
          <span style="font-size:13px;font-weight:600;color:var(--ocean-700)">Active Account</span>
        </label>
      </div>
    </div>
    <div style="margin-bottom:16px">
      <label class="label">Notes</label>
      <textarea class="input-field" id="user-notes" rows="3" placeholder="Observations, extra info..." style="resize:vertical;min-height:64px"></textarea>
    </div>

    <div style="display:flex;gap:10px">
      <button class="btn btn-primary" style="flex:1;justify-content:center" id="btn-save-user"><i class="fas fa-save"></i> Save User</button>
      <button class="btn btn-secondary" style="flex:1;justify-content:center" data-close-modal="modal-add-user">Cancel</button>
    </div>
  </div>
</div>

<!-- Add / Edit Inventory Item -->
<!-- Add / Edit Supplier -->
<div class="modal-overlay" id="modal-add-supplier">
  <div class="modal">
    <div class="modal-handle"></div>
    <h2><i class="fas fa-truck" style="color:#2a9683"></i><span id="supplier-modal-title">Add Supplier</span></h2>
    <div class="form-row" style="margin-bottom:12px"><label class="label">Name *</label><input type="text" class="input-field" id="supplier-name" placeholder="Supplier name" /></div>
    <div class="form-row" style="margin-bottom:12px"><label class="label">Email</label><input type="email" class="input-field" id="supplier-email" placeholder="supplier@example.com" /></div>
    <div class="form-row" style="margin-bottom:12px"><label class="label">Phone</label><input type="text" class="input-field" id="supplier-phone" placeholder="+351..." /></div>
    <div style="margin-bottom:12px">
      <label class="label">Categories Supplied</label>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:6px" id="supplier-cat-checks">
        <label style="display:flex;align-items:center;gap:5px;font-size:13px;cursor:pointer"><input type="checkbox" class="supplier-cat-cb" value="beverages"> <i class="fas fa-martini-glass-citrus"></i> Bar</label>
        <label style="display:flex;align-items:center;gap:5px;font-size:13px;cursor:pointer"><input type="checkbox" class="supplier-cat-cb" value="food"> <i class="fas fa-utensils"></i> Cozinha</label>
        <label style="display:flex;align-items:center;gap:5px;font-size:13px;cursor:pointer"><input type="checkbox" class="supplier-cat-cb" value="supplies"> <i class="fas fa-broom"></i> Limpeza</label>
        <label style="display:flex;align-items:center;gap:5px;font-size:13px;cursor:pointer"><input type="checkbox" class="supplier-cat-cb" value="equipment"> <i class="fas fa-screwdriver-wrench"></i> Economato</label>
        <label style="display:flex;align-items:center;gap:5px;font-size:13px;cursor:pointer"><input type="checkbox" class="supplier-cat-cb" value="other"> <i class="fas fa-box"></i> Other</label>
      </div>
    </div>
    <label style="display:flex;align-items:center;gap:10px;cursor:pointer;margin-bottom:16px;background:var(--ocean-50);border-radius:10px;padding:12px">
      <input type="checkbox" id="supplier-send-email" style="width:18px;height:18px;accent-color:var(--ocean-500)" />
      <div><div style="font-size:13px;font-weight:700;color:var(--ocean-800)"><i class="fas fa-envelope"></i> Send orders by email</div><div style="font-size:11px;color:var(--ocean-400)">When enabled, orders to this supplier can be sent by email</div></div>
    </label>
    <div style="display:flex;gap:10px">
      <button class="btn btn-primary" style="flex:1;justify-content:center" id="btn-save-supplier"><i class="fas fa-save"></i> Save</button>
      <button class="btn btn-secondary" style="flex:1;justify-content:center" data-close-modal="modal-add-supplier">Cancel</button>
    </div>
    <div id="supplier-delete-row" style="display:none;margin-top:10px">
      <button class="btn" style="width:100%;justify-content:center;background:#fbeae7;color:#b4402f;border:1px solid #f0b8ae" id="btn-delete-supplier-modal"><i class="fas fa-trash"></i> Delete Supplier</button>
    </div>
  </div>
</div>

<div class="modal-overlay" id="modal-add-inventory">
  <div class="modal">
    <div class="modal-handle"></div>
    <h2><i class="fas fa-box" style="color:var(--ocean-400)"></i><span id="inv-modal-title">Add Item</span></h2>
    <div class="form-row"><label class="label">Employee</label><select class="select-field" id="inv-employee"></select></div>
    <div class="form-grid-2" style="margin-bottom:14px">
      <div><label class="label">Item Name *</label><input type="text" class="input-field" id="inv-item-name" placeholder="e.g. Water Bottle" /></div>
      <div><label class="label">Category</label>
        <select class="select-field" id="inv-category">
          <option value="beverages">Bar</option>
          <option value="food">Cozinha</option>
          <option value="supplies">Limpeza</option>
          <option value="equipment">Economato</option>
          <option value="other">Other</option>
        </select>
      </div>
    </div>
    <div class="form-row"><label class="label">Unit (optional)</label><input type="text" class="input-field" id="inv-unit" placeholder="bottles, kg, boxes..." /></div>
    <div class="form-grid-2" style="margin-bottom:14px">
      <div><label class="label">In Bar</label><input type="number" class="input-field" id="inv-qty-bar" min="0" value="0" /></div>
      <div><label class="label">In Storage</label><input type="number" class="input-field" id="inv-qty-storage" min="0" value="0" /></div>
    </div>
    <div class="form-row" style="margin-bottom:14px"><label class="label">Supplier</label><select class="select-field" id="inv-supplier"></select></div>
    <div style="display:flex;gap:10px">
      <button class="btn btn-primary" style="flex:1;justify-content:center" id="btn-save-inventory"><i class="fas fa-save"></i> Save</button>
      <button class="btn btn-secondary" style="flex:1;justify-content:center" data-close-modal="modal-add-inventory">Cancel</button>
    </div>
  </div>
</div>

<!-- Quick Order Qty -->
<div class="modal-overlay" id="modal-quick-order">
  <div class="modal">
    <div class="modal-handle"></div>
    <h2><i class="fas fa-cart-plus" style="color:#2a9683"></i> Add to Order</h2>
    <input type="hidden" id="quick-order-id" />
    <div style="background:var(--ocean-50);border-radius:12px;padding:14px;margin-bottom:16px;display:flex;align-items:center;gap:12px">
      <div style="font-size:28px" id="quick-order-icon"></div>
      <div>
        <div style="font-weight:700;font-size:16px;color:var(--ocean-900)" id="quick-order-name"></div>
        <div style="font-size:12px;color:var(--ocean-400);margin-top:2px" id="quick-order-stock"></div>
      </div>
    </div>
    <div class="form-row" style="margin-bottom:18px">
      <label class="label">Quantity to order</label>
      <input type="number" class="input-field" id="quick-order-qty" min="1" value="1" style="font-size:22px;text-align:center;font-weight:800" />
    </div>
    <div style="display:flex;gap:10px">
      <button class="btn btn-primary" style="flex:1;justify-content:center" id="btn-confirm-quick-order"><i class="fas fa-cart-plus"></i> Add to Order</button>
      <button class="btn btn-secondary" style="flex:1;justify-content:center" data-close-modal="modal-quick-order">Cancel</button>
    </div>
  </div>
</div>

<!-- Set Order Amount (Admin) -->
<div class="modal-overlay" id="modal-set-order-amount">
  <div class="modal">
    <div class="modal-handle"></div>
    <h2><i class="fas fa-euro-sign" style="color:#2b8a4b"></i> Set Order Amount</h2>
    <input type="hidden" id="set-amount-order-id" />
    <div class="form-row" style="margin-bottom:18px">
      <label class="label">Amount (€)</label>
      <input type="number" class="input-field" id="set-amount-value" min="0" step="0.01" placeholder="0.00" style="font-size:22px;text-align:center;font-weight:800" />
    </div>
    <div style="display:flex;gap:10px">
      <button class="btn btn-primary" style="flex:1;justify-content:center" id="btn-confirm-set-amount"><i class="fas fa-save"></i> Save Amount</button>
      <button class="btn btn-secondary" style="flex:1;justify-content:center" data-close-modal="modal-set-order-amount">Cancel</button>
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
    <p style="font-size:13px;color:var(--ocean-400);margin-bottom:14px">Review your order. Adjust quantities if needed. Order goes on <strong>Standby</strong> until admin approves.</p>
    <div id="order-items-list" style="max-height:45vh;overflow-y:auto;margin-bottom:16px"></div>
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
          <option value="maintenance">Maintenance</option>
          <option value="cleaning">Cleaning</option>
          <option value="call">Call Someone</option>
          <option value="purchase">Purchase</option>
          <option value="admin">Admin</option>
          <option value="staff">Staff</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div><label class="label">Priority</label>
        <select class="select-field" id="task-priority">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
    </div>
    <div class="form-grid-2" style="margin-bottom:14px">
      <div><label class="label">Assigned To</label>
        <div id="task-assigned-list" style="background:#f2f5f6;border:1.5px solid var(--ocean-200);border-radius:var(--radius);padding:8px;max-height:130px;overflow-y:auto;display:flex;flex-direction:column;gap:4px"></div>
      </div>
      <div><label class="label">Deadline</label><input type="date" class="input-field" id="task-deadline" /></div>
    </div>
    <div class="form-row" style="margin-bottom:16px">
      <label class="label"><i class="fas fa-repeat" style="color:#6d4fc2;margin-right:4px"></i> Recurrence</label>
      <select class="select-field" id="task-recurrence">
        <option value="">None (one-time)</option>
        <option value="daily">Every Day</option>
        <option value="weekly">Once a Week</option>
        <option value="biweekly">Every 2 Weeks</option>
        <option value="monthly">Once a Month</option>
        <option value="monday">Every Monday</option>
        <option value="tuesday">Every Tuesday</option>
        <option value="wednesday">Every Wednesday</option>
        <option value="thursday">Every Thursday</option>
        <option value="friday">Every Friday</option>
        <option value="saturday">Every Saturday</option>
        <option value="sunday">Every Sunday</option>
      </select>
    </div>
    <div style="display:flex;gap:10px">
      <button class="btn btn-primary" style="flex:1;justify-content:center" id="btn-save-task"><i class="fas fa-save"></i> Save Task</button>
      <button class="btn btn-secondary" style="flex:1;justify-content:center" data-close-modal="modal-add-task">Cancel</button>
    </div>
  </div>
</div>

<!-- Shift Action Sheet -->
<div class="modal-overlay" id="modal-shift-action">
  <div class="modal" style="padding-bottom:8px">
    <div class="modal-handle"></div>
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">
      <div style="width:38px;height:38px;border-radius:50%;background:var(--ocean-100);display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:800;color:var(--ocean-600)" id="shift-action-avatar">?</div>
      <div>
        <div style="font-weight:800;font-size:15px;color:var(--ocean-900)" id="shift-action-name">—</div>
        <div style="font-size:12px;color:var(--ocean-400)" id="shift-action-info">—</div>
      </div>
    </div>
    <button class="btn btn-secondary" style="width:100%;justify-content:center;margin-bottom:8px;font-size:14px" id="shift-action-edit">
      <i class="fas fa-pen" style="color:var(--ocean-500)"></i> Edit Shift
    </button>
    <button class="btn" style="width:100%;justify-content:center;margin-bottom:8px;font-size:14px;background:#fdf3e1;color:var(--amber-700);border:1px solid #f0d391" id="shift-action-absent-unjust">
      <i class="fas fa-user-slash" style="color:#b4402f"></i> Mark Absent — Unjustified
    </button>
    <button class="btn" style="width:100%;justify-content:center;margin-bottom:8px;font-size:14px;background:#fdf3e1;color:var(--amber-700);border:1px solid var(--amber-200)" id="shift-action-absent-just">
      <i class="fas fa-user-clock" style="color:#b7791f"></i> Mark Absent — Justified
    </button>
    <button class="btn" style="width:100%;justify-content:center;margin-bottom:8px;font-size:14px;background:var(--red-50);color:var(--red-700);border:1px solid #f0b8ae" id="shift-action-delete">
      <i class="fas fa-trash" style="color:#b4402f"></i> Delete Shift
    </button>
    <button class="btn btn-secondary" style="width:100%;justify-content:center;font-size:14px" data-close-modal="modal-shift-action">Cancel</button>
  </div>
</div>

<!-- Add / Edit Shift -->
<div class="modal-overlay" id="modal-add-shift">
  <div class="modal">
    <div class="modal-handle"></div>
    <h2><i class="fas fa-clock" style="color:var(--ocean-400)"></i><span id="shift-modal-title">Add Shift</span></h2>
    <input type="hidden" id="shift-edit-id" />
    <div class="form-row" style="margin-bottom:14px"><label class="label">Employee *</label><select class="select-field" id="shift-employee"></select></div>
    <!-- Per-day schedule table -->
    <div style="font-size:11px;font-weight:700;color:var(--ocean-500);text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px">Schedule</div>
    <div style="overflow-x:auto;margin-bottom:14px">
      <table style="width:100%;border-collapse:collapse;font-size:13px">
        <thead><tr style="background:var(--ocean-50)">
          <th style="padding:6px 8px;text-align:left;font-weight:700;color:var(--ocean-700);min-width:72px">Day</th>
          <th style="padding:6px 4px;font-weight:700;color:var(--ocean-700)">Start</th>
          <th style="padding:6px 4px;font-weight:700;color:var(--ocean-700)">End</th>
          <th style="padding:6px 4px;font-weight:700;color:var(--ocean-500);min-width:90px">Zone</th>
          <th style="padding:6px 4px;font-weight:700;color:#b4402f;white-space:nowrap">Day Off</th>
        </tr></thead>
        <tbody id="shift-days-body">
          <tr data-shift-day="Monday"><td style="padding:5px 8px;font-weight:600;color:var(--ocean-800)">Mon</td><td style="padding:4px"><input type="time" class="input-field shift-day-start" style="padding:5px 6px;font-size:12px" value="09:00"/></td><td style="padding:4px"><input type="time" class="input-field shift-day-end" style="padding:5px 6px;font-size:12px" value="17:00"/></td><td style="padding:4px"><select class="select-field shift-day-zone" style="padding:4px 6px;font-size:11px"><option value="">—</option><option value="Dishes">Dishes</option><option value="Kitchen">‍Kitchen</option><option value="Bar">Bar</option><option value="Service">Service</option><option value="Foccaceria">Foccaceria</option></select></td><td style="padding:4px;text-align:center"><input type="checkbox" class="shift-day-off-chk" style="width:18px;height:18px;accent-color:#b4402f"/></td></tr>
          <tr data-shift-day="Tuesday"><td style="padding:5px 8px;font-weight:600;color:var(--ocean-800)">Tue</td><td style="padding:4px"><input type="time" class="input-field shift-day-start" style="padding:5px 6px;font-size:12px" value="09:00"/></td><td style="padding:4px"><input type="time" class="input-field shift-day-end" style="padding:5px 6px;font-size:12px" value="17:00"/></td><td style="padding:4px"><select class="select-field shift-day-zone" style="padding:4px 6px;font-size:11px"><option value="">—</option><option value="Dishes">Dishes</option><option value="Kitchen">‍Kitchen</option><option value="Bar">Bar</option><option value="Service">Service</option><option value="Foccaceria">Foccaceria</option></select></td><td style="padding:4px;text-align:center"><input type="checkbox" class="shift-day-off-chk" style="width:18px;height:18px;accent-color:#b4402f"/></td></tr>
          <tr data-shift-day="Wednesday"><td style="padding:5px 8px;font-weight:600;color:var(--ocean-800)">Wed</td><td style="padding:4px"><input type="time" class="input-field shift-day-start" style="padding:5px 6px;font-size:12px" value="09:00"/></td><td style="padding:4px"><input type="time" class="input-field shift-day-end" style="padding:5px 6px;font-size:12px" value="17:00"/></td><td style="padding:4px"><select class="select-field shift-day-zone" style="padding:4px 6px;font-size:11px"><option value="">—</option><option value="Dishes">Dishes</option><option value="Kitchen">‍Kitchen</option><option value="Bar">Bar</option><option value="Service">Service</option><option value="Foccaceria">Foccaceria</option></select></td><td style="padding:4px;text-align:center"><input type="checkbox" class="shift-day-off-chk" style="width:18px;height:18px;accent-color:#b4402f"/></td></tr>
          <tr data-shift-day="Thursday"><td style="padding:5px 8px;font-weight:600;color:var(--ocean-800)">Thu</td><td style="padding:4px"><input type="time" class="input-field shift-day-start" style="padding:5px 6px;font-size:12px" value="09:00"/></td><td style="padding:4px"><input type="time" class="input-field shift-day-end" style="padding:5px 6px;font-size:12px" value="17:00"/></td><td style="padding:4px"><select class="select-field shift-day-zone" style="padding:4px 6px;font-size:11px"><option value="">—</option><option value="Dishes">Dishes</option><option value="Kitchen">‍Kitchen</option><option value="Bar">Bar</option><option value="Service">Service</option><option value="Foccaceria">Foccaceria</option></select></td><td style="padding:4px;text-align:center"><input type="checkbox" class="shift-day-off-chk" style="width:18px;height:18px;accent-color:#b4402f"/></td></tr>
          <tr data-shift-day="Friday"><td style="padding:5px 8px;font-weight:600;color:var(--ocean-800)">Fri</td><td style="padding:4px"><input type="time" class="input-field shift-day-start" style="padding:5px 6px;font-size:12px" value="09:00"/></td><td style="padding:4px"><input type="time" class="input-field shift-day-end" style="padding:5px 6px;font-size:12px" value="17:00"/></td><td style="padding:4px"><select class="select-field shift-day-zone" style="padding:4px 6px;font-size:11px"><option value="">—</option><option value="Dishes">Dishes</option><option value="Kitchen">‍Kitchen</option><option value="Bar">Bar</option><option value="Service">Service</option><option value="Foccaceria">Foccaceria</option></select></td><td style="padding:4px;text-align:center"><input type="checkbox" class="shift-day-off-chk" style="width:18px;height:18px;accent-color:#b4402f"/></td></tr>
          <tr data-shift-day="Saturday"><td style="padding:5px 8px;font-weight:600;color:var(--ocean-800)">Sat</td><td style="padding:4px"><input type="time" class="input-field shift-day-start" style="padding:5px 6px;font-size:12px" value="09:00"/></td><td style="padding:4px"><input type="time" class="input-field shift-day-end" style="padding:5px 6px;font-size:12px" value="17:00"/></td><td style="padding:4px"><select class="select-field shift-day-zone" style="padding:4px 6px;font-size:11px"><option value="">—</option><option value="Dishes">Dishes</option><option value="Kitchen">‍Kitchen</option><option value="Bar">Bar</option><option value="Service">Service</option><option value="Foccaceria">Foccaceria</option></select></td><td style="padding:4px;text-align:center"><input type="checkbox" class="shift-day-off-chk" style="width:18px;height:18px;accent-color:#b4402f"/></td></tr>
          <tr data-shift-day="Sunday"><td style="padding:5px 8px;font-weight:600;color:var(--ocean-800)">Sun</td><td style="padding:4px"><input type="time" class="input-field shift-day-start" style="padding:5px 6px;font-size:12px" value="09:00"/></td><td style="padding:4px"><input type="time" class="input-field shift-day-end" style="padding:5px 6px;font-size:12px" value="17:00"/></td><td style="padding:4px"><select class="select-field shift-day-zone" style="padding:4px 6px;font-size:11px"><option value="">—</option><option value="Dishes">Dishes</option><option value="Kitchen">‍Kitchen</option><option value="Bar">Bar</option><option value="Service">Service</option><option value="Foccaceria">Foccaceria</option></select></td><td style="padding:4px;text-align:center"><input type="checkbox" class="shift-day-off-chk" style="width:18px;height:18px;accent-color:#b4402f"/></td></tr>
        </tbody>
      </table>
    </div>
    <div class="form-row" style="margin-bottom:14px">
      <div><label class="label">Role / Notes</label><input type="text" class="input-field" id="shift-role" placeholder="e.g. Host, Manager..." /></div>
    </div>
    <div style="display:flex;gap:10px">
      <button class="btn btn-primary" style="flex:1;justify-content:center" id="btn-save-shift"><i class="fas fa-save"></i> Save Shifts</button>
      <button class="btn btn-secondary" style="flex:1;justify-content:center" data-close-modal="modal-add-shift">Cancel</button>
    </div>
  </div>
</div>

<!-- Add BB Menu Item -->
<div class="modal-overlay" id="modal-add-bb-item">
  <div class="modal">
    <div class="modal-handle"></div>
    <h2><i class="fas fa-tag" style="color:#b7791f"></i><span id="bb-item-modal-title">Add Menu Item</span></h2>
    <input type="hidden" id="bb-item-edit-id" />
    <div class="form-row"><label class="label">Item Name *</label><input type="text" class="input-field" id="bb-item-name" placeholder="e.g. Sangria" /></div>
    <div class="form-grid-2" style="margin-bottom:14px">
      <div><label class="label">Price (€) *</label><input type="number" class="input-field" id="bb-item-price" min="0" step="0.01" placeholder="0.00" /></div>
      <div><label class="label">Category</label>
        <select class="select-field" id="bb-item-category">
          <option value="beverages">Beverages</option>
          <option value="food">Food</option>
          <option value="cocktails">Cocktails</option>
          <option value="beer">Beer</option>
          <option value="wine">Wine</option>
          <option value="spirits">Spirits</option>
          <option value="other">Other</option>
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
var SB_URL = '${cfg.sbUrl}';
var SB_KEY = '${cfg.sbKey}';
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
  var controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  var timer = controller ? setTimeout(function(){ controller.abort(); }, 10000) : null;
  return fetch(url, {
    method: method,
    signal: controller ? controller.signal : undefined,
    headers: {
      'apikey': SB_KEY,
      'Authorization': 'Bearer ' + SB_KEY,
      'Content-Type': 'application/json',
      'Prefer': method === 'POST' ? 'return=representation' : (method === 'PATCH' ? 'return=representation' : '')
    },
    body: body ? JSON.stringify(body) : undefined
  }).then(function(r) {
    if (timer) clearTimeout(timer);
    if (!r.ok) return r.json().then(function(e){ throw e; }).catch(function(){ throw new Error('HTTP ' + r.status); });
    var ct = r.headers.get('content-type') || '';
    if (ct.indexOf('json') !== -1) return r.json();
    return null;
  }).catch(function(e) {
    if (timer) clearTimeout(timer);
    throw e;
  });
}

// Supabase returns at most 1000 rows per request; read a whole table in pages.
// The order must end with a unique column (id) so pages never overlap or skip rows.
function sbFetchAll(table, params, pageSize) {
  pageSize = pageSize || 1000;
  var all = [];
  function page(offset) {
    return sbFetch('GET', table, null, params + '&limit=' + pageSize + '&offset=' + offset).then(function(rows) {
      rows = rows || [];
      all = all.concat(rows);
      return rows.length < pageSize ? all : page(offset + pageSize);
    });
  }
  return page(0);
}

// ================================================
// ================================================
// CONSTANTS
// ================================================
var MONTH_NAMES=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var MONTH_KEYS=['01','02','03','04','05','06','07','08','09','10','11','12'];

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
  if (db.fundoCaixa === undefined) db.fundoCaixa = 0;
  if (!db.invSortOrder) db.invSortOrder = [];
  if (!db.weekTips)      db.weekTips = {};
  if (!db.tipsLocked)   db.tipsLocked = {};   // {weekStart: true} — locked after generate
  if (!db.absences)     db.absences = [];      // [{id,employee,date,weekStart,justified}]
  if (!db.suppliers)    db.suppliers = [];     // [{id,name,email,phone,totalSpend,sendEmail}]
  if (!db.appUsers)     db.appUsers = [];
  // Always ensure the seed admin exists — re-insert if missing
  if (!db.appUsers.find(function(u){ return u.id === 'admin_seed'; })) {
    db.appUsers.push({
      id: 'admin_seed',
      name: 'Administrator',
      username: 'admin',
      passwordHash: btoa(unescape(encodeURIComponent('Admin1234'))),
      roles: ['admin','finance','shift_mgr','employee'],
      contractStart:'', contractEnd:'', hours:'', amount:'',
      discount:'', insurance:'', clothSize:'', notes:'',
      active: true, createdAt: new Date().toISOString()
    });
  }
  // Per-month budgets: { day:{01:0,...,12:0}, t51:{...}, surf:{...} }
  var MONTHS=['01','02','03','04','05','06','07','08','09','10','11','12'];
  if (!db.budgets) {
    db.budgets = { day:{}, t51:{}, surf:{} };
    MONTHS.forEach(function(m){ db.budgets.day[m]=0; db.budgets.t51[m]=0; db.budgets.surf[m]=0; });
  } else {
    // backfill any missing months
    ['day','t51','surf'].forEach(function(k){
      if(!db.budgets[k]) db.budgets[k]={};
      MONTHS.forEach(function(m){ if(db.budgets[k][m]===undefined) db.budgets[k][m]=0; });
    });
  }
  // Remove old scalar fields if present
  delete db.budgetDay; delete db.budgetT51; delete db.budgetSurf;
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
    box.style.background = '#e6f0f9';
    box.querySelector('.pulse-dot').className = 'pulse-dot green';
    txt.style.color = '#2f6fa8';
    txt.textContent = msg || 'Connected to Supabase';
  } else if (ok === false) {
    box.style.background = 'var(--red-50)';
    box.querySelector('.pulse-dot').className = 'pulse-dot red';
    txt.style.color = '#b4402f';
    txt.textContent = msg || 'Connection error';
  } else {
    box.style.background = '#fdf3e1';
    box.querySelector('.pulse-dot').className = 'pulse-dot yellow';
    txt.style.color = 'var(--amber)';
    txt.textContent = msg || 'Syncing...';
  }
}

var sbMissingItems = []; // track what's missing for migration notice

var MIGRATION_SQL = [
  '-- Run this once in your Supabase SQL Editor',
  '-- https://supabase.com/dashboard/project/eurcdnyhwqofnddhxrpf/sql/new',
  '',
  '-- 1. Add Finance PIN and Fundo de Caixa to settings',
  "ALTER TABLE settings ADD COLUMN IF NOT EXISTS finance_pin TEXT DEFAULT '0000';",
  'ALTER TABLE settings ADD COLUMN IF NOT EXISTS fundo_caixa NUMERIC DEFAULT 0;',
  '',
  '-- 2. Finance daily entries table',
  'CREATE TABLE IF NOT EXISTS fin_entries (',
  '  id TEXT PRIMARY KEY,',
  '  date DATE NOT NULL UNIQUE,',
  '  t51 NUMERIC DEFAULT 0,',
  '  multibanco NUMERIC DEFAULT 0,',
  '  total_day NUMERIC DEFAULT 0,',
  '  invoiced NUMERIC DEFAULT 0,',
  '  gen_expenses NUMERIC DEFAULT 0,',
  '  tips NUMERIC DEFAULT 0,',
  '  entregar NUMERIC DEFAULT 0,',
  '  cash_notes NUMERIC DEFAULT 0,',
  '  coins NUMERIC DEFAULT 0,',
  '  surf NUMERIC DEFAULT 0,',
  '  cash_diff NUMERIC DEFAULT 0,',
  "  saved_at TIMESTAMPTZ DEFAULT now()",
  ');',
  'ALTER TABLE fin_entries ADD COLUMN IF NOT EXISTS cash_diff NUMERIC DEFAULT 0;',
  'ALTER TABLE fin_entries ENABLE ROW LEVEL SECURITY;',
  'DROP POLICY IF EXISTS allow_all ON fin_entries;',
  "CREATE POLICY allow_all ON fin_entries FOR ALL TO anon USING (true) WITH CHECK (true);",
  '',
  '-- 3. Apply settings migration',
  "UPDATE settings SET finance_pin = '0000', fundo_caixa = 0 WHERE id = 'config';",
  '',
  '-- 4. Shared settings columns (budgets, weekly tips, stock sort order)',
  "ALTER TABLE settings ADD COLUMN IF NOT EXISTS budgets       JSONB DEFAULT '{}'::jsonb;",
  "ALTER TABLE settings ADD COLUMN IF NOT EXISTS week_tips     JSONB DEFAULT '{}'::jsonb;",
  "ALTER TABLE settings ADD COLUMN IF NOT EXISTS inv_sort_order JSONB DEFAULT '[]'::jsonb;",
  '',
  '-- 5. Shifts extra columns',
  'ALTER TABLE shifts ADD COLUMN IF NOT EXISTS day_off BOOLEAN DEFAULT false;',
  "ALTER TABLE shifts ADD COLUMN IF NOT EXISTS zone TEXT DEFAULT '';",
  '',
  '-- 6. Task recurrence column',
  "ALTER TABLE tasks ADD COLUMN IF NOT EXISTS recurrence TEXT DEFAULT NULL;",
  '',
  '-- 7. App users table (login system)',
  'CREATE TABLE IF NOT EXISTS app_users (',
  '  id TEXT PRIMARY KEY,',
  '  name TEXT NOT NULL,',
  '  username TEXT NOT NULL UNIQUE,',
  '  password_hash TEXT NOT NULL,',
  "  roles JSONB DEFAULT '[]',",
  '  contract_start DATE,',
  '  contract_end DATE,',
  '  hours TEXT,',
  '  amount NUMERIC,',
  '  discount NUMERIC,',
  '  insurance TEXT,',
  '  cloth_size TEXT,',
  '  notes TEXT,',
  '  active BOOLEAN DEFAULT true,',
  "  created_at TIMESTAMPTZ DEFAULT now()",
  ');',
  'ALTER TABLE app_users ENABLE ROW LEVEL SECURITY;',
  'DROP POLICY IF EXISTS allow_all ON app_users;',
  "CREATE POLICY allow_all ON app_users FOR ALL TO anon USING (true) WITH CHECK (true);",
  '',
  '-- 8. Push subscriptions (Web Push notifications)',
  'CREATE TABLE IF NOT EXISTS push_subscriptions (',
  '  user_id TEXT NOT NULL,',
  '  endpoint TEXT PRIMARY KEY,',
  '  p256dh TEXT NOT NULL,',
  '  auth TEXT NOT NULL,',
  '  updated_at TIMESTAMPTZ DEFAULT now()',
  ');',
  'ALTER TABLE push_subscriptions ENABLE ROW LEVEL SECURITY;',
  'DROP POLICY IF EXISTS allow_all ON push_subscriptions;',
  "CREATE POLICY allow_all ON push_subscriptions FOR ALL TO anon USING (true) WITH CHECK (true);",
  '',
  '-- 9. Absences table',
  'CREATE TABLE IF NOT EXISTS absences (',
  '  id TEXT PRIMARY KEY,',
  '  employee TEXT NOT NULL,',
  '  date DATE NOT NULL,',
  '  week_start DATE NOT NULL,',
  '  justified BOOLEAN DEFAULT false,',
  "  created_at TIMESTAMPTZ DEFAULT now()",
  ');',
  'ALTER TABLE absences ENABLE ROW LEVEL SECURITY;',
  'DROP POLICY IF EXISTS allow_all ON absences;',
  "CREATE POLICY allow_all ON absences FOR ALL TO anon USING (true) WITH CHECK (true);",
  '',
  '-- 10. Suppliers table',
  'CREATE TABLE IF NOT EXISTS suppliers (',
  '  id TEXT PRIMARY KEY,',
  '  name TEXT NOT NULL,',
  "  email TEXT DEFAULT '',",
  "  phone TEXT DEFAULT '',",
  '  total_spend NUMERIC DEFAULT 0,',
  '  send_email BOOLEAN DEFAULT false,',
  "  categories JSONB DEFAULT '[]'::jsonb,",
  "  created_at TIMESTAMPTZ DEFAULT now()",
  ');',
  'ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;',
  'DROP POLICY IF EXISTS allow_all ON suppliers;',
  "CREATE POLICY allow_all ON suppliers FOR ALL TO anon USING (true) WITH CHECK (true);",
  '',
  '-- 11. Inventory: add supplier_id column',
  "ALTER TABLE inventory ADD COLUMN IF NOT EXISTS supplier_id TEXT DEFAULT NULL REFERENCES suppliers(id) ON DELETE SET NULL;",
  '',
  '-- 12. Orders: add supplier_id and amount columns',
  "ALTER TABLE orders ADD COLUMN IF NOT EXISTS supplier_id TEXT DEFAULT NULL;",
  "ALTER TABLE orders ADD COLUMN IF NOT EXISTS amount NUMERIC DEFAULT 0;"
].join('\\n');

function showMigrationNotice(missing) {
  // Show the banner above settings-locked (visible even when not admin)
  var banner = document.getElementById('sb-migration-banner');
  var sqlEl  = document.getElementById('sb-migration-sql');
  if (!banner || !sqlEl) return;
  if (missing.length === 0) {
    banner.style.display = 'none';
    return;
  }
  sqlEl.textContent = MIGRATION_SQL;
  banner.style.display = 'block';
}

function syncFromSupabase() {
  setSbStatus(null, 'Syncing...');
  sbMissingItems = [];
  var db = getDB();
  var promises = [
    sbFetch('GET', 'settings', null, 'id=eq.config').catch(function(){ return null; }).then(function(rows) {
      if (rows && rows[0]) {
        var r = rows[0];
        // ── Always prefer Supabase value; only fall back when column is missing (undefined) ──

        // admin_pin
        if (r.admin_pin !== undefined) db.adminPin = r.admin_pin || '1234';

        // finance_pin
        if (r.finance_pin === undefined) {
          sbMissingItems.push('settings.finance_pin');
        } else {
          db.financePin = r.finance_pin || '0000';
        }

        // fundo_caixa
        if (r.fundo_caixa === undefined) {
          sbMissingItems.push('settings.fundo_caixa');
        } else {
          db.fundoCaixa = parseFloat(r.fundo_caixa) || 0;
        }

        // tables — use Supabase array whenever column exists (even if empty)
        if (r.tables !== undefined) db.tables = r.tables || db.tables;

        // budgets — full replace from Supabase; detect missing column
        if (r.budgets === undefined) {
          sbMissingItems.push('settings.budgets');
        } else {
          // Supabase owns the truth: replace entire budgets object
          var rb = (r.budgets && typeof r.budgets === 'object') ? r.budgets : {};
          var MONTHS = MONTH_KEYS;
          ['day','t51','surf'].forEach(function(k){
            db.budgets[k] = {};
            MONTHS.forEach(function(m){
              db.budgets[k][m] = (rb[k] && rb[k][m] !== undefined) ? parseFloat(rb[k][m]) || 0 : 0;
            });
          });
        }

        // week_tips — full replace from Supabase
        if (r.week_tips === undefined) {
          sbMissingItems.push('settings.week_tips');
        } else {
          db.weekTips = (r.week_tips && typeof r.week_tips === 'object') ? r.week_tips : {};
        }

        // inv_sort_order — full replace from Supabase
        if (r.inv_sort_order === undefined) {
          sbMissingItems.push('settings.inv_sort_order');
        } else {
          db.invSortOrder = Array.isArray(r.inv_sort_order) ? r.inv_sort_order : [];
        }
      }
    }),
    sbFetch('GET', 'employees', null, 'order=name.asc').then(function(rows) {
      if (rows) db.employees = rows.map(function(r){ return r.name; });
    }).catch(function(){}),   // silent fail
    sbFetch('GET', 'inventory', null, 'order=name.asc').then(function(rows) {
      if (rows) db.inventory = rows.map(function(r){ return {
        id: r.id, name: r.name, category: r.category, unit: r.unit||'',
        qtyBar: r.qty_bar, qtyStorage: r.qty_storage, minimum: r.minimum,
        lastEmployee: r.last_employee||'', supplierId: r.supplier_id||'',
        createdAt: r.created_at, updatedAt: r.updated_at
      }; });
    }).catch(function(){}),   // silent fail
    sbFetch('GET', 'inv_logs', null, 'order=timestamp.desc&limit=300').then(function(rows) {
      if (rows) db.invLogs = rows.map(function(r){ return {
        id: r.id, action: r.action, item: r.item, employee: r.employee,
        qtyBar: r.qty_bar, qtyStorage: r.qty_storage, timestamp: r.timestamp
      }; });
    }).catch(function(){}),   // silent fail
    sbFetch('GET', 'orders', null, 'order=created_at.desc').then(function(rows) {
      if (rows) db.orders = rows.map(function(r){ return {
        id: r.id, date: r.date||r.created_at, items: Array.isArray(r.items)?r.items:[], status: r.status, supplierId: r.supplier_id||'', amount: parseFloat(r.amount)||0, createdAt: r.created_at
      }; });
    }).catch(function(){}),   // silent fail
    sbFetch('GET', 'reservations', null, 'order=date.asc,time.asc').then(function(rows) {
      if (rows) db.reservations = rows.map(function(r){ return {
        id: r.id, guestName: r.guest_name, phone: r.phone||'', date: r.date,
        time: r.time ? r.time.slice(0,5) : '', guests: r.guests,
        tables: r.tables||[], notes: r.notes||'', status: r.status, createdAt: r.created_at
      }; });
    }).catch(function(){}),   // silent fail
    sbFetch('GET', 'tasks', null, 'order=created_at.desc').catch(function(){ return null; }).then(function(rows) {
      if (rows) db.tasks = rows.map(function(r){
        // assigned_to may be a JSON string array or plain string (legacy)
        var asn = r.assigned_to||[];
        if (typeof asn === 'string') {
          try { asn = JSON.parse(asn); } catch(e) { asn = asn ? [asn] : []; }
        }
        if (!Array.isArray(asn)) asn = [];
        return {
          id: r.id, title: r.title, description: r.description||'', category: r.category,
          priority: r.priority, status: r.status, assignedTo: asn,
          deadline: r.deadline||'', doneAt: r.done_at||'', createdAt: r.created_at,
          recurrence: r.recurrence||''
        };
      });
    }),
    sbFetch('GET', 'shifts', null, 'order=week_start.desc,day.asc&limit=1').catch(function(){ return null; }).then(function(rows) {
      if (rows && rows[0] && rows[0].day_off === undefined) sbMissingItems.push('shifts.day_off');
      return sbFetchAll('shifts', 'order=week_start.desc,day.asc,id.asc').then(function(rows2) {
        if (rows2) db.shifts = rows2.map(function(r){ return {
          id: r.id, employee: r.employee, day: r.day, weekStart: r.week_start,
          start: r.start_time ? r.start_time.slice(0,5) : '',
          end: r.end_time ? r.end_time.slice(0,5) : '',
          role: r.role||'', zone: r.zone||'', dayOff: !!r.day_off, createdAt: r.created_at
        }; });
      }).catch(function(){});
    }),   // silent fail
    sbFetch('GET', 'bb_menu', null, 'order=category.asc,name.asc').then(function(rows) {
      if (rows) db.bbMenu = rows.map(function(r){ return {
        id: r.id, name: r.name, price: parseFloat(r.price)||0, category: r.category
      }; });
    }).catch(function(){}),   // silent fail
    sbFetch('GET', 'bb_entries', null, 'order=date.desc&limit=90').then(function(rows) {
      if (rows) db.bbEntries = rows.map(function(r){ return {
        id: r.id, date: r.date, items: r.items||[], total: parseFloat(r.total)||0, savedAt: r.saved_at
      }; });
    }).catch(function(){}),   // silent fail
    sbFetch('GET', 'fin_entries', null, 'order=date.desc&limit=365').then(function(rows) {
      if (rows) db.finEntries = rows.map(function(r){ return {
        id: r.id, date: r.date,
        t51: parseFloat(r.t51)||0, multibanco: parseFloat(r.multibanco)||0,
        totalDay: parseFloat(r.total_day)||0, invoiced: parseFloat(r.invoiced)||0,
        tips: parseFloat(r.tips)||0, entregar: parseFloat(r.entregar)||0,
        cashNotes: parseFloat(r.cash_notes)||0, coins: parseFloat(r.coins)||0,
        genExpenses: parseFloat(r.gen_expenses)||0, surf: parseFloat(r.surf)||0,
        cashDiff: parseFloat(r.cash_diff)||0,
        savedAt: r.saved_at
      }; });
    }).catch(function(){ sbMissingItems.push('fin_entries table'); }),
    sbFetch('GET', 'app_users', null, 'order=name.asc').then(function(rows) {
      if (rows && rows.length > 0) {
        db.appUsers = rows.map(function(r){ return {
          id: r.id, name: r.name, username: r.username,
          passwordHash: r.password_hash,
          roles: Array.isArray(r.roles) ? r.roles : [],
          contractStart: r.contract_start||'', contractEnd: r.contract_end||'',
          hours: r.hours||'', amount: r.amount||'',
          discount: r.discount||'', insurance: r.insurance||'',
          clothSize: r.cloth_size||'', notes: r.notes||'',
          active: r.active !== false, createdAt: r.created_at
        }; });
      }
      // Always re-ensure admin_seed exists after any sync (even if Supabase has rows)
      if (!db.appUsers.find(function(u){ return u.id === 'admin_seed'; })) {
        db.appUsers.push({
          id: 'admin_seed',
          name: 'Administrator',
          username: 'admin',
          passwordHash: btoa(unescape(encodeURIComponent('Admin1234'))),
          roles: ['admin','finance','shift_mgr','employee'],
          contractStart:'', contractEnd:'', hours:'', amount:'',
          discount:'', insurance:'', clothSize:'', notes:'',
          active: true, createdAt: new Date().toISOString()
        });
      }
    }).catch(function(){ sbMissingItems.push('app_users table'); }),
    sbFetchAll('absences', 'order=date.desc,id.asc').then(function(rows) {
      if (rows) db.absences = rows.map(function(r){ return {
        id: r.id, employee: r.employee, date: r.date,
        weekStart: r.week_start, justified: !!r.justified, createdAt: r.created_at
      }; });
    }).catch(function(){})   // absences table may not exist yet — silent fail
    ,
    sbFetch('GET', 'suppliers', null, 'order=name.asc').then(function(rows) {
      if (rows) db.suppliers = rows.map(function(r){
        var cats=[];
        try { cats=Array.isArray(r.categories)?r.categories:(r.categories?JSON.parse(r.categories):[]); } catch(e){}
        return {
          id: r.id, name: r.name, email: r.email||'', phone: r.phone||'',
          totalSpend: parseFloat(r.total_spend)||0, sendEmail: !!r.send_email,
          categories: cats, createdAt: r.created_at
        };
      });
    }).catch(function(){})   // suppliers table created on migration
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
var currentUser = null; // the logged-in app_user object
var SESSION_KEY = 'bardapraia_session';
var syncReady = false; // true once syncFromSupabase() has completed at least once
var currentSection = 'dashboard';
var calendarWeekStart = getMonday(new Date());
var selectedCalendarDay = null;
var currentTaskFilter = 'open';
var invSearchVal = '';
var invCatFilter = '';
var invSupplierFilter = ''; // supplier id filter for inventory view
var invLogSupplierFilter = ''; // supplier id filter for log view
var editSupplierId = null; // id of supplier being edited
var resSearchVal = '';
var resDateFilter = '';
var editInventoryId = null;
var editBbItemId = null;
var shiftsWeekOffset = 0;
var pinBuffer = '';
var finPinBuffer = '';
var finSelectedDate = '';
var finEditMode = false; // true = admin has unlocked a saved entry for editing
var bbSelectedItems = {}; // {id: qty}
var bbItemSearchVal = '';
var currentBbTab = 'daily';
var bbRecordsFrom = '';
var bbRecordsTo = '';
var bbRecordsSearch = '';
var bbItemsFrom = '';
var bbItemsTo = '';
var currentFinTab = 'entry';
var editUserId = null; // null = add mode, string = edit mode
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
  el.style.background = type==='error' ? '#b4402f' : type==='gold' ? '#b7791f' : 'var(--ocean-900)';
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
// LOGIN / AUTH SYSTEM
// ================================================
function hashPw(pw) { return btoa(unescape(encodeURIComponent(pw))); }
function hasRole(role) { return currentUser && Array.isArray(currentUser.roles) && currentUser.roles.indexOf(role) !== -1; }

function sbRowToUser(x) {
  return {id:x.id,name:x.name,username:x.username,passwordHash:x.password_hash,roles:Array.isArray(x.roles)?x.roles:[],contractStart:x.contract_start||'',contractEnd:x.contract_end||'',hours:x.hours||'',amount:x.amount||'',discount:x.discount||'',insurance:x.insurance||'',clothSize:x.cloth_size||'',notes:x.notes||'',active:x.active!==false,createdAt:x.created_at};
}

var loginInFlight = false;
function doLogin() {
  var uname = (document.getElementById('login-username').value||'').trim().toLowerCase();
  var pw    = document.getElementById('login-password').value;
  var errEl = document.getElementById('login-error');
  if (!uname || !pw) { errEl.textContent = 'Please enter username and password.'; return; }
  if (loginInFlight) return;
  var db = getDB();
  var user = db.appUsers.find(function(u){ return u.username.toLowerCase() === uname; });
  if (user && user.active && user.passwordHash === hashPw(pw)) { applyLogin(user, true); return; }

  // Not in the local cache (fresh device / new domain / sync still running) or the cached
  // password is stale: ask Supabase directly for this username before rejecting.
  loginInFlight = true;
  errEl.textContent = 'Checking\u2026';
  sbFetch('GET', 'app_users', null, 'username=ilike.' + encodeURIComponent(uname) + '&limit=1').then(function(rows) {
    loginInFlight = false;
    var remote = rows && rows[0] ? sbRowToUser(rows[0]) : null;
    if (!remote || !remote.active || remote.passwordHash !== hashPw(pw)) {
      errEl.textContent = 'Invalid username or password.';
      return;
    }
    // Merge into the local cache so the session can be restored on reload
    var db2 = getDB();
    var idx = db2.appUsers.findIndex(function(u){ return u.id === remote.id || u.username.toLowerCase() === uname; });
    if (idx === -1) db2.appUsers.push(remote); else db2.appUsers[idx] = remote;
    saveDB(db2);
    applyLogin(remote, true);
  }).catch(function() {
    loginInFlight = false;
    errEl.textContent = (user ? 'Invalid username or password.' : 'Cannot reach the server. Check your connection and try again.');
  });
}

function applyLogin(user, showWelcome) {
  currentUser = user;
  isAdmin   = hasRole('admin');
  isFinance = hasRole('finance') || hasRole('admin');
  // Persist session across refreshes
  try { localStorage.setItem(SESSION_KEY, JSON.stringify({id: user.id, username: user.username})); } catch(e){}
  document.getElementById('login-password').value = '';
  document.getElementById('login-error').textContent = '';
  document.getElementById('login-screen').classList.add('hidden');
  updateSessionUI();
  showSection('dashboard');
  if (showWelcome) {
    toast('Welcome, ' + user.name + '!', 'gold');
    requestNotifPermission();
  }
}

function appLogout() {
  currentUser = null;
  isAdmin = false;
  isFinance = false;
  try { localStorage.removeItem(SESSION_KEY); } catch(e){}
  document.getElementById('login-username').value = '';
  document.getElementById('login-password').value = '';
  document.getElementById('login-error').textContent = '';
  document.getElementById('login-screen').classList.remove('hidden');
  updateSessionUI();
  closeDrawer();
}

// ── Push Notifications (Web Push via Service Worker) ───────────
var swRegistration = null;

// Dead legacy FCM endpoint pattern (shut down June 2024)
function isLegacyEndpoint(endpoint) {
  return endpoint && endpoint.indexOf('fcm.googleapis.com/fcm/send') !== -1;
}

function updateNotifStatusUI() {
  var dot   = document.getElementById('notif-status-dot');
  var label = document.getElementById('notif-btn-label');
  if (!dot || !label) return;

  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    dot.style.color = 'rgba(255,100,100,.8)';
    label.textContent = 'Notifications not supported';
    return;
  }
  var perm = Notification.permission;
  if (perm === 'denied') {
    dot.style.color = 'rgba(255,100,100,.8)';
    label.textContent = 'Notifications blocked';
    return;
  }
  if (!swRegistration) {
    dot.style.color = 'rgba(255,200,0,.8)';
    label.textContent = 'Enable Notifications';
    return;
  }
  swRegistration.pushManager.getSubscription().then(function(sub) {
    if (!sub || isLegacyEndpoint(sub.endpoint)) {
      dot.style.color = 'rgba(255,200,0,.8)';
      label.textContent = sub ? 'Refresh notifications' : 'Enable Notifications';
    } else {
      dot.style.color = 'rgba(100,255,150,.9)';
      label.textContent = 'Notifications active';
    }
  });
}

function requestNotifPermission() {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) return;
  if (Notification.permission === 'denied') return;
  Notification.requestPermission().then(function(perm) {
    if (perm === 'granted') registerPushSubscription();
  });
}

function registerPushSubscription() {
  if (!swRegistration || !currentUser) return;
  var userId   = currentUser.id;
  var username = currentUser.username;
  var btn = document.getElementById('btn-enable-notif');
  var label = document.getElementById('notif-btn-label');

  function setBtnBusy(msg) {
    if (btn) btn.disabled = true;
    if (label) label.textContent = msg;
  }
  function setBtnIdle() {
    if (btn) btn.disabled = false;
    updateNotifStatusUI();
  }

  setBtnBusy('Fetching key…');

  fetch('/api/push/vapid-public-key')
    .then(function(r){ return r.json(); })
    .then(function(data) {
      var vapidKey = urlBase64ToUint8Array(data.key);
      setBtnBusy('Clearing old subscription…');
      return swRegistration.pushManager.getSubscription().then(function(existing) {
        if (existing) {
          console.log('[Push] Unsubscribing old:', existing.endpoint.slice(0,60));
          return existing.unsubscribe().catch(function(){});
        }
      }).then(function() {
        setBtnBusy('Registering with push server…');
        console.log('[Push] Calling pushManager.subscribe()…');
        // Race subscribe against a 15s timeout so it never hangs forever
        var subscribePromise = swRegistration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: vapidKey
        });
        var timeoutPromise = new Promise(function(_, reject) {
          setTimeout(function() { reject(new Error('subscribe() timed out after 15s — check network/firewall')); }, 15000);
        });
        return Promise.race([subscribePromise, timeoutPromise]);
      });
    })
    .then(function(sub) {
      var subJson = sub.toJSON();
      console.log('[Push] Got subscription, endpoint:', subJson.endpoint.slice(0, 80));
      setBtnBusy('Saving subscription…');
      return fetch('/api/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: userId, subscription: subJson })
      });
    })
    .then(function(r) {
      if (r.ok) {
        console.log('[Push] Saved for', username);
        toast('Notifications enabled', 'success');
      } else {
        console.warn('[Push] Server rejected subscription');
        toast('Could not save subscription', 'error');
      }
      setBtnIdle();
    })
    .catch(function(err) {
      console.warn('[Push] Failed:', err.message);
      toast('Failed: ' + err.message, 'error');
      setBtnIdle();
    });
}

function urlBase64ToUint8Array(base64String) {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  var raw = atob(base64);
  var output = new Uint8Array(raw.length);
  for (var i = 0; i < raw.length; i++) output[i] = raw.charCodeAt(i);
  return output;
}

// Called after task is saved — sends push to assigned users via /api/push/send
function sendTaskPush(taskTitle, assignedUserIds) {
  if (!assignedUserIds || !assignedUserIds.length) return;
  fetch('/api/push/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userIds: assignedUserIds,
      title: 'New task: ' + taskTitle,
      body: 'You have been assigned a new task.',
      url: '/'
    })
  }).then(function(r){ return r.json(); }).then(function(d){
    console.log('[Push] Sent:', d);
  }).catch(function(e){
    console.warn('[Push] Send failed:', e.message);
  });
}

// Register the service worker on page load (force update to clear stale SW)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(function(reg) {
    swRegistration = reg;
    // Force the new SW to activate immediately if waiting
    if (reg.waiting) { reg.waiting.postMessage({ type: 'SKIP_WAITING' }); }
    reg.update(); // Check for updated SW
    console.log('[SW] Registered, scope:', reg.scope);
    // If already granted and user is logged in, subscribe immediately
    if (Notification.permission === 'granted' && currentUser) {
      registerPushSubscription();
    }
  }).catch(function(err) {
    console.warn('[SW] Registration failed:', err.message);
  });
}

function updateSessionUI() {
  var canShiftEdit = isAdmin || hasRole('shift_mgr');

  // Topbar logout button
  var logoutBtn = document.getElementById('btn-app-logout');
  var unameSpan = document.getElementById('topbar-username');
  var roleInfo  = document.getElementById('topbar-role-info');
  if (currentUser) {
    if (logoutBtn) logoutBtn.style.display = 'flex';
    if (unameSpan) unameSpan.textContent = currentUser.name.split(' ')[0];
    var badges = (currentUser.roles||[]).map(function(r){
      var labels = {admin:'<i class="fas fa-crown"></i> Admin',finance:'<i class="fas fa-euro-sign"></i> Finance',shift_mgr:'<i class="fas fa-calendar-days"></i> Shifts',employee:'<i class="fas fa-user"></i> Employee'};
      var cls    = {admin:'admin',finance:'finance',shift_mgr:'shift_mgr',employee:'employee'};
      return '<span class="role-chip '+(cls[r]||'employee')+'">'+(labels[r]||r)+'</span>';
    }).join('');
    if (roleInfo) roleInfo.innerHTML = badges;
    var dname = document.getElementById('drawer-user-name');
    var dsub  = document.getElementById('drawer-user-sub');
    var davt  = document.getElementById('drawer-avatar');
    if (dname) dname.textContent = currentUser.name;
    if (dsub)  dsub.textContent  = (currentUser.roles||[]).map(function(r){ return r.charAt(0).toUpperCase()+r.slice(1).replace('_',' '); }).join(' · ');
    if (davt)  davt.textContent  = currentUser.name.charAt(0).toUpperCase();
  } else {
    if (logoutBtn) logoutBtn.style.display = 'none';
    if (roleInfo)  roleInfo.innerHTML = '';
    var dname2 = document.getElementById('drawer-user-name');
    var dsub2  = document.getElementById('drawer-user-sub');
    var davt2  = document.getElementById('drawer-avatar');
    if (dname2) dname2.textContent = '—';
    if (dsub2)  dsub2.textContent  = 'Not signed in';
    if (davt2)  davt2.textContent  = '?';
  }

  // ── Drawer nav visibility ──────────────────────────────────────
  // Home / Stock / Book → everyone
  // Shifts               → everyone
  // Finance              → finance + admin only
  // Tasks / Box / Users / Settings → admin only
  function dshow(id, visible) {
    var el = document.getElementById(id);
    if (el) el.style.display = visible ? 'flex' : 'none';
  }
  dshow('ditem-dashboard',    true);
  dshow('ditem-inventory',    true);
  dshow('ditem-reservations', true);
  dshow('ditem-shifts',       true);
  dshow('ditem-finance',      isFinance);
  dshow('ditem-tasks',        true);  // visible to all — filter inside renderTasks handles per-user
  dshow('ditem-blackbox',     isAdmin);
  dshow('ditem-users',        isAdmin);
  dshow('ditem-settings',     isAdmin);

  // ── Bottom nav visibility ──────────────────────────────────────
  function bshow(id, visible) {
    var el = document.getElementById(id);
    if (el) el.style.display = visible ? '' : 'none';
  }
  bshow('bnav-dashboard',    true);
  bshow('bnav-inventory',    true);
  bshow('bnav-reservations', true);
  bshow('bnav-shifts',       true);
  bshow('bnav-finance',      isFinance);
  bshow('bnav-tasks',        true);   // visible to all — filter inside renderTasks handles per-user
  bshow('bnav-blackbox',     isAdmin);

  // ── Shift edit buttons (shift_mgr + admin only) ────────────────
  var addShiftBtn = document.getElementById('btn-add-shift');
  if (addShiftBtn) addShiftBtn.style.display = canShiftEdit ? 'flex' : 'none';
  var repShiftBtn = document.getElementById('btn-repeat-week');
  if (repShiftBtn) repShiftBtn.style.display = canShiftEdit ? 'flex' : 'none';
}

// Legacy stubs so old call sites don't crash
function openAdminLogin(cb) { /* replaced by login screen */ if(cb) cb(); }
function adminLogout() { appLogout(); }
function updateAdminUI() { updateSessionUI(); }
function handlePinKey() {}
function updatePinDisplay() {}

// ================================================
// FINANCE ACCESS (role-based, stubs kept for compatibility)
// ================================================
function openFinanceLogin(cb) { if(cb) cb(); }
function financeLogout() { }
function updateFinanceUI() { }
function handleFinPinKey() {}
function updateFinPinDisplay() {}

function changeFinancePin() {
  var np = document.getElementById('new-finance-pin').value;
  var cp = document.getElementById('confirm-finance-pin').value;
  if (!/^\d{4}$/.test(np)) { toast('Finance PIN must be 4 digits','error'); return; }
  if (np !== cp) { toast('PINs do not match','error'); return; }
  var db = getDB(); db.financePin = np; saveDB(db);
  document.getElementById('new-finance-pin').value=''; document.getElementById('confirm-finance-pin').value='';
  sbFetch('PATCH','settings',{finance_pin:np},'id=eq.config').catch(function(e){ console.error('finance_pin sync:',e); });
  toast('Finance PIN updated!', 'gold');
}

// ================================================
// DRAWER / NAVIGATION
// ================================================
function openDrawer() { document.getElementById('drawer').classList.add('open'); document.getElementById('drawer-overlay').classList.add('open'); document.body.style.overflow='hidden'; }
function closeDrawer() { document.getElementById('drawer').classList.remove('open'); document.getElementById('drawer-overlay').classList.remove('open'); document.body.style.overflow=''; }

// Lightweight per-section Supabase refresh — fetches only the tables needed,
// updates the local DB cache, then re-renders. No status bar changes, no side effects.
function refreshSection(name) {
  var fetches = [];

  function applyAndRender(mutations, renderFn) {
    Promise.all(fetches).then(function() {
      var db = getDB();
      mutations.forEach(function(m) { m(db); });
      saveDB(db);
      if (currentSection === name) renderFn();
    }).catch(function() {
      if (currentSection === name) renderFn();
    });
  }

  if (name === 'dashboard') {
    fetches = [
      sbFetch('GET','reservations',null,'order=date.asc,time.asc'),
      sbFetch('GET','tasks',null,'order=created_at.desc'),
      sbFetch('GET','inventory',null,'order=name.asc'),
      sbFetch('GET','orders',null,'order=created_at.desc')
    ];
    Promise.all(fetches).then(function(res) {
      var db = getDB();
      if (res[0]) db.reservations = res[0].map(function(x){ return {id:x.id,guestName:x.guest_name,phone:x.phone||'',date:x.date,time:x.time?x.time.slice(0,5):'',guests:x.guests,tables:x.tables||[],notes:x.notes||'',status:x.status,createdAt:x.created_at}; });
      if (res[1]) db.tasks = res[1].map(function(x){ var a=x.assigned_to||[]; if(typeof a==='string'){try{a=JSON.parse(a);}catch(e){a=a?[a]:[];}} if(!Array.isArray(a))a=[]; return {id:x.id,title:x.title,description:x.description||'',category:x.category,priority:x.priority,status:x.status,assignedTo:a,deadline:x.deadline||'',doneAt:x.done_at||'',createdAt:x.created_at,recurrence:x.recurrence||''}; });
      if (res[2]) db.inventory = res[2].map(function(x){ return {id:x.id,name:x.name,category:x.category,unit:x.unit||'',qtyBar:x.qty_bar,qtyStorage:x.qty_storage,minimum:x.minimum,lastEmployee:x.last_employee||'',supplierId:x.supplier_id||'',createdAt:x.created_at,updatedAt:x.updated_at}; });
      if (res[3]) db.orders = res[3].map(function(x){ return {id:x.id,date:x.date||x.created_at,items:Array.isArray(x.items)?x.items:[],status:x.status,supplierId:x.supplier_id||'',amount:parseFloat(x.amount)||0,createdAt:x.created_at}; });
      saveDB(db);
      if (currentSection === name) renderDashboard();
    }).catch(function(){});

  } else if (name === 'inventory') {
    Promise.all([
      sbFetch('GET','inventory',null,'order=name.asc'),
      sbFetch('GET','inv_logs',null,'order=timestamp.desc&limit=300'),
      sbFetch('GET','orders',null,'order=created_at.desc')
    ]).then(function(res) {
      var db = getDB();
      if (res[0]) db.inventory = res[0].map(function(x){ return {id:x.id,name:x.name,category:x.category,unit:x.unit||'',qtyBar:x.qty_bar,qtyStorage:x.qty_storage,minimum:x.minimum,lastEmployee:x.last_employee||'',supplierId:x.supplier_id||'',createdAt:x.created_at,updatedAt:x.updated_at}; });
      if (res[1]) db.invLogs = res[1].map(function(x){ return {id:x.id,action:x.action,item:x.item,employee:x.employee,qtyBar:x.qty_bar,qtyStorage:x.qty_storage,timestamp:x.timestamp}; });
      if (res[2]) db.orders = res[2].map(function(x){ return {id:x.id,date:x.date||x.created_at,items:Array.isArray(x.items)?x.items:[],status:x.status,supplierId:x.supplier_id||'',amount:parseFloat(x.amount)||0,createdAt:x.created_at}; });
      saveDB(db);
      if (currentSection === name) renderInventory();
    }).catch(function(){});

  } else if (name === 'reservations') {
    sbFetch('GET','reservations',null,'order=date.asc,time.asc').then(function(rows) {
      if (!rows) return;
      var db = getDB();
      db.reservations = rows.map(function(x){ return {id:x.id,guestName:x.guest_name,phone:x.phone||'',date:x.date,time:x.time?x.time.slice(0,5):'',guests:x.guests,tables:x.tables||[],notes:x.notes||'',status:x.status,createdAt:x.created_at}; });
      saveDB(db);
      if (currentSection === name) { renderCalendar(); renderAllReservations(); }
    }).catch(function(){});

  } else if (name === 'tasks') {
    sbFetch('GET','tasks',null,'order=created_at.desc').then(function(rows) {
      if (!rows) return;
      var db = getDB();
      db.tasks = rows.map(function(x){ var a=x.assigned_to||[]; if(typeof a==='string'){try{a=JSON.parse(a);}catch(e){a=a?[a]:[];}} if(!Array.isArray(a))a=[]; return {id:x.id,title:x.title,description:x.description||'',category:x.category,priority:x.priority,status:x.status,assignedTo:a,deadline:x.deadline||'',doneAt:x.done_at||'',createdAt:x.created_at,recurrence:x.recurrence||''}; });
      saveDB(db);
      if (currentSection === name) renderTasks();
    }).catch(function(){});

  } else if (name === 'shifts') {
    Promise.all([
      sbFetchAll('shifts','order=week_start.desc,day.asc,id.asc'),
      sbFetchAll('absences','order=date.desc,id.asc'),
      sbFetch('GET','employees',null,'order=name.asc')
    ]).then(function(res) {
      var db = getDB();
      if (res[0]) db.shifts = res[0].map(function(x){ return {id:x.id,employee:x.employee,day:x.day,weekStart:x.week_start,start:x.start_time?x.start_time.slice(0,5):'',end:x.end_time?x.end_time.slice(0,5):'',role:x.role||'',zone:x.zone||'',dayOff:!!x.day_off,createdAt:x.created_at}; });
      if (res[1]) db.absences = res[1].map(function(x){ return {id:x.id,employee:x.employee,date:x.date,weekStart:x.week_start,justified:!!x.justified,createdAt:x.created_at}; });
      if (res[2]) db.employees = res[2].map(function(x){ return x.name; });
      saveDB(db);
      if (currentSection === name) renderShifts();
    }).catch(function(){});

  } else if (name === 'blackbox') {
    Promise.all([
      sbFetch('GET','bb_menu',null,'order=category.asc,name.asc'),
      sbFetch('GET','bb_entries',null,'order=date.desc&limit=90')
    ]).then(function(res) {
      var db = getDB();
      if (res[0]) db.bbMenu = res[0].map(function(x){ return {id:x.id,name:x.name,price:parseFloat(x.price)||0,category:x.category}; });
      if (res[1]) db.bbEntries = res[1].map(function(x){ return {id:x.id,date:x.date,items:x.items||[],total:parseFloat(x.total)||0,savedAt:x.saved_at}; });
      saveDB(db);
      if (currentSection === name) renderBlackBox();
    }).catch(function(){});

  } else if (name === 'finance') {
    sbFetch('GET','fin_entries',null,'order=date.desc&limit=365').then(function(rows) {
      if (!rows) return;
      var db = getDB();
      db.finEntries = rows.map(function(r){ return {
        id:r.id, date:r.date,
        t51:parseFloat(r.t51)||0, multibanco:parseFloat(r.multibanco)||0,
        totalDay:parseFloat(r.total_day)||0, invoiced:parseFloat(r.invoiced)||0,
        tips:parseFloat(r.tips)||0, entregar:parseFloat(r.entregar)||0,
        cashNotes:parseFloat(r.cash_notes)||0, coins:parseFloat(r.coins)||0,
        genExpenses:parseFloat(r.gen_expenses)||0, surf:parseFloat(r.surf)||0,
        cashDiff:parseFloat(r.cash_diff)||0,
        savedAt:r.saved_at
      }; });
      saveDB(db);
      if (currentSection === name) renderFinance();
    }).catch(function(){});

  } else if (name === 'users') {
    sbFetch('GET','app_users',null,'order=name.asc').then(function(rows) {
      if (!rows || !rows.length) return;
      var db = getDB();
      db.appUsers = rows.map(function(x){ return {id:x.id,name:x.name,username:x.username,passwordHash:x.password_hash,roles:Array.isArray(x.roles)?x.roles:[],contractStart:x.contract_start||'',contractEnd:x.contract_end||'',hours:x.hours||'',amount:x.amount||'',discount:x.discount||'',insurance:x.insurance||'',clothSize:x.cloth_size||'',notes:x.notes||'',active:x.active!==false,createdAt:x.created_at}; });
      if (!db.appUsers.find(function(u){ return u.id==='admin_seed'; })) {
        db.appUsers.push({id:'admin_seed',name:'Administrator',username:'admin',passwordHash:btoa(unescape(encodeURIComponent('Admin1234'))),roles:['admin','finance','shift_mgr','employee'],contractStart:'',contractEnd:'',hours:'',amount:'',discount:'',insurance:'',clothSize:'',notes:'',active:true,createdAt:new Date().toISOString()});
      }
      saveDB(db);
      if (currentSection === name) renderUsers();
    }).catch(function(){});

  } else if (name === 'settings') {
    Promise.all([
      sbFetch('GET','employees',null,'order=name.asc'),
      sbFetch('GET','settings',null,'id=eq.config')
    ]).then(function(res) {
      var db = getDB();
      if (res[0]) db.employees = res[0].map(function(x){ return x.name; });
      if (res[1] && res[1][0]) {
        var r = res[1][0];
        if (r.tables !== undefined) db.tables = r.tables || db.tables;
        if (r.fundo_caixa !== undefined) db.fundoCaixa = parseFloat(r.fundo_caixa) || 0;
        if (r.budgets !== undefined) {
          var rb = (r.budgets && typeof r.budgets === 'object') ? r.budgets : {};
          ['day','t51','surf'].forEach(function(k) {
            db.budgets[k] = {};
            MONTH_KEYS.forEach(function(m) { db.budgets[k][m] = (rb[k] && rb[k][m] !== undefined) ? parseFloat(rb[k][m]) || 0 : 0; });
          });
        }
      }
      saveDB(db);
      if (currentSection === name) renderSettings();
    }).catch(function(){});
  }
}

function moveBnavMarker() {
  var nav = document.getElementById('bottom-nav'), marker = document.getElementById('bnav-marker');
  if (!nav || !marker) return;
  var icon = nav.querySelector('.bnav-item.active i');
  if (!icon) return;
  var nr = nav.getBoundingClientRect(), ir = icon.getBoundingClientRect();
  if (!nr.width || !ir.width) return;
  marker.style.transform = 'translate(' + (ir.left - nr.left) + 'px,' + (ir.top - nr.top) + 'px)';
}
window.addEventListener('resize', function(){ moveBnavMarker(); });
if (document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ moveBnavMarker(); });
function showSection(name) {
  // Access control by role
  if (!currentUser) { return; }
  if ((name === 'blackbox' || name === 'settings' || name === 'users') && !isAdmin) {
    toast('Admin access required.', 'error'); return;
  }
  if (name === 'finance' && !isFinance) {
    toast('Finance role required.', 'error'); return;
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

  var titles = {dashboard:'Dashboard',inventory:'Inventory',reservations:'Reservations',tasks:'Tasks',shifts:'Shifts',blackbox:'Black Box',finance:'Finance',users:'Users',settings:'Settings'};
  document.getElementById('topbar-title').textContent = titles[name] || 'Bar da Praia';
  moveBnavMarker();
  currentSection = name;
  closeDrawer();

  // Render immediately from local cache (instant UI)
  if (name === 'dashboard')    renderDashboard();
  if (name === 'inventory')    { renderInventory(); renderSuppliers(); renderInvLogSupplierFilter(); }
  if (name === 'reservations') { renderCalendar(); renderAllReservations(); }
  if (name === 'tasks')        renderTasks();
  if (name === 'shifts')       renderShifts();
  if (name === 'blackbox')     renderBlackBox();
  if (name === 'finance')      renderFinance();
  if (name === 'users')        renderUsers();
  if (name === 'settings')     renderSettings();

  // Re-fetch only the relevant tables for this section, then re-render
  refreshSection(name);
}

// ================================================
// USERS MANAGEMENT
// ================================================
var ROLE_LABELS = {admin:'<i class="fas fa-crown"></i> Admin', finance:'<i class="fas fa-euro-sign"></i> Finance', shift_mgr:'<i class="fas fa-calendar-days"></i> Shift Mgr', employee:'<i class="fas fa-user"></i> Employee'};
var ROLE_COLORS = {admin:'#b7791f', finance:'#6d4fc2', shift_mgr:'#2b8a4b', employee:'#2a9683'};

function renderUsers() {
  var el = document.getElementById('users-list');
  if (!el) return;
  var db = getDB();
  var users = db.appUsers || [];
  if (users.length === 0) {
    el.innerHTML = '<div class="empty-state"><i class="fas fa-users"></i><p>No users yet. Add the first user!</p></div>';
    return;
  }
  el.innerHTML = users.map(function(u) {
    var roleBadges = (u.roles||[]).map(function(r) {
      return '<span style="background:'+( ROLE_COLORS[r]||'#5f7079')+'22;color:'+(ROLE_COLORS[r]||'#5f7079')+';border:1px solid '+(ROLE_COLORS[r]||'#5f7079')+'44;border-radius:20px;padding:2px 8px;font-size:11px;font-weight:700">'+(ROLE_LABELS[r]||r)+'</span>';
    }).join('');
    var isSelf = currentUser && currentUser.id === u.id;
    var contractInfo = '';
    if (u.contractStart) contractInfo += '<span style="font-size:11px;color:var(--ocean-400)"><i class="fas fa-calendar-alt"></i> From '+esc(u.contractStart)+(u.contractEnd?' → '+esc(u.contractEnd):'')+'</span> ';
    if (u.hours) contractInfo += '<span style="font-size:11px;color:var(--ocean-400)"><i class="fas fa-clock"></i> '+esc(u.hours)+'h/wk</span> ';
    if (u.amount) contractInfo += '<span style="font-size:11px;color:var(--ocean-400)"><i class="fas fa-euro-sign"></i> '+esc(u.amount)+'</span>';
    return '<div style="background:white;border:1.5px solid var(--ocean-100);border-radius:14px;padding:14px 16px;margin-bottom:10px;display:flex;align-items:flex-start;gap:12px">'
      +'<div style="width:40px;height:40px;background:var(--ocean-500));border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-weight:800;font-size:16px;flex-shrink:0">'
        +esc(u.name.charAt(0).toUpperCase())
      +'</div>'
      +'<div style="flex:1;min-width:0">'
        +'<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:4px">'
          +'<span style="font-weight:800;font-size:14px;color:var(--ocean-900)">'+esc(u.name)+'</span>'
          +'<span style="font-size:12px;color:var(--ocean-400)">@'+esc(u.username)+'</span>'
          +(u.active===false?'<span style="background:#fbeae7;color:#b4402f;border-radius:20px;padding:2px 8px;font-size:11px;font-weight:700">Inactive</span>':'<span style="background:#e3f4e8;color:#2b8a4b;border-radius:20px;padding:2px 8px;font-size:11px;font-weight:700">Active</span>')
          +(isSelf?'<span style="background:#fdf3e1;color:var(--amber-700);border-radius:20px;padding:2px 8px;font-size:11px;font-weight:700">You</span>':'')
        +'</div>'
        +'<div style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:6px">'+roleBadges+'</div>'
        +(contractInfo?'<div style="display:flex;gap:10px;flex-wrap:wrap">'+contractInfo+'</div>':'')
        +(u.notes?'<div style="font-size:12px;color:var(--ocean-500);margin-top:4px;font-style:italic">'+esc(u.notes)+'</div>':'')
      +'</div>'
      +'<div style="display:flex;gap:6px;flex-shrink:0">'
        +'<button class="btn btn-sm" style="background:var(--ocean-50);color:var(--ocean-700);border:1px solid var(--ocean-200)" data-edit-user="'+esc(u.id)+'"><i class="fas fa-pen"></i></button>'
        +(isSelf?'':'<button class="btn btn-sm" style="background:#fbeae7;color:#b4402f;border:1px solid #f0b8ae" data-delete-user="'+esc(u.id)+'"><i class="fas fa-trash"></i></button>')
      +'</div>'
    +'</div>';
  }).join('');
}

function openUserModal(userId) {
  editUserId = userId || null;
  // Reset form
  ['user-name','user-username','user-password','user-password2','user-contract-start','user-contract-end','user-hours','user-amount','user-discount','user-insurance','user-notes'].forEach(function(id){
    var el = document.getElementById(id); if (el) el.value = '';
  });
  document.querySelectorAll('.user-role-cb').forEach(function(cb){ cb.checked = false; });
  var sizeEl = document.getElementById('user-cloth-size'); if (sizeEl) sizeEl.value = '';
  var activeEl = document.getElementById('user-active'); if (activeEl) activeEl.checked = true;
  var titleEl = document.getElementById('user-modal-title');
  var pwLabel = document.querySelector('label[for="user-password"], #modal-add-user label');
  var pwFields = document.querySelector('#user-password');

  if (userId) {
    // Edit mode
    if (titleEl) titleEl.textContent = ' Edit User';
    var db = getDB();
    var u = db.appUsers.find(function(x){ return x.id === userId; });
    if (!u) return;
    var setVal = function(id, v){ var el=document.getElementById(id); if(el) el.value=v||''; };
    setVal('user-name', u.name);
    setVal('user-username', u.username);
    // Don't pre-fill password — leave blank means no change
    setVal('user-contract-start', u.contractStart);
    setVal('user-contract-end', u.contractEnd);
    setVal('user-hours', u.hours);
    setVal('user-amount', u.amount);
    setVal('user-discount', u.discount);
    setVal('user-insurance', u.insurance);
    setVal('user-cloth-size', u.clothSize);
    setVal('user-notes', u.notes);
    if (activeEl) activeEl.checked = u.active !== false;
    (u.roles||[]).forEach(function(r){
      var cb = document.querySelector('.user-role-cb[value="'+r+'"]');
      if (cb) cb.checked = true;
    });
    // Update password placeholder
    if (pwFields) pwFields.placeholder = 'Leave blank to keep current';
  } else {
    if (titleEl) titleEl.textContent = ' Add User';
    if (pwFields) pwFields.placeholder = 'Min 6 chars';
  }
  openModal('modal-add-user');
}

function saveUserModal() {
  var name     = (document.getElementById('user-name').value||'').trim();
  var username = (document.getElementById('user-username').value||'').trim().toLowerCase();
  var pw       = (document.getElementById('user-password').value||'');
  var pw2      = (document.getElementById('user-password2').value||'');
  var roles    = Array.from(document.querySelectorAll('.user-role-cb:checked')).map(function(cb){ return cb.value; });
  var active   = document.getElementById('user-active').checked;

  if (!name)     { toast('Name is required', 'error'); return; }
  if (!username) { toast('Username is required', 'error'); return; }
  if (!/^[a-z0-9_.-]+$/.test(username)) { toast('Username: only letters, numbers, . _ -', 'error'); return; }
  if (roles.length === 0) { toast('At least one role is required', 'error'); return; }

  var db = getDB();

  if (!editUserId) {
    // Add mode — password required
    if (!pw) { toast('Password is required', 'error'); return; }
    if (pw.length < 6) { toast('Password must be at least 6 characters', 'error'); return; }
    if (pw !== pw2) { toast('Passwords do not match', 'error'); return; }
    // Check duplicate username
    if (db.appUsers.find(function(u){ return u.username.toLowerCase() === username; })) {
      toast('Username already taken', 'error'); return;
    }
    var newUser = {
      id: uid(),
      name: name,
      username: username,
      passwordHash: hashPw(pw),
      roles: roles,
      contractStart: document.getElementById('user-contract-start').value||'',
      contractEnd:   document.getElementById('user-contract-end').value||'',
      hours:         document.getElementById('user-hours').value||'',
      amount:        document.getElementById('user-amount').value||'',
      discount:      document.getElementById('user-discount').value||'',
      insurance:     document.getElementById('user-insurance').value||'',
      clothSize:     document.getElementById('user-cloth-size').value||'',
      notes:         document.getElementById('user-notes').value||'',
      active:        active,
      createdAt:     new Date().toISOString()
    };
    db.appUsers.push(newUser);
    saveDB(db);
    closeModal('modal-add-user');
    renderUsers();
    toast('User '+name+' created!', 'gold');
    syncUserToSb(newUser, 'POST');
  } else {
    // Edit mode
    var idx = db.appUsers.findIndex(function(u){ return u.id === editUserId; });
    if (idx === -1) { toast('User not found', 'error'); return; }
    var existing = db.appUsers[idx];
    // Check duplicate username (excluding self)
    if (db.appUsers.find(function(u){ return u.username.toLowerCase() === username && u.id !== editUserId; })) {
      toast('Username already taken', 'error'); return;
    }
    // Only update password if a new one is provided
    if (pw) {
      if (pw.length < 6) { toast('Password must be at least 6 characters', 'error'); return; }
      if (pw !== pw2) { toast('Passwords do not match', 'error'); return; }
      existing.passwordHash = hashPw(pw);
    }
    existing.name          = name;
    existing.username      = username;
    existing.roles         = roles;
    existing.contractStart = document.getElementById('user-contract-start').value||'';
    existing.contractEnd   = document.getElementById('user-contract-end').value||'';
    existing.hours         = document.getElementById('user-hours').value||'';
    existing.amount        = document.getElementById('user-amount').value||'';
    existing.discount      = document.getElementById('user-discount').value||'';
    existing.insurance     = document.getElementById('user-insurance').value||'';
    existing.clothSize     = document.getElementById('user-cloth-size').value||'';
    existing.notes         = document.getElementById('user-notes').value||'';
    existing.active        = active;
    db.appUsers[idx] = existing;
    saveDB(db);
    // If editing self, refresh currentUser
    if (currentUser && currentUser.id === editUserId) {
      currentUser = existing;
      isAdmin   = hasRole('admin');
      isFinance = hasRole('finance') || hasRole('admin');
      updateSessionUI();
    }
    closeModal('modal-add-user');
    renderUsers();
    toast('User updated!', 'gold');
    syncUserToSb(existing, 'PATCH');
  }
}

function deleteUser(userId) {
  if (!confirm('Delete this user? This cannot be undone.')) return;
  var db = getDB();
  var u = db.appUsers.find(function(x){ return x.id === userId; });
  if (!u) return;
  db.appUsers = db.appUsers.filter(function(x){ return x.id !== userId; });
  saveDB(db);
  renderUsers();
  toast('User deleted.', 'error');
  sbFetch('DELETE','app_users',null,'id=eq.'+encodeURIComponent(userId)).catch(function(){});
}

function syncUserToSb(user, method) {
  function dateOrNull(v) { return (v && String(v).trim() !== '') ? v : null; }
  function numOrNull(v)  { var n = parseFloat(v); return isNaN(n) ? null : n; }

  var payload = {
    id:             user.id,
    name:           user.name,
    username:       user.username,
    password_hash:  user.passwordHash,
    roles:          Array.isArray(user.roles) ? user.roles : [],
    contract_start: dateOrNull(user.contractStart),
    contract_end:   dateOrNull(user.contractEnd),
    hours:          user.hours||null,
    amount:         numOrNull(user.amount),
    discount:       numOrNull(user.discount),
    insurance:      user.insurance||null,
    cloth_size:     user.clothSize||null,
    notes:          user.notes||null,
    active:         user.active !== false,
    created_at:     user.createdAt||new Date().toISOString()
  };

  // Always use POST with on_conflict=id (true upsert — works for both insert and update)
  var url = SB_URL + '/rest/v1/app_users?on_conflict=id';
  fetch(url, {
    method: 'POST',
    headers: {
      'apikey': SB_KEY,
      'Authorization': 'Bearer ' + SB_KEY,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation,resolution=merge-duplicates'
    },
    body: JSON.stringify(payload)
  }).then(function(r) {
    var status = r.status;
    return r.text().then(function(text) {
      // Show full raw response so we know exactly what happened
      console.log('[syncUserToSb] HTTP '+status+' response: '+text);
      if (status === 200 || status === 201) {
        toast('User synced (HTTP '+status+')');
      } else {
        toast('Sync FAILED HTTP '+status+': '+text.slice(0,120), 'error');
      }
    });
  }).catch(function(e) {
    toast('Sync FAILED (network): '+String(e), 'error');
    console.error('[syncUserToSb] network error:', e);
  });
}

// ================================================
// EMPLOYEES
// ================================================
function getEmployees() { return getDB().employees; }
function addEmployee() {
  // Support both settings input (legacy) and shifts team tab input
  var inp = document.getElementById('shifts-new-employee-name') || document.getElementById('new-employee-name');
  if (!inp) return;
  var name = inp.value.trim(); if (!name) return;
  var db = getDB();
  if (db.employees.indexOf(name) !== -1) { toast('Already exists!','error'); return; }
  db.employees.push(name); saveDB(db); inp.value=''; renderShiftsTeamTab(); updateAllDropdowns(); toast('Adding...');
  sbFetch('POST','employees',{name:name}).then(function(){
    toast('Employee added!');
  }).catch(function(){ toast('Saved locally (sync later)','error'); });
}
function removeEmployee(name) {
  if (!confirm('Remove '+name+' from the team?')) return;
  var db=getDB(); db.employees=db.employees.filter(function(e){return e!==name;});
  var fromWs=toDateStr(getWeekStart(0));
  var future=db.shifts.filter(function(s){return s.employee===name&&s.weekStart>=fromWs;});
  if (future.length>0 && confirm('Also remove '+name+"'s "+future.length+' shifts from this week onwards? Earlier weeks are kept for hours and tips.')) {
    db.shifts=db.shifts.filter(function(s){return !(s.employee===name&&s.weekStart>=fromWs);});
    sbFetch('DELETE','shifts',null,'employee=eq.'+encodeURIComponent(name)+'&week_start=gte.'+fromWs).catch(function(){ toast('Shifts removed locally only','error'); });
  }
  saveDB(db); if (typeof renderShifts==='function') renderShifts();
  renderShiftsTeamTab(); updateAllDropdowns();
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
  // Populate supplier dropdown in inventory modal
  var supSel=document.getElementById('inv-supplier');
  if(supSel){
    var db=getDB();
    var supOpts='<option value="">-- No Supplier --</option>'+(db.suppliers||[]).map(function(s){return '<option value="'+esc(s.id)+'">'+esc(s.name)+'</option>';}).join('');
    var curSup=supSel.value; supSel.innerHTML=supOpts; supSel.value=curSup;
  }
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
function saveFundoCaixa() {
  var raw = (document.getElementById('settings-fundo').value || '').trim().replace(',', '.');
  var val = parseFloat(raw) || 0;
  var db = getDB(); db.fundoCaixa = val; saveDB(db);
  toast('Saving...', 'gold');
  sbFetch('PATCH','settings',{fundo_caixa:val},'id=eq.config')
    .then(function(){ toast('Fundo de Caixa saved & synced!', 'gold'); })
    .catch(function(e){ console.error('fundo sync failed:',e); toast('Saved locally — sync failed','error'); });
}
function parseBudgetVal(s){ return parseFloat((s||'').trim().replace(',','.'))||0; }
function saveBudgets() {
  var db = getDB();
  var b = db.budgets;
  var yearDay=0, yearT51=0, yearSurf=0;
  MONTH_KEYS.forEach(function(m){
    var d=parseBudgetVal(document.getElementById('bud-day-'+m) ?document.getElementById('bud-day-'+m).value:'');
    var t=parseBudgetVal(document.getElementById('bud-t51-'+m) ?document.getElementById('bud-t51-'+m).value:'');
    var s=parseBudgetVal(document.getElementById('bud-surf-'+m)?document.getElementById('bud-surf-'+m).value:'');
    b.day[m]=d; b.t51[m]=t; b.surf[m]=s;
    yearDay+=d; yearT51+=t; yearSurf+=s;
  });
  saveDB(db);
  // Update year-total footer
  var yd=document.getElementById('budget-year-day');   if(yd)  yd.textContent =fmtEur(yearDay);
  var yt=document.getElementById('budget-year-t51');   if(yt)  yt.textContent =fmtEur(yearT51);
  var ys=document.getElementById('budget-year-surf');  if(ys)  ys.textContent =fmtEur(yearSurf);
  toast('Saving budgets...', 'gold');
  sbFetch('PATCH','settings',{budgets:db.budgets},'id=eq.config')
    .then(function(){ toast('Budgets saved & synced!', 'gold'); })
    .catch(function(e){
      console.error('Budget sync failed:', e);
      toast('Saved locally — Supabase sync failed (run migration SQL)', 'error');
    });
}
function renderSettings() {
  var settingsLocked = document.getElementById('settings-locked');
  var settingsContent = document.getElementById('settings-content');
  // Always update notification status (visible to all users)
  updateNotifStatusUI();
  if (!isAdmin) {
    settingsLocked.style.display = 'flex';
    settingsContent.style.display = 'none';
    return;
  }
  settingsLocked.style.display = 'none';
  settingsContent.style.display = 'block';

  var db = getDB();
  // employee-list was moved to Shifts → Team tab, skip here

  // Table config
  var tg = document.getElementById('table-num-grid');
  tg.innerHTML = db.tables.map(function(t){
    return '<div class="table-num-chip">'+esc(t)+'<button class="del-chip" data-del-table="'+esc(t)+'">&times;</button></div>';
  }).join('');

  document.getElementById('sb-url').value = SB_URL;
  document.getElementById('sb-key').value = SB_KEY.slice(0,30) + '...';
  var fundoEl = document.getElementById('settings-fundo');
  if (fundoEl) fundoEl.value = db.fundoCaixa || '';
  // Render budget month table
  var tbody = document.getElementById('budget-months-body');
  if (tbody) {
    var b = db.budgets; var yearDay=0,yearT51=0,yearSurf=0;
    tbody.innerHTML = MONTH_KEYS.map(function(m,i){
      var d=b.day[m]||0, t=b.t51[m]||0, s=b.surf[m]||0;
      yearDay+=d; yearT51+=t; yearSurf+=s;
      var iStyle='width:100%;border:1px solid var(--ocean-100);border-radius:6px;padding:4px 6px;font-size:12px;text-align:right;background:white;outline:none;';
      return '<tr style="border-bottom:1px solid var(--ocean-50)">'
        +'<td style="padding:5px 8px;font-weight:700;color:var(--ocean-700)">'+MONTH_NAMES[i]+'</td>'
        +'<td style="padding:3px 4px"><input type="text" inputmode="decimal" id="bud-day-'+m+'" value="'+(d||'')+'" placeholder="0" style="'+iStyle+'color:#6d4fc2" /></td>'
        +'<td style="padding:3px 4px"><input type="text" inputmode="decimal" id="bud-t51-'+m+'" value="'+(t||'')+'" placeholder="0" style="'+iStyle+'color:#2a9683" /></td>'
        +'<td style="padding:3px 4px"><input type="text" inputmode="decimal" id="bud-surf-'+m+'" value="'+(s||'')+'" placeholder="0" style="'+iStyle+'color:#2a9683" /></td>'
        +'</tr>';
    }).join('');
    var yd=document.getElementById('budget-year-day');  if(yd)  yd.textContent=fmtEur(yearDay);
    var yt=document.getElementById('budget-year-t51');  if(yt)  yt.textContent=fmtEur(yearT51);
    var ys=document.getElementById('budget-year-surf'); if(ys)  ys.textContent=fmtEur(yearSurf);
  }
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
    updateAllDropdowns();
    showMigrationNotice(sbMissingItems);
    if (sbMissingItems.length === 0) {
      toast('Synced successfully!','gold');
    } else {
      toast('Synced \u2014 but DB migration still needed!', 'error');
    }
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
  refreshSection('finance');
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
  // Set date picker — default to today if not already selected
  var datePicker = document.getElementById('fin-entry-date');
  if (!finSelectedDate) finSelectedDate = toDateStr(new Date());
  if (datePicker) datePicker.value = finSelectedDate;
  loadFinEntryForDate(finSelectedDate);
  if (currentFinTab === 'records') renderFinRecords();
}

var FIN_CHECK_FROM = '2026-03-29'; // only check for gaps after this date

function checkFinMissingDays(dateStr) {
  var warnEl = document.getElementById('fin-missing-warning');
  var listEl = document.getElementById('fin-missing-days-list');
  if (!warnEl || !listEl) return;

  // Only check dates strictly after the cutoff
  if (dateStr <= FIN_CHECK_FROM) { warnEl.style.display = 'none'; return; }

  var db = getDB();
  var saved = {};
  (db.finEntries || []).forEach(function(e){ saved[e.date] = true; });

  // Walk backwards from the day before dateStr down to FIN_CHECK_FROM (exclusive)
  var missing = [];
  var d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() - 1); // start from yesterday relative to selected date
  while (true) {
    var s = toDateStr(d);
    if (s <= FIN_CHECK_FROM) break;
    if (!saved[s]) missing.push(s);
    d.setDate(d.getDate() - 1);
    if (missing.length >= 10) break; // cap display at 10
  }

  if (missing.length === 0) {
    warnEl.style.display = 'none';
  } else {
    // Format each missing date as readable string
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    listEl.innerHTML = missing.map(function(s){
      var parts = s.split('-');
      var label = parseInt(parts[2],10) + ' ' + months[parseInt(parts[1],10)-1] + ' ' + parts[0];
      return '<div style="display:flex;align-items:center;gap:6px"><i class="fas fa-circle" style="font-size:5px;color:#b4402f"></i> ' + label + '</div>';
    }).join('');
    warnEl.style.display = 'block';
  }
}

function applyFinLockState(dateStr) {
  var db = getDB();
  var hasSaved = !!(db.finEntries||[]).find(function(e){ return e.date === dateStr; });
  var actionsEl  = document.getElementById('fin-entry-actions');
  var lockedEl   = document.getElementById('fin-entry-locked');
  var editBtnEl  = document.getElementById('btn-fin-edit-entry');
  var FIN_INPUTS = ['fin-t51','fin-multibanco','fin-invoiced','fin-tips',
                    'fin-gen-expenses','fin-cash-notes','fin-coins','fin-surf'];

  if (hasSaved && !finEditMode) {
    // Locked state — entry exists, not in edit mode
    FIN_INPUTS.forEach(function(id){ var el=document.getElementById(id); if(el){ el.disabled=true; el.style.opacity='0.6'; el.style.background='#f2f5f6'; } });
    if (actionsEl) actionsEl.style.display = 'none';
    if (lockedEl)  { lockedEl.style.display = 'flex'; }
    if (editBtnEl) { editBtnEl.style.display = (isAdmin || isFinance) ? 'flex' : 'none'; }
  } else {
    // Editable state — no entry yet, or admin is editing
    FIN_INPUTS.forEach(function(id){ var el=document.getElementById(id); if(el){ el.disabled=false; el.style.opacity=''; el.style.background=''; } });
    if (actionsEl) actionsEl.style.display = 'block';
    if (lockedEl)  { lockedEl.style.display = 'none'; }
  }
}

function loadFinEntryForDate(dateStr) {
  finSelectedDate = dateStr;
  finEditMode = false; // always reset edit mode when switching date
  var db = getDB();
  var existing = (db.finEntries||[]).find(function(e){ return e.date === dateStr; });
  if (existing) {
    setFinForm(existing);
  } else {
    clearFinanceFields();
  }
  updateFinDayTotal();
  applyFinLockState(dateStr);
  checkFinMissingDays(dateStr);
}

function setFinForm(entry) {
  document.getElementById('fin-t51').value = entry.t51 || '';
  document.getElementById('fin-multibanco').value = entry.multibanco || '';
  document.getElementById('fin-invoiced').value = entry.invoiced || '';
  document.getElementById('fin-tips').value = entry.tips || '';
  document.getElementById('fin-gen-expenses').value = entry.genExpenses || '';
  document.getElementById('fin-cash-notes').value = entry.cashNotes || '';
  document.getElementById('fin-coins').value = entry.coins || '';
  document.getElementById('fin-surf').value = entry.surf || '';
  updateFinDayTotal();
}

// Parse a finance input by id — handles both '.' and ',' as decimal separator (iOS fix)
function finVal(id) {
  var el = document.getElementById(id);
  if (!el) return 0;
  // Replace comma decimal separator (Portuguese/iOS keyboards) with dot
  var raw = el.value.trim().replace(/\s/g, '').replace(',', '.');
  var n = parseFloat(raw);
  return isNaN(n) ? 0 : n;
}

function getFinFormValues() {
  var t51        = finVal('fin-t51');
  var multibanco = finVal('fin-multibanco');
  var invoiced   = finVal('fin-invoiced');
  var genExpenses= finVal('fin-gen-expenses');
  var totalDay   = invoiced + t51;
  var entregar   = Math.max(0, totalDay - multibanco - genExpenses);
  return {
    t51:         t51,
    multibanco:  multibanco,
    invoiced:    invoiced,
    totalDay:    totalDay,
    genExpenses: genExpenses,
    entregar:    entregar,
    tips:        finVal('fin-tips'),
    cashNotes:   finVal('fin-cash-notes'),
    coins:       finVal('fin-coins'),
    surf:        finVal('fin-surf')
  };
}

function updateFinDayTotal() {
  var v = getFinFormValues();
  // Total of day = Invoiced + T51
  var calcEl = document.getElementById('fin-total-day-calc');
  var totalEl = document.getElementById('fin-day-total');
  if (calcEl) calcEl.textContent = fmtEur(v.totalDay);
  if (totalEl) totalEl.textContent = fmtEur(v.totalDay);
  // Entregar = TotalDay - MultiBanco - GenExpenses (auto-calc, write to hidden)
  var entEl = document.getElementById('fin-entregar');
  if (entEl) entEl.value = v.entregar.toFixed(2);
  var entCalcEl = document.getElementById('fin-entregar-calc');
  if (entCalcEl) entCalcEl.textContent = fmtEur(v.entregar);
  // Cash total = Notes + Coins
  var cashTotal = v.cashNotes + v.coins;
  var cashTotalEl = document.getElementById('fin-cash-total-calc');
  if (cashTotalEl) cashTotalEl.textContent = fmtEur(cashTotal);
  // Balance indicator — expected in drawer = Entregar + Fundo de Caixa
  var fundo = getDB().fundoCaixa || 0;
  var expected = v.entregar + fundo;
  var balEl = document.getElementById('fin-cash-balance');
  if (balEl) {
    var diff = cashTotal - expected;
    var absDiff = Math.abs(diff);
    var fundoNote = fundo ? ' <span style="font-size:11px;opacity:.75">(incl. Fundo '+fmtEur(fundo)+')</span>' : '';
    if (absDiff < 0.005) {
      balEl.style.background = '#e3f4e8';
      balEl.innerHTML = '<i class="fas fa-circle-check" style="color:#2b8a4b;font-size:18px"></i><span style="color:#2b8a4b">Balanced — OK</span>'+fundoNote;
    } else if (diff < 0) {
      balEl.style.background = 'var(--red-50)';
      balEl.innerHTML = '<i class="fas fa-triangle-exclamation" style="color:#b4402f;font-size:18px"></i>'
        +'<span style="color:#b4402f">Short by '+fmtEur(absDiff)+'</span>'+fundoNote;
    } else {
      balEl.style.background = '#e3f4e8';
      balEl.innerHTML = '<i class="fas fa-arrow-trend-up" style="color:#2b8a4b;font-size:18px"></i>'
        +'<span style="color:#2b8a4b">Over by '+fmtEur(absDiff)+'</span>'+fundoNote;
    }
  }
}

function saveFinanceEntry() {
  var v = getFinFormValues();
  var saveDate = finSelectedDate || toDateStr(new Date());
  var db = getDB();
  if (!db.finEntries) db.finEntries = [];
  var idx = db.finEntries.findIndex(function(e){ return e.date === saveDate; });
  var fundo = db.fundoCaixa || 0;
  var cashTotal = v.cashNotes + v.coins;
  var expected = v.entregar + fundo;
  var cashDiff = (cashTotal > 0 || expected > 0) ? (cashTotal - expected) : 0;
  var entry = {
    id: idx !== -1 ? db.finEntries[idx].id : uid(),
    date: saveDate,
    t51: v.t51, multibanco: v.multibanco, totalDay: v.totalDay,
    invoiced: v.invoiced, genExpenses: v.genExpenses,
    tips: v.tips, entregar: v.entregar,
    cashNotes: v.cashNotes, coins: v.coins, surf: v.surf,
    cashDiff: cashDiff,
    savedAt: new Date().toISOString()
  };
  if (idx !== -1) { db.finEntries[idx] = entry; } else { db.finEntries.unshift(entry); }
  saveDB(db);
  finEditMode = false; // re-lock after save
  toast('Daily finance entry saved!', 'gold');
  updateFinDayTotal();
  applyFinLockState(saveDate);
  sbFetch(idx !== -1 ? 'PATCH' : 'POST', 'fin_entries',
    { id: entry.id, date: entry.date, t51: entry.t51, multibanco: entry.multibanco,
      total_day: entry.totalDay, invoiced: entry.invoiced,
      gen_expenses: entry.genExpenses, tips: entry.tips,
      entregar: entry.entregar, cash_notes: entry.cashNotes,
      coins: entry.coins, surf: entry.surf,
      saved_at: entry.savedAt },
    idx !== -1 ? 'id=eq.'+entry.id : null
  ).catch(function(){ /* saved locally */ });
}

function clearFinanceFields() {
  ['fin-t51','fin-multibanco','fin-invoiced','fin-tips','fin-gen-expenses','fin-cash-notes','fin-coins','fin-surf'].forEach(function(id){
    var el = document.getElementById(id); if(el) el.value='';
  });
}
function clearFinanceEntry() {
  clearFinanceFields();
  updateFinDayTotal();
}

var finRecDayFilter = '';
function finBudgetDeviation(actual, budget){
  if(!budget||budget<=0) return '';
  var pct = ((actual - budget) / budget * 100);
  var color = pct >= 0 ? '#2b8a4b' : '#b4402f';
  var sign = pct >= 0 ? '+' : '';
  return '<span style="font-size:11px;font-weight:700;color:'+color+'">'+sign+pct.toFixed(1)+'% vs budget</span>';
}
function finStatBox(sumId, avgId, budgetDevId, total, count, budget){
  var el=document.getElementById(sumId); if(el) el.textContent=fmtEur(total);
  var avgEl=document.getElementById(avgId); if(avgEl) avgEl.textContent=count>0?('avg '+fmtEur(total/count)+'/day'):'';
  var bEl=document.getElementById(budgetDevId); if(bEl) bEl.innerHTML=finBudgetDeviation(total,budget);
}
// ── Year charts: budget vs actual per month (one per finance line) ──
var FIN_CHART_LABELS = { day:'Total of the day', t51:'T 51', surf:'Surf' };
function finNiceMax(v) {
  if (!(v > 0)) return 1000;
  var p = Math.pow(10, Math.floor(Math.log10(v)));
  var m = v / p;
  var step = m <= 1 ? 1 : m <= 2 ? 2 : m <= 2.5 ? 2.5 : m <= 5 ? 5 : 10;
  return step * p;
}
function fmtEurShort(v) {
  if (Math.abs(v) >= 1000) { var k = v / 1000; return '€' + (k >= 100 ? Math.round(k) : (Math.round(k * 10) / 10)) + 'k'; }
  return '€' + Math.round(v);
}
function renderFinYearCharts(db, yearStr, curMon) {
  var actual = { day:[], t51:[], surf:[] };
  MONTH_KEYS.forEach(function(){ actual.day.push(0); actual.t51.push(0); actual.surf.push(0); });
  var hasData = { day:[], t51:[], surf:[] };
  MONTH_KEYS.forEach(function(){ hasData.day.push(false); hasData.t51.push(false); hasData.surf.push(false); });
  (db.finEntries||[]).forEach(function(e){
    if (!e.date || e.date.slice(0,4) !== yearStr) return;
    var mi = parseInt(e.date.slice(5,7), 10) - 1; if (mi < 0 || mi > 11) return;
    actual.day[mi] += (e.totalDay||0); actual.t51[mi] += (e.t51||0); actual.surf[mi] += (e.surf||0);
    hasData.day[mi] = hasData.t51[mi] = hasData.surf[mi] = true;
  });
  var bud = db.budgets || { day:{}, t51:{}, surf:{} };
  ['day','t51','surf'].forEach(function(line){
    var el = document.getElementById('fin-chart-' + line); if (!el) return;
    var budget = MONTH_KEYS.map(function(m){ return (bud[line] && bud[line][m]) || 0; });
    el._finChart = { line: line, year: yearStr, curMon: curMon, actual: actual[line], budget: budget, hasData: hasData[line] };
    drawFinYearChart(el);
  });
}
function drawFinYearChart(el) {
  var d = el._finChart; if (!d) return;
  var W = Math.max(280, Math.floor(el.clientWidth || 0)); if (!el.clientWidth) W = 600;
  var H = 150, padL = 40, padR = 6, padT = 16, padB = 22;
  var plotW = W - padL - padR, plotH = H - padT - padB;
  var maxV = 0; d.actual.forEach(function(v){ if (v > maxV) maxV = v; }); d.budget.forEach(function(v){ if (v > maxV) maxV = v; });
  var yMax = finNiceMax(maxV * 1.05);
  var y = function(v){ return padT + plotH - (v / yMax) * plotH; };
  var band = plotW / 12, barW = Math.min(24, Math.round(band * 0.55));
  var curIdx = parseInt(d.curMon, 10) - 1;
  var svg = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" role="img" aria-label="' + FIN_CHART_LABELS[d.line] + ' ' + d.year + ', budget versus actual per month">';
  // grid: 0, half, max
  [0, 0.5, 1].forEach(function(f){
    var gy = y(yMax * f);
    svg += '<line class="' + (f === 0 ? 'fc-axis' : 'fc-grid') + '" x1="' + padL + '" x2="' + (W - padR) + '" y1="' + gy + '" y2="' + gy + '"/>';
    svg += '<text class="fc-tick" x="' + (padL - 6) + '" y="' + (gy + 3) + '" text-anchor="end">' + fmtEurShort(yMax * f) + '</text>';
  });
  for (var i = 0; i < 12; i++) {
    var cx = padL + band * i + band / 2, a = d.actual[i], b = d.budget[i];
    var isNow = i === curIdx;
    var diff = b > 0 ? Math.round((a - b) / b * 100) : null;
    var tip = MONTH_NAMES[i] + ' ' + d.year + ': actual ' + fmtEur(a) + (b > 0 ? ' · budget ' + fmtEur(b) + ' (' + (diff >= 0 ? '+' : '') + diff + '%)' : ' · no budget');
    svg += '<g class="fc-month-g" tabindex="0" data-i="' + i + '"><title>' + tip + '</title>';
    svg += '<rect class="fc-hit" x="' + (padL + band * i) + '" y="' + padT + '" width="' + band + '" height="' + plotH + '"/>';
    if (d.hasData[i] && a > 0) {
      var top = y(a), x0 = cx - barW / 2, r = Math.min(4, barW / 2), h = padT + plotH - top;
      if (h > r) svg += '<path class="fc-bar' + (isNow ? ' now' : '') + '" d="M' + x0 + ' ' + (padT + plotH) + ' V' + (top + r) + ' a' + r + ' ' + r + ' 0 0 1 ' + r + ' -' + r + ' h' + (barW - 2 * r) + ' a' + r + ' ' + r + ' 0 0 1 ' + r + ' ' + r + ' V' + (padT + plotH) + ' Z"/>';
      else svg += '<rect class="fc-bar' + (isNow ? ' now' : '') + '" x="' + x0 + '" y="' + top + '" width="' + barW + '" height="' + h + '"/>';
      if (isNow) { var labelY = Math.min(top, b > 0 ? y(b) : top) - 6; svg += '<text class="fc-label" x="' + cx + '" y="' + labelY + '" text-anchor="middle">' + fmtEurShort(a) + '</text>'; }
    }
    if (b > 0) { var by = y(b); svg += '<line class="fc-budget" x1="' + (cx - barW / 2 - 3) + '" x2="' + (cx + barW / 2 + 3) + '" y1="' + by + '" y2="' + by + '"/>'; }
    svg += '<text class="fc-month' + (isNow ? ' now' : '') + '" x="' + cx + '" y="' + (H - 7) + '" text-anchor="middle">' + (band >= 40 ? MONTH_NAMES[i] : MONTH_NAMES[i].charAt(0)) + '</text>';
    svg += '</g>';
  }
  svg += '</svg>';
  var rows = ''; var totA = 0, totB = 0;
  for (var j = 0; j < 12; j++) {
    var a2 = d.actual[j], b2 = d.budget[j]; totA += a2; totB += b2;
    var df = (d.hasData[j] && b2 > 0) ? a2 - b2 : null;
    rows += '<tr' + (j === curIdx ? ' class="now"' : '') + '><td>' + MONTH_NAMES[j] + '</td><td>' + (d.hasData[j] ? fmtEur(a2) : '—') + '</td><td>' + (b2 > 0 ? fmtEur(b2) : '—') + '</td><td class="' + (df === null ? '' : df < 0 ? 'neg' : 'pos') + '">' + (df === null ? '—' : (df >= 0 ? '+' : '−') + fmtEur(Math.abs(df))) + '</td></tr>';
  }
  rows += '<tr><td><b>Year</b></td><td><b>' + fmtEur(totA) + '</b></td><td><b>' + fmtEur(totB) + '</b></td><td class="' + (totA - totB < 0 ? 'neg' : 'pos') + '"><b>' + (totA - totB >= 0 ? '+' : '−') + fmtEur(Math.abs(totA - totB)) + '</b></td></tr>';
  el.innerHTML = '<div class="fin-chart-head"><div class="fin-chart-title">' + d.year + ' · budget vs actual</div>'
    + '<div class="fin-chart-legend"><span><i class="sw-bar"></i>Actual</span><span><i class="sw-line"></i>Budget</span></div></div>'
    + '<div class="fc-wrap">' + svg + '<div class="fc-tip" aria-hidden="true"></div></div>'
    + '<details><summary><i class="fas fa-table"></i> Monthly table</summary><table><thead><tr><th>Month</th><th>Actual</th><th>Budget</th><th>Diff</th></tr></thead><tbody>' + rows + '</tbody></table></details>';
  // hover / focus tooltip (title carries the same text for assistive tech)
  var tipEl = el.querySelector('.fc-tip'), wrap = el.querySelector('.fc-wrap');
  el.querySelectorAll('.fc-month-g').forEach(function(g){
    var show = function(){
      var i = parseInt(g.getAttribute('data-i'), 10), a = d.actual[i], b = d.budget[i];
      var pct = b > 0 ? Math.round((a - b) / b * 100) : null;
      tipEl.innerHTML = '<b>' + MONTH_NAMES[i] + '</b> actual ' + fmtEur(a) + (b > 0 ? '<br>budget ' + fmtEur(b) + ' · ' + (pct >= 0 ? '+' : '') + pct + '%' : '<br>no budget set');
      var r = g.querySelector('.fc-hit').getBoundingClientRect(), wr = wrap.getBoundingClientRect();
      var lx = r.left - wr.left + r.width / 2; lx = Math.max(70, Math.min(wr.width - 70, lx));
      tipEl.style.left = lx + 'px'; tipEl.style.top = (padT - 4) + 'px'; tipEl.style.opacity = '1';
    };
    var hide = function(){ tipEl.style.opacity = '0'; };
    g.addEventListener('mouseenter', show); g.addEventListener('mouseleave', hide);
    g.addEventListener('focus', show); g.addEventListener('blur', hide);
    g.addEventListener('touchstart', function(){ show(); setTimeout(hide, 1800); }, { passive: true });
  });
}
if (typeof ResizeObserver !== 'undefined') {
  var finChartRO = new ResizeObserver(function(entries){ entries.forEach(function(en){ if (en.contentRect.width > 0 && en.target._finChart && Math.abs((en.target._finChartW||0) - en.contentRect.width) > 8) { en.target._finChartW = en.contentRect.width; drawFinYearChart(en.target); } }); });
  ['day','t51','surf'].forEach(function(l){ var el = document.getElementById('fin-chart-' + l); if (el) finChartRO.observe(el); });
}
function renderFinRecords() {
  var db = getDB();
  var allEntries = (db.finEntries||[]).slice().sort(function(a,b){ return b.date.localeCompare(a.date); });
  var today = toDateStr(new Date());
  var monthStr = today.slice(0,7);
  var yearStr  = today.slice(0,4);

  // Read range inputs
  var fromEl=document.getElementById('fin-range-from'), toEl=document.getElementById('fin-range-to');
  var rangeFrom = fromEl?fromEl.value:'', rangeTo = toEl?toEl.value:'';
  // Read per-month budgets from db (set in Settings)
  var bud = db.budgets || { day:{}, t51:{}, surf:{} };
  var curMon = monthStr.slice(5,7); // e.g. "06"
  var budgetDay  = bud.day[curMon]  || 0;
  var budgetT51  = bud.t51[curMon]  || 0;
  var budgetSurf = bud.surf[curMon] || 0;
  // Year-to-date budget = sum of months Jan through current month only
  var budgetDayYear=0, budgetT51Year=0, budgetSurfYear=0;
  MONTH_KEYS.forEach(function(m){
    if(m <= curMon) { // only include months up to and including the current month
      budgetDayYear+=(bud.day[m]||0); budgetT51Year+=(bud.t51[m]||0); budgetSurfYear+=(bud.surf[m]||0);
    }
  });

  // Aggregate totals
  var dayMonth=0,dayYear=0,dayRange=0, t51Month=0,t51Year=0,t51Range=0, surfMonth=0,surfYear=0,surfRange=0;
  var cntMonth=0,cntYear=0,cntRange=0;
  var shortMonth=0,shortYear=0,shortMonthCnt=0,shortYearCnt=0;
  var overMonth=0,overYear=0,overMonthCnt=0,overYearCnt=0;
  allEntries.forEach(function(e){
    var td=e.totalDay||0, t=e.t51||0, s=e.surf||0;
    if(e.date.slice(0,7)===monthStr){ dayMonth+=td; t51Month+=t; surfMonth+=s; cntMonth++; }
    if(e.date.slice(0,4)===yearStr) { dayYear+=td;  t51Year+=t;  surfYear+=s;  cntYear++; }
    if(rangeFrom&&rangeTo&&e.date>=rangeFrom&&e.date<=rangeTo){ dayRange+=td; t51Range+=t; surfRange+=s; cntRange++; }
    // cash diff aggregations (only entries that have cash data)
    var cd = e.cashDiff || 0;
    if(Math.abs(cd) >= 0.005) {
      if(cd < 0) {
        if(e.date.slice(0,7)===monthStr){ shortMonth+=Math.abs(cd); shortMonthCnt++; }
        if(e.date.slice(0,4)===yearStr) { shortYear+=Math.abs(cd);  shortYearCnt++; }
      } else {
        if(e.date.slice(0,7)===monthStr){ overMonth+=cd; overMonthCnt++; }
        if(e.date.slice(0,4)===yearStr) { overYear+=cd;  overYearCnt++; }
      }
    }
  });

  renderFinYearCharts(db, yearStr, curMon);
  finStatBox('fin-stat-day-month','fin-stat-day-month-avg','fin-stat-day-month-budget', dayMonth, cntMonth, budgetDay);
  finStatBox('fin-stat-day-year', 'fin-stat-day-year-avg', 'fin-stat-day-year-budget',  dayYear,  cntYear,  budgetDayYear);
  finStatBox('fin-stat-day-range','fin-stat-day-range-avg','fin-stat-day-range-budget', dayRange, cntRange, 0);
  finStatBox('fin-stat-t51-month','fin-stat-t51-month-avg','fin-stat-t51-month-budget', t51Month, cntMonth, budgetT51);
  finStatBox('fin-stat-t51-year', 'fin-stat-t51-year-avg', 'fin-stat-t51-year-budget',  t51Year,  cntYear,  budgetT51Year);
  finStatBox('fin-stat-t51-range','fin-stat-t51-range-avg',null, t51Range, cntRange, 0);
  finStatBox('fin-stat-surf-month','fin-stat-surf-month-avg','fin-stat-surf-month-budget', surfMonth, cntMonth, budgetSurf);
  finStatBox('fin-stat-surf-year', 'fin-stat-surf-year-avg', 'fin-stat-surf-year-budget',  surfYear,  cntYear,  budgetSurfYear);
  finStatBox('fin-stat-surf-range','fin-stat-surf-range-avg',null, surfRange, cntRange, 0);

  // --- Cash Over/Under Log ---
  var shortMonthEl=document.getElementById('fin-stat-short-month'); if(shortMonthEl) shortMonthEl.textContent=fmtEur(shortMonth);
  var shortMonthCntEl=document.getElementById('fin-stat-short-month-cnt'); if(shortMonthCntEl) shortMonthCntEl.textContent=shortMonthCnt>0?(shortMonthCnt+' day'+(shortMonthCnt>1?'s':'')):'';
  var shortYearEl=document.getElementById('fin-stat-short-year'); if(shortYearEl) shortYearEl.textContent=fmtEur(shortYear);
  var shortYearCntEl=document.getElementById('fin-stat-short-year-cnt'); if(shortYearCntEl) shortYearCntEl.textContent=shortYearCnt>0?(shortYearCnt+' day'+(shortYearCnt>1?'s':'')):'';
  var overMonthEl=document.getElementById('fin-stat-over-month'); if(overMonthEl) overMonthEl.textContent=fmtEur(overMonth);
  var overMonthCntEl=document.getElementById('fin-stat-over-month-cnt'); if(overMonthCntEl) overMonthCntEl.textContent=overMonthCnt>0?(overMonthCnt+' day'+(overMonthCnt>1?'s':'')):'';
  var overYearEl=document.getElementById('fin-stat-over-year'); if(overYearEl) overYearEl.textContent=fmtEur(overYear);
  var overYearCntEl=document.getElementById('fin-stat-over-year-cnt'); if(overYearCntEl) overYearCntEl.textContent=overYearCnt>0?(overYearCnt+' day'+(overYearCnt>1?'s':'')):'';

  // Build diff log — only entries with a non-zero cash diff, most recent first
  var diffLogEl = document.getElementById('fin-diff-log-list');
  if (diffLogEl) {
    var diffEntries = allEntries.filter(function(e){ return Math.abs(e.cashDiff||0) >= 0.005; });
    if (!diffEntries.length) {
      diffLogEl.innerHTML = '<div style="text-align:center;padding:12px 0;font-size:13px;color:var(--ocean-300)"><i class="fas fa-check-circle" style="margin-right:6px;color:#2b8a4b"></i>No discrepancies recorded</div>';
    } else {
      diffLogEl.innerHTML = diffEntries.map(function(e){
        var cd = e.cashDiff || 0;
        var isShort = cd < 0;
        var color = isShort ? '#b4402f' : '#2b8a4b';
        var bg    = isShort ? 'var(--red-50)' : '#e3f4e8';
        var icon  = isShort ? 'fa-triangle-exclamation' : 'fa-arrow-trend-up';
        var label = isShort ? 'Short' : 'Over';
        return '<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;border-radius:8px;margin-bottom:6px;background:'+bg+';gap:10px">'
          +'<span style="font-size:12px;font-weight:600;color:var(--ocean-700)">'+fmtDateShort(e.date)+'</span>'
          +'<span style="display:flex;align-items:center;gap:6px;font-size:13px;font-weight:700;color:'+color+'">'
            +'<i class="fas '+icon+'"></i>'+label+' '+fmtEur(Math.abs(cd))
          +'</span>'
        +'</div>';
      }).join('');
    }
  }

  // Records list — optionally filtered by day picker
  var listEl = document.getElementById('fin-records-list');
  if (!listEl) return;
  var entries = finRecDayFilter ? allEntries.filter(function(e){ return e.date===finRecDayFilter; }) : allEntries;
  if (!entries.length) {
    listEl.innerHTML = '<div class="empty-state" style="padding:24px"><i class="fas fa-folder-open"></i><p>No records'+(finRecDayFilter?' for '+fmtDateShort(finRecDayFilter):'')+' yet.</p></div>';
    return;
  }
  var fundo = db.fundoCaixa || 0;
  listEl.innerHTML = entries.map(function(e){
    var total = e.totalDay || 0;
    var cashTotal = (e.cashNotes||0) + (e.coins||0);
    var expected = (e.entregar||0) + fundo;
    var diff = cashTotal - expected;
    var absDiff = Math.abs(diff);
    var fundoNote = fundo ? ' <span style="font-size:11px;opacity:.75">(incl. Fundo '+fmtEur(fundo)+')</span>' : '';
    var balHtml;
    if (absDiff < 0.005) {
      balHtml = '<div style="background:#e3f4e8;border-radius:8px;padding:8px 12px;display:flex;align-items:center;gap:8px;font-weight:700;font-size:13px"><i class="fas fa-circle-check" style="color:#2b8a4b"></i><span style="color:#2b8a4b">Balanced — OK</span>'+fundoNote+'</div>';
    } else if (diff < 0) {
      balHtml = '<div style="background:var(--red-50);border-radius:8px;padding:8px 12px;display:flex;align-items:center;gap:8px;font-weight:700;font-size:13px"><i class="fas fa-triangle-exclamation" style="color:#b4402f"></i><span style="color:#b4402f">Short by '+fmtEur(absDiff)+'</span>'+fundoNote+'</div>';
    } else {
      balHtml = '<div style="background:#e3f4e8;border-radius:8px;padding:8px 12px;display:flex;align-items:center;gap:8px;font-weight:700;font-size:13px"><i class="fas fa-arrow-trend-up" style="color:#2b8a4b"></i><span style="color:#2b8a4b">Over by '+fmtEur(absDiff)+'</span>'+fundoNote+'</div>';
    }
    return '<div class="fin-record">'
      +'<div class="fin-record-header">'
        +'<span class="fin-record-date">'+fmtDateShort(e.date)+'</span>'
        +'<span class="fin-record-total">'+fmtEur(total)+'</span>'
      +'</div>'
      +'<div class="fin-row"><span class="fin-row-label"><i class="fas fa-file-invoice" style="color:#2b8a4b"></i> Total Facturado</span><span class="fin-row-val">'+fmtEur(e.invoiced||0)+'</span></div>'
      +'<div class="fin-row"><span class="fin-row-label"><i class="fas fa-cash-register" style="color:var(--ocean-400)"></i> T 51</span><span class="fin-row-val">'+fmtEur(e.t51||0)+'</span></div>'
      +'<div class="fin-row"><span class="fin-row-label"><i class="fas fa-credit-card" style="color:var(--ocean-400)"></i> MultiBanco</span><span class="fin-row-val">'+fmtEur(e.multibanco||0)+'</span></div>'
      +(e.genExpenses ? '<div class="fin-row"><span class="fin-row-label"><i class="fas fa-receipt" style="color:#b4402f"></i> Despesas</span><span class="fin-row-val">'+fmtEur(e.genExpenses||0)+'</span></div>' : '')
      +(e.surf ? '<div class="fin-row"><span class="fin-row-label"><i class="fas fa-water" style="color:#2a9683"></i> Surf</span><span class="fin-row-val">'+fmtEur(e.surf||0)+'</span></div>' : '')
      +'<div class="fin-row"><span class="fin-row-label"><i class="fas fa-hand-holding-dollar" style="color:#b7791f"></i> Tips</span><span class="fin-row-val">'+fmtEur(e.tips||0)+'</span></div>'
      +'<div class="fin-row"><span class="fin-row-label" style="color:#6d4fc2;font-weight:800"><i class="fas fa-arrow-right" style="color:#6d4fc2"></i> Entregar</span><span class="fin-row-val" style="color:#6d4fc2">'+fmtEur(e.entregar||0)+'</span></div>'
      +(cashTotal ? '<div class="fin-row"><span class="fin-row-label"><i class="fas fa-coins" style="color:#b7791f"></i> Cash Total</span><span class="fin-row-val">'+fmtEur(cashTotal)+'</span></div>' : '')
      +balHtml
    +'</div>';
  }).join('');
}

// ================================================
// INVENTORY
// ================================================
var catIconMap={beverages:'<i class="fas fa-martini-glass-citrus"></i>',food:'<i class="fas fa-utensils"></i>',supplies:'<i class="fas fa-broom"></i>',equipment:'<i class="fas fa-screwdriver-wrench"></i>',other:'<i class="fas fa-box"></i>'};
var catLabelMap={beverages:'Bar',food:'Cozinha',supplies:'Limpeza',equipment:'Economato',other:'Other'};
function switchInvTab(t) {
  ['stock','log','orders'].forEach(function(x){
    document.getElementById('inv-tab-'+x).classList.toggle('active',x===t);
    document.getElementById('inv-panel-'+x).style.display=x===t?'block':'none';
  });
  if(t==='stock') { renderSuppliers(); renderInventory(); }
  if(t==='log') { renderInvLogSupplierFilter(); renderInvLog(); }
  if(t==='orders') renderOrderHistory();
  refreshSection('inventory');
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
    document.getElementById('inv-employee').value=item.lastEmployee||'';
    var supEl=document.getElementById('inv-supplier'); if(supEl) supEl.value=item.supplierId||'';
  } else {
    editInventoryId=null;
    document.getElementById('inv-modal-title').textContent='Add Item';
    document.getElementById('inv-item-name').value='';
    document.getElementById('inv-unit').value='';
    document.getElementById('inv-category').value='beverages';
    document.getElementById('inv-qty-bar').value='0';
    document.getElementById('inv-qty-storage').value='0';
    document.getElementById('inv-employee').value='';
    var supEl2=document.getElementById('inv-supplier');
    if(supEl2) supEl2.value = invSupplierFilter || '';
  }
  openModal('modal-add-inventory');
}
function saveInventoryItem() {
  var name=document.getElementById('inv-item-name').value.trim(); if(!name){toast('Name required!','error');return;}
  var db=getDB(); var emp=document.getElementById('inv-employee').value;
  var qb=parseInt(document.getElementById('inv-qty-bar').value)||0;
  var qs=parseInt(document.getElementById('inv-qty-storage').value)||0;
  var cat=document.getElementById('inv-category').value;
  var unit=document.getElementById('inv-unit').value.trim();
  var supId=(document.getElementById('inv-supplier')||{}).value||'';
  var now=new Date().toISOString();
  var eid=editInventoryId;
  if(eid){
    var idx=db.inventory.findIndex(function(i){return i.id===eid;});
    if(idx!==-1){var old=db.inventory[idx]; db.inventory[idx]=Object.assign({},old,{name:name,category:cat,unit:unit,qtyBar:qb,qtyStorage:qs,lastEmployee:emp,supplierId:supId,updatedAt:now}); addInvLog(db,{action:'update',item:name,employee:emp,qtyBar:qb,qtyStorage:qs});}
    saveDB(db); closeModal('modal-add-inventory'); renderInventory(); renderDashboard(); toast('Updating...'); editInventoryId=null;
    sbFetch('PATCH','inventory',{name:name,category:cat,unit:unit,qty_bar:qb,qty_storage:qs,last_employee:emp,supplier_id:supId||null,updated_at:now},'id=eq.'+eid)
      .then(function(){ sbAddInvLog({action:'update',item:name,employee:emp,qty_bar:qb,qty_storage:qs}); toast('Updated!'); })
      .catch(function(){ toast('Saved locally','error'); });
  } else {
    var newId=uid();
    db.inventory.push({id:newId,name:name,category:cat,unit:unit,qtyBar:qb,qtyStorage:qs,lastEmployee:emp,supplierId:supId,createdAt:now,updatedAt:now});
    addInvLog(db,{action:'add',item:name,employee:emp,qtyBar:qb,qtyStorage:qs});
    saveDB(db); closeModal('modal-add-inventory'); renderInventory(); renderDashboard(); toast('Adding...'); editInventoryId=null;
    sbFetch('POST','inventory',{name:name,category:cat,unit:unit,qty_bar:qb,qty_storage:qs,last_employee:emp,supplier_id:supId||null})
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
// ================================================
// SUPPLIERS
// ================================================
function renderSuppliers(){
  var db=getDB(); var el=document.getElementById('supplier-cards'); if(!el) return;
  var suppliers=db.suppliers||[];
  // Filter by category if invCatFilter is set
  var filtered=invCatFilter?suppliers.filter(function(s){return s.categories&&s.categories.indexOf(invCatFilter)!==-1;}):suppliers;
  if(filtered.length===0){
    el.innerHTML='<div style="grid-column:1/-1;text-align:center;padding:20px;color:var(--ocean-400);font-size:13px"><i class="fas fa-truck" style="font-size:24px;margin-bottom:8px;display:block"></i>No suppliers yet.<br><small>Tap + Add Supplier to create one.</small></div>';
    return;
  }
  el.innerHTML=filtered.map(function(s){
    var itemCount=(db.inventory||[]).filter(function(i){return i.supplierId===s.id;}).length;
    var isActive=invSupplierFilter===s.id;
    var cats=(s.categories||[]).map(function(c){return catIconMap[c]||'<i class="fas fa-box"></i>';}).join('');
    return '<div class="supplier-card'+(isActive?' supplier-card-active':'')+'" data-supplier-filter="'+esc(s.id)+'">'
      +'<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px">'
        +'<div style="font-weight:700;font-size:13px;color:var(--ocean-900);flex:1;line-height:1.3">'+esc(s.name)+'</div>'
        +'<div style="display:flex;gap:4px;margin-left:4px">'
          +(isAdmin?'<button class="inv-card-del" data-edit-supplier="'+esc(s.id)+'" title="Edit" style="position:static;transform:none;background:var(--ocean-100);color:var(--ocean-600)"><i class="fas fa-pen" style="font-size:10px"></i></button>':'')
        +'</div>'
      +'</div>'
      +(cats?'<div style="font-size:14px;margin-bottom:5px">'+cats+'</div>':'')
      +'<div style="font-size:11px;color:var(--ocean-400);display:flex;justify-content:space-between;align-items:center">'
        +'<span><i class="fas fa-box" style="margin-right:3px"></i>'+itemCount+' items</span>'
        +(s.sendEmail?'<span style="color:#2a9683"><i class="fas fa-envelope"></i></span>':'')
      +'</div>'
      +(s.phone?'<div style="font-size:10px;color:var(--ocean-400);margin-top:3px">'+esc(s.phone)+'</div>':'')
    +'</div>';
  }).join('');
}

function openSupplierModal(editId){
  var db=getDB();
  if(editId){
    editSupplierId=editId;
    var s=db.suppliers.find(function(x){return x.id===editId;}); if(!s) return;
    document.getElementById('supplier-modal-title').textContent='Edit Supplier';
    document.getElementById('supplier-name').value=s.name;
    document.getElementById('supplier-email').value=s.email||'';
    document.getElementById('supplier-phone').value=s.phone||'';
    document.getElementById('supplier-send-email').checked=!!s.sendEmail;
    document.querySelectorAll('.supplier-cat-cb').forEach(function(cb){ cb.checked=(s.categories||[]).indexOf(cb.value)!==-1; });
    var dr=document.getElementById('supplier-delete-row'); if(dr) dr.style.display=isAdmin?'block':'none';
    var db2=document.getElementById('btn-delete-supplier-modal'); if(db2) db2.setAttribute('data-delete-supplier',editId);
  } else {
    editSupplierId=null;
    document.getElementById('supplier-modal-title').textContent='Add Supplier';
    document.getElementById('supplier-name').value='';
    document.getElementById('supplier-email').value='';
    document.getElementById('supplier-phone').value='';
    document.getElementById('supplier-send-email').checked=false;
    document.querySelectorAll('.supplier-cat-cb').forEach(function(cb){ cb.checked=false; });
    var dr2=document.getElementById('supplier-delete-row'); if(dr2) dr2.style.display='none';
  }
  openModal('modal-add-supplier');
}

function saveSupplierModal(){
  var name=document.getElementById('supplier-name').value.trim();
  if(!name){toast('Supplier name required!','error');return;}
  var email=document.getElementById('supplier-email').value.trim();
  var phone=document.getElementById('supplier-phone').value.trim();
  var sendEmail=document.getElementById('supplier-send-email').checked;
  var cats=[];
  document.querySelectorAll('.supplier-cat-cb').forEach(function(cb){ if(cb.checked) cats.push(cb.value); });
  var db=getDB(); var now=new Date().toISOString();
  if(editSupplierId){
    var idx=db.suppliers.findIndex(function(s){return s.id===editSupplierId;});
    if(idx!==-1) db.suppliers[idx]=Object.assign({},db.suppliers[idx],{name:name,email:email,phone:phone,sendEmail:sendEmail,categories:cats});
    saveDB(db); closeModal('modal-add-supplier'); renderSuppliers(); updateAllDropdowns(); toast('Updating...'); 
    sbFetch('PATCH','suppliers',{name:name,email:email,phone:phone,send_email:sendEmail,categories:cats},'id=eq.'+editSupplierId)
      .then(function(){toast('Supplier updated!');}).catch(function(){toast('Saved locally','error');});
    editSupplierId=null;
  } else {
    var newId=uid();
    db.suppliers.push({id:newId,name:name,email:email,phone:phone,sendEmail:sendEmail,categories:cats,totalSpend:0,createdAt:now});
    saveDB(db); closeModal('modal-add-supplier'); renderSuppliers(); updateAllDropdowns(); toast('Adding...');
    sbFetch('POST','suppliers',{id:newId,name:name,email:email,phone:phone,send_email:sendEmail,categories:cats,total_spend:0})
      .then(function(rows){
        if(rows&&rows[0]){var oi=db.suppliers.findIndex(function(s){return s.id===newId;}); if(oi!==-1) db.suppliers[oi].id=rows[0].id; saveDB(db); updateAllDropdowns();}
        toast('Supplier added!');
      }).catch(function(){toast('Saved locally','error');});
  }
}

function deleteSupplier(id){
  if(!confirm('Delete this supplier? Items assigned to it will be unassigned.')) return;
  var db=getDB();
  // Unassign items
  db.inventory.forEach(function(i){ if(i.supplierId===id) i.supplierId=''; });
  db.suppliers=db.suppliers.filter(function(s){return s.id!==id;});
  if(invSupplierFilter===id){ invSupplierFilter=''; showAllItems(); }
  saveDB(db); renderSuppliers(); renderInventory(); updateAllDropdowns(); toast('Deleting...');
  sbFetch('DELETE','suppliers',null,'id=eq.'+id).then(function(){toast('Supplier deleted.');}).catch(function(){toast('Deleted locally','error');});
}

function showAllItems(){
  invSupplierFilter='';
  var backBtn=document.getElementById('btn-back-to-suppliers'); if(backBtn) backBtn.style.display='none';
  var titleEl=document.getElementById('inv-items-title'); if(titleEl) titleEl.textContent='All Items';
  renderInventory();
  renderSuppliers();
}

function filterBySupplier(supplierId){
  if(!supplierId){ showAllItems(); return; }
  invSupplierFilter=supplierId;
  var db=getDB(); var s=db.suppliers.find(function(x){return x.id===supplierId;});
  var backBtn=document.getElementById('btn-back-to-suppliers'); if(backBtn) backBtn.style.display='flex';
  var titleEl=document.getElementById('inv-items-title'); if(titleEl) titleEl.textContent=s?esc(s.name):'Supplier Items';
  renderInventory();
  renderSuppliers(); // re-render to show active state
}

function renderInvLogSupplierFilter(){
  var db=getDB(); var el=document.getElementById('inv-log-supplier-filter'); if(!el) return;
  var suppliers=db.suppliers||[];
  var btns='<button class="log-sup-filter'+(invLogSupplierFilter===''?' active':'')+'" data-log-supplier="">All Suppliers</button>';
  btns+=suppliers.map(function(s){return '<button class="log-sup-filter'+(invLogSupplierFilter===s.id?' active':'')+'" data-log-supplier="'+esc(s.id)+'">'+esc(s.name)+'</button>';}).join('');
  el.innerHTML=btns;
}

// ================================================
// Cart: pending order items before submitting { id, name, unit, orderQty, supplierId }
var pendingOrderItems = [];
function openQuickOrderModal(id){
  var db=getDB(); var item=db.inventory.find(function(i){return i.id===id;}); if(!item) return;
  document.getElementById('quick-order-id').value=id;
  document.getElementById('quick-order-icon').innerHTML=catIconMap[item.category]||'<i class="fas fa-box"></i>';
  document.getElementById('quick-order-name').textContent=item.name;
  var total=item.qtyBar+item.qtyStorage;
  document.getElementById('quick-order-stock').textContent='Bar: '+item.qtyBar+' · Storage: '+item.qtyStorage+' · Total: '+total+(item.unit?' '+item.unit:'');
  document.getElementById('quick-order-qty').value='1';
  openModal('modal-quick-order');
}
function confirmQuickOrder(){
  var id=document.getElementById('quick-order-id').value;
  var qty=parseInt(document.getElementById('quick-order-qty').value)||0;
  if(qty<=0){toast('Enter a valid quantity','error');return;}
  var db=getDB(); var item=db.inventory.find(function(i){return i.id===id;}); if(!item) return;
  // Add or update in pending cart
  var existing=pendingOrderItems.findIndex(function(x){return x.id===id;});
  if(existing!==-1) pendingOrderItems[existing].orderQty+=qty;
  else pendingOrderItems.push({id:id,name:item.name,unit:item.unit||'',orderQty:qty,supplierId:item.supplierId||''});
  closeModal('modal-quick-order');
  toast(item.name+' x'+qty+' added to cart','gold');
  updateOrdersBadge();
  renderInventory(); // update cart highlight on card
}
function renderInventory(){
  var db=getDB(); var items=db.inventory.slice();
  // Apply custom sort order when no filter active
  if(!invSearchVal && !invCatFilter && db.invSortOrder && db.invSortOrder.length){
    var order=db.invSortOrder;
    items.sort(function(a,b){ var ai=order.indexOf(a.id),bi=order.indexOf(b.id); return (ai===-1?9999:ai)-(bi===-1?9999:bi); });
  }
  if(invSearchVal) items=items.filter(function(i){return i.name.toLowerCase().indexOf(invSearchVal.toLowerCase())!==-1;});
  if(invCatFilter) items=items.filter(function(i){return i.category===invCatFilter;});
  if(invSupplierFilter) items=items.filter(function(i){return i.supplierId===invSupplierFilter;});
  var el=document.getElementById('inventory-list'); if(!el) return;
  if(items.length===0){el.innerHTML='<div class="empty-state" style="grid-column:1/-1"><i class="fas fa-box-open"></i><p>No items found.</p></div>';return;}
  el.innerHTML=items.map(function(item){
    var total=item.qtyBar+item.qtyStorage;
    var isPending=pendingOrderItems.some(function(p){return p.id===item.id;});
    return '<div class="inv-card'+(isPending?' inv-ordered':'')+'" data-inv-id="'+esc(item.id)+'">'
      +(isAdmin?'<button class="inv-card-del" data-delete-inv="'+esc(item.id)+'" title="Delete"><i class="fas fa-times"></i></button>':'')
      +'<div style="display:flex;align-items:center;gap:4px;'+(isAdmin?'padding-right:14px':'')+'">'
        +'<div class="inv-cat-icon">'+(catIconMap[item.category]||'<i class="fas fa-box"></i>')+'</div>'
        +'<div style="flex:1;min-width:0">'
          +'<div class="inv-name">'+esc(item.name)+'</div>'
          +(item.unit?'<div style="font-size:9px;color:var(--ocean-400);margin-top:1px">'+esc(item.unit)+'</div>':'')
          +(function(){ var db2=getDB(); var sup=item.supplierId&&db2.suppliers?(db2.suppliers.find(function(s){return s.id===item.supplierId;})||null):null; return sup?'<div style="font-size:9px;color:var(--ocean-500);margin-top:1px;font-weight:600">'+esc(sup.name)+'</div>':''; })()
        +'</div>'
      +'</div>'
      +'<div class="inv-stats">'
        +'<div class="inv-stat"><div class="inv-stat-val">'+item.qtyBar+'</div><div class="inv-stat-label">Bar</div></div>'
        +'<div class="inv-stat"><div class="inv-stat-val">'+item.qtyStorage+'</div><div class="inv-stat-label">Storage</div></div>'
        +'<div class="inv-stat"><div class="inv-stat-val" style="color:var(--ocean-600)">'+total+'</div><div class="inv-stat-label">Total</div></div>'
      +'</div>'
      +'<div class="inv-actions">'
        +'<button class="btn btn-secondary btn-sm btn-icon" style="flex:1;justify-content:center" data-update-qty="'+esc(item.id)+'"><i class="fas fa-pen"></i></button>'
        +(isAdmin?'<button class="btn btn-secondary btn-sm btn-icon" style="flex:1;justify-content:center" data-edit-inv="'+esc(item.id)+'"><i class="fas fa-edit"></i></button>':'')
        +'<button class="inv-order-btn" data-quick-order="'+esc(item.id)+'" title="Add to order"><i class="fas fa-cart-plus"></i></button>'
      +'</div>'
    +'</div>';
  }).join('');
}
function renderInvLog(){
  var db=getDB(); var el=document.getElementById('inv-log-list'); if(!el) return;
  var logs=db.invLogs.slice();
  // Filter by supplier via invLogSupplierFilter
  if(invLogSupplierFilter){
    var supItems=(db.inventory||[]).filter(function(i){return i.supplierId===invLogSupplierFilter;}).map(function(i){return i.name;});
    logs=logs.filter(function(l){return supItems.indexOf(l.item)!==-1;});
  }
  if(logs.length===0){el.innerHTML='<div class="empty-state"><i class="fas fa-clock-rotate-left"></i><p>No log entries.</p></div>';return;}
  var icons={add:'<i class="fas fa-plus" style="color:#2b8a4b"></i>',update:'<i class="fas fa-pen" style="color:#2f6fa8"></i>',delete:'<i class="fas fa-trash" style="color:#b4402f"></i>'};
  el.innerHTML=logs.map(function(l){
    return '<div class="log-item"><div class="log-icon">'+(icons[l.action]||'<i class="fas fa-note-sticky"></i>')+'</div><div style="flex:1"><div style="font-size:13px;font-weight:600;color:var(--ocean-900)">'+esc(l.item)+'</div><div style="font-size:11px;color:var(--ocean-400)">'+esc(l.action)+' · '+esc(l.employee||'System')+'</div></div><div style="font-size:11px;color:var(--ocean-400)">'+fmtDate(l.timestamp)+'</div></div>';
  }).join('');
}
function updateOrdersBadge(){
  var db=getDB();
  var standbyCount=db.orders.filter(function(o){return o.status==='standby';}).length;
  // Count unique suppliers in pending draft
  var draftSuppliers={};
  pendingOrderItems.forEach(function(p){ draftSuppliers[p.supplierId||'_none']=true; });
  var draftCount=Object.keys(draftSuppliers).length;
  var totalBadge=standbyCount+draftCount;
  var badge=document.getElementById('orders-standby-badge');
  if(badge){ badge.textContent=totalBadge>0?totalBadge:''; badge.style.display=totalBadge>0?'inline':'none'; }
  // Cart button badge = number of items in cart
  var cartBadge=document.getElementById('cart-badge');
  if(cartBadge){ cartBadge.textContent=pendingOrderItems.length>0?pendingOrderItems.length:''; cartBadge.style.display=pendingOrderItems.length>0?'inline':'none'; }
}
function renderOrderHistory(){
  var db=getDB(); var el=document.getElementById('inv-orders-list'); if(!el) return;
  updateOrdersBadge();

  // ── Build draft groups from pendingOrderItems ──
  var draftGroups={}; // supplierId -> [{id,name,unit,orderQty}]
  pendingOrderItems.forEach(function(p){
    var sid=p.supplierId||'_none';
    if(!draftGroups[sid]) draftGroups[sid]=[];
    draftGroups[sid].push(p);
  });

  // ── Group saved orders by supplier ──
  var savedGroups={}; var noSupOrders=[];
  db.orders.slice().sort(function(a,b){return b.date<a.date?-1:1;}).forEach(function(o){
    var sid=o.supplierId||'';
    if(sid){ if(!savedGroups[sid]) savedGroups[sid]=[]; savedGroups[sid].push(o); }
    else noSupOrders.push(o);
  });

  var hasDrafts=Object.keys(draftGroups).length>0;
  var hasSaved=db.orders.length>0;
  if(!hasDrafts && !hasSaved){
    el.innerHTML='<div class="empty-state"><i class="fas fa-truck"></i><p>No orders yet.<br><small style="color:var(--ocean-400)">Use the cart button on items to start an order.</small></p></div>';
    return;
  }

  var html='';

  // ── DRAFT SECTION ──
  if(hasDrafts){
    html+='<div style="font-size:11px;font-weight:800;letter-spacing:.06em;color:var(--ocean-400);margin-bottom:10px;text-transform:uppercase">Draft Orders</div>';
    Object.keys(draftGroups).forEach(function(sid){
      var sup=sid!=='_none'?db.suppliers.find(function(s){return s.id===sid;})||null:null;
      var supName=sup?sup.name:'No Supplier';
      var items=draftGroups[sid];
      html+='<div style="border:2px dashed var(--ocean-200);border-radius:12px;padding:14px;margin-bottom:14px;background:#fdf3e1">'
        // Supplier header
        +'<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">'
          +'<i class="fas fa-truck" style="color:#b7791f"></i>'
          +'<span style="font-weight:700;font-size:14px;color:var(--ocean-800);flex:1">'+esc(supName)+'</span>'
          +'<span style="font-size:11px;background:#fdf3e1;color:var(--amber-700);padding:2px 8px;border-radius:8px;font-weight:700">Draft</span>'
        +'</div>'
        // Items list with editable qty + remove
        +'<div style="margin-bottom:12px">'
        +items.map(function(pi){
          return '<div style="display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid var(--ocean-100)">'
            +'<span style="flex:1;font-size:13px;color:var(--ocean-800)">'+esc(pi.name)+'</span>'
            +'<input type="number" min="1" value="'+pi.orderQty+'" class="input-field" id="order-qty-'+esc(pi.id)+'" style="width:64px;text-align:center;font-size:13px;padding:4px 6px"/>'
            +'<span style="font-size:12px;color:var(--ocean-400);min-width:28px">'+esc(pi.unit||'')+'</span>'
            +'<button style="background:none;border:none;color:var(--ocean-300);font-size:13px;cursor:pointer;padding:2px 4px" data-remove-pending="'+esc(pi.id)+'" title="Remove"><i class="fas fa-times"></i></button>'
          +'</div>';
        }).join('')
        +'</div>'
        // Confirm button
        +'<button class="btn btn-primary" style="width:100%;justify-content:center" data-confirm-draft="'+esc(sid)+'"><i class="fas fa-paper-plane"></i> Confirm Order</button>'
      +'</div>';
    });
  }

  // ── SAVED ORDERS SECTION ──
  if(hasSaved){
    if(hasDrafts) html+='<div style="font-size:11px;font-weight:800;letter-spacing:.06em;color:var(--ocean-400);margin:16px 0 10px;text-transform:uppercase">Previous Orders</div>';
    var allSavedSupIds=Object.keys(savedGroups);
    allSavedSupIds.forEach(function(sid){
      var sup=db.suppliers.find(function(s){return s.id===sid;})||{name:'Unknown Supplier',email:'',sendEmail:false,totalSpend:0};
      var orders=savedGroups[sid];
      var standbyCount=orders.filter(function(o){return o.status==='standby';}).length;
      var supGroupId='sup-orders-'+sid;
      // Collapsible supplier header
      html+='<div style="margin-bottom:10px">'
        +'<div data-toggle-sup="'+esc(sid)+'" style="display:flex;align-items:center;gap:8px;padding:10px 12px;background:var(--ocean-50);border-radius:10px;cursor:pointer;user-select:none">'
          +'<i class="fas fa-truck" style="color:var(--ocean-400);flex-shrink:0"></i>'
          +'<span style="font-weight:700;font-size:14px;color:var(--ocean-800);flex:1">'+esc(sup.name)+'</span>'
          +(standbyCount>0?'<span style="background:#b7791f;color:white;font-size:10px;font-weight:800;padding:1px 7px;border-radius:10px">'+standbyCount+' pending</span>':'')
          +(sup.totalSpend>0?'<span style="font-size:11px;color:var(--ocean-500);margin-left:4px">\u20ac'+sup.totalSpend.toFixed(2)+'</span>':'')
          +'<i class="fas fa-chevron-down sup-chevron" style="color:var(--ocean-300);font-size:12px;transition:transform .2s;margin-left:4px"></i>'
        +'</div>'
        // Orders list — collapsed by default
        +'<div id="'+supGroupId+'" style="display:none;padding:8px 4px 4px">';
      orders.forEach(function(o){ html+=renderOrderCard(o,db,sup); });
      html+='</div></div>';
    });
    // Orders with no supplier
    if(noSupOrders.length>0){
      var noSupId='sup-orders-_none';
      html+='<div style="margin-bottom:10px">'
        +'<div data-toggle-sup="_none" style="display:flex;align-items:center;gap:8px;padding:10px 12px;background:var(--ocean-50);border-radius:10px;cursor:pointer;user-select:none">'
          +'<i class="fas fa-truck" style="color:var(--ocean-400);flex-shrink:0"></i>'
          +'<span style="font-weight:700;font-size:14px;color:var(--ocean-800);flex:1">Other Orders</span>'
          +'<i class="fas fa-chevron-down sup-chevron" style="color:var(--ocean-300);font-size:12px;transition:transform .2s"></i>'
        +'</div>'
        +'<div id="'+noSupId+'" style="display:none;padding:8px 4px 4px">';
      noSupOrders.forEach(function(o){ html+=renderOrderCard(o,db,null); });
      html+='</div></div>';
    }
  }

  el.innerHTML=html;
}
function renderOrderCard(o,db,sup){
  var isStandby=o.status==='standby';
  var canEmail=sup&&sup.sendEmail&&sup.email;
  var shortId=o.id.slice(-6).toUpperCase();
  var itemCount=o.items.length;
  var detailId='order-detail-'+esc(o.id);
  // Header — always visible, tap to expand
  var header='<div class="order-card-header" data-toggle-order="'+esc(o.id)+'" style="display:flex;align-items:center;gap:8px;cursor:pointer;user-select:none">'
    +'<div style="flex:1;min-width:0">'
      +'<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">'
        +'<span style="font-weight:700;color:var(--ocean-800);font-size:13px">Order #'+shortId+'</span>'
        +'<span class="badge '+(isStandby?'badge-orange':'badge-green')+'" style="font-size:10px">'+(isStandby?'<i class="fas fa-hourglass-half"></i> Standby':'<i class="fas fa-check"></i> Approved')+'</span>'
      +'</div>'
      +'<div style="font-size:11px;color:var(--ocean-400);margin-top:2px">'+fmtDate(o.date)+' · '+itemCount+' item'+(itemCount!==1?'s':'')+(o.amount>0?' · <span style="color:#2b8a4b;font-weight:600">\u20ac'+o.amount.toFixed(2)+'</span>':'')+'</div>'
    +'</div>'
    +'<i class="fas fa-chevron-down order-chevron" style="color:var(--ocean-300);font-size:12px;transition:transform .2s;flex-shrink:0"></i>'
  +'</div>';
  // Detail — hidden by default
  var detail='<div id="'+detailId+'" style="display:none;margin-top:10px;padding-top:10px;border-top:1px solid var(--ocean-100)">'
    +'<div style="margin-bottom:10px">'
    +o.items.map(function(i){
      return '<div style="display:flex;justify-content:space-between;font-size:13px;padding:3px 0;border-bottom:1px solid var(--ocean-50)">'
        +'<span style="color:var(--ocean-700)">'+esc(i.name)+'</span>'
        +'<span style="font-weight:700;color:var(--ocean-900)">'+i.orderQty+' '+esc(i.unit||'')+'</span>'
      +'</div>';
    }).join('')
    +'</div>'
    // Action buttons inside the detail panel
    +'<div style="display:flex;gap:6px;flex-wrap:wrap">'
      +(isStandby&&isAdmin?'<button class="btn btn-sm btn-gold" data-confirm-order="'+esc(o.id)+'"><i class="fas fa-check"></i> Approve</button>':'')
      +(isStandby&&!isAdmin?'<span style="font-size:11px;color:var(--amber-700);font-style:italic;align-self:center">Awaiting admin approval</span>':'')
      +(canEmail?'<button class="btn btn-sm btn-secondary" data-send-order-email="'+esc(o.id)+'"><i class="fas fa-envelope"></i> Email</button>':'')
      +(isAdmin?'<button class="btn btn-sm btn-secondary" data-set-order-amount="'+esc(o.id)+'"><i class="fas fa-euro-sign"></i> Amount</button>':'')
    +'</div>'
  +'</div>';
  return '<div class="'+(isStandby?'order-standby':'order-confirmed')+'" style="margin-bottom:8px">'+header+detail+'</div>';
}

function confirmDraftOrder(sid){
  // Collect items for this supplier draft, picking up any qty edits
  var items=pendingOrderItems.filter(function(p){return (p.supplierId||'_none')===sid;});
  if(items.length===0){toast('No items in draft','error');return;}
  var orderItems=items.map(function(pi){
    var qEl=document.getElementById('order-qty-'+pi.id);
    var qty=qEl?parseInt(qEl.value)||pi.orderQty:pi.orderQty;
    return{id:pi.id,name:pi.name,unit:pi.unit,orderQty:qty,supplierId:pi.supplierId||''};
  }).filter(function(x){return x.orderQty>0;});
  if(orderItems.length===0){toast('Enter at least one quantity','error');return;}
  var db=getDB(); var now=new Date().toISOString();
  var realSid=sid==='_none'?'':sid;
  // Use a temp local id until Supabase returns the real UUID
  var tempId='tmp-'+uid();
  var newOrder={id:tempId,date:now,items:orderItems,status:'standby',supplierId:realSid,amount:0};
  db.orders.unshift(newOrder);
  // Remove confirmed items from pending cart
  var confirmedIds=items.map(function(p){return p.id;});
  pendingOrderItems=pendingOrderItems.filter(function(p){return confirmedIds.indexOf(p.id)===-1;});
  saveDB(db); updateOrdersBadge(); renderInventory(); renderOrderHistory();
  toast('Confirming order...','gold');
  // Do NOT send id — let Supabase generate a proper UUID
  sbFetch('POST','orders',{items:orderItems,status:'standby',supplier_id:realSid||null,amount:0})
    .then(function(rows){
      if(rows&&rows[0]){
        var db2=getDB();
        var oi=db2.orders.findIndex(function(o){return o.id===tempId;});
        if(oi!==-1){
          db2.orders[oi].id=rows[0].id;
          db2.orders[oi].date=rows[0].date||rows[0].created_at||now;
        }
        saveDB(db2); renderOrderHistory();
      }
      toast('Order confirmed — awaiting approval.','gold');
    }).catch(function(e){console.error('Order sync error:',e); toast('Saved locally only — check connection','error');});
}
function approveOrder(orderId){
  var db=getDB(); var idx=db.orders.findIndex(function(o){return o.id===orderId;});
  if(idx!==-1){
    db.orders[idx].status='confirmed';
    // Update supplier total spend if amount set
    var ord=db.orders[idx];
    if(ord.supplierId && ord.amount>0){
      var si=db.suppliers.findIndex(function(s){return s.id===ord.supplierId;});
      if(si!==-1){ db.suppliers[si].totalSpend=(db.suppliers[si].totalSpend||0)+ord.amount;
        sbFetch('PATCH','suppliers',{total_spend:db.suppliers[si].totalSpend},'id=eq.'+ord.supplierId).catch(function(){});
      }
    }
  }
  saveDB(db); renderOrderHistory(); renderDashboard(); toast('Approving...','gold');
  sbFetch('PATCH','orders',{status:'confirmed'},'id=eq.'+orderId).then(function(){
    toast('Order approved!','gold');
  }).catch(function(){ toast('Approved locally','error'); });
}

function setOrderAmount(orderId){
  document.getElementById('set-amount-order-id').value=orderId;
  var db=getDB(); var ord=db.orders.find(function(o){return o.id===orderId;});
  document.getElementById('set-amount-value').value=ord?ord.amount||'':'';
  openModal('modal-set-order-amount');
}
function confirmSetAmount(){
  var orderId=document.getElementById('set-amount-order-id').value;
  var amount=parseFloat(document.getElementById('set-amount-value').value)||0;
  var db=getDB(); var idx=db.orders.findIndex(function(o){return o.id===orderId;});
  if(idx!==-1) db.orders[idx].amount=amount;
  saveDB(db); closeModal('modal-set-order-amount'); renderOrderHistory(); toast('Amount saved!','gold');
  sbFetch('PATCH','orders',{amount:amount},'id=eq.'+orderId).then(function(){toast('Amount synced!','gold');}).catch(function(){toast('Saved locally','error');});
}
function sendOrderEmail(orderId){
  var db=getDB(); var ord=db.orders.find(function(o){return o.id===orderId;}); if(!ord) return;
  var sup=ord.supplierId?db.suppliers.find(function(s){return s.id===ord.supplierId;}):null;
  if(!sup||!sup.email){toast('Supplier email not configured','error');return;}
  var nl=String.fromCharCode(10);
  var subject=encodeURIComponent('Order #'+orderId.slice(-6).toUpperCase()+' - Bar da Praia');
  var itemLines=ord.items.map(function(i){return '- '+i.name+': '+i.orderQty+' '+(i.unit||'');}).join(nl);
  var bodyText='Dear '+sup.name+','+nl+nl+'Please find our order below:'+nl+nl+itemLines+nl+nl+'Date: '+new Date(ord.date).toLocaleDateString('pt-PT')+(ord.amount>0?nl+'Amount: EUR '+ord.amount.toFixed(2):'')+nl+nl+'Best regards,'+nl+'Bar da Praia';
  var body=encodeURIComponent(bodyText);
  window.location.href='mailto:'+encodeURIComponent(sup.email)+'?subject='+subject+'&body='+body;
  toast('Opening email client...','gold');
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
    for(var c=0;c<Math.min(conf,3);c++) dots+='<span style="background:'+(isSel?'rgba(255,255,255,.8)':'#2b8a4b')+'"></span>';
    for(var p=0;p<Math.min(pend,3);p++) dots+='<span style="background:'+(isSel?'rgba(255,255,255,.8)':'#b7791f')+'"></span>';
    for(var n=0;n<Math.min(nos,3);n++) dots+='<span style="background:'+(isSel?'rgba(255,255,255,.8)':'#b4402f')+'"></span>';
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
  if(res.length===0){el.innerHTML='<div class="empty-state"><i class="fas fa-calendar-xmark"></i><p>No reservations this day. Tap New to add one.</p></div>';return;}
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
  actEl.children[0].style.cssText='background:#2b8a4b;color:white;flex:1;justify-content:center';
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
var taskCatIcons={maintenance:'<i class="fas fa-wrench"></i>',cleaning:'<i class="fas fa-broom"></i>',call:'<i class="fas fa-phone"></i>',purchase:'<i class="fas fa-cart-shopping"></i>',admin:'<i class="fas fa-clipboard-list"></i>',staff:'<i class="fas fa-users"></i>',other:'<i class="fas fa-thumbtack"></i>'};
var priColors={high:'badge-red',medium:'badge-yellow',low:'badge-green'};

// Helper: get assignedTo as array always (handles legacy string or array)
function taskAssignees(t){
  if(!t.assignedTo) return [];
  if(Array.isArray(t.assignedTo)) return t.assignedTo;
  return t.assignedTo ? [t.assignedTo] : [];
}

// Helper: resolve user IDs to display names
function assigneeNames(ids){
  var db=getDB();
  return ids.map(function(id){
    var u=db.appUsers.find(function(u){return u.id===id||u.username===id;});
    return u ? u.name.split(' ')[0] : id;
  });
}

// Render the multi-user checkbox picker inside the task modal
function renderTaskAssigneePicker(selectedIds){
  var db=getDB();
  var el=document.getElementById('task-assigned-list'); if(!el) return;
  var users=db.appUsers.filter(function(u){return u.active;});
  if(!users.length){
    el.innerHTML='<div style="font-size:12px;color:var(--ocean-400)">No users found</div>';
    return;
  }
  el.innerHTML=users.map(function(u){
    var checked=selectedIds.indexOf(u.id)!==-1;
    return '<label style="display:flex;align-items:center;gap:8px;cursor:pointer;padding:3px 4px;border-radius:6px;'+(checked?'background:#e6f0f9':'')+'\">'
      +'<input type="checkbox" class="task-assignee-cb" value="'+esc(u.id)+'" '+(checked?'checked':'')+' style="width:15px;height:15px;accent-color:var(--ocean-500)">'
      +'<span style="font-size:13px;font-weight:600;color:var(--ocean-800)">'+esc(u.name)+'</span>'
      +'<span style="font-size:11px;color:var(--ocean-400)">'+esc('@'+u.username)+'</span>'
    +'</label>';
  }).join('');
}

function getCheckedAssignees(){
  return Array.from(document.querySelectorAll('.task-assignee-cb:checked')).map(function(cb){return cb.value;});
}

function openAddTaskModal(editId){
  var db=getDB();
  if(editId){
    var t=db.tasks.find(function(x){return x.id===editId;}); if(!t) return;
    document.getElementById('task-modal-title').textContent='Edit Task';
    document.getElementById('task-edit-id').value=editId;
    document.getElementById('task-title').value=t.title;
    document.getElementById('task-description').value=t.description||'';
    document.getElementById('task-category').value=t.category||'other';
    document.getElementById('task-priority').value=t.priority||'medium';
    document.getElementById('task-deadline').value=t.deadline||'';
    document.getElementById('task-recurrence').value=t.recurrence||'';
    renderTaskAssigneePicker(taskAssignees(t));
  } else {
    document.getElementById('task-modal-title').textContent='New Task';
    document.getElementById('task-edit-id').value='';
    document.getElementById('task-title').value='';
    document.getElementById('task-description').value='';
    document.getElementById('task-category').value='maintenance';
    document.getElementById('task-priority').value='medium';
    document.getElementById('task-deadline').value='';
    document.getElementById('task-recurrence').value='';
    renderTaskAssigneePicker([]);
  }
  openModal('modal-add-task');
}

function saveTask(){
  var title=document.getElementById('task-title').value.trim(); if(!title){toast('Title required!','error');return;}
  var db=getDB(); var editId=document.getElementById('task-edit-id').value;
  var desc=document.getElementById('task-description').value.trim();
  var cat=document.getElementById('task-category').value;
  var pri=document.getElementById('task-priority').value;
  var asn=getCheckedAssignees(); // array of user IDs
  var dl=document.getElementById('task-deadline').value;
  var rec=document.getElementById('task-recurrence').value;
  var isNew=!editId;
  var task={title:title,description:desc,category:cat,priority:pri,assignedTo:asn,deadline:dl,recurrence:rec};
  var sbTask={title:title,description:desc,category:cat,priority:pri,assigned_to:JSON.stringify(asn),deadline:dl||null,recurrence:rec||null};
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
  // Send Web Push to all assigned users (cross-device)
  if(asn.length) sendTaskPush(title, asn);
}

function nextRecurDeadline(baseDate, recurrence){
  var d=baseDate?new Date(baseDate):new Date();
  var dayNames=['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
  switch(recurrence){
    case 'daily':    d.setDate(d.getDate()+1); break;
    case 'weekly':   d.setDate(d.getDate()+7); break;
    case 'biweekly': d.setDate(d.getDate()+14); break;
    case 'monthly':  d.setMonth(d.getMonth()+1); break;
    default:
      var targetDay=dayNames.indexOf(recurrence);
      if(targetDay>=0){var cur=d.getDay();var diff=targetDay-cur;if(diff<=0)diff+=7;d.setDate(d.getDate()+diff);}
  }
  return d.toISOString().substring(0,10);
}

function setTaskStatus(id,status){
  var db=getDB(); var idx=db.tasks.findIndex(function(t){return t.id===id;});
  var doneAt=status==='done'?new Date().toISOString():null;
  if(idx!==-1){db.tasks[idx].status=status;if(doneAt) db.tasks[idx].doneAt=doneAt;saveDB(db);}
  renderTasks(); renderDashboard(); toast('Marked as '+status+'!');
  var patch={status:status}; if(doneAt) patch.done_at=doneAt;
  sbFetch('PATCH','tasks',patch,'id=eq.'+id).catch(function(){});
  if(status==='done'&&idx!==-1){
    var t=db.tasks[idx];
    if(t.recurrence){
      var nextDl=nextRecurDeadline(t.deadline||null,t.recurrence);
      var newId=uid();
      var asnArr=taskAssignees(t);
      var newTask={id:newId,title:t.title,description:t.description,category:t.category,priority:t.priority,assignedTo:asnArr,deadline:nextDl,recurrence:t.recurrence,status:'pending',createdAt:new Date().toISOString()};
      db=getDB(); db.tasks.push(newTask); saveDB(db);
      renderTasks(); renderDashboard();
      sbFetch('POST','tasks',{title:newTask.title,description:newTask.description,category:newTask.category,priority:newTask.priority,assigned_to:JSON.stringify(asnArr),deadline:nextDl,recurrence:newTask.recurrence,status:'pending'})
        .then(function(rows){ if(rows&&rows[0]){var ti=db.tasks.findIndex(function(x){return x.id===newId;}); if(ti!==-1){db.tasks[ti].id=rows[0].id;saveDB(db);}} })
        .catch(function(){});
      toast('Next recurrence scheduled for '+nextDl+'!','gold');
    }
  }
}

function deleteTask(id){
  if(!confirm('Delete task?')) return;
  var db=getDB(); db.tasks=db.tasks.filter(function(t){return t.id!==id;}); saveDB(db);
  renderTasks(); renderDashboard(); toast('Deleting...');
  sbFetch('DELETE','tasks',null,'id=eq.'+id).then(function(){ toast('Deleted.'); }).catch(function(){ toast('Deleted locally','error'); });
}

function renderTasks(){
  var db=getDB();
  // Filter tasks visible to current user:
  // Admin sees ALL tasks.
  // Non-admin sees ONLY tasks where their user ID is explicitly in the assignedTo array.
  // Unassigned tasks or legacy string-assigned tasks are admin-only.
  var allTasks=db.tasks;
  if(!isAdmin && currentUser){
    allTasks=db.tasks.filter(function(t){
      var ids=taskAssignees(t);
      return ids.indexOf(currentUser.id)!==-1;
    });
  }
  document.getElementById('task-count-pending').textContent=allTasks.filter(function(t){return t.status==='pending';}).length;
  document.getElementById('task-count-progress').textContent=allTasks.filter(function(t){return t.status==='in-progress';}).length;
  document.getElementById('task-count-done').textContent=allTasks.filter(function(t){return t.status==='done';}).length;
  var tasks=allTasks.slice().sort(function(a,b){
    if(!a.deadline && !b.deadline) return 0;
    if(!a.deadline) return 1;
    if(!b.deadline) return -1;
    return a.deadline.localeCompare(b.deadline);
  });
  if(currentTaskFilter==='open') tasks=tasks.filter(function(t){return t.status==='pending'||t.status==='in-progress';});
  else if(currentTaskFilter!=='all') tasks=tasks.filter(function(t){return t.status===currentTaskFilter;});
  var el=document.getElementById('task-list'); if(!el) return;
  if(tasks.length===0){el.innerHTML='<div class="empty-state"><i class="fas fa-clipboard-list"></i><p>No tasks here.</p></div>';return;}
  var now=new Date();
  var recurLabels={daily:'Daily',weekly:'Weekly',biweekly:'Every 2 wks',monthly:'Monthly',monday:'Every Mon',tuesday:'Every Tue',wednesday:'Every Wed',thursday:'Every Thu',friday:'Every Fri',saturday:'Every Sat',sunday:'Every Sun'};
  el.innerHTML=tasks.map(function(t){
    var isOverdue=t.deadline&&new Date(t.deadline)<now&&t.status!=='done';
    var recurBadge=t.recurrence?'<span class="badge" style="background:#efeafb;color:var(--purple);border:1px solid #cfc2f0"><i class="fas fa-repeat" style="margin-right:3px;font-size:9px"></i>'+(recurLabels[t.recurrence]||esc(t.recurrence))+'</span>':'';
    var ids=taskAssignees(t);
    var names=assigneeNames(ids);
    var assignedBadges=names.map(function(n){return '<span style="background:#e6ebee;color:#17695c;border-radius:20px;padding:1px 7px;font-size:11px;font-weight:600"><i class="fas fa-user" style="margin-right:3px;font-size:9px"></i>'+esc(n)+'</span>';}).join('');
    var canEdit=isAdmin;
    return '<div class="task-item'+(t.status==='done'?' done':'')+'">'
      +'<div class="task-top"><div class="task-icon">'+(taskCatIcons[t.category]||'<i class="fas fa-thumbtack"></i>')+'</div>'
      +'<div class="task-body"><div class="task-title'+(t.status==='done'?' done-text':'')+'">'+esc(t.title)+'</div>'
      +'<div class="task-badges"><span class="badge '+(priColors[t.priority]||'badge-gray')+'">'+esc(t.priority||'medium')+'</span><span class="badge '+(t.status==='done'?'badge-green':t.status==='in-progress'?'badge-blue':'badge-yellow')+'">'+esc(t.status)+'</span>'+(isOverdue?'<span class="badge badge-red">Overdue</span>':'')+recurBadge+'</div>'
      +(t.description?'<div class="task-desc">'+esc(t.description)+'</div>':'')
      +'<div class="task-meta" style="gap:5px;flex-wrap:wrap">'
        +(assignedBadges||'<span style="font-size:11px;color:var(--ocean-300)">Unassigned</span>')
        +(t.deadline?'<span style="margin-left:4px"><i class="fas fa-calendar-check" style="margin-right:3px"></i>'+esc(t.deadline)+'</span>':'')
      +'</div>'
      +'</div></div>'
      +'<div class="task-actions">'
        +(t.status!=='done'?'<button class="btn btn-sm" style="background:#e3f4e8;color:#2b8a4b;border:1.5px solid #a9dcb9;flex:1;justify-content:center" data-task-done="'+esc(t.id)+'"><i class="fas fa-check"></i> Done</button>':'')
        +(t.status==='pending'?'<button class="btn btn-sm" style="background:#e6f0f9;color:#2f6fa8;border:1.5px solid #b5d0e8" data-task-progress="'+esc(t.id)+'"><i class="fas fa-play"></i></button>':'')
        +(canEdit?'<button class="btn btn-secondary btn-sm" data-edit-task="'+esc(t.id)+'"><i class="fas fa-pen"></i></button>':'')
        +(canEdit?'<button class="btn btn-danger btn-sm btn-icon" data-delete-task="'+esc(t.id)+'"><i class="fas fa-trash"></i></button>':'')
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
  '#2a9683','#b7791f','#6d4fc2','#2b8a4b','#b4402f',
  '#2a9683','#b07b59','#6d4fc2','#2f6fa8','#a6741e'
];

// Zone colours
var ZONE_COLORS = {
  'Dishes':    '#5f7079',
  'Kitchen':   '#b07b59',
  'Bar':       '#2a9683',
  'Service':   '#2f6fa8',
  'Foccaceria':'#a6741e'
};
var ZONES_ORDER = ['Dishes','Kitchen','Bar','Service','Foccaceria',''];

function timeToMins(t) {
  if (!t) return 0;
  var parts = t.split(':');
  return parseInt(parts[0]) * 60 + parseInt(parts[1] || 0);
}

function ganttShiftColor(shift, db) {
  // Color by zone if set, else by employee
  if (shift.zone && ZONE_COLORS[shift.zone]) return ZONE_COLORS[shift.zone];
  var emps = db.employees || [];
  var idx = emps.indexOf(shift.employee);
  if (idx === -1) idx = Math.abs(shift.employee.split('').reduce(function(a,c){return a+c.charCodeAt(0);},0)) % GANTT_COLORS.length;
  return GANTT_COLORS[idx % GANTT_COLORS.length];
}

var currentShiftsTab = 'gantt';
function switchShiftsTab(tab) {
  currentShiftsTab = tab;
  ['gantt','tips','hours','attendance','team'].forEach(function(t) {
    var panel = document.getElementById('shifts-panel-'+t);
    if (panel) panel.style.display = (t === tab) ? '' : 'none';
  });
  document.querySelectorAll('[data-shifts-tab]').forEach(function(btn) {
    btn.classList.toggle('active', btn.dataset.shiftsTab === tab);
  });
  if (tab === 'tips')       renderShiftsTipsTab();
  if (tab === 'hours')      renderShiftsHoursTab();
  if (tab === 'attendance') renderShiftsAttendanceTab();
  if (tab === 'team')       renderShiftsTeamTab();
  refreshSection('shifts');
}

function renderShifts(){
  var ws = getWeekStart(shiftsWeekOffset);
  var we = new Date(ws); we.setDate(we.getDate()+6);
  var mnames=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  document.getElementById('shifts-week-label').textContent =
    mnames[ws.getMonth()]+' '+ws.getDate()+' – '+mnames[we.getMonth()]+' '+we.getDate()+', '+we.getFullYear();

  var db = getDB();
  var canShiftEdit = isAdmin || hasRole('shift_mgr');
  var addBtn = document.getElementById('btn-add-shift');
  if (addBtn) addBtn.style.display = canShiftEdit ? 'flex' : 'none';
  var repBtn = document.getElementById('btn-repeat-week');
  if (repBtn) repBtn.style.display = canShiftEdit ? 'flex' : 'none';
  // Team tab only for shift_mgr / admin
  var teamTabBtn = document.getElementById('shifts-tab-team-btn');
  if (teamTabBtn) teamTabBtn.style.display = canShiftEdit ? '' : 'none';

  // Refresh current active tab
  switchShiftsTab(currentShiftsTab);

  var el = document.getElementById('shifts-list'); if (!el) return;
  var wsStr = toDateStr(ws);

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
    var dayShifts = db.shifts.filter(function(s){
      return s.day === day && s.weekStart === wsStr;
    });
    // Employees with no shift this day (unallocated)
    var allocatedEmps = dayShifts.map(function(s){ return s.employee; });
    var absentEmps = (db.absences||[]).filter(function(a){ return a.date===dateStr; }).map(function(a){ return a.employee; });
    var unallocated = (db.employees||[]).filter(function(e){
      return allocatedEmps.indexOf(e) === -1 && absentEmps.indexOf(e) === -1;
    });

    // Ruler: same flex layout as gantt-row so track aligns perfectly with bars
    var rulerInner = '';
    for (var h = GANTT_START; h <= GANTT_END; h++) {
      var showLabel = (h === GANTT_START) || (h % 2 === 0) || (h === GANTT_END);
      if (!showLabel) continue;
      var pct = ((h - GANTT_START) / GANTT_SPAN * 100).toFixed(2);
      rulerInner += '<span class="gantt-hour-label" style="left:'+pct+'%">'+h+'</span>';
    }
    var rulerHTML = '<div class="gantt-hours"><div class="gantt-hours-spacer"></div><div class="gantt-hours-track">'+rulerInner+'</div></div>';

    // Grid lines: offset by emp-label width (60px) so they align with bars inside gantt-track
    var gridHTML = '<div class="gantt-grid-lines" style="left:60px">';
    for (var g = GANTT_START; g <= GANTT_END; g++) {
      var gPct = ((g - GANTT_START) / GANTT_SPAN * 100).toFixed(2);
      gridHTML += '<div class="gantt-grid-line" style="left:'+gPct+'%"></div>';
    }
    gridHTML += '</div>';

    // Now-line for today — offset by emp-label width (60px) then percentage of remaining track
    var nowLineHTML = '';
    if (isToday && nowInRange) {
      // The now-line must sit inside the track area (starts at 60px from gantt-rows left)
      // We use a wrapper offset to 60px, then position the line as % within that wrapper
      nowLineHTML = '<div style="position:absolute;top:0;bottom:0;left:60px;right:0;pointer-events:none;z-index:10">'
        +'<div class="gantt-now-line" style="left:'+nowPct.toFixed(2)+'%"><div class="gantt-now-dot"></div></div>'
        +'</div>';
    }

    // Shift bars — group by zone, day-offs always last
    var rowsHTML = '';
    if (dayShifts.length === 0) {
      rowsHTML = '<div class="gantt-empty">No shifts scheduled</div>';
    } else {
      // Sort: by zone order first, day-offs always last
      var sorted = dayShifts.slice().sort(function(a, b) {
        if (a.dayOff && !b.dayOff) return 1;
        if (!a.dayOff && b.dayOff) return -1;
        var za = ZONES_ORDER.indexOf(a.zone||''); if(za===-1) za=ZONES_ORDER.length;
        var zb = ZONES_ORDER.indexOf(b.zone||''); if(zb===-1) zb=ZONES_ORDER.length;
        if (za !== zb) return za - zb;
        return (a.employee||'').localeCompare(b.employee||'');
      });

      // Group into zone sections
      var lastZone = null;
      rowsHTML = sorted.map(function(s) {
        var zoneHeader = '';
        var zone = s.dayOff ? 'day-off' : (s.zone || '');
        if (zone !== lastZone) {
          lastZone = zone;
          if (zone && zone !== 'day-off') {
            var zColor = ZONE_COLORS[zone] || '#5f7079';
            zoneHeader = '<div style="font-size:10px;font-weight:800;color:'+zColor+';text-transform:uppercase;letter-spacing:.8px;padding:4px 0 2px;margin-top:4px">'+esc(zone)+'</div>';
          } else if (zone === 'day-off') {
            zoneHeader = '<div style="font-size:10px;font-weight:800;color:#5f7079;text-transform:uppercase;letter-spacing:.8px;padding:4px 0 2px;margin-top:4px">Day Off</div>';
          }
        }

        var rowHTML = '';
        if (s.dayOff) {
          var offLabel = esc(s.employee);
          rowHTML = '<div class="gantt-row">'
            +'<div class="gantt-emp-label" title="'+esc(s.employee)+'">'+esc(s.employee.split(' ')[0])+'</div>'
            +'<div class="gantt-track">'
              +'<div class="gantt-bar" style="left:0%;width:100%;background:var(--slate-800);color:var(--slate-300);font-size:10px" title="'+offLabel+' — Day Off"'
                +' data-action-shift="'+esc(s.id)+'" data-action-shift-date="'+esc(dateStr)+'" data-action-shift-ws="'+esc(wsStr)+'">'
                +'<i class="fas fa-ban" style="margin-right:3px"></i>'+offLabel
              +'</div>'
            +'</div>'
          +'</div>';
        } else {
          var startMins = timeToMins(s.start);
          var endMins   = timeToMins(s.end);
          if (endMins <= startMins) endMins += 24*60;
          var clampStart = Math.max(startMins, GANTT_START*60);
          var clampEnd   = Math.min(endMins,   GANTT_END*60);
          var leftPct  = ((clampStart/60 - GANTT_START) / GANTT_SPAN * 100).toFixed(2);
          var widthPct = Math.max(((clampEnd - clampStart)/60 / GANTT_SPAN * 100), 0.5).toFixed(2);
          var color = ganttShiftColor(s, db);
          var barLabel = esc(s.employee.split(' ')[0]) + ' ' + esc(s.start) + '–' + esc(s.end);
          if (s.role) barLabel += ' · '+esc(s.role);
          rowHTML = '<div class="gantt-row">'
            +'<div class="gantt-emp-label" title="'+esc(s.employee)+(s.zone?' ['+esc(s.zone)+']':'')+'">'+esc(s.employee.split(' ')[0])+'</div>'
            +'<div class="gantt-track">'
              +'<div class="gantt-bar" style="left:'+leftPct+'%;width:'+widthPct+'%;background:'+color+'" title="'+barLabel+'"'
                +' data-action-shift="'+esc(s.id)+'" data-action-shift-date="'+esc(dateStr)+'" data-action-shift-ws="'+esc(wsStr)+'">'
                + barLabel
              +'</div>'
            +'</div>'
          +'</div>';
        }
        return zoneHeader + rowHTML;
      }).join('');
    }

    // Unallocated employees section
    var unallocatedHTML = '';
    if (unallocated.length > 0) {
      var unallocBtns = unallocated.map(function(e) {
        var absBtns = canShiftEdit
          ? ' <button class="btn btn-sm" style="background:var(--red-50);color:#b4402f;border:1px solid #f0b8ae;font-size:10px;padding:2px 6px" data-mark-absent="'+esc(e)+'" data-absent-date="'+esc(dateStr)+'" data-absent-ws="'+esc(wsStr)+'" title="Mark absent"><i class="fas fa-user-slash"></i></button>'
          : '';
        return '<span style="display:inline-flex;align-items:center;gap:4px;background:#f2f5f6;border:1px solid #d5dde1;border-radius:6px;padding:3px 8px;font-size:12px;color:#4a6572;font-weight:600">'+esc(e)+absBtns+'</span>';
      }).join(' ');
      unallocatedHTML = '<div style="padding:6px 10px;background:#fdf3e1;border:1px dashed var(--amber-200);border-radius:8px;margin-top:6px;display:flex;flex-wrap:wrap;align-items:center;gap:6px">'
        +'<span style="font-size:10px;font-weight:800;color:var(--amber-700);text-transform:uppercase;letter-spacing:.5px;white-space:nowrap"><i class="fas fa-circle-question" style="margin-right:3px"></i>Not allocated:</span>'
        +unallocBtns+'</div>';
    }
    // Absent employees section
    var absentHTML = '';
    if (absentEmps.length > 0) {
      var absentBtns = absentEmps.map(function(e) {
        var absObj = (db.absences||[]).find(function(a){ return a.date===dateStr && a.employee===e; });
        var justLabel = absObj && absObj.justified ? '<span style="font-size:9px;background:#e3f4e8;color:var(--green-700);border-radius:4px;padding:1px 5px;font-weight:700">Justified</span>' : '<span style="font-size:9px;background:var(--red-50);color:var(--red-700);border-radius:4px;padding:1px 5px;font-weight:700">Unjustified</span>';
        var toggleBtn = canShiftEdit ? ' <button class="btn btn-sm" style="font-size:10px;padding:2px 5px;background:#f2f5f6;border:1px solid #b7c3c9" data-toggle-justified="'+(absObj?esc(absObj.id):'')+'"><i class="fas fa-rotate"></i></button>' : '';
        var removeBtn = canShiftEdit ? ' <button class="btn btn-sm" style="font-size:10px;padding:2px 5px;background:#f2f5f6;border:1px solid #b7c3c9" data-remove-absent="'+(absObj?esc(absObj.id):'')+'"><i class="fas fa-times"></i></button>' : '';
        return '<span style="display:inline-flex;align-items:center;gap:4px;background:var(--red-50);border:1px solid #f0b8ae;border-radius:6px;padding:3px 8px;font-size:12px;color:#b4402f;font-weight:600">'
          +esc(e)+' '+justLabel+toggleBtn+removeBtn+'</span>';
      }).join(' ');
      absentHTML = '<div style="padding:6px 10px;background:var(--red-50);border:1px dashed var(--red-400);border-radius:8px;margin-top:6px;display:flex;flex-wrap:wrap;align-items:center;gap:6px">'
        +'<span style="font-size:10px;font-weight:800;color:var(--red-700);text-transform:uppercase;letter-spacing:.5px;white-space:nowrap"><i class="fas fa-user-slash" style="margin-right:3px"></i>Absent:</span>'
        +absentBtns+'</div>';
    }

    return '<div class="gantt-wrap"'
        +(isToday?' style="border-color:var(--teal-500)"':'')+'>' 
      +'<div class="gantt-day-header">'
        +'<div>'
          +'<div class="gantt-day-name">'+day+(isToday?' <span class="badge badge-blue" style="font-size:10px;vertical-align:middle">Today</span>':'')+'</div>'
          +'<div class="gantt-day-date">'+dateStr+'</div>'
        +'</div>'
        +(canShiftEdit?'<button class="btn btn-secondary btn-sm" data-add-shift-day="'+esc(day)+'"><i class="fas fa-plus"></i> Add</button>':'')
      +'</div>'
      +'<div class="gantt-timeline">'
        + rulerHTML
        +'<div class="gantt-rows" style="position:relative">'
          + gridHTML
          + nowLineHTML
          + rowsHTML
        +'</div>'
      +'</div>'
      + unallocatedHTML
      + absentHTML
    +'</div>';
  }).join('');
}
// ── Tips tab ────────────────────────────────────────────────────
function renderShiftsTipsTab() {
  var ws = getWeekStart(shiftsWeekOffset);
  var wsStr = toDateStr(ws);
  var db = getDB();
  var canShiftEdit = isAdmin || hasRole('shift_mgr');
  var locked = db.tipsLocked && db.tipsLocked[wsStr];

  var tipsInp    = document.getElementById('shifts-tips-input');
  var inputRow   = document.getElementById('tips-input-row');
  var lockNotice = document.getElementById('tips-locked-notice');

  if (tipsInp) tipsInp.value = db.weekTips && db.weekTips[wsStr] ? db.weekTips[wsStr] : '';

  if (!canShiftEdit) {
    if (inputRow) inputRow.style.display = 'none';
    if (lockNotice) lockNotice.style.display = 'none';
  } else if (locked) {
    if (inputRow) inputRow.style.display = 'none';
    if (lockNotice) lockNotice.style.display = 'flex';
  } else {
    if (inputRow) inputRow.style.display = '';
    if (lockNotice) lockNotice.style.display = 'none';
  }

  var el = document.getElementById('shifts-tips-result');
  if (!el) return;

  // ── Week distribution ──
  var total = db.weekTips && db.weekTips[wsStr] ? parseFloat(db.weekTips[wsStr]) : 0;
  var weekHTML = '';
  if (total > 0) {
    var hoursMap = {};
    db.shifts.forEach(function(s) {
      if (s.weekStart !== wsStr || s.dayOff) return;
      var sm = timeToMins(s.start), em = timeToMins(s.end);
      if (em <= sm) em += 24*60;
      var hrs = (em-sm)/60;
      if (hrs > 0) hoursMap[s.employee] = (hoursMap[s.employee]||0) + hrs;
    });
    var wEmps = Object.keys(hoursMap);
    if (wEmps.length > 0) {
      var totalHrs = wEmps.reduce(function(acc,e){return acc+hoursMap[e];},0);
      var wRows = wEmps.sort(function(a,b){return hoursMap[b]-hoursMap[a];}).map(function(e){
        var share = (hoursMap[e]/totalHrs)*total;
        return '<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--ocean-100)">'
          +'<div><div style="font-weight:700;font-size:13px;color:var(--ocean-900)">'+esc(e)+'</div>'
          +'<div style="font-size:11px;color:var(--ocean-400)">'+hoursMap[e].toFixed(1)+' hrs ('+Math.round(hoursMap[e]/totalHrs*100)+'%)</div></div>'
          +'<div style="font-weight:800;font-size:16px;color:#b7791f">'+fmtEur(share)+'</div>'
          +'</div>';
      }).join('');
      weekHTML = '<div style="background:#fdf3e1;border-radius:10px;padding:12px;border:1px solid #f0d391;margin-bottom:14px">'
        +'<div style="font-size:12px;color:var(--amber-700);font-weight:600;margin-bottom:8px"><i class="fas fa-calendar-week" style="margin-right:4px"></i>This Week — Total: '+fmtEur(total)+' / '+totalHrs.toFixed(1)+' hrs</div>'
        +wRows+'</div>';
    }
  }

  // ── Month & Year totals ──
  var now = new Date();
  var curMonth = now.getFullYear()+'-'+String(now.getMonth()+1).padStart(2,'0');
  var curYear  = String(now.getFullYear());
  // Compute per-employee tips for month and year from db.weekTips
  var empTipsMonth = {}, empTipsYear = {};
  var allEmps = (db.employees||[]).slice().sort();
  Object.keys(db.weekTips||{}).forEach(function(wk) {
    var wkTotal = parseFloat(db.weekTips[wk]); if (!wkTotal || wkTotal <= 0) return;
    var wkMonth = wk.substring(0,7); // YYYY-MM
    var wkYear  = wk.substring(0,4); // YYYY
    // Build hours map for that week
    var hm = {};
    db.shifts.forEach(function(s) {
      if (s.weekStart !== wk || s.dayOff) return;
      var sm2 = timeToMins(s.start), em2 = timeToMins(s.end);
      if (em2 <= sm2) em2 += 24*60;
      var h = (em2-sm2)/60;
      if (h > 0) hm[s.employee] = (hm[s.employee]||0) + h;
    });
    var empKeys = Object.keys(hm);
    if (empKeys.length === 0) return;
    var totH = empKeys.reduce(function(a,e){return a+hm[e];},0);
    empKeys.forEach(function(e) {
      var share2 = (hm[e]/totH)*wkTotal;
      if (wkMonth === curMonth) empTipsMonth[e] = (empTipsMonth[e]||0) + share2;
      if (wkYear  === curYear)  empTipsYear[e]  = (empTipsYear[e]||0)  + share2;
    });
  });

  var mNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var monthLabel = mNames[now.getMonth()]+' '+curYear;

  // Build month table
  var mTotal = Object.values(empTipsMonth).reduce(function(a,v){return a+v;},0);
  var yTotal = Object.values(empTipsYear).reduce(function(a,v){return a+v;},0);

  var periodRows = allEmps.map(function(e) {
    var mTip = empTipsMonth[e]||0;
    var yTip = empTipsYear[e]||0;
    return '<tr style="border-bottom:1px solid var(--ocean-50)">'
      +'<td style="padding:9px 10px;font-weight:700;color:var(--ocean-900);font-size:13px">'+esc(e)+'</td>'
      +'<td style="padding:9px 8px;text-align:right;font-weight:800;font-size:14px;color:#b7791f">'+(mTip>0?fmtEur(mTip):'—')+'</td>'
      +'<td style="padding:9px 8px;text-align:right;font-weight:800;font-size:14px;color:#b7791f">'+(yTip>0?fmtEur(yTip):'—')+'</td>'
      +'</tr>';
  }).join('');

  var periodHTML = '';
  if (allEmps.length > 0) {
    periodHTML = '<div style="background:white;border-radius:10px;border:1px solid var(--ocean-100);overflow:hidden;box-shadow:var(--shadow)">'
      +'<div style="padding:10px 12px;background:var(--ocean-50);display:flex;align-items:center;gap:7px;font-size:13px;font-weight:700;color:var(--ocean-800)">'
        +'<i class="fas fa-chart-bar" style="color:#b7791f"></i> Tips by Employee'
      +'</div>'
      +'<table style="width:100%;border-collapse:collapse">'
      +'<thead><tr style="background:var(--ocean-50)">'
        +'<th style="padding:8px 10px;text-align:left;font-size:11px;font-weight:700;color:var(--ocean-600)">Employee</th>'
        +'<th style="padding:8px 8px;text-align:right;font-size:11px;font-weight:700;color:#b7791f">'+monthLabel+'</th>'
        +'<th style="padding:8px 8px;text-align:right;font-size:11px;font-weight:700;color:#b7791f">'+curYear+' Total</th>'
      +'</tr></thead>'
      +'<tbody>'+periodRows+'</tbody>'
      +'<tfoot><tr style="background:var(--ocean-50);border-top:2px solid var(--ocean-200)">'
        +'<td style="padding:8px 10px;font-weight:800;font-size:12px;color:var(--ocean-700)">TOTAL</td>'
        +'<td style="padding:8px 8px;text-align:right;font-weight:800;font-size:13px;color:#b7791f">'+(mTotal>0?fmtEur(mTotal):'—')+'</td>'
        +'<td style="padding:8px 8px;text-align:right;font-weight:800;font-size:13px;color:#b7791f">'+(yTotal>0?fmtEur(yTotal):'—')+'</td>'
      +'</tr></tfoot>'
      +'</table></div>';
  }

  el.innerHTML = weekHTML + periodHTML;
  if (!weekHTML && !periodHTML) el.innerHTML = '<div style="text-align:center;padding:20px;color:var(--ocean-400);font-size:13px">No tips recorded yet for this period.</div>';
}

// ── Hours & Days tab ─────────────────────────────────────────────
function renderShiftsHoursTab() {
  var ws = getWeekStart(shiftsWeekOffset);
  var wsStr = toDateStr(ws);
  var db = getDB();
  var el = document.getElementById('shifts-hours-content'); if (!el) return;

  var empStats = {}; // {name: {hours, days, zones}}
  db.shifts.forEach(function(s) {
    if (s.weekStart !== wsStr || s.dayOff) return;
    var sm = timeToMins(s.start), em = timeToMins(s.end);
    if (em <= sm) em += 24*60;
    var hrs = (em-sm)/60;
    if (hrs <= 0) return;
    if (!empStats[s.employee]) empStats[s.employee] = {hours:0, days:0, zones:{}};
    empStats[s.employee].hours += hrs;
    empStats[s.employee].days  += 1;
    if (s.zone) empStats[s.employee].zones[s.zone] = (empStats[s.employee].zones[s.zone]||0)+1;
  });

  // Also count Day Off entries as scheduled days
  db.shifts.forEach(function(s) {
    if (s.weekStart !== wsStr || !s.dayOff) return;
    if (!empStats[s.employee]) empStats[s.employee] = {hours:0, days:0, zones:{}};
    // day off doesn't add hours but is a scheduled day
  });

  var emps = (db.employees||[]).slice().sort();
  if (emps.length === 0) { el.innerHTML = '<div class="empty-state"><p>No employees yet.</p></div>'; return; }

  var rows = emps.map(function(e) {
    var st = empStats[e] || {hours:0, days:0, zones:{}};
    var zonesStr = Object.keys(st.zones).map(function(z){ return z+'('+st.zones[z]+'d)'; }).join(', ') || '—';
    return '<tr style="border-bottom:1px solid var(--ocean-50)">'
      +'<td style="padding:9px 10px;font-weight:700;color:var(--ocean-900);font-size:13px">'+esc(e)+'</td>'
      +'<td style="padding:9px 8px;text-align:center;font-weight:800;font-size:15px;color:var(--ocean-600)">'+st.hours.toFixed(1)+'h</td>'
      +'<td style="padding:9px 8px;text-align:center;font-weight:700;color:#2b8a4b">'+st.days+'d</td>'
      +'<td style="padding:9px 8px;font-size:11px;color:#5f7079">'+esc(zonesStr)+'</td>'
      +'</tr>';
  }).join('');

  el.innerHTML = '<div style="background:white;border-radius:var(--radius);border:1px solid var(--ocean-100);overflow:hidden;box-shadow:var(--shadow)">'
    +'<table style="width:100%;border-collapse:collapse">'
    +'<thead><tr style="background:var(--ocean-50)">'
    +'<th style="padding:9px 10px;text-align:left;font-size:12px;font-weight:700;color:var(--ocean-600)">Employee</th>'
    +'<th style="padding:9px 8px;text-align:center;font-size:12px;font-weight:700;color:var(--ocean-600)">Hours</th>'
    +'<th style="padding:9px 8px;text-align:center;font-size:12px;font-weight:700;color:var(--ocean-600)">Days</th>'
    +'<th style="padding:9px 8px;text-align:left;font-size:12px;font-weight:700;color:var(--ocean-600)">Zones</th>'
    +'</tr></thead><tbody>'+rows+'</tbody></table></div>';
}

// ── Attendance tab ────────────────────────────────────────────────
function renderShiftsAttendanceTab() {
  var ws = getWeekStart(shiftsWeekOffset);
  var wsStr = toDateStr(ws);
  var db = getDB();
  var el = document.getElementById('shifts-attendance-content'); if (!el) return;

  var emps = (db.employees||[]).slice().sort();
  if (emps.length === 0) { el.innerHTML = '<div class="empty-state"><p>No employees yet.</p></div>'; return; }

  var allAbsences = db.absences || [];
  var weekAbsences = allAbsences.filter(function(a){ return a.weekStart === wsStr; });

  // Current month/year strings
  var now = new Date();
  var curMonth = now.getFullYear()+'-'+String(now.getMonth()+1).padStart(2,'0'); // YYYY-MM
  var curYear  = String(now.getFullYear());
  var mNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var monthLabel = mNames[now.getMonth()];

  // Compute per-employee presence stats: week / month / year / all-time
  var rows = emps.map(function(e) {
    var weekAbs = weekAbsences.filter(function(a){ return a.employee===e; });
    var weekAbsJ = weekAbs.filter(function(a){ return a.justified; }).length;
    var weekAbsU = weekAbs.filter(function(a){ return !a.justified; }).length;

    // All-time
    var eAbsAll = allAbsences.filter(function(a){ return a.employee===e; });
    var eWorkedAll = db.shifts.filter(function(s){ return s.employee===e && !s.dayOff; }).length;
    var eSchAll = eWorkedAll + eAbsAll.length;
    var pctAll = eSchAll > 0 ? Math.round((eWorkedAll/eSchAll)*100) : 100;

    // Current month — match absences and shifts whose weekStart starts with curMonth
    var eAbsMonth = eAbsAll.filter(function(a){ return (a.date||'').substring(0,7) === curMonth; });
    var eWorkedMonth = db.shifts.filter(function(s){
      return s.employee===e && !s.dayOff && (s.weekStart||'').substring(0,7) === curMonth;
    }).length;
    var eSchMonth = eWorkedMonth + eAbsMonth.length;
    var pctMonth = eSchMonth > 0 ? Math.round((eWorkedMonth/eSchMonth)*100) : 100;

    // Current year
    var eAbsYear = eAbsAll.filter(function(a){ return (a.date||'').substring(0,4) === curYear; });
    var eWorkedYear = db.shifts.filter(function(s){
      return s.employee===e && !s.dayOff && (s.weekStart||'').substring(0,4) === curYear;
    }).length;
    var eSchYear = eWorkedYear + eAbsYear.length;
    var pctYear = eSchYear > 0 ? Math.round((eWorkedYear/eSchYear)*100) : 100;

    function pctBadge(p) {
      var c = p>=90?'#2b8a4b':p>=75?'#b7791f':'#b4402f';
      return '<span style="font-weight:800;font-size:13px;color:'+c+'">'+p+'%</span>';
    }

    var weekAbsStr = weekAbs.length===0
      ? '<span style="color:#2b8a4b;font-weight:700;font-size:12px"><i class="fas fa-check"></i> Present</span>'
      : (weekAbsJ>0?'<span style="color:#b7791f;font-weight:700;font-size:12px">'+weekAbsJ+'J </span>':'')
       +(weekAbsU>0?'<span style="color:#b4402f;font-weight:700;font-size:12px">'+weekAbsU+'U</span>':'');

    return '<tr style="border-bottom:1px solid var(--ocean-50)">'
      +'<td style="padding:8px 10px;font-weight:700;color:var(--ocean-900);font-size:13px">'+esc(e)+'</td>'
      +'<td style="padding:8px 6px;text-align:center">'+weekAbsStr+'</td>'
      +'<td style="padding:8px 6px;text-align:center;font-weight:800;color:#b4402f;font-size:13px">'+eAbsAll.length+'</td>'
      +'<td style="padding:8px 6px;text-align:center">'+pctBadge(pctMonth)+'</td>'
      +'<td style="padding:8px 6px;text-align:center">'+pctBadge(pctYear)+'</td>'
      +'<td style="padding:8px 6px;text-align:center">'+pctBadge(pctAll)+'</td>'
      +'</tr>';
  }).join('');

  el.innerHTML = '<div style="background:white;border-radius:var(--radius);border:1px solid var(--ocean-100);overflow:hidden;box-shadow:var(--shadow)">'
    +'<table style="width:100%;border-collapse:collapse">'
    +'<thead><tr style="background:var(--ocean-50)">'
    +'<th style="padding:8px 10px;text-align:left;font-size:11px;font-weight:700;color:var(--ocean-600)">Employee</th>'
    +'<th style="padding:8px 6px;text-align:center;font-size:11px;font-weight:700;color:var(--ocean-600)">This Week</th>'
    +'<th style="padding:8px 6px;text-align:center;font-size:11px;font-weight:700;color:#b4402f">Absences</th>'
    +'<th style="padding:8px 6px;text-align:center;font-size:11px;font-weight:700;color:#b7791f">'+monthLabel+'</th>'
    +'<th style="padding:8px 6px;text-align:center;font-size:11px;font-weight:700;color:#b7791f">'+curYear+'</th>'
    +'<th style="padding:8px 6px;text-align:center;font-size:11px;font-weight:700;color:var(--ocean-500)">All-time</th>'
    +'</tr></thead><tbody>'+rows+'</tbody></table></div>';
}

// ── Team Members tab ─────────────────────────────────────────────
function renderShiftsTeamTab() {
  var db = getDB();
  var el = document.getElementById('shifts-employee-list'); if (!el) return;
  el.innerHTML = db.employees.length===0
    ? '<div class="empty-state" style="padding:16px"><p>No employees yet.</p></div>'
    : db.employees.map(function(e){
        return '<div class="emp-row"><div style="display:flex;align-items:center;gap:10px"><div class="emp-avatar">'+esc(e[0])+'</div><span style="font-size:14px;font-weight:600;color:var(--ocean-900)">'+esc(e)+'</span></div>'
          +'<button class="btn btn-danger btn-sm btn-icon" data-remove-emp="'+esc(e)+'"><i class="fas fa-trash"></i></button></div>';
      }).join('');
}

// ── Absence helpers ──────────────────────────────────────────────
function markAbsent(employee, dateStr, wsStr) {
  var db = getDB();
  // Check not already absent
  if ((db.absences||[]).find(function(a){ return a.employee===employee && a.date===dateStr; })) {
    toast('Already marked absent', 'error'); return;
  }
  var newId = uid();
  db.absences = db.absences || [];
  db.absences.push({id:newId, employee:employee, date:dateStr, weekStart:wsStr, justified:false, createdAt:new Date().toISOString()});
  saveDB(db);
  renderShifts();
  sbFetch('POST','absences',{id:newId,employee:employee,date:dateStr,week_start:wsStr,justified:false})
    .then(function(rows){ if(rows&&rows[0]){var si=db.absences.findIndex(function(a){return a.id===newId;}); if(si!==-1){db.absences[si].id=rows[0].id; saveDB(db);}} })
    .catch(function(){ toast('Absence saved locally','error'); });
  toast(employee+' marked absent','error');
}

function markAbsentJustified(employee, dateStr, wsStr, justified) {
  var db = getDB();
  if ((db.absences||[]).find(function(a){ return a.employee===employee && a.date===dateStr; })) {
    toast('Already marked absent', 'error'); return;
  }
  var newId = uid();
  db.absences = db.absences || [];
  db.absences.push({id:newId, employee:employee, date:dateStr, weekStart:wsStr, justified:!!justified, createdAt:new Date().toISOString()});
  saveDB(db);
  renderShifts();
  sbFetch('POST','absences',{id:newId,employee:employee,date:dateStr,week_start:wsStr,justified:!!justified})
    .then(function(rows){ if(rows&&rows[0]){var si=db.absences.findIndex(function(a){return a.id===newId;}); if(si!==-1){db.absences[si].id=rows[0].id; saveDB(db);}} })
    .catch(function(){ toast('Absence saved locally','error'); });
  toast(employee+' marked '+(justified?'justified':'unjustified')+' absence', justified?'gold':'error');
}

function toggleJustified(absId) {
  var db = getDB();
  var abs = (db.absences||[]).find(function(a){ return a.id===absId; }); if (!abs) return;
  abs.justified = !abs.justified;
  saveDB(db);
  renderShifts();
  sbFetch('PATCH','absences',{justified:abs.justified},'id=eq.'+absId).catch(function(){});
  toast(abs.justified ? 'Marked justified' : 'Marked unjustified');
}

function removeAbsent(absId) {
  var db = getDB();
  db.absences = (db.absences||[]).filter(function(a){ return a.id!==absId; });
  saveDB(db);
  renderShifts();
  sbFetch('DELETE','absences',null,'id=eq.'+absId).catch(function(){});
  toast('Absence removed');
}

function prefillShiftRows(emp){
  if(!emp) return;
  var db=getDB();
  var ws=toDateStr(getWeekStart(shiftsWeekOffset));
  var rows=document.querySelectorAll('#shift-days-body tr[data-shift-day]');
  rows.forEach(function(row){
    var day=row.dataset.shiftDay;
    var existing=db.shifts.find(function(s){return s.employee===emp&&s.day===day&&s.weekStart===ws;});
    var startEl=row.querySelector('.shift-day-start');
    var endEl=row.querySelector('.shift-day-end');
    var offChk=row.querySelector('.shift-day-off-chk');
    var zoneEl=row.querySelector('.shift-day-zone');
    if(existing){
      offChk.checked=!!existing.dayOff;
      startEl.disabled=!!existing.dayOff;
      endEl.disabled=!!existing.dayOff;
      startEl.value=existing.dayOff?'':existing.start||'09:00';
      endEl.value=existing.dayOff?'':existing.end||'17:00';
      if(zoneEl) zoneEl.value=existing.zone||'';
    } else {
      offChk.checked=false;
      startEl.disabled=false; endEl.disabled=false;
      startEl.value='09:00'; endEl.value='17:00';
      if(zoneEl) zoneEl.value='';
    }
  });
}
function openAddShiftModal(preDay){
  updateAllDropdowns();
  document.getElementById('shift-modal-title').textContent='Add Shifts';
  document.getElementById('shift-edit-id').value='';
  document.getElementById('shift-employee').value='';
  document.getElementById('shift-role').value='';
  // Reset all rows to defaults
  var rows=document.querySelectorAll('#shift-days-body tr[data-shift-day]');
  rows.forEach(function(row){
    row.querySelector('.shift-day-start').value='09:00';
    row.querySelector('.shift-day-end').value='17:00';
    row.querySelector('.shift-day-off-chk').checked=false;
    row.querySelector('.shift-day-start').disabled=false;
    row.querySelector('.shift-day-end').disabled=false;
    var zoneEl=row.querySelector('.shift-day-zone'); if(zoneEl) zoneEl.value='';
  });
  openModal('modal-add-shift');
}
// A shift slot is one person on one day of one week. Server writes always clear the whole
// slot first and only then insert, so a slow or failed request can never leave two rows.
function shiftSlotFilter(emp, weekStart, day) {
  return 'employee=eq.'+encodeURIComponent(emp)+'&week_start=eq.'+weekStart+'&day=eq.'+encodeURIComponent(day);
}
// Bars carry the shift id; when the server id replaces the temporary one, redraw once so taps keep working
var shiftsRerenderTimer=null;
function rerenderShiftsSoon() {
  clearTimeout(shiftsRerenderTimer);
  shiftsRerenderTimer=setTimeout(function(){ var sec=document.getElementById('section-shifts'); if(sec&&sec.classList.contains('active')) renderShifts(); }, 120);
}
function shiftToRow(s) {
  return {employee:s.employee,day:s.day,start_time:s.start,end_time:s.end,role:s.role||'',zone:s.zone||'',day_off:!!s.dayOff,week_start:s.weekStart};
}
var repeatBusy=false;
function repeatWeek(){
  if(repeatBusy){ toast('Still copying the previous week, one moment','error'); return; }
  var db=getDB();
  var curWs=toDateStr(getWeekStart(shiftsWeekOffset));
  var prevWs=toDateStr(getWeekStart(shiftsWeekOffset-1));
  var prevShifts=db.shifts.filter(function(s){return s.weekStart===prevWs;});
  if(prevShifts.length===0){toast('No shifts found in previous week','error');return;}
  // Only people still on the Team are copied; one row per person per day even if the source had repeats
  var team=db.employees||[]; var seen={}; var copies=[];
  prevShifts.forEach(function(s){
    if(team.indexOf(s.employee)===-1) return;
    var k=s.employee+'|'+s.day; if(seen[k]) return; seen[k]=true;
    copies.push({id:uid(),employee:s.employee,day:s.day,start:s.start,end:s.end,role:s.role||'',zone:s.zone||'',dayOff:!!s.dayOff,weekStart:curWs,createdAt:new Date().toISOString()});
  });
  if(copies.length===0){toast('Nobody on the Team has shifts in the previous week','error');return;}
  db.shifts=db.shifts.filter(function(s){return s.weekStart!==curWs;}).concat(copies);
  saveDB(db); renderShifts();
  repeatBusy=true;
  sbFetch('DELETE','shifts',null,'week_start=eq.'+curWs)
    .then(function(){ return sbFetch('POST','shifts',copies.map(shiftToRow)); })
    .then(function(rows2){
      var d2=getDB();
      (rows2||[]).forEach(function(r){ var si=d2.shifts.findIndex(function(x){return x.weekStart===curWs&&x.employee===r.employee&&x.day===r.day;}); if(si!==-1) d2.shifts[si].id=r.id; });
      saveDB(d2); repeatBusy=false; rerenderShiftsSoon(); toast(copies.length+' shifts copied from previous week!','gold');
    })
    .catch(function(){ repeatBusy=false; toast('Copy not saved online. Check the connection and try again.','error'); });
}
function saveShift(){
  var emp=document.getElementById('shift-employee').value; if(!emp){toast('Select employee!','error');return;}
  var role=document.getElementById('shift-role').value.trim();
  var db=getDB();
  var ws=toDateStr(getWeekStart(shiftsWeekOffset));
  var rows=document.querySelectorAll('#shift-days-body tr[data-shift-day]');
  var saved=0;
  rows.forEach(function(row){
    var day=row.dataset.shiftDay;
    var isDayOff=row.querySelector('.shift-day-off-chk').checked;
    var start=isDayOff?'00:00':row.querySelector('.shift-day-start').value;
    var end=isDayOff?'00:00':row.querySelector('.shift-day-end').value;
    var zoneEl=row.querySelector('.shift-day-zone');
    var zone=zoneEl?zoneEl.value:'';
    if(!isDayOff&&(!start||!end)) return;
    db.shifts=db.shifts.filter(function(s){return !(s.employee===emp&&s.day===day&&s.weekStart===ws);});
    var newId=uid();
    var ns={id:newId,employee:emp,day:day,start:start,end:end,role:role,zone:zone,dayOff:isDayOff,weekStart:ws,createdAt:new Date().toISOString()};
    db.shifts.push(ns);
    sbFetch('DELETE','shifts',null,shiftSlotFilter(emp,ws,day))
      .then(function(){ return sbFetch('POST','shifts',shiftToRow(ns)); })
      .then(function(rows2){
        if(rows2&&rows2[0]){var d2=getDB(); var si=d2.shifts.findIndex(function(s){return s.id===newId;}); if(si!==-1){d2.shifts[si].id=rows2[0].id; saveDB(d2); rerenderShiftsSoon();}}
      })
      .catch(function(){ toast(emp+' '+day+' not saved online. Check the connection and save again.','error'); });
    saved++;
  });
  saveDB(db); closeModal('modal-add-shift'); renderShifts();
  toast(saved+' shift'+(saved!==1?'s':'')+' saved!');
}
var _shiftActionId = ''; var _shiftActionDate = ''; var _shiftActionWs = '';
function openShiftActionSheet(shiftId, dateStr, wsStr) {
  var db = getDB();
  var s = db.shifts.find(function(x){ return x.id === shiftId; });
  if (!s) return;
  _shiftActionId = shiftId; _shiftActionDate = dateStr; _shiftActionWs = wsStr;
  var nameEl = document.getElementById('shift-action-name');
  var infoEl = document.getElementById('shift-action-info');
  var avatarEl = document.getElementById('shift-action-avatar');
  if (nameEl) nameEl.textContent = s.employee;
  if (avatarEl) avatarEl.textContent = s.employee.charAt(0).toUpperCase();
  var info = s.dayOff ? 'Day Off' : (s.start + '–' + s.end);
  if (s.zone) info += ' · ' + s.zone;
  info += ' · ' + (dateStr || '');
  if (infoEl) infoEl.textContent = info;
  // Hide absent buttons if already absent for this date
  var alreadyAbsent = (db.absences||[]).some(function(a){ return a.employee===s.employee && a.date===dateStr; });
  var canEdit = isAdmin || hasRole('shift_mgr');
  var editBtn = document.getElementById('shift-action-edit');
  var absentUBtn = document.getElementById('shift-action-absent-unjust');
  var absentJBtn = document.getElementById('shift-action-absent-just');
  var delBtn = document.getElementById('shift-action-delete');
  if (editBtn) editBtn.style.display = canEdit ? '' : 'none';
  if (absentUBtn) absentUBtn.style.display = (canEdit && !alreadyAbsent) ? '' : 'none';
  if (absentJBtn) absentJBtn.style.display = (canEdit && !alreadyAbsent) ? '' : 'none';
  if (delBtn) delBtn.style.display = canEdit ? '' : 'none';
  openModal('modal-shift-action');
}
function deleteShift(id){
  if(!confirm('Remove shift?')) return;
  var db=getDB(); var s=db.shifts.find(function(x){return x.id===id;}); if(!s) return;
  db.shifts=db.shifts.filter(function(x){return !(x.employee===s.employee&&x.day===s.day&&x.weekStart===s.weekStart);}); saveDB(db);
  renderShifts(); toast('Removing...');
  sbFetch('DELETE','shifts',null,shiftSlotFilter(s.employee,s.weekStart,s.day)).then(function(){ toast('Shift removed.'); }).catch(function(){ toast('Removed locally','error'); });
}
function generateTips(){
  var raw=(document.getElementById('shifts-tips-input').value||'').trim().replace(',','.');
  var total=parseFloat(raw); if(isNaN(total)||total<=0){toast('Enter a valid tips amount','error');return;}
  var db=getDB();
  var ws=toDateStr(getWeekStart(shiftsWeekOffset));
  // Gather worked hours per employee (exclude day-off)
  var hoursMap={};
  db.shifts.forEach(function(s){
    if(s.weekStart!==ws||s.dayOff) return;
    var sm=timeToMins(s.start), em=timeToMins(s.end);
    if(em<=sm) em+=24*60;
    var hrs=(em-sm)/60;
    if(hrs>0) hoursMap[s.employee]=(hoursMap[s.employee]||0)+hrs;
  });
  var emps=Object.keys(hoursMap);
  var el=document.getElementById('shifts-tips-result');
  if(emps.length===0){if(el)el.innerHTML='<p style="font-size:13px;color:#b4402f">No worked shifts found for this week.</p>';return;}
  var totalHrs=emps.reduce(function(s,e){return s+hoursMap[e];},0);
  // Save tips + lock for this week
  db.weekTips[ws]=total;
  if(!db.tipsLocked) db.tipsLocked={};
  db.tipsLocked[ws]=true;
  saveDB(db);
  sbFetch('PATCH','settings',{week_tips:db.weekTips},'id=eq.config').catch(function(e){ console.error('week_tips sync:',e); });
  var rows=emps.sort(function(a,b){return hoursMap[b]-hoursMap[a];}).map(function(e){
    var share=(hoursMap[e]/totalHrs)*total;
    return '<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--ocean-100)">'
      +'<div><div style="font-weight:700;font-size:13px;color:var(--ocean-900)">'+esc(e)+'</div>'
      +'<div style="font-size:11px;color:var(--ocean-400)">'+hoursMap[e].toFixed(1)+' hrs ('+Math.round(hoursMap[e]/totalHrs*100)+'%)</div></div>'
      +'<div style="font-weight:800;font-size:16px;color:#b7791f">'+fmtEur(share)+'</div>'
      +'</div>';
  }).join('');
  if(el) el.innerHTML='<div style="background:#fdf3e1;border-radius:10px;padding:12px;border:1px solid #f0d391">'
    +'<div style="font-size:12px;color:var(--amber-700);font-weight:600;margin-bottom:8px">Total: '+fmtEur(total)+' / '+totalHrs.toFixed(1)+' total hrs</div>'
    +rows+'</div>';
  // Lock the input row and show notice
  renderShiftsTipsTab();
  toast('Tips generated and locked for this week!','gold');
}

// ================================================
// BLACK BOX
// ================================================
var bbCatIcons={beverages:'<i class="fas fa-glass-water"></i>',food:'<i class="fas fa-burger"></i>',cocktails:'<i class="fas fa-martini-glass"></i>',beer:'<i class="fas fa-beer-mug-empty"></i>',wine:'<i class="fas fa-wine-glass"></i>',spirits:'<i class="fas fa-whiskey-glass"></i>',other:'<i class="fas fa-box"></i>'};
function renderBlackBox(){
  var locked=document.getElementById('blackbox-locked');
  var content=document.getElementById('blackbox-content');
  if(!isAdmin){locked.style.display='flex';content.style.display='none';return;}
  locked.style.display='none'; content.style.display='block';
  switchBbTab(currentBbTab);
}
function switchBbTab(t){
  currentBbTab=t;
  ['daily','records','items','menu'].forEach(function(x){
    var btn=document.getElementById('bb-tab-'+x); if(btn) btn.classList.toggle('active',x===t);
    var panel=document.getElementById('bb-panel-'+x); if(panel) panel.style.display=x===t?'block':'none';
  });
  if(t==='daily') renderBbDaily();
  if(t==='records') renderBbRecords();
  if(t==='items') renderBbItemRecords();
  if(t==='menu') renderBbMenuManage();
  refreshSection('blackbox');
}
function loadBbEntryForDate(dateStr){
  var db=getDB();
  var existing=(db.bbEntries||[]).find(function(e){return e.date===dateStr;});
  bbSelectedItems={};
  if(existing) existing.items.forEach(function(i){bbSelectedItems[i.id]=i.qty;});
}
function renderBbDaily(){
  var today=toDateStr(new Date());
  var dateInp=document.getElementById('bb-entry-date');
  var prevDate=dateInp?dateInp.dataset.bbLoadedDate||'':'';
  if(dateInp&&!dateInp.value) dateInp.value=today;
  var activeDateStr=(dateInp&&dateInp.value)?dateInp.value:today;
  // Auto-load existing entry whenever the active date changes
  if(activeDateStr!==prevDate){
    loadBbEntryForDate(activeDateStr);
    if(dateInp) dateInp.dataset.bbLoadedDate=activeDateStr;
  }
  var isToday=activeDateStr===today;
  var todayLbl=document.getElementById('bb-today-date');
  if(todayLbl) todayLbl.textContent=isToday?'(Today)':'';
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
      +'<div style="font-size:20px;flex-shrink:0">'+(bbCatIcons[item.category]||'<i class="fas fa-box"></i>')+'</div>'
      +'<div style="flex:1;min-width:0">'
        +'<div class="bb-name">'+esc(item.name)+'</div>'
        +'<div class="bb-cat">'+esc(item.category)+'</div>'
      +'</div>'
      +'<div class="bb-qty-ctrl" style="flex-shrink:0">'
        +'<button class="bb-qty-btn bb-qty-minus" data-bb-minus="'+esc(item.id)+'" style="'+(qty===0?'opacity:.3':'')+'">-</button>'
        +'<input type="number" class="bb-qty-val bb-qty-input" data-bb-qty-input="'+esc(item.id)+'" value="'+qty+'" min="0" step="1" />'
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
  var dateInp=document.getElementById('bb-entry-date');
  var entryDate=(dateInp&&dateInp.value)?dateInp.value:toDateStr(new Date());
  var idx=db.bbEntries.findIndex(function(e){return e.date===entryDate;});
  var entry={id:uid(),date:entryDate,items:items,total:total,savedAt:new Date().toISOString()};
  if(idx!==-1) db.bbEntries[idx]=entry; else db.bbEntries.push(entry);
  saveDB(db); toast('Saving...','gold');
  bbSelectedItems={};
  var diReset=document.getElementById('bb-entry-date');
  if(diReset) diReset.dataset.bbLoadedDate='';
  renderBbDaily(); renderBbRecords();
  // Use proper upsert header to handle both insert and update
  fetch(SB_URL+'/rest/v1/bb_entries', {
    method:'POST',
    headers:{'apikey':SB_KEY,'Authorization':'Bearer '+SB_KEY,'Content-Type':'application/json','Prefer':'resolution=merge-duplicates'},
    body:JSON.stringify({date:entryDate,items:items,total:total,saved_at:new Date().toISOString()})
  }).then(function(){ toast('Entry saved for '+entryDate+'! '+fmtEur(total),'gold'); }).catch(function(){ toast('Saved locally only','error'); });
}
function clearDailyEntry(){
  bbSelectedItems={};
  var dateInpEl=document.getElementById('bb-entry-date');
  if(dateInpEl) dateInpEl.dataset.bbLoadedDate='';
  renderBbDaily(); toast('Cleared.');
}
function renderBbRecords(){
  var db=getDB();
  var today=toDateStr(new Date());
  var now=new Date();

  // Sync date range inputs with state
  var fromInp=document.getElementById('bb-records-from');
  var toInp=document.getElementById('bb-records-to');
  if(fromInp&&fromInp.value!==bbRecordsFrom) fromInp.value=bbRecordsFrom;
  if(toInp&&toInp.value!==bbRecordsTo) toInp.value=bbRecordsTo;

  // Determine filtered entries
  var hasRange=bbRecordsFrom||bbRecordsTo;
  var allEntries=db.bbEntries||[];
  var filtered=allEntries.filter(function(e){
    if(bbRecordsFrom&&e.date<bbRecordsFrom) return false;
    if(bbRecordsTo&&e.date>bbRecordsTo) return false;
    return true;
  });

  // Summary cards — when range active show range total; else show today/week/month
  var weekStart=toDateStr(getMonday(now));
  var monthStart=now.getFullYear()+'-'+String(now.getMonth()+1).padStart(2,'0')+'-01';
  var lbl1=document.getElementById('bb-sum-label-today');
  var lbl2=document.getElementById('bb-sum-label-week');
  var lbl3=document.getElementById('bb-sum-label-month');
  var elSum1=document.getElementById('bb-today-sum');
  var elSum2=document.getElementById('bb-week-sum');
  var elSum3=document.getElementById('bb-month-sum');
  if(hasRange){
    var rangeTotal=filtered.reduce(function(s,e){return s+(parseFloat(e.total)||0);},0);
    var rangeCount=filtered.length;
    if(elSum1) elSum1.textContent=fmtEur(rangeTotal);
    if(elSum2) elSum2.textContent=String(rangeCount);
    if(elSum3) elSum3.textContent=rangeCount>0?fmtEur(rangeTotal/rangeCount):'€0';
    if(lbl1) lbl1.textContent='Range Total';
    if(lbl2) lbl2.textContent='Days';
    if(lbl3) lbl3.textContent='Avg/Day';
  } else {
    var entries=db.bbEntries||[];
    var todayEntry=entries.find(function(e){return e.date===today;});
    var weekEntries=entries.filter(function(e){return e.date>=weekStart&&e.date<=today;});
    var monthEntries=entries.filter(function(e){return e.date>=monthStart&&e.date<=today;});
    if(elSum1) elSum1.textContent=fmtEur(todayEntry?parseFloat(todayEntry.total)||0:0);
    if(elSum2) elSum2.textContent=fmtEur(weekEntries.reduce(function(s,e){return s+(parseFloat(e.total)||0);},0));
    if(elSum3) elSum3.textContent=fmtEur(monthEntries.reduce(function(s,e){return s+(parseFloat(e.total)||0);},0));
    if(lbl1) lbl1.textContent='Today';
    if(lbl2) lbl2.textContent='This Week';
    if(lbl3) lbl3.textContent='This Month';
  }

  // Daily records list
  var el=document.getElementById('bb-records-list'); if(!el) return;
  var sorted=filtered.slice().sort(function(a,b){return b.date.localeCompare(a.date);});
  if(sorted.length===0){el.innerHTML='<div class="empty-state"><i class="fas fa-cash-register"></i><p>No records'+(hasRange?' in this range':'')+' yet.</p></div>';return;}
  el.innerHTML=sorted.map(function(entry){
    return '<div class="bb-daily-record">'
      +'<div class="bb-daily-record-header">'
        +'<div style="font-weight:700;font-size:15px;color:var(--ocean-900)">'+fmtDateShort(entry.date)+(entry.date===today?' <span class="badge badge-gray">Today</span>':'')+'</div>'
        +'<div style="display:flex;align-items:center;gap:8px">'
          +'<div style="font-weight:800;font-size:16px;color:var(--ocean-700)">'+fmtEur(entry.total)+'</div>'
          +'<button class="btn btn-secondary btn-sm btn-icon" data-edit-bb-entry="'+esc(entry.date)+'" title="Edit entry"><i class="fas fa-pen"></i></button>'
        +'</div>'
      +'</div>'
      +'<div>'+entry.items.map(function(i){
        return '<div style="display:flex;justify-content:space-between;font-size:13px;padding:2px 0;color:var(--ocean-700)"><span>'+esc(i.name)+' x'+i.qty+'</span><span style="font-weight:600">'+fmtEur(i.subtotal)+'</span></div>';
      }).join('')+'</div>'
    +'</div>';
  }).join('');
}
function renderBbItemRecords(){
  var db=getDB();
  // Sync date range inputs
  var fromInp=document.getElementById('bb-items-from');
  var toInp=document.getElementById('bb-items-to');
  if(fromInp&&fromInp.value!==bbItemsFrom) fromInp.value=bbItemsFrom;
  if(toInp&&toInp.value!==bbItemsTo) toInp.value=bbItemsTo;
  var srchInp=document.getElementById('bb-records-search');
  if(srchInp&&srchInp.value!==bbRecordsSearch) srchInp.value=bbRecordsSearch;
  // Filter entries by date range
  var filtered=db.bbEntries.filter(function(e){
    if(bbItemsFrom&&e.date<bbItemsFrom) return false;
    if(bbItemsTo&&e.date>bbItemsTo) return false;
    return true;
  });
  // Aggregate per item
  var itemMap={};
  filtered.forEach(function(entry){
    entry.items.forEach(function(i){
      if(!itemMap[i.id]) itemMap[i.id]={name:i.name,timesSold:0,revenue:0};
      itemMap[i.id].timesSold+=i.qty;
      itemMap[i.id].revenue+=i.subtotal;
    });
  });
  var itemList=Object.keys(itemMap).map(function(id){return Object.assign({id:id},itemMap[id]);});
  itemList.sort(function(a,b){return b.timesSold-a.timesSold;});
  // Apply search filter
  var searchLow=bbRecordsSearch.toLowerCase();
  var itemListFiltered=searchLow?itemList.filter(function(i){return i.name.toLowerCase().indexOf(searchLow)!==-1;}):itemList;
  var sumEl=document.getElementById('bb-item-summary-list'); if(!sumEl) return;
  if(itemListFiltered.length===0){
    sumEl.innerHTML='<div class="empty-state" style="padding:14px"><i class="fas fa-chart-bar"></i><p>'+(searchLow?'No items match your search.':'No data yet.')+'</p></div>';
  } else {
    sumEl.innerHTML=itemListFiltered.map(function(i){
      return '<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;background:var(--ocean-50);border-radius:10px;margin-bottom:6px">'
        +'<div style="flex:1;min-width:0">'
          +'<div style="font-weight:700;font-size:14px;color:var(--ocean-900)">'+esc(i.name)+'</div>'
          +'<div style="font-size:12px;color:var(--ocean-400)">Sold '+i.timesSold+' time'+(i.timesSold!==1?'s':'')+'</div>'
        +'</div>'
        +'<div style="font-weight:800;font-size:16px;color:var(--ocean-700);margin-left:10px">'+fmtEur(i.revenue)+'</div>'
      +'</div>';
    }).join('');
  }
}
function editBbEntry(dateStr){
  var db=getDB();
  var entry=db.bbEntries.find(function(e){return e.date===dateStr;}); if(!entry) return;
  // Repopulate bbSelectedItems from saved entry
  bbSelectedItems={};
  entry.items.forEach(function(i){ bbSelectedItems[i.id]=i.qty; });
  // Switch to daily tab and set the date
  switchBbTab('daily');
  var dateInp=document.getElementById('bb-entry-date');
  if(dateInp) dateInp.value=dateStr;
  renderBbDaily();
  toast('Editing entry for '+fmtDateShort(dateStr),'gold');
}
function renderBbMenuManage(){
  var db=getDB(); var el=document.getElementById('bb-menu-manage-list'); if(!el) return;
  if(db.bbMenu.length===0){el.innerHTML='<div class="empty-state"><i class="fas fa-tag"></i><p>No menu items.</p></div>';return;}
  el.innerHTML=db.bbMenu.map(function(item){
    return '<div class="bb-item" style="cursor:default">'
      +'<div style="font-size:20px">'+(bbCatIcons[item.category]||'<i class="fas fa-box"></i>')+'</div>'
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
  try {
    var dNow = new Date();
    var dayEl = document.getElementById('dash-date-day'), fullEl = document.getElementById('dash-date-full');
    if (dayEl) dayEl.textContent = dNow.toLocaleDateString('en-GB', { weekday: 'long' });
    if (fullEl) fullEl.textContent = dNow.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch(e) {}
  var db=getDB();
  var today=toDateStr(new Date());
  var todayRes=db.reservations.filter(function(r){return r.date===today;}).sort(function(a,b){return a.time.localeCompare(b.time);});
  document.getElementById('dash-res-count').textContent=todayRes.length;
  var todayEl=document.getElementById('dash-today-res');
  if(todayRes.length===0){todayEl.innerHTML='<div class="empty-state" style="padding:12px"><i class="fas fa-calendar-xmark" style="font-size:22px"></i><p>No reservations today. Add one from Reservations.</p></div>';}
  else todayEl.innerHTML=todayRes.slice(0,5).map(function(r){
    var tables=Array.isArray(r.tables)?r.tables.join(', '):(r.table||'?');
    return '<div class="today-res-item" data-nav="reservations"><div style="width:38px;height:38px;background:var(--ocean-200);border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:var(--ocean-700);flex-shrink:0">'+esc(r.time)+'</div><div style="flex:1"><div style="font-size:13px;font-weight:700;color:var(--ocean-900)">'+esc(r.guestName)+'</div><div style="font-size:11px;color:var(--ocean-400)">'+esc(tables)+' · '+r.guests+' guests</div></div><span class="badge '+(r.status==='confirmed'?'badge-green':r.status==='no-show'?'badge-red':'badge-yellow')+'">'+esc(r.status||'Pending')+'</span></div>';
  }).join('');
  // Tasks: apply the same user-scoping as the Tasks screen
  var allDashTasks=db.tasks;
  if(!isAdmin && currentUser){
    allDashTasks=db.tasks.filter(function(t){
      var ids=taskAssignees(t);
      return ids.indexOf(currentUser.id)!==-1;
    });
  }
  var openTasks=allDashTasks.filter(function(t){return t.status!=='done';}).slice().sort(function(a,b){
    if(!a.deadline && !b.deadline) return 0;
    if(!a.deadline) return 1;
    if(!b.deadline) return -1;
    return a.deadline.localeCompare(b.deadline);
  });
  document.getElementById('dash-task-count').textContent=openTasks.length;
  document.getElementById('dash-task-badge').className='badge '+(openTasks.length>0?'badge-gray':'badge-green');
  document.getElementById('dash-task-badge').textContent=openTasks.length>0?'Open':'All Done';
  // Render open tasks panel on dashboard
  var tasksPanelEl=document.getElementById('dash-tasks-panel');
  var tasksBadgeEl=document.getElementById('dash-tasks-panel-badge');
  if(tasksBadgeEl){ tasksBadgeEl.textContent=openTasks.length; tasksBadgeEl.style.display=openTasks.length>0?'inline':'none'; }
  if(tasksPanelEl){
    if(openTasks.length===0){
      tasksPanelEl.innerHTML='<div class="empty-state" style="padding:14px"><i class="fas fa-check-circle" style="color:#2b8a4b;font-size:22px"></i><p>All done!</p></div>';
    } else {
      var now2=new Date();
      tasksPanelEl.innerHTML=openTasks.slice(0,6).map(function(t){
        var isOverdue=t.deadline&&new Date(t.deadline)<now2;
        var priColor=t.priority==='high'?'badge-red':t.priority==='low'?'badge-gray':'badge-yellow';
        return '<div class="today-res-item" data-nav="tasks" style="cursor:pointer;gap:10px">'          +'<div style="width:34px;height:34px;background:var(--ocean-100);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0">'+(taskCatIcons[t.category]||'<i class="fas fa-thumbtack"></i>')+'</div>'          +'<div style="flex:1;min-width:0">'            +'<div style="font-size:13px;font-weight:700;color:var(--ocean-900);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+esc(t.title)+'</div>'            +'<div style="font-size:11px;color:var(--ocean-400);margin-top:2px">'              +(t.deadline?'<i class="fas fa-calendar-check" style="margin-right:3px'+(isOverdue?';color:#b4402f':'')+'"></i><span style="'+(isOverdue?'color:#b4402f;font-weight:700':'')+'">'+esc(t.deadline)+'</span>':'<span style="color:var(--ocean-300)">No deadline</span>')            +'</div>'          +'</div>'          +'<span class="badge '+priColor+'" style="flex-shrink:0;align-self:center">'+esc(t.priority||'medium')+'</span>'        +'</div>';
      }).join('')
      +(openTasks.length>6?'<div style="text-align:center;padding:8px;font-size:12px;color:var(--ocean-400);cursor:pointer" data-nav="tasks">+' +(openTasks.length-6)+' more tasks →</div>':'');
    }
  }

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
            +'<div style="font-weight:700;font-size:13px;color:var(--ocean-800);margin-bottom:4px">Order #'+o.id.slice(-6).toUpperCase()+' <span style="font-size:11px;font-weight:500;color:var(--amber-700)">· '+fmtDate(o.date)+'</span></div>'
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

  // Shifts tabs
  var shiftsTabEl = t.closest('[data-shifts-tab]');
  if (shiftsTabEl) { switchShiftsTab(shiftsTabEl.dataset.shiftsTab); return; }

  // Finance tabs & actions
  var finTabEl = t.closest('[data-fin-tab]');
  if (finTabEl) { switchFinTab(finTabEl.dataset.finTab); return; }
  if (t.closest('#btn-save-finance-entry')) { saveFinanceEntry(); return; }
  if (t.closest('#btn-clear-finance-entry')) { clearFinanceEntry(); return; }
  if (t.closest('#btn-fin-edit-entry')) {
    if (!isAdmin && !isFinance) { toast('Finance access required', 'error'); return; }
    finEditMode = true;
    applyFinLockState(finSelectedDate);
    toast('Entry unlocked for editing', 'gold');
    return;
  }
  if (t.closest('#btn-change-finance-pin')) { changeFinancePin(); return; }
  if (t.closest('#btn-fin-recalc')) { renderFinRecords(); return; }
  if (t.closest('#btn-fin-clear-day')) { finRecDayFilter=''; var dp=document.getElementById('fin-rec-day-picker'); if(dp) dp.value=''; renderFinRecords(); return; }

  // Login screen
  if (t.closest('#btn-do-login')) { doLogin(); return; }
  if (t.closest('#btn-app-logout')) { appLogout(); return; }
  if (t.closest('#drawer-logout-btn')) { appLogout(); return; }

  // Users
  if (t.closest('#btn-add-user')) { openUserModal(null); return; }
  if (t.closest('#btn-save-user')) { saveUserModal(); return; }
  el = t.closest('[data-edit-user]');
  if (el) { openUserModal(el.dataset.editUser); return; }
  el = t.closest('[data-delete-user]');
  if (el) { deleteUser(el.dataset.deleteUser); return; }

  // Admin (legacy stubs)
  if (t.closest('#admin-login-btn')) { openAdminLogin(); return; }
  if (t.closest('#admin-logout-btn')) { adminLogout(); return; }
  if (t.closest('#bb-login-prompt-btn') || t.closest('#settings-login-prompt-btn')) { openAdminLogin(function(){showSection(currentSection);}); return; }

  // Inv tabs
  el = t.closest('[data-inv-tab]');
  if (el) { switchInvTab(el.dataset.invTab); return; }

  // Inv category slicers
  el = t.closest('[data-inv-cat]');
  if (el) {
    invCatFilter = el.dataset.invCat;
    document.querySelectorAll('.inv-slicer').forEach(function(btn){ btn.classList.toggle('active', btn.dataset.invCat === invCatFilter); });
    renderInventory();
    return;
  }

  // Inv actions
  if (t.closest('#btn-add-inventory')) { openAddInventoryModal(); return; }
  if (t.closest('#btn-open-order')) { switchInvTab('orders'); return; }
  if (t.closest('#btn-save-inventory')) { saveInventoryItem(); return; }
  if (t.closest('#btn-save-qty-update')) { saveQtyUpdate(); return; }

  if (t.closest('#btn-confirm-quick-order')) { confirmQuickOrder(); return; }

  el = t.closest('[data-quick-order]');
  if (el) { openQuickOrderModal(el.dataset.quickOrder); return; }
  el = t.closest('[data-update-qty]');
  if (el) { openUpdateQtyModal(el.dataset.updateQty); return; }
  el = t.closest('[data-edit-inv]');
  if (el) { openAddInventoryModal(el.dataset.editInv); return; }
  el = t.closest('[data-delete-inv]');
  if (el) { deleteInventoryItem(el.dataset.deleteInv); return; }
  el = t.closest('[data-remove-pending]');
  if (el) {
    var rid=el.dataset.removePending;
    pendingOrderItems=pendingOrderItems.filter(function(x){return x.id!==rid;});
    updateOrdersBadge();
    renderInventory(); // revert card colour
    renderOrderHistory(); // re-render draft cards in orders tab
    return;
  }
  el = t.closest('[data-confirm-draft]');
  if (el) { confirmDraftOrder(el.dataset.confirmDraft); return; }
  el = t.closest('[data-toggle-sup]');
  if (el) {
    var supListEl=document.getElementById('sup-orders-'+el.dataset.toggleSup);
    var supChevron=el.querySelector('.sup-chevron');
    if(supListEl){
      var supOpen=supListEl.style.display==='none';
      supListEl.style.display=supOpen?'block':'none';
      if(supChevron) supChevron.style.transform=supOpen?'rotate(180deg)':'';
    }
    return;
  }
  el = t.closest('[data-toggle-order]');
  if (el) {
    var detailEl=document.getElementById('order-detail-'+el.dataset.toggleOrder);
    var chevron=el.querySelector('.order-chevron');
    if(detailEl){
      var open=detailEl.style.display==='none';
      detailEl.style.display=open?'block':'none';
      if(chevron) chevron.style.transform=open?'rotate(180deg)':'';
    }
    return;
  }
  el = t.closest('[data-confirm-order]');
  if (el) { approveOrder(el.dataset.confirmOrder); return; }

  // Supplier actions
  if (t.closest('#btn-add-supplier')) { openSupplierModal(null); return; }
  if (t.closest('#btn-save-supplier')) { saveSupplierModal(); return; }
  if (t.closest('#btn-confirm-set-amount')) { confirmSetAmount(); return; }
  el = t.closest('[data-edit-supplier]');
  if (el) { openSupplierModal(el.dataset.editSupplier); return; }
  el = t.closest('[data-delete-supplier]');
  if (el) { closeModal('modal-add-supplier'); deleteSupplier(el.dataset.deleteSupplier); return; }
  el = t.closest('[data-supplier-filter]');
  if (el) { filterBySupplier(el.dataset.supplierFilter); return; }
  el = t.closest('[data-send-order-email]');
  if (el) { sendOrderEmail(el.dataset.sendOrderEmail); return; }
  el = t.closest('[data-set-order-amount]');
  if (el) { setOrderAmount(el.dataset.setOrderAmount); return; }
  el = t.closest('[data-log-supplier]');
  if (el) {
    invLogSupplierFilter=el.dataset.logSupplier;
    document.querySelectorAll('.log-sup-filter').forEach(function(b){ b.classList.toggle('active',b.dataset.logSupplier===invLogSupplierFilter); });
    renderInvLog(); return;
  }
  if (t.closest('#btn-back-to-suppliers')) { showAllItems(); return; }

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
  if (t.closest('#btn-repeat-week')) { repeatWeek(); return; }
  if (t.closest('#btn-generate-tips')) { generateTips(); return; }
  el = t.closest('[data-add-shift-day]');
  if (el) { openAddShiftModal(el.dataset.addShiftDay); return; }
  if (t.closest('#btn-save-shift')) { saveShift(); return; }
  if (t.closest('#btn-shifts-prev-week')) { shiftsWeekOffset--; renderShifts(); return; }
  if (t.closest('#btn-shifts-next-week')) { shiftsWeekOffset++; renderShifts(); return; }
  el = t.closest('[data-action-shift]');
  if (el) { openShiftActionSheet(el.dataset.actionShift, el.dataset.actionShiftDate, el.dataset.actionShiftWs); return; }
  // Shift action sheet buttons
  if (t.closest('#shift-action-edit')) {
    closeModal('modal-shift-action');
    var db2=getDB(); var s2=db2.shifts.find(function(x){return x.id===_shiftActionId;});
    if(s2){ updateAllDropdowns(); document.getElementById('shift-modal-title').textContent='Edit Shift';
      document.getElementById('shift-edit-id').value=s2.id;
      document.getElementById('shift-employee').value=s2.employee;
      document.getElementById('shift-role').value=s2.role||'';
      prefillShiftRows(s2.employee);
      openModal('modal-add-shift'); } return;
  }
  if (t.closest('#shift-action-absent-unjust')) {
    closeModal('modal-shift-action');
    var db3=getDB(); var s3=db3.shifts.find(function(x){return x.id===_shiftActionId;});
    if(s3) markAbsentJustified(s3.employee, _shiftActionDate, _shiftActionWs, false); return;
  }
  if (t.closest('#shift-action-absent-just')) {
    closeModal('modal-shift-action');
    var db4=getDB(); var s4=db4.shifts.find(function(x){return x.id===_shiftActionId;});
    if(s4) markAbsentJustified(s4.employee, _shiftActionDate, _shiftActionWs, true); return;
  }
  if (t.closest('#shift-action-delete')) {
    closeModal('modal-shift-action');
    deleteShift(_shiftActionId); return;
  }
  if (t.closest('#btn-tips-unlock')) {
    var db5=getDB(); var ws5=toDateStr(getWeekStart(shiftsWeekOffset));
    if(db5.tipsLocked) db5.tipsLocked[ws5]=false; saveDB(db5); renderShiftsTipsTab(); return;
  }

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
  el = t.closest('[data-edit-bb-entry]');
  if (el) { editBbEntry(el.dataset.editBbEntry); return; }
  if (t.closest('#btn-bb-records-clear-range')) {
    bbRecordsFrom=''; bbRecordsTo='';
    var fr=document.getElementById('bb-records-from'); if(fr) fr.value='';
    var tr=document.getElementById('bb-records-to'); if(tr) tr.value='';
    renderBbRecords(); return;
  }
  if (t.closest('#btn-bb-items-clear-range')) {
    bbItemsFrom=''; bbItemsTo='';
    var fi=document.getElementById('bb-items-from'); if(fi) fi.value='';
    var ti=document.getElementById('bb-items-to'); if(ti) ti.value='';
    renderBbItemRecords(); return;
  }

  // Settings
  if (t.closest('#btn-add-employee') || t.closest('#btn-shifts-add-employee')) { addEmployee(); return; }
  el = t.closest('[data-remove-emp]');
  if (el) { removeEmployee(el.dataset.removeEmp); return; }
  if (t.closest('#btn-add-table-num')) { addTableNum(); return; }
  el = t.closest('[data-del-table]');
  if (el) { removeTableNum(el.dataset.delTable); return; }
  if (t.closest('#btn-change-pin')) { changePin(); return; }
  if (t.closest('#btn-save-fundo')) { saveFundoCaixa(); return; }
  if (t.closest('#btn-save-budgets')) { saveBudgets(); return; }
  if (t.closest('#btn-save-supabase')) { saveSupabase(); return; }
  if (t.closest('#btn-enable-notif')) {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      toast('Push notifications not supported on this browser', 'error'); return;
    }
    if (Notification.permission === 'denied') {
      toast('Notifications are blocked — enable them in your browser site settings', 'error'); return;
    }
    if (Notification.permission === 'default') {
      Notification.requestPermission().then(function(perm) {
        if (perm === 'granted') registerPushSubscription();
        else toast('Permission denied', 'error');
        updateNotifStatusUI();
      });
    } else {
      registerPushSubscription();
    }
    return;
  }
  if (t.closest('#btn-copy-sql')) {
    var sqlPre = document.getElementById('sb-migration-sql');
    if (sqlPre) {
      navigator.clipboard.writeText(sqlPre.textContent || '').then(function(){
        toast('SQL copied to clipboard!', 'gold');
      }).catch(function(){
        toast('Copy failed \u2014 select & copy manually', 'error');
      });
    }
    return;
  }
});

document.addEventListener('input', function(e) {
  var t = e.target;
  if (t.id === 'inv-search') { invSearchVal=t.value; renderInventory(); }
  if (t.id === 'res-search') { resSearchVal=t.value; renderAllReservations(); }
  if (t.id === 'bb-item-search') { bbItemSearchVal=t.value; renderBbMenuSelector(); }
  if (t.id === 'bb-records-search') { bbRecordsSearch=t.value; renderBbItemRecords(); }
  if (t.dataset&&t.dataset.bbQtyInput) {
    var qid=t.dataset.bbQtyInput;
    var qval=parseInt(t.value,10);
    if(isNaN(qval)||qval<0) qval=0;
    if(qval===0) delete bbSelectedItems[qid]; else bbSelectedItems[qid]=qval;
    renderBbSelectedList(); updateBbTotal();
  }
  // Finance live total update
  if (['fin-t51','fin-multibanco','fin-invoiced','fin-gen-expenses','fin-cash-notes','fin-coins'].indexOf(t.id) !== -1) { updateFinDayTotal(); }
  // Finance date picker
  if (t.id === 'fin-entry-date' && t.value) { loadFinEntryForDate(t.value); }
  // BB entry date — also handle on input for mobile browsers
  if (t.id === 'bb-entry-date' && t.value) {
    var dateInpEl2=document.getElementById('bb-entry-date');
    if(dateInpEl2) dateInpEl2.dataset.bbLoadedDate='';
    renderBbDaily();
  }
});
document.addEventListener('change', function(e) {
  var t = e.target;
  if (t.id === 'res-date-filter') { resDateFilter=t.value; renderAllReservations(); }
  if (t.id === 'topbar-emp') { document.getElementById('drawer-user-name').textContent=t.value||'Staff'; }
  if (t.id === 'fin-entry-date' && t.value) { loadFinEntryForDate(t.value); }
  if (t.id === 'fin-rec-day-picker') { finRecDayFilter=t.value||''; renderFinRecords(); }
  if (t.id === 'fin-range-from' || t.id === 'fin-range-to') { renderFinRecords(); }
  // BB entry date change — load existing entry for selected date
  if (t.id === 'bb-entry-date' && t.value) {
    var dateInpEl=document.getElementById('bb-entry-date');
    if(dateInpEl) dateInpEl.dataset.bbLoadedDate=''; // reset so renderBbDaily re-loads
    renderBbDaily();
  }
  // BB records date range filter
  if (t.id === 'bb-records-from') { bbRecordsFrom=t.value; renderBbRecords(); }
  if (t.id === 'bb-records-to') { bbRecordsTo=t.value; renderBbRecords(); }
  // BB item records date range filter
  if (t.id === 'bb-items-from') { bbItemsFrom=t.value; renderBbItemRecords(); }
  if (t.id === 'bb-items-to') { bbItemsTo=t.value; renderBbItemRecords(); }
  // Pre-fill shift rows when employee is selected in shift modal
  if (t.id === 'shift-employee' && t.value) { prefillShiftRows(t.value); }
  // Disable/enable time inputs when Day Off checkbox changes in shift modal
  if (t.classList && t.classList.contains('shift-day-off-chk')) {
    var row = t.closest('tr[data-shift-day]');
    if (row) {
      row.querySelector('.shift-day-start').disabled = t.checked;
      row.querySelector('.shift-day-end').disabled   = t.checked;
      if (t.checked) {
        row.querySelector('.shift-day-start').value = '';
        row.querySelector('.shift-day-end').value   = '';
      } else {
        row.querySelector('.shift-day-start').value = '09:00';
        row.querySelector('.shift-day-end').value   = '17:00';
      }
    }
  }
});

// Enter key on login form
document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    var ls = document.getElementById('login-screen');
    if (ls && !ls.classList.contains('hidden')) {
      doLogin();
      return;
    }
  }
});

// ================================================
// INIT
// ================================================
selectedCalendarDay = toDateStr(new Date());
initSupabase();
updateSessionUI();

(function() {
  var loginBtn   = document.getElementById('btn-do-login');
  var syncStatus = document.getElementById('login-sync-status');
  if (syncStatus) syncStatus.textContent = 'Connecting to server...';

  function unlockLogin(offline) {
    if (loginBtn) {
      loginBtn.disabled = false;
      loginBtn.style.opacity = '';
      loginBtn.style.cursor = '';
      loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Sign In';
    }
    if (syncStatus) {
      if (offline) {
        syncStatus.style.color = 'var(--red-400,var(--red-400))';
        syncStatus.textContent = 'Offline \u2014 using local data';
      } else {
        syncStatus.textContent = '';
      }
    }
  }

  // Safety net: always unlock login after 12s even if sync hangs
  var syncSafetyTimer = setTimeout(function() {
    if (!syncReady) {
      syncReady = true;
      unlockLogin(true);
      if (syncStatus) { syncStatus.style.color='var(--red-400,var(--red-400))'; syncStatus.textContent='Sync timeout — using local data'; }
    }
  }, 12000);

  syncFromSupabase().then(function() {
    clearTimeout(syncSafetyTimer);
    syncReady = true;
    unlockLogin(false);
    showMigrationNotice(sbMissingItems);
    if (sbMissingItems.length > 0) {
      toast('DB migration needed \u2014 check Settings', 'error');
    }

    // ── Restore session after sync so we have fresh user data ──
    try {
      var saved = localStorage.getItem(SESSION_KEY);
      if (saved) {
        var ref = JSON.parse(saved);          // { id, username }
        var db  = getDB();
        var user = db.appUsers.find(function(u) {
          return u.id === ref.id || u.username === ref.username;
        });
        if (user && user.active) {
          applyLogin(user, false);             // silent restore — no welcome toast
        } else {
          // User no longer valid — clear saved session
          localStorage.removeItem(SESSION_KEY);
        }
      }
    } catch(e) {}

  }).catch(function() {
    clearTimeout(syncSafetyTimer);
    syncReady = true; // offline — allow login with cached data
    unlockLogin(true);

    // Offline: try to restore session from local cache anyway
    try {
      var saved2 = localStorage.getItem(SESSION_KEY);
      if (saved2) {
        var ref2 = JSON.parse(saved2);
        var db2  = getDB();
        var user2 = db2.appUsers.find(function(u) {
          return u.id === ref2.id || u.username === ref2.username;
        });
        if (user2 && user2.active) {
          applyLogin(user2, false);
        }
      }
    } catch(e) {}
  });
})();

})();
<\/script>
</body>
</html>`;
}
