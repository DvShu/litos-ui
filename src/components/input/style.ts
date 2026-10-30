import css from "./index.less?inline";
import innerCss from "./input_inner.less?inline";

const inputSheet = /* @__PURE__ */ (() => {
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(`${css}\n${innerCss}`);
  return sheet;
})();
export default inputSheet;