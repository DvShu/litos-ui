import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const runner = fileURLToPath(new URL("../scripts/check-form-owner.mjs", import.meta.url));

test("rejects unrecognized form browser suites before launching a browser", () => {
  for (const name of ["nativ", ""]) {
    const result = spawnSync(process.execPath, [runner], {
      encoding: "utf8",
      env: { ...process.env, FORM_TEST_CASE: name, FORM_TEST_BROWSER: "" },
      timeout: 5000,
    });
    assert.ifError(result.error);
    assert.equal(result.status, 1);
    assert.ok(
      result.stderr.includes(`Unknown FORM_TEST_CASE ${JSON.stringify(name)}.`),
      result.stderr,
    );
  }
});