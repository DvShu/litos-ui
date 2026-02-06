import CheckGroup from ".";
import { $one } from "ph-utils/dom";

export default class RadioGroup extends CheckGroup {
  public static baseName: string = "radio-group";

  constructor() {
    super();
    this.multiple = false;
  }

  public setValue(value: string): void {
    this.checkedValues = [value];
    super.setValue(value);
  }

  protected updatePartChild() {
    const $old = $one(`[value="${this.value}"]`, this);
    $old?.removeAttribute("checked");
  }
}
