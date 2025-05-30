import CheckGroup from ".";
import { $one } from "ph-utils/dom";

export default class RadioGroup extends CheckGroup {
  public static baseName: string = "radio-group";

  afterInit(): void {
    super.afterInit();
    if (this.value) {
      const $check = $one(`l-radio[value="${this.value}"]`, this);
      if ($check) {
        $check.setAttribute("checked", "");
      }
    }
  }

  public valueChange(value: string): void {
    if (this.value) {
      // 清除上一个选中状态
      const $prev = $one(
        `l-radio[value="${this.value}"]`,
        this
      ) as HTMLInputElement;
      if ($prev) {
        $prev.removeAttribute("checked");
      }
    }
    this.value = value;
  }
}
