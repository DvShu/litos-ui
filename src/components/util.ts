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
 * @param name 组件名称, 如果不填, 则根据组件的 tagName 生成
 */
export function regist(component: typeof HTMLElement, name?: string) {
  const cmName = name || `${uiConfig.prefix}-${(component as any).tagName}`;
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
