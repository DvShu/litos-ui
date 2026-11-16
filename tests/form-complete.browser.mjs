import { Button, Form, FormItem, Input, regist } from "../src/components/index.ts";
import { FORM_CONTEXT_EVENTS } from "../src/components/form/context.ts";
import { Validator } from "utilane";
const checks = [];
const check = (name, pass) => checks.push({ name, pass: !!pass });
const tick = () => new Promise((resolve) => setTimeout(resolve, 0));
const typeValue = (input, value) => {
  input.$inner.value = value;
  input.$inner.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
};
try {
  regist(Button);
  regist(Form);
  regist(FormItem);
  regist(Input);
  await tick();
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
      !manualField.checkValidity(),
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
  actions.addEventListener("submit", (event) => {
    event.preventDefault();
    actionsSubmitted++;
    submitter = event.submitter;
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
  save.click();
  await tick();
  check("shadow-button-submits-native-form", actionsSubmitted === 1 && submitter === null);
  const enter = (input, isComposing = false) =>
    input.$inner.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true, isComposing }),
    );
  enter(field, true);
  await tick();
  check("enter-preserves-ime-composition", actionsSubmitted === 1);
  enter(field);
  await tick();
  check("shadow-input-enter-activates-library-button", actionsSubmitted === 2);
  save.setLoading(true);
  save.disabled = false;
  enter(field);
  save.click();
  await tick();
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
  await tick();
  check(
    "library-submit-displays-business-errors",
    nativeRequests === 1 &&
      librarySubmitter === null &&
      librarySubmits === 0 &&
      !!libraryActions.validationErrors.field,
  );
  libraryField.value = "fixed";
  enter(libraryField);
  await tick();
  check(
    "library-enter-submits-once",
    nativeRequests === 2 && librarySubmits === 1 && libraryOwner.querySelector("button") === null,
  );
  librarySave.disabled = true;
  enter(libraryField);
  await tick();
  check("disabled-library-submit-blocks-enter", librarySubmits === 1);
  libraryReset.click();
  await tick();
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
  await tick();
  check("embedded-button-respects-native-validation", embeddedSubmits === 0 && !outer.noValidate);
  outer.noValidate = true;
  lateButton.click();
  await tick();
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
  lateButton.click();
  await tick();
  check(
    "embedded-business-error-preserves-native-validity",
    embeddedSubmits === 1 && !!embedded.validationErrors.confirmation && outer.checkValidity(),
  );
  typeValue(embeddedInput, "confirmed");
  check(
    "related-field-edit-revalidates-confirmation",
    embeddedSubmits === 1 &&
      !embedded.validationErrors.confirmation &&
      !confirmation.classList.contains("is-error"),
  );
  lateButton.click();
  await tick();
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