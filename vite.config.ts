import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const _resolve = (dir: string) => path.resolve(__dirname, dir)

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  // 配置项目别名
  resolve: {
    alias: {
      '@': _resolve('src'),
      '@img': _resolve('src/assets'),
    },
  },
})
