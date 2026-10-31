# 双语 LLM 文档生成

运行 `pnpm docs:build` 即可生成，`pnpm docs:llms:test` 执行转换与分语言打包测试。生成物位于 `docs/.vitepress/dist/`，不提交 Git，不影响 npm 包发布内容。

## 输出

- `llms.txt`：中英文总入口，包含语言索引与全文链接。
- `llms-zh.txt`、`llms-en.txt`：按对应语言侧边栏分组、排序的页面索引。
- `llms-zh-full.txt`、`llms-en-full.txt`：两套独立全文。
- 与页面同路径的 `.md`：插件生成的可读 Markdown，保留 `/en/` 层级。

默认部署后的总入口为 <https://dvshu.github.io/litos-ui/llms.txt>。所有 HTML 页面包含总入口发现链接，站点的 `transformHead` 为非首页文档添加对应 Markdown 的 alternate 链接。

## 内容范围与转换

索引与全文以两套侧边栏为准；首页是展示型页面，不收录。新增文档应同步接入两套侧边栏。侧边栏目标缺少源码或生成的 Markdown 时构建失败，避免发布残缺索引。

中文为内容依据。英文集合按 `/en/` 路径收集，不表示这些页面均已完成翻译；总入口与英文索引明确提示英文可能滞后，不自动翻译或宣称同步完成。翻译维护仍遵循根目录 `TRANSLATION_GUIDE.md`。

`vitepress-plugin-llms` 固定为 1.14.0。适配层在其私有 Markdown 收集阶段清洗输入，不把清洗结果交给 Vite 渲染，因此不改变网站上的可运行演示：

- 保留已有代码围栏，将演示 textarea 转为带语言的围栏。
- 存在 source 展示源码时，以 source 为准，避免重复收录预览。
- 移除页面执行脚本、样式和演示包装，保留代码示例内部的 script/style。
- 保留 API 表格；已知文档链接转换为带站点 base 的绝对 Markdown 链接，保留 query/hash，不修改围栏中的链接。

双语打包在 VitePress `buildEnd` 中执行，所以直接运行 `vitepress build docs` 也会生成。开发服务器不实时生成索引；查看最新完整产物需先构建，再使用 `pnpm docs:preview`。

## 升级与验收

适配层包装了插件的 Markdown transform 收集钩子，依赖其当前返回的插件结构；升级插件时必须检查这一接入点并运行测试与构建。当前链接转换覆盖普通 Markdown 内联链接；不尝试解析示例代码中的路径。

验收至少检查：双语索引隔离和顺序、链接仅包含一次部署前缀、Button 的 HTML/JS/CSS 示例及 API 表格、Table 的页面执行脚本未泄漏、普通 HTML 页面仍保留可运行演示。构建成功不替代部署后的 HTTP 链接检查。