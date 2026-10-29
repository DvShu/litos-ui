// @ts-ignore
import cssText from "./index.css?inline";

const sheet = /* @__PURE__ */ (() => {
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(cssText);
  return sheet;
})();

export default sheet;