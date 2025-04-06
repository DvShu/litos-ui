import DefaultTheme from "vitepress/theme";
import "./style.css";
import "../../../styles/vars.css";
import "../../../styles/message.css";
import "../../../styles/reset.css";
import "../../../styles/transition.css";
import "../../../styles/animation.css";
import "../../../styles/scrollbar.css";
import "../../../styles/container.css";
import "../../../styles/dialog.css";
import "../../../styles/loading.css";
import { add } from "../../../src/icons";
import "../../../styles/modal_box.css";

export default {
  extends: DefaultTheme,
  async enhanceApp() {
    if (!import.meta.env.SSR) {
      const module = await import("../../../src/components");
      for (const key in module) {
        const component = module[key];
        if (component.baseName) {
          if (component.baseName.endsWith("-icon")) {
            add(component.baseName);
          }
          module.regist(component);
        }
      }
      const CodePreview = await import(
        "../../../src/app_components/code_preview"
      );
      const SourceCode = await import(
        "../../../src/app_components/source_code"
      );
      const IconList = await import("../../../src/app_components/icon_list");
      const CustomTheme = await import(
        "../../../src/app_components/custom_theme"
      );
      module.regist(CodePreview.default, "l-code-preview");
      module.regist(SourceCode.default, "l-source-code");
      module.regist(IconList.default, "l-icon-list");
      module.regist(CustomTheme.default, "l-custom-theme");
      import("iconify-icon").then();
    }
  },
};
