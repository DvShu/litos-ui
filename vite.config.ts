import { defineConfig } from "vite";
import { readdirSync, readFileSync } from "node:fs";
import path from "path";

const entries: Record<string, string> = {};

const dir = "src/components";
const entryFiles = readdirSync(dir, {
  recursive: true,
  encoding: "utf-8",
});
const ignoreFiles = new Set([
  "calendar/langs.ts",
  "carousel/timer.ts",
  "check/check.ts",
  "check/index.ts",
  "collapse/types.ts",
  "form/types.ts",
  "form/form_inner.ts",
  "table/types.ts",
  "utils/signal_types.ts",
  "utils/style.ts",
]);
for (const rawFilename of entryFiles) {
  const filename = rawFilename.replaceAll("\\", "/");
  if (ignoreFiles.has(filename) || filename.startsWith("entries/")) {
    continue;
  }
  const filepath = path.parse(filename);
  if (filepath.ext !== ".ts" || filename.endsWith(".d.ts")) continue;
  const fileAbsName = path.join(dir, filename);
  entries[path.posix.join(filepath.dir, filepath.name)] = fileAbsName;
}

const pkg = JSON.parse(readFileSync("package.json", "utf8"));
for (const target of Object.values(pkg.exports) as Array<{ import?: string } | string>) {
  if (typeof target !== "object" || !target.import?.startsWith("./lib/entries/")) continue;
  const name = target.import.slice("./lib/".length, -".js".length);
  entries[name] = `src/components/${name}.ts`;
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
      external: [/^utilane(?:\/|$)/, /^alien-signals(?:\/|$)/, "qrcode-generator-es"],
      output: {
        preserveModules: true,
        preserveModulesRoot: "src/components",
        sanitizeFileName: (name) => name.replace(/[?<>:"|*]/g, "_"),
        entryFileNames: (chunk) => {
          const id = chunk.facadeModuleId?.replaceAll("\\", "/") ?? "";
          const root = `${path.resolve(dir).replaceAll("\\", "/")}/`;
          const globalStyles = `${path.resolve("styles").replaceAll("\\", "/")}/`;
          const name = id.startsWith(root)
            ? id.slice(root.length).replace(/\.ts$/, "")
            : id.startsWith(globalStyles)
              ? `_styles/${id.slice(globalStyles.length)}`
              : chunk.name;
          return `${name.replace(/[?<>:"|*]/g, "_")}.js`;
        },
      },
    },
    emptyOutDir: true,
    copyPublicDir: false,
  },
});