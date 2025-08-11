<script lang="ts">
  import type { ItemResponse } from '$lib/types';
  import SaveButton from '$components/SaveButton.svelte';
  export let data: { data: ItemResponse; cover: string | null; canonical: string };
  export let params;
  const item = data.data.item ?? (data.data as any);
  const title = item?.title ?? 'Untitled';
  const summary = { id: data.canonical, title, thumb: data.cover ?? undefined, date: item?.date ?? null };
  const resources: { url?: string }[] | undefined = (data.data as any).resources;
</script>
<a class="text-sm opacity-70 hover:opacity-100" href={document.referrer || '/'}>← Back</a>
<header class="mt-2 flex items-center justify-between gap-3">
  <h1 class="text-2xl font-semibold">{title}</h1>
  <SaveButton item={summary} />
</header>
{#if data.cover}
  <a href={`/viewer/${encodeURIComponent(btoa(summary.id))}`} class="block my-4" aria-label="Open fullscreen viewer">
    <img src={data.cover} alt={title} class="w-full max-h-[60vh] object-contain rounded-xl bg-neutral-100 dark:bg-neutral-800" />
  </a>
{/if}
<section class="grid md:grid-cols-3 gap-6 mt-4">
  <div class="md:col-span-2 space-y-3">
    {#if item?.description?.length}
      <div>
        <h2 class="font-semibold mb-2">Description</h2>
        {#each item.description as d}<p class="text-neutral-700 dark:text-neutral-300">{d}</p>{/each}
      </div>
    {/if}
    {#if item?.subjects?.length || item?.subject?.length}
      <div>
        <h2 class="font-semibold mb-2">Subjects</h2>
        <div class="flex gap-2 flex-wrap">
          {#each (item.subjects ?? item.subject ?? []) as s}
            <a href={`/search?fa=subject:${encodeURIComponent(s)}`} class="text-sm rounded-full border px-3 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-800">{s}</a>
          {/each}
        </div>
      </div>
    {/if}
    {#if resources?.length}
      <div>
        <h2 class="font-semibold mb-2">Resources</h2>
        <ul class="list-disc pl-6">
          {#each resources as r, i}
            {#if r.url}<li><a class="text-blue-600 hover:underline" href={r.url} target="_blank" rel="noopener">Download / View resource {i + 1}</a></li>{/if}
          {/each}
        </ul>
      </div>
    {/if}
  </div>
  <aside class="space-y-2">
    {#if item?.contributors?.length}
      <div><h3 class="font-semibold">Contributors</h3>
        <ul class="text-sm">
          {#each item.contributors as c}<li>{typeof c === 'string' ? c : Object.keys(c)[0]}</li>{/each}
        </ul>
      </div>
    {/if}
    {#if item?.dates?.length || item?.date}
      <div><h3 class="font-semibold">Dates</h3><p class="text-sm">{item.date ?? item.dates?.join(', ')}</p></div>
    {/if}
    {#if item?.format?.length || item?.online_format?.length}
      <div><h3 class="font-semibold">Formats</h3><p class="text-sm">{(item.format ?? item.online_format).join(', ')}</p></div>
    {/if}
    {#if item?.url}
      <div><h3 class="font-semibold">Source</h3>
        <a class="text-blue-600 hover:underline break-all" href={item.url} target="_blank" rel="noopener">{item.url}</a>
      </div>
    {/if}
  </aside>
</section>
