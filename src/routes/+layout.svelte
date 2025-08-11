<script lang="ts">
  export let data;
  export let params;
  import { onMount } from 'svelte';
  import SearchBar from '../components/SearchBar.svelte';
  onMount(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js', { type: 'module' }).catch(console.warn);
    }
  });
</script>
<svelte:window on:keydown={(e) => { if (e.key === 'Escape') history.state && history.back(); }} />
<div class="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50">
  <header class="sticky top-0 z-40 backdrop-blur bg-white/70 dark:bg-neutral-950/70 border-b border-neutral-200 dark:border-neutral-800">
    <div class="container flex items-center gap-3 py-3">
      <a href="/" class="font-semibold tracking-tight">LOC Collections</a>
      <nav class="ml-auto flex items-center gap-3">
        <a href="/saved" class="rounded-lg px-3 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-800">Saved</a>
        <a href="/search" class="rounded-lg px-3 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-800">Search</a>
      </nav>
    </div>
    <div class="container py-3"><SearchBar /></div>
  </header>
  <main class="container py-6"><slot /></main>
  <footer class="container py-10 text-sm text-neutral-600 dark:text-neutral-400">
    <p>Data from the Library of Congress JSON API. This is an unofficial demo.</p>
  </footer>
</div>
