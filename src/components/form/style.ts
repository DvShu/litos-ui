import formCss from "./index.less?inline";

/** 所有 Form 实例共享同一份构造样式表。 */
const formSheet = /* @__PURE__ */ (() => {
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(formCss);
  return sheet;
})();
export default formSheet;