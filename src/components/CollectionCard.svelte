<script lang="ts">
  import { base } from '$app/paths';
  import SaveButton from './SaveButton.svelte';
  import type { CollectionSummary } from '$lib/types';
  export let id: string;
  export let title: string;
  export let slug: string;
  export let description: string | null = null;
  export let hero: string | null = null;
  let summary: CollectionSummary;

  $: summary = {
    id: id.replace('http://', 'https://'),
    title,
    slug,
    thumb: hero ?? undefined
  };
</script>
<article class="group overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
  <a href={`${base}/collections/${slug}`}> 
    <div class="aspect-[4/3] bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
      {#if hero}
        <img src={hero} alt={title} class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
      {:else}
        <img src={`${base}/placeholder.svg`} alt="Placeholder" class="w-full h-full object-cover" loading="lazy" />
      {/if}
    </div>
  </a>
  <div class="p-4 flex items-start justify-between gap-2">
    <a class="min-w-0" href={`${base}/collections/${slug}`}>
      <h3 class="font-semibold mb-1 line-clamp-2">{title}</h3>
      {#if description}
        <p class="text-sm text-neutral-600 dark:text-neutral-300 line-clamp-2">{description}</p>
      {/if}
    </a>
    <SaveButton item={summary} />
  </div>
</article>
