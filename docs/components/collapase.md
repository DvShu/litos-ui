# Collapase 折叠面板

折叠/展开的内容区域; 通常用于后台系统的首页边栏的控制面板上

## 引用

```js
import { regist, Collapase, ArrowRightIcon } from "litos-ui";

regist([Collapase, ArrowRightIcon]);
```

## 演示

### 基础用法

可以同时展开多个面板，面板之间不影响

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-collapase>
    <l-collapase-item name="1" header-text="红灯">
      <div>红灯 - 停</div>
    </l-collapase-item>
    <l-collapase-item name="2" header-text="绿灯">
      <div>绿灯 - 行</div>
    </l-collapase-item>
    <l-collapase-item name="3" header-text="黄灯">
      <div>黄灯 - 等</div>
    </l-collapase-item>
  </l-collapase>
</textarea>
</l-code-preview>
</ClientOnly>

### 箭头位置

使用 `arrow-placement` 来设定箭头的位置；可选值为 `left`[默认]、`right`

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-collapase arrow-placement="right">
    <l-collapase-item name="1" header-text="红灯">
      <div>红灯 - 停</div>
    </l-collapase-item>
    <l-collapase-item name="2" header-text="绿灯">
      <div>绿灯 - 行</div>
    </l-collapase-item>
    <l-collapase-item name="3" header-text="黄灯">
      <div>黄灯 - 等</div>
    </l-collapase-item>
  </l-collapase>
</textarea>
</l-code-preview>
</ClientOnly>

### 标题栏对齐方式

通过 `header-justify` 来设置对齐方式，例如设置为 `space-between` 表明两端对齐，这个时候，配合 `arrow-placement: right` 就能实现，箭头和文本两端对齐的效果

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-collapase arrow-placement="right" header-justify="space-between">
    <l-collapase-item name="1" header-text="红灯">
      <div>红灯 - 停</div>
    </l-collapase-item>
    <l-collapase-item name="2" header-text="绿灯">
      <div>绿灯 - 行</div>
    </l-collapase-item>
    <l-collapase-item name="3" header-text="黄灯">
      <div>黄灯 - 等</div>
    </l-collapase-item>
  </l-collapase>
</textarea>
</l-code-preview>
</ClientOnly>

## API

### Collapase Attibutes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| - | - | - | - |

### Collapase Slots

<!-- prettier-ignore -->
| 名称 | 说明 |
| --- | --- |
| `default` | 内容 |

### Collapase Events

<!-- prettier-ignore -->
| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `click` | 点击按钮时触发 | `(event: Event)` |

### Collapase Methods

<!-- prettier-ignore -->
| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| - | - | - |

### Collapase CSS Variables

<!-- prettier-ignore -->
| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| - | - | - |
