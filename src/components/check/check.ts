import FormInner from "../form/form_inner";
import { FORM_CONTEXT_EVENTS, requestFormContext, type FormContextProvider } from "../form/context";
import { parseAttrValue } from "../utils";
import { $$ } from "utilane/browser";

type CheckState = {
  button: boolean;
  label?: string;
  indeterminate: boolean;
};

/** 分处不同 ShadowRoot 的原生 radio 不会自动互斥，由宿主按 owner/name 协调。 */
const standaloneRadios = new Set<Check>();

export default class Check extends FormInner<CheckState> {
  private _checked = false;
  private _defaultChecked = false;
  private _checkedBaseline = false;
  private _groupProvider?: FormContextProvider;
  _inputType: "radio" | "checkbox" = "radio";
  $input?: HTMLInputElement;

  constructor() {
    super();
    const initialChecked = Object.getOwnPropertyDescriptor(this, "checked")?.value;
    Object.defineProperty(this, "checked", {
      configurable: true,
      enumerable: true,
      get: this.getChecked,
      set: this.setChecked,
    });
    if (initialChecked !== undefined) this.setChecked(initialChecked);
  }

  public get grouped(): boolean {
    return !!this._groupProvider;
  }

  setChecked(isChecked: boolean) {
    this._checked = !!isChecked;
    if (!this._checkedBaseline) {
      this._defaultChecked = this._checked;
      this._checkedBaseline = true;
    }
    if (this._checked && !this.grouped && this._inputType === "radio") {
      this.uncheckPeers();
    }
    this.checkedChange();
    if (!this.grouped && this._inputType === "radio") {
      for (const peer of standaloneRadios) {
        if (peer !== this && peer.form === this.form && peer.getName() === this.getName())
          peer.syncNativeValidity();
      }
    }
  }

  getChecked() {
    return this._checked;
  }

  static get observedAttributes() {
    return [
      "checked",
      "label",
      "button",
      "indeterminate",
      "required",
      ...FormInner.observedAttributes,
    ];
  }

  connectedCallback(): void {
    this._groupProvider = requestFormContext(this, "group");
    this.addEventListener(FORM_CONTEXT_EVENTS.configuration, this._updateGroup);
    standaloneRadios.add(this);
    super.connectedCallback();
    this._checkedBaseline = true;
    this._updateGroup();
    this.disabledChange();
    this._updateIndeterminate();
    this.setChecked(this.getChecked());
  }

  protected refreshConfiguration(): void {
    if (this.isConnected) this._groupProvider = requestFormContext(this, "group");
    super.refreshConfiguration();
    if (this._groupProvider)
      this.setChecked((this._groupProvider.getSnapshot().values ?? []).includes(this.token));
    if (this.getChecked() && !this.grouped && this._inputType === "radio") this.uncheckPeers();
  }

  afterInit(): void {
    this.addEventListener("click", this._handleClick);
    this.$input?.addEventListener("change", this._stopNativeEvent);
    this.$input?.addEventListener("input", this._stopNativeEvent);
    this.$input?.addEventListener("keydown", this._handleKeydown);
  }

  beforeDestroy(): void {
    this.removeEventListener("click", this._handleClick);
    this.removeEventListener(FORM_CONTEXT_EVENTS.configuration, this._updateGroup);
    this.$input?.removeEventListener("change", this._stopNativeEvent);
    this.$input?.removeEventListener("input", this._stopNativeEvent);
    this.$input?.removeEventListener("keydown", this._handleKeydown);
    standaloneRadios.delete(this);
    this._groupProvider = undefined;
    this.$input = undefined;
  }

  render() {
    const fragment = document.createDocumentFragment();
    // 内部 input 不设置 name，原生提交只由 FACE 宿主负责。
    const input = $$("input", {
      type: this._inputType,
      class: "l-check__input",
      checked: this.getChecked(),
    }) as HTMLInputElement;
    this.$input = input;
    fragment.appendChild(input);
    if (!this._state.button) fragment.appendChild($$("span", { class: "l-check__inner" }));
    const label = $$("label", { class: "l-check__label", part: "label" });
    label.appendChild($$("slot", { textContent: this._state.label }));
    fragment.appendChild(label);
    return fragment;
  }

  setValue(value: any): void {
    super.setValue(value);
    this._updateGroup();
    this.checkedChange();
  }

  protected attributeChange(name: string, _oldValue: string, newValue: string): void {
    switch (name) {
      case "checked":
        this._defaultChecked = parseAttrValue(newValue, false, "checked");
        this._checkedBaseline = true;
        this.setChecked(this._defaultChecked);
        break;
      case "button":
        this._state.button = parseAttrValue(newValue, false, name);
        break;
      case "indeterminate":
        this._state.indeterminate = parseAttrValue(newValue, false, name);
        this._updateIndeterminate();
        break;
      case "label":
        this._state.label = newValue;
        break;
      case "required":
        this.checkedChange();
        break;
    }
  }

  protected checkedChange(): void {
    this.classList.toggle("is-checked", this.getChecked());
    if (this.$input) {
      this.$input.checked = this.getChecked();
      this.$input.value = this.token;
    }
    this.syncNativeValue();
    this.syncNativeValidity();
  }

  protected disabledChange(): void {
    this.classList.toggle("is-disabled", this.isDisabled());
    if (this.$input) this.$input.disabled = this.isDisabled();
    this.syncNativeValidity();
  }

  private get token(): string {
    return String(this.value ?? "on");
  }

  protected serializeFormValue(): string | null {
    return !this.grouped && this.getChecked() ? this.token : null;
  }

  protected serializeFormState(): string {
    return JSON.stringify({
      version: 1,
      value: this.value ?? "",
      checked: this.getChecked(),
      indeterminate: !!this._state.indeterminate,
    });
  }

  public formStateRestoreCallback(
    state: string | File | FormData | null,
    _mode: "restore" | "autocomplete",
  ): void {
    if (typeof state !== "string") return;
    try {
      const restored = JSON.parse(state);
      if (restored?.version !== 1 || typeof restored.checked !== "boolean") return;
      super.formStateRestoreCallback(state, _mode);
      this._state.indeterminate = !!restored.indeterminate;
      this.setChecked(restored.checked);
      this._updateIndeterminate();
    } catch {
      // 不认识或损坏的浏览器恢复状态不能覆盖当前 UI。
    }
  }

  public reset(): void {
    super.reset();
    if (this.grouped) this._updateGroup();
    else this.setChecked(this._defaultChecked);
    this._updateIndeterminate();
  }

  protected get nativeValueMissing(): boolean {
    if (this.getChecked()) return false;
    if (this._inputType !== "radio" || !this.getName()) return true;
    return ![...standaloneRadios].some(
      (peer) =>
        !peer.grouped &&
        peer._inputType === "radio" &&
        peer.form === this.form &&
        (this.form !== null || peer.getRootNode() === this.getRootNode()) &&
        peer.getName() === this.getName() &&
        peer.getChecked(),
    );
  }

  private _updateIndeterminate() {
    this.classList.toggle("is-indeterminate", !!this._state.indeterminate);
    if (this.$input) this.$input.indeterminate = !!this._state.indeterminate;
  }

  private _updateGroup = () => {
    if (this.isConnected) this._groupProvider = requestFormContext(this, "group");
    if (this._groupProvider) {
      const snapshot = this._groupProvider.getSnapshot();
      this.setChecked((snapshot.values ?? []).includes(this.token));
    }
    this.disabledChange();
  };

  private uncheckPeers(): void {
    const name = this.getName();
    if (!name || !this.isConnected) return;
    for (const peer of standaloneRadios) {
      if (
        peer !== this &&
        !peer.grouped &&
        peer._inputType === "radio" &&
        peer.form === this.form &&
        (this.form !== null || peer.getRootNode() === this.getRootNode()) &&
        peer.getName() === name &&
        peer.getChecked()
      ) {
        peer.setChecked(false);
      }
    }
  }

  private _stopNativeEvent = (event: Event) => event.stopPropagation();
  private _handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      this._doChangeAction();
    }
  };
  private _handleClick = (event: Event) => {
    if (event.composedPath().some((node) => node instanceof Check && node !== this)) return;
    this._doChangeAction();
  };

  emitChange(checked = this.getChecked()) {
    this.emit("change", {
      detail: { value: this.token, name: this.getName(), checked },
      composed: true,
      bubbles: true,
    });
  }

  _doChangeAction() {
    if (this.isDisabled()) {
      if (this.$input) this.$input.checked = this.getChecked();
      return;
    }
    if (this._inputType === "radio" && this.getChecked()) return;
    const checked = this._inputType === "radio" || !this.getChecked();
    this.setChecked(checked);
    this.emitChange(checked);
  }
}