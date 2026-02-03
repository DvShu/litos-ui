import Check from "./check";
//@ts-ignore
import css from "./check.less?inline";
//@ts-ignore
import radio_css from "./radio.less?inline";

export default class Raido extends Check {
  static baseName = "radio";

  connectedCallback(): void {
    this.loadStyleText([css, radio_css]);
    super.connectedCallback();
  }

  _doChangeAction(): void {
    this.setAttribute("checked", "checked");
    this.emitChange();
  }
}
