import { $one, on, off, $, iterate, $$ } from "ph-utils/dom";
import { random } from "ph-utils";
import { timestamp } from "ph-utils/date";

/**
 * 根据给定的目标元素矩形、弹出层矩形、主轴对齐方式、交叉轴对齐方式、偏移量和轴方向，计算弹出层相对于目标元素的偏移量。
 *
 * @param targetRect 目标元素的矩形（DOMRect）。
 * @param popoverRect 弹出层的矩形（DOMRect）。
 * @param mainAlign 主轴对齐方式，可以是 "left"、"right"、"top" 或 "bottom"。
 * @param crossAlign 交叉轴对齐方式，可以是 ""（居中）、"start"（开始位置）或 "end"（结束位置）。
 * @param offset 偏移量，默认为 10。
 * @param axis 轴方向，可以是 "x" 或 "y"，默认为 "x"。
 * @returns 弹出层相对于目标元素的偏移量。
 */
function getPopoverOffsetByAxis(
  targetRect: DOMRect,
  popoverRect: DOMRect,
  mainAlign: string,
  crossAlign: string,
  offset = 10,
  axis = "x"
) {
  const attrKey = axis === "x" ? "width" : "height";
  let filterKeys = ["left", "right", "top", "bottom"];
  if (axis === "y") {
    filterKeys = ["top", "bottom", "left", "right"];
  }
  // 计算 偏移
  let diff = 0;
  if (mainAlign === filterKeys[0]) {
    diff = popoverRect[attrKey] + offset;
  } else if (mainAlign === filterKeys[1]) {
    diff = -(targetRect[attrKey] + offset);
  } else if (mainAlign === filterKeys[2] || mainAlign === filterKeys[3]) {
    if (crossAlign === "") {
      diff = popoverRect[attrKey] / 2 - targetRect[attrKey] / 2;
    } else if (crossAlign === "end") {
      diff = popoverRect[attrKey] - targetRect[attrKey];
    }
  }
  return diff;
}

/**
 * 获取给定元素的所有可滚动祖先元素
 *
 * @param element 给定的HTML元素
 * @returns 返回包含所有可滚动祖先元素的数组
 */
export function getOverflowAncestors(element: HTMLElement) {
  const scrollableElements = [];
  let current: HTMLElement | null = element;
  while (
    current &&
    current !== document.body &&
    current !== document.documentElement
  ) {
    const style = window.getComputedStyle(current);
    const overflow = style.overflow + style.overflowX + style.overflowY;
    if (/(scroll|auto)/i.test(overflow)) {
      scrollableElements.push(current);
    }
    current = current.parentElement;
  }
  return scrollableElements;
}

/**
 * 判断气泡框（popover）相对于目标元素的位置是否超出屏幕范围，并调整位置
 *
 * @param targetRect 目标元素的DOMRect对象
 * @param popoverRect 气泡框的DOMRect对象
 * @param mainAlign 主对齐方式，可以是 'top'、'bottom'、'left'、'right'
 * @param crossAlign 次对齐方式，可以是 'start'、'end'、''（空字符串表示居中）
 * @param offset 气泡框与目标元素之间的偏移量，默认为10
 * @returns 包含气泡框位置信息的对象，包括 x 坐标、y 坐标、主对齐方式、次对齐方式和放置方式
 */
function impactDetect(
  targetRect: DOMRect,
  popoverRect: DOMRect,
  mainAlign: string,
  crossAlign: string,
  offset = 10
) {
  // 获取滚动容器
  let container = document.documentElement;
  // 滚动条水平方向滚动距离
  const scrollLeft = container.scrollLeft;
  // 滚动条垂直方向滚动距离
  const scrollTop = container.scrollTop;
  const maxHeight = window.innerHeight + scrollTop - 10;
  const maxWidth = window.innerWidth + scrollLeft - 10;
  // 判断 垂直 方向是否在显示区域内
  let topDiff = getPopoverOffsetByAxis(
    targetRect,
    popoverRect,
    mainAlign,
    crossAlign,
    offset,
    "y"
  );
  let y = targetRect.top + scrollTop - topDiff;
  const yEnd = y + popoverRect.height;
  // 1. 首先判断下边界是否超出屏幕
  if (yEnd > maxHeight) {
    // 下边距超出屏幕
    if (mainAlign === "left" || mainAlign === "right") {
      crossAlign = "end";
    } else {
      mainAlign = "top";
    }
  }

  // 2. 判断上边界是否超出屏幕
  if (y < scrollTop) {
    // 上边距超出屏幕
    if (mainAlign === "left" || mainAlign === "right") {
      crossAlign = "start";
    } else {
      mainAlign = "bottom";
    }
  }

  // 判断 水平 方向是否在显示区域内
  let leftDiff = getPopoverOffsetByAxis(
    targetRect,
    popoverRect,
    mainAlign,
    crossAlign,
    offset,
    "x"
  );
  // 1. 首先判断右边界是否超出屏幕
  let x = targetRect.left + scrollLeft - leftDiff;
  const xEnd = x + popoverRect.width;
  if (xEnd > maxWidth) {
    // 右边距超出屏幕
    if (mainAlign === "top" || mainAlign === "bottom") {
      crossAlign = "end";
    } else {
      mainAlign = "left";
    }
  }

  // 2. 判断左边界是否超出屏幕
  if (x < scrollLeft) {
    // 左边距超出屏幕
    if (mainAlign === "top" || mainAlign === "bottom") {
      crossAlign = "start";
    } else {
      mainAlign = "right";
    }
  }
  topDiff = getPopoverOffsetByAxis(
    targetRect,
    popoverRect,
    mainAlign,
    crossAlign,
    offset,
    "y"
  );
  leftDiff = getPopoverOffsetByAxis(
    targetRect,
    popoverRect,
    mainAlign,
    crossAlign,
    offset,
    "x"
  );
  x = targetRect.left + scrollLeft - leftDiff;
  y = targetRect.top + scrollTop - topDiff;
  const placement = `${mainAlign}${crossAlign === "" ? "" : "-" + crossAlign}`;
  return {
    x,
    y,
    mainAlign,
    crossAlign,
    placement,
  };
}

/**
 * 获取浮动元素相对于参考元素的箭头位置
 *
 * @param reference 参考元素，HTML元素对象
 * @param floating 浮动元素，HTML元素对象
 * @param mainAlign 主对齐方向，可选值为 "top", "bottom", "left", "right"
 * @param crossAlign 次对齐方向，可选值为 "start", "end", "center"
 * @returns 返回一个对象，包含箭头在x轴和y轴上的位置，未定义则表示该轴不展示箭头
 */
function getArrowPosition(
  reference: HTMLElement,
  floating: HTMLElement,
  mainAlign: string,
  crossAlign: string
) {
  const referenceRect = reference.getBoundingClientRect();
  const floatingRect = floating.getBoundingClientRect();
  let attrKey: "width" | "height" = "height";
  if (mainAlign === "top" || mainAlign === "bottom") {
    attrKey = "width";
  }
  const min = Math.min(referenceRect[attrKey], floatingRect[attrKey]);
  let pos = 0;
  if (crossAlign === "start") {
    pos = min / 2 - 4;
  } else if (crossAlign === "end") {
    pos = floatingRect[attrKey] - min / 2 - 4;
  } else {
    pos = floatingRect[attrKey] / 2 - 4;
  }
  return {
    x: attrKey === "width" ? pos : undefined,
    y: attrKey === "height" ? pos : undefined,
  };
}

type PopoverPlacement =
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

type UpdatePositionProps = {
  /** 浮动元素宽度 */
  floatingWidth?: number | "trigger";
  /** 弹出位置, 默认: top */
  placement?: PopoverPlacement;
  /** 偏移量, 默认: 10 */
  offset?: number;
};

/**
 * 更新浮动元素的位置
 *
 * @param reference 参照元素
 * @param floating 浮动元素
 * @param options 配置项，默认值为 { placement: "top" }
 *
 * options 参数:
 * - placement: 浮动元素的定位方式，可选值包括 top, right, bottom, left，支持带横轴对齐方式（如 "top-start", "right-end" 等）
 * - floatingWidth: 浮动元素的宽度，可选值为具体数值或 "trigger"（表示与参照元素同宽）
 */
export function updatePosition(
  reference: HTMLElement,
  floating: HTMLElement,
  options: UpdatePositionProps = { placement: "top", offset: 10 }
) {
  // 获取水平和垂直方向的位置
  let mainPos = "bottom";
  let crossPos = "";
  const poss = (options.placement || "top").split("-");
  if (poss != null) {
    mainPos = poss[0];
    crossPos = poss[1] || "";
  }
  let width = undefined;
  let popoverRect = floating.getBoundingClientRect();
  const targetRect = reference.getBoundingClientRect();

  if (options.floatingWidth) {
    if (options.floatingWidth === "trigger") {
      width = targetRect.width;
    } else {
      width = options.floatingWidth;
    }
  }
  if (width != null) {
    floating.style.width = `${width}px`;
  }
  const impactRes = impactDetect(
    targetRect,
    popoverRect,
    mainPos,
    crossPos,
    options.offset || 10
  );
  floating.style.setProperty("left", `${impactRes.x}px`);
  floating.style.setProperty("top", `${impactRes.y}px`);
  let $arrow = $one(".l-popover-arrow", floating);
  if ($arrow) {
    console.log(impactRes.mainAlign, impactRes.crossAlign);
    const arrowPos = getArrowPosition(
      reference,
      floating,
      impactRes.mainAlign,
      impactRes.crossAlign
    );
    let cssText = ``;
    if (arrowPos.x) {
      cssText += `left: ${arrowPos.x}px;`;
    }
    if (arrowPos.y) {
      cssText += `top: ${arrowPos.y}px;`;
    }
    const staticSide = {
      top: "bottom",
      right: "left",
      bottom: "top",
      left: "right",
    }[impactRes.mainAlign as "top"];
    const arrowSide = {
      top: "right",
      bottom: "left",
      left: "top",
      right: "bottom",
    }[impactRes.mainAlign as "top"];
    cssText += `${staticSide}: -4px;border-${staticSide}: 1px solid var(--l-popover-border-color);border-${arrowSide}:1px solid var(--l-popover-border-color);`;
    $arrow.style.cssText = cssText;
  }
}

export function autoUpdate(
  reference: HTMLElement,
  floating: HTMLElement,
  options: UpdatePositionProps
) {
  let $reference = reference;
  let $floating = floating;
  let $options = options;

  updatePosition($reference, $floating, $options);

  function onScroll() {
    updatePosition($reference, $floating, $options);
  }

  // 获取滚动容器
  let scollParents = getOverflowAncestors($reference);
  scollParents.forEach((item) => {
    on(item, "scroll", onScroll);
  });

  function destroy() {
    scollParents.forEach((item) => {
      off(item, "scroll", onScroll);
    });
    scollParents = undefined as any;
    $reference = undefined as any;
    $floating = undefined as any;
    $options = undefined as any;
  }

  return { destroy };
}
type PopoverInitProps = {
  /** 触发元素, 如果不传, 则默认查询所有的 .l-popover-reference 类节点 */
  reference?: HTMLElement | HTMLElement[] | string;
  /** Popover节点, 如果不传则会自动创建 */
  popover?: HTMLElement;
  /** Popover 内容渲染 */
  contentRender?: () => HTMLElement | string | DocumentFragment;
  /**
   * Popover显示内容修改函数
   * @param popoverElement Popover节点
   * @param datas referecnce 节点上的 data 属性集
   * @returns
   */
  updateContent?: (
    popoverElement: HTMLElement,
    datas?: Record<string, any>
  ) => void;
  /** 触发方式, 默认: hover */
  trigger?: "click" | "hover" | "focus";
  /** 主题, default - 白底, tooltip - 黑底 */
  theme?: "default" | "tooltip";
  /** 浮动元素宽度 */
  floatingWidth?: number | "trigger";
  /** 弹出位置, 默认: top */
  placement?: PopoverPlacement;
  /** 是否显示指示箭头 */
  arrow?: boolean;
  /** 偏移量, 默认: 10 */
  offset?: number;
};

export class Popover {
  public options: PopoverInitProps;
  private $refs: HTMLElement[] | undefined = [];
  /** 激活的触发节点 */
  private $reference?: HTMLElement;
  private $popover?: HTMLElement;
  private updater?: any;
  private _popoverId?: string;
  private _hideTimer?: number;

  constructor(props?: PopoverInitProps) {
    this.options = {
      trigger: "hover",
      arrow: true,
      offset: 10,
      updateContent: (popover, datas) => {
        if (datas && datas.title) {
          const $title = $one(".l-popover-content", popover);
          if ($title) {
            $title.textContent = datas.title;
          }
        }
      },
      ...props,
    };
    let $refs = [];
    if (this.options.reference) {
      if (typeof this.options.reference === "string") {
        $refs = $(this.options.reference) as HTMLElement[];
      } else if (Array.isArray(this.options.reference)) {
        $refs.push(...this.options.reference);
      } else {
        $refs.push(this.options.reference);
      }
    } else {
      $refs = $(".l-popover-reference") as HTMLElement[];
    }
    this.$refs = $refs;
    this.$popover = this.options.popover;
    this._bindPopoverEvents();
    this._init();
  }

  /**
   * 向实例中添加一个引用元素
   *
   * @param reference 需要添加的引用元素
   */
  public addReference(reference: HTMLElement) {
    if (this.$refs) {
      this._bindReferenceEvents(reference);
      this.$refs.push(reference);
    }
  }

  /**
   * 从引用列表中移除指定的引用
   *
   * @param referecnce 要移除的引用元素
   */
  public removeReference(referecnce: HTMLElement) {
    if (this.$refs) {
      let index = this.$refs.indexOf(referecnce);
      if (index !== -1) {
        if (referecnce == this.$reference) {
          this.hide();
        }
        this._removeReferenceEvents(referecnce);
        this.$refs.splice(index, 1);
      }
    }
  }

  _init() {
    if (this.options.trigger && this.$refs) {
      iterate(this.$refs, (item) => {
        this._bindReferenceEvents(item);
      });
    }
    on(document, "click", this._onOuterTap, { capture: true });
  }

  _bindReferenceEvents(ref: HTMLElement) {
    const trigger = this.options.trigger as string;
    if (["click", "focus"].includes(trigger)) {
      on(ref, "click", this._onRefTap);
    } else if (trigger === "hover") {
      on(ref, "mouseenter", this._onMouseEnter);
      on(ref, "mouseleave", this._onMouseLeave);
    }
  }

  _removeReferenceEvents(ref: HTMLElement) {
    off(ref, "click", this._onRefTap);
    off(ref, "mouseenter", this._onMouseEnter);
    off(ref, "mouseleave", this._onMouseLeave);
  }

  _bindPopoverEvents() {
    if (this.$popover && this.options.trigger === "hover") {
      on(this.$popover, "mouseenter", this._onPopoverEnter);
      on(this.$popover, "mouseleave", this._onMouseLeave);
    }
  }

  _onPopoverEnter = () => {
    this._clearHideTimer();
    console.log("clear");
  };

  _clearHideTimer() {
    if (this._hideTimer) {
      clearTimeout(this._hideTimer);
      this._hideTimer = undefined;
    }
  }

  _onMouseEnter = (e: Event) => {
    const $target = e.target as HTMLElement;
    this._clearHideTimer();
    if (this.$reference == $target) return;
    this.show($target);
  };

  _onMouseLeave = () => {
    this._clearHideTimer();
    this._hideTimer = setTimeout(() => {
      this.hide();
    }, 50) as any;
  };

  _onRefTap = (e: Event) => {
    this._destroyUpdater();
    const $target = e.target as HTMLElement;
    if (this.$reference) {
      // 已经显示
      if (this.options.trigger === "focus") return;
      this.hide();
      return;
    }
    this.show($target);
  };

  /**
   * 显示浮层。
   *
   * @param reference 浮层所对齐的 HTML 元素。
   */
  show(reference: HTMLElement) {
    this.$reference = reference;
    if (!this.$popover) {
      this._renderPopover();
      this.$popover = $one(`#${this._popoverId}`) as HTMLElement;
      this._bindPopoverEvents();
    }
    if (this.$popover) {
      const referenceDatas = this.$reference.dataset;
      if (this.options.updateContent) {
        this.options.updateContent(this.$popover, referenceDatas);
      }
      this._destroyUpdater();
      const placement: string =
        referenceDatas.placement || this.options.placement || "top";
      const offset = Number(referenceDatas.offset || this.options.offset || 10);
      const floatingWidth =
        referenceDatas.floatingWidth || this.options.floatingWidth;
      this.$popover.style.display = "block";
      this.updater = autoUpdate(this.$reference, this.$popover, {
        placement: placement as "top",
        floatingWidth: floatingWidth ? Number(floatingWidth) : undefined,
        offset: offset,
      });
    }
  }

  /**
   * 隐藏 Popover
   */
  hide() {
    this._destroyUpdater();
    if (this.$popover) {
      this.$popover.style.display = "none";
    }
    this.$reference = undefined;
  }

  _onOuterTap = (e: Event) => {
    const $target = e.target as HTMLElement;
    if (
      this.$reference &&
      !this.$reference.contains($target) &&
      this.$reference != $target
    ) {
      // 点击的是触发区域外
      if (this.options.trigger === "focus") {
        this.hide();
        return;
      }
      // 判断是否点击的是 Popover
      if (
        this.$popover &&
        (this.$popover.contains($target) || this.$popover == $target)
      ) {
        // 点击的是 Popover
        return;
      }
      this.hide();
    }
  };

  _renderPopover() {
    const theme = this.options.theme || "default";
    this._popoverId = `l-popover-${timestamp()}-${random(2)}`;
    const $tmp = $$("div", {
      id: this._popoverId,
      class: `l-popover l-popover--${theme}`,
    });
    const $content = $$("div", { class: "l-popover-content" });
    const contentRender = this.options.contentRender;
    if (contentRender) {
      const renderRes = contentRender();
      if (typeof renderRes === "string") {
        $content.innerHTML = renderRes;
      } else {
        $content.appendChild(renderRes);
      }
    }
    $tmp.appendChild($content);
    if (this.options.arrow) {
      $content.appendChild($$("div", { class: "l-popover-arrow" }));
    }
    document.body.appendChild($tmp);
  }

  _destroyUpdater() {
    if (this.updater) {
      this.updater.destroy();
      this.updater = undefined;
    }
  }

  /**
   * 销毁组件
   *
   * 销毁组件并移除相关事件监听器和 DOM 元素。
   */
  destroy() {
    this.hide();
    if (this.$refs) {
      iterate(this.$refs, (item) => {
        this._removeReferenceEvents(item);
      });
    }
    off(document, "click", this._onOuterTap, { capture: true });
    this.options = undefined as any;
    this.$refs = undefined;
    this._clearHideTimer();
    if (this.$popover) {
      off(this.$popover, "mouseenter", this._onPopoverEnter);
      off(this.$popover, "mouseleave", this._onMouseLeave);
      // 移除 popover 节点
      this.$popover.remove();
    }
    this.$popover = undefined;
  }
}
