import CheckGroup from ".";

export default class CheckboxGroup extends CheckGroup {
  public static baseName: string = "checkbox-group";

  public setValue(value: string) {
    let i = this.checkedValues.indexOf(value);
    if (i >= 0) {
      this.checkedValues.splice(i, 1);
    } else {
      this.checkedValues.push(value);
    }
    super.setValue(this.checkedValues.join("&"));
  }
}
