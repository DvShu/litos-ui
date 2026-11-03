import assert from "node:assert/strict";
import { test } from "node:test";
import { createServer } from "node:http";
import { spawn } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { build } from "vite";

test(
  "FormItem context, error precedence, rules and lifecycle in Chromium",
  { timeout: 60000 },
  async () => {
    const executable = process.env.FORM_TEST_BROWSER;
    assert.ok(executable, "Set FORM_TEST_BROWSER to a Chromium/Edge executable");
    const output = await build({
      configFile: false,
      logLevel: "error",
      build: {
        write: false,
        minify: false,
        target: "es2022",
        lib: { entry: "tests/form-item.browser.mjs", formats: ["es"] },
      },
    });
    const bundle = (Array.isArray(output) ? output[0] : output).output.find(
      (entry) => entry.type === "chunk" && entry.isEntry,
    ).code;
    const server = createServer((request, response) => {
      if (request.url === "/test.js") {
        response.setHeader("Content-Type", "text/javascript");
        response.end(bundle);
      } else {
        response.setHeader("Content-Type", "text/html");
        response.end(
          '<!doctype html><meta charset="utf-8"><pre id="result">pending</pre><script type="module" src="/test.js"></script>',
        );
      }
    });
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
    const profile = await mkdtemp(path.join(tmpdir(), "litos-form-item-"));
    try {
      const child = spawn(
        executable,
        [
          "--headless",
          "--disable-gpu",
          "--no-first-run",
          `--user-data-dir=${profile}`,
          "--dump-dom",
          "--virtual-time-budget=5000",
          `http://127.0.0.1:${server.address().port}`,
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
      assert.equal(code, 0, stderr);
      const match = stdout.match(/<pre id="result">([\s\S]*?)<\/pre>/);
      assert.ok(match, stdout);
      const result = JSON.parse(
        match[1]
          .replaceAll("&quot;", '"')
          .replaceAll("&lt;", "<")
          .replaceAll("&gt;", ">")
          .replaceAll("&amp;", "&"),
      );
      assert.equal(result.pass, true, JSON.stringify(result, null, 2));
      console.log(`FormItem browser checks: ${result.checks.length}`);
    } finally {
      await new Promise((resolve) => server.close(resolve));
      // The resolved target is the exact temporary profile created above, never repository content.
      assert.equal(path.dirname(profile), tmpdir());
      assert.ok(path.basename(profile).startsWith("litos-form-item-"));
      await rm(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
    }
  },
);