import BaseComponent from "../base";
import {
  initAttr,
  getPopoverOffsetX,
  getPopoverOffsetY,
  impactDetect,
  useId,
} from "../utils";
import { set, remove } from "../utils/clickoutside";
import { $$, $one, on, off } from "ph-utils/dom";
//@ts-ignore
import css from "./index.less?inline";

type PlacementProp =
  | "top-start"
  | "top"
  | "top-end"
  | "bottom-start"
  | "bottom"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end";
type TriggerProp = "hover" | "click" | "focus";

export default class Popover extends BaseComponent {
  public static baseName = "popover";
  public placement: PlacementProp = "top";
  public content?: string;
  public showArrow = true;
  public trigger: TriggerProp = "hover";
  public disabled = false;
  public isShow = false;
  /** 宽度, 'trigger' 表示 popover 的宽度会和它的触发元素一致 */
  public width?: string | number;
  /** 隐藏时销毁 DOM 结构 */
  public destroyOnHide = false;
  /** 浮层偏移量 */
  public offset?: number;
  /** 浮层定位方式 */
  public position: "absolute" | "fixed" = "absolute";
  public theme: "default" | "tooltip" | "popconfirm" = "default";
  /**
   * @property inline = false
   */

  private _t?: number;
  constructor() {
    super();
    initAttr(this);
  }
  connectedCallback(): void {
    this.loadStyleText(css);
    this.#initAttr();
    super.connectedCallback();
    this.renderContent();
    this.#initEvents();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#removeEvents();
  }
  render() {
    // trigger
    const $trigger = document.createElement("slot");
    $trigger.setAttribute("name", "trigger");
    return $trigger;
  }

  renderContent() {
    if (!this.isShow) return;
    let $content = $one(".l-popover--content", this.root);
    if ($content) {
      $content.style.removeProperty("display");
      return;
    }
    // content
    $content = $$("div", {
      class: [
        "l-popover--content",
        `l-popover-${this.placement}`,
        this.theme === "default" ? undefined : `l-popover-${this.theme}`,
      ],
    });
    if (this.offset) {
      $content.style.cssText = "--l-popover-offset: ${this.offset}px;";
    }
    // @ts-ignore
    $content.part = "content";
    $content.innerHTML = this.contentHTML();

    if (this.showArrow) {
      const $arrow = $$("div", {
        class: "l-popover--arrow",
      });
      $content.appendChild($arrow);
    }
    if (this.trigger === "hover") {
      on($content, "mouseenter", this.#handleMouseEnter);
      on($content, "mouseleave", this.#hanldeMouseLeave);
    }
    this.root.appendChild($content);
  }

  protected contentHTML() {
    return this.content ? `<span>${this.content}</span>` : "<slot></slot>";
  }

  #initAttr() {
    const inline = this.getAttr("inline", false);
    this.style.display = inline ? "inline-block" : "block";
    if (!this.id) {
      this.id = `${useId()}-popover`;
    }
  }

  hideContent() {
    const $content = $one(".l-popover--content", this.root);
    if ($content) {
      if (this.destroyOnHide) {
        if (this.trigger === "hover") {
          off($content, "mouseenter", this.#handleMouseEnter);
          off($content, "mouseleave", this.#hanldeMouseLeave);
        }
        this.root.removeChild($content);
      } else {
        $content.style.display = "none";
      }
    }
  }

  #initEvents() {
    const $trigger = $one('[slot="trigger"]', this);
    if ($trigger) {
      if (this.trigger === "hover") {
        on($trigger, "mouseenter", this.#handleMouseEnter);
        on($trigger, "mouseleave", this.#hanldeMouseLeave);
      } else if (this.trigger === "click" || this.trigger === "focus") {
        on($trigger, "click", this.#handleClick);
        set($trigger, this.#handleTriggerOutside);
      }
    }
  }

  #removeEvents() {
    const $trigger = $one('[slot="trigger"]', this);
    if ($trigger) {
      if (this.trigger === "hover") {
        off($trigger, "mouseenter", this.#handleMouseEnter);
        off($trigger, "mouseleave", this.#hanldeMouseLeave);
      } else if (this.trigger === "click" || this.trigger === "focus") {
        off($trigger, "click", this.#handleClick);
        remove($trigger);
      }
    }
  }

  #handleTriggerOutside = (e: Event) => {
    const targetId = (e.target as HTMLElement).id;
    if (targetId !== this.id) {
      this.hide();
    }
  };

  #handleMouseEnter = (e: Event) => {
    this.show(e.target as HTMLElement);
  };

  #hanldeMouseLeave = () => {
    this.hide();
  };

  #handleClick = (e: Event) => {
    if (this.trigger === "click") {
      this.toggle(e.target as HTMLElement);
    } else if (this.trigger === "focus") {
      this.show(e.target as HTMLElement);
    }
  };

  show($referece?: HTMLElement) {
    if (this.disabled) return;
    if (this.isShow) {
      this.#clearHide();
      return;
    }
    this.isShow = true;
    this.renderContent();
    this.#updatePosition($referece);
  }

  hide() {
    this._t = setTimeout(() => {
      this.isShow = false;
      this.hideContent();
    }, 50) as unknown as any;
  }

  toggle($referece?: HTMLElement) {
    if (this.isShow) {
      this.hide();
    } else {
      this.show($referece);
    }
  }

  #clearHide() {
    if (this._t) {
      clearTimeout(this._t);
      this._t = undefined;
    }
  }

  #updatePosition($referece?: HTMLElement) {
    // 获取水平和垂直方向的位置
    let mainPos = "bottom";
    let crossPos = "";
    const poss = this.placement.split("-");
    if (poss != null) {
      mainPos = poss[0];
      crossPos = poss[1] || "";
    }
    let width: number | undefined = undefined;
    if ($referece == null) {
      $referece = $one('[slot="trigger"]', this) as HTMLElement;
    }
    const $content = $one(".l-popover--content", this.root);
    if ($content) {
      let popoverRect = $content.getBoundingClientRect();
      const targetRect = $referece.getBoundingClientRect();

      // 获取滚动容器
      let container = document.documentElement;
      // 滚动条水平方向滚动距离
      const scrollLeft = container.scrollLeft;
      // 滚动条垂直方向滚动距离
      const scrollTop = container.scrollTop;

      if (this.width != null) {
        if (this.width === "trigger") {
          width = targetRect.width;
        } else {
          width = this.width as number;
        }
      }
      if (width != null) {
        popoverRect.width = width;
      }
      // 获取水平、垂直方向弹窗坐标点偏移
      const yOffset = getPopoverOffsetY(
        targetRect,
        popoverRect,
        mainPos,
        crossPos,
        this.offset
      );
      const xOffset = getPopoverOffsetX(
        targetRect,
        popoverRect,
        mainPos,
        crossPos,
        this.offset
      );
      // 碰撞检测
      const impactRes = impactDetect(
        targetRect,
        popoverRect,
        mainPos,
        crossPos,
        scrollLeft,
        scrollTop,
        xOffset,
        yOffset,
        this.offset
      );
      mainPos = impactRes.mainAlign;
      crossPos = impactRes.crossAlign;

      if (width != null) {
        $content.style.setProperty("width", `${width}px`);
      }
      const placement = `l-popover-${mainPos}${crossPos === "" ? "" : "-" + crossPos}`;
      const classList = $content.className.split(" ");
      if (classList[1] !== placement) {
        classList[1] = `${placement}`;
        $content.className = classList.join(" ");
      }
    }
  }
}
