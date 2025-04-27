import Check from "./check";
import css from "./check.less?inline";
import checkbox_css from "./check.less?inline";

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

  _checkedChange(): void {}
}
