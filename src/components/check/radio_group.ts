import CheckGroup from ".";

export default class RadioGroup extends CheckGroup {
  public static baseName: string = "radio-group";

  constructor() {
    super();
    this.multiple = false;
  }
}
