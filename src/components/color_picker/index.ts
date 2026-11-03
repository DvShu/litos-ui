import { $one, on, off } from "utilane/browser";
import FormInner from "../form/form_inner";
import { initAttr, setAttrs } from "../utils";
//@ts-ignore
import inputCss from "../input/index.less?inline";
//@ts-ignore
import css from "./index.less?inline";

export default class ColorPicker extends FormInner {
  public static baseName = "color-picker";

  static get observedAttributes() {
    return [...new Set(FormInner.observedAttributes)];
  }
  public $picker?: HTMLInputElement;
  public _value = "#000000";

  constructor() {
    super();
    initAttr(this);
  }
  public setValue(value: any): void {
    super.setValue(value);
    if (this.$picker) {
      this.$picker.value = value;
    }
    this.syncNativeValue();
  }
  connectedCallback(): void {
    this.loadStyleText([inputCss, css]);
    super.connectedCallback();
    this.$picker = $one("input", this.root) as HTMLInputElement;
    if (this._resetValue == null) this._resetValue = this.value;
    this.syncNativeValue();
    on(this.$picker, "change", this._handleChange);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.$picker) {
      off(this.$picker, "change", this._handleChange);
      this.$picker = undefined;
    }
  }
  render() {
    const $picker = document.createElement("input");
    setAttrs($picker, [
      ["value", this.value],
      ["disabled", this.isDisabled()],
      ["type", "color"],
      ["class", "l-input l-color-picker"],
    ]);
    return $picker;
  }

  protected disabledChange(): void {
    if (this.$picker) {
      this.$picker.disabled = this.isDisabled();
    }
  }

  private _handleChange = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    super.setValue(value);
    this.emit("change", { detail: value });
  };
}