# Menu 菜单

为网站提供导航功能的菜单。

## 引用

```js
import { Menu, regist } from "litos-ui";

regist(Menu);
```

## 演示

### 侧栏

垂直菜单，可内嵌子菜单。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-menu>
    <l-sub-menu key="N1">
      <iconify-icon icon="tdesign:app" slot="icon"></iconify-icon>
      <span slot="title">导航一</span>
      <l-menu-item key="A1">选项1</l-menu-item>
      <l-menu-item key="A2">选项2</l-menu-item>
      <l-menu-item key="A3">选项3</l-menu-item>
    </l-sub-menu>
    <l-sub-menu key="N2">
      <iconify-icon icon="solar:bug-outline" slot="icon"></iconify-icon>
      <span slot="title">导航二</span>
      <l-menu-item key="B1">选项1</l-menu-item>
      <l-menu-item key="B2">选项2</l-menu-item>
      <l-menu-item key="B3">选项3</l-menu-item>
    </l-sub-menu>
    <l-sub-menu key="N3">
      <iconify-icon icon="stash:light-bulb" slot="icon"></iconify-icon>
      <span slot="title">导航二</span>
      <l-menu-item key="C1">选项1</l-menu-item>
      <l-menu-item key="C2">选项2</l-menu-item>
    </l-sub-menu>
    <l-menu-item key="N4">
      <iconify-icon icon="solar:book-linear" slot="icon"></iconify-icon>
      <span>选项2</span>
    </l-menu-item>
  </l-menu>
</textarea>
<div class="source">
<textarea lang="html">
  <l-menu></l-menu>
</textarea>
</div>
</l-code-preview>
</ClientOnly>

## API

### Menu Attibutes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| x | x | x | x |

### Menu Slots

<!-- prettier-ignore -->
| 名称 | 说明 |
| --- | --- |
| `default` | 内容 |

### Menu Events

<!-- prettier-ignore -->
| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `click` | 点击按钮时触发 | `(event: Event)` |

### Menu Methods

<!-- prettier-ignore -->
| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| `x` | x | `(x: number): string` |

### Menu CSS Variables

<!-- prettier-ignore -->
| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--l` | x | `#fff` |
