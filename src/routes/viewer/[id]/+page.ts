export const ssr = false;
import type { PageLoad } from './$types';
import { fetchItem, bestImageFrom } from '$lib/api';

export const load: PageLoad = async ({ params, fetch }) => {
  const decoded = atob(decodeURIComponent(params.id));
  const data = await fetchItem(fetch, decoded);
  const url = bestImageFrom(data);
  return { url, canonical: decoded, title: data.item?.title ?? 'Image' };
};
