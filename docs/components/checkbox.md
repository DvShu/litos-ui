# Checkbox 复选框

在一组备选项中进行多选。适用提醒用户勾选场景，突出多选框选项，可以有效增加用户识别度。

## 引用

```js
import { Checkbox, regist } from "litos-ui";

regist([Checkbox]);
```

## 演示

### 基础用法

使用当只有一个选项时，可以直接 `checked` 绑定 `boolean` 值来控制是否选中；使用 `slot-label` 来重写选项的文字。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-checkbox>
    <span>
      <span>同意</span>
      <a href='#'>隐私协议</a>
    </span>
  </l-checkbox>
</textarea>
</l-code-preview>
</ClientOnly>

### 禁用状态

使用 `disabled` 属性来禁用复选框。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-checkbox disabled checked>禁用</l-checkbox>
</textarea>
</l-code-preview>
</ClientOnly>

### 多选框组

结合 `l-checkbox-group` 组件实现单选框组

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-checkbox-group value="CD&BJ">
    <l-checkbox value="CD">成都</l-checkbox>
    <l-checkbox value="BJ">北京</l-checkbox>
    <l-checkbox value="SZ">深圳</l-checkbox>
    <l-checkbox value="HZ">杭州</l-checkbox>
  </l-checkbox>
</textarea>
</l-code-preview>
</ClientOnly>

## API

### Checkbox Attibutes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| x | x | x | x |

### Checkbox Slots

<!-- prettier-ignore -->
| 名称 | 说明 |
| --- | --- |
| `default` | 内容 |

### Checkbox Events

<!-- prettier-ignore -->
| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `click` | 点击按钮时触发 | `(event: Event)` |

### Checkbox Methods

<!-- prettier-ignore -->
| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| `x` | x | `(x: number): string` |

### Checkbox CSS Variables

<!-- prettier-ignore -->
| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--l` | x | `#fff` |
