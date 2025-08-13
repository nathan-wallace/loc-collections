<script lang="ts">
  import type { SearchResponse } from '$lib/types';
  import ItemCard from '$components/ItemCard.svelte';
  import FacetFilter from '$components/FacetFilter.svelte';
  import Skeletons from '$components/Skeletons.svelte';
  import CollectionDetails from '$components/CollectionDetails.svelte';
  import { bestImageFrom } from '$lib/api';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  export let data: { data: SearchResponse; apiUrl: string };
  export let params;
  let items = data.data.results ?? [];
  let next = data.data.pagination?.next ?? null;
  let loading = false;
  let done = !next;
  let sentinel: HTMLDivElement;
  let showFacets = false;
  let collectionTitle = data.data.title ?? params.slug;
  let collectionDescription: string | null = Array.isArray((data.data as any).description)
    ? (data.data as any).description[0]
    : ((data.data as any).description ?? null);
  let collectionId = (data.data as any).id ?? data.apiUrl.split('?')[0];
  let hero = bestImageFrom(data.data as any);

  $: {
    items = data.data.results ?? [];
    next = data.data.pagination?.next ?? null;
    done = !next;
  }
  async function loadMore() {
    if (!next || loading) return;
    loading = true;
    try {
      const res = await fetch(next);
      const json: SearchResponse = await res.json();
      items = [...items, ...(json.results ?? [])];
      next = json.pagination?.next ?? null;
      done = !next;
    } catch (e) {
      console.warn(e);
      done = true;
    } finally {
      loading = false;
    }
  }
  onMount(() => {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) loadMore();
    }, { rootMargin: '400px' });
    if (sentinel) io.observe(sentinel);
    return () => io.disconnect();
  });

  function updateSort(e: Event) {
    const sb = (e.currentTarget as HTMLSelectElement).value;
    const params = new URLSearchParams(page.url.searchParams);
    if (sb) params.set('sb', sb); else params.delete('sb');
    const q = params.toString();
    goto(`${page.url.pathname}${q ? `?${q}` : ''}`);
  }
  void params;
</script>
<CollectionDetails
  id={collectionId}
  slug={params.slug}
  title={collectionTitle}
  description={collectionDescription}
  hero={hero}
/>
<header class="mb-4 flex items-center justify-between gap-3">
  <h1 class="text-xl font-semibold">Collection Items</h1>
  <div class="flex items-center gap-2">
    <label class="text-sm">
      Sort:
      <select class="ml-2 rounded border bg-transparent px-2 py-1" on:change={updateSort}>
        <option value="">Relevance</option>
        <option value="date">Date ↑</option>
        <option value="date_desc">Date ↓</option>
        <option value="title_s">Title A→Z</option>
        <option value="title_s_desc">Title Z→A</option>
      </select>
    </label>
    {#if data.data.facets}
      <button class="rounded-lg border px-3 py-1" on:click={() => (showFacets = !showFacets)}>Facets</button>
    {/if}
  </div>
</header>
{#if showFacets && data.data.facets}
  <section id="facet-panel" class="mb-6">
    <FacetFilter facets={data.data.facets} />
  </section>
{/if}
<section class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {#each items as item (item.id)}<ItemCard {item} />{/each}
</section>
{#if !done}
  <div bind:this={sentinel} class="h-12" aria-hidden="true" />
  {#if loading}<div class="mt-4"><Skeletons count={8} /></div>{/if}
{:else}
  <p class="mt-6 text-center text-neutral-600 dark:text-neutral-400">No more results.</p>
{/if}
