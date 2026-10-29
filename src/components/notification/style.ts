// @ts-ignore
import notificationCss from "./index.less?inline";

const notificationSheet = /* @__PURE__ */ (() => {
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(notificationCss);
  return sheet;
})();
export default notificationSheet;