import { on, off, $, iterate, $one } from "ph-utils/dom";

function init() {
  let $tabs = $(".l-tabs") as HTMLElement[];

  function onTabbarChange(e: CustomEvent) {
    const $target = e.target as HTMLElement;
    const $parent = $target.parentElement;
    if ($parent) {
      // 隐藏旧的
      const current = $parent.getAttribute("l-current-tab");
      if (current) {
        const $old = $one(`.l-tabs__content[l-tab="${current}"]`, $parent);
        if ($old) {
          $old.classList.add("l-tabs__content--hide");
        }
      }
      // 显示新的
      const thisCurrent = e.detail.name as string;
      $parent.setAttribute("l-current-tab", thisCurrent);
      const $new = $one(`.l-tabs__content[l-tab="${thisCurrent}"]`, $parent);
      if ($new) {
        $new.classList.remove("l-tabs__content--hide");
      }
    }
  }
  if ($tabs && $tabs.length > 0) {
    iterate($tabs, ($tab) => {
      const $tabbar = $one(".l-tabs__bar", $tab);
      if ($tabbar) {
        on($tabbar, "change", onTabbarChange as any);
        const name = $tabbar.getAttribute("name");
        if (name) {
          $tab.setAttribute("l-current-tab", name);
        }
        const $contents = $(".l-tabs__content[l-tab]", $tab) as HTMLElement[];
        iterate($contents, ($content) => {
          const contentName = $content.getAttribute("l-tab");
          if (contentName === name) {
            $content.classList.remove("l-tabs__content--hide");
          } else {
            $content.classList.add("l-tabs__content--hide");
          }
        });
      }
    });
  }

  function destroy() {
    if ($tabs && $tabs.length > 0) {
      iterate($tabs, ($tab) => {
        const $tabbar = $one(".l-tabs__bar", $tab);
        if ($tabbar) {
          console.log("destroy");
          off($tabbar, "change", onTabbarChange as any);
        }
      });
    }
    $tabs = undefined as any;
  }

  return { destroy };
}

export default {
  init,
};
