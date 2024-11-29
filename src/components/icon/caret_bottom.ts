import BaseIcon from "./base";

export default class CaretBottom extends BaseIcon {
  public static baseName = "caret-bottom-icon";

  renderChildren() {
    return '<path fill="currentColor" d="m192 384 320 384 320-384z"></path>';
  }
}
