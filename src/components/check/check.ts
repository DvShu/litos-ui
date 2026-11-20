import FormInner from "../form/form_inner";
import { FORM_CONTEXT_EVENTS, requestFormContext, type FormContextProvider } from "../form/context";
import { referenceText } from "../form/accessibility";
import { parseAttrValue } from "../utils";
import { $$ } from "utilane/browser";

type CheckState = {
  button: boolean;
  label?: string;
  indeterminate: boolean;
};

type RadioScope = { owner: Node; name: string };

/** 分处不同 ShadowRoot 的原生 radio 不会自动互斥，由宿主按 owner/name 协调。 */
const standaloneRadios = new Set<Check>();

const radioDirection = new Map<string, number>([
  ["ArrowLeft", -1],
  ["ArrowUp", -1],
  ["ArrowRight", 1],
  ["ArrowDown", 1],
]);

export default class Check extends FormInner<CheckState> {
  declare checked: boolean;
  private _checked = false;
  private dirtyChecked = false;
  private _groupProvider?: FormContextProvider;
  private radioScope?: RadioScope;
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

  protected get intrinsicDefaultValue(): string {
    return "on";
  }

  public get defaultChecked(): boolean {
    return this.hasAttribute("checked");
  }

  public set defaultChecked(value: boolean) {
    this.toggleAttribute("checked", !!value);
  }

  setChecked(isChecked: boolean) {
    if (this.grouped) return;
    this.dirtyChecked = true;
    this.applyChecked(isChecked);
  }

  /** Default and group synchronization must not dirty the checked property. */
  private applyChecked(isChecked: boolean): void {
    const changed = this._checked !== !!isChecked;
    this._checked = !!isChecked;
    const scope = this.radioScope;
    if (scope && this._checked) this.uncheckPeers(scope);
    if (changed && !this.grouped) this.notifyFieldValueChanged();
    this.checkedChange();
    if (scope) this.syncRadioPeers(scope);
  }

  getChecked() {
    return this._checked;
  }

  protected get fallbackAccessibleName(): string | undefined {
    return this.root
      .querySelector("slot")
      ?.assignedNodes({ flatten: true })
      .map((node) => {
        if (node instanceof Text) return node.data.trim();
        if (node instanceof Element && !node.matches('[aria-hidden="true"],[hidden],script,style'))
          return referenceText([node]);
      })
      .filter(Boolean)
      .join(" ");
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
    if (Object.prototype.hasOwnProperty.call(this, "defaultChecked")) {
      const value = this.defaultChecked;
      delete (this as any).defaultChecked;
      this.defaultChecked = value;
    }
    this._groupProvider = requestFormContext(this, "group");
    this.addEventListener(FORM_CONTEXT_EVENTS.configuration, this._updateGroup);
    super.connectedCallback();
    this._updateGroup();
    this.disabledChange();
    this._updateIndeterminate();
    this.applyChecked(this.getChecked());
  }

  protected refreshConfiguration(): void {
    if (this.isConnected) this._groupProvider = requestFormContext(this, "group");
    super.refreshConfiguration();
    this.updateRadioScope(this.getRadioScope());
    this.applyGroupChecked();
  }

  afterInit(): void {
    this.addEventListener("click", this._handleClick);
    this.$input?.addEventListener("change", this._handleNativeChange);
    this.$input?.addEventListener("input", this._stopNativeEvent);
    this.$input?.addEventListener("keydown", this._handleKeydown);
  }

  beforeDestroy(): void {
    this.removeEventListener("click", this._handleClick);
    this.removeEventListener(FORM_CONTEXT_EVENTS.configuration, this._updateGroup);
    this.$input?.removeEventListener("change", this._handleNativeChange);
    this.$input?.removeEventListener("input", this._stopNativeEvent);
    this.$input?.removeEventListener("keydown", this._handleKeydown);
    this.updateRadioScope(undefined);
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
        // Like native boolean attributes, checked="false" is still present.
        if (this.grouped) this.applyGroupChecked();
        else if (!this.dirtyChecked) this.applyChecked(this.defaultChecked);
        break;
      case "button":
        this._state.button = parseAttrValue(newValue, false, name);
        break;
      case "indeterminate":
        this._state.indeterminate = parseAttrValue(newValue, false, name);
        this._updateIndeterminate();
        break;
      case "label": {
        this._state.label = newValue;
        const slot = this.root.querySelector("slot");
        if (slot) slot.textContent = newValue;
        break;
      }
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
    this._groupProvider?.fieldStateChanged?.();
    if (this.radioScope) this.syncStandaloneRadioTabStops(this.radioMembers(this.radioScope));
  }

  /** @internal */
  static normalizeToken(token: string): string {
    // In Unicode mode the range only matches isolated surrogate code units.
    return token.replace(/[\uD800-\uDFFF]/gu, "\uFFFD");
  }

  /** @internal */
  get token(): string {
    return Check.normalizeToken(String(this.value ?? "on"));
  }

  protected serializeFormValue(): string | null {
    return !this.grouped && this.getChecked() ? this.token : null;
  }

  protected serializeFormState(): string {
    return JSON.stringify({
      version: 1,
      value: this.value ?? "on",
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
      if (
        restored?.version !== 1 ||
        !Object.hasOwn(restored, "value") ||
        typeof restored.checked !== "boolean" ||
        (restored.indeterminate !== undefined && typeof restored.indeterminate !== "boolean")
      )
        return;
      super.formStateRestoreCallback(state, _mode);
      this._state.indeterminate = !!restored.indeterminate;
      if (this.grouped) this.applyGroupChecked();
      else this.setChecked(restored.checked);
      this._updateIndeterminate();
    } catch {
      // 不认识或损坏的浏览器恢复状态不能覆盖当前 UI。
    }
  }

  public reset(): void {
    super.reset();
    this.dirtyChecked = false;
    if (this.grouped) this._updateGroup();
    else this.applyChecked(this.defaultChecked);
    // Native form.reset() leaves indeterminate unchanged.
    this._updateIndeterminate();
  }

  public get requiredSelection(): boolean {
    if (this.getChecked()) return true;
    const scope = this.getRadioScope();
    return !!scope && this.radioMembers(scope).some((peer) => peer.getChecked());
  }

  protected get nativeValueMissing(): boolean {
    return !this.requiredSelection;
  }

  private _updateIndeterminate() {
    this.classList.toggle("is-indeterminate", !!this._state.indeterminate);
    if (this.$input) this.$input.indeterminate = !!this._state.indeterminate;
  }

  private _updateGroup = () => {
    if (this.isConnected) this._groupProvider = requestFormContext(this, "group");
    this.disabledChange();
    this.applyGroupChecked();
  };

  private applyGroupChecked(): void {
    const provider = this._groupProvider;
    if (!provider) return;
    const checked =
      provider.getFieldChecked?.(this) ?? provider.getSnapshot().values?.includes(this.token);
    this.applyChecked(checked ?? false);
  }

  private getRadioScope(): RadioScope | undefined {
    const name = this.getName();
    if (!name || !this.isConnected || this.grouped || this._inputType !== "radio") return;
    // A standalone l-form may still be creating or assigning its native owner.
    const owner = this.form ?? (this.hasAttribute("form") ? null : this.closest("l-form"));
    return { owner: owner ?? this.getRootNode(), name };
  }

  private updateRadioScope(scope: RadioScope | undefined): void {
    const previous = this.radioScope;
    if (!scope && !this.grouped) this.$input?.removeAttribute("tabindex");
    if (previous?.owner === scope?.owner && previous?.name === scope?.name) return;
    this.radioScope = scope;
    if (scope) standaloneRadios.add(this);
    else standaloneRadios.delete(this);

    if (previous) this.syncRadioPeers(previous);
    if (scope) {
      if (this.getChecked()) this.uncheckPeers(scope);
      this.syncRadioPeers(scope);
    }
  }

  private radioMembers(scope: RadioScope): Check[] {
    return [...standaloneRadios].filter(
      (peer) => peer.radioScope?.owner === scope.owner && peer.radioScope.name === scope.name,
    );
  }

  private syncRadioPeers(scope: RadioScope): void {
    const radios = this.radioMembers(scope);
    for (const peer of radios) if (peer !== this) peer.syncNativeValidity();
    this.syncStandaloneRadioTabStops(radios);
  }

  private syncStandaloneRadioTabStops(radios: Check[]): void {
    Check.syncRadioTabStops(
      radios,
      radios.find((radio) => radio.getChecked()),
    );
  }

  private static inDocumentOrder(radios: Check[]): Check[] {
    return radios.sort((first, second) => {
      const position = first.compareDocumentPosition(second);
      if (!position || position & Node.DOCUMENT_POSITION_DISCONNECTED) return 0;
      return position & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
    });
  }

  /** @internal 单选组仅让当前选中项或第一个可用项进入 Tab 顺序。 */
  static syncRadioTabStops(radios: readonly Check[], selected?: Check): void {
    const enabled = radios.filter((radio) => radio.$input && !radio.isDisabled());
    const tabStop =
      selected && enabled.includes(selected) ? selected : Check.inDocumentOrder(enabled)[0];
    for (const radio of radios) {
      if (radio.$input) radio.$input.tabIndex = radio === tabStop ? 0 : -1;
    }
  }

  private uncheckPeers(scope: RadioScope): void {
    for (const peer of this.radioMembers(scope)) {
      if (peer !== this && peer.getChecked()) peer.applyChecked(false);
    }
  }

  private _stopNativeEvent = (event: Event) => event.stopPropagation();
  private _handleNativeChange = (event: Event) => {
    event.stopPropagation();
    // A successful native activation clears indeterminate. The host owns this state.
    this._updateIndeterminate();
    this._doChangeAction();
  };
  private _handleKeydown = (event: KeyboardEvent) => {
    if (event.defaultPrevented || this.isDisabled()) return;
    if (event.key === "Enter") {
      event.preventDefault();
      this._doChangeAction();
      return;
    }
    const step = radioDirection.get(event.key);
    if (this._inputType !== "radio" || !step || event.altKey || event.ctrlKey || event.metaKey)
      return;

    const members = this.radioScope
      ? this.radioMembers(this.radioScope)
      : (this._groupProvider?.getRadioMembers?.() ?? []);
    const radios = Check.inDocumentOrder(
      members.filter(
        (member): member is Check =>
          member instanceof Check && !!member.$input && !member.isDisabled(),
      ),
    );
    const current = radios.indexOf(this);
    if (current === -1) return;

    event.preventDefault();
    const next = radios[(current + step + radios.length) % radios.length];
    if (next !== this) {
      next.$input?.focus();
      next.$input?.click();
    }
  };
  private _handleClick = (event: Event) => {
    const path = event.composedPath();
    if (event.defaultPrevented || path[0] === this.$input) return;
    if (path.some((node) => node instanceof Check && node !== this)) return;
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
    if (this.grouped) {
      this.dirtyChecked = true;
      this._groupProvider?.requestFieldChecked?.(this, checked);
    } else {
      this.setChecked(checked);
      this.validateInput();
    }
    this.emitChange(checked);
  }
}