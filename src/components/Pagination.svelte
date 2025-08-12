<script lang="ts">
import type { Pagination } from '$lib/types';
export let pagination: Pagination | undefined;

// Normalize pagination links so that search parameters from the current
// location (such as filters and sort order) are preserved when navigating
// between pages.
function normalize(href: string | null): string | null {
  if (!href) return null;
  try {
    const u = new URL(href);
    const params = new URLSearchParams(location.search);
    for (const key of ['sp', 'c', 'sb', 'fa']) {
      const v = u.searchParams.get(key);
      if (v) params.set(key, v);
    }
    const q = params.toString();
    return `${location.pathname}${q ? `?${q}` : ''}`;
  } catch {
    return href;
  }
}

$: prev = normalize(pagination?.previous ?? null);
$: next = normalize(pagination?.next ?? null);
$: first = normalize(pagination?.first ?? null);
$: last = normalize(pagination?.last ?? null);
$: pageList =
  pagination?.page_list?.map((p) => ({ ...p, url: normalize(p.url ?? null) })) ?? null;
</script>
{#if pagination}
  <nav class="mt-4 flex justify-center" aria-label="Pagination">
    <span class="sr-only">Page {pagination.current} of {pagination.total}</span>
    <ul class="flex items-center gap-2">
      <li>
        {#if first}
          <a class="px-3 py-1 rounded-lg border" href={first} aria-label="First page">&laquo;</a>
        {:else}
          <span class="px-3 py-1 rounded-lg border opacity-50 select-none">&laquo;</span>
        {/if}
      </li>
      <li>
        {#if prev}
          <a class="px-3 py-1 rounded-lg border" href={prev} aria-label="Previous page">&lsaquo;</a>
        {:else}
          <span class="px-3 py-1 rounded-lg border opacity-50 select-none">&lsaquo;</span>
        {/if}
      </li>
      {#if pageList}
        {#each pageList as page}
          <li>
            {#if page.url}
              <a
                href={page.url}
                class="px-3 py-1 rounded-lg border"
                class:bg-neutral-200={typeof page.number === 'number' && page.number === pagination.current}
                class:dark\:bg-neutral-700={typeof page.number === 'number' && page.number === pagination.current}
                aria-current={typeof page.number === 'number' && page.number === pagination.current ? 'page' : undefined}
              >
                {page.number}
              </a>
            {:else}
              <span class="px-3 py-1 select-none">{page.number}</span>
            {/if}
          </li>
        {/each}
      {/if}
      <li>
        {#if next}
          <a class="px-3 py-1 rounded-lg border" href={next} aria-label="Next page">&rsaquo;</a>
        {:else}
          <span class="px-3 py-1 rounded-lg border opacity-50 select-none">&rsaquo;</span>
        {/if}
      </li>
      <li>
        {#if last}
          <a class="px-3 py-1 rounded-lg border" href={last} aria-label="Last page">&raquo;</a>
        {:else}
          <span class="px-3 py-1 rounded-lg border opacity-50 select-none">&raquo;</span>
        {/if}
      </li>
    </ul>
  </nav>
{/if}
