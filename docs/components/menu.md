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
  <l-menu id="menu" selected-index="A1" accordion>
    <l-sub-menu index="N1">
      <iconify-icon icon="tdesign:app" slot="icon"></iconify-icon>
      <span slot="title">导航一</span>
      <l-menu-item index="A1">选项1</l-menu-item>
      <l-menu-item index="A2">选项2</l-menu-item>
      <l-menu-item index="A3">选项3</l-menu-item>
    </l-sub-menu>
    <l-sub-menu index="N2">
      <iconify-icon icon="solar:bug-outline" slot="icon"></iconify-icon>
      <span slot="title">导航二</span>
      <l-menu-item index="B1">选项1</l-menu-item>
      <l-menu-item index="B2">选项2</l-menu-item>
      <l-menu-item index="B3">选项3</l-menu-item>
    </l-sub-menu>
    <l-sub-menu index="N3">
      <iconify-icon icon="stash:light-bulb" slot="icon"></iconify-icon>
      <span slot="title">导航二</span>
      <l-menu-item index="C1">选项1</l-menu-item>
      <l-menu-item index="C2">选项2</l-menu-item>
    </l-sub-menu>
    <l-menu-item index="N4">
      <iconify-icon icon="solar:book-linear" slot="icon"></iconify-icon>
      <span>选项2</span>
    </l-menu-item>
  </l-menu>
</textarea>
</l-code-preview>
</ClientOnly>

## API

### Menu Attibutes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `selected-index` | 当前选中的菜单项 | `string` | - |
| `accordion` | 否手风琴模式, 只有一个子菜单展开 | `boolean` | - |

### Menu Slots

<!-- prettier-ignore -->
| 名称 | 说明 |
| --- | --- |
| `default` | 菜单项 |

### Menu Events

<!-- prettier-ignore -->
| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `select` | 菜单激活回调, `detail` 参数: `key,keyPaths` | `(event: CustomEvent)` |

### Menu Methods

<!-- prettier-ignore -->
| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| `expandSubmenus` | 展开与提供的 `keys` 对应的子菜单。 | `(keys: string[], collapseOther = false): void` |

### Menu CSS Variables

<!-- prettier-ignore -->
| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--l` | x | `#fff` |
