import BaseComponent from "../base";
import { initAttr } from "../util";
import FormInner from "../form/form_inner";
import { add, remove } from "../form/form_events";

export default class Radio extends FormInner {
  public static baseName = "radio";
  constructor() {
    super();
    initAttr(this);
  }
  connectedCallback(): void {
    super.connectedCallback();
    this.loadStyle(["radio"]);
  }
  render() {}
}
