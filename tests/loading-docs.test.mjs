import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { runInNewContext } from "node:vm";

function mountDemo(path, { missing = false, ssr = false } = {}) {
  const source = readFileSync(new URL(path, import.meta.url), "utf8")
    .match(/<script setup>([\s\S]*?)<\/script>/)[1]
    .replace(/^\s*import .*;\s*$/gm, "")
    .replaceAll("import.meta.env.SSR", String(ssr));
  const mounted = [];
  const unmounted = [];
  const ticks = [];
  const nodes = new Map();
  const initialized = [];
  let attached = true;
  runInNewContext(source, {
    onMounted: (fn) => mounted.push(fn),
    onUnmounted: (fn) => unmounted.push(fn),
    nextTick: (fn) => ticks.push(fn),
    $one(selector) {
      if (!attached || missing) return null;
      if (!nodes.has(selector)) nodes.set(selector, new Map());
      return nodes.get(selector);
    },
    on(node, event, fn) {
      assert.ok(node);
      node.set(event, fn);
    },
    off(node, event, fn) {
      assert.ok(node);
      assert.equal(node.get(event), fn);
      node.delete(event);
    },
    Loading: { init: (id) => initialized.push(id) },
  });
  mounted.forEach((fn) => fn());
  return {
    nodes,
    initialized,
    flush: () => ticks.splice(0).forEach((fn) => fn()),
    unmount() {
      attached = false;
      unmounted.forEach((fn) => fn());
    },
  };
}

for (const path of ["../docs/components/loading.md", "../docs/en/components/loading.md"]) {
  test(`${path}: removes listeners after page nodes leave the document`, () => {
    const demo = mountDemo(path);
    demo.flush();
    assert.equal(demo.nodes.size, 5);
    assert.ok([...demo.nodes.values()].every((listeners) => listeners.size === 1));
    demo.unmount();
    assert.ok([...demo.nodes.values()].every((listeners) => listeners.size === 0));
  });

  test(`${path}: tolerates missing demo nodes`, () => {
    const demo = mountDemo(path, { missing: true });
    demo.flush();
    demo.unmount();
  });

  test(`${path}: skips initialization if navigation precedes nextTick`, () => {
    const demo = mountDemo(path);
    demo.unmount();
    demo.flush();
    assert.equal(demo.nodes.size, 0);
    assert.equal(demo.initialized.length, 0);
  });

  test(`${path}: skips browser initialization during SSR`, () => {
    const demo = mountDemo(path, { ssr: true });
    demo.flush();
    demo.unmount();
    assert.equal(demo.nodes.size, 0);
    assert.equal(demo.initialized.length, 0);
  });
}