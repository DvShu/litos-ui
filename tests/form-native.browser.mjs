import {
  Form,
  FormItem,
  Input,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Switch,
  Select,
  SelectOri,
  InputNumber,
  MdInput,
  ColorPicker,
  DatePicker,
  DatePickerOri,
  Upload,
  regist,
} from "../src/components/index.ts";
const checks = [];
const check = (name, pass) => checks.push({ name, pass: !!pass });
const tick = () => new Promise((resolve) => setTimeout(resolve, 20));
const errors = [];
window.addEventListener("error", (event) => errors.push(event.message));
try {
  for (const Type of [
    Input,
    Checkbox,
    CheckboxGroup,
    Radio,
    RadioGroup,
    Switch,
    Select,
    SelectOri,
    InputNumber,
    MdInput,
    ColorPicker,
    DatePicker,
    DatePickerOri,
    Upload,
  ])
    if (Type) regist(Type);
  const a = document.querySelector("#a"),
    b = document.querySelector("#b"),
    item = a.querySelector("l-form-item"),
    input = item.querySelector("l-input");
  const isolationName = "isolated-radio";
  const addIsolatedRadio = (owner, value, checked = true) => {
    const radio = document.createElement("l-radio");
    radio.name = isolationName;
    radio.value = value;
    radio.defaultChecked = checked;
    return owner.appendChild(radio);
  };
  const lateRadioA = addIsolatedRadio(a, "a");
  const lateRadioB = addIsolatedRadio(b, "b");
  const checkedBeforeFormUpgrade = lateRadioA.checked && lateRadioB.checked;
  regist(FormItem);
  regist(Form);
  await tick();
  const radioSubmission = (owner) => new FormData(owner.nativeForm).getAll(isolationName).join();
  check(
    "standalone-radio-initial-check-isolated-while-form-upgrades",
    checkedBeforeFormUpgrade &&
      lateRadioA.$input.checked &&
      lateRadioB.$input.checked &&
      radioSubmission(a) === "a" &&
      radioSubmission(b) === "b",
  );
  lateRadioA.remove();
  lateRadioB.remove();
  const appendedRadioA = addIsolatedRadio(a, "a");
  const appendedRadioB = addIsolatedRadio(b, "b");
  await tick();
  check(
    "standalone-radio-initial-check-isolated-while-new-fields-are-assigned",
    appendedRadioA.checked &&
      appendedRadioB.checked &&
      radioSubmission(a) === "a" &&
      radioSubmission(b) === "b",
  );
  const alternateRadio = addIsolatedRadio(a, "alternate", false);
  await tick();
  alternateRadio.click();
  check(
    "standalone-radio-switches-only-within-its-form-after-association",
    alternateRadio.checked &&
      !appendedRadioA.checked &&
      appendedRadioB.checked &&
      radioSubmission(a) === "alternate" &&
      radioSubmission(b) === "b",
  );
  alternateRadio.remove();
  appendedRadioA.remove();
  appendedRadioB.remove();
  check("late-providers-and-owner", input.form === a.nativeForm && input.name === "inherited");
  check("initial-value-submitted", new FormData(a.nativeForm).get("inherited") === "initial");
  check(
    "initial-inner-block-keeps-input-editable",
    input.classList.contains("is-block") && !input.$inner.disabled,
  );
  let userEvents = 0;
  input.addEventListener("input", () => userEvents++);
  input.addEventListener("change", () => userEvents++);
  input.value = "property";
  input.setValue("method");
  input.setAttribute("value", "attribute");
  check(
    "all-assignments-sync",
    new FormData(a.nativeForm).get("inherited") === "method" &&
      input.$inner.value === "method" &&
      userEvents === 0,
  );
  input.name = "explicit";
  item.setAttribute("prop", "changed");
  check("explicit-name-wins", input.name === "explicit");
  input.removeAttribute("name");
  check(
    "name-removal-inherits-current",
    input.name === "changed" && new FormData(a.nativeForm).get("changed") === "method",
  );
  item.setAttribute("inner-block", "true");
  input.setAttribute("inner-block", "false");
  check("false-layout-override", !input.classList.contains("is-block"));
  input.removeAttribute("inner-block");
  input.setAttribute("required", "");
  input.value = "";
  check("required-programmatic", input.validity.valueMissing && !input.checkValidity());
  input.removeAttribute("required");
  item.removeAttribute("required");
  input.setAttribute("pattern", "[A-Z]+");
  input.value = "abc";
  check("pattern-programmatic", input.validity.patternMismatch);
  input.value = "ABC";
  check("pattern-valid", input.validity.valid);
  input.removeAttribute("pattern");
  input.setAttribute("minlength", "3");
  input.value = "ab";
  check("minlength-programmatic", input.validity.tooShort);
  input.removeAttribute("minlength");
  input.setAttribute("maxlength", "2");
  input.value = "abc";
  check("maxlength-programmatic", input.validity.tooLong);
  input.removeAttribute("maxlength");
  input.setAttribute("type", "number");
  input.setAttribute("min", "2");
  input.setAttribute("max", "8");
  input.setAttribute("step", "2");
  input.value = "1";
  check("range-min", input.validity.rangeUnderflow);
  input.value = "9";
  check("range-max", input.validity.rangeOverflow);
  input.value = "3";
  check("step", input.validity.stepMismatch);
  input.setAttribute("readonly", "");
  check("readonly-no-constraints", input.checkValidity());
  input.removeAttribute("readonly");
  input.removeAttribute("type");
  for (const attr of ["min", "max", "step"]) input.removeAttribute(attr);
  input.defaultValue = 0;
  input.value = "edit";
  a.reset();
  await tick();
  check("default-zero-reset", input.value === "0" && input.$inner.value === "0");
  input.defaultValue = false;
  input.value = "edit";
  input.reset();
  check("default-false-reset", input.value === "false");
  input.setAttribute("value", "new-default");
  input.value = "edit";
  input.reset();
  check("dynamic-attribute-default", input.value === "new-default");
  const state = input.serializeFormState();
  input.value = "overwrite";
  input.formStateRestoreCallback(state, "restore");
  check(
    "restore-value-ui-data",
    input.value === "new-default" &&
      input.$inner.value === "new-default" &&
      new FormData(a.nativeForm).get(input.name) === "new-default",
  );
  input.formStateRestoreCallback("{bad", "restore");
  check("foreign-state-safe", input.value === "new-default");
  input.formStateRestoreCallback(JSON.stringify({ version: 1, value: "autofill" }), "autocomplete");
  check("autocomplete-handler", input.value === "autofill");
  input.setAttribute("form", "external");
  await tick();
  check(
    "explicit-external-owner",
    input.form === document.querySelector("#external") && !Object.hasOwn(a.getData(), input.name),
  );
  input.removeAttribute("form");
  input.name = "moving";
  await tick();
  b.append(input);
  await tick();
  check(
    "move-cleans-old-form",
    input.form === b.nativeForm &&
      !Object.hasOwn(a.getData(), input.name) &&
      Object.hasOwn(b.getData(), input.name),
  );
  const external = document.querySelector("#external");
  input.setAttribute("form", "external");
  external.remove();
  await tick();
  check("target-removal", input.form === null);
  document.body.append(external);
  await tick();
  check("target-reinsert", input.form === external);
  const native = document.querySelector("#native"),
    fieldset = native.querySelector("fieldset"),
    field = fieldset.querySelector("l-input");
  fieldset.disabled = true;
  check(
    "fieldset-disabled-ui-and-data",
    field.isDisabled() &&
      field.$inner.disabled &&
      !new FormData(native).has("field") &&
      !field.willValidate,
  );
  field.disabled = true;
  fieldset.disabled = false;
  check("own-disabled-survives-fieldset", field.disabled && field.isDisabled());
  field.disabled = false;
  check(
    "disabled-clear-restores",
    !field.isDisabled() && new FormData(native).get("field") === "own",
  );
  b.removeAttribute("disabled");
  input.removeAttribute("form");
  await tick();
  check("form-disabled-property-default", b.disabled === false);
  b.setAttribute("disabled", "");
  check(
    "context-disabled",
    b.disabled === true &&
      input.isDisabled() &&
      !new FormData(b.nativeForm).has(input.name) &&
      Object.hasOwn(b.getData(), input.name),
  );
  b.removeAttribute("disabled");
  check("context-disabled-clear", b.disabled === false && !input.isDisabled());
  check("clearing-disabled-preserves-default-layout", !input.classList.contains("is-block"));
  b.setAttribute("inner-block", "");
  check(
    "inner-block-does-not-disable-input",
    input.classList.contains("is-block") && !input.$inner.disabled,
  );
  b.setAttribute("disabled", "");
  check("explicit-disabled-coexists-with-inner-block", input.$inner.disabled);
  b.removeAttribute("inner-block");
  check(
    "removing-inner-block-preserves-explicit-disabled",
    !input.classList.contains("is-block") && input.$inner.disabled,
  );
  b.removeAttribute("disabled");
  check("removing-disabled-reenables-input", !input.$inner.disabled);
  b.setAttribute("disabled", "false");
  check("form-disabled-false-attribute", b.disabled === false && !input.$inner.disabled);
  b.disabled = true;
  check(
    "form-disabled-property-enables-disabled-attribute",
    b.disabled === true && b.getAttribute("disabled") === "" && input.$inner.disabled,
  );
  b.disabled = false;
  check(
    "form-disabled-property-removes-disabled-attribute",
    b.disabled === false && !b.hasAttribute("disabled") && !input.$inner.disabled,
  );
  const group = document.createElement("l-checkbox-group");
  group.name = "choices";
  group.value = "a&b";
  const c1 = document.createElement("l-checkbox"),
    c2 = document.createElement("l-checkbox");
  c1.value = "a";
  c2.value = "b";
  group.append(c1, c2);
  b.append(group);
  await tick();
  check(
    "group-selection-no-duplicates",
    c1.getChecked() &&
      c2.getChecked() &&
      JSON.stringify(new FormData(b.nativeForm).getAll("choices")) === JSON.stringify(["a", "b"]),
  );
  let groupChanges = 0;
  group.addEventListener("change", () => groupChanges++);
  c1.click();
  check("group-one-change", groupChanges === 1 && !c1.getChecked() && c2.getChecked());
  group.disabled = true;
  check(
    "group-disabled-members",
    c1.isDisabled() && c2.isDisabled() && !new FormData(b.nativeForm).has("choices"),
  );
  group.disabled = false;
  const standalone = document.createElement("l-checkbox");
  standalone.name = "token";
  standalone.value = "x";
  b.append(standalone);
  await tick();
  check("unchecked-excluded", !new FormData(b.nativeForm).has("token"));
  standalone.setChecked(true);
  check("checked-included", new FormData(b.nativeForm).get("token") === "x");
  standalone.setAttribute("required", "");
  standalone.setChecked(false);
  check("required-checkbox", standalone.validity.valueMissing);
  const checkedState = standalone.serializeFormState();
  standalone.setChecked(true);
  standalone.formStateRestoreCallback(checkedState, "restore");
  check("checked-state-restored", !standalone.getChecked() && !standalone.$input.checked);
  standalone.setAttribute("indeterminate", "");
  for (const invalid of [
    '{"version":1,"checked":true,"indeterminate":false}',
    '{"version":1,"value":"replacement","checked":true,"indeterminate":"false"}',
  ]) {
    standalone.formStateRestoreCallback(invalid, "restore");
  }
  check(
    "malformed-check-state-never-partially-restores",
    standalone.value === "x" &&
      !standalone.checked &&
      !standalone.$input.checked &&
      standalone.$input.indeterminate &&
      standalone.validity.valueMissing &&
      !new FormData(b.nativeForm).has("token"),
  );
  standalone.removeAttribute("indeterminate");
  group.defaultValue = "a";
  group.reset();
  check("group-reset-selection", c1.getChecked() && !c2.getChecked());
  let notifications = 0;
  const listener = () => notifications++;
  c1.addEventListener("l-form-context-configuration", listener);
  for (let i = 0; i < 3; i++) {
    group.remove();
    b.append(group);
  }
  await tick();
  notifications = 0;
  group.value = "b";
  check("remount-single-notification", notifications === 1 && c2.getChecked());
  const r1 = document.createElement("l-radio"),
    r2 = document.createElement("l-radio");
  r1.name = r2.name = "radio";
  r1.value = "one";
  r2.value = "two";
  b.append(r1, r2);
  await tick();
  r1.setChecked(true);
  r2.setChecked(true);
  check(
    "radio-owner-name-exclusion",
    !r1.getChecked() && r2.getChecked() && new FormData(b.nativeForm).getAll("radio").length === 1,
  );
  const sw = document.createElement("l-switch");
  sw.name = "switch";
  sw.value = false;
  b.append(sw);
  await tick();
  check(
    "switch-false-business-value",
    sw.value === false && new FormData(b.nativeForm).get("switch") === "false",
  );
  const select = document.createElement("l-select");
  select.name = "select";
  select.setAttribute("multiple", "");
  select.value = ["a", "b"];
  b.append(select);
  await tick();
  check(
    "select-multiple-entries",
    JSON.stringify(new FormData(b.nativeForm).getAll("select")) === JSON.stringify(["a", "b"]),
  );
  const selectedState = select.serializeFormState();
  select.value = ["other"];
  select.formStateRestoreCallback(selectedState, "restore");
  check(
    "select-array-state-restore",
    JSON.stringify(select.value) === JSON.stringify(["a", "b"]) &&
      new FormData(b.nativeForm).getAll("select").length === 2,
  );
  for (const [tag, value] of [
    ["l-input-number", 4],
    ["l-md-input", "markdown"],
    ["l-color-picker", "#123456"],
    ["l-date-picker", "2026-11-02"],
    ["l-date-picker-ori", "2026-11-02"],
  ]) {
    const control = document.createElement(tag);
    control.name = tag;
    control.value = value;
    b.append(control);
    await tick();
    check(tag + "-initial-serialization", new FormData(b.nativeForm).get(tag) === String(value));
    const saved = control.serializeFormState();
    control.value =
      tag === "l-input-number"
        ? 6
        : tag === "l-color-picker"
          ? "#abcdef"
          : tag.includes("date")
            ? "2026-11-03"
            : "edited";
    control.formStateRestoreCallback(saved, "restore");
    check(
      tag + "-state-ui",
      String(control.value) === String(value) &&
        new FormData(b.nativeForm).get(tag) === String(value),
    );
    control.disabled = true;
    check(tag + "-disabled", !new FormData(b.nativeForm).has(tag));
    control.disabled = false;
  }
  const range = document.createElement("l-date-picker-ori");
  range.name = "range";
  range.setAttribute("range", "");
  range.setAttribute("required", "");
  range.value = "2026-11-01,2026-11-02";
  b.append(range);
  await tick();
  check("date-range-valid-endpoints", range.checkValidity());
  range.value = "2026-11-01,";
  check("date-range-missing-endpoint", range.validity.valueMissing);
  const options = document.createElement("l-select-ori");
  options.name = "options";
  options.appendOptions([
    { label: "A", value: "a" },
    { label: "B", value: "b" },
  ]);
  b.append(options);
  await tick();
  options.value = "b";
  check("select-ori-set-value", new FormData(b.nativeForm).get("options") === "b");
  options.defaultValue = "a";
  options.reset();
  check(
    "select-ori-reset-ui",
    options.value === "a" && new FormData(b.nativeForm).get("options") === "a",
  );

  const makeField = (tag, attributes) => {
    const field = document.createElement(tag);
    for (const [name, value] of Object.entries(attributes)) field.setAttribute(name, value);
    return field;
  };
  const data = () => new FormData(b.nativeForm);
  const edit = (field, value, type) => {
    field.value = value;
    field.dispatchEvent(new Event(type, { bubbles: true, composed: type === "input" }));
  };

  const textField = makeField("l-md-input", { name: "text", value: "start", "inner-block": "" });
  const numberField = makeField("l-input-number", {
    name: "quantity",
    value: "0.2",
    min: "0",
    max: "1",
    step: "0.1",
  });
  b.append(textField, numberField);
  const textInput = textField.shadowRoot.querySelector("input");
  let textInputs = 0;
  textField.addEventListener("input", () => textInputs++);
  edit(textInput, "", "input");
  check(
    "md-input-empty-single-native-event",
    textInputs === 1 && textField.value === "" && data().get("text") === "",
  );
  textField.setValue(0);
  const textReset = textInput.value === "0" && textField.value === "0";
  textField.reset();
  check(
    "md-input-text-reset-layout",
    textReset && textInput.value === "start" && textField.classList.contains("is-block"),
  );
  const preMountNumber = makeField("l-md-input", { name: "preMountNumber", value: "12" });
  preMountNumber.value = "abc";
  preMountNumber.htmlType = "number";
  b.append(preMountNumber);
  const preMountEditor = preMountNumber.shadowRoot.querySelector("input");
  check(
    "md-input-mount-synchronizes-number-editor-after-programmatic-type-change",
    preMountEditor.type === "number" &&
      preMountEditor.value === "" &&
      !preMountNumber.classList.contains("l-has-value") &&
      b.getData().preMountNumber === "" &&
      data().get("preMountNumber") === "",
  );
  preMountNumber.setAttribute("value", "42");
  const mountKeptDirtyValue = preMountNumber.value === "" && preMountEditor.value === "";
  preMountNumber.reset();
  check(
    "md-input-mount-normalization-preserves-dirty-state-and-reset-baseline",
    mountKeptDirtyValue && preMountEditor.value === "42" && data().get("preMountNumber") === "42",
  );
  preMountNumber.remove();

  const upperNumber = makeField("l-md-input", {
    name: "upperNumber",
    "html-type": "NUMBER",
    value: "abc",
  });
  b.append(upperNumber);
  const upperEditor = upperNumber.shadowRoot.querySelector("input");
  check(
    "md-input-normalizes-uppercase-number-type-before-value-sanitization",
    upperEditor.type === "number" &&
      upperEditor.value === "" &&
      b.getData().upperNumber === "" &&
      data().get("upperNumber") === "",
  );
  upperNumber.remove();

  check(
    "number-default-typed",
    numberField.defaultValue === 0.2 &&
      numberField.value === 0.2 &&
      data().get("quantity") === "0.2",
  );
  const numberEvents = [];
  numberField.addEventListener("input", (event) => numberEvents.push(event.detail));
  numberField.$plusBtn.click();
  check(
    "number-decimal-step",
    numberField.value === 0.3 && data().get("quantity") === "0.3" && numberEvents.length === 1,
  );
  edit(numberField.$input, "0.25", "input");
  check(
    "number-single-input-and-native-step",
    numberField.validity.stepMismatch &&
      numberEvents.length === 2 &&
      numberEvents[1]?.value === 0.25,
  );
  numberField.setAttribute("precision", "2");
  edit(numberField.$input, "1.52", "change");
  check(
    "number-max-and-precision",
    numberField.value === 1 && numberField.$input.value === "1.00" && numberField.$plusBtn.disabled,
  );
  edit(numberField.$input, "-2", "change");
  check(
    "number-min-and-zero",
    numberField.value === 0 && data().get("quantity") === "0" && numberField.$minusBtn.disabled,
  );
  edit(numberField.$input, "", "input");
  edit(numberField.$input, "", "change");
  check(
    "number-empty-does-not-become-zero",
    numberField.value === undefined &&
      data().get("quantity") === "" &&
      numberEvents.at(-1)?.value === undefined,
  );
  numberField.setAttribute("precision", "1000");
  edit(numberField.$input, "0.3x", "change");
  check(
    "number-invalid-input-clears",
    numberField.value === undefined && numberField.$input.value === "",
  );
  numberField.reset();
  check("number-reset-default", numberField.value === 0.2 && numberField.$input.value === "0.2");

  const nativeSelect = makeField("l-select-ori", { name: "nativeOptions" });
  nativeSelect.setOptions([
    { label: "Pick", value: "", defaultSelected: true },
    { label: "Disabled", value: "disabled", disabled: true },
  ]);
  b.append(nativeSelect);
  const nativeList = nativeSelect.shadowRoot.querySelector("select");
  check(
    "native-select-empty-option-before-mount",
    nativeList.options.length === 2 && data().get("nativeOptions") === "",
  );
  nativeSelect.value = "disabled";
  check(
    "native-select-disabled-option-not-submitted",
    nativeList.selectedOptions[0].disabled && !data().has("nativeOptions"),
  );
  nativeSelect.appendOptions([{ label: "Active", value: "active" }]);
  edit(nativeList, "active", "change");
  check(
    "native-select-live-option-and-user-value",
    nativeSelect.value === "active" && data().get("nativeOptions") === "active",
  );

  const choiceItem = makeField("l-form-item", { prop: "availableChoice", required: "" });
  const choice = makeField("l-select-ori", { value: "later" });
  const firstOption = { label: "First", value: "first" };
  const secondOption = { label: "Second", value: "second" };
  choice.setOptions([firstOption, secondOption]);
  choiceItem.append(choice);
  b.append(choiceItem);
  const choiceList = choice.shadowRoot.querySelector("select");
  const choiceEvents = [];
  choice.addEventListener("change", ({ detail }) => choiceEvents.push(detail));
  check(
    "select-ori-unmatched-default-is-empty-in-ui-business-and-required-validation",
    choiceList.selectedIndex === -1 &&
      b.getData().availableChoice === "" &&
      !data().has("availableChoice") &&
      choice.validity.valueMissing &&
      !!(await b.validate()).errors.availableChoice,
  );
  choice.appendOptions([{ label: "Later", value: "later" }]);
  check(
    "select-ori-late-option-matches-authored-default-silently",
    choiceList.value === "later" &&
      b.getData().availableChoice === "later" &&
      data().get("availableChoice") === "later" &&
      choiceEvents.length === 0,
  );
  edit(choiceList, "second", "change");
  choice.setOptions([firstOption]);
  check(
    "select-ori-option-removal-clears-effective-value-and-required-fails",
    choiceList.selectedIndex === -1 &&
      b.getData().availableChoice === "" &&
      !data().has("availableChoice") &&
      choice.validity.valueMissing &&
      !!(await b.validate()).errors.availableChoice,
  );
  choice.appendOptions([secondOption]);
  check(
    "select-ori-reappearing-option-restores-selection-without-change",
    choiceList.value === "second" &&
      b.getData().availableChoice === "second" &&
      data().get("availableChoice") === "second" &&
      choiceEvents.join() === "second",
  );
  choice.removeAttribute("value");
  choice.reset();
  check(
    "select-ori-reset-restores-first-enabled-option-after-options-change",
    choiceList.value === "first" &&
      b.getData().availableChoice === "first" &&
      data().get("availableChoice") === "first" &&
      choiceEvents.join() === "second",
  );
  choiceItem.remove();

  const multi = makeField("l-select", {
    name: "multi",
    multiple: "",
    clearable: "",
    filterable: "",
    placeholder: "Pick items",
    "empty-text": "No options",
    "label-field": "title",
    "value-field": "key",
  });
  b.append(multi);
  const selectInput = multi.shadowRoot.querySelector("input");
  multi.click();
  const popup = document.querySelector(".l-popover--select");
  check(
    "select-empty-popup-and-placeholder",
    popup.textContent.trim() === "No options" && selectInput.placeholder === "Pick items",
  );
  multi.setOptions([
    { title: "First", key: 0 },
    { title: "Second", key: false },
    { title: "Disabled", key: 2, disabled: true },
  ]);
  const multiEvents = [];
  multi.addEventListener("change", (event) =>
    multiEvents.push([event.detail, data().getAll("multi")]),
  );
  popup.querySelector(".l-select-option--disabled").click();
  check("select-disabled-option-ignored", !multiEvents.length && multi.value.length === 0);
  popup.querySelector('[data-action="1"]').click();
  popup.querySelector('[data-action="0"]').click();
  const previousSelection = multi.value;
  check(
    "select-values-and-labels-match-after-user-choice",
    JSON.stringify(previousSelection) === "[false,0]" &&
      multi.selectedLabels.join() === "Second,First" &&
      multiEvents[1]?.[1].join() === "false,0",
  );
  multi.shadowRoot.querySelector('.l-select-tag-close[data-action="0"]').click();
  check(
    "select-remove-correct-tag-emits-once",
    multi.value.length === 1 &&
      multi.value[0] === 0 &&
      previousSelection.length === 2 &&
      multiEvents.length === 3 &&
      data().getAll("multi").join() === "0",
  );
  multi.setOptions([{ title: "Renamed", key: 0 }]);
  check(
    "select-dynamic-mapping-keeps-current-value",
    multi.selectedLabels.join() === "Renamed" && multi.value[0] === 0 && multiEvents.length === 3,
  );
  multi.dispatchEvent(new MouseEvent("mouseenter"));
  multi.shadowRoot.querySelector(".l-select-clear").click();
  check(
    "select-clear-event-and-no-auxiliary-field",
    multiEvents.length === 4 &&
      data().getAll("multi").length === 0 &&
      selectInput.form === null &&
      selectInput.name === "",
  );
  popup.querySelector('[data-action="0"]').click();
  multi.dispatchEvent(new MouseEvent("mouseenter"));
  const clearBeforeLastTag = multi.shadowRoot.querySelector(".l-select-clear");
  multi.shadowRoot.querySelector(".l-select-tag-close").click();
  check(
    "select-removing-last-tag-restores-arrow-without-extra-change",
    !!clearBeforeLastTag &&
      !multi.shadowRoot.querySelector(".l-select-clear") &&
      !multi.classList.contains("l-select--clearable") &&
      multiEvents.length === 6 &&
      multiEvents[5][0].value.length === 0 &&
      multiEvents[5][0].labels.length === 0 &&
      multiEvents[5][1].length === 0,
  );
  multi.remove();

  const single = makeField("l-select", { name: "single", required: "" });
  const objectOption = { id: 1 };
  single.setOptions([
    { label: "Object", value: objectOption },
    { label: "Comma", value: "a,b" },
    { label: "No limit", value: "" },
  ]);
  b.append(single);
  single.click();
  single._popover.popoverElement.querySelector('[data-action="0"]').click();
  check(
    "select-single-object-preserves-business-value-and-reports-submission-error",
    single.value === objectOption &&
      b.getData().single === objectOption &&
      single.selectedLabels[0] === "Object" &&
      !data().has("single") &&
      single.validity.customError &&
      single.validationMessage.includes("对象选项"),
  );
  single.value = "a,b";
  check(
    "select-single-comma-string",
    single.value === "a,b" &&
      single.selectedLabels[0] === "Comma" &&
      data().get("single") === "a,b" &&
      single.validity.valid,
  );
  single.value = null;
  check(
    "select-single-null-remains-a-business-value-without-a-native-entry",
    b.getData().single === null && !data().has("single") && single.validity.valueMissing,
  );
  single.setValue(undefined);
  const emptySnapshot = b.getData();
  check(
    "select-single-undefined-keeps-its-own-key-without-a-native-entry",
    Object.hasOwn(emptySnapshot, "single") &&
      emptySnapshot.single === undefined &&
      !data().has("single"),
  );
  single.value = "";
  check(
    "select-single-explicit-empty-string-still-submits-an-empty-entry",
    b.getData().single === "" && data().get("single") === "",
  );
  single.value = "a,b";
  const emptyOptionEvents = [];
  single.addEventListener("change", ({ detail }) => emptyOptionEvents.push(detail));
  single.click();
  single._popover.popoverElement.querySelector('[data-action="2"]').click();
  single.click();
  const emptyOption = single._popover.popoverElement.querySelector('[data-action="2"]');
  check(
    "select-single-empty-option-uses-its-label-in-the-control-and-change-event",
    single.shadowRoot.querySelector(".l-selected-item")?.textContent === "No limit" &&
      single.selectedLabels[0] === "No limit" &&
      emptyOption.classList.contains("l-select-option--selected") &&
      emptyOptionEvents.length === 1 &&
      emptyOptionEvents[0].value === "" &&
      emptyOptionEvents[0].labels[0] === "No limit" &&
      b.getData().single === "" &&
      data().get("single") === "" &&
      single.validity.valueMissing,
  );
  emptyOption.click();
  single.value = "a,b";
  check(
    "select-reselecting-empty-option-and-programmatic-assignment-stay-silent",
    emptyOptionEvents.length === 1,
  );

  const remote = makeField("l-select", { name: "remoteChoice", filterable: "", remote: "" });
  remote.setOptions([{ label: "Apple", value: 1 }]);
  remote.value = 1;
  b.append(remote);
  remote.click();
  const remoteInput = remote.shadowRoot.querySelector("input");
  const remoteQueries = [];
  const remoteChanges = [];
  remote.addEventListener("change", ({ detail }) => remoteChanges.push(detail));
  remote.addEventListener("search", ({ detail }) => {
    remoteQueries.push(detail.value);
    remote.setOptions([
      { label: "Apple updated", value: 1 },
      { label: "Apricot", value: 2 },
    ]);
  });
  edit(remoteInput, "ap", "input");
  remoteInput.setSelectionRange(1, 1);
  await new Promise((resolve) => setTimeout(resolve, 350));
  check(
    "select-remote-options-refresh-labels-and-results-without-resetting-query-or-caret",
    remoteQueries.join() === "ap" &&
      remoteInput.value === "ap" &&
      remoteInput.selectionStart === 1 &&
      remote.selectedLabels[0] === "Apple updated" &&
      remote._popover.popoverElement.querySelector('[data-action="1"]').textContent === "Apricot" &&
      b.getData().remoteChoice === 1 &&
      data().get("remoteChoice") === "1" &&
      remoteChanges.length === 0,
  );
  edit(remoteInput, remoteInput.value + "r", "input");
  await new Promise((resolve) => setTimeout(resolve, 350));
  check("select-remote-query-continues-after-options-refresh", remoteQueries.join() === "ap,apr");
  remoteInput.blur();
  remote.setOptions([{ label: "Apple after blur", value: 1 }]);
  check(
    "select-remote-options-update-displayed-label-after-search-blur",
    remoteInput.value === "Apple after blur" &&
      remote.selectedLabels[0] === "Apple after blur" &&
      remoteChanges.length === 0,
  );
  remote.remove();

  const mixedSelect = makeField("l-select", { name: "mixedSelect", multiple: "" });
  mixedSelect.setOptions([
    { label: "Zero", value: 0 },
    { label: "False", value: false },
    { label: "Object", value: objectOption },
  ]);
  b.append(mixedSelect);
  mixedSelect.value = [0, false];
  check(
    "select-multiple-primitive-values-retain-their-types-and-native-entries",
    b.getData().mixedSelect === mixedSelect.value &&
      mixedSelect.value[0] === 0 &&
      mixedSelect.value[1] === false &&
      data().getAll("mixedSelect").join() === "0,false",
  );
  mixedSelect.value = [0, objectOption, false];
  check(
    "select-multiple-object-omits-the-field-instead-of-submitting-a-partial-selection",
    b.getData().mixedSelect === mixedSelect.value &&
      mixedSelect.value[1] === objectOption &&
      !data().has("mixedSelect") &&
      mixedSelect.validity.customError,
  );
  mixedSelect.disabled = true;
  check(
    "select-disabled-object-keeps-its-value-without-a-submission-error",
    b.getData().mixedSelect[1] === objectOption &&
      !data().has("mixedSelect") &&
      mixedSelect.validity.valid,
  );
  mixedSelect.disabled = false;
  check("select-object-error-returns-when-reenabled", mixedSelect.validity.customError);
  mixedSelect.value = [0, false];
  check(
    "select-replacing-the-object-restores-all-native-entries",
    mixedSelect.validity.valid && data().getAll("mixedSelect").join() === "0,false",
  );
  mixedSelect.remove();

  class SerializedSelect extends Select {
    serializeFormValue() {
      if (typeof this.value?.id === "number") return String(this.value.id);
      return super.serializeFormValue();
    }
  }
  customElements.define("test-serialized-select", SerializedSelect);
  const serializedSelect = makeField("test-serialized-select", { name: "serializedSelect" });
  serializedSelect.setOptions([{ label: "Object", value: objectOption }]);
  b.append(serializedSelect);
  serializedSelect.value = objectOption;
  check(
    "select-explicit-object-serializer-enables-native-submission",
    b.getData().serializedSelect === objectOption &&
      serializedSelect.validity.valid &&
      data().get("serializedSelect") === "1",
  );
  serializedSelect.remove();

  const radioGroup = makeField("l-radio-group", { name: "groupedRadio", required: "" });
  const groupedRadio = makeField("l-radio", { value: "one", name: "mustNotSubmit" });
  const nextRadio = makeField("l-radio", { value: "two" });
  radioGroup.append(groupedRadio, nextRadio);
  b.append(radioGroup);
  check(
    "radio-group-required-empty",
    radioGroup.validity.valueMissing && !data().has("groupedRadio"),
  );
  groupedRadio.click();
  nextRadio.click();
  check(
    "radio-group-one-submission-owner",
    nextRadio.checked &&
      !groupedRadio.checked &&
      data().getAll("groupedRadio").join() === "two" &&
      !data().has("mustNotSubmit"),
  );
  nextRadio.disabled = true;
  check(
    "radio-group-selected-disabled-member-omitted",
    nextRadio.checked && !data().has("groupedRadio") && radioGroup.validity.valueMissing,
  );
  radioGroup.disabled = true;
  radioGroup.disabled = false;
  check(
    "radio-group-enable-keeps-member-disabled",
    nextRadio.$input.disabled && !groupedRadio.$input.disabled,
  );
  nextRadio.disabled = false;
  check("radio-member-reenabled-submits", data().get("groupedRadio") === "two");
  nextRadio.remove();
  const replacement = makeField("l-radio", { value: "two" });
  radioGroup.append(replacement);
  check(
    "radio-group-dynamic-replacement-reads-current-value",
    replacement.checked && data().get("groupedRadio") === "two",
  );
  radioGroup.reset();
  check(
    "radio-group-reset-requires-selection-again",
    !replacement.checked && radioGroup.validity.valueMissing,
  );
  c1.setAttribute("indeterminate", "");
  c1.disabled = true;
  c1.click();
  check(
    "checkbox-half-selected-disabled-and-no-extra-entry",
    c1.$input.indeterminate && !c1.checked && data().getAll("choices").join() === "b",
  );

  const unicodeOptions = makeField("l-checkbox-group", { name: "unicodeOptions" });
  const completeCharacter = "😀";
  const clippedCharacter = completeCharacter.slice(0, 1);
  const replacementCharacter = "\uFFFD";
  const clippedOption = makeField("l-checkbox", {});
  clippedOption.value = clippedCharacter;
  const completeOption = makeField("l-checkbox", { value: completeCharacter });
  const legacyOption = makeField("l-checkbox", { value: "bad%ZZ" });
  unicodeOptions.append(clippedOption, completeOption, legacyOption);
  b.append(unicodeOptions);
  const unicodeChanges = [];
  unicodeOptions.addEventListener("change", ({ detail: { value } }) => unicodeChanges.push(value));
  clippedOption.$input.click();
  completeOption.$input.click();
  const encodedUnicodeValue = unicodeOptions.value;
  check(
    "checkbox-group-encodes-truncated-unicode-and-preserves-complete-pairs",
    clippedOption.checked &&
      completeOption.checked &&
      encodedUnicodeValue === "%EF%BF%BD&%F0%9F%98%80" &&
      JSON.stringify(unicodeChanges) ===
        JSON.stringify([[replacementCharacter], [replacementCharacter, completeCharacter]]) &&
      data().getAll("unicodeOptions").join() === [replacementCharacter, completeCharacter].join(),
  );
  unicodeOptions.value = "";
  unicodeOptions.value = encodedUnicodeValue;
  check(
    "checkbox-group-encoded-replacement-token-restores-selection",
    clippedOption.checked &&
      completeOption.checked &&
      unicodeChanges.length === 2 &&
      b.getData().unicodeOptions === encodedUnicodeValue,
  );
  unicodeOptions.value = `bad%ZZ&${clippedCharacter}`;
  check(
    "checkbox-group-legacy-invalid-escapes-remain-literal-beside-truncated-unicode",
    legacyOption.checked &&
      clippedOption.checked &&
      !completeOption.checked &&
      data().getAll("unicodeOptions").join() === ["bad%ZZ", replacementCharacter].join() &&
      unicodeChanges.length === 2,
  );
  unicodeOptions.remove();

  const mixedCheck = makeField("l-checkbox", {
    name: "mixed",
    value: "selected",
    indeterminate: "",
  });
  mixedCheck.innerHTML = '<span>Select some</span><span aria-hidden="true">decorative</span>';
  b.append(mixedCheck);
  const mixedInput = mixedCheck.$input;
  const mixedLabel = mixedCheck.shadowRoot.querySelector("label");
  let mixedChanges = 0;
  mixedCheck.addEventListener("change", () => mixedChanges++);
  check(
    "checkbox-slot-label-and-no-unchecked-mixed-entry",
    mixedInput.getAttribute("aria-label") === "Select some" &&
      mixedInput.indeterminate &&
      !data().has("mixed"),
  );
  mixedInput.click();
  check(
    "checkbox-native-click-keeps-configured-mixed-state",
    mixedInput.indeterminate &&
      mixedCheck.classList.contains("is-indeterminate") &&
      mixedInput.checked &&
      mixedCheck.checked &&
      data().getAll("mixed").join() === "selected" &&
      mixedChanges === 1,
  );
  const indicator = () =>
    getComputedStyle(mixedCheck.shadowRoot.querySelector(".l-check__inner"), "::after").transform;
  check("checkbox-checked-mixed-shows-line", indicator() === "matrix(1, 0, 0, 1, 0, 0)");
  mixedCheck.removeAttribute("indeterminate");
  check(
    "checkbox-removing-mixed-restores-only-checked-state",
    !mixedInput.indeterminate &&
      indicator() === "matrix(0.707107, -0.707107, 0.707107, 0.707107, 0, 0)" &&
      mixedCheck.checked &&
      data().getAll("mixed").join() === "selected" &&
      mixedChanges === 1,
  );
  mixedCheck.setAttribute("aria-label", "Explicit name");
  check(
    "checkbox-explicit-accessible-name-wins",
    mixedInput.getAttribute("aria-label") === "Explicit name",
  );
  mixedCheck.removeAttribute("aria-label");
  mixedCheck.firstElementChild.textContent = "Updated slot text";
  await tick();
  check(
    "checkbox-updating-slot-updates-accessible-name",
    mixedInput.getAttribute("aria-label") === "Updated slot text",
  );
  mixedCheck.firstElementChild.setAttribute("slot", "other");
  await tick();
  check("checkbox-unassigned-content-is-not-a-label", !mixedInput.hasAttribute("aria-label"));
  mixedCheck.textContent = "Plain text";
  await tick();
  check(
    "checkbox-plain-slotted-text-names-input",
    mixedInput.getAttribute("aria-label") === "Plain text",
  );
  mixedCheck.setAttribute("label", "Label fallback");
  mixedCheck.replaceChildren();
  await tick();
  check(
    "checkbox-changing-label-fallback-updates-visual-and-accessible-name",
    mixedInput.getAttribute("aria-label") === "Label fallback" &&
      mixedLabel.querySelector("slot").textContent === "Label fallback",
  );
  mixedLabel.click();
  check(
    "checkbox-label-click-toggles-once",
    !mixedCheck.checked && !data().has("mixed") && mixedChanges === 2,
  );
  mixedCheck.remove();

  const cancelledCheck = makeField("l-checkbox", { name: "cancelled" });
  b.append(cancelledCheck);
  let cancelledChanges = 0;
  cancelledCheck.addEventListener("change", () => cancelledChanges++);
  const cancelClick = (event) => event.preventDefault();
  b.addEventListener("click", cancelClick, { once: true });
  cancelledCheck.$input.click();
  check(
    "checkbox-cancelled-native-click-leaves-state-and-submission-unchanged",
    !cancelledCheck.checked &&
      !cancelledCheck.$input.checked &&
      !cancelledCheck.classList.contains("is-checked") &&
      !data().has("cancelled") &&
      cancelledChanges === 0,
  );
  cancelledCheck.$input.click();
  check(
    "checkbox-next-native-click-activates-once",
    cancelledCheck.checked &&
      cancelledCheck.$input.checked &&
      data().get("cancelled") === "on" &&
      cancelledChanges === 1,
  );
  cancelledCheck.remove();

  const navigation = makeField("l-radio-group", { name: "navigation", value: "c" });
  const firstRadio = makeField("l-radio", { value: "a" });
  const disabledRadio = makeField("l-radio", { value: "b", disabled: "" });
  const lastRadio = makeField("l-radio", { value: "c" });
  navigation.append(firstRadio, disabledRadio, lastRadio);
  b.append(navigation);
  const tabStops = () =>
    [firstRadio, disabledRadio, lastRadio].map((radio) => radio.$input.tabIndex);
  const arrow = (radio, key) =>
    radio.$input.dispatchEvent(
      new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true }),
    );
  const navigationChanges = [];
  navigation.addEventListener("change", (event) => navigationChanges.push(event.detail.value));
  check("radio-group-selected-option-is-the-single-tab-stop", tabStops().join() === "-1,-1,0");
  lastRadio.$input.focus();
  arrow(lastRadio, "ArrowRight");
  check(
    "radio-group-arrow-wraps-and-focuses-through-native-input",
    firstRadio.shadowRoot.activeElement === firstRadio.$input &&
      firstRadio.checked &&
      !lastRadio.checked &&
      data().get("navigation") === "a" &&
      navigationChanges.join() === "a" &&
      tabStops().join() === "0,-1,-1",
  );
  arrow(firstRadio, "ArrowDown");
  check(
    "radio-group-arrow-skips-disabled-options",
    lastRadio.shadowRoot.activeElement === lastRadio.$input &&
      lastRadio.checked &&
      !disabledRadio.checked &&
      data().get("navigation") === "c" &&
      navigationChanges.join() === "a,c",
  );
  navigation.value = null;
  navigation.insertBefore(lastRadio, firstRadio);
  check("radio-group-empty-selection-follows-current-order", tabStops().join() === "-1,-1,0");
  lastRadio.disabled = true;
  check("radio-group-empty-selection-skips-disabled-first-member", tabStops().join() === "0,-1,-1");
  navigation.disabled = true;
  check("radio-group-disabled-removes-all-tab-stops", tabStops().join() === "-1,-1,-1");
  navigation.disabled = false;
  check(
    "radio-group-enabled-restores-tab-stop-without-change-event",
    tabStops().join() === "0,-1,-1" && navigationChanges.join() === "a,c",
  );
  navigation.remove();

  const peerA = makeField("l-radio", { name: "nav-peer", value: "a", checked: "" });
  const peerB = makeField("l-radio", { name: "nav-peer", value: "b" });
  b.append(peerA, peerB);
  check(
    "standalone-radio-check-controls-the-same-name-tab-stop",
    peerA.$input.tabIndex === 0 && peerB.$input.tabIndex === -1,
  );
  peerA.$input.focus();
  arrow(peerA, "ArrowRight");
  check(
    "standalone-radio-arrow-navigates-between-shadow-roots",
    peerB.shadowRoot.activeElement === peerB.$input &&
      peerB.checked &&
      !peerA.checked &&
      peerA.$input.tabIndex === -1 &&
      peerB.$input.tabIndex === 0 &&
      data().get("nav-peer") === "b",
  );
  peerA.name = "another-peer";
  check(
    "standalone-radio-changing-name-restores-independent-tab-stop",
    peerA.$input.tabIndex === 0 && peerB.$input.tabIndex === 0,
  );
  peerA.remove();
  peerB.remove();

  for (const kind of ["radio", "checkbox"]) {
    const group = makeField(`l-${kind}-group`, { name: "edgeChoices", required: "" });
    const empty = makeField(`l-${kind}`, { value: "" });
    const first = makeField(`l-${kind}`, { value: "same" });
    const second = makeField(`l-${kind}`, { value: "same" });
    const changes = [];
    const emptyToken = kind === "radio" ? "" : "&";
    const noSelection = group.defaultValue;
    group.append(empty, first, second);
    b.append(group);
    group.addEventListener("change", (event) => changes.push(event.detail.value));
    check(
      `${kind}-empty-option-does-not-select-itself`,
      !empty.checked && group.validity.valueMissing,
    );

    empty.checked = true;
    empty.setChecked(true);
    check(
      `${kind}-member-checked-writes-cannot-select-an-option`,
      !empty.checked &&
        !empty.$input.checked &&
        group.value === noSelection &&
        !data().has("edgeChoices") &&
        group.validity.valueMissing &&
        changes.length === 0,
    );
    group.value = emptyToken;
    empty.checked = false;
    empty.setChecked(false);
    check(
      `${kind}-only-group-value-controls-programmatic-selection`,
      empty.checked &&
        empty.$input.checked &&
        group.value === emptyToken &&
        data().get("edgeChoices") === "" &&
        !group.validity.valueMissing &&
        changes.length === 0,
    );
    const emptyState = group.serializeFormState();
    group.value = kind === "radio" ? "same" : "&same";
    if (kind === "checkbox") {
      first.click();
      check(
        `${kind}-last-empty-token-survives`,
        empty.checked && group.value === "&" && data().getAll("edgeChoices").length === 1,
      );
    } else {
      second.click();
      check(
        `${kind}-duplicate-token-keeps-one-radio-checked`,
        !first.checked &&
          second.checked &&
          data().getAll("edgeChoices").join() === "same" &&
          changes.length === 1 &&
          changes[0] === "same",
      );
      second.remove();
      check(
        `${kind}-duplicate-removal-falls-back-to-matching-option`,
        first.checked && data().get("edgeChoices") === "same",
      );
    }
    group.value = noSelection;
    check(
      `${kind}-clearing-group-value-updates-form`,
      group.validity.valueMissing && !data().has("edgeChoices"),
    );
    group.formStateRestoreCallback(emptyState, "restore");
    check(
      `${kind}-empty-option-restores-as-a-selection`,
      empty.checked && data().get("edgeChoices") === "",
    );
    if (kind === "radio") {
      group.formStateRestoreCallback('{"version":1,"value":""}', "restore");
      check(
        `${kind}-legacy-empty-state-restores-no-selection`,
        !empty.checked && !data().has("edgeChoices"),
      );
    }
    group.value = emptyToken;
    group.value = undefined;
    check(
      `${kind}-undefined-value-clears-selection`,
      !empty.checked && group.validity.valueMissing && !data().has("edgeChoices"),
    );
    group.reset();
    empty.click();
    check(
      `${kind}-user-selects-empty-option`,
      empty.checked &&
        data().get("edgeChoices") === "" &&
        JSON.stringify(changes.at(-1)) === (kind === "radio" ? '""' : '[""]'),
    );

    group.value = "same";
    second.remove();
    first.value = "renamed";
    check(
      `${kind}-unmatched-configured-value-is-not-submitted`,
      group.value === "same" &&
        !first.checked &&
        !data().has("edgeChoices") &&
        b.getData().edgeChoices === (kind === "radio" ? null : "") &&
        group.validity.valueMissing,
    );
    first.value = "same";
    first.remove();
    check(
      `${kind}-removed-selection-is-not-submitted`,
      !data().has("edgeChoices") && group.validity.valueMissing,
    );
    const destination = makeField(`l-${kind}-group`, { name: "destinationChoices", value: "same" });
    b.append(destination);
    destination.append(first);
    check(
      `${kind}-moved-selection-only-submits-for-new-group`,
      first.checked && !data().has("edgeChoices") && data().get("destinationChoices") === "same",
    );
    group.append(first);
    check(
      `${kind}-reinserted-selection-matches-preserved-value`,
      first.checked &&
        data().get("edgeChoices") === "same" &&
        b.getData().edgeChoices === "same" &&
        !data().has("destinationChoices"),
    );
    first.disabled = true;
    check(
      `${kind}-business-data-retains-disabled-match`,
      b.getData().edgeChoices === "same" && !data().has("edgeChoices"),
    );
    group.remove();
    destination.remove();
  }

  const selectionForm = makeField("l-form", {});
  const selectionGroup = makeField("l-checkbox-group", { name: "selection", value: "a&b" });
  const aChoice = makeField("l-checkbox", { value: "a" });
  const bChoice = makeField("l-checkbox", { value: "b" });
  const selectionSubmits = [];
  selectionGroup.append(aChoice, bChoice);
  selectionForm.append(selectionGroup);
  document.body.append(selectionForm);
  selectionForm.setSchemas([{ key: "selection", required: true }]);
  selectionForm.addEventListener("submit", (event) => selectionSubmits.push(event.detail));
  bChoice.remove();
  selectionForm.submit();
  await Promise.resolve();
  check(
    "l-form-submit-contains-only-matching-selection",
    selectionSubmits.length === 1 && selectionSubmits[0].selection === "a",
  );
  aChoice.remove();
  selectionForm.submit();
  const validation = await selectionForm.validate();
  check(
    "l-form-required-rejects-removed-selection",
    selectionSubmits.length === 1 && !validation.result && !!validation.errors.selection,
  );
  selectionForm.remove();

  const lateGroup = makeField("test-late-checkbox-group", { name: "lateOptions", value: "a" });
  const earlyCheck = makeField("l-checkbox", { name: "earlyCheck", value: "a", checked: "" });
  lateGroup.append(earlyCheck);
  b.append(lateGroup);
  customElements.define("test-late-checkbox-group", class extends CheckboxGroup {});
  check(
    "late-check-group-adopts-existing-member",
    earlyCheck.grouped &&
      earlyCheck.checked &&
      !data().has("earlyCheck") &&
      data().get("lateOptions") === "a",
  );
  lateGroup.value = "";
  check(
    "late-check-group-member-receives-config",
    !earlyCheck.checked && !data().has("lateOptions"),
  );

  const otherRadio = makeField("l-radio", { name: "radio", value: "external", checked: "" });
  external.append(otherRadio);
  await tick();
  r1.click();
  check(
    "standalone-radio-owner-isolation",
    r1.checked &&
      !r2.checked &&
      otherRadio.checked &&
      data().get("radio") === "one" &&
      new FormData(external).get("radio") === "external",
  );

  const authoredNames = document.createElement("form");
  authoredNames.innerHTML = `
    <l-radio required name="radioFirst" value="r" checked></l-radio>
    <l-checkbox required name="checkboxFirst" value="c" checked></l-checkbox>
    <l-radio-group required name="radiosFirst" value="r"><l-radio value="r"></l-radio></l-radio-group>
    <l-checkbox-group required name="checkboxesFirst" value="c"><l-checkbox value="c"></l-checkbox></l-checkbox-group>
    <test-t381-late-check required name="lateName" value="late" checked></test-t381-late-check>
  `;
  document.body.append(authoredNames);
  customElements.define("test-t381-late-check", class extends Checkbox {});
  for (const [name, value] of [
    ["radioFirst", "r"],
    ["checkboxFirst", "c"],
    ["radiosFirst", "r"],
    ["checkboxesFirst", "c"],
    ["lateName", "late"],
  ]) {
    check(
      `required-before-name-preserves-${name}`,
      authoredNames.elements.namedItem(name)?.name === name &&
        new FormData(authoredNames).getAll(name).join() === value,
    );
  }
  authoredNames.remove();

  const sourceOwner = makeField("form", { id: "radio-required-source" });
  const destinationOwner = makeField("form", { id: "radio-required-destination" });
  const requiredPeer = makeField("l-radio", { name: "pick", required: "" });
  const selectedPeer = makeField("l-radio", { name: "pick", value: "selected", checked: "" });
  const destinationPeer = makeField("l-radio", { name: "pick", value: "destination", checked: "" });
  sourceOwner.append(requiredPeer, selectedPeer);
  destinationOwner.append(destinationPeer);
  document.body.append(sourceOwner, destinationOwner);
  check("independent-selected-peer-satisfies-required", sourceOwner.checkValidity());
  selectedPeer.remove();
  check(
    "independent-radio-removal-immediately-invalidates-old-owner",
    !sourceOwner.checkValidity(),
  );
  sourceOwner.append(selectedPeer);
  check("independent-radio-reinsertion-restores-validity", sourceOwner.checkValidity());
  selectedPeer.name = "renamed";
  check(
    "independent-radio-rename-immediately-invalidates-old-name",
    !sourceOwner.checkValidity() && new FormData(sourceOwner).get("renamed") === "selected",
  );
  selectedPeer.name = "pick";
  destinationOwner.append(selectedPeer);
  check(
    "independent-radio-move-updates-both-owners",
    !sourceOwner.checkValidity() &&
      !destinationPeer.checked &&
      new FormData(destinationOwner).getAll("pick").join() === "selected",
  );
  sourceOwner.append(selectedPeer);
  check("independent-radio-return-restores-old-owner", sourceOwner.checkValidity());
  selectedPeer.setAttribute("form", destinationOwner.id);
  check(
    "independent-radio-form-attribute-invalidates-old-owner",
    !sourceOwner.checkValidity() && selectedPeer.form === destinationOwner,
  );
  sourceOwner.remove();
  destinationOwner.remove();

  sw.setAttribute("required", "");
  sw.defaultValue = true;
  sw.value = "false";
  const switchRestoration = sw.serializeFormState();
  check(
    "switch-off-required-and-submitted-false",
    sw.value === false && sw.validity.valueMissing && data().get("switch") === "false",
  );
  sw.reset();
  check(
    "switch-reset-on",
    sw.value === true && sw.checkValidity() && data().get("switch") === "true",
  );
  sw.formStateRestoreCallback(switchRestoration, "restore");
  sw.disabled = true;
  sw.click();
  check("switch-disabled-after-restore", sw.value === false && !data().has("switch"));

  const color = makeField("l-color-picker", { name: "color", value: "#AABBCC" });
  b.append(color);
  const colorInput = color.shadowRoot.querySelector("input");
  check(
    "color-default-normalized-and-only-one-entry",
    color.value === "#aabbcc" &&
      data().getAll("color").join() === "#aabbcc" &&
      colorInput.form === null,
  );
  color.setValue("invalid");
  check(
    "color-invalid-falls-back-to-black",
    color.value === "#000000" &&
      colorInput.value === "#000000" &&
      data().get("color") === "#000000",
  );
  edit(colorInput, "#123456", "change");
  const colorRestoration = color.serializeFormState();
  color.reset();
  check("color-native-input-and-default-reset", colorInput.value === "#aabbcc");
  color.formStateRestoreCallback(colorRestoration, "restore");
  color.disabled = true;
  check(
    "color-restored-ui-and-disabled-form",
    colorInput.value === "#123456" && colorInput.disabled && !data().has("color"),
  );

  const date = makeField("l-date-picker-ori", {
    name: "date",
    value: "2026-11-01",
    min: "2026-11-01",
    max: "2026-11-30",
  });
  b.append(date);
  const dateInput = date.shadowRoot.querySelector("input");
  let dayChange;
  date.addEventListener("change", (event) => {
    dayChange = event;
  });
  edit(dateInput, "2026-11-17", "change");
  check(
    "date-native-change-contract-and-single-entry",
    date.value === "2026-11-17" &&
      dayChange?.detail.dates[0] instanceof Date &&
      !dayChange.bubbles &&
      !dayChange.composed &&
      data().getAll("date").join() === "2026-11-17",
  );
  date.value = "2026-02-31";
  check(
    "date-clears-unrepresentable-value",
    date.value === "" && dateInput.value === "" && data().get("date") === "",
  );
  date.value = "2026-10-31";
  check("date-native-min-validity", date.validity.rangeUnderflow);
  range.setAttribute("min", "2026-11-01");
  range.setAttribute("max", "2026-11-30");
  range.value = "2026-11-10,2026-11-20";
  const [startDate, endDate] = range.shadowRoot.querySelectorAll("input");
  check(
    "date-range-constraints-and-comma-value",
    startDate.max === "2026-11-20" &&
      endDate.min === "2026-11-10" &&
      data().getAll("range").length === 1 &&
      data().get("range") === "2026-11-10,2026-11-20",
  );
  const rangeState = range.serializeFormState();
  range.value = "2026-11-21,2026-11-20";
  check("date-reversed-range-invalid", range.validity.badInput);
  range.formStateRestoreCallback(rangeState, "restore");
  range.disabled = true;
  check(
    "date-range-state-disabled-both-inputs",
    endDate.value === "2026-11-20" &&
      startDate.disabled &&
      endDate.disabled &&
      !data().has("range"),
  );
  range.disabled = false;
  range.setAttribute("delay", "0");
  let rangeChanges = 0;
  range.addEventListener("change", () => rangeChanges++);
  edit(endDate, "2026-11-22", "change");
  range.reset();
  await tick();
  check(
    "date-range-reset-cancels-delayed-user-event",
    range.value === "" && startDate.value === "" && endDate.value === "" && rangeChanges === 0,
  );

  const partialRange = makeField("l-date-picker-ori", {
    name: "partialRange",
    range: "",
    delay: "80",
  });
  b.append(partialRange);
  const partialEditors = () => partialRange.shadowRoot.querySelectorAll("input");
  const initialStart = partialEditors()[0];
  const partialChanges = [];
  partialRange.addEventListener("change", (event) => partialChanges.push(event));
  edit(initialStart, "2026-11-04", "change");
  partialRange.setAttribute("min", "2026-11-01");
  await new Promise((resolve) => setTimeout(resolve, 110));
  check(
    "date-range-min-update-keeps-editor-and-pending-change",
    partialEditors()[0] === initialStart &&
      partialChanges.length === 1 &&
      partialChanges[0].detail.value === "2026-11-04,",
  );
  const partialValue = b.getData().partialRange;
  partialRange.setAttribute("delay", "0");
  partialRange.value = "2026-11-04,2026-11-22";
  edit(partialEditors()[1], "", "change");
  const queuedPartialChange = partialChanges.length === 1;
  await tick();
  check(
    "date-range-partial-values-use-two-slots-with-one-queued-change",
    queuedPartialChange &&
      partialValue === "2026-11-04," &&
      b.getData().partialRange === partialValue &&
      data().get("partialRange") === partialValue &&
      partialChanges.length === 2 &&
      partialChanges.every(
        (event) =>
          !event.bubbles &&
          !event.composed &&
          JSON.stringify(event.detail.dateStr) === '["2026-11-04",""]',
      ),
  );
  partialRange.remove();

  const dynamicRange = makeField("l-date-picker-ori", { name: "dynamicRange" });
  b.append(dynamicRange);
  dynamicRange.setAttribute("range", "");
  dynamicRange.value = "2026-11-22,2026-11-04";
  check(
    "date-reversed-range-invalid-before-dynamic-editors-rebuild",
    dynamicRange.shadowRoot.querySelectorAll("input").length === 1 &&
      dynamicRange.validity.badInput &&
      !dynamicRange.checkValidity(),
  );
  dynamicRange.remove();

  for (const [type, value, expected] of [
    ["time", "17:00", "1970-01-01T17:00:00.000Z"],
    ["week", "2026-W47", "2026-11-16T00:00:00.000Z"],
  ]) {
    const field = makeField("l-date-picker-ori", { name: `native-${type}`, type });
    b.append(field);
    const editor = field.shadowRoot.querySelector("input");
    let changeDetail;
    field.addEventListener("change", ({ detail }) => (changeDetail = detail));
    edit(editor, value, "change");
    const converted = changeDetail?.dates[0];
    check(
      `date-${type}-event-uses-native-date-conversion`,
      changeDetail?.dateStr[0] === value &&
        data().get(field.name) === value &&
        Number.isFinite(converted?.getTime()) &&
        converted.toISOString() === expected,
    );
    field.remove();
  }

  const shell = b.querySelector("l-date-picker");
  shell.click();
  const datePanel = shell._popover.popoverElement;
  check(
    "date-picker-shell-only-host-submits",
    datePanel.isConnected && data().getAll("l-date-picker").join() === "2026-11-02",
  );
  shell.remove();
  b.append(shell);
  shell.click();
  check(
    "date-picker-popover-recreated-on-remount",
    !datePanel.isConnected &&
      shell._popover.popoverElement.isConnected &&
      shell._popover.popoverElement !== datePanel,
  );
  shell.remove();

  const upload = makeField("l-upload", { name: "attachments", "auto-upload": "false" });
  b.append(upload);
  upload.fileList = [
    {
      id: 1,
      name: "pending.txt",
      size: 3,
      status: "ready",
      percentage: 0,
      raw: new File(["abc"], "pending.txt"),
    },
    { id: 2, name: "sending.txt", size: 3, status: "uploading", percentage: 50 },
    {
      id: 3,
      name: "uploaded.txt",
      size: 3,
      status: "success",
      percentage: 100,
      url: "https://example.test/uploaded.txt",
    },
  ];
  const uploadItems = upload.fileList;
  check(
    "upload-states-independent-of-form-data",
    !data().has("attachments") &&
      !Object.hasOwn(b.getData(), "attachments") &&
      uploadItems.length === 3,
  );
  b.nativeForm.reset();
  check(
    "upload-list-unchanged-by-native-reset",
    upload.fileList === uploadItems && uploadItems[0].raw instanceof File,
  );

  for (const kind of ["checkbox", "radio", "checkbox-group", "radio-group"]) {
    const grouped = kind.endsWith("-group");
    const optionType = kind.replace("-group", "");
    const requiredForm = document.createElement("l-form");
    requiredForm.innerHTML = `<l-form-item prop="pick" required><l-${kind} value="${grouped ? "missing" : "regular"}">${
      grouped ? `<l-${optionType} value=""></l-${optionType}>` : ""
    }</l-${kind}></l-form-item>`;
    document.body.append(requiredForm);
    await tick();
    const row = requiredForm.firstElementChild;
    const field = row.firstElementChild;
    const member = grouped ? field.firstElementChild : field;
    const owner = requiredForm.nativeForm;
    const requiredData = () => new FormData(owner).getAll("pick");
    const currentError = () => row.shadowRoot.querySelector(".l-form-item__error")?.textContent;
    const submits = [];
    requiredForm.addEventListener("submit", (event) => submits.push(event.detail));
    const missing = await requiredForm.validate();
    requiredForm.submit();
    await tick();
    check(
      `${kind}-required-unselected-blocks-both-paths`,
      !missing.result &&
        !!missing.errors.pick &&
        !!currentError() &&
        field.validity.valueMissing &&
        !requiredData().length &&
        !submits.length &&
        (grouped || requiredForm.getData().pick === "regular"),
    );

    if (!grouped) field.value = "";
    member.$input.click();
    const entered = await requiredForm.validate();
    requiredForm.submit();
    await tick();
    const expected = kind === "checkbox-group" ? "&" : "";
    check(
      `${kind}-required-selected-empty-passes-both-paths`,
      entered.result &&
        field.validity.valid &&
        !currentError() &&
        requiredData().length === 1 &&
        requiredData()[0] === "" &&
        submits.length === 1 &&
        submits[0].pick === expected &&
        requiredForm.getData().pick === expected,
    );

    const ruleValues = [];
    requiredForm.addSchema({
      key: "pick",
      rules: [(value) => (ruleValues.push(value), value === expected)],
    });
    await requiredForm.validateField("pick");
    check(
      `${kind}-required-adaptation-preserves-custom-rule-input`,
      ruleValues.length === 1 &&
        ruleValues[0] === expected &&
        requiredForm.validator.rules.pick.some(({ rule }) => rule === "required"),
    );
    if (grouped) {
      member.disabled = true;
      check(
        `${kind}-required-group-rejects-only-disabled-selected-option`,
        !(await requiredForm.validate()).result &&
          field.validity.valueMissing &&
          !requiredData().length &&
          requiredForm.getData().pick === expected,
      );
      member.disabled = false;
      field.value = "missing";
    } else {
      const saved = field.serializeFormState();
      field.checked = false;
      await requiredForm.validate();
      field.formStateRestoreCallback(saved, "restore");
      check(
        `${kind}-restoring-checked-with-same-value-clears-obsolete-business-error`,
        field.validity.valid && field.checked && requiredData()[0] === "",
      );
      field.checked = false;
    }
    requiredForm.setAttribute("emit-error", "");
    requiredForm.clearValidate();
    const reports = [];
    requiredForm.addEventListener("validate-error", ({ detail }) => reports.push(detail));
    owner.checkValidity();
    await tick();
    member.$input.click();
    await tick();
    check(
      `${kind}-emit-error-reports-missing-and-empty-selection-recovery-once`,
      reports.length === 2 &&
        !!reports[0].errors.pick &&
        Object.hasOwn(reports[1].errors, "pick") &&
        reports[1].errors.pick === undefined &&
        field.validity.valid &&
        !currentError(),
    );
    requiredForm.remove();
  }

  const clearOwner = document.body.appendChild(document.createElement("form"));
  clearOwner.innerHTML = `
    <l-checkbox name="single" value="x" checked></l-checkbox>
    <l-checkbox-group name="multiple" value="x"><l-checkbox value="x"></l-checkbox></l-checkbox-group>
    <l-radio-group name="radio" value="x"><l-radio value="x"></l-radio></l-radio-group>`;
  const [clearCheck, clearMultiple, clearRadio] = clearOwner.children;
  const omissionCalls = [];
  for (const field of clearOwner.children) {
    const original = field.internals.setFormValue.bind(field.internals);
    field.internals.setFormValue = (value, state) => {
      omissionCalls.push({ value, state });
      // Older WebKit ignores a null submission value after a previous value was stored.
      if (value !== null) original(value, state);
    };
  }
  check(
    "legacy-omission-starts-with-all-three-submission-values",
    [...new FormData(clearOwner)].length === 3,
  );
  clearCheck.checked = false;
  clearMultiple.value = "";
  clearRadio.value = null;
  check(
    "empty-formdata-clears-old-webkit-entries-and-keeps-string-state",
    [...new FormData(clearOwner)].length === 0 &&
      omissionCalls.length >= 3 &&
      omissionCalls.every(
        ({ value, state }) =>
          value instanceof FormData && [...value].length === 0 && typeof state === "string",
      ),
  );
  clearCheck.checked = true;
  clearMultiple.value = "x";
  clearRadio.value = "x";
  clearCheck.disabled = clearMultiple.disabled = clearRadio.disabled = true;
  clearCheck.disabled = clearMultiple.disabled = clearRadio.disabled = false;
  check(
    "legacy-omission-does-not-lose-selection-after-reenable",
    [...new FormData(clearOwner)].length === 3,
  );
  clearOwner.remove();

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
    errors,
    checks,
  });
}