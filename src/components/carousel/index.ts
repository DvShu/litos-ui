import BaseComponent from "../base";
import css from "./index.less?inline";
import { getAttr, $$, $one, iterate, $ } from "ph-utils/dom";
import { parseAttrValue } from "../utils";

export default class Carousel extends BaseComponent {
  public static baseName = "carousel";
  /** 是否显示箭头 */
  public arrows: "hover" | "alwasy" | "never" = "alwasy";
  public currentIndex = 0;

  static get observedAttributes() {
    return ["arrows"];
  }

  attributeChangedCallback(
    name: string,
    _oldValue: string,
    newValue: string
  ): void {
    switch (name) {
      case "arrows":
        const newArrows = parseAttrValue(newValue, "hover");
        if (newArrows !== this.arrows) {
          this.arrows = newArrows as "hover";
        }
        break;
    }
  }

  connectedCallback(): void {
    this.loadStyleText(css);
    const binding = this.getBoundingClientRect();
    this.style.setProperty("--carousel-width", `${binding.width}px`);
    // 手动设置高度
    const height = getAttr(this, "height");
    if (height) {
      this.style.setProperty("height", `${height}px`);
    }
    const children = this.children;
    const len = children.length;
    for (let i = 0; i < len; i++) {
      const child = children[i] as HTMLElement;
      child.style.setProperty("transform", `translateX(${i * 100}%) scale(1)`);
    }
    super.connectedCallback();
  }

  afterInit(): void {
    this.renderArrows(); // 调用 renderArrows 方法来渲染箭头
  }

  render() {
    const fragment = document.createDocumentFragment();
    // 总体
    const $container = $$("div", { class: "container" });
    $container.appendChild($$("slot"));
    fragment.appendChild($container);
    return fragment;
  }

  renderArrows() {
    if (this.rendered) {
      // 切换按钮
      if (this.arrows !== "never") {
        this.renderNavigationButton("prev"); // 渲染上一个按钮。
        this.renderNavigationButton("next"); // 渲染下一个按钮
      } else {
        const $buttons = $(".nav-button", this.root) as HTMLElement[];
        if ($buttons.length) {
          iterate($buttons, (button) => {
            button.remove();
          });
        }
      }
    }
  }

  renderNavigationButton(dir: "prev" | "next" = "prev") {
    let $nav = $one(`.nav-${dir}`, this.root) as HTMLButtonElement;
    if ($nav == null) {
      const ldir = dir === "prev" ? "left" : "right";
      $nav = $$("button", {
        class: `nav-button nav-${dir}`,
        type: "button",
        innerHTML: `<l-arrow-${ldir}-icon></l-arrow-${ldir}-icon>`,
      }) as HTMLButtonElement;
      this.root.appendChild($nav);
    }
    if (this.arrows === "alwasy") {
      $nav.style.display = "flex";
    } else {
      $nav.style.display = "none";
    }
  }
}
