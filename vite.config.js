/** @format */

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      overlay: false, // Disable error overlay
    },
    proxy: {
      "/api": {
        target: "http://20.106.175.143:8080", // Backend server URL
        changeOrigin: true, // Change the origin header to the target URL
        rewrite: (path) => path.replace(/^\/api/, ""), // Remove '/api' prefix from the request
        secure: false, // Allow self-signed certificates (optional, if needed)
        configure: (proxy, options) => {
          proxy.on("error", (err, _req, _res) => {
            console.error("Proxy error:", err);
          });
          proxy.on("proxyReq", (proxyReq, req, _res) => {
            console.log("Proxy request:", req.method, req.url);
          });
          proxy.on("proxyRes", (proxyRes, req, _res) => {
            console.log("Proxy response:", proxyRes.statusCode, req.url);
          });
        },
      },
    },
  },
});
