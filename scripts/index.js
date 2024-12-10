import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { write } from "ph-utils/file";
import { styleText } from "node:util";

function sourceTemplate(name, sname) {
  const res = [
    'import BaseComponent from "../base"',
    'import { initAttr } from "../util";\r\n',
    `export default class ${name} extends BaseComponent {`,
    `  public static baseName = "${sname}";`,
    "  constructor() {",
    "    super();",
    "    initAttr(this);",
    "  }",
    "  connectedCallback(): void {",
    `    this.loadStyle(["${sname}"]);`,
    "    super.connectedCallback();",
    "  }",
    "  render() {}",
    "}",
  ];
  return res.join("\r\n");
}

function docsTemplate(name, sname) {
  const res = [
    `# ${name}\r\n`,
    `${name}\r\n`,
    "## 引用\r\n",
    "```js",
    `import { ${name}, regist } from "litos-ui";\r\n`,
    `regist(${name});`,
    "```\r\n",
    "## 演示\r\n",
    "### 基础用法\r\n",
    "使用\r\n",
    "<ClientOnly>",
    "<l-code-preview>",
    '<textarea lang="html">',
    ` <l-${sname}></l-${sname}>`,
    "</textarea>",
    '<div class="source">',
    '<textarea lang="html">',
    `  <l-${sname}></l-${sname}>`,
    "</textarea>",
    "</div>",
    "</l-code-preview>",
    "</ClientOnly>\r\n",
    "## API\r\n",
    `### ${name} Attibutes\r\n`,
    "<!-- prettier-ignore -->",
    "| 参数 | 说明 | 类型 | 默认值 |",
    "| --- | --- | --- | --- |",
    "| x | x | x | x |",
    `### ${name} Slots\r\n`,
    "<!-- prettier-ignore -->",
    "| 名称 | 说明 |",
    "| --- | --- |",
    "| `default` | 内容 |",
    `### ${name} Events\r\n`,
    "<!-- prettier-ignore -->",
    "| 事件名 | 说明 | 回调参数 |",
    "| --- | --- | --- |",
    "| `click` | 点击按钮时触发 | `(event: Event)` |",
    `### ${name} Methods\r\n`,
    "<!-- prettier-ignore -->",
    "| 方法名 | 说明 | 类型 |",
    "| --- | --- | --- |",
    "| `x` | x | `(x: number): string` |",
    `### ${name} CSS Variables\r\n`,
    "<!-- prettier-ignore -->",
    "| 变量名 | 说明 | 默认值 |",
    "| --- | --- | --- |",
    "| `--l` | x | `#fff` |",
  ];
  return res.join("\r\n");
}

function createComponentTemplate(name) {
  console.log(styleText("blue", "开始创建组件模板..."));

  const sName = name[0].toLowerCase() + name.slice(1);

  const cwd = process.cwd();
  const compoentsPath = path.join(cwd, "src/components");
  // 创建源码目录
  const sourcePath = path.join(compoentsPath, sName);
  mkdir(sourcePath)
    .then(() => {
      write(
        path.join(sourcePath, "index.less"),
        '@import "../styles/component_base.less";'
      ).then();
      write(
        path.join(sourcePath, "index.ts"),
        sourceTemplate(name, sName)
      ).then();
    })
    .catch(() => {
      console.log("");
    });

  // 文档
  const docsPath = path.join(cwd, "docs/components", `${sName}.md`);
  write(docsPath, docsTemplate(name, sName)).then();

  // 增加导出
  const exportPath = path.join(compoentsPath, "index.ts");
  readFile(exportPath, "utf-8")
    .then((content) => {
      content += `\r\nexport { default as ${name} } from "./${sName}";\r\n`;
      return write(exportPath, content);
    })
    .then();
  // 编辑侧边栏配置
  const configPath = path.join(cwd, "docs/.vitepress/config.mts");
  readFile(configPath, "utf-8")
    .then((configContent) => {
      configContent = configContent.replace(
        "/* TemplateItem */",
        `{
            text: "${name}",
            link: "/components/${sName}",
          },
          /* TemplateItem */`
      );
      return write(configPath, configContent);
    })
    .then();

  // iife模式
  const iifePath = path.join(cwd, "src/components/browser.ts");
  readFile(iifePath, "utf-8")
    .then((content) => {
      content = content.replace(
        "//Web Components Import",
        `import ${name} from "./${sName}";\n//Web Components Import\nregist(${name})`
      );
      content = content.trim() + `\nimport "./${sName}/index.less";\n`;
      return write(iifePath, content);
    })
    .then();
  console.log(styleText("green", "组件模板成功"));
}

(async () => {
  const argv = process.argv;

  if (argv[2] === "create") {
    // 创建组件模板
    createComponentTemplate(argv[3]);
  }
})();
