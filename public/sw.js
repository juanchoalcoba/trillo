// ==========================================
// TRILLO BACKOFFICE - SERVICE WORKER PWA
// ==========================================
// Service worker liviano en modo pass-through (red directa)
// Diseñado para garantizar que los datos administrativos
// (pedidos, eventos, mensajes) se consulten en tiempo real sin caché obsoleto.

const CACHE_NAME = 'trillo-admin-cache-v1';

self.addEventListener('install', (event) => {
  // Activa inmediatamente el service worker sin esperar a que se cierren pestañas
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Toma control inmediato de los clientes en el scope /backoffice
  event.waitUntil(self.clients.claim());
});

// Peticiones de red: modo pass-through (red primero / directa)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch((error) => {
      // Si falla la red, propaga el error de red estándar
      throw error;
    })
  );
});
