import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import { tanstackRouter } from '@tanstack/router-vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tanstackRouter(),],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    allowedHosts: [
      '<put the host/domain here>',
      'localhost',
      '127.0.0.1',
      '0.0.0.0'
    ]
  }
})
