import BaseComponent from "../base";
import { initAttr } from "../utils";
//@ts-ignore
import css from "./index.less?inline";

export default class BaseIcon extends BaseComponent {
  public static baseName = "base-icon";
  public useLink = false;
  public viewBox = "0 0 1024 1024";

  connectedCallback() {
    initAttr(this);
    this.loadStyleText([css]);
    this.render();
    this.rendered = true;
  }

  render() {
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
    this.shadow.appendChild($svg);
  }

  renderChildren() {
    return "";
  }

  createEl(tagName: string) {
    return document.createElementNS("http://www.w3.org/2000/svg", tagName);
  }
}
