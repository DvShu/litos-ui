import Check from "./check";
//@ts-ignore
import css from "./check.less?inline";
//@ts-ignore
import radio_css from "./radio.less?inline";
import { $one } from "ph-utils/dom";

export default class Raido extends Check {
  static baseName = "radio";

  connectedCallback(): void {
    this.loadStyleText([css, radio_css]);
    super.connectedCallback();
  }

  _doChangeAction(): void {
    const $input = $one("input", this.root) as HTMLInputElement;
    if (!$input.checked) {
      this.setAttribute("checked", "");
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
}
