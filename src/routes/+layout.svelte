<script lang="ts">
  export let data;
  export let params;
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import SearchBar from '../components/SearchBar.svelte';
  import BookIcon from '../components/BookIcon.svelte';
  import '../app.css';
  void data;
  void params;
  onMount(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register(`${base}/service-worker.js`, { type: 'module' })
        .catch(console.warn);
    }
  });
</script>
<svelte:window on:keydown={(e) => { if (e.key === 'Escape') history.state && history.back(); }} />
<div class="flex min-h-screen flex-col bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-950">
  <header class="sticky top-0 z-40 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 shadow-sm">
    <div class="container flex items-center gap-3 py-3">
      <a href={base + '/'} class="flex items-center gap-2 font-semibold tracking-tight">
        <BookIcon />
        LOC Collections
      </a>
      <nav class="ml-auto flex items-center gap-3 text-sm">
        <a href={base + '/saved'} class="rounded-full px-3 py-1 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800">Saved</a>
      </nav>
    </div>
    <div class="container py-3"><SearchBar /></div>
  </header>
  <main class="container flex-1 py-8"><slot /></main>
  <footer class="container py-10 text-sm text-neutral-600 dark:text-neutral-400">
    <p>Data from the Library of Congress JSON API. This is an educational demo.</p>
  </footer>
</div>
