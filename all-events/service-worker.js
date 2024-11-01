const cacheName = 'wedding-app-v1'; // Consider changing this for updates
const filesToCache = [
  '/',
  '/icons/wedding192.png',
  '/icons/wedding512.png',
  // Add other essential files like CSS and JS
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('Caching app shell');
      return Promise.all(
        filesToCache.map(file => {
          return fetch(file).then(response => {
            if (!response.ok) {
              throw new Error(`Failed to fetch ${file}: ${response.status}`);
            }
            return cache.add(file).catch(error => {
              console.error('Failed to cache:', error);
            });
          });
        })
      );
    })
  );
  self.skipWaiting(); // Activate the new service worker immediately
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== cacheName) {
            console.log('Removing old cache:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(error => {
        console.error('Fetch failed:', error);
        // Optionally return a fallback response here
      });
    })
  );
});