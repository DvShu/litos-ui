import { Button, Form, FormItem, Input, InputNumber, regist } from "../src/components/index.ts";
import { FORM_CONTEXT_EVENTS } from "../src/components/form/context.ts";
import { Validator } from "utilane";
const checks = [];
const check = (name, pass) => checks.push({ name, pass: !!pass });
const tick = () => new Promise((resolve) => setTimeout(resolve, 0));
const settleSubmit = () => new Promise((resolve) => setTimeout(resolve, 30));
const typeValue = (input, value) => {
  input.$inner.value = value;
  input.$inner.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
};
try {
  const upgradeForm = document.createElement("l-form");
  upgradeForm.innerHTML =
    '<l-button html-type="submit">Enabled</l-button><l-button html-type="submit">Disabled</l-button>';
  const [initiallyEnabledButton, initiallyDisabledButton] =
    upgradeForm.querySelectorAll("l-button");
  initiallyEnabledButton.disabled = false;
  initiallyDisabledButton.disabled = true;
  document.body.append(upgradeForm);
  regist(Button);
  regist(Form);
  regist(FormItem);
  regist(Input);
  regist(InputNumber);
  await tick();
  let upgradeSubmits = 0;
  upgradeForm.addEventListener("submit", () => upgradeSubmits++);
  check(
    "button-upgrade-applies-initial-disabled-properties",
    !initiallyEnabledButton.$btn.disabled &&
      !initiallyEnabledButton.hasAttribute("disabled") &&
      initiallyDisabledButton.$btn.disabled &&
      initiallyDisabledButton.hasAttribute("disabled"),
  );
  initiallyEnabledButton.disabled = true;
  initiallyEnabledButton.click();
  await settleSubmit();
  check(
    "button-upgrade-allows-later-disable-and-blocks-programmatic-click",
    initiallyEnabledButton.$btn.disabled &&
      initiallyEnabledButton.hasAttribute("disabled") &&
      upgradeSubmits === 0,
  );
  initiallyDisabledButton.disabled = false;
  initiallyDisabledButton.click();
  await settleSubmit();
  check(
    "button-upgrade-allows-later-enable-and-submits-once",
    !initiallyDisabledButton.$btn.disabled &&
      !initiallyDisabledButton.hasAttribute("disabled") &&
      upgradeSubmits === 1,
  );
  upgradeForm.remove();

  const form = document.querySelector("#form"),
    input = form.querySelector("l-input"),
    item = form.querySelector("l-form-item");
  const owner = form.nativeForm;
  check("same-markup-owner", input.form === owner && owner.parentNode === form);
  check("no-shadow-native-form", !form.shadowRoot.querySelector("form"));
  check(
    "helper-unprojected",
    owner.hidden && owner.assignedSlot === null && owner.slot === "__l_form_owner",
  );
  check("helper-skips-native-submit-validation", owner.noValidate);
  const layout = form.shadowRoot.querySelector(".l-form");
  check(
    "layout-classes-preserved",
    layout.classList.contains("l-form-inline") && layout.classList.contains("l-form--top"),
  );
  check("label-width-preserved", form.style.getPropertyValue("--l-form-label-width") === "120px");
  check("initial-name-and-data", input.name === "name" && form.getData().name === "");
  const errorText = () => item.shadowRoot.querySelector(".l-form-item__error")?.textContent;
  let submits = 0,
    last,
    errorsClearedOnSubmit;
  form.addEventListener("submit", (e) => {
    submits++;
    last = e.detail;
    errorsClearedOnSubmit =
      Object.keys(form.validationErrors).length === 0 &&
      !errorText() &&
      !input.classList.contains("is-error");
  });
  form.submit();
  await tick();
  const requiredError = form.validationErrors.name;
  check("failure-no-submit", submits === 0 && !!requiredError && errorText() === requiredError);
  const validateKey = form.validator.validateKey.bind(form.validator);
  const validatedValues = [];
  form.validator.validateKey = (name, value, data) => {
    validatedValues.push(value);
    return validateKey(name, value, data);
  };
  input.setAttribute("clearable", "");
  typeValue(input, "Alice");
  check(
    "valid-input-clears-previous-error-immediately",
    !form.validationErrors.name && !errorText() && !input.classList.contains("is-error"),
  );
  input.shadowRoot.querySelector(".l-clearable").click();
  check(
    "clear-button-validates-once",
    errorText() === requiredError && input.classList.contains("is-error"),
  );
  typeValue(input, "Alice");
  check(
    "one-validation-per-edit-without-submit",
    submits === 0 && JSON.stringify(validatedValues) === JSON.stringify(["Alice", "", "Alice"]),
  );
  form.setErrors({ name: "旧提示" });
  input.value = "Alice";
  check("programmatic-value-skips-live-validation", validatedValues.length === 3 && !!errorText());
  form.submit();
  await tick();
  check("success-once", submits === 1 && last.name === "Alice");
  check("success-clears-errors-before-submit-event", errorsClearedOnSubmit);
  check("native-FormData", new FormData(owner).get("name") === "Alice");
  let resets = 0;
  const reset = input.reset.bind(input);
  input.reset = () => {
    resets++;
    reset();
  };
  form.reset();
  await tick();
  check("reset-once", resets === 1 && input.value === "" && form.getData().name === "");
  check("reset-clears-errors", Object.keys(form.validationErrors).length === 0);
  check("reset-FormData", new FormData(owner).get("name") === "");
  input.value = "Bob";
  owner.requestSubmit();
  await tick();
  check("native-submit-bridge", submits === 2 && last.name === "Bob");
  const alone = document.querySelector("#standalone"),
    single = alone.querySelector("l-input");
  single.value = "changed";
  check("standalone-data", new FormData(alone).get("alone") === "changed");
  alone.reset();
  check(
    "standalone-reset",
    single.value === "initial" && new FormData(alone).get("alone") === "initial",
  );
  let resetCancelled = (event) => event.preventDefault();
  owner.addEventListener("reset", resetCancelled);
  input.value = "kept";
  form.reset();
  await tick();
  check("cancelled-reset-preserves-value", input.value === "kept" && resets === 1);
  owner.removeEventListener("reset", resetCancelled);
  const zero = document.createElement("l-input");
  zero.name = "zero";
  zero.defaultValue = 0;
  alone.append(zero);
  zero.value = 4;
  alone.reset();
  check("zero-reset-baseline", zero.value === "0" && new FormData(alone).get("zero") === "0");
  const bool = document.createElement("l-input");
  bool.name = "bool";
  bool.defaultValue = false;
  alone.append(bool);
  bool.value = true;
  alone.reset();
  check(
    "false-reset-baseline",
    bool.value === "false" && new FormData(alone).get("bool") === "false",
  );
  const outer = document.createElement("form");
  document.body.append(outer);
  const embedded = document.createElement("l-form");
  outer.append(embedded);
  const embeddedInput = document.createElement("l-input");
  embeddedInput.name = "embedded";
  embeddedInput.value = "outer";
  embedded.append(embeddedInput);
  await tick();
  check(
    "native-ancestor-reused-production",
    embedded.nativeForm === outer &&
      embeddedInput.form === outer &&
      embedded.querySelector("form") === null,
  );
  let typed = 0;
  input.addEventListener("change", () => typed++);
  typeValue(input, "typed");
  check(
    "user-input-synchronizes",
    form.getData().name === "typed" && new FormData(owner).get("name") === "typed",
  );
  const formSheet = form.shadowRoot.adoptedStyleSheets[0];
  const itemSheet = item.shadowRoot.adoptedStyleSheets[0];
  const peerItem = document.createElement("l-form-item");
  embedded.append(peerItem);
  await tick();
  check(
    "form-shares-constructed-sheet",
    formSheet instanceof CSSStyleSheet &&
      form.shadowRoot.adoptedStyleSheets.length === 1 &&
      embedded.shadowRoot.adoptedStyleSheets[0] === formSheet,
  );
  check(
    "item-shares-separate-constructed-sheet",
    itemSheet instanceof CSSStyleSheet &&
      item.shadowRoot.adoptedStyleSheets.length === 1 &&
      peerItem.shadowRoot.adoptedStyleSheets[0] === itemSheet &&
      itemSheet !== formSheet,
  );
  check(
    "no-instance-style-elements",
    !form.shadowRoot.querySelector("style") && !item.shadowRoot.querySelector("style"),
  );
  check(
    "constructed-sheets-have-rules",
    formSheet.cssRules.length > 0 && itemSheet.cssRules.length > 0,
  );
  peerItem.remove();
  const savedOwner = owner;
  form.remove();
  check("disconnect-no-orphan", !savedOwner.isConnected);
  document.body.append(form);
  await tick();
  check(
    "remount-reuses-form-item-sheets",
    form.shadowRoot.adoptedStyleSheets[0] === formSheet &&
      item.shadowRoot.adoptedStyleSheets[0] === itemSheet &&
      !form.shadowRoot.querySelector("style") &&
      !item.shadowRoot.querySelector("style"),
  );
  input.value = "reconnect";
  form.submit();
  await tick();
  check(
    "reconnect-validator-and-owner",
    submits === 3 && last.name === "reconnect" && input.form === form.nativeForm,
  );
  form.setAttribute("inline", "false");
  form.setAttribute("label-position", "left");
  // 与 BaseComponent 的批量渲染同一帧，稍后检查类更新。
  await new Promise((resolve) => setTimeout(resolve, 100));
  // 无可见窗口时浏览器可能暂停动画帧；显式刷新批次保证布局断言确定。
  form.updateDOM(new Set(["inline", "label-position"]));
  check(
    "dynamic-layout",
    form.shadowRoot.querySelector(".l-form").classList.contains("l-form--left") &&
      !form.shadowRoot.querySelector(".l-form").classList.contains("l-form-inline"),
  );
  const multi = document.createElement("l-form");
  multi.innerHTML =
    '<l-form-item required label="姓名" prop="name"><l-input></l-input></l-form-item><l-form-item required label="密码" prop="password"><l-input type="password"></l-input></l-form-item><l-form-item required label="确认密码" prop="confirmPassword"><l-input type="password"></l-input></l-form-item>';
  document.body.append(multi);
  await tick();
  typeValue(multi.querySelector("l-input"), "");
  check(
    "input-does-not-show-unrelated-required-errors",
    !!multi.validationErrors.name && Object.keys(multi.validationErrors).length === 1,
  );
  const allInvalid = await multi.validate();
  check(
    "validate-collects-all-field-errors",
    !allInvalid.result && Object.keys(allInvalid.errors).length === 3,
  );
  let multiSubmits = 0;
  multi.addEventListener("submit", () => multiSubmits++);
  multi.submit();
  await tick();
  check(
    "one-submit-shows-all-field-errors",
    multiSubmits === 0 &&
      ["name", "password", "confirmPassword"].every((key) => !!multi.validationErrors[key]) &&
      Array.from(multi.querySelectorAll("l-form-item")).every((item) =>
        item.shadowRoot.textContent.includes(multi.validationErrors[item.getAttribute("prop")]),
      ),
  );
  multi.querySelector("l-input").value = "Alice";
  multi.submit();
  await tick();
  check(
    "resubmit-preserves-all-remaining-errors",
    !multi.validationErrors.name &&
      !!multi.validationErrors.password &&
      !!multi.validationErrors.confirmPassword &&
      multiSubmits === 0,
  );
  const manualField = multi.querySelector("l-input");
  manualField.defaultValue = "reset-default";
  manualField.value = "edited";
  manualField.setValidity({ customError: true }, "手动校验错误");
  multi.setErrors({ name: "业务错误" });
  multi.reset();
  await tick();
  check(
    "reset-clears-business-errors-preserves-manual-validity",
    Object.keys(multi.validationErrors).length === 0 &&
      manualField.value === "reset-default" &&
      manualField.validity.customError &&
      manualField.validationMessage === "手动校验错误" &&
      !manualField.validity.valid,
  );
  check(
    "reset-clears-business-error-display",
    !manualField.classList.contains("is-error") &&
      !multi.querySelector("l-form-item").shadowRoot.textContent.includes("业务错误"),
  );
  manualField.setValidity();
  check("manual-validity-explicit-clear", manualField.checkValidity());
  manualField.setValidity({ customError: true }, "独立重置保留");
  manualField.reset();
  check("field-reset-preserves-manual-validity", manualField.validationMessage === "独立重置保留");
  manualField.setValidity();
  multi.setAttribute("emit-error", "");
  const inputResults = [];
  multi.addEventListener("validate-error", ({ detail }) => inputResults.push(detail));
  typeValue(manualField, "");
  typeValue(manualField, "Alice");
  check(
    "emit-error-reports-field-failure-and-success",
    inputResults.length === 2 &&
      inputResults.every(
        ({ all }) => Array.isArray(all) && all.length === 1 && all[0] === "name",
      ) &&
      !!inputResults[0].errors.name &&
      Object.hasOwn(inputResults[1].errors, "name") &&
      inputResults[1].errors.name === undefined &&
      !manualField.classList.contains("is-error"),
  );
  multi.setAttribute("novalidate", "");
  typeValue(manualField, "");
  check("novalidate-skips-input-validation", inputResults.length === 2);
  multi.remove();

  const actions = document.createElement("form");
  actions.id = "button-native-form";
  actions.innerHTML = `
    <l-input name="user" required></l-input>
    <l-button html-type="submit"><b>Save</b></l-button>
    <l-button html-type="reset">Reset</l-button>
  `;
  document.body.append(actions);
  const [save, resetButton] = actions.querySelectorAll("l-button");
  const field = actions.querySelector("l-input");
  const native = save.shadowRoot.querySelector("button");
  const label = save.querySelector("b");
  let actionsSubmitted = 0;
  let submitter;
  let submitterValue;
  actions.addEventListener("submit", (event) => {
    event.preventDefault();
    actionsSubmitted++;
    submitter = event.submitter;
    submitterValue = new FormData(actions, event.submitter).get("action");
  });
  check(
    "native-button-shadow-dom",
    save.form === actions && native.form === null && label.parentElement === save,
  );
  const pageStyles = document.head.appendChild(document.createElement("style"));
  pageStyles.textContent = ".l-btn { padding: 0; }";
  check("button-owns-appearance", getComputedStyle(native).paddingInlineStart === "15px");
  pageStyles.textContent += "l-button::part(default) { padding-inline: 23px; }";
  check("button-part-can-be-styled", getComputedStyle(native).paddingInlineStart === "23px");
  pageStyles.remove();
  save.click();
  await tick();
  check("native-button-constraint-validation", actionsSubmitted === 0);
  field.value = "Alice";
  save.addEventListener("click", (event) => event.preventDefault(), { once: true });
  save.click();
  await tick();
  check("cancelled-button-click-does-not-submit", actionsSubmitted === 0);
  save.setAttribute("name", "action");
  save.setAttribute("value", "save");
  save.click();
  await tick();
  check(
    "shadow-button-submits-native-form-with-transient-submitter",
    actionsSubmitted === 1 &&
      submitter instanceof HTMLButtonElement &&
      submitter.hidden &&
      !submitter.isConnected &&
      submitterValue === "save",
  );
  const enter = (input, isComposing = false) =>
    input.$inner.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "Enter",
        bubbles: true,
        composed: true,
        cancelable: true,
        isComposing,
      }),
    );
  enter(field, true);
  await tick();
  check("enter-preserves-ime-composition", actionsSubmitted === 1);
  enter(field);
  await settleSubmit();
  check("shadow-input-enter-activates-library-button", actionsSubmitted === 2);
  save.setLoading(true);
  save.disabled = false;
  enter(field);
  save.click();
  await settleSubmit();
  check("loading-blocks-enter-and-click", actionsSubmitted === 2 && native.disabled);
  save.setLoading(false);
  save.setAttribute("html-type", "reset");
  save.click();
  await tick();
  check("dynamic-button-type-resets", field.value === "" && actionsSubmitted === 2);
  save.removeAttribute("html-type");
  check("removed-button-type-is-safe", native.type === "button");
  field.value = "Bob";
  resetButton.click();
  await tick();
  check("native-reset-button-restores-field", field.value === "");
  save.setAttribute("html-type", "submit");
  save.setAttribute("form", actions.id);
  document.body.append(save);
  check(
    "explicit-button-form-survives-remount",
    save.form === actions && save.querySelector("b") === label,
  );
  save.textContent = "Save again";
  await tick();
  check(
    "button-content-update-keeps-native-control",
    save.form === actions &&
      save.$btn.querySelector("slot").assignedNodes()[0]?.textContent === "Save again",
  );
  field.value = "explicit";
  save.click();
  await tick();
  check("explicit-button-submits-its-form", actionsSubmitted === 3);

  const libraryActions = document.createElement("l-form");
  libraryActions.innerHTML =
    '<l-form-item prop="field" required><l-input></l-input></l-form-item><l-button html-type="submit">Save</l-button><l-button html-type="reset">Reset</l-button>';
  document.body.append(libraryActions);
  const [librarySave, libraryReset] = libraryActions.querySelectorAll("l-button");
  const libraryField = libraryActions.querySelector("l-input");
  const libraryOwner = libraryActions.nativeForm;
  check(
    "shadow-buttons-associated-with-auxiliary-form",
    librarySave.form === libraryOwner &&
      libraryReset.form === libraryOwner &&
      Array.from(libraryOwner.elements).includes(librarySave),
  );
  check("auxiliary-owner-skips-native-validation", libraryOwner.noValidate);
  let nativeRequests = 0;
  let librarySubmitter;
  libraryOwner.addEventListener("submit", (event) => {
    nativeRequests++;
    librarySubmitter = event.submitter;
  });
  let librarySubmits = 0;
  libraryActions.addEventListener("submit", (event) => {
    if (event.target === libraryActions) librarySubmits++;
  });
  librarySave.click();
  await settleSubmit();
  check(
    "library-submit-displays-business-errors",
    nativeRequests === 1 &&
      librarySubmitter instanceof HTMLButtonElement &&
      !librarySubmitter.isConnected &&
      librarySubmits === 0 &&
      !!libraryActions.validationErrors.field,
  );
  libraryField.value = "fixed";
  enter(libraryField);
  await settleSubmit();
  check(
    "library-enter-submits-once",
    nativeRequests === 2 && librarySubmits === 1 && libraryOwner.querySelector("button") === null,
  );
  librarySave.disabled = true;
  enter(libraryField);
  await settleSubmit();
  check("disabled-library-submit-blocks-enter", librarySubmits === 1);
  libraryReset.click();
  await settleSubmit();
  check(
    "library-reset-uses-native-owner",
    libraryField.value === "" && !Object.keys(libraryActions.validationErrors).length,
  );
  libraryOwner.requestSubmit();
  await tick();
  check(
    "auxiliary-direct-submit-runs-library-validation",
    nativeRequests === 3 && librarySubmits === 1 && !!libraryActions.validationErrors.field,
  );

  const lateButton = document.createElement("l-button");
  lateButton.setAttribute("html-type", "submit");
  lateButton.setAttribute("form", actions.id);
  libraryActions.append(lateButton);
  await tick();
  check("explicit-native-form-wins", lateButton.form === actions);
  lateButton.removeAttribute("form");
  await tick();
  check("implicit-button-owner-restored", lateButton.form === libraryOwner);
  embedded.append(lateButton);
  await tick();
  check(
    "moved-button-reuses-native-ancestor",
    lateButton.form === outer && !lateButton.hasAttribute("form"),
  );
  let embeddedSubmits = 0;
  embedded.addEventListener("submit", (event) => {
    if (event.target === embedded) embeddedSubmits++;
  });
  const requiredNative = document.createElement("input");
  requiredNative.required = true;
  outer.append(requiredNative);
  lateButton.click();
  await settleSubmit();
  check("embedded-button-respects-native-validation", embeddedSubmits === 0 && !outer.noValidate);
  embedded.setAttribute("novalidate", "");
  lateButton.click();
  await settleSubmit();
  check(
    "embedded-l-form-novalidate-keeps-outer-constraints",
    embeddedSubmits === 0 && !outer.noValidate,
  );
  embedded.removeAttribute("novalidate");
  outer.noValidate = true;
  lateButton.click();
  await settleSubmit();
  check(
    "embedded-button-respects-authored-novalidate",
    embeddedSubmits === 1 && outer.noValidate && !outer.querySelector("button"),
  );
  outer.noValidate = false;
  requiredNative.remove();
  const confirmation = document.createElement("l-form-item");
  confirmation.setAttribute("prop", "confirmation");
  confirmation.setAttribute("verify", "same:embedded");
  confirmation.innerHTML = '<l-input value="confirmed"></l-input>';
  embedded.append(confirmation);
  await tick();
  lateButton.setAttribute("formnovalidate", "");
  lateButton.click();
  await settleSubmit();
  lateButton.removeAttribute("formnovalidate");
  check(
    "button-formnovalidate-keeps-library-validation-and-native-validity",
    embeddedSubmits === 1 &&
      !!embedded.validationErrors.confirmation &&
      confirmation.querySelector("l-input").validity.customError &&
      !outer.checkValidity(),
  );
  typeValue(embeddedInput, "confirmed");
  check(
    "related-field-edit-revalidates-confirmation",
    embeddedSubmits === 1 &&
      !embedded.validationErrors.confirmation &&
      !confirmation.classList.contains("is-error"),
  );
  lateButton.click();
  await settleSubmit();
  check(
    "embedded-corrected-resubmit-clears-business-error",
    embeddedSubmits === 2 &&
      Object.keys(embedded.validationErrors).length === 0 &&
      !confirmation.classList.contains("is-error"),
  );

  const alternate = document.createElement("l-input");
  alternate.name = "alternate";
  embedded.append(alternate);
  const validatedFields = [];
  const validateEmbeddedKey = embedded.validator.validateKey.bind(embedded.validator);
  embedded.validator.validateKey = (key, value, data) => {
    validatedFields.push(key);
    return validateEmbeddedKey(key, value, data);
  };
  const fieldsValidatedBy = (input) => {
    validatedFields.length = 0;
    typeValue(input, "confirmed");
    return validatedFields.join(",");
  };

  const rules = embedded.validator.rules;
  let ruleTableScans = 0;
  embedded.validator.rules = new Proxy(rules, {
    ownKeys(target) {
      ruleTableScans++;
      return Reflect.ownKeys(target);
    },
  });
  check(
    "input-looks-up-dependents-without-scanning-the-rule-table",
    fieldsValidatedBy(embeddedInput) === "confirmation" && ruleTableScans === 0,
  );
  embedded.validator.rules = rules;
  embedded.setSchema({ key: "confirmation", rules: ["same:alternate"] });
  check(
    "replacing-schema-updates-index",
    fieldsValidatedBy(embeddedInput) === "" && fieldsValidatedBy(alternate) === "confirmation",
  );
  embedded.addSchemas([
    { key: "confirmation", rules: ["same:embedded"] },
    { key: "confirmation", rules: ["same:embedded"] },
  ]);
  check(
    "adding-rules-keeps-previous-dependencies-and-deduplicates-new-ones",
    fieldsValidatedBy(embeddedInput) === "confirmation" &&
      fieldsValidatedBy(alternate) === "confirmation",
  );
  embedded.setSchemas([
    { key: "confirmation", rules: ["same:embedded"] },
    { key: "confirmation", rules: ["same:alternate"] },
  ]);
  check(
    "replacing-all-schemas-indexes-only-the-last-update-per-key",
    fieldsValidatedBy(embeddedInput) === "" && fieldsValidatedBy(alternate) === "confirmation",
  );
  embedded.validator.removeSchema("confirmation");
  check("removing-schema-through-validator-clears-index", fieldsValidatedBy(alternate) === "");

  const siblingForm = document.createElement("l-form");
  siblingForm.innerHTML = '<l-input name="embedded" value="sibling"></l-input>';
  outer.append(siblingForm);
  embedded.setSchema({ key: "confirmation", rules: ["same:embedded"] });
  embedded.setErrors({ confirmation: "旧提示" });
  typeValue(embeddedInput, "confirmed");
  check(
    "shared-native-owner-keeps-each-l-form-data-scoped",
    siblingForm.nativeForm === outer &&
      siblingForm.getData().embedded === "sibling" &&
      embedded.getData().embedded === "confirmed" &&
      !embedded.validationErrors.confirmation,
  );

  embedded.validator = new Validator([{ key: "confirmation", rules: ["same:embedded"] }]);
  const validateExternalKey = embedded.validator.validateKey.bind(embedded.validator);
  let externalData;
  embedded.validator.validateKey = (key, value, data) => {
    externalData = data;
    return validateExternalKey(key, value, data);
  };
  typeValue(embeddedInput, "mismatch");
  check(
    "replacement-validator-keeps-full-data-and-cross-field-validation",
    !!embedded.validationErrors.confirmation && externalData?.alternate === "confirmed",
  );

  const selectiveForm = document.createElement("l-form");
  selectiveForm.innerHTML = `
    <l-input name="source" value="first"></l-input>
    <l-input name="source" value="match"></l-input>
    <l-input name="confirmation" value="match"></l-input>
    <l-input name="baseline" value="match"></l-input>
    <l-input name="unrelated" id="confirmation" value="id-only"></l-input>
    <l-input name="elements" value="shadows-form-elements"></l-input>
  `;
  document.body.append(selectiveForm);
  selectiveForm.setSchema({ key: "confirmation", rules: ["same:source", "same:baseline"] });
  await tick();

  const firstSource = selectiveForm.querySelector('l-input[name="source"]');
  const unrelated = selectiveForm.querySelector('l-input[name="unrelated"]');
  let unrelatedReads = 0;
  const getUnrelatedValue = unrelated.getValue.bind(unrelated);
  unrelated.getValue = () => {
    unrelatedReads++;
    return getUnrelatedValue();
  };
  let domScans = 0;
  const queryFields = selectiveForm.querySelectorAll.bind(selectiveForm);
  selectiveForm.querySelectorAll = (selector) => {
    if (selector === "*" || selector === "button, l-button") domScans++;
    return queryFields(selector);
  };
  selectiveForm.setErrors({ confirmation: "旧提示" });
  typeValue(firstSource, "edited");
  check(
    "input-reads-only-related-fields-without-refreshing-ownership",
    !selectiveForm.validationErrors.confirmation && unrelatedReads === 0 && domScans === 0,
  );
  typeValue(selectiveForm.querySelector('l-input[name="baseline"]'), "different");
  check("input-reads-all-comparison-fields", !!selectiveForm.validationErrors.confirmation);

  const fullData = selectiveForm.getData();
  check(
    "get-data-uses-native-collection-and-preserves-last-same-name-value",
    fullData.source === "match" &&
      fullData.unrelated === "id-only" &&
      fullData.elements === "shadows-form-elements" &&
      unrelatedReads === 1 &&
      domScans === 0,
  );
  const appended = document.createElement("l-input");
  appended.name = "appended";
  appended.value = "immediate";
  selectiveForm.append(appended);
  check(
    "get-data-synchronizes-pending-association-after-append",
    selectiveForm.getData().appended === "immediate" && appended.form === selectiveForm.nativeForm,
  );
  appended.remove();
  selectiveForm.append(firstSource);
  check(
    "get-data-follows-current-dom-order-and-excludes-removed-fields",
    selectiveForm.getData().source === "edited" &&
      !Object.hasOwn(selectiveForm.getData(), "appended"),
  );

  const upgraded = document.createElement("l-delayed-input");
  upgraded.setAttribute("name", "delayed");
  upgraded.setAttribute("value", "upgraded");
  selectiveForm.append(upgraded);
  await tick();
  customElements.define("l-delayed-input", class extends Input {});
  check(
    "get-data-synchronizes-in-place-field-upgrade",
    selectiveForm.getData().delayed === "upgraded" && upgraded.form === selectiveForm.nativeForm,
  );

  const notificationForm = document.createElement("l-form");
  notificationForm.setErrors({ first: "旧提示", second: "其它提示", renamed: "改名提示" });
  notificationForm.innerHTML = `
    <l-form-item prop="first" required><l-input></l-input></l-form-item>
    <l-form-item prop="second"><l-input></l-input></l-form-item>
  `;
  const [firstItem, secondItem] = notificationForm.querySelectorAll("l-form-item");
  const [firstInput, secondInput] = notificationForm.querySelectorAll("l-input");
  const notifications = [];
  for (const field of [firstItem, firstInput, secondItem, secondInput]) {
    field.addEventListener(FORM_CONTEXT_EVENTS.validity, () => notifications.push(field));
  }
  const notified = (...fields) => {
    const received = notifications.splice(0);
    return received.length === fields.length && fields.every((field) => received.includes(field));
  };
  document.body.append(notificationForm);
  await tick();
  check(
    "registered-fields-receive-current-error-once",
    notified(firstItem, firstInput, secondItem, secondInput) &&
      firstItem.shadowRoot.textContent.includes("旧提示") &&
      firstInput.$inner.getAttribute("aria-invalid") === "true",
  );
  notificationForm.setErrors({ first: "新提示", second: "其它提示", renamed: "改名提示" });
  check("bulk-errors-notify-only-changed-fields", notified(firstItem, firstInput));
  notificationForm.setErrors(notificationForm.validationErrors);
  check("unchanged-bulk-errors-do-not-notify", notified());
  typeValue(firstInput, "valid");
  check(
    "input-clears-only-the-edited-fields-error",
    notified(firstItem, firstInput) && secondInput.classList.contains("is-error"),
  );
  typeValue(firstInput, "still valid");
  check("unchanged-input-error-does-not-notify", notified());
  typeValue(firstInput, "");
  check("invalid-input-notifies-item-and-control", notified(firstItem, firstInput));
  firstInput.reset();
  check("local-reset-clears-its-own-indicator", !firstInput.classList.contains("is-error"));
  typeValue(firstInput, "");
  check(
    "unchanged-error-restores-only-locally-reset-indicator",
    notified(firstInput) && firstInput.classList.contains("is-error"),
  );
  firstInput.reset();
  notificationForm.setErrors(notificationForm.validationErrors);
  check(
    "unchanged-bulk-errors-restore-only-locally-reset-indicator",
    notified(firstInput) && firstInput.classList.contains("is-error"),
  );
  firstInput.setAttribute("error", "显式样式");
  firstInput.removeAttribute("error");
  firstInput.updateDOM(new Set(["error"]));
  check(
    "removing-explicit-error-keeps-current-business-indicator",
    firstInput.classList.contains("is-error"),
  );
  firstItem.setAttribute("prop", "renamed");
  await tick();
  check(
    "renaming-inherited-field-reindexes-item-and-control",
    firstInput.name === "renamed" &&
      notified(firstItem, firstInput) &&
      firstItem.shadowRoot.textContent.includes("改名提示"),
  );
  notificationForm.setErrors({ first: "不再关联", second: "其它提示", renamed: "改名提示" });
  check("old-name-no-longer-notifies-renamed-fields", notified());
  firstInput.name = "explicit";
  check(
    "changing-input-name-clears-its-previous-indicator",
    notified(firstInput) && !firstInput.classList.contains("is-error"),
  );
  firstItem.remove();
  notificationForm.clearValidate();
  check(
    "clear-errors-notifies-only-mounted-fields-with-errors",
    notified(secondItem, secondInput) && !secondInput.classList.contains("is-error"),
  );

  const makeForm = (markup, parent = document.body) => {
    const form = document.createElement("l-form");
    form.innerHTML = markup;
    parent.append(form);
    return form;
  };

  const errorRow = (target) =>
    target.querySelector("l-form-item")?.shadowRoot.querySelector(".l-form-item__error")
      ?.textContent;
  const errorsForm = makeForm(
    '<l-form-item label="Code" prop="code"><l-input value="wrong"></l-input></l-form-item>',
  );
  const codeInput = errorsForm.querySelector("l-input");
  errorsForm.setSchema({ key: "code", rules: [/^OK$/], message: "Invalid code" });
  await errorsForm.validateField("code").catch(() => {});
  errorsForm.clearValidate();
  check(
    "clear-validation-hides-business-error-without-marking-field-valid",
    codeInput.validity.customError &&
      codeInput.validationMessage === "Invalid code" &&
      !codeInput.classList.contains("is-error") &&
      !errorRow(errorsForm),
  );
  check(
    "native-check-still-rejects-and-can-show-hidden-business-error",
    !errorsForm.nativeForm.checkValidity() && errorRow(errorsForm) === "Invalid code",
  );
  errorsForm.remove();

  const constraintForm = makeForm(
    '<l-form-item label="Email" prop="email"><l-input type="email" value="wrong"></l-input></l-form-item>',
  );
  const constraintInput = constraintForm.querySelector("l-input");
  const validityEvents = [];
  constraintInput.addEventListener(FORM_CONTEXT_EVENTS.nativeValidity, ({ detail }) =>
    validityEvents.push(detail),
  );
  check("untouched-native-constraint-does-not-show-immediately", !errorRow(constraintForm));
  check(
    "non-bubbling-invalid-shows-native-error-and-description",
    !constraintForm.nativeForm.reportValidity() &&
      errorRow(constraintForm) === constraintInput.validationMessage &&
      constraintInput.$inner.getAttribute("aria-invalid") === "true" &&
      !!constraintInput.$inner.getAttribute("aria-describedby"),
  );
  constraintForm.setSchema({ key: "email", rules: [() => true] });
  await constraintForm.validateField("email");
  check(
    "passing-business-rule-keeps-actual-native-constraint-visible",
    constraintInput.validity.typeMismatch &&
      errorRow(constraintForm) === constraintInput.validationMessage,
  );
  constraintForm.clearValidate();
  check(
    "clear-validation-hides-native-feedback-without-changing-constraint",
    constraintInput.validity.typeMismatch &&
      !errorRow(constraintForm) &&
      !constraintInput.$inner.hasAttribute("aria-describedby"),
  );
  constraintInput.value = "person@example.com";
  check(
    "programmatic-correction-notifies-real-validity-once",
    constraintInput.validity.valid &&
      validityEvents.length === 1 &&
      validityEvents[0].valid &&
      !validityEvents[0].flags.typeMismatch &&
      !errorRow(constraintForm),
  );
  constraintInput.focus();
  typeValue(constraintInput, "wrong again");
  constraintInput.blur();
  check("native-constraint-displays-after-blur", !!errorRow(constraintForm));
  constraintInput.value = "person@example.com";
  check(
    "correcting-touched-native-constraint-clears-associated-error",
    !errorRow(constraintForm) && constraintInput.$inner.getAttribute("aria-invalid") === "false",
  );
  constraintForm.remove();

  const emitNative = makeForm(
    '<l-form-item label="Email" prop="email"><l-input type="email" value="wrong"></l-input></l-form-item>',
  );
  emitNative.setAttribute("emit-error", "");
  const nativeReports = [];
  emitNative.addEventListener("validate-error", ({ detail }) => nativeReports.push(detail));
  emitNative.nativeForm.checkValidity();
  await tick();
  emitNative.querySelector("l-input").value = "person@example.com";
  await tick();
  check(
    "emit-error-reports-native-constraint-and-recovery-without-built-in-prompt",
    nativeReports.length === 2 &&
      !!nativeReports[0].errors.email &&
      nativeReports[1].errors.email === undefined &&
      nativeReports.every(({ all }) => Array.isArray(all) && all.join() === "email") &&
      !errorRow(emitNative),
  );
  emitNative.setErrors({ email: "Server error" });
  check(
    "set-errors-keeps-direct-display-in-emit-error-mode",
    errorRow(emitNative) === "Server error",
  );
  emitNative.querySelector("l-input").focus();
  emitNative.querySelector("l-input").blur();
  emitNative.reset();
  await settleSubmit();
  check(
    "reset-recomputes-native-validity-without-showing-or-reporting-error",
    emitNative.querySelector("l-input").validity.typeMismatch &&
      nativeReports.length === 2 &&
      !errorRow(emitNative),
  );
  emitNative.remove();

  const toggleNative = makeForm(
    '<l-form-item label="Email" prop="email"><l-input type="email" value="wrong"></l-input></l-form-item>',
  );
  const toggleEmail = toggleNative.querySelector("l-input");
  const toggleReports = [];
  toggleNative.addEventListener("validate-error", ({ detail }) => toggleReports.push(detail));
  toggleEmail.checkValidity();
  const builtInError = errorRow(toggleNative);
  toggleNative.setAttribute("emit-error", "");
  toggleEmail.checkValidity();
  await tick();
  check(
    "enabling-emit-error-reroutes-existing-native-feedback-once",
    !!builtInError &&
      !errorRow(toggleNative) &&
      !toggleNative.validationErrors.email &&
      toggleEmail.validity.typeMismatch &&
      toggleReports.length === 1 &&
      Array.isArray(toggleReports[0].all) &&
      toggleReports[0].all.join() === "email" &&
      toggleReports[0].errors.email === builtInError,
  );
  toggleNative.removeAttribute("emit-error");
  check(
    "disabling-emit-error-restores-existing-native-feedback",
    !!builtInError &&
      errorRow(toggleNative) === builtInError &&
      toggleNative.validationErrors.email === builtInError &&
      toggleEmail.validity.typeMismatch,
  );
  toggleNative.setErrors({ email: "Server error" });
  toggleNative.setAttribute("emit-error", "");
  await tick();
  const errorWhileEmitting = errorRow(toggleNative);
  toggleNative.removeAttribute("emit-error");
  check(
    "toggling-emit-error-preserves-direct-errors",
    errorWhileEmitting === "Server error" && errorRow(toggleNative) === "Server error",
  );
  toggleNative.remove();

  const submitNative = makeForm(`
    <l-form-item label="Email" prop="email"><l-input type="email" value="wrong"></l-input></l-form-item>
    <l-form-item label="Name" prop="name" required validity="Name required"><l-input></l-input></l-form-item>
  `);
  submitNative.setAttribute("emit-error", "");
  const submitEmail = submitNative.querySelector("l-input");
  let displayedErrors = {};
  let fullReport;
  let submitCount = 0;
  submitNative.addEventListener("submit", () => submitCount++);
  submitNative.addEventListener("validate-error", ({ detail: { all, errors } }) => {
    if (all === true) fullReport = errors;
    displayedErrors = all === true ? errors : { ...displayedErrors, ...errors };
    submitNative.setErrors(displayedErrors);
  });
  submitEmail.checkValidity();
  await tick();
  const reportedEmailError = errorRow(submitNative);
  submitNative.submit();
  await tick();
  check(
    "failed-submit-reports-existing-native-and-business-errors-together",
    submitCount === 0 &&
      !!reportedEmailError &&
      submitEmail.validity.typeMismatch &&
      fullReport?.email === reportedEmailError &&
      fullReport.name === "Name required" &&
      errorRow(submitNative) === reportedEmailError,
  );
  submitEmail.value = "person@example.com";
  submitNative.submit();
  await tick();
  check(
    "failed-submit-omits-corrected-native-errors",
    submitCount === 0 &&
      submitEmail.validity.valid &&
      fullReport?.name === "Name required" &&
      !Object.hasOwn(fullReport, "email") &&
      !errorRow(submitNative),
  );
  submitNative.remove();

  const nativeFeedbackOwner = document.body.appendChild(document.createElement("form"));
  const feedbackForm = makeForm(
    '<l-form-item label="Email" prop="email"><input name="email" type="email" value="wrong"></l-form-item>',
    nativeFeedbackOwner,
  );
  const unrelatedRequired = document.createElement("input");
  unrelatedRequired.name = "outside";
  unrelatedRequired.required = true;
  nativeFeedbackOwner.append(unrelatedRequired);
  const plainEmail = feedbackForm.querySelector("input");
  check(
    "native-invalid-feedback-is-scoped-to-own-form-fields",
    !nativeFeedbackOwner.checkValidity() &&
      errorRow(feedbackForm) === plainEmail.validationMessage &&
      Object.keys(feedbackForm.validationErrors).join() === "email" &&
      !nativeFeedbackOwner.noValidate,
  );
  plainEmail.value = "person@example.com";
  plainEmail.dispatchEvent(new Event("input", { bubbles: true }));
  check("native-input-correction-clears-its-own-feedback", !errorRow(feedbackForm));
  plainEmail.value = "wrong";
  nativeFeedbackOwner.checkValidity();
  plainEmail.remove();
  await tick();
  check("removed-native-field-clears-its-own-feedback", !errorRow(feedbackForm));
  nativeFeedbackOwner.remove();

  const resetRaceForm = makeForm(
    '<l-form-item label="Code" prop="code"><l-input value="baseline"></l-input></l-form-item>',
  );
  const resetRaceInput = resetRaceForm.querySelector("l-input");
  const nativeRaceOwner = resetRaceForm.nativeForm;
  resetRaceInput.value = "edited";
  resetRaceForm.setErrors({ code: "same text" });
  resetRaceForm.reset();
  resetRaceForm.setErrors({ code: "same text" });
  await settleSubmit();
  check(
    "library-reset-keeps-follow-up-error-even-when-text-matches",
    resetRaceInput.value === "baseline" && errorRow(resetRaceForm) === "same text",
  );
  nativeRaceOwner.reset();
  resetRaceForm.setSchema({ key: "code", rules: [/^OK$/], message: "New validation" });
  await resetRaceForm.validateField("code").catch(() => {});
  await settleSubmit();
  check(
    "native-reset-keeps-follow-up-business-validity-and-error",
    resetRaceInput.validity.customError && errorRow(resetRaceForm) === "New validation",
  );
  resetRaceForm.remove();

  const namedResetOwner = document.body.appendChild(document.createElement("form"));
  const namedResetForm = makeForm('<input name="reset" value="baseline">', namedResetOwner);
  const namedResetInput = namedResetForm.querySelector("input");
  namedResetInput.value = "edited";
  namedResetForm.reset();
  check(
    "library-reset-uses-native-method-even-with-name-reset",
    namedResetInput.value === "baseline",
  );
  namedResetOwner.remove();

  const firstBorrowedOwner = document.body.appendChild(document.createElement("form"));
  const secondBorrowedOwner = document.body.appendChild(document.createElement("form"));
  const rebuiltForm = document.createElement("l-form");
  rebuiltForm.innerHTML = `
    <section>
      <l-form-item label="Code" prop="code"><span>Help</span><l-input value="initial"></l-input></l-form-item>
    </section>
    <l-button html-type="submit">Submit</l-button>
    <l-button html-type="reset">Reset</l-button>`;
  const authoredChildren = Array.from(rebuiltForm.childNodes);
  const rebuiltSection = rebuiltForm.querySelector("section");
  const rebuiltItem = rebuiltForm.querySelector("l-form-item");
  const authoredItemChildren = Array.from(rebuiltItem.childNodes);
  const rebuiltInput = rebuiltForm.querySelector("l-input");
  const [rebuiltSubmit, rebuiltReset] = rebuiltForm.querySelectorAll("l-button");
  const preservesAuthoredNodes = () => {
    const owner = rebuiltForm.nativeForm;
    const currentChildren = Array.from(rebuiltForm.childNodes).filter((node) => node !== owner);
    return (
      currentChildren.length === authoredChildren.length &&
      currentChildren.every((node, index) => node === authoredChildren[index]) &&
      rebuiltSection.contains(rebuiltItem) &&
      rebuiltItem.childNodes.length === authoredItemChildren.length &&
      authoredItemChildren.every((node, index) => node === rebuiltItem.childNodes[index])
    );
  };
  const rebuiltSubmissions = [];
  rebuiltForm.addEventListener("submit", (event) => {
    if (event.target === rebuiltForm) rebuiltSubmissions.push(event.detail.code);
  });
  let rebuiltResets = 0;
  const originalFieldReset = rebuiltInput.reset.bind(rebuiltInput);
  rebuiltInput.reset = () => {
    rebuiltResets++;
    originalFieldReset();
  };
  document.body.append(rebuiltForm);
  const firstHelper = rebuiltForm.nativeForm;
  check(
    "owner-rebuild-starts-with-hidden-unprojected-helper",
    firstHelper.hidden &&
      firstHelper.assignedSlot === null &&
      rebuiltInput.form === firstHelper &&
      preservesAuthoredNodes(),
  );
  const borrowedOwners = [
    [firstBorrowedOwner, "first"],
    [secondBorrowedOwner, "second"],
  ];
  for (const [borrowedOwner, value] of borrowedOwners) {
    borrowedOwner.append(rebuiltForm);
    rebuiltInput.value = value;
    const previousSubmits = rebuiltSubmissions.length;
    rebuiltSubmit.click();
    await settleSubmit();
    check(
      `owner-rebuild-submits-once-with-${value}-borrowed-owner`,
      rebuiltForm.nativeForm === borrowedOwner &&
        rebuiltInput.form === borrowedOwner &&
        new FormData(borrowedOwner).get("code") === value &&
        !firstHelper.isConnected &&
        rebuiltSubmissions.length === previousSubmits + 1 &&
        rebuiltSubmissions.at(-1) === value &&
        preservesAuthoredNodes(),
    );
  }
  rebuiltInput.value = "dirty";
  rebuiltForm.setErrors({ code: "Keep this error" });
  secondBorrowedOwner.addEventListener("reset", (event) => event.preventDefault(), { once: true });
  rebuiltReset.click();
  await settleSubmit();
  check(
    "owner-rebuild-cancelled-reset-preserves-field-and-error",
    rebuiltResets === 0 &&
      rebuiltInput.value === "dirty" &&
      errorRow(rebuiltForm) === "Keep this error",
  );
  let oldNativeSubmitCancelled;
  firstBorrowedOwner.addEventListener(
    "submit",
    (event) => {
      oldNativeSubmitCancelled = event.defaultPrevented;
      event.preventDefault();
    },
    { once: true },
  );
  firstBorrowedOwner.requestSubmit();
  firstBorrowedOwner.reset();
  await settleSubmit();
  check(
    "retired-owner-no-longer-intercepts-submit-or-resets-current-form",
    oldNativeSubmitCancelled === false &&
      rebuiltSubmissions.length === 2 &&
      rebuiltResets === 0 &&
      rebuiltInput.value === "dirty" &&
      errorRow(rebuiltForm) === "Keep this error",
  );
  for (let attempt = 0; attempt < 3; attempt++) {
    rebuiltForm.remove();
    secondBorrowedOwner.append(rebuiltForm);
  }
  rebuiltInput.value = "remounted";
  secondBorrowedOwner.requestSubmit();
  await settleSubmit();
  check(
    "same-owner-remount-reinstalls-exactly-one-native-submit-bridge",
    rebuiltSubmissions.length === 3 &&
      rebuiltSubmissions.at(-1) === "remounted" &&
      preservesAuthoredNodes(),
  );
  rebuiltForm.setErrors({ code: "Clear this error" });
  rebuiltReset.click();
  await settleSubmit();
  check(
    "same-owner-remount-resets-once-and-clears-errors",
    rebuiltResets === 1 &&
      rebuiltInput.value === "initial" &&
      !errorRow(rebuiltForm) &&
      new FormData(secondBorrowedOwner).get("code") === "initial",
  );
  document.body.append(rebuiltForm);
  const rebuiltHelper = rebuiltForm.nativeForm;
  rebuiltInput.value = "rebuilt";
  rebuiltHelper.requestSubmit();
  await settleSubmit();
  check(
    "rebuilt-standalone-helper-reassociates-and-submits-once",
    rebuiltHelper !== firstHelper &&
      rebuiltHelper !== secondBorrowedOwner &&
      rebuiltInput.form === rebuiltHelper &&
      rebuiltHelper.hidden &&
      rebuiltHelper.assignedSlot === null &&
      rebuiltSubmissions.length === 4 &&
      rebuiltSubmissions.at(-1) === "rebuilt" &&
      preservesAuthoredNodes(),
  );
  rebuiltForm.remove();
  check(
    "rebuilt-helper-disconnect-cleans-managed-association-and-preserves-user-dom",
    !rebuiltHelper.isConnected && !rebuiltInput.hasAttribute("form") && preservesAuthoredNodes(),
  );
  firstBorrowedOwner.remove();
  secondBorrowedOwner.remove();

  const cancellationForm = makeForm(
    '<l-input name="value" value="ready"></l-input><l-button html-type="submit">Save</l-button>',
  );
  const cancellationOwner = cancellationForm.nativeForm;
  const cancellationButton = cancellationForm.querySelector("l-button");
  let cancellationSubmits = 0;
  cancellationForm.addEventListener("submit", () => cancellationSubmits++);
  const preventSubmit = (event) => event.preventDefault();
  cancellationOwner.addEventListener("submit", preventSubmit, { capture: true, once: true });
  cancellationButton.click();
  await settleSubmit();
  check("native-submit-capture-can-cancel-library-submit", cancellationSubmits === 0);
  cancellationOwner.addEventListener("submit", preventSubmit, { once: true });
  cancellationButton.click();
  await settleSubmit();
  check("native-submit-later-listener-can-cancel-library-submit", cancellationSubmits === 0);
  cancellationForm.addEventListener("keydown", preventSubmit, { once: true });
  enter(cancellationForm.querySelector("l-input"));
  await settleSubmit();
  check("ancestor-can-cancel-enter-before-submission", cancellationSubmits === 0);
  enter(cancellationForm.querySelector("l-input"));
  await settleSubmit();
  check("ordinary-enter-still-submits-once", cancellationSubmits === 1);

  const overrideOwner = document.createElement("form");
  overrideOwner.innerHTML =
    '<input name="required" required><l-button html-type="submit" formnovalidate>Skip</l-button>';
  document.body.append(overrideOwner);
  const overrideButton = overrideOwner.querySelector("l-button");
  const overrideEvents = [];
  overrideOwner.addEventListener("submit", (event) => {
    event.preventDefault();
    overrideEvents.push(event);
  });
  overrideButton.click();
  await settleSubmit();
  check(
    "button-formnovalidate-bypasses-native-constraints",
    overrideEvents.length === 1 &&
      overrideEvents[0].submitter.formNoValidate &&
      !overrideOwner.noValidate,
  );
  overrideButton.removeAttribute("formnovalidate");
  overrideButton.click();
  await settleSubmit();
  check(
    "native-form-enforces-constraints-without-button-override",
    overrideEvents.length === 1 && !overrideOwner.noValidate,
  );

  const sharedSubmissionOwner = document.body.appendChild(document.createElement("form"));
  const sharedMarkup =
    '<l-input name="field" value="ready"></l-input><l-button html-type="submit">Save</l-button>';
  const leftSubmission = makeForm(sharedMarkup, sharedSubmissionOwner);
  const rightSubmission = makeForm(sharedMarkup, sharedSubmissionOwner);
  let leftSubmits = 0;
  let rightSubmits = 0;
  leftSubmission.addEventListener("submit", () => leftSubmits++);
  rightSubmission.addEventListener("submit", () => rightSubmits++);
  leftSubmission.querySelector("l-button").click();
  await settleSubmit();
  check("shared-native-submit-routes-to-button-host-only", leftSubmits === 1 && rightSubmits === 0);
  enter(rightSubmission.querySelector("l-input"));
  await settleSubmit();
  check("shared-native-enter-uses-local-host-button", leftSubmits === 1 && rightSubmits === 1);
  const outerButton = sharedSubmissionOwner.appendChild(document.createElement("button"));
  let outerSubmits = 0;
  sharedSubmissionOwner.addEventListener(
    "submit",
    (event) => {
      if (event.submitter === outerButton && !event.defaultPrevented) outerSubmits++;
      event.preventDefault();
    },
    { once: true },
  );
  outerButton.click();
  await settleSubmit();
  check(
    "shared-native-submit-from-outer-button-belongs-to-outer-form",
    outerSubmits === 1 &&
      leftSubmits === 1 &&
      rightSubmits === 1 &&
      !sharedSubmissionOwner.noValidate,
  );

  const ruleForm = makeForm(`
    <l-form-item prop="email" required verify="mobile" pattern="^138" validity="Work phone">
      <l-input value="13900000000"></l-input>
    </l-form-item>
  `);
  const ruleItem = ruleForm.querySelector("l-form-item");
  const ruleInput = ruleForm.querySelector("l-input");
  typeValue(ruleInput, "13900000000");
  check(
    "item-pattern-maps-to-native-custom-error",
    ruleInput.validity.customError && ruleInput.validationMessage === "Work phone",
  );
  ruleItem.setAttribute("validity", "Use work phone");
  check(
    "item-validity-message-refreshes-immediately",
    ruleInput.validationMessage === "Use work phone",
  );
  ruleItem.removeAttribute("pattern");
  check(
    "removing-item-pattern-clears-rule-error",
    ruleInput.checkValidity() && !ruleForm.validationErrors.email,
  );
  typeValue(ruleInput, "bad-phone");
  check("item-verify-still-applies", !ruleInput.checkValidity());
  ruleItem.removeAttribute("verify");
  check(
    "removing-verify-clears-rule-error",
    ruleInput.checkValidity() && !ruleForm.validationErrors.email,
  );
  typeValue(ruleInput, "");
  check(
    "item-required-retains-native-and-business-flags",
    ruleInput.validity.valueMissing && ruleInput.validity.customError,
  );
  ruleInput.setValidity({ valueMissing: false, customError: true }, "Manual error");
  ruleForm.clearValidate();
  check(
    "clear-validation-preserves-manual-and-native-error",
    ruleInput.validity.valueMissing && ruleInput.validationMessage === "Manual error",
  );
  ruleInput.setValidity();
  check(
    "manual-clear-preserves-native-required-and-business-rule",
    ruleInput.validity.valueMissing &&
      ruleInput.validity.customError &&
      ruleInput.validationMessage === "Use work phone" &&
      !ruleForm.validationErrors.email,
  );
  ruleItem.removeAttribute("required");
  check("removing-required-clears-native-and-business-constraint", ruleInput.checkValidity());

  ruleItem.setRules({ rules: [/^first$/], message: "First" });
  ruleItem.setRules({ rules: [/^second$/], message: "Second" });
  typeValue(ruleInput, "second");
  check("set-rules-replaces-same-item-contribution", ruleInput.checkValidity());
  ruleItem.setAttribute("prop", "renamed");
  ruleItem.remove();
  check("rename-and-disconnect-unregister-item-rules", (await ruleForm.validate()).result);
  ruleForm.append(ruleItem);
  typeValue(ruleInput, "bad");
  check(
    "set-rules-survives-rename-and-remount",
    ruleInput.validationMessage === "Second" && !ruleForm.validator.hasSchema("email"),
  );
  ruleForm.addSchema({ key: "renamed", required: true, message: "Explicit required" });
  ruleItem.remove();
  check(
    "item-unregister-retains-explicit-rules-for-same-key",
    (await ruleForm.validate()).errors.renamed === "Explicit required",
  );
  ruleForm.validator.removeSchema("renamed");
  check(
    "removing-explicit-rule-clears-active-error",
    (await ruleForm.validate()).result && !ruleForm.validationErrors.renamed,
  );

  const duplicateItems = makeForm(
    '<l-form-item prop="shared" pattern="^a$"><l-input value="b"></l-input></l-form-item><l-form-item prop="shared" pattern="^b$"><l-input value="b"></l-input></l-form-item>',
  );
  const [firstRule, secondRule] = duplicateItems.querySelectorAll("l-form-item");
  check("same-name-rules-keep-separate-item-sources", !(await duplicateItems.validate()).result);
  firstRule.remove();
  check("removing-one-item-keeps-other-source", (await duplicateItems.validate()).result);
  secondRule.querySelector("l-input").value = "a";
  check("remaining-item-still-validates-its-rule", !(await duplicateItems.validate()).result);

  const scoped = makeForm(
    '<l-input name="source" value="a"></l-input><l-input name="target" value="b"></l-input><l-input name="other"></l-input>',
  );
  let scopedOtherCalls = 0;
  scoped.setSchema({
    key: "other",
    rules: [
      () => {
        scopedOtherCalls++;
        return false;
      },
    ],
  });
  scoped.setSchema({ key: "target", rules: ["same:source"], message: "Mismatch" });
  scoped.setAttribute("novalidate", "");
  let fieldError;
  try {
    await scoped.validateField(["target", "target"]);
  } catch (error) {
    fieldError = error;
  }
  const scopedTarget = scoped.querySelector('[name="target"]');
  check(
    "validate-field-runs-only-selected-rules-even-under-novalidate",
    scopedOtherCalls === 0 &&
      fieldError instanceof Error &&
      fieldError.detail.target === "Mismatch" &&
      scopedTarget.validity.customError,
  );
  scopedTarget.value = "a";
  check(
    "validate-field-resolves-and-keeps-unrelated-rules-untouched",
    (await scoped.validateField("target")) === undefined &&
      scopedOtherCalls === 0 &&
      scopedTarget.checkValidity(),
  );

  const numeric = makeForm('<l-input-number name="quantity" value="0"></l-input-number>');
  numeric.setSchema({
    key: "quantity",
    rules: [(value) => value > 0],
    message: "Must be positive",
  });
  const numericField = numeric.querySelector("l-input-number");
  try {
    await numeric.validateField("quantity");
  } catch {}
  check("input-number-has-native-business-error-before-edit", numericField.validity.customError);
  numericField.$plusBtn.click();
  check(
    "input-number-user-step-revalidates-and-clears-error",
    numericField.value === 1 && numericField.checkValidity() && !numeric.validationErrors.quantity,
  );

  const programOwner = document.createElement("form");
  document.body.append(programOwner);
  const programForm = makeForm(
    '<l-input name="source" value="a"></l-input><l-input name="target" value="b"></l-input>',
    programOwner,
  );
  programForm.setSchema({ key: "target", rules: ["same:source"], message: "Mismatch" });
  const programFields = [...programForm.querySelectorAll("l-input")];
  check(
    "whole-validate-maps-error-to-native-owner",
    !(await programForm.validate()).result && !programOwner.checkValidity(),
  );
  programFields[0].value = "b";
  const programSubmits = [];
  programForm.addEventListener("submit", (event) => programSubmits.push(event.detail));
  programOwner.requestSubmit();
  await tick();
  check(
    "programmatic-dependency-change-unblocks-native-resubmit",
    programOwner.checkValidity() && programSubmits.length === 1 && programSubmits[0].source === "b",
  );

  const unsupported = makeForm(
    '<l-input name="asyncRule" value="x"></l-input><l-input name="promiseRule" value="x"></l-input><l-input name="syncRule" value="x"></l-input>',
  );
  unsupported.setSchemas([
    { key: "asyncRule", rules: [async () => false] },
    { key: "promiseRule", rules: [() => Promise.reject(new Error("no"))] },
    { key: "syncRule", rules: [() => false], message: "Sync failure" },
  ]);
  let asyncSubmits = 0;
  let unhandled = 0;
  const rejected = () => unhandled++;
  window.addEventListener("unhandledrejection", rejected);
  unsupported.addEventListener("submit", () => asyncSubmits++);
  const unsupportedResult = await unsupported.validate();
  unsupported.submit();
  await tick();
  window.removeEventListener("unhandledrejection", rejected);
  check(
    "promise-rules-fail-explicitly-and-block-submit",
    !unsupportedResult.result &&
      unsupportedResult.errors.asyncRule.includes("Promise") &&
      unsupportedResult.errors.promiseRule.includes("Promise") &&
      unsupportedResult.errors.syncRule === "Sync failure" &&
      asyncSubmits === 0 &&
      unhandled === 0,
  );

  const dataForm = makeForm("<l-input name='__proto__'></l-input>");
  const dataOwner = dataForm.nativeForm;
  const objectValue = { id: 42 };
  dataForm.querySelector("l-input").value = objectValue;
  const snapshot = dataForm.getData();
  check(
    "get-data-preserves-prototype-named-field-as-own-property",
    Object.getPrototypeOf(snapshot) === Object.prototype &&
      Object.hasOwn(snapshot, "__proto__") &&
      snapshot.__proto__ === objectValue,
  );

  const exteriorField = document.createElement("l-input");
  exteriorField.name = "outside";
  exteriorField.value = 0;
  exteriorField.setAttribute("form", dataOwner.id);
  document.body.append(exteriorField);
  check(
    "get-data-includes-associated-external-control-with-business-type",
    exteriorField.form === dataOwner && dataForm.getData().outside === 0,
  );
  exteriorField.name = "renamedOutside";
  check(
    "get-data-reflects-external-rename",
    !Object.hasOwn(dataForm.getData(), "outside") && dataForm.getData().renamedOutside === 0,
  );
  exteriorField.removeAttribute("form");
  check(
    "get-data-drops-external-field-after-disassociation",
    !Object.hasOwn(dataForm.getData(), "renamedOutside"),
  );

  const sourceForm = makeForm("<l-input name='transferred' value='destination'></l-input>");
  sourceForm.querySelector("l-input").setAttribute("form", dataOwner.id);
  check(
    "get-data-uses-explicit-owner-between-independent-forms",
    dataForm.getData().transferred === "destination" &&
      !Object.hasOwn(sourceForm.getData(), "transferred"),
  );

  const nativeFields = document.createElement("div");
  nativeFields.innerHTML = `
    <input name="text" value="inside" disabled>
    <input name="flag" type="checkbox">
    <input name="choice" type="radio" value="first" checked>
    <input name="choice" type="radio" value="second">
    <input name="files" type="file" multiple>
    <textarea name="notes">memo</textarea>
    <select name="multiple" multiple><option selected value="a">A</option><option value="b">B</option><option selected value="c">C</option></select>
    <input name="submitter" type="submit" value="Send">
  `;
  for (const control of nativeFields.querySelectorAll("[name]"))
    control.setAttribute("form", dataOwner.id);
  dataForm.append(nativeFields);
  const fileInput = nativeFields.querySelector("[type=file]");
  const transfer = new DataTransfer();
  transfer.items.add(new File(["a"], "first.txt"));
  transfer.items.add(new File(["b"], "second.txt"));
  fileInput.files = transfer.files;
  const nativeSnapshot = dataForm.getData();
  check(
    "get-data-adapts-associated-native-fields",
    nativeSnapshot.text === "inside" &&
      nativeSnapshot.notes === "memo" &&
      nativeSnapshot.flag === false &&
      nativeSnapshot.choice === "first" &&
      nativeSnapshot.multiple.join() === "a,c" &&
      !Object.hasOwn(nativeSnapshot, "submitter"),
  );
  check(
    "get-data-preserves-native-file-values",
    fileInput.files[0] === nativeSnapshot.files[0] && nativeSnapshot.files[1].name === "second.txt",
  );
  const nativeExterior = document.createElement("input");
  nativeExterior.name = "outsideText";
  nativeExterior.value = "native outside";
  nativeExterior.setAttribute("form", dataOwner.id);
  document.body.append(nativeExterior);
  check(
    "get-data-includes-associated-external-native-control",
    dataForm.getData().outsideText === "native outside",
  );

  const sharedOwner = document.createElement("form");
  sharedOwner.innerHTML = '<input name="sharedOnly" value="native owner field">';
  document.body.append(sharedOwner);
  const left = makeForm(
    '<input name="source" value="first"><l-input name="target" value="updated"></l-input>',
    sharedOwner,
  );
  const right = makeForm('<input name="source" value="second">', sharedOwner);
  check(
    "get-data-scopes-native-controls-sharing-one-owner",
    left.getData().source === "first" &&
      right.getData().source === "second" &&
      !Object.hasOwn(left.getData(), "sharedOnly"),
  );
  left.setSchema({ key: "target", rules: ["same:source"] });
  try {
    await left.validateField("target");
  } catch {}
  const nativeSource = left.querySelector("input[name=source]");
  const libraryTarget = left.querySelector("l-input");
  const wasInvalid = libraryTarget.validity.customError;
  nativeSource.value = "updated";
  nativeSource.dispatchEvent(new InputEvent("input", { bubbles: true }));
  check(
    "native-edit-and-scoped-validation-use-current-snapshot",
    wasInvalid && libraryTarget.checkValidity() && left.getData().source === "updated",
  );

  document.querySelector("#result").textContent = JSON.stringify({
    userAgent: navigator.userAgent,
    checks,
    pass: checks.every((item) => item.pass),
  });
} catch (error) {
  document.querySelector("#result").textContent = JSON.stringify({
    pass: false,
    error: String(error),
    checks,
  });
}