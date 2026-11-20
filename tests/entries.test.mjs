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
import { runBrowserFixture } from "../scripts/browser-fixture.mjs";

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
for (const dep of [...Object.keys(pkg.dependencies), "preact"]) {
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
  const expected = readdirSync(path.join(workspace, "src/components/entries"))
    .filter((file) => file.endsWith(".ts") && !file.endsWith(".d.ts"))
    .map((file) => file.replace(/\.ts$/, ".js"))
    .sort();
  assert.deepEqual(
    publicEntries.map(([, target]) => path.basename(target.import)).sort(),
    expected,
  );
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
  assert(packed.files.some((file) => file.path === "styles/dark.css"));
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
  const parsedModules = [];
  const result = await build({
    configFile: false,
    root: consumer,
    logLevel: "silent",
    plugins: [
      {
        name: "record-consumer-dependencies",
        moduleParsed(info) {
          parsedModules.push(info.id.replaceAll("\\", "/"));
        },
      },
    ],
    build: { write: false, minify: true, lib: { entry, formats: ["es"] } },
  });
  const outputs = (Array.isArray(result) ? result[0] : result).output;
  const chunks = outputs.filter((item) => item.type === "chunk");
  const code = chunks.map((item) => item.code).join("\n");
  const modules = chunks
    .flatMap((item) =>
      Object.entries(item.modules)
        .filter(([, info]) => info.renderedLength > 0)
        .map(([id]) => id),
    )
    .map((id) => id.replaceAll("\\", "/"));
  results[name] = { bytes: Buffer.byteLength(code), gzip: gzipSync(code).length };
  return { modules, parsedModules, code, outputs };
}
function excludes(result, names) {
  for (const name of names)
    assert(!result.modules.some((id) => id.includes(`/lib/${name}/`)), `${name} retained`);
}

test("packed form and Collapse entries and shared chunks have no recursive signal runtime", async () => {
  const names = [
    "form",
    "form-item",
    "input",
    "input-number",
    "md-input",
    "select",
    "select-ori",
    "switch",
    "checkbox",
    "checkbox-group",
    "radio",
    "radio-group",
    "color-picker",
    "date-picker",
    "date-picker-ori",
    "button",
    "upload",
    "theme",
    "collapse",
    "collapse-item",
  ];
  const input = Object.fromEntries(
    names.map((name) => {
      const entry = path.join(consumer, `shared-${name}.js`);
      writeFileSync(entry, `import "litos-ui/${name}";`);
      return [name, entry];
    }),
  );
  let checked = 0;
  const output = await build({
    configFile: false,
    root: consumer,
    logLevel: "error",
    plugins: [
      {
        name: "assert-packed-component-boundary",
        moduleParsed(info) {
          assert.doesNotMatch(info.id, /alien-signals/);
          if (info.id.replaceAll("\\", "/").includes("/node_modules/litos-ui/lib/")) checked++;
        },
      },
    ],
    build: { write: false, minify: false, rolldownOptions: { input, output: { format: "es" } } },
  });
  const chunks = (Array.isArray(output) ? output : [output])
    .flatMap((bundle) => bundle.output)
    .filter((item) => item.type === "chunk");
  assert.ok(checked >= names.length, "Must resolve actual packaged implementations");
  assert.ok(
    chunks.some((chunk) => !chunk.isEntry),
    "Must also inspect shared chunks",
  );
  for (const chunk of chunks) {
    assert.doesNotMatch(chunk.code, /alien-signals/);
    assert.ok(
      !Object.keys(chunk.modules).some((id) =>
        id.replaceAll("\\", "/").includes("/src/components/"),
      ),
    );
  }
});

test("isolated and whole-library packed consumers exclude the signal runtime", async () => {
  const scenarios = {
    form: 'import "litos-ui/form";',
    formItem: 'import "litos-ui/form-item";',
    input: 'import "litos-ui/input";',
    radioGroup: 'import "litos-ui/radio"; import "litos-ui/radio-group";',
    checkboxGroup: 'import "litos-ui/checkbox"; import "litos-ui/checkbox-group";',
    combination:
      'import "litos-ui/form-item"; import "litos-ui/form"; import "litos-ui/input"; import "litos-ui/radio"; import "litos-ui/radio-group"; import "litos-ui/checkbox"; import "litos-ui/checkbox-group"; import "litos-ui/button";',
    theme: 'import "litos-ui/radio"; import "litos-ui/radio-group"; import "litos-ui/theme";',
    namedForm: 'import { Form, FormItem, regist } from "litos-ui"; regist([FormItem, Form]);',
    namedInput: 'import { Input, regist } from "litos-ui"; regist(Input);',
    namedGroups:
      'import { Radio, RadioGroup, Checkbox, CheckboxGroup, regist } from "litos-ui"; regist([Radio, RadioGroup, Checkbox, CheckboxGroup]);',
    namedCombination:
      'import { Form, FormItem, Input, Radio, RadioGroup, Checkbox, CheckboxGroup, regist } from "litos-ui"; regist([FormItem, Form, Input, Radio, RadioGroup, Checkbox, CheckboxGroup]);',
    mixedCollapse:
      'import { Collapse, CollapseItem, ArrowRightIcon, regist } from "litos-ui"; import "litos-ui/collapse"; import "litos-ui/collapse-item"; regist([ArrowRightIcon, CollapseItem, Collapse]);',
  };
  for (const [name, source] of Object.entries(scenarios)) {
    const result = await bundle(`no-signals-${name}`, source);
    assert.doesNotMatch(result.code, /alien-signals/, name);
    assert.ok(
      !result.modules.some((id) => /alien-signals/.test(id)),
      `${name}: rendered signal runtime`,
    );
    assert.ok(
      !result.parsedModules.some((id) => /alien-signals/.test(id)),
      `${name}: recursive signal runtime`,
    );
    assert.ok(
      result.modules.some((id) => id.includes("/node_modules/litos-ui/lib/")),
      name,
    );
    assert.ok(!result.modules.some((id) => id.includes("/src/components/")), name);
  }
  const whole = await bundle(
    "no-signals-whole-library",
    'import * as ui from "litos-ui"; for (const value of Object.values(ui)) if (value?.baseName) ui.regist(value);',
  );
  assert.ok(
    whole.modules.some((id) => id.endsWith("/lib/collapse/item.js")),
    "Whole-library registration must include Collapse Item",
  );
  assert.doesNotMatch(whole.code, /alien-signals/);
  assert.ok(
    !whole.parsedModules.some((id) => /alien-signals/.test(id)),
    "Whole-library registration must not import the signal runtime",
  );
  assert.doesNotMatch(
    readFileSync(path.join(packageRoot, "lib/index.d.ts"), "utf8"),
    /\b(?:Signal|SignalStop)\b/,
  );
  assert.ok(
    !packed.files.some(({ path: file }) => /\/(?:context_provide|signal_types)\./.test(file)),
    "The published package must exclude the removed context and signal modules",
  );
  assert.doesNotMatch(readFileSync(path.join(packageRoot, "lib/index.js"), "utf8"), /signal_types/);
});

test(
  "packed Theme and Group consumers emit one change through remounts",
  {
    skip: process.env.FORM_TEST_BROWSER
      ? false
      : "Run scripts/check-form-signals.mjs with FORM_TEST_BROWSER for the required browser gate",
  },
  async () => {
    const source = readFileSync(path.join(workspace, "tests/form-consumer.browser.mjs"), "utf8");
    const result = await bundle("form-consumer-browser", source);
    assert.ok(!result.modules.some((id) => /alien-signals/.test(id)));
    const browser = await runBrowserFixture(result.code, process.env.FORM_TEST_BROWSER);
    mkdirSync(path.join(workspace, ".artifacts"), { recursive: true });
    writeFileSync(
      path.join(workspace, ".artifacts/form-consumer-result.json"),
      JSON.stringify(browser, null, 2) + "\n",
    );
    assert.deepEqual(browser.consoleErrors, []);
    assert.equal(browser.pass, true, JSON.stringify(browser, null, 2));
    console.log(
      `Packed consumer browser: ${browser.version.product}, ${browser.checks.length} checks passed`,
    );
  },
);

test("packed Collapse entries retain their registrations and render the arrow", async () => {
  const browser = process.env.COLLAPSE_TEST_BROWSER;
  for (const declaration of ["index", "item", "types"]) {
    assert.doesNotMatch(
      readFileSync(path.join(packageRoot, `lib/collapse/${declaration}.d.ts`), "utf8"),
      /signal_types|alien-signals/,
    );
  }
  for (const name of ["collapse", "collapse-item"]) {
    const entry = await bundle(`packed-${name}`, `import "litos-ui/${name}";`);
    assert.doesNotMatch(entry.code, /alien-signals/, name);
    assert.ok(!entry.parsedModules.some((id) => /alien-signals/.test(id)), name);
    assert(
      entry.modules.some((id) => id.endsWith("/lib/collapse/item.js")),
      name,
    );
    assert(
      entry.modules.some((id) => id.endsWith("/lib/icon/arrow_right.js")),
      name,
    );
    assert.equal(
      entry.modules.some((id) => id.endsWith("/lib/collapse/index.js")),
      name === "collapse",
    );
    excludes(entry, ["carousel", "table", "select"]);
    if (browser) {
      const code =
        entry.code +
        `
        const item = document.querySelector("l-collapse-item");
        const arrow = item.shadowRoot.querySelector("l-arrow-right-icon");
        document.querySelector("#result").textContent = JSON.stringify({
          groupRegistered: !!customElements.get("l-collapse"),
          arrowRendered: !!arrow.shadowRoot.querySelector("svg"),
          expanded: item.classList.contains("l-collapse-expand"),
        });`;
      const item = '<l-collapse-item prop="initial">Content</l-collapse-item>';
      const markup = name === "collapse" ? `<l-collapse prop="initial">${item}</l-collapse>` : item;
      const result = await runBrowserFixture(code, browser, {
        pages: {
          "/": `<!doctype html><meta charset="utf-8">${markup}<pre id="result">pending</pre><script type="module" src="/fixture.js"></script>`,
        },
      });
      assert.deepEqual(result.consoleErrors, []);
      assert.equal(result.groupRegistered, name === "collapse");
      assert.equal(result.expanded, name === "collapse");
      assert.equal(result.arrowRendered, true);
    }
  }
});

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
  const cssText = (result) =>
    result.outputs
      .filter((item) => item.type === "asset" && item.fileName.endsWith(".css"))
      .map((item) =>
        typeof item.source === "string" ? item.source : Buffer.from(item.source).toString("utf8"),
      )
      .join("\n");
  assert(
    !cssText(css).includes("--l-card-bg"),
    "vars.css must not implicitly include dark overrides",
  );
  const dark = await bundle("dark-css", 'import "litos-ui/styles/dark.css";');
  assert(
    cssText(dark).includes("--l-card-bg"),
    "explicit dark CSS must survive production optimization",
  );
  assert(
    !cssText(dark).includes("--l-primary-color:"),
    "dark.css must not duplicate base variables",
  );
  const themed = await bundle(
    "base-and-dark-css",
    'import "litos-ui/styles/vars.css"; import "litos-ui/styles/dark.css";',
  );
  assert(cssText(themed).includes("--l-primary-color:"));
  assert(cssText(themed).includes("--l-card-bg"));
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
import { Radio, Checkbox, Collapse, CollapseItem } from "litos-ui";
import RadioEntry from "litos-ui/radio";
import CheckboxEntry from "litos-ui/checkbox";
import CollapseEntry from "litos-ui/collapse";
import CollapseItemEntry from "litos-ui/collapse-item";
import Input from "litos-ui/input";
import MdInput from "litos-ui/md-input";
import Form from "litos-ui/form";
import InputNumber from "litos-ui/input-number";
import type { JSX } from "preact";
import "litos-ui/types/preact.d.ts";
declare const input: Input;
declare const material: MdInput;
declare const form: Form;
declare const number: InputNumber;
declare const checks: [Radio, Checkbox, RadioEntry, CheckboxEntry];
for (const check of checks) {
  check.checked = true;
  const checked: boolean = check.checked;
  // @ts-expect-error checked is a boolean property.
  check.checked = "true";
  void checked;
}
form.autocomplete = "off";
form.autocomplete = "";
number.autocomplete = "off";
input.autocomplete = "email";
material.autocomplete = "new-password";
material.htmlType = "password";
const inputProps: JSX.IntrinsicElements["l-input"] = { autocomplete: "email" };
const formProps: JSX.IntrinsicElements["l-form"] = { autocomplete: "off" };
const materialProps: JSX.IntrinsicElements["l-md-input"] = { autocomplete: "current-password", "html-type": "password" };
const collapseCtor: typeof Collapse = CollapseEntry;
const itemCtor: typeof CollapseItem = CollapseItemEntry;
const collapse = (
  <l-collapse prop="details" accordion arrow-placement="right" onchange={(event) => {
    const value: string = event.detail.value;
    const expands: string[] = event.detail.expands;
    void [value, expands];
  }}>
    <l-collapse-item prop="details" header-text="Details" heading-level="2" toggle-label="Show details" expand
      onexpand-change={(event) => {
        const prop: string = event.detail.prop;
        const expand: boolean = event.detail.expand;
        void [prop, expand];
      }}
    />
  </l-collapse>
);
const ctor: typeof HTMLElement = Button;
const base: typeof HTMLElement = Base;
const upload: UploadFile[] = [];
const columns: Column[] = [];
void [ctor, base, upload, columns, Message.success, formProps, inputProps, materialProps, collapseCtor, itemCtor, collapse];
`;
  writeFileSync(path.join(consumer, "index.tsx"), source);
  writeFileSync(
    path.join(consumer, "tsconfig.json"),
    JSON.stringify({
      compilerOptions: {
        target: "ESNext",
        module: "ESNext",
        moduleResolution: "bundler",
        jsx: "react-jsx",
        jsxImportSource: "preact",
        strict: true,
        noEmit: true,
        skipLibCheck: false,
        noUncheckedSideEffectImports: true,
      },
      files: ["index.tsx"],
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