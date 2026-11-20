import assert from "node:assert/strict";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { build } from "vite";
import { runBrowserFixture } from "./browser-fixture.mjs";

const executable = process.env.FORM_TEST_BROWSER;
if (!executable)
  throw new Error(
    "Set FORM_TEST_BROWSER to a Chromium/Edge executable for restore/autofill tests.",
  );
const bundle = await build({
  configFile: false,
  logLevel: "error",
  build: {
    write: false,
    minify: false,
    target: "es2022",
    lib: { entry: "tests/form-state.browser.mjs", formats: ["es"] },
  },
});
const code = (Array.isArray(bundle) ? bundle[0] : bundle).output.find(
  (item) => item.type === "chunk" && item.isEntry,
)?.code;
assert.ok(code, "Missing state fixture bundle");
const pages = {
  "/history": await readFile("tests/form-state.fixture.html", "utf8"),
  "/autofill": await readFile("tests/form-autofill.fixture.html", "utf8"),
  "/away": "<!doctype html><title>Away</title><h1>Away</h1>",
};
const privateIds = ["password", "dynamic-password", "md-password", "md-dynamic-password"];
const same = (left, right) => JSON.stringify(left) === JSON.stringify(right);
const nonPrivateEntries = (entries) => entries.filter(([name]) => !privateIds.includes(name));
const failures = [];
await mkdir(".artifacts", { recursive: true });
for (const bfcache of [false, true]) {
  const checks = [];
  const check = (name, pass) => checks.push({ name, pass: !!pass });
  let result;
  try {
    result = await runBrowserFixture(code, executable, {
      pages,
      browserArgs: bfcache ? [] : ["--disable-features=BackForwardCache"],
      async run({ call, origin }) {
        const evaluate = async (expression) => {
          const value = await call("Runtime.evaluate", {
            expression,
            returnByValue: true,
            awaitPromise: true,
          });
          if (value.exceptionDetails) throw new Error(JSON.stringify(value.exceptionDetails));
          return value.result?.value;
        };
        const waitFor = async (expression) => {
          for (let i = 0; i < 100; i++) {
            if (await evaluate(expression)) return;
            await new Promise((resolve) => setTimeout(resolve, 50));
          }
          throw new Error(`Timed out waiting for ${expression}`);
        };
        const navigate = async (url) => {
          await call("Page.navigate", { url });
          await waitFor("window.ready === true");
        };
        await call("Page.enable");
        await navigate(`${origin}/history`);
        // Prepare current field values; restoration itself is performed only by the browser.
        await evaluate(`
          document.querySelector('#text').value = 'restored text';
          document.querySelector('#password').value = 'dummy-test-secret';
          const dynamic = document.querySelector('#dynamic-password');
          dynamic.value = 'dummy-dynamic-secret'; dynamic.setAttribute('type', 'password');
          document.querySelector('#md-password').value = 'dummy-material-secret';
          const md = document.querySelector('#md-dynamic-password');
          md.value = 'dummy-material-dynamic-secret'; md.htmlType = 'password';
          document.querySelector('#check').checked = true;
          document.querySelector('#number').value = 12.5;
          document.querySelector('#switch').value = true;
          document.querySelector('#select').value = 'b';
          document.querySelector('#color').value = '#aabbcc';
          document.querySelector('#date').value = '2026-11-18';
          document.querySelector('#helper').value = 'restored helper';
          document.querySelector('#group').value = 'a&b';
          document.querySelector('#radio').value = 'b';
          document.querySelector('#plain').focus();
        `);
        await call("Input.insertText", { text: " native edited" });
        const before = await evaluate("snapshot()");
        check(
          "passwords-submit-without-saving-restoration-state",
          privateIds.every((id) => before.values[id].savedState === null) &&
            privateIds
              .filter((id) => id !== "md-dynamic-password")
              .every((id) =>
                before.nativeData.some(
                  ([name, value]) => name === id && value.startsWith("dummy-"),
                ),
              ) &&
            before.helperNativeData.some(
              ([name, value]) =>
                name === "md-dynamic-password" && value === "dummy-material-dynamic-secret",
            ),
        );
        const history = await call("Page.getNavigationHistory");
        const entryId = history.entries[history.currentIndex].id;
        await call("Page.navigate", { url: `${origin}/away` });
        await waitFor('document.title === "Away"');
        await call("Page.navigateToHistoryEntry", { entryId });
        await waitFor("window.ready === true");
        // Allow native restoration reactions and component frame updates to settle.
        await new Promise((resolve) => setTimeout(resolve, 350));
        const after = await evaluate("snapshot()");
        check(
          "actual-history-return-mechanism",
          bfcache
            ? after.persisted === true
            : after.persisted === false &&
                after.navigation === "back_forward" &&
                ["text", "helper", "group", "radio"].every((id) =>
                  after.restores.some((item) => item.id === id && item.mode === "restore"),
                ),
        );
        for (const [id, value] of Object.entries(before.values)) {
          if (privateIds.includes(id)) continue;
          check(
            `restored-business-${id}`,
            same(
              { value: value.value, checked: value.checked },
              { value: after.values[id].value, checked: after.values[id].checked },
            ),
          );
          const uiState = (fields) =>
            fields.map(({ value, checked, type }) => ({ value, checked, type }));
          check(`restored-ui-${id}`, same(uiState(value.ui), uiState(after.values[id].ui)));
        }
        check(
          "native-and-helper-formdata-restored",
          same(nonPrivateEntries(before.nativeData), nonPrivateEntries(after.nativeData)) &&
            same(
              nonPrivateEntries(before.helperNativeData),
              nonPrivateEntries(after.helperNativeData),
            ),
        );
        check(
          "helper-business-data-restored",
          same(
            nonPrivateEntries(Object.entries(before.helperData)),
            nonPrivateEntries(Object.entries(after.helperData)),
          ),
        );
        check(
          "password-not-replayed-from-browser-state",
          !after.restores.some(
            (item) =>
              privateIds.includes(item.id) &&
              typeof item.state === "string" &&
              item.state.includes("dummy-"),
          ),
        );
        check(
          "password-history-policy",
          privateIds.every(
            (id) =>
              after.values[id].value === (bfcache ? before.values[id].value : "") &&
              after.values[id].ui[0].value === (bfcache ? before.values[id].value : ""),
          ),
        );

        await navigate(`${origin}/autofill`);
        check(
          "form-level-autocomplete-and-field-precedence",
          await evaluate(`
            document.querySelector('#field-autofill-form').autocomplete === 'off' &&
            document.querySelector('#custom-first').shadowRoot.querySelector('input').autocomplete === 'section-contact given-name' &&
            ['global-first','global-last','global-email'].every(id => {
              const field = document.getElementById(id);
              return !field.hasAttribute('autocomplete') && field.shadowRoot.querySelector('input').autocomplete === 'on';
            })
          `),
        );
        await call("Autofill.enable");
        const address = {
          fields: [
            ["NAME_FIRST", "Ada"],
            ["NAME_LAST", "Tester"],
            ["NAME_FULL", "Ada Tester"],
            ["EMAIL_ADDRESS", "ada@example.test"],
            ["ADDRESS_HOME_LINE1", "123 Example Road"],
            ["ADDRESS_HOME_CITY", "Example City"],
            ["ADDRESS_HOME_STATE", "CA"],
            ["ADDRESS_HOME_ZIP", "94043"],
            ["ADDRESS_HOME_COUNTRY", "US"],
          ].map(([name, value]) => ({ name, value })),
        };
        const fill = async (expression) => {
          const object = await call("Runtime.evaluate", { expression });
          const { node } = await call("DOM.describeNode", { objectId: object.result.objectId });
          const { frameTree } = await call("Page.getFrameTree");
          await call("Autofill.trigger", {
            fieldId: node.backendNodeId,
            frameId: frameTree.frame.id,
            address,
          });
          return evaluate("snapshot()");
        };
        const native = await fill("document.querySelector('#native-first')");
        check(
          "native-autofill-positive-control",
          native.nativeData.some(([name, value]) => name === "first" && value === "Ada"),
        );
        const filled = {};
        const global = await fill(
          "document.querySelector('#global-first').shadowRoot.querySelector('input')",
        );
        for (const [field, expected] of [
          ["first", "Ada"],
          ["last", "Tester"],
          ["email", "ada@example.test"],
        ]) {
          const id = `global-${field}`;
          check(
            `${id}-form-default-real-autofill`,
            global.values[id].value === expected &&
              global.values[id].ui[0].value === expected &&
              global.values[id].ui[0].autofilled &&
              global.nativeData.filter(([name, value]) => name === id && value === expected)
                .length === 1,
          );
        }
        for (const prefix of ["custom", "material"]) {
          const data = await fill(
            `document.querySelector('#${prefix}-first').shadowRoot.querySelector('input')`,
          );
          filled[prefix] = data;
          for (const [field, expected] of [
            ["first", "Ada"],
            ["last", "Tester"],
            ["email", "ada@example.test"],
            ["address", "123 Example Road"],
            ["zip", "94043"],
          ]) {
            const id = `${prefix}-${field}`;
            const value = data.values[id];
            check(
              `${id}-real-autofill`,
              value.value === expected &&
                value.ui[0].value === expected &&
                value.ui[0].autofilled === true &&
                data.nativeData.filter(([name, text]) => name === id && text === expected)
                  .length === 1,
            );
          }
          check(
            `${prefix}-trusted-autofill-input`,
            data.inputEvents.some((event) => event.trusted),
          );
        }
        return {
          checks,
          history: { before, after },
          autofill: { native, global, ...filled },
          bfcache,
          pass: checks.every((item) => item.pass),
        };
      },
    });
    check("no-browser-errors", result.consoleErrors.length === 0);
    result.checks = checks;
    result.pass = checks.every((item) => item.pass);
  } catch (error) {
    result = { pass: false, checks, bfcache, error: error.stack };
  }
  const filename = `.artifacts/form-state-${bfcache ? "bfcache" : "restore"}-result.json`;
  await writeFile(filename, JSON.stringify(result, null, 2) + "\n");
  console.log(
    `${bfcache ? "BFCache" : "Restore"}: ${result.version?.product ?? "browser"}, ${checks.filter((item) => item.pass).length}/${checks.length} checks passed`,
  );
  if (!result.pass)
    failures.push({ filename, failures: checks.filter((item) => !item.pass), error: result.error });
}
assert.deepEqual(failures, [], JSON.stringify(failures, null, 2));