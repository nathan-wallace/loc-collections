<script lang="ts">
  export let count = 12;
</script>
<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
  {#each Array.from({ length: count }) as _}
    <div class="rounded-xl bg-neutral-200 dark:bg-neutral-800 h-48 skeleton" aria-hidden="true" />
  {/each}
</div>
