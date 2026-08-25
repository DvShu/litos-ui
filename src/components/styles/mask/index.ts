// @ts-ignore
import cssText from "./index.css?inline";

const sheet = new CSSStyleSheet();
sheet.replaceSync(cssText);

export default sheet;
