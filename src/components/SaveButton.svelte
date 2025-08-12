<script lang="ts">
  import { favorites } from '$lib/stores/favorites';
  import type { ItemSummary } from '$lib/types';
  export let item!: ItemSummary;
  // reactively determine if this item is saved
  $: saved = $favorites.ids.includes(item.id);
  let animating = false;
  function toggle() {
    if (saved) favorites.removeFavorite(item.id);
    else favorites.saveFavorite(item);
    animating = true;
    setTimeout(() => (animating = false), 300);
  }
</script>
<button
  class={`group/save relative inline-flex h-8 w-8 items-center justify-center rounded-full border p-2 text-sm transition-transform active:scale-95 ${saved ? 'bg-emerald-600 text-white border-emerald-600' : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'}`}
  on:click={toggle}
  aria-pressed={saved}
  aria-label={saved ? 'Remove from saved' : item.slug ? 'Save collection' : 'Save item'}
>
  {#if animating}
    <span class="absolute inset-0 rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
  {/if}
  <span class="relative z-10 text-lg leading-none">{#if saved}✓{:else}+{/if}</span>
  <span
    class="pointer-events-none absolute left-1/2 bottom-full mb-2 -translate-x-1/2 rounded bg-neutral-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover/save:opacity-100 group-focus/save:opacity-100"

  >
    {saved ? 'Saved' : 'Save'}
  </span>
</button>
