<script lang="ts">
  import type { SearchResponse } from '$lib/types';
  import ItemCard from '../../components/ItemCard.svelte';
  import FacetFilter from '../../components/FacetFilter.svelte';
  import Pagination from '../../components/Pagination.svelte';
  export let data: { data: SearchResponse; q: string };
</script>
<h1 class="text-xl font-semibold mb-2">Search</h1>
<p class="mb-4 text-neutral-600 dark:text-neutral-300">Results for “{data.q}”.</p>
{#if data.data.facets}<FacetFilter facets={data.data.facets} />{/if}
{#if data.data.results?.length}
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
    {#each data.data.results as item}<ItemCard {item} />{/each}
  </div>
  <Pagination pagination={data.data.pagination} />
{:else}
  <p>No results.</p>
{/if}
