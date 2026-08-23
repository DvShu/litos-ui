# Menu 菜单

为网站提供导航功能的垂直菜单组件，支持多级嵌套子菜单、手风琴模式、压缩模式和自定义图标。

## 引用

```js
import { Menu, regist } from "litos-ui";

regist(Menu);
```

## 演示

<script setup>
  import { onMounted, onUnmounted, nextTick } from 'vue';
  import { $one, on, off, $$, $ } from 'ph-utils/browser';

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
      label: "导航三",
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
      label: "选项四",
      icon: () => {
        return $$('iconify-icon', { icon: 'solar:book-linear' });
      },
    },
  ];

  let roleBtns;
  let $menuCollapsed;

  function handleRoleBtnClick(e) {
    const role = e.target.getAttribute('role');
    if (role === 'collapsed') {
      const action = e.target.getAttribute('data-action');
      if ($menuCollapsed) {
        if (action === 'collapse') {
          $menuCollapsed.setAttribute('collapsed', '');
        } else {
          $menuCollapsed.removeAttribute('collapsed');
        }
      }
    }
  }

  onMounted(() => {
    nextTick(() => {
      if (!import.meta.env.SSR) {
        const $menu = $one('#menu');
        $menu.items = menuItems;
        const $menuAccordion = $one('#menu-accordion');
        $menuAccordion.items = menuItems;
        $menuCollapsed = $one('#menu-collapsed');
        if ($menuCollapsed) $menuCollapsed.items = menuItems;
        roleBtns = $('l-button[role]');
        if (roleBtns) {
          roleBtns.forEach(btn => {
            on(btn, 'click', handleRoleBtnClick);
          });
        }
      }
    })
  });

  onUnmounted(() => {
    if (!import.meta.env.SSR) {
      if (roleBtns) {
        roleBtns.forEach(btn => {
          off(btn, 'click', handleRoleBtnClick);
        });
      }
    }
  });
</script>

### 基础用法

垂直菜单，可内嵌子菜单。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-menu id="menu" selected-index="A1">
  </l-menu>
</textarea>
<div class="source">
  <textarea lang="html">
    <l-menu id="menu" selected-index="A1">
    </l-menu>
  </textarea>
  <textarea lang="ts">
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
        label: "导航三",
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
        label: "选项四",
        icon: () => {
          return $$('iconify-icon', { icon: 'solar:book-linear' });
        },
      },
    ];
    const $menu = $one('#menu');
    $menu.items = menuItems;
  </textarea>
</div>
</l-code-preview>
</ClientOnly>

### 手风琴模式

设置 `accordion` 属性，同一时间只展开一个子菜单。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-menu id="menu-accordion" accordion> 
  </l-menu>
</textarea>
</l-code-preview>
</ClientOnly>

### 压缩模式

设置 `collapsed` 属性，菜单将压缩为仅显示图标的窄栏模式，同时自动折叠所有已展开的子菜单。通过 `collapsed-width` 控制压缩后的宽度，`collapsed-icon-size` 控制压缩后的图标大小。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <div>
    <l-button role="collapsed" data-action="expand">展开</l-button>
    <l-button role="collapsed" data-action="collapse">折叠</l-button>
  </div>
  <l-menu id="menu-collapsed" collapsed collapsed-width="56" collapsed-icon-size="20">
  </l-menu>
</textarea>
<div class="source">
  <textarea lang="html">
    <l-menu id="menu-collapsed" collapsed collapsed-width="56" collapsed-icon-size="20">
    </l-menu>
  </textarea>
  <textarea lang="ts">
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
        key: "N4",
        label: "选项四",
        icon: () => {
          return $$('iconify-icon', { icon: 'solar:book-linear' });
        },
      },
    ];
    const $menu = $one('#menu-collapsed');
    $menu.items = menuItems;
  </textarea>
</div>
</l-code-preview>
</ClientOnly>

## MenuItem 数据结构

<!-- prettier-ignore -->
| 属性 | 说明 | 类型 | 必填 |
| --- | --- | --- | --- |
| `key` | 菜单项唯一标识 | `string` | 是 |
| `label` | 菜单项标题 | `string \| ((item: MenuItem) => HTMLElement)` | 是 |
| `icon` | 菜单项图标，返回 HTMLElement | `(item: MenuItem) => HTMLElement` | 否 |
| `children` | 子菜单项 | `MenuItem[]` | 否 |

## API

### Menu Attributes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `selected-index` | 当前选中的菜单项 key | `string` | - |
| `accordion` | 是否手风琴模式，只有一个子菜单展开 | `boolean` | `false` |
| `collapsed` | 是否压缩菜单，只显示图标，隐藏文本并折叠所有子菜单 | `boolean` | `false` |
| `collapsed-width` | 压缩后菜单宽度 | `number` | `-` |
| `icon-size` | 图标大小 | `number` | `-` |
| `collapsed-icon-size` | 压缩后图标大小 | `number` | `-` |

### Menu Properties

<!-- prettier-ignore -->
| 属性 | 说明 | 类型 |
| --- | --- | --- |
| `items` | 菜单项数据，可通过 JS 动态设置 | `MenuItem[]` |

### Menu Events

<!-- prettier-ignore -->
| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `select` | 菜单项点击时触发 | `(event: CustomEvent<{ key: string, keyPaths: string[] }>)` |

### Menu Methods

<!-- prettier-ignore -->
| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| `expandSubmenus` | 展开指定 key 的子菜单 | `(keys: string[], collapseOther?: boolean): void` |
| `updateSelectedKeys` | 更新选中的菜单项 | `(key: string): void` |

### Menu CSS Variables

<!-- prettier-ignore -->
| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--l-menu-width` | 菜单宽度 | `240px` |
| `--l-menu-height` | 菜单高度 | `auto` |
| `--l-menu-item-height` | 菜单项高度 | `40px` |
| `--l-menu-item-padding-x` | 菜单项水平内边距 | `10px` |
| `--l-menu-item-indent` | 子菜单缩进距离 | `15px` |
| `--l-menu-item-radius` | 菜单项圆角 | `0` |
| `--l-menu-item-hover-background` | 菜单项悬浮背景色 | `#f9f0ff` |
| `--l-menu-item-active-color` | 菜单项选中文字颜色 | `#722ed1` |
| `--l-menu-item-active-background` | 菜单项选中背景色 | `#f9f0ff` |
| `--l-menu-border-color` | 菜单边框颜色 | `#dedede` |
| `--l-menu-border-width` | 菜单边框宽度 | `1px` |
| `--l-menu-arrow-color` | 子菜单箭头颜色 | `#8c8c8c` |
| `--l-menu-collapsed-width` | 压缩后菜单宽度 | `56px` |
| `--l-menu-icon-size` | 图标大小 | `14px` |
| `--l-menu-collapsed-icon-size` | 压缩后图标大小 | `20px` |