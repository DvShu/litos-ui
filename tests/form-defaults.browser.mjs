import {
  Select,
  SelectOri,
  Switch,
  ColorPicker,
  DatePicker,
  DatePickerOri,
  InputNumber,
  MdInput,
  Checkbox,
  CheckboxGroup,
  Radio,
  regist,
} from "../src/components/index.ts";

const checks = [];
const check = (name, pass) => checks.push({ name, pass: !!pass });
const equal = (left, right) => JSON.stringify(left) === JSON.stringify(right);
try {
  regist([Select, SelectOri, Switch, ColorPicker, DatePicker, DatePickerOri, InputNumber, MdInput]);
  const form = document.querySelector("#form");
  const create = (tag, attrs = {}) => {
    const element = document.createElement(tag);
    for (const [name, value] of Object.entries(attrs)) element.setAttribute(name, value);
    return element;
  };
  const multi = create("l-select", { multiple: "", value: "a,b", name: "multi" });
  multi.options = [
    { label: "A", value: "a" },
    { label: "B", value: "b" },
    { label: "C", value: "c" },
  ];
  form.append(multi);
  check("select-array-initial", equal(multi.value, ["a", "b"]));
  const snapshot = multi.defaultValue;
  snapshot.push("c");
  check("select-default-array-copy", equal(multi.defaultValue, ["a", "b"]));
  multi.value.push("c");
  check("select-live-array-not-default", equal(multi.defaultValue, ["a", "b"]));
  multi.reset();
  multi.defaultValue = ["b", "c"];
  check(
    "select-default-array-format-and-clean",
    multi.getAttribute("value") === "b,c" && equal(multi.value, ["b", "c"]),
  );
  multi.value = ["a"];
  multi.defaultValue = ["c"];
  check("select-dirty-default-keeps-live", equal(multi.value, ["a"]));
  multi.remove();
  form.append(multi);
  check("select-remount-keeps-dirty", equal(multi.value, ["a"]));
  form.reset();
  check("select-native-reset-latest-default", equal(multi.value, ["c"]));
  multi.removeAttribute("value");
  check("select-multiple-missing-default", equal(multi.value, []) && equal(multi.defaultValue, []));
  multi.setOptions([{ label: "Empty option", value: "" }, ...multi.options]);
  multi.setAttribute("value", "");
  check(
    "select-empty-value-attribute-still-means-no-selection",
    equal(multi.value, []) && !new FormData(form).has("multi"),
  );
  multi.defaultValue = [""];
  check(
    "select-default-empty-option-applies-to-a-clean-field",
    equal(multi.defaultValue, [""]) &&
      equal(multi.value, [""]) &&
      multi.selectedLabels[0] === "Empty option" &&
      equal(new FormData(form).getAll("multi"), [""]),
  );
  multi.value = ["a"];
  multi.defaultValue = [""];
  check("select-default-empty-option-preserves-live-edit", equal(multi.value, ["a"]));
  form.reset();
  check(
    "select-reset-restores-a-single-empty-option",
    equal(multi.value, [""]) && equal(new FormData(form).getAll("multi"), [""]),
  );
  multi.setAttribute("value", "");
  check(
    "select-rewriting-empty-value-attribute-replaces-empty-option-default",
    equal(multi.defaultValue, []) && equal(multi.value, []) && !new FormData(form).has("multi"),
  );
  multi.defaultValue = [""];
  multi.defaultValue = [];
  check(
    "select-empty-default-array-clears-the-empty-option-default",
    equal(multi.defaultValue, []) && equal(multi.value, []) && !new FormData(form).has("multi"),
  );
  multi.removeAttribute("value");
  multi.removeAttribute("multiple");
  check("select-mode-change-stays-clean", multi.value === "");
  multi.setAttribute("value", "a");
  check("select-mode-change-follows-attribute", multi.value === "a");

  const toggle = create("l-switch");
  form.append(toggle);
  check("switch-intrinsic-false", toggle.value === false && toggle.defaultValue === false);
  toggle.setAttribute("value", "");
  check("switch-empty-boolean-true", toggle.value === true && toggle.defaultValue === true);
  toggle.value = false;
  toggle.setAttribute("value", "true");
  check("switch-dirty-preserved", toggle.value === false);
  toggle.reset();
  check("switch-reset-typed-true", toggle.value === true);
  toggle.defaultValue = false;
  check(
    "switch-default-false-format",
    toggle.getAttribute("value") === "false" && toggle.value === false,
  );
  const preToggle = create("l-switch", { value: "true" });
  preToggle.value = false;
  form.append(preToggle);
  check("switch-preconnect-property-not-overwritten", preToggle.value === false);

  const native = create("l-select-ori");
  native.innerHTML =
    '<option value="a">A</option><option value="b" selected>B</option><option value="c">C</option>';
  form.append(native);
  check("select-ori-selected-default", native.value === "b" && native.defaultValue === "b");
  native.value = "c";
  check("select-ori-edit-does-not-change-default", native.defaultValue === "b");
  native.reset();
  check(
    "select-ori-independent-reset",
    native.value === "b" && native.shadowRoot.querySelector("select").value === "b",
  );
  native.setOptions([
    { value: "x", label: "X" },
    { value: "y", label: "Y", defaultSelected: true },
  ]);
  check("select-ori-options-clean-default", native.value === "y" && native.defaultValue === "y");
  native.value = "x";
  native.appendOptions([{ value: "z", label: "Z", defaultSelected: true }]);
  check("select-ori-options-dirty-preserved", native.value === "x" && native.defaultValue === "z");
  native.reset();
  check("select-ori-options-reset-defaultSelected", native.value === "z");
  native.remove();
  form.append(native);
  check(
    "select-ori-options-remount",
    native.value === "z" && native.shadowRoot.querySelector("select").value === "z",
  );
  native.value = "x";
  native.setAttribute("value", "y");
  native.reset();
  check("select-ori-host-default-precedes-option", native.value === "y");
  native.removeAttribute("value");
  check("select-ori-remove-host-default", native.value === "z");

  const color = create("l-color-picker");
  form.append(color);
  check("color-intrinsic-black", color.value === "#000000" && color.defaultValue === "#000000");
  color.value = "#123456";
  color.defaultValue = "#abcdef";
  check("color-dirty-keeps-live", color.value === "#123456");
  color.reset();
  check(
    "color-reset-updates-native",
    color.value === "#abcdef" && color.shadowRoot.querySelector("input").value === "#abcdef",
  );
  color.removeAttribute("value");
  check("color-remove-default-black", color.value === "#000000");

  const range = create("l-date-picker-ori", { range: "", value: "2026-01-01,2026-02-02" });
  form.append(range);
  check("date-range-string-default", range.defaultValue === "2026-01-01,2026-02-02");
  range.value = "2026-03-03,2026-04-04";
  range.defaultValue = "2026-05-05,2026-06-06";
  range.reset();
  check(
    "date-range-reset-both-endpoints",
    equal(
      [...range.shadowRoot.querySelectorAll("input")].map((input) => input.value),
      ["2026-05-05", "2026-06-06"],
    ),
  );
  range.setAttribute("allow-empty", "false");
  const first = range.shadowRoot.querySelector("input");
  first.value = "";
  first.dispatchEvent(new Event("change", { bubbles: true }));
  check("date-range-disallow-empty-uses-current-default-endpoint", first.value === "2026-05-05");

  for (const tag of ["l-date-picker", "l-md-input", "l-input-number"]) {
    const element = create(tag, { value: "12" });
    element.value = "34";
    form.append(element);
    check(`${tag}-preconnect-property-preserved`, element.value === "34");
    element.reset();
    element.setAttribute("value", "56");
    check(`${tag}-render-does-not-dirty`, String(element.value) === "56");
    element.remove();
    form.append(element);
    element.setAttribute("value", "78");
    check(`${tag}-remount-does-not-dirty`, String(element.value) === "78");
  }
  regist([Checkbox, CheckboxGroup, Radio]);
  const nativeCheck = document.createElement("input");
  nativeCheck.type = "checkbox";
  const checkBox = create("l-checkbox", { name: "check" });
  form.append(nativeCheck, checkBox);
  const sameCheck = (name) =>
    check(
      name,
      nativeCheck.checked === checkBox.checked &&
        nativeCheck.defaultChecked === checkBox.defaultChecked,
    );
  nativeCheck.checked = true;
  checkBox.checked = true;
  form.reset();
  sameCheck("check-first-property-not-default");
  nativeCheck.defaultChecked = true;
  checkBox.defaultChecked = true;
  sameCheck("check-clean-default-follows");
  nativeCheck.checked = false;
  checkBox.checked = false;
  nativeCheck.setAttribute("checked", "false");
  checkBox.setAttribute("checked", "false");
  sameCheck("check-dirty-boolean-attribute");
  nativeCheck.indeterminate = true;
  checkBox.setAttribute("indeterminate", "");
  form.reset();
  sameCheck("check-native-reset-checked");
  check(
    "check-reset-retains-indeterminate",
    nativeCheck.indeterminate === checkBox.$input.indeterminate,
  );
  nativeCheck.removeAttribute("checked");
  checkBox.removeAttribute("checked");
  sameCheck("check-reset-clears-dirty-checked");
  check("check-default-token-on", checkBox.value === "on");
  const group = create("l-checkbox-group", { name: "checks", multiple: "", value: "a" });
  group.innerHTML = '<l-checkbox value="a"></l-checkbox><l-checkbox value="b"></l-checkbox>';
  form.append(group);
  group.value = "b";
  group.defaultValue = "a&b";
  check("group-dirty-default-keeps-selection", group.value === "b");
  form.reset();
  check(
    "group-default-reset-selection",
    group.value === "a&b" &&
      Array.from(group.querySelectorAll("l-checkbox")).every((child) => child.checked),
  );
  group.removeAttribute("value");
  check(
    "group-clean-default-removal",
    group.value === "" &&
      Array.from(group.querySelectorAll("l-checkbox")).every((child) => !child.checked),
  );
  range.remove();

  const material = create("l-md-input", { name: "material", "html-type": "password" });
  form.append(material);
  const editor = () => material.shadowRoot.querySelector("input");
  material.autocomplete = "current-password";
  check(
    "md-autocomplete-property-configures-editor",
    material.getAttribute("autocomplete") === "current-password" &&
      editor().autocomplete === "current-password",
  );
  material.setAttribute("autocomplete", "off");
  check(
    "md-autocomplete-attribute-configures-property",
    material.autocomplete === "off" && editor().autocomplete === "off",
  );
  material.removeAttribute("autocomplete");
  check(
    "md-autocomplete-removal",
    material.autocomplete === "" && !editor().hasAttribute("autocomplete"),
  );
  material.value = "current secret";
  material.formStateRestoreCallback(JSON.stringify({ version: 1, value: "old secret" }), "restore");
  check(
    "md-password-rejects-history-state",
    material.value === "current secret" && editor().value === "current secret",
  );
  material.formStateRestoreCallback("filled secret", "autocomplete");
  check(
    "md-password-accepts-autocomplete-text",
    material.value === "filled secret" && new FormData(form).get("material") === "filled secret",
  );
  material.htmlType = "text";
  check(
    "md-type-property-dynamically-reflects",
    material.getAttribute("html-type") === "text" && editor().type === "text",
  );
  material.setAttribute("html-type", "password");
  check(
    "md-type-attribute-dynamically-updates",
    material.htmlType === "password" && editor().type === "password",
  );
  material.autocomplete = "new-password";
  material.remove();
  form.append(material);
  check(
    "md-autocomplete-and-type-survive-remount",
    editor().autocomplete === "new-password" && editor().type === "password",
  );
  material.remove();
  const lateMaterial = create("test-autocomplete-md-input", {
    autocomplete: "off",
    "html-type": "text",
  });
  lateMaterial.autocomplete = "current-password";
  lateMaterial.htmlType = "password";
  form.append(lateMaterial);
  customElements.define("test-autocomplete-md-input", class extends MdInput {});
  const lateEditor = lateMaterial.shadowRoot.querySelector("input");
  check(
    "md-configuration-before-upgrade-wins",
    lateMaterial.autocomplete === "current-password" &&
      lateEditor.autocomplete === "current-password" &&
      lateEditor.type === "password" &&
      !Object.hasOwn(lateMaterial, "autocomplete") &&
      !Object.hasOwn(lateMaterial, "htmlType"),
  );
  lateMaterial.remove();
  document.querySelector("#result").textContent = JSON.stringify({
    userAgent: navigator.userAgent,
    checks,
    pass: checks.every((item) => item.pass),
  });
} catch (error) {
  document.querySelector("#result").textContent = JSON.stringify({
    pass: false,
    error: String(error),
    stack: error.stack,
    checks,
  });
}