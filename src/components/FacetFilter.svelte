<script lang="ts">
  import type { Facet, FacetFilter } from '$lib/types';
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  export let facets: Facet[] = [];
  function applyFacet(f: FacetFilter) {
    if (!f.on) return;
    const u = new URL(f.on);
    const sp = u.searchParams;
    const fa = sp.get('fa'); const c = sp.get('c'); const sb = sp.get('sb');
    const params = new URLSearchParams(page.url.searchParams);
    if (fa) params.set('fa', fa);
    if (c) params.set('c', c);
    if (sb) params.set('sb', sb);
    goto(`${page.url.pathname}?${params.toString()}`);
  }
</script>
{#if facets && facets.length}
  <div class="flex gap-2 flex-wrap">
    {#each facets as facet}
      {#if facet.filters?.length}
        {#each facet.filters as f}
          <button class="text-sm rounded-full border px-3 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-800" on:click={() => applyFacet(f)} aria-label={`Filter: ${f.title}`}>
            {f.title} <span class="opacity-60">({f.count})</span>
          </button>
        {/each}
      {/if}
    {/each}
  </div>
{/if}
