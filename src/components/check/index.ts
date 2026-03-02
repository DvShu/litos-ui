import FormInner from "../form/form_inner";
import { on, off, $$ } from "ph-utils/dom";
//@ts-ignore
import css from "./index.less?inline";
import { unitNumberStr } from "../utils";
import { signal } from "alien-signals";

type CheckGroupState = {
  gap?: string;
};

export default class CheckGroup extends FormInner<CheckGroupState> {
  values: Signal<string[]>;
  multiple: boolean;
  _state: CheckGroupState;

  setValue(value: string) {
    super.setValue(value);
    if (this.rendered) {
      this.updateChecked();
    }
  }

  constructor() {
    super(false);
    this.multiple = true;
    this.values = signal([]);
    this._state = {};
  }

  static get observedAttributes(): string[] {
    return ["disabled", "value", "name", "inner-block", "gap"];
  }

  attributeChange(name: string, _oldValue: any, newValue: any) {
    switch (name) {
      case "gap":
        this._state.gap = unitNumberStr(newValue);
        break;
    }
  }

  protected updateDOM(changedProps: Set<string>): void {
    if (changedProps.has("gap")) {
      this._updateGap();
    }
  }

  connectedCallback(): void {
    this.loadStyleText([css]);
    this.updateChecked();
    super.connectedCallback();
    this._updateGap();
  }

  afterInit(): void {
    on(this.root, "change", this.#handleChange as any);
    on(this, "check-context-request", this._privide);
  }

  beforeDestroy(): void {
    off(this.root, "change", this.#handleChange as any);
    off(this, "check-context-request", this._privide);
    this.values([]);
  }

  render() {
    return $$("slot");
  }

  _privide = (e: CustomEvent) => {
    const { context, callback } = e.detail;
    if (context === "check-context-request") {
      callback(this.values);
    }
  };

  _updateGap = () => {
    if (this._state.gap) {
      this.style.setProperty("--l-check-gap", this._state.gap);
    } else {
      this.style.removeProperty("--l-check-gap");
    }
  };

  #handleChange = (e: CustomEvent) => {
    e.stopPropagation(); // 阻止事件传播
    const v = e.detail.value;
    const checked = this.values();
    let hasValue = checked.indexOf(v);
    if (!this.multiple) {
      // 单选且未选中则选中
      if (hasValue === -1) {
        this.setAttribute("value", v);
      }
    } else {
      // 多选, 如果选中则取消选中，否则选中
      if (hasValue !== -1) {
        checked.splice(hasValue, 1);
      } else {
        checked.push(v);
      }
      this.setAttribute("value", checked.join("&"));
    }
    this.emit("change", {
      detail: { value: this.multiple ? checked : v },
      composed: true,
    });
  };

  protected updateChecked() {
    let v: string[] = [];
    if (this.value) {
      if (this.multiple) {
        const values = this.value.split("&") as string[];
        v.push(...values.map((v) => decodeURIComponent(v)));
      } else {
        v = [this.value];
      }
    } else {
      v = [];
    }
    this.values(v);
  }
}