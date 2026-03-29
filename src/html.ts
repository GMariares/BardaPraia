export function getAppHTML(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Bar da Praia</title>
  <script src="https://cdn.tailwindcss.com"><\/script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            ocean: {
              50:  '#f0f9ff',
              100: '#e0f2fe',
              200: '#bae6fd',
              300: '#7dd3fc',
              400: '#38bdf8',
              500: '#0ea5e9',
              600: '#0284c7',
              700: '#0369a1',
              800: '#075985',
              900: '#0c4a6e',
            },
            sand: { 50:'#fefdf8', 100:'#fef9eb', 200:'#fde68a', 300:'#fcd34d' }
          }
        }
      }
    }
  <\/script>
  <style>
    *{box-sizing:border-box}
    body{font-family:'Segoe UI',system-ui,sans-serif}
    ::-webkit-scrollbar{width:6px;height:6px}
    ::-webkit-scrollbar-track{background:#f0f9ff}
    ::-webkit-scrollbar-thumb{background:#7dd3fc;border-radius:3px}
    .nav-item{transition:all .2s ease}
    .nav-item.active{background:linear-gradient(135deg,#0ea5e9,#0284c7);color:white;box-shadow:0 4px 15px rgba(14,165,233,.35)}
    .nav-item:not(.active):hover{background:#e0f2fe;color:#0369a1}
    .card{background:white;border-radius:16px;box-shadow:0 2px 20px rgba(0,0,0,.06);border:1px solid #e0f2fe;transition:box-shadow .2s}
    .card:hover{box-shadow:0 4px 30px rgba(14,165,233,.12)}
    .btn-primary{background:linear-gradient(135deg,#0ea5e9,#0284c7);color:white;border-radius:10px;padding:8px 18px;font-weight:600;transition:all .2s;border:none;cursor:pointer;display:inline-flex;align-items:center;gap:6px}
    .btn-primary:hover{box-shadow:0 4px 15px rgba(14,165,233,.4);transform:translateY(-1px)}
    .btn-secondary{background:white;color:#0284c7;border:1.5px solid #7dd3fc;border-radius:10px;padding:8px 18px;font-weight:600;transition:all .2s;cursor:pointer;display:inline-flex;align-items:center;gap:6px}
    .btn-secondary:hover{background:#e0f2fe}
    .btn-danger{background:#fee2e2;color:#dc2626;border-radius:10px;padding:8px 18px;font-weight:600;transition:all .2s;border:1.5px solid #fca5a5;cursor:pointer}
    .btn-danger:hover{background:#fecaca}
    .btn-sm{padding:5px 12px;font-size:13px;border-radius:8px}
    .input-field{width:100%;border:1.5px solid #bae6fd;border-radius:10px;padding:9px 14px;font-size:14px;color:#0c4a6e;background:#f0f9ff;outline:none;transition:border .2s}
    .input-field:focus{border-color:#0ea5e9;background:white;box-shadow:0 0 0 3px rgba(14,165,233,.1)}
    .input-field::placeholder{color:#7dd3fc}
    .select-field{width:100%;border:1.5px solid #bae6fd;border-radius:10px;padding:9px 14px;font-size:14px;color:#0c4a6e;background:#f0f9ff;outline:none;cursor:pointer;appearance:none}
    .select-field:focus{border-color:#0ea5e9;background:white}
    .label{font-size:12px;font-weight:600;color:#0369a1;text-transform:uppercase;letter-spacing:.05em;margin-bottom:5px;display:block}
    .badge{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:600}
    .badge-green{background:#dcfce7;color:#16a34a}
    .badge-red{background:#fee2e2;color:#dc2626}
    .badge-yellow{background:#fef9c3;color:#ca8a04}
    .badge-blue{background:#dbeafe;color:#1d4ed8}
    .badge-gray{background:#f3f4f6;color:#6b7280}
    .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.4);backdrop-filter:blur(4px);z-index:1000;display:flex;align-items:center;justify-content:center;padding:16px}
    .modal{background:white;border-radius:20px;padding:28px;width:100%;max-width:500px;max-height:90vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,.2)}
    .modal-lg{max-width:700px}
    .modal h2{font-size:20px;font-weight:700;color:#0c4a6e;margin-bottom:20px;display:flex;align-items:center;gap:8px}
    .hidden{display:none}
    .calendar-day{border-radius:12px;padding:8px 4px;text-align:center;cursor:pointer;transition:all .2s;min-height:64px;border:1.5px solid transparent}
    .calendar-day:hover{background:#e0f2fe;border-color:#7dd3fc}
    .calendar-day.today{border-color:#0ea5e9;background:#f0f9ff}
    .calendar-day.selected{background:linear-gradient(135deg,#0ea5e9,#0284c7);color:white}
    .day-dots{display:flex;gap:3px;justify-content:center;flex-wrap:wrap;margin-top:4px}
    .day-dots span{width:6px;height:6px;border-radius:50%;display:inline-block}
    .reservation-item{border-left:4px solid #0ea5e9;background:white;border-radius:0 12px 12px 0;padding:12px 16px;margin-bottom:8px;cursor:pointer;transition:all .2s}
    .reservation-item:hover{transform:translateX(3px);box-shadow:0 4px 15px rgba(14,165,233,.15)}
    .reservation-item.no-show{border-left-color:#dc2626;background:#fff5f5}
    .reservation-item.confirmed{border-left-color:#16a34a;background:#f0fdf4}
    .task-item{background:white;border-radius:12px;padding:14px 16px;margin-bottom:8px;border:1.5px solid #e0f2fe;transition:all .2s}
    .task-item:hover{border-color:#7dd3fc;box-shadow:0 4px 15px rgba(14,165,233,.1)}
    .task-item.done{opacity:.6;background:#f8fafc}
    .inv-row{display:grid;grid-template-columns:2fr 1fr 1fr 1fr 1fr 1fr 110px;gap:8px;align-items:center;padding:12px 16px;border-bottom:1px solid #f0f9ff;transition:background .15s}
    .inv-row:hover{background:#f8fdff}
    .inv-header{font-size:11px;font-weight:700;color:#0369a1;text-transform:uppercase;letter-spacing:.06em;background:#f0f9ff}
    .status-low{color:#dc2626;font-weight:700}
    .status-ok{color:#16a34a;font-weight:600}
    .pulse-dot{width:8px;height:8px;border-radius:50%;display:inline-block}
    .pulse-dot.green{background:#22c55e}
    .pulse-dot.red{background:#ef4444;animation:pulse 1.5s infinite}
    .pulse-dot.yellow{background:#f59e0b}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
    .toast{position:fixed;bottom:24px;right:24px;background:#0c4a6e;color:white;padding:12px 20px;border-radius:12px;font-weight:600;z-index:9999;box-shadow:0 8px 30px rgba(0,0,0,.2);animation:slideUp .3s ease}
    @keyframes slideUp{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}
    .progress-bar{height:6px;border-radius:3px;background:#e0f2fe;overflow:hidden}
    .progress-fill{height:100%;border-radius:3px;background:linear-gradient(90deg,#0ea5e9,#0284c7);transition:width .5s ease}
    .progress-fill.low{background:linear-gradient(90deg,#ef4444,#dc2626)}
    .tab-btn{padding:8px 18px;border-radius:10px;font-weight:600;font-size:13px;cursor:pointer;transition:all .2s;border:none}
    .tab-btn.active{background:linear-gradient(135deg,#0ea5e9,#0284c7);color:white}
    .tab-btn:not(.active){background:#f0f9ff;color:#0369a1}
    .tab-btn:not(.active):hover{background:#e0f2fe}
    .glass{background:rgba(255,255,255,.7);backdrop-filter:blur(10px)}
    .gradient-header{background:linear-gradient(135deg,#0c4a6e 0%,#0369a1 50%,#0ea5e9 100%)}
    @media(max-width:768px){
      .inv-row{grid-template-columns:1fr}
      .sidebar{display:none}
      .mobile-nav{display:flex!important}
    }
  </style>
</head>
<body class="bg-gradient-to-br from-ocean-50 to-sky-100 min-h-screen">
<div id="app" class="flex h-screen overflow-hidden">

  <!-- Sidebar -->
  <aside class="sidebar w-64 flex-shrink-0 gradient-header flex flex-col">
    <div class="p-6 border-b border-white/10">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl">🌊</div>
        <div>
          <div class="text-white font-bold text-lg leading-tight">Bar da Praia</div>
          <div class="text-ocean-200 text-xs">Management System</div>
        </div>
      </div>
    </div>
    <nav class="flex-1 p-4 space-y-2">
      <div class="text-ocean-300 text-xs font-semibold uppercase tracking-widest px-3 mb-3">Menu</div>
      <button onclick="showSection('dashboard')" class="nav-item w-full flex items-center gap-3 px-4 py-3 rounded-xl text-ocean-100 font-medium text-sm" id="nav-dashboard"><i class="fas fa-home w-4"></i> Dashboard</button>
      <button onclick="showSection('inventory')" class="nav-item w-full flex items-center gap-3 px-4 py-3 rounded-xl text-ocean-100 font-medium text-sm" id="nav-inventory"><i class="fas fa-boxes-stacked w-4"></i> Inventory</button>
      <button onclick="showSection('reservations')" class="nav-item w-full flex items-center gap-3 px-4 py-3 rounded-xl text-ocean-100 font-medium text-sm" id="nav-reservations"><i class="fas fa-calendar-days w-4"></i> Reservations</button>
      <button onclick="showSection('tasks')" class="nav-item w-full flex items-center gap-3 px-4 py-3 rounded-xl text-ocean-100 font-medium text-sm" id="nav-tasks"><i class="fas fa-list-check w-4"></i> Tasks</button>
      <div class="text-ocean-300 text-xs font-semibold uppercase tracking-widest px-3 mt-5 mb-3">Config</div>
      <button onclick="showSection('settings')" class="nav-item w-full flex items-center gap-3 px-4 py-3 rounded-xl text-ocean-100 font-medium text-sm" id="nav-settings"><i class="fas fa-gear w-4"></i> Settings</button>
    </nav>
    <div class="p-4 border-t border-white/10">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm">👤</div>
        <div>
          <div class="text-white text-sm font-medium" id="sidebar-user">Manager</div>
          <div class="text-ocean-300 text-xs">Active session</div>
        </div>
      </div>
    </div>
  </aside>

  <!-- Mobile Bottom Nav -->
  <div class="mobile-nav hidden fixed bottom-0 inset-x-0 z-50 bg-white border-t border-ocean-100 px-2 py-2 justify-around">
    <button onclick="showSection('dashboard')" class="flex flex-col items-center gap-1 text-xs text-ocean-500 px-3 py-1 rounded-lg" id="mnav-dashboard"><i class="fas fa-home text-base"></i>Home</button>
    <button onclick="showSection('inventory')" class="flex flex-col items-center gap-1 text-xs text-ocean-500 px-3 py-1 rounded-lg" id="mnav-inventory"><i class="fas fa-boxes-stacked text-base"></i>Stock</button>
    <button onclick="showSection('reservations')" class="flex flex-col items-center gap-1 text-xs text-ocean-500 px-3 py-1 rounded-lg" id="mnav-reservations"><i class="fas fa-calendar-days text-base"></i>Reserve</button>
    <button onclick="showSection('tasks')" class="flex flex-col items-center gap-1 text-xs text-ocean-500 px-3 py-1 rounded-lg" id="mnav-tasks"><i class="fas fa-list-check text-base"></i>Tasks</button>
    <button onclick="showSection('settings')" class="flex flex-col items-center gap-1 text-xs text-ocean-500 px-3 py-1 rounded-lg" id="mnav-settings"><i class="fas fa-gear text-base"></i>Settings</button>
  </div>

  <!-- Main -->
  <main class="flex-1 overflow-y-auto">
    <div class="glass sticky top-0 z-40 border-b border-ocean-100 px-6 py-4 flex items-center justify-between">
      <div>
        <h1 class="text-ocean-900 font-bold text-xl" id="page-title">Dashboard</h1>
        <p class="text-ocean-400 text-sm" id="page-subtitle">Welcome back!</p>
      </div>
      <div class="flex items-center gap-3">
        <div class="text-ocean-500 text-sm hidden md:block" id="current-date-display"></div>
        <div class="w-px h-6 bg-ocean-100 hidden md:block"></div>
        <select class="text-sm text-ocean-700 bg-ocean-50 border border-ocean-200 rounded-lg px-3 py-1.5" id="global-employee-select" onchange="globalEmployeeChange(this.value)">
          <option value="">Select Employee</option>
        </select>
      </div>
    </div>

    <div class="p-4 md:p-6" id="content-area">

      <!-- DASHBOARD -->
      <section id="section-dashboard">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          <div class="card p-4">
            <div class="flex items-center justify-between mb-2"><div class="w-9 h-9 rounded-xl bg-ocean-100 flex items-center justify-center text-lg">📦</div><span class="badge badge-green text-xs" id="dash-inv-status">OK</span></div>
            <div class="text-2xl font-bold text-ocean-900" id="dash-inv-count">0</div>
            <div class="text-ocean-400 text-xs">Inventory Items</div>
            <div class="text-xs text-red-500 mt-1 min-h-4" id="dash-inv-low"></div>
          </div>
          <div class="card p-4">
            <div class="flex items-center justify-between mb-2"><div class="w-9 h-9 rounded-xl bg-ocean-100 flex items-center justify-center text-lg">🪑</div><span class="badge badge-blue text-xs">Today</span></div>
            <div class="text-2xl font-bold text-ocean-900" id="dash-res-count">0</div>
            <div class="text-ocean-400 text-xs">Reservations Today</div>
            <div class="text-xs text-ocean-300 mt-1 min-h-4"></div>
          </div>
          <div class="card p-4">
            <div class="flex items-center justify-between mb-2"><div class="w-9 h-9 rounded-xl bg-ocean-100 flex items-center justify-center text-lg">✅</div><span class="badge badge-yellow text-xs" id="dash-task-badge">Open</span></div>
            <div class="text-2xl font-bold text-ocean-900" id="dash-task-count">0</div>
            <div class="text-ocean-400 text-xs">Open Tasks</div>
            <div class="text-xs text-ocean-300 mt-1 min-h-4"></div>
          </div>
          <div class="card p-4">
            <div class="flex items-center justify-between mb-2"><div class="w-9 h-9 rounded-xl bg-ocean-100 flex items-center justify-center text-lg">🏖️</div><span class="badge badge-blue text-xs">Tables</span></div>
            <div class="text-2xl font-bold text-ocean-900" id="dash-tables">0</div>
            <div class="text-ocean-400 text-xs">Total Tables</div>
            <div class="text-xs text-ocean-300 mt-1 min-h-4"></div>
          </div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div class="card p-5">
            <h3 class="font-bold text-ocean-800 mb-4 flex items-center gap-2"><i class="fas fa-triangle-exclamation text-amber-400"></i> Low Stock Alerts</h3>
            <div id="dash-low-stock"><div class="text-ocean-300 text-sm text-center py-6">All good! No alerts 🎉</div></div>
          </div>
          <div class="card p-5">
            <h3 class="font-bold text-ocean-800 mb-4 flex items-center gap-2"><i class="fas fa-calendar-day text-ocean-400"></i> Today's Reservations</h3>
            <div id="dash-today-res"><div class="text-ocean-300 text-sm text-center py-6">No reservations today</div></div>
          </div>
        </div>
      </section>

      <!-- INVENTORY -->
      <section id="section-inventory" class="hidden">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div class="flex gap-2 flex-wrap">
            <button class="tab-btn active" id="inv-tab-stock" onclick="switchInvTab('stock')"><i class="fas fa-warehouse mr-1"></i>Stock</button>
            <button class="tab-btn" id="inv-tab-log" onclick="switchInvTab('log')"><i class="fas fa-clock-rotate-left mr-1"></i>Log</button>
            <button class="tab-btn" id="inv-tab-orders" onclick="switchInvTab('orders')"><i class="fas fa-truck mr-1"></i>Orders</button>
          </div>
          <div class="flex gap-2">
            <button class="btn-secondary btn-sm" onclick="openOrderModal()"><i class="fas fa-cart-shopping"></i> Place Order</button>
            <button class="btn-primary btn-sm" onclick="openAddInventoryModal()"><i class="fas fa-plus"></i> Add Item</button>
          </div>
        </div>
        <div class="card p-3 mb-4 flex items-center gap-3">
          <i class="fas fa-search text-ocean-400 ml-1"></i>
          <input type="text" placeholder="Search items..." class="flex-1 outline-none text-sm text-ocean-800 bg-transparent" oninput="filterInventory(this.value)" id="inv-search"/>
          <select class="text-sm text-ocean-600 bg-transparent border-none outline-none" onchange="filterInventoryCategory(this.value)">
            <option value="">All Categories</option>
            <option value="beverages">🍹 Beverages</option>
            <option value="food">🍔 Food</option>
            <option value="supplies">🧹 Supplies</option>
            <option value="equipment">🔧 Equipment</option>
            <option value="other">📦 Other</option>
          </select>
        </div>
        <div id="inv-panel-stock">
          <div class="card overflow-hidden">
            <div class="inv-row inv-header"><div>Item</div><div class="text-center">In Bar</div><div class="text-center">In Storage</div><div class="text-center">Total</div><div class="text-center">Minimum</div><div class="text-center">Status</div><div class="text-center">Actions</div></div>
            <div id="inventory-list"><div class="text-center py-12 text-ocean-300"><i class="fas fa-box-open text-3xl mb-3 block"></i>No items yet.</div></div>
          </div>
        </div>
        <div id="inv-panel-log" class="hidden">
          <div class="card p-5"><h3 class="font-bold text-ocean-800 mb-4"><i class="fas fa-clock-rotate-left mr-2 text-ocean-400"></i>Inventory Updates Log</h3><div id="inv-log-list"><div class="text-center py-8 text-ocean-300">No log entries yet.</div></div></div>
        </div>
        <div id="inv-panel-orders" class="hidden">
          <div class="card p-5"><h3 class="font-bold text-ocean-800 mb-4"><i class="fas fa-truck mr-2 text-ocean-400"></i>Order History</h3><div id="inv-orders-list"><div class="text-center py-8 text-ocean-300">No orders placed yet.</div></div></div>
        </div>
      </section>

      <!-- RESERVATIONS -->
      <section id="section-reservations" class="hidden">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div class="flex gap-2">
            <button class="tab-btn active" id="res-tab-calendar" onclick="switchResTab('calendar')"><i class="fas fa-calendar-week mr-1"></i>Calendar</button>
            <button class="tab-btn" id="res-tab-list" onclick="switchResTab('list')"><i class="fas fa-list mr-1"></i>All</button>
          </div>
          <button class="btn-primary btn-sm" onclick="openAddReservationModal()"><i class="fas fa-plus"></i> New Reservation</button>
        </div>
        <div id="res-panel-calendar">
          <div class="card p-5 mb-4">
            <div class="flex items-center justify-between mb-5">
              <button class="btn-secondary btn-sm" onclick="prevWeek()"><i class="fas fa-chevron-left"></i> Prev</button>
              <span class="font-bold text-ocean-800" id="calendar-week-label"></span>
              <button class="btn-secondary btn-sm" onclick="nextWeek()">Next <i class="fas fa-chevron-right"></i></button>
            </div>
            <div class="grid grid-cols-7 gap-1 md:gap-2" id="calendar-grid"></div>
          </div>
          <div class="card p-5" id="res-day-panel">
            <h3 class="font-bold text-ocean-800 mb-4 flex items-center gap-2"><i class="fas fa-calendar-day text-ocean-400"></i><span id="res-day-label">Select a day</span></h3>
            <div id="res-day-list"><div class="text-center py-6 text-ocean-300">Click on a day to see reservations</div></div>
          </div>
        </div>
        <div id="res-panel-list" class="hidden">
          <div class="card p-3 mb-4 flex items-center gap-3">
            <i class="fas fa-search text-ocean-400 ml-1"></i>
            <input type="text" placeholder="Search by name, table..." class="flex-1 outline-none text-sm text-ocean-800 bg-transparent" oninput="filterReservations(this.value)"/>
            <input type="date" class="text-sm text-ocean-600 bg-transparent border-none outline-none" onchange="filterReservationsByDate(this.value)"/>
          </div>
          <div class="card overflow-hidden"><div id="res-all-list"><div class="text-center py-12 text-ocean-300">No reservations yet.</div></div></div>
        </div>
      </section>

      <!-- TASKS -->
      <section id="section-tasks" class="hidden">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div class="flex gap-2 flex-wrap" id="task-filter-btns">
            <button class="tab-btn active" onclick="filterTasks('all',this)">All</button>
            <button class="tab-btn" onclick="filterTasks('pending',this)">Pending</button>
            <button class="tab-btn" onclick="filterTasks('in-progress',this)">In Progress</button>
            <button class="tab-btn" onclick="filterTasks('done',this)">Done</button>
          </div>
          <button class="btn-primary btn-sm" onclick="openAddTaskModal()"><i class="fas fa-plus"></i> New Task</button>
        </div>
        <div class="grid grid-cols-3 gap-3 mb-4">
          <div class="card p-4 flex items-center gap-3"><div class="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center">⏳</div><div><div class="text-xl font-bold text-ocean-900" id="task-count-pending">0</div><div class="text-xs text-ocean-400">Pending</div></div></div>
          <div class="card p-4 flex items-center gap-3"><div class="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center">🔄</div><div><div class="text-xl font-bold text-ocean-900" id="task-count-progress">0</div><div class="text-xs text-ocean-400">In Progress</div></div></div>
          <div class="card p-4 flex items-center gap-3"><div class="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center">✅</div><div><div class="text-xl font-bold text-ocean-900" id="task-count-done">0</div><div class="text-xs text-ocean-400">Done</div></div></div>
        </div>
        <div id="task-list"><div class="card p-8 text-center text-ocean-300"><i class="fas fa-clipboard-list text-3xl mb-3 block"></i>No tasks yet!</div></div>
      </section>

      <!-- SETTINGS -->
      <section id="section-settings" class="hidden">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div class="card p-6">
            <h3 class="font-bold text-ocean-800 text-base mb-4 flex items-center gap-2"><i class="fas fa-users text-ocean-400"></i> Team Members</h3>
            <div id="employee-list" class="space-y-2 mb-4"></div>
            <div class="flex gap-2"><input type="text" id="new-employee-name" class="input-field" placeholder="Employee name..."/><button class="btn-primary" onclick="addEmployee()"><i class="fas fa-plus"></i></button></div>
          </div>
          <div class="card p-6">
            <h3 class="font-bold text-ocean-800 text-base mb-4 flex items-center gap-2"><i class="fas fa-chair text-ocean-400"></i> Table Configuration</h3>
            <p class="text-sm text-ocean-400 mb-4">Set the total number of tables in the restaurant.</p>
            <div class="flex gap-3 items-end">
              <div class="flex-1"><label class="label">Number of Tables</label><input type="number" id="tables-count-input" class="input-field" min="1" max="100" value="10"/></div>
              <button class="btn-primary" onclick="saveTables()"><i class="fas fa-save"></i> Save</button>
            </div>
            <div class="mt-4 p-3 bg-ocean-50 rounded-xl"><div class="text-sm text-ocean-600">Current setup: <strong id="tables-display">10 tables</strong></div></div>
          </div>
          <div class="card p-6">
            <h3 class="font-bold text-ocean-800 text-base mb-4 flex items-center gap-2"><i class="fas fa-tags text-ocean-400"></i> Categories</h3>
            <div class="space-y-2">
              <div class="flex items-center gap-3 p-2 bg-ocean-50 rounded-lg"><span>🍹</span><span class="text-sm font-medium text-ocean-700">Beverages</span></div>
              <div class="flex items-center gap-3 p-2 bg-ocean-50 rounded-lg"><span>🍔</span><span class="text-sm font-medium text-ocean-700">Food</span></div>
              <div class="flex items-center gap-3 p-2 bg-ocean-50 rounded-lg"><span>🧹</span><span class="text-sm font-medium text-ocean-700">Supplies</span></div>
              <div class="flex items-center gap-3 p-2 bg-ocean-50 rounded-lg"><span>🔧</span><span class="text-sm font-medium text-ocean-700">Equipment</span></div>
              <div class="flex items-center gap-3 p-2 bg-ocean-50 rounded-lg"><span>📦</span><span class="text-sm font-medium text-ocean-700">Other</span></div>
            </div>
          </div>
          <div class="card p-6">
            <h3 class="font-bold text-ocean-800 text-base mb-4 flex items-center gap-2"><i class="fas fa-database text-ocean-400"></i> Supabase Connection</h3>
            <p class="text-sm text-ocean-400 mb-4">Connect Supabase for cloud persistence. Currently using local browser storage.</p>
            <div class="space-y-3">
              <div><label class="label">Project URL</label><input type="text" id="sb-url" class="input-field" placeholder="https://xxx.supabase.co"/></div>
              <div><label class="label">Anon Key</label><input type="password" id="sb-key" class="input-field" placeholder="eyJh..."/></div>
              <button class="btn-primary w-full justify-center" onclick="saveSupabase()"><i class="fas fa-plug"></i> Connect Supabase</button>
            </div>
            <div class="mt-3 p-3 rounded-xl flex items-center gap-2 bg-green-50" id="sb-status-box">
              <span class="pulse-dot green"></span>
              <span class="text-sm text-green-700" id="sb-status-text">Using local storage</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  </main>
</div>

<!-- MODALS -->
<div class="modal-overlay hidden" id="modal-add-inventory">
  <div class="modal">
    <h2><i class="fas fa-plus-circle text-ocean-400"></i><span id="inv-modal-title">Add Inventory Item</span></h2>
    <div class="space-y-4">
      <div><label class="label">Employee Registering</label><select class="select-field" id="inv-employee"></select></div>
      <div class="grid grid-cols-2 gap-3">
        <div><label class="label">Item Name *</label><input type="text" class="input-field" id="inv-item-name" placeholder="e.g. Water Bottle"/></div>
        <div><label class="label">Category</label><select class="select-field" id="inv-category"><option value="beverages">🍹 Beverages</option><option value="food">🍔 Food</option><option value="supplies">🧹 Supplies</option><option value="equipment">🔧 Equipment</option><option value="other">📦 Other</option></select></div>
      </div>
      <div><label class="label">Unit (optional)</label><input type="text" class="input-field" id="inv-unit" placeholder="bottles, kg, boxes..."/></div>
      <div class="grid grid-cols-3 gap-3">
        <div><label class="label">Qty in Bar</label><input type="number" class="input-field" id="inv-qty-bar" min="0" value="0"/></div>
        <div><label class="label">Qty in Storage</label><input type="number" class="input-field" id="inv-qty-storage" min="0" value="0"/></div>
        <div><label class="label">Minimum Stock</label><input type="number" class="input-field" id="inv-minimum" min="0" value="10"/></div>
      </div>
      <div class="flex gap-3 pt-2">
        <button class="btn-primary flex-1 justify-center" onclick="saveInventoryItem()"><i class="fas fa-save"></i> Save</button>
        <button class="btn-secondary flex-1 justify-center" onclick="closeModal('modal-add-inventory')">Cancel</button>
      </div>
    </div>
  </div>
</div>

<div class="modal-overlay hidden" id="modal-edit-minimum">
  <div class="modal">
    <h2><i class="fas fa-sliders text-ocean-400"></i> Edit Minimum Stock</h2>
    <input type="hidden" id="edit-min-id"/>
    <div class="space-y-4">
      <div class="p-4 bg-ocean-50 rounded-xl"><div class="font-bold text-ocean-800" id="edit-min-item-name"></div><div class="text-sm text-ocean-400 mt-1">Current stock: <span id="edit-min-current"></span></div></div>
      <div><label class="label">New Minimum Quantity</label><input type="number" class="input-field" id="edit-min-value" min="0"/></div>
      <div class="flex gap-3"><button class="btn-primary flex-1 justify-center" onclick="saveMinimum()"><i class="fas fa-save"></i> Update</button><button class="btn-secondary flex-1 justify-center" onclick="closeModal('modal-edit-minimum')">Cancel</button></div>
    </div>
  </div>
</div>

<div class="modal-overlay hidden" id="modal-update-qty">
  <div class="modal">
    <h2><i class="fas fa-pen text-ocean-400"></i> Update Stock Quantities</h2>
    <input type="hidden" id="update-qty-id"/>
    <div class="space-y-4">
      <div><label class="label">Employee</label><select class="select-field" id="update-qty-employee"></select></div>
      <div class="p-4 bg-ocean-50 rounded-xl font-bold text-ocean-800" id="update-qty-name"></div>
      <div class="grid grid-cols-2 gap-3">
        <div><label class="label">Qty in Bar</label><input type="number" class="input-field" id="update-qty-bar" min="0"/></div>
        <div><label class="label">Qty in Storage</label><input type="number" class="input-field" id="update-qty-storage" min="0"/></div>
      </div>
      <div class="flex gap-3"><button class="btn-primary flex-1 justify-center" onclick="saveQtyUpdate()"><i class="fas fa-save"></i> Update</button><button class="btn-secondary flex-1 justify-center" onclick="closeModal('modal-update-qty')">Cancel</button></div>
    </div>
  </div>
</div>

<div class="modal-overlay hidden" id="modal-order">
  <div class="modal modal-lg">
    <h2><i class="fas fa-cart-shopping text-ocean-400"></i> Place Supplier Order</h2>
    <p class="text-sm text-ocean-400 mb-4">Items below minimum. Suggested order to reach minimum stock level.</p>
    <div id="order-items-list" class="space-y-3 mb-5 max-h-72 overflow-y-auto"></div>
    <div class="flex gap-3"><button class="btn-primary flex-1 justify-center" onclick="confirmOrder()"><i class="fas fa-paper-plane"></i> Confirm Order</button><button class="btn-secondary flex-1 justify-center" onclick="closeModal('modal-order')">Cancel</button></div>
  </div>
</div>

<div class="modal-overlay hidden" id="modal-add-reservation">
  <div class="modal">
    <h2><i class="fas fa-calendar-plus text-ocean-400"></i><span id="res-modal-title">New Reservation</span></h2>
    <input type="hidden" id="res-edit-id"/>
    <div class="space-y-4">
      <div class="grid grid-cols-2 gap-3">
        <div><label class="label">Guest Name *</label><input type="text" class="input-field" id="res-guest-name" placeholder="Full name"/></div>
        <div><label class="label">Phone</label><input type="text" class="input-field" id="res-phone" placeholder="+351..."/></div>
      </div>
      <div class="grid grid-cols-3 gap-3">
        <div><label class="label">Date *</label><input type="date" class="input-field" id="res-date"/></div>
        <div><label class="label">Time *</label><input type="time" class="input-field" id="res-time"/></div>
        <div><label class="label">Guests *</label><input type="number" class="input-field" id="res-guests" min="1" max="50" value="2"/></div>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div><label class="label">Table *</label><select class="select-field" id="res-table"></select></div>
        <div><label class="label">Special Requests</label><input type="text" class="input-field" id="res-notes" placeholder="Allergies, occasion..."/></div>
      </div>
      <div class="flex gap-3 pt-2"><button class="btn-primary flex-1 justify-center" onclick="saveReservation()"><i class="fas fa-save"></i> Save</button><button class="btn-secondary flex-1 justify-center" onclick="closeModal('modal-add-reservation')">Cancel</button></div>
    </div>
  </div>
</div>

<div class="modal-overlay hidden" id="modal-res-detail">
  <div class="modal">
    <h2><i class="fas fa-calendar-check text-ocean-400"></i> Reservation Details</h2>
    <div id="res-detail-content" class="space-y-3 mb-5"></div>
    <div class="flex flex-wrap gap-2" id="res-detail-actions"></div>
  </div>
</div>

<div class="modal-overlay hidden" id="modal-add-task">
  <div class="modal">
    <h2><i class="fas fa-clipboard-list text-ocean-400"></i><span id="task-modal-title">New Task</span></h2>
    <input type="hidden" id="task-edit-id"/>
    <div class="space-y-4">
      <div><label class="label">Task Title *</label><input type="text" class="input-field" id="task-title" placeholder="e.g. Fix the espresso machine"/></div>
      <div><label class="label">Description</label><textarea class="input-field resize-none" style="height:72px" id="task-description" placeholder="More details..."></textarea></div>
      <div class="grid grid-cols-2 gap-3">
        <div><label class="label">Category</label><select class="select-field" id="task-category"><option value="maintenance">🔧 Maintenance</option><option value="cleaning">🧹 Cleaning</option><option value="call">📞 Call Someone</option><option value="purchase">🛒 Purchase</option><option value="admin">📋 Admin</option><option value="staff">👥 Staff</option><option value="other">📌 Other</option></select></div>
        <div><label class="label">Priority</label><select class="select-field" id="task-priority"><option value="low">🟢 Low</option><option value="medium">🟡 Medium</option><option value="high">🔴 High</option></select></div>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div><label class="label">Assigned To</label><select class="select-field" id="task-assigned"></select></div>
        <div><label class="label">Deadline</label><input type="date" class="input-field" id="task-deadline"/></div>
      </div>
      <div class="flex gap-3 pt-2"><button class="btn-primary flex-1 justify-center" onclick="saveTask()"><i class="fas fa-save"></i> Save Task</button><button class="btn-secondary flex-1 justify-center" onclick="closeModal('modal-add-task')">Cancel</button></div>
    </div>
  </div>
</div>

<div id="toast" class="toast hidden"></div>

<script>
// ================================================
// STATE & STORAGE
// ================================================
const DB_KEY = 'bardapraia_v2';
function loadDB(){try{return JSON.parse(localStorage.getItem(DB_KEY)||'{}')}catch(e){return {}}}
function saveDB(db){localStorage.setItem(DB_KEY,JSON.stringify(db))}
function getDB(){
  const db=loadDB();
  if(!db.employees) db.employees=['Ana','Bruno','Carla','David','Eva'];
  if(!db.tables)    db.tables=10;
  if(!db.inventory) db.inventory=[];
  if(!db.invLogs)   db.invLogs=[];
  if(!db.orders)    db.orders=[];
  if(!db.reservations) db.reservations=[];
  if(!db.tasks)     db.tasks=[];
  return db;
}
let calendarWeekStart=getMonday(new Date());
let selectedCalendarDay=null;
let currentTaskFilter='all';
let invSearchVal='';
let invCatFilter='';
let resSearchVal='';
let resDateFilter='';

// ================================================
// NAVIGATION
// ================================================
function showSection(name){
  document.querySelectorAll('[id^="section-"]').forEach(s=>s.classList.add('hidden'));
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  document.getElementById('section-'+name).classList.remove('hidden');
  const nav=document.getElementById('nav-'+name);
  if(nav) nav.classList.add('active');
  const titles={dashboard:'Dashboard',inventory:'Inventory',reservations:'Reservations',tasks:'Tasks',settings:'Settings'};
  const subs={dashboard:"Welcome back! Here's your overview.",inventory:'Manage stock and place supplier orders.',reservations:'Bookings, tables and scheduling.',tasks:'Team task management.',settings:'Configure employees, tables and integrations.'};
  document.getElementById('page-title').textContent=titles[name]||name;
  document.getElementById('page-subtitle').textContent=subs[name]||'';
  if(name==='dashboard')    renderDashboard();
  if(name==='inventory')    renderInventory();
  if(name==='reservations') {renderCalendar();renderAllReservations();}
  if(name==='tasks')        renderTasks();
  if(name==='settings')     renderSettings();
}

// ================================================
// EMPLOYEES
// ================================================
function getEmployees(){return getDB().employees;}
function addEmployee(){
  const inp=document.getElementById('new-employee-name');
  const name=inp.value.trim();
  if(!name)return;
  const db=getDB();
  if(!db.employees.includes(name)){db.employees.push(name);saveDB(db);inp.value='';renderSettings();updateAllDropdowns();toast('Employee added!');}
  else toast('Already exists!','error');
}
function removeEmployee(name){
  if(!confirm('Remove '+name+'?'))return;
  const db=getDB();db.employees=db.employees.filter(e=>e!==name);saveDB(db);renderSettings();updateAllDropdowns();toast('Removed.');
}
function globalEmployeeChange(val){document.getElementById('sidebar-user').textContent=val||'Manager';}
function updateAllDropdowns(){
  const emp=getEmployees();
  ['inv-employee','update-qty-employee','task-assigned'].forEach(id=>{
    const el=document.getElementById(id);if(!el)return;
    const cur=el.value;
    el.innerHTML='<option value="">-- Select --</option>'+emp.map(e=>'<option value="'+e+'">'+e+'</option>').join('');
    el.value=cur;
  });
  const gs=document.getElementById('global-employee-select');
  if(gs){const c=gs.value;gs.innerHTML='<option value="">Select Employee</option>'+emp.map(e=>'<option value="'+e+'">'+e+'</option>').join('');gs.value=c;}
}
function updateTableDropdown(){
  const n=getDB().tables;
  const el=document.getElementById('res-table');if(!el)return;
  el.innerHTML=Array.from({length:n},(_,i)=>'<option value="'+(i+1)+'">Table '+(i+1)+'</option>').join('');
}

// ================================================
// SETTINGS
// ================================================
function renderSettings(){
  const db=getDB();
  const el=document.getElementById('employee-list');
  el.innerHTML=db.employees.length===0?'<div class="text-ocean-300 text-sm text-center py-2">No employees yet.</div>':db.employees.map(e=>'<div class="flex items-center justify-between p-3 bg-ocean-50 rounded-xl"><div class="flex items-center gap-2"><div class="w-7 h-7 rounded-full bg-ocean-200 flex items-center justify-center text-xs font-bold text-ocean-700">'+e[0]+'</div><span class="text-sm font-medium text-ocean-800">'+e+'</span></div><button onclick="removeEmployee(\''+e+'\')" class="text-red-400 hover:text-red-600 text-sm"><i class="fas fa-trash"></i></button></div>').join('');
  document.getElementById('tables-count-input').value=db.tables;
  document.getElementById('tables-display').textContent=db.tables+' tables';
  const sbUrl=localStorage.getItem('sb_url')||'';
  document.getElementById('sb-url').value=sbUrl;
  document.getElementById('sb-key').value=localStorage.getItem('sb_key')||'';
  updateSupabaseStatus();
  updateAllDropdowns();
}
function saveTables(){
  const n=parseInt(document.getElementById('tables-count-input').value)||10;
  const db=getDB();db.tables=n;saveDB(db);
  document.getElementById('tables-display').textContent=n+' tables';
  updateTableDropdown();renderDashboard();toast('Tables saved!');
}
function saveSupabase(){
  const url=document.getElementById('sb-url').value.trim();
  const key=document.getElementById('sb-key').value.trim();
  if(!url||!key){toast('Fill both fields.','error');return;}
  localStorage.setItem('sb_url',url);localStorage.setItem('sb_key',key);
  updateSupabaseStatus();toast('Supabase connected! Ready for backend integration.');
}
function updateSupabaseStatus(){
  const url=localStorage.getItem('sb_url');
  const box=document.getElementById('sb-status-box');
  const txt=document.getElementById('sb-status-text');
  if(!box||!txt)return;
  if(url){box.style.background='#eff6ff';box.querySelector('.pulse-dot').className='pulse-dot green';txt.textContent='Connected: '+url;txt.style.color='#1d4ed8';}
  else{box.style.background='#f0fdf4';box.querySelector('.pulse-dot').className='pulse-dot green';txt.textContent='Using local storage';txt.style.color='#16a34a';}
}

// ================================================
// INVENTORY
// ================================================
function switchInvTab(t){
  ['stock','log','orders'].forEach(x=>{
    document.getElementById('inv-tab-'+x).classList.toggle('active',x===t);
    document.getElementById('inv-panel-'+x).classList.toggle('hidden',x!==t);
  });
  if(t==='log')renderInvLog();
  if(t==='orders')renderOrderHistory();
}
function filterInventory(v){invSearchVal=v;renderInventory();}
function filterInventoryCategory(v){invCatFilter=v;renderInventory();}

function openAddInventoryModal(editId){
  updateAllDropdowns();
  const m=document.getElementById('modal-add-inventory');
  if(editId){
    const db=getDB();const item=db.inventory.find(i=>i.id===editId);if(!item)return;
    document.getElementById('inv-modal-title').textContent='Edit Item';
    document.getElementById('inv-item-name').value=item.name;
    document.getElementById('inv-category').value=item.category||'other';
    document.getElementById('inv-unit').value=item.unit||'';
    document.getElementById('inv-qty-bar').value=item.qtyBar;
    document.getElementById('inv-qty-storage').value=item.qtyStorage;
    document.getElementById('inv-minimum').value=item.minimum;
    document.getElementById('inv-employee').value=item.lastEmployee||'';
    m.dataset.editId=editId;
  } else {
    document.getElementById('inv-modal-title').textContent='Add Inventory Item';
    ['inv-item-name','inv-unit'].forEach(id=>document.getElementById(id).value='');
    document.getElementById('inv-category').value='beverages';
    document.getElementById('inv-qty-bar').value='0';
    document.getElementById('inv-qty-storage').value='0';
    document.getElementById('inv-minimum').value='10';
    document.getElementById('inv-employee').value='';
    delete m.dataset.editId;
  }
  openModal('modal-add-inventory');
}
function saveInventoryItem(){
  const name=document.getElementById('inv-item-name').value.trim();
  if(!name){toast('Name required!','error');return;}
  const db=getDB();
  const editId=document.getElementById('modal-add-inventory').dataset.editId;
  const emp=document.getElementById('inv-employee').value;
  const qb=parseInt(document.getElementById('inv-qty-bar').value)||0;
  const qs=parseInt(document.getElementById('inv-qty-storage').value)||0;
  const min=parseInt(document.getElementById('inv-minimum').value)||0;
  const cat=document.getElementById('inv-category').value;
  const unit=document.getElementById('inv-unit').value.trim();
  if(editId){
    const idx=db.inventory.findIndex(i=>i.id===editId);
    if(idx!==-1){const old=db.inventory[idx];db.inventory[idx]={...old,name,category:cat,unit,qtyBar:qb,qtyStorage:qs,minimum:min,lastEmployee:emp,updatedAt:new Date().toISOString()};addInvLog(db,{action:'update',item:name,employee:emp,qtyBar:qb,qtyStorage:qs});}
  } else {
    db.inventory.push({id:uid(),name,category:cat,unit,qtyBar:qb,qtyStorage:qs,minimum:min,lastEmployee:emp,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()});
    addInvLog(db,{action:'add',item:name,employee:emp,qtyBar:qb,qtyStorage:qs});
  }
  saveDB(db);closeModal('modal-add-inventory');renderInventory();renderDashboard();toast(editId?'Updated!':'Item added!');
}
function addInvLog(db,entry){db.invLogs.unshift({...entry,timestamp:new Date().toISOString(),id:uid()});if(db.invLogs.length>300)db.invLogs=db.invLogs.slice(0,300);}
function deleteInventoryItem(id){
  if(!confirm('Delete this item?'))return;
  const db=getDB();const item=db.inventory.find(i=>i.id===id);
  db.inventory=db.inventory.filter(i=>i.id!==id);
  addInvLog(db,{action:'delete',item:item?.name,employee:'System'});
  saveDB(db);renderInventory();renderDashboard();toast('Deleted.');
}
function openUpdateQtyModal(id){
  updateAllDropdowns();
  const db=getDB();const item=db.inventory.find(i=>i.id===id);if(!item)return;
  document.getElementById('update-qty-id').value=id;
  document.getElementById('update-qty-name').textContent=item.name+(item.unit?' ('+item.unit+')':'');
  document.getElementById('update-qty-bar').value=item.qtyBar;
  document.getElementById('update-qty-storage').value=item.qtyStorage;
  document.getElementById('update-qty-employee').value=item.lastEmployee||'';
  openModal('modal-update-qty');
}
function saveQtyUpdate(){
  const id=document.getElementById('update-qty-id').value;
  const emp=document.getElementById('update-qty-employee').value;
  const qb=parseInt(document.getElementById('update-qty-bar').value)||0;
  const qs=parseInt(document.getElementById('update-qty-storage').value)||0;
  const db=getDB();const idx=db.inventory.findIndex(i=>i.id===id);
  if(idx!==-1){const item=db.inventory[idx];db.inventory[idx]={...item,qtyBar:qb,qtyStorage:qs,lastEmployee:emp,updatedAt:new Date().toISOString()};addInvLog(db,{action:'update',item:item.name,employee:emp,qtyBar:qb,qtyStorage:qs});}
  saveDB(db);closeModal('modal-update-qty');renderInventory();renderDashboard();toast('Stock updated!');
}
function openEditMinimumModal(id){
  const db=getDB();const item=db.inventory.find(i=>i.id===id);if(!item)return;
  document.getElementById('edit-min-id').value=id;
  document.getElementById('edit-min-item-name').textContent=item.name;
  document.getElementById('edit-min-current').textContent=(item.qtyBar+item.qtyStorage)+' '+(item.unit||'units');
  document.getElementById('edit-min-value').value=item.minimum;
  openModal('modal-edit-minimum');
}
function saveMinimum(){
  const id=document.getElementById('edit-min-id').value;
  const val=parseInt(document.getElementById('edit-min-value').value)||0;
  const db=getDB();const idx=db.inventory.findIndex(i=>i.id===id);
  if(idx!==-1)db.inventory[idx].minimum=val;
  saveDB(db);closeModal('modal-edit-minimum');renderInventory();toast('Minimum updated!');
}

const catIconMap={beverages:'🍹',food:'🍔',supplies:'🧹',equipment:'🔧',other:'📦'};
function renderInventory(){
  const db=getDB();
  let items=db.inventory;
  if(invSearchVal)items=items.filter(i=>i.name.toLowerCase().includes(invSearchVal.toLowerCase()));
  if(invCatFilter)items=items.filter(i=>i.category===invCatFilter);
  const el=document.getElementById('inventory-list');
  if(items.length===0){el.innerHTML='<div class="text-center py-12 text-ocean-300"><i class="fas fa-box-open text-3xl mb-3 block"></i>No items found.</div>';return;}
  el.innerHTML=items.map(item=>{
    const total=item.qtyBar+item.qtyStorage;
    const ratio=item.minimum>0?Math.min(total/item.minimum,1):1;
    const isLow=total<item.minimum;
    const pct=Math.round(ratio*100);
    const unit=item.unit?' '+item.unit:'';
    return '<div class="inv-row">'
      +'<div><div class="flex items-center gap-2"><span>'+( catIconMap[item.category]||'📦')+'</span><div><div class="font-semibold text-ocean-900 text-sm">'+item.name+'</div><div class="text-xs text-ocean-300">'+(item.lastEmployee?'by '+item.lastEmployee:'')+(item.updatedAt?' · '+fmtDate(item.updatedAt):'')+'</div></div></div></div>'
      +'<div class="text-center font-medium text-ocean-800">'+item.qtyBar+unit+'</div>'
      +'<div class="text-center font-medium text-ocean-800">'+item.qtyStorage+unit+'</div>'
      +'<div class="text-center font-bold text-ocean-900">'+total+unit+'</div>'
      +'<div class="text-center"><button onclick="openEditMinimumModal(\''+item.id+'\')" class="text-ocean-600 hover:text-ocean-900 font-semibold text-sm" title="Edit minimum">'+item.minimum+unit+' <i class="fas fa-pen text-xs text-ocean-300"></i></button></div>'
      +'<div class="text-center"><div class="flex flex-col items-center gap-1"><span class="'+(isLow?'status-low':'status-ok')+' text-xs">'+(isLow?'⚠ Low':'✓ OK')+'</span><div class="progress-bar w-16"><div class="progress-fill '+(isLow?'low':'')+'" style="width:'+pct+'%"></div></div><span class="text-xs text-ocean-300">'+pct+'%</span></div></div>'
      +'<div class="flex items-center gap-1 justify-center flex-wrap"><button onclick="openUpdateQtyModal(\''+item.id+'\')" title="Update qty" class="w-7 h-7 rounded-lg bg-ocean-100 hover:bg-ocean-200 text-ocean-600 flex items-center justify-center text-xs"><i class="fas fa-pen"></i></button><button onclick="openAddInventoryModal(\''+item.id+'\')" title="Edit" class="w-7 h-7 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-600 flex items-center justify-center text-xs"><i class="fas fa-edit"></i></button><button onclick="deleteInventoryItem(\''+item.id+'\')" title="Delete" class="w-7 h-7 rounded-lg bg-red-100 hover:bg-red-200 text-red-500 flex items-center justify-center text-xs"><i class="fas fa-trash"></i></button></div>'
      +'</div>';
  }).join('');
}
function renderInvLog(){
  const db=getDB();const el=document.getElementById('inv-log-list');
  if(db.invLogs.length===0){el.innerHTML='<div class="text-center py-8 text-ocean-300">No log entries yet.</div>';return;}
  const icons={add:'<i class="fas fa-plus text-green-500"></i>',update:'<i class="fas fa-pen text-blue-500"></i>',delete:'<i class="fas fa-trash text-red-400"></i>'};
  el.innerHTML=db.invLogs.map(l=>'<div class="flex items-center gap-3 p-3 bg-ocean-50 rounded-xl"><div class="w-8 h-8 rounded-full bg-white flex items-center justify-center text-sm">'+(icons[l.action]||'📝')+'</div><div class="flex-1"><div class="text-sm font-medium text-ocean-800">'+l.item+'</div><div class="text-xs text-ocean-400">'+l.action+' · by '+(l.employee||'System')+' · Bar:'+(l.qtyBar||0)+' Store:'+(l.qtyStorage||0)+'</div></div><div class="text-xs text-ocean-300">'+fmtDate(l.timestamp)+'</div></div>').join('');
}
function renderOrderHistory(){
  const db=getDB();const el=document.getElementById('inv-orders-list');
  if(db.orders.length===0){el.innerHTML='<div class="text-center py-8 text-ocean-300">No orders yet.</div>';return;}
  el.innerHTML=db.orders.slice().reverse().map(o=>'<div class="p-4 border border-ocean-100 rounded-xl"><div class="flex items-center justify-between mb-3"><div class="font-bold text-ocean-800">Order #'+o.id.slice(-6).toUpperCase()+'</div><div class="text-xs text-ocean-400">'+fmtDate(o.date)+'</div></div><div class="space-y-1">'+o.items.map(i=>'<div class="flex justify-between text-sm"><span class="text-ocean-700">'+i.name+'</span><span class="font-semibold text-ocean-900">'+i.orderQty+' '+(i.unit||'')+'</span></div>').join('')+'</div></div>').join('');
}
function openOrderModal(){
  const db=getDB();const low=db.inventory.filter(i=>(i.qtyBar+i.qtyStorage)<i.minimum);const el=document.getElementById('order-items-list');
  if(low.length===0){el.innerHTML='<div class="text-center py-8 text-green-600 font-semibold"><i class="fas fa-circle-check text-2xl block mb-2"></i>All items above minimum! No order needed.</div>';}
  else el.innerHTML=low.map(item=>{const total=item.qtyBar+item.qtyStorage;const needed=item.minimum-total;return '<div class="flex items-center gap-3 p-3 border border-ocean-100 rounded-xl"><div class="flex-1"><div class="font-semibold text-ocean-800">'+item.name+'</div><div class="text-xs text-ocean-400">Have: '+total+' / Min: '+item.minimum+' '+(item.unit||'')+'</div></div><div class="text-right"><div class="text-xs text-ocean-400 mb-1">Order qty</div><input type="number" min="1" value="'+needed+'" class="input-field w-20 text-center text-sm" id="order-qty-'+item.id+'"/></div><div class="text-red-500 font-bold text-sm w-20 text-right">Need +'+needed+'</div></div>';}).join('');
  openModal('modal-order');
}
function confirmOrder(){
  const db=getDB();const low=db.inventory.filter(i=>(i.qtyBar+i.qtyStorage)<i.minimum);
  if(low.length===0){closeModal('modal-order');return;}
  const orderItems=low.map(item=>({id:item.id,name:item.name,unit:item.unit,orderQty:parseInt(document.getElementById('order-qty-'+item.id)?.value)||(item.minimum-item.qtyBar-item.qtyStorage)}));
  db.orders.push({id:uid(),date:new Date().toISOString(),items:orderItems,status:'sent'});
  saveDB(db);closeModal('modal-order');renderInventory();toast('Order placed! '+orderItems.length+' item(s) ordered.');
}

// ================================================
// RESERVATIONS
// ================================================
function switchResTab(t){
  ['calendar','list'].forEach(x=>{document.getElementById('res-tab-'+x).classList.toggle('active',x===t);document.getElementById('res-panel-'+x).classList.toggle('hidden',x!==t);});
}
function getMonday(d){const dd=new Date(d);const day=dd.getDay();const diff=day===0?-6:1-day;dd.setDate(dd.getDate()+diff);dd.setHours(0,0,0,0);return dd;}
function prevWeek(){calendarWeekStart.setDate(calendarWeekStart.getDate()-7);renderCalendar();}
function nextWeek(){calendarWeekStart.setDate(calendarWeekStart.getDate()+7);renderCalendar();}
function renderCalendar(){
  const db=getDB();const dnames=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];const mnames=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const end=new Date(calendarWeekStart);end.setDate(end.getDate()+6);
  document.getElementById('calendar-week-label').textContent=mnames[calendarWeekStart.getMonth()]+' '+calendarWeekStart.getDate()+' – '+mnames[end.getMonth()]+' '+end.getDate()+', '+end.getFullYear();
  const grid=document.getElementById('calendar-grid');const today=new Date();today.setHours(0,0,0,0);
  grid.innerHTML='';
  for(let i=0;i<7;i++){
    const day=new Date(calendarWeekStart);day.setDate(day.getDate()+i);
    const dateStr=toDateStr(day);const isToday=day.getTime()===today.getTime();const isSel=selectedCalendarDay===dateStr;
    const dayRes=db.reservations.filter(r=>r.date===dateStr);
    const conf=dayRes.filter(r=>r.status==='confirmed').length;
    const pend=dayRes.filter(r=>!r.status||r.status==='pending').length;
    const nos=dayRes.filter(r=>r.status==='no-show').length;
    const el=document.createElement('div');
    el.className='calendar-day'+(isToday?' today':'')+(isSel?' selected':'');
    el.onclick=()=>{selectedCalendarDay=dateStr;renderCalendar();renderDayReservations(dateStr);};
    let dots='';
    for(let c=0;c<Math.min(conf,3);c++) dots+='<span style="background:'+(isSel?'white':'#22c55e')+'"></span>';
    for(let c=0;c<Math.min(pend,3);c++) dots+='<span style="background:'+(isSel?'white':'#f59e0b')+'"></span>';
    for(let c=0;c<Math.min(nos,3);c++) dots+='<span style="background:'+(isSel?'white':'#ef4444')+'"></span>';
    el.innerHTML='<div class="text-xs font-semibold mb-1 '+(isSel?'text-white':'text-ocean-400')+'">'+dnames[i]+'</div>'
      +'<div class="text-lg font-bold '+(isSel?'text-white':isToday?'text-ocean-600':'text-ocean-900')+'">'+day.getDate()+'</div>'
      +'<div class="day-dots">'+dots+'</div>'
      +(dayRes.length>0?'<div class="text-xs mt-1 '+(isSel?'text-white/80':'text-ocean-400')+'">'+dayRes.length+'</div>':'');
    grid.appendChild(el);
  }
  if(selectedCalendarDay) renderDayReservations(selectedCalendarDay);
}
function renderDayReservations(dateStr){
  const db=getDB();const res=db.reservations.filter(r=>r.date===dateStr).sort((a,b)=>a.time.localeCompare(b.time));
  const d=new Date(dateStr+'T12:00:00');
  const dnames=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const mnames=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  document.getElementById('res-day-label').textContent=dnames[d.getDay()]+', '+mnames[d.getMonth()]+' '+d.getDate();
  const el=document.getElementById('res-day-list');
  if(res.length===0){el.innerHTML='<div class="text-center py-6 text-ocean-300"><i class="fas fa-calendar-xmark text-2xl mb-2 block"></i>No reservations.</div>';return;}
  el.innerHTML=res.map(r=>'<div class="reservation-item '+(r.status==='no-show'?'no-show':r.status==='confirmed'?'confirmed':'')+'" onclick="openResDetail(\''+r.id+'\')">'
    +'<div class="flex items-center justify-between"><div class="flex items-center gap-2"><span class="font-bold text-ocean-800">'+r.time+'</span><span class="text-ocean-700 font-medium">'+r.guestName+'</span></div>'
    +'<span class="badge '+(r.status==='confirmed'?'badge-green':r.status==='no-show'?'badge-red':'badge-yellow')+'">'+(r.status||'Pending')+'</span></div>'
    +'<div class="flex items-center gap-4 mt-1 text-sm text-ocean-400"><span><i class="fas fa-users mr-1"></i>'+r.guests+'</span><span><i class="fas fa-chair mr-1"></i>Table '+r.table+'</span>'+(r.phone?'<span><i class="fas fa-phone mr-1"></i>'+r.phone+'</span>':'')+'</div></div>').join('');
}
function openResDetail(id){
  const db=getDB();const r=db.reservations.find(x=>x.id===id);if(!r)return;
  document.getElementById('res-detail-content').innerHTML='<div class="grid grid-cols-2 gap-3">'
    +'<div class="p-3 bg-ocean-50 rounded-xl"><div class="text-xs text-ocean-400 mb-1">Guest</div><div class="font-semibold text-ocean-800">'+r.guestName+'</div></div>'
    +'<div class="p-3 bg-ocean-50 rounded-xl"><div class="text-xs text-ocean-400 mb-1">Status</div><span class="badge '+(r.status==='confirmed'?'badge-green':r.status==='no-show'?'badge-red':'badge-yellow')+'">'+(r.status||'Pending')+'</span></div>'
    +'<div class="p-3 bg-ocean-50 rounded-xl"><div class="text-xs text-ocean-400 mb-1">Date &amp; Time</div><div class="font-semibold text-ocean-800">'+r.date+' '+r.time+'</div></div>'
    +'<div class="p-3 bg-ocean-50 rounded-xl"><div class="text-xs text-ocean-400 mb-1">Guests</div><div class="font-semibold text-ocean-800">'+r.guests+' people</div></div>'
    +'<div class="p-3 bg-ocean-50 rounded-xl"><div class="text-xs text-ocean-400 mb-1">Table</div><div class="font-semibold text-ocean-800">Table '+r.table+'</div></div>'
    +'<div class="p-3 bg-ocean-50 rounded-xl"><div class="text-xs text-ocean-400 mb-1">Phone</div><div class="font-semibold text-ocean-800">'+(r.phone||'—')+'</div></div>'
    +(r.notes?'<div class="col-span-2 p-3 bg-ocean-50 rounded-xl"><div class="text-xs text-ocean-400 mb-1">Notes</div><div class="font-semibold text-ocean-800">'+r.notes+'</div></div>':'')
    +'</div>';
  document.getElementById('res-detail-actions').innerHTML=
    '<button onclick="setResStatus(\''+id+'\',\'confirmed\')" class="btn-primary btn-sm" style="background:linear-gradient(135deg,#22c55e,#16a34a)"><i class="fas fa-check"></i> Confirmed</button>'
    +'<button onclick="setResStatus(\''+id+'\',\'no-show\')" class="btn-danger btn-sm"><i class="fas fa-user-xmark"></i> No Show</button>'
    +'<button onclick="setResStatus(\''+id+'\',\'pending\')" class="btn-secondary btn-sm"><i class="fas fa-clock"></i> Pending</button>'
    +'<button onclick="closeModal(\'modal-res-detail\');openEditReservation(\''+id+'\')" class="btn-secondary btn-sm"><i class="fas fa-pen"></i> Edit</button>'
    +'<button onclick="deleteReservation(\''+id+'\')" class="btn-danger btn-sm"><i class="fas fa-trash"></i></button>'
    +'<button onclick="closeModal(\'modal-res-detail\')" class="btn-secondary btn-sm ml-auto">Close</button>';
  openModal('modal-res-detail');
}
function setResStatus(id,status){
  const db=getDB();const idx=db.reservations.findIndex(r=>r.id===id);
  if(idx!==-1){db.reservations[idx].status=status;saveDB(db);}
  closeModal('modal-res-detail');renderCalendar();renderAllReservations();toast('Status: '+status+'!');
}
function openAddReservationModal(){
  updateTableDropdown();
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
  updateTableDropdown();
  const db=getDB();const r=db.reservations.find(x=>x.id===id);if(!r)return;
  document.getElementById('res-modal-title').textContent='Edit Reservation';
  document.getElementById('res-edit-id').value=id;
  document.getElementById('res-guest-name').value=r.guestName;
  document.getElementById('res-phone').value=r.phone||'';
  document.getElementById('res-date').value=r.date;
  document.getElementById('res-time').value=r.time;
  document.getElementById('res-guests').value=r.guests;
  document.getElementById('res-table').value=r.table;
  document.getElementById('res-notes').value=r.notes||'';
  openModal('modal-add-reservation');
}
function saveReservation(){
  const guestName=document.getElementById('res-guest-name').value.trim();
  if(!guestName){toast('Guest name required!','error');return;}
  const date=document.getElementById('res-date').value;
  const time=document.getElementById('res-time').value;
  const table=document.getElementById('res-table').value;
  if(!date||!time||!table){toast('Date, time and table required!','error');return;}
  const db=getDB();const editId=document.getElementById('res-edit-id').value;
  const res={guestName,phone:document.getElementById('res-phone').value.trim(),date,time,guests:parseInt(document.getElementById('res-guests').value)||1,table,notes:document.getElementById('res-notes').value.trim(),status:'pending'};
  if(editId){const idx=db.reservations.findIndex(r=>r.id===editId);if(idx!==-1)db.reservations[idx]={...db.reservations[idx],...res};}
  else db.reservations.push({...res,id:uid(),createdAt:new Date().toISOString()});
  saveDB(db);closeModal('modal-add-reservation');renderCalendar();renderAllReservations();renderDashboard();toast(editId?'Updated!':'Reservation saved!');
}
function deleteReservation(id){
  if(!confirm('Delete reservation?'))return;
  const db=getDB();db.reservations=db.reservations.filter(r=>r.id!==id);saveDB(db);
  closeModal('modal-res-detail');renderCalendar();renderAllReservations();renderDashboard();toast('Deleted.');
}
function filterReservations(v){resSearchVal=v;renderAllReservations();}
function filterReservationsByDate(v){resDateFilter=v;renderAllReservations();}
function renderAllReservations(){
  const db=getDB();let res=db.reservations.slice().sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time));
  if(resSearchVal)res=res.filter(r=>r.guestName.toLowerCase().includes(resSearchVal.toLowerCase())||String(r.table).includes(resSearchVal));
  if(resDateFilter)res=res.filter(r=>r.date===resDateFilter);
  const el=document.getElementById('res-all-list');
  if(res.length===0){el.innerHTML='<div class="text-center py-12 text-ocean-300">No reservations found.</div>';return;}
  el.innerHTML=res.map(r=>'<div class="flex items-center gap-4 p-4 border-b border-ocean-50 hover:bg-ocean-50 cursor-pointer transition-colors" onclick="openResDetail(\''+r.id+'\')">'
    +'<div class="w-12 h-12 rounded-xl bg-ocean-100 flex flex-col items-center justify-center"><div class="text-xs font-bold text-ocean-600">'+r.date.slice(5)+'</div><div class="text-xs text-ocean-400">'+r.time+'</div></div>'
    +'<div class="flex-1 min-w-0"><div class="font-semibold text-ocean-900">'+r.guestName+'</div><div class="text-sm text-ocean-400 flex items-center gap-3"><span><i class="fas fa-users mr-1"></i>'+r.guests+'</span><span><i class="fas fa-chair mr-1"></i>Table '+r.table+'</span>'+(r.phone?'<span><i class="fas fa-phone mr-1"></i>'+r.phone+'</span>':'')+'</div></div>'
    +'<div class="flex items-center gap-2"><span class="badge '+(r.status==='confirmed'?'badge-green':r.status==='no-show'?'badge-red':'badge-yellow')+'">'+(r.status||'Pending')+'</span><i class="fas fa-chevron-right text-ocean-300"></i></div>'
    +'</div>').join('');
}

// ================================================
// TASKS
// ================================================
const taskCatIcons={maintenance:'🔧',cleaning:'🧹',call:'📞',purchase:'🛒',admin:'📋',staff:'👥',other:'📌'};
const priColors={high:'badge-red',medium:'badge-yellow',low:'badge-green'};
function openAddTaskModal(editId){
  updateAllDropdowns();
  if(editId){
    const db=getDB();const t=db.tasks.find(x=>x.id===editId);if(!t)return;
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
    ['task-title','task-description','task-deadline'].forEach(id=>document.getElementById(id).value='');
    document.getElementById('task-category').value='maintenance';
    document.getElementById('task-priority').value='medium';
    document.getElementById('task-assigned').value='';
  }
  openModal('modal-add-task');
}
function saveTask(){
  const title=document.getElementById('task-title').value.trim();
  if(!title){toast('Title required!','error');return;}
  const db=getDB();const editId=document.getElementById('task-edit-id').value;
  const task={title,description:document.getElementById('task-description').value.trim(),category:document.getElementById('task-category').value,priority:document.getElementById('task-priority').value,assignedTo:document.getElementById('task-assigned').value,deadline:document.getElementById('task-deadline').value};
  if(editId){const idx=db.tasks.findIndex(t=>t.id===editId);if(idx!==-1)db.tasks[idx]={...db.tasks[idx],...task};}
  else db.tasks.push({...task,id:uid(),status:'pending',createdAt:new Date().toISOString()});
  saveDB(db);closeModal('modal-add-task');renderTasks();renderDashboard();toast(editId?'Updated!':'Task created!');
}
function setTaskStatus(id,status){
  const db=getDB();const idx=db.tasks.findIndex(t=>t.id===id);
  if(idx!==-1){db.tasks[idx].status=status;if(status==='done')db.tasks[idx].doneAt=new Date().toISOString();saveDB(db);}
  renderTasks();renderDashboard();toast('Marked as '+status+'!');
}
function deleteTask(id){
  if(!confirm('Delete task?'))return;
  const db=getDB();db.tasks=db.tasks.filter(t=>t.id!==id);saveDB(db);renderTasks();renderDashboard();toast('Deleted.');
}
function filterTasks(filter,btn){
  currentTaskFilter=filter;
  document.querySelectorAll('#task-filter-btns .tab-btn').forEach(b=>b.classList.remove('active'));
  if(btn)btn.classList.add('active');
  renderTasks();
}
function renderTasks(){
  const db=getDB();
  document.getElementById('task-count-pending').textContent=db.tasks.filter(t=>t.status==='pending').length;
  document.getElementById('task-count-progress').textContent=db.tasks.filter(t=>t.status==='in-progress').length;
  document.getElementById('task-count-done').textContent=db.tasks.filter(t=>t.status==='done').length;
  let tasks=db.tasks.slice().sort((a,b)=>{const po={high:0,medium:1,low:2};return(po[a.priority]||1)-(po[b.priority]||1);});
  if(currentTaskFilter!=='all')tasks=tasks.filter(t=>t.status===currentTaskFilter);
  const el=document.getElementById('task-list');
  if(tasks.length===0){el.innerHTML='<div class="card p-8 text-center text-ocean-300"><i class="fas fa-clipboard-list text-3xl mb-3 block"></i>No tasks here.</div>';return;}
  const now=new Date();
  el.innerHTML=tasks.map(t=>{
    const isOverdue=t.deadline&&new Date(t.deadline)<now&&t.status!=='done';
    return '<div class="task-item '+(t.status==='done'?'done':'')+'"><div class="flex items-start gap-3"><div class="text-2xl mt-0.5">'+(taskCatIcons[t.category]||'📌')+'</div><div class="flex-1 min-w-0"><div class="flex items-center gap-2 flex-wrap mb-1"><span class="font-bold text-ocean-900 '+(t.status==='done'?'line-through':'')+'">'+t.title+'</span><span class="badge '+(priColors[t.priority]||'badge-gray')+'">'+( t.priority||'medium')+'</span><span class="badge '+(t.status==='done'?'badge-green':t.status==='in-progress'?'badge-blue':'badge-yellow')+'">'+t.status+'</span>'+(isOverdue?'<span class="badge badge-red">⚠ Overdue</span>':'')+'</div>'+(t.description?'<div class="text-sm text-ocean-500 mb-2">'+t.description+'</div>':'')+'<div class="flex items-center gap-4 text-xs text-ocean-400 flex-wrap">'+(t.assignedTo?'<span><i class="fas fa-user mr-1"></i>'+t.assignedTo+'</span>':'')+(t.deadline?'<span class="'+(isOverdue?'text-red-400 font-semibold':'')+'"><i class="fas fa-calendar-check mr-1"></i>Due: '+t.deadline+'</span>':'')+'<span><i class="fas fa-clock mr-1"></i>'+fmtDate(t.createdAt)+'</span></div></div>'
      +'<div class="flex flex-col gap-1 items-end">'
      +(t.status!=='done'?'<button onclick="setTaskStatus(\''+t.id+'\',\'done\')" class="btn-secondary btn-sm" style="color:#16a34a;border-color:#bbf7d0"><i class="fas fa-check"></i></button>'+(t.status==='pending'?'<button onclick="setTaskStatus(\''+t.id+'\',\'in-progress\')" class="btn-secondary btn-sm" style="color:#1d4ed8;border-color:#bfdbfe"><i class="fas fa-play"></i></button>':''):'')
      +'<button onclick="openAddTaskModal(\''+t.id+'\')" class="btn-secondary btn-sm"><i class="fas fa-pen"></i></button>'
      +'<button onclick="deleteTask(\''+t.id+'\')" class="btn-secondary btn-sm" style="color:#dc2626;border-color:#fca5a5"><i class="fas fa-trash"></i></button>'
      +'</div></div></div>';
  }).join('');
}

// ================================================
// DASHBOARD
// ================================================
function renderDashboard(){
  const db=getDB();
  document.getElementById('dash-inv-count').textContent=db.inventory.length;
  const lowItems=db.inventory.filter(i=>(i.qtyBar+i.qtyStorage)<i.minimum);
  document.getElementById('dash-inv-status').className='badge '+(lowItems.length>0?'badge-red':'badge-green');
  document.getElementById('dash-inv-status').textContent=lowItems.length>0?lowItems.length+' Low':'OK';
  document.getElementById('dash-inv-low').textContent=lowItems.length>0?lowItems.length+' item(s) need restocking':'';
  const alertEl=document.getElementById('dash-low-stock');
  alertEl.innerHTML=lowItems.length===0?'<div class="text-ocean-300 text-sm text-center py-6">All good! No alerts 🎉</div>':lowItems.slice(0,5).map(i=>{const total=i.qtyBar+i.qtyStorage;const pct=i.minimum>0?Math.round(total/i.minimum*100):100;return '<div class="flex items-center gap-3 p-2 rounded-lg bg-red-50"><span class="pulse-dot red"></span><div class="flex-1"><div class="text-sm font-semibold text-red-700">'+i.name+'</div><div class="progress-bar mt-1 w-full"><div class="progress-fill low" style="width:'+pct+'%"></div></div></div><div class="text-xs text-red-500 font-bold">'+total+'/'+i.minimum+'</div></div>';}).join('')+(lowItems.length>5?'<div class="text-xs text-ocean-400 text-center pt-2">+' +(lowItems.length-5)+' more...</div>':'');
  const today=toDateStr(new Date());
  const todayRes=db.reservations.filter(r=>r.date===today).sort((a,b)=>a.time.localeCompare(b.time));
  document.getElementById('dash-res-count').textContent=todayRes.length;
  const todayEl=document.getElementById('dash-today-res');
  todayEl.innerHTML=todayRes.length===0?'<div class="text-ocean-300 text-sm text-center py-6">No reservations today</div>':todayRes.slice(0,5).map(r=>'<div class="flex items-center gap-3 p-2 rounded-lg bg-ocean-50 cursor-pointer hover:bg-ocean-100" onclick="showSection(\'reservations\')"><div class="w-10 h-10 rounded-lg bg-ocean-200 flex items-center justify-center text-xs font-bold text-ocean-700">'+r.time+'</div><div class="flex-1"><div class="text-sm font-semibold text-ocean-800">'+r.guestName+'</div><div class="text-xs text-ocean-400">Table '+r.table+' · '+r.guests+' guests</div></div><span class="badge '+(r.status==='confirmed'?'badge-green':r.status==='no-show'?'badge-red':'badge-yellow')+'">'+(r.status||'Pending')+'</span></div>').join('');
  const openTasks=db.tasks.filter(t=>t.status!=='done');
  document.getElementById('dash-task-count').textContent=openTasks.length;
  document.getElementById('dash-task-badge').className='badge '+(openTasks.length>0?'badge-yellow':'badge-green');
  document.getElementById('dash-task-badge').textContent=openTasks.length>0?'Open':'All Done';
  document.getElementById('dash-tables').textContent=db.tables;
}

// ================================================
// MODALS
// ================================================
function openModal(id){document.getElementById(id).classList.remove('hidden');}
function closeModal(id){document.getElementById(id).classList.add('hidden');}
document.querySelectorAll('.modal-overlay').forEach(o=>o.addEventListener('click',function(e){if(e.target===this)closeModal(this.id);}));

// ================================================
// UTILS
// ================================================
function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,7);}
function toDateStr(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
function fmtDate(iso){if(!iso)return'';const d=new Date(iso);return d.toLocaleDateString('en-GB',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'});}
let toastTimer;
function toast(msg,type){
  const el=document.getElementById('toast');
  el.textContent=msg;el.style.background=type==='error'?'#dc2626':'#0c4a6e';
  el.classList.remove('hidden');clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>el.classList.add('hidden'),3000);
}

// ================================================
// INIT
// ================================================
(function init(){
  const now=new Date();
  document.getElementById('current-date-display').textContent=now.toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short'});
  selectedCalendarDay=toDateStr(now);
  updateAllDropdowns();updateTableDropdown();
  showSection('dashboard');
})();
<\/script>
</body>
</html>`;
}
