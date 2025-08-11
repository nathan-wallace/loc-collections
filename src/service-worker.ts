/// <reference lib="webworker" />
import { build, files, version } from '$service-worker';

const CACHE = `app-cache-${version}`;
const APP_SHELL = [...build, ...files];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(APP_SHELL)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
    (self as any).clients.claim();
  })());
});

self.addEventListener('fetch', (event: FetchEvent) => {
  const req = event.request;
  const url = new URL(req.url);
  if (req.method !== 'GET') return;

  if (APP_SHELL.includes(url.pathname)) {
    event.respondWith(caches.match(req).then((r) => r || fetch(req)));
    return;
  }

  if (
    url.hostname.endsWith('loc.gov') ||
    url.hostname.endsWith('tile.loc.gov') ||
    url.hostname.endsWith('cdn.loc.gov')
  ) {
    event.respondWith((async () => {
      const cached = await caches.match(req);
      try {
        const res = await fetch(req);
        if (res.ok) {
          try {
            const cache = await caches.open(CACHE);
            await cache.put(req, res.clone());
          } catch {}
        }
        return res;
      } catch {
        if (cached) return cached;
        throw new Error('Offline and not cached');
      }
    })());
  }
});

self.addEventListener('message', (event: ExtendableMessageEvent) => {
  const data = (event as any).data as any;
  if (data?.type === 'cache-item') {
    const item = data.payload as { id: string; thumb?: string | null };
    // `new URL()` requires an absolute URL. `item.id` should already be
    // absolute, but normalise protocol-relative IDs just in case to avoid
    // `TypeError: Failed to construct 'URL': Invalid base URL`.
    const id = item.id.startsWith('//') ? `https:${item.id}` : item.id;
    const jsonUrl = new URL(id);
    jsonUrl.searchParams.set('fo', 'json');
    event.waitUntil((async () => {
      const cache = await caches.open(CACHE);
      try { await cache.add(jsonUrl.toString()); } catch {}
      if (item.thumb) {
        try { await cache.add(item.thumb); } catch {}
      }
    })());
  }
});
