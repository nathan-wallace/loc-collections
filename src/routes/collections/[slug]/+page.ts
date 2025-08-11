import type { PageLoad } from './$types';
import { collectionUrlFromSlug, fetchCollectionItems } from '$lib/api';

export const load: PageLoad = async ({ url, params, fetch }) => {
  const apiUrl = collectionUrlFromSlug(params.slug, url.searchParams);
  const data = await fetchCollectionItems(fetch, apiUrl);
  return { data, apiUrl };
};
