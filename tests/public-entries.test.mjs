import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { collectEntries, renderCatalog } from "../scripts/public-entries.mjs";

test("catalog covers canonical entries, runtime elements, services and public declarations", () => {
  const entries = collectEntries();
  const byPath = new Map(entries.map((entry) => [entry.path, entry]));
  assert.equal(entries.length, 91);
  assert.equal(byPath.size, 91);
  assert.equal(entries.filter((entry) => entry.tag).length, 79);
  for (const entry of entries) assert.match(entry.path, /^[a-z0-9]+(?:[-/][a-z0-9]+)*$/);
  for (const name of ["UploadFile", "UploadResponseParser", "defaultUploadResponseParser"])
    assert(byPath.get("upload").declarations.includes(name));
  assert(byPath.get("table").declarations.includes("Column"));
  assert(byPath.get("notification").declarations.includes("NotificationPlacement"));
  assert.deepEqual(byPath.get("base").registered, []);
  assert.equal(byPath.get("modal").tag, "l-modal");
  assert.equal(byPath.get("dialog").tag, null);
});

test("conditional and inherited dependencies remain distinct, with transitive closure", () => {
  const byPath = new Map(collectEntries().map((entry) => [entry.path, entry]));
  assert.deepEqual(byPath.get("color-picker").required, []);
  assert.deepEqual(byPath.get("theme-color").requiredClosure, ["color-picker"]);
  assert(byPath.get("image").requiredClosure.includes("icon/zoom-in"));
  assert(byPath.get("theme").requiredClosure.includes("radio"));
  assert(byPath.get("dialog-box").requiredClosure.includes("icon/loading"));
  assert(
    byPath.get("dialog-box").required.some(([name, , kind]) => name === "input" && kind === "lazy"),
  );
  assert(!byPath.get("popover").requiredClosure.includes("button"));
  assert(!byPath.get("image-preview").requiredClosure.includes("mask"));
  assert(byPath.get("popconfirm").requiredClosure.includes("button"));
  assert.deepEqual(byPath.get("select").globals, []);
  assert(byPath.get("select").pendingGlobalStyles.includes("../../styles/popover.css"));
});

test("checked-in mapping matches current source, exports and requirements", () => {
  assert.equal(
    readFileSync(new URL("../PUBLIC_ENTRIES.md", import.meta.url), "utf8").replaceAll("\r\n", "\n"),
    renderCatalog(),
  );
});