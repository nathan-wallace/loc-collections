<script lang="ts">
  import type { Pagination } from '$lib/types';
  export let pagination: Pagination | undefined;
  function normalize(href: string | null): string | null {
    if (!href) return null;
    try {
      const u = new URL(href);
      const params = new URLSearchParams(location.search);
      for (const key of ['sp','c','sb','fa']) {
        const v = u.searchParams.get(key);
        if (v) params.set(key, v);
      }
      const q = params.toString();
      return `${location.pathname}${q ? `?${q}` : ''}`;
    } catch { return href; }
  }
</script>
{#if pagination}
  <nav class="flex items-center justify-between mt-4" aria-label="Pagination">
    {#if normalize(pagination.previous)}
      <a class="px-3 py-1 rounded-lg border" href={normalize(pagination.previous)!}>Prev</a>
    {:else}
      <span class="px-3 py-1 rounded-lg border opacity-50 select-none">Prev</span>
    {/if}
    <span class="text-sm text-neutral-600 dark:text-neutral-300">Page {pagination.current} of {pagination.total}</span>
    {#if normalize(pagination.next)}
      <a class="px-3 py-1 rounded-lg border" href={normalize(pagination.next)!}>Next</a>
    {:else}
      <span class="px-3 py-1 rounded-lg border opacity-50 select-none">Next</span>
    {/if}
  </nav>
{/if}
