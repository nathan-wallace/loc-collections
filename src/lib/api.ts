import type { ItemResponse, SearchResponse, ResultItem } from './types';
import { toIIIFLargest, looksLikeIIIF } from './utils/iiif';

const BASE = 'https://www.loc.gov';

async function fetchJSON<T>(url: string, opts: { signal?: AbortSignal; retries?: number } = {}): Promise<T> {
  const { signal, retries = 2 } = opts;
  let attempt = 0;
  let lastErr: unknown;
  while (attempt <= retries) {
    try {
      const res = await fetch(url, { signal, headers: { 'Accept': 'application/json' } });
      if (!res.ok) {
        if ([429, 502, 503, 504].includes(res.status) && attempt < retries) {
          const wait = 500 * Math.pow(2, attempt);
          await new Promise((r) => setTimeout(r, wait));
          attempt++; continue;
        }
        throw new Error(`HTTP ${res.status} for ${url}`);
      }
      return (await res.json()) as T;
    } catch (err) {
      if (signal?.aborted) throw err;
      lastErr = err;
      if (attempt === retries) break;
      attempt++;
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error(String(lastErr));
}

export async function fetchCollections(url?: string, signal?: AbortSignal): Promise<SearchResponse> {
  const u = url ?? `${BASE}/collections/?fo=json&at=results,pagination,facets`;
  return fetchJSON<SearchResponse>(u, { signal });
}

export async function fetchCollectionItems(url: string, signal?: AbortSignal): Promise<SearchResponse> {
  const u = new URL(url, BASE);
  const at = u.searchParams.get('at');
  if (!at) u.searchParams.set('at', 'results,pagination,facets');
  if (!u.searchParams.get('fo')) u.searchParams.set('fo', 'json');
  return fetchJSON<SearchResponse>(u.toString(), { signal });
}

export async function fetchSearch(url: string, signal?: AbortSignal): Promise<SearchResponse> {
  const u = new URL(url, BASE);
  if (!u.pathname.startsWith('/search')) u.pathname = '/search/';
  if (!u.searchParams.get('fo')) u.searchParams.set('fo', 'json');
  if (!u.searchParams.get('at')) u.searchParams.set('at', 'results,pagination,facets');
  return fetchJSON<SearchResponse>(u.toString(), { signal });
}

export async function fetchItem(itemUrl: string, signal?: AbortSignal): Promise<ItemResponse> {
  const u = new URL(itemUrl.replace('http://', 'https://'));
  u.searchParams.set('fo', 'json');
  return fetchJSON<ItemResponse>(u.toString(), { signal });
}

export function bestImageFrom(obj: ItemResponse | { image_url?: string[] } | ResultItem): string | null {
  const urls = (obj as any).image_url as string[] | undefined
    ?? (obj as any).item?.image_url as string[] | undefined;
  if (!urls || urls.length === 0) return null;
  const candidate = urls[urls.length - 1] || urls[0];
  if (looksLikeIIIF(candidate)) return toIIIFLargest(candidate);
  return candidate.startsWith('//') ? `https:${candidate}` : candidate;
}

export function collectionUrlFromSlug(slug: string, search: URLSearchParams): string {
  const u = new URL(`${BASE}/collections/${slug}/`);
  u.searchParams.set('fo', 'json');
  u.searchParams.set('at', 'results,pagination,facets');
  for (const [k, v] of search) {
    if (['fo', 'at'].includes(k)) continue;
    u.searchParams.set(k, v);
  }
  return u.toString();
}
