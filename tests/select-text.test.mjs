import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { stripTypeScriptTypes } from "node:module";
import { test } from "node:test";
import { runInNewContext } from "node:vm";

const source = stripTypeScriptTypes(
  readFileSync(new URL("../src/components/select/index.ts", import.meta.url), "utf8"),
)
  .replace(/^import .*;\r?$/gm, "")
  .replace("export default class Select", "class Select");
const escape = (text) =>
  String(text).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const element = (tag, attrs = {}, children = []) => ({
  tag,
  ...attrs,
  children,
  appendChild(child) {
    this.children.push(child);
  },
  get outerHTML() {
    return `<${tag}>${escape(this.textContent ?? "")}${this.children.map((child) => child.outerHTML).join("")}</${tag}>`;
  },
});
const Select = runInNewContext(`${source}; Select`, {
  FormInner: class {
    constructor() {
      this.root = {};
    }
  },
  document: { createDocumentFragment: () => element("fragment") },
  $$: element,
  $one: () => null,
  kebabToCamel: (name) => name.replace(/-(\w)/g, (_, letter) => letter.toUpperCase()),
});
function change(select, name, value) {
  select.attributeChange(name, null, value);
  select.updateDOM(new Set([name]));
}

test("empty-text renders defaults, literal text, empty strings and attribute removal", () => {
  const select = new Select();
  assert.equal(select._renderOption(), "<li>暂无数据</li>");
  change(select, "empty-text", "No options");
  assert.equal(select._renderOption(), "<li>No options</li>");
  change(select, "empty-text", "<img src=x onerror=alert(1)>");
  assert(select._renderOption().includes("&lt;img"));
  change(select, "empty-text", "");
  assert.equal(select._renderOption(), "<li></li>");
  change(select, "empty-text", null);
  assert.equal(select._renderOption(), "<li>暂无数据</li>");
});

test("empty-text updates an open dropdown and survives loading new options", () => {
  const select = new Select();
  select._state.expanded = true;
  let content;
  select._popover = {
    updatePopoverContent: () => {
      content = select._renderOption();
    },
  };
  change(select, "empty-text", "Nothing found");
  assert.equal(content, "<li>Nothing found</li>");
  select.setOptions([{ value: 1, label: "Apple" }]);
  assert(content.includes("Apple"));
  assert(!content.includes("Nothing found"));
  select.setOptions([]);
  assert.equal(content, "<li>Nothing found</li>");
});

test("placeholder updates plain and searchable labels, respecting selected values", () => {
  const select = new Select();
  select._searchEl = {};
  for (const [value, expected] of [
    ["Choose", "Choose"],
    ["", ""],
    [null, "请选择"],
  ]) {
    change(select, "placeholder", value);
    assert.equal(select._searchEl.placeholder, expected);
    assert.equal(select._renderSelectedLabels().children[0].textContent, expected);
  }
  select.selectedLabels = ["Apple"];
  change(select, "placeholder", "Choose");
  assert.equal(select._searchEl.placeholder, "Apple");
  assert.equal(select._searchEl.value, "Apple");
  select._state.multiple = true;
  select._state.filterable = true;
  change(select, "placeholder", "Choose");
  assert.equal(select._searchEl.placeholder, "");
});