# Upload 上传

通过 `action` 指定上传地址, 将文件通过 `multipart/form-data` 方式(字段名为 `file`)上传到服务端。

> 本文档中的示例统一使用 [tmpfiles.org](https://tmpfiles.org) 的免费临时文件接口:
>
> - 接口地址: `https://tmpfiles.org/api/v1/upload`
> - 响应格式: `{ "status": "success", "data": { "url": "https://tmpfiles.org/xxxx/example.txt" } }`, 组件会自动读取 `data.url` 作为 `file.url`
> - 返回的 `url` 是预览页地址, 在 `.com` 后面增加 `/dl/` 即为文件直链, 例如 `https://tmpfiles.org/dl/xxxx/example.txt`
> - 匿名上传的文件 **60 分钟后自动删除**, 且接口有频率限制, 请勿滥用

## 引用

```js
import { Upload, regist } from "litos-ui";

regist(Upload);
// 文件列表中的"预览/删除"按钮使用了图标组件, 需要时一起注册
import { SearchIcon, CloseIcon } from "litos-ui";
regist([SearchIcon, CloseIcon]);
```

## 基础使用

### 文件上传

通过设置 `accept` 属性指定接受的文件类型，`action` 指定上传地址。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-upload action="https://tmpfiles.org/api/v1/upload" accept=".txt,.md,.json">
    <l-button type="primary">选择文件</l-button>
  </l-upload>
</textarea>
</l-code-preview>
</ClientOnly>

### 图片上传

通过设置 `list-type="picture"` 显示图片预览列表，`accept="image/*"` 限制只能上传图片。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-upload action="https://tmpfiles.org/api/v1/upload" accept="image/*" list-type="picture">
    <l-button type="primary">选择图片</l-button>
  </l-upload>
</textarea>
</l-code-preview>
</ClientOnly>

> 图片列表的缩略图优先使用本地文件预览；上传成功后服务端返回的地址保存在 `file.url` 上（对于 tmpfiles.org 是预览页地址，需自行转换为 `/dl/` 直链后再展示）。

### 多文件上传

设置 `multiple` 属性支持多文件上传。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-upload action="https://tmpfiles.org/api/v1/upload" multiple>
    <l-button type="primary">选择多个文件</l-button>
  </l-upload>
</textarea>
</l-code-preview>
</ClientOnly>

### 拖拽上传

设置 `drag` 属性支持拖拽上传。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-upload action="https://tmpfiles.org/api/v1/upload" drag>
    <div style="padding: 40px 16px; text-align: center;">将文件拖到此处，或点击上传</div>
  </l-upload>
</textarea>
</l-code-preview>
</ClientOnly>

### 文件大小限制

通过 `max-size` 属性限制文件大小，单位为 KB，超出限制的文件不会加入文件列表。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-upload action="https://tmpfiles.org/api/v1/upload" max-size="1024">
    <l-button type="primary">选择文件（最大 1MB）</l-button>
  </l-upload>
</textarea>
</l-code-preview>
</ClientOnly>

### 文件数量限制

通过 `max-count` 属性限制上传文件数量，再次选择超出的文件时会触发 `exceed` 事件。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-upload action="https://tmpfiles.org/api/v1/upload" multiple max-count="3">
    <l-button type="primary">选择文件（最多 3 个）</l-button>
  </l-upload>
</textarea>
</l-code-preview>
</ClientOnly>

### 禁用状态

使用 `disabled` 控制上传组件禁用状态。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-upload action="https://tmpfiles.org/api/v1/upload" disabled>
    <l-button type="primary" disabled>选择文件</l-button>
  </l-upload>
</textarea>
</l-code-preview>
</ClientOnly>

### 手动上传

设置 `auto-upload="false"` 关闭自动上传，选择文件后仅加入列表（状态为 `ready`），通过 `upload()` 方法手动触发上传。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-upload id="upload-manual" action="https://tmpfiles.org/api/v1/upload" auto-upload="false">
    <l-button type="primary">选择文件</l-button>
  </l-upload>
  <l-button type="primary" onclick="document.getElementById('upload-manual').upload()">开始上传</l-button>
  <l-button onclick="document.getElementById('upload-manual').clearFiles()">清空列表</l-button>
</textarea>
</l-code-preview>
</ClientOnly>

### 自定义请求头

通过 `headers` 属性设置上传请求头，属性值为**合法的 JSON 字符串**（不支持单引号）。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-upload action="https://tmpfiles.org/api/v1/upload" headers='{"X-Token": "Bearer token"}'>
    <l-button type="primary">选择文件</l-button>
  </l-upload>
</textarea>
</l-code-preview>
</ClientOnly>

在 JS 中也可以直接对 `headers` 属性赋值对象：

```js
const $upload = document.querySelector("l-upload");
$upload.headers = { "X-Token": "Bearer token" };
```

### 上传时附带参数

通过 `data` 属性设置上传时附带的额外参数（表单字段），属性值同样为**合法的 JSON 字符串**；tmpfiles.org 会忽略额外字段，此处仅作演示。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-upload action="https://tmpfiles.org/api/v1/upload" data='{"source": "litos-ui-docs", "type": "file"}'>
    <l-button type="primary">选择文件</l-button>
  </l-upload>
</textarea>
</l-code-preview>
</ClientOnly>

### 提示文字

通过 `tip` 插槽在触发区下方、文件列表上方显示提示内容，常用于说明上传规则或格式要求；未提供插槽内容时不占位。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-upload action="https://tmpfiles.org/api/v1/upload" accept="image/*" list-type="picture">
    <l-button type="primary">选择图片</l-button>
    <span slot="tip">仅支持 jpg / png 格式图片，单张不超过 2MB</span>
  </l-upload>
</textarea>
</l-code-preview>
</ClientOnly>

### 监听上传事件

通过监听 `success`、`error`、`exceed` 等事件反馈上传结果（示例中的提示信息使用了 `Message` 组件）。

<script setup>
  import { onMounted, nextTick, onUnmounted } from 'vue';
  import { elem, iterate, on, off } from 'ph-utils/browser';

  let $uploads;

  function handleSuccess(e) {
    const { file, response } = e.detail;
    console.info('上传响应:', response);
    if (typeof Message !== 'undefined') {
      Message.success(`${file.name} 上传成功`);
    }
  }

  function handleError(e) {
    const { file, files, message } = e.detail;
    if (typeof Message !== 'undefined') {
      Message.error(file ? `${file.name} 上传失败` : (message || `${files.length} 个文件不符合要求`));
    }
  }

  function handleProgress(e) {
    console.info(`${e.detail.file.name} 上传进度: ${e.detail.percent}%`);
  }

  function handleExceed() {
    if (typeof Message !== 'undefined') {
      Message.warn('上传文件数量超出限制');
    }
  }

  onMounted(() => {
    nextTick(() => {
      if (!import.meta.env.SSR) {
        $uploads = elem('l-upload.upload-events');
        iterate($uploads, ($upload) => {
          on($upload, 'success', handleSuccess);
          on($upload, 'error', handleError);
          on($upload, 'progress', handleProgress);
          on($upload, 'exceed', handleExceed);
        });
      }
    });
  });

  onUnmounted(() => {
    if (!import.meta.env.SSR && $uploads) {
      iterate($uploads, ($upload) => {
        off($upload, 'success', handleSuccess);
        off($upload, 'error', handleError);
        off($upload, 'progress', handleProgress);
        off($upload, 'exceed', handleExceed);
      });
    }
  });
</script>

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-upload class="upload-events" action="https://tmpfiles.org/api/v1/upload" multiple max-count="3">
    <l-button type="primary">选择文件（最多 3 个，超限会提示）</l-button>
  </l-upload>
</textarea>
</l-code-preview>
</ClientOnly>

### Vue 中使用

在 Vue 3 中，可以使用 `ref` 获取组件实例，调用组件方法（也可以通过实例设置 `headers`、`data` 等对象属性）。

```html
<template>
  <l-upload ref="uploadRef" action="https://tmpfiles.org/api/v1/upload" auto-upload="false">
    <l-button type="primary">选择文件</l-button>
  </l-upload>
  <l-button type="primary" @click="handleUpload">开始上传</l-button>
</template>
```

```js
import { ref } from "vue";
import { Upload, regist } from "litos-ui";

regist(Upload);

const uploadRef = ref(null);
const upload = uploadRef.value;

// 设置附带参数(对象赋值)
upload.data = { userId: "123" };

const handleUpload = () => {
  // 手动触发上传
  uploadRef.value.upload();
};
```

## API

### Upload Attributes

<!-- prettier-ignore -->
| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `accept` | 接受的文件类型 | `string` | - |
| `multiple` | 是否支持多文件上传 | `boolean` | `false` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `drag` | 是否支持拖拽上传 | `boolean` | `false` |
| `list-type` | 列表类型，`text`（文本列表）、`picture`（图片列表） | `string` | `text` |
| `max-size` | 最大文件大小，单位 KB，超出不会加入列表 | `number` | `0`（不限制） |
| `max-count` | 最大文件数量 | `number` | `0`（不限制） |
| `auto-upload` | 是否自动上传，`false` 时通过 `upload()` 手动触发 | `boolean` | `true` |
| `action` | 上传地址，以 `multipart/form-data`（字段名 `file`）方式提交 | `string` | - |
| `show-file-list` | 是否显示文件列表 | `boolean` | `true` |
| `headers` | 上传请求头，需为合法 JSON 字符串，或通过实例属性赋值对象 | `object` | `{}` |
| `data` | 上传时附带的额外参数，需为合法 JSON 字符串，或通过实例属性赋值对象 | `object` | `{}` |
| `with-credentials` | 是否携带 cookie | `boolean` | `false` |

### Upload Slots

<!-- prettier-ignore -->
| 名称 | 说明 |
| --- | --- |
| `default` | 触发上传的内容 |
| `tip` | 提示内容，显示在触发区下方、文件列表上方（无内容时不占位） |

### Upload Methods

<!-- prettier-ignore -->
| 名称 | 说明 | 参数 |
| --- | --- | --- |
| `upload` | 上传文件，默认只有 `ready` 状态的文件才会上传 | `files?: UploadFile[]` |
| `clearFiles` | 清空文件列表并中止上传中的请求 | - |
| `abort` | 中止上传（取消进行中的请求，文件回到 `ready` 状态），不传参数则中止全部 | `file?: UploadFile` |
| `handlePreview` | 预览文件，触发 `preview` 事件 | `file: UploadFile` |
| `handleRemove` | 移除文件（上传中会先中止），触发 `remove` 事件 | `file: UploadFile` |

### Upload Events

<!-- prettier-ignore -->
| 名称 | 说明 | 参数 |
| --- | --- | --- |
| `change` | 文件列表状态改变时触发 | `{ fileList: UploadFile[], addedFiles?: UploadFile[] }` |
| `success` | 上传成功时触发 | `{ file: UploadFile, response: string }` |
| `error` | 上传失败时触发（服务端返回非 2xx 或网络错误） | `{ file?: UploadFile, status?: number }` |
| `error` | 文件大小超出 `max-size` 限制时触发（不会加入列表） | `{ files: File[], message: string }` |
| `progress` | 上传进度变化时触发 | `{ file: UploadFile, percent: number }` |
| `remove` | 移除文件时触发 | `{ file: UploadFile, fileList: UploadFile[] }` |
| `preview` | 预览文件时触发 | `{ file: UploadFile }` |
| `exceed` | 选择超出 `max-count` 的文件时触发，`files` 为未加入列表的文件 | `{ files: File[] }` |

### UploadFile 类型

<!-- prettier-ignore -->
| 属性 | 说明 | 类型 |
| --- | --- | --- |
| `id` | 文件唯一标识 | `number` |
| `name` | 文件名 | `string` |
| `size` | 文件大小，单位字节 | `number` |
| `status` | 文件状态，`ready`、`uploading`、`success`、`fail` | `string` |
| `percentage` | 上传进度百分比 | `number` |
| `raw` | 原始 File 对象 | `File` |
| `url` | 文件上传后的 URL（读取服务端响应的 `url` 或 `data.url`） | `string` |

### 样式变量

<!-- prettier-ignore -->
| 名称 | 描述 | 默认值 |
| --- | --- | --- |
| `--l-upload-border-color` | 边框颜色 | `#d9d9d9` |
| `--l-upload-border-hover-color` | 悬浮时边框颜色 | `var(--l-primary-color, #722ed1)` |
| `--l-upload-background` | 背景颜色 | `#ffffff` |
| `--l-upload-dragover-background` | 拖拽时背景颜色 | `var(--l-primary-color-light5, #f9f0ff)` |
| `--l-upload-text-color` | 文字颜色 | `rgba(0, 0, 0, 0.88)` |
| `--l-upload-text-secondary-color` | 次要文字颜色 | `rgba(0, 0, 0, 0.45)` |
| `--l-upload-progress-color` | 进度条颜色 | `var(--l-primary-color, #722ed1)` |
| `--l-upload-success-color` | 成功状态颜色 | `#52c41a` |
| `--l-upload-error-color` | 错误状态颜色 | `#ff4d4f` |
| `--l-upload-disabled-color` | 禁用状态颜色 | `#c9c9c9` |
| `--l-upload-disabled-background` | 禁用状态背景颜色 | `#fbfbfb` |
| `--l-upload-disabled-border-color` | 禁用状态边框颜色 | `#e6e6e6` |
| `--l-upload-border-radius` | 圆角大小 | `var(--l-border-radius, 3px)` |
| `--l-upload-font-size` | 字体大小 | `14px` |
| `--l-upload-picture-size` | 图片列表项大小 | `100px` |
