import { getAttr } from "ph-utils/dom";

export default class BaseComponent<T = Record<string, any>> extends HTMLElement {
  static baseName = "base-component";
  /** 组件是否渲染完成, 是否已经调用 connectedCallback */
  public rendered: boolean;
  // state
  protected _state: T;
  // 是否正在批量更新
  protected _pendingUpdate: boolean;
  protected _pendingTask?: number; // 延迟任务id
  protected _changedProperties: Set<string>; // 已改变的属性集合
  /** 版本, 1 - 直接调用 render, 2 - 渲染 render_v2 */
  protected version: number;

  public constructor(shadow = true, init: Partial<ShadowRootInit> = {}) {
    super();
    this.rendered = false;
    this._state = {} as T;
    this._pendingUpdate = false;
    this.version = 1;
    this._changedProperties = new Set();
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
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    // 记录发生变化的属性名
    this._changedProperties.add(name);
    this.attributeChanged(name, oldValue, newValue);
    if (this.rendered) {
      this.batchUpdate();
    }
  }

  protected attributeChanged(name: string, oldValue: string, newValue: string) {}

  cancelPending() {
    if (this._pendingTask) {
      cancelAnimationFrame(this._pendingTask);
      this._pendingTask = undefined;
      this._pendingUpdate = false;
    }
  }

  batchUpdate() {
    if (this._pendingUpdate) return;
    this.cancelPending();
    this._pendingUpdate = true;
    this._pendingTask = requestAnimationFrame(() => {
      // 提取本帧变动的属性，并清空以便下一帧收集
      const changedProps = new Set(this._changedProperties);
      this._changedProperties.clear();

      this.updateDOM(changedProps);
      this._pendingUpdate = false;
    });
  }

  protected updateDOM(changedProps: Set<string>) {}

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

  public styleHtml(styleText: string | string[]) {
    let text = styleText;
    if (Array.isArray(text)) {
      text = text.join("");
    }
    return `<style>${text}</style>`;
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
    defaultValue: T,
  ): T;
  public getAttr(key: string, defaultValue?: unknown) {
    return getAttr(this, key, defaultValue as any);
  }

  public appendToRoot(el?: HTMLElement | HTMLElement[] | string | DocumentFragment) {
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

  public appendToRootV2(
    template?: HTMLElement | string | DocumentFragment,
    style?: string | string[],
  ) {
    const htmls: string[] = [];
    if (style) {
      htmls.push(this.styleHtml(style));
    }
    if (template) {
      if (typeof template === "string") {
        htmls.push(template);
      } else {
        let $tmp = document.createElement("div");
        $tmp.appendChild(template);
        htmls.push($tmp.innerHTML);
        $tmp = undefined as any;
      }
    }
    this.root.innerHTML = htmls.join("");
  }

  connectedCallback() {
    if (this.version === 1) {
      this.appendToRoot(this.render() as any);
    } else {
      const res = this.render_v2();
      this.appendToRootV2(res.template, res.style);
    }
    this.rendered = true;
    this.initEvents();
    this.afterInit();
  }

  disconnectedCallback() {
    this.cancelPending();
    this.removeEvents();
    this.beforeDestroy();
    this.root.innerHTML = "";
    this.rendered = false;
  }

  render(): void | string | HTMLElement | DocumentFragment {}

  /**
   * 渲染器
   * @returns [渲染节点,内容, 模板样式]
   */
  render_v2(): { template?: string | HTMLElement | DocumentFragment; style?: string | string[] } {
    return {};
  }

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
      new CustomEvent(name, { bubbles: true, composed: false, ...eventOption }),
    );
  }

  emitInject(name: string, callback: (context: Signal<any>) => void) {
    this.emit(name, {
      bubbles: true,
      composed: true,
      detail: {
        context: name,
        callback,
      },
    });
  }
}