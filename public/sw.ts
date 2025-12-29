/// <reference lib="webworker" />
declare const self: ServiceWorkerGlobalScope;

// Workbox manifest injection point - DO NOT REMOVE
const manifest = (self as any).__WB_MANIFEST || [];

// Handle install event
self.addEventListener("install", (event: ExtendableEvent) => {
  event.waitUntil(self.skipWaiting());
});

// Handle activate event
self.addEventListener("activate", (event: ExtendableEvent) => {
  event.waitUntil(self.clients.claim());
});

// Handle fetch event with network-first strategy for API calls
// and cache-first for assets
self.addEventListener("fetch", (event: FetchEvent) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Network-first strategy for API calls
  if (url.pathname.includes("/api/")) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          return caches.open("api-cache-v1").then((cache) => {
            cache.put(request, response.clone());
            return response;
          });
        })
        .catch(() => {
          return caches
            .match(request)
            .then((response) => response || new Response("Offline"));
        })
    );
    return;
  }

  // Cache-first strategy for assets
  event.respondWith(
    caches
      .match(request)
      .then((response) => {
        if (response) {
          return response;
        }

        return fetch(request).then((response) => {
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response;
          }

          const responseToCache = response.clone();
          caches.open("asset-cache-v1").then((cache) => {
            cache.put(request, responseToCache);
          });

          return response;
        });
      })
      .catch(() => new Response("Offline"))
  );
});

