<script lang="ts">
  import { goto } from '$app/navigation';
  export let initial = '';
  let q = initial;
  function onSubmit(e: Event) {
    e.preventDefault();
    const term = q?.trim();
    if (term) goto(`/search?q=${encodeURIComponent(term)}`);
  }
</script>
<form class="relative" on:submit|preventDefault={onSubmit} role="search">
  <input
    class="w-full rounded-full border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/80 px-4 py-2 pr-10 shadow-sm placeholder-neutral-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
    placeholder="Search the Library of Congress"
    bind:value={q}
    aria-label="Search all collections"
  />
  <button
    type="submit"
    class="absolute right-1 top-1/2 -translate-y-1/2 p-2 rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
    aria-label="Search"
  >
    🔎
  </button>
</form>
