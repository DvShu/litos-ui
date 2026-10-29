import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { stripTypeScriptTypes } from "node:module";
import { test } from "node:test";
import { runInNewContext } from "node:vm";

const utils = stripTypeScriptTypes(
  readFileSync(new URL("../src/components/utils/index.ts", import.meta.url), "utf8"),
);
const start = utils.indexOf("export function parseAttrValue(");
const parser = utils.slice(start, utils.indexOf("/**", start)).replace("export ", "");
const source = stripTypeScriptTypes(
  readFileSync(new URL("../src/components/dialog/dialog_container.ts", import.meta.url), "utf8"),
)
  .replace(/^import .*;\r?$/gm, "")
  .replace("export default class DialogContainer", "class DialogContainer");

class ElementStub {
  constructor(tag, attrs = {}) {
    this.tag = tag;
    this.attrs = attrs;
    this.children = [];
  }
  appendChild(child) {
    this.children.push(child);
  }
}

class BaseStub {
  connectedCallback() {}
}

const DialogContainer = runInNewContext(`${parser}\n${source}; DialogContainer`, {
  BaseComponent: BaseStub,
  document: { createDocumentFragment: () => new ElementStub("fragment") },
  $$: (tag, attrs) => new ElementStub(tag, attrs),
  $one: () => null,
  formatClass: (classes) => classes.filter(Boolean).join(" "),
});

const find = (node, predicate) =>
  predicate(node) ? node : node.children.map((child) => find(child, predicate)).find(Boolean);

for (const [attribute, property, defaultValue] of [
  ["show-header", "showHeader", true],
  ["show-footer", "showFooter", true],
  ["show-cancel", "showCancel", true],
  ["show-ok", "showOk", true],
  ["mobile", "mobile", false],
  ["confirm-loading", "confirmLoading", false],
]) {
  test(`${attribute}: boolean values and removal restore the default`, () => {
    const container = new DialogContainer();
    assert.equal(container._state[property], defaultValue);
    let previous = null;
    for (const value of ["false", "0", "off", "", "true", "1", "on", attribute, null]) {
      container.attributeChanged(attribute, previous, value);
      const expected = value === null ? defaultValue : !["false", "0", "off"].includes(value);
      assert.equal(container._state[property], expected);
      const tree = container.render();
      if (attribute.startsWith("show-")) {
        const attr =
          attribute === "show-header" || attribute === "show-footer" ? "part" : "data-action";
        const target = attribute.slice(5);
        assert.equal(!!find(tree, (node) => node.attrs[attr] === target), expected);
      } else if (attribute === "mobile") {
        const main = find(tree, (node) => node.attrs.part === "main");
        assert.equal(main.attrs.class.includes("l-dialog-main--mobile"), expected);
      } else {
        const ok = find(tree, (node) => node.attrs["data-action"] === "ok");
        assert.equal(ok.attrs.loading, expected);
      }
      previous = value;
    }
  });
}