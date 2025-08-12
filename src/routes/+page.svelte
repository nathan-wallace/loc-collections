<script lang="ts">
  import type { SearchResponse } from '$lib/types';
  import CollectionCard from '$components/CollectionCard.svelte';
  import Pagination from '$components/Pagination.svelte';
  export let data: { data: SearchResponse };
  export let params;
  let collections = data.data.results ?? [];
  $: collections = data.data.results ?? [];
  function slugFromUrl(u: string): string {
    try {
      const { pathname } = new URL(u);
      const parts = pathname.split('/').filter(Boolean);
      const idx = parts.indexOf('collections');
      if (idx >= 0 && parts[idx + 1]) return parts[idx + 1];
    } catch {}
    return '';
  }
  void params;
</script>
<h1 class="text-2xl font-semibold mb-2">Explore Collections</h1>
<p class="mb-6 text-neutral-600 dark:text-neutral-300">Browse digitized collections. Click a card to dive in, then scroll to load more.</p>
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
