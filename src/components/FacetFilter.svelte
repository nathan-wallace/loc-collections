<script lang="ts">
  import type { Facet, FacetFilter } from '$lib/types';
  import { page } from '$app/state';
  import { goto } from '$app/navigation';

  export let facets: Facet[] = [];
  $: visibleFacets = facets.filter((f) =>
    (f.title ?? f.name ?? f.facet ?? '') !== 'Access Condition'
  );

  function applyFacet(f: FacetFilter) {
    const href = f.on ?? f.off;
    if (!href) return;
    const u = new URL(href);
    const sp = u.searchParams;
    const fa = sp.get('fa');
    const c = sp.get('c');
    const sb = sp.get('sb');
    const params = new URLSearchParams(page.url.searchParams);
    if (fa !== null) {
      if (fa) params.set('fa', fa); else params.delete('fa');
    }
    if (c) params.set('c', c);
    if (sb) params.set('sb', sb);
    const q = params.toString();
    goto(`${page.url.pathname}${q ? `?${q}` : ''}`);
  }
</script>
{#if visibleFacets && visibleFacets.length}
  <ul class="space-y-4">
    {#each visibleFacets as facet, i}
      {#if facet.filters?.length}
        <li class="rounded border" data-facet={i}>
          <h2 class="px-3 py-2 font-semibold">
            {facet.title ?? facet.name ?? facet.facet ?? 'Facet'}
          </h2>
          <div class="p-3 flex flex-wrap gap-2">
            {#each facet.filters as f}
              <button
                class="text-sm rounded-full border px-3 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                class:bg-neutral-200={!f.on}
                class:dark\:bg-neutral-700={!f.on}
                class:font-semibold={!f.on}
                aria-pressed={!f.on}
                on:click={() => applyFacet(f)}
                aria-label={`Filter: ${f.title}`}
              >
                {f.title} <span class="opacity-60">({f.count})</span>
              </button>
            {/each}
          </div>
        </li>
      {/if}
    {/each}
  </ul>
{/if}
