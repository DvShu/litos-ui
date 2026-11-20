import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { setTimeout as delay } from "node:timers/promises";

// Use wall-clock time: dump-dom's virtual time can stall real View Transitions.
export async function runBrowserFixture(code, executable, options = {}) {
  const server = createServer((req, res) => {
    const pathname = new URL(req.url, "http://localhost").pathname;
    if (req.url === "/fixture.js") {
      res.setHeader("Content-Type", "text/javascript; charset=utf-8");
      res.end(code);
    } else if (options.pages && Object.hasOwn(options.pages, pathname)) {
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.end(options.pages[pathname]);
    } else if (req.url === "/" && !options.pages) {
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.end(
        '<!doctype html><meta charset="utf-8"><pre id="result">pending</pre><script type="module" src="/fixture.js"></script>',
      );
    } else res.writeHead(404).end();
  });
  const profile = await mkdtemp(path.join(tmpdir(), "litos-consumer-browser-"));
  let child, socket;
  const pending = new Map();
  try {
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
    child = spawn(executable, [
      "--headless",
      "--disable-gpu",
      "--no-first-run",
      ...(options.browserArgs ?? []),
      `--user-data-dir=${profile}`,
      "--remote-debugging-port=0",
      "about:blank",
    ]);
    let stderr = "",
      launchError;
    child.stdout.resume();
    child.stderr.on("data", (chunk) => (stderr += chunk));
    child.on("error", (error) => (launchError = error));
    let port;
    for (let attempt = 0; attempt < 100; attempt++) {
      if (launchError) throw launchError;
      if (child.exitCode !== null) throw new Error(`Browser exited: ${stderr}`);
      try {
        port = (await readFile(path.join(profile, "DevToolsActivePort"), "utf8")).split("\n")[0];
        break;
      } catch {}
      await delay(100);
    }
    assert.ok(port, `Browser did not start: ${stderr}`);
    const pages = await (
      await fetch(`http://127.0.0.1:${port}/json/list`, { signal: AbortSignal.timeout(5000) })
    ).json();
    socket = new WebSocket(pages.find((page) => page.type === "page").webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error("Browser connection timed out")), 5000);
      socket.onopen = () => {
        clearTimeout(timer);
        resolve();
      };
      socket.onerror = (error) => {
        clearTimeout(timer);
        reject(error);
      };
    });
    const errors = [];
    let seq = 0;
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.method === "Runtime.exceptionThrown")
        errors.push(message.params.exceptionDetails);
      if (message.method === "Runtime.consoleAPICalled" && message.params.type === "error")
        errors.push(message.params.args);
      const request = pending.get(message.id);
      if (!request) return;
      clearTimeout(request.timer);
      pending.delete(message.id);
      if (message.error) request.reject(new Error(JSON.stringify(message.error)));
      else request.resolve(message.result);
    };
    const call = (method, params = {}) =>
      new Promise((resolve, reject) => {
        const id = ++seq;
        const timer = setTimeout(() => {
          pending.delete(id);
          reject(new Error(`${method} timed out`));
        }, 5000);
        pending.set(id, { resolve, reject, timer });
        socket.send(JSON.stringify({ id, method, params }));
      });
    await call("Runtime.enable");
    const version = await call("Browser.getVersion");
    if (options.run) {
      const result = await options.run({
        call,
        origin: `http://127.0.0.1:${server.address().port}`,
      });
      return { ...result, version, consoleErrors: errors };
    }
    await call("Page.navigate", { url: `http://127.0.0.1:${server.address().port}/` });
    for (let attempt = 0; attempt < 300; attempt++) {
      const value = await call("Runtime.evaluate", {
        expression: 'document.querySelector("#result")?.textContent',
        returnByValue: true,
      });
      const content = value.result?.value;
      if (content && content !== "pending")
        return { ...JSON.parse(content), version, consoleErrors: errors };
      await delay(100);
    }
    throw new Error(`Browser fixture timed out: ${JSON.stringify(errors)}`);
  } finally {
    for (const request of pending.values()) clearTimeout(request.timer);
    socket?.close();
    if (child && child.exitCode === null && child.signalCode === null && child.pid) {
      const closed = new Promise((resolve) => child.once("close", resolve));
      child.kill();
      await closed;
    }
    await new Promise((resolve) => server.close(resolve));
    // Delete only the profile this invocation created under the OS temp directory.
    assert.equal(path.dirname(profile), path.resolve(tmpdir()));
    assert.ok(path.basename(profile).startsWith("litos-consumer-browser-"));
    await rm(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
  }
}