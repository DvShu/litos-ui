import FormInner from "../form/form_inner";
import css from "./index.less?inline";
import inputCss from "../input/input_inner.less?inline";
import { $$, on, off } from "ph-utils/dom";
import { unitNumberStr } from "../utils";
import { Popover } from "../utils/popover";

type DatePickerState = {
  width?: string;
};

export default class DatePicker extends FormInner<DatePickerState> {
  public static baseName = "date-picker";

  private _popover: Popover;

  public constructor() {
    super();
    this.version = 2;
    this._state = {};
    this._popover = new Popover({
      trigger: "manual",
      reference: this,
      placement: "bottom-start",
      arrow: false,
      offset: 5,
      theme: "date-picker",
      // 提供自定义的内容渲染函数, 初次渲染时调用
      contentRender: this._popoverContentRender,
      onOutsideTap: this._onOuterTap,
    });
  }

  afterInit(): void {
    this._updateWidth();
    on(this, "click", this._handleTap);
  }

  beforeDestroy(): void {
    this._popover.destroy();
    on(this, "off", this._handleTap);
    this._popover = undefined as any;
  }

  static get observedAttributes() {
    return ["width"];
  }

  attributeChange(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case "width":
        this._state.width = unitNumberStr(newValue);
        break;
    }
  }

  protected updateDOM(changedProps: Set<string>): void {
    if (changedProps.has("width")) {
      this._updateWidth();
    }
  }

  render_v2(): { template?: string | HTMLElement | DocumentFragment; style?: string | string[] } {
    const fragment = document.createDocumentFragment();
    // input
    const $input = $$("input", { class: "l-input__inner", placeholder: "请选择日期" });
    fragment.appendChild($input);
    // icon
    const $icon = $$("l-calendar-icon", { class: "icon" });
    fragment.appendChild($icon);
    return {
      style: [css, inputCss],
      template: fragment,
    };
  }

  private _popoverContentRender() {
    const fragment = $$("div", { class: "l-date-picker-panel" });
    const $header = $$("div", { class: "l-date-picker--header" });
    const $superPrevBtn = $$("button", {
      type: "button",
      "aria-label": "上一年",
      class: "l-date-picker-header-btn",
      innerHTML: "<l-d-arrow-left-icon></l-d-arrow-left-icon>",
    });
    $header.appendChild($superPrevBtn);
    const $prevBtn = $$("button", {
      type: "button",
      "aria-label": "上一月",
      class: "l-date-picker-header-btn",
      innerHTML: "<l-arrow-left-icon></l-arrow-left-icon>",
    });
    $header.appendChild($prevBtn);
    const $monthYear = $$("button", {
      class: "l-date-picker-header-btn l-date-picker-year-month",
      textContent: "2026-04",
    });
    $header.appendChild($monthYear);
    const $superNextBtn = $$("button", {
      type: "button",
      "aria-label": "下一年",
      class: "l-date-picker-header-btn",
      innerHTML: "<l-arrow-right-icon></l-arrow-right-icon>",
    });
    $header.appendChild($superNextBtn);
    const $nextBtn = $$("button", {
      type: "button",
      "aria-label": "下一月",
      class: "l-date-picker-header-btn",
      innerHTML: "<l-d-arrow-right-icon></l-d-arrow-right-icon>",
    });
    $header.appendChild($nextBtn);
    fragment.appendChild($header);

    const $calendar = $$("l-calendar", { class: "l-date-picker--calendar" });
    const $body = $$("div", { class: "l-date-picker--body" });
    $body.appendChild($calendar);
    fragment.appendChild($body);

    const $footer = $$("div", { class: "l-date-picker--footer" });
    const $todayBtn = $$("l-button", { textContent: "此刻" });
    $footer.appendChild($todayBtn);
    fragment.appendChild($footer);

    return fragment;
  }

  private _updateWidth() {
    if (this._state.width) {
      this.style.setProperty("--l-date-picker-width", this._state.width);
    } else {
      this.style.removeProperty("--l-date-picker-width");
    }
  }

  private _handleTap = () => {
    if (!this._popover.isShow()) {
      this._popover.show(this);
    }
  };

  private _onOuterTap = (_e: Event, isReference: boolean, isPopover: boolean) => {
    if (isReference) return;
    if (!isPopover) this._popover.hide();
  };
}