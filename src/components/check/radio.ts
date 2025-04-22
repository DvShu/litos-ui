import Check from "./check";
import css from "./check.less?inline";
import { $one } from "ph-utils/dom";

export class Raido extends Check {
  constructor() {
    super();
    this.loadStyleText([css]);
  }

  public valueChange(value: string) {
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
