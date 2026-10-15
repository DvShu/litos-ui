# Upload 上传

## 引用

```js
import { Upload, regist, SearchIcon, CloseIcon } from "litos-ui";

regist(Upload);
// 如果需要使用图标
regist(SearchIcon);
regist(CloseIcon);
```

## 基础使用

### 文件上传

通过设置 `accept` 属性指定接受的文件类型，`action` 指定上传地址。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-upload action="/api/upload" accept=".pdf,.doc,.docx">
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
  <l-upload action="/api/upload" accept="image/*" list-type="picture">
    <l-button type="primary">选择图片</l-button>
  </l-upload>
</textarea>
</l-code-preview>
</ClientOnly>

### 多文件上传

设置 `multiple` 属性支持多文件上传。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-upload action="/api/upload" multiple>
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
  <l-upload action="/api/upload" drag>
    <div style="padding: 20px; text-align: center;">
      <p>将文件拖到此处，或点击上传</p>
    </div>
  </l-upload>
</textarea>
</l-code-preview>
</ClientOnly>

### 文件大小限制

通过 `max-size` 属性限制文件大小，单位为 KB。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-upload action="/api/upload" :max-size="1024">
    <l-button type="primary">选择文件（最大 1MB）</l-button>
  </l-upload>
</textarea>
</l-code-preview>
</ClientOnly>

### 文件数量限制

通过 `max-count` 属性限制上传文件数量。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-upload action="/api/upload" multiple :max-count="3">
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
  <l-upload action="/api/upload" disabled>
    <l-button type="primary" disabled>选择文件</l-button>
  </l-upload>
</textarea>
</l-code-preview>
</ClientOnly>

### 手动上传

设置 `auto-upload="false"` 关闭自动上传，通过 `upload()` 方法手动触发上传。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-upload id="upload" action="/api/upload" auto-upload="false">
    <l-button type="primary">选择文件</l-button>
  </l-upload>
  <l-button type="primary" onclick="document.getElementById('upload').upload()">开始上传</l-button>
</textarea>
</l-code-preview>
</ClientOnly>

### 自定义请求头

通过 `headers` 属性设置上传请求头。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-upload action="/api/upload" :headers="{ 'Authorization': 'Bearer token' }">
    <l-button type="primary">选择文件</l-button>
  </l-upload>
</textarea>
</l-code-preview>
</ClientOnly>

### Vue 中使用

在 Vue 3 中，可以使用 `ref` 获取组件实例，调用组件方法。

```html
<template>
  <l-upload ref="uploadRef" action="/api/upload" auto-upload="false">
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

const handleUpload = () => {
  // 调用组件的上传方法
  uploadRef.value.upload();
};
```

### 上传时附带参数

通过 `data` 属性设置上传时附带的额外参数。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-upload action="/api/upload" :data="{ userId: '123', type: 'avatar' }">
    <l-button type="primary">选择文件</l-button>
  </l-upload>
</textarea>
</l-code-preview>
</ClientOnly>

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
| `max-size` | 最大文件大小，单位 KB | `number` | `0`（不限制） |
| `max-count` | 最大文件数量 | `number` | `0`（不限制） |
| `auto-upload` | 是否自动上传 | `boolean` | `true` |
| `action` | 上传地址 | `string` | - |
| `show-file-list` | 是否显示文件列表 | `boolean` | `true` |
| `headers` | 上传请求头 | `object` | `{}` |
| `data` | 上传时附带的额外参数 | `object` | `{}` |
| `with-credentials` | 是否携带 cookie | `boolean` | `false` |

### Upload Slots

<!-- prettier-ignore -->
| 名称 | 说明 |
| --- | --- |
| `default` | 触发上传的内容 |

### Upload Methods

<!-- prettier-ignore -->
| 名称 | 说明 | 参数 |
| --- | --- | --- |
| `upload` | 手动上传文件 | `files?: UploadFile[]` |
| `clearFiles` | 清空文件列表 | - |
| `abort` | 中止上传 | - |
| `handlePreview` | 预览文件 | `file: UploadFile` |
| `handleRemove` | 移除文件 | `file: UploadFile` |

### Upload Events

<!-- prettier-ignore -->
| 名称 | 说明 | 参数 |
| --- | --- | --- |
| `change` | 文件状态改变时触发 | `{ fileList: UploadFile[], addedFiles?: UploadFile[] }` |
| `success` | 上传成功时触发 | `{ file: UploadFile, response: string }` |
| `error` | 上传失败时触发 | `{ file: UploadFile, status?: number }` |
| `progress` | 上传进度变化时触发 | `{ file: UploadFile, percent: number }` |
| `remove` | 移除文件时触发 | `{ file: UploadFile, fileList: UploadFile[] }` |
| `preview` | 预览文件时触发 | `{ file: UploadFile }` |
| `exceed` | 超出文件数量限制时触发 | `{ files: File[] }` |

### UploadFile 类型

<!-- prettier-ignore -->
| 属性 | 说明 | 类型 |
| --- | --- | --- |
| `uid` | 文件唯一标识 | `number` |
| `name` | 文件名 | `string` |
| `size` | 文件大小，单位字节 | `number` |
| `status` | 文件状态，`ready`、`uploading`、`success`、`fail` | `string` |
| `percentage` | 上传进度百分比 | `number` |
| `raw` | 原始 File 对象 | `File` |
| `url` | 文件上传后的 URL | `string` |

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
