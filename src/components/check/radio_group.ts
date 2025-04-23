import CheckGroup from ".";
import { $one } from "ph-utils/dom";

export default class RadioGroup extends CheckGroup {
  public static baseName: string = "radio-group";

  public valueChange(value: string): void {
    // 清除上一个选中状态
    const $prev = $one(
      `l-radio[value="${this.value}"]`,
      this
    ) as HTMLInputElement;
    if ($prev) {
      $prev.removeAttribute("checked");
    }
    this.value = value;
  }
}
