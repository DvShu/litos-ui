# Tabs

Tabs combine [Tabbar](/en/components/tabbar) with a content area. This module uses an initialization function and an HTML template rather than a separate custom element.

## Imports

### Manual Imports

Import the API, elements, and styles explicitly unless your resolver configuration supplies them.

```js
import { Tabs as LTabs, Tabbar, TabbarItem, regist, Button, Form, FormItem, Input } from "litos-ui";

regist([Tabbar, TabbarItem]);
import "litos-ui/styles/tabs.css";

// Initialize all .l-tabs containers.
const tabs = LTabs.init();

tabs.destroy(); // Release listeners when the page unmounts.

// Register additional components used in this page’s demos.
regist([Button, Form, FormItem, Input]);
```

## Examples

<script setup lang="ts">
import Tabs from '../../../src/components/tabs';
import { onMounted, nextTick, onUnmounted } from 'vue';

let tabs;
onMounted(() => {
  nextTick(() => {
    tabs = Tabs.init();
  });
});

onUnmounted(() => {
  tabs.destroy();
});
</script>

### Basic Usage

A basic tab layout.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <div class="l-tabs">
    <l-tabbar class="l-tabs__bar" name="1" type="bar">
      <l-tabbar-item name="1">Tab one</l-tabbar-item>
      <l-tabbar-item name="2">Tab two</l-tabbar-item>
    </l-tabbar>
    <div class="l-tabs-main">
      <div class="l-tabs__content" l-tab="1">Tab one content</div>
      <div class="l-tabs__content" l-tab="2">Tab two content</div>
    </div>
  </div>
</textarea>
<div class="source">
<textarea lang="html">
  <div class="l-tabs">
    <l-tabbar class="l-tabs__bar" name="1" type="bar">
      <l-tabbar-item name="1">Tab one</l-tabbar-item>
      <l-tabbar-item name="2">Tab two</l-tabbar-item>
    </l-tabbar>
    <div class="l-tabs-main">
      <div class="l-tabs__content" l-tab="1">Tab one content</div>
      <div class="l-tabs__content" l-tab="2">Tab two content</div>
    </div>
  </div>
</textarea>
<textarea source="js">
  const tabs  = LTabs.init();
  //-
  tabs.destroy(); // Release listeners when the page unmounts.
</textarea>

</div>
</l-code-preview>
</ClientOnly>

### Sign-in and Registration

Combine [Form](/en/components/form), [Input](/en/components/input), [Button](/en/components/button), and [Tabbar](/en/components/tabbar) to build a simple sign-in and registration form.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <div class="login-form-wrapper">
    <div class="l-tabs">
      <l-tabbar class="l-tabs__bar" name="login" type="bar" justify-content="space-evenly">
        <l-tabbar-item name="login">Sign in</l-tabbar-item>
        <l-tabbar-item name="regist">Sign up</l-tabbar-item>
      </l-tabbar>
      <div class="l-tabs-main">
        <div class="l-tabs__content" l-tab="login">
          <l-form inner-block>
            <l-form-item required label="Username" name="username">
              <l-input placeholder="Enter your username"></l-input>
            </l-form-item>
            <l-form-item required label="Password" name="password">
              <l-input placeholder="Enter your password" type="password"></l-input>
            </l-form-item>
            <l-form-item label="" class="l-btn-group">
              <l-button html-type="reset">Reset</l-button>
              <l-button html-type="submit" type="primary">Submit</l-button>
            </l-form-item>
          </l-form>
        </div>
        <div class="l-tabs__content" l-tab="regist">
          <l-form inner-block>
            <l-form-item required label="Username" name="username">
              <l-input placeholder="Enter your username"></l-input>
            </l-form-item>
            <l-form-item required label="Password" name="password">
              <l-input placeholder="Enter your password" type="password"></l-input>
            </l-form-item>
            <l-form-item required label="Confirm password" verify="same:password" name="confimPassword">
              <l-input placeholder="Enter your password again" type="password"></l-input>
            </l-form-item>
            <l-form-item label="" class="l-btn-group">
              <l-button html-type="reset">Reset</l-button>
              <l-button html-type="submit" type="primary">Submit</l-button>
            </l-form-item>
          </l-form>
        </div>
      </div>
    </div>
  </div>
</textarea>
</l-code-preview>
</ClientOnly>

### Card Style

Set the tabbar’s `type=card` for card styling. Add `l-tabs-card` to the container to give the content area a border as well.

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <div class="l-tabs l-tabs-card">
    <l-tabbar class="l-tabs__bar" name="1" type="card">
      <l-tabbar-item name="1">Tab one</l-tabbar-item>
      <l-tabbar-item name="2">Tab two</l-tabbar-item>
    </l-tabbar>
    <div class="l-tabs-main" style="padding:15px;">
      <div class="l-tabs__content" l-tab="1">Tab one content</div>
      <div class="l-tabs__content" l-tab="2">Tab two content</div>
    </div>
  </div>
</textarea>
</l-code-preview>
</ClientOnly>

### Structure

```html
<div class="l-tabs">
  <l-tabbar class="l-tabs__bar" name="1">
    <l-tabbar-item name="1"></l-tabbar-item>
    <l-tabbar-item name="2"></l-tabbar-item>
  </l-tabbar>
  <div class="l-tabs-main">
    <div class="l-tabs__content" l-tab="1"></div>
    <div class="l-tabs__content" l-tab="2"></div>
  </div>
</div>
```

## On-demand entry

```js
import "litos-ui/styles/vars.css";
import "litos-ui/styles/tabs.css";
import "litos-ui/tabbar";
import Tabs from "litos-ui/tabs";
```

Element entries register themselves and their configured dependencies; conditional features may require additional imports. Service and utility APIs still require explicit calls. Import from a client-only entry in SSR frameworks. See [On-demand Imports](/en/on_demand) for styles, child elements, types and root-entry compatibility.