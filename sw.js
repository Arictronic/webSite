const SW_VERSION = "2026-02-19-1";
const CACHE_PREFIX = "studio-schedule-cache";
const CACHE_NAME = `${CACHE_PREFIX}-${SW_VERSION}`;

const CORE_ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./html-to-image.js",
  "./Sortable.min.js",
  "./fonts/fonts.css",
  "./manifest.webmanifest",
];

const STATIC_DESTINATIONS = new Set([
  "style",
  "script",
  "font",
  "image",
  "manifest",
  "worker",
]);

function isSameOrigin(url) {
  return url.origin === self.location.origin;
}

function shouldHandleStatic(request, url) {
  if (request.destination && STATIC_DESTINATIONS.has(request.destination)) {
    return true;
  }

  return (
    url.pathname.endsWith(".js") ||
    url.pathname.endsWith(".css") ||
    url.pathname.endsWith(".woff2") ||
    url.pathname.endsWith(".woff") ||
    url.pathname.endsWith(".ttf") ||
    url.pathname.endsWith(".svg") ||
    url.pathname.endsWith(".png") ||
    url.pathname.endsWith(".jpg") ||
    url.pathname.endsWith(".jpeg") ||
    url.pathname.endsWith(".webp") ||
    url.pathname.endsWith(".webmanifest")
  );
}

function getUtf8ContentType(pathname) {
  if (pathname.endsWith(".js")) return "text/javascript; charset=utf-8";
  if (pathname.endsWith(".css")) return "text/css; charset=utf-8";
  if (pathname.endsWith(".json")) return "application/json; charset=utf-8";
  if (pathname.endsWith(".webmanifest")) {
    return "application/manifest+json; charset=utf-8";
  }
  if (
    pathname.endsWith(".html") ||
    pathname === "/" ||
    pathname.endsWith("/index.html")
  ) {
    return "text/html; charset=utf-8";
  }
  return null;
}

function enforceUtf8Response(response, url) {
  if (!response || !response.ok || !url) return response;
  const nextContentType = getUtf8ContentType(url.pathname);
  if (!nextContentType) return response;

  const headers = new Headers(response.headers);
  headers.set("content-type", nextContentType);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

async function addCoreAssets(cache) {
  const requests = CORE_ASSETS.map(
    (url) => new Request(url, { cache: "reload" }),
  );

  await Promise.all(
    requests.map(async (request) => {
      try {
        await cache.add(request);
      } catch (error) {
        // Do not fail install because of a single missing asset.
        console.warn("[SW] Failed to pre-cache", request.url, error);
      }
    }),
  );
}

async function cleanupOldCaches() {
  const keys = await caches.keys();
  await Promise.all(
    keys.map((key) => {
      if (key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME) {
        return caches.delete(key);
      }
      return Promise.resolve(false);
    }),
  );
}

async function clearAppCaches() {
  const keys = await caches.keys();
  await Promise.all(
    keys
      .filter((key) => key.startsWith(CACHE_PREFIX))
      .map((key) => caches.delete(key)),
  );
}

async function handleNavigation(event) {
  const cache = await caches.open(CACHE_NAME);
  const requestUrl = new URL(event.request.url);

  try {
    const preloadResponse = await event.preloadResponse;
    if (preloadResponse) {
      const normalizedPreload = enforceUtf8Response(preloadResponse, requestUrl);
      cache.put("./index.html", normalizedPreload.clone());
      return normalizedPreload;
    }

    const networkResponse = await fetch(event.request);
    const normalizedNetwork = enforceUtf8Response(networkResponse, requestUrl);
    if (normalizedNetwork && normalizedNetwork.ok) {
      cache.put("./index.html", normalizedNetwork.clone());
    }
    return normalizedNetwork;
  } catch (error) {
    const cached = await cache.match("./index.html");
    if (cached) return cached;
    throw error;
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request, { ignoreVary: true });
  const requestUrl = new URL(request.url);

  const networkPromise = fetch(request)
    .then((response) => {
      const normalized = enforceUtf8Response(response, requestUrl);
      if (normalized && normalized.ok) {
        cache.put(request, normalized.clone());
      }
      return normalized;
    })
    .catch(() => null);

  if (cached) {
    networkPromise.catch(() => {});
    return cached;
  }

  const networkResponse = await networkPromise;
  return networkResponse || Response.error();
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await addCoreAssets(cache);
    })(),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      await cleanupOldCaches();
      if (self.registration.navigationPreload) {
        await self.registration.navigationPreload.enable();
      }
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (!isSameOrigin(url)) return;

  if (request.mode === "navigate") {
    event.respondWith(handleNavigation(event));
    return;
  }

  if (shouldHandleStatic(request, url)) {
    event.respondWith(staleWhileRevalidate(request));
  }
});

self.addEventListener("message", (event) => {
  const type = event?.data?.type;
  if (!type) return;

  if (type === "SKIP_WAITING") {
    self.skipWaiting();
    return;
  }

  if (type === "CLEAR_APP_CACHE") {
    event.waitUntil(clearAppCaches());
  }
});
