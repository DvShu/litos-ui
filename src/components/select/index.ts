import { parseAttrValue, kebabToCamel } from "../utils";
//@ts-ignore
import css from "./index.less?inline";
import { $$ } from "ph-utils/dom";
import FormInner from "../form/form_inner";

export default class Select extends FormInner {
  public static baseName = "select";

  /** 选中的标签 */
  public selectedLabels: string[] = ["苹果"];
  /** 是否启用过滤 */
  public filterable?: boolean = false;
  public placeholder?: string = "请选择";
  /** 是否支持多选 */
  public multiple?: boolean = false;
  /** 多选时是否折叠标签 */
  public collapseTags?: boolean = false;

  connectedCallback(): void {
    this.loadStyleText(css);
    super.connectedCallback();
  }

  public setValue(value: string | string[]): void {}

  static get observedAttributes() {
    return ["disabled", "value"];
  }

  protected attributeChange(
    name: string,
    _oldValue: string,
    newValue: string
  ): void {
    name = kebabToCamel(name);
    const parsedValue = parseAttrValue(
      newValue,
      this[name as "id"] as any,
      name
    ) as any;
    if (parsedValue !== this[name as "id"]) {
      this[name as "id"] = parsedValue;
    }
  }

  afterInit(): void {
    this.disabledChange();
  }

  render() {
    const fragment = document.createDocumentFragment();
    // select main
    const $main = $$("div", {
      class: "l-select-main",
      innerHTML: this._renderSelectedLabes(),
    });

    fragment.appendChild($main);
    return fragment;
  }

  protected disabledChange(): void {}


  private _renderTag(label: string, index = 0, closeable = true) {
    return `<l-tag type="info" >${label}</l-tag>`
  }

  private _renderSelectedLabes() {
    const childrenStr = [];
    let selectedLen = this.selectedLabels.length;
    if (selectedLen > 0) {
      if (!this.multiple) {
        // 单选
        if (!this.filterable) {
          childrenStr.push(
            `<span class="l-selected-item">${this.selectedLabels[0]}</span>`
          );
        }
      } else {
        // 多选
      }
    } else {
      if (!this.filterable) {
        childrenStr.push(
          `<span class="l-selected-item l-select-placeholder">${this.placeholder}</span>`
        );
      }
    }
    if (this.filterable) {
    }
    return childrenStr.join("");
  }
}
