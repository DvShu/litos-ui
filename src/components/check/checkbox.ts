import Check from "./check";
import css from "./check.less?inline";
import checkbox_css from "./checkbox.less?inline";

export default class Checkbox extends Check {
  static baseName = "checkbox";

  constructor() {
    super();
    this._inputType = "checkbox";
  }

  connectedCallback(): void {
    this.loadStyleText([css, checkbox_css]);
    super.connectedCallback();
  }

  _doChangeAction(): void {
    if (this.getChecked()) {
      this.removeAttribute("checked");
    } else {
      this.setAttribute("checked", "");
    }
    this.emit("change", {
      detail: {
        value: this.value,
        name: this.getName(),
        checked: this.getChecked(),
      },
      composed: true,
    });
  }
}
