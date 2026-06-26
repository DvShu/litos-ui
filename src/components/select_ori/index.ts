import FormInner from "../form/form_inner";
import { tagAttrs } from "../utils";
import { $one, off, on } from "ph-utils/dom";
//@ts-ignore
import inputcss from "../input/input_inner.less?inline";
import css from "./index.less?inline";

type Option = { label: string; value: string };

export default class SelectOri extends FormInner {
  public static baseName = "select-ori";

  private $select?: HTMLSelectElement;

  constructor() {
    super();
    this.version = 2;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.$select = $one("select", this.root) as HTMLSelectElement;
    if (this.value) {
      this.$select.value = this.value;
    }
    on(this.$select, "change", this._handleChange);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.$select) {
      off(this.$select, "change", this._handleChange);
    }
    this.$select = undefined;
  }

  render_v2(): { template?: string | HTMLElement | DocumentFragment; style?: string | string[] } {
    return {
      template: this.render(),
      style: [inputcss, css],
    };
  }

  render() {
    let $children = this.innerHTML.trim();
    const attrs = tagAttrs([
      ["name", this.getName()],
      ["disabled", this.isDisabled()],
    ]);
    return `<select class="l-input__inner"${attrs}>${$children}</select>`;
  }

  protected disabledChange(): void {
    if (this.$select) {
      this.$select.disabled = this.isDisabled();
    }
  }

  public setOptions(options: Option[]) {
    if (!this.$select) return;
    const $children = options.map((option) => {
      return `<option value="${option.value}">${option.label}</option>`;
    });
    this.$select.innerHTML = $children.join("");
  }

  public appendOptions(options: Option[]) {
    if (!this.$select) return;
    const fragment = document.createDocumentFragment();
    for (let i = 0, len = options.length; i < len; i++) {
      const option = options[i];
      const $option = document.createElement("option");
      $option.value = option.value;
      $option.innerHTML = option.label;
      fragment.appendChild($option);
    }
    this.$select.appendChild(fragment);
  }

  public reset(): void {
    super.reset();
    if (this.$select) this.$select.value = this.value;
  }

  public setValue(value: any): void {
    super.setValue(value);
    if (this.$select) this.$select.value = this.value;
  }

  private _handleChange = (e: Event) => {
    const value = (e.target as HTMLSelectElement).value;
    super.setValue(value);
    this.dispatchEvent(new CustomEvent("change", { detail: value }));
  };
}