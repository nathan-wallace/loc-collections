<script lang="ts">
  import type { Facet, FacetFilter } from '$lib/types';
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  export let facets: Facet[] = [];

  /**
   * Apply or clear a facet filter by navigating with updated query params.
   * The LOC API provides `on` links when a filter can be applied and `off`
   * links when it is currently active. We use whichever is available so that
   * clicking an active filter removes it.
   */
  function applyFacet(f: FacetFilter) {
    const target = f.on ?? f.off;
    if (!target) return;
    const u = new URL(target);
    const sp = u.searchParams;
    const params = new URLSearchParams(page.url.searchParams);
    const fa = sp.get('fa');
    const c = sp.get('c');
    const sb = sp.get('sb');
    if (fa !== null) {
      if (fa) params.set('fa', fa); else params.delete('fa');
    }
    if (c) params.set('c', c);
    if (sb) params.set('sb', sb);
    const q = params.toString();
    goto(`${page.url.pathname}${q ? `?${q}` : ''}`);
  }

  function facetTitle(f: Facet): string {
    return (f.title ?? f.name ?? f.facet ?? '') as string;
  }
</script>
{#if facets && facets.length}
  <div class="space-y-4">
    {#each facets as facet}
      {#if facet.filters?.length}
        <details class="rounded border p-2" open={facet.filters.some((f) => !f.on)}>
          <summary class="cursor-pointer select-none text-sm font-semibold">{facetTitle(facet)}</summary>
          <div class="mt-2 flex flex-wrap gap-2">
            {#each facet.filters as f}
              {@const active = !f.on && !!f.off}
              <button
                class="text-sm rounded-full border px-3 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 {active ? 'bg-neutral-200 dark:bg-neutral-700 font-semibold' : ''}"
                on:click={() => applyFacet(f)}
                aria-pressed={active}
                aria-label={`Filter: ${f.title}`}>
                {f.title} <span class="opacity-60">({f.count})</span>
              </button>
            {/each}
          </div>
        </details>
      {/if}
    {/each}
  </div>
{/if}
