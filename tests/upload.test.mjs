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
  appendChild(child) {
    child.parent = this;
    this.children.push(child);
  }
  remove() {
    this.parent.children = this.parent.children.filter((child) => child !== this);
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
    off() {},
    on() {},
    AbortController,
    WeakRef,
    document: { baseURI: "https://docs.example.com/components/upload" },
    removeClass() {},
    $one: (selector, root) => root.querySelector(selector),
    $$: (tag, attrs) => new ElementStub(tag, attrs),
    formatClass: (classes) => classes.filter(Boolean).join(" "),
    kebabToCamel: (name) => name.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase()),
    parseAttrValue: (value, fallback) => (value == null ? fallback : value !== "false"),
    XMLHttpRequest: XHRStub,
    DOMException,
    FormData,
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
  assert.ok(bar.class.includes("l-upload-progress--indeterminate"));
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