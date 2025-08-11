<script lang="ts">
  export let data;
  export let params;
  import { favorites } from '$lib/stores/favorites';
  import { get } from 'svelte/store';
  $: fav = get(favorites);
  function clear() { if (confirm('Remove all saved items?')) favorites.clear(); }
</script>
<header class="mb-4 flex items-center justify-between">
  <h1 class="text-xl font-semibold">Saved Items</h1>
  <div class="flex gap-2">
    <button class="rounded-lg border px-3 py-1" on:click={clear}>Clear All</button>
    {#if fav.ids.length}
      <a class="rounded-lg border px-3 py-1" href={`/viewer/${encodeURIComponent(btoa(fav.ids[0]))}`}>Open First in Viewer</a>
    {/if}
  </div>
</header>
{#if fav.ids.length === 0}
  <p class="text-neutral-600 dark:text-neutral-400">You haven’t saved anything yet.</p>
{:else}
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {#each fav.ids as id}
      {#if fav.byId[id]}
        <a class="block rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800" href={`/item/${encodeURIComponent(btoa(id))}`}>
          <div class="aspect-[4/3] bg-neutral-100 dark:bg-neutral-800">
            {#if fav.byId[id].thumb}
              <img src={fav.byId[id].thumb} alt={fav.byId[id].title} class="w-full h-full object-cover" loading="lazy" />
            {:else}
              <img src="/placeholder.svg" alt="No image" class="w-full h-full object-cover" loading="lazy" />
            {/if}
          </div>
          <div class="p-2 text-sm">
            <p class="font-medium truncate">{fav.byId[id].title}</p>
            {#if fav.byId[id].date}<p class="text-xs opacity-70">{fav.byId[id].date}</p>{/if}
          </div>
        </a>
      {/if}
    {/each}
  </div>
{/if}
