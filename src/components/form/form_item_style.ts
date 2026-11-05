import formItemCss from "./form_item.less?inline";

/** 所有 FormItem 实例共享同一份构造样式表，不混入 Form 的布局规则。 */
const formItemSheet = /* @__PURE__ */ (() => {
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(formItemCss);
  return sheet;
})();
export default formItemSheet;