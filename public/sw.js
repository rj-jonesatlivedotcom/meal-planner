const CACHE_NAME = "meal-planner-v6";

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

async function cacheUrl(cache, url) {
  try {
    await cache.add(url);
    return true;
  } catch (error) {
    console.warn("Could not cache:", url, error);
    return false;
  }
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      /*
       * Cache the main application pages and assets.
       */
      for (const url of APP_SHELL) {
        await cacheUrl(cache, url);
      }

      /*
       * Discover and cache every individual recipe page.
       *
       * The Recipes page contains links to /recipes/[slug],
       * so we can discover the complete recipe collection
       * without maintaining a second hard-coded list here.
       */
      try {
        const recipesResponse = await fetch("/recipes", {
          cache: "no-store",
        });

        if (recipesResponse.ok) {
          const html = await recipesResponse.text();

          const recipeUrls = [
            ...html.matchAll(/href=["'](\/recipes\/[^"'?#]+)["']/g),
          ].map((match) => match[1]);

          const uniqueRecipeUrls = [...new Set(recipeUrls)];

          for (const url of uniqueRecipeUrls) {
            await cacheUrl(cache, url);
          }

          console.log(
            `Meal Planner: cached ${uniqueRecipeUrls.length} recipe pages`
          );
        }
      } catch (error) {
        console.warn("Could not discover recipe pages:", error);
      }

      /*
       * Get the complete list of recipe images and cache them.
       */
      try {
        const response = await fetch("/api/recipe-images", {
          cache: "no-store",
        });

        if (response.ok) {
          const images = await response.json();

          for (const image of images) {
            await cacheUrl(cache, image);
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

  /*
   * Next.js optimised images.
   *
   * The browser may request:
   *
   * /_next/image?url=%2Fimages%2Frecipes%2F...
   *
   * Our cache also contains the original:
   *
   * /images/recipes/...
   *
   * If the optimised image isn't available offline,
   * fall back to the original cached photograph.
   */
  if (url.pathname === "/_next/image") {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_NAME);

        const cachedOptimised = await cache.match(request);

        if (cachedOptimised) {
          return cachedOptimised;
        }

        try {
          const networkResponse = await fetch(request);

          if (networkResponse.ok) {
            await cache.put(request, networkResponse.clone());
          }

          return networkResponse;
        } catch (error) {
          const imageUrl = url.searchParams.get("url");

          if (imageUrl) {
            try {
              const decodedImageUrl = decodeURIComponent(imageUrl);

              const originalImage = await cache.match(decodedImageUrl);

              if (originalImage) {
                return originalImage;
              }
            } catch (imageError) {
              console.warn(
                "Could not use cached original image:",
                imageError
              );
            }
          }

          throw error;
        }
      })()
    );

    return;
  }

  /*
   * Recipe images:
   *
   * Use the cached copy offline, but cache any image
   * successfully downloaded while online.
   */
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
          console.warn(
            "Offline image unavailable:",
            request.url
          );

          throw error;
        }
      })()
    );

    return;
  }

  /*
   * Page navigation:
   *
   * 1. Use an exact cached page if available.
   * 2. Try the network when online.
   * 3. Fall back to the cached homepage if necessary.
   */
  if (request.mode === "navigate") {
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
          /*
           * If the exact URL wasn't cached, try matching
           * the pathname without query parameters.
           */
          const pathnameResponse = await cache.match(url.pathname);

          if (pathnameResponse) {
            return pathnameResponse;
          }

          /*
           * Last-resort fallback to the cached homepage.
           */
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

  /*
   * Other same-origin resources:
   *
   * Cache first, then network and save successful responses.
   */
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