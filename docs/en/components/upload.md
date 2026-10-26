# Upload 上传

通过 `action` 指定上传地址, 将文件通过 `multipart/form-data` 方式(字段名为 `file`)上传到服务端。

## 本地上传测试服务

使用项目约定的 Node.js 24，运行基于 Node.js 原生 HTTP、FormData 和文件系统 API 的测试服务，无需安装额外依赖：

```bash
pnpm upload:server
# 也可直接运行：node scripts/upload-server.mjs
```

再在另一个终端运行 `pnpm docs:dev`。本页请求示例统一使用 `http://127.0.0.1:3001/upload`，文件字段名为 `file`，文件默认保存到 Windows 的 `D:\tmp\upload`。服务返回可直接访问的 `http://127.0.0.1:3001/files/文件名`，默认解析器即可使用，不需要地址转换。

接口支持 OPTIONS 预检、自定义请求头和携带凭据的跨域请求。单文件上限 20 MiB、请求体上限 25 MiB，最多同时处理 4 个上传；每次请求只接收一个 file，多文件由组件分别发请求。文件使用随机名称保存，避免覆盖；常见位图图片直接展示，其他文件（包括 SVG/HTML）作为附件下载。

服务仅监听本机 `127.0.0.1`，用于临时开发测试。可用 `UPLOAD_PORT`、`UPLOAD_DIR` 环境变量修改端口或目录；修改端口后也需同步示例 URL。访问 `http://127.0.0.1:3001/health` 可以检查服务状态。

返回示例：

```json
{
  "status": "success",
  "url": "http://127.0.0.1:3001/files/随机文件名.png",
  "data": {
    "url": "http://127.0.0.1:3001/files/随机文件名.png",
    "name": "示例.png",
    "size": 1024,
    "type": "image/png",
    "fields": {}
  }
}
```

## 引用

```js
import { Upload, regist, Button, PlusIcon, PictureIcon } from "litos-ui";

regist(Upload);
// 文件列表中的"预览/删除"按钮使用了图标组件, 需要时一起注册
import { SearchIcon, CloseIcon } from "litos-ui";
regist([SearchIcon, CloseIcon]);

// 注册本页演示使用的附加组件
regist([Button, PlusIcon, PictureIcon]);
```

## 基础使用

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

通过设置 `accept` 属性指定接受的文件类型，`action` 指定上传地址。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-upload action="http://127.0.0.1:3001/upload" accept=".txt,.md,.json">
    <l-button type="primary">选择文件</l-button>
  </l-upload>
</textarea>
</l-code-preview>
</ClientOnly>

### 图片上传

设置 `list-type="picture"` 使用单图上传模式。选择和上传期间显示本地预览，容器内展示等待动画；自定义请求上报真实进度时显示百分比；成功后优先显示服务端返回的 `url`、`data.url` 或 `link`，未返回地址时保留本地预览。再次选择图片会替换旧图。

上传失败时边框和图标变红，内部仅显示 `l-picture-icon`，点击即可重新选择。使用时需注册 `PictureIcon`。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-upload accept="image/*" list-type="picture" data-response-parser="local" action="http://127.0.0.1:3001/upload">
    <l-plus-icon></l-plus-icon>
  </l-upload>
</textarea>
</l-code-preview>
</ClientOnly>

> 本地服务直接返回图片地址。下方自定义解析示例仅演示字段提取和来源校验，组件不绑定任何服务的地址转换规则。

### 自定义响应解析

通过 JavaScript 实例属性 `parseResponse` 设置解析函数；不支持通过 HTML 字符串属性传入函数。解析器接收已解码的 JSON（非 JSON 响应为原始字符串），返回图片 URL 或返回该结果的 Promise。设置解析器后完全使用其结果，不再自动提取默认字段。

本地测试服务默认无需自定义解析。下面只演示如何提取嵌套字段并限制文件地址来源，不做地址转换；图片演示通过 `data-response-parser="local"` 标记，由本页脚本显式设置解析器；自己的项目直接对组件实例赋值即可：

```js
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

const upload = document.querySelector("l-upload[data-response-parser=local]");
upload.parseResponse = parseLocalUploadResponse;
```

默认 `parseResponse` 是独立且可复用的 `defaultUploadResponseParser` 函数（可从 `litos-ui` 导入），设置 `parseResponse = undefined` 可恢复。该函数仅提取响应中的 `url`、`data.url`、`link`，保持原始路径，不转换预览页。返回 `undefined`、`null` 或空字符串表示不提供远程地址，继续使用本地预览；抛出异常、Promise 拒绝、返回类型错误或不安全地址会进入失败状态，并触发 `error`（`phase: "parse"`），不会触发 `success`。异步解析期间显示“处理中”和等待动画，解析成功后才触发 `success`，事件中的 `response` 仍是原始响应字符串。

解析器的第二个参数包含只读文件元数据 `file`（`id`、`name`、`size`）、原始 `responseText`、HTTP `status` 和 `signal`。需要额外请求时，把 `signal` 传给 `fetch`；更换文件、移除、清空、重试、中止、组件卸载和任务完成都会中止该信号。过期解析结果和拒绝均不再更新组件或触发结果事件。

- 地址仅允许 HTTP(S)，相对地址按 `document.baseURI` 解析；拒绝用户名/密码及 `javascript:`、`data:`、外部 `blob:` 等地址。本地预览由组件创建，不受此限制。业务若需限制存储域名，应在解析器中进一步校验主机白名单。
- 解析器是应用提供的可信代码，不是沙箱；不要使用 `eval`、`Function` 或将响应拼入 HTML。不要在解析器中创建 object URL 或长期持有组件、网络响应、文件对象；组件传入的 `file` 仅是冻结的元数据快照。
- 组件通过 AbortController 中止内置 XHR，移除 XHR 和 signal 监听器，清理请求记录及自建预览地址；异步完成回调仅保留组件弱引用。任意第三方 Promise 无法被强制终止，自定义请求应配合 `signal` 取消，解析器自己创建的监听器和定时器也需要自行清理。文件列表仍保留 `raw` 供业务使用，不再需要时调用 `clearFiles()` 或通过 `fileList` 属性移除。

### 自定义上传

通过实例属性 `customRequest` 替换默认请求函数。默认请求使用 `XMLHttpRequest`，通过上传 progress 事件上报真实进度；配置自定义函数后不要求 `action`，由函数自行决定地址或接入业务 SDK。返回 `{ response, responseText?, status? }`（或其 Promise），随后仍由组件统一调用 `parseResponse`，处理成功、失败和 URL 校验。

`body` 已包含 `file` 和 `data` 表单字段，不要手动指定 multipart 的 Content-Type，浏览器会生成 boundary。SDK 可使用 `options.file.raw`；实际接入时使用 `options.onProgress(0到100)` 上报真实进度。未上报时显示循环等待动画，完成后进入解析阶段；默认 XHR 在可计算上传长度时上报真实 `progress`；长度不可计算时保留等待动画，不伪造百分比。

本例通过 `fetch` 上传到 `http://127.0.0.1:3001/upload`，请先启动 `pnpm upload:server`。进度通过定时器模拟，源码中已明确注释：等待响应时最多到 90%，成功后才到 100%；它不是实际字节进度。成功、失败及取消都会清理计时器。

演示直接发起上传请求，期间使用模拟进度，最多到 90%，成功后到 100%。模拟值不代表实际上传字节进度；本地请求较快时，进度条可能一闪而过。

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