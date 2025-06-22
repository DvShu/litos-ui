import { isBlank, isNumeric } from "ph-utils";
import BaseComponent from "../base";
import { initAttr, parseAttrValue } from "../utils";
import {
  $,
  iterate,
  $one,
  create,
  on,
  off,
  isVisible,
  removeClass,
  addClass,
  formatStyle,
  formatClass,
  shouldEventNext,
  $$,
} from "ph-utils/dom";
//@ts-ignore
import css from "./index.less?inline";

type TabbarItem = {
  name: string;
  text?: string | (() => string | HTMLElement);
  icon?: string | (() => string | HTMLElement);
};

export default class Tabbar extends BaseComponent {
  public static baseName = "tabbar";
  /**
   * 标签类型:
   *  1. nav - 每一项等分排列, 类似于移动端底部的标签栏
   *  2. bar - 选项卡
   *  3. card - 卡片
   */
  public type: "nav" | "bar" | "card" = "nav";
  public name?: string;
  public gap?: string;
  private $line?: HTMLElement;
  constructor() {
    super();
    initAttr(this);
  }
  connectedCallback(): void {
    this.loadStyleText(css);
    addClass(this, `l-tabbar--${this.type}`);
    if (!isBlank(this.gap) && !(this.gap as string).startsWith("0")) {
      addClass(this, `l-tabbar-gap`);
    }
    super.connectedCallback();
    this._init();
  }

  static get observedAttributes(): string[] | null | undefined {
    return ["name", "type", "justify-content", "gap"];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ): void {
    if (name === "name") {
      const value = parseAttrValue(newValue, undefined);
      this.name = value;
      this._updateActive();
      this._updateLine();
    } else if (name === "type") {
      const value = parseAttrValue(newValue, "nav") as any;
      if (value !== this.type) {
        removeClass(this, `l-tabbar--${this.type}`);
        this.type = value;
        removeClass(this, `l-tabbar--${value}`);
        if (value === "card") {
          let $border = $one(".l-tabbar-card-border", this.root);
          if (!$border) {
            $border = create("div", { class: "l-tabbar-card-border" });
            this.root.appendChild($border);
          }
        }
      }
    } else {
      const value = parseAttrValue(newValue, undefined);
      this[name as "gap"] = value;
      const $wrapper = $one(".l-tabbar-wrapper", this.root);
      // if ($wrapper) {
      //   $wrapper.style.cssText = this.#getWrapperStyle();
      // }
      // if (name === "gap") {
      //   if (!isBlank(this.gap) && !(this.gap as string).startsWith("0")) {
      //     addClass(this, `l-tabbar-gap`);
      //   } else {
      //     removeClass(this, `l-tabbar-gap`);
      //   }
      // }
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._destroy();
  }
  render() {
    const $root = document.createDocumentFragment();
    this.#setStyle();
    $root.appendChild($$("slot"));
    if (this.type === "card") {
      // card border
      const $border = create("div", { class: "l-tabbar-card-border" });
      $root.appendChild($border);
    }
    return $root as any;
  }

  /**
   * 设置选项卡栏的项目列表。
   * @param items - 选项卡栏项目的数组。
   * 该方法首先清空选项卡栏的包装器元素，然后根据传入的项目数组创建并追加新的选项卡项目。
   */
  public setItems(items: TabbarItem[]) {
    const $wrapper = $one(".l-tabbar-wrapper", this.root);
    if ($wrapper) {
      $wrapper.innerHTML = "";
      $wrapper.appendChild(this.#createItems(items));
    }
  }

  /**
   * 向标签栏添加项目。
   * @param items 要添加的标签栏项目数组。
   * @returns 无返回值。
   */
  public addItems(items: TabbarItem[]) {
    const $wrapper = $one(".l-tabbar-wrapper", this.root);
    if ($wrapper) {
      $wrapper.appendChild(this.#createItems(items));
    }
  }

  private _init() {
    on(this.root, "click", this._handleClick);
    // 避免在初始，样式未加载就获取位置
    setTimeout(() => {
      this._updateLine();
    }, 300);
  }

  private _destroy() {
    off(this.root, "click", this._handleClick);
    this.$line = undefined;
  }

  private _handleClick = (e: Event) => {
    const [shouldNext, name] = shouldEventNext(e, "l-name", this.root);
    if (shouldNext && name !== this.name) {
      this.name = name as string;
      this.dispatchEvent(
        new CustomEvent("change", {
          detail: {
            name,
          },
        })
      );
      this._updateActive();
      this._updateLine();
    }
  };

  private _updateActive() {
    const custom = this.getAttr("custom-content", false);
    const ctx = custom ? this : this.root;
    const $active = $one(".active", ctx);
    if ($active) {
      removeClass($active, "active");
    }
    const $target = $one(`[l-name="${this.name}"]`, ctx);
    if ($target) {
      addClass($target, "active");
    }
  }
  /**
   * 初始化线条的方法，在微任务队列中执行。
   * 该方法用于设置或更新标签栏中的线条位置或样式。
   */
  private _updateLine() {
    queueMicrotask(() => {
      if (!this.name || this.type === "nav" || !this.rendered) return;
      const custom = this.getAttr("custom-content", false);
      const $curr = $one(".active", custom ? this : this.root) as HTMLElement;
      if (!$curr) return;
      const offsetLeft = $curr.offsetLeft;
      if (!this.$line) {
        // 初始化线条
        const $tmpLine = create("div", { class: "l-tabbar--bar-line" });
        // @ts-ignore
        $tmpLine.part = "line";
        this.root.appendChild($tmpLine);
        this.$line = $one(".l-tabbar--bar-line", this.root) as HTMLElement;
      }
      this.$line.style.cssText = `width:${$curr.offsetWidth}px;left:${offsetLeft}px`;
      if (!isVisible($curr, this)) {
        this.scrollTo({
          left: offsetLeft,
          behavior: "smooth",
        });
      }
    });
  }

  #setStyle() {
    const justify = this.getAttr("justify-content");
    if (!isBlank(justify)) {
      this.style.setProperty("justify-content", justify);
    }
    if (!isBlank(this.gap)) {
      let gap = this.gap as string;
      if (isNumeric(gap, { isPositive: true })) {
        gap = `${gap}px`;
      }
      this.style.setProperty("--l-tabbar-item-gap", gap);
    }
  }

  #createItems(items: TabbarItem[]) {
    const fragment = document.createDocumentFragment();
    for (let i = 0, len = items.length; i < len; i++) {
      const item = items[i];
      const $item = create("div", {
        class: formatClass([
          "l-tabbar-item",
          this.name === item.name ? "active" : undefined,
        ]),
        "l-name": item.name,
        part: "item",
      });
      const iconRender = item.icon;
      if (iconRender) {
        const $iconWraper = create("div", { class: "l-tabbar-item-icon" });
        let iconRendered =
          typeof iconRender === "string" ? iconRender : iconRender();
        if (typeof iconRendered === "string") {
          $iconWraper.innerHTML = iconRendered;
        } else {
          $iconWraper.appendChild(iconRendered);
        }
        $item.appendChild($iconWraper);
      }
      const textRender = item.text;
      if (textRender) {
        let textRendered =
          typeof textRender === "string" ? textRender : textRender();
        if (typeof textRendered === "string") {
          $item.appendChild(create(textRendered));
        } else {
          $item.appendChild(textRendered);
        }
      }
      fragment.appendChild($item);
    }
    return fragment;
  }
}
