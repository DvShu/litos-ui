import { applyTheme, getTheme } from "utilane/browser";

export type ThemeMode = "auto" | "light" | "dark";

type ThemeListener = (mode: string) => void;
type ThemeAppearance = {
  mode: string;
  listeners: Set<ThemeListener>;
  observer: MutationObserver;
};

const appearances = new WeakMap<Document, ThemeAppearance>();

function refreshTheme(document: Document): void {
  const appearance = appearances.get(document);
  if (!appearance) return;
  const mode = getTheme();
  if (appearance.mode === mode) return;
  appearance.mode = mode;
  for (const listener of appearance.listeners) listener(mode);
}

export function observeTheme(document: Document, listener: ThemeListener): () => void {
  let appearance = appearances.get(document);
  if (!appearance) {
    const observer = new MutationObserver(() => refreshTheme(document));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    appearance = { mode: getTheme(), listeners: new Set(), observer };
    appearances.set(document, appearance);
  }
  const { listeners, observer } = appearance;
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size) return;
    observer.disconnect();
    appearances.delete(document);
  };
}

export async function applyThemeMode(document: Document, mode: ThemeMode): Promise<void> {
  await applyTheme(mode, true, false);
  // Switching to auto can update storage without changing an unclassed root.
  refreshTheme(document);
}