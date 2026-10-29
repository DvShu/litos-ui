import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { stripTypeScriptTypes } from "node:module";
import { test } from "node:test";
import { runInNewContext } from "node:vm";

const source = stripTypeScriptTypes(
  readFileSync(new URL("../src/components/notification/placement.ts", import.meta.url), "utf8"),
).replace(/^export /gm, "");

for (const placement of ["topLeft", "topRight", "bottomLeft", "bottomRight"]) {
  test(`${placement}: newest is lowest, oldest is evicted first, removal closes the gap`, () => {
    const api = runInNewContext(
      `${source}; ({ registerNotification, unregisterNotification, getOldestNotification, getGroupSize })`,
    );
    const node = (height) => {
      const positions = new Map();
      return {
        notificationOffset: 16,
        notificationGap: 16,
        offsetHeight: height,
        positions,
        style: {
          setProperty: (key, value) => positions.set(key, value),
          removeProperty: (key) => positions.delete(key),
        },
      };
    };
    const oldest = node(40);
    const middle = node(60);
    const newest = node(80);
    const top = placement.startsWith("top");
    const coordinate = (el) => Number.parseInt(el.positions.get(top ? "top" : "bottom"));
    for (const el of [oldest, middle, newest]) api.registerNotification(el, placement);
    assert.equal(api.getGroupSize(placement), 3);
    assert.equal(api.getOldestNotification(placement), oldest);
    if (top) {
      assert.equal(coordinate(oldest), 16);
      assert.equal(coordinate(middle), 72);
      assert.equal(coordinate(newest), 148);
    } else {
      assert.equal(coordinate(newest), 16);
      assert.equal(coordinate(middle), 112);
      assert.equal(coordinate(oldest), 188);
    }
    api.unregisterNotification(api.getOldestNotification(placement));
    assert.equal(api.getOldestNotification(placement), middle);
    assert.equal(api.getGroupSize(placement), 2);
    assert.equal(coordinate(middle), top ? 16 : 112);
    assert.equal(coordinate(newest), top ? 92 : 16);
    api.unregisterNotification(middle);
    assert.equal(coordinate(newest), 16);
    api.unregisterNotification(newest);
    assert.equal(api.getOldestNotification(placement), undefined);
  });
}