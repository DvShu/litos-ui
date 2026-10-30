import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { stripTypeScriptTypes } from "node:module";
import { test } from "node:test";
import { runInNewContext } from "node:vm";

const source = stripTypeScriptTypes(
  readFileSync(new URL("../src/components/dialog/index.ts", import.meta.url), "utf8"),
).replace(/^import .*;\r?$/gm, "");

function setup(options = {}, containerClose, dialogClose) {
  const element = () => ({ classes: new Set(), listeners: new Map() });
  const body = element();
  const container = {
    ...element(),
    attributes: new Map(containerClose === undefined ? [] : [["close", `${containerClose}`]]),
    writes: [],
    setAttribute(name, value) {
      this.attributes.set(name, value);
      this.writes.push([name, value]);
    },
  };
  const dialog = {
    ...element(),
    open: false,
    closes: 0,
    showModal() {
      this.open = true;
    },
    close() {
      this.open = false;
      this.closes++;
    },
  };
  const on = (el, name, fn) => el.listeners.set(name, fn);
  const off = (el, name, fn) => {
    if (el.listeners.get(name) === fn) el.listeners.delete(name);
  };
  const Dialog = runInNewContext(
    source.replace("export default class Dialog", "class Dialog") + "; Dialog",
    {
      document: { body },
      $one: (selector) =>
        selector === dialog ? dialog : selector === "l-dialog-container" ? container : null,
      getAttr: (_el, name, fallback) => {
        assert.notEqual(name, "close", "Dialog must not read the close attribute");
        return name === "close" ? dialogClose : fallback;
      },
      hasClass: (el, name) => el.classes.has(name),
      addClass: (el, name) => el.classes.add(name),
      removeClass: (el, name) => el.classes.delete(name),
      on,
      off,
    },
  );
  return { instance: new Dialog({ el: dialog, ...options }), dialog, body, container };
}

test("omitting close preserves the container attribute without writing a default", () => {
  for (const close of [undefined, 0, 1, 2]) {
    const { instance, container } = setup({}, close, 2);
    assert.equal(container.writes.length, 0);
    assert.equal(container.attributes.get("close"), close === undefined ? undefined : `${close}`);
    instance.setProps({ close: undefined });
    assert.equal(container.writes.length, 0);
    instance.destroy();
  }
});

test("explicit close options override the container and update outside positioning dynamically", () => {
  for (const close of [0, 1, 2]) {
    const { instance, container, dialog } = setup({ close }, 1, 0);
    assert.equal(container.attributes.get("close"), `${close}`);
    assert.equal(dialog.classes.has("l-dialog-close-outside"), close === 2);
    instance.setProp("close", 2);
    assert.equal(container.attributes.get("close"), "2");
    assert.equal(dialog.classes.has("l-dialog-close-outside"), true);
    instance.setProps({ close: 0 });
    assert.equal(container.attributes.get("close"), "0");
    assert.equal(dialog.classes.has("l-dialog-close-outside"), false);
    instance.setProp("close", 1);
    assert.equal(container.attributes.get("close"), "1");
    instance.destroy();
  }
});

function dispatch(dialog, name, fields = {}) {
  const event = {
    ...fields,
    defaultPrevented: false,
    preventDefault() {
      this.defaultPrevented = true;
    },
  };
  dialog.listeners.get(name)?.(event);
  return event;
}

for (const name of ["keydown", "cancel"]) {
  test(`${name} respects initial escClose and uses the close transition`, () => {
    for (const escClose of [undefined, true, false]) {
      const { instance, dialog, body } = setup(escClose === undefined ? {} : { escClose });
      instance.open();
      const event = dispatch(dialog, name, { key: "Escape" });
      assert.equal(event.defaultPrevented, true);
      assert.equal(dialog.open, true);
      assert.equal(body.classes.has("l-body--dialog-open"), true);
      assert.equal(dialog.listeners.has("transitionend"), escClose !== false);
      if (escClose !== false) {
        dialog.listeners.get("transitionend")({ target: dialog });
        assert.equal(dialog.closes, 1);
        assert.equal(body.classes.has("l-body--dialog-open"), false);
      } else {
        assert.equal(dialog.classes.has("l-dialog--open"), true);
        assert.equal(dialog.closes, 0);
      }
      instance.destroy();
    }
  });

  test(`${name} reads dynamic escClose changes`, () => {
    const { instance, dialog } = setup();
    instance.open();
    instance.setProp("escClose", false);
    dispatch(dialog, name, { code: "Escape" });
    assert.equal(dialog.listeners.has("transitionend"), false);
    instance.setProps({ escClose: true });
    dispatch(dialog, name, { code: "Escape" });
    assert.equal(dialog.listeners.has("transitionend"), true);
    instance.destroy();
    assert.equal(dialog.listeners.size, 0);
  });
}

test("other keys do not close or prevent default; repeated Escape closes only once", () => {
  const { instance, dialog } = setup();
  instance.open();
  assert.equal(
    dispatch(dialog, "keydown", { key: "Enter", code: "Enter" }).defaultPrevented,
    false,
  );
  assert.equal(dialog.listeners.has("transitionend"), false);
  dispatch(dialog, "keydown", { key: "Escape" });
  const finish = dialog.listeners.get("transitionend");
  dispatch(dialog, "cancel");
  dispatch(dialog, "keydown", { code: "Escape" });
  assert.equal(dialog.listeners.get("transitionend"), finish);
  finish({ target: dialog });
  assert.equal(dialog.closes, 1);
  instance.destroy();
});

test("repeated close completes once and ignores child transitions", () => {
  const { instance, dialog, body } = setup();
  instance.open();
  instance.close();
  const finish = dialog.listeners.get("transitionend");
  instance.close();
  finish({ target: {} });
  assert.equal(dialog.open, true);
  finish({ target: dialog });
  finish({ target: dialog });
  instance.close();
  assert.equal(dialog.closes, 1);
  assert.equal(dialog.listeners.has("transitionend"), false);
  assert.equal(body.classes.has("l-body--dialog-open"), false);
});

test("destroy during close cleans up and stale callbacks are safe", () => {
  const { instance, dialog } = setup();
  instance.open();
  instance.close();
  const finish = dialog.listeners.get("transitionend");
  instance.destroy();
  instance.close();
  instance.destroy();
  finish({ target: dialog });
  assert.equal(dialog.closes, 1);
  assert.equal(dialog.listeners.size, 0);
});

test("reopening cancels the previous close", () => {
  const { instance, dialog } = setup();
  instance.open();
  instance.close();
  const finish = dialog.listeners.get("transitionend");
  instance.open();
  finish({ target: dialog });
  assert.equal(dialog.open, true);
  assert.equal(dialog.closes, 0);
  instance.close();
  dialog.listeners.get("transitionend")({ target: dialog });
  assert.equal(dialog.closes, 1);
});