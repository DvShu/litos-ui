import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "lib",
    lib: {
      entry: "src/components/browser.ts",
      name: "LitosUI",
      formats: ["es"],
      fileName: "litos-ui",
    },
    emptyOutDir: false,
    copyPublicDir: false,
  },
});
