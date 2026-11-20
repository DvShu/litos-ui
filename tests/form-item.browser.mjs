import FormItem from "../src/components/form/form_item.ts";
import Form from "../src/components/form/index.ts";
import Input from "../src/components/input/index.ts";
import InputNumber from "../src/components/input_number/index.ts";
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
const label = (item) => item.shadowRoot.querySelector(".l-form-item__label");
const description = (control) =>
  (control.getAttribute("aria-describedby") ?? "")
    .split(/\s+/)
    .map((id) => control.getRootNode().getElementById(id)?.textContent)
    .filter(Boolean)
    .join(" ");
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

  customElements.define("l-form-item", class extends FormItem {});
  customElements.define("l-input", Input);
  customElements.define("l-input-number", InputNumber);
  const rows = document.createElement("div");
  rows.innerHTML = `
    <l-form-item label="Quantity" required error="Value required">
      <div><l-input-number value="3" aria-describedby="hint"></l-input-number></div>
    </l-form-item>
    <l-form-item label="Notice" error="Check this value">
      <input id="notice" aria-describedby="hint" aria-invalid="false" />
    </l-form-item>
    <l-form-item label="Contact" error="Choose a contact method" required>
      <l-input aria-label="Telephone"></l-input><l-input aria-labelledby="mail-name"></l-input>
    </l-form-item>
    <l-form-item><l-input aria-label="Unlabelled row"></l-input></l-form-item>
    <l-form-item label="Toggle"><input type="checkbox" /></l-form-item>
    <span id="hint">Existing help</span><span id="mail-name">Email</span>`;
  document.body.append(rows);
  await frame();
  const [numberItem, nativeItem, contactItem, blankItem, toggleItem] =
    rows.querySelectorAll("l-form-item");
  const number = numberItem.querySelector("l-input-number");
  const editor = number.shadowRoot.querySelector("input");
  const native = nativeItem.querySelector("input");
  const toggle = toggleItem.querySelector("input");
  const [telephone, mail] = Array.from(
    contactItem.querySelectorAll("l-input"),
    (input) => input.$inner,
  );
  const content = contactItem.shadowRoot.querySelector(".l-form-item__content");
  let clicks = 0;
  number.addEventListener("click", () => clicks++);
  label(numberItem).click();
  check(
    "single-label-focuses-number-editor-without-activating-stepper",
    document.activeElement === number &&
      number.shadowRoot.activeElement === editor &&
      clicks === 0 &&
      number.value === 3 &&
      !label(numberItem).control,
  );
  check(
    "single-label-and-required-reach-number-editor",
    editor.getAttribute("aria-label") === "Quantity" &&
      editor.getAttribute("aria-required") === "true" &&
      label(numberItem).querySelector('[aria-hidden="true"]') !== null,
  );
  check(
    "shadow-error-description-keeps-author-help",
    description(editor) === "Existing help Value required" &&
      editor.getAttribute("aria-invalid") === "true",
  );
  check(
    "native-label-and-error-use-same-tree",
    native.getAttribute("aria-label") === "Notice" &&
      description(native) === "Existing help Check this value" &&
      native.getAttribute("aria-invalid") === "true",
  );
  nativeItem.replaceChildren(native);
  await frame();
  check(
    "same-native-field-recovers-description-after-dom-replacement",
    description(native) === "Existing help Check this value",
  );
  label(nativeItem).click();
  check("native-label-focuses-native-field", document.activeElement === native);
  label(contactItem).click();
  check(
    "multi-control-caption-names-group-and-keeps-individual-names",
    content.getAttribute("role") === "group" &&
      contactItem.shadowRoot.getElementById(content.getAttribute("aria-labelledby")) ===
        label(contactItem) &&
      telephone.getAttribute("aria-label") === "Telephone" &&
      mail.getAttribute("aria-label") === "Email" &&
      document.activeElement === native,
  );
  check(
    "shared-row-error-associated-once-at-group",
    description(content) === "Choose a contact method" &&
      !description(telephone) &&
      !description(mail) &&
      !contactItem.shadowRoot.querySelector("[aria-live],[role=alert]"),
  );
  notifyFormValidity(telephone.getRootNode().host, {
    valid: false,
    message: "Choose a contact method",
  });
  check("shared-error-not-repeated-on-field", !description(telephone) && !!description(content));
  telephone.getRootNode().host.name = "phone";
  mail.getRootNode().host.name = "email";
  notifyFormValidity(telephone.getRootNode().host, { valid: true });
  contactItem.setAttribute("prop", "email");
  await frame();
  check(
    "named-field-gets-its-error-within-multi-control-row",
    !description(content) &&
      !description(telephone) &&
      description(mail) === "Choose a contact method",
  );
  check(
    "no-label-row-preserves-explicit-name-and-default-slot",
    !label(blankItem) &&
      blankItem.querySelector("l-input").$inner.getAttribute("aria-label") === "Unlabelled row" &&
      Array.from(numberItem.shadowRoot.querySelectorAll("slot"), (slot) => slot.name).join() === "",
  );
  let changes = 0;
  toggle.addEventListener("change", () => changes++);
  label(toggleItem).click();
  check(
    "label-focus-does-not-toggle-checkbox",
    document.activeElement === toggle && !toggle.checked && changes === 0,
  );
  numberItem.setAttribute("disabled", "");
  label(numberItem).click();
  check("label-does-not-focus-disabled-control", document.activeElement === toggle);
  numberItem.removeAttribute("disabled");
  numberItem.setAttribute("label", "New quantity");
  numberItem.removeAttribute("error");
  await frame();
  check(
    "rename-and-clear-update-shadow-accessibility",
    editor.getAttribute("aria-label") === "New quantity" &&
      description(editor) === "Existing help" &&
      editor.getAttribute("aria-invalid") === "false",
  );
  native.setAttribute("aria-labelledby", "mail-name");
  nativeItem.removeAttribute("error");
  await frame();
  check(
    "clearing-native-error-restores-authored-attributes",
    !native.hasAttribute("aria-label") &&
      native.getAttribute("aria-labelledby") === "mail-name" &&
      native.getAttribute("aria-describedby") === "hint" &&
      native.getAttribute("aria-invalid") === "false",
  );
  native.removeAttribute("aria-labelledby");
  nativeItem.setAttribute("error", "Old error");
  await frame();
  blankItem.setAttribute("label", "New row");
  blankItem.setAttribute("error", "New error");
  blankItem.replaceChildren(native);
  await frame();
  check(
    "move-transfers-native-label-and-error-ownership",
    native.getAttribute("aria-label") === "New row" &&
      description(native) === "Existing help New error" &&
      !nativeItem.querySelector("[hidden]"),
  );
  rows.append(native);
  await frame();
  check(
    "removing-native-control-cleans-managed-name-and-error",
    !native.hasAttribute("aria-label") &&
      native.getAttribute("aria-describedby") === "hint" &&
      native.getAttribute("aria-invalid") === "false",
  );
  rows.remove();
  const app = document.body.appendChild(document.createElement("div"));
  const appRoot = app.attachShadow({ mode: "open" });
  appRoot.innerHTML =
    '<l-form-item label="Shadow field" error="Shadow error"><input></l-form-item>';
  const shadowItem = appRoot.querySelector("l-form-item");
  const shadowField = shadowItem.querySelector("input");
  label(shadowItem).click();
  check(
    "same-tree-native-association-inside-app-shadow-root",
    appRoot.activeElement === shadowField &&
      shadowField.getAttribute("aria-label") === "Shadow field" &&
      description(shadowField) === "Shadow error",
  );
  shadowItem.setAttribute("label", "");
  shadowItem.setAttribute("required", "");
  await frame();
  check(
    "empty-caption-keeps-required-indicator-without-creating-a-name",
    label(shadowItem).getAttribute("aria-hidden") === "true" &&
      getComputedStyle(label(shadowItem), "::before").content === '"*"' &&
      !shadowField.hasAttribute("aria-label") &&
      shadowField.getAttribute("aria-required") === "true",
  );
  app.remove();

  customElements.define("l-form", Form);
  const layoutForm = document.createElement("l-form");
  layoutForm.setAttribute("inner-block", "");
  layoutForm.setAttribute("label-position", "left");
  layoutForm.innerHTML = `
    <l-form-item label="Inherited">
      <l-input block></l-input>
      <l-input-number></l-input-number>
    </l-form-item>
    <l-form-item label="Right" label-position="right"></l-form-item>
    <l-form-item label="" label-position="left"></l-form-item>`;
  document.body.append(layoutForm);
  const [inheritedItem, rightItem, leftItem] = layoutForm.querySelectorAll("l-form-item");
  const layoutInput = inheritedItem.querySelector("l-input");
  const layoutNumber = inheritedItem.querySelector("l-input-number");
  const isBlock = (control) => control.classList.contains("is-block");
  const textAlign = (item) => getComputedStyle(label(item)).textAlign;
  check(
    "explicit-right-overrides-left-form-label-alignment",
    textAlign(inheritedItem) === "left" && textAlign(rightItem) === "right",
  );
  layoutInput.removeAttribute("block");
  await frame();
  check(
    "removing-local-block-keeps-inherited-block",
    isBlock(layoutInput) && isBlock(layoutNumber),
  );

  layoutInput.setAttribute("block", "");
  layoutForm.removeAttribute("inner-block");
  await frame();
  check(
    "removing-inherited-block-keeps-local-block",
    isBlock(layoutInput) && !isBlock(layoutNumber),
  );

  layoutForm.setAttribute("inner-block", "");
  inheritedItem.setAttribute("inner-block", "false");
  await frame();
  check(
    "item-false-overrides-form-block-with-local-block-preserved",
    isBlock(layoutInput) && !isBlock(layoutNumber),
  );
  layoutInput.removeAttribute("block");
  await frame();
  check(
    "block-clears-when-neither-setting-enables-it",
    !isBlock(layoutInput) && !isBlock(layoutNumber),
  );
  inheritedItem.removeAttribute("inner-block");
  check(
    "removing-item-override-restores-form-block",
    isBlock(layoutInput) && isBlock(layoutNumber),
  );

  layoutForm.setAttribute("label-position", "top");
  await frame();
  check(
    "explicit-horizontal-items-override-top-form-layout",
    getComputedStyle(inheritedItem).display === "grid" &&
      getComputedStyle(rightItem).display === "flex" &&
      textAlign(rightItem) === "right" &&
      getComputedStyle(leftItem).display === "flex" &&
      textAlign(leftItem) === "left" &&
      getComputedStyle(label(leftItem)).display !== "none",
  );
  rightItem.removeAttribute("label-position");
  leftItem.setAttribute("label-position", "");
  await frame();
  check(
    "missing-and-empty-label-position-inherit-the-form-layout",
    getComputedStyle(rightItem).display === "grid" &&
      textAlign(rightItem) === "left" &&
      getComputedStyle(leftItem).display === "grid" &&
      getComputedStyle(label(leftItem)).display === "none",
  );
  layoutForm.remove();
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