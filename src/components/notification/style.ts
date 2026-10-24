// @ts-ignore
import notificationCss from "./index.less?inline";

const notificationSheet = new CSSStyleSheet();
notificationSheet.replaceSync(notificationCss);
export default notificationSheet;