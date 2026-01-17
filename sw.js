const CACHE_NAME = 'schedule-app-v2';
const urlsToCache = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './html-to-image.js',
  './html2canvas.min.js',
  './manifest.webmanifest'
];

// Install: cache core assets and activate immediately
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

// Activate: clean old caches and take control immediately
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.map((name) => (name !== CACHE_NAME ? caches.delete(name) : null))
    );
    await self.clients.claim();
  })());
});

// Fetch: cache-first, then network; cache successful same-origin GET responses
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return response;
      });
    })
  );
});
