import assert from "node:assert/strict";
import { getEventListeners } from "node:events";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { runInNewContext } from "node:vm";

const flush = () => new Promise((resolve) => setImmediate(resolve));
function previewNode() {
  return {
    aborts: 0,
    abort() {
      this.aborts++;
    },
  };
}

function pageHarness(path, ready = Promise.resolve()) {
  const markdown = readFileSync(path, "utf8");
  const script = markdown
    .match(/<script setup>([\s\S]*?)<\/script>/)[1]
    .replace(/^\s*import .*;\r?$/gm, "")
    .replaceAll("import.meta.env.SSR", "false");
  let mount, unmount, current;
  const observers = [],
    intervals = new Map(),
    fetchCalls = [];
  const api = {
    markdown,
    observers,
    intervals,
    fetchCalls,
    result: {
      ok: true,
      status: 200,
      text: async () => '{"url":"http://127.0.0.1:3001/files/test.png"}',
    },
    fetchError: undefined,
    setNode(node) {
      current = node;
    },
    change() {
      observers.filter((observer) => observer.active).forEach((observer) => observer.callback());
    },
    mount: () => mount(),
    unmount: () => unmount(),
  };
  runInNewContext(script, {
    onMounted(fn) {
      mount = fn;
    },
    onUnmounted(fn) {
      unmount = fn;
    },
    nextTick: () => Promise.resolve(),
    customElements: { whenDefined: () => ready },
    document: { body: {}, getElementById: () => current },
    MutationObserver: class {
      constructor(callback) {
        this.callback = callback;
        observers.push(this);
      }
      observe() {
        this.active = true;
      }
      disconnect() {
        this.active = false;
      }
    },
    elem: () => [],
    iterate: (items, fn) => items.forEach(fn),
    on() {},
    off() {},
    setInterval(callback) {
      const id = Symbol();
      intervals.set(id, callback);
      return id;
    },
    clearInterval(id) {
      intervals.delete(id);
    },
    async fetch(url, options) {
      fetchCalls.push({ url, options });
      await api.fetchReady;
      options.signal.throwIfAborted();
      if (api.fetchError) throw api.fetchError;
      return api.result;
    },
  });
  return api;
}

for (const path of ["docs/components/upload.md", "docs/en/components/upload.md"]) {
  test(`${path}: binds a late preview and rebinds after it is rebuilt`, async () => {
    const page = pageHarness(path);
    await page.mount();
    const first = previewNode();
    page.setNode(first);
    page.change();
    assert.equal(typeof first.customRequest, "function");
    const second = previewNode();
    page.setNode(second);
    page.change();
    assert.equal(first.aborts, 1);
    assert.equal(first.customRequest, undefined);
    assert.equal(typeof second.customRequest, "function");
    page.unmount();
    assert.equal(second.aborts, 1);
    assert.equal(second.customRequest, undefined);
    assert.ok(page.observers.every((observer) => !observer.active));
    const third = previewNode();
    page.setNode(third);
    page.observers[0].callback(); // 已排队的 observer 回调也不能在卸载后重新绑定。
    assert.equal(third.customRequest, undefined);
  });

  test(`${path}: unmount before registration does not attach observers or handlers`, async () => {
    let registered;
    const page = pageHarness(
      path,
      new Promise((resolve) => {
        registered = resolve;
      }),
    );
    const node = previewNode();
    page.setNode(node);
    const mounted = page.mount();
    page.unmount();
    registered();
    await mounted;
    assert.equal(page.observers.length, 0);
    assert.equal(node.customRequest, undefined);
  });

  for (const scenario of ["success", "http-error", "network-error", "invalid-json", "abort"]) {
    test(`${path}: starts ${scenario} without artificial delay and cleans progress timers`, async () => {
      const page = pageHarness(path);
      const node = previewNode();
      page.setNode(node);
      await page.mount();
      const runtime = page.markdown
        .match(/^  async function demoCustomRequest\([\s\S]*?(?=^  function \w+\()/m)[0]
        .split("\n")
        .map((line) => (line.startsWith("  ") ? line.slice(2) : line))
        .join("\n")
        .trim();
      const section = page.markdown.slice(
        page.markdown.indexOf("### 自定义上传"),
        page.markdown.indexOf("### 外部管理 fileList"),
      );
      assert.equal(
        runtime,
        section
          .match(/<textarea lang="js">([\s\S]*?)<\/textarea>/)[1]
          .split("//-")[0]
          .trim(),
      );
      const controller = new AbortController(),
        progress = [];
      if (scenario === "http-error")
        page.result = { ok: false, status: 500, text: async () => "{}" };
      if (scenario === "network-error") page.fetchError = new Error("network");
      if (scenario === "invalid-json")
        page.result = { ok: true, status: 200, text: async () => "invalid" };
      let finishRequest;
      page.fetchReady = new Promise((resolve) => {
        finishRequest = resolve;
      });
      const pending = node.customRequest({
        body: {},
        headers: {},
        signal: controller.signal,
        onProgress: (p) => progress.push(p),
      });
      await flush();
      assert.equal(page.fetchCalls.length, 1);
      for (let i = 0; i < 20; i++) for (const callback of page.intervals.values()) callback();
      assert.equal(progress.at(-1), 90);
      if (scenario === "abort") controller.abort();
      finishRequest();
      if (["abort", "network-error", "invalid-json"].includes(scenario))
        await assert.rejects(pending);
      else await pending;
      assert.equal(progress.includes(100), scenario === "success");
      assert.equal(page.fetchCalls.length, 1);
      assert.equal(page.intervals.size, 0);
      assert.equal(getEventListeners(controller.signal, "abort").length, 0);
      page.unmount();
    });
  }
}