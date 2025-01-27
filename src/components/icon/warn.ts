import BaseIcon from "./base";

export default class Warn extends BaseIcon {
  public static baseName = "warn-icon";

  connectedCallback() {
    super.connectedCallback();
  }

  renderChildren() {
    return '<path fill="currentColor" d="M512 1024C229.234 1024 0 794.766 0 512S229.234 0 512 0s512 229.234 512 512-229.234 512-512 512z m-64.853-734.52l19.484 244.906 1.309 16.156c1.251 15.93 15.018 28.644 30.72 28.644h25.571c15.56 0 29.298-12.601 30.663-28.132l1.422-16.668 21.334-244.907c3.214-36.978-24.434-66.844-61.725-66.844h-6.627c-37.462 0-65.138 29.923-62.18 66.844zM512 801.393a66.788 66.788 0 1 0 0-133.575 66.788 66.788 0 0 0 0 133.575z"></path>';
  }
}
