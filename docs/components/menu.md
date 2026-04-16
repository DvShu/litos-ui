# Menu 菜单

为网站提供导航功能的菜单。

## 引用

```js
import { Menu, regist } from "litos-ui";

regist(Menu);
```

## 演示

<script setup>
  import { onMounted, onUnmounted, nextTick } from 'vue';
  import { $one, on, off, $$ } from 'ph-utils/dom';

  const menuItems = [
    {
      key: "N1",
      label: "导航一",
      icon: () => {
        return $$('iconify-icon', { icon: 'tdesign:app' });
      },
      children: [
        { key: "A1", label: "选项1" },
        { key: "A2", label: "选项2" },
        { key: "A3", label: "选项3" },
      ],
    },
    {
      key: "N2",
      label: "导航二",
      icon: () => {
        return $$('iconify-icon', { icon: 'solar:bug-outline' });
      },
      children: [
        { key: "B1", label: "选项1" },
        { key: "B2", label: "选项2" },
        { key: "B3", label: "选项3" },
      ],
    },
    {
      key: "N3",
      label: "导航二",
      icon: () => {
        return $$('iconify-icon', { icon: 'stash:light-bulb' });
      },
      children: [
        { key: "C1", label: "选项1" },
        { key: "C2", label: "选项2" },
      ],
    },
    {
      key: "N4",
      label: "选项2",
      icon: () => {
        return $$('iconify-icon', { icon: 'solar:book-linear' });
      },
    },
  ];

  onMounted(() => {
    nextTick(() => {
      if (!import.meta.env.SSR) {
        const $menu = $one('#menu');
        $menu.setItems(menuItems);
      }
    })
  });
</script>

### 侧栏

垂直菜单，可内嵌子菜单。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-menu id="menu" selected-index="A1">
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