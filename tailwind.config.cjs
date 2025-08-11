/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{html,svelte,ts}',
    './src/routes/**/*.{svelte,ts}',
    './src/components/**/*.{svelte,ts}'
  ],
  theme: {
    extend: {
      container: { center: true, padding: '1rem' }
    }
  },
  plugins: []
};
