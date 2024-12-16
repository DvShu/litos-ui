# Tabbar 标签栏

使用场景如下:

1. 底部导航栏，用于在不同页面之间进行切换
2. 标签切换
3. 选项卡

## 引用

```js
import { Tabbar, regist } from "litos-ui";

regist(Tabbar);
```

## 演示

### 导航栏模式

将 `type` 设置为 `nav`[默认]

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-tabbar style="border: 1px solid #dedede">
    <div l-tabbar-item="">
      <l-reduction-icon l-icon></l-reduction-icon>
      <span>Reduction</span>
    </div>
    <div l-tabbar-item>
      <l-refresh-left-icon l-icon></l-refresh-left-icon>
      <span>RefreshLieft</span>
    </div>
    <div l-tabbar-item>
      <l-search-icon l-icon></l-search-icon>
      <span>Search</span>
    </div>
    <div l-tabbar-item>
      <l-refresh-right-icon l-icon></l-refresh-right-icon>
      <span>RefreshRight</span>
    </div>
    <div l-tabbar-item>
      <l-sort-icon l-icon></l-sort-icon>
      <span>Sort</span>
    </div>
  </l-tabbar>
</textarea>
<div class="source">
<textarea lang="html">
  <l-tabbar></l-tabbar>
</textarea>
</div>
</l-code-preview>
</ClientOnly>

## API

### Tabbar Attibutes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| x | x | x | x |

### Tabbar Slots

<!-- prettier-ignore -->
| 名称 | 说明 |
| --- | --- |
| `default` | 内容 |

### Tabbar Events

<!-- prettier-ignore -->
| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `click` | 点击按钮时触发 | `(event: Event)` |

### Tabbar Methods

<!-- prettier-ignore -->
| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| `x` | x | `(x: number): string` |

### Tabbar CSS Variables

<!-- prettier-ignore -->
| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--l` | x | `#fff` |
