# List 滚动列表

无限加载数据的列表。滚动至底部时，加载更多数据。

## 引用

```js
import { List, regist, LoadingIcon } from "litos-ui";

regist([List, LoadingIcon]);
```

## 演示

<script setup>
  import { $one, on, off } from 'ph-utils/dom';
  import { onMounted, onUnmounted, nextTick } from 'vue';

  let $list;
  let $list1;
  // 模拟分页数据
  let start = 0;
  let max = 20;
  let step = 10;

  function handleLoadmore() {
     // 模拟数据加载
    setTimeout(() => {
      if ($list && start < max) {
        let isFinish = false;
        let end = start + step;
        if (start + step >= max) {
          isFinish = true;
          end = max;
        }
        $list.append(createRenderFragemnt(start, end));
        if (isFinish) {
          $list.setAttribute('finish', 'finish');
        } else {
          $list.removeAttribute('finish');
        }
        start = end;
      }
    }, 1000);
  }

  function createRenderFragemnt(start, end) {
    const fragment = document.createDocumentFragment();
    for (let i = start; i < end; i++) {
      const $div = document.createElement('div');
      $div.style.cssText = 'padding: 10px; border-bottom: 1px solid #dedede;';
      $div.textContent = i;
      fragment.appendChild($div);
    }
    return fragment;
  }

  onMounted(() => {
    nextTick(() => {
      $list = $one('#list');
      if ($list) {
        on($list, 'load-more', handleLoadmore);
      }

      $list1 = $one('#list1');
      if ($list1) {
        $list1.append(createRenderFragemnt(0, 100));
      }
    });
  });

  onUnmounted(() => {
    if ($list) {
      off($list, 'load-more', handleLoadmore);
    }
  });
</script>

### 基础用法

滚动到底部触发 `load-more` 加载更多事件，通过 `finish` 属性决定是否加载完成。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <div style="height:300px">
    <l-list id="list"></l-list>
  </div>
</textarea>
<div class="source">
<textarea lang="html">
  <div style="height:300px">
    <l-list id="list"></l-list>
  </div>
</textarea>
<textarea lang="js">
  const $list = document.querySelector('#list');
  // 模拟分页数据
  let start = 0;
  let max = 20;
  let step = 10;
  //-
  function handleLoadmore() {
     // 模拟数据加载
    setTimeout(() => {
      if ($list && start < max) {
        let isFinish = false;
        let end = start + step;
        if (start + step >= max) {
          isFinish = true;
          end = max;
        }
        $list.append(createRenderFragemnt(start, end));
        if (isFinish) {
          $list.setAttribute('finish', 'finish');
        } else {
          $list.removeAttribute('finish');
        }
        start = end;
      }
    }, 1000);
  }
  //-
  function createRenderFragemnt(start, end) {
    const fragment = document.createDocumentFragment();
    for (let i = start; i < end; i++) {
      const $div = document.createElement('div');
      $div.style.cssText = 'padding: 10px; border-bottom: 1px solid #dedede;';
      $div.textContent = i;
      fragment.appendChild($div);
    }
    return fragment;
  }
  //-
  // 监听加载事件
  $list.addEventListener('load-more', handleLoadmore);
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### 普通列表

通过传递 `infinite="false"` 禁用滚动加载这样就成了一个单纯的可以滚动的列表。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <div style="height:300px">
    <l-list id="list1" infinite="false"></l-list>
  </div>
</textarea>
<div class="source">
<textarea lang="html">
  <div style="height:300px">
    <l-list id="list1" infinite="false"></l-list>
  </div>
</textarea>
<textarea lang="js">
  const $list1 = document.querySelector('#list1');
  $list1.append(createRenderFragemnt(0, 100));
</textarea>
</div>
</l-code-preview>
</ClientOnly>

## API

### List Attibutes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `finish` | 是否加载完成 | `boolean` | `false` |
| `infinite` | 是否无限滚动 | `boolean` | `true` |

### List Slots

<!-- prettier-ignore -->
| 名称 | 说明 |
| --- | --- |
| `default` | 列表内容 |

### List Events

<!-- prettier-ignore -->
| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `load-more` | 加载更多 | `()` |
