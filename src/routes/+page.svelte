<script lang="ts">
  import type { SearchResponse, Facet, FacetFilter } from '$lib/types';
  import CollectionCard from '$components/CollectionCard.svelte';
  import Pagination from '$components/Pagination.svelte';
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  export let data: { data: SearchResponse };
  export let params;
  let collections = data.data.results ?? [];
  $: collections = data.data.results ?? [];
  const facets: Facet[] = data.data.facets ?? [];
  $: topicFacet = facets.find((f: any) => {
    const t = (f.title ?? f.name ?? f.facet ?? '').toLowerCase();
    return t.includes('subject') || t.includes('topic');
  });
  $: formatFacet = facets.find((f: any) => {
    const t = (f.title ?? f.name ?? f.facet ?? '').toLowerCase();
    return t.includes('format');
  });

  function slugFromUrl(u: string): string {
    try {
      const { pathname } = new URL(u);
      const parts = pathname.split('/').filter(Boolean);
      const idx = parts.indexOf('collections');
      if (idx >= 0 && parts[idx + 1]) return parts[idx + 1];
    } catch {}
    return '';
  }

  function navigate(url: string | null) {
    if (!url) return;
    const u = new URL(url);
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

  function applyFacet(f: FacetFilter | undefined) {
    if (!f?.on) return;
    navigate(f.on);
  }

  function clearFacet(facet: Facet | undefined) {
    if (!facet) return;
    const active = facet.filters?.find((f) => !f.on && f.off);
    if (active?.off) navigate(active.off);
  }

  function onFacetChange(facet: Facet | undefined, e: Event) {
    const select = e.currentTarget as HTMLSelectElement;
    const idx = select.value;
    if (!idx) {
      clearFacet(facet);
    } else {
      applyFacet(facet?.filters[Number(idx)]);
    }
  }

  void params;
</script>
<h1 class="text-2xl font-semibold mb-2">Explore Collections</h1>
<p class="mb-6 text-neutral-600 dark:text-neutral-300">Browse digitized collections. Choose a collection to dive in, then just start scrolling!</p>

{#if topicFacet || formatFacet}
  <div class="mb-4 flex flex-wrap gap-4">
    {#if topicFacet}
      <label class="text-sm">
        Topic:
        <select class="ml-2 rounded border bg-transparent px-2 py-1" on:change={(e) => onFacetChange(topicFacet, e)}>
          <option value="">All</option>
          {#each topicFacet.filters as f, i}
            <option value={i} selected={!f.on}>{f.title} ({f.count})</option>
          {/each}
        </select>
      </label>
    {/if}
    {#if formatFacet}
      <label class="text-sm">
        Format:
        <select class="ml-2 rounded border bg-transparent px-2 py-1" on:change={(e) => onFacetChange(formatFacet, e)}>
          <option value="">All</option>
          {#each formatFacet.filters as f, i}
            <option value={i} selected={!f.on}>{f.title} ({f.count})</option>
          {/each}
        </select>
      </label>
    {/if}
  </div>
{/if}
{#if collections.length}
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each collections as c (c.id)}
      <CollectionCard
        id={c.id}
        title={c.title ?? 'Untitled'}
        slug={slugFromUrl(c.id)}
        description={c.description?.[0] ?? null}
        hero={c.image_url?.[0] ?? null}
      />
    {/each}
  </div>
  <Pagination pagination={data.data.pagination} />
{:else}
  <p>No collections found.</p>
{/if}
