import { kebabToCamel, parseAttrValue } from "../utils";
import BaseComponent from "../base";
import { formatClass, addClass, removeClass, on, off, $one, $$ } from "ph-utils/browser";
import animationSheet from "../styles/animation";
import uploadSheet from "./style";

export type UploadFile = {
  id: number;
  name: string;
  size: number;
  status: "ready" | "uploading" | "success" | "fail";
  percentage?: number;
  raw?: File;
  url?: string;
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
  /** 进行中的 XHR 请求, id => xhr */
  $xhrs = new Map<number, XMLHttpRequest>();
  /** 本地预览地址缓存, id => objectURL */
  $objectUrls = new Map<number, string>();
  /** 拖拽事件是否已绑定 */
  private _dragBound = false;

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
    this._state.fileList = files;
    if (this.rendered) {
      this._renderFileList();
    }
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
      if (value) {
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
        this._state[kebabToCamel(name) as "multiple"] = parseAttrValue(newValue, false, name);
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
      if (changedProps.has("multiple")) {
        if (this._state.multiple) {
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
    this.$input = $one(".l-upload-input", this.root) as HTMLInputElement;
    this.$trigger = $one(".l-upload-trigger", this.root) as HTMLElement;
    if (this.$input) {
      on(this.$input, "change", this._handleInputChange);
    }
    if (this.$trigger) {
      on(this.$trigger, "click", this._handleClick);
    }
    // 渲染后挂载已有文件列表
    if (this._state.showFileList && this._state.fileList.length > 0) {
      this._renderFileList();
    }
  }

  beforeDestroy(): void {
    if (this.$input) {
      off(this.$input, "change", this._handleInputChange);
    }
    if (this.$trigger) {
      off(this.$trigger, "click", this._handleClick);
    }
    // 中止所有进行中的上传
    this.abort();
    this.$xhrs.clear();
    this._revokeAllObjectUrls();
    this.$trigger = undefined;
    this.$input = undefined;
  }

  public render() {
    const isPicture = this._state.listType === "picture";
    const fragment = document.createDocumentFragment();

    // 容器
    const container = $$("div", {
      class: formatClass([
        "l-upload",
        isPicture ? "l-upload-picture" : "",
        this._state.drag ? "l-upload-drag" : "",
        this._state.disabled ? "l-upload-disabled" : "",
      ]),
      part: "default",
    });

    // 触发区域
    const trigger = $$("div", {
      class: ["l-upload-trigger"],
      part: "trigger",
    });
    trigger.innerHTML = "<slot></slot>";
    container.appendChild(trigger);

    // 隐藏的 file input
    const input = $$("input", {
      type: "file",
      class: "l-upload-input",
    }) as HTMLInputElement;
    if (this._state.accept) {
      input.accept = this._state.accept;
    }
    if (this._state.multiple) {
      input.multiple = true;
    }
    if (this._state.disabled) {
      input.disabled = true;
    }
    container.appendChild(input);

    // 文件列表
    const list = this._buildFileList();
    if (list) {
      container.appendChild(list);
    }

    fragment.appendChild(container);
    return fragment;
  }

  private _resetClass() {
    const container = this.root.firstElementChild;
    if (container) {
      container.className = formatClass([
        "l-upload",
        this._state.listType === "picture" ? "l-upload-picture" : "",
        this._state.drag ? "l-upload-drag" : "",
        this._state.disabled ? "l-upload-disabled" : "",
      ]);
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
    const fileArray = Array.from(files);
    let processedFiles = fileArray;

    // 检查文件数量限制
    if (this._state.maxCount > 0) {
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
      id: ++fileId,
      name: file.name,
      size: file.size,
      status: "ready" as const,
      raw: file,
    }));

    // 如果是单文件模式，清空之前的文件
    if (!this._state.multiple) {
      this._state.fileList = [];
    }

    this._state.fileList = [...this._state.fileList, ...uploadFiles];
    this._renderFileList();
    this.emit("change", { detail: { fileList: this._state.fileList, addedFiles: uploadFiles } });

    // 自动上传
    if (this._state.autoUpload && this._state.action) {
      this.upload(uploadFiles);
    }
  }

  private _buildFileList(): HTMLElement | null {
    if (!this._state.showFileList) return null;
    const isPicture = this._state.listType === "picture";
    const list = $$("div", {
      class: formatClass([
        "l-upload-list",
        isPicture ? "l-upload-list-picture" : "l-upload-list-text",
      ]),
      part: "list",
    });
    for (const file of this._state.fileList) {
      list.appendChild(this._renderFileItem(file));
    }
    return list;
  }

  private _renderFileList(): void {
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
      "data-id": file.id,
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
      img.alt = file.name;
      imgContainer.appendChild(img);
      item.appendChild(imgContainer);
    }

    // 文件信息
    const info = $$("div", {
      class: "l-upload-list-item-info",
    });
    const name = $$("span", {
      class: "l-upload-list-item-name",
      textContent: file.name,
    });
    info.appendChild(name);
    const size = $$("span", {
      class: "l-upload-list-item-size",
      textContent: this._formatFileSize(file.size),
    });
    info.appendChild(size);
    item.appendChild(info);

    // 进度条
    if (file.status === "uploading") {
      const progress = $$("div", {
        class: "l-upload-list-item-progress",
      });
      const progressBar = $$("div", {
        class: "l-upload-list-item-progress-bar",
      });
      progressBar.style.width = `${file.percentage || 0}%`;
      progress.appendChild(progressBar);
      item.appendChild(progress);
    }

    // 操作按钮
    const actions = $$("div", {
      class: "l-upload-list-item-actions",
    });

    // 预览按钮
    if (file.status === "success" && isPicture) {
      const previewBtn = $$("button", {
        class: "l-upload-list-item-action",
        type: "button",
        innerHTML: "<l-search-icon></l-search-icon>",
        "aria-label": "预览",
      });
      on(previewBtn, "click", () => this.handlePreview(file));
      actions.appendChild(previewBtn);
    }

    // 删除按钮
    const removeBtn = $$("button", {
      class: "l-upload-list-item-action",
      type: "button",
      innerHTML: "<l-close-icon></l-close-icon>",
      "aria-label": "删除",
    });
    on(removeBtn, "click", () => this.handleRemove(file));
    actions.appendChild(removeBtn);

    item.appendChild(actions);

    return item;
  }

  private _getFilePreviewUrl(file: UploadFile): string {
    // 优先使用本地文件预览(上传成功后 file.url 可能是网页地址而非图片直链)
    if (file.raw) {
      // 缓存 objectURL，避免重复创建; 移除文件时统一 revoke
      let url = this.$objectUrls.get(file.id);
      if (!url) {
        url = URL.createObjectURL(file.raw);
        this.$objectUrls.set(file.id, url);
      }
      return url;
    }
    if (file.url) return file.url;
    return "";
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
    if (!this._state.action || targetFiles.length === 0) return;

    for (const file of targetFiles) {
      this._uploadFile(file);
    }
  }

  private _uploadFile(file: UploadFile) {
    if (!file.raw) return;

    file.status = "uploading";
    file.percentage = 0;
    this._renderFileList();

    const xhr = new XMLHttpRequest();
    this.$xhrs.set(file.id, xhr);
    xhr.addEventListener("loadend", () => {
      this.$xhrs.delete(file.id);
    });

    const formData = new FormData();
    formData.append("file", file.raw, file.name);

    // 添加额外数据
    Object.keys(this._state.data).forEach((key) => {
      formData.append(key, this._state.data[key]);
    });

    xhr.upload.addEventListener("progress", (e) => {
      if (e.lengthComputable) {
        file.percentage = Math.round((e.loaded / e.total) * 100);
        this._updateFileProgress(file);
        this.emit("progress", { detail: { file, percent: file.percentage } });
      }
    });

    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        file.status = "success";
        try {
          const response = JSON.parse(xhr.responseText);
          file.url = response.url || response.data?.url || response.link;
        } catch {
          // 非 JSON 响应
        }
        this._renderFileList();
        this.emit("success", { detail: { file, response: xhr.responseText } });
      } else {
        file.status = "fail";
        this._renderFileList();
        this.emit("error", { detail: { file, status: xhr.status } });
      }
      this.emit("change", { detail: { fileList: this._state.fileList } });
    });

    xhr.addEventListener("error", () => {
      file.status = "fail";
      this._renderFileList();
      this.emit("error", { detail: { file } });
      this.emit("change", { detail: { fileList: this._state.fileList } });
    });

    xhr.addEventListener("abort", () => {
      file.percentage = 0;
      this._renderFileList();
    });

    xhr.open("POST", this._state.action);
    xhr.withCredentials = this._state.withCredentials;

    // 设置请求头
    Object.keys(this._state.headers).forEach((key) => {
      xhr.setRequestHeader(key, this._state.headers[key]);
    });

    xhr.send(formData);
  }

  private _updateFileProgress(file: UploadFile) {
    const item = $one(`[data-id="${file.id}"]`, this.root);
    if (item) {
      const progressBar = $one(".l-upload-list-item-progress-bar", item) as HTMLElement;
      if (progressBar) {
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
    const targetFiles = file ? [file] : this._state.fileList.filter((f) => f.status === "uploading");
    const abortedFiles: UploadFile[] = [];
    for (const f of targetFiles) {
      const xhr = this.$xhrs.get(f.id);
      if (xhr) {
        xhr.abort();
        this.$xhrs.delete(f.id);
        abortedFiles.push(f);
      }
    }
    if (abortedFiles.length > 0) {
      for (const f of abortedFiles) {
        f.status = "ready";
        f.percentage = 0;
      }
      this._renderFileList();
      this.emit("change", { detail: { fileList: this._state.fileList } });
    }
  }
}
