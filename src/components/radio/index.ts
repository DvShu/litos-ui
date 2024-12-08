import BaseComponent from "../base";
import { initAttr, tagAttr } from "../util";
import FormInner from "../form/form_inner";
import { add, remove } from "../form/form_events";
import { formatClass, $one } from "ph-utils/dom";

type RadioItem = {
  value: string;
  label: string;
  part?: string;
};

export default class Radio extends FormInner {
  public static baseName = "radio";
  public type?: "button";
  public label?: string;
  public checked = false;

  set items(items: RadioItem[]) {
    console.log(items);
  }

  constructor() {
    super(false);
    initAttr(this);
  }
  connectedCallback(): void {
    super.connectedCallback();
    this.loadStyle(["radio"]);
  }
  render() {
    const childrens = [];
    const $label = $one('[slot="label"]');
    if ($label != null || this.label) {
      if ($label) {
        childrens.push(this._renderItem("slot", undefined, this._isChecked()));
      } else {
        childrens.push(
          this._renderItem(this.label as string, undefined, this._isChecked())
        );
      }
    }
    console.log(childrens);
    this.root.innerHTML = childrens.join("");
  }

  private _renderItem(label: string | "slot", value?: string, checked = false) {
    const classStr = formatClass({
      "l-radio": true,
      "l-radio--disabled": this.isDisabled(),
      "l-radio--button": this.type === "button",
      "is-checked": checked,
    });
    const innerDisabled = tagAttr("disabled", this.isDisabled());
    const checkedAttr = tagAttr("checked", checked);
    const valueAttr = tagAttr("value", value);
    const nameAttr = tagAttr("name", this.name);
    const innerAttr = `${nameAttr}${valueAttr}${innerDisabled}${checkedAttr}`;
    const htmlStr = [
      `<label class="${classStr}">`,
      `<input type="radio" class="l-radio__input"${innerAttr} />`,
    ];
    if (this.type !== "button") {
      htmlStr.push(`<span class="l-radio__inner"></span>`);
    }
    let labelStr = label === "slot" ? '<slot name="label"></slot>' : label;

    htmlStr.push(`<span class="l-radio__label">${labelStr}</span>`);
    return htmlStr.join("");
  }

  private _isChecked() {
    return this.checked;
  }
}
