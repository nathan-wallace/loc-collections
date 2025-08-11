# LOC Collections Browser (SvelteKit + Tailwind)

A polished, responsive SvelteKit app to explore Library of Congress collections, drill into items, view fullscreen images (via IIIF when possible), and save favorites for offline viewing.

## Quick start
```bash
pnpm i
pnpm dev
# open http://localhost:5173
```

Build & preview:
```bash
pnpm build
pnpm preview
```

## Features
- Explore collections on `/` with cards and pagination.
- Collection items at `/collections/[slug]` with infinite scroll, facets, and sort (`sb=`).
- Item details at `/item/[id]` with resources and Save button (persists to localStorage).
- Fullscreen viewer at `/viewer/[id]` with zoom/pan; uses IIIF full size when possible.
- Saved items at `/saved` work offline. Service worker caches JSON + thumbnails for saved items.
- Accessibility: alt text, labeled buttons, focus-visible, reduced motion.
- Performance: lazy images, responsive layout, simple caching.

## API usage
- Base: `https://www.loc.gov` with `?fo=json`.
- Results are limited using `at=results,pagination,facets`.
- Facets use `fa=`, sorting uses `sb=`.
- Items use item URL + `?fo=json`.
- If `image_url` looks like IIIF, we request `.../full/max/0/default.jpg` (v3) or `.../full/full/0/default.jpg` (v2).

## Notes on considerate usage
The public LOC API can rate-limit. This project retries with backoff for 429/503/504.

## Lighthouse targets
Perf ≥ 90 (desktop), A11y ≥ 95 (with typical data).

## Structure
- `src/lib/api.ts` – fetch helpers + image selection
- `src/lib/utils/iiif.ts` – IIIF URL helpers
- `src/lib/stores/favorites.ts` – localStorage-backed favorites
- `src/components/*` – UI pieces
- `src/routes/*` – SvelteKit filesystem routes
- `src/service-worker.ts` – app shell + saved items cache
