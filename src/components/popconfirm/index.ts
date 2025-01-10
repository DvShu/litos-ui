import Popover from "../popover";
import { $one, on, shouldEventNext } from "ph-utils/dom";
//@ts-ignore
import css from "./index.less?inline";

export default class Popconfirm extends Popover {
  public static baseName = "popconfirm";
  constructor() {
    super();
  }
  connectedCallback(): void {
    this.loadStyleText(css);
    this.trigger = "click";
    this.theme = "popconfirm";
    super.connectedCallback();
    on(this.root, "click", (e) => {
      const [next, action] = shouldEventNext(e, "l-action", this);
      if (next) {
        this.dispatchEvent(
          new CustomEvent(action, {
            detail: {
              action,
            },
          })
        );
        this.hide();
      }
    });
  }

  protected contentHTML(): string {
    const $icon = $one('[slot="icon"]', this);
    const children: string[] = [];
    children.push('<div class="l-popconfirm-container">');
    children.push('<div class="l-popconfirm-icon-wrapper">');
    children.push(
      $icon ? '<slot name="icon"></slot>' : "<l-warn-icon></l-warn-icon>"
    );
    children.push(`</div>${super.contentHTML()}</div>`);
    children.push('<div class="l-popconfirm-footer">');
    children.push('<l-button l-action="cancel">取消</l-button>');
    children.push('<l-button type="primary" l-action="ok">确定</l-button>');
    children.push("</div>");
    return children.join("");
  }
}
