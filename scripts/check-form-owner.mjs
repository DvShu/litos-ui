import { createServer } from "node:http";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { stripTypeScriptTypes } from "node:module";

const suites = {
  autocomplete: {
    fixture: "tests/form-autocomplete.fixture.html",
    entry: "tests/form-autocomplete.browser.mjs",
  },
  owner: { fixture: "tests/form-owner.fixture.html" },
  lifecycle: { fixture: "tests/form-lifecycle.fixture.html" },
  inner: { fixture: "tests/form-inner.fixture.html", entry: "tests/form-inner.browser.mjs" },
  complete: {
    fixture: "tests/form-complete.fixture.html",
    entry: "tests/form-complete.browser.mjs",
  },
  native: { fixture: "tests/form-native.fixture.html", entry: "tests/form-native.browser.mjs" },
  input: {
    fixture: "tests/input-complete.fixture.html",
    entry: "tests/input-complete.browser.mjs",
  },
  defaults: {
    fixture: "tests/form-defaults.fixture.html",
    entry: "tests/form-defaults.browser.mjs",
  },
};
const testCase = process.env.FORM_TEST_CASE ?? "owner";
if (!Object.hasOwn(suites, testCase)) {
  throw new Error(
    `Unknown FORM_TEST_CASE ${JSON.stringify(testCase)}. Choose from ${Object.keys(suites).join(", ")}.`,
  );
}
const { fixture, entry } = suites[testCase];
const pagePath = testCase === "owner" ? "/" : `/${testCase}`;

const executable = process.env.FORM_TEST_BROWSER;
if (!executable)
  throw new Error(
    "Set FORM_TEST_BROWSER to a Chromium/Edge executable; this is not an iOS compatibility test.",
  );
let inputBundle;
if (entry) {
  const { build } = await import("vite");
  const result = await build({
    configFile: false,
    logLevel: "error",
    build: {
      write: false,
      minify: false,
      target: "es2022",
      lib: {
        entry,
        formats: ["es"],
      },
    },
  });
  inputBundle = (Array.isArray(result) ? result[0] : result).output.find(
    (item) => item.type === "chunk" && item.isEntry,
  )?.code;
  if (!inputBundle) throw new Error(`Missing browser bundle for ${testCase}`);
}
const routes = new Map([
  [pagePath, [fixture, "text/html"]],
  ["/scripts/form-platform.mjs", ["scripts/form-platform.mjs", "text/javascript"]],
  ["/owner.js", ["src/components/form/owner.ts", "text/javascript"]],
  ["/context.js", ["src/components/form/context.ts", "text/javascript"]],
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
    res.end(route[0].endsWith(".ts") ? stripTypeScriptTypes(source) : source);
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
      `http://127.0.0.1:${server.address().port}${pagePath}`,
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
  await writeFile(
    `.artifacts/form-${testCase}-result.json`,
    JSON.stringify(result, null, 2) + "\n",
  );
  console.log(JSON.stringify(result, null, 2));
  if (!result.pass) process.exitCode = 1;
} finally {
  await new Promise((resolve) => server.close(resolve));
  // profile is created by this runner under the known OS temporary directory.
  if (path.dirname(profile) === tmpdir() && path.basename(profile).startsWith("litos-form-gate-"))
    rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
}