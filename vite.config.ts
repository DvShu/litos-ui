import { defineConfig } from "vite";
import { readdirSync } from "node:fs";
import path from "path";

const entries = {};

const dir = "src/components";
const entryFiles = readdirSync(dir, {
  recursive: true,
  encoding: "utf-8",
});
for (const filename of entryFiles) {
  console.log(filename);
  const filepath = path.parse(filename);
  if (filepath.ext === "" || filepath.ext === ".css") continue;
  const fileAbsName = path.join(dir, filename);
  entries[path.join(filepath.dir, filepath.name)] = fileAbsName;
}

export default defineConfig({
  build: {
    outDir: "lib",
    cssCodeSplit: true,
    lib: {
      entry: entries,
      name: "LitosUI",
      formats: ["es"],
    },
    rollupOptions: {
      // 确保外部化处理那些
      // 你不想打包进库的依赖
      external: [/ph-utils\/*/],
    },
    emptyOutDir: true,
    copyPublicDir: false,
  },
});
