import {
  Form,
  FormItem,
  Input,
  MdInput,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  InputNumber,
  Switch,
  SelectOri,
  ColorPicker,
  DatePickerOri,
  regist,
} from "../src/components/index.ts";

window.restores = [];
window.inputEvents = [];
const observe = (Type) =>
  class extends Type {
    serializeFormState() {
      const state = super.serializeFormState();
      this.savedState = state;
      return state;
    }
    formStateRestoreCallback(state, mode) {
      window.restores.push({ id: this.id, state, mode });
      super.formStateRestoreCallback(state, mode);
    }
  };
for (const Type of [
  Input,
  MdInput,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  InputNumber,
  Switch,
  SelectOri,
  ColorPicker,
  DatePickerOri,
])
  customElements.define(`l-${Type.baseName}`, observe(Type));
regist([FormItem, Form]);
window.addEventListener("pageshow", (event) => {
  window.persisted = event.persisted;
});
document.addEventListener(
  "input",
  (event) => {
    window.inputEvents.push({ trusted: event.isTrusted, tag: event.composedPath()[0].tagName });
  },
  true,
);

for (const [prefix, section] of [
  ["custom", "contact"],
  ["material", "material"],
]) {
  for (const [field, token] of [
    ["first", "given-name"],
    ["last", "family-name"],
    ["email", "email"],
    ["address", "street-address"],
    ["zip", "postal-code"],
  ]) {
    const control = document.querySelector(`#${prefix}-${field}`);
    if (control) control.autocomplete = `section-${section} ${token}`;
  }
}

window.snapshot = () => ({
  restores: window.restores,
  inputEvents: window.inputEvents,
  persisted: window.persisted,
  navigation: performance.getEntriesByType("navigation")[0]?.type,
  values: Object.fromEntries(
    [
      ...document.querySelectorAll(
        "l-input,l-md-input,l-checkbox,l-checkbox-group,l-radio-group,l-input-number,l-switch,l-select-ori,l-color-picker,l-date-picker-ori",
      ),
    ]
      .filter((element) => element.id)
      .map((element) => [
        element.id,
        {
          value: element.value,
          checked: element.checked,
          savedState: element.savedState,
          ui: [...element.shadowRoot.querySelectorAll("input,select,textarea")].map((input) => ({
            value: input.value,
            checked: input.checked,
            type: input.type,
            autocomplete: input.autocomplete,
            autofilled: input.matches(":autofill"),
          })),
        },
      ]),
  ),
  nativeData: document.querySelector("#native")
    ? [...new FormData(document.querySelector("#native"))]
    : [],
  helperData: document.querySelector("l-form")?.getData(),
  helperNativeData: document.querySelector("l-form")
    ? [...new FormData(document.querySelector("l-form").nativeForm)]
    : [],
});
window.ready = true;