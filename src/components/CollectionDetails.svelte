<script lang="ts">
  import SaveButton from './SaveButton.svelte';
  import type { CollectionSummary } from '$lib/types';
  export let id: string;
  export let slug: string;
  export let title: string;
  export let description: string | null = null;
  export let hero: string | null = null;
  let summary: CollectionSummary;
  $: summary = {
    id: id.replace('http://', 'https://'),
    title,
    slug,
    thumb: hero ?? undefined
  } satisfies CollectionSummary;
</script>

<section class="mb-8 overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur shadow-sm">
  {#if hero}
    <div class="relative h-48 md:h-64 overflow-hidden">
      <img src={hero} alt={title} class="absolute inset-0 w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
    </div>
  {/if}
  <div class="p-6 flex flex-col gap-4">
    <div class="flex items-start justify-between gap-4">
      <h1 class="text-3xl font-bold leading-tight">{title}</h1>
      <SaveButton item={summary} />
    </div>
    {#if description}
      <p class="text-neutral-600 dark:text-neutral-300 leading-relaxed">{description}</p>
    {/if}
  </div>
</section>

