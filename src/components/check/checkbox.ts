import Check from "./check";
import css from "./check.less?inline";
import checkbox_css from "./checkbox.less?inline";

export default class Checkbox extends Check {
  static baseName = "checkbox";

  constructor() {
    super();
    this.checked = true;
    this._inputType = "checkbox";
  }

  connectedCallback(): void {
    this.loadStyleText([css, checkbox_css]);
    super.connectedCallback();
  }

  _checkedChange(): void {}
}
