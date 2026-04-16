import { $$, on, $one, off, $, iterate } from "ph-utils/dom";
import BaseComponent from "../base";
import { parseAttrValue } from "../utils";
import css from "./index.less?inline";
import type { MenuItem } from "./types";

type MenuState = {
  /** 水平/垂直菜单 */
  orientation?: "horizontal" | "vertical";
  /** 主题 */
  theme?: "light" | "dark";
  /** 是否手风琴模式, 只有一个子菜单展开 */
  accordion?: boolean;
};

export default class Menu extends BaseComponent<MenuState> {
  public static baseName = "menu";

  /** 当前选中的菜单项 key 数组, 用 , 分割 */
  selectedIndex = "";
  /** 水平/垂直菜单 */
  orientation: "horizontal" | "vertical" = "vertical";
  /** 主题 */
  theme: "light" | "dark" = "light";
  /** 是否手风琴模式, 只有一个子菜单展开 */
  accordion = false;
  private _items: MenuItem[];
  private _itemCache: WeakMap<HTMLElement, string>;
  private _menuEl?: HTMLElement;

  public constructor() {
    super();
    this._items = [];
    this.version = 2;
    this._itemCache = new WeakMap();
  }

  static get observedAttributes() {
    return ["selected-index", "orientation", "accordion"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (name === "accordion") {
      const actualValue = parseAttrValue(newValue, false, "accordion");
      if (actualValue !== this.accordion) {
        this.accordion = actualValue;
      }
    }
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
    this.classList.add("l-menu", `l-menu--${this.orientation}`, `l-menu-${this.theme}`);
    on(this, "click", this.#handleClick);
    this.updateSelectedKeys(this.selectedIndex);
    this._menuEl = $one(".l-menu", this.root) as HTMLElement;
  }

  beforeDestroy(): void {
    off(this, "click", this.#handleClick);
    this._menuEl = undefined;
    this._itemCache = undefined as any;
  }

  render_v2(): { template?: string | HTMLElement | DocumentFragment; style?: string | string[] } {
    return {
      style: css,
      template: $$("div", { class: "l-menu" }),
    };
  }

  #handleClick = (e: Event) => {
    const { type, key, keyPaths, target } = this.#nodeKeys(e.target as HTMLElement);
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

  #nodeKeys(target: HTMLElement, iterateItem?: (item: HTMLElement, key: string) => void) {
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

  set items(menuItems: MenuItem[]) {
    this._items = menuItems;
    const a = this.buildPathMap(menuItems);
    console.log(a);
    if (this._menuEl) {
      this._menuEl.replaceChildren(this._renderItems());
    }
  }

  get items() {
    return this._items;
  }

  private _renderItems() {
    const fragment = document.createDocumentFragment();
    for (let i = 0, len = this._items.length; i < len; i++) {
      fragment.appendChild(this._renderItem(this._items[i]));
    }
    return fragment;
  }

  private _renderItem(item: MenuItem): HTMLElement {
    if (item.children && item.children.length > 0) {
      return this._renderSubMenu(item);
    }
    return this._renderMenuItem(item);
  }

  private _renderMenuItem(item: MenuItem): HTMLElement {
    const el = $$("l-menu-item", {
      index: item.key,
    });
    if (item.icon) {
      const $itemIcon = item.icon(item);
      $itemIcon.setAttribute("slot", "icon");
      el.appendChild($itemIcon);
    }
    el.appendChild(this._renderTitle(item));
    return el;
  }

  private _renderSubMenu(item: MenuItem): HTMLElement {
    const el = $$("l-sub-menu", {
      index: item.key,
    });
    // 图标
    if (item.icon) {
      const $icon = item.icon(item);
      $icon.setAttribute("slot", "icon");
      el.appendChild($icon);
    }
    const $label = this._renderTitle(item);
    $label.setAttribute("slot", "title");
    el.appendChild($label);
    // 子菜单容器
    if (item.children) {
      for (let i = 0, len = item.children.length; i < len; i++) {
        el.appendChild(this._renderItem(item.children![i]));
      }
    }
    return el;
  }

  private _renderTitle(item: MenuItem) {
    let $label: HTMLElement;
    if (typeof item.label === "string") {
      $label = $$("span", {
        textContent: item.label,
      });
    } else {
      $label = item.label(item);
    }
    return $label;
  }

  /** 构建所有的路径path */
  private buildPathMap = (items: MenuItem[]): Map<string, string[]> => {
    const pathMap = new Map<string, string[]>();
    const dfs = (nodes: MenuItem[], parentPath: string[]) => {
      for (const node of nodes) {
        const currentPath = [...parentPath, node.key];
        pathMap.set(node.key, currentPath);
        if (node.children) dfs(node.children, currentPath);
      }
    };
    dfs(items, []);
    return pathMap;
  };
}