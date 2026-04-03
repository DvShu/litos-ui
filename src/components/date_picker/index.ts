import FormInner from "../form/form_inner";
import css from "./index.less?inline";
import inputCss from "../input/input_inner.less?inline";
import { $$ } from "ph-utils/dom";
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
      trigger: "click",
      reference: this,
      placement: "bottom-start",
      arrow: false,
      offset: 5,
      theme: "date-picker",
      // 提供自定义的内容渲染函数, 初次渲染时调用
      contentRender() {
        const fragment = $$("div", { class: "l-date-picker-panel" });
        const $header = $$("div", { class: "l-date-picker--header" });
        $$(
          "button",
          {
            innerHTML: "L",
          },
          $header,
        );
        const $calendar = $$("l-calendar", { class: "l-date-picker--calendar" });
        fragment.appendChild($header);
        fragment.appendChild($calendar);
        return fragment;
      },
    });
  }

  afterInit(): void {
    this._updateWidth();
  }

  beforeDestroy(): void {
    this._popover.destroy();
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

  private _updateWidth() {
    if (this._state.width) {
      this.style.setProperty("--l-date-picker-width", this._state.width);
    } else {
      this.style.removeProperty("--l-date-picker-width");
    }
  }
}