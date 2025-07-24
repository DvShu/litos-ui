import { getAttr } from "ph-utils/dom";

export default class BaseComponent extends HTMLElement {
  static baseName = "base-component";
  /** 组件是否渲染完成, 是否已经调用 connectedCallback */
  public rendered: boolean = false;
  public constructor(shadow = true, init: Partial<ShadowRootInit> = {}) {
    super();
    this.rendered = false;
    if (shadow) {
      this.attachShadow({ mode: "open", ...init });
    }
  }

  /**
   * 返回一个数组，表示观察的属性列表
   */
  static get observedAttributes(): string[] | undefined | null {
    return [];
  }

  // 当属性发生变化时调用的回调函数
  attributeChangedCallback(
    _name: string,
    _oldValue: string,
    _newValue: string
  ) {}

  /** @deprecated */
  get shadow() {
    return this.shadowRoot as ShadowRoot;
  }

  get root(): ShadowRoot | HTMLElement {
    return this.shadowRoot || this;
  }

  public createStyle(text: string) {
    const style = document.createElement("style");
    style.textContent = text.trim();
    this.root.appendChild(style);
  }

  public createLink(href: string) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    this.root.appendChild(link);
  }

  public loadStyleText(styleText: string | string[]) {
    let text = styleText;
    if (Array.isArray(text)) {
      text = text.join("");
    }
    this.createStyle(text);
  }

  /**
   * 获取属性值
   * @param key 属性名称
   */
  public getAttr(key: string): string;
  /**
   * 获取属性值，同时将值转换为默认值的类型，如果未赋值，则返回默认值；
   * @param key 属性名称
   * @param defaultValue 默认值
   */
  public getAttr(key: string, defaultValue: string): string;
  public getAttr(key: string, defaultValue: number): number;
  public getAttr(key: string, defaultValue: boolean): boolean;
  public getAttr<T extends Record<string, string | number | boolean>>(
    filepath: string,
    defaultValue: T
  ): T;
  public getAttr(key: string, defaultValue?: unknown) {
    return getAttr(this, key, defaultValue as any);
  }

  public appendToRoot(
    el?: HTMLElement | HTMLElement[] | string | DocumentFragment
  ) {
    if (el) {
      if (typeof el === "string") {
        let $tmp = document.createElement("div");
        $tmp.innerHTML = el;
        this.root.append(...$tmp.childNodes);
        $tmp = undefined as any;
      } else if (!(el as any).length) {
        this.root.append(el as HTMLElement);
      } else {
        this.root.append(...(el as HTMLElement[]));
      }
    }
  }

  connectedCallback() {
    this.appendToRoot(this.render() as any);
    this.rendered = true;
    this.initEvents();
    this.afterInit();
  }

  disconnectedCallback() {
    this.removeEvents();
    this.beforeDestroy();
    this.root.innerHTML = "";
    this.rendered = false;
  }

  render(): void | string | HTMLElement | HTMLElement[] | DocumentFragment {}

  /**
   * 初始化事件
   * @deprecated 自0.12.0起弃用，使用 afterInit() 替代
   */
  initEvents() {}
  afterInit() {}

  /** 移除事件 */
  /**
   * 移除事件
   * @deprecated 自0.12.0起弃用，使用 beforeDestroy() 替代
   */
  removeEvents() {}
  beforeDestroy() {}

  /**
   * 触发自定义事件
   * @param name 事件名称
   * @param eventOption 自定义事件配置选项, 默认: bubbles: true
   * @returns 是否成功触发事件
   */
  emit(name: string, eventOption?: Partial<CustomEventInit>) {
    return this.dispatchEvent(
      new CustomEvent(name, { bubbles: true, composed: false, ...eventOption })
    );
  }
}
