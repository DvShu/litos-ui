import css from "./index.less?inline";

const buttonSheet = /* @__PURE__ */ (() => {
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(css);
  return sheet;
})();
export default buttonSheet;