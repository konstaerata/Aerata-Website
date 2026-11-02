import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, 'src') },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React — changes rarely, long cache life
          vendor: ['react', 'react-dom', 'react-router-dom'],
          // Animation library — substantial size, isolated
          motion: ['framer-motion'],
        },
      },
    },
  },
});
