### Base 基础组件

框架的所有组件都是基于这个组件进行扩展的，所以这个组件是框架的基础组件，也是框架的核心组件。基础组件标记了组件是否渲染完成(生命周期函数 `connectedCallback` 是否已经调用函数)。

## 引用

```js
import { BaseComponent } from "litos-ui";
```

## 演示

### 基础用法

只需要继承这个类，然后实现 `render` 函数即可。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-hello-world></l-hello-world>
</textarea>
<div class="source">
<textarea lang="js">
  import { BaseComponent, regist } from 'litos-ui';
  //-
  class HelloWorld extends BaseComponent {
    public render() {
      return "<span>Hello World</span>";
    }
  }
  //-
  regist(HelloWorld, 'app-hello-world');
</textarea>
<textarea lang="html">
  <app-hello-world></app-hello-world>
</textarea>
</div>
</l-code-preview>
</ClientOnly>

## API

### 属性

1. `root`

如果是 `Shadow` 模式则为 `ShadowRoot` 否则为 `HTMLElement` 代表当前组件节点。

2. `rendered`

组件是否渲染完成，是否已经渲染到了 `DOM` 节点上。(是否调用 ``connectedCallback` 函数)

### 可实现函数

1. `constructor(shadow = true)`

构造函数可以传入一个参数 `shadow`，默认为 `true`，表示是否使用 `shadow` 模式渲染组件，如果为 `false` 则使用普通模式渲染组件。

```js
constructor() {
  super(false); // 不是有 Shadow 模式， 使用普通模式渲染
}
```

2. `connectedCallback()`

当组件被插入到 DOM 中时，会触发 `connectedCallback` 函数，此时组件已经渲染完成，可以访问 DOM 节点。可以在这里加载样式、初始化属性、事件处理等。

```js
import { initAttr } from 'litos-ui';

connectedCallback() {
  // 将 html 节点上的属性绑定到js上，这样就可以通过 this.x 来访问了
  // 例如: <x-a text="d"></x-a> ，在 x-a 组件内，调用 initAttr(this) 后，就可以通过 this.text 访问属性了。
  // 注意如果节点上是 a-text ，则 js 上就是 aText
  initAttr(this);
  // 加载样式文本
  this.createStyle(':host:{color:red;}');
  // 引用样式文件url
  this.createLink("/static/css/a.css");
  super.connectedCallback(); // 一定要调用该函数
  // 初始化事件
}
```

> 1. 一定要调用 `super.connectedCallback()` 函数，否则渲染状态不准确
> 2. 事件处理一定要在 `super.connectedCallback()` 之后

3. `disconnectedCallback()`

当组件从 DOM 中移除时，会触发 `disconnectedCallback` 函数，此时组件已经从 DOM 中移除，可以做一些清理工作。例如取消事件监听、取消定时器等。

```js
disconnectedCallback() {
  super.disconnectedCallback();
  // 取消事件监听
}
```

4. `render(): void | string | HTMLElement | HTMLElement[]`

渲染函数，返回一个字符串、一个 HTML 元素、一个 HTML 元素数组或者 `undefined`。如果返回 `undefined`，则需要自己手动渲染节点内容。

```js
render() {
  // 返回节点字符串，自动渲染到 DOM 节点上
  return `<span>hello world</span>`;
  // 也可以不返回任何内容手动调用 this.root.innerHTML = '<span>hello world</span>' 来渲染
}
```
