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
  <l-tabbar style="border: 1px solid #dedede" name="Search">
    <div l-name="Reduction">
      <l-reduction-icon l-icon></l-reduction-icon>
      <span>Reduction</span>
    </div>
    <div l-name="RefreshLieft">
      <l-refresh-left-icon l-icon></l-refresh-left-icon>
      <span>RefreshLieft</span>
    </div>
    <div l-name="Search">
      <l-search-icon l-icon></l-search-icon>
      <span>Search</span>
    </div>
    <div l-name="RefreshRight">
      <l-refresh-right-icon l-icon></l-refresh-right-icon>
      <span>RefreshRight</span>
    </div>
    <div l-name="Sort">
      <l-sort-icon l-icon></l-sort-icon>
      <span>Sort</span>
    </div>
  </l-tabbar>
</textarea>
</l-code-preview>
</ClientOnly>

### 选项卡模式

基础的、简洁的选项卡，设置 `type` 为 `bar`。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-tabbar type="bar" name="2">
    <span l-name="1">选项1</span>
    <span l-name="2">选项2</span>
    <span l-name="3">选项3</span>
  </l-tabbar>
</textarea>
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
