import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const read = (file) => readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
function variables(css, selector = ":root") {
  const block = css.match(new RegExp(`${selector.replaceAll(".", "\\.")}\\s*\\{([^}]+)\\}`))[1];
  return Object.fromEntries(
    [...block.matchAll(/(--[\w-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]),
  );
}
function resolve(value, vars) {
  const match = value.match(/^var\((--[\w-]+),\s*(.+)\)$/);
  return match ? resolve(vars[match[1]] ?? match[2], vars) : value;
}
function rgb(value, background = [255, 255, 255]) {
  if (value.startsWith("#")) {
    let hex = value.slice(1);
    if (hex.length === 3) hex = [...hex].map((c) => c + c).join("");
    return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
  }
  const parts = value.match(/[\d.]+/g).map(Number);
  const alpha = parts[3] ?? 1;
  return parts.slice(0, 3).map((channel, i) => alpha * channel + (1 - alpha) * background[i]);
}
function luminance(color) {
  return color
    .map((v) => v / 255)
    .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
    .reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0);
}
function contrast(foreground, background) {
  const a = luminance(foreground),
    b = luminance(background);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}
const base = variables(read("styles/vars.css"));
const dark = variables(read("styles/dark.css"), ":root.dark");
const tag = read("src/components/tag/index.less").match(/:host\(\.l-tag--info\)\s*\{([^}]+)\}/)[1];
const tagVars = Object.fromEntries(
  [...tag.matchAll(/(--[\w-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2]]),
);

test("info Tag uses fill tokens for background, never secondary text tokens", () => {
  assert.match(tagVars["--l-tag-background"], /--l-fill-secondary-color/);
  assert.doesNotMatch(tagVars["--l-tag-background"], /--l-text/);
});

for (const theme of ["default", "jade", "coral", "tangerine"]) {
  const themed =
    theme === "default" ? base : { ...base, ...variables(read(`styles/theme-${theme}.css`)) };
  for (const isDark of [false, true]) {
    test(`${theme} ${isDark ? "dark" : "light"}: info and Upload secondary text retain 4.5:1 contrast`, () => {
      // :root.dark is more specific than a theme's :root, independent of import order.
      const vars = isDark ? { ...themed, ...dark } : themed;
      const bg = rgb(resolve(tagVars["--l-tag-background"], vars));
      const text = rgb(resolve(tagVars["--l-tag-color"], vars), bg);
      assert(contrast(text, bg) >= 4.5, `Tag contrast: ${contrast(text, bg)}`);
      const uploadBg = rgb(isDark ? vars["--l-upload-background"] : "#ffffff");
      const secondary = resolve(
        isDark ? vars["--l-upload-text-secondary-color"] : vars["--l-text-secondary-color"],
        vars,
      );
      const uploadText = rgb(secondary, uploadBg);
      assert(
        contrast(uploadText, uploadBg) >= 4.5,
        `Upload contrast: ${contrast(uploadText, uploadBg)}`,
      );
    });
  }
}