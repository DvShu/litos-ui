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
  ])
    if (Type) regist(Type);
  const a = document.querySelector("#a"),
    b = document.querySelector("#b"),
    item = a.querySelector("l-form-item"),
    input = item.querySelector("l-input");
  regist(FormItem);
  regist(Form);
  await tick();
  check("late-providers-and-owner", input.form === a.nativeForm && input.name === "inherited");
  check("initial-value-submitted", new FormData(a.nativeForm).get("inherited") === "initial");
  let userEvents = 0;
  input.addEventListener("input", () => userEvents++);
  input.addEventListener("change", () => userEvents++);
  input.value = "property";
  input.setValue("method");
  input.setAttribute("value", "attribute");
  check(
    "all-assignments-sync",
    new FormData(a.nativeForm).get("inherited") === "attribute" &&
      input.$inner.value === "attribute" &&
      userEvents === 0,
  );
  input.name = "explicit";
  item.setAttribute("prop", "changed");
  check("explicit-name-wins", input.name === "explicit");
  input.removeAttribute("name");
  check(
    "name-removal-inherits-current",
    input.name === "changed" && new FormData(a.nativeForm).get("changed") === "attribute",
  );
  item.setAttribute("inner-block", "true");
  input.setAttribute("inner-block", "false");
  check("false-layout-override", !input.classList.contains("l-input--block"));
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
  check("default-zero-reset", input.value === 0 && input.$inner.value === "0");
  input.defaultValue = false;
  input.value = "edit";
  input.reset();
  check("default-false-reset", input.value === false);
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
  b.setAttribute("disabled", "");
  check(
    "context-disabled",
    input.isDisabled() &&
      !new FormData(b.nativeForm).has(input.name) &&
      Object.hasOwn(b.getData(), input.name),
  );
  b.removeAttribute("disabled");
  check("context-disabled-clear", !input.isDisabled());
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