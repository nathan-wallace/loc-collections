<script lang="ts">
  import type { SearchResponse } from '$lib/types';
  import ItemCard from '$components/ItemCard.svelte';
  import FacetFilter from '$components/FacetFilter.svelte';
  import Skeletons from '$components/Skeletons.svelte';
  import { onMount } from 'svelte';
  export let data: { data: SearchResponse; apiUrl: string };
  export let params;
  let items = data.data.results ?? [];
  let next = data.data.pagination?.next ?? null;
  let loading = false;
  let done = !next;
  let sentinel: HTMLDivElement;
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
    const u = new URL(location.href);
    if (sb) u.searchParams.set('sb', sb); else u.searchParams.delete('sb');
    location.assign(u.toString());
  }
</script>
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
      <button class="rounded-lg border px-3 py-1" on:click={() => document.getElementById('facet-panel')?.scrollIntoView({ behavior: 'smooth' })}>Facets</button>
    {/if}
  </div>
</header>
{#if data.data.facets}
  <section id="facet-panel" class="mb-6">
    <FacetFilter facets={data.data.facets} />
  </section>
{/if}
<section class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {#each items as item}<ItemCard {item} />{/each}
</section>
{#if !done}
  <div bind:this={sentinel} class="h-12" aria-hidden="true" />
  {#if loading}<div class="mt-4"><Skeletons count={8} /></div>{/if}
{:else}
  <p class="mt-6 text-center text-neutral-600 dark:text-neutral-400">No more results.</p>
{/if}
