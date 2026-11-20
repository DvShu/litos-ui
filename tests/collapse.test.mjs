import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { build } from "vite";
import { runBrowserFixture } from "../scripts/browser-fixture.mjs";

const browser = process.env.COLLAPSE_TEST_BROWSER;
const browserTestOptions = {
  skip: !browser && "Set COLLAPSE_TEST_BROWSER to a Chromium executable",
};
const markupBeforeRegistration = `<!doctype html><meta charset="utf-8">
<l-collapse id="late-collapse" prop="a" arrow-placement="right">
  <l-collapse-item prop="a" expand="false">A</l-collapse-item>
  <div><l-collapse-item prop="b" expand>B</l-collapse-item></div>
</l-collapse>
<pre id="result">pending</pre>
<script>
  window.upgradeEvents = [];
  document.addEventListener("expand-change", (event) => window.upgradeEvents.push(event.type));
  document.addEventListener("change", (event) => window.upgradeEvents.push(event.type));
</script>
<script type="module" src="/fixture.js"></script>`;

test(
  "Collapse state, slot projection, ownership and animation in Chromium",
  browserTestOptions,
  async (t) => {
    const code = await buildFixture("./collapse.browser.mjs");
    const result = await runBrowserFixture(code, browser, {
      pages: { "/": markupBeforeRegistration },
    });
    assert.deepEqual(result.consoleErrors, []);
    assert.equal(result.error, undefined);
    t.diagnostic(`${result.checks.length} checks in ${result.version.product}`);
  },
);

async function buildFixture(entry) {
  const bundle = await build({
    configFile: false,
    logLevel: "error",
    build: {
      write: false,
      // This fixture loads source registration modules. Package sideEffects covers the built entries.
      rolldownOptions: { treeshake: false },
      lib: {
        entry: fileURLToPath(new URL(entry, import.meta.url)),
        formats: ["es"],
      },
    },
  });
  return bundle[0].output.find((file) => file.type === "chunk" && file.isEntry).code;
}

const keyboardMarkup = `<!doctype html><meta charset="utf-8">
<form>
  <button type="button" id="before">Before</button>
  <l-collapse accordion arrow-placement="right" header-justify="space-between">
    <l-collapse-item id="plain" prop="plain" header-text="Plain title" heading-level="2">
      <input id="panel-input" aria-label="Panel input">
    </l-collapse-item>
    <div><l-collapse-item id="custom" prop="custom">
      <span slot="header-text" id="caption">Custom <strong>title</strong></span>
      <button type="button" slot="header-text" id="action">Own action</button>
      <a href="#destination" slot="header-text" id="link">Own link</a>
      <button type="submit" slot="header-text" id="submit">Own submit</button>
      <p>Custom content</p>
    </l-collapse-item></div>
  </l-collapse>
  <button type="button" id="after">After</button>
</form>
<p id="destination">Destination</p>
<l-collapse-item id="solo" heading-level="9"><button slot="header-text">Only action</button>Solo content</l-collapse-item>
<script>
  window.items = ["plain", "custom", "solo"].map(id => document.getElementById(id));
  window.toggle = item => item.shadowRoot.querySelector("button");
  window.panel = item => item.shadowRoot.getElementById(toggle(item).getAttribute("aria-controls"));
  window.actions = 0;
  window.submits = [];
  window.changes = [];
  document.querySelector("#action").addEventListener("click", () => actions++);
  document.querySelector("form").addEventListener("submit", event => {
    event.preventDefault();
    submits.push(event.submitter.id);
  });
  for (const type of ["change", "expand-change"])
    document.querySelector("l-collapse").addEventListener(type, event => changes.push(event.type));
</script>
<script type="module" src="/fixture.js"></script>`;

test(
  "Collapse titles support native keyboard activation and independent slotted controls",
  browserTestOptions,
  async () => {
    const code = await buildFixture("../src/components/entries/collapse.ts");
    const themeStyles = await Promise.all(
      ["themes/jade.css", "themes/coral.css", "themes/tangerine.css", "vars.css", "dark.css"].map(
        (file) => readFile(new URL(`../styles/${file}`, import.meta.url), "utf8"),
      ),
    );
    const markup = keyboardMarkup.replace(
      "<form>",
      () => `<style>${themeStyles.join("\n")}</style><form>`,
    );
    const result = await runBrowserFixture(code, browser, {
      pages: { "/": markup },
      async run({ call, origin }) {
        const evaluate = async (fn, ...args) => {
          const result = await call("Runtime.evaluate", {
            expression: `(${fn})(${args.map((arg) => JSON.stringify(arg)).join(",")})`,
            returnByValue: true,
            awaitPromise: true,
          });
          assert.equal(result.exceptionDetails, undefined, JSON.stringify(result.exceptionDetails));
          return result.result.value;
        };
        const press = async (key, code, keyCode, text, modifiers = 0) => {
          const params = { key, code, windowsVirtualKeyCode: keyCode, modifiers };
          await call("Input.dispatchKeyEvent", { type: "keyDown", ...params, text });
          await call("Input.dispatchKeyEvent", { type: "keyUp", ...params });
        };
        const tab = () => press("Tab", "Tab", 9);
        const enter = () => press("Enter", "Enter", 13, "\r");
        const space = () => press(" ", "Space", 32, " ");
        const focused = () =>
          evaluate(() => {
            const active = document.activeElement;
            return [active.id, active.shadowRoot?.activeElement?.localName ?? null];
          });
        const state = () =>
          evaluate(() => [
            items.map((item) => toggle(item).getAttribute("aria-expanded")),
            changes,
            actions,
            submits,
          ]);
        const frame = () =>
          evaluate(
            () =>
              new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
          );
        const settle = async () => {
          await frame();
          await evaluate(() =>
            Promise.all(
              items.flatMap((item) =>
                panel(item)
                  .getAnimations()
                  .map((animation) => animation.finished),
              ),
            ).then(() => undefined),
          );
        };
        const setMotion = (value) =>
          call("Emulation.setEmulatedMedia", {
            features: [{ name: "prefers-reduced-motion", value }],
          });

        await setMotion("no-preference");
        await call("Page.navigate", { url: origin });
        await evaluate(async () => {
          await customElements.whenDefined("l-collapse");
          window.initialPanel = panel(items[0]);
          document.querySelector("#before").focus();
        });
        assert.deepEqual(
          await evaluate(() =>
            items.map((item) => {
              const button = toggle(item);
              return [
                button.type,
                button.parentElement.getAttribute("role"),
                button.parentElement.getAttribute("aria-level"),
                button.parentElement.children.length,
                panel(item)?.getRootNode() === item.shadowRoot,
                getComputedStyle(panel(item)).display,
              ];
            }),
          ),
          [
            ["button", "heading", "2", 1, true, "none"],
            ["button", "heading", "3", 1, true, "none"],
            ["button", "heading", "3", 1, true, "none"],
          ],
        );
        assert.equal(
          await evaluate(() => {
            const item = items[1];
            const slot = item.shadowRoot.querySelector('slot[name="header-text"]');
            return (
              slot.previousElementSibling === toggle(item).parentElement &&
              slot.assignedElements().length === 4
            );
          }),
          true,
        );
        const { nodes } = await call("Accessibility.getFullAXTree");
        for (const [name, level] of [
          ["Plain title", 2],
          ["Custom title", 3],
          ["Toggle panel", 3],
        ]) {
          const heading = nodes.find(
            (node) => node.role?.value === "heading" && node.name?.value === name,
          );
          assert.equal(
            heading?.properties.find((property) => property.name === "level")?.value.value,
            level,
          );
          const button = nodes.find(
            (node) => node.role?.value === "button" && node.name?.value === name,
          );
          assert.equal(
            button?.properties.find((property) => property.name === "expanded")?.value.value,
            false,
          );
        }

        await tab();
        assert.deepEqual(await focused(), ["plain", "button"]);
        assert.equal(
          await evaluate(() => {
            const button = toggle(items[0]);
            return (
              button.matches(":focus-visible") && getComputedStyle(button).outlineWidth === "2px"
            );
          }),
          true,
        );
        await enter();
        const oneToggle = ["change", "expand-change"];
        const twoToggles = [...oneToggle, ...oneToggle];
        assert.deepEqual(await state(), [["true", "false", "false"], oneToggle, 0, []]);
        await settle();
        assert.equal(
          await evaluate(
            () =>
              panel(items[0]) === initialPanel && getComputedStyle(initialPanel).display !== "none",
          ),
          true,
        );
        const expandedButton = (await call("Accessibility.getFullAXTree")).nodes.find(
          (node) => node.role?.value === "button" && node.name?.value === "Plain title",
        );
        const controls = expandedButton?.properties.find(
          (property) => property.name === "controls",
        );
        const { result: panelObject } = await call("Runtime.evaluate", {
          expression: "initialPanel",
        });
        const { node: panelNode } = await call("DOM.describeNode", {
          objectId: panelObject.objectId,
        });
        assert.equal(controls?.value.relatedNodes[0]?.backendDOMNodeId, panelNode.backendNodeId);
        await tab();
        assert.deepEqual(await focused(), ["panel-input", null]);
        await press("Tab", "Tab", 9, undefined, 8);
        assert.deepEqual(await focused(), ["plain", "button"]);
        await space();
        assert.deepEqual(await state(), [["false", "false", "false"], twoToggles, 0, []]);
        await settle();

        await tab();
        assert.deepEqual(await focused(), ["custom", "button"]);
        await enter();
        assert.deepEqual(await state(), [
          ["false", "true", "false"],
          [...twoToggles, ...oneToggle],
          0,
          [],
        ]);
        await space();
        const fourToggles = [...twoToggles, ...twoToggles];
        assert.deepEqual(await state(), [["false", "false", "false"], fourToggles, 0, []]);
        await settle();
        await tab();
        assert.deepEqual(await focused(), ["action", null]);
        await enter();
        await space();
        await tab();
        assert.deepEqual(await focused(), ["link", null]);
        await enter();
        assert.equal(await evaluate(() => location.hash), "#destination");
        await evaluate(() => document.querySelector("#link").focus());
        await tab();
        assert.deepEqual(await focused(), ["submit", null]);
        await enter();
        assert.deepEqual(await state(), [["false", "false", "false"], fourToggles, 2, ["submit"]]);
        await tab();
        assert.deepEqual(await focused(), ["after", null]);
        await tab();
        assert.deepEqual(await focused(), ["solo", "button"]);
        await space();
        assert.deepEqual(await state(), [["false", "false", "true"], fourToggles, 2, ["submit"]]);

        await evaluate(() => {
          document.querySelector("l-collapse").setAttribute("prop", "plain");
          items[1].setAttribute("expand", "");
          document.querySelector("#caption strong").firstChild.data = "updated";
        });
        assert.deepEqual(await state(), [["false", "true", "true"], fourToggles, 2, ["submit"]]);
        assert.equal(
          await evaluate(() => toggle(items[1]).getAttribute("aria-label")),
          "Custom updated",
        );
        await evaluate(() => {
          const item = items[1];
          window.originalToggle = toggle(item);
          originalToggle.focus();
          item.setAttribute("header-text", "Literal title");
          item.setAttribute("toggle-label", "Named disclosure");
          item.setAttribute("heading-level", "4");
        });
        await settle();
        assert.deepEqual(
          await evaluate(() => {
            const item = items[1];
            const button = toggle(item);
            return [
              button === originalToggle,
              button === item.shadowRoot.activeElement,
              button.getAttribute("aria-label"),
              button.parentElement.getAttribute("aria-level"),
              button.querySelector('[part="header-text"]').textContent,
            ];
          }),
          [true, true, "Named disclosure", "4", "Literal title"],
        );

        await evaluate(() => {
          const group = document.querySelector("l-collapse");
          group.removeAttribute("prop");
          group.setAttribute("prop", "plain");
        });
        await settle();
        await evaluate(() => {
          const content = panel(items[0]);
          const animate = content.animate.bind(content);
          window.heightAnimationCount = 0;
          content.animate = (...args) => {
            heightAnimationCount++;
            const animation = animate(...args);
            animation.pause();
            animation.currentTime = 75;
            return animation;
          };
          document.querySelector("#panel-input").focus();
        });
        assert.deepEqual(await focused(), ["panel-input", null]);
        await evaluate(() => document.querySelector("l-collapse").removeAttribute("prop"));
        assert.deepEqual(await focused(), ["plain", "button"]);
        await frame();
        assert.deepEqual(
          await evaluate(() => {
            const content = panel(items[0]);
            return [
              content.inert,
              getComputedStyle(content).display,
              content.getAnimations().length,
            ];
          }),
          [true, "block", 1],
        );
        await tab();
        assert.deepEqual(await focused(), ["custom", "button"]);
        await evaluate(() => panel(items[0]).getAnimations()[0].finish());
        await frame();
        assert.deepEqual(await focused(), ["custom", "button"]);

        await evaluate(() => document.querySelector("l-collapse").setAttribute("prop", "plain"));
        await frame();
        assert.equal(await evaluate(() => panel(items[0]).getAnimations()[0].playState), "paused");
        await setMotion("reduce");
        await frame();
        const motionState = () =>
          evaluate(() => {
            const item = items[0];
            const content = panel(item);
            const arrow = item.shadowRoot.querySelector(".l-collapse-arrow-icon");
            return [
              matchMedia("(prefers-reduced-motion: reduce)").matches,
              content.inert,
              getComputedStyle(content).display,
              content.getAnimations().length,
              getComputedStyle(arrow).transitionDuration,
              arrow.getAnimations().length,
              heightAnimationCount,
            ];
          });
        assert.deepEqual(await motionState(), [true, false, "block", 0, "0s", 0, 2]);
        await evaluate(() => document.querySelector("l-collapse").removeAttribute("prop"));
        await frame();
        assert.deepEqual(await motionState(), [true, true, "none", 0, "0s", 0, 2]);
        assert.deepEqual(await focused(), ["custom", "button"]);
        await evaluate(() => document.querySelector("l-collapse").setAttribute("prop", "plain"));
        await frame();
        assert.deepEqual(await motionState(), [true, false, "block", 0, "0s", 0, 2]);

        await evaluate(() => {
          document.body.style.color = "var(--l-text-color)";
          document.querySelector("l-collapse").setAttribute("background", "");
          const legacy = document.createElement("l-collapse-item");
          legacy.id = "legacy-theme-item";
          legacy.contextInject(
            () => ({ arrowPlacement: "left", headerJustify: "flex-start", background: true }),
            () => [],
          );
          document.body.append(legacy);
          toggle(items[0]).focus();
        });
        for (const [theme, accent] of [
          [null, "rgb(0, 123, 255)"],
          ["jade", "rgb(0, 170, 126)"],
          ["coral", "rgb(255, 100, 72)"],
          ["tangerine", "rgb(255, 120, 2)"],
        ]) {
          for (const dark of [false, true]) {
            const colors = await evaluate(
              (theme, dark) => {
                const page = document.documentElement;
                page.classList.toggle("dark", dark);
                if (theme) page.setAttribute("data-theme", theme);
                else page.removeAttribute("data-theme");
                const button = toggle(items[0]);
                const style = getComputedStyle(button);
                const legacy = document.querySelector("#legacy-theme-item");
                return {
                  outlined: button.matches(":focus-visible") && style.outlineWidth === "2px",
                  outline: style.outlineColor,
                  text: style.color,
                  surfaceText: getComputedStyle(document.body).color,
                  accent: style.boxShadow,
                  headerFills: [items[0], legacy].map(
                    (item) => getComputedStyle(item).backgroundColor,
                  ),
                  panelFills: [items[0], legacy, items[2]].map(
                    (item) => getComputedStyle(panel(item)).backgroundColor,
                  ),
                };
              },
              theme,
              dark,
            );
            const headerFill = dark ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.02)";
            const panelFill = dark ? "rgb(38, 38, 38)" : "rgb(255, 255, 255)";
            assert.deepEqual(colors.headerFills, [headerFill, headerFill]);
            assert.deepEqual(colors.panelFills, [panelFill, panelFill, "rgba(0, 0, 0, 0)"]);
            assert.deepEqual(
              [colors.outlined, colors.outline, colors.text],
              [true, colors.surfaceText, colors.surfaceText],
            );
            assert.ok(colors.accent.includes(accent));
          }
        }
      },
    });
    assert.deepEqual(result.consoleErrors, []);
  },
);