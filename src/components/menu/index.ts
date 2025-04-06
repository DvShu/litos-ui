import { $$, on } from "ph-utils/dom";
import BaseComponent from "../base";
import { initAttr } from "../utils";
// @ts-ignore
import css from "./index.less?inline";

export default class Menu extends BaseComponent {
  public static baseName = "menu";

  /** 当前选中的菜单项 key 数组, 用 , 分割 */
  selectedKeys = "";
  /** 水平/垂直菜单 */
  orientation: "horizontal" | "vertical" = "vertical";
  /** 主题 */
  theme: "light" | "dark" = "light";
  // eslint-disable-next-line
  #selectedKeys: Set<string> = new Set();

  connectedCallback(): void {
    initAttr(this);
    this.#selectedKeys = new Set(this.selectedKeys.split(","));
    this.className = `l-menu l-menu--${this.orientation} l-menu-${this.theme}`;
    this.loadStyleText(css);
    super.connectedCallback();
  }

  afterInit(): void {
    on(this, "click", (e) => {
      const { type, key, keyPaths, target } = this.#clickTarget(
        e.target as HTMLElement
      );
      console.log(target);
      if (type === 2) {
        // 展开/折叠菜单
        if (this.#selectedKeys.has(key)) {
          console.log("折叠菜单");
          // 折叠菜单
          this.#selectedKeys.delete(key);
        } else {
          console.log("展开菜单");
          // 展开菜单
          this.#selectedKeys.add(key);
        }
      }
      console.log(this.#clickTarget(e.target as HTMLElement));
    });
  }
  render() {
    return $$("slot");
  }

  #clickTarget(target: HTMLElement) {
    let type = 0;
    let key = "";
    let currentTarget;
    const keyPaths = [];
    do {
      const tagName = target.tagName;
      if (["L-MENU", "BODY"].includes(tagName)) {
        break;
      }
      const dataKey = target.getAttribute("key");
      if (dataKey) {
        if (!key) key = dataKey;
        keyPaths.unshift(dataKey);
      }
      if (type === 0) {
        if (tagName === "L-MENU-ITEM") {
          type = 1;
          currentTarget = target;
        } else if (tagName === "L-SUB-MENU") {
          currentTarget = target;
          type = 2;
        }
      }
      target = target.parentElement as HTMLElement;
    } while (type >= 0);
    return { type, key, keyPaths, target: currentTarget };
  }
}
