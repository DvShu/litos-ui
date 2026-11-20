import { docText } from "./i18n";
import { getTheme } from "utilane/browser";
import { applyThemeMode, observeTheme } from "../components/theme/appearance";

export default class CustomTheme extends HTMLElement {
  #group?: HTMLElement & { value: string };
  #stopObservingTheme?: () => void;

  connectedCallback() {
    this.innerHTML = `<l-radio-group gap="15" id="customThemeRadio"><l-radio value="auto">${docText("auto")}</l-radio><l-radio value="light">${docText("light")}</l-radio><l-radio value="dark">${docText("dark")}</l-radio></l-radio-group>`;
    const group = this.querySelector<HTMLElement & { value: string }>("l-radio-group")!;
    this.#group = group;
    group.value = getTheme();
    group.addEventListener("change", this.#handle);
    this.#stopObservingTheme = observeTheme(this.ownerDocument, (mode) => {
      if (group.value !== mode) group.value = mode;
    });
  }

  disconnectedCallback() {
    this.#group?.removeEventListener("change", this.#handle);
    this.#group = undefined;
    this.#stopObservingTheme?.();
    this.#stopObservingTheme = undefined;
  }

  #handle = () => {
    const document = this.ownerDocument;
    const mode = this.#group?.value;
    if (mode !== "auto" && mode !== "light" && mode !== "dark") return;
    const apply = () => applyThemeMode(document, mode);
    if (!document.startViewTransition) {
      void apply().catch(console.error);
      return;
    }
    const transition = document.startViewTransition(apply);
    void transition.finished.catch(console.error);

    void transition.ready.then(
      () => {
        document.documentElement.animate(
          { clipPath: ["circle(0% at center)", "circle(100% at center)"] },
          { duration: 300, pseudoElement: "::view-transition-new(root)" },
        );
      },
      () => {},
    );
  };
}