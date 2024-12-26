type EventValue = Map<string, Set<any>>;

let events: Map<string, EventValue> | undefined;

/**
 * 添加表单事件监听器。
 * @param formId - 表单的唯一标识符。
 * @param event - 要监听的事件类型
 * @param cb - 当事件触发时调用的回调函数，接收两个参数：属性名和属性值。
 * 该函数用于将回调函数添加到指定表单ID的事件监听器集合中。
 */
export function add(
  channel: string,
  event: string,
  cb: (...param: any) => void
) {
  if (events == null) {
    events = new Map();
  }
  if (!events.has(channel)) {
    events.set(channel, new Map([[event, new Set()]]));
  }
  if (!(events.get(channel) as EventValue).has(event)) {
    (events.get(channel) as EventValue).set(event, new Set());
  }
  ((events.get(channel) as EventValue).get(event) as Set<any>).add(cb);
}

/**
 * 移除指定表单的事件监听器。
 * @param formId - 表单的唯一标识符。
 * @param event - 要移除的事件类型，可以是 'attributeChanged' 或 'formSubmitted'。
 * @param cb - 要移除的事件回调函数，该函数接收两个参数：属性名和属性值。
 * 该函数会从事件存储中移除指定的回调函数，如果某个事件类型下没有更多的回调函数，则删除该事件类型；
 * 如果表单下没有更多的事件类型，则删除该表单；如果事件存储为空，则重置事件存储。
 */
export function remove(
  channel: string,
  event: string,
  cb: (...params: any) => void
) {
  events?.get(channel)?.get(event)?.delete(cb);
  if (events?.get(channel)?.get(event)?.size == 0) {
    events.get(channel)?.delete(event);
  }
  if (events?.get(channel)?.size == 0) {
    events.delete(channel);
  }
  if (events?.size == 0) {
    events = undefined;
  }
}

/**
 * 清除事件存储。如果提供了ID，则删除特定ID的事件；如果没有提供ID，则清除所有事件。
 * 当事件存储为空时，将其设置为undefined。
 * @param id 可选参数，指定要删除的事件ID。
 */
export function clear(channel?: string) {
  if (channel == null) {
    if (events != null) {
      events.clear();
      events = undefined;
    }
  } else {
    if (events != null) {
      events.delete(channel);
      if (events.size === 0) {
        events = undefined;
      }
    }
  }
}

/**
 * 触发指定表单的事件，并执行所有注册的回调函数。
 * @param id - 表单的唯一标识符。
 * @param event - 要触发的事件名称。
 * @param params - 要传递给回调函数的参数列表。
 */
export function emit(channel: string, event: string, ...params: any) {
  const eventValue = events?.get(channel)?.get(event);
  if (eventValue != null) {
    for (const cb of eventValue) {
      cb(...params);
    }
  }
}
