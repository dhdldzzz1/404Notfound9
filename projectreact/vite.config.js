import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
      },
      '/ws-chat': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        ws: true, // WebSocket 업그레이드
      },
    },
  },
  define: {
    global: 'window', // ✅ global -> window 매핑
  },
  resolve: {
    alias: {
      // sockjs-client 내부에서 필요로 하는 polyfill 처리
      stream: 'stream-browserify',
      buffer: 'buffer',
    },
  },
  optimizeDeps: {
    include: ['sockjs-client'], // vite가 제대로 번들하도록 추가
  },
})
