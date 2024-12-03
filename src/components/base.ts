import { getAttr } from "ph-utils/dom";

export default class BaseComponent extends HTMLElement {
  public static baseName: string = "base-component";
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
    this.shadow.appendChild(style);
  }

  public createLink(href: string) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    this.shadow.appendChild(link);
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

  public setProperty(key: string, value: any) {
    (this as any)[key] = value;
  }

  public setProperties(properties: Record<string, any>) {
    for (const key in properties) {
      this.setProperty(key, properties[key]);
    }
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
  public getAttr(filepath: string, defaultValue: string): string;
  public getAttr(filepath: string, defaultValue: number): number;
  public getAttr(filepath: string, defaultValue: boolean): boolean;
  public getAttr<T extends Record<string, string | number | boolean>>(
    filepath: string,
    defaultValue: T
  ): T;
  public getAttr(key: string, defaultValue?: unknown) {
    return getAttr(this, key, defaultValue as any);
  }

  connectedCallback() {
    this.render();
    this.rendered = true;
  }

  disconnectedCallback() {}

  render() {}
}
