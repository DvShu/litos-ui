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
import AutoPlayTimer from "./timer";
import type { AutoPlayTimerT } from "./timer";

export default class Carousel extends BaseComponent {
  public static baseName = "carousel";
  /** 是否显示箭头 */
  public arrows: "hover" | "always" | "never" = "hover";
  public currentIndex = 0;
  allIndex = -1;
  #tranlateX = 0; // 当前偏移量
  loop = true;
  observer?: MutationObserver;
  autoplay = false;
  #timer: AutoPlayTimerT = undefined as any;
  /* 手势 */
  #startX = 0;
  #isDragging = false;
  #startTime = 0;
  #movingT = 0;
  // 节点引用
  #container!: HTMLElement;

  static get observedAttributes() {
    return ["arrows", "loop", "current-index", "autoplay"];
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
          const fragment = document.createDocumentFragment();
          this.renderArrows(fragment); // 调用 renderArrows 方法来渲染箭头
          this.root.appendChild(fragment);
        }
        break;
      case "loop":
        this.loop = parseAttrValue(newValue, false, "loop");
        break;
      case "current-index":
        const newIndex = parseAttrValue(newValue, 0);
        if (newIndex !== this.currentIndex) {
          this.#toggleContent(this.loop ? newIndex + 1 : newIndex);
        }
        break;
      case "autoplay":
        const autoplay = parseAttrValue(newValue, false, "autoplay");
        if (autoplay !== this.autoplay) {
          this.autoplay = autoplay;
          if (this.#timer) {
            if (autoplay) {
              this.#timer.start();
            } else {
              this.#timer.stop();
            }
          }
        }
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
    on(this.root, "click", this.#handleNavigate); // 为容器添加点击事件监听器 (事件代理)
    this.#startObserver(); // 开始监听子元素的变化 (新增、删除、移动等)
    this.#timer = AutoPlayTimer(() => {
      this.#togglePage("next");
    });
    if (this.autoplay) {
      this.#timer.start();
    }
    // 监听手势事件
    this.#container = $one(".container", this.root) as HTMLElement;
    on(this.#container, "pointerdown", this.#handlePointerDown as any);
    on(this.#container, "pointerup", this.#handlePointerUp as any);
    on(this.#container, "pointermove", this.#handlePointerMove as any);
    on(this.#container, "pointercancel", this.#handlePointerCancel as any);
    on(this.#container, "pointerleave", this.#handlePointerCancel as any);
  }

  beforeDestroy(): void {
    off(this, "mouseenter", this.#handleContainerMouseEnter);
    off(this, "mouseleave", this.#handleContainerMouseLeave);
    off(this.root, "click", this.#handleNavigate); // 移除容器的点击事件监听器 (事件代理)
    // 移除事件监听
    off(this.#container, "pointerdown", this.#handlePointerDown as any);
    off(this.#container, "pointerup", this.#handlePointerUp as any);
    off(this.#container, "pointermove", this.#handlePointerMove as any);
    off(this.#container, "pointercancel", this.#handlePointerCancel as any);
    off(this.#container, "pointerleave", this.#handlePointerCancel as any);
    this.#container = undefined as any;
    this.#stopObserver(true);
    this.#timer.stop();
    this.#timer = undefined as any;
  }

  render() {
    const fragment = document.createDocumentFragment();
    let containerStyle = "";
    if (this.allIndex > 0) {
      const offsetIndex = this.loop ? this.currentIndex + 1 : this.currentIndex;
      const offset = Math.floor(offsetIndex * this.clientWidth * -1);
      containerStyle = `transform:translateX(${offset}px);`;
      const containerWidth = Math.floor(this.clientWidth * (this.allIndex + 3));
      containerStyle += `min-width:${containerWidth}px;`;
      this.#tranlateX = offset;
    }
    const $container = $$("div", {
      class: "container",
      style: containerStyle,
      "data-container": "1",
    });
    $container.appendChild($$("slot"));
    fragment.appendChild($container);
    this.renderArrows(fragment); // 调用 renderArrows 方法来渲染箭头
    // 渲染分页器
    const $pagination = $$("div", { class: "pagination", part: "pagination" });
    if (this.allIndex >= 0) {
      $pagination.replaceChildren(this.#buildBulletElements());
    }
    fragment.appendChild($pagination);
    return fragment;
  }

  renderArrows(fragment: DocumentFragment) {
    // 切换按钮
    if (this.arrows !== "never") {
      this.renderNavigationButton("prev", fragment); // 渲染上一个按钮
      this.renderNavigationButton("next", fragment); // 渲染下一个按钮
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

  #buildBulletElements() {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i <= this.allIndex; i++) {
      fragment.appendChild(
        $$("div", {
          class: ["bullet", i === this.currentIndex ? "active" : ""],
          "aria-label": `第 ${i + 1} 页`,
          "data-page": `${i}`,
          id: `bullet-${i}`,
        })
      );
    }
    return fragment;
  }

  renderNavigationButton(
    dir: "prev" | "next" = "prev",
    fragment: DocumentFragment
  ) {
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
      fragment.appendChild($nav);
    }
    if (this.arrows === "always") {
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
    if (this.#container) {
      if (this.allIndex > 0) {
        const containerWidth = Math.floor(
          this.clientWidth * (this.allIndex + 3)
        );
        this.#container.style.minWidth = `${containerWidth}px`;
      } else {
        this.#container.style.minWidth = "900%";
      }
      const offsetIndex = this.loop ? this.currentIndex + 1 : this.currentIndex;
      const offset = Math.floor(offsetIndex * this.clientWidth * -1);
      this.#container.style.transform = `translateX(${offset}px)`;
      this.#tranlateX = offset;
    }
    // 切换分页器
    const $pagination = $one(".pagination", this.root) as HTMLElement;
    if ($pagination) {
      $pagination.replaceChildren(this.#buildBulletElements());
    }
    this.#startObserver(); // 重新开始监听子元素的变化 (新增、删除、移动等)
  }, 300);

  #cloneLoopElem() {
    const children = this.children;
    const len = children.length;
    // 循环轮播时, 复制前后节点
    if (len > 0 && this.loop) {
      const $firstClone = children[0].cloneNode(true) as HTMLElement;
      $firstClone.id = "cloneFirst";
      const $lastClone = children[len - 1].cloneNode(true) as HTMLElement;
      $lastClone.id = "cloneLast";
      this.children[len - 1].insertAdjacentElement("afterend", $firstClone);
      this.children[0].insertAdjacentElement("beforebegin", $lastClone);
    }
    this.allIndex = this.children.length - (this.loop ? 3 : 1);
  }

  #observerChange: MutationCallback = (mutations: MutationRecord[]) => {
    for (const mutation of mutations) {
      if (mutation.type === "childList") {
        this.#stopObserver();
        this.#containerChange();
      }
    }
  };

  #handleNavigate = (e: Event) => {
    const [isNext, page] = shouldEventNext(e, "data-page", this.root);
    if (isNext) {
      this.#togglePage(page);
    }
  };

  #togglePage(page: string) {
    this.#timer.stop();
    const start = this.loop ? this.currentIndex + 1 : this.currentIndex;
    let nextIndex = start;
    if (page === "prev") {
      if (this.loop && this.currentIndex === 0) {
        nextIndex = 0;
      } else {
        nextIndex = start - 1;
      }
      if (nextIndex < 0) {
        nextIndex = 0;
      }
    } else if (page === "next") {
      if (this.loop && this.currentIndex === this.allIndex) {
        nextIndex = this.allIndex + 2;
      } else {
        nextIndex = start + 1;
      }
      if (!this.loop && nextIndex > this.allIndex) {
        nextIndex = this.allIndex;
      }
    } else {
      const pageNum = Number(page);
      if (pageNum !== this.currentIndex) {
        nextIndex = this.loop ? pageNum + 1 : pageNum;
      }
    }
    if (nextIndex !== start) {
      this.#toggleContent(nextIndex);
    }
    requestAnimationFrame(() => {
      this.#startTimer();
    });
  }

  #toggleContent(newIndex: number) {
    if (this.#container) {
      const offset = Math.floor(newIndex * this.clientWidth * -1);
      const oldTransform = this.#container.style.transform;
      const anim = this.#container.animate(
        [{ transform: oldTransform }, { transform: `translateX(${offset}px)` }],
        { duration: 300 }
      );
      anim.addEventListener(
        "finish",
        () => {
          let o = offset;
          if (this.loop && newIndex === this.allIndex + 2) {
            o = Math.floor(this.clientWidth * -1); // 计算偏移量
          } else if (this.loop && newIndex === 0) {
            o = Math.floor(this.clientWidth * (this.allIndex + 1) * -1); // 计算偏移量
          }
          this.#container.style.transform = `translateX(${o}px)`;
          this.#tranlateX = o;
        },
        { once: true }
      );
    }
    if (this.loop && this.allIndex > 0 && newIndex === this.allIndex + 2) {
      this.currentIndex = 0;
    } else if (this.loop && this.allIndex > 0 && newIndex === 0) {
      this.currentIndex = this.allIndex;
    } else {
      this.currentIndex = this.loop ? newIndex - 1 : newIndex;
    }
    // 切换分页器
    const $activePage = $one(".bullet.active", this.root); // 获取当前活动的分页器元素
    if ($activePage) {
      $activePage.classList.remove("active"); // 移除当前活动的分页器元素的 active 类
    }
    const $newActivePage = $one(`#bullet-${this.currentIndex}`, this.root); // 获取新的活动的分页器元素
    if ($newActivePage) {
      $newActivePage.classList.add("active"); // 添加新的活动的分页器元素的 active 类
    }
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

  #restoreTranslate = () => {
    const $container = $one(".container", this.root) as HTMLElement;
    $container.style.transition = "transform 0.3s";
    requestAnimationFrame(() => {
      $container.style.transform = `translateX(${this.#tranlateX}px)`;
    });
    $container.addEventListener(
      "transitionend",
      () => {
        $container.style.transition = "";
      },
      { once: true }
    );
  };

  #handlePointerDown = (e: PointerEvent) => {
    this.#startX = e.clientX;
    this.#isDragging = true;
    this.#startTime = Date.now();
    this.#timer.stop();
  };

  #handlePointerMove = (e: PointerEvent) => {
    if (!this.#isDragging) return;
    if (this.#movingT) {
      cancelAnimationFrame(this.#movingT);
    }
    this.#movingT = requestAnimationFrame(() => {
      const deltaX = Math.floor(e.clientX - this.#startX);
      if (!this.loop) {
        if (deltaX < 0 && this.currentIndex === this.allIndex) return;
        if (deltaX > 0 && this.currentIndex === 0) return;
      }
      const offset = this.#tranlateX + deltaX;
      this.#container.style.transform = `translateX(${offset}px)`;
    });
    e.preventDefault();
  };

  #handlePointerUp = (e: PointerEvent) => {
    if (!this.#isDragging) return;
    const duration = Date.now() - this.#startTime;
    const deltaX = e.clientX - this.#startX;
    this.#isDragging = false;
    if (deltaX === 0) return;
    let page = "cancel";
    // 快速滚动
    if (duration <= 200) {
      if (deltaX >= 20) {
        page = "prev";
      } else if (deltaX <= -20) {
        page = "next";
      }
    } else {
      // 滑动慢速
      if (deltaX >= this.clientWidth / 2) {
        page = "prev";
      } else if (deltaX <= -this.clientWidth / 2) {
        page = "next";
      }
    }

    if (page === "cancel") {
      this.#restoreTranslate();
    } else {
      this.#togglePage(page);
    }
    this.#startTimer();
  };

  #startTimer = () => {
    if (this.autoplay) {
      this.#timer.start();
    }
  };

  #handlePointerCancel = () => {
    if (!this.#isDragging) return;
    this.#isDragging = false;
    this.#restoreTranslate();
    this.#startTimer();
  };
}
