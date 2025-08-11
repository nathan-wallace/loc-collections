import { writable } from 'svelte/store';
export const ui = writable({ theme: 'system' as 'system' | 'light' | 'dark', view: 'grid' as 'grid' | 'masonry' });
