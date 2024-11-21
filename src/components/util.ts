type UIConfig = {
  /** 注册应用的前缀, 默认: lt */
  prefix: string;
};

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
