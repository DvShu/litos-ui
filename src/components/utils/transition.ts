import { iterate, transition, $ } from "ph-utils/dom";

/**
 * 初始化元素过渡, 同时会监听 l-transition-emit 变化自动执行隐藏动画, show - 显示元素, hide - 隐藏元素
 *
 * 注意需要在页面结束后调用 destroy 销毁监听
 *
 * @param els 需要初始化的元素列表, 如果不传则会自动查找页面中带有 l-transition 属性的元素
 * @returns
 *
 * @example
 * // html
 * <div
 *  l-transition="l-opacity"
 *  l-transition-emit="show"
 *  l-transition-method="hide"
 * >
 *  Hello World
 * </div>
 * // js
 * const trans = createTransition();
 *
 * // 销毁监听
 * transition.destroy();
 */
export function createTransition() {
  let observer: MutationObserver = undefined as any;
  const observerConfig = {
    attributes: true,
    attributeFilter: ["l-transition-emit"],
  };

  const observerHandler: MutationCallback = (mutationsList) => {
    for (let mutation of mutationsList) {
      if (mutation.type === "attributes" && mutation.attributeName) {
        const target = mutation.target as HTMLElement;
        const emit = target.getAttribute(mutation.attributeName) || "show";
        // 动画名称
        const transitionName = target.getAttribute("l-transition") || "l";
        // 结束动画完成后的操作, remove - 删除节点, hide - 隐藏节点
        const method = target.getAttribute("l-transition-method") || "hide";
        if (transitionName) {
          if (emit === "show") {
            target.style.removeProperty("display");
            // 显示节点
            transition(target, transitionName, "enter");
          } else {
            // 隐藏节点
            transition(target, transitionName, "leave", () => {
              if (method === "remove") {
                target.remove();
              } else {
                target.style.display = "none";
              }
            });
          }
        }
      }
    }
  };

  /**
   * 添加过渡元素
   * @param elems 过渡元素列表
   */
  function add(elems: HTMLElement[]) {
    if (elems && elems.length > 0) {
      if (observer == null) {
        observer = new MutationObserver(observerHandler);
      }
      iterate(elems, (el) => {
        const transitionName = el.getAttribute("l-transition");
        if (transitionName) {
          transition(el, transitionName, "enter");
          observer.observe(el, observerConfig);
        }
      });
    }
  }

  function init(els?: HTMLElement[]) {
    if (els == null) {
      els = $("[l-transition]") as HTMLElement[];
      add(els);
    }
  }

  /** 销毁过渡元素监听, 通常需要在页面删除时调用 */
  function destroy() {
    if (observer) {
      observer.disconnect();
      observer = undefined as any;
    }
  }

  return { destroy, add, init };
}
