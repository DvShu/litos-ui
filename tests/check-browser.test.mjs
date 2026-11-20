import assert from "node:assert/strict";
import { test } from "node:test";
import { setTimeout as delay } from "node:timers/promises";
import { build } from "vite";
import { runBrowserFixture } from "../scripts/browser-fixture.mjs";

const browser = process.env.FORM_TEST_BROWSER;

test(
  "Check interactions through on-demand entries in Chromium",
  {
    skip:
      !browser && "Set FORM_TEST_BROWSER to a Chrome or Edge executable after building the library",
  },
  async (context) => {
    const output = await build({
      configFile: false,
      logLevel: "error",
      build: {
        write: false,
        minify: false,
        target: "es2022",
        lib: { entry: "tests/check-browser.fixture.mjs", formats: ["es"] },
      },
    });
    const code = (Array.isArray(output) ? output[0] : output).output.find(
      (chunk) => chunk.isEntry,
    )?.code;
    assert.ok(code, "missing Check browser fixture");
    const result = await runBrowserFixture(code, browser, {
      browserArgs: ["--disable-breakpad", "--disable-crash-reporter"],
      async run({ call, origin }) {
        const evaluate = async (expression) => {
          const response = await call("Runtime.evaluate", {
            expression: `(() => { const fixture = window.checkFixture; ${expression} })()`,
            returnByValue: true,
          });
          assert.ok(!response.exceptionDetails, JSON.stringify(response.exceptionDetails));
          return response.result.value;
        };
        await call("Page.bringToFront");
        await call("Emulation.setFocusEmulationEnabled", { enabled: true });
        await call("Page.navigate", { url: origin });
        for (let attempt = 0; attempt < 100 && !(await evaluate("return !!fixture")); attempt++) {
          await delay(50);
        }
        assert.equal(await evaluate("return !!fixture"), true, "Check fixture did not load");
        await evaluate("fixture.verifyFormBehavior()");

        const keyCodes = {
          Tab: 9,
          Space: 32,
          ArrowLeft: 37,
          ArrowUp: 38,
          ArrowRight: 39,
          ArrowDown: 40,
        };
        const press = async (code, modifiers = 0) => {
          const space = code === "Space";
          const key = {
            key: space ? " " : code,
            code,
            modifiers,
            windowsVirtualKeyCode: keyCodes[code],
            nativeVirtualKeyCode: keyCodes[code],
          };
          await call(
            "Input.dispatchKeyEvent",
            space ? { ...key, type: "keyDown", text: " " } : { ...key, type: "rawKeyDown" },
          );
          await call("Input.dispatchKeyEvent", { ...key, type: "keyUp" });
        };
        const focus = (id) => evaluate(`fixture.get(${JSON.stringify(id)}).focus()`);
        await focus("before");
        await press("Tab");
        await evaluate(
          `fixture.check('real Tab focuses the internal checkbox visibly', fixture.active() === 'half' && fixture.focusVisible('half'))`,
        );
        await press("Space");
        await evaluate(`fixture.check('Space preserves mixed state and submits exactly once',
        fixture.checked('half') && fixture.get('half').$input.indeterminate &&
        fixture.equal(fixture.directChanges('half'), ['0']) &&
        fixture.equal(new FormData(fixture.get('native')).getAll('standalone'), ['0']))`);
        await evaluate(
          `fixture.get('native').addEventListener('click', (event) => event.preventDefault(), { once: true })`,
        );
        await press("Space");
        await evaluate(`fixture.check('prevented native activation retains selection and emits no change',
        fixture.checked('half') && fixture.get('half').$input.indeterminate &&
        fixture.directChanges('half').length === 1 && new FormData(fixture.get('native')).get('standalone') === '0')`);

        await focus("before-radios");
        await press("Tab");
        await evaluate(
          `fixture.check('Tab enters selected radio with visible focus', fixture.active() === 'selected' && fixture.focusVisible('selected'))`,
        );
        await press("Tab");
        await evaluate(
          `fixture.check('one Tab leaves the whole radio group', fixture.active() === 'after')`,
        );
        await press("Tab", 8);
        await evaluate(
          `fixture.check('Shift+Tab re-enters checked radio', fixture.active() === 'selected')`,
        );
        for (const [key, target, expected, values] of [
          ["ArrowRight", "first", "a", ["a"]],
          ["ArrowDown", "selected", "c", ["a", "c"]],
          ["ArrowLeft", "first", "a", ["a", "c", "a"]],
          ["ArrowUp", "selected", "c", ["a", "c", "a", "c"]],
        ]) {
          await press(key);
          await evaluate(`fixture.check('${key} focuses and selects the enabled option once',
          fixture.active() === '${target}' && fixture.checked('${target}') &&
          new FormData(fixture.get('native')).get('radio') === '${expected}' &&
          fixture.equal(fixture.directChanges('radios'), ${JSON.stringify(values)}))`);
        }
        await press("Space");
        await evaluate(
          `fixture.check('Space on already checked radio stays silent', fixture.directChanges('radios').length === 4)`,
        );

        await focus("peer-a");
        await press("ArrowRight");
        await evaluate(`fixture.check('standalone radios coordinate arrows only within their owner',
        fixture.active() === 'peer-b' && fixture.checked('peer-b') && !fixture.get('peer-a').checked &&
        fixture.checked('peer-outside') && fixture.equal(fixture.entries('other-owner'), [['peer', 'other']]))`);
        await evaluate(`
        const moving = fixture.get('peer-b');
        fixture.get('other-owner').append(moving);
        fixture.check('changing form owners updates radio exclusivity, entries and association',
          moving.form === fixture.get('other-owner') && !fixture.get('peer-outside').checked &&
          !new FormData(fixture.get('native')).has('peer') && fixture.equal(fixture.entries('other-owner'), [['peer', 'two']]));
        fixture.get('native').append(moving);
        fixture.verifyReset();
      `);
        return { checks: await evaluate("return fixture.checks") };
      },
    });
    context.diagnostic(`${result.version.product}, ${result.checks.length} browser checks`);
    assert.deepEqual(result.consoleErrors, [], "browser console errors");
    assert.deepEqual(
      result.checks.filter(({ pass }) => !pass).map(({ name }) => name),
      [],
    );
  },
);