import { createServer } from "node:http";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { stripTypeScriptTypes } from "node:module";

const executable = process.env.FORM_TEST_BROWSER;
if (!executable)
  throw new Error(
    "Set FORM_TEST_BROWSER to a Chromium/Edge executable; this is not an iOS compatibility test.",
  );
const testCase = process.env.FORM_TEST_CASE;
let inputBundle;
if (["inner", "complete", "native", "input", "defaults"].includes(testCase)) {
  const { build } = await import("vite");
  const result = await build({
    configFile: false,
    logLevel: "error",
    build: {
      write: false,
      minify: false,
      target: "es2022",
      lib: {
        entry:
          testCase === "defaults"
            ? "tests/form-defaults.browser.mjs"
            : testCase === "input"
              ? "tests/input-complete.browser.mjs"
              : testCase === "native"
                ? "tests/form-native.browser.mjs"
                : testCase === "complete"
                  ? "tests/form-complete.browser.mjs"
                  : "tests/form-inner.browser.mjs",
        formats: ["es"],
      },
    },
  });
  inputBundle = (Array.isArray(result) ? result[0] : result).output.find(
    (item) => item.type === "chunk" && item.isEntry,
  )?.code;
  if (!inputBundle) throw new Error("Missing Input browser bundle");
}
const routes = new Map([
  ["/", ["tests/form-owner.fixture.html", "text/html"]],
  ["/scripts/form-platform.mjs", ["scripts/form-platform.mjs", "text/javascript"]],
  ["/owner.js", ["src/components/form/owner.ts", "text/javascript"]],
  ["/context.js", ["src/components/form/context.ts", "text/javascript"]],
  ["/lifecycle", ["tests/form-lifecycle.fixture.html", "text/html"]],
  ["/inner", ["tests/form-inner.fixture.html", "text/html"]],
  ["/defaults", ["tests/form-defaults.fixture.html", "text/html"]],
  ["/input", ["tests/input-complete.fixture.html", "text/html"]],
  ["/native", ["tests/form-native.fixture.html", "text/html"]],
  ["/complete", ["tests/form-complete.fixture.html", "text/html"]],
]);
const server = createServer(async (req, res) => {
  if (req.url === "/form-inner.js" && inputBundle) {
    res.setHeader("Content-Type", "text/javascript; charset=utf-8");
    res.end(inputBundle);
    return;
  }
  const route = routes.get(req.url);
  if (!route) {
    res.writeHead(404).end();
    return;
  }
  try {
    res.setHeader("Content-Type", `${route[1]}; charset=utf-8`);
    const source = await readFile(route[0], "utf8");
    res.end(
      route[0].endsWith(".ts") ? stripTypeScriptTypes(source, { mode: "transform" }) : source,
    );
  } catch {
    res.writeHead(500).end();
  }
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const profile = mkdtempSync(path.join(tmpdir(), "litos-form-gate-"));
try {
  const child = spawn(
    executable,
    [
      "--headless",
      "--disable-gpu",
      "--no-first-run",
      `--user-data-dir=${profile}`,
      "--dump-dom",
      "--virtual-time-budget=3000",
      "--timeout=15000",
      `http://127.0.0.1:${server.address().port}${testCase === "defaults" ? "/defaults" : testCase === "input" ? "/input" : testCase === "native" ? "/native" : testCase === "complete" ? "/complete" : testCase === "inner" ? "/inner" : testCase === "lifecycle" ? "/lifecycle" : "/"}`,
    ],
    { stdio: ["ignore", "pipe", "pipe"] },
  );
  let stdout = "",
    stderr = "";
  child.stdout.on("data", (data) => {
    stdout += data;
  });
  child.stderr.on("data", (data) => {
    stderr += data;
  });
  const timer = setTimeout(() => child.kill(), 30000);
  const code = await new Promise((resolve, reject) => {
    child.on("error", reject);
    child.on("close", resolve);
  }).finally(() => clearTimeout(timer));
  if (code !== 0) throw new Error(`Browser exit ${code}: ${stderr}`);
  const match = stdout.match(/<pre id="result">([\s\S]*?)<\/pre>/);
  if (!match) throw new Error(`Missing browser result: ${stdout}`);
  const result = JSON.parse(
    match[1]
      .replaceAll("&quot;", '"')
      .replaceAll("&lt;", "<")
      .replaceAll("&gt;", ">")
      .replaceAll("&amp;", "&"),
  );
  await mkdir(".artifacts", { recursive: true });
  const resultName = ["inner", "complete", "lifecycle", "native", "input"].includes(testCase)
    ? `form-${testCase}-result`
    : "form-owner-result";
  await writeFile(`.artifacts/${resultName}.json`, JSON.stringify(result, null, 2) + "\n");
  console.log(JSON.stringify(result, null, 2));
  if (!result.pass) process.exitCode = 1;
} finally {
  await new Promise((resolve) => server.close(resolve));
  // profile is created by this runner under the known OS temporary directory.
  if (path.dirname(profile) === tmpdir() && path.basename(profile).startsWith("litos-form-gate-"))
    rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
}