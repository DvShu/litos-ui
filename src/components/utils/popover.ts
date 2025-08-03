import { $one, on, off, $ } from "ph-utils/dom";

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
  options: UpdatePositionProps = { placement: "top" }
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
    10
  );
  floating.style.setProperty("left", `${impactRes.x}px`);
  floating.style.setProperty("top", `${impactRes.y}px`);
  let $arrow = $one(".arrow", floating);
  if ($arrow) {
    const arrowPos = getArrowPosition(
      reference,
      floating,
      impactRes.mainAlign,
      impactRes.crossAlign
    );
    if (arrowPos.x) {
      $arrow.style.setProperty("left", `${arrowPos.x}px`);
    }
    if (arrowPos.y) {
      $arrow.style.setProperty("top", `${arrowPos.y}px`);
    }
    const staticSide = {
      top: "bottom",
      right: "left",
      bottom: "top",
      left: "right",
    }[impactRes.mainAlign as "top"];
    $arrow.style.setProperty(staticSide, "-4px");
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
};

export function init(props: PopoverInitProps) {
  let options = { trigger: "hover", ...props };
  let $refs: HTMLElement[] | undefined = [];

  if (options.reference) {
    if (typeof options.reference === "string") {
      $refs = $(options.reference) as HTMLElement[];
    } else if (Array.isArray(options.reference)) {
      $refs.push(...options.reference);
    } else {
      $refs.push(options.reference);
    }
  } else {
    $refs = $(".l-popover-reference") as HTMLElement[];
  }

  let $popover = options.popover;

  function destroy() {
    $refs = undefined;
  }

  return { destroy };
}
