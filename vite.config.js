import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
// import '/node_modules/@material-tailwind/html/scripts/tooltip.js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: { postcss: { plugins: [tailwindcss()] } },
  base: './',
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  // build: {
  //   rollupOptions: {
  //     external: [
  //       '/node_modules/@material-tailwind/html@latest/scripts/tooltip.js',
  //     ],
  //   },
  // },
})
