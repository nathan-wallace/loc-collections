import type { PageLoad } from './$types';
import { fetchSearch } from '$lib/api';

export const load: PageLoad = async ({ url, fetch }) => {
  const q = url.searchParams.get('q') ?? '';
  const u = new URL(`/search/?q=${encodeURIComponent(q)}`, 'https://www.loc.gov');
  const sb = url.searchParams.get('sb');
  const fa = url.searchParams.get('fa');
  const c = url.searchParams.get('c');
  if (sb) u.searchParams.set('sb', sb);
  if (fa) u.searchParams.set('fa', fa);
  if (c) u.searchParams.set('c', c);
  const data = await fetchSearch(fetch, u.toString());
  return { data, q };
};
