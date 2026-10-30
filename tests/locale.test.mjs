import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { stripTypeScriptTypes } from "node:module";
import { test } from "node:test";
import { runInNewContext } from "node:vm";

const source = (path) => stripTypeScriptTypes(readFileSync(new URL(path, import.meta.url), "utf8"));
const localeSource = source("../src/components/utils/locale.ts").replace(
  "export function",
  "function",
);
const resolve = (environment = {}) => runInNewContext(`${localeSource}; getLocale`, environment);
const storage = (value) => ({
  getItem: (key) => {
    assert.equal(key, "locale");
    return value;
  },
});

test("locale sources respect explicit, stored, page and browser precedence", () => {
  const environment = {
    window: { sessionStorage: storage("en_GB"), localStorage: storage("zh-TW") },
    document: { documentElement: { lang: "en-US" } },
    navigator: { languages: ["zh-HK"], language: "en-AU" },
  };
  const getLocale = resolve(environment);
  assert.equal(getLocale("zh_cn"), "zh-CN");
  assert.equal(getLocale(), "en-GB");
  environment.window.sessionStorage = storage(null);
  assert.equal(getLocale(), "zh-TW");
  environment.window.localStorage = storage(null);
  assert.equal(getLocale(), "en-US");
  environment.document.documentElement.lang = "";
  assert.equal(getLocale(), "zh-HK");
  environment.navigator.languages = [];
  assert.equal(getLocale(), "en-AU");
});

test("only plain locale strings are read; invalid data, blocked storage and SSR are safe", () => {
  const environment = {
    window: { sessionStorage: storage("en-US") },
  };
  const getLocale = resolve(environment);
  assert.equal(getLocale(), "en-US");
  environment.window.sessionStorage = storage(JSON.stringify({ value: "en-US", expire: 0 }));
  assert.equal(getLocale(), "zh-CN");
  for (const value of ["{broken", '"en-US"', "42", "", '{"value":null}']) {
    environment.window.sessionStorage = storage(value);
    assert.equal(getLocale(), "zh-CN");
  }
  Object.defineProperty(environment.window, "sessionStorage", {
    get() {
      throw new Error("blocked");
    },
  });
  assert.equal(getLocale(), "zh-CN");
  assert.equal(
    resolve({
      window: { sessionStorage: { getItem: (key) => (key === "l_app_locale" ? "en-US" : null) } },
    })(),
    "zh-CN",
  );
  assert.equal(resolve()(), "zh-CN");
  assert.equal(resolve({ navigator: { language: "en-US", languages: ["en-US"] } })(), "zh-CN");
  assert.equal(resolve()("en_us"), "en-US");
});

test("Calendar resolves language families, updates headers and handles unsupported locales", () => {
  const environment = { document: { documentElement: { lang: "zh-CN" } } };
  const getLocale = resolve(environment);
  const langs = runInNewContext(
    source("../src/components/calendar/langs.ts").replace("export const", "const") + "; langs",
  );
  const calendarSource = source("../src/components/calendar/index.ts")
    .replace(/^import .*;\r?$/gm, "")
    .replace("export default class Calendar", "class Calendar");
  const Calendar = runInNewContext(`${calendarSource}; Calendar`, {
    BaseComponent: class {},
    getLocale,
    langs,
  });
  const calendar = new Calendar();
  assert(calendar._renderHeader().includes("一"));
  assert(calendar._renderHeader().includes("七"));
  for (const locale of ["en", "en-GB", "EN_us"]) {
    calendar.attributeChanged("locale", null, locale);
    assert.equal(calendar._state.locale, "en-US");
    assert(calendar._renderHeader().startsWith("<tr><th>Mon</th>"));
    assert(calendar._renderHeader().includes("Sun"));
  }
  calendar.attributeChanged("locale", null, "fr-FR");
  assert.equal(calendar._state.locale, "zh-CN");
  environment.document.documentElement.lang = "en-US";
  calendar.attributeChanged("locale", "fr-FR", null);
  assert.equal(calendar._state.locale, "en-US");
  let headerUpdates = 0;
  calendar.rerenderHeader = () => headerUpdates++;
  calendar.rerender = () => "updated dates";
  calendar.$container = {};
  calendar.updateDOM(new Set(["locale", "month"]));
  assert.equal(headerUpdates, 1);
  assert.equal(calendar.$container.innerHTML, "updated dates");
});