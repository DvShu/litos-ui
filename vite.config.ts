import { defineConfig } from "vite";
import { readdirSync } from "node:fs";
import path from "path";

const entries: Record<string, string> = {};

const dir = "src/components";
const entryFiles = readdirSync(dir, {
  recursive: true,
  encoding: "utf-8",
});
const ignoreFiles = [
  "calendar\\langs.ts",
  "carousel\\timer.ts",
  "check\\check.ts",
  "check\\index.ts",
  "collapse\\types.ts",
  "form\\types.ts",
  "form\\form_inner.ts",
  "table\\types.ts",
];
for (const filename of entryFiles) {
  if (ignoreFiles.includes(filename)) {
    continue;
  }
  if (filename === "browser.ts") continue;
  const filepath = path.parse(filename);
  if (filepath.ext === "" || filepath.ext === ".css" || filepath.ext === ".less") continue;
  const fileAbsName = path.join(dir, filename);
  entries[path.join(filepath.dir, filepath.name)] = fileAbsName;
}

export default defineConfig({
  plugins: [],
  build: {
    target: "esnext",
    outDir: "lib",
    lib: {
      entry: entries,
      name: "LitosUI",
      formats: ["es"],
    },
    rolldownOptions: {
      // 确保外部化处理那些
      // 你不想打包进库的依赖
      external: [/ph-utils\/*/, "qrcode-generator-es"],
    },
    emptyOutDir: true,
    copyPublicDir: false,
  },
});