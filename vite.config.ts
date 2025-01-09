import { defineConfig } from "vite";
import { readdirSync } from "node:fs";
import path from "path";

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

export default defineConfig({});
