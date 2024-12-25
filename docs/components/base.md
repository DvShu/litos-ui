### Base 基础组件

<script setup lang="ts">
  import { $one } from 'ph-utils/dom';
  import { nextTick, onMounted } from 'vue';

  function startTransition(
    target: HTMLElement,
    properties: [string, string][] | string,
    duration?: string
  ) {
    const trans: string[] = [];
    if (typeof properties === 'string') {
      target.classList.add(`${properties}-enter-from`, `${properties}-enter-active`);
    } else {
      for (let i = 0, len = properties.length; i < len; i++) {
        const rec = properties[i];
        target.style.setProperty(rec[0], rec[1]);
        trans.push(`${rec[0]} ${duration}`);
      }
      if (duration) {
        target.style.setProperty("transition", trans.join(", "));
      }
    }
    requestAnimationFrame(() => {
      if (typeof properties === 'string') {
        target.classList.remove(`${properties}-enter-from`);
      } else {
        for (let i = 0, len = properties.length; i < len; i++) {
          const rec = properties[i];
          target.style.removeProperty(rec[0]);
        }
      }
    });
    target.addEventListener('transitionend', () => {
      if (typeof properties === 'string') {
        target.classList.remove(`${properties}-enter-active`);
      } else if (duration) {
        target.style.removeProperty('transition');
      }
    }, { once: true });
  }

  function transition(target: HTMLElement,
    properties: [string, string][] | string,
    duration?: string, finish?: () => void) {
      
    }

  onMounted(() => {
    const $text = $one('#text');
    startTransition($text, 'nt-opacity');
  })
</script>

<div id="text">Hello World!!!</div>
