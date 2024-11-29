import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "lib",
    lib: {
      entry: "src/components/browser.ts",
      name: "LitosUI",
      formats: ["iife"],
      fileName: () => "litos-ui.min.js",
    },
    cssMinify: "lightningcss",
    emptyOutDir: false,
    copyPublicDir: false,
  },
});
