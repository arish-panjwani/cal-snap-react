import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/getUsers': {
        target: 'http://20.106.175.143:8090',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/getUsers/, '/getUsers'), // rewrites path if needed
        secure: false,

        configure: (proxy, options) => {
          proxy.on('error', (err, _req, _res) => {
           console.log('error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
           console.log('Request sent to target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
           console.log('Response received from target:', proxyRes.statusCode, req.url);
          });
        }
      },
    },
  },
})
