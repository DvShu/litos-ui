/** Shared component sheets have no effects beyond the returned sheet. */
export function createStyleSheet(css: string): CSSStyleSheet {
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(css);
  return sheet;
}

/** Global service styles are installed once by the opt-in public entry. */
export function installStyle(name: string, css: string): void {
  const id = `litos-ui-${name}-style`;
  if (document.getElementById(id)) return;
  const style = document.createElement("style");
  style.id = id;
  style.textContent = css;
  document.head.appendChild(style);
}