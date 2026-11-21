---
url: https://dvshu.github.io/litos-ui/components/list.md
---
# List 滚动列表

无限加载数据的列表。滚动至底部时，加载更多数据。

## 引用

```js
import { List, regist, LoadingIcon } from "litos-ui";

regist([List, LoadingIcon]);
```

## 演示

### 基础用法

滚动到底部触发 `load` 加载更多事件，通过 `finish` 属性决定是否加载完成。

```html
  <div style="height:300px">
    <l-list id="list"></l-list>
  </div>
```

```js
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
        $list.removeAttribute('loading');
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
  $list.addEventListener('load', handleLoadmore);
```

### 普通列表

通过传递 `infinite="false"` 禁用滚动加载这样就成了一个单纯的可以滚动的列表。

```html
  <div style="height:300px">
    <l-list id="list1" infinite="false"></l-list>
  </div>
```

```js
  const $list1 = document.querySelector('#list1');
  $list1.append(createRenderFragemnt(0, 100));
```

## 按需入口

```js
import "litos-ui/styles/vars.css";
import "litos-ui/list";
```

元素入口会注册内建依赖，服务与工具 API 仍需显式调用。SSR 框架请在客户端入口加载；样式、配套子元素、类型和总入口兼容用法见[按需导入](https://dvshu.github.io/litos-ui/on_demand.md)。

## API

### List Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `finish` | 是否加载完成 | `boolean` | `false` |
| `infinite` | 是否无限滚动 | `boolean` | `true` |

### List Slots

| 名称 | 说明 |
| --- | --- |
| `default` | 列表内容 |

### List Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `load` | 加载更多, `e.detail` 包含 `page` 分页页码 | `(e: CustomEvent)` |
