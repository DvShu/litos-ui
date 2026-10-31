import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { stripTypeScriptTypes } from "node:module";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import { adjust, isBlank } from "utilane";
import { formatStyle } from "utilane/browser";

const readSource = (path) =>
  stripTypeScriptTypes(readFileSync(new URL(path, import.meta.url), "utf8")).replace(
    /^import .*;\r?$/gm,
    "",
  );
const adjustmentCalls = [];
const { generateTagColor, parseAttrValue } = runInNewContext(
  readSource("../src/components/utils/index.ts")
    .replace(/^export \{.*;\r?$/gm, "")
    .replace(/\bexport function /g, "function ") + "; ({ generateTagColor, parseAttrValue })",
  {
    isBlank,
    adjust(...args) {
      adjustmentCalls.push(args);
      return adjust(...args);
    },
  },
);

// Only the DOM operations used by Tag are modeled; color formatting is real utilane.
class StyleStub {
  values = new Map();
  get cssText() {
    return [...this.values].map(([key, value]) => `${key}:${value};`).join("");
  }
  set cssText(value) {
    this.values.clear();
    for (const declaration of value.split(";")) {
      const colon = declaration.indexOf(":");
      if (colon < 0) continue;
      this.setProperty(declaration.slice(0, colon).trim(), declaration.slice(colon + 1).trim());
    }
  }
  setProperty(key, value) {
    this.values.set(key, value);
  }
  getPropertyValue(key) {
    return this.values.get(key) || "";
  }
  removeProperty(key) {
    const value = this.getPropertyValue(key);
    this.values.delete(key);
    return value;
  }
}
class ClassListStub extends Set {
  add(...values) {
    for (const value of values) super.add(value);
  }
  contains(value) {
    return this.has(value);
  }
  replace(previous, next) {
    if (!this.delete(previous)) return false;
    this.add(next);
    return true;
  }
}
class NodeStub {
  style = new StyleStub();
  classList = new ClassListStub();
  attrs = new Map();
  children = [];
  setAttribute(name, value) {
    const previous = this.attrs.get(name) ?? null;
    this.attrs.set(name, String(value));
    if (this.constructor.observedAttributes?.includes(name)) {
      this.attributeChangedCallback(name, previous, String(value));
    }
  }
  removeAttribute(name) {
    const previous = this.attrs.get(name) ?? null;
    this.attrs.delete(name);
    if (previous !== null && this.constructor.observedAttributes?.includes(name)) {
      this.attributeChangedCallback(name, previous, null);
    }
  }
  appendChild(node) {
    if (node.fragment) {
      for (const child of [...node.children]) this.appendChild(child);
      node.children = [];
    } else {
      node.parentNode = this;
      this.children.push(node);
    }
    return node;
  }
  remove() {
    this.parentNode.children = this.parentNode.children.filter((child) => child !== this);
    this.parentNode = undefined;
  }
}
class BaseComponent extends NodeStub {
  _state = {};
  rendered = false;
  root = new NodeStub();
  getAttr(name, fallback) {
    return parseAttrValue(this.attrs.get(name) ?? null, fallback, name);
  }
  loadStyleText() {}
  connectedCallback() {
    this.root.appendChild(this.render());
    this.rendered = true;
    this.afterInit();
  }
  disconnectedCallback() {
    this.beforeDestroy();
    this.root.children = [];
    this.rendered = false;
  }
}
let formatCalls = 0;
const Tag = runInNewContext(
  readSource("../src/components/tag/index.ts").replace("export default class Tag", "class Tag") +
    "; Tag",
  {
    BaseComponent,
    css: "",
    parseAttrValue,
    formatStyle(value) {
      formatCalls++;
      return formatStyle(value);
    },
    document: {
      createDocumentFragment() {
        return Object.assign(new NodeStub(), { fragment: true });
      },
    },
    $$(_name, attributes) {
      const node = new NodeStub();
      for (const [key, value] of Object.entries(attributes)) {
        if (key === "class") node.classList.add(...value.split(/\s+/));
        else node.setAttribute(key, value);
      }
      return node;
    },
    $one: (selector, root) => root.children.find((node) => node.classList.has(selector.slice(1))),
    on() {},
    off() {},
    shouldEventNext: () => [false],
  },
);
const plain = (value) => ({ ...value });
const closeElements = (tag) =>
  tag.root.children.filter((node) => node.classList.has("l-tag-close"));

for (const color of ["#3584c7", "#00AA7E", "rgb(53, 132, 199)"]) {
  test(`generator preserves exact input and adjusts only the background: ${color}`, () => {
    adjustmentCalls.length = 0;
    const result = generateTagColor(color);
    assert.deepEqual(plain(result), {
      "--l-tag-color": color,
      "--l-tag-border-color": color,
      "--l-tag-background": adjust(color, 5, true),
    });
    assert.deepEqual(adjustmentCalls, [[color, 5, true]]);
    assert.notEqual(result, generateTagColor(color));
  });
}

test("blank strings return fresh empty objects without color adjustment", () => {
  adjustmentCalls.length = 0;
  for (const value of ["", " ", "\t\n\r "]) {
    const first = generateTagColor(value);
    assert.deepEqual(plain(first), {});
    assert.notEqual(first, generateTagColor(value));
  }
  assert.equal(adjustmentCalls.length, 0);
});

test("pre-mount color property applies partial variables to the host using formatStyle", () => {
  const tag = new Tag();
  assert.equal(tag.color, undefined);
  tag.style.setProperty("padding", "7px");
  const snapshot = Object.freeze({ "--l-tag-color": "rebeccapurple" });
  const beforeCalls = formatCalls;
  tag.color = snapshot;
  assert.equal(tag.color, snapshot);
  assert.equal(tag.rendered, false);
  assert.equal(tag.style.getPropertyValue("--l-tag-color"), "rebeccapurple");
  assert(formatCalls > beforeCalls);
  tag.connectedCallback();
  assert.equal(tag.style.getPropertyValue("--l-tag-color"), "rebeccapurple");
  assert.equal(tag.style.getPropertyValue("padding"), "7px");
  assert.equal(tag.root.style.cssText, "");
  assert.deepEqual(snapshot, { "--l-tag-color": "rebeccapurple" });
  tag.disconnectedCallback();
});

test("post-mount replacement and both resets remove stale variables but preserve unrelated styles", () => {
  const tag = new Tag();
  tag.connectedCallback();
  tag.style.setProperty("padding", "7px");
  tag.style.setProperty("--consumer-token", "kept");
  const original = Object.freeze(generateTagColor("#3584c7"));
  tag.setColor(original);
  const replacement = Object.freeze({ "--l-tag-background": "tomato" });
  tag.color = replacement;
  assert.equal(tag.color, replacement);
  assert.equal(tag.style.getPropertyValue("--l-tag-background"), "tomato");
  assert.equal(tag.style.getPropertyValue("--l-tag-color"), "");
  assert.equal(tag.style.getPropertyValue("--l-tag-border-color"), "");
  for (const reset of [{}, undefined]) {
    tag.setColor(original);
    tag.setColor(reset);
    assert.equal(tag.color, reset);
    assert.equal(tag.style.values.size, 2);
    assert.equal(tag.style.getPropertyValue("padding"), "7px");
    assert.equal(tag.style.getPropertyValue("--consumer-token"), "kept");
  }
  tag.color = replacement;
  tag.color = undefined;
  assert.equal(tag.color, undefined);
  assert.equal(tag.style.values.size, 2);
  tag.setColor(original);
  tag.setColor();
  assert.equal(tag.color, undefined);
  assert.equal(tag.style.values.size, 2);
  assert.deepEqual(plain(original), plain(generateTagColor("#3584c7")));
  tag.disconnectedCallback();
});

test("ordinary HTML color is ignored before and after mount", () => {
  const tag = new Tag();
  assert(!Tag.observedAttributes.includes("color"));
  tag.setAttribute("color", "red");
  assert.equal(tag.color, undefined);
  tag.connectedCallback();
  assert.equal(tag.style.cssText, "");
  const snapshot = generateTagColor("#3584c7");
  tag.setColor(snapshot);
  const before = tag.style.cssText;
  adjustmentCalls.length = 0;
  tag.setAttribute("color", "blue");
  tag.removeAttribute("color");
  assert.equal(tag.color, snapshot);
  assert.equal(tag.style.cssText, before);
  assert.equal(adjustmentCalls.length, 0);
  tag.disconnectedCallback();
});

test("mount/remount retains host styles and accepts replacement or reset while detached", () => {
  const tag = new Tag();
  const snapshot = generateTagColor("#3584c7");
  tag.setColor(snapshot);
  tag.style.setProperty("--consumer-token", "kept");
  tag.connectedCallback();
  const before = tag.style.cssText;
  tag.disconnectedCallback();
  tag.connectedCallback();
  assert.equal(tag.color, snapshot);
  assert.equal(tag.style.cssText, before);
  tag.disconnectedCallback();
  const replacement = { "--l-tag-border-color": "orange" };
  tag.setColor(replacement);
  tag.connectedCallback();
  assert.equal(tag.color, replacement);
  assert.equal(tag.style.getPropertyValue("--l-tag-border-color"), "orange");
  assert.equal(tag.style.getPropertyValue("--l-tag-background"), "");
  assert.equal(tag.style.values.size, 2);
  tag.disconnectedCallback();
  tag.setColor();
  tag.connectedCallback();
  assert.equal(tag.color, undefined);
  assert.equal(tag.style.values.size, 1);
  assert.equal(tag.style.getPropertyValue("--consumer-token"), "kept");
  tag.disconnectedCallback();
});

test("dynamic type and closeable attributes still work without altering the color snapshot", () => {
  const tag = new Tag();
  tag.setAttribute("type", "success");
  tag.setAttribute("closeable", "");
  tag.connectedCallback();
  assert(tag.classList.contains("l-tag--success"));
  assert.equal(closeElements(tag).length, 1);
  const snapshot = Object.freeze(generateTagColor("#3584c7"));
  tag.color = snapshot;
  const before = tag.style.cssText;
  adjustmentCalls.length = 0;
  tag.setAttribute("type", "warning");
  assert(tag.classList.contains("l-tag--warning"));
  assert(!tag.classList.contains("l-tag--success"));
  tag.removeAttribute("type");
  assert(tag.classList.contains("l-tag--info"));
  assert(!tag.classList.contains("l-tag--warning"));
  tag.setAttribute("closeable", "false");
  assert.equal(closeElements(tag).length, 0);
  tag.setAttribute("closeable", "true");
  assert.equal(closeElements(tag).length, 1);
  tag.setAttribute("closeable", "");
  assert.equal(closeElements(tag).length, 1);
  tag.removeAttribute("closeable");
  assert.equal(closeElements(tag).length, 0);
  assert.equal(tag.color, snapshot);
  assert.equal(tag.style.cssText, before);
  assert.equal(adjustmentCalls.length, 0);
  tag.disconnectedCallback();
});