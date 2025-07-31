# Tabs 标签页

选项卡切换组件；其实这个模块的内容就是 [Tabbar 标签栏](/components/tabbar) + 内容区域；所以就没有单独抽取为组件，转而函数 + `html` 模板的形式。

## 引入

### 手动引入

如果没有使用 `litosui-unplugin-resolver` 自动引入, 则需要手动引入

```js
import { Tabs as LTabs } from "litos-io";
import "litos-ui/styles/tabs.css";

// 该函数会初始化所有 .l-tabs 标签页
const tabs = LTabs.init();

tabs.destroy(); // 页面关闭时, 释放
```

## 演示

<script setup lang="ts">
import Tabs from '../../src/components/tabs';
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

### 基础用法

基础的、简洁的标签页。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <div class="l-tabs">
    <l-tabbar class="l-tabs__bar" name="1" type="bar">
      <l-tabbar-item name="1">标签一</l-tabbar-item>
      <l-tabbar-item name="2">标签二</l-tabbar-item>
    </l-tabbar>
    <div class="l-tabs-main">
      <div class="l-tabs__content" l-tab="1">标签一内容</div>
      <div class="l-tabs__content" l-tab="2">标签二内容</div>
    </div>
  </div>
</textarea>
<div class="source">
<textarea lang="html">
  <div class="l-tabs">
    <l-tabbar class="l-tabs__bar" name="1" type="bar">
      <l-tabbar-item name="1">标签一</l-tabbar-item>
      <l-tabbar-item name="2">标签二</l-tabbar-item>
    </l-tabbar>
    <div class="l-tabs-main">
      <div class="l-tabs__content" l-tab="1">标签一内容</div>
      <div class="l-tabs__content" l-tab="2">标签二内容</div>
    </div>
  </div>
</textarea>
<textarea source="js">
  const tabs  = LTabs.init();
  //-
  tabs.destroy(); // 页面关闭时, 释放
</textarea>

</div>
</l-code-preview>
</ClientOnly>

### 简单登录注册

通过组件搭配: [form 表单](/components/form)、[input 输入框](/components/input)、[button 按钮](/components/button)、[tabbar 选项卡](/components/tabbar) 等组件，实现简单的登录注册。

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <div class="login-form-wrapper">
    <div class="l-tabs">
      <l-tabbar class="l-tabs__bar" name="login" type="bar" justify-content="space-evenly">
        <l-tabbar-item name="login">登录</l-tabbar-item>
        <l-tabbar-item name="regist">注册</l-tabbar-item>
      </l-tabbar>
      <div class="l-tabs-main">
        <div class="l-tabs__content" l-tab="login">
          <l-form inner-block>
            <l-form-item required label="用户名" name="username">
              <l-input placeholder="请输入用户名"></l-input>
            </l-form-item>
            <l-form-item required label="密码" name="password">
              <l-input placeholder="请输入密码" type="password"></l-input>
            </l-form-item>
            <l-form-item label="" class="l-btn-group">
              <l-button html-type="reset">重置</l-button>
              <l-button html-type="submit" type="primary">提交</l-button>
            </l-form-item>
          </l-form>
        </div>
        <div class="l-tabs__content" l-tab="regist">
          <l-form inner-block>
            <l-form-item required label="用户名" name="username">
              <l-input placeholder="请输入用户名"></l-input>
            </l-form-item>
            <l-form-item required label="密码" name="password">
              <l-input placeholder="请输入密码" type="password"></l-input>
            </l-form-item>
            <l-form-item required label="确认密码" verify="same:password" name="confimPassword">
              <l-input placeholder="请再次输入密码" type="password"></l-input>
            </l-form-item>
            <l-form-item label="" class="l-btn-group">
              <l-button html-type="reset">重置</l-button>
              <l-button html-type="submit" type="primary">提交</l-button>
            </l-form-item>
          </l-form>
        </div>
      </div>
    </div>
  </div>
</textarea>
</l-code-preview>
</ClientOnly>

### 卡片风格

通过设置 `tabbar` 的 `type=card` 来使用卡片风格。如果需要为卡片风格的同时添加内容边框，需要添加 `l-tabs-card` 类

<ClientOnly>
<l-code-preview>
<textarea lang="html">
  <div class="l-tabs l-tabs-card">
    <l-tabbar class="l-tabs__bar" name="1" type="card">
      <l-tabbar-item name="1">标签一</l-tabbar-item>
      <l-tabbar-item name="2">标签二</l-tabbar-item>
    </l-tabbar>
    <div class="l-tabs-main" style="padding:15px;">
      <div class="l-tabs__content" l-tab="1">标签一内容</div>
      <div class="l-tabs__content" l-tab="2">标签二内容</div>
    </div>
  </div>
</textarea>
</l-code-preview>
</ClientOnly>

### 基本结构

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
