import BaseIcon from "./base";

export default class Plus extends BaseIcon {
  public static baseName = "plus-icon";

  renderChildren() {
    return '<path fill="currentColor" d="M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64z"></path>';
  }
}