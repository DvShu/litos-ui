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
  /** 范围选择器时，为了性能考虑, 立即改变一个日期后，会延迟 300ms 通知, 以响应其它选择器, 0 - 立即触发 */
  emitTimeout = 300;
  /** 原生 type 属性 */
  public type: "date" | "datetime-local" | "time" | "month" | "week" = "date";
  public width?: string;
  /** 日期范围 */
  min?: string;
  max?: string;
  allowEmpty = true;

  #inners: HTMLInputElement[] = [];
  #dateValues: string[] = [];
  #t = -1;
  // 至上一次触发change后，是否有更改
  #isUpdated = false;

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

  afterInit(): void {
    this.#inners = $(".l-date-inner", this.root) as HTMLInputElement[];
    on(this.#inners, "change", this.#change);
    if (this.range) {
      on(this.#inners, "focus", this.#handleFocus);
      on(this.#inners, "blur", this.#handleBlur);
    }
  }

  beforeDestroy(): void {
    off(this.#inners, "change", this.#change);
    if (this.range) {
      off(this.#inners, "focus", this.#handleFocus);
      off(this.#inners, "blur", this.#handleBlur);
    }
    this.#clearTimer();
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
    fragment.appendChild(this.#createInner(0));
    if (this.range) {
      const $divier = $$("span", {
        class: "l-date-range-divider",
        textContent: "-",
      });
      fragment.appendChild($divier);
      fragment.appendChild(this.#createInner(1));
    }
    return fragment;
  }

  #createInner(index: 0 | 1 = 0) {
    return $$("input", {
      type: this.type,
      class: `l-date-inner l-date-inner${index}`,
      name: this.getName(),
      value: this.#dateValues[index],
      "l-datepicker": `${index}`,
      disabled: this.isDisabled(),
      min: this.min,
      max: this.max,
    });
  }

  #change = (e: Event) => {
    const $target = e.target as HTMLInputElement;
    const index = Number($target.getAttribute("l-datepicker"));
    let value = $target.value;
    if (!value && !this.allowEmpty) {
      value = this._resetValue || "";
      value = value.split(",")[index];
      $target.value = value;
    }
    this.#dateValues[index] = value;
    const newValue = this.#dateValues.join(",");
    if (newValue !== this._value) {
      this.setValue(this.#dateValues.join(","));
      this.#isUpdated = true;
    }

    if (index === 0 && this.#inners.length > 1) {
      this.#inners[1].min = value;
    } else if (index === 1) {
      this.#inners[0].max = value;
    }

    if (this.range) {
      this.#timerEmitChange();
    } else {
      this.#emitChange();
    }
  };

  #clearTimer() {
    if (this.#t !== -1) {
      clearTimeout(this.#t);
      this.#t = -1;
    }
  }

  #timerEmitChange() {
    if (this.#isUpdated) {
      this.#clearTimer();
      this.#t = setTimeout(() => {
        this.#emitChange();
        this.#isUpdated = false;
      }, this.emitTimeout) as any;
    }
  }

  #handleFocus = () => {
    this.#clearTimer();
  };

  #handleBlur = () => {
    this.#timerEmitChange();
  };

  #emitChange() {
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: {
          value: this.getValue(),
          dateStr: this.#dateValues,
          dates: this.#dateValues.map((dateStr) => parse(dateStr)),
        },
      })
    );
  }
}
