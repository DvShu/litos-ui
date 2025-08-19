import { parseAttrValue, kebabToCamel } from "../utils";
//@ts-ignore
import css from "./index.less?inline";
import { $$, $one, iterate, $, on, off, shouldEventNext } from "ph-utils/dom";
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
  public loading?: boolean = false;
  /** 宽度 */
  public width?: string;
  /** 是否可清除 */
  public clearable?: boolean = false;
  /** 是否展开下拉选择 */
  public _expanded: boolean = false;
  /** 是否处于激活态 */
  public isActive?: boolean = false;

  public options?: any[] = [];
  private _popover?: Popover;
  private _searchEl?: HTMLInputElement;
  private _arrowEl?: HTMLElement;

  connectedCallback(): void {
    this.loadStyleText(css);
    super.connectedCallback();
  }

  public setIsActive(isActive?: boolean) {
    this.isActive = isActive;
    if (isActive) {
      this.classList.add("l-select--active");
    } else {
      this.classList.remove("l-select--active");
    }
  }

  private get expanded() {
    return this._expanded;
  }

  private set expanded(value: boolean) {
    this.setExpanded(value);
  }

  public setExpanded(value: boolean) {
    this._expanded = value;
    if (value) {
      this.setIsActive(true);
      this.classList.add("l-select--expand");
      queueMicrotask(() => {
        if (this._popover && this._popover.popoverElement) {
          const $firstSelect = $one(
            ".l-select-option--selected",
            this._popover.popoverElement
          );
          let offset = 0;
          if ($firstSelect) {
            offset = this._calculateOffset(
              $firstSelect,
              this._popover.popoverElement
            );
          }
          this._popover.popoverElement.scrollTo({ top: offset });
        }
      });
    } else {
      this.classList.remove("l-select--expand");
    }
  }

  public setValue(value: string | string[] | number): void {
    let v: any[] = value as string[];
    if (typeof value === "string") {
      v = value.split(",");
    }
    if (this.multiple) {
      if (!Array.isArray(v)) {
        v = [v];
      }
    } else {
      if (Array.isArray(v)) {
        v = v[0];
      }
    }
    super.setValue(v);
    this._updateSelectedLabels();
    this._reRenderLabels();
  }

  private _updateSelectedLabels() {
    if (this.options) {
      this.selectedLabels = this.options
        .filter((item) => this._isOptionSelect(item[this.valueField as string]))
        .map((item) => item[this.labelField as string]);
      return;
    }
    this.selectedLabels = [];
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
      "width",
      "clearable",
      "expanded",
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
    if (this.rendered) {
      switch (name) {
        case "width":
          if (parsedValue) {
            this.style.setProperty("--l-select-width", parsedValue);
          } else {
            this.style.removeProperty("--l-select-width");
          }
          break;
      }
    }
  }

  public setOptions(options: any[]): void {
    this.options = options;
    if (this._popover) {
      this._popover.updatePopoverContent();
    }
  }

  private _isOptionSelect(value?: any) {
    let isSelect = false;
    if (value != null && this.value != null) {
      if (this.multiple) {
        isSelect = this.value.includes(value);
      } else {
        isSelect = value === this.value;
      }
    }
    return isSelect;
  }

  private _updateOptionSelect(optionElement: HTMLElement, isSelect: boolean) {
    let $selectIcon = $one(".l-select-icon", optionElement);
    if (isSelect) {
      optionElement.classList.add("l-select-option--selected");
      if (!$selectIcon) {
        $$(
          "l-select-icon",
          {
            class: "l-select-icon",
          },
          optionElement
        );
      }
    } else {
      optionElement.classList.remove("l-select-option--selected");
      if ($selectIcon) {
        $selectIcon.remove();
      }
    }
  }

  private _renderOption() {
    const children: string[] = [];
    if (this.options) {
      const len = this.options.length;
      for (let i = 0; i < len; i++) {
        const item = this.options[i];
        const itemSelected = this._isOptionSelect(
          item[this.valueField as string]
        );
        const $li = $$("li", {
          class: [
            "l-select-option",
            itemSelected ? "l-select-option--selected" : undefined,
          ],
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
        // select
        if (itemSelected) {
          $$(
            "l-select-icon",
            {
              class: "l-select-icon",
            },
            $li
          );
        }
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

  private _calculateOffset(target: HTMLElement, scrollContainer: HTMLElement) {
    const targetRect = target.getBoundingClientRect();
    const scrollContainerRect = scrollContainer.getBoundingClientRect();
    return targetRect.top - scrollContainerRect.top + scrollContainer.scrollTop;
  }

  public isEmpty() {
    let isEmpty = true;
    if (!this.multiple && this.value != null && this.value !== "") {
      isEmpty = false;
    }
    if (this.multiple && this.value && this.value.length > 0) {
      isEmpty = false;
    }
    return isEmpty;
  }

  private _toggleClearable(isHide = false) {
    if (this.clearable) {
      // 显示 清除按钮
      let $clearIcon = $one(".l-select-clear", this.root);
      if (isHide || this.isEmpty() || this.loading) {
        if ($clearIcon) {
          $clearIcon.remove();
        }
        return;
      }
      if (!$clearIcon) {
        $$(
          "l-close-filled-icon",
          {
            class: "l-select-clear",
            "data-action": "clear",
          },
          this.root
        );
      }
    }
  }

  private _onMouseEnter = () => {
    this._toggleClearable(false);
  };

  private _onMouseLeave = () => {
    this._toggleClearable(true);
  };

  private _togglePopover() {
    if (this._popover) {
      if (this._popover.isShow()) {
        this._popover.hide();
        return;
      }
      this._popover.show(this);
    }
  }

  private _onRootTap = (e: Event) => {
    e.stopPropagation();
    const [next, action, target] = shouldEventNext(
      e,
      "data-action",
      e.currentTarget as HTMLElement
    );
    if (next) {
      return;
    }
    this._togglePopover();
  };

  private _onTap = () => {
    this._togglePopover();
  };

  afterInit(): void {
    on(this, "mouseenter", this._onMouseEnter);
    on(this, "mouseleave", this._onMouseLeave);
    on(this.root, "click", this._onRootTap);
    on(this, "click", this._onTap);

    this._searchEl = $one(".l-select-filter", this.root) as HTMLInputElement;
    this._arrowEl = $one(".l-select-arrow", this.root) as HTMLElement;
    this.disabledChange();
    if (this.width) {
      this.style.setProperty("--l-select-width", this.width);
    }
    if (!this._popover) {
      this._popover = new Popover({
        arrow: false,
        offset: 2,
        placement: "bottom",
        popoverWidth: "trigger",
        trigger: "manual",
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
        onOpenChange: (isOpen) => {
          this.setExpanded(isOpen);
        },
        onPopoverAction: (action, target) => {
          if (action && this.options) {
            const index = Number(action);
            const option = this.options[index];
            const value = option[this.valueField];
            const label = option[this.labelField];
            let oldValue = this.value;
            let oldLabels = this.selectedLabels;
            if (this.multiple === true) {
              // 多选
              if (!oldValue) {
                oldValue = [value];
                oldLabels = [label];
              } else {
                if (Array.isArray(oldValue)) {
                  const i = oldValue.indexOf(value);
                  if (i !== -1) {
                    oldValue.splice(i, 1);
                    oldLabels.splice(i, 1);
                  } else {
                    oldValue.push(value);
                    oldLabels.push(label);
                  }
                } else {
                  if (oldValue != value) {
                    oldValue = [oldValue, value];
                    oldLabels = [oldLabels, label];
                  }
                }
              }
            } else {
              // 单选
              oldValue = value;
              oldLabels = [label];
            }
            this._value = oldValue;
            this.selectedLabels = oldLabels;
            const isSelect = this._isOptionSelect(value);
            if (!this.multiple) {
              // 单选移除之前的选中态
              const $oldSelected = $(
                ".l-select-option--selected",
                target.parentElement as HTMLElement
              ) as HTMLElement[];
              iterate($oldSelected, (oldOption) => {
                this._updateOptionSelect(oldOption, false);
              });
            }
            // 修改选中状态
            this._updateOptionSelect(target, isSelect);
            // 重新渲染标签
            this._reRenderLabels();
            if (!this.multiple && this._popover) {
              // 单选关闭弹窗
              this._popover.hide();
            }
          }
        },
      });
    }
  }

  beforeDestroy(): void {
    off(this, "mouseenter", this._onMouseEnter);
    off(this, "mouseleave", this._onMouseLeave);
    off(this.root, "click", this._onRootTap);
    off(this, "click", this._onTap);
    this.options = undefined;
    if (this._popover) {
      this._popover.destroy();
      this._popover = undefined;
    }
    if (this._searchEl) {
      this._searchEl = undefined;
    }
    this._arrowEl = undefined;
  }

  render() {
    const fragment = document.createDocumentFragment();
    // select main
    const $main = $$("div", {
      class: "l-select-main",
    });
    const $tags = this._renderSelectedLabels();
    $main.appendChild($tags);
    // filter
    if (this.filterable) {
      let placeholder = this.placeholder;
      if (this.selectedLabels.length > 0) {
        placeholder = "";
      }
      if (!this.multiple && this.selectedLabels.length > 0) {
        placeholder = this.selectedLabels[0];
      }
      $main.appendChild(
        $$("input", {
          class: "l-select-filter",
          placeholder,
        })
      );
    }
    fragment.appendChild($main);
    // select arrow
    const $arrow = $$("l-arrow-down-icon", {
      class: "l-select-arrow",
    });
    fragment.appendChild($arrow);
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
    return $$("l-tag", {
      type: "info",
      class: "l-selected-item",
      "data-index": index,
      closeable,
      textContent: label,
    });
  }

  private _reRenderLabels() {
    let $main = $one(".l-select-main", this.root);
    if ($main) {
      const $children = $(".l-selected-item", $main) as HTMLElement[];
      if ($children.length > 0) {
        // 移除原有节点
        iterate($children, (child) => {
          if (child && child != this._searchEl) {
            child.remove();
          }
        });
      }
      const $tags = this._renderSelectedLabels();
      // 重新添加新的标签
      if (this._searchEl) {
        $main.insertBefore($tags, this._searchEl);
      } else {
        $main.appendChild($tags);
      }
    }
  }

  private _renderSelectedLabels() {
    const fragment = document.createDocumentFragment();
    let selectedLen = this.selectedLabels.length;
    if (selectedLen > 0) {
      if (!this.multiple) {
        // 单选
        if (!this.filterable) {
          fragment.appendChild(
            $$("span", {
              class: "l-selected-item",
              textContent: this.selectedLabels[0],
            })
          );
        }
      } else {
        // 多选

        if (this.collapseTags) {
          fragment.appendChild(this._renderTag(this.selectedLabels[0]));
          if (selectedLen > 1) {
            fragment.appendChild(
              this._renderTag(`+${selectedLen - 1}`, -1, false)
            );
          }
        } else {
          for (let i = 0; i < selectedLen; i++) {
            fragment.appendChild(this._renderTag(this.selectedLabels[i], i));
          }
        }
      }
    } else {
      if (!this.filterable) {
        fragment.appendChild(
          $$("span", {
            class: "l-selected-item l-select-placeholder",
            textContent: this.placeholder,
          })
        );
      }
    }

    return fragment;
  }
}
