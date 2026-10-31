import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { stripTypeScriptTypes } from "node:module";
import { runInNewContext } from "node:vm";
import { test } from "node:test";
import { adjust } from "utilane";
import { formatStyle } from "utilane/browser";

const readSource = (path) =>
  stripTypeScriptTypes(readFileSync(new URL(path, import.meta.url), "utf8")).replace(
    /^import .*;\r?$/gm,
    "",
  );
const adjustmentCalls = [];
const generateButtonColor = runInNewContext(
  readSource("../src/components/utils/index.ts")
    .replace(/^export \{.*;\r?$/gm, "")
    .replace(/\bexport function /g, "function ") + "; generateButtonColor",
  {
    adjust(...args) {
      adjustmentCalls.push(args);
      return adjust(...args);
    },
  },
);

// A minimal CSSStyleDeclaration, including replacement/append semantics for cssText.
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
class NodeStub {
  style = new StyleStub();
  attrs = new Map();
  className = "";
  setAttribute(name, value) {
    const previous = this.attrs.get(name) ?? null;
    this.attrs.set(name, value);
    if (this.constructor.observedAttributes?.includes(name)) {
      this.attributeChanged(name, previous, value);
      this.updateDOM(new Set([name]));
    }
  }
  removeAttribute(name) {
    const previous = this.attrs.get(name) ?? null;
    this.attrs.delete(name);
    if (this.constructor.observedAttributes?.includes(name)) {
      this.attributeChanged(name, previous, null);
      this.updateDOM(new Set([name]));
    }
  }
}
class BaseComponent extends NodeStub {
  _changedProperties = new Set();
  connectedCallback() {
    this.root = this.render_v2().template;
    this.afterInit();
  }
  disconnectedCallback() {
    this.root = undefined;
  }
}
const Button = runInNewContext(
  readSource("../src/components/button/index.ts").replace(
    "export default class Button",
    "class Button",
  ) + "; Button",
  {
    BaseComponent,
    buttonSheet: {},
    animationSheet: {},
    document: { createElement: () => new NodeStub() },
    $one: (_selector, root) => root,
    formatStyle,
    formatClass: (value) => value.filter(Boolean).join(" "),
    parseAttrValue: (value, fallback, key) =>
      value == null ? fallback : ["", "true", "1", "on", key].includes(value),
    kebabToCamel: (value) => value.replace(/-(\w)/g, (_match, letter) => letter.toUpperCase()),
    unitNumberStr: (value) => value,
    on() {},
    off() {},
    addClass() {},
    removeClass() {},
  },
);
const plain = (value) => ({ ...value });

for (const [mode, text, ghost] of [
  ["solid", false, false],
  ["text", true, false],
  ["ghost", false, true],
  ["text and ghost", true, true],
]) {
  test(`generator preserves the old nine color variables and adjustment math: ${mode}`, () => {
    adjustmentCalls.length = 0;
    const color = "#3584c7";
    const light = "#5B9FD4";
    const dark = "#0A2A54";
    const result = generateButtonColor(color, text, ghost);
    assert.deepEqual(plain(result), {
      "--l-btn-border-color": text ? "transparent" : color,
      "--l-btn-text-color": text || ghost ? color : "#ffffff",
      "--l-btn-hover-text-color": text || ghost ? light : "#ffffff",
      "--l-btn-background": text || ghost ? "transparent" : color,
      "--l-btn-active-text-color": text || ghost ? dark : "#ffffff",
      "--l-btn-hover-border-color": text ? "transparent" : light,
      "--l-btn-hover-background": text || ghost ? "transparent" : light,
      "--l-btn-active-background": text || ghost ? "transparent" : dark,
      "--l-btn-active-border-color": text ? "transparent" : dark,
    });
    assert.deepEqual(adjustmentCalls, [
      [color, 1, true],
      [color, 3, false],
    ]);
    if (mode === "solid") {
      assert.deepEqual(plain(generateButtonColor(color)), plain(result));
    }
  });
}

test("empty colors return a fresh empty object without calling adjust", () => {
  adjustmentCalls.length = 0;
  const first = generateButtonColor("");
  assert.deepEqual(plain(first), {});
  assert.deepEqual(plain(generateButtonColor("", true, true)), {});
  assert.notEqual(first, generateButtonColor(""));
  assert.equal(adjustmentCalls.length, 0);
});

test("color property stores a partial object before mount and renders its inline variables", () => {
  const button = new Button();
  assert.equal(button.color, undefined);
  const color = { "--l-btn-background": "rebeccapurple", "--l-btn-text-color": "white" };
  button.color = color;
  assert.equal(button.color, color);
  assert.equal(button.$btn, undefined);
  button.connectedCallback();
  assert.equal(button.$btn.style.getPropertyValue("--l-btn-background"), "rebeccapurple");
  assert.equal(button.$btn.style.getPropertyValue("--l-btn-text-color"), "white");
  assert.equal(button.$btn.style.values.size, 2);
  button.disconnectedCallback();
});

test("post-mount color replacements remove stale variables but preserve unrelated inline styles", () => {
  const button = new Button();
  button.connectedCallback();
  button.$btn.style.setProperty("padding", "7px");
  button.$btn.style.setProperty("--consumer-token", "kept");
  button.setColor(generateButtonColor("#3584c7"));
  const replacement = { "--l-btn-background": "tomato" };
  button.color = replacement;
  assert.equal(button.color, replacement);
  assert.equal(button.$btn.style.getPropertyValue("--l-btn-background"), "tomato");
  for (const key of Object.keys(generateButtonColor("#3584c7"))) {
    if (key !== "--l-btn-background") assert.equal(button.$btn.style.getPropertyValue(key), "");
  }
  assert.equal(button.$btn.style.getPropertyValue("padding"), "7px");
  assert.equal(button.$btn.style.getPropertyValue("--consumer-token"), "kept");
  button.setColor({});
  assert.deepEqual(plain(button.color), {});
  assert.equal(button.$btn.style.values.size, 2);
  button.setColor(replacement);
  button.setColor();
  assert.equal(button.color, undefined);
  assert.equal(button.$btn.style.values.size, 2);
  button.color = replacement;
  button.color = undefined;
  assert.equal(button.color, undefined);
  assert.equal(button.$btn.style.values.size, 2);
  button.disconnectedCallback();
});

test("HTML color is not observed and text/ghost mutations preserve the final color snapshot", () => {
  const button = new Button();
  assert(!Button.observedAttributes.includes("color"));
  button.setAttribute("color", "red");
  assert.equal(button.color, undefined);
  button.connectedCallback();
  assert.equal(button.$btn.style.cssText, "");
  const snapshot = generateButtonColor("#3584c7");
  button.setColor(snapshot);
  const before = button.$btn.style.cssText;
  adjustmentCalls.length = 0;
  for (const name of ["text", "ghost"]) {
    button.setAttribute(name, "");
    assert(button.$btn.className.includes(`l-btn-${name}`));
    assert.equal(button.$btn.style.cssText, before);
    button.removeAttribute(name);
    assert(!button.$btn.className.includes(`l-btn-${name}`));
    assert.equal(button.$btn.style.cssText, before);
  }
  button.setAttribute("color", "blue");
  button.removeAttribute("color");
  assert.equal(button.color, snapshot);
  assert.equal(button.$btn.style.cssText, before);
  assert.equal(adjustmentCalls.length, 0);
  button.disconnectedCallback();
});

test("disconnect/remount preserves the snapshot and accepts replacement or reset while detached", () => {
  const button = new Button();
  const snapshot = generateButtonColor("#3584c7", false, true);
  button.setColor(snapshot);
  button.connectedCallback();
  const first = button.$btn;
  const before = first.style.cssText;
  button.disconnectedCallback();
  assert.equal(button.$btn, undefined);
  button.connectedCallback();
  assert.notEqual(button.$btn, first);
  assert.equal(button.color, snapshot);
  assert.equal(button.$btn.style.cssText, before);
  button.disconnectedCallback();
  const replacement = { "--l-btn-border-color": "orange" };
  button.setColor(replacement);
  button.connectedCallback();
  assert.equal(button.$btn.style.getPropertyValue("--l-btn-border-color"), "orange");
  assert.equal(button.$btn.style.values.size, 1);
  button.disconnectedCallback();
  button.setColor();
  button.connectedCallback();
  assert.equal(button.color, undefined);
  assert.equal(button.$btn.style.cssText, "");
  button.disconnectedCallback();
});