# Tag 标签

通常用来展示一些属性

## 引用

```js
import { regist, Tag, CloseIcon, Button } from "litos-ui";

regist(Tag);
regist(CloseIcon); // 需要 closeable 引入
```

## 演示

<script setup>
  import { onMounted, onUnmounted, nextTick } from 'vue';
  import { transition } from 'utilane/browser';
  import { generateTagColor } from '../../src/components/utils';

  let disposed = false;
  let $addBtn;
  let $tagContainer;

  function handleAddTag() {
    if ($tagContainer) {
      let $addTag = document.createElement('l-tag');
      $addTag.setAttribute('closeable', 'true');
      $addTag.setAttribute('type', 'primary');
      $addTag.style.marginRight = "5px";
      $addTag.innerHTML = '标签';
      $tagContainer.appendChild($addTag);
      transition($addTag, 'l-scale', "enter");
      $addTag = null;
    }
  }

  function onClose(e) {
    transition(e.target, 'l-scale', "leave", () => {
      e.target.remove();
    });
  }

  onMounted(async () => {
    if (import.meta.env.SSR) return;
    await nextTick();
    if (disposed) return;
    const jade = document.querySelector('l-tag[data-custom-color="jade"]');
    const blue = document.querySelector('l-tag[data-custom-color="blue"]');
    const orange = document.querySelector('l-tag[data-custom-color="orange"]');
    if (jade) jade.color = generateTagColor('#00AA7E');
    if (blue) blue.setColor(generateTagColor('#1e9fff'));
    if (orange) orange.color = generateTagColor('#FF7802');
    $addBtn = document.getElementById('btn-add');
    $tagContainer = document.getElementById('tag-container');
    $tagContainer?.addEventListener('close', onClose);
    $addBtn?.addEventListener('click', handleAddTag);
  });

  onUnmounted(() => {
    disposed = true;
    $tagContainer?.removeEventListener('close', onClose);
    $addBtn?.removeEventListener('click', handleAddTag);
  });
</script>

### 基础用法

通过 `type` 属性选择标签类型。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-tag type="primary">标签</l-tag>
  <l-tag type="success">标签</l-tag>
  <l-tag type="info">标签</l-tag>
  <l-tag type="warning">标签</l-tag>
  <l-tag type="error">标签</l-tag>
  <l-tag type="blue">标签</l-tag>
</textarea>
</l-code-preview>
</ClientOnly>

> `type` 属性，可以传递一个自定义的值，然后在 `css` 中定义 `.l-tag--xx` 就能实现自定义的样式。

```css
.l-tag--blue {
  --l-tag-color: #4998f6;
  --l-tag-background: #e8f5ff;
  --l-tag-border-color: #4998f6;
}
```

### 自定义颜色

通过 JavaScript `color` property 或 `setColor()` 设置颜色，配合 `generateTagColor()` 生成配色。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-tag data-custom-color="jade">翡翠绿</l-tag>
  <l-tag data-custom-color="blue">蓝色</l-tag>
  <l-tag data-custom-color="orange">橙色</l-tag>
</textarea>
<div class="source">
<textarea lang="html">
  <l-tag data-custom-color="jade">翡翠绿</l-tag>
  <l-tag data-custom-color="blue">蓝色</l-tag>
  <l-tag data-custom-color="orange">橙色</l-tag>
</textarea>
<textarea lang="js">
import { generateTagColor } from "litos-ui/utils";
const jade = document.querySelector('l-tag[data-custom-color="jade"]');
const blue = document.querySelector('l-tag[data-custom-color="blue"]');
const orange = document.querySelector('l-tag[data-custom-color="orange"]');
jade.color = generateTagColor("#00AA7E");
blue.setColor(generateTagColor("#1e9fff"));
orange.color = generateTagColor("#FF7802");
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### 可移除

通过 `closeable` 属性来实现可移除的标签，然后监听 `close` 事件。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-tag type="primary" closeable>标签</l-tag>
  <l-tag type="success" closeable>标签</l-tag>
  <l-tag type="info" closeable>标签</l-tag>
  <l-tag type="warning" closeable>标签</l-tag>
  <l-tag type="error" closeable>标签</l-tag>
</textarea>
</l-code-preview>
</ClientOnly>

> 需要引入 `CloseIcon` 组件

### 过渡效果

如果想给标签添加显示或移除时的过渡效果，通过 `utilane/transition` 实现, 具体使用参考 [transition](/components/transition)。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
<l-button id="btn-add">添加</l-button>
<hr />
<div id="tag-container"></div>
</textarea>
<div class="source">
<textarea lang="html">
  <l-button id="btn-add">添加</l-button>
  <hr />
  <div id="tag-container"></div>
</textarea>
<textarea lang="js">
  import { transition } from 'utilane/browser';
  //-
  function handleAddTag() {
    if ($tagContainer) {
      let $addTag = document.createElement('l-tag');
      $addTag.setAttribute('closeable', 'true');
      $addTag.setAttribute('type', 'primary');
      $addTag.style.marginRight = "5px";
      $addTag.innerHTML = '标签';
      $tagContainer.appendChild($addTag);
      transition($addTag, 'l-scale', "enter");
      $addTag = null;
    }
  }
  //-
  function onClose(e) {
    transition(e.target, 'l-scale', "leave", () => {
      e.target.remove();
    });
  }
  //-
  const $addBtn = document.getElementById('btn-add');
  const $tagContainer = document.getElementById('tag-container');
  $tagContainer.addEventListener('close', onClose);
  $addBtn.addEventListener('click', handleAddTag);
</textarea>
</div>
</l-code-preview>
</ClientOnly>

> 这里使用的是内置的过渡名称，需要手动引入 `litos-ui/styles/transition.css` 文件
> 也可以通过传递 `css` 属性实现过渡, 例如: `transition(target, [["opacity", "0", "0.3s"]], "enter")`

## 按需入口

```js
import "litos-ui/styles/vars.css";
import "litos-ui/tag";
```

元素入口会注册内建依赖，服务与工具 API 仍需显式调用。SSR 框架请在客户端入口加载；样式、配套子元素、类型和总入口兼容用法见[按需导入](/on_demand)。

## API

### Tag Attributes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `type` | 类型 | `string` | `info`；可选值有: `primary`, `success`, `info`, `warning`, `error` |
| `closeable` | 是否可移除 | `boolean` | `false` |

### Tag Properties

<!-- prettier-ignore -->
| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `color` | 自定义颜色变量对象；`undefined` 或 `{}` 清除自定义配色，保留其它内联样式；不支持 HTML `color` attribute | `TagColor \| undefined` | `undefined` |

### Tag Slots

<!-- prettier-ignore -->
| 名称 | 说明 |
| --- | --- |
| `default` | 内容 |

### Tag Events

<!-- prettier-ignore -->
| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `click` | 点击按钮时触发 | `(event: Event)` |
| `close` | 移除标签时触发 | `(event: CustomEvent)` |

### Tag Methods

<!-- prettier-ignore -->
| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| `setColor(value?)` | 替换颜色变量，与赋值 `color` 等价；省略参数或传入 `{}` 可重置，保留其它内联样式 | `(value?: TagColor) => void` |

### 颜色生成工具

```text
generateTagColor(color: string): TagColor
```

从 `litos-ui/utils` 或总入口导入 `generateTagColor`。

<!-- prettier-ignore -->
| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `color` | `string` | 基础颜色，例如 `"#00AA7E"`；空字符串或纯空白返回 `{}` |

**返回值：** `TagColor` 对象，包含文字、边框颜色及对应的浅色背景。

`TagColor` 是这三个 CSS 变量的可选字符串映射，允许只覆盖部分变量；可通过 `import type { TagColor } from "litos-ui/utils"` 或总入口引入。

### Tag CSS Variables

<!-- prettier-ignore -->
| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--l-tag-height` | 标签高度 | `22px` |
| `--l-tag-border-color` | 标签边框颜色 | `#dedede` |
| `--l-tag-background` | 标签背景色 | `#fff` |
| `--l-tag-color` | 标签字体颜色 | `#333` |