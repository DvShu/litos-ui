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
import { debounce } from "ph-utils/web";
import { parseAttrValue } from "../utils";

export default class Carousel extends BaseComponent {
  public static baseName = "carousel";
  /** 是否显示箭头 */
  public arrows: "hover" | "alwasy" | "never" = "hover";
  public currentIndex = 0;
  allIndex = -1;
  loop = false;
  observer?: MutationObserver;

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
    this.style.setProperty(
      "--carousel-width",
      `${Math.floor(this.clientWidth)}px`
    );
    // 手动设置高度
    const height = getAttr(this, "height");
    if (height) {
      this.style.setProperty("height", `${height}px`);
    }
    this.#cloneLoopElem(); // 处理循环节点
    super.connectedCallback();
  }

  afterInit(): void {
    this.setAttribute("data-page", "__stop__");
    this.renderArrows(); // 调用 renderArrows 方法来渲染箭头
    on(this.root, "click", this.#handleNavigate); // 为容器添加点击事件监听器 (事件代理)
    this.#startObserver(); // 开始监听子元素的变化 (新增、删除、移动等)
  }

  beforeDestroy(): void {
    off(this, "mouseenter", this.#handleContainerMouseEnter);
    off(this, "mouseleave", this.#handleContainerMouseLeave);
    off(this.root, "click", this.#handleNavigate); // 移除容器的点击事件监听器 (事件代理)
    this.#stopObserver(true);
  }

  render() {
    const fragment = document.createDocumentFragment();
    const offset = Math.floor(this.currentIndex * this.clientWidth * -1);
    let containerStyle = `transform:translateX(${offset}px);`;
    if (this.allIndex > 0) {
      const containerWidth = Math.floor(this.clientWidth * (this.allIndex + 1));
      containerStyle += `min-width:${containerWidth}px;`;
    }
    const $container = $$("div", {
      class: "container",
      style: containerStyle,
    });
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

  #startObserver() {
    if (this.observer == null) {
      this.observer = new MutationObserver(this.#observerChange); // 创建 MutationObserver 实例
    }
    this.observer.observe(this, { childList: true }); // 开始监听子元素的变化 (新增、删除、移动等)
  }

  #stopObserver(destroy = false) {
    if (this.observer) {
      this.observer.disconnect(); // 停止监听子元素的变化
      if (destroy) {
        this.observer = undefined; // 清空 MutationObserver 实例的引用
      }
    }
  }

  #containerChange = debounce(() => {
    this.#stopObserver();
    const $cloneFirst = $one("#cloneFirst", this);
    if ($cloneFirst) {
      $cloneFirst.remove();
    }
    const $cloneLast = $one("#cloneLast", this);
    if ($cloneLast) {
      $cloneLast.remove();
    }
    this.#cloneLoopElem(); // 处理循环节点
    // 计算容器宽度
    const $container = $one(".container", this.root) as HTMLElement;
    if ($container) {
      if (this.allIndex > 0) {
        const containerWidth = Math.floor(
          this.clientWidth * (this.allIndex + 1)
        );
        $container.style.minWidth = `${containerWidth}px`;
      } else {
        $container.style.minWidth = "900%";
      }
      const offset = Math.floor(this.currentIndex * this.clientWidth * -1);
      $container.style.transform = `translateX(${offset}px)`;
    }
    this.#startObserver(); // 重新开始监听子元素的变化 (新增、删除、移动等)
  }, 300);

  #cloneLoopElem() {
    const children = this.children;
    const len = children.length;
    // 循环轮播时, 复制前后节点
    if (len > 0 && this.loop) {
      this.currentIndex++;
      const $firstClone = children[0].cloneNode(true) as HTMLElement;
      $firstClone.id = "cloneFirst";
      const $lastClone = children[len - 1].cloneNode(true) as HTMLElement;
      $lastClone.id = "cloneLast";
      this.children[len - 1].insertAdjacentElement("afterend", $firstClone);
      this.children[0].insertAdjacentElement("beforebegin", $lastClone);
    }
    this.allIndex = this.children.length - 1;
  }

  #observerChange: MutationCallback = (mutations: MutationRecord[]) => {
    for (const mutation of mutations) {
      if (mutation.type === "childList") {
        this.#containerChange();
      }
    }
  };

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
