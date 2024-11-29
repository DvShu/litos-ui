type FormEventValue = Map<string, Set<any>>;

let events: Map<string, FormEventValue> | undefined;

/**
 * 添加表单事件监听器。
 * @param formId - 表单的唯一标识符。
 * @param event - 要监听的事件类型，可以是 'formAttributeChanged' 或 'formSubmitted'。
 * @param cb - 当事件触发时调用的回调函数，接收两个参数：属性名和属性值。
 * 该函数用于将回调函数添加到指定表单ID的事件监听器集合中。
 */
export function add(
  formId: string,
  event: "formAttributeChanged" | "formSubmitted",
  cb: (attribute: string, value: any) => void
) {
  if (events == null) {
    events = new Map();
  }
  if (!events.has(formId)) {
    events.set(formId, new Map([[event, new Set()]]));
  }
  if (!(events.get(formId) as FormEventValue).has(event)) {
    (events.get(formId) as FormEventValue).set(event, new Set());
  }
  ((events.get(formId) as FormEventValue).get(event) as Set<any>).add(cb);
}

/**
 * 移除指定表单的事件监听器。
 * @param formId - 表单的唯一标识符。
 * @param event - 要移除的事件类型，可以是 'formAttributeChanged' 或 'formSubmitted'。
 * @param cb - 要移除的事件回调函数，该函数接收两个参数：属性名和属性值。
 * 该函数会从事件存储中移除指定的回调函数，如果某个事件类型下没有更多的回调函数，则删除该事件类型；
 * 如果表单下没有更多的事件类型，则删除该表单；如果事件存储为空，则重置事件存储。
 */
export function remove(
  formId: string,
  event: "formAttributeChanged" | "formSubmitted",
  cb: (attribute: string, value: any) => void
) {
  events?.get(formId)?.get(event)?.delete(cb);
  if (events?.get(formId)?.get(event)?.size == 0) {
    events.get(formId)?.delete(event);
  }
  if (events?.get(formId)?.size == 0) {
    events.delete(formId);
  }
  if (events?.size == 0) {
    events = undefined;
  }
}
