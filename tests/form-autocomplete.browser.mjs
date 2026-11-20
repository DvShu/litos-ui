import {
  Form,
  FormItem,
  Input,
  MdInput,
  InputNumber,
  Select,
  SelectOri,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Switch,
  ColorPicker,
  DatePicker,
  DatePickerOri,
  regist,
} from "../src/components/index.ts";

const checks = [];
const check = (name, pass) => checks.push({ name, pass: !!pass });
const tick = () => new Promise((resolve) => setTimeout(resolve, 30));
const create = (tag, attrs = {}) => {
  const element = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) element.setAttribute(key, value);
  return element;
};
const editors = (field) => [...field.shadowRoot.querySelectorAll("input,textarea,select")];
const has = (field, value) => {
  const controls = editors(field);
  return (
    controls.length > 0 &&
    controls.every((control) => control.getAttribute("autocomplete") === value)
  );
};
try {
  const late = document.querySelector("#late");
  late.autocomplete = "off";
  regist([
    Form,
    FormItem,
    Input,
    MdInput,
    InputNumber,
    Select,
    SelectOri,
    Checkbox,
    CheckboxGroup,
    Radio,
    RadioGroup,
    Switch,
    ColorPicker,
    DatePicker,
    DatePickerOri,
  ]);
  await tick();
  check(
    "form-before-upgrade-property",
    late.autocomplete === "off" &&
      !Object.hasOwn(late, "autocomplete") &&
      has(late.firstElementChild, "off"),
  );
  late.remove();

  const form = create("l-form", { autocomplete: "off" });
  document.body.append(form);
  const fields = [];
  for (const tag of [
    "l-input",
    "l-md-input",
    "l-input-number",
    "l-select",
    "l-select-ori",
    "l-checkbox",
    "l-radio",
    "l-switch",
    "l-color-picker",
    "l-date-picker",
    "l-date-picker-ori",
  ]) {
    const field = create(tag, { name: tag, ...(tag === "l-select" ? { filterable: "" } : {}) });
    form.append(field);
    if (tag === "l-switch")
      check(
        "non-editor-control-keeps-existing-behavior",
        editors(field).length === 0 && field.value === false,
      );
    else fields.push(field);
  }
  const range = create("l-date-picker-ori", { range: "", name: "range" });
  form.append(range);
  fields.push(range);
  for (const [tag, child] of [
    ["l-checkbox-group", "l-checkbox"],
    ["l-radio-group", "l-radio"],
  ]) {
    const group = create(tag, { name: tag });
    const member = create(child, { value: "a" });
    group.append(member);
    form.append(group);
    fields.push(member);
  }
  const native = [create("input", { name: "plain" }), create("textarea"), create("select")];
  const explicit = create("input", { autocomplete: "email" });
  const item = create("l-form-item");
  item.append(...native, explicit);
  form.append(item);
  let events = 0;
  form.addEventListener("input", () => events++);
  form.addEventListener("change", () => events++);
  await tick();
  for (const field of fields)
    check(
      `initial-${field.localName}-${checks.length}`,
      has(field, "off") && !field.hasAttribute("autocomplete"),
    );
  check("date-range-both-editors", editors(range).length === 2 && has(range, "off"));
  range.removeAttribute("range");
  await tick();
  range.setAttribute("range", "");
  await tick();
  check("recreated-date-editors-inherit", editors(range).length === 2 && has(range, "off"));
  check(
    "native-input-textarea-select-inherit",
    native.every((field) => field.getAttribute("autocomplete") === "off"),
  );
  check("native-local-token-wins", explicit.getAttribute("autocomplete") === "email");
  check("helper-native-form-default", form.nativeForm.autocomplete === "off");

  fields[0].autocomplete = "email";
  fields[1].autocomplete = "current-password";
  fields[2].autocomplete = "off";
  native[0].setAttribute("autocomplete", "off");
  form.autocomplete = "on";
  await tick();
  check(
    "field-properties-local-override",
    has(fields[0], "email") && has(fields[1], "current-password") && has(fields[2], "off"),
  );
  check("native-same-value-explicit-override", native[0].getAttribute("autocomplete") === "off");
  check(
    "dynamic-on-all-unconfigured-fields",
    fields.slice(3).every((field) => has(field, "on")) &&
      native.slice(1).every((field) => field.getAttribute("autocomplete") === "on"),
  );
  check("helper-dynamic-default", form.nativeForm.autocomplete === "on");
  form.disabled = true;
  form.setAttribute("inner-block", "");
  form.disabled = false;
  check(
    "other-form-configuration-preserves-autocomplete",
    fields.slice(3).every((field) => has(field, "on")),
  );
  for (const field of fields.slice(0, 3)) field.autocomplete = "";
  native[0].removeAttribute("autocomplete");
  await tick();
  check(
    "removing-local-configuration-inherits-again",
    fields.every((field) => has(field, "on")) && native[0].getAttribute("autocomplete") === "on",
  );
  form.removeAttribute("autocomplete");
  await tick();
  check(
    "removing-form-configuration-clears-inherited-only",
    fields.every((field) => has(field, null)) &&
      native.every((field) => !field.hasAttribute("autocomplete")) &&
      explicit.autocomplete === "email",
  );
  check("helper-configuration-removed", !form.nativeForm.hasAttribute("autocomplete"));
  form.setAttribute("autocomplete", "OFF");
  check(
    "case-insensitive-native-enumeration",
    form.autocomplete === "off" && fields.every((field) => has(field, "off")),
  );
  form.setAttribute("autocomplete", "email");
  check(
    "invalid-form-token-uses-default",
    form.autocomplete === "" && fields.every((field) => has(field, null)),
  );

  form.autocomplete = "off";
  const other = create("l-form", { autocomplete: "on" });
  document.body.append(other);
  other.append(fields[0], native[0]);
  await tick();
  check("move-between-forms", has(fields[0], "on") && native[0].autocomplete === "on");
  document.body.append(fields[0], native[0]);
  await tick();
  check(
    "move-outside-form-clears-inheritance",
    has(fields[0], null) && !native[0].hasAttribute("autocomplete"),
  );
  form.append(fields[0], native[0]);
  await tick();
  const added = create("l-md-input");
  const addedNative = create("textarea");
  form.append(added, addedNative);
  await tick();
  check(
    "dynamically-added-fields-inherit",
    has(added, "off") && addedNative.autocomplete === "off",
  );
  added.autocomplete = "email";
  form.remove();
  check(
    "disconnect-removes-managed-native-attributes",
    native.every((field) => !field.hasAttribute("autocomplete")) &&
      !addedNative.hasAttribute("autocomplete") &&
      explicit.autocomplete === "email",
  );
  document.body.append(form);
  await tick();
  check(
    "remount-inherits-and-retains-local-configuration",
    has(fields[0], "off") &&
      has(added, "email") &&
      native.every((field) => field.autocomplete === "off"),
  );

  const parent = create("form", { autocomplete: "off" });
  const a = create("l-form", { autocomplete: "on" });
  const b = create("l-form");
  const aInput = create("l-input");
  const bInput = create("l-md-input");
  const plainA = create("input");
  const plainB = create("textarea");
  const outside = create("input");
  a.append(aInput, plainA);
  b.append(bInput, plainB);
  parent.append(a, b, outside);
  document.body.append(parent);
  await tick();
  check(
    "shared-native-form-isolation",
    parent.autocomplete === "off" &&
      has(aInput, "on") &&
      has(bInput, "off") &&
      plainA.autocomplete === "on" &&
      plainB.autocomplete === "off" &&
      !outside.hasAttribute("autocomplete"),
  );
  parent.autocomplete = "on";
  await tick();
  check("native-parent-dynamic-default", has(bInput, "on") && plainB.autocomplete === "on");
  a.autocomplete = "off";
  await tick();
  check(
    "shared-native-parent-not-mutated",
    parent.autocomplete === "on" && has(aInput, "off") && has(bInput, "on"),
  );
  b.autocomplete = "off";
  parent.removeAttribute("autocomplete");
  await tick();
  b.autocomplete = "";
  await tick();
  check("native-parent-default-removal", has(bInput, null) && !plainB.hasAttribute("autocomplete"));
  check("configuration-does-not-emit-input-change", events === 0);
  parent.remove();
  form.remove();
  other.remove();
  document.querySelector("#result").textContent = JSON.stringify({
    checks,
    pass: checks.every((item) => item.pass),
  });
} catch (error) {
  document.querySelector("#result").textContent = JSON.stringify({
    checks,
    pass: false,
    error: error.stack,
  });
}