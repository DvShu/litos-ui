import { isBlank } from "ph-utils";

let seed = -1; // 用于构建多个id，避免重复

/**
 * 注册 Web Components 组件
 * @param component Web Components 组件
 * @param name 组件名称, 如果不填, 则根据组件的 baseName 生成
 */
export function regist(component: any | any[], name?: string) {
  const comts = Array.isArray(component) ? component : [component];
  for (const comt of comts) {
    const cmName = name || `l-${comt.baseName}`;
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
  return `l-${++seed}`;
}
export function parseAttrValue(value: string, defaultValue?: string): string;
export function parseAttrValue(value: string, defaultValue?: boolean, key?: string): boolean;
export function parseAttrValue(value: string, defaultValue?: number): number;
export function parseAttrValue(value: string, defaultValue: any, key?: string): any {
  if (value == null) return defaultValue;
  const type = typeof defaultValue;
  switch (type) {
    case "boolean":
      return ["", "true", "1", "on", key].includes(value);
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
      name.startsWith("$") ||
      ["id", "class", "style"].includes(name)
    ) {
      continue;
    }
    const nameItems = name.split("-").map((item, index) => {
      if (index === 0) return item;
      return item[0].toUpperCase() + item.slice(1);
    });
    const attrName = nameItems.join("");
    const parsedValue = parseAttrValue(value, (el as any)[attrName], name);
    const attrs = Object.getOwnPropertyNames(el);
    const ignoreInitAttrs = (el as any)._ignoreInitAttrs || [];
    if (ignoreInitAttrs.includes(attrName)) {
      continue;
    }
    if (name === "value") {
      (el as any)[attrName] = parsedValue;
      (el as any)._resetValue = parsedValue;
    } else if (attrs.includes(attrName) || attrs.includes(`_${attrName}`)) {
      (el as any)[attrName] = parsedValue;
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
  let res = "";
  if (value === true) {
    res = ` ${attr}`;
  } else if (typeof value === "string" && !isBlank(value)) {
    res = ` ${attr}="${value}"`;
  }
  return res;
}

export function tagAttrs(attr: [string, string | undefined | boolean][]) {
  const res = attr.map((item) => tagAttr(item[0], item[1]));
  return res.length > 0 ? ` ${res.join("")}` : "";
}

export function setAttrs(el: HTMLElement, attrs: [string, string | undefined | boolean][]) {
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
 * 短横线命名（kebab-case） 转换为 驼峰命名（camelCase
 * @param attr 待转换的属性名
 * @returns
 */
export function kebabToCamel(attr: string) {
  return attr.replace(/-(\w)/g, (match, p1) => p1.toUpperCase());
}
