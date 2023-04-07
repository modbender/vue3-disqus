import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue({ isProduction: true })],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src"),
      name: "Vue3Disqus",
      formats: ["es", "umd", "cjs", "iife"],
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        exports: "named",
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
