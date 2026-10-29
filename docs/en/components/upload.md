# Upload

Upload files by selecting or dragging them.

## Import and Registration

When importing from the root entry, register Upload first, then register the dependencies required by the modes you use:

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

// Base registration
regist(Upload);

// text mode
regist(CloseIcon);

// picture mode
regist(PictureIcon);

// picture-card mode
regist([EyeOutlineIcon, DeleteIcon, PictureIcon]);
// prettier-ignore
regist([ImagePreview, CloseIcon, ArrowLeftIcon, ArrowRightIcon, ZoomInIcon, ZoomOutIcon, ReductionIcon, RefreshLeftIcon, RefreshRightIcon]); // ImagePreview
```

The default text list uses `CloseIcon`. The failure state in `picture` mode uses `PictureIcon`. The `picture-card` mode uses `EyeOutlineIcon`, `DeleteIcon`, and `PictureIcon`; opening the full-size preview also requires ImagePreview and its operation icons listed above. Register the dependencies for the modes you use.

## Examples

Built-in status messages and action labels currently use the component's default Chinese UI.

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
      throw new Error("The upload response does not contain a valid file URL");
    }
    const url = new URL(response.data.url);
    if (url.origin !== "http://127.0.0.1:3001" || url.username || url.password) {
      throw new Error("The file URL is not from the allowed local upload service");
    }
    return url.href;
  }

  async function demoCustomRequest({ body, headers, signal, onProgress }) {
    signal.throwIfAborted();
    let percent = 0;
    let timer;
    const stopProgress = () => { clearInterval(timer); };
    try {
      // Simulated progress for this example only; it does not measure bytes uploaded by fetch.
      onProgress(percent);
      timer = setInterval(() => {
        percent = Math.min(percent + 10, 90);
        onProgress(percent);
      }, 150);
      signal.addEventListener("abort", stopProgress, { once: true });
      // The component has already added the file and extra fields to body.
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
    // Call when the page unmounts or the example is rebuilt to stop further updates.
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
    // Start the timers when the example enters view so it has not finished before you reach it.
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
    // ClientOnly and code previews create and rebuild their l-upload elements asynchronously.
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

### File Upload

Use `accept` to specify allowed file types and `action` to set the upload URL. Selected and dropped files go through the same type and size checks. Valid files are added up to the remaining file limit. Use `slot="tip"` to provide hint text.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-upload action="http://127.0.0.1:3001/upload" accept=".txt,.md,.json">
    <l-button type="primary">Select files</l-button>
    <span slot="tip">Please upload text files</span>
  </l-upload>
</textarea>
</l-code-preview>
</ClientOnly>

### Image Upload

Set `list-type="picture"` and `accept="image/*"`.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-upload accept="image/*" list-type="picture" action="http://127.0.0.1:3001/upload">
    <l-plus-icon></l-plus-icon>
  </l-upload>
</textarea>
</l-code-preview>
</ClientOnly>

### Picture Card Gallery

Set `list-type="picture-card"` to display a gallery of images. Add `multiple` to allow selecting several files at once.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-upload list-type="picture-card" accept="image/*" drag multiple max-count="4" action="http://127.0.0.1:3001/upload">
    <l-plus-icon></l-plus-icon>
    <span slot="tip">Upload up to 4 images</span>
  </l-upload>
</textarea>
</l-code-preview>
</ClientOnly>

### Custom Response Parsing

Set the JavaScript property `parseResponse` to provide a response parser.

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
    throw new Error("The upload response does not contain a valid file URL");
  }
  const url = new URL(response.data.url);
  if (url.origin !== "http://127.0.0.1:3001" || url.username || url.password) {
    throw new Error("The file URL is not from the allowed local upload service");
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

Return the file URL from `parseResponse` when parsing succeeds. Use `throw` to report a parsing failure.

### Custom Upload

Use the `customRequest` property to replace the default request function. When a custom function is provided, `action` is optional: the function can choose its own URL or use a service SDK. An asynchronous function returns `Promise<UploadRequestResult>` containing `response` and optional `responseText` and `status` fields. The component then calls `parseResponse` and handles success, failure, and URL validation. See "customRequest Return Value" in the API section for the full field descriptions.

`body` already contains the `file` and `data` form fields. Let the browser generate the multipart Content-Type and boundary. An SDK can access `options.file.raw`. Report actual upload progress with `options.onProgress(percent)`, using a value from 0 to 100. If progress is not reported, the component shows an indeterminate animation. It enters the parsing phase when the request completes.

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
    // Simulated progress for this example only; it does not measure bytes uploaded by fetch.
    onProgress(percent);
    timer = setInterval(() => {
      percent = Math.min(percent + 10, 90);
      onProgress(percent);
    }, 150);
    signal.addEventListener("abort", stopProgress, { once: true });
    // The component has already added the file and extra fields to body.
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

### Managing fileList Externally

Set `auto-upload="false"` and manage the file list through `fileList`: `url` specifies the image URL, `status` controls the file state, and `percentage` controls upload progress. Reassign `fileList` after each update to refresh the UI.

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
  // Call when the page unmounts or the example is rebuilt to stop further updates.
  return () => timers.forEach(clearTimeout);
}
//-
const cleanup = demoFileList(document.querySelector("#upload-external-file-list"));
// Call cleanup() when the page unmounts.
</textarea>
</div>
</l-code-preview>
</ClientOnly>

### Disabled State

Use `disabled` to control the component's disabled state.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-upload action="http://127.0.0.1:3001/upload" disabled>
    <l-button type="primary" disabled>Select files</l-button>
  </l-upload>
</textarea>
</l-code-preview>
</ClientOnly>

### Request Headers and Extra Fields

Use `headers` to set upload request headers and `data` to add form fields submitted with the file. Both accept a valid JSON object in an HTML attribute or a plain object assigned to the corresponding JavaScript property. Header names must be valid HTTP header names, and values must be strings without null characters, carriage returns, or line feeds. Values in `data` can be strings, finite numbers, or booleans and are converted to strings when submitted. Use double quotes inside JSON. Let the browser generate the multipart `Content-Type` and boundary.

```html
<l-upload
  action="http://127.0.0.1:3001/upload"
  headers='{"X-Token": "Bearer token"}'
  data='{"source": "litos-ui-docs", "type": "file"}'
>
  <l-button type="primary">Select files</l-button>
</l-upload>
```

You can also set these values on the component instance:

```js
const upload = document.querySelector("l-upload");
upload.headers = { "X-Token": "Bearer token" };
upload.data = { source: "litos-ui-docs", type: "file" };
```

The local test service returns the extra fields in `data.fields` in its response.

## On-demand Entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/upload";
```

Element entries register built-in dependencies. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](/en/on_demand) for styles, child elements, types and root-entry compatibility.

## API

### Upload Attributes

<!-- prettier-ignore -->
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `accept` | Allowed types for newly selected and dropped files. Supports comma-separated extensions, MIME types, and wildcards, such as `.png,image/jpeg,image/*`. | `string` | - |
| `multiple` | Allows selecting and appending multiple files in text and picture-card modes. Picture mode always keeps one file and replaces it on selection. | `boolean` | `false` |
| `disabled` | Disables file selection, dropping files, and list actions. Can be changed at runtime. | `boolean` | `false` |
| `drag` | Enables drag-and-drop upload. | `boolean` | `false` |
| `list-type` | Display mode: `text` (file list), `picture` (a single image in the trigger, replaced on selection), or `picture-card` (an image gallery). | `string` | `text` |
| `max-size` | Maximum file size in KB, as a non-negative finite number. Files exceeding it are not added to the list. | `number` | `0` (unlimited) |
| `max-count` | Maximum total file count, as a non-negative safe integer. The picture-card trigger is hidden when the limit is reached. Picture mode keeps one file and allows replacement. | `number` | `0` (unlimited) |
| `auto-upload` | Uploads automatically. Set to `false` to start uploads manually with `upload()`. | `boolean` | `true` |
| `action` | URL for the default XHR upload, submitted as multipart/form-data with the file field named file. Optional with customRequest. | `string` | - |
| `show-file-list` | Shows the list in text and picture-card modes. Picture mode always hides the list while keeping its image preview. | `boolean` | `true` |
| `headers` | Request headers as a JSON object with string values in an HTML attribute, or a plain object assigned through the property. | `object` | `{}` |
| `data` | Extra form fields as a JSON object with string, finite-number, or boolean values in an HTML attribute, or a plain object assigned through the property. | `object` | `{}` |
| `with-credentials` | Includes cookies with the built-in XHR request. Configure credentials separately in customRequest. | `boolean` | `false` |
| `timeout` | Timeout per upload request in milliseconds. Must be a non-negative safe integer no greater than `2147483647`. Applies to both built-in XHR and customRequest. | `number` | `0` (unlimited) |

Extension rules in `accept` match the file name, while MIME rules match `File.type`. Invalid rules are ignored; if no valid rules are provided, all types are allowed. Rejected files fire `error` and do not count toward the file limit. Client-side validation provides interaction feedback; the server must independently validate file types and content.

Invalid numeric HTML attributes for `max-size`, `max-count`, and `timeout` fall back to `0`. Invalid JSON or object shapes for `headers` and `data` fall back to `{}`. Assigning invalid values through the corresponding JavaScript properties throws a `TypeError`.

`timeout` covers only the upload request phase. Timing stops when the response is received and does not include `parseResponse` execution. A timeout fires an upload-phase `error` and aborts `signal`. A custom request must pass this signal to `fetch` or its SDK to stop the external request.

### Upload Properties

<!-- prettier-ignore -->
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `parseResponse` | Response parser. Assign undefined to restore the default parser. | `UploadResponseParser` | `defaultUploadResponseParser` |
| `customRequest` | Custom request function that uses the component's parsing and cancellation flow. Assign undefined to restore built-in XHR. | `UploadRequestHandler` | `undefined` |
| `fileList` | Externally managed file list. Reassign it to refresh the UI. Picture mode keeps the last item. | `UploadFile[]` | `[]` |
| `disabled` | Disabled state, synchronized with the HTML disabled attribute. | `boolean` | `false` |
| `maxSize` | Corresponds to max-size. A non-negative finite number in KB. | `number` | `0` |
| `maxCount` | Corresponds to max-count. A non-negative safe integer. | `number` | `0` |
| `timeout` | Upload timeout in milliseconds. A non-negative safe integer no greater than `2147483647`. | `number` | `0` |
| `headers` | Plain object of request headers with string values. | `Record<string, string>` | `{}` |
| `data` | Plain object of extra form fields. Numbers must be finite. Values are converted to strings when submitted. | `Record<string, string \| number \| boolean>` | `{}` |

<!-- prettier-ignore -->
| customRequest Parameter | Description |
| --- | --- |
| `file` | Frozen file snapshot containing id, name, size, and raw. |
| `action` | The action attribute value; may be empty. |
| `body` | FormData containing the file and data fields. |
| `headers` | Read-only copy of the request headers. |
| `signal` | Cancellation signal shared by the upload and parsing phases. Aborted on completion or cancellation. |
| `onProgress` | Actual progress callback. Accepts finite values clamped to 0–100. Calls after cancellation are ignored. |

#### customRequest Return Value

An asynchronous upload function returns `Promise<UploadRequestResult>`. With `async`, `return { response, responseText, status }` is automatically wrapped in a Promise. The component waits for that Promise to resolve before calling `parseResponse`.

```text
(options: UploadRequestOptions) => Promise<UploadRequestResult>

UploadRequestResult = {
  response: unknown;
  responseText?: string;
  status?: number;
}
```

The returned object has the following fields:

<!-- prettier-ignore -->
| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `response` | `unknown` | Yes | Not set | Response data passed as the first argument to `parseResponse(response, context)`, usually a parsed JSON object. This field is required; returning only an image URL or a fetch Response object does not satisfy the result format. |
| `responseText` | `string` | No | `""` | Raw response text, passed as `context.responseText` to the parser and as `event.detail.response` in the success event. The component does not derive `response` from it or serialize `response` for you. |
| `status` | `number` | No | `200` | HTTP status code. Pass the actual request status, such as fetch's `result.status`. It must be an integer from 0 to 599. Only 200–299 proceed to response parsing; other values cause an upload failure. This is separate from the file status string in fileList. |

The structure of `response` depends on your API, for example `{ url: "/files/photo.png" }`. The default parser reads `url`, `data.url`, or `link`; use `parseResponse` for other structures. The success event preserves the response data in `event.detail.data`. Return the image URL from the parser; an extra top-level `url` field in `UploadRequestResult` is not required.

For network or application-level failures, use `throw new Error("Upload failed")` or return a rejected Promise. The component enters the failure state and fires `error`. HTTP errors can also be reported through the actual `status`; `fetch` does not automatically reject its Promise for 4xx or 5xx responses. Report progress separately through `options.onProgress(percent)`, rather than in the result object.

### Upload Slots

<!-- prettier-ignore -->
| Name | Description |
| --- | --- |
| `default` | Content that triggers file selection. |
| `tip` | Hint content below the trigger and above the file list. Takes no space when empty. |

### Upload Methods

<!-- prettier-ignore -->
| Name | Description | Parameters |
| --- | --- | --- |
| `upload` | Uploads files. By default, only files in the `ready` state are uploaded. | `files?: UploadFile[]` |
| `clearFiles` | Clears the file list and aborts active upload requests. | - |
| `abort` | Aborts active requests and returns files to the `ready` state. Omit the argument to abort all active uploads. | `file?: UploadFile` |
| `handlePreview` | Fires `preview` only for a current file in the `success` state. Picture-card mode also opens the built-in ImagePreview. | `file: UploadFile` |
| `handleRemove` | Removes a file, aborting its active request first, and fires `remove`. | `file: UploadFile` |

### Upload Events

<!-- prettier-ignore -->
| Name | Description | Parameters |
| --- | --- | --- |
| `change` | Fires when the file list or file state changes. | `{ fileList: UploadFile[], addedFiles?: UploadFile[] }` |
| `success` | Fires when upload and parsing succeed. response contains the raw text; data contains the data passed to the parser. | `{ file: UploadFile, response: string, data: unknown }` |
| `error` | Fires on upload failure or timeout, response parsing failure, or URL validation failure. | `{ file?: UploadFile, status?: number, phase: "upload" \| "parse", message: string }` |
| `error` | Fires when a file fails accept or max-size validation. The file is not added to the list. | `{ files: File[], message: string }` |
| `progress` | Fires when built-in XHR reports computable progress or customRequest calls onProgress. | `{ file: UploadFile, percent: number }` |
| `remove` | Fires when a file is removed. | `{ file: UploadFile, fileList: UploadFile[] }` |
| `preview` | Fires when a file is previewed. | `{ file: UploadFile }` |
| `exceed` | Fires when the selection exceeds `max-count`. files contains the files that were not added. | `{ files: File[] }` |

### UploadFile Type

<!-- prettier-ignore -->
| Property | Description | Type |
| --- | --- | --- |
| `id` | Unique file ID. Numbers must be safe integers; strings must not be empty or whitespace-only. Numeric and string IDs are treated separately. | `number \| string` |
| `name` | Optional file name. Hidden when omitted or empty. | `string` |
| `size` | Optional file size in bytes. Must be finite; displayed only when greater than 0. | `number` |
| `status` | File state: `ready`, `uploading`, `success`, or `fail`. | `string` |
| `percentage` | Actual progress percentage. undefined indicates indeterminate progress. | `number \| undefined` |
| `raw` | Optional original file. Must be a File instance when provided. | `File` |
| `url` | Optional image URL. Must be a string when provided. Previews allow only safe HTTP(S) URLs or relative paths. | `string` |

### CSS Variables

The component uses `var()` fallback values, so you can override individual variables without defining the entire set. The table below lists the light-mode fallbacks. After you import `litos-ui/styles/dark.css` following the base variables and add the `dark` class to the root element, `:root.dark` overrides only the backgrounds, text, borders, and hover colors that need to change in dark mode. These values reach the component through CSS variable inheritance.

<!-- prettier-ignore -->
| Name | Description | Default |
| --- | --- | --- |
| `--l-upload-width` | Component width | `100%` |
| `--l-upload-height` | Component height | `auto` |
| `--l-upload-border-color` | Border color | `var(--l-border-color, #d9d9d9)` |
| `--l-upload-border-hover-color` | Border color on hover | `var(--l-primary-color, #007bff)` |
| `--l-upload-background` | Background color | `#ffffff` |
| `--l-upload-dragover-background` | Background color while dragging over the component | `var(--l-primary-color-light5, #e6f2ff)` |
| `--l-upload-text-color` | Text color | `var(--l-text-color, rgba(0, 0, 0, 0.88))` |
| `--l-upload-text-secondary-color` | Secondary text color | `var(--l-text-secondary-color, rgba(0, 0, 0, 0.45))` |
| `--l-upload-progress-color` | Progress bar color | `var(--l-primary-color, #007bff)` |
| `--l-upload-success-color` | Success text color | `var(--l-success-color, #52c41a)` |
| `--l-upload-error-color` | Error text color | `var(--l-error-color, #f5222d)` |
| `--l-upload-disabled-color` | Disabled text color | `var(--l-disabled-color, #c9c9c9)` |
| `--l-upload-disabled-background` | Disabled background color | `#fbfbfb` |
| `--l-upload-disabled-border-color` | Disabled border color | `var(--l-disabled-color, #e6e6e6)` |
| `--l-upload-border-radius` | Border radius | `var(--l-border-radius, 3px)` |
| `--l-upload-font-size` | Font size | `14px` |
| `--l-upload-list-hover-background` | Text list background on hover; adjusted automatically in dark mode | `rgba(0, 0, 0, 0.04)` |
| `--l-upload-list-item-height` | Minimum height of text list items | `32px` |
| `--l-upload-picture-size` | Width and height shared by the image trigger and picture-card items | `90px` |

### CSS Parts

<!-- prettier-ignore -->
| Name | Description |
| --- | --- |
| `trigger` | File selection trigger |
| `tip` | Hint area |
| `list` | File list container. Picture-card mode uses display: contents to take part in wrapping. |
| `card` | Picture-card item |
| `image` | Images in picture and picture-card modes |
| `actions` | Picture-card action overlay |