<script lang="ts">
  import { base } from '$app/paths';
  export let title: string;
  export let slug: string;
  export let description: string | null = null;
  export let hero: string | null = null;
</script>
<a
  class="group block overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
  href={`${base}/collections/${slug}`}
>
  <div class="aspect-[4/3] bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
    {#if hero}
      <img src={hero} alt={title} class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
    {:else}
      <img src={`${base}/placeholder.svg`} alt="Placeholder" class="w-full h-full object-cover" loading="lazy" />
    {/if}
  </div>
  <div class="p-4">
    <h3 class="font-semibold mb-1 line-clamp-2">{title}</h3>
    {#if description}
      <p class="text-sm text-neutral-600 dark:text-neutral-300 line-clamp-2">{description}</p>
    {/if}
  </div>
</a>
