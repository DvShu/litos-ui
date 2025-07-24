# DescriptionPanel 简介面板

通常用于显示描述信息、简介的地方；更多用于手机上，空间有限，一开始可以显示少量内容。

## 引用

```js
import { DescriptionPanel, regist, Button, ArrowDownIcon } from "litos-ui";

regist([DescriptionPanel, Button, ArrowDownIcon]);
```

## 演示

### 基础用法

内容区域的所有的块级内容，会自动应用一个 `text-indent`。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-description-panel>
    <p>日前，奇瑞宣布与捷豹路虎达成战略合作意向，捷豹路虎全新产品线将采用奇瑞纯电平台生产，而在另一边，东风日产云峰工厂则选择为岚图生产全新纯电SUV产品。这两个外资品牌，一个是寻求自主品牌代工，一个是为自主品牌代工，两者都将目标对准了成本节约。</p>
    <p>如果把时间轴往前拉，围绕节约成本的课题，作为合资品牌两大中坚力量的一汽-大众和广汽本田交出了一样的答卷——裁员，这也意味着曾经高高在上的合资品牌进入了最艰难的时刻。尤其是5月销量数据出炉，合资品牌市场份额降至28.8%，让公众更为直观清晰地感受到合资品牌在华形势之严峻。</p>
    <p>虽然合资品牌在汽车电动化、智能化的冲击下处境直转急下的趋势有目共睹，但近年来兵败如山倒的局面仍然让不少业内人士感到惊讶。在这个几乎可以形容为“跳水”的过程中，合资品牌到底做错了什么？未来还有机会东山再起吗？ </p>

  </l-description-panel>
</textarea>
</l-code-preview>
</ClientOnly>

## API

### DescriptionPanel Attibutes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| x | x | x | x |

### DescriptionPanel Slots

<!-- prettier-ignore -->
| 名称 | 说明 |
| --- | --- |
| `default` | 内容 |

### DescriptionPanel Events

<!-- prettier-ignore -->
| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `click` | 点击按钮时触发 | `(event: Event)` |

### DescriptionPanel Methods

<!-- prettier-ignore -->
| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| `x` | x | `(x: number): string` |

### DescriptionPanel CSS Variables

<!-- prettier-ignore -->
| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--l` | x | `#fff` |
