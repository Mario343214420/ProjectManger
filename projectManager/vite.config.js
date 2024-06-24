import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve }  from 'path'
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://192.168.10.87:6147',
        changeOrigin: true,
        ws: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  base:'./'
})
