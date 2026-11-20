import FormInner from "../form/form_inner";
import { $$ } from "utilane/browser";
//@ts-ignore
import css from "./index.less?inline";
import { unitNumberStr } from "../utils";
import {
  createFormContextProvider,
  provideFormContext,
  requestFormContext,
  type FormContextField,
  type FormContextProvider,
} from "../form/context";
import Check from "./check";

type CheckGroupState = { gap?: string };

export default class CheckGroup extends FormInner<CheckGroupState> {
  /** 已解码的普通 token 数组；更新时整体替换，不原地修改。 */
  values: string[] = [];
  multiple = true;
  private selectedRadio?: Check;
  private readonly provider = createFormContextProvider();
  private readonly groupProvider = {
    ...this.provider,
    registerField: (field: FormContextField) => {
      const unregister = this.provider.registerField(field);
      // Handle changes on the member so its event cannot reach public group
      // listeners first, regardless of mount order. Member listeners still run.
      if (field.target instanceof Check)
        field.target.addEventListener("change", this._handleChange);
      this.syncMembers();
      return () => {
        if (unregister()) {
          field.target.removeEventListener("change", this._handleChange);
          this.syncMembers();
        }
      };
    },
    fieldStateChanged: () => this.syncMembers(),
    getFieldChecked: (target: EventTarget) =>
      target instanceof Check && this.isMemberChecked(target),
    requestFieldChecked: (target: EventTarget, checked: boolean) => {
      if (target instanceof Check) this.setMemberChecked(target, checked);
    },
    getRadioMembers: () => this.getRadioMembers(),
  };
  private stopProviding?: () => void;

  constructor() {
    super();
    this._state = {};
  }

  setValue(value: any) {
    this.updateChecked(value);
    super.setValue(value);
    this.publishConfiguration();
  }

  protected get intrinsicDefaultValue(): string | null {
    return this.multiple ? "" : null;
  }

  get defaultValue(): any {
    return super.defaultValue;
  }

  set defaultValue(value: any) {
    if (!this.multiple && value == null) this.removeAttribute("value");
    else super.defaultValue = value;
  }

  static get observedAttributes(): string[] {
    return [...FormInner.observedAttributes, "gap", "required"];
  }

  attributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === "gap") this._state.gap = unitNumberStr(newValue) as string;
    if (name === "required") this.syncNativeValidity();
  }

  protected updateDOM(changedProps: Set<string>): void {
    if (changedProps.has("gap")) this._updateGap();
  }

  connectedCallback(): void {
    this.stopProviding = provideFormContext(this, "group", this.groupProvider);
    this.updateChecked(this.value);
    this.publishConfiguration();
    this.loadStyleText([css]);
    super.connectedCallback();
    // A child can upgrade before its group is defined.
    for (const child of this.querySelectorAll("*")) {
      if (child instanceof Check && requestFormContext(child, "group") === this.groupProvider)
        child.refreshFormContext();
    }
    this._updateGap();
  }

  beforeDestroy(): void {
    for (const { target } of this.provider.getFields())
      target.removeEventListener("change", this._handleChange);
    this.stopProviding?.();
    this.stopProviding = undefined;
    this.provider.dispose();
    this.selectedRadio = undefined;
  }

  render() {
    return $$("slot");
  }

  protected disabledChange(): void {
    this.classList.toggle("is-disabled", this.isDisabled());
    this.publishConfiguration();
    this.syncNativeValidity();
  }

  private publishConfiguration(): void {
    // 自定义元素升级或父类构造期间也可能触发属性同步。
    this.provider?.updateConfiguration({
      values: [...this.values],
      multiple: this.multiple,
      disabled: this.isDisabled(),
    });
  }

  _updateGap = () => {
    if (this._state.gap) this.style.setProperty("--l-check-gap", this._state.gap);
    else this.style.removeProperty("--l-check-gap");
  };

  private _handleChange = (event: Event) => {
    const source = event.composedPath()[0];
    if (!(source instanceof Check)) return;
    const nearest: FormContextProvider | undefined = requestFormContext(source, "group");
    if (nearest !== this.groupProvider) return;
    event.stopPropagation();
    const checked =
      (event as CustomEvent<{ checked?: boolean }>).detail?.checked ?? source.getChecked();
    this.setMemberChecked(source, checked);
    this.validateInput();
    this.emit("change", {
      detail: { value: this.multiple ? [...this.values] : source.token },
      composed: true,
      bubbles: true,
    });
  };

  private isMemberChecked(member: Check): boolean {
    return this.multiple ? this.values.includes(member.token) : this.selectedRadio === member;
  }

  private setMemberChecked(member: Check, checked: boolean): void {
    if (this.isMemberChecked(member) === checked) return;
    if (!this.multiple) {
      this.selectedRadio = checked ? member : undefined;
      this.value = checked ? member.token : null;
      return;
    }

    const values = checked
      ? [...this.values, member.token]
      : this.values.filter((value) => value !== member.token);
    this.value = this.encodeValues(values);
  }

  private encodeValues(values: readonly string[]): string {
    // '&' 解码为一个空 token，保留 '' 表示没有任何选项。
    return values.length === 1 && values[0] === "" ? "&" : values.map(encodeURIComponent).join("&");
  }

  protected updateChecked(value: any): void {
    if (value == null || (this.multiple && value === "")) this.values = [];
    else if (!this.multiple) this.values = [Check.normalizeToken(String(value))];
    else
      this.values = [
        ...new Set(
          String(value)
            .split("&")
            .map((token) => {
              try {
                token = decodeURIComponent(token);
              } catch {
                // Preserve legacy tokens containing malformed percent escapes.
              }
              return Check.normalizeToken(token);
            }),
        ),
      ];
    this.reconcileRadio();
  }

  private reconcileRadio(): void {
    if (this.multiple) return;
    const [token] = this.values;
    const fields = this.provider?.getFields() ?? [];
    if (
      this.selectedRadio?.token === token &&
      fields.some(({ target }) => target === this.selectedRadio)
    )
      return;
    this.selectedRadio = fields
      .map(({ target }) => target)
      .find((target): target is Check => target instanceof Check && target.token === token);
  }

  private syncMembers(): void {
    const previous = this.selectedRadio;
    this.reconcileRadio();
    if (previous !== this.selectedRadio) this.publishConfiguration();
    if (!this.multiple) Check.syncRadioTabStops(this.getRadioMembers(), this.selectedRadio);
    this.syncNativeValue();
  }

  private getRadioMembers(): Check[] {
    if (this.multiple) return [];
    return this.provider
      .getFields()
      .map(({ target }) => target)
      .filter(
        (target): target is Check => target instanceof Check && target._inputType === "radio",
      );
  }

  protected serializeFormValue(): string | FormData | null {
    const values = this.matchingValues(false);
    if (!this.multiple) return values[0] ?? null;
    const name = this.getName();
    if (!name || !values.length) return null;
    const data = new FormData();
    for (const token of values) data.append(name, token);
    return data;
  }

  public get requiredSelection(): boolean {
    return this.matchingValues(false).length > 0;
  }

  protected get nativeValueMissing(): boolean {
    return !this.requiredSelection;
  }

  public get valueSnapshot(): any {
    const values = this.matchingValues(true);
    if (values.length === this.values.length) return this.value;
    return this.multiple ? this.encodeValues(values) : null;
  }

  private matchingValues(includeDisabled: boolean): string[] {
    if (!this.multiple)
      return this.selectedRadio && (includeDisabled || !this.selectedRadio.isDisabled())
        ? [this.selectedRadio.token]
        : [];

    const tokens = new Set<string>();
    for (const { target } of this.provider?.getFields() ?? []) {
      if (target instanceof Check && (includeDisabled || !target.isDisabled()))
        tokens.add(target.token);
    }
    return (this.values ?? []).filter((value) => tokens.has(value));
  }

  protected serializeFormState(): string | null {
    if (this.multiple) return super.serializeFormState();
    const value = this.value ?? null;
    return JSON.stringify({ version: 1, value, emptySelected: value === "" || undefined });
  }

  public formStateRestoreCallback(
    state: string | File | FormData | null,
    mode: "restore" | "autocomplete",
  ): void {
    if (!this.multiple && typeof state === "string") {
      try {
        const decoded = JSON.parse(state);
        // 旧版本用空字符串保存无选择的状态。
        if (decoded?.version === 1 && decoded.value === "" && !decoded.emptySelected)
          state = JSON.stringify({ version: 1, value: null });
      } catch {
        // 基类会处理无法解析的恢复值。
      }
    }
    super.formStateRestoreCallback(state, mode);
  }

  public reset(): void {
    this.selectedRadio = undefined;
    super.reset();
  }
}