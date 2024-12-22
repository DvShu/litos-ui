import BaseIcon from "./base";

export default class ThemeDefault extends BaseIcon {
  public static baseName = "theme-default-icon";

  constructor() {
    super();
    this.viewBox = "0 0 24 24";
  }

  renderChildren() {
    return '<path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10m0-1.5v-17a8.5 8.5 0 0 1 0 17"/>';
  }
}
