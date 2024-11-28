import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "lib",
    lib: {
      entry: "src/components/browser.ts",
      name: "LitosUI",
      formats: ["iife"],
      fileName: "litos-ui",
    },
    minify: false,
    emptyOutDir: false,
    copyPublicDir: false,
  },
});
