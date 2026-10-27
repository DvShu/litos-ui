import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { stripTypeScriptTypes } from "node:module";
import { test } from "node:test";
import { runInNewContext } from "node:vm";

// Exercise the component's real selection logic without a DOM or an upload server.
const source = readFileSync(new URL("../src/components/upload/index.ts", import.meta.url), "utf8");
const outputText = stripTypeScriptTypes(source)
  .replace(/^import .*;\r?$/gm, "")
  .replace("export default class Upload", "class Upload")
  .replace(/^export const /gm, "const ");
class ElementStub {
  children = [];
  style = {};
  constructor(tag, attrs = {}) {
    this.tag = tag;
    Object.assign(this, attrs);
  }
  get firstChild() {
    return this.children[0] ?? null;
  }
  getAttribute(name) {
    return this[name] ?? null;
  }
  removeAttribute(name) {
    delete this[name];
  }
  appendChild(child) {
    if (child.parent) child.remove();
    child.parent = this;
    child.parentElement = this;
    this.children.push(child);
  }
  setAttribute(name, value) {
    this[name] = value;
  }
  insertBefore(child, reference) {
    if (child === reference) return;
    if (child.parent) child.remove();
    child.parent = this;
    child.parentElement = this;
    const index = reference == null ? this.children.length : this.children.indexOf(reference);
    this.children.splice(index, 0, child);
  }
  remove() {
    if (this.parent) this.parent.children = this.parent.children.filter((child) => child !== this);
    this.parent = undefined;
    this.parentElement = undefined;
  }
  querySelector(selector) {
    const id = /^\[data-id="(.*?)"\]$/.exec(selector);
    for (const child of this.children) {
      const matches = selector.startsWith(".")
        ? (child.className || child.class || "").split(" ").includes(selector.slice(1))
        : id
          ? String(child["data-id"]) === id[1]
          : child.tag === selector;
      if (matches) return child;
      const descendant = child.querySelector(selector);
      if (descendant) return descendant;
    }
    return null;
  }
}
const revokedUrls = [];
let objectId = 0;
const requestCalls = [];
const requestTimers = new Map();
class EventTargetStub {
  listeners = new Map();
  addEventListener(type, handler) {
    this.listeners.set(type, handler);
  }
  removeEventListener(type, handler) {
    if (this.listeners.get(type) === handler) this.listeners.delete(type);
  }
  fire(type, event = {}) {
    this.listeners.get(type)?.(event);
  }
}
class XHRStub extends EventTargetStub {
  upload = new EventTargetStub();
  headers = {};
  aborted = false;
  constructor() {
    super();
    requestCalls.push(this);
  }
  open(method, action) {
    this.method = method;
    this.action = action;
  }
  setRequestHeader(name, value) {
    this.headers[name] = value;
  }
  send(body) {
    this.body = body;
  }
  abort() {
    this.aborted = true;
    this.fire("abort");
  }
  respond(status, responseText) {
    this.status = status;
    if (responseText instanceof Error) {
      Object.defineProperty(this, "responseText", {
        get() {
          throw responseText;
        },
      });
    } else this.responseText = responseText;
    this.fire("load");
  }
  reject() {
    this.fire("error");
  }
}
class BaseStub {
  events = [];
  root = new ElementStub("root");
  emit(type, event) {
    this.events.push({ type, detail: event.detail });
    this.onEmit?.(type, event.detail);
  }
}
const exports = {};
runInNewContext(
  `${outputText}\nexports.default = Upload; exports.defaultParser = defaultUploadResponseParser;`,
  {
    exports,
    BaseComponent: BaseStub,
    off(node, event) {
      if (node?.handlers) delete node.handlers[event];
    },
    on(node, event, handler) {
      (node.handlers ??= {})[event] = handler;
    },
    AbortController,
    WeakRef,
    document: {
      baseURI: "https://docs.example.com/components/upload",
      body: new ElementStub("body"),
      createElement(tag) {
        const node = new ElementStub(tag);
        node.setImages = (urls) => {
          node.urls = urls;
        };
        node.setCurrentIndex = (index) => {
          node.index = index;
        };
        node.afterClosed = () => {
          node.cleaned = true;
        };
        return node;
      },
    },
    removeClass() {},
    $one: (selector, root) => root.querySelector(selector),
    $$: (tag, attrs) => new ElementStub(tag, attrs),
    formatClass: (classes) => classes.filter(Boolean).join(" "),
    kebabToCamel: (name) => name.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase()),
    parseAttrValue: (value, fallback) => (value == null ? fallback : value !== "false"),
    XMLHttpRequest: XHRStub,
    DOMException,
    FormData,
    File,
    setTimeout(callback, ms) {
      const id = Symbol();
      requestTimers.set(id, { callback, ms });
      return id;
    },
    clearTimeout(id) {
      requestTimers.delete(id);
    },
    URL: class extends URL {
      static createObjectURL() {
        return `blob:test-${++objectId}`;
      }
      static revokeObjectURL(url) {
        revokedUrls.push(url);
      }
    },
  },
);
const Upload = exports.default;
const file = (name, size = 10) => new File([new Uint8Array(size)], name);
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

function createPictureUpload() {
  const upload = new Upload();
  upload.rendered = true;
  upload._state.listType = "picture";
  upload._state.action = "/upload";
  upload.$trigger = new ElementStub("div");
  upload.$trigger.appendChild(new ElementStub("slot"));
  return upload;
}
const flush = () => new Promise((resolve) => setImmediate(resolve));
function latestRequest() {
  return requestCalls.at(-1);
}
async function respond(status, body) {
  latestRequest().respond(status, body);
  await flush();
}

test("picture mode replaces one image and aborts its XHR and local preview", async () => {
  const upload = createPictureUpload();
  upload.multiple = true;
  upload._state.maxCount = 1;
  select(upload, file("first.png"), file("ignored.png"));
  const old = upload.fileList[0];
  const previousRequest = latestRequest();
  const oldUrl = upload._getFilePreviewUrl(old);
  select(upload, file("second.png"));
  await flush();
  assert.deepEqual(names(upload), ["second.png"]);
  assert.equal(previousRequest.aborted, true);
  assert.equal(previousRequest.listeners.size, 0);
  assert.equal(previousRequest.upload.listeners.size, 0);
  assert.equal(upload._requests.has(old.id), false);
  assert.ok(revokedUrls.includes(oldUrl));
  assert.equal(
    upload.events.some((event) => event.type === "exceed"),
    false,
  );
  upload.clearFiles();
});

test("picture XHR shows waiting motion, real progress and the response URL", async () => {
  const upload = createPictureUpload();
  upload.headers = { Authorization: "test-token" };
  upload.data = { purpose: "test" };
  upload._state.withCredentials = true;
  select(upload, file("photo.png"));
  const call = latestRequest();
  assert.equal(call.action, "/upload");
  assert.equal(call.method, "POST");
  assert.equal(call.withCredentials, true);
  assert.equal(call.headers.Authorization, "test-token");
  assert.equal(call.body.get("file").name, "photo.png");
  assert.equal(call.body.get("purpose"), "test");
  const image = upload.$trigger.querySelector(".l-upload-trigger-image");
  const localUrl = image.src;
  const status = upload.$trigger.querySelector(".l-upload-trigger-status");
  assert.equal(status.querySelector("span").textContent, "上传中");
  assert.ok(status.querySelector(".l-upload-progress--indeterminate"));
  assert.equal(upload.fileList[0].percentage, undefined);
  assert.equal(
    upload.events.some((event) => event.type === "progress"),
    false,
  );
  call.upload.fire("progress", { lengthComputable: true, loaded: 42, total: 100 });
  const progress = upload.$trigger.querySelector(".l-upload-trigger-status");
  assert.equal(progress.querySelector("span").textContent, "42%");
  assert.equal(progress.querySelector(".l-upload-trigger-progress").style.width, "42%");
  assert.equal(upload.events.at(-1).detail.percent, 42);
  call.upload.fire("progress", { lengthComputable: false, loaded: 80, total: 0 });
  assert.equal(upload.fileList[0].percentage, 42);
  await respond(200, JSON.stringify({ data: { url: "https://example.com/photo.png" } }));
  assert.equal(upload.fileList[0].status, "success");
  assert.equal(image.src, "https://example.com/photo.png");
  assert.equal(upload.$trigger.querySelector(".l-upload-trigger-status"), null);
  assert.ok(revokedUrls.includes(localUrl));
  assert.equal(upload._requests.size, 0);
  assert.equal(call.listeners.size, 0);
  assert.equal(call.upload.listeners.size, 0);
  assert.equal(call.aborted, false);
});

for (const failure of ["http", "network", "body", "timeout"]) {
  test(`XHR ${failure} failure shows red picture state without visible error text`, async () => {
    const upload = createPictureUpload();
    select(upload, file("failed.png"));
    if (failure === "http") await respond(500, "failed");
    if (failure === "network") {
      latestRequest().reject(new Error("network"));
      await flush();
    }
    if (failure === "body") await respond(200, new Error("body read failed"));
    if (failure === "timeout") {
      latestRequest().fire("timeout");
      await flush();
    }
    assert.equal(upload.fileList[0].status, "fail");
    assert.ok(upload.$trigger.className.includes("l-upload-trigger--fail"));
    assert.equal(upload.$trigger.querySelector(".l-upload-trigger-image"), null);
    const status = upload.$trigger.querySelector(".l-upload-trigger-status");
    assert.ok(status.querySelector("l-picture-icon"));
    assert.equal(status.querySelector("span"), null);
    select(upload, file("retry.png"));
    assert.equal(upload.$trigger.className.includes("l-upload-trigger--fail"), false);
    upload.clearFiles();
    await flush();
  });
}

test("cancelled or invalid replacement keeps the current picture", () => {
  const upload = createPictureUpload();
  upload._state.autoUpload = false;
  upload._state.maxSize = 1;
  select(upload, file("first.png"));
  const old = upload.fileList[0];
  select(upload, file("oversized.png", 2048));
  upload._handleInputChange({ target: { files: [] } });
  assert.equal(upload.fileList[0], old);
  assert.equal(upload.fileList.length, 1);
});

test("removing auto-upload restores default behavior and missing response URL keeps local preview", async () => {
  const upload = createPictureUpload();
  const count = requestCalls.length;
  upload.attributeChanged("auto-upload", null, "false");
  select(upload, file("manual.png"));
  assert.equal(requestCalls.length, count);
  upload.attributeChanged("auto-upload", "false", null);
  select(upload, file("auto.png"));
  const image = upload.$trigger.querySelector(".l-upload-trigger-image");
  const localUrl = image.src;
  await respond(200, "{}");
  assert.equal(image.src, localUrl);
  assert.equal(upload.fileList[0].status, "success");
});

test("default parser is callable, restorable and does not rewrite tmpfiles links", async () => {
  const upload = createPictureUpload();
  const original = upload.parseResponse;
  assert.equal(original, exports.defaultParser);
  assert.equal(original({ data: { url: "/original.png" } }), "/original.png");
  upload.parseResponse = () => "/custom.png";
  upload.parseResponse = undefined;
  assert.equal(upload.parseResponse, original);
  select(upload, file("photo.png"));
  await respond(200, JSON.stringify({ data: { url: "https://tmpfiles.org/123/photo.png" } }));
  assert.equal(upload.fileList[0].url, "https://tmpfiles.org/123/photo.png");
});

test("custom parser receives frozen metadata and raw response and overrides default parsing", async () => {
  const upload = createPictureUpload();
  let context;
  upload.parseResponse = (response, current) => {
    context = current;
    assert.ok(Object.isFrozen(current));
    assert.ok(Object.isFrozen(current.file));
    assert.equal("raw" in current.file, false);
    assert.equal(current.status, 201);
    return response;
  };
  select(upload, file("photo.png"));
  await respond(201, "/custom.png");
  assert.equal(upload.fileList[0].url, "https://docs.example.com/custom.png");
  assert.equal(context.responseText, "/custom.png");
  assert.equal(context.signal.aborted, true);
});

for (const result of [
  "javascript:alert(1)",
  "data:image/svg+xml,<svg/>",
  "blob:https://example.com/foreign",
  "file:///image.png",
  "https://user:password@example.com/image.png",
  42,
  { url: "/nested.png" },
]) {
  test(`parser rejects unsafe or invalid result ${JSON.stringify(result)}`, async () => {
    const upload = createPictureUpload();
    upload.parseResponse = () => result;
    select(upload, file("photo.png"));
    await respond(200, "{}");
    assert.equal(upload.fileList[0].status, "fail");
    assert.equal(upload.events.find((event) => event.type === "error").detail.phase, "parse");
    assert.equal(
      upload.events.some((event) => event.type === "success"),
      false,
    );
    assert.equal(upload._requests.size, 0);
    upload.clearFiles();
    assert.equal(upload.$objectUrls.size, 0);
  });
}

for (const asynchronous of [false, true]) {
  test(`${asynchronous ? "rejected" : "throwing"} parser enters parse failure`, async () => {
    const upload = createPictureUpload();
    upload.parseResponse = () => {
      if (asynchronous) return Promise.reject(new Error("parse"));
      throw new Error("parse");
    };
    select(upload, file("photo.png"));
    await respond(200, "{}");
    assert.equal(upload.fileList[0].status, "fail");
    assert.equal(upload.events.find((event) => event.type === "error").detail.phase, "parse");
  });
}

for (const phase of ["upload", "parse"]) {
  for (const cancel of ["replace", "remove", "clear", "abort", "destroy", "fileList"]) {
    for (const rejects of [false, true]) {
      test(`${cancel} invalidates ${phase} and ignores a late ${rejects ? "rejection" : "resolution"}`, async () => {
        const upload = createPictureUpload();
        let finish, signal;
        const pending = (context) => {
          signal = context.signal;
          return new Promise((resolve, reject) => {
            finish = rejects ? reject : resolve;
          });
        };
        if (phase === "parse") upload.parseResponse = (_, context) => pending(context);
        else upload.customRequest = (context) => pending(context);
        select(upload, file("old.png"));
        if (phase === "parse") await respond(200, "{}");
        const old = upload.fileList[0];
        if (phase === "parse") {
          assert.equal(
            upload.$trigger.querySelector(".l-upload-trigger-status").querySelector("span")
              .textContent,
            "处理中",
          );
        }
        upload.parseResponse = undefined;
        upload.customRequest = undefined;
        if (cancel === "replace") select(upload, file("new.png"));
        if (cancel === "remove") upload.handleRemove(old);
        if (cancel === "clear") upload.clearFiles();
        if (cancel === "abort") upload.abort();
        if (cancel === "destroy") upload.beforeDestroy();
        if (cancel === "fileList") upload.fileList = [];
        assert.equal(signal.aborted, true);
        assert.equal(upload._requests.has(old.id), false);
        const count = upload.events.length;
        const url = "https://example.com/old.png";
        finish(rejects ? new Error("late") : phase === "parse" ? url : { response: { url } });
        await flush();
        assert.equal(upload.events.length, count);
        assert.notEqual(old.status, "success");
        if (cancel === "replace") assert.equal(upload.fileList[0].name, "new.png");
        if (cancel !== "destroy") upload.clearFiles();
        await flush();
        assert.equal(upload._requests.size, 0);
        assert.equal(upload.$objectUrls.size, 0);
      });
    }
  }
}

test("custom upload works without action, reports real progress and uses the unified parser", async () => {
  const upload = createPictureUpload();
  upload._state.action = "";
  upload._state.withCredentials = true;
  const count = requestCalls.length;
  let options, finish;
  upload.customRequest = (context) => {
    options = context;
    return new Promise((resolve) => {
      finish = resolve;
    });
  };
  upload.parseResponse = (response) => response.asset;
  select(upload, file("custom.png"));
  assert.equal(requestCalls.length, count);
  assert.ok(Object.isFrozen(options));
  assert.equal("withCredentials" in options, false);
  assert.equal(options.file.raw.name, "custom.png");
  options.onProgress(42);
  const status = upload.$trigger.querySelector(".l-upload-trigger-status");
  assert.equal(status.querySelector("span").textContent, "42%");
  assert.equal(status.querySelector(".l-upload-trigger-progress").style.width, "42%");
  options.onProgress(NaN);
  assert.equal(upload.fileList[0].percentage, 42);
  finish({ response: { asset: "https://cdn.example.com/custom.png" } });
  await flush();
  assert.equal(upload.fileList[0].status, "success");
  assert.equal(upload.fileList[0].url, "https://cdn.example.com/custom.png");
  const countAfter = upload.events.length;
  options.onProgress(88);
  assert.equal(upload.events.length, countAfter);
});

for (const result of [
  undefined,
  "url",
  {},
  { response: {}, status: NaN },
  { response: {}, status: 500 },
]) {
  test(`invalid or failing custom upload result ${JSON.stringify(result)}`, () => {
    const upload = createPictureUpload();
    upload.customRequest = () => result;
    select(upload, file("custom.png"));
    assert.equal(upload.fileList[0].status, "fail");
    assert.equal(upload.events.find((event) => event.type === "error").detail.phase, "upload");
    assert.equal(upload._requests.size, 0);
  });
}

test("external fileList supports presets and immutable status/url changes without automatic requests", () => {
  const upload = createPictureUpload();
  upload._state.autoUpload = false;
  const count = requestCalls.length;
  const existing = {
    id: -1,
    name: "server.png",
    size: 100,
    status: "success",
    url: "https://cdn.example.com/server.png",
  };
  upload.fileList = [existing];
  assert.equal(upload.$trigger.querySelector(".l-upload-trigger-image").src, existing.url);
  select(upload, file("new.png"));
  assert.equal(requestCalls.length, count);
  upload.fileList = upload.fileList.map((f) => ({ ...f, status: "uploading", percentage: 60 }));
  assert.equal(
    upload.$trigger.querySelector(".l-upload-trigger-status").querySelector("span").textContent,
    "60%",
  );
  upload.fileList = upload.fileList.map((f) => ({
    ...f,
    status: "success",
    url: "https://cdn.example.com/new.png",
  }));
  assert.equal(
    upload.$trigger.querySelector(".l-upload-trigger-image").src,
    "https://cdn.example.com/new.png",
  );
  assert.equal(upload.$objectUrls.size, 0);
});

test("immutable fileList snapshots preserve active custom upload and completion updates the new object", async () => {
  const upload = createPictureUpload();
  let finish, options;
  upload.customRequest = (context) => {
    options = context;
    return new Promise((resolve) => {
      finish = resolve;
    });
  };
  select(upload, file("custom.png"));
  upload.fileList = upload.fileList.map((f) => ({ ...f, percentage: 30 }));
  const snapshot = upload.fileList[0];
  assert.equal(options.signal.aborted, false);
  options.onProgress(50);
  assert.equal(snapshot.percentage, 50);
  finish({ response: { url: "/done.png" } });
  await flush();
  assert.equal(snapshot.status, "success");
  assert.equal(snapshot.url, "https://docs.example.com/done.png");
});

test("fileList rejects duplicate or invalid entries and new selections avoid preset ids", () => {
  const upload = createUpload();
  const preset = { id: 1, name: "server.txt", size: 0, status: "success" };
  assert.throws(() => {
    upload.fileList = [preset, preset];
  }, /fileList/);
  assert.throws(() => {
    upload.fileList = [{ ...preset, size: NaN }];
  }, /fileList/);
  upload.fileList = [preset];
  select(upload, file("added.txt"));
  assert.equal(new Set(upload.fileList.map((f) => f.id)).size, 2);
});

test("parser and uploader property validation and resetting custom upload", async () => {
  const upload = createPictureUpload();
  assert.throws(() => {
    upload.parseResponse = "code";
  }, /parseResponse/);
  assert.throws(() => {
    upload.customRequest = "code";
  }, /customRequest/);
  upload.customRequest = () => ({ response: {} });
  upload.customRequest = undefined;
  select(upload, file("native.png"));
  assert.equal(latestRequest().action, "/upload");
  await respond(200, "{}");
});

test("text list switches from indeterminate animation to real custom progress", async () => {
  const upload = new Upload();
  let report;
  upload.customRequest = ({ onProgress }) => {
    report = onProgress;
    return new Promise(() => {});
  };
  select(upload, file("file.txt"));
  const bar = upload.root.querySelector(".l-upload-list-item-progress-bar");
  assert.ok(bar.className.includes("l-upload-progress--indeterminate"));
  report(25);
  assert.equal(bar.style.width, "25%");
  assert.equal(bar.className, "l-upload-list-item-progress-bar");
  upload.clearFiles();
  assert.equal(upload._requests.size, 0);
});

test("a change handler can replace fileList snapshots before automatic upload starts", async () => {
  const upload = createPictureUpload();
  upload.onEmit = (type, detail) => {
    if (type === "change" && detail.addedFiles) {
      upload.fileList = upload.fileList.map((f) => ({ ...f }));
    }
  };
  select(upload, file("snapshot.png"));
  await respond(200, JSON.stringify({ url: "/snapshot.png" }));
  assert.equal(upload.fileList[0].status, "success");
  assert.equal(upload.fileList[0].url, "https://docs.example.com/snapshot.png");
});

test("replacing raw in an external snapshot cancels the old managed task and preview", async () => {
  const upload = createPictureUpload();
  select(upload, file("old.png"));
  const previousRequest = latestRequest();
  const oldUrl = upload.$trigger.querySelector(".l-upload-trigger-image").src;
  upload.fileList = upload.fileList.map((f) => ({
    ...f,
    name: "new.png",
    raw: file("new.png"),
    status: "ready",
  }));
  await flush();
  assert.equal(previousRequest.aborted, true);
  assert.equal(upload._requests.size, 0);
  assert.ok(revokedUrls.includes(oldUrl));
  assert.equal(upload.fileList[0].status, "ready");
  upload.clearFiles();
});

test("external files accept optional metadata and mixed numeric/string ids", () => {
  const upload = createUpload();
  upload.fileList = [
    { id: 1, status: "success" },
    { id: "1", status: "success" },
    { id: 'photo"[data-id=other]', status: "success", url: "/photo.png" },
  ];
  assert.equal(upload.fileList.length, 3);
  assert.equal(upload._getFilePreviewUrl(upload.fileList[2]), "https://docs.example.com/photo.png");
  assert.throws(() => {
    upload.fileList = [
      { id: "same", status: "ready" },
      { id: "same", status: "ready" },
    ];
  }, /fileList/);
  for (const invalid of [
    { id: null },
    { id: {} },
    { id: NaN },
    { name: 123 },
    { size: "12" },
    { size: Infinity },
  ]) {
    assert.throws(() => {
      upload.fileList = [{ id: "valid", status: "ready", ...invalid }];
    }, /fileList/);
  }
});

test("file items omit missing names and show sizes only above zero", () => {
  const upload = createUpload();
  for (const size of [undefined, 0, -1, 1024]) {
    upload.fileList = [{ id: "file", status: "success", size }];
    const item = upload._renderFileItem(upload.fileList[0]);
    assert.equal(item.querySelector(".l-upload-list-item-name"), null);
    const sizeNode = item.querySelector(".l-upload-list-item-size");
    assert.equal(!!sizeNode, size > 0);
    if (sizeNode) assert.equal(sizeNode.textContent, "1 KB");
  }
});

test("string ids support upload, safe progress lookup and cancellation without metadata", async () => {
  const upload = createUpload();
  const raw = file("original.txt");
  const ids = [1, "1", 'a"], .l-upload-list-item [data-id="x'];
  upload.fileList = ids.map((id) => ({ id, status: "ready", raw }));
  const items = upload.fileList.map((entry) =>
    upload._renderFileItem({ ...entry, status: "uploading" }),
  );
  items.forEach((item) => upload.root.appendChild(item));
  const options = [];
  upload.customRequest = (value) => {
    options.push(value);
    return new Promise(() => {});
  };
  upload.upload();
  assert.equal(upload._requests.size, 3);
  assert.equal(options[2].body.get("file").name, "original.txt");
  assert.equal(options[2].file.name, undefined);
  options[1].onProgress(35);
  options[2].onProgress(70);
  assert.equal(items[0].querySelector(".l-upload-list-item-progress-bar").style.width, "35%");
  assert.equal(items[1].querySelector(".l-upload-list-item-progress-bar").style.width, "35%");
  assert.equal(items[2].querySelector(".l-upload-list-item-progress-bar").style.width, "70%");
  upload.beforeDestroy();
  assert.equal(upload._requests.size, 0);
  assert.ok(options.every((value) => value.signal.aborted));
});

function createWall() {
  const upload = createUpload();
  upload._state.listType = "picture-card";
  upload._renderFileList = Upload.prototype._renderFileList;
  const items = new ElementStub("div");
  const trigger = new ElementStub("div");
  items.appendChild(trigger);
  upload.root.appendChild(items);
  upload.$trigger = trigger;
  upload.rendered = true;
  return upload;
}

test("picture-card precedes trigger, keeps multiple images and restores trigger after removal", () => {
  const upload = createWall();
  upload._state.maxCount = 2;
  upload.fileList = [
    { id: "a", status: "success", url: "/a.png" },
    { id: "b", status: "fail" },
  ];
  assert.equal(upload.fileList.length, 2);
  assert.equal(upload.$trigger.style.display, "none");
  assert.equal(upload.$trigger.parentElement.children[0].part, "list");
  assert.equal(upload.$trigger.parentElement.children[1], upload.$trigger);
  const success = upload.root.querySelector(".l-upload-card");
  assert.equal(success.querySelector("img").src, "https://docs.example.com/a.png");
  const buttons = success.querySelector(".l-upload-card-actions").children;
  assert.equal(buttons[0].disabled, false);
  assert.equal(buttons[0].children[0].tag, "l-eye-outline-icon");
  assert.equal(buttons[1].children[0].tag, "l-delete-icon");
  const failed = upload.$trigger.parentElement.children[0].children[1];
  assert.equal(failed.querySelector(".l-upload-card-actions").children.length, 1);
  assert.equal(failed.querySelector("img"), null);
  failed.querySelector("button").handlers.click({ stopPropagation() {} });
  assert.equal(upload.fileList.length, 1);
  assert.equal(upload.$trigger.style.display, "");
  upload._state.maxCount = 1;
  upload.updateDOM(new Set(["max-count"]));
  assert.equal(upload.$trigger.style.display, "none");
});

test("picture-card progress has no actions during upload and finishes into preview actions", async () => {
  const upload = createWall();
  let complete, options;
  upload.customRequest = (value) => {
    options = value;
    return new Promise((resolve) => {
      complete = resolve;
    });
  };
  select(upload, file("a.png"));
  let card = upload.root.querySelector(".l-upload-card");
  assert.equal(card.querySelector(".l-upload-card-actions"), null);
  assert.ok(card.querySelector(".l-upload-progress--indeterminate"));
  options.onProgress(48);
  assert.equal(card.querySelector("span").textContent, "48%");
  assert.equal(card.querySelector(".l-upload-trigger-progress").style.width, "48%");
  complete({ response: { url: "/done.png" } });
  await flush();
  card = upload.root.querySelector(".l-upload-card");
  assert.equal(card.querySelector("img").src, "https://docs.example.com/done.png");
  assert.equal(card.querySelector(".l-upload-trigger-status"), null);
  assert.equal(card.querySelector(".l-upload-card-actions").children.length, 2);
  assert.equal(upload._requests.size, 0);
});

test("picture-card uses ImagePreview, cleans it on removal and disables actions", () => {
  const upload = createWall();
  upload.fileList = [
    { id: "a", status: "success", url: "/a.png" },
    { id: "b", status: "success", url: "/b.png" },
  ];
  let card = upload.root.querySelector(".l-upload-card");
  card.querySelector("button").handlers.click({ stopPropagation() {} });
  const preview = upload._preview;
  assert.equal(preview.tag, "l-image-preview");
  assert.equal(preview.urls.length, 2);
  assert.equal(preview.open, true);
  assert.equal(preview.index, 0);
  upload.handleRemove(upload.fileList[0]);
  assert.equal(upload._preview, undefined);
  assert.equal(preview.open, false);
  assert.equal(preview.cleaned, true);
  upload._state.disabled = true;
  upload.updateDOM(new Set(["disabled"]));
  card = upload.root.querySelector(".l-upload-card");
  assert.equal(card.querySelector("button").disabled, true);
  card.querySelector(".l-upload-card-actions").children[1].handlers.click({ stopPropagation() {} });
  assert.equal(upload.fileList.length, 1);
  upload.beforeDestroy();
});

test("removing a stale ready snapshot aborts current XHR and emits the current file", async () => {
  const upload = createPictureUpload();
  upload._state.autoUpload = false;
  select(upload, file("stale.png"));
  const snapshot = { ...upload.fileList[0] };
  upload.upload();
  const request = latestRequest();
  upload.fileList = upload.fileList.map((entry) => ({ ...entry, name: "current.png" }));
  const current = upload.fileList[0];
  const preview = upload._getFilePreviewUrl(current);
  upload.handleRemove(snapshot);
  assert.equal(request.aborted, true);
  assert.equal(request.listeners.size, 0);
  assert.equal(request.upload.listeners.size, 0);
  assert.equal(upload._requests.size, 0);
  assert.equal(upload.fileList.length, 0);
  assert.equal(upload.$objectUrls.size, 0);
  assert.ok(revokedUrls.includes(preview));
  const removed = upload.events.find((event) => event.type === "remove");
  assert.equal(removed.detail.file, current);
  assert.equal(removed.detail.file.name, "current.png");
  const count = upload.events.length;
  request.respond(200, '{"url":"/late.png"}');
  await flush();
  assert.equal(upload.events.length, count);
});

for (const phase of ["upload", "parse"]) {
  for (const rejects of [false, true]) {
    test(`stale snapshot removal cancels ${phase} and ignores late ${rejects ? "rejection" : "resolution"}`, async () => {
      const upload = createWall();
      const raw = file("current.png");
      upload.fileList = [{ id: "external", status: "ready", raw }];
      const snapshot = { ...upload.fileList[0] };
      let complete, signal;
      const pending = new Promise((resolve, reject) => {
        complete = rejects ? reject : resolve;
      });
      upload.customRequest = (options) => {
        signal = options.signal;
        return phase === "upload" ? pending : { response: {} };
      };
      if (phase === "parse") upload.parseResponse = () => pending;
      upload.upload();
      upload.fileList = upload.fileList.map((entry) => ({ ...entry }));
      const current = upload.fileList[0];
      upload.handleRemove(snapshot);
      assert.equal(signal.aborted, true);
      assert.equal(upload._requests.size, 0);
      assert.equal(upload.fileList.length, 0);
      assert.equal(upload.events.find((event) => event.type === "remove").detail.file, current);
      const count = upload.events.length;
      complete(
        rejects
          ? new Error("late")
          : phase === "parse"
            ? "/late.png"
            : { response: { url: "/late.png" } },
      );
      await flush();
      assert.equal(upload.events.length, count);
    });
  }
}

for (const listType of ["text", "picture-card"]) {
  test(`${listType}: invalid sizes do not consume remaining slots and exceed lists only valid overflow`, () => {
    const upload = createUpload();
    upload._state.listType = listType;
    upload._state.maxCount = 2;
    upload._state.maxSize = 1;
    select(upload, file("existing.png"));
    upload.events.length = 0;
    const tooLarge = file("oversized.png", 2048);
    const valid = file("valid.png", 1024);
    const overflow = file("overflow.png", 10);
    const alsoTooLarge = file("also-oversized.png", 2048);
    select(upload, tooLarge, valid, overflow, alsoTooLarge);
    assert.deepEqual(names(upload), ["existing.png", "valid.png"]);
    assert.deepEqual(
      Array.from(upload.events.find((event) => event.type === "error").detail.files),
      [tooLarge, alsoTooLarge],
    );
    assert.deepEqual(
      Array.from(upload.events.find((event) => event.type === "exceed").detail.files),
      [overflow],
    );
    assert.deepEqual(
      Array.from(
        upload.events.find((event) => event.type === "change").detail.addedFiles,
        (entry) => entry.raw,
      ),
      [valid],
    );
  });

  test(`${listType}: a valid file after an oversized file is accepted without a false exceed event`, () => {
    const upload = createUpload();
    upload._state.listType = listType;
    upload._state.maxCount = 1;
    upload._state.maxSize = 1;
    select(upload, file("oversized.png", 2048), file("valid.png"));
    assert.deepEqual(names(upload), ["valid.png"]);
    assert.equal(upload.events.filter((event) => event.type === "exceed").length, 0);
    upload.events.length = 0;
    select(upload, file("only-invalid.png", 2048));
    assert.deepEqual(
      upload.events.map((event) => event.type),
      ["error"],
    );
    assert.deepEqual(names(upload), ["valid.png"]);
  });
}

// Attribute writes trigger the existing Upload attribute/updateDOM path, as the browser and base do.
function attachAttributeLifecycle(upload) {
  const attributes = new Map();
  const change = (name, value) => {
    const old = attributes.get(name) ?? null;
    if (value === null) attributes.delete(name);
    else attributes.set(name, value);
    if (old === value) return;
    upload.attributeChanged(name, old, value);
    if (upload.rendered) upload.updateDOM(new Set([name]));
  };
  upload.setAttribute = (name, value) => change(name, String(value));
  upload.removeAttribute = (name) => change(name, null);
  upload.hasAttribute = (name) => attributes.has(name);
  upload.getAttribute = (name) => attributes.get(name) ?? null;
}

test("disabled property reflects attributes and synchronizes input, trigger and card actions", () => {
  const upload = createWall();
  attachAttributeLifecycle(upload);
  let picks = 0;
  upload.$input = {
    disabled: false,
    click() {
      picks++;
    },
  };
  upload.fileList = [{ id: "existing", status: "success", url: "/image.png" }];
  upload.disabled = true;
  assert.equal(upload.disabled, true);
  assert.equal(upload.getAttribute("disabled"), "");
  assert.equal(upload.$input.disabled, true);
  assert.equal(upload.$trigger.tabIndex, -1);
  assert.equal(upload.$trigger["aria-disabled"], "true");
  assert.equal(upload.root.querySelector("button").disabled, true);
  upload._handleClick();
  upload._handleTriggerKeydown({ target: upload.$trigger, key: "Enter", preventDefault() {} });
  upload._onDrop({ preventDefault() {}, dataTransfer: { files: [file("blocked.png")] } });
  assert.equal(picks, 0);
  assert.equal(upload.fileList.length, 1);
  upload.disabled = false;
  assert.equal(upload.hasAttribute("disabled"), false);
  assert.equal(upload.$input.disabled, false);
  assert.equal(upload.$trigger.tabIndex, 0);
  assert.equal(upload.$trigger["aria-disabled"], "false");
  assert.equal(upload.root.querySelector("button").disabled, false);
  upload._handleTriggerKeydown({ target: upload.$trigger, key: " ", preventDefault() {} });
  assert.equal(picks, 1);
  upload._onDrop({ preventDefault() {}, dataTransfer: { files: [file("accepted.png")] } });
  assert.equal(upload.fileList.length, 2);
});

test("disabled property normalizes an existing false attribute and supports assignment before mount", () => {
  const upload = createUpload();
  attachAttributeLifecycle(upload);
  upload.setAttribute("disabled", "false");
  assert.equal(upload.disabled, false);
  upload.disabled = true;
  assert.equal(upload.getAttribute("disabled"), "");
  assert.equal(upload.disabled, true);
  upload.disabled = false;
  assert.equal(upload.hasAttribute("disabled"), false);
  upload.disabled = false;
  assert.equal(upload.disabled, false);
  upload.setAttribute("disabled", "");
  assert.equal(upload.disabled, true);
  upload.removeAttribute("disabled");
  assert.equal(upload.disabled, false);
});

test("fileList progress and immutable snapshots keep the success gallery open", () => {
  const upload = createWall();
  upload.fileList = [
    { id: "a", status: "success", url: "/a.png" },
    { id: "b", status: "uploading", percentage: 0, url: "/b.png" },
    { id: "c", status: "ready", url: "/c.png" },
    { id: "d", status: "fail", url: "/d.png" },
  ];
  upload.handlePreview(upload.fileList[0]);
  const preview = upload._preview;
  assert.deepEqual(Array.from(preview.urls), ["https://docs.example.com/a.png"]);
  upload.fileList = upload.fileList.map((entry) => ({
    ...entry,
    ...(entry.id === "b" ? { percentage: 50 } : {}),
  }));
  assert.equal(upload._preview, preview);
  assert.equal(preview.open, true);
  upload.fileList = [...upload.fileList, { id: "new", status: "success", url: "/new.png" }];
  assert.equal(upload._preview, preview);
  assert.equal(preview.urls.length, 1); // 本次预览集合保持为打开时的成功图片。
  upload.handleRemove(upload.fileList.find((entry) => entry.id === "c"));
  assert.equal(upload._preview, preview);
  upload.beforeDestroy();
  assert.equal(upload._preview, undefined);
  assert.equal(upload._previewFiles.length, 0);
});

for (const change of ["ready", "uploading", "fail", "url", "remove"]) {
  test(`external ${change} invalidates the open gallery`, () => {
    const upload = createWall();
    upload.fileList = [{ id: "a", status: "success", url: "/a.png" }];
    upload.handlePreview(upload.fileList[0]);
    const preview = upload._preview;
    upload.fileList =
      change === "remove"
        ? []
        : [
            {
              ...upload.fileList[0],
              ...(change === "url" ? { url: "/changed.png" } : { status: change }),
            },
          ];
    assert.equal(upload._preview, undefined);
    assert.equal(upload._previewFiles.length, 0);
    assert.equal(preview.open, false);
    assert.equal(preview.cleaned, true);
  });
}

test("preview checks the current file status instead of a stale success snapshot", () => {
  const upload = createWall();
  upload.fileList = [{ id: "a", status: "success", url: "/a.png" }];
  const snapshot = { ...upload.fileList[0] };
  for (const status of ["ready", "uploading", "fail"]) {
    upload.fileList = [{ ...snapshot, status }];
    upload.handlePreview(snapshot);
    assert.equal(upload._preview, undefined);
  }
  assert.equal(upload.events.filter((event) => event.type === "preview").length, 0);
  upload.fileList = [{ ...snapshot }];
  upload.handlePreview({ ...snapshot, status: "ready" });
  assert.ok(upload._preview);
  assert.equal(upload.events.at(-1).detail.file, upload.fileList[0]);
  upload.clearFiles();
  assert.equal(upload._preview, undefined);
});

test("local success preview survives snapshots but closes when its raw file changes", () => {
  const upload = createWall();
  upload.fileList = [{ id: "local", status: "success", raw: file("a.png") }];
  upload.handlePreview(upload.fileList[0]);
  const preview = upload._preview;
  upload.fileList = [{ ...upload.fileList[0], percentage: 100 }];
  assert.equal(upload._preview, preview);
  const localUrl = preview.urls[0];
  upload.fileList = [{ ...upload.fileList[0], url: "javascript:invalid()" }];
  assert.equal(upload._preview, preview);
  assert.equal(upload.$objectUrls.get("local"), localUrl);
  assert.equal(revokedUrls.includes(localUrl), false);
  upload.fileList = [{ ...upload.fileList[0], raw: file("b.png") }];
  assert.equal(upload._preview, undefined);
  assert.equal(preview.cleaned, true);
});

test("retrying a success image closes its preview before the upload continues", () => {
  const upload = createWall();
  upload.fileList = [{ id: "retry", status: "success", raw: file("a.png") }];
  upload.handlePreview(upload.fileList[0]);
  const preview = upload._preview;
  upload.customRequest = () => new Promise(() => {});
  upload.upload(upload.fileList);
  assert.equal(upload.fileList[0].status, "uploading");
  assert.equal(upload._preview, undefined);
  assert.equal(preview.open, false);
  upload.beforeDestroy();
});

for (const mode of ["text", "picture-card"]) {
  test(`${mode}: external progress patches preserve list, item and progress nodes`, () => {
    const upload = createWall();
    upload._state.listType = mode;
    upload.fileList = [
      { id: "active", status: "uploading", percentage: 0, url: "/active.png" },
      { id: "done", status: "success", url: "/done.png" },
    ];
    const list = upload._listElement;
    const active = upload._fileNodes.get("active").element;
    const done = upload._fileNodes.get("done").element;
    const selector =
      mode === "text" ? ".l-upload-list-item-progress-bar" : ".l-upload-trigger-progress";
    const bar = active.querySelector(selector);
    const text = active.querySelector(".l-upload-progress-text");
    const image = active.querySelector("img");
    const actions = done.querySelector(".l-upload-card-actions");
    const button = done.querySelector("button") ?? done.querySelector(".l-upload--close");
    upload.fileList = upload.fileList.map((entry) =>
      entry.id === "active" ? { ...entry, percentage: 50 } : { ...entry },
    );
    assert.equal(upload._listElement, list);
    assert.equal(upload._fileNodes.get("active").element, active);
    assert.equal(upload._fileNodes.get("done").element, done);
    assert.equal(active.querySelector(selector), bar);
    assert.equal(bar.style.width, "50%");
    assert.equal(active.querySelector("img"), image);
    assert.equal(done.querySelector(".l-upload-card-actions"), actions);
    assert.equal(done.querySelector("button") ?? done.querySelector(".l-upload--close"), button);
    if (text) {
      assert.equal(active.querySelector(".l-upload-progress-text"), text);
      assert.equal(text.textContent, "50%");
    }
    // 即使调用方修改了原对象，独立渲染快照仍能识别新值。
    upload.fileList[0].percentage = 75;
    const sameList = upload.fileList;
    upload.fileList = sameList;
    assert.equal(active.querySelector(selector), bar);
    assert.equal(bar.style.width, "75%");
    upload.beforeDestroy();
    assert.equal(upload._fileNodes.size, 0);
    assert.equal(upload._listElement, undefined);
  });

  test(`${mode}: add, reorder and remove reuse nodes with distinct number and string ids`, () => {
    const upload = createWall();
    upload._state.listType = mode;
    upload.fileList = [
      { id: 1, status: "success", url: "/one.png" },
      { id: "1", status: "success", url: "/string.png" },
    ];
    const first = upload._fileNodes.get(1).element;
    const second = upload._fileNodes.get("1").element;
    upload.fileList = [upload.fileList[1], { id: "new", status: "ready" }, upload.fileList[0]];
    const third = upload._fileNodes.get("new").element;
    assert.deepEqual(upload._listElement.children, [second, third, first]);
    upload.fileList = upload.fileList.filter((entry) => entry.id !== "1");
    assert.equal(upload._fileNodes.has("1"), false);
    assert.deepEqual(upload._listElement.children, [third, first]);
    assert.equal(second.parentElement, undefined);
    upload.beforeDestroy();
  });
}

for (const mode of ["picture", "picture-card"]) {
  test(`${mode}: internal progress and parse phase reuse image, status, text and bar`, async () => {
    const upload = mode === "picture" ? createPictureUpload() : createWall();
    let options, complete, parse;
    upload.customRequest = (value) => {
      options = value;
      return new Promise((resolve) => {
        complete = resolve;
      });
    };
    upload.parseResponse = () =>
      new Promise((resolve) => {
        parse = resolve;
      });
    select(upload, file("image.png"));
    const item =
      mode === "picture" ? upload.$trigger : upload._fileNodes.get(upload.fileList[0].id).element;
    const image = item.querySelector("img");
    const status = item.querySelector(".l-upload-trigger-status");
    const text = item.querySelector(".l-upload-progress-text");
    const bar = item.querySelector(".l-upload-trigger-progress");
    options.onProgress(20);
    options.onProgress(55);
    assert.equal(item.querySelector("img"), image);
    assert.equal(item.querySelector(".l-upload-trigger-status"), status);
    assert.equal(item.querySelector(".l-upload-progress-text"), text);
    assert.equal(item.querySelector(".l-upload-trigger-progress"), bar);
    assert.equal(text.textContent, "55%");
    assert.equal(bar.style.width, "55%");
    complete({ response: {} });
    await flush();
    assert.equal(item.querySelector(".l-upload-trigger-status"), status);
    assert.equal(text.textContent, "处理中");
    assert.ok(bar.className.includes("indeterminate"));
    parse("/server.png");
    await flush();
    assert.equal(item.querySelector("img"), image);
    assert.equal(image.src, "https://docs.example.com/server.png");
    assert.equal(item.querySelector(".l-upload-trigger-status"), null);
    upload.beforeDestroy();
  });
}

test("text metadata updates preserve the file node and its delete control", () => {
  const upload = createWall();
  upload._state.listType = "text";
  upload.fileList = [
    { id: "text", name: "old.txt", size: 1024, status: "uploading", percentage: 0 },
  ];
  const item = upload._fileNodes.get("text").element;
  const name = item.querySelector(".l-upload-list-item-name");
  const size = item.querySelector(".l-upload-list-item-size");
  const remove = item.querySelector(".l-upload--close");
  upload.fileList = [{ ...upload.fileList[0], name: "new.txt", size: 2048, status: "success" }];
  assert.equal(upload._fileNodes.get("text").element, item);
  assert.equal(item.querySelector(".l-upload-list-item-name"), name);
  assert.equal(name.textContent, "new.txt");
  assert.equal(item.querySelector(".l-upload-list-item-size"), size);
  assert.equal(size.textContent, "2 KB");
  assert.equal(item.querySelector(".l-upload--close"), remove);
  assert.equal(item.querySelector(".l-upload-list-item-progress"), null);
  upload.fileList = [{ id: "text", status: "success", size: 0 }];
  assert.equal(item.querySelector(".l-upload-list-item-name"), null);
  assert.equal(item.querySelector(".l-upload-list-item-size"), null);
  remove.handlers.click();
  assert.equal(upload.fileList.length, 0);
  assert.equal(upload.events.find((event) => event.type === "remove").detail.file.size, 0);
});

test("reused card controls use the current file and survive metadata and failure changes", () => {
  const upload = createWall();
  upload.fileList = [{ id: "card", name: "old", status: "success", url: "/old.png" }];
  const item = upload._fileNodes.get("card").element;
  const preview = item.querySelector(".l-upload-card-preview");
  const remove = item.querySelector(".l-upload-card-delete");
  const image = item.querySelector("img");
  upload.fileList = [{ ...upload.fileList[0], name: "new", url: "/new.png" }];
  assert.equal(item.querySelector("img"), image);
  assert.equal(image.src, "https://docs.example.com/new.png");
  assert.equal(item.querySelector(".l-upload-card-preview"), preview);
  preview.handlers.click({ stopPropagation() {} });
  assert.equal(upload.events.at(-1).detail.file.name, "new");
  upload.fileList = [{ ...upload.fileList[0], status: "fail" }];
  assert.equal(upload._fileNodes.get("card").element, item);
  assert.equal(item.querySelector(".l-upload-card-preview"), null);
  assert.equal(item.querySelector(".l-upload-card-delete"), remove);
  assert.equal(item.querySelector("img"), null);
  assert.ok(item.querySelector(".l-upload-card-error"));
  remove.handlers.click({ stopPropagation() {} });
  assert.equal(upload.events.find((event) => event.type === "remove").detail.file.status, "fail");
});

test("hiding the list and switching modes reset only the incompatible node cache", () => {
  const upload = createWall();
  upload.fileList = [{ id: "a", status: "success", url: "/a.png" }];
  const card = upload._fileNodes.get("a").element;
  upload.showFileList = false;
  assert.equal(upload._fileNodes.size, 0);
  assert.equal(upload._listElement, undefined);
  upload.showFileList = true;
  assert.notEqual(upload._fileNodes.get("a").element, card);
  upload._state.listType = "text";
  upload.updateDOM(new Set(["list-type"]));
  assert.equal(upload._listMode, "text");
  assert.ok(upload._fileNodes.get("a").element.class.includes("l-upload-list-item"));
  upload._state.listType = "picture";
  upload.updateDOM(new Set(["list-type"]));
  assert.equal(upload._fileNodes.size, 0);
  upload.beforeDestroy();
});

for (const mode of ["picture", "picture-card"]) {
  test(`${mode}: raw replacement on an existing object refreshes its preview URL`, () => {
    const upload = mode === "picture" ? createPictureUpload() : createWall();
    upload.fileList = [{ id: "local", status: "ready", raw: file("first.png") }];
    const item = mode === "picture" ? upload.$trigger : upload._fileNodes.get("local").element;
    const image = item.querySelector("img");
    const oldUrl = image.src;
    upload.fileList[0].raw = file("second.png");
    const sameList = upload.fileList;
    upload.fileList = sameList;
    assert.equal(item.querySelector("img"), image);
    assert.notEqual(image.src, oldUrl);
    assert.ok(revokedUrls.includes(oldUrl));
    upload.beforeDestroy();
  });
}

test("afterInit discards cached template nodes and binds the mounted list", () => {
  const upload = createWall();
  upload.fileList = [{ id: "a", status: "success", url: "/a.png" }];
  const previous = upload._fileNodes.get("a").element;
  upload.afterInit();
  const current = upload._fileNodes.get("a").element;
  assert.notEqual(current, previous);
  assert.equal(current.parentElement, upload._listElement);
  assert.equal(upload.root.querySelector(".l-upload-card"), current);
  upload.beforeDestroy();
  assert.equal(upload._fileNodes.size, 0);
});

test("text delete is a native button and disabled state prevents its handler from removing files", () => {
  const upload = createWall();
  upload._state.listType = "text";
  attachAttributeLifecycle(upload);
  upload.fileList = [{ id: "a", status: "success", name: "a.txt" }];
  const item = upload._fileNodes.get("a").element;
  const button = item.querySelector(".l-upload--close");
  assert.equal(button.tag, "button");
  assert.equal(button.type, "button");
  assert.equal(button["aria-label"], "Delete");
  assert.equal(button.disabled, false);
  upload.disabled = true;
  assert.equal(item.querySelector(".l-upload--close"), button);
  assert.equal(button.disabled, true);
  button.handlers.click({ stopPropagation() {} });
  assert.equal(upload.fileList.length, 1);
  upload.disabled = false;
  assert.equal(button.disabled, false);
  button.handlers.click({ stopPropagation() {} });
  assert.equal(upload.fileList.length, 0);
});

for (const [property, attribute, invalid] of [
  ["maxCount", "max-count", [-1, 0.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1, "2", null]],
  ["maxSize", "max-size", [-1, NaN, Infinity, "2", null]],
  ["timeout", "timeout", [-1, 0.5, NaN, Infinity, 2147483648, "2", null]],
]) {
  test(`${property} validates property values and resets malformed numeric attributes`, () => {
    const upload = createUpload();
    attachAttributeLifecycle(upload);
    for (const value of invalid)
      assert.throws(
        () => {
          upload[property] = value;
        },
        { name: "TypeError" },
      );
    upload[property] = property === "maxSize" ? 0.5 : 12;
    assert.equal(upload[property], property === "maxSize" ? 0.5 : 12);
    for (const value of [
      "-1",
      "NaN",
      "Infinity",
      "abc",
      ...(property === "maxSize" ? [] : ["0.5"]),
    ]) {
      upload.attributeChanged(attribute, null, value);
      assert.equal(upload[property], 0);
    }
    upload.attributeChanged(attribute, null, "24");
    assert.equal(upload[property], 24);
    upload.attributeChanged(attribute, "24", null);
    assert.equal(upload[property], 0);
  });
}

test("headers and data require plain records and validate each value", () => {
  const upload = createUpload();
  for (const invalid of [
    [],
    "text",
    12,
    new Date(),
    new Map(),
    Object.create({ inherited: true }),
  ]) {
    assert.throws(
      () => {
        upload.headers = invalid;
      },
      { name: "TypeError" },
    );
    assert.throws(
      () => {
        upload.data = invalid;
      },
      { name: "TypeError" },
    );
  }
  for (const value of [1, true, null, undefined, [], {}]) {
    assert.throws(
      () => {
        upload.headers = { token: value };
      },
      { name: "TypeError" },
    );
  }
  for (const value of [null, undefined, NaN, Infinity, [], {}, () => {}]) {
    assert.throws(
      () => {
        upload.data = { field: value };
      },
      { name: "TypeError" },
    );
  }
  upload.headers = { Authorization: "test" };
  upload.data = { purpose: "test", count: 2, enabled: false };
  assert.equal(upload.headers.Authorization, "test");
  assert.equal(upload.data.count, 2);
  upload.headers = null;
  upload.data = undefined;
  assert.equal(Object.keys(upload.headers).length, 0);
  assert.equal(Object.keys(upload.data).length, 0);
  for (const attribute of ["headers", "data"]) {
    for (const invalid of ["[1,2]", '"text"', "{", '{"bad":{}}']) {
      upload.attributeChanged(attribute, null, invalid);
      assert.equal(Object.keys(upload[attribute]).length, 0);
    }
  }
});

test("validated additional primitive fields are serialized into multipart form data", () => {
  const upload = createPictureUpload();
  upload.data = { description: "sample", amount: 2, enabled: false };
  select(upload, file("form.png"));
  const body = latestRequest().body;
  assert.equal(body.get("description"), "sample");
  assert.equal(body.get("amount"), "2");
  assert.equal(body.get("enabled"), "false");
  upload.beforeDestroy();
});

test("external file validation rejects empty ids, invalid raw files and non-string URLs", () => {
  const upload = createUpload();
  for (const invalid of [
    { id: "" },
    { id: "  " },
    { raw: {} },
    { raw: new Blob(["blob"]) },
    { url: 1 },
    { url: {} },
  ]) {
    assert.throws(
      () => {
        upload.fileList = [{ id: "a", status: "ready", ...invalid }];
      },
      { name: "TypeError" },
    );
  }
  upload.fileList = [{ id: "valid", status: "ready", raw: file("valid.txt"), size: -1 }];
  assert.equal(upload.fileList[0].size, -1);
});

const typedFile = (name, type, size = 10) => new File([new Uint8Array(size)], name, { type });
for (const input of ["select", "drop"]) {
  test(`${input} validates extension, MIME and wildcard types before size and count`, () => {
    const upload = createUpload();
    upload._state.accept = ".PNG, application/pdf, audio/*";
    upload._state.maxSize = 1;
    upload._state.maxCount = 2;
    const rejectedType = typedFile("invalid.txt", "text/plain");
    const oversized = typedFile("large.png", "image/png", 2048);
    const extension = typedFile("upper.PnG", "");
    const mime = typedFile("document", "application/pdf");
    const wildcard = typedFile("song.bin", "audio/mpeg");
    const files = [rejectedType, oversized, extension, mime, wildcard];
    if (input === "select") select(upload, ...files);
    else upload._onDrop({ preventDefault() {}, dataTransfer: { files } });
    assert.deepEqual(names(upload), ["upper.PnG", "document"]);
    const errors = upload.events.filter((event) => event.type === "error");
    assert.equal(errors.length, 2);
    assert.deepEqual(Array.from(errors[0].detail.files), [rejectedType]);
    assert.deepEqual(Array.from(errors[1].detail.files), [oversized]);
    assert.deepEqual(
      Array.from(upload.events.find((event) => event.type === "exceed").detail.files),
      [wildcard],
    );
  });
}

test("blank MIME does not satisfy a MIME-only rule and invalid accept rules do not reject everything", () => {
  const upload = createUpload();
  upload._state.accept = "image/*";
  select(upload, typedFile("missing-type.png", ""));
  assert.equal(upload.fileList.length, 0);
  upload._state.accept = "not-a-rule, */*, image";
  select(upload, file("allowed.txt"));
  assert.deepEqual(names(upload), ["allowed.txt"]);
});

function fireRequestTimer(id) {
  const timer = requestTimers.get(id);
  assert.ok(timer);
  requestTimers.delete(id);
  timer.callback();
}

for (const mode of ["xhr", "custom"]) {
  test(`${mode} timeout cancels the request and ignores its eventual completion`, async () => {
    const upload = createPictureUpload();
    attachAttributeLifecycle(upload);
    upload.timeout = 80;
    let options, complete;
    if (mode === "custom")
      upload.customRequest = (value) => {
        options = value;
        return new Promise((resolve) => {
          complete = resolve;
        });
      };
    const before = new Set(requestTimers.keys());
    select(upload, file("timeout.png"));
    const timerId = [...requestTimers.keys()].find((id) => !before.has(id));
    assert.ok(timerId);
    assert.equal(requestTimers.get(timerId).ms, 80);
    if (mode === "xhr") assert.equal(latestRequest().timeout, 80);
    fireRequestTimer(timerId);
    await flush();
    assert.equal(upload.fileList[0].status, "fail");
    assert.equal(upload._requests.size, 0);
    if (mode === "xhr") assert.equal(latestRequest().aborted, true);
    else assert.equal(options.signal.aborted, true);
    const error = upload.events.find((event) => event.type === "error");
    assert.equal(error.detail.phase, "upload");
    assert.match(error.detail.message, /超时/);
    const eventCount = upload.events.length;
    if (mode === "custom") complete({ response: { url: "/late.png" } });
    else latestRequest().respond(200, '{"url":"/late.png"}');
    await flush();
    assert.equal(upload.events.length, eventCount);
    assert.equal(requestTimers.has(timerId), false);
    upload.beforeDestroy();
  });
}

for (const finish of ["success", "failure", "abort", "remove", "clear", "destroy"]) {
  test(`request timeout timer is cleared after ${finish}`, async () => {
    const upload = createPictureUpload();
    attachAttributeLifecycle(upload);
    upload.timeout = 100;
    const before = new Set(requestTimers.keys());
    select(upload, file("cleanup.png"));
    const id = [...requestTimers.keys()].find((key) => !before.has(key));
    assert.ok(id);
    if (finish === "success") latestRequest().respond(200, '{"url":"/done.png"}');
    if (finish === "failure") latestRequest().reject();
    if (finish === "abort") upload.abort();
    if (finish === "remove") upload.handleRemove(upload.fileList[0]);
    if (finish === "clear") upload.clearFiles();
    if (finish === "destroy") upload.beforeDestroy();
    await flush();
    assert.equal(requestTimers.has(id), false);
    upload.beforeDestroy();
  });
}

test("request timeout stops before asynchronous response parsing begins", async () => {
  const upload = createPictureUpload();
  attachAttributeLifecycle(upload);
  upload.timeout = 50;
  let parse;
  upload.parseResponse = () =>
    new Promise((resolve) => {
      parse = resolve;
    });
  const before = new Set(requestTimers.keys());
  select(upload, file("parse.png"));
  const id = [...requestTimers.keys()].find((key) => !before.has(key));
  const staleTimer = requestTimers.get(id).callback;
  latestRequest().respond(200, "{}");
  await flush();
  assert.equal(requestTimers.has(id), false);
  staleTimer();
  assert.equal(upload.fileList[0].status, "uploading");
  assert.equal(upload.events.filter((event) => event.type === "error").length, 0);
  parse("/parsed.png");
  await flush();
  assert.equal(upload.fileList[0].status, "success");
  upload.beforeDestroy();
});

test("zero timeout leaves requests unlimited and schedules no timeout task", () => {
  const upload = createPictureUpload();
  assert.equal(upload.timeout, 0);
  const count = requestTimers.size;
  select(upload, file("unlimited.png"));
  assert.equal(latestRequest().timeout, 0);
  assert.equal(requestTimers.size, count);
  upload.beforeDestroy();
});

test("request headers reject malformed names and line breaks and records are copied on assignment", () => {
  const upload = createUpload();
  for (const headers of [
    { "bad name": "value" },
    { "": "value" },
    { token: "line\r\nInjected: true" },
    { token: "nul\0byte" },
  ]) {
    assert.throws(
      () => {
        upload.headers = headers;
      },
      { name: "TypeError" },
    );
  }
  const originalHeaders = { "X-Token": "initial" };
  const originalData = { count: 1 };
  upload.headers = originalHeaders;
  upload.data = originalData;
  originalHeaders["X-Token"] = "changed";
  originalData.count = 99;
  assert.equal(upload.headers["X-Token"], "initial");
  assert.equal(upload.data.count, 1);
  const nullPrototype = Object.create(null);
  nullPrototype.allowed = "value";
  upload.headers = nullPrototype;
  assert.equal(upload.headers.allowed, "value");
});

for (const result of ["resolve", "reject", "throw", "sync"]) {
  test(`custom ${result} completion releases its request timeout timer`, async () => {
    const upload = createPictureUpload();
    attachAttributeLifecycle(upload);
    upload.timeout = 100;
    upload.customRequest = () => {
      if (result === "throw") throw new Error("custom failure");
      if (result === "reject") return Promise.reject(new Error("custom failure"));
      const response = { response: { url: "/custom.png" } };
      return result === "sync" ? response : Promise.resolve(response);
    };
    const before = requestTimers.size;
    select(upload, file("custom.png"));
    await flush();
    assert.equal(requestTimers.size, before);
    assert.equal(upload._requests.size, 0);
    assert.equal(
      upload.fileList[0].status,
      ["resolve", "sync"].includes(result) ? "success" : "fail",
    );
    upload.beforeDestroy();
  });
}

test("native XHR timeout clears the shared timeout before its stale callback can report again", async () => {
  const upload = createPictureUpload();
  attachAttributeLifecycle(upload);
  upload.timeout = 100;
  const before = new Set(requestTimers.keys());
  select(upload, file("native-timeout.png"));
  const id = [...requestTimers.keys()].find((key) => !before.has(key));
  const callback = requestTimers.get(id).callback;
  latestRequest().fire("timeout");
  await flush();
  assert.equal(requestTimers.has(id), false);
  assert.equal(upload.events.filter((event) => event.type === "error").length, 1);
  callback();
  assert.equal(upload.events.filter((event) => event.type === "error").length, 1);
  upload.beforeDestroy();
});