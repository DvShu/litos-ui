import { formatClass } from "ph-utils/dom";
import FormInner from "../form/form_inner";
import { initAttr, parseAttrValue } from "../util";

export default class Switch extends FormInner {
  public static baseName = "switch";

  public actionRender?: (cfg: { checked: boolean }) => string | HTMLElement;
  public checkedText?: string;
  public uncheckedText?: string;

  constructor() {
    super(false);

    initAttr(this);
    const oriValue = this.value
      ? parseAttrValue(this.value, false, "value")
      : false;
    this._resetValue = oriValue;
    this.value = oriValue;
  }
  connectedCallback(): void {
    this.loadStyle(["switch"]);
    super.connectedCallback();
    this.pushValueChange();
  }
  render() {
    const $root = document.createElement("div");
    $root.className = formatClass({
      "l-switch": true,
      "l-switch--disabled": this.isDisabled(),
      "l-switch--checked": this.value,
    });
    const $children = ['<div class="l-switch-action">'];
    if (this.actionRender != null) {
      let $action = this.actionRender({ checked: this.value });
      if (typeof $action !== "string") {
        $action = $action.outerHTML;
      }
      $children.push($action);
    }
    $children.push("</div>");
    if (this.checkedText || this.uncheckedText) {
      const text = this.value
        ? this.checkedText || ""
        : this.uncheckedText || "";
      $children.push(`<span class="l-switch-text">${text}</span>`);
    }
    $root.innerHTML = $children.join("");
    return $root;
  }
}
