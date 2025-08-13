<script lang="ts">
  import SaveButton from './SaveButton.svelte';
  import type { ResultItem, ItemSummary, CollectionSummary } from '$lib/types';
  import { bestImageFrom } from '$lib/api';
  import AudioIcon from './AudioIcon.svelte';
  import { base } from '$app/paths';
  export let item!: ResultItem;
  let thumb: string | undefined;
  let isCollection: boolean;
  let summary: ItemSummary | CollectionSummary;
  let href: string;
  let itemDate: string | null;
  let isAudio = false;

  $: {
    thumb = bestImageFrom(item);
    isCollection = item.id.includes('/collections/');
    if (isCollection) {
      const match = item.id.match(/\/collections\/([^/?#]+)/);
      const slug = match ? match[1] : item.id;
      summary = {
        id: item.id.replace('http://', 'https://'),
        title: item.title ?? 'Untitled',
        slug,
        thumb
      } satisfies CollectionSummary;
    } else {
      summary = {
        id: item.id.replace('http://', 'https://'),
        title: item.title ?? 'Untitled',
        date: item.date ?? null,
        thumb
      } satisfies ItemSummary;
    }
    href = isCollection
      ? `${base}/collections/${(summary as CollectionSummary).slug}`
      : `${base}/item/${encodeURIComponent(btoa(summary.id))}`;
    itemDate = isCollection ? null : (summary as ItemSummary).date;
    const formats = (item.format ?? []).concat(item.online_format ?? []);
    isAudio = formats.some((f: string) => /audio|sound recording/i.test(f));
  }
</script>
<article class="overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
  <a href={href} aria-label={`Open ${summary.title}`}>
    <div class="aspect-[4/3] bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
      {#if summary.thumb}
        <img src={summary.thumb} alt={summary.title} class="w-full h-full object-cover" loading="lazy" />
      {:else}
        <img src={`${base}/placeholder.svg`} alt="No image available" class="w-full h-full object-cover" loading="lazy" />
      {/if}
    </div>
  </a>
  <div class="p-3 flex items-center justify-between gap-2">
    <a class="min-w-0" href={href}>
      <h4 class="font-medium truncate">{summary.title}</h4>
      {#if isCollection}
        <p class="text-xs text-amber-700 dark:text-amber-400">Collection</p>
      {:else if itemDate}
        <p class="text-xs text-neutral-600 dark:text-neutral-400">{itemDate}</p>
      {/if}
    </a>
    <div class="flex items-center gap-2">
      {#if isAudio}
        <span class="group/audio relative inline-flex" aria-label="Audio Recording">
          <AudioIcon />
          <span class="pointer-events-none absolute left-1/2 bottom-full mb-2 -translate-x-1/2 rounded bg-neutral-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover/audio:opacity-100 group-focus-within/audio:opacity-100">
            Audio Recording
          </span>
        </span>
      {/if}
      <SaveButton item={summary} />
    </div>
  </div>
</article>
