// service-worker.js

const CACHE_NAME = "weather-app-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  <link rel="icon" type="image/x-icon" href="/images/favicon.ico"> 
    <link rel="apple-touch-icon" href="images/apple-touch-icon-iphone60x60.png"> 
    <link rel="apple-touch-icon" sizes="60x60" href="images/apple-touch-icon-ipad-76x76.png"> 
    <link rel="apple-touch-icon" sizes="114x114" href="images/apple-touch-icon-iphone-retina-120x120.png"> 
    <link rel="apple-touch-icon" sizes="144x144" href="images/apple-touch-icon-ipad-retina-152x152.png">
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css",
  "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css"
];
//Install Event
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

self.addEventListener("activate", event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
