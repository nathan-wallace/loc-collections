// svelte.config.js
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  preprocess: vitePreprocess(),
  kit: {
    // Use a fallback page so that dynamic routes like `/item/[id]` can be
    // handled when using the static adapter. Without this, the build fails
    // with "Encountered dynamic routes" because the adapter doesn't know how
    // to prerender paths with parameters. The fallback ensures that requests
    // for any non‑prerendered route serve the app shell (index.html), allowing
    // the client side router to resolve the correct page at runtime.
    adapter: adapter({ fallback: 'index.html' }),
    paths: {
      base: process.env.BASE_PATH ?? ''
    },
    alias: {
      $lib: 'src/lib',
      $components: 'src/components'
    }
  }
};
