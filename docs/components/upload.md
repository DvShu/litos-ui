# Upload 上传

通过选择或者拖曳上传文件

## 引用

```js
import { Upload, regist, CloseIcon, PlusIcon, PictureIcon } from "litos-ui";

regist(Upload);
// list-type = text or default
regist([CloseIcon]);
// list-type = picture or picture-card
regist([PlusIcon, PictureIcon]);
```

## 演示

<script setup>
  import { onMounted, nextTick, onUnmounted } from 'vue';
  import { elem, iterate, on, off } from 'utilane/browser';

  let $uploads;
  let $pictures;
  let $customUpload;
  let customUploadObserver;
  let pageDisposed = false;

  function parseLocalUploadResponse(response) {
    if (response?.status !== "success" || typeof response?.data?.url !== "string") {
      throw new Error("上传响应缺少有效的文件地址");
    }
    const url = new URL(response.data.url);
    if (url.origin !== "http://127.0.0.1:3001" || url.username || url.password) {
      throw new Error("文件地址不是允许的本地上传服务地址");
    }
    return url.href;
  }

  async function demoCustomRequest({ body, headers, signal, onProgress }) {
    signal.throwIfAborted();
    let percent = 0;
    let timer;
    const stopProgress = () => { clearInterval(timer); };
    try {
      // 仅用于演示的模拟进度，不代表 fetch 实际上传的字节进度。
      onProgress(percent);
      timer = setInterval(() => {
        percent = Math.min(percent + 10, 90);
        onProgress(percent);
      }, 150);
      signal.addEventListener("abort", stopProgress, { once: true });
      // body 已由组件装入 file 文件及附加字段，无需再次 append 文件。
      const result = await fetch("http://127.0.0.1:3001/upload", {
        method: "POST", body, headers, signal,
      });
      const responseText = await result.text();
      const response = JSON.parse(responseText);
      signal.throwIfAborted();
      if (result.ok) onProgress(100);
      return { response, responseText, status: result.status };
    } finally {
      stopProgress();
      signal.removeEventListener("abort", stopProgress);
    }
  }

  function syncCustomUpload() {
    if (pageDisposed) return;
    const next = document.getElementById('upload-custom-request');
    if (next === $customUpload) return;
    if ($customUpload) {
      $customUpload.abort();
      if ($customUpload.customRequest === demoCustomRequest) $customUpload.customRequest = undefined;
    }
    $customUpload = next;
    if ($customUpload) $customUpload.customRequest = demoCustomRequest;
  }

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

  onMounted(async () => {
    // ClientOnly 和代码预览会异步创建、重建内部的 l-upload。
    await Promise.all([
      customElements.whenDefined('l-upload'),
      customElements.whenDefined('l-code-preview'),
    ]);
    await nextTick();
    if (pageDisposed) return;
    customUploadObserver = new MutationObserver(syncCustomUpload);
    customUploadObserver.observe(document.body, { childList: true, subtree: true });
    syncCustomUpload();
    $pictures = elem('l-upload[data-response-parser=local]');
    iterate($pictures, ($upload) => { $upload.parseResponse = parseLocalUploadResponse; });
    $uploads = elem('l-upload.upload-events');
    iterate($uploads, ($upload) => {
      on($upload, 'success', handleSuccess);
      on($upload, 'error', handleError);
      on($upload, 'progress', handleProgress);
      on($upload, 'exceed', handleExceed);
    });
  });

  onUnmounted(() => {
    pageDisposed = true;
    customUploadObserver?.disconnect();
    customUploadObserver = undefined;
    if ($customUpload) {
      $customUpload.abort();
      if ($customUpload.customRequest === demoCustomRequest) $customUpload.customRequest = undefined;
      $customUpload = undefined;
    }
    if ($pictures) {
      iterate($pictures, ($upload) => {
        $upload.abort();
        if ($upload.parseResponse === parseLocalUploadResponse) $upload.parseResponse = undefined;
      });
      $pictures = undefined;
    }
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

### 文件上传

通过设置 `accept` 属性指定接受的文件类型，`action` 指定上传地址。通过 `slot=tip` 你可以传入自定义的提示文字

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-upload action="http://127.0.0.1:3001/upload" accept=".txt,.md,.json">
    <l-button type="primary">选择文件</l-button>
    <span slot="tip">请上传 text 文件</span>
  </l-upload>
</textarea>
</l-code-preview>
</ClientOnly>

### 图片上传

设置 `list-type="picture"` 以及 `accept="image/*"`

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-upload accept="image/*" list-type="picture" action="http://127.0.0.1:3001/upload">
    <l-plus-icon></l-plus-icon>
  </l-upload>
</textarea>
</l-code-preview>
</ClientOnly>

### 自定义响应解析

通过 JavaScript 实例属性 `parseResponse` 设置解析函数；

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-upload accept="image/*" list-type="picture" action="http://127.0.0.1:3001/upload" data-response-parser="local">
    <l-plus-icon></l-plus-icon>
  </l-upload>
</textarea>
<div class="source">
<textarea lang="html">
<l-upload accept="image/*" list-type="picture" action="http://127.0.0.1:3001/upload" data-response-parser="local">
  <l-plus-icon></l-plus-icon>
</l-upload>
</textarea>
<textarea lang="js">
function parseLocalUploadResponse(response) {
  if (response?.status !== "success" || typeof response?.data?.url !== "string") {
    throw new Error("上传响应缺少有效的文件地址");
  }
  const url = new URL(response.data.url);
  if (url.origin !== "http://127.0.0.1:3001" || url.username || url.password) {
    throw new Error("文件地址不是允许的本地上传服务地址");
  }
  return url.href;
}
//-
const upload = document.querySelector("l-upload[data-response-parser=local]");
upload.parseResponse = parseLocalUploadResponse;
</textarea>
</div>
</l-code-preview>
</ClientOnly>

`parseResponse` 如果解析成功返回正确的地址。如果解析失败，则通过 `throw` 抛出异常即可。

### 自定义上传

通过实例属性 `customRequest` 替换默认请求函数。配置自定义函数后不要求 `action`，由函数自行决定地址或接入业务 SDK。返回 `{ response, responseText?, status? }`（或其 Promise），随后仍由组件统一调用 `parseResponse`，处理成功、失败和 URL 校验。

`body` 已包含 `file` 和 `data` 表单字段，不要手动指定 multipart 的 Content-Type，浏览器会生成 boundary。SDK 可使用 `options.file.raw`；实际接入时使用 `options.onProgress(0到100)` 上报真实进度。未上报时显示循环等待动画，完成后进入解析阶段；

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-upload id="upload-custom-request" accept="image/*" list-type="picture">
    <l-plus-icon></l-plus-icon>
  </l-upload>
</textarea>
<div class="source">
<textarea lang="html">
<l-upload id="upload-custom-request" accept="image/*" list-type="picture">
  <l-plus-icon></l-plus-icon>
</l-upload>
</textarea>
<textarea lang="js">
async function demoCustomRequest({ body, headers, signal, onProgress }) {
  signal.throwIfAborted();
  let percent = 0;
  let timer;
  const stopProgress = () => { clearInterval(timer); };
  try {
    // 仅用于演示的模拟进度，不代表 fetch 实际上传的字节进度。
    onProgress(percent);
    timer = setInterval(() => {
      percent = Math.min(percent + 10, 90);
      onProgress(percent);
    }, 150);
    signal.addEventListener("abort", stopProgress, { once: true });
    // body 已由组件装入 file 文件及附加字段，无需再次 append 文件。
    const result = await fetch("http://127.0.0.1:3001/upload", {
      method: "POST", body, headers, signal,
    });
    const responseText = await result.text();
    const response = JSON.parse(responseText);
    signal.throwIfAborted();
    if (result.ok) onProgress(100);
    return { response, responseText, status: result.status };
  } finally {
    stopProgress();
    signal.removeEventListener("abort", stopProgress);
  }
}
//-
const upload = document.querySelector("#upload-custom-request");
upload.customRequest = demoCustomRequest;
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### 外部管理 fileList

也可以不使用内置请求或 `customRequest`：设置 `auto-upload="false"`，监听 `change` 的 `addedFiles`，调用外置上传函数，再重新赋值 `fileList` 来展示上传中、成功、失败和图片地址。预置已上传文件可以不提供 `raw`。图片模式只保留最后一项，普通文件模式保留完整列表。

下面是业务接入示例，使用同一个本地测试接口，接入业务时将 URL 替换为自己的接口；页面卸载时调用返回的清理函数：

```js
function connectExternalUpload(upload) {
  upload.setAttribute("auto-upload", "false");
  upload.fileList = [{ id: -1, name: "已上传.txt", size: 1024, status: "success" }];
  const pending = new Map();
  const patch = (id, changes) => {
    upload.fileList = upload.fileList.map((file) =>
      file.id === id ? { ...file, ...changes } : file,
    );
  };

  async function uploadExternally(file, signal) {
    const body = new FormData();
    body.append("file", file.raw, file.name ?? file.raw.name);
    const response = await fetch("http://127.0.0.1:3001/upload", { method: "POST", body, signal });
    if (!response.ok) throw new Error("上传失败");
    const result = await response.json();
    if (typeof result.url !== "string") throw new Error("缺少图片地址");
    const url = new URL(result.url, document.baseURI);
    if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) {
      throw new Error("图片地址不安全");
    }
    return url.href;
  }

  function onChange(event) {
    const { fileList, addedFiles = [] } = event.detail;
    for (const [id, controller] of pending) {
      if (!fileList.some((file) => file.id === id)) {
        controller.abort();
        pending.delete(id);
      }
    }
    for (const file of addedFiles) {
      const controller = new AbortController();
      pending.set(file.id, controller);
      patch(file.id, { status: "uploading", percentage: undefined });
      uploadExternally(file, controller.signal)
        .then((url) => {
          if (!controller.signal.aborted) patch(file.id, { status: "success", url });
        })
        .catch(() => {
          if (!controller.signal.aborted) patch(file.id, { status: "fail" });
        })
        .finally(() => {
          if (pending.get(file.id) === controller) pending.delete(file.id);
        });
    }
  }
  upload.addEventListener("change", onChange);
  return () => {
    upload.removeEventListener("change", onChange);
    for (const controller of pending.values()) controller.abort();
    pending.clear();
  };
}
```

`fileList` 每一项需要唯一的数字（安全整数）或字符串 `id` 和合法 `status`；数字 `1` 与字符串 `"1"` 是不同标识。`name`、`size` 可选，未提供名称时不显示名称，大小仅在提供有限数值且大于 0 时显示，单位字节。`percentage` 为 0～100，设为 `undefined` 时显示等待动画。应重新赋值数组使界面更新；不可变对象更新也受支持。同一任务保持 `id` 和 `raw` 不变，改变文件、删除条目或把内置任务状态切换为非 uploading 会取消该任务。直接修改数组或对象不会自动刷新。

完全外置模式的网络请求、业务事件和取消由外部代码负责；`fileList` 赋值本身不会触发 `success`、`error`、`progress` 或 `change`。优先使用 `customRequest` 可复用组件的取消和解析保护。组件只释放自身创建的预览地址；外部 object URL 和外部请求不能交给组件隐式清理。直接赋值 `fileList = []` 不会通知外部上传逻辑，需先取消自己的请求；调用 `clearFiles()` 会触发 change，可由上述监听器中止外部请求。

### 多文件上传

设置 `multiple` 属性允许在文件选择框中一次选择多个文件。在普通文件模式下，无论是否设置 `multiple`，再次选择文件都会追加到已有列表，保留已上传和待上传的文件；如需限制累计数量，使用 `max-count`。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-upload action="http://127.0.0.1:3001/upload" multiple>
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
  <l-upload action="http://127.0.0.1:3001/upload" drag>
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
  <l-upload action="http://127.0.0.1:3001/upload" max-size="1024">
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
  <l-upload action="http://127.0.0.1:3001/upload" multiple max-count="3">
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
  <l-upload action="http://127.0.0.1:3001/upload" disabled>
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
  <l-upload id="upload-manual" action="http://127.0.0.1:3001/upload" auto-upload="false">
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
  <l-upload action="http://127.0.0.1:3001/upload" headers='{"X-Token": "Bearer token"}'>
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

通过 `data` 属性设置上传时附带的额外参数（表单字段），属性值同样为**合法的 JSON 字符串**；本地测试服务会在响应的 `data.fields` 中返回这些字段。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-upload action="http://127.0.0.1:3001/upload" data='{"source": "litos-ui-docs", "type": "file"}'>
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
  <l-upload action="http://127.0.0.1:3001/upload" accept="image/*" list-type="picture" data-response-parser="local">
    <l-plus-icon></l-plus-icon>
    <span slot="tip">仅支持 jpg / png 格式图片，单张不超过 2MB</span>
  </l-upload>
</textarea>
</l-code-preview>
</ClientOnly>

### 监听上传事件

通过监听 `success`、`error`、`exceed` 等事件反馈上传结果（示例中的提示信息使用了 `Message` 组件）。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-upload class="upload-events" action="http://127.0.0.1:3001/upload" multiple max-count="3">
    <l-button type="primary">选择文件（最多 3 个，超限会提示）</l-button>
  </l-upload>
</textarea>
</l-code-preview>
</ClientOnly>

### Vue 中使用

在 Vue 3 中，可以使用 `ref` 获取组件实例，调用组件方法（也可以通过实例设置 `headers`、`data` 等对象属性）。

```html
<template>
  <l-upload ref="uploadRef" action="http://127.0.0.1:3001/upload" auto-upload="false">
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
| `multiple` | 普通文件模式允许一次多选并累计追加；picture 模式始终单选替换 | `boolean` | `false` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `drag` | 是否支持拖拽上传 | `boolean` | `false` |
| `list-type` | 展示模式：`text`（文件列表）、`picture`（trigger 内单图预览，重新选择替换） | `string` | `text` |
| `max-size` | 最大文件大小，单位 KB，超出不会加入列表 | `number` | `0`（不限制） |
| `max-count` | 普通文件模式的累计最大数量；picture 模式固定保留一张且允许替换 | `number` | `0`（不限制） |
| `auto-upload` | 是否自动上传，`false` 时通过 `upload()` 手动触发 | `boolean` | `true` |
| `action` | 默认 XHR 上传地址，以 multipart/form-data（字段名 file）提交；customRequest 可省略 | `string` | - |
| `show-file-list` | 普通文件模式是否显示列表；picture 模式始终隐藏列表，不影响图片预览 | `boolean` | `true` |
| `headers` | 上传请求头，需为合法 JSON 字符串，或通过实例属性赋值对象 | `object` | `{}` |
| `data` | 上传时附带的额外参数，需为合法 JSON 字符串，或通过实例属性赋值对象 | `object` | `{}` |
| `with-credentials` | 内置 XHR 是否携带 cookie；customRequest 自行配置 | `boolean` | `false` |

### Upload Properties

<!-- prettier-ignore -->
| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `parseResponse` | 响应解析函数；赋值 undefined 恢复默认函数 | `UploadResponseParser` | `defaultUploadResponseParser` |
| `customRequest` | 自定义上传函数，接管请求后仍复用组件解析和取消机制；赋值 undefined 恢复内置 XHR | `UploadRequestHandler` | `undefined` |
| `fileList` | 外部文件列表，重新赋值刷新界面；picture 模式保留最后一项 | `UploadFile[]` | `[]` |

公开类型 `UploadFile`、`UploadResponseContext`、`UploadResponseParser`、`UploadRequestOptions`、`UploadRequestResult`、`UploadRequestHandler` 均从 `litos-ui` 导出。

<!-- prettier-ignore -->
| customRequest 参数 | 说明 |
| --- | --- |
| `file` | 冻结的 id/name/size/raw 文件快照 |
| `action` | action 属性，可为空 |
| `body` | 含 file 和 data 字段的 FormData |
| `headers` | 请求头的只读副本 |
| `signal` | 上传、解析共享的取消信号；完成和取消时均中止 |
| `onProgress` | 真实进度回调，接受有限数值并限制到 0～100；取消后调用被忽略 |

返回值 `UploadRequestResult` 必须含 `response`，它是传入解析器的数据；可选 `responseText` 默认为空字符串，可选 HTTP `status` 默认为 200，非 2xx 触发上传失败。自定义请求和解析函数是可信业务代码，不支持 HTML 字符串形式的函数。

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
| `success` | 上传和解析成功时触发；response 为原文，data 为传给解析器的数据 | `{ file: UploadFile, response: string, data: unknown }` |
| `error` | 上传、响应解析或 URL 校验失败 | `{ file?: UploadFile, status?: number, phase: "upload" \| "parse", message: string }` |
| `error` | 文件大小超出 `max-size` 限制时触发（不会加入列表） | `{ files: File[], message: string }` |
| `progress` | 内置 XHR 获得可计算进度或 customRequest 调用 onProgress 时触发 | `{ file: UploadFile, percent: number }` |
| `remove` | 移除文件时触发 | `{ file: UploadFile, fileList: UploadFile[] }` |
| `preview` | 预览文件时触发 | `{ file: UploadFile }` |
| `exceed` | 选择超出 `max-count` 的文件时触发，`files` 为未加入列表的文件 | `{ files: File[] }` |

### UploadFile 类型

<!-- prettier-ignore -->
| 属性 | 说明 | 类型 |
| --- | --- | --- |
| `id` | 文件唯一标识，数字为安全整数；数字和字符串分别判定唯一性 | `number \| string` |
| `name` | 可选文件名，未提供或为空时不显示 | `string` |
| `size` | 可选文件大小，单位字节，仅大于 0 时显示 | `number` |
| `status` | 文件状态，`ready`、`uploading`、`success`、`fail` | `string` |
| `percentage` | 真实进度百分比；undefined 表示不确定进度 | `number \| undefined` |
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
| `--l-upload-picture-size` | 图片选择容器的宽高 | `90px` |