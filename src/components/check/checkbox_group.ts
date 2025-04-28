import CheckGroup from ".";
import { $, iterate } from "ph-utils/dom";

export default class CheckboxGroup extends CheckGroup {
  public static baseName: string = "checkbox-group";

  afterInit(): void {
    super.afterInit();
    if (this.value) {
      const values = this.value.split("&") as string[];
      this.checkedValues.push(...values.map((v) => decodeURIComponent(v)));
      if (values.length > 0) {
        const $checkboxs = $("l-checkbox[value]", this) as HTMLInputElement[];
        iterate($checkboxs, ($checkbox) => {
          const v = $checkbox.getAttribute("value") as string;
          if (this.checkedValues.includes(v)) {
            $checkbox.setAttribute("checked", "");
          }
        });
      }
    }
  }

  public valueChange(value: string): void {
    let i = this.checkedValues.indexOf(value);
    if (i >= 0) {
      this.checkedValues.splice(i, 1);
    } else {
      this.checkedValues.push(value);
    }
    this.value = this.checkedValues.join("&");
  }
}
