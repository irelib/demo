import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import legacy from "@vitejs/plugin-legacy";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    vue(),
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@com": resolve(__dirname, "src/components"),
    },
  },
  base: "./",
  server: {
    port: 1085,
  },
});
