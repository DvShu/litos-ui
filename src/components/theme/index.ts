import BaseComponent from "../base";
import { initAttr } from "../utils";
import { $one, create, getTheme, off, on } from "utilane/browser";
import { applyThemeMode, observeTheme, type ThemeMode } from "./appearance";
//@ts-ignore
import css from "./index.less?inline";

const RADIO_ITEMS = [
  { value: "auto", text: "跟随系统", icon: "l-theme-default-icon" },
  { value: "light", text: "浅色模式", icon: "l-sun-icon" },
  { value: "dark", text: "深色模式", icon: "l-moon-icon" },
];

type ThemeChange = { value: ThemeMode; apply: () => Promise<void> };
const activeTransitions = new WeakMap<Document, { pending?: ThemeChange }>();

function scheduleThemeChange(document: Document, change: ThemeChange): void {
  const active = activeTransitions.get(document);
  if (active?.pending) {
    active.pending = change;
    return;
  }
  if (active || !document.startViewTransition) {
    void change.apply().catch(console.error);
    return;
  }

  const state: { pending?: ThemeChange } = { pending: change };
  activeTransitions.set(document, state);
  const transition = document.startViewTransition(() => {
    const pending = state.pending;
    state.pending = undefined;
    return pending?.apply();
  });
  // A skipped animation still applies the change. Update failures surface via finished.
  void transition.ready.catch(() => {});
  void transition.finished.then(
    () => activeTransitions.delete(document),
    (error: unknown) => {
      activeTransitions.delete(document);
      console.error(error);
    },
  );
}

export default class Theme extends BaseComponent {
  public static baseName = "theme";
  public type: "button" | "select" | "switch" | "radio" = "button";
  public label?: "text" | "icon" = "text";
  public theme?: string;
  #$inner?: HTMLElement & { value?: string | boolean };
  #stopObservingTheme?: () => void;

  connectedCallback(): void {
    initAttr(this);
    this.theme = getTheme();
    this.loadStyleText(css);
    super.connectedCallback();
    this.#initEvents();
    this.#stopObservingTheme = observeTheme(this.ownerDocument, this.#syncTheme);
  }

  disconnectedCallback(): void {
    this.#stopObservingTheme?.();
    this.#stopObservingTheme = undefined;
    super.disconnectedCallback();
    this.#removeEvents();
  }

  render() {
    switch (this.type) {
      case "select":
        return this.#selectRender();
      case "radio":
        return this.#radioRender();
      case "switch":
        return this.#switchRender();
      default:
        return this.#buttonRender();
    }
  }

  #buttonRender() {
    const $inner = create("l-button", {
      class: "l-theme-btn l-theme-inner",
    });
    this.#updateButtonChild($inner);
    return $inner;
  }

  #updateButtonChild(target: HTMLElement) {
    const tag = this.theme === "auto" ? "sun" : "moon";
    target.innerHTML = `<l-${tag}-icon></l-${tag}-icon>`;
  }

  #selectRender() {
    const $inner = create("l-select-ori", {
      class: "l-theme-inner",
    }) as HTMLSelectElement;
    $inner.value = this.theme as string;
    const children: string[] = [
      '<option value="auto">跟随系统</option>',
      '<option value="light">浅色模式</option>',
      '<option value="dark">深色模式</option>',
    ];
    $inner.innerHTML = children.join("");
    return $inner;
  }

  #switchRender() {
    const $inner = create("l-switch", {
      class: "l-theme-switch l-theme-inner",
    }) as any;
    $inner.value = this.theme === "dark";
    $inner.innerHTML =
      '<l-sun-icon slot="unchecked-action"></l-sun-icon>' +
      '<l-moon-icon slot="checked-action"></l-moon-icon>';
    return $inner;
  }

  #radioRender() {
    const $inner = create("l-radio-group", {
      class: "l-theme-inner",
    }) as HTMLInputElement;
    $inner.value = this.theme as string;
    const children = RADIO_ITEMS.map((item) => {
      let inner = "";
      if (this.label === "icon") {
        inner = `<${item.icon}></${item.icon}>`;
      } else {
        inner = item.text;
      }
      return `<l-radio value="${item.value}" button>${inner}</l-radio>`;
    });
    $inner.innerHTML = children.join("");
    return $inner;
  }

  #syncTheme = (mode: string) => {
    const inner = this.#$inner;
    if (!inner) return;
    this.theme = mode;
    if (this.type === "button") this.#updateButtonChild(inner);
    else {
      const value = this.type === "switch" ? mode === "dark" : mode;
      if (inner.value !== value) inner.value = value;
    }
  };

  #handle = (e: Event) => {
    if (e.type === "change") e.stopPropagation();
    const inner = this.#$inner;
    if (!inner) return;
    const document = this.ownerDocument;
    const pending = activeTransitions.get(document)?.pending;
    const current = pending?.value ?? getTheme();
    let value: unknown;
    if (this.type === "button") {
      value = current === "dark" ? "auto" : "dark";
    } else {
      const selection = inner.value;
      value = this.type === "switch" ? (selection ? "dark" : "light") : selection;
    }
    if (value !== "auto" && value !== "light" && value !== "dark") return;
    const newTheme = value;
    if (newTheme === current) return;
    scheduleThemeChange(document, {
      value: newTheme,
      apply: async () => {
        const changed = getTheme() !== newTheme;
        if (changed) await applyThemeMode(document, newTheme);
        if (!this.isConnected || this.#$inner !== inner) return;
        if (changed) this.emit("change", { detail: newTheme });
      },
    });
  };

  #initEvents() {
    this.#$inner = $one(".l-theme-inner", this.root) as HTMLElement;
    if (this.type === "button") {
      on(this.#$inner, "click", this.#handle);
    } else {
      this.keepChangeLocal(this.#$inner);
      for (const option of this.#$inner.querySelectorAll<HTMLElement>("l-radio"))
        this.keepChangeLocal(option);
      on(this.#$inner, "change", this.#handle);
    }
  }

  #removeEvents() {
    if (this.#$inner) {
      if (this.type === "button") {
        off(this.#$inner, "click", this.#handle);
      } else {
        off(this.#$inner, "change", this.#handle);
      }
      this.#$inner = undefined;
    }
  }
}