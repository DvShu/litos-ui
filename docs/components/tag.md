# Tag 标签

通常用来展示一些属性

## 引用

```js
import { regist, Tag, CloseIcon } from "litos-ui";

regist(Tag);
regist(CloseIcon); // 需要 closable 引入
```

## 演示

<script setup>
  import { onMounted, onUnmounted, nextTick } from 'vue';
  import { transition } from 'ph-utils/dom';

  let $addBtn;
  let $tagContainer;

  function handleAddTag() {
    if ($tagContainer) {
      const $addTag = document.createElement('l-tag');
      $addTag.setAttribute('closable', 'true');
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

  onMounted(() => {
    nextTick(() => {
      if (!import.meta.env.SSR) {
        $addBtn = document.getElementById('btn-add');
        $tagContainer = document.getElementById('tag-container');
        $tagContainer.addEventListener('close', onClose);
        $addBtn.addEventListener('click', handleAddTag);
      }
    });
  });

</script>

### 基础用法

由 `type` 属性来选择 `tag` 的类型。也可以通过 `color` 属性来自定义背景色。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-tag type="primary">标签</l-tag>
  <l-tag type="success">标签</l-tag>
  <l-tag type="info">标签</l-tag>
  <l-tag type="warning">标签</l-tag>
  <l-tag type="error">标签</l-tag>
  <l-tag color="#409eff">标签</l-tag>
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
  <l-tag color="#409eff" closeable>标签</l-tag>
</textarea>
</l-code-preview>
</ClientOnly>

> 需要引入 `CloseIcon` 组件

### 过渡效果

如果想给标签添加显示或移除时的过渡效果，通过 `ph-utils/transition` 实现, 具体使用参考 [transition](/components/transition)。

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
  import { transition } from 'ph-utils/dom';
  //-
  function handleAddTag() {
    if ($tagContainer) {
      const $addTag = document.createElement('l-tag');
      $addTag.setAttribute('closable', 'true');
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

## API

### Tag Attibutes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `type` | 类型 | `string` | `primary`, 可选值有: `primary`, `success`, `info`, `warning`, `error` |
| `color` | 标签颜色 | `string` | - |
| `closeable` | 是否可移除 | `boolean` | `false` |

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
| - | - | - |

### Tag CSS Variables

<!-- prettier-ignore -->
| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--l-tag-height` | 标签高度 | `22px` |
| `--l-tag-border-color` | 标签边框颜色 | `#dedede` |
| `--l-tag-background` | 标签背景色 | `#fff` |
| `--l-tag-color` | 标签字体颜色 | `#333` |
