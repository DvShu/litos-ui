import { $$, on, $one, off, $, iterate } from "ph-utils/dom";
import BaseComponent from "../base";
import { initAttr } from "../utils";
// @ts-ignore
import css from "./index.less?inline";

export default class Menu extends BaseComponent {
  public static baseName = "menu";

  /** 当前选中的菜单项 key 数组, 用 , 分割 */
  selectedIndex = "";
  /** 水平/垂直菜单 */
  orientation: "horizontal" | "vertical" = "vertical";
  /** 主题 */
  theme: "light" | "dark" = "light";
  /** 是否手风琴模式, 只有一个子菜单展开 */
  accordion = false;

  connectedCallback(): void {
    initAttr(this);
    this.classList.add(
      "l-menu",
      `l-menu--${this.orientation}`,
      `l-menu-${this.theme}`
    );
    this.loadStyleText(css);
    super.connectedCallback();
  }

  static get observedAttributes() {
    return ["selected-index", "orientation"];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ): void {
    if (!this.rendered) return;
    if (name === "selected-index") {
      if (this.selectedIndex !== newValue) {
        this.updateSelectedKeys(newValue);
      }
    } else if (name === "orientation") {
      const classes = this.classList;
      classes.remove(`l-menu--${oldValue}`);
      classes.add(`l-menu--${newValue}`);
    }
  }

  afterInit(): void {
    on(this, "click", this.#handleClick);
    this.updateSelectedKeys(this.selectedIndex);
  }

  beforeDestroy(): void {
    off(this, "click", this.#handleClick);
  }

  render() {
    return $$("slot");
  }

  #handleClick = (e: Event) => {
    const { type, key, keyPaths, target } = this.#nodeKeys(
      e.target as HTMLElement
    );
    if (target) {
      if (type === 2) {
        // 展开/折叠菜单
        if (target.hasAttribute("expanded")) {
          // 折叠菜单
          target.removeAttribute("expanded");
        } else {
          // 展开菜单
          target.setAttribute("expanded", "");
          if (this.accordion) {
            this.expandSubmenus(keyPaths, true);
          }
        }
      } else if (type === 1) {
        // 点击菜单, 激活菜单项
        this.#unselect(keyPaths);
        this.updateSelectedKeys(key);
        this.emit("select", { detail: { key, keyPaths } });
      }
    }
  };

  #nodeKeys(
    target: HTMLElement,
    iterateItem?: (item: HTMLElement, key: string) => void
  ) {
    let type = 0; // 标记当前节点类型 0: 菜单, 1: 菜单项, 2: 子菜单
    let key = "";
    let currentTarget;
    const keyPaths = [];
    do {
      const tagName = target.tagName;
      if (["L-MENU", "BODY"].includes(tagName)) {
        break;
      }
      const dataKey = target.getAttribute("index");
      if (dataKey) {
        if (!key) key = dataKey;
        keyPaths.unshift(dataKey);
        if (iterateItem) {
          iterateItem(target, dataKey);
        }
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

  /**
   * 展开与提供的 keys 对应的子菜单。
   *
   * 此方法会在当前上下文中选择所有带有 `l-sub-menu` 标签和 `key` 属性的元素，
   * 并对其进行迭代。如果子菜单的 `key` 属性与提供的 keys 中的任意一个匹配，
   * 则通过将其 `collapse` 属性设置为 "off" 来展开子菜单，并将该 key 添加到 `#selectedKeys` 集合中。
   *
   * @param keys - 表示要展开的子菜单的 key 的字符串数组。
   * @param collapseOther - 可选参数，默认为 false。是否折叠其他子菜单。
   */
  expandSubmenus(keys: string[], collapseOther = false) {
    const $submenus = $("l-sub-menu[index]", this) as HTMLElement[];
    iterate($submenus, ($submenu) => {
      const keyValue = $submenu.getAttribute("index") || "";
      if (keys.includes(keyValue)) {
        $submenu.setAttribute("expanded", "");
      } else if (collapseOther) {
        // 折叠其它子菜单
        $submenu.removeAttribute("expanded");
      }
    });
  }

  updateSelectedKeys(key: string) {
    this.selectedIndex = key;
    const $item = $one(`l-menu-item[index="${key}"]`, this) as HTMLElement;
    if ($item) {
      const a = this.#nodeKeys($item, (item) => {
        item.setAttribute("active", ""); // 激活菜单项
        item.setAttribute("expanded", ""); // 展开父菜单
      });
      this.#unselect(a.keyPaths); // 取消其它菜单项的激活状态
    }
  }

  #unselect(activePath: string[]) {
    const $items = $("l-menu-item[active]", this) as HTMLElement[];
    iterate($items, ($item) => {
      const key = $item.getAttribute("index") || "";
      if (!activePath.includes(key)) {
        this.#nodeKeys($item, (item, key) => {
          if (!activePath.includes(key)) {
            item.removeAttribute("expanded"); // 折叠菜单
            item.removeAttribute("active"); // 取消激活菜单项
          }
        });
      }
    });
  }
}
