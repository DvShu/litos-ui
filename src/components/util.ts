import { isBlank } from "ph-utils";

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
export function regist(component: typeof HTMLElement, name?: string) {
  const cmName = name || `${uiConfig.prefix}-${(component as any).baseName}`;
  if (!customElements.get(cmName)) {
    customElements.define(cmName, component);
  }
}

/**
 * 隐藏 Transition 组件
 * @param el Transition 组件或者选择器, 不传则为: l-transition
 * @param remove 是否在隐藏后移除元素, 对应 vue-vIf
 */
export function hideTransition(el?: string | HTMLElement, remove = false) {
  el = el || "l-transition";
  let $el: HTMLElement = el as HTMLElement;
  if (typeof el === "string") {
    $el = document.querySelector(el) as HTMLElement;
  }
  if ($el) {
    ($el as any).hide(() => {
      if (remove) $el.remove();
    });
  }
}

/**
 * 生成一个唯一标识符，格式为：`uiConfig.prefix-递增的seed值`。
 * 此函数用于在组件或应用中生成唯一的ID。
 * @returns {string} 唯一标识符字符串
 */
export function useId() {
  return `${uiConfig.prefix}-${++seed}`;
}

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
  defaultValue: string,
  key?: string
): string;
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
  const names = Object.getOwnPropertyNames(el);
  for (const item of attrs) {
    const { name, value } = item;
    if (
      name.startsWith("data-") ||
      name.startsWith("aria-") ||
      name.startsWith("_") ||
      !names.includes(name)
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
      (el as any).resetValue = parsedValue;
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
