import BaseComponent from "../base";
import { unitNumberStr } from "../utils";
import css from "./index.less?inline";

type ColorState = {
  color?: string;
  size?: string;
};

export default class BaseIcon extends BaseComponent<ColorState> {
  public static baseName = "base-icon";
  public useLink: boolean;
  public viewBox: string;

  constructor() {
    super();
    this.useLink = false;
    this.viewBox = "0 0 1024 1024";
    this.version = 2;
    this._state = {};
  }

  static get observedAttributes(): string[] | null | undefined {
    return ["color", "size"];
  }

  protected attributeChanged(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case "color":
        this._state.color = newValue;
        break;
      case "size":
        this._state.size = unitNumberStr(newValue);
        break;
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._updateColor();
    this._updateSize();
  }

  protected updateDOM(changedProps: Set<string>): void {
    console.log("up");
    if (changedProps.has("color")) {
      this._updateColor();
    }
    if (changedProps.has("size")) {
      this._updateSize();
    }
  }

  private _updateSize() {
    if (this._state.size) {
      this.style.setProperty("--l-icon-size", this._state.size);
    } else {
      this.style.removeProperty("--l-icon-size");
    }
  }

  private _updateColor() {
    if (this._state.color) {
      this.style.setProperty("--l-icon-color", this._state.color);
    } else {
      this.style.removeProperty("--l-icon-color");
    }
  }

  render_v2(): { template?: string | HTMLElement | DocumentFragment; style?: string | string[] } {
    const $svg = this.createEl("svg");
    $svg.classList.add("l-icon");
    if (!this.useLink) {
      $svg.setAttribute("viewBox", this.viewBox);
    }
    const $children = this.renderChildren();
    if (typeof $children === "string") {
      if ($children === "") {
        // svg节点不适用于 slot
        const $children = this.children;
        const childrenStr: string[] = [];
        for (let i = 0, len = $children.length; i < len; i++) {
          const $child = $children[i];
          childrenStr.push($child.outerHTML);
        }
        $svg.innerHTML = childrenStr.join("");
      } else {
        $svg.innerHTML = $children;
      }
    } else {
      $svg.append($children);
    }
    return {
      template: $svg as any,
      style: css,
    };
  }

  renderChildren() {
    return "";
  }

  createEl(tagName: string) {
    return document.createElementNS("http://www.w3.org/2000/svg", tagName);
  }
}