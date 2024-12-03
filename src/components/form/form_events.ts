type FormEventValue = Map<string, Set<any>>;

let events: Map<string, FormEventValue> | undefined;

type EventName =
  | "attributeChanged"
  | "formSubmitted"
  | "ruleChange"
  | "valueChange";

/**
 * 添加表单事件监听器。
 * @param formId - 表单的唯一标识符。
 * @param event - 要监听的事件类型，可以是 'attributeChanged' 或 'formSubmitted'。
 * @param cb - 当事件触发时调用的回调函数，接收两个参数：属性名和属性值。
 * 该函数用于将回调函数添加到指定表单ID的事件监听器集合中。
 */
export function add(id: string, event: EventName, cb: (...param: any) => void) {
  if (events == null) {
    events = new Map();
  }
  if (!events.has(id)) {
    events.set(id, new Map([[event, new Set()]]));
  }
  if (!(events.get(id) as FormEventValue).has(event)) {
    (events.get(id) as FormEventValue).set(event, new Set());
  }
  ((events.get(id) as FormEventValue).get(event) as Set<any>).add(cb);
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
  id: string,
  event: EventName,
  cb: (...params: any) => void
) {
  events?.get(id)?.get(event)?.delete(cb);
  if (events?.get(id)?.get(event)?.size == 0) {
    events.get(id)?.delete(event);
  }
  if (events?.get(id)?.size == 0) {
    events.delete(id);
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
export function clear(id?: string) {
  if (id == null) {
    if (events != null) {
      events.clear();
      events = undefined;
    }
  } else {
    if (events != null) {
      events.delete(id);
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
export function emit(id: string, event: EventName, ...params: any) {
  const eventValue = events?.get(id)?.get(event);
  if (eventValue != null) {
    for (const cb of eventValue) {
      cb(...params);
    }
  }
}
