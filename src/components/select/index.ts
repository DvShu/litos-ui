import { parseAttrValue, kebabToCamel } from "../utils";
//@ts-ignore
import css from "./index.less?inline";
import { $$, $one } from "ph-utils/dom";
import FormInner from "../form/form_inner";
import { Popover } from "../utils/popover";

export default class Select extends FormInner {
  public static baseName = "select";

  /** 选中的标签 */
  public selectedLabels: string[] = [];

  /** 是否启用过滤 */
  public filterable?: boolean = false;
  public placeholder?: string = "请选择";
  /** 选项 label 的字段名 */
  public labelField: string = "label";
  /** 选项 value 的字段名 */
  public valueField: string = "value";
  /** 是否支持多选 */
  public multiple?: boolean = false;
  /** 多选时是否折叠标签 */
  public collapseTags?: boolean = false;
  /** 是否加载中, 远程搜索时使用 */
  public loading?: boolean = true;
  public options?: any[] = [];
  private _popover?: Popover;
  private _searchEl?: HTMLInputElement;

  connectedCallback(): void {
    this.loadStyleText(css);
    super.connectedCallback();
  }

  public setValue(value: string | string[]): void {
    let v: string[] = value as string[];
    if (typeof value === "string") {
      v = value.split(",");
    }
    super.setValue(this.multiple ? v : v[0]);
  }

  static get observedAttributes() {
    return [
      "disabled",
      "value",
      "multiple",
      "placeholder",
      "collapse-tags",
      "filterable",
      "loading",
      "label-field",
      "value-field",
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
    if (this._popover) {
      this._popover.updatePopoverContent();
    }
  }

  private _renderOption() {
    const children: string[] = [];
    if (this.options) {
      const len = this.options.length;
      for (let i = 0; i < len; i++) {
        const item = this.options[i];
        const $li = $$("li", {
          class: "l-select-option",
          "data-action": `${i}`,
        });
        // text
        $$(
          "span",
          {
            class: "l-select-option-content",
            textContent: item[this.labelField as string],
            title: item[this.labelField as string],
          },
          $li
        );
        children.push($li.outerHTML);
      }
    }
    if (children.length === 0) {
      const $li = $$("li", {
        class: "l-select-option l-select-option--empty",
        textContent: "暂无数据",
      });
      children.push($li.outerHTML);
    }
    return children.join("");
  }

  afterInit(): void {
    this._searchEl = $one(".l-select-filter", this.root) as HTMLInputElement;
    this.disabledChange();
    if (!this._popover) {
      this._popover = new Popover({
        trigger: "click",
        reference: this,
        arrow: false,
        offset: 2,
        placement: "bottom",
        popoverWidth: "trigger",
        theme: "select",
        disabled: this.isDisabled(),
        contentRender() {
          return '<ul class="l-select-list"></ul>';
        },
        updateContent: (popoverElement) => {
          const $list = $one(".l-select-list", popoverElement);
          if ($list) {
            $list.innerHTML = this._renderOption();
          }
        },
        onPopoverAction: (action) => {
          if (action && this.options) {
            const index = Number(action);
            const option = this.options[index];
            const value = option[this.valueField];
            const label = option[this.labelField];
            let oldValue = this.value;
            if (this.multiple === true) {
              // 多选
              if (!oldValue) {
                oldValue = [value];
              } else {
                if (Array.isArray(oldValue)) {
                  const i = oldValue.indexOf(value);
                  if (i !== -1) {
                    oldValue.splice(i, 1);
                  } else {
                    oldValue.push(value);
                  }
                } else {
                  if (oldValue != value) {
                    oldValue = [oldValue, value];
                  }
                }
              }
            } else {
              // 单选
              oldValue = value;
            }
            this.setValue(oldValue);
          }
        },
      });
    }
  }

  beforeDestroy(): void {
    this.options = undefined;
    if (this._popover) {
      this._popover.destroy();
      this._popover = undefined;
    }
    if (this._searchEl) {
      this._searchEl = undefined;
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

  protected disabledChange(): void {
    if (!this.rendered) return;
    const isDisabled = this.isDisabled();
    if (this._popover) {
      this._popover.setOption("disabled", isDisabled);
    }
    if (isDisabled) {
      // 禁用
      this.classList.add("l-select--disabled");
    } else {
      this.classList.remove("l-select--disabled");
    }
    if (this._searchEl) {
      this._searchEl.disabled = isDisabled;
    }
  }

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
