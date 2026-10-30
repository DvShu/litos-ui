import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { stripTypeScriptTypes } from "node:module";
import { test } from "node:test";
import { runInNewContext } from "node:vm";

const source = stripTypeScriptTypes(
  readFileSync(new URL("../src/components/pagination/index.ts", import.meta.url), "utf8"),
)
  .replace(/^import .*;\r?$/gm, "")
  .replace("export default class Pagination", "class Pagination");
function setup() {
  const listeners = new Map();
  const inputAttrs = {};
  const input = {
    setParser() {},
    shadowRoot: {
      querySelector: () => ({ setAttribute: (key, value) => (inputAttrs[key] = value) }),
    },
  };
  const Pagination = runInNewContext(`${source}; Pagination`, {
    BaseComponent: class {
      constructor() {
        this.root = {};
      }
      emit(name, options) {
        this.event = { name, ...options };
      }
    },
    tagAttr: (key, value) =>
      value === true ? ` ${key}` : typeof value === "string" ? ` ${key}="${value}"` : "",
    clsx: (items) => items.filter(Boolean).join(" "),
    $one: (selector) => (selector === ".l-pagination-simple-input" ? input : null),
    on: (_el, name, fn) => listeners.set(name, fn),
    off: (_el, name) => listeners.delete(name),
    shouldEventNext: (event) => [true, event.page],
  });
  const pagination = new Pagination();
  pagination._state.pageCount = 20;
  return { pagination, listeners, inputAttrs };
}

test("navigation and page controls expose English labels and current-page state", () => {
  const { pagination } = setup();
  pagination._state.currentPage = 10;
  const html = pagination.render();
  for (const label of [
    "Pagination",
    "Previous page",
    "Next page",
    "Previous 5 pages",
    "Next 5 pages",
    "Page 1",
    "Page 10",
    "Page 20",
  ])
    assert(html.includes(`aria-label="${label}"`), label);
  assert(html.includes('title="Previous page"'));
  assert(html.includes('title="Next page"'));
  assert.equal((html.match(/aria-current="page"/g) || []).length, 1);
  assert(!html.includes("<a"));
  assert.equal((html.match(/<button/g) || []).length, (html.match(/type="button"/g) || []).length);
  assert(!/\p{Script=Han}/u.test(html));
});

test("boundary states and navigation targets are preserved", () => {
  const { pagination, listeners } = setup();
  assert(/title="Previous page"[^>]*disabled/.test(pagination.render()));
  pagination._state.currentPage = 20;
  assert(/title="Next page"[^>]*disabled/.test(pagination.render()));
  pagination.afterInit();
  listeners.get("click")({ page: "19" });
  assert.equal(pagination._state.currentPage, 19);
  assert.equal(pagination.event.detail.current, 19);
  assert(pagination.render().includes('data-page="18"'));
});

test("simple input receives an English label on the native input and cleans up listeners", () => {
  const { pagination, listeners, inputAttrs } = setup();
  pagination._state.simple = true;
  assert(pagination.render().includes('title="Page number"'));
  pagination.afterInit();
  assert.equal(inputAttrs["aria-label"], "Page number");
  pagination.beforeDestroy();
  assert.equal(listeners.size, 0);
});