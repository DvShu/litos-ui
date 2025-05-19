import BaseComponent from "../base";
import css from "./index.less?inline";
import {
  getAttr,
  $$,
  $one,
  iterate,
  $,
  on,
  off,
  shouldEventNext,
} from "ph-utils/dom";
import { parseAttrValue } from "../utils";

export default class Carousel extends BaseComponent {
  public static baseName = "carousel";
  /** 是否显示箭头 */
  public arrows: "hover" | "alwasy" | "never" = "hover";
  public currentIndex = 0;
  allIndex = 0;
  loop = false;

  static get observedAttributes() {
    return ["arrows", "loop", "initial-index"];
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
      case "loop":
        this.loop = parseAttrValue(newValue, false, "loop");
        break;
      case "initial-index":
        this.currentIndex = parseAttrValue(newValue, 0, "initial-index");
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
      if (i === this.currentIndex) {
        child.style.setProperty("transform", `translateX(0) scale(1)`);
        child.classList.add("active");
      }
    }
    this.allIndex = len - 1;
    super.connectedCallback();
  }

  afterInit(): void {
    this.setAttribute("data-page", "__stop__");
    this.renderArrows(); // 调用 renderArrows 方法来渲染箭头
    on(this.root, "click", this.#handleNavigate); // 为容器添加点击事件监听器 (事件代理)
  }

  beforeDestroy(): void {
    off(this, "mouseenter", this.#handleContainerMouseEnter);
    off(this, "mouseleave", this.#handleContainerMouseLeave);
    off(this.root, "click", this.#handleNavigate); // 移除容器的点击事件监听器 (事件代理)
  }

  render() {
    const fragment = document.createDocumentFragment();
    const $container = $$("div", { class: "container" });
    $container.appendChild($$("slot"));
    fragment.appendChild($container);
    return fragment;
  }

  renderArrows() {
    if (this.rendered) {
      // 切换按钮
      if (this.arrows !== "never") {
        this.renderNavigationButton("prev"); // 渲染上一个按钮
        this.renderNavigationButton("next"); // 渲染下一个按钮
        if (this.arrows === "hover") {
          on(this, "mouseenter", this.#handleContainerMouseEnter);
          on(this, "mouseleave", this.#handleContainerMouseLeave);
        }
      } else {
        off(this, "mouseenter", this.#handleContainerMouseEnter);
        off(this, "mouseleave", this.#handleContainerMouseLeave);
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
        "aria-label": dir,
        "data-page": dir,
      }) as HTMLButtonElement;
      this.root.appendChild($nav);
    }
    if (this.arrows === "alwasy") {
      $nav.style.display = "flex";
    } else {
      $nav.style.display = "none";
    }
  }

  #handleNavigate = (e: Event) => {
    const $target = e.target as HTMLButtonElement;
    const [isNext, page] = shouldEventNext(e, "data-page", this.root);
    if (isNext) {
      let nextIndex = this.currentIndex;
      let dir: "prev" | "next" = "prev";
      if (page === "prev") {
        dir = "prev";
        if (this.currentIndex === 0) {
          if (this.loop) {
            nextIndex = this.allIndex;
          }
        } else {
          nextIndex = this.currentIndex - 1;
        }
      } else if (page === "next") {
        dir = "next";
        if (this.currentIndex === this.allIndex) {
          if (this.loop) {
            nextIndex = 0;
          }
        } else {
          nextIndex = this.currentIndex + 1;
        }
      }
      if (nextIndex !== this.currentIndex) {
        this.#itemNavigate(this.currentIndex, nextIndex, dir); // 调用 #navigateAnimate 方法来执行动画
        this.currentIndex = nextIndex;
      }
    }
  };

  #itemNavigate(
    start: number,
    end: number,
    direction: "prev" | "next" | "nav"
  ) {
    const children = this.children;
    const len = children.length;
    if (direction !== "nav") {
      if (direction === "next") {
        this.#itemNavigateAnimate(
          children[start] as HTMLElement,
          [
            { transform: "translateX(0%) scale(1)" },
            { transform: "translateX(-100%) scale(1)" },
          ],
          false
        );
        this.#itemNavigateAnimate(
          children[end] as HTMLElement,
          [
            {
              transform: "translateX(100%) scale(1)",
            },
            { transform: "translateX(0%) scale(1)" },
          ],
          true
        );
      } else {
        this.#itemNavigateAnimate(
          children[end] as HTMLElement,
          [
            { transform: "translateX(-100%) scale(1)" },
            { transform: "translateX(0%) scale(1)" },
          ],
          true
        );
        this.#itemNavigateAnimate(
          children[start] as HTMLElement,
          [
            { transform: "translateX(0%) scale(1)" },
            { transform: "translateX(100%) scale(1)" },
          ],
          false
        );
      }
    } else {
      const duration = Math.max(200, Math.ceil(350 / (end - start + 1)));
      const startIndex = Math.min(start, end);
      const endIndex = Math.max(start, end);
      console.log(startIndex, endIndex);
      for (let i = 0; i < len; i++) {
        if (i < startIndex) continue;
        if (i > endIndex) break;
        if (direction !== "nav" && (i !== start || i !== end)) break;
        const child = children[i] as HTMLElement;
        child.style.display = "block";
        let diff1 = 0;
        let diff2 = 0;
        if (direction === "nav") {
          if (end === 0) {
            diff1 = 1;
            diff2 = 0;
          } else {
            diff1 = i - start;
            diff2 = i - end;
          }
        }
      }
    }
  }

  #itemNavigateAnimate(
    elem: HTMLElement,
    frames: any[],
    isEnd: boolean,
    duration = 300
  ) {
    elem.style.display = "block";
    const animate = elem.animate(frames, {
      duration,
      fill: isEnd ? "forwards" : "none",
    });
    animate.addEventListener(
      "finish",
      () => {
        if (isEnd) {
          elem.classList.add("active");
        } else {
          elem.classList.remove("active");
        }
        elem.style.removeProperty("display");
      },
      { once: true }
    );
  }

  #handleContainerMouseEnter = () => {
    if (this.arrows === "hover") {
      // 动画形式显示切换按钮
      const $navs = $(".nav-button", this.root) as HTMLButtonElement[];
      iterate($navs, (nav) => {
        nav.style.display = "flex";
        this.#navigateElemAnim(nav, true); // 调用 #navigateElemAnim 方法来显示按钮
      });
    }
  };

  #handleContainerMouseLeave = () => {
    if (this.arrows === "hover") {
      const $navs = $(".nav-button", this.root) as HTMLButtonElement[];
      iterate($navs, (nav) => {
        this.#navigateElemAnim(nav, false); // 调用 #navigateElemAnim 方法来隐藏按钮
      });
    }
  };

  #navigateElemAnim(elem: HTMLElement, show = true) {
    const dir = elem.getAttribute("data-page");
    const offset = dir === "prev" ? -10 : 10;
    const anims = [];
    if (show) {
      anims.push(
        { opacity: 0, transform: `translate3d(${offset}px, -50%, 0)` },
        { opacity: 1, transform: `translate3d(0px, -50%, 0)` }
      );
    } else {
      anims.push(
        { opacity: 1, transform: `translate3d(0px, -50%, 0)` },
        { opacity: 0, transform: `translate3d(${offset}px, -50%, 0)` }
      );
    }
    const anim = elem.animate(anims, {
      duration: 300,
      fill: "both",
    });
    if (!show) {
      anim.addEventListener(
        "finish",
        () => {
          elem.style.display = "none";
        },
        { once: true }
      );
    }
  }
}
