import CheckGroup from ".";
import { $one } from "ph-utils/dom";

export default class RadioGroup extends CheckGroup {
  public static baseName: string = "radio-group";

  public attributeInitAfter(): void {
    if (this.value) {
      this.checkedValues.add(this.value);
    }
  }

  public valueChange(value: string): void {
    if (this.checkedValues.size > 0) {
      const oldValue = this.checkedValues.values().next().value;
      if (oldValue) {
        // 清除上一个选中状态
        const $prev = $one(
          `l-radio[value="${this.checkedValues}"]`,
          this
        ) as HTMLInputElement;
        if ($prev) {
          $prev.removeAttribute("checked");
        }
      }
    }
    this.checkedValues.clear();
    this.checkedValues.add(value);

    this.value = value;
  }
}
