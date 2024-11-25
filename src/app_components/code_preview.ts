import { elem, on, text } from "ph-utils/dom";

export default class CodePreview extends HTMLElement {
  private handleCollapse: (e: Event) => void;
  constructor() {
    super();
    this.handleCollapse = this._handleCollapse.bind(this);
  }

  connectedCallback() {
    const $source = elem(".source", this)[0];
    const $code = elem("textarea", this)[0] as HTMLTextAreaElement;
    let sourceStr = "";
    let code = "";
    if ($source == null) {
      if ($code == null) {
        sourceStr = `<textarea lang="html">${this.innerHTML}</textarea>`;
      } else {
        sourceStr = $code.outerHTML;
      }
    } else {
      sourceStr = $source.innerHTML;
    }
    if ($code == null) {
      code = this.innerHTML;
    } else {
      code = $code.value;
    }
    const htmlStrs = [
      '<div class="code-preview">',
      `<div class="preview-container">${code}</div>`,
      '<div class="operate-container">',
      '<l-button text type="primary" id="collapse-btn">',
      '<l-caret-top-icon class="collapse-icon"></l-caret-top-icon>',
      "<span>查看源代码</span>",
      "</l-button></div>",
      `</div><template>${sourceStr}</template>`,
    ];
    this.innerHTML = htmlStrs.join("");
    this._initEvents();
  }

  disconnectedCallback() {
    elem("#collapse-btn", this)[0].removeEventListener(
      "click",
      this.handleCollapse
    );
  }

  private _initEvents() {
    on(elem("#collapse-btn", this)[0], "click", this.handleCollapse);
  }

  private _handleCollapse(e: Event) {
    const $target = e.currentTarget as HTMLElement;
    let $source = elem("l-source-code", this)[0];
    if (!$target.classList.contains("open")) {
      $target.classList.add("open");
      text(elem("span", $target)[0], "隐藏源代码");
      if ($source == null) {
        const $preview = elem(".code-preview", this)[0];
        $source = document.createElement("l-source-code");
        const $template = elem("template", this)[0];
        $source.innerHTML = `<div class="template" style="display:none;">${$template.innerHTML}</div>`;
        $preview.appendChild($source);
      } else {
        $source.style.display = "block";
      }
    } else {
      $target.classList.remove("open");
      text(elem("span", $target)[0], "查看源代码");
      $source.style.display = "none";
    }
  }
}
