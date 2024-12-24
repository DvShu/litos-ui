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
  ThemeDefaultIcon,
} from "litos-ui";

regist(Theme);
// 颜色主题
regist(ThemeColor);
// 根据风格注册以下组件
regist([Button, SunIcon, MoonIcon]); // 按钮风格
regist(SelectOri); // 下拉风格
regist([Switch, SunIcon, MoonIcon]); // 开关风格
// 图标单选风格[label="icon"]
regist([Radio, SunIcon, MoonIcon, ThemeDefaultIcon]);
// 文本单选风格
regist(Radio);
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
  <l-theme type="switch" style="vertical-align:middle;"></l-theme>
  <l-theme type="radio" style="vertical-align:middle;"></l-theme>
</textarea>
</l-code-preview>
</ClientOnly>

> 切换主题后，如果要让应用启动的时候也应用上一次切换的主题, 需要在应用开始的地方调用 `initTheme()` 函数

```javascript
// main.js
import { initTheme } from "ph-utils/theme";

// await initTheme();
initTheme().then();
```

### 自定义风格

框架内置的主题切换其实就是一个排版的样式，核心的主题切换的逻辑是调用的 `ph-utils` 库的 `theme` 模块相关函数来实现的。

通常调用的模块有: `getTheme()`、`applyTheme()`

内置的切换的动画效果为渐变动画。

如果想要实现自定义的排版或者自定义的动画完全可以通过自定义来实现，下面通过 `Radio` + 简单文字实现

<!-- prettier-ignore -->
<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-custom-theme>按钮</l-custom-theme>
</textarea>
<div class="source">
<textarea lang="html">
  <l-radio id="customThemeRadio">
    <span radio-value="auto">自</span>+
    <span radio-value="light">浅</span>
    <span radio-value="dark">深</span>
  </l-radio>
</textarea>
<textarea lang="js">
  import { applyTheme } from "ph-utils/theme";
  //-
  const $radio = document.querySelector('#customThemeRadio');
  //-
  $radio.addEventListener('change', (e) => {
    const newTheme = (e.target as any).value;
    const transition = document.startViewTransition(() => {
      // 应用主题
      applyTheme(newTheme, true, false).then();
    });
    //-
    transition.ready.then(() => {
      /*
        如果在 click 事件中想根据鼠标位置来设置圆形扩散效果
        // 获取鼠标的坐标
        const { clientX, clientY } = e;
        a: (clientX, clientY)        
                              b: (innerWidth, innerHeight)
        a -> b 的距离就是最大半径
        //-
        // 计算最大半径
        const radius = Math.hypot(
          Math.max(clientX, innerWidth - clientX),
          Math.max(clientY, innerHeight - clientY)
        );
      */
      //-
      // 圆形动画扩散开始
      document.documentElement.animate(
        /*
          // 应用鼠标位置扩展
          clipPath: [
             `circle(0% at ${clientX}px ${clientY}px)`,
             `circle(${radius}px at ${clientX}px ${clientY}px)`,
          ]
        */
        {
          clipPath: [`circle(0% at center)`, `circle(100% at center)`],
        },
        // 设置时间，已经目标伪元素
        {
          duration: 300,
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  });
</textarea>
<textarea lang="css">
  ::view-transition-new(root),
  ::view-transition-old(root) {
    /* 关闭默认动画 */
    animation: none;
  }
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### 主题色更改

除了修改主题风格，还可以修改主题色，通过修改 `ThemeColor` 来实现。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-theme-color></l-theme-color>
</textarea>
</l-code-preview>
</ClientOnly>

生成的主题色代码如下:

```CSS
:root {
  --l-primary-color: #722ed1;
  --l-primary-color-light1: #9254de;
  --l-primary-color-light2: #b37feb;
  --l-primary-color-light3: #d3adf7;
  --l-primary-color-light4: #efdbff;
  --l-primary-color-light5: #f9f0ff;
  --l-primary-color-dark1: #531dab;
}
```

> 跟主题模式一样，如果想要再下次启动时也应用选择的主题色，需要在应用启动时，调用 `initColorTheme()` 函数

```javascript
// main.js
import { initColorTheme } from "ph-utils/theme";

initColorTheme().then();
```

## API

### Theme Attibutes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `type` | 主题切换按钮风格 | `button` \| `select` \| "`switch` \| `radio` | `button` |
| `label` | 当 `type="radio"` 时是使用文字还是图标 | `text` \| `icon` | `text` |

### Events

<!-- prettier-ignore -->
| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `change` | 主题改变时触发, 可以通过 `e.detail` 获取值 | `(event: CustomEvent)` |
