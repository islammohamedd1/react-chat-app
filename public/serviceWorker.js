importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
  workbox.setConfig({debug: false})
  workbox.precaching.precacheAndRoute([]);

  workbox.routing.registerRoute(
    '/',
    new workbox.strategies.CacheFirst()
  );

  workbox.routing.registerRoute(
    '/index.html',
    new workbox.strategies.CacheFirst()
  );

  workbox.routing.registerRoute(
    '/favicon.ico',
    new workbox.strategies.CacheFirst()
  );

  workbox.routing.registerRoute(
    '/icon.png',
    new workbox.strategies.CacheFirst()
  );

  workbox.routing.registerRoute(
    '/manifest.json',
    new workbox.strategies.CacheFirst()
  );

  workbox.routing.registerRoute(
    '/static',
    new workbox.strategies.CacheFirst()
  );
  workbox.routing.registerRoute(
    new RegExp("https:\/\/fonts\.googleapis\.com\/.*"),
    new workbox.strategies.CacheFirst()
  );
  workbox.routing.registerRoute(
    new RegExp("https:\/\/firebasestorage\.googleapis\.com\/.*"),
    new workbox.strategies.CacheFirst()
  );

} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
