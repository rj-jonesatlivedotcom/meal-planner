const CACHE_NAME = "meal-planner-v5";

const APP_SHELL = [
  "/",
  "/planner",
  "/recipes",
  "/shopping",
  "/about",
  "/background.png",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      // Cache the main application pages/assets.
      for (const url of APP_SHELL) {
        try {
          await cache.add(url);
        } catch (error) {
          console.warn("Could not cache:", url, error);
        }
      }

      // Get the complete list of recipe images and cache them.
      try {
        const response = await fetch("/api/recipe-images", {
          cache: "no-store",
        });

        if (response.ok) {
          const images = await response.json();

          for (const image of images) {
            try {
              await cache.add(image);
            } catch (error) {
              console.warn("Could not cache recipe image:", image, error);
            }
          }

          console.log(
            `Meal Planner: cached ${images.length} recipe images`
          );
        } else {
          console.warn(
            "Recipe image list could not be loaded:",
            response.status
          );
        }
      } catch (error) {
        console.warn("Could not load recipe image list:", error);
      }

      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();

      await Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );

      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  // Only handle GET requests.
  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);

  // Only handle our own website.
  if (url.origin !== self.location.origin) {
    return;
  }

  // Recipe images:
  // Use the cached copy offline, but cache any image
  // that is successfully downloaded while online.
  if (request.destination === "image") {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(request);

        if (cachedResponse) {
          return cachedResponse;
        }

        try {
          const networkResponse = await fetch(request);

          if (networkResponse.ok) {
            await cache.put(request, networkResponse.clone());
          }

          return networkResponse;
        } catch (error) {
          console.warn("Offline image unavailable:", request.url);
          throw error;
        }
      })()
    );

    return;
  }

  // Page navigation:
  // Try the cached page first so the PWA works offline.
  if (request.mode === "navigate") {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_NAME);

        const cachedResponse = await cache.match(request);

        if (cachedResponse) {
          return cachedResponse;
        }

        // Try the network when online.
        try {
          const networkResponse = await fetch(request);

          if (networkResponse.ok) {
            await cache.put(request, networkResponse.clone());
          }

          return networkResponse;
        } catch (error) {
          // Last-resort fallback to the cached homepage.
          const homepage = await cache.match("/");

          if (homepage) {
            return homepage;
          }

          throw error;
        }
      })()
    );

    return;
  }

  // Other same-origin resources:
  // Cache first, then network and save successful responses.
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const cachedResponse = await cache.match(request);

      if (cachedResponse) {
        return cachedResponse;
      }

      try {
        const networkResponse = await fetch(request);

        if (networkResponse.ok) {
          await cache.put(request, networkResponse.clone());
        }

        return networkResponse;
      } catch (error) {
        throw error;
      }
    })()
  );
});