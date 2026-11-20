type FormAutocompleteValue = "on" | "off";
type NativeControl = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

export function normalizeFormAutocomplete(value: string | null): FormAutocompleteValue | undefined {
  const normalized = value?.toLowerCase();
  return normalized === "on" || normalized === "off" ? normalized : undefined;
}

/** 只向本表单内未显式配置的原生控件传递默认值，不修改共享的祖先 form。 */
export class FormAutocomplete {
  private observer?: MutationObserver;
  private observedOwner?: HTMLFormElement;
  private readonly assigned = new Map<NativeControl, string>();

  constructor(
    private host: HTMLElement,
    private owner: () => { form?: HTMLFormElement; ownsForm: boolean },
    private publish: (value?: FormAutocompleteValue) => void,
  ) {}

  start(): void {
    if (this.observer) return;
    this.observer = new MutationObserver((records) => {
      this.readAuthoredChanges(records);
      this.refresh();
    });
    this.observe();
    this.refresh();
  }

  private observe(owner?: HTMLFormElement): void {
    this.observer!.disconnect();
    this.observer!.observe(this.host, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["autocomplete"],
    });
    if (owner && !this.host.contains(owner))
      this.observer!.observe(owner, { attributes: true, attributeFilter: ["autocomplete"] });
    this.observedOwner = owner;
  }

  private readAuthoredChanges(records: MutationRecord[]): void {
    // 自身写入的记录已同步取走；即便用户写入相同值，也转为显式配置。
    for (const record of records) {
      if (record.type === "attributes") this.assigned.delete(record.target as NativeControl);
    }
  }

  refresh(): void {
    this.readAuthoredChanges(this.observer?.takeRecords() ?? []);
    const { form, ownsForm } = this.owner();
    if (this.observer && form !== this.observedOwner) this.observe(form);
    const local = normalizeFormAutocomplete(this.host.getAttribute("autocomplete"));
    if (ownsForm && form) {
      if (local === undefined) form.removeAttribute("autocomplete");
      else if (form.getAttribute("autocomplete") !== local)
        form.setAttribute("autocomplete", local);
    }
    const value = local ?? normalizeFormAutocomplete(form?.getAttribute("autocomplete") ?? null);
    if (this.observer) {
      const controls = new Set(
        [...this.host.querySelectorAll<NativeControl>("input,textarea,select")].filter(
          (control) => control.closest("l-form") === this.host,
        ),
      );
      for (const [control, assigned] of this.assigned) {
        if (!controls.has(control) || value === undefined) {
          if (control.getAttribute("autocomplete") === assigned)
            control.removeAttribute("autocomplete");
          this.assigned.delete(control);
        }
      }
      if (value !== undefined) {
        for (const control of controls) {
          const current = control.getAttribute("autocomplete");
          if (current !== null && current !== this.assigned.get(control)) continue;
          if (current !== value) control.setAttribute("autocomplete", value);
          this.assigned.set(control, value);
        }
      }
      this.observer.takeRecords();
    }
    this.publish(value);
  }

  stop(): void {
    this.readAuthoredChanges(this.observer?.takeRecords() ?? []);
    this.observer?.disconnect();
    this.observer = undefined;
    this.observedOwner = undefined;
    for (const [control, value] of this.assigned) {
      if (control.getAttribute("autocomplete") === value) control.removeAttribute("autocomplete");
    }
    this.assigned.clear();
  }
}