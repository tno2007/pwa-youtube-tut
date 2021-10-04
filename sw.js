////
const staticCacheName = "site-static-v5";

const assets = [
  "/",
  "/index.html",
  "/js/app.js",
  "/js/ui.js",
  "/js/materialize.min.js",
  "/css/styles.css",
  "/css/materialize.min.css",
  "/img/dish.png",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v107/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
];

const installation = async (evt) => {};

// installation...
self.addEventListener("install", (evt) => {
  console.log("service worker installed");

  //.waitUntil ensure this listener does not complete
  // until the things inside it is done
  evt.waitUntil(
    // open or create-and-open if name does not exist
    caches.open(staticCacheName).then((cache) => {
      console.log("caching shell assets");
      // add/addall obtain files from server
      cache.addAll(assets);
    })
  );
});

// activation....
self.addEventListener("activate", (evt) => {
  console.log("service worker has been activated");
  evt.waitUntil(
    caches.keys().then((keys) => {
      //console.log(keys); //
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});

// fetch...
self.addEventListener("fetch", (evt) => {
  console.log("fetch event", evt.request.url);

  evt.respondWith(
    caches.match(evt.request).then((cacheRes) => {
      return cacheRes || fetch(evt.request);
    })
  );
});
