# Menu

A vertical navigation menu with nested submenus, accordion mode, collapsed mode, and custom icons.

## Import and Registration

```js
import { Menu, regist, Button, ArrowRightIcon } from "litos-ui";

regist([ArrowRightIcon, Menu]);

// Register the additional components used in this page’s demos.
regist([Button]);
```

The custom icon examples use iconify-icon. Install and import that package separately to use them; Menu itself does not require this icon library.

## Examples

<script setup>
  import { onMounted, onUnmounted, nextTick } from 'vue';
  import { $one, on, off, $$, $ } from 'utilane/browser';

  const menuItems = [
    {
      key: "N1",
      label: "Navigation 1",
      icon: () => {
        return $$('iconify-icon', { icon: 'tdesign:app' });
      },
      children: [
        { key: "A1", label: "Option 1" },
        { key: "A2", label: "Option 2" },
        { key: "A3", label: "Option 3" },
      ],
    },
    {
      key: "N2",
      label: "Navigation 2",
      icon: () => {
        return $$('iconify-icon', { icon: 'solar:bug-outline' });
      },
      children: [
        { key: "B1", label: "Option 1" },
        { key: "B2", label: "Option 2" },
        { key: "B3", label: "Option 3" },
      ],
    },
    {
      key: "N3",
      label: "Navigation 3",
      icon: () => {
        return $$('iconify-icon', { icon: 'stash:light-bulb' });
      },
      children: [
        { key: "C1", label: "Option 1" },
        { key: "C2", label: "Option 2" },
      ],
    },
    {
      key: "N4",
      label: "Option 4",
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

### Basic Usage

A vertical menu that supports nested submenus.

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
        label: "Navigation 1",
        icon: () => {
          return $$('iconify-icon', { icon: 'tdesign:app' });
        },
        children: [
          { key: "A1", label: "Option 1" },
          { key: "A2", label: "Option 2" },
          { key: "A3", label: "Option 3" },
        ],
      },
      {
        key: "N2",
        label: "Navigation 2",
        icon: () => {
          return $$('iconify-icon', { icon: 'solar:bug-outline' });
        },
        children: [
          { key: "B1", label: "Option 1" },
          { key: "B2", label: "Option 2" },
          { key: "B3", label: "Option 3" },
        ],
      },
      {
        key: "N3",
        label: "Navigation 3",
        icon: () => {
          return $$('iconify-icon', { icon: 'stash:light-bulb' });
        },
        children: [
          { key: "C1", label: "Option 1" },
          { key: "C2", label: "Option 2" },
        ],
      },
      {
        key: "N4",
        label: "Option 4",
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

### Accordion Mode

Set the `accordion` attribute to keep only one submenu expanded at a time.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-menu id="menu-accordion" accordion>
  </l-menu>
</textarea>
</l-code-preview>
</ClientOnly>

### Collapsed Mode

Set `collapsed` to display a narrow, icon-only menu and collapse all expanded submenus. Use `collapsed-width` to set the collapsed width and `collapsed-icon-size` to set the icon size in this mode.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <div>
    <l-button role="collapsed" data-action="expand">Expand</l-button>
    <l-button role="collapsed" data-action="collapse">Collapse</l-button>
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
        label: "Navigation 1",
        icon: () => {
          return $$('iconify-icon', { icon: 'tdesign:app' });
        },
        children: [
          { key: "A1", label: "Option 1" },
          { key: "A2", label: "Option 2" },
          { key: "A3", label: "Option 3" },
        ],
      },
      {
        key: "N2",
        label: "Navigation 2",
        icon: () => {
          return $$('iconify-icon', { icon: 'solar:bug-outline' });
        },
        children: [
          { key: "B1", label: "Option 1" },
          { key: "B2", label: "Option 2" },
          { key: "B3", label: "Option 3" },
        ],
      },
      {
        key: "N4",
        label: "Option 4",
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

## MenuItem Data Structure

<!-- prettier-ignore -->
| Property | Description | Type | Required |
| --- | --- | --- | --- |
| `key` | Unique item identifier | `string` | Yes |
| `label` | Item label | `string \| ((item: MenuItem) => HTMLElement)` | Yes |
| `icon` | Item icon renderer; returns an HTMLElement | `(item: MenuItem) => HTMLElement` | No |
| `children` | Submenu items | `MenuItem[]` | No |

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/menu";
```

Element entries register themselves and their configured dependencies; conditional features may require additional imports. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](/en/on_demand) for styles, child elements, types and root-entry compatibility.

## API

### Menu Attributes

<!-- prettier-ignore -->
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `selected-index` | Key of the selected menu item | `string` | - |
| `accordion` | Whether only one submenu can be expanded | `boolean` | `false` |
| `collapsed` | Whether to show only icons, hide text, and collapse all submenus | `boolean` | `false` |
| `collapsed-width` | Menu width when collapsed | `number` | `-` |
| `icon-size` | Icon size | `number` | `-` |
| `collapsed-icon-size` | Icon size when collapsed | `number` | `-` |

### Menu Properties

<!-- prettier-ignore -->
| Property | Description | Type |
| --- | --- | --- |
| `items` | Menu item data; can be updated dynamically through JavaScript | `MenuItem[]` |

### Menu Events

<!-- prettier-ignore -->
| Event | Description | Callback |
| --- | --- | --- |
| `select` | Fires when a menu item is clicked | `(event: CustomEvent<{ key: string, keyPaths: string[] }>)` |

### Menu Methods

<!-- prettier-ignore -->
| Method | Description | Parameters |
| --- | --- | --- |
| `expandSubmenus` | Expands the submenus with the specified keys | `(keys: string[], collapseOther?: boolean): void` |
| `updateSelectedKeys` | Updates the selected menu item | `(key: string): void` |

### Menu CSS Variables

<!-- prettier-ignore -->
| Name | Description | Default |
| --- | --- | --- |
| `--l-menu-width` | Menu width | `240px` |
| `--l-menu-height` | Menu height | `auto` |
| `--l-menu-item-height` | Item height | `40px` |
| `--l-menu-item-padding-x` | Item horizontal padding | `10px` |
| `--l-menu-item-indent` | Submenu indentation | `15px` |
| `--l-menu-item-radius` | Item border radius | `0` |
| `--l-menu-item-hover-background` | Item background on hover | `var(--l-primary-color-light5, #f9f0ff)` |
| `--l-menu-item-active-color` | Selected item text color | `var(--l-primary-color, #722ed1)` |
| `--l-menu-item-active-background` | Selected item background | `var(--l-primary-color-light5, #f9f0ff)` |
| `--l-menu-border-color` | Menu border color | `transparent` |
| `--l-menu-border-width` | Menu border width | `0px` |
| `--l-menu-arrow-color` | Submenu arrow color | `var(--l-text-color, #8c8c8c)` |
| `--l-menu-collapsed-width` | Menu width when collapsed | `40px` |
| `--l-menu-icon-size` | Icon size | `1.8rem` |
| `--l-menu-collapsed-icon-size` | Icon size when collapsed | `1.8rem` |