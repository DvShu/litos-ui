# 文档翻译与术语约定

适用于 litos-ui 的英文 README、`docs/en/` 文档、英文导航及文档演示界面。此文件是仓库维护约定，不作为文档站页面发布。

## 内容与维护原则

- 中文文档位于 `docs/` 根目录和 `docs/components/`；英文对应页面位于 `docs/en/`，保持文件名和页面层级一致。
- 先根据实际代码确认 API、默认值与限制，再翻译。保留已知实现限制，不把计划中的功能写为已经支持。
- 未翻译的英文站页面可以暂时保留中文副本。页面一旦开始翻译，不得再用整份中文文件覆盖；后续按变更逐段同步。
- 完成页面翻译需同时处理 frontmatter、标题、正文、表格说明、示例中的可见文字与说明性注释。原有中文页面保留。
- 英文页面内的站内文档链接使用 `/en/` 或正确的相对路径，公共静态资源复用。引用工程源码时修正相对路径。
- `litos-ui/Button` 等计划中的入口，只有实际实现并验证后才能作为可用示例；当前用法以 package.json 的 exports 为准。

## 品牌、组件和代码标识符

- npm 包名始终写作 `litos-ui`；产品名称使用 `LitosUI`。使用 `Web Components` 表示标准技术体系。
- 类名、导出名、类型名、属性名、事件名、方法名、标签名、CSS 变量与 part 名称保持源码中的精确拼写和大小写。
- 保留 `regist` 的实际 API 名称，不能自行改为 `register`。
- 保留 `DatePickerOri`、`SelectOri` 等公开名称；需要解释时添加描述，不重命名为不存在的 API。
- 保留完整代码路径、包名与 ID 的对应关系；可以翻译示例展示文字，但若修改示例 ID、字符串键或数据结构，必须同步所有引用。
- 新组件英文标题优先使用公开组件名，例如 `# Button`、`# DatePickerOri`；同名组件需要区分时补充描述。

## 导航与指南术语

- 首页：Home。
- 指南：Guide。
- 组件：Components。
- 快速开始：Getting Started。
- 安装：Installation。
- 使用：Usage。
- 引用／引入：Import and Registration（同时涉及导入与注册时）；只有导入时使用 Imports。
- 基础用法：Basic Usage。
- 示例／演示：Examples。
- 主题定制／主题指南：Theming。
- 暗黑模式：Dark Mode；浅色模式：Light Mode；跟随系统：System 或 Auto，按上下文选择，API 值仍为 auto。
- 样式重置：Style Reset。
- 工具样式：Utility Styles。
- 开发与构建：Development and Build。
- 浏览器与 SSR：Browser and SSR Usage。
- 可选自动导入：Optional Auto-imports。
- 通用：General；表单：Form；数据展示：Data Display；反馈：Feedback；导航：Navigation；业务组件：Business Components。
- 主题组件的公开名称保留 Theme，不能因指南叫 Theming 就将组件名也改为 Theming。

## API 标题与数据概念

- HTML 属性：Attributes，例如 `<l-button disabled>` 中的 disabled。标题使用 `### Button Attributes`。
- JavaScript 实例属性：Properties，例如 `element.value`。复杂数组、对象和函数不能描述成可直接传入 HTML 的属性。
- Props 仅用于真实的框架 Props 类型或封装层，不作为 Web Components 的 Attributes 与 Properties 的混称。
- 插槽：Slots；默认插槽：default slot；具名插槽：named slot。
- 事件：Events；事件名保持原样；说明中的“触发”使用 fires 或 emitted，按实际行为描述。
- 方法：Methods；方法参数：Parameters；返回值：Returns。
- CSS 变量：CSS Variables；对外暴露的 Shadow DOM 部件：CSS Parts。
- 默认值：Default；说明：Description；类型：Type；名称：Name；必填：Required。
- 控件禁用状态：disabled state；只读状态：read-only state；选中状态：selected 或 checked，按控件实际语义区分。
- 占位文本：placeholder；空状态：empty state；加载状态：loading state；清除：clear；重置：reset。
- 本地化与组件语言支持：Localization；整个多语言机制：Internationalization（i18n）；文档正文翻译：Translation。三者不能混为已完成的同一项能力。

## API 表达与示例

- 事件回调参数使用真实 Event 类型。CustomEvent 的数据写为 `event.detail`，不要将 detail 对象直接写成整个回调参数。
- 区分原生事件、组件自定义事件、HTML attribute 与实例 property。不要将所有 input 事件统一写成 `event.detail.value`。
- 明确默认值是源码初始化值、CSS 回退值还是 vars.css 引入后的全局值；不要把未配置、空字符串、false 和 0 混为一谈。
- 没有默认值可写 `Not set`；不适用写 `N/A`。真正的 null、undefined、false、0 等代码值保持原样。
- 类型联合使用真实 TypeScript 写法，Markdown 表格内的竖线按需要转义。类型签名展示使用 text，不能将不可执行的签名误标为可运行 JS 示例。
- Markdown 表格使用紧凑写法，不添加用于源码列对齐的填充空格；遵循待完成清单中的格式化治理要求。
- 保持示例可以运行。服务端渲染环境的浏览器 API 导入放在客户端；演示绑定事件时补充必要的清理。
- 文案说明中的“支持”“自动”“兼容”“全部”必须有实现依据；没有浏览器兼容性测试时，不新增未经验证的最低浏览器版本。

## 预置主题的统一名称

- 翡翠绿：Jade；标识符 jade；主色 `#00AA7E`；文件 `theme-jade.css`。
- 珊瑚红：Coral；标识符 coral；主色 `#FF6448`；文件 `theme-coral.css`。
- 活力橙：Tangerine；标识符 tangerine；主色 `#FF7802`；文件 `theme-tangerine.css`。
- 颜色标识符、文件名和实际颜色值不随翻译改变。

## 页面翻译验收

- 对照源码与中文页面，检查没有增删或虚构功能，没有遗漏限制和迁移说明。
- 英文标题、菜单、术语和示例一致；代码标识符、默认值和事件数据与实现一致。
- 核对正文、frontmatter、表格说明、图像替代文字、示例展示文字及注释；保留中文的内容有明确理由。
- 检查站内链接、源码引用与公共资源路径，验证对应语言页面能切换。
- 执行相关格式检查与文档构建；涉及演示逻辑修改时，实际验证交互或明确未验证项。
- 仅在相应页面完成翻译和检查后，勾选它自己的翻译任务；术语约定完成不代表页面翻译已完成。