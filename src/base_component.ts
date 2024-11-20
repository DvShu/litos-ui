export default class BaseComponent extends HTMLElement {
  loadStyle(root: ShadowRoot, styleNames: string[]) {
    for (let i = 0, len = styleNames.length; i < len; i++) {
      const styleName = styleNames[i];
      import(`./components/${styleName}/index.css?raw`).then((res) => {
        const style = document.createElement("style");
        style.textContent = res.default.trim();
        root.appendChild(style);
      });
    }
  }
}
