# Theme 主题切换

通过切换主题来减轻长时间使用屏幕带来的视觉疲劳

## 引用

```js
import {
  Theme,
  ThemeColor,
  regist,
  Button,
  SelectOri,
  Switch,
  Radio,
  SunIcon,
  MoonIcon,
} from "litos-ui";

regist(Theme);
regist(ThemeColor);
// 根据风格注册以下组件
regist([Button, SunIcon, MoonIcon]); // 按钮风格
regist(SelectOri); // 下拉风格
regist(Switch); // 开关风格
regist(Radio); // 单选风格
```

## 演示

> 1. 主题切换是通过 [ph-utils](https://www.npmjs.com/package/ph-utils) 工具库的 `theme` 工具类控制
> 2. 为了每次切换主题后，重新加载能够生效，需要在应用开始的时候, 执行 `initTheme()` 方法

::: code-group

```js [main.ts]
import { initTheme } from "ph-utils/theme";

initTheme().then();
```

:::

### 基础用法

提供多种风格的主题切换按钮: 按钮、下拉选择、单选按钮组、开关; 通过 `type` 指定。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-theme></l-theme>
  <l-theme type="select"></l-theme>
  <l-theme type="switch"></l-theme>
</textarea>
<div class="source">
<textarea lang="html">
  <l-theme></l-theme>
</textarea>
</div>
</l-code-preview>
</ClientOnly>

## API

### ThemeSwitch Attibutes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| x | x | x | x |

### ThemeSwitch Slots

<!-- prettier-ignore -->
| 名称 | 说明 |
| --- | --- |
| `default` | 内容 |

### ThemeSwitch Events

<!-- prettier-ignore -->
| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `click` | 点击按钮时触发 | `(event: Event)` |

### ThemeSwitch Methods

<!-- prettier-ignore -->
| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| `x` | x | `(x: number): string` |

### ThemeSwitch CSS Variables

<!-- prettier-ignore -->
| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--l` | x | `#fff` |
