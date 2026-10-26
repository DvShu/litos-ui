import { kebabToCamel, parseAttrValue } from "../utils";
import BaseComponent from "../base";
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
};

type UploadState = {
  accept: string;
  multiple: boolean;
  disabled: boolean;
  drag: boolean;
  listType: "text" | "picture";
  maxSize: number;
  maxCount: number;
  autoUpload: boolean;
  action: string;
  showFileList: boolean;
  fileList: UploadFile[];
  headers: Record<string, string>;
  data: Record<string, any>;
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
    this._state.disabled = value;
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
        (typeof file.id !== "string" && !Number.isSafeInteger(file.id)) ||
        ids.has(file.id) ||
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
      ids.add(file.id);
    }
    files = this._state.listType === "picture" ? files.slice(-1) : files.slice();
    for (const previous of this._state.fileList) {
      const next = files.find((file) => file.id === previous.id);
      const request = this._requests.get(previous.id);
      const sameRaw = next && next.raw === previous.raw;
      if (request && (!sameRaw || next.status !== "uploading")) {
        this._disposeRequest(previous.id);
      } else if (request && next) {
        // 允许外部通过不可变 fileList 快照更新同一上传任务。
        request.file = next;
      }
      if (!sameRaw || (next?.status === "success" && next.url)) this._revokeObjectUrl(previous);
    }
    this._state.fileList = files;
    if (this.rendered) this._renderFileList();
  }

  get headers() {
    return this._state.headers;
  }

  set headers(value: Record<string, string>) {
    this._state.headers = value || {};
  }

  get data() {
    return this._state.data;
  }

  set data(value: Record<string, any>) {
    this._state.data = value || {};
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
      case "list-type":
        this._state[kebabToCamel(name) as "listType"] = newValue as "text";
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
        this._state[kebabToCamel(name) as "maxSize"] = parseAttrValue(newValue, 0);
        break;
      case "headers":
      case "data":
        try {
          this._state[kebabToCamel(name) as "headers"] = JSON.parse(newValue) || {};
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
      this._resetClass();
      this._renderFileList();
    }
    if (changedProps.has("show-file-list")) {
      this._renderFileList();
    }
    if (changedProps.has("drag")) {
      this._setDragListeners(this._state.drag);
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
    this.$input = $one(".l-upload-input", this.root) as HTMLInputElement;
    this.$trigger = $one(".l-upload-trigger", this.root) as HTMLElement;
    if (this.$input) {
      on(this.$input, "change", this._handleInputChange);
    }
    if (this.$trigger) {
      on(this.$trigger, "click", this._handleClick);
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
    if (this.$input) {
      off(this.$input, "change", this._handleInputChange);
    }
    if (this.$trigger) {
      off(this.$trigger, "click", this._handleClick);
    }
    const tipSlot = $one("slot[name=tip]", this.root);
    if (tipSlot) off(tipSlot, "slotchange", this._handleTipSlotChange);
    // 中止所有进行中的上传
    this.abort();
    for (const id of this._requests.keys()) this._disposeRequest(id);
    this._revokeAllObjectUrls();
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
    fragment.appendChild(trigger);

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
      fragment.appendChild(list);
    }
    return fragment;
  }

  private _resetClass() {
    if (this.$trigger) {
      this.$trigger.className = formatClass([
        "l-upload-trigger",
        `l-upload-trigger--${this._state.listType}`,
        this._state.listType === "picture" && this._state.fileList[0]?.status === "fail"
          ? "l-upload-trigger--fail"
          : "",
      ]);
    }
  }

  private _renderTriggerPreview() {
    if (!this.$trigger) return;
    this._resetClass();
    const file = this._state.listType === "picture" ? this._state.fileList[0] : undefined;
    const slot = $one("slot", this.$trigger);
    let image = $one(".l-upload-trigger-image", this.$trigger) as HTMLImageElement | null;
    $one(".l-upload-trigger-status", this.$trigger)?.remove();
    if (slot) slot.hidden = !!file;
    if (!file) {
      image?.remove();
      return;
    }
    if (file.status === "fail") {
      image?.remove();
      const status = $$("div", {
        class: "l-upload-trigger-status",
        role: "status",
        "aria-live": "polite",
        "aria-label": "上传失败",
      });
      status.appendChild($$("l-picture-icon", { "aria-hidden": "true" }));
      this.$trigger.appendChild(status);
      return;
    }
    if (!image) {
      image = $$("img", { class: "l-upload-trigger-image", part: "image" }) as HTMLImageElement;
      this.$trigger.appendChild(image);
    }
    image.src = this._getFilePreviewUrl(file);
    image.alt = file.name ?? "";
    if (file.status === "uploading") {
      const status = $$("div", {
        class: "l-upload-trigger-status",
        role: "status",
        "aria-live": "polite",
      });
      const parsing = this._requests.get(file.id)?.phase === "parse";
      status.appendChild(
        $$("span", {
          textContent: parsing
            ? "处理中"
            : file.percentage === undefined
              ? "上传中"
              : `${file.percentage}%`,
        }),
      );
      const bar = this._createProgressBar(file, "l-upload-trigger-progress");
      status.appendChild(bar);
      this.$trigger.appendChild(status);
    }
  }

  private _handleClick = () => {
    if (this._state.disabled || !this.$input) return;
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

  private _handleFiles(files: FileList | File[]) {
    if (this._state.disabled) return;
    const fileArray = Array.from(files);
    const isPicture = this._state.listType === "picture";
    let processedFiles = isPicture ? fileArray.slice(0, 1) : fileArray;

    // 检查文件数量限制
    if (!isPicture && this._state.maxCount > 0) {
      const currentCount = this._state.fileList.length;
      const remaining = this._state.maxCount - currentCount;
      if (remaining <= 0) {
        this.emit("exceed", { detail: { files: processedFiles } });
        return;
      }
      if (processedFiles.length > remaining) {
        processedFiles = processedFiles.slice(0, remaining);
        this.emit("exceed", { detail: { files: fileArray.slice(remaining) } });
      }
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
      class: "l-upload-list l-upload-list-text",
      part: "list",
    });
    for (const file of this._state.fileList) {
      list.appendChild(this._renderFileItem(file));
    }
    return list;
  }

  private _renderFileList(): void {
    this._renderTriggerPreview();
    // 移除旧的文件列表
    const oldList = $one(".l-upload-list", this.root);
    if (oldList) {
      oldList.remove();
    }
    if (!this._state.showFileList) return;

    const list = this._buildFileList();
    if (!list) return;
    const container = ($one(".l-upload", this.root) as HTMLElement) || this.root;
    container.appendChild(list);
  }

  private _renderFileItem(file: UploadFile): HTMLElement {
    const isPicture = this._state.listType === "picture";
    const item = $$("div", {
      class: formatClass(["l-upload-list-item", `l-upload-list-item--${file.status}`]),
      "data-id": `${typeof file.id}:${encodeURIComponent(String(file.id))}`,
    });

    if (isPicture) {
      // 图片预览
      const imgContainer = $$("div", {
        class: "l-upload-list-item-thumbnail",
      });
      const img = document.createElement("img");
      const url = this._getFilePreviewUrl(file);
      if (url) {
        img.src = url;
      }
      img.alt = file.name ?? "";
      imgContainer.appendChild(img);
      item.appendChild(imgContainer);
    }

    // 文件信息
    const info = $$("div", {
      class: "l-upload-list-item-info",
    });
    if (file.name) {
      const name = $$("span", {
        class: "l-upload-list-item-name",
        textContent: file.name,
      });
      info.appendChild(name);
    }
    if (file.size !== undefined && file.size > 0) {
      const size = $$("span", {
        class: "l-upload-list-item-size",
        textContent: this._formatFileSize(file.size),
      });
      info.appendChild(size);
    }
    item.appendChild(info);

    // 进度条
    if (file.status === "uploading") {
      const progress = $$("div", {
        class: "l-upload-list-item-progress",
      });
      const progressBar = this._createProgressBar(file, "l-upload-list-item-progress-bar");
      progress.appendChild(progressBar);
      item.appendChild(progress);
    }

    // 预览按钮
    if (file.status === "success" && isPicture) {
      const previewBtn = $$("button", {
        class: "l-upload-list-item-action",
        type: "button",
        innerHTML: "<l-search-icon></l-search-icon>",
        "aria-label": "预览",
      });
      on(previewBtn, "click", () => this.handlePreview(file));
      item.appendChild(previewBtn);
    }

    // 删除按钮
    const removeBtn = $$("l-close-icon", {
      role: "button",
      innerHTML: "<l-close-icon></l-close-icon>",
      class: "l-upload--close",
      "aria-label": "Delete",
    });
    on(removeBtn, "click", () => this.handleRemove(file));
    item.appendChild(removeBtn);

    return item;
  }

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
    const i = Math.floor(Math.log(bytes) / Math.log(k));
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
    this.emit("preview", { detail: { file } });
  }

  public handleRemove(file: UploadFile) {
    const index = this._state.fileList.findIndex((f) => f.id === file.id);
    if (index > -1) {
      // 上传中则先中止
      if (file.status === "uploading") {
        this.abort(file);
      }
      this._state.fileList.splice(index, 1);
      this._revokeObjectUrl(file);
      this._renderFileList();
      this.emit("remove", { detail: { file, fileList: this._state.fileList } });
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

  private _disposeRequest(id: UploadFile["id"]) {
    const request = this._requests.get(id);
    this._requests.delete(id);
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
    file.percentage = undefined;
    this._renderFileList();
    try {
      const body = new FormData();
      body.append("file", file.raw, file.name ?? file.raw.name);
      Object.keys(this._state.data).forEach((key) => body.append(key, this._state.data[key]));
      const options: UploadRequestOptions = Object.freeze({
        file: Object.freeze({ id: file.id, name: file.name, size: file.size, raw: file.raw }),
        action: this._state.action,
        body,
        headers: Object.freeze({ ...this._state.headers }),
        signal: controller.signal,
        onProgress: Upload._progressReporter(new WeakRef(this), file.id, token),
      });
      const result = this._customRequest
        ? this._customRequest(options)
        : defaultUploadRequest(options, this._state.withCredentials);
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

  private _createProgressBar(file: UploadFile, className: string) {
    const indeterminate = this._isIndeterminate(file);
    const bar = $$("div", {
      class: formatClass([className, indeterminate ? "l-upload-progress--indeterminate" : ""]),
    });
    bar.style.width = indeterminate ? "35%" : `${Math.max(0, Math.min(100, file.percentage!))}%`;
    return bar;
  }

  private _updateFileProgress(file: UploadFile) {
    if (this._state.listType === "picture") {
      this._renderTriggerPreview();
      return;
    }
    const key = `${typeof file.id}:${encodeURIComponent(String(file.id))}`;
    const item = $one(`[data-id="${key}"]`, this.root);
    if (item) {
      const progressBar = $one(".l-upload-list-item-progress-bar", item) as HTMLElement;
      if (progressBar) {
        progressBar.className = "l-upload-list-item-progress-bar";
        progressBar.style.width = `${file.percentage || 0}%`;
      }
    }
  }

  public clearFiles() {
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