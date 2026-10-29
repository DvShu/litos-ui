import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { stripTypeScriptTypes } from "node:module";
import { test } from "node:test";
import { runInNewContext } from "node:vm";

const source = stripTypeScriptTypes(
  readFileSync(new URL("../src/components/dialog/index.ts", import.meta.url), "utf8"),
).replace(/^import .*;\r?$/gm, "");

function setup() {
  const element = () => ({ classes: new Set(), listeners: new Map() });
  const body = element();
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
      $one: (selector) => (selector === dialog ? dialog : null),
      getAttr: (_el, _name, fallback) => fallback,
      hasClass: (el, name) => el.classes.has(name),
      addClass: (el, name) => el.classes.add(name),
      removeClass: (el, name) => el.classes.delete(name),
      on,
      off,
    },
  );
  return { instance: new Dialog({ el: dialog }), dialog, body };
}

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