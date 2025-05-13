import CheckGroup from ".";
import { $, iterate } from "ph-utils/dom";

export default class CheckboxGroup extends CheckGroup {
  public static baseName: string = "checkbox-group";

  set value(value: string) {
    super.setValue(value);
    if (this.rendered) {
      this.updateChangedStatus();
    }
  }

  get value() {
    return this._value;
  }

  afterInit(): void {
    super.afterInit();
    this.updateChangedStatus();
  }

  protected updateChangedStatus() {
    if (this.value) {
      const values = this.value.split("&") as string[];
      this.checkedValues.push(...values.map((v) => decodeURIComponent(v)));
    } else {
      this.checkedValues = [];
    }
    const $checkboxs = $("l-checkbox[value]", this) as HTMLInputElement[];
    iterate($checkboxs, ($checkbox) => {
      let value = $checkbox.value as string;
      if (!value) {
        value = $checkbox.getAttribute("value") as string;
      }
      if (value) {
        if (this.checkedValues.includes(value)) {
          $checkbox.setAttribute("checked", "");
        } else {
          // 移除checked属性
          $checkbox.removeAttribute("checked");
        }
      }
    });
  }

  public valueChange(value: string): void {
    let i = this.checkedValues.indexOf(value);
    if (i >= 0) {
      this.checkedValues.splice(i, 1);
    } else {
      this.checkedValues.push(value);
    }
    this.setValue(this.checkedValues.join("&"));
  }
}
