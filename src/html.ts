export function getAppHTML(cfg: { sbUrl: string; sbKey: string; build?: string }): string {
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
    .role-chip.chef      { background:#f6ede6;          color:#8a5a3c;       border-color:#e6cdb9; }

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
    #topbar .role-chip.chef i { color:#e6cdb9; }
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
    .fin-chart-legend .sw-ly { width:16px; height:3px; border-radius:2px; background:var(--gold); display:inline-block; }
    .fin-chart .fc-ly-line { fill:none; stroke:var(--gold); stroke-width:2.5; stroke-linejoin:round; stroke-linecap:round; pointer-events:none; }
    .fin-chart .fc-ly-pt { fill:var(--gold); stroke:var(--panel); stroke-width:1.5; pointer-events:none; }
    .fin-ly-line { font-size:11px; margin-top:2px; color:var(--slate-600); font-weight:600; }
    .fin-ly-line b.pos { color:#2b8a4b; } .fin-ly-line b.neg { color:#b4402f; }
    .fin-ly-sub { color:var(--slate-400); font-weight:500; }
    .fin-ly-dot { display:inline-block; width:12px; height:3px; border-radius:2px; background:var(--gold); margin-right:5px; vertical-align:3px; }
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

    /* ── SHOPPING LIST (extras outside the stock) ── */
    .shop-badge { background:var(--amber-700); color:white; font-size:10px; font-weight:800; padding:1px 6px; border-radius:10px; margin-left:2px; }
    .shop-toolbar { display:flex; align-items:center; gap:10px; flex-wrap:wrap; margin-bottom:12px; }
    .shop-sum { font-size:13px; color:var(--slate-500); margin-left:auto; }
    .shop-sum b { color:var(--slate-900); }
    .shop-row { display:flex; align-items:center; gap:12px; padding:12px 14px; background:var(--panel); border:var(--rule); border-radius:10px; margin-bottom:8px; }
    .shop-row.is-bought { opacity:.62; }
    .shop-row.is-bought .shop-name { text-decoration:line-through; }
    .shop-main { flex:1; min-width:0; }
    .shop-name { font-weight:700; font-size:15px; color:var(--slate-900); display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
    .shop-link { font-size:12px; font-weight:600; color:var(--teal-700); text-decoration:none; white-space:nowrap; }
    .shop-link:hover { text-decoration:underline; }
    .shop-meta { font-size:12px; color:var(--slate-500); margin-top:3px; }
    .shop-meta .shop-price { font-weight:800; color:var(--slate-900); }
    .shop-pill { font-size:10px; font-weight:800; letter-spacing:.06em; text-transform:uppercase; padding:2px 7px; border-radius:10px; background:var(--amber-50); color:var(--amber-700); border:1px solid var(--amber-200); }
    .shop-checks { display:flex; gap:6px; flex-shrink:0; }
    .shop-check { display:flex; flex-direction:column; align-items:center; gap:3px; min-width:62px; padding:6px 4px; border:var(--rule); border-radius:8px; background:var(--panel); cursor:pointer; font-size:10px; font-weight:700; letter-spacing:.05em; text-transform:uppercase; color:var(--slate-500); }
    .shop-check i { font-size:18px; color:var(--slate-300); }
    .shop-check.on { background:var(--mint-50); border-color:var(--mint-200); color:var(--teal-700); }
    .shop-check.on i { color:var(--teal-700); }
    .shop-check:disabled { cursor:default; }
    .shop-check:not(:disabled):hover { border-color:var(--slate-400); }
    .shop-actions { display:flex; flex-direction:column; gap:4px; flex-shrink:0; }
    @media(max-width:560px){
      .shop-row { flex-wrap:wrap; }
      .shop-main { flex-basis:calc(100% - 44px); }
      .shop-checks { flex:1; }
      .shop-check { flex:1; flex-direction:row; justify-content:center; gap:6px; }
      .shop-actions { flex-direction:row; }
    }
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
    /* Calendar (all-in-one) */
    .calv-head { flex-wrap:wrap; gap:10px; }
    .calv-nav { display:flex; align-items:center; gap:8px; }
    .calv-month-label { font-size:17px; font-weight:800; color:var(--slate-900); min-width:150px; text-align:center; }
    .calv-filters { display:flex; flex-wrap:wrap; gap:6px; margin-bottom:12px; }
    .calv-filter { display:inline-flex; align-items:center; gap:6px; padding:6px 11px; border-radius:16px; border:var(--rule); background:var(--panel); font-size:12px; font-weight:700; color:var(--slate-500); cursor:pointer; }
    .calv-filter i.sw { width:9px; height:9px; border-radius:50%; display:inline-block; opacity:.35; }
    .calv-filter.on { color:var(--slate-900); border-color:var(--slate-400); }
    .calv-filter.on i.sw { opacity:1; }
    .calv-layout { display:grid; grid-template-columns:1fr; gap:12px; align-items:start; }
    @media(min-width:1024px){ .calv-layout { grid-template-columns:minmax(0,2fr) minmax(300px,1fr); } }
    .calv-month { padding:10px; }
    .calv-wk { display:grid; grid-template-columns:repeat(7,1fr); font-size:11px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; color:var(--slate-500); text-align:center; padding:2px 0 6px; }
    .calv-grid { display:grid; grid-template-columns:repeat(7,1fr); gap:3px; }
    .calv-cell { min-height:62px; border-radius:8px; border:1px solid transparent; background:none; padding:5px 3px; text-align:center; cursor:pointer; display:flex; flex-direction:column; align-items:center; gap:3px; font:inherit; color:inherit; min-width:0; }
    .calv-cell:hover { background:var(--slate-50); }
    .calv-cell.out { opacity:.4; }
    .calv-cell.today .calv-num { background:var(--teal-600); color:white; }
    .calv-cell.sel { border-color:var(--slate-700); background:var(--slate-50); }
    .calv-num { font-size:13px; font-weight:800; color:var(--slate-900); width:24px; height:24px; line-height:24px; border-radius:50%; text-align:center; flex-shrink:0; }
    .calv-dots { display:flex; flex-wrap:wrap; justify-content:center; gap:3px; }
    .calv-dots i { width:7px; height:7px; border-radius:50%; display:inline-block; }
    .calv-chips { display:none; width:100%; flex-direction:column; gap:2px; }
    .calv-chip { display:block; font-size:11px; line-height:1.3; text-align:left; padding:1px 5px; border-radius:4px; background:var(--slate-100); color:var(--slate-900); border-left:3px solid var(--slate-400); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .calv-more { font-size:10px; font-weight:700; color:var(--slate-500); text-align:left; padding-left:5px; }
    @media(min-width:760px){
      .calv-cell { min-height:96px; align-items:stretch; text-align:left; padding:5px; }
      .calv-num { align-self:flex-start; }
      .calv-dots { display:none; }
      .calv-chips { display:flex; }
    }
    .calv-day { padding:14px; }
    .calv-day-head { display:flex; align-items:center; justify-content:space-between; gap:8px; margin-bottom:10px; }
    .calv-day-head h3 { font-size:15px; font-weight:800; color:var(--slate-900); margin:0; }
    .calv-item { display:flex; align-items:flex-start; gap:10px; width:100%; padding:10px; margin-bottom:6px; border:var(--rule); border-left:4px solid var(--slate-400); border-radius:10px; background:var(--panel); text-align:left; cursor:pointer; font:inherit; color:inherit; }
    .calv-item:hover { background:var(--slate-50); }
    .calv-item.done .calv-item-title { text-decoration:line-through; color:var(--slate-500); }
    .calv-time { width:62px; flex-shrink:0; font-size:12px; font-weight:800; color:var(--slate-700); padding-top:1px; }
    .calv-item-main { flex:1; min-width:0; }
    .calv-item-type { font-size:10px; font-weight:800; letter-spacing:.08em; text-transform:uppercase; }
    .calv-item-title { font-size:14px; font-weight:700; color:var(--slate-900); }
    .calv-item-sub { font-size:12px; color:var(--slate-500); margin-top:2px; overflow-wrap:anywhere; }
    .ev-list { margin-bottom:12px; }
    .ev-item { display:flex; align-items:flex-start; gap:12px; width:100%; padding:10px 12px; margin-bottom:8px; border:var(--rule); border-left:4px solid var(--amber-700); border-radius:var(--radius); background:var(--panel); text-align:left; cursor:pointer; font:inherit; color:inherit; }
    .ev-item.k-meeting { border-left-color:var(--teal-600); }
    .ev-item.k-hours { border-left-color:var(--amber-700); }
    .ev-item.k-event { border-left-color:#6d4fc2; }
    .ev-item.k-other { border-left-color:var(--slate-400); }
    .ev-ic { width:32px; height:32px; border-radius:8px; background:var(--slate-100); color:var(--slate-700); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
    .ev-main { flex:1; min-width:0; }
    .ev-when { font-size:12px; font-weight:800; color:var(--slate-700); }
    .ev-title { font-size:14px; font-weight:700; color:var(--slate-900); }
    .ev-sub { font-size:12px; color:var(--slate-500); margin-top:2px; overflow-wrap:anywhere; }
    .ev-you { font-size:10px; font-weight:800; letter-spacing:.06em; text-transform:uppercase; padding:2px 7px; border-radius:10px; background:var(--mint-50); color:var(--teal-700); border:1px solid var(--mint-200); margin-left:6px; }
    .ev-check { display:flex; align-items:center; gap:8px; font-size:14px; font-weight:600; color:var(--slate-700); cursor:pointer; }
    .ev-check input { width:18px; height:18px; }
    .ev-people { display:flex; flex-wrap:wrap; gap:6px; }
    .ev-person { padding:6px 10px; border-radius:16px; border:var(--rule); background:var(--panel); font-size:13px; font-weight:600; color:var(--slate-700); cursor:pointer; }
    .ev-person.on { background:var(--slate-700); border-color:var(--slate-700); color:white; }
    .ev-people.is-off { opacity:.4; pointer-events:none; }
    .ev-notify-note { font-size:12px; color:var(--slate-500); margin:0 0 10px; }
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
    .table-chip small { display:block; font-size:10px; font-weight:600; margin-top:1px; opacity:.9; }
    .table-chip.occupied.selected { background:var(--red); color:#fff; border-color:var(--red); }
    .res-table-hint { font-size:12px; color:var(--slate-500); margin-top:8px; line-height:1.4; }
    .res-table-hint b { color:var(--red); }

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
    :root { --gantt-label:88px; }
    @media (max-width:640px) { :root { --gantt-label:70px; } }
    .gantt-hours-spacer { width:var(--gantt-label); flex-shrink:0; }
    .gantt-hours-track { flex:1; position:relative; height:14px; }
    .gantt-hour-label { position:absolute; font-size:9px; font-weight:700; color:var(--slate-400); white-space:nowrap; transform:translateX(-50%); }
    .gantt-rows { position:relative; }
    .gantt-grid-lines { position:absolute; top:0; left:0; right:0; bottom:0; pointer-events:none; }
    .gantt-grid-line { position:absolute; top:0; bottom:0; width:1px; background:var(--slate-100); }
    .gantt-row { position:relative; height:30px; margin-bottom:4px; display:flex; align-items:center; }
    .gantt-emp-label { width:var(--gantt-label); flex-shrink:0; font-size:10.5px; font-weight:700; color:var(--slate-700); padding-right:6px; line-height:1.15; letter-spacing:.01em;
      display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; white-space:normal; word-break:break-word; }
    .gantt-emp-label.is-cont { visibility:hidden; }
    .gantt-area-head { position:relative; z-index:2; display:flex; align-items:center; gap:6px; font-size:10px; font-weight:800; text-transform:uppercase; letter-spacing:.1em; padding:6px 0 2px; margin-top:4px; }
    .gantt-area-head > span { background:var(--panel); padding-right:4px; }
    .gantt-area-head::after { content:''; flex:1; height:1px; background:var(--slate-100); }
    .gantt-row.sec-first { margin-top:2px; }
    .gantt-offs { position:relative; z-index:2; padding:6px 10px; background:var(--slate-50); border:1px dashed var(--slate-200); border-radius:8px; margin-top:6px; display:flex; flex-wrap:wrap; align-items:center; gap:6px; }
    .gantt-offs-label { font-size:10px; font-weight:800; color:var(--slate-600); text-transform:uppercase; letter-spacing:.5px; white-space:nowrap; }
    .gantt-off-chip { display:inline-flex; align-items:center; gap:5px; background:var(--panel); border:1px solid var(--slate-200); border-radius:6px; padding:4px 9px; min-height:30px; font-size:12px; color:var(--slate-700); font-weight:600; cursor:pointer; }
    .gantt-off-chip i { color:var(--slate-400); font-size:11px; }
    .area-block { border:var(--rule); border-radius:10px; padding:10px 12px; margin-bottom:8px; }
    .area-head { display:flex; align-items:center; gap:8px; }
    .area-dot { width:12px; height:12px; border-radius:3px; flex-shrink:0; }
    .area-name { font-weight:800; font-size:14px; color:var(--slate-900); flex:1; }
    .area-sections { display:flex; flex-wrap:wrap; gap:6px; margin-top:8px; align-items:center; }
    .sec-chip { display:inline-flex; align-items:center; gap:4px; background:var(--slate-50); border:1px solid var(--slate-200); border-radius:16px; padding:3px 4px 3px 10px; font-size:13px; font-weight:600; color:var(--slate-800); }
    .sec-chip button { border:none; background:none; color:var(--slate-400); width:24px; height:24px; border-radius:12px; cursor:pointer; font-size:14px; line-height:1; }
    .sec-chip button:hover { background:var(--red-50); color:var(--red); }
    .sec-add { display:inline-flex; gap:4px; }
    .sec-add input { width:130px; min-height:34px; padding:6px 10px; font-size:14px; }
    .gantt-track { flex:1; position:relative; height:24px; border-radius:4px; background:var(--slate-50); overflow:visible; }
    .gantt-bar { position:absolute; top:0; height:100%; border-radius:5px; display:flex; align-items:center; padding:0 7px; font-size:10px; font-weight:700; letter-spacing:.02em; color:white; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; cursor:pointer; transition:filter .15s; min-width:4px; }
    .gantt-bar:active { filter:brightness(1.1); }
    .gantt-bar-label { position:absolute; top:0; bottom:0; right:0; display:block; line-height:24px; padding:0 7px; overflow:hidden; white-space:nowrap; text-overflow:ellipsis; pointer-events:none; }
    .gantt-bar.has-ot { border-top-right-radius:0; border-bottom-right-radius:0; }
    /* late: the part of the shift not worked, faded and hatched */
    .gantt-late { position:absolute; left:0; top:0; bottom:0; border-radius:5px 0 0 5px; pointer-events:none;
      background-color:rgba(255,255,255,.62); background-image:repeating-linear-gradient(45deg, rgba(34,54,63,.28) 0 2px, transparent 2px 6px); }
    /* overtime: an extension after the scheduled end, same colour, hatched */
    .gantt-ot { position:absolute; top:0; height:100%; border-radius:0 5px 5px 0; cursor:pointer; min-width:4px;
      background-image:repeating-linear-gradient(135deg, rgba(255,255,255,.5) 0 3px, transparent 3px 7px); }
    /* absent on a scheduled day: pale, outlined and hatched in red; counts 0 hours */
    .gantt-bar.is-absent { background-color:var(--red-50); color:var(--red-700); box-shadow:inset 0 0 0 1.5px var(--red-400);
      background-image:repeating-linear-gradient(45deg, rgba(180,64,47,.12) 0 3px, transparent 3px 8px); }
    .gantt-bar.is-absent .gantt-bar-label { color:var(--red-700); }
    .gantt-bar.is-absent .gantt-bar-label i { margin-right:4px; }
    .repeat-row { display:flex; align-items:center; gap:10px; padding:10px 12px; min-height:48px; border-bottom:1px solid var(--slate-100); cursor:pointer; }
    .repeat-row:last-child { border-bottom:none; }
    .repeat-row input { width:18px; height:18px; accent-color:var(--teal-600); flex-shrink:0; }
    .repeat-name { font-weight:700; font-size:14px; color:var(--slate-900); flex:1; min-width:0; }
    .repeat-meta { font-size:12px; font-weight:600; color:var(--slate-500); white-space:nowrap; }
    .repeat-clash { margin-top:12px; background:var(--amber-50); border:1px solid var(--amber-200); border-radius:10px; padding:12px; font-size:13px; color:var(--amber-700); }
    .repeat-clash label { display:flex; align-items:center; gap:8px; margin-top:8px; font-weight:700; color:var(--slate-900); cursor:pointer; min-height:32px; }
    .repeat-clash input { accent-color:var(--teal-600); width:18px; height:18px; }
    .clash-list { border:var(--rule); border-radius:10px; margin:4px 0 14px; }
    .clash-row { display:flex; align-items:center; gap:10px; padding:10px 12px; border-bottom:1px solid var(--slate-100); font-size:14px; }
    .clash-row:last-child { border-bottom:none; }
    .clash-day { font-weight:800; color:var(--slate-900); width:42px; flex-shrink:0; }
    .clash-was { color:var(--slate-500); text-decoration:line-through; text-decoration-color:var(--red-400); }
    .clash-now { font-weight:700; color:var(--slate-900); }
    .hours-range { background:var(--panel); border:var(--rule); border-radius:var(--radius); padding:12px 14px; margin-bottom:12px; }
    .hours-range-dates { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
    .hours-range-dates > div { min-width:0; }
    .hours-range-dates input { width:100%; min-width:0; }
    .hours-presets { display:flex; flex-wrap:wrap; gap:6px; margin-top:10px; }
    .hours-summary { font-size:12px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:var(--slate-500); margin:4px 2px 8px; }
    .hours-list { background:var(--panel); border:var(--rule); border-radius:var(--radius); }
    .hours-row { display:flex; align-items:center; gap:12px; padding:11px 14px; border-bottom:1px solid var(--slate-100); }
    .hours-row:last-child { border-bottom:none; }
    .hours-who { flex:1; min-width:0; }
    .hours-name { font-weight:700; font-size:14px; color:var(--slate-900); }
    .hours-meta { font-size:12px; color:var(--slate-500); margin-top:2px; display:flex; flex-wrap:wrap; gap:4px 8px; align-items:center; }
    .hours-num { font-size:20px; font-weight:800; color:var(--slate-900); white-space:nowrap; font-variant-numeric:tabular-nums; }
    .hours-num small { font-size:12px; font-weight:700; color:var(--slate-500); margin-left:1px; }
    .hours-row.is-zero .hours-num { color:var(--slate-300); }
    .adjust-chips { display:flex; flex-wrap:wrap; gap:6px; margin-top:12px; }
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
    .fin-day-note { margin-top:8px; padding:8px 12px; border-radius:8px; background:var(--slate-50); border:var(--rule); font-size:13px; color:var(--slate-700); white-space:pre-wrap; overflow-wrap:anywhere; }
    .fin-day-note i { color:var(--slate-400); margin-right:4px; }
    /* impersonation banner */
    #imp-banner { position:sticky; top:-16px; z-index:20; margin:-16px -16px 12px; padding:9px 16px; background:var(--amber-700); color:white; display:flex; align-items:center; gap:10px; font-size:13px; font-weight:600; }
    #imp-banner span { flex:1; min-width:0; }
    #imp-banner button { background:white; color:var(--amber-700); border:none; border-radius:8px; padding:6px 10px; font-size:12px; font-weight:800; cursor:pointer; white-space:nowrap; }
    @media(min-width:1024px){ #imp-banner { top:-24px; margin:-24px -32px 16px; padding:10px 32px; } }
    /* notifications inbox (Home) */
    #section-dashboard > #dash-notif-panel { grid-column:1 / -1; }
    .notif-head-actions { margin-left:auto; display:flex; gap:14px; }
    .notif-link { background:none; border:none; padding:4px 0; font-size:12px; font-weight:700; letter-spacing:0; text-transform:none; color:var(--teal-700); cursor:pointer; }
    .notif-link:hover { text-decoration:underline; }
    .notif-item { display:flex; align-items:flex-start; gap:12px; width:100%; padding:11px 4px; border:none; border-bottom:1px solid var(--slate-100); background:none; text-align:left; cursor:pointer; font:inherit; color:inherit; }
    .notif-item:last-child { border-bottom:none; }
    .notif-item:hover { background:var(--slate-50); }
    .notif-ic { width:34px; height:34px; border-radius:9px; background:var(--slate-100); color:var(--slate-500); display:flex; align-items:center; justify-content:center; flex-shrink:0; font-size:14px; }
    .notif-item.unread .notif-ic { background:var(--mint-50); color:var(--teal-700); }
    .notif-txt { flex:1; min-width:0; }
    .notif-title { font-size:14px; font-weight:600; color:var(--slate-700); }
    .notif-item.unread .notif-title { font-weight:800; color:var(--slate-900); }
    .notif-body { font-size:12px; color:var(--slate-500); margin-top:2px; overflow-wrap:anywhere; }
    .notif-time { font-size:11px; color:var(--slate-400); white-space:nowrap; margin-top:2px; display:flex; align-items:center; gap:6px; }
    .notif-item.unread .notif-time::before { content:''; width:8px; height:8px; border-radius:50%; background:var(--teal-600); }
    .notif-more { width:100%; padding:10px 0 8px; background:none; border:none; font-size:12px; font-weight:700; color:var(--teal-700); cursor:pointer; }
    .bnav-count { position:absolute; top:0; left:calc(50% + 6px); min-width:17px; height:17px; padding:0 4px; border-radius:9px; background:var(--red); color:white; font-size:10px; font-weight:800; line-height:17px; text-align:center; letter-spacing:0; }
    .notif-dot-count { margin-left:auto; min-width:20px; height:20px; padding:0 6px; border-radius:10px; background:var(--red); color:white; font-size:11px; font-weight:800; line-height:20px; text-align:center; }
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
    /* ── Week one-pager (Shifts → Week) ── */
    .week-bar { display:flex; align-items:center; gap:10px; margin-bottom:10px; flex-wrap:wrap; }
    .week-bar-title { font-weight:800; font-size:15px; color:var(--slate-900); flex:1; min-width:0; }
    .week-bar-sub { font-size:12px; color:var(--slate-500); font-weight:600; }
    .week-scroll { overflow-x:auto; -webkit-overflow-scrolling:touch; background:var(--panel); border:var(--rule); border-radius:var(--radius); }
    .week-sheet { width:100%; min-width:820px; border-collapse:collapse; table-layout:fixed; font-size:12px; color:var(--slate-800); }
    .week-sheet th, .week-sheet td { border-bottom:1px solid var(--slate-100); border-right:1px solid var(--slate-100); padding:5px 6px; vertical-align:top; text-align:left; }
    .week-sheet th:last-child, .week-sheet td:last-child { border-right:none; }
    .week-sheet col.wk-label { width:108px; }
    .week-sheet thead th { font-size:11px; font-weight:800; color:var(--slate-700); background:var(--slate-50); position:sticky; top:0; }
    .week-sheet thead th .wk-date { display:block; font-weight:600; color:var(--slate-500); font-size:10.5px; }
    .week-sheet thead th.is-today { background:var(--mint-100, #e3f5ee); }
    .week-sheet .wk-rowlabel { font-weight:700; font-size:11.5px; color:var(--slate-700); position:sticky; left:0; background:var(--panel); z-index:1; }
    .week-sheet thead th:first-child { left:0; z-index:2; }
    .week-sheet tr.wk-area td { background:var(--slate-50); font-size:10.5px; font-weight:800; text-transform:uppercase; letter-spacing:.09em; padding:4px 6px; }
    .week-sheet tr.wk-area td:first-child { position:sticky; left:0; }
    .wk-swatch { display:inline-block; width:9px; height:9px; border-radius:2px; margin-right:6px; vertical-align:0; }
    .wk-p { display:block; line-height:1.35; padding:1px 3px; margin:0 -3px; border-radius:4px; cursor:pointer; }
    .wk-p b, .wk-t { white-space:nowrap; }
    .wk-p:hover { background:var(--slate-50); }
    .wk-p b { font-weight:700; }
    .wk-t { color:var(--slate-500); font-variant-numeric:tabular-nums; }
    .wk-p.is-absent b, .wk-p.is-absent .wk-t { text-decoration:line-through; color:var(--red); }
    .wk-tag { font-size:10px; font-weight:700; margin-left:3px; }
    .wk-tag.late { color:var(--amber-700, #9a6400); }
    .wk-tag.ot { color:var(--teal-700, #1b7a67); }
    .wk-tag.abs { color:var(--red); }
    .week-sheet tr.wk-foot td { background:var(--slate-50); font-size:11px; }
    .week-sheet tr.wk-foot td.wk-rowlabel { background:var(--slate-50); }
    .wk-num { font-weight:800; font-variant-numeric:tabular-nums; color:var(--slate-900); }
    .wk-off { color:var(--slate-500); font-weight:600; }
    .week-sheet-meta { display:none; }
    #update-bar { position:fixed; left:12px; right:12px; bottom:calc(84px + env(safe-area-inset-bottom, 0px)); z-index:3000; background:var(--slate-900); color:#fff; border-radius:12px; padding:10px 12px 10px 16px; display:flex; align-items:center; gap:12px; font-size:14px; font-weight:600; box-shadow:0 8px 24px rgba(0,0,0,.25); }
    #update-bar span { flex:1; }
    @media (min-width:900px) { #update-bar { left:auto; right:24px; bottom:24px; max-width:420px; } }
    /* ── Accounting ── */
    .acc-head { display:flex; align-items:center; justify-content:space-between; gap:10px; margin-bottom:10px; flex-wrap:wrap; }
    .acc-year { display:flex; align-items:center; gap:10px; }
    #acc-year-label { font-size:22px; font-weight:800; color:var(--slate-900); font-variant-numeric:tabular-nums; min-width:56px; text-align:center; }
    .acc-sync { font-size:12.5px; color:var(--amber-700); }
    .acc-kpis { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin-bottom:12px; }
    @media (max-width:640px) { .acc-kpis { grid-template-columns:1fr; } }
    .acc-kpi { background:var(--panel); border:var(--rule); border-radius:var(--radius); padding:12px 14px; }
    .acc-kpi-label { font-size:11px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; color:var(--slate-500); }
    .acc-kpi-num { font-size:26px; font-weight:800; color:var(--slate-900); margin-top:4px; letter-spacing:-.01em; }
    .acc-kpi-num.neg { color:var(--red); }
    .acc-kpi-sub { font-size:12px; color:var(--slate-500); margin-top:3px; }
    .acc-card { background:var(--panel); border:var(--rule); border-radius:var(--radius); padding:12px 14px; margin-bottom:12px; }
    .acc-card-title { font-size:11px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:var(--slate-500); margin-bottom:6px; }
    .acc-scroll { overflow-x:auto; -webkit-overflow-scrolling:touch; padding:0; }
    .acc-table { width:100%; border-collapse:collapse; font-size:12.5px; color:var(--slate-800); font-variant-numeric:tabular-nums; }
    .acc-table th, .acc-table td { padding:7px 10px; border-bottom:1px solid var(--slate-100); text-align:right; white-space:nowrap; }
    .acc-table thead th { font-size:11px; font-weight:800; color:var(--slate-500); background:var(--slate-50); position:sticky; top:0; }
    .acc-table tbody th, .acc-table thead th:first-child { text-align:left; font-weight:700; color:var(--slate-700); position:sticky; left:0; background:var(--panel); z-index:1; }
    .acc-table thead th:first-child { background:var(--slate-50); z-index:2; }
    .acc-table tr.strong td, .acc-table tr.strong th { font-weight:800; color:var(--slate-900); }
    .acc-table tr.sub th { font-weight:500; color:var(--slate-500); padding-left:18px; }
    .acc-table tr.sub td { color:var(--slate-500); }
    .acc-table tr.pct td, .acc-table tr.pct th { color:var(--slate-500); font-weight:600; font-size:12px; }
    .acc-table td.neg { color:var(--red); }
    .acc-table .acc-empty { text-align:center; color:var(--slate-500); padding:18px; }
    .acc-hist td, .acc-hist th { border-bottom:1px solid var(--slate-100); }
    .acc-table .acc-ref { color:var(--slate-500); }
    .acc-table th small { font-weight:600; text-transform:none; letter-spacing:0; }
    /* invoices */
    .inv-filters { display:flex; align-items:center; gap:10px; flex-wrap:wrap; margin-bottom:12px; }
    .inv-owed { margin-left:auto; font-size:13px; color:var(--slate-500); }
    .inv-owed b { color:var(--red); font-size:15px; }
    .inv-row { display:flex; align-items:center; gap:10px; width:100%; min-height:56px; padding:9px 12px; border-bottom:1px solid var(--slate-100); cursor:pointer; }
    .inv-row:last-child { border-bottom:none; }
    .inv-row:hover { background:var(--slate-50); }
    .inv-main { flex:1; min-width:0; }
    .inv-name { font-weight:700; font-size:14px; color:var(--slate-900); display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
    .inv-sub { font-size:12px; color:var(--slate-500); margin-top:2px; }
    .inv-sub.over { color:var(--red); font-weight:700; }
    .inv-amt { text-align:right; font-variant-numeric:tabular-nums; flex-shrink:0; }
    .inv-amt b { display:block; font-size:15px; }
    .inv-amt small { font-size:11px; color:var(--slate-500); }
    .inv-amt.owed b { color:var(--red); }
    .inv-tick { width:44px; height:44px; border-radius:10px; border:var(--rule); background:var(--panel); color:var(--slate-300); font-size:20px; cursor:pointer; flex-shrink:0; display:flex; align-items:center; justify-content:center; }
    .inv-tick.on { background:var(--mint-50); border-color:var(--mint-200); color:var(--teal-700); }
    .inv-pill { font-size:10px; font-weight:800; letter-spacing:.06em; text-transform:uppercase; padding:2px 7px; border-radius:10px; }
    .inv-pill.paid { background:var(--mint-50); color:var(--teal-700); border:1px solid var(--mint-200); }
    .inv-pill.open { background:var(--amber-50); color:var(--amber-700); border:1px solid var(--amber-200); }
    .inv-pill.over { background:var(--red-50); color:var(--red); border:1px solid #f1c2bb; }
    .inv-photo-box { margin-bottom:12px; }
    .inv-photo-box img { display:block; max-height:220px; max-width:100%; border-radius:10px; border:var(--rule); margin:0 auto 8px; }
    .inv-photo-actions { display:flex; gap:8px; flex-wrap:wrap; }
    .inv-warn { font-size:12px; color:var(--amber-700); background:var(--amber-50); border:1px solid var(--amber-200); border-radius:8px; padding:6px 10px; margin:0 0 10px; }
    .inv-qr-note { font-size:13px; border-radius:8px; padding:8px 12px; margin:0 0 12px; display:flex; align-items:flex-start; gap:8px; }
    .inv-qr-note.ok { background:var(--mint-50); border:1px solid var(--mint-200); color:var(--teal-700); }
    .inv-qr-note.busy { background:var(--slate-50); border:var(--rule); color:var(--slate-700); }
    .inv-qr-note.none { background:var(--amber-50); border:1px solid var(--amber-200); color:var(--amber-700); }
    .inv-qr-note.bad { background:var(--red-50); border:1px solid #f1c2bb; color:var(--red); }
    .inv-qr-note b { font-weight:800; }
    .inv-paid-row { display:flex; align-items:center; gap:14px; flex-wrap:wrap; margin-bottom:12px; }
    .inv-back { display:inline-flex; align-items:center; gap:6px; }
    .acc-src { font-size:10px; font-weight:700; color:var(--slate-500); background:var(--slate-50); border-radius:4px; padding:1px 5px; margin-left:4px; text-transform:uppercase; letter-spacing:.04em; }
    .acc-note { font-size:12.5px; color:var(--slate-500); margin:0 2px 12px; line-height:1.45; }
    .acc-months { display:flex; gap:4px; overflow-x:auto; margin-bottom:12px; padding-bottom:2px; -webkit-overflow-scrolling:touch; }
    .acc-month { flex:0 0 auto; min-width:48px; min-height:38px; border-radius:9px; border:var(--rule); background:var(--panel); font-weight:700; font-size:13px; color:var(--slate-500); cursor:pointer; position:relative; }
    .acc-month.has { color:var(--slate-800); }
    .acc-month.has::after { content:''; position:absolute; bottom:5px; left:50%; width:4px; height:4px; margin-left:-2px; border-radius:50%; background:var(--teal-500); }
    .acc-month.active { background:var(--slate-800); color:#fff; border-color:var(--slate-800); }
    .acc-month.active::after { background:var(--mint-300); }
    .acc-toolbar { display:flex; align-items:center; gap:8px; margin-bottom:10px; flex-wrap:wrap; }
    .acc-toolbar-title { flex:1; min-width:180px; font-weight:800; font-size:15px; color:var(--slate-900); }
    .acc-toolbar-title span { color:var(--teal-700); margin-left:6px; }
    .acc-edit td { padding:4px 4px; }
    .acc-in { width:92px; min-height:36px; border:1px solid var(--slate-200); border-radius:7px; padding:5px 8px; font:inherit; font-size:13px; text-align:right; background:var(--panel); color:var(--slate-900); }
    .acc-in:focus { outline:none; border-color:var(--teal-500); box-shadow:0 0 0 3px var(--mint-100); }
    .acc-fixed .acc-in { width:78px; }
    .acc-fixed tbody th { display:flex; align-items:center; justify-content:space-between; gap:6px; min-width:170px; }
    .acc-auto { width:100%; min-height:36px; border:1px dashed var(--teal-500); background:var(--mint-50); color:var(--teal-700); border-radius:7px; font:inherit; font-size:13px; font-weight:700; cursor:pointer; padding:3px 8px; text-align:right; }
    .acc-auto small { display:block; font-size:10px; font-weight:600; }
    .acc-icon { border:none; background:none; color:var(--slate-400); width:32px; height:32px; border-radius:8px; cursor:pointer; font-size:13px; }
    .acc-icon:hover { background:var(--slate-50); color:var(--slate-700); }
    .acc-row-acts { white-space:nowrap; }
    .acc-ledger { padding:4px 0; }
    .acc-line { display:flex; align-items:center; gap:10px; width:100%; min-height:52px; padding:8px 14px; border:none; border-bottom:1px solid var(--slate-100); background:none; text-align:left; cursor:pointer; font:inherit; color:var(--slate-900); }
    .acc-line:last-child { border-bottom:none; }
    .acc-line:hover { background:var(--slate-50); }
    .acc-line.is-zero .acc-line-name { color:var(--slate-500); font-weight:600; }
    .acc-line.is-ro { cursor:default; }
    .acc-line-name { flex:1; font-weight:700; font-size:14px; }
    .acc-line-name small { display:block; font-size:12px; color:var(--slate-500); font-weight:500; }
    .acc-line-amt { font-weight:800; font-variant-numeric:tabular-nums; }
    .acc-line i { color:var(--slate-400); font-size:12px; }
    .acc-entries { max-height:42vh; overflow-y:auto; margin-bottom:10px; }
    .acc-entry { display:flex; align-items:center; gap:10px; padding:8px 2px; border-bottom:1px solid var(--slate-100); }
    .acc-entry.is-total { border-bottom:none; font-weight:800; }
    .acc-entry-amt { min-width:96px; font-weight:800; font-variant-numeric:tabular-nums; }
    .acc-entry-meta { flex:1; font-size:13px; color:var(--slate-500); }
    .acc-led-form { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
    .acc-led-note { grid-column:1 / -1; }
    .acc-empty { color:var(--slate-500); font-size:13px; padding:12px 2px; }
    /* ── Food cost ── */
    .fc-switch { display:inline-flex; border:var(--rule); border-radius:10px; overflow:hidden; }
    .fc-switch button { border:none; background:var(--panel); padding:8px 14px; min-height:38px; font:inherit; font-size:13px; font-weight:700; color:var(--slate-500); cursor:pointer; }
    .fc-switch button span { font-weight:600; color:var(--slate-400); margin-left:3px; }
    .fc-switch button.active { background:var(--slate-800); color:#fff; }
    .fc-switch button.active span { color:var(--mint-300); }
    .sec-step { font-size:13.5px; color:var(--slate-600); padding:4px 0; display:flex; gap:8px; align-items:center; }
    .sec-step i { color:var(--slate-300); }
    .sec-step.ok { color:var(--slate-900); }
    .sec-step.ok i { color:var(--green); }
    .fc-target-ro { font-size:13px; font-weight:700; color:var(--slate-500); padding:0 6px; }
    .fc-search { flex:1; min-width:140px; max-width:260px; min-height:38px; padding:7px 12px; }
    .fc-table tbody th small { display:block; font-size:11.5px; font-weight:500; color:var(--slate-500); }
    .fc-table tbody th { white-space:normal; min-width:160px; }
    .fc-row { cursor:pointer; }
    .fc-row:hover th, .fc-row:hover td { background:var(--slate-50); }
    .fc-pct { display:inline-block; min-width:54px; text-align:center; border-radius:6px; padding:2px 8px; font-weight:800; }
    .fc-pct.ok { background:#e3f4e8; color:var(--green-700, #1f6b3a); }
    .fc-pct.warn { background:var(--amber-50); color:var(--amber-700); }
    .fc-pct.bad { background:var(--red-50); color:var(--red-700); }
    .fc-miss { color:var(--amber-700) !important; }
    .fc-modal { max-width:640px; }
    .fc-lines { display:flex; flex-direction:column; gap:6px; }
    .fc-line { display:grid; grid-template-columns:minmax(0,1fr) 76px 72px 70px 32px; gap:6px; align-items:center; }
    .fc-line .select-field, .fc-line .input-field { min-height:40px; padding:6px 8px; font-size:14px; min-width:0; }
    .fc-line select:disabled { background-image:none; opacity:1; color:var(--slate-500); padding-right:6px; }
    .fc-line-cost { text-align:right; font-weight:700; font-size:13px; font-variant-numeric:tabular-nums; color:var(--slate-700); }
    @media (max-width:520px) { .fc-line { grid-template-columns:minmax(0,1fr) 64px 64px 32px; } .fc-line-cost { grid-column:1 / 2; grid-row:2; text-align:left; font-size:12px; color:var(--slate-500); } }
    .fc-totals { display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; background:var(--slate-50); border-radius:12px; padding:12px; }
    .fc-totals div { display:flex; flex-direction:column; gap:2px; }
    .fc-totals span { font-size:11px; font-weight:700; color:var(--slate-500); text-transform:uppercase; letter-spacing:.05em; }
    .fc-totals b { font-size:16px; color:var(--slate-900); font-variant-numeric:tabular-nums; }
    .fc-totals .fc-big b.fc-pct { font-size:18px; align-self:flex-start; }
    .fc-totals .fc-warn { grid-column:1 / -1; flex-direction:row; gap:6px; font-size:12.5px; color:var(--amber-700); }
    @media (max-width:520px) { .fc-totals { grid-template-columns:1fr 1fr; } }
    /* ── Notifications: test help, iPhone steps, Users status ── */
    .notif-help { font-size:12.5px; color:var(--slate-600); background:var(--slate-50); border-radius:10px; padding:10px 12px; margin-top:10px; line-height:1.45; }
    .notif-help.is-ok { background:#e3f4e8; color:var(--green-700, #1f6b3a); }
    .ios-steps { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:10px; }
    .ios-steps li { display:flex; gap:10px; align-items:flex-start; font-size:14px; color:var(--slate-800); line-height:1.4; }
    .ios-n { flex-shrink:0; width:24px; height:24px; border-radius:50%; background:var(--teal-600); color:#fff; font-weight:800; font-size:12px; display:inline-flex; align-items:center; justify-content:center; }
    .push-chip { display:inline-flex; align-items:center; gap:5px; border-radius:20px; padding:2px 8px; font-size:11px; font-weight:700; }
    .push-chip.is-on { background:#e3f4e8; color:var(--green-700, #1f6b3a); }
    .push-chip.is-off { background:var(--slate-50); color:var(--slate-500); border:1px dashed var(--slate-200); }
    .push-summary { background:var(--panel); border:var(--rule); border-radius:var(--radius); padding:10px 14px; margin-bottom:12px; font-size:13px; color:var(--slate-700); display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
    .push-summary b { color:var(--slate-900); }
    /* ── Shift change requests ── */
    .tab-count { min-width:18px; height:18px; padding:0 5px; border-radius:9px; background:var(--red); color:#fff; font-size:10.5px; font-weight:800; display:inline-flex; align-items:center; justify-content:center; }
    .nav-dot { position:absolute; top:4px; right:calc(50% - 18px); width:9px; height:9px; border-radius:50%; background:var(--red); box-shadow:0 0 0 2px var(--panel); }
    .drawer-item .nav-dot { position:static; display:inline-block; margin-left:auto; box-shadow:none; }
    .req-section-title { font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:.09em; color:var(--slate-500); margin:16px 0 8px; }
    .req-section-title:first-child { margin-top:0; }
    .req-card { background:var(--panel); border:var(--rule); border-radius:var(--radius); padding:12px 14px; margin-bottom:8px; }
    .req-card-top { display:flex; gap:10px; align-items:flex-start; justify-content:space-between; }
    .req-who { font-weight:800; font-size:14px; color:var(--slate-900); }
    .req-what { font-size:13.5px; color:var(--slate-700); margin-top:2px; font-variant-numeric:tabular-nums; }
    .req-note { font-size:13px; color:var(--slate-600); margin-top:6px; font-style:italic; }
    .req-meta { font-size:11.5px; color:var(--slate-500); margin-top:6px; }
    .req-status { flex-shrink:0; font-size:11px; font-weight:800; border-radius:12px; padding:3px 9px; white-space:nowrap; }
    .req-status.is-amber { background:var(--amber-50); color:var(--amber-700); }
    .req-status.is-green { background:#e3f4e8; color:var(--green-700, #1f6b3a); }
    .req-status.is-red { background:var(--red-50); color:var(--red-700); }
    .req-status.is-gray { background:var(--slate-50); color:var(--slate-500); }
    .req-actions { display:flex; gap:8px; margin-top:10px; flex-wrap:wrap; }
    #shifts-requests-content { max-width:720px; }
    .req-actions .btn { min-height:40px; flex:1 1 0; max-width:220px; justify-content:center; }
    @media (max-width:640px) { .req-actions .btn { max-width:none; } }
    .req-empty { font-size:13px; color:var(--slate-500); padding:10px 2px; }
    .req-banner { background:var(--amber-50); border:1px solid var(--amber-200); color:var(--amber-700); border-radius:10px; padding:10px 12px; font-size:13px; margin-bottom:12px; }
    .req-shift { background:var(--slate-50); border-radius:10px; padding:10px 12px; font-size:14px; color:var(--slate-700); margin-bottom:12px; }
    .req-kinds { display:flex; flex-direction:column; gap:6px; margin-bottom:12px; }
    .req-kind { display:flex; gap:10px; align-items:flex-start; border:1.5px solid var(--slate-200); border-radius:10px; padding:10px 12px; cursor:pointer; }
    .req-kind.is-on { border-color:var(--teal-500); background:var(--mint-50); }
    .req-kind input { margin-top:3px; accent-color:var(--teal-600); }
    .req-kind b { display:block; font-size:14px; color:var(--slate-900); }
    .req-kind small { display:block; font-size:12px; color:var(--slate-500); }
    .req-hint { font-size:12.5px; color:var(--slate-600); margin-top:6px; }
    #print-root { display:none; width:283mm; background:#fff; }
    #print-root .week-sheet { min-width:0; font-size:8.6pt; }
    #print-root .week-sheet th, #print-root .week-sheet td { padding:2px 4px; border-color:#cfd6da; }
    #print-root .week-sheet thead th, #print-root .wk-rowlabel { position:static; }
    #print-root .week-sheet col.wk-label { width:24mm; }
    #print-root .wk-p { white-space:normal; cursor:default; }
    #print-root .week-sheet-meta { display:flex; justify-content:space-between; align-items:baseline; margin:0 0 3mm; font-size:10pt; color:#223; }
    #print-root .week-sheet-meta b { font-size:13pt; }
    @media print {
      @page { size:A4 landscape; margin:7mm; }
      body.print-week > *:not(#print-root) { display:none !important; }
      body.print-week { background:#fff !important; }
      body.print-week #print-root { display:block; }
      #print-root * { -webkit-print-color-adjust:exact; print-color-adjust:exact; }
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
    <button class="drawer-item active" id="ditem-dashboard" data-nav="dashboard"><i class="fas fa-home"></i> Dashboard <span class="notif-dot-count" id="ditem-notif-count" style="display:none"></span></button>
    <button class="drawer-item" id="ditem-inventory" data-nav="inventory"><i class="fas fa-boxes-stacked"></i> Shopping List</button>
    <button class="drawer-item" id="ditem-reservations" data-nav="reservations"><i class="fas fa-calendar-days"></i> Reservations</button>
    <button class="drawer-item" id="ditem-calendar" data-nav="calendar"><i class="fas fa-calendar-week"></i> Calendar</button>
    <button class="drawer-item" id="ditem-tasks" data-nav="tasks"><i class="fas fa-list-check"></i> Tasks</button>
    <button class="drawer-item" id="ditem-shifts" data-nav="shifts"><i class="fas fa-clock"></i> Shifts<span class="nav-dot" id="ditem-shifts-dot" style="display:none"></span></button>
    <div class="section-label" style="margin-top:12px">Admin</div>
    <button class="drawer-item" id="ditem-blackbox" data-nav="blackbox"><i class="fas fa-cash-register"></i> Black Box <span class="admin-only-badge">ADMIN</span></button>
    <button class="drawer-item" id="ditem-finance" data-nav="finance"><i class="fas fa-euro-sign"></i> Finance <span class="admin-only-badge" style="background:rgba(139,92,246,.3);color:#cfc2f0">FINANCE</span></button>
    <button class="drawer-item" id="ditem-foodcost" data-nav="foodcost"><i class="fas fa-utensils"></i> Food Cost <span class="admin-only-badge" style="background:rgba(176,123,89,.35);color:#f1dccd">CHEF</span></button>
    <button class="drawer-item" id="ditem-accounting" data-nav="accounting"><i class="fas fa-scale-balanced"></i> Accounting <span class="admin-only-badge">ADMIN</span></button>
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
      <button id="drawer-logout-btn" style="background:rgba(255,255,255,.15);border:none;color:white;border-radius:8px;padding:6px 9px;font-size:12px;cursor:pointer;flex-shrink:0" title="Sign out"><i class="fas fa-sign-out-alt"></i></button>
    </div>
    <button id="btn-enable-notif" style="margin-top:10px;width:100%;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.25);color:white;border-radius:9px;padding:8px 12px;font-size:12px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:7px">
      <i class="fas fa-bell"></i> <span id="notif-btn-label">Enable Notifications</span> <i id="notif-status-dot" class="fas fa-circle" style="font-size:7px;margin-left:auto;color:rgba(255,255,255,.4)"></i>
    </button>
    <button data-test-notif style="display:none;margin-top:6px;width:100%;background:transparent;border:1px solid rgba(255,255,255,.2);color:rgba(255,255,255,.85);border-radius:9px;padding:7px 12px;font-size:12px;font-weight:600;cursor:pointer;align-items:center;justify-content:center;gap:7px">
      <i class="fas fa-paper-plane"></i> Send me a test
    </button>
  </div>
</nav>

<!-- MAIN CONTENT -->
<div id="content-wrap">
  <div id="imp-banner" role="status" style="display:none"><i class="fas fa-user-secret"></i><span id="imp-banner-text"></span><button id="btn-imp-exit"><i class="fas fa-arrow-right-from-bracket"></i> Back to my account</button></div>

  <!-- ═══ DASHBOARD ═══ -->
  <section id="section-dashboard" class="page-section active">
    <div class="dash-date" id="dash-date"><b id="dash-date-day"></b><span id="dash-date-full"></span></div>
    <div class="dash-panel" id="dash-notif-panel" style="display:none">
      <h3><i class="fas fa-bell"></i> Notifications <span class="badge badge-orange" id="dash-notif-badge" style="display:none"></span>
        <span class="notif-head-actions"><button class="notif-link" id="btn-notif-read-all" style="display:none">Mark all read</button><button class="notif-link" id="btn-notif-clear" style="display:none">Clear read</button></span></h3>
      <div id="dash-notif-list"></div>
    </div>
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
        <button class="tab-btn" id="inv-tab-shop" data-inv-tab="shop"><i class="fas fa-bag-shopping"></i> Shopping List <span id="shop-badge" class="shop-badge" style="display:none"></span></button>
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
    <div id="inv-panel-shop" style="display:none">
      <div id="shop-list"></div>
    </div>
  </section>

  <!-- ═══ RESERVATIONS ═══ -->
  <section id="section-reservations" class="page-section">
    <div class="section-header">
      <div class="tab-row" style="margin-bottom:0">
        <button class="tab-btn active" id="res-tab-calendar" data-res-tab="calendar"><i class="fas fa-calendar-week"></i> Week</button>
        <button class="tab-btn" id="res-tab-list" data-res-tab="list"><i class="fas fa-list"></i> All</button>
        <button class="tab-btn" data-nav="calendar"><i class="fas fa-calendar-days"></i> Calendar</button>
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

  <!-- ═══ CALENDAR: events, reservations, task deadlines and your shifts in one view ═══ -->
  <section id="section-calendar" class="page-section">
    <div class="section-header calv-head">
      <div class="calv-nav">
        <button class="btn btn-secondary btn-sm btn-icon" id="calv-prev" aria-label="Previous month"><i class="fas fa-chevron-left"></i></button>
        <span class="calv-month-label" id="calv-month-label"></span>
        <button class="btn btn-secondary btn-sm btn-icon" id="calv-next" aria-label="Next month"><i class="fas fa-chevron-right"></i></button>
        <button class="btn btn-secondary btn-sm" id="calv-today">Today</button>
      </div>
      <button class="btn btn-primary btn-sm" id="btn-add-event" style="display:none"><i class="fas fa-calendar-plus"></i> Event</button>
    </div>
    <div class="calv-filters" id="calv-filters" role="group" aria-label="Show on the calendar"></div>
    <div class="calv-layout">
      <div class="card calv-month">
        <div class="calv-wk"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>
        <div class="calv-grid" id="calv-grid"></div>
      </div>
      <div class="card calv-day">
        <div class="calv-day-head"><h3 id="calv-day-label"></h3><button class="btn btn-secondary btn-sm" id="calv-day-add" style="display:none"><i class="fas fa-plus"></i> Event</button></div>
        <div id="calv-agenda"></div>
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
        <button class="btn btn-secondary btn-sm" id="btn-repeat-week" style="display:none" title="Copy shifts from one week to another"><i class="fas fa-copy"></i> Repeat</button>
        <button class="btn btn-secondary btn-sm" id="btn-notify-week" style="display:none" title="Tell the team this week's shifts are ready"><i class="fas fa-bullhorn"></i> <span id="notify-week-label">Notify team</span></button>
      </div>
    </div>
    <!-- Shifts tabs -->
    <div class="tab-row" style="margin-bottom:12px" id="shifts-tab-row">
      <button class="tab-btn active" data-shifts-tab="gantt"><i class="fas fa-calendar-week"></i> Schedule</button>
      <button class="tab-btn" data-shifts-tab="week"><i class="fas fa-table-cells"></i> Week</button>
      <button class="tab-btn" data-shifts-tab="requests"><i class="fas fa-arrow-right-arrow-left"></i> Requests <span class="tab-count" id="req-tab-count" style="display:none"></span></button>
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
        <span id="gantt-legend-areas" style="display:inline-flex;flex-wrap:wrap;gap:8px"></span>
        <span style="display:inline-flex;align-items:center;gap:4px"><span style="width:10px;height:10px;border-radius:3px;background:var(--red);display:inline-block"></span> Absent</span>
      </div>
      <div id="shifts-list"></div>
    </div>

    <!-- ── Tab: Week one-pager ── -->
    <div id="shifts-panel-week" style="display:none">
      <div class="week-bar">
        <div class="week-bar-title">Week at a glance <span class="week-bar-sub" id="week-sheet-range"></span></div>
        <button class="btn btn-secondary btn-sm" id="btn-week-print"><i class="fas fa-print"></i> Print</button>
      </div>
      <div class="week-scroll"><div id="week-sheet-wrap"></div></div>
    </div>

    <!-- ── Tab: Shift change requests ── -->
    <div id="shifts-panel-requests" style="display:none">
      <div id="shifts-requests-content"></div>
    </div>

    <!-- ── Tab: Tips ── -->
    <div id="shifts-panel-tips" style="display:none">
      <div class="shifts-tips-card" style="background:white;border-radius:var(--radius);border:1px solid var(--ocean-100);padding:14px;margin-bottom:14px;box-shadow:var(--shadow)">
        <div style="font-weight:700;font-size:14px;color:var(--ocean-800);margin-bottom:10px;display:flex;align-items:center;gap:8px">
          <i class="fas fa-hand-holding-dollar" style="color:#b7791f"></i> Weekly Tips Distribution
        </div>
        <div id="tips-locked-notice" style="display:none;background:#fdf3e1;border:1px solid var(--amber-200);border-radius:8px;padding:10px 12px;margin-bottom:10px;font-size:13px;color:var(--amber-700);display:flex;align-items:center;gap:8px">
          <i class="fas fa-lock" style="color:#b7791f"></i> <span id="tips-locked-text">Tips calculated for this week.</span>
          <span style="margin-left:auto;display:inline-flex;gap:6px">
            <button id="btn-tips-recalc" class="btn btn-sm btn-secondary" style="font-size:11px"><i class="fas fa-rotate"></i> Recalculate</button>
            <button id="btn-tips-unlock" class="btn btn-sm btn-secondary" style="font-size:11px"><i class="fas fa-pen"></i> Edit total</button>
          </span>
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
      <div class="hours-range">
        <div class="hours-range-dates">
          <div><label class="label" for="hours-from">From</label><input type="date" class="input-field" id="hours-from" /></div>
          <div><label class="label" for="hours-to">To</label><input type="date" class="input-field" id="hours-to" /></div>
        </div>
        <div class="hours-presets">
          <button type="button" class="inv-slicer" data-hours-preset="week">This week</button>
          <button type="button" class="inv-slicer" data-hours-preset="lastweek">Last week</button>
          <button type="button" class="inv-slicer" data-hours-preset="month">This month</button>
          <button type="button" class="inv-slicer" data-hours-preset="lastmonth">Last month</button>
        </div>
      </div>
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
  <!-- ═══ FOOD COST (admins + chefs) ═══ -->
  <section id="section-foodcost" class="page-section">
    <div id="fc-locked" class="locked-overlay" style="display:none">
      <i class="fas fa-utensils" style="color:#8a5a3c"></i>
      <h3>Chefs and admins only</h3>
      <p>Food Cost can be opened by users with the Chef role or by an administrator.</p>
    </div>
    <div id="fc-content" style="display:none"><div id="fc-body"></div></div>
  </section>

  <!-- ═══ ACCOUNTING ═══ -->
  <section id="section-accounting" class="page-section">
    <div id="acc-locked" class="locked-overlay" style="display:none">
      <i class="fas fa-scale-balanced" style="color:#6d4fc2"></i>
      <h3>Admin only</h3>
      <p>Accounting can only be opened by an administrator.</p>
    </div>
    <div id="acc-content" style="display:none">
      <div class="acc-head">
        <div class="acc-year">
          <button class="btn btn-secondary btn-sm btn-icon" id="acc-year-prev" aria-label="Previous year"><i class="fas fa-chevron-left"></i></button>
          <span id="acc-year-label">2026</span>
          <button class="btn btn-secondary btn-sm btn-icon" id="acc-year-next" aria-label="Next year"><i class="fas fa-chevron-right"></i></button>
        </div>
        <div class="acc-sync" id="acc-sync-note"></div>
      </div>
      <div class="tab-row" style="margin-bottom:14px">
        <button class="tab-btn active" data-acc-tab="summary"><i class="fas fa-chart-column"></i> Summary</button>
        <button class="tab-btn" data-acc-tab="revenue"><i class="fas fa-arrow-trend-up"></i> Revenue</button>
        <button class="tab-btn" data-acc-tab="wages" id="acc-tab-wages-btn"><i class="fas fa-user-group"></i> Wages</button>
        <button class="tab-btn" data-acc-tab="suppliers"><i class="fas fa-truck"></i> Suppliers</button>
        <button class="tab-btn" data-acc-tab="invoices"><i class="fas fa-file-invoice"></i> Invoices <span id="acc-inv-badge" class="shop-badge" style="display:none"></span></button>
        <button class="tab-btn" data-acc-tab="fixed"><i class="fas fa-house"></i> Fixed costs</button>
        <button class="tab-btn" data-acc-tab="expenses"><i class="fas fa-receipt"></i> Daily expenses</button>
      </div>
      <div id="acc-body"></div>
    </div>
  </section>

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

        <!-- Notes for the day (optional) -->
        <div class="fin-card">
          <h3><i class="fas fa-note-sticky" style="color:var(--slate-500)"></i> Notes for the day <span style="font-size:11px;font-weight:600;color:var(--slate-400);text-transform:none;letter-spacing:0">optional</span></h3>
          <textarea id="fin-day-notes" class="input-field" rows="3" maxlength="1000" placeholder="Anything worth remembering about today: a refund, a broken card machine, a big group…" style="resize:vertical"></textarea>
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
              <div id="fin-stat-day-month-ly" class="fin-ly-line"></div>
            </div>
            <div class="fin-summary-card">
              <div class="fin-summary-num" id="fin-stat-day-year">€0</div>
              <div class="fin-summary-label">Year to Date</div>
              <div id="fin-stat-day-year-avg" style="font-size:11px;color:var(--ocean-400);margin-top:2px"></div>
              <div id="fin-stat-day-year-budget" style="font-size:11px;margin-top:4px"></div>
              <div id="fin-stat-day-year-ly" class="fin-ly-line"></div>
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
              <div id="fin-stat-t51-month-ly" class="fin-ly-line"></div>
            </div>
            <div class="fin-summary-card">
              <div class="fin-summary-num" id="fin-stat-t51-year">€0</div>
              <div class="fin-summary-label">Year to Date</div>
              <div id="fin-stat-t51-year-avg" style="font-size:11px;color:var(--ocean-400);margin-top:2px"></div>
              <div id="fin-stat-t51-year-budget" style="font-size:11px;margin-top:4px"></div>
              <div id="fin-stat-t51-year-ly" class="fin-ly-line"></div>
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
              <div id="fin-stat-surf-month-ly" class="fin-ly-line"></div>
            </div>
            <div class="fin-summary-card">
              <div class="fin-summary-num" id="fin-stat-surf-year">€0</div>
              <div class="fin-summary-label">Year to Date</div>
              <div id="fin-stat-surf-year-avg" style="font-size:11px;color:var(--ocean-400);margin-top:2px"></div>
              <div id="fin-stat-surf-year-budget" style="font-size:11px;margin-top:4px"></div>
              <div id="fin-stat-surf-year-ly" class="fin-ly-line"></div>
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
        <div style="display:flex;gap:10px;margin-bottom:14px">
          <button class="btn btn-gold" style="flex:1;justify-content:center" id="btn-save-daily-entry"><i class="fas fa-save"></i> Save Daily Entry</button>
          <button class="btn btn-secondary" id="btn-clear-daily"><i class="fas fa-eraser"></i> Clear</button>
        </div>
        <div class="search-bar" style="margin-bottom:10px">
          <i class="fas fa-search"></i>
          <input type="text" placeholder="Search menu items..." id="bb-item-search" />
        </div>
        <div id="bb-menu-selector" style="margin-bottom:14px"></div>
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
    <!-- Secure login (admins) -->
    <div class="settings-card" id="secure-login-card" style="display:none">
      <h3><i class="fas fa-shield-halved" style="color:var(--teal-600)"></i> Secure login</h3>
      <p style="font-size:13px;color:var(--slate-500);margin-bottom:10px">Moves every login to Supabase's secure sign-in, keeping each person's password. After that, the database itself checks who may see what.</p>
      <div id="secure-login-body"></div>
      <div id="secure-migrate-result" aria-live="polite"></div>
    </div>
    <!-- Impersonate (admins, for testing) -->
    <div class="settings-card" id="imp-card" style="display:none">
      <h3><i class="fas fa-user-secret" style="color:var(--teal-600)"></i> Impersonate</h3>
      <p style="font-size:13px;color:var(--slate-500);margin-bottom:10px">See the app exactly as someone else does, to test what they can see and do. Anything you change while impersonating is real and saved as them. Their own devices stay logged in, and nothing is sent to them.</p>
      <label class="label" for="imp-user">Log in as</label>
      <select class="select-field" id="imp-user"></select>
      <button class="btn btn-primary" id="btn-imp-start" style="width:100%;justify-content:center;margin-top:10px"><i class="fas fa-user-secret"></i> Impersonate</button>
    </div>
    <!-- Notifications card — visible to ALL users -->
    <div class="settings-card" id="notif-settings-card">
      <h3><i class="fas fa-bell" style="color:var(--ocean-500)"></i> Push Notifications</h3>
      <p style="font-size:13px;color:var(--ocean-400);margin-bottom:12px">Alerts for tasks assigned to you and for shift change requests.</p>
      <div id="notif-status-row" style="font-size:13px;color:#5f7079;margin-bottom:12px;display:flex;align-items:center;gap:8px">
        <i class="fas fa-circle" id="notif-card-dot" style="font-size:8px;color:#8a9aa2"></i>
        <span id="notif-status-text">Checking...</span>
      </div>
      <button class="btn btn-primary" style="width:100%;justify-content:center" id="btn-enable-notif-2">
        <i class="fas fa-bell"></i> <span id="notif-card-btn-label">Enable Notifications on this Device</span>
      </button>
      <button class="btn btn-secondary" style="width:100%;justify-content:center;margin-top:8px;display:none" data-test-notif>
        <i class="fas fa-paper-plane"></i> Send me a test
      </button>
      <div id="notif-help" class="notif-help" style="display:none"></div>
    </div>

    <div id="settings-locked" class="locked-overlay" style="display:none">
      <i class="fas fa-lock"></i>
      <h3>Admin Only</h3>
      <p>Settings can only be changed by an administrator.</p>
      <button class="btn btn-gold" id="settings-login-prompt-btn"><i class="fas fa-key"></i> Admin Login</button>
    </div>
    <div id="settings-content" style="display:none">
      <!-- Areas & sections -->
      <div class="settings-card" id="areas-card">
        <h3><i class="fas fa-layer-group"></i> Areas &amp; sections</h3>
        <p style="font-size:13px;color:var(--slate-500);margin-bottom:12px">Used by the shift form and the schedule. Each area needs at least one section.</p>
        <div id="areas-editor"></div>
        <div style="display:flex;gap:8px;margin-top:12px">
          <input type="text" class="input-field" id="new-area-name" placeholder="New area, e.g. Terrace" />
          <button class="btn btn-secondary" id="btn-add-area" style="flex-shrink:0"><i class="fas fa-plus"></i> Area</button>
        </div>
      </div>
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
        <p style="font-size:13px;color:var(--ocean-400);margin-bottom:10px">Set a monthly budget for each metric, and last year's figures to compare against. The year total is calculated automatically.</p>
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:10px">
          <div class="fc-switch" role="tablist" aria-label="Budget or last year">
            <button class="active" data-bud-mode="budget" id="bud-mode-budget">Budget</button>
            <button data-bud-mode="ly" id="bud-mode-ly">Last year</button>
          </div>
          <button class="btn btn-secondary btn-sm" id="btn-bud-fill-ly" style="display:none"><i class="fas fa-wand-magic-sparkles"></i> <span id="bud-fill-label">Fill Total Day and T 51 from Accounting</span></button>
        </div>
        <div id="ly-table-wrap" style="display:none;overflow-x:auto;margin-bottom:14px"></div>
        <div style="overflow-x:auto;margin-bottom:14px" id="budget-table-wrap">
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
        <button class="btn btn-primary" id="btn-save-budgets"><i class="fas fa-save"></i> Save budgets and last year</button>
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
  <button class="bnav-item active" id="bnav-dashboard" data-nav="dashboard"><i class="fas fa-home"></i>Home<span class="bnav-count" id="bnav-notif-count" style="display:none"></span></button>
  <button class="bnav-item" id="bnav-inventory" data-nav="inventory"><i class="fas fa-boxes-stacked"></i>Shopping</button>
  <button class="bnav-item" id="bnav-reservations" data-nav="reservations"><i class="fas fa-calendar-days"></i>Book</button>
  <button class="bnav-item" id="bnav-tasks" data-nav="tasks"><i class="fas fa-list-check"></i>Tasks</button>
  <button class="bnav-item" id="bnav-shifts" data-nav="shifts"><i class="fas fa-clock"></i>Shifts<span class="nav-dot" id="bnav-shifts-dot" style="display:none"></span></button>
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
    <div style="margin-bottom:12px">
      <label class="label" for="user-employee">Name on the shift schedule</label>
      <select class="select-field" id="user-employee"></select>
      <div style="font-size:12px;color:var(--slate-500);margin-top:4px">Lets this person see their own shifts and ask for changes.</div>
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
      <label style="display:flex;align-items:center;gap:6px;cursor:pointer;padding:7px 12px;border-radius:20px;border:1.5px solid var(--ocean-200);font-size:13px;font-weight:600;transition:all .15s" id="role-lbl-chef">
        <input type="checkbox" value="chef" class="user-role-cb" style="accent-color:#8a5a3c" /> <i class="fas fa-utensils" style="color:#8a5a3c"></i> Chef
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
    <div class="form-row" style="margin-bottom:12px"><label class="label" for="supplier-nif">NIF (tax number)</label><input type="text" inputmode="numeric" class="input-field" id="supplier-nif" placeholder="9 digits — lets invoice QR codes find this supplier" maxlength="9" /></div>
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

<!-- Add / Edit Shopping List item -->
<div class="modal-overlay" id="modal-shop-item">
  <div class="modal">
    <div class="modal-handle"></div>
    <h2><i class="fas fa-bag-shopping" style="color:var(--ocean-400)"></i><span id="shop-modal-title">Add to Shopping List</span></h2>
    <input type="hidden" id="shop-edit-id" />
    <div class="form-row"><label class="label" for="shop-name">Item *</label><input type="text" class="input-field" id="shop-name" placeholder="e.g. Ice cream scoop" /></div>
    <div class="form-row"><label class="label" for="shop-link">Link (if there is one)</label><input type="url" inputmode="url" class="input-field" id="shop-link" placeholder="https://…" /></div>
    <div class="form-row"><label class="label" for="shop-price">Price € (if known)</label><input type="text" inputmode="decimal" class="input-field" id="shop-price" placeholder="0,00" /></div>
    <div class="form-row" style="margin-bottom:14px"><label class="label" for="shop-notes">Notes</label><input type="text" class="input-field" id="shop-notes" placeholder="Quantity, size, colour…" /></div>
    <div style="display:flex;gap:10px">
      <button class="btn btn-primary" style="flex:1;justify-content:center" id="btn-save-shop-item"><i class="fas fa-save"></i> Save</button>
      <button class="btn btn-secondary" style="flex:1;justify-content:center" data-close-modal="modal-shop-item">Cancel</button>
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
    <div class="form-grid-2" style="margin-bottom:14px">
      <div style="min-width:0"><label class="label" for="res-date">Date *</label><input type="date" class="input-field" id="res-date" style="min-width:0" /></div>
      <div style="min-width:0"><label class="label" for="res-guests">Guests</label><input type="number" class="input-field" id="res-guests" min="1" max="200" value="2" /></div>
    </div>
    <div class="form-grid-2" style="margin-bottom:14px">
      <div style="min-width:0"><label class="label" for="res-time">From *</label><input type="time" class="input-field" id="res-time" style="min-width:0" /></div>
      <div style="min-width:0"><label class="label" for="res-end">Until <span style="text-transform:none;letter-spacing:0;font-weight:500">(optional)</span></label><input type="time" class="input-field" id="res-end" style="min-width:0" /></div>
    </div>
    <div class="form-row">
      <label class="label">Tables * (tap to select multiple)</label>
      <div class="table-grid" id="res-table-grid" style="margin-top:6px"></div>
      <div class="res-table-hint" id="res-table-hint"></div>
    </div>
    <div class="form-row"><label class="label">Notes</label><input type="text" class="input-field" id="res-notes" placeholder="Allergies, occasion..." /></div>
    <div style="display:flex;gap:10px">
      <button class="btn btn-primary" style="flex:1;justify-content:center" id="btn-save-reservation"><i class="fas fa-save"></i> Save</button>
      <button class="btn btn-secondary" style="flex:1;justify-content:center" data-close-modal="modal-add-reservation">Cancel</button>
    </div>
  </div>
</div>

<!-- Reservation Detail -->
<!-- Invoice (Accounting → Invoices) -->
<div class="modal-overlay" id="modal-invoice">
  <div class="modal">
    <div class="modal-handle"></div>
    <h2><i class="fas fa-file-invoice" style="color:var(--teal-600)"></i><span id="inv-modal-title">New invoice</span></h2>
    <input type="hidden" id="inv-edit-id" />
    <input type="file" id="inv-file" accept="image/*,application/pdf" style="display:none" />
    <div id="inv-photo-box" class="inv-photo-box"></div>
    <div id="inv-qr-note" class="inv-qr-note" style="display:none" aria-live="polite"></div>
    <div class="form-row"><label class="label" for="inv-supplier">Supplier *</label><select class="select-field" id="inv-supplier"></select></div>
    <div class="form-row" id="inv-new-supplier-row" style="display:none"><label class="label" for="inv-supplier-name">New supplier name *</label><input type="text" class="input-field" id="inv-supplier-name" placeholder="e.g. Bidfood" /></div>
    <div class="form-grid-2" style="margin-bottom:10px">
      <div style="min-width:0"><label class="label" for="inv-number">Invoice nº</label><input type="text" class="input-field" id="inv-number" placeholder="FT 2026/123" /></div>
      <div style="min-width:0"><label class="label" for="inv-date">Date *</label><input type="date" class="input-field" id="inv-date" style="min-width:0" /></div>
    </div>
    <div class="form-grid-2" style="margin-bottom:10px">
      <div style="min-width:0"><label class="label" for="inv-due">Due date</label><input type="date" class="input-field" id="inv-due" style="min-width:0" /></div>
      <div style="min-width:0"><label class="label" for="inv-total">Total with VAT *</label><input type="text" inputmode="decimal" class="input-field" id="inv-total" placeholder="0,00" /></div>
    </div>
    <div class="form-grid-2" style="margin-bottom:10px">
      <div style="min-width:0"><label class="label" for="inv-net">Without VAT</label><input type="text" inputmode="decimal" class="input-field" id="inv-net" placeholder="0,00" /></div>
      <div style="min-width:0"><label class="label" for="inv-vat">VAT</label><input type="text" inputmode="decimal" class="input-field" id="inv-vat" placeholder="0,00" /></div>
    </div>
    <p class="inv-warn" id="inv-warn" style="display:none"></p>
    <div class="inv-paid-row"><label class="ev-check"><input type="checkbox" id="inv-paid" /> Paid</label><input type="date" class="input-field" id="inv-paid-date" style="display:none;max-width:180px" aria-label="Paid on" /></div>
    <div class="form-row" style="margin-bottom:14px"><label class="label" for="inv-notes">Notes</label><input type="text" class="input-field" id="inv-notes" placeholder="Optional" /></div>
    <div style="display:flex;gap:10px">
      <button class="btn btn-primary" id="btn-save-invoice" style="flex:1;justify-content:center"><i class="fas fa-save"></i> Save</button>
      <button class="btn btn-danger btn-icon" id="btn-delete-invoice" style="display:none" aria-label="Delete invoice"><i class="fas fa-trash"></i></button>
      <button class="btn btn-secondary" style="flex:1;justify-content:center" data-close-modal="modal-invoice">Cancel</button>
    </div>
  </div>
</div>
<!-- Calendar event (meeting, opening hours, …) -->
<div class="modal-overlay" id="modal-event">
  <div class="modal">
    <div class="modal-handle"></div>
    <h2><i class="fas fa-calendar-plus" style="color:var(--ocean-400)"></i><span id="ev-modal-title">New event</span></h2>
    <input type="hidden" id="ev-edit-id" />
    <div class="form-row"><label class="label" for="ev-kind">Type</label>
      <select class="select-field" id="ev-kind">
        <option value="meeting">Meeting</option>
        <option value="hours">Opening hours change</option>
        <option value="event">Event</option>
        <option value="other">Other</option>
      </select></div>
    <div class="form-row"><label class="label" for="ev-title">Title *</label><input type="text" class="input-field" id="ev-title" maxlength="120" placeholder="e.g. Staff meeting · Closing at 18:00" /></div>
    <div class="form-grid-2" style="margin-bottom:10px">
      <div style="min-width:0"><label class="label" for="ev-date">Date *</label><input type="date" class="input-field" id="ev-date" style="min-width:0" /></div>
      <div style="display:flex;align-items:flex-end"><label class="ev-check"><input type="checkbox" id="ev-allday" /> All day</label></div>
    </div>
    <div class="form-grid-2" style="margin-bottom:14px" id="ev-times">
      <div style="min-width:0"><label class="label" for="ev-start">Start *</label><input type="time" class="input-field" id="ev-start" style="min-width:0" /></div>
      <div style="min-width:0"><label class="label" for="ev-end">End (optional)</label><input type="time" class="input-field" id="ev-end" style="min-width:0" /></div>
    </div>
    <div class="form-row"><label class="label">Who is in it</label>
      <label class="ev-check" style="margin-bottom:8px"><input type="checkbox" id="ev-everyone" /> Everyone on the team</label>
      <div id="ev-people" class="ev-people"></div></div>
    <div class="form-row" style="margin-bottom:14px"><label class="label" for="ev-notes">Notes</label><textarea class="input-field" id="ev-notes" rows="2" maxlength="1000" placeholder="Agenda, where, what changes…" style="resize:vertical"></textarea></div>
    <p class="ev-notify-note" id="ev-notify-note">The people in it get a notification.</p>
    <div style="display:flex;gap:10px" id="ev-actions">
      <button class="btn btn-primary" style="flex:1;justify-content:center" id="btn-save-event"><i class="fas fa-save"></i> Save</button>
      <button class="btn btn-danger btn-icon" id="btn-delete-event" style="display:none" aria-label="Delete event"><i class="fas fa-trash"></i></button>
      <button class="btn btn-secondary" style="flex:1;justify-content:center" data-close-modal="modal-event">Close</button>
    </div>
  </div>
</div>
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
    <div style="display:flex;gap:8px;margin-bottom:8px">
      <button class="btn btn-secondary" style="flex:1;justify-content:center;font-size:14px" id="shift-action-late">
        <i class="fas fa-hourglass-half" style="color:var(--slate-600)"></i> <span id="shift-action-late-label">Late</span>
      </button>
      <button class="btn btn-secondary" style="flex:1;justify-content:center;font-size:14px" id="shift-action-ot">
        <i class="fas fa-business-time" style="color:var(--teal-600)"></i> <span id="shift-action-ot-label">Overtime</span>
      </button>
    </div>
    <button class="btn" style="width:100%;justify-content:center;margin-bottom:8px;font-size:14px;background:#fdf3e1;color:var(--amber-700);border:1px solid #f0d391" id="shift-action-absent-unjust">
      <i class="fas fa-user-slash" style="color:#b4402f"></i> Mark Absent — Unjustified
    </button>
    <button class="btn" style="width:100%;justify-content:center;margin-bottom:8px;font-size:14px;background:#fdf3e1;color:var(--amber-700);border:1px solid var(--amber-200)" id="shift-action-absent-just">
      <i class="fas fa-user-clock" style="color:#b7791f"></i> Mark Absent — Justified
    </button>
    <div style="display:flex;gap:8px;margin-bottom:8px">
      <button class="btn btn-secondary" style="flex:1;justify-content:center;font-size:14px" id="shift-action-unabsent">
        <i class="fas fa-user-check" style="color:var(--green)"></i> Undo absence
      </button>
      <button class="btn btn-secondary" style="flex:1;justify-content:center;font-size:14px" id="shift-action-abs-toggle">
        <i class="fas fa-rotate" style="color:var(--slate-600)"></i> <span id="shift-action-abs-toggle-label">Mark justified</span>
      </button>
    </div>
    <button class="btn btn-secondary" style="width:100%;justify-content:center;margin-bottom:8px;font-size:14px;display:none" id="shift-action-request">
      <i class="fas fa-arrow-right-arrow-left" style="color:var(--teal-600)"></i> <span id="shift-action-request-label">Request a change</span>
    </button>
    <button class="btn" style="width:100%;justify-content:center;margin-bottom:8px;font-size:14px;background:var(--red-50);color:var(--red-700);border:1px solid #f0b8ae" id="shift-action-delete">
      <i class="fas fa-trash" style="color:#b4402f"></i> Delete Shift
    </button>
    <button class="btn btn-secondary" style="width:100%;justify-content:center;font-size:14px" data-close-modal="modal-shift-action">Cancel</button>
  </div>
</div>

<!-- iPhone: notifications need the Home Screen app -->
<div class="modal-overlay" id="modal-ios-install">
  <div class="modal">
    <div class="modal-handle"></div>
    <h2><i class="fas fa-bell"></i> Notifications on iPhone</h2>
    <p style="font-size:14px;color:var(--slate-600);margin-bottom:14px">On iPhone, notifications only work when Bar da Praia is opened from its Home Screen icon.</p>
    <ol class="ios-steps">
      <li><span class="ios-n">1</span><span>In <b>Safari</b>, tap the Share button <i class="fas fa-arrow-up-from-bracket"></i> at the bottom of the screen.</span></li>
      <li><span class="ios-n">2</span><span>Scroll down and tap <b>Add to Home Screen</b>, then <b>Add</b>.</span></li>
      <li><span class="ios-n">3</span><span>Open <b>Bar da Praia</b> from the new icon, log in, and tap <b>Enable Notifications</b> in the menu.</span></li>
    </ol>
    <p style="font-size:12.5px;color:var(--slate-500);margin:12px 0 14px">Needs iOS 16.4 or newer. Chrome on iPhone cannot add it; use Safari.</p>
    <button class="btn btn-primary" style="width:100%;justify-content:center" data-close-modal="modal-ios-install">Got it</button>
  </div>
</div>

<!-- Food cost: dish recipe -->
<div class="modal-overlay" id="modal-fc-dish">
  <div class="modal fc-modal">
    <div class="modal-handle"></div>
    <h2><i class="fas fa-utensils"></i> <span id="fc-dish-title">New dish</span></h2>
    <div class="form-grid-2" style="margin-bottom:12px">
      <div style="min-width:0"><label class="label" for="fc-dish-name">Dish *</label><input class="input-field" id="fc-dish-name" list="fc-dish-names" placeholder="e.g. FOCACCIA ROMANA" /><datalist id="fc-dish-names"></datalist></div>
      <div style="min-width:0"><label class="label" for="fc-dish-price">Selling price (€, with VAT)</label><input class="input-field" id="fc-dish-price" inputmode="decimal" placeholder="0,00" /></div>
    </div>
    <div class="form-grid-2" style="margin-bottom:12px">
      <div style="min-width:0"><label class="label" for="fc-dish-vat">VAT</label><select class="select-field" id="fc-dish-vat"><option value="13">13% (food)</option><option value="23">23% (drinks)</option><option value="6">6%</option><option value="0">0%</option></select></div>
      <div style="min-width:0"><label class="label" for="fc-dish-portions">Recipe makes (portions)</label><input class="input-field" id="fc-dish-portions" inputmode="decimal" value="1" /></div>
    </div>
    <label class="label">Recipe</label>
    <div id="fc-lines" class="fc-lines"></div>
    <button class="btn btn-secondary btn-sm" id="fc-add-line" style="margin:6px 0 12px"><i class="fas fa-plus"></i> Add ingredient</button>
    <div id="fc-totals" class="fc-totals"></div>
    <label class="label" for="fc-dish-notes" style="margin-top:10px">Notes</label>
    <input class="input-field" id="fc-dish-notes" placeholder="optional, e.g. method or plating" />
    <div style="display:flex;gap:8px;margin-top:14px;flex-wrap:wrap">
      <button class="btn btn-danger btn-sm btn-icon" id="btn-fc-dish-del" aria-label="Delete dish"><i class="fas fa-trash"></i></button>
      <button class="btn btn-secondary btn-sm" id="btn-fc-dish-copy"><i class="fas fa-copy"></i> Copy</button>
      <button class="btn btn-secondary" style="flex:1;justify-content:center" data-close-modal="modal-fc-dish">Cancel</button>
      <button class="btn btn-primary" style="flex:1;justify-content:center" id="btn-fc-dish-save"><i class="fas fa-save"></i> Save</button>
    </div>
  </div>
</div>

<!-- Food cost: ingredient -->
<div class="modal-overlay" id="modal-fc-ing">
  <div class="modal">
    <div class="modal-handle"></div>
    <h2><i class="fas fa-carrot"></i> <span id="fc-ing-title">New ingredient</span></h2>
    <div class="form-row"><label class="label" for="fc-ing-name">Ingredient *</label><input class="input-field" id="fc-ing-name" list="fc-ing-names" placeholder="e.g. Mozzarella" /><datalist id="fc-ing-names"></datalist></div>
    <div class="form-grid-2" style="margin-bottom:12px">
      <div style="min-width:0"><label class="label" for="fc-ing-unit">Bought per</label><select class="select-field" id="fc-ing-unit"><option value="kg">kg</option><option value="L">litre</option><option value="un">piece</option></select></div>
      <div style="min-width:0"><label class="label" for="fc-ing-price" id="fc-ing-price-label">Price per kg (€) *</label><input class="input-field" id="fc-ing-price" inputmode="decimal" placeholder="0,00" /></div>
    </div>
    <div class="form-grid-2" style="margin-bottom:6px">
      <div style="min-width:0"><label class="label" for="fc-ing-yield">Yield % (optional)</label><input class="input-field" id="fc-ing-yield" inputmode="decimal" placeholder="100" /></div>
      <div style="min-width:0"><label class="label" for="fc-ing-supplier">Supplier (optional)</label><input class="input-field" id="fc-ing-supplier" placeholder="e.g. Negrini" /></div>
    </div>
    <p class="acc-note" style="margin:4px 0 8px">Yield is what is left after cleaning or cooking loss, e.g. 80 for onions. Use the price without VAT.</p>
    <p class="acc-note" id="fc-ing-used" style="margin:0 0 8px"></p>
    <div style="display:flex;gap:8px">
      <button class="btn btn-danger btn-sm btn-icon" id="btn-fc-ing-del" aria-label="Delete ingredient"><i class="fas fa-trash"></i></button>
      <button class="btn btn-secondary" style="flex:1;justify-content:center" data-close-modal="modal-fc-ing">Cancel</button>
      <button class="btn btn-primary" style="flex:1;justify-content:center" id="btn-fc-ing-save"><i class="fas fa-save"></i> Save</button>
    </div>
  </div>
</div>

<!-- Accounting: entries of one supplier / expense category in a month -->
<div class="modal-overlay" id="modal-acc-ledger">
  <div class="modal">
    <div class="modal-handle"></div>
    <h2><i class="fas fa-receipt"></i> <span id="acc-ledger-title">—</span></h2>
    <div id="acc-ledger-list" class="acc-entries"></div>
    <div class="acc-led-form">
      <div><label class="label" for="acc-led-amount">Amount (€) *</label><input type="text" inputmode="decimal" class="input-field" id="acc-led-amount" placeholder="0,00" /></div>
      <div><label class="label" for="acc-led-date">Date</label><input type="date" class="input-field" id="acc-led-date" style="min-width:0" /></div>
      <div class="acc-led-note"><label class="label" for="acc-led-note">Invoice no. / note</label><input type="text" class="input-field" id="acc-led-note" placeholder="optional" /></div>
    </div>
    <div style="display:flex;gap:8px;margin-top:12px">
      <button class="btn btn-secondary" style="flex:1;justify-content:center" data-close-modal="modal-acc-ledger">Done</button>
      <button class="btn btn-primary" style="flex:1;justify-content:center" id="btn-acc-led-add"><i class="fas fa-plus"></i> Add</button>
    </div>
  </div>
</div>

<!-- Shift change request -->
<div class="modal-overlay" id="modal-shift-request">
  <div class="modal">
    <div class="modal-handle"></div>
    <h2><i class="fas fa-arrow-right-arrow-left"></i> Request a change</h2>
    <div class="req-shift" id="req-shift-info"></div>
    <div class="req-kinds" role="radiogroup" aria-label="What do you need?">
      <label class="req-kind is-on"><input type="radio" name="req-kind" value="times" checked /><span><b>Change my times</b><small>A different start or end</small></span></label>
      <label class="req-kind"><input type="radio" name="req-kind" value="dayoff" /><span><b>Take the day off</b><small>A manager approves it</small></span></label>
      <label class="req-kind"><input type="radio" name="req-kind" value="swap" /><span><b>Swap or give to a colleague</b><small>They agree first, then a manager approves</small></span></label>
    </div>
    <div id="req-times" class="form-grid-2" style="margin-bottom:12px">
      <div><label class="label" for="req-start">New start</label><input type="time" class="input-field" id="req-start" /></div>
      <div><label class="label" for="req-end">New end</label><input type="time" class="input-field" id="req-end" /></div>
    </div>
    <div id="req-swap" style="display:none;margin-bottom:12px">
      <label class="label" for="req-colleague">Colleague</label>
      <select class="select-field" id="req-colleague"></select>
      <div class="req-hint" id="req-swap-hint"></div>
    </div>
    <label class="label" for="req-note">Message (optional)</label>
    <textarea class="input-field" id="req-note" rows="2" placeholder="e.g. doctor's appointment"></textarea>
    <div style="display:flex;gap:8px;margin-top:14px">
      <button class="btn btn-secondary" style="flex:1;justify-content:center" data-close-modal="modal-shift-request">Cancel</button>
      <button class="btn btn-primary" style="flex:1;justify-content:center" id="btn-request-send"><i class="fas fa-paper-plane"></i> Send request</button>
    </div>
  </div>
</div>

<!-- Repeat shifts -->
<div class="modal-overlay" id="modal-repeat">
  <div class="modal">
    <div class="modal-handle"></div>
    <h2><i class="fas fa-copy"></i> Repeat shifts</h2>
    <div class="form-grid-2">
      <div><label class="label" for="repeat-from">Copy from</label><select class="select-field" id="repeat-from"></select></div>
      <div><label class="label" for="repeat-to">Copy to</label><select class="select-field" id="repeat-to"></select></div>
    </div>
    <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin:16px 0 6px">
      <span class="label" style="margin:0">Who to copy</span>
      <span style="display:inline-flex;gap:6px">
        <button type="button" class="btn btn-sm btn-secondary" id="repeat-all">All</button>
        <button type="button" class="btn btn-sm btn-secondary" id="repeat-none">None</button>
      </span>
    </div>
    <div id="repeat-people" style="max-height:42vh;overflow:auto;border:var(--rule);border-radius:10px"></div>
    <div id="repeat-clash" class="repeat-clash" style="display:none"></div>
    <div id="repeat-error" style="color:var(--red);font-size:13px;font-weight:600;min-height:18px;margin-top:10px"></div>
    <div class="action-row" style="margin-top:6px">
      <button class="btn btn-primary" id="btn-repeat-go" style="flex:1"><i class="fas fa-copy"></i> <span id="repeat-go-label">Copy</span></button>
      <button class="btn btn-secondary" data-close-modal="modal-repeat">Cancel</button>
    </div>
  </div>
</div>

<!-- Duplicate warning when adding shifts -->
<div class="modal-overlay modal-center" id="modal-shift-clash" style="z-index:600">
  <div class="modal">
    <h2><i class="fas fa-triangle-exclamation" style="color:var(--amber)"></i> <span id="clash-title">Already scheduled</span></h2>
    <div style="font-size:14px;color:var(--slate-600);margin:-8px 0 12px" id="clash-intro"></div>
    <div class="clash-list" id="clash-list"></div>
    <div class="action-row">
      <button class="btn btn-primary" id="btn-clash-replace" style="flex:1"><i class="fas fa-check"></i> Replace</button>
      <button class="btn btn-secondary" data-close-modal="modal-shift-clash">Go back</button>
    </div>
  </div>
</div>

<!-- Late / Overtime -->
<div class="modal-overlay modal-center" id="modal-shift-adjust">
  <div class="modal">
    <h2 id="adjust-title"><i class="fas fa-hourglass-half"></i> Late</h2>
    <div id="adjust-info" style="font-size:13px;font-weight:600;color:var(--slate-500);margin:-10px 0 12px"></div>
    <div id="adjust-help" style="font-size:13px;color:var(--slate-600);margin-bottom:14px"></div>
    <div class="form-grid-2">
      <div><label class="label" for="adjust-hours">Hours</label><select class="select-field" id="adjust-hours"></select></div>
      <div><label class="label" for="adjust-mins">Minutes</label><select class="select-field" id="adjust-mins"><option value="0">00</option><option value="15">15</option><option value="30">30</option><option value="45">45</option></select></div>
    </div>
    <div class="adjust-chips" id="adjust-chips"></div>
    <div id="adjust-error" style="color:var(--red);font-size:13px;font-weight:600;min-height:18px;margin-top:10px"></div>
    <div class="action-row" style="margin-top:6px">
      <button class="btn btn-primary" id="btn-adjust-save" style="flex:1">Save</button>
      <button class="btn btn-danger" id="btn-adjust-clear">Clear</button>
      <button class="btn btn-secondary" data-close-modal="modal-shift-adjust">Cancel</button>
    </div>
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
    <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px">
      <div style="font-size:11px;font-weight:700;color:var(--ocean-500);text-transform:uppercase;letter-spacing:.5px">Schedule <span style="text-transform:none;letter-spacing:0;font-weight:600;color:var(--slate-400)">· only days with times are saved</span></div>
      <button type="button" class="btn btn-sm btn-secondary" id="btn-shift-same-times" title="Copy the first day that has times to every other working day"><i class="fas fa-clone"></i> Same times every day</button>
    </div>
    <div style="overflow-x:auto;margin-bottom:14px">
      <table style="width:100%;border-collapse:collapse;font-size:13px">
        <thead><tr style="background:var(--ocean-50)">
          <th style="padding:6px 8px;text-align:left;font-weight:700;color:var(--ocean-700);min-width:72px">Day</th>
          <th style="padding:6px 4px;font-weight:700;color:var(--ocean-700)">Start</th>
          <th style="padding:6px 4px;font-weight:700;color:var(--ocean-700)">End</th>
          <th style="padding:6px 4px;font-weight:700;color:var(--ocean-500);min-width:130px">Area · Section</th>
          <th style="padding:6px 4px;font-weight:700;color:#b4402f;white-space:nowrap">Day Off</th>
        </tr></thead>
        <tbody id="shift-days-body">
          <tr data-shift-day="Monday"><td style="padding:5px 8px;font-weight:600;color:var(--ocean-800)">Mon</td><td style="padding:4px"><input type="time" class="input-field shift-day-start" style="padding:5px 6px;font-size:12px" value="09:00"/></td><td style="padding:4px"><input type="time" class="input-field shift-day-end" style="padding:5px 6px;font-size:12px" value="17:00"/></td><td style="padding:4px"><select class="select-field shift-day-zone" style="padding:4px 6px;font-size:12px"><option value="">—</option></select></td><td style="padding:4px;text-align:center"><input type="checkbox" class="shift-day-off-chk" style="width:18px;height:18px;accent-color:#b4402f"/></td></tr>
          <tr data-shift-day="Tuesday"><td style="padding:5px 8px;font-weight:600;color:var(--ocean-800)">Tue</td><td style="padding:4px"><input type="time" class="input-field shift-day-start" style="padding:5px 6px;font-size:12px" value="09:00"/></td><td style="padding:4px"><input type="time" class="input-field shift-day-end" style="padding:5px 6px;font-size:12px" value="17:00"/></td><td style="padding:4px"><select class="select-field shift-day-zone" style="padding:4px 6px;font-size:12px"><option value="">—</option></select></td><td style="padding:4px;text-align:center"><input type="checkbox" class="shift-day-off-chk" style="width:18px;height:18px;accent-color:#b4402f"/></td></tr>
          <tr data-shift-day="Wednesday"><td style="padding:5px 8px;font-weight:600;color:var(--ocean-800)">Wed</td><td style="padding:4px"><input type="time" class="input-field shift-day-start" style="padding:5px 6px;font-size:12px" value="09:00"/></td><td style="padding:4px"><input type="time" class="input-field shift-day-end" style="padding:5px 6px;font-size:12px" value="17:00"/></td><td style="padding:4px"><select class="select-field shift-day-zone" style="padding:4px 6px;font-size:12px"><option value="">—</option></select></td><td style="padding:4px;text-align:center"><input type="checkbox" class="shift-day-off-chk" style="width:18px;height:18px;accent-color:#b4402f"/></td></tr>
          <tr data-shift-day="Thursday"><td style="padding:5px 8px;font-weight:600;color:var(--ocean-800)">Thu</td><td style="padding:4px"><input type="time" class="input-field shift-day-start" style="padding:5px 6px;font-size:12px" value="09:00"/></td><td style="padding:4px"><input type="time" class="input-field shift-day-end" style="padding:5px 6px;font-size:12px" value="17:00"/></td><td style="padding:4px"><select class="select-field shift-day-zone" style="padding:4px 6px;font-size:12px"><option value="">—</option></select></td><td style="padding:4px;text-align:center"><input type="checkbox" class="shift-day-off-chk" style="width:18px;height:18px;accent-color:#b4402f"/></td></tr>
          <tr data-shift-day="Friday"><td style="padding:5px 8px;font-weight:600;color:var(--ocean-800)">Fri</td><td style="padding:4px"><input type="time" class="input-field shift-day-start" style="padding:5px 6px;font-size:12px" value="09:00"/></td><td style="padding:4px"><input type="time" class="input-field shift-day-end" style="padding:5px 6px;font-size:12px" value="17:00"/></td><td style="padding:4px"><select class="select-field shift-day-zone" style="padding:4px 6px;font-size:12px"><option value="">—</option></select></td><td style="padding:4px;text-align:center"><input type="checkbox" class="shift-day-off-chk" style="width:18px;height:18px;accent-color:#b4402f"/></td></tr>
          <tr data-shift-day="Saturday"><td style="padding:5px 8px;font-weight:600;color:var(--ocean-800)">Sat</td><td style="padding:4px"><input type="time" class="input-field shift-day-start" style="padding:5px 6px;font-size:12px" value="09:00"/></td><td style="padding:4px"><input type="time" class="input-field shift-day-end" style="padding:5px 6px;font-size:12px" value="17:00"/></td><td style="padding:4px"><select class="select-field shift-day-zone" style="padding:4px 6px;font-size:12px"><option value="">—</option></select></td><td style="padding:4px;text-align:center"><input type="checkbox" class="shift-day-off-chk" style="width:18px;height:18px;accent-color:#b4402f"/></td></tr>
          <tr data-shift-day="Sunday"><td style="padding:5px 8px;font-weight:600;color:var(--ocean-800)">Sun</td><td style="padding:4px"><input type="time" class="input-field shift-day-start" style="padding:5px 6px;font-size:12px" value="09:00"/></td><td style="padding:4px"><input type="time" class="input-field shift-day-end" style="padding:5px 6px;font-size:12px" value="17:00"/></td><td style="padding:4px"><select class="select-field shift-day-zone" style="padding:4px 6px;font-size:12px"><option value="">—</option></select></td><td style="padding:4px;text-align:center"><input type="checkbox" class="shift-day-off-chk" style="width:18px;height:18px;accent-color:#b4402f"/></td></tr>
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
<div id="print-root"></div>

<script>
(function() {
'use strict';

// ================================================
// SUPABASE CONFIG
// ================================================
var SB_URL = '${cfg.sbUrl}';
var SB_KEY = '${cfg.sbKey}';
var APP_BUILD = '${cfg.build || ''}';
// ================================================
// SECURE LOGIN (Supabase Auth)
// ================================================
// Each staff login is a Supabase Auth user; its session token goes with every database and server
// request, so the database itself decides what each role may see. Until secure login is switched on
// (Settings → Secure login) the app keeps the old login, so nothing changes for staff before then.
var AUTH_KEY = 'bardapraia_auth';
var authSession = null;
try { authSession = JSON.parse(localStorage.getItem(AUTH_KEY) || 'null'); } catch (e) {}
var authStatus = { secure: false, serviceKey: false, emailDomain: 'staff.bardapraia.org' };
var rawFetch = window.fetch.bind(window);
function saveAuthSession(s) { authSession = s; try { if (s) localStorage.setItem(AUTH_KEY, JSON.stringify(s)); else localStorage.removeItem(AUTH_KEY); } catch (e) {} }
function authFromResponse(j) {
  return { access_token: j.access_token, refresh_token: j.refresh_token,
    expires_at: j.expires_at || (Math.floor(Date.now() / 1000) + (j.expires_in || 3600)), meta: (j.user && j.user.app_metadata) || {} };
}
var authRefreshing = null;
// A valid access token (refreshed shortly before it expires), or null without a session
function authToken() {
  if (!authSession) return Promise.resolve(null);
  if (authSession.expires_at - Date.now() / 1000 > 120) return Promise.resolve(authSession.access_token);
  if (authRefreshing) return authRefreshing;
  authRefreshing = rawFetch(SB_URL + '/auth/v1/token?grant_type=refresh_token', { method: 'POST', headers: { apikey: SB_KEY, 'Content-Type': 'application/json' }, body: JSON.stringify({ refresh_token: authSession.refresh_token }) })
    .then(function(r){ if (!r.ok) { var e = new Error('refresh'); e.status = r.status; throw e; } return r.json(); })
    .then(function(j){ saveAuthSession(authFromResponse(j)); return authSession.access_token; })
    .catch(function(e){
      if (e && (e.status === 400 || e.status === 401 || e.status === 403)) { saveAuthSession(null); setTimeout(onAuthLost, 0); return null; }
      return authSession ? authSession.access_token : null;   // offline: keep the session and try again later
    })
    .then(function(t){ authRefreshing = null; return t; });
  return authRefreshing;
}
function onAuthLost() { if (currentUser) { toast('Your session ended. Please log in again.', 'error'); appLogout(); } }
// Every call to our database or server carries the person's session (overrides window.fetch in this script)
function fetch(url, opts) {
  var u = String(url || '');
  var isDb = u.indexOf(SB_URL + '/rest/v1/') === 0 || u.indexOf(SB_URL + '/storage/v1/') === 0;
  var isApi = u.indexOf('/api/') === 0 && u.indexOf('/api/version') !== 0 && u.indexOf('/api/auth/status') !== 0;
  if (!isDb && !isApi) return rawFetch(url, opts);
  return authToken().then(function(tok){
    if (!tok) return rawFetch(url, opts);
    var o = Object.assign({}, opts || {}), h = Object.assign({}, o.headers || {});
    delete h.authorization; h.Authorization = 'Bearer ' + tok; if (isDb) h.apikey = SB_KEY;
    o.headers = h; return rawFetch(url, o);
  });
}
function loadAuthStatus() {
  return rawFetch('/api/auth/status', { cache: 'no-store' }).then(function(r){ return r.json(); })
    .then(function(s){ if (s && typeof s.secure === 'boolean') authStatus = s; return authStatus; }).catch(function(){ return authStatus; });
}
// 'ok' | 'bad' (wrong username/password) | 'offline'
function secureSignIn(uname, pw) {
  return rawFetch(SB_URL + '/auth/v1/token?grant_type=password', { method: 'POST', headers: { apikey: SB_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: uname + '@' + authStatus.emailDomain, password: pw }) })
    .then(function(r){
      if (!r.ok) return 'bad';
      return r.json().then(function(j){
        if (!j.user || !j.user.app_metadata || !j.user.app_metadata.app_user_id) return 'bad';
        saveAuthSession(authFromResponse(j)); return 'ok';
      });
    }).catch(function(){ return 'offline'; });
}
// Log in as the staff account behind the Supabase session (roles come from the session: those are what the database enforces)
function loginFromSession(showWelcome) {
  var m = (authSession && authSession.meta) || {}, db = getDB();
  var u = (db.appUsers || []).find(function(x){ return x.id === m.app_user_id; });
  var user = Object.assign({ id: m.app_user_id, name: m.username || 'Staff', username: m.username || '', active: true }, u || {}, { roles: Array.isArray(m.roles) ? m.roles : ((u && u.roles) || []) });
  applyLogin(user, showWelcome);
}
function isSecure() { return authStatus.secure; }
// ── Impersonate (admins, testing): a real session for someone else; the admin's own session is kept aside ──
var IMP_KEY = 'bardapraia_imp';
function impState() { try { return JSON.parse(localStorage.getItem(IMP_KEY) || 'null'); } catch (e) { return null; } }
function isImpersonating() { var st = impState(); return !!(st && st.admin && authSession); }
function renderImpCard() {
  var card = document.getElementById('imp-card'); if (!card) return;
  var show = isAdmin && !isImpersonating(); card.style.display = show ? '' : 'none'; if (!show) return;
  var sel = document.getElementById('imp-user'), keep = sel.value;
  var users = (getDB().appUsers || []).filter(function(u){ return u.active !== false && u.id !== 'admin_seed' && (!currentUser || u.id !== currentUser.id); })
    .sort(function(a, b){ return a.name.localeCompare(b.name); });
  sel.innerHTML = '<option value="">Choose a person…</option>' + users.map(function(u){
    var plain = { admin:'Admin', finance:'Finance', shift_mgr:'Shift manager', employee:'Employee', chef:'Chef' };
    return '<option value="' + esc(u.id) + '">' + esc(u.name) + ' — ' + esc((u.roles || []).map(function(r){ return plain[r] || r; }).join(', ') || 'no roles') + '</option>';
  }).join('');
  sel.value = keep;
  var btn = document.getElementById('btn-imp-start'); btn.disabled = !isSecure();
  if (!isSecure()) btn.title = 'Needs secure login (see Secure login above)';
}
function startImpersonate() {
  var id = document.getElementById('imp-user').value;
  if (!id) { toast('Choose a person first', 'error'); return; }
  if (!isSecure() || !authSession) { toast('Impersonate needs secure login', 'error'); return; }
  var btn = document.getElementById('btn-imp-start'); btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Starting…';
  fetch('/api/auth/impersonate', { method:'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify({ userId:id }) })
    .then(function(r){ return r.json().then(function(j){ if (!r.ok) throw new Error(j.error || 'Not possible'); return j; }); })
    .then(function(j){
      var mine = authSession;
      try { localStorage.setItem(IMP_KEY, JSON.stringify({ admin: mine, adminName: currentUser ? currentUser.name : '', name: j.name, at: new Date().toISOString() })); } catch (e) {}
      saveAuthSession(authFromResponse(j.session));
      try { localStorage.removeItem(SESSION_KEY); } catch (e) {}
      location.replace('/');   // start fresh as them: their data, their screens
    })
    .catch(function(e){ btn.disabled = false; btn.innerHTML = '<i class="fas fa-user-secret"></i> Impersonate'; toast(e.message || 'Not possible', 'error'); });
}
function exitImpersonate() {
  var st = impState();
  // end only this session (scope=local): the person stays logged in on their own devices
  if (authSession) rawFetch(SB_URL + '/auth/v1/logout?scope=local', { method:'POST', headers:{ apikey:SB_KEY, Authorization:'Bearer ' + authSession.access_token } }).catch(function(){});
  try { localStorage.removeItem(IMP_KEY); localStorage.removeItem(SESSION_KEY); } catch (e) {}
  saveAuthSession(st && st.admin ? st.admin : null);
  location.replace('/');
}
function renderImpBanner() {
  var b = document.getElementById('imp-banner'); if (!b) return;
  var on = isImpersonating() && !!currentUser;
  b.style.display = on ? '' : 'none';
  if (on) document.getElementById('imp-banner-text').innerHTML = 'Impersonating <b>' + esc(currentUser.name) + '</b>. Changes are real and saved as them.';
}
// Settings → Secure login (admins)
function renderSecureCard() {
  var el = document.getElementById('secure-login-body'); if (!el) return;
  var st = authStatus;
  var line = function(ok, txt){ return '<div class="sec-step' + (ok ? ' ok' : '') + '"><i class="fas ' + (ok ? 'fa-circle-check' : 'fa-circle') + '"></i> ' + txt + '</div>'; };
  el.innerHTML = line(st.serviceKey, 'Cloudflare secret <b>SB_SERVICE_KEY</b> is set')
    + line(st.secure, 'Staff logins moved to secure login')
    + line(!!authSession, 'You are logged in with a secure session')
    + (st.serviceKey && st.authAdmin && st.authAdmin !== 'ok' ? '<p class="acc-note" style="color:var(--red);margin-top:6px">Supabase does not accept the key for managing logins (' + esc(st.authAdmin) + '). Use the <b>service_role</b> key from Supabase → Project Settings → API Keys → Legacy API keys.</p>' : '')
    + (st.serviceKey && !authSession ? '<label class="label" for="secure-admin-pw" style="margin-top:10px">Your password (to confirm you are an admin)</label><input type="password" class="input-field" id="secure-admin-pw" autocomplete="current-password" />' : '')
    + (st.serviceKey ? '<button class="btn btn-primary" id="btn-secure-migrate" style="width:100%;justify-content:center;margin-top:10px"><i class="fas fa-shield-halved"></i> ' + (st.secure ? 'Check all logins again' : 'Move everyone to secure login') + '</button>' : '');
}
var secureMigrating = false;
function runSecureMigrate() {
  if (secureMigrating) return;
  var pwEl = document.getElementById('secure-admin-pw'), pw = authSession ? '' : (pwEl ? pwEl.value : '');
  if (!authSession && !pw) { toast('Type your password first', 'error'); if (pwEl) pwEl.focus(); return; }
  secureMigrating = true;
  var btn = document.getElementById('btn-secure-migrate'); if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Moving logins…'; }
  var out = document.getElementById('secure-migrate-result'); if (out) out.innerHTML = '<p class="acc-note">Working… this takes a few seconds.</p>';
  fetch('/api/auth/migrate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: currentUser ? currentUser.username : '', password: pw }) })
    .then(function(r){ return r.json().then(function(j){ return { ok: r.ok, j: j }; }); })
    .then(function(res){
      secureMigrating = false;
      if (!res.ok) { if (out) out.innerHTML = '<p class="acc-note" style="color:var(--red)"><b>Not done:</b> ' + esc(res.j.error || 'Failed') + '</p>'; toast(res.j.error || 'Not done', 'error'); loadAuthStatus().then(renderSecureCard); return; }
      var j = res.j;
      if (out) out.innerHTML = '<p class="acc-note" style="color:var(--slate-800)"><b>' + j.created.length + '</b> logins created, <b>' + j.updated.length + '</b> already there and updated.'
        + (j.failed.length ? '<br><b style="color:var(--red)">Need attention:</b> ' + j.failed.map(function(f){ return esc(f.username) + ' (' + esc(f.reason) + ')'; }).join('; ') : '') + '</p>'
        + (authSession ? '' : '<p class="acc-note"><b>Next:</b> log out and in again to start your own secure session.</p>');
      toast(j.created.length + ' logins created', 'success');
      loadAuthStatus().then(renderSecureCard);
    }).catch(function(){ secureMigrating = false; if (out) out.innerHTML = '<p class="acc-note" style="color:var(--red)">Could not reach the server.</p>'; loadAuthStatus().then(renderSecureCard); });
}
// Users (admins, secure mode): full rows with pay details come from the server, never from the open API
function loadUsersSecure() {
  return fetch('/api/users').then(function(r){ return r.ok ? r.json() : null; }).then(function(rows){
    if (!Array.isArray(rows)) return;
    var db = getDB(); db.appUsers = rows.map(sbRowToUser); saveDB(db);
    if (currentSection === 'users') renderUsers();
  }).catch(function(){});
}
function saveUserSecure(user, password, oldUsername) {
  function dateOrNull(v) { return (v && String(v).trim() !== '') ? v : null; }
  function numOrNull(v)  { var n = parseFloat(v); return isNaN(n) ? null : n; }
  var row = { id: user.id, name: user.name, username: user.username, roles: user.roles || [], contract_start: dateOrNull(user.contractStart), contract_end: dateOrNull(user.contractEnd),
    hours: user.hours || null, amount: numOrNull(user.amount), discount: numOrNull(user.discount), insurance: user.insurance || null, cloth_size: user.clothSize || null,
    notes: user.notes || null, active: user.active !== false, employee: user.employee || '', created_at: user.createdAt || new Date().toISOString() };
  return fetch('/api/users/save', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ user: row, password: password || null, oldUsername: oldUsername || null }) })
    .then(function(r){ return r.json().then(function(j){ if (!r.ok) throw new Error(j.error || 'Not saved'); return j; }); })
    .then(function(){ toast('User saved', 'success'); loadUsersSecure(); })
    .catch(function(e){ toast(e.message || 'Not saved', 'error'); loadUsersSecure(); });
}
// Settings columns the app reads (the accounting column is only for admins, through functions)
var SETTINGS_COLS = 'id,admin_pin,tables,updated_at,finance_pin,fundo_caixa,budgets,week_tips,inv_sort_order,tip_splits,areas,week_notices';
var APP_USER_PUBLIC_COLS = 'id,name,username,roles,active,employee,created_at';
function sbGetSettings() {
  return sbFetch('GET', 'settings', null, 'select=' + SETTINGS_COLS + '&id=eq.config').catch(function(){ return sbFetch('GET', 'settings', null, 'id=eq.config'); });
}
function appUsersQuery() { return (isSecure() ? 'select=' + APP_USER_PUBLIC_COLS + '&' : '') + 'order=name.asc'; }
// Accounting settings: admins read and write them through database functions once the lock-down SQL ran
function rpc(fn, args) { return sbFetch('POST', 'rpc/' + fn, args || {}); }
function readAccountingCfg() {
  return rpc('get_accounting_config').then(function(v){ return { ok: true, v: v }; })
    .catch(function(){ return sbFetch('GET', 'settings', null, 'select=accounting&id=eq.config').then(function(r){ return r && r[0] && ('accounting' in r[0]) ? { ok: true, v: r[0].accounting } : null; }).catch(function(){ return null; }); });
}
function writeAccountingCfg(c) {
  return rpc('set_accounting_config', { cfg: c }).catch(function(){ return sbFetch('PATCH', 'settings', { accounting: c }, 'id=eq.config'); });
}
function readFoodCostTarget() {
  return rpc('get_food_cost_target').catch(function(){ return sbFetch('GET', 'settings', null, 'select=target:accounting->foodCostTarget&id=eq.config').then(function(r){ return r && r[0] ? r[0].target : null; }).catch(function(){ return null; }); });
}

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
      // settings: no row back (staff may not read every column of it)
      'Prefer': table === 'settings' ? 'return=minimal' : (method === 'POST' ? 'return=representation' : (method === 'PATCH' ? 'return=representation' : ''))
    },
    body: body ? JSON.stringify(body) : undefined
  }).then(function(r) {
    if (timer) clearTimeout(timer);
    if (!r.ok) {
      if (r.status === 401 || r.status === 403) { sbDenied = true; noteDenied(); }
      return r.json().then(function(e){ if (e && e.code === '42501') { sbDenied = true; noteDenied(); } throw e; }).catch(function(){ throw new Error('HTTP ' + r.status); });
    }
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
  if (!db.tipsLocked)   db.tipsLocked = {};   // legacy, device-only; superseded by tipSplits
  if (!db.tipSplits)    db.tipSplits = {};    // {weekStart: {total, generatedAt, hours:{emp:h}, shares:{emp:€}, absentDays:{emp:n}}}
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
var sbDenied = false;     // the database refused a read: a session / role matter, not a missing migration
// A refused read without a secure session means this window still uses the old login: ask to log in again
var deniedChecked = false;
function noteDenied() {
  if (authSession || deniedChecked || !currentUser) return;
  deniedChecked = true;
  loadAuthStatus().then(function(st){ if (st.secure && !authSession && currentUser) { toast('Secure login is on: please log in again.', 'error'); appLogout(); } deniedChecked = false; });
}

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
  // a refused read (secure login / role) is not a missing migration
  if (missing.length === 0 || sbDenied || isSecure()) {
    banner.style.display = 'none';
    return;
  }
  sqlEl.textContent = MIGRATION_SQL;
  banner.style.display = 'block';
}

function syncFromSupabase() {
  setSbStatus(null, 'Syncing...');
  sbMissingItems = []; sbDenied = false;
  var db = getDB();
  var promises = [
    sbGetSettings().catch(function(){ return null; }).then(function(rows) {
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
          db.budgets.lastYear = (rb.lastYear && typeof rb.lastYear === 'object') ? rb.lastYear : {};
        }

        // week_tips — full replace from Supabase
        if (r.week_tips === undefined) {
          sbMissingItems.push('settings.week_tips');
        } else {
          db.weekTips = (r.week_tips && typeof r.week_tips === 'object') ? r.week_tips : {};
        }

        // areas — areas and sections (column added in the step 9 migration)
        if (r.areas !== undefined) { sbCols.areas = true; db.areas = Array.isArray(r.areas) ? r.areas : []; }
        // week_notices — weeks the team was told about (step 11b migration)
        if (r.week_notices !== undefined) { sbCols.weekNotices = true; db.weekNotices = r.week_notices || {}; }

        // tip_splits — saved tip splits per week (column added in the step 3 migration)
        if (r.tip_splits !== undefined) db.tipSplits = (r.tip_splits && typeof r.tip_splits === 'object') ? r.tip_splits : {};

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
        time: r.time ? r.time.slice(0,5) : '', endTime: r.end_time ? r.end_time.slice(0,5) : '', guests: r.guests,
        tables: r.tables||[], notes: r.notes||'', status: r.status, createdAt: r.created_at
      }; });
      if (rows && rows.length) sbCols.resEnd = ('end_time' in rows[0]);
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
        if (rows2 && rows2.length) sbCols.section = ('section' in rows2[0]);
        if (rows2) db.shifts = rows2.map(function(r){ return {
          id: r.id, employee: r.employee, day: r.day, weekStart: r.week_start,
          start: r.start_time ? r.start_time.slice(0,5) : '',
          end: r.end_time ? r.end_time.slice(0,5) : '',
          role: r.role||'', zone: r.zone||'', dayOff: !!r.day_off, createdAt: r.created_at,
          lateMinutes: r.late_minutes||0, overtimeMinutes: r.overtime_minutes||0, section: r.section||''
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
        dayNotes: r.day_notes || '',
        savedAt: r.saved_at
      }; });
      if (rows && rows.length) sbCols.finNotes = ('day_notes' in rows[0]);
    }).catch(function(){ sbMissingItems.push('fin_entries table'); }),
    sbFetch('GET', 'app_users', null, appUsersQuery()).then(function(rows) {
      if (rows && rows.length) sbCols.userEmployee = ('employee' in rows[0]);
      if (rows && rows.length > 0) {
        db.appUsers = rows.map(function(r){ return {
          id: r.id, name: r.name, username: r.username,
          passwordHash: r.password_hash,
          roles: Array.isArray(r.roles) ? r.roles : [],
          contractStart: r.contract_start||'', contractEnd: r.contract_end||'',
          hours: r.hours||'', amount: r.amount||'',
          discount: r.discount||'', insurance: r.insurance||'',
          clothSize: r.cloth_size||'', notes: r.notes||'', employee: r.employee||'',
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
    sbFetch('GET', 'shift_requests', null, 'week_start=gte.' + reqCutoff() + '&order=created_at.desc').then(function(rows) {
      sbCols.requests = true; db.shiftRequests = (rows||[]).map(reqFromRow);
    }).catch(function(){ sbCols.requests = false; }),
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
          id: r.id, name: r.name, email: r.email||'', phone: r.phone||'', nif: r.nif||'',
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
  return {id:x.id,name:x.name,username:x.username,passwordHash:x.password_hash,roles:Array.isArray(x.roles)?x.roles:[],contractStart:x.contract_start||'',contractEnd:x.contract_end||'',hours:x.hours||'',amount:x.amount||'',discount:x.discount||'',insurance:x.insurance||'',clothSize:x.cloth_size||'',notes:x.notes||'',employee:x.employee||'',active:x.active!==false,createdAt:x.created_at};
}

var loginInFlight = false;
function doLogin() {
  var uname = (document.getElementById('login-username').value||'').trim().toLowerCase();
  var pw    = document.getElementById('login-password').value;
  var errEl = document.getElementById('login-error');
  if (!uname || !pw) { errEl.textContent = 'Please enter username and password.'; return; }
  if (loginInFlight) return;
  loginInFlight = true; errEl.textContent = 'Checking\u2026';
  // Secure login first; the old login only while secure login has not been switched on
  secureSignIn(uname, pw).then(function(res){
    if (res === 'ok') {
      errEl.textContent = 'Loading\u2026';
      return syncFromSupabase().catch(function(){}).then(function(){ loginInFlight = false; errEl.textContent = ''; document.getElementById('login-password').value = ''; loginFromSession(true); });
    }
    loginInFlight = false;
    if (isSecure()) { errEl.textContent = res === 'offline' ? 'Cannot reach the server. Check your connection and try again.' : 'Invalid username or password.'; return; }
    legacyLogin(uname, pw);
  });
}
function legacyLogin(uname, pw) {
  var errEl = document.getElementById('login-error');
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

// Accounting figures never stay on a device for someone who is not an admin
function forgetAccounting() { var db = getDB(); if (db.accEntries || db.accConfig) { delete db.accEntries; delete db.accConfig; saveDB(db); } }
function forgetFoodCost() { var db = getDB(); if (db.fcRecipes || db.fcIngredients) { delete db.fcRecipes; delete db.fcIngredients; delete db.fcTarget; saveDB(db); } }
function applyLogin(user, showWelcome) {
  currentUser = user;
  isAdmin   = hasRole('admin');
  isFinance = hasRole('finance') || hasRole('admin');
  if (!isAdmin) forgetAccounting();
  if (!isAdmin && !hasRole('chef')) forgetFoodCost();
  // Persist session across refreshes
  try { localStorage.setItem(SESSION_KEY, JSON.stringify({id: user.id, username: user.username})); } catch(e){}
  document.getElementById('login-password').value = '';
  document.getElementById('login-error').textContent = '';
  document.getElementById('login-screen').classList.add('hidden');
  updateSessionUI();
  renderImpBanner();
  showSection('dashboard');
  if (pendingDeepLink) { var dl = pendingDeepLink; pendingDeepLink = ''; openDeepLink(dl); }
  ensurePushCurrent();
  updateNotifStatusUI();
  notifLoad();
  if (showWelcome) {
    toast('Welcome, ' + user.name + '!', 'gold');
    requestNotifPermission();
  }
}

function appLogout() {
  if (isImpersonating()) { exitImpersonate(); return; }
  if (authSession) { var tok = authSession.access_token; rawFetch(SB_URL + '/auth/v1/logout', { method: 'POST', headers: { apikey: SB_KEY, Authorization: 'Bearer ' + tok } }).catch(function(){}); saveAuthSession(null); }
  forgetAccounting(); forgetFoodCost();
  notifItems = []; notifShowAll = false; renderNotifPanel();
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

// ── Stay on the latest version ──────────────────────────────────
// Home-screen apps resume the old page from memory, so check the build when the app comes back
// to the foreground: reload straight away, or offer it when someone is in the middle of a form.
var lastVersionCheck = 0;
function checkForUpdate() {
  if (!APP_BUILD || Date.now() - lastVersionCheck < 60000) return;
  lastVersionCheck = Date.now();
  fetch('/api/version', { cache: 'no-store' }).then(function(r){ return r.json(); }).then(function(d) {
    if (!d || !d.build || d.build === APP_BUILD) return;
    var ae = document.activeElement;
    var busy = document.querySelector('.modal-overlay.open') || (ae && /^(INPUT|TEXTAREA|SELECT)$/.test(ae.tagName));
    if (!busy) { location.reload(); return; }
    if (document.getElementById('update-bar')) return;
    var bar = document.createElement('div'); bar.id = 'update-bar';
    bar.innerHTML = '<span>A new version of the app is ready.</span><button class="btn btn-sm btn-primary" id="btn-update-reload">Reload</button>';
    document.body.appendChild(bar);
  }).catch(function(){});
}
document.addEventListener('visibilitychange', function(){ if (document.visibilityState === 'visible') { checkForUpdate(); notifLoad(); } });
window.addEventListener('focus', checkForUpdate);
setInterval(checkForUpdate, 30 * 60 * 1000);
// Opened from a notification ("/?open=requests"): handled once someone is logged in
var pendingDeepLink = /open=/.test(location.search) ? location.search : '';
function openDeepLink(url) {
  var m = /open=(requests|tasks|shifts|reservations|shopping|calendar)/.exec(url || ''); if (!m) return;
  if (!currentUser) { pendingDeepLink = url; return; }
  try { history.replaceState(null, '', '/'); } catch (e) {}
  if (m[1] === 'tasks') { showSection('tasks'); return; }
  if (m[1] === 'shopping') { showSection('inventory'); switchInvTab('shop'); return; }
  if (m[1] === 'calendar') { var cd = /date=(\\d{4}-\\d{2}-\\d{2})/.exec(url); showSection('calendar'); if (cd) calvGoTo(cd[1]); return; }
  if (m[1] === 'reservations') {
    var rd = /date=(\\d{4}-\\d{2}-\\d{2})/.exec(url);
    if (rd) { calendarWeekStart = getMonday(new Date(rd[1] + 'T12:00:00')); selectedCalendarDay = rd[1]; }
    showSection('reservations'); return;
  }
  if (m[1] === 'requests') { showSection('shifts'); switchShiftsTab('requests'); return; }
  var wk = /week=(\\d{4}-\\d{2}-\\d{2})/.exec(url);
  if (wk) shiftsWeekOffset = Math.round((new Date(wk[1] + 'T00:00:00') - getWeekStart(0)) / (7 * 864e5));
  currentShiftsTab = 'gantt'; showSection('shifts');
}
// Keep this device's push subscription on the server's current key and owned by whoever is logged in
var pushChecked = '';
function ensurePushCurrent() {
  if (isImpersonating()) return;   // this device's notifications stay with the admin
  if (!swRegistration || !currentUser || pushChecked === currentUser.id) return;
  if (!('Notification' in window) || Notification.permission !== 'granted') return;
  pushChecked = currentUser.id;
  var userId = currentUser.id;
  fetch('/api/push/vapid-public-key').then(function(r){ return r.json(); }).then(function(data) {
    return swRegistration.pushManager.getSubscription().then(function(sub) {
      var want = urlBase64ToUint8Array(data.key);
      var have = (sub && sub.options && sub.options.applicationServerKey) ? new Uint8Array(sub.options.applicationServerKey) : null;
      var same = !!have && have.length === want.length && Array.prototype.every.call(have, function(b, i){ return b === want[i]; });
      if (!same) { registerPushSubscription(true); return; }
      return fetch('/api/push/subscribe', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ userId: userId, subscription: sub.toJSON() }) });
    });
  }).catch(function(){});
}

// Dead legacy FCM endpoint pattern (shut down June 2024)

function pushDeviceLabel(endpoint) {
  var h = String(endpoint || '');
  if (h.indexOf('push.apple.com') !== -1) return 'iPhone';
  if (h.indexOf('fcm.googleapis.com') !== -1) return 'Android / Chrome';
  if (h.indexOf('mozilla') !== -1) return 'Firefox';
  if (h.indexOf('windows.com') !== -1) return 'Edge';
  return 'Browser';
}
function isIOSDevice() { return /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1); }
function isStandaloneApp() { return window.navigator.standalone === true || (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches); }
// state: ios-install | ios-old | unsupported | denied | off | active
function drawNotifState(state) {
  var TXT = {
    'ios-install': ['iPhone: add to Home Screen first', 'On iPhone, open Bar da Praia from its Home Screen icon to get notifications.', 'amber', 'How to set it up'],
    'ios-old': ['Update iOS for notifications', 'Notifications need iOS 16.4 or newer.', 'red', 'Not available'],
    'unsupported': ['Notifications not supported', 'This browser cannot receive notifications.', 'red', 'Not available'],
    'denied': ['Notifications blocked', 'Blocked for this site. Allow them in the browser or phone settings, then tap again.', 'red', 'How to unblock'],
    'off': ['Enable Notifications', 'Not set up on this device.', 'amber', 'Enable Notifications on this Device'],
    'active': ['Notifications active', 'On for this device.', 'green', 'Set up again on this device']
  }[state];
  var COL = { green:['rgba(100,255,150,.9)','#2b8a4b'], amber:['rgba(255,200,0,.8)','#b7791f'], red:['rgba(255,100,100,.8)','#b4402f'] }[TXT[2]];
  var dot = document.getElementById('notif-status-dot'), label = document.getElementById('notif-btn-label');
  if (dot) dot.style.color = COL[0]; if (label) label.textContent = TXT[0];
  var cdot = document.getElementById('notif-card-dot'), ctext = document.getElementById('notif-status-text'), clabel = document.getElementById('notif-card-btn-label');
  if (cdot) cdot.style.color = COL[1]; if (ctext) ctext.textContent = TXT[1]; if (clabel) clabel.textContent = TXT[3];
  document.querySelectorAll('[data-test-notif]').forEach(function(b){ b.style.display = state === 'active' ? 'flex' : 'none'; });
  notifState = state;
}
var notifState = 'off';
function updateNotifStatusUI() {
  if (isIOSDevice() && !isStandaloneApp()) { drawNotifState('ios-install'); return; }
  if (!('serviceWorker' in navigator) || !('PushManager' in window) || !('Notification' in window)) { drawNotifState(isIOSDevice() ? 'ios-old' : 'unsupported'); return; }
  if (Notification.permission === 'denied') { drawNotifState('denied'); return; }
  if (!swRegistration) { drawNotifState('off'); return; }
  swRegistration.pushManager.getSubscription().then(function(sub) {
    drawNotifState(sub ? 'active' : 'off');
  }).catch(function(){ drawNotifState('off'); });
}
// Where to look when a notification does not show, for this kind of device
function notifSettingsHint() {
  if (isIOSDevice()) return 'iPhone: Settings → Notifications → Bar da Praia → Allow Notifications. Focus / Do Not Disturb can also hide them.';
  if (/Android/.test(navigator.userAgent)) return 'Android: Settings → Apps → Chrome → Notifications must be on, including bardapraia.org under Sites. Battery saver or Do Not Disturb can delay them.';
  return 'Computer: allow notifications for bardapraia.org in the browser, and check the system notification settings for the browser.';
}
var notifTestTimer = null;
function showNotifHelp(html, ok) {
  var h = document.getElementById('notif-help'); if (!h) return;
  h.innerHTML = html; h.className = 'notif-help' + (ok ? ' is-ok' : ''); h.style.display = '';
}
// Send a real notification to this login's devices; the service worker tells us when it reached this one
function sendTestNotification() {
  if (!currentUser) return;
  if (notifTestTimer) clearTimeout(notifTestTimer);
  toast('Sending a test…');
  fetch('/api/push/send', { method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ userIds:[currentUser.id], title:'Test notification', body:'Notifications work on this device.', tag:'bardapraia-test' }) })
    .then(function(r){ return r.json(); })
    .then(function(d){
      if (!d || !d.sent) {
        toast('This device is not registered yet. Tap Enable Notifications first.', 'error');
        showNotifHelp('No device is registered for your login yet. Tap <b>Enable Notifications</b> and allow them.');
        return;
      }
      notifTestTimer = setTimeout(function(){
        notifTestTimer = null;
        toast('The test has not reached this device', 'error');
        showNotifHelp('The test did not reach this device within 20 seconds. Check the connection, then tap <b>Set up again on this device</b>. ' + esc(notifSettingsHint()));
      }, 20000);
    })
    .catch(function(){ toast('Could not send the test. Check the connection.', 'error'); });
}
// ── Notifications inbox: everything sent to this person, kept on the server ──
var notifItems = [], notifShowAll = false, notifLoading = false;
function notifLoad() {
  if (!currentUser || notifLoading) return;
  notifLoading = true;
  var me = currentUser.id;
  // tidy: notifications older than 60 days go
  var cut = new Date(Date.now() - 60 * 864e5).toISOString();
  if (!isImpersonating()) sbFetch('DELETE', 'notifications', null, 'user_id=eq.' + encodeURIComponent(me) + '&created_at=lt.' + encodeURIComponent(cut)).catch(function(){});
  sbFetch('GET', 'notifications', null, 'user_id=eq.' + encodeURIComponent(me) + '&order=created_at.desc&limit=60').then(function(rows){
    if (!currentUser || currentUser.id !== me) return;
    sbCols.notif = true; notifItems = (rows || []).slice().sort(function(a, b){ return String(b.created_at).localeCompare(String(a.created_at)); });
  }).catch(function(){ sbCols.notif = false; notifItems = []; }).then(function(){ notifLoading = false; renderNotifPanel(); });
}
function notifUnread() { return notifItems.filter(function(n){ return !n.read_at; }).length; }
function notifIcon(url) {
  var u = String(url || '');
  if (/open=tasks/.test(u)) return 'fa-list-check';
  if (/open=(shifts|requests)/.test(u)) return 'fa-clock';
  if (/open=(reservations|calendar)/.test(u)) return 'fa-calendar-day';
  if (/open=shopping/.test(u)) return 'fa-bag-shopping';
  return 'fa-bell';
}
function notifWhen(iso) {
  var d = new Date(iso); if (isNaN(d)) return '';
  var mins = Math.round((Date.now() - d) / 6e4);
  if (mins < 1) return 'just now';
  if (mins < 60) return mins + ' min ago';
  var hm = String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
  var today = new Date(); today.setHours(0, 0, 0, 0);
  var dayDiff = Math.round((today - new Date(d.getFullYear(), d.getMonth(), d.getDate())) / 864e5);
  if (dayDiff === 0) return 'Today ' + hm;
  if (dayDiff === 1) return 'Yesterday ' + hm;
  return d.toLocaleDateString('en-GB', { weekday:'short', day:'numeric', month:'short' }) + ' ' + hm;
}
function renderNotifPanel() {
  var n = notifUnread();
  [['bnav-notif-count', n > 9 ? '9+' : n], ['ditem-notif-count', n]].forEach(function(x){
    var b = document.getElementById(x[0]); if (b) { b.textContent = x[1]; b.style.display = n ? '' : 'none'; }
  });
  var panel = document.getElementById('dash-notif-panel'), list = document.getElementById('dash-notif-list'); if (!panel || !list) return;
  // hidden until the inbox SQL has run
  panel.style.display = sbCols.notif ? '' : 'none'; if (!sbCols.notif) return;
  var badge = document.getElementById('dash-notif-badge'); if (badge) { badge.textContent = n + ' new'; badge.style.display = n ? '' : 'none'; }
  var ra = document.getElementById('btn-notif-read-all'); if (ra) ra.style.display = n ? '' : 'none';
  var cl = document.getElementById('btn-notif-clear'); if (cl) cl.style.display = notifItems.some(function(x){ return x.read_at; }) ? '' : 'none';
  if (!notifItems.length) { list.innerHTML = '<div class="empty-state" style="padding:12px"><i class="fas fa-bell-slash" style="font-size:22px"></i><p>No notifications. Anything sent to you shows up here, even when you were away.</p></div>'; return; }
  // unread first, then the most recent read ones
  var ordered = notifItems.filter(function(x){ return !x.read_at; }).concat(notifItems.filter(function(x){ return x.read_at; }));
  var LIMIT = Math.max(5, n), shown = notifShowAll ? ordered : ordered.slice(0, LIMIT);
  list.innerHTML = shown.map(function(x){
    return '<button class="notif-item' + (x.read_at ? '' : ' unread') + '" data-notif-id="' + esc(x.id) + '">'
      + '<span class="notif-ic"><i class="fas ' + notifIcon(x.url) + '"></i></span>'
      + '<span class="notif-txt"><span class="notif-title" style="display:block">' + esc(x.title) + '</span>' + (x.body ? '<span class="notif-body" style="display:block">' + esc(x.body) + '</span>' : '') + '</span>'
      + '<span class="notif-time">' + esc(notifWhen(x.created_at)) + '</span></button>';
  }).join('') + (ordered.length > LIMIT ? '<button class="notif-more" id="btn-notif-more">' + (notifShowAll ? 'Show fewer' : 'Show all ' + ordered.length) + '</button>' : '');
}
function notifOpen(id) {
  var x = notifItems.find(function(n){ return String(n.id) === String(id); }); if (!x) return;
  if (!x.read_at && !isImpersonating()) {   // impersonating: their inbox is read-only
    x.read_at = new Date().toISOString(); renderNotifPanel();
    sbFetch('PATCH', 'notifications', { read_at:x.read_at }, 'id=eq.' + encodeURIComponent(x.id)).catch(function(){});
  }
  if (/open=/.test(x.url || '')) openDeepLink(x.url);
}
function notifReadAll() {
  if (!currentUser) return;
  if (isImpersonating()) { toast('Their inbox is read-only while impersonating'); return; }
  var now = new Date().toISOString();
  notifItems.forEach(function(x){ if (!x.read_at) x.read_at = now; }); renderNotifPanel();
  sbFetch('PATCH', 'notifications', { read_at:now }, 'user_id=eq.' + encodeURIComponent(currentUser.id) + '&read_at=is.null').catch(function(){ toast('Not saved. Check the connection.', 'error'); });
}
function notifClearRead() {
  if (!currentUser) return;
  if (isImpersonating()) { toast('Their inbox is read-only while impersonating'); return; }
  notifItems = notifItems.filter(function(x){ return !x.read_at; }); notifShowAll = false; renderNotifPanel();
  sbFetch('DELETE', 'notifications', null, 'user_id=eq.' + encodeURIComponent(currentUser.id) + '&read_at=not.is.null').catch(function(){ toast('Not cleared. Check the connection.', 'error'); });
}
function onPushArrived(tag) {
  if (tag !== 'bardapraia-test') notifLoad();
  if (tag !== 'bardapraia-test' || !notifTestTimer) return;
  clearTimeout(notifTestTimer); notifTestTimer = null;
  toast('Test received on this device', 'success');
  showNotifHelp('The test reached this device. If no notification popped up, notifications are switched off for it in the phone settings. ' + esc(notifSettingsHint()), true);
}

function requestNotifPermission() {
  if (isImpersonating()) return;
  if (!('serviceWorker' in navigator) || !('PushManager' in window) || !('Notification' in window)) return;
  if (Notification.permission !== 'default') return;   // already answered: ensurePushCurrent() keeps a 'granted' device current
  Notification.requestPermission().then(function(perm) {
    if (perm === 'granted') registerPushSubscription();
  });
}

function registerPushSubscription(quiet) {
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
          // forget the old endpoint on the server too, so dead subscriptions do not pile up
          sbFetch('DELETE', 'push_subscriptions', null, 'endpoint=eq.' + encodeURIComponent(existing.endpoint)).catch(function(){});
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
        if (!quiet) toast('Notifications enabled', 'success');
      } else {
        console.warn('[Push] Server rejected subscription');
        if (!quiet) toast('Could not save subscription', 'error');
      }
      setBtnIdle();
    })
    .catch(function(err) {
      console.warn('[Push] Failed:', err.message);
      if (!quiet) toast('Failed: ' + err.message, 'error');
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
// A task was assigned: push to those people (not to whoever assigned it); tapping opens Tasks
function sendTaskPush(taskTitle, assignedUserIds, deadline, priority) {
  if (!assignedUserIds || !assignedUserIds.length) return;
  var bits = [];
  if (deadline) { var d = new Date(deadline + 'T00:00:00'); bits.push('Due ' + DAYS[(d.getDay() + 6) % 7].slice(0,3) + ' ' + d.getDate() + ' ' + MONTH_NAMES[d.getMonth()]); }
  if (priority === 'high' || priority === 'urgent') bits.push(priority.charAt(0).toUpperCase() + priority.slice(1) + ' priority');
  var by = currentUser ? 'From ' + currentUser.name : '';
  sendPush(assignedUserIds, 'New task: ' + taskTitle, (bits.length ? bits.join(' · ') + '. ' : '') + by, '/?open=tasks');
}

// Register the service worker on page load (force update to clear stale SW)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(function(reg) {
    swRegistration = reg;
    ensurePushCurrent();
    navigator.serviceWorker.addEventListener('message', function(ev){
      if (!ev.data) return;
      if (ev.data.type === 'open') openDeepLink(ev.data.url);
      if (ev.data.type === 'pushed') onPushArrived(ev.data.tag);
    });
    if (navigator.serviceWorker.startMessages) navigator.serviceWorker.startMessages();   // deliver queued messages now
    // Force the new SW to activate immediately if waiting
    if (reg.waiting) { reg.waiting.postMessage({ type: 'SKIP_WAITING' }); }
    reg.update(); // Check for updated SW
    console.log('[SW] Registered, scope:', reg.scope);
    // A logged-in device that already allowed notifications is kept current by ensurePushCurrent()
    // (it only re-subscribes when the key changed, instead of on every page load)
    updateNotifStatusUI();
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
      var labels = {admin:'<i class="fas fa-crown"></i> Admin',finance:'<i class="fas fa-euro-sign"></i> Finance',shift_mgr:'<i class="fas fa-calendar-days"></i> Shifts',employee:'<i class="fas fa-user"></i> Employee',chef:'<i class="fas fa-utensils"></i> Chef'};
      var cls    = {admin:'admin',finance:'finance',shift_mgr:'shift_mgr',employee:'employee',chef:'chef'};
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
  dshow('ditem-calendar',     true);
  dshow('ditem-shifts',       true);
  dshow('ditem-finance',      isFinance);
  dshow('ditem-accounting',   isAdmin);
  dshow('ditem-foodcost',     canFoodCost());
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
    notifLoad();
    fetches = [
      sbFetch('GET','reservations',null,'order=date.asc,time.asc'),
      sbFetch('GET','tasks',null,'order=created_at.desc'),
      sbFetch('GET','inventory',null,'order=name.asc'),
      sbFetch('GET','orders',null,'order=created_at.desc')
    ];
    Promise.all(fetches).then(function(res) {
      var db = getDB();
      if (res[0] && res[0].length) sbCols.resEnd = ('end_time' in res[0][0]);
      if (res[0]) db.reservations = res[0].map(function(x){ return {id:x.id,guestName:x.guest_name,phone:x.phone||'',date:x.date,time:x.time?x.time.slice(0,5):'',endTime:x.end_time?x.end_time.slice(0,5):'',guests:x.guests,tables:x.tables||[],notes:x.notes||'',status:x.status,createdAt:x.created_at}; });
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
    shopLoad();

  } else if (name === 'calendar') {
    calvLoad();

  } else if (name === 'reservations') {
    sbFetch('GET','reservations',null,'order=date.asc,time.asc').then(function(rows) {
      if (!rows) return;
      var db = getDB();
      sbCols.resEnd = rows.length ? ('end_time' in rows[0]) : sbCols.resEnd;
      db.reservations = rows.map(function(x){ return {id:x.id,guestName:x.guest_name,phone:x.phone||'',date:x.date,time:x.time?x.time.slice(0,5):'',endTime:x.end_time?x.end_time.slice(0,5):'',guests:x.guests,tables:x.tables||[],notes:x.notes||'',status:x.status,createdAt:x.created_at}; });
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
      sbFetch('GET','employees',null,'order=name.asc'),
      sbFetch('GET','shift_requests',null,'week_start=gte.' + reqCutoff() + '&order=created_at.desc').catch(function(){ return 'missing'; }),
      sbFetch('GET','settings',null,'select=week_notices&id=eq.config').catch(function(){ return null; })
    ]).then(function(res) {
      var db = getDB();
      if (res[4] && res[4][0] && ('week_notices' in res[4][0])) { sbCols.weekNotices = true; db.weekNotices = res[4][0].week_notices || {}; }
      if (res[3] === 'missing') sbCols.requests = false;
      else if (res[3]) { sbCols.requests = true; db.shiftRequests = res[3].map(reqFromRow); }
      if (res[0] && res[0].length) sbCols.section = ('section' in res[0][0]);
      if (res[0]) db.shifts = res[0].map(function(x){ return {id:x.id,employee:x.employee,day:x.day,weekStart:x.week_start,start:x.start_time?x.start_time.slice(0,5):'',end:x.end_time?x.end_time.slice(0,5):'',role:x.role||'',zone:x.zone||'',dayOff:!!x.day_off,createdAt:x.created_at,lateMinutes:x.late_minutes||0,overtimeMinutes:x.overtime_minutes||0,section:x.section||''}; });
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
      var ae = document.activeElement;
      if (currentSection === name && !(ae && ae.dataset && ae.dataset.bbQtyInput)) renderBlackBox();
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
        dayNotes:r.day_notes||'',
        savedAt:r.saved_at
      }; });
      if (rows.length) sbCols.finNotes = ('day_notes' in rows[0]);
      saveDB(db);
      if (currentSection === name) renderFinance();
    }).catch(function(){});

  } else if (name === 'accounting') {
    if (isAdmin) accLoad();

  } else if (name === 'foodcost') {
    if (canFoodCost()) fcLoad();

  } else if (name === 'users') {
    if (isSecure()) loadUsersSecure();
    // secure mode: the database no longer shows devices to the app, the server does (admins)
    (isSecure() ? fetch('/api/push/devices').then(function(r){ if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
                : sbFetch('GET','push_subscriptions',null,'select=user_id,endpoint,updated_at')).then(function(rows) {
      if (!Array.isArray(rows)) return; var db = getDB(); db.pushSubs = rows.map(function(x){ return { userId:x.user_id, endpoint:x.endpoint, updatedAt:x.updated_at }; }); saveDB(db);
      if (currentSection === name) renderUsers();
    }).catch(function(){});
    if (!isSecure()) sbFetch('GET','app_users',null,'order=name.asc').then(function(rows) {
      if (!rows || !rows.length) return;
      var db = getDB();
      db.appUsers = rows.map(function(x){ return {id:x.id,name:x.name,username:x.username,passwordHash:x.password_hash,roles:Array.isArray(x.roles)?x.roles:[],contractStart:x.contract_start||'',contractEnd:x.contract_end||'',hours:x.hours||'',amount:x.amount||'',discount:x.discount||'',insurance:x.insurance||'',clothSize:x.cloth_size||'',notes:x.notes||'',employee:x.employee||'',active:x.active!==false,createdAt:x.created_at}; });
      if (!db.appUsers.find(function(u){ return u.id==='admin_seed'; })) {
        db.appUsers.push({id:'admin_seed',name:'Administrator',username:'admin',passwordHash:btoa(unescape(encodeURIComponent('Admin1234'))),roles:['admin','finance','shift_mgr','employee'],contractStart:'',contractEnd:'',hours:'',amount:'',discount:'',insurance:'',clothSize:'',notes:'',active:true,createdAt:new Date().toISOString()});
      }
      saveDB(db);
      if (currentSection === name) renderUsers();
    }).catch(function(){});

  } else if (name === 'settings') {
    Promise.all([
      sbFetch('GET','employees',null,'order=name.asc'),
      sbGetSettings()
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
          db.budgets.lastYear = (rb.lastYear && typeof rb.lastYear === 'object') ? rb.lastYear : {};
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
  if ((name === 'blackbox' || name === 'settings' || name === 'users' || name === 'accounting') && !isAdmin) {
    toast('Admin access required.', 'error'); return;
  }
  if (name === 'foodcost' && !canFoodCost()) {
    toast('Chef or admin access required.', 'error'); return;
  }
  if (name === 'finance' && !isFinance) {
    toast('Finance role required.', 'error'); return;
  }

  document.querySelectorAll('.page-section').forEach(function(s){ s.classList.remove('active'); });
  var sec = document.getElementById('section-' + name);
  if (!sec) return;
  sec.classList.add('active');

  document.querySelectorAll('.bnav-item').forEach(function(b){ b.classList.remove('active'); });
  // Calendar lives under Reservations, so the phone's Book button stays lit there
  var bn = document.getElementById('bnav-' + (name === 'calendar' ? 'reservations' : name));
  if (bn) bn.classList.add('active');
  document.querySelectorAll('.drawer-item').forEach(function(b){ b.classList.remove('active'); });
  var di = document.getElementById('ditem-' + name);
  if (di) di.classList.add('active');

  var titles = {dashboard:'Dashboard',inventory:'Shopping List',reservations:'Reservations',calendar:'Calendar',tasks:'Tasks',shifts:'Shifts',blackbox:'Black Box',finance:'Finance',accounting:'Accounting',foodcost:'Food Cost',users:'Users',settings:'Settings'};
  document.getElementById('topbar-title').textContent = titles[name] || 'Bar da Praia';
  moveBnavMarker();
  currentSection = name;
  closeDrawer();

  // Render immediately from local cache (instant UI)
  if (name === 'dashboard')    renderDashboard();
  if (name === 'inventory')    { renderInventory(); renderSuppliers(); renderInvLogSupplierFilter(); }
  if (name === 'reservations') { renderCalendar(); renderAllReservations(); }
  if (name === 'calendar')     renderCalView();
  if (name === 'tasks')        renderTasks();
  if (name === 'shifts')       renderShifts();
  if (name === 'blackbox')     renderBlackBox();
  if (name === 'finance')      renderFinance();
  if (name === 'accounting')   renderAccounting();
  if (name === 'foodcost')     renderFoodCost();
  if (name === 'users')        renderUsers();
  if (name === 'settings')     renderSettings();

  // Re-fetch only the relevant tables for this section, then re-render
  refreshSection(name);
}

// ================================================
// USERS MANAGEMENT
// ================================================
var ROLE_LABELS = {admin:'<i class="fas fa-crown"></i> Admin', finance:'<i class="fas fa-euro-sign"></i> Finance', shift_mgr:'<i class="fas fa-calendar-days"></i> Shift Mgr', employee:'<i class="fas fa-user"></i> Employee', chef:'<i class="fas fa-utensils"></i> Chef'};
var ROLE_COLORS = {admin:'#b7791f', finance:'#6d4fc2', shift_mgr:'#2b8a4b', employee:'#2a9683', chef:'#8a5a3c'};

function renderUsers() {
  var el = document.getElementById('users-list');
  if (!el) return;
  var db = getDB();
  var users = db.appUsers || [];
  if (users.length === 0) {
    el.innerHTML = '<div class="empty-state"><i class="fas fa-users"></i><p>No users yet. Add the first user!</p></div>';
    return;
  }
  var subs = db.pushSubs || [];
  var devicesOf = function(u){ return subs.filter(function(p){ return p.userId === u.id; }); };
  var activeUsers = users.filter(function(u){ return u.active !== false && u.id !== 'admin_seed'; });
  var reachable = activeUsers.filter(function(u){ return devicesOf(u).length; }).length;
  var summary = db.pushSubs ? '<div class="push-summary"><i class="fas fa-bell" style="color:var(--teal-600)"></i> Notifications: <b>' + reachable + ' of ' + activeUsers.length + '</b> active people set up.'
    + (reachable < activeUsers.length ? ' The others will not get task or shift request alerts until they tap <b>Enable Notifications</b> in the menu.' : '') + '</div>' : '';
  el.innerHTML = summary + users.map(function(u) {
    var devs = devicesOf(u);
    var pushChip = !db.pushSubs ? '' : (devs.length
      ? devs.map(function(p){ return pushDeviceLabel(p.endpoint); }).filter(function(l, i, a){ return a.indexOf(l) === i; })
          .map(function(l){ return '<span class="push-chip is-on"><i class="fas fa-bell"></i> ' + esc(l) + '</span>'; }).join(' ')
      : '<span class="push-chip is-off"><i class="fas fa-bell-slash"></i> No notifications</span>');
    var roleBadges = (u.roles||[]).map(function(r) {
      return '<span style="background:'+( ROLE_COLORS[r]||'#5f7079')+'22;color:'+(ROLE_COLORS[r]||'#5f7079')+';border:1px solid '+(ROLE_COLORS[r]||'#5f7079')+'44;border-radius:20px;padding:2px 8px;font-size:11px;font-weight:700">'+(ROLE_LABELS[r]||r)+'</span>';
    }).join('');
    var isSelf = currentUser && currentUser.id === u.id;
    var contractInfo = '';
    if (u.contractStart) contractInfo += '<span style="font-size:11px;color:var(--ocean-400)"><i class="fas fa-calendar-alt"></i> From '+esc(u.contractStart)+(u.contractEnd?' → '+esc(u.contractEnd):'')+'</span> ';
    if (u.hours) contractInfo += '<span style="font-size:11px;color:var(--ocean-400)"><i class="fas fa-clock"></i> '+esc(u.hours)+'h/wk</span> ';
    if (u.amount) contractInfo += '<span style="font-size:11px;color:var(--ocean-400)"><i class="fas fa-euro-sign"></i> '+esc(u.amount)+'</span>';
    return '<div style="background:white;border:1.5px solid var(--ocean-100);border-radius:14px;padding:14px 16px;margin-bottom:10px;display:flex;align-items:flex-start;gap:12px">'
      +'<div style="width:40px;height:40px;background:var(--ocean-500);border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-weight:800;font-size:16px;flex-shrink:0">'
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
        +(pushChip?'<div style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:6px">'+pushChip+'</div>':'')
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
    fillUserEmployeeSelect(u);
    if (activeEl) activeEl.checked = u.active !== false;
    (u.roles||[]).forEach(function(r){
      var cb = document.querySelector('.user-role-cb[value="'+r+'"]');
      if (cb) cb.checked = true;
    });
    // Update password placeholder
    if (pwFields) pwFields.placeholder = 'Leave blank to keep current';
  } else {
    if (titleEl) titleEl.textContent = ' Add User';
    fillUserEmployeeSelect(null);
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
      employee:      document.getElementById('user-employee').value||'',
      active:        active,
      createdAt:     new Date().toISOString()
    };
    db.appUsers.push(newUser);
    saveDB(db);
    closeModal('modal-add-user');
    renderUsers();
    if (isSecure()) { saveUserSecure(newUser, pw, null); return; }
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
    var oldUsername = existing.username;
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
    existing.employee      = document.getElementById('user-employee').value||'';
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
    if (isSecure()) { saveUserSecure(existing, pw, oldUsername); return; }
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
  if (isSecure()) { fetch('/api/users/delete', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ id: userId }) }).then(function(r){ if (!r.ok) toast('Not deleted on the server', 'error'); loadUsersSecure(); }); return; }
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
    employee:       user.employee||'',
    active:         user.active !== false,
    created_at:     user.createdAt||new Date().toISOString()
  };

  if (!sbCols.userEmployee) delete payload.employee;   // column added by the step 11 migration

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
function renderTableGrid(gridId, selectedArr, busy) {
  var tables = getTables();
  var grid = document.getElementById(gridId); if (!grid) return;
  grid.innerHTML = '';
  busy = busy || {};
  tables.forEach(function(t) {
    var chip = document.createElement('div'), b = busy[t];
    chip.className = 'table-chip' + (selectedArr.indexOf(t)!==-1 ? ' selected' : '') + (b ? ' occupied' : '');
    chip.textContent = t;
    if (b) { var sm = document.createElement('small'); sm.textContent = b.label; chip.appendChild(sm); chip.title = 'Booked ' + b.label + ' · ' + b.guest; }
    chip.dataset.tableVal = t;
    grid.appendChild(chip);
  });
}
// ── Table availability for reservations ─────────────────────────
var RES_DEFAULT_MINUTES = 120;   // a reservation without an end time holds its tables this long
function resWindow(r) {
  var st = timeToMins(r.time), en = r.endTime ? timeToMins(r.endTime) : st + RES_DEFAULT_MINUTES;
  if (r.endTime && en <= st) en += 24 * 60;   // ends after midnight
  return [st, en];
}
function resLabel(r) { var w = resWindow(r); var f = function(m){ m = m % (24*60); return String(Math.floor(m/60)).padStart(2,'0') + ':' + String(m%60).padStart(2,'0'); }; return f(w[0]) + '–' + f(w[1]); }
// tables taken by other reservations overlapping [date, from, until]
function busyTables(date, time, endTime, exceptId) {
  var out = {}; if (!date || !time) return out;
  var me = resWindow({ time:time, endTime:endTime });
  (getDB().reservations || []).forEach(function(r){
    if (r.id === exceptId || r.date !== date || r.status === 'no-show' || r.status === 'cancelled') return;
    var w = resWindow(r); if (!(me[0] < w[1] && w[0] < me[1])) return;
    (Array.isArray(r.tables) ? r.tables : (r.table ? [r.table] : [])).forEach(function(t){ if (!out[t]) out[t] = { label: resLabel(r), guest: r.guestName }; });
  });
  return out;
}
function refreshResTableGrid() {
  var date = document.getElementById('res-date').value, time = document.getElementById('res-time').value, end = document.getElementById('res-end').value;
  var busy = busyTables(date, time, end, document.getElementById('res-edit-id').value);
  renderTableGrid('res-table-grid', selectedTables, busy);
  var clash = selectedTables.filter(function(t){ return busy[t]; });
  var hint = document.getElementById('res-table-hint');
  if (hint) hint.innerHTML = (clash.length ? '<b>' + esc(clash.join(', ')) + ' ' + (clash.length === 1 ? 'is' : 'are') + ' already booked then.</b> ' : '')
    + (Object.keys(busy).length ? 'Red tables are booked at that time. ' : '')
    + (end ? '' : 'Without an end time a table is held for ' + (RES_DEFAULT_MINUTES / 60) + ' hours.');
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
// ── Last year's figures (Settings → Finance Budgets → Last year) ──
var budMode = 'budget';
function renderLastYearTable(db) {
  var Y = new Date().getFullYear(), LY = Y - 1;
  var bb = document.getElementById('bud-mode-budget'), bl = document.getElementById('bud-mode-ly');
  if (bb) bb.textContent = 'Budget ' + Y; if (bl) bl.textContent = 'Last year ' + LY;
  var fl = document.getElementById('bud-fill-label'); if (fl) fl.textContent = 'Fill Total Day and T 51 from ' + LY + ' sales';
  var wrap = document.getElementById('ly-table-wrap'); if (!wrap) return;
  var ly = ((db.budgets || {}).lastYear || {})[String(LY)] || {};
  var iStyle = 'width:100%;border:1px solid var(--ocean-100);border-radius:6px;padding:4px 6px;font-size:12px;text-align:right;background:white;outline:none;';
  var tot = { day:0, t51:0, surf:0 };
  var rows = MONTH_KEYS.map(function(m, i){
    var cells = ['day','t51','surf'].map(function(k){
      var typed = ly[k] && parseFloat(ly[k][m]) > 0 ? parseFloat(ly[k][m]) : 0;
      var fromCloses = typed ? null : finLastYear(db, k, LY, m);
      tot[k] += typed || fromCloses || 0;
      return '<td style="padding:3px 4px"><input type="text" inputmode="decimal" id="ly-' + k + '-' + m + '" value="' + (typed || '') + '" placeholder="' + (fromCloses ? Math.round(fromCloses) + ' (closes)' : '0') + '" style="' + iStyle + 'color:var(--gold)" aria-label="' + MONTH_NAMES[i] + ' ' + LY + ' ' + k + '" /></td>';
    }).join('');
    return '<tr style="border-bottom:1px solid var(--ocean-50)"><td style="padding:5px 8px;font-weight:700;color:var(--ocean-700)">' + MONTH_NAMES[i] + '</td>' + cells + '</tr>';
  }).join('');
  wrap.innerHTML = '<table style="width:100%;border-collapse:collapse;font-size:12px"><thead><tr style="background:var(--gold-50)">'
    + '<th style="padding:6px 8px;text-align:left;font-weight:700;color:var(--ocean-700);min-width:60px">' + LY + '</th>'
    + '<th style="padding:6px 4px;font-weight:700;color:var(--gold);text-align:right;min-width:80px">Total Day</th>'
    + '<th style="padding:6px 4px;font-weight:700;color:var(--gold);text-align:right;min-width:80px">T 51</th>'
    + '<th style="padding:6px 4px;font-weight:700;color:var(--gold);text-align:right;min-width:80px">Surf</th></tr></thead><tbody>' + rows + '</tbody>'
    + '<tfoot><tr style="background:var(--gold-50);border-top:2px solid var(--gold-200)"><td style="padding:6px 8px;font-weight:800;font-size:12px">Year Total</td>'
    + ['day','t51','surf'].map(function(k){ return '<td id="ly-total-' + k + '" style="padding:6px 4px;font-weight:800;color:var(--gold);text-align:right;font-size:12px">' + fmtEur(tot[k]) + '</td>'; }).join('') + '</tr></tfoot></table>'
    + '<p class="acc-note" style="margin-top:8px">Months left empty use that year\u2019s daily closes when there are any (shown in grey). Filling from Accounting puts Caixa 1 + Caixa FCP in Total Day and Caixa FCP in T 51.</p>';
  setBudMode(budMode);
}
function updateLastYearTotals() {
  var db = getDB(), LY = new Date().getFullYear() - 1;
  ['day','t51','surf'].forEach(function(k){
    var sum = 0;
    MONTH_KEYS.forEach(function(m){ var el = document.getElementById('ly-' + k + '-' + m); var v = el ? accNum(el.value) : null; sum += v > 0 ? v : (finLastYear(db, k, LY, m) || 0); });
    var c = document.getElementById('ly-total-' + k); if (c) c.textContent = fmtEur(sum);
  });
}
function setBudMode(mode) {
  budMode = mode;
  var bw = document.getElementById('budget-table-wrap'), lw = document.getElementById('ly-table-wrap'), fb = document.getElementById('btn-bud-fill-ly');
  if (bw) bw.style.display = mode === 'ly' ? 'none' : '';
  if (lw) lw.style.display = mode === 'ly' ? '' : 'none';
  if (fb) fb.style.display = mode === 'ly' && isAdmin ? '' : 'none';
  document.querySelectorAll('[data-bud-mode]').forEach(function(b){ b.classList.toggle('active', b.dataset.budMode === mode); });
}
// Admins: last year's Total of the day from the sales imported into Accounting (Caixa 1 + Caixa FCP)
function fillLastYearFromAccounting() {
  var LY = new Date().getFullYear() - 1;
  toast('Reading ' + LY + ' sales…');
  sbFetchAll('acc_entries', 'year=eq.' + LY + '&kind=eq.revenue&order=id.asc').then(function(rows){
    // Total Day = every till (Caixa 1 + Caixa FCP); T 51 = the Caixa FCP till
    var sums = {}, t51 = {}; (rows || []).forEach(function(r){
      var m = String(r.month).padStart(2, '0'), v = parseFloat(r.amount) || 0;
      sums[m] = (sums[m] || 0) + v;
      if (/fcp|t\\s*51/i.test(r.line || '')) t51[m] = (t51[m] || 0) + v;
    });
    var n = 0;
    MONTH_KEYS.forEach(function(m){
      var el = document.getElementById('ly-day-' + m), et = document.getElementById('ly-t51-' + m);
      if (el && sums[m] > 0) { el.value = Math.round(sums[m] * 100) / 100; n++; }
      if (et && t51[m] > 0) et.value = Math.round(t51[m] * 100) / 100;
    });
    updateLastYearTotals();
    toast(n ? 'Filled ' + n + ' months. Press Save to keep them.' : 'No ' + LY + ' sales found in Accounting', n ? 'success' : 'error');
  }).catch(function(){ toast('Could not read Accounting', 'error'); });
}
function saveBudgets() {
  var db = getDB();
  var b = db.budgets;
  var LY = String(new Date().getFullYear() - 1), lyObj = { day:{}, t51:{}, surf:{} }, anyLy = false;
  MONTH_KEYS.forEach(function(m){ ['day','t51','surf'].forEach(function(k){
    var el = document.getElementById('ly-' + k + '-' + m); if (!el) return;
    var v = accNum(el.value) || 0; if (v > 0) { lyObj[k][m] = Math.round(v * 100) / 100; anyLy = true; }
  }); });
  if (document.getElementById('ly-day-01')) { b.lastYear = b.lastYear || {}; if (anyLy) b.lastYear[LY] = lyObj; else delete b.lastYear[LY]; }
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
  var secCard = document.getElementById('secure-login-card');
  if (secCard) { secCard.style.display = isAdmin ? '' : 'none'; if (isAdmin) { renderSecureCard(); loadAuthStatus().then(renderSecureCard); } }
  renderImpCard();
  if (!isAdmin) {
    settingsLocked.style.display = 'flex';
    settingsContent.style.display = 'none';
    return;
  }
  settingsLocked.style.display = 'none';
  settingsContent.style.display = 'block';
  renderAreasEditor();

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
  renderLastYearTable(db);
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
    if (sbMissingItems.length === 0 || sbDenied || isSecure()) {
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
  if (tab === 'records' && !isAdmin) tab = 'entry';
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
  // Records (history, charts, budgets) are for admins; finance users keep the daily entry
  var recTab = document.getElementById('fin-tab-records'); if (recTab) recTab.style.display = isAdmin ? '' : 'none';
  if (!isAdmin && currentFinTab === 'records') switchFinTab('entry');
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
                    'fin-gen-expenses','fin-cash-notes','fin-coins','fin-surf','fin-day-notes'];

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
  document.getElementById('fin-day-notes').value = entry.dayNotes || '';
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
    dayNotes: (document.getElementById('fin-day-notes').value || '').trim(),
    savedAt: new Date().toISOString()
  };
  if (idx !== -1) { db.finEntries[idx] = entry; } else { db.finEntries.unshift(entry); }
  saveDB(db);
  finEditMode = false; // re-lock after save
  toast('Daily finance entry saved!', 'gold');
  updateFinDayTotal();
  applyFinLockState(saveDate);
  var finRow = { id: entry.id, date: entry.date, t51: entry.t51, multibanco: entry.multibanco,
      total_day: entry.totalDay, invoiced: entry.invoiced,
      gen_expenses: entry.genExpenses, tips: entry.tips,
      entregar: entry.entregar, cash_notes: entry.cashNotes,
      coins: entry.coins, surf: entry.surf,
      saved_at: entry.savedAt };
  // day notes only once the column exists (the SQL adds it); otherwise the whole save would be refused
  if (sbCols.finNotes) finRow.day_notes = entry.dayNotes;
  else if (entry.dayNotes) setTimeout(function(){ toast('Saved, but the notes need the latest SQL in Supabase to be kept', 'error'); }, 1200);
  sbFetch(idx !== -1 ? 'PATCH' : 'POST', 'fin_entries', finRow,
    idx !== -1 ? 'id=eq.'+entry.id : null
  ).catch(function(){ /* saved locally */ });
}

function clearFinanceFields() {
  ['fin-t51','fin-multibanco','fin-invoiced','fin-tips','fin-gen-expenses','fin-cash-notes','fin-coins','fin-surf','fin-day-notes'].forEach(function(id){
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
// Last year's figure for one line and month: typed in Settings → Finance Budgets (Last year),
// otherwise the sum of that year's daily closes. null = nothing known.
function finLastYear(db, line, year, mKey) {
  var ly = ((db.budgets || {}).lastYear || {})[String(year)] || {};
  var typed = ly[line] && parseFloat(ly[line][mKey]);
  if (typed > 0) return typed;
  var ym = year + '-' + mKey, sum = 0, any = false, f = line === 'day' ? 'totalDay' : line;
  (db.finEntries || []).forEach(function(e){ if (e.date && e.date.slice(0, 7) === ym) { sum += (e[f] || 0); any = true; } });
  return any ? sum : null;
}
function finPctTxt(a, b) { var p = (a - b) / b * 100; return (p >= 0 ? '+' : '') + p.toFixed(1) + '%'; }
// Card lines. This month: how far the month is against the same month last year.
// Year to date: complete months only, against the same months last year.
function finLyLines(db, line, yearStr, curMon, monthTotal, idMonth, idYear) {
  var year = +yearStr, lyYear = year - 1, cur = +curMon;
  var mEl = document.getElementById(idMonth), yEl = document.getElementById(idYear);
  var lyMonth = finLastYear(db, line, lyYear, curMon);
  if (mEl) mEl.innerHTML = lyMonth > 0 ? '<span class="fin-ly-dot"></span>' + Math.round(monthTotal / lyMonth * 100) + '% of ' + MONTH_NAMES[cur - 1] + ' ' + lyYear + ' <span class="fin-ly-sub">(' + fmtEurShort(lyMonth) + ')</span>' : '';
  if (!yEl) return;
  var thisY = 0, lastY = 0, first = null, last = null, f = line === 'day' ? 'totalDay' : line;
  for (var m = 1; m < cur; m++) {
    var mk = String(m).padStart(2, '0'), ly = finLastYear(db, line, lyYear, mk);
    var ym = yearStr + '-' + mk, t = 0, any = false;
    (db.finEntries || []).forEach(function(e){ if (e.date && e.date.slice(0, 7) === ym) { t += (e[f] || 0); any = true; } });
    if (!(ly > 0) || !any) continue;
    thisY += t; lastY += ly; if (first === null) first = m; last = m;
  }
  if (!(lastY > 0)) { yEl.innerHTML = ''; return; }
  var up = thisY >= lastY;
  yEl.innerHTML = '<span class="fin-ly-dot"></span><b class="' + (up ? 'pos' : 'neg') + '">' + finPctTxt(thisY, lastY) + '</b> vs ' + lyYear + ' <span class="fin-ly-sub">(' + MONTH_NAMES[first - 1] + (last !== first ? '–' + MONTH_NAMES[last - 1] : '') + ')</span>';
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
    var lastYear = MONTH_KEYS.map(function(m){ return finLastYear(db, line, +yearStr - 1, m) || 0; });
    el._finChart = { line: line, year: yearStr, curMon: curMon, actual: actual[line], budget: budget, lastYear: lastYear, hasData: hasData[line] };
    drawFinYearChart(el);
  });
}
function drawFinYearChart(el) {
  var d = el._finChart; if (!d) return;
  var W = Math.max(280, Math.floor(el.clientWidth || 0)); if (!el.clientWidth) W = 600;
  var H = 150, padL = 40, padR = 6, padT = 16, padB = 22;
  var plotW = W - padL - padR, plotH = H - padT - padB;
  var maxV = 0; d.actual.forEach(function(v){ if (v > maxV) maxV = v; }); d.budget.forEach(function(v){ if (v > maxV) maxV = v; });
  var lyArr = d.lastYear || []; lyArr.forEach(function(v){ if (v > maxV) maxV = v; }); var hasLy = lyArr.some(function(v){ return v > 0; });
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
    var lyv = lyArr[i] || 0;
    var tip = MONTH_NAMES[i] + ' ' + d.year + ': actual ' + fmtEur(a) + (b > 0 ? ' · budget ' + fmtEur(b) + ' (' + (diff >= 0 ? '+' : '') + diff + '%)' : ' · no budget')
      + (lyv > 0 ? ' · last year ' + fmtEur(lyv) + (d.hasData[i] && a > 0 ? ' (' + finPctTxt(a, lyv) + ')' : '') : '');
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
  // last year: one gold line across the months, broken where a month has no figure
  if (hasLy) {
    var lyPath = '', pen = false, lyPts = '';
    for (var li = 0; li < 12; li++) {
      var lv = lyArr[li] || 0, lx = padL + band * li + band / 2;
      if (lv > 0) { lyPath += (pen ? ' L' : 'M') + lx.toFixed(1) + ' ' + y(lv).toFixed(1); pen = true; lyPts += '<circle class="fc-ly-pt" cx="' + lx.toFixed(1) + '" cy="' + y(lv).toFixed(1) + '" r="2.5"/>'; }
      else pen = false;
    }
    svg += '<path class="fc-ly-line" d="' + lyPath + '"/>' + lyPts;
  }
  svg += '</svg>';
  var rows = ''; var totA = 0, totB = 0, totL = 0, totLA = 0;
  for (var j = 0; j < 12; j++) {
    var a2 = d.actual[j], b2 = d.budget[j], l2 = lyArr[j] || 0; totA += a2; totB += b2; totL += l2;
    if (l2 > 0 && d.hasData[j]) totLA += a2;
    var df = (d.hasData[j] && b2 > 0) ? a2 - b2 : null;
    var lyCells = hasLy ? '<td>' + (l2 > 0 ? fmtEur(l2) : '—') + '</td><td class="' + (l2 > 0 && d.hasData[j] ? (a2 < l2 ? 'neg' : 'pos') : '') + '">' + (l2 > 0 && d.hasData[j] ? finPctTxt(a2, l2) : '—') + '</td>' : '';
    rows += '<tr' + (j === curIdx ? ' class="now"' : '') + '><td>' + MONTH_NAMES[j] + '</td><td>' + (d.hasData[j] ? fmtEur(a2) : '—') + '</td><td>' + (b2 > 0 ? fmtEur(b2) : '—') + '</td><td class="' + (df === null ? '' : df < 0 ? 'neg' : 'pos') + '">' + (df === null ? '—' : (df >= 0 ? '+' : '−') + fmtEur(Math.abs(df))) + '</td>' + lyCells + '</tr>';
  }
  // year comparison: complete months only (the running month is left out, as on the cards)
  var nowY = String(new Date().getFullYear()) === String(d.year), totLyMatched = 0; totLA = 0;
  for (var k2 = 0; k2 < 12; k2++) if ((lyArr[k2] || 0) > 0 && d.hasData[k2] && !(nowY && k2 >= curIdx)) { totLyMatched += lyArr[k2]; totLA += d.actual[k2]; }
  rows += '<tr><td><b>Year</b></td><td><b>' + fmtEur(totA) + '</b></td><td><b>' + fmtEur(totB) + '</b></td><td class="' + (totA - totB < 0 ? 'neg' : 'pos') + '"><b>' + (totA - totB >= 0 ? '+' : '−') + fmtEur(Math.abs(totA - totB)) + '</b></td>'
    + (hasLy ? '<td><b>' + fmtEur(totL) + '</b></td><td class="' + (totLA < totLyMatched ? 'neg' : 'pos') + '"><b>' + (totLyMatched > 0 ? finPctTxt(totLA, totLyMatched) : '—') + '</b></td>' : '') + '</tr>';
  el.innerHTML = '<div class="fin-chart-head"><div class="fin-chart-title">' + d.year + ' · budget vs actual</div>'
    + '<div class="fin-chart-legend"><span><i class="sw-bar"></i>Actual</span><span><i class="sw-line"></i>Budget</span>' + (hasLy ? '<span><i class="sw-ly"></i>' + (+d.year - 1) + '</span>' : '') + '</div></div>'
    + '<div class="fc-wrap">' + svg + '<div class="fc-tip" aria-hidden="true"></div></div>'
    + '<details><summary><i class="fas fa-table"></i> Monthly table</summary><table><thead><tr><th>Month</th><th>Actual</th><th>Budget</th><th>Diff</th>' + (hasLy ? '<th>' + (+d.year - 1) + '</th><th>vs ' + (+d.year - 1) + '</th>' : '') + '</tr></thead><tbody>' + rows + '</tbody></table></details>';
  // hover / focus tooltip (title carries the same text for assistive tech)
  var tipEl = el.querySelector('.fc-tip'), wrap = el.querySelector('.fc-wrap');
  el.querySelectorAll('.fc-month-g').forEach(function(g){
    var show = function(){
      var i = parseInt(g.getAttribute('data-i'), 10), a = d.actual[i], b = d.budget[i];
      var pct = b > 0 ? Math.round((a - b) / b * 100) : null;
      var lv = lyArr[i] || 0;
      tipEl.innerHTML = '<b>' + MONTH_NAMES[i] + '</b> actual ' + fmtEur(a) + (b > 0 ? '<br>budget ' + fmtEur(b) + ' · ' + (pct >= 0 ? '+' : '') + pct + '%' : '<br>no budget set')
        + (lv > 0 ? '<br>' + (+d.year - 1) + ' ' + fmtEur(lv) + (d.hasData[i] && a > 0 ? ' · ' + finPctTxt(a, lv) : '') : '');
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
  if (!isAdmin) return;
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
  finLyLines(db, 'day',  yearStr, curMon, dayMonth,  'fin-stat-day-month-ly',  'fin-stat-day-year-ly');
  finLyLines(db, 't51',  yearStr, curMon, t51Month,  'fin-stat-t51-month-ly',  'fin-stat-t51-year-ly');
  finLyLines(db, 'surf', yearStr, curMon, surfMonth, 'fin-stat-surf-month-ly', 'fin-stat-surf-year-ly');

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
      +(e.dayNotes ? '<div class="fin-day-note"><i class="fas fa-note-sticky"></i> '+esc(e.dayNotes)+'</div>' : '')
    +'</div>';
  }).join('');
}

// ================================================
// INVENTORY
// ================================================
var catIconMap={beverages:'<i class="fas fa-martini-glass-citrus"></i>',food:'<i class="fas fa-utensils"></i>',supplies:'<i class="fas fa-broom"></i>',equipment:'<i class="fas fa-screwdriver-wrench"></i>',other:'<i class="fas fa-box"></i>'};
var catLabelMap={beverages:'Bar',food:'Cozinha',supplies:'Limpeza',equipment:'Economato',other:'Other'};
var currentInvTab = 'stock';
function switchInvTab(t) {
  currentInvTab = t;
  ['stock','log','orders','shop'].forEach(function(x){
    document.getElementById('inv-tab-'+x).classList.toggle('active',x===t);
    document.getElementById('inv-panel-'+x).style.display=x===t?'block':'none';
  });
  var cartBtn=document.getElementById('btn-open-order'); if(cartBtn) cartBtn.style.display=t==='shop'?'none':'';
  if(t==='stock') { renderSuppliers(); renderInventory(); }
  if(t==='log') { renderInvLogSupplierFilter(); renderInvLog(); }
  if(t==='orders') renderOrderHistory();
  if(t==='shop') renderShopList();
  refreshSection('inventory');
}

// ── Shopping list: extras outside the stock. Anyone adds; admins tick Approved and Bought ──
var shopFilter = 'open';
function shopFromRow(r) {
  return { id:r.id, name:r.name, link:r.link||'', price:r.price==null?null:parseFloat(r.price), notes:r.notes||'',
    requestedBy:r.requested_by||'', requestedById:r.requested_by_id||'', approved:!!r.approved, approvedBy:r.approved_by||'', approvedAt:r.approved_at||'',
    bought:!!r.bought, boughtBy:r.bought_by||'', boughtAt:r.bought_at||'', createdAt:r.created_at||'' };
}
function shopLoad() {
  return sbFetch('GET', 'shopping_items', null, 'order=created_at.desc').then(function(rows){
    var db = getDB(); sbCols.shop = true;
    db.shopItems = (rows || []).map(shopFromRow); saveDB(db);
  }).catch(function(){ sbCols.shop = false; }).then(function(){
    updateShopBadge();
    if (currentSection === 'inventory' && currentInvTab === 'shop') renderShopList();
  });
}
function shopItems() { return getDB().shopItems || []; }
function updateShopBadge() {
  var b = document.getElementById('shop-badge'); if (!b) return;
  // admins: items waiting for approval; everyone else: approved items still to buy
  var n = shopItems().filter(function(i){ return isAdmin ? !i.approved && !i.bought : i.approved && !i.bought; }).length;
  b.textContent = n; b.style.display = n ? '' : 'none';
}
function shopSafeLink(u) {
  u = String(u || '').trim(); if (!u) return '';
  if (!/^[a-z][a-z0-9+.-]*:/i.test(u)) u = 'https://' + u;
  return /^https?:\\/\\//i.test(u) ? u : '';
}
function shopLinkLabel(u) { try { return new URL(u).hostname.replace(/^www\\./, ''); } catch (e) { return 'Link'; } }
function shopDay(iso) { return iso ? fmtDateShort(String(iso).slice(0, 10)) : ''; }
function shopCanEdit(i) { return isAdmin || (!i.approved && !i.bought && currentUser && i.requestedById === currentUser.id); }
function renderShopList() {
  var el = document.getElementById('shop-list'); if (!el) return;
  var all = shopItems(), open = all.filter(function(i){ return !i.bought; }), bought = all.filter(function(i){ return i.bought; });
  var toBuy = open.filter(function(i){ return i.approved; }), toBuySum = toBuy.reduce(function(s, i){ return s + (i.price || 0); }, 0);
  var list = shopFilter === 'bought' ? bought : open;
  // waiting approval first, then approved; newest first inside each
  if (shopFilter !== 'bought') list = list.slice().sort(function(a, b){ return (a.approved - b.approved) || String(b.createdAt).localeCompare(String(a.createdAt)); });
  var h = '';
  if (sbCols.shop === false) h += '<div class="req-banner"><i class="fas fa-circle-info"></i> The shopping list switches on once the shopping list SQL has run in Supabase.</div>';
  h += '<div class="shop-toolbar"><div class="fc-switch" role="tablist">'
    + '<button class="' + (shopFilter !== 'bought' ? 'active' : '') + '" data-shop-filter="open">To buy <span>' + open.length + '</span></button>'
    + '<button class="' + (shopFilter === 'bought' ? 'active' : '') + '" data-shop-filter="bought">Bought <span>' + bought.length + '</span></button></div>'
    + (toBuy.length ? '<div class="shop-sum">Approved, still to buy: <b>' + toBuy.length + '</b>' + (toBuySum > 0 ? ' · <b>' + fmtEur(toBuySum) + '</b>' : '') + '</div>' : '')
    + '</div>';
  if (!list.length) {
    h += '<div class="empty-state"><i class="fas fa-bag-shopping"></i><p>' + (shopFilter === 'bought' ? 'Nothing bought yet.' : 'Nothing on the list. Tap Add for anything outside the stock that needs buying.') + '</p></div>';
    el.innerHTML = h; return;
  }
  h += list.map(function(i){
    var link = shopSafeLink(i.link), meta = [];
    if (i.price != null && !isNaN(i.price)) meta.push('<span class="shop-price">' + fmtEur(i.price) + '</span>');
    if (i.requestedBy) meta.push('added by ' + esc(i.requestedBy) + (i.createdAt ? ' · ' + shopDay(i.createdAt) : ''));
    if (i.bought) meta.push('bought' + (i.boughtBy ? ' by ' + esc(i.boughtBy) : '') + (i.boughtAt ? ' · ' + shopDay(i.boughtAt) : ''));
    else if (i.approved) meta.push('approved' + (i.approvedBy ? ' by ' + esc(i.approvedBy) : ''));
    var dis = isAdmin ? '' : ' disabled';
    return '<div class="shop-row' + (i.bought ? ' is-bought' : '') + '">'
      + '<div class="shop-main"><div class="shop-name">' + esc(i.name)
        + (!i.approved && !i.bought ? '<span class="shop-pill">Waiting approval</span>' : '')
        + (link ? '<a class="shop-link" href="' + esc(link) + '" target="_blank" rel="noopener noreferrer"><i class="fas fa-arrow-up-right-from-square"></i> ' + esc(shopLinkLabel(link)) + '</a>' : '') + '</div>'
        + '<div class="shop-meta">' + meta.join(' · ') + '</div>'
        + (i.notes ? '<div class="shop-meta">' + esc(i.notes) + '</div>' : '') + '</div>'
      + '<div class="shop-checks">'
        + '<button class="shop-check' + (i.approved ? ' on' : '') + '" data-shop-approve="' + esc(i.id) + '" aria-pressed="' + i.approved + '"' + dis + ' title="' + (isAdmin ? 'Approved: the person can buy it' : 'Only admins can approve') + '"><i class="fas ' + (i.approved ? 'fa-square-check' : 'fa-square') + '"></i>Approved</button>'
        + '<button class="shop-check' + (i.bought ? ' on' : '') + '" data-shop-bought="' + esc(i.id) + '" aria-pressed="' + i.bought + '"' + dis + ' title="' + (isAdmin ? 'Bought' : 'Only admins can mark it bought') + '"><i class="fas ' + (i.bought ? 'fa-square-check' : 'fa-square') + '"></i>Bought</button>'
      + '</div>'
      + (shopCanEdit(i) ? '<div class="shop-actions"><button class="btn btn-secondary btn-sm btn-icon" data-shop-edit="' + esc(i.id) + '" aria-label="Edit"><i class="fas fa-pen"></i></button>'
        + '<button class="btn btn-secondary btn-sm btn-icon" data-shop-delete="' + esc(i.id) + '" aria-label="Remove"><i class="fas fa-trash"></i></button></div>' : '')
      + '</div>';
  }).join('');
  el.innerHTML = h;
}
function openShopModal(id) {
  var i = id ? shopItems().find(function(x){ return x.id === id; }) : null;
  document.getElementById('shop-edit-id').value = i ? i.id : '';
  document.getElementById('shop-modal-title').textContent = i ? 'Edit item' : 'Add to Shopping List';
  document.getElementById('shop-name').value = i ? i.name : '';
  document.getElementById('shop-link').value = i ? i.link : '';
  document.getElementById('shop-price').value = i && i.price != null ? String(i.price).replace('.', ',') : '';
  document.getElementById('shop-notes').value = i ? i.notes : '';
  openModal('modal-shop-item');
  setTimeout(function(){ var n = document.getElementById('shop-name'); if (n) n.focus(); }, 50);
}
function adminUserIds() {
  return (getDB().appUsers || []).filter(function(u){ return u.active !== false && Array.isArray(u.roles) && u.roles.indexOf('admin') !== -1; }).map(function(u){ return u.id; });
}
function saveShopItem() {
  if (sbCols.shop === false) { toast('The shopping list is not switched on yet (SQL missing)', 'error'); return; }
  var id = document.getElementById('shop-edit-id').value;
  var name = document.getElementById('shop-name').value.trim();
  if (!name) { toast('Write what needs buying', 'error'); return; }
  var linkRaw = document.getElementById('shop-link').value.trim(), link = shopSafeLink(linkRaw);
  if (linkRaw && !link) { toast('That link doesn\u2019t look right', 'error'); return; }
  var pRaw = document.getElementById('shop-price').value.trim(), price = pRaw ? accNum(pRaw) : null;
  if (pRaw && (price === null || isNaN(price) || price < 0)) { toast('Price should be a number, e.g. 12,50', 'error'); return; }
  if (price != null) price = Math.round(price * 100) / 100;
  var notes = document.getElementById('shop-notes').value.trim();
  var db = getDB(); db.shopItems = db.shopItems || [];
  var row = { name:name, link:link, price:price, notes:notes };
  if (id) {
    var cur = db.shopItems.find(function(x){ return x.id === id; }); if (!cur) return;
    sbFetch('PATCH', 'shopping_items', row, 'id=eq.' + encodeURIComponent(id)).then(function(rows){
      if (rows && rows[0]) Object.assign(cur, shopFromRow(rows[0])); else Object.assign(cur, { name:name, link:link, price:price, notes:notes });
      saveDB(db); closeModal('modal-shop-item'); renderShopList(); toast('Saved', 'success');
    }).catch(function(){ toast('Not saved. Check the connection.', 'error'); });
    return;
  }
  row.id = uid(); row.requested_by = currentUser ? currentUser.name : ''; row.requested_by_id = currentUser ? currentUser.id : '';
  sbFetch('POST', 'shopping_items', row).then(function(rows){
    db = getDB(); db.shopItems = db.shopItems || [];
    db.shopItems.unshift(shopFromRow(rows && rows[0] ? rows[0] : Object.assign({ created_at:new Date().toISOString() }, row)));
    saveDB(db); closeModal('modal-shop-item'); shopFilter = 'open'; renderShopList(); updateShopBadge();
    toast(isAdmin ? 'Added to the shopping list' : 'Added. An admin will approve it.', 'success');
    if (!isAdmin) sendPush(adminUserIds(), 'Shopping list: ' + name, (row.requested_by ? row.requested_by + ' added it' : 'New item') + (price != null ? ' · ' + fmtEur(price) : '') + '. Needs approval.', '/?open=shopping');
  }).catch(function(){ toast('Not saved. Check the connection.', 'error'); });
}
function setShopFlag(id, flag) {
  if (!isAdmin) { toast('Only admins can tick this', 'error'); return; }
  var db = getDB(), i = (db.shopItems || []).find(function(x){ return x.id === id; }); if (!i) return;
  var who = currentUser ? currentUser.name : '', now = new Date().toISOString(), patch;
  if (flag === 'approved') {
    var on = !i.approved;
    if (!on && i.bought) { toast('Untick Bought first', 'error'); return; }
    patch = { approved:on, approved_by:on ? who : '', approved_at:on ? now : null };
  } else {
    var onB = !i.bought;
    patch = { bought:onB, bought_by:onB ? who : '', bought_at:onB ? now : null };
    // buying something counts as approving it
    if (onB && !i.approved) { patch.approved = true; patch.approved_by = who; patch.approved_at = now; }
  }
  sbFetch('PATCH', 'shopping_items', patch, 'id=eq.' + encodeURIComponent(id)).then(function(rows){
    var wasApproved = i.approved;
    Object.assign(i, rows && rows[0] ? shopFromRow(rows[0]) : shopFromRow(Object.assign({}, { id:i.id, name:i.name, link:i.link, price:i.price, notes:i.notes, requested_by:i.requestedBy, requested_by_id:i.requestedById, approved:i.approved, approved_by:i.approvedBy, approved_at:i.approvedAt, bought:i.bought, bought_by:i.boughtBy, bought_at:i.boughtAt, created_at:i.createdAt }, patch)));
    saveDB(db); renderShopList(); updateShopBadge();
    if (flag === 'approved' && i.approved && !wasApproved && i.requestedById) sendPush([i.requestedById], 'Approved: ' + i.name, 'You can buy it' + (i.price != null ? ' (' + fmtEur(i.price) + ')' : '') + '.', '/?open=shopping');
  }).catch(function(){ toast('Not saved. Check the connection.', 'error'); });
}
function deleteShopItem(id) {
  var db = getDB(), i = (db.shopItems || []).find(function(x){ return x.id === id; }); if (!i) return;
  if (!confirm('Remove \u201c' + i.name + '\u201d from the shopping list?')) return;
  sbFetch('DELETE', 'shopping_items', null, 'id=eq.' + encodeURIComponent(id)).then(function(){
    db = getDB(); db.shopItems = (db.shopItems || []).filter(function(x){ return x.id !== id; });
    saveDB(db); renderShopList(); updateShopBadge(); toast('Removed');
  }).catch(function(){ toast('Not removed. Check the connection.', 'error'); });
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
    document.getElementById('supplier-nif').value=s.nif||'';
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
    document.getElementById('supplier-nif').value='';
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
  var nif=(document.getElementById('supplier-nif').value||'').replace(/[^0-9]/g,'');
  if(nif&&nif.length!==9){toast('A NIF has 9 digits','error');return;}
  var sendEmail=document.getElementById('supplier-send-email').checked;
  var cats=[];
  document.querySelectorAll('.supplier-cat-cb').forEach(function(cb){ if(cb.checked) cats.push(cb.value); });
  var db=getDB(); var now=new Date().toISOString();
  if(editSupplierId){
    var idx=db.suppliers.findIndex(function(s){return s.id===editSupplierId;});
    if(idx!==-1) db.suppliers[idx]=Object.assign({},db.suppliers[idx],{name:name,email:email,phone:phone,nif:nif,sendEmail:sendEmail,categories:cats});
    saveDB(db); closeModal('modal-add-supplier'); renderSuppliers(); updateAllDropdowns(); toast('Updating...'); 
    sbFetch('PATCH','suppliers',{name:name,email:email,phone:phone,nif:nif,send_email:sendEmail,categories:cats},'id=eq.'+editSupplierId)
      .then(function(){toast('Supplier updated!');}).catch(function(){toast('Saved locally','error');});
    editSupplierId=null;
  } else {
    var newId=uid();
    db.suppliers.push({id:newId,name:name,email:email,phone:phone,nif:nif,sendEmail:sendEmail,categories:cats,totalSpend:0,createdAt:now});
    saveDB(db); closeModal('modal-add-supplier'); renderSuppliers(); updateAllDropdowns(); toast('Adding...');
    sbFetch('POST','suppliers',{id:newId,name:name,email:email,phone:phone,nif:nif,send_email:sendEmail,categories:cats,total_spend:0})
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
// ── Calendar (one view): events, reservations, task deadlines and your own shifts ──
var calvMonth = (function(){ var d = new Date(); return new Date(d.getFullYear(), d.getMonth(), 1); })();
var calvSel = toDateStr(new Date());
var calvShifts = null;   // this person's shifts around the month shown (null until loaded)
var CALV_TYPES = [
  { key:'events', label:'Events', color:'#b7791f' },
  { key:'res',    label:'Reservations', color:'#2f6fa8' },
  { key:'tasks',  label:'Task deadlines', color:'#b4402f' },
  { key:'shifts', label:'My shifts', color:'#5f7079' }
];
var calvOn = (function(){ try { var v = JSON.parse(localStorage.getItem('bp_calv_filters') || 'null'); if (v && typeof v === 'object') return v; } catch (e) {} return { events:true, res:true, tasks:true, shifts:true }; })();
function calvSaveFilters() { try { localStorage.setItem('bp_calv_filters', JSON.stringify(calvOn)); } catch (e) {} }
function resFromRow(x) { return {id:x.id,guestName:x.guest_name,phone:x.phone||'',date:x.date,time:x.time?x.time.slice(0,5):'',endTime:x.end_time?x.end_time.slice(0,5):'',guests:x.guests,tables:x.tables||[],notes:x.notes||'',status:x.status,createdAt:x.created_at}; }
function taskFromRow(x) { var a=x.assigned_to||[]; if(typeof a==='string'){try{a=JSON.parse(a);}catch(e){a=a?[a]:[];}} if(!Array.isArray(a))a=[]; return {id:x.id,title:x.title,description:x.description||'',category:x.category,priority:x.priority,status:x.status,assignedTo:a,deadline:x.deadline||'',doneAt:x.done_at||'',createdAt:x.created_at,recurrence:x.recurrence||''}; }
function calvRange() {
  var first = new Date(calvMonth), start = getMonday(first);
  var last = new Date(calvMonth.getFullYear(), calvMonth.getMonth() + 1, 0);
  var end = new Date(last); end.setDate(end.getDate() + (7 - (end.getDay() || 7)));
  return { start:start, end:end };
}
function calvLoad() {
  var r = calvRange(), emp = myEmployee();
  var shiftsReq = emp ? sbFetch('GET', 'shifts', null, 'employee=eq.' + encodeURIComponent(emp) + '&week_start=gte.' + toDateStr(r.start) + '&week_start=lte.' + toDateStr(r.end)) : Promise.resolve([]);
  Promise.all([
    sbFetch('GET', 'reservations', null, 'order=date.asc,time.asc').catch(function(){ return null; }),
    sbFetch('GET', 'tasks', null, 'order=created_at.desc').catch(function(){ return null; }),
    shiftsReq.catch(function(){ return null; }),
    evLoad()
  ]).then(function(res){
    var db = getDB();
    if (res[0]) { db.reservations = res[0].map(resFromRow); if (res[0].length) sbCols.resEnd = ('end_time' in res[0][0]); }
    if (res[1]) db.tasks = res[1].map(taskFromRow);
    if (res[2]) calvShifts = res[2].map(function(x){ return { employee:x.employee, day:x.day, weekStart:x.week_start, start:x.start_time ? x.start_time.slice(0,5) : '', end:x.end_time ? x.end_time.slice(0,5) : '', zone:x.zone || '', section:x.section || '', dayOff:!!x.day_off }; });
    saveDB(db);
    if (currentSection === 'calendar') renderCalView();
  });
}
// Everything on one date, in the order it happens (all-day first)
function calvItems(dateStr) {
  var db = getDB(), out = [];
  if (calvOn.events) evOnDay(dateStr).forEach(function(e){
    var k = EV_KINDS[e.kind] || EV_KINDS.other, who = evPeopleLabel(e);
    out.push({ sort:e.allDay ? '00:00' : e.start, time:e.allDay ? 'All day' : evWhen(e), type:k.label + (evIncludesMe(e) ? ' · you' : ''), color:'#b7791f',
      title:e.title, sub:[who, e.notes].filter(Boolean).join(' · '), chip:(e.allDay ? '' : e.start + ' ') + e.title, attr:'data-open-event="' + esc(e.id) + '"' });
  });
  if (calvOn.res) (db.reservations || []).filter(function(r){ return r.date === dateStr; }).forEach(function(r){
    var tables = Array.isArray(r.tables) ? r.tables.join(', ') : (r.table || '');
    out.push({ sort:r.time || '99', time:r.time + (r.endTime ? '–' + r.endTime : ''), type:'Reservation' + (r.status ? ' · ' + r.status : ''), color:'#2f6fa8',
      title:r.guestName + ' (' + r.guests + ')', sub:[tables ? 'Table ' + tables : '', r.notes].filter(Boolean).join(' · '), chip:r.time + ' ' + r.guestName, attr:'data-open-res-detail="' + esc(r.id) + '"' });
  });
  if (calvOn.tasks) (db.tasks || []).filter(function(t){
    return t.deadline && String(t.deadline).slice(0, 10) === dateStr && (isAdmin || (currentUser && taskAssignees(t).indexOf(currentUser.id) !== -1));
  }).forEach(function(t){
    var names = assigneeNames(taskAssignees(t));
    out.push({ sort:'00:01', time:'Due', type:'Task deadline' + (t.status === 'done' ? ' · done' : ''), color:'#b4402f', done:t.status === 'done',
      title:t.title, sub:names.length ? names.join(', ') : '', chip:'Due: ' + t.title, attr:'data-calv-goto="tasks"' });
  });
  if (calvOn.shifts) {
    var emp = myEmployee();
    var mine = calvShifts || (db.shifts || []).filter(function(s){ return s.employee === emp; });
    mine.forEach(function(s){
      if (s.dayOff || !s.start) return;
      var d = new Date(s.weekStart + 'T12:00:00'); d.setDate(d.getDate() + DAYS.indexOf(s.day));
      if (toDateStr(d) !== dateStr) return;
      out.push({ sort:s.start, time:s.start + (s.end ? '–' + s.end : ''), type:'Your shift', color:'#5f7079',
        title:[s.zone, s.section].filter(Boolean).join(' · ') || 'Shift', sub:'', chip:s.start + ' Your shift', attr:'data-calv-goto="shifts"' });
    });
  }
  return out.sort(function(a, b){ return String(a.sort).localeCompare(String(b.sort)); });
}
function calvGoTo(dateStr) {
  calvSel = dateStr;
  var d = new Date(dateStr + 'T12:00:00'), m = new Date(d.getFullYear(), d.getMonth(), 1);
  var changed = m.getTime() !== calvMonth.getTime(); calvMonth = m;
  renderCalView(); if (changed) calvLoad();
}
function renderCalView() {
  var grid = document.getElementById('calv-grid'); if (!grid) return;
  var lbl = document.getElementById('calv-month-label');
  if (lbl) lbl.textContent = calvMonth.toLocaleDateString('en-GB', { month:'long', year:'numeric' });
  var addBtn = document.getElementById('btn-add-event'); if (addBtn) addBtn.style.display = canManageEvents() ? '' : 'none';
  var dayAdd = document.getElementById('calv-day-add'); if (dayAdd) dayAdd.style.display = canManageEvents() ? '' : 'none';
  document.getElementById('calv-filters').innerHTML = CALV_TYPES.map(function(t){
    return '<button class="calv-filter' + (calvOn[t.key] ? ' on' : '') + '" data-calv-filter="' + t.key + '" aria-pressed="' + !!calvOn[t.key] + '"><i class="sw" style="background:' + t.color + '"></i>' + t.label + '</button>';
  }).join('');
  var r = calvRange(), today = toDateStr(new Date()), html = '';
  for (var d = new Date(r.start); d <= r.end; d.setDate(d.getDate() + 1)) {
    var ds = toDateStr(d), items = calvItems(ds), out = d.getMonth() !== calvMonth.getMonth();
    var colors = []; items.forEach(function(it){ if (colors.indexOf(it.color) === -1) colors.push(it.color); });
    html += '<button class="calv-cell' + (out ? ' out' : '') + (ds === today ? ' today' : '') + (ds === calvSel ? ' sel' : '') + '" data-calv-day="' + ds + '" aria-label="' + esc(d.toLocaleDateString('en-GB', { weekday:'long', day:'numeric', month:'long' })) + (items.length ? ', ' + items.length + ' item' + (items.length === 1 ? '' : 's') : '') + '">'
      + '<span class="calv-num">' + d.getDate() + '</span>'
      + (colors.length ? '<span class="calv-dots">' + colors.slice(0, 4).map(function(c){ return '<i style="background:' + c + '"></i>'; }).join('') + '</span>' : '')
      + (items.length ? '<span class="calv-chips">' + items.slice(0, 3).map(function(it){ return '<span class="calv-chip" style="border-left-color:' + it.color + '">' + esc(it.chip) + '</span>'; }).join('')
        + (items.length > 3 ? '<span class="calv-more">+' + (items.length - 3) + ' more</span>' : '') + '</span>' : '')
      + '</button>';
  }
  grid.innerHTML = html;
  renderCalAgenda();
}
function renderCalAgenda() {
  var el = document.getElementById('calv-agenda'); if (!el) return;
  var d = new Date(calvSel + 'T12:00:00');
  document.getElementById('calv-day-label').textContent = d.toLocaleDateString('en-GB', { weekday:'long', day:'numeric', month:'long' });
  var items = calvItems(calvSel);
  var note = sbCols.events === false ? '<div class="req-banner" style="margin-bottom:10px"><i class="fas fa-circle-info"></i> Events switch on once the calendar SQL has run in Supabase.</div>' : '';
  if (!items.length) { el.innerHTML = note + '<div class="empty-state" style="padding:16px"><i class="fas fa-calendar"></i><p>Nothing on this day.</p></div>'; return; }
  el.innerHTML = note + items.map(function(it){
    return '<button class="calv-item' + (it.done ? ' done' : '') + '" style="border-left-color:' + it.color + '" ' + it.attr + '>'
      + '<span class="calv-time">' + esc(it.time) + '</span>'
      + '<span class="calv-item-main"><span class="calv-item-type" style="display:block;color:' + it.color + '">' + esc(it.type) + '</span>'
      + '<span class="calv-item-title" style="display:block">' + esc(it.title) + '</span>'
      + (it.sub ? '<span class="calv-item-sub" style="display:block">' + esc(it.sub) + '</span>' : '') + '</span></button>';
  }).join('');
}

// ── Calendar events: meetings, opening-hours changes… (admins and shift managers manage them) ──
var EV_KINDS = { meeting:{ label:'Meeting', icon:'fa-people-group' }, hours:{ label:'Opening hours', icon:'fa-store' }, event:{ label:'Event', icon:'fa-star' }, other:{ label:'Other', icon:'fa-thumbtack' } };
var evPicked = [];
function canManageEvents() { return isAdmin || hasRole('shift_mgr'); }
function evFromRow(r) {
  return { id:r.id, kind:r.kind||'meeting', title:r.title||'', date:r.date, allDay:!!r.all_day, start:(r.start_time||'').slice(0,5), end:(r.end_time||'').slice(0,5),
    everyone:!!r.everyone, attendees:Array.isArray(r.attendees)?r.attendees:[], notes:r.notes||'', createdBy:r.created_by||'', createdById:r.created_by_id||'', updatedAt:r.updated_at||'' };
}
function evToRow(e) {
  return { id:e.id, kind:e.kind, title:e.title, date:e.date, all_day:e.allDay, start_time:e.allDay?'':e.start, end_time:e.allDay?'':e.end,
    everyone:e.everyone, attendees:e.attendees, notes:e.notes, created_by:e.createdBy, created_by_id:e.createdById, updated_at:new Date().toISOString() };
}
function evLoad() {
  return sbFetch('GET', 'cal_events', null, 'order=date.asc').then(function(rows){
    var db = getDB(); sbCols.events = true; db.calEvents = (rows || []).map(evFromRow); saveDB(db);
  }).catch(function(){ sbCols.events = false; }).then(function(){
    var b = document.getElementById('btn-add-event'); if (b) b.style.display = canManageEvents() ? '' : 'none';
    if (currentSection === 'calendar') renderCalView();
  });
}
function evOnDay(dateStr) {
  return (getDB().calEvents || []).filter(function(e){ return e.date === dateStr; })
    .sort(function(a, b){ return (b.allDay - a.allDay) || String(a.start).localeCompare(String(b.start)); });
}
function evWhen(e) { return e.allDay ? 'All day' : (e.start + (e.end ? '–' + e.end : '')); }
function evIncludesMe(e) { return !!currentUser && (e.everyone || e.attendees.indexOf(currentUser.id) !== -1); }
function evPeopleLabel(e) {
  if (e.everyone) return 'Everyone';
  var users = getDB().appUsers || [];
  var names = e.attendees.map(function(id){ var u = users.find(function(x){ return x.id === id; }); return u ? u.name.split(' ')[0] : null; }).filter(Boolean);
  if (!names.length) return '';
  return names.length <= 4 ? names.join(', ') : names.slice(0, 3).join(', ') + ' +' + (names.length - 3);
}
function evRenderPeople() {
  var box = document.getElementById('ev-people'); if (!box) return;
  var users = (getDB().appUsers || []).filter(function(u){ return u.active !== false && u.id !== 'admin_seed'; })
    .sort(function(a, b){ return a.name.localeCompare(b.name); });
  var every = document.getElementById('ev-everyone').checked;
  box.classList.toggle('is-off', every);
  box.innerHTML = users.map(function(u){
    var on = evPicked.indexOf(u.id) !== -1;
    return '<button type="button" class="ev-person' + (on ? ' on' : '') + '" data-ev-person="' + esc(u.id) + '" aria-pressed="' + on + '">' + esc(u.name) + '</button>';
  }).join('') || '<span class="ev-sub">No people found.</span>';
}
function evSyncTimes() { document.getElementById('ev-times').style.display = document.getElementById('ev-allday').checked ? 'none' : ''; }
function openEventModal(id, dateStr) {
  var e = id ? (getDB().calEvents || []).find(function(x){ return x.id === id; }) : null;
  var can = canManageEvents();
  if (!e && !can) return;
  if (!e && sbCols.events === false) { toast('Events switch on once the calendar SQL has run in Supabase', 'error'); return; }
  document.getElementById('ev-edit-id').value = e ? e.id : '';
  document.getElementById('ev-modal-title').textContent = e ? (can ? 'Edit event' : (EV_KINDS[e.kind] || EV_KINDS.other).label) : 'New event';
  document.getElementById('ev-kind').value = e ? e.kind : 'meeting';
  document.getElementById('ev-title').value = e ? e.title : '';
  document.getElementById('ev-date').value = e ? e.date : (dateStr || toDateStr(new Date()));
  document.getElementById('ev-allday').checked = e ? e.allDay : false;
  document.getElementById('ev-start').value = e ? e.start : '';
  document.getElementById('ev-end').value = e ? e.end : '';
  document.getElementById('ev-everyone').checked = e ? e.everyone : false;
  document.getElementById('ev-notes').value = e ? e.notes : '';
  evPicked = e ? e.attendees.slice() : [];
  evSyncTimes(); evRenderPeople();
  // people who cannot manage events see it read-only
  ['ev-kind','ev-title','ev-date','ev-allday','ev-start','ev-end','ev-everyone','ev-notes'].forEach(function(f){ document.getElementById(f).disabled = !can; });
  document.getElementById('ev-people').style.pointerEvents = can ? '' : 'none';
  document.getElementById('btn-save-event').style.display = can ? '' : 'none';
  document.getElementById('btn-delete-event').style.display = can && e ? '' : 'none';
  document.getElementById('ev-notify-note').style.display = can ? '' : 'none';
  openModal('modal-event');
}
function evRecipients(e) {
  if (e.everyone) return (getDB().appUsers || []).filter(function(u){ return u.active !== false && u.id !== 'admin_seed'; }).map(function(u){ return u.id; });
  return e.attendees.slice();
}
function evDayLabel(dateStr) { return fmtDateShort(dateStr); }
function evNotify(ids, title, e) {
  sendPush(ids, title, evDayLabel(e.date) + ' · ' + evWhen(e) + (e.notes ? ' · ' + e.notes : ''), '/?open=calendar&date=' + e.date);
}
function saveEvent() {
  if (!canManageEvents()) return;
  var id = document.getElementById('ev-edit-id').value;
  var title = document.getElementById('ev-title').value.trim();
  var date = document.getElementById('ev-date').value;
  var allDay = document.getElementById('ev-allday').checked;
  var start = document.getElementById('ev-start').value, end = document.getElementById('ev-end').value;
  var everyone = document.getElementById('ev-everyone').checked;
  if (!title) { toast('Give the event a title', 'error'); return; }
  if (!date) { toast('Pick a date', 'error'); return; }
  if (!allDay && !start) { toast('Add a start time, or tick All day', 'error'); return; }
  if (!allDay && end && end <= start) { toast('The end time is before the start', 'error'); return; }
  if (!everyone && !evPicked.length) { toast('Choose who is in it, or tick Everyone', 'error'); return; }
  var db = getDB(); db.calEvents = db.calEvents || [];
  var old = id ? db.calEvents.find(function(x){ return x.id === id; }) : null;
  var e = { id:id || uid(), kind:document.getElementById('ev-kind').value, title:title, date:date, allDay:allDay, start:allDay ? '' : start, end:allDay ? '' : end,
    everyone:everyone, attendees:everyone ? [] : evPicked.slice(), notes:document.getElementById('ev-notes').value.trim(),
    createdBy:old ? old.createdBy : (currentUser ? currentUser.name : ''), createdById:old ? old.createdById : (currentUser ? currentUser.id : '') };
  var btn = document.getElementById('btn-save-event'); btn.disabled = true;
  var req = old ? sbFetch('PATCH', 'cal_events', evToRow(e), 'id=eq.' + encodeURIComponent(e.id)) : sbFetch('POST', 'cal_events', evToRow(e));
  req.then(function(){
    btn.disabled = false;
    db = getDB(); db.calEvents = (db.calEvents || []).filter(function(x){ return x.id !== e.id; }).concat([e]); saveDB(db);
    closeModal('modal-event'); calvGoTo(e.date);
    var k = (EV_KINDS[e.kind] || EV_KINDS.other).label, now = evRecipients(e);
    if (!old) { evNotify(now, k + ': ' + e.title, e); toast('Event saved. ' + (now.length ? 'The people in it were notified.' : ''), 'success'); return; }
    var before = evRecipients(old), whenChanged = old.date !== e.date || old.allDay !== e.allDay || old.start !== e.start || old.end !== e.end || old.title !== e.title;
    var added = now.filter(function(x){ return before.indexOf(x) === -1; }), kept = now.filter(function(x){ return before.indexOf(x) !== -1; });
    var removed = before.filter(function(x){ return now.indexOf(x) === -1; });
    if (added.length) evNotify(added, k + ': ' + e.title, e);
    if (whenChanged && kept.length) evNotify(kept, 'Changed: ' + e.title, e);
    if (removed.length) sendPush(removed, 'No longer in: ' + old.title, evDayLabel(old.date) + ' · ' + evWhen(old), '/?open=calendar&date=' + old.date);
    toast('Event updated', 'success');
  }).catch(function(){ btn.disabled = false; toast('Not saved. Check the connection.', 'error'); });
}
function deleteEvent() {
  var id = document.getElementById('ev-edit-id').value; if (!id || !canManageEvents()) return;
  var db = getDB(), e = (db.calEvents || []).find(function(x){ return x.id === id; }); if (!e) return;
  if (!confirm('Delete \u201c' + e.title + '\u201d? The people in it get a cancellation notice.')) return;
  sbFetch('DELETE', 'cal_events', null, 'id=eq.' + encodeURIComponent(id)).then(function(){
    db = getDB(); db.calEvents = (db.calEvents || []).filter(function(x){ return x.id !== id; }); saveDB(db);
    closeModal('modal-event'); renderCalView();
    sendPush(evRecipients(e), 'Cancelled: ' + e.title, evDayLabel(e.date) + ' · ' + evWhen(e), '/?open=calendar&date=' + e.date);
    toast('Event deleted');
  }).catch(function(){ toast('Not deleted. Check the connection.', 'error'); });
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
      +'<div class="res-item-top"><div><span class="res-time">'+esc(r.time+(r.endTime?'–'+r.endTime:''))+'</span><span class="res-name">'+esc(r.guestName)+'</span></div>'
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
    +'<div class="detail-cell"><div class="detail-cell-label">Time</div><div class="detail-cell-val">'+esc(r.time+(r.endTime?' – '+r.endTime:''))+'</div></div>'
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
  document.getElementById('res-end').value='';
  document.getElementById('res-guests').value='2';
  document.getElementById('res-notes').value='';
  refreshResTableGrid();
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
  document.getElementById('res-end').value=r.endTime||'';
  document.getElementById('res-guests').value=r.guests;
  document.getElementById('res-notes').value=r.notes||'';
  refreshResTableGrid();
  openModal('modal-add-reservation');
}
function saveReservation(){
  var guestName=document.getElementById('res-guest-name').value.trim(); if(!guestName){toast('Guest name required!','error');return;}
  var date=document.getElementById('res-date').value; var time=document.getElementById('res-time').value;
  if(!date||!time){toast('Date and time required!','error');return;}
  if(selectedTables.length===0){toast('Select at least one table!','error');return;}
  var db=getDB(); var editId=document.getElementById('res-edit-id').value;
  var endTime=document.getElementById('res-end').value;
  if(endTime && endTime<=time && endTime>='06:00'){toast('The end time must be after the start','error');return;}
  var busy=busyTables(date,time,endTime,editId), clash=selectedTables.filter(function(t){return busy[t];});
  if(clash.length){ refreshResTableGrid(); toast(clash.map(function(t){return t+' is booked '+busy[t].label+' ('+busy[t].guest+')';}).join(' · '),'error'); return; }
  var prevRes=editId?(db.reservations.find(function(r){return r.id===editId;})||{}):{};
  var status=prevRes.status||'pending';
  var phone=document.getElementById('res-phone').value.trim();
  var guests=parseInt(document.getElementById('res-guests').value)||1;
  var notes=document.getElementById('res-notes').value.trim();
  var res={guestName:guestName,phone:phone,date:date,time:time,endTime:endTime,guests:guests,tables:selectedTables.slice(),notes:notes,status:status};
  var sbRes={guest_name:guestName,phone:phone,date:date,time:time,guests:guests,tables:selectedTables.slice(),notes:notes,status:status};
  if(sbCols.resEnd) sbRes.end_time=endTime||null;   // column added by the reservations migration
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
    notifyNewReservation(res);
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
      +'<div class="res-date-box"><div class="rdb-d">'+esc(r.date.slice(5))+'</div><div class="rdb-t">'+esc(r.time)+'</div>'+(r.endTime?'<div class="rdb-t" style="opacity:.7">–'+esc(r.endTime)+'</div>':'')+'</div>'
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
  var before=editId?(db.tasks.find(function(t){return t.id===editId;})||{}):{};
  var newlyAssigned=asn.filter(function(id){ return taskAssignees(before).indexOf(id)===-1; });
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
  // Push to the people this save assigns (not everyone again on every edit)
  if(newlyAssigned.length) sendTaskPush(title, newlyAssigned, dl, pri);
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
      sendTaskPush(newTask.title, asnArr, nextDl, newTask.priority);
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
// Areas and their sections (Settings → Areas & sections); used until the owner edits them
var DEFAULT_AREAS = [
  {name:'Kitchen',    sections:['Hot Food','Cold Food','Runner']},
  {name:'Service',    sections:['1-2-3','4-5-6','7-8 Apoio deck','Deck']},
  {name:'Bar',        sections:['Geral']},
  {name:'Dishes',     sections:['Geral']},
  {name:'Foccaceria', sections:['Geral']}
];
var sbCols = { section:false, areas:false, requests:false, userEmployee:false, weekNotices:false, resEnd:false, acc:false, accConfig:false, fc:false, shop:null, notif:false, finNotes:false, events:null, invoices:null };   // which new columns exist in Supabase (seen during sync)
function getAreas(db) { db = db || getDB(); return (db.areas && db.areas.length) ? db.areas : DEFAULT_AREAS; }
var EXTRA_AREA_COLORS = ['#6d5a93','#3f7d4f','#9a4f5c','#4a6b8a','#7d6a3a'];   // areas added in Settings
function areaColor(name) {
  if (ZONE_COLORS[name]) return ZONE_COLORS[name];
  if (!name) return '#5f7079';
  var h = 0; for (var i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) | 0;
  return EXTRA_AREA_COLORS[Math.abs(h) % EXTRA_AREA_COLORS.length];
}
function areaByName(name, areas) { return (areas||getAreas()).find(function(a){ return a.name === name; }); }
// A shift's section; an area with a single section needs none stored
function effectiveSection(s, areas) {
  if (s.section) return s.section;
  var a = areaByName(s.zone, areas); return (a && a.sections.length === 1) ? a.sections[0] : '';
}
function areaSectionOptionsHTML(areas) {
  return '<option value="">—</option>' + areas.map(function(a){
    return '<optgroup label="'+esc(a.name)+'">'
      + (a.sections.length > 1 ? '<option value="'+esc(a.name)+'|">'+esc(a.name)+' · no section</option>' : '')
      + a.sections.map(function(sec){ return '<option value="'+esc(a.name)+'|'+esc(sec)+'">'+esc(a.name + ' · ' + sec)+'</option>'; }).join('')
      + '</optgroup>';
  }).join('');
}
function fillZoneSelects() {
  var html = areaSectionOptionsHTML(getAreas());
  document.querySelectorAll('#shift-days-body .shift-day-zone').forEach(function(sel){ sel.innerHTML = html; });
}
function setZoneSelect(sel, zone, section) {
  if (!sel) return;
  var v = zone ? zone + '|' + (section || '') : '';
  if (v && !Array.prototype.some.call(sel.options, function(o){ return o.value === v; })) {
    var o = document.createElement('option'); o.value = v; o.textContent = zone + (section ? ' · ' + section : ''); sel.appendChild(o);
  }
  sel.value = v;
}
function readZoneSelect(sel) { var p = (sel && sel.value || '').split('|'); return { zone: p[0] || '', section: p[1] || '' }; }

// ── Settings: areas & sections editor ──
function saveAreas(areas) {
  var db = getDB(); db.areas = areas; saveDB(db);
  renderAreasEditor();
  if (!sbCols.areas) { toast('Saved on this device only. Run the step 9 SQL in Supabase.', 'error'); return; }
  sbFetch('PATCH','settings',{areas:areas},'id=eq.config').then(function(){ toast('Areas saved'); }).catch(function(){ toast('Not saved online. Check the connection.','error'); });
}
function renderAreasEditor() {
  var el = document.getElementById('areas-editor'); if (!el) return;
  var areas = getAreas();
  el.innerHTML = areas.map(function(a, i){
    return '<div class="area-block"><div class="area-head"><span class="area-dot" style="background:'+areaColor(a.name)+'"></span>'
      + '<span class="area-name">'+esc(a.name)+'</span>'
      + '<button class="btn btn-sm btn-icon btn-danger" data-area-del="'+i+'" title="Remove '+esc(a.name)+'" aria-label="Remove '+esc(a.name)+'"><i class="fas fa-trash"></i></button></div>'
      + '<div class="area-sections">' + a.sections.map(function(sec, j){
          return '<span class="sec-chip">'+esc(sec)+'<button data-sec-del="'+i+'|'+j+'" aria-label="Remove '+esc(sec)+'">&times;</button></span>';
        }).join('')
      + '<span class="sec-add"><input type="text" class="input-field" data-sec-input="'+i+'" placeholder="Add section" /><button class="btn btn-sm btn-secondary" data-sec-add="'+i+'"><i class="fas fa-plus"></i></button></span>'
      + '</div></div>';
  }).join('');
}
function areasCopy() { return JSON.parse(JSON.stringify(getAreas())); }
function shiftsUsing(zone, section) {
  var areas = getAreas();
  return getDB().shifts.filter(function(s){ return s.zone === zone && (section === undefined || effectiveSection(s, areas) === section); }).length;
}

function timeToMins(t) {
  if (!t) return 0;
  var parts = t.split(':');
  return parseInt(parts[0]) * 60 + parseInt(parts[1] || 0);
}

function ganttShiftColor(shift, db) {
  // Color by zone if set, else by employee
  if (shift.zone) return areaColor(shift.zone);
  var emps = db.employees || [];
  var idx = emps.indexOf(shift.employee);
  if (idx === -1) idx = Math.abs(shift.employee.split('').reduce(function(a,c){return a+c.charCodeAt(0);},0)) % GANTT_COLORS.length;
  return GANTT_COLORS[idx % GANTT_COLORS.length];
}

var currentShiftsTab = 'gantt';
// refresh=false when called from renderShifts(): the refresh itself ends in renderShifts(),
// so refreshing here again would loop forever while the Shifts section is open
function switchShiftsTab(tab, refresh) {
  currentShiftsTab = tab;
  ['gantt','week','requests','tips','hours','attendance','team'].forEach(function(t) {
    var panel = document.getElementById('shifts-panel-'+t);
    if (panel) panel.style.display = (t === tab) ? '' : 'none';
  });
  document.querySelectorAll('[data-shifts-tab]').forEach(function(btn) {
    btn.classList.toggle('active', btn.dataset.shiftsTab === tab);
  });
  if (tab === 'week')       renderShiftsWeekTab();
  if (tab === 'requests')   renderShiftsRequestsTab();
  if (tab === 'tips')       renderShiftsTipsTab();
  if (tab === 'hours')      renderShiftsHoursTab();
  if (tab === 'attendance') renderShiftsAttendanceTab();
  if (tab === 'team')       renderShiftsTeamTab();
  if (refresh !== false) refreshSection('shifts');
}

// One shift's bar (plus overtime extension) inside a timeline track
function shiftBarHTML(s, dateStr, wsStr, db) {
  var startMins = timeToMins(s.start), endMins = timeToMins(s.end);
  if (endMins <= startMins) endMins += 24*60;
  var clampStart = Math.max(startMins, GANTT_START*60), clampEnd = Math.min(endMins, GANTT_END*60);
  var leftPct  = ((clampStart/60 - GANTT_START) / GANTT_SPAN * 100).toFixed(2);
  var widthPct = Math.max(((clampEnd - clampStart)/60 / GANTT_SPAN * 100), 0.5).toFixed(2);
  var actAttrs = ' data-action-shift="'+esc(s.id)+'" data-action-shift-date="'+esc(dateStr)+'" data-action-shift-ws="'+esc(wsStr)+'"';
  var absObj = (db.absences||[]).find(function(a){ return a.employee === s.employee && a.date === dateStr; });
  if (absObj) {
    var absLabel = '<i class="fas fa-user-slash"></i>Absent · '+(absObj.justified ? 'justified' : 'unjustified')+' · '+esc(s.employee.split(' ')[0])+' '+esc(s.start)+'–'+esc(s.end);
    return '<div class="gantt-bar is-absent" style="left:'+leftPct+'%;width:'+widthPct+'%" title="'+esc(s.employee)+' absent ('+(absObj.justified?'justified':'unjustified')+'), '+esc(s.start)+'–'+esc(s.end)+'"'+actAttrs+'>'
      +'<span class="gantt-bar-label" style="left:0">'+absLabel+'</span></div>';
  }
  var color = ganttShiftColor(s, db);
  var late = Math.min(s.lateMinutes||0, Math.max(0, endMins-startMins)), ot = s.overtimeMinutes||0;
  var barLabel = esc(s.employee.split(' ')[0]) + ' ' + esc(s.start) + '–' + esc(s.end);
  if (s.role) barLabel += ' · '+esc(s.role);
  if (late) barLabel += ' · late '+fmtMins(late);
  if (ot) barLabel += ' · +'+fmtMins(ot);
  var visMins = Math.max(1, clampEnd - clampStart);
  var lateVis = Math.max(0, Math.min(startMins + late, clampEnd) - clampStart);
  var latePct = late ? Math.min(100, lateVis / visMins * 100) : 0;
  var lateHTML = latePct > 0 ? '<span class="gantt-late" style="width:'+latePct.toFixed(2)+'%"></span>' : '';
  var labelHTML = '<span class="gantt-bar-label" style="left:'+(latePct > 0 && latePct < 70 ? latePct.toFixed(2) : 0)+'%">'+barLabel+'</span>';
  var otHTML = '';
  if (ot) {
    var otStart = Math.min(endMins, GANTT_END*60), otEnd = Math.min(endMins + ot, GANTT_END*60);
    if (otEnd > otStart) {
      var otLeft = ((otStart/60 - GANTT_START) / GANTT_SPAN * 100).toFixed(2);
      var otWidth = Math.max((otEnd - otStart)/60 / GANTT_SPAN * 100, 0.5).toFixed(2);
      otHTML = '<div class="gantt-ot" style="left:'+otLeft+'%;width:'+otWidth+'%;background-color:'+color+'" title="Overtime +'+fmtMins(ot)+'"'+actAttrs+'></div>';
    }
  }
  return '<div class="gantt-bar'+(otHTML?' has-ot':'')+'" style="left:'+leftPct+'%;width:'+widthPct+'%;background:'+color+'" title="'+barLabel+'"'+actAttrs+'>'
    + lateHTML + labelHTML + '</div>' + otHTML;
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
  var ntBtn = document.getElementById('btn-notify-week');
  if (ntBtn) {
    ntBtn.style.display = canShiftEdit ? 'flex' : 'none';
    var sentAt = weekNotified()[toDateStr(ws)];
    document.getElementById('notify-week-label').textContent = sentAt ? 'Notified ' + reqWhen(sentAt).split(', ')[0] : 'Notify team';
  }
  // Team tab only for shift_mgr / admin
  var teamTabBtn = document.getElementById('shifts-tab-team-btn');
  if (teamTabBtn) teamTabBtn.style.display = canShiftEdit ? '' : 'none';

  updateRequestBadges();
  // Redraw the active tab (no server refresh: that is what called us)
  switchShiftsTab(currentShiftsTab, false);

  var el = document.getElementById('shifts-list'); if (!el) return;
  var wsStr = toDateStr(ws);
  var lg = document.getElementById('gantt-legend-areas');
  if (lg) lg.innerHTML = getAreas(db).map(function(a){ return '<span style="display:inline-flex;align-items:center;gap:4px"><span style="width:10px;height:10px;border-radius:3px;background:'+areaColor(a.name)+';display:inline-block"></span> '+esc(a.name)+'</span>'; }).join('');

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

    // Grid lines: offset by the label column (--gantt-label) so they align with bars inside gantt-track
    var gridHTML = '<div class="gantt-grid-lines" style="left:var(--gantt-label)">';
    for (var g = GANTT_START; g <= GANTT_END; g++) {
      var gPct = ((g - GANTT_START) / GANTT_SPAN * 100).toFixed(2);
      gridHTML += '<div class="gantt-grid-line" style="left:'+gPct+'%"></div>';
    }
    gridHTML += '</div>';

    // Now-line for today: offset by the label column, then a percentage of the track
    var nowLineHTML = '';
    if (isToday && nowInRange) {
      nowLineHTML = '<div style="position:absolute;top:0;bottom:0;left:var(--gantt-label);right:0;pointer-events:none;z-index:10">'
        +'<div class="gantt-now-line" style="left:'+nowPct.toFixed(2)+'%"><div class="gantt-now-dot"></div></div>'
        +'</div>';
    }

    // Shift bars: area → section → lanes (people whose times overlap get their own lane); day offs as chips
    var areas = getAreas(db);
    var worked = dayShifts.filter(function(s){ return !s.dayOff; });
    var offs = dayShifts.filter(function(s){ return s.dayOff; });
    var rowsHTML = '';
    if (dayShifts.length === 0) {
      rowsHTML = '<div class="gantt-empty">No shifts scheduled</div>';
    } else {
      var areaNames = areas.map(function(a){ return a.name; });
      var extraAreas = []; worked.forEach(function(s){ var z = s.zone||''; if (z && areaNames.indexOf(z) === -1 && extraAreas.indexOf(z) === -1) extraAreas.push(z); });
      extraAreas.sort();
      var order = areaNames.concat(extraAreas); if (worked.some(function(s){ return !s.zone; })) order.push('');
      order.forEach(function(zone){
        var inArea = worked.filter(function(s){ return (s.zone||'') === zone; });
        if (!inArea.length) return;
        var cfg = areaByName(zone, areas);
        var secOrder = cfg ? cfg.sections.slice() : [];
        inArea.forEach(function(s){ var sc = effectiveSection(s, areas); if (secOrder.indexOf(sc) === -1) secOrder.push(sc); });
        secOrder.sort(function(a, b){ // configured order, unknown after, "no section" last
          var ia = cfg ? cfg.sections.indexOf(a) : -1, ib = cfg ? cfg.sections.indexOf(b) : -1;
          if (a === '' || b === '') return a === '' ? 1 : -1;
          if (ia === -1 || ib === -1) return ia === -1 && ib === -1 ? a.localeCompare(b) : (ia === -1 ? 1 : -1);
          return ia - ib;
        });
        rowsHTML += '<div class="gantt-area-head" style="color:'+areaColor(zone)+'"><span>'+esc(zone || 'No area')+'</span></div>';
        secOrder.forEach(function(sec){
          var inSec = inArea.filter(function(s){ return effectiveSection(s, areas) === sec; });
          if (!inSec.length) return;
          inSec.sort(function(a, b){ return timeToMins(a.start) - timeToMins(b.start) || a.employee.localeCompare(b.employee); });
          var lanes = [];
          inSec.forEach(function(s){
            var st = timeToMins(s.start), en = timeToMins(s.end); if (en <= st) en += 24*60; en += (s.overtimeMinutes||0);
            var lane = lanes.find(function(l){ return l.end <= st; });
            if (!lane) { lane = {end:0, items:[]}; lanes.push(lane); }
            lane.items.push(s); lane.end = en;
          });
          var secLabel = sec || (cfg && cfg.sections.length > 1 ? 'No section' : '—');
          lanes.forEach(function(lane, li){
            rowsHTML += '<div class="gantt-row'+(li === 0 ? ' sec-first' : '')+'">'
              + '<div class="gantt-emp-label'+(li === 0 ? '' : ' is-cont')+'" title="'+esc((zone ? zone + ' · ' : '') + secLabel)+'">'+esc(secLabel)+'</div>'
              + '<div class="gantt-track">' + lane.items.map(function(s){ return shiftBarHTML(s, dateStr, wsStr, db); }).join('') + '</div>'
              + '</div>';
          });
        });
      });
      if (offs.length) {
        rowsHTML += '<div class="gantt-offs"><span class="gantt-offs-label"><i class="fas fa-ban"></i> Day off</span>'
          + offs.sort(function(a,b){ return a.employee.localeCompare(b.employee); }).map(function(s){
              return '<span class="gantt-off-chip" role="button" tabindex="0" data-action-shift="'+esc(s.id)+'" data-action-shift-date="'+esc(dateStr)+'" data-action-shift-ws="'+esc(wsStr)+'">'+esc(s.employee)+'</span>';
            }).join('') + '</div>';
      }
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
    // Absent employees section: only people with no shift bar that day (the bar already shows the others)
    var absentHTML = '';
    var absentListEmps = absentEmps.filter(function(e){ return !dayShifts.some(function(s){ return s.employee === e && !s.dayOff; }); });
    if (absentListEmps.length > 0) {
      var absentBtns = absentListEmps.map(function(e) {
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
// "2h", "1h30", "45m"
function fmtMins(m) { m = Math.round(m||0); var h = Math.floor(m/60), r = m % 60; return h ? (h + 'h' + (r ? String(r).padStart(2,'0') : '')) : (r + 'm'); }

// ── Late / overtime on a shift ──
var _adjustKind = '', _adjustShiftId = '';
function openShiftAdjust(kind, shiftId) {
  var db = getDB(); var s = db.shifts.find(function(x){ return x.id === shiftId; }); if (!s) return;
  _adjustKind = kind; _adjustShiftId = shiftId;
  var dur = Math.round(shiftScheduledHours(s) * 60);
  var cur = kind === 'late' ? (s.lateMinutes||0) : (s.overtimeMinutes||0);
  var maxH = kind === 'late' ? Math.floor(dur/60) : 8;
  document.getElementById('adjust-title').innerHTML = kind === 'late'
    ? '<i class="fas fa-hourglass-half"></i> Late' : '<i class="fas fa-business-time"></i> Overtime';
  document.getElementById('adjust-info').textContent = s.employee + ' · ' + s.day + ' ' + shiftDateStr(s) + ' · ' + s.start + '–' + s.end;
  document.getElementById('adjust-help').textContent = kind === 'late'
    ? 'How late did they start? That time is hatched on the bar and does not count toward hours or tips.'
    : 'How long did they stay after ' + s.end + '? Overtime counts toward hours and tips.';
  var hSel = document.getElementById('adjust-hours'); var opts = '';
  for (var h = 0; h <= maxH; h++) opts += '<option value="'+h+'">'+h+'</option>';
  hSel.innerHTML = opts; hSel.value = String(Math.floor(cur/60));
  document.getElementById('adjust-mins').value = String(cur % 60 - (cur % 60) % 15);
  var chips = kind === 'late' ? [15,30,60,120] : [30,60,90,120];
  document.getElementById('adjust-chips').innerHTML = chips.map(function(m){
    return '<button type="button" class="inv-slicer" data-adjust-quick="'+m+'">'+(kind==='late'?'':'+')+fmtMins(m)+'</button>'; }).join('');
  document.getElementById('adjust-error').textContent = '';
  document.getElementById('btn-adjust-clear').style.display = cur ? '' : 'none';
  openModal('modal-shift-adjust');
}
function saveShiftAdjust(minutes) {
  var db = getDB(); var s = db.shifts.find(function(x){ return x.id === _adjustShiftId; }); if (!s) { closeModal('modal-shift-adjust'); return; }
  var dur = Math.round(shiftScheduledHours(s) * 60);
  if (_adjustKind === 'late' && minutes >= dur) { document.getElementById('adjust-error').textContent = 'Late must be shorter than the shift (' + fmtMins(dur) + ').'; return; }
  var field = _adjustKind === 'late' ? 'lateMinutes' : 'overtimeMinutes';
  var col = _adjustKind === 'late' ? 'late_minutes' : 'overtime_minutes';
  s[field] = minutes; saveDB(db); closeModal('modal-shift-adjust'); renderShifts();
  var body = {}; body[col] = minutes;
  sbFetch('PATCH','shifts',body,shiftSlotFilter(s.employee,s.weekStart,s.day))
    .then(function(){ toast(minutes ? (_adjustKind==='late' ? s.employee+' late '+fmtMins(minutes) : s.employee+' overtime +'+fmtMins(minutes)) : 'Cleared', 'gold'); })
    .catch(function(){ toast('Saved on this device only. Check the connection and try again.','error'); });
}

// ── Actual hours: the one rule used by Tips, Hours and Attendance ──
// scheduled hours − late + overtime; 0 on a day off or when absent that day (justified or not)
function shiftDateStr(s) {
  var i = DAYS.indexOf(s.day); if (i < 0 || !s.weekStart) return '';
  var d = new Date(s.weekStart + 'T00:00:00'); d.setDate(d.getDate() + i); return toDateStr(d);
}
function absenceIndex(db) { var idx = {}; (db.absences||[]).forEach(function(a){ idx[a.employee+'|'+a.date] = a; }); return idx; }
function shiftScheduledHours(s) {
  if (s.dayOff) return 0;
  var sm = timeToMins(s.start), em = timeToMins(s.end); if (em <= sm) em += 24*60;
  return Math.max(0, (em - sm) / 60);
}
function shiftIsAbsent(s, absIdx) { return !s.dayOff && !!absIdx[s.employee+'|'+shiftDateStr(s)]; }
function shiftActualHours(s, absIdx) {
  if (s.dayOff || shiftIsAbsent(s, absIdx)) return 0;
  return Math.max(0, shiftScheduledHours(s) - (s.lateMinutes||0)/60 + (s.overtimeMinutes||0)/60);
}
// {employee: {hours, days, absentDays, lateMinutes, overtimeMinutes, zones:{zone:days}}} for shifts passing keep(s)
function hoursByEmployee(db, keep) {
  var absIdx = absenceIndex(db), out = {};
  db.shifts.forEach(function(s){
    if (!keep(s)) return;
    var st = out[s.employee] || (out[s.employee] = {hours:0, days:0, absentDays:0, lateMinutes:0, overtimeMinutes:0, zones:{}});
    if (s.dayOff) return;
    if (shiftIsAbsent(s, absIdx)) { st.absentDays++; return; }
    var h = shiftActualHours(s, absIdx);
    st.hours += h; st.lateMinutes += (s.lateMinutes||0); st.overtimeMinutes += (s.overtimeMinutes||0);
    if (h > 0) { st.days++; if (s.zone) st.zones[s.zone] = (st.zones[s.zone]||0) + 1; }
  });
  return out;
}
// Split a week's tips by actual hours; shares are in whole cents and add up to the total exactly
function computeTipSplit(db, ws, total) {
  var st = hoursByEmployee(db, function(s){ return s.weekStart === ws; });
  var emps = Object.keys(st).filter(function(e){ return st[e].hours > 0; });
  var totalHrs = emps.reduce(function(a,e){ return a + st[e].hours; }, 0);
  if (!totalHrs || !(total > 0)) return null;
  var cents = Math.round(total * 100);
  var parts = emps.map(function(e){ var exact = st[e].hours / totalHrs * cents; return {e:e, c:Math.floor(exact), r:exact - Math.floor(exact)}; });
  var left = cents - parts.reduce(function(a,p){ return a + p.c; }, 0);
  parts.slice().sort(function(a,b){ return b.r - a.r || a.e.localeCompare(b.e); }).slice(0, left).forEach(function(p){ p.c++; });
  var split = {total: Math.round(total*100)/100, totalHours: Math.round(totalHrs*100)/100, generatedAt: new Date().toISOString(), hours:{}, shares:{}, absentDays:{}, lateMinutes:{}, overtimeMinutes:{}};
  parts.forEach(function(p){ split.hours[p.e] = Math.round(st[p.e].hours*100)/100; split.shares[p.e] = p.c/100;
    if (st[p.e].lateMinutes) split.lateMinutes[p.e] = st[p.e].lateMinutes; if (st[p.e].overtimeMinutes) split.overtimeMinutes[p.e] = st[p.e].overtimeMinutes; });
  Object.keys(st).forEach(function(e){ if (st[e].absentDays) split.absentDays[e] = st[e].absentDays; });
  return split;
}
function tipSplitChanged(saved, current) {
  if (!saved || !current) return !!saved !== !!current;
  var keys = Object.keys(saved.hours).concat(Object.keys(current.hours));
  return keys.some(function(e){ return Math.abs((saved.hours[e]||0) - (current.hours[e]||0)) > 0.009; });
}
var tipsEditing = {};
function saveTipSplit(db, ws, split) {
  db.weekTips[ws] = split.total;
  db.tipSplits = db.tipSplits || {}; db.tipSplits[ws] = split;
  tipsEditing[ws] = false;
  saveDB(db);
  sbFetch('PATCH','settings',{week_tips:db.weekTips},'id=eq.config').catch(function(e){ console.error('week_tips sync:',e); });
  sbFetch('PATCH','settings',{tip_splits:db.tipSplits},'id=eq.config').catch(function(){ toast('Tip split saved on this device only. Run the step 3 SQL in Supabase.','error'); });
}
function recalculateTips() {
  var db = getDB(); var ws = toDateStr(getWeekStart(shiftsWeekOffset));
  var total = parseFloat(db.weekTips && db.weekTips[ws]); if (!(total > 0)) { toast('Enter the week total first','error'); return; }
  var split = computeTipSplit(db, ws, total);
  if (!split) { toast('No worked hours this week','error'); return; }
  if (!confirm("Recalculate this week's tips from the current schedule? The saved split will be replaced.")) return;
  saveTipSplit(db, ws, split); renderShiftsTipsTab(); toast('Tips recalculated','gold');
}
function tipSplitHTML(split, heading) {
  var emps = Object.keys(split.shares).sort(function(a,b){ return split.shares[b] - split.shares[a] || a.localeCompare(b); });
  var absentOnly = Object.keys(split.absentDays||{}).filter(function(e){ return !(e in split.shares); });
  var rows = emps.map(function(e){
    var note = split.absentDays && split.absentDays[e] ? ' · '+split.absentDays[e]+' day'+(split.absentDays[e]>1?'s':'')+' absent' : '';
    if (split.lateMinutes && split.lateMinutes[e]) note += ' · late '+fmtMins(split.lateMinutes[e]);
    if (split.overtimeMinutes && split.overtimeMinutes[e]) note += ' · +'+fmtMins(split.overtimeMinutes[e])+' overtime';
    return '<div style="display:flex;justify-content:space-between;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid var(--slate-100)">'
      +'<div><div style="font-weight:700;font-size:14px;color:var(--slate-900)">'+esc(e)+'</div>'
      +'<div style="font-size:12px;color:var(--slate-500)">'+split.hours[e].toFixed(1)+' h · '+Math.round(split.hours[e]/split.totalHours*100)+'%'+note+'</div></div>'
      +'<div style="font-weight:800;font-size:16px;color:var(--slate-900)">'+fmtEur(split.shares[e])+'</div></div>';
  }).join('');
  rows += absentOnly.map(function(e){
    return '<div style="display:flex;justify-content:space-between;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid var(--slate-100)">'
      +'<div><div style="font-weight:700;font-size:14px;color:var(--slate-900)">'+esc(e)+'</div><div style="font-size:12px;color:var(--red)">absent all scheduled days</div></div>'
      +'<div style="font-weight:800;font-size:16px;color:var(--slate-400)">'+fmtEur(0)+'</div></div>';
  }).join('');
  return '<div style="border:var(--rule);border-radius:10px;padding:10px 14px 4px;margin-bottom:14px;background:var(--panel)">'
    +'<div style="font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--slate-500);margin-bottom:4px">'+heading+'</div>'
    +'<div style="font-size:13px;color:var(--slate-700);font-weight:600;margin-bottom:4px">Total '+fmtEur(split.total)+' · '+split.totalHours.toFixed(1)+' h worked</div>'
    +rows+'</div>';
}

function renderShiftsTipsTab() {
  var ws = getWeekStart(shiftsWeekOffset);
  var wsStr = toDateStr(ws);
  var db = getDB();
  var canShiftEdit = isAdmin || hasRole('shift_mgr');
  var total = db.weekTips && db.weekTips[wsStr] ? parseFloat(db.weekTips[wsStr]) : 0;
  var saved = db.tipSplits && db.tipSplits[wsStr];
  var locked = total > 0 && !tipsEditing[wsStr];

  var tipsInp    = document.getElementById('shifts-tips-input');
  var inputRow   = document.getElementById('tips-input-row');
  var lockNotice = document.getElementById('tips-locked-notice');
  var lockText   = document.getElementById('tips-locked-text');
  if (tipsInp && document.activeElement !== tipsInp) tipsInp.value = total > 0 ? total : '';
  if (inputRow) inputRow.style.display = (canShiftEdit && !locked) ? '' : 'none';
  if (lockNotice) lockNotice.style.display = (canShiftEdit && locked) ? 'flex' : 'none';

  var el = document.getElementById('shifts-tips-result');
  if (!el) return;

  // ── This week ──
  var weekHTML = '';
  if (total > 0) {
    var current = computeTipSplit(db, wsStr, total);
    if (saved) {
      var when = new Date(saved.generatedAt);
      var whenStr = when.getDate()+' '+MONTH_NAMES[when.getMonth()]+' '+String(when.getHours()).padStart(2,'0')+':'+String(when.getMinutes()).padStart(2,'0');
      if (lockText) lockText.textContent = 'Tips calculated on '+whenStr+'.';
      var changed = tipSplitChanged(saved, current);
      if (changed) {
        weekHTML += '<div style="display:flex;align-items:center;gap:10px;background:var(--amber-50);border:1px solid var(--amber-200);border-radius:8px;padding:10px 12px;margin-bottom:10px;font-size:13px;color:var(--amber-700);font-weight:600">'
          +'<i class="fas fa-triangle-exclamation"></i><span style="flex:1">The schedule changed since these tips were calculated.</span>'
          +(canShiftEdit?'<button class="btn btn-sm btn-primary" id="btn-tips-recalc-inline" data-tips-recalc="1"><i class="fas fa-rotate"></i> Recalculate</button>':'')+'</div>';
      }
      weekHTML += tipSplitHTML(saved, 'This week · saved split');
    } else if (current) {
      if (lockText) lockText.textContent = 'Worked out from the current schedule. Recalculate to save it.';
      weekHTML += tipSplitHTML(current, 'This week · from the current schedule');
    } else {
      weekHTML += '<div class="empty-state"><p>No worked hours this week yet.</p></div>';
    }
  }

  // ── Month & year totals: saved split when there is one, else the current schedule ──
  var now = new Date();
  var curMonth = now.getFullYear()+'-'+String(now.getMonth()+1).padStart(2,'0');
  var curYear  = String(now.getFullYear());
  var empTipsMonth = {}, empTipsYear = {};
  Object.keys(db.weekTips||{}).forEach(function(wk) {
    var wkTotal = parseFloat(db.weekTips[wk]); if (!wkTotal || wkTotal <= 0) return;
    var split = (db.tipSplits && db.tipSplits[wk]) || computeTipSplit(db, wk, wkTotal);
    if (!split) return;
    Object.keys(split.shares).forEach(function(e) {
      if (wk.substring(0,7) === curMonth) empTipsMonth[e] = (empTipsMonth[e]||0) + split.shares[e];
      if (wk.substring(0,4) === curYear)  empTipsYear[e]  = (empTipsYear[e]||0)  + split.shares[e];
    });
  });
  var people = (db.employees||[]).slice();
  Object.keys(empTipsYear).forEach(function(e){ if (people.indexOf(e) === -1) people.push(e); });
  people.sort(function(a,b){ return a.localeCompare(b); });
  var mTotal = Object.values(empTipsMonth).reduce(function(a,v){return a+v;},0);
  var yTotal = Object.values(empTipsYear).reduce(function(a,v){return a+v;},0);
  var monthLabel = MONTH_NAMES[now.getMonth()]+' '+curYear;
  var periodRows = people.map(function(e) {
    var mTip = empTipsMonth[e]||0, yTip = empTipsYear[e]||0;
    var left = (db.employees||[]).indexOf(e) === -1 ? ' <span class="badge badge-gray">left</span>' : '';
    return '<tr style="border-bottom:1px solid var(--slate-100)">'
      +'<td style="padding:9px 10px;font-weight:700;color:var(--slate-900);font-size:13px">'+esc(e)+left+'</td>'
      +'<td style="padding:9px 8px;text-align:right;font-weight:700;font-size:14px;color:var(--slate-900)">'+(mTip>0?fmtEur(mTip):'—')+'</td>'
      +'<td style="padding:9px 8px;text-align:right;font-weight:700;font-size:14px;color:var(--slate-900)">'+(yTip>0?fmtEur(yTip):'—')+'</td></tr>';
  }).join('');
  var periodHTML = people.length === 0 ? '' : '<div style="background:var(--panel);border-radius:10px;border:var(--rule);overflow:hidden">'
    +'<div style="padding:10px 12px;display:flex;align-items:center;gap:7px;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--slate-700);border-bottom:var(--rule)"><i class="fas fa-chart-bar" style="color:var(--teal-600)"></i> Tips by employee</div>'
    +'<table style="width:100%;border-collapse:collapse"><thead><tr>'
      +'<th style="padding:8px 10px;text-align:left;font-size:11px;font-weight:700;color:var(--slate-500);text-transform:uppercase;letter-spacing:.08em">Employee</th>'
      +'<th style="padding:8px 8px;text-align:right;font-size:11px;font-weight:700;color:var(--slate-500);text-transform:uppercase;letter-spacing:.08em">'+monthLabel+'</th>'
      +'<th style="padding:8px 8px;text-align:right;font-size:11px;font-weight:700;color:var(--slate-500);text-transform:uppercase;letter-spacing:.08em">'+curYear+'</th>'
    +'</tr></thead><tbody>'+periodRows+'</tbody>'
    +'<tfoot><tr style="border-top:var(--rule);background:var(--slate-50)">'
      +'<td style="padding:8px 10px;font-weight:800;font-size:12px;color:var(--slate-700)">TOTAL</td>'
      +'<td style="padding:8px 8px;text-align:right;font-weight:800;font-size:13px">'+(mTotal>0?fmtEur(mTotal):'—')+'</td>'
      +'<td style="padding:8px 8px;text-align:right;font-weight:800;font-size:13px">'+(yTotal>0?fmtEur(yTotal):'—')+'</td>'
    +'</tr></tfoot></table></div>';

  el.innerHTML = weekHTML + periodHTML;
  if (!weekHTML && !periodHTML) el.innerHTML = '<div class="empty-state"><p>No tips recorded yet for this period.</p></div>';
}

// ── Hours & Days tab ─────────────────────────────────────────────
var hoursRange = { custom:false, from:'', to:'' };
function hoursPreset(kind) {
  var now = new Date(), f, t;
  if (kind === 'week' || kind === 'lastweek') { f = getWeekStart(kind === 'week' ? 0 : -1); t = new Date(f); t.setDate(t.getDate() + 6); }
  else { var m = now.getMonth() - (kind === 'lastmonth' ? 1 : 0); f = new Date(now.getFullYear(), m, 1); t = new Date(now.getFullYear(), m + 1, 0); }
  hoursRange = { custom:true, from:toDateStr(f), to:toDateStr(t), preset:kind };
  renderShiftsHoursTab();
}
function renderShiftsHoursTab() {
  var db = getDB();
  var el = document.getElementById('shifts-hours-content'); if (!el) return;
  if (!hoursRange.custom) {
    var ws = getWeekStart(shiftsWeekOffset), we = new Date(ws); we.setDate(we.getDate() + 6);
    hoursRange.from = toDateStr(ws); hoursRange.to = toDateStr(we); hoursRange.preset = shiftsWeekOffset === 0 ? 'week' : (shiftsWeekOffset === -1 ? 'lastweek' : '');
  }
  var from = hoursRange.from, to = hoursRange.to;
  if (from > to) { var tmp = from; from = to; to = tmp; }
  var fEl = document.getElementById('hours-from'), tEl = document.getElementById('hours-to');
  if (fEl && document.activeElement !== fEl) fEl.value = hoursRange.from;
  if (tEl && document.activeElement !== tEl) tEl.value = hoursRange.to;
  document.querySelectorAll('[data-hours-preset]').forEach(function(b){ b.classList.toggle('active', b.dataset.hoursPreset === hoursRange.preset); });

  var inRange = function(d){ return d && d >= from && d <= to; };
  var st = hoursByEmployee(db, function(s){ return inRange(shiftDateStr(s)); });
  var absCount = {};
  (db.absences||[]).forEach(function(a){ if (inRange(a.date)) absCount[a.employee] = (absCount[a.employee]||0) + 1; });
  var team = db.employees || [];
  var people = team.slice();
  Object.keys(st).forEach(function(e){ if (people.indexOf(e) === -1 && (st[e].hours > 0 || st[e].absentDays)) people.push(e); });
  Object.keys(absCount).forEach(function(e){ if (people.indexOf(e) === -1) people.push(e); });
  people.sort(function(a,b){ return a.localeCompare(b); });
  if (people.length === 0) { el.innerHTML = '<div class="empty-state"><p>No employees yet.</p></div>'; return; }

  var totalH = 0, working = 0;
  var rows = people.map(function(e){
    var x = st[e] || {hours:0, days:0, lateMinutes:0, overtimeMinutes:0, zones:{}};
    var abs = absCount[e] || 0;
    totalH += x.hours; if (x.hours > 0) working++;
    var meta = [];
    meta.push(x.days + ' day' + (x.days === 1 ? '' : 's'));
    if (x.lateMinutes) meta.push('<span class="badge badge-yellow">late ' + fmtMins(x.lateMinutes) + '</span>');
    if (x.overtimeMinutes) meta.push('<span class="badge badge-blue">+' + fmtMins(x.overtimeMinutes) + ' overtime</span>');
    if (abs) meta.push('<span class="badge badge-red">' + abs + ' absen' + (abs === 1 ? 'ce' : 'ces') + '</span>');
    var zones = Object.keys(x.zones).sort(function(a,b){ return x.zones[b] - x.zones[a]; }).map(function(z){ return z + ' ' + x.zones[z] + 'd'; }).join(', ');
    if (zones) meta.push(esc(zones));
    var left = team.indexOf(e) === -1 ? ' <span class="badge badge-gray">left</span>' : '';
    return '<div class="hours-row' + (x.hours > 0 ? '' : ' is-zero') + '"><div class="hours-who"><div class="hours-name">' + esc(e) + left + '</div>'
      + '<div class="hours-meta">' + meta.join('<span aria-hidden="true">·</span>') + '</div></div>'
      + '<div class="hours-num">' + (x.hours > 0 ? x.hours.toFixed(1) : '0') + '<small>h</small></div></div>';
  }).join('');
  var fd = new Date(from + 'T00:00:00'), td = new Date(to + 'T00:00:00');
  var label = fd.getDate() + ' ' + MONTH_NAMES[fd.getMonth()] + (fd.getFullYear() !== td.getFullYear() ? ' ' + fd.getFullYear() : '') + ' – ' + td.getDate() + ' ' + MONTH_NAMES[td.getMonth()] + ' ' + td.getFullYear();
  el.innerHTML = '<div class="hours-summary">' + label + ' · ' + working + ' worked · ' + totalH.toFixed(1) + ' h</div><div class="hours-list">' + rows + '</div>';
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
  var absIdxAtt = absenceIndex(db);
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
    var eWorkedAll = db.shifts.filter(function(s){ return s.employee===e && !s.dayOff && !shiftIsAbsent(s, absIdxAtt); }).length;
    var eSchAll = eWorkedAll + eAbsAll.length;
    var pctAll = eSchAll > 0 ? Math.round((eWorkedAll/eSchAll)*100) : 100;

    // Current month — match absences and shifts whose weekStart starts with curMonth
    var eAbsMonth = eAbsAll.filter(function(a){ return (a.date||'').substring(0,7) === curMonth; });
    var eWorkedMonth = db.shifts.filter(function(s){
      return s.employee===e && !s.dayOff && !shiftIsAbsent(s, absIdxAtt) && shiftDateStr(s).substring(0,7) === curMonth;
    }).length;
    var eSchMonth = eWorkedMonth + eAbsMonth.length;
    var pctMonth = eSchMonth > 0 ? Math.round((eWorkedMonth/eSchMonth)*100) : 100;

    // Current year
    var eAbsYear = eAbsAll.filter(function(a){ return (a.date||'').substring(0,4) === curYear; });
    var eWorkedYear = db.shifts.filter(function(s){
      return s.employee===e && !s.dayOff && !shiftIsAbsent(s, absIdxAtt) && shiftDateStr(s).substring(0,4) === curYear;
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
  fillZoneSelects();
  var db=getDB();
  var ws=toDateStr(getWeekStart(shiftsWeekOffset));
  var roleEl=document.getElementById('shift-role');
  var withRole=db.shifts.find(function(s){return s.employee===emp&&s.weekStart===ws&&s.role;});
  if(roleEl&&!roleEl.value&&withRole) roleEl.value=withRole.role;
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
      setZoneSelect(zoneEl, existing.zone||'', effectiveSection(existing));
    } else {
      offChk.checked=false;
      startEl.disabled=false; endEl.disabled=false;
      startEl.value=''; endEl.value='';
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
  fillZoneSelects();
  var rows=document.querySelectorAll('#shift-days-body tr[data-shift-day]');
  rows.forEach(function(row){
    row.querySelector('.shift-day-start').value='';
    row.querySelector('.shift-day-end').value='';
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
  var row = {employee:s.employee,day:s.day,start_time:s.start,end_time:s.end,role:s.role||'',zone:s.zone||'',day_off:!!s.dayOff,week_start:s.weekStart,
    late_minutes:s.lateMinutes||0,overtime_minutes:s.overtimeMinutes||0,section:s.section||''};
  if(!sbCols.section) delete row.section;
  return row;
}
var repeatBusy=false;
// ── Repeat: copy chosen people's shifts from one week to another ──
var repeatTicked = {}, repeatClashMode = '', repeatBound = false;
// ── Shift change requests ────────────────────────────────────────
// An employee asks to change times, take the day off, or swap/give a shift to a colleague.
// Swaps go to the colleague first ('asked'), then to shift managers ('pending');
// approving writes the change to the schedule. Everyone involved gets a push notification.
var REQ_KIND_LABEL = { times:'Change times', dayoff:'Day off', swap:'Swap or cover' };
var REQ_STATUS = { asked:['Waiting for colleague','amber'], pending:['Waiting for a manager','amber'], approved:['Approved','green'], rejected:['Not approved','red'], declined:['Colleague declined','red'], cancelled:['Cancelled','gray'] };
function reqCutoff() { var d = new Date(); d.setDate(d.getDate() - 56); return toDateStr(getWeekStartOf(d)); }
function getWeekStartOf(d) { var x = new Date(d); var wd = (x.getDay() + 6) % 7; x.setDate(x.getDate() - wd); x.setHours(0,0,0,0); return x; }
function reqFromRow(r) {
  return { id:r.id, createdAt:r.created_at, kind:r.kind, status:r.status, requester:r.requester, requesterUserId:r.requester_user_id||'',
    weekStart:r.week_start, day:r.day, shiftId:r.shift_id||'', snap:r.shift_snapshot||null, newStart:r.new_start||'', newEnd:r.new_end||'',
    colleague:r.colleague||'', colleagueSnap:r.colleague_snapshot||null, note:r.note||'',
    decidedBy:r.decided_by||'', decidedAt:r.decided_at||'', decisionNote:r.decision_note||'' };
}
function reqToRow(q) {
  return { id:q.id, created_at:q.createdAt, kind:q.kind, status:q.status, requester:q.requester, requester_user_id:q.requesterUserId||null,
    week_start:q.weekStart, day:q.day, shift_id:q.shiftId||null, shift_snapshot:q.snap, new_start:q.newStart||null, new_end:q.newEnd||null,
    colleague:q.colleague||null, colleague_snapshot:q.colleagueSnap, note:q.note||'', updated_at:new Date().toISOString() };
}
function normName(x) { return String(x || '').normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').toLowerCase().trim(); }
// The team name a login belongs to: set in Users, otherwise matched on username or name ("-" = not on the schedule)
function employeeForUser(u, db) {
  if (!u || u.employee === '-') return '';
  if (u.employee) return u.employee;
  var emps = (db || getDB()).employees || [];
  var keys = [normName(u.username), normName(u.name), normName(String(u.name || '').split(' ')[0])];
  return emps.find(function(e){ return keys.indexOf(normName(e)) !== -1; }) || '';
}
function myEmployee() { return currentUser ? employeeForUser(currentUser) : ''; }
function userIdsForEmployee(name) {
  var db = getDB();
  return (db.appUsers || []).filter(function(u){ return u.active !== false && name && employeeForUser(u, db) === name; }).map(function(u){ return u.id; });
}
function managerUserIds() {
  return (getDB().appUsers || []).filter(function(u){ return u.active !== false && Array.isArray(u.roles) && (u.roles.indexOf('admin') !== -1 || u.roles.indexOf('shift_mgr') !== -1); }).map(function(u){ return u.id; });
}
function canApproveShifts() { return isAdmin || hasRole('shift_mgr'); }
function fillUserEmployeeSelect(u) {
  var sel = document.getElementById('user-employee'); if (!sel) return;
  var db = getDB(), emps = (db.employees || []).slice().sort();
  var auto = u ? employeeForUser(Object.assign({}, u, { employee:'' }), db) : '';
  var cur = u ? (u.employee || '') : '';
  if (cur && cur !== '-' && emps.indexOf(cur) === -1) emps.unshift(cur);
  sel.innerHTML = '<option value="">' + (auto ? 'Automatic: ' + esc(auto) : 'Automatic (no match)') + '</option>'
    + '<option value="-">Not on the schedule</option>'
    + emps.map(function(e){ return '<option value="' + esc(e) + '">' + esc(e) + '</option>'; }).join('');
  sel.value = cur;
}
function sendPush(userIds, title, body, url) {
  var me = currentUser ? currentUser.id : '';
  var ids = (userIds || []).filter(function(id, i, a){ return id && id !== me && a.indexOf(id) === i; });
  if (!ids.length) return;
  fetch('/api/push/send', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ userIds:ids, title:title, body:body || '', url:url || '/' }) })
    .then(function(r){ return r.json(); }).then(function(d){ console.log('[Push] Sent:', d); })
    .catch(function(e){ console.warn('[Push] Send failed:', e.message); });
}
function shiftSnap(s) { return s ? { start:s.start, end:s.end, dayOff:!!s.dayOff, zone:s.zone || '', section:s.section || '', role:s.role || '' } : null; }
function snapLabel(sn) { if (!sn) return 'not scheduled'; if (sn.dayOff) return 'day off'; return wkTime(sn.start) + '–' + wkTime(sn.end); }
function reqDateLabel(q) { var d = new Date(q.weekStart + 'T00:00:00'); d.setDate(d.getDate() + DAYS.indexOf(q.day)); return q.day.slice(0,3) + ' ' + d.getDate() + ' ' + MONTH_NAMES[d.getMonth()]; }
function reqSummary(q) {
  if (q.kind === 'times') return 'Change ' + snapLabel(q.snap) + ' → ' + wkTime(q.newStart) + '–' + wkTime(q.newEnd);
  if (q.kind === 'dayoff') return 'Day off (instead of ' + snapLabel(q.snap) + ')';
  if (q.colleagueSnap && !q.colleagueSnap.dayOff) return 'Swap with ' + q.colleague + ': ' + snapLabel(q.snap) + ' ↔ ' + snapLabel(q.colleagueSnap);
  return q.colleague + ' works ' + snapLabel(q.snap) + ', ' + q.requester + ' gets the day off';
}
function reqStatusLabel(q) { return (REQ_STATUS[q.status] || [q.status])[0]; }
function reqWhen(iso) { if (!iso) return ''; var d = new Date(iso); return d.getDate() + ' ' + MONTH_NAMES[d.getMonth()] + ', ' + String(d.getHours()).padStart(2,'0') + ':' + String(d.getMinutes()).padStart(2,'0'); }
function openRequestFor(emp, ws, day) {
  return (getDB().shiftRequests || []).find(function(q){ return q.requester === emp && q.weekStart === ws && q.day === day && (q.status === 'asked' || q.status === 'pending'); });
}
function reqNeedsMe(q) {
  if (q.status === 'asked') { var me = myEmployee(); return !!me && q.colleague === me; }
  if (q.status === 'pending') return canApproveShifts();
  return false;
}
function updateRequestBadges() {
  var n = currentUser ? (getDB().shiftRequests || []).filter(reqNeedsMe).length : 0;
  var c = document.getElementById('req-tab-count'); if (c) { c.textContent = n; c.style.display = n ? '' : 'none'; }
  ['bnav-shifts-dot','ditem-shifts-dot'].forEach(function(id){ var d = document.getElementById(id); if (d) d.style.display = n ? '' : 'none'; });
}
function reqCardHTML(q) {
  var me = myEmployee(), st = REQ_STATUS[q.status] || [q.status, 'gray'], btns = '', idA = ' data-req-id="' + esc(q.id) + '"';
  if (q.status === 'asked' && me && q.colleague === me)
    btns = '<button class="btn btn-sm btn-primary" data-req-act="accept"' + idA + '><i class="fas fa-check"></i> Agree</button><button class="btn btn-sm btn-secondary" data-req-act="decline"' + idA + '>Decline</button>';
  else if (q.status === 'pending' && canApproveShifts())
    btns = '<button class="btn btn-sm btn-primary" data-req-act="approve"' + idA + '><i class="fas fa-check"></i> Approve</button><button class="btn btn-sm btn-secondary" data-req-act="reject"' + idA + '>Reject</button>';
  if ((q.status === 'asked' || q.status === 'pending') && me && q.requester === me)
    btns += '<button class="btn btn-sm btn-secondary" data-req-act="cancel"' + idA + '>Cancel request</button>';
  var meta = esc(REQ_KIND_LABEL[q.kind] || q.kind) + ' · asked ' + esc(reqWhen(q.createdAt));
  if (q.decidedBy && q.status !== 'asked' && q.status !== 'pending') meta += ' · ' + esc(q.decidedBy) + ', ' + esc(reqWhen(q.decidedAt));
  return '<div class="req-card"><div class="req-card-top"><div><div class="req-who">' + esc(q.requester) + ' · ' + esc(reqDateLabel(q)) + '</div>'
    + '<div class="req-what">' + esc(reqSummary(q)) + '</div></div><span class="req-status is-' + st[1] + '">' + esc(st[0]) + '</span></div>'
    + (q.note ? '<div class="req-note">"' + esc(q.note) + '"</div>' : '')
    + (q.decisionNote ? '<div class="req-note">' + esc(q.decidedBy || 'Manager') + ': "' + esc(q.decisionNote) + '"</div>' : '')
    + '<div class="req-meta">' + meta + '</div>'
    + (btns ? '<div class="req-actions">' + btns + '</div>' : '') + '</div>';
}
function renderShiftsRequestsTab() {
  var el = document.getElementById('shifts-requests-content'); if (!el) return;
  updateRequestBadges();
  var all = (getDB().shiftRequests || []).slice().sort(function(a, b){ return String(b.createdAt || '').localeCompare(String(a.createdAt || '')); });
  var me = myEmployee(), mgr = canApproveShifts(), h = '';
  if (!sbCols.requests) h += '<div class="req-banner"><i class="fas fa-circle-info"></i> ' + (isAdmin ? 'Requests switch on once the step 11 SQL has run in Supabase.' : 'Shift requests are not switched on yet.') + '</div>';
  else if (!me) h += '<div class="req-banner"><i class="fas fa-circle-info"></i> Your login is not linked to a name on the schedule' + (isAdmin ? '. Set it in Users → edit → "Name on the shift schedule".' : '. Ask a manager to link it in Users.') + '</div>';
  var sec = function(title, list, empty) {
    if (!list.length && !empty) return '';
    return '<div class="req-section-title">' + title + '</div>' + (list.length ? list.map(reqCardHTML).join('') : '<div class="req-empty">' + empty + '</div>');
  };
  var decided = function(q){ return ['approved','rejected','declined','cancelled'].indexOf(q.status) !== -1; };
  h += sec('Waiting for you', all.filter(reqNeedsMe), 'Nothing to answer.');
  if (me) h += sec('My requests', all.filter(function(q){ return q.requester === me; }).slice(0, 12), 'To ask for a change, tap one of your shifts on the Schedule.');
  if (mgr) h += sec('Waiting for a colleague', all.filter(function(q){ return q.status === 'asked' && !reqNeedsMe(q) && q.requester !== me; }));
  if (mgr) h += sec('Recently decided', all.filter(function(q){ return decided(q) && q.requester !== me; }).slice(0, 12), 'No decisions yet.');
  el.innerHTML = h;
}
var reqShift = null, reqBusy = false;
function openShiftRequest(shiftId) {
  var db = getDB(), s = db.shifts.find(function(x){ return x.id === shiftId; }); if (!s) return;
  if (!sbCols.requests) { toast('Shift requests are not switched on yet.', 'error'); return; }
  reqShift = s;
  document.getElementById('req-shift-info').innerHTML = '<b>' + esc(reqDateLabel(s)) + '</b> · ' + esc(snapLabel(s))
    + (s.zone ? ' · ' + esc(s.zone + (effectiveSection(s) ? ' ' + effectiveSection(s) : '')) : '');
  document.querySelector('input[name="req-kind"][value="times"]').checked = true;
  document.getElementById('req-start').value = s.start; document.getElementById('req-end').value = s.end;
  document.getElementById('req-note').value = '';
  var others = (db.employees || []).filter(function(e){ return e !== s.employee; }).sort();
  document.getElementById('req-colleague').innerHTML = '<option value="">Choose a colleague</option>' + others.map(function(e){
    var cs = db.shifts.find(function(x){ return x.employee === e && x.weekStart === s.weekStart && x.day === s.day; });
    return '<option value="' + esc(e) + '">' + esc(e) + ' · ' + esc(snapLabel(shiftSnap(cs))) + '</option>';
  }).join('');
  reqKindChanged();
  closeModal('modal-shift-action'); openModal('modal-shift-request');
}
function reqKindChanged() {
  var k = (document.querySelector('input[name="req-kind"]:checked') || {}).value;
  document.getElementById('req-times').style.display = k === 'times' ? '' : 'none';
  document.getElementById('req-swap').style.display = k === 'swap' ? '' : 'none';
  document.querySelectorAll('.req-kind').forEach(function(l){ l.classList.toggle('is-on', l.querySelector('input').checked); });
  reqSwapHint();
}
function reqSwapHint() {
  var hint = document.getElementById('req-swap-hint'); if (!hint || !reqShift) return;
  var c = document.getElementById('req-colleague').value; if (!c) { hint.textContent = ''; return; }
  var cs = getDB().shifts.find(function(x){ return x.employee === c && x.weekStart === reqShift.weekStart && x.day === reqShift.day; });
  hint.textContent = (cs && !cs.dayOff) ? 'You work ' + c + "'s shift (" + snapLabel(shiftSnap(cs)) + ') and ' + c + ' works yours.' : c + ' works your shift and you get the day off.';
}
function sendShiftRequest() {
  if (reqBusy || !reqShift) return;
  var s = reqShift, db = getDB(), k = (document.querySelector('input[name="req-kind"]:checked') || {}).value || 'times';
  var q = { id: uid(), createdAt: new Date().toISOString(), kind:k, status: k === 'swap' ? 'asked' : 'pending', requester:s.employee,
    requesterUserId: currentUser ? currentUser.id : '', weekStart:s.weekStart, day:s.day, shiftId:s.id, snap: shiftSnap(s),
    newStart:'', newEnd:'', colleague:'', colleagueSnap:null, note:(document.getElementById('req-note').value || '').trim() };
  if (k === 'times') {
    q.newStart = document.getElementById('req-start').value; q.newEnd = document.getElementById('req-end').value;
    if (!q.newStart || !q.newEnd) { toast('Fill in the new start and end', 'error'); return; }
    if (q.newStart === s.start && q.newEnd === s.end) { toast('Those are your current times', 'error'); return; }
  }
  if (k === 'swap') {
    q.colleague = document.getElementById('req-colleague').value;
    if (!q.colleague) { toast('Choose a colleague', 'error'); return; }
    q.colleagueSnap = shiftSnap(db.shifts.find(function(x){ return x.employee === q.colleague && x.weekStart === s.weekStart && x.day === s.day; }));
  }
  if (openRequestFor(s.employee, s.weekStart, s.day)) { toast('There is already an open request for this shift', 'error'); return; }
  reqBusy = true;
  sbFetch('POST', 'shift_requests', reqToRow(q)).then(function(){
    reqBusy = false;
    var d = getDB(); d.shiftRequests = [q].concat(d.shiftRequests || []); saveDB(d);
    closeModal('modal-shift-request');
    toast(k === 'swap' ? 'Sent to ' + q.colleague + ' to agree' : 'Request sent to the managers', 'success');
    notifyRequest(q, 'created');
    updateRequestBadges(); if (currentShiftsTab === 'requests') renderShiftsRequestsTab();
  }).catch(function(){ reqBusy = false; toast('Not sent. Check the connection and try again.', 'error'); });
}
function notifyRequest(q, ev) {
  var when = reqDateLabel(q), url = '/?open=requests', what = when + ': ' + reqSummary(q);
  var requester = userIdsForEmployee(q.requester).concat(q.requesterUserId ? [q.requesterUserId] : []);
  if (ev === 'created' && q.kind === 'swap') sendPush(userIdsForEmployee(q.colleague), q.requester + ' asks you to cover or swap', what, url);
  else if (ev === 'created') sendPush(managerUserIds(), 'Shift request from ' + q.requester, what, url);
  else if (ev === 'accepted') { sendPush(managerUserIds(), 'Shift request from ' + q.requester, what + ' (' + q.colleague + ' agreed)', url); sendPush(requester, q.colleague + ' agreed', when + ': now waiting for a manager', url); }
  else if (ev === 'declined') sendPush(requester, q.colleague + ' declined', what, url);
  else if (ev === 'approved' || ev === 'rejected') {
    var ids = requester.concat(q.kind === 'swap' ? userIdsForEmployee(q.colleague) : []);
    sendPush(ids, ev === 'approved' ? 'Shift change approved' : 'Shift change not approved', what + (q.decisionNote ? ' · ' + q.decisionNote : ''), url);
  }
}
// Write a status change (local field names) to Supabase, then to the local copy
function reqUpdate(q, f) {
  var row = { updated_at: new Date().toISOString(), status: f.status };
  if (f.decidedBy !== undefined) row.decided_by = f.decidedBy;
  if (f.decidedAt !== undefined) row.decided_at = f.decidedAt;
  if (f.decisionNote !== undefined) row.decision_note = f.decisionNote;
  return sbFetch('PATCH', 'shift_requests', row, 'id=eq.' + encodeURIComponent(q.id)).then(function(){
    var d = getDB(), x = (d.shiftRequests || []).find(function(r){ return r.id === q.id; });
    if (x) Object.assign(x, f); saveDB(d); return x || Object.assign(q, f);
  });
}
// Re-read the request so nobody acts on one that was cancelled or answered meanwhile
function reqFresh(q) {
  return sbFetch('GET', 'shift_requests', null, 'id=eq.' + encodeURIComponent(q.id)).then(function(rows){
    var fresh = rows && rows[0] ? reqFromRow(rows[0]) : null;
    if (fresh && fresh.status === q.status) return fresh;
    var d = getDB(); d.shiftRequests = (d.shiftRequests || []).map(function(r){ return r.id === q.id ? fresh : r; }).filter(Boolean); saveDB(d);
    renderShiftsRequestsTab();
    toast(fresh ? 'This request is now: ' + reqStatusLabel(fresh) : 'This request no longer exists', 'error');
    return null;
  });
}
function reqAction(act, id) {
  var q = (getDB().shiftRequests || []).find(function(r){ return r.id === id; }); if (!q || reqBusy) return;
  var who = currentUser ? currentUser.name : '', now = new Date().toISOString();
  var fail = function(){ reqBusy = false; toast('Not saved. Check the connection and try again.', 'error'); };
  var done = function(msg, ev){ return function(x){ reqBusy = false; renderShiftsRequestsTab(); if (msg) toast(msg, 'success'); if (ev) notifyRequest(x, ev); }; };
  if (act === 'cancel' && !confirm('Cancel this request?')) return;
  if (act === 'decline' && !confirm('Decline ' + q.requester + "'s request?")) return;
  var note = '';
  if (act === 'reject') { note = prompt('Reason (optional, ' + q.requester + ' will see it)', ''); if (note === null) return; note = note.trim(); }
  reqBusy = true;
  reqFresh(q).then(function(fq){
    if (!fq) { reqBusy = false; return; }
    if (act === 'cancel')  return reqUpdate(fq, { status:'cancelled' }).then(done('Request cancelled'));
    if (act === 'accept')  return reqUpdate(fq, { status:'pending' }).then(done('Agreed. A manager will confirm.', 'accepted'));
    if (act === 'decline') return reqUpdate(fq, { status:'declined', decidedBy:who, decidedAt:now }).then(done('Declined', 'declined'));
    if (act === 'reject')  return reqUpdate(fq, { status:'rejected', decidedBy:who, decidedAt:now, decisionNote:note }).then(done('Request rejected', 'rejected'));
    if (act === 'approve') return applyShiftRequest(fq).then(function(ok){
      if (!ok) { reqBusy = false; return; }
      return reqUpdate(fq, { status:'approved', decidedBy:who, decidedAt:now }).then(function(x){
        done('Approved and changed on the schedule', 'approved')(x);
        refreshSection('shifts');
      });
    });
  }).catch(fail);
}
function shiftAt(db, emp, ws, day) { return db.shifts.find(function(x){ return x.employee === emp && x.weekStart === ws && x.day === day; }); }
function snapSame(a, b) { if (!a || !b) return !a && !b; return a.start === b.start && a.end === b.end && !!a.dayOff === !!b.dayOff; }
// Apply an approved request to the schedule. Resolves true when every write succeeded.
function applyShiftRequest(q) {
  var db = getDB();
  var mine = shiftAt(db, q.requester, q.weekStart, q.day);
  var theirs = q.kind === 'swap' ? shiftAt(db, q.colleague, q.weekStart, q.day) : null;
  if (!mine) { toast(q.requester + ' has no shift on that day any more', 'error'); return Promise.resolve(false); }
  var changed = !snapSame(shiftSnap(mine), q.snap) || (q.kind === 'swap' && !snapSame(shiftSnap(theirs), q.colleagueSnap));
  if (changed && !confirm('The schedule changed since this request was made. Apply it to the current shifts anyway?')) return Promise.resolve(false);
  var body = function(s){ return { start:s.start, end:s.end, role:s.role || '', zone:s.zone || '', section:s.section || '', dayOff:!!s.dayOff, lateMinutes:0, overtimeMinutes:0 }; };
  var off = { dayOff:true, lateMinutes:0, overtimeMinutes:0 };
  var ops = [];   // [new shift state, is it a new row]
  if (q.kind === 'times')  ops.push([Object.assign({}, mine, { start:q.newStart, end:q.newEnd, lateMinutes:0, overtimeMinutes:0 }), false]);
  if (q.kind === 'dayoff') ops.push([Object.assign({}, mine, off), false]);
  if (q.kind === 'swap') {
    if (theirs && !theirs.dayOff) {            // both working: exchange the shifts
      ops.push([Object.assign({}, mine, body(theirs)), false]);
      ops.push([Object.assign({}, theirs, body(mine)), false]);
    } else {                                   // colleague off or not scheduled: they cover, requester gets the day off
      if (theirs) ops.push([Object.assign({}, theirs, body(mine)), false]);
      else ops.push([Object.assign(body(mine), { id:uid(), employee:q.colleague, day:q.day, weekStart:q.weekStart, createdAt:new Date().toISOString() }), true]);
      ops.push([Object.assign({}, mine, off), false]);
    }
  }
  return Promise.all(ops.map(function(op){
    var row = shiftToRow(op[0]);
    return op[1] ? sbFetch('POST', 'shifts', row) : sbFetch('PATCH', 'shifts', row, shiftSlotFilter(op[0].employee, op[0].weekStart, op[0].day));
  })).then(function(){
    var d = getDB();
    ops.forEach(function(op){ var n = op[0], cur = shiftAt(d, n.employee, n.weekStart, n.day); if (cur) Object.assign(cur, n); else d.shifts.push(n); });
    saveDB(d); if (currentSection === 'shifts') renderShifts();
    return true;
  }).catch(function(){ toast('Could not update the schedule, so the request was not approved. Try again.', 'error'); refreshSection('shifts'); return false; });
}

// A reservation was booked: tell everyone (not the person who booked it); tapping opens that day
function notifyNewReservation(r) {
  var db = getDB(), me = currentUser ? currentUser.id : '';
  var ids = (db.appUsers || []).filter(function(u){ return u.active !== false && u.id !== me; }).map(function(u){ return u.id; });
  var d = new Date(r.date + 'T00:00:00');
  var when = DAYS[(d.getDay() + 6) % 7].slice(0,3) + ' ' + d.getDate() + ' ' + MONTH_NAMES[d.getMonth()] + ', ' + r.time + (r.endTime ? '–' + r.endTime : '');
  var tables = (r.tables || []).join(', ');
  sendPush(ids, 'New reservation: ' + r.guestName, r.guests + (r.guests == 1 ? ' person' : ' people') + ' · ' + when + (tables ? ' · ' + tables : '') + (r.notes ? ' · ' + r.notes : ''), '/?open=reservations&date=' + r.date);
}

// ── Tell the team a week's shifts are ready ──────────────────────
// Everyone active gets a push; people on the schedule see their own days in it.
// Weeks the team was told about: shared in settings.week_notices (all managers' devices), with a per-device copy
function weekNotified() {
  var m = {}; try { m = JSON.parse(localStorage.getItem('bdp_week_notified') || '{}'); } catch (e) {}
  var shared = getDB().weekNotices || {}; Object.keys(shared).forEach(function(k){ m[k] = shared[k]; });
  return m;
}
function markWeekNotified(ws) {
  var now = new Date().toISOString(), local = {};
  try { local = JSON.parse(localStorage.getItem('bdp_week_notified') || '{}'); } catch (e) {}
  local[ws] = now; try { localStorage.setItem('bdp_week_notified', JSON.stringify(local)); } catch (e) {}
  var db = getDB(), m = Object.assign({}, db.weekNotices || {}); m[ws] = now;
  Object.keys(m).sort().slice(0, -26).forEach(function(k){ delete m[k]; });   // keep about half a year
  db.weekNotices = m; saveDB(db);
  if (sbCols.weekNotices) sbFetch('PATCH', 'settings', { week_notices: m }, 'id=eq.config').catch(function(){});
}
// After a week was announced, tell the person when their upcoming shifts change
function shiftChangeLine(prev, next) {
  var s = next || prev, d = new Date(s.weekStart + 'T00:00:00'); d.setDate(d.getDate() + DAYS.indexOf(s.day));
  if (toDateStr(d) < toDateStr(new Date())) return '';            // past days do not matter any more
  var label = s.day.slice(0,3) + ' ' + d.getDate() + ' ' + MONTH_NAMES[d.getMonth()];
  var when = function(x){ return x.dayOff ? 'day off' : wkTime(x.start) + '–' + wkTime(x.end); };
  var where = function(x){ return (x.dayOff || !x.zone) ? '' : x.zone + (effectiveSection(x) ? ' · ' + effectiveSection(x) : ''); };
  if (!prev) return label + ': new, ' + when(next) + (where(next) ? ' (' + where(next) + ')' : '');
  if (!next) return label + ': removed (was ' + when(prev) + ')';
  var sameTime = !!prev.dayOff === !!next.dayOff && (next.dayOff || (prev.start === next.start && prev.end === next.end));
  var samePlace = where(prev) === where(next);
  if (sameTime && samePlace) return '';
  if (sameTime) return label + ': ' + when(next) + ', now ' + (where(next) || 'no area');
  return label + ': ' + when(next) + (!samePlace && where(next) ? ' (' + where(next) + ')' : '') + ', was ' + when(prev);
}
function alertShiftChanges(emp, ws, lines) {
  lines = (lines || []).filter(Boolean);
  if (!lines.length || !weekNotified()[ws]) return;
  var me = currentUser ? currentUser.id : '';
  var ids = userIdsForEmployee(emp).filter(function(id){ return id !== me; });
  if (!ids.length) return;
  sendPush(ids, lines.length === 1 ? 'Your shift changed' : 'Your shifts changed', lines.join(' · '), '/?open=shifts&week=' + ws);
  setTimeout(function(){ toast(emp + ' was notified of the change', 'success'); }, 1400);
}
function pushOne(userId, title, body, url) {
  return fetch('/api/push/send', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ userIds:[userId], title:title, body:body, url:url }) })
    .then(function(r){ return r.json(); }).then(function(d){ return (d && d.sent) || 0; }).catch(function(){ return 0; });
}
function myWeekLine(db, emp, wsStr) {
  return DAYS.map(function(d){
    var s = shiftAt(db, emp, wsStr, d); if (!s) return '';
    return d.slice(0,3) + ' ' + (s.dayOff ? 'off' : wkTime(s.start) + '–' + wkTime(s.end));
  }).filter(Boolean).join(' · ');
}
function notifyWeekShifts(wsStr) {
  var db = getDB(), me = currentUser ? currentUser.id : '';
  var working = db.shifts.filter(function(s){ return s.weekStart === wsStr; });
  if (!working.length) { toast('No shifts in ' + weekRangeLabel(wsStr) + ' yet', 'error'); return; }
  var people = (db.appUsers || []).filter(function(u){ return u.active !== false && u.id !== me; });
  var prev = weekNotified()[wsStr];
  if (!confirm((prev ? 'The team was already told on ' + reqWhen(prev) + '. Send again? ' : '')
    + 'Tell ' + people.length + ' people that the shifts for ' + weekRangeLabel(wsStr) + ' are ready? Everyone on the schedule sees their own days.')) return;
  var url = '/?open=shifts&week=' + wsStr, range = weekRangeLabel(wsStr, true);
  toast('Sending…');
  Promise.all(people.map(function(u){
    var emp = employeeForUser(u, db), line = emp ? myWeekLine(db, emp, wsStr) : '';
    return line ? pushOne(u.id, 'Your shifts: ' + range, line, url)
                : pushOne(u.id, 'Shifts are out: ' + range, 'The schedule for the week is ready. Tap to see it.', url);
  })).then(function(counts){
    var reached = counts.filter(function(n){ return n > 0; }).length;
    markWeekNotified(wsStr);
    if (currentSection === 'shifts') renderShifts();
    toast('Sent to ' + reached + ' of ' + people.length + ' people' + (reached < people.length ? '. The others have not turned notifications on.' : ''), reached ? 'success' : 'error');
  });
}

// ================================================
// ACCOUNTING
// ================================================
// A year of revenue and costs, month by month. Revenue comes from the daily closes (Finance);
// costs are entered here: wages, supplier invoices, fixed costs and daily expenses.
// Every amount is one row in acc_entries; lists, wage rules and history live in settings.accounting.
var ACC_FIXED_DEFAULT = ['Renda','Luz','Água','Vodafone','Segurança social','AT','IVA','Contabilidade','Renda casa Neto','Renda casa Marcelo','Prestação VW','Prestação Citroen','Prestação Opel','Armazém','Seguros','Redes sociais'];
var ACC_EXPENSE_DEFAULT = ['Diversos','Filtros','Mel','Azeitonas','Gás','Laranjas','Mexilhão','Músicos'];
var ACC_WAGE_PARTS = [['payslip','Payslip'],['ticket','Meal ticket'],['cash','Cash'],['extras','Extras']];
var ACC_KIND_LABEL = { supplier:'Supplier', expense:'Expense', fixed:'Fixed cost' };
var accYear = new Date().getFullYear(), accMonth = new Date().getMonth() + 1, accTab = 'summary', accBusy = false;
var accLedger = null;   // { kind, line } open in the ledger sheet

function accCfg() {
  var c = getDB().accConfig || {};
  // keep every stored key (e.g. foodCostTarget) so saving one setting never drops another
  return Object.assign({}, c, { fixedLines: c.fixedLines || ACC_FIXED_DEFAULT.slice(), expenseCats: c.expenseCats || ACC_EXPENSE_DEFAULT.slice(),
    wageRules: c.wageRules || [], history: c.history || [] });
}
function saveAccCfg(c) {
  var db = getDB(); db.accConfig = c; saveDB(db);
  if (sbCols.accConfig) writeAccountingCfg(c).catch(function(){ toast('Not saved online. Check the connection.', 'error'); });
}
// "1.234,56", "1234.56", "€ 45" -> number; '' -> null
function accNum(raw) {
  var t = String(raw == null ? '' : raw).replace(/[\\s€]/g, '');
  if (t === '') return null;
  if (t.indexOf(',') !== -1 && t.indexOf('.') !== -1) t = t.lastIndexOf(',') > t.lastIndexOf('.') ? t.replace(/\\./g, '').replace(',', '.') : t.replace(/,/g, '');
  else t = t.replace(',', '.');
  return parseFloat(t);
}
function accSum(arr, f) { return arr.reduce(function(a, x){ return a + (f ? (x[f] || 0) : x); }, 0); }
function accRows(y, kind, m) { return (getDB().accEntries || []).filter(function(e){ return e.year === y && (!kind || e.kind === kind) && (!m || e.month === m); }); }
function accSame(a, b) { return normName(a) === normName(b); }
function accEur(v) { var n = Math.round((v || 0) * 100) / 100; return (n < 0 ? '−€' : '€') + Math.abs(n).toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
function accEur0(v) { return (v < 0 ? '−€' : '€') + Math.round(Math.abs(v || 0)).toLocaleString('pt-PT'); }
function accMonthLabel(y, m) { return MONTH_NAMES[m - 1] + ' ' + y; }
function accPrevMonth(y, m) { return m === 1 ? [y - 1, 12] : [y, m - 1]; }

// Revenue of a month: the daily closes when there are any, otherwise imported sales (Caixa 1 + Caixa FCP)
function accRevenue(y, m) {
  var ym = y + '-' + String(m).padStart(2, '0');
  var fin = (getDB().finEntries || []).filter(function(e){ return e.date && e.date.slice(0, 7) === ym; });
  if (fin.length) {
    var day = accSum(fin, 'totalDay'), surf = accSum(fin, 'surf');
    // Surf is shown for reference but is not part of the bar's revenue
    return { day: day, surf: surf, total: day, source: 'closes', days: fin.length, genExp: accSum(fin, 'genExpenses') };
  }
  var imp = accRows(y, 'revenue', m), lines = {};
  imp.forEach(function(e){ lines[e.line] = (lines[e.line] || 0) + e.amount; });
  var days = {}; imp.forEach(function(e){ if (e.date) days[e.date] = 1; });
  var tot = accSum(imp, 'amount');
  return { day: tot, surf: 0, total: tot, source: imp.length ? 'imported' : '', days: Object.keys(days).length, genExp: 0, lines: lines };
}
// Wages: manual amounts, plus "percentage of the month's revenue" rules where no amount was typed
function accYm(s) { var p = String(s || '').split('-'); return (+p[0]) * 100 + (+p[1] || 1); }
function accWageRule(person, part, y, m) {
  var ym = y * 100 + m;
  return accCfg().wageRules.find(function(r){ return accSame(r.person, person) && r.part === part && (!r.from || ym >= accYm(r.from)); }) || null;
}
function accWages(y, m) {
  var rows = accRows(y, 'wage', m), people = [], rev = null;
  rows.forEach(function(e){ if (!people.some(function(p){ return accSame(p, e.line); })) people.push(e.line); });
  return people.map(function(p){
    var parts = {}, total = 0;
    ACC_WAGE_PARTS.forEach(function(pp){
      var es = rows.filter(function(e){ return accSame(e.line, p) && e.part === pp[0]; }), v = 0, auto = false, rule = null;
      if (es.length) v = accSum(es, 'amount');
      else { rule = accWageRule(p, pp[0], y, m); if (rule) { if (rev === null) rev = accRevenue(y, m).total; v = Math.round(rev * rule.pct) / 100; auto = true; } }
      parts[pp[0]] = { v: v, auto: auto, rule: rule, set: es.length > 0 }; total += v;
    });
    return { person: p, parts: parts, total: total };
  }).sort(function(a, b){ return a.person.localeCompare(b.person); });
}
function accMonthTotals(y, m) {
  var rev = accRevenue(y, m);
  var staff = accSum(accWages(y, m), 'total');
  var suppliers = accSum(accRows(y, 'supplier', m), 'amount');
  var fixed = accSum(accRows(y, 'fixed', m), 'amount');
  var expenses = accSum(accRows(y, 'expense', m), 'amount') + (rev.genExp || 0);
  var costs = staff + suppliers + fixed + expenses;
  return { rev: rev, staff: staff, suppliers: suppliers, fixed: fixed, expenses: expenses, costs: costs, balance: rev.total - costs, any: rev.total > 0 || costs > 0 };
}

// ── data in / out ──
function accLoad() {
  var y = accYear, yrs = [y - 1, y];
  var sync = document.getElementById('acc-sync-note');
  invoicesLoad();
  return Promise.all([
    sbFetchAll('acc_entries', 'year=in.(' + yrs.join(',') + ')&order=id.asc').then(function(rows){ return rows || []; }),
    sbFetchAll('fin_entries', 'date=gte.' + (y - 1) + '-01-01&date=lte.' + y + '-12-31&order=date.asc,id.asc').catch(function(){ return null; }),
    readAccountingCfg()
  ]).then(function(res){
    var db = getDB();
    sbCols.acc = true;
    db.accEntries = (db.accEntries || []).filter(function(e){ return yrs.indexOf(e.year) === -1; }).concat(res[0].map(accFromRow));
    if (res[1]) {
      var byId = {}; (db.finEntries || []).forEach(function(e){ byId[e.id] = e; });
      res[1].forEach(function(r){ if (!byId[r.id]) (db.finEntries = db.finEntries || []).push({ id: r.id, date: r.date, t51: parseFloat(r.t51)||0, totalDay: parseFloat(r.total_day)||0, surf: parseFloat(r.surf)||0, genExpenses: parseFloat(r.gen_expenses)||0, invoiced: parseFloat(r.invoiced)||0 }); });
    }
    if (res[2] && res[2].ok) { sbCols.accConfig = true; db.accConfig = res[2].v || {}; }
    saveDB(db);
    if (sync) sync.textContent = '';
    if (currentSection === 'accounting') renderAccounting();
  }).catch(function(){
    sbCols.acc = false;
    if (sync) sync.textContent = 'Accounting is not switched on yet: run the accounting SQL in Supabase.';
    if (currentSection === 'accounting') renderAccounting();
  });
}
function accFromRow(r) { return { id: r.id, year: +r.year, month: +r.month, kind: r.kind, line: r.line || '', part: r.part || '', date: r.date || '', amount: parseFloat(r.amount) || 0, note: r.note || '' }; }
function accToRow(e) { return { id: e.id, year: e.year, month: e.month, kind: e.kind, line: e.line, part: e.part || '', date: e.date || null, amount: e.amount, note: e.note || '' }; }
function accAdd(list) {
  if (!sbCols.acc) { toast('Accounting is not switched on yet (SQL missing)', 'error'); return Promise.reject(); }
  list = list.map(function(e){ return Object.assign({ id: uid(), part: '', date: '', note: '' }, e); });
  return sbFetch('POST', 'acc_entries', list.map(accToRow)).then(function(){
    var db = getDB(); db.accEntries = (db.accEntries || []).concat(list); saveDB(db); return list;
  }).catch(function(e){ toast('Not saved online. Check the connection.', 'error'); throw e; });
}
function accDelete(ids) {
  if (!ids.length) return Promise.resolve();
  return sbFetch('DELETE', 'acc_entries', null, 'id=in.(' + ids.map(encodeURIComponent).join(',') + ')').then(function(){
    var db = getDB(); db.accEntries = (db.accEntries || []).filter(function(e){ return ids.indexOf(e.id) === -1; }); saveDB(db);
  }).catch(function(e){ toast('Not saved online. Check the connection.', 'error'); throw e; });
}
// Replace every amount of one cell (line / part / month) with a single value ('' = empty)
function accSetCell(kind, y, m, line, part, raw) {
  var old = accRows(y, kind, m).filter(function(e){ return accSame(e.line, line) && (e.part || '') === (part || ''); }).map(function(e){ return e.id; });
  var v = accNum(raw);
  if (v !== null && isNaN(v)) { toast('Not a number', 'error'); renderAccounting(); return; }
  accDelete(old).then(function(){ return v === null ? null : accAdd([{ year: y, month: m, kind: kind, line: line, part: part || '', amount: Math.round(v * 100) / 100 }]); })
    .then(function(){ renderAccounting(); }).catch(function(){ renderAccounting(); });
}

// ── Invoices: the supplier invoices with their photo, grouped by supplier, with a paid tick ──
var invFilter = 'open', invSupplier = null, invFile = null, invFileUrl = '', invSaving = false;
function invFromRow(r) {
  return { id:r.id, supplierId:r.supplier_id||'', supplierName:r.supplier_name||'', supplierNif:r.supplier_nif||'', number:r.number||'', date:r.date, dueDate:r.due_date||'',
    net:r.net==null?null:parseFloat(r.net), vat:r.vat==null?null:parseFloat(r.vat), total:parseFloat(r.total)||0, paid:!!r.paid, paidAt:r.paid_at||'', notes:r.notes||'',
    photoPath:r.photo_path||'', source:r.source||'manual', createdAt:r.created_at||'' };
}
function invoicesLoad() {
  if (!isAdmin) return Promise.resolve();
  return sbFetchAll('invoices', 'order=date.desc,created_at.desc').then(function(rows){
    var db = getDB(); sbCols.invoices = true; db.invoices = (rows || []).map(invFromRow); saveDB(db);
  }).catch(function(){ sbCols.invoices = false; }).then(function(){
    invUpdateBadge();
    if (currentSection === 'accounting' && accTab === 'invoices') renderAccounting();
  });
}
function invoices() { return getDB().invoices || []; }
function invUpdateBadge() {
  var b = document.getElementById('acc-inv-badge'); if (!b) return;
  var n = invoices().filter(function(i){ return !i.paid; }).length;
  b.textContent = n; b.style.display = n ? '' : 'none';
}
function invDateTxt(d) { if (!d) return ''; var x = new Date(d + 'T12:00:00'); return isNaN(x) ? d : x.toLocaleDateString('pt-PT'); }
function invIsOverdue(i) { return !i.paid && i.dueDate && i.dueDate < toDateStr(new Date()); }
function invSupplierKey(i) { return i.supplierId || ('name:' + normName(i.supplierName)); }
function invFiltered() {
  return invoices().filter(function(i){ return invFilter === 'all' || (invFilter === 'paid' ? i.paid : !i.paid); });
}
function accInvoicesHTML() {
  var all = invoices(), open = all.filter(function(i){ return !i.paid; }), owed = open.reduce(function(s, i){ return s + i.total; }, 0);
  var h = '';
  if (sbCols.invoices === false) h += '<div class="req-banner"><i class="fas fa-circle-info"></i> Invoices switch on once the invoices SQL has run in Supabase.</div>';
  h += '<div class="acc-toolbar"><button class="btn btn-primary btn-sm" id="btn-inv-photo"><i class="fas fa-camera"></i> Photo / file</button>'
    + '<button class="btn btn-secondary btn-sm" id="btn-inv-add"><i class="fas fa-plus"></i> Without photo</button></div>';
  h += '<div class="inv-filters"><div class="fc-switch" role="tablist">'
    + '<button class="' + (invFilter === 'open' ? 'active' : '') + '" data-inv-filter="open">To pay <span>' + open.length + '</span></button>'
    + '<button class="' + (invFilter === 'paid' ? 'active' : '') + '" data-inv-filter="paid">Paid <span>' + (all.length - open.length) + '</span></button>'
    + '<button class="' + (invFilter === 'all' ? 'active' : '') + '" data-inv-filter="all">All <span>' + all.length + '</span></button></div>'
    + '<div class="inv-owed">Still to pay: <b>' + accEur(owed) + '</b></div></div>';
  var list = invFiltered();
  if (invSupplier) {
    var mine = list.filter(function(i){ return invSupplierKey(i) === invSupplier; }).sort(function(a, b){ return String(b.date).localeCompare(String(a.date)); });
    var any = all.filter(function(i){ return invSupplierKey(i) === invSupplier; });
    var name = any.length ? any[0].supplierName : '', sOwed = any.filter(function(i){ return !i.paid; }).reduce(function(s, i){ return s + i.total; }, 0), sTot = any.reduce(function(s, i){ return s + i.total; }, 0);
    h += '<div class="acc-toolbar"><button class="btn btn-secondary btn-sm inv-back" id="inv-back"><i class="fas fa-arrow-left"></i> Suppliers</button>'
      + '<div class="acc-toolbar-title">' + esc(name) + ' <span>' + any.length + ' invoice' + (any.length === 1 ? '' : 's') + ' · ' + accEur(sTot) + (sOwed > 0 ? ' · <b style="color:var(--red)">' + accEur(sOwed) + ' to pay</b>' : '') + '</span></div></div>';
    if (!mine.length) { h += '<div class="empty-state"><i class="fas fa-file-invoice"></i><p>No ' + (invFilter === 'paid' ? 'paid' : invFilter === 'open' ? 'unpaid' : '') + ' invoices for ' + esc(name) + '.</p></div>'; return h; }
    h += '<div class="acc-card" style="padding:0">' + mine.map(function(i){
      var over = invIsOverdue(i);
      return '<div class="inv-row" data-inv-open="' + esc(i.id) + '" role="button" tabindex="0">'
        + '<button class="inv-tick' + (i.paid ? ' on' : '') + '" data-inv-paid="' + esc(i.id) + '" aria-pressed="' + i.paid + '" title="' + (i.paid ? 'Paid' + (i.paidAt ? ' ' + invDateTxt(i.paidAt) : '') + ' — tap to undo' : 'Tap when paid') + '"><i class="fas ' + (i.paid ? 'fa-square-check' : 'fa-square') + '"></i></button>'
        + '<div class="inv-main"><div class="inv-name">' + (i.number ? esc(i.number) : '<span style="color:var(--slate-500)">no number</span>') + (i.photoPath ? '<i class="fas fa-paperclip" style="color:var(--slate-400);font-size:12px"></i>' : '') + (i.source === 'qr' ? '<i class="fas fa-qrcode" style="color:var(--teal-600);font-size:12px" title="Read from the QR code"></i>' : '') + '</div>'
        + '<div class="inv-sub' + (over ? ' over' : '') + '">' + invDateTxt(i.date) + (i.dueDate ? ' · due ' + invDateTxt(i.dueDate) + (over ? ' (overdue)' : '') : '') + (i.paid && i.paidAt ? ' · paid ' + invDateTxt(i.paidAt) : '') + '</div></div>'
        + '<div class="inv-amt' + (i.paid ? '' : ' owed') + '"><b>' + accEur(i.total) + '</b>' + (i.net != null ? '<small>' + accEur(i.net) + ' + VAT ' + accEur(i.vat || 0) + '</small>' : '') + '</div></div>';
    }).join('') + '</div>';
    return h;
  }
  // grouped by supplier
  var groups = {};
  list.forEach(function(i){ var k = invSupplierKey(i); (groups[k] = groups[k] || { key:k, name:i.supplierName, n:0, total:0, owed:0, over:false, last:'' }); var g = groups[k]; g.n++; g.total += i.total; if (!i.paid) g.owed += i.total; if (invIsOverdue(i)) g.over = true; if (i.date > g.last) g.last = i.date; });
  var gs = Object.keys(groups).map(function(k){ return groups[k]; }).sort(function(a, b){ return (b.owed - a.owed) || a.name.localeCompare(b.name); });
  if (!gs.length) { h += '<div class="empty-state"><i class="fas fa-file-invoice"></i><p>' + (all.length ? 'Nothing ' + (invFilter === 'paid' ? 'paid yet' : 'left to pay') + '.' : 'No invoices yet. Tap Photo / file to add the first one.') + '</p></div>'; return h; }
  h += '<div class="acc-card" style="padding:0">' + gs.map(function(g){
    return '<div class="inv-row" data-inv-supplier="' + esc(g.key) + '" role="button" tabindex="0">'
      + '<div class="inv-main"><div class="inv-name">' + esc(g.name) + (g.over ? '<span class="inv-pill over">Overdue</span>' : '') + '</div>'
      + '<div class="inv-sub">' + g.n + ' invoice' + (g.n === 1 ? '' : 's') + (g.last ? ' · last ' + invDateTxt(g.last) : '') + '</div></div>'
      + '<div class="inv-amt' + (g.owed > 0 ? ' owed' : '') + '"><b>' + accEur(g.owed > 0 ? g.owed : g.total) + '</b><small>' + (g.owed > 0 ? 'to pay' + (g.total > g.owed ? ' of ' + accEur(g.total) : '') : 'all paid') + '</small></div>'
      + '<i class="fas fa-chevron-right" style="color:var(--slate-400)"></i></div>';
  }).join('') + '</div>';
  return h;
}
// ── QR code on Portuguese invoices (the AT code): supplier NIF, date, number, VAT and total ──
var jsQRLoading = null, invQr = null;
function loadJsQR() {
  if (window.jsQR) return Promise.resolve(window.jsQR);
  if (jsQRLoading) return jsQRLoading;
  jsQRLoading = new Promise(function(resolve, reject){
    var sc = document.createElement('script'); sc.src = 'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js';
    sc.onload = function(){ resolve(window.jsQR); }; sc.onerror = function(){ jsQRLoading = null; reject(new Error('jsQR')); };
    document.head.appendChild(sc);
  });
  return jsQRLoading;
}
// Decode from the original photo: a moderate size first (fast), then bigger (a small QR in a tall photo)
function invReadQr(file) {
  if (!/^image/.test(file.type)) return Promise.resolve(null);
  return loadJsQR().then(function(jsQR){
    return new Promise(function(resolve){
      var url = URL.createObjectURL(file), img = new Image();
      img.onload = function(){
        var W = img.naturalWidth, H = img.naturalHeight, big = Math.max(W, H), found = null, tried = [];
        [1400, 2200, 3200].forEach(function(max){
          if (found) return;
          var k = Math.min(1, max / big); if (tried.indexOf(k) !== -1) return; tried.push(k);
          var c = document.createElement('canvas'); c.width = Math.round(W * k); c.height = Math.round(H * k);
          var ctx = c.getContext('2d', { willReadFrequently: true }); ctx.drawImage(img, 0, 0, c.width, c.height);
          try { var d = ctx.getImageData(0, 0, c.width, c.height); var r = jsQR(d.data, d.width, d.height, { inversionAttempts: 'dontInvert' }); if (r && r.data) found = r.data; } catch (e) {}
        });
        URL.revokeObjectURL(url); resolve(found);
      };
      img.onerror = function(){ URL.revokeObjectURL(url); resolve(null); };
      img.src = url;
    });
  }).catch(function(){ return null; });
}
// A:NIF of the issuer*B:customer NIF*…*F:date*G:number*H:ATCUD*I2..I8:bases and VAT by rate*N:total VAT*O:total
function invParseAtQr(text) {
  if (!text || text.indexOf('A:') !== 0 || text.indexOf('*') === -1) return null;
  var f = {}; text.split('*').forEach(function(p){ var i = p.indexOf(':'); if (i > 0) f[p.slice(0, i)] = p.slice(i + 1).trim(); });
  if (!f.A || !/^[0-9]{9}$/.test(f.A) || f.O === undefined) return null;
  var num = function(k){ var v = parseFloat(f[k]); return isNaN(v) ? 0 : v; };
  var total = num('O'), vat = f.N !== undefined ? num('N') : (num('I4') + num('I6') + num('I8'));
  var date = /^[0-9]{8}$/.test(f.F || '') ? f.F.slice(0, 4) + '-' + f.F.slice(4, 6) + '-' + f.F.slice(6, 8) : '';
  return { nif: f.A, customerNif: f.B || '', date: date, number: f.G || '', atcud: f.H || '', docType: f.D || '', total: Math.round(total * 100) / 100, vat: Math.round(vat * 100) / 100, net: Math.round((total - vat) * 100) / 100 };
}
function invSupplierByNif(nif) {
  if (!nif) return null;
  var s = (getDB().suppliers || []).find(function(x){ return (x.nif || '') === nif; }); if (s) return s;
  // a supplier that was used before with this NIF (named when the first invoice was saved)
  var inv = invoices().find(function(i){ return i.supplierNif === nif && i.supplierId; });
  return inv ? (getDB().suppliers || []).find(function(x){ return x.id === inv.supplierId; }) || null : null;
}
function invQrNote(cls, html) { var n = document.getElementById('inv-qr-note'); if (!n) return; n.className = 'inv-qr-note ' + cls; n.innerHTML = html; n.style.display = ''; }
function invDuplicateOf(nif, number, supplierId, exceptId) {
  if (!number) return null;
  return invoices().find(function(i){ return i.id !== exceptId && normName(i.number) === normName(number) && ((nif && i.supplierNif === nif) || (supplierId && i.supplierId === supplierId)); }) || null;
}
// Fill the new-invoice form from the QR code; the person checks and saves
function invApplyQr(q) {
  invQr = q;
  var sup = invSupplierByNif(q.nif), sel = document.getElementById('inv-supplier');
  if (sup) { sel.value = sup.id; document.getElementById('inv-new-supplier-row').style.display = 'none'; }
  else { sel.value = '__new__'; var row = document.getElementById('inv-new-supplier-row'); row.style.display = ''; var nm = document.getElementById('inv-supplier-name'); nm.value = ''; nm.placeholder = 'Name for NIF ' + q.nif + ' (asked once)'; }
  document.getElementById('inv-number').value = q.number;
  if (q.date) document.getElementById('inv-date').value = q.date;
  document.getElementById('inv-total').value = accIn(q.total); document.getElementById('inv-vat').value = accIn(q.vat); document.getElementById('inv-net').value = accIn(q.net);
  invCheckAmounts();
  var dup = invDuplicateOf(q.nif, q.number, sup ? sup.id : '', '');
  if (dup) { invQrNote('bad', '<i class="fas fa-triangle-exclamation"></i><span><b>Already saved:</b> ' + esc(dup.number) + ' from ' + esc(dup.supplierName) + ' on ' + invDateTxt(dup.date) + ' (' + accEur(dup.total) + ').</span>'); return; }
  var what = q.docType === 'NC' ? ' <b>This is a credit note (NC)</b> — check the sign of the amounts.' : '';
  invQrNote('ok', '<i class="fas fa-qrcode"></i><span><b>Read from the QR code.</b> ' + (sup ? esc(sup.name) : 'New supplier — type its name once') + ' · ' + esc(q.number || 'no number') + ' · ' + accEur(q.total) + '.' + what + ' Check and save.</span>');
  if (!sup) setTimeout(function(){ var nm2 = document.getElementById('inv-supplier-name'); if (nm2) nm2.focus(); }, 50);
}
// photos: shrink on the phone before upload (a 12 MP photo becomes ~400 KB), PDFs go as they are
function invCompress(file) {
  if (!/^image\\//.test(file.type)) return Promise.resolve(file);
  return new Promise(function(resolve){
    var url = URL.createObjectURL(file), img = new Image();
    img.onload = function(){
      var max = 2400, k = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
      var c = document.createElement('canvas'); c.width = Math.round(img.naturalWidth * k); c.height = Math.round(img.naturalHeight * k);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height); URL.revokeObjectURL(url);
      c.toBlob(function(b){ resolve(b || file); }, 'image/jpeg', 0.82);
    };
    img.onerror = function(){ URL.revokeObjectURL(url); resolve(file); };
    img.src = url;
  });
}
function invUpload(path, blob) {
  return fetch(SB_URL + '/storage/v1/object/invoices/' + path, { method:'POST', headers:{ 'Content-Type': blob.type || 'application/octet-stream', 'x-upsert':'true' }, body: blob })
    .then(function(r){ if (!r.ok) return r.text().then(function(t){ throw new Error('Photo not uploaded (' + r.status + '): ' + t.slice(0, 120)); }); });
}
function invSignedUrl(path) {
  return fetch(SB_URL + '/storage/v1/object/sign/invoices/' + path, { method:'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify({ expiresIn: 3600 }) })
    .then(function(r){ return r.ok ? r.json() : null; }).then(function(j){ return j && j.signedURL ? SB_URL + '/storage/v1' + j.signedURL : ''; }).catch(function(){ return ''; });
}
function invRemoveFile(path) {
  if (!path) return Promise.resolve();
  return fetch(SB_URL + '/storage/v1/object/invoices', { method:'DELETE', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify({ prefixes:[path] }) }).catch(function(){});
}
function invRenderPhotoBox(existingPath) {
  var box = document.getElementById('inv-photo-box'); if (!box) return;
  var btn = '<div class="inv-photo-actions"><button type="button" class="btn btn-secondary btn-sm" id="btn-inv-change-photo"><i class="fas fa-camera"></i> ' + (invFile || existingPath ? 'Change photo' : 'Add photo / file') + '</button>' + (invFile ? '<span class="acc-note" style="align-self:center">' + Math.round(invFile.size / 1024) + ' KB</span>' : '') + '</div>';
  if (invFile) { box.innerHTML = (invFile.type === 'application/pdf' ? '<p class="acc-note"><i class="fas fa-file-pdf"></i> PDF attached</p>' : '<img src="' + invFileUrl + '" alt="Invoice photo" />') + btn; return; }
  if (!existingPath) { box.innerHTML = btn; return; }
  box.innerHTML = '<p class="acc-note">Loading photo…</p>' + btn;
  invSignedUrl(existingPath).then(function(u){
    var b2 = document.getElementById('inv-photo-box'); if (!b2 || document.getElementById('inv-edit-id').value !== invPhotoFor) return;
    b2.innerHTML = (u ? (/\\.pdf$/i.test(existingPath) ? '<p><a class="btn btn-secondary btn-sm" href="' + esc(u) + '" target="_blank" rel="noopener"><i class="fas fa-file-pdf"></i> Open PDF</a></p>' : '<a href="' + esc(u) + '" target="_blank" rel="noopener"><img src="' + esc(u) + '" alt="Invoice photo" /></a>') : '<p class="acc-note">Photo not available.</p>') + btn;
  });
}
var invPhotoFor = '';
function invSetFile(file) {
  if (!file) return;
  if (file.size > 25 * 1024 * 1024) { toast('That file is too big (max 25 MB)', 'error'); return; }
  var wasOpen = document.getElementById('modal-invoice').classList.contains('open');
  var isNew = !wasOpen || !document.getElementById('inv-edit-id').value;
  invCompress(file).then(function(blob){
    invFile = blob; if (invFileUrl) URL.revokeObjectURL(invFileUrl); invFileUrl = blob.type === 'application/pdf' ? '' : URL.createObjectURL(blob);
    if (!wasOpen) openInvoiceModal(null, true); else invRenderPhotoBox('');
    if (!isNew) return;
    if (!/^image/.test(file.type)) { invQrNote('none', '<i class="fas fa-file-pdf"></i><span>PDF attached. Type the figures (reading PDFs comes with the next step).</span>'); return; }
    invQrNote('busy', '<i class="fas fa-spinner fa-spin"></i><span>Reading the QR code…</span>');
    var mine = file;
    invReadQr(mine).then(function(text){
      if (!document.getElementById('modal-invoice').classList.contains('open') || invFile !== blob) return;   // moved on meanwhile
      var q = invParseAtQr(text);
      if (q) invApplyQr(q);
      else invQrNote('none', '<i class="fas fa-circle-info"></i><span>' + (text ? 'The QR code is not an invoice code.' : 'No QR code could be read.') + ' Type the figures, or retake the photo closer with the QR code sharp and well lit.</span>');
    });
  });
}
function invSupplierOptions(selectedId, selectedName) {
  var sup = (getDB().suppliers || []).slice().sort(function(a, b){ return a.name.localeCompare(b.name); });
  var sel = selectedId && sup.some(function(s){ return s.id === selectedId; }) ? selectedId : (selectedName ? (sup.find(function(s){ return accSame(s.name, selectedName); }) || {}).id || '' : '');
  return '<option value="">Choose…</option>' + sup.map(function(s){ return '<option value="' + esc(s.id) + '"' + (s.id === sel ? ' selected' : '') + '>' + esc(s.name) + '</option>'; }).join('') + '<option value="__new__">＋ New supplier…</option>';
}
function openInvoiceModal(id, keepFile) {
  var i = id ? invoices().find(function(x){ return x.id === id; }) : null;
  if (!i && sbCols.invoices === false) { toast('Invoices switch on once the invoices SQL has run in Supabase', 'error'); return; }
  if (!keepFile) { invFile = null; if (invFileUrl) URL.revokeObjectURL(invFileUrl); invFileUrl = ''; }
  invPhotoFor = i ? i.id : '';
  document.getElementById('inv-edit-id').value = i ? i.id : '';
  document.getElementById('inv-modal-title').textContent = i ? 'Invoice' : 'New invoice';
  document.getElementById('inv-supplier').innerHTML = invSupplierOptions(i ? i.supplierId : '', i ? i.supplierName : '');
  document.getElementById('inv-new-supplier-row').style.display = 'none'; document.getElementById('inv-supplier-name').value = '';
  if (i && !document.getElementById('inv-supplier').value) { document.getElementById('inv-supplier').value = '__new__'; document.getElementById('inv-new-supplier-row').style.display = ''; document.getElementById('inv-supplier-name').value = i.supplierName; }
  document.getElementById('inv-number').value = i ? i.number : '';
  document.getElementById('inv-date').value = i ? i.date : toDateStr(new Date());
  document.getElementById('inv-due').value = i ? i.dueDate : '';
  document.getElementById('inv-total').value = i && i.total ? accIn(i.total) : '';
  document.getElementById('inv-net').value = i && i.net != null ? accIn(i.net) : '';
  document.getElementById('inv-vat').value = i && i.vat != null ? accIn(i.vat) : '';
  document.getElementById('inv-paid').checked = !!(i && i.paid);
  var pd = document.getElementById('inv-paid-date'); pd.style.display = i && i.paid ? '' : 'none'; pd.value = i && i.paidAt ? i.paidAt : toDateStr(new Date());
  document.getElementById('inv-notes').value = i ? i.notes : '';
  document.getElementById('btn-delete-invoice').style.display = i ? '' : 'none';
  document.getElementById('inv-warn').style.display = 'none';
  invQr = null; var qn = document.getElementById('inv-qr-note'); qn.style.display = 'none'; qn.innerHTML = '';
  document.getElementById('inv-supplier-name').placeholder = 'e.g. Bidfood';
  invRenderPhotoBox(i ? i.photoPath : '');
  invCheckAmounts();
  openModal('modal-invoice');
  if (!i) setTimeout(function(){ var el = document.getElementById(invFile ? 'inv-supplier' : 'inv-supplier'); if (el) el.focus(); }, 50);
}
// net + VAT = total: fill in whichever one is missing, warn when the three disagree
function invAmt(id) { var v = document.getElementById(id).value.trim(); return v === '' ? null : accNum(v); }
function invCheckAmounts(fromId) {
  var net = invAmt('inv-net'), vat = invAmt('inv-vat'), tot = invAmt('inv-total'), w = document.getElementById('inv-warn');
  var ok = function(v){ return v !== null && !isNaN(v); };
  if (fromId) {
    if (ok(net) && ok(vat) && !ok(tot)) document.getElementById('inv-total').value = accIn(net + vat);
    else if (ok(net) && ok(tot) && !ok(vat) && fromId !== 'inv-vat') document.getElementById('inv-vat').value = accIn(tot - net);
    else if (ok(vat) && ok(tot) && !ok(net) && fromId !== 'inv-net') document.getElementById('inv-net').value = accIn(tot - vat);
    net = invAmt('inv-net'); vat = invAmt('inv-vat'); tot = invAmt('inv-total');
  }
  if (ok(net) && ok(vat) && ok(tot) && Math.abs(net + vat - tot) > 0.02) { w.textContent = 'Without VAT + VAT = ' + accEur(net + vat) + ', but the total says ' + accEur(tot) + '. Check the figures.'; w.style.display = ''; }
  else w.style.display = 'none';
}
function invEnsureSupplier() {
  var sel = document.getElementById('inv-supplier').value;
  if (sel && sel !== '__new__') { var s = (getDB().suppliers || []).find(function(x){ return x.id === sel; }); return Promise.resolve(s ? { id:s.id, name:s.name, nif:s.nif || '' } : null); }
  var name = document.getElementById('inv-supplier-name').value.trim(); if (!name) return Promise.resolve(null);
  var db = getDB(), existing = (db.suppliers || []).find(function(x){ return accSame(x.name, name); });
  if (existing) return Promise.resolve({ id:existing.id, name:existing.name, nif:existing.nif || '' });
  var nif = invQr && !document.getElementById('inv-edit-id').value ? invQr.nif : '';
  var row = { id:uid(), name:name, email:'', phone:'', nif:nif, send_email:false, categories:[], total_spend:0 };
  return sbFetch('POST', 'suppliers', row).then(function(rows){
    var id = rows && rows[0] ? rows[0].id : row.id;
    db = getDB(); db.suppliers = (db.suppliers || []).concat([{ id:id, name:name, email:'', phone:'', nif:nif, sendEmail:false, categories:[], totalSpend:0, createdAt:new Date().toISOString() }]); saveDB(db);
    if (typeof updateAllDropdowns === 'function') updateAllDropdowns();
    return { id:id, name:name, nif:nif };
  });
}
function saveInvoice() {
  if (invSaving) return;
  var id = document.getElementById('inv-edit-id').value, old = id ? invoices().find(function(x){ return x.id === id; }) : null;
  var date = document.getElementById('inv-date').value, tot = invAmt('inv-total'), net = invAmt('inv-net'), vat = invAmt('inv-vat');
  if (!document.getElementById('inv-supplier').value || (document.getElementById('inv-supplier').value === '__new__' && !document.getElementById('inv-supplier-name').value.trim())) { toast('Choose the supplier', 'error'); return; }
  if (!date) { toast('Pick the invoice date', 'error'); return; }
  if (tot === null || isNaN(tot) || tot < 0) { toast('Type the total with VAT', 'error'); return; }
  if ((net !== null && isNaN(net)) || (vat !== null && isNaN(vat))) { toast('Check the amounts', 'error'); return; }
  var paid = document.getElementById('inv-paid').checked, paidAt = paid ? (document.getElementById('inv-paid-date').value || toDateStr(new Date())) : null;
  var btn = document.getElementById('btn-save-invoice'); invSaving = true; btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + (invFile ? 'Uploading…' : 'Saving…');
  var newId = id || uid(), path = old ? old.photoPath : '';
  var qrNif = invQr && !old ? invQr.nif : '';
  invEnsureSupplier().then(function(sup){
    if (!sup) throw new Error('Choose the supplier');
    var dup = invDuplicateOf(qrNif || sup.nif || (old ? old.supplierNif : ''), document.getElementById('inv-number').value.trim(), sup.id, id);
    if (dup) throw new Error('Already saved: ' + dup.number + ' from ' + dup.supplierName + ' on ' + invDateTxt(dup.date));
    // the QR's NIF is remembered on the supplier, so the next invoice from them is matched by itself
    if (qrNif && !sup.nif) { sup.nif = qrNif; sbFetch('PATCH', 'suppliers', { nif: qrNif }, 'id=eq.' + encodeURIComponent(sup.id)).then(function(){ var d2 = getDB(); var s2 = (d2.suppliers || []).find(function(x){ return x.id === sup.id; }); if (s2) { s2.nif = qrNif; saveDB(d2); } }).catch(function(){}); }
    var up = Promise.resolve();
    if (invFile) { path = date.slice(0, 4) + '/' + date.slice(5, 7) + '/' + newId + (invFile.type === 'application/pdf' ? '.pdf' : '.jpg'); up = invUpload(path, invFile); }
    return up.then(function(){
      var row = { supplier_id:sup.id, supplier_name:sup.name, supplier_nif:qrNif || sup.nif || (old ? old.supplierNif : ''), number:document.getElementById('inv-number').value.trim(), date:date,
        due_date:document.getElementById('inv-due').value || null, net:net === null ? null : Math.round(net * 100) / 100, vat:vat === null ? null : Math.round(vat * 100) / 100, total:Math.round(tot * 100) / 100,
        paid:paid, paid_at:paidAt, notes:document.getElementById('inv-notes').value.trim(), photo_path:path, updated_at:new Date().toISOString() };
      if (old) return sbFetch('PATCH', 'invoices', row, 'id=eq.' + encodeURIComponent(id)).then(function(rows){ return rows && rows[0] ? rows[0] : Object.assign({ id:id, created_at:old.createdAt }, row); });
      row.id = newId; row.source = invQr ? 'qr' : 'manual'; row.created_by = currentUser ? currentUser.name : '';
      return sbFetch('POST', 'invoices', row).then(function(rows){ return rows && rows[0] ? rows[0] : Object.assign({ created_at:new Date().toISOString() }, row); });
    }).then(function(saved){
      if (old && invFile && old.photoPath && old.photoPath !== path) invRemoveFile(old.photoPath);
      var db = getDB(); db.invoices = (db.invoices || []).filter(function(x){ return x.id !== saved.id; }).concat([invFromRow(saved)]); saveDB(db);
      invFile = null; if (invFileUrl) URL.revokeObjectURL(invFileUrl); invFileUrl = '';
      closeModal('modal-invoice'); invUpdateBadge(); renderAccounting();
      toast(old ? 'Invoice updated' : 'Invoice saved under ' + sup.name, 'success');
    });
  }).catch(function(e){ toast(e && e.message ? e.message : 'Not saved. Check the connection.', 'error'); })
    .then(function(){ invSaving = false; btn.disabled = false; btn.innerHTML = '<i class="fas fa-save"></i> Save'; });
}
function invSetPaid(id, on) {
  var db = getDB(), i = (db.invoices || []).find(function(x){ return x.id === id; }); if (!i) return;
  var patch = { paid:on, paid_at:on ? toDateStr(new Date()) : null, updated_at:new Date().toISOString() };
  i.paid = on; i.paidAt = patch.paid_at || ''; saveDB(db); invUpdateBadge(); renderAccounting();
  sbFetch('PATCH', 'invoices', patch, 'id=eq.' + encodeURIComponent(id)).catch(function(){ toast('Not saved. Check the connection.', 'error'); invoicesLoad(); });
}
function deleteInvoice() {
  var id = document.getElementById('inv-edit-id').value, i = invoices().find(function(x){ return x.id === id; }); if (!i) return;
  if (!confirm('Delete this invoice' + (i.number ? ' (' + i.number + ')' : '') + ' from ' + i.supplierName + '? The photo is deleted too.')) return;
  sbFetch('DELETE', 'invoices', null, 'id=eq.' + encodeURIComponent(id)).then(function(){
    invRemoveFile(i.photoPath);
    var db = getDB(); db.invoices = (db.invoices || []).filter(function(x){ return x.id !== id; }); saveDB(db);
    closeModal('modal-invoice'); invUpdateBadge(); renderAccounting(); toast('Invoice deleted');
  }).catch(function(){ toast('Not deleted. Check the connection.', 'error'); });
}

// ── screen ──
function renderAccounting() {
  var locked = document.getElementById('acc-locked'), content = document.getElementById('acc-content');
  // Accounting is for admins only (wages, margins, every cost)
  if (!isAdmin) { locked.style.display = 'flex'; content.style.display = 'none'; document.getElementById('acc-body').innerHTML = ''; return; }
  locked.style.display = 'none'; content.style.display = 'block';
  document.getElementById('acc-year-label').textContent = accYear;
  document.querySelectorAll('[data-acc-tab]').forEach(function(b){ b.classList.toggle('active', b.dataset.accTab === accTab); });
  var body = document.getElementById('acc-body');
  if (accTab === 'foodcost') accTab = 'summary';
  var html = { summary: accSummaryHTML, revenue: accRevenueHTML, wages: accWagesHTML, suppliers: accSuppliersHTML, invoices: accInvoicesHTML, fixed: accFixedHTML, expenses: accExpensesHTML }[accTab]();
  body.innerHTML = html;
  if (accTab === 'summary') { var ch = document.getElementById('acc-chart'); if (ch) drawAccChart(ch); }
}
function accMonthBar() {
  var h = '<div class="acc-months" role="tablist" aria-label="Month">';
  for (var m = 1; m <= 12; m++) {
    var t = accMonthTotals(accYear, m);
    h += '<button class="acc-month' + (m === accMonth ? ' active' : '') + (t.any ? ' has' : '') + '" data-acc-month="' + m + '">' + MONTH_NAMES[m - 1] + '</button>';
  }
  return h + '</div>';
}
function accKpi(label, value, sub, cls) { return '<div class="acc-kpi"><div class="acc-kpi-label">' + label + '</div><div class="acc-kpi-num ' + (cls || '') + '">' + value + '</div><div class="acc-kpi-sub">' + (sub || '') + '</div></div>'; }
function accIn(v) { return String(Math.round(v * 100) / 100).replace('.', ','); }   // amount shown in an input box
function accPct(a, b) { return b > 0 ? Math.round(a / b * 100) + '%' : '—'; }

function accSummaryHTML() {
  var months = [], tot = { rev: 0, staff: 0, suppliers: 0, fixed: 0, expenses: 0, costs: 0, surf: 0 }, prevRev = 0, prevMatched = 0;
  for (var m = 1; m <= 12; m++) {
    var t = accMonthTotals(accYear, m); t.m = m; t.prev = accRevenue(accYear - 1, m).total;
    if (t.any) { months.push(t); tot.rev += t.rev.total; tot.surf += t.rev.surf; tot.staff += t.staff; tot.suppliers += t.suppliers; tot.fixed += t.fixed; tot.expenses += t.expenses; tot.costs += t.costs; if (t.prev > 0 && t.rev.total > 0) { prevRev += t.prev; prevMatched += t.rev.total; } }
  }
  if (!months.length) return '<div class="empty-state"><i class="fas fa-scale-balanced"></i><p>No figures for ' + accYear + ' yet.</p></div>';
  var bal = tot.rev - tot.costs, vs = prevRev > 0 ? Math.round((prevMatched - prevRev) / prevRev * 100) : null;
  var h = '<div class="acc-kpis">'
    + accKpi('Revenue ' + accYear, accEur0(tot.rev), vs === null ? '' : (vs >= 0 ? '+' : '') + vs + '% vs ' + (accYear - 1) + ' (same months)')
    + accKpi('Costs', accEur0(tot.costs), 'Staff ' + accPct(tot.staff, tot.rev) + ' · Suppliers ' + accPct(tot.suppliers, tot.rev) + ' of revenue')
    + accKpi('Balance', accEur0(bal), 'Margin ' + accPct(bal, tot.rev), bal < 0 ? 'neg' : 'pos')
    + '</div>';
  h += '<div class="acc-card"><div class="fin-chart" id="acc-chart"></div></div>';
  var rowsDef = [
    ['Revenue', function(t){ return t.rev.total; }, 'strong'],
    [' Surf (not in revenue)', function(t){ return t.rev.surf; }, 'sub', function(){ return tot.surf > 0; }],
    ['Staff', function(t){ return t.staff; }],
    ['Suppliers', function(t){ return t.suppliers; }],
    ['Fixed costs', function(t){ return t.fixed; }],
    ['Daily expenses', function(t){ return t.expenses; }],
    ['Total costs', function(t){ return t.costs; }, 'strong'],
    ['Balance', function(t){ return t.balance; }, 'strong bal']
  ];
  h += '<div class="acc-card acc-scroll"><table class="acc-table"><thead><tr><th></th>' + months.map(function(t){ return '<th>' + MONTH_NAMES[t.m - 1] + '</th>'; }).join('') + '<th>Year</th></tr></thead><tbody>';
  rowsDef.forEach(function(rd){
    if (rd[3] && !rd[3]()) return;
    var ys = accSum(months.map(rd[1]));
    h += '<tr class="' + (rd[2] || '') + '"><th>' + rd[0] + '</th>' + months.map(function(t){ var v = rd[1](t); return '<td class="' + (rd[2] && rd[2].indexOf('bal') !== -1 && v < 0 ? 'neg' : '') + '">' + (v ? accEur0(v) : '—') + '</td>'; }).join('') + '<td class="' + (rd[2] && rd[2].indexOf('bal') !== -1 && ys < 0 ? 'neg' : '') + '">' + accEur0(ys) + '</td></tr>';
  });
  h += '<tr class="pct"><th>Staff % of revenue</th>' + months.map(function(t){ return '<td>' + accPct(t.staff, t.rev.total) + '</td>'; }).join('') + '<td>' + accPct(tot.staff, tot.rev) + '</td></tr>';
  h += '<tr class="pct"><th>Suppliers % of revenue</th>' + months.map(function(t){ return '<td>' + accPct(t.suppliers, t.rev.total) + '</td>'; }).join('') + '<td>' + accPct(tot.suppliers, tot.rev) + '</td></tr>';
  if (months.some(function(t){ return t.prev > 0; })) h += '<tr class="pct"><th>Revenue vs ' + (accYear - 1) + '</th>' + months.map(function(t){ return '<td>' + (t.prev > 0 ? ((t.rev.total >= t.prev ? '+' : '') + Math.round((t.rev.total - t.prev) / t.prev * 100) + '%') : '—') + '</td>'; }).join('') + '<td>' + (vs === null ? '—' : (vs >= 0 ? '+' : '') + vs + '%') + '</td></tr>';
  h += '</tbody></table></div>';
  return h;
}
function drawAccChart(el) {
  var W = Math.max(300, Math.floor(el.clientWidth || 600)), H = 170, padL = 44, padR = 6, padT = 18, padB = 22;
  var plotW = W - padL - padR, plotH = H - padT - padB, rev = [], cost = [], maxV = 0, now = new Date();
  for (var m = 1; m <= 12; m++) { var t = accMonthTotals(accYear, m); rev.push(t.rev.total); cost.push(t.costs); maxV = Math.max(maxV, t.rev.total, t.costs); }
  var yMax = finNiceMax(maxV * 1.05), y = function(v){ return padT + plotH - (v / yMax) * plotH; };
  var band = plotW / 12, barW = Math.min(24, Math.round(band * 0.55));
  var curIdx = (accYear === now.getFullYear()) ? now.getMonth() : -1;
  var svg = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" role="img" aria-label="Revenue and costs per month, ' + accYear + '">';
  [0, 0.5, 1].forEach(function(f){ var gy = y(yMax * f); svg += '<line class="' + (f === 0 ? 'fc-axis' : 'fc-grid') + '" x1="' + padL + '" x2="' + (W - padR) + '" y1="' + gy + '" y2="' + gy + '"/><text class="fc-tick" x="' + (padL - 6) + '" y="' + (gy + 3) + '" text-anchor="end">' + fmtEurShort(yMax * f) + '</text>'; });
  for (var i = 0; i < 12; i++) {
    var cx = padL + band * i + band / 2, a = rev[i], c = cost[i];
    svg += '<g class="fc-month-g" tabindex="0"><title>' + MONTH_NAMES[i] + ' ' + accYear + ': revenue ' + fmtEur(a) + ' · costs ' + fmtEur(c) + ' · balance ' + fmtEur(a - c) + '</title>';
    svg += '<rect class="fc-hit" x="' + (padL + band * i) + '" y="' + padT + '" width="' + band + '" height="' + plotH + '"/>';
    if (a > 0) {
      var top = y(a), x0 = cx - barW / 2, r = Math.min(4, barW / 2), hh = padT + plotH - top;
      svg += hh > r ? '<path class="fc-bar" d="M' + x0 + ' ' + (padT + plotH) + ' V' + (top + r) + ' a' + r + ' ' + r + ' 0 0 1 ' + r + ' -' + r + ' h' + (barW - 2 * r) + ' a' + r + ' ' + r + ' 0 0 1 ' + r + ' ' + r + ' V' + (padT + plotH) + ' Z"/>' : '<rect class="fc-bar" x="' + x0 + '" y="' + top + '" width="' + barW + '" height="' + hh + '"/>';
    }
    if (c > 0) { var cy = y(c); svg += '<line class="fc-budget" x1="' + (cx - barW / 2 - 3) + '" x2="' + (cx + barW / 2 + 3) + '" y1="' + cy + '" y2="' + cy + '"/>'; }
    if (i === curIdx && (a > 0 || c > 0)) svg += '<text class="fc-label" x="' + cx + '" y="' + (Math.min(a > 0 ? y(a) : H, c > 0 ? y(c) : H) - 6) + '" text-anchor="middle">' + fmtEurShort(a) + '</text>';
    svg += '<text class="fc-month' + (i === curIdx ? ' now' : '') + '" x="' + cx + '" y="' + (H - 7) + '" text-anchor="middle">' + (band >= 40 ? MONTH_NAMES[i] : MONTH_NAMES[i].charAt(0)) + '</text></g>';
  }
  svg += '</svg>';
  el.innerHTML = '<div class="fin-chart-head"><div class="fin-chart-title">' + accYear + ' · revenue and costs</div><div class="fin-chart-legend"><span><i class="sw-bar"></i>Revenue</span><span><i class="sw-line"></i>Costs</span></div></div><div class="fc-wrap">' + svg + '</div>';
}

function accRevenueHTML() {
  var h = '<div class="acc-card acc-scroll"><table class="acc-table"><thead><tr><th>Month</th><th>Total of the day</th><th>Revenue</th><th>Surf <small>(not in revenue)</small></th><th>Days</th><th>' + (accYear - 1) + '</th><th>Change</th></tr></thead><tbody>';
  var ty = 0, tp = 0, ts = 0, any = false;
  for (var m = 1; m <= 12; m++) {
    var r = accRevenue(accYear, m), p = accRevenue(accYear - 1, m).total;
    if (!r.total && !p && !r.surf) continue; any = true; ty += r.total; tp += p; ts += r.surf;
    var src = r.source === 'imported' ? ' <span class="acc-src" title="' + esc(Object.keys(r.lines).map(function(k){ return k + ' ' + accEur(r.lines[k]); }).join(' · ')) + '">imported</span>' : '';
    h += '<tr><th>' + MONTH_NAMES[m - 1] + src + '</th><td>' + (r.total ? accEur0(r.day) : '—') + '</td><td><b>' + (r.total ? accEur0(r.total) : '—') + '</b></td><td class="acc-ref">' + (r.surf ? accEur0(r.surf) : '—') + '</td><td>' + (r.days || '—') + '</td><td>' + (p ? accEur0(p) : '—') + '</td><td>' + (p && r.total ? ((r.total >= p ? '+' : '') + Math.round((r.total - p) / p * 100) + '%') : '—') + '</td></tr>';
  }
  if (!any) h += '<tr><td colspan="7" class="acc-empty">No revenue recorded in ' + accYear + '.</td></tr>';
  h += '<tr class="strong"><th>Year</th><td></td><td>' + accEur0(ty) + '</td><td class="acc-ref">' + (ts ? accEur0(ts) : '—') + '</td><td></td><td>' + (tp ? accEur0(tp) : '—') + '</td><td></td></tr></tbody></table></div>';
  h += '<p class="acc-note">Revenue is the daily close in Finance: Total of the day (Invoiced + T51). Surf is shown for reference only and is not added to revenue. Months without closes use the imported sales (Caixa 1 + Caixa FCP).</p>';
  var hist = accCfg().history.slice().sort(function(a, b){ return a.year - b.year; });
  var yearsSeen = hist.map(function(x){ return x.year; });
  [accYear - 1, accYear].forEach(function(yy){ if (yearsSeen.indexOf(yy) === -1) { var s = 0; for (var mm = 1; mm <= 12; mm++) s += accRevenue(yy, mm).total; if (s > 0) hist.push({ year: yy, total: s, live: true }); } });
  if (hist.length) {
    h += '<div class="acc-card"><div class="acc-card-title">Turnover by year</div><table class="acc-table acc-hist"><tbody>'
      + hist.map(function(x, i){ var prev = i ? hist[i - 1].total : 0; return '<tr><th>' + x.year + (x.live ? ' <span class="acc-src">from the app</span>' : '') + '</th><td>' + accEur0(x.total) + '</td><td>' + (prev ? ((x.total >= prev ? '+' : '') + Math.round((x.total - prev) / prev * 100) + '%') : '') + '</td></tr>'; }).join('')
      + '</tbody></table></div>';
  }
  return h;
}

function accWagesHTML() {
  var ws = accWages(accYear, accMonth), rev = accRevenue(accYear, accMonth).total;
  var h = accMonthBar() + '<div class="acc-toolbar"><div class="acc-toolbar-title">Wages · ' + accMonthLabel(accYear, accMonth) + '</div>'
    + '<button class="btn btn-secondary btn-sm" id="acc-wage-copy"><i class="fas fa-copy"></i> Copy last month</button>'
    + '<button class="btn btn-primary btn-sm" id="acc-wage-add"><i class="fas fa-user-plus"></i> Add person</button></div>';
  if (!ws.length) return h + '<div class="empty-state"><i class="fas fa-user-group"></i><p>No wages in ' + accMonthLabel(accYear, accMonth) + ' yet. Copy last month or add people.</p></div>';
  h += '<div class="acc-card acc-scroll"><table class="acc-table acc-edit"><thead><tr><th>Person</th>' + ACC_WAGE_PARTS.map(function(p){ return '<th>' + p[1] + '</th>'; }).join('') + '<th>Total</th><th></th></tr></thead><tbody>';
  var tot = {}; ACC_WAGE_PARTS.forEach(function(p){ tot[p[0]] = 0; });
  ws.forEach(function(w){
    h += '<tr><th>' + esc(w.person) + '</th>';
    ACC_WAGE_PARTS.forEach(function(p){
      var c = w.parts[p[0]]; tot[p[0]] += c.v;
      if (c.auto) h += '<td><button class="acc-auto" data-acc-rule="' + esc(w.person) + '|' + p[0] + '" title="' + c.rule.pct + '% of ' + accEur(rev) + ' revenue. Tap to change">' + accEur(c.v) + '<small>' + c.rule.pct + '% of revenue</small></button></td>';
      else h += '<td><input class="acc-in" inputmode="decimal" data-acc-cell="wage|' + esc(w.person) + '|' + p[0] + '" value="' + (c.set ? accIn(c.v) : '') + '" placeholder="0" aria-label="' + esc(w.person) + ' ' + p[1] + '" /></td>';
    });
    h += '<td><b>' + accEur(w.total) + '</b></td><td class="acc-row-acts"><button class="acc-icon" data-acc-rule="' + esc(w.person) + '|cash" title="Cash as a % of revenue" aria-label="Rule for ' + esc(w.person) + '"><i class="fas fa-percent"></i></button><button class="acc-icon" data-acc-wage-del="' + esc(w.person) + '" title="Remove from this month" aria-label="Remove ' + esc(w.person) + '"><i class="fas fa-xmark"></i></button></td></tr>';
  });
  var all = accSum(ws, 'total');
  h += '<tr class="strong"><th>Total</th>' + ACC_WAGE_PARTS.map(function(p){ return '<td>' + accEur(tot[p[0]]) + '</td>'; }).join('') + '<td>' + accEur(all) + '</td><td></td></tr></tbody></table></div>';
  h += '<p class="acc-note">Staff is ' + accPct(all, rev) + ' of ' + accMonthLabel(accYear, accMonth) + ' revenue. Leave a box empty for nothing; the <i class="fas fa-percent"></i> button sets an automatic "% of the month’s revenue" amount, which a typed amount overrides.</p>';
  return h;
}

// Suppliers and daily expenses: one line per supplier or category, each with its entries (invoices)
function accLedgerNames(kind) {
  var names = [];
  var push = function(n){ n = String(n || '').trim(); if (n && !names.some(function(x){ return accSame(x, n); })) names.push(n); };
  if (kind === 'supplier') (getDB().suppliers || []).forEach(function(s){ push(s.name); });
  if (kind === 'expense') accCfg().expenseCats.forEach(push);
  accRows(accYear, kind).forEach(function(e){ push(e.line); });
  return names;
}
function accLedgerHTML(kind) {
  var names = accLedgerNames(kind), rows = accRows(accYear, kind, accMonth);
  var list = names.map(function(n){
    var es = rows.filter(function(e){ return accSame(e.line, n); });
    var yearTot = accSum(accRows(accYear, kind).filter(function(e){ return accSame(e.line, n); }), 'amount');
    return { name: n, total: accSum(es, 'amount'), count: es.length, year: yearTot };
  }).sort(function(a, b){ return (b.total - a.total) || (b.year - a.year) || a.name.localeCompare(b.name); });
  var monthTot = accSum(list, 'total'), rev = accRevenue(accYear, accMonth);
  var title = kind === 'supplier' ? 'Suppliers' : 'Daily expenses';
  var h = accMonthBar() + '<div class="acc-toolbar"><div class="acc-toolbar-title">' + title + ' · ' + accMonthLabel(accYear, accMonth) + ' <span>' + accEur(monthTot + (kind === 'expense' ? rev.genExp : 0)) + '</span></div>'
    + '<button class="btn btn-primary btn-sm" data-acc-new-line="' + kind + '"><i class="fas fa-plus"></i> ' + (kind === 'supplier' ? 'Supplier' : 'Category') + '</button></div>';
  h += '<div class="acc-card acc-ledger">';
  if (kind === 'expense' && rev.genExp) h += '<div class="acc-line is-ro"><span class="acc-line-name">From the daily closes<small>General expenses in Finance</small></span><span class="acc-line-amt">' + accEur(rev.genExp) + '</span></div>';
  list.forEach(function(x){
    h += '<button class="acc-line' + (x.total ? '' : ' is-zero') + '" data-acc-open="' + kind + '|' + esc(x.name) + '"><span class="acc-line-name">' + esc(x.name)
      + '<small>' + (x.count ? x.count + (x.count === 1 ? ' entry' : ' entries') : 'Nothing this month') + (x.year ? ' · ' + accEur0(x.year) + ' in ' + accYear : '') + '</small></span><span class="acc-line-amt">' + (x.total ? accEur(x.total) : '—') + '</span><i class="fas fa-chevron-right"></i></button>';
  });
  h += '</div>';
  if (kind === 'supplier' && rev.total) h += '<p class="acc-note">Suppliers are ' + accPct(monthTot, rev.total) + ' of ' + accMonthLabel(accYear, accMonth) + ' revenue.</p>';
  return h;
}
function accSuppliersHTML() { return accLedgerHTML('supplier'); }
function accExpensesHTML() { return accLedgerHTML('expense'); }
function openAccLedger(kind, line) {
  accLedger = { kind: kind, line: line };
  document.getElementById('acc-ledger-title').textContent = line + ' · ' + accMonthLabel(accYear, accMonth);
  document.getElementById('acc-led-amount').value = ''; document.getElementById('acc-led-note').value = '';
  var ym = accYear + '-' + String(accMonth).padStart(2, '0'), today = toDateStr(new Date());
  document.getElementById('acc-led-date').value = today.slice(0, 7) === ym ? today : '';
  renderAccLedger(); openModal('modal-acc-ledger');
  setTimeout(function(){ var a = document.getElementById('acc-led-amount'); if (a) a.focus(); }, 200);
}
function renderAccLedger() {
  if (!accLedger) return;
  var es = accRows(accYear, accLedger.kind, accMonth).filter(function(e){ return accSame(e.line, accLedger.line); })
    .sort(function(a, b){ return String(a.date).localeCompare(String(b.date)) || a.id.localeCompare(b.id); });
  var el = document.getElementById('acc-ledger-list');
  el.innerHTML = es.length ? es.map(function(e){
    return '<div class="acc-entry"><span class="acc-entry-amt">' + accEur(e.amount) + '</span><span class="acc-entry-meta">' + (e.date ? esc(e.date.slice(8, 10) + ' ' + MONTH_NAMES[+e.date.slice(5, 7) - 1]) : '') + (e.note ? ' · ' + esc(e.note) : '') + '</span>'
      + '<button class="acc-icon" data-acc-entry-del="' + esc(e.id) + '" aria-label="Delete ' + accEur(e.amount) + '"><i class="fas fa-trash"></i></button></div>';
  }).join('') + '<div class="acc-entry is-total"><span class="acc-entry-amt">' + accEur(accSum(es, 'amount')) + '</span><span class="acc-entry-meta">Total, ' + es.length + (es.length === 1 ? ' entry' : ' entries') + '</span></div>'
    : '<div class="acc-empty">Nothing recorded this month.</div>';
}
function addAccLedgerEntry() {
  if (!accLedger || accBusy) return;
  var v = accNum(document.getElementById('acc-led-amount').value);
  if (v === null || isNaN(v)) { toast('Enter an amount', 'error'); return; }
  var date = document.getElementById('acc-led-date').value, month = accMonth, year = accYear;
  if (date) { year = +date.slice(0, 4); month = +date.slice(5, 7); }
  accBusy = true;
  accAdd([{ year: year, month: month, kind: accLedger.kind, line: accLedger.line, amount: Math.round(v * 100) / 100, date: date, note: (document.getElementById('acc-led-note').value || '').trim() }])
    .then(function(){ accBusy = false; document.getElementById('acc-led-amount').value = ''; document.getElementById('acc-led-note').value = '';
      if (year !== accYear || month !== accMonth) toast('Saved in ' + accMonthLabel(year, month) + ' (the date’s month)', 'success');
      renderAccLedger(); renderAccounting(); document.getElementById('acc-led-amount').focus(); })
    .catch(function(){ accBusy = false; });
}

function accFixedHTML() {
  var lines = accCfg().fixedLines.slice(), rows = accRows(accYear, 'fixed');
  rows.forEach(function(e){ if (!lines.some(function(l){ return accSame(l, e.line); })) lines.push(e.line); });
  var h = '<div class="acc-toolbar"><div class="acc-toolbar-title">Fixed costs · ' + accYear + '</div><button class="btn btn-primary btn-sm" data-acc-new-line="fixed"><i class="fas fa-plus"></i> Cost line</button></div>';
  h += '<div class="acc-card acc-scroll"><table class="acc-table acc-edit acc-fixed"><thead><tr><th>Cost</th>';
  for (var m = 1; m <= 12; m++) h += '<th>' + MONTH_NAMES[m - 1] + '</th>';
  h += '<th>Year</th></tr></thead><tbody>';
  var colTot = [0,0,0,0,0,0,0,0,0,0,0,0];
  lines.forEach(function(l){
    var yt = 0;
    h += '<tr><th><span>' + esc(l) + '</span><button class="acc-icon" data-acc-fill="' + esc(l) + '" title="Copy the first amount to the empty months after it" aria-label="Repeat ' + esc(l) + ' monthly"><i class="fas fa-angles-right"></i></button></th>';
    for (var m2 = 1; m2 <= 12; m2++) {
      var es = rows.filter(function(e){ return e.month === m2 && accSame(e.line, l); }), v = accSum(es, 'amount'); yt += v; colTot[m2 - 1] += v;
      h += '<td><input class="acc-in" inputmode="decimal" data-acc-cell="fixed|' + esc(l) + '||' + m2 + '" value="' + (es.length ? accIn(v) : '') + '" aria-label="' + esc(l) + ' ' + MONTH_NAMES[m2 - 1] + '" /></td>';
    }
    h += '<td><b>' + (yt ? accEur0(yt) : '—') + '</b></td></tr>';
  });
  h += '<tr class="strong"><th>Total</th>' + colTot.map(function(v){ return '<td>' + (v ? accEur0(v) : '—') + '</td>'; }).join('') + '<td>' + accEur0(accSum(colTot)) + '</td></tr></tbody></table></div>';
  h += '<p class="acc-note">Type an amount in a month; <i class="fas fa-angles-right"></i> repeats a line’s first amount in every empty month after it.</p>';
  return h;
}
function accFillLine(line) {
  var rows = accRows(accYear, 'fixed').filter(function(e){ return accSame(e.line, line); });
  var first = null; for (var m = 1; m <= 12 && first === null; m++) { var es = rows.filter(function(e){ return e.month === m; }); if (es.length) first = { m: m, v: accSum(es, 'amount') }; }
  if (!first) { toast('Type ' + line + '’s amount in its first month, then repeat it', 'error'); return; }
  var add = []; for (var m3 = first.m + 1; m3 <= 12; m3++) if (!rows.some(function(e){ return e.month === m3; })) add.push({ year: accYear, month: m3, kind: 'fixed', line: line, amount: first.v });
  if (!add.length) { toast('Every month after ' + MONTH_NAMES[first.m - 1] + ' already has an amount'); return; }
  if (!confirm('Put ' + accEur(first.v) + ' for ' + line + ' in ' + add.length + ' empty month' + (add.length === 1 ? '' : 's') + ' (' + MONTH_NAMES[add[0].month - 1] + '–Dec)?')) return;
  accAdd(add).then(function(){ renderAccounting(); toast('Repeated in ' + add.length + ' months', 'success'); }).catch(function(){});
}
function accCopyWages() {
  var pm = accPrevMonth(accYear, accMonth), src = accRows(pm[0], 'wage', pm[1]), cur = accRows(accYear, 'wage', accMonth);
  if (!src.length) { toast('Nothing to copy from ' + accMonthLabel(pm[0], pm[1]), 'error'); return; }
  var add = src.filter(function(e){ return !cur.some(function(c){ return accSame(c.line, e.line) && c.part === e.part; }); })
    .map(function(e){ return { year: accYear, month: accMonth, kind: 'wage', line: e.line, part: e.part, amount: e.amount }; });
  if (!add.length) { toast('Everyone from ' + accMonthLabel(pm[0], pm[1]) + ' is already here'); return; }
  if (!confirm('Copy ' + add.length + ' amounts from ' + accMonthLabel(pm[0], pm[1]) + '? You can change them afterwards.')) return;
  accAdd(add).then(function(){ renderAccounting(); toast('Copied from ' + accMonthLabel(pm[0], pm[1]), 'success'); }).catch(function(){});
}
function accAddPerson() {
  var have = accWages(accYear, accMonth).map(function(w){ return w.person; });
  var sugg = (getDB().employees || []).filter(function(e){ return !have.some(function(h){ return accSame(h, e); }); });
  var name = prompt('Name' + (sugg.length ? ' (e.g. ' + sugg.slice(0, 4).join(', ') + ')' : ''), sugg[0] || '');
  if (!name || !name.trim()) return;
  name = name.trim();
  var known = (getDB().employees || []).find(function(e){ return accSame(e, name); }); if (known) name = known;
  if (have.some(function(h){ return accSame(h, name); })) { toast(name + ' is already in ' + accMonthLabel(accYear, accMonth), 'error'); return; }
  accAdd([{ year: accYear, month: accMonth, kind: 'wage', line: name, part: 'payslip', amount: 0 }]).then(function(){ renderAccounting(); }).catch(function(){});
}
function accEditRule(person, part) {
  var c = accCfg(), r = c.wageRules.find(function(x){ return accSame(x.person, person) && x.part === part; });
  var label = (ACC_WAGE_PARTS.find(function(p){ return p[0] === part; }) || [part, part])[1];
  var ans = prompt(person + ': ' + label + ' as a % of each month’s revenue, from ' + accMonthLabel(accYear, accMonth) + ' on.\\nLeave empty to remove the rule.', r ? r.pct : '');
  if (ans === null) return;
  c.wageRules = c.wageRules.filter(function(x){ return !(accSame(x.person, person) && x.part === part); });
  var pct = parseFloat(String(ans).replace(',', '.'));
  if (String(ans).trim() !== '' && !(pct > 0 && pct < 100)) { toast('Enter a percentage between 0 and 100', 'error'); return; }
  if (pct > 0) c.wageRules.push({ person: person, part: part, pct: pct, from: (r && r.from && accYm(r.from) < accYear * 100 + accMonth) ? r.from : accYear + '-' + String(accMonth).padStart(2, '0') });
  saveAccCfg(c);
  var typed = accRows(accYear, 'wage', accMonth).filter(function(e){ return accSame(e.line, person) && e.part === part; });
  if (pct > 0 && typed.length && confirm('Remove the typed ' + label.toLowerCase() + ' amount in ' + accMonthLabel(accYear, accMonth) + ' so the rule applies?')) accDelete(typed.map(function(e){ return e.id; })).then(renderAccounting);
  else renderAccounting();
}
function accNewLine(kind) {
  var what = kind === 'supplier' ? 'Supplier name' : kind === 'expense' ? 'Expense category' : 'Fixed cost (e.g. Internet)';
  var name = prompt(what, ''); if (!name || !name.trim()) return; name = name.trim();
  if (kind === 'supplier') { openAccLedger('supplier', name); return; }
  var c = accCfg(), key = kind === 'fixed' ? 'fixedLines' : 'expenseCats';
  if (c[key].some(function(x){ return accSame(x, name); })) { toast(name + ' already exists', 'error'); return; }
  c[key].push(name); saveAccCfg(c); renderAccounting();
  if (kind === 'expense') openAccLedger('expense', name);
}

document.addEventListener('keydown', function(e){
  if (e.key === 'Enter' && e.target && (e.target.id === 'acc-led-amount' || e.target.id === 'acc-led-note')) { e.preventDefault(); addAccLedgerEntry(); }
  if (e.key === 'Enter' && e.target && e.target.classList && e.target.classList.contains('fc-row')) { e.target.click(); }
});
document.addEventListener('input', function(e){
  var t = e.target; if (!t || !t.dataset) return;
  if (t.dataset.fcLineQty !== undefined && fcEdit) {
    var ln = fcEdit.lines[+t.dataset.fcLineQty], v = accNum(t.value); ln.qty = v === null || isNaN(v) ? '' : v;
    var c = (ln.ing || ln.rec) ? fcLineCost(ln, [fcEdit.id]) : { cost: 0 };
    var cell = t.parentNode.querySelector('.fc-line-cost'); if (cell) cell.textContent = (ln.ing || ln.rec) && ln.qty ? accEur(c.cost) : '';
    renderFcTotals();
  }
  if (t.id === 'fc-dish-price' || t.id === 'fc-dish-portions') renderFcTotals();
  if (/^ly-(day|t51|surf)-\\d\\d$/.test(t.id || '')) updateLastYearTotals();
  if (t.id === 'fc-search') { fcSearch = t.value; var pos = t.selectionStart; renderFoodCost(); var ns = document.getElementById('fc-search'); if (ns) { ns.focus(); try { ns.setSelectionRange(pos, pos); } catch (er) {} } }
});

// ── Food cost: ingredients with prices, dishes with recipes ─────────────
// Ingredient price is per kg, litre or piece; yield % accounts for waste (e.g. 80% after peeling).
// A dish line is an ingredient (qty + unit) or another dish used as a base (qty in its portions).
var FC_UNITS = { kg: [['g', 0.001], ['kg', 1]], L: [['ml', 0.001], ['cl', 0.01], ['L', 1]], un: [['un', 1]] };
var fcView = 'dishes', fcSearch = '', fcEdit = null, fcIngEdit = null, fcBusy = false;
function canFoodCost() { return isAdmin || hasRole('chef'); }
function fcIngs() { return getDB().fcIngredients || []; }
function fcRecs() { return getDB().fcRecipes || []; }
// Target food cost %: kept in settings.accounting (admins set it); chefs read just this one value
function fcTarget() { var db = getDB(), c = db.accConfig || {}; return c.foodCostTarget || db.fcTarget || 30; }
function renderFoodCost() {
  var locked = document.getElementById('fc-locked'), content = document.getElementById('fc-content');
  if (!canFoodCost()) { locked.style.display = 'flex'; content.style.display = 'none'; document.getElementById('fc-body').innerHTML = ''; return; }
  locked.style.display = 'none'; content.style.display = 'block';
  document.getElementById('fc-body').innerHTML = accFoodCostHTML();
}
function fcFactor(ingUnit, lineUnit) { var u = (FC_UNITS[ingUnit] || FC_UNITS.un).find(function(x){ return x[0] === lineUnit; }); return u ? u[1] : 1; }
function fcLineCost(line, seen) {
  var q = parseFloat(line.qty) || 0;
  if (line.rec) {
    var r = fcRecs().find(function(x){ return x.id === line.rec; });
    if (!r || (seen || []).indexOf(r.id) !== -1) return { cost: 0, missing: true };
    var c = fcRecipeCost(r, (seen || []).concat([r.id]));
    return { cost: q * c.perPortion, missing: c.missing > 0 };
  }
  var ing = fcIngs().find(function(x){ return x.id === line.ing; });
  if (!ing) return { cost: 0, missing: true };
  var y = (ing.yieldPct > 0 ? ing.yieldPct : 100) / 100;
  return { cost: q * fcFactor(ing.unit, line.unit) * (ing.price || 0) / y, missing: !(ing.price > 0) };
}
function fcRecipeCost(r, seen) {
  var total = 0, missing = 0;
  (r.lines || []).forEach(function(l){ var c = fcLineCost(l, seen || [r.id]); total += c.cost; if (c.missing) missing++; });
  var portions = r.portions > 0 ? r.portions : 1, net = (r.price || 0) / (1 + (r.vat || 0) / 100), per = total / portions;
  return { total: total, perPortion: per, net: net, pct: net > 0 ? per / net * 100 : null, margin: net - per, missing: missing,
    targetPrice: per > 0 ? per / (fcTarget() / 100) * (1 + (r.vat || 0) / 100) : 0 };
}
function fcPctClass(p) { var t = fcTarget(); return p === null ? '' : p <= t ? 'ok' : p <= t + 5 ? 'warn' : 'bad'; }
function fcUsage(ingId) { return fcRecs().filter(function(r){ return (r.lines || []).some(function(l){ return l.ing === ingId; }); }); }
function fcUnitLabel(u) { return u === 'un' ? 'piece' : u; }

// data
function fcLoad() {
  return Promise.all([sbFetchAll('fc_ingredients', 'order=name.asc,id.asc'), sbFetchAll('fc_recipes', 'order=name.asc,id.asc'),
    readFoodCostTarget()]).then(function(res){
    var db = getDB(); sbCols.fc = true;
    if (res[2]) db.fcTarget = parseFloat(res[2]) || 30;
    db.fcIngredients = (res[0] || []).map(function(r){ return { id: r.id, name: r.name, unit: r.unit || 'kg', price: parseFloat(r.price) || 0, yieldPct: parseFloat(r.yield_pct) || 100, supplier: r.supplier || '', updatedAt: r.updated_at || '' }; });
    db.fcRecipes = (res[1] || []).map(function(r){ return { id: r.id, name: r.name, category: r.category || '', price: parseFloat(r.price) || 0, vat: r.vat == null ? 13 : parseFloat(r.vat), portions: parseFloat(r.portions) || 1, lines: Array.isArray(r.lines) ? r.lines : [], notes: r.notes || '', updatedAt: r.updated_at || '' }; });
    saveDB(db); if (currentSection === 'foodcost') renderFoodCost();
  }).catch(function(){ sbCols.fc = false; if (currentSection === 'foodcost') renderFoodCost(); });
}
function fcUpsert(table, row) {
  if (!sbCols.fc) { toast('Food cost is not switched on yet (SQL missing)', 'error'); return Promise.reject(); }
  return fetch(SB_URL + '/rest/v1/' + table + '?on_conflict=id', { method: 'POST', headers: { apikey: SB_KEY, Authorization: 'Bearer ' + SB_KEY, 'Content-Type': 'application/json', Prefer: 'resolution=merge-duplicates,return=minimal' }, body: JSON.stringify(row) })
    .then(function(r){ if (!r.ok) throw new Error('HTTP ' + r.status); })
    .catch(function(e){ toast('Not saved online. Check the connection.', 'error'); throw e; });
}

// screen (inside Accounting)
function accFoodCostHTML() {
  var t = fcTarget(), q = normName(fcSearch);
  var h = '<div class="acc-toolbar"><div class="fc-switch" role="tablist">'
    + '<button class="' + (fcView === 'dishes' ? 'active' : '') + '" data-fc-view="dishes">Dishes <span>' + fcRecs().length + '</span></button>'
    + '<button class="' + (fcView === 'ings' ? 'active' : '') + '" data-fc-view="ings">Ingredients <span>' + fcIngs().length + '</span></button></div>'
    + '<input class="input-field fc-search" id="fc-search" placeholder="Search" value="' + esc(fcSearch) + '" aria-label="Search" />'
    + (isAdmin ? '<button class="btn btn-secondary btn-sm" id="fc-target" title="Food cost % you aim for">Target ' + t + '%</button>' : '<span class="fc-target-ro">Target ' + t + '%</span>')
    + '<button class="btn btn-primary btn-sm" id="' + (fcView === 'dishes' ? 'fc-new-dish' : 'fc-new-ing') + '"><i class="fas fa-plus"></i> ' + (fcView === 'dishes' ? 'Dish' : 'Ingredient') + '</button></div>';
  if (!sbCols.fc) h += '<div class="req-banner"><i class="fas fa-circle-info"></i> Food cost switches on once the food cost SQL has run in Supabase.</div>';
  if (fcView === 'dishes') {
    var list = fcRecs().filter(function(r){ return !q || normName(r.name + ' ' + r.category).indexOf(q) !== -1; })
      .map(function(r){ return { r: r, c: fcRecipeCost(r) }; })
      .sort(function(a, b){ return (b.c.pct === null ? -1 : b.c.pct) - (a.c.pct === null ? -1 : a.c.pct) || a.r.name.localeCompare(b.r.name); });
    if (!list.length) return h + '<div class="empty-state"><i class="fas fa-utensils"></i><p>' + (fcRecs().length ? 'No dish matches.' : 'No dishes yet. Add your ingredients with their prices, then add a dish and its recipe.') + '</p></div>';
    h += '<div class="acc-card acc-scroll"><table class="acc-table fc-table"><thead><tr><th>Dish</th><th>Price</th><th>Cost / portion</th><th>Food cost</th><th>Margin</th></tr></thead><tbody>';
    list.forEach(function(x){
      h += '<tr class="fc-row" data-fc-dish="' + esc(x.r.id) + '" tabindex="0"><th>' + esc(x.r.name) + (x.r.category ? '<small>' + esc(x.r.category) + '</small>' : '') + (x.c.missing ? '<small class="fc-miss"><i class="fas fa-triangle-exclamation"></i> ' + x.c.missing + ' without a price</small>' : '') + '</th>'
        + '<td>' + (x.r.price ? accEur(x.r.price) : '—') + '</td><td>' + accEur(x.c.perPortion) + '</td>'
        + '<td>' + (x.c.pct === null ? '—' : '<span class="fc-pct ' + fcPctClass(x.c.pct) + '">' + x.c.pct.toFixed(1).replace('.', ',') + '%</span>') + '</td>'
        + '<td>' + (x.r.price ? accEur(x.c.margin) : '—') + '</td></tr>';
    });
    h += '</tbody></table></div><p class="acc-note">Food cost = ingredient cost per portion ÷ selling price without VAT. Green is at or under your ' + t + '% target, amber up to 5 points over, red above that.</p>';
    return h;
  }
  var ings = fcIngs().filter(function(i){ return !q || normName(i.name + ' ' + i.supplier).indexOf(q) !== -1; }).slice().sort(function(a, b){ return a.name.localeCompare(b.name); });
  if (!ings.length) return h + '<div class="empty-state"><i class="fas fa-carrot"></i><p>' + (fcIngs().length ? 'No ingredient matches.' : 'No ingredients yet. Add each one with the price you pay per kg, litre or piece.') + '</p></div>';
  h += '<div class="acc-card acc-scroll"><table class="acc-table fc-table"><thead><tr><th>Ingredient</th><th>Price</th><th>Yield</th><th>Used in</th><th>Updated</th></tr></thead><tbody>';
  ings.forEach(function(i){
    var used = fcUsage(i.id).length;
    h += '<tr class="fc-row" data-fc-ing="' + esc(i.id) + '" tabindex="0"><th>' + esc(i.name) + (i.supplier ? '<small>' + esc(i.supplier) + '</small>' : '') + '</th>'
      + '<td>' + (i.price > 0 ? accEur(i.price) + ' / ' + fcUnitLabel(i.unit) : '<span class="fc-miss">no price</span>') + '</td><td>' + (i.yieldPct < 100 ? i.yieldPct + '%' : '—') + '</td>'
      + '<td>' + (used ? used + (used === 1 ? ' dish' : ' dishes') : '—') + '</td><td>' + (i.updatedAt ? esc(reqWhen(i.updatedAt).split(',')[0]) : '—') + '</td></tr>';
  });
  return h + '</tbody></table></div>';
}

// ingredient sheet
function openFcIng(id, then) {
  var i = id ? fcIngs().find(function(x){ return x.id === id; }) : null;
  fcIngEdit = { id: i ? i.id : uid(), isNew: !i, then: then || null };
  document.getElementById('fc-ing-title').textContent = i ? i.name : 'New ingredient';
  document.getElementById('fc-ing-name').value = i ? i.name : '';
  document.getElementById('fc-ing-unit').value = i ? i.unit : 'kg';
  document.getElementById('fc-ing-price').value = i && i.price ? accIn(i.price) : '';
  document.getElementById('fc-ing-yield').value = i && i.yieldPct < 100 ? i.yieldPct : '';
  document.getElementById('fc-ing-supplier').value = i ? i.supplier : '';
  var dl = document.getElementById('fc-ing-names');
  if (dl) dl.innerHTML = (getDB().inventory || []).map(function(x){ return '<option value="' + esc(String(x.name || '').trim()) + '">'; }).join('');
  var used = i ? fcUsage(i.id) : [];
  document.getElementById('fc-ing-used').textContent = used.length ? 'Used in: ' + used.map(function(r){ return r.name; }).join(', ') : '';
  document.getElementById('btn-fc-ing-del').style.display = i ? '' : 'none';
  fcIngUnitLabel(); openModal('modal-fc-ing');
}
function fcIngUnitLabel() { var u = document.getElementById('fc-ing-unit').value; document.getElementById('fc-ing-price-label').textContent = 'Price per ' + fcUnitLabel(u) + ' (€) *'; }
function saveFcIng() {
  if (!fcIngEdit || fcBusy) return;
  var name = document.getElementById('fc-ing-name').value.trim(); if (!name) { toast('Name required', 'error'); return; }
  var price = accNum(document.getElementById('fc-ing-price').value); if (price === null || isNaN(price) || price < 0) { toast('Enter the price', 'error'); return; }
  var y = accNum(document.getElementById('fc-ing-yield').value); if (y !== null && (isNaN(y) || y <= 0 || y > 100)) { toast('Yield is a % between 1 and 100', 'error'); return; }
  if (fcIngs().some(function(x){ return x.id !== fcIngEdit.id && accSame(x.name, name); })) { toast(name + ' already exists', 'error'); return; }
  var ing = { id: fcIngEdit.id, name: name, unit: document.getElementById('fc-ing-unit').value, price: Math.round(price * 10000) / 10000, yieldPct: y || 100, supplier: document.getElementById('fc-ing-supplier').value.trim(), updatedAt: new Date().toISOString() };
  fcBusy = true;
  fcUpsert('fc_ingredients', { id: ing.id, name: ing.name, unit: ing.unit, price: ing.price, yield_pct: ing.yieldPct, supplier: ing.supplier, updated_at: ing.updatedAt }).then(function(){
    fcBusy = false; var db = getDB(); db.fcIngredients = (db.fcIngredients || []).filter(function(x){ return x.id !== ing.id; }).concat([ing]); saveDB(db);
    closeModal('modal-fc-ing'); var then = fcIngEdit.then; fcIngEdit = null;
    if (then) then(ing); else { renderFoodCost(); toast('Saved. Dishes using it are updated.', 'success'); }
  }).catch(function(){ fcBusy = false; });
}
function deleteFcIng() {
  if (!fcIngEdit || fcIngEdit.isNew) return;
  var used = fcUsage(fcIngEdit.id);
  if (!confirm(used.length ? 'It is used in ' + used.length + ' dish' + (used.length === 1 ? '' : 'es') + ' (' + used.map(function(r){ return r.name; }).join(', ') + '). Delete anyway? Those lines will show as missing.' : 'Delete this ingredient?')) return;
  sbFetch('DELETE', 'fc_ingredients', null, 'id=eq.' + encodeURIComponent(fcIngEdit.id)).then(function(){
    var db = getDB(); db.fcIngredients = (db.fcIngredients || []).filter(function(x){ return x.id !== fcIngEdit.id; }); saveDB(db);
    closeModal('modal-fc-ing'); fcIngEdit = null; renderFoodCost();
  }).catch(function(){ toast('Not deleted. Check the connection.', 'error'); });
}

// dish sheet
function openFcDish(id, copy) {
  var r = id ? fcRecs().find(function(x){ return x.id === id; }) : null;
  fcEdit = r ? JSON.parse(JSON.stringify(r)) : { id: uid(), name: '', category: '', price: 0, vat: 13, portions: 1, lines: [], notes: '' };
  fcEdit.isNew = !r || !!copy;
  if (copy) { fcEdit.id = uid(); fcEdit.name = fcEdit.name + ' (copy)'; }
  if (!fcEdit.lines.length) fcEdit.lines.push({ ing: '', qty: '', unit: 'g' });
  document.getElementById('fc-dish-title').textContent = fcEdit.isNew ? (copy ? 'Copy of ' + r.name : 'New dish') : fcEdit.name;
  document.getElementById('fc-dish-name').value = fcEdit.name;
  document.getElementById('fc-dish-price').value = fcEdit.price ? accIn(fcEdit.price) : '';
  document.getElementById('fc-dish-vat').value = String(fcEdit.vat);
  document.getElementById('fc-dish-portions').value = fcEdit.portions;
  document.getElementById('fc-dish-notes').value = fcEdit.notes || '';
  document.getElementById('fc-dish-names').innerHTML = (getDB().bbMenu || []).map(function(m){ return '<option value="' + esc(m.name) + '">' + esc(accEur(m.price)) + '</option>'; }).join('');
  document.getElementById('btn-fc-dish-del').style.display = fcEdit.isNew ? 'none' : '';
  document.getElementById('btn-fc-dish-copy').style.display = fcEdit.isNew ? 'none' : '';
  renderFcLines(); openModal('modal-fc-dish');
}
function fcReadHead() {
  if (!fcEdit) return;
  fcEdit.name = document.getElementById('fc-dish-name').value.trim();
  var p = accNum(document.getElementById('fc-dish-price').value); fcEdit.price = p > 0 ? p : 0;
  fcEdit.vat = parseFloat(document.getElementById('fc-dish-vat').value) || 0;
  var po = accNum(document.getElementById('fc-dish-portions').value); fcEdit.portions = po > 0 ? po : 1;
  fcEdit.notes = document.getElementById('fc-dish-notes').value.trim();
}
function fcLineOptions(line) {
  var ings = fcIngs().slice().sort(function(a, b){ return a.name.localeCompare(b.name); });
  var recs = fcRecs().filter(function(r){ return r.id !== fcEdit.id; }).sort(function(a, b){ return a.name.localeCompare(b.name); });
  var cur = line.rec ? 'r:' + line.rec : (line.ing ? 'i:' + line.ing : '');
  var o = '<option value="">Choose…</option><optgroup label="Ingredients">' + ings.map(function(i){ return '<option value="i:' + esc(i.id) + '"' + (cur === 'i:' + i.id ? ' selected' : '') + '>' + esc(i.name) + '</option>'; }).join('') + '</optgroup>';
  if (recs.length) o += '<optgroup label="Other dishes / bases">' + recs.map(function(r){ return '<option value="r:' + esc(r.id) + '"' + (cur === 'r:' + r.id ? ' selected' : '') + '>' + esc(r.name) + '</option>'; }).join('') + '</optgroup>';
  return o + '<option value="new">+ New ingredient…</option>';
}
function renderFcLines() {
  if (!fcEdit) return;
  var el = document.getElementById('fc-lines');
  el.innerHTML = fcEdit.lines.map(function(l, i){
    var ing = l.ing ? fcIngs().find(function(x){ return x.id === l.ing; }) : null;
    var units = l.rec ? [['portion', 1]] : (FC_UNITS[ing ? ing.unit : 'kg'] || FC_UNITS.un);
    if (!l.rec && !units.some(function(u){ return u[0] === l.unit; })) l.unit = units[0][0];
    var c = (l.ing || l.rec) ? fcLineCost(l, [fcEdit.id]) : { cost: 0 };
    return '<div class="fc-line"><select class="select-field" data-fc-line-item="' + i + '" aria-label="Ingredient">' + fcLineOptions(l) + '</select>'
      + '<input class="input-field" inputmode="decimal" data-fc-line-qty="' + i + '" value="' + (l.qty === '' || l.qty == null ? '' : String(l.qty).replace('.', ',')) + '" placeholder="Qty" aria-label="Quantity" />'
      + '<select class="select-field" data-fc-line-unit="' + i + '" aria-label="Unit"' + (units.length === 1 ? ' disabled' : '') + '>' + units.map(function(u){ return '<option' + (u[0] === (l.rec ? 'portion' : l.unit) ? ' selected' : '') + '>' + u[0] + '</option>'; }).join('') + '</select>'
      + '<span class="fc-line-cost' + (c.missing ? ' fc-miss' : '') + '">' + ((l.ing || l.rec) && l.qty ? accEur(c.cost) : '') + '</span>'
      + '<button class="acc-icon" data-fc-line-del="' + i + '" aria-label="Remove line"><i class="fas fa-xmark"></i></button></div>';
  }).join('');
  renderFcTotals();
}
function renderFcTotals() {
  if (!fcEdit) return;
  fcReadHead();
  var c = fcRecipeCost(fcEdit, [fcEdit.id]), t = fcTarget();
  document.getElementById('fc-totals').innerHTML =
    '<div><span>Recipe cost</span><b>' + accEur(c.total) + '</b></div>'
    + '<div><span>Per portion' + (fcEdit.portions !== 1 ? ' (÷ ' + String(fcEdit.portions).replace('.', ',') + ')' : '') + '</span><b>' + accEur(c.perPortion) + '</b></div>'
    + '<div><span>Price without VAT</span><b>' + (fcEdit.price ? accEur(c.net) : '—') + '</b></div>'
    + '<div class="fc-big"><span>Food cost</span><b class="fc-pct ' + fcPctClass(c.pct) + '">' + (c.pct === null ? '—' : c.pct.toFixed(1).replace('.', ',') + '%') + '</b></div>'
    + '<div><span>Margin per portion</span><b>' + (fcEdit.price ? accEur(c.margin) : '—') + '</b></div>'
    + '<div><span>Price for ' + t + '% food cost</span><b>' + (c.perPortion > 0 ? accEur(c.targetPrice) : '—') + '</b></div>'
    + (c.missing ? '<div class="fc-warn"><i class="fas fa-triangle-exclamation"></i> ' + c.missing + ' line' + (c.missing === 1 ? ' has' : 's have') + ' no price yet, so the cost is too low.</div>' : '');
}
function saveFcDish() {
  if (!fcEdit || fcBusy) return;
  fcReadHead();
  if (!fcEdit.name) { toast('Name required', 'error'); return; }
  var lines = fcEdit.lines.filter(function(l){ return (l.ing || l.rec) && parseFloat(l.qty) > 0; }).map(function(l){ return l.rec ? { rec: l.rec, qty: parseFloat(l.qty) } : { ing: l.ing, qty: parseFloat(l.qty), unit: l.unit }; });
  if (!lines.length) { toast('Add at least one ingredient with a quantity', 'error'); return; }
  var r = { id: fcEdit.id, name: fcEdit.name, category: fcEdit.category || '', price: fcEdit.price, vat: fcEdit.vat, portions: fcEdit.portions, lines: lines, notes: fcEdit.notes, updatedAt: new Date().toISOString() };
  var menu = (getDB().bbMenu || []).find(function(m){ return accSame(m.name, r.name); }); if (menu && !r.category) r.category = menu.category;
  fcBusy = true;
  fcUpsert('fc_recipes', { id: r.id, name: r.name, category: r.category, price: r.price, vat: r.vat, portions: r.portions, lines: r.lines, notes: r.notes, updated_at: r.updatedAt }).then(function(){
    fcBusy = false; var db = getDB(); db.fcRecipes = (db.fcRecipes || []).filter(function(x){ return x.id !== r.id; }).concat([r]); saveDB(db);
    closeModal('modal-fc-dish'); fcEdit = null; fcView = 'dishes'; renderFoodCost(); toast('Dish saved', 'success');
  }).catch(function(){ fcBusy = false; });
}
function deleteFcDish() {
  if (!fcEdit || fcEdit.isNew) return;
  var usedBy = fcRecs().filter(function(r){ return (r.lines || []).some(function(l){ return l.rec === fcEdit.id; }); });
  if (!confirm(usedBy.length ? 'Other dishes use it as a base (' + usedBy.map(function(r){ return r.name; }).join(', ') + '). Delete anyway?' : 'Delete ' + fcEdit.name + '?')) return;
  sbFetch('DELETE', 'fc_recipes', null, 'id=eq.' + encodeURIComponent(fcEdit.id)).then(function(){
    var db = getDB(); db.fcRecipes = (db.fcRecipes || []).filter(function(x){ return x.id !== fcEdit.id; }); saveDB(db);
    closeModal('modal-fc-dish'); fcEdit = null; renderFoodCost();
  }).catch(function(){ toast('Not deleted. Check the connection.', 'error'); });
}

// ── Week one-pager: areas/sections × Monday–Sunday ─────────────
function wkTime(t) { t = t || ''; return /:00$/.test(t) ? t.slice(0, t.length - 3).replace(/^0/, '') : t.replace(/^0/, ''); }
function weekSheetHTML(db, wsStr) {
  var areas = getAreas(db), absIdx = absenceIndex(db);
  var week = db.shifts.filter(function(s){ return s.weekStart === wsStr; });
  var worked = week.filter(function(s){ return !s.dayOff; });
  var todayStr = toDateStr(new Date());
  var dates = DAYS.map(function(d, i){ var x = new Date(wsStr + 'T00:00:00'); x.setDate(x.getDate() + i); return x; });
  // blocks: configured areas (all their sections), then unknown areas / sections found this week
  var blocks = areas.map(function(a){ return { zone:a.name, sections:a.sections.slice(), single:a.sections.length === 1 }; });
  worked.forEach(function(s){
    var z = s.zone || '', sec = effectiveSection(s, areas);
    var b = blocks.find(function(x){ return x.zone === z; });
    if (!b) { b = { zone:z, sections:[], single:false }; blocks.push(b); }
    if (b.sections.indexOf(sec) === -1) b.sections.push(sec);
  });
  blocks.forEach(function(b){ var i = b.sections.indexOf(''); if (i > -1) { b.sections.splice(i, 1); b.sections.push(''); } });
  var h = '<table class="week-sheet"><colgroup><col class="wk-label">' + DAYS.map(function(){ return '<col>'; }).join('') + '</colgroup>';
  h += '<thead><tr><th>Area · Section</th>' + DAYS.map(function(d, i){
    var ds = toDateStr(dates[i]);
    return '<th' + (ds === todayStr ? ' class="is-today"' : '') + '>' + d.slice(0, 3) + '<span class="wk-date">' + dates[i].getDate() + ' ' + MONTH_NAMES[dates[i].getMonth()] + '</span></th>';
  }).join('') + '</tr></thead><tbody>';
  blocks.forEach(function(b){
    h += '<tr class="wk-area"><td colspan="8"><span class="wk-swatch" style="background:' + areaColor(b.zone) + '"></span>' + esc(b.zone || 'No area') + '</td></tr>';
    b.sections.forEach(function(sec){
      var label = sec || (b.zone ? 'No section' : '—');
      h += '<tr><td class="wk-rowlabel">' + esc(label) + '</td>' + DAYS.map(function(d){
        var list = worked.filter(function(s){ return s.day === d && (s.zone || '') === b.zone && effectiveSection(s, areas) === sec; })
          .sort(function(x, y){ return timeToMins(x.start) - timeToMins(y.start) || x.employee.localeCompare(y.employee); });
        return '<td>' + list.map(function(s){
          var abs = shiftIsAbsent(s, absIdx);
          var tags = (abs ? '<span class="wk-tag abs">absent</span>' : '')
            + (!abs && s.lateMinutes ? '<span class="wk-tag late">late ' + fmtMins(s.lateMinutes) + '</span>' : '')
            + (!abs && s.overtimeMinutes ? '<span class="wk-tag ot">+' + fmtMins(s.overtimeMinutes) + '</span>' : '');
          return '<span class="wk-p' + (abs ? ' is-absent' : '') + '" data-action-shift="' + esc(s.id) + '" data-action-shift-date="' + esc(shiftDateStr(s)) + '" data-action-shift-ws="' + esc(wsStr) + '" title="' + esc(s.employee + ' ' + s.start + '–' + s.end + (s.role ? ' · ' + s.role : '')) + '">'
            + '<b>' + esc(s.employee) + '</b> <span class="wk-t">' + wkTime(s.start) + '–' + wkTime(s.end) + '</span>' + tags + '</span>';
        }).join('') + '</td>';
      }).join('') + '</tr>';
    });
  });
  // footer: day offs, headcount, hours
  var offRow = '', peopleRow = '', hoursRow = '';
  DAYS.forEach(function(d){
    var offs = week.filter(function(s){ return s.day === d && s.dayOff; }).map(function(s){ return s.employee; }).sort();
    var on = worked.filter(function(s){ return s.day === d && !shiftIsAbsent(s, absIdx); });
    var hrs = on.reduce(function(a, s){ return a + shiftScheduledHours(s); }, 0);
    offRow += '<td class="wk-off">' + offs.map(esc).join(', ') + '</td>';
    peopleRow += '<td><span class="wk-num">' + on.length + '</span></td>';
    hoursRow += '<td><span class="wk-num">' + (Math.round(hrs * 10) / 10) + '</span> h</td>';
  });
  h += '<tr class="wk-foot"><td class="wk-rowlabel">Day off</td>' + offRow + '</tr>';
  h += '<tr class="wk-foot"><td class="wk-rowlabel">People working</td>' + peopleRow + '</tr>';
  h += '<tr class="wk-foot"><td class="wk-rowlabel">Hours planned</td>' + hoursRow + '</tr>';
  return h + '</tbody></table>';
}
function renderShiftsWeekTab() {
  var wrap = document.getElementById('week-sheet-wrap'); if (!wrap) return;
  var wsStr = toDateStr(getWeekStart(shiftsWeekOffset));
  document.getElementById('week-sheet-range').textContent = '· ' + weekRangeLabel(wsStr);
  wrap.innerHTML = weekSheetHTML(getDB(), wsStr);
}
function printWeekSheet() {
  var wsStr = toDateStr(getWeekStart(shiftsWeekOffset));
  var root = document.getElementById('print-root');
  root.innerHTML = '<div class="week-sheet-meta"><b>Bar da Praia · Shifts</b><span>' + esc(weekRangeLabel(wsStr)) + '</span></div>' + weekSheetHTML(getDB(), wsStr);
  document.body.classList.add('print-week');
  // shrink to one A4 landscape page when the week is long (printable ≈ 196mm high)
  // shrink to one page if needed, widening the sheet by the same factor so it still fills the width
  var pageH = 196 * 96 / 25.4, z = 1;
  root.style.zoom = ''; root.style.width = ''; root.style.display = 'block';
  for (var k = 0; k < 3; k++) {
    root.style.width = (283 / z) + 'mm';
    var hgt = root.scrollHeight; if (hgt * z <= pageH) break;
    z = Math.max(0.5, z * pageH / (hgt * z));
  }
  root.style.width = (283 / z) + 'mm'; root.style.zoom = z < 1 ? String(z) : ''; root.style.display = '';
  var done = function(){ document.body.classList.remove('print-week'); window.removeEventListener('afterprint', done); };
  window.addEventListener('afterprint', done);
  window.print();   // print-root only shows in print media, so leaving it filled is harmless until afterprint
}

function weekRangeLabel(ws, short) {
  var a = new Date(ws + 'T00:00:00'), b = new Date(a); b.setDate(b.getDate() + 6);
  var yr = (short && b.getFullYear() === new Date().getFullYear()) ? '' : ' ' + b.getFullYear();
  return a.getDate() + ' ' + MONTH_NAMES[a.getMonth()] + ' – ' + b.getDate() + ' ' + MONTH_NAMES[b.getMonth()] + yr;
}
function openRepeatSheet() {
  var from = document.getElementById('repeat-from'), to = document.getElementById('repeat-to');
  var lo = Math.min(-12, shiftsWeekOffset - 4), hi = Math.max(12, shiftsWeekOffset + 8), opts = '';
  for (var o = lo; o <= hi; o++) {
    var ws = toDateStr(getWeekStart(o));
    opts += '<option value="' + o + '">' + (o === 0 ? 'This week' : weekRangeLabel(ws, true)) + '</option>';
  }
  from.innerHTML = opts; to.innerHTML = opts;
  from.value = String(shiftsWeekOffset); to.value = String(shiftsWeekOffset + 1);
  repeatTicked = {}; repeatClashMode = '';
  if (!repeatBound) {
    repeatBound = true;
    from.addEventListener('change', function(){ repeatTicked = {}; repeatClashMode = ''; renderRepeatSheet(); });
    to.addEventListener('change', function(){ repeatClashMode = ''; renderRepeatSheet(); });
    document.getElementById('repeat-people').addEventListener('change', function(e){
      if (e.target.classList.contains('repeat-cb')) { repeatTicked[e.target.value] = e.target.checked; renderRepeatSheet(); }
    });
    document.getElementById('repeat-clash').addEventListener('change', function(e){
      if (e.target.name === 'repeat-clash-mode') { repeatClashMode = e.target.value; renderRepeatSheet(); }
    });
  }
  renderRepeatSheet();
  openModal('modal-repeat');
}
function repeatPlan() {
  var db = getDB();
  var fromOff = parseInt(document.getElementById('repeat-from').value, 10), toOff = parseInt(document.getElementById('repeat-to').value, 10);
  var fromWs = toDateStr(getWeekStart(fromOff)), toWs = toDateStr(getWeekStart(toOff));
  var team = db.employees || [];
  var src = {}, tgt = {};
  db.shifts.forEach(function(s){
    if (s.weekStart === fromWs && team.indexOf(s.employee) !== -1) (src[s.employee] = src[s.employee] || []).push(s);
    if (s.weekStart === toWs) tgt[s.employee] = (tgt[s.employee] || 0) + 1;
  });
  var people = Object.keys(src).sort(function(a,b){ return a.localeCompare(b); });
  people.forEach(function(p){ if (!(p in repeatTicked)) repeatTicked[p] = true; });
  var ticked = people.filter(function(p){ return repeatTicked[p]; });
  var clash = ticked.filter(function(p){ return tgt[p]; });
  return {db:db, fromOff:fromOff, toOff:toOff, fromWs:fromWs, toWs:toWs, src:src, tgt:tgt, people:people, ticked:ticked, clash:clash};
}
function renderRepeatSheet() {
  var p = repeatPlan();
  var list = document.getElementById('repeat-people');
  list.innerHTML = p.people.length === 0
    ? '<div class="empty-state" style="padding:18px"><p>Nobody on the Team has shifts in ' + weekRangeLabel(p.fromWs) + '.</p></div>'
    : p.people.map(function(name){
        var n = p.src[name].filter(function(s){ return !s.dayOff; }).length;
        var already = p.tgt[name] ? '<span class="badge badge-yellow" title="Already has ' + p.tgt[name] + ' shifts in the target week">already ' + p.tgt[name] + '</span>' : '';
        return '<label class="repeat-row"><input type="checkbox" class="repeat-cb" value="' + esc(name) + '"' + (repeatTicked[name] ? ' checked' : '') + '>'
          + '<span class="repeat-name">' + esc(name) + '</span>' + already
          + '<span class="repeat-meta">' + n + ' shift' + (n === 1 ? '' : 's') + '</span></label>';
      }).join('');
  var clashEl = document.getElementById('repeat-clash');
  if (p.clash.length) {
    clashEl.style.display = '';
    var who = p.clash.length === p.ticked.length && p.clash.length > 3
      ? 'All ' + p.clash.length + ' people you ticked'
      : (p.clash.length > 6 ? p.clash.slice(0, 5).join(', ') + ' and ' + (p.clash.length - 5) + ' more' : p.clash.join(', '));
    clashEl.innerHTML = '<div><i class="fas fa-triangle-exclamation"></i> <b>' + esc(who) + '</b> already '
      + (p.clash.length === 1 ? 'has' : 'have') + ' shifts in ' + weekRangeLabel(p.toWs, true) + '. What should happen to them?</div>'
      + '<label><input type="radio" name="repeat-clash-mode" value="replace"' + (repeatClashMode === 'replace' ? ' checked' : '') + '> Replace their shifts with the copy</label>'
      + '<label><input type="radio" name="repeat-clash-mode" value="skip"' + (repeatClashMode === 'skip' ? ' checked' : '') + '> Keep their shifts, skip them</label>';
  } else { clashEl.style.display = 'none'; clashEl.innerHTML = ''; }
  var copying = p.clash.length && repeatClashMode === 'skip' ? p.ticked.length - p.clash.length : p.ticked.length;
  var err = '';
  if (p.fromOff === p.toOff) err = 'Choose two different weeks.';
  var go = document.getElementById('btn-repeat-go');
  go.disabled = !!err || copying === 0 || (p.clash.length > 0 && !repeatClashMode);
  document.getElementById('repeat-go-label').textContent = copying > 0 ? 'Copy ' + copying + ' ' + (copying === 1 ? 'person' : 'people') : 'Copy';
  document.getElementById('repeat-error').textContent = err;
}
function repeatWeek() {
  if (repeatBusy) { toast('Still copying, one moment', 'error'); return; }
  var p = repeatPlan();
  var skip = repeatClashMode === 'skip' ? p.clash : [];
  var names = p.ticked.filter(function(n){ return skip.indexOf(n) === -1; });
  if (!names.length || p.fromWs === p.toWs) return;
  var seen = {}, copies = [];
  names.forEach(function(n){
    p.src[n].forEach(function(s){
      var k = n + '|' + s.day; if (seen[k]) return; seen[k] = true;
      copies.push({id:uid(), employee:n, day:s.day, start:s.start, end:s.end, role:s.role||'', zone:s.zone||'', section:s.section||'', dayOff:!!s.dayOff, weekStart:p.toWs, createdAt:new Date().toISOString()});
    });
  });
  var replacing = names.filter(function(n){ return p.tgt[n]; });
  var db = p.db;
  db.shifts = db.shifts.filter(function(s){ return !(s.weekStart === p.toWs && names.indexOf(s.employee) !== -1); }).concat(copies);
  saveDB(db); closeModal('modal-repeat');
  shiftsWeekOffset = p.toOff; renderShifts();
  repeatBusy = true;
  var inList = encodeURIComponent('(' + replacing.map(function(n){ return '"' + n.replace(/"/g,'\\\\"') + '"'; }).join(',') + ')');
  var clear = replacing.length ? sbFetch('DELETE','shifts',null,'week_start=eq.' + p.toWs + '&employee=in.' + inList) : Promise.resolve();
  clear.then(function(){ return sbFetch('POST','shifts',copies.map(shiftToRow)); })
    .then(function(rows2){
      var d2 = getDB();
      (rows2||[]).forEach(function(r){ var si = d2.shifts.findIndex(function(x){ return x.weekStart === p.toWs && x.employee === r.employee && x.day === r.day; }); if (si !== -1) d2.shifts[si].id = r.id; });
      saveDB(d2); repeatBusy = false; rerenderShiftsSoon();
      toast('Copied ' + names.length + ' ' + (names.length === 1 ? 'person' : 'people') + ' to ' + weekRangeLabel(p.toWs) + (skip.length ? ' · skipped ' + skip.length : ''), 'gold');
      setTimeout(function(){ notifyWeekShifts(p.toWs); }, 400);
    })
    .catch(function(){ repeatBusy = false; toast('Copy not saved online. Check the connection and try again.', 'error'); });
}
function shiftFormChanges(emp, ws, role) {
  var db=getDB(); var out=[];
  document.querySelectorAll('#shift-days-body tr[data-shift-day]').forEach(function(row){
    var day=row.dataset.shiftDay;
    var off=row.querySelector('.shift-day-off-chk').checked;
    var st=row.querySelector('.shift-day-start').value, en=row.querySelector('.shift-day-end').value;
    var zr=readZoneSelect(row.querySelector('.shift-day-zone')); var zone=zr.zone, sec=zr.section;
    if(!off&&(!st||!en)) return;
    var ex=db.shifts.find(function(s){return s.employee===emp&&s.day===day&&s.weekStart===ws;});
    if(!ex) return;
    var exSec=effectiveSection(ex);
    var same = off ? !!ex.dayOff : (!ex.dayOff && ex.start===st && ex.end===en && (ex.zone||'')===zone && exSec===sec);
    if(same && (ex.role||'')===role) return;
    var zoneChanged=(ex.zone||'')!==zone||exSec!==sec;
    var fmt=function(o,s1,e1,z,sc){ return o ? 'day off' : (s1+'–'+e1+(zoneChanged&&z?' · '+z+(sc?' '+sc:''):'')); };
    out.push({day:day, was:fmt(ex.dayOff,ex.start,ex.end,ex.zone||'',exSec), now:fmt(off,st,en,zone,sec), roleOnly:same});
  });
  return out;
}
function saveShift(force){
  var emp=document.getElementById('shift-employee').value; if(!emp){toast('Select employee!','error');return;}
  var role=document.getElementById('shift-role').value.trim();
  var db=getDB();
  var ws=toDateStr(getWeekStart(shiftsWeekOffset));
  var isAdd=!document.getElementById('shift-edit-id').value;
  var anyDay=false;
  document.querySelectorAll('#shift-days-body tr[data-shift-day]').forEach(function(row){
    if(row.querySelector('.shift-day-off-chk').checked||(row.querySelector('.shift-day-start').value&&row.querySelector('.shift-day-end').value)) anyDay=true;
  });
  if(!anyDay){ toast('Fill in the times for at least one day','error'); return; }
  if(isAdd && force!==true){
    var changes=shiftFormChanges(emp, ws, role);
    if(changes.length){
      document.getElementById('clash-title').textContent=emp+' is already scheduled';
      document.getElementById('clash-intro').textContent='Saving will replace '+(changes.length===1?'this day':'these '+changes.length+' days')+' in '+weekRangeLabel(ws, true)+':';
      document.getElementById('clash-list').innerHTML=changes.map(function(c){
        return '<div class="clash-row"><span class="clash-day">'+c.day.slice(0,3)+'</span>'
          +(c.roleOnly ? '<span class="clash-now">'+esc(c.now)+'</span><span style="font-size:12px;color:var(--slate-500)">role changes</span>'
                       : '<span class="clash-was">'+esc(c.was)+'</span><i class="fas fa-arrow-right" style="color:var(--slate-400);font-size:11px"></i><span class="clash-now">'+esc(c.now)+'</span>')
          +'</div>';
      }).join('');
      openModal('modal-shift-clash');
      return;
    }
  }
  var rows=document.querySelectorAll('#shift-days-body tr[data-shift-day]');
  var saved=0, changeLines=[];
  rows.forEach(function(row){
    var day=row.dataset.shiftDay;
    var isDayOff=row.querySelector('.shift-day-off-chk').checked;
    var start=isDayOff?'00:00':row.querySelector('.shift-day-start').value;
    var end=isDayOff?'00:00':row.querySelector('.shift-day-end').value;
    var zr=readZoneSelect(row.querySelector('.shift-day-zone'));
    var zone=zr.zone, section=zr.section;
    if(!isDayOff&&(!start||!end)) return;
    var prev=db.shifts.find(function(s){return s.employee===emp&&s.day===day&&s.weekStart===ws;});
    db.shifts=db.shifts.filter(function(s){return !(s.employee===emp&&s.day===day&&s.weekStart===ws);});
    var newId=uid();
    var ns={id:newId,employee:emp,day:day,start:start,end:end,role:role,zone:zone,section:section,dayOff:isDayOff,weekStart:ws,createdAt:new Date().toISOString()};
    if(prev&&!isDayOff){ var durM=Math.round(shiftScheduledHours(ns)*60); ns.lateMinutes=Math.min(prev.lateMinutes||0, Math.max(0,durM-15)); ns.overtimeMinutes=prev.overtimeMinutes||0; }
    changeLines.push(shiftChangeLine(prev, ns));
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
  alertShiftChanges(emp, ws, changeLines);
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
  if (s.zone) info += ' · ' + s.zone + (effectiveSection(s) ? ' ' + effectiveSection(s) : '');
  if (s.lateMinutes) info += ' · late ' + fmtMins(s.lateMinutes);
  if (s.overtimeMinutes) info += ' · +' + fmtMins(s.overtimeMinutes) + ' overtime';
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
  var absRec = (db.absences||[]).find(function(a){ return a.employee===s.employee && a.date===dateStr; });
  var unBtn = document.getElementById('shift-action-unabsent');
  if (unBtn) unBtn.parentNode.style.display = (canEdit && absRec) ? 'flex' : 'none';
  var tgLbl = document.getElementById('shift-action-abs-toggle-label');
  if (tgLbl && absRec) tgLbl.textContent = absRec.justified ? 'Mark unjustified' : 'Mark justified';
  if (infoEl && absRec) infoEl.textContent = info + ' · absent (' + (absRec.justified ? 'justified' : 'unjustified') + ')';
  var canAdjust = canEdit && !s.dayOff && !alreadyAbsent;
  var lateBtn = document.getElementById('shift-action-late'), otBtn = document.getElementById('shift-action-ot');
  if (lateBtn) lateBtn.parentNode.style.display = canAdjust ? 'flex' : 'none';
  var lateLbl = document.getElementById('shift-action-late-label'), otLbl = document.getElementById('shift-action-ot-label');
  if (lateLbl) lateLbl.textContent = s.lateMinutes ? 'Late · ' + fmtMins(s.lateMinutes) : 'Late';
  if (otLbl) otLbl.textContent = s.overtimeMinutes ? 'Overtime · +' + fmtMins(s.overtimeMinutes) : 'Overtime';
  var reqBtn = document.getElementById('shift-action-request');
  if (reqBtn) {
    var me = myEmployee(), openReq = openRequestFor(s.employee, s.weekStart, s.day);
    reqBtn.style.display = (me && s.employee === me && !s.dayOff && (dateStr || '') >= toDateStr(new Date())) ? '' : 'none';
    reqBtn.disabled = !!openReq;
    document.getElementById('shift-action-request-label').textContent = openReq ? 'Request sent · ' + reqStatusLabel(openReq) : 'Request a change';
  }
  openModal('modal-shift-action');
}
function deleteShift(id){
  if(!confirm('Remove shift?')) return;
  var db=getDB(); var s=db.shifts.find(function(x){return x.id===id;}); if(!s) return;
  db.shifts=db.shifts.filter(function(x){return !(x.employee===s.employee&&x.day===s.day&&x.weekStart===s.weekStart);}); saveDB(db);
  renderShifts(); toast('Removing...');
  sbFetch('DELETE','shifts',null,shiftSlotFilter(s.employee,s.weekStart,s.day)).then(function(){ toast('Shift removed.'); }).catch(function(){ toast('Removed locally','error'); });
  if(!s.dayOff) alertShiftChanges(s.employee, s.weekStart, [shiftChangeLine(s, null)]);
}
function generateTips(){
  var raw=(document.getElementById('shifts-tips-input').value||'').trim().replace(',','.');
  var total=parseFloat(raw); if(isNaN(total)||total<=0){toast('Enter a valid tips amount','error');return;}
  var db=getDB();
  var ws=toDateStr(getWeekStart(shiftsWeekOffset));
  var split=computeTipSplit(db, ws, total);
  if(!split){ var el=document.getElementById('shifts-tips-result'); if(el) el.innerHTML='<div class="empty-state"><p>No worked hours found for this week.</p></div>'; return; }
  saveTipSplit(db, ws, split);
  renderShiftsTipsTab();
  toast('Tips calculated and saved for this week','gold');
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
        +'<input type="number" inputmode="numeric" class="bb-qty-val bb-qty-input" data-bb-qty-input="'+esc(item.id)+'" value="'+(qty||'')+'" placeholder="0" min="0" step="1" />'
        +'<button class="bb-qty-btn bb-qty-plus" data-bb-plus="'+esc(item.id)+'">+</button>'
      +'</div>'
      +'<div class="bb-price">'+fmtEur(item.price)+'</div>'
    +'</div>';
  }).join('');
}
// one item's quantity changed: refresh its row, the selected list and the total
function bbQtyChanged(id){
  var qty=bbSelectedItems[id]||0;
  document.querySelectorAll('[data-bb-qty-input]').forEach(function(inp){
    if(inp.dataset.bbQtyInput!==id) return;
    if(document.activeElement!==inp) inp.value=qty||'';
    var minus=inp.parentNode.querySelector('[data-bb-minus]'); if(minus) minus.style.opacity=qty===0?'.3':'';
  });
  renderBbSelectedList(); updateBbTotal();
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
  var dateInp0=document.getElementById('bb-entry-date');
  var date0=(dateInp0&&dateInp0.value)?dateInp0.value:toDateStr(new Date());
  if(selected.length===0){
    var had=(db.bbEntries||[]).some(function(e){return e.date===date0;});
    if(!had){toast('Nothing to save for '+fmtDateShort(date0)+'.','error');return;}
    if(!confirm('Save '+fmtDateShort(date0)+' as blank (\u20ac0)? This replaces what was saved for that day.')) return;
  }
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
  // one row per date: upsert on the date so re-saving a day replaces it
  fetch(SB_URL+'/rest/v1/bb_entries?on_conflict=date', {
    method:'POST',
    headers:{'apikey':SB_KEY,'Authorization':'Bearer '+SB_KEY,'Content-Type':'application/json','Prefer':'resolution=merge-duplicates,return=minimal'},
    body:JSON.stringify({date:entryDate,items:items,total:total,saved_at:new Date().toISOString()})
  }).then(function(r){
    if(!r.ok) throw new Error('HTTP '+r.status);
    toast(items.length?'Entry saved for '+entryDate+'! '+fmtEur(total):'Saved '+entryDate+' as blank','gold');
  }).catch(function(){ toast('Could not save to the database \u2014 try again','error'); });
}
function clearDailyEntry(){
  bbSelectedItems={};
  renderBbMenuSelector(); renderBbSelectedList(); updateBbTotal();
  var dateInp=document.getElementById('bb-entry-date');
  var d=(dateInp&&dateInp.value)?dateInp.value:toDateStr(new Date());
  var saved=(getDB().bbEntries||[]).some(function(e){return e.date===d&&(e.items||[]).length;});
  toast(saved?'List cleared. Press Save to make '+fmtDateShort(d)+' blank.':'List cleared.');
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
  if (t.closest('#btn-week-print')) { printWeekSheet(); return; }
  if (t.closest('#shift-action-request')) { openShiftRequest(_shiftActionId); return; }
  if (t.closest('#btn-request-send')) { sendShiftRequest(); return; }
  var reqActEl = t.closest('[data-req-act]');
  if (reqActEl) { reqAction(reqActEl.dataset.reqAct, reqActEl.dataset.reqId); return; }

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
  if (t.closest('#btn-imp-start')) { startImpersonate(); return; }
  if (t.closest('#btn-imp-exit')) { exitImpersonate(); return; }
  el = t.closest('[data-notif-id]'); if (el) { notifOpen(el.dataset.notifId); return; }
  if (t.closest('#btn-notif-read-all')) { notifReadAll(); return; }
  if (t.closest('#btn-notif-clear')) { notifClearRead(); return; }
  if (t.closest('#btn-notif-more')) { notifShowAll = !notifShowAll; renderNotifPanel(); return; }
  if (t.closest('#btn-add-inventory')) { if (currentInvTab === 'shop') openShopModal(); else openAddInventoryModal(); return; }
  el = t.closest('[data-shop-filter]'); if (el) { shopFilter = el.dataset.shopFilter; renderShopList(); return; }
  el = t.closest('[data-shop-approve]'); if (el) { setShopFlag(el.dataset.shopApprove, 'approved'); return; }
  el = t.closest('[data-shop-bought]'); if (el) { setShopFlag(el.dataset.shopBought, 'bought'); return; }
  el = t.closest('[data-shop-edit]'); if (el) { openShopModal(el.dataset.shopEdit); return; }
  el = t.closest('[data-shop-delete]'); if (el) { deleteShopItem(el.dataset.shopDelete); return; }
  if (t.closest('#btn-save-shop-item')) { saveShopItem(); return; }
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
  if (t.closest('#btn-add-event') || t.closest('#calv-day-add')) { openEventModal(null, calvSel); return; }
  el = t.closest('[data-calv-day]'); if (el) { calvSel = el.dataset.calvDay; var cm = new Date(calvSel + 'T12:00:00'); if (cm.getMonth() !== calvMonth.getMonth()) { calvGoTo(calvSel); } else renderCalView(); if (window.innerWidth < 1024) { var ag = document.querySelector('.calv-day'); if (ag) ag.scrollIntoView({ behavior:'smooth', block:'start' }); } return; }
  el = t.closest('[data-calv-filter]'); if (el) { calvOn[el.dataset.calvFilter] = !calvOn[el.dataset.calvFilter]; calvSaveFilters(); renderCalView(); return; }
  el = t.closest('[data-calv-goto]'); if (el) { showSection(el.dataset.calvGoto); return; }
  if (t.closest('#calv-prev')) { calvMonth = new Date(calvMonth.getFullYear(), calvMonth.getMonth() - 1, 1); calvSel = toDateStr(calvMonth); renderCalView(); calvLoad(); return; }
  if (t.closest('#calv-next')) { calvMonth = new Date(calvMonth.getFullYear(), calvMonth.getMonth() + 1, 1); calvSel = toDateStr(calvMonth); renderCalView(); calvLoad(); return; }
  if (t.closest('#calv-today')) { calvGoTo(toDateStr(new Date())); return; }
  el = t.closest('[data-open-event]'); if (el) { openEventModal(el.dataset.openEvent); return; }
  el = t.closest('[data-ev-person]'); if (el) { var pid = el.dataset.evPerson, pi = evPicked.indexOf(pid); if (pi === -1) evPicked.push(pid); else evPicked.splice(pi, 1); evRenderPeople(); return; }
  if (t.closest('#btn-save-event')) { saveEvent(); return; }
  if (t.closest('#btn-delete-event')) { deleteEvent(); return; }
  if (t.closest('#btn-save-reservation')) { saveReservation(); return; }
  el = t.closest('[data-open-res-detail]');
  if (el) { openResDetail(el.dataset.openResDetail); return; }
  el = t.closest('.cal-day[data-cal-day]');
  if (el) { selectedCalendarDay=el.dataset.calDay; renderCalendar(); renderDayReservations(selectedCalendarDay); return; }

  // Table chip (multi-select in reservation modal)
  el = t.closest('.table-chip[data-table-val]');
  if (el) {
    var tv = el.dataset.tableVal;
    if (el.classList.contains('occupied') && selectedTables.indexOf(tv) === -1) { toast(tv + ' is booked ' + (el.querySelector('small') ? el.querySelector('small').textContent : 'then'), 'error'); return; }
    var idx2 = selectedTables.indexOf(tv);
    if (idx2 === -1) selectedTables.push(tv); else selectedTables.splice(idx2,1);
    if (el.closest('#res-table-grid')) refreshResTableGrid(); else el.classList.toggle('selected', selectedTables.indexOf(tv) !== -1);
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
  if (t.closest('#btn-repeat-week')) { openRepeatSheet(); return; }
  if (t.closest('#btn-repeat-go')) { repeatWeek(); return; }
  if (t.closest('#repeat-all') || t.closest('#repeat-none')) {
    var allOn = !!t.closest('#repeat-all'); repeatPlan().people.forEach(function(n){ repeatTicked[n] = allOn; }); renderRepeatSheet(); return;
  }
  if (t.closest('#btn-generate-tips')) { generateTips(); return; }
  el = t.closest('[data-add-shift-day]');
  if (el) { openAddShiftModal(el.dataset.addShiftDay); return; }
  if (t.closest('#btn-add-area')) {
    var an = (document.getElementById('new-area-name').value||'').trim(); if (!an) return;
    var ar = areasCopy(); if (ar.some(function(a){ return a.name.toLowerCase() === an.toLowerCase(); })) { toast('That area already exists','error'); return; }
    ar.push({name:an, sections:['Geral']}); document.getElementById('new-area-name').value=''; saveAreas(ar); return;
  }
  el = t.closest('[data-area-del]');
  if (el) {
    var ai = parseInt(el.dataset.areaDel,10), ar2 = areasCopy(), used = shiftsUsing(ar2[ai].name);
    if (!confirm('Remove the area '+ar2[ai].name+'?'+(used ? ' '+used+' shifts use it; they keep it and show under it until changed.' : ''))) return;
    ar2.splice(ai,1); saveAreas(ar2); return;
  }
  el = t.closest('[data-sec-del]');
  if (el) {
    var pr = el.dataset.secDel.split('|'), ar3 = areasCopy(), A = ar3[+pr[0]], sn = A.sections[+pr[1]];
    if (A.sections.length === 1) { toast('An area needs at least one section','error'); return; }
    var used2 = shiftsUsing(A.name, sn);
    if (!confirm('Remove '+A.name+' · '+sn+'?'+(used2 ? ' '+used2+' shifts use it; they keep it until changed.' : ''))) return;
    A.sections.splice(+pr[1],1); saveAreas(ar3); return;
  }
  el = t.closest('[data-sec-add]');
  if (el) {
    var ix = +el.dataset.secAdd, inp = document.querySelector('[data-sec-input="'+ix+'"]'), nv = (inp.value||'').trim(); if (!nv) return;
    var ar4 = areasCopy(); if (ar4[ix].sections.indexOf(nv) !== -1) { toast('That section already exists','error'); return; }
    ar4[ix].sections.push(nv); saveAreas(ar4); return;
  }
  el = t.closest('[data-hours-preset]');
  if (el) { hoursPreset(el.dataset.hoursPreset); return; }
  if (t.closest('#btn-save-shift')) { saveShift(); return; }
  if (t.closest('#btn-shift-same-times')) {
    var trs=[].slice.call(document.querySelectorAll('#shift-days-body tr[data-shift-day]'));
    var src=trs.find(function(r){ return !r.querySelector('.shift-day-off-chk').checked && r.querySelector('.shift-day-start').value && r.querySelector('.shift-day-end').value; });
    if(!src){ toast('Enter the times for one day first','error'); return; }
    var sv=src.querySelector('.shift-day-start').value, ev=src.querySelector('.shift-day-end').value, zEl0=src.querySelector('.shift-day-zone'), zv=zEl0?zEl0.value:'';
    trs.forEach(function(r){ if(r===src||r.querySelector('.shift-day-off-chk').checked) return;
      r.querySelector('.shift-day-start').value=sv; r.querySelector('.shift-day-end').value=ev; var z=r.querySelector('.shift-day-zone'); if(z&&!z.value) z.value=zv; });
    return;
  }
  if (t.closest('#btn-clash-replace')) { closeModal('modal-shift-clash'); saveShift(true); return; }
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
  if (t.closest('#shift-action-unabsent') || t.closest('#shift-action-abs-toggle')) {
    var toggle = !!t.closest('#shift-action-abs-toggle');
    closeModal('modal-shift-action');
    var dbA=getDB(); var sA=dbA.shifts.find(function(x){return x.id===_shiftActionId;});
    var aA=sA && (dbA.absences||[]).find(function(a){ return a.employee===sA.employee && a.date===_shiftActionDate; });
    if (aA) { if (toggle) toggleJustified(aA.id); else removeAbsent(aA.id); }
    return;
  }
  if (t.closest('#shift-action-late')) { closeModal('modal-shift-action'); openShiftAdjust('late', _shiftActionId); return; }
  if (t.closest('#shift-action-ot'))   { closeModal('modal-shift-action'); openShiftAdjust('overtime', _shiftActionId); return; }
  el = t.closest('[data-adjust-quick]');
  if (el) { var qm = parseInt(el.dataset.adjustQuick,10); document.getElementById('adjust-hours').value = String(Math.floor(qm/60)); document.getElementById('adjust-mins').value = String(qm%60); return; }
  if (t.closest('#btn-adjust-save')) { saveShiftAdjust(parseInt(document.getElementById('adjust-hours').value||'0',10)*60 + parseInt(document.getElementById('adjust-mins').value||'0',10)); return; }
  if (t.closest('#btn-adjust-clear')) { saveShiftAdjust(0); return; }
  if (t.closest('#shift-action-delete')) {
    closeModal('modal-shift-action');
    deleteShift(_shiftActionId); return;
  }
  if (t.closest('#btn-tips-unlock')) {
    tipsEditing[toDateStr(getWeekStart(shiftsWeekOffset))]=true; renderShiftsTipsTab();
    var ti=document.getElementById('shifts-tips-input'); if(ti) ti.focus(); return;
  }
  if (t.closest('#btn-tips-recalc') || t.closest('[data-tips-recalc]')) { recalculateTips(); return; }

  // Black Box tabs
  el = t.closest('[data-bb-tab]');
  if (el) { switchBbTab(el.dataset.bbTab); refreshSection('blackbox'); return; }
  if (t.closest('#btn-save-daily-entry')) { saveDailyEntry(); return; }
  if (t.closest('#btn-clear-daily')) { clearDailyEntry(); return; }
  if (t.closest('#btn-add-bb-item')) { openAddBbItemModal(); return; }
  if (t.closest('#btn-save-bb-item')) { saveBbItem(); return; }
  el = t.closest('[data-bb-minus]');
  if (el) { var bid=el.dataset.bbMinus; if(bbSelectedItems[bid]&&bbSelectedItems[bid]>0){bbSelectedItems[bid]--;if(bbSelectedItems[bid]===0) delete bbSelectedItems[bid];} bbQtyChanged(bid); return; }
  el = t.closest('[data-bb-plus]');
  if (el) { var bid2=el.dataset.bbPlus; bbSelectedItems[bid2]=(bbSelectedItems[bid2]||0)+1; bbQtyChanged(bid2); return; }
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
  // Day lists under the schedule: absent without a shift, justified toggle, remove
  el = t.closest('[data-mark-absent]');
  if (el) { markAbsent(el.dataset.markAbsent, el.dataset.absentDate, el.dataset.absentWs); return; }
  el = t.closest('[data-toggle-justified]');
  if (el) { if (el.dataset.toggleJustified) toggleJustified(el.dataset.toggleJustified); return; }
  el = t.closest('[data-remove-absent]');
  if (el) { if (el.dataset.removeAbsent) removeAbsent(el.dataset.removeAbsent); return; }
  el = t.closest('[data-remove-emp]');
  if (el) { removeEmployee(el.dataset.removeEmp); return; }
  if (t.closest('#btn-add-table-num')) { addTableNum(); return; }
  el = t.closest('[data-del-table]');
  if (el) { removeTableNum(el.dataset.delTable); return; }
  if (t.closest('#btn-change-pin')) { changePin(); return; }
  if (t.closest('#btn-save-fundo')) { saveFundoCaixa(); return; }
  if (t.closest('#btn-save-budgets')) { saveBudgets(); return; }
  if (t.closest('#btn-save-supabase')) { saveSupabase(); return; }
  if (t.closest('[data-test-notif]')) { sendTestNotification(); return; }
  if (t.closest('#btn-update-reload')) { location.reload(); return; }
  el = t.closest('[data-bud-mode]'); if (el) { setBudMode(el.dataset.budMode); return; }
  if (t.closest('#btn-bud-fill-ly')) { fillLastYearFromAccounting(); return; }
  if (t.closest('#btn-secure-migrate')) { runSecureMigrate(); return; }
  // Accounting
  el = t.closest('[data-acc-tab]'); if (el) { accTab = el.dataset.accTab; renderAccounting(); return; }
  // Invoices
  if (t.closest('#btn-inv-photo') || t.closest('#btn-inv-change-photo')) { var fi = document.getElementById('inv-file'); if (fi) { fi.value = ''; fi.click(); } return; }
  if (t.closest('#btn-inv-add')) { openInvoiceModal(null); return; }
  el = t.closest('[data-inv-filter]'); if (el) { invFilter = el.dataset.invFilter; renderAccounting(); return; }
  el = t.closest('[data-inv-paid]'); if (el) { var pi = invoices().find(function(x){ return x.id === el.dataset.invPaid; }); if (pi) invSetPaid(pi.id, !pi.paid); return; }
  el = t.closest('[data-inv-open]'); if (el) { openInvoiceModal(el.dataset.invOpen); return; }
  el = t.closest('[data-inv-supplier]'); if (el) { invSupplier = el.dataset.invSupplier; renderAccounting(); window.scrollTo(0, 0); return; }
  if (t.closest('#inv-back')) { invSupplier = null; renderAccounting(); return; }
  if (t.closest('#btn-save-invoice')) { saveInvoice(); return; }
  if (t.closest('#btn-delete-invoice')) { deleteInvoice(); return; }
  el = t.closest('[data-acc-month]'); if (el) { accMonth = +el.dataset.accMonth; renderAccounting(); return; }
  if (t.closest('#acc-year-prev') || t.closest('#acc-year-next')) { accYear += t.closest('#acc-year-prev') ? -1 : 1; renderAccounting(); accLoad(); return; }
  el = t.closest('[data-acc-open]'); if (el) { var ao = el.dataset.accOpen.split('|'); openAccLedger(ao[0], ao.slice(1).join('|')); return; }
  el = t.closest('[data-acc-entry-del]'); if (el) { if (confirm('Delete this entry?')) accDelete([el.dataset.accEntryDel]).then(function(){ renderAccLedger(); renderAccounting(); }).catch(function(){}); return; }
  if (t.closest('#btn-acc-led-add')) { addAccLedgerEntry(); return; }
  el = t.closest('[data-acc-new-line]'); if (el) { accNewLine(el.dataset.accNewLine); return; }
  el = t.closest('[data-acc-fill]'); if (el) { accFillLine(el.dataset.accFill); return; }
  el = t.closest('[data-acc-rule]'); if (el) { var ar = el.dataset.accRule.split('|'); accEditRule(ar[0], ar[1]); return; }
  el = t.closest('[data-acc-wage-del]'); if (el) {
    var wp = el.dataset.accWageDel;
    if (confirm('Remove ' + wp + ' from ' + accMonthLabel(accYear, accMonth) + '?')) accDelete(accRows(accYear, 'wage', accMonth).filter(function(e){ return accSame(e.line, wp); }).map(function(e){ return e.id; })).then(renderAccounting).catch(function(){});
    return;
  }
  if (t.closest('#acc-wage-copy')) { accCopyWages(); return; }
  // Food cost
  el = t.closest('[data-fc-view]'); if (el) { fcView = el.dataset.fcView; renderFoodCost(); return; }
  if (t.closest('#fc-new-dish')) { openFcDish(null); return; }
  if (t.closest('#fc-new-ing')) { openFcIng(null); return; }
  el = t.closest('[data-fc-dish]'); if (el) { openFcDish(el.dataset.fcDish); return; }
  el = t.closest('[data-fc-ing]'); if (el) { openFcIng(el.dataset.fcIng); return; }
  if (t.closest('#fc-target')) {
    var tg = prompt('Target food cost %', fcTarget()); if (tg === null) return;
    var tv = accNum(tg); if (!(tv > 0 && tv < 100)) { toast('Enter a % between 1 and 99', 'error'); return; }
    var cfg = accCfg(); cfg.foodCostTarget = tv; saveAccCfg(cfg); renderFoodCost(); return;
  }
  if (t.closest('#fc-add-line')) { fcEdit.lines.push({ ing: '', qty: '', unit: 'g' }); renderFcLines(); var ls = document.querySelectorAll('[data-fc-line-item]'); if (ls.length) ls[ls.length - 1].focus(); return; }
  el = t.closest('[data-fc-line-del]'); if (el) { fcEdit.lines.splice(+el.dataset.fcLineDel, 1); if (!fcEdit.lines.length) fcEdit.lines.push({ ing: '', qty: '', unit: 'g' }); renderFcLines(); return; }
  if (t.closest('#btn-fc-dish-save')) { saveFcDish(); return; }
  if (t.closest('#btn-fc-dish-del')) { deleteFcDish(); return; }
  if (t.closest('#btn-fc-dish-copy')) { var cid = fcEdit.id; closeModal('modal-fc-dish'); openFcDish(cid, true); return; }
  if (t.closest('#btn-fc-ing-save')) { saveFcIng(); return; }
  if (t.closest('#btn-fc-ing-del')) { deleteFcIng(); return; }
  if (t.closest('#acc-wage-add')) { accAddPerson(); return; }
  if (t.closest('#btn-notify-week')) { notifyWeekShifts(toDateStr(getWeekStart(shiftsWeekOffset))); return; }
  if (t.closest('#btn-enable-notif') || t.closest('#btn-enable-notif-2')) {
    if (isImpersonating()) { toast('Not while impersonating: this device would get their notifications', 'error'); return; }
    if (notifState === 'ios-install') { openModal('modal-ios-install'); return; }
    if (!('serviceWorker' in navigator) || !('PushManager' in window) || !('Notification' in window)) {
      toast(isIOSDevice() ? 'Notifications need iOS 16.4 or newer' : 'Push notifications not supported on this browser', 'error'); return;
    }
    if (Notification.permission === 'denied') {
      toast('Notifications are blocked for this site', 'error');
      showNotifHelp('Notifications are blocked for bardapraia.org. ' + esc(notifSettingsHint()) + ' Then tap the button again.');
      return;
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
    bbQtyChanged(qid);
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
// Black Box: tapping a quantity selects it, so typing replaces the number
document.addEventListener('focusin', function(e) {
  var t = e.target;
  if (t && t.dataset && t.dataset.bbQtyInput) { t._bbJustFocused = true; try { t.select(); } catch (er) {} }
});
// the tap that focused the box would otherwise drop the selection, so select again once it finishes
document.addEventListener('click', function(e) {
  var t = e.target;
  if (t && t.dataset && t.dataset.bbQtyInput && t._bbJustFocused) { t._bbJustFocused = false; try { t.select(); } catch (er) {} }
});
document.addEventListener('change', function(e) {
  var t = e.target;
  if (t.id === 'res-date-filter') { resDateFilter=t.value; renderAllReservations(); }
  if (t.id === 'ev-allday') evSyncTimes();
  if (t.id === 'inv-file' && t.files && t.files[0]) invSetFile(t.files[0]);
  if (t.id === 'inv-supplier') document.getElementById('inv-new-supplier-row').style.display = t.value === '__new__' ? '' : 'none';
  if (t.id === 'inv-paid') { var ipd = document.getElementById('inv-paid-date'); ipd.style.display = t.checked ? '' : 'none'; if (t.checked && !ipd.value) ipd.value = toDateStr(new Date()); }
  if (t.id === 'ev-everyone') evRenderPeople();
  if (t.name === 'req-kind') { reqKindChanged(); }
  if (t.dataset && t.dataset.fcLineItem !== undefined) {
    var li = +t.dataset.fcLineItem, lv = t.value, ln = fcEdit.lines[li];
    if (lv === 'new') {
      openFcIng(null, function(ing){ ln.ing = ing.id; delete ln.rec; ln.unit = FC_UNITS[ing.unit][0][0]; renderFcLines(); });
      t.value = ln.rec ? 'r:' + ln.rec : (ln.ing ? 'i:' + ln.ing : '');
    } else if (lv.indexOf('r:') === 0) { ln.rec = lv.slice(2); delete ln.ing; ln.unit = 'portion'; renderFcLines(); }
    else { ln.ing = lv.slice(2); delete ln.rec; var ig = fcIngs().find(function(x){ return x.id === ln.ing; }); if (ig) ln.unit = ig.unit === 'un' ? 'un' : (ig.unit === 'L' ? 'ml' : 'g'); renderFcLines(); }
  }
  if (t.dataset && t.dataset.fcLineUnit !== undefined) { fcEdit.lines[+t.dataset.fcLineUnit].unit = t.value; renderFcLines(); }
  if (t.id === 'fc-ing-unit') fcIngUnitLabel();
  if (t.id === 'fc-dish-name' && fcEdit) {
    var mi = (getDB().bbMenu || []).find(function(m){ return accSame(m.name, t.value); });
    if (mi && !accNum(document.getElementById('fc-dish-price').value)) { document.getElementById('fc-dish-price').value = accIn(mi.price); document.getElementById('fc-dish-vat').value = (['beverages','wine','cocktails','spirits','beer'].indexOf(mi.category) !== -1) ? '23' : '13'; }
    renderFcTotals();
  }
  if (t.id === 'fc-dish-price' || t.id === 'fc-dish-vat' || t.id === 'fc-dish-portions') renderFcTotals();
  if (t.id === 'inv-net' || t.id === 'inv-vat' || t.id === 'inv-total') invCheckAmounts(t.id);
  if (t.dataset && t.dataset.accCell) {
    var ac = t.dataset.accCell.split('|');   // kind|line|part|month
    accSetCell(ac[0], accYear, ac[3] ? +ac[3] : accMonth, ac[1], ac[2] || '', t.value);
  }
  if (t.id === 'res-date' || t.id === 'res-time' || t.id === 'res-end') { refreshResTableGrid(); }
  if (t.id === 'req-colleague') { reqSwapHint(); }
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
  if (t.id === 'hours-from' || t.id === 'hours-to') {
    var hf = document.getElementById('hours-from').value, ht = document.getElementById('hours-to').value;
    if (hf && ht) { hoursRange = { custom:true, from:hf, to:ht, preset:'' }; renderShiftsHoursTab(); }
  }
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
        row.querySelector('.shift-day-start').value = '';
        row.querySelector('.shift-day-end').value   = '';
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

  loadAuthStatus().then(function(){ return authToken(); }).then(function(){
    // Secure mode without a session: nothing can be read before logging in
    if (isSecure() && !authSession) { try { localStorage.removeItem(SESSION_KEY); } catch (e) {} return 'login'; }
    return syncFromSupabase();
  }).then(function(state) {
    clearTimeout(syncSafetyTimer);
    syncReady = true;
    unlockLogin(false);
    if (state === 'login') return;
    if (!isSecure()) {
      showMigrationNotice(sbMissingItems);
      if (sbMissingItems.length > 0) toast('DB migration needed \u2014 check Settings', 'error');
    }
    if (authSession && authSession.meta && authSession.meta.app_user_id) { loginFromSession(false); return; }

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
