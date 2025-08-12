// svelte.config.js
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    paths: {
      base: process.env.BASE_PATH ?? ''
    },
    alias: {
      $lib: 'src/lib',
      $components: 'src/components'
    }
  }
};
