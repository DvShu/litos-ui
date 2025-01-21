function kebabCase(key) {
  const result = key.replace(/([A-Z])/g, " $1").trim();
  return result.split(" ").join("-").toLowerCase();
}

export default function neatuiResolver() {
  return [
    {
      type: "component",
      resolve: (name) => {
        if (name.startsWith("Lv")) {
          const componentName = name.slice(2);
          const styleName = kebabCase(componentName);
          let effectStyle = `litos-ui-vue/style/${styleName}/index.js`;
          if (componentName.endsWith("Item")) {
            effectStyle = undefined;
          }
          if (componentName.endsWith("Icon")) {
            effectStyle = "litos-ui-vue/style/icon/index.js";
          }
          if (componentName === "CheckboxGroup") {
            effectStyle = undefined;
          }
          if (componentName.endsWith("Popover")) {
            effectStyle = "litos-ui-vue/style/popover/index.js";
          }
          return {
            name: componentName,
            from: "litos-ui-vue",
            sideEffects: effectStyle,
          };
        } else if (name.startsWith("L")) {
          const componentName = name.slice(1);
          let effectName = componentName;
          let effectStyle = `litos-ui/styles/${kebabCase(componentName)}.css`;
          return {
            name: effectName,
            from: "litos-ui",
            sideEffects: effectStyle,
          };
        }
      },
    },
    {
      type: "directive",
      resolve: (name) => {
        const directives = {
          Clickoutside: {
            importName: "Clickoutside",
            styleName: undefined,
          },
          Loading: {
            importName: "Loading",
            styleName: "litos-ui-vue/style/loading/index.js",
          },
        };
        if (Object.hasOwn(directives, name)) {
          return {
            name: directives[name].importName,
            from: "litos-ui-vue",
            sideEffects: directives[name].styleName,
          };
        }
      },
    },
  ];
}
