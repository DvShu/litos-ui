import BaseIcon from "./base";

export default class MaskClose extends BaseIcon {
  public static baseName = "close-filled-icon";

  constructor() {
    super();
    this.viewBox = "0 0 24 24";
  }

  renderChildren() {
    return '<path fill="currentColor" d="M12 23a11 11 0 100-22 11 11 0 000 22zM8.82 7.4L12 10.6l3.18-3.19 1.42 1.42L13.4 12l3.19 3.18-1.42 1.42L12 13.4 8.82 16.6 7.4 15.18 10.6 12 7.4 8.82 8.82 7.4z"></path>';
  }
}
