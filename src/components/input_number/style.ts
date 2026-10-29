// @ts-ignore
import inputNumberCss from "./index.less?inline";

const inputNumberSheet = /* @__PURE__ */ (() => {
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(inputNumberCss);
  return sheet;
})();
export default inputNumberSheet;