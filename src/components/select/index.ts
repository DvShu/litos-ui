import { parseAttrValue, kebabToCamel, unitNumberStr } from "../utils";
//@ts-ignore
import css from "./index.less?inline";
import { $$, $one, iterate, $, on, off, shouldEventNext } from "ph-utils/dom";
import FormInner from "../form/form_inner";
import { Popover } from "../utils/popover";
import { debounce } from "ph-utils/web";

export type SelectOption = {
  class?: string;
  render?: (
    option: SelectOption,
    isSelect: boolean,
    selectedValues?: any | any[],
  ) => HTMLElement | DocumentFragment;
  label?: string;
  value?: any;
  [index: string]: any;
};

type SelectState = {
  /** 是否启用过滤 */
  filterable?: boolean;
  placeholder: string;
  /** 选项 label 的字段名 */
  labelField: string;
  /** 选项 value 的字段名 */
  valueField: string;
  /** 是否支持多选 */
  multiple?: boolean;
  /** 多选时是否折叠标签 */
  collapseTags?: boolean;

  /** 宽度 */
  width?: string;
  /** 是否可清除 */
  clearable?: boolean;

  /** 是否远程搜索 */
  remote: boolean;
  /** 是否加载中, 远程搜索时使用 */
  loading?: boolean;
  /** 是否展开下拉选择 */
  expanded?: boolean;
};

export default class Select extends FormInner<SelectState> {
  public static baseName = "select";

  /** 选中的标签 */
  public selectedLabels: string[] = [];
  public filter?: (match: string, option: SelectOption) => boolean;

  public _options?: SelectOption[] = [];
  /** 备份数据, 搜索过滤时有用 */
  private _backOptions?: SelectOption[];
  public inputHandler?: (match: string) => void;
  /** 下拉弹窗主体 */
  private _popover?: Popover;
  private _searchEl?: HTMLInputElement;

  constructor() {
    super(true, false);
    this.version = 2;
    this._state = {
      filterable: false,
      placeholder: "请选择",
      labelField: "label",
      valueField: "value",
      multiple: false,
      collapseTags: false,
      clearable: false,
      remote: false,
    };
  }

  public setInputHandler(handler: (match: string) => void) {
    this.inputHandler = handler;
  }

  public setFilter(filter: (match: string, option: SelectOption) => boolean) {
    this.filter = filter;
  }

  public get loading() {
    return this._state.loading;
  }

  public set loading(loading: boolean | undefined) {
    this.setLoading(loading ?? false);
  }

  public setLoading(loading: boolean) {
    this._state.loading = loading;
    let $loading = $one(".l-select-loading", this.root);
    if (loading) {
      // 显示加载
      if (!$loading) {
        this.root.appendChild($$("l-loading-icon", { class: "l-select-loading" }));
      }
      this.classList.add("l-select--loading");
    }
    if ($loading) {
      this.classList.remove("l-select--loading");
      $loading.remove();
      $loading = null;
    }
  }

  public setExpanded(value: boolean) {
    this._state.expanded = value;
    if (value) {
      this.classList.add("l-select--expand");
      if (this._searchEl) {
        this._searchEl.focus();
      }
      // 更新滚动位置到第一个选中
      // queueMicrotask(() => {
      //   if (this._popover && this._popover.popoverElement) {
      //     const $firstSelect = $one(
      //       ".l-select-option--selected",
      //       this._popover.popoverElement
      //     );
      //     let offset = 0;
      //     if ($firstSelect) {
      //       offset = this._calculateOffset(
      //         $firstSelect,
      //         this._popover.popoverElement
      //       );
      //     }
      //     this._popover.popoverElement.scrollTo({ top: offset });
      //   }
      // });
    } else {
      this.classList.remove("l-select--expand");
    }
  }

  public setValue(value: string | string[] | number): void {
    let v: any[] = value as string[];
    if (typeof value === "string") {
      v = value.split(",");
    }
    if (this._state.multiple) {
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
    if (this._options) {
      this.selectedLabels = this._options
        .filter((item) => this._isOptionSelect(item[this._state.valueField as string]))
        .map((item) => item[this._state.labelField as string]);
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
      "remote",
    ];
  }

  protected attributeChange(name: string, _oldValue: string, newValue: string): void {
    switch (name) {
      case "width":
        this._state.width = unitNumberStr(newValue);
        break;
      case "label-field":
      case "value-field":
        this._state[name as "valueField"] = newValue;
        break;
      case "multiple":
      case "clearable":
      case "filterable":
      case "collapse-tags":
      case "remote":
        this._state[kebabToCamel(name) as "multiple"] = parseAttrValue(newValue, false, name);
        break;
    }
  }

  protected updateDOM(changedProps: Set<string>): void {
    if (changedProps.has("width")) {
      if (this._state.width) {
        this.style.setProperty("--l-select-width", this._state.width);
      } else {
        this.style.removeProperty("--l-select-width");
      }
    }
    if (changedProps.has("label-field") || changedProps.has("value-field")) {
      this._updatePopoverContent();
    }
  }

  public get options() {
    return this._options;
  }

  public set options(opts: SelectOption[] | undefined) {
    this.setOptions(opts);
  }

  public setOptions(options: SelectOption[] | undefined): void {
    this._options = options;
    this._backOptions = [...(options || [])];
    if (this._popover && this._state.expanded) {
      this._popover.updatePopoverContent();
    }
  }

  private _isOptionSelect(value?: any) {
    let isSelect = false;
    if (value != null && this.value != null) {
      if (this._state.multiple) {
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
          optionElement,
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
    if (this._options) {
      const len = this._options.length;
      for (let i = 0; i < len; i++) {
        const item = this._options[i];
        const value = item[this._state.valueField];
        const label = item[this._state.labelField];
        const itemSelected = this._isOptionSelect(value);
        const lichildren: HTMLElement[] = [
          // text
          $$("span", {
            class: "l-select-option-content",
            textContent: label,
            title: label,
          }),
        ];
        // select
        if (itemSelected) {
          lichildren.push(
            $$("l-select-icon", {
              class: "l-select-icon",
            }),
          );
        }
        const $li = $$(
          "li",
          {
            class: ["l-select-option", itemSelected ? "l-select-option--selected" : undefined],
            "data-action": `${i}`,
          },
          lichildren,
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

  private _calculateOffset(target: HTMLElement, scrollContainer: HTMLElement) {
    const targetRect = target.getBoundingClientRect();
    const scrollContainerRect = scrollContainer.getBoundingClientRect();
    return targetRect.top - scrollContainerRect.top + scrollContainer.scrollTop;
  }

  public isEmpty() {
    let isEmpty = true;
    if (!this._state.multiple && this.value != null && this.value !== "") {
      isEmpty = false;
    }
    if (this._state.multiple && this.value && this.value.length > 0) {
      isEmpty = false;
    }
    return isEmpty;
  }

  private _toggleClearable(isHide = false) {
    if (this._state.clearable) {
      // 显示 清除按钮
      let $clearIcon = $one(".l-select-clear", this.root);
      if (isHide || this.isEmpty() || this._state.loading) {
        if ($clearIcon) {
          $clearIcon.remove();
        }
        this.classList.remove("l-select--clearable");
        return;
      }
      if (!$clearIcon) {
        $$(
          "l-close-filled-icon",
          {
            class: "l-select-clear",
            "data-action": "clear",
          },
          this.root,
        );
      }
      this.classList.add("l-select--clearable");
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

  private _updatePopoverContent() {
    if (this._popover && this._state.expanded) {
      this._popover.updatePopoverContent();
    }
  }

  private _onRootTap = (e: Event) => {
    console.log("root tap");
    e.stopPropagation();
    const [next, action, target] = shouldEventNext(
      e,
      "data-action",
      e.currentTarget as HTMLElement,
    );
    if (next) {
      if (action === "clear") {
        this.value = this._state.multiple ? [] : "";
        this.selectedLabels = [];
        this._toggleClearable(true);
        this._reRenderLabels();
        this._updatePopoverContent();
      } else {
        const index = Number(action);
        this.selectedLabels.splice(index, 1);
        (this._value as any[]).splice(index, 1);
        this._updatePopoverContent();
        if (this._state.collapseTags) {
          this._reRenderLabels();
        } else {
          if (target.parentElement) {
            target.parentElement.remove();
            this._updateSearchValue();
          }
        }
        if (this._searchEl) {
          this._searchEl.focus();
        }
      }
      return;
    }
    this._togglePopover();
  };

  private _onTap = () => {
    this._togglePopover();
  };

  private _onSearchBlur = () => {
    this._updateSearchValue();
  };

  private _onSearchInput = (e: Event) => {
    if (this.inputHandler && this._state.filterable) {
      const searchValue = (e.target as HTMLInputElement).value;
      this.inputHandler(searchValue);
    }
  };

  private _handleFilte = (match: string) => {
    if (this._state.remote) {
      this.emit("search", { detail: { value: match } });
      return;
    }
    this._options = this._filteOption(match);
    if (this._popover && this._state.expanded) {
      this._popover.updatePopoverContent();
    }
  };

  private _filteOption(match: string) {
    let opts: SelectOption[] = [];
    if (this._backOptions) {
      opts = this._backOptions.filter((option) => {
        if (!match) return true;
        if (this.filter) {
          return this.filter(match, option);
        }
        return option[this._state.labelField].includes(match);
      });
    }
    return opts;
  }

  afterInit(): void {
    on(this, "mouseenter", this._onMouseEnter);
    on(this, "mouseleave", this._onMouseLeave);
    on(this.root, "click", this._onRootTap);
    on(this, "click", this._onTap);

    this._searchEl = $one(".l-select-filter", this.root) as HTMLInputElement;
    if (this._searchEl) {
      this.inputHandler = debounce(this._handleFilte, 300);
      on(this._searchEl, "input", this._onSearchInput);
      on(this._searchEl, "blur", this._onSearchBlur);
    }

    this.disabledChange();
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
        onOutsideTap: (_e, isReference, isPopover) => {
          if (!isPopover && !isReference) this._popover?.hide();
        },
        onPopoverAction: (action, target) => {
          if (action && this._options) {
            const index = Number(action);
            const option = this._options[index];
            const value = option[this._state.valueField];
            const label = option[this._state.labelField];
            let oldValue = this.value;
            let oldLabels = this.selectedLabels;
            if (this._state.multiple === true) {
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
            if (this._value != oldValue) {
              this.emit("change", {
                detail: { value: oldValue, labels: oldLabels }, // 兼容旧版本写法
              });
            }
            this._value = oldValue;
            this.selectedLabels = oldLabels;

            const isSelect = this._isOptionSelect(value);
            if (!this._state.multiple) {
              // 单选移除之前的选中态
              const $oldSelected = $(
                ".l-select-option--selected",
                target.parentElement as HTMLElement,
              ) as HTMLElement[];
              iterate($oldSelected, (oldOption) => {
                this._updateOptionSelect(oldOption, false);
              });
            }
            // 修改选中状态
            this._updateOptionSelect(target, isSelect);
            // 重新渲染标签
            this._reRenderLabels();
            if (!this._state.multiple && this._popover) {
              // 单选关闭弹窗
              this._popover.hide();
            }
            // 焦点
            if (this._searchEl && this._state.multiple) {
              this._searchEl.focus();
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
    this._options = undefined;
    if (this._popover) {
      this._popover.destroy();
      this._popover = undefined;
    }
    if (this._searchEl) {
      off(this._searchEl, "blur", this._onSearchBlur);
      off(this._searchEl, "input", this._onSearchInput);
      if (this.inputHandler) {
        try {
          (this.inputHandler as any).cancel();
          // eslint-disable-next-line
        } catch (_error) {
          // Ignore
        }
        this.inputHandler = undefined;
      }
      this._searchEl = undefined;
    }
    this.filter = undefined;
  }

  render_v2(): { template?: string | HTMLElement | DocumentFragment; style?: string | string[] } {
    return {
      template: this.render(),
      style: [css],
    };
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
    if (this._state.filterable) {
      let placeholder = this._state.placeholder || "请选择";
      let value = "";
      if (this.selectedLabels.length > 0) {
        if (!this._state.multiple) {
          placeholder = this.selectedLabels[0];
          value = this.selectedLabels[0];
        } else {
          placeholder = "";
        }
      }
      $main.appendChild(
        $$("input", {
          class: "l-select-filter",
          placeholder,
          value,
        }),
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
    const $tmpTag = $$("l-tag", {
      type: "info",
      class: "l-selected-item",
      textContent: label,
    });
    if (closeable) {
      const $closeWrapper = $$("div", {
        class: "l-select-tag-close",
        slot: "suffix",
        innerHTML: "<l-close-icon></l-close-icon>",
        "data-action": `${index}`,
      });
      $tmpTag.appendChild($closeWrapper);
    }
    return $tmpTag;
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
    this._updateSearchValue();
  }

  private _updateSearchValue() {
    if (this._searchEl) {
      let placeholder = this._state.placeholder || "请选择";
      let value = "";
      if (this.selectedLabels.length > 0) {
        if (!this._state.multiple) {
          placeholder = this.selectedLabels[0];
          value = this.selectedLabels[0];
        } else {
          placeholder = "";
        }
      }

      this._searchEl.placeholder = placeholder;
      this._searchEl.value = value;
    }
  }

  private _renderSelectedLabels() {
    const fragment = document.createDocumentFragment();
    let selectedLen = this.selectedLabels.length;
    if (selectedLen > 0) {
      if (!this._state.multiple) {
        // 单选
        if (!this._state.filterable) {
          fragment.appendChild(
            $$("span", {
              class: "l-selected-item",
              textContent: this.selectedLabels[0],
            }),
          );
        }
      } else {
        // 多选
        if (this._state.collapseTags) {
          fragment.appendChild(this._renderTag(this.selectedLabels[0]));
          if (selectedLen > 1) {
            fragment.appendChild(this._renderTag(`+${selectedLen - 1}`, -1, false));
          }
        } else {
          for (let i = 0; i < selectedLen; i++) {
            fragment.appendChild(this._renderTag(this.selectedLabels[i], i));
          }
        }
      }
    } else {
      if (!this._state.filterable) {
        fragment.appendChild(
          $$("span", {
            class: "l-selected-item l-select-placeholder",
            textContent: this._state.placeholder,
          }),
        );
      }
    }

    return fragment;
  }
}