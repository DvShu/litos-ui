import { parseAttrValue, kebabToCamel, unitNumberStr } from "../utils";
//@ts-ignore
import css from "./index.less?inline";
import { $$, $one, iterate, $, on, off, shouldEventNext } from "utilane/browser";
import FormInner from "../form/form_inner";
import { Popover } from "../utils/popover";
import { debounce } from "utilane/browser";

export type SelectOption = {
  class?: string;
  disabled?: boolean;
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
  /** 无匹配选项时的提示文案 */
  emptyText: string;
};

function isObjectValue(value: unknown): boolean {
  return value !== null && typeof value === "object";
}

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
  private editingSearch = false;
  // [] and [""] both reflect to an empty value attribute.
  private emptyOptionDefault = false;
  private reflectingEmptyOptionDefault = false;

  constructor() {
    super(false);
    this.version = 2;
    this._state = {
      filterable: false,
      placeholder: "请选择",
      emptyText: "暂无数据",
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
    if (!this.rendered) return;
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

  protected get intrinsicDefaultValue(): string | string[] {
    return this._state.multiple ? [] : "";
  }

  public override get defaultValue(): any {
    if (this._state.multiple && this.emptyOptionDefault) return [""];
    return super.defaultValue;
  }

  public override set defaultValue(value: any) {
    this.reflectingEmptyOptionDefault =
      Array.isArray(value) && value.length === 1 && value[0] === "";
    try {
      super.defaultValue = value;
    } finally {
      this.reflectingEmptyOptionDefault = false;
    }
  }

  public override attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (name === "value") {
      const previous = this.emptyOptionDefault;
      this.emptyOptionDefault = newValue === "" && this.reflectingEmptyOptionDefault;
      this.reflectingEmptyOptionDefault = false;
      // The base class skips identical attribute strings.
      if (oldValue === newValue && previous !== this.emptyOptionDefault) this.applyDefaultValue();
    }
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  protected parseDefaultValue(value: string | null): string | string[] {
    return value === null ? this.intrinsicDefaultValue : this.normalizeValue(value);
  }

  protected formatDefaultValue(value: any): string {
    return Array.isArray(value) ? value.join(",") : String(value ?? "");
  }

  private normalizeValue(value: any): any {
    if (!this._state.multiple) return Array.isArray(value) ? (value[0] ?? "") : value;
    if (value == null || value === "") return [];
    if (Array.isArray(value)) return [...value];
    return typeof value === "string" ? value.split(",") : [value];
  }

  public setValue(value: any): void {
    super.setValue(this.normalizeValue(value));
    this._updateSelectedLabels();
    this._reRenderLabels();
    if (this.isEmpty()) this._toggleClearable(true);
    this._updatePopoverContent();
    this.syncNativeValue();
  }

  protected get nativeValueMissing(): boolean {
    return this.isEmpty();
  }

  private get hasObjectValue(): boolean {
    const value = this.getValue();
    if (this._state.multiple && Array.isArray(value)) return value.some(isObjectValue);
    return isObjectValue(value);
  }

  protected get nativeSubmissionError(): string | undefined {
    if (this.name && this.hasObjectValue && this.serializeFormValue() === null)
      return "对象选项无法作为表单值提交，请使用选项标识。";
  }

  protected get nativeConstraintValues(): readonly unknown[] {
    return this.hasObjectValue ? [] : super.nativeConstraintValues;
  }

  protected get formStateRestorationEnabled(): boolean {
    return !this.hasObjectValue;
  }

  protected serializeFormValue(): string | FormData | null {
    if (this.hasObjectValue) return null;
    const values = this.getValue();
    if (!this._state.multiple) return values == null ? null : String(values);
    const data = new FormData();
    if (this.name) {
      for (const value of Array.isArray(values)
        ? values
        : values == null || values === ""
          ? []
          : [values]) {
        data.append(this.name, String(value ?? ""));
      }
    }
    return data;
  }

  private _updateSelectedLabels() {
    const { labelField, valueField, multiple } = this._state;
    const options = this._backOptions ?? this._options;
    const value = this.value;
    const values: unknown[] = value == null ? [] : multiple ? value : [value];
    this.selectedLabels = values.flatMap((value: unknown) => {
      const option = options?.find((item) => item[valueField] === value);
      if (!option && !multiple && value === "") return [];
      return [String(option?.[labelField] ?? value ?? "")];
    });
  }

  static get observedAttributes() {
    return [
      ...new Set([
        ...FormInner.observedAttributes,
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
        "empty-text",
      ]),
    ];
  }

  protected attributeChange(name: string, _oldValue: string, newValue: string): void {
    switch (name) {
      case "width":
        this._state.width = unitNumberStr(newValue) as string;
        break;
      case "label-field":
      case "value-field":
        this._state[kebabToCamel(name) as "valueField"] = newValue ?? name.replace("-field", "");
        break;
      case "empty-text":
        this._state.emptyText = newValue ?? "暂无数据";
        break;
      case "placeholder":
        this._state.placeholder = newValue ?? "请选择";
        break;
      case "multiple":
        this._state.multiple = parseAttrValue(newValue, false, name);
        if (!this.dirtyValue) this.applyDefaultValue();
        else {
          // Changing selection mode normalizes the live value, not its reset baseline.
          this.setValue(this.value ?? this.intrinsicDefaultValue);
        }
        break;
      case "clearable":
      case "filterable":
      case "collapse-tags":
      case "remote":
        this._state[kebabToCamel(name) as "multiple"] = parseAttrValue(newValue, false, name);
        break;
      case "loading":
        this.setLoading(parseAttrValue(newValue, false, name));
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
    if (changedProps.has("placeholder")) {
      this._reRenderLabels();
    }
    if (changedProps.has("label-field") || changedProps.has("value-field")) {
      this._updateSelectedLabels();
      this._reRenderLabels();
    }
    if (["label-field", "value-field", "empty-text"].some((name) => changedProps.has(name))) {
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
    this._updateSelectedLabels();
    this._reRenderLabels(this._state.remote && this.editingSearch);
    this._updatePopoverContent();
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
            class: [
              "l-select-option",
              itemSelected ? "l-select-option--selected" : undefined,
              item.disabled ? "l-select-option--disabled" : undefined,
            ],
            "aria-disabled": item.disabled ? "true" : undefined,
            "data-action": item.disabled ? undefined : `${i}`,
          },
          lichildren,
        );
        children.push($li.outerHTML);
      }
    }
    if (children.length === 0) {
      const $li = $$("li", {
        class: "l-select-option l-select-option--empty",
        textContent: this._state.emptyText,
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
        this.root.appendChild(
          $$("l-close-filled-icon", {
            class: "l-select-clear",
            "data-action": "clear",
          }),
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
    if (this.isDisabled()) return;
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
    if (this.isDisabled()) return;
    e.stopPropagation();
    const [next, action, _target] = shouldEventNext(
      e,
      "data-action",
      e.currentTarget as HTMLElement,
    );
    if (next) {
      if (action === "clear") {
        if (!this.isEmpty()) this._commitSelection(this._state.multiple ? [] : "");
        this._toggleClearable(true);
      } else {
        const index = Number(action);
        const values = this.value;
        if (
          Array.isArray(values) &&
          Number.isInteger(index) &&
          index >= 0 &&
          index < values.length
        ) {
          this._commitSelection(values.filter((_, i) => i !== index));
          this._searchEl?.focus();
        }
      }
      return;
    }
    this._togglePopover();
  };

  private _commitSelection(value: any) {
    this.setValue(value);
    this.validateInput();
    this.emit("change", {
      detail: {
        value: Array.isArray(this.value) ? [...this.value] : this.value,
        labels: [...this.selectedLabels],
      },
    });
  }

  private _onTap = () => {
    this._togglePopover();
  };

  private _onSearchBlur = () => {
    this._updateSearchValue();
  };

  private _onSearchInput = (e: Event) => {
    if (this.inputHandler && this._state.filterable) {
      this.editingSearch = true;
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
        reference: this,
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
          if (!isPopover && !isReference) {
            this._popover?.hide();
          }
        },
        onPopoverAction: (action) => {
          if (this.isDisabled() || action === "") return;
          const option = this._options?.[Number(action)];
          if (!option || option.disabled) return;
          const value = option[this._state.valueField];
          if (this._state.multiple) {
            const values = this.value as unknown[];
            const next = values.includes(value)
              ? values.filter((item) => item !== value)
              : [...values, value];
            this._commitSelection(next);
            this._searchEl?.focus();
          } else {
            if (this.value !== (value ?? "")) this._commitSelection(value);
            this._popover?.hide();
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
      this.editingSearch = false;
    }
    this.filter = undefined;
  }

  render_v2() {
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
      let placeholder = this._state.placeholder;
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
      this._popover?.hide();
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

  private _reRenderLabels(preserveQuery = false) {
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
    this._updateSearchValue(preserveQuery);
  }

  private _updateSearchValue(preserveQuery = false) {
    if (this._searchEl) {
      let placeholder = this._state.placeholder;
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
      if (!preserveQuery) {
        this._searchEl.value = value;
        this.editingSearch = false;
      }
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