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

  connectedCallback(): void {
    this.loadStyleText(css);
    addClass(this, `l-tabbar--${this.type}`);
    this.#setStyle();
    super.connectedCallback();
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
      this.#setStyle();
    }
  }

  render() {
    const $root = document.createDocumentFragment();

    $root.appendChild($$("slot"));
    if (this.type === "card") {
      // card border
      const $border = create("div", { class: "l-tabbar-card-border" });
      $root.appendChild($border);
    }
    return $root as any;
  }

  afterInit() {
    on(this.root, "click", this._handleClick);
    // 避免在初始，样式未加载就获取位置
    setTimeout(() => {
      this._updateLine();
    }, 300);
  }

  beforeDestroy() {
    off(this.root, "click", this._handleClick);
    this.$line = undefined;
  }

  private _handleClick = (e: Event) => {
    const [shouldNext, name] = shouldEventNext(e, "name", this);
    if (shouldNext && name !== this.name) {
      this.name = name as string;
      console.log(name);
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
    const $active = $one(".active", this);
    if ($active) {
      removeClass($active, "active");
    }
    const $target = $one(`[name="${this.name}"]`, this);
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
      const $curr = $one(".active", this) as HTMLElement;
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
    } else {
      this.style.removeProperty("justify-content");
    }
    if (!isBlank(this.gap)) {
      let gap = this.gap as string;
      if (isNumeric(gap, { isPositive: true })) {
        gap = `${gap}px`;
      }
      addClass(this, "l-tabbar-gap");
      this.style.setProperty("--l-tabbar-item-gap", gap);
    } else {
      this.style.removeProperty("--l-tabbar-item-gap");
      removeClass(this, "l-tabbar-gap");
    }
  }
}
