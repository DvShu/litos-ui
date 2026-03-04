// @ts-ignore
import css from "./index.less?inline";
import FormInner from "../form/form_inner";
import { $$, $, on, off, iterate } from "ph-utils/dom";
import { parse } from "ph-utils/date";
import { kebabToCamel, parseAttrValue, unitNumberStr } from "../utils";

type DateInputType = "date" | "datetime-local" | "time" | "month" | "week";

type DatePickerOriState = {
  /** 是否显示日期范围选择 */
  range: boolean;
  /** 范围选择器时，为了性能考虑, 立即改变一个日期后，会延迟 300ms 通知, 以响应其它选择器, 0 - 立即触发 */
  delay: number;
  type: DateInputType;
  width?: string;
  /** 日期范围 */
  min?: string;
  max?: string;
  allowEmpty: boolean;
};

export default class DatePicker extends FormInner {
  public static baseName = "date-picker-ori";

  #inners!: HTMLInputElement[];
  #dateValues: string[];
  #t?: number;
  // 至上一次触发change后，是否有更改
  #isUpdated;
  _state: DatePickerOriState;

  public constructor() {
    super();
    this._state = {
      range: false,
      delay: 300,
      type: "date",
      allowEmpty: true,
    };
    this.#dateValues = [];
    this.#isUpdated = false;
  }

  public setValue(v: string) {
    super.setValue(v);
    this.#dateValues = v.split(",");
    if (this.rendered) {
      iterate(this.#inners, ($input, index) => {
        $input.value = this.#dateValues[index];
      });
    }
  }

  static get observedAttributes(): string[] {
    return [
      ...FormInner.observedAttributes,
      "range",
      "delay",
      "type",
      "width",
      "min",
      "max",
      "allow-empty",
    ];
  }

  connectedCallback(): void {
    this.loadStyleText(css);
    this._updateWidth();
    super.connectedCallback();
  }

  afterInit(): void {
    this.#inners = $(".l-date-inner", this.root) as HTMLInputElement[];
    on(this.#inners, "change", this.#change);
    if (this._state.range) {
      on(this.#inners, "focus", this.#handleFocus);
      on(this.#inners, "blur", this.#handleBlur);
    }
  }

  beforeDestroy(): void {
    off(this.#inners, "change", this.#change);
    if (this._state.range) {
      off(this.#inners, "focus", this.#handleFocus);
      off(this.#inners, "blur", this.#handleBlur);
    }
    this.#clearTimer();
  }

  protected attributeChange(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case "type":
      case "min":
      case "max":
        this._state[name] = newValue as any;
        break;
      case "range":
      case "allow-empty":
        this._state[kebabToCamel(name) as "range"] = parseAttrValue(newValue, false, name) as any;
        break;
      case "delay":
        this._state.delay = parseAttrValue(newValue, 300);
        break;
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

  private _updateWidth() {
    if (!this._state.width) {
      this.style.removeProperty("--l-date-picker-width");
    } else {
      this.style.setProperty("--l-date-picker-width", this._state.width);
    }
  }

  render() {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(this.#createInner(0));
    if (this._state.range) {
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
      type: this._state.type,
      class: `l-date-inner l-date-inner${index}`,
      name: this.getName(),
      value: this.#dateValues[index],
      "l-datepicker": `${index}`,
      disabled: this.isDisabled() ? true : undefined,
      min: this._state.min,
      max: this._state.max,
    });
  }

  #change = (e: Event) => {
    const $target = e.target as HTMLInputElement;
    const index = Number($target.getAttribute("l-datepicker"));
    let value = $target.value;
    if (!value && !this._state.allowEmpty) {
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

    if (this._state.range) {
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
      }, this._state.delay) as any;
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
      }),
    );
  }
}