/** 事件处理函数 */
type ClickHandler = (e: Event) => void;

/** 事件处理项 */
type HandlerItem = {
  el: HTMLElement;
  handler: ClickHandler;
};

/** 列表保存所有添加了指令的节点处理 */
const nodeList = new Map<HTMLElement, HandlerItem[]>();

function documentClick(e: Event) {
  // 遍历依次处理事件
  for (const handlers of nodeList.values()) {
    for (const handler of handlers) {
      outsideHandler(e, handler);
    }
  }
}

function outsideHandler(e: Event, handler: HandlerItem) {
  const target = e.target as HTMLElement;
  // 验证节点是否存在
  const isTargetExists = !target;
  // 节点是否被绑定节点所包含
  const isContainedByEl = handler.el.contains(target);
  // 点击的是否就是绑定指令的节点
  const isSelf = handler.el === target;
  if (isTargetExists || isContainedByEl || isSelf) {
    return;
  }
  handler.handler(e);
}

export function set(el: HTMLElement, handler: ClickHandler) {
  if (!nodeList.has(el)) {
    nodeList.set(el, []);
  }
  const handlers = nodeList.get(el);
  if (handlers) {
    handlers.push({ el, handler });
  }
  if (nodeList.size === 1) {
    document.addEventListener("click", documentClick, true);
  }
}

export function remove(el: HTMLElement) {
  nodeList.delete(el);
  if (nodeList.size === 0) {
    document.removeEventListener("click", documentClick, true);
  }
}
