import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { stripTypeScriptTypes } from "node:module";
import { runInNewContext } from "node:vm";
import { test } from "node:test";

class NodeStub {
  children = [];
  listeners = new Map();
  constructor(tag, attrs = {}) {
    this.tag = tag;
    Object.assign(this, attrs);
  }
  appendChild(node) {
    this.children.push(node);
    node.parent = this;
  }
  remove() {
    this.parent.children.splice(this.parent.children.indexOf(this), 1);
  }
}
const find = (selector, root) =>
  root.children.find((node) =>
    selector === ".l-input__inner" ? node.tag === "input" : node.class?.includes("l-clearable"),
  );
class FormInner {
  root = new NodeStub("root");
  style = {};
  classList = { add() {}, remove() {} };
  attrs = new Map();
  _value = "";
  disabled = false;
  getValue() {
    return this._value;
  }
  setValue(value) {
    this._value = value;
  }
  isDisabled() {
    return this.disabled;
  }
  getName() {
    return "";
  }
  getAttr(_name, fallback) {
    return fallback;
  }
  setAttribute(name, value) {
    this.attrs.set(name, value);
    this.attributeChange(name, null, value);
    this.updateDOM(new Set([name]));
  }
  removeAttribute(name) {
    this.attrs.delete(name);
    this.attributeChange(name, null, null);
    this.updateDOM(new Set([name]));
  }
  dispatchEvent() {}
}
const source = stripTypeScriptTypes(
  readFileSync(new URL("../src/components/input/index.ts", import.meta.url), "utf8"),
).replace(/^import .*;\r?$/gm, "");
const sheet = {};
const Input = runInNewContext(
  source.replace("export default class Input", "class Input") + "; Input",
  {
    FormInner,
    inputSheet: sheet,
    document: { createDocumentFragment: () => new NodeStub("fragment") },
    $$: (tag, attrs) => new NodeStub(tag, attrs),
    $: () => [],
    $one: find,
    on: (node, name, fn) => node.listeners.set(name, fn),
    off: (node, name) => node?.listeners.delete(name),
    addClass() {},
    removeClass() {},
    formatStyle: () => "",
    parseAttrValue: (value, fallback, key) =>
      value == null ? fallback : ["", "true", "1", "on", key].includes(value),
  },
);
function mount(input) {
  input.root = input.render();
  input.afterInit();
}

test("readonly initializes native input and reflects dynamic attribute/property changes", () => {
  const input = new Input();
  input.setAttribute("readonly", "");
  mount(input);
  assert.equal(input.$inner.readOnly, true);
  for (const value of ["false", "true", "readonly", "0"]) {
    input.setAttribute("readonly", value);
    assert.equal(input.$inner.readOnly, ["true", "readonly"].includes(value));
  }
  input.readOnly = true;
  assert.equal(input.attrs.has("readonly"), true);
  assert.equal(input.$inner.readOnly, true);
  input.readOnly = false;
  assert.equal(input.attrs.has("readonly"), false);
  assert.equal(input.$inner.readOnly, false);
  input.readOnly = true;
  input.value = "programmatic update";
  assert.equal(input.$inner.value, "programmatic update");
  input.beforeDestroy();
  assert.equal(input.$inner.listeners.size, 0);
});

test("readonly suppresses clear controls, stale clicks and restores clearability when editable", () => {
  const input = new Input();
  mount(input);
  input.value = "text";
  input.setAttribute("clearable", "");
  const clear = find(".l-clearable", input.root);
  assert(clear);
  const click = clear.listeners.get("click");
  input.readOnly = true;
  assert.equal(find(".l-clearable", input.root), undefined);
  click();
  assert.equal(input.value, "text");
  input.readOnly = false;
  assert(find(".l-clearable", input.root));
  input.disabled = true;
  input.disabledChange();
  assert.equal(find(".l-clearable", input.root), undefined);
  input.beforeDestroy();
});

test("instances reuse the same stylesheet and remount preserves readonly", () => {
  const first = new Input(),
    second = new Input();
  assert.equal(first.render_v2().styleSheets[0], sheet);
  assert.equal(second.render_v2().styleSheets[0], sheet);
  assert.equal(first.render_v2().style, undefined);
  first.readOnly = true;
  mount(first);
  first.beforeDestroy();
  mount(first);
  assert.equal(first.$inner.readOnly, true);
  first.beforeDestroy();
});