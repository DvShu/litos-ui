import BaseIcon from "./base";

export default class CaretTop extends BaseIcon {
  public static baseName = "caret-top-icon";

  renderChildren() {
    return '<path fill="currentColor" d="M512 320 192 704h639.936z"></path>';
  }
}
