import Check from "./check";
import css from "./check.less?inline";
import checkbox_css from "./checkbox.less?inline";
import { $one } from "ph-utils/dom";

export default class Checkbox extends Check {
  static baseName = "checkbox";

  constructor() {
    super();
    this._inputType = "checkbox";
  }

  connectedCallback(): void {
    this.loadStyleText([css, checkbox_css]);
    super.connectedCallback();
    console.log(this.value);
  }

  _checkedChange(): void {
    const $input = $one("input", this.root) as HTMLInputElement;
    if ($input.checked) {
      $input.checked = false;
      this.removeAttribute("checked");
    } else {
      $input.checked = true;
      this.setAttribute("checked", "");
    }
    this.emit("change", {
      detail: {
        value: this.value,
        name: this.getName(),
        checked: this.checked,
      },
      composed: true,
    });
  }
}
