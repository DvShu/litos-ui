import BaseComponent from "../../base_component";

export default class Button extends BaseComponent {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    this.loadStyle(shadow, ["button"]);
    // 创建一些 HTML 并应用到 shadow dom 中
    const wrapper = document.createElement("button");
    wrapper.setAttribute("class", "lt-btn");

    wrapper.innerHTML = "<slot></slot>";

    shadow.appendChild(wrapper);
  }
}
