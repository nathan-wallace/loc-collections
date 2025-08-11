<script lang="ts">
  export let kind: 'info' | 'warn' | 'error' = 'info';
</script>
<div class={`rounded-xl p-3 text-sm ${{
  info: 'bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-blue-50',
  warn: 'bg-amber-50 dark:bg-amber-950 text-amber-900 dark:text-amber-50',
  error: 'bg-rose-50 dark:bg-rose-950 text-rose-900 dark:text-rose-50'
}[kind]}`} role="status">
  <slot />
</div>
