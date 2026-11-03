import { Input, Form, FormItem, regist } from "../src/components/index.ts";
const checks = [],
  errors = [];
const check = (name, pass) => checks.push({ name, pass: !!pass });
window.addEventListener("error", (e) => errors.push(e.message));
const tick = () => new Promise((r) => setTimeout(r, 25));
try {
  regist(Form);
  regist(FormItem);
  regist(Input);
  await tick();
  const form = document.querySelector("#native"),
    host = document.querySelector("#field"),
    inner = host.$inner,
    label = form.querySelector("label");
  check(
    "native-labels",
    host.labels.length === 1 && host.labels[0] === label && label.control === host,
  );
  check(
    "inner-accessible-name",
    inner.getAttribute("aria-label") === "姓名" &&
      !inner.hasAttribute("name") &&
      !host.hasAttribute("role"),
  );
  check("delegates-focus", host.shadowRoot.delegatesFocus);
  host.focus();
  check(
    "program-focus",
    document.activeElement === host && host.shadowRoot.activeElement === inner,
  );
  host.blur();
  label.click();
  check("label-activation-focus", host.shadowRoot.activeElement === inner);
  label.textContent = "新姓名";
  await tick();
  check("dynamic-label-text", inner.getAttribute("aria-label") === "新姓名");
  const decoration = document.createElement("span");
  decoration.setAttribute("aria-hidden", "true");
  decoration.textContent = "装饰";
  label.append(decoration);
  await tick();
  check("hidden-decoration-excluded", inner.getAttribute("aria-label") === "新姓名");
  label.htmlFor = "other";
  await tick();
  check("label-unbind-clears-name", !inner.hasAttribute("aria-label"));
  label.htmlFor = "field";
  await tick();
  check("label-rebind-restores-name", inner.getAttribute("aria-label") === "新姓名");
  host.setAttribute("aria-label", "别名");
  check("explicit-accessible-name", inner.getAttribute("aria-label") === "别名");
  host.removeAttribute("aria-label");
  const title = document.createElement("span");
  title.id = "title";
  title.textContent = "关联名称";
  document.body.append(title);
  host.setAttribute("aria-labelledby", "title");
  check(
    "labelledby-text-bridge",
    inner.getAttribute("aria-label") === "关联名称" && !inner.hasAttribute("aria-labelledby"),
  );
  host.removeAttribute("aria-labelledby");
  let inputs = 0,
    changes = 0;
  host.addEventListener("input", () => inputs++);
  host.addEventListener("change", () => changes++);
  host.value = "program";
  host.setValue("method");
  check(
    "program-no-user-events",
    inputs === 0 &&
      changes === 0 &&
      inner.value === "method" &&
      new FormData(form).get("name") === "method",
  );
  inner.value = "typed";
  inner.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
  inner.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
  check(
    "one-input-one-change",
    inputs === 1 &&
      changes === 1 &&
      host.value === "typed" &&
      new FormData(form).getAll("name").length === 1,
  );
  let clear = host.shadowRoot.querySelector(".l-clearable");
  check(
    "clear-accessible-button",
    clear?.tagName === "BUTTON" && clear.type === "button" && !!clear.getAttribute("aria-label"),
  );
  clear.click();
  check(
    "clear-one-event-and-focus",
    inputs === 2 &&
      changes === 1 &&
      host.value === "" &&
      inner.value === "" &&
      new FormData(form).get("name") === "" &&
      host.shadowRoot.activeElement === inner,
  );
  host.value = "kept";
  clear = host.shadowRoot.querySelector(".l-clearable");
  host.readOnly = true;
  check("readonly-immediate", inner.readOnly && !host.shadowRoot.querySelector(".l-clearable"));
  clear.click();
  check("stale-clear-blocked-readonly", host.value === "kept");
  host.readOnly = false;
  host.disabled = true;
  check(
    "disabled-ui-exclusion",
    inner.disabled && !new FormData(form).has("name") && !host.willValidate,
  );
  host.disabled = false;
  host.setAttribute("readonly", "false");
  check("readonly-false", !inner.readOnly);
  host.removeAttribute("readonly");
  host.setAttribute("type", "number");
  host.value = "invalid";
  check(
    "number-sanitized-consistency",
    host.value === "" && inner.value === "" && new FormData(form).get("name") === "",
  );
  host.value = "4";
  host.setAttribute("min", "5");
  check("number-min", host.validity.rangeUnderflow && inner.min === "5");
  host.setAttribute("maxlength", "1");
  check("number-length-not-applicable", !host.validity.tooLong);
  host.removeAttribute("type");
  host.removeAttribute("min");
  host.removeAttribute("maxlength");
  host.value = "abcdef";
  host.setAttribute("type", "email");
  check("dynamic-type-validity", inner.type === "email" && host.validity.typeMismatch);
  host.removeAttribute("type");
  check("removed-type-default", inner.type === "text");
  host.setAttribute("required", "");
  host.value = "";
  check(
    "required-empty",
    host.validity.valueMissing && inner.getAttribute("aria-required") === "true",
  );
  host.removeAttribute("required");
  host.setAttribute("pattern", "[A-Z]+");
  host.value = "abc";
  check("pattern-program", host.validity.patternMismatch);
  host.removeAttribute("pattern");
  host.name = "renamed";
  check(
    "rename-native-data",
    !new FormData(form).has("name") && new FormData(form).get("renamed") === "abc",
  );
  host.defaultValue = 0;
  host.value = "dirty";
  form.reset();
  check(
    "reset-zero-no-events",
    host.value === 0 && inner.value === "0" && inputs === 2 && changes === 1,
  );
  const lib = document.querySelector("#library"),
    libInput = lib.querySelector("l-input"),
    item = lib.querySelector("l-form-item");
  check(
    "item-accessible-name-required",
    libInput.$inner.getAttribute("aria-label") === "账号" &&
      libInput.$inner.getAttribute("aria-required") === "true",
  );
  item.setAttribute("required", "false");
  check("dynamic-item-required-false", libInput.$inner.getAttribute("aria-required") === "false");
  item.setAttribute("label", "新账号");
  await tick();
  check("item-dynamic-label", libInput.$inner.getAttribute("aria-label") === "新账号");
  const sheet = host.shadowRoot.adoptedStyleSheets[0];
  host.remove();
  form.append(host);
  await tick();
  host.value = "again";
  host.$inner.value = "edit";
  host.$inner.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
  check(
    "remount-one-listener-and-shared-sheet",
    inputs === 3 && host.value === "edit" && host.shadowRoot.adoptedStyleSheets[0] === sheet,
  );
  check("no-browser-errors", errors.length === 0);
  document.querySelector("#result").textContent = JSON.stringify({
    userAgent: navigator.userAgent,
    checks,
    errors,
    pass: checks.every((c) => c.pass),
  });
} catch (error) {
  document.querySelector("#result").textContent = JSON.stringify({
    pass: false,
    error: String(error),
    checks,
    errors,
  });
}