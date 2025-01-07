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

将 `type` 设置为 `nav`[默认]; 通过 `l-name` 标记选项卡项，`l-icon` 标记为图标

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
    <div l-name="1">选项1</div>
    <div l-name="2">选项2</div>
    <div l-name="3">选项3</div>
  </l-tabbar>
</textarea>
</l-code-preview>
</ClientOnly>

### 卡片式

具有卡片风格的标签。只需要设置 `type` 属性为 `card` 就可以使选项卡改变为标签风格。 同时可以通过 `gap` 调整选项卡之间的间距。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-tabbar type="card" name="1">
    <div l-name="1">选项1</div>
    <div l-name="2">选项2</div>
    <div l-name="3">选项3</div>
  </l-tabbar>
  <hr />
  <l-tabbar type="card" name="1" gap="5">
    <div l-name="1">选项1</div>
    <div l-name="2">选项2</div>
    <div l-name="3">选项3</div>
  </l-tabbar>
</textarea>
</l-code-preview>
</ClientOnly>

### 排列方式

主轴的排列方式，只对 `bar` 类型生效。只需要将 `justify-content` 的属性设置为 [justify-content](https://developer.mozilla.org/zh-CN/docs/Web/CSS/justify-content#%E5%80%BC) 可用值即可。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-tabbar type="bar" name="1" justify-content="center">
    <div l-name="1">选项1</div>
    <div l-name="2">选项2</div>
    <div l-name="3">选项3</div>
  </l-tabbar>
  <hr />
  <l-tabbar type="bar" name="1" justify-content="space-between">
    <div l-name="1">选项1</div>
    <div l-name="2">选项2</div>
    <div l-name="3">选项3</div>
  </l-tabbar>
  <hr />
  <l-tabbar type="bar" name="1" justify-content="space-around">
    <div l-name="1">选项1</div>
    <div l-name="2">选项2</div>
    <div l-name="3">选项3</div>
  </l-tabbar>
  <hr />
  <l-tabbar type="bar" name="1" justify-content="space-evenly">
    <div l-name="1">选项1</div>
    <div l-name="2">选项2</div>
    <div l-name="3">选项3</div>
  </l-tabbar>
</textarea>
</l-code-preview>
</ClientOnly>

## API

### Tabbar Attibutes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `name` | 选中的选项卡 | `string` | - |
| `type` | 风格 | `nav`、`bar`、`card` | `nav` |
| `gap` | 选项卡之间的间距 | `number`、`string` | `0` |
| `justify-content` | 主轴排列方式 | `string` | `flex-start` |

### Tabbar Slots

<!-- prettier-ignore -->
| 名称 | 说明 |
| --- | --- |
| `default` | 内容, 通过 `l-name` 标记选项卡项, `l-icon` 标记为图标 |

### Tabbar Events

<!-- prettier-ignore -->
| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `change` | 选项卡切换时触发, `e.detail.name` 获取选中值 | `(e: Event)` |

### Tabbar Methods

<!-- prettier-ignore -->
| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| `setItems` | 设置选项卡栏的项目列表, 通过 `js` 渲染选项卡, 注意: *调用该函数会清空之前的渲染, 然后重新渲染* | `(items: TabbarItem[]): void` |
| `addItems` | 向标签栏添加项目 | `(items: TabbarItem[]): void` |

### TabbarItem

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `name` | 选项卡项的名称， *必填* | `string` | - |
| `icon` | 选项卡项的图标 | `string`、`() => string \| HTMLElement` | - |
| `text` | 选项卡内容 | `string`、`() => string \| HTMLElement` | - |

### Tabbar CSS Variables

<!-- prettier-ignore -->
| 变量名                           | 说明                     | 默认值                           |
| -------------------------------- | ------------------------ | -------------------------------- |
| `--l-tabbar-hover-color`        | 选项卡的鼠标悬浮时的颜色 | `var(--l-primary-color-light1)` |
| `--l-tabbar-active-color`       | 选项卡的选中时的颜色     | `var(--l-primary-color)`        |
| `--l-tabbar-item-gap`           | 选项卡之间的间距         | `0`                              |
| `--l-tabbar-height`             | 选项卡的高度             | `38px`[`nav`时默认为: `50px`]    |
| `--l-tabbar-line-color`         | 下划线的颜色             | `var(--l-primary-color)`        |
| `--l-tabbar-card-border-color`  | 卡片选项卡的边框颜色     | `#f5f7fa`                        |
| `--l-tabbar-card-border-radius` | 卡片选项卡的边框圆角     | `5px`                            |
