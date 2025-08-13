import { parseAttrValue, kebabToCamel } from "../utils";
//@ts-ignore
import css from "./index.less?inline";
import { $$ } from "ph-utils/dom";
import FormInner from "../form/form_inner";
import { Popover } from "../utils/popover";

export default class Select extends FormInner {
  public static baseName = "select";

  /** 选中的标签 */
  public selectedLabels: string[] = [];

  /** 是否启用过滤 */
  public filterable?: boolean = false;
  public placeholder?: string = "请选择";
  /** 是否支持多选 */
  public multiple?: boolean = false;
  /** 多选时是否折叠标签 */
  public collapseTags?: boolean = false;
  /** 是否加载中, 远程搜索时使用 */
  public loading?: boolean = true;
  public options?: any[] = [];
  private _popover?: Popover;

  connectedCallback(): void {
    this.loadStyleText(css);
    super.connectedCallback();
  }

  public setValue(value: string | string[]): void {}

  static get observedAttributes() {
    return [
      "disabled",
      "value",
      "multiple",
      "placeholder",
      "collapse-tags",
      "filterable",
      "loading",
    ];
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

  public setOptions(options: any[]): void {
    this.options = options;
  }

  afterInit(): void {
    this.disabledChange();
    if (!this._popover) {
      this._popover = new Popover({
        trigger: "click",
        reference: this,
        arrow: false,
        offset: 2,
        placement: "bottom",
        popoverWidth: "trigger",
      });
    }
  }

  beforeDestroy(): void {
    this.options = undefined;
    if (this._popover) {
      this._popover.destroy();
      this._popover = undefined;
    }
  }

  render() {
    const fragment = document.createDocumentFragment();
    // select main
    const $main = $$("div", {
      class: "l-select-main",
      innerHTML: this._renderSelectedLabes(),
    });
    // select arrow
    const $arrow = $$("l-arrow-down-icon", {
      class: "l-select-arrow",
    });
    $main.appendChild($arrow);
    // select loading
    // const $loading = $$("l-loading-icon", {
    //   class: "l-select-loading",
    // });
    // $main.appendChild($loading);

    fragment.appendChild($main);
    return fragment;
  }

  protected disabledChange(): void {}

  private _renderTag(label: string, index = 0, closeable = true) {
    return `<l-tag type="info" class="l-selected-item" data-index="${index}" closeable="${closeable}">${label}</l-tag>`;
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
        childrenStr.push(this._renderTag(this.selectedLabels[0]));
        if (this.collapseTags) {
          childrenStr.push(this._renderTag(`+${selectedLen - 1}`, -1, false));
        } else {
          for (let i = 1; i < selectedLen; i++) {
            childrenStr.push(this._renderTag(this.selectedLabels[i], i));
          }
        }
      }
    } else {
      if (!this.filterable) {
        childrenStr.push(
          `<span class="l-selected-item l-select-placeholder">${this.placeholder}</span>`
        );
      }
    }
    if (this.filterable) {
      let placeholder = this.placeholder;
      if (selectedLen > 0) {
        placeholder = "";
      }
      if (!this.multiple && selectedLen > 0) {
        placeholder = this.selectedLabels[0];
      }
      childrenStr.push(
        `<input class="l-select-filter" placeholder="${placeholder}" />`
      );
    }
    return childrenStr.join("");
  }
}
