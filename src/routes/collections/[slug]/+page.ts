import type { PageLoad } from './$types';
import { collectionUrlFromSlug, fetchCollectionItems } from '$lib/api';

export const load: PageLoad = async ({ url, params }) => {
  const apiUrl = collectionUrlFromSlug(params.slug, url.searchParams);
  const data = await fetchCollectionItems(apiUrl);
  return { data, apiUrl };
};
