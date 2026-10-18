// server.ts
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const PORT = 3000;
const UPLOAD_DIR = path.resolve("D:\\tmp", "uploads");
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// ---------- 工具 ----------
const IMAGE_EXTS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".webp",
  ".bmp",
  ".svg",
  ".ico",
  ".avif",
]);
const MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".bmp": "image/bmp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".avif": "image/avif",
  ".pdf": "application/pdf",
  ".txt": "text/plain",
  ".json": "application/json",
  ".mp4": "video/mp4",
  ".mp3": "audio/mpeg",
  ".zip": "application/zip",
};

function cors(req: http.IncomingMessage, res: http.ServerResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    req.headers["access-control-request-headers"] || "*",
  );
  res.setHeader("Access-Control-Expose-Headers", "*");
  res.setHeader("Access-Control-Max-Age", "86400");
}

const json = (res: http.ServerResponse, code: number, obj: unknown) => {
  res.writeHead(code, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(obj));
};

const readBody = (req: http.IncomingMessage): Promise<Buffer> =>
  new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });

// 极简 multipart 解析（够调试用）
function parseMultipart(body: Buffer, boundary: string) {
  const result: { name?: string; filename?: string; data: Buffer }[] = [];
  const delim = Buffer.from("--" + boundary);
  let pos = body.indexOf(delim);
  while (pos !== -1) {
    const next = body.indexOf(delim, pos + delim.length);
    if (next === -1) break;
    let part = body.subarray(pos + delim.length, next);
    if (part[0] === 0x0d && part[1] === 0x0a) part = part.subarray(2);
    const headerEnd = part.indexOf("\r\n\r\n");
    if (headerEnd !== -1) {
      const headers = part.subarray(0, headerEnd).toString("utf8");
      let data = part.subarray(headerEnd + 4);
      if (data.length >= 2 && data[data.length - 2] === 0x0d && data[data.length - 1] === 0x0a) {
        data = data.subarray(0, data.length - 2);
      }
      result.push({
        name: headers.match(/name="([^"]*)"/i)?.[1],
        filename: headers.match(/filename="([^"]*)"/i)?.[1],
        data,
      });
    }
    pos = next;
  }
  return result;
}

// ---------- 上传 ----------
async function handleUpload(req: http.IncomingMessage, res: http.ServerResponse) {
  const body = await readBody(req);
  const ct = String(req.headers["content-type"] || "");
  let filename = "file";
  let data = body;

  if (ct.startsWith("multipart/form-data")) {
    const boundary = ct
      .match(/boundary=(?:"([^"]+)"|([^;]+))/)
      ?.slice(1)
      .find(Boolean);
    if (!boundary) return json(res, 400, { ok: false, error: "no boundary" });
    const parts = parseMultipart(body, boundary);
    const file = parts.find((p) => p.filename);
    if (!file || !file.data.length) return json(res, 400, { ok: false, error: "no file field" });
    filename = file.filename!;
    data = file.data;
  } else {
    // 原始二进制上传：靠 X-Filename 头传文件名
    filename = decodeURIComponent(String(req.headers["x-filename"] || "file"));
  }

  const ext = path.extname(filename).toLowerCase();
  const base = (path.basename(filename, path.extname(filename)) || "file")
    .replace(/[^\w\-. ]/g, "_")
    .slice(0, 60);
  const hash = crypto.createHash("md5").update(data).digest("hex").slice(0, 10);
  const storedName = `${base}_${Date.now()}_${hash}${ext}`;

  fs.writeFileSync(path.join(UPLOAD_DIR, storedName), data);

  json(res, 200, {
    ok: true,
    name: storedName,
    size: data.length,
    hash,
    url: `/files/${encodeURIComponent(storedName)}`,
  });
}

// ---------- 读取 / 预览 / 下载 ----------
function handleFile(req: http.IncomingMessage, res: http.ServerResponse, rawName: string) {
  const safe = path.basename(rawName); // 防目录穿越
  const filePath = path.join(UPLOAD_DIR, safe);
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    return json(res, 404, { ok: false, error: "file not found" });
  }

  const ext = path.extname(safe).toLowerCase();
  const isImage = IMAGE_EXTS.has(ext);
  const stat = fs.statSync(filePath);

  res.setHeader("Content-Type", MIME[ext] || "application/octet-stream");
  res.setHeader("Content-Length", stat.size);
  res.setHeader(
    "Content-Disposition",
    `${isImage ? "inline" : "attachment"}; filename*=UTF-8''${encodeURIComponent(safe)}`,
  );

  fs.createReadStream(filePath).pipe(res);
}

// ---------- 路由 ----------
const server = http.createServer(async (req, res) => {
  cors(req, res);

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  const url = new URL(req.url || "/", `http://${req.headers.host}`);

  try {
    if (req.method === "POST" && url.pathname === "/upload") {
      await handleUpload(req, res);
    } else if (req.method === "GET" && url.pathname.startsWith("/files/")) {
      handleFile(req, res, decodeURIComponent(url.pathname.slice("/files/".length)));
    } else {
      json(res, 200, {
        ok: true,
        hint: "POST /upload (multipart 或 raw+X-Filename) | GET /files | GET /files/:name",
      });
    }
  } catch (e: any) {
    if (!res.headersSent) json(res, 500, { ok: false, error: e?.message || String(e) });
  }
});

server.listen(PORT, () => {
  console.log(`upload server: http://localhost:${PORT}`);
  console.log(`upload dir   : ${UPLOAD_DIR}`);
});