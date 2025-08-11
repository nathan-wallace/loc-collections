<script lang="ts">
  import SaveButton from './SaveButton.svelte';
  import type { ResultItem, ItemSummary } from '$lib/types';
  import { bestImageFrom } from '$lib/api';
  export let item!: ResultItem;
  const thumb = bestImageFrom(item);
  const summary: ItemSummary = {
    id: item.id.replace('http://', 'https://'),
    title: item.title ?? 'Untitled',
    date: item.date ?? null,
    thumb
  };
</script>
<article class="rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
  <a href={`/item/${encodeURIComponent(btoa(summary.id))}`} aria-label={`Open ${summary.title}`}>
    <div class="aspect-[4/3] bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
      {#if summary.thumb}
        <img src={summary.thumb} alt={summary.title} class="w-full h-full object-cover" loading="lazy" />
      {:else}
        <img src="/placeholder.svg" alt="No image available" class="w-full h-full object-cover" loading="lazy" />
      {/if}
    </div>
  </a>
  <div class="p-3 flex items-center justify-between gap-2">
    <a class="min-w-0" href={`/item/${encodeURIComponent(btoa(summary.id))}`}>
      <h4 class="font-medium truncate">{summary.title}</h4>
      {#if summary.date}<p class="text-xs text-neutral-600 dark:text-neutral-400">{summary.date}</p>{/if}
    </a>
    <SaveButton {item}={summary} />
  </div>
</article>
