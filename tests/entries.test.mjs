import assert from "node:assert/strict";
import { test, after } from "node:test";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  mkdtempSync,
  cpSync,
  rmSync,
  existsSync,
  realpathSync,
  readdirSync,
} from "node:fs";
import path from "node:path";
import os from "node:os";
import { gzipSync } from "node:zlib";
import { build } from "vite";

const require = createRequire(import.meta.url);
const workspace = process.cwd();
const temp = mkdtempSync(path.join(os.tmpdir(), "litos-entries-"));
const consumer = path.join(temp, "consumer");
mkdirSync(path.join(consumer, "node_modules/litos-ui"), { recursive: true });
writeFileSync(
  path.join(consumer, "package.json"),
  JSON.stringify({ name: "litos-consumer", type: "module" }),
);
after(() => {
  assert(path.resolve(temp).startsWith(path.resolve(os.tmpdir()) + path.sep));
  rmSync(temp, { recursive: true, force: true });
});
const args = ["pack", "--ignore-scripts", "--json", "--pack-destination", temp];
const npmCli = path.join(path.dirname(process.execPath), "node_modules/npm/bin/npm-cli.js");
const packed = JSON.parse(
  process.platform === "win32"
    ? execFileSync(process.execPath, [npmCli, ...args], {
        encoding: "utf8",
        env: { ...process.env, npm_config_cache: path.join(temp, "npm-cache") },
      })
    : execFileSync("npm", args, {
        encoding: "utf8",
        env: { ...process.env, npm_config_cache: path.join(temp, "npm-cache") },
      }),
)[0];
const packageRoot = path.join(consumer, "node_modules/litos-ui");
execFileSync("tar", [
  "-xf",
  path.join(temp, packed.filename),
  "-C",
  packageRoot,
  "--strip-components=1",
]);
const pkg = JSON.parse(readFileSync(path.join(packageRoot, "package.json"), "utf8"));
for (const dep of Object.keys(pkg.dependencies)) {
  cpSync(
    realpathSync(path.join(workspace, "node_modules", dep)),
    path.join(consumer, "node_modules", dep),
    { recursive: true, dereference: true },
  );
}
// Expand canonical subpaths from the actual tarball, not workspace aliases.
const publicEntries = readdirSync(path.join(packageRoot, "lib/entries"))
  .filter((file) => file.endsWith(".js"))
  .map((file) => {
    const name = file.slice(0, -3);
    const icon = name.startsWith("icon-");
    const key = `./${icon ? name.replace(/^icon-/, "icon/") : name}`;
    const pattern = icon ? "./icon/*" : "./*";
    const mapping = pkg.exports[key] ?? pkg.exports[pattern];
    assert(mapping, `Missing exports mapping: ${key}`);
    const wildcard = icon ? name.slice(5) : name;
    return [
      key,
      {
        import: mapping.import.replace("*", wildcard),
        types: mapping.types.replace("*", wildcard),
      },
    ];
  });

test("published entries and declarations exist with exact case and no source aliases", () => {
  assert.equal(publicEntries.length, 90);
  for (const [key, target] of publicEntries) {
    assert.match(key, /^\.\/[a-z0-9/-]+$/);
    for (const value of [target.import, target.types]) {
      const full = path.join(packageRoot, value);
      assert(existsSync(full), value);
      let current = packageRoot;
      for (const part of value.slice(2).split("/")) {
        assert(require("node:fs").readdirSync(current).includes(part), value);
        current = path.join(current, part);
      }
    }
  }
  assert(packed.files.every((file) => !file.path.startsWith("src/")));
  for (const file of packed.files.filter(
    (file) => file.path.startsWith("lib/") && file.path.endsWith(".js"),
  )) {
    const source = readFileSync(path.join(packageRoot, file.path), "utf8");
    for (const match of source.matchAll(/(?:from\s*|import\s*)["'](\.[^"']+)["']/g)) {
      const target = path.resolve(packageRoot, path.dirname(file.path), match[1]);
      const relative = path.relative(packageRoot, target);
      assert(!relative.startsWith(".."), file.path);
      let current = packageRoot;
      for (const part of relative.split(path.sep)) {
        assert(require("node:fs").readdirSync(current).includes(part), `${file.path}: ${match[1]}`);
        current = path.join(current, part);
      }
    }
  }
});

const results = {};
async function bundle(name, source) {
  const entry = path.join(consumer, `${name}.js`);
  writeFileSync(entry, source);
  const result = await build({
    configFile: false,
    root: consumer,
    logLevel: "silent",
    build: { write: false, minify: true, lib: { entry, formats: ["es"] } },
  });
  const outputs = (Array.isArray(result) ? result[0] : result).output;
  const chunks = outputs.filter((item) => item.type === "chunk");
  const code = chunks.map((item) => item.code).join("\n");
  const modules = chunks
    .flatMap((item) => Object.keys(item.modules))
    .map((id) => id.replaceAll("\\", "/"));
  results[name] = { bytes: Buffer.byteLength(code), gzip: gzipSync(code).length };
  return { modules, code, outputs };
}
function excludes(result, names) {
  for (const name of names)
    assert(!result.modules.some((id) => id.includes(`/lib/${name}/`)), `${name} retained`);
}
test("production consumer keeps explicit registration and excludes unrelated components", async () => {
  const only = await bundle("button", 'import "litos-ui/button";');
  assert(only.modules.some((id) => id.endsWith("/lib/entries/button.js")));
  assert(!only.modules.some((id) => id.endsWith("/lib/icon/loading.js")));
  const loadingButton = await bundle(
    "button-loading",
    'import "litos-ui/icon/loading"; import "litos-ui/button";',
  );
  assert(loadingButton.modules.some((id) => id.endsWith("/lib/icon/loading.js")));
  excludes(loadingButton, ["upload", "table", "select", "notification", "qrcode"]);
  excludes(only, ["upload", "table", "select", "notification", "qrcode"]);
  assert(!only.code.includes("l-notification"));
  const two = await bundle("two", 'import "litos-ui/button"; import "litos-ui/input";');
  excludes(two, ["upload", "select", "table"]);
  assert(!two.modules.some((id) => id.endsWith("/lib/icon/close_filled.js")));
  const clearInput = await bundle(
    "clear-input",
    'import "litos-ui/icon/close-filled"; import "litos-ui/input";',
  );
  assert(clearInput.modules.some((id) => id.endsWith("/lib/icon/close_filled.js")));
  excludes(clearInput, ["button", "upload", "table", "select"]);
  const composite = await bundle("select", 'import "litos-ui/select";');
  excludes(composite, ["button", "upload", "table"]);
  const upload = await bundle("upload", 'import "litos-ui/upload";');
  for (const dependency of ["icon-eye-outline", "icon-delete", "image-preview"]) {
    assert(
      !upload.modules.some((id) => id.endsWith(`/lib/entries/${dependency}.js`)),
      `Unexpected optional Upload dependency: ${dependency}`,
    );
  }
  const previewUpload = await bundle(
    "upload-preview",
    'import "litos-ui/image-preview"; import "litos-ui/icon/picture"; import "litos-ui/icon/eye-outline"; import "litos-ui/icon/delete"; import "litos-ui/upload";',
  );
  for (const dependency of ["icon-eye-outline", "icon-delete", "image-preview"]) {
    assert(
      previewUpload.modules.some((id) => id.endsWith(`/lib/entries/${dependency}.js`)),
      `Upload dependency missing: ${dependency}`,
    );
  }
  excludes(upload, ["button", "select", "table", "notification", "qrcode"]);
  excludes(previewUpload, ["button", "select", "table", "notification", "qrcode"]);
  const service = await bundle(
    "service",
    'import ModalBox from "litos-ui/modal-box"; globalThis.api = ModalBox;',
  );
  excludes(service, ["upload", "table", "qrcode"]);
  const utils = await bundle(
    "utils",
    'import { kebabToCamel } from "litos-ui/utils"; globalThis.result = kebabToCamel("a-b");',
  );
  assert(!utils.modules.some((id) => /\/lib\/(?:base|entries\/button)\.js$/.test(id)));
  const named = await bundle("named", 'import { Button, regist } from "litos-ui"; regist(Button);');
  excludes(named, ["upload", "table", "notification", "select"]);
  const all = await bundle(
    "all",
    'import * as ui from "litos-ui"; for (const value of Object.values(ui)) if(value?.baseName) ui.regist(value);',
  );
  assert(only.code.length < all.code.length / 2);
  const css = await bundle("css", 'import "litos-ui/styles/vars.css"; import "litos-ui/button";');
  assert(css.outputs.some((item) => item.type === "asset" && item.fileName.endsWith(".css")));
  console.log("Consumer bytes / gzip:", results);
});

test("all published subpaths type-check, including default classes, services and public types", () => {
  const source =
    publicEntries.map(([key]) => `import "litos-ui/${key.slice(2)}";`).join("\n") +
    `
import Button from "litos-ui/button";
import Base from "litos-ui/base";
import Message from "litos-ui/message";
import { type UploadFile } from "litos-ui/upload";
import { type Column } from "litos-ui/table";
const ctor: typeof HTMLElement = Button;
const base: typeof HTMLElement = Base;
const upload: UploadFile[] = [];
const columns: Column[] = [];
void [ctor, base, upload, columns, Message.success];
`;
  writeFileSync(path.join(consumer, "index.ts"), source);
  writeFileSync(
    path.join(consumer, "tsconfig.json"),
    JSON.stringify({
      compilerOptions: {
        target: "ESNext",
        module: "ESNext",
        moduleResolution: "bundler",
        strict: true,
        noEmit: true,
        skipLibCheck: false,
        noUncheckedSideEffectImports: true,
      },
      files: ["index.ts"],
    }),
  );
  try {
    execFileSync(
      process.execPath,
      [
        path.join(workspace, "node_modules/typescript/bin/tsc"),
        "-p",
        path.join(consumer, "tsconfig.json"),
      ],
      { encoding: "utf8" },
    );
  } catch (error) {
    throw new Error(error.stdout || error.message);
  }
});