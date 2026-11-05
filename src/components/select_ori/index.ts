import FormInner from "../form/form_inner";
import { tagAttrs } from "../utils";
import { $one, off, on } from "utilane/browser";
//@ts-ignore
import inputcss from "../input/input_inner.less?inline";
import css from "./index.less?inline";

type Option = { label: string; value: string; defaultSelected?: boolean };

export default class SelectOri extends FormInner {
  public static baseName = "select-ori";

  static get observedAttributes() {
    return [...new Set(FormInner.observedAttributes)];
  }

  private $select?: HTMLSelectElement;
  private optionsMarkup?: string;

  constructor() {
    super();
    this.version = 2;
  }

  protected get intrinsicDefaultValue(): string {
    // Reconstruct from defaultSelected attributes, not the live selected state.
    // Native single-select chooses the last explicit default, otherwise the
    // first enabled option. A fresh select also handles disabled optgroups.
    const select = document.createElement("select");
    select.innerHTML = this.$select?.innerHTML ?? this.optionsMarkup ?? this.innerHTML;
    return select.value;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.$select = $one("select", this.root) as HTMLSelectElement;
    this.$select.value = this.value ?? "";
    this.syncNativeValue();
    on(this.$select, "change", this._handleChange);
  }

  disconnectedCallback(): void {
    this.optionsMarkup = this.$select?.innerHTML ?? this.optionsMarkup;
    super.disconnectedCallback();
    if (this.$select) {
      off(this.$select, "change", this._handleChange);
    }
    this.$select = undefined;
  }

  render_v2() {
    return {
      template: this.render(),
      style: [inputcss, css],
    };
  }

  render() {
    const children = this.optionsMarkup ?? this.innerHTML.trim();
    const attrs = tagAttrs([["disabled", this.isDisabled()]]);
    return `<select class="l-input__inner"${attrs}>${children}</select>`;
  }

  protected disabledChange(): void {
    if (this.$select) {
      this.$select.disabled = this.isDisabled();
    }
  }

  private createOption(option: Option): HTMLOptionElement {
    const element = document.createElement("option");
    element.value = option.value;
    element.textContent = option.label;
    element.defaultSelected = option.defaultSelected ?? false;
    return element;
  }

  private syncOptionsValue(): void {
    if (!this.$select) return;
    if (!this.dirtyValue) this.applyDefaultValue();
    else this.$select.value = this.value ?? "";
    this.syncNativeValue();
  }

  public setOptions(options: Option[]) {
    if (!this.$select) return;
    this.$select.replaceChildren(...options.map((option) => this.createOption(option)));
    this.syncOptionsValue();
  }

  public appendOptions(options: Option[]) {
    if (!this.$select) return;
    this.$select.append(...options.map((option) => this.createOption(option)));
    this.syncOptionsValue();
  }

  public setValue(value: any): void {
    super.setValue(value);
    if (this.$select) this.$select.value = this.value ?? "";
    this.syncNativeValue();
  }

  private _handleChange = (e: Event) => {
    const value = (e.target as HTMLSelectElement).value;
    super.setValue(value);
    this.emit("change", { detail: value });
  };
}