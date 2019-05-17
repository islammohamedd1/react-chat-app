// importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js');

// if (workbox) {
//   console.log(`Yay! Workbox is loaded 🎉`);
//   workbox.setConfig({debug: false})
//   workbox.precaching.precacheAndRoute([]);

//   workbox.routing.registerRoute(
//     '/static',
//     new workbox.strategies.CacheFirst()
//   );
//   workbox.routing.registerRoute(
//     new RegExp("https:\/\/fonts\.googleapis\.com\/.*"),
//     new workbox.strategies.CacheFirst()
//   );
//   workbox.routing.registerRoute(
//     new RegExp("https:\/\/firebasestorage\.googleapis\.com\/.*"),
//     new workbox.strategies.CacheFirst()
//   );

// } else {
//   console.log(`Boo! Workbox didn't load 😬`);
// }


const cacheName = 'react-chat-app-islammohamed';
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        `/`,
        `/index.html`,
        '/static'
      ])
          .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => {
      return response || fetch(event.request);
    })
  );
});