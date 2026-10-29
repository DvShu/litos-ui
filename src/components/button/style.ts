// @ts-ignore
import buttonCss from "./index.less?inline";

const buttonSheet = /* @__PURE__ */ (() => {
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(buttonCss);
  return sheet;
})();
export default buttonSheet;