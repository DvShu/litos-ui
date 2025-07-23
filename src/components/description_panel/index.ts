import BaseComponent from "../base";
//@ts-ignore
import css from "./index.less?inline";

export default class DescriptionPanel extends BaseComponent {
  public static baseName = "description-panel";

  /** 内容折叠后的高度, 默认: 100px */
  public collapseHeight: string = "100px";
  /** 字体大小, 默认: 12px */
  public fontSize: string = "12px";

  static get observedAttributes(): string[] | null | undefined {
    return ["collapse-height", "font-size"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    this[name as "collapseHeight"] = newValue;
    if (newValue !== this[name as "fontSize"]) {
      this[name as "fontSize"] = newValue;
    }
  }

  connectedCallback(): void {
    this.loadStyleText(css);
    super.connectedCallback();
  }
  render() {
    const children = [`<div class="content"><slot></slot></div>`];
    return children.join("");
  }
}
