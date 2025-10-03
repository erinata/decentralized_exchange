// vite.config.js
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/impermanent_loss/',                 // << include trailing slash
  build: { outDir: 'docs' },        // output to /docs for GitHub Pages
  plugins: [
    tailwindcss(),
    ],
})
  