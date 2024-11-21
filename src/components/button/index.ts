import BaseComponent from "../base_component";

export default class Button extends BaseComponent {
  public static TagName = "lt-button";

  public type: "normal" | "primary" | string;

  constructor() {
    super();
    this.type = "normal";
  }

  connectedCallback(): void {
    this.loadStyle(["button"]);
    this.render();
  }

  public render() {
    // 创建一些 HTML 并应用到 shadow dom 中
    const wrapper = document.createElement("button");
    wrapper.setAttribute("class", "lt-btn");

    wrapper.innerHTML = "<slot></slot>";

    this.shadow.appendChild(wrapper);
  }
}
