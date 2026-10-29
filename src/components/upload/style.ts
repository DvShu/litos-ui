// @ts-ignore
import uploadCss from "./index.less?inline";

const uploadSheet = /* @__PURE__ */ (() => {
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(uploadCss);
  return sheet;
})();
export default uploadSheet;