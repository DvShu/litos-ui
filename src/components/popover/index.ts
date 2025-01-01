import BaseComponent from "../base";
import { initAttr } from "../utils";

export default class Popover extends BaseComponent {
  public static baseName = "popover";
  constructor() {
    super();
    initAttr(this);
  }
  connectedCallback(): void {
    this.loadStyle(["popover"]);
    super.connectedCallback();
  }
  render() {
    const fragment = document.createDocumentFragment();
    const $trigger = document.createElement("slot");
    $trigger.setAttribute("name", "trigger");
    fragment.appendChild($trigger);
    return fragment;
  }
}
