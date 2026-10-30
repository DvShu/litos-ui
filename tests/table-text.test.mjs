import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { stripTypeScriptTypes } from "node:module";
import { test } from "node:test";
import { runInNewContext } from "node:vm";

class NodeStub {
  constructor(tag, attrs = {}) {
    this.tag = tag;
    this.children = [];
    this.style = {};
    Object.assign(this, attrs);
  }
  appendChild(child) {
    this.children.push(child);
    child.parent = this;
  }
  replaceWith(node) {
    const index = this.parent.children.indexOf(this);
    this.parent.children[index] = node;
    node.parent = this.parent;
  }
  get outerHTML() {
    const text = String(this.textContent ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
    return `<${this.tag}>${text}${this.children.map((child) => child.outerHTML).join("")}</${this.tag}>`;
  }
}
const find = (selector, root) =>
  root.children
    .map((node) =>
      (selector.startsWith(".") ? node.class === selector.slice(1) : node.tag === selector)
        ? node
        : find(selector, node),
    )
    .find(Boolean);
const source = stripTypeScriptTypes(
  readFileSync(new URL("../src/components/table/index.ts", import.meta.url), "utf8"),
)
  .replace(/^import .*;\r?$/gm, "")
  .replace("export default class Table", "class Table");
const Table = runInNewContext(`${source}; Table`, {
  BaseComponent: class {
    constructor() {
      this.root = new NodeStub("root");
    }
  },
  $$: (tag, attrs) => new NodeStub(tag, attrs),
  $one: find,
  kebabToCamel: (name) => name.replace(/-(\w)/g, (_, letter) => letter.toUpperCase()),
  formatStyle: () => "",
});
function change(table, value) {
  table.attributeChanged("empty-text", null, value);
  if (table.rendered) table.updateDOM(new Set(["empty-text"]));
}

test("empty-text supports initialization, empty strings and removal defaults", () => {
  const table = new Table();
  assert.equal(find(".l-table__empty-col", table._bodyRender()).textContent, "暂无数据");
  for (const [value, expected] of [
    ["No data", "No data"],
    ["", ""],
    [null, "暂无数据"],
  ]) {
    change(table, value);
    assert.equal(find(".l-table__empty-col", table._bodyRender()).textContent, expected);
  }
  change(table, "<img src=x onerror=alert(1)>");
  assert(table._bodyRender().outerHTML.includes("&lt;img"));
});

test("dynamic text updates the existing empty cell without replacing the body", () => {
  const table = new Table();
  const body = table._bodyRender();
  const cell = find(".l-table__empty-col", body);
  table.root.appendChild(body);
  table.rendered = true;
  change(table, "Nothing found");
  assert.equal(find("tbody", table.root), body);
  assert.equal(find(".l-table__empty-col", table.root), cell);
  assert.equal(cell.textContent, "Nothing found");
  change(table, "");
  assert.equal(cell.textContent, "");
  change(table, null);
  assert.equal(cell.textContent, "暂无数据");
});

test("data rows are preserved and later empty data uses the latest text", () => {
  const table = new Table();
  table.columns = [{ key: "name" }];
  table.root.appendChild(table._bodyRender());
  table.rendered = true;
  table.setData([{ name: "Apple" }]);
  const body = find("tbody", table.root);
  change(table, "No rows");
  assert.equal(find("tbody", table.root), body);
  assert(body.outerHTML.includes("Apple"));
  table.setData([]);
  assert.equal(find(".l-table__empty-col", table.root).textContent, "No rows");
});