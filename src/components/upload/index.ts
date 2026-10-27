import { kebabToCamel, parseAttrValue } from "../utils";
import BaseComponent from "../base";
import type ImagePreview from "../image/image_preview";

import { formatClass, addClass, removeClass, on, off, $one, $$ } from "utilane/browser";
import animationSheet from "../styles/animation";
import uploadSheet from "./style";

export type UploadFile = {
  id: number | string;
  name?: string;
  size?: number;
  status: "ready" | "uploading" | "success" | "fail";
  percentage?: number;
  raw?: File;
  url?: string;
};

export type UploadResponseContext = Readonly<{
  file: Readonly<Pick<UploadFile, "id" | "name" | "size">>;
  responseText: string;
  status: number;
  signal: AbortSignal;
}>;

export type UploadResponseParser = (
  response: unknown,
  context: UploadResponseContext,
) => string | null | undefined | Promise<string | null | undefined>;

export type UploadRequestOptions = Readonly<{
  file: Readonly<Pick<UploadFile, "id" | "name" | "size"> & { raw: File }>;
  action: string;
  body: FormData;
  headers: Readonly<Record<string, string>>;
  signal: AbortSignal;
  onProgress: (percent: number) => void;
}>;

export type UploadRequestResult = {
  response: unknown;
  responseText?: string;
  status?: number;
};

export type UploadRequestHandler = (
  options: UploadRequestOptions,
) => UploadRequestResult | Promise<UploadRequestResult>;

export const defaultUploadResponseParser: UploadResponseParser = (response) => {
  if (!response || typeof response !== "object") return undefined;
  const data = response as { url?: string; data?: { url?: string }; link?: string };
  return data.url || data.data?.url || data.link;
};

function defaultUploadRequest(
  options: UploadRequestOptions,
  withCredentials: boolean,
  timeout: number,
): Promise<UploadRequestResult> {
  return new Promise((resolve, reject) => {
    const abortError = () => new DOMException("上传已中止", "AbortError");
    if (options.signal.aborted) {
      reject(abortError());
      return;
    }
    const xhr = new XMLHttpRequest();
    let settled = false;
    const cleanup = () => {
      xhr.upload.removeEventListener("progress", handleProgress);
      xhr.removeEventListener("load", handleLoad);
      xhr.removeEventListener("error", handleError);
      xhr.removeEventListener("timeout", handleTimeout);
      xhr.removeEventListener("abort", handleAbort);
      options.signal.removeEventListener("abort", cancel);
    };
    const fail = (error: unknown) => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(error);
    };
    const handleProgress = (event: ProgressEvent) => {
      if (!settled && event.lengthComputable && event.total > 0) {
        options.onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };
    const handleLoad = () => {
      if (settled) return;
      try {
        const responseText = xhr.responseText;
        let response: unknown = responseText;
        try {
          response = JSON.parse(responseText);
        } catch {
          /* 保留非 JSON 原文。 */
        }
        const result = { response, responseText, status: xhr.status };
        settled = true;
        cleanup();
        resolve(result);
      } catch (error) {
        fail(error);
      }
    };
    const handleError = () => fail(new Error("上传网络错误"));
    const handleTimeout = () => fail(new Error("上传超时"));
    const handleAbort = () => fail(abortError());
    const cancel = () => {
      fail(abortError());
      xhr.abort();
    };
    xhr.upload.addEventListener("progress", handleProgress);
    xhr.addEventListener("load", handleLoad);
    xhr.addEventListener("error", handleError);
    xhr.addEventListener("timeout", handleTimeout);
    xhr.addEventListener("abort", handleAbort);
    options.signal.addEventListener("abort", cancel, { once: true });
    try {
      xhr.open("POST", options.action);
      xhr.withCredentials = withCredentials;
      xhr.timeout = timeout;
      Object.keys(options.headers).forEach((key) =>
        xhr.setRequestHeader(key, options.headers[key]),
      );
      xhr.send(options.body);
    } catch (error) {
      fail(error);
      xhr.abort();
    }
  });
}

type UploadRequest = {
  token: symbol;
  file: UploadFile;
  controller: AbortController;
  phase: "upload" | "parse";
  response: unknown;
  responseText: string;
  status: number;
  timer?: ReturnType<typeof setTimeout>;
};

type UploadRenderSnapshot = Pick<
  UploadFile,
  "name" | "size" | "status" | "percentage" | "raw" | "url"
> & {
  disabled: boolean;
  phase?: UploadRequest["phase"];
};

type UploadFileNode = {
  element: HTMLElement;
  snapshot: UploadRenderSnapshot;
};

type UploadState = {
  accept: string;
  multiple: boolean;
  disabled: boolean;
  drag: boolean;
  listType: "text" | "picture" | "picture-card";
  maxSize: number;
  maxCount: number;
  timeout: number;
  autoUpload: boolean;
  action: string;
  showFileList: boolean;
  fileList: UploadFile[];
  headers: Record<string, string>;
  data: Record<string, string | number | boolean>;
  withCredentials: boolean;
};

let fileId = 0;

export default class Upload extends BaseComponent<UploadState> {
  public static baseName = "upload";
  $input?: HTMLInputElement;
  $trigger?: HTMLElement;
  $tip?: HTMLElement;
  /** 本地预览地址缓存, id => objectURL */
  $objectUrls = new Map<UploadFile["id"], string>();
  /** 拖拽事件是否已绑定 */
  private _dragBound = false;
  private _parseResponse?: UploadResponseParser;
  private _customRequest?: UploadRequestHandler;
  private _requests = new Map<UploadFile["id"], UploadRequest>();
  private _destroyed = false;
  private _fileNodes = new Map<UploadFile["id"], UploadFileNode>();
  private _listElement?: HTMLElement;
  private _triggerFile?: Pick<UploadFile, "id" | "raw">;
  private _listMode?: UploadState["listType"];
  private _preview?: ImagePreview;
  private _previewFiles: Array<Pick<UploadFile, "id" | "raw"> & { url: string }> = [];

  get parseResponse(): UploadResponseParser {
    return this._parseResponse ?? defaultUploadResponseParser;
  }

  set parseResponse(parser: UploadResponseParser | undefined | null) {
    if (parser != null && typeof parser !== "function") {
      throw new TypeError("parseResponse 必须是函数或 undefined");
    }
    this._parseResponse = parser as UploadResponseParser;
  }

  get customRequest() {
    return this._customRequest;
  }

  set customRequest(handler: UploadRequestHandler | undefined) {
    if (handler !== undefined && typeof handler !== "function") {
      throw new TypeError("customRequest 必须是函数或 undefined");
    }
    this._customRequest = handler;
  }

  constructor() {
    super();
    this.version = 2;
    this._state = {
      accept: "",
      multiple: false,
      disabled: false,
      drag: false,
      listType: "text",
      maxSize: 0,
      maxCount: 0,
      timeout: 0,
      autoUpload: true,
      action: "",
      showFileList: true,
      fileList: [],
      headers: {},
      data: {},
      withCredentials: false,
    };
  }

  get disabled() {
    return this._state.disabled;
  }

  set disabled(value: boolean) {
    if (value) {
      this.setAttribute("disabled", "");
    } else {
      this.removeAttribute("disabled");
    }
  }

  get fileList() {
    return this._state.fileList;
  }

  set fileList(files: UploadFile[]) {
    if (!Array.isArray(files)) throw new TypeError("fileList 必须是数组");
    const ids = new Set<UploadFile["id"]>();
    for (const file of files) {
      if (
        !file ||
        (typeof file.id === "string" ? !file.id.trim() : !Number.isSafeInteger(file.id)) ||
        ids.has(file.id) ||
        (file.raw !== undefined && !(file.raw instanceof File)) ||
        (file.url !== undefined && typeof file.url !== "string") ||
        (file.name !== undefined && typeof file.name !== "string") ||
        (file.size !== undefined && !Number.isFinite(file.size)) ||
        !["ready", "uploading", "success", "fail"].includes(file.status) ||
        (file.percentage !== undefined &&
          (!Number.isFinite(file.percentage) || file.percentage < 0 || file.percentage > 100))
      ) {
        throw new TypeError(
          "fileList 文件需包含唯一数字或字符串 id、有效 name/size/status/percentage",
        );
      }
      if (typeof file.id === "string") {
        try {
          encodeURIComponent(file.id);
        } catch {
          throw new TypeError("fileList id 必须是有效 Unicode 字符串");
        }
      }
      ids.add(file.id);
    }
    files = this._state.listType === "picture" ? files.slice(-1) : files.slice();
    this._syncPreview(files);
    const nextFiles = new Map(files.map((file) => [file.id, file]));
    for (const previous of this._state.fileList) {
      const next = nextFiles.get(previous.id);
      const request = this._requests.get(previous.id);
      const sameRaw = next && next.raw === previous.raw;
      if (request && (!sameRaw || next.status !== "uploading")) {
        this._disposeRequest(previous.id);
      } else if (request && next) {
        // 允许外部通过不可变 fileList 快照更新同一上传任务。
        request.file = next;
      }
      let usesRemoteUrl = false;
      if (next?.status === "success") {
        try {
          usesRemoteUrl = !!this._safePreviewUrl(next.url);
        } catch {
          // 无效远程地址仍使用本地预览，保留其 object URL。
        }
      }
      if (!sameRaw || usesRemoteUrl) this._revokeObjectUrl(previous);
    }
    this._state.fileList = files;
    if (this.rendered) this._renderFileList();
  }

  get headers(): Record<string, string> {
    return this._state.headers;
  }

  set headers(value: Record<string, string> | null | undefined) {
    this._state.headers = this._validateRecord(value, "headers") as Record<string, string>;
  }

  get data(): Record<string, string | number | boolean> {
    return this._state.data;
  }

  set data(value: Record<string, string | number | boolean> | null | undefined) {
    this._state.data = this._validateRecord(value, "data");
  }

  private _validateRecord(
    value: unknown,
    name: "headers" | "data",
  ): Record<string, string | number | boolean> {
    if (value == null) return {};
    const prototype = typeof value === "object" ? Object.getPrototypeOf(value) : undefined;
    if (
      Object.prototype.toString.call(value) !== "[object Object]" ||
      (prototype !== null && Object.getPrototypeOf(prototype) !== null)
    ) {
      throw new TypeError(`${name} 必须是普通对象`);
    }
    const entries = Object.entries(value as object);
    for (const [key, item] of entries) {
      if (name === "headers") {
        if (
          typeof item !== "string" ||
          !/^[!#$%&'*+.^_`|~0-9a-z-]+$/i.test(key) ||
          /[\0\r\n]/.test(item)
        )
          throw new TypeError("headers 必须包含有效请求头名称及字符串值");
      } else if (
        !["string", "number", "boolean"].includes(typeof item) ||
        (typeof item === "number" && !Number.isFinite(item))
      ) {
        throw new TypeError("data 的值仅支持字符串、有限数字或布尔值");
      }
    }
    return Object.fromEntries(entries);
  }

  private _validLimit(value: unknown, name: "max-size" | "max-count" | "timeout"): value is number {
    return (
      typeof value === "number" &&
      Number.isFinite(value) &&
      value >= 0 &&
      (name === "max-size" || Number.isSafeInteger(value)) &&
      (name !== "timeout" || value <= 2147483647)
    );
  }

  private _setLimit(name: "max-size" | "max-count" | "timeout", value: number) {
    if (!this._validLimit(value, name)) throw new TypeError(`${name} 必须为有效的非负数值`);
    this.setAttribute(name, String(value));
  }

  get maxSize() {
    return this._state.maxSize;
  }
  set maxSize(value: number) {
    this._setLimit("max-size", value);
  }
  get maxCount() {
    return this._state.maxCount;
  }
  set maxCount(value: number) {
    this._setLimit("max-count", value);
  }
  get timeout() {
    return this._state.timeout;
  }
  set timeout(value: number) {
    this._setLimit("timeout", value);
  }

  get showFileList() {
    return this._state.showFileList;
  }

  set showFileList(value: boolean) {
    this._state.showFileList = value;
    if (this.rendered) {
      this._renderFileList();
    }
  }

  get multiple() {
    return this._state.multiple;
  }

  set multiple(value: boolean) {
    this._state.multiple = value;
    if (this.$input) {
      if (value && this._state.listType !== "picture") {
        this.$input.multiple = true;
      } else {
        this.$input.removeAttribute("multiple");
      }
    }
  }

  static get observedAttributes() {
    return [
      "accept",
      "multiple",
      "disabled",
      "drag",
      "list-type",
      "max-size",
      "max-count",
      "timeout",
      "auto-upload",
      "action",
      "show-file-list",
      "headers",
      "data",
      "with-credentials",
    ];
  }

  protected attributeChanged(name: string, _oldValue: string, newValue: string): void {
    switch (name) {
      case "accept":
      case "action":
        this._state[kebabToCamel(name) as "action"] = newValue ?? "";
        break;
      case "list-type":
        this._state.listType =
          newValue === "picture" || newValue === "picture-card" ? newValue : "text";
        break;
      case "multiple":
      case "disabled":
      case "drag":
      case "auto-upload":
      case "show-file-list":
      case "with-credentials":
        this._state[kebabToCamel(name) as "multiple"] = parseAttrValue(
          newValue,
          name === "auto-upload" || name === "show-file-list",
          name,
        );
        break;
      case "max-size":
      case "max-count":
      case "timeout": {
        const value = newValue == null ? 0 : Number(newValue);
        this._state[kebabToCamel(name) as "maxSize"] = this._validLimit(value, name) ? value : 0;
        break;
      }

      case "headers":
      case "data":
        try {
          this._state[name] = this._validateRecord(
            newValue == null ? undefined : JSON.parse(newValue),
            name,
          ) as Record<string, string>;
        } catch {
          // 属性值必须是合法 JSON 字符串, 例如: headers='{"Authorization": "Bearer token"}'
          this._state[kebabToCamel(name) as "headers"] = {} as never;
        }
        break;
    }
  }

  protected updateDOM(changedProps: Set<string>): void {
    if (this.$input) {
      if (changedProps.has("accept")) {
        if (this._state.accept) {
          this.$input.accept = this._state.accept;
        } else {
          this.$input.removeAttribute("accept");
        }
      }
      if (changedProps.has("multiple") || changedProps.has("list-type")) {
        if (this._state.multiple && this._state.listType !== "picture") {
          this.$input.multiple = true;
        } else {
          this.$input.removeAttribute("multiple");
        }
      }
      if (changedProps.has("disabled")) {
        this.$input.disabled = this._state.disabled;
        this._resetClass();
      }
    }
    if (changedProps.has("list-type")) {
      if (this._state.listType === "picture") {
        this.fileList = this._state.fileList;
      }
      this._closePreview();
      this._resetClass();
      this._renderFileList();
    }
    if (changedProps.has("disabled")) this._renderFileList();
    if (changedProps.has("show-file-list") || changedProps.has("max-count")) {
      this._renderFileList();
    }
    if (changedProps.has("drag")) {
      this._setDragListeners(this._state.drag);
      this._resetClass();
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._setDragListeners(this._state.drag);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._setDragListeners(false);
  }

  render_v2() {
    return {
      styleSheets: [uploadSheet, animationSheet],
      template: this.render(),
    };
  }

  afterInit(): void {
    this._destroyed = false;
    // 基类会序列化首次模板，挂载后重新关联真实节点。
    this._fileNodes.clear();
    this._listElement = undefined;
    this._listMode = undefined;
    this._triggerFile = undefined;
    this.$input = $one(".l-upload-input", this.root) as HTMLInputElement;
    this.$trigger = $one(".l-upload-trigger", this.root) as HTMLElement;
    if (this.$input) {
      on(this.$input, "change", this._handleInputChange);
    }
    if (this.$trigger) {
      on(this.$trigger, "click", this._handleClick);
      on(this.$trigger, "keydown", this._handleTriggerKeydown);
    }
    // 未分发内容时隐藏 tip 区域
    const $tip = $one(".l-upload-tip", this.root);
    const $tipSlot = $one("slot[name=tip]", this.root) as HTMLSlotElement;
    if ($tip && $tipSlot) {
      this.$tip = $tip;
      this._updateTipEmpty($tipSlot);
      on($tipSlot, "slotchange", this._handleTipSlotChange);
    }
    // 渲染后挂载已有文件列表
    this._renderFileList();
  }

  private _updateTipEmpty($tipSlot: HTMLSlotElement) {
    if (!$tipSlot || !this.$tip) return;
    const empty = $tipSlot.assignedNodes({ flatten: true }).length === 0;
    this.$tip.style.display = empty ? "none" : "";
  }

  private _handleTipSlotChange = (event: Event) => {
    this._updateTipEmpty(event.currentTarget as HTMLSlotElement);
  };

  beforeDestroy(): void {
    this._destroyed = true;
    this._closePreview();
    if (this.$input) {
      off(this.$input, "change", this._handleInputChange);
    }
    if (this.$trigger) {
      off(this.$trigger, "click", this._handleClick);
      off(this.$trigger, "keydown", this._handleTriggerKeydown);
    }
    const tipSlot = $one("slot[name=tip]", this.root);
    if (tipSlot) off(tipSlot, "slotchange", this._handleTipSlotChange);
    // 中止所有进行中的上传
    this.abort();
    for (const id of this._requests.keys()) this._disposeRequest(id);
    this._revokeAllObjectUrls();
    this._fileNodes.clear();
    this._listElement = undefined;
    this._listMode = undefined;
    this._triggerFile = undefined;
    this.$trigger = undefined;
    this.$input = undefined;
    this.$tip = undefined;
  }

  public render() {
    const fragment = document.createDocumentFragment();

    // 触发区域
    const trigger = $$("div", {
      class: ["l-upload-trigger", "l-upload-trigger--" + this._state.listType],
      part: "trigger",
      innerHTML: "<slot></slot>",
    });
    const items = $$("div", { class: "l-upload-items" });
    items.appendChild(trigger);
    fragment.appendChild(items);

    // 隐藏的 file input
    const input = $$("input", {
      type: "file",
      class: "l-upload-input",
    }) as HTMLInputElement;
    if (this._state.accept) {
      input.accept = this._state.accept;
    }
    if (this._state.multiple && this._state.listType !== "picture") {
      input.multiple = true;
    }
    if (this._state.disabled) {
      input.disabled = true;
    }
    fragment.appendChild(input);

    // 提示区域(trigger 下方, 文件列表上方)
    const tip = $$("div", {
      class: "l-upload-tip",
      part: "tip",
      innerHTML: '<slot name="tip"></slot>',
    });
    fragment.appendChild(tip);

    // 文件列表
    const list = this._buildFileList();
    if (list) {
      if (this._state.listType === "picture-card") items.insertBefore(list, trigger);
      else fragment.appendChild(list);
    }
    return fragment;
  }

  private _resetClass() {
    if (this.$trigger) {
      const card = this._state.listType === "picture-card";
      if (this.$trigger.parentElement) {
        this.$trigger.parentElement.className = card
          ? "l-upload-items l-upload-items--picture-card"
          : "l-upload-items";
      }
      this.$trigger.style.display =
        card && this._state.maxCount > 0 && this._state.fileList.length >= this._state.maxCount
          ? "none"
          : "";
      this.$trigger.setAttribute("role", "button");
      this.$trigger.tabIndex = this._state.disabled ? -1 : 0;
      this.$trigger.setAttribute("aria-label", "选择文件");
      this.$trigger.setAttribute("aria-disabled", String(this._state.disabled));
      this.$trigger.className = formatClass([
        "l-upload-trigger",
        `l-upload-trigger--${this._state.listType}`,
        this._state.drag ? "l-upload-trigger--drag" : "",
        this._state.disabled ? "l-upload-trigger--disabled" : "",
        this._state.listType === "picture" && this._state.fileList[0]?.status === "fail"
          ? "l-upload-trigger--fail"
          : "",
      ]);
    }
  }

  private _updateImage(image: HTMLImageElement, file: UploadFile) {
    const url = this._getFilePreviewUrl(file);
    if (image.getAttribute("src") !== url) {
      if (url) image.src = url;
      else image.removeAttribute("src");
    }
    if (image.alt !== (file.name ?? "")) image.alt = file.name ?? "";
  }

  private _renderTriggerPreview() {
    if (!this.$trigger) return;
    this._resetClass();
    const file = this._state.listType === "picture" ? this._state.fileList[0] : undefined;
    if (file && this._triggerFile?.id === file.id && this._triggerFile.raw !== file.raw)
      this._revokeObjectUrl(file);
    this._triggerFile = file ? { id: file.id, raw: file.raw } : undefined;
    const slot = $one("slot", this.$trigger);
    let image = $one(".l-upload-trigger-image", this.$trigger) as HTMLImageElement | null;
    const status = $one(".l-upload-trigger-status", this.$trigger);
    if (slot) slot.hidden = !!file;
    if (!file) {
      image?.remove();
      status?.remove();
      return;
    }
    if (file.status === "fail") {
      image?.remove();
      if (!status || !$one("l-picture-icon", status)) {
        status?.remove();
        const failure = $$("div", {
          class: "l-upload-trigger-status",
          role: "status",
          "aria-live": "polite",
          "aria-label": "上传失败",
        });
        failure.appendChild($$("l-picture-icon", { "aria-hidden": "true" }));
        this.$trigger.appendChild(failure);
      }
      return;
    }
    if (!image) {
      image = $$("img", { class: "l-upload-trigger-image", part: "image" }) as HTMLImageElement;
      this.$trigger.appendChild(image);
    }
    this._updateImage(image, file);
    this._appendPictureProgress(this.$trigger, file);
  }

  private _appendPictureProgress(container: HTMLElement, file: UploadFile) {
    let status = $one(".l-upload-trigger-status", container);
    if (file.status !== "uploading") {
      status?.remove();
      return;
    }
    if (status && !$one(".l-upload-progress-text", status)) {
      status.remove();
      status = null;
    }
    if (!status) {
      status = $$("div", {
        class: "l-upload-trigger-status",
        role: "status",
        "aria-live": "polite",
      });
      status.appendChild($$("span", { class: "l-upload-progress-text" }));
      status.appendChild(this._createProgressBar(file, "l-upload-trigger-progress"));
      container.appendChild(status);
    }
    const text = $one(".l-upload-progress-text", status)!;
    const label =
      this._requests.get(file.id)?.phase === "parse"
        ? "处理中"
        : file.percentage === undefined
          ? "上传中"
          : `${file.percentage}%`;
    if (text.textContent !== label) text.textContent = label;
    this._updateProgressBar(
      $one(".l-upload-trigger-progress", status) as HTMLElement,
      file,
      "l-upload-trigger-progress",
    );
  }

  private _handleTriggerKeydown = (event: Event) => {
    if (event.target !== this.$trigger || !["Enter", " "].includes((event as KeyboardEvent).key))
      return;
    event.preventDefault();
    this._handleClick();
  };

  private _handleClick = () => {
    if (this._state.disabled || !this.$input) return;
    if (
      this._state.listType === "picture-card" &&
      this._state.maxCount > 0 &&
      this._state.fileList.length >= this._state.maxCount
    )
      return;
    this.$input.click();
  };

  private _handleInputChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    const files = input.files;
    if (!files || files.length === 0) return;
    this._handleFiles(files);
    // 清空 input，允许重复选择同一文件
    input.value = "";
  };

  private _acceptsFile(file: File): boolean {
    const rules = this._state.accept
      .split(",")
      .map((rule) => rule.trim().toLowerCase())
      .filter(
        (rule) =>
          /^\.[^\s,/.]+(?:\.[^\s,/.]+)*$/.test(rule) ||
          /^[a-z0-9!#$&^_.+-]+\/(?:[a-z0-9!#$&^_.+-]+|\*)$/.test(rule),
      );
    if (!rules.length) return true;
    const name = file.name.toLowerCase();
    const mime = file.type.toLowerCase();
    return rules.some((rule) =>
      rule.startsWith(".")
        ? name.endsWith(rule)
        : rule.endsWith("/*")
          ? mime.startsWith(rule.slice(0, -1))
          : mime === rule,
    );
  }

  private _handleFiles(files: FileList | File[]) {
    if (this._state.disabled) return;
    const fileArray = Array.from(files);
    const isPicture = this._state.listType === "picture";
    let processedFiles = isPicture ? fileArray.slice(0, 1) : fileArray;

    const invalidTypes = processedFiles.filter((file) => !this._acceptsFile(file));
    if (invalidTypes.length) {
      processedFiles = processedFiles.filter((file) => this._acceptsFile(file));
      this.emit("error", { detail: { files: invalidTypes, message: "文件类型不符合要求" } });
    }

    // 检查文件大小限制
    if (this._state.maxSize > 0) {
      const validFiles: File[] = [];
      const invalidFiles: File[] = [];
      for (const file of processedFiles) {
        if (file.size > this._state.maxSize * 1024) {
          invalidFiles.push(file);
        } else {
          validFiles.push(file);
        }
      }
      if (invalidFiles.length > 0) {
        this.emit("error", { detail: { files: invalidFiles, message: "文件大小超出限制" } });
      }
      processedFiles = validFiles;
    }

    if (processedFiles.length === 0) return;

    // 检查文件数量限制
    if (!isPicture && this._state.maxCount > 0) {
      const currentCount = this._state.fileList.length;
      const remaining = this._state.maxCount - currentCount;
      if (remaining <= 0) {
        this.emit("exceed", { detail: { files: processedFiles } });
        return;
      }
      if (processedFiles.length > remaining) {
        const overflowFiles = processedFiles.slice(remaining);
        processedFiles = processedFiles.slice(0, remaining);
        this.emit("exceed", { detail: { files: overflowFiles } });
      }
    }

    // 创建 UploadFile 对象
    const uploadFiles: UploadFile[] = processedFiles.map((file) => ({
      id: this._nextFileId(),
      name: file.name,
      size: file.size,
      status: "ready" as const,
      raw: file,
    }));

    // 图片模式替换当前图片，普通文件模式始终追加。
    if (isPicture) {
      for (const file of this._state.fileList) {
        this.abort(file);
        this._revokeObjectUrl(file);
      }
      this._state.fileList = uploadFiles;
    } else {
      this._state.fileList = [...this._state.fileList, ...uploadFiles];
    }
    this._renderFileList();
    this.emit("change", { detail: { fileList: this._state.fileList, addedFiles: uploadFiles } });

    // 自动上传
    if (this._state.autoUpload && (this._state.action || this._customRequest)) {
      this.upload(uploadFiles);
    }
  }

  private _buildFileList(): HTMLElement | null {
    if (!this._state.showFileList || this._state.listType === "picture") return null;
    const list = $$("div", {
      class:
        this._state.listType === "picture-card"
          ? "l-upload-list l-upload-list-picture-card"
          : "l-upload-list l-upload-list-text",
      part: "list",
    });
    for (const file of this._state.fileList) {
      list.appendChild(this._renderFileItem(file));
    }
    return list;
  }

  private _renderSnapshot(file: UploadFile): UploadRenderSnapshot {
    // 仅复制展示字段，避免调用方原地修改对象后丢失上一次渲染值。
    return {
      name: file.name,
      size: file.size,
      status: file.status,
      percentage: file.percentage,
      raw: file.raw,
      url: file.url,
      disabled: this._state.disabled,
      phase: this._requests.get(file.id)?.phase,
    };
  }

  private _renderFileList(): void {
    this._renderTriggerPreview();
    if (!this._state.showFileList || this._state.listType === "picture") {
      $one(".l-upload-list", this.root)?.remove();
      this._fileNodes.clear();
      this._listElement = undefined;
      this._listMode = undefined;
      return;
    }
    if (!this._listElement || this._listMode !== this._state.listType) {
      $one(".l-upload-list", this.root)?.remove();
      this._fileNodes.clear();
      this._listElement = $$("div", {
        class:
          this._state.listType === "picture-card"
            ? "l-upload-list l-upload-list-picture-card"
            : "l-upload-list l-upload-list-text",
        part: "list",
      });
      this._listMode = this._state.listType;
      if (this._state.listType === "picture-card" && this.$trigger?.parentElement) {
        this.$trigger.parentElement.insertBefore(this._listElement, this.$trigger);
      } else
        (($one(".l-upload", this.root) as HTMLElement) || this.root).appendChild(this._listElement);
    }
    const list = this._listElement;
    const ids = new Set(this._state.fileList.map((file) => file.id));
    for (const [id, node] of this._fileNodes) {
      if (!ids.has(id)) {
        node.element.remove();
        this._fileNodes.delete(id);
      }
    }
    this._state.fileList.forEach((file, index) => {
      let node = this._fileNodes.get(file.id);
      if (!node) {
        node = { element: this._renderFileItem(file), snapshot: this._renderSnapshot(file) };
        this._fileNodes.set(file.id, node);
      } else this._patchFileNode(file, node);
      const reference = list.children[index];
      if (reference !== node.element) list.insertBefore(node.element, reference ?? null);
    });
  }

  private _patchFileNode(file: UploadFile, node: UploadFileNode) {
    const previous = node.snapshot;
    const next = this._renderSnapshot(file);
    if (previous.raw !== next.raw) this._revokeObjectUrl(file);
    const stateChanged = previous.status !== next.status;
    const imageChanged =
      stateChanged ||
      previous.url !== next.url ||
      previous.raw !== next.raw ||
      previous.name !== next.name;
    const progressChanged =
      stateChanged || previous.percentage !== next.percentage || previous.phase !== next.phase;
    if (this._state.listType === "picture-card") {
      if (imageChanged) this._updateCardImage(node.element, file);
      if (stateChanged || previous.disabled !== next.disabled)
        this._updateCardActions(node.element, file);
      if (progressChanged) this._appendPictureProgress(node.element, file);
    } else {
      if (stateChanged)
        node.element.className = `l-upload-list-item l-upload-list-item--${file.status}`;
      if (previous.name !== next.name || previous.size !== next.size)
        this._updateFileInfo(node.element, file);
      if (progressChanged) this._updateTextProgress(node.element, file);
      if (previous.disabled !== next.disabled)
        ($one(".l-upload--close", node.element) as HTMLButtonElement).disabled = next.disabled;
    }
    node.snapshot = next;
  }

  private _updateFileInfo(item: HTMLElement, file: UploadFile) {
    const info = $one(".l-upload-list-item-info", item)!;
    let name = $one(".l-upload-list-item-name", info);
    if (!file.name) name?.remove();
    else {
      if (!name) {
        name = $$("span", { class: "l-upload-list-item-name" });
        info.insertBefore(name, info.firstChild);
      }
      if (name.textContent !== file.name) name.textContent = file.name;
    }
    let size = $one(".l-upload-list-item-size", info);
    if (file.size === undefined || file.size <= 0) size?.remove();
    else {
      if (!size) {
        size = $$("span", { class: "l-upload-list-item-size" });
        info.appendChild(size);
      }
      const label = this._formatFileSize(file.size);
      if (size.textContent !== label) size.textContent = label;
    }
  }

  private _updateTextProgress(item: HTMLElement, file: UploadFile) {
    let progress = $one(".l-upload-list-item-progress", item);
    if (file.status !== "uploading") {
      progress?.remove();
      return;
    }
    if (!progress) {
      progress = $$("div", { class: "l-upload-list-item-progress" });
      progress.appendChild(this._createProgressBar(file, "l-upload-list-item-progress-bar"));
      item.appendChild(progress);
    }
    this._updateProgressBar(
      $one(".l-upload-list-item-progress-bar", progress) as HTMLElement,
      file,
      "l-upload-list-item-progress-bar",
    );
  }

  private _renderFileItem(file: UploadFile): HTMLElement {
    if (this._state.listType === "picture-card") return this._renderPictureCard(file);
    const item = $$("div", {
      class: `l-upload-list-item l-upload-list-item--${file.status}`,
      "data-id": `${typeof file.id}:${encodeURIComponent(String(file.id))}`,
    });
    item.appendChild($$("div", { class: "l-upload-list-item-info" }));
    this._updateFileInfo(item, file);
    this._updateTextProgress(item, file);
    const id = file.id;
    const removeBtn = $$("button", {
      type: "button",
      innerHTML: "<l-close-icon></l-close-icon>",
      class: "l-upload--close",
      "aria-label": "Delete",
    });
    (removeBtn as HTMLButtonElement).disabled = this._state.disabled;
    on(removeBtn, "click", (event: Event) => {
      event?.stopPropagation();
      if (this._state.disabled) return;
      const current = this._state.fileList.find((entry) => entry.id === id);
      if (current) this.handleRemove(current);
    });
    item.appendChild(removeBtn);
    return item;
  }

  private _updateCardImage(item: HTMLElement, file: UploadFile) {
    let image = $one(".l-upload-trigger-image", item) as HTMLImageElement | null;
    let placeholder = $one(".l-upload-card-placeholder", item);
    const url = file.status === "fail" ? "" : this._getFilePreviewUrl(file);
    if (url) {
      placeholder?.remove();
      if (!image) {
        image = $$("img", { class: "l-upload-trigger-image", part: "image" }) as HTMLImageElement;
        item.insertBefore(image, item.firstChild);
      }
      this._updateImage(image, file);
    } else {
      image?.remove();
      if (!placeholder) {
        placeholder = $$("l-picture-icon", { class: "l-upload-card-placeholder" });
        item.insertBefore(placeholder, item.firstChild);
      }
      placeholder.className =
        file.status === "fail"
          ? "l-upload-card-placeholder l-upload-card-error"
          : "l-upload-card-placeholder";
      if (file.status === "fail") {
        placeholder.setAttribute("aria-label", "上传失败");
        placeholder.removeAttribute("aria-hidden");
      } else {
        placeholder.setAttribute("aria-hidden", "true");
        placeholder.removeAttribute("aria-label");
      }
    }
    item.className = file.status === "fail" ? "l-upload-card l-upload-card--fail" : "l-upload-card";
  }

  private _createCardAction(id: UploadFile["id"], action: "preview" | "delete") {
    const button = $$("button", {
      type: "button",
      class: `l-upload-card-action l-upload-card-${action}`,
      "aria-label": action === "preview" ? "预览图片" : "删除图片",
    });
    button.appendChild(
      $$(action === "preview" ? "l-eye-outline-icon" : "l-delete-icon", { "aria-hidden": "true" }),
    );
    on(button, "click", (event: Event) => {
      event.stopPropagation();
      const current = this._state.fileList.find((entry) => entry.id === id);
      if (!this._state.disabled && current) {
        if (action === "preview") this.handlePreview(current);
        else this.handleRemove(current);
      }
    });
    return button as HTMLButtonElement;
  }

  private _updateCardActions(item: HTMLElement, file: UploadFile) {
    let actions = $one(".l-upload-card-actions", item);
    if (file.status === "uploading") {
      actions?.remove();
      return;
    }
    if (!actions) {
      actions = $$("div", { class: "l-upload-card-actions", part: "actions" });
      item.appendChild(actions);
    }
    let preview = $one(".l-upload-card-preview", actions) as HTMLButtonElement | null;
    if (file.status === "success") {
      if (!preview) {
        preview = this._createCardAction(file.id, "preview");
        actions.insertBefore(preview, actions.firstChild);
      }
      preview.disabled = this._state.disabled;
    } else preview?.remove();
    let remove = $one(".l-upload-card-delete", actions) as HTMLButtonElement | null;
    if (!remove) {
      remove = this._createCardAction(file.id, "delete");
      actions.appendChild(remove);
    }
    remove.disabled = this._state.disabled;
  }

  private _renderPictureCard(file: UploadFile): HTMLElement {
    const item = $$("div", {
      class: "l-upload-card",
      "data-id": `${typeof file.id}:${encodeURIComponent(String(file.id))}`,
      part: "card",
    });
    this._updateCardImage(item, file);
    this._appendPictureProgress(item, file);
    this._updateCardActions(item, file);
    return item;
  }

  private _syncPreview(files: UploadFile[]) {
    if (!this._preview) return;
    const nextFiles = new Map(files.map((file) => [file.id, file]));
    const valid = this._previewFiles.every((previous) => {
      const next = nextFiles.get(previous.id);
      if (next?.status !== "success") return false;
      let remoteUrl: string | undefined;
      try {
        remoteUrl = this._safePreviewUrl(next.url);
      } catch {
        // 与缩略图一致：无效远程地址允许回退到组件创建的本地预览。
      }
      if (remoteUrl) return remoteUrl === previous.url;
      return (
        !!next.raw && next.raw === previous.raw && this.$objectUrls.get(next.id) === previous.url
      );
    });
    if (!valid) this._closePreview();
  }

  private _closePreview = () => {
    const preview = this._preview;
    this._previewFiles = [];
    if (!preview) return;
    this._preview = undefined;
    off(preview, "closed", this._closePreview);
    preview.open = false;
    preview.afterClosed();
    preview.remove();
  };

  private _getFilePreviewUrl(file: UploadFile): string {
    let remoteUrl: string | undefined;
    try {
      remoteUrl = this._safePreviewUrl(file.url);
    } catch {
      /* 不渲染无效的外部预置地址。 */
    }
    // 上传成功后使用服务端地址；选择和上传期间使用本地预览。
    if (file.status === "success" && remoteUrl) return remoteUrl;
    if (file.raw) {
      // 缓存 objectURL，避免重复创建; 移除文件时统一 revoke
      let url = this.$objectUrls.get(file.id);
      if (!url) {
        url = URL.createObjectURL(file.raw);
        this.$objectUrls.set(file.id, url);
      }
      return url;
    }
    return remoteUrl || "";
  }

  private _revokeObjectUrl(file: UploadFile) {
    const url = this.$objectUrls.get(file.id);
    if (url) {
      URL.revokeObjectURL(url);
      this.$objectUrls.delete(file.id);
    }
  }

  private _revokeAllObjectUrls() {
    for (const url of this.$objectUrls.values()) {
      URL.revokeObjectURL(url);
    }
    this.$objectUrls.clear();
  }

  private _formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.max(0, Math.min(sizes.length - 1, Math.floor(Math.log(bytes) / Math.log(k))));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  // 拖拽事件
  private _setDragListeners(bind: boolean) {
    if (bind && !this._dragBound) {
      on(this, "dragenter", this._onDragEnter);
      on(this, "dragover", this._onDragOver);
      on(this, "dragleave", this._onDragLeave);
      on(this, "drop", this._onDrop);
      this._dragBound = true;
    } else if (!bind && this._dragBound) {
      off(this, "dragenter", this._onDragEnter);
      off(this, "dragover", this._onDragOver);
      off(this, "dragleave", this._onDragLeave);
      off(this, "drop", this._onDrop);
      this._dragBound = false;
    }
  }

  private _onDragEnter = (e: Event) => {
    e.preventDefault();
    if (this._state.disabled) return;
    addClass(this, "l-upload-dragover");
  };

  private _onDragOver = (e: Event) => {
    e.preventDefault();
    if (this._state.disabled) return;
    addClass(this, "l-upload-dragover");
  };

  private _onDragLeave = (e: Event) => {
    e.preventDefault();
    removeClass(this, "l-upload-dragover");
  };

  private _onDrop = (e: Event) => {
    e.preventDefault();
    removeClass(this, "l-upload-dragover");
    if (this._state.disabled) return;
    const files = (e as DragEvent).dataTransfer?.files;
    if (files && files.length > 0) {
      this._handleFiles(files);
    }
  };

  // 公共方法
  public handlePreview(file: UploadFile) {
    const current = this._state.fileList.find((entry) => entry.id === file.id);
    if (!current || current.status !== "success" || this._state.disabled) return;
    if (this._state.listType === "picture-card") {
      const images = this._state.fileList
        .filter((entry) => entry.status === "success")
        .map((entry) => ({ id: entry.id, raw: entry.raw, url: this._getFilePreviewUrl(entry) }))
        .filter((entry) => !!entry.url);
      const index = images.findIndex((entry) => entry.id === current.id);
      if (index >= 0) {
        this._closePreview();
        const preview = document.createElement("l-image-preview") as ImagePreview;
        preview.setImages(images.map((entry) => entry.url));
        preview.setCurrentIndex(index);
        preview.open = true;
        this._preview = preview;
        this._previewFiles = images;
        on(preview, "closed", this._closePreview);
        document.body.appendChild(preview);
      }
    }
    this.emit("preview", { detail: { file: current } });
  }

  public handleRemove(file: UploadFile) {
    const index = this._state.fileList.findIndex((f) => f.id === file.id);
    if (index > -1) {
      const current = this._state.fileList[index];
      this._syncPreview(this._state.fileList.filter((entry) => entry.id !== current.id));
      // 按当前文件 ID 取消上传或解析，不依赖调用方快照中的状态。
      this._disposeRequest(current.id);
      this._state.fileList.splice(index, 1);
      this._revokeObjectUrl(current);
      this._renderFileList();
      this.emit("remove", { detail: { file: current, fileList: this._state.fileList } });
      this.emit("change", { detail: { fileList: this._state.fileList } });
    }
  }

  public upload(files?: UploadFile[]) {
    const targetFiles = files || this._state.fileList.filter((f) => f.status === "ready");
    if ((!this._state.action && !this._customRequest) || targetFiles.length === 0) return;

    for (const target of targetFiles) {
      const file = this._state.fileList.find((current) => current.id === target.id);
      if (file) this._uploadFile(file);
    }
  }

  private _safePreviewUrl(value: unknown): string | undefined {
    if (value == null || value === "") return undefined;
    if (typeof value !== "string") throw new TypeError("响应解析结果必须是图片地址字符串");
    const url = new URL(value, document.baseURI);
    if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) {
      throw new TypeError("图片地址仅允许不含用户名和密码的 HTTP(S) URL");
    }
    return url.href;
  }

  private _currentRequest(id: UploadFile["id"], token: symbol) {
    const request = this._requests.get(id);
    if (request?.token !== token) return undefined;
    if (this._destroyed || !this._state.fileList.includes(request.file)) {
      this._disposeRequest(id);
      return undefined;
    }
    return request;
  }

  private _clearRequestTimeout(request: UploadRequest) {
    if (request.timer !== undefined) clearTimeout(request.timer);
    request.timer = undefined;
  }

  private _startRequestTimeout(id: UploadFile["id"], token: symbol) {
    const request = this._currentRequest(id, token);
    if (!request || !this._state.timeout) return;
    const owner = new WeakRef(this);
    const timer = setTimeout(() => {
      const component = owner.deref();
      const current = component?._currentRequest(id, token);
      if (current?.phase === "upload" && current.timer === timer) {
        component!._failUpload(id, token, "upload", new Error("上传超时"));
      }
    }, this._state.timeout);
    request.timer = timer;
  }

  private _disposeRequest(id: UploadFile["id"]) {
    const request = this._requests.get(id);
    this._requests.delete(id);
    if (request) this._clearRequestTimeout(request);
    request?.controller.abort();
    return !!request;
  }

  private _failUpload(
    id: UploadFile["id"],
    token: symbol,
    phase: "upload" | "parse",
    error?: unknown,
  ) {
    const request = this._currentRequest(id, token);
    if (!request) return;
    const { file, status } = request;
    this._disposeRequest(id);
    if (this._destroyed || !this._state.fileList.includes(file)) return;
    file.status = "fail";
    this._syncPreview(this._state.fileList);
    this._renderFileList();
    this.emit("error", {
      detail: {
        file,
        status,
        phase,
        message: error instanceof Error ? error.message : "上传或响应解析失败",
      },
    });
    this.emit("change", { detail: { fileList: this._state.fileList } });
  }

  private _finishResponse(id: UploadFile["id"], token: symbol, result: unknown) {
    const request = this._currentRequest(id, token);
    if (!request) return;
    try {
      const url = this._safePreviewUrl(result);
      const { file, responseText, response } = request;
      this._disposeRequest(id);
      if (this._destroyed || !this._state.fileList.includes(file)) return;
      // undefined / null / 空字符串表示不提供远程地址，继续使用本地预览。
      file.url = url;
      file.status = "success";
      file.percentage = 100;
      this._renderFileList();
      if (url) this._revokeObjectUrl(file);
      this.emit("success", { detail: { file, response: responseText, data: response } });
      this.emit("change", { detail: { fileList: this._state.fileList } });
    } catch (error) {
      this._failUpload(id, token, "parse", error);
    }
  }

  // 未完成的第三方 Promise 仅持有组件的弱引用，取消后不再回写状态。
  private static _watchResponse(
    result: Promise<string | null | undefined>,
    owner: WeakRef<Upload>,
    id: UploadFile["id"],
    token: symbol,
  ) {
    Promise.resolve(result).then(
      (url) => owner.deref()?._finishResponse(id, token, url),
      (error) => owner.deref()?._failUpload(id, token, "parse", error),
    );
  }

  private static _watchUpload(
    result: Promise<UploadRequestResult>,
    owner: WeakRef<Upload>,
    id: UploadFile["id"],
    token: symbol,
  ) {
    Promise.resolve(result).then(
      (response) => owner.deref()?._receiveUploadResult(id, token, response),
      (error) => owner.deref()?._failUpload(id, token, "upload", error),
    );
  }

  private static _progressReporter(owner: WeakRef<Upload>, id: UploadFile["id"], token: symbol) {
    return (percent: number) => owner.deref()?._reportProgress(id, token, percent);
  }

  private _reportProgress(id: UploadFile["id"], token: symbol, percent: number) {
    const request = this._currentRequest(id, token);
    if (!request || request.phase !== "upload" || !Number.isFinite(percent)) return;
    request.file.percentage = Math.max(0, Math.min(100, percent));
    this._updateFileProgress(request.file);
    this.emit("progress", { detail: { file: request.file, percent: request.file.percentage } });
  }

  private _receiveUploadResult(id: UploadFile["id"], token: symbol, result: UploadRequestResult) {
    const request = this._currentRequest(id, token);
    if (!request) return;
    this._clearRequestTimeout(request);
    try {
      if (!result || typeof result !== "object" || !Object.hasOwn(result, "response")) {
        throw new TypeError("customRequest 必须返回包含 response 的对象");
      }
      const status = result.status ?? 200;
      if (
        !Number.isInteger(status) ||
        status < 0 ||
        status > 599 ||
        (result.responseText !== undefined && typeof result.responseText !== "string")
      ) {
        throw new TypeError("上传结果 status 或 responseText 无效");
      }
      request.status = status;
      request.response = result.response;
      request.responseText = result.responseText ?? "";
      if (status < 200 || status >= 300) {
        this._failUpload(id, token, "upload");
        return;
      }
    } catch (error) {
      this._failUpload(id, token, "upload", error);
      return;
    }
    request.phase = "parse";
    this._renderFileList();
    try {
      const { file, controller, response, responseText, status } = request;
      // 默认解析和自定义解析走同一个入口。
      const result = this.parseResponse(
        response,
        Object.freeze({
          file: Object.freeze({ id: file.id, name: file.name, size: file.size }),
          responseText,
          status,
          signal: controller.signal,
        }),
      );
      if (result && typeof result === "object" && typeof result.then === "function") {
        Upload._watchResponse(result, new WeakRef(this), id, token);
      } else {
        this._finishResponse(id, token, result);
      }
    } catch (error) {
      this._failUpload(id, token, "parse", error);
    }
  }

  private _uploadFile(file: UploadFile) {
    if (!file.raw || this._destroyed || !this._state.fileList.includes(file)) return;
    this._disposeRequest(file.id);
    const token = Symbol();
    const controller = new AbortController();
    this._requests.set(file.id, {
      token,
      file,
      controller,
      phase: "upload",
      response: undefined,
      responseText: "",
      status: 0,
    });
    file.status = "uploading";
    this._syncPreview(this._state.fileList);
    file.percentage = undefined;
    this._renderFileList();
    try {
      const body = new FormData();
      body.append("file", file.raw, file.name ?? file.raw.name);
      const data = this._validateRecord(this._state.data, "data");
      const headers = this._validateRecord(this._state.headers, "headers") as Record<
        string,
        string
      >;
      Object.keys(data).forEach((key) => body.append(key, String(data[key])));
      const options: UploadRequestOptions = Object.freeze({
        file: Object.freeze({ id: file.id, name: file.name, size: file.size, raw: file.raw }),
        action: this._state.action,
        body,
        headers: Object.freeze(headers),
        signal: controller.signal,
        onProgress: Upload._progressReporter(new WeakRef(this), file.id, token),
      });
      this._startRequestTimeout(file.id, token);
      const result = this._customRequest
        ? this._customRequest(options)
        : defaultUploadRequest(options, this._state.withCredentials, this._state.timeout);
      if (
        result &&
        typeof result === "object" &&
        "then" in result &&
        typeof result.then === "function"
      ) {
        Upload._watchUpload(result, new WeakRef(this), file.id, token);
      } else {
        this._receiveUploadResult(file.id, token, result as UploadRequestResult);
      }
    } catch (error) {
      this._failUpload(file.id, token, "upload", error);
    }
  }

  private _nextFileId() {
    do {
      fileId = fileId >= Number.MAX_SAFE_INTEGER ? 1 : fileId + 1;
    } while (this._state.fileList.some((file) => file.id === fileId));
    return fileId;
  }

  private _isIndeterminate(file: UploadFile) {
    return file.percentage === undefined || this._requests.get(file.id)?.phase === "parse";
  }

  private _updateProgressBar(bar: HTMLElement, file: UploadFile, className: string) {
    const indeterminate = this._isIndeterminate(file);
    const classes = formatClass([
      className,
      indeterminate ? "l-upload-progress--indeterminate" : "",
    ]);
    if (bar.className !== classes) bar.className = classes;
    const width = indeterminate ? "35%" : `${Math.max(0, Math.min(100, file.percentage!))}%`;
    if (bar.style.width !== width) bar.style.width = width;
  }

  private _createProgressBar(file: UploadFile, className: string) {
    const bar = $$("div");
    this._updateProgressBar(bar, file, className);
    return bar;
  }

  private _updateFileProgress(file: UploadFile) {
    if (this._state.listType === "picture") {
      if (this.$trigger) this._appendPictureProgress(this.$trigger, file);
      return;
    }
    const cached = this._fileNodes.get(file.id);
    if (cached) {
      this._patchFileNode(file, cached);
      return;
    }
    const key = `${typeof file.id}:${encodeURIComponent(String(file.id))}`;
    const item = $one(`[data-id="${key}"]`, this.root) as HTMLElement | null;
    if (item) {
      if (this._state.listType === "picture-card") this._appendPictureProgress(item, file);
      else this._updateTextProgress(item, file);
    }
  }

  public clearFiles() {
    this._closePreview();
    this.abort();
    for (const file of this._state.fileList) {
      this._revokeObjectUrl(file);
    }
    this._state.fileList = [];
    this._renderFileList();
    this.emit("change", { detail: { fileList: [] } });
  }

  /**
   * 中止上传
   * @param file 要中止的文件, 不传则中止所有上传中的文件
   */
  public abort(file?: UploadFile) {
    const targetFiles = file
      ? [file]
      : this._state.fileList.filter((f) => f.status === "uploading");
    const abortedFiles: UploadFile[] = [];
    for (const f of targetFiles) {
      if (this._disposeRequest(f.id)) abortedFiles.push(f);
    }
    if (abortedFiles.length > 0) {
      for (const f of abortedFiles) {
        f.status = "ready";
        f.percentage = 0;
      }
      if (!this._destroyed) {
        this._renderFileList();
        this.emit("change", { detail: { fileList: this._state.fileList } });
      }
    }
  }
}