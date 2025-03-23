import { $one, hasClass, addClass, $$, $, iterate } from "ph-utils/dom";

type LoadingInstanceParams = {
  /** 是否全屏显示, 默认: true */
  fullscreen?: boolean;
  /** 全屏显示时，是否隐藏滚动条; 默认: true */
  lock?: boolean;
  /** 进度条形状, bar - 进度条, circle - 圆形, border - 边框进度 */
  shape?: "circle" | "bar" | "border";
  /** 进度条挂载容器 */
  to?: string | HTMLElement | null;
  /** 显示的文本; 默认: 加载中…… */
  text?: string;
  /** 进度背景色 */
  background?: string;
};

function addLoading(el: HTMLElement, option: LoadingInstanceParams) {
  if (hasClass(el, "l-loading")) return;
  let $mask: HTMLElement;
  if (option.fullscreen) {
    $mask = $one("#l-loading-mask") as HTMLElement;
    if ($mask != null) return;
  }
  addClass(el, "l-loading");

  // mask
  $mask = $$("div", { class: "l-loading-mask" });
  if (option.background) {
    $mask.style.backgroundColor = option.background;
  }

  // spinner
  const $spinner = $$("div", { class: "l-loading-spinner" });

  if (option.shape === "bar") {
    addClass($mask, "l-loading-bar");
  } else {
    const $circular = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    $circular.setAttribute("viewBox", "0 0 50 50");
    $circular.classList.add("circle");
    const $path = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    $path.classList.add("path");
    $path.setAttribute("cx", "25");
    $path.setAttribute("cy", "25");
    $path.setAttribute("r", "23");
    $path.setAttribute("fill", "none");
    $circular.appendChild($path);
    $spinner.appendChild($circular);

    if (option.text) {
      const $text = $$("p", {
        class: "l-loading-text",
        textContent: option.text,
      });
      $spinner.appendChild($text);
    }
  }

  // 全屏
  if (option.fullscreen) {
    const fullClasses = ["l-loading-fullscreen"];
    if (option.lock) {
      fullClasses.push("l-loading-lock");
    }
    el.classList.add(...fullClasses);
    // 全屏保证唯一, 设置id用于区分
    $mask.id = "l-loading-mask";
  }

  $mask.appendChild($spinner);
  el.appendChild($mask);

  setTimeout(() => {
    if (option.shape === "bar") {
      addClass($mask, "l-loading-bar--start");
    } else {
      $mask.style.opacity = "1";
    }
  }, 10);
}

function removeLoading(el: HTMLElement, option: LoadingInstanceParams) {
  const prefix = option.fullscreen ? "#" : ".";
  const $masks = $(`${prefix}l-loading-mask`, el);
  iterate($masks, ($mask) => {
    function transitionEnd() {
      const removedClass = ["l-loading-bar--start", "l-loading-bar--finish"];
      if (el.tagName === "BODY") {
        removedClass.push(
          "l-loading",
          "l-loading-fullscreen",
          "l-loading-lock"
        );
      }
      el.classList.remove(...removedClass);
      if ($mask != null && el.contains($mask)) {
        el.removeChild($mask);
        $mask = undefined as any;
      }
    }
    let _t = -1;
    $mask.addEventListener(
      "transitionend",
      () => {
        cancelAnimationFrame(_t);
        _t = requestAnimationFrame(() => {
          transitionEnd();
        });
      },
      { once: true }
    );
    if (option.shape === "bar") {
      el.classList.add("l-loading-bar--finish");
    } else {
      $mask.style.opacity = "0";
    }
    // 检测避免因为错误导致无法移除
    setTimeout(() => {
      transitionEnd();
    }, 500);
  });
}

class LoadingInstance {
  /** 加载容器 */
  public el!: HTMLElement;
  public option!: Required<Omit<LoadingInstanceParams, "to">>;

  public constructor(option?: LoadingInstanceParams) {
    this.option = {
      fullscreen: true,
      lock: true,
      shape: "circle",
      text: "加载中……",
      background: "",
      ...option,
    };
    const to = (option || {}).to;
    /** 最终挂载节点 */
    let $to: HTMLElement | null = null;
    if (to != null) {
      if (typeof to === "string") {
        $to = document.querySelector(to);
      } else {
        $to = to;
      }
    }
    if ($to == null || this.option.fullscreen) {
      $to = document.body;
    }
    this.el = $to;
    this.show();
  }

  /** 显示进度条 */
  public show() {
    addLoading(this.el, this.option);
  }

  /** 隐藏进度条 */
  public hide() {
    removeLoading(this.el, this.option);
  }
}

function getElementLoadingParams(el: HTMLElement) {
  const text = el.getAttribute("l-loading-text");
  const lock = el.getAttribute("l-loading-lock");
  return {
    background: el.getAttribute("l-loading-background") as string,
    text: text
      ? text === "0" || text === "false"
        ? undefined
        : text
      : "加载中……",
    fullscreen: el.hasAttribute("l-loading-fullscreen"),
    lock: lock === "0" || lock === "false" ? false : true,
    bar: el.hasAttribute("l-loading-bar"),
  };
}

export default {
  /** 创建并显示进度条 */
  create(option?: LoadingInstanceParams) {
    return new LoadingInstance(option);
  },

  /** 根据指令参数初始化进度条 */
  init(id?: string) {
    // 根据是否提供了 id，选择性地构建 CSS 选择器
    const selector = id ? `[l-loading="${id}"]` : "[l-loading]";
    const $els = $(selector);
    iterate($els, (el) => {
      const params = getElementLoadingParams(el);
      addLoading(
        params.fullscreen ? document.body : el,
        getElementLoadingParams(el)
      );
    });
  },

  /**
   * 关闭加载中的元素
   *
   * 此函数用于关闭页面上带有特定 l-loading 属性的元素，只关闭与该 id 匹配的元素
   * 否则，将关闭所有带有 l-loading 属性的元素
   *
   * @param id 可选参数，指定特定的加载元素 l-loading 对应的值，如果提供，则只关闭匹配该 id 的元素
   */
  close(id?: string) {
    // 根据是否提供了 id，选择性地构建 CSS 选择器
    const selector = id ? `[l-loading="${id}"]` : "[l-loading]";

    // 使用 jQuery 选择器获取所有匹配的元素
    const $els = $(selector);

    // 遍历每个匹配的元素，执行移除加载中的操作
    iterate($els, (el) => {
      const params = getElementLoadingParams(el);
      removeLoading(
        params.fullscreen ? document.body : el,
        getElementLoadingParams(el)
      );
    });
  },
};
