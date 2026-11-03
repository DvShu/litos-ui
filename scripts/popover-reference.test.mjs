import test from "node:test";
import assert from "node:assert/strict";
import { Popover } from "../src/components/utils/popover.ts";

test("nested reference content aligns to the bound element and switches references", () => {
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, "document");
  const nodeDescriptor = Object.getOwnPropertyDescriptor(globalThis, "Node");
  globalThis.Node = EventTarget;
  const documentTarget = new EventTarget();
  globalThis.document = documentTarget;
  const reference = new EventTarget();
  const second = new EventTarget();
  const child = new EventTarget();
  const panel = new EventTarget();
  panel.remove = () => {};
  const popover = new Popover({
    reference: [reference, second],
    popover: panel,
    trigger: "manual",
  });
  const shown = [];
  let hidden = 0;
  popover.show = (element) => {
    shown.push(element);
    popover.$reference = element;
  };
  popover.hide = () => {
    hidden++;
    popover.$reference = undefined;
  };
  try {
    popover._onRefTap({ target: child, currentTarget: reference });
    assert.equal(shown[0], reference);
    popover._onRefTap({ target: child, currentTarget: second });
    assert.equal(shown[1], second);
    assert.equal(hidden, 0);
    popover._onRefTap({ target: child, currentTarget: second });
    assert.equal(hidden, 1);
    popover._onMouseEnter({ target: child, currentTarget: reference });
    assert.equal(shown[2], reference);
  } finally {
    popover.destroy();
    if (nodeDescriptor) Object.defineProperty(globalThis, "Node", nodeDescriptor);
    else delete globalThis.Node;
    if (descriptor) Object.defineProperty(globalThis, "document", descriptor);
    else delete globalThis.document;
  }
});