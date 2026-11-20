// @ts-ignore
import css from "./index.less?inline";
import FormInner from "../form/form_inner";
import { $$, $, on, off } from "utilane/browser";
import { parse } from "utilane";
import { parseAttrValue, unitNumberStr } from "../utils";
import { readFormBooleanAttribute } from "../form/context";

type DateInputType = "date" | "datetime-local" | "time" | "month" | "week";

type DatePickerOriState = {
  /** 是否显示日期范围选择 */
  range: boolean;
  /** 区间 change 的延时，0 表示在下一个定时器任务派发。 */
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

  #inners: HTMLInputElement[] = [];
  #dateValues: string[];
  #reversedRange = false;
  #t?: number;
  // 至上一次触发change后，是否有更改
  #isUpdated = false;
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
  }

  protected parseDefaultValue(value: string | null): string {
    return this.#formatDateValues(this.#readDateValues(value).dates);
  }

  #createDateProbe(): HTMLInputElement {
    const probe = this.ownerDocument.createElement("input");
    probe.type = this.getAttribute("type") || this._state.type;
    return probe;
  }

  #readDateValues(value: string | null | undefined) {
    const [first, last = ""] = String(value ?? "").split(",", 2);
    const probe = this.#createDateProbe();
    probe.value = first;
    const start = probe.value;
    const range = parseAttrValue(this.getAttribute("range"), false, "range");
    if (!range) return { dates: [start], reversed: false };

    const startNumber = probe.valueAsNumber;
    probe.value = last;
    return { dates: [start, probe.value], reversed: startNumber > probe.valueAsNumber };
  }

  #formatDateValues(dates: readonly string[]): string {
    return dates.some(Boolean) ? dates.join(",") : "";
  }

  public setValue(value: string | null | undefined): void {
    const { dates, reversed } = this.#readDateValues(value);
    this.#clearTimer();
    this.#isUpdated = false;
    this.#dateValues = dates;
    this.#reversedRange = reversed;
    this.#syncInputs();
    super.setValue(this.#formatDateValues(dates));
  }

  /** 范围业务值仍是逗号串，原生日期约束分别校验两个端点。 */
  protected get nativeConstraintValues(): readonly unknown[] {
    return this._state.range
      ? [this.#dateValues[0] ?? "", this.#dateValues[1] ?? ""]
      : [this.#dateValues[0] ?? ""];
  }

  protected get nativeBadInput(): boolean {
    return this.#reversedRange;
  }

  protected disabledChange(): void {
    for (const input of this.#inners ?? []) input.disabled = this.isDisabled();
  }

  static get observedAttributes(): string[] {
    return [
      ...new Set([
        ...FormInner.observedAttributes,

        "range",
        "delay",
        "type",
        "width",
        "min",
        "max",
        "allow-empty",
      ]),
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
    this.#syncInputs();
  }

  beforeDestroy(): void {
    off(this.#inners, "change", this.#change);
    off(this.#inners, "focus", this.#handleFocus);
    off(this.#inners, "blur", this.#handleBlur);
    this.#clearTimer();
    this.#isUpdated = false;
    this.#inners = [];
  }

  protected attributeChange(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case "type":
        this._state.type = (newValue || "date") as DateInputType;
        this.#refreshValueFormat();
        break;
      case "min":
      case "max":
        this._state[name] = newValue as any;
        break;
      case "range":
        this._state.range = parseAttrValue(newValue, false, name);
        this.#refreshValueFormat();
        break;
      case "allow-empty":
        this._state.allowEmpty = parseAttrValue(newValue, true, name);
        break;
      case "delay":
        this._state.delay = parseAttrValue(newValue, 300);
        break;
      case "width":
        this._state.width = unitNumberStr(newValue) as string;
        break;
    }
  }

  protected updateDOM(changedProps: Set<string>): void {
    if (changedProps.has("width")) this._updateWidth();
    if (changedProps.has("range") && this.#inners.length !== (this._state.range ? 2 : 1)) {
      this.beforeDestroy();
      for (const node of this.root.querySelectorAll(".l-date-inner,.l-date-range-divider"))
        node.remove();
      this.root.appendChild(this.render());
      this.afterInit();
    }
    this.#syncInputs();
    this.syncNativeValue();
  }

  #refreshValueFormat(): void {
    if (this.dirtyValue) this.setValue(this.value);
    else this.applyDefaultValue();
  }

  #syncInputs(): void {
    for (const [index, input] of this.#inners.entries()) {
      input.type = this._state.type || "date";
      const value = this.#dateValues[index] ?? "";
      if (input.value !== value) input.value = value;
      for (const attr of ["min", "max", "step"] as const) {
        const value = this.getAttribute(attr);
        if (value == null) input.removeAttribute(attr);
        else input.setAttribute(attr, value);
      }
      input.readOnly = readFormBooleanAttribute(this.getAttribute("readonly")) ?? false;
      input.disabled = this.isDisabled();
    }
    const [first, last] = this.#inners;
    if (first && last) {
      // Intersect the range endpoint bounds with the host's configured limits.
      if (last.value && (!first.max || last.value < first.max)) first.max = last.value;
      if (first.value && (!last.min || first.value > last.min)) last.min = first.value;
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
      value: this.#dateValues[index],
      "l-datepicker": `${index}`,
      disabled: this.isDisabled() ? true : undefined,
      min: this._state.min,
      max: this._state.max,
    });
  }

  #change = (e: Event) => {
    const $target = e.target as HTMLInputElement;
    if (this.isDisabled() || $target.readOnly) return;
    const index = Number($target.getAttribute("l-datepicker"));
    if (index >= this.#dateValues.length) return;
    let value = $target.value;
    if (!value && !this._state.allowEmpty) {
      value = this.defaultValue;
      value = String(value).split(",")[index] ?? "";
      $target.value = value;
    }
    const dates = [...this.#dateValues];
    dates[index] = value;
    const newValue = this.#formatDateValues(this.#readDateValues(dates.join(",")).dates);
    if (newValue !== this.value) {
      this.setValue(newValue);
      this.validateInput();
      if (this._state.range) {
        this.#isUpdated = true;
        this.#timerEmitChange();
      } else {
        this.#emitChange();
      }
    }
  };

  #clearTimer() {
    if (this.#t !== undefined) {
      clearTimeout(this.#t);
      this.#t = undefined;
    }
  }

  #timerEmitChange() {
    if (this.#isUpdated) {
      this.#clearTimer();
      this.#t = setTimeout(() => {
        this.#t = undefined;
        this.#isUpdated = false;
        this.#emitChange();
      }, this._state.delay) as any;
    }
  }

  #handleFocus = () => {
    this.#clearTimer();
  };

  #handleBlur = () => {
    this.#timerEmitChange();
  };

  #eventDates(): Date[] {
    const type = this._state.type.toLowerCase();
    if (type !== "time" && type !== "week") return this.#dateValues.map((value) => parse(value));
    const probe = this.#createDateProbe();
    return this.#dateValues.map((value) => {
      probe.value = value;
      return probe.valueAsDate ?? parse(value);
    });
  }

  #emitChange() {
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: {
          value: this.getValue(),
          dateStr: [...this.#dateValues],
          dates: this.#eventDates(),
        },
      }),
    );
  }
}