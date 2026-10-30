import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { stripTypeScriptTypes } from "node:module";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { createContext, SourceTextModule, SyntheticModule } from "node:vm";

// Run with: node --experimental-vm-modules --test tests/module-effects.test.mjs
// This evaluates source modules rather than lib or a production consumer bundle.
// Inline CSS imports are empty strings: CSS compilation, content and rendering
// remain browser/build checks. No elements are mounted, and define() deliberately
// does not upgrade elements or execute their constructors/lifecycle callbacks.
// Installed third-party ESM is evaluated in the same guarded VM; it is neither
// mocked nor bundled. Dependency versions and consumer tree shaking need separate
// packed-package checks. This harness does not establish SSR compatibility.
const components = fileURLToPath(new URL("../src/components/", import.meta.url));
const entryFiles = readdirSync(path.join(components, "entries"))
  .filter((file) => file.endsWith(".ts") && !file.endsWith(".d.ts"))
  .sort();
const sharedSheets = [
  "button/style.ts",
  "dialog/dialog_container_style.ts",
  "icon/icon_style.ts",
  "input/style.ts",
  "input_number/style.ts",
  "notification/style.ts",
  "styles/animation/index.ts",
  "styles/mask/index.ts",
  "upload/style.ts",
].sort();
const globalStyleIds = [];

function forbidden(name) {
  return function forbiddenImportEffect() {
    throw new Error(`Unexpected import-time effect: ${name}`);
  };
}

function guardedObject(name, allowed = {}) {
  return new Proxy(allowed, {
    get(target, key) {
      if (Object.hasOwn(target, key)) return target[key];
      throw new Error(`Unexpected import-time access: ${name}.${String(key)}`);
    },
    set: forbidden(`${name} assignment`),
  });
}

function createHarness(onDefine = () => {}) {
  const registry = new Map();
  const styles = new Map();
  const styleNodes = new WeakSet();
  const counts = { sheets: 0, replaceSync: 0, defines: 0, styles: 0 };
  const document = guardedObject("document", {
    getElementById(id) {
      assert(globalStyleIds.includes(id), `Unexpected document lookup: ${id}`);
      return styles.get(id) ?? null;
    },
    createElement(tag) {
      assert.equal(tag, "style", `Unexpected DOM creation: ${tag}`);
      const style = { id: "", textContent: "" };
      styleNodes.add(style);
      return style;
    },
    head: guardedObject("document.head", {
      appendChild(style) {
        assert(styleNodes.has(style), "Only explicit style nodes may be mounted");
        assert(globalStyleIds.includes(style.id), `Unexpected global style: ${style.id}`);
        assert(!styles.has(style.id), `Duplicate global style: ${style.id}`);
        styles.set(style.id, style);
        counts.styles++;
        return style;
      },
    }),
  });
  const context = createContext({
    HTMLElement: class HTMLElementStub {
      constructor() {
        throw new Error("Components must not be instantiated during module evaluation");
      }
    },
    CSSStyleSheet: class CSSStyleSheetStub {
      constructor() {
        counts.sheets++;
      }
      replaceSync(css) {
        assert.equal(typeof css, "string");
        counts.replaceSync++;
      }
    },
    customElements: guardedObject("customElements", {
      get: (name) => registry.get(name),
      define(name, constructor) {
        assert(!registry.has(name), `Duplicate element definition: ${name}`);
        assert.equal(name, `l-${constructor.baseName}`);
        onDefine(name, registry);
        registry.set(name, constructor);
        counts.defines++;
      },
    }),
    document,
    window: guardedObject("window"),
    navigator: guardedObject("navigator"),
    location: guardedObject("location"),
    localStorage: guardedObject("localStorage"),
    sessionStorage: guardedObject("sessionStorage"),
    addEventListener: forbidden("global listener"),
    setTimeout: forbidden("setTimeout"),
    setInterval: forbidden("setInterval"),
    requestAnimationFrame: forbidden("requestAnimationFrame"),
    queueMicrotask: forbidden("queueMicrotask"),
    fetch: forbidden("fetch"),
    MutationObserver: forbidden("MutationObserver"),
    ResizeObserver: forbidden("ResizeObserver"),
    IntersectionObserver: forbidden("IntersectionObserver"),
    XMLHttpRequest: forbidden("XMLHttpRequest"),
    WebSocket: forbidden("WebSocket"),
    Worker: forbidden("Worker"),
    Image: forbidden("Image"),
    console,
  });
  const initialGlobals = Object.keys(context).sort();
  const modules = new Map();

  function resolveModule(specifier, parent) {
    // import.meta.resolve selects each package's import condition, including the
    // real alien-signals ESM entry rather than createRequire's CJS condition.
    if (!specifier.startsWith(".")) return fileURLToPath(import.meta.resolve(specifier));
    const target = path.resolve(path.dirname(parent), specifier);
    if (specifier.endsWith("?inline")) {
      assert(existsSync(target.slice(0, -"?inline".length)), `Missing CSS import: ${target}`);
      return target;
    }
    for (const candidate of [target, `${target}.ts`, path.join(target, "index.ts")]) {
      if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
    }
    throw new Error(`Cannot resolve ${specifier} from ${parent}`);
  }

  function loadModule(identifier) {
    if (modules.has(identifier)) return modules.get(identifier);
    let module;
    if (identifier.endsWith("?inline")) {
      module = new SyntheticModule(
        ["default"],
        function () {
          this.setExport("default", "");
        },
        { context, identifier },
      );
    } else {
      let source = readFileSync(identifier, "utf8");
      if (identifier.endsWith(".ts")) {
        source = stripTypeScriptTypes(source, { mode: "strip", sourceUrl: identifier });
      }
      module = new SourceTextModule(source, { context, identifier });
    }
    modules.set(identifier, module);
    return module;
  }

  async function evaluate(relative) {
    const module = loadModule(path.resolve(components, relative));
    if (module.status === "unlinked") {
      await module.link((specifier, parent) =>
        loadModule(resolveModule(specifier, parent.identifier)),
      );
    }
    if (module.status !== "evaluated") await module.evaluate();
    assert.deepEqual(Object.keys(context).sort(), initialGlobals, "No global API injection");
    return module.namespace;
  }

  return { counts, registry, styles, modules, evaluate };
}

function assertPureInitialization(harness) {
  assert.deepEqual(harness.counts, {
    sheets: sharedSheets.length,
    replaceSync: sharedSheets.length,
    defines: 0,
    styles: 0,
  });
  const loadedSheets = [...harness.modules.keys()]
    .filter((file) => sharedSheets.includes(path.relative(components, file).replaceAll("\\", "/")))
    .map((file) => path.relative(components, file).replaceAll("\\", "/"))
    .sort();
  assert.deepEqual(loadedSheets, sharedSheets);
  assert(
    ![...harness.modules.keys()].some((file) =>
      file.startsWith(path.join(components, "entries") + path.sep),
    ),
  );
}

function assertRegisteredInitialization(harness, root, base) {
  assert.deepEqual(harness.counts, {
    sheets: sharedSheets.length,
    replaceSync: sharedSheets.length,
    defines: 78,
    styles: 0,
  });
  assert.deepEqual([...harness.styles.keys()].sort(), globalStyleIds);
  assert.equal(harness.registry.size, 78);
  assert(
    !harness.registry.has("l-base-component"),
    "The implementation base is not an element entry",
  );
  const rootValues = new Set(Object.values(root));
  for (const [name, constructor] of harness.registry) {
    assert(rootValues.has(constructor), `${name} must share its constructor with the aggregate`);
  }
  assert.equal(base.default, root.BaseComponent);
  assert.equal(harness.registry.get("l-button"), root.Button);
  assert.equal(harness.registry.get("l-image-preview"), root.ImagePreview);
}

test("pure aggregate initializes detached shared sheets without registration, DOM or listeners", async () => {
  const harness = createHarness();
  await harness.evaluate("index.ts");
  assertPureInitialization(harness);
});

test("shared style modules export reusable stylesheet objects", async () => {
  const harness = createHarness();
  for (const file of sharedSheets) {
    const first = await harness.evaluate(file);
    const second = await harness.evaluate(file);
    assert.equal(first.default, second.default, file);
    assert.equal(typeof first.default.replaceSync, "function", file);
  }
  await harness.evaluate("index.ts");
  assertPureInitialization(harness);
});

test("all opt-in entries preserve shared identity and register each dependency once without global styles", async () => {
  assert.equal(entryFiles.length, 91);
  const harness = createHarness();
  const root = await harness.evaluate("index.ts");
  for (const file of entryFiles) await harness.evaluate(`entries/${file}`);
  const base = await harness.evaluate("entries/base.ts");
  assertRegisteredInitialization(harness, root, base);
  for (const file of entryFiles) await harness.evaluate(`entries/${file}`);
  assertRegisteredInitialization(harness, root, base);
});

test("loading registration entries before the aggregate keeps the same constructors and sheets", async () => {
  const harness = createHarness();
  for (const file of entryFiles.toReversed()) await harness.evaluate(`entries/${file}`);
  const root = await harness.evaluate("index.ts");
  const base = await harness.evaluate("entries/base.ts");
  assertRegisteredInitialization(harness, root, base);
});

test("manual registration and public entries share definitions in both orders", async () => {
  for (const manualFirst of [true, false]) {
    const harness = createHarness();
    const root = await harness.evaluate("index.ts");
    if (manualFirst) root.regist([root.LoadingIcon, root.Button, root.Button]);
    await harness.evaluate("entries/button.ts");
    root.regist([root.LoadingIcon, root.Button]);
    assert.equal(harness.counts.defines, 2);
    assert.equal(harness.registry.get("l-button"), root.Button);
    assert.equal(harness.registry.get("l-loading-icon"), root.LoadingIcon);
    for (const base of [
      "l-base-component",
      "l-form-inner",
      "l-check",
      "l-check-group",
      "l-context-provide",
    ])
      assert(!harness.registry.has(base));
  }
});

test("service imports alone do not open UI, scan pages or inject APIs", async () => {
  for (const name of [
    "message",
    "loading",
    "dialog",
    "dialog-box",
    "modal-box",
    "notification",
    "notification-box",
    "tabs",
    "popover",
    "popconfirm",
    "transition",
    "utils",
    "base",
  ]) {
    const harness = createHarness();
    const service = await harness.evaluate(`entries/${name}.ts`);
    assert(Object.keys(service).length > 0, name);
    for (const base of [
      "l-base-component",
      "l-form-inner",
      "l-check",
      "l-check-group",
      "l-context-provide",
    ])
      assert(!harness.registry.has(base), name);
  }
});

test("wrapper dependencies are registered before synchronous parent upgrades", async () => {
  const requirements = {
    "l-carousel": ["l-carousel-item", "l-arrow-left-icon", "l-arrow-right-icon"],
    "l-collapse": ["l-collapse-item", "l-arrow-right-icon"],
    "l-modal": ["l-button", "l-close-icon"],
    "l-dialog-container": ["l-button", "l-close-icon"],
    "l-notification": [
      "l-info-icon",
      "l-success-icon",
      "l-warn-icon",
      "l-close-filled-icon",
      "l-close-icon",
    ],
    "l-radio-group": ["l-radio"],
    "l-checkbox-group": ["l-checkbox"],
    "l-form": ["l-form-item"],
    "l-tabbar": ["l-tabbar-item"],
  };
  const harness = createHarness((name, registry) => {
    for (const dependency of requirements[name] ?? [])
      assert(registry.has(dependency), `${name} upgraded before ${dependency}`);
  });
  for (const file of entryFiles.toReversed()) await harness.evaluate(`entries/${file}`);
});

test("lazy services prepare dependencies before registration can upgrade existing elements", async () => {
  for (const [service, parent] of [
    ["DialogBox", "l-dialog-container"],
    ["ModalBox", "l-modal"],
  ]) {
    for (const method of service === "Notification"
      ? ["success"]
      : ["alert", "confirm", "prompt"]) {
      const harness = createHarness((name, registry) => {
        if (name !== parent) return;
        assert(registry.has("l-close-icon"), `${parent} needs CloseIcon first`);
        if (service !== "Notification") {
          assert(registry.has("l-button"));
          if (method === "prompt") assert(registry.has("l-form-item") && registry.has("l-input"));
        } else
          for (const icon of ["info", "success", "warn", "close-filled"])
            assert(registry.has(`l-${icon}-icon`));
      });
      const root = await harness.evaluate("index.ts");
      // Stop after registration: no DOM is mounted and service rendering is forbidden.
      await assert.rejects(
        Promise.resolve().then(() => root[service][method]("message")),
        /Unexpected DOM creation/,
      );
      assert(harness.registry.has(parent));
    }
  }
});

test("Notification APIs require explicit registration and do not define elements", async () => {
  const harness = createHarness();
  const root = await harness.evaluate("index.ts");
  await harness.evaluate("entries/notification.ts");
  await harness.evaluate("entries/notification-box.ts");
  assert(!harness.registry.has("l-notification"));
  assert.throws(() => root.NotificationBox.success("message"), /Register Notification/);
  assert.equal(harness.counts.defines, 0);
  root.regist([
    root.InfoIcon,
    root.SuccessIcon,
    root.WarnIcon,
    root.CloseFilledIcon,
    root.CloseIcon,
    root.Notification,
  ]);
  assert.throws(() => root.NotificationBox.success("message"), /Unexpected DOM creation/);
});