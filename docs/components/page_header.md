# PageHeader

用于页面的顶部，显示标题以及返回按钮。常用于二级、三级页面。

## 引用

```js
import { regist, PageHeader, Button, ArrowLeftIcon } from "litos-ui";

regist(PageHeader);
regist([Button, ArrowLeftIcon]); // 如果需要显示返回按钮
```

## 演示

### 基础用法

通过 `title-align` 属性设置标题的对齐方式。分为：`left`、`center`。默认为: `left`

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-page-header page-title="标题" page-sub-title="副标题" show-right>
    <l-more-icon slot="right"></l-more-icon>
  </l-page-header>
  <hr/>
  <l-page-header page-title="标题" align="center" show-right height="44px" border>
    <l-more-icon slot="right" data-action="more"></l-more-icon>
  </l-page-header>
</textarea>
</l-code-preview>
</ClientOnly>

### 监听事件

通过监听 `page-header` 的 `action` 事件, 然后给任何子节点添加 `l-action` 属性, 点击子节点会自动触发 `action` 事件。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-page-header page-title="标题" page-sub-title="副标题" show-right>
    <l-more-icon slot="right" l-action="more"></l-more-icon>
  </l-page-header>
</textarea>
<div class="source">
<textarea lang="html">
  <l-page-header id="header" page-title="标题" page-sub-title="副标题" show-right>
    <l-more-icon slot="right" l-action="more" data-param="1"></l-more-icon>
  </l-page-header>
</textarea>
<textarea lang="js">
  const header = document.getElementById("header");
  header.addEventListener("action", (e) => {
    const detail = e.detail;
    if (detail.action === 'back') {
      // 点击了返回按钮
    } else if (detail.action === 'more') {
      console.log(detail.param); // 1
    }
  });
</textarea>
</div>
</l-code-preview>
</ClientOnly>

## API

### PageHeader Attibutes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `show-left` | 是否显示左边区域 | `boolean` | `true` |
| `show-right` | 是否显示右边区域 | `boolean` | `true` |
| `height` | 高度 | `string` | - |
| `border` | 是否显示底部边框 | `boolean` | `false` |
| `align` | 标题对齐方式 | `left`、`center` | `left` |
| `show-back` | 是否显示返回按钮 | `boolean` | `true` |
| `back-text` | 返回按钮文本 | `string` | 返回 |
| `page-title` | 标题 | `string` | - |
| `page-sub-title` | 副标题 | `string` | - |

### PageHeader Slots

<!-- prettier-ignore -->
| 名称 | 说明 |
| --- | --- |
| `default` | 标题内容 |
| `left` | 左边区域内容 |
| `right` | 右边区域内容 |

### PageHeader Events

<!-- prettier-ignore -->
| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `click` | 点击按钮时触发 | `(event: Event)` |
| `action` | 点击子节点时触发, 子节点需要添加 `l-action` 属性, 通过 `event.detail` 获取 `acton` 以及 `dataset` | `(event: CustomEvent)` |

### PageHeader Methods

<!-- prettier-ignore -->
| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| - | - | - |

### PageHeader CSS Variables

<!-- prettier-ignore -->
| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| - | - | - |
