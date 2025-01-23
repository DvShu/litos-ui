import BaseComponent from "../base";
//@ts-ignore
import css from "./dialog_container.css?inline";
export default class DialogContainer extends BaseComponent {
  public static baseName = "dialog-container";

  connectedCallback(): void {
    this.loadStyleText(css);
    super.connectedCallback();
  }
}
