import DefaultTheme from "vitepress/theme";
import "./style.css";
// import "../../../styles/vars.css";
import "../../../styles/message.css";
import { add } from "../../../src/icons";

export default {
  extends: DefaultTheme,
  async enhanceApp() {
    if (!import.meta.env.SSR) {
      const module = await import("../../../src/components");
      for (const key in module) {
        const component = module[key];
        if (component.tagName) {
          if (component.tagName.endsWith("-icon")) {
            add(component.tagName);
          }
          module.regist(component);
        } else if (key === "Message") {
          window.LMessage = component;
        }
      }
      const CodePreview = await import(
        "../../../src/app_components/code_preview"
      );
      const SourceCode = await import(
        "../../../src/app_components/source_code"
      );
      const IconList = await import("../../../src/app_components/icon_list");
      module.regist(CodePreview.default, "l-code-preview");
      module.regist(SourceCode.default, "l-source-code");
      module.regist(IconList.default, "l-icon-list");
    }
  },
};
