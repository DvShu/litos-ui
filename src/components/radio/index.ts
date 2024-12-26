import { initAttr, parseAttrValue, tagAttr } from "../utils";
import FormInner from "../form/form_inner";
import {
  formatClass,
  $one,
  $,
  iterate,
  getAttr,
  on,
  off,
  hasClass,
  addClass,
  removeClass,
} from "ph-utils/dom";
import { random } from "ph-utils";

type RadioItem = {
  value: string;
  label: string;
  /** 允许通过 part 修改样式 */
  labelPart?: string;
};

export default class Radio extends FormInner {
  public static baseName = "radio";
  public type?: "button";
  public label?: string;
  public checked = false;
  private _changeEvent: CustomEvent;

  public setItems(items: RadioItem[]) {
    this._removeEvents();
    this.root.innerHTML = this._renderItems(items);
    this._initEvents();
  }

  constructor() {
    super(false);
    initAttr(this);
    this._changeEvent = new CustomEvent("change");
  }
  connectedCallback(): void {
    super.connectedCallback();
    this.loadStyle(["radio"]);
    this._initEvents();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._removeEvents();
  }

  protected attributeChange(
    name: string,
    oldValue: string,
    newValue: string
  ): void {
    if (name === "checked") {
      const value = parseAttrValue(newValue, false, name);
      this.checked = value;
      this.value = value;
      const $radio = $one(".l-radio", this.root);
      if ($radio) {
        if (!hasClass($radio, "is-checked")) {
          addClass($radio, "is-checked");
          const $inner = $one("input", $radio) as HTMLInputElement;
          if ($inner) {
            $inner.checked = true;
          }
        }
      }
    }
  }

  render() {
    if (!this.getName()) {
      this.name = `la${random(3)}_${random(6)}`;
    }
    const childrens = [];
    const $label = $one('[slot="label"]', this);
    const $default = $("[radio-value]", this);
    if ($label != null || this.label) {
      this.value = this._isChecked();
      if ($label) {
        childrens.push(
          this._renderItem("slot", undefined, this._isChecked(), "label")
        );
      } else {
        childrens.push(
          this._renderItem(
            this.label as string,
            undefined,
            this._isChecked(),
            "label"
          )
        );
      }
    } else if ($default.length > 0) {
      iterate($default, (el) => {
        const $labelNode = el.cloneNode(true) as HTMLElement;
        const value = getAttr(el, "radio-value");
        childrens.push(
          this._renderItem($labelNode.outerHTML, value, this.value === value)
        );
      });
      this.pushValueChange();
    }
    this.root.innerHTML = childrens.join("");
  }

  public setValue(value: any): void {
    super.setValue(value);
    let base = "";
    if (typeof value !== "boolean") {
      base = `[l-value="${value}"]`;
    }
    const $prev = $one(".is-checked", this.root);
    if ($prev) {
      removeClass($prev, "is-checked");
    }
    const $el = $one(`label${base}`, this.root);
    if ($el) {
      const $inner = $one("input", $el) as HTMLInputElement;
      if (typeof value === "boolean") {
        if (value) {
          addClass($el, "is-checked");
        } else {
          removeClass($el, "is-checked");
        }
        $inner.checked = value;
      } else {
        addClass($el, "is-checked");
        $inner.checked = true;
      }
    }
  }

  private _renderItems(items: RadioItem[]) {
    const $itemNodes = [];
    for (let i = 0, len = items.length; i < len; i++) {
      const item = items[i];
      $itemNodes.push(
        this._renderItem(
          item.label,
          item.value,
          this.value === item.value,
          item.labelPart
        )
      );
    }
    return $itemNodes.join("");
  }

  private _renderItem(
    label: string | "slot",
    value?: string,
    checked = false,
    labelPart: string | undefined = undefined
  ) {
    const classStr = formatClass({
      "l-radio": true,
      "l-radio--disabled": this.isDisabled(),
      "l-radio--button": this.type === "button",
      "is-checked": checked,
    });
    const innerDisabled = tagAttr("disabled", this.isDisabled());
    const checkedAttr = tagAttr("checked", checked);
    const valueAttr = tagAttr("value", value);
    const nameAttr = tagAttr("name", this.getName());
    const innerAttr = `${nameAttr}${valueAttr}${innerDisabled}${checkedAttr}`;
    const labelPartAttr = tagAttr("part", labelPart);
    const lValue = tagAttr("l-value", value);
    const htmlStr = [
      `<label class="${classStr}"${lValue}>`,
      `<input type="radio" class="l-radio__input"${innerAttr} />`,
    ];
    if (this.type !== "button") {
      htmlStr.push(`<span class="l-radio__inner"></span>`);
    }
    let labelStr = label === "slot" ? '<slot name="label"></slot>' : label;

    htmlStr.push(
      `<div class="l-radio__label"${labelPartAttr}>${labelStr}</div>`
    );
    htmlStr.push("</label>");
    return htmlStr.join("");
  }

  private _isChecked() {
    return this.checked;
  }

  private _initEvents() {
    iterate($("input", this.root), (el) => {
      on(el, "change", this._radioChange);
    });
  }

  private _removeEvents() {
    iterate($("input", this.root), (el) => {
      off(el, "change", this._radioChange);
    });
  }

  private _radioChange = (e: Event) => {
    const $target = e.target as HTMLInputElement;
    let $radio = $target.parentElement;
    while ($radio != null) {
      if (hasClass($radio, "l-radio")) {
        break;
      }
      $radio = $radio.parentElement;
    }
    // 移除之前的选中
    const $old = $one(".is-checked", this.root);
    if ($old) {
      removeClass($old, "is-checked");
    }
    // 设置新的选中
    this.value = $target.value;
    if ($radio) {
      addClass($radio, "is-checked");
    }
    this.dispatchEvent(this._changeEvent);
  };
}
