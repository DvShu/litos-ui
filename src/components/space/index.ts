import BaseComponent from "../base"
import { parseAttrValue, kebabToCamel } from "../utils";
//@ts-ignore
import css from "./index.less?inline"
import { isNumeric } from 'ph-utils';

export default class Space extends BaseComponent {
  public static baseName = "space";

  connectedCallback(): void {
    this.loadStyleText(css);
    super.connectedCallback();
  }

  static get observedAttributes() {
    return ['inline', 'align', 'justify', 'gap', 'direction', 'wrap']
  }

  attributeChangedCallback(name: string,oldValue: string,newValue: string) {
    name = kebabToCamel(name);
    const parsedValue = parseAttrValue(newValue,this[name as "id"] as any,name) as any;
    if (name === 'inline') {
      const inlineValue = parseAttrValue(newValue, false, 'inline');
      if (inlineValue) {
        this.style.setProperty('--l-space-display', 'inline-flex');
      } else {
        this.style.removeProperty('--l-space-display');
      }
    } else if (name === 'gap') {
      if (parsedValue) {
        const gapValue = parsedValue.split(",").map((value: string) => isNumeric(value) ? `${value}px` : value);
        this.style.setProperty('--l-space-gap', gapValue.join(" "));
      } else {
        this.style.removeProperty('--l-space-gap');
      }
    } else {
      const cssVarName = `--l-space-${name}`;
      if (parsedValue) {
        this.style.setProperty(cssVarName, parsedValue);
      } else {
        this.style.removeProperty(cssVarName);
      }
    }
  }

  render() {
    return "<slot></slot>"
  }
}
