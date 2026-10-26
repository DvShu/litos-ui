import assert from "node:assert/strict";
import { mkdtemp, readdir, readFile, rm } from "node:fs/promises";
import { request } from "node:http";
import { tmpdir } from "node:os";
import { basename, dirname, join, resolve } from "node:path";
import { test } from "node:test";
import { createUploadServer } from "../scripts/upload-server.mjs";

async function fixture(t, options = {}) {
  const parent = resolve(tmpdir());
  const directory = await mkdtemp(join(parent, "litos-upload-test-"));
  const server = createUploadServer({ uploadDir: directory, ...options });
  await new Promise((done) => server.listen(0, "127.0.0.1", done));
  t.after(async () => {
    await new Promise((done) => {
      server.close(done);
      server.closeAllConnections();
    });
    // 递归删除前确认目标仍是本测试创建的临时目录，而非临时根目录。
    if (
      dirname(resolve(directory)) !== parent ||
      !basename(directory).startsWith("litos-upload-test-")
    ) {
      throw new Error("拒绝删除非测试临时目录");
    }
    await rm(directory, { recursive: true, force: true });
  });
  return { server, directory, base: `http://127.0.0.1:${server.address().port}` };
}

const png = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a5WQAAAAASUVORK5CYII=",
  "base64",
);
function body(name = "图片.png", bytes = png) {
  const form = new FormData();
  form.append("file", new File([bytes], name));
  return form;
}

test("uploads multipart binary file, returns a direct URL, persists bytes and supports GET/HEAD", async (t) => {
  const { base, directory } = await fixture(t);
  const form = body();
  form.append("source", "litos-ui");
  const result = await fetch(`${base}/upload`, {
    method: "POST",
    body: form,
    headers: { Origin: "http://localhost:5173", Host: "untrusted.example" },
  });
  assert.equal(result.status, 200);
  assert.equal(result.headers.get("access-control-allow-origin"), "http://localhost:5173");
  assert.equal(result.headers.get("access-control-allow-credentials"), "true");
  const data = await result.json();
  assert.equal(data.url, data.data.url);
  assert.equal(new URL(data.url).origin, base);
  assert.equal(data.data.name, "图片.png");
  assert.equal(data.data.fields.source, "litos-ui");
  const files = await readdir(directory);
  assert.equal(files.length, 1);
  assert.deepEqual(await readFile(join(directory, files[0])), png);
  const preview = await fetch(data.url);
  assert.equal(preview.headers.get("content-type"), "image/png");
  assert.equal(preview.headers.get("x-content-type-options"), "nosniff");
  assert.deepEqual(Buffer.from(await preview.arrayBuffer()), png);
  const head = await fetch(data.url, { method: "HEAD" });
  assert.equal(head.status, 200);
  assert.equal(Number(head.headers.get("content-length")), png.length);
  assert.equal((await head.arrayBuffer()).byteLength, 0);
});

test("CORS preflight accepts custom authorization headers and credentials", async (t) => {
  const { base } = await fixture(t);
  const result = await fetch(`${base}/upload`, {
    method: "OPTIONS",
    headers: {
      Origin: "http://127.0.0.1:5173",
      "Access-Control-Request-Method": "POST",
      "Access-Control-Request-Headers": "authorization,x-token,content-type",
    },
  });
  assert.equal(result.status, 204);
  assert.equal(result.headers.get("access-control-allow-origin"), "http://127.0.0.1:5173");
  assert.equal(
    result.headers.get("access-control-allow-headers"),
    "authorization,x-token,content-type",
  );
  assert.ok(result.headers.get("access-control-allow-methods").includes("POST"));
});

test("ordinary files and SVG are stored but served as attachments", async (t) => {
  const { base } = await fixture(t);
  for (const name of ["test.txt", "image.svg", "page.html"]) {
    const result = await fetch(`${base}/upload`, {
      method: "POST",
      body: body(name, Buffer.from("<script>alert(1)</script>")),
    });
    const data = await result.json();
    const download = await fetch(data.url);
    assert.equal(download.headers.get("content-type"), "application/octet-stream");
    assert.ok(download.headers.get("content-disposition").startsWith("attachment"));
    await download.arrayBuffer();
  }
});

test("generated names prevent overwrite and traversal", async (t) => {
  const { base, directory } = await fixture(t);
  const urls = [];
  for (let index = 0; index < 2; index++) {
    const response = await fetch(`${base}/upload`, {
      method: "POST",
      body: body("../../same.png"),
    });
    urls.push((await response.json()).url);
  }
  assert.notEqual(urls[0], urls[1]);
  assert.equal((await readdir(directory)).length, 2);
  assert.equal((await fetch(`${base}/files/%2e%2e%2fsecret.png`)).status, 404);
});

test("invalid multipart, missing files and duplicate files do not persist content", async (t) => {
  const { base, directory } = await fixture(t);
  const missing = new FormData();
  missing.append("name", "no file");
  const duplicates = body();
  duplicates.append("file", new File([png], "second.png"));
  for (const form of [missing, duplicates]) {
    assert.equal((await fetch(`${base}/upload`, { method: "POST", body: form })).status, 400);
  }
  assert.equal(
    (
      await fetch(`${base}/upload`, {
        method: "POST",
        body: "broken",
        headers: { "Content-Type": "multipart/form-data; boundary=x" },
      })
    ).status,
    400,
  );
  assert.equal((await fetch(`${base}/upload`, { method: "POST", body: "text" })).status, 415);
  assert.equal((await fetch(`${base}/upload`)).status, 405);
  assert.deepEqual(await readdir(directory), []);
});

test("file and request size limits reject uploads without leftover files", async (t) => {
  const { base, directory } = await fixture(t, { maxFileSize: 8, maxBodySize: 2048 });
  assert.equal(
    (await fetch(`${base}/upload`, { method: "POST", body: body("big.png", Buffer.alloc(9)) }))
      .status,
    413,
  );
  assert.equal(
    (await fetch(`${base}/upload`, { method: "POST", body: body("big.png", Buffer.alloc(3000)) }))
      .status,
    413,
  );
  assert.deepEqual(await readdir(directory), []);
});

test("request size is enforced for chunked bodies without Content-Length", async (t) => {
  const { base } = await fixture(t, { maxBodySize: 100 });
  const status = await new Promise((resolveStatus, reject) => {
    const req = request(
      `${base}/upload`,
      { method: "POST", headers: { "Content-Type": "multipart/form-data; boundary=x" } },
      (res) => {
        res.resume();
        res.on("end", () => resolveStatus(res.statusCode));
      },
    );
    req.on("error", reject);
    req.end(Buffer.alloc(200));
  });
  assert.equal(status, 413);
});

test("interrupted request releases its upload slot and leaves the service operational", async (t) => {
  const { base, directory, server } = await fixture(t, { maxConcurrentUploads: 1 });
  let rejectIncoming;
  const incoming = new Promise((done, reject) => {
    rejectIncoming = reject;
    server.once("request", done);
  });
  const req = request(`${base}/upload`, {
    method: "POST",
    headers: { "Content-Type": "multipart/form-data; boundary=x" },
  });
  req.on("error", rejectIncoming);
  req.write("--x\r\n");
  const serverRequest = await incoming;
  const closed = new Promise((done) => serverRequest.once("close", done));
  req.destroy();
  await closed;
  assert.equal((await fetch(`${base}/health`)).status, 200);
  assert.deepEqual(await readdir(directory), []);
  assert.equal((await fetch(`${base}/upload`, { method: "POST", body: body() })).status, 200);
});