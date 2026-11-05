import inputCss from "./index.less?inline";

/** 与 Button 一致：模块级构造一次，由所有 Input 的 ShadowRoot 共享。 */
const inputSheet = /* @__PURE__ */ (() => {
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(inputCss);
  return sheet;
})();
export default inputSheet;