import type { PageLoad } from './$types';
import { fetchCollections } from '$lib/api';

export const load: PageLoad = async ({ url, fetch }) => {
  const u = new URL('https://www.loc.gov/collections/');
  u.searchParams.set('fo', 'json');
  u.searchParams.set('at', 'results,pagination,facets');
  for (const key of ['sp','c','sb','fa']) {
    const v = url.searchParams.get(key);
    if (v) u.searchParams.set(key, v);
  }
  const data = await fetchCollections(fetch, u.toString());
  return { data };
};
