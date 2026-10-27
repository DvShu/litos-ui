# Base 基础组件

组件通过继承 `BaseComponent` 复用 Shadow DOM、生命周期、属性监听、批量 DOM 更新和事件发送能力。

## 引用

```js
import { BaseComponent, regist } from "litos-ui";
```

## 基础用法

为自定义组件定义 `baseName`，使用默认 `l-` 标签体系注册。下面采用当前的 version 2 渲染方式。

<script setup>
import { onMounted } from 'vue';

onMounted(async () => {
  const { BaseComponent, regist } = await import('../../../src/components');
  class HelloWorld extends BaseComponent {
    static baseName = 'hello-world';
    constructor() {
      super();
      this.version = 2;
    }
    render_v2() {
      return { template: '<span>Hello World</span>' };
    }
  }
  regist(HelloWorld);
});
</script>

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-hello-world></l-hello-world>
</textarea>
<div class="source">
<textarea lang="js">
import { BaseComponent, regist } from 'litos-ui';

class HelloWorld extends BaseComponent {
static baseName = 'hello-world';
constructor() {
super();
this.version = 2;
}
render_v2() {
return { template: '<span>Hello World</span>' };
}
}

regist(HelloWorld);
</textarea>
<textarea lang="html">
<l-hello-world></l-hello-world>
</textarea>
</div>
</l-code-preview>
</ClientOnly>

## 属性与方法

- `root`：开启 Shadow DOM 时为 ShadowRoot，否则为当前元素。
- `rendered`：基类完成渲染后为 true，断开连接后为 false。
- `constructor(shadow = true, init = {})`：配置是否使用 Shadow DOM 及 ShadowRootInit 选项。
- `render_v2()`：version 2 的渲染入口，返回 template、style、styleSheets 中需要的字段；template 支持字符串、HTMLElement 或 DocumentFragment。
- `afterInit()`：初次 DOM 创建后执行，在此获取内部节点、绑定事件。
- `attributeChanged(name, oldValue, newValue)`：处理 observedAttributes 中属性的变化。
- `updateDOM(changedProps)`：更新变化的属性对应的 DOM。修改状态不会自动重新执行 render_v2，必须实现更新逻辑。
- `beforeDestroy()`：解绑事件并释放资源，组件断开连接时由基类调用。
- `emit(name, options)`：发送 CustomEvent，默认 bubbles 和 composed 均为 true，数据通过 options.detail 提供。

## 生命周期与注意事项

基类在 connectedCallback 中创建 DOM，设置 rendered，然后调用 afterInit；断开连接时取消待执行更新、调用 beforeDestroy 并清空内部 DOM。若覆盖这两个原生生命周期，需要调用对应的 super 方法。

优先使用 afterInit 和 beforeDestroy；initEvents、removeEvents 已弃用。基类的 version 默认为 1，旧组件可以实现 render；新组件应在构造函数中设置 version = 2 并实现 render_v2。

组件模块依赖浏览器 API。服务端渲染项目应在客户端加载和注册，文档演示也必须放在 ClientOnly 内。

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import BaseComponent from "litos-ui/base";
```

Element entries register built-in dependencies. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](/en/on_demand) for styles, child elements, types and root-entry compatibility.