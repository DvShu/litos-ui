# Base

Extend `BaseComponent` to reuse Shadow DOM support, lifecycle hooks, attribute observation, batched DOM updates, and event dispatching.

## Import and Registration

```js
import { BaseComponent, regist } from "litos-ui";
```

## Basic Usage

Define a `baseName` for your custom component and register it with the default `l-` tag prefix. The example below uses version 2 rendering.

<script setup>
import { onMounted } from 'vue';

onMounted(async () => {
  const { BaseComponent, regist } = await import('../../../src/components');
  class HelloWorld extends BaseComponent {
    static baseName = 'hello-world';
    constructor() {
      super();
      this.version = 2;
    }
    render_v2() {
      return { template: '<span>Hello World</span>' };
    }
  }
  regist(HelloWorld);
});
</script>

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <l-hello-world></l-hello-world>
</textarea>
<div class="source">
<textarea lang="js">
import { BaseComponent, regist } from 'litos-ui';

class HelloWorld extends BaseComponent {
static baseName = 'hello-world';
constructor() {
super();
this.version = 2;
}
render_v2() {
return { template: '<span>Hello World</span>' };
}
}

regist(HelloWorld);
</textarea>
<textarea lang="html">
<l-hello-world></l-hello-world>
</textarea>
</div>
</l-code-preview>
</ClientOnly>

## Properties and Methods

- `root`: The ShadowRoot when Shadow DOM is enabled; otherwise, the element itself.
- `rendered`: `true` after the base class finishes rendering and `false` after disconnection.
- `constructor(shadow = true, init = {})`: Configures whether to use Shadow DOM and accepts ShadowRootInit options.
- `render_v2()`: The version 2 rendering entry point. Returns the required `template`, `style`, and `styleSheets` fields. `template` accepts a string, HTMLElement, or DocumentFragment.
- `afterInit()`: Runs after the initial DOM is created. Access internal elements and bind events here.
- `attributeChanged(name, oldValue, newValue)`: Handles changes to attributes listed in `observedAttributes`.
- `updateDOM(changedProps)`: Updates the DOM for changed properties. Changing state does not automatically rerun `render_v2()`; implement the update logic explicitly.
- `beforeDestroy()`: Unbinds events and releases resources. The base class calls it when the component disconnects.
- `emit(name, options)`: Dispatches a CustomEvent. Both `bubbles` and `composed` default to `true`; pass event data through `options.detail`.

## Lifecycle and Usage Notes

In `connectedCallback`, the base class creates the DOM, sets `rendered`, and calls `afterInit`. On disconnection, it cancels pending updates, calls `beforeDestroy`, and clears the internal DOM. If you override either native lifecycle callback, call the corresponding `super` method.

Prefer `afterInit` and `beforeDestroy`; `initEvents` and `removeEvents` are deprecated. The base class defaults to `version = 1`, which allows older components to implement `render`. New components should set `version = 2` in the constructor and implement `render_v2`.

Component modules depend on browser APIs. In server-rendered applications, load and register them on the client. Documentation demos must also be wrapped in ClientOnly.

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import BaseComponent from "litos-ui/base";
```

The base entry exports BaseComponent without registering an element.

Element entries register themselves and their configured dependencies; conditional features may require additional imports. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](/en/on_demand) for styles, child elements, types and root-entry compatibility.