import BaseComponent from "../base";
//@ts-ignore
import css from "./item.less?inline";

export default class TabbarItem extends BaseComponent {
  public static baseName = "tabbar-item";
  public name!: string;
  public label?: string;

  static get observedAttributes(): string[] | null | undefined {
    return ["name", "label"];
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.loadStyleText(css);
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ): void {
    this[name as "name"] = newValue;
  }

  render() {
    return `<slot></slot><slot></slot>`;
  }
}
