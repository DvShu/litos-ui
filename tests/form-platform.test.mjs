import test from "node:test";
import assert from "node:assert/strict";
import { inspectFormPlatform, assertFormPlatform } from "../scripts/form-platform.mjs";

function platform() {
  const internals = {};
  for (const name of ["setFormValue", "setValidity", "checkValidity", "reportValidity"])
    internals[name] = () => {};
  for (const name of ["form", "labels", "validity", "validationMessage", "willValidate"])
    internals[name] = null;
  return {
    HTMLElement: { prototype: { attachInternals() {} } },
    ElementInternals: { prototype: internals },
    HTMLFormElement: { prototype: { requestSubmit() {}, reset() {}, checkValidity() {} } },
    customElements: { define() {} },
    FormData() {},
  };
}
test("reports missing browser environment without accessing DOM", () => {
  assert.equal(inspectFormPlatform({}).supported, false);
  assert.throws(() => assertFormPlatform({}), /16\.4.*attachInternals/);
});
test("accepts core form APIs without newer custom states or ARIA reflection", () => {
  assert.deepEqual(assertFormPlatform(platform()), { supported: true, missing: [] });
});
test("detects each missing core capability", () => {
  const locations = [
    ["HTMLElement", "attachInternals"],
    ...[
      "setFormValue",
      "setValidity",
      "checkValidity",
      "reportValidity",
      "form",
      "labels",
      "validity",
      "validationMessage",
      "willValidate",
    ].map((name) => ["ElementInternals", name]),
    ...["requestSubmit", "reset", "checkValidity"].map((name) => ["HTMLFormElement", name]),
  ];
  for (const [type, name] of locations) {
    const scope = platform();
    delete scope[type].prototype[name];
    assert.ok(inspectFormPlatform(scope).missing.includes(`${type}.${name}`));
    assert.throws(() => assertFormPlatform(scope));
  }
});