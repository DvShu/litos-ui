import { defineConfig } from "vite";
import { readdirSync } from "node:fs";
import path from "path";
import dts from "vite-plugin-dts";

const entries: Record<string, string> = {};

const dir = "src/components";
const entryFiles = readdirSync(dir, {
  recursive: true,
  encoding: "utf-8",
});
for (const filename of entryFiles) {
  if (filename === "browser.ts") continue;
  const filepath = path.parse(filename);
  if (filepath.ext === "" || filepath.ext === ".css") continue;
  const fileAbsName = path.join(dir, filename);
  entries[path.join(filepath.dir, filepath.name)] = fileAbsName;
}

<<<<<<< HEAD
export default defineConfig({
  plugins: [
    dts({
      tsconfigPath: "tsconfig.build.json",
    }),
  ],
  build: {
    target: "esnext",
    outDir: "lib",
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
=======
export default defineConfig({});
>>>>>>> 4c4a6c8 (fix: 修复tree shaking)
