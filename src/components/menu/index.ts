import { $$, on, $one, off, $, iterate } from "ph-utils/dom";
import BaseComponent from "../base";
import { parseAttrValue } from "../utils";
import css from "./index.less?inline";
import type { MenuItem } from "./types";

const DEFAULT_ORIENTATION = "vertical";
const DEFAULT_THEME = "light";
const TRANSITION_FALLBACK_MS = 350;

type MenuState = {
  /** 水平/垂直菜单 */
  orientation?: "horizontal" | "vertical";
  /** 主题 */
  theme?: "light" | "dark";
  /** 是否手风琴模式, 只有一个子菜单展开 */
  accordion?: boolean;
  /** 当前选中的菜单项 key 数组, 用 , 分割 */
  selectedIndex: string;
};

export default class Menu extends BaseComponent<MenuState> {
  public static baseName = "menu";

  /** 是否手风琴模式, 只有一个子菜单展开 */
  accordion = false;
  private _items: MenuItem[];
  private _menuEl?: HTMLElement;
  private _activeKeys: Set<string>;
  #rafIds: Map<string, number>;
  #transitionMeta: Map<string, { expand: boolean }>;
  #transitionTimers: Map<string, number>;

  public constructor() {
    super();
    this._items = [];
    this._activeKeys = new Set();
    this.#transitionTimers = new Map();
    this.#rafIds = new Map();
    this.#transitionMeta = new Map();
    this.version = 2;
    this._state = {
      orientation: DEFAULT_ORIENTATION,
      selectedIndex: "",
      theme: DEFAULT_THEME,
    };
  }

  static get observedAttributes() {
    return ["selected-index", "orientation", "accordion", "theme"];
  }

  protected attributeChanged(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case "selected-index":
        this._state.selectedIndex = newValue || "";
        if (this.rendered) {
          this.updateSelectedKeys(this._state.selectedIndex);
        }
        break;
      case "orientation":
        this._state.orientation = (newValue as MenuState["orientation"]) || DEFAULT_ORIENTATION;
        this.#syncVariantClasses();
        if (this.rendered && this._state.orientation === "horizontal") {
          this.#resetSubmenuTransitionState();
        }
        break;
      case "theme":
        this._state.theme = (newValue as MenuState["theme"]) || DEFAULT_THEME;
        this.#syncVariantClasses();
        break;
      case "accordion":
        this._state.accordion = parseAttrValue(newValue, false, "accordion");
        break;
    }
  }

  afterInit(): void {
    this.#syncVariantClasses();
    on(this.root, "click", this._handleClick);
    on(this.root, "transitionend", this._onTransitionEnd as any);
    this._menuEl = $one(".l-menu", this.root) as HTMLElement;
  }

  beforeDestroy(): void {
    off(this.root, "click", this._handleClick);
    off(this.root, "transitionend", this._onTransitionEnd as any);
    this.#transitionTimers.forEach((t) => clearTimeout(t));
    this.#transitionTimers.clear();
    this.#rafIds.forEach((id) => cancelAnimationFrame(id));
    this.#rafIds.clear();
    this.#transitionMeta.clear();
    this._menuEl = undefined;
  }

  render_v2(): { template?: string | HTMLElement | DocumentFragment; style?: string | string[] } {
    return {
      style: css,
      template: $$("div", { class: "l-menu" }),
    };
  }

  _handleClick = (e: Event) => {
    const { type, key, keyPaths, target } = this.#nodeKeys(e.target as HTMLElement);
    if (target) {
      if (type === 2) {
        const isExpanded = target.hasAttribute("expanded");
        this._toggleSubMenu(target, !isExpanded);
        if (!isExpanded && this.accordion) {
          this.expandSubmenus(keyPaths, true);
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
      if (!target) break;
      const dataKey = target.getAttribute("index");
      if (dataKey) {
        if (!key) key = dataKey;
        keyPaths.unshift(dataKey);
        if (iterateItem) {
          iterateItem(target, dataKey);
        }
      }
      if (type === 0) {
        const menuRole = target.getAttribute("menu-role");
        if (menuRole) {
          type = Number(menuRole);
          currentTarget = target;
        }
      }
      target = target.parentElement as HTMLElement;
    } while (type >= 0);
    return { type, key, keyPaths, target: currentTarget };
  }

  /**
   * 展开与提供的 keys 对应的子菜单。
   *
   * 遍历当前组件内所有子菜单，如果子菜单的 key 在提供的 keys 中，
   * 则展开该子菜单；如果 collapseOther 为 true，则折叠不在 keys 中的子菜单。
   *
   * @param keys - 表示要展开的子菜单的 key 的字符串数组。
   * @param collapseOther - 可选参数，默认为 false。是否折叠其他子菜单。
   */
  expandSubmenus(keys: string[], collapseOther = false) {
    const $submenus = $(".l-menu-submenu[index]", this.root) as HTMLElement[];
    const keySet = new Set(keys);
    iterate($submenus, ($submenu) => {
      const keyValue = $submenu.getAttribute("index") || "";
      if (keySet.has(keyValue)) {
        this._toggleSubMenu($submenu, true);
      } else if (collapseOther) {
        this._toggleSubMenu($submenu, false);
      }
    });
  }

  updateSelectedKeys(key: string) {
    this._state.selectedIndex = key;
    const $item = key ? ($one(`.l-menu-item[index="${key}"]`, this.root) as HTMLElement) : null;
    if ($item) {
      const a = this.#nodeKeys($item, (item) => {
        item.classList.add("active");
        if (item.getAttribute("menu-role") === "2") {
          this._toggleSubMenu(item, true);
        }
      });
      this.#unselect(a.keyPaths);
    } else {
      this.#unselect([]);
    }
  }

  #unselect(activePath: string[]) {
    const $items = $(".l-menu [index].active", this.root) as HTMLElement[];
    const activeSet = new Set(activePath);
    iterate($items, ($item) => {
      const key = $item.getAttribute("index") || "";
      if (!activeSet.has(key)) {
        this.#nodeKeys($item, (item, key) => {
          if (!activeSet.has(key)) {
            item.classList.remove("active"); // 取消激活菜单项
          }
        });
      }
    });
  }

  private _toggleSubMenu($submenu: HTMLElement, expand: boolean) {
    const key = $submenu.getAttribute("index") || "";
    const $content = $one(".l-menu", $submenu) as HTMLElement;
    if (!$content) return;

    const isCurrentlyExpanded = $submenu.hasAttribute("expanded");
    if (expand === isCurrentlyExpanded) return;

    if (this._state.orientation === "horizontal") {
      this.#cancelAnimation(key);
      this.#transitionMeta.set(key, { expand });
      if (expand) {
        $submenu.setAttribute("expanded", "");
        $submenu.classList.remove("collapsed");
        $content.classList.remove("l-menu--collapsed");
      } else {
        $submenu.removeAttribute("expanded");
        $submenu.classList.add("collapsed");
        $content.classList.add("l-menu--collapsed");
      }
      this.#transitionMeta.delete(key);
      return;
    }

    // 清理旧的 timer 和 rAF
    this.#cancelAnimation(key);

    this.#transitionMeta.set(key, { expand });

    if (expand) {
      $submenu.setAttribute("expanded", "");
      $submenu.classList.remove("collapsed");
      $content.classList.add("l-menu--hide");
      $content.classList.remove("l-menu--collapsed");
      $content.style.removeProperty("height");
      const rafId = requestAnimationFrame(() => {
        this.#rafIds.delete(key);
        const rect = $content.getBoundingClientRect();
        $content.style.height = "0";
        $content.classList.remove("l-menu--hide");
        requestAnimationFrame(() => {
          if ($submenu.hasAttribute("expanded")) {
            $content.style.height = `${rect.height}px`;
          }
        });
      });
      this.#rafIds.set(key, rafId);
    } else {
      $submenu.removeAttribute("expanded");
      const rect = $content.getBoundingClientRect();
      $content.style.height = `${rect.height}px`;
      $submenu.classList.add("collapsed");
      const rafId = requestAnimationFrame(() => {
        this.#rafIds.delete(key);
        if (!$submenu.hasAttribute("expanded")) {
          $content.style.height = "0";
        }
      });
      this.#rafIds.set(key, rafId);
    }

    // 兜底定时器，防止 transitionend 未触发
    this.#transitionTimers.set(
      key,
      window.setTimeout(() => {
        this.#transitionTimers.delete(key);
        this._onTransitionEnd({
          target: $content,
          propertyName: "height",
        } as unknown as TransitionEvent);
      }, TRANSITION_FALLBACK_MS),
    );
  }

  #cancelAnimation(key: string) {
    const oldTimer = this.#transitionTimers.get(key);
    if (oldTimer) {
      clearTimeout(oldTimer);
      this.#transitionTimers.delete(key);
    }
    const oldRaf = this.#rafIds.get(key);
    if (oldRaf) {
      cancelAnimationFrame(oldRaf);
      this.#rafIds.delete(key);
    }
  }

  private _onTransitionEnd = (e: TransitionEvent) => {
    if (e.propertyName !== "height") return;
    const target = e.target as HTMLElement;
    if (!target.classList.contains("l-menu")) return;
    const $submenu = target.closest(".l-menu-submenu") as HTMLElement;
    if (!$submenu) return;
    const key = $submenu.getAttribute("index") || "";
    const timer = this.#transitionTimers.get(key);
    if (timer) {
      clearTimeout(timer);
      this.#transitionTimers.delete(key);
    }
    const meta = this.#transitionMeta.get(key);
    if (meta && meta.expand !== $submenu.hasAttribute("expanded")) {
      this.#transitionMeta.delete(key);
      return;
    }
    this.#transitionMeta.delete(key);
    target.style.removeProperty("height");
    if (!$submenu.hasAttribute("expanded")) {
      target.classList.add("l-menu--collapsed");
    }
  };

  set items(menuItems: MenuItem[]) {
    this._items = menuItems;
    if (this._menuEl) {
      this._menuEl.replaceChildren(this._renderItems());
    }
  }

  get items() {
    return this._items;
  }

  private _renderItems() {
    if (this._state.selectedIndex) {
      this._activeKeys = new Set(this.#findPath(this._items, this._state.selectedIndex));
    } else {
      this._activeKeys = new Set();
    }
    const fragment = document.createDocumentFragment();
    for (let i = 0, len = this._items.length; i < len; i++) {
      fragment.appendChild(this._renderItem(this._items[i], 0));
    }
    return fragment;
  }

  private _renderItem(item: MenuItem, level = 0): HTMLElement {
    if (item.children && item.children.length > 0) {
      return this._renderSubMenu(item, level);
    }
    return this._renderMenuItem(item);
  }

  private _renderMenuItem(item: MenuItem): HTMLElement {
    const el = $$("div", {
      class: ["l-menu-item", this._activeKeys.has(item.key) ? "active" : ""],
      index: item.key,
      "menu-role": "1",
    });
    if (item.icon) {
      const $itemIcon = item.icon(item);
      $itemIcon.setAttribute("slot", "icon");

      const $iconWrapper = $$("span", { class: "l-menu-icon-wrap" });
      $iconWrapper.appendChild($itemIcon);
      el.appendChild($iconWrapper);
    }
    el.appendChild(this._renderTitle(item));
    return el;
  }

  private _renderSubMenu(item: MenuItem, level: number): HTMLElement {
    const isActive = this._activeKeys.has(item.key);
    const el = $$("div", {
      index: item.key,
      class: ["l-menu-submenu", isActive ? "active" : undefined],
      "menu-role": "2",
    });
    if (isActive) {
      el.setAttribute("expanded", "");
    }
    el.setAttribute("data-level", String(level));
    // title
    const $title = $$("div", { class: "l-submenu-title" });

    // icon
    if (item.icon) {
      const $icon = item.icon(item);
      const $iconWrapper = $$("span", { class: "l-menu-icon-wrap" });
      $iconWrapper.appendChild($icon);
      $title.appendChild($iconWrapper);
    }

    $title.appendChild(this._renderTitle(item));

    // arrow
    const $arrow = $$("l-arrow-right-icon", { class: "l-submenu-arrow-icon" });
    $title.appendChild($arrow);
    el.appendChild($title);
    if (item.children) {
      const $content = $$("div", {
        class: ["l-menu", !isActive ? "l-menu--collapsed" : undefined],
      });
      $content.style.setProperty("--l-menu-level", String(level + 1));
      for (let i = 0, len = item.children.length; i < len; i++) {
        $content.appendChild(this._renderItem(item.children![i], level + 1));
      }
      el.appendChild($content);
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

  #syncVariantClasses() {
    const orientation = this._state.orientation || this.getAttribute("orientation") || DEFAULT_ORIENTATION;
    const theme = this._state.theme || this.getAttribute("theme") || DEFAULT_THEME;

    this.classList.add("l-menu");
    this.classList.remove("l-menu--horizontal", "l-menu--vertical", "l-menu-light", "l-menu-dark");
    this.classList.add(`l-menu--${orientation}`, `l-menu-${theme}`);
  }

  #resetSubmenuTransitionState() {
    const $submenus = $(".l-menu-submenu[index]", this.root) as HTMLElement[];
    iterate($submenus, ($submenu) => {
      const key = $submenu.getAttribute("index") || "";
      this.#cancelAnimation(key);
      this.#transitionMeta.delete(key);
      const $content = $one(".l-menu", $submenu) as HTMLElement;
      if ($content) {
        $content.style.removeProperty("height");
        $content.classList.remove("l-menu--hide");
      }
    });
  }

  #findPath(items: MenuItem[], key: string): string[] {
    const dfs = (nodes: MenuItem[], parentPath: string[]): string[] => {
      for (const node of nodes) {
        const currentPath = [...parentPath, node.key];
        if (key === node.key) {
          return currentPath;
        }
        if (node.children) {
          const foundPath = dfs(node.children, currentPath);
          if (foundPath.length > 0) {
            return foundPath;
          }
        }
      }
      return [];
    };

    return dfs(items, []);
  }
}
