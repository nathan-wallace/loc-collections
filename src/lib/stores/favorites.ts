import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import type { ItemSummary } from '$lib/types';

export type FavoritesState = { ids: string[]; byId: Record<string, ItemSummary> };

const KEY = 'loc:favorites:v1';

function load(): FavoritesState {
  if (!browser) return { ids: [], byId: {} };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ids: [], byId: {} };
    const parsed = JSON.parse(raw) as FavoritesState;
    if (!parsed || typeof parsed !== 'object') return { ids: [], byId: {} };
    const ids = Array.isArray(parsed.ids) ? parsed.ids : [];
    const byId = parsed.byId && typeof parsed.byId === 'object' ? parsed.byId : {};
    return { ids, byId };
  } catch (_) {
    return { ids: [], byId: {} };
  }
}

function persist(state: FavoritesState) {
  if (!browser) return;
  try { localStorage.setItem(KEY, JSON.stringify(state)); }
  catch (err) { console.warn('Failed to persist favorites', err); }
}

function createFavorites() {
  const initial = load();
  const { subscribe, update, set } = writable<FavoritesState>(initial);

  function saveFavorite(item: ItemSummary) {
    update((s) => {
      if (!s.byId[item.id]) s.ids.unshift(item.id);
      s.byId[item.id] = item;
      persist(s);
      if (navigator.serviceWorker?.controller) {
        navigator.serviceWorker.controller.postMessage({ type: 'cache-item', payload: item });
      }
      return s;
    });
  }

  function removeFavorite(id: string) {
    update((s) => {
      s.ids = s.ids.filter((x) => x !== id);
      delete s.byId[id];
      persist(s);
      return s;
    });
  }

  function clear() {
    set({ ids: [], byId: {} });
    persist({ ids: [], byId: {} });
  }

  return { subscribe, saveFavorite, removeFavorite, clear };
}

export const favorites = createFavorites();
