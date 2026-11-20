import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

// This gate requires a real browser and always rebuilds the package before packing it.
if (!process.env.FORM_TEST_BROWSER)
  throw new Error("Set FORM_TEST_BROWSER to a Chromium/Edge executable for the consumer gate.");
const workspace = fileURLToPath(new URL("../", import.meta.url));
for (const args of [
  ["node_modules/vite/bin/vite.js", "build"],
  ["node_modules/typescript/bin/tsc", "-p", "tsconfig.build.json"],
  ["--test", "tests/form-no-signals.test.mjs", "tests/entries.test.mjs"],
]) {
  execFileSync(process.execPath, args, { cwd: workspace, stdio: "inherit" });
}