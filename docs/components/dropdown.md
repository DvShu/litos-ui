# Dropdown 下拉菜单

通过 `reference` 为已有元素绑定操作菜单，复用 Popover 的显示、悬停和视口边界定位。

## 引入

```js
import { createDropdown } from "litos-ui/dropdown";
import "litos-ui/styles/vars.css";
import "litos-ui/styles/popover.css";
import "litos-ui/styles/dropdown.css";
```

这是函数 API，无需注册自定义元素。SSR 项目在客户端挂载后调用；暗黑模式按需引入 `litos-ui/styles/dark.css`。

## 基础用法与选择反馈

将已有元素传入 `reference`，通过 `items` 配置菜单。`onSelect` 接收选中项和实际触发元素。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
<button id="dropdown-basic" type="button"><span>更多操作 ▾</span></button>
<output id="dropdown-result" aria-live="polite">请选择操作</output>
</textarea>
</l-code-preview>
</ClientOnly>

```js
const menu = createDropdown({
  reference: document.querySelector("#dropdown-basic"),
  trigger: "click",
  items: [
    { key: "edit", label: "编辑" },
    { key: "copy", label: "复制", disabled: true },
    { key: "separator", label: "", divider: true },
    { key: "delete", label: "删除", danger: true },
  ],
  onSelect: ({ key, reference }) => console.log(key, reference),
});
// 页面卸载时清理
menu.destroy();
```

## 悬停与多个触发元素

`reference` 支持元素、元素数组或选择器；多个元素可以共用一个菜单。使用 `trigger: "hover"` 通过鼠标悬停展开。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
<button class="dropdown-shared" type="button">悬停入口 A</button>
<button class="dropdown-shared" type="button">悬停入口 B</button>
</textarea>
</l-code-preview>
</ClientOnly>

```js
const menu = createDropdown({
  reference: ".dropdown-shared",
  trigger: "hover",
  placement: "bottom-end",
  items: [{ key: "view", label: "查看" }],
});
```

## 更新与禁用

使用 `setItems()` 更新选项，`show()` 和 `hide()` 控制显示；禁用状态下不会展开。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
<button id="dropdown-dynamic" type="button">动态菜单</button>
<button type="button" data-dropdown-update>更新选项并展开</button>
<button type="button" data-dropdown-disable>切换禁用状态</button>
<output id="dropdown-disabled" aria-live="polite">可用</output>
</textarea>
</l-code-preview>
</ClientOnly>

```js
menu.setItems([{ key: "refresh", label: "刷新" }]);
menu.show();
menu.setDisabled(true);
menu.setDisabled(false);
menu.hide();
```

## 自定义内容

省略 `items`，通过 `content` 传入 DOM 内容，可复用已有菜单。其交互事件由调用方绑定，`onSelect` 只用于 `items` 生成的菜单。

```js
const menu = createDropdown({
  reference: triggerElement,
  content: customMenuElement,
  trigger: "click",
});
```

## API

### DropdownOptions

<!-- prettier-ignore -->
| 选项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `reference` | `HTMLElement \| HTMLElement[] \| string` | 必填 | 触发元素，选择器在创建时解析；不存在时抛出 `TypeError` |
| `items` | `DropdownItem[]` | `[]` | 菜单项，传入时优先于 `content` |
| `content` | `HTMLElement` | — | 自定义内容，原位置在销毁时恢复 |
| `trigger` | `"click" \| "hover" \| "manual"` | `"click"` | 交由 Popover 处理触发方式 |
| `placement` | `DropdownPlacement` | `"bottom-start"` | 上下定位各支持 `start`、居中、`end`，空间不足时调整方向 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `closeOnSelect` | `boolean` | `true` | 用户选择后是否关闭 |
| `onSelect` | `(detail) => void` | — | `detail` 为 `{ key, item, index, reference }`，禁用项与分隔线不触发 |
| `onOpenChange` | `(open: boolean) => void` | — | 实际展开状态变化，包括程序控制 |

### DropdownItem

<!-- prettier-ignore -->
| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `key` | `string` | 操作标识 |
| `label` | `string` | 纯文本菜单文字 |
| `disabled` | `boolean` | 禁用此项，默认 `false` |
| `danger` | `boolean` | 使用错误状态色，默认 `false` |
| `divider` | `boolean` | 分隔线，不显示文字，默认 `false` |

### 返回实例

<!-- prettier-ignore -->
| 成员 | 说明 |
| --- | --- |
| `show(reference?)` | 默认对齐首个触发元素；参数必须属于创建时的 `reference` 集合 |
| `hide()` | 关闭菜单 |
| `isOpen()` | 返回是否展开 |
| `setItems(items)` | 替换选项并重建菜单，更新后的菜单替代自定义内容 |
| `setDisabled(disabled)` | 修改禁用状态；禁用时关闭 |
| `destroy()` | 清理监听器、定位 Observer 和菜单节点；可重复调用 |
| `menu` | 菜单容器 DOM，便于调整样式 |
| `popover` | 底层 Popover 实例 |

`DropdownPlacement` 为 `bottom-start`、`bottom`、`bottom-end`、`top-start`、`top`、`top-end`。

### CSS 变量

<!-- prettier-ignore -->
| CSS 变量 | 默认值 | 说明 |
| --- | --- | --- |
| `--l-dropdown-min-width` | `160px` | 菜单最小宽度 |
| `--l-dropdown-max-height` | `min(320px, 60vh)` | 菜单最大高度 |
| `--l-dropdown-background` | `var(--l-fill-secondary-color, #fff)` | 背景 |
| `--l-dropdown-hover-background` | `var(--l-primary-color-light5, #e6f2ff)` | 普通项悬停背景 |
| `--l-dropdown-shadow` | `0 6px 24px #0002` | 阴影 |

菜单挂载在 `body`，局部定制可通过返回实例的 `menu.style` 设置变量；不会继承触发元素所在局部容器的变量。

## 使用限制

当前为平铺操作菜单，不提供方向键导航、Escape 焦点恢复或子菜单。点击触发区外关闭菜单；悬停适用于鼠标，触摸设备建议使用 `click`。不依赖原生 Popover API，但本页未进行 iOS 16 真机验证。触发元素移除或页面卸载时需要调用 `destroy()`；新增触发元素需重新创建实例。

<script setup>
import { onMounted, onUnmounted, nextTick } from "vue";
let alive = true;
let controller;
const menus = [];
onMounted(async () => {
  await customElements.whenDefined("l-code-preview");
  await nextTick();
  const { createDropdown } = await import("../../src/components/dropdown");
  if (!alive) return;
  controller = new AbortController();
  const items = [
    { key: "edit", label: "编辑" },
    { key: "copy", label: "复制", disabled: true },
    { key: "separator", label: "", divider: true },
    { key: "delete", label: "删除", danger: true },
  ];
  const onSelect = ({ key }) => {
    const output = document.getElementById("dropdown-result");
    if (output) output.textContent = `已选择：${key}`;
  };
  const basic = document.getElementById("dropdown-basic");
  if (basic) menus.push(createDropdown({ reference: basic, items, onSelect }));
  if (document.querySelector(".dropdown-shared")) menus.push(createDropdown({ reference: ".dropdown-shared", trigger: "hover", placement: "bottom-end", items, onSelect }));
  const reference = document.getElementById("dropdown-dynamic");
  if (reference) {
    const menu = createDropdown({ reference, items, onSelect, closeOnSelect: false });
    menus.push(menu);
    document.querySelector("[data-dropdown-update]")?.addEventListener("click", () => {
      menu.setItems([{ key: "refresh", label: "刷新" }, { key: "export", label: "导出" }]); menu.show();
    }, { signal: controller.signal });
    let disabled = false;
    document.querySelector("[data-dropdown-disable]")?.addEventListener("click", () => {
      disabled = !disabled; menu.setDisabled(disabled);
      document.getElementById("dropdown-disabled").textContent = disabled ? "已禁用" : "可用";
    }, { signal: controller.signal });
  }
});
onUnmounted(() => { alive = false; controller?.abort(); menus.forEach(menu => menu.destroy()); });
</script>