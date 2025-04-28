import CheckGroup from ".";
import { $one } from "ph-utils/dom";

export default class CheckboxGroup extends CheckGroup {
  public static baseName: string = "checkbox-group";

  afterInit(): void {
    super.afterInit();
    if (this.value) {
    }
  }

  public valueChange(value: string): void {}
}
