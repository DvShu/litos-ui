import BaseComponent from "../base";
import { formatClass } from "../util";

export default class Button extends BaseComponent {
  public static tagName = "button";

  constructor() {
    super();
  }

  connectedCallback(): void {
    this.loadStyle(["button"]);
    this.render();
  }

  public render() {
    // 创建一些 HTML 并应用到 shadow dom 中
    const type = this.getAttr("type", "normal");
    const $btn = document.createElement("button");
    // class
    const classes = [
      "l-btn",
      `l-btn-${type}`,
      this.getAttr("block", false) ? "l-btn-block" : "",
      this.getAttr("round", false) ? "l-btn-round" : "",
      this.getAttr("circle", false) ? "l-btn-circle" : "",
      this.getAttr("ghost", false) ? "l-btn-ghost" : "",
      this.getAttr("text", false) ? "l-btn-text" : "",
      this.getAttr("loading", false) ? "l-btn-loading" : "",
    ];
    $btn.className = formatClass(classes);
    $btn.disabled =
      this.getAttr("disabled", false) || this.getAttr("loading", false);
    $btn.type = this.getAttr("html-type", "button") as "button";

    $btn.innerHTML = "<slot></slot>";

    this.shadow.appendChild($btn);
  }
}
