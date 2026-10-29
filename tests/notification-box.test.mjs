import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { stripTypeScriptTypes } from "node:module";
import { test } from "node:test";
import { runInNewContext } from "node:vm";

function setup(registered = true) {
  const nodes = [];
  let sequence = 0;
  const source = stripTypeScriptTypes(
    readFileSync(
      new URL("../src/components/notification/notification_box.ts", import.meta.url),
      "utf8",
    ),
  )
    .replace(/^import .*;\r?$/gm, "")
    .replace("export default", "const api =");
  const api = runInNewContext(`${source}; api`, {
    customElements: { get: () => registered },
    useId: () => `notice-${++sequence}`,
    normalizePlacement: (value) => value || "topRight",
    on: (node, event, handler) => node.events.set(event, handler),
    document: {
      body: { appendChild: (node) => nodes.push(node) },
      createElement: () => ({
        attrs: {},
        events: new Map(),
        setAttribute(key, value) {
          this.attrs[key] = value;
        },
        get placement() {
          return this.attrs.placement;
        },
        close() {
          this.closed = true;
        },
      }),
      getElementById: (id) => nodes.find((node) => node.id === id),
      querySelectorAll: () => nodes,
    },
  });
  return { api, nodes };
}

test("NotificationBox requires registration and does not create unregistered elements", () => {
  const { api, nodes } = setup(false);
  assert.throws(() => api.info("hello"), /Register Notification/);
  assert.equal(nodes.length, 0);
});

test("service methods create separate instances, preserve defaults and support warn alias", () => {
  const { api, nodes } = setup();
  for (const method of ["info", "success", "error", "warning", "warn"]) api[method]("hello");
  assert.equal(nodes.length, 5);
  assert.deepEqual(
    nodes.map((node) => node.attrs.type),
    ["info", "success", "error", "warning", "warning"],
  );
  assert.equal(new Set(nodes.map((node) => node.id)).size, 5);
  assert(nodes.every((node) => node.attrs.duration === "4500" && node.removeOnClose));
  api.config({ duration: 0, placement: "bottomLeft" });
  api.show({ title: "Title", message: "Body" });
  assert.equal(nodes[5].attrs.duration, "0");
  assert.equal(nodes[5].placement, "bottomLeft");
});

test("close callbacks, action callbacks, closing by id and placement are preserved", () => {
  const { api, nodes } = setup();
  const events = [];
  const id = api.show({
    onClose: (value) => events.push(value),
    onAction: (value) => events.push(value),
  });
  nodes[0].events.get("close")();
  nodes[0].events.get("action")();
  assert.deepEqual(events, [id, id]);
  api.info({ placement: "bottomLeft" });
  api.closeAll("bottomLeft");
  assert.equal(nodes[0].closed, undefined);
  assert.equal(nodes[1].closed, true);
  api.close(id);
  assert.equal(nodes[0].closed, true);
  assert.doesNotThrow(() => api.close("missing"));
});