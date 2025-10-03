// vite.config.js
import { defineConfig } from 'vite'

// If you're using React/Vue/Svelte, also import and add the framework plugin.
// Example for React: import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/impermanent_loss/',                 // << include trailing slash
  build: { outDir: 'docs' },        // output to /docs for GitHub Pages
  // plugins: [react()],             // (uncomment if you use React)
})