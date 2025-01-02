import { isBlank } from "ph-utils";
import { $, iterate, transition } from "ph-utils/dom";

type UIConfig = {
  /** 注册应用的前缀, 默认: lt */
  prefix: string;
};
let seed = -1; // 用于构建多个id，避免重复
/** UI 配置 */
let uiConfig = {
  /** 注册应用的前缀 */
  prefix: "l",
};

export function config(cfg: Partial<UIConfig>) {
  uiConfig = { ...uiConfig, ...cfg };
}

/**
 * 注册 Web Components 组件
 * @param component Web Components 组件
 * @param name 组件名称, 如果不填, 则根据组件的 baseName 生成
 */
export function regist(component: any | any[], name?: string) {
  const comts = Array.isArray(component) ? component : [component];
  for (const comt of comts) {
    const cmName = name || `${uiConfig.prefix}-${comt.baseName}`;
    if (!customElements.get(cmName)) {
      customElements.define(cmName, comt);
    }
  }
}

/**
 * 生成一个唯一标识符，格式为：`uiConfig.prefix-递增的seed值`。
 * 此函数用于在组件或应用中生成唯一的ID。
 * @returns 唯一标识符字符串
 */
export function useId() {
  return `${uiConfig.prefix}-${++seed}`;
}
export function parseAttrValue(value: string, defaultValue?: string): string;
export function parseAttrValue(
  value: string,
  defaultValue?: boolean,
  key?: string
): boolean;
export function parseAttrValue(
  value: string,
  defaultValue?: number,
  key?: string
): number;
export function parseAttrValue(
  value: string,
  defaultValue: any,
  key?: string
): any {
  if (value == null) return defaultValue;
  const type = typeof defaultValue;
  switch (type) {
    case "boolean":
      return value === "" || value === "true" || value === "1" || value === key;
    case "number":
      return Number(value);
    default:
      return value;
  }
}

/**
 * 初始化元素的属性值。
 * 遍历元素的所有属性，并对每个属性的值进行解析，然后将解析后的值赋给元素的相应属性。
 * @param el - 要初始化属性的 HTML 元素。
 */
export function initAttr(el: HTMLElement) {
  const attrs = el.attributes;
  for (const item of attrs) {
    const { name, value } = item;
    if (
      name.startsWith("data-") ||
      name.startsWith("aria-") ||
      name.startsWith("_") ||
      name.startsWith("$")
    ) {
      continue;
    }
    const nameItems = name.split("-").map((item, index) => {
      if (index === 0) return item;
      return item[0].toUpperCase() + item.slice(1);
    });
    const attrName = nameItems.join("");
    const parsedValue = parseAttrValue(value, (el as any)[attrName], name);
    (el as any)[attrName] = parsedValue;
    if (name === "value") {
      (el as any)._resetValue = parsedValue;
    }
  }
}

/**
 * 生成 HTML 标签属性字符串。
 * @param attr - 属性名。
 * @param value - 属性值，可以是字符串、undefined 或布尔值。
 * @returns 返回拼接好的属性字符串。
 */
export function tagAttr(attr: string, value: string | undefined | boolean) {
  let res = " ";
  if (value === true) {
    res = ` ${attr}`;
  } else if (typeof value === "string" && !isBlank(value)) {
    res = ` ${attr}="${value}"`;
  }
  return res;
}

export function tagAttrs(attr: [string, string | undefined | boolean][]) {
  const res = attr.map((item) => tagAttr(item[0], item[1]));
  return res.join("");
}

export function setAttrs(
  el: HTMLElement,
  attrs: [string, string | undefined | boolean][]
) {
  for (const attr of attrs) {
    const value = attr[1];
    const key = attr[0];
    if (value === true) {
      el.setAttribute(key, "");
    } else if (typeof value === "string" && !isBlank(value)) {
      el.setAttribute(key, value);
    }
  }
}

/**
 * 初始化元素过渡, 同时会监听 l-transition-emit 变化自动执行隐藏动画, show - 显示元素, hide - 隐藏元素
 *
 * 注意需要在页面结束后调用 destroy 销毁监听
 *
 * @param els 需要初始化的元素列表, 如果不传则会自动查找页面中带有 l-transition 属性的元素
 * @returns
 *
 * @example
 * // html
 * <div
 *  l-transition="l-opacity"
 *  l-transition-emit="show"
 *  l-transition-method="hide"
 * >
 *  Hello World
 * </div>
 * // js
 * const trans = createTransition();
 *
 * // 销毁监听
 * transition.destroy();
 */
export function createTransition() {
  let observer: MutationObserver = undefined as any;
  const observerConfig = {
    attributes: true,
    attributeFilter: ["l-transition-emit"],
  };

  const observerHandler: MutationCallback = (mutationsList) => {
    for (let mutation of mutationsList) {
      if (mutation.type === "attributes" && mutation.attributeName) {
        const target = mutation.target as HTMLElement;
        const emit = target.getAttribute(mutation.attributeName) || "show";
        // 动画名称
        const transitionName = target.getAttribute("l-transition") || "l";
        // 结束动画完成后的操作, remove - 删除节点, hide - 隐藏节点
        const method = target.getAttribute("l-transition-method") || "hide";
        if (transitionName) {
          if (emit === "show") {
            target.style.removeProperty("display");
            // 显示节点
            transition(target, transitionName, "enter");
          } else {
            // 隐藏节点
            transition(target, transitionName, "leave", () => {
              if (method === "remove") {
                target.remove();
              } else {
                target.style.display = "none";
              }
            });
          }
        }
      }
    }
  };

  /**
   * 添加过渡元素
   * @param elems 过渡元素列表
   */
  function add(elems: HTMLElement[]) {
    if (elems && elems.length > 0) {
      if (observer == null) {
        observer = new MutationObserver(observerHandler);
      }
      iterate(elems, (el) => {
        const transitionName = el.getAttribute("l-transition");
        if (transitionName) {
          transition(el, transitionName, "enter");
          observer.observe(el, observerConfig);
        }
      });
    }
  }

  function init(els?: HTMLElement[]) {
    if (els == null) {
      els = $("[l-transition]") as HTMLElement[];
      add(els);
    }
  }

  /** 销毁过渡元素监听, 通常需要在页面删除时调用 */
  function destroy() {
    if (observer) {
      observer.disconnect();
      observer = undefined as any;
    }
  }

  return { destroy, add, init };
}