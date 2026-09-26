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
  var icon    = data.icon    || '/brand/icon-192.png';
  var tag     = data.tag     || 'bardapraia-push';
  var url     = data.url     || '/';

  e.waitUntil(
    self.registration.showNotification(title, {
      body:  body,
      icon:  icon,
      badge: icon,
      tag:   tag,
      data:  { url: url }
    }).catch(function() {}).then(function() {
      // Tell open pages it arrived (used by "Send me a test")
      return self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    }).then(function(list) {
      list.forEach(function(c) { c.postMessage({ type: 'pushed', tag: tag }); });
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
          c.postMessage({ type: 'open', url: target });   // e.g. open the shift Requests tab
          return c.focus();
        }
      }
      if (self.clients.openWindow) return self.clients.openWindow(target);
    })
  );
});
