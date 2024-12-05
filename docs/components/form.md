# Form

Form

## 引用

```js
import { Form, regist } from "litos-ui";

regist(Form);
```

## 演示

<script setup>
  import { onMounted, nextTick } from 'vue';
  import { $one } from 'ph-utils/dom';

  onMounted(() => {
    nextTick(() => {
      const $form = $one('#form');
      $form.addEventListener('submit', (event) => {
        console.log(event)
      })
    })
  })
</script>

### 基础用法

使用

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-form id="form">
    <l-form-item required label="姓名" name="name">
      <l-input placeholder="请输入姓名" value="张三"></l-input>
    </l-form-item>
    <l-form-item required label="密码" name="password">
      <l-input placeholder="请输入密码" type="password"></l-input>
    </l-form-item>
    <l-form-item required label="确认密码" verify="same:password" name="confimPassword">
      <l-input placeholder="请再次输入密码" type="password"></l-input>
    </l-form-item>
    <l-form-item label="">
      <l-button html-type="reset">重置</l-button>
      <l-button html-type="submit" type="primary">提交</l-button>
    </l-form-item>
  </l-form>
</textarea>
</l-code-preview>
</ClientOnly>

> 如果想要实现按钮之间的间隔，需要引入 `litos-ui/styles/reset.css` 文件

### 只使用 `FormItem`

`FormItem` 可以不放在 `Form` 里面，从而进行单独使用。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-form-item id="form1" label="姓名">
    <l-input placeholder="请输入文本"></l-input>
  </l-form-item>
</textarea>
<div class="source">
<textarea lang="html">
  <l-button>按钮</l-button>
</textarea>
</div>
</l-code-preview>
</ClientOnly>

## API

### Form Attibutes

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| x | x | x | x |

### ${name} Slots

<!-- prettier-ignore -->
| 名称 | 说明 |
| --- | --- |
| `default` | 内容 |

### ${name} Events

<!-- prettier-ignore -->
| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `click` | 点击按钮时触发 | `(event: Event)` |

### ${name} Methods

<!-- prettier-ignore -->
| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| `x` | x | `(x: number): string` |

### ${name} CSS Variables

<!-- prettier-ignore -->
| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--l` | x | `#fff` |
