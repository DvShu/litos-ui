export default class BaseComponent extends HTMLElement {
  public static tagName: string = "base-component";
  public constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  get shadow() {
    return this.shadowRoot as ShadowRoot;
  }

  loadStyle(styleNames: string[]) {
    for (let i = 0, len = styleNames.length; i < len; i++) {
      const styleName = styleNames[i];
      import(`./${styleName}/index.css?raw`).then((res) => {
        const style = document.createElement("style");
        style.textContent = res.default.trim();
        this.shadow.appendChild(style);
      });
    }
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
    const value = this.getAttribute(key);
    if (defaultValue == null) return value;
    const valueType = typeof defaultValue;
    if (value == null) return defaultValue;
    // 类型转换
    if (valueType === "bigint" || valueType === "number") {
      if (value === "") return defaultValue;
      return Number(value);
    }
    if (valueType === "boolean") {
      if (value === "" || value === "1" || value === "true" || value === key) {
        return true;
      }
      return false;
    }
    if (valueType === "object") {
      if (value === "") return defaultValue;
      return JSON.parse(value);
    }
    return value;
  }

  connectedCallback() {
    this.render();
  }

  render() {}
}
