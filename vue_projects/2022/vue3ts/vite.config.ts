import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    vue({
      reactivityTransform: true, // 开启对 defineProps() 的响应性解构
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    https: false,
    port: 3000,
    host: "0.0.0.0",
    open: true,
    cors: true,
    proxy: {},
  },
  build: {
    target: "es2015",
    sourcemap: false,
    chunkSizeWarningLimit: 2000,
    reportCompressedSize: false,
  },
});
