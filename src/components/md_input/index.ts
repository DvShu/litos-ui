import { $$, addClass, $one, on, off } from "utilane/browser";
import FormInner from "../form/form_inner";
import { initAttr } from "../utils";
// @ts-ignore
import css from "./index.less?inline";
import { isBlank, random } from "utilane";

export default class MdInput extends FormInner {
  public static baseName = "md-input";

  protected _ignoreInitAttrs = ["value", "autocomplete", "htmlType"];

  /** 是否显示四周边框 */
  public outline = false;
  public get htmlType(): "text" | "number" | "password" | "tel" {
    const value = (this.getAttribute("html-type") || "text").toLowerCase();
    return value === "number" || value === "password" || value === "tel" ? value : "text";
  }
  public set htmlType(value: "text" | "number" | "password" | "tel") {
    this.setAttribute("html-type", value);
  }
  public inputmode?: "text" | "numeric" | "decimal" | "tel";
  public label?: string;

  protected override get formStateRestorationEnabled(): boolean {
    return this.htmlType !== "password";
  }
  protected override get acceptsAutocompleteText(): boolean {
    return true;
  }

  static get observedAttributes() {
    return [...new Set([...FormInner.observedAttributes, "disabled", "html-type", "autocomplete"])];
  }

  protected override attributeChange(name: string, _oldValue: string, _newValue: string): void {
    const input = $one("input", this.root) as HTMLInputElement | undefined;
    if (name === "html-type" && input) {
      input.type = this.htmlType;
      this.syncEditorValue(input);
    }
  }

  private syncEditorValue(input: HTMLInputElement): void {
    if (input.value === this.value) return;
    const dirty = this.dirtyValue;
    this.setValue(input.value);
    this.dirtyValue = dirty;
  }

  connectedCallback(): void {
    initAttr(this);
    this.loadStyleText(css);
    super.connectedCallback();
  }

  render() {
    if (!isBlank(this.value)) {
      addClass(this, "l-has-value");
    }
    if (this.outline) {
      addClass(this, "l-md-input-outline");
    }
    const fragment = document.createDocumentFragment();
    const innerId = `l-md-input-${random(8)}`;
    // inner
    const $inner = $$("input", {
      class: "l-md-input__inner",
      type: this.htmlType,
      value: this.value ?? "",
      disabled: this.isDisabled(),
      inputmode: this.inputmode,
      id: innerId,
    });
    fragment.appendChild($inner);
    if (this.label) {
      // label
      const $label = $$("label", {
        class: "l-md-input__label",
        for: innerId,
      });
      $label.textContent = this.label;
      fragment.appendChild($label);
    }
    return fragment;
  }

  public setValue(value: any): void {
    const text = String(value ?? "");
    const $inner = $one("input", this.root) as HTMLInputElement;
    const type = this.htmlType;
    const editor = $inner ?? (type === "number" ? this.ownerDocument.createElement("input") : null);
    if (editor && !$inner) editor.type = type;
    if (editor && editor.value !== text) editor.value = text;
    const current = editor?.value ?? text;
    this.classList.toggle("l-has-value", !isBlank(current));
    super.setValue(current);
  }

  protected disabledChange(): void {
    const input = $one("input", this.root) as HTMLInputElement;
    if (input) input.disabled = this.isDisabled();
  }

  protected innerBlockChange(innerBlock: boolean): void {
    this.classList.toggle("is-block", innerBlock);
  }

  afterInit(): void {
    const $inner = $one("input", this.root) as HTMLInputElement;
    if ($inner) {
      this.syncEditorValue($inner);
      this.syncAutocomplete();
      on($inner, "input", this.#handleInput);
    }
  }

  beforeDestroy(): void {
    const $inner = $one("input", this.root) as HTMLInputElement;
    if ($inner) {
      off($inner, "input", this.#handleInput);
    }
  }

  #handleInput = (e: Event) => {
    const $target = e.target as HTMLInputElement;
    this.setValue($target.value);
    this.validateInput();
  };
}