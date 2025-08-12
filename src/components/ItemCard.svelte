<script lang="ts">
  import SaveButton from './SaveButton.svelte';
  import type { ResultItem, ItemSummary } from '$lib/types';
  import { bestImageFrom } from '$lib/api';
  import { base } from '$app/paths';
  export let item!: ResultItem;
  const thumb = bestImageFrom(item);
  const summary: ItemSummary = {
    id: item.id.replace('http://', 'https://'),
    title: item.title ?? 'Untitled',
    date: item.date ?? null,
    thumb
  };
</script>
<article class="overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
  <a href={`${base}/item/${encodeURIComponent(btoa(summary.id))}`} aria-label={`Open ${summary.title}`}>
    <div class="aspect-[4/3] bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
      {#if summary.thumb}
        <img src={summary.thumb} alt={summary.title} class="w-full h-full object-cover" loading="lazy" />
      {:else}
        <img src={`${base}/placeholder.svg`} alt="No image available" class="w-full h-full object-cover" loading="lazy" />
      {/if}
    </div>
  </a>
  <div class="p-3 flex items-center justify-between gap-2">
    <a class="min-w-0" href={`${base}/item/${encodeURIComponent(btoa(summary.id))}`}>
      <h4 class="font-medium truncate">{summary.title}</h4>
      {#if summary.date}<p class="text-xs text-neutral-600 dark:text-neutral-400">{summary.date}</p>{/if}
    </a>
    <SaveButton item={summary} />
  </div>
</article>
