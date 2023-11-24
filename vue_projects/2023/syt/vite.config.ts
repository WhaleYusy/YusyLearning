import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  // 配置代理跨域
  server: {
    proxy: {
      "/api": {
        target: "http://139.198.34.216:8201",
        changeOrigin: true,
      },
    },
  },
});
