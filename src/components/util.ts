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
 * 在下一个动画帧执行回调函数。
 * @param cb - 要在下一个动画帧执行的回调函数。
 */
export function nextTick(cb: () => void) {
  requestAnimationFrame(() => {
    cb();
  });
}

/**
 * 对指定的 HTML 元素应用过渡效果。
 * @param target - 要应用过渡效果的 HTML 元素。
 * @param properties - 包含要改变的 CSS 属性及其目标值的数组。
 * @param duration - 过渡效果的持续时间，默认为 "0.3s"。
 * 该方法首先将元素的 display 属性设置为 "none"，然后设置过渡属性，
 * 在下一个 DOM 更新周期后显示元素并移除设置的属性，从而实现过渡效果。
 */
export function startTransition(
  target: HTMLElement,
  properties: [string, string][],
  duration?: string
) {
  target.style.setProperty("display", "none");
  const trans: string[] = [];
  for (let i = 0, len = properties.length; i < len; i++) {
    const rec = properties[i];
    target.style.setProperty(rec[0], rec[1]);
    trans.push(`${rec[0]} ${duration}`);
  }
  if (duration) {
    target.style.setProperty("transition", trans.join(", "));
  }
  nextTick(() => {
    target.style.removeProperty("display");
    nextTick(() => {
      for (let i = 0, len = properties.length; i < len; i++) {
        const rec = properties[i];
        target.style.removeProperty(rec[0]);
      }
    });
  });
}

/**
 * 结束元素的过渡效果，并在过渡结束后隐藏元素。
 * @param target - 要操作的 HTML 元素。
 * @param properties - 包含要设置的 CSS 属性和值的数组。
 * @param finish - 过渡结束后可选的回调函数。
 */
export function endTransition(
  target: HTMLElement,
  properties: [string, string][],
  finish?: () => void
) {
  for (let i = 0, len = properties.length; i < len; i++) {
    const rec = properties[i];
    target.style.setProperty(rec[0], rec[1]);
  }
  target.addEventListener(
    "transitionend",
    () => {
      target.style.display = "none";
      for (let i = 0, len = properties.length; i < len; i++) {
        const rec = properties[i];
        target.style.removeProperty(rec[0]);
      }
      if (finish != null) {
        finish();
      }
    },
    { once: true }
  );
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
