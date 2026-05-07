// ── Bar da Praia – Service Worker (Web Push) ──────────────────
self.addEventListener('install', function(e) {
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(self.clients.claim());
});

// Receive a push from the server and show a notification
self.addEventListener('push', function(e) {
  var data = {};
  try { data = e.data ? e.data.json() : {}; } catch(err) {}

  var title   = data.title   || 'Bar da Praia';
  var body    = data.body    || 'You have a new task.';
  var icon    = data.icon    || '/favicon.ico';
  var tag     = data.tag     || 'bardapraia-push';
  var url     = data.url     || '/';

  e.waitUntil(
    self.registration.showNotification(title, {
      body:  body,
      icon:  icon,
      badge: icon,
      tag:   tag,
      data:  { url: url }
    })
  );
});

// When user taps the notification – open/focus the app
self.addEventListener('notificationclick', function(e) {
  e.notification.close();
  var target = (e.notification.data && e.notification.data.url) || '/';
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(list) {
      for (var i = 0; i < list.length; i++) {
        var c = list[i];
        if (c.url.indexOf(self.location.origin) !== -1 && 'focus' in c) {
          return c.focus();
        }
      }
      if (self.clients.openWindow) return self.clients.openWindow(target);
    })
  );
});
