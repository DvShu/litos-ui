import BaseIcon from "./base";

export default class Plus extends BaseIcon {
  public static baseName = "minus-icon";

  renderChildren() {
    return '<path fill="currentColor" d="M128 544h768a32 32 0 1 0 0-64H128a32 32 0 0 0 0 64"></path>';
  }
}