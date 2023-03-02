import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const _resolve = (dir: string) => path.resolve(__dirname, dir)

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': _resolve('src'),
      '@img': _resolve('src/assets'),
    },
  },
  server: {
    proxy: {
      '/apis': {
        target: "http://34.204.199.168:8081",
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/apis/, "")
      },
    }
  },
})
