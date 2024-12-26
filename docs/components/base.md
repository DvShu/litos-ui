### Base 基础组件

<script setup lang="ts">
  import { $one } from 'ph-utils/dom';
  import { nextTick, onMounted } from 'vue';

  function toggleCssProperty(
  el: HTMLElement,
  properties: [string, string][],
  method: "set" | "remove" = "set"
) {
  for (let i = 0, len = properties.length; i < len; i++) {
    const rec = properties[i];
    if (method === "set") {
      el.style.setProperty(rec[0], rec[1]);
    } else {
      el.style.removeProperty(rec[0]);
    }
  }
}

function transition(
  el: HTMLElement,
  nameOrProperties: string | [string, string, string][],
  dir: "leave" | "enter" = "enter",
  finish?: () => void
) {
  const p = dir === "enter" ? "from" : "to";
  let nameClass = "",
    activeClass = "";
  const trans: string[] = [];
  if (typeof nameOrProperties === "string") {
    nameClass = `${nameOrProperties}-${dir}-${p}`;
    activeClass = `${nameOrProperties}-${dir}-active`;
  } else {
    for (let i = 0, len = nameOrProperties.length; i < len; i++) {
      const rec = nameOrProperties[i];
      if (rec.length >= 3) {
        trans.push(`${rec[0]} ${rec[2]}`);
      }
    }
  }
  if (dir === "enter") {
    if (nameClass) {
      el.classList.add(nameClass, activeClass);
    } else {
      toggleCssProperty(el, nameOrProperties as any, "set");
      if (trans.length > 0) {
        el.style.setProperty("transition", trans.join(", "));
      }
    }
    requestAnimationFrame(() => {
      if (nameClass) {
        el.classList.remove(nameClass);
      } else {
        toggleCssProperty(el, nameOrProperties as any, "remove");
      }
    });
  } else {
    if (nameClass) {
      el.classList.add(activeClass);
      requestAnimationFrame(() => {
        el.classList.add(nameClass);
      });
    } else {
      if (trans.length > 0) {
        el.style.setProperty("transition", trans.join(", "));
      }
      requestAnimationFrame(() => {
        toggleCssProperty(el, nameOrProperties as any, "set");
      });
    }
  }
  el.addEventListener(
    "transitionend",
    () => {
      if (nameClass) {
        el.classList.remove(activeClass);
        requestAnimationFrame(() => {
          el.classList.remove(nameClass);
        });
      } else {
        if (trans) {
          el.style.removeProperty("transition");
        }
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            toggleCssProperty(el, nameOrProperties as any, "remove");
          });
        });
      }
      if (finish) {
        finish();
      }
    },
    { once: true }
  );
}

  onMounted(() => {
    const $text = $one('#text');
    const p = [
      ["opacity", "0", "0.3s"],
    ]
    transition($text, p, 'enter');

    setTimeout(() => {
      transition($text, p, 'leave', () => {
        $text.remove()
      });
    }, 5000);
  })
</script>

<div id="text">Hello World!!!</div>
