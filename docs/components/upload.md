# Upload 上传

通过选择或者拖曳上传文件

## 引用

从总入口导入时，先注册 Upload，再按使用的模式注册所需依赖：

```js
import {
  Upload,
  regist,
  CloseIcon,
  EyeOutlineIcon,
  DeleteIcon,
  PictureIcon,
  ImagePreview,
  ArrowLeftIcon,
  ArrowRightIcon,
  ZoomInIcon,
  ZoomOutIcon,
  ReductionIcon,
  RefreshLeftIcon,
  RefreshRightIcon,
} from "litos-ui";

// 基础注册
regist(Upload);

// text 模式
regist(CloseIcon);

// picture 模式
regist(PictureIcon);

// picture-card 模式
regist([EyeOutlineIcon, DeleteIcon, PictureIcon]);
// prettier-ignore
regist([ImagePreview, CloseIcon, ArrowLeftIcon, ArrowRightIcon, ZoomInIcon, ZoomOutIcon, ReductionIcon, RefreshLeftIcon, RefreshRightIcon]); // ImagePreview
```

默认文本列表使用 `CloseIcon`；`picture` 的失败状态使用 `PictureIcon`；`picture-card` 使用 `EyeOutlineIcon`、`DeleteIcon`、`PictureIcon`，打开大图预览还需要上方的 ImagePreview 及其操作图标。可按使用的模式选择注册。

## 演示

<script setup>
  import { onMounted, nextTick, onUnmounted } from 'vue';
  import { elem, iterate } from 'utilane/browser';

  let $pictures;
  let $customUpload;
  let customUploadObserver;
  let $fileListDemo;
  let stopFileListDemo;
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

  function demoFileList(upload) {
    upload.fileList = [
      { id: "first", url: "http://127.0.0.1:3001/files/3b315d19-d97b-47a9-96bf-724a9aa9da11.jpeg", status: "uploading", percentage: 0 },
      { id: "second", url: "http://127.0.0.1:3001/files/5a710bd6-c7e5-4b7b-8e99-5a37ccf92efd", status: "ready" },
    ];
    const patch = (id, changes) => {
      upload.fileList = upload.fileList.map((file) => file.id === id ? { ...file, ...changes } : file);
    };
    const timers = [
      setTimeout(() => patch("first", { percentage: 50 }), 2000),
      setTimeout(() => {
        patch("first", { status: "success", percentage: 100 });
        patch("second", { status: "uploading", percentage: 0 });
      }, 3000),
      setTimeout(() => patch("second", { status: "fail" }), 5000),
    ];
    // 页面卸载或演示容器重建时调用，停止后续更新。
    return () => timers.forEach(clearTimeout);
  }

  function syncFileListDemo() {
    if (pageDisposed) return;
    const next = document.getElementById("upload-external-file-list");
    if (next === $fileListDemo) return;
    stopFileListDemo?.();
    stopFileListDemo = undefined;
    $fileListDemo = next;
    if (!next) return;
    // 进入可视区域再开始计时，避免滚动到演示时已经结束。
    let stopTimers;
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      if (!pageDisposed && $fileListDemo === next && !stopTimers) stopTimers = demoFileList(next);
    });
    observer.observe(next);
    stopFileListDemo = () => { observer.disconnect(); stopTimers?.(); };
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

  onMounted(async () => {
    // ClientOnly 和代码预览会异步创建、重建内部的 l-upload。
    await Promise.all([
      customElements.whenDefined('l-upload'),
      customElements.whenDefined('l-code-preview'),
    ]);
    await nextTick();
    if (pageDisposed) return;
    customUploadObserver = new MutationObserver(() => { syncCustomUpload(); syncFileListDemo(); });
    customUploadObserver.observe(document.body, { childList: true, subtree: true });
    syncCustomUpload();
    syncFileListDemo();
    $pictures = elem('l-upload[data-response-parser=local]');
    iterate($pictures, ($upload) => { $upload.parseResponse = parseLocalUploadResponse; });
  });

  onUnmounted(() => {
    pageDisposed = true;
    stopFileListDemo?.();
    stopFileListDemo = undefined;
    $fileListDemo = undefined;
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
  });
</script>

### 文件上传

通过 `accept` 指定接受的文件类型，`action` 指定上传地址。选择与拖入的文件会统一进行类型、大小校验，合格文件再按剩余数量加入列表。通过 `slot="tip"` 可传入提示文字。

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

### 照片墙

设置 `list-type="picture-card"` 展示多图照片墙，`multiple` 允许一次选择多张。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-upload list-type="picture-card" accept="image/*" drag multiple max-count="4" action="http://127.0.0.1:3001/upload">
    <l-plus-icon></l-plus-icon>
    <span slot="tip">最多上传 4 张图片</span>
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

通过实例属性 `customRequest` 替换默认请求函数。配置自定义函数后不要求 `action`，由函数自行决定地址或接入业务 SDK。异步函数返回 `Promise<UploadRequestResult>`，结果包含 `response` 以及可选的 `responseText`、`status`；随后由组件统一调用 `parseResponse`，处理成功、失败和 URL 校验。完整字段说明见下方 API 的“customRequest 返回值”。

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

设置 `auto-upload="false"`，通过 `fileList` 管理文件列表：`url` 指定图片地址，`status` 控制文件状态，`percentage` 控制上传进度。更新后重新赋值 `fileList` 即可刷新界面。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-upload id="upload-external-file-list" list-type="picture-card" auto-upload="false" max-count="2">
    <l-plus-icon></l-plus-icon>
  </l-upload>
</textarea>
<div class="source">
<textarea lang="html">
<l-upload id="upload-external-file-list" list-type="picture-card" auto-upload="false" max-count="2">
  <l-plus-icon></l-plus-icon>
</l-upload>
</textarea>
<textarea lang="js">
function demoFileList(upload) {
  upload.fileList = [
    { id: "first", url: "http://127.0.0.1:3001/files/3b315d19-d97b-47a9-96bf-724a9aa9da11.jpeg", status: "uploading", percentage: 0 },
    { id: "second", url: "http://127.0.0.1:3001/files/5a710bd6-c7e5-4b7b-8e99-5a37ccf92efd", status: "ready" },
  ];
  const patch = (id, changes) => {
    upload.fileList = upload.fileList.map((file) => file.id === id ? { ...file, ...changes } : file);
  };
  const timers = [
    setTimeout(() => patch("first", { percentage: 50 }), 2000),
    setTimeout(() => {
      patch("first", { status: "success", percentage: 100 });
      patch("second", { status: "uploading", percentage: 0 });
    }, 3000),
    setTimeout(() => patch("second", { status: "fail" }), 5000),
  ];
  // 页面卸载或演示容器重建时调用，停止后续更新。
  return () => timers.forEach(clearTimeout);
}
//-
const cleanup = demoFileList(document.querySelector("#upload-external-file-list"));
// 页面卸载时调用 cleanup()。
</textarea>
</div>
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

### 请求头与附加参数

通过 `headers` 设置上传请求头，通过 `data` 添加随文件一起提交的表单字段。两者都支持 HTML 属性中的合法 JSON 字符串，或通过 JavaScript 实例属性赋值普通对象。`headers` 的名称须为有效请求头名称，值必须是不含空字符、回车和换行的字符串，`data` 的值支持字符串、有限数字和布尔值，提交时转换为字符串。JSON 内部使用双引号；不要手动设置 multipart 的 `Content-Type`，浏览器会自动生成 boundary。

```html
<l-upload
  action="http://127.0.0.1:3001/upload"
  headers='{"X-Token": "Bearer token"}'
  data='{"source": "litos-ui-docs", "type": "file"}'
>
  <l-button type="primary">选择文件</l-button>
</l-upload>
```

也可以通过实例设置：

```js
const upload = document.querySelector("l-upload");
upload.headers = { "X-Token": "Bearer token" };
upload.data = { source: "litos-ui-docs", type: "file" };
```

本地测试服务会在响应的 `data.fields` 中返回附加字段。

## 按需入口

```js
import "litos-ui/styles/vars.css";
import "litos-ui/upload";
```

元素入口会注册内建依赖，服务与工具 API 仍需显式调用。SSR 框架请在客户端入口加载；样式、配套子元素、类型和总入口兼容用法见[按需导入](/on_demand)。

## API

### Upload Attributes

<!-- prettier-ignore -->
| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `accept` | 新选择及拖入文件的类型限制，支持逗号分隔的扩展名、MIME 和通配类型，如 `.png,image/jpeg,image/*` | `string` | - |
| `multiple` | 普通文件及照片墙模式允许一次多选并累计追加；picture 模式始终单选替换 | `boolean` | `false` |
| `disabled` | 是否禁用选择、拖入及列表操作，支持运行期间切换 | `boolean` | `false` |
| `drag` | 是否支持拖拽上传 | `boolean` | `false` |
| `list-type` | 展示模式：`text`（文件列表）、`picture`（trigger 内单图预览，重新选择替换）、`picture-card`（多图照片墙） | `string` | `text` |
| `max-size` | 最大文件大小，单位 KB，非负有限数字；超出不会加入列表 | `number` | `0`（不限制） |
| `max-count` | 累计最大数量，非负安全整数；照片墙达到上限隐藏入口；picture 模式固定保留一张且允许替换 | `number` | `0`（不限制） |
| `auto-upload` | 是否自动上传，`false` 时通过 `upload()` 手动触发 | `boolean` | `true` |
| `action` | 默认 XHR 上传地址，以 multipart/form-data（字段名 file）提交；customRequest 可省略 | `string` | - |
| `show-file-list` | 普通文件及照片墙模式是否显示列表；picture 模式始终隐藏列表，不影响图片预览 | `boolean` | `true` |
| `headers` | 上传请求头，HTML 属性使用 JSON 普通对象，各值为字符串；也可通过实例属性赋值 | `object` | `{}` |
| `data` | 附加表单字段，HTML 属性使用 JSON 普通对象，各值为字符串、有限数字或布尔值；也可通过实例属性赋值 | `object` | `{}` |
| `with-credentials` | 内置 XHR 是否携带 cookie；customRequest 自行配置 | `boolean` | `false` |
| `timeout` | 单次上传超时，单位毫秒；非负安全整数且不超过 `2147483647`，对内置 XHR 与 customRequest 生效 | `number` | `0`（不限制） |

`accept` 的扩展名规则按文件名匹配，MIME 规则按 `File.type` 匹配；无效规则忽略，未提供有效规则时不限制类型。不合格文件触发 `error` 且不占名额。前端校验用于交互反馈，服务端仍需独立验证文件类型和内容。

`max-size`、`max-count`、`timeout` 的非法 HTML 数值回退为 `0`；`headers`、`data` 的非法 JSON 或对象形状回退为 `{}`。通过对应 JavaScript 实例属性赋入非法值会抛出 `TypeError`。

`timeout` 只覆盖上传请求阶段，收到响应后停止计时，不包含 `parseResponse` 的执行时间。超时触发上传阶段的 `error` 并中止 `signal`；自定义上传需将该信号传给 `fetch` 或业务 SDK，才能实际停止外部请求。

### Upload Properties

<!-- prettier-ignore -->
| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `parseResponse` | 响应解析函数；赋值 undefined 恢复默认函数 | `UploadResponseParser` | `defaultUploadResponseParser` |
| `customRequest` | 自定义上传函数，接管请求后仍复用组件解析和取消机制；赋值 undefined 恢复内置 XHR | `UploadRequestHandler` | `undefined` |
| `fileList` | 外部文件列表，重新赋值刷新界面；picture 模式保留最后一项 | `UploadFile[]` | `[]` |
| `disabled` | 禁用状态；与 HTML disabled 属性同步 | `boolean` | `false` |
| `maxSize` | 对应 max-size，非负有限数字，单位 KB | `number` | `0` |
| `maxCount` | 对应 max-count，非负安全整数 | `number` | `0` |
| `timeout` | 上传超时毫秒数，非负安全整数，最大 `2147483647` | `number` | `0` |
| `headers` | 请求头普通对象，值必须为字符串 | `Record<string, string>` | `{}` |
| `data` | 附加表单字段普通对象，数字必须有限，提交时转为字符串 | `Record<string, string \| number \| boolean>` | `{}` |

<!-- prettier-ignore -->
| customRequest 参数 | 说明 |
| --- | --- |
| `file` | 冻结的 id/name/size/raw 文件快照 |
| `action` | action 属性，可为空 |
| `body` | 含 file 和 data 字段的 FormData |
| `headers` | 请求头的只读副本 |
| `signal` | 上传、解析共享的取消信号；完成和取消时均中止 |
| `onProgress` | 真实进度回调，接受有限数值并限制到 0～100；取消后调用被忽略 |

#### customRequest 返回值

异步上传函数返回 `Promise<UploadRequestResult>`。使用 `async` 时，`return { response, responseText, status }` 会自动包装为 Promise；组件等待 Promise 完成后，再调用 `parseResponse`。

```text
(options: UploadRequestOptions) => Promise<UploadRequestResult>

UploadRequestResult = {
  response: unknown;
  responseText?: string;
  status?: number;
}
```

返回对象的全部字段如下：

<!-- prettier-ignore -->
| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `response` | `unknown` | 是 | 无 | 接口响应数据，作为 `parseResponse(response, context)` 的第一个参数；通常是解析后的 JSON 对象。必须包含这个字段，不能只返回图片地址或直接返回 fetch 的 Response 对象。 |
| `responseText` | `string` | 否 | `""` | 接口响应原文，传给 `parseResponse` 的 `context.responseText`，并作为成功事件 `event.detail.response`。组件不会用它自动生成 `response`，也不会替你将 `response` 序列化。 |
| `status` | `number` | 否 | `200` | HTTP 状态码，应传入请求实际返回的状态码，如 fetch 的 `result.status`。必须为 0～599 的整数；仅 200～299 进入响应解析，其余值触发上传失败。它不是 fileList 中的文件状态字符串。 |

`response` 的结构取决于接口：例如 `{ url: "/files/photo.png" }`。默认解析器读取其中的 `url`、`data.url` 或 `link`；其他结构通过 `parseResponse` 自定义处理。成功事件的 `event.detail.data` 保留此响应数据。图片地址通过解析器返回，不需要在 `UploadRequestResult` 顶层另加 `url` 字段。

网络错误或业务判断失败时，使用 `throw new Error("上传失败")` 或返回被拒绝的 Promise，组件会进入失败状态并触发 `error`。HTTP 错误也可以通过实际 `status` 返回；`fetch` 遇到 4xx、5xx 不会自动拒绝 Promise。上传进度通过 `options.onProgress(percent)` 单独上报，不放在返回对象中。

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
| `handlePreview` | 仅对当前 `success` 文件触发 `preview` 事件；照片墙同时打开内置 ImagePreview | `file: UploadFile` |
| `handleRemove` | 移除文件（上传中会先中止），触发 `remove` 事件 | `file: UploadFile` |

### Upload Events

<!-- prettier-ignore -->
| 名称 | 说明 | 参数 |
| --- | --- | --- |
| `change` | 文件列表状态改变时触发 | `{ fileList: UploadFile[], addedFiles?: UploadFile[] }` |
| `success` | 上传和解析成功时触发；response 为原文，data 为传给解析器的数据 | `{ file: UploadFile, response: string, data: unknown }` |
| `error` | 上传失败、上传超时、响应解析或 URL 校验失败 | `{ file?: UploadFile, status?: number, phase: "upload" \| "parse", message: string }` |
| `error` | 文件类型不符合 accept 或大小超出 max-size 时触发（不会加入列表） | `{ files: File[], message: string }` |
| `progress` | 内置 XHR 获得可计算进度或 customRequest 调用 onProgress 时触发 | `{ file: UploadFile, percent: number }` |
| `remove` | 移除文件时触发 | `{ file: UploadFile, fileList: UploadFile[] }` |
| `preview` | 预览文件时触发 | `{ file: UploadFile }` |
| `exceed` | 选择超出 `max-count` 的文件时触发，`files` 为未加入列表的文件 | `{ files: File[] }` |

### UploadFile 类型

<!-- prettier-ignore -->
| 属性 | 说明 | 类型 |
| --- | --- | --- |
| `id` | 文件唯一标识，数字为安全整数，字符串不能为空或仅含空白；数字和字符串分别判定唯一性 | `number \| string` |
| `name` | 可选文件名，未提供或为空时不显示 | `string` |
| `size` | 可选文件大小，必须是有限数字，单位字节，仅大于 0 时显示 | `number` |
| `status` | 文件状态，`ready`、`uploading`、`success`、`fail` | `string` |
| `percentage` | 真实进度百分比；undefined 表示不确定进度 | `number \| undefined` |
| `raw` | 可选原始文件，提供时必须是 File 实例 | `File` |
| `url` | 可选图片地址，提供时必须为字符串；预览仅允许安全的 HTTP(S) 地址或相对路径 | `string` |

### 样式变量

组件直接通过 `var()` 的回退值消费样式变量，无需预先定义全部变量，可按需覆盖。下表列出浅色模式的消费回退值。引入 `litos-ui/styles/vars.css` 后，`:root.dark` 仅覆盖暗黑模式需要调整的背景、文字、边框及悬浮配色，通过变量继承作用于组件。

<!-- prettier-ignore -->
| 名称 | 描述 | 默认值 |
| --- | --- | --- |
| `--l-upload-width` | 组件宽度 | `100%` |
| `--l-upload-height` | 组件高度 | `auto` |
| `--l-upload-border-color` | 边框颜色 | `var(--l-border-color, #d9d9d9)` |
| `--l-upload-border-hover-color` | 悬浮时边框颜色 | `var(--l-primary-color, #007bff)` |
| `--l-upload-background` | 背景颜色 | `#ffffff` |
| `--l-upload-dragover-background` | 拖拽时背景颜色 | `var(--l-primary-color-light5, #e6f2ff)` |
| `--l-upload-text-color` | 文字颜色 | `var(--l-text-color, rgba(0, 0, 0, 0.88))` |
| `--l-upload-text-secondary-color` | 次要文字颜色 | `var(--l-text-secondary-color, rgba(0, 0, 0, 0.45))` |
| `--l-upload-progress-color` | 进度条颜色 | `var(--l-primary-color, #007bff)` |
| `--l-upload-success-color` | 成功状态颜色 | `var(--l-success-color, #52c41a)` |
| `--l-upload-error-color` | 错误状态颜色 | `var(--l-error-color, #f5222d)` |
| `--l-upload-disabled-color` | 禁用状态颜色 | `var(--l-disabled-color, #c9c9c9)` |
| `--l-upload-disabled-background` | 禁用状态背景颜色 | `#fbfbfb` |
| `--l-upload-disabled-border-color` | 禁用状态边框颜色 | `var(--l-disabled-color, #e6e6e6)` |
| `--l-upload-border-radius` | 圆角大小 | `var(--l-border-radius, 3px)` |
| `--l-upload-font-size` | 字体大小 | `14px` |
| `--l-upload-list-hover-background` | 文本列表悬浮背景，暗黑模式自动调整 | `rgba(0, 0, 0, 0.04)` |
| `--l-upload-list-item-height` | 文本列表项的最小高度 | `32px` |
| `--l-upload-picture-size` | 图片选择容器及照片墙图片项的统一宽高 | `90px` |

### CSS Parts

<!-- prettier-ignore -->
| 名称 | 说明 |
| --- | --- |
| `trigger` | 上传入口 |
| `tip` | 提示区域 |
| `list` | 文件列表容器；照片墙使用 display: contents 参与统一换行 |
| `card` | 照片墙图片项 |
| `image` | picture 及照片墙图片 |
| `actions` | 照片墙操作浮层 |