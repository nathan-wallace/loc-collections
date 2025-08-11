<script lang="ts">
  import FullscreenImage from '$components/FullscreenImage.svelte';
  export let data: { url: string | null; canonical: string; title: string };
</script>
<a class="text-sm opacity-70 hover:opacity-100" href={`/item/${encodeURIComponent(btoa(data.canonical))}`}>← Back to item</a>
{#if data.url}
  <h1 class="sr-only">{data.title}</h1>
  <FullscreenImage src={data.url} alt={data.title} />
{:else}
  <p>No image available for this item.</p>
{/if}
