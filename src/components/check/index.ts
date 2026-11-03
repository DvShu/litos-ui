import FormInner from "../form/form_inner";
import { $$ } from "utilane/browser";
//@ts-ignore
import css from "./index.less?inline";
import { unitNumberStr } from "../utils";
import {
  createFormContextProvider,
  provideFormContext,
  requestFormContext,
  type FormContextProvider,
} from "../form/context";
import Check from "./check";

type CheckGroupState = { gap?: string };

export default class CheckGroup extends FormInner<CheckGroupState> {
  /** 已解码的普通 token 数组；更新时整体替换，不原地修改。 */
  values: string[] = [];
  multiple = true;
  private readonly provider = createFormContextProvider();
  private stopProviding?: () => void;

  constructor() {
    super(false);
    this._state = {};
  }

  setValue(value: any) {
    super.setValue(value);
    this.updateChecked();
    this.syncNativeValue();
  }

  static get observedAttributes(): string[] {
    return [...FormInner.observedAttributes, "gap", "required"];
  }

  attributeChange(name: string, _oldValue: any, newValue: any) {
    if (name === "gap") this._state.gap = unitNumberStr(newValue) as string;
    if (name === "required") this.syncGroupValidity();
  }

  protected updateDOM(changedProps: Set<string>): void {
    if (changedProps.has("gap")) this._updateGap();
  }

  connectedCallback(): void {
    this.stopProviding = provideFormContext(this, "group", this.provider);
    this.updateChecked();
    this.loadStyleText([css]);
    super.connectedCallback();
    this._updateGap();
  }

  afterInit(): void {
    this.addEventListener("change", this._handleChange);
  }

  beforeDestroy(): void {
    this.removeEventListener("change", this._handleChange);
    this.stopProviding?.();
    this.stopProviding = undefined;
    this.provider.dispose();
  }

  render() {
    return $$("slot");
  }

  protected disabledChange(): void {
    this.classList.toggle("is-disabled", this.isDisabled());
    this.publishConfiguration();
    this.syncGroupValidity();
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
    if (nearest !== this.provider) return;
    event.stopImmediatePropagation();
    const token = String(source.value ?? "on");
    const checked =
      (event as CustomEvent<{ checked?: boolean }>).detail?.checked ?? source.getChecked();
    const values = this.multiple
      ? checked
        ? [...new Set([...this.values, token])]
        : this.values.filter((value) => value !== token)
      : [token];
    // 保留 '&' 分隔的公开格式，只编码 token，不编码分隔符。
    this.value = this.multiple ? values.map(encodeURIComponent).join("&") : token;
    this.emit("change", {
      detail: { value: this.multiple ? [...this.values] : token },
      composed: true,
      bubbles: true,
    });
  };

  protected updateChecked() {
    if (this.value == null || this.value === "") this.values = [];
    else if (!this.multiple) this.values = [String(this.value)];
    else
      this.values = [
        ...new Set(
          String(this.value)
            .split("&")
            .map((token) => {
              try {
                return decodeURIComponent(token);
              } catch {
                return token;
              }
            }),
        ),
      ];
    this.publishConfiguration();
    this.syncGroupValidity();
  }

  protected serializeFormValue(): string | FormData | null {
    if (!this.multiple) return this.values?.[0] ?? null;
    const name = this.getName();
    if (!name || !this.values?.length) return null;
    const data = new FormData();
    for (const token of this.values) data.append(name, token);
    return data;
  }

  protected get nativeValueMissing(): boolean {
    return !this.values?.length;
  }

  private syncGroupValidity(): void {
    this.syncNativeValidity();
  }
}