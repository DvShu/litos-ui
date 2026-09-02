import css from "./index.less?inline";

const buttonSheet = new CSSStyleSheet();
buttonSheet.replaceSync(css);
export default buttonSheet;