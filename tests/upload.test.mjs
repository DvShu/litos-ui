import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { stripTypeScriptTypes } from "node:module";
import { test } from "node:test";
import { runInNewContext } from "node:vm";

// Exercise the component's real selection logic without a DOM or an upload server.
const source = readFileSync(new URL("../src/components/upload/index.ts", import.meta.url), "utf8");
const outputText = stripTypeScriptTypes(source)
  .replace(/^import .*;\r?$/gm, "")
  .replace("export default class Upload", "class Upload");
class ElementStub {
  children = [];
  constructor(tag, attrs = {}) {
    this.tag = tag;
    Object.assign(this, attrs);
  }
  appendChild(child) {
    child.parent = this;
    this.children.push(child);
  }
  remove() {
    this.parent.children = this.parent.children.filter((child) => child !== this);
  }
  querySelector(selector) {
    return (
      this.children.find((child) =>
        selector.startsWith(".") ? child.class === selector.slice(1) : child.tag === selector,
      ) || null
    );
  }
}
const revokedUrls = [];
let objectId = 0;
class BaseStub {
  events = [];
  root = new ElementStub("root");
  emit(type, event) {
    this.events.push({ type, detail: event.detail });
  }
}
const exports = {};
runInNewContext(`${outputText}\nexports.default = Upload;`, {
  exports,
  BaseComponent: BaseStub,
  removeClass() {},
  $one: (selector, root) => root.querySelector(selector),
  $$: (tag, attrs) => new ElementStub(tag, attrs),
  formatClass: (classes) => classes.filter(Boolean).join(" "),
  URL: {
    createObjectURL: () => `blob:test-${++objectId}`,
    revokeObjectURL: (url) => revokedUrls.push(url),
  },
});
const Upload = exports.default;
const file = (name, size = 10) => ({ name, size });
const names = (upload) => Array.from(upload.fileList, (item) => item.name);
function createUpload() {
  const upload = new Upload();
  upload._renderFileList = () => {};
  return upload;
}
function select(upload, ...files) {
  const input = { files, value: "selected" };
  upload._handleInputChange({ target: input });
  assert.equal(input.value, "");
}

test("successive single selections retain completed and pending files and upload only additions", () => {
  const upload = createUpload();
  upload._state.action = "/upload";
  const batches = [];
  upload.upload = (files) => batches.push(Array.from(files));
  select(upload, file("first.txt"));
  const first = upload.fileList[0];
  first.status = "success";
  select(upload, file("second.txt"));
  select(upload, file("third.txt"));
  assert.deepEqual(names(upload), ["first.txt", "second.txt", "third.txt"]);
  assert.equal(upload.fileList[0], first);
  assert.equal(first.status, "success");
  assert.deepEqual(
    batches.map((batch) => batch.map((item) => item.name)),
    [["first.txt"], ["second.txt"], ["third.txt"]],
  );
  const change = upload.events.filter((event) => event.type === "change").at(-1).detail;
  assert.equal(change.fileList.length, 3);
  assert.equal(change.addedFiles.length, 1);
});

test("cumulative max-count rejects additions without replacing files and removal frees a slot", () => {
  const upload = createUpload();
  upload._state.maxCount = 2;
  select(upload, file("first.txt"));
  select(upload, file("second.txt"));
  select(upload, file("rejected.txt"));
  assert.deepEqual(names(upload), ["first.txt", "second.txt"]);
  assert.equal(upload.events.at(-1).type, "exceed");
  assert.equal(upload.events.at(-1).detail.files[0].name, "rejected.txt");
  upload.handleRemove(upload.fileList[0]);
  select(upload, file("replacement.txt"));
  assert.deepEqual(names(upload), ["second.txt", "replacement.txt"]);
});

test("multiple selection appends only the files that fit the remaining capacity", () => {
  const upload = createUpload();
  upload.multiple = true;
  upload._state.maxCount = 3;
  select(upload, file("first.txt"));
  select(upload, file("second.txt"), file("third.txt"), file("overflow.txt"));
  assert.deepEqual(names(upload), ["first.txt", "second.txt", "third.txt"]);
  assert.equal(
    upload.events.find((event) => event.type === "exceed").detail.files[0].name,
    "overflow.txt",
  );
});

test("oversized files and cancelled selection preserve the list; dropping appends files", () => {
  const upload = createUpload();
  upload._state.maxSize = 1;
  select(upload, file("first.txt"));
  select(upload, file("oversized.txt", 2048));
  assert.deepEqual(names(upload), ["first.txt"]);
  assert.equal(upload.events.at(-1).type, "error");
  upload._handleInputChange({ target: { files: [] } });
  assert.deepEqual(names(upload), ["first.txt"]);
  upload._onDrop({ preventDefault() {}, dataTransfer: { files: [file("dropped.txt")] } });
  assert.deepEqual(names(upload), ["first.txt", "dropped.txt"]);
});

test("picture mode replaces one image, aborts its request and releases its preview URL", () => {
  const upload = createUpload();
  upload._state.listType = "picture";
  upload._state.multiple = true;
  upload._state.maxCount = 1;
  select(upload, file("first.png"), file("ignored.png"));
  assert.deepEqual(names(upload), ["first.png"]);
  const first = upload.fileList[0];
  const oldUrl = upload._getFilePreviewUrl(first);
  first.status = "uploading";
  let aborted = false;
  upload.$xhrs.set(first.id, {
    abort() {
      aborted = true;
    },
  });
  select(upload, file("second.png"));
  assert.deepEqual(names(upload), ["second.png"]);
  assert.equal(aborted, true);
  assert.equal(upload.$xhrs.size, 0);
  assert.equal(upload.$objectUrls.has(first.id), false);
  assert.ok(revokedUrls.includes(oldUrl));
  assert.equal(
    upload.events.some((event) => event.type === "exceed"),
    false,
  );
});

test("invalid or cancelled replacement keeps the selected picture", () => {
  const upload = createUpload();
  upload._state.listType = "picture";
  upload._state.maxSize = 1;
  select(upload, file("first.png"));
  const first = upload.fileList[0];
  select(upload, file("oversized.png", 2048));
  upload._handleInputChange({ target: { files: [] } });
  assert.equal(upload.fileList[0], first);
  assert.equal(upload.fileList.length, 1);
});

test("picture renders inside trigger without a list even when show-file-list is false", () => {
  const upload = new Upload();
  upload._state.listType = "picture";
  upload._state.showFileList = false;
  upload.$trigger = new ElementStub("div");
  const slot = new ElementStub("slot");
  upload.$trigger.appendChild(slot);
  select(upload, file("first.png"));
  const image = upload.$trigger.querySelector(".l-upload-trigger-image");
  assert.equal(image.alt, "first.png");
  assert.equal(slot.hidden, true);
  assert.equal(upload._buildFileList(), null);
  const oldUrl = image.src;
  select(upload, file("second.png"));
  assert.equal(upload.$trigger.querySelector(".l-upload-trigger-image"), image);
  assert.equal(image.alt, "second.png");
  assert.notEqual(image.src, oldUrl);
  assert.ok(revokedUrls.includes(oldUrl));
  upload.clearFiles();
  assert.equal(slot.hidden, false);
  assert.equal(upload.$trigger.querySelector(".l-upload-trigger-image"), null);
});

test("switching to picture disables multiple selection, retains one image and updates trigger class", () => {
  const upload = createUpload();
  select(upload, file("first.png"), file("second.png"));
  upload.$input = {
    multiple: true,
    removeAttribute() {
      this.multiple = false;
    },
  };
  upload.$trigger = new ElementStub("div");
  upload._state.multiple = true;
  upload._state.listType = "picture";
  upload.updateDOM(new Set(["list-type"]));
  assert.deepEqual(names(upload), ["second.png"]);
  assert.equal(upload.$input.multiple, false);
  assert.equal(upload.$trigger.className, "l-upload-trigger l-upload-trigger--picture");
  upload.multiple = true;
  assert.equal(upload.$input.multiple, false);
  upload._state.listType = "text";
  upload.updateDOM(new Set(["list-type"]));
  assert.equal(upload.$input.multiple, true);
});