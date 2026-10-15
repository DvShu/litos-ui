// @ts-ignore
import uploadCss from "./index.less?inline";

const uploadSheet = new CSSStyleSheet();
uploadSheet.replaceSync(uploadCss);
export default uploadSheet;
