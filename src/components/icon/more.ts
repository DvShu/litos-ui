import BaseIcon from "./base";

export default class Moon extends BaseIcon {
  public static baseName = "more-icon";

  constructor() {
    super();
    this.viewBox = "0 0 1024 1024";
  }

  renderChildren() {
    return '<path d="M176 416a112 112 0 1 1 0 224 112 112 0 0 1 0-224m336 0a112 112 0 1 1 0 224 112 112 0 0 1 0-224m336 0a112 112 0 1 1 0 224 112 112 0 0 1 0-224"></path>';
  }
}
