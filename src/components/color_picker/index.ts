import { $one, on, off } from "utilane/browser";
import FormInner from "../form/form_inner";
import { setAttrs } from "../utils";
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
  protected get intrinsicDefaultValue(): string {
    return "#000000";
  }

  protected parseDefaultValue(value: string | null): string {
    return this.normalizeColor(value);
  }

  private normalizeColor(value: unknown): string {
    const color = typeof value === "string" ? value.trim() : "";
    return /^#[0-9a-f]{6}$/i.test(color) ? color.toLowerCase() : this.intrinsicDefaultValue;
  }

  public setValue(value: any): void {
    const color = this.normalizeColor(value);
    if (this.$picker) this.$picker.value = color;
    super.setValue(color);
  }
  connectedCallback(): void {
    this.loadStyleText([inputCss, css]);
    super.connectedCallback();
    this.$picker = $one("input", this.root) as HTMLInputElement;
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
    e.stopPropagation();
    const value = (e.target as HTMLInputElement).value;
    this.setValue(value);
    this.validateInput();
    this.emit("change", { detail: value });
  };
}