# icon

内置图标有限，推荐使用 [iconify](https://iconify.design/docs/iconify-icon/)

## 内置图标

### 注册

```js
import { ArrowDownIcon, regist } from "litos-ui";

regist(ArrowDownIcon);
// ...
```

<script setup lang="ts">
  import { ArrowDownIcon, regist } from '../../src/components'

  regist(ArrowDownIcon);
  // import Button from '../src/components/button';
  // import ArrowDownIcon from '../src/components/icon/arrow_down.ts';
  // import BaseIcon from '../src/components/icon/base.ts';

  // customElements.define('lt-button', Button);
  // customElements.define(ArrowDownIcon.tagName, ArrowDownIcon);
  // customElements.define(BaseIcon.tagName, BaseIcon);
</script>

<lt-arrow-down-icon class="red-color" />
