self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll(__precacheManifest.map(x => x.url))
    })
  )
})

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response !== undefined) {
        return response
      } else {
        return fetch(event.request).then(function(response) {
          let responseClone = response.clone()

          caches.open('v1').then(function(cache) {
            cache.put(event.request, responseClone)
          })
          return response
        })
      }
    })
  )
})

workbox.routing.registerRoute(/\.(?:js|css)$/, workbox.strategies.cacheFirst())

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
      })
    ]
  })
)
