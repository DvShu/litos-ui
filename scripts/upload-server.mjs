import { randomUUID } from "node:crypto";
import { createReadStream, createWriteStream } from "node:fs";
import { lstat, mkdir, rename, unlink } from "node:fs/promises";
import { createServer } from "node:http";
import { basename, extname, join, resolve } from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { pathToFileURL } from "node:url";

const MiB = 1024 * 1024;
const imageTypes = new Map([
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".gif", "image/gif"],
  [".webp", "image/webp"],
  [".avif", "image/avif"],
  [".bmp", "image/bmp"],
  [".ico", "image/x-icon"],
]);
const storedName =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}(?:\.[a-z0-9]{1,10})?$/;

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

function json(response, status, value) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(value));
}

function readBody(request, limit, signal) {
  return new Promise((resolveBody, reject) => {
    let chunks = [],
      size = 0;
    const cleanup = () => {
      request.off("data", data);
      request.off("end", end);
      request.off("error", error);
      request.off("aborted", aborted);
      signal.removeEventListener("abort", aborted);
    };
    const error = (cause) => {
      cleanup();
      chunks = [];
      reject(cause);
    };
    const aborted = () => error(new HttpError(400, "上传已取消或超时"));
    const data = (chunk) => {
      size += chunk.length;
      if (size > limit) {
        error(new HttpError(413, "请求体过大"));
        request.resume();
      } else chunks.push(chunk);
    };
    const end = () => {
      cleanup();
      resolveBody(Buffer.concat(chunks, size));
      chunks = [];
    };
    if (signal.aborted) {
      aborted();
      return;
    }
    request.on("data", data);
    request.once("end", end);
    request.once("error", error);
    request.once("aborted", aborted);
    signal.addEventListener("abort", aborted, { once: true });
  });
}

/** 原生 Node.js 临时测试服务；工厂允许测试使用独立目录及随机端口。 */
export function createUploadServer({
  uploadDir = "D:\\tmp\\upload",
  maxFileSize = 20 * MiB,
  maxBodySize = 25 * MiB,
  maxConcurrentUploads = 4,
} = {}) {
  const directory = resolve(uploadDir);
  let activeUploads = 0;
  const server = createServer({ maxHeaderSize: 16 * 1024 }, async (request, response) => {
    // 客户端中断时 IncomingMessage 仍可能在 aborted 后发出 error。
    request.on("error", () => {});
    const origin = request.headers.origin;
    response.setHeader("Access-Control-Allow-Origin", origin || "*");
    response.setHeader("Vary", "Origin");
    if (origin) response.setHeader("Access-Control-Allow-Credentials", "true");
    response.setHeader("Access-Control-Allow-Methods", "POST, GET, HEAD, OPTIONS");
    response.setHeader(
      "Access-Control-Allow-Headers",
      request.headers["access-control-request-headers"] || "Content-Type, Authorization, X-Token",
    );
    response.setHeader("Access-Control-Max-Age", "600");
    response.setHeader("X-Content-Type-Options", "nosniff");
    response.setHeader("Cache-Control", "no-store");
    // 不使用客户端 Host 头生成地址，避免返回被伪造的文件链接。
    const baseUrl = `http://127.0.0.1:${request.socket.localPort}`;
    let release = () => {};
    try {
      const { pathname } = new URL(request.url, baseUrl);
      if (request.method === "OPTIONS") {
        response.writeHead(204);
        response.end();
        return;
      }
      if (request.method === "GET" && pathname === "/health") {
        json(response, 200, { status: "ok", uploadUrl: `${baseUrl}/upload`, maxFileSize });
        return;
      }
      if (["GET", "HEAD"].includes(request.method) && pathname.startsWith("/files/")) {
        const name = pathname.slice("/files/".length);
        if (!storedName.test(name)) throw new HttpError(404, "文件不存在");
        const filePath = join(directory, name);
        const info = await lstat(filePath).catch(() => {
          throw new HttpError(404, "文件不存在");
        });
        if (!info.isFile() || info.isSymbolicLink()) throw new HttpError(404, "文件不存在");
        const type = imageTypes.get(extname(name)) || "application/octet-stream";
        response.writeHead(200, {
          "Content-Type": type,
          "Content-Length": info.size,
          "Content-Disposition": `${type.startsWith("image/") ? "inline" : "attachment"}; filename="${name}"`,
        });
        if (request.method === "HEAD") response.end();
        else await pipeline(createReadStream(filePath), response);
        return;
      }
      if (pathname !== "/upload") throw new HttpError(404, "接口不存在");
      if (request.method !== "POST")
        throw new HttpError(405, "请使用 POST multipart/form-data 上传");
      if (activeUploads >= maxConcurrentUploads) throw new HttpError(503, "上传繁忙，请稍后重试");
      activeUploads++;
      const controller = new AbortController();
      const close = () => {
        if (!response.writableFinished) controller.abort();
      };
      const timer = setTimeout(() => controller.abort(), 30_000);
      timer.unref();
      response.once("close", close);
      release = () => {
        activeUploads--;
        clearTimeout(timer);
        response.off("close", close);
      };
      const contentType = request.headers["content-type"] || "";
      if (!/^multipart\/form-data\s*;/i.test(contentType))
        throw new HttpError(415, "需要 multipart/form-data 请求体");
      if (
        request.headers["content-encoding"] &&
        request.headers["content-encoding"] !== "identity"
      ) {
        throw new HttpError(415, "不支持压缩的请求体");
      }
      if (Number(request.headers["content-length"]) > maxBodySize)
        throw new HttpError(413, "请求体过大");
      const body = await readBody(request, maxBodySize, controller.signal);
      let form;
      try {
        // 仅使用 Node.js 自带的 Web API 解析 multipart，不自行分割二进制边界。
        form = await new Request(`${baseUrl}/upload`, {
          method: "POST",
          headers: { "Content-Type": contentType },
          body,
          signal: controller.signal,
        }).formData();
      } catch {
        throw new HttpError(400, "multipart 请求体无效");
      }
      const files = form.getAll("file");
      if (files.length !== 1 || !(files[0] instanceof File))
        throw new HttpError(400, "需要且仅允许一个 file 文件字段");
      const file = files[0];
      if (file.size > maxFileSize) throw new HttpError(413, "单个文件不能超过大小限制");
      const fields = Object.create(null);
      let count = 0;
      for (const [key, value] of form) {
        if (key === "file") continue;
        if (++count > 32 || typeof value !== "string" || value.length > 64 * 1024) {
          throw new HttpError(400, "附加表单字段过多、过大或含额外文件");
        }
        fields[key] = value;
      }
      const name = basename(file.name.replaceAll("\\", "/"));
      const originalExtension = extname(name).toLowerCase();
      const extension = /^\.[a-z0-9]{1,10}$/.test(originalExtension) ? originalExtension : "";
      const savedName = `${randomUUID()}${extension}`;
      const temporaryPath = join(directory, `.${savedName}.part`);
      const targetPath = join(directory, savedName);
      await mkdir(directory, { recursive: true });
      try {
        await pipeline(
          Readable.fromWeb(file.stream()),
          createWriteStream(temporaryPath, { flags: "wx" }),
          { signal: controller.signal },
        );
        controller.signal.throwIfAborted();
        await rename(temporaryPath, targetPath);
      } catch (error) {
        await unlink(temporaryPath).catch(() => {});
        throw error;
      }
      const url = `${baseUrl}/files/${savedName}`;
      json(response, 200, {
        status: "success",
        url,
        data: {
          url,
          name,
          size: file.size,
          type: imageTypes.get(extension) || "application/octet-stream",
          fields,
        },
      });
    } catch (error) {
      if (!response.headersSent && !response.destroyed) {
        response.setHeader("Connection", "close");
        json(response, error instanceof HttpError ? error.status : 500, {
          status: "error",
          message: error instanceof HttpError ? error.message : "上传服务处理失败",
        });
      } else response.destroy();
      request.resume();
    } finally {
      release();
    }
  });
  server.requestTimeout = 60_000;
  server.headersTimeout = 15_000;
  return server;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const port = Number(process.env.UPLOAD_PORT || 3001);
  if (!Number.isInteger(port) || port < 1 || port > 65535)
    throw new Error("UPLOAD_PORT 必须是 1～65535 的整数");
  const uploadDir = resolve(process.env.UPLOAD_DIR || "D:\\tmp\\upload");
  await mkdir(uploadDir, { recursive: true });
  const server = createUploadServer({ uploadDir });
  server.on("error", (error) => {
    console.error(`上传服务启动失败: ${error.message}`);
    process.exitCode = 1;
  });
  server.listen(port, "127.0.0.1", () => {
    console.log(`上传接口: http://127.0.0.1:${port}/upload`);
    console.log(`健康检查: http://127.0.0.1:${port}/health`);
    console.log(`文件目录: ${uploadDir}`);
  });
}