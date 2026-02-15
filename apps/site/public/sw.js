/* ============================================================
   BlackCrown Site — Service Worker
   Strategy:
   - Navigation: Network-first (SPA shell)
   - Static assets (/assets/*): Cache-first
   ============================================================ */

const CACHE_VERSION = 'bc-site-v1';
const SHELL_CACHE   = `${CACHE_VERSION}-shell`;
const ASSETS_CACHE  = `${CACHE_VERSION}-assets`;

const SHELL_URLS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
];

/* ── Install ── */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then(cache => cache.addAll(SHELL_URLS))
  );
  self.skipWaiting();
});

/* ── Activate ── */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k.startsWith('bc-site-') && k !== SHELL_CACHE && k !== ASSETS_CACHE)
          .map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

/* ── Fetch ── */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin requests
  if (url.origin !== location.origin) return;

  // Static assets — cache first
  if (url.pathname.startsWith('/assets/') || url.pathname.startsWith('/icons/')) {
    event.respondWith(cacheFirst(request, ASSETS_CACHE));
    return;
  }

  // Navigation — network first (SPA shell)
  if (request.mode === 'navigate') {
    event.respondWith(networkFirstShell(request));
    return;
  }

  // Default — network first
  event.respondWith(networkFirst(request));
});

async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(cacheName);
    cache.put(request, response.clone());
  }
  return response;
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(ASSETS_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    return cached ?? new Response('Offline', { status: 503 });
  }
}

async function networkFirstShell(request) {
  try {
    return await fetch(request);
  } catch {
    const cached = await caches.match('/index.html', { cacheName: SHELL_CACHE });
    return cached ?? new Response('Offline', { status: 503 });
  }
}
