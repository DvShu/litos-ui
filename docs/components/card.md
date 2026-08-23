# Card 卡片

通用卡片应用，常用于后台概览页面。

## 引用

```js
import { Card, regist } from "litos-ui";

regist(Card);
```

## 典型卡片

包含标题、内容、操作区域。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-card header-text="卡片标题">
    <div>卡片内容</div>
    <l-button slot="header-extra" text type="primary" size="small">按钮</l-button>
  </l-card>
</textarea>
</l-code-preview>
</ClientOnly>

## 简洁卡片

只包含内容区域，通过设置 `show-header` 为 `false` 隐藏标题。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-card header-text="卡片标题" show-header="false">
    <div>卡片内容</div>
  </l-card>
</textarea>
</l-code-preview>
</ClientOnly>

## 完整卡片

卡片包含标题、内容、操作区域以及底部区域。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-card header-text="卡片标题" show-footer footer-text="底部区域">
    <div>卡片内容</div>
    <l-button slot="header-extra" text type="primary" size="small">按钮</l-button>
  </l-card>
</textarea>
</l-code-preview>
</ClientOnly>

## 卡片标题

标题和底部区域除了可以通过 `header-text` 和 `footer-text` 传递以外，也可以通过 `header` 和 `footer` 插槽自定义。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-card show-footer>
    <span slot="header" style="color: red">卡片标题</span>
    <div>卡片内容</div>
    <l-button slot="header-extra" text type="primary" size="small">按钮</l-button>
    <span slot="footer" style="color: orange">底部区域</span>
  </l-card>
</textarea>
</l-code-preview>
</ClientOnly>

## 栅格卡片

在系统概览页面常常和栅格进行配合。通常用于管理后台的工作台聚合展示。

关于栅格布局，框架不提供，推荐使用 [unocss](https://unocss.dev/interactive/?s=grid) 或者 [tailwindcss](https://www.tailwindcss.cn/docs/display#grid) 的 `grid` 实现

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <div class="grid grid-cols-3 gap-4">
    <l-card header-text="卡片标题1">
      <div>卡片内容1</div>
      <l-button slot="header-extra" text type="primary" size="small">按钮</l-button>
    </l-card>
    <l-card header-text="卡片标题2">
      <div>卡片内容2</div>
      <l-button slot="header-extra" text type="primary" size="small">按钮</l-button>
    </l-card>
    <l-card header-text="卡片标题3">
      <div>卡片内容3</div>
      <l-button slot="header-extra" text type="primary" size="small">按钮</l-button>
    </l-card>
  </div>
</textarea>
</l-code-preview>
</ClientOnly>

## API

### Card Attributes

<!-- prettier-ignore -->
| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `header-text` | 标题文本 | `string` | - |
| `show-header` | 是否显示标题 | `boolean` | `true` |
| `footer-text` | 底部区域文本 | `string` | - |
| `show-footer` | 是否显示底部区域 | `boolean` | `false` |

### Card Slots

<!-- prettier-ignore -->
| 名称 | 说明 |
| --- | --- |
| `default` | 内容区域内容 |
| `header` | 自定义标题内容 |
| `footer` | 自定义底部区域内容 |
| `header-extra` | 自定义标题右侧内容（操作区域） |

### CSS Parts

<!-- prettier-ignore -->
| 名称 | 说明 |
| --- | --- |
| `header` | 标题区域 |
| `body` | 内容区域 |
| `footer` | 底部区域 |

通过 `::part(header)` 可以自定义标题区域样式：

```css
l-card::part(header) {
  background-color: #f5f5f5;
}
```

### 样式变量

<!-- prettier-ignore -->
| 名称 | 描述 | 默认值 |
| --- | --- | --- |
| `--l-card-bg` | 卡片背景颜色 | `#ffffff` |
| `--l-card-text-color` | 卡片文字颜色 | `#333` |
| `--l-card-border-color` | 卡片边框颜色 | `var(--l-border-color, #e8e8e8)` |