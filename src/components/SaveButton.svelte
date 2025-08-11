<script lang="ts">
  import { favorites } from '$lib/stores/favorites';
  import type { ItemSummary } from '$lib/types';
  import { get } from 'svelte/store';
  export let item!: ItemSummary;
  $: saved = get(favorites).ids.includes(item.id);
  function toggle() { if (saved) favorites.removeFavorite(item.id); else favorites.saveFavorite(item); }
</script>
<button class={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm ${saved ? 'bg-emerald-600 text-white border-emerald-600' : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'}`} on:click={toggle} aria-pressed={saved} aria-label={saved ? 'Remove from saved' : 'Save item'}>
  {#if saved}✓ Saved{:else}+ Save{/if}
</button>
