import { $one, on, off } from "ph-utils/dom";
import FormInner from "../form/form_inner";
import { initAttr, setAttrs } from "../util";

export default class ColorPicker extends FormInner {
  public static baseName = "color-picker";
  public $picker?: HTMLInputElement;
  public _value = "#000000";
  private _changeEmit: CustomEvent;

  constructor() {
    super();
    initAttr(this);
    this._changeEmit = new CustomEvent("change");
  }
  public setValue(value: any): void {
    super.setValue(value);
    if (this.$picker) {
      this.$picker.value = value;
    }
  }
  connectedCallback(): void {
    this.loadStyle(["input", "color_picker"]);
    super.connectedCallback();
    this.$picker = $one("input", this.root) as HTMLInputElement;
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
      ["name", this.getName()],
      ["type", "color"],
      ["class", "l-input l-color-picker"],
    ]);
    return $picker;
  }

  protected _changeDisabled(): void {
    if (this.$picker) {
      this.$picker.disabled = this.isDisabled();
    }
  }

  private _handleChange = (e: Event) => {
    super.setValue((e.target as HTMLInputElement).value);
    this.dispatchEvent(this._changeEmit);
  };
}
