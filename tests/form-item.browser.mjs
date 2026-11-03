import FormItem from "../src/components/form/form_item.ts";
import {
  createFormContextProvider,
  notifyFormValidity,
  provideFormContext,
  requestFormContext,
} from "../src/components/form/context.ts";

// Chromium --dump-dom throttles rAF; keep BaseComponent's frame batching deterministic.
window.requestAnimationFrame = (callback) => setTimeout(() => callback(performance.now()), 0);
window.cancelAnimationFrame = (handle) => clearTimeout(handle);
const checks = [];
const check = (name, pass) => checks.push({ name, pass: !!pass });
const frame = () => new Promise((resolve) => setTimeout(resolve, 30));
const message = (item) => item.shadowRoot.querySelector(".l-form-item__error")?.textContent;
try {
  customElements.define("l-test-form-item", FormItem);
  const host = document.createElement("div");
  const form = createFormContextProvider({ innerBlock: true, required: true });
  const dispose = provideFormContext(host, "form", form);
  document.body.append(host);
  const item = document.createElement("l-test-form-item");
  item.setAttribute("prop", "first");
  const rules = [];
  host.addEventListener("form-rule-change", (event) => rules.push(event.detail));
  host.append(item);
  const field = form.getFields()[0];
  check("stable-form-field-registration", form.getFields().length === 1 && field.target === item);
  check(
    "item-is-not-data-field",
    field.getSnapshot().name === "first" && field.getSnapshot().value === undefined,
  );
  const child = document.createElement("span");
  item.append(child);
  const context = requestFormContext(child, "item");
  check("nearest-item-provider", !!context && context.getSnapshot().prop === "first");
  check(
    "unset-item-configuration-inherits",
    context.getSnapshot().innerBlock === undefined && context.getSnapshot().required === undefined,
  );
  const snapshots = [];
  const unregister = context.registerField({
    target: child,
    getSnapshot: () => ({ value: undefined }),
  });
  child.addEventListener("l-form-context-configuration", (event) => snapshots.push(event.detail));
  item.setAttribute("inner-block", "false");
  item.setAttribute("required", "");
  item.setAttribute("disabled", "");
  item.setAttribute("prop", "second");
  check(
    "whole-snapshot-updates",
    context.getSnapshot().innerBlock === false &&
      context.getSnapshot().required === true &&
      context.getSnapshot().disabled === true &&
      context.getSnapshot().prop === "second",
  );
  check(
    "prop-refresh-preserves-registration-identity",
    form.getFields().length === 1 &&
      form.getFields()[0] === field &&
      field.getSnapshot().name === "second",
  );
  item.removeAttribute("inner-block");
  check(
    "removed-configuration-restores-inheritance",
    snapshots.at(-1).innerBlock === undefined && snapshots.at(-1).prop === "second",
  );
  form.updateConfiguration({ innerBlock: false });
  check(
    "configuration-reregisters-without-duplicates",
    form.getFields().length === 1 && form.getFields()[0] === field,
  );
  form.notifyValidity(field, { valid: false, message: "validation" });
  check("validation-message", message(item) === "validation");
  item.setAttribute("error", "explicit");
  await frame();
  form.notifyValidity(field, { valid: false, message: "new validation" });
  check("explicit-error-wins", message(item) === "explicit");
  item.setAttribute("error", "");
  await frame();
  check(
    "explicit-empty-hides-validation",
    message(item) === undefined && !item.classList.contains("is-error"),
  );
  item.removeAttribute("error");
  await frame();
  check("remove-explicit-restores-latest-validation", message(item) === "new validation");
  form.notifyValidity(field, { valid: true });
  check("validity-clears-validation", message(item) === undefined);
  form.notifyValidity(field, { valid: false, message: "stale" });
  item.setAttribute("prop", "third");
  check("rename-clears-stale-error", message(item) === undefined);
  item.setAttribute("verify", "email");
  item.setAttribute("validity", "Email required");
  item.setRules({ required: true, rules: ["email"], message: "custom" });
  check(
    "rule-event-api-retained",
    rules.at(-1).key === "third" &&
      rules.at(-1).message === "custom" &&
      rules.some((rule) => rule.message === "Email required"),
  );
  item.setAttribute("label", "Caption");
  item.setAttribute("label-position", "top");
  item.setAttribute("label-width", "120");
  await frame();
  check(
    "dynamic-layout",
    item.shadowRoot.querySelector("label").textContent === "Caption" &&
      item.classList.contains("l-form-item--top") &&
      !item.classList.contains("l-form-item--right") &&
      item.style.getPropertyValue("--l-form-label-width") === "120px",
  );
  unregister();
  item.remove();
  check("disconnect-unregisters", form.getFields().length === 0);
  notifyFormValidity(item, { valid: false, message: "detached" });
  host.append(item);
  check("remount-registers-once", form.getFields().length === 1 && form.getFields()[0] === field);
  check("detached-validity-listener-cleaned", message(item) === undefined);
  form.notifyValidity(field, { valid: false, message: "mounted" });
  check("remount-validity-listener-restored", message(item) === "mounted");
  item.remove();
  dispose();
  host.remove();
  document.querySelector("#result").textContent = JSON.stringify({
    checks,
    pass: checks.every((entry) => entry.pass),
  });
} catch (error) {
  document.querySelector("#result").textContent = JSON.stringify({
    checks,
    pass: false,
    error: String(error),
  });
}