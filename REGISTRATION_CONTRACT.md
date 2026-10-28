# T227：注册与运行边界

本约定适用于当前开发源码，公开入口与条件依赖见 [统一映射](./PUBLIC_ENTRIES.md)，副作用分类见 [T200 审计](./TREE_SHAKING_AUDIT.md)。入口迁移、发布产物与浏览器功能验收仍按对应任务处理。

## 注册顺序与幂等

`regist()` 按传入数组顺序处理，通过 `customElements.get(name)` 判断是否已注册。相同标签重复注册保持原定义，不再次执行 define；单独导入、父子入口混用及从总入口手动注册，都引用相同的实现模块和构造函数。不同版本／不同包副本占用同名标签时也保留已存在定义，不替换、不承诺它与新导入构造函数相同。

Custom Elements 定义时可能同步升级页面已有标签，因此依赖必须先定义。包装通过前置依赖 import 完成顺序保证；服务在显式调用时也先注册图标与控件，再定义使用它们的容器。`regist()` 不根据继承或标签字符串自动推断依赖，也不排序数组。

```js
import { LoadingIcon, Button, regist } from "litos-ui";
regist([LoadingIcon, Button]);
regist(Button); // 不重复定义
```

当前已有入口将部分条件依赖留给消费端引入。本任务保留这些改动，完整依赖以统一映射为准；需按依赖到父组件的顺序导入，尤其在页面已挂载对应标签时。下例明确准备 loading 图标，不声称当前 button 包装自动包含它：

```js
import "litos-ui/styles/vars.css";
import "litos-ui/icon/loading";
import "litos-ui/button";
```

FormInner、Check、CheckGroup、ContextProvide 是实现依赖；BaseComponent 是公开基类。它们不因继承被自动注册，也不导致所有派生类注册。`litos-ui/base` 只导出原基类，自建元素仍可继承并显式定义自己的标签。BaseIcon 保留独立元素入口，但具体图标不因继承就额外注册 BaseIcon。

## 服务与工具

Message、Loading、Dialog、DialogBox、ModalBox、Tabs 使用默认导出；Popover、createTransition 等使用具名导出。Notification 同时提供元素与命令式 API。空导入只准备配套元素注册，不安装全局样式（CSS import 当前仅保留注释，待消费端或后续 Vite 插件接入），但不会创建消息／弹层、扫描页面、启动 Observer 或向 window 注入 API。元素注册若升级已有标签，则会运行这些元素的生命周期；这与服务自动打开／扫描不是同一行为。

```js
import Message from "litos-ui/message";
Message.success("保存成功");

import Tabs from "litos-ui/tabs";
const tabs = Tabs.init(); // 配套 DOM 挂载后显式初始化
// 卸载时
tabs.destroy();
```

普通 Popover 不注册确认框的 Button／WarnIcon；使用确认框配置选择 popconfirm 入口。DialogBox／ModalBox 的 prompt 仍在调用时注册 FormItem、Input；不因包装中存在可选 import 注释就移除原有惰性注册。Notification 的图标注册标志只在注册全部成功后设置，失败可重试。

## SSR 与客户端边界

组件基类定义需要 HTMLElement，共享样式初始化需要 CSSStyleSheet；PURE 标注不使它们成为服务端安全模块。SSR 框架应在客户端专用模块或已挂载生命周期内动态导入，不能在服务端顶层先导入组件后再判断 window。

```js
// 只在框架的客户端挂载生命周期调用此函数。
async function mountUI() {
  await import("litos-ui/icon/loading");
  await import("litos-ui/button");
}
```

上述代码不提供服务端渲染、服务端自定义元素注册或 hydration 承诺。实例、服务、Tabs 与过渡工具的卸载清理由各自 API 和使用方负责。

## 回归验证

```bash
node --experimental-vm-modules --test tests/module-effects.test.mjs
node scripts/public-entries.mjs --check
```

模块求值测试使用真实源码及已安装第三方 ESM，CSS 内容为空桩，禁止全局样式注入、非样式 DOM、页面扫描、监听、Observer、计时器和请求。覆盖手动／自动混用、重复导入、父子依赖先定义、基类不注册、各服务独立空导入与两种加载顺序的共享身份；服务用例在注册后阻止渲染以隔离同步定义的顺序检查。

测试在 define 回调中检查依赖是否已注册，不模拟真实浏览器的完整元素升级和交互流程，也不代替生产包裁剪验证。

本次验证：模块边界、入口映射与模块求值共 22 项回归通过；lint、全库格式、组件库与声明构建、VitePress 文档构建通过（使用本地已安装工具及 node --run）。文档构建仍有大 chunk 提示。未运行真实浏览器交互或 tarball 消费验收；当前条件依赖入口改动保持不变，不据此勾选其他组件适配任务。