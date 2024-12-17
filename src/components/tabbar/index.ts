import BaseComponent from "../base";
import { initAttr } from "../util";
import {
  $,
  iterate,
  $one,
  create,
  on,
  off,
  shouldEventNext,
  isVisible,
} from "ph-utils/dom";

type OptionItem = {
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
  private $line?: HTMLElement;
  constructor() {
    super();
    initAttr(this);
  }
  connectedCallback(): void {
    this.loadStyle(["tabbar"]);
    this.classList.add(`l-tabbar--${this.type}`);
    super.connectedCallback();
    this._init();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._destroy();
  }
  render() {
    const $items = $("[l-name]", this);
    const $root = document.createDocumentFragment();
    const $wrapper = document.createElement("div");
    $wrapper.className = "l-tabbar-wrapper";
    if ($items.length > 0) {
      iterate($items, ($item) => {
        const name = $item.getAttribute("l-name");
        if (name) {
          const $clone = $item.cloneNode(true) as HTMLElement;
          $clone.classList.add("l-tabbar-item");
          if (name === this.name) {
            $clone.classList.add("active");
          }
          const $icon = $one("[l-icon]", $clone);
          const $default = $(":not([l-icon])", $clone);
          if ($icon) {
            const $iconWrapper = create("div", {
              class: [
                "l-tabbar-item-icon",
                $default.length === 0 ? "only" : undefined,
              ],
            });
            $iconWrapper.appendChild($icon.cloneNode(true));
            $icon.replaceWith($iconWrapper);
          }
          $wrapper.appendChild($clone);
        }
      });
    }
    $root.appendChild($wrapper);

    return $root as any;
  }

  public setOptions(options: OptionItem[]) {}

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
    const [shouldNext, name, target] = shouldEventNext(e, "l-name");
    console.log(name);
    if (shouldNext && name !== this.name) {
      this.name = name as string;
      this.dispatchEvent(
        new CustomEvent("change", {
          detail: {
            name,
          },
        })
      );
      const $active = $one(".active", this.root);
      if ($active) {
        $active.classList.remove("active");
      }
      console.log(target);
      (target as HTMLElement).classList.add("active");
      this._updateLine();
    }
  };

  /**
   * 初始化线条的方法，在微任务队列中执行。
   * 该方法用于设置或更新标签栏中的线条位置或样式。
   */
  private _updateLine() {
    queueMicrotask(() => {
      if (!this.name || this.type === "nav") return;
      const $curr = $one(".active", this.root) as HTMLElement;
      const offsetLeft = $curr.offsetLeft;
      let isFirst = false;
      if (!this.$line) {
        // 初始化线条
        const $tmpLine = create("div", { class: "l-tabbar--bar-line" });
        $tmpLine.style.transition = "none";
        this.root.appendChild($tmpLine);
        this.$line = $one(".l-tabbar--bar-line", this.root) as HTMLElement;
        isFirst = true;
      }
      if (isFirst) {
        this.$line.style.width = `${$curr.offsetWidth}px`;
        this.$line.style.left = `${offsetLeft}px`;
        requestAnimationFrame(() => {
          (this.$line as HTMLElement).style.removeProperty("transition");
        });
      } else {
        this.$line.style.cssText = `width:${$curr.offsetWidth}px;left:${offsetLeft}px`;
      }
      if (!isVisible($curr, this)) {
        this.scrollTo({
          left: offsetLeft,
          behavior: "smooth",
        });
      }
    });
  }
}
