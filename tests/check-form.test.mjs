import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { stripTypeScriptTypes } from "node:module";
import { runInNewContext } from "node:vm";
import { test } from "node:test";
import {
  createFormContextProvider,
  provideFormContext,
  requestFormContext,
  FORM_CONTEXT_EVENTS,
} from "../src/components/form/context.ts";

class Field extends EventTarget {
  _state = {};
  attrs = new Map();
  classes = new Set();
  classList = {
    toggle: (name, enabled) => (enabled ? this.classes.add(name) : this.classes.delete(name)),
  };
  style = { setProperty() {}, removeProperty() {} };
  isConnected = true;
  form = null;
  root = this;
  emitted = [];
  static observedAttributes = [];
  get value() {
    return this._value;
  }
  set value(value) {
    this.setValue(value);
  }
  setValue(value) {
    this._value = value;
    if (!this.applyingDefault) this.dirtyValue = true;
    this.syncNativeValue();
  }
  get intrinsicDefaultValue() {
    return "";
  }
  get defaultValue() {
    return this.getAttribute("value") ?? this.intrinsicDefaultValue;
  }
  set defaultValue(value) {
    this.setAttribute("value", value);
  }
  applyDefaultValue() {
    if (this.dirtyValue) return;
    this.applyingDefault = true;
    try {
      this.value = this.defaultValue;
    } finally {
      this.applyingDefault = false;
    }
  }
  setAttribute(name, value) {
    const oldValue = this.getAttribute(name);
    this.attrs.set(name, String(value));
    if (name === "value") this.applyDefaultValue();
    else this.attributeChange(name, oldValue, String(value));
  }
  removeAttribute(name) {
    const oldValue = this.getAttribute(name);
    this.attrs.delete(name);
    if (name === "value") this.applyDefaultValue();
    else this.attributeChange(name, oldValue, null);
  }
  toggleAttribute(name, force) {
    if (force) this.setAttribute(name, "");
    else this.removeAttribute(name);
  }
  getName() {
    return this.name;
  }
  getRootNode() {
    return this.tree ?? this;
  }
  isDisabled() {
    return !!this.disabled;
  }
  hasAttribute(name) {
    return this.attrs.has(name);
  }
  getAttribute(name) {
    return this.attrs.get(name) ?? null;
  }
  syncNativeValue() {
    this.submitted = this.serializeFormValue();
  }
  syncNativeValidity() {}
  refreshConfiguration() {}
  connectedCallback() {
    this.applyDefaultValue();
    this.afterInit();
  }
  loadStyleText() {}
  reset() {
    this.dirtyValue = false;
    this.applyDefaultValue();
  }
  formStateRestoreCallback(state) {
    this.value = JSON.parse(state).value;
  }
  emit(name, config) {
    this.emitted.push({ name, ...config });
  }
  dispatchEvent(event) {
    const result = super.dispatchEvent(event);
    if (event.bubbles && !event.cancelBubble && this.parent)
      this.parent.dispatchEvent(
        new CustomEvent(event.type, { detail: event.detail, bubbles: true, composed: true }),
      );
    return result;
  }
}
function load(path, className, globals) {
  const source = stripTypeScriptTypes(readFileSync(new URL(path, import.meta.url), "utf8"))
    .replace(/^import[\s\S]*?;\r?\n/gm, "")
    .replace(`export default class ${className}`, `class ${className}`);
  return runInNewContext(`${source}; ${className}`, {
    FormInner: Field,
    createFormContextProvider,
    provideFormContext,
    requestFormContext,
    FORM_CONTEXT_EVENTS,
    FormData,
    File,
    Event,
    CustomEvent,
    encodeURIComponent,
    decodeURIComponent,
    ...globals,
  });
}
const Check = load("../src/components/check/check.ts", "Check", {
  parseAttrValue: (value) => value != null && value !== "false",
});
const Group = load("../src/components/check/index.ts", "CheckGroup", {
  Check,
  css: "",
  unitNumberStr: String,
});

test("standalone check submits checked token, keeps empty token and deterministic disabled UI", () => {
  const check = new Check();
  check._inputType = "checkbox";
  check.value = "";
  assert.equal(check.submitted, null);
  check._doChangeAction();
  assert.equal(check.submitted, "");
  assert.equal(check.emitted.length, 1);
  check.disabled = true;
  check.disabledChange();
  check.disabledChange();
  assert.equal(check.classes.has("is-disabled"), true);
  check._doChangeAction();
  assert.equal(check.getChecked(), true);
  assert.equal(check.emitted.length, 1);
});

test("checked defaults reflect attributes while property edits dirty only current checkedness", () => {
  const check = new Check();
  check.setChecked(true);
  check.reset();
  assert.equal(check.getChecked(), false);
  assert.equal(check.defaultChecked, false);
  check.defaultChecked = true;
  assert.equal(check.getChecked(), true);
  check.setChecked(false);
  check.defaultChecked = false;
  check.setAttribute("checked", "false");
  assert.equal(check.defaultChecked, true);
  assert.equal(check.getChecked(), false);
  check._state.indeterminate = true;
  check.reset();
  assert.equal(check.getChecked(), true);
  assert.equal(check.classes.has("is-indeterminate"), true);
  check.removeAttribute("checked");
  assert.equal(check.getChecked(), false);
});

test("missing value defaults to on; default synchronization remains clean and reset clears dirty", () => {
  const check = new Check();
  check._inputType = "checkbox";
  check.connectedCallback();
  check.defaultChecked = true;
  assert.equal(check.value, "on");
  assert.equal(check.submitted, "on");
  check.defaultValue = "first";
  check.defaultValue = "next";
  assert.equal(check.value, "next");
  check.value = "edited";
  check.defaultValue = "reset";
  assert.equal(check.value, "edited");
  check.reset();
  assert.equal(check.value, "reset");
  check.removeAttribute("value");
  assert.equal(check.value, "on");
  check.defaultValue = "";
  assert.equal(check.submitted, "");
  check.beforeDestroy();
});

test("state serialization restores checked, value and indeterminate without user change", () => {
  const check = new Check();
  check.value = "a&b";
  check.setChecked(true);
  check._state.indeterminate = true;
  const state = check.serializeFormState();
  check.value = "other";
  check.setChecked(false);
  check.formStateRestoreCallback(state, "restore");
  assert.equal(check.value, "a&b");
  assert.equal(check.submitted, "a&b");
  assert.equal(check.classes.has("is-indeterminate"), true);
  assert.equal(check.emitted.length, 0);
  check.formStateRestoreCallback("bad state", "restore");
  assert.equal(check.getChecked(), true);
});

test("group decodes safe tokens and emits same-name native FormData entries", () => {
  const group = new Group();
  group.name = "choices";
  group.value = "a%26b&100%25&%E4%B8%AD%E6%96%87&bad%zz";
  assert.deepEqual(Array.from(group.values), ["a&b", "100%", "中文", "bad%zz"]);
  assert.deepEqual(
    [...group.submitted],
    [
      ["choices", "a&b"],
      ["choices", "100%"],
      ["choices", "中文"],
      ["choices", "bad%zz"],
    ],
  );
  group.value = "a&a";
  assert.equal(group.values.length, 1);
});

test("nearest group owns child state and submission, targeted updates are cleaned on remount", () => {
  const group = new Group();
  group.name = "choices";
  group.connectedCallback();
  const check = new Check();
  check.parent = group;
  check.value = "a&b";
  check.connectedCallback();
  const provider = requestFormContext(check, "group");
  const unregister = provider.registerField({
    target: check,
    getSnapshot: () => ({ value: check.value }),
  });
  group.value = "a%26b";
  assert.equal(check.getChecked(), true);
  assert.equal(check.submitted, null);
  check.beforeDestroy();
  unregister();
  assert.equal(provider.getFields().length, 0);
  check.connectedCallback();
  assert.equal(check.getChecked(), true);
  check.beforeDestroy();
  group.beforeDestroy();
});

test("group accepts only nearest Check changes and encodes tokens without consuming nested groups", () => {
  const outer = new Group(),
    inner = new Group();
  outer.connectedCallback();
  inner.parent = outer;
  inner.connectedCallback();
  const check = new Check();
  check.parent = inner;
  check.value = "a&b%";
  check.setChecked(true);
  let stopped = 0;
  const event = { composedPath: () => [check], stopImmediatePropagation: () => stopped++ };
  outer._handleChange(event);
  assert.equal(outer.value, "");
  inner._handleChange(event);
  assert.equal(inner.value, "a%26b%25");
  assert.equal(stopped, 1);
  assert.equal(inner.emitted.length, 1);
  check.setChecked(false);
  inner._handleChange(event);
  assert.equal(inner.value, "");
  outer._handleChange({ composedPath: () => [inner] });
  assert.equal(outer.value, "");
  inner.beforeDestroy();
  outer.beforeDestroy();
});

test("late group provider refresh replaces standalone status and state without double registration", () => {
  const group = new Group(),
    check = new Check();
  check.parent = group;
  check.value = "late";
  check.connectedCallback();
  assert.equal(check.grouped, false);
  group.connectedCallback();
  group.value = "late";
  check.refreshConfiguration();
  assert.equal(check.grouped, true);
  assert.equal(check.getChecked(), true);
  assert.equal(check.submitted, null);
  check.beforeDestroy();
  group.beforeDestroy();
});

test("independent radio coordination is scoped by owner/name and does not affect other forms", () => {
  const owner = {};
  const first = new Check(),
    second = new Check(),
    other = new Check();
  first.form = second.form = owner;
  other.form = {};
  first.name = second.name = other.name = "choice";
  first.connectedCallback();
  second.connectedCallback();
  other.connectedCallback();
  first.setChecked(true);
  other.setChecked(true);
  second.setChecked(true);
  assert.equal(first.getChecked(), false);
  assert.equal(second.getChecked(), true);
  assert.equal(other.getChecked(), true);
  assert.equal(first.nativeValueMissing, false);
  first.beforeDestroy();
  second.beforeDestroy();
  other.beforeDestroy();
});
test("group configuration synchronizes checkedness without dirtying member defaults", () => {
  const group = new Group(),
    check = new Check();
  check._inputType = "checkbox";
  group.connectedCallback();
  check.parent = group;
  check.connectedCallback();
  group.defaultValue = "on";
  check.refreshConfiguration();
  assert.equal(check.getChecked(), true);
  assert.equal(check.dirtyChecked, false);
  check.defaultChecked = true;
  assert.equal(check.dirtyChecked, false);
  check._doChangeAction();
  assert.equal(check.dirtyChecked, true);
  group.defaultValue = "";
  check.reset();
  assert.equal(check.dirtyChecked, false);
  check.parent = undefined;
  check.refreshConfiguration();
  check.defaultChecked = false;
  assert.equal(check.getChecked(), false);
  check.beforeDestroy();
  group.beforeDestroy();
});