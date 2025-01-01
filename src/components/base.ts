import { getAttr } from "ph-utils/dom";

export default class BaseComponent extends HTMLElement {
  public static baseName: string = "base-component";
  /** 组件是否渲染完成, 是否已经调用 connectedCallback */
  public rendered: boolean = false;
  public constructor(shadow = true) {
    super();
    if (shadow) {
      this.attachShadow({ mode: "open" });
    }
  }

  /**
   * 返回一个数组，表示观察的属性列表
   */
  static get observedAttributes(): string[] | undefined | null {
    return [];
  }

  // 当属性发生变化时调用的回调函数
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {}

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

  loadStyle(styleNames: string[]) {
    //@ts-ignore
    if (import.meta.env.MODE !== "browser") {
      for (let i = 0, len = styleNames.length; i < len; i++) {
        const styleName = styleNames[i];
        import(`./${styleName}/index.less?inline`).then((res) => {
          this.createStyle(res.default);
        });
      }
    }
    //@ts-ignore
    if (import.meta.env.MODE === "browser") {
      let $style = document.querySelector("#litos-ui-style") as HTMLLinkElement;
      if ($style) {
        this.createLink($style.href);
      } else {
        queueMicrotask(() => {
          $style = document.querySelector("#litos-ui-style") as HTMLLinkElement;
          if ($style) {
            this.createLink($style.href);
          }
        });
      }
    }
  }

  loadExternalStyle(styleNames: string[]) {
    //@ts-ignore
    if (import.meta.env.MODE !== "browser") {
      for (let i = 0, len = styleNames.length; i < len; i++) {
        const styleName = styleNames[i];
        import(`./styles/${styleName}.css?inline`).then((res) => {
          this.createStyle(res.default);
        });
      }
    }
  }

  public loadStyleText(styleText: string) {
    this.createStyle(styleText);
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
        this.root.append(...$tmp.children);
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
  }

  disconnectedCallback() {
    this.root.innerHTML = "";
    this.rendered = false;
  }

  render(): void | string | HTMLElement | HTMLElement[] | DocumentFragment {}
}
