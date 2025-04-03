import { initAttr } from "../utils";
// @ts-ignore
import css from "./index.less?inline";
import FormInner from "../form/form_inner";
import { $$, formatStyle, $, iterate, on, off } from "ph-utils/dom";
import { parse } from "ph-utils/date";

export default class DatePicker extends FormInner {
  public static baseName = "date-picker";

  /** 是否显示日期范围选择 */
  public range = false;
  /** 原生 type 属性 */
  public type: "date" | "datetime-local" | "time" | "month" | "week" = "date";
  public width?: string;
  allowEmpty = true;

  #inners: HTMLInputElement[] = [];
  #dateValues: string[] = [];

  set value(value: string) {
    this.setValue(value);
    this.#dateValues = value.split(",");
    iterate(this.#inners, (inner, index) => {
      (inner as HTMLInputElement).value = this.#dateValues[index];
    });
  }

  connectedCallback(): void {
    initAttr(this);
    this.loadStyleText(css);
    const styles: Record<string, string> = {};
    if (this.width) {
      styles["--l-date-picker-width"] = this.width;
    }
    this.style.cssText = formatStyle(styles);
    super.connectedCallback();
  }

  initEvents(): void {
    this.#inners = $(".l-date-inner", this.root) as HTMLInputElement[];
    on(this.#inners, "change", this.#change);
  }

  removeEvents(): void {
    off(this.#inners, "change", this.#change);
  }

  protected attributeChange(
    name: string,
    oldValue: string,
    newValue: string
  ): void {
    if (name === "value" && newValue !== this._value) {
      this.value = newValue;
    }
  }

  render() {
    const fragment = document.createDocumentFragment();
    const $inner = $$("input", {
      type: this.type,
      class: "l-date-inner",
      name: this.getName(),
      value: this.#dateValues[0],
      "l-datepicker": "0",
      disabled: this.isDisabled(),
    });
    fragment.appendChild($inner);
    return fragment;
  }

  #change = (e: Event) => {
    const $target = e.target as HTMLInputElement;
    const index = Number($target.getAttribute("l-datepicker"));
    let value = $target.value;
    if (!value && !this.allowEmpty) {
      value = this._resetValue || "";
      $target.value = value;
    }
    this.#dateValues[index] = value;
    this.setValue(this.#dateValues.join(","));
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: {
          value: this.getValue(),
          dateStr: this.#dateValues,
          dates: this.#dateValues.map((dateStr) => parse(dateStr)),
        },
      })
    );
  };
}
